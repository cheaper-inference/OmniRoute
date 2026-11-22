import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createManagedCliRuntimeManager,
  ManagedCliRuntimeError,
  type ManagedCliRuntimeDependencies,
} from "../../src/lib/cliTools/managedCliRuntimes";
import {
  readManagedCliInstallation,
  type ManagedCliDefinition,
} from "../../src/shared/services/managedCliRuntime";

async function writeCandidate(definition: ManagedCliDefinition, version: string, prefix: string) {
  const packageDir = path.join(prefix, "node_modules", ...definition.packageName.split("/"));
  const binDir = path.join(prefix, "node_modules", ".bin");
  await fs.mkdir(packageDir, { recursive: true });
  await fs.mkdir(binDir, { recursive: true });
  await fs.writeFile(
    path.join(packageDir, "package.json"),
    JSON.stringify({
      name: definition.packageName,
      version,
      bin: { [definition.binary]: "cli.js" },
    })
  );
  const entry = path.join(packageDir, "cli.js");
  await fs.writeFile(entry, "#!/usr/bin/env node\n", { mode: 0o755 });
  await fs.symlink(entry, path.join(binDir, definition.binary));
}

async function fixture(
  t: { after: (fn: () => Promise<void>) => void },
  overrides: ManagedCliRuntimeDependencies = {}
) {
  const data = await fs.mkdtemp(path.join(os.tmpdir(), "managed-cli-manager-"));
  t.after(() => fs.rm(data, { recursive: true, force: true }));
  const root = path.join(data, "cli-runtimes");
  const installs: string[] = [];
  let latest = "1.1.0";
  let fetchCount = 0;
  const deps: ManagedCliRuntimeDependencies = {
    root: () => root,
    env: () => ({}),
    platform: () => "linux",
    detect: async (id) => {
      const managed = readManagedCliInstallation(id, root, "linux");
      return {
        installed: true,
        runnable: true,
        commandPath: managed?.command ?? `/external/${id}`,
        version: managed?.version ?? "1.0.0",
      };
    },
    fetch: async (url) => {
      fetchCount += 1;
      const packageName = decodeURIComponent(new URL(url).pathname.slice(1, -"/latest".length));
      return Response.json({ name: packageName, version: latest });
    },
    install: async (definition, version, prefix) => {
      installs.push(prefix);
      await writeCandidate(definition, version, prefix);
    },
    probe: async (candidate) => `cli ${candidate.version}`,
    ...overrides,
  };
  return {
    data,
    root,
    installs,
    deps,
    manager: createManagedCliRuntimeManager(deps),
    setLatest: (version: string) => {
      latest = version;
    },
    getFetchCount: () => fetchCount,
  };
}

test("inventory distinguishes external tools, unchecked versions and OpenClaw read-only status", async (t) => {
  const f = await fixture(t);
  const rows = await f.manager.listManagedCliRuntimes();
  assert.equal(f.getFetchCount(), 0);
  assert.equal(rows[0].source, "external");
  assert.equal(rows[0].installedVersion, "1.0.0");
  assert.equal(rows[0].latestVersion, null);
  assert.equal(rows[0].reason, "unchecked");
  assert.equal(rows[0].updateAvailable, false);
  assert.equal(rows.find((row) => row.id === "openclaw")?.canUpdate, false);
  assert.equal(rows.find((row) => row.id === "openclaw")?.reason, "update_unsupported");
});

test("successful update stages a versioned install, verifies it and switches a persistent pointer", async (t) => {
  const f = await fixture(t);
  const result = await f.manager.updateManagedCliRuntime("codex");
  assert.equal(result.source, "managed");
  assert.equal(result.installedVersion, "1.1.0");
  assert.equal(result.updateAvailable, false);
  assert.equal(result.error, null);
  assert.equal(f.installs.length, 1);
  assert.ok(f.installs[0].startsWith(path.join(f.root, "codex", "versions")));
  assert.equal(readManagedCliInstallation("codex", f.root, "linux")?.version, "1.1.0");
  const restarted = createManagedCliRuntimeManager(f.deps);
  assert.equal((await restarted.listManagedCliRuntimes())[0].source, "managed");
  assert.equal((await restarted.listManagedCliRuntimes())[0].installedVersion, "1.1.0");
});

