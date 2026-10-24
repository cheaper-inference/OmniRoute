# Frontend, Bundle & Startup Memory Performance Audit

**Audit Date:** 2026-10-25  
**Scope:** `src/app/(dashboard)/**`, `next.config.mjs`, `package.json`, `bin/`, `src/server/**`, `src/instrumentation-node.ts`  
**Focus:** Bundle size, dynamic imports, 'use client' boundaries, polling loops, image layout shifts, server startup memory and CLI latency.  
**Baseline Idle Memory Measured:** 60.6 MB base Node process; +10.2 MB (70.8 MB) on SQLite core + migrations; +191.0 MB (261.8 MB RSS) on `open-sse/index.ts` evaluation (4,874 ms). CLI cold import overhead: 598 ms, +51.8 MB RSS before command dispatch.

---

## Ranked Findings Summary Table

| ID | File:Line | Problem | Evidence | Minimal Fix | Effort | Impact | Risk |
|---|---|---|---|---|---|---|---|
| **FE-01** | `bin/cli/commands/registry.mjs:1-180` | CLI static eager import of 53 command modules on every run | 598.3 ms import time (+51.8 MB RSS); `models.mjs` (85.7ms), `memory.mjs` (57.5ms), `runtime.mjs` (55.8ms) | Wrap command action handlers in dynamic `import()` | M | HIGH (-0.6s to -2.0s CLI cold boot, -50MB RAM) | LOW |
| **FE-02** | `src/app/(dashboard)/dashboard/combos/page.tsx:1-5054` | 5,054-line monolithic `'use client'` component bundling all modals and strategy help | 5,054 lines in single client chunk; largest file in dashboard bundle | Extract wizard modals & guidance fallbacks into `dynamic(() => import(...), { ssr: false })` | M | HIGH (~250 KB initial chunk reduction) | LOW |
| **FE-03** | `src/app/(dashboard)/**/page.tsx:1` | Systemic root `'use client'` on 74 of 124 page routes bypassing React Server Components | 74 pages (59.7% of routes) push full render tree to client; top 5 pages alone = 10,329 lines | Convert `page.tsx` into RSC wrappers importing leaf `*Client.tsx` components | L | HIGH (enables RSC streaming, cuts client JS) | MED |
| **FE-04** | `src/app/(dashboard)/dashboard/conversations/page.tsx:352,640` | Background polling intervals continue firing when browser tab is hidden | 62 un-gated `setInterval` calls in 45 files; 5–15s loops ping SQLite constantly | Guard poll callbacks with `if (typeof document !== "undefined" && document.visibilityState === "hidden") return;` | S | HIGH (eliminates thousands of idle background queries/sec) | LOW |
| **FE-05** | `package.json:384,397-398` | Heavy unused packages in production `dependencies` (`mermaid`, `playwright`) | `mermaid` (^11.17.2, 2.5MB) has 0 imports in `src/`, `open-sse/`, `bin/`; `playwright` (full browsers) duplicated with `playwright-core` | Move `mermaid` to `devDependencies`; remove `playwright` dependency | S | HIGH (-200MB+ install size, prevents bundle pollution) | LOW |
| **FE-06** | `src/app/(dashboard)/dashboard/providers/services/hooks/useServiceLogs.ts:54-92` | Unbounded SSE log stream buffers up to 1,000 lines in React state without visibility gating | Line 55 `new EventSource(url)` streams continuously in hidden background tabs | Close `EventSource` on `document.visibilityState === "hidden"`, reconnect on `"visible"` | S | MED (prevents client memory creep & unneeded backend streaming) | LOW |
| **FE-07** | `src/app/(dashboard)/dashboard/tools/traffic-inspector/hooks/useSessionRecorder.ts:124-156` | WebSocket live traffic recorder continues buffering and HTTP-posting in background | WebSocket `onmessage` batches 10 snapshots per HTTP POST indefinitely | Pause or throttle recording pipeline when tab is hidden | S | MED (saves client CPU and network bandwidth) | LOW |
| **FE-08** | `next.config.mjs:235-244` | Package import optimizer contains invalid package typo and misses heavy dashboard barrels | Line 236 has typo `"lobehub/icons"`; misses `@xyflow/react`, `recharts`, `@dnd-kit/core` | Fix typo to `"@lobehub/icons"`, append `@xyflow/react`, `recharts`, `@dnd-kit/core` | S | MED (enables tree-shaking for heavy charting and canvas libraries) | LOW |
| **FE-09** | `src/instrumentation-node.ts:275-305,617-648` | Eager boot registration of 10 quota fetchers & 14 background daemons blocks server readiness | Eagerly imports 10 fetchers and starts batch writers before `markServerReady()` | Defer quota fetchers to on-demand registration; move non-critical schedulers after readiness | M | MED (cuts boot time and initial heap spike) | LOW |
| **FE-10** | `src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx:551` & `providers/[id]/components/VolcengineConnectModal.tsx:478-482` | Images without explicit dimensions or aspect-ratio wrappers causing Cumulative Layout Shift | `AppearanceTab.tsx:551` has `h-12 w-auto` without width; `VolcengineConnectModal.tsx:478` has `max-h-40` without width/height | Add explicit `width={...}` or wrap in CSS `aspect-square` container | S | LOW-MED (eliminates layout shift on custom logo and captcha previews) | LOW |

