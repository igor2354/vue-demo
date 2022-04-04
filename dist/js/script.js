// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBlGBBkwiiphkCc4SdvVgPuRJTQZO7BuJk",
	authDomain: "test-vue-8fb26.firebaseapp.com",
	projectId: "test-vue-8fb26",
	storageBucket: "test-vue-8fb26.appspot.com",
	messagingSenderId: "52140775523",
	appId: "1:52140775523:web:90f0bee3965c3225198056",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
