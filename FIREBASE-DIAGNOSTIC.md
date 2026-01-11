# Firebase Connection Diagnostic Guide

## Quick Browser Console Test

Open your browser's Developer Console (F12) and paste this code:

```javascript
// Test 1: Check if Firebase is initialized
console.log('Firebase apps:', firebase.apps.length);
console.log('Project ID:', firebase.apps[0]?.options?.projectId);

// Test 2: Check environment variables
console.log('Environment:', {
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  offlineMode: import.meta.env.VITE_OFFLINE_MODE,
  hasApiKey: !!import.meta.env.VITE_FB_API_KEY
});

// Test 3: Test Firestore write
const db = firebase.firestore();
db.collection('test').doc('test123').set({test: true, time: new Date()})
  .then(() => console.log('✅ Firestore write successful'))
  .catch(err => console.error('❌ Firestore write failed:', err.code, err.message));
```

## Common Issues and Solutions

### Issue 1: Permission Denied (permission-denied)
**Symptom:** Error code `permission-denied` when trying to create a game
**Cause:** Firestore security rules are blocking writes
**Solution:** Deploy the firestore.rules file

```powershell
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### Issue 2: Environment Variables Not Loading
**Symptom:** `import.meta.env.VITE_FB_PROJECT_ID` is undefined
**Cause:** Vite needs to be restarted after .env changes
**Solution:** 
1. Stop the dev server (Ctrl+C)
2. Restart: `npm start`

### Issue 3: Network/Connection Errors
**Symptom:** Network errors or timeout errors
**Cause:** Firebase project might not be properly configured
**Solution:**
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: planning-poker-custom
3. Go to Firestore Database
4. Ensure Firestore is enabled (not just Realtime Database)
5. Check if rules allow read/write

### Issue 4: Invalid API Key
**Symptom:** "API key not valid" error
**Cause:** API key in .env might be incorrect or Firebase project might not be active
**Solution:**
1. Go to Firebase Console > Project Settings
2. Verify the Web API Key matches VITE_FB_API_KEY in .env
3. Check if project is active and not deleted

## Manual Firestore Rules Update (via Firebase Console)

If you can't use Firebase CLI, update rules manually:

1. Go to: https://console.firebase.google.com/project/planning-poker-custom/firestore/rules
2. Replace rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow read, write: if true;
      
      match /players/{playerId} {
        allow read, write: if true;
      }
    }
  }
}
```

3. Click "Publish"

⚠️ **Note:** These rules allow public read/write access. Fine for development but should be restricted in production.

## Verification Steps

After deploying rules:

1. Open http://localhost:5173/ in your browser
2. Open Developer Console (F12)
3. Try to create a new Planning Poker session
4. Check console for any errors
5. If successful, you should be redirected to `/game/{gameId}`

## Current Configuration Status

✅ Firestore rules file created: `firestore.rules`
✅ firebase.json updated with rules reference
✅ .env file configured with Firebase credentials
✅ Dev server running on http://localhost:5173/

❗ **ACTION REQUIRED:** Deploy Firestore rules to Firebase