test("inventory reports the external runtime actually selected after a managed candidate is skipped", async (t) => {
  const f = await fixture(t);
  await f.manager.updateManagedCliRuntime("codex");
  const manager = createManagedCliRuntimeManager({
    ...f.deps,
    detect: async (id) => ({
      installed: true,
      runnable: true,
      commandPath: `/external/${id}`,
      version: "1.0.0",
    }),
  });
  const [row] = await manager.listManagedCliRuntimes();
  assert.equal(row.source, "external");
  assert.equal(row.commandPath, "/external/codex");
  assert.equal(row.installedVersion, "1.0.0");
  assert.equal(readManagedCliInstallation("codex", f.root, "linux")?.version, "1.1.0");
});

test("inventory reports the selected managed runtime even if the pointer changed during detection", async (t) => {
  const f = await fixture(t, {
    detect: async () => ({
      installed: true,
      runnable: true,
      commandPath: "/newly-active/codex",
      version: "1.2.0",
      managed: true,
    }),
  });
  const [row] = await f.manager.listManagedCliRuntimes();
  assert.equal(row.source, "managed");
  assert.equal(row.commandPath, "/newly-active/codex");
});

test("an inspection error retains the known managed location without claiming it is runnable", async (t) => {
  const f = await fixture(t);
  await f.manager.updateManagedCliRuntime("codex");
  const manager = createManagedCliRuntimeManager({
    ...f.deps,
    detect: async () => {
      throw new Error("Probe unavailable");
    },
  });
  const [row] = await manager.listManagedCliRuntimes();
  assert.equal(row.source, "managed");
  assert.equal(row.commandPath, readManagedCliInstallation("codex", f.root, "linux")?.command);
  assert.equal(row.installed, true);
  assert.equal(row.runnable, false);
  assert.equal(row.installedVersion, null);
  assert.equal(row.canUpdate, false);
  assert.ok(row.error);
});

test("update resolves the latest version again after an earlier inventory check", async (t) => {
  const f = await fixture(t);
  assert.equal(
    (await f.manager.listManagedCliRuntimes({ checkUpdates: true }))[0].latestVersion,
    "1.1.0"
  );
  f.setLatest("1.2.0");
  const result = await f.manager.updateManagedCliRuntime("codex");
  assert.equal(result.installedVersion, "1.2.0");
  assert.equal(f.getFetchCount(), 6);
});

test("equal and older registry versions never downgrade or reinstall", async (t) => {
  const f = await fixture(t);
  for (const version of ["1.0.0", "0.9.9"]) {
    f.setLatest(version);
    const result = await f.manager.updateManagedCliRuntime("codex");
    assert.equal(result.activated, false);
    assert.equal(result.installedVersion, "1.0.0");
    assert.equal(result.source, "external");
    assert.equal(result.updateAvailable, false);
  }
  assert.equal(f.installs.length, 0);
});

test("an external upgrade during verification prevents a managed downgrade", async (t) => {
  let version = "1.0.0";
  const f = await fixture(t, {
    detect: async () => ({
      installed: true,
      runnable: true,
      commandPath: "/external/codex",
      version,
    }),
    probe: async (candidate) => {
      version = "1.2.0";
      return candidate.version;
    },
  });
  const result = await f.manager.updateManagedCliRuntime("codex");
  assert.equal(result.installedVersion, "1.2.0");
  assert.equal(result.source, "external");
  assert.equal(result.activated, false);
  assert.equal(readManagedCliInstallation("codex", f.root, "linux"), null);
  assert.deepEqual(await fs.readdir(path.join(f.root, "codex", "versions")), []);
});

