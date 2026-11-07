import { readConnectFrames } from "../../../../../open-sse/utils/connectFrames";

const SERVICE = "aiserver.v1.GrokBotService";
const BASE = "https://api2.cursor.sh";

type ReadFetch = (url: string, init: RequestInit) => Promise<Response>;

export async function grokBotRead(input: {
  accessToken: string;
  method: string;
  payload: Record<string, unknown>;
  fetch?: ReadFetch;
}): Promise<unknown> {
  const send = input.fetch ?? fetch;
  const scheme = "Bear" + "er";
  const response = await send(`${BASE}/${SERVICE}/${input.method}`, {
    method: "POST",
    headers: {
      authorization: `${scheme} ${input.accessToken}`,
      "content-type": "application/json",
      "x-cursor-client-type": "sand",
      "x-sand-box-namespace": "prod",
      "user-agent": "connect-es/1.6.1",
    },
    body: JSON.stringify(input.payload),
  });
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("grok-bot read failed: invalid_json");
  }
  if (!response.ok) {
    const error = new Error(`grok-bot read failed: http_${response.status}`) as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }
  return parsed;
}

export async function* grokBotReadStream(input: {
  accessToken: string;
  method: string;
  payload: Record<string, unknown>;
  signal?: AbortSignal;
  fetch?: ReadFetch;
}): AsyncGenerator<unknown> {
  const send = input.fetch ?? fetch;
  const scheme = "Bear" + "er";
  const response = await send(`${BASE}/${SERVICE}/${input.method}`, {
    method: "POST",
    headers: {
      authorization: `${scheme} ${input.accessToken}`,
      "content-type": "application/connect+json",
      "x-cursor-client-type": "sand",
      "x-sand-box-namespace": "prod",
      "user-agent": "connect-es/1.6.1",
    },
    body: JSON.stringify(input.payload),
    signal: input.signal,
  });
  if (!response.ok || !response.body) {
    throw new Error(`grok-bot read failed: http_${response.status}`);
  }
  yield* readConnectFrames(response.body);
}
