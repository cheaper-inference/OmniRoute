import test, { afterEach, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import childProcess, { type ChildProcess } from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { randomUUID } from "node:crypto";
import { resolveCodexSpawn } from "../../bin/cli/commands/launch-codex.mjs";
import { resolveClaudeSpawn } from "../../bin/cli/commands/launch.mjs";
import { resolveManagedCliSpawn } from "../../bin/cli/utils/managedCliSpawn.mjs";
import { buildRunPlan } from "../../bin/cli/commands/run.mjs";
import { AcpManager } from "../../src/lib/acp/manager.ts";
import { detectInstalledAgents, setCustomAgents } from "../../src/lib/acp/registry.ts";
import { getManagedCliDefinition } from "../../src/shared/services/managedCliRuntimeCore.mjs";
import { resolveManagedCliInvocation } from "../../src/shared/services/managedCliLaunch.ts";
import {
  getCliRuntimeStatus,
  getLookupEnv,
  locateCommandCandidate,
} from "../../src/shared/services/cliRuntime.ts";
import {
  getQoderCliCommand,
  resolveQoderCliInvocation,
  __clearQoderCliInvocationCache,
} from "../../open-sse/services/qoderCliResolve.ts";
import {
  disposeQoderAcpProcesses,
  getQoderAcpProcessCount,
  runQoderAcpPrompt,
} from "../../open-sse/services/qoderCliAcp.ts";

let dataDir: string;
const savedEnv = Object.fromEntries(
  ["DATA_DIR", "CLI_CODEX_BIN", "CLI_CLAUDE_BIN", "CLI_QODER_BIN"].map((key) => [
    key,
    process.env[key],
  ])
);
const managers: AcpManager[] = [];

beforeEach(() => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "managed cli launch "));
  process.env.DATA_DIR = dataDir;
  delete process.env.CLI_CODEX_BIN;
  delete process.env.CLI_CLAUDE_BIN;
  delete process.env.CLI_QODER_BIN;
});

