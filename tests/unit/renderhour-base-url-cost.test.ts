import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { once } from "node:events";
import test from "node:test";

import { renderhourBaseUrl } from "../../open-sse/handlers/mediaGeneration/renderhour.ts";

test("base URL normalization preserves override and fallback semantics", () => {
  const fallback = "https://fallback.example/v1///";
  for (const [credentials, expected] of [
    [undefined, "https://fallback.example/v1"],
    [null, "https://fallback.example/v1"],
    [{}, "https://fallback.example/v1"],
    [{ providerSpecificData: null }, "https://fallback.example/v1"],
    [{ providerSpecificData: { baseUrl: 123 } }, "https://fallback.example/v1"],
    [{ providerSpecificData: { baseUrl: " \t " } }, "https://fallback.example/v1"],
    [
      { providerSpecificData: { baseUrl: "  https://override.example/a///  " } },
      "https://override.example/a",
    ],
    [
      { providerSpecificData: { baseUrl: "https://override.example/a//b" } },
      "https://override.example/a//b",
    ],
    [{ providerSpecificData: { baseUrl: "///" } }, ""],
  ] as const) {
    assert.equal(renderhourBaseUrl(credentials, fallback), expected);
  }
  assert.equal(renderhourBaseUrl({}, ""), "");
  assert.equal(renderhourBaseUrl({}, "https://fallback.example/ "), "https://fallback.example/ ");
});

test(
  "long slash runs finish within a bounded computation window",
  { timeout: 30_000 },
  async () => {
    const child = fork(new URL("../fixtures/renderhour-base-url-worker.mjs", import.meta.url), [], {
      execArgv: ["--import", "tsx/esm"],
      stdio: ["ignore", "ignore", "ignore", "ipc"],
      detached: false,
    });
    const exited = new Promise<void>((resolve) => child.once("exit", () => resolve()));
    try {
      const [ready] = await once(child, "message", { signal: AbortSignal.timeout(20_000) });
      assert.deepEqual(ready, { type: "ready" });
      const prefix = "https://renderhour.example/";
      const slashes = "/".repeat(1_000_000);
      const internalRun = `${prefix}${slashes}x`;
      // Start the computation deadline only after imports and worker startup complete.
      const reply = once(child, "message", { signal: AbortSignal.timeout(2_000) });
      child.send({ urls: [internalRun, `${prefix}${slashes}`] });
      const [result] = await reply;
      assert.deepEqual(result, {
        type: "result",
        values: [internalRun, "https://renderhour.example"],
      });
    } finally {
      if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
      await exited;
    }
  }
);
