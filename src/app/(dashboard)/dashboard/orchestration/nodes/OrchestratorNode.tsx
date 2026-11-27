"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { FlowNode } from "@omniroute/ui-kit/flow-node";
import type { OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function OrchestratorNodeImpl({ data }: { data: OrchNode }) {
  return (
    <>
      <FlowNode aria-label={data.label} title={data.label} status="accent" />
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </>
  );
}

export const OrchestratorNode = memo(OrchestratorNodeImpl);
OrchestratorNode.displayName = "OrchestratorNode";
