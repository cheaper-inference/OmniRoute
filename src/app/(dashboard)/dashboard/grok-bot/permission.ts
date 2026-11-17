/**
 * The four answers the desktop client offers, as the wire values
 * `GrokBotLocalToolPermissionCardResolution` declares. The field is an integer
 * enum: the service rejects both "ALLOW_ONCE" and "allow_once" with
 * "resolution must be allow_once, deny, always, or never", and answers 200 with
 * `{dispatched: true, workflowId}` only for the number. Measured 2026-10-23.
 */
const RESOLUTIONS: Record<string, number> = {
  allow_once: 1,
  deny: 2,
  always: 3,
  never: 4,
};

export type PermissionAnswer = {
  agentId: string;
  entryId: string;
  requestId: string;
  resolution: number;
};

export function permissionAnswer(input: {
  agentId: string;
  entryId: string;
  requestId: string;
  resolution: string;
}): PermissionAnswer | null {
  const resolution = RESOLUTIONS[input.resolution];
  if (resolution === undefined) return null;
  if (input.agentId === "" || input.requestId === "") return null;
  return {
    agentId: input.agentId,
    entryId: input.entryId,
    requestId: input.requestId,
    resolution,
  };
}

/**
 * What the card says about the request. The target is the machine path the bot
 * wants to touch, so it is shown verbatim rather than translated.
 */
export function permissionSummary(request: {
  action: string;
  target: string;
  machineId: string;
  machineLabel?: string;
}): string {
  const parts = [request.action, request.target].filter((part) => part !== "");
  const machine = request.machineLabel || request.machineId;
  if (machine) parts.push(machine);
  return parts.join(" ");
}

/**
 * What the route answers when the service refuses the answer. A 404 means the
 * request was already answered or has expired, which must not be retried; any
 * other failure is reported as unknown so the caller can offer a retry.
 */
export function permissionFailure(status: number | undefined): { status: number; code: string } {
  if (status === 404) return { status: 409, code: "gone" };
  return { status: 502, code: "unknown" };
}
