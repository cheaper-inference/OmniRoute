/**
 * Regression test for #20250:
 * Auggie CLI 1.2+ removed --quiet, so passing --quiet causes CLI failure with
 * "Error: Unknown option: --quiet" and 502 Bad Gateway.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { writeNodeCliFixture } from "../helpers/nodeCliFixture.ts";

const { AuggieExecutor, buildAuggieArgs } = await import("@omniroute/open-sse/executors/auggie");

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auggie-quiet-20250-"));

function writeFakeBin(name: string, script: string): string {
  return writeNodeCliFixture(TMP_DIR, name, script);
}

test.after(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("buildAuggieArgs excludes --quiet and preserves --print and separator", () => {
  const args = buildAuggieArgs("sonnet4.6");
  assert.deepEqual(args, ["--print", "--model", "sonnet4.6", "--"]);
  assert.equal(
    args.includes("--quiet"),
    false,
    "Auggie CLI 1.2 removed --quiet; it must never be included in argv"
  );
});

test("execute() succeeds against Auggie CLI 1.2+ fixture that rejects --quiet", async () => {
  // Simulates Auggie CLI 1.2: if --quiet is passed, exits 1 with unknown option error.
  // Otherwise prints response on stdout.
  const bin = writeFakeBin(
    "fake-auggie-1-2",
    [
      `const args = process.argv.slice(2);`,
      `if (args.includes("--quiet")) {`,
      `  process.stderr.write("Error: Unknown option: --quiet\\n");`,
      `  process.exitCode = 1;`,
      `} else {`,
      `  process.stdout.write("response from auggie 1.2");`,
      `}`,
    ].join("\n")
  );

  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: {} as never,
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.choices[0].message.content, "response from auggie 1.2");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});
