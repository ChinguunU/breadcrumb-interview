import { ApiError } from "./types";

const backendUrl = "http://localhost:5017/api";

export const fetchClient = async <Response>(
  path: string,
  options?: RequestInit,
): Promise<Response> => {
  const url = `${backendUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      body?.detail ?? body?.title,
      body?.errors,
    );
  }

  if (response.status === 204) {
    return null as unknown as Response;
  }

  return response.json();
};
