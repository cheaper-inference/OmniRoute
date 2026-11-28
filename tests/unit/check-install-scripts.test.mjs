import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { checkLockfile, findInstallHooks } from "../../scripts/check/check-install-scripts.mjs";

const LOCKFILE = "package-lock.json";
const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const GATE = join(ROOT, "scripts/check/check-install-scripts.mjs");
const PATH = "node_modules/@example/native";
const dependency = {
  version: "1.0.0",
  resolved: "https://registry.npmjs.org/@example/native/-/native-1.0.0.tgz",
  integrity: "sha512-reviewed",
  hasInstallScript: true,
};

function lockWith(entries = {}) {
  return {
    name: "sample",
    version: "1.0.0",
    lockfileVersion: 3,
    packages: { "": { name: "sample", version: "1.0.0" }, ...entries },
  };
}

function decision(path = PATH, overrides = {}) {
  return {
    path,
    name: "@example/native",
    version: dependency.version,
    resolved: dependency.resolved,
    integrity: dependency.integrity,
    decision: "deny",
    profiles: ["all"],
    reason: "Use the published binary.",
    ...overrides,
  };
}

test("rejects a new transitive install script with its lockfile, path and version", () => {
  const path = "node_modules/parent/node_modules/@example/native";
  assert.deepEqual(checkLockfile(LOCKFILE, lockWith({ [path]: dependency }), []), [
    `${LOCKFILE} ${path}@1.0.0: install script has no policy decision`,
  ]);
});

test("requires separate decisions for nested copies of a scoped package", () => {
  const nested = `node_modules/parent/${PATH}`;
  const lock = lockWith({ [PATH]: dependency, [nested]: dependency });
  assert.match(checkLockfile(LOCKFILE, lock, [decision()]).join("\n"), /parent\/node_modules/);
  assert.deepEqual(checkLockfile(LOCKFILE, lock, [decision(), decision(nested)]), []);
});

test("matches an alias by its resolved name and source", () => {
  const alias = "node_modules/native-alias";
  const entry = { ...dependency, name: "@example/native" };
  const policy = decision(alias);
  assert.deepEqual(checkLockfile(LOCKFILE, lockWith({ [alias]: entry }), [policy]), []);
  for (const [field, value] of [
    ["name", "@other/native"],
    ["resolved", "https://registry.example.com/native-1.0.0.tgz"],
  ]) {
    const lock = lockWith({ [alias]: { ...entry, [field]: value } });
    const output = checkLockfile(LOCKFILE, lock, [policy]).join("\n");
    assert.ok(output.includes(`${field} changed`), output);
  }
});

test("reviews optional macOS entries even when they are absent from the installed tree", () => {
  const path = "node_modules/fsevents";
  const entry = { ...dependency, optional: true, os: ["darwin"] };
  const lock = lockWith({ [path]: entry });
  assert.match(checkLockfile(LOCKFILE, lock, []).join("\n"), /fsevents.*no policy decision/);
  assert.deepEqual(checkLockfile(LOCKFILE, lock, [decision(path, { name: "fsevents" })]), []);
});

test("rejects version and integrity drift for both denied and authorized hooks", () => {
  for (const policy of [
    decision(),
    decision(PATH, {
      decision: "allow",
      profiles: ["dev"],
      command: "npm rebuild @example/native@1.0.0",
    }),
  ]) {
    for (const [field, value] of [
      ["version", "2.0.0"],
      ["integrity", "sha512-replacement"],
    ]) {
      const modified = lockWith({ [PATH]: { ...dependency, [field]: value } });
      assert.match(
        checkLockfile(LOCKFILE, modified, [policy]).join("\n"),
        new RegExp(`${field} changed`)
      );
    }
  }
});

test("rejects orphaned and duplicate decisions and approvals without a lock marker", () => {
  assert.match(checkLockfile(LOCKFILE, lockWith(), [decision()]).join("\n"), /orphaned decision/);
  const policy = decision(PATH, {
    decision: "allow",
    profiles: ["dev"],
    command: "npm rebuild @example/native@1.0.0",
  });
  const unmarked = lockWith({ [PATH]: { ...dependency, hasInstallScript: false } });
  assert.match(checkLockfile(LOCKFILE, unmarked, [policy]).join("\n"), /orphaned decision/);
  const lock = lockWith({ [PATH]: dependency });
  assert.match(checkLockfile(LOCKFILE, lock, [decision(), decision()]).join("\n"), /duplicate/);
});

test("rejects malformed locks instead of treating them as empty", () => {
  for (const lock of [
    null,
    { lockfileVersion: 1, packages: {} },
    { ...lockWith(), packages: [] },
    { ...lockWith(), packages: {} },
    lockWith({ [PATH]: null }),
    lockWith({ [PATH]: { ...dependency, hasInstallScript: "true" } }),
  ]) {
    assert.match(checkLockfile(LOCKFILE, lock, []).join("\n"), /package-lock\.json.*invalid lock/);
  }
});

