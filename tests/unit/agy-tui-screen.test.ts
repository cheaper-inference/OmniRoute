// Screen reader for the `tui` transport, against the frames agentnave's runtime
// reads (ADR-0072 / ADR-0079). These are the fixtures that decide whether a
// dialog is mistaken for a reply, so they are written as literal screens.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  AgyScreen,
  bottomLines,
  busyActivity,
  cleanPaste,
  footerTasks,
  inputBox,
  screenLines,
  screenState,
  stripAnsi,
  trustMenu,
} from "../../open-sse/services/agyTuiScreen.ts";

const RULE = "─".repeat(40);

/** One 200-column frame as agy would have drawn it, trailing blanks removed. */
function screenOf(lines: string[]): string {
  return lines.join("\n");
}

describe("agyTuiScreen — VT view", () => {
  it("writes text at the cursor and answers cursor queries", () => {
    const screen = new AgyScreen();
    const queries = screen.feed(new TextEncoder().encode("hi\x1b[6n"));
    assert.equal(queries, 1);
    assert.equal(screen.text(), "hi");
  });

  it("honours cursor moves, carriage return and erase-line", () => {
    const screen = new AgyScreen();
    screen.feed(new TextEncoder().encode("hello\r\x1b[Kbye"));
    assert.equal(screen.text(), "bye");
  });

  it("erases characters (CSI X) and deletes them (CSI P), which Ink does not send", () => {
    const erase = new AgyScreen();
    erase.feed(new TextEncoder().encode("abcde\x1b[5G\x1b[2X"));
    // Erase blanks in place; the trailing blank is not part of the text.
    assert.equal(erase.text(), "abcd");

    const del = new AgyScreen();
    del.feed(new TextEncoder().encode("abcde\x1b[1G\x1b[2P"));
    assert.equal(del.text(), "cde");
  });

  it("applies the reverse index (ESC M) agy 1.5 sends", () => {
    const screen = new AgyScreen();
    screen.feed(new TextEncoder().encode("one\ntwo\x1bM\rX"));
    // ESC M moved up a row, so the X lands on the first line.
    assert.deepEqual(screenLines(screen.text()), ["Xne", "two"]);
  });

  it("splits a multi-byte character across two reads without corrupting it", () => {
    const screen = new AgyScreen();
    const bytes = new TextEncoder().encode("⠋ working");
    screen.feed(bytes.slice(0, 1));
    screen.feed(bytes.slice(1));
    assert.equal(screen.text(), "⠋ working");
  });

  it("drops an unterminated escape instead of stalling the screen", () => {
    const screen = new AgyScreen();
    screen.feed(new TextEncoder().encode("ok"));
    screen.feed(new Uint8Array([0x1b, 0x5b]));
    assert.equal(screen.text(), "ok");
  });
});

describe("agyTuiScreen — reading the screen", () => {
  it("treats a navigation footer with the trust choices as a menu", () => {
    const screen = screenOf([
      "Accessing workspace: /repo",
      "Do you trust the contents of this project?",
      "> Yes, I trust this folder",
      "  No, exit",
      "↑/↓ to navigate · Enter to confirm",
    ]);
    assert.equal(screenState(screen), "menu");
  });

  it("reads an idle footer above the input box", () => {
    const screen = screenOf(["  some conversation text", RULE, "> ", RULE, "? for shortcuts"]);
    assert.equal(screenState(screen), "idle");
  });

  it("reads the spinner line as busy and never confuses it with idle", () => {
    const screen = screenOf(["⠹ Reading file...", RULE, "> hello", RULE, "esc to cancel"]);
    assert.equal(screenState(screen), "busy");
  });

  it("extracts the prompt inside the input box", () => {
    const screen = screenOf([RULE, "> explain this   repository", RULE, "? for shortcuts"]);
    assert.equal(inputBox(screen), "> explain this repository");
  });

  it("counts the background tasks the footer names", () => {
    assert.equal(footerTasks(screenOf(["x", "2 task(s)"])), 2);
    assert.equal(footerTasks(screenOf(["x", "? for shortcuts"])), 0);
    // A task footer widens the bottom window by one row per task.
    assert.equal(bottomLines(screenOf(["a", "b", "c", "d", "e", "1 task(s)"])).length, 6);
  });

  it("maps the status line above the box to the tool it names", () => {
    const of = (status: string) => screenOf([status, RULE, "> task", RULE, "esc to cancel"]);
    assert.equal(busyActivity(of("⠼ Running command...")), "command_execution");
    assert.equal(busyActivity(of("⠼ Reading file...")), "read_file");
    assert.equal(busyActivity(of("⠼ Editing file...")), "file_change");
    assert.equal(busyActivity(of("⠼ Searching web...")), "web_search");
    // Anything unrecognised is thinking, never a guessed tool.
    assert.equal(busyActivity(of("⠼ Pondering the question...")), "thinking");
  });

  it("returns no activity when the screen is not busy", () => {
    const screen = screenOf([RULE, "> task", RULE, "? for shortcuts"]);
    assert.equal(busyActivity(screen), null);
  });

  it("returns the whole trust dialog, both choices and the workspace", () => {
    const menu = screenOf([
      "Accessing workspace: /repo",
      "Do you trust the contents of this project?",
      "> Yes, I trust this folder",
      "  No, exit",
      "↑/↓ to navigate · Enter to confirm",
    ]);
    const dialog = trustMenu(menu);
    assert.ok(dialog);
    assert.match(dialog, /^Accessing workspace: \/repo/);
    assert.match(dialog, /Yes, I trust this folder/);
  });

  it("refuses a trust lookalike quoted in the conversation above the box", () => {
    const screen = screenOf([
      "The prompt said: Do you trust the contents of this project?",
      "> Yes, I trust this folder",
      "  No, exit",
      "↑/↓ to navigate · Enter to confirm",
    ]);
    assert.equal(trustMenu(screen), null);
  });
});

describe("agyTuiScreen — paste and escape handling", () => {
  it("normalises line endings and keeps tabs", () => {
    assert.equal(cleanPaste("a\r\nb\rc"), "a\nb\nc");
    assert.equal(cleanPaste("a\tb"), "a\tb");
  });

  it("drops control characters that would be read as keys", () => {
    assert.equal(cleanPaste("a\u0000b\u0007c\u007f"), "abc");
  });

  it("puts a newline before a body that starts like a slash command", () => {
    assert.equal(cleanPaste("/help me"), "\n/help me");
    assert.equal(cleanPaste("! run this"), "\n! run this");
    assert.equal(cleanPaste("# heading"), "\n# heading");
    assert.equal(cleanPaste("& thing"), "\n& thing");
    assert.equal(cleanPaste("plain prompt"), "plain prompt");
  });

  it("strips CSI, OSC and DCS without eating the text around them", () => {
    const text = "a\x1b[31mb\x1b]0;title\x07c\x1bPpayload\x1b\\d";
    assert.equal(stripAnsi(text), "abcd");
    assert.deepEqual(screenLines("a\x1b[1m  b  \x1b[0m\n\n c "), ["a  b", "c"]);
  });
});
