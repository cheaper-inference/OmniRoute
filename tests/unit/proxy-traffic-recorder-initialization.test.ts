import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const trafficFile = path.join(root, "src/lib/db/proxyTraffic.ts");
const result = await build({
  stdin: {
    contents: `
      export * from "./src/lib/db/proxyTraffic.ts";
      export * from "./src/lib/db/singleton.ts";
      export { initializationCalls } from "./src/lib/db/core.ts";
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
  plugins: [
    {
      name: "reject-database-initialization",
      setup(builder) {
        builder.onResolve({ filter: /(?:^|\/)core(?:\.ts)?$/ }, (args) => {
          if (args.importer === trafficFile || args.path === "./src/lib/db/core.ts") {
            return { path: "database-core", namespace: "fixture" };
          }
          return undefined;
        });
        builder.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({
          contents: `
            export let initializationCalls = 0;
            export function getDbInstance() {
              initializationCalls++;
              throw new Error("Recorder must not initialize database storage");
            }
          `,
          loader: "ts",
        }));
      },
    },
  ],
});
const recorder = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
);

function databaseFixture() {
  const writes: unknown[][] = [];
  const db = {
    prepare: () => ({ run: (...values: unknown[]) => writes.push(values) }),
  } as unknown as SqliteAdapter;
  return { db, writes };
}

test("default recorder never initializes an absent database", (t) => {
  const original = recorder.getExistingDbInstance();
  const callsBefore = recorder.initializationCalls;
  const warning = t.mock.method(console, "warn", () => {});
  try {
    recorder.setDbInstance(null);
    const record = recorder.payloadTrafficRecorder(null);
    record({ attempts: 1, uploadBytes: 7, completedDownloads: 1 });
    recorder.flushPayloadTraffic();
    assert.equal(recorder.initializationCalls, callsBefore);
    assert.equal(recorder.getExistingDbInstance(), null);
    assert.equal(warning.mock.callCount(), 0);
  } finally {
    recorder.setDbInstance(original);
  }
});

test("default recorder snapshots an already-open database", () => {
  const original = recorder.getExistingDbInstance();
  const first = databaseFixture();
  const next = databaseFixture();
  const callsBefore = recorder.initializationCalls;
  try {
    recorder.setDbInstance(first.db);
    const record = recorder.payloadTrafficRecorder(null);
    recorder.setDbInstance(next.db);
    record({ attempts: 1, downloadBytes: 13, completedDownloads: 1 });
    assert.equal(first.writes.length, 1);
    assert.equal(first.writes[0][0], "direct");
    assert.equal(first.writes[0][4], 13);
    assert.equal(next.writes.length, 0);
    assert.equal(recorder.initializationCalls, callsBefore);
  } finally {
    recorder.flushPayloadTraffic();
    recorder.setDbInstance(original);
  }
});

test("explicit database override remains usable without global storage", () => {
  const original = recorder.getExistingDbInstance();
  const fixture = databaseFixture();
  const callsBefore = recorder.initializationCalls;
  try {
    recorder.setDbInstance(null);
    const record = recorder.payloadTrafficRecorder({ proxyId: "fixture-proxy" }, fixture.db);
    record({ attempts: 1, uploadBytes: 9, failedAttempts: 1 });
    assert.equal(fixture.writes.length, 1);
    assert.equal(fixture.writes[0][0], "registry:fixture-proxy");
    assert.equal(fixture.writes[0][3], 9);
    assert.equal(recorder.initializationCalls, callsBefore);
    assert.equal(recorder.getExistingDbInstance(), null);
  } finally {
    recorder.flushPayloadTraffic();
    recorder.setDbInstance(original);
  }
});
