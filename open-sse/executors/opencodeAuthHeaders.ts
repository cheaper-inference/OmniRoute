/**
 * Which header carries the credential on each OpenCode lane, moved out of opencode.ts to keep
 * `buildHeaders` under its complexity ceiling.
 */
import { isGoGeminiWire, type OpencodeSurface } from "./opencodeFreeTierContract.ts";

export interface OpencodeAuthLane {
  requestFormat: string | null;
  surface: OpencodeSurface;
  /** The main Zen host's `/v1/responses` endpoint, which takes `x-api-key` (#12633). */
  zenResponses: boolean;
  /** The gated free-tier lane, whose `public` credential travels in `x-api-key` alone. */
  gatedScope: boolean;
}

export function setOpencodeAuthHeaders(
  headers: Record<string, string>,
  key: string,
  lane: OpencodeAuthLane
): void {
  if (lane.requestFormat === "claude") {
    headers["x-api-key"] = key;
  } else if (isGoGeminiWire(lane.requestFormat, lane.surface)) {
    headers["x-goog-api-key"] = key;
  } else {
    if (lane.zenResponses) headers["x-api-key"] = key;
    // A Console key on Zen `/v1/responses` needs Bearer too, or it answers 401 (#19315).
    if (!lane.zenResponses || !lane.gatedScope) headers["Authorization"] = `Bearer ${key}`;
  }
}
