/**
 * Replies for the two cards that the desktop client can answer.
 * Connector grants use GrokBotConnectorGrantResolution. Widgets use
 * RespondGrokBotWidget, whose request is agent id, entry id, value and an
 * empty session id. The numbers below are the enum declared by the client.
 */

const CONNECTOR_RESOLUTIONS: Record<string, number> = {
  allowed: 1,
  skipped: 2,
  always_this_bot: 3,
  always_all_team_bots: 4,
  allow_in_channel: 5,
};

export type ConnectorGrant = {
  agentId: string;
  entryId: string;
  requestId: string;
  resolution: number;
  sessionId: string;
};

export function connectorGrant(input: {
  agentId: string;
  entryId: string;
  requestId: string;
  resolution: string;
}): ConnectorGrant | null {
  const resolution = CONNECTOR_RESOLUTIONS[input.resolution];
  if (resolution === undefined) return null;
  if (input.agentId === "" || input.requestId === "") return null;
  return {
    agentId: input.agentId,
    entryId: input.entryId,
    requestId: input.requestId,
    resolution,
    sessionId: "",
  };
}

export type WidgetReply = {
  agentId: string;
  entryId: string;
  value: string;
  sessionId: string;
};

export function widgetReply(input: {
  agentId: string;
  entryId: string;
  value: string;
}): WidgetReply | null {
  if (input.agentId === "" || input.entryId === "" || input.value.trim() === "") return null;
  return {
    agentId: input.agentId,
    entryId: input.entryId,
    value: input.value,
    sessionId: "",
  };
}

export type WidgetDismissal = {
  agentId: string;
  entryId: string;
  sessionId: string;
};

export function widgetDismissal(input: {
  agentId: string;
  entryId: string;
}): WidgetDismissal | null {
  if (input.agentId === "" || input.entryId === "") return null;
  return { agentId: input.agentId, entryId: input.entryId, sessionId: "" };
}

export type SecretReply = {
  agentId: string;
  entryId: string;
  value: string;
  sessionId: string;
};

export function secretReply(input: {
  agentId: string;
  entryId: string;
  value: string;
}): SecretReply | null {
  if (input.agentId === "" || input.entryId === "" || input.value.trim() === "") return null;
  return { agentId: input.agentId, entryId: input.entryId, value: input.value, sessionId: "" };
}

export type DraftDiscard = {
  agentId: string;
  entryId: string;
  sessionId: string;
};

export function draftDiscard(input: {
  agentId: string;
  entryId: string;
}): DraftDiscard | null {
  if (input.agentId === "" || input.entryId === "") return null;
  return { agentId: input.agentId, entryId: input.entryId, sessionId: "" };
}

export function cardAccepted(answer: unknown): boolean {
  return answer === null || (
    !!answer && typeof answer === "object" && !("error" in answer) && !("code" in answer)
    && !("refusal" in answer) && !("status" in answer) && !("message" in answer)
  );
}
