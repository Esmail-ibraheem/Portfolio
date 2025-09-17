# API Contracts & Integration Protocol

## Contact Form API

### Endpoint
```
POST /api/contact
```

### Request Schema
```json
{
  "name": "string (1-120 chars, required)",
  "email": "string (RFC-5322 valid, required)", 
  "message": "string (1-2000 chars, required)",
  "consent": "boolean (required, must be true)",
  "_topic": "string (honeypot field, should be empty)"
}
```

### Response Schema
```json
// Success (200)
{ "ok": true }

// Validation Error (400/422)
{
  "ok": false,
  "errors": {
    "name": "Name is required and must be 1-120 characters",
    "email": "Please provide a valid email address",
    "message": "Message is required and must be 1-2000 characters",
    "consent": "Consent is required"
  }
}

// Rate Limited (429)
{ "ok": false, "error": "Rate limit exceeded. Please try again later." }

// Server Error (500)
{ "ok": false, "error": "Internal server error. Please try again." }
```

### Security Features
- Server-side validation for all fields
- Honeypot field `_topic` (if filled → 204 silent drop)
- Rate limiting: 5 requests per IP per hour
- IP address hashing (SHA-256) for privacy
- PII redaction in logs
- Optional reCAPTCHA v3 integration hook

### Database Schema
```sql
-- contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  consent BOOLEAN NOT NULL DEFAULT FALSE
);
```

### Email Template
- **To:** esm.agumaan@gmail.com
- **Subject:** New portfolio inquiry — {{name}}
- **Body:**
  ```
  New contact form submission:
  
  Name: {{name}}
  Email: {{email}}
  Message: {{message}}
  
  Submitted: {{timestamp}}
  IP Hash: {{ip_hash}}
  ```

## Admin Panel

### Endpoint
```
GET /admin/inbox
```

### Authentication
- Basic Auth via environment variables
- Username: `ADMIN_USER`
- Password: `ADMIN_PASS`

### Response
- Lists latest 100 contact submissions
- Shows: name, email, message, timestamp
- No edit/delete functionality (MVP)

## Frontend Integration Changes

### Remove Mock Data
- Replace `submitContactForm` in `/app/frontend/src/mock.js`
- Update contact form to use real API endpoint
- Add proper error handling and loading states

### Form Enhancements
- Add honeypot field `_topic` (hidden)
- Add consent checkbox
- Implement rate limit feedback
- Add success/error toast notifications
- Loading spinner during submission

### Environment Variables Needed
```env
# Email Service (choose one)
RESEND_API_KEY=your_resend_key
SENDGRID_API_KEY=your_sendgrid_key

# Database
DATABASE_URL=your_database_connection_string

# Admin Panel
ADMIN_USER=admin
ADMIN_PASS=secure_password

# Security
JWT_SECRET=your_jwt_secret
RATE_LIMIT_WINDOW=3600  # 1 hour in seconds
RATE_LIMIT_MAX=5        # max requests per window

# Analytics (optional)
GA_TRACKING_ID=your_ga_id
```

## Testing Protocol

### Unit Tests
1. Invalid email format → 422 with email error
2. Empty message → 422 with message error
3. Missing consent → 422 with consent error
4. Honeypot filled → 204 silent drop
5. Valid submission → 200 success

### Integration Tests
1. Rate limiting: 6th request within hour → 429
2. Email delivery confirmation
3. Database storage verification
4. Admin panel authentication
5. Admin panel data display

### Manual Test Cases
1. **Happy Path:** Valid form submission
2. **Spam Protection:** Fill honeypot field
3. **Rate Limiting:** Submit 6 requests quickly
4. **Admin Access:** Login to /admin/inbox
5. **Email Receipt:** Check esm.agumaan@gmail.com

## Implementation Priority

1. **Backend API** (`/api/contact` endpoint)
2. **Database Integration** (contacts table)
3. **Email Service** (Resend/SendGrid)
4. **Admin Panel** (basic auth + listing)
5. **Frontend Integration** (remove mocks)
6. **Security Features** (rate limiting, validation)
7. **Testing & Validation**

## Analytics Events

### Client-Side
```javascript
// Form submission success
gtag('event', 'form_submit_success', {
  event_category: 'contact',
  event_label: 'portfolio_contact_form'
});
```

### Server-Side
```python
# Log successful submission (no PII)
logger.info("Contact form submitted", extra={
  "event": "form_submit_success",
  "ip_hash": ip_hash,
  "timestamp": datetime.utcnow()
})
```