afterEach(() => {
  for (const manager of managers.splice(0)) manager.killAll();
  disposeQoderAcpProcesses();
  setCustomAgents([]);
  mock.restoreAll();
  syncBuiltinESMExports();
  __clearQoderCliInvocationCache();
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function activate(
  toolId: string,
  version: string,
  platform: NodeJS.Platform = process.platform,
  content?: Buffer
) {
  const definition = getManagedCliDefinition(toolId)!;
  const installationId = `${version}-${randomUUID()}`;
  const root = path.join(dataDir, "cli-runtimes", toolId);
  const prefix = path.join(root, "versions", installationId);
  const packageDir = path.join(prefix, "node_modules", ...definition.packageName.split("/"));
  const binDir = path.join(prefix, "node_modules", ".bin");
  fs.mkdirSync(packageDir, { recursive: true });
  fs.mkdirSync(binDir, { recursive: true });
  const entry = path.join(packageDir, content ? "cli" : "cli.js");
  fs.writeFileSync(entry, content || "#!/usr/bin/env node\n", { mode: 0o755 });
  fs.writeFileSync(
    path.join(packageDir, "package.json"),
    JSON.stringify({
      name: definition.packageName,
      version,
      bin: { [definition.binary]: path.basename(entry) },
    })
  );
  const command = path.join(binDir, `${definition.binary}${platform === "win32" ? ".cmd" : ""}`);
  fs.writeFileSync(command, "#!/usr/bin/env node\n// Synthetic npm shim.\n", { mode: 0o755 });
  fs.writeFileSync(
    path.join(root, "active.json"),
    JSON.stringify({
      version,
      installationId,
      updatedAt: new Date().toISOString(),
    })
  );
  return { command, entry };
}

test("Codex and Claude launchers select the activated private runtime on every launch", async () => {
  for (const [id, resolveSpawn] of [
    ["codex", resolveCodexSpawn],
    ["claude", resolveClaudeSpawn],
  ] as const) {
    const old = activate(id, "1.2.3", "linux");
    assert.equal((await resolveSpawn("linux")).command, old.command);
    const next = activate(id, "1.2.4", "linux");
    assert.equal((await resolveSpawn("linux")).command, next.command);
    assert.ok(fs.existsSync(old.command), "activation leaves old sessions' files intact");
  }
});

test("explicit binary overrides prevent managed runtime selection", async () => {
  activate("codex", "1.2.3", "linux");
  activate("claude", "1.2.3", "linux");
  process.env.CLI_CODEX_BIN = "/operator/codex";
  process.env.CLI_CLAUDE_BIN = "/operator/claude";
  assert.equal(resolveManagedCliSpawn("codex", "linux"), null);
  assert.equal(resolveManagedCliSpawn("claude", "linux"), null);
});

test("Windows managed JavaScript entries use Node directly with path spaces preserved", async () => {
  const installed = activate("codex", "1.2.3", "win32");
  const spec = await resolveCodexSpawn("win32");
  assert.equal(spec.command, process.execPath);
  assert.deepEqual(spec.argsPrefix, [installed.entry]);
  assert.equal(spec.shell, undefined);
});

test("Windows managed native executables are spawned directly without cmd.exe", async () => {
  const installed = activate("claude", "1.2.3", "win32", Buffer.from("MZfixture"));
  const spec = await resolveClaudeSpawn("win32");
  assert.equal(spec.command, installed.entry);
  assert.deepEqual(spec.argsPrefix, []);
  assert.equal(spec.shell, undefined);
});

test("unrecognized managed Windows entries leave standalone launchers free to fall back", () => {
  activate("codex", "1.2.3", "win32", Buffer.from("#!/bin/sh\n"));
  assert.equal(resolveManagedCliSpawn("codex", "win32"), null);
});

test("runtime status reports an unsupported managed Windows entry as not runnable", async () => {
  mock.method(os, "platform", () => "win32");
  const installed = activate("codex", "1.2.3", "win32", Buffer.from("#!/bin/sh\n"));
  const status = await getCliRuntimeStatus("codex");
  assert.equal(status.commandPath, installed.command);
  assert.equal(status.runnable, false);
  assert.equal(status.reason, "healthcheck_failed");
});

test("managed runtime probes preserve argument boundaries without a Windows shell", () => {
  mock.method(os, "platform", () => "win32");
  const installed = activate("codex", "1.2.3", "win32");
  const args = ["debug", "path with spaces & punctuation", "--version"];
  assert.deepEqual(resolveManagedCliInvocation(installed.command, args), {
    command: process.execPath,
    args: [installed.entry, ...args],
    useShell: false,
  });
  assert.deepEqual(args, ["debug", "path with spaces & punctuation", "--version"]);
  assert.equal(resolveManagedCliInvocation("/unmanaged/codex", args), null);
  activate("codex", "1.2.4", "win32");
  assert.equal(resolveManagedCliInvocation(installed.command, args), null);
});

test("managed runtime probes do not replace an explicit override", () => {
  const installed = activate("codex", "1.2.3");
  process.env.CLI_CODEX_BIN = installed.command;
  assert.equal(resolveManagedCliInvocation(installed.command, ["--version"]), null);
});

test("a managed command already selected for discovery stays shell-free across activation", async () => {
  mock.method(os, "platform", () => "win32");
  const installed = activate("codex", "1.2.3", "win32");
  const located = await locateCommandCandidate(["codex"], getLookupEnv(), "codex");
  assert.equal(located.commandPath, installed.command);
  activate("codex", "1.2.4", "win32");
  assert.deepEqual(resolveManagedCliInvocation(installed.command, ["--version"], located.managed), {
    command: process.execPath,
    args: [installed.entry, "--version"],
    useShell: false,
  });
});

test("standalone launcher modules resolve the same managed pointer without a TypeScript loader", () => {
  const installed = activate("codex", "1.2.3");
  const result = childProcess.execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      "const { resolveCodexSpawn } = await import(process.argv[1]); process.stdout.write(JSON.stringify(await resolveCodexSpawn(process.platform)));",
      new URL("../../bin/cli/commands/launch-codex.mjs", import.meta.url).href,
    ],
    { encoding: "utf8", env: { ...process.env }, timeout: 10_000 }
  );
  const spec = JSON.parse(result);
  assert.equal(spec.command, process.platform === "win32" ? process.execPath : installed.command);
});

