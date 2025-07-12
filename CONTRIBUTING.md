# 🤝 Contributing to Yolda Landing Page

Thank you for your interest in contributing to the Yolda landing page! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful** and inclusive to all contributors
- **Be constructive** in discussions and code reviews
- **Help others** learn and grow
- **Focus on the project goals** and user experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- PHP (v7.4 or higher) - for contact form testing
- Basic knowledge of React and modern JavaScript

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/lending-yolda.git
   cd lending-yolda
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-username/lending-yolda.git
   ```

## 🛠️ Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up email configuration** (for testing contact form):

   ```bash
   cp public/api/email-config-sample.php public/api/email-config.php
   # Edit the file with your test email settings
   ```

3. **Start development server**:

   ```bash
   npm start
   ```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## 🔄 Making Changes

### Branching Strategy

- **main**: Production-ready code
- **develop**: Integration branch for new features
- **feature/feature-name**: Individual feature branches
- **hotfix/issue-description**: Critical bug fixes

### Creating a Feature Branch

```bash
# Switch to develop branch
git checkout develop

# Pull latest changes
git pull upstream develop

# Create your feature branch
git checkout -b feature/your-feature-name

# Make your changes...

# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Messages

Follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat: add contact form validation
fix: resolve mobile navigation issue
docs: update deployment instructions
style: improve button hover animations
refactor: optimize email template rendering
test: add contact form submission tests
chore: update dependencies
```

## 📤 Submitting Changes

### Pull Request Process

1. **Ensure your branch is up-to-date**:

   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/your-feature-name
   git merge develop
   ```

2. **Run tests and build**:

   ```bash
   npm test
   npm run build
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (for UI changes)
   - Testing instructions

### Pull Request Template

```markdown
## 📝 Description

Brief description of changes made.

## 🔗 Related Issues

Closes #123

## 🧪 Testing

- [ ] Manual testing completed
- [ ] Unit tests pass
- [ ] Contact form functionality tested
- [ ] Mobile responsiveness verified

## 📸 Screenshots

(Include before/after screenshots for UI changes)

## ✅ Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Accessibility considerations addressed
```

## 🎨 Style Guidelines

### JavaScript/React

- Use **functional components** with hooks
- Follow **ES6+** standards
- Use **meaningful variable names**
- Add **JSDoc comments** for complex functions
- Keep components **small and focused**

```javascript
// Good
const ContactForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({});

  /**
   * Handles form submission with validation
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implementation...
  };

  return <form onSubmit={handleSubmit}>{/* Form content */}</form>;
};
```

### CSS/Styling

- Use **BEM methodology** for CSS classes
- Follow **mobile-first** approach
- Use **CSS custom properties** for theming
- Keep **consistent spacing** (8px grid system)
- Use **semantic color names**

```css
/* Good */
.contact-form {
  --form-primary-color: #ff9556;
  --form-border-radius: 8px;
  --form-spacing: 1rem;
}

.contact-form__field {
  margin-bottom: var(--form-spacing);
  border-radius: var(--form-border-radius);
}

.contact-form__button--primary {
  background-color: var(--form-primary-color);
  color: white;
}
```

### File Organization

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components
├── styles/
│   ├── base/            # Base styles
│   ├── components/      # Component styles
│   └── utilities/       # Utility classes
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
└── constants/           # Application constants
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test
npm test ContactForm.test.js
```

### Writing Tests

- Write **unit tests** for utility functions
- Write **integration tests** for components
- Test **user interactions** and **edge cases**
- Mock **external dependencies** (API calls)

```javascript
// Example test
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
    });
  });
});
```

## 📚 Documentation

### Code Comments

- Add **JSDoc comments** for functions and components
- Explain **complex algorithms** or business logic
- Document **API endpoints** and expected responses
- Include **usage examples** for utility functions

### README Updates

When making significant changes:

- Update installation instructions
- Update feature descriptions
- Add new configuration options
- Update deployment instructions

## 🐛 Reporting Issues

### Bug Reports

Include the following information:

- **Browser and version**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Console errors**

### Feature Requests

Include the following information:

- **Problem description**
- **Proposed solution**
- **Alternative solutions**
- **Use cases**
- **Priority level**

## 🏷️ Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release notes prepared

## 🆘 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions
- **Email**: [your-email@domain.com](mailto:your-email@domain.com)

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub insights** page

Thank you for contributing to Yolda! 🚀
