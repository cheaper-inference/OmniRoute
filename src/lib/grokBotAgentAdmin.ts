import { randomUUID } from "node:crypto";

type AgentBinding = {
  agentId: string;
  rowId: string | null;
  name: string;
  description: string;
  memory?: Array<{ agentId: string; profile: string }>;
  skills?: Array<{ id: string; name: string; description: string; body: string; source: string }>;
  routines?: Array<{ id: string; recordJson: string }>;
  version?: number | null;
};
type Action =
  | "get"
  | "create"
  | "recreate"
  | "unbind"
  | "delete"
  | "put-memory"
  | "add-skill"
  | "update-skill"
  | "remove-skill"
  | "set-routine"
  | "remove-routine";
type Rpc = (method: string, payload: Record<string, unknown>) => Promise<unknown>;

const connectionLocks = new Map<string, Promise<void>>();

export function withGrokBotAgentLock<T>(connectionId: string, run: () => Promise<T>): Promise<T> {
  const previous = connectionLocks.get(connectionId) ?? Promise.resolve();
  const result = previous.then(run, run);
  const settled = result.then(
    () => undefined,
    () => undefined
  );
  connectionLocks.set(connectionId, settled);
  void settled.then(() => {
    if (connectionLocks.get(connectionId) === settled) connectionLocks.delete(connectionId);
  });
  return result;
}

const HARNESS_TEMPORAL = 2;
const DEFAULT_NAME = "omni-grok-bot";
const DEFAULT_DESCRIPTION = "OmniRoute durable agent.";

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/**
 * The profile field arrives as an object from the form or as a bare string from
 * older callers, where the string can only mean the name.
 */
function profileFields(value: { name?: unknown; description?: unknown } | string | undefined): {
  name?: unknown;
  description?: unknown;
} {
  if (typeof value === "string") return { name: value };
  return { name: value?.name, description: value?.description };
}

function savedAgent(data: Record<string, unknown> | null | undefined): AgentBinding | null {
  const value = data?.grokBotAgent as
    { agentId?: unknown; rowId?: unknown; name?: unknown; description?: unknown } | undefined;
  if (!value || typeof value.agentId !== "string" || !value.agentId) return null;
  return {
    agentId: value.agentId,
    rowId: typeof value.rowId === "string" ? value.rowId : null,
    name: text(value.name) ?? DEFAULT_NAME,
    description: text(value.description) ?? DEFAULT_DESCRIPTION,
  };
}

function withoutAgent(data: Record<string, unknown>): Record<string, unknown> {
  const next = { ...data };
  delete next.grokBotAgent;
  return next;
}

async function createAgent(
  rpc: Rpc,
  profile: { name: string; description: string }
): Promise<AgentBinding> {
  const agentId = randomUUID();
  const created = (await rpc("CreateGrokBotTemporalAgent", {
    agentId,
    name: profile.name,
    description: profile.description,
    title: "",
    avatarShape: "",
    avatarColor: "",
    harness: HARNESS_TEMPORAL,
    kickstartRequested: false,
    introductionSuppressed: true,
    language: "en",
  })) as { agent?: { id?: string; legacyAgentId?: string; harness?: string } };
  const agent = created.agent;
  if (!agent || agent.legacyAgentId !== agentId || agent.harness !== "temporal") {
    throw new Error("CreateGrokBotTemporalAgent returned an invalid agent");
  }
  return {
    agentId,
    rowId: agent.id ?? null,
    name: profile.name,
    description: profile.description,
  };
}

type ManagerInput = {
  action: Action;
  connection: { providerSpecificData?: Record<string, unknown> | null };
  profile?: { name?: unknown; description?: unknown } | string;
  skill?: { name?: unknown; description?: unknown; content?: unknown };
  routine?: { id?: unknown; enabled?: unknown };
  rpc: Rpc;
  save: (vendorSpecificData: Record<string, unknown>) => Promise<void>;
};

type ManagerResult = AgentBinding | { agentId: null; rowId: null };

const EMPTY_BINDING = { agentId: null, rowId: null };

function requireAgent(current: AgentBinding | null): AgentBinding {
  if (!current) throw new Error("No saved Grok Bot agent");
  return current;
}

/** Everything the roster view shows: the binding plus its memory, skills and
 *  routines, each filtered to the shapes this app can render. */
async function readAgent(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const listed = (await input.rpc("ListGrokBotMemoryShards", {})) as {
    shards?: Array<{
      agentId?: unknown;
      folder?: { profile?: unknown } | null;
    } | null> | null;
  } | null;
  const memory = Array.isArray(listed?.shards)
    ? listed.shards.flatMap((shard) =>
        shard?.agentId === current.agentId && typeof shard.folder?.profile === "string"
          ? [{ agentId: current.agentId, profile: shard.folder.profile }]
          : []
      )
    : [];
  const listedSkills = (await input.rpc("ListGrokBotAgentSkills", {
    agentId: current.agentId,
  })) as { skills?: Array<Record<string, unknown> | null> | null } | null;
  const skills = Array.isArray(listedSkills?.skills)
    ? listedSkills.skills.flatMap((skill) =>
        skill &&
        ["id", "name", "description", "body", "source"].every(
          (key) => typeof skill[key] === "string"
        )
          ? [
              {
                id: skill.id as string,
                name: skill.name as string,
                description: skill.description as string,
                body: skill.body as string,
                source: skill.source as string,
              },
            ]
          : []
      )
    : [];
  const listedRoutines = (await input.rpc("ListGrokBotAgentAutomations", {
    agentId: current.agentId,
    timeZone: "UTC",
  })) as {
    automations?: Array<{ automationId?: unknown; recordJson?: unknown } | null> | null;
  } | null;
  const routines = Array.isArray(listedRoutines?.automations)
    ? listedRoutines.automations.flatMap((item) =>
        typeof item?.automationId === "string" && typeof item.recordJson === "string"
          ? [{ id: item.automationId, recordJson: item.recordJson }]
          : []
      )
    : [];
  return { ...current, memory, skills, routines };
}