---

## Detailed Finding Analysis

### FE-01: CLI Static Eager Imports in `registry.mjs`
- **Location:** `bin/cli/commands/registry.mjs:1-180`
- **Problem:** `registry.mjs` imports every subcommand file at module evaluation time. Even executing `omniroute --help` or lightweight subcommands forces Node to evaluate 53 command files, database modules, Zod validation schemas, and runtime utilities.
- **Evidence:**
  - Micro-benchmark timing: `registry.mjs` import requires **598.3 ms** of CPU time.
  - Memory increase: **+51.8 MB RSS** before Commander parses arguments.
  - Worst offending command imports:
    - `./models.mjs`: 85.7 ms
    - `./memory.mjs`: 57.5 ms
    - `./runtime.mjs`: 55.8 ms
    - `./login.mjs`: 28.0 ms
    - `./serve.mjs`: 22.3 ms
- **Minimal Fix:** Change action handlers to dynamic imports:
  ```javascript
  command
    .command("models")
    .description(t("models.description"))
    .action(async (...args) => {
      const { runModels } = await import("./models.mjs");
      await runModels(...args);
    });
  ```
- **Effort:** M | **Impact:** HIGH | **Risk:** LOW

---

### FE-02: 5,054-Line Monolithic Client Component in Combos Page
- **Location:** `src/app/(dashboard)/dashboard/combos/page.tsx:1-5054`
- **Problem:** The entire Combos dashboard view is contained in a single 5,054-line client-side file. It bundles extensive static strategy guidance strings (`STRATEGY_GUIDANCE_FALLBACK`, `ADVANCED_FIELD_HELP_FALLBACK`), multiple full modal dialogues (Create Combo, Import/Export, Strategy Presets, Weight Tuning), and heavy table layouts into one initial chunk.
- **Evidence:**
  - `wc -l src/app/(dashboard)/dashboard/combos/page.tsx` = 5,054 lines.
  - Largest client file in `src/app/(dashboard)`.
- **Minimal Fix:**
  1. Extract modals (`CreateComboModal`, `StrategyHelpModal`, `BatchConfigModal`) into separate files under `src/app/(dashboard)/dashboard/combos/components/`.
  2. Dynamically import them with Next.js `dynamic()`:
  ```typescript
  const CreateComboModal = dynamic(
    () => import("./components/CreateComboModal"),
    { ssr: false }
  );
  ```
- **Effort:** M | **Impact:** HIGH | **Risk:** LOW

---

