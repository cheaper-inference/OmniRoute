/**
 * Behavioral check: the gated logger in model.ts must
 *  (a) suppress debug output at default level (the perf win),
 *  (b) still emit warn output at default level (security/visibility preserved),
 *  (c) restore debug output when APP_LOG_LEVEL=debug.
 *
 * Usage: APP_LOG_LEVEL=<level> node --import tsx/esm scripts/perf/log-visibility-check.ts
 */
const level = process.env.APP_LOG_LEVEL ?? "(unset→info)";
const mod = await import("../../open-sse/services/model.ts");

// Fire one debug-producing path and one warn-producing path.
mod.parseModel("deepseek/deepseek-chat"); // exact-id → log.debug
mod.parseModel("../etc/passwd"); // malformed → log.warn (security)

// Emit a marker so the harness can attribute output to this run.
process.stderr.write(`VISIBILITY level=${level}\n`);
