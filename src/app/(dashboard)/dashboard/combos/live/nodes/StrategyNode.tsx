"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { flowColorAlpha } from "@/shared/components/flow/edgeStyles";
import { strategyColorVar } from "../../strategyPalette";

// ── Strategy colour ───────────────────────────────────────────────────────
// Shared combos strategy palette on the kit chart tokens (strategyPalette.ts, KEA-7886 P8):
// the token paints the pill border/glow and the count chip tint; the text stays neutral ink.

// ── Node data shape ───────────────────────────────────────────────────────

export interface StrategyNodeData {
  label: string;
  strategy: string;
  targetCount: number;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * StrategyNode — pill that shows the combo routing strategy + target count.
 * Custom ReactFlow node with Left/Right Handles (left = source from request,
 * right = target into first provider cascade).
 */
export function StrategyNode({ data }: NodeProps) {
  const { strategy, targetCount } = data as StrategyNodeData;
  const color = strategyColorVar(strategy as string);
  const label = (strategy as string) || "combo";
  const count = targetCount as number;

  return (
    <div
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-full border-2 bg-bg transition-all duration-300"
      style={{
        borderColor: color,
        boxShadow: `0 0 10px ${flowColorAlpha(color, 19)}`,
        minWidth: "110px",
      }}
      data-testid="strategy-node"
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      <span
        className="text-xs font-semibold uppercase tracking-wide truncate text-text-main"
        data-testid="strategy-label"
      >
        {label}
      </span>
      {count > 0 && (
        <span
          className="text-[10px] font-mono px-1.5 rounded-full text-text-muted"
          style={{ backgroundColor: flowColorAlpha(color, 13) }}
          data-testid="strategy-target-count"
        >
          {count} target{count !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

export default StrategyNode;
