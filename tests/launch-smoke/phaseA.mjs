// Phase A: every installed tool against the smoke stub gateway (tests/launch-smoke/smokeStub.mjs).
// One fresh sandbox root and one fresh stub per tool. Requires the tsx loader (run.mjs sets it).

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  OMNIROUTER,
  TOKEN_RE,
  attributeChanges,
  diffSnapshots,
  killAll,
  launcherEnv,
  launcherTempDirsLeft,
  makeSandbox,
  processesMentioning,
  redactSecrets,
  runProcess,
  runPty,
  sleep,
  snapshotHome,
  tail,
} from "./lib.mjs";

/** Real HOME paths every run snapshots on top of the tool's own (the launcher's default DATA_DIR). */
const COMMON_REAL_HOME = [".omniroute"];

function check(list, name, ok, detail) {
  list.push({ name, ok: Boolean(ok), detail: detail === undefined ? undefined : String(detail) });
}

function sinceIndex(stub, from) {
  return stub.requests.slice(from);
}

function summarizeRequests(reqs) {
  return reqs.map((r) => ({
    method: r.method,
    path: r.path,
    status: r.status,
    cred: r.cred ? r.cred.header : null,
    token: r.auth ? `${String(r.auth).slice(0, 4)}...` : null,
    model: r.model,
    stream: r.body && typeof r.body === "object" ? r.body.stream : undefined,
  }));
}

/**
 * @param {object} exp tool expectation (tools/<id>.mjs)
 * @param {object} info tools.json entry
 * @param {{ outDir: string, sandboxParent: string, startSmokeStub: Function, dryRun: boolean }} opts
 */
