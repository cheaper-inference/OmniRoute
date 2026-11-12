export type GrokBotSkill = { id: string; name: string; description: string };
export type GrokBotRoutine = { id: string; name: string };

const SKILL_KEYS = ["id", "name", "description"] as const;

export function namedItems(value: unknown): Array<{ id: string; name: string }> {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { id?: unknown; name?: unknown };
    if (typeof record.id !== "string" || typeof record.name !== "string") return [];
    return [{ id: record.id, name: record.name }];
  });
}

export function grokBotSkills(payload: unknown): GrokBotSkill[] {
  const skills =
    payload && typeof payload === "object" && "skills" in payload
      ? (payload as { skills?: unknown }).skills
      : null;
  if (!Array.isArray(skills)) return [];
  return skills.flatMap((skill) => {
    if (!skill || typeof skill !== "object") return [];
    const record = skill as Record<string, unknown>;
    if (!SKILL_KEYS.every((key) => typeof record[key] === "string")) return [];
    return [
      {
        id: record.id as string,
        name: record.name as string,
        description: record.description as string,
      },
    ];
  });
}

export function grokBotRoutines(payload: unknown): GrokBotRoutine[] {
  const automations =
    payload && typeof payload === "object" && "automations" in payload
      ? (payload as { automations?: unknown }).automations
      : null;
  if (!Array.isArray(automations)) return [];
  return automations.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { automationId?: unknown; recordJson?: unknown };
    if (typeof record.automationId !== "string" || typeof record.recordJson !== "string") return [];
    let name = "";
    try {
      const parsed = JSON.parse(record.recordJson) as { name?: unknown };
      if (parsed && typeof parsed.name === "string") name = parsed.name;
    } catch {
      name = "";
    }
    return [{ id: record.automationId, name }];
  });
}
