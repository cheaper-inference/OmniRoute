import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import test from "node:test";
import {
  compareManagedCliVersions,
  parseManagedCliVersion,
  getManagedCliDefinition,
  getManagedCliCommand,
  listManagedCliDefinitions,
  readManagedCliInstallation,
  type ManagedCliPointer,
} from "../../src/shared/services/managedCliRuntime";
import { fetchManagedCliLatestVersion } from "../../src/lib/cliTools/managedCliRegistry";
import {
  buildManagedCliInstallArgs,
  buildManagedCliInstallEnvironment,
  probeManagedCliCandidate,
} from "../../src/lib/cliTools/managedCliInstall";
import {
  acquireManagedCliFileLock,
  activateManagedCliPointer,
  ensureManagedCliDirectories,
} from "../../src/lib/cliTools/managedCliStorage";

const codex = getManagedCliDefinition("codex")!;

async function fixture(t: { after: (fn: () => Promise<void>) => void }) {
  const data = await fs.mkdtemp(path.join(os.tmpdir(), "managed-cli-core-"));
  t.after(() => fs.rm(data, { recursive: true, force: true }));
  const root = path.join(data, "cli-runtimes");
  const toolDir = await ensureManagedCliDirectories(root, "codex");
  const pointer: ManagedCliPointer = {
    version: "1.2.3",
    installationId: `1.2.3-${randomUUID()}`,
    updatedAt: "2026-11-19T10:00:00.000Z",
  };
  const prefix = path.join(toolDir, "versions", pointer.installationId);
  const packageDir = path.join(prefix, "node_modules", "@openai", "codex");
  const binDir = path.join(prefix, "node_modules", ".bin");
  await fs.mkdir(packageDir, { recursive: true });
  await fs.mkdir(binDir, { recursive: true });
  const entry = path.join(packageDir, "cli.js");
  await fs.writeFile(entry, '#!/usr/bin/env node\nconsole.log("codex-cli 1.2.3");\n', {
    mode: 0o755,
  });
  const packagePath = path.join(packageDir, "package.json");
  await fs.writeFile(
    packagePath,
    JSON.stringify({ name: "@openai/codex", version: "1.2.3", bin: { codex: "cli.js" } })
  );
  const shim = path.join(binDir, "codex");
  await fs.symlink(entry, shim);
  await fs.writeFile(path.join(binDir, "codex.cmd"), "@echo off\r\n", { mode: 0o755 });
  await activateManagedCliPointer(root, codex, pointer);
  return { data, root, toolDir, pointer, prefix, entry, packagePath, shim };
}

test("catalog contains only approved bundled packages and OpenClaw cannot be updated generically", () => {
  assert.deepEqual(
    listManagedCliDefinitions().map((row) => row.id),
    ["codex", "claude", "droid", "openclaw", "qoder"]
  );
  assert.equal(getManagedCliDefinition("openclaw")!.updateSupported, false);
  assert.equal(getManagedCliDefinition("../../codex"), undefined);
  assert.ok(Object.isFrozen(listManagedCliDefinitions()));
  assert.ok(Object.isFrozen(codex));
});

test("version comparisons use numeric components and stable releases outrank their prereleases", () => {
  assert.ok(compareManagedCliVersions("0.10.0", "0.9.0") > 0);
  assert.ok(compareManagedCliVersions("2.0.0", "10.0.0") < 0);
  assert.equal(compareManagedCliVersions("1.2.3+build.1", "1.2.3"), 0);
  assert.ok(compareManagedCliVersions("1.2.3", "1.2.3-beta.4") > 0);
  assert.ok(compareManagedCliVersions("1.2.3", "1.3.0-beta.1") < 0);
  assert.equal(parseManagedCliVersion("codex-cli 0.165.0\n"), "0.165.0");
  assert.equal(parseManagedCliVersion("2.1.260 (Claude Code)"), "2.1.260");
  assert.equal(parseManagedCliVersion("unknown"), null);
  assert.equal(parseManagedCliVersion("1.2.3".repeat(1000)), null);
  assert.throws(() => compareManagedCliVersions("latest", "1.2.3"));
});

test("validated pointers resolve both platform shims and the package executable entry", async (t) => {
  const f = await fixture(t);
  assert.equal(readManagedCliInstallation("codex", f.root, "linux")?.command, f.shim);
  assert.equal(readManagedCliInstallation("codex", f.root, "win32")?.command, `${f.shim}.cmd`);
  assert.equal(readManagedCliInstallation("codex", f.root)?.executableEntryPath, f.entry);
  assert.equal(readManagedCliInstallation("unsupported", f.root), null);
  const install = readManagedCliInstallation("codex", f.root)!;
  assert.equal((await probeManagedCliCandidate(install, codex)).trim(), "codex-cli 1.2.3");
});

