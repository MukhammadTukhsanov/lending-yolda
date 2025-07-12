<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load configuration
$configFile = __DIR__ . '/email-config.php';
if (file_exists($configFile)) {
    $config = include $configFile;
} else {
    // Fallback configuration
    $config = [
        'to_email' => 'info@yolda.uz',
        'to_name' => 'Yolda Support Team',
        'from_email' => 'noreply@yolda.uz',
        'from_name' => 'Yolda Contact Form',
        'use_smtp' => false,
        'smtp_host' => 'smtp.gmail.com',
        'smtp_port' => 587,
        'smtp_username' => '',
        'smtp_password' => '',
        'smtp_secure' => 'tls',
        'auto_reply' => true,
        'auto_reply_subject' => 'Xabaringiz qabul qilindi - Yolda',
        'auto_reply_message' => 'Hurmatli mijoz,

Sizning xabaringiz muvaffaqiyatli qabul qilindi. Bizning mutaxassislarimiz tez orada siz bilan bog\'lanishadi.

Yolda jamoasi bilan birga bo\'lganingiz uchun rahmat!

Hurmat bilan,
Yolda Support Team'
    ];
}

// Response function
function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Rate limiting function
function checkRateLimit($ip, $limit = 5) {
    $logFile = __DIR__ . '/email_log.txt';
    $now = time();
    $hourAgo = $now - 3600;
    
    // Read existing log
    $logs = [];
    if (file_exists($logFile)) {
        $content = file_get_contents($logFile);
        $lines = explode("\n", trim($content));
        foreach ($lines as $line) {
            if (!empty($line)) {
                list($timestamp, $logIp) = explode('|', $line);
                if ($timestamp > $hourAgo) {
                    $logs[] = ['timestamp' => $timestamp, 'ip' => $logIp];
                }
            }
        }
    }
    
    // Count emails from this IP
    $count = 0;
    foreach ($logs as $log) {
        if ($log['ip'] === $ip) {
            $count++;
        }
    }
    
    if ($count >= $limit) {
        return false;
    }
    
    // Add current request to log
    $logs[] = ['timestamp' => $now, 'ip' => $ip];
    
    // Write back to file (keep only last hour)
    $logContent = '';
    foreach ($logs as $log) {
        $logContent .= $log['timestamp'] . '|' . $log['ip'] . "\n";
    }
    file_put_contents($logFile, $logContent);
    
    return true;
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Only POST method is allowed');
}

// Rate limiting
$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!checkRateLimit($clientIp, $config['rate_limit'] ?? 5)) {
    sendResponse(false, 'Juda ko\'p so\'rov yuborilgan. Iltimos, keyinroq urinib ko\'ring.');
}

// Validate and sanitize input
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Ism kiritish majburiy';
} elseif (strlen($name) < 2) {
    $errors[] = 'Ism kamida 2 ta belgi bo\'lishi kerak';
}

if (empty($email)) {
    $errors[] = 'Email kiritish majburiy';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email manzili noto\'g\'ri formatda';
}

if (!empty($phone) && !preg_match('/^[\+]?[0-9\s\-\(\)]{7,15}$/', $phone)) {
    $errors[] = 'Telefon raqami noto\'g\'ri formatda';
}

if (empty($subject)) {
    $errors[] = 'Mavzu tanlash majburiy';
}

if (empty($message)) {
    $errors[] = 'Xabar kiritish majburiy';
} elseif (strlen($message) < 10) {
    $errors[] = 'Xabar kamida 10 ta belgi bo\'lishi kerak';
}

if (!empty($errors)) {
    sendResponse(false, 'Ma\'lumotlarda xatolar mavjud: ' . implode(', ', $errors));
}

