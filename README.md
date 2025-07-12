# 🚀 Yolda - Landing Page

A modern, responsive landing page for **Yolda** delivery service built with React and featuring a complete contact form system with PHP backend.

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-purple?logo=bootstrap)
![PHP](https://img.shields.io/badge/PHP-Backend-blue?logo=php)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Frontend

- **Modern Design** - Beautiful gradient-based UI with smooth animations
- **Responsive Layout** - Perfect display on all devices (mobile, tablet, desktop)
- **Interactive Elements** - Animated phone mockup, floating bubbles, and smooth scrolling
- **Performance Optimized** - Fast loading with optimized assets

### 📧 Contact Form System

- **Professional Contact Form** - Multi-field form with validation
- **PHP Backend** - Secure email processing with rate limiting
- **Auto-Reply System** - Automatic confirmation emails to users
- **SMTP Support** - Gmail, Outlook, and custom SMTP integration
- **Security Features** - Input sanitization, CSRF protection, and spam prevention

### 🛡️ Security

- **Rate Limiting** - Prevents spam (max 5 emails per IP per hour)
- **Input Validation** - Server-side validation and sanitization
- **XSS Protection** - HTML entity encoding for user inputs
- **Email Templates** - Professional HTML email designs

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PHP (v7.4 or higher) - for contact form
- Web server with PHP support (Apache, Nginx, etc.)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lending-yolda.git
   cd lending-yolda
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure email settings**

   ```bash
   cp public/api/email-config-sample.php public/api/email-config.php
   ```

   Edit `public/api/email-config.php` with your email settings.

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Update `public/api/email-config.php`:
   ```php
   'to_email' => 'your-email@gmail.com',
   'smtp_username' => 'your-email@gmail.com',
   'smtp_password' => 'your-16-character-app-password',
   ```

### Other Email Providers

- **Outlook/Hotmail**: `smtp.live.com`, port 587, TLS
- **Yahoo**: `smtp.mail.yahoo.com`, port 587, TLS
- **Custom SMTP**: Contact your hosting provider

## 🏗️ Project Structure

```
lending-yolda/
├── public/
│   ├── api/                     # PHP backend
│   │   ├── send-email.php       # Email processing script
│   │   ├── email-config-sample.php # Email configuration template
│   │   └── email-config.php     # Your email settings (not in git)
│   └── ...
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   └── Home.jsx            # Main landing page
│   ├── styles/
│   │   └── landing.css         # Custom styles
│   └── utils/
│       ├── animations.js       # Scroll animations
│       └── navbar.js          # Navbar effects
└── ...
```

## 🚀 Deployment

### Frontend Deployment (Netlify, Vercel, etc.)

```bash
npm run build
```

Deploy the `build` folder to your hosting service.

### Full-Stack Deployment (with PHP)

1. **Build the React app**

   ```bash
   npm run build
   ```

2. **Upload to web server**

   - Upload `build` folder contents to your web server root
   - Ensure `public/api/` folder is accessible
   - Set proper permissions for PHP files

3. **Configure email settings**
   - Copy and configure `email-config.php` on your server
   - Test the contact form functionality

### Environment Variables

For production, consider using environment variables:

- `REACT_APP_API_URL` - API endpoint URL
- `REACT_APP_CONTACT_EMAIL` - Contact email address

## 🔧 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`

Builds the app for production to the `build` folder

### `npm test`

Launches the test runner in interactive watch mode

### `npm run eject`

**Note: This is a one-way operation!** Removes Create React App build dependency.

## 🎨 Customization

### Colors

The main brand colors can be modified in `src/styles/landing.css`:

- Primary: `#ff9556` (Orange)
- Secondary: `#ff724c` (Red-Orange)
- Accent: `#ff4f42` (Red)

### Content

- **Hero Section**: Edit text and links in `src/pages/Home.jsx`
- **Features**: Modify feature cards and descriptions
- **Contact Info**: Update contact details in footer

### Email Templates

Customize email templates in `public/api/send-email.php`:

- `getEmailTemplate()` - Admin email design
- `getAutoReplyTemplate()` - User confirmation email

## 🛡️ Security Considerations

### Production Checklist

- [ ] Configure proper email settings in `email-config.php`
- [ ] Set up SSL certificate (HTTPS)
- [ ] Enable server-side security headers
- [ ] Regular security updates
- [ ] Monitor email logs for suspicious activity
- [ ] Consider adding Google reCAPTCHA

### File Permissions

```bash
chmod 644 public/api/*.php
chmod 600 public/api/email-config.php  # Sensitive config
```

## 📞 Contact Form Features

- **Multi-field validation** (name, email, phone, subject, message)
- **Real-time feedback** (loading states, success/error messages)
- **Rate limiting** (spam protection)
- **Auto-reply system** (user confirmation)
- **Professional email templates** (HTML design)
- **Mobile-friendly** (responsive design)

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help with setup:

- 📧 Email: [your-email@domain.com](mailto:your-email@domain.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/lending-yolda/issues)
- 📚 Documentation: Check this README and code comments

## 🎯 Roadmap

- [ ] Add multi-language support
- [ ] Implement Google reCAPTCHA
- [ ] Add email template customization panel
- [ ] Create admin dashboard for contact form submissions
- [ ] Add analytics integration
- [ ] Implement dark mode toggle

---

**Made with ❤️ for Yolda delivery service**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
