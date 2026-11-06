import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ENV_KEYS = [
  "SKILLS_SANDBOX_RUNTIME",
  "SKILLS_AGENT_SANDBOX_POOLS",
  "SKILLS_AGENT_SANDBOX_POOL",
  "SKILLS_AGENT_SANDBOX_NAMESPACE",
  "SKILLS_AGENT_SANDBOX_KUBECONFIG",
  "SKILLS_AGENT_SANDBOX_KUBECTL",
  "SKILLS_AGENT_SANDBOX_CONTAINER",
  "SKILLS_AGENT_SANDBOX_CLAIM_TIMEOUT_S",
];

const CONFIG = {
  cpuLimit: 100,
  memoryLimit: 256,
  timeout: 30000,
  networkEnabled: false,
  readOnly: true,
};

async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function withEnv<T>(values: Record<string, string>, fn: () => Promise<T>): Promise<T> {
  const saved = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, values);
  try {
    return await fn();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/**
 * A stand-in for kubectl: records every call, stores the claim manifest, and
 * runs the `exec` payload locally so the driver's control flow is exercised
 * end to end without a cluster.
 */
function makeFakeKubectl() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-sandbox-"));
  const bin = path.join(dir, "kubectl");
  const log = path.join(dir, "calls.log");
  fs.writeFileSync(
    bin,
    [
      "#!/bin/sh",
      `LOG='${log}'`,
      'printf "%s\\n" "$*" >> "$LOG"',
      'for a in "$@"; do',
      '  case "$a" in',
      `    create) cat > '${dir}/manifest.json'; exit 0 ;;`,
      '    wait) [ -z "$FAKE_WAIT_SLEEP_S" ] || exec sleep "$FAKE_WAIT_SLEEP_S"',
      '      exit "${FAKE_WAIT_RC:-0}" ;;',
      "    get) printf %s sandbox-pod-1; exit 0 ;;",
      "    delete) exit 0 ;;",
      "    exec) break ;;",
      "  esac",
      "done",
      'while [ "$#" -gt 0 ] && [ "$1" != "--" ]; do shift; done',
      "shift",
      'exec "$@"',
      "",
    ].join("\n"),
    { mode: 0o755 }
  );
  return {
    bin,
    calls: () => (fs.existsSync(log) ? fs.readFileSync(log, "utf8").trim().split("\n") : []),
    manifest: () => JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8")),
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true }),
  };
}

function run(
  resolved: { command: string; args: string[] },
  extraEnv: Record<string, string> = {},
  killAfter?: number | (() => boolean)
): Promise<{ code: number | null; signal: string | null; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const proc = spawn(resolved.command, resolved.args, {
      env: { ...process.env, ...extraEnv },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => (stdout += d));
    proc.stderr.on("data", (d) => (stderr += d));
    let poll: NodeJS.Timeout | undefined;
    if (typeof killAfter === "number") {
      setTimeout(() => proc.kill("SIGTERM"), killAfter);
    } else if (killAfter) {
      poll = setInterval(() => {
        if (!killAfter()) return;
        clearInterval(poll);
        proc.kill("SIGTERM");
      }, 20);
    }
    proc.on("close", (code, signal) => {
      clearInterval(poll);
      resolve({ code, signal, stdout, stderr });
    });
  });
}

test("agent-sandbox is opt-in: selectable by override, never auto-detected", async () => {
  await withEnv({}, async () => {
    const mod = await importFresh("src/lib/skills/containerProvider.ts");
    assert.ok(mod.PROVIDER_BY_ID.has("agent-sandbox"));
    assert.ok(!mod.ALL_PROVIDERS.some((p: { id: string }) => p.id === "agent-sandbox"));
    for (const platform of ["darwin", "win32", "linux"]) {
      const original = Object.getOwnPropertyDescriptor(process, "platform")!;
      Object.defineProperty(process, "platform", { value: platform });
      try {
        assert.ok(!mod.platformPriority().includes("agent-sandbox"));
      } finally {
        Object.defineProperty(process, "platform", original);
      }
    }
    process.env.SKILLS_SANDBOX_RUNTIME = "agent-sandbox";
    mod._resetProviderCacheForTests();
    assert.equal((await mod.resolveProvider()).id, "agent-sandbox");
    mod._resetProviderCacheForTests();
  });
});

