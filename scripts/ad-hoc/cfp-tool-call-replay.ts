/**
 * Replay every captured Cloudflare Playground reply through the tool parser.
 *
 * Reads the request/response pairs OmniRoute logs under
 * `$DATA_DIR/call_logs/<day>/*.json` (default `~/.omniroute/call_logs`), keeps
 * the ones that declared tools, returned no `tool_calls`, and carried tool
 * markup — i.e. exactly the turns where the emulated parser was the only thing
 * standing between the model and a dropped call — and reports how each one is
 * classified today:
 *
 *   ok         the declared tool was read and finalized
 *   mislabeled the call was read under a different tool name
 *   rejected   a call was read but failed the nonce/schema contract
 *   retried    no call was read, but the executor's one repair retry fires
 *   silent     no call was read and no retry fires — the reply ships as text
 *              with the call buried in it (the leak this hardening removed)
 *
 * Usage:
 *   npx tsx scripts/ad-hoc/cfp-tool-call-replay.ts
 *   npx tsx scripts/ad-hoc/cfp-tool-call-replay.ts --verbose
 *   npx tsx scripts/ad-hoc/cfp-tool-call-replay.ts --dir /path/to/call_logs
 *
 * This is a reporting tool, not a gate: it reads live logs that are not in the
 * repo. The shapes those logs contain are frozen in
 * `tests/fixtures/cloudflare-playground/cases.json`, which IS the gate.
 */
import { readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import {
  cfToolNonce,
  finalizeCfToolCalls,
  hasMalformedCfToolIntent,
  parseCfToolCalls,
  type CfToolDef,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";

interface LoggedTool {
  function: { name: string; parameters: Record<string, unknown> };
}

interface LoggedExchange {
  summary?: { provider?: string; timestamp?: string };
  requestBody?: { tools?: LoggedTool[] };
  responseBody?: {
    choices?: Array<{ message?: { content?: string | null; tool_calls?: unknown[] } }>;
  };
}

const MARKUP = /<\s*(tool|tool_call|tool-call|toolcall|function_call|shell|[a-z_][\w.-]*)\b/i;

function argValue(value: string | undefined): string {
  return value ?? "";
}

/** Names the text itself declares, in any of the dialects the models use. */
function intendedNames(text: string, declared: Set<string>): Set<string> {
  const found = new Set<string>();
  const add = (raw: string) => {
    const hit = [...declared].find((name) => name.toLowerCase() === raw.toLowerCase());
    if (hit) found.add(hit);
  };
  for (const match of text.matchAll(/<\s*tool\b[^>]*\bname\s*=\s*["']?([A-Za-z_][\w.-]*)/gi)) {
    add(argValue(match[1]));
  }
  for (const match of text.matchAll(/<\s*tool:([A-Za-z_][\w.-]*)\s*>/gi)) add(argValue(match[1]));
  for (const match of text.matchAll(/"name"\s*:\s*"([A-Za-z_][\w.-]*)"/g)) add(argValue(match[1]));
  for (const match of text.matchAll(/"arg"\s*:\s*"([A-Za-z_][\w.-]*)"/g)) add(argValue(match[1]));
  const wrapper = /^(tool|tool[_-]?call|toolcall|function[_-]?call|shell)$/i;
  for (const match of text.matchAll(/<\s*([A-Za-z_][\w.-]*)\b[^>]*>/g)) {
    if (wrapper.test(match[1])) continue;
    add(argValue(match[1]));
  }
  return found;
}

function main(): void {
  const argv = process.argv.slice(2);
  const verbose = argv.includes("--verbose");
  const dirFlag = argv.indexOf("--dir");
  const base =
    dirFlag !== -1 && argv[dirFlag + 1]
      ? argv[dirFlag + 1]
      : join(homedir(), ".omniroute", "call_logs");

  let files: string[] = [];
  try {
    files = readdirSync(base).flatMap((day) =>
      readdirSync(join(base, day))
        .filter((name) => name.endsWith(".json"))
        .map((name) => join(base, day, name))
    );
  } catch {
    console.error(`No call logs under ${base}`);
    process.exitCode = 1;
    return;
  }

  const tally = { ok: 0, mislabeled: 0, rejected: 0, retried: 0, silent: 0 };
  const rows: string[] = [];

  for (const file of files) {
    let exchange: LoggedExchange;
    try {
      exchange = JSON.parse(readFileSync(file, "utf8")) as LoggedExchange;
    } catch {
      continue;
    }
    if (exchange.summary?.provider !== "cloudflare-playground") continue;
    const message = exchange.responseBody?.choices?.[0]?.message;
    if (!message || message.tool_calls) continue;
    const text = String(message.content ?? "");
    const tools = exchange.requestBody?.tools ?? [];
    if (!tools.length || !text || !MARKUP.test(text)) continue;

    const defs: CfToolDef[] = tools.map((tool) => ({
      name: tool.function.name,
      parameters: tool.function.parameters,
    }));
    const declared = new Set(defs.map((tool) => tool.name));
    const intended = intendedNames(text, declared);
    const parsed = parseCfToolCalls(text, defs);
    const finalized =
      parsed.length > 0 ? finalizeCfToolCalls(parsed, tools, cfToolNonce(tools)) : null;

    let verdict: keyof typeof tally;
    const parsedNames = new Set(parsed.map((call) => call.name));
    const namesDiverge =
      parsed.length > 0 &&
      intended.size > 0 &&
      ![...parsedNames].some((name) => intended.has(name));

    if (namesDiverge) {
      // Checked before finalize: a wrong name that also fails validation is
      // still a mislabel, and hiding it behind "rejected" understates the bug.
      verdict = "mislabeled";
    } else if (parsed.length === 0) {
      // No call read: either the executor retries (intent detected) or the turn
      // leaks as a text answer with the call buried in it.
      verdict = hasMalformedCfToolIntent(text, [...declared], defs) ? "retried" : "silent";
    } else if (finalized === null) verdict = "rejected";
    else verdict = "ok";
    tally[verdict]++;
    rows.push(
      [
        exchange.summary?.timestamp ?? file,
        verdict.padEnd(10),
        `parsed=${parsed.map((call) => call.name).join(",") || "-"}`.padEnd(24),
        `intended=${[...intended].join(",") || "-"}`.padEnd(18),
        JSON.stringify(text.slice(0, 70)),
      ].join(" ")
    );
  }

  if (verbose) {
    for (const row of rows) console.log(row);
    console.log("");
  }
  const total = Object.values(tally).reduce((sum, value) => sum + value, 0);
  console.log(`cloudflare-playground replies with tool markup and no tool_calls: ${total}`);
  console.log(`  ok         ${tally.ok}`);
  console.log(`  mislabeled ${tally.mislabeled}`);
  console.log(`  rejected   ${tally.rejected}  (read, failed the nonce/schema contract)`);
  console.log(`  retried    ${tally.retried}  (unreadable, but one repair retry fires)`);
  console.log(`  silent     ${tally.silent}  (unreadable AND returned as text — the leak)`);
}

main();
