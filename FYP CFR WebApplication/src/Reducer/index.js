import {combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'
import UserReducer from './UserReducer'
import LoadingReducer from './LoadingReducer'
import FileReducer from './FileReducer'
import DatabaseUserReducer from './DatabaseUserReducer'
import GroupReducer from './GroupReducer'

const rootReducer = combineReducers({
  form : formReducer,
  user : UserReducer,
  loading : LoadingReducer,
  files : FileReducer,
  databaseUser : DatabaseUserReducer,
  group : GroupReducer
});

export default rootReducer;
