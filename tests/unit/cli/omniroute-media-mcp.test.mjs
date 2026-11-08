import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, truncate, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createServer } from "node:http";
import { once } from "node:events";
import { buildMediaRequest, analyzeMedia } from "../../../scripts/cli/omniroute-media-mcp.mjs";

test("media tool sends the exact bytes of four local media types to the configured gateway", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "omni-media-tool-"));
  const fixtures = [
    ["test.pdf", Buffer.from("%PDF-1.4 fixture")],
    ["test.wav", Buffer.from("RIFFxxxxWAVEfmt fixture")],
    ["test.mp4", Buffer.from("xxxxftypmp42fixture")],
    ["test.png", Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0])],
  ];
  const server = createServer(async (request, response) => {
    assert.equal(request.url, "/v1/chat/completions");
    assert.equal(request.headers.authorization, "Bearer fixture");
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks));
    assert.equal(body.model, "auto");
    assert.equal(body.stream, false);
    for (const [index, [, bytes]] of fixtures.entries()) {
      const part = body.messages[0].content[index + 1];
      const data = part.file?.file_data || part.image_url?.url;
      assert.deepEqual(Buffer.from(data.split(",")[1], "base64"), bytes);
    }
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        model: "verified-model",
        choices: [{ message: { content: "grounded analysis" }, finish_reason: "stop" }],
      })
    );
  });
  try {
    await Promise.all(fixtures.map(([name, bytes]) => writeFile(path.join(folder, name), bytes)));
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const result = await analyzeMedia(
      {
        prompt: "Analyze these files",
        files: fixtures.map(([name]) => ({ path: path.join(folder, name) })),
      },
      {
        connection: {
          baseURL: `http://127.0.0.1:${server.address().port}/v1`,
          key: "fixture",
          model: "auto",
        },
      }
    );
    assert.equal(result.answer, "grounded analysis");
    assert.equal(result.output_truncated, false);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await rm(folder, { recursive: true, force: true });
  }
});
test("unsupported contents and oversized files are rejected before inference", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "omni-media-limits-"));
  try {
    const fake = path.join(folder, "not-really.pdf");
    await writeFile(fake, "ordinary text is not a PDF");
    await assert.rejects(
      buildMediaRequest({ prompt: "read", files: [{ path: fake }] }),
      /Unsupported media/
    );
    const large = path.join(folder, "large.mp4");
    await writeFile(large, "");
    await truncate(large, 16 * 1024 * 1024);
    await assert.rejects(buildMediaRequest({ prompt: "read", files: [{ path: large }] }), /20 MiB/);
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test("MCP stdio advertises analysis and sanitizes local file errors", async () => {
  const { Client } = await import("@modelcontextprotocol/sdk/client/index.js");
  const { StdioClientTransport } = await import("@modelcontextprotocol/sdk/client/stdio.js");
  const folder = await mkdtemp(path.join(tmpdir(), "omni-media-protocol-"));
  const config = path.join(folder, "opencode.json");
  const client = new Client({ name: "media-protocol-test", version: "1.0.0" });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.resolve("scripts/cli/omniroute-media-mcp.mjs")],
    env: { OMNIROUTE_MEDIA_CONFIG: config, OMNIROUTE_MEDIA_API_KEY: "fixture" },
    stderr: "pipe",
  });
  try {
    await writeFile(
      config,
      JSON.stringify({
        providers: { omniroute: { settings: { baseURL: "http://localhost:1/v1" } } },
      })
    );
    await client.connect(transport);
    const catalog = await client.listTools();
    assert.deepEqual(
      catalog.tools.map((tool) => tool.name),
      ["analyze_media"]
    );
    const result = await client.callTool({
      name: "analyze_media",
      arguments: { prompt: "read", files: [{ path: path.join(folder, "missing.pdf") }] },
    });
    assert.equal(result.isError, true);
    assert.ok(
      !JSON.stringify(result).includes(folder),
      "filesystem errors must not expose local paths"
    );
  } finally {
    await client.close();
    await rm(folder, { recursive: true, force: true });
  }
});

