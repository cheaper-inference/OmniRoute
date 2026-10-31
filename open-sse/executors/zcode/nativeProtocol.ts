import {
  createHash,
  createHmac,
  createDecipheriv,
  createPrivateKey,
  hkdfSync,
  randomBytes,
  sign,
  type KeyObject,
} from "node:crypto";
import { arch, release } from "node:os";
import { z } from "zod";

const CONFIG_URL = "https://zcode.z.ai/api/v1/agent/configs";
const SOURCE_URL = "https://api.z.ai/api/anthropic/v1/messages";
const HANDSHAKE_URL = "https://api.z.ai/api/paas/c1f3a7e2/v2/client";
// Wire version verified against the installed ZCode 0.16.9 agent.
const VERSION = "0.16.9";
const configSchema = z.object({
  code: z.literal(0),
  data: z
    .object({
      codingPlanSignature: z.object({ enable: z.boolean() }).optional(),
      proxyEndpoint: z
        .object({ mapping: z.array(z.object({ from: z.string(), to: z.string() })).max(256) })
        .optional(),
    })
    .passthrough(),
});
const handshakeSchema = z.object({
  code: z.literal(200),
  data: z.object({ privateCipher: z.string().min(24).max(8192) }),
});
type Config = { url: string; signed: boolean; expires: number };
type State = {
  config?: Config;
  configPromise?: Promise<Config>;
  key?: KeyObject;
  keyPromise?: Promise<KeyObject>;
};
const states = new Map<string, State>();

