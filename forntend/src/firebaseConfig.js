// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // const firebaseConfig = {
// //     apiKey: "AIzaSyDT_BTf0uf1aNQj_PD4KH5JRLY3YzXNwLc",
// //     authDomain: "eco-circuit.firebaseapp.com",
// //     projectId: "eco-circuit",
// //     storageBucket: "eco-circuit.firebasestorage.app",
// //     messagingSenderId: "64851230049",
// //     appId: "1:64851230049:web:673f114fd3be4776451920",
// //     measurementId: "G-L8R4K43EGC"
// //   };

// const firebaseConfig = {
//   apiKey: "AIzaSyALwDQAaEdgET3dCecBi2dTfWS1AkWLy2g",
//   authDomain: "fir-738bb.firebaseapp.com",
//   databaseURL: "https://fir-738bb-default-rtdb.firebaseio.com",
//   projectId: "fir-738bb",
//   storageBucket: "fir-738bb.firebasestorage.app",
//   messagingSenderId: "267566724926",
//   appId: "1:267566724926:web:df173889472fd432e29e6f",
//   measurementId: "G-TESHEZ4GZS"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { app, auth, db };



import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAtvlUBAIc702HFjXcbh0D9yDrqEs7-0sk",
  authDomain: "e-waste-d44ea.firebaseapp.com",
    projectId: "e-waste-d44ea",
  storageBucket: "e-waste-d44ea.firebasestorage.app",
  messagingSenderId: "696755446239",
  appId: "1:696755446239:web:195f774f333461c15e246a",
  measurementId: "G-W255TGF6EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export required functions
export { auth, db, signInWithPopup, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