async function putMemory(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const profile = text(input.profile);
  if (!profile) throw new Error("Memory text is required");
  const written = (await input.rpc("PutGrokBotMemoryShard", {
    agentId: current.agentId,
    folder: { profile },
  })) as { version?: unknown } | null;
  const version = written?.version;
  return {
    ...current,
    version:
      typeof version === "number" &&
      Number.isInteger(version) &&
      version >= 0 &&
      version <= 4294967295
        ? version + 0
        : null,
  };
}

async function addSkill(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const skill = input.skill;
  const name = text(skill?.name);
  const description = text(skill?.description);
  const content = text(skill?.content);
  if (!name || !description || !content) throw new Error("Skill fields are required");
  await input.rpc("AddGrokBotAgentSkill", { agentId: current.agentId, name, description, content });
  return current;
}

async function updateSkill(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const skill = input.skill;
  const name = text(skill?.name);
  const content = text(skill?.content);
  const description = typeof skill?.description === "string" ? skill.description : undefined;
  if (!name || !content) throw new Error("Skill fields are required");
  await input.rpc("UpdateGrokBotAgentSkill", {
    agentId: current.agentId,
    name,
    content,
    ...(description !== undefined ? { description } : {}),
  });
  return current;
}

async function removeSkill(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const name = text(input.skill?.name);
  if (!name) throw new Error("Skill fields are required");
  await input.rpc("RemoveGrokBotAgentSkill", { agentId: current.agentId, name });
  return current;
}

async function setRoutine(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const routine = input.routine;
  const id = text(routine?.id);
  const enabled = routine?.enabled;
  if (!id || typeof enabled !== "boolean") {
    throw new Error("Routine fields are required");
  }
  await input.rpc("SetGrokBotAgentAutomationEnabled", {
    agentId: current.agentId,
    automationId: id,
    isEnabled: enabled,
    timeZone: "UTC",
  });
  return current;
}

async function removeRoutine(input: ManagerInput, current: AgentBinding): Promise<AgentBinding> {
  const id = text(input.routine?.id);
  if (!id) throw new Error("Routine fields are required");
  await input.rpc("DeleteGrokBotAgentAutomation", {
    agentId: current.agentId,
    automationId: id,
    timeZone: "UTC",
  });
  return current;
}

/** Creates (or recreates) the durable agent and forgets the previous row when a
 *  recreate produced a different one. */
async function ensureAgent(
  input: ManagerInput,
  data: Record<string, unknown>,
  current: AgentBinding | null
): Promise<AgentBinding> {
  const fromProfile = profileFields(input.profile);
  const profile = {
    name: text(fromProfile.name) ?? current?.name ?? DEFAULT_NAME,
    description: text(fromProfile.description) ?? current?.description ?? DEFAULT_DESCRIPTION,
  };
  const created = await createAgent(input.rpc, profile);
  await input.save({ ...data, grokBotAgent: created });
  if (
    input.action === "recreate" &&
    current?.rowId &&
    created.rowId &&
    current.rowId !== created.rowId
  ) {
    await input.rpc("DeleteGrokBotAgent", { id: current.rowId });
  }
  return created;
}

export async function manageGrokBotAgent(input: ManagerInput): Promise<ManagerResult> {
  const data = { ...(input.connection.providerSpecificData ?? {}) };
  const current = savedAgent(data);
  switch (input.action) {
    case "get":
      return current ? readAgent(input, current) : EMPTY_BINDING;
    case "unbind":
      await input.save(withoutAgent(data));
      return EMPTY_BINDING;
    case "delete":
      if (current?.rowId) await input.rpc("DeleteGrokBotAgent", { id: current.rowId });
      await input.save(withoutAgent(data));
      return EMPTY_BINDING;
    case "put-memory":
      return putMemory(input, requireAgent(current));
    case "add-skill":
      return addSkill(input, requireAgent(current));
    case "update-skill":
      return updateSkill(input, requireAgent(current));
    case "remove-skill":
      return removeSkill(input, requireAgent(current));
    case "set-routine":
      return setRoutine(input, requireAgent(current));
    case "remove-routine":
      return removeRoutine(input, requireAgent(current));
    case "create":
      if (current) return current;
      return ensureAgent(input, data, current);
    default:
      return ensureAgent(input, data, current);
  }
}

export async function runGrokBotAgentAction<T>(input: {
  action: Action;
  profile?: { name?: unknown; description?: unknown };
  skill?: { name?: unknown; description?: unknown; content?: unknown };
  routine?: { id?: unknown; enabled?: unknown };
  connection: { providerSpecificData?: Record<string, unknown> | null };
  manage: (value: {
    action: Action;
    profile?: { name?: unknown; description?: unknown };
    skill?: { name?: unknown; description?: unknown; content?: unknown };
    routine?: { id?: unknown; enabled?: unknown };
    connection: { providerSpecificData?: Record<string, unknown> | null };
  }) => Promise<T>;
}): Promise<T> {
  return input.manage({
    action: input.action,
    profile: input.profile,
    skill: input.skill,
    routine: input.routine,
    connection: input.connection,
  });
}
