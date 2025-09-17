#!/usr/bin/env python3
"""
Focused test for remaining issues after rate limit reset
"""

import asyncio
import aiohttp
import json

BACKEND_URL = "https://esmail-tech.preview.emergentagent.com/api"

async def test_injection_and_email():
    """Test injection attempts and email service after rate limit reset"""
    
    async with aiohttp.ClientSession() as session:
        print("=== Testing Injection Attempts ===")
        
        # Test SQL injection
        sql_data = {
            "name": "'; DROP TABLE contacts; --",
            "email": "test@example.com",
            "message": "Test message",
            "consent": True
        }
        
        try:
            async with session.post(
                f"{BACKEND_URL}/contact",
                json=sql_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                content = await response.json()
                print(f"SQL Injection Test: Status {status}, Response: {content}")
                
        except Exception as e:
            print(f"SQL Injection Test failed: {str(e)}")
        
        # Wait a bit between requests
        await asyncio.sleep(2)
        
        # Test XSS
        xss_data = {
            "name": "Test User",
            "email": "test2@example.com",
            "message": "<script>alert('XSS')</script>",
            "consent": True
        }
        
        try:
            async with session.post(
                f"{BACKEND_URL}/contact",
                json=xss_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                content = await response.json()
                print(f"XSS Test: Status {status}, Response: {content}")
                
        except Exception as e:
            print(f"XSS Test failed: {str(e)}")
        
        # Wait a bit between requests
        await asyncio.sleep(2)
        
        # Test email service
        email_data = {
            "name": "Email Test User",
            "email": "emailtest2@example.com",
            "message": "Testing email notification functionality",
            "consent": True
        }
        
        try:
            async with session.post(
                f"{BACKEND_URL}/contact",
                json=email_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                content = await response.json()
                print(f"Email Service Test: Status {status}, Response: {content}")
                
        except Exception as e:
            print(f"Email Service Test failed: {str(e)}")

if __name__ == "__main__":
    asyncio.run(test_injection_and_email())