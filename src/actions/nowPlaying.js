export const NOW_PLAYING = 'NOW_PLAYING'

export const setNowPlaying = (title, description, active, listen, user) => ({
  type: NOW_PLAYING,
  title,
  description,
  active,
  listen,
  user
});