// The `tui` dispatch seam: transport selection, the prompt it sends, and the
// bodies it returns. Nothing here spawns agy — the turn itself is covered by the
// screen, hook and transcript suites, and needs a POSIX pty to run at all.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import {
  agyModelId,
  executeViaAgyTui,
  findAgyBinary,
  lastUserText,
  resolveAgyTransport,
  tuiConversationKey,
  tuiJsonBody,
  tuiSseBody,
  tuiWorkspace,
} from "../../open-sse/executors/agyCliTuiExecutor.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { buildErrorBody } from "../../open-sse/utils/error.ts";

const dirs: string[] = [];

function temporaryDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-tui-exec-test-"));
  dirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of dirs) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* a handle Windows has not released yet */
    }
  }
});

function credentials(transport?: string): ProviderCredentials {
  return {
    connectionId: "conn-1",
    providerSpecificData: transport === undefined ? {} : { transport },
  } as ProviderCredentials;
}

describe("agyCliTuiExecutor — transport selection", () => {
  it("defaults to http, so a typo never moves traffic onto the CLI", () => {
    assert.equal(resolveAgyTransport(credentials(), {}), "http");
    assert.equal(resolveAgyTransport(credentials("tui"), {}), "tui");
    assert.equal(resolveAgyTransport(credentials("bogus"), {}), "http");
    assert.equal(resolveAgyTransport(credentials("TUI"), {}), "tui");
  });

  it("leaves `acp` on http, because this branch carries only the tui path", () => {
    // The ACP transport is its own PR (#20315); until it lands, an `acp`
    // connection must keep behaving like the HTTP one it was before.
    assert.equal(resolveAgyTransport(credentials("acp"), {}), "http");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "acp" }), "http");
  });

  it("takes the deployment default from the environment", () => {
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "tui" }), "tui");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: " TUI " }), "tui");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "nope" }), "http");
  });

  it("lets one connection override the deployment default", () => {
    const env = { AGY_CLI_TRANSPORT: "tui" };
    assert.equal(resolveAgyTransport(credentials("http"), env), "http");
    assert.equal(resolveAgyTransport(credentials("tui"), { AGY_CLI_TRANSPORT: "http" }), "tui");
  });
});

describe("agyCliTuiExecutor — the request", () => {
  const envelope = (role: string, text: string) => ({
    contents: [
      { role: "user", parts: [{ text: "an earlier question" }] },
      { role: "model", parts: [{ text: "an earlier answer" }] },
      { role, parts: [{ text }] },
    ],
  });

  it("sends only the last user turn, because agy keeps the history", () => {
    assert.equal(lastUserText(envelope("user", "the actual question")), "the actual question");
  });

  it("reads the envelope wrapped in `request`, as the translator writes it", () => {
    assert.equal(lastUserText({ request: envelope("user", "wrapped") }), "wrapped");
  });

  it("joins the parts of the turn and ignores a non-text part", () => {
    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: "line one" },
            { inlineData: { mimeType: "image/png" } },
            { text: "line two" },
          ],
        },
      ],
    };
    assert.equal(lastUserText(body), "line one\nline two");
  });

  it("returns nothing when there is no user turn to send", () => {
    assert.equal(lastUserText({ contents: [{ role: "model", parts: [{ text: "hi" }] }] }), "");
    assert.equal(lastUserText({}), "");
    assert.equal(lastUserText(null), "");
  });

  it("continues a conversation only when the id is one agy minted", () => {
    const uuid = "0f3d4c1e-2b3a-4c5d-8e9f-0123456789ab";
    assert.equal(tuiConversationKey({ sessionId: uuid }), uuid);
    // A slug is not a conversation agy can resolve.
    assert.equal(tuiConversationKey({ sessionId: "connection:conn-1" }), null);
    assert.equal(tuiConversationKey({}), null);
  });
});

