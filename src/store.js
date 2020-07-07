import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

const w= window;
const devtools = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;
const middleware = applyMiddleware(reduxThunk);
const persistedState = loadState();

// persisted state nothing?
const store = middleware(devtools(createStore))(rootReducer, persistedState);
// const store = middleware(devtools(createStore))(rootReducer)

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;