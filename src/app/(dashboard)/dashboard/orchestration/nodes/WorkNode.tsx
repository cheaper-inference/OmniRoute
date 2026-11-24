"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { FlowNode } from "@omniroute/ui-kit/flow-node";
import { orchStateTone, type OrchNode, type OrchState } from "../model/orchestrationTypes";

const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function WorkNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const state = data.state ?? "queued";
  return (
    <>
      <FlowNode
        size="sm"
        aria-label={`${data.label} — ${t(STATE_KEY[state])}`}
        className="min-w-[180px] max-w-[240px]"
        title={data.label}
        description={data.sublabel || undefined}
        status={orchStateTone(state)}
        statusLabel={t(STATE_KEY[state])}
        active={state === "running"}
      >
        {data.mirrorOf ? <span className="text-text-muted">{t("mirroredInA2A")}</span> : undefined}
      </FlowNode>
      <Handle type="target" position={Position.Top} className={HANDLE} />
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </>
  );
}

export const WorkNode = memo(WorkNodeImpl);
WorkNode.displayName = "WorkNode";
