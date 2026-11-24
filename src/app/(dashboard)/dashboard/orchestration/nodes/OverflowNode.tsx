"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { FlowNode } from "@omniroute/ui-kit/flow-node";
import Badge from "@/shared/components/Badge";
import { ORCH_STATES, orchStateBadgeVariant, type OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function OverflowNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const count = Object.values(data.counts ?? {}).reduce((a, b) => a + (b ?? 0), 0);
  const states = ORCH_STATES.filter((s) => (data.counts?.[s] ?? 0) > 0);
  return (
    <>
      <FlowNode
        size="sm"
        className="cursor-pointer border-dashed"
        aria-label={t("overflowMore", { count })}
        title={t("overflowMore", { count })}
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
    </>
  );
}

export const OverflowNode = memo(OverflowNodeImpl);
OverflowNode.displayName = "OverflowNode";
