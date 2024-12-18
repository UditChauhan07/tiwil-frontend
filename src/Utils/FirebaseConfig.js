// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage  } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyBtfGb195fvSuS4x0M27p9hJPh4mGgs31U",
//     authDomain: "tiwil-demo.firebaseapp.com",
//     projectId: "tiwil-demo",
//     storageBucket: "tiwil-demo.firebasestorage.app",
//     messagingSenderId: "120748311810",
//     appId: "1:120748311810:web:01def73a86a53d81f32e1b",
//     measurementId: "G-LVYM2FRKY6"
//   };
  
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);


// // Register the Service Worker
// navigator.serviceWorker
//   .register('/firebase-messaging-sw.js')
//   .then((registration) => {
//     messaging.useServiceWorker(registration);
//     console.log('Service Worker registered successfully.');
//   })
//   .catch((err) => {
//     console.error('Service Worker registration failed:', err);
//   });




// // Get FCM Token
// export const getFCMToken = async () => {
//     try {
//       const token = await getToken(messaging, { vapidKey: "BEXglLGTtsfFa59esU_8cZfffxp0QuCRtgnfLgUrVtLb4RH9q46lzYVIhY5JtY7Xp8XO83wpAo6c4TSh_PiLb-A" });
//       console.log("FCM Token:", token);
//       return token;
//     } catch (error) {
//       console.error("Error getting FCM Token:", error);
//     }
//   };


  // Listen to Messages
// onMessage(messaging, (payload) => {
//     console.log("Message received. ", payload);
//   });

// Notification Listener
// export const listenToMessages = (setNotification) => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received: ", payload);
//       setNotification(payload.notification); // Set notification in state
//     });
//   };