/**
 * agyAgentText.ts — which banner in agy's reply is agy's own, and which is text.
 *
 * agy does not report a failed upstream call through ACP: it writes the failure
 * into the reply as an ordinary message chunk and then ends the turn. To a
 * client that is indistinguishable from a model that said "⚠ Agent execution
 * terminated due to error." and stopped, so the transport reads the chunks and
 * decides. Three shapes exist, and they need different treatment:
 *
 *   - A failure banner. It ends the turn, and becomes the HTTP status: a 429
 *     from Antigravity is a rate limit, a low credit balance is a 402.
 *   - A retry banner. agy writes one per failed attempt and tries again inside
 *     the same turn; the client must not see them, but the turn goes on.
 *   - The same words inside prose. A model may quote an error, and a quoted
 *     banner must reach the client as text. That is why a banner is only
 *     classified once the text after it has stopped arriving: at the end of the
 *     turn a held banner was agy's, mid-turn it was the model's.
 *
 * Everything here is therefore built around holding: text that might be the
 * start of a banner is withheld until the next chunk decides. Getting this
 * wrong is visible — a dropped banner truncates a reply, and an emitted one
 * makes a healthy answer look like a crash.
 *
 * Ported from magpie-community/plugins packages/agy-cli index.mjs (Turn.pushText
 * and its helpers).
 */

/** agy's own failure banners, each as it appears with its surrounding newlines. */
export const AGENT_ERROR_MARKERS: readonly string[] = [
  "\n⚠ Agent execution terminated due to error.\n",
  "\n⚠ There was a network issue connecting to the server, please try again.\n",
  "\n⚠ Your AI credits balance is too low to continue.\n",
  "\n⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).\n",
];

/** The same banners without their newlines, which is how they are matched. */
export const AGENT_ERROR_CORES: readonly string[] = AGENT_ERROR_MARKERS.map((marker) =>
  marker.trim()
);

/** The credit-balance banner, which a caller reports as 402 rather than 429. */
export const CREDITS_CORE = AGENT_ERROR_CORES[2];

/** agy 1.5.8+: one line per failed attempt of a model call, then it tries again. */
const ATTEMPT_CORE = "⚠ API error (attempt ";
const ATTEMPT_MARKER = `\n${ATTEMPT_CORE}`;
/** The attempt line, split into its `attempt N` number and the detail after it. */
export const ATTEMPT_LINE = /^⚠ API error \(attempt \d+\): ?(.*)$/;

/** agy's banner for a model call that returned neither text nor a tool call. */
const RETRY_MARKER = "\n⚠ Model produced invalid output.\n";
const RETRY_CORE = RETRY_MARKER.trim();

/**
 * The longest banner, minus its last character: the shortest tail that cannot
 * still be the beginning of one, so anything shorter is held.
 */
const HOLD_MAX = Math.max(...AGENT_ERROR_MARKERS.map((marker) => marker.length)) - 1;

/**
 * The bare 429 Antigravity sends for a system prompt it turns away, whatever
 * quota is left. agy retries it inside the same turn with a banner each time and
 * only ends the turn after the last retry, so the client would see a hang. The
 * detail that carries it ends the turn here instead.
 */
export function refused429(detail: string): boolean {
  return /code 429\b/i.test(detail) && /resource has been exhausted/i.test(detail);
}

/** Where the next retry banner of either kind starts, from `from` on. */
function nextBanner(text: string, from: number): number {
  const retry = text.indexOf(RETRY_CORE, from);
  const attempt = text.indexOf(ATTEMPT_CORE, from);
  if (retry < 0) return attempt;
  if (attempt < 0) return retry;
  return Math.min(retry, attempt);
}

export type AgentTextOutcome = {
  /** The text the client should see for this chunk. */
  text: string;
  /** Set once agy's own words identified the turn as failed. */
  failed: boolean;
  /**
   * The banner agy ended the turn with, when it ended with one. The credit
   * banner is reported as a 402 rather than as a rate limit, so the caller needs
   * to tell them apart.
   */
  core?: string;
  /**
   * agy's own words for the failure, which the caller reports as the error. When
   * an attempt line carried it, that line's detail; otherwise the banner with
   * its leading warning sign removed.
   */
  detail?: string;
};

/**
 * The reply of one prompt, as text, with agy's own banners kept out of it.
 *
 * The instance is stateful across chunks: a chunk may end in the first few
 * characters of a banner, and the next chunk decides whether those characters
 * were the banner or the model's prose. `end()` settles whatever is still held
 * once the prompt has finished.
 */
export class AgentTextFilter {
  private held = "";
  /** Where an unterminated retry banner starts, or -1. */
  private openBanner = -1;
  /** The last character already emitted, needed to place a banner on a line. */
  private textTail = "";
  private attemptDetail = "";
  private refusedDetail = "";
  private failed = false;
  private failedCore = "";
  private failedDetail = "";

  /** Whether a banner has already classified the turn as failed. */
  get isFailed(): boolean {
    return this.failed;
  }

