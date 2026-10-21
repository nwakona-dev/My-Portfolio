const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");

let csrfToken = null;
let csrfHeaderName = "X-XSRF-TOKEN";
let csrfPromise = null;

/**
 * Retrieve a fresh CSRF token from the backend.
 * The credentials option allows the browser to send and receive cookies.
 */
async function fetchCsrfToken(forceRefresh = false) {
  if (forceRefresh) {
    csrfToken = null;
  }

  // Avoid simultaneous duplicate CSRF requests.
  if (csrfPromise) {
    return csrfPromise;
  }

  csrfPromise = (async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/csrf`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Unable to retrieve the CSRF token. Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("The backend did not return a CSRF token.");
    }

    csrfToken = data.token;
    csrfHeaderName = data.headerName || "X-XSRF-TOKEN";

    return csrfToken;
  })();

  try {
    return await csrfPromise;
  } finally {
    csrfPromise = null;
  }
}

async function ensureCsrfToken() {
  if (!csrfToken) {
    await fetchCsrfToken();
  }

  return csrfToken;
}

/**
 * Send an API request.
 *
 * All requests include credentials so that the browser can use
 * session and CSRF cookies when the backend permits them.
 */
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
      // Do not set Content-Type manually for FormData.
      // The browser must add the multipart boundary.
      requestOptions.body = body;
    } else {
      requestHeaders["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
  }

  const requiresCsrf = !["GET", "HEAD", "OPTIONS"].includes(upperMethod);

  if (requiresCsrf) {
    const token = await ensureCsrfToken();
    requestHeaders[csrfHeaderName] = token;
  }

  const sendRequest = () =>
    fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

  let response = await sendRequest();

  /*
   * Retry once with a freshly fetched token.
   * This can help if a cached token has become stale.
   * It cannot fix cookies that the browser refuses to send.
   */
  if (response.status === 403 && requiresCsrf) {
    const refreshedToken = await fetchCsrfToken(true);
    requestHeaders[csrfHeaderName] = refreshedToken;

    response = await sendRequest();
  }

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
