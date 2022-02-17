// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: '', // Your Firebase API key
  authDomain: '', // Your Firebase authentication domain
  projectId: '', // Your Firebase project ID
  storageBucket: '', // Your Firebase storage bucket URL
  messagingSenderId: '', // Your Firebase messaging sender ID
  appId: '', // Your Firebase app ID
  measurementId: '', // Your Firebase measurement ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export default firebaseConfig;
