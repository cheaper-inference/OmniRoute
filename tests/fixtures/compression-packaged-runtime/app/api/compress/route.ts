import { CompressionWorkerPool } from "../../../../../../open-sse/services/compression/compressionWorkerPool.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Synthetic package probe: a real emitted pool, no upstream traffic or real credentials. */
export async function POST() {
  const pool = new CompressionWorkerPool({ size: 1, timeoutMs: 15000, idleMs: 10 });
  try {
    const body = {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "synthetic", type: "function", function: { name: "shell", arguments: "{}" } },
          ],
        },
        {
          role: "tool",
          tool_call_id: "synthetic",
          content: "\u001b[32mready\u001b[0m\n".repeat(300),
        },
        { role: "user", content: "What changed?" },
      ],
    };
    const shrunk = await pool.run(body, "rtk");
    const neutral = await pool.run({ messages: [{ role: "user", content: "Hello" }] }, "rtk");
    const stacked = await pool.run(body, "stacked", {
      config: { stackedPipeline: [{ engine: "rtk" }, { engine: "caveman", intensity: "full" }] },
    });
    return Response.json({
      shrunk: shrunk.compressed,
      neutral: neutral.compressed,
      stacked: stacked.compressed,
    });
  } finally {
    await pool.close();
  }
}
