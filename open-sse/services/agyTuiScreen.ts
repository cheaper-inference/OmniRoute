/**
 * agyTuiScreen.ts — agy's interactive screen, read the way a person reads it.
 *
 * The `tui` transport drives `agy` in its interactive mode instead of `-p
 * stream-json`, so the only way to know what it is doing is to look at what it
 * draws. Stripping ANSI from a rolling log is not enough: an erased dialog stays
 * in the log and a dismissed menu would read as a live one. This is a small VT
 * view — cursor moves, erases and reverse index — not a terminal emulator.
 *
 * Ported from TimWongUp/agentnave `agy_tui/screen.py` + `claude_tui/screen.py`
 * (ADR-0072, ADR-0079), keeping this repository's conventions.
 */

/** Screen geometry agy is drawn at. Same as the reference runtime (200×50). */
export const SCREEN_COLS = 200;
export const SCREEN_ROWS = 50;

/**
 * CSI, OSC and DCS strings, then any other escape: optional intermediates and a
 * final byte (DECSC `\x1b7`, keypad `\x1b=`, charset `\x1b(B`). An unknown one
 * must never stall the screen.
 *
 * The unbounded quantifiers are capped on purpose: a hostile escape sequence
 * must cost a bounded amount of work (Hard Rule on ReDoS in untrusted input,
 * see AGENTS.md → "Regex Security").
 */
const ANSI =
  /\x1b(?:\[[0-?]{0,32}[ -/]{0,16}[@-~]|\][^\x07\x1b]{0,1024}(?:\x07|\x1b\\)|P[^\x1b]{0,1024}\x1b\\|(?![\[\]P])[ -/]{0,16}[0-~])/;

/** The full-width rule agy draws above and below its input box. */
export function isRule(line: string): boolean {
  return /^─{20,}$/.test(line);
}

/**
 * The prompt exactly as it must be typed.
 *
 * CRLF and CR are normalised first, control characters are dropped, and a body
 * that starts with a slash command, `!`, `#` or `&` gets a leading newline: agy
 * otherwise reads the first line as a command rather than as prompt text.
 */
