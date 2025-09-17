import re
from typing import Dict, List, Any

# Email validation regex (RFC 5322 simplified)
EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
)

def validate_contact_form(data: Dict[str, Any]) -> Dict[str, List[str]]:
    """Validate contact form data and return errors"""
    errors = {}
    
    # Name validation
    name = data.get('name', '').strip()
    if not name:
        errors['name'] = ['Name is required']
    elif len(name) < 1 or len(name) > 120:
        errors['name'] = ['Name must be between 1 and 120 characters']
    
    # Email validation
    email = data.get('email', '').strip().lower()
    if not email:
        errors['email'] = ['Email is required']
    elif not EMAIL_REGEX.match(email):
        errors['email'] = ['Please provide a valid email address']
    
    # Message validation
    message = data.get('message', '').strip()
    if not message:
        errors['message'] = ['Message is required']
    elif len(message) < 1 or len(message) > 2000:
        errors['message'] = ['Message must be between 1 and 2000 characters']
    
    # Consent validation
    consent = data.get('consent')
    if not isinstance(consent, bool) or not consent:
        errors['consent'] = ['Consent is required']
    
    return errors

def is_honeypot_filled(data: Dict[str, Any]) -> bool:
    """Check if honeypot field is filled (indicates spam)"""
    honeypot_fields = ['_topic', 'topic', 'website', 'url', 'phone']
    
    for field in honeypot_fields:
        if data.get(field):
            return True
    
    return False

def sanitize_input(text: str) -> str:
    """Basic input sanitization"""
    if not isinstance(text, str):
        return str(text)
    
    # Remove null bytes and control characters
    text = text.replace('\x00', '').replace('\r', '').strip()
    
    # Limit length for safety
    return text[:2000]