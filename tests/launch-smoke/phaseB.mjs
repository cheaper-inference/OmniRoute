// Phase B: the real OmniRoute gateway (dev server from this worktree, temp DATA_DIR, 127.0.0.1)
// with a mock OpenAI-compatible upstream registered as a provider. No real keys.
//
//   1. start mock upstream + gateway, log in, create an API key, register the upstream
//   2. `omnirouter launch <tool> --port <gw> --yes -- <args>` per tool that passed phase A
//      (plus --api-key: the gateway refuses anonymous mint once a key exists, and --tag so the
//      launch can be read back from the gateway by session tag)
//   3. gateway lifecycle: a launch with the gateway DOWN (auto-start + auto-stop), and the
//      gateway we started is still up after every launch

import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  OMNIROUTER,
  PROMPT,
  WORKTREE,
  killAll,
  launcherEnv,
  launcherTempDirsLeft,
  makeSandbox,
  processesMentioning,
  redactSecrets,
  runProcess,
  runPty,
  sleep,
  stripAnsi,
  tail,
} from "./lib.mjs";
import {
  createApiKey,
  freePort,
  gatewayLogin,
  registerUpstream,
  startGateway,
} from "./gateway.mjs";
import { startMockUpstream } from "./mockUpstream.mjs";

const MODEL_INDEX = 0;

function check(list, name, ok, detail) {
  list.push({ name, ok: Boolean(ok), detail: detail === undefined ? undefined : String(detail) });
}

export async function health(url) {
  try {
    const r = await fetch(`${url}/api/monitoring/health`, { signal: AbortSignal.timeout(5000) });
    return r.status;
  } catch {
    return 0;
  }
}

export async function getJson(url, headers) {
  try {
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(60000) });
    const text = await r.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* text */
    }
    return { status: r.status, json, text };
  } catch (err) {
    return { status: 0, json: null, text: String(err.message) };
  }
}

/** Warm the routes tools hit so the dev server compiles them before the timed launches. */
export async function warmUp(gwUrl, apiKey, model) {
  const h = { "content-type": "application/json", authorization: `Bearer ${apiKey}` };
  const out = {};
  const calls = {
    chat: ["/v1/chat/completions", { model, messages: [{ role: "user", content: "hi" }] }],
    chatStream: [
      "/v1/chat/completions",
      { model, stream: true, messages: [{ role: "user", content: "hi" }] },
    ],
    messages: [
      "/v1/messages",
      { model, max_tokens: 16, stream: true, messages: [{ role: "user", content: "hi" }] },
    ],
    responses: ["/v1/responses", { model, stream: true, input: "hi" }],
  };
  for (const [name, [path, body]] of Object.entries(calls)) {
    try {
      const r = await fetch(gwUrl + path, {
        method: "POST",
        headers: h,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(300000),
      });
      const text = await r.text();
      out[name] =
        `${r.status}${text.includes("OMNI-SMOKE-OK") ? " ok" : ` ${text.slice(0, 120).replace(/\s+/g, " ")}`}`;
    } catch (err) {
      out[name] = `error ${err.message}`;
    }
  }
  // Compile the launch-session routes too (mint, PATCH heartbeat, usage, revoke): on a dev server
  // the first hit of each compiles for seconds, beyond the launcher's 1.5 s usage timeout.
  try {
    const mint = await fetch(`${gwUrl}/api/launch/sessions`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ tool: "smoke-warmup" }),
      signal: AbortSignal.timeout(300000),
    });
    const m = await mint.json().catch(() => ({}));
    out.mint = mint.status;
    if (m.sessionId) {
      const th = { "content-type": "application/json", authorization: `Bearer ${m.token}` };
      out.patch = (
        await fetch(`${gwUrl}/api/launch/sessions/${m.sessionId}`, {
          method: "PATCH",
          headers: th,
          body: JSON.stringify({ heartbeat: true }),
          signal: AbortSignal.timeout(300000),
        })
      ).status;
      out.usage = (
        await fetch(`${gwUrl}/api/launch/sessions/${m.sessionId}/usage`, {
          headers: th,
          signal: AbortSignal.timeout(300000),
        })
      ).status;
      out.revoke = (
        await fetch(`${gwUrl}/api/launch/sessions/${m.sessionId}`, {
          method: "DELETE",
          headers: th,
          signal: AbortSignal.timeout(300000),
        })
      ).status;
    }
  } catch (err) {
    out.launchRoutes = `error ${err.message}`;
  }
  for (const p of ["/v1/models", "/api/launch/capabilities"]) {
    out[p] = (await getJson(gwUrl + p, { authorization: `Bearer ${apiKey}` })).status;
  }
  return out;
}

