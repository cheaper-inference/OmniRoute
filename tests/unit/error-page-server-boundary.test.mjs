import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../", import.meta.url));
const probe = fileURLToPath(
  new URL("../_helpers/errorPageServerBoundaryProbe.mjs", import.meta.url)
);

test("error pages render their server component without invoking a client-only kit function", () => {
  // The fixture uses Next's real React Server Components client proxy. jsdom alone
  // imports client exports as ordinary functions and cannot detect this failure.
  const child = spawnSync(
    process.execPath,
    ["--conditions=react-server", "--import", "tsx/esm", probe],
    {
      cwd: root,
      env: { ...process.env, NODE_ENV: "test" },
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 64 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    }
  );
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  const result = JSON.parse(child.stdout);
  assert.equal(child.status, 0, result.failureEnum);
  assert.equal(result.status, "PASS_SERVER_COMPONENT_INVOCATION");
  assert.equal(result.clientBoundary, "REAL_REACT_SERVER_DOM_PROXY");
});
