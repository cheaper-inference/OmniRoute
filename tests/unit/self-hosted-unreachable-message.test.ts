import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  handleSelfHostedCompletions,
  parseProvidersYaml,
} from "../../open-sse/services/selfHostedEntry.ts";

/**
 * The self-hosted entry must not echo network-level or config-parser error text
 * to the client (Hard Rule #12): a refused connection exposes internal hosts and
 * ports, and a parser message can quote the config document.
 */

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("selfHostedEntry client error messages", () => {
  it("returns a generic server_error 502 when the upstream connection is refused", async () => {
    globalThis.fetch = (async () => {
      throw new Error("connect ECONNREFUSED 10.0.0.5:11434");
    }) as typeof fetch;

    const providers = `providers:
  - id: local
    kind: openai
    baseUrl: http://10.0.0.5:11434/v1
    model: llama3
`;
    const body = { model: "local/llama3", messages: [{ role: "user", content: "hi" }] };
    const resp = await handleSelfHostedCompletions(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      }),
      body,
      { providers }
    );

    assert.equal(resp?.status, 502);
    const text = await resp!.text();
    assert.doesNotMatch(text, /10\.0\.0\.5|11434|ECONNREFUSED/);
    const parsed = JSON.parse(text);
    assert.equal(parsed.error.message, "Upstream provider unreachable");
    assert.equal(parsed.error.type, "server_error");
  });

  it("returns a 500 without the parser's error text when the config fails to parse", async () => {
    const providers = "providers: nope";
    let parserMessage = "";
    try {
      parseProvidersYaml(providers);
    } catch (error) {
      parserMessage = (error as Error).message;
    }
    assert.ok(parserMessage, "fixture must make the parser throw");

    const resp = await handleSelfHostedCompletions(
      new Request("http://localhost/v1/chat/completions"),
      { model: "gpt-4o", messages: [] },
      { providers }
    );

    assert.equal(resp?.status, 500);
    const text = await resp!.text();
    const parsed = JSON.parse(text);
    assert.ok(parsed.error);
    assert.equal(text.includes(parserMessage), false);
    assert.doesNotMatch(parsed.error.message, /providers list|nope/);
  });

  it("keeps a YAML syntax error's source snippet (and the key in it) out of the 500 and the log", async () => {
    const providers = "providers:\n  - id: a\n    apiKey: sk-test-secret-value\n    x: [";
    const logged: string[] = [];
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      logged.push(args.map(String).join(" "));
    };
    let resp: Response | null;
    try {
      resp = await handleSelfHostedCompletions(
        new Request("http://localhost/v1/chat/completions"),
        { model: "gpt-4o", messages: [] },
        { providers }
      );
    } finally {
      console.error = originalError;
    }

    assert.equal(resp?.status, 500);
    assert.doesNotMatch(await resp!.text(), /sk-test-secret-value|unexpected end/);
    assert.doesNotMatch(logged.join("\n"), /sk-test-secret-value/);
  });
});
