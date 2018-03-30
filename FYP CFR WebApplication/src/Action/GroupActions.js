import { auth ,database } from '../Firebase';
export const GET_DATABASE_GROUPS = 'get_database_groups';
export const GROUPS_DATABASE_STATUS = 'groups_database_status';
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
export function RegisterGroup(groupemail,group_location,group_name) {
const GroupRef = database.ref('Groups');
  const NewGroup = {
    GroupName: group_name,
    GroupLocation: group_location,
    GroupEmail: groupemail,
  }
  return dispatch => {
  GroupRef.push(NewGroup);
}}
