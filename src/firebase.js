import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbAqfldGzoJdL9WcFuyVaiMlew249QRME",
  authDomain: "insta-clone-app-77662.firebaseapp.com",
  projectId: "insta-clone-app-77662",
  storageBucket: "insta-clone-app-77662.appspot.com",
  messagingSenderId: "723541316272",
  appId: "1:723541316272:web:e19b0be7a3e071ae40e175",
  measurementId: "G-CRY969FNXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
