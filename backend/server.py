from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import json

# Import our modules
from database import create_contact, get_contacts
from email_service import email_service
from validation import validate_contact_form, is_honeypot_filled, sanitize_input
from security import (
    hash_ip_address, verify_basic_auth, extract_client_ip, 
    check_rate_limit, log_security_event
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection (keep existing for other endpoints)
mongo_url = os.environ.get('MONGO_URL')
if mongo_url:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio')]
else:
    client = None
    db = None

# Create the main app
app = FastAPI(title="Esmail Gumaan Portfolio API")

# Create API router
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBasic()

# Pydantic models
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: str = Field(..., pattern=r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
    message: str = Field(..., min_length=1, max_length=2000)
    consent: bool = Field(..., description="User must consent to data processing")
    topic: Optional[str] = Field(default="", description="Honeypot field", alias="_topic")

    @validator('name', 'message')
    def sanitize_text_fields(cls, v):
        return sanitize_input(v)

class ContactResponse(BaseModel):
    ok: bool

class ErrorResponse(BaseModel):
    ok: bool = False
    errors: Optional[Dict[str, List[str]]] = None
    error: Optional[str] = None

# Existing routes (keep for compatibility)
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Contact form endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    request: Request,
    contact_data: ContactRequest
):
    try:
        # Extract client information
        client_ip = extract_client_ip(request)
        ip_hash = hash_ip_address(client_ip)
        user_agent = request.headers.get('User-Agent', '')
        
        # Log security event (no PII)
        log_security_event("contact_form_attempt", {
            "ip_hash": ip_hash,
            "user_agent": user_agent[:100],  # Truncate for safety
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Check for honeypot (spam detection)
        if is_honeypot_filled(contact_data.dict()):
            log_security_event("honeypot_triggered", {"ip_hash": ip_hash})
            # Return 204 to silently drop spam
            return JSONResponse(
                status_code=204,
                content={}
            )
        
        # Rate limiting check
        if not check_rate_limit(ip_hash):
            log_security_event("rate_limit_exceeded", {"ip_hash": ip_hash})
            raise HTTPException(
                status_code=429,
                detail={"ok": False, "error": "Rate limit exceeded. Please try again later."}
            )
        
        # Validate form data
        validation_errors = validate_contact_form(contact_data.dict())
        if validation_errors:
            return JSONResponse(
                status_code=422,
                content={"ok": False, "errors": validation_errors}
            )
        
        # Prepare contact data for storage
        db_contact_data = {
            "name": contact_data.name,
            "email": contact_data.email.lower(),
            "message": contact_data.message,
            "ip_hash": ip_hash,
            "user_agent": user_agent,
            "consent": contact_data.consent,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Store in database
        contact_id = await create_contact(db_contact_data)
        
        # Send email notification
        email_sent = await email_service.send_contact_notification(db_contact_data)
        
        # Log successful submission (no PII)
        log_security_event("contact_form_success", {
            "contact_id": contact_id,
            "ip_hash": ip_hash,
            "email_sent": email_sent
        })
        
        logger.info(f"Contact form submitted successfully. ID: {contact_id}")
        
        return ContactResponse(ok=True)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contact form submission error: {str(e)}")
        log_security_event("contact_form_error", {
            "error": str(e)[:100],  # Truncate error message
            "ip_hash": hash_ip_address(extract_client_ip(request))
        })
        
        raise HTTPException(
            status_code=500,
            detail={"ok": False, "error": "Internal server error. Please try again."}
        )

# Admin panel endpoint
@api_router.get("/admin/inbox", response_class=HTMLResponse)
async def admin_inbox(request: Request):
    # Check basic auth
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Basic '):
        return JSONResponse(
            status_code=401,
            headers={"WWW-Authenticate": "Basic realm='Admin Panel'"},
            content={"error": "Authentication required"}
        )
    
    credentials = auth_header.split(' ')[1]
    if not verify_basic_auth(credentials):
        return JSONResponse(
            status_code=401,
            headers={"WWW-Authenticate": "Basic realm='Admin Panel'"},
            content={"error": "Invalid credentials"}
        )
    
    # Get contacts from database
    contacts = await get_contacts(limit=100)
    
    # Generate HTML response
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Portfolio Admin - Contact Inbox</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ 
                font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #000;
                color: #fff;
                margin: 0;
                padding: 20px;
            }}
            .container {{ max-width: 1200px; margin: 0 auto; }}
            .header {{ 
                border-bottom: 1px solid #333;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }}
            .header h1 {{ 
                color: #00FFD1;
                margin: 0;
                font-size: 2rem;
            }}
            .stats {{ 
                background: rgba(255,255,255,0.05);
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 30px;
            }}
            .contact {{ 
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }}
            .contact-header {{ 
                display: flex;
                justify-content: between;
                align-items: flex-start;
                margin-bottom: 15px;
            }}
            .contact-info {{ flex: 1; }}
            .contact-date {{ 
                color: #888;
                font-size: 0.9rem;
            }}
            .contact-name {{ 
                color: #00FFD1;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 5px;
            }}
            .contact-email {{ 
                color: #ccc;
                margin-bottom: 15px;
            }}
            .contact-message {{ 
                background: rgba(0,0,0,0.3);
                padding: 15px;
                border-radius: 6px;
                border-left: 3px solid #00FFD1;
                line-height: 1.6;
            }}
            .no-contacts {{ 
                text-align: center;
                color: #888;
                padding: 40px;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Portfolio Contact Inbox</h1>
                <p>Latest contact form submissions</p>
            </div>
            
            <div class="stats">
                <strong>Total Messages: {len(contacts)}</strong>
                <span style="margin-left: 20px; color: #888;">Last updated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</span>
            </div>
            
            <div class="contacts">
    """
    
    if contacts:
        for contact in contacts:
            created_at = datetime.fromisoformat(contact['created_at'].replace('Z', '+00:00')) if isinstance(contact['created_at'], str) else contact['created_at']
            formatted_date = created_at.strftime('%Y-%m-%d %H:%M UTC') if created_at else 'Unknown'
            
            html_content += f"""
                <div class="contact">
                    <div class="contact-header">
                        <div class="contact-info">
                            <div class="contact-name">{contact['name']}</div>
                            <div class="contact-email">{contact['email']}</div>
                        </div>
                        <div class="contact-date">{formatted_date}</div>
                    </div>
                    <div class="contact-message">{contact['message']}</div>
                </div>
            """
    else:
        html_content += '<div class="no-contacts">No contact messages yet.</div>'
    
    html_content += """
            </div>
        </div>
    </body>
    </html>
    """
    
    return HTMLResponse(content=html_content)

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cleanup on shutdown
@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()