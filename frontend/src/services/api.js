import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.timeout = 10000;

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact`, {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      consent: formData.consent,
      _topic: '' // Honeypot field - always empty for legitimate users
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    // Handle different error types
    if (error.response?.status === 422) {
      // Validation errors
      return { 
        success: false, 
        errors: error.response.data.errors,
        message: 'Please check your input and try again.'
      };
    } else if (error.response?.status === 429) {
      // Rate limiting
      return { 
        success: false, 
        message: 'Too many requests. Please try again later.' 
      };
    } else if (error.response?.status >= 500) {
      // Server errors
      return { 
        success: false, 
        message: 'Server error. Please try again later.' 
      };
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      return { 
        success: false, 
        message: 'Request timeout. Please check your connection and try again.' 
      };
    } else {
      // Other errors
      return { 
        success: false, 
        message: 'Something went wrong. Please try again later.' 
      };
    }
  }
};

// Analytics helper
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};