// Sanitize data
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Email template
function getEmailTemplate($name, $email, $phone, $subject, $message) {
    return "
    <html>
    <head>
        <title>Yangi xabar - Yolda</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 30px 20px; background: #f8f9fa; }
            .field { margin-bottom: 20px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .label { background: #ff9556; color: white; padding: 12px 15px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { padding: 15px; font-size: 16px; line-height: 1.5; }
            .footer { background: #2d3748; color: #cbd5e0; text-align: center; padding: 20px; font-size: 14px; }
            .footer a { color: #ff9556; text-decoration: none; }
            .badge { display: inline-block; background: #e53e3e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>📧 Yangi Xabar</h1>
                <p style='margin: 5px 0 0 0; opacity: 0.9;'>Yolda Contact Form</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Mijoz Ismi</div>
                    <div class='value'>{$name}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📧 Email Manzili</div>
                    <div class='value'><a href='mailto:{$email}' style='color: #ff724c; text-decoration: none;'>{$email}</a></div>
                </div>
                
                <div class='field'>
                    <div class='label'>📱 Telefon Raqami</div>
                    <div class='value'>" . ($phone ?: '<em style="color: #9ca3af;">Ko\'rsatilmagan</em>') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📋 Mavzu</div>
                    <div class='value'>{$subject} <span class='badge'>Yangi</span></div>
                </div>
                
                <div class='field'>
                    <div class='label'>💬 Xabar Matni</div>
                    <div class='value'>" . nl2br($message) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>🕒 Yuborilgan Vaqt</div>
                    <div class='value'>" . date('d.m.Y H:i:s') . " (O'zbekiston vaqti)</div>
                </div>
                
                <div class='field'>
                    <div class='label'>🌐 IP Manzil</div>
                    <div class='value'>" . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Bu xabar <strong>Yolda</strong> saytidagi kontakt formadan avtomatik yuborilgan.</p>
                <p><a href='mailto:{$email}'>Javob berish</a> | <a href='https://yolda.uz'>Yolda.uz</a></p>
            </div>
        </div>
    </body>
    </html>
    ";
}

// Auto-reply template
function getAutoReplyTemplate($name, $config) {
    return "
    <html>
    <head>
        <title>Xabaringiz qabul qilindi - Yolda</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; }
            .footer { background: #f8f9fa; color: #666; text-align: center; padding: 20px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>✅ Xabaringiz Qabul Qilindi!</h1>
            </div>
            <div class='content'>
                <p>Hurmatli <strong>{$name}</strong>,</p>
                <p>" . nl2br($config['auto_reply_message']) . "</p>
            </div>
            <div class='footer'>
                <p>Yolda - Tez va ishonchli yetkazib berish xizmati</p>
            </div>
        </div>
    </body>
    </html>
    ";
}

// Send email function
function sendEmail($config, $to, $toName, $subject, $body, $replyTo = null, $replyToName = null) {
    if ($config['use_smtp'] && !empty($config['smtp_username'])) {
        // Use PHPMailer for SMTP
        if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
            throw new Exception('PHPMailer not found. Please install PHPMailer or set use_smtp to false.');
        }
        
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\SMTP;
        use PHPMailer\PHPMailer\Exception;
        
        $mail = new PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_username'];
        $mail->Password = $config['smtp_password'];
        $mail->SMTPSecure = $config['smtp_secure'];
        $mail->Port = $config['smtp_port'];
        $mail->CharSet = 'UTF-8';
        
        // Recipients
        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($to, $toName);
        
        if ($replyTo) {
            $mail->addReplyTo($replyTo, $replyToName);
        }
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        
        $mail->send();
        
    } else {
        // Use PHP mail() function
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: " . $config['from_name'] . " <" . $config['from_email'] . ">" . "\r\n";
        
        if ($replyTo) {
            $headers .= "Reply-To: " . ($replyToName ? $replyToName . " <" . $replyTo . ">" : $replyTo) . "\r\n";
        }
        
        if (!mail($to, $subject, $body, $headers)) {
            throw new Exception('Failed to send email using mail() function');
        }
    }
}

try {
    // Send main email
    $emailBody = getEmailTemplate($name, $email, $phone, $subject, $message);
    $emailSubject = "Yolda Contact Form: " . $subject;
    
    sendEmail($config, $config['to_email'], $config['to_name'], $emailSubject, $emailBody, $email, $name);
    
    // Send auto-reply if enabled
    if ($config['auto_reply']) {
        $autoReplyBody = getAutoReplyTemplate($name, $config);
        sendEmail($config, $email, $name, $config['auto_reply_subject'], $autoReplyBody);
    }
    
    sendResponse(true, 'Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    
} catch (Exception $e) {
    error_log('Email sending failed: ' . $e->getMessage());
    sendResponse(false, 'Xabar yuborishda texnik xatolik yuz berdi. Iltimos, keyinroq qaytadan urinib ko\'ring.');
}
?>
