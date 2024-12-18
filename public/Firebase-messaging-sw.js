// // Import scripts from Firebase Messaging SDK
// importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js');

// // Initialize Firebase app

// const firebaseConfig = {
//   apiKey: "AIzaSyBtfGb195fvSuS4x0M27p9hJPh4mGgs31U",
//   authDomain: "tiwil-demo.firebaseapp.com",
//   projectId: "tiwil-demo",
//   storageBucket: "tiwil-demo.firebasestorage.app",
//   messagingSenderId: "120748311810",
//   appId: "1:120748311810:web:01def73a86a53d81f32e1b",
//   measurementId: "G-LVYM2FRKY6"
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve Firebase Messaging instance
// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
