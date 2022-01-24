import { server, rest } from "mocks/test-server";
import { client } from "api/fetchClient";
const apiURL = process.env.REACT_APP_API_ENDPOINT;

test("adds auth token when a token is provided", async () => {
  const token = "FAKE_TOKEN";

  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await client(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("allows for config overrides", async () => {
  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const customConfig = {
    method: "PUT",
    headers: { "Content-Type": "fake-type" },
  };
  await client(endpoint, customConfig);

  expect(request.headers.get("Content-Type")).toBe(
    customConfig.headers["Content-Type"]
  );
});

test("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "test-endpoint";
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );
  const data = { a: "b" };
  const result = await client(endpoint, { data });

  expect(result).toEqual(data);
});

test("correctly rejects the promise if there is an error", async () => {
  const endpoint = "test-endpoint";
  const testError = { message: "Test error" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );
  await expect(client(endpoint)).rejects.toEqual(testError.message);
});
