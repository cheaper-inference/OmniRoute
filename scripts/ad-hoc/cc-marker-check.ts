import {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  applyStackedCompressionAsync,
} from "../../open-sse/services/compression/index.ts";

const big = "line of bash output 1234567890 abcdefghij\n".repeat(200);
const body = {
  model: "claude-opus-5-5",
  system: [
    { type: "text", text: "You are Claude Code.", cache_control: { type: "ephemeral" } },
    { type: "text", text: "Long agent instructions...", cache_control: { type: "ephemeral" } },
  ],
  tools: [{ name: "Bash", description: "run", input_schema: { type: "object" } }],
  messages: [
    { role: "user", content: [{ type: "text", text: "do the thing" }] },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "t1", name: "Bash", input: { command: "ls" } }],
    },
    {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "t1",
          content: big,
          cache_control: { type: "ephemeral" },
        },
      ],
    },
  ],
};

const pipeline = [
  { engine: "session-dedup" },
  { engine: "lite" },
  { engine: "headroom" },
  { engine: "caveman", intensity: "full" },
  { engine: "rtk", intensity: "minimal" },
];
const config = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  stackedPipeline: pipeline,
  cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG, enabled: true },
  rtkConfig: { ...DEFAULT_RTK_CONFIG, enabled: true, intensity: "minimal" },
  preserveSystemPrompt: true,
} as never;

const out = await applyStackedCompressionAsync(
  body as never,
  pipeline as never,
  { config, provider: "anthropic", sourceFormat: "claude", targetFormat: "claude" } as never
);
const msgs = out.body.messages as Array<Record<string, unknown>>;
console.log("markers after compression:");
for (const [i, m] of msgs.entries()) {
  const c = m.content;
  const blocks = Array.isArray(c) ? (c as Array<Record<string, unknown>>) : [];
  console.log(
    ` msg ${i} ${m.role}: blocks=${blocks.length} cache_control=${blocks.filter((b) => b.cache_control).length}`
  );
}
console.log(
  "system:",
  JSON.stringify((out.body.system as Array<Record<string, unknown>>).map((b) => !!b.cache_control))
);
console.log("stats:", out.stats?.techniquesUsed, out.stats?.savingsPercent);
