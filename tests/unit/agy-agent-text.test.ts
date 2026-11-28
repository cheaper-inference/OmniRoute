/**
 * agyAgentText.ts — telling agy's own banners from the model's prose.
 *
 * agy writes a failed upstream call into the reply as ordinary text, so the
 * transport has to read the reply to know the turn failed. Every case here is
 * also covered by the differential harness in
 * scripts/ad-hoc/agy-agent-text-diff.mjs, which runs the port and upstream's own
 * Turn side by side across several chunk splits (138/138 identical).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  AGENT_ERROR_CORES,
  AGENT_ERROR_MARKERS,
  AgentTextFilter,
  ATTEMPT_LINE,
  CREDITS_CORE,
  refused429,
} from "../../open-sse/services/agyAgentText.ts";

/** Push every chunk and collect what the client would have seen. */
function run(chunks: string[]) {
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
  return { text, failed, core, detail };
}

const BANNERS = {
  terminated: "\n⚠ Agent execution terminated due to error.\n",
  network: "\n⚠ There was a network issue connecting to the server, please try again.\n",
  credits: "\n⚠ Your AI credits balance is too low to continue.\n",
  quota: "\n⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).\n",
  invalid: "\n⚠ Model produced invalid output.\n",
  attempt429: "\n⚠ API error (attempt 3): code 429: Resource has been exhausted\n",
  attempt500: "\n⚠ API error (attempt 2): 500 upstream\n",
};

// ── The banners themselves ─────────────────────────────────────────────────

test("the banner list is the four agy writes, and the cores are its trimmed form", () => {
  assert.equal(AGENT_ERROR_MARKERS.length, 4);
  assert.deepEqual(
    AGENT_ERROR_MARKERS.map((marker) => marker.trim()),
    AGENT_ERROR_CORES as string[]
  );
  assert.equal(
    CREDITS_CORE,
    "⚠ Your AI credits balance is too low to continue.",
    "the credit banner is the 402 one, so the caller can report it apart"
  );
});

test("refused429 needs both the code and the exhaustion wording", () => {
  assert.equal(refused429("code 429: Resource has been exhausted (e.g. check quota)."), true);
  // A bare "429" is a real quota; only the exhaustion pair means a refused prompt.
  assert.equal(refused429("HTTP 429 too many requests"), false);
  assert.equal(refused429("Resource has been exhausted"), false);
  assert.equal(refused429("code 429"), false);
  assert.equal(refused429(""), false);
});

test("ATTEMPT_LINE splits agy's per-attempt line", () => {
  assert.equal(ATTEMPT_LINE.exec("⚠ API error (attempt 3): 500 upstream")?.[1], "500 upstream");
  assert.equal(ATTEMPT_LINE.exec("⚠ API error (attempt 12):")?.[1], "");
  assert.equal(ATTEMPT_LINE.exec("⚠ API error (attempt 1):  boom")?.[1], " boom");
  // Anything that is not that exact shape is not an attempt line.
  assert.equal(ATTEMPT_LINE.exec("attempt 3: boom"), null);
  assert.equal(ATTEMPT_LINE.exec("⚠ Model produced invalid output."), null);
});

// ── Text that is just text ─────────────────────────────────────────────────

test("plain text passes through untouched", () => {
  assert.deepEqual(run(["Hello, this is an answer."]), {
    text: "Hello, this is an answer.",
    failed: false,
    core: "",
    detail: "",
  });
});

test("text is emitted as it arrives, not buffered until the end", () => {
  const filter = new AgentTextFilter();
  assert.equal(filter.push("first ").text, "first ");
  assert.equal(filter.push("second").text, "second");
  assert.equal(filter.end().text, "");
});

test("an empty turn says nothing", () => {
  assert.deepEqual(run([""]), { text: "", failed: false, core: "", detail: "" });
});

test("a trailing newline is kept, since the model wrote it", () => {
  assert.equal(run(["answer\n"]).text, "answer\n");
});

test("a lone warning sign is text, because agy's banners start with a newline", () => {
  // Holding a bare "⚠" would delay every reply that mentions the character;
  // agy always writes the banner on a fresh line, so the sign alone is the
  // model's and goes out at once.
  const filter = new AgentTextFilter();
  assert.equal(filter.push("⚠").text, "⚠");
  assert.equal(filter.end().text, "");
});

test("a warning sign inside a sentence is text", () => {
  assert.deepEqual(run(["⚠ careful here\n"]), {
    text: "⚠ careful here\n",
    failed: false,
    core: "",
    detail: "",
  });
});

// ── Failure banners ────────────────────────────────────────────────────────

test("each failure banner ends the turn and is not shown as text", () => {
  for (const [name, banner] of Object.entries({
    terminated: BANNERS.terminated,
    network: BANNERS.network,
    credits: BANNERS.credits,
    quota: BANNERS.quota,
  })) {
    const result = run([banner]);
    assert.equal(result.text, "", `${name}: the banner is not the model's text`);
    assert.equal(result.failed, true, `${name}: the turn failed`);
    assert.equal(result.core, banner.trim(), `${name}: the banner is reported as its core`);
  }
});

test("a banner ends the turn even when text preceded it", () => {
  const result = run(["some answer", BANNERS.terminated]);
  assert.equal(result.text, "some answer");
  assert.equal(result.failed, true);
  assert.equal(result.core, AGENT_ERROR_CORES[0]);
});

