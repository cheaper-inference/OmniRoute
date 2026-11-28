export type LiveAgent = {
  agentId?: string;
  isRunningTurn?: boolean;
  isRunning?: boolean;
  staleAfterMs?: number;
  updatedAtMs?: number;
};

type RowPosition = { seq?: string; entryId?: string; updatedSeq?: string };
type TranscriptRow = RowPosition & { body?: string };
type TextPart = {
  text: string;
  seq?: string;
  updatedSeq?: string;
  direct: boolean;
  paired: boolean;
};
type CollectedRow = RowPosition & {
  missing: boolean;
  deleted: boolean;
  bodyLoaded: boolean;
  missingUpdatedSeq?: string;
  part?: TextPart;
};
type TranscriptEntry = {
  kind?: string;
  message?: { type?: string; content?: string };
  tool?: { name?: string; callId?: string; content?: string };
};

export type WatchFrame = {
  cursorTooOld?: { generation?: number };
  cleared?: { newGeneration?: number };
  turnFailed?: { agentId?: string };
  agentState?: { live?: LiveAgent[] };
  agent?: LiveAgent;
  rows?: { entries?: TranscriptRow[]; deletes?: RowPosition[] };
  entry?: TranscriptEntry;
};

export type WatchFrameState = {
  agentId: string;
  messageId: string;
  parts: string[];
  cursor: { ack: string };
  onRunning: (running: boolean) => boolean;
  onSubmit: (answer: string) => void;
  onStale: (remainingMs: number) => void;
};

function assertFrameStatus(frame: WatchFrame): void {
  const generation = frame.cursorTooOld?.generation ?? frame.cleared?.newGeneration;
  if (typeof generation === "number" && generation > 0) {
    throw Object.assign(new Error("watch cursor moved"), {
      errorType: "watch_resync",
      generation,
    });
  }
  if (frame.turnFailed) {
    throw Object.assign(new Error("server reported the turn failed"), {
      errorType: "incomplete_turn",
    });
  }
}

function staleWindow(live: LiveAgent): number {
  const windowMs = live.staleAfterMs && live.staleAfterMs > 0 ? live.staleAfterMs : 90_000;
  const elapsed = live.updatedAtMs && live.updatedAtMs > 0 ? Date.now() - live.updatedAtMs : 0;
  return Math.max(0, windowMs - elapsed);
}

function decodedAssistantText(row: TranscriptRow, messageId: string): string | null {
  let value: unknown;
  try {
    value = JSON.parse(Buffer.from(row.body!, "base64").toString("utf-8"));
  } catch {
    throw Object.assign(new Error("transcript row body is unreadable"), {
      errorType: "incomplete_turn",
    });
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw Object.assign(new Error("transcript row body is not an entry"), {
      errorType: "incomplete_turn",
    });
  }
  const decoded = value as {
    clientNonce?: string;
    kind?: string;
    message?: { type?: string; content?: string };
  };
  // Assistant replies have no clientNonce; ignore the current user's own echo.
  if (
    decoded.clientNonce !== messageId &&
    decoded.kind === "send-message" &&
    decoded.message?.type === "text" &&
    typeof decoded.message.content === "string"
  ) {
    return decoded.message.content;
  }
  return null;
}

/** Per-watch frame decoding; state belongs to one temporal agent and turn only. */
export class GrokWatchFrameReader {
  private readonly rows = new Set<CollectedRow>();
  private readonly rowAliases = new Map<string, CollectedRow>();
  private readonly textParts: TextPart[] = [];

  constructor(private readonly state: WatchFrameState) {}

  resetRows(generationChanged: boolean): void {
    if (!generationChanged) return;
    this.rows.clear();
    this.rowAliases.clear();
    this.textParts.length = 0;
    this.state.parts.length = 0;
  }

  hasMissingRows(): boolean {
    return [...this.rows].some((row) => row.missing);
  }

  cursorForReconnect(): string {
    const ack = BigInt(this.state.cursor.ack);
    let cursor = ack;
    for (const row of this.rows) {
      if (!row.missing) continue;
      if (row.missingUpdatedSeq === undefined) return "0";
      const update = BigInt(row.missingUpdatedSeq);
      const before = update > 0n ? update - 1n : 0n;
      if (before < cursor) cursor = before;
    }
    return cursor === ack ? this.state.cursor.ack : String(cursor);
  }

