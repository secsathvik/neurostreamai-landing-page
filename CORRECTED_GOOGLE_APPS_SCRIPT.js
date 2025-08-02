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
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.company || !data.role) {
      throw new Error('Missing required fields');
    }
    
    // Store in spreadsheet
    sheet.appendRow([
      timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.company,
      data.role,
      data.useCase || '' // Use empty string if useCase is not provided
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
        subject: 'New NeuroStream Waitlist Signup',
        body: `New waitlist signup:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role}
Use Case: ${data.useCase || 'Not provided'}
Time: ${timestamp}

Total signups: ${sheet.getLastRow() - 1}`
      });
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Successfully added to waitlist'}))
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
    .createTextOutput("NeuroStream Waitlist API is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}

 