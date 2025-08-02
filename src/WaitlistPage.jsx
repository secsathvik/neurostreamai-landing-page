import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';

// Move validation schema outside component to prevent re-creation on every render
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  
  lastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  
  company: Yup.string()
    .required('Company is required')
    .max(100, 'Company name must be less than 100 characters'),
  
  role: Yup.string()
    .required('Please select your role'),
  
  useCase: Yup.string()
    .max(2000, 'Use case description must be less than 2000 characters')
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

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);



const WaitlistPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    useCase: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  // Scroll to top on component mount (page load/refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roles = [
    'Data Engineer',
    'Analytics Engineer', 
    'Data Analyst',
    'ML Engineer',
    'Product Manager',
    'Engineering Manager',
    'CTO/VP Engineering',
    'Other'
  ];

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
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
    if (errors[name]) {
      setErrors(prev => ({
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
      const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL;
      
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error('Google Apps Script URL not configured');
      }
      
      console.log('Submitting waitlist form');
      
      // Use a simple approach with no-cors mode
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });

      // Since we're using no-cors mode, we can't read the response
      // But if we reach this point without an error, the request was sent successfully
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        role: '',
        useCase: ''
      });
      
    } catch (error) {
      console.error('Error submitting waitlist form');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Add CSS for gradient animation and custom select styling */}
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

        /* Custom select styling */
        .custom-select {
          appearance: none;
          background-image: none;
        }

        .custom-select::-ms-expand {
          display: none;
        }

        /* Firefox */
        .custom-select::-moz-focus-inner {
          border: 0;
        }

        /* Custom dropdown arrow */
        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          pointer-events: none;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid currentColor;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .select-wrapper:hover::after {
          opacity: 1;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className={`flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            
            <div className="text-xl font-medium tracking-tight">
              <Link 
                to="/"
                className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
              >
                NeuroStream
              </Link>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-8 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-900/5 border border-gray-200 text-gray-600'}`}>
              Join the Beta
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight tracking-tight">
              Request{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                beta access
              </span>
            </h1>
            
            <p className={`text-xl font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Be among the first to experience AI-powered data engineering. 
              <br />We'll notify you when your access is ready.
            </p>
          </div>

          {/* Form */}
          <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-100 border border-green-200'}`}>
                  <CheckIcon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium mb-4">You're on the list!</h3>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Thanks for your interest in NeuroStream. We'll be in touch soon with your beta access.
                </p>
                <Link 
                  to="/"
                  className={`inline-flex items-center px-6 py-3 rounded-full transition-all duration-300 font-medium group ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                >
                  Back to Home
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-gray-50'
                      } ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-gray-50'
                      } ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-gray-50'
                    } ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-gray-50'
                    } ${errors.company ? 'border-red-500' : ''}`}
                    placeholder="Enter your company name"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                {/* Role */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Role *
                  </label>
                  <div className="select-wrapper">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`custom-select w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-300 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10 hover:bg-white/8' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-gray-500 focus:bg-gray-50 hover:bg-gray-50'
                      } ${errors.role ? 'border-red-500' : ''} ${!formData.role ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') : ''}`}
                    >
                      <option value="" disabled className={isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-400'}>
                        Select your role
                      </option>
                      {roles.map(role => (
                        <option key={role} value={role} className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                {/* Use Case */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    What's your primary data engineering challenge?
                  </label>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-gray-50'
                    } ${errors.useCase ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your data workflow challenges, team size, or what you're hoping to achieve with NeuroStream..."
                  />
                  {errors.useCase && <p className="text-red-500 text-sm mt-1">{errors.useCase}</p>}
                </div>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-red-900/20 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-full transition-all duration-300 font-medium flex items-center justify-center group ${
                    isSubmitting 
                      ? isDarkMode 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              We respect your privacy. Your information will only be used to contact you about NeuroStream beta access.
            </p>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' 
              : 'bg-gray-900/10 border border-gray-200 text-gray-900 hover:bg-gray-900/20'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default WaitlistPage; 