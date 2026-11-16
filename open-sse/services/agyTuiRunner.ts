/**
 * agyTuiRunner.ts — one interactive agy turn, from spawn to written reply.
 *
 * agy's interactive mode has no protocol: it draws a screen and writes its own
 * conversation record. Turning that into a request/response is a small state
 * machine, and every state exists because agy can otherwise hang forever:
 *
 *   ready       trust dialog answered, then the input box settles
 *   experiments agy refreshes its post-login experiments before it honours hooks;
 *               sending earlier makes it drop them for the whole turn
 *   deliver     bracketed paste of the prompt, confirmed by the echoed text
 *   stop        the `Stop` hook, or a written reply plus a footer that stands still
 *
 * Ported from TimWongUp/agentnave `agy_tui/__init__.py` (ADR-0072, ADR-0079).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { AgyTuiTerminal, type AgyTuiTerminalOptions, type EnvRecord } from "./agyTuiPty.ts";
import {
  cleanPaste,
  footerTasks,
  inputBox,
  screenState,
  trustMenu,
  type AgyScreenState,
} from "./agyTuiScreen.ts";
import {
  dropHookDir,
  ensureEntry,
  hasPtyHelper,
  HOOK_ENV,
  readEvents,
  tuiRuntimeUnsupported,
} from "./agyTuiHooks.ts";
import {
  AgyTranscriptReader,
  flat,
  transcriptPath,
  type TranscriptProgress,
} from "./agyTuiTranscript.ts";

/** agy becoming ready to take a prompt. */
export const STARTUP_TIMEOUT_MS = 60_000;
/** The post-login experiment refresh; proceed after this so a stall never hangs dispatch. */
export const EXPERIMENT_WAIT_MS = 9_000;
/** Paste plus confirmation, before the delivery is declared failed. */
export const DELIVERY_TIMEOUT_MS = 30_000;
/** A menu drawn this long is a real dialog, not a frame mid-redraw. */
export const DIALOG_SETTLE_MS = 2_000;
/** How long an idle footer may stand without `Stop` once the reply is written. */
export const STOP_GRACE_MS = 15_000;
/** An unrecognised screen gets this long before the turn is declared stuck. */
export const STALL_LIMIT_MS = 60_000;
/** Polling cadence. */
const POLL_MS = 50;
/** How long to wait for the reply row that lands just after `Stop`. */
const REPLY_TAIL_MS = 3_000;

