import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const CODEX_PATH = new URL("../../open-sse/executors/codex.ts", import.meta.url);
const LOADER_PATH = new URL("../../open-sse/executors/codex/wreqLoader.ts", import.meta.url);

test("#19285: the Codex wreq-js loader uses a dynamic specifier and the process entrypoint", () => {
  const executor = readFileSync(CODEX_PATH, "utf8");
  const loader = readFileSync(LOADER_PATH, "utf8");
  const sourceAnchor = /createRequire\s*\(\s*import\.meta\.url\s*\)/;

  assert.ok(
    !sourceAnchor.test(executor),
    "codex.ts must not anchor createRequire to import.meta.url"
  );
  assert.ok(
    !sourceAnchor.test(loader),
    "wreqLoader.ts must not anchor createRequire to import.meta.url"
  );
  assert.match(loader, /nodeModule\.createRequire\(process\.argv\[1\] \|\| process\.cwd\(\)\)/);
  assert.match(loader, /Reflect\.apply\(\w+,\s*undefined,\s*\[moduleName\]\)/);
});

test("#19285: a detached Codex loader resolves wreq-js beside standalone server.js", (t) => {
  const root = mkdtempSync(join(tmpdir(), "codex-wreq-standalone-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const standaloneDir = join(root, "standalone");
  const packageDir = join(standaloneDir, "node_modules", "wreq-js");
  const loaderDir = join(root, "detached-loader");
  mkdirSync(packageDir, { recursive: true });
  mkdirSync(loaderDir);

  writeFileSync(join(packageDir, "package.json"), '{"name":"wreq-js","main":"index.js"}');
  writeFileSync(
    join(packageDir, "index.js"),
    "module.exports = { websocket: function standaloneWebSocket() {} };"
  );
  writeFileSync(join(standaloneDir, "package.json"), '{"type":"module"}');

  const loaderPath = join(loaderDir, "wreqLoader.mts");
  copyFileSync(fileURLToPath(LOADER_PATH), loaderPath);

  const entrypoint = join(standaloneDir, "server.js");
  writeFileSync(
    entrypoint,
    `import assert from "node:assert/strict";
import { loadCodexWreqModule } from ${JSON.stringify(pathToFileURL(loaderPath).href)};

const { websocket } = loadCodexWreqModule();
assert.equal(typeof websocket, "function");
assert.equal(websocket.name, "standaloneWebSocket");
`
  );

  const result = spawnSync(process.execPath, [entrypoint], {
    cwd: standaloneDir,
    env: { ...process.env, NODE_PATH: "" },
    encoding: "utf8",
    timeout: 10_000,
  });

  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});
