# 🚀 Deployment Guide

This document provides detailed instructions for deploying the Yolda landing page to various hosting platforms.

## 📋 Pre-Deployment Checklist

### ✅ Frontend Checklist

- [ ] Test the application locally (`npm start`)
- [ ] Build the application (`npm run build`)
- [ ] Verify all images and assets load correctly
- [ ] Test responsive design on different screen sizes
- [ ] Validate all links and buttons work properly

### ✅ Backend Checklist (Contact Form)

- [ ] Configure `email-config.php` with production settings
- [ ] Test email functionality in development
- [ ] Verify SMTP credentials are correct
- [ ] Test auto-reply functionality
- [ ] Check rate limiting works properly

### ✅ Security Checklist

- [ ] Ensure `email-config.php` is not in version control
- [ ] Verify `.gitignore` excludes sensitive files
- [ ] Test form validation and sanitization
- [ ] Check for XSS vulnerabilities
- [ ] Verify CSRF protection is active

## 🌐 Deployment Options

### Option 1: Frontend Only (Netlify/Vercel)

**Best for**: Static hosting without contact form functionality

#### Netlify Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod --dir=build
   ```

3. **Configure redirects** (create `public/_redirects`):
   ```
   /*    /index.html   200
   ```

#### Vercel Deployment

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Full-Stack Deployment (with PHP)

**Best for**: Complete functionality including contact form

#### Shared Hosting (cPanel)

1. **Build the React app**

   ```bash
   npm run build
   ```

2. **Upload files**

   - Upload contents of `build/` folder to `public_html/`
   - Upload `public/api/` folder to `public_html/api/`
   - Set file permissions: `chmod 644 *.php`

3. **Configure email**
   - Copy `email-config-sample.php` to `email-config.php`
   - Update with your hosting provider's SMTP settings
   - Test contact form functionality

#### VPS/Dedicated Server (Ubuntu/CentOS)

1. **Install dependencies**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install apache2 php php-curl php-json php-mbstring

   # CentOS/RHEL
   sudo yum install httpd php php-curl php-json php-mbstring
   ```

2. **Configure Apache**

   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       DocumentRoot /var/www/html/yolda

       <Directory /var/www/html/yolda>
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Deploy files**

   ```bash
   # Copy build files
   sudo cp -r build/* /var/www/html/yolda/
   sudo cp -r public/api /var/www/html/yolda/

   # Set permissions
   sudo chown -R www-data:www-data /var/www/html/yolda
   sudo chmod 644 /var/www/html/yolda/api/*.php
   ```

#### Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   # Multi-stage build
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM php:8.1-apache
   COPY --from=builder /app/build /var/www/html
   COPY public/api /var/www/html/api

   # Install PHP extensions
   RUN docker-php-ext-install curl json mbstring

   # Enable mod_rewrite
   RUN a2enmod rewrite

   EXPOSE 80
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - '80:80'
       volumes:
         - ./api/email-config.php:/var/www/html/api/email-config.php
   ```

## 🔧 Environment Configuration

### Production Environment Variables

Create a `.env.production` file:

```env
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_CONTACT_EMAIL=info@yourdomain.com
REACT_APP_SITE_URL=https://yourdomain.com
```

### Email Configuration for Production

Update `public/api/email-config.php`:

```php
<?php
return [
    'to_email' => $_ENV['CONTACT_EMAIL'] ?? 'info@yourdomain.com',
    'to_name' => 'Yolda Support Team',
    'from_email' => $_ENV['FROM_EMAIL'] ?? 'noreply@yourdomain.com',
    'from_name' => 'Yolda Contact Form',
    'use_smtp' => true,
    'smtp_host' => $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com',
    'smtp_port' => $_ENV['SMTP_PORT'] ?? 587,
    'smtp_username' => $_ENV['SMTP_USERNAME'],
    'smtp_password' => $_ENV['SMTP_PASSWORD'],
    'smtp_secure' => 'tls',
    // ... other settings
];
```

## 🛡️ Security Configuration

### Apache .htaccess

Create `public/api/.htaccess`:

```apache
# Protect configuration file
<Files "email-config.php">
    Order Allow,Deny
    Deny from all
</Files>

# Protect log files
<Files "*.txt">
    Order Allow,Deny
    Deny from all
</Files>

# Enable CORS for contact form
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "https://yourdomain.com"
    Header always set Access-Control-Allow-Methods "POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html/yolda;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # PHP API
    location /api/ {
        try_files $uri $uri/ =404;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Protect sensitive files
    location ~ /api/email-config\.php$ {
        deny all;
    }

    location ~ \.txt$ {
        deny all;
    }
}
```

## 📊 Monitoring and Maintenance

### Performance Monitoring

- Set up Google Analytics
- Monitor Core Web Vitals
- Check email delivery rates
- Monitor form submission success rates

### Log Monitoring

```bash
# Check email logs
tail -f /path/to/yolda/api/email_log.txt

# Check Apache logs
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log
```

### Backup Strategy

1. **Database**: Not applicable (static site)
2. **Files**: Regular backup of uploaded content
3. **Configuration**: Backup `email-config.php`
4. **Logs**: Archive email logs monthly

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to server
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          source: 'build/*'
          target: '/var/www/html/yolda'
```

## 🧪 Testing in Production

### Contact Form Testing

1. **Functionality Test**

   - Fill out the contact form
   - Verify email is received
   - Check auto-reply is sent
   - Test error handling

2. **Security Test**

   - Test rate limiting
   - Verify input sanitization
   - Check for XSS vulnerabilities
   - Test CSRF protection

3. **Performance Test**
   - Check page load speed
   - Test mobile responsiveness
   - Verify all animations work
   - Check API response times

### Troubleshooting Common Issues

#### Email Not Sending

```bash
# Check PHP mail configuration
php -m | grep mail

# Test SMTP connection
telnet smtp.gmail.com 587

# Check PHP error logs
tail -f /var/log/php_errors.log
```

#### Form Not Submitting

```javascript
// Add debug logging
console.log('Form data:', formData);
console.log('Response:', response);
```

#### CORS Issues

```php
// Add to send-email.php
header('Access-Control-Allow-Origin: https://yourdomain.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

## 📞 Support

If you encounter issues during deployment:

1. Check the [troubleshooting section](#troubleshooting-common-issues)
2. Review server error logs
3. Test individual components separately
4. Contact your hosting provider for server-specific issues

---

**Happy Deploying! 🚀**
