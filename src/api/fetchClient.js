const apiURL = "http://localhost:3000";

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
    if (!params.search) delete params.search;
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
      return Promise.reject(error);
    });
}

export { client };
