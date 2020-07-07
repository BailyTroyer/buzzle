import { AUTH_GOOGLE } from '../actions/auth'

const initialState = {
  authGoogle: false,
  email: '',
  tokenId: '',
  name: '',
  imageUrl: '',
  token: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_GOOGLE:
      return {
        ...state,
        authGoogle: action.authGoogle,
        email: action.email,
        tokenId: action.tokenId,
        name: action.name,
        imageUrl: action.imageUrl,
        token: action.token,
      };
    default:
      return state;
  }
}