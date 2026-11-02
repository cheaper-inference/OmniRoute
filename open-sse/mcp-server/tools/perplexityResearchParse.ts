type Citation = { name: string | null; url: string; snippet: string };

export type ResearchParse = {
  outcome: "success" | "report_unconfirmed" | "incomplete_result";
  report: string;
  citations: Citation[];
  warnings: string[];
};

const KNOWN = new Set([
  "status",
  "final_sse_message",
  "blocks",
  "artifact_entries",
  "backend_uuid",
  "text",
]);

function framesOf(input: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const block of input.split(/\n\n+/)) {
    const data = block
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .join("");
    if (!data) continue;
    out.push(JSON.parse(data));
  }
  return out;
}

function streamedAnswer(frames: Record<string, unknown>[]): string {
  const parts: string[] = [];
  for (const frame of frames) {
    for (const block of (frame.blocks as Array<Record<string, unknown>>) ?? []) {
      if (block.intended_usage !== "ask_text") continue;
      const chunks = (block.markdown_block as { chunks?: string[] } | undefined)?.chunks ?? [];
      parts.push(...chunks);
    }
  }
  return parts.join("");
}

function finalReport(
  frames: Record<string, unknown>[]
): { content: string; citations: Citation[] } | null {
  for (const frame of frames) {
    for (const entry of (frame.artifact_entries as Array<Record<string, unknown>>) ?? []) {
      for (const asset of (entry.assets as Array<Record<string, unknown>>) ?? []) {
        const report = asset.research_report as
          { final?: boolean; source_content?: string; citations?: Citation[] } | undefined;
        if (asset.asset_type === "RESEARCH_REPORT" && report?.final === true) {
          return { content: report.source_content ?? "", citations: report.citations ?? [] };
        }
      }
    }
  }
  return null;
}

export function parseResearchFrames(input: string): ResearchParse {
  const frames = framesOf(input);
  const warnings: string[] = [];
  for (const frame of frames) {
    for (const key of Object.keys(frame)) {
      if (!KNOWN.has(key)) warnings.push(`unknown event: ${key}`);
    }
  }

  const ended = frames.some(
    (frame) => frame.final_sse_message === true || frame.status === "COMPLETED"
  );
  if (!ended) return { outcome: "incomplete_result", report: "", citations: [], warnings };

  const report = finalReport(frames);
  const streamed = streamedAnswer(frames);
  if (!report) {
    return {
      outcome: "report_unconfirmed",
      report: streamed,
      citations: [],
      warnings: [...warnings, "report_unconfirmed"],
    };
  }
  if (streamed && streamed !== report.content) {
    return {
      outcome: "report_unconfirmed",
      report: report.content,
      citations: report.citations,
      warnings: [...warnings, "report_unconfirmed"],
    };
  }
  return { outcome: "success", report: report.content, citations: report.citations, warnings };
}
