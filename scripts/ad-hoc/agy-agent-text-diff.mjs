// Differential check: the port against upstream's own text machinery.
//
// Every case is pushed through both, chunk by chunk, across several chunk
// splits — a filter that only differs when a banner straddles a chunk boundary
// is exactly the bug this port can introduce.
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import { AgentTextFilter } from "../../open-sse/services/agyAgentText.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const upstream = await import(
  pathToFileURL(path.join("C:/Users/Jr/AppData/Local/Temp/opencode/agydiff/upstream-text.mjs")).href
);

const BANNERS = {
  terminated: "\n⚠ Agent execution terminated due to error.\n",
  network: "\n⚠ There was a network issue connecting to the server, please try again.\n",
  credits: "\n⚠ Your AI credits balance is too low to continue.\n",
  quota: "\n⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).\n",
  attempt: "\n⚠ API error (attempt 3): code 429: Resource has been exhausted\n",
  attemptPlain: "\n⚠ API error (attempt 2): 500 upstream\n",
  invalid: "\n⚠ Model produced invalid output.\n",
};

const cases = [
  { name: "plain", text: "Hello, this is an answer." },
  { name: "multiline", text: "line one\nline two\nline three\n" },
  { name: "banner only/terminated", text: BANNERS.terminated },
  { name: "banner only/network", text: BANNERS.network },
  { name: "banner only/credits", text: BANNERS.credits },
  { name: "banner only/quota", text: BANNERS.quota },
  { name: "banner then text", text: BANNERS.terminated + "and then something" },
  { name: "text then banner", text: "some answer" + BANNERS.terminated },
  {
    name: "quoted mid-line",
    text: "the log said: ⚠ Agent execution terminated due to error. and more\n",
  },
  { name: "quoted mid-line indented", text: "  ⚠ Agent execution terminated due to error.\n" },
  { name: "retry banner dropped", text: "a" + BANNERS.invalid + "b" },
  { name: "retry banner at start", text: BANNERS.invalid + "b" },
  { name: "attempt line dropped", text: "a" + BANNERS.attempt + "b" },
  { name: "attempt plain dropped", text: "a" + BANNERS.attemptPlain + "b" },
  { name: "attempt 429 ends turn", text: "a" + BANNERS.attempt + "b" },
  { name: "two retry banners", text: BANNERS.invalid + "x" + BANNERS.invalid + "y" },
  { name: "quoted retry mid-line", text: "log: ⚠ Model produced invalid output. kept\n" },
  { name: "trailing newline only", text: "answer\n" },
  { name: "empty", text: "" },
  { name: "warning char alone", text: "⚠" },
  { name: "warning not banner", text: "⚠ careful here\n" },
  { name: "partial marker eof", text: "text\n⚠ Agent exec" },
  { name: "long prose with newlines", text: `${"word ".repeat(40)}\n${"more ".repeat(20)}\n` },
];

/** Split `text` into `parts` chunks of roughly equal size, at arbitrary points. */
function splits(text, parts) {
  if (parts <= 1) return [text];
  const out = [];
  let start = 0;
  for (let i = 1; i < parts; i++) {
    const at = Math.floor((text.length * i) / parts);
    if (at > start) out.push(text.slice(start, at));
    start = at;
  }
  out.push(text.slice(start));
  return out.filter((chunk, index, all) => chunk.length > 0 || all.length === 1);
}

function runPort(chunks) {
  const filter = new AgentTextFilter();
  let text = "";
  let failed = false;
  let core = "";
  let detail = "";
  for (const chunk of chunks) {
    const outcome = filter.push(chunk);
    text += outcome.text;
    if (outcome.failed) {
      failed = true;
      core = outcome.core ?? "";
      detail = outcome.detail ?? "";
    }
  }
  const ended = filter.end();
  text += ended.text;
  if (ended.failed) {
    failed = true;
    core = ended.core ?? "";
    detail = ended.detail ?? "";
  }
  // Upstream reports a 429 from an attempt line through the same error path as
  // a banner, so both collapse to one "the turn failed" answer here.
  return { text, failed, core, detail, attemptDetail: filter.lastAttemptDetail };
}

function runUpstream(chunks) {
  const turn = new upstream.UpstreamTurnText();
  for (const chunk of chunks) turn.pushText(chunk);
  turn.endText();
  const classified = turn.classify();
  if (!classified.failed) turn.flushText();
  const core = classified.core || "";
  // Upstream only builds a failure detail on the path where it throws
  // (#agentError), which is the path a 429 attempt line also takes.
  const failed = classified.failed || Boolean(turn.refused);
  return {
    text: turn.texts().join(""),
    failed,
    core,
    detail: !failed
      ? ""
      : turn.refused ||
        turn.attemptDetail ||
        (core && core !== upstream.AGENT_ERROR_CORES[0] ? core.replace(/^⚠ /, "") : ""),
    attemptDetail: turn.attemptDetail,
  };
}

let compared = 0;
const failures = [];

for (const testCase of cases) {
  for (const parts of [1, 2, 3, 5, 8, 13]) {
    const chunks = splits(testCase.text, parts);
    const expected = runUpstream(chunks);
    const actual = runPort(chunks);
    compared++;
    const same =
      expected.text === actual.text &&
      expected.failed === actual.failed &&
      expected.core === actual.core &&
      expected.detail === actual.detail &&
      expected.attemptDetail === actual.attemptDetail;
    if (!same) {
      failures.push({ name: testCase.name, parts, chunks, expected, actual });
    }
  }
}

console.log(`${compared - failures.length}/${compared} identical`);
if (failures.length) {
  for (const failure of failures.slice(0, 6)) {
    console.log("\n--- MISMATCH", failure.name, "parts:", failure.parts);
    console.log("chunks:", JSON.stringify(failure.chunks));
    console.log("expected:", JSON.stringify(failure.expected));
    console.log("actual  :", JSON.stringify(failure.actual));
  }
  process.exitCode = 1;
}
