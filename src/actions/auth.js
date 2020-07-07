export const AUTH_GOOGLE = 'AUTH_GOOGLE'

export const authGoogle = (email, tokenId, name, imageUrl, authGoogle) => ({
  type: AUTH_GOOGLE,
  authGoogle,
  email,
  tokenId,
  name,
  imageUrl,
});