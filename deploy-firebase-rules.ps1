#!/usr/bin/env pwsh
# Firebase Rules Deployment Script for Windows PowerShell

Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Firebase Firestore Rules Deployment      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

# Refresh PATH
$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "`nStep 1: Checking Firebase CLI..." -ForegroundColor Yellow
$firebaseVersion = firebase --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Firebase CLI installed: $firebaseVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Firebase CLI not found. Installing..." -ForegroundColor Red
    npm install -g firebase-tools
}

Write-Host "`nStep 2: Logging into Firebase..." -ForegroundColor Yellow
Write-Host "This will open your browser for authentication." -ForegroundColor Gray
firebase login --no-localhost

Write-Host "`nStep 3: Setting active project..." -ForegroundColor Yellow
firebase use planning-poker-custom

Write-Host "`nStep 4: Deploying Firestore rules..." -ForegroundColor Yellow
firebase deploy --only firestore:rules

Write-Host "`n✅ Firestore rules deployment complete!" -ForegroundColor Green
Write-Host "`nYou can now create Planning Poker sessions." -ForegroundColor Cyan
Write-Host "Visit: http://localhost:5173/" -ForegroundColor White

Read-Host "`nPress Enter to exit"
