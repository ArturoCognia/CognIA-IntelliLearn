// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2SyW8F0RSYud2XSwwB0HIYR_PtBgSV_s",
  authDomain: "cogniaintellilearn-ebdb3.firebaseapp.com",
  projectId: "cogniaintellilearn-ebdb3",
  storageBucket: "cogniaintellilearn-ebdb3.appspot.com", // Corrected: firebasestorage.app is for admin SDK or direct file access, appspot.com is for web SDK
  messagingSenderId: "194652864291",
  appId: "1:194652864291:web:b73315ee3dcba5e3741696",
  measurementId: "G-CWXL91H9LP"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics }; 