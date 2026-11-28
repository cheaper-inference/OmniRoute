// The `tui` dispatch seam: transport selection, the prompt it sends, and the
// bodies it returns. Nothing here spawns agy or `script`, and nothing reads or
// writes the operator's home: discovery runs against a fake agy on an isolated
// PATH and HOME, and the turn itself is a stub — the real one is covered by the
// screen, hook and transcript suites, and needs a POSIX pty to run at all.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import {
  agyModelId,
  executeViaAgyTui,
  lastUserText,
  tuiConversationKey,
  tuiJsonBody,
  tuiModelVersion,
  tuiSseBody,
  tuiWorkspace,
} from "../../open-sse/executors/agyCliTuiExecutor.ts";
import { resolveAgyTransport } from "../../open-sse/executors/agyCliExecutor.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { findAgyBinary } from "../../open-sse/services/agyCliPlatform.ts";
import type { AgyTuiRequest, AgyTuiResult } from "../../open-sse/services/agyTuiRunner.ts";
import { buildErrorBody } from "../../open-sse/utils/error.ts";

const dirs: string[] = [];

function temporaryDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-tui-exec-test-"));
  dirs.push(dir);
  return dir;
}

/** An executable stand-in for agy. Nothing runs it: discovery only looks. */
function fakeAgy(dir: string, name: string): string {
  const file = path.join(dir, name);
  fs.writeFileSync(file, "#!/bin/sh\n", { encoding: "utf8", mode: 0o755 });
  return file;
}

/**
 * Run `body` against an isolated machine: PATH, HOME and every other folder
 * discovery derives a candidate from point at fresh temp directories, so the
 * operator's own agy (under `~/.local/bin`, say) is never found and their
 * `~/.gemini` is never the home a turn would write its hook entry into.
 */
async function isolatedMachine<T>(
  overrides: Record<string, string>,
  body: () => Promise<T>
): Promise<T> {
  const keys = [
    "PATH",
    "Path",
    "AGY_PATH",
    "HOME",
    "USERPROFILE",
    "LOCALAPPDATA",
    "XDG_DATA_HOME",
    "OMNIROUTE_AGY_TUI_CWD",
  ];
  const saved = new Map(keys.map((key) => [key, process.env[key]]));
  const home = temporaryDir();
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, {
    PATH: temporaryDir(),
    HOME: home,
    USERPROFILE: home,
    LOCALAPPDATA: path.join(home, "AppData", "Local"),
    OMNIROUTE_AGY_TUI_CWD: temporaryDir(),
    ...overrides,
  });
  try {
    return await body();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/**
 * A turn that must never run: reaching it would spawn `script` and agy. The
 * executor turns a thrown turn into a 502, so the calls are counted as well.
 */
function tripwireTurn(): {
  runTurn: (request: AgyTuiRequest) => Promise<AgyTuiResult>;
  calls: AgyTuiRequest[];
} {
  const calls: AgyTuiRequest[] = [];
  return {
    calls,
    runTurn: async (request) => {
      calls.push(request);
      throw new Error("the tui turn must not run in this test");
    },
  };
}

// Discovery also reads fixed install folders no environment variable can hide,
// so the "nothing found" answer is only observable on a host with neither.
const FIXED_AGY_INSTALLS =
  process.platform === "win32"
    ? []
    : ["/usr/local/bin/agy", "/opt/homebrew/bin/agy"].filter((file) => fs.existsSync(file));
const SKIP_WHEN_AGY_INSTALLED = FIXED_AGY_INSTALLS.length
  ? `agy is installed at ${FIXED_AGY_INSTALLS.join(", ")}`
  : false;

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

  it("keeps `acp` for the ACP transport, so neither CLI transport shadows the other", () => {
    // One resolver serves both (#20315 and this one): `acp` and `tui` each
    // select their own path, and anything else stays on HTTP.
    assert.equal(resolveAgyTransport(credentials("acp"), {}), "acp");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "acp" }), "acp");
    assert.equal(resolveAgyTransport(credentials("tui"), { AGY_CLI_TRANSPORT: "acp" }), "tui");
    assert.equal(resolveAgyTransport(credentials("acp"), { AGY_CLI_TRANSPORT: "tui" }), "acp");
    assert.equal(resolveAgyTransport(credentials(), { AGY_CLI_TRANSPORT: "acp,tui" }), "http");
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

  it("names the model agy reported, not the one the caller asked for", () => {
    assert.equal(tuiModelVersion("antigravity/gemini-3-pro", "gemini-3-flash"), "gemini-3-flash");
    // agy said nothing: the requested name is the only one there is.
    assert.equal(tuiModelVersion("antigravity/gemini-3-pro", null), "gemini-3-pro");
    assert.equal(tuiModelVersion("agy/gemini-3-pro", "  "), "gemini-3-pro");
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
    // No agy is found, and the turn is a tripwire: this answer must come from
    // the executor itself, never from a spawned `script` or agy.
    const turn = tripwireTurn();
    const result = await isolatedMachine({}, () =>
      executeViaAgyTui(
        {
          model: "gemini-3-pro",
          body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
          stream: true,
        },
        { findBinary: () => null, runTurn: turn.runTurn }
      )
    );
    assert.equal(turn.calls.length, 0, "the turn never ran");
    const body = (await result.response.json()) as ReturnType<typeof buildErrorBody>;
    // No pty on Windows (501), no agy anywhere else (502): an error either way.
    assert.equal(result.response.status, process.platform === "win32" ? 501 : 502);
    assert.equal(typeof body.error.message, "string");
    assert.equal(typeof body.error.type, "string");
    // A stack trace must never reach the caller (Hard Rule #12).
    assert.doesNotMatch(JSON.stringify(body), /\\n\s*at |"stack"/);
  });

  it(
    "hands the turn the agy discovery found on PATH, in its own workspace",
    {
      skip: process.platform === "win32" ? "no pseudo-terminal: the turn is refused first" : false,
    },
    async () => {
      const bin = temporaryDir();
      const fake = fakeAgy(bin, "agy");
      const seen: AgyTuiRequest[] = [];
      const runTurn = async (request: AgyTuiRequest): Promise<AgyTuiResult> => {
        seen.push(request);
        return { text: "the answer", conversationId: null, model: "gemini-3-flash", warnings: [] };
      };
      const workspace = temporaryDir();
      const result = await isolatedMachine({ PATH: bin, OMNIROUTE_AGY_TUI_CWD: workspace }, () =>
        executeViaAgyTui(
          {
            model: "antigravity/gemini-3-pro",
            body: { contents: [{ role: "user", parts: [{ text: "the question" }] }] },
            stream: true,
          },
          { runTurn }
        )
      );
      assert.equal(seen.length, 1);
      // The PATH entry beats every install folder, so the fake wins over any
      // agy the host has, and nothing but this stub ever sees its path.
      assert.equal(seen[0].executable, fake);
      assert.equal(seen[0].prompt, "the question");
      assert.equal(seen[0].cwd, workspace);
      assert.equal(seen[0].conversationId, null);
      assert.equal(result.url, "agy://tui");
      assert.equal(result.response.status, 200);
      const text = await result.response.text();
      assert.match(text, /"the answer"/);
      assert.match(text, /"modelVersion":"gemini-3-flash"/);
    }
  );
});

