export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    console.log('SAVING STATE TO LOCALSTORE');
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // eslint-disable-next-line
    console.log('Error in saveState(): ', err);
  }
};