### FE-03: Systemic Root `'use client'` Bypassing React Server Components
- **Location:** `src/app/(dashboard)/**/page.tsx`
- **Problem:** 74 out of 124 page routes (59.7%) declare `'use client'` on line 1, treating Next.js App Router as a purely client-side SPA. This eliminates React Server Component benefits (streaming HTML, zero client JS for static shell, server-side data fetching without waterfalls).
- **Evidence:**
  - Top 5 client pages alone total **10,329 lines**:
    - `combos/page.tsx`: 5,054 lines
    - `providers/page.tsx`: 2,009 lines
    - `health/page.tsx`: 1,199 lines
    - `conversations/page.tsx`: 1,036 lines
    - `models/page.tsx`: 1,031 lines
- **Minimal Fix:** Follow the pattern already demonstrated in `src/app/(dashboard)/dashboard/HomePageClient.tsx`:
  - `src/app/(dashboard)/dashboard/combos/page.tsx` becomes a Server Component:
    ```typescript
    import CombosPageClient from "./CombosPageClient";
    export default function CombosPage() {
      return <CombosPageClient />;
    }
    ```
  - This allows moving server-fetchable metadata and static headers outside client hydration.
- **Effort:** L | **Impact:** HIGH | **Risk:** MED

---

### FE-04: Unbounded Background Polling Loops Without Visibility Gating
- **Location:** `src/app/(dashboard)/dashboard/conversations/page.tsx:352,640` and `src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx:595`
- **Problem:** Timers created via `setInterval` poll API endpoints continuously without checking whether the user has switched tabs or minimized the browser window.
- **Evidence:**
  - 62 distinct `setInterval` instances across 45 files in `src/app/(dashboard)`.
  - In `conversations/page.tsx`, two separate loops poll active conversation summaries and individual message turns every 5–15 seconds indefinitely.
- **Minimal Fix:** Add visibility guard at top of timer callbacks:
  ```typescript
  setInterval(() => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return;
    }
    pollData();
  }, pollIntervalMs);
  ```
- **Effort:** S | **Impact:** HIGH | **Risk:** LOW

---

### FE-05: Heavy Unused Production Dependencies in `package.json`
- **Location:** `package.json:384,397-398`
- **Problem:** `mermaid` (`^11.17.2`, ~2.5 MB minified bundle) is declared under `dependencies`, but a repository grep for `mermaid` in runtime source code (`src/`, `open-sse/`, `bin/`) yields 0 imports. It is only invoked via build scripts. Additionally, full `playwright` (`1.62.1`) is declared alongside `playwright-core` (`1.62.1`).
- **Evidence:**
  - `git grep "from ['\"]mermaid"` returns 0 results in runtime code.
  - `playwright-core` is the only package imported (by `open-sse/utils/optionalPlaywrightCore.ts`).
- **Minimal Fix:**
  - Move `"mermaid"` to `devDependencies`.
  - Remove `"playwright"` from `dependencies` (rely on `"playwright-core"` for optional browser automations).
- **Effort:** S | **Impact:** HIGH | **Risk:** LOW

---

### FE-06: Unbounded SSE Stream in Service Logs (`useServiceLogs`)
- **Location:** `src/app/(dashboard)/dashboard/providers/services/hooks/useServiceLogs.ts:54-92`
- **Problem:** Hook establishes an `EventSource` connection to `/api/services/${name}/logs` that remains open indefinitely. Log messages continually append to state up to 1,000 items even when the tab is hidden.
- **Evidence:**
  - Line 55: `const es = new EventSource(url);`
  - Line 76: `setLines((prev) => [...prev, line]);`
  - No visibility listener or unmount throttle.
- **Minimal Fix:**
  ```typescript
  useEffect(() => {
    let es: EventSource | null = null;
    const connect = () => {
      if (document.visibilityState === "hidden") return;
      es = new EventSource(url);
      // handlers...
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        es?.close();
        es = null;
      } else if (!es) {
        connect();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    connect();
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      es?.close();
    };
  }, [url]);
  ```
- **Effort:** S | **Impact:** MED | **Risk:** LOW

---

