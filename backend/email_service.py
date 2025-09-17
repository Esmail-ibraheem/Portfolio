import os
import logging
from datetime import datetime
from typing import Dict, Any
import resend

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.resend_api_key = os.environ.get('RESEND_API_KEY')
        if self.resend_api_key:
            resend.api_key = self.resend_api_key
            self.service = 'resend'
        else:
            logger.warning("No email service configured. Emails will be logged only.")
            self.service = None
    
    async def send_contact_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Send contact form notification email"""
        try:
            subject = f"New portfolio inquiry — {contact_data['name']}"
            
            # Create email body
            body = f"""
New contact form submission from Esmail Gumaan's Portfolio:

Name: {contact_data['name']}
Email: {contact_data['email']}

Message:
{contact_data['message']}

---
Submitted: {contact_data.get('timestamp', datetime.utcnow().isoformat())}
IP Hash: {contact_data.get('ip_hash', 'N/A')}
User Agent: {contact_data.get('user_agent', 'N/A')}
Consent: {contact_data.get('consent', False)}
"""
            
            if self.service == 'resend' and self.resend_api_key:
                # Send via Resend
                params = {
                    "from": "noreply@portfolio.esmailgumaan.com",
                    "to": ["esm.agumaan@gmail.com"],
                    "subject": subject,
                    "text": body
                }
                
                response = resend.Emails.send(params)
                logger.info(f"Email sent successfully via Resend: {response}")
                return True
            else:
                # Log email content (development mode)
                logger.info(f"EMAIL NOTIFICATION (Development Mode):\n"
                           f"To: esm.agumaan@gmail.com\n"
                           f"Subject: {subject}\n"
                           f"Body:\n{body}")
                return True
                
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False

# Global email service instance
email_service = EmailService()