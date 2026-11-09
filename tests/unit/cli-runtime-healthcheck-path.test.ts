// An npm-installed CLI is a `#!/usr/bin/env node` script, so its healthcheck needs the bin directory of
// the running Node on PATH. buildHealthcheckPath appends that directory unless it is already an exact
// entry, and an empty caller PATH yields just the directory. The tests build their paths with
// path.delimiter so they hold on Windows as well.
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { buildHealthcheckPath } from "../../src/shared/services/cliRuntimeHealthcheckPath.ts";

const d = path.delimiter;

test("the node bin directory is appended when it is missing", () => {
  assert.equal(
    buildHealthcheckPath(["/usr/bin", "/bin"].join(d), "/opt/node/bin"),
    ["/usr/bin", "/bin", "/opt/node/bin"].join(d)
  );
});

test("a path that already lists the directory is returned unchanged", () => {
  const callerPath = ["/usr/bin", "/opt/node/bin", "/bin"].join(d);
  assert.equal(buildHealthcheckPath(callerPath, "/opt/node/bin"), callerPath);
});

test("only an exact entry counts as already present", () => {
  const callerPath = ["/usr/bin", "/opt/node/bin/extra"].join(d);
  assert.equal(buildHealthcheckPath(callerPath, "/opt/node/bin"), `${callerPath}${d}/opt/node/bin`);
});

test("an empty caller path yields just the node bin directory", () => {
  assert.equal(buildHealthcheckPath("", "/opt/node/bin"), "/opt/node/bin");
});

test("existing entries keep their order and the directory goes last", () => {
  const callerPath = ["/b", "/a", "/c"].join(d);
  const built = buildHealthcheckPath(callerPath, "/opt/node/bin");
  assert.deepEqual(built.split(d), ["/b", "/a", "/c", "/opt/node/bin"]);
});

test("a single-entry path gets the directory after it", () => {
  assert.equal(buildHealthcheckPath("/usr/bin", "/opt/node/bin"), `/usr/bin${d}/opt/node/bin`);
});
