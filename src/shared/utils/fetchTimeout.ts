// The engine owns this transport utility; keep app imports and error identity compatible.
export {
  fetchWithTimeout,
  FetchTimeoutError,
  getConfiguredTimeout,
} from "../../../open-sse/utils/fetchTimeout.ts";
