# NeuroStream Waitlist Backend

This backend uses Netlify Functions to handle waitlist form submissions without CORS issues.

## Features

✅ **Serverless** - No server management required  
✅ **CORS-friendly** - Works from any domain  
✅ **Validation** - Server-side form validation  
✅ **Email notifications** - Get notified of new signups  
✅ **Data logging** - All submissions are logged  
✅ **Free hosting** - Netlify's free tier is generous  

## Setup Instructions

### 1. Deploy to Netlify

1. **Push your code to GitHub** (if not already)
2. **Go to [netlify.com](https://netlify.com)**
3. **Sign up/Login** with your GitHub account
4. **Click "New site from Git"**
5. **Select your repository**
6. **Deploy settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
7. **Click "Deploy site"**

### 2. Configure Environment Variables (Optional)

For email notifications, add these in Netlify dashboard:

1. **Go to Site settings** → **Environment variables**
2. **Add these variables:**
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   NOTIFICATION_EMAIL=your-email@company.com
   FROM_EMAIL=noreply@neurostream.com
   ```

### 3. Get SendGrid API Key (Optional)

1. **Sign up at [sendgrid.com](https://sendgrid.com)** (free tier: 100 emails/day)
2. **Go to Settings** → **API Keys**
3. **Create API Key** with "Mail Send" permissions
4. **Add to Netlify environment variables**

## How It Works

1. **Form submission** → `/api/waitlist` endpoint
2. **Server validation** → Validates all required fields
3. **Data logging** → Logs to Netlify function logs
4. **Email notification** → Sends email via SendGrid (if configured)
5. **Success response** → Returns success to frontend

## Viewing Responses

### Method 1: Netlify Function Logs
1. **Go to Netlify dashboard**
2. **Click "Functions"** tab
3. **Click on "waitlist"** function
4. **View logs** - all submissions are logged here

### Method 2: Add Email Notifications
- Configure SendGrid (see above)
- Get email for every new signup

### Method 3: Add Database (Advanced)
- Integrate with Airtable, Supabase, or Firebase
- Store responses in a proper database

## Testing Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local development
netlify dev
```

Your form will be available at `http://localhost:8888`

## Production URL

After deployment, your API will be available at:
`https://your-site-name.netlify.app/api/waitlist`

## Troubleshooting

**Form not working?**
- Check Netlify function logs
- Verify the API endpoint URL
- Check browser console for errors

**Not receiving emails?**
- Verify SendGrid API key
- Check SendGrid activity logs
- Ensure environment variables are set correctly 