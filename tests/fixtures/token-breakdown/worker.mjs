import { TOKEN_CATEGORIES, OUTPUT_SOURCES } from "../../../bin/cli/runtime/tokenBreakdown.mjs";
import { parentPort } from "node:worker_threads";
parentPort.on("message", ({ body }) => {
  if (body === "timeout") return;
  parentPort.postMessage(
    body === "invalid"
      ? { unexpected: true }
      : {
          status: "ok",
          categories: Object.fromEntries(
            TOKEN_CATEGORIES.map((n) => [
              n,
              n === "other" ? { tokens: 1, bytes: 4, parts: 1 } : { tokens: 0, bytes: 0, parts: 0 },
            ])
          ),
          sources: Object.fromEntries(
            OUTPUT_SOURCES.map((n) => [n, { tokens: 0, bytes: 0, parts: 0 }])
          ),
          totals: { tokens: 1, bytes: 4, parts: 1 },
          exactChars: 4,
          heuristicChars: 0,
          omittedMedia: 0,
        }
  );
});
