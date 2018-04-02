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
  export function fileDelete(downloadURL){
    console.log("Got to next");
    var desertRef = storage.refFromURL(downloadURL)
    console.log(desertRef);
    var UserID = auth.currentUser.uid;
// Delete the file
  desertRef.delete().then(function() {
  console.log("Got to fins");
  window.alert("File Deleted");

  const FilesRef = database.ref('Files').orderByChild("downloadURL").equalTo(downloadURL).once('value')
  .then(snap => {
      snap.forEach(childSnap => {
    window.alert(childSnap.key);
    const UserRef = database.ref('Users').child(UserID).child("OwnedFiles");
    const RealFileRef = database.ref('Files');
      UserRef.child(childSnap.key).remove();
      RealFileRef.child(childSnap.key).remove();

})
})
}).catch(function(error) {
    window.alert("Delete Failed");
});
  return dispatch =>{

  }
}
export function uploadImage(myImage){
  var UserID = auth.currentUser.uid;
  var Default = "DefaultImage"
  const storageRef = storage.ref("Images/" + UserID);
  var elem = document.getElementById("myBar");
 return dispatch => {
 var task =  storageRef.put(myImage);
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
            window.alert("Upload Failed");
          },
          function complete(){
              var downloadURL = task.snapshot.downloadURL;
              var UserID = auth.currentUser.uid;
              const UserRef = database.ref('Users').child(UserID);
              const user = {
                ProfilePicURL : downloadURL
                  }
                  UserRef.update(user);
            }
   );
      }
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
             window.alert("Upload Failed");
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
