/**
 * Remote sandbox runtime backed by kubernetes-sigs/agent-sandbox.
 *
 * Instead of starting a local container, each skill run claims a pre-warmed
 * Sandbox pod from a `SandboxWarmPool` (one `SandboxClaim` per run), executes
 * the command in it with `kubectl exec`, and deletes the claim afterwards.
 * Isolation (gVisor / Kata via RuntimeClass), CPU/memory limits, network policy
 * and the root filesystem are owned by the operator's `SandboxTemplate`, so
 * code can run on a separate cluster instead of next to the OmniRoute process.
 *
 * Opt-in only: it never participates in auto-detection. Select it with
 * `SKILLS_SANDBOX_RUNTIME=agent-sandbox` and map images to warm pools with
 * `SKILLS_AGENT_SANDBOX_POOLS` / `SKILLS_AGENT_SANDBOX_POOL`.
 *
 * Environment:
 *   SKILLS_AGENT_SANDBOX_POOLS          image=pool pairs, comma-separated
 *   SKILLS_AGENT_SANDBOX_POOL           fallback warm pool for unmapped images
 *   SKILLS_AGENT_SANDBOX_NAMESPACE      namespace of pools and claims (default "default")
 *   SKILLS_AGENT_SANDBOX_KUBECONFIG     kubeconfig path (default: kubectl's own resolution)
 *   SKILLS_AGENT_SANDBOX_KUBECTL        kubectl binary (default "kubectl")
 *   SKILLS_AGENT_SANDBOX_CONTAINER      container name in the sandbox pod (default "main")
 *   SKILLS_AGENT_SANDBOX_CLAIM_TIMEOUT_S  seconds to wait for a claim to become Ready (default 60)
 *
 * The kubeconfig only needs, in that namespace: sandboxclaims create/get/list/watch/delete
 * (`kubectl wait` lists as well as watches), pods get and pods/exec create.
 */

import { createRequire } from "module";
import type {
  ContainerProvider,
  ResolvedContainerCommand,
  SandboxConfig,
  SandboxRuntimeId,
} from "./containerProvider.ts";

const require = createRequire(import.meta.url);
const childProcess = require("child_process") as typeof import("child_process");

export const AGENT_SANDBOX_CLAIM_API = "extensions.agents.x-k8s.io/v1beta1";

/** Kubernetes object names: DNS-1123 subdomain, kept to the label subset. */
const K8S_NAME = /^[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?$/;

/**
 * Shell driver run via `sh -c`. Every value arrives as a positional argument,
 * so nothing user-controlled is ever interpolated into the script text.
 *   $1 kubectl  $2 namespace  $3 claim name  $4 claim manifest (JSON)
 *   $5 container  $6 ready timeout (s)  $7 kubeconfig ("" = default)  $8.. command
 * On SIGTERM/SIGINT it stops the running wait or exec, deletes the claim, then
 * re-raises the signal so the caller still observes a signal exit (exit code null).
 */
export const AGENT_SANDBOX_DRIVER = [
  "KB=$1 NS=$2 CLAIM=$3 MANIFEST=$4 CTR=$5 WAIT=$6 KC=$7",
  "shift 7",
  'k() { if [ -n "$KC" ]; then "$KB" --kubeconfig "$KC" -n "$NS" "$@"; else "$KB" -n "$NS" "$@"; fi; }',
  // sh defers a trapped signal until a foreground command returns, so the calls
  // that can block for long run in the background and the shell waits on them.
  // The & sits on kubectl, not on a call to k(): a backgrounded function runs in
  // a subshell, so $! would not be kubectl itself and killing it would leave
  // kubectl holding stdout open.
  'kbg() { if [ -n "$KC" ]; then "$KB" --kubeconfig "$KC" -n "$NS" "$@" & else "$KB" -n "$NS" "$@" & fi; pid=$!; wait "$pid"; rc=$?; pid=; return "$rc"; }',
  "pid=",
  'cleanup() { if [ -n "$pid" ]; then kill "$pid" 2>/dev/null; fi; k delete sandboxclaim "$CLAIM" --ignore-not-found --wait=false >/dev/null 2>&1; }',
  "trap 'cleanup; trap - EXIT TERM; kill -TERM $$' TERM",
  "trap 'cleanup; trap - EXIT INT; kill -INT $$' INT",
  "trap cleanup EXIT",
  'printf %s "$MANIFEST" | k create -f - >/dev/null || { echo "agent-sandbox: failed to create claim $CLAIM" >&2; exit 125; }',
  'kbg wait --for=condition=Ready "sandboxclaim/$CLAIM" --timeout="${WAIT}s" >/dev/null || { echo "agent-sandbox: claim $CLAIM not Ready within ${WAIT}s" >&2; exit 125; }',
  "POD=$(k get sandboxclaim \"$CLAIM\" -o 'jsonpath={.status.sandbox.name}')",
  '[ -n "$POD" ] || { echo "agent-sandbox: claim $CLAIM has no sandbox" >&2; exit 125; }',
  'kbg exec "$POD" -c "$CTR" -- "$@"',
  'exit "$?"',
].join("\n");

function env(name: string, fallback = ""): string {
  const value = process.env[name];
  return value === undefined || value.trim() === "" ? fallback : value.trim();
}

function requireK8sName(kind: string, value: string): string {
  if (!K8S_NAME.test(value)) {
    throw new Error(`agent-sandbox: invalid ${kind} name: ${JSON.stringify(value)}`);
  }
  return value;
}

/** Parses `image=pool,image=pool` (whitespace tolerant). */
export function parsePoolMap(raw: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of raw.split(",")) {
    const trimmed = entry.trim();
    if (!trimmed) continue;
    const eq = trimmed.lastIndexOf("=");
    if (eq <= 0 || eq === trimmed.length - 1) {
      throw new Error(
        `agent-sandbox: SKILLS_AGENT_SANDBOX_POOLS entry must be image=pool: ${trimmed}`
      );
    }
    map.set(trimmed.slice(0, eq).trim(), trimmed.slice(eq + 1).trim());
  }
  return map;
}

