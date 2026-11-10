import { parentPort } from "node:worker_threads";
import { countTokenBreakdown } from "./tokenBreakdownContent.mjs";
import { runtimeDiagnosticsLog } from "./runtimeDiagnosticsLog.mjs";
parentPort.once("message", async ({ body }) => {
  let parsed;
  try {
    parsed = JSON.parse(
      typeof body === "string" ? body : new TextDecoder("utf-8", { fatal: true }).decode(body)
    );
  } catch {
    parentPort.postMessage({ status: "invalid_json" });
    return;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    parentPort.postMessage({ status: "invalid_json" });
    return;
  }
  let encode = null;
  try {
    const { Tiktoken } = await import("js-tiktoken/lite");
    const { default: ranks } = await import("js-tiktoken/ranks/o200k_base");
    const tokenizer = new Tiktoken(ranks);
    encode = (text) => tokenizer.encode(text);
  } catch {
    runtimeDiagnosticsLog("WARNING", "Exact token estimator is unavailable");
  }
  parentPort.postMessage(countTokenBreakdown(parsed, encode));
});