  private rowKeys(row: RowPosition): string[] {
    const keys: string[] = [];
    if (row.seq !== undefined) keys.push(`seq:${row.seq}`);
    if (row.entryId !== undefined) keys.push(`entry:${row.entryId}`);
    if (keys.length === 0 && row.updatedSeq !== undefined) keys.push(`update:${row.updatedSeq}`);
    return keys;
  }

  private collectRow(position: RowPosition, allowPromotion = true): CollectedRow {
    const keys = this.rowKeys(position);
    const matches = new Set(
      keys.map((key) => this.rowAliases.get(key)).filter((row) => row !== undefined)
    );
    const provisional =
      position.updatedSeq === undefined
        ? undefined
        : this.rowAliases.get(`update:${position.updatedSeq}`);
    if (
      (allowPromotion || (provisional?.bodyLoaded && matches.size === 0)) &&
      this.canPromote(position, matches) &&
      provisional &&
      provisional.seq === undefined &&
      provisional.entryId === undefined
    ) {
      matches.add(provisional);
    }
    let row = matches.values().next().value;
    if (!row) {
      row = { missing: false, deleted: false, bodyLoaded: false };
      this.rows.add(row);
    }
    for (const held of matches) {
      if (held !== row) this.mergeRows(row, held);
    }
    this.registerPosition(row, position, keys, provisional);
    return row;
  }

  private canPromote(position: RowPosition, matches: Set<CollectedRow>): boolean {
    if (matches.size === 0) return true;
    const update = position.updatedSeq;
    if (update === undefined) return false;
    return [...matches].every((row) => {
      if (row.updatedSeq === undefined) return false;
      const newer = BigInt(update) > BigInt(row.updatedSeq);
      return newer || (!row.bodyLoaded && update === row.updatedSeq);
    });
  }

  private registerPosition(
    row: CollectedRow,
    position: RowPosition,
    keys: string[],
    provisional: CollectedRow | undefined
  ): void {
    for (const key of keys) this.rowAliases.set(key, row);
    if (position.seq !== undefined) row.seq = position.seq;
    if (position.entryId !== undefined) row.entryId = position.entryId;
    if (
      provisional &&
      this.rowAliases.get(`update:${position.updatedSeq}`) === row &&
      (row.seq !== undefined || row.entryId !== undefined)
    ) {
      this.rowAliases.delete(`update:${position.updatedSeq}`);
    }
    if (row.part) row.part.seq = row.seq ?? row.part.seq;
  }

  private mergeRows(row: CollectedRow, other: CollectedRow): void {
    const sameVersion = row.updatedSeq === other.updatedSeq;
    const newer =
      row.updatedSeq === undefined ||
      (other.updatedSeq !== undefined && BigInt(other.updatedSeq) > BigInt(row.updatedSeq));
    const selected = (sameVersion ? other.bodyLoaded : newer) ? other : row;
    row.part = this.mergeParts(row, other, selected, sameVersion);
    row.bodyLoaded = selected.bodyLoaded;
    row.missing = selected.missing;
    row.missingUpdatedSeq = selected.missingUpdatedSeq;
    row.updatedSeq = selected.updatedSeq;
    row.deleted = row.deleted || other.deleted;
    if (row.deleted) this.clearRow(row);
    row.seq ??= other.seq;
    row.entryId ??= other.entryId;
    this.rows.delete(other);
    for (const [key, held] of this.rowAliases) {
      if (held === other) this.rowAliases.set(key, row);
    }
  }

  private mergeParts(
    row: CollectedRow,
    other: CollectedRow,
    selected: CollectedRow,
    sameVersion: boolean
  ): TextPart | undefined {
    const retained = selected.part;
    const removed = selected === other ? row.part : other.part;
    if (!removed || retained === removed) return retained;
    if (!retained) {
      if (!selected.bodyLoaded && !selected.deleted) return removed;
      this.removePart(removed);
      return undefined;
    }
    if (sameVersion && retained.text === removed.text) retained.paired ||= removed.paired;
    const first = this.textParts.indexOf(removed);
    const last = this.textParts.indexOf(retained);
    if (first >= 0 && last > first) {
      this.textParts[first] = retained;
      this.textParts.splice(last, 1);
    } else this.removePart(removed);
    return retained;
  }