/** Warm pool that serves `image`: explicit mapping first, then the fallback pool. */
export function resolveWarmPool(image: string): string {
  const pool =
    parsePoolMap(env("SKILLS_AGENT_SANDBOX_POOLS")).get(image) || env("SKILLS_AGENT_SANDBOX_POOL");
  if (!pool) {
    throw new Error(
      `agent-sandbox: no warm pool for image ${image}; set SKILLS_AGENT_SANDBOX_POOLS or SKILLS_AGENT_SANDBOX_POOL`
    );
  }
  return requireK8sName("warm pool", pool);
}

function kubectlBinary(): string {
  return env("SKILLS_AGENT_SANDBOX_KUBECTL", "kubectl");
}

function namespace(): string {
  return requireK8sName("namespace", env("SKILLS_AGENT_SANDBOX_NAMESPACE", "default"));
}

/** `--kubeconfig x -n ns` prefix for direct kubectl calls (the kill path). */
function kubectlScope(): string[] {
  const kubeconfig = env("SKILLS_AGENT_SANDBOX_KUBECONFIG");
  return [...(kubeconfig ? ["--kubeconfig", kubeconfig] : []), "-n", namespace()];
}

function claimReadyTimeoutSeconds(): number {
  const parsed = Number.parseInt(env("SKILLS_AGENT_SANDBOX_CLAIM_TIMEOUT_S"), 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 600) : 60;
}

/**
 * Claim manifest. `shutdownTime` is a cluster-side backstop: if OmniRoute dies
 * before it can delete the claim, the controller removes it anyway.
 */
export function buildClaimManifest(
  claimName: string,
  pool: string,
  config: SandboxConfig,
  now = Date.now()
): Record<string, unknown> {
  const backstopMs = Math.max(config.timeout * 2, 10 * 60_000);
  return {
    apiVersion: AGENT_SANDBOX_CLAIM_API,
    kind: "SandboxClaim",
    metadata: {
      name: claimName,
      labels: { "app.kubernetes.io/managed-by": "omniroute" },
    },
    spec: {
      warmPoolRef: { name: pool },
      lifecycle: {
        shutdownPolicy: "Delete",
        shutdownTime: new Date(now + backstopMs).toISOString().replace(/\.\d{3}Z$/, "Z"),
      },
    },
  };
}

function probeKubectl(): boolean {
  if (process.platform === "win32") return false; // the driver needs a POSIX sh
  const r = childProcess.spawnSync("which", [kubectlBinary()], { stdio: "ignore" });
  return r.status === 0;
}

export class AgentSandboxProvider implements ContainerProvider {
  readonly id: SandboxRuntimeId = "agent-sandbox";
  readonly displayName = "Kubernetes agent-sandbox";

  get killCommand(): string {
    return kubectlBinary();
  }

  detect(): boolean {
    return probeKubectl();
  }

  buildRun(
    image: string,
    command: string[],
    sandboxId: string,
    config: SandboxConfig
  ): ResolvedContainerCommand {
    const claimName = requireK8sName("claim", `omniroute-${sandboxId}`.toLowerCase());
    const pool = resolveWarmPool(image);
    const manifest = JSON.stringify(buildClaimManifest(claimName, pool, config));
    const args = [
      "-c",
      AGENT_SANDBOX_DRIVER,
      "omniroute-agent-sandbox",
      kubectlBinary(),
      namespace(),
      claimName,
      manifest,
      env("SKILLS_AGENT_SANDBOX_CONTAINER", "main"),
      String(claimReadyTimeoutSeconds()),
      env("SKILLS_AGENT_SANDBOX_KUBECONFIG"),
      ...command,
    ];
    return {
      command: "sh",
      args,
      killArgs: (name) => this.buildKillArgs(name),
    };
  }

  /** Deleting the claim tears down the pod, which also ends a running exec. */
  buildKillArgs(name: string): string[] {
    return [
      ...kubectlScope(),
      "delete",
      "sandboxclaim",
      name.toLowerCase(),
      "--ignore-not-found",
      "--wait=false",
    ];
  }
}
