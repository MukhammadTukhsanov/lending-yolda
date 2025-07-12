#!/bin/bash

# 🔍 Check Yolda Website Deployment Status

echo "🔍 Checking Yolda Website Deployment Status..."
echo "================================================"

# Check if website is accessible
echo "📡 Testing website accessibility..."
if curl -s --head https://mukhammadtukhsanov.github.io/lending-yolda/ | grep "200 OK" > /dev/null; then
    echo "✅ Website is accessible!"
else
    echo "❌ Website is not accessible yet"
fi

# Check content type
echo ""
echo "📄 Checking content type..."
CONTENT_TYPE=$(curl -s -I https://mukhammadtukhsanov.github.io/lending-yolda/ | grep -i "content-type")
echo "Content-Type: $CONTENT_TYPE"

# Check if it's serving the React app or documentation
echo ""
echo "🔍 Checking if React app is being served..."
if curl -s https://mukhammadtukhsanov.github.io/lending-yolda/ | grep -q "react\|Yolda.*delivery\|app-store"; then
    echo "✅ React app detected!"
else
    echo "❌ Still serving documentation or other content"
fi

# Check last modified
echo ""
echo "🕒 Last deployment time..."
LAST_MODIFIED=$(curl -s -I https://mukhammadtukhsanov.github.io/lending-yolda/ | grep -i "last-modified")
echo "Last-Modified: $LAST_MODIFIED"

echo ""
echo "🌐 Your website URL: https://mukhammadtukhsanov.github.io/lending-yolda/"
echo "⚙️ GitHub Actions: https://github.com/MukhammadTukhsanov/lending-yolda/actions"
echo ""
echo "💡 If still showing documentation:"
echo "   1. Wait 2-3 more minutes for deployment"
echo "   2. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)"
echo "   3. Try incognito/private window"
echo "   4. Check GitHub Actions for any deployment errors"
