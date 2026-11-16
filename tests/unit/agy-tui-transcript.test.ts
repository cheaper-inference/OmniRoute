// Transcript reader for the `tui` transport: only complete rows count, and only
// the model's own reply after this turn's prompt.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import {
  AgyTranscriptReader,
  flat,
  transcriptPath,
  type TranscriptProgress,
} from "../../open-sse/services/agyTuiTranscript.ts";

const dirs: string[] = [];

function temporaryDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-transcript-test-"));
  dirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true });
});

function freshProgress(): TranscriptProgress {
  return { userSeen: false, answered: false, response: "", revision: 0 };
}

function append(file: string, rows: unknown[]): void {
  fs.appendFileSync(file, rows.map((row) => `${JSON.stringify(row)}\n`).join(""), "utf8");
}

const userRow = (text: string) => ({ type: "USER_INPUT", source: "USER_EXPLICIT", content: text });
const plannerRow = (text: string) => ({ type: "PLANNER_RESPONSE", content: text });

describe("agyTuiTranscript — path and flattening", () => {
  it("reads the untruncated record, not the replay-friendly one", () => {
    const file = transcriptPath("abc-123", "/home/u");
    assert.equal(
      path.normalize(file),
      path.normalize(
        "/home/u/.gemini/antigravity-cli/brain/abc-123/.system_generated/logs/transcript_full.jsonl"
      )
    );
  });

  it("collapses the whitespace a pasted prompt carries", () => {
    assert.equal(flat("  one\n\ttwo   three \n"), "one two three");
  });
});

describe("agyTuiTranscript — incremental reading", () => {
  it("ignores everything written before the turn started", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    append(file, [userRow("an earlier turn"), plannerRow("an earlier reply")]);
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "this turn", progress);
    reader.seekToEnd();
    append(file, [userRow("this turn"), plannerRow("this reply")]);
    reader.poll();
    assert.equal(progress.userSeen, true);
    assert.equal(progress.answered, true);
    assert.equal(progress.response, "this reply");
  });

  it("does not read a half-written row", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    fs.writeFileSync(file, "", "utf8");
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "hello there", progress);
    const planner = JSON.stringify(plannerRow("partial reply"));
    // The whole row except its closing brace and newline: JSON still incomplete.
    fs.appendFileSync(
      file,
      `${JSON.stringify(userRow("hello there"))}\n${planner.slice(0, -2)}`,
      "utf8"
    );
    reader.poll();
    // The planner row is half-written, so it must not be answered from.
    assert.equal(progress.userSeen, true);
    assert.equal(progress.answered, false);

    fs.appendFileSync(file, `${planner.slice(-2)}\n`, "utf8");
    reader.poll();
    assert.equal(progress.response, "partial reply");
  });

  it("only answers after this turn's own prompt has been seen", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    fs.writeFileSync(file, "", "utf8");
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "the prompt", progress);
    append(file, [plannerRow("a reply from another conversation")]);
    reader.poll();
    assert.equal(progress.answered, false);
    assert.equal(progress.response, "");

    append(file, [userRow("the prompt")]);
    reader.poll();
    append(file, [plannerRow("the answer")]);
    reader.poll();
    assert.equal(progress.response, "the answer");
  });

  it("ignores a prompt echo that is not the explicit user input", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    fs.writeFileSync(file, "", "utf8");
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "the prompt", progress);
    append(file, [{ type: "USER_INPUT", source: "SYSTEM", content: "the prompt" }]);
    reader.poll();
    assert.equal(progress.userSeen, false);
  });

  it("keeps an earlier answer when a later planner row carries no text", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    fs.writeFileSync(file, "", "utf8");
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "the prompt", progress);
    append(file, [userRow("the prompt"), plannerRow("partial")]);
    reader.poll();
    // A row with no text is the model about to call a tool, not a retraction.
    append(file, [{ type: "PLANNER_RESPONSE", toolCalls: [{ name: "read_file" }] }]);
    reader.poll();
    assert.equal(progress.response, "partial");
  });

  it("survives a malformed row and keeps reading the rest", () => {
    const file = path.join(temporaryDir(), "transcript_full.jsonl");
    fs.writeFileSync(file, "", "utf8");
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(file, () => "the prompt", progress);
    fs.appendFileSync(file, "{not json}\n", "utf8");
    append(file, [userRow("the prompt"), plannerRow("still read")]);
    reader.poll();
    assert.equal(progress.response, "still read");
  });

  it("returns quietly when the record does not exist yet", () => {
    const progress = freshProgress();
    const reader = new AgyTranscriptReader(
      path.join(temporaryDir(), "missing.jsonl"),
      () => "the prompt",
      progress
    );
    reader.seekToEnd();
    assert.equal(reader.poll(), progress);
    assert.equal(progress.userSeen, false);
  });
});