  consume(event: unknown): boolean {
    const frame = event as WatchFrame;
    assertFrameStatus(frame);
    if (this.isForeignFrame(frame)) return false;
    if (this.consumeSubmit(frame.entry)) return false;
    if (frame.rows) this.consumeRows(frame);
    this.consumeDirectText(frame.entry);
    return this.consumeLive(frame) || this.consumeAgent(frame.agent);
  }

  private consumeAgent(agent: LiveAgent | undefined): boolean {
    const running = this.runningOf(agent);
    return running !== null && this.state.onRunning(running);
  }

  private runningOf(agent: LiveAgent | null | undefined): boolean | null {
    if (!agent || agent.agentId !== this.state.agentId) return null;
    if (typeof agent.isRunningTurn === "boolean") return agent.isRunningTurn;
    if (typeof agent.isRunning === "boolean") return agent.isRunning;
    return false;
  }

  private isForeignFrame(frame: WatchFrame): boolean {
    if (frame.agent?.agentId !== undefined && frame.agent.agentId !== this.state.agentId) {
      return true;
    }
    const ids = frame.agentState?.live
      ?.map((agent) => agent.agentId)
      .filter((id) => id !== undefined);
    return Boolean(ids?.length && ids.some((id) => id !== this.state.agentId));
  }

  private consumeLive(frame: WatchFrame): boolean {
    for (const live of frame.agentState?.live ?? []) {
      const running = this.runningOf(live);
      if (running === null) continue;
      if (running) this.state.onStale(staleWindow(live));
      const textArrived = this.state.parts.some((part) => !part.startsWith("\u0000submit:"));
      if (textArrived && running !== true) return true;
      // Keep the existing window if the running flag drops before its text row.
      if (running === false && live.staleAfterMs && !textArrived) continue;
      if (this.state.onRunning(running)) return true;
    }
    return false;
  }

  private consumeSubmit(entry: TranscriptEntry | undefined): boolean {
    if (
      entry?.kind === "tool-call" &&
      entry.tool?.name === "submit_answer" &&
      entry.tool.callId &&
      typeof entry.tool.content === "string"
    ) {
      this.state.onSubmit(entry.tool.content);
      return true;
    }
    return false;
  }

  private advanceCursor(updatedSeq: string | undefined): void {
    const { cursor } = this.state;
    if (updatedSeq !== undefined && BigInt(updatedSeq) > BigInt(cursor.ack)) {
      cursor.ack = updatedSeq;
    }
  }

  private isOlder(position: RowPosition, row: CollectedRow): boolean {
    return (
      row.updatedSeq !== undefined &&
      position.updatedSeq !== undefined &&
      BigInt(position.updatedSeq) < BigInt(row.updatedSeq)
    );
  }

  private trackOmission(row: CollectedRow, position: RowPosition): void {
    const newer =
      position.updatedSeq !== undefined &&
      (row.updatedSeq === undefined || BigInt(position.updatedSeq) > BigInt(row.updatedSeq));
    if (!row.bodyLoaded || newer) {
      if (!row.missing) row.missingUpdatedSeq = position.updatedSeq;
      row.missing = true;
      row.bodyLoaded = false;
    }
    row.updatedSeq = position.updatedSeq ?? row.updatedSeq;
  }

  private trackRow(position: TranscriptRow, allowPromotion: boolean): CollectedRow | null {
    this.advanceCursor(position.updatedSeq);
    const row = this.collectRow(position, allowPromotion);
    if (row.deleted || this.isOlder(position, row)) return null;
    if (!position.body) {
      this.trackOmission(row, position);
      return null;
    }
    if (row.updatedSeq !== undefined && position.updatedSeq === undefined) return null;
    row.missing = false;
    row.bodyLoaded = true;
    row.missingUpdatedSeq = undefined;
    row.updatedSeq = position.updatedSeq;
    return row;
  }

  private ambiguousUpdates(entries: TranscriptRow[]): Set<string> {
    const groups = new Map<string, Set<string>[]>();
    for (const entry of [...this.rows, ...entries]) {
      if (
        entry.updatedSeq === undefined ||
        (entry.seq === undefined && entry.entryId === undefined)
      )
        continue;
      const keys = new Set(this.rowKeys(entry));
      const held = groups.get(entry.updatedSeq) ?? [];
      const separate: Set<string>[] = [];
      for (const group of held) {
        if ([...group].some((key) => keys.has(key))) {
          for (const key of group) keys.add(key);
        } else separate.push(group);
      }
      separate.push(keys);
      groups.set(entry.updatedSeq, separate);
    }
    return new Set([...groups].filter(([, held]) => held.length > 1).map(([update]) => update));
  }