test("a banner that is still arriving is not emitted as text", () => {
  const filter = new AgentTextFilter();
  // Every prefix of the banner must be held, never shown.
  const banner = BANNERS.credits;
  for (let length = 1; length < banner.length; length++) {
    const partial = new AgentTextFilter();
    const outcome = partial.push(banner.slice(0, length));
    assert.equal(outcome.text, "", `a ${length}-char prefix was emitted as text`);
  }
  assert.equal(filter.push("").text, "");
});

test("the generic banner carries no detail, because it says nothing actionable", () => {
  const result = run([BANNERS.terminated]);
  assert.equal(result.detail, "", "there is no detail behind the generic banner");
});

test("a specific banner reports its own words with the warning sign removed", () => {
  assert.equal(
    run([BANNERS.network]).detail,
    "There was a network issue connecting to the server, please try again."
  );
  assert.equal(run([BANNERS.credits]).detail, "Your AI credits balance is too low to continue.");
});

test("a banner followed by more text was the model quoting it and is shown", () => {
  const result = run([BANNERS.terminated + "and then something"]);
  assert.equal(result.text, BANNERS.terminated + "and then something");
  assert.equal(result.failed, false);
});

test("a banner quoted mid-line is the model's, not agy's", () => {
  // agy writes its banner on a line of its own; a log excerpt inside prose is
  // text, and dropping it would truncate the reply.
  const quoted = "the log said: ⚠ Agent execution terminated due to error. and more\n";
  assert.deepEqual(run([quoted]), { text: quoted, failed: false, core: "", detail: "" });
});

test("an indented warning line still ends the turn, since only agy writes those words", () => {
  // The banner is matched by wording, not by position. Indentation survives in
  // the emitted text and the banner inside it still classifies the turn.
  const indented = "  ⚠ Agent execution terminated due to error.\n";
  const result = run([indented]);
  assert.equal(result.text, "  ");
  assert.equal(result.failed, true);
  assert.equal(result.core, AGENT_ERROR_CORES[0]);
});

// ── Retry banners ─────────────────────────────────────────────────────────

test("a retry banner is dropped where it starts a line, and the turn goes on", () => {
  const result = run(["a" + BANNERS.invalid + "b"]);
  assert.equal(result.text, "ab");
  assert.equal(result.failed, false);
});

test("a retry banner at the start of the reply is dropped too", () => {
  assert.equal(run([BANNERS.invalid + "b"]).text, "b");
});

test("two retry banners in one reply are both dropped", () => {
  assert.equal(run([BANNERS.invalid + "x" + BANNERS.invalid + "y"]).text, "xy");
});

test("a retry banner quoted mid-line is kept as the model's text", () => {
  const quoted = "log: ⚠ Model produced invalid output. kept\n";
  assert.equal(run([quoted]).text, quoted);
});

test("an attempt line is dropped and its detail remembered", () => {
  const result = run(["a" + BANNERS.attempt500 + "b"]);
  assert.equal(result.text, "ab", "the client does not see agy retrying");
  assert.equal(result.failed, false);
});

test("an attempt line reporting a refused 429 ends the turn at once", () => {
  const result = run(["a" + BANNERS.attempt429 + "b"]);
  assert.equal(result.failed, true, "waiting for agy's last retry is a hang");
  assert.match(result.detail, /code 429/);
});

test("a plain attempt line does not end the turn", () => {
  const result = run(["a" + BANNERS.attempt500 + "b"]);
  assert.equal(result.failed, false);
  assert.equal(result.detail, "");
});

// ── Chunk boundaries ─────────────────────────────────────────────────────

test("a banner split across chunks is still classified as agy's", () => {
  const banner = BANNERS.quota;
  for (let cut = 1; cut < banner.length; cut++) {
    const result = run([banner.slice(0, cut), banner.slice(cut)]);
    assert.equal(result.failed, true, `cut at ${cut} lost the banner`);
    assert.equal(result.text, "", `cut at ${cut} leaked the banner as text`);
  }
});

test("a retry banner split across chunks is still dropped", () => {
  const banner = BANNERS.invalid;
  for (let cut = 1; cut < banner.length; cut++) {
    const result = run(["a", banner.slice(0, cut), banner.slice(cut), "b"]);
    assert.equal(result.text, "ab", `cut at ${cut} left part of the banner`);
  }
});

test("text after a refused attempt line does not resurrect the turn", () => {
  const result = run(["a" + BANNERS.attempt429.slice(0, 30), BANNERS.attempt429.slice(30), "tail"]);
  assert.equal(result.failed, true);
  assert.equal(result.text, "a", "nothing after the refusal is the model's");
});

test("a failure banner is classified at the end of the turn, not when it arrives", () => {
  const filter = new AgentTextFilter();
  const first = filter.push(BANNERS.credits);
  // Still held: more text would make it a quotation, and agy writes the banner
  // before it ends the turn.
  assert.equal(first.text, "");
  assert.equal(first.failed, false);
  assert.equal(filter.isFailed, false);

  const ended = filter.end();
  assert.equal(ended.failed, true);
  assert.equal(ended.core, CREDITS_CORE);
  assert.equal(filter.isFailed, true);
  assert.equal(filter.push("ignored").text, "", "the turn is over");
});
