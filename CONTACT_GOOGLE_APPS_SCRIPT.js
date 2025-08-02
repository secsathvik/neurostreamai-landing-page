function doPost(e) {
  try {
    // Check if postData exists
    if (!e.postData || !e.postData.contents) {
      throw new Error('No data received');
    }
    
    // For now, using getActiveSheet() - make sure your Google Sheet is open when deploying
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Validate required fields for contact form
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error('Missing required fields');
    }
    
    // Store in spreadsheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.company || '', // Optional field
      data.subject,
      data.message
    ]);
    
    // Get notification email from script properties (secure configuration)
    var properties = PropertiesService.getScriptProperties();
    var notificationEmail = properties.getProperty('NOTIFICATION_EMAIL');
    
    if (!notificationEmail) {
      console.error('NOTIFICATION_EMAIL not configured in script properties');
      // Continue without sending email rather than failing
    } else {
      // Send email notification
      MailApp.sendEmail({
        to: notificationEmail,
        subject: 'New NeuroStream Contact Form Submission',
        body: `New contact form submission:

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}
Message: ${data.message}
Time: ${timestamp}

Total submissions: ${sheet.getLastRow() - 1}`
      });
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Message sent successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("NeuroStream Contact API is working!")
    .setMimeType(ContentService.MimeType.TEXT);
} 