import { GET_DATABASE_USERS } from '../Action/UserActions';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_DATABASE_USERS:
      return action.payload;
    default:
      return state;
  }
}
