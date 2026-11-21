/**
 * Diagnostic: does the compression stack rewrite already-sent history between turns?
 *
 * Reconstructs a Claude Code (Anthropic Messages) request body from a .jsonl session
 * transcript, replays it turn by turn through the operator compression stack
 * (session-dedup + lite + headroom + caveman + rtk minimal + output styles), and reports the
 * first message index whose bytes differ between consecutive turns. A difference at an index
 * inside the previous turn's array is a prompt-cache prefix invalidation upstream.
 *
 * Usage: node --import tsx scripts/ad-hoc/compression-prefix-churn.ts <session.jsonl>
 *          [--turns=N] [--live-zone] [--keep=session-dedup,lite,headroom,caveman,rtk]
 */
import fs from "node:fs";
import {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
  applyStackedCompressionAsync,
  estimateCompressionTokens,
} from "../../open-sse/services/compression/index.ts";
import {
  applyOutputStyles,
  resolveOutputStyleLanguage,
} from "../../open-sse/services/compression/outputStyles/apply.ts";
import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../open-sse/services/compression/liveZone.ts";

type AnyRecord = Record<string, unknown>;

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const turnsArg = args.find((a) => a.startsWith("--turns="));
const keepArg = args.find((a) => a.startsWith("--keep="));
const useLiveZone = args.includes("--live-zone");
const noStyles = args.includes("--no-styles");
const plainLanguage = args.includes("--language=fixed");
const frozenMarker = args.includes("--frozen-marker");
const budgetArg = args.find((a) => a.startsWith("--budget="));
const targetTokens = budgetArg ? Number(budgetArg.split("=")[1]) : undefined;
const dumpArg = args.find((a) => a.startsWith("--dump="));
const turnCount = turnsArg ? Number(turnsArg.split("=")[1]) : 8;

if (!file) {
  console.error("usage: compression-prefix-churn.ts <session.jsonl> [--turns=N] [--live-zone]");
  process.exit(2);
}

function readJsonl(p: string): AnyRecord[] {
  return fs
    .readFileSync(p, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as AnyRecord);
}

const lines = readJsonl(file);
const shape = lines.find((l) => l.type === "api-request-shape") as AnyRecord | undefined;
if (!shape) throw new Error("no api-request-shape record in transcript");
const shapeBody = shape.shape as AnyRecord;
const system = shapeBody.system as unknown[];
const tools = (shapeBody.tools ?? []) as unknown[];

const messages: AnyRecord[] = [];
for (const line of lines) {
  if (line.type !== "user" && line.type !== "assistant") continue;
  if (line.isSidechain === true) continue;
  const msg = line.message as AnyRecord | undefined;
  if (!msg || typeof msg !== "object" || !msg.role) continue;
  messages.push({ role: msg.role, content: msg.content });
}
console.log(
  `reconstructed ${messages.length} messages (system blocks ${system.length}, tools ${tools.length})`
);

/** Place cache_control the way Claude Code does: system[0], system[1], plus a rolling marker. */
function buildBody(upTo: number): AnyRecord {
  const history = messages.slice(0, upTo).map((m) => ({ ...m }));
  const markerIdx = frozenMarker ? 0 : history.length - 2;
  const withMarkers = history.map((msg, index) =>
    index === markerIdx && !frozenMarker ? { ...msg, content: addMarker(msg.content) } : msg
  );
  const markedSystem = system.map((block, index) =>
    index < 2 && block && typeof block === "object"
      ? { ...(block as AnyRecord), cache_control: { type: "ephemeral" } }
      : block
  );
  return {
    model: "claude-opus-5-5",
    max_tokens: 32000,
    system: markedSystem,
    tools,
    messages: withMarkers,
  };
}
function addMarker(content: unknown): unknown {
  if (typeof content === "string") {
    return [{ type: "text", text: content, cache_control: { type: "ephemeral" } }];
  }
  if (Array.isArray(content) && content.length > 0) {
    const next = [...content];
    next[0] = { ...(next[0] as AnyRecord), cache_control: { type: "ephemeral" } };
    return next;
  }
  return content;
}

