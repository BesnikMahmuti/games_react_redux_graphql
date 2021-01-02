export const togglePanel = (toggle) => {
  return {
    type: "toggle_panel",
    payload: { toggle },
  };
};
