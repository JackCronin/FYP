 import firebase  from '../Firebase';
import {database}  from '../Firebase';
export const GET_FILES = 'get_files';
export function getFiles(UserID) {
  return dispatch => {
       firebase.database().ref('Users/'+UserID+'/OwnedFiles').on('value', data => {
      dispatch({
        type: GET_FILES,
        payload: data.val()
      })
    })
  };
}

export function uploadFile(file){
  var UserID = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref(UserID + '/' + file.name);
  return dispatch => storageRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
}
  export function uploadFileDetailsToDB(file){
  var UserID = firebase.auth().currentUser.uid;
  const UserRef = database.ref('Users').child(UserID);
  var trimmedFileName = file.name.replace('.pdf','')
  trimmedFileName = file.name.replace(/\s+/g, '');
  const user = {
    OwnedFiles:{ [trimmedFileName] : true
    }
  }
return dispatch =>   UserRef.update(user);
}
