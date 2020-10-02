import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBiHDzyHXtAYmDXWzuM1yQmaj7TWOw4Gxc",
  authDomain: "extractify-258bb.firebaseapp.com",
  databaseURL: "https://extractify-258bb.firebaseio.com",
  projectId: "extractify-258bb",
  storageBucket: "extractify-258bb.appspot.com",
  messagingSenderId: "311376032338",
  appId: "1:311376032338:web:cfbf679c3f7362e44b258b",
  measurementId: "G-J3D56XFP3B",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
