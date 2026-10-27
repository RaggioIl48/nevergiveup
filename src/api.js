export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(path, body) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method: body ? "POST" : "GET",
      headers: { "content-type": "application/json", "x-tz-offset": String(new Date().getTimezoneOffset()) },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
    });
  } catch {
    throw new ApiError("Can't reach the server", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && !["/me", "/login", "/register"].includes(path)) window.dispatchEvent(new Event("unauthorized"));
    throw new ApiError(data.error || "Unexpected error", res.status);
  }
  return data;
}
