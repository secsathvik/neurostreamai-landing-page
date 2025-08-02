# Waitlist Setup Guide

## Overview
Your waitlist functionality is now complete and integrated into your landing page. Here are the setup options for receiving emails:

## Option 1: EmailJS (Recommended - Free & Easy)

EmailJS allows you to send emails directly from your frontend without a backend server.

### Setup Steps:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (up to 200 emails/month)

2. **Create Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions to connect your email

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template content:
   ```
   Subject: New NeuroStream Waitlist Signup
   
   New waitlist signup from {{from_name}}:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Company: {{company}}
   Role: {{role}}
   Use Case: {{use_case}}
   
   {{message}}
   ```

4. **Get Your Credentials**
   - Service ID: Found in "Email Services" section
   - Template ID: Found in "Email Templates" section  
   - Public Key: Found in "Account" > "General"

5. **Update WaitlistPage.jsx**
   Replace these placeholders in `src/WaitlistPage.jsx`:
   ```javascript
   await emailjs.send(
     'YOUR_SERVICE_ID',    // Replace with your service ID
     'YOUR_TEMPLATE_ID',   // Replace with your template ID
     templateParams,
     'YOUR_PUBLIC_KEY'     // Replace with your public key
   );
   ```

## Option 2: Simple Form Submission (No Email Service)

If you prefer not to use EmailJS, you can modify the form to collect data locally:

1. **Update WaitlistPage.jsx** - Replace the handleSubmit function:
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();
     
     if (!validateForm()) {
       return;
     }

     setIsSubmitting(true);

     // Store data locally or send to your own API
     console.log('Waitlist signup:', formData);
     
     // You can also save to localStorage for now:
     const existingSignups = JSON.parse(localStorage.getItem('waitlistSignups') || '[]');
     existingSignups.push({
       ...formData,
       timestamp: new Date().toISOString()
     });
     localStorage.setItem('waitlistSignups', JSON.stringify(existingSignups));

     setSubmitStatus('success');
     setFormData({
       firstName: '',
       lastName: '',
       email: '',
       company: '',
       role: '',
       useCase: ''
     });
     setIsSubmitting(false);
   };
   ```

## Option 3: Backend Integration

For production use, consider setting up a backend API:

1. Create an API endpoint that receives the form data
2. Send emails using a service like SendGrid, Mailgun, or AWS SES
3. Store signups in a database
4. Update the handleSubmit function to POST to your API

## Features Included

✅ **Responsive Design** - Works on all devices
✅ **Dark/Light Theme** - Matches your landing page aesthetic  
✅ **Form Validation** - Required fields and email validation
✅ **Success/Error States** - User feedback for form submission
✅ **Navigation** - Seamless routing between pages
✅ **Professional Styling** - Maintains your brand consistency

## Testing

1. Install dependencies: `npm install react-router-dom emailjs-com`
2. Start your development server: `npm start`
3. Navigate to `/waitlist` or click any "Beta Access" or "Invite only" buttons
4. Test the form with various inputs to ensure validation works
5. Configure your email service and test actual email sending

## Next Steps

1. Set up your preferred email service
2. Test the complete flow
3. Consider adding analytics tracking
4. Set up a database for production use
5. Add admin dashboard to view signups

Your waitlist is ready to collect user information and maintain your site's professional aesthetic! 