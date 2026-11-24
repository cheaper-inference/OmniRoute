"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { FlowNode } from "@omniroute/ui-kit/flow-node";
import type { OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function ActivityNodeImpl({ data }: { data: OrchNode }) {
  return (
    <>
      <FlowNode
        size="sm"
        className="max-w-[220px]"
        aria-label={data.label}
        title={data.label}
        description={data.sublabel || undefined}
      />
      <Handle type="target" position={Position.Top} className={HANDLE} />
    </>
  );
}

export const ActivityNode = memo(ActivityNodeImpl);
ActivityNode.displayName = "ActivityNode";
