import { auth ,database } from '../Firebase';
import firebase from '../Firebase';
export const GET_USER = 'get_user';
export function getUser() {
  return dispatch => {
      auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user
      })
    })
  };
}

export function login(email, password) {
  return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return dispatch => auth.signOut();
}

export function RegisterUser(email, password) {
return dispatch => auth.createUserWithEmailAndPassword(email, password);
}

export function RegisterUserOnDatabase(email,date_of_birth,name,group_name) {
  var UserID = firebase.auth().currentUser.uid;
  const UserRef = database.ref('Users').child(UserID);
  const user = {
    name: name,
    date_of_birth: date_of_birth,
    email: email,
    "Groups" : {
        [group_name] : true
      }
  }
return dispatch =>   UserRef.set(user);
}
