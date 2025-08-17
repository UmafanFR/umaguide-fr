const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Get with timeout
 */
export async function getFrom<T = unknown>(
  apiBase: string,
  endpoint: string,
  timeoutMs = 5000
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const apiUrl = `${apiBase}/${endpoint}`;
    const apiRes = await fetch(apiUrl, { signal: controller.signal });
    if (!apiRes.ok) throw new Error(`HTTP ${apiRes.status} sur ${apiUrl}`);
    return (await apiRes.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Get with Retry (use get with timeout)
 */
export async function getFromWithRetry<T = unknown>(
  apiBase: string,
  endpoint: string,
  {
    timeoutMs = 5000,
    retries = 3,
    baseDelayMs = 400,
    maxDelayMs = 3000,
  }: {
    timeoutMs?: number;
    retries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
  } = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await getFrom<T>(apiBase, endpoint, timeoutMs);
    } catch (err) {
      lastError = err;
      console.warn(`⚠️ Tentative ${attempt}/${retries} échouée pour ${endpoint}:`, err);

      if (attempt < retries) {
        const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
        const jitter = Math.random() * 150;
        await sleep(delay + jitter);
      }
    }
  }

  throw lastError;
}

/**
 * POST with timeout
 */
export async function postTo<T = unknown>(
  apiBase: string,
  endpoint: string,
  data: Record<string, any> | string | URLSearchParams | FormData = {},
  {
    timeoutMs = 5000,
    headers = {},
    contentType = 'application/json',
  }: {
    timeoutMs?: number;
    headers?: Record<string, string>;
    contentType?: string | null;
  } = {}
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const apiUrl = `${apiBase}/${endpoint}`;

    let body: BodyInit;
    const finalHeaders: Record<string, string> = { ...headers };

    if (data instanceof FormData) {
      body = data;
    } else if (data instanceof URLSearchParams) {
      body = data.toString();
      if (contentType !== null)
        finalHeaders['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (typeof data === 'string') {
      body = data;
      if (contentType && !finalHeaders['content-type']) finalHeaders['content-type'] = contentType;
    } else {
      if (contentType?.startsWith('application/x-www-form-urlencoded')) {
        body = new URLSearchParams(data as Record<string, string>).toString();
        finalHeaders['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      } else {
        body = JSON.stringify(data ?? {});
        if (contentType !== null) finalHeaders['content-type'] = 'application/json';
      }
    }

    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: finalHeaders,
      body,
      signal: controller.signal,
    });

    if (!apiRes.ok) throw new Error(`HTTP ${apiRes.status} sur ${apiUrl}`);
    return (await apiRes.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * POST with retry
 */
export async function postToWithRetry<T = unknown>(
  apiBase: string,
  endpoint: string,
  data: Record<string, any> | string | URLSearchParams | FormData = {},
  {
    timeoutMs = 5000,
    retries = 3,
    baseDelayMs = 400,
    maxDelayMs = 3000,
    headers = {},
    contentType = 'application/json',
  }: {
    timeoutMs?: number;
    retries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    headers?: Record<string, string>;
    contentType?: string | null;
  } = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await postTo<T>(apiBase, endpoint, data, { timeoutMs, headers, contentType });
    } catch (err) {
      lastError = err;
      console.warn(`⚠️ Tentative ${attempt}/${retries} échouée pour ${endpoint}:`, err);

      if (attempt < retries) {
        const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
        const jitter = Math.random() * 150;
        await sleep(delay + jitter);
      }
    }
  }

  throw lastError;
}
