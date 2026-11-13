import test from "node:test";
import assert from "node:assert/strict";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import {
  listRunTargets,
  resolveRunTarget,
  runCliTarget,
} from "../../../../bin/cli/commands/run.mjs";
import { launchRegistry } from "../../../../bin/cli/launch/registry.mjs";

const originalPath = process.env.PATH;
const posixOnly = process.platform === "win32" ? "POSIX executable fixture" : false;

async function makeFakeCli(name: string, body: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "omniroute-legacy-run-"));
  const file = path.join(dir, name);
  await writeFile(file, `#!/usr/bin/env node\n${body}\n`, { mode: 0o755 });
  await chmod(file, 0o755);
  return { dir, file };
}

async function waitForFile(file: string, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (!existsSync(file) && Date.now() < deadline) await delay(10);
  assert.ok(existsSync(file), `timed out waiting for ${file}`);
}

async function startHealthStub() {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as import("node:net").AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

async function freePort() {
  const stub = await startHealthStub();
  const port = Number(new URL(stub.url).port);
  await stub.close();
  return port;
}

function restorePath() {
  if (originalPath === undefined) delete process.env.PATH;
  else process.env.PATH = originalPath;
}

test("run targets that have a launch adapter resolve to the same canonical id", () => {
  const shared = listRunTargets().filter((id: string) => launchRegistry.get(id));
  assert.ok(shared.length > 0, "expected at least one shared target");
  for (const id of shared) {
    assert.equal(resolveRunTarget(id), id);
    assert.equal(launchRegistry.get(id)?.id, id);
    const aliases: readonly string[] = launchRegistry.get(id)?.aliases ?? [];
    for (const alias of aliases) {
      const viaRun = resolveRunTarget(alias);
      // Only assert agreement where `run` also defines the alias.
      if (viaRun) assert.equal(viaRun, id, `alias ${alias} disagrees for ${id}`);
    }
  }
});

test(
  "run executes a generic target through the core executor and propagates the exit code",
  { skip: posixOnly },
  async () => {
    const capture = await mkdtemp(path.join(os.tmpdir(), "omniroute-legacy-run-cap-"));
    const capturePath = path.join(capture, "aider.json");
    const fake = await makeFakeCli(
      "aider",
      `require("node:fs").writeFileSync(${JSON.stringify(capturePath)}, JSON.stringify({
  argv: process.argv.slice(2),
  base: process.env.OPENAI_API_BASE,
  key: process.env.OPENAI_API_KEY,
}));
process.exit(5);`
    );
    const stub = await startHealthStub();
    process.env.PATH = `${fake.dir}${path.delimiter}${originalPath || ""}`;
    try {
      const code = await runCliTarget("aider", { remote: stub.url, apiKey: "sk_legacy" }, [
        "--x",
        "y",
      ]);
      assert.equal(code, 5);
      const result = JSON.parse(await readFile(capturePath, "utf8"));
      assert.deepEqual(result.argv, ["--x", "y"]);
      assert.equal(result.base, `${stub.url}/v1`);
      assert.equal(result.key, "sk_legacy");
    } finally {
      restorePath();
      await stub.close();
      await rm(fake.dir, { recursive: true, force: true });
      await rm(capture, { recursive: true, force: true });
    }
  }
);

test("run forwards SIGTERM to the child and returns 143", { skip: posixOnly }, async () => {
  const capture = await mkdtemp(path.join(os.tmpdir(), "omniroute-legacy-run-sig-"));
  const readyPath = path.join(capture, "ready");
  const fake = await makeFakeCli(
    "aider",
    `const fs = require("node:fs");
process.on("SIGTERM", () => process.exit(0));
fs.writeFileSync(${JSON.stringify(readyPath)}, "ready");
setInterval(() => {}, 1000);`
  );
  const stub = await startHealthStub();
  process.env.PATH = `${fake.dir}${path.delimiter}${originalPath || ""}`;
  try {
    const pending = runCliTarget("aider", { remote: stub.url, apiKey: "sk_legacy" }, []);
    await waitForFile(readyPath);
    process.emit("SIGTERM", "SIGTERM");
    assert.equal(await pending, 143);
  } finally {
    restorePath();
    await stub.close();
    await rm(fake.dir, { recursive: true, force: true });
    await rm(capture, { recursive: true, force: true });
  }
});

test("run returns 127 when the target binary is missing", { skip: posixOnly }, async () => {
  const emptyDir = await mkdtemp(path.join(os.tmpdir(), "omniroute-legacy-run-empty-"));
  const stub = await startHealthStub();
  process.env.PATH = emptyDir;
  try {
    const code = await runCliTarget("aider", { remote: stub.url, apiKey: "sk_legacy" }, []);
    assert.equal(code, 127);
  } finally {
    restorePath();
    await stub.close();
    await rm(emptyDir, { recursive: true, force: true });
  }
});

test(
  "run never auto-starts: no gateway means exit 1 and the tool is not spawned",
  { skip: posixOnly },
  async () => {
    const capture = await mkdtemp(path.join(os.tmpdir(), "omniroute-legacy-run-noauto-"));
    const markerPath = path.join(capture, "invoked");
    const fake = await makeFakeCli(
      "aider",
      `require("node:fs").writeFileSync(${JSON.stringify(markerPath)}, "x");`
    );
    const port = await freePort();
    process.env.PATH = `${fake.dir}${path.delimiter}${originalPath || ""}`;
    try {
      const code = await runCliTarget(
        "aider",
        { remote: `http://127.0.0.1:${port}`, apiKey: "sk_legacy" },
        []
      );
      assert.equal(code, 1);
      await delay(100);
      assert.equal(existsSync(markerPath), false);
    } finally {
      restorePath();
      await rm(fake.dir, { recursive: true, force: true });
      await rm(capture, { recursive: true, force: true });
    }
  }
);
