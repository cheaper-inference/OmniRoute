import { matchesSearch } from "@/shared/utils/turkishText";

export type GrokBotRosterEntry = {
  agentId: string;
  name: string;
  chiefOfStaff: boolean;
};

export function grokBotRoster(payload: unknown): GrokBotRosterEntry[] {
  const agents =
    payload && typeof payload === "object" && "agents" in payload
      ? (payload as { agents?: unknown }).agents
      : null;
  if (!Array.isArray(agents)) return [];

  const entries = agents.flatMap((agent) => {
    if (!agent || typeof agent !== "object") return [];
    const record = agent as { agentId?: unknown; name?: unknown };
    if (typeof record.agentId !== "string" || typeof record.name !== "string") return [];
    return [
      {
        agentId: record.agentId,
        name: record.name,
        chiefOfStaff: matchesSearch(record.name, "chief of staff"),
      },
    ];
  });

  return entries.sort((left, right) => Number(right.chiefOfStaff) - Number(left.chiefOfStaff));
}

export function rosterEntries(value: unknown): GrokBotRosterEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { agentId?: unknown; name?: unknown; chiefOfStaff?: unknown };
    if (typeof record.agentId !== "string" || typeof record.name !== "string") return [];
    return [
      {
        agentId: record.agentId,
        name: record.name,
        chiefOfStaff: record.chiefOfStaff === true,
      },
    ];
  });
}
