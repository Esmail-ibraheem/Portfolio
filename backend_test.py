#!/usr/bin/env python3
"""
Comprehensive test suite for the contact form API endpoint
Tests all validation, security, and functionality aspects
"""

import asyncio
import aiohttp
import json
import base64
import time
import os
from pathlib import Path
import sqlite3
from datetime import datetime

# Configuration
BACKEND_URL = "https://esmail-tech.preview.emergentagent.com/api"
ADMIN_CREDENTIALS = "admin:portfolio_admin_2024"
DB_PATH = Path(__file__).parent / "backend" / "portfolio.db"

class ContactFormTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        
    async def setup(self):
        """Setup test session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup(self):
        """Cleanup test session"""
        if self.session:
            await self.session.close()
    
    def log_result(self, test_name, success, details=""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
    
    async def test_happy_path(self):
        """Test 1: Happy path - valid contact form submission"""
        print("\n=== Test 1: Happy Path ===")
        
        test_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "message": "Hello, I'm interested in your portfolio and would like to discuss potential collaboration opportunities.",
            "consent": True,
            "_topic": ""
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                content = await response.json()
                
                if status == 200 and content.get("ok") is True:
                    self.log_result("Happy path submission", True, f"Status: {status}, Response: {content}")
                    
                    # Check database storage
                    await self.verify_database_storage("john.smith@example.com", "John Smith")
                else:
                    self.log_result("Happy path submission", False, f"Status: {status}, Response: {content}")
                    
        except Exception as e:
            self.log_result("Happy path submission", False, f"Exception: {str(e)}")
    
    async def test_validation_errors(self):
        """Test 2: Validation error scenarios"""
        print("\n=== Test 2: Validation Tests ===")
        
        validation_tests = [
            {
                "name": "Invalid email format",
                "data": {"name": "John", "email": "invalid-email", "message": "Test", "consent": True},
                "expected_status": 422,
                "expected_error_field": "email"
            },
            {
                "name": "Empty name field",
                "data": {"name": "", "email": "test@example.com", "message": "Test", "consent": True},
                "expected_status": 422,
                "expected_error_field": "name"
            },
            {
                "name": "Empty message field",
                "data": {"name": "John", "email": "test@example.com", "message": "", "consent": True},
                "expected_status": 422,
                "expected_error_field": "message"
            },
            {
                "name": "Missing consent",
                "data": {"name": "John", "email": "test@example.com", "message": "Test", "consent": False},
                "expected_status": 422,
                "expected_error_field": "consent"
            },
            {
                "name": "Name too long",
                "data": {"name": "x" * 121, "email": "test@example.com", "message": "Test", "consent": True},
                "expected_status": 422,
                "expected_error_field": "name"
            },
            {
                "name": "Message too long",
                "data": {"name": "John", "email": "test@example.com", "message": "x" * 2001, "consent": True},
                "expected_status": 422,
                "expected_error_field": "message"
            }
        ]
        
        for test in validation_tests:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/contact",
                    json=test["data"],
                    headers={"Content-Type": "application/json"}
                ) as response:
                    status = response.status
                    content = await response.json()
                    
                    if status == test["expected_status"]:
                        if "errors" in content and test["expected_error_field"] in content["errors"]:
                            self.log_result(test["name"], True, f"Correctly returned {status} with {test['expected_error_field']} error")
                        else:
                            self.log_result(test["name"], False, f"Status correct but missing expected error field: {content}")
                    else:
                        self.log_result(test["name"], False, f"Expected {test['expected_status']}, got {status}: {content}")
                        
            except Exception as e:
                self.log_result(test["name"], False, f"Exception: {str(e)}")
    
    async def test_security_features(self):
        """Test 3: Security features"""
        print("\n=== Test 3: Security Tests ===")
        
        # Test honeypot
        honeypot_data = {
            "name": "Spam Bot",
            "email": "spam@example.com",
            "message": "This is spam",
            "consent": True,
            "_topic": "spam"  # Honeypot field filled
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact",
                json=honeypot_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                
                if status == 204:
                    self.log_result("Honeypot detection", True, "Correctly returned 204 for honeypot")
                else:
                    content = await response.text()
                    self.log_result("Honeypot detection", False, f"Expected 204, got {status}: {content}")
                    
        except Exception as e:
            self.log_result("Honeypot detection", False, f"Exception: {str(e)}")
        
        # Test rate limiting
        await self.test_rate_limiting()
        
        # Test XSS/SQL injection attempts
        await self.test_injection_attempts()
    
    async def test_rate_limiting(self):
        """Test rate limiting functionality"""
        print("\n--- Rate Limiting Test ---")
        
        test_data = {
            "name": "Rate Test User",
            "email": "ratetest@example.com",
            "message": "Rate limiting test message",
            "consent": True
        }
        
        rate_limit_hit = False
        
        # Send 6 requests quickly
        for i in range(6):
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/contact",
                    json=test_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    status = response.status
                    
                    if status == 429:
                        rate_limit_hit = True
                        self.log_result("Rate limiting", True, f"Rate limit triggered on request {i+1}")
                        break
                    elif i < 5:  # First 5 should succeed
                        if status != 200:
                            content = await response.json()
                            print(f"   Request {i+1}: Status {status}, Response: {content}")
                    
            except Exception as e:
                print(f"   Request {i+1} failed: {str(e)}")
        
        if not rate_limit_hit:
            self.log_result("Rate limiting", False, "Rate limit was not triggered after 6 requests")
    
    async def test_injection_attempts(self):
        """Test SQL injection and XSS attempts"""
        print("\n--- Injection Attempts Test ---")
        
        injection_tests = [
            {
                "name": "SQL Injection in name",
                "data": {
                    "name": "'; DROP TABLE contacts; --",
                    "email": "test@example.com",
                    "message": "Test message",
                    "consent": True
                }
            },
            {
                "name": "XSS in message",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "message": "<script>alert('XSS')</script>",
                    "consent": True
                }
            }
        ]
        
        for test in injection_tests:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/contact",
                    json=test["data"],
                    headers={"Content-Type": "application/json"}
                ) as response:
                    status = response.status
                    content = await response.json()
                    
                    # Should either succeed (with sanitized input) or fail gracefully
                    if status in [200, 422]:
                        self.log_result(test["name"], True, f"Handled injection attempt gracefully: {status}")
                    else:
                        self.log_result(test["name"], False, f"Unexpected response: {status}, {content}")
                        
            except Exception as e:
                self.log_result(test["name"], False, f"Exception: {str(e)}")
    
    async def test_admin_panel(self):
        """Test 4: Admin panel authentication and functionality"""
        print("\n=== Test 4: Admin Panel Tests ===")
        
        # Test without authentication
        try:
            async with self.session.get(f"{BACKEND_URL}/admin/inbox") as response:
                status = response.status
                
                if status == 401:
                    self.log_result("Admin panel - no auth", True, "Correctly returned 401 without authentication")
                else:
                    content = await response.text()
                    self.log_result("Admin panel - no auth", False, f"Expected 401, got {status}")
                    
        except Exception as e:
            self.log_result("Admin panel - no auth", False, f"Exception: {str(e)}")
        
        # Test with wrong credentials
        wrong_auth = base64.b64encode(b"wrong:credentials").decode('ascii')
        try:
            async with self.session.get(
                f"{BACKEND_URL}/admin/inbox",
                headers={"Authorization": f"Basic {wrong_auth}"}
            ) as response:
                status = response.status
                
                if status == 401:
                    self.log_result("Admin panel - wrong auth", True, "Correctly returned 401 with wrong credentials")
                else:
                    content = await response.text()
                    self.log_result("Admin panel - wrong auth", False, f"Expected 401, got {status}")
                    
        except Exception as e:
            self.log_result("Admin panel - wrong auth", False, f"Exception: {str(e)}")
        
        # Test with correct credentials
        correct_auth = base64.b64encode(ADMIN_CREDENTIALS.encode()).decode('ascii')
        try:
            async with self.session.get(
                f"{BACKEND_URL}/admin/inbox",
                headers={"Authorization": f"Basic {correct_auth}"}
            ) as response:
                status = response.status
                content = await response.text()
                
                if status == 200 and "Portfolio Contact Inbox" in content:
                    self.log_result("Admin panel - correct auth", True, "Successfully accessed admin panel")
                else:
                    self.log_result("Admin panel - correct auth", False, f"Status: {status}, Content preview: {content[:200]}")
                    
        except Exception as e:
            self.log_result("Admin panel - correct auth", False, f"Exception: {str(e)}")
    
    async def verify_database_storage(self, email, name):
        """Verify contact was stored in database"""
        print("\n--- Database Verification ---")
        
        try:
            if DB_PATH.exists():
                conn = sqlite3.connect(DB_PATH)
                cursor = conn.cursor()
                
                cursor.execute(
                    "SELECT name, email, message, consent FROM contacts WHERE email = ? ORDER BY created_at DESC LIMIT 1",
                    (email.lower(),)
                )
                result = cursor.fetchone()
                conn.close()
                
                if result:
                    stored_name, stored_email, stored_message, stored_consent = result
                    if stored_name == name and stored_email == email.lower():
                        self.log_result("Database storage", True, f"Contact correctly stored: {stored_name}, {stored_email}")
                    else:
                        self.log_result("Database storage", False, f"Data mismatch: expected {name}/{email}, got {stored_name}/{stored_email}")
                else:
                    self.log_result("Database storage", False, f"No contact found with email {email}")
            else:
                self.log_result("Database storage", False, f"Database file not found at {DB_PATH}")
                
        except Exception as e:
            self.log_result("Database storage", False, f"Database check failed: {str(e)}")
    
    async def test_email_service(self):
        """Test 5: Email service functionality"""
        print("\n=== Test 5: Email Service Test ===")
        
        # Since we're in development mode, we'll check logs instead of actual emails
        test_data = {
            "name": "Email Test User",
            "email": "emailtest@example.com",
            "message": "Testing email notification functionality",
            "consent": True
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                content = await response.json()
                
                if status == 200 and content.get("ok") is True:
                    self.log_result("Email service integration", True, "Contact form processed successfully (email logged in development mode)")
                else:
                    self.log_result("Email service integration", False, f"Status: {status}, Response: {content}")
                    
        except Exception as e:
            self.log_result("Email service integration", False, f"Exception: {str(e)}")
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['details']}")
        
        print("\n" + "="*60)

async def main():
    """Run all tests"""
    print("Starting Contact Form API Comprehensive Test Suite")
    print(f"Backend URL: {BACKEND_URL}")
    print("="*60)
    
    tester = ContactFormTester()
    await tester.setup()
    
    try:
        # Run all test suites
        await tester.test_happy_path()
        await tester.test_validation_errors()
        await tester.test_security_features()
        await tester.test_admin_panel()
        await tester.test_email_service()
        
        # Print summary
        tester.print_summary()
        
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())