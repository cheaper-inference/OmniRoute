// #18494: the response-model echo must advertise the model the CLIENT asked for,
// not the combo leaf the dispatcher resolved. Combo dispatch rewrites the
// dispatched body to `provider/model` (executeChatWithBreaker) before
// handleChatCore runs, while clientRawRequest.body keeps the client's original
// name — so the echo derivation prefers that snapshot and falls back to the
// dispatched name only when no client snapshot is present.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it, test } from "node:test";

import {
  extractClientRequestedModel,
  resolveChatCoreEchoModel,
} from "../../open-sse/handlers/chatCore/echoModel.ts";

test("handleChatCore derives the echo from the client's raw snapshot, not the dispatched leaf", () => {
  const source = readFileSync(
    new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /resolveChatCoreEchoModel\(\{[\s\S]*?clientRequestedModel:\s*extractClientRequestedModel\(clientRawRequest\?\.body\)/,
    "chatCore must wire the echo derivation to the pre-routing client snapshot"
  );
  assert.doesNotMatch(
    source,
    /let echoModel =\s*\n\s*\(settings\.echoRequestedModelName === true/,
    "the old inline leaf-only derivation must be gone"
  );
});

describe("chatCore echo model derivation (#18494)", () => {
  it("extracts the client's model from the raw request snapshot", () => {
    assert.equal(extractClientRequestedModel({ model: "A", messages: [] }), "A");
    assert.equal(extractClientRequestedModel({ model: "  A  " }), "  A  ");
    assert.equal(extractClientRequestedModel({}), null);
    assert.equal(extractClientRequestedModel({ model: "" }), null);
    assert.equal(extractClientRequestedModel({ model: 42 }), null);
    assert.equal(extractClientRequestedModel(null), null);
    assert.equal(extractClientRequestedModel(undefined), null);
    assert.equal(extractClientRequestedModel("not-an-object"), null);
  });

  it("echoes the client's name over the dispatched combo leaf", () => {
    assert.equal(
      resolveChatCoreEchoModel({
        echoEnabled: true,
        requestedModel: "codex/gpt-6-sol",
        clientRequestedModel: "A",
      }),
      "A"
    );
  });

  it("falls back to the dispatched name when no client snapshot carries a model", () => {
    assert.equal(
      resolveChatCoreEchoModel({
        echoEnabled: true,
        requestedModel: "codex/gpt-6-sol",
        clientRequestedModel: null,
      }),
      "codex/gpt-6-sol"
    );
    assert.equal(
      resolveChatCoreEchoModel({
        echoEnabled: true,
        requestedModel: "codex/gpt-6-sol",
        clientRequestedModel: "",
      }),
      "codex/gpt-6-sol"
    );
  });

  it("echo disabled keeps the upstream model untouched (behavior unchanged)", () => {
    assert.equal(
      resolveChatCoreEchoModel({
        echoEnabled: false,
        requestedModel: "codex/gpt-6-sol",
        clientRequestedModel: "A",
      }),
      null
    );
    assert.equal(
      resolveChatCoreEchoModel({
        echoEnabled: true,
        requestedModel: null,
        clientRequestedModel: null,
      }),
      null
    );
  });
});
