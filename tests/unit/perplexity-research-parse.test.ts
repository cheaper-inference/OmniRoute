// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { parseResearchFrames } =
  await import("../../open-sse/mcp-server/tools/perplexityResearchParse.ts");

const fixture = readFileSync(new URL("../fixtures/pplx-research-sse.txt", import.meta.url), "utf8");

test("a final research report is the only success", () => {
  const out = parseResearchFrames(fixture);
  assert.equal(out.outcome, "success");
  assert.equal(out.report, "The final report body.");
  assert.deepEqual(
    out.citations.map((c) => c.url),
    ["https://example.test/a", "https://example.test/b"]
  );
  assert.deepEqual(out.warnings, []);
});

test("an ask_text answer without a final report is not a success", () => {
  const frames = [
    'data: {"status":"PENDING","final_sse_message":false,"blocks":[{"intended_usage":"ask_text","markdown_block":{"chunks":["draft only"]}}]}',
    "",
    'data: {"status":"COMPLETED","final_sse_message":true}',
    "",
  ].join("\n");
  const out = parseResearchFrames(frames);
  assert.equal(out.outcome, "report_unconfirmed");
  assert.equal(out.report, "draft only");
  assert.ok(out.warnings.includes("report_unconfirmed"));
});

test("a report that disagrees with the streamed answer is not a success", () => {
  const frames = [
    'data: {"status":"PENDING","blocks":[{"intended_usage":"ask_text","markdown_block":{"chunks":["streamed text"]}}]}',
    "",
    'data: {"status":"COMPLETED","final_sse_message":true,"artifact_entries":[{"assets":[{"asset_type":"RESEARCH_REPORT","research_report":{"final":true,"source_content":"different text"}}]}]}',
    "",
  ].join("\n");
  const out = parseResearchFrames(frames);
  assert.equal(out.outcome, "report_unconfirmed");
  assert.equal(out.report, "different text");
  assert.ok(out.warnings.includes("report_unconfirmed"));
});

test("a stream that stops while pending is incomplete", () => {
  const frames = 'data: {"status":"PENDING","final_sse_message":false,"blocks":[]}\n\n';
  const out = parseResearchFrames(frames);
  assert.equal(out.outcome, "incomplete_result");
  assert.equal(out.report, "");
});

test("an unknown event is a warning, not a throw", () => {
  const frames = [
    'data: {"status":"PENDING","mystery_event":{"kind":"never-seen"}}',
    "",
    'data: {"status":"COMPLETED","final_sse_message":true,"artifact_entries":[{"assets":[{"asset_type":"RESEARCH_REPORT","research_report":{"final":true,"source_content":"ok"}}]}]}',
    "",
  ].join("\n");
  const out = parseResearchFrames(frames);
  assert.equal(out.outcome, "success");
  assert.ok(out.warnings.some((w) => w.includes("mystery_event")));
});
