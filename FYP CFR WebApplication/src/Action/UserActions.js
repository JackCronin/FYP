import { auth ,database } from '../Firebase';
export const GET_USER = 'get_user';
export const GET_DATABASE_USERS = 'get_database_users';
export const USER_STATUS = 'user_status';
export const USER_DATABASE_STATUS = 'user_database_status';
export function getUser() {
  return dispatch => {
    dispatch({
      type: USER_STATUS,
      payload: true
    });
    auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user
      });
      dispatch({
        type: USER_STATUS,
        payload: false
      });
    });
  };
}
export function getDatabaseUsers() {
  return dispatch => {
    dispatch({
      type: USER_DATABASE_STATUS,
      payload: true
    });
    database.ref('Users').on('value', db => {
      dispatch({
        type: GET_DATABASE_USERS,
        payload: db.val()
      });
      dispatch({
        type: USER_DATABASE_STATUS,
        payload: false
      });
    });
  };
}

export function login(email, password) {
  return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return dispatch => auth.signOut();
}

export function RegisterUser(email,password,date_of_birth,name,group_name_mem) {
return dispatch => auth.createUserWithEmailAndPassword(email, password).then((user) => {
  var UserID = user.uid;
  const UserRef = database.ref('Users').child(UserID);
  const NewUser = {
    name: name,
    date_of_birth: date_of_birth,
    email: email,
    "Groups" : {
        [group_name_mem] : true
      }
  }
  UserRef.set(NewUser);
})}
