import { CompressionWorkerPool } from "../../../../../../open-sse/services/compression/compressionWorkerPool.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Synthetic package probe: a real emitted pool, no upstream traffic or real credentials. */
export async function POST() {
  const pool = new CompressionWorkerPool({ size: 1, timeoutMs: 15000, idleMs: 10 });
  try {
    const body = {
      messages: [
        { role: "system", content: "Keep this synthetic instruction unchanged." },
        {
          role: "user",
          content:
            "Please provide a detailed explanation of the synthetic changes. Thank you so much. ".repeat(
              6
            ),
        },
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
    const originalBody = structuredClone(body);
    const shrunk = await pool.run(body, "rtk");
    const neutralBody = {
      messages: [
        { role: "system", content: "Synthetic base" },
        { role: "user", content: "Hello" },
      ],
    };
    const neutralExpected = structuredClone(neutralBody);
    const neutral = await pool.run(neutralBody, "rtk");
    const steps: Array<{ engine: string; state: string }> = [];
    const stacked = await pool.run(
      body,
      "stacked",
      {
        config: { stackedPipeline: [{ engine: "rtk" }, { engine: "caveman", intensity: "full" }] },
      },
      (step) => steps.push({ engine: step.engine, state: step.state })
    );
    return Response.json({
      shrunk: shrunk.compressed,
      neutral: neutral.compressed,
      stacked: stacked.compressed,
      steps,
      neutralBody: neutral.body,
      neutralExpected,
      preservedStructure:
        stacked.body.messages[0].content === originalBody.messages[0].content &&
        JSON.stringify(stacked.body.messages[2]) === JSON.stringify(originalBody.messages[2]) &&
        stacked.body.messages[3].tool_call_id === "synthetic",
    });
  } finally {
    await pool.close();
  }
}
