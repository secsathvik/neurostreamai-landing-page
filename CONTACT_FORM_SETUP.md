# Contact Form Google Sheets Setup Guide

This guide will help you set up Google Sheets integration for the contact form, following the same method used for the waitlist form.

## Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "NeuroStream Contact Form Submissions" (or any name you prefer)
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Company`
   - E1: `Subject`
   - F1: `Message`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the script editor
3. Copy and paste the entire content from `CONTACT_GOOGLE_APPS_SCRIPT.js` file in this project
4. Save the script (Ctrl+S or Cmd+S)
5. Name your project "NeuroStream Contact Form API" (or any name you prefer)

## Step 3: Configure Script Properties (Optional but Recommended)

1. In the Apps Script editor, click on the **gear icon** (Project Settings) in the left sidebar
2. Scroll down to **Script Properties**
3. Click **Add script property**
4. Add:
   - Property: `NOTIFICATION_EMAIL`
   - Value: Your email address where you want to receive notifications
5. Click **Save script properties**

## Step 4: Deploy the Web App

1. In the Apps Script editor, click **Deploy > New deployment**
2. Click the **gear icon** next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "NeuroStream Contact Form API v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **IMPORTANT**: Copy the **Web app URL** that appears - you'll need this for the next step
7. Click **Done**

## Step 5: Update Environment Variables

1. In your project root, create or update your `.env` file
2. Add the following line with your Web app URL:
   ```
   REACT_APP_CONTACT_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL you copied in Step 4

## Step 6: Test the Integration

1. Start your React application
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check your Google Sheet - you should see a new row with the submission data
5. If you configured the notification email, you should also receive an email

## Troubleshooting

### Form submissions not appearing in Google Sheet:
- Make sure the Google Sheet is open in a browser tab when testing
- Verify the `REACT_APP_CONTACT_SCRIPT_URL` in your `.env` file is correct
- Check the Apps Script execution transcript for errors

### Not receiving email notifications:
- Verify the `NOTIFICATION_EMAIL` is correctly set in Script Properties
- Check your spam folder
- The script will continue to work even if email notifications fail

### Permission errors:
- Make sure you're logged into Google with the same account that owns the sheet
- Try redeploying the web app with "Execute as: Me" selected

## Data Structure

The contact form submissions will be stored with these columns:
- **Timestamp**: When the form was submitted
- **Name**: Full name of the person
- **Email**: Email address
- **Company**: Company name (optional field)
- **Subject**: Subject of the message
- **Message**: The full message content

## Security Notes

- The Google Apps Script URL is public but only accepts POST requests with the expected data structure
- All form data is validated before being stored
- No sensitive information should be included in the form
- Email notifications help you respond quickly to new submissions

## Next Steps

After setup is complete:
1. Test the form thoroughly
2. Set up email templates for responding to common inquiries
3. Consider setting up automated responses for certain types of submissions
4. Monitor the Google Sheet regularly for new submissions 