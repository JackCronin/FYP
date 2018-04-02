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
export function updateUser(name, about,date_of_birth,email,phone_number) {
  var UserID = auth.currentUser.uid;
  const UserRef = database.ref('Users').child(UserID);
  const NewUser = {
    name: name,
    date_of_birth: date_of_birth,
    email: email,
    AboutMe:about,
    phone_number:phone_number
  }


  return dispatch =>  {
    UserRef.update(NewUser);
    auth.currentUser.updateEmail(email)
  }
}

export function RegisterUser(email,password,date_of_birth,name,group_name_mem,phone_number) {
return dispatch => auth.createUserWithEmailAndPassword(email, password).then((user) => {
  var UserID = user.uid;
  var defaultAboutMe="Say Something About Yourself..."
  var defaultpic = "https://firebasestorage.googleapis.com/v0/b/my-project-1513724414662.appspot.com/o/Images%2FDefaultImage?alt=media&token=3deaf519-9b7c-4633-9357-465eea6b7a65"
  const UserRef = database.ref('Users').child(UserID);
  const GroupRegRef = database.ref('Groups').child(group_name_mem).child("Members");
  const NewestGroup = {
      [UserID]:true
      }
  const NewUser = {
    name: name,
    date_of_birth: date_of_birth,
    email: email,
    ProfilePicURL:defaultpic,
      phone_number:phone_number,
    AboutMe:defaultAboutMe,
    Group : group_name_mem

  }
  GroupRegRef.update(NewestGroup);
 UserRef.set(NewUser);
})}
