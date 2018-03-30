import {GET_DATABASE_GROUPS} from '../Action/GroupActions';
export default function (state = {}, action) {
  switch (action.type) {
    case GET_DATABASE_GROUPS:
      return action.payload;
    default:
      return state;
  }
}
