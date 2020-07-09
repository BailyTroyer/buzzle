import { NOW_PLAYING } from '../actions/nowPlaying'

const initialState = {
  title: 'Waiting',
  description: '...',
  active: false,
  listen: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOW_PLAYING:
      return {
        ...state,
        title: action.title,
        description: action.description,
        active: action.active,
        listen: action.listen,
      };
    default:
      return state;
  }
}