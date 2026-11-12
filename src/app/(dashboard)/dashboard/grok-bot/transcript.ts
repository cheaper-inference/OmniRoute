import { LIVE_FAILS } from "./session";
export type TranscriptItem = {
  seq: string;
  entryId: string;
  role: string;
  text: string;
  clientNonce: string;
  streaming: boolean;
};

/**
 * A bot asking to touch the machine it died on. The client shows this as a card
 * with four answers; without it the bot waits and the conversation looks dead.
 */
export type PermissionRequest = {
  seq: string;
  entryId: string;
  requestId: string;
  action: string;
  target: string;
  machineId: string;
  status: string;
};

export type TranscriptCard =
  | { seq: string; entryId: string; kind: "attachment"; fileName: string }
  | { seq: string; entryId: string; kind: "notice"; text: string }
  | {
      seq: string;
      entryId: string;
      kind: "connector";
      name: string;
      requestId: string;
      action: string;
    }
  | {
      seq: string;
      entryId: string;
      kind: "widget";
      prompt: string;
      options: Array<{ label: string; value: string }>;
      allowCustom: boolean;
      multiSelect: boolean;
      dismissOnMoveOn: boolean;
    }
  | { seq: string; entryId: string; kind: "secret"; label: string }
  | {
      seq: string;
      entryId: string;
      kind: "email";
      from: string;
      to: string;
      subject: string;
      body: string;
    }
  | { seq: string; entryId: string; kind: "slack"; target: string; body: string }
  | { seq: string; entryId: string; kind: "meeting"; title: string; body: string }
  | { seq: string; entryId: string; kind: "imessage"; recipient: string; body: string }
  | { seq: string; entryId: string; kind: "unknown"; type: string };

export type TranscriptState = {
  cursor: string;
  visible: TranscriptItem[];
  cards: TranscriptCard[];
  permissions: PermissionRequest[];
  sealed: boolean;
  generation?: number;
  tooOld?: boolean;
  deleted?: Array<{ entryId: string; seq: string }>;
  reset?: boolean;
  stop?: boolean;
  turnFailure?: string;
};

export type TranscriptDeletion = { entryId: string; seq: string };

function resyncGeneration(value: unknown): number | undefined {
  const numeric =
    typeof value === "string" && /^(?:0|[1-9][0-9]*)$/.test(value) ? Number(value) : value;
  return typeof numeric === "number" && Number.isSafeInteger(numeric) && numeric >= 0
    ? numeric
    : undefined;
}

export function transcriptDeletionMatches(
  deletions: TranscriptDeletion[],
  held: { entryId: string; seq: string }
): boolean {
  return deletions.some(
    (deletion) =>
      (deletion.entryId !== "" && deletion.entryId === held.entryId) ||
      (deletion.seq !== "" && deletion.seq === held.seq)
  );
}

type Entry = {
  updatedSeq?: unknown;
  entryId?: unknown;
  entryKind?: unknown;
  body?: unknown;
  role?: unknown;
  text?: unknown;
  clientNonce?: unknown;
};

/**
 * Two shapes come down the same stream, and `entryKind` does not say who spoke:
 * a row with `entryKind: "message"` carries `role`, `content`, `clientNonce` and
 * `isStreaming`, while a row with `entryKind: "send-message"` carries the reply
 * inside `message: { type, content }` and has no role at all. Measured live.
 */
type Message = {
  type?: unknown;
  content?: unknown;
  text?: unknown;
  ask?: Record<string, unknown>;
  file_name?: unknown;
  connector?: unknown;
  requestId?: unknown;
  serverId?: unknown;
  variant?: unknown;
  prompt?: unknown;
  options?: unknown;
  allowCustom?: unknown;
  multiSelect?: unknown;
  dismissOnMoveOn?: unknown;
  secretRequest?: { label?: unknown; target?: { field?: unknown } };
  draft?: {
    from?: unknown;
    to?: unknown;
    subject?: unknown;
    target?: unknown;
    body?: unknown;
    meeting_title?: unknown;
    recipient_name?: unknown;
  };
};

type Body = {
  role?: unknown;
  content?: unknown;
  clientNonce?: unknown;
  isStreaming?: unknown;
  kind?: unknown;
  message?: Message | null;
  text?: unknown;
  type?: unknown;
  connector?: unknown;
  requestId?: unknown;
  variant?: unknown;
  prompt?: unknown;
  options?: unknown;
  allowCustom?: unknown;
  multiSelect?: unknown;
  dismissOnMoveOn?: unknown;
  secretRequest?: { label?: unknown };
  draft?: {
    from?: unknown;
    to?: unknown;
    subject?: unknown;
    target?: unknown;
    body?: unknown;
    meeting_title?: unknown;
    recipient_name?: unknown;
  };
};

