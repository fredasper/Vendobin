@echo off
REM VENDOBIN Admin Platform - Quick Setup Script (Windows)

echo 🚀 VENDOBIN Admin Platform - Setup
echo ====================================

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

node --version
echo ✅ Node.js found

REM Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ npm is not installed.
    exit /b 1
)

npm --version
echo ✅ npm found

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
call npm install -w frontend
call npm install -w backend

REM Create .env files if they don't exist
echo.
echo 📝 Setting up environment files...

if not exist "frontend\.env.local" (
    copy frontend\.env.example frontend\.env.local
    echo ⚠️  Created frontend\.env.local - Please update with your Supabase credentials
)

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ⚠️  Created backend\.env - Please update with your Supabase credentials
)

echo.
echo ✅ Setup Complete!
echo.
echo 📚 Next steps:
echo 1. Update frontend\.env.local with your Supabase credentials
echo 2. Update backend\.env with your Supabase credentials
echo 3. Set up database: Visit database\README.md
echo 4. Run 'npm run dev' to start development servers
echo.
echo 📖 Documentation:
echo - Setup: docs\SETUP.md
echo - Architecture: docs\ARCHITECTURE.md
echo - Deployment: docs\DEPLOYMENT.md
echo.