const enabledEngines = (keepArg?.split("=")[1] ?? "session-dedup,lite,headroom,caveman,rtk").split(
  ","
);
const engineOrder = [
  "session-dedup",
  "lite",
  "headroom",
  "caveman",
  "rtk",
  "ccr",
  "aggressive",
  "ultra",
];
const pipeline = engineOrder
  .filter((id) => enabledEngines.includes(id))
  .map((id) => (id === "rtk" ? { engine: id, intensity: "minimal" } : { engine: id }));

const config = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  defaultMode: "stacked",
  enginesExplicit: true,
  preserveSystemPrompt: true,
  preserveSystemPromptMode: "always",
  ...(targetTokens ? { targetTokens } : {}),
  stackedPipeline: pipeline,
  engines: Object.fromEntries(
    engineOrder.map((id) => [
      id,
      id === "rtk"
        ? { enabled: enabledEngines.includes(id), level: "minimal" }
        : { enabled: enabledEngines.includes(id) },
    ])
  ),
  cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG, enabled: true, intensity: "full" },
  rtkConfig: { ...DEFAULT_RTK_CONFIG, enabled: true, intensity: "minimal" },
  cavemanOutputMode: { enabled: true, intensity: "full", autoClarity: false },
  outputStyles: noStyles ? [] : [{ id: "terse-prose", level: "full" }],
  languageConfig: {
    ...DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
    enabled: true,
    autoDetect: !plainLanguage,
  },
} as unknown as typeof DEFAULT_COMPRESSION_CONFIG;

const options = {
  model: "claude-opus-5-5",
  provider: "anthropic",
  sourceFormat: "claude" as const,
  targetFormat: "claude" as const,
  compressionStage: "pre-translation" as const,
  supportsVision: true,
  config,
};

if (dumpArg) {
  // `--dump=<messages>:<path>` writes the reconstructed request body for live probing.
  const [countPart, outPath] = dumpArg.slice("--dump=".length).split(":");
  fs.writeFileSync(outPath, JSON.stringify(buildBody(Number(countPart))));
  console.log(`dumped ${countPart}-message body to ${outPath}`);
  process.exit(0);
}

const boundaries: number[] = [];
for (let i = 0; i < messages.length; i++) {
  // Real Claude Code requests end with a user turn (the fresh tool results), which is exactly
  // what the engines treat as the protected "current turn". Anchor snapshots the same way.
  if (messages[i].role === "user") boundaries.push(i + 1);
}
const step = Math.max(1, Math.floor(boundaries.length / turnCount));
const selected = boundaries.filter((_, i) => i % step === 0).slice(0, turnCount);

interface Snapshot {
  messagesIn: number;
  compressed: AnyRecord;
  tokensIn: number;
  tokensOut: number;
  language: string;
  cacheHit: boolean | null;
}

resetLiveZoneCache();
const snapshots: Snapshot[] = [];
let invalidatedTotal = 0;
for (const upTo of selected) {
  let body = buildBody(upTo);
  const language = resolveOutputStyleLanguage(config.languageConfig as never, body as never);
  if (!noStyles) {
    body = applyOutputStyles(body as never, config.outputStyles as never, language, {
      autoClarity: false,
    }).body as unknown as AnyRecord;
  }
  const input = body;
  const run = (b: AnyRecord) =>
    applyStackedCompressionAsync(b, pipeline as never, options as never);
  const result = useLiveZone
    ? await applyLiveZoneCompression(
        input,
        {
          principalId: "diag",
          sessionId: "diag-session",
          variant: { mode: "stacked", config },
          ttlMinutes: 5,
          preserveRawPrefixOnMiss: false,
        },
        (b) => run(b)
      )
    : await run(input);
  snapshots.push({
    messagesIn: upTo,
    compressed: result.body as AnyRecord,
    tokensIn: estimateCompressionTokens(input),
    tokensOut: estimateCompressionTokens(result.body),
    language,
    cacheHit: (result.stats?.liveZone as { cacheHit?: boolean } | undefined)?.cacheHit ?? null,
  });
}

