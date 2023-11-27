import axios from "axios";

export const axiosPostRequest = async (apiUrl, formData) => {
  const { data } = await axios.post(apiUrl, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    data,
  };
};
