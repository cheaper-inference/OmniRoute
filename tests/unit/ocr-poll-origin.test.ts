import { test } from "node:test";
import assert from "node:assert/strict";
import { handleOcr } from "../../open-sse/handlers/ocr.ts";

// Azure Document Intelligence answers the submit with an Operation-Location header, and the
// poll that follows sends Ocp-Apim-Subscription-Key. fetch() keeps that custom header across
// a cross-origin redirect, so the handler polls only the endpoint the request went to and
// refuses redirects.

const ENDPOINT = "https://r.cognitiveservices.azure.com";
const OPERATION = `${ENDPOINT}/documentintelligence/documentModels/prebuilt-read/analyzeResults/1`;

type Step = { status: number; headers?: Record<string, string>; json?: unknown };

function fetchStub(script: Step[]) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const impl = async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const step = script.shift();
    if (!step) return new Response("unexpected", { status: 500 });
    return new Response(step.json !== undefined ? JSON.stringify(step.json) : null, {
      status: step.status,
      headers: { "Content-Type": "application/json", ...(step.headers ?? {}) },
    });
  };
  return { impl, calls };
}

function runOcr(impl: (url: string, init: RequestInit) => Promise<Response>) {
  return handleOcr({
    body: {
      model: "azure-document-intelligence/prebuilt-read",
      document: { type: "document_url", document_url: "https://x/d.pdf" },
    },
    credentials: { apiKey: "azure-subscription-key-71b2", baseUrl: ENDPOINT },
    fetchImpl: impl,
    sleepImpl: async () => {},
  });
}

const succeeded = { status: "succeeded", analyzeResult: { content: "# md", pages: [{}] } };

for (const [label, location] of [
  ["another host", "https://collector.example/op/1"],
  ["plain http on the same host", OPERATION.replace("https:", "http:")],
  ["another port on the same host", OPERATION.replace(".com/", ".com:8443/")],
  ["a subdomain of the endpoint", OPERATION.replace("https://", "https://x.")],
]) {
  test(`azure DI: an Operation-Location on ${label} is not polled`, async () => {
    const { impl, calls } = fetchStub([
      { status: 202, headers: { "Operation-Location": location } },
      { status: 200, json: succeeded },
    ]);
    const res = await runOcr(impl);
    assert.equal(res.status, 502);
    assert.equal(calls.length, 1, "only the submit request may be sent");
  });
}

test("azure DI: a poll that answers with a redirect is refused, not followed", async () => {
  const { impl, calls } = fetchStub([
    { status: 202, headers: { "Operation-Location": OPERATION } },
    { status: 302, headers: { location: "https://collector.example/steal" } },
    { status: 200, json: succeeded },
  ]);
  const res = await runOcr(impl);
  assert.equal(res.status, 502);
  assert.match((await res.json()).error.message, /redirect/);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].init.redirect, "manual");
});

test("azure DI: a same-origin Operation-Location is polled with the key", async () => {
  const { impl, calls } = fetchStub([
    { status: 202, headers: { "Operation-Location": OPERATION } },
    { status: 200, json: succeeded },
  ]);
  const res = await runOcr(impl);
  assert.equal(res.status, 200);
  assert.equal(calls[1].url, OPERATION);
  assert.equal(calls[1].init.redirect, "manual");
});
