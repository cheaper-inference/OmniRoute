export type LiveAgent = {
  agentId?: string;
  isRunningTurn?: boolean;
  isRunning?: boolean;
  staleAfterMs?: number;
  updatedAtMs?: number;
};

type TranscriptRow = { seq?: string; body?: string; updatedSeq?: string };
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
  rows?: { entries?: TranscriptRow[]; deletes?: Array<{ updatedSeq?: string }> };
  entry?: TranscriptEntry;
};

export type WatchFrameState = {
  agentId: string;
  messageId: string;
  parts: string[];
  pendingSeqs: Set<string>;
  pendingAcks: Set<string>;
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
  let decoded: {
    clientNonce?: string;
    kind?: string;
    message?: { type?: string; content?: string };
  };
  try {
    decoded = JSON.parse(Buffer.from(row.body!, "base64").toString("utf-8"));
  } catch {
    return null;
  }
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
  constructor(private readonly state: WatchFrameState) {}

  consume(event: unknown): boolean {
    const frame = event as WatchFrame;
    assertFrameStatus(frame);
    if (this.isForeignFrame(frame)) return false;
    if (this.consumeLive(frame)) return true;
    if (frame.agent) {
      const running = this.runningOf(frame.agent);
      if (running !== null && this.state.onRunning(running)) return true;
    }
    this.consumeSubmit(frame.entry);
    if (this.consumeRows(frame)) return false;
    this.consumeDirectText(frame.entry);
    return false;
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
      if (running) this.state.onStale(staleWindow(live));
      const textArrived = this.state.parts.some((part) => !part.startsWith("\u0000submit:"));
      if (textArrived && running !== true) return true;
      // Keep the existing window if the running flag drops before its text row.
      if (running === false && live.staleAfterMs && !textArrived) continue;
      if (running !== null && this.state.onRunning(running)) return true;
    }
    return false;
  }

  private consumeSubmit(entry: TranscriptEntry | undefined): void {
    if (
      entry?.kind === "tool-call" &&
      entry.tool?.name === "submit_answer" &&
      entry.tool.callId &&
      typeof entry.tool.content === "string"
    ) {
      this.state.onSubmit(entry.tool.content);
    }
  }

  private trackRow(row: TranscriptRow): boolean {
    const { cursor, pendingSeqs, pendingAcks } = this.state;
    if (
      row.updatedSeq !== undefined &&
      (cursor.ack === "0" || BigInt(row.updatedSeq) > BigInt(cursor.ack))
    ) {
      cursor.ack = row.updatedSeq;
    }
    if (!row.body) {
      if (row.seq !== undefined) pendingSeqs.add(row.seq);
      if (row.updatedSeq !== undefined) pendingAcks.add(row.updatedSeq);
      return false;
    }
    if (row.seq !== undefined) pendingSeqs.delete(row.seq);
    if (row.updatedSeq !== undefined) pendingAcks.delete(row.updatedSeq);
    return true;
  }

  private consumeRows(frame: WatchFrame): boolean {
    for (const row of frame.rows?.entries ?? []) {
      if (!this.trackRow(row)) continue;
      const text = decodedAssistantText(row, this.state.messageId);
      if (text === null) continue;
      const added = this.state.parts.at(-1) !== text;
      if (added) this.state.parts.push(text);
      const liveRunning = (frame.agentState?.live ?? []).some(
        (live) => this.runningOf(live) === true
      );
      const stillRunning = this.runningOf(frame.agent) === true || liveRunning;
      if (added && !stillRunning) this.state.onStale(2_000);
      // Preserve the protocol's one-assistant-row-at-a-time acknowledgement behavior.
      return true;
    }
    return false;
  }

  private consumeDirectText(entry: TranscriptEntry | undefined): void {
    if (
      entry?.kind === "send-message" &&
      entry.message?.type === "text" &&
      typeof entry.message.content === "string"
    ) {
      if (this.state.parts.at(-1) !== entry.message.content)
        this.state.parts.push(entry.message.content);
    }
  }
}