### FE-07: WebSocket Traffic Inspector Recording in Hidden Tabs
- **Location:** `src/app/(dashboard)/dashboard/tools/traffic-inspector/hooks/useSessionRecorder.ts:124-156`
- **Problem:** Live proxy packet inspection maintains an open WebSocket and buffers network frames into memory. Every 10 frames, it triggers an HTTP POST flush via `flushSnapshots()`, persisting traffic to the server database even when running completely unattended in a backgrounded tab.
- **Evidence:**
  - Lines 134-151 receive and batch message frames.
  - Continues flushing to SQLite while hidden.
- **Minimal Fix:** Check `document.visibilityState` to pause frame capture or increase batch flush intervals when hidden.
- **Effort:** S | **Impact:** MED | **Risk:** LOW

---

### FE-08: Typo and Missing Barrel Packages in `optimizePackageImports`
- **Location:** `next.config.mjs:235-244`
- **Problem:** `nextConfig.experimental.optimizePackageImports` includes an invalid package name `"lobehub/icons"` (missing `@` prefix). Furthermore, it omits several heavy component and visualizer libraries that export large barrel indexes.
- **Evidence:**
  - `next.config.mjs:236`: `"lobehub/icons"` typo.
  - `@xyflow/react` is used across 5 flow studio views.
  - `recharts` is imported across analytics, costs, quota-share, and stats pages.
  - `@dnd-kit/core` is used in drag-and-drop ordering interfaces.
- **Minimal Fix:**
  ```javascript
  optimizePackageImports: [
    "@lobehub/icons",
    "@xyflow/react",
    "recharts",
    "@dnd-kit/core",
    "@omniroute/ui-kit",
    "lucide-react",
    "date-fns",
  ],
  ```
- **Effort:** S | **Impact:** MED | **Risk:** LOW

---

### FE-09: Eager Boot Registrations in `instrumentation-node.ts`
- **Location:** `src/instrumentation-node.ts:275-305,617-648`
- **Problem:** Synchronous server initialization eager-loads 10 quota fetchers (`registerQuotaTrackersBatch`, `codexQuotaFetcher`, `bailianQuotaFetcher`, etc.) and starts 14 subsystems (`initApiBridgeServer`, `initCloudSync`, `startSpendBatchWriter`, `startCleanupScheduler`) in a blocking `Promise.all` chain before `markServerReady()` is invoked.
- **Evidence:**
  - Measured `open-sse/index.ts` evaluation: **4,874 ms** and **+191 MB RSS**.
  - All quota fetchers evaluate upfront regardless of whether the user has configured those providers.
- **Minimal Fix:**
  1. Defer quota fetcher imports until first quota refresh cycle for each active provider connection.
  2. Move non-critical housekeeping schedulers (spend batch writer, vacuum scheduler) to execute asynchronously after `markServerReady()`.
- **Effort:** M | **Impact:** MED | **Risk:** LOW

---

### FE-10: Unsized Custom Logo & Captcha Images (CLS)
- **Location:** `src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx:551` and `src/app/(dashboard)/dashboard/providers/[id]/components/VolcengineConnectModal.tsx:478-482`
- **Problem:** `AppearanceTab.tsx:551` sets `height={48}` and `className="h-12 w-auto"` without an explicit `width` or aspect-ratio reservation, causing Cumulative Layout Shift (CLS) when an operator configures an external image URL. Similarly, `VolcengineConnectModal.tsx:478` loads captcha images with `className="max-h-40"` and no dimensions, shifting modal inputs upon image arrival.
- **Evidence:** Verified `<img src={...}>` markup lacks width/height attributes or container aspect ratios.
- **Minimal Fix:**
  - `AppearanceTab.tsx:551`: Wrap preview in `<div className="h-12 min-w-12 aspect-auto flex items-center">` or assign explicit dimensions.
  - `VolcengineConnectModal.tsx:481`: Add `width={150} height={40}` and `aspect-[15/4]` to reserve bounding box.
- **Effort:** S | **Impact:** LOW-MED | **Risk:** LOW
