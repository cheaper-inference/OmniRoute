import assert from "node:assert/strict";
import {
  chmodSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";
import { installZcodeNativeRuntime } from "../../scripts/ops/install-zcode-native-runtime.mjs";

const roots: string[] = [];

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "zcode-native-install-"));
  roots.push(root);
  const source = join(root, "installed-runtime");
  mkdirSync(source);
  writeFileSync(join(source, "node"), "fake-node", { mode: 0o755 });
  writeFileSync(join(source, "server-core.js"), "server-core");
  writeFileSync(join(source, "zcode.cjs"), "engine");
  mkdirSync(join(source, "node_modules", "runtime-dependency"), { recursive: true });
  writeFileSync(join(source, "node_modules", "runtime-dependency", "index.js"), "dependency");
  mkdirSync(join(source, "packages", "model"), { recursive: true });
  writeFileSync(join(source, "packages", "model", "package.json"), "{}\n");
  mkdirSync(join(source, "tools"));
  writeFileSync(join(source, "tools", "helper"), "tool");
  mkdirSync(join(source, "licenses"));
  writeFileSync(join(source, "licenses", "NOTICE"), "license");
  symlinkSync(join(source, "licenses", "NOTICE"), join(source, "notice-link"));
  return { root, source, dataDir: join(root, "data") };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

test("copies the complete runtime tree, including package dependencies, tools, and licenses", () => {
  const { source, dataDir } = fixture();
  const installed = installZcodeNativeRuntime({ source, dataDir });
  assert.equal(installed.runtime, realpathSync(installed.runtime));
  for (const relativePath of [
    "node",
    "server-core.js",
    "zcode.cjs",
    "node_modules/runtime-dependency/index.js",
    "packages/model/package.json",
    "tools/helper",
    "licenses/NOTICE",
  ]) {
    assert.equal(
      readFileSync(join(installed.runtime, relativePath), "utf8"),
      readFileSync(join(source, relativePath), "utf8"),
      `${relativePath} must be copied intact`
    );
  }
  assert.equal(
    realpathSync(join(installed.runtime, "notice-link")),
    join(installed.runtime, "licenses", "NOTICE")
  );
  assert.equal(installed.runtime.includes(`/releases/${installed.id}`), true);
});

test("identical re-install is idempotent and keeps the immutable release", () => {
  const { source, dataDir } = fixture();
  const first = installZcodeNativeRuntime({ source, dataDir });
  const second = installZcodeNativeRuntime({ source, dataDir });
  assert.deepEqual(second, first);
  assert.equal(
    readFileSync(join(first.runtime, "node_modules/runtime-dependency/index.js"), "utf8"),
    "dependency"
  );
});

test("preserves source modes when the installer process has a restrictive umask", () => {
  const { source, dataDir } = fixture();
  chmodSync(source, 0o755);
  chmodSync(join(source, "node_modules"), 0o755);
  chmodSync(join(source, "zcode.cjs"), 0o644);
  const previousUmask = process.umask(0o077);
  let installed;
  try {
    installed = installZcodeNativeRuntime({ source, dataDir });
  } finally {
    process.umask(previousUmask);
  }
  assert.equal(statSync(installed.runtime).mode & 0o777, statSync(source).mode & 0o777);
  assert.equal(
    statSync(join(installed.runtime, "node_modules")).mode & 0o777,
    statSync(join(source, "node_modules")).mode & 0o777
  );
  assert.equal(
    statSync(join(installed.runtime, "zcode.cjs")).mode & 0o777,
    statSync(join(source, "zcode.cjs")).mode & 0o777
  );
});

test("refuses to overwrite an existing content-addressed release with different bytes", () => {
  const { source, dataDir } = fixture();
  const installed = installZcodeNativeRuntime({ source, dataDir });
  const installedEngine = join(installed.runtime, "zcode.cjs");
  writeFileSync(installedEngine, "unexpected mutation");
  assert.throws(() => installZcodeNativeRuntime({ source, dataDir }), /differs|does not match/);
  assert.equal(readFileSync(installedEngine, "utf8"), "unexpected mutation");
});

test("activation atomically points at the new release and records the previous runtime", () => {
  const { root, source, dataDir } = fixture();
  const first = installZcodeNativeRuntime({ source, dataDir, activate: true });
  const currentPath = join(dataDir, "zcode-native-runtime", "current.json");
  assert.equal(statSync(join(dataDir, "zcode-native-runtime")).mode & 0o777, 0o700);
  assert.equal(statSync(join(dataDir, "zcode-native-runtime", "releases")).mode & 0o777, 0o700);
  assert.equal(statSync(currentPath).mode & 0o777, 0o600);
  assert.deepEqual(JSON.parse(readFileSync(currentPath, "utf8")), {
    runtime: first.runtime,
    id: first.id,
  });

  writeFileSync(join(source, "zcode.cjs"), "engine-v2");
  const staged = installZcodeNativeRuntime({ source, dataDir });
  assert.deepEqual(
    JSON.parse(readFileSync(currentPath, "utf8")),
    {
      runtime: first.runtime,
      id: first.id,
    },
    "stage-only installation must not switch the active pointer"
  );
  const second = installZcodeNativeRuntime({ source, dataDir, activate: true });
  assert.equal(second.id, staged.id);
  assert.deepEqual(JSON.parse(readFileSync(currentPath, "utf8")), {
    runtime: second.runtime,
    previousRuntime: first.runtime,
    id: second.id,
  });
  assert.equal(
    readFileSync(join(root, "data", "zcode-native-runtime", "current.json"), "utf8").endsWith("\n"),
    true
  );
});

test("incomplete runtime and escaping symlink fail without changing current.json", () => {
  const { root, source, dataDir } = fixture();
  const active = installZcodeNativeRuntime({ source, dataDir, activate: true });
  const currentPath = join(dataDir, "zcode-native-runtime", "current.json");
  const before = readFileSync(currentPath, "utf8");

  rmSync(join(source, "zcode.cjs"));
  assert.throws(() => installZcodeNativeRuntime({ source, dataDir, activate: true }), /incomplete/);
  assert.equal(readFileSync(currentPath, "utf8"), before);

  writeFileSync(join(root, "outside-secret"), "must not be followed");
  symlinkSync(join(root, "outside-secret"), join(source, "escaping-link"));
  assert.throws(
    () => installZcodeNativeRuntime({ source, dataDir, activate: true }),
    /escapes source/
  );
  assert.equal(readFileSync(currentPath, "utf8"), before);
  assert.equal(JSON.parse(before).runtime, active.runtime);
});
