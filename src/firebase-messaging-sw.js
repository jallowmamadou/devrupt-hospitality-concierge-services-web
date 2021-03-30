importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");

const firebaseConfig = {
    apiKey: 'empty',
    authDomain: 'empty',
    projectId: 'empty',
    storageBucket: 'empty',
    messagingSenderId: 'empty',
    appId: 'empty',
    measurementId: 'empty',
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
