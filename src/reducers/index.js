import { combineReducers } from 'redux';
import auth from './auth';
import nowPlaying from './nowPlaying';
// import audioStream from './audioStream';

const rootReducer= combineReducers({
  auth,
  nowPlaying,
  // audioStream
});

export default rootReducer;