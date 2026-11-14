#!/usr/bin/env node
// Live smoke for `omnirouter launch <tool>` (architecture section 16.2 steps 3 to 5). Advisory,
// never part of the default unit run.
//
//   npm run test:launch:smoke                        phase A (stub gateway), every installed tool
//   node tests/launch-smoke/run.mjs --phase b        phase B (real gateway + mock upstream)
//   node tests/launch-smoke/run.mjs --phase all --only claude,codex --out <dir> --no-dry-run
//   node tests/launch-smoke/run.mjs --phase c        phase C (real gateway + REAL provider models;
//                                                    needs $OLAUNCH_SECRETS provider exports)
//   --phase takes a, b, c, all (= a,b) or a comma list such as a,b,c
//
// Tools come from $OLAUNCH_SANDBOX/tools.json (status installed|global) intersected with the
// expectation files in tests/launch-smoke/tools/<id>.mjs. Tools without an expectation file or
// not installed are reported as skipped, never passed. Results: <out>/results.json and
// <out>/results.md (default /home/krrish/tmp/olaunch/smoke). Exit 1 when any run failed.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { DEFAULT_OUT, WORKTREE, readToolsJson } from "./lib.mjs";

// The helper stub imports .ts schemas.
await import("tsx/esm");

const TOOLS_DIR = join(WORKTREE, "tests", "launch-smoke", "tools");

function parseArgs(argv) {
  const opts = { phase: "a", only: null, out: DEFAULT_OUT, dryRun: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--phase") opts.phase = String(argv[++i]).toLowerCase();
    else if (a === "--only") opts.only = String(argv[++i]).split(",").filter(Boolean);
    else if (a === "--out") opts.out = argv[++i];
    else if (a === "--no-dry-run") opts.dryRun = false;
    else if (a === "--secrets") opts.secretsDir = argv[++i];
    else if (a === "--c-model") opts.cModel = argv[++i];
    else if (a === "--help" || a === "-h") {
      process.stdout.write(
        readFileSync(new URL(import.meta.url), "utf8")
          .split("\n")
          .slice(1, 12)
          .join("\n") + "\n"
      );
      process.exit(0);
    } else throw new Error(`unknown argument ${a}`);
  }
  const phases = opts.phase === "all" ? ["a", "b"] : opts.phase.split(",");
  if (!phases.every((x) => ["a", "b", "c"].includes(x)))
    throw new Error("--phase must be a, b, c, all or a comma list");
  opts.phases = phases;
  return opts;
}

async function loadExpectations() {
  const out = new Map();
  for (const f of readdirSync(TOOLS_DIR)
    .filter((n) => n.endsWith(".mjs"))
    .sort()) {
    const mod = await import(pathToFileURL(join(TOOLS_DIR, f)).href);
    out.set(mod.default.id, mod.default);
  }
  return out;
}

function oneLine(r) {
  if (!r) return "";
  if (r.skipped) return r.skipped;
  const probe =
    r.headlessProbe && !r.headlessProbe.stdoutHasReply
      ? `headless one-shot via -- fails (exit ${r.headlessProbe.exitCode}${r.headlessProbe.timedOut ? ", timed out" : ""})`
      : "";
  const vf = r.viewFilter
    ? `launch view (${r.viewFilter.viewSize} models) filtered ${r.viewFilter.model}${r.viewFilter.rerunModel ? `, reran with ${r.viewFilter.rerunModel}` : ", no rerun"}`
    : "";
  if (r.pass) return [probe, vf].filter(Boolean).join("; ");
  return [(r.failed && r.failed[0]) || "failed", probe, vf].filter(Boolean).join("; ");
}

function cell(r) {
  if (!r) return "not run";
  if (r.skipped) return "skipped";
  return r.pass ? "PASS" : "FAIL";
}

