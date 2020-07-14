import { SET_ROOMS } from '../actions/rooms'

const initialState = {
  rooms: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms
      };
    default:
      return state;
  }
}
