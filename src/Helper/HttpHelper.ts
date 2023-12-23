export type HttpHelperType = {
  // eslint-disable-next-line no-unused-vars
  get(path: string, config?: RequestInit): Promise<unknown>;
  // eslint-disable-next-line no-unused-vars
  post(path: string, body: unknown, config?: RequestInit): Promise<SuccessResponse>;
};

type UnknownBody = {
  message?: string,
  [key: string]: unknown
}

export type SuccessResponse = {
  body: UnknownBody,
  httpStatus: number
}

async function http(path: string, config: RequestInit): Promise<SuccessResponse> {
  const request = new Request(path, config);
  const response = await fetch(request);

  // TODO
  if (!response.ok) {
    // throw new Error({
    //   name: response.status.toString(),
    //   message: await response.text(),
    // });
  }

  const responseBody = await response.json() as UnknownBody;

  return {
    body: responseBody,
    httpStatus: response.status
  }
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
): Promise<SuccessResponse> {
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
