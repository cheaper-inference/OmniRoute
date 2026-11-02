import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Exercise the real collector, including its child process. An accidental
// application import fails on its first outbound call, before any I/O occurs.
test("code-derived documentation counts do not initialize network clients", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-offline-"));
  const guard = path.join(tmp, "offline.cjs");
  fs.writeFileSync(
    guard,
    `const stop = () => { process.stderr.write("DOC_COUNTS_OUTBOUND_ATTEMPT\\n"); process.exit(71); };
    globalThis.fetch = stop;
    for (const name of ["http", "https"]) {
      const module = require("node:" + name); module.request = stop; module.get = stop;
    }
    require("node:tls").connect = stop;
    const socketConnect = require("node:net").Socket.prototype.connect;
    require("node:net").Socket.prototype.connect = function (...args) {
      const first = args[0];
      const socket = typeof first === "string" ? first : Array.isArray(first) ? first[0]?.path : first?.path;
      if (typeof socket === "string" && socket.startsWith(require("node:os").tmpdir() + "/tsx-"))
        return socketConnect.apply(this, args);
      return stop();
    };
    require("node:module").syncBuiltinESMExports();`
  );
  try {
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `import assert from "node:assert/strict";
         import {buildChecks,__setSpawnSyncForTest} from "./scripts/check/check-docs-counts-sync.mjs";
         import {spawnSync} from "node:child_process";
         let measured = false; let failure;
         __setSpawnSyncForTest((...args) => {
           const result = spawnSync(...args);
           if (result.status !== 0) { failure = result.stderr || "collector did not exit successfully"; return result; }
           const line = result.stdout.split("\\n").find(line => line.startsWith("@@"));
           assert.ok(line, "collector must return measured facts");
           const facts = JSON.parse(line.slice(2));
           for (const name of ["cliTotal", "cliCode", "cliAgent", "mcpTools", "mcpScopes", "freeTierCount", "manifestFreeTier"])
             assert.ok(Number.isSafeInteger(facts[name]) && facts[name] > 0, name);
           measured = true;
           return result;
         });
         buildChecks();
         assert.equal(failure, undefined, failure);
         assert.ok(measured, "must execute the real fact collector");`,
      ],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        timeout: 45000,
        env: {
          PATH: process.env.PATH,
          APP_LOG_LEVEL: "silent",
          ...(process.env.ESBUILD_WORKER_THREADS !== undefined
            ? { ESBUILD_WORKER_THREADS: process.env.ESBUILD_WORKER_THREADS }
            : {}),
          ...(process.env.ESBUILD_BINARY_PATH !== undefined
            ? { ESBUILD_BINARY_PATH: process.env.ESBUILD_BINARY_PATH }
            : {}),
          DATA_DIR: path.join(tmp, "data"),
          TMPDIR: tmp,
          NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --require=${guard}`,
        },
      }
    );
    assert.equal(result.status, 0, result.stderr || String(result.error));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