test("explicit executable overrides keep managed binaries inactive", async (t) => {
  const f = await fixture(t);
  const previous = { data: process.env.DATA_DIR, override: process.env.CLI_CODEX_BIN };
  t.after(async () => {
    if (previous.data === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous.data;
    if (previous.override === undefined) delete process.env.CLI_CODEX_BIN;
    else process.env.CLI_CODEX_BIN = previous.override;
  });
  process.env.DATA_DIR = f.data;
  delete process.env.CLI_CODEX_BIN;
  assert.equal(
    getManagedCliCommand("codex"),
    process.platform === "win32" ? `${f.shim}.cmd` : f.shim
  );
  process.env.CLI_CODEX_BIN = "/operator/codex";
  assert.equal(getManagedCliCommand("codex"), null);
});

test("native optional-package entry symlinks are allowed only inside the candidate prefix", async (t) => {
  const f = await fixture(t);
  const sibling = path.join(f.prefix, "node_modules", "@openai", "codex-linux-x64");
  await fs.mkdir(sibling, { recursive: true });
  const native = path.join(sibling, "codex");
  await fs.writeFile(native, "#!/usr/bin/env node\n", { mode: 0o755 });
  await fs.unlink(f.entry);
  await fs.symlink(native, f.entry);
  assert.equal(readManagedCliInstallation("codex", f.root)?.executableEntryPath, f.entry);
  await fs.unlink(f.entry);
  await fs.symlink(process.execPath, f.entry);
  assert.equal(readManagedCliInstallation("codex", f.root), null);
});

for (const patch of [
  { installationId: "../../outside" },
  { version: "9.9.9" },
  { command: "/tmp/untrusted" },
  { updatedAt: "not-a-date" },
]) {
  test(`invalid pointer is ignored: ${JSON.stringify(patch)}`, async (t) => {
    const f = await fixture(t);
    await fs.writeFile(
      path.join(f.toolDir, "active.json"),
      JSON.stringify({ ...f.pointer, ...patch })
    );
    assert.equal(readManagedCliInstallation("codex", f.root), null);
  });
}

test("a package identity mismatch cannot select another executable", async (t) => {
  const f = await fixture(t);
  await fs.writeFile(
    f.packagePath,
    JSON.stringify({ name: "untrusted-package", version: "1.2.3", bin: "cli.js" })
  );
  assert.equal(readManagedCliInstallation("codex", f.root), null);
});

test("pointer and executable symlinks cannot escape the managed prefix", async (t) => {
  const f = await fixture(t);
  await fs.unlink(f.shim);
  await fs.symlink(process.execPath, f.shim);
  assert.equal(readManagedCliInstallation("codex", f.root), null);
  const externalPointer = path.join(f.data, "outside.json");
  await fs.writeFile(externalPointer, JSON.stringify(f.pointer));
  await fs.unlink(path.join(f.toolDir, "active.json"));
  await fs.symlink(externalPointer, path.join(f.toolDir, "active.json"));
  assert.equal(readManagedCliInstallation("codex", f.root), null);
});

test("a package bin traversal or directory is rejected", async (t) => {
  const f = await fixture(t);
  for (const bin of ["../outside.js", "..\\outside.js", "/outside.js", "."]) {
    await fs.writeFile(
      f.packagePath,
      JSON.stringify({ name: codex.packageName, version: "1.2.3", bin })
    );
    assert.equal(readManagedCliInstallation("codex", f.root), null);
  }
});

test("a symlinked managed root is never trusted", async (t) => {
  const f = await fixture(t);
  const link = path.join(f.data, "linked-root");
  await fs.symlink(f.root, link, "dir");
  assert.equal(readManagedCliInstallation("codex", link), null);
});

test("registry checks pin the official URL and require matching stable package metadata", async () => {
  const version = await fetchManagedCliLatestVersion(codex, async (url, options) => {
    assert.equal(url, "https://registry.npmjs.org/%40openai%2Fcodex/latest");
    assert.equal(options.guard, "public-only");
    assert.equal(options.redirect, "error");
    assert.equal(options.pinDns, true);
    return Response.json({ name: "@openai/codex", version: "0.167.1" });
  });
  assert.equal(version, "0.167.1");
  for (const payload of [
    { name: "other", version: "0.167.1" },
    { name: "@openai/codex", version: "0.167.1-beta.1" },
    { name: "@openai/codex", version: "0.167.1;echo" },
    { name: "@openai/codex", version: "00.167.1" },
  ]) {
    await assert.rejects(fetchManagedCliLatestVersion(codex, async () => Response.json(payload)));
  }
});

test("registry responses have bounded bodies and a timeout covering stalled bodies", async () => {
  await assert.rejects(
    fetchManagedCliLatestVersion(codex, async () => new Response("x".repeat(128 * 1024 + 1)))
  );
  await assert.rejects(fetchManagedCliLatestVersion(codex, async () => new Response("bad JSON")));
  await assert.rejects(
    fetchManagedCliLatestVersion(codex, async () => new Response("unavailable", { status: 503 }))
  );
  await assert.rejects(
    fetchManagedCliLatestVersion(
      codex,
      async () => new Response(new ReadableStream({ start() {} })),
      10
    )
  );
  await assert.rejects(
    fetchManagedCliLatestVersion(codex, () => new Promise<Response>(() => {}), 10)
  );
});

test("npm arguments remain fixed and paths/credentials are kept out of the argument vector", () => {
  const prefix = "G:\\Program Files\\Portable\\Scripts\\runtime";
  const args = buildManagedCliInstallArgs(getManagedCliDefinition("claude")!, "2.1.260");
  assert.ok(args.includes("--strict-allow-scripts"));
  assert.ok(!args.some((arg) => arg.startsWith("--allow-scripts=")));
  assert.ok(args.includes("--include=optional"));
  assert.ok(args.includes("--engine-strict"));
  assert.ok(!args.some((arg) => arg.includes(prefix)));
  assert.throws(() => buildManagedCliInstallArgs(codex, "1.2.3 && evil"));
  assert.throws(() => buildManagedCliInstallArgs({ ...codex, packageName: "untrusted" }, "1.2.3"));
  assert.ok(
    !buildManagedCliInstallArgs({ ...codex, lifecyclePackages: ["evil && command"] }, "1.2.3").some(
      (arg) => arg.includes("evil")
    )
  );
  const env = buildManagedCliInstallEnvironment(prefix, {
    PATH: "/usr/bin",
    CODEX_TOKEN: "secret",
    OPENAI_API_KEY: "secret",
    NPM_TOKEN: "secret",
    NODE_ENV: "development",
    NODE_OPTIONS: "--require malicious.js",
    npm_config_registry: "https://untrusted.invalid/",
    HTTPS_PROXY: "https://proxy.invalid",
    NODE_EXTRA_CA_CERTS: "/safe/ca.pem",
  });
  assert.equal(env.npm_config_prefix, prefix);
  assert.equal(env.npm_config_registry, "https://registry.npmjs.org/");
  assert.equal(env.NODE_ENV, "production");
  assert.equal(env.HTTPS_PROXY, "https://proxy.invalid");
  assert.equal(env.NODE_EXTRA_CA_CERTS, "/safe/ca.pem");
  for (const key of ["CODEX_TOKEN", "OPENAI_API_KEY", "NPM_TOKEN", "NODE_OPTIONS"])
    assert.equal(env[key], undefined);
});

test("packaged Codex and Qoder entries skip lifecycle scripts that can alter global state", () => {
  for (const toolId of ["codex", "qoder"]) {
    const args = buildManagedCliInstallArgs(getManagedCliDefinition(toolId)!, "1.2.3");
    assert.ok(args.includes("--ignore-scripts"));
    assert.ok(args.includes("--include=optional"));
    assert.ok(!args.some((argument) => argument.startsWith("--allow-scripts=")));
  }
});

test("Claude and Droid retain only the required approved installation scripts", () => {
  for (const toolId of ["claude", "droid"]) {
    const args = buildManagedCliInstallArgs(getManagedCliDefinition(toolId)!, "1.2.3");
    assert.ok(args.includes("--strict-allow-scripts"));
    assert.ok(!args.some((arg) => arg.startsWith("--allow-scripts=")));
    assert.ok(!args.includes("--ignore-scripts"));
  }
});

test("filesystem locks reject a second worker and release only their own lock", async (t) => {
  const f = await fixture(t);
  const release = await acquireManagedCliFileLock(f.toolDir);
  await assert.rejects(acquireManagedCliFileLock(f.toolDir), { code: "update_in_progress" });
  await release();
  const second = await acquireManagedCliFileLock(f.toolDir);
  await second();
  await assert.rejects(fs.stat(path.join(f.toolDir, "update.lock")), { code: "ENOENT" });
});