test("media tool preserves HTTP status for non-JSON and null gateway errors", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "omni-media-errors-"));
  const pdf = path.join(folder, "sample.pdf");
  const originalFetch = globalThis.fetch;
  try {
    await writeFile(pdf, "%PDF-1.4 fixture");
    const input = { prompt: "read", files: [{ path: pdf }] };
    const connection = {
      baseURL: "https://gateway.example/v1",
      key: "private-fixture",
      model: "auto",
    };
    for (const [status, payload] of [
      [413, "<html>too large</html>"],
      [502, "bad gateway"],
      [504, "null"],
    ]) {
      globalThis.fetch = async () => new Response(payload, { status });
      await assert.rejects(
        analyzeMedia(input, { connection }),
        new RegExp(`OmniRoute HTTP ${status}: Media analysis failed`)
      );
    }
    globalThis.fetch = async () =>
      Response.json({ error: { message: "private-fixture " + "x".repeat(2000) } }, { status: 429 });
    await assert.rejects(analyzeMedia(input, { connection }), (error) => {
      assert.match(error.message, /OmniRoute HTTP 429: \[redacted\]/);
      assert.ok(!error.message.includes(connection.key));
      assert.ok(error.message.length < 1100);
      return true;
    });
    for (const payload of ["null", "not JSON", "[]", '"text"']) {
      globalThis.fetch = async () => new Response(payload);
      await assert.rejects(
        analyzeMedia(input, { connection }),
        /non-JSON|invalid JSON|no text analysis/
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
    await rm(folder, { recursive: true, force: true });
  }
});

test("mediaConnection enforces URL and credential boundaries with isolated configuration", async () => {
  const { mediaConnection } = await import("../../../scripts/cli/omniroute-media-mcp.mjs");
  const folder = await mkdtemp(path.join(tmpdir(), "omni-media-config-"));
  const config = path.join(folder, "opencode.json");
  const names = [
    "OMNIROUTE_MEDIA_CONFIG",
    "OMNIROUTE_MEDIA_API_KEY",
    "OMNIROUTE_MEDIA_PROVIDER",
    "OMNIROUTE_MEDIA_MODEL",
    "OMNI_MEDIA_FIXTURE_KEY",
  ];
  const original = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  try {
    for (const name of names) delete process.env[name];
    process.env.OMNIROUTE_MEDIA_CONFIG = config;
    const settings = async (baseURL, apiKey = "fixture") =>
      writeFile(
        config,
        JSON.stringify({ providers: { omniroute: { settings: { baseURL, apiKey } } } })
      );
    for (const url of ["http://example.com/v1", "https://user:pw@host/v1"]) {
      await settings(url);
      await assert.rejects(mediaConnection(), /HTTPS/);
    }
    await settings("http://[::1]/v1/");
    assert.deepEqual(await mediaConnection(), {
      baseURL: "http://[::1]/v1",
      key: "fixture",
      model: "auto",
    });
    await settings("https://gateway.example/v1", "{env:OMNI_MEDIA_FIXTURE_KEY}");
    await assert.rejects(mediaConnection(), /credential is unavailable/);
    process.env.OMNI_MEDIA_FIXTURE_KEY = "referenced";
    assert.equal((await mediaConnection()).key, "referenced");
    process.env.OMNIROUTE_MEDIA_API_KEY = "override";
    assert.equal((await mediaConnection()).key, "override");
    process.env.OMNIROUTE_MEDIA_API_KEY = "{env:UNRESOLVED}";
    await assert.rejects(mediaConnection(), /credential is unavailable/);
  } finally {
    for (const name of names) {
      if (original[name] === undefined) delete process.env[name];
      else process.env[name] = original[name];
    }
    await rm(folder, { recursive: true, force: true });
  }
});