  private consumeRows(frame: WatchFrame): void {
    let added = false;
    const entries = frame.rows?.entries ?? [];
    const ambiguous = this.ambiguousUpdates(entries);
    for (const entry of entries) {
      const row = this.trackRow(entry, !ambiguous.has(entry.updatedSeq ?? ""));
      if (!row) continue;
      const text = decodedAssistantText(entry, this.state.messageId);
      if (text === null) {
        this.clearRow(row);
        continue;
      }
      if (this.appendRowText(row, text)) added = true;
    }
    this.trackDeletes(frame.rows?.deletes);
    this.syncParts();
    if (added && !this.isRunning(frame)) this.state.onStale(2_000);
  }

  private isRunning(frame: WatchFrame): boolean {
    return (
      this.runningOf(frame.agent) === true ||
      (frame.agentState?.live ?? []).some((live) => this.runningOf(live) === true)
    );
  }

  private appendRowText(row: CollectedRow, text: string): boolean {
    if (row.part?.text === text && row.part.updatedSeq === row.updatedSeq) return false;
    const direct = this.textParts.find((part) => part.direct && part.text === text);
    if (row.part) {
      if (direct) this.removePart(direct);
      row.part.text = text;
      row.part.updatedSeq = row.updatedSeq;
      row.part.paired = direct !== undefined;
      return true;
    }
    if (direct) {
      direct.direct = false;
      direct.paired = true;
      direct.seq = row.seq;
      direct.updatedSeq = row.updatedSeq;
      row.part = direct;
      return false;
    }
    const last = this.textParts.at(-1);
    if (this.rowKeys(row).length === 0 && last?.text === text) return false;
    row.part = { text, seq: row.seq, updatedSeq: row.updatedSeq, direct: false, paired: false };
    this.textParts.push(row.part);
    return true;
  }

  private syncParts(): void {
    // Keep unsequenced text after the highest-sequence retained part that precedes it.
    const sequenced: Array<{ part: TextPart; seq: bigint }> = [];
    const following = new Map<bigint, string[]>();
    const leading: string[] = [];
    let high: bigint | undefined;
    for (const part of this.textParts) {
      if (part.seq === undefined) {
        const bucket = high === undefined ? leading : following.get(high)!;
        bucket.push(part.text);
        continue;
      }
      const seq = BigInt(part.seq);
      sequenced.push({ part, seq });
      if (!following.has(seq)) following.set(seq, []);
      if (high === undefined || seq > high) high = seq;
    }
    sequenced.sort((a, b) => (a.seq < b.seq ? -1 : a.seq > b.seq ? 1 : 0));
    this.state.parts.length = 0;
    for (const text of leading) this.state.parts.push(text);
    for (const { part, seq } of sequenced) {
      this.state.parts.push(part.text);
      for (const text of following.get(seq) ?? []) this.state.parts.push(text);
      following.delete(seq);
    }
  }

  private removePart(part: TextPart): void {
    const index = this.textParts.indexOf(part);
    if (index !== -1) this.textParts.splice(index, 1);
  }

  private clearRow(row: CollectedRow): void {
    if (row.part) this.removePart(row.part);
    row.part = undefined;
    row.missing = false;
    row.missingUpdatedSeq = undefined;
  }

  private trackDeletes(deletes: RowPosition[] | undefined): void {
    for (const deletion of deletes ?? []) {
      this.advanceCursor(deletion.updatedSeq);
      // updatedSeq belongs to the deletion event, not to the row being removed.
      if (deletion.seq === undefined && deletion.entryId === undefined) continue;
      const row = this.collectRow({ seq: deletion.seq, entryId: deletion.entryId });
      row.deleted = true;
      this.clearRow(row);
    }
  }

  private consumeDirectText(entry: TranscriptEntry | undefined): void {
    if (
      entry?.kind === "send-message" &&
      entry.message?.type === "text" &&
      typeof entry.message.content === "string"
    ) {
      const content = entry.message.content;
      const transcript = this.textParts.find(
        (part) => !part.direct && !part.paired && part.text === content
      );
      if (transcript) {
        transcript.paired = true;
        return;
      }
      if (this.textParts.at(-1)?.text === content) return;
      this.textParts.push({ text: content, direct: true, paired: false });
      this.syncParts();
    }
  }
}