test("agent-sandbox buildRun maps images to warm pools and keeps the command as argv", async () => {
  await withEnv(
    {
      SKILLS_AGENT_SANDBOX_POOLS: "python:3.12-alpine=py-pool, node:22-alpine = js-pool",
      SKILLS_AGENT_SANDBOX_POOL: "default-pool",
      SKILLS_AGENT_SANDBOX_NAMESPACE: "sandboxes",
      SKILLS_AGENT_SANDBOX_KUBECONFIG: "/etc/omniroute/kubeconfig",
    },
    async () => {
      const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
      const provider = new mod.AgentSandboxProvider();
      const tricky = ["python", "-c", "print('$(touch /tmp/x)'); `id`"];
      const resolved = provider.buildRun("python:3.12-alpine", tricky, "ABC-123", CONFIG);

      assert.equal(resolved.command, "sh");
      assert.equal(resolved.args[0], "-c");
      assert.equal(resolved.args[1], mod.AGENT_SANDBOX_DRIVER);
      const [kubectl, ns, claim, manifestJson, container, wait, kubeconfig, ...cmd] =
        resolved.args.slice(3);
      assert.equal(kubectl, "kubectl");
      assert.equal(ns, "sandboxes");
      assert.equal(claim, "omniroute-abc-123");
      assert.equal(container, "main");
      assert.equal(wait, "60");
      assert.equal(kubeconfig, "/etc/omniroute/kubeconfig");
      assert.deepEqual(cmd, tricky, "user command must be passed through untouched");

      const manifest = JSON.parse(manifestJson);
      assert.equal(manifest.kind, "SandboxClaim");
      assert.equal(manifest.apiVersion, "extensions.agents.x-k8s.io/v1beta1");
      assert.equal(manifest.metadata.name, "omniroute-abc-123");
      assert.equal(manifest.spec.warmPoolRef.name, "py-pool");
      assert.equal(manifest.spec.lifecycle.shutdownPolicy, "Delete");
      assert.ok(Date.parse(manifest.spec.lifecycle.shutdownTime) > Date.now());

      const js = provider.buildRun("node:22-alpine", ["node", "-v"], "id2", CONFIG);
      assert.equal(JSON.parse(js.args[6]).spec.warmPoolRef.name, "js-pool");
      const other = provider.buildRun("alpine:3.20", ["true"], "id3", CONFIG);
      assert.equal(JSON.parse(other.args[6]).spec.warmPoolRef.name, "default-pool");

      assert.deepEqual(resolved.killArgs("omniroute-ABC-123"), [
        "--kubeconfig",
        "/etc/omniroute/kubeconfig",
        "-n",
        "sandboxes",
        "delete",
        "sandboxclaim",
        "omniroute-abc-123",
        "--ignore-not-found",
        "--wait=false",
      ]);
      assert.equal(provider.killCommand, "kubectl");
    }
  );
});

test("agent-sandbox buildRun fails closed on missing or invalid configuration", async () => {
  await withEnv({}, async () => {
    const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
    const provider = new mod.AgentSandboxProvider();
    assert.throws(() => provider.buildRun("alpine:3.20", ["true"], "x", CONFIG), /no warm pool/);

    process.env.SKILLS_AGENT_SANDBOX_POOL = "Bad_Pool";
    assert.throws(
      () => provider.buildRun("alpine:3.20", ["true"], "x", CONFIG),
      /invalid warm pool/
    );

    process.env.SKILLS_AGENT_SANDBOX_POOL = "ok";
    process.env.SKILLS_AGENT_SANDBOX_NAMESPACE = "ns;rm -rf /";
    assert.throws(
      () => provider.buildRun("alpine:3.20", ["true"], "x", CONFIG),
      /invalid namespace/
    );

    process.env.SKILLS_AGENT_SANDBOX_POOLS = "no-equals-sign";
    assert.throws(() => mod.resolveWarmPool("alpine:3.20"), /must be image=pool/);
  });
});

test("agent-sandbox driver claims, execs in the pod, propagates the exit code, and releases", async (t) => {
  if (process.platform === "win32") return t.skip("POSIX sh driver");
  const fake = makeFakeKubectl();
  try {
    await withEnv(
      { SKILLS_AGENT_SANDBOX_POOL: "py-pool", SKILLS_AGENT_SANDBOX_KUBECTL: fake.bin },
      async () => {
        const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
        const provider = new mod.AgentSandboxProvider();
        const resolved = provider.buildRun(
          "python:3.12-alpine",
          ["sh", "-c", "echo out-$0; echo err >&2; exit 7", "$(id)"],
          "run1",
          CONFIG
        );
        const r = await run(resolved);
        assert.equal(r.code, 7);
        assert.equal(r.stdout, "out-$(id)\n");
        assert.equal(r.stderr, "err\n");
        assert.equal(fake.manifest().spec.warmPoolRef.name, "py-pool");

        const calls = fake.calls();
        assert.match(calls[0], /^-n default create -f -$/);
        assert.match(
          calls[1],
          /^-n default wait --for=condition=Ready sandboxclaim\/omniroute-run1 /
        );
        assert.match(calls[3], /^-n default exec sandbox-pod-1 -c main -- sh -c /);
        assert.equal(
          calls.at(-1),
          "-n default delete sandboxclaim omniroute-run1 --ignore-not-found --wait=false"
        );
      }
    );
  } finally {
    fake.cleanup();
  }
});

test("agent-sandbox driver releases the claim when it never becomes Ready", async (t) => {
  if (process.platform === "win32") return t.skip("POSIX sh driver");
  const fake = makeFakeKubectl();
  try {
    await withEnv(
      { SKILLS_AGENT_SANDBOX_POOL: "py-pool", SKILLS_AGENT_SANDBOX_KUBECTL: fake.bin },
      async () => {
        const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
        const resolved = new mod.AgentSandboxProvider().buildRun("img", ["true"], "slow", CONFIG);
        const r = await run(resolved, { FAKE_WAIT_RC: "1" });
        assert.equal(r.code, 125);
        assert.match(r.stderr, /not Ready within 60s/);
        const calls = fake.calls();
        assert.ok(!calls.some((c) => / exec /.test(c)), "must not exec without a Ready claim");
        assert.match(calls.at(-1)!, /delete sandboxclaim omniroute-slow/);
      }
    );
  } finally {
    fake.cleanup();
  }
});

