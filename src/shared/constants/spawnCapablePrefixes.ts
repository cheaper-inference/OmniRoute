/**
 * Compile-time deny-list: route prefixes whose handlers can spawn arbitrary local
 * subprocesses (npm install, node, MITM server, python CLIs) on behalf of the
 * caller. These MUST NEVER appear in the manage-scope bypass list — regardless of
 * DB state — because reaching them from non-loopback would re-introduce the
 * GHSA-fhh6-4qxv-rpqj surface that the LOCAL_ONLY tier exists to close.
 *
 * Enforced at two layers:
 *   1. zod schema (`settingsSchemas.ts`): rejects `PATCH /api/settings` with error
 *      code `BYPASS_PREFIX_NOT_ALLOWED` if any entry in
 *      `localOnlyManageScopeBypassPrefixes` falls inside this set.
 *   2. runtime (`isLocalOnlyBypassableByManageScope` in `routeGuard.ts`): even if a
 *      malformed DB row claims a spawn-capable path is bypassable, the policy refuses.
 *
 * 🔒 This constant lives in `@/shared/constants` — a server-free leaf module — and
 * NOT in `@/server/authz/routeGuard`, on purpose. `settingsSchemas.ts` is reachable
 * from client components (dashboard onboarding wizard → validation barrel), and
 * importing it from `routeGuard.ts` dragged routeGuard's server runtime
 * (runtimeSettings → localDb → apiKeys → rateLimiter → ioredis) into the browser
 * bundle, breaking the Next CLI/client webpack build with
 * `Module not found: Can't resolve 'dns'/'net'`. Keeping the value here lets both the
 * client-safe schema and the server routeGuard import it with no server coupling.
 * Regression guard: `tests/unit/authz/spawn-capable-prefixes-client-safe.test.ts`.
 * Hard Rules #15 + #17.
 */
