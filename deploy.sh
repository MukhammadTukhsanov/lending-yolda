#!/bin/bash

# 🚀 Yolda Landing Page Deployment Script
# This script will build and prepare your project for GitHub Pages

echo "🚀 Starting Yolda Landing Page deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git repository is configured
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Please initialize git first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
git status

# Add all changes
echo "➕ Adding changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_message
if [ -z "$commit_message" ]; then
    commit_message="🚀 Deploy Yolda landing page with contact form"
fi

git commit -m "$commit_message"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "🌐 Your site will be available at:"
    echo "   https://mukhammadtukhsanov.github.io/lending-yolda"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Go to your GitHub repository settings"
    echo "   2. Navigate to 'Pages' section"
    echo "   3. Select 'GitHub Actions' as the source"
    echo "   4. Wait for the deployment to complete (check Actions tab)"
    echo ""
    echo "🎉 Your beautiful Yolda landing page will be live soon!"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi
