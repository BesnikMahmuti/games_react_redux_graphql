export const list_games = (limit, offset) => {
  return {
    query: `
  {
      games(limit:${limit},offset:${offset}) {
      id
      name
      published_date
      banner_url
      platforms
      publisher {
          id
          name
      }
      }
      gamespagination {
        total
      }
  }
  `,
  };
};
