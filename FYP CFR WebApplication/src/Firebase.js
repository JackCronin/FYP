import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCw84Yw2OuywA3RtRooUV7M8ZTItRILHI8",
  authDomain: "my-project-1513724414662.firebaseapp.com",
  databaseURL: "https://my-project-1513724414662.firebaseio.com",
  projectId: "my-project-1513724414662",
  storageBucket: "my-project-1513724414662.appspot.com",
  messagingSenderId: "662903646932"
};
firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();
export const storageRef = firebase.storage();
export default firebase;
