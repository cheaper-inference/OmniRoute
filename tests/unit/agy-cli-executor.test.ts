// The opt-in ACP transport at the executor seam: which requests take it, what
// it hands downstream, and what a caller sees when it fails.
//
// The transport itself is covered by agy-cli-acp.test.ts with a fake agy; here
// the question is whether Antigravity can be driven through it without the HTTP
// path changing for anyone who did not ask.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  agyErrorResponse,
  agyJsonBody,
  agyModelId,
  agySseBody,
  bridgeTools,
  clientInstructions,
  conversationKey,
  declaredTools,
  finishReasonOf,
  replyParts,
  resolveAgyTransport,
} from "../../open-sse/executors/agyCliExecutor.ts";
import { AgyTurnError } from "../../open-sse/services/agyCliAcp.ts";
import { ANTIGRAVITY_DEFAULT_SYSTEM } from "../../open-sse/config/constants.ts";

const credentials = (extra: Record<string, unknown> = {}) =>
  ({ accessToken: "t", connectionId: "conn-1", ...extra }) as Parameters<
    typeof resolveAgyTransport
  >[0];

describe("resolveAgyTransport", () => {
  it("defaults to HTTP — the anti-ban path is never taken by accident", () => {
    assert.equal(resolveAgyTransport(credentials(), {}), "http");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "" }), "http");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "http" }), "http");
  });

  it("takes ACP only when explicitly asked", () => {
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "acp" }), "acp");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "ACP" }), "acp");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: " acp " }), "acp");
  });

  it("does not treat a typo as an opt-in", () => {
    for (const value of ["acpp", "acp2", "yes", "1", "on", "true"]) {
      assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: value }), "http", value);
    }
  });

  it("lets one connection override the deployment default", () => {
    assert.equal(
      resolveAgyTransport(credentials({ providerSpecificData: { transport: "acp" } }), {}),
      "acp"
    );
    assert.equal(
      resolveAgyTransport(credentials({ providerSpecificData: { transport: "http" } }), {
        AGY_CLI_TRANSPORT: "acp",
      }),
      "http"
    );
  });

  it("ignores a non-string transport rather than guessing", () => {
    assert.equal(
      resolveAgyTransport(credentials({ providerSpecificData: { transport: true } }), {}),
      "http"
    );
    assert.equal(
      resolveAgyTransport(credentials({ providerSpecificData: null }), {
        AGY_CLI_TRANSPORT: "acp",
      }),
      "acp"
    );
  });
});

describe("reading the declared tools", () => {
  const withTools = {
    request: {
      contents: [],
      tools: [
        {
          functionDeclarations: [
            {
              name: "read_file",
              description: "Read a file",
              parameters: { type: "object", properties: { path: { type: "string" } } },
            },
            { name: "list_dir", parameters: { type: "object", properties: {} } },
          ],
        },
      ],
    },
  };

  it("pulls the declarations out of the envelope", () => {
    assert.deepEqual(
      declaredTools(withTools).map((tool) => tool.name),
      ["read_file", "list_dir"]
    );
  });

  it("maps Gemini's parameters onto the inputSchema agy reads", () => {
    const [tool] = bridgeTools(withTools);
    assert.equal(tool.name, "read_file");
    assert.equal(tool.description, "Read a file");
    assert.deepEqual(tool.inputSchema, {
      type: "object",
      properties: { path: { type: "string" } },
    });
  });

  it("keeps an already-shaped inputSchema", () => {
    const [tool] = bridgeTools({
      tools: [{ functionDeclarations: [{ name: "x", inputSchema: { type: "object" } }] }],
    });
    assert.deepEqual(tool.inputSchema, { type: "object" });
  });

  it("drops declarations without a usable name", () => {
    assert.deepEqual(
      bridgeTools({
        tools: [{ functionDeclarations: [{ name: "" }, {}, { name: 5 }, { name: "ok" }] }],
      }).map((tool) => tool.name),
      ["ok"]
    );
  });

  it("says no tools when the request declared none", () => {
    assert.deepEqual(bridgeTools({ request: { contents: [] } }), []);
    assert.deepEqual(bridgeTools(null), []);
    assert.deepEqual(bridgeTools("nope"), []);
  });
});

describe("agyModelId", () => {
  it("strips the provider prefix agy does not know", () => {
    assert.equal(agyModelId("antigravity/gemini-3-pro"), "gemini-3-pro");
    assert.equal(agyModelId("agy/gemini-3-pro"), "gemini-3-pro");
    assert.equal(agyModelId("gemini-3-pro"), "gemini-3-pro");
  });
});

describe("conversationKey", () => {
  it("uses the request's session id when it carries one", () => {
    assert.equal(conversationKey(credentials(), { request: { sessionId: "s-1" } }), "s-1");
    assert.equal(conversationKey(credentials(), { sessionId: "s-2" }), "s-2");
  });

  it("falls back to the connection so turns keep one session", () => {
    // A key per request would start a new agy session every turn and lose the
    // conversation the client keeps resending.
    assert.equal(conversationKey(credentials(), {}), "connection:conn-1");
    assert.equal(conversationKey(credentials({ connectionId: "" }), {}), "connection:default");
  });

  it("ignores an empty session id", () => {
    assert.equal(conversationKey(credentials(), { sessionId: "" }), "connection:conn-1");
  });
});

describe("clientInstructions", () => {
  it("drops Antigravity's own default, which is not the client's", () => {
    assert.equal(clientInstructions(ANTIGRAVITY_DEFAULT_SYSTEM), "");
    assert.equal(clientInstructions(""), "");
    assert.equal(clientInstructions("   "), "");
  });

  it("keeps a genuine session instruction", () => {
    assert.equal(clientInstructions("always answer in French"), "always answer in French");
  });
});

