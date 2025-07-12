#!/bin/bash

# 🚀 Deploy Yolda Website - Force GitHub Pages Update

echo "🔨 Building the application..."
npm run build

echo "📤 Committing and pushing changes..."
git add .
git commit -m "🚀 Force deploy: Update GitHub Pages deployment" || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Deployment triggered!"
echo ""
echo "🌐 Your website will be available at:"
echo "   https://mukhammadtukhsanov.github.io/lending-yolda"
echo ""
echo "⏳ Wait 2-3 minutes for deployment to complete"
echo ""
echo "🔍 To check deployment status:"
echo "   1. Go to: https://github.com/MukhammadTukhsanov/lending-yolda"
echo "   2. Click 'Actions' tab"
echo "   3. Look for green checkmark ✅"
echo ""
echo "🚫 Common mistakes:"
echo "   ❌ Don't visit: https://github.com/MukhammadTukhsanov/lending-yolda (this shows docs)"
echo "   ✅ Visit: https://mukhammadtukhsanov.github.io/lending-yolda (this shows website)"
echo ""
