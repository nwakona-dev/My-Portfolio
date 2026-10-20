
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

let csrfToken = null;
let csrfHeaderName = "X-XSRF-TOKEN";

async function fetchCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/csrf`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve the CSRF token.");
  }

  const data = await response.json();

  csrfToken = data.token;
  csrfHeaderName = data.headerName || "X-XSRF-TOKEN";

  return csrfToken;
}

async function ensureCsrfToken() {
  if (!csrfToken) {
    await fetchCsrfToken();
  }

  return csrfToken;
}

export async function apiRequest(
  endpoint,
  {
    method = "GET",
    headers = {},
    body,
    ...options
  } = {}
) {
  const upperMethod = method.toUpperCase();

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  const requestOptions = {
    ...options,
    method: upperMethod,
    credentials: "include",
    headers: requestHeaders,
  };

  
if (body !== undefined) {
    if (body instanceof FormData) {
        requestOptions.body = body;
    } else {
        requestHeaders["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
    }
}


  const requiresCsrf = !["GET", "HEAD", "OPTIONS"].includes(
    upperMethod
  );

  if (requiresCsrf) {
    const token = await ensureCsrfToken();
    requestHeaders[csrfHeaderName] = token;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    requestOptions
  );

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data =
    response.status === 204
      ? null
      : isJson
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}
