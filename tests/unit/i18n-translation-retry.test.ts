import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { translateBody } from "../../scripts/i18n/run-translation.mjs";

type Message = { role: string; content: string };
const source = "## Limit\n\nKeep the literal `(token, IP)` unchanged.";
const invalid = "## Limite\n\nMantenha o literal `(token, endereço)` inalterado.";
const valid = "## Limite\n\nMantenha o literal `(token, IP)` inalterado.";
const locale = { code: "pt-BR", english: "Portuguese", native: "Português" };

async function fixture(
  t: { after: (fn: () => Promise<void>) => void },
  correctOnFeedback: boolean
) {
  const requests: Message[][] = [];
  const server = createServer(async (request, response) => {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const { messages } = JSON.parse(Buffer.concat(chunks).toString()) as { messages: Message[] };
    requests.push(messages);
    const feedback = messages
      .slice(2)
      .some(
        (message) => message.role === "user" && message.content.includes("inline code changed")
      );
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        choices: [{ message: { content: correctOnFeedback && feedback ? valid : invalid } }],
      })
    );
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  });
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return {
    requests,
    backend: {
      apiUrl: `http://127.0.0.1:${address.port}`,
      apiKey: "fixture-only",
      model: "fixture",
      timeoutMs: 5000,
    },
  };
}

test("translation retry supplies validation feedback and preserves the literal", async (t) => {
  const { backend, requests } = await fixture(t, true);
  assert.equal(await translateBody(source, locale, backend), valid);
  assert.equal(requests.length, 2);
  assert.equal(requests[1][1].content, source);
  assert.ok(
    requests[1].some((message) => message.role === "assistant" && message.content === invalid)
  );
  assert.ok(
    requests[1].some(
      (message) => message.role === "user" && message.content.includes("`(token, IP)`")
    )
  );
});

test("translation retry still rejects content that remains invalid", async (t) => {
  const { backend, requests } = await fixture(t, false);
  await assert.rejects(
    translateBody(source, locale, backend),
    /failed validation: inline code changed/
  );
  assert.equal(requests.length, 3);
});
