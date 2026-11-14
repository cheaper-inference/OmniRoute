// `omnirouter launch <tool> --doctor`: checks for the gateway, catalog,
// view, binary, version, declared preflight and adapter.diagnose, printed as pass/warn/fail,
// exit 69 on any fail, never a gateway start, a session or a spawn.

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Command } from "commander";

import {
  createPlan,
  defineAdapter,
  findTokenSites,
  LaunchError,
} from "../../../../bin/cli/launch/contract.mjs";
import { registerLaunchCommand } from "../../../../bin/cli/launch/command.mjs";
import { launchRegistry } from "../../../../bin/cli/launch/registry.mjs";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";

const PARENT_KEY = "sk-doctor-parent-key-0000";
const roots: string[] = [];
test.after(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

function sink() {
  let text = "";
  return {
    write: (chunk: string) => ((text += String(chunk)), true),
    get text() {
      return text;
    },
  };
}

function doctorAdapter(diagnose?: () => object[]) {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "fake",
    displayName: "Fake",
    binaries: ["fake-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy: "inject", view: { name: "fake", filter: {}, order: "catalog" } },
      model: "optional",
      install: { commands: { any: ["npm i -g fake-tool"] } },
      supportsProfile: false,
      platforms: ["linux", "darwin", "win32"],
      tier: "core",
      versionGate: { args: ["--version"], pattern: "(\\d+\\.\\d+\\.\\d+)", min: "1.0.0" },
    },
    plan(ctx: { model?: { id: string }; view: { hash: string; rows: unknown[] } }) {
      const base = createPlan("fake", {
        argv: ["--model", ctx.model?.id ?? ""],
        env: { set: { FAKE_KEY: "${TOKEN}" }, unset: [] },
        modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: ctx.view.rows.length },
        preflight: [
          { kind: "env-absent", key: "FAKE_CONFLICT", why: "would override us", severity: "error" },
        ],
      });
      return { ...base, secretSites: findTokenSites(base) };
    },
    ...(diagnose ? { diagnose } : {}),
  });
}

async function doctor(
  argv: string[],
  options: { adapter?: object; registry?: object; env?: Record<string, string>; deps?: object }
) {
  const root = mkdtempSync(join(tmpdir(), "olx-doctor-"));
  roots.push(root);
  const stdout = sink();
  const stderr = sink();
  let code: number | undefined;
  const adapter = options.adapter as { id: string } | undefined;
  const registry = options.registry ?? {
    get: (id: string) => (adapter && id === adapter.id ? adapter : undefined),
    list: () => (adapter ? [adapter] : []),
    aliasesOf: () => [],
  };
  const spawned: unknown[] = [];
  const program = new Command().exitOverride();
  registerLaunchCommand(program, {
    deps: {
      registry,
      stdout,
      stderr,
      setExitCode: (c: number) => {
        code = c;
      },
      launchDeps: {
        env: { PATH: process.env.PATH ?? "", HOME: root, ...(options.env || {}) },
        homeDir: root,
        cwd: root,
        dataDir: join(root, "data"),
        isTTY: false,
        loadPreferences: () => ({ favorites: [], recent: [] }),
        readToolDefaults: () => null,
        readLastLaunch: () => null,
        acquireGateway: async () => assert.fail("--doctor must not acquire the gateway"),
        createSessionClient: () => assert.fail("--doctor must not mint a session"),
        execute: async () => (spawned.push(1), { exitCode: 0 }),
        resolveBinary: async () => ({ command: "/opt/bin/fake-tool", shell: false }),
        probeTool: async () => ({ version: "1.4.0", features: {}, warnings: [] }),
        ...(options.deps || {}),
      },
    },
  });
  await program.parseAsync(["launch", ...argv], { from: "user" });
  assert.equal(spawned.length, 0, "--doctor never spawns");
  return { code, stdout: stdout.text, stderr: stderr.text };
}

