import { z } from "zod";
import {
  MANAGED_CLI_STABLE_VERSION,
  type ManagedCliDefinition,
} from "@/shared/services/managedCliRuntime";
import type { SafeOutboundFetchOptions } from "@/shared/network/safeOutboundFetch";

export type ManagedCliRegistryFetch = (
  url: string,
  init: SafeOutboundFetchOptions
) => Promise<Response>;
const MAX_METADATA_BYTES = 128 * 1024;
export const MANAGED_CLI_REGISTRY_TIMEOUT_MS = 10_000;

async function readMetadata(response: Response, signal: AbortSignal): Promise<unknown> {
  if (!response.body) throw new Error("Missing registry metadata");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  signal.addEventListener("abort", cancel, { once: true });
  try {
    signal.throwIfAborted();
    while (true) {
      const result = await reader.read();
      signal.throwIfAborted();
      if (result.done) break;
      bytes += result.value.byteLength;
      if (bytes > MAX_METADATA_BYTES) throw new Error("Oversized registry metadata");
      text += decoder.decode(result.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    signal.removeEventListener("abort", cancel);
    cancel();
  }
}

export async function fetchManagedCliLatestVersion(
  definition: ManagedCliDefinition,
  fetchImpl?: ManagedCliRegistryFetch,
  timeoutMs = MANAGED_CLI_REGISTRY_TIMEOUT_MS
): Promise<string> {
  const fetcher =
    fetchImpl ?? (await import("@/shared/network/safeOutboundFetch")).safeOutboundFetch;
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error("Registry request timed out"));
    }, timeoutMs);
  });
  const lookup = async () => {
    const response = await fetcher(
      `https://registry.npmjs.org/${encodeURIComponent(definition.packageName)}/latest`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
        redirect: "error",
        allowRedirect: false,
        guard: "public-only",
        pinDns: true,
        retry: false,
        timeoutMs,
      }
    );
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error("Registry lookup failed");
    }
    const schema = z.object({
      name: z.literal(definition.packageName),
      version: z.string().regex(MANAGED_CLI_STABLE_VERSION),
    });
    return schema.parse(await readMetadata(response, controller.signal)).version;
  };
  try {
    return await Promise.race([lookup(), timeout]);
  } finally {
    clearTimeout(timer!);
  }
}
