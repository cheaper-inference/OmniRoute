// The hook entry the `tui` transport installs in Antigravity's global file.
// The operator's own agy runs must never be affected, so the gating is the
// property most of these assertions are about.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import {
  dropHookDir,
  ensureEntry,
  hasPtyHelper,
  hookEntry,
  hooksPath,
  HOOK_ENV,
  HOOK_ENTRY_NAME,
  readEvents,
  shellQuote,
  tuiRuntimeUnsupported,
} from "../../open-sse/services/agyTuiHooks.ts";

const dirs: string[] = [];

function temporaryHome(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-hotest-"));
  dirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of dirs) {
    // Windows may still hold a handle on a just-written file; a leftover temp
    // directory is not worth failing the suite over.
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

function readJson(file: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
}

describe("agyTuiHooks — the entry", () => {
  it("records session lifecycle and gates questions behind a shared env variable", () => {
    const entry = hookEntry() as Record<string, unknown>;
    assert.deepEqual(Object.keys(entry).sort(), [
      "PreInvocation",
      "PreToolUse",
      "SessionStart",
      "Stop",
    ]);
    const first = (entry.SessionStart as Array<{ command: string }>)[0];
    assert.match(first.command, new RegExp(`\\$${HOOK_ENV}`));
    const gate = (entry.PreToolUse as Array<{ matcher: string }>)[0];
    assert.equal(gate.matcher, "ask_question");
  });

  it("keeps a hook run from an operator's own agy quiet by reading the variable", () => {
    const entry = hookEntry() as Record<string, unknown>;
    const command = (entry.Stop as Array<{ command: string }>)[0].command;
    // The whole script is a single condition on the variable: unset means no write.
    assert.match(command, new RegExp(`\\[ -n "\\$${HOOK_ENV}" \\]`));
  });

  it("quotes values so an argument can never become shell syntax", () => {
    assert.equal(shellQuote("plain"), "'plain'");
    assert.equal(shellQuote("it's"), `'it'\\''s'`);
  });

  it("points at the global file agy reads, under the given home", () => {
    assert.equal(
      path.normalize(hooksPath("/home/u")),
      path.normalize("/home/u/.gemini/config/hooks.json")
    );
  });
});

describe("agyTuiHooks — ensureEntry", () => {
  it("creates the file and the entry when neither exists", () => {
    const home = temporaryHome();
    const result = ensureEntry(home);
    assert.ok(result.warning);
    const stored = readJson(hooksPath(home));
    assert.ok(stored[HOOK_ENTRY_NAME]);
  });

  it("keeps every other hook the operator has", () => {
    const home = temporaryHome();
    const file = hooksPath(home);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      file,
      JSON.stringify({ "my-own": { Stop: [{ type: "command", command: "true" }] } }),
      "utf8"
    );

    ensureEntry(home);
    const stored = readJson(file);
    assert.ok(stored["my-own"]);
    assert.ok(stored[HOOK_ENTRY_NAME]);
  });

  it("does not rewrite an entry that is already correct", () => {
    const home = temporaryHome();
    ensureEntry(home);
    const file = hooksPath(home);
    const before = fs.statSync(file).mtimeMs;

    const second = ensureEntry(home);
    assert.equal(second.warning, null);
    assert.equal(fs.statSync(file).mtimeMs, before);
  });

  it("rewrites an entry that drifted from the expected shape", () => {
    const home = temporaryHome();
    const file = hooksPath(home);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ [HOOK_ENTRY_NAME]: { Stop: [] } }), "utf8");

    ensureEntry(home);
    const stored = readJson(file)[HOOK_ENTRY_NAME] as Record<string, unknown>;
    assert.ok(stored.SessionStart);
  });

  it("refuses to work with an entry the operator disabled", () => {
    const home = temporaryHome();
    const file = hooksPath(home);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ [HOOK_ENTRY_NAME]: { enabled: false } }), "utf8");

    assert.throws(() => ensureEntry(home), /disabled/);
  });

  it("reports invalid JSON instead of overwriting it", () => {
    const home = temporaryHome();
    const file = hooksPath(home);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const broken = "{ not json";
    fs.writeFileSync(file, broken, "utf8");

    assert.throws(() => ensureEntry(home), /not valid JSON/);
    assert.equal(fs.readFileSync(file, "utf8"), broken);
  });

  it("refuses a document that is not an object", () => {
    const home = temporaryHome();
    const file = hooksPath(home);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(["a", "b"]), "utf8");

    assert.throws(() => ensureEntry(home), /must hold a JSON object/);
  });

  it("leaves no temporary file behind", () => {
    const home = temporaryHome();
    ensureEntry(home);
    const leftovers = fs
      .readdirSync(path.dirname(hooksPath(home)))
      .filter((name) => name.includes(".omniroute-"));
    assert.deepEqual(leftovers, []);
  });
});

describe("agyTuiHooks — readEvents", () => {
  it("reads only the files this agy process wrote", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-hoo-"));
    dirs.push(dir);
    const write = (name: string, payload: unknown) =>
      fs.writeFileSync(path.join(dir, name), JSON.stringify(payload), "utf8");

    write("4242.11.Stop.json", { conversationId: "ours" });
    write("9999.11.Stop.json", { conversationId: "another agy" });
    write("4242.11.PreInvocation.json", { conversationId: "ours" });
    write("4242.11.notahook.txt", { conversationId: "ours" });

    const events = readEvents(dir, 4242, new Set());
    assert.deepEqual(events.map((event) => event.name).sort(), ["PreInvocation", "Stop"]);
  });

  it("returns each event once", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-hoo-"));
    dirs.push(dir);
    fs.writeFileSync(
      path.join(dir, "7.8.Stop.json"),
      JSON.stringify({ conversationId: "c" }),
      "utf8"
    );

    const seen = new Set<string>();
    assert.equal(readEvents(dir, 7, seen).length, 1);
    assert.equal(readEvents(dir, 7, seen).length, 0);
  });

  it("skips a row that is not valid JSON and keeps the rest", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-hoo-"));
    dirs.push(dir);
    fs.writeFileSync(path.join(dir, "7.8.Stop.json"), "{ broken", "utf8");
    fs.writeFileSync(
      path.join(dir, "7.8.SessionStart.json"),
      JSON.stringify({ conversationId: "c" }),
      "utf8"
    );

    const events = readEvents(dir, 7, new Set());
    assert.deepEqual(
      events.map((event) => event.name),
      ["SessionStart"]
    );
  });

  it("returns nothing when the directory is gone", () => {
    const dir = path.join(os.tmpdir(), "agy-hoo-does-not-exist");
    assert.deepEqual(readEvents(dir, 7, new Set()), []);
  });
});

describe("agyTuiHooks — runtime support", () => {
  it("refuses Windows, where the reference runtime has no PTY either", () => {
    assert.equal(tuiRuntimeUnsupported("win32"), true);
    assert.equal(tuiRuntimeUnsupported("linux"), false);
    assert.equal(tuiRuntimeUnsupported("darwin"), false);
  });

  it("reports no PTY helper on Windows without shelling out", () => {
    if (process.platform === "win32") assert.equal(hasPtyHelper(), false);
  });

  it("removes a hook directory, and tolerates one already gone", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-hoo-"));
    dropHookDir(dir);
    assert.equal(fs.existsSync(dir), false);
    dropHookDir(dir);
  });
});
