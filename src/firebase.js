import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDgJMWtYUJZ1xwRSw6ukt8wAuHGD_LpBro",
  authDomain: "chatapp-e3a98.firebaseapp.com",
  projectId: "chatapp-e3a98",
  storageBucket: "chatapp-e3a98.appspot.com",
  messagingSenderId: "801420374808",
  appId: "1:801420374808:web:6c09baf8f613a31284246d"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider()
export default db;
export {auth,provider}