export function listenersOn(port) {
  try {
    return execFileSync("ss", ["-Hltn", `sport = :${port}`], { encoding: "utf8" })
      .split("\n")
      .map((l) => l.trim().split(/\s+/)[3])
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Read-only view of the gateway's SQLite DB (only where no HTTP read route exists). */
function openGatewayDb(dataDir) {
  const require = createRequire(join(WORKTREE, "package.json"));
  const Database = require("better-sqlite3");
  return new Database(join(dataDir, "storage.sqlite"), { readonly: true, fileMustExist: true });
}

function dbAll(ctx, sql, ...params) {
  const db = openGatewayDb(ctx.gwDataDir);
  try {
    return db.prepare(sql).all(...params);
  } finally {
    db.close();
  }
}

function withMarker(args, marker) {
  let hit = false;
  const out = args.map((a) => {
    if (typeof a === "string" && a.includes(PROMPT)) {
      hit = true;
      return a.replace(PROMPT, `${marker} ${PROMPT}`);
    }
    return a;
  });
  return hit ? out : [...out];
}

/**
 * One launch through the real gateway. `opt` (phase C): model, args (tool args holding PROMPT),
 * label (log suffix), real (no mock upstream; the reply is a real model's), probeFile (a file the
 * tool must create in its cwd containing the marker).
 */
export async function runTool(p, ctx, opt = {}) {
  const { exp, info, id } = p;
  const label = opt.label || "B";
  const model = opt.model || ctx.model;
  const sb = makeSandbox(ctx.sandboxParent, `${label.toLowerCase()}-${id}`);
  const checks = [];
  const tag = `smoke-${label.toLowerCase()}-${id}-${randomBytes(4).toString("hex")}`;
  const marker = `OLX-PROBE-${id}-${randomBytes(5).toString("hex")}`;
  const result = {
    tool: id,
    version: info.version,
    mode: exp.mode,
    model,
    tag,
    marker,
    sandbox: sb.root,
    checks,
  };
  const env = launcherEnv(sb, exp.env || {});
  const baseArgs = opt.args || exp.args;
  const toolArgs =
    exp.mode === "pty"
      ? baseArgs
      : opt.promptFor
        ? baseArgs.map((x) => (x === PROMPT ? opt.promptFor(marker) : x))
        : withMarker(baseArgs, marker);
  const launchArgs = [
    OMNIROUTER,
    "launch",
    id,
    "--port",
    String(ctx.gw.port),
    "--yes",
    "--api-key",
    ctx.apiKey,
    "--model",
    model,
    "--tag",
    tag,
    "--",
    ...toolArgs,
  ];
  result.command = `node bin/omnirouter.mjs ${launchArgs
    .slice(1)
    .map((a) => (a === ctx.apiKey ? "<sk-key>" : /\s/.test(a) ? JSON.stringify(a) : a))
    .join(" ")}`;
  const mockFrom = ctx.mock ? ctx.mock.requests.length : 0;
  try {
    // The launcher probes health once with a 1.5 s timeout; a dev server can take longer on its
    // first hit after idle, which the launcher reports as PortInUse. Warm it first.
    await health(ctx.gw.url);
    let run;
    if (exp.mode === "pty") {
      const pp = exp.pty || {};
      const input = (pp.input ?? `${PROMPT}\r`).replace(PROMPT, `${marker} ${PROMPT}`);
      run = await runPty(process.execPath, launchArgs, {
        cwd: sb.work,
        env,
        waitMs: (pp.waitMs ?? 20000) + 10000,
        inputDelayMs: pp.inputDelayMs ?? 6000,
        input,
      });
    } else {
      run = await runProcess(process.execPath, launchArgs, {
        cwd: sb.work,
        env,
        stdin: exp.stdin || "ignore",
        timeoutMs: Math.max(exp.timeoutMs || 120000, 180000),
      });
    }
    Object.assign(result, {
      exitCode: run.code,
      signal: run.signal,
      timedOut: run.timedOut,
      ms: run.ms,
    });
    const clean = (t) => redactSecrets(String(t).replaceAll(ctx.apiKey, "<sk-key>"), ctx.secrets);
    writeFileSync(join(ctx.outDir, `${id}.${label}.stdout.log`), clean(run.stdout));
    writeFileSync(join(ctx.outDir, `${id}.${label}.stderr.log`), clean(run.stderr));
    result.stdoutTail = tail(clean(run.stdout));
    result.stderrTail = tail(clean(run.stderr));
    const summary = /omnirouter: \S+ session: .*/.exec(run.stderr + "\n" + run.stdout);
    result.exitSummary = summary ? summary[0].trim() : null;
    const upstream = ctx.mock
      ? ctx.mock.requests.slice(mockFrom).filter((r) => r.method === "POST")
      : [];
    result.upstreamRequests = upstream.map(
      (r) => `${r.path} model=${r.body?.model} stream=${r.body?.stream}`
    );
    const upstreamMarker = upstream.some((r) => JSON.stringify(r.body ?? "").includes(marker));

    // A real model's reply: the stdout, minus any echo of the prompt, says OK (or DONE).
    const visible = stripAnsi(run.stdout).replaceAll(PROMPT, "").replaceAll(marker, "");
    const replyPrinted = opt.real
      ? (opt.replyRe || /\b(OK|DONE)\b/i).test(visible)
      : run.stdout.includes("OMNI-SMOKE-OK");
    if (exp.mode !== "pty")
      check(
        checks,
        "exit 0",
        run.code === 0 && !run.timedOut,
        run.timedOut ? "timed out" : `exit ${run.code}`
      );
    check(
      checks,
      opt.real ? "tool printed the real model's reply" : "tool printed the reply (OMNI-SMOKE-OK)",
      replyPrinted,
      opt.real ? JSON.stringify(tail(visible, 3).slice(-160)) : undefined
    );
    if (!opt.real) {
      check(
        checks,
        "mock upstream got >= 1 completion via the gateway",
        upstream.length > 0,
        `${upstream.length}${upstream[0] ? ` (${result.upstreamRequests[0]})` : ""}`
      );
      check(checks, "mock upstream saw the prompt marker", upstreamMarker, marker);
    }
    if (opt.probeFile) {
      let content = null;
      try {
        content = readFileSync(join(sb.work, opt.probeFile), "utf8");
      } catch {
        /* missing */
      }
      result.probeFile =
        content === null ? "missing" : content.includes(marker) ? "has marker" : "no marker";
      check(
        checks,
        `tool use: ${opt.probeFile} created with the marker`,
        content !== null && content.includes(marker),
        result.probeFile
      );
    }
    const summaryCount = summary
      ? Number((/session: (\d+) requests/.exec(summary[0]) || [])[1] || 0)
      : null;
    check(
      checks,
      "exit summary printed with >= 1 request",
      summaryCount > 0,
      result.exitSummary || "no summary line"
    );

    // ---- gateway side. The launch session by tag: no HTTP list route exists, so the DB
    // (read-only) maps tag -> session id; everything else is read through the HTTP API.
    let session = null;
    let logIds = [];
    for (let i = 0; i < 20; i++) {
      session =
        dbAll(
          ctx,
          "select id, tool_id, session_tag, agent_session_id, revoked_at from launch_sessions where session_tag = ?",
          tag
        )[0] || null;
      logIds = dbAll(
        ctx,
        "select id from call_logs where session_tag = ? order by timestamp",
        tag
      ).map((r) => r.id);
      if (session && logIds.length) break;
      await sleep(500);
    }
    result.session = session;
    check(
      checks,
      "gateway: one launch session for this launch (tag -> session id)",
      session && session.tool_id === id,
      session ? `${session.id} tool_id=${session.tool_id}` : "none"
    );
    if (session) {
      check(
        checks,
        "gateway: launch session revoked after exit",
        Boolean(session.revoked_at),
        session.revoked_at || "not revoked"
      );
      const usage = await getJson(`${ctx.gw.url}/api/launch/sessions/${session.id}/usage`, {
        authorization: `Bearer ${ctx.apiKey}`,
      });
      result.usage = usage.json ?? usage.text.slice(0, 300);
      result.usageRequests = usage.json ? usage.json.requests : null;
      check(
        checks,
        "gateway: GET /api/launch/sessions/<id>/usage requests >= 1",
        usage.status === 200 && usage.json?.requests >= 1,
        `status ${usage.status}, requests ${usage.json?.requests}, sessionTag ${usage.json?.sessionTag}, toolId ${usage.json?.toolId}`
      );
      check(
        checks,
        "exit summary count equals the session usage count",
        summaryCount !== null && summaryCount === usage.json?.requests,
        `summary ${summaryCount}, usage ${usage.json?.requests}`
      );
      // agent_session_id can be linked after the first request; re-read after the usage call.
      session =
        dbAll(
          ctx,
          "select id, tool_id, session_tag, agent_session_id, revoked_at from launch_sessions where id = ?",
          session.id
        )[0] || session;
      result.session = session;
      if (session.agent_session_id) {
        const as = dbAll(
          ctx,
          "select id, client, client_session_id, request_count from agent_sessions where id = ?",
          session.agent_session_id
        )[0];
        result.agentSession = as || null;
        check(
          checks,
          "gateway: agent session client = tool id",
          as && as.client === id,
          as ? `${as.id} client=${as.client} requests=${as.request_count}` : "missing row"
        );
      } else {
        check(
          checks,
          "gateway: agent session client = tool id",
          false,
          "launch session has no agent_session_id"
        );
      }
    }
    // Call log records via GET /api/usage/call-logs/<id>; the detail (request body) is written
    // asynchronously, so poll for the marker.
    const records = [];
    for (const lid of logIds) {
      let rec = null;
      for (let i = 0; i < 10; i++) {
        const r = await getJson(`${ctx.gw.url}/api/usage/call-logs/${lid}`, ctx.auth.headers);
        rec = r.json;
        if (rec && JSON.stringify(rec.requestBody ?? "").includes(marker)) break;
        await sleep(1000);
      }
      if (rec) {
        records.push({
          id: lid,
          path: rec.path,
          status: rec.status,
          requestedModel: rec.requestedModel,
          model: rec.model,
          sessionTag: rec.sessionTag,
          clientSessionId: rec.clientSessionId,
          marker: JSON.stringify(rec.requestBody ?? "").includes(marker),
          detailState: rec.detailState,
        });
      }
    }
    result.callLogs = records;
    const withMarkerRec = records.find((r) => r.marker);
    result.surface =
      [
        ...new Set(records.map((r) => (String(r.path).startsWith("/v1beta") ? "/v1beta" : r.path))),
      ].join(", ") || null;
    check(
      checks,
      "gateway call log: >= 1 record tagged with the session tag",
      records.length > 0,
      records.map((r) => `${r.id} ${r.path} ${r.status}`).join(" | ") || "none"
    );
    check(
      checks,
      "gateway call log: prompt marker in a recorded request body",
      Boolean(withMarkerRec),
      withMarkerRec
        ? withMarkerRec.id
        : `${records.length} records, detailState ${[...new Set(records.map((r) => r.detailState))].join(",")}`
    );
    check(
      checks,
      `gateway call log: requested model ${model}`,
      records.some((r) => r.requestedModel === model),
      [...new Set(records.map((r) => r.requestedModel))].join(", ")
    );
    if (exp.protocols?.length) {
      const want = exp.protocols.map((k) =>
        k === "chat"
          ? "/v1/chat/completions"
          : k === "messages"
            ? "/v1/messages"
            : k === "responses"
              ? "/v1/responses"
              : "/v1beta"
      );
      check(
        checks,
        `gateway call log: API surface ${want.join("|")}`,
        records.some((r) => want.some((w) => String(r.path).startsWith(w))),
        result.surface || "none"
      );
    }
    result.addendumRow = {
      surface: result.surface,
      markerInGatewayLog: withMarkerRec ? `yes, ${withMarkerRec.id}` : "no",
      sessionTag: tag,
      upstreamSawMarker: opt.real ? "n/a (real provider)" : upstreamMarker ? "yes" : "no",
      replyPrinted: replyPrinted ? "yes" : "no",
      usageRequests: result.usageRequests ?? "missing",
    };

    await sleep(500);
    const leftTmp = launcherTempDirsLeft(sb.tmp);
    check(
      checks,
      "launcher temp dir removed",
      leftTmp.length === 0,
      leftTmp.join(", ") || "none left"
    );
    const procs = processesMentioning(sb.root);
    check(
      checks,
      "no leftover processes from the sandbox",
      procs.length === 0,
      procs.map((x) => `${x.pid} ${x.cmd}`).join(" | ") || "none"
    );
    killAll(procs);
    check(checks, "our gateway still running after the launch", (await health(ctx.gw.url)) === 200);
  } catch (err) {
    check(
      checks,
      "harness",
      false,
      err && err.stack ? err.stack.split("\n").slice(0, 3).join(" ") : String(err)
    );
  }
  result.pass = checks.every((c) => c.ok);
  result.failed = checks
    .filter((c) => !c.ok)
    .map((c) => `${c.name}${c.detail ? `: ${c.detail}` : ""}`);
  return result;
}

/** Launch with no gateway on the port: the launcher must auto-start one on 127.0.0.1 and stop it ~10 s after exit. */
async function lifecycleDown(p, ctx) {
  const checks = [];
  const sb = makeSandbox(ctx.sandboxParent, `b-down-${p.id}`);
  const port = await freePort();
  const env = launcherEnv(sb, p.exp.env || {});
  const args = [
    OMNIROUTER,
    "launch",
    p.id,
    "--port",
    String(port),
    "--yes",
    "--model",
    ctx.model,
    "--",
    ...p.exp.args,
  ];
  const out = {
    command: `node bin/omnirouter.mjs ${args
      .slice(1)
      .map((a) => (/\s/.test(a) ? JSON.stringify(a) : a))
      .join(" ")}`,
    port,
    checks,
  };
  check(
    checks,
    `port ${port} free before the launch`,
    (await health(`http://127.0.0.1:${port}`)) === 0
  );
  let sawListen = null;
  const watcher = (async () => {
    const until = Date.now() + 600000;
    while (!sawListen && Date.now() < until && !out.done) {
      const l = listenersOn(port);
      if (l.length) sawListen = l;
      await sleep(500);
    }
  })();
  const run = await runProcess(process.execPath, args, {
    cwd: sb.work,
    env,
    stdin: p.exp.stdin || "ignore",
    timeoutMs: 600000,
  });
  const exitedAt = Date.now();
  out.done = true;
  await watcher;
  Object.assign(out, {
    exitCode: run.code,
    ms: run.ms,
    stderrTail: tail(run.stderr),
    stdoutTail: tail(run.stdout, 5),
  });
  writeFileSync(join(ctx.outDir, `lifecycle-down.${p.id}.stderr.log`), run.stderr);
  writeFileSync(join(ctx.outDir, `lifecycle-down.${p.id}.stdout.log`), run.stdout);
  check(checks, "launch with gateway down exits 0", run.code === 0, `exit ${run.code}`);
  check(
    checks,
    "auto-started gateway listened on 127.0.0.1 only",
    sawListen && sawListen.every((a) => a.startsWith("127.0.0.1:")),
    sawListen ? sawListen.join(", ") : "never listened"
  );
  let stoppedAfter = null;
  for (let i = 0; i < 60; i++) {
    if (listenersOn(port).length === 0 && (await health(`http://127.0.0.1:${port}`)) === 0) {
      stoppedAfter = Date.now() - exitedAt;
      break;
    }
    await sleep(500);
  }
  check(
    checks,
    "auto-started gateway stopped about 10 s after the tool exited (5 to 25 s)",
    stoppedAfter !== null && (!sawListen || (stoppedAfter >= 5000 && stoppedAfter <= 25000)),
    stoppedAfter === null
      ? "still up after 30 s"
      : `${stoppedAfter} ms${sawListen ? "" : " (it never started)"}`
  );
  const procs = processesMentioning(sb.root);
  check(
    checks,
    "no leftover processes from the sandbox",
    procs.length === 0,
    procs.map((x) => `${x.pid} ${x.cmd}`).join(" | ") || "none"
  );
  killAll(procs);
  return out;
}

/**
 * @param {Array<{id, exp, info, row, skip}>} plan
 * @param {{ outDir, sandboxParent, requirePhaseA }} opts
 */
export async function runPhaseB(plan, opts) {
  const out = { lifecycle: { checks: [] } };
  const gwRoot = makeSandbox(opts.sandboxParent, "b-gateway");
  let mock;
  let gw;
  try {
    mock = await startMockUpstream();
    process.stderr.write(
      `[smoke B] mock upstream ${mock.url}; starting gateway (dev server, first compile is slow) ...\n`
    );
    gw = await startGateway({
      dataDir: gwRoot.data,
      logFile: join(opts.outDir, "gateway.server.log"),
      env: { HOME: gwRoot.home, ENABLE_REQUEST_LOGS: "1" },
    });
    process.stderr.write(`[smoke B] gateway ${gw.url} healthy after ${gw.healthyMs} ms\n`);
    const listen = listenersOn(gw.port);
    const auth = await gatewayLogin({ gatewayUrl: gw.url });
    const apiKey = await createApiKey({ gatewayUrl: gw.url, auth });
    auth.apiKey = apiKey;
    const reg = await registerUpstream({
      gatewayUrl: gw.url,
      upstreamUrl: mock.url.endsWith("/v1") ? mock.url : `${mock.url}/v1`,
      models: mock.models || ["smoke-large-1", "smoke-large-2", "smoke-large-3"],
      auth,
    });
    const model =
      reg.modelIds.find((m) => m.endsWith("smoke-large-1")) || reg.modelIds[MODEL_INDEX];
    out.gateway = { url: gw.url, healthyMs: gw.healthyMs, listen, registered: reg, model };
    if (!model)
      throw new Error(`upstream models not listed by the gateway: ${JSON.stringify(reg)}`);
    const warm = await warmUp(gw.url, apiKey, model);
    out.gateway.warmUp = warm;
    process.stderr.write(
      `[smoke B] registered ${reg.modelIds.join(", ")}; warm-up ${JSON.stringify(warm)}\n`
    );
    const ctx = { ...opts, gw, mock, auth, apiKey, model, gwDataDir: gwRoot.data };

    for (const p of plan) {
      if (p.skip) {
        p.row.B = { skipped: p.skip };
        continue;
      }
      if (!p.row.A || !p.row.A.pass) {
        p.row.B = { skipped: "did not pass phase A" };
        continue;
      }
      process.stderr.write(`[smoke B] ${p.id} ...\n`);
      p.row.B = await runTool(p, ctx);
      process.stderr.write(
        `[smoke B] ${p.id}: ${p.row.B.pass ? "PASS" : `FAIL (${p.row.B.failed.join("; ").slice(0, 300)})`}\n`
      );
    }

    // Lifecycle: our gateway survives the grace window after the last launch.
    await sleep(12000);
    check(
      out.lifecycle.checks,
      "a gateway we started first is never stopped by the launcher (healthy 12 s after the last launch)",
      (await health(gw.url)) === 200
    );
    check(
      out.lifecycle.checks,
      "our gateway bound 127.0.0.1 only",
      listen.length > 0 && listen.every((a) => a.startsWith("127.0.0.1:")),
      listen.join(", ")
    );

    const lifeTool =
      plan.find((x) => x.id === "claude" && !x.skip) ||
      plan.find((x) => !x.skip && x.exp.mode !== "pty");
    if (lifeTool) {
      process.stderr.write(`[smoke B] lifecycle: ${lifeTool.id} with the gateway down ...\n`);
      const down = await lifecycleDown(lifeTool, ctx);
      out.lifecycle.down = down;
      for (const c of down.checks)
        out.lifecycle.checks.push({ ...c, name: `gateway down (${lifeTool.id}): ${c.name}` });
    }
  } catch (err) {
    out.error = err && err.message ? err.message : String(err);
    process.stderr.write(`[smoke B] error: ${out.error}\n`);
  } finally {
    if (gw) await gw.stop();
    if (mock) await mock.close();
    killAll(processesMentioning(gwRoot.root));
  }
  return out;
}