for (const failure of ["install", "verification", "activation"] as const) {
  test(`${failure} failure leaves the previously active installation unchanged`, async (t) => {
    const f = await fixture(t);
    await f.manager.updateManagedCliRuntime("codex");
    const activePath = path.join(f.root, "codex", "active.json");
    const before = await fs.readFile(activePath, "utf8");
    f.setLatest("1.2.0");
    const failed = createManagedCliRuntimeManager({
      ...f.deps,
      ...(failure === "install"
        ? {
            install: async () => {
              throw new Error("secret-token: DO-NOT-RETURN");
            },
          }
        : {}),
      ...(failure === "verification" ? { probe: async () => "cli 9.9.9" } : {}),
      ...(failure === "activation"
        ? {
            activate: async () => {
              throw new Error("private path DO-NOT-RETURN");
            },
          }
        : {}),
    });
    await assert.rejects(failed.updateManagedCliRuntime("codex"), (error: unknown) => {
      assert.ok(error instanceof ManagedCliRuntimeError);
      assert.equal(
        error.code,
        `${failure === "install" ? "install" : failure === "verification" ? "verification" : "activation"}_failed`
      );
      assert.ok(!error.message.includes("DO-NOT-RETURN"));
      return true;
    });
    assert.equal(await fs.readFile(activePath, "utf8"), before);
    assert.equal(readManagedCliInstallation("codex", f.root, "linux")?.version, "1.1.0");
    assert.equal((await fs.readdir(path.join(f.root, "codex", "versions"))).length, 1);
  });
}

test("package metadata mismatch is rejected before probing and activation", async (t) => {
  let probed = false;
  const f = await fixture(t, {
    install: async (definition, version, prefix) =>
      writeCandidate({ ...definition, packageName: "other-package" }, version, prefix),
    probe: async () => {
      probed = true;
      return "cli 1.1.0";
    },
  });
  await assert.rejects(f.manager.updateManagedCliRuntime("codex"), { code: "verification_failed" });
  assert.equal(probed, false);
  assert.equal(readManagedCliInstallation("codex", f.root), null);
});

test("missing, overridden, non-runnable and unknown-version tools cannot be installed implicitly", async (t) => {
  const f = await fixture(t);
  const scenarios: Array<{ deps: ManagedCliRuntimeDependencies; code: string }> = [
    {
      deps: { detect: async () => ({ installed: false, runnable: false }) },
      code: "not_installed",
    },
    { deps: { env: () => ({ CLI_CODEX_BIN: "/custom/codex" }) }, code: "explicit_override" },
    {
      deps: { detect: async () => ({ installed: true, runnable: false, version: "1.0.0" }) },
      code: "not_runnable",
    },
    {
      deps: { detect: async () => ({ installed: true, runnable: true, version: "unknown" }) },
      code: "version_unknown",
    },
  ];
  for (const scenario of scenarios) {
    const manager = createManagedCliRuntimeManager({ ...f.deps, ...scenario.deps });
    await assert.rejects(manager.updateManagedCliRuntime("codex"), { code: scenario.code });
  }
  await assert.rejects(f.manager.updateManagedCliRuntime("openclaw"), {
    code: "update_unsupported",
  });
  await assert.rejects(f.manager.updateManagedCliRuntime("codex;evil"), {
    code: "unsupported_tool",
  });
  assert.equal(f.getFetchCount(), 0);
  assert.equal(f.installs.length, 0);
});

test("failed registry checks remain unknown instead of appearing up to date", async (t) => {
  const f = await fixture(t, {
    fetch: async (url) =>
      url.includes("openai")
        ? new Response("offline", { status: 503 })
        : Response.json({
            name: decodeURIComponent(new URL(url).pathname.slice(1, -"/latest".length)),
            version: "1.1.0",
          }),
  });
  const rows = await f.manager.listManagedCliRuntimes({ checkUpdates: true });
  const codex = rows.find((row) => row.id === "codex")!;
  assert.equal(codex.latestVersion, null);
  assert.equal(codex.updateAvailable, false);
  assert.equal(codex.reason, "check_failed");
  assert.ok(codex.error);
  assert.ok(codex.checkedAt);
  assert.equal(rows.find((row) => row.id === "claude")?.updateAvailable, true);
  await assert.rejects(f.manager.updateManagedCliRuntime("codex"), { code: "check_failed" });
  assert.equal(f.installs.length, 0);
});