test("run dry-run plans preserve a managed Windows JavaScript entry before user arguments", async () => {
  const platform = mock.method(os, "platform", () => "win32");
  const descriptor = Object.getOwnPropertyDescriptor(process, "platform")!;
  Object.defineProperty(process, "platform", { value: "win32", configurable: true });
  try {
    const installed = activate("codex", "1.2.3", "win32");
    const plan = await buildRunPlan(
      "codex",
      { remote: "http://localhost:20128", apiKey: "test-only" },
      ["--version"]
    );
    assert.equal(plan.command, process.execPath);
    assert.equal(plan.args[0], installed.entry);
    assert.equal(plan.args.at(-1), "--version");
    assert.equal(plan.shell, undefined);
  } finally {
    Object.defineProperty(process, "platform", descriptor);
    platform.mock.restore();
  }
});

class FakeChild extends EventEmitter {
  stdin = new PassThrough();
  stdout = new PassThrough();
  stderr = new PassThrough();
  kill() {
    this.emit("exit", 0, null);
    return true;
  }
}

test("ACP launches use the new managed runtime while existing sessions stay alive", () => {
  const calls: string[] = [];
  mock.method(childProcess, "spawn", ((command: string) => {
    calls.push(command);
    return new FakeChild() as unknown as ChildProcess;
  }) as typeof childProcess.spawn);
  syncBuiltinESMExports();
  const manager = new AcpManager();
  managers.push(manager);
  const old = activate("codex", "1.2.3");
  const first = manager.spawn("codex");
  const next = activate("codex", "1.2.4");
  manager.spawn("codex");
  assert.deepEqual(
    calls,
    process.platform === "win32"
      ? [process.execPath, process.execPath]
      : [old.command, next.command]
  );
  assert.equal(first.alive, true);
});

test("ACP detection invalidates its inventory when a managed runtime is activated", () => {
  const calls: string[] = [];
  mock.method(childProcess, "execFileSync", ((command: string) => {
    calls.push(command);
    return "cli 1.2.3";
  }) as typeof childProcess.execFileSync);
  syncBuiltinESMExports();
  const old = activate("codex", "1.2.3");
  assert.ok(detectInstalledAgents().some((agent) => agent.id === "codex" && agent.installed));
  const oldCount = calls.length;
  detectInstalledAgents();
  assert.equal(calls.length, oldCount, "unchanged managed pointers reuse the inventory");
  const next = activate("codex", "1.2.4");
  detectInstalledAgents();
  assert.ok(calls.length > oldCount, "activation invalidates the cached detection");
  if (process.platform !== "win32") {
    assert.ok(calls.includes(old.command));
    assert.ok(calls.includes(next.command));
  }
});

test("Qoder's executable cache key changes with activation and preserves the explicit override", () => {
  const old = activate("qoder", "1.2.3");
  assert.equal(getQoderCliCommand(), old.command);
  const next = activate("qoder", "1.2.4");
  assert.equal(getQoderCliCommand(), next.command);
  process.env.CLI_QODER_BIN = "/operator/qoder";
  assert.equal(getQoderCliCommand(), "/operator/qoder");
});

test("Qoder cached resolution immediately observes an activated replacement", async () => {
  let probes = 0;
  mock.method(childProcess, "spawn", (() => {
    probes += 1;
    const child = new FakeChild();
    queueMicrotask(() => {
      child.stdout.write("qoder 1.2.3\n");
      child.emit("close", 0);
    });
    return child as unknown as ChildProcess;
  }) as typeof childProcess.spawn);
  syncBuiltinESMExports();
  const old = activate("qoder", "1.2.3");
  const first = await resolveQoderCliInvocation();
  const firstProbes = probes;
  assert.equal(first.command, process.platform === "win32" ? process.execPath : old.command);
  assert.deepEqual(await resolveQoderCliInvocation(), first);
  assert.equal(probes, firstProbes, "cached resolution avoids another health probe");
  const next = activate("qoder", "1.2.4");
  const second = await resolveQoderCliInvocation();
  assert.equal(second.command, process.platform === "win32" ? process.execPath : next.command);
  assert.ok(probes > firstProbes, "the new pointer cannot reuse an old executable cache");
  if (process.platform === "win32") assert.deepEqual(second.argsPrefix, [next.entry]);
});

