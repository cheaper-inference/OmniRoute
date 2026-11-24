import { CompressionWorkerPool } from "../../../../../../open-sse/services/compression/compressionWorkerPool.ts";

export const runtime = "nodejs";

export async function POST() {
  const pool = new CompressionWorkerPool({ size: 1, timeoutMs: 15000 });

  try {
    const result = await pool.run(
      {
        messages: [
          { role: "system", content: "Keep this instruction unchanged." },
          {
            role: "user",
            content: "Please basically actually simply carefully help with this task. ".repeat(80),
          },
        ],
      },
      "stacked",
      { config: { stackedPipeline: [{ engine: "rtk" }, { engine: "caveman" }] } }
    );
    return Response.json(result);
  } finally {
    await pool.close();
  }
}
