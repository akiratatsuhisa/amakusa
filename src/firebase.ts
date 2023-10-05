// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCeYPR3Vd3j8one2sh8kPa3zviD5ut1WWQ',
  authDomain: 'amakusa-d95a0.firebaseapp.com',
  projectId: 'amakusa-d95a0',
  storageBucket: 'amakusa-d95a0.appspot.com',
  messagingSenderId: '1027518608180',
  appId: '1:1027518608180:web:eefec4f84b81fb79882b61',
  measurementId: 'G-WDNF181YPS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const storage = getStorage(app);
