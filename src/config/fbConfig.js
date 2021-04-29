import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdLHOzWGYs5rYHWjRmf9M466dgISzHXnI",
  authDomain: "pre-pay.firebaseapp.com",
  projectId: "pre-pay",
  storageBucket: "pre-pay.appspot.com",
  messagingSenderId: "344884549354",
  appId: "1:344884549354:web:12c4b7cf8339de9225e993"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