describe("agyCliTuiExecutor — the response", () => {
  it("renders a streamed turn in the envelope the HTTP path uses", () => {
    const body = tuiSseBody("gemini-3-pro", "the answer");
    assert.match(body, /^data: /);
    assert.match(body, /data: \[DONE\]/);
    const frame = JSON.parse(body.split("\n")[0].slice(6)) as Record<string, unknown>;
    const response = frame.response as Record<string, unknown>;
    const candidate = (response.candidates as Array<Record<string, unknown>>)[0];
    assert.equal(candidate.finishReason, "STOP");
    assert.equal(response.modelVersion, "gemini-3-pro");
  });

  it("renders a non-streamed turn as one Antigravity body", () => {
    const body = tuiJsonBody("gemini-3-pro", "the answer") as {
      response: { candidates: Array<{ content: { parts: Array<{ text: string }> } }> };
    };
    assert.equal(body.response.candidates[0].content.parts[0].text, "the answer");
  });

  it("strips the router's provider prefix from the model name", () => {
    assert.equal(agyModelId("antigravity/gemini-3-pro"), "gemini-3-pro");
    assert.equal(agyModelId("agy/gemini-3-pro"), "gemini-3-pro");
    assert.equal(agyModelId("gemini-3-pro"), "gemini-3-pro");
  });
});

describe("agyCliTuiExecutor — the failure surface", () => {
  it("reports a missing user turn as a 400, without touching a pty", async () => {
    const result = await executeViaAgyTui({
      model: "gemini-3-pro",
      body: { contents: [] },
      stream: false,
    });
    const body = (await result.response.json()) as ReturnType<typeof buildErrorBody>;
    assert.equal(result.response.status, 400);
    assert.match(body.error.message, /no user text/);
  });

  it("refuses a host with no pseudo-terminal, saying which transport to use", async () => {
    if (process.platform !== "win32") return; // the only host this test can assert on
    const result = await executeViaAgyTui({
      model: "gemini-3-pro",
      body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      stream: true,
    });
    const body = (await result.response.json()) as ReturnType<typeof buildErrorBody>;
    assert.equal(result.response.status, 501);
    assert.match(body.error.message, /pseudo-terminal/);
    assert.match(body.error.message, /http transport/);
  });

  it("uses the same error envelope as every other executor", async () => {
    const result = await executeViaAgyTui({
      model: "gemini-3-pro",
      body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      stream: true,
    });
    const body = (await result.response.json()) as ReturnType<typeof buildErrorBody>;
    assert.equal(typeof body.error.message, "string");
    assert.equal(typeof body.error.type, "string");
    // A stack trace must never reach the caller (Hard Rule #12).
    assert.equal(JSON.stringify(body).includes("at "), false);
  });
});

describe("agyCliTuiExecutor — the machine", () => {
  it("finds an agy named by AGY_PATH", () => {
    const dir = temporaryDir();
    const file = path.join(dir, process.platform === "win32" ? "agy.exe" : "agy");
    fs.writeFileSync(file, "#!/bin/sh\n", "utf8");
    assert.equal(findAgyBinary({ AGY_PATH: file }), file);
  });

  it("finds an agy on PATH", () => {
    const dir = temporaryDir();
    const name = process.platform === "win32" ? "agy.exe" : "agy";
    fs.writeFileSync(path.join(dir, name), "#!/bin/sh\n", "utf8");
    assert.equal(findAgyBinary({ PATH: dir }), path.join(dir, name));
  });

  it("reports no agy rather than guessing a path", () => {
    assert.equal(findAgyBinary({ PATH: temporaryDir() }), null);
    assert.equal(findAgyBinary({ AGY_PATH: path.join(temporaryDir(), "nope") }), null);
  });

  it("works in a dedicated folder, not the proxy's own", () => {
    const dir = temporaryDir();
    assert.equal(tuiWorkspace({ OMNIROUTE_AGY_TUI_CWD: dir }), dir);
    // Default: created if missing, and never the current working directory.
    const fallback = tuiWorkspace({});
    assert.notEqual(path.resolve(fallback), path.resolve(process.cwd()));
    assert.equal(fs.existsSync(fallback), true);
  });
});
