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
  | { seq: string; entryId: string; kind: "unknown"; type: string };

export type TranscriptState = {
  cursor: string;
  visible: TranscriptItem[];
  cards: TranscriptCard[];
  permissions: PermissionRequest[];
  sealed: boolean;
  tooOld?: boolean;
};

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
  draft?: { from?: unknown; to?: unknown; subject?: unknown; target?: unknown; body?: unknown };
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
  draft?: { from?: unknown; to?: unknown; subject?: unknown; target?: unknown; body?: unknown };
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
  const a = left.replace(/^0+(?=\d)/, "");
  const b = right.replace(/^0+(?=\d)/, "");
  if (a.length !== b.length) return a.length > b.length ? left : right;
  return a >= b ? left : right;
}

export function transcriptLines(frames: unknown[]): string[] {
  return frames.map((frame) => JSON.stringify(frame));
}

export type TranscriptCursor = { phase: "snapshot" | "live"; after: string };

export type TranscriptAdvance = TranscriptCursor & {
  stop: boolean;
  visible: TranscriptItem[];
  cards: TranscriptCard[];
  permissions: PermissionRequest[];
  /**
   * The service refused to replay the history for this bot and will only send
   * what happens from now on. It is a once-per-connection notice, not a failure:
   * rows keep arriving after it.
   */
  historyUnavailable: boolean;
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
    { after: string; messages?: TranscriptItem[]; cards?: TranscriptCard[]; seenAt?: string }
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
  return { phase: "live", after: found.after, messages: [], cards: [] };
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
      tooOld: false,
    },
    frame
  );
  const seals = request.phase === "snapshot" && state.sealed;
  return {
    phase: seals ? "live" : request.phase,
    after: state.cursor,
    stop: seals,
    visible: state.visible,
    cards: state.cards,
    permissions: state.permissions,
    historyUnavailable: state.tooOld === true,
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

export function applyTranscriptFrame(state: TranscriptState, frame: unknown): TranscriptState {
  if (!frame || typeof frame !== "object") return state;
  const record = frame as {
    replay?: unknown;
    heartbeat?: unknown;
    cursorTooOld?: unknown;
    rows?: { entries?: unknown };
  };
  const entries = Array.isArray(record.rows?.entries) ? record.rows.entries : [];
  const next = {
    cursor: state.cursor,
    visible: [...state.visible],
    cards: [...(state.cards ?? [])],
    permissions: [...state.permissions],
    sealed: state.sealed || record.heartbeat === true,
    tooOld: record.cursorTooOld !== undefined,
  };
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Entry;
    if (typeof item.updatedSeq !== "string") continue;
    applyEntry(next, item);
  }
  return next;
}

/**
 * The one frame the route emits when the upstream read fails. It is a named
 * event, not a data frame: parsed as a frame an empty object would reset the
 * failure counters and the retry loop would never end.
 */
export function transcriptErrorFrame(): string {
  return "event: error\ndata: {}\n\n";
}
