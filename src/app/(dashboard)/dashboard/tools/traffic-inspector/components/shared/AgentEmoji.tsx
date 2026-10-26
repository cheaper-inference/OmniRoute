"use client";

import type { AgentId } from "@/mitm/types";

// The emoji carries each agent's colour; the label text uses the muted token (light + dark).
const AGENT_COLORS: Record<AgentId, { emoji: string; label: string }> = {
  antigravity: { emoji: "🔵", label: "AG" },
  kiro: { emoji: "🟠", label: "KR" },
  copilot: { emoji: "🟢", label: "CP" },
  "ghe-copilot": { emoji: "🟩", label: "GHE" },
  codex: { emoji: "🟣", label: "CD" },
  cursor: { emoji: "🔶", label: "CU" },
  zed: { emoji: "🔷", label: "ZD" },
  "claude-code": { emoji: "🟡", label: "CC" },
  "open-code": { emoji: "⚪", label: "OC" },
  trae: { emoji: "⬛", label: "TR" },
};

interface AgentEmojiProps {
  agentId?: AgentId | string;
  className?: string;
}

export function AgentEmoji({ agentId, className }: AgentEmojiProps) {
  if (!agentId) return <span className={`text-sm ${className ?? ""}`}>🌐</span>;
  const info = AGENT_COLORS[agentId as AgentId];
  if (!info) return <span className={`text-sm ${className ?? ""}`}>🌐</span>;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-mono text-text-muted ${className ?? ""}`}
      title={agentId}
    >
      {info.emoji} {info.label}
    </span>
  );
}
