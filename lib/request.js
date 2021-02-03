const axios = require("axios");

const sendHttpRequest = async ({ url, method, body, headers }) => {
  headers ? headers = headers : headers = {
        headers: {
          "Content-type": "application/json",
        },
      };

  try {
    const { data } = method === ("get" || "delete")
        ? await axios[method](url, headers)
        : await axios[method](url, body, headers);

    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw errorMessage;
  }
};

module.exports = {
  sendHttpRequest,
};