test("Qoder Windows invocation uses the verified entry and preserves explicit per-call commands", async () => {
  mock.method(os, "platform", () => "win32");
  const installed = activate("qoder", "1.2.3", "win32");
  const invocation = await resolveQoderCliInvocation(installed.command);
  assert.equal(invocation.command, process.execPath);
  assert.deepEqual(invocation.argsPrefix, [installed.entry]);
  assert.equal(invocation.useShell, false);
  const explicit = await resolveQoderCliInvocation("/operator/qoder", {
    getStatus: async () => {
      throw new Error("explicit selections must not be replaced by discovery");
    },
  });
  assert.equal(explicit.command, "/operator/qoder");
});

test("Qoder ACP routes new sessions to an activated runtime without interrupting active turns", async () => {
  const launches: Array<{ command: string; args: string[] }> = [];
  let releaseFirst = () => {};
  let markFirstStarted = () => {};
  const firstStarted = new Promise<void>((resolve) => {
    markFirstStarted = resolve;
  });
  mock.method(childProcess, "spawn", ((command: string, args: string[]) => {
    const child = new FakeChild();
    if (args.includes("--version")) {
      queueMicrotask(() => {
        child.stdout.write("qoder 1.2.3\n");
        child.emit("close", 0);
      });
      return child as unknown as ChildProcess;
    }
    launches.push({ command, args });
    const send = (value: Record<string, unknown>) =>
      child.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", ...value })}\n`);
    let sessionCounter = 0;
    child.stdin.on("data", (chunk: Buffer) => {
      const message = JSON.parse(chunk.toString()) as {
        id: number;
        method: string;
        params: { sessionId?: string; prompt?: Array<{ text: string }> };
      };
      if (message.method === "session/new") {
        send({ id: message.id, result: { sessionId: `s${++sessionCounter}` } });
      } else if (message.method === "session/prompt") {
        const reply = () => {
          send({
            method: "session/update",
            params: {
              sessionId: message.params.sessionId,
              update: {
                sessionUpdate: "agent_message_chunk",
                content: { type: "text", text: "completed" },
              },
            },
          });
          send({ id: message.id, result: { stopReason: "end_turn" } });
        };
        if (message.params.prompt?.[0].text === "hold") {
          releaseFirst = reply;
          markFirstStarted();
        } else reply();
      } else send({ id: message.id, result: { protocolVersion: 1 } });
    });
    return child as unknown as ChildProcess;
  }) as typeof childProcess.spawn);
  syncBuiltinESMExports();
  const old = activate("qoder", "1.2.3");
  const options = { token: "test-only", configDir: dataDir, cwd: dataDir, timeoutMs: 5000 };
  const first = runQoderAcpPrompt({ ...options, prompt: "hold" });
  let startupTimeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      firstStarted,
      first.then(() => {
        throw new Error("First ACP turn ended before it received the startup prompt");
      }),
      new Promise<never>((_resolve, reject) => {
        startupTimeout = setTimeout(() => reject(new Error("First ACP turn did not start")), 5000);
      }),
    ]);
    const next = activate("qoder", "1.2.4");
    const second = await runQoderAcpPrompt({ ...options, prompt: "next" });
    assert.equal(second.ok, true);
    assert.equal(launches.length, 2, "the new session must not reuse the old process");
    assert.equal(getQoderAcpProcessCount(), 2, "the active old process remains available");
    assert.deepEqual(
      launches.map((launch) => (process.platform === "win32" ? launch.args[0] : launch.command)),
      process.platform === "win32" ? [old.entry, next.entry] : [old.command, next.command]
    );
  } finally {
    clearTimeout(startupTimeout);
    releaseFirst();
  }
  assert.equal((await first).ok, true, "activation preserves the in-flight turn");
});
