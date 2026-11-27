"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { FlowNode } from "@omniroute/ui-kit/flow-node";

// ── Node data shapes ──────────────────────────────────────────────────────

export interface IoNodeData {
  variant: "input" | "output";
  tokens: number;
  savingsPercent?: number;
  label?: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

export function IoNode({ data }: NodeProps) {
  const t = useTranslations("compressionStudio");
  const { variant, tokens, savingsPercent } = data as IoNodeData;

  const isInput = variant === "input";
  // Input/output identity pair on the kit chart tokens (KEA-7886 P8): chart-2 (blue) for input,
  // chart-4 (green) for output. The token paints the marker beside the title; the text stays
  // neutral ink.
  const color = isInput ? "var(--color-chart-2)" : "var(--color-chart-4)";
  const hasSavings = !isInput && savingsPercent != null;

  return (
    <>
      <FlowNode
        className="min-w-[120px]"
        icon={<span className="block size-2 rounded-full" style={{ backgroundColor: color }} />}
        title={isInput ? t("input") : t("output")}
        description={t("tokenCount", { count: tokens as number })}
        status={hasSavings ? "success" : undefined}
        statusLabel={
          hasSavings ? (
            <span data-testid="io-savings-percent">
              {`-${(savingsPercent as number).toFixed(1)}%`}
            </span>
          ) : undefined
        }
      />
      {/* Input only uses source handle; Output only uses target handle */}
      {isInput ? (
        <Handle type="source" position={Position.Right} className={HANDLE} />
      ) : (
        <Handle type="target" position={Position.Left} className={HANDLE} />
      )}
    </>
  );
}

export default IoNode;
