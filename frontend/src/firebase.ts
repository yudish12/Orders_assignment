// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_APIKEY,
  authDomain: "tapop-assignment.firebaseapp.com",
  projectId: "tapop-assignment",
  storageBucket: "tapop-assignment.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_APIKEY,
  appId:import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;