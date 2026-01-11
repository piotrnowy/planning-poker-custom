// Firebase Connection Test
// Add this code temporarily to src/index.tsx or run in browser console

import firebase from 'firebase/app';
import 'firebase/firestore';

console.log('=== Firebase Connection Test ===');

// Check if Firebase is initialized
console.log('1. Firebase apps:', firebase.apps.length);
if (firebase.apps.length > 0) {
  console.log('   ✅ Firebase is initialized');
  console.log('   Project ID:', firebase.apps[0].options.projectId);
  console.log('   Auth Domain:', firebase.apps[0].options.authDomain);
} else {
  console.log('   ❌ Firebase is NOT initialized');
}

// Check environment variables
console.log('2. Environment Variables:');
console.log('   VITE_FB_PROJECT_ID:', import.meta.env.VITE_FB_PROJECT_ID);
console.log('   VITE_FB_API_KEY:', import.meta.env.VITE_FB_API_KEY ? '✅ Set' : '❌ Not set');
console.log('   VITE_OFFLINE_MODE:', import.meta.env.VITE_OFFLINE_MODE);
console.log('   VITE_USE_FIRESTORE_EMULATOR:', import.meta.env.VITE_USE_FIRESTORE_EMULATOR);

// Test Firestore connection
async function testFirestoreConnection() {
  try {
    console.log('3. Testing Firestore connection...');
    const db = firebase.firestore();
    
    // Try to write a test document
    const testRef = db.collection('test').doc('connection-test');
    await testRef.set({
      timestamp: new Date(),
      test: 'Firebase connection test'
    });
    console.log('   ✅ Write test successful');
    
    // Try to read the test document
    const doc = await testRef.get();
    if (doc.exists) {
      console.log('   ✅ Read test successful');
      console.log('   Data:', doc.data());
    }
    
    // Clean up
    await testRef.delete();
    console.log('   ✅ Delete test successful');
    
    console.log('✅ Firebase connection is working correctly!');
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:');
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    console.error('   Full error:', error);
    
    if (error.code === 'permission-denied') {
      console.error('   🔒 FIRESTORE RULES ISSUE: Database access is blocked by security rules');
      console.error('   📝 Solution: Deploy firestore.rules to Firebase');
      console.error('   Run: firebase deploy --only firestore:rules');
    }
    
    return false;
  }
}

// Run the test
if (firebase.apps.length > 0) {
  testFirestoreConnection();
}

console.log('=== End of Firebase Connection Test ===');
