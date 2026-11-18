"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Card from "@/shared/components/Card";
import CodePreview from "@/shared/components/CodePreview";
import type { JSX } from "react";
import IconChip from "@/shared/components/IconChip";

// SSR-safe origin via useSyncExternalStore.
// Server snapshot returns "" (avoids hydration mismatch).
function useOrigin(): string {
  return useSyncExternalStore(
    () => () => {}, // no external subscription needed
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    () => "" // server snapshot
  );
}

interface LinkCardProps {
  label: string;
  url: string;
  icon: string;
  prompt: string;
}

function LinkCard({ label, url, icon, prompt }: LinkCardProps): JSX.Element {
  const t = useTranslations("agentSkills");

  return (
    <Card.Section className="flex-1 flex items-start gap-3 min-w-0">
      <IconChip tone="accent" size="sm" className="shrink-0">
        <Icon name={icon} />
      </IconChip>
      <div className="flex-1 min-w-0">
        <span className="mb-1 block text-xs font-semibold text-text-main">{label}</span>
        <CodePreview
          showHeader={false}
          variant="surface"
          code={url}
          codeLabel={label}
          copyLabel={t("copyUrl")}
        />
        <p className="mt-1 text-xs text-text-muted leading-relaxed italic">{prompt}</p>
      </div>
    </Card.Section>
  );
}

export function McpA2aLinksBar(): JSX.Element {
  const t = useTranslations("agentSkills");
  const origin = useOrigin();

  const mcpUrl = origin ? `${origin}/api/mcp/sse` : "/api/mcp/sse";
  const a2aUrl = origin ? `${origin}/.well-known/agent.json` : "/.well-known/agent.json";

  return (
    <div className="flex flex-col sm:flex-row gap-2" data-testid="mcp-a2a-links-bar">
      <LinkCard
        label={t("mcpUrl")}
        url={mcpUrl}
        icon="electrical_services"
        prompt={t("mcpPrompt")}
      />
      <LinkCard label={t("a2aLink")} url={a2aUrl} icon="hub" prompt={t("a2aPrompt")} />
    </div>
  );
}

export default McpA2aLinksBar;
