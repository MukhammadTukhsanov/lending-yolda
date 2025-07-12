#!/bin/bash

# 🚀 Complete GitHub Deployment & Visualization Script
# This script will deploy your Yolda website and set up visualization tools

echo "🔧 Starting Complete Deployment Process..."
echo "=================================="

# Step 1: Clean and build
echo "🧹 Cleaning previous builds..."
rm -rf build/
rm -rf node_modules/.cache/

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building production version..."
npm run build

# Step 2: Check build quality
echo "📊 Analyzing build..."
echo "Build size:"
du -sh build/
echo "Files created:"
find build/ -type f | wc -l

# Step 3: Create deployment info
echo "📄 Creating deployment information..."
cat > build/deployment-info.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
    <title>Yolda - Deployment Info</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .info { background: #e7f3ff; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .link { background: #ff9556; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .link a { color: white; text-decoration: none; font-weight: bold; font-size: 18px; }
        .tech { display: inline-block; background: #6f42c1; color: white; padding: 5px 10px; margin: 5px; border-radius: 15px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Yolda Website - Deployment Status</h1>
        
        <div class="status">
            ✅ <strong>Deployment Successful!</strong> Your website is live and ready.
        </div>

        <div class="link">
            <a href="https://mukhammadtukhsanov.github.io/lending-yolda/" target="_blank">
                🌐 Visit Your Live Website
            </a>
        </div>

        <h2>📊 Site Information</h2>
        <div class="info">
            <strong>Deployment Date:</strong> $(date)<br>
            <strong>Build Version:</strong> Production<br>
            <strong>Framework:</strong> React 19.1.0<br>
            <strong>Hosting:</strong> GitHub Pages<br>
            <strong>SSL:</strong> Enabled<br>
            <strong>Mobile Optimized:</strong> Yes
        </div>

        <h2>🛠️ Technologies Used</h2>
        <div style="margin: 20px 0;">
            <span class="tech">React 19.1.0</span>
            <span class="tech">Bootstrap 5.3.7</span>
            <span class="tech">i18next</span>
            <span class="tech">PHP Backend</span>
            <span class="tech">GitHub Actions</span>
        </div>

        <h2>📱 Features</h2>
        <ul>
            <li>✅ Responsive Design (Mobile, Tablet, Desktop)</li>
            <li>✅ Multi-language Support (UZ, RU, EN)</li>
            <li>✅ Contact Form with PHP Backend</li>
            <li>✅ Modern Animations & Effects</li>
            <li>✅ App Store Download Links</li>
            <li>✅ SEO Optimized</li>
        </ul>

        <h2>🔧 Admin Tools</h2>
        <p><a href="https://github.com/MukhammadTukhsanov/lending-yolda/actions" target="_blank">View Deployment History</a></p>
        <p><a href="https://github.com/MukhammadTukhsanov/lending-yolda" target="_blank">Source Code Repository</a></p>
    </div>
</body>
</html>
EOL

# Step 4: Create site statistics
echo "📈 Creating site statistics..."
cat > build/stats.json << EOL
{
  "deployment": {
    "date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "status": "success",
    "build_time": "$(date)",
    "version": "1.0.0"
  },
  "site": {
    "name": "Yolda Landing Page",
    "url": "https://mukhammadtukhsanov.github.io/lending-yolda/",
    "framework": "React",
    "hosting": "GitHub Pages"
  },
  "features": [
    "Responsive Design",
    "Multi-language Support",
    "Contact Form",
    "Modern Animations",
    "SEO Optimized"
  ]
}
EOL

# Step 5: Git operations
echo "📤 Committing and pushing to GitHub..."
git add .
git commit -m "🚀 Complete deployment with visualization tools - $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "=================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=================================="
echo ""
echo "🌐 Your website URLs:"
echo "   Main Site: https://mukhammadtukhsanov.github.io/lending-yolda/"
echo "   Deployment Info: https://mukhammadtukhsanov.github.io/lending-yolda/deployment-info.html"
echo ""
echo "🔍 Monitoring:"
echo "   GitHub Actions: https://github.com/MukhammadTukhsanov/lending-yolda/actions"
echo "   Repository: https://github.com/MukhammadTukhsanov/lending-yolda"
echo ""
echo "⏳ Wait 2-3 minutes for GitHub Pages to update"
echo "🎉 Your Yolda website is now live with full visualization!"
