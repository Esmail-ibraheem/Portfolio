# Esmail Gumaan - AI Research Portfolio

A neon-futuristic portfolio website for AI Research Engineer Esmail Gumaan, featuring dark theme design with cyan accents, glass morphism effects, and a fully functional contact form with backend API.

## 🚀 Features

- **Neon-Futuristic Design**: Dark theme with neon cyan accents and glass morphism effects
- **Single Page Portfolio**: Hero, Publications, Projects, Experience, Skills, Certificates, and Contact sections
- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **Contact Form**: Full-stack contact form with validation, security, and email notifications
- **Admin Panel**: Protected admin interface to view contact submissions
- **Security Features**: Rate limiting, honeypot spam protection, input sanitization
- **Accessibility**: Focus rings, keyboard navigation, high contrast ratios

## 🛠 Tech Stack

### Frontend
- **React 19** with modern hooks and context
- **Tailwind CSS** for styling with custom design system
- **Shadcn/ui** components for consistent UI elements
- **Framer Motion** concepts integrated for smooth animations
- **Lucide React** for icons

### Backend
- **FastAPI** with async/await support
- **SQLite** database with SQLAlchemy ORM
- **Resend** for email delivery (with fallback logging)
- **Pydantic** for data validation
- **Security**: Rate limiting, input sanitization, IP hashing

## 📁 Project Structure

```
/app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── Hero.jsx    # Hero section
│   │   │   ├── Contact.jsx # Contact form with backend integration
│   │   │   └── ...         # Other portfolio sections
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── mock.js         # Data and content
│   └── package.json        # Frontend dependencies
├── backend/                 # FastAPI backend application
│   ├── server.py           # Main FastAPI application
│   ├── database.py         # Database models and operations
│   ├── email_service.py    # Email notification service
│   ├── validation.py       # Input validation utilities
│   ├── security.py         # Security utilities and helpers
│   ├── portfolio.db        # SQLite database file
│   └── .env                # Environment variables
├── contracts.md            # API contracts and integration docs
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and yarn
- Python 3.11+ and pip
- Git

### Development Setup

1. **Clone and setup the project:**
   ```bash
   cd /app
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   yarn install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Environment Configuration:**
   - Copy `backend/.env.example` to `backend/.env`
   - Update configuration values as needed
   - For production, set `RESEND_API_KEY` for email delivery

5. **Start development servers:**
   ```bash
   # The servers are managed by supervisor and should auto-start
   sudo supervisorctl status
   ```

   - Frontend: http://localhost:3000
   - Backend API: https://your-domain.com/api
   - Admin Panel: https://your-domain.com/api/admin/inbox

## 📧 Contact Form Configuration

### Email Service Setup
The contact form supports email delivery via Resend:

1. **Get Resend API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key
   - Add to `backend/.env`: `RESEND_API_KEY=your_key_here`

2. **Development Mode:**
   - Without API key, emails are logged to console
   - Perfect for testing and development

### Admin Panel Access
- URL: `/api/admin/inbox`
- Default credentials: `admin:portfolio_admin_2024`
- Change in `backend/.env`: `ADMIN_USER` and `ADMIN_PASS`

## 🔒 Security Features

### Contact Form Security
- **Rate Limiting**: 5 requests per IP per hour
- **Honeypot Protection**: Hidden fields to catch spam bots
- **Input Sanitization**: XSS and injection prevention
- **IP Hashing**: Privacy-focused logging
- **Consent Validation**: GDPR-compliant consent requirement

### Authentication
- **Admin Panel**: HTTP Basic Auth with environment variables
- **API Security**: CORS configuration and input validation

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--bg-primary: #000000;        /* Main background */
--bg-secondary: #121212;      /* Card backgrounds */
--brand-primary: #00FFD1;     /* Neon cyan accent */
--text-primary: #FFFFFF;      /* Primary text */
--text-secondary: rgba(255, 255, 255, 0.85); /* Secondary text */
--text-muted: #4D4D4D;        /* Muted text */
```

### Typography
- **Primary Font**: Space Grotesk (headings)
- **Secondary Font**: Inter (body text)
- **Responsive Scale**: Mobile-optimized typography

### Components
- **Glass Morphism**: Subtle transparency and blur effects
- **Sharp Corners**: Modern rectangular buttons and cards
- **Neon Accents**: Subtle glow effects on interactive elements

## 🧪 Testing

### Backend API Testing
```bash
# Test contact form endpoint
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "Hello, this is a test message!",
    "consent": true
  }'
```

### Frontend Testing
- Manual testing of all interactive elements
- Contact form validation and submission
- Navigation and smooth scrolling
- Responsive design across devices

## 📱 Mobile Optimization

- **Responsive Grid**: Adapts from 3-column to single-column layout
- **Touch-Friendly**: 56px+ touch targets for buttons
- **Performance**: Optimized images and animations
- **Accessibility**: Proper focus management and ARIA labels

## 🚀 Deployment

### Environment Variables for Production
```env
# Email Service
RESEND_API_KEY=your_production_resend_key

# Admin Panel
ADMIN_USER=your_admin_username
ADMIN_PASS=your_secure_admin_password

# Security
IP_HASH_SALT=your_production_salt
JWT_SECRET=your_production_jwt_secret

# Rate Limiting
RATE_LIMIT_WINDOW=3600
RATE_LIMIT_MAX=5
```

### Database Migration
The SQLite database is created automatically on first run. For production:
- Consider PostgreSQL for better performance
- Update `DATABASE_URL` in environment variables
- Run database migrations if schema changes

## 📄 Content Management

### Updating Portfolio Content
Edit `/app/frontend/src/mock.js` to update:
- Personal information and contact details
- Publications and research papers
- Project descriptions and GitHub links
- Work experience and education
- Skills and certifications

### Adding New Sections
1. Create new component in `/app/frontend/src/components/`
2. Import and add to `/app/frontend/src/components/Portfolio.jsx`
3. Update navigation in `/app/frontend/src/components/Navigation.jsx`

## 🔧 API Documentation

### Contact Form Endpoint
```
POST /api/contact
Content-Type: application/json

{
  "name": "string (1-120 chars)",
  "email": "string (valid email)",
  "message": "string (1-2000 chars)",
  "consent": boolean (required: true)
}

Response (Success):
{
  "ok": true
}

Response (Validation Error):
{
  "ok": false,
  "errors": {
    "field": ["error message"]
  }
}
```

### Admin Panel Endpoint
```
GET /api/admin/inbox
Authorization: Basic base64(username:password)

Response: HTML page with contact submissions
```

## 🐛 Troubleshooting

### Common Issues

1. **Contact form not working:**
   - Check backend server is running
   - Verify API endpoint URL in frontend
   - Check browser console for errors

2. **Emails not sending:**
   - Verify `RESEND_API_KEY` in environment
   - Check backend logs for email service errors
   - Ensure sender domain is verified in Resend

3. **Admin panel access denied:**
   - Verify credentials in `backend/.env`
   - Check `ADMIN_USER` and `ADMIN_PASS` values

4. **Rate limiting too aggressive:**
   - Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` in `.env`
   - Clear rate limit storage (restart backend)

### Log Files
- Frontend: Browser console
- Backend: stdout/stderr (check supervisor logs)
- Database: SQLite file at `backend/portfolio.db`

## 📞 Support

For questions about this portfolio implementation:
- Contact: esm.agumaan@gmail.com
- GitHub: https://github.com/Esmail-ibraheem
- LinkedIn: https://linkedin.com/in/esmail-a-gumaan

## 📄 License

This portfolio template is available for personal and educational use. Please credit the original design inspiration and respect the content copyright of Esmail Gumaan.

---

**Last Updated:** August 2025
**Version:** 1.0.0
