import axios from "axios";

export const axiosGetRequest = async (apiUrl) => {
  const { data } = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return {
    data,
  };
};