describe("replyParts", () => {
  it("puts the text and the calls in one candidate, in that order", () => {
    const reply = replyParts({
      text: "reading it now",
      toolCalls: [{ name: "read_file", arguments: { path: "a.txt" } }],
      stopReason: "end_turn",
    });
    assert.equal(reply.parts.length, 2);
    assert.deepEqual(reply.parts[0], { text: "reading it now" });
    assert.deepEqual(reply.parts[1], {
      functionCall: { name: "read_file", args: { path: "a.txt" }, id: "agy_call_0" },
    });
  });

  it("emits an empty part list rather than a text part with nothing in it", () => {
    const reply = replyParts({ text: "", toolCalls: [], stopReason: "end_turn" });
    assert.deepEqual(reply.parts, []);
  });

  it("gives each call its own id so results can be matched", () => {
    const reply = replyParts({
      text: "",
      toolCalls: [
        { name: "a", arguments: {} },
        { name: "b", arguments: {} },
      ],
      stopReason: "end_turn",
    });
    const ids = reply.parts.map(
      (part) => (part.functionCall as { id: string } | undefined)?.id ?? null
    );
    assert.deepEqual(ids, ["agy_call_0", "agy_call_1"]);
  });

  it("replaces a non-object argument set rather than sending it on", () => {
    const reply = replyParts({
      text: "",
      toolCalls: [{ name: "a", arguments: "not an object" }],
      stopReason: "end_turn",
    });
    assert.deepEqual((reply.parts[0].functionCall as { args: unknown }).args, {});
  });
});

describe("finishReasonOf", () => {
  it("reports STOP for a normal end", () => {
    assert.equal(finishReasonOf("end_turn", false), "STOP");
    assert.equal(finishReasonOf("", false), "STOP");
  });

  it("maps a length stop onto MAX_TOKENS", () => {
    assert.equal(finishReasonOf("max_tokens", false), "MAX_TOKENS");
    assert.equal(finishReasonOf("max-tokens", false), "MAX_TOKENS");
    assert.equal(finishReasonOf("length", false), "MAX_TOKENS");
  });

  it("maps a refusal onto SAFETY, which clients read as a refusal", () => {
    assert.equal(finishReasonOf("refusal", false), "SAFETY");
    assert.equal(finishReasonOf("blocked", false), "SAFETY");
  });

  it("stays STOP when calls were emitted, so the client gets to run them", () => {
    assert.equal(finishReasonOf("max_tokens", true), "STOP");
  });
});

describe("the rendered bodies", () => {
  const reply = replyParts({
    text: "done",
    toolCalls: [{ name: "read_file", arguments: { path: "a.txt" } }],
    stopReason: "end_turn",
  });

  it("wraps the stream frame in `response`, the envelope HTTP sends", () => {
    const body = agySseBody("gemini-3-pro", reply);
    const first = body.split("\n\n")[0];
    assert.match(first, /^data: /);
    const parsed = JSON.parse(first.slice("data: ".length));
    assert.ok(parsed.response, "the frame is wrapped");
    assert.equal(parsed.response.candidates[0].content.role, "model");
    assert.equal(parsed.response.candidates[0].finishReason, "STOP");
    assert.equal(parsed.response.modelVersion, "gemini-3-pro");
  });

  it("ends the stream so the reader does not wait for more", () => {
    assert.match(agySseBody("m", reply), /data: \[DONE\]\n\n$/);
  });

  it("sends the same candidate as one JSON body", () => {
    const body = agyJsonBody("gemini-3-pro", reply);
    assert.deepEqual(body.response.candidates[0].content.parts, reply.parts);
    assert.equal((body.response as { modelVersion: string }).modelVersion, "gemini-3-pro");
  });
});

describe("agyErrorResponse", () => {
  it("keeps the status the transport derived from agy's own words", () => {
    assert.equal(agyErrorResponse(new AgyTurnError("spent", 402)).status, 402);
    assert.equal(agyErrorResponse(new AgyTurnError("quota", 429)).status, 429);
    assert.equal(agyErrorResponse(new AgyTurnError("bad request", 400)).status, 400);
  });

  it("reports an unexpected failure as a bad gateway", () => {
    assert.equal(agyErrorResponse(new Error("boom")).status, 502);
    assert.equal(agyErrorResponse("not even an error").status, 502);
  });

  it("never leaks a stack trace to the caller", async () => {
    const error = new Error("upstream exploded");
    error.stack = "Error: upstream exploded\n    at secret.ts:1:1";
    const body = await agyErrorResponse(error).text();
    assert.doesNotMatch(body, /at secret\.ts/);
    assert.doesNotMatch(body, /\n\s+at /);
  });

  it("classifies the error the way a client's retry logic reads it", async () => {
    const read = async (response: Response) => JSON.parse(await response.text());
    assert.equal(
      (await read(agyErrorResponse(new AgyTurnError("x", 429)))).error.type,
      "rate_limit_error"
    );
    assert.equal(
      (await read(agyErrorResponse(new AgyTurnError("x", 402)))).error.type,
      "rate_limit_error"
    );
    assert.equal(
      (await read(agyErrorResponse(new AgyTurnError("x", 500)))).error.type,
      "provider_error"
    );
    assert.equal(
      (await read(agyErrorResponse(new AgyTurnError("x", 400)))).error.type,
      "invalid_request_error"
    );
  });

  it("keeps agy's own words as the message", async () => {
    const parsed = JSON.parse(
      await agyErrorResponse(new AgyTurnError("agy: not signed in", 401)).text()
    );
    assert.equal(parsed.error.message, "agy: not signed in");
  });
});
