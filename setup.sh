#!/bin/bash

# VENDOBIN Admin Platform - Quick Setup Script
# This script sets up the project for local development

echo "🚀 VENDOBIN Admin Platform - Setup"
echo "===================================="

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install
npm install -w frontend
npm install -w backend

# Create .env files if they don't exist
echo ""
echo "📝 Setting up environment files..."

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo "⚠️  Created frontend/.env.local - Please update with your Supabase credentials"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "⚠️  Created backend/.env - Please update with your Supabase credentials"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📚 Next steps:"
echo "1. Update frontend/.env.local with your Supabase credentials"
echo "2. Update backend/.env with your Supabase credentials"
echo "3. Set up database: Visit database/README.md"
echo "4. Run 'npm run dev' to start development servers"
echo ""
echo "📖 Documentation:"
echo "- Setup: docs/SETUP.md"
echo "- Architecture: docs/ARCHITECTURE.md"
echo "- Deployment: docs/DEPLOYMENT.md"
echo ""