export async function runPhaseA(exp, info, opts) {
  const { outDir, sandboxParent, startSmokeStub } = opts;
  const id = exp.id;
  const sb = makeSandbox(sandboxParent, `a-${id}`);
  const stub = await startSmokeStub();
  const checks = [];
  const result = {
    tool: id,
    version: info.version,
    mode: exp.mode,
    model: exp.model,
    sandbox: sb.root,
    checks,
    knownIssue: exp.knownIssue,
  };
  const realHomePaths = [...new Set([...(exp.realHome || []), ...COMMON_REAL_HOME])];
  const before = snapshotHome(realHomePaths);
  const env = launcherEnv(sb, exp.env || {});
  const launchArgs = [
    OMNIROUTER,
    "launch",
    id,
    "--base-url",
    stub.url,
    "--yes",
    "--model",
    exp.model,
    "--",
    ...exp.args,
  ];
  result.command = `node bin/omnirouter.mjs ${launchArgs
    .slice(1)
    .map((a) => (/\s/.test(a) ? JSON.stringify(a) : a))
    .join(" ")}`;

  try {
    // ---- the launch
    let run;
    if (exp.mode === "pty") {
      const p = exp.pty || {};
      run = await runPty(process.execPath, launchArgs, {
        cwd: sb.work,
        env,
        waitMs: p.waitMs ?? 20000,
        inputDelayMs: p.inputDelayMs ?? 6000,
        input: p.input === undefined ? `${"reply with OK"}\r` : p.input,
      });
    } else {
      run = await runProcess(process.execPath, launchArgs, {
        cwd: sb.work,
        env,
        stdin: exp.stdin || "ignore",
        timeoutMs: exp.timeoutMs || 120000,
      });
    }
    result.exitCode = run.code;
    result.signal = run.signal;
    result.timedOut = run.timedOut;
    result.ms = run.ms;
    if (run.steps) result.ptySteps = run.steps;
    writeFileSync(join(outDir, `${id}.A.stdout.log`), redactSecrets(run.stdout));
    writeFileSync(join(outDir, `${id}.A.stderr.log`), redactSecrets(run.stderr));
    result.stdoutTail = tail(redactSecrets(run.stdout));
    result.stderrTail = tail(redactSecrets(run.stderr));
    const summaryLine = /omnirouter: \S+ session: .*/.exec(run.stderr + "\n" + run.stdout);
    result.exitSummary = summaryLine ? summaryLine[0].trim() : null;

    const launchReqs = [...stub.requests];
    result.requests = summarizeRequests(launchReqs);
    const inference = stub.inference;
    const tokens = new Set([...stub.inner.sessions.values()].map((s) => s.token));
    const withToken = inference.filter((r) => r.auth && tokens.has(r.auth));
    const keyHeaders = exp.keyHeaders || ["authorization"];
    const withHeader = withToken.filter((r) => keyHeaders.includes(r.cred.header));
    const withModel = withHeader.filter((r) => r.model === exp.model);
    const mint = launchReqs.find((r) => r.method === "POST" && r.path === "/api/launch/sessions");
    const revoke = launchReqs.find(
      (r) => r.method === "DELETE" && /^\/api\/launch\/sessions\/[^/]+$/.test(r.path)
    );

    if (exp.mode === "pty") {
      check(
        checks,
        "launcher exited after Ctrl-C (no SIGTERM needed)",
        !run.steps.some((s) => s.includes("SIGTERM")),
        run.steps.join("; ")
      );
    } else {
      check(
        checks,
        "exit 0",
        run.code === 0 && !run.timedOut,
        run.timedOut ? "timed out" : `exit ${run.code}${run.signal ? ` signal ${run.signal}` : ""}`
      );
      const want = exp.expectStdout === undefined ? "OMNI-SMOKE-OK" : exp.expectStdout;
      if (want) check(checks, `stdout contains ${want}`, run.stdout.includes(want));
    }
    check(
      checks,
      "mint (POST /api/launch/sessions)",
      mint && mint.status === 201,
      mint ? `status ${mint.status}` : "no mint request"
    );
    check(
      checks,
      ">= 1 inference request",
      inference.length > 0,
      `${inference.length} (${[...new Set(inference.map((r) => r.path))].join(", ") || "none"})`
    );
    check(
      checks,
      "inference carries the minted olx_ token",
      withToken.length > 0,
      inference.length
        ? `creds seen: ${[...new Set(inference.map((r) => (r.cred ? `${r.cred.header}=${String(r.cred.value).slice(0, 6)}...` : "none")))].join(", ")}`
        : undefined
    );
    check(
      checks,
      `token in an accepted header (${keyHeaders.join("|")})`,
      withHeader.length > 0,
      withToken.length ? [...new Set(withToken.map((r) => r.cred.header))].join(", ") : undefined
    );
    check(
      checks,
      `chosen model ${exp.model}`,
      withModel.length > 0,
      inference.length
        ? `models seen: ${[...new Set(inference.map((r) => r.model))].join(", ")}`
        : undefined
    );
    if (exp.protocols && exp.protocols.length) {
      const kinds = [...new Set(withToken.map((r) => r.kind))];
      check(
        checks,
        `protocol ${exp.protocols.join("|")}`,
        kinds.some((k) => exp.protocols.includes(k)),
        kinds.join(", ") || "none"
      );
    }
    check(
      checks,
      "revoke (DELETE /api/launch/sessions/<id>)",
      revoke && revoke.status === 200,
      revoke ? `status ${revoke.status}` : "no DELETE"
    );
    if (exp.mode !== "pty")
      check(
        checks,
        "exit summary printed",
        Boolean(result.exitSummary),
        result.exitSummary || "none"
      );
    const teardownWarn = /teardown step \S+ failed[^\n]*/.exec(run.stderr);
    check(
      checks,
      "teardown ran without failure",
      !teardownWarn,
      teardownWarn ? teardownWarn[0] : "ok"
    );

    // ---- post-exit: temp dir, processes, real HOME
    await sleep(1500);
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
      procs.map((p) => `${p.pid} ${p.cmd}`).join(" | ") || "none"
    );
    killAll(procs);
    const after = snapshotHome(realHomePaths);
    const markers = [
      sb.root,
      stub.url,
      `127.0.0.1:${stub.port}`,
      `127.0.0.1:${stub.inner.port}`,
      ...tokens,
    ];
    const { ours, other } = attributeChanges(diffSnapshots(before, after), markers);
    check(
      checks,
      "real HOME unchanged by the launch",
      ours.length === 0,
      ours
        .map(
          (c) =>
            `${c.change} ${c.path} (contains ${c.marker === sb.root ? "sandbox root" : c.marker.startsWith("olx_") ? "minted token" : c.marker})`
        )
        .join(" | ") || `ok (${realHomePaths.join(", ")})`
    );
    if (other.length)
      result.unrelatedHomeChanges = other.slice(0, 20).map((c) => `${c.change} ${c.path}`);

    // ---- pty tools: record what the tools.json one-shot does through `--` (informational)
    if (exp.mode === "pty" && Array.isArray(exp.headlessProbe)) {
      const from = stub.requests.length;
      const probeArgs = [
        ...launchArgs.slice(0, launchArgs.indexOf("--") + 1),
        ...exp.headlessProbe,
      ];
      const probe = await runProcess(process.execPath, probeArgs, {
        cwd: sb.work,
        env,
        stdin: "ignore",
        timeoutMs: 60000,
      });
      const reqs = sinceIndex(stub, from);
      result.headlessProbe = {
        command: `node bin/omnirouter.mjs ${probeArgs
          .slice(1)
          .map((a) => (/\s/.test(a) ? JSON.stringify(a) : a))
          .join(" ")}`,
        exitCode: probe.code,
        timedOut: probe.timedOut,
        inference: reqs.filter((r) => r.kind && r.method === "POST").length,
        stdoutHasReply: probe.stdout.includes("OMNI-SMOKE-OK"),
        stderrTail: tail(probe.stderr, 10),
        stdoutTail: tail(probe.stdout, 10),
      };
      killAll(processesMentioning(sb.root));
    }

    // ---- dry run
    if (opts.dryRun) {
      const from = stub.requests.length;
      const dryArgs = [
        ...launchArgs.slice(0, launchArgs.indexOf("--")),
        "--dry-run",
        "--json",
        ...launchArgs.slice(launchArgs.indexOf("--")),
      ];
      const dry = await runProcess(process.execPath, dryArgs, {
        cwd: sb.work,
        env,
        stdin: "ignore",
        timeoutMs: 60000,
      });
      writeFileSync(
        join(outDir, `${id}.A.dryrun.json`),
        dry.stdout + (dry.stderr ? `\n/* stderr:\n${dry.stderr}\n*/\n` : "")
      );
      let parsed = null;
      try {
        parsed = JSON.parse(dry.stdout);
      } catch {
        /* not json */
      }
      const allTokens = [...stub.inner.sessions.values()].map((s) => s.token);
      const text = dry.stdout + dry.stderr;
      const leaked = allTokens.filter((t) => text.includes(t));
      const dryReqs = sinceIndex(stub, from);
      const dryMint = dryReqs.filter(
        (r) => r.method === "POST" && r.path === "/api/launch/sessions" && r.status === 201
      ).length;
      const dryRevoke = dryReqs.filter((r) => r.method === "DELETE").length;
      result.dryRun = {
        exitCode: dry.code,
        minted: dryMint,
        revoked: dryRevoke,
        stderrTail: tail(dry.stderr, 8),
      };
      check(
        checks,
        "dry-run --json exit 0 + valid JSON",
        dry.code === 0 && parsed !== null,
        `exit ${dry.code}${parsed ? "" : ", not JSON"}`
      );
      check(
        checks,
        "dry-run output has no secret",
        leaked.length === 0 && !TOKEN_RE.test(text),
        leaked.length
          ? "minted token printed"
          : TOKEN_RE.test(text)
            ? "token-shaped text printed"
            : "ok"
      );
      check(
        checks,
        "dry-run revokes what it mints",
        dryMint <= dryRevoke,
        `minted ${dryMint}, revoked ${dryRevoke}`
      );
      check(
        checks,
        "dry-run sends no inference",
        !dryReqs.some((r) => r.kind && r.method === "POST"),
        "ok"
      );
    }
  } catch (err) {
    check(
      checks,
      "harness",
      false,
      err && err.stack ? err.stack.split("\n").slice(0, 3).join(" ") : String(err)
    );
  } finally {
    await stub.close();
  }
  result.pass = checks.every((c) => c.ok);
  result.failed = checks
    .filter((c) => !c.ok)
    .map((c) => `${c.name}${c.detail ? `: ${c.detail}` : ""}`);
  return result;
}
