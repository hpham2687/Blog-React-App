const apiURL = process.env.REACT_APP_API_ENDPOINT;

async function client(
  endpoint,
  {
    method,
    data,
    token,
    params = null,
    headers: customHeaders,
    ...customConfig
  } = {}
) {
  const config = {
    method: method ? method : data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  var url = new URL(`${apiURL}/${endpoint}`);

  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return window
    .fetch(url, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
    .catch((error) => {
      console.log("vao error");
      console.log({ error });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "UNKNOWN ERROR";
      return Promise.reject(message);
    });
}

export { client };
