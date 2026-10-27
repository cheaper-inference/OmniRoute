import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";

// #18007: chatCore passes upstreamStream=true to the executor for forceStream providers,
// but a client-sent body.stream === false stayed in the outgoing body -> WorkBuddy 11101.
const creds = { accessToken: "tok", providerSpecificData: {} } as never;
const baseBody = () => ({
  model: "kimi-k3",
  max_tokens: 60,
  messages: [{ role: "user", content: "hi" }],
});

describe("forceStream provider + explicit stream:false in client body (#18007)", () => {
  it("registry: workbuddy declares forceStream", () => {
    assert.equal(REGISTRY.workbuddy.forceStream, true);
  });

  for (const provider of ["workbuddy", "cline", "kimi"]) {
    it(`${provider}: executor stream=true forced + body.stream:false -> upstream body has stream:true`, async () => {
      const executor = await getExecutor(provider);
      const out = (await executor.transformRequest(
        "kimi-k3",
        { ...baseBody(), stream: false },
        true,
        creds
      )) as Record<string, unknown>;
      assert.equal(out.stream, true, `outgoing stream was ${String(out.stream)}`);
    });
  }

  it("workbuddy: disableStreamOptions still forces stream:true without stream_options", async () => {
    const executor = await getExecutor("workbuddy");
    const out = (await executor.transformRequest(
      "kimi-k3",
      { ...baseBody(), stream: false, stream_options: { include_usage: true } },
      true,
      { accessToken: "tok", providerSpecificData: { disableStreamOptions: true } } as never
    )) as Record<string, unknown>;
    assert.equal(out.stream, true);
    assert.equal(out.stream_options, undefined);
  });

  it("control: stream omitted -> stream:true", async () => {
    const executor = await getExecutor("workbuddy");
    const out = (await executor.transformRequest("kimi-k3", baseBody(), true, creds)) as Record<
      string,
      unknown
    >;
    assert.equal(out.stream, true);
  });

  it("control: non-forceStream provider, stream:false/executor false -> stays false", async () => {
    const executor = await getExecutor("openai");
    const out = (await executor.transformRequest(
      "gpt-4o",
      { ...baseBody(), model: "gpt-4o", stream: false },
      false,
      creds
    )) as Record<string, unknown>;
    assert.equal(out.stream, false);
  });
});
