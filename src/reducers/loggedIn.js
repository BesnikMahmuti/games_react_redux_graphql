export const isLoggedInReducer = (state = false, { type }) => {
  switch (type) {
    case "SING_IN":
      return !state;
    default:
      return state;
  }
};
