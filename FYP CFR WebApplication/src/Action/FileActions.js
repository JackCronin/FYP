 import {auth ,database,storage}  from '../Firebase';
export const GET_FILES = 'get_files';
export const FILE_STATUS = 'file_status';
export function getFiles() {
return dispatch => {
      dispatch({
        type: FILE_STATUS,
        payload: true
      });
      database.ref('Files').on('value', snapshot => {
        dispatch({
          type: GET_FILES,
          payload: snapshot.val()
        });
        dispatch({
          type: FILE_STATUS,
          payload: false
        });
      });
    };
  }

export function uploadFile(file,TypeOfUpload,HasTimer,expirydate){
  var UserID = auth.currentUser.uid;
  const storageRef = storage.ref(UserID + '/' + file.name);
   var elem = document.getElementById("myBar");
  return dispatch => {
  var task =  storageRef.put(file);
  task.on('state_changed',
           function progress(snapshot){
               var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
               elem.style.width = parseInt(percentage) + '%';
                elem.innerHTML=parseInt(percentage)+'%';
                if(percentage===100){
                  elem.style.width = "0%";
                  elem.innerHTML="0%"
                  window.alert("Upload Complete");
                }
           },
           function error(err){

           },
           function complete(){
               var downloadURL = task.snapshot.downloadURL;
               var UserID = auth.currentUser.uid;
               const UserRef = database.ref('Users').child(UserID).child('OwnedFiles');
               const FilesRef = database.ref('Files');
               var trimmedFileName = file.name.replace('.pdf','')
               trimmedFileName = trimmedFileName.replace(/\s+/g, '');
               trimmedFileName = trimmedFileName.replace(" ", "_");
                const files = {
                 FileName:trimmedFileName,
                 FileType:TypeOfUpload,
                 HasReminder:HasTimer,
                 ExpiryDate:expirydate,
                 Owner: UserID,
                 downloadURL:downloadURL
                 }
                 const postKey = FilesRef.push(files).key;
                 const user = {
                 [postKey] : true
                   }
                   UserRef.update(user);
             }
    );
       }
}
