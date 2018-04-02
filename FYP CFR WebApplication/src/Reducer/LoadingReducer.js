import { USER_DATABASE_STATUS, USER_STATUS } from '../Action/UserActions';
import { FILE_STATUS } from '../Action/FileActions';
import { GROUPS_DATABASE_STATUS } from '../Action/GroupActions';
import { SCHEDULE_STATUS } from '../Action/ScheduleActions';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_STATUS:
      return { ...state, user: action.payload };
    case USER_DATABASE_STATUS:
      return { ...state, databaseUser: action.payload };
      case FILE_STATUS:
        return { ...state, files: action.payload };
        case GROUPS_DATABASE_STATUS:
          return { ...state, group: action.payload };
          case SCHEDULE_STATUS:
            return { ...state, schedule: action.payload };
    default:
      return state;
  }
}
