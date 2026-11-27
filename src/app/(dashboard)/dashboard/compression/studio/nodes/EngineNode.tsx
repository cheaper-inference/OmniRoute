"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { FlowNode, type FlowNodeStatus } from "@omniroute/ui-kit/flow-node";
import { Progress } from "@omniroute/ui-kit/progress";
import Badge from "@/shared/components/Badge";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { categoricalSlotFor } from "@/shared/utils/categoricalPalette";

// ── Layer pill colours (10-layer model) ───────────────────────────────────
// Kit chart tokens (KEA-7886 P8; #19066), deterministic by position in LAYER_ORDER (kit series
// order, ciChartSeriesOrder[i % 8]) — six layers, six colours; the pill also prints the layer id.
const LAYER_ORDER = ["L1", "L3", "L4", "L5", "L6", "L9"] as const; // prose, tool, code, MCP, history, pruning

/**
 * In-flight engine step. Mirrors the Phase-2 orchestration mapping `running ->
 * var(--orch-status-warning)` (`orchestrationTypes.ts::STATE_VAR`).
 */
const RUNNING_COLOR = "var(--orch-status-warning)";

/** Map engine name → layer tags for the pill display */
const ENGINE_LAYER_MAP: Record<string, string[]> = {
  rtk: ["L3", "L4"],
  caveman: ["L1"],
  headroom: ["L3"],
  llmlingua: ["L9"],
  lite: ["L1"],
  sigmap: ["L1", "L3"],
  gcf: ["L4"],
  cocoindex: ["L5", "L6"],
  "caveman:full": ["L1"],
  "rtk:standard": ["L3", "L4"],
};

/**
 * Savings quality ramp — good / mediocre / none. Theme-aware `--orch-status-*` tokens
 * (light values in `:root`, dark values in `.dark` of `src/app/globals.css`); the dark
 * values are the previous hexes, so dark mode is byte-identical.
 */
function getSavingsColor(savingsPercent: number): string {
  if (savingsPercent >= 30) return "var(--orch-status-success)";
  if (savingsPercent >= 15) return "var(--orch-status-warning)";
  return "var(--orch-status-muted)";
}

/** The same ramp as the kit status tone of the node frame and of its savings line. */
function getSavingsStatus(savingsPercent: number): FlowNodeStatus | undefined {
  if (savingsPercent >= 30) return "success";
  if (savingsPercent >= 15) return "warning";
  return undefined;
}

const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

// ── Node data shape ───────────────────────────────────────────────────────

export interface EngineNodeData {
  engine: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  rulesApplied?: string[];
  durationMs?: number;
  /** visual replay state */
  stepState?: "pending" | "running" | "done" | "skipped";
  label?: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

export function EngineNode({ data }: NodeProps) {
  const t = useTranslations("compressionStudio");
  const {
    engine,
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    durationMs,
    stepState = "done",
  } = data as EngineNodeData;

  const skipped = stepState === "skipped" || originalTokens === compressedTokens;
  const running = stepState === "running";
  const color = getSavingsColor(savingsPercent as number);
  const layers = ENGINE_LAYER_MAP[engine as string] ?? [];
  const savings = savingsPercent as number;
  const tokIn = originalTokens as number;
  const tokOut = compressedTokens as number;
  const techniques = (techniquesUsed as string[]).slice(0, 2);
  const hasBody = !skipped || durationMs != null || layers.length > 0;

  return (
    <>
      <FlowNode
        size="sm"
        className="min-w-[150px] max-w-[180px]"
        icon={running ? <StatusDot color={RUNNING_COLOR} sizeClass="size-1.5" /> : undefined}
        title={<span title={engine as string}>{engine as string}</span>}
        description={
          techniques.length > 0 ? (
            <span title={(techniquesUsed as string[]).join(", ")}>{techniques.join(", ")}</span>
          ) : undefined
        }
        meta={skipped ? <Badge size="sm">{t("skipped")}</Badge> : undefined}
        status={running ? "warning" : skipped ? undefined : getSavingsStatus(savings)}
        statusLabel={
          skipped ? undefined : (
            <span data-testid="savings-percent">{`-${savings.toFixed(1)}%`}</span>
          )
        }
        active={running}
      >
        {hasBody ? (
          <div className="flex flex-col gap-1">
            {/* Token bar */}
            {!skipped && (
              <div>
                <div className="mb-0.5 flex justify-between text-text-muted">
                  <span>{tokIn.toLocaleString()}</span>
                  <span>→</span>
                  <span>{tokOut.toLocaleString()}</span>
                </div>
                <Progress
                  size="sm"
                  semantics="meter"
                  animate={false}
                  aria-label={engine as string}
                  aria-valuetext={`${tokIn.toLocaleString()} → ${tokOut.toLocaleString()}`}
                  value={tokIn > 0 ? tokOut : 1}
                  max={Math.max(tokIn, 1)}
                  color={color}
                />
              </div>
            )}
            {durationMs != null && (
              <span className="text-text-muted">{(durationMs as number).toFixed(1)}ms</span>
            )}
            {/* Layer pills */}
            {layers.length > 0 && (
              <div className="flex flex-wrap gap-0.5">
                {layers.map((layer) => {
                  const slot = categoricalSlotFor(LAYER_ORDER, layer);
                  return (
                    <Badge key={layer} size="sm" tone={slot ? `chart-${slot.token}` : undefined}>
                      {layer}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        ) : undefined}
      </FlowNode>
      <Handle type="target" position={Position.Left} className={HANDLE} />
      <Handle type="source" position={Position.Right} className={HANDLE} />
    </>
  );
}

export default EngineNode;
