// The local / self-hosted provider exemption must not skip the cloud-metadata block.
// The policy says cloud metadata stays blocked regardless; the dispatch guard returned before
// checking it. Fetch is stubbed; no network.
import test from "node:test";
import assert from "node:assert/strict";
import { assertDispatchUrlAllowed } from "../../open-sse/executors/dispatchPin.ts";

test("IMDS link-local address is blocked for a cloud provider (control)", () => {
  assert.throws(() =>
    assertDispatchUrlAllowed("openai", "http://169.254.169.254/latest/meta-data/")
  );
});

for (const provider of ["vllm", "ollama-local", "lm-studio", "llama-cpp"]) {
  test(`IMDS link-local address is also blocked for local provider ${provider}`, () => {
    assert.throws(() =>
      assertDispatchUrlAllowed(
        provider,
        "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
      )
    );
  });
}

test("a local provider keeps its ordinary loopback base URL allowed", () => {
  assert.doesNotThrow(() =>
    assertDispatchUrlAllowed("vllm", "http://127.0.0.1:11434/v1/chat/completions")
  );
});

test("a self-hosted chat provider keeps a LAN base URL allowed", () => {
  assert.doesNotThrow(() =>
    assertDispatchUrlAllowed("openai-compatible", "http://192.168.1.20:8000/v1")
  );
});

test("execute() for vllm never sends its key to the cloud-metadata address", async () => {
  const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
  const seen: string[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: unknown, init: RequestInit) => {
    seen.push(`${String(url)} auth=${init?.headers ? "present" : "absent"}`);
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    await new DefaultExecutor("vllm").execute({
      model: "m",
      body: { model: "m", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "sk-test-not-real",
        connectionId: "c4",
        providerSpecificData: { baseUrl: "http://169.254.169.254/latest/meta-data" },
      },
    } as never);
  } catch {
    // expected: the guard must reject the dispatch before any fetch
  } finally {
    globalThis.fetch = realFetch;
  }
  assert.equal(seen.length, 0, "metadata address must never be fetched");
});