function renderMarkdown(results) {
  const lines = ["# omnirouter launch smoke results", "", `Generated: ${results.generatedAt}`, ""];
  lines.push(
    "| tool | version | phase A | phase B | phase C | real model id | error (one line) |",
    "| --- | --- | --- | --- | --- | --- | --- |"
  );
  for (const row of results.tools) {
    const err = [
      oneLine(row.A) && `A: ${oneLine(row.A)}`,
      oneLine(row.B) && `B: ${oneLine(row.B)}`,
      oneLine(row.C) && `C: ${oneLine(row.C)}`,
    ]
      .filter(Boolean)
      .join("; ");
    lines.push(
      `| ${row.tool} | ${row.version || ""} | ${cell(row.A)} | ${cell(row.B)} | ${cell(row.C)} | ${row.C?.realModel || ""} | ${err.replaceAll("|", "\\|").slice(0, 260)} |`
    );
  }
  for (const ph of ["B", "C"]) {
    const rows = results.tools.filter((r) => r[ph] && r[ph].addendumRow);
    if (!rows.length) continue;
    lines.push(
      "",
      `## Phase ${ph}: gateway-side proof per tool`,
      "",
      "| tool | surface | marker seen in gateway log (yes/no, record id) | session tag | upstream saw marker | reply printed | usage requests |",
      "| --- | --- | --- | --- | --- | --- | --- |"
    );
    for (const r of rows) {
      const a = r[ph].addendumRow;
      lines.push(
        `| ${r.tool} | ${a.surface || "none"} | ${a.markerInGatewayLog} | ${a.sessionTag} | ${a.upstreamSawMarker} | ${a.replyPrinted} | ${a.usageRequests} |`
      );
      if (ph === "C" && r.C.toolUse)
        lines.push(
          `| ${r.tool} (tool use) | | | ${r.C.toolUse.tag} | | probe.txt ${r.C.toolUse.probeFile} | ${r.C.toolUse.usageRequests ?? "missing"} |`
        );
    }
  }
  if (results.phaseC) {
    const c = results.phaseC;
    lines.push("", "## Phase C gateway", "");
    for (const x of c.connections || [])
      lines.push(`- provider ${x.provider} (${x.name}): providers test ${x.test}`);
    if (c.models)
      for (const v of Object.values(c.models))
        lines.push(
          `- model: ${v.id} (${v.chosenBy}, provider ${v.provider}, context ${v.context}, tool_calling ${v.toolCalling}, USD/1M in ${v.usdPer1M?.input} out ${v.usdPer1M?.output})`
        );
    if (c.cheapest)
      lines.push(
        `- cheapest eligible: ${c.cheapest.map((x) => `${x.id} (${x.usdPer1M.input}/${x.usdPer1M.output})`).join(", ")}`
      );
    for (const x of c.checks || [])
      lines.push(`- ${x.ok ? "ok" : "FAIL"}: ${x.name}${x.detail ? ` (${x.detail})` : ""}`);
    if (c.error) lines.push(`- error: ${c.error}`);
  }
  if (results.phaseB && results.phaseB.lifecycle) {
    lines.push("", "## Phase B gateway lifecycle", "");
    for (const c of results.phaseB.lifecycle.checks || [])
      lines.push(`- ${c.ok ? "ok" : "FAIL"}: ${c.name}${c.detail ? ` (${c.detail})` : ""}`);
  }
  if (results.phaseB && results.phaseB.error)
    lines.push("", `Phase B error: ${results.phaseB.error}`);
  lines.push("", "## Details", "");
  for (const row of results.tools) {
    for (const ph of ["A", "B", "C"]) {
      const r = row[ph];
      if (!r || r.skipped) continue;
      lines.push(
        `### ${row.tool} phase ${ph}: ${r.pass ? "PASS" : "FAIL"}`,
        "",
        "```",
        r.command || "",
        `exit ${r.exitCode}${r.signal ? ` signal ${r.signal}` : ""}${r.timedOut ? " (timed out)" : ""}, ${r.ms} ms`,
        "```"
      );
      for (const c of r.checks)
        lines.push(`- ${c.ok ? "ok" : "FAIL"}: ${c.name}${c.detail ? ` (${c.detail})` : ""}`);
      if (r.knownIssue) lines.push(`- known issue: ${r.knownIssue}`);
      if (r.exitSummary) lines.push(`- exit summary: ${r.exitSummary}`);
      if (r.headlessProbe) {
        const hp = r.headlessProbe;
        lines.push(
          `- headless probe: \`${hp.command}\` -> exit ${hp.exitCode}${hp.timedOut ? " (timed out)" : ""}, ${hp.inference} inference requests`,
          "",
          "```",
          hp.stderrTail || hp.stdoutTail || "",
          "```"
        );
      }
      if (!r.pass) {
        lines.push(
          "",
          "stderr tail:",
          "```",
          r.stderrTail || "",
          "```",
          "stdout tail:",
          "```",
          r.stdoutTail || "",
          "```"
        );
      }
      lines.push("");
    }
  }
  return lines.join("\n") + "\n";
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  mkdirSync(opts.out, { recursive: true });
  const logsDir = join(opts.out, "logs");
  mkdirSync(logsDir, { recursive: true });
  const sandboxParent = join(opts.out, "sandboxes");
  const toolsJson = readToolsJson();
  const expectations = await loadExpectations();
  const ids = [...new Set([...Object.keys(toolsJson), ...expectations.keys()])].filter(
    (id) => !opts.only || opts.only.includes(id)
  );

  const resultsFile = join(opts.out, "results.json");
  const previous = existsSync(resultsFile) ? JSON.parse(readFileSync(resultsFile, "utf8")) : null;
  const rows = new Map((previous?.tools || []).map((r) => [r.tool, r]));

  const { startSmokeStub } = await import("./smokeStub.mjs");
  const runA = opts.phases.includes("a");
  const runB = opts.phases.includes("b");
  const runC = opts.phases.includes("c");

  const plan = [];
  for (const id of ids) {
    const info = toolsJson[id] || {};
    const exp = expectations.get(id);
    const row = rows.get(id) || { tool: id };
    row.version = info.version || row.version;
    rows.set(id, row);
    let skip = null;
    if (!["installed", "global"].includes(info.status))
      skip = `not installed (${info.status || "absent from tools.json"})`;
    else if (!exp) skip = "no expectation file";
    plan.push({ id, info, exp, row, skip });
  }

  if (runA) {
    for (const p of plan) {
      if (p.skip) {
        p.row.A = { skipped: p.skip };
        continue;
      }
      process.stderr.write(`[smoke A] ${p.id} ...\n`);
      p.row.A = await (
        await import("./phaseA.mjs")
      ).runPhaseA(p.exp, p.info, {
        outDir: logsDir,
        sandboxParent,
        startSmokeStub,
        dryRun: opts.dryRun,
      });
      process.stderr.write(
        `[smoke A] ${p.id}: ${p.row.A.pass ? "PASS" : `FAIL (${p.row.A.failed.join("; ").slice(0, 300)})`}\n`
      );
    }
  }

  let phaseB = previous?.phaseB;
  let phaseC = previous?.phaseC;
  // Saved after every phase, so a crash in a later phase keeps the earlier results.
  const save = () => {
    const results = {
      generatedAt: new Date().toISOString(),
      tools: [...rows.values()].sort((a, b) => a.tool.localeCompare(b.tool)),
      phaseB: phaseB
        ? { lifecycle: phaseB.lifecycle, error: phaseB.error, gateway: phaseB.gateway }
        : undefined,
      phaseC: phaseC || undefined,
    };
    writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    writeFileSync(join(opts.out, "results.md"), renderMarkdown(results));
    return results;
  };
  if (runA) save();
  if (runB) {
    const { runPhaseB } = await import("./phaseB.mjs");
    phaseB = await runPhaseB(plan, {
      outDir: logsDir,
      sandboxParent,
      requirePhaseA: opts.phase === "all",
    });
    save();
  }

  if (runC) {
    const { runPhaseC } = await import("./phaseC.mjs");
    phaseC = await runPhaseC(plan, {
      outDir: logsDir,
      sandboxParent,
      secretsDir: opts.secretsDir,
      model: opts.cModel,
    });
  }

  save();

  const ran = plan.filter((p) => !p.skip);
  const failedA = runA ? ran.filter((p) => !p.row.A?.pass).map((p) => p.id) : [];
  const failedB = runB
    ? ran.filter((p) => p.row.B && !p.row.B.skipped && !p.row.B.pass).map((p) => p.id)
    : [];
  const failedC = runC
    ? ran.filter((p) => p.row.C && !p.row.C.skipped && !p.row.C.pass).map((p) => p.id)
    : [];
  process.stdout.write(`\nresults: ${join(opts.out, "results.md")}\n`);
  for (const p of plan)
    process.stdout.write(
      `${p.id.padEnd(10)} A=${cell(p.row.A).padEnd(8)} B=${cell(p.row.B).padEnd(8)} C=${cell(p.row.C).padEnd(8)} ${[oneLine(p.row.A), oneLine(p.row.B), oneLine(p.row.C)].filter(Boolean).join(" / ").slice(0, 160)}\n`
    );
  if (runA)
    process.stdout.write(
      `phase A: ${ran.length - failedA.length}/${ran.length} passed, ${plan.length - ran.length} skipped\n`
    );
  if (runB)
    process.stdout.write(
      `phase B: ${failedB.length} failed${phaseB?.error ? `, error: ${phaseB.error}` : ""}\n`
    );
  if (runC)
    process.stdout.write(
      `phase C: ${failedC.length} failed${phaseC?.error ? `, error: ${phaseC.error}` : ""}; gateway DATA_DIR deleted: ${phaseC?.dataDirDeleted}\n`
    );
  process.exitCode =
    failedA.length ||
    failedB.length ||
    failedC.length ||
    (runB && phaseB?.error) ||
    (runC && phaseC?.error)
      ? 1
      : 0;
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : err}\n`);
  process.exitCode = 2;
});
