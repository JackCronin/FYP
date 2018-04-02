import {GET_SCHEDULE} from '../Action/ScheduleActions';
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SCHEDULE:
      return action.payload;
    default:
      return state;
  }
}
