import { API_KEY, AUTH_DOMAIN, PROJECT_ID, APP_ID } from "./../config/env"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  appId: APP_ID
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);
export default firebase_app;