test("labels the project's own lifecycle separately from dependencies", () => {
  const lock = lockWith({ "": { name: "sample", version: "1.0.0", hasInstallScript: true } });
  assert.match(checkLockfile(LOCKFILE, lock, []).join("\n"), /<project>@1\.0\.0/);
  const project = decision("", { name: "sample", resolved: null, integrity: null });
  assert.deepEqual(checkLockfile(LOCKFILE, lock, [project]), []);
});

test("detects implicit node-gyp only when npm would supply a default install hook", () => {
  const options = { hasBindingGyp: true };
  assert.deepEqual(findInstallHooks({}, options), ["install (implicit node-gyp rebuild)"]);
  assert.deepEqual(findInstallHooks({ gypfile: false }, options), []);
  assert.deepEqual(findInstallHooks({ scripts: { preinstall: "node verify.js" } }, options), [
    "preinstall",
  ]);
  assert.deepEqual(findInstallHooks({ scripts: { postinstall: "node verify.js" } }, options), [
    "postinstall",
    "install (implicit node-gyp rebuild)",
  ]);
});

test("includes prepare for linked, Git and project manifests when requested", () => {
  const manifest = { scripts: { install: "node setup.js", prepare: "node build.js" } };
  assert.deepEqual(findInstallHooks(manifest), ["install"]);
  assert.deepEqual(findInstallHooks(manifest, { includePrepare: true }), ["install", "prepare"]);
});

test("requires a decision for an installed hook absent from the lock marker", () => {
  const entry = { ...dependency, hasInstallScript: false };
  const lock = lockWith({ [PATH]: entry });
  const observed = new Map([[PATH, ["postinstall"]]]);
  assert.match(
    checkLockfile(LOCKFILE, lock, [], observed).join("\n"),
    /native@1\.0\.0.*no policy decision.*postinstall/
  );
  assert.deepEqual(checkLockfile(LOCKFILE, lock, [decision()], observed), []);
  assert.deepEqual(checkLockfile(LOCKFILE, lock, [decision()]), []);
});

test("the Node CLI verifies the versioned npm lockfiles in the repository", () => {
  const output = execFileSync(process.execPath, [GATE], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.match(output, /OK.*\bnpm lockfiles\b/);
});

function cliFixture(t) {
  const cwd = mkdtempSync(join(dirname(fileURLToPath(import.meta.url)), ".install-scripts-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  execFileSync("git", ["init", "--quiet"], { cwd });
  const put = (file, data) => {
    const path = join(cwd, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(data));
  };
  put("config/quality/npm-install-scripts.json", { schemaVersion: 1, lockfiles: {} });
  const track = (...files) => execFileSync("git", ["add", "--", ...files], { cwd });
  const run = (...args) => {
    const result = spawnSync(process.execPath, [GATE, ...args], { cwd, encoding: "utf8" });
    assert.ifError(result.error);
    return result;
  };
  return { put, track, run };
}

test("the CLI discovers new versioned lockfiles at arbitrary depths", (t) => {
  const { put, track, run } = cliFixture(t);
  const extra = "packages/example/nested/project/package-lock.json";
  put(LOCKFILE, lockWith());
  put(extra, lockWith({ [PATH]: dependency }));
  track(LOCKFILE);
  assert.equal(run().status, 0);

  track(extra);
  const result = run();
  assert.equal(result.status, 1);
  assert.ok(
    result.stderr.includes(`${extra} ${PATH}@1.0.0: install script has no policy decision`)
  );
});

test("the installed audit checks Git and linked prepare hooks and respects gypfile false", (t) => {
  const { put, track, run } = cliFixture(t);
  const gitPath = "node_modules/git-package";
  const linkedPath = "packages/linked";
  const link = { link: true, resolved: linkedPath };
  const local = { name: "linked", version: "1.0.0" };
  const git = {
    version: "1.0.0",
    resolved: "git+https://example.com/git-package.git#943d4f50672008cfc0a616622d5f144cecc8a4b0",
  };
  const lock = lockWith({
    [PATH]: { ...dependency, hasInstallScript: false },
    [gitPath]: git,
    "node_modules/linked": link,
    [linkedPath]: local,
  });
  put(LOCKFILE, lock);
  track(LOCKFILE);
  put("package.json", lock.packages[""]);
  put(`${PATH}/package.json`, { name: "@example/native", version: "1.0.0", gypfile: false });
  put(`${PATH}/binding.gyp`, {});
  const scripts = { prepare: "node prepare.js" };
  put(`${gitPath}/package.json`, { name: "git-package", version: "1.0.0", scripts });
  put(`${linkedPath}/package.json`, { ...local, scripts });
  assert.equal(run().status, 0);

  const result = run("--installed", LOCKFILE);
  assert.equal(result.status, 1);
  assert.ok(
    result.stderr.includes(
      `${gitPath}@1.0.0: install script has no policy decision (observed prepare)`
    )
  );
  assert.ok(
    result.stderr.includes(
      `${linkedPath}@1.0.0: install script has no policy decision (observed prepare)`
    )
  );
  assert.ok(!result.stderr.includes(PATH));
});