test("concurrent update attempts across manager instances are rejected and locks release afterwards", async (t) => {
  let releaseInstall!: () => void;
  let started!: () => void;
  const installing = new Promise<void>((resolve) => {
    started = resolve;
  });
  const gate = new Promise<void>((resolve) => {
    releaseInstall = resolve;
  });
  const f = await fixture(t, {
    install: async (definition, version, prefix) => {
      started();
      await gate;
      await writeCandidate(definition, version, prefix);
    },
  });
  const first = f.manager.updateManagedCliRuntime("codex");
  await installing;
  const secondManager = createManagedCliRuntimeManager(f.deps);
  await assert.rejects(secondManager.updateManagedCliRuntime("codex"), {
    code: "update_in_progress",
  });
  releaseInstall();
  assert.equal((await first).installedVersion, "1.1.0");
  assert.equal((await secondManager.updateManagedCliRuntime("codex")).installedVersion, "1.1.0");
});

test("an explicit executable override added during installation prevents activation", async (t) => {
  const environment: NodeJS.ProcessEnv = {};
  const f = await fixture(t, {
    env: () => environment,
    install: async (definition, version, prefix) => {
      await writeCandidate(definition, version, prefix);
      environment.CLI_CODEX_BIN = "/custom/codex";
    },
  });
  await assert.rejects(f.manager.updateManagedCliRuntime("codex"), { code: "explicit_override" });
  assert.equal(readManagedCliInstallation("codex", f.root), null);
});

test("current version is re-read after acquiring the filesystem lock", async (t) => {
  let version = "1.0.0";
  const f = await fixture(t, {
    detect: async () => ({
      installed: true,
      runnable: true,
      version,
      commandPath: "/external/codex",
    }),
    acquireLock: async () => {
      version = "2.0.0";
      return async () => {};
    },
  });
  const result = await f.manager.updateManagedCliRuntime("codex");
  assert.equal(result.installedVersion, "2.0.0");
  assert.equal(result.updateAvailable, false);
  assert.equal(f.installs.length, 0);
});

test("actual executable version takes precedence over pointer metadata", async (t) => {
  const f = await fixture(t);
  await f.manager.updateManagedCliRuntime("codex");
  f.setLatest("1.2.0");
  const manager = createManagedCliRuntimeManager({
    ...f.deps,
    detect: async () => ({
      installed: true,
      runnable: true,
      version: "cli 1.9.0",
      commandPath: readManagedCliInstallation("codex", f.root)!.command,
    }),
  });
  const result = await manager.updateManagedCliRuntime("codex");
  assert.equal(result.installedVersion, "1.9.0");
  assert.equal(result.updateAvailable, false);
  assert.equal(f.installs.length, 1);
});

test("a lock-cleanup failure cannot mask activation or permanently hold the process lock", async (t) => {
  const f = await fixture(t, {
    acquireLock: async () => async () => {
      throw new Error("cleanup failed");
    },
  });
  assert.equal((await f.manager.updateManagedCliRuntime("codex")).installedVersion, "1.1.0");
  assert.equal((await f.manager.updateManagedCliRuntime("codex")).installedVersion, "1.1.0");
});

test("unsupported npm policy stays actionable and preserves the active runtime", async (t) => {
  const f = await fixture(t);
  await f.manager.updateManagedCliRuntime("codex");
  const activePath = path.join(f.root, "codex", "active.json");
  const before = await fs.readFile(activePath, "utf8");
  f.setLatest("1.2.0");
  const failed = createManagedCliRuntimeManager({
    ...f.deps,
    install: async () => {
      throw new ManagedCliRuntimeError("npm_policy_unsupported", "Update npm separately.", 409);
    },
  });
  await assert.rejects(failed.updateManagedCliRuntime("codex"), {
    code: "npm_policy_unsupported",
    httpStatus: 409,
  });
  assert.equal(await fs.readFile(activePath, "utf8"), before);
  assert.equal((await fs.readdir(path.join(f.root, "codex", "versions"))).length, 1);
});
