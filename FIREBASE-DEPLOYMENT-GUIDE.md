# 🔥 Firebase Rules Deployment Guide

## Problem
You're getting "This page has moved to new location" error when accessing the Firebase Console Firestore Rules page.

## Solution - Two Options

---

## ✅ OPTION 1: Deploy via Firebase CLI (RECOMMENDED)

This is the fastest and most reliable method.

### Step-by-Step Commands:

Open PowerShell in your project directory and run these commands:

```powershell
# 1. Login to Firebase (will open browser)
firebase login

# 2. Set the active project
firebase use planning-poker-custom

# 3. Deploy the firestore rules
firebase deploy --only firestore:rules
```

### Or use the automated script:

```powershell
.\deploy-firebase-rules.ps1
```

### Expected Output:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/planning-poker-custom/overview
```

---

## ✅ OPTION 2: Deploy via Firebase Console (Manual)

If the CLI doesn't work or you prefer the web interface:

### Step 1: Access Firebase Console
Go to the main Firebase Console:
- **URL:** https://console.firebase.google.com/

### Step 2: Select Your Project
- Look for **"planning-poker-custom"** in the project list
- Click on it to open the project

### Step 3: Navigate to Firestore Database
- In the left sidebar, find **"Build"** section
- Click on **"Firestore Database"**
- You should see your database dashboard

### Step 4: Open Rules Tab
- At the top of the Firestore page, you'll see tabs: **Data**, **Rules**, **Indexes**, **Usage**
- Click on the **"Rules"** tab

### Step 5: Replace the Rules
Copy this content and paste it into the rules editor:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to all documents in the games collection
    match /games/{gameId} {
      allow read, write: if true;
      
      // Allow read and write access to all documents in the players subcollection
      match /players/{playerId} {
        allow read, write: if true;
      }
    }
  }
}
```

### Step 6: Publish
- Click the **"Publish"** button
- Wait for confirmation message

---

## 🔍 Troubleshooting

### If you can't find your project:
1. Make sure you're logged into the correct Google account
2. Check if the project exists at: https://console.firebase.google.com/
3. Verify the project ID is "planning-poker-custom"

### If Firestore is not enabled:
1. Go to Firebase Console > Build > Firestore Database
2. Click "Create database"
3. Choose production mode
4. Select a location (closest to your users)
5. Then add the rules

### If CLI login fails:
Try with the `--no-localhost` flag:
```powershell
firebase login --no-localhost
```

---

## ✔️ Verification

After deploying the rules, test your application:

1. Open http://localhost:5173/
2. Try to create a new Planning Poker session
3. Fill in the session name and your name
4. Click "Create Session"
5. You should be redirected to `/game/{gameId}`

If it works, you'll see the game board! 🎉

---

## 📋 Quick Reference

**Your Firebase Project ID:** `planning-poker-custom`

**Current Rules Location:** `./firestore.rules`

**Firebase Config Location:** `./.firebaserc`

**Environment Variables:** `./.env`

---

## 🚨 Important Notes

⚠️ **Security Warning:** The current rules allow public read/write access to all game and player data. This is fine for development but should be restricted in production.

For production, consider rules like:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      // Allow anyone to read games
      allow read: if true;
      // Only allow writes if certain conditions are met
      allow write: if request.auth != null || 
                     request.resource.data.createdAt == null;
      
      match /players/{playerId} {
        allow read: if true;
        allow write: if true;
      }
    }
  }
}
```

---

## 📞 Still Having Issues?

If you're still experiencing problems:

1. Check browser console (F12) for specific error messages
2. Verify Firebase project is active (not deleted)
3. Ensure Firestore is enabled (not just Realtime Database)
4. Check if your Firebase plan supports Firestore (Spark plan does)

---

**Last Updated:** January 11, 2026
**Project:** planning-poker-custom
**Status:** Dev Server Running ✅
**Rules File:** Created ✅
**Action Required:** Deploy Rules ⏳