export const SPAWN_CAPABLE_PREFIXES: ReadonlyArray<string> = [
  "/api/cli-tools/runtime/",
  "/api/cli-tools/qwen-settings", // GET probes the Qwen Code binary; the route also mutates local ~/.qwen files
  // GHSA-35fw-cv32-2373: 14 cli-tools routes that reach the same getCliRuntimeStatus() /
  // detectAllTools() spawn as their gated siblings — must never be whitelistable via
  // manage-scope bypass (Hard Rules #15 + #17). Exact entries; NOT a "/api/cli-tools/" blanket.
  "/api/cli-tools/all-statuses", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry
  "/api/cli-tools/claude-settings", // GET probes the `claude` binary via getCliRuntimeStatus()
  "/api/cli-tools/cline-settings", // GET probes the `cline` binary via getCliRuntimeStatus()
  "/api/cli-tools/codewhale-settings", // GET probes the `codewhale` binary via getCliRuntimeStatus()
  "/api/cli-tools/codex-settings", // GET probes the `codex` binary via getCliRuntimeStatus()
  "/api/cli-tools/crush-settings", // GET probes the `crush` binary via getCliRuntimeStatus()
  "/api/cli-tools/deepseek-tui-settings", // GET probes the `deepseek-tui` binary via getCliRuntimeStatus()
  "/api/cli-tools/detect", // GET calls detectAllTools() -> execFile(binary, --version) + execFile("which") per tool
  "/api/cli-tools/droid-settings", // GET probes the `droid` binary via getCliRuntimeStatus()
  "/api/cli-tools/kilo-settings", // GET probes the `kilo` binary via getCliRuntimeStatus()
  "/api/cli-tools/openclaw-settings", // GET probes the `openclaw` binary via getCliRuntimeStatus()
  "/api/cli-tools/pi-settings", // GET probes the `pi` binary via getCliRuntimeStatus()
  "/api/cli-tools/smelt-settings", // GET probes the `smelt` binary via getCliRuntimeStatus()
  "/api/cli-tools/status", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry
  "/api/cli-tools/whycodes-settings", // GET probes the `whycodes` binary via getCliRuntimeStatus()
  "/api/services/", // T-10: can run npm install + spawn node processes
  "/api/version-manager/", // downloads, unpacks and runs the CLIProxyAPI binary (Hard Rules #15 + #17)
  "/api/tunnels/cloudflared", // POST installs/starts/stops cloudflared; safe methods are exempt and only probe the binary for loopback/LAN callers
  "/api/tunnels/tailscale/disable", // stops Funnel and may stop tailscaled/Tailscale service
  "/api/tunnels/tailscale/enable", // starts tailscaled/login/funnel subprocesses
  "/api/tunnels/tailscale/install", // downloads/installs Tailscale and starts its daemon
  "/api/tunnels/tailscale/login", // spawns `tailscale up`
  "/api/tunnels/tailscale/start-daemon", // starts tailscaled/Tailscale service
  "/api/tools/agent-bridge/", // start/stop MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/settings/mitm", // installs a system trusted root CA + /etc/hosts DNS overrides via src/mitm/* — must never be whitelistable via manage-scope bypass (GHSA-x7vm-hp44-9p79, Hard Rules #15 + #17)
  "/api/cli-tools/antigravity-mitm", // same privileged CA-trust + DNS surface as /api/settings/mitm (GHSA-x7vm-hp44-9p79, Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // http-proxy listener + system proxy (Hard Rules #15 + #17)
  "/api/plugins/", // plugins: load/execute via worker_threads + child_process (Hard Rules #15 + #17)
  "/api/local/", // T-12: 1-click local service launchers (Redis today) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17)
  "/api/skills/collect/", // Skill Collector CLI detection: GET .../detect spawns a child process per CLI_TOOL_IDS entry — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17, PR #6294 review)
  "/api/skills/install", // POST registers a handler string that can alias the built-in execute_command / eval_code (src/lib/skills/executor.ts -> builtins.ts -> sandbox.ts childProcess.spawn) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  "/api/skills/executions", // POST runs skillExecutor.execute() -> container spawn in src/lib/skills/sandbox.ts — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  "/api/headroom/start", // spawns headroom-ai python CLI — must never be bypassable (Hard Rules #15 + #17)
  "/api/headroom/stop", // kills tracked PID — must never be bypassable (Hard Rules #15 + #17)
  "/api/vnc-session", // #7892: spawns Docker containers via child_process.spawn (src/lib/vncSession/service.ts) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17)
  "/api/modality-bridge/video/", // fixed ffmpeg/ffprobe status + extraction broker (Hard Rules #15 + #17)
  // LOCAL_ONLY routes that reach a spawn / code-exec sink but were never mirrored here, so
  // both enforcement layers treated them as whitelistable. Every LOCAL_ONLY prefix must now be
  // either listed here or reviewed as bypass-eligible — drift guard:
  // tests/unit/authz/local-only-bypass-spawn-denylist.test.ts (Hard Rules #15 + #17).
  "/api/middleware/", // middleware hooks compile + run caller-supplied JS via new vm.Script (src/lib/middleware/registry.ts)
  "/api/acp/agents", // detectInstalledAgents() -> execFileSync(probe.command, probe.args, { shell }) (src/lib/acp/registry.ts)
  "/api/system/version", // POST auto-update spawns git checkout + npm install
  "/api/db-backups/exportAll", // spawns tar for the export archive
  "/api/db/health", // runManagedDbHealthCheck() forks native diagnostics (healthCheckRunner.ts)
  "/api/oauth/cursor/auto-import", // execFile("which", ["cursor"]) before importing creds
  "/api/cli-tools/omp-settings", // spawns `which omp`
  "/api/cli-tools/letta-settings", // spawns `which letta`
  "/api/cli-tools/grok-build-settings", // GET probes the `grok` binary via getCliRuntimeStatus()
  "/api/cli-tools/forge-settings", // GET probes the `forge` binary via getCliRuntimeStatus()
  "/api/cli-tools/jcode-settings", // GET probes the `jcode` binary via getCliRuntimeStatus()
  "/dashboard/providers/services/", // reverse proxy into embedded service UIs — Hard Rule #17 pairs it with /api/services/
  "/api/discovery/", // not a spawn, but declared strict-loopback with no manage-scope bypass (outbound provider probes, SSRF-adjacent)
  "/api/issue-agent/", // local triage executor surface, held loopback/LAN "until sandbox + audit hardening is complete" — not opt-in remote until then
  // Host-credential reads: no spawn, but the handler reads credential files from the host's
  // home directory and imports them, so a manage-scoped key must never reach it remotely
  // either. Held to the same never-bypassable bar as the spawn routes above.
  "/api/oauth/kiro/auto-import", // reads kiro-cli data.sqlite3, ~/.aws/sso/cache and the Kiro profile.json
];

