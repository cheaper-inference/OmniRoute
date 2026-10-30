export type GrokBotComputer = { machineId: string; label: string };

export function grokBotComputers(response: unknown): GrokBotComputer[] {
  const computers = (response as { computers?: unknown } | null)?.computers;
  if (!Array.isArray(computers)) return [];
  return computers.flatMap((entry) => {
    const record = entry as { machineId?: unknown; hello?: { label?: unknown } } | null;
    const machineId = record?.machineId;
    if (typeof machineId !== "string" || machineId.length === 0) return [];
    // The client shows `hello.label` on the permission card; without it the card
    // can only offer a uuid.
    const label = record?.hello?.label;
    return [{ machineId, label: typeof label === "string" ? label : "" }];
  });
}
