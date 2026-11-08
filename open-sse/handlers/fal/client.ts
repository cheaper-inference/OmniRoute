import { canonicalFalEndpoint } from "../../config/falEndpoint.ts";
import { falCapabilities, falRecord, type FalDefinition, type FalRecord } from "./schema.ts";
import { getConfiguredTimeout } from "../../utils/fetchTimeout.ts";

export class FalError extends Error {
  constructor(
    message: string,
    public status = 400,
    public retryAfter?: string
  ) {
    super(message);
  }
}

export type FalFetch = (url: string, init?: RequestInit) => Promise<Response>;
function validateFalTarget(value: string) {
  const target = new URL(value);
  if (
    !["https://api.fal.ai", "https://fal.run", "https://queue.fal.run"].includes(target.origin) ||
    target.username ||
    target.password
  )
    throw new FalError("Invalid fal request URL");
}

export function falTrackingUrl(value: unknown, requestId: string): string {
  if (typeof value !== "string") throw new FalError("Missing fal job tracking URL", 502);
  const url = new URL(value, "https://queue.fal.run");
  if (
    url.origin !== "https://queue.fal.run" ||
    url.username ||
    url.password ||
    url.hash ||
    !url.pathname
      .split("/")
      .some(
        (segment, i, segments) =>
          segment === "requests" && segments[i + 1] === encodeURIComponent(requestId)
      )
  ) {
    throw new FalError("Invalid fal job tracking URL", 502);
  }
  return url.toString();
}

async function retryFalRead(response: Response, signal?: AbortSignal | null) {
  const retry = response.headers.get("retry-after");
  const seconds =
    retry && /^\d+$/.test(retry)
      ? Number(retry)
      : retry && Number.isFinite(Date.parse(retry))
        ? Math.max(0, (Date.parse(retry) - Date.now()) / 1000)
        : 1;
  if (seconds > 5) {
    await response.body?.cancel();
    throw new FalError(
      `Fal upstream request failed (${response.status})`,
      response.status,
      retry ?? undefined
    );
  }
  await response.body?.cancel();
  await new Promise<void>((resolve, reject) => {
    const activeSignal = signal;
    const abort = () => {
      clearTimeout(timer);
      reject(activeSignal?.reason);
    };
    const timer = setTimeout(
      () => {
        activeSignal?.removeEventListener("abort", abort);
        resolve();
      },
      Math.min(5000, seconds * 1000)
    );
    if (activeSignal?.aborted) abort();
    else activeSignal?.addEventListener("abort", abort, { once: true });
  });
}

export class FalClient {
  constructor(
    private token: string,
    private fetcher: FalFetch = globalThis.fetch
  ) {
    if (!token) throw new FalError("Fal API key is required", 401);
  }

  /** POSTs are dispatched once. Only safe reads may retry, with bounded Retry-After. */
  async request(url: string, init: RequestInit = {}): Promise<Response> {
    validateFalTarget(url);
    const deadline = AbortSignal.timeout(getConfiguredTimeout());
    init = { ...init, signal: init.signal ? AbortSignal.any([init.signal, deadline]) : deadline };
    const isRead = !init.method || init.method === "GET";
    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.fetcher(url, {
          ...init,
          redirect: "error",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Key ${this.token}`,
            ...Object.fromEntries(new Headers(init.headers).entries()),
          },
        });
      } catch {
        if (init.signal?.aborted) throw init.signal.reason;
        throw new FalError("Fal upstream transport failed", 502);
      }
      if (isRead && attempt < 2 && [429, 503].includes(response.status)) {
        await retryFalRead(response, init.signal);
        continue;
      }
      if (!response.ok) {
        await response.body?.cancel();
        // Upstream errors can contain signed URLs, inputs, and credentials.
        throw new FalError(
          `Fal upstream request failed (${response.status})`,
          response.status,
          response.headers.get("retry-after") ?? undefined
        );
      }
      return response;
    }
  }

  async discover(query: URLSearchParams, signal?: AbortSignal): Promise<FalRecord> {
    const params = new URLSearchParams();
    for (const key of ["q", "category", "cursor", "limit", "endpoint_id", "expand", "status"]) {
      for (const value of query.getAll(key)) params.append(key, value);
    }
    const response = await this.request(`https://api.fal.ai/v1/models?${params}`, { signal });
    const payload = falRecord(await response.json());
    if (
      !Array.isArray(payload.models) ||
      typeof payload.has_more !== "boolean" ||
      (payload.has_more && typeof payload.next_cursor !== "string")
    ) {
      throw new FalError("Incomplete fal catalog response", 502);
    }
    return payload;
  }

  async definition(endpoint: string, signal?: AbortSignal): Promise<FalDefinition> {
    const id = canonicalFalEndpoint(endpoint);
    const page = await this.discover(
      new URLSearchParams({ endpoint_id: id, expand: "openapi-3.0" }),
      signal
    );
    const model = (page.models as FalRecord[]).find((item) => item.endpoint_id === id);
    if (!model)
      throw new FalError("Fal endpoint was not discovered; register a schema override", 404);
    const definition = { ...model, endpoint_id: id, openapi: falRecord(model.openapi) };
    falCapabilities(definition);
    return definition;
  }

  async execute(
    endpoint: string,
    input: FalRecord,
    transport: "direct" | "queue" | "stream",
    signal?: AbortSignal,
    streamUrl?: string
  ): Promise<Response> {
    const id = canonicalFalEndpoint(endpoint);
    const url =
      transport === "stream" && streamUrl
        ? new URL(streamUrl)
        : new URL(
            `https://${transport === "queue" ? "queue.fal.run" : "fal.run"}/${id}${transport === "stream" && !id.endsWith("/stream") ? "/stream" : ""}`
          );
    if (
      url.origin !== (transport === "queue" ? "https://queue.fal.run" : "https://fal.run") ||
      url.username ||
      url.password ||
      url.hash
    ) {
      throw new FalError("Invalid fal execution URL");
    }
    return this.request(url.toString(), {
      method: "POST",
      body: JSON.stringify(input),
      signal,
      headers: { "X-Fal-No-Retry": "1" },
    });
  }
}

export { normalizeFalOutput } from "./output.ts";