export function cleanPaste(text: string): string {
  const normalised = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const printable = Array.from(normalised)
    .filter((char) => char === "\n" || char === "\t" || (char.codePointAt(0) ?? 0) >= 32)
    .filter((char) => char !== "\x7f")
    .join("");
  return /^[/!#&]/.test(printable.trimStart()) ? `\n${printable}` : printable;
}

/** The same pattern, global: stripping every escape, not just the first. */
const ANSI_ALL = new RegExp(ANSI.source, "g");

/** ANSI stripped, nothing else touched. */
export function stripAnsi(text: string): string {
  return text.replace(ANSI_ALL, "");
}

/** ANSI stripped, blank lines dropped and each line trimmed. */
export function screenLines(text: string): string[] {
  return stripAnsi(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * A small VT screen: cursor moves, erases and scrolling only.
 *
 * `feed()` returns how many cursor-position queries (`CSI 6n`) the child asked
 * for; the caller has to answer each one or agy's input box never settles.
 */
export class AgyScreen {
  private readonly lines: string[][] = Array.from({ length: SCREEN_ROWS }, () =>
    Array.from({ length: SCREEN_COLS }, () => " ")
  );
  private row = 0;
  private col = 0;
  private pending = "";
  private readonly decoder = new TextDecoder("utf-8");

  feed(data: Uint8Array): number {
    this.pending += this.decoder.decode(data, { stream: true });
    let queries = 0;
    while (this.pending) {
      if (this.pending.startsWith("\x1b")) {
        const match = ANSI.exec(this.pending);
        if (!match) {
          if (this.pending.length < 256) break; // An escape split across PTY reads.
          this.pending = this.pending.slice(1); // Unterminated: drop the ESC only.
          continue;
        }
        const code = match[0];
        this.pending = this.pending.slice(code.length);
        if (code === "\x1b[6n") queries += 1;
        this.escape(code);
        continue;
      }
      const char = String.fromCodePoint(this.pending.codePointAt(0) ?? 32);
      this.pending = this.pending.slice(char.length);
      this.character(char);
    }
    return queries;
  }

  private character(char: string): void {
    if (char === "\r") {
      this.col = 0;
    } else if (char === "\n") {
      this.row += 1;
    } else if (char === "\b") {
      this.col = Math.max(0, this.col - 1);
    } else if (char >= " " && char !== "\x7f") {
      if (this.col >= SCREEN_COLS) {
        this.col = 0;
        this.row += 1;
      }
      this.scroll();
      this.lines[this.row][this.col] = char;
      this.col += 1;
    }
    this.scroll();
  }

  private scroll(): void {
    if (this.row < SCREEN_ROWS) return;
    this.lines.shift();
    this.lines.push(Array.from({ length: SCREEN_COLS }, () => " "));
    this.row = SCREEN_ROWS - 1;
  }

  private escape(code: string): void {
    // agy 1.5 sends a reverse index and erases that Claude's Ink does not; without
    // them old text stays beside the new one and the footer reads glued to a rule.
    if (code === "\x1bM") {
      if (this.row === 0) {
        this.lines.unshift(Array.from({ length: SCREEN_COLS }, () => " "));
        this.lines.pop();
      } else {
        this.row -= 1;
      }
      return;
    }
    if (code.startsWith("\x1b[") && (code.endsWith("X") || code.endsWith("P"))) {
      const params = code.slice(2, -1);
      if (/^\d*$/.test(params)) {
        const count = Number.parseInt(params || "1", 10) || 1;
        this.erase(this.col, Math.min(this.col + count, SCREEN_COLS), code.endsWith("X"));
        return;
      }
    }
    if (!code.startsWith("\x1b[")) return;
    const command = code.at(-1) ?? "";
    const params = code.slice(2, -1);
    if (params && !/^[\d;]*$/.test(params)) return;
    const values = params.split(";").map((value) => Number.parseInt(value || "0", 10) || 0);
    const n = values[0] || 1;
    if (command === "H" || command === "f") {
      this.row = Math.min(SCREEN_ROWS - 1, Math.max(0, n - 1));
      this.col =
        values.length > 1 ? Math.min(SCREEN_COLS - 1, Math.max(0, (values[1] || 1) - 1)) : 0;
    } else if (command === "A" || command === "B") {
      const delta = command === "B" ? n : -n;
      this.row = Math.max(0, Math.min(SCREEN_ROWS - 1, this.row + delta));
    } else if (command === "C" || command === "D") {
      const delta = command === "C" ? n : -n;
      this.col = Math.max(0, Math.min(SCREEN_COLS - 1, this.col + delta));
    } else if (command === "G") {
      this.col = Math.min(SCREEN_COLS - 1, n - 1);
    } else if (command === "J") {
      const start = values[0] === 1 || values[0] === 2 || values[0] === 3 ? 0 : this.row;
      const end = values[0] === 1 ? this.row + 1 : SCREEN_ROWS;
      for (let row = start; row < end; row += 1) {
        this.lines[row] = Array.from({ length: SCREEN_COLS }, () => " ");
      }
    } else if (command === "K") {
      const start = values[0] === 1 || values[0] === 2 ? 0 : Math.min(this.col, SCREEN_COLS);
      const end = values[0] === 1 ? Math.min(this.col + 1, SCREEN_COLS) : SCREEN_COLS;
      this.erase(start, end, true);
    }
  }

  /** Blank `[start, end)` on the cursor row; `eraseOnly` blanks, otherwise deletes. */
  private erase(start: number, end: number, eraseOnly: boolean): void {
    const line = this.lines[this.row];
    if (eraseOnly) {
      line.splice(start, end - start, ...Array.from({ length: end - start }, () => " "));
      return;
    }
    line.splice(start, end - start);
    line.push(...Array.from({ length: SCREEN_COLS - line.length }, () => " "));
  }

  /** The screen as text, trailing blanks removed from every line. */
  text(): string {
    return this.lines
      .map((line) => line.join("").replace(/\s+$/, ""))
      .join("\n")
      .trim();
  }
}

// ── Reading the screen ──────────────────────────────────────────────────────

/**
 * The four states agy's bottom lines can show, in priority order: a menu can sit
 * above an idle footer, and the conversation above the box can quote any of
 * these words.
 */
export type AgyScreenState = "menu" | "busy" | "idle" | "unknown";

const SPINNER = /^[⠀-⣿]/;
/** The input box, its rules and the footer; a menu replaces the box with its own lines. */
const BOTTOM = 4;
const TASKS = /(\d+) task\(s\)/;

/** Background tasks the footer counts as running. */
export function footerTasks(screen: string): number {
  const lines = screenLines(screen);
  const match = lines.length > 0 ? TASKS.exec(lines[lines.length - 1]) : null;
  return match ? Number.parseInt(match[1], 10) : 0;
}

/** The last few non-blank lines, widened by one row per running background task. */
export function bottomLines(screen: string): string[] {
  const lines = screenLines(screen);
  const last = lines.length > 0 ? TASKS.exec(lines[lines.length - 1]) : null;
  const span = BOTTOM + (last ? Number.parseInt(last[1], 10) + 1 : 0);
  return lines.slice(-span);
}

export function screenState(screen: string): AgyScreenState {
  const lines = bottomLines(screen);
  const lowered = lines.map((line) => line.toLowerCase());
  // The footer is drawn as "↑/↓ to navigate · Enter to confirm"; the gap between
  // "enter" and "confirm" is not fixed, so the words are matched separately.
  if (
    lowered.some(
      (line) =>
        (line.includes("navigate") && /enter\s+(?:to\s+)?confirm/.test(line)) ||
        line.includes("[y/n]")
    )
  ) {
    return "menu";
  }
  if (lowered.some((line) => line.includes("esc to cancel") || SPINNER.test(line))) return "busy";
  const last = lowered.at(-1) ?? "";
  if (
    lines.length > 0 &&
    last.startsWith("? for shortcuts") &&
    lines.some((line) => line.startsWith(">"))
  ) {
    return "idle";
  }
  return "unknown";
}

/** The text between the input box's two rules: the last two rules on the screen. */
export function inputBox(screen: string): string {
  const lines = stripAnsi(screen)
    .split("\n")
    .map((line) => line.trim());
  const rules = lines.flatMap((line, index) => (isRule(line) ? [index] : []));
  if (rules.length < 2) return "";
  const body = lines.slice(rules[rules.length - 2] + 1, rules[rules.length - 1]);
  return body.join(" ").split(/\s+/).filter(Boolean).join(" ");
}

/**
 * The spinner immediately above the input box, optionally above its tip, as the
 * tool it names. Anything unrecognised is the model thinking, never a guess.
 */
export function busyActivity(screen: string): string | null {
  if (screenState(screen) !== "busy") return null;
  const lines = screenLines(screen);
  const rules = lines.flatMap((line, index) => (isRule(line) ? [index] : []));
  const boxes = rules.flatMap((upper, index) => {
    const lower = rules[index + 1];
    if (lower === undefined) return [];
    const inside = lines.slice(upper + 1, lower);
    return inside.some((line) => line.startsWith(">")) ? [upper] : [];
  });
  if (boxes.length === 0) return null;
  let before = boxes[boxes.length - 1] - 1;
  if (before >= 0 && lines[before].startsWith("└ Tip:")) before -= 1;
  if (before < 0) return null;
  const match = /^[⠀-⣿] +(.+)$/.exec(lines[before]);
  if (!match) return null;
  const text = match[1].toLowerCase();
  const known: Array<[string, string]> = [
    ["running command", "command_execution"],
    ["reading file", "read_file"],
    ["editing file", "file_change"],
    ["searching web", "web_search"],
  ];
  for (const [prefix, tool] of known) {
    if (text.startsWith(prefix) && text.endsWith("...")) return tool;
  }
  return "thinking";
}

const TRUST_QUESTION = "Do you trust the contents of this project?";
const TRUST_CHOICES = ["Yes, I trust this folder", "No, exit"];

/**
 * The trust dialog when it is the menu at the bottom: its two choices right
 * above the navigation footer, its question and "Accessing workspace:" just
 * above them. The conversation above can quote the same words, so only these
 * bottom lines count.
 */
export function trustMenu(screen: string): string | null {
  const lines = screenLines(screen);
  if (lines.length < 5 || !(lines[lines.length - 1] ?? "").toLowerCase().includes("navigate")) {
    return null;
  }
  const choices = lines.slice(-3, -1).map((line) => line.replace(/^>/, "").trim());
  if (choices.length !== TRUST_CHOICES.length) return null;
  if (!choices.every((choice, index) => choice === TRUST_CHOICES[index])) return null;
  const first = Math.max(0, lines.length - 8);
  const above = lines.slice(first, -3);
  const offset = above.indexOf(TRUST_QUESTION);
  if (offset < 0) return null;
  const question = first + offset;
  let start: number | null = null;
  for (let index = question - 1; index >= Math.max(question - 4, 0); index -= 1) {
    if (lines[index].startsWith("Accessing workspace:")) {
      start = index;
      break;
    }
  }
  return start === null ? null : lines.slice(start).join("\n");
}
