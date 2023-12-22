export type HttpHelperType = {
  // eslint-disable-next-line no-unused-vars
  get(path: string, config?: RequestInit): Promise<unknown>;
  // eslint-disable-next-line no-unused-vars
  post(path: string, body: T, config?: RequestInit): Promise<unknown>;
};

async function http(path: string, config: RequestInit): Promise<unknown> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    // throw new Error({
    //   name: response.status.toString(),
    //   message: await response.text(),
    // });
  }

  // may error if there is no body, return empty array
  return response.json() as unknown;
}

export async function get(
  path: string,
  config?: RequestInit,
): Promise<unknown> {
  const init = { method: "get", ...config };
  return await http(path, init);
}

export async function post<T>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<unknown> {
  const init = { method: "post", body: JSON.stringify(body), ...config };
  return await http(path, init);
}

export async function put<T>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<unknown> {
  const init = { method: "put", body: JSON.stringify(body), ...config };
  return await http(path, init);
}
