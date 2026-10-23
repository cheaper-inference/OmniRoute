import test from "node:test";
import assert from "node:assert/strict";

async function loadGateway() {
  return import("../../open-sse/executors/minimaxCodeGateway.ts");
}

async function loadExecutor() {
  return import("../../open-sse/executors/minimax-code.ts");
}

/**
 * The effort level of one request.
 *
 * The MiniMax Code product declares the levels for MiniMax-M3.1-Flash:
 * `effortOptions = ['default', 'low', 'medium', 'high', 'xhigh', 'max']`.
 * The managed gateway takes the level as the `effort` field of
 * `output_config` of the request, the CLI takes it as `--effort`, and the
 * shared agent takes it as the `thinkingEffort` option of the session.
 */
test("the level of a request is taken from the OpenAI field", async () => {
  const { resolveEffort } = await loadGateway();
  assert.equal(resolveEffort({ reasoning_effort: "high" }), "high");
});

test("the level of a request is taken from the Anthropic field", async () => {
  const { resolveEffort } = await loadGateway();
  assert.equal(resolveEffort({ output_config: { effort: "xhigh" } }), "xhigh");
});

test("the level of a request is taken from the nested field", async () => {
  const { resolveEffort } = await loadGateway();
  assert.equal(resolveEffort({ reasoning: { effort: "medium" } }), "medium");
});

test("the level of the request wins over the default of the deployment", async () => {
  const { resolveEffort } = await loadGateway();
  const before = process.env.MINIMAX_CODE_EFFORT;
  try {
    process.env.MINIMAX_CODE_EFFORT = "low";
    assert.equal(resolveEffort({ reasoning_effort: "max" }), "max");
    assert.equal(resolveEffort({}), "low");
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_EFFORT;
    else process.env.MINIMAX_CODE_EFFORT = before;
  }
});

test("default means the provider decides and is not sent", async () => {
  const { resolveEffort } = await loadGateway();
  const before = process.env.MINIMAX_CODE_EFFORT;
  try {
    process.env.MINIMAX_CODE_EFFORT = "default";
    assert.equal(resolveEffort({}), undefined);
    assert.equal(resolveEffort({ reasoning_effort: "default" }), undefined);
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_EFFORT;
    else process.env.MINIMAX_CODE_EFFORT = before;
  }
});

test("a level the catalog does not offer is dropped", async () => {
  const { resolveEffort } = await loadGateway();
  const before = process.env.MINIMAX_CODE_EFFORT;
  try {
    delete process.env.MINIMAX_CODE_EFFORT;
    assert.equal(resolveEffort({ reasoning_effort: "enormous" }), undefined);
    // The level is read in lower case, so a client that writes 'HIGH' still
    // gets the level it asked for.
    assert.equal(resolveEffort({ reasoning_effort: "HIGH" }), "high");
    assert.equal(resolveEffort({ reasoning_effort: "  max  " }), "max");
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_EFFORT;
    else process.env.MINIMAX_CODE_EFFORT = before;
  }
});

test("the payload of the gateway carries the level", async () => {
  const { buildGatewayPayload } = await loadGateway();
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "hi" }], reasoning_effort: "max" },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(payload.output_config?.effort, "max");
});

test("the payload of the gateway carries no level when none was asked for", async () => {
  const { buildGatewayPayload } = await loadGateway();
  const before = process.env.MINIMAX_CODE_EFFORT;
  try {
    delete process.env.MINIMAX_CODE_EFFORT;
    const payload = buildGatewayPayload(
      { messages: [{ role: "user", content: "hi" }] },
      "MiniMax-M3.1-Flash"
    );
    assert.equal(payload.output_config, undefined);
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_EFFORT;
    else process.env.MINIMAX_CODE_EFFORT = before;
  }
});

test("the local run takes the level as a flag of the CLI", async () => {
  const { buildMinimaxCodeExecArgs } = await loadExecutor();
  const args = buildMinimaxCodeExecArgs({
    model: "MiniMax-M3.1-Flash",
    cwd: "/tmp",
    effort: "max",
  });
  const index = args.indexOf("--effort");
  assert.notEqual(index, -1);
  assert.equal(args[index + 1], "max");
});

test("a run without a level takes no flag", async () => {
  const { buildMinimaxCodeExecArgs } = await loadExecutor();
  const args = buildMinimaxCodeExecArgs({ model: "MiniMax-M3.1-Flash", cwd: "/tmp" });
  assert.equal(args.includes("--effort"), false);
});

test("a model without levels runs without the level", async () => {
  const { resolveModelEffort } = await loadExecutor();
  const before = process.env.MINIMAX_CODE_EFFORT;
  try {
    delete process.env.MINIMAX_CODE_EFFORT;
    // The catalog declares no levels for MiniMax-M3: its thinking is
    // switchable instead, and the CLI refuses `--effort` for such a model.
    assert.equal(resolveModelEffort("MiniMax-M3", { reasoning_effort: "max" }), undefined);
    assert.equal(resolveModelEffort("MiniMax-M3.1-Flash", { reasoning_effort: "max" }), "max");
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_EFFORT;
    else process.env.MINIMAX_CODE_EFFORT = before;
  }
});
