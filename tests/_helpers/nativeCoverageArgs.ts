export function nativeCoverageArgs(): string[] {
  // Node propagates V8 coverage even when a child receives a filtered environment.
  // Restore the repository preload with an explicit argument in the shard run.
  return process.env.NODE_V8_COVERAGE && process.env.OMNIROUTE_CI_SYNC_TSX_CACHE
    ? ["--import", new URL("../../scripts/ci/native-worker-v8-layout.mjs", import.meta.url).href]
    : [];
}
