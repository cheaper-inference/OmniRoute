"use client";

import { useCallback, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Tooltip from "@/shared/components/Tooltip";

interface FlowNodeProps {
  icon: string;
  color: "primary" | "orange" | "blue" | "emerald" | "amber" | "purple" | "cyan" | "pink";
  title: string;
  example: string;
  tooltipContent?: string;
}

// Categorical node accents on the kit chart tokens (theme-aware, both modes).
const COLOR_MAP: Record<FlowNodeProps["color"], { border: string; bg: string; text: string }> = {
  primary: { border: "border-primary/30", bg: "bg-primary/5", text: "text-primary" },
  orange: { border: "border-chart-5/30", bg: "bg-chart-5/5", text: "text-chart-5" },
  blue: { border: "border-chart-2/30", bg: "bg-chart-2/5", text: "text-chart-2" },
  emerald: { border: "border-chart-4/30", bg: "bg-chart-4/5", text: "text-chart-4" },
  amber: { border: "border-warning/30", bg: "bg-warning/5", text: "text-warning" },
  purple: { border: "border-chart-3/30", bg: "bg-chart-3/5", text: "text-chart-3" },
  cyan: { border: "border-info/30", bg: "bg-info/5", text: "text-info" },
  pink: { border: "border-chart-5/30", bg: "bg-chart-5/5", text: "text-chart-5" },
};

function FlowNode({ icon, color, title, example, tooltipContent }: FlowNodeProps) {
  const c = COLOR_MAP[color];
  const node: ReactNode = (
    <div
      className={`flex flex-col items-center gap-1 rounded-lg border ${c.border} ${c.bg} px-3 py-2 text-center min-w-0`}
    >
      <Icon name={icon} size={20} className={c.text} />
      <p className="text-[11px] font-semibold text-text-main leading-tight">{title}</p>
      <p className="text-[10px] text-text-muted leading-tight">{example}</p>
    </div>
  );

  return tooltipContent ? (
    <Tooltip content={tooltipContent} position="top" multiline>
      {node}
    </Tooltip>
  ) : (
    node
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-text-muted">
      <Icon name="arrow_forward" size={20} className="rotate-90 sm:rotate-0" />
      {label && <span className="text-[9px] uppercase tracking-wide mt-0.5">{label}</span>}
    </div>
  );
}

export default function TranslateFlowDiagram() {
  const t = useTranslations("translator");
  const tr = useCallback(
    (key: string, fallback: string) => {
      try {
        const translated = t(key);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 sm:gap-3 sm:items-stretch">
      <FlowNode
        icon="smart_toy"
        color="primary"
        title={tr("conceptDiagramAppLabel", "Your app")}
        example={tr("conceptDiagramExampleApp", "ex: SDK Anthropic")}
      />
      <FlowArrow label={tr("conceptDiagramArrow1", "speaks")} />
      <FlowNode
        icon="psychology"
        color="orange"
        title={tr("conceptDiagramSourceLabel", "Source format")}
        example={tr("conceptDiagramExampleSource", "claude")}
        tooltipContent={tr(
          "conceptDiagramSourceTooltip",
          "The API protocol format your app speaks (for example Anthropic Messages, OpenAI Chat Completions, or Gemini)."
        )}
      />
      <FlowArrow label={tr("conceptDiagramArrow2", "Translator")} />
      <FlowNode
        icon="hub"
        color="emerald"
        title={tr("conceptDiagramHubLabel", "OpenAI (hub)")}
        example={tr("conceptDiagramExampleHub", "pivot format")}
        tooltipContent={tr(
          "conceptDiagramHubTooltip",
          "Intermediate hub used by the translator to convert between formats that are not directly compatible. All formats pass through OpenAI as the pivot."
        )}
      />
      <FlowArrow label={tr("conceptDiagramArrow3", "→")} />
      <FlowNode
        icon="auto_awesome"
        color="blue"
        title={tr("conceptDiagramTargetLabel", "Target provider")}
        example={tr("conceptDiagramExampleTarget", "Gemini")}
        tooltipContent={tr(
          "conceptDiagramTargetTooltip",
          "The provider connected in OmniRoute that actually responds, such as Google Gemini or Anthropic."
        )}
      />
    </div>
  );
}
