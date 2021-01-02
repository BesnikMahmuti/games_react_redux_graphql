export const gamesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "LISTGAMES":
      console.log({ state });
      return (state = {
        games: payload.games || state.games,
        pagination:
          (payload.gamespagination && payload.gamespagination[0]) ||
          state.pagination,
        offset: payload.offset || 0,
      });
    default:
      return state;
  }
};