test("all green: pass lines for gateway, catalog, view, binary, version, plan; exit 0", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const res = await doctor(["fake", "--doctor", "--remote", stub.url, "--api-key", PARENT_KEY], {
      adapter: doctorAdapter(),
    });
    assert.equal(res.code, 0, res.stdout + res.stderr);
    for (const name of ["gateway", "catalog", "view", "binary", "version", "plan", "env-absent"]) {
      assert.match(res.stdout, new RegExp(`^pass ${name}: `, "m"), `${name} passes`);
    }
    assert.ok(!res.stdout.includes(PARENT_KEY) && !res.stderr.includes(PARENT_KEY));
  } finally {
    await stub.close();
  }
});

test("--json: {tool, checks[]} and a failing preflight gives exit 69", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const res = await doctor(
      // --inherit-env: the safe base env would drop FAKE_CONFLICT before the check sees it.
      [
        "fake",
        "--doctor",
        "--json",
        "--inherit-env",
        "--remote",
        stub.url,
        "--api-key",
        PARENT_KEY,
      ],
      { adapter: doctorAdapter(), env: { FAKE_CONFLICT: "1" } }
    );
    assert.equal(res.code, 69);
    const doc = JSON.parse(res.stdout);
    assert.equal(doc.tool, "fake");
    const failed = doc.checks.filter((c: { status: string }) => c.status === "fail");
    assert.deepEqual(
      failed.map((c: { name: string }) => c.name),
      ["env-absent"]
    );
    for (const c of doc.checks) {
      assert.ok(["pass", "warn", "fail"].includes(c.status));
      assert.equal(typeof c.message, "string");
    }
  } finally {
    await stub.close();
  }
});

test("missing binary is a fail check (exit 69), not a ToolNotFound abort", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const res = await doctor(
      ["fake", "--doctor", "--json", "--remote", stub.url, "--api-key", PARENT_KEY],
      {
        adapter: doctorAdapter(),
        deps: {
          resolveBinary: async () => {
            throw new LaunchError("ToolNotFound", "fake: binary not found (fake-tool)");
          },
        },
      }
    );
    assert.equal(res.code, 69);
    const binary = JSON.parse(res.stdout).checks.find((c: { name: string }) => c.name === "binary");
    assert.equal(binary.status, "fail");
    assert.match(binary.message, /binary not found/);
  } finally {
    await stub.close();
  }
});

test("unreachable remote gateway fails the gateway check", async () => {
  const stub = await startStubGateway();
  const url = stub.url;
  await stub.close();
  const res = await doctor(["fake", "--doctor", "--json", "--remote", url], {
    adapter: doctorAdapter(),
    deps: { probeHealth: async () => false },
  });
  assert.equal(res.code, 69);
  const gateway = JSON.parse(res.stdout).checks.find((c: { name: string }) => c.name === "gateway");
  assert.equal(gateway.status, "fail");
});

test("adapter.diagnose checks are evaluated with the rest", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const res = await doctor(
      ["fake", "--doctor", "--json", "--remote", stub.url, "--api-key", PARENT_KEY],
      {
        adapter: doctorAdapter(() => [
          { kind: "env-equals", key: "FAKE_MODE", value: "on", why: "needs mode on" },
        ]),
        env: { FAKE_MODE: "off" },
      }
    );
    const doc = JSON.parse(res.stdout);
    const check = doc.checks.find((c: { name: string }) => c.name === "env-equals");
    assert.ok(check, "diagnose check present");
    assert.notEqual(check.status, "pass");
  } finally {
    await stub.close();
  }
});

test("real claude adapter: --doctor against the stub gateway runs without spawning", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const res = await doctor(
      ["claude", "--doctor", "--json", "--remote", stub.url, "--api-key", PARENT_KEY],
      {
        registry: launchRegistry,
        deps: { probeTool: async () => ({ version: "2.1.300", features: {}, warnings: [] }) },
      }
    );
    const doc = JSON.parse(res.stdout);
    assert.equal(doc.tool, "claude");
    const byName = Object.fromEntries(
      doc.checks.map((c: { name: string; status: string }) => [c.name, c.status])
    );
    assert.equal(byName.gateway, "pass");
    assert.equal(byName.binary, "pass");
    assert.equal(byName.plan, "pass");
    assert.ok(!res.stdout.includes(PARENT_KEY));
  } finally {
    await stub.close();
  }
});
