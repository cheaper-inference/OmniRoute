import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getEncoding } from "js-tiktoken";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { detectCommandType } from "../../../open-sse/services/compression/engines/rtk/commandDetector.ts";
import {
  deduplicateRepeatedLines,
  identicalRunLength,
} from "../../../open-sse/services/compression/engines/rtk/deduplicator.ts";
import { renderRepeatedLogs } from "../../../open-sse/services/compression/engines/rtk/renderers/repeatedLogs.ts";
import { STRUCTURAL_ANALYSIS_BUDGET } from "../../../open-sse/services/compression/engines/rtk/renderers/structural.ts";

const FIXTURES = path.join(import.meta.dirname, "fixtures", "rtk", "structural");
const LOGS = fs.readFileSync(path.join(FIXTURES, "docker-logs-repeated.log"), "utf8");

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };
const TECHNIQUE = "rtk-render:repeated-logs";
const COMMAND = "docker logs api";

type RunOptions = { flag?: boolean; config?: Record<string, unknown> };

function chatBody(output: string, command: string | null) {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "show me the logs" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: "bash",
              arguments: JSON.stringify(command === null ? {} : { command }),
            },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: output },
    ],
  };
}

function run(text: string, command: string | null = COMMAND, options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command), {
    config: { ...ON, ...(options.config ?? {}) },
    rtkStructuralRenderersEnabled: options.flag ?? true,
  });
  const messages = (res.body as { messages: Array<{ content: string }> }).messages;
  return { text: messages[2].content, techniques: res.stats?.techniquesUsed ?? [] };
}

function render(text: string) {
  return renderRepeatedLogs(text, detectCommandType(text, COMMAND));
}

const isRoutine = (line: string) => /^(?:INFO|DEBUG)\b/.test(line);
const isMarker = (line: string) => /^\[\d+ repetições omitidas\]$/.test(line);
/** Everything that is not a routine record, a marker or the compose header, in order. */
const diagnosticsOf = (text: string) =>
  text
    .split("\n")
    .filter((line) => line && !isRoutine(line) && !isMarker(line) && !line.startsWith("Attaching"));

