import { auth ,database } from '../Firebase';
export const GET_DATABASE_GROUPS = 'get_database_groups';
export const GROUPS_DATABASE_STATUS = 'groups_database_status';
//get group object from firerbase database
export function getGroups() {
  return dispatch => {
    dispatch({
      type: GROUPS_DATABASE_STATUS,
      payload: true
    });
    database.ref('Groups').on('value', db => {
      dispatch({
        type: GET_DATABASE_GROUPS,
        payload: db.val()
      });
      dispatch({
        type: GROUPS_DATABASE_STATUS,
        payload: false
      });
    });
  };
}
//remove user from group on firebase database
export function RemoveUserFromGroup(memberToRemove, GroupID) {
  var UserID = auth.currentUser.uid;
  const GroupRemoveRef =  database.ref('Groups/'+GroupID+'/Members');
  const GroupAddToRef =  database.ref('Groups/-L8o5GFUNOQyVEFOQ6ZV/Members');
  const NewGroup = {
Members :{
  [UserID] : true
}
  }

  return dispatch => {
    GroupRemoveRef.child(UserID).remove();
  GroupAddToRef.update(NewGroup);
  const UserRef = database.ref('Users').child(UserID);
  const NewUser = {
    isGroupLeader:true,
    Group:"-L8o5GFUNOQyVEFOQ6ZV"
  }
  UserRef.update(NewUser);
}}
//register a new group on database 
export function RegisterGroup(groupemail,group_location,group_name) {
const GroupRef = database.ref('Groups');
const GroupRemoveRef =  database.ref('Groups/-L8o5GFUNOQyVEFOQ6ZV/Members');
  var UserID = auth.currentUser.uid;
  const NewGroup = {
    GroupName: group_name,
    GroupLocation: group_location,
    GroupEmail: groupemail,
    GroupLeader:UserID,
    Members:{
[UserID]:true
    }
  }

  return dispatch => {
    GroupRemoveRef.child(UserID).remove();

  var newgroupkey = GroupRef.push(NewGroup).getKey();
  const UserRef = database.ref('Users').child(UserID);
  const NewUser = {
    isGroupLeader:true,
    Group:newgroupkey
  }
  UserRef.update(NewUser);
}}
