/**
 * Service boundary for Z.ai web-cookie credential parsing.
 *
 * `extractZaiToken` is pure credential parsing, not request execution, but it lives in
 * `executors/zai-web/protocol.ts` alongside the transport it was written for. App routes
 * and `src/lib` consumers must not import from `open-sse/executors/**` (G14 import
 * boundary — see EXECUTOR_IMPORT_RESTRICTION in eslint.config.mjs), so they go through
 * this service instead of reaching into the executor tree.
 */
export { extractZaiToken } from "../executors/zai-web/protocol.ts";