  /** The banner agy ended the turn with, or "" when it ended none. */
  get core(): string {
    return this.failedCore;
  }

  /** The attempt detail agy wrote before giving up, if it wrote one. */
  get lastAttemptDetail(): string {
    return this.attemptDetail;
  }

  /** Take one chunk of agy's reply; returns the part that is the model's. */
  push(chunk: string): AgentTextOutcome {
    if (this.failed)
      return { text: "", failed: true, core: this.failedCore, detail: this.failedDetail };
    const text = this.hold(chunk);
    if (this.refusedDetail && !this.failed) {
      this.held = "";
      this.fail("", this.refusedDetail);
      return { text, failed: true, core: this.failedCore, detail: this.failedDetail };
    }
    return { text, failed: false };
  }

  /**
   * The prompt ended. Whatever is still held was agy's own banner, because the
   * model's text always has something after it.
   */
  end(): AgentTextOutcome {
    if (this.failed)
      return { text: "", failed: true, core: this.failedCore, detail: this.failedDetail };

    const core = AGENT_ERROR_CORES.find((entry) => this.held.includes(entry));
    if (core) {
      this.held = "";
      // A failed connection is in the reply's last attempt line, not in the
      // banner; the generic banner says nothing the client can act on.
      const detail =
        this.attemptDetail || (core !== AGENT_ERROR_CORES[0] ? core.replace(/^⚠ /, "") : "");
      this.fail(core, detail);
      return { text: "", failed: true, core: this.failedCore, detail: this.failedDetail };
    }

    const text = this.flush();
    if (this.refusedDetail) {
      this.fail("", this.refusedDetail);
      return { text, failed: true, core: this.failedCore, detail: this.failedDetail };
    }
    return { text, failed: false };
  }

  private fail(core: string, detail: string): void {
    this.failed = true;
    this.failedCore = core;
    this.failedDetail = detail;
  }

  /** Emit a final chunk regardless of what it looks like. */
  private flush(): string {
    if (!this.held) return "";
    const text = this.dropRetryBanner(this.held, true);
    this.held = "";
    return this.emit(text);
  }

  /** Withhold what might begin a banner, and emit the rest. */
  private hold(chunk: string): string {
    let text = this.dropRetryBanner(this.held + chunk);
    this.held = "";

    if (this.openBanner >= 0) {
      // The banner's line has not ended, so its own newline is still to come.
      this.held = text.slice(this.openBanner);
      return this.emit(text.slice(0, this.openBanner));
    }

    for (const core of AGENT_ERROR_CORES) {
      const marker = text.lastIndexOf(core);
      if (marker >= 0 && !text.slice(marker + core.length).trim()) {
        const start = text[marker - 1] === "\n" ? marker - 1 : marker;
        this.held = text.slice(start);
        return this.emit(text.slice(0, start));
      }
    }

    for (let keep = Math.min(text.length, HOLD_MAX); keep > 0; keep--) {
      const tail = text.slice(-keep);
      if (
        AGENT_ERROR_MARKERS.some((marker) => marker.startsWith(tail)) ||
        (keep > 1 && (RETRY_MARKER.startsWith(tail) || ATTEMPT_MARKER.startsWith(tail)))
      ) {
        this.held = tail;
        text = text.slice(0, -keep);
        break;
      }
    }

    return this.emit(text);
  }

  /**
   * Remove agy's retry banners, each with its leading and one trailing newline,
   * wherever one starts a line. A banner quoted mid-line is left alone.
   *
   * Until the turn's text is flushed, a banner that ends the buffer stays in
   * place with `openBanner` pointing at it, so the newline that arrives in the
   * next chunk goes with it.
   */
  private dropRetryBanner(text: string, final = false): string {
    this.openBanner = -1;
    let from = 0;
    for (;;) {
      const at = nextBanner(text, from);
      if (at < 0) return text;
      const lineStart =
        at > 0 ? text[at - 1] === "\n" : this.textTail === "" || this.textTail === "\n";
      if (!lineStart) {
        from = at + 1;
        continue;
      }
      const start = at > 0 ? at - 1 : at;
      const attempt = !text.startsWith(RETRY_CORE, at);
      let end = attempt ? text.indexOf("\n", at) : at + RETRY_CORE.length;
      if (end < 0) end = text.length;
      if (end === text.length && !final) {
        // agy waits before its next try with the line still open.
        const open = attempt ? ATTEMPT_LINE.exec(text.slice(at, end))?.[1]?.trim() : "";
        if (open && refused429(open)) this.refusedDetail ||= open;
        this.openBanner = start;
        return text;
      }
      if (attempt) {
        this.attemptDetail =
          ATTEMPT_LINE.exec(text.slice(at, end))?.[1]?.trim() || this.attemptDetail;
      }
      if (attempt && refused429(this.attemptDetail)) this.refusedDetail ||= this.attemptDetail;
      if (text[end] === "\n") end++;
      text = text.slice(0, start) + text.slice(end);
      from = start;
    }
  }

  private emit(text: string): string {
    if (!text) return "";
    this.textTail = text.slice(-1);
    return text;
  }
}
