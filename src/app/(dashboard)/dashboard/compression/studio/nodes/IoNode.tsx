"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { flowColorAlpha } from "@/shared/components/flow/edgeStyles";

// ── Node data shapes ──────────────────────────────────────────────────────

export interface IoNodeData {
  variant: "input" | "output";
  tokens: number;
  savingsPercent?: number;
  label?: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

export function IoNode({ data }: NodeProps) {
  const { variant, tokens, savingsPercent } = data as IoNodeData;

  const isInput = variant === "input";
  // Input/output identity pair on the kit chart tokens (KEA-7886 P8): chart-2 (blue) for input,
  // chart-4 (green) for output. The token paints border + glow; the text stays neutral ink.
  const color = isInput ? "var(--color-chart-2)" : "var(--color-chart-4)";

  return (
    <div
      className="rounded-xl border-2 bg-bg px-4 py-3 min-w-[120px] text-center transition-all duration-200"
      style={{
        borderColor: color,
        boxShadow: `0 0 12px ${flowColorAlpha(color, 15)}`,
      }}
    >
      {/* Input only uses source handle; Output only uses target handle */}
      {isInput ? (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      ) : (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      )}

      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1 text-text-muted">
        {isInput ? "Input" : "Output"}
      </div>

      <div className="text-base font-bold text-text-main">
        {(tokens as number).toLocaleString()}
      </div>
      <div className="text-[10px] text-text-muted">tokens</div>

      {!isInput && savingsPercent != null && (
        <div
          className="mt-1 text-[11px] font-semibold"
          style={{ color: "var(--orch-status-success)" }}
          data-testid="io-savings-percent"
        >
          {`-${(savingsPercent as number).toFixed(1)}%`}
        </div>
      )}
    </div>
  );
}

export default IoNode;
