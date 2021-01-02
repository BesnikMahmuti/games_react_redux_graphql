export const PanelReducer = (state = false, { type, payload }) => {
  switch (type) {
    case "toggle_panel":
      console.log({ state });
      return (state = payload.toggle);
    default:
      return state;
  }
};
