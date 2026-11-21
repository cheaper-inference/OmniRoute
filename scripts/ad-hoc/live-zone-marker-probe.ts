/** Probe: live-zone identity vs Claude Code's rolling cache_control marker + resulting savings. */
import {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  applyStackedCompressionAsync,
  estimateCompressionTokens,
} from "../../open-sse/services/compression/index.ts";
import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../open-sse/services/compression/liveZone.ts";

const pipeline = [{ engine: "rtk", intensity: "minimal" }, { engine: "lite" }];
const config = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  stackedPipeline: pipeline,
  cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG, enabled: true },
  rtkConfig: { ...DEFAULT_RTK_CONFIG, enabled: true, intensity: "minimal" },
  preserveSystemPrompt: true,
} as never;
const options = {
  config,
  provider: "anthropic",
  sourceFormat: "claude",
  targetFormat: "claude",
} as never;

const bash = (n: number) =>
  `$ npm test\n${"PASS tests/unit/thing-"}${n}.test.ts\n${"  ok 1 - does the thing\n".repeat(40)}`;
const toolTurn = (n: number, marker: boolean) => [
  {
    role: "assistant",
    content: [{ type: "tool_use", id: `t${n}`, name: "Bash", input: { command: "npm test" } }],
  },
  {
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: `t${n}`,
        content: bash(n),
        ...(marker ? { cache_control: { type: "ephemeral" } } : {}),
      },
    ],
  },
];

const system = [{ type: "text", text: "You are Claude Code." }];
resetLiveZoneCache();

for (const rollMarker of [false, true]) {
  resetLiveZoneCache();
  const history: unknown[] = [{ role: "user", content: [{ type: "text", text: "start" }] }];
  console.log(`\n=== marker roll: ${rollMarker ? "CC-style (+2 msgs/turn)" : "pinned"} ===`);
  for (let turn = 1; turn <= 4; turn++) {
    history.push(...toolTurn(turn, false));
    const messages = history.map((m, index) => {
      const isMarkerSlot = rollMarker ? index === history.length - 3 : index === 1;
      if (!isMarkerSlot) return m;
      const rec = m as { content: unknown };
      const content = Array.isArray(rec.content)
        ? rec.content
        : [{ type: "text", text: rec.content }];
      const next = [...content] as Array<Record<string, unknown>>;
      next[0] = { ...next[0], cache_control: { type: "ephemeral" } };
      return { ...(m as object), content: next };
    });
    const body = { model: "claude-opus-5-5", system, messages };
    const run = (b: Record<string, unknown>) =>
      applyStackedCompressionAsync(b, pipeline as never, options);
    const result = await applyLiveZoneCompression(
      body as never,
      { principalId: "p", sessionId: "s", variant: { config }, ttlMinutes: 5 },
      (b) => run(b)
    );
    const markers = (result.body.messages as Array<Record<string, unknown>>).flatMap((m, i) =>
      Array.isArray(m.content)
        ? (m.content as Array<Record<string, unknown>>).filter((c) => c.cache_control).map(() => i)
        : []
    );
    console.log(
      ` turn ${turn}: hit=${result.stats?.liveZone?.cacheHit ?? false} in=${estimateCompressionTokens(body as never)} out=${estimateCompressionTokens(result.body as never)} markersOn=${JSON.stringify(markers)} techniques=${JSON.stringify(result.stats?.techniquesUsed ?? [])}`
    );
  }
}
