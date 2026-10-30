"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components";

type AgentBinding = {
  agentId: string | null;
  rowId: string | null;
  name?: string | null;
  description?: string | null;
  memory?: Array<{ profile?: string | null }>;
  skills?: Array<{ name?: string | null }>;
  routines?: Array<{ id?: string | null }>;
};

export default function GrokBotAgentPanel({ connectionId }: { connectionId: string }) {
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

  function applyResponse(response: Response, body: AgentBinding & { error?: string }) {
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

  useEffect(() => {
    const controller = new AbortController();
    const request = fetch(endpoint, { signal: controller.signal }).then(async (response) => ({
      response,
      body: (await response.json()) as AgentBinding & { error?: string },
    }));
    void request.then(
      ({ response, body }) => applyResponse(response, body),
      () => {
        if (!controller.signal.aborted) setError("Request failed");
      }
    );
    return () => controller.abort();
  }, [endpoint, requestId]);

  async function send(
    method: "POST" | "DELETE",
    body?: {
      action?: string;
      profile?: { name: string; description: string } | string;
      skill?: { name: string; description?: string; content?: string };
      routine?: { id: string; enabled?: boolean };
    },
    mode?: string
  ) {
    const response = await fetch(mode ? `${endpoint}?mode=${mode}` : endpoint, {
      method,
      headers: body ? { "content-type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const next = (await response.json()) as AgentBinding & { error?: string };
    if (!response.ok) {
      setError(next.error ?? "Request failed");
      return;
    }
    setError("");
    setAgent(next);
    setRequestId((value) => value + 1);
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-border/40 pt-2">
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
      <input name="agentName" value={name} onChange={(event) => setName(event.target.value)} />
      <input
        name="agentDescription"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        name="memoryText"
        value={memoryText}
        onChange={(event) => setMemoryText(event.target.value)}
      />
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send("POST", { action: "put-memory", profile: memoryText })}
      >
        Save memory
      </Button>
      <input name="skillName" value={skillName} onChange={(event) => setSkillName(event.target.value)} />
      <input
        name="skillDescription"
        value={skillDescription}
        onChange={(event) => setSkillDescription(event.target.value)}
      />
      <input
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
          void send("POST", {
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
          void send("POST", {
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
        onClick={() => void send("POST", { action: "remove-skill", skill: { name: skillName } })}
      >
        Remove skill
      </Button>
      <input name="routineId" value={routineId} onChange={(event) => setRoutineId(event.target.value)} />
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() =>
          void send("POST", { action: "set-routine", routine: { id: routineId, enabled: false } })
        }
      >
        Disable routine
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send("POST", { action: "remove-routine", routine: { id: routineId } })}
      >
        Remove routine
      </Button>
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send("POST", { profile: { name, description } })}
      >
        Create
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        disabled={!loaded}
        onClick={() => void send("POST", { action: "recreate", profile: { name, description } })}
      >
        Recreate
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs"
        onClick={() => void send("DELETE", undefined, "unbind")}
      >
        Unbind
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="!h-7 !px-2 text-xs text-red-500 hover:text-red-400"
        onClick={() => void send("DELETE", undefined, "delete")}
      >
        Delete remote
      </Button>
    </div>
  );
}
