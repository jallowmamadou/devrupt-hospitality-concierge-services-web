importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB8cd38RbSuDKIk8Wy69nq0evwbhBVBzaA",
  authDomain: "teraal-513cf.firebaseapp.com",
  databaseURL:
    "https://teraal-513cf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teraal-513cf",
  storageBucket: "teraal-513cf.appspot.com",
  messagingSenderId: "770350870608",
  appId: "1:770350870608:web:1194ad95032e8bc1e26155",
  measurementId: "G-W14HPTB1MK",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