/** Drop cache_control markers: Anthropic's cache match is content-based, they only move. */
function stripMarkers(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripMarkers);
  if (value && typeof value === "object") {
    const out: AnyRecord = {};
    for (const [key, inner] of Object.entries(value as AnyRecord)) {
      if (key === "cache_control") continue;
      out[key] = stripMarkers(inner);
    }
    return out;
  }
  return value;
}

function stable(value: unknown): string {
  return JSON.stringify(stripMarkers(value));
}

function firstDiff(prev: AnyRecord, next: AnyRecord): { index: number; prevLen: number } {
  const a = prev.messages as unknown[];
  const b = next.messages as unknown[];
  const shared = Math.min(a.length, b.length);
  for (let i = 0; i < shared; i++) {
    if (stable(a[i]) !== stable(b[i])) return { index: i, prevLen: a.length };
  }
  return { index: shared, prevLen: a.length };
}

const regionTokens = (body: AnyRecord, from: number, to: number) =>
  estimateCompressionTokens({ messages: (body.messages as unknown[]).slice(from, to) } as never);

console.log("");
console.log(
  "engines: " +
    (pipeline.map((s) => s.engine + ("intensity" in s ? `:${s.intensity}` : "")).join(" + ") ||
      "none")
);
console.log(
  "styles:  " + (noStyles ? "off" : "terse-prose:full") + ` | lang autoDetect=${!plainLanguage}`
);
console.log("liveZone: " + (useLiveZone ? "on" : "off"));
console.log("");
console.log("turn | msgs | in_tok | out_tok | lang | history prefix rewritten from message #?");
for (let i = 0; i < snapshots.length; i++) {
  const s = snapshots[i];
  let note = "";
  if (i > 0) {
    const prevSnap = snapshots[i - 1];
    const d = firstDiff(prevSnap.compressed, s.compressed);
    const systemChanged = stable(prevSnap.compressed.system) !== stable(s.compressed.system);
    const invalidated = systemChanged
      ? regionTokens(prevSnap.compressed, 0, d.prevLen)
      : d.index < d.prevLen
        ? regionTokens(prevSnap.compressed, d.index, d.prevLen)
        : 0;
    invalidatedTotal += invalidated;
    if (systemChanged) {
      note = `SYSTEM PROMPT CHANGED -> all ${d.prevLen} messages re-written (${invalidated}tok)`;
    } else if (d.index < d.prevLen) {
      note = `rewritten from msg #${d.index}/${d.prevLen} (${invalidated}tok invalidated)`;
    } else {
      note = `stable (${d.prevLen} messages byte-identical)`;
    }
  }
  console.log(
    `${String(i + 1).padStart(4)} | ${String(s.messagesIn).padStart(4)} | ${String(s.tokensIn).padStart(6)} | ${String(s.tokensOut).padStart(7)} | ${s.language.padStart(4)} | ${note}${s.cacheHit === null ? "" : s.cacheHit ? " [live-zone HIT]" : " [live-zone MISS]"}`
  );
}

const netGrowth =
  snapshots.length > 0 ? snapshots[snapshots.length - 1].tokensOut - snapshots[0].tokensOut : 0;
const amplification = netGrowth > 0 ? (invalidatedTotal / netGrowth).toFixed(1) : "n/a";
console.log("");
console.log(
  `invalidated history tokens across ${snapshots.length - 1} turns: ${invalidatedTotal}` +
    ` | net prompt growth: ${netGrowth} | cache-write amplification: ${amplification}x`
);
