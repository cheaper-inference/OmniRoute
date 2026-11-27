"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { FlowNode } from "@omniroute/ui-kit/flow-node";
import Badge from "@/shared/components/Badge";
import { cn } from "@/shared/utils/cn";
import { ORCH_STATES, orchStateBadgeVariant, type OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";
const LABEL_KEY: Record<string, string> = {
  "cloud-agent": "sourceCloudAgent",
  a2a: "sourceA2A",
  conductor: "sourceConductor",
};

function SourceNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const stale = data.sourceIssue === "error"; // set by mergeSnapshot for failed sources
  const collapsed = !!data.collapsed; // set by orchestrationToFlow's opts.collapsed
  const label = data.source && LABEL_KEY[data.source] ? t(LABEL_KEY[data.source]) : data.label;
  // Formatting a prop, not sampling the clock during render (react-hooks/purity) —
  // `data.staleSince` is a snapshot value set once by mergeSnapshot, not `Date.now()`.
  const since =
    data.staleSince && Number.isFinite(Date.parse(data.staleSince))
      ? new Date(data.staleSince).toLocaleTimeString()
      : "—";
  const states = ORCH_STATES.filter((s) => (data.counts?.[s] ?? 0) > 0);
  const offline = data.sourceIssue === "offline";
  return (
    // FlowNode names its heading `title`, so the tooltip and the disclosure state stay on a
    // wrapper: hovering anywhere on the node says what a click does.
    <div
      aria-label={label}
      aria-expanded={!collapsed}
      title={t(collapsed ? "sourceExpand" : "sourceCollapse")}
    >
      <FlowNode
        size="sm"
        className={cn("min-w-[150px]", stale && "opacity-70")}
        icon={<span>{collapsed ? "▸" : "▾"}</span>}
        title={
          <>
            {stale && (
              <span aria-hidden className="mr-1">
                ⚠
              </span>
            )}
            {label}
          </>
        }
        status={stale ? "warning" : undefined}
        statusLabel={stale ? t("sourceStale", { since }) : offline ? t("sourceOffline") : undefined}
      >
        {states.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {states.map((s) => (
              <Badge key={s} size="sm" variant={orchStateBadgeVariant(s)}>
                {data.counts?.[s]}
              </Badge>
            ))}
          </div>
        ) : undefined}
      </FlowNode>
      <Handle type="target" position={Position.Top} className={HANDLE} />
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </div>
  );
}

export const SourceNode = memo(SourceNodeImpl);
SourceNode.displayName = "SourceNode";
