import * as firebase from "firebase";
import "firebase/database"

import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKnDGXuahUVgGP2CLfTi9sSlBeBnC1tK8",
  authDomain: "react-contact-e3c2c.firebaseapp.com",
  projectId: "react-contact-e3c2c",
  storageBucket: "react-contact-e3c2c.appspot.com",
  messagingSenderId: "421623974991",
  appId: "1:421623974991:web:0bd95b49bb46fd147bee3a",
  databaseURL:"https://react-contact-e3c2c-default-rtdb.firebaseio.com/",
};

  

  const fireDb = firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.database.ServerValue.TIMESTAMP;
const fireDbRef = fireDb.database().ref();
  // export default fireDb.database().ref();

  export { timestamp, projectStorage, projectFirestore,fireDbRef  }