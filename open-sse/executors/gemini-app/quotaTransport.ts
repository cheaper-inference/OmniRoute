/**
 * Read-only `GetUsageInfo` gRPC transport for the Gemini App (Robin) backend.
 * No generation, quota reset, retry, redirect or model switching.
 *
 * Derived from `ShawTim/gemini-app2api` — `src/gateway/quota-transport.mjs` (MIT).
 * See ./LICENSE for the upstream MIT notice.
 */

import http2 from "node:http2";
import { GrpcMessageReader, frameGrpcMessage } from "./robinWire.ts";

export const QUOTA_ORIGIN = "https://robinfrontend-pa.googleapis.com";
export const QUOTA_RPC = "/assistant.mobile.robin.RobinService/GetUsageInfo";

export interface QuotaTransportError extends Error {
  code: string;
  status: number;
  quotaEvidence?: { httpStatus: number | null; grpcStatus: number | null };
}

function quotaFail(code: string, status = 502): QuotaTransportError {
  return Object.assign(new Error(code), { code, status }) as QuotaTransportError;
}

export interface UsageInfoResult {
  payload: Buffer;
  observedAt: string;
  httpStatus: number;
  grpcStatus: number;
}

export interface QuotaTransportOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  connect?: (authority: string) => http2.ClientHttp2Session;
}

/** Fetch one official quota snapshot. The request body is an empty message. */
export function fetchGoogleUsageInfo(
  accessToken: string,
  { signal, timeoutMs = 10_000, connect = http2.connect }: QuotaTransportOptions = {}
): Promise<UsageInfoResult> {
  if (
    typeof accessToken !== "string" ||
    !accessToken ||
    accessToken.length > 65_536 ||
    /\s/.test(accessToken)
  ) {
    return Promise.reject(quotaFail("QUOTA_CREDENTIAL_REQUIRED", 401));
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 15_000) {
    return Promise.reject(quotaFail("INVALID_QUOTA_TIMEOUT", 400));
  }
  if (signal?.aborted) return Promise.reject(quotaFail("QUOTA_CANCELLED", 499));

  return new Promise((resolve, reject) => {
    let client: http2.ClientHttp2Session | undefined;
    let request: http2.ClientHttp2Stream | undefined;
    let timer: NodeJS.Timeout | undefined;
    let settled = false;
    let httpStatus: number | null = null;
    let grpcStatus: number | null = null;
    let received = 0;
    const payloads: Buffer[] = [];
    const reader = new GrpcMessageReader({ maxBytes: 512 * 1024 });

    const finish = (error: QuotaTransportError | null, result?: UsageInfoResult): void => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      try {
        request?.close();
      } catch {
        // Already closed.
      }
      try {
        client?.destroy();
      } catch {
        // Already destroyed.
      }
      if (error) {
        error.quotaEvidence = { httpStatus, grpcStatus };
        reject(error);
      } else if (result) {
        resolve(result);
      }
    };

    const abort = (): void => finish(quotaFail("QUOTA_CANCELLED", 499));

    const reset = (): boolean => {
      const code = (request as { rstCode?: number } | undefined)?.rstCode;
      if (Number.isInteger(code) && (code as number) > 0) {
        finish(quotaFail("QUOTA_STREAM_RESET"));
        return true;
      }
      return false;
    };

    const status = (headers: http2.IncomingHttpHeaders): void => {
      if (headers[":status"] !== undefined) {
        httpStatus = Number(headers[":status"]);
        if (httpStatus === 429) return finish(quotaFail("QUOTA_RATE_LIMITED", 429));
        if (httpStatus === 401 || httpStatus === 403) {
          return finish(quotaFail("QUOTA_AUTH_REJECTED", httpStatus));
        }
        if (httpStatus !== 200) return finish(quotaFail("QUOTA_HTTP_REJECTED"));
      }
      if (headers["grpc-status"] !== undefined) {
        const raw = String(headers["grpc-status"]);
        if (!/^\d{1,2}$/.test(raw) || Number(raw) > 16)
          return finish(quotaFail("QUOTA_INVALID_STATUS"));
        grpcStatus = Number(raw);
        if (grpcStatus === 8) return finish(quotaFail("QUOTA_RATE_LIMITED", 429));
        if ([7, 16].includes(grpcStatus)) return finish(quotaFail("QUOTA_AUTH_REJECTED", 403));
        if (grpcStatus !== 0) {
          return finish(
            quotaFail(grpcStatus === 9 ? "QUOTA_PRECONDITION_REQUIRED" : "QUOTA_UPSTREAM_REJECTED")
          );
        }
      }
    };

    signal?.addEventListener("abort", abort, { once: true });
    timer = setTimeout(() => finish(quotaFail("QUOTA_TIMEOUT", 504)), timeoutMs);
    timer.unref();

    try {
      client = connect(QUOTA_ORIGIN);
      client.on("error", () => finish(quotaFail("QUOTA_CONNECTION_FAILED")));
      request = client.request({
        ":method": "POST",
        ":path": QUOTA_RPC,
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/grpc",
        te: "trailers",
        "grpc-timeout": `${timeoutMs}m`,
        "user-agent": "omniroute-gemini-app/1.0",
      });
      request.on("response", status);
      request.on("trailers", status);
      request.on("data", (chunk: Buffer) => {
        if (settled) return;
        received += chunk.length;
        if (received > 1024 * 1024) return finish(quotaFail("QUOTA_RESPONSE_TOO_LARGE"));
        try {
          payloads.push(...reader.push(chunk));
          if (payloads.length > 1) finish(quotaFail("QUOTA_INVALID_RESPONSE"));
        } catch {
          finish(quotaFail("QUOTA_INVALID_RESPONSE"));
        }
      });
      request.on("error", () => {
        if (!settled && !reset()) finish(quotaFail("QUOTA_STREAM_FAILED"));
      });
      request.on("close", () => {
        if (!settled && !reset()) finish(quotaFail("QUOTA_STREAM_CLOSED_EARLY"));
      });
      request.on("end", () => {
        if (settled || reset()) return;
        try {
          reader.finish();
          if (httpStatus !== 200 || grpcStatus !== 0 || payloads.length !== 1) {
            return finish(quotaFail("QUOTA_INCOMPLETE_RESPONSE"));
          }
          finish(null, {
            payload: payloads[0],
            observedAt: new Date().toISOString(),
            httpStatus,
            grpcStatus,
          });
        } catch {
          finish(quotaFail("QUOTA_INVALID_RESPONSE"));
        }
      });
      request.end(frameGrpcMessage(Buffer.alloc(0)));
    } catch {
      finish(quotaFail("QUOTA_CONNECTION_FAILED"));
    }
  });
}
