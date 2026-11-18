import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/batchProcessor.ts");

describe("batchProcessor helpers", () => {
  describe("parseBatchItems", () => {
    const endpoint = "/v1/chat/completions";

    it("parses valid JSONL input", () => {
      const input = Buffer.from(
        JSON.stringify({ url: endpoint, body: { model: "gpt-4", messages: [] }, custom_id: "r1" }) +
          "\n" +
          JSON.stringify({ url: endpoint, body: { model: "gpt-4", messages: [] }, custom_id: "r2" })
      );
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items!.length, 2);
      assert.equal(result.items![0].customId, "r1");
      assert.equal(result.items![1].customId, "r2");
    });

    it("returns error for invalid JSON", () => {
      const input = Buffer.from("not json");
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /not valid JSON/);
    });

    it("returns error for non-POST method", () => {
      const input = Buffer.from(JSON.stringify({ method: "GET", url: endpoint, body: {} }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /unsupported method/);
    });

    it("returns error for mismatched URL", () => {
      const input = Buffer.from(
        JSON.stringify({ url: "/v1/embeddings", body: { model: "text-embedding" } })
      );
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /does not match/);
    });

    it("returns error for missing body", () => {
      const input = Buffer.from(JSON.stringify({ url: endpoint }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /must include a JSON object body/);
    });

    it("defaults method to POST", () => {
      const input = Buffer.from(JSON.stringify({ url: endpoint, body: { model: "gpt-4" } }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items![0].method, "POST");
    });

    it("handles empty input", () => {
      const input = Buffer.from("");
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items!.length, 0);
    });

    const jsonlLines = (count: number): Buffer =>
      Buffer.from(
        Array.from({ length: count }, (_, i) =>
          JSON.stringify({
            url: endpoint,
            body: { model: "gpt-4" },
            custom_id: `${i}`,
          })
        ).join("\n")
      );

    // These cases assert the built-in limit; an inherited override from the operator
    // environment must not leak into them, and must be restored even on assertion failure.
    const withDefaultLimit = (run: () => void): void => {
      const previous = process.env.MAX_BATCH_ITEMS;
      delete process.env.MAX_BATCH_ITEMS;
      try {
        run();
      } finally {
        if (previous === undefined) {
          delete process.env.MAX_BATCH_ITEMS;
        } else {
          process.env.MAX_BATCH_ITEMS = previous;
        }
      }
    };

    it("rejects a batch above the item limit with a bounded message", () => {
      withDefaultLimit(() => {
        const result = mod.parseBatchItems(jsonlLines(100_001), endpoint);
        assert.ok(result.error, "expected the oversized batch to be refused");
        assert.match(result.error, /MAX_BATCH_ITEMS/);
        assert.match(result.error, /100000/);
        assert.ok(result.error.length < 200);
        assert.equal(result.items, null);
      });
    });

    it("accepts a batch exactly at the item limit", () => {
      withDefaultLimit(() => {
        const result = mod.parseBatchItems(jsonlLines(100_000), endpoint);
        assert.equal(result.error, null);
        assert.equal(result.items!.length, 100_000);
      });
    });

    it("accepts a small batch unchanged", () => {
      withDefaultLimit(() => {
        const result = mod.parseBatchItems(jsonlLines(10), endpoint);
        assert.equal(result.error, null);
        assert.equal(result.items!.length, 10);
      });
    });

    it("does not count lines made only of Unicode whitespace towards the limit", () => {
      withDefaultLimit(() => {
        process.env.MAX_BATCH_ITEMS = "5";
        try {
          const valid = jsonlLines(5).toString();
          const content = Buffer.from(`${valid}\n\u00a0\n\u2003\n\u3000`);
          const result = mod.parseBatchItems(content, endpoint);
          assert.equal(result.error, null);
          assert.equal(result.items!.length, 5);
        } finally {
          delete process.env.MAX_BATCH_ITEMS;
        }
      });
    });

    it("does not apply the item limit when resuming a batch with persisted checkpoints", () => {
      withDefaultLimit(() => {
        const result = mod.parseBatchItems(jsonlLines(100_001), endpoint, { skipItemLimit: true });
        assert.equal(result.error, null);
        assert.equal(result.items!.length, 100_001);
      });
    });

    it("honours MAX_BATCH_ITEMS from the environment and falls back on invalid values", () => {
      const previous = process.env.MAX_BATCH_ITEMS;
      try {
        process.env.MAX_BATCH_ITEMS = "5";
        const refused = mod.parseBatchItems(jsonlLines(6), endpoint);
        assert.ok(refused.error, "expected the batch above the override limit to be refused");
        assert.match(refused.error, /MAX_BATCH_ITEMS/);
        const accepted = mod.parseBatchItems(jsonlLines(5), endpoint);
        assert.equal(accepted.error, null);
        assert.equal(accepted.items!.length, 5);

        for (const invalid of [
          "-1",
          "0",
          "",
          "not-a-number",
          "100_000",
          "5abc",
          "9007199254740993",
        ]) {
          process.env.MAX_BATCH_ITEMS = invalid;
          const fallen = mod.parseBatchItems(jsonlLines(6), endpoint);
          assert.equal(fallen.error, null, `expected fallback for ${JSON.stringify(invalid)}`);
          assert.equal(fallen.items!.length, 6);
        }
      } finally {
        if (previous === undefined) {
          delete process.env.MAX_BATCH_ITEMS;
        } else {
          process.env.MAX_BATCH_ITEMS = previous;
        }
      }
    });
  });

  describe("buildRequestBody", () => {
    it("adds stream:false for chat endpoint", () => {
      const result = mod.buildRequestBody({
        body: { model: "gpt-4", messages: [] },
        url: "/v1/chat/completions",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, false);
      assert.equal(result.model, "gpt-4");
    });

    it("does not add stream for embeddings endpoint", () => {
      const result = mod.buildRequestBody({
        body: { model: "text-embedding-3-small", input: "hello" },
        url: "/v1/embeddings",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, undefined);
    });

    it("does not add stream for images endpoint", () => {
      const result = mod.buildRequestBody({
        body: { prompt: "a cat" },
        url: "/v1/images/generations",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, undefined);
    });
  });

  describe("maybeThrottle", () => {
    it("returns null when no rate-limit headers present", () => {
      const headers = new Headers();
      assert.equal(mod.maybeThrottle(headers), null);
    });
  });
});
