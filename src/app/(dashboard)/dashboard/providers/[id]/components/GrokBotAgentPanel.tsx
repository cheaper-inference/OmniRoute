"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@/shared/components";

type AgentBinding = {
  agentId: string | null;
  rowId: string | null;
  name?: string | null;
  description?: string | null;
  memory?: Array<{ profile?: string | null }>;
  skills?: Array<{ name?: string | null }>;
  routines?: Array<{ id?: string | null }>;
};

/** Requests belong to one keyed connection editor, including Strict Mode remounts. */
function useRequestOwnership() {
  const lifetimeRef = useRef<AbortController | null>(null);
  const requestVersionRef = useRef(0);
  useEffect(() => {
    const controller = new AbortController();
    lifetimeRef.current = controller;
    return () => controller.abort();
  }, []);
  return { lifetimeRef, requestVersionRef };
}

function useAgentEditor({ connectionId }: { connectionId: string }) {
  const ownership = useRequestOwnership();
  const [agent, setAgent] = useState<AgentBinding>({ agentId: null, rowId: null });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [skillContent, setSkillContent] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState(0);
  const endpoint = `/api/providers/${connectionId}/grok-bot-agent`;

  return {
    ...ownership,
    agent,
    setAgent,
    name,
    setName,
    description,
    setDescription,
    memoryText,
    setMemoryText,
    skillName,
    setSkillName,
    skillDescription,
    setSkillDescription,
    skillContent,
    setSkillContent,
    routineId,
    setRoutineId,
    loaded,
    setLoaded,
    error,
    setError,
    requestId,
    setRequestId,
    endpoint,
  };
}
type Editor = ReturnType<typeof useAgentEditor>;
function useAgentLoad(editor: Editor) {
  const {
    endpoint,
    requestId,
    requestVersionRef,
    setError,
    setAgent,
    setName,
    setDescription,
    setLoaded,
  } = editor;
  useEffect(() => {
    const controller = new AbortController();
    const version = ++requestVersionRef.current;
    const ownsRequest = () => !controller.signal.aborted && requestVersionRef.current === version;
    function applyResponse(response: Response, body: AgentBinding & { error?: string }) {
      if (!ownsRequest()) return;
      if (!response.ok) {
        setError(body.error ?? "Request failed");
        return;
      }
      setError("");
      setAgent(body);
      setName(body.name ?? "");
      setDescription(body.description ?? "");
      setLoaded(true);
    }

    const request = fetch(endpoint, { signal: controller.signal }).then(async (response) => ({
      response,
      body: (await response.json()) as AgentBinding & { error?: string },
    }));
    void request.then(
      ({ response, body }) => applyResponse(response, body),
      () => {
        if (ownsRequest()) setError("Request failed");
      }
    );
    return () => controller.abort();
  }, [
    endpoint,
    requestId,
    requestVersionRef,
    setError,
    setAgent,
    setName,
    setDescription,
    setLoaded,
  ]);
}
async function send(
  editor: Editor,
  method: "POST" | "DELETE",
  body?: {
    action?: string;
    profile?: { name: string; description: string } | string;
    skill?: { name: string; description?: string; content?: string };
    routine?: { id: string; enabled?: boolean };
  },
  mode?: string
) {
  const { endpoint, lifetimeRef, requestVersionRef, setError, setAgent, setRequestId } = editor;
  const signal = lifetimeRef.current?.signal;
  if (!signal || signal.aborted) return;
  const version = ++requestVersionRef.current;
  const ownsRequest = () => !signal.aborted && requestVersionRef.current === version;
  try {
    const response = await fetch(mode ? `${endpoint}?mode=${mode}` : endpoint, {
      method,
      signal,
      headers: body ? { "content-type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const next = (await response.json()) as AgentBinding & { error?: string };
    if (!ownsRequest()) return;
    if (!response.ok) {
      setError(next.error ?? "Request failed");
      return;
    }
    setError("");
    setAgent(next);
    setRequestId((value) => value + 1);
  } catch {
    if (ownsRequest()) setError("Request failed");
  }
}

function BindingSummary({ editor }: { editor: Editor }) {
  const { agent } = editor;
  return (
    <>
      <span className="text-xs text-text-muted">Agent: {agent.agentId ?? "none"}</span>
      <span className="text-xs text-text-muted">Row: {agent.rowId ?? "none"}</span>
      {(agent.memory ?? []).map((item, index) => (
        <span className="text-xs text-text-muted" key={`${item.profile ?? ""}-${index}`}>
          Memory: {item.profile}
        </span>
      ))}
      {(agent.skills ?? []).map((skill, index) => (
        <span className="text-xs text-text-muted" key={`${skill.name ?? ""}-${index}`}>
          Skill: {skill.name}
        </span>
      ))}
      {(agent.routines ?? []).map((routine, index) => (
        <span className="text-xs text-text-muted" key={`${routine.id ?? ""}-${index}`}>
          Routine: {routine.id}
        </span>
      ))}
    </>
  );
}
function MemoryEditor({ editor }: { editor: Editor }) {
  const { name, setName, description, setDescription, memoryText, setMemoryText, loaded } = editor;
  return (
    <>
      <Input
        aria-label="Agent name"
        name="agentName"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        aria-label="Agent description"
        name="agentDescription"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        aria-label="Memory"
        name="memoryText"
        value={memoryText}
        onChange={(event) => setMemoryText(event.target.value)}
      />
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send(editor, "POST", { action: "put-memory", profile: memoryText })}
      >
        Save memory
      </Button>
    </>
  );
}
function SkillEditor({ editor }: { editor: Editor }) {
  const {
    skillName,
    setSkillName,
    skillDescription,
    setSkillDescription,
    skillContent,
    setSkillContent,
    loaded,
  } = editor;
  return (
    <>
      <Input
        aria-label="Skill name"
        name="skillName"
        value={skillName}
        onChange={(event) => setSkillName(event.target.value)}
      />
      <Input
        aria-label="Skill description"
        name="skillDescription"
        value={skillDescription}
        onChange={(event) => setSkillDescription(event.target.value)}
      />
      <Input
        aria-label="Skill content"
        name="skillContent"
        value={skillContent}
        onChange={(event) => setSkillContent(event.target.value)}
      />
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", {
            action: "add-skill",
            skill: { name: skillName, description: skillDescription, content: skillContent },
          })
        }
      >
        Add skill
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", {
            action: "update-skill",
            skill: skillDescription
              ? { name: skillName, description: skillDescription, content: skillContent }
              : { name: skillName, content: skillContent },
          })
        }
      >
        Change skill
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", { action: "remove-skill", skill: { name: skillName } })
        }
      >
        Remove skill
      </Button>
    </>
  );
}
function RoutineEditor({ editor }: { editor: Editor }) {
  const { routineId, setRoutineId, loaded } = editor;
  return (
    <>
      <Input
        aria-label="Routine ID"
        name="routineId"
        value={routineId}
        onChange={(event) => setRoutineId(event.target.value)}
      />
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", {
            action: "set-routine",
            routine: { id: routineId, enabled: false },
          })
        }
      >
        Disable routine
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", { action: "remove-routine", routine: { id: routineId } })
        }
      >
        Remove routine
      </Button>
    </>
  );
}
function AgentActions({ editor }: { editor: Editor }) {
  const { name, description, loaded, error } = editor;
  return (
    <>
      {error ? <span className="text-xs text-error">{error}</span> : null}
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send(editor, "POST", { profile: { name, description } })}
      >
        Create
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send(editor, "POST", { action: "recreate", profile: { name, description } })
        }
      >
        Recreate
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        onClick={() => void send(editor, "DELETE", undefined, "unbind")}
      >
        Unbind
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs text-error hover:text-error"
        onClick={() => void send(editor, "DELETE", undefined, "delete")}
      >
        Delete remote
      </Button>
    </>
  );
}
function ConnectionAgentEditor({ connectionId }: { connectionId: string }) {
  const editor = useAgentEditor({ connectionId });
  useAgentLoad(editor);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-border/40 pt-2">
      <BindingSummary editor={editor} />
      <MemoryEditor editor={editor} />
      <SkillEditor editor={editor} />
      <RoutineEditor editor={editor} />
      <AgentActions editor={editor} />
    </div>
  );
}

export default function GrokBotAgentPanel({ connectionId }: { connectionId: string }) {
  // Changing connections discards every editor field before the new endpoint is usable.
  return <ConnectionAgentEditor key={connectionId} connectionId={connectionId} />;
}