describe("structural repeated logs", () => {
  it("logs contam repetições de rotina e mantêm diagnósticos em ordem", () => {
    const out = run(LOGS);
    assert.ok(out.techniques.includes(TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(LOGS));
    // two separate bursts of the same health check stay two bursts, each with its own count
    assert.ok(out.text.includes("[19 repetições omitidas]"), out.text);
    assert.ok(out.text.includes("[11 repetições omitidas]"), out.text);
    assert.ok(out.text.includes("[4 repetições omitidas]"), out.text);
    assert.equal(out.text.split("\n").filter(isMarker).length, 3);
    // diagnostics, results and stack continuation survive in order, repeats included
    assert.deepEqual(diagnosticsOf(out.text), diagnosticsOf(LOGS));
    assert.equal(out.text.split("ERROR [db] connection refused: db:5432").length - 1, 2);
    assert.equal(out.text.split("    at run (/app/worker.js:10:5)").length - 1, 2);
    // the first line of every collapsed burst is kept right before its marker
    assert.ok(
      out.text.includes("INFO  [http] GET /healthz 200 1ms\n[19 repetições omitidas]\nERROR [db]")
    );
    assert.ok(out.text.includes("INFO  [jobs] job 43 finished ok\n".repeat(3)));
    assert.equal(out.text.split("INFO  [net] retrying upstream after timeout").length - 1, 5);
  });

  it("a second pass over the summary leaves it as it is", () => {
    const once = run(LOGS).text;
    const twice = run(once);
    assert.equal(twice.text, once);
    assert.ok(!twice.techniques.includes(TECHNIQUE));
  });

  it("collapses with an exact layout on a small input", () => {
    const input = [
      "INFO a",
      "INFO a",
      "INFO a",
      "ERROR b",
      "ERROR b",
      "INFO a",
      "INFO a",
      "INFO a",
    ];
    const out = render(input.join("\n"));
    assert.equal(out.changed, true);
    assert.equal(out.renderer, "repeated-logs");
    assert.equal(
      out.text,
      [
        "INFO a",
        "[2 repetições omitidas]",
        "ERROR b",
        "ERROR b",
        "INFO a",
        "[2 repetições omitidas]",
      ].join("\n")
    );
  });

  it("recognises timestamped, bracketed and compose-prefixed records", () => {
    const stamp = "2026-11-20T10:00:00Z";
    const forms = [
      `${stamp} INFO tick`,
      `${stamp} [INFO] tick`,
      "api-1  | INFO tick",
      "api-1  | 2026-11-20 10:00:00,123 DEBUG tick",
      "[info] tick",
      "info: tick",
    ];
    for (const line of forms) {
      const out = render(Array(4).fill(line).join("\n"));
      assert.equal(out.text, `${line}\n[3 repetições omitidas]`, line);
    }
  });

  it("never collapses diagnostics, even when identical and consecutive", () => {
    for (const level of ["ERROR", "WARN", "WARNING", "FATAL", "CRITICAL", "PANIC", "error"]) {
      const input = Array(6).fill(`${level} disk quota`).join("\n");
      assert.equal(render(input).changed, false, level);
    }
  });

  it("keeps routine lines that carry a diagnostic word or a result", () => {
    for (const line of [
      "INFO retrying after timeout",
      "INFO request failed, will retry",
      "INFO connection refused by peer",
      "INFO worker finished ok",
      "INFO server listening on :8080",
      "INFO tests passed",
      "INFO result=42",
      "INFO Result: ok",
    ]) {
      assert.equal(render(Array(5).fill(line).join("\n")).changed, false, line);
    }
  });

  it("does not collapse a routine record that owns continuation lines", () => {
    const input = ["INFO a", "INFO a", "INFO a", "INFO a", "  payload: {x: 1}", "INFO b"].join(
      "\n"
    );
    const out = render(input);
    assert.equal(out.changed, true);
    assert.equal(
      out.text,
      ["INFO a", "[2 repetições omitidas]", "INFO a", "  payload: {x: 1}", "INFO b"].join("\n")
    );
    // and a lone multi-line record is never touched
    const lone = ["INFO a", "  p", "INFO a", "  p", "INFO a", "  p"].join("\n");
    assert.equal(render(lone).changed, false);
  });

  it("preserves repeated continuation lines and blank lines verbatim", () => {
    const input = ["ERROR boom", "  at x", "  at x", "  at x", "", "", "", "INFO a"].join("\n");
    assert.equal(render(input).changed, false);
  });

  it("returns the original when the input already carries a collapse marker", () => {
    const input = ["INFO a", "INFO a", "INFO a", "[7 repetições omitidas]", "INFO b"].join("\n");
    assert.equal(render(input).changed, false);
  });

  it("returns the original when nothing is repeated or nothing is recognised", () => {
    assert.equal(render("INFO a\nINFO b\nERROR c").changed, false);
    assert.equal(render("INFO a\nINFO a").changed, false);
    assert.equal(render("plain line\nplain line\nplain line\nplain line").changed, false);
    assert.equal(render("").changed, false);
    assert.equal(render("INFO").changed, false);
  });

  it("matches nothing that merely starts like a level word", () => {
    for (const line of ["INFORMATION x", "DEBUGGER attached", "information: x", "INFOX y"]) {
      assert.equal(render(Array(5).fill(line).join("\n")).changed, false, line);
    }
  });

  it("keeps CR line endings of every surviving line", () => {
    const input = ["INFO a\r", "INFO a\r", "INFO a\r", "ERROR b\r"].join("\n");
    const out = render(input);
    assert.equal(out.text, "INFO a\r\n[2 repetições omitidas]\nERROR b\r");
  });

  it("is linear on a hostile single line", () => {
    const hostile = `api${" ".repeat(20000)}|${"x".repeat(20000)}`;
    const detection = detectCommandType("INFO x", COMMAND);
    const started = Date.now();
    // the renderer alone: the command detector is not under test here
    const out = renderRepeatedLogs(Array(4).fill(hostile).join("\n"), detection);
    assert.equal(out.changed, false);
    assert.ok(Date.now() - started < 1000);
  });

  it("reuses the legacy run counter without changing the legacy dedup output", () => {
    assert.equal(identicalRunLength(["a", "a", "a", "b"], 0), 3);
    assert.equal(identicalRunLength(["a", "a", "a", "b"], 3), 1);
    assert.equal(identicalRunLength(["a", "b"], 1), 1);
    const legacy = deduplicateRepeatedLines(["same", "same", "same", "tail"].join("\n"), {
      threshold: 3,
    });
    assert.equal(legacy.text, "same\n[line repeated 2x]\n[rtk:dropped 2 repeated lines]\ntail");
    assert.equal(legacy.collapsed, 2);
  });
});

describe("structural repeated logs dispatch", () => {
  it("applies to docker compose logs too, and only for log commands", () => {
    assert.ok(run(LOGS, "docker compose logs --tail 200 api").techniques.includes(TECHNIQUE));
    assert.ok(run(LOGS, "cd /srv && docker logs api").techniques.includes(TECHNIQUE));
    assert.ok(!run(LOGS, "cat app.log").techniques.includes(TECHNIQUE));
    assert.ok(!run(LOGS, null).techniques.includes(TECHNIQUE));
  });

  it("reads the compose options that come before the logs subcommand", () => {
    for (const command of [
      "docker compose logs web",
      "docker compose -f compose.prod.yaml logs web",
      "docker compose --file compose.prod.yaml logs web",
      "docker compose --file=compose.prod.yaml logs web",
      "docker compose -p demo --profile debug --env-file .env.prod logs --tail 100 web",
      "docker compose --ansi never --progress plain --dry-run logs",
      "cd /srv && docker compose -f a.yml -f b.yml logs api",
    ]) {
      assert.ok(run(LOGS, command).techniques.includes(TECHNIQUE), command);
    }
    // another subcommand, or a value mistaken for the subcommand, is not a log command
    for (const command of [
      "docker compose -f compose.prod.yaml ps",
      "docker compose -f logs ps",
      "docker compose -f compose.prod.yaml up logs",
      "docker compose -f compose.prod.yaml",
      "docker compose -f",
    ]) {
      const out = run(LOGS, command);
      assert.ok(!out.techniques.includes(TECHNIQUE), command);
      assert.equal(out.text, run(LOGS, command, { flag: false }).text, command);
    }
  });

  it("is byte-identical to the legacy path when the flag is off", () => {
    const off = run(LOGS, COMMAND, { flag: false });
    assert.ok(!off.techniques.includes(TECHNIQUE));
    assert.notEqual(run(LOGS).text, off.text);
    const noRenderers = run(LOGS, COMMAND, { config: { enableRenderers: false } });
    assert.equal(noRenderers.text, off.text);
  });

  it("honours the renderers allowlist", () => {
    const excluded = run(LOGS, COMMAND, { config: { renderers: ["git-diff"] } });
    assert.ok(!excluded.techniques.includes(TECHNIQUE));
    const included = run(LOGS, COMMAND, { config: { renderers: ["docker-logs"] } });
    assert.ok(included.techniques.includes(TECHNIQUE));
  });

  it("lets a filter the operator enabled keep the request on the legacy path", () => {
    const out = run(LOGS, COMMAND, { config: { enabledFilters: ["docker-logs"] } });
    assert.ok(!out.techniques.includes(TECHNIQUE));
  });

  it("falls back to the legacy result above the analysis budget", () => {
    const big = Array(STRUCTURAL_ANALYSIS_BUDGET.maxLines + 10)
      .fill("INFO [http] GET /healthz 200 1ms")
      .join("\n");
    const on = run(big);
    const off = run(big, COMMAND, { flag: false });
    assert.ok(!on.techniques.includes(TECHNIQUE));
    assert.equal(on.text, off.text);
  });

  it("returns the original text, untouched, when the recognised format has no faithful summary", () => {
    const text = ["ERROR a", "ERROR a", "ERROR a", "INFO b", "INFO c"].join("\n");
    const out = run(text);
    assert.equal(out.text, text);
    assert.ok(!out.techniques.includes(TECHNIQUE));
  });
});
