// bin/cli/launch/core/pipeline/doctor.mjs: --doctor, the checks (gateway, catalog, view, binary,
// version, plan, then the plan's and the adapter's preflight checks) printed one per line.

import { PLACEHOLDERS } from "../../contract.mjs";
import { toLaunchError } from "../errors.mjs";
import { planLaunch } from "../plan.mjs";
import { evaluatePreflight } from "../preflight.mjs";

function gatewayStatus(healthy, target) {
  if (healthy) return "pass";
  return target.kind === "remote" ? "fail" : "warn";
}

function passOrFail(ok) {
  return ok ? "pass" : "fail";
}

/** catalog and view: only checked when the gateway answered. */
function catalogChecks(st, add) {
  if (!st.healthy) return;
  if (st.catalogError) add("catalog", "fail", st.catalogError.message);
  else add("catalog", passOrFail(st.rows.length > 0), `${st.rows.length} models`);
  const scope = st.providers ? `, ${st.providers.length} connected provider prefixes` : "";
  const size = st.view.rows.length;
  add("view", passOrFail(size > 0), `${st.view.name}: ${size} models${scope}`);
}

function binaryCheck(st, add) {
  if (st.binError) add("binary", "fail", st.binError.message);
  else add("binary", "pass", st.bin.command);
}

function versionCheck(adapter, st, add) {
  if (st.versionError) add("version", "fail", st.versionError.message);
  else if (adapter.capabilities.versionGate)
    add("version", st.probed.version ? "pass" : "warn", st.probed.version ?? "unknown");
}

/** The plan check, then the declared preflight checks (plan's without temp files, adapter's). */
function declaredChecks(L, ctx0, add) {
  const { adapter } = L;
  let declared = [];
  try {
    const { plan } = planLaunch(adapter, ctx0, { middleware: L.deps.middleware });
    declared = plan.preflight.filter((check) => !JSON.stringify(check).includes(PLACEHOLDERS.TMP));
    add("plan", "pass", `${plan.argv.length} args, ${plan.tempFiles.length} files`);
  } catch (error) {
    add("plan", "fail", toLaunchError(error).message);
  }
  if (typeof adapter.diagnose === "function")
    declared = [...declared, ...(adapter.diagnose(ctx0) || [])];
  return declared;
}

function writeChecks(L, checks) {
  if (L.jsonMode) {
    L.stdout.write(`${JSON.stringify({ tool: L.adapter.id, checks }, null, 2)}\n`);
    return;
  }
  for (const c of checks) L.stdout.write(`${c.status.padEnd(4)} ${c.name}: ${c.message}\n`);
}

/**
 * Run the checks for the preview state `st` and print them.
 * @returns {Promise<{ exitCode: number, warnings: string[], checks: object[] }>}
 */
export async function doctor(L, st) {
  const checks = [];
  const add = (name, status, message) => checks.push({ name, status, message });
  add("gateway", gatewayStatus(st.healthy, L.target), `${L.target.rootUrl}: ${st.status}`);
  catalogChecks(st, add);
  binaryCheck(st, add);
  versionCheck(L.adapter, st, add);
  const declared = declaredChecks(L, st.ctx0, add);
  const env = { ...L.baseEnv };
  const results = await (L.deps.evaluatePreflight ?? evaluatePreflight)(declared, {
    env,
    toolVersion: st.probed.version,
  });
  for (const r of results) add(r.check.kind, r.status, r.message);
  writeChecks(L, checks);
  const failed = checks.some((c) => c.status === "fail");
  return { exitCode: failed ? 69 : 0, warnings: L.warnings, checks };
}