/**
 * Regex-matched companion to `SPAWN_CAPABLE_PREFIXES`, for spawn-capable
 * routes whose spawn-capable segment sits AFTER a dynamic path parameter
 * (e.g. `/api/providers/{id}/refresh-cursor`) — a flat prefix would either
 * miss them entirely or require over-broadening the shared `/api/providers/`
 * prefix (used for legitimate remote provider CRUD). Mirrors the
 * `LOCAL_ONLY_API_PREFIXES`/`LOCAL_ONLY_API_PATTERNS` split already
 * established in `routeGuard.ts` for this exact shape. Checked against a
 * CONCRETE resolved request path — an exact regex match, no approximation.
 */
export const SPAWN_CAPABLE_PATTERNS: ReadonlyArray<RegExp> = [
  /^\/api\/providers\/[^/]+\/login\/?$/, // pre-existing gap: in LOCAL_ONLY_API_PATTERNS today but never in a spawn-capable deny-list
  /^\/api\/providers\/volcengine-plan\/connect(\/.*)?$/, // launches Playwright to bind a Volcano Engine console session — covers the manual headful flow AND the session-based phone/SMS auto-login sub-routes (/code, /status, /cancel, /resend)
  /^\/api\/providers\/[^/]+\/refresh-cursor\/?$/, // spawns cursor-agent via renewal.ts (Hard Rules #15 + #17)
  /^\/api\/providers\/cursor\/agent-availability\/?$/, // static path (no dynamic segment), but kept in this array alongside its /api/providers/ siblings rather than the flat SPAWN_CAPABLE_PREFIXES array — spawns cursor-agent status via checkCursorAgentAvailability()/getCachedCursorAgentAvailability() (Hard Rules #15 + #17)
  /^\/api\/providers\/[^/]+\/chatgpt-web-codex-doctor\/?$/, // spawns via getTunnelRuntimeStatus() → spawnSync("...","runtimes status") (open-sse/executors/chatgpt-web-codex/tunnelClient.ts). Mirrors LOCAL_ONLY_API_PATTERNS in routeGuard.ts; keep the two in sync (GHSA-9q3h-mjm5-f4gj).
  // S-01 (#15159): web-provider validation spawns `<bin> acp --agent-type summarizer`.
  // Mirrors LOCAL_ONLY_API_PATTERNS (every LOCAL_ONLY pattern must have a twin here).
  /^\/api\/providers\/(validate|import|bulk)\/?$/,
];

/**
 * Companion to `SPAWN_CAPABLE_PATTERNS`, used ONLY by the zod-level candidate
 * bypass-prefix check (`settingsSchemas.ts`), which validates a candidate
 * BYPASS PREFIX STRING (not a concrete path) at `PATCH /api/settings` time —
 * general prefix-vs-regex reachability is undecidable, so this conservatively
 * treats the shared literal ancestor of the dynamic/static-segment patterns
 * as off-limits. Intentionally coarser than `SPAWN_CAPABLE_PATTERNS`'s exact
 * per-route match, but costs nothing security-wise: the runtime check in
 * `isLocalOnlyBypassableByManageScope` (Layer 2) is the actual enforcement
 * boundary and stays exact. `SPAWN_CAPABLE_PREFIXES` itself is untouched.
 */
export const SPAWN_CAPABLE_PATTERN_ANCESTORS: ReadonlyArray<string> = ["/api/providers/"];

/**
 * Single source of truth for "may this candidate bypass prefix ever be honoured?".
 * (Covers the few non-spawn entries above too, e.g. the Kiro host-credential import.)
 * Returns true when `prefix` overlaps a spawn-capable route in EITHER direction:
 *   - it equals or sits under a spawn-capable prefix (`/api/middleware/hooks`), or
 *   - it is a parent that would cover one (`/api/`, `/api/cli-tools/`, `/api/middleware`),
 * or it overlaps a `SPAWN_CAPABLE_PATTERN_ANCESTORS` entry the same way.
 *
 * Consumed by all three enforcement points so they cannot drift apart:
 *   1. the zod refine on `localOnlyManageScopeBypassPrefixes` (settingsSchemas.ts),
 *   2. `normalizeAuthzBypass` when the runtime snapshot is loaded (runtimeSettings.ts),
 *   3. `isLocalOnlyBypassableByManageScope` on the request hot path (routeGuard.ts).
 */
export function isSpawnCapableBypassPrefix(prefix: string): boolean {
  const overlaps = (denied: string) => prefix.startsWith(denied) || denied.startsWith(prefix);
  return SPAWN_CAPABLE_PREFIXES.some(overlaps) || SPAWN_CAPABLE_PATTERN_ANCESTORS.some(overlaps);
}
