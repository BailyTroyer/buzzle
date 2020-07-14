import { combineReducers } from 'redux';
import auth from './auth';
import nowPlaying from './nowPlaying';
// import audioStream from './audioStream';
import rooms from './rooms'

const rootReducer= combineReducers({
  auth,
  nowPlaying,
  // audioStream
  rooms,
});

export default rootReducer;
