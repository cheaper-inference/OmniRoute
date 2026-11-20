// Cookie confirmado em src/app/api/auth/login/route.ts (cookieStore.set("auth_token", ...))
// and in src/shared/utils/apiAuth.ts (isDashboardSessionAuthenticated reads "auth_token").
const TOKEN_COOKIE = "auth_token";

export function extractJwtCookie(setCookies) {
  for (const c of setCookies || []) {
    const m = c.match(new RegExp(`^(${TOKEN_COOKIE}=[^;]+)`));
    if (m) return m[1];
  }
  return null;
}

export function extractApiKey(body) {
  if (!body?.key || !body?.id) throw new Error("POST /api/keys sem key/id no corpo");
  return { key: body.key, id: body.id };
}

// fetch with 1 retry for socket errors (keep-alive recycled by the server
// between spaced requests drops the 1st write with EPIPE/other side closed).
async function fetchRetry(url, init, retries = 1) {
  try {
    return await fetch(url, init);
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1_000));
      return fetchRetry(url, init, retries - 1);
    }
    throw err;
  }
}

/** Login admin → creates ephemeral API key. Returns {key, id, cookie, revoke()}. */
export async function createEphemeralKey(baseUrl, password) {
  const login = await fetchRetry(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!login.ok) throw new Error(`login failed: HTTP ${login.status}`);
  const cookie = extractJwtCookie(login.headers.getSetCookie());
  if (!cookie) throw new Error("login without session cookie");

  // single suffix per run: two parallel runs (or one cleanup per name) never collide
  const name = `homolog-${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).slice(2, 8)}`;
  const create = await fetchRetry(`${baseUrl}/api/keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ name }),
  });
  if (!create.ok) throw new Error(`key creation failed: HTTP ${create.status}`);
  const { key, id } = extractApiKey(await create.json());

  return {
    key,
    id,
    cookie,
    async revoke() {
      const del = await fetchRetry(`${baseUrl}/api/keys/${id}`, {
        method: "DELETE",
        headers: { cookie },
      });
      if (!del.ok) throw new Error(`revocation of key ${id} failed: HTTP ${del.status}`);
    },
  };
}
