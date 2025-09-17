import hashlib
import hmac
import os
import secrets
from typing import Optional
import base64
from datetime import datetime, timedelta
import json

# Security utilities
def hash_ip_address(ip: str) -> str:
    """Hash IP address with SHA-256 for privacy"""
    # Use a secret salt from environment or generate one
    salt = os.environ.get('IP_HASH_SALT', 'default-salt-change-in-production')
    
    # Create hash
    combined = f"{ip}{salt}".encode('utf-8')
    return hashlib.sha256(combined).hexdigest()

def verify_basic_auth(credentials: str) -> bool:
    """Verify basic auth credentials for admin panel"""
    try:
        # Decode base64 credentials
        decoded = base64.b64decode(credentials).decode('utf-8')
        username, password = decoded.split(':', 1)
        
        # Get admin credentials from environment
        admin_user = os.environ.get('ADMIN_USER', 'admin')
        admin_pass = os.environ.get('ADMIN_PASS', 'changeme')
        
        return username == admin_user and password == admin_pass
    except Exception:
        return False

def generate_csrf_token() -> str:
    """Generate CSRF token"""
    return secrets.token_urlsafe(32)

def extract_client_ip(request) -> str:
    """Extract client IP from request headers"""
    # Check common proxy headers
    forwarded_for = request.headers.get('X-Forwarded-For')
    if forwarded_for:
        # Take the first IP in the chain
        return forwarded_for.split(',')[0].strip()
    
    real_ip = request.headers.get('X-Real-IP')
    if real_ip:
        return real_ip
    
    # Fallback to client host
    return request.client.host

# Rate limiting storage (in-memory for MVP)
rate_limit_storage = {}

def check_rate_limit(ip_hash: str, window_seconds: int = 3600, max_requests: int = 5) -> bool:
    """Check if IP has exceeded rate limit"""
    now = datetime.utcnow()
    window_start = now - timedelta(seconds=window_seconds)
    
    # Clean old entries
    if ip_hash in rate_limit_storage:
        rate_limit_storage[ip_hash] = [
            timestamp for timestamp in rate_limit_storage[ip_hash]
            if timestamp > window_start
        ]
    
    # Check current count
    current_requests = len(rate_limit_storage.get(ip_hash, []))
    
    if current_requests >= max_requests:
        return False
    
    # Add current request
    if ip_hash not in rate_limit_storage:
        rate_limit_storage[ip_hash] = []
    
    rate_limit_storage[ip_hash].append(now)
    return True

def log_security_event(event_type: str, details: dict):
    """Log security-related events"""
    import logging
    logger = logging.getLogger(__name__)
    
    # Redact sensitive information
    safe_details = details.copy()
    if 'ip' in safe_details:
        safe_details['ip_hash'] = hash_ip_address(safe_details.pop('ip'))
    
    logger.info(f"Security Event: {event_type}", extra=safe_details)