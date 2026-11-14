// Phase C: REAL models on real tools. A fresh real gateway (dev server, temp DATA_DIR,
// 127.0.0.1) gets the exported provider connections from the secrets dir through the normal CLI
// import path (`omniroute providers import <file>`), is checked with `providers test`, and every
// tool is launched against ONE real model (the cheapest tool-capable >= 64k one, or --c-model)
// with a marker prompt, plus one tool-use prompt (create probe.txt) for tools with tools enabled.
// Real provider keys, real cost. With no secrets dir set, phase C is skipped.
//
// Secrets: the provider files are read ONLY by the gateway CLI import. This module never reads,
// prints or stores a key value; every stored tail goes through redactSecrets(). The gateway's
// DATA_DIR is deleted at the end.
//
//   node tests/launch-smoke/run.mjs --phase c [--only ...] [--secrets <dir>] [--c-model <id>]

import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

import {
  PROMPT,
  WORKTREE,
  makeSandbox,
  processesMentioning,
  killAll,
  redactSecrets,
  runProcess,
  sleep,
  tail,
} from "./lib.mjs";
import { createApiKey, gatewayLogin, startGateway } from "./gateway.mjs";
import { getJson, health, listenersOn, runTool, warmUp } from "./phaseB.mjs";

/** Dir of provider-*.json exports ($LAUNCH_SMOKE_SECRETS or --secrets). Unset: phase C skipped. */
export const DEFAULT_SECRETS_DIR = process.env.LAUNCH_SMOKE_SECRETS || "";

export const PHASE_C_SKIPPED =
  "phase C skipped: set LAUNCH_SMOKE_SECRETS to a dir of provider-*.json exports";

const TOOL_USE_PROMPT = (marker) =>
  `create a file probe.txt containing ${marker} in the current directory, then reply DONE`;

/**
 * Tool-use argv per tool ({P} = the prompt). Auto-approve flags from each tool's --help in the
 * sandbox install. Tools not listed get no tool-use run (pty-only tools).
 */
const TOOL_USE = {
  claude: ["-p", "{P}", "--max-turns", "6", "--permission-mode", "bypassPermissions"],
  codex: ["exec", "--skip-git-repo-check", "--dangerously-bypass-approvals-and-sandbox", "{P}"],
  opencode: ["run", "--auto", "{P}"],
  kilo: ["run", "--auto", "{P}"],
  omp: ["-p", "--no-session", "--auto-approve", "{P}"],
  pi: ["-p", "{P}"],
  cline: ["--timeout", "120", "--yolo", "{P}"],
  qwen: ["-p", "{P}", "--yolo"],
  gemini: ["--skip-trust", "-p", "{P}", "--yolo"],
  continue: ["-p", "{P}", "--auto"],
  copilot: ["-p", "{P}", "--allow-all-tools"],
  crush: ["run", "--yolo", "{P}"],
  kimi: ["-p", "{P}"], // kimi 2.6.2 rejects --auto and --yolo together with --prompt
  aider: [
    "--no-git",
    "--no-analytics",
    "--no-check-update",
    "--no-show-release-notes",
    "--no-show-model-warnings",
    "--no-fancy-input",
    "--no-pretty",
    "--yes-always",
    "--message",
    "{P}",
  ],
  hermes: ["-z", "{P}", "--yolo"],
};

function toNum(v) {
  const n = Number(v);
  return v === undefined || v === null || v === "" || !Number.isFinite(n) ? null : n;
}

function ctxOf(row) {
  return Number(
    row.context_length ?? row.contextLength ?? row.context_window ?? row.max_context_length ?? 0
  );
}

async function cli(args, env, timeoutMs = 120000) {
  const r = await runProcess(process.execPath, [join(WORKTREE, "bin", "omniroute.mjs"), ...args], {
    cwd: WORKTREE,
    env,
    stdin: "ignore",
    timeoutMs,
  });
  return { code: r.code, out: tail(redactSecrets(r.stdout + "\n" + r.stderr), 12) };
}

/**
 * @param {Array<{id, exp, info, row, skip}>} plan
 * @param {{ outDir, sandboxParent, secretsDir }} opts
 */
export async function runPhaseC(plan, opts) {
  const secretsDir = opts.secretsDir || DEFAULT_SECRETS_DIR;
  if (!secretsDir) return { skipped: PHASE_C_SKIPPED };
  const out = { checks: [], providers: [], models: null };
  const gwRoot = makeSandbox(opts.sandboxParent, "c-gateway");
  let gw;
  try {
    gw = await startGateway({
      dataDir: gwRoot.data,
      logFile: join(gwRoot.root, "gateway.server.log"),
      env: { HOME: gwRoot.home, ENABLE_REQUEST_LOGS: "1" },
    });
    process.stderr.write(`[smoke C] gateway ${gw.url} healthy after ${gw.healthyMs} ms\n`);
    out.gateway = { url: gw.url, listen: listenersOn(gw.port), healthyMs: gw.healthyMs };
    const auth = await gatewayLogin({ gatewayUrl: gw.url });
    const apiKey = await createApiKey({ gatewayUrl: gw.url, auth });
    auth.apiKey = apiKey;

    // The CLI authenticates to a local gateway with its machine CLI token, derived from DATA_DIR.
    const cliEnv = {
      ...process.env,
      DATA_DIR: gwRoot.data,
      HOME: gwRoot.home,
      OMNIROUTE_BASE_URL: gw.url,
      PORT: String(gw.port),
    };
    delete cliEnv.OMNIROUTE_API_KEY;
    const files = readdirSync(secretsDir)
      .filter((f) => /^provider-.*\.json$/.test(f))
      .sort();
    for (const f of files) {
      const r = await cli(["providers", "import", join(secretsDir, f)], cliEnv);
      out.providers.push({ file: f, importExit: r.code, importTail: r.out });
      process.stderr.write(`[smoke C] providers import ${f}: exit ${r.code}\n`);
    }
    // Names + pass/fail only.
    const list = await getJson(`${gw.url}/api/providers`, auth.headers);
    const conns = (list.json?.connections || []).map((c) => ({
      id: c.id,
      provider: c.provider,
      name: c.name,
      isActive: c.isActive,
    }));
    out.connections = [];
    for (const c of conns) {
      const t = await cli(["providers", "test", c.id], cliEnv, 180000);
      const after = (
        await getJson(`${gw.url}/api/providers`, auth.headers)
      ).json?.connections?.find((x) => x.id === c.id);
      const pass = t.code === 0;
      out.connections.push({
        provider: c.provider,
        name: c.name,
        test: pass ? "pass" : `fail (exit ${t.code})`,
        isActive: after?.isActive ?? c.isActive,
      });
      process.stderr.write(
        `[smoke C] providers test ${c.provider}/${c.name}: ${pass ? "pass" : "fail"}\n`
      );
      if (!after?.isActive) {
        // Same as the dashboard toggle; a passing test normally flips it on.
        await fetch(`${gw.url}/api/providers/${c.id}`, {
          method: "PUT",
          headers: { ...auth.headers, "content-type": "application/json" },
          body: JSON.stringify({ isActive: true }),
        }).catch(() => {});
      }
    }
    for (const c of out.connections)
      out.checks.push({
        name: `providers test ${c.provider} (${c.name})`,
        ok: c.test === "pass",
        detail: `${c.test}, isActive ${c.isActive}`,
      });

    await sleep(3000);
    const models = await getJson(`${gw.url}/v1/models`, { authorization: `Bearer ${apiKey}` });
    const rows = models.json?.data || [];
    // ONE model for every tool, the cheapest the catalog exposes
    // that supports tool calls with context_length >= 65536, among rows the imported connections
    // serve (prefix or owned_by = an imported provider). Price = pricing.input + pricing.output
    // (USD per 1M tokens, src/app/api/v1/models/catalogPricing.ts); unpriced rows are skipped.
    const imported = new Set(conns.map((c) => c.provider));
    const servedBy = (r) => {
      const prefix = String(r.id).split("/")[0];
      return imported.has(prefix)
        ? prefix
        : imported.has(String(r.owned_by))
          ? String(r.owned_by)
          : null;
    };
    const priceOf = (r) => {
      const pr = r.pricing || {};
      const input = toNum(
        pr.input ?? (pr.prompt !== undefined ? toNum(pr.prompt) * 1e6 : undefined)
      );
      const output = toNum(
        pr.output ?? (pr.completion !== undefined ? toNum(pr.completion) * 1e6 : undefined)
      );
      return input === null || output === null ? null : { input, output, total: input + output };
    };
    const eligible = rows
      .filter(
        (r) =>
          servedBy(r) &&
          r.capabilities?.tool_calling === true &&
          ctxOf(r) >= 65536 &&
          r.type !== "embedding"
      )
      .map((r) => ({ row: r, price: priceOf(r), provider: servedBy(r) }))
      .filter((x) => x.price !== null)
      .sort((x, y) => x.price.total - y.price.total || ctxOf(y.row) - ctxOf(x.row));
    out.cheapest = eligible.slice(0, 8).map((x) => ({
      id: x.row.id,
      provider: x.provider,
      context: ctxOf(x.row),
      usdPer1M: x.price,
    }));
    out.deepseekIds = rows.filter((r) => /deepseek/i.test(String(r.id))).map((r) => r.id);
    const chosen = opts.model
      ? eligible.find((x) => x.row.id === opts.model) ||
        (rows.find((r) => r.id === opts.model)
          ? {
              row: rows.find((r) => r.id === opts.model),
              price: priceOf(rows.find((r) => r.id === opts.model)),
              provider: servedBy(rows.find((r) => r.id === opts.model)),
            }
          : null)
      : eligible[0] || null;
    if (!chosen)
      throw new Error(
        opts.model
          ? `--c-model ${opts.model} is not in the test gateway catalog`
          : `no tool-capable, priced, >= 65536-context model served by ${[...imported].join(", ")}`
      );
    const pick = chosen.row;
    out.models = {
      phaseC: {
        id: pick.id,
        chosenBy: opts.model ? "--c-model" : "cheapest eligible",
        provider: chosen.provider,
        context: ctxOf(pick),
        toolCalling: pick.capabilities?.tool_calling ?? null,
        usdPer1M: chosen.price,
        pricing: pick.pricing ?? null,
      },
    };
    process.stderr.write(`[smoke C] model: ${JSON.stringify(out.models)}\n`);
    out.checks.push({
      name: `${pick.id} context_length >= 65536 (hermes floor)`,
      ok: ctxOf(pick) >= 65536,
      detail: String(ctxOf(pick)),
    });
    out.checks.push({
      name: `${pick.id} tool support in the catalog row`,
      ok: pick.capabilities?.tool_calling === true,
      detail: JSON.stringify(pick.capabilities ?? null),
    });
    const modelFor = () => pick.id;
    out.warmUp = await warmUp(gw.url, apiKey, pick.id);
    const ctx = { ...opts, gw, auth, apiKey, gwDataDir: gwRoot.data, model: null };
    let i = 0;
    for (const p of plan) {
      if (p.skip) {
        p.row.C = { skipped: p.skip };
        continue;
      }
      let model = modelFor(p.id, i++);
      if (!model) {
        p.row.C = { skipped: "no real model picked" };
        continue;
      }
      await health(gw.url);
      process.stderr.write(`[smoke C] ${p.id} with ${model} ...\n`);
      let prompt = await runTool(p, ctx, { label: "C", model, real: true });
      // A launch view that filters the model out is a finding; rerun with the id
      // the launcher suggests (its "did you mean" hint) and say so.
      let viewFilter = null;
      const filtered = /model \S+ is not in the \S+ launch view \((\d+) models\)/.exec(
        prompt.stderrTail || ""
      );
      if (filtered) {
        const hint = /did you mean: ([^\s,]+)/.exec(prompt.stderrTail || "");
        viewFilter = {
          model,
          viewSize: Number(filtered[1]),
          message: filtered[0],
          rerunModel: hint ? hint[1] : null,
          firstRun: { failed: prompt.failed, tag: prompt.tag },
        };
        if (hint) {
          model = hint[1];
          await health(gw.url);
          process.stderr.write(
            `[smoke C] ${p.id}: view filtered ${viewFilter.model}; rerun with ${model}\n`
          );
          prompt = await runTool(p, ctx, { label: "C", model, real: true });
        }
      }
      let toolUse = null;
      if (TOOL_USE[p.id] && p.exp.mode !== "pty") {
        const args = TOOL_USE[p.id].map((a) => (a === "{P}" ? PROMPT : a));
        await health(gw.url);
        toolUse = await runTool(p, ctx, {
          label: "Ctool",
          model,
          real: true,
          args,
          replyRe: /\b(DONE|OK)\b/i,
          probeFile: "probe.txt",
          promptFor: TOOL_USE_PROMPT,
        });
      }
      p.row.C = {
        ...prompt,
        realModel: model,
        viewFilter,
        toolUse: toolUse
          ? {
              pass: toolUse.pass,
              failed: toolUse.failed,
              probeFile: toolUse.probeFile,
              command: toolUse.command,
              tag: toolUse.tag,
              usageRequests: toolUse.usageRequests,
              stderrTail: toolUse.stderrTail,
              stdoutTail: toolUse.stdoutTail,
              checks: toolUse.checks,
            }
          : null,
      };
      if (toolUse && !toolUse.pass) {
        p.row.C.pass = false;
        p.row.C.failed = [
          ...(p.row.C.failed || []),
          ...toolUse.failed.map((f) => `tool-use: ${f}`),
        ];
      }
      process.stderr.write(
        `[smoke C] ${p.id}: ${p.row.C.pass ? "PASS" : `FAIL (${(p.row.C.failed || []).join("; ").slice(0, 300)})`}\n`
      );
    }
    // Surfaces exercised with a real model.
    const surfaces = new Set();
    for (const p of plan)
      for (const r of p.row.C?.callLogs || [])
        if (r.status === 200)
          surfaces.add(String(r.path).startsWith("/v1beta") ? "/v1beta" : r.path);
    for (const s of ["/v1/messages", "/v1/responses", "/v1/chat/completions", "/v1beta"]) {
      out.checks.push({
        name: `real model exercised ${s}`,
        ok: surfaces.has(s),
        detail: [...surfaces].join(", "),
      });
    }
  } catch (err) {
    out.error = redactSecrets(err && err.message ? err.message : String(err));
    process.stderr.write(`[smoke C] error: ${out.error}\n`);
  } finally {
    if (gw) await gw.stop();
    killAll(processesMentioning(gwRoot.root));
    await sleep(500);
    rmSync(gwRoot.root, { recursive: true, force: true });
    let deleted = true;
    try {
      readdirSync(gwRoot.root);
      deleted = false;
    } catch {
      /* gone */
    }
    out.dataDirDeleted = deleted;
    out.checks.push({
      name: "test gateway stopped and its DATA_DIR deleted",
      ok: deleted && (gw ? (await health(gw.url)) === 0 : true),
      detail: gwRoot.data,
    });
  }
  return out;
}
