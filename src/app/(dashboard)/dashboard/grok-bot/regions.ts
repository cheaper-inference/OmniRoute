/** Region list and their labels, kept apart from the page so the panel
 *  components and the page agree on order and keys. */

export const REGION_IDS = ["accounts", "roster", "conversation", "skills", "computers"] as const;

export type RegionId = (typeof REGION_IDS)[number];

const REGION_ICONS: Record<RegionId, string> = {
  accounts: "badge",
  roster: "group",
  conversation: "chat",
  skills: "extension",
  computers: "computer",
};

const STATUS_KEYS: Record<"running" | "idle" | "stale", string> = {
  running: "stateRunning",
  idle: "stateIdle",
  stale: "stateStale",
};

export function statusKey(status: "running" | "idle" | "stale"): string {
  return STATUS_KEYS[status];
}

export type Region = {
  id: RegionId;
  title: string;
  empty: string;
  icon: string;
};

export function grokBotRegions(text: (key: string) => string = (key) => key): Region[] {
  return REGION_IDS.map((id) => ({
    id,
    title: text(`${id}Title`),
    empty: text(`${id}Empty`),
    icon: REGION_ICONS[id],
  }));
}

export function grokBotAccounts(
  connections: Array<Record<string, unknown>>
): Array<{ id: string; name: string; email: string }> {
  return connections.flatMap((connection) => {
    if (connection.provider !== "grok-bot") return [];
    if (typeof connection.id !== "string" || typeof connection.name !== "string") return [];
    const email = typeof connection.email === "string" ? connection.email : "";
    return [{ id: connection.id, name: connection.name, email }];
  });
}