describe("agyCliTuiExecutor — the machine (shared agy discovery)", () => {
  it("finds an agy named by AGY_PATH", () => {
    const file = fakeAgy(temporaryDir(), process.platform === "win32" ? "agy.exe" : "agy");
    assert.equal(findAgyBinary({ AGY_PATH: file }, temporaryDir()), file);
  });

  it("finds an agy on PATH", () => {
    const dir = temporaryDir();
    const name = process.platform === "win32" ? "agy.exe" : "agy";
    fakeAgy(dir, name);
    assert.equal(findAgyBinary({ PATH: dir }, temporaryDir()), path.join(dir, name));
  });

  it(
    "skips an agy that cannot be executed and resolves a relative PATH entry",
    { skip: process.platform === "win32" ? "POSIX execute bits" : false },
    () => {
      const home = temporaryDir();
      const shadow = temporaryDir();
      fs.writeFileSync(path.join(shadow, "agy"), "#!/bin/sh\n", { encoding: "utf8", mode: 0o644 });
      const real = temporaryDir();
      const file = fakeAgy(real, "agy");
      assert.equal(findAgyBinary({ PATH: `${shadow}:${real}` }, home), file);
      assert.equal(findAgyBinary({ AGY_PATH: path.join(shadow, "agy"), PATH: real }, home), file);
      const relative = path.relative(process.cwd(), real);
      assert.equal(
        findAgyBinary({ PATH: relative }, home),
        file,
        "the runner only takes an absolute path"
      );
    }
  );

  it("reports no agy rather than guessing a path", { skip: SKIP_WHEN_AGY_INSTALLED }, () => {
    const home = temporaryDir();
    assert.equal(findAgyBinary({ PATH: temporaryDir() }, home), null);
    assert.equal(findAgyBinary({ AGY_PATH: path.join(temporaryDir(), "nope") }, home), null);
    if (process.platform !== "win32") {
      const shadow = temporaryDir();
      const file = path.join(shadow, "agy");
      fs.writeFileSync(file, "#!/bin/sh\n", { encoding: "utf8", mode: 0o644 });
      assert.equal(findAgyBinary({ AGY_PATH: file }, home), null, "not executable");
    }
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