function readBody(entry: Entry): Body | null {
  if (typeof entry.body === "string" && entry.body !== "") {
    try {
      const decoded = JSON.parse(Buffer.from(entry.body, "base64").toString("utf-8"));
      if (decoded && typeof decoded === "object") return decoded as Body;
    } catch {
      return null;
    }
  }
  // Frames that already carry a decoded body are accepted as they are, so a
  // relay that flattens the envelope does not need a second reader.
  if (typeof entry.text === "string" || typeof entry.role === "string") return entry as Body;
  return null;
}

function bounded(value: unknown, depth = 0): boolean {
  if (depth > 6) return false;
  if (typeof value === "string") return value.length <= 4000;
  if (!value || typeof value !== "object") return true;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).some((key) => key.length > 128)) return false;
  const entries = Object.values(record);
  return entries.length <= 32 && entries.every((item) => bounded(item, depth + 1));
}

type CardIdentity = Pick<TranscriptCard, "seq" | "entryId">;

function stringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function connectorCard(
  identity: CardIdentity,
  source: Message | undefined,
  type: string
): TranscriptCard | null {
  const name = type === "onepassword-connect" ? "1Password" : stringValue(source?.connector);
  if (name === "") return null;
  return {
    ...identity,
    kind: "connector",
    name,
    requestId: stringValue(source?.requestId),
    action: stringValue(source?.variant, "connect"),
  };
}

function widgetOption(option: unknown): Array<{ label: string; value: string }> {
  if (typeof option === "string" && option !== "") return [{ label: option, value: option }];
  if (!option || typeof option !== "object") return [];
  const raw = option as { label?: unknown; value?: unknown };
  const label = stringValue(raw.label);
  return label === "" ? [] : [{ label, value: stringValue(raw.value, label) }];
}

function widgetCard(identity: CardIdentity, source: Message | undefined): TranscriptCard {
  const raw = Array.isArray(source?.options) ? source.options : [];
  return {
    ...identity,
    kind: "widget",
    prompt: stringValue(source?.prompt),
    options: raw.flatMap(widgetOption).slice(0, 12),
    allowCustom: source?.allowCustom === true,
    multiSelect: source?.multiSelect === true,
    dismissOnMoveOn: source?.dismissOnMoveOn === true,
  };
}

function emailCard(identity: CardIdentity, source: Message | undefined): TranscriptCard | null {
  const to = Array.isArray(source?.draft?.to)
    ? source.draft.to.filter((item) => typeof item === "string").join(", ")
    : "";
  const text = stringValue(source?.draft?.body);
  return text === ""
    ? null
    : {
        ...identity,
        kind: "email",
        from: stringValue(source?.draft?.from),
        to,
        subject: stringValue(source?.draft?.subject),
        body: text,
      };
}

function secretCard(identity: CardIdentity, source: Message | undefined): TranscriptCard | null {
  const label = stringValue(source?.secretRequest?.label);
  return label === "" ? null : { ...identity, kind: "secret", label };
}
function slackCard(identity: CardIdentity, source: Message | undefined): TranscriptCard | null {
  const target = stringValue(source?.draft?.target);
  return target === ""
    ? null
    : { ...identity, kind: "slack", target, body: stringValue(source?.draft?.body) };
}

function meetingCard(identity: CardIdentity, source: Message | undefined): TranscriptCard | null {
  const body = stringValue(source?.draft?.body);
  return body === ""
    ? null
    : { ...identity, kind: "meeting", title: stringValue(source?.draft?.meeting_title), body };
}

function imessageCard(identity: CardIdentity, source: Message | undefined): TranscriptCard | null {
  const body = stringValue(source?.draft?.body);
  return body === ""
    ? null
    : { ...identity, kind: "imessage", recipient: stringValue(source?.draft?.recipient_name), body };
}

function structuredCard(
  identity: CardIdentity,
  source: Message | undefined,
  type: string
): TranscriptCard | null {
  switch (type) {
    case "connector":
    case "onepassword-connect":
      return connectorCard(identity, source, type);
    case "widget":
      return widgetCard(identity, source);
    case "secret-request":
      return secretCard(identity, source);
    case "email-draft":
      return emailCard(identity, source);
    case "slack-draft":
      return slackCard(identity, source);
    case "meeting-chat-draft":
      return meetingCard(identity, source);
    case "imessage-draft":
      return imessageCard(identity, source);
    case "":
    case "text":
    case "local-tool-permission":
      return null;
    default:
      return { ...identity, kind: "unknown", type };
  }
}

function cardOf(entry: Entry, body: Body): TranscriptCard | null {
  const identity = { seq: stringValue(entry.updatedSeq), entryId: stringValue(entry.entryId) };
  const source = (typeof body.type === "string" ? body : body.message) as Message | undefined;
  const type = stringValue(source?.type);
  if (type === "attachment") {
    const fileName = stringValue(body.message?.file_name);
    return fileName === "" ? null : { ...identity, kind: "attachment", fileName };
  }
  if (body.kind === "notice" || type === "notice") {
    const text = stringValue(body.text);
    return text === "" ? null : { ...identity, kind: "notice", text };
  }
  return structuredCard(identity, source, type);
}

function textOf(body: Body): string {
  if (typeof body.content === "string" && body.content !== "") return body.content;
  if (typeof body.message?.content === "string" && body.message.content !== "") {
    return body.message.content;
  }
  if (typeof body.message?.text === "string") return body.message.text;
  // A notice has no `message`; its text sits at the top level.
  return typeof body.text === "string" ? body.text : "";
}

function roleOf(body: Body, entryKind: unknown): string {
  // `role` is a free string, not a two-value flag: the client itself switches on
  // "user", on "article", and on the field being absent. Passing an unfamiliar
  // value through unchanged keeps a row from being silently relabelled as the
  // bot's; the view decides sides with `role === "user"`, as the client does.
  if (typeof body.role === "string" && body.role !== "") return body.role;
  return entryKind === "send-message" ? "assistant" : "user";
}

function rowIdentity(row: TranscriptItem): string {
  return row.entryId === "" ? "" : `entry:${row.entryId}`;
}

function sameRow(left: TranscriptItem, right: TranscriptItem): boolean {
  const held = rowIdentity(left);
  const incoming = rowIdentity(right);
  if (held !== "" || incoming !== "") return held !== "" && held === incoming;
  return left.seq === right.seq && left.text === right.text;
}

function sameContent(left: TranscriptItem, right: TranscriptItem): boolean {
  return left.seq === right.seq && left.text === right.text && left.role === right.role;
}

function putRow(rows: TranscriptItem[], row: TranscriptItem): void {
  const at = rows.findIndex((held) => sameRow(held, row));
  if (at >= 0) {
    rows[at] = row;
    return;
  }
  const identified = rows.findIndex((held) => rowIdentity(held) !== "" && sameContent(held, row));
  if (rowIdentity(row) === "") {
    if (identified >= 0) return;
  } else if (!row.entryId.startsWith("anon-") && identified >= 0) {
    const held = rows[identified];
    if (held.entryId.startsWith("anon-")) {
      rows[identified] = row;
      return;
    }
  }
  rows.push(row);
}

export function mergeTranscriptRows(
  existing: TranscriptItem[],
  incoming: TranscriptItem[]
): TranscriptItem[] {
  const rows = [...existing];
  for (const row of incoming) putRow(rows, row);
  return rows.slice(-200);
}

export function localRowId(
  shown: TranscriptItem[],
  frame: TranscriptItem[],
  index: number,
  next: number,
  scope: string
): { item: TranscriptItem; next: number } {
  const item = frame[index];
  if (item.entryId !== "") return { item, next };
  const same = (row: TranscriptItem) =>
    row.entryId.startsWith("anon-") && row.seq === item.seq && row.role === item.role;
  const earlier = shown.filter((row) => same(row) && row.text === item.text);
  const longer = shown.filter(
    (row) => same(row) && item.text.startsWith(row.text) && item.text !== row.text
  );
  const fresh = frame
    .slice(0, index)
    .filter(
      (row) =>
        row.entryId === "" &&
        row.seq === item.seq &&
        row.text === item.text &&
        row.role === item.role
    ).length;
  const held = earlier[fresh] ?? (fresh === 0 && longer.length === 1 ? longer[0] : undefined);
  if (held) return { item: { ...item, entryId: held.entryId }, next };
  return { item: { ...item, entryId: `anon-${scope}:${next}` }, next: next + 1 };
}

function bigger(left: string, right: string): string {
  // A seq that is not a number must never win: letting one through replaces the
  // cursor with it and every later frame compares against garbage.
  if (!/^(?:0|[1-9][0-9]*)$/.test(right)) return left;
  if (!/^(?:0|[1-9][0-9]*)$/.test(left)) return right;
  const a = left.replace(/^0+(?=\d)/, "");
  const b = right.replace(/^0+(?=\d)/, "");
  if (a.length !== b.length) return a.length > b.length ? left : right;
  return a >= b ? left : right;
}

export function transcriptLines(frames: unknown[]): string[] {
  return frames.map((frame) => JSON.stringify(frame));
}

export type TranscriptCursor = { phase: "snapshot" | "live"; after: string; generation?: number };

export type TranscriptAdvance = TranscriptCursor & {
  stop: boolean;
  /** The stream itself must end. A normal snapshot seal only sets `stop` so the
   *  next request can start; an unusable reset sets this too. */
  halt?: boolean;
  visible: TranscriptItem[];
  cards: TranscriptCard[];
  permissions: PermissionRequest[];
  /**
   * The service refused to replay the history for this bot and will only send
   * what happens from now on. It is a once-per-connection notice, not a failure:
   * rows keep arriving after it.
   */
  historyUnavailable: boolean;
  deleted: Array<{ entryId: string; seq: string }>;
  /** The frame reset the session, so the rows before it are gone. */
  cleared: boolean;
  turnFailure?: string;
};

export function recordedSend(
  messageId: string,
  row: { role?: unknown; clientNonce?: unknown }
): boolean {
  if (messageId === "") return false;
  return row.role === "user" && row.clientNonce === messageId;
}

export function snapshotBudget(
  used: { bytes: number; elapsed: number },
  limit: { bytes: number; millis: number }
): "ok" | "too_large" | "timeout" {
  if (used.bytes > limit.bytes) return "too_large";
  if (used.elapsed > limit.millis) return "timeout";
  return "ok";
}

export async function sendOnce(
  text: string,
  send: (text: string) => Promise<"ok" | "failed">
): Promise<"recorded" | "unknown"> {
  const result = await send(text);
  return result === "ok" ? "recorded" : "unknown";
}

export function liveRetry(
  after: string,
  fails: number
): { phase: "live"; after: string; wait: number } {
  const capped = Math.min(fails, LIVE_FAILS);
  const wait = Math.min(30000, 500 * 2 ** capped);
  return { phase: "live", after, wait };
}

export function resumeTranscript(
  saved: Record<
    string,
    {
      after: string;
      generation?: number;
      messages?: TranscriptItem[];
      cards?: TranscriptCard[];
      seenAt?: string;
    }
  >,
  account: string,
  bot: string,
  connectionUpdatedAt = ""
): {
  phase: "snapshot" | "live";
  after: string;
  generation?: number;
  messages: TranscriptItem[];
  cards: TranscriptCard[];
} {
  const found = saved[`${account}:${bot}`];
  if (
    !found ||
    found.after === "" ||
    (connectionUpdatedAt !== "" && found.seenAt !== connectionUpdatedAt)
  ) {
    return { phase: "snapshot", after: "0", generation: 0, messages: [], cards: [] };
  }
  return {
    phase: "live",
    after: found.after,
    ...(found.generation === undefined ? {} : { generation: found.generation }),
    messages: [],
    cards: [],
  };
}

export function nextTranscriptRequest(
  request: TranscriptCursor,
  frame: unknown
): TranscriptAdvance {
  const state = applyTranscriptFrame(
    {
      cursor: request.after,
      visible: [],
      cards: [],
      permissions: [],
      sealed: request.phase === "live",
      generation: request.generation,
      tooOld: false,
    },
    frame
  );
  const seals = request.phase === "snapshot" && state.sealed;
  return {
    phase: seals ? "live" : request.phase,
    after: state.cursor,
    ...(state.generation === undefined ? {} : { generation: state.generation }),
    stop: seals || state.reset === true || state.stop === true,
    halt: state.stop === true,
    visible: state.visible,
    cards: state.cards,
    permissions: state.permissions,
    historyUnavailable: state.tooOld === true,
    deleted: state.deleted ?? [],
    cleared: state.reset === true,
    turnFailure: state.turnFailure,
  };
}

function applyPermission(
  permissions: PermissionRequest[],
  item: Entry,
  ask: Record<string, unknown>
): void {
  const requestId = stringValue(ask.requestId);
  if (requestId === "") return;
  const replaced = permissions.filter((held) => held.requestId !== requestId);
  replaced.push({
    seq: stringValue(item.updatedSeq),
    entryId: stringValue(item.entryId),
    requestId,
    action: stringValue(ask.action),
    target: stringValue(ask.target),
    machineId: stringValue(ask.machineId),
    status: stringValue(ask.status),
  });
  permissions.length = 0;
  permissions.push(...replaced);
}

function upsertCard(cards: TranscriptCard[], card: TranscriptCard): void {
  const held = cards.findIndex(
    (current) => current.entryId !== "" && current.entryId === card.entryId
  );
  if (held >= 0) {
    cards[held] = card;
    return;
  }
  if (card.kind === "unknown") {
    const index = cards.findIndex((current) => current.kind === "unknown");
    if (index >= 0) {
      cards[index] = card;
      return;
    }
  }
  cards.push(card);
}

function applyEntry(state: TranscriptState, item: Entry): void {
  const seq = stringValue(item.updatedSeq);
  state.cursor = bigger(state.cursor, seq);
  const body = readBody(item);
  if (!body || !bounded(body)) {
    state.cards.push({
      seq,
      entryId: stringValue(item.entryId),
      kind: "unknown",
      type: "oversize",
    });
    return;
  }
  const ask = body.message?.type === "local-tool-permission" ? body.message.ask : null;
  if (ask && typeof ask === "object") {
    applyPermission(state.permissions, item, ask);
    return;
  }
  const card = cardOf(item, body);
  if (card) {
    upsertCard(state.cards, card);
    return;
  }
  // Rows are shown in both phases; sealing only changes the next request.
  const text = textOf(body);
  if (text !== "") {
    state.visible.push({
      seq,
      entryId: stringValue(item.entryId),
      role: roleOf(body, item.entryKind),
      text,
      clientNonce: stringValue(body.clientNonce),
      streaming: body.isStreaming === true,
    });
  }
}

type FrameRecord = {
  replay?: unknown;
  heartbeat?: unknown;
  cursorTooOld?: { generation?: unknown };
  rows?: { entries?: unknown; deletes?: unknown; generation?: unknown };
  cleared?: { newGeneration?: unknown };
  turnFailed?: { summary?: unknown; code?: unknown };
};

type ResetOutcome =
  | { kind: "none"; generation: number | undefined }
  | { kind: "unusable" }
  | { kind: "reset"; generation: number | undefined; tooOld: boolean };

/**
 * A frame either replaces the conversation, refuses to because it cannot name the new
 * generation, or carries none of that. Naming the generations here keeps the branch
 * count in one place instead of spreading it through the frame handler.
 */
function resetOutcome(record: FrameRecord): ResetOutcome {
  const cleared = resyncGeneration(record.cleared?.newGeneration);
  const cursor = resyncGeneration(record.cursorTooOld?.generation);
  const rows = resyncGeneration(record.rows?.generation);
  const generation = cleared ?? cursor ?? rows;
  const present = record.cursorTooOld !== undefined || record.cleared !== undefined;
  if (!present) return { kind: "none", generation };
  const unusable =
    (record.cleared !== undefined && cleared === undefined) ||
    (record.cursorTooOld !== undefined && cursor === undefined);
  if (unusable) return { kind: "unusable" };
  return { kind: "reset", generation, tooOld: record.cursorTooOld !== undefined };
}

function turnFailureOf(record: FrameRecord, previous: string | undefined): string | undefined {
  if (!record.turnFailed || typeof record.turnFailed !== "object") return previous;
  const summary = typeof record.turnFailed.summary === "string" ? record.turnFailed.summary : "";
  const rawCode = record.turnFailed.code;
  const code = typeof rawCode === "string" || typeof rawCode === "number" ? String(rawCode) : "";
  return summary || code || "turn_failed";
}

/** Removals name what left the conversation, and each one also moves the cursor. */
function applyDeletions(next: TranscriptState, deletions: readonly unknown[]) {
  const deleted: Array<{ entryId: string; seq: string }> = [];
  for (const rawDeletion of deletions) {
    if (!rawDeletion || typeof rawDeletion !== "object") continue;
    const item = rawDeletion as { entryId?: unknown; seq?: unknown; updatedSeq?: unknown };
    const deletion = {
      entryId: typeof item.entryId === "string" ? item.entryId : "",
      seq: typeof item.seq === "string" ? item.seq : "",
    };
    if (typeof item.updatedSeq === "string") next.cursor = bigger(next.cursor, item.updatedSeq);
    deleted.push(deletion);
    next.visible = next.visible.filter((held) => !transcriptDeletionMatches([deletion], held));
    next.cards = (next.cards ?? []).filter(
      (held) => !transcriptDeletionMatches([deletion], held)
    );
    next.permissions = next.permissions.filter(
      (held) => !transcriptDeletionMatches([deletion], held)
    );
  }
  return deleted;
}

function applyEntries(next: TranscriptState, entries: readonly unknown[]) {
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Entry;
    // A row without a sequence cannot be ordered, so it is left for a later frame.
    if (typeof item.updatedSeq !== "string") continue;
    applyEntry(next, item);
  }
}

export function applyTranscriptFrame(state: TranscriptState, frame: unknown): TranscriptState {
  if (!frame || typeof frame !== "object") return state;
  const record = frame as FrameRecord;
  const reset = resetOutcome(record);
  if (reset.kind === "unusable") return { ...state, stop: true };
  if (reset.kind === "reset") {
    return {
      cursor: "0",
      visible: [],
      cards: [],
      permissions: [],
      sealed: state.sealed,
      generation: reset.generation,
      reset: true,
      tooOld: reset.tooOld,
    };
  }
  const entries = Array.isArray(record.rows?.entries) ? record.rows.entries : [];
  const deletions = Array.isArray(record.rows?.deletes) ? record.rows.deletes : [];
  const next: TranscriptState = {
    cursor: state.cursor,
    visible: [...state.visible],
    cards: [...(state.cards ?? [])],
    permissions: [...state.permissions],
    sealed: state.sealed || record.heartbeat === true,
    // Reaching here means the frame carried no reset, which is the only path that
    // raises the history-unavailable notice.
    tooOld: false,
  };
  const deleted = applyDeletions(next, deletions);
  applyEntries(next, entries);
  return {
    ...next,
    generation: reset.generation ?? state.generation,
    deleted,
    turnFailure: turnFailureOf(record, state.turnFailure),
  };
}

/**
 * The one frame the route emits when the upstream read fails. It is a named
 * event, not a data frame: parsed as a frame an empty object would reset the
 * failure counters and the retry loop would never end.
 */
export type TranscriptTerminalCode =
  "auth" | "permission" | "quota" | "protocol" | "unknown" | "timeout" | "unavailable";

/** Each classification is a status group plus the words the service uses for it. */
const TERMINAL_RULES: ReadonlyArray<{
  code: TranscriptTerminalCode;
  statuses: readonly number[];
  words: readonly string[];
}> = [
  { code: "auth", statuses: [401], words: ["unauthenticated", "http_401"] },
  { code: "permission", statuses: [403], words: ["permission_denied", "http_403"] },
  { code: "quota", statuses: [429], words: ["resource_exhausted", "rate limit"] },
  {
    code: "protocol",
    statuses: [400],
    words: ["invalid_argument", "incomplete envelope", "protocol error"],
  },
  { code: "timeout", statuses: [408, 504], words: ["timeout", "deadline"] },
  { code: "unavailable", statuses: [], words: ["unavailable", "terminated"] },
];

const RETRYABLE: ReadonlySet<TranscriptTerminalCode> = new Set([
  "quota",
  "timeout",
  "unavailable",
  "unknown",
]);

export function transcriptTerminal(
  error: unknown,
  streamId: string
): { code: TranscriptTerminalCode; retryable: boolean; streamId: string } {
  const status = (error as { status?: unknown } | null)?.status;
  const http = typeof status === "number" ? status : 0;
  const text = (error instanceof Error ? error.message : String(error)).toLowerCase();
  const match = TERMINAL_RULES.find(
    (rule) => rule.statuses.includes(http) || rule.words.some((word) => text.includes(word))
  );
  // A 5xx that matched no rule above is still the service being unavailable.
  const code = match?.code ?? (http >= 500 ? "unavailable" : "unknown");
  return { code, retryable: RETRYABLE.has(code), streamId };
}

export function transcriptConnectedFrame(streamId: string): string {
  return `event: connected\ndata: ${JSON.stringify({ streamId })}\n\n`;
}

export function transcriptDataFrame(value: unknown): string {
  return `event: frame\ndata: ${JSON.stringify(value)}\n\n`;
}

export function transcriptTerminalFrame(error: unknown, streamId: string): string {
  return `event: terminal\ndata: ${JSON.stringify(transcriptTerminal(error, streamId))}\n\n`;
}
