export type GrokBotComputer = {
  machineId: string;
  label: string;
  lastSeen: string;
  localRoot: string;
  terminalsFolder: string;
  variant: string;
  kind: string;
  serverAuthoritative: boolean;
  supervised: boolean;
  capabilities: string[];
};

function lastSeen(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  const millis = Number(value);
  if (!Number.isFinite(millis) || millis <= 0 || millis > 8_640_000_000_000_000) return "";
  return new Date(millis).toISOString();
}

function capabilityNames(value: unknown): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.entries(value as Record<string, unknown>)
    .filter(
      ([, capability]) =>
        capability === true ||
        (typeof capability === "string" && capability !== "") ||
        (typeof capability === "number" && capability > 0) ||
        (Array.isArray(capability) && capability.length > 0)
    )
    .map(([name]) => name)
    .sort();
}

export function grokBotComputers(response: unknown): GrokBotComputer[] {
  const computers = (response as { computers?: unknown } | null)?.computers;
  if (!Array.isArray(computers)) return [];
  return computers.flatMap((entry) => {
    const record = entry as {
      machineId?: unknown;
      lastSeenAtMs?: unknown;
      hello?: {
        label?: unknown;
        localRoot?: unknown;
        terminalsFolder?: unknown;
        variant?: unknown;
        kind?: unknown;
        serverAuthoritative?: unknown;
        supervised?: unknown;
        capabilities?: unknown;
      };
    } | null;
    const machineId = record?.machineId;
    if (typeof machineId !== "string" || machineId.length === 0) return [];
    const hello = record?.hello && typeof record.hello === "object" ? record.hello : {};
    return [
      {
        machineId,
        label: typeof hello.label === "string" ? hello.label : "",
        lastSeen: lastSeen(record?.lastSeenAtMs),
        localRoot: typeof hello.localRoot === "string" ? hello.localRoot : "",
        terminalsFolder: typeof hello.terminalsFolder === "string" ? hello.terminalsFolder : "",
        variant: typeof hello.variant === "string" ? hello.variant : "",
        kind: typeof hello.kind === "string" ? hello.kind : "",
        serverAuthoritative: hello.serverAuthoritative === true,
        supervised: hello.supervised === true,
        capabilities: capabilityNames(hello.capabilities),
      },
    ];
  });
}
