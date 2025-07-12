<?php
// Email Configuration File
// Copy this file and rename it to 'email-config.php'
// Update the values below with your actual email settings

return [
    // Email addresses
    'to_email' => 'info@yolda.uz', // Your receiving email address
    'to_name' => 'Yolda Support Team', // Your name or company name
    'from_email' => 'noreply@yolda.uz', // Sender email (should be from your domain)
    'from_name' => 'Yolda Contact Form', // Sender name
    
    // SMTP Settings (for reliable email delivery)
    'use_smtp' => true, // Set to false to use PHP mail() function instead
    'smtp_host' => 'smtp.gmail.com', // SMTP server (Gmail, Outlook, etc.)
    'smtp_port' => 587, // SMTP port (587 for TLS, 465 for SSL)
    'smtp_username' => 'your-email@gmail.com', // Your SMTP username
    'smtp_password' => 'your-app-password', // Your SMTP password or app password
    'smtp_secure' => 'tls', // 'tls' or 'ssl'
    
    // Security settings
    'enable_captcha' => false, // Set to true if you want to add CAPTCHA
    'allowed_domains' => [], // Leave empty to allow all domains, or add specific domains
    'rate_limit' => 5, // Maximum emails per IP per hour
    
    // Email template settings
    'email_template' => 'default', // You can create custom templates
    'auto_reply' => true, // Send auto-reply to the sender
    'auto_reply_subject' => 'Xabaringiz qabul qilindi - Yolda',
    'auto_reply_message' => 'Hurmatli mijoz,

Sizning xabaringiz muvaffaqiyatli qabul qilindi. Bizning mutaxassislarimiz tez orada siz bilan bog\'lanishadi.

Yolda jamoasi bilan birga bo\'lganingiz uchun rahmat!

Hurmat bilan,
Yolda Support Team'
];

/*
SETUP INSTRUCTIONS:

1. Gmail Setup:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the app password in 'smtp_password' field

2. Other Email Providers:
   - Outlook/Hotmail: smtp.live.com, port 587, TLS
   - Yahoo: smtp.mail.yahoo.com, port 587, TLS
   - Custom domain: Contact your hosting provider for SMTP settings

3. File Permissions:
   - Make sure the web server can read this file
   - Keep this file secure and outside web root if possible

4. Testing:
   - Test the form thoroughly before going live
   - Check spam folders if emails are not received
   - Monitor email delivery logs

5. Security Considerations:
   - Use environment variables for sensitive data in production
   - Implement rate limiting to prevent spam
   - Add CAPTCHA for additional security
   - Validate and sanitize all input data
*/
?>
