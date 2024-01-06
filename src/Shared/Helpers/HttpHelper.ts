export type HttpHelperType = {
  // eslint-disable-next-line no-unused-vars
  get(path: string, config?: RequestInit): Promise<unknown>;
  // eslint-disable-next-line no-unused-vars
  post(
    // eslint-disable-next-line no-unused-vars
    path: string,
    // eslint-disable-next-line no-unused-vars
    body: unknown,
    // eslint-disable-next-line no-unused-vars
    config?: RequestInit,
  ): Promise<SuccessResponse>;
};

type UnknownBody = {
  message?: string;
  [key: string]: unknown;
};

export type SuccessResponse = {
  body: UnknownBody;
  httpStatus: number;
};

async function http(
  path: string,
  config: RequestInit,
): Promise<SuccessResponse> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    const responseBody = (await response.json()) as UnknownBody;
    
    return {
      body: responseBody ?? {message:'An error ocurred trying to perform this action. Please try later.'},
      httpStatus: response.status ?? 400,
    };
  }

  const responseBody = (await response.json()) as UnknownBody;

  return {
    body: responseBody,
    httpStatus: response.status,
  };
}

export async function get(
  path: string,
  config?: RequestInit,
): Promise<SuccessResponse> {
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

export async function deleteHttpMethod<T>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<SuccessResponse> {
  const init = { method: "delete", body: JSON.stringify(body), ...config };
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