test("agent-sandbox driver releases the claim and reports a signal exit on SIGTERM", async (t) => {
  if (process.platform === "win32") return t.skip("POSIX sh driver");
  const fake = makeFakeKubectl();
  try {
    await withEnv(
      { SKILLS_AGENT_SANDBOX_POOL: "py-pool", SKILLS_AGENT_SANDBOX_KUBECTL: fake.bin },
      async () => {
        const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
        const resolved = new mod.AgentSandboxProvider().buildRun(
          "img",
          ["sleep", "30"],
          "term",
          CONFIG
        );
        const started = Date.now();
        const r = await run(resolved, {}, 500);
        assert.equal(r.code, null, "SandboxRunner treats a null exit code as killed");
        assert.equal(r.signal, "SIGTERM");
        assert.ok(Date.now() - started < 10_000, "the exec must not outlive the kill");
        assert.match(fake.calls().at(-1)!, /delete sandboxclaim omniroute-term/);
      }
    );
  } finally {
    fake.cleanup();
  }
});

test("agent-sandbox driver reacts to SIGTERM while the claim is still waiting for Ready", async (t) => {
  if (process.platform === "win32") return t.skip("POSIX sh driver");
  const fake = makeFakeKubectl();
  try {
    await withEnv(
      {
        SKILLS_AGENT_SANDBOX_POOL: "py-pool",
        SKILLS_AGENT_SANDBOX_KUBECTL: fake.bin,
        SKILLS_AGENT_SANDBOX_KUBECONFIG: "/etc/omniroute/kubeconfig",
      },
      async () => {
        const mod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
        const resolved = new mod.AgentSandboxProvider().buildRun(
          "img",
          ["true"],
          "pending",
          CONFIG
        );
        const started = Date.now();
        const r = await run(resolved, { FAKE_WAIT_SLEEP_S: "20" }, () =>
          fake.calls().some((c) => c.includes(" wait --for=condition=Ready "))
        );
        assert.ok(Date.now() - started < 10_000, "the kill must not sit behind kubectl wait");
        assert.equal(r.code, null, "SandboxRunner treats a null exit code as killed");
        assert.equal(r.signal, "SIGTERM");
        const calls = fake.calls();
        assert.ok(!calls.some((c) => / exec /.test(c)), "must not exec after the kill");
        assert.match(
          calls.at(-1)!,
          /^--kubeconfig \/etc\/omniroute\/kubeconfig -n default delete sandboxclaim omniroute-pending /
        );
      }
    );
  } finally {
    fake.cleanup();
  }
});

test("documented agent-sandbox RBAC includes the list verb kubectl wait needs", () => {
  for (const file of [
    ".env.example",
    "docs/reference/ENVIRONMENT.md",
    "src/lib/skills/agentSandboxProvider.ts",
  ]) {
    const text = fs.readFileSync(file, "utf8");
    assert.ok(text.includes("sandboxclaims create/get/list/watch/delete"), file);
  }
});

test("sandboxRunner timeout path kills the agent-sandbox run and deletes the claim", async (t) => {
  if (process.platform === "win32") return t.skip("POSIX sh driver");
  const fake = makeFakeKubectl();
  try {
    await withEnv(
      {
        SKILLS_SANDBOX_RUNTIME: "agent-sandbox",
        SKILLS_AGENT_SANDBOX_POOL: "py-pool",
        SKILLS_AGENT_SANDBOX_KUBECTL: fake.bin,
      },
      async () => {
        const { sandboxRunner } = await importFresh("src/lib/skills/sandbox.ts");
        const providerMod = await importFresh("src/lib/skills/agentSandboxProvider.ts");
        (sandboxRunner as unknown as { cachedProvider: unknown }).cachedProvider =
          new providerMod.AgentSandboxProvider();
        const ok = await sandboxRunner.run("img", ["echo", "hello"], {});
        assert.equal(ok.runtime, "agent-sandbox");
        assert.equal(ok.exitCode, 0);
        assert.equal(ok.stdout, "hello\n");

        const slow = await sandboxRunner.run("img", ["sleep", "30"], {}, { timeout: 300 });
        assert.equal(slow.killed, true);
        assert.equal(slow.exitCode, null);
        // give the fire-and-forget kill command a moment to land
        await new Promise((r) => setTimeout(r, 300));
        const deletes = fake.calls().filter((c) => c.includes("delete sandboxclaim"));
        assert.ok(deletes.some((c) => /omniroute-[0-9a-f-]{36}/.test(c)));
        assert.equal(sandboxRunner.getRunningCount(), 0);
      }
    );
  } finally {
    fake.cleanup();
  }
});