const EXPERIMENTS_READY = "Experiments refreshed after login";
const CREATED_CONVERSATION = /Created conversation ([0-9a-fA-F-]{36})\b/;
/** agy folds a long paste into this placeholder instead of echoing the text. */
const PASTED_PLACEHOLDER = /^>\s*\[pasted text #/i;
const MAX_LOG_BYTES = 16 * 1024 * 1024;

/** Enter bookkeeping for `deliver`: when it was pressed, and whether we retried. */
type SubmitState = { submittedAt: number | null; retried: boolean };

/** Progress bookkeeping for `awaitStop`: last screen, last record revision, when. */
type StopWatch = { previous: string; revision: number; since: number };

/** A turn that failed for a reason the caller has to be told. */
export class AgyTuiTurnError extends Error {
  constructor(
    message: string,
    readonly status: number = 502
  ) {
    super(message);
    this.name = "AgyTuiTurnError";
  }
}

export type AgyTuiRequest = {
  /** Absolute path to the agy binary. */
  executable: string;
  /** Conversation to continue, or null to let agy create one. */
  conversationId: string | null;
  prompt: string;
  cwd: string;
  /** The home agy runs against (an account home), defaulting to agy's own. */
  home?: string;
  signal?: AbortSignal;
};

export type AgyTuiResult = {
  text: string;
  conversationId: string | null;
  model: string | null;
  warnings: string[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** agy's own settings document: trust only the workspace we dispatched into. */
export function trustedWorkspaceSettings(cwd: string, env: EnvRecord = process.env): string {
  const workspaces = new Set([cwd]);
  try {
    // agy takes the folder from $PWD, which may spell the same path differently.
    workspaces.add(fs.realpathSync(cwd));
  } catch {
    /* a path that no longer exists cannot be trusted either way */
  }
  const pwd = env.PWD;
  if (pwd) {
    try {
      if (fs.realpathSync(pwd) === fs.realpathSync(cwd)) workspaces.add(pwd);
    } catch {
      /* a stale $PWD is simply not added */
    }
  }
  return JSON.stringify({ trustedWorkspaces: [...workspaces].sort() });
}

/**
 * The trust dialog names the workspace it is about to trust; a mismatch means we
 * would be answering a dialog about some other folder.
 */
export function workspaceMatches(dialog: string, cwd: string): boolean {
  const beforeChoices = dialog.split(/yes, i trust this folder|no, exit/i)[0] ?? "";
  const absolute = beforeChoices
    .split("\n")
    .map((line) =>
      line
        .trim()
        .replace(/^Accessing workspace:/, "")
        .trim()
    )
    .map((line) => (line.startsWith("~") ? path.join(os.homedir(), line.slice(1)) : line))
    .filter((line) => path.isAbsolute(line));
  if (absolute.length !== 1) return false;
  try {
    return fs.realpathSync(absolute[0]) === fs.realpathSync(cwd);
  } catch {
    return false;
  }
}

/**
 * Drive one turn.
 *
 * Resolves with the reply text, or throws `AgyTuiTurnError` carrying the reason
 * the turn could not be completed. The terminal and the hook directory are
 * always released.
 */
export async function runAgyTuiTurn(request: AgyTuiRequest): Promise<AgyTuiResult> {
  // A cancelled request is cancelled on every host, so this outranks the
  // platform checks below.
  if (request.signal?.aborted) {
    throw new AgyTuiTurnError("the request was cancelled", 499);
  }
  if (tuiRuntimeUnsupported()) {
    throw new AgyTuiTurnError(
      "the tui transport runs agy in its interactive mode, which needs a POSIX pseudo-terminal; use the http or acp transport on this host",
      501
    );
  }
  if (!hasPtyHelper()) {
    throw new AgyTuiTurnError(
      "the tui transport needs `script` (util-linux) on PATH to give agy a pseudo-terminal",
      501
    );
  }
  if (!path.isAbsolute(request.executable)) {
    throw new AgyTuiTurnError("agy executable must be an absolute path", 500);
  }
  if (request.conversationId && !/^[A-Za-z0-9-]{1,80}$/.test(request.conversationId)) {
    throw new AgyTuiTurnError("invalid agy conversation id", 400);
  }

  const home = request.home || os.homedir();
  const hookDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-tui-"));

  try {
    return await new AgyTuiTurn(request, home, hookDir).run();
  } finally {
    // The hook entry stays (it is inert without the env var); the directory of
    // payloads this turn produced never outlives it.
    dropHookDir(hookDir);
  }
}

/** One turn's screen, hooks and transcript, read together. */
class AgyTuiTurn {
  private readonly terminal: AgyTuiTerminal;
  private conversationId: string | null;
  private reader: AgyTranscriptReader | null = null;
  /** The reader writes this turn's progress here, by row, as it parses. */
  private readonly progress: TranscriptProgress = {
    userSeen: false,
    answered: false,
    response: "",
    revision: 0,
  };
  private expected = "";
  private model: string | null = null;
  private stopSeen = false;
  private stopped = false;
  private preInvocationSeen = false;
  private readonly warnings: string[] = [];
  /** The hook entry was already right, so a turn with no hooks is not ours to blame. */
  private entryIntact = true;
  private readonly seen = new Set<string>();
  private runLog: string | null = null;

  constructor(
    private readonly request: AgyTuiRequest,
    private readonly home: string,
    private readonly hookDir: string
  ) {
    this.conversationId = request.conversationId;
    const ensured = ensureEntry(home);
    if (ensured.warning) {
      // A fresh entry: agy has not read it yet on this run, so hooks might not mount.
      this.warnings.push(ensured.warning);
      this.entryIntact = false;
    }
    if (this.conversationId) this.reader = this.readerFor(this.conversationId, true);

    const options: AgyTuiTerminalOptions = {
      executable: request.executable,
      args: [
        ...(request.conversationId ? ["--conversation", request.conversationId] : []),
        "--settings",
        trustedWorkspaceSettings(request.cwd),
      ],
      cwd: request.cwd,
      env: { ...(request.home ? { HOME: request.home } : {}), [HOOK_ENV]: hookDir },
    };
    this.terminal = new AgyTuiTerminal(options);
  }

  async run(): Promise<AgyTuiResult> {
    try {
      await this.awaitReady();
      await this.awaitExperiments();
      await this.deliver();
      await this.awaitStop();
      if (!this.progress.response.trim()) {
        throw new AgyTuiTurnError("agy ended the turn without a reply", 502);
      }
      return {
        text: this.progress.response,
        conversationId: this.conversationId,
        model: this.model,
        warnings: this.warnings,
      };
    } finally {
      this.terminal.close();
    }
  }

  /**
   * A turn runs for minutes, so the caller's cancellation is re-checked on every
   * poll rather than once at dispatch.
   */
  private throwIfAborted(): void {
    if (this.request.signal?.aborted) {
      throw new AgyTuiTurnError("the request was cancelled", 499);
    }
  }

  /** One read of everything: hooks first (they can end the turn), then the record. */
  private poll(): AgyScreenState {
    this.throwIfAborted();
    const pid = this.terminal.pid;
    if (pid !== undefined) {
      for (const event of readEvents(this.hookDir, pid, this.seen)) {
        this.applyHook(event.name, event.payload);
      }
    }
    if (this.conversationId === null) this.adoptCreatedConversation(pid);
    this.reader?.poll();
    return screenState(this.terminal.text());
  }

  /** agy names the conversation it created in its own run log. */
  private adoptCreatedConversation(pid: number | undefined): void {
    this.runLog ??= findRunLog(path.join(this.home, ".gemini", "antigravity-cli", "log"), pid ?? 0);
    const created = CREATED_CONVERSATION.exec(readRunLog(this.runLog));
    if (!created) return;
    this.conversationId = created[1];
    // A created conversation starts with this turn, so read it from the top.
    this.reader = this.readerFor(created[1], false);
  }

  private readerFor(conversationId: string, fromEnd: boolean): AgyTranscriptReader {
    const reader = new AgyTranscriptReader(
      transcriptPath(conversationId, this.home),
      () => this.expected,
      this.progress
    );
    if (fromEnd) reader.seekToEnd();
    return reader;
  }

  private applyHook(name: string, payload: Record<string, unknown>): void {
    const conversationId = payload.conversationId;
    if (typeof conversationId !== "string" || !conversationId) return;
    if (
      (name === "SessionStart" || name === "PreInvocation") &&
      this.conversationId === null &&
      !payload.parentConversationId
    ) {
      this.conversationId = conversationId;
      this.reader = this.readerFor(conversationId, false);
    }
    // Subagent conversations run in the same agy and fire their own hooks.
    if (conversationId !== this.conversationId) return;
    if (name === "PreInvocation") {
      this.preInvocationSeen = true;
      return;
    }
    if (name !== "Stop") return;
    this.stopSeen = true;
    if (typeof payload.modelName === "string" && payload.modelName) {
      this.model = payload.modelName;
    }
    if (payload.error) {
      const reason =
        typeof payload.terminationReason === "string" ? payload.terminationReason : "error";
      throw new AgyTuiTurnError(`${reason}: ${String(payload.error)}`, 502);
    }
    // Like print mode, the turn waits for its background commands to finish.
    this.stopped = payload.fullyIdle === true;
  }

  /** Trust dialog first, then the input box. */
  private async awaitReady(): Promise<void> {
    const startedAt = Date.now();
    let previous = "";
    let since = startedAt;
    let attempts = 0;

    for (;;) {
      const screen = this.terminal.text();
      const state = this.poll();
      const now = Date.now();
      if (screen !== previous) {
        previous = screen;
        since = now;
      }
      const settled = now - since >= 1_000;

      if (state === "idle" && settled) return;
      if (this.terminal.exited) {
        throw new AgyTuiTurnError("agy exited before becoming ready", 502);
      }
      if (state === "menu" && settled) {
        attempts = this.answerTrust(screen, attempts);
        since = now;
      }
      if (now - startedAt > STARTUP_TIMEOUT_MS) {
        throw new AgyTuiTurnError(
          `agy did not become ready within ${Math.round(STARTUP_TIMEOUT_MS / 1000)}s`,
          502
        );
      }
      await sleep(POLL_MS);
    }
  }

  /** Answer the workspace-trust dialog; returns the new attempt count. */
  private answerTrust(screen: string, attempts: number): number {
    const menu = trustMenu(screen);
    if (menu === null) {
      throw new AgyTuiTurnError("agy opened a startup dialog nobody can answer", 502);
    }
    if (!workspaceMatches(menu, this.request.cwd)) {
      throw new AgyTuiTurnError(
        "agy's workspace trust screen does not match the dispatched workspace",
        502
      );
    }
    if (attempts >= 3) {
      throw new AgyTuiTurnError("agy's workspace trust screen stayed after confirmation", 502);
    }
    const yes = menu.split("\n").some((line) => line.startsWith("> Yes, I trust this folder"));
    if (yes) {
      const warning = "Antigravity CLI now trusts the dispatched workspace";
      if (!this.warnings.includes(warning)) this.warnings.push(warning);
    }
    this.terminal.send(yes ? "\r" : "\x1b[A");
    return attempts + 1;
  }

  /** Wait for agy's post-login experiment refresh, bounded so a stall never hangs dispatch. */
  private async awaitExperiments(): Promise<void> {
    const startedAt = Date.now();
    let menuSince: number | null = null;
    while (Date.now() - startedAt < EXPERIMENT_WAIT_MS) {
      this.runLog ??= findRunLog(
        path.join(this.home, ".gemini", "antigravity-cli", "log"),
        this.terminal.pid ?? 0
      );
      if (readRunLog(this.runLog).includes(EXPERIMENTS_READY)) return;
      if (this.terminal.exited) return;
      const state = screenState(this.terminal.text());
      const now = Date.now();
      if (state !== "menu") {
        menuSince = null;
      } else if (menuSince === null) {
        menuSince = now;
      } else if (now - menuSince >= DIALOG_SETTLE_MS) {
        throw new AgyTuiTurnError("agy opened an unexpected startup dialog", 502);
      }
      await sleep(POLL_MS);
    }
  }

  /** Paste the prompt, confirm it landed, then press Enter. */
  private async deliver(): Promise<void> {
    const paste = cleanPaste(this.request.prompt);
    this.expected = flat(paste).slice(0, 40);
    this.terminal.send(`\x1b[200~${paste}\x1b[201~`);

    const startedAt = Date.now();
    let submitted: SubmitState = { submittedAt: null, retried: false };

    while (!this.progress.userSeen) {
      if (this.terminal.exited) {
        throw new AgyTuiTurnError("agy exited before taking the prompt", 502);
      }
      const screen = this.terminal.text();
      // Enter never answers a menu that came up after the paste.
      if (screenState(screen) === "menu") {
        throw new AgyTuiTurnError("agy opened a dialog while taking the prompt", 502);
      }
      submitted = await this.pressEnter(screen, submitted);
      if (Date.now() - startedAt > DELIVERY_TIMEOUT_MS) {
        throw new AgyTuiTurnError("agy did not confirm taking the prompt", 502);
      }
      this.poll();
      if (this.progress.userSeen) return;
      await sleep(POLL_MS);
    }
  }

  /** Press Enter once the paste landed, and once more if agy ignored it. */
  private async pressEnter(screen: string, state: SubmitState): Promise<SubmitState> {
    const box = inputBox(screen);
    const echoed = this.expected.length > 0 && box.includes(this.expected);
    if (state.submittedAt === null && (echoed || PASTED_PLACEHOLDER.test(box))) {
      await sleep(500); // Let agy finish taking the paste before Enter.
      if (screenState(this.terminal.text()) === "menu") return state;
      this.terminal.send("\r");
      return { submittedAt: Date.now(), retried: state.retried };
    }
    if (state.submittedAt !== null && Date.now() - state.submittedAt >= 3_000 && !state.retried) {
      this.terminal.send("\r");
      return { submittedAt: state.submittedAt, retried: true };
    }
    return state;
  }

  /** Wait for the reply and the end of the turn. */
  private async awaitStop(): Promise<void> {
    const watch: StopWatch = {
      previous: "",
      revision: this.progress.revision,
      since: Date.now(),
    };

    while (!this.stopped) {
      const state = this.poll();
      const screen = this.terminal.text();
      const steady = this.trackProgress(watch, screen);

      if (this.endedByExit()) break;
      // A menu mid-turn, with permissions skipped, is one no hook can answer.
      if (state === "menu" && steady >= DIALOG_SETTLE_MS) {
        throw new AgyTuiTurnError("agy opened a dialog during the turn", 502);
      }
      if (state === "idle" && this.completedIdleTurn(screen, steady)) break;
      if (steady >= STALL_LIMIT_MS) {
        throw new AgyTuiTurnError("agy stopped changing without finishing the turn", 502);
      }
      await sleep(POLL_MS);
    }

    await this.awaitTailReply();
  }

  /** Milliseconds the screen and the record agree nothing changed. */
  private trackProgress(watch: StopWatch, screen: string): number {
    const now = Date.now();
    // A running tool writes transcript rows without changing the screen, so
    // the record's revision counts as progress too.
    if (screen !== watch.previous || this.progress.revision !== watch.revision) {
      watch.previous = screen;
      watch.revision = this.progress.revision;
      watch.since = now;
    }
    return now - watch.since;
  }

  /** True when agy exited after the turn had already finished. */
  private endedByExit(): boolean {
    if (!this.terminal.exited) return false;
    this.poll();
    if (this.stopped) return true;
    throw new AgyTuiTurnError(
      `agy exited unexpectedly with status ${this.terminal.exitCode ?? "unknown"}`,
      502
    );
  }

  /** True when a reply with no Stop hook is enough to close the turn. */
  private completedIdleTurn(screen: string, steady: number): boolean {
    if (this.stopSeen || !this.progress.answered || steady < STOP_GRACE_MS) return false;
    // The footer counts background tasks the transcript may never have named.
    if (this.canCompleteWithoutStop() && footerTasks(screen) === 0) {
      const warning =
        "Antigravity CLI did not load hooks for this turn; completed from its written reply";
      if (!this.warnings.includes(warning)) this.warnings.push(warning);
      this.stopped = true;
      return true;
    }
    throw new AgyTuiTurnError(
      this.preInvocationSeen
        ? "agy wrote its reply but never sent its Stop hook; check the omniroute-tui entry in ~/.gemini/config/hooks.json"
        : "agy wrote its reply, but its hooks did not load for this turn",
      502
    );
  }

  /** The reply row can land just after the Stop hook. */
  private async awaitTailReply(): Promise<void> {
    const deadline = Date.now() + REPLY_TAIL_MS;
    while (!this.progress.answered && Date.now() < deadline) {
      this.poll();
      if (this.progress.answered) return;
      await sleep(POLL_MS);
    }
    if (!this.progress.answered) {
      throw new AgyTuiTurnError("agy stopped without a final reply after this task", 502);
    }
  }

  /**
   * A turn that never mounted hooks can still be complete: its reply is written,
   * PreInvocation never ran, and the footer counts no background task.
   */
  private canCompleteWithoutStop(): boolean {
    return (
      this.entryIntact &&
      !this.preInvocationSeen &&
      this.progress.answered &&
      this.progress.response.trim().length > 0
    );
  }
}

/**
 * The log this process opened, never a concurrent agy's: the log names the pid
 * agy reported for its own language server.
 */
export function findRunLog(dir: string, pid: number): string | null {
  if (pid === 0) return null;
  const marker = `Starting language server process with pid ${pid}`;
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return null;
  }
  const candidates = entries
    .filter((name) => name.startsWith("cli-") && name.endsWith(".log"))
    .flatMap((name) => {
      const full = path.join(dir, name);
      try {
        const stats = fs.statSync(full);
        return stats.size < MAX_LOG_BYTES ? [{ full, mtime: stats.mtimeMs }] : [];
      } catch {
        return [];
      }
    })
    .sort((left, right) => right.mtime - left.mtime)
    .slice(0, 20);
  // The boundary keeps `pid 1234` from matching `pid 12345`.
  const pattern = new RegExp(`${marker}(?!\\d)`);
  for (const candidate of candidates) {
    try {
      const handle = fs.openSync(candidate.full, "r");
      try {
        const buffer = Buffer.alloc(16_384);
        const read = fs.readSync(handle, buffer, 0, buffer.length, 0);
        if (pattern.test(buffer.toString("utf8", 0, read))) return candidate.full;
      } finally {
        fs.closeSync(handle);
      }
    } catch {
      continue;
    }
  }
  return null;
}

function readRunLog(file: string | null): string {
  if (!file) return "";
  try {
    if (fs.statSync(file).size >= MAX_LOG_BYTES) return "";
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}
