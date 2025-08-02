import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';

// Move validation schema outside component to prevent re-creation on every render
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(100, 'Name must be less than 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  
  company: Yup.string()
    .max(100, 'Company name must be less than 100 characters'),
  
  subject: Yup.string()
    .required('Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: Yup.string()
    .required('Message is required')
    .max(5000, 'Message must be less than 5000 characters')
});

// Move sanitizeInput function outside component for better performance
const sanitizeInput = (value) => {
  // Use DOMPurify for robust XSS protection
  const sanitized = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true // Keep text content
  });
  // Don't trim to preserve spaces - just return sanitized value
  return sanitized;
};

// Reusing icons from LandingPage
const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);



const MailIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ContactPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  // Add error state for better UX
  const [formErrors, setFormErrors] = useState({});

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setFormErrors(newErrors);
      console.log('Form validation failed');
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!await validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get Google Apps Script URL from environment variables
      const CONTACT_SCRIPT_URL = process.env.REACT_APP_CONTACT_SCRIPT_URL;
      
      if (!CONTACT_SCRIPT_URL) {
        throw new Error('Contact Google Apps Script URL not configured');
      }
      
      console.log('Submitting contact form');
      
      // Use a simple approach with no-cors mode (same as waitlist)
      await fetch(CONTACT_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });

      // Since we're using no-cors mode, we can't read the response
      // But if we reach this point without an error, the request was sent successfully
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting contact form');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Scroll to top on component mount (page load/refresh)
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="text-xl font-medium tracking-tight">
              <Link 
                to="/"
                className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
              >
                NeuroStream
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link>
              <Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About</Link>
              <Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Team</Link>
              <Link to="/contact" className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Contact</Link>
              <div className="flex items-center space-x-4">
                <Link to="/waitlist" className={`px-6 py-2 rounded-full transition-all duration-300 font-medium flex items-center group hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                  Beta Access
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-3">
              <Link to="/waitlist" className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center group hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                Beta Access
                <ArrowRightIcon className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-8 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-900/5 border border-gray-200 text-gray-600'}`}>
              Get in Touch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
              Ready to transform
              <br />
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                together?
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to transform your data engineering workflow? Let's talk.
              <br />
              Whether you're interested in our platform, have questions, or want to explore partnerships, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-light mb-8 tracking-tight">Let's Connect</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <MailIcon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2 tracking-tight">Email Us</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 font-light`}>
                      Get in touch for general inquiries
                    </p>
                    <a href="mailto:hello@neurostream.ai" className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                      hello@neurostream.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <PhoneIcon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2 tracking-tight">Schedule a Demo</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 font-light`}>
                      Book a personalized demo with our team
                    </p>
                    <a href="mailto:demo@neurostream.ai" className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                      demo@neurostream.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <MapPinIcon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2 tracking-tight">Location</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                      Bengaluru, KA<br />
                      Remote-first company
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12">
                <h3 className="text-2xl font-light mb-6 tracking-tight">Quick Actions</h3>
                <div className="space-y-4">
                  <Link 
                    to="/waitlist" 
                    className={`block p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-light mb-1 tracking-tight">Join the Waitlist</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                          Get early access to NeuroStream
                        </p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" />
                    </div>
                  </Link>
                  
                  <div className={`p-6 rounded-3xl border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
                    <h4 className="font-light mb-1 tracking-tight">Partnership Inquiries</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                      Email us at <a href="mailto:partnerships@neurostream.ai" className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">partnerships@neurostream.ai</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <h2 className="text-4xl font-light mb-8 tracking-tight">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-colors ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-white/20' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                      } focus:outline-none ${formErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-light mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-colors ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-white/20' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                      } focus:outline-none ${formErrors.email ? 'border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-colors ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-white/20' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                    } focus:outline-none ${formErrors.company ? 'border-red-500' : ''}`}
                    placeholder="Your company"
                  />
                  {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-colors ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-white/20' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                    } focus:outline-none ${formErrors.subject ? 'border-red-500' : ''}`}
                    placeholder="What's this about?"
                  />
                  {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-colors resize-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-white/20' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                    } focus:outline-none ${formErrors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us more about your needs..."
                  />
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className={`p-4 rounded-2xl border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className={`p-4 rounded-2xl border backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center group ${
                    isSubmitting
                      ? (isDarkMode ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                      : (isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800')
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl font-medium tracking-tight mb-8">
            NeuroStream
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Team
            </Link>
            <Link to="/contact" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Contact
            </Link>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2025 NeuroStream AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage; 