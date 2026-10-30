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

function cardOf(entry: Entry, body: Body): TranscriptCard | null {
  const seq = typeof entry.updatedSeq === "string" ? entry.updatedSeq : "";
  const entryId = typeof entry.entryId === "string" ? entry.entryId : "";
  const message = body.message;
  const source = (typeof body.type === "string" ? body : message) as Message | undefined;
  const type = typeof source?.type === "string" ? source.type : "";
  if (type === "attachment") {
    const fileName = typeof message?.file_name === "string" ? message.file_name : "";
    return fileName === "" ? null : { seq, entryId, kind: "attachment", fileName };
  }
  if (body.kind === "notice" || type === "notice") {
    const text = typeof body.text === "string" ? body.text : "";
    return text === "" ? null : { seq, entryId, kind: "notice", text };
  }
  if (type === "connector" || type === "onepassword-connect") {
    const name =
      type === "onepassword-connect"
        ? "1Password"
        : typeof source?.connector === "string"
          ? source.connector
          : "";
    const requestId = typeof source?.requestId === "string" ? source.requestId : "";
    const action = typeof source?.variant === "string" ? source.variant : "connect";
    return name === "" ? null : { seq, entryId, kind: "connector", name, requestId, action };
  }
  if (type === "widget") {
    const raw = Array.isArray(source?.options) ? source.options : [];
    const options = raw
      .flatMap((option) => {
        if (typeof option === "string" && option !== "") return [{ label: option, value: option }];
        if (option && typeof option === "object") {
          const label = typeof option.label === "string" ? option.label : "";
          const value = typeof option.value === "string" ? option.value : label;
          return label === "" ? [] : [{ label, value }];
        }
        return [];
      })
      .slice(0, 12);
    return {
      seq,
      entryId,
      kind: "widget",
      prompt: typeof source?.prompt === "string" ? source.prompt : "",
      options,
      allowCustom: source?.allowCustom === true,
      multiSelect: source?.multiSelect === true,
      dismissOnMoveOn: source?.dismissOnMoveOn === true,
    };
  }
  if (type === "secret-request") {
    const label =
      typeof source?.secretRequest?.label === "string" ? source.secretRequest.label : "";
    return label === "" ? null : { seq, entryId, kind: "secret", label };
  }
  if (type === "email-draft") {
    const to = Array.isArray(source?.draft?.to)
      ? source.draft.to.filter((item) => typeof item === "string").join(", ")
      : "";
    const text = typeof source?.draft?.body === "string" ? source.draft.body : "";
    return text === ""
      ? null
      : {
          seq,
          entryId,
          kind: "email",
          from: typeof source?.draft?.from === "string" ? source.draft.from : "",
          to,
          subject: typeof source?.draft?.subject === "string" ? source.draft.subject : "",
          body: text,
        };
  }
  if (type === "slack-draft") {
    const target = typeof source?.draft?.target === "string" ? source.draft.target : "";
    const text = typeof source?.draft?.body === "string" ? source.draft.body : "";
    return target === "" ? null : { seq, entryId, kind: "slack", target, body: text };
  }
  if (type !== "" && type !== "text" && type !== "local-tool-permission") {
    return { seq, entryId, kind: "unknown", type };
  }
  return null;
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

export function applyTranscriptFrame(state: TranscriptState, frame: unknown): TranscriptState {
  if (!frame || typeof frame !== "object") return state;
  const record = frame as {
    replay?: unknown;
    heartbeat?: unknown;
    cursorTooOld?: unknown;
    rows?: { entries?: unknown };
  };
  const entries = Array.isArray(record.rows?.entries) ? record.rows.entries : [];
  let cursor = state.cursor;
  const visible = [...state.visible];
  const cards = [...(state.cards ?? [])];
  const permissions = [...state.permissions];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Entry;
    if (typeof item.updatedSeq !== "string") continue;
    cursor = bigger(cursor, item.updatedSeq);
    const body = readBody(item);
    if (!body || !bounded(body)) {
      cards.push({
        seq: item.updatedSeq,
        entryId: typeof item.entryId === "string" ? item.entryId : "",
        kind: "unknown",
        type: "oversize",
      });
      continue;
    }
    const ask = body.message?.type === "local-tool-permission" ? body.message.ask : null;
    if (ask && typeof ask === "object") {
      const requestId = typeof ask.requestId === "string" ? ask.requestId : "";
      if (requestId !== "") {
        const replaced = permissions.filter((held) => held.requestId !== requestId);
        replaced.push({
          seq: item.updatedSeq,
          entryId: typeof item.entryId === "string" ? item.entryId : "",
          requestId,
          action: typeof ask.action === "string" ? ask.action : "",
          target: typeof ask.target === "string" ? ask.target : "",
          machineId: typeof ask.machineId === "string" ? ask.machineId : "",
          status: typeof ask.status === "string" ? ask.status : "",
        });
        permissions.length = 0;
        permissions.push(...replaced);
      }
      continue;
    }
    const card = cardOf(item, body);
    if (card) {
      const held = cards.findIndex(
        (current) => current.entryId !== "" && current.entryId === card.entryId
      );
      if (held >= 0) cards[held] = card;
      else if (card.kind === "unknown") {
        const index = cards.findIndex((current) => current.kind === "unknown");
        if (index >= 0) cards[index] = card;
        else cards.push(card);
      } else cards.push(card);
      continue;
    }
    // Rows are shown in both phases; `sealed` only decides when the snapshot
    // request may be replaced by the live one.
    const text = textOf(body);
    if (text !== "") {
      visible.push({
        seq: item.updatedSeq,
        entryId: typeof item.entryId === "string" ? item.entryId : "",
        role: roleOf(body, item.entryKind),
        text,
        clientNonce: typeof body.clientNonce === "string" ? body.clientNonce : "",
        streaming: body.isStreaming === true,
      });
    }
  }
  return {
    cursor,
    visible,
    cards,
    permissions,
    sealed: state.sealed || record.heartbeat === true,
    tooOld: record.cursorTooOld !== undefined,
  };
}

/**
 * The one frame the route emits when the upstream read fails. It is a named
 * event, not a data frame: parsed as a frame an empty object would reset the
 * failure counters and the retry loop would never end.
 */
export function transcriptErrorFrame(): string {
  return "event: error\ndata: {}\n\n";
}
