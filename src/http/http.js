import axios from "axios";

export const post = async (url, payload, requestHeaders) => {
  const { data = [] } = await axios.post(`${url}`, payload, {
    headers: requestHeaders,
  });

  if (!data) return [];
  return data;
};
