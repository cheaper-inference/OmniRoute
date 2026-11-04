import type { CompressionConfig, CompressionResult } from "./types.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import type { RiskGateConfig } from "./riskGate/riskGate.ts";
import { resolveRiskGate, withRiskGate } from "./riskGate/strategyWrap.ts";
import { mustKeepOpenCodeHistoryVerbatim } from "./cachingAware.ts";
import {
  resolveQuantumLock,
  quantumCachingContext,
  withQuantumLock,
  withQuantumLockAsync,
} from "./quantumLock/index.ts";

export interface CompressionEntrypointOptions {
  provider?: string;
  model?: string;
  config?: CompressionConfig;
  riskGate?: RiskGateConfig;
  cachingContext?: CachingDetectionContext;
}

export function withCompressionEntrypointGuards<T extends CompressionEntrypointOptions>(
  body: Record<string, unknown>,
  options: T | undefined,
  run: (body: Record<string, unknown>) => CompressionResult
): CompressionResult {
  if (mustKeepOpenCodeHistoryVerbatim(body, options?.cachingContext ?? { model: options?.model })) {
    return { body, compressed: false, stats: null };
  }
  return withQuantumLock(
    body,
    resolveQuantumLock(options),
    quantumCachingContext(body, options),
    (quantumBody) =>
      withRiskGate(quantumBody, resolveRiskGate(options), (riskBody) => run(riskBody))
  );
}

export function withCompressionEntrypointGuardsAsync<T extends CompressionEntrypointOptions>(
  body: Record<string, unknown>,
  options: T | undefined,
  run: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  if (mustKeepOpenCodeHistoryVerbatim(body, options?.cachingContext ?? { model: options?.model })) {
    return Promise.resolve({ body, compressed: false, stats: null });
  }
  return withQuantumLockAsync(
    body,
    resolveQuantumLock(options),
    quantumCachingContext(body, options),
    run
  );
}