export function zcodeSourceHeaders(): Record<string, string> {
  return {
    "HTTP-Referer": "https://zcode.z.ai",
    "User-Agent": "ZCode/" + VERSION + " ai-sdk/provider-utils/4.0.27 runtime/node.js/22",
    "X-ZCode-App-Version": VERSION,
    "X-Title": "Z Code@electron",
    "X-Release-Channel": "production",
    "X-Client-Language": Intl.DateTimeFormat().resolvedOptions().locale,
    "X-Client-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "X-ZCode-Agent": "glm",
    "X-Platform": process.platform + "-" + arch(),
    "X-Os-Category":
      process.platform === "darwin" ? "macos" : process.platform === "win32" ? "windows" : "linux",
    "X-Os-Version": release(),
  };
}
function stateFor(apiKey: string): State {
  const id = createHash("sha256").update(apiKey).digest("hex");
  let state = states.get(id);
  if (!state) {
    if (states.size >= 32) states.delete(states.keys().next().value!);
    state = {};
    states.set(id, state);
  }
  return state;
}
async function waitFor<T>(promise: Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return promise;
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", abort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
  });
}
async function configuration(state: State, apiKey: string): Promise<Config> {
  if (state.config && state.config.expires > Date.now()) return state.config;
  if (!state.configPromise)
    state.configPromise = (async () => {
      const response = await fetch(CONFIG_URL, {
        headers: { ...zcodeSourceHeaders(), "x-api-key": apiKey },
        redirect: "manual",
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("ZCode native configuration unavailable");
      const value = configSchema.parse(await response.json());
      const mapping = value.data.proxyEndpoint?.mapping.find(
        (x) => x.from.replace(/\/$/, "") === SOURCE_URL
      );
      const url = new URL(mapping?.to || SOURCE_URL);
      // The native credential must never leave the two verified Z.AI origins.
      if (
        url.protocol !== "https:" ||
        !["api.z.ai", "zcode.z.ai"].includes(url.hostname) ||
        url.username ||
        url.password ||
        url.port ||
        url.search ||
        url.hash
      )
        throw new Error("Invalid native ZCode route");
      return (state.config = {
        url: url.href,
        signed: value.data.codingPlanSignature?.enable === true,
        expires: Date.now() + 300000,
      });
    })().finally(() => {
      state.configPromise = undefined;
    });
  return state.configPromise;
}
function credential(apiKey: string) {
  const pair = apiKey.split(".");
  if (pair.length !== 2 || !pair[0] || !pair[1]) throw new Error("Invalid native ZCode credential");
  return { id: pair[0], secret: pair[1] };
}
function derive(secret: string, info: string): Buffer {
  return Buffer.from(
    hkdfSync(
      "sha256",
      Buffer.from(secret),
      Buffer.from("WD_CLIENT_SIGN_KDF_SALT"),
      Buffer.from(info),
      32
    )
  );
}
async function signingKey(state: State, apiKey: string): Promise<KeyObject> {
  if (state.key) return state.key;
  if (!state.keyPromise)
    state.keyPromise = (async () => {
      const { id, secret } = credential(apiKey),
        ts = String(Date.now()),
        nonce = randomBytes(16).toString("hex");
      const derived = derive(secret, "getSignKey_hmac");
      const sig = createHmac("sha256", derived)
        .update(["get_sign_key", id, ts, nonce].join("\n"))
        .digest("base64");
      derived.fill(0);
      const response = await fetch(HANDSHAKE_URL, {
        method: "POST",
        headers: { Authorization: apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, nonce, sig, ts }),
        redirect: "manual",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("Native ZCode handshake refused");
      const value = handshakeSchema.parse(await response.json()),
        cipher = Buffer.from(value.data.privateCipher, "base64"),
        key = derive(secret, "ed25519_priv");
      let plain: Buffer | undefined;
      try {
        if (cipher.length <= 28) throw new Error("Invalid native signing response");
        const decipher = createDecipheriv("aes-256-gcm", key, cipher.subarray(0, 12));
        decipher.setAAD(Buffer.from(id));
        decipher.setAuthTag(cipher.subarray(-16));
        plain = Buffer.concat([decipher.update(cipher.subarray(12, -16)), decipher.final()]);
        const bytes = Buffer.from(plain.toString("utf8"), "base64");
        try {
          return (state.key = createPrivateKey({ key: bytes, format: "der", type: "pkcs8" }));
        } finally {
          bytes.fill(0);
        }
      } finally {
        key.fill(0);
        plain?.fill(0);
      }
    })().finally(() => {
      state.keyPromise = undefined;
    });
  return state.keyPromise;
}
export function nativeProof(
  id: string,
  session: string,
  ts: string,
  signal?: AbortSignal | null
): string {
  const seed = createHash("sha256")
    .update([id, "zcode", session, ts].join("\n"))
    .digest("hex")
    .slice(0, 32);
  const prefix = randomBytes(12).toString("hex");
  for (let counter = 0; counter <= 0xffffffff; counter++) {
    if ((counter & 255) === 0) signal?.throwIfAborted();
    const candidate = prefix + counter.toString(16).padStart(8, "0");
    if (
      createHash("sha256")
        .update(seed + "\n" + candidate)
        .digest()[0] === 0
    )
      return candidate;
  }
  throw new Error("Native request proof unavailable");
}
export async function fetchNativeZcode(
  apiKey: string,
  body: unknown,
  session: string,
  requestId: string,
  signal?: AbortSignal | null
) {
  const state = stateFor(apiKey),
    config = await waitFor(configuration(state, apiKey), signal);
  const headers: Record<string, string> = {
    ...zcodeSourceHeaders(),
    "Content-Type": "application/json",
    Accept:
      (body as { stream?: boolean }).stream === true ? "text/event-stream" : "application/json",
    "anthropic-version": "2023-06-01",
    Authorization: "Bearer " + apiKey,
    "x-api-key": apiKey,
    "X-Session-Id": session,
    "x-request-id": requestId,
    "x-zcode-trace-id": requestId,
    "x-query-id": requestId,
    "x-zcode-session-type": "other",
  };
  if (
    (body as { messages?: Array<{ role?: string }> }).messages?.some(
      (message) => message.role === "system"
    )
  )
    headers["anthropic-beta"] = "mid-conversation-system-2026-04-07";
  if (config.signed) {
    const key = await waitFor(signingKey(state, apiKey), signal),
      { id } = credential(apiKey),
      ts = String(Date.now()),
      nonce = randomBytes(16).toString("hex");
    Object.assign(headers, {
      "X-Client-Ts": ts,
      "X-Client-Version": VERSION,
      "X-Client-Sig": sign(
        null,
        Buffer.from([id, ts, VERSION, session, nonce].join("\n")),
        key
      ).toString("base64"),
      "X-Client-Nonce": nonce,
      "X-App-Id": "zcode",
      "X-Client-Pow": nativeProof(id, session, ts, signal),
    });
  }
  signal?.throwIfAborted();
  const response = await fetch(config.url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "manual",
    signal: signal || undefined,
  });
  // A failed handshake/signature is never bypassed with an unsigned retry.
  if (response.status === 401 || response.status === 403) state.key = undefined;
  return { response, url: config.url };
}
