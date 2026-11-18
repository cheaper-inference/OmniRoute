import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-replay-framing-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { SseOutputScanner, awaitFirstOutput } =
  await import("../../open-sse/services/combo/firstOutputStream.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

for (const split of [false, true]) {
  test(`review12: observer assembles multiline output while readiness keeps its prior result, split=${split}`, () => {
    const event =
      'event: response.output_text.delta\r\ndata: {\r\ndata: "type":"response.output_text.delta","delta":"hello"}\r\n\r\n';
    const chunks = split ? event.split(/(?<=\r)/) : [event];
    let observed = false;
    const scanner = new SseOutputScanner(() => {
      observed = true;
    });
    const results = chunks.map((chunk) => scanner.push(chunk));
    assert.deepEqual(results, split ? chunks.map(() => false) : [true]);
    assert.equal(observed, true);
  });
}
test("review12: split CRLF and error flush cannot commit an incomplete terminal", () => {
  const chunks = [
    "event: response.done\r",
    "\ndata: {\r",
    '\ndata: "response":{"output":[]}}\r',
    "\n",
  ];
  let observed = false;
  const scanner = new SseOutputScanner(() => {
    observed = true;
  });
  assert.deepEqual(
    chunks.map((chunk) => scanner.push(chunk)),
    chunks.map(() => false)
  );
  assert.equal(observed, false, "split CRLF is not an event boundary");
  assert.equal(scanner.flush(), false, "preserve readiness EOF/error result");
  assert.equal(observed, false, "discard uncommitted terminal candidates on error/EOF flush");
  scanner.push("event: response.done\ndata: {}\n\n");
  assert.equal(observed, true);
});
test("review13: oversized metadata conservatively vetoes retry without changing readiness", () => {
  let observed = false;
  const scanner = new SseOutputScanner(() => {
    observed = true;
  });
  const frame =
    "event: progress\n" +
    Array.from({ length: 80 }, () => "data: " + "x".repeat(1024)).join("\n") +
    "\n\n";
  assert.equal(scanner.push(frame), false);
  assert.equal(scanner.overflowedWithoutOutput(), false, "complete frame cleared readiness bytes");
  assert.equal(scanner.flush(), false);
  assert.equal(observed, true, "discarded inspection cannot establish pre-content eligibility");
  scanner.push("event: ping\ndata: {}\n\n");
  assert.equal(observed, true, "later frames cannot clear the sticky retry veto");
});

for (const terminated of [false, true]) {
  test(`review13: inspection cap preserves readiness/flush/overflow, terminated=${terminated}`, () => {
    let observed = false;
    const scanner = new SseOutputScanner(() => {
      observed = true;
    });
    const prefix = ":" + "x".repeat(80 * 1024) + (terminated ? "\n\n" : "");
    assert.equal(scanner.push(prefix), false);
    assert.equal(observed, terminated, "unterminated line is inspected by the overflow guard");
    assert.equal(scanner.overflowedWithoutOutput(), !terminated);
    assert.equal(observed, true, "ending bounded inspection conservatively vetoes retry");
    assert.equal(scanner.flush(), false);
    scanner.push("event: ping\ndata: {}\n\n");
    assert.equal(observed, true);
  });
}

const deepMetadata = "data: " + '{"a":'.repeat(10000) + "0" + "}".repeat(10000) + "\n\n";
async function withObserverSerializationFailure(run: (hits: () => number) => void | Promise<void>) {
  const stringify = JSON.stringify;
  let hits = 0;
  JSON.stringify = ((value: unknown, ...args: unknown[]) => {
    if (
      value !== null &&
      typeof value === "object" &&
      Object.keys(value).length === 1 &&
      Object.hasOwn(value, "a")
    ) {
      hits++;
      throw new RangeError("Controlled observer serialization failure");
    }
    return Reflect.apply(stringify, JSON, [value, ...args]);
  }) as typeof JSON.stringify;
  try {
    await run(() => hits);
  } finally {
    JSON.stringify = stringify;
  }
}
test("review14: native deep metadata preserves readiness without requiring an exception", () => {
  const scanner = new SseOutputScanner(() => {});
  assert.doesNotThrow(() => assert.equal(scanner.push(deepMetadata), false));
  assert.equal(scanner.overflowedWithoutOutput(), false);
  assert.equal(scanner.flush(), false);
});
test("review14: controlled observer exception cannot change readiness", async () => {
  await withObserverSerializationFailure((hits) => {
    let observed = false;
    const scanner = new SseOutputScanner(() => {
      observed = true;
    });
    assert.doesNotThrow(() => assert.equal(scanner.push(deepMetadata), false));
    assert.equal(observed, true, "incomplete observer inspection conservatively vetoes retry");
    assert.equal(scanner.overflowedWithoutOutput(), false);
    assert.equal(scanner.flush(), false);
    assert.doesNotThrow(() => assert.equal(scanner.push(deepMetadata), false));
    assert.equal(hits(), 1, "failed observer inspection stays disabled after reset/flush");
    assert.equal(scanner.push('data: {"choices":[{"delta":{"content":"answer"}}]}\n\n'), true);
  });
});
for (const lines of [200, 256, 257]) {
  test(`review14: pending-line work budget preserves readiness, lines=${lines}`, () => {
    let observed = false;
    const scanner = new SseOutputScanner(() => {
      observed = true;
    });
    assert.equal(scanner.push(":\n".repeat(lines)), false);
    assert.equal(scanner.overflowedWithoutOutput(), false);
    assert.equal(observed, lines > 256);
    assert.equal(scanner.flush(), false);
  });
}
for (const injected of [false, true]) {
  for (const ending of ["cancelled", "budget"] as const) {
    test(`review14: real first-output wait ends at ${ending}, observer fault injected=${injected}`, async () => {
      const run = async () => {
        const ac = new AbortController();
        const response = new Response(
          new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(deepMetadata));
            },
          }),
          { headers: { "Content-Type": "text/event-stream" } }
        );
        let settled = false;
        const waiting = awaitFirstOutput(response, 250, ac.signal).then((result) => {
          settled = true;
          return result;
        });
        try {
          await new Promise((resolve) => setTimeout(resolve, 50));
          assert.equal(settled, false, "observer work must not end the historical wait");
          if (ending === "cancelled") ac.abort();
          assert.deepEqual(await waiting, { kind: "stalled", reason: ending });
        } finally {
          ac.abort();
          void response.body?.cancel().catch(() => {});
          await waiting;
        }
      };
      if (injected) await withObserverSerializationFailure(run);
      else await run();
    });
  }
}
for (const implicit of [false, true]) {
  test(`review14: work budget resets after completed normalized events, implicit=${implicit}`, () => {
    let observed = false;
    const scanner = new SseOutputScanner(() => {
      observed = true;
    });
    const frame = 'data: {"type":"progress"}\n' + (implicit ? ": ping\n" : "\n");
    assert.equal(scanner.push(frame.repeat(300)), false);
    assert.equal(scanner.overflowedWithoutOutput(), false);
    assert.equal(scanner.flush(), false);
    assert.equal(observed, false, "completed events release the pending-line budget");
  });
}
