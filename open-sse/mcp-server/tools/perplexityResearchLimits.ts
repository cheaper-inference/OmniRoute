import type { ResearchParse } from "./perplexityResearchParse.ts";

type Citation = ResearchParse["citations"][number];

export const LIMITS = {
  reportChars: 256 * 1024,
  urlChars: 2048,
  titleChars: 512,
  citations: 100,
  snippetChars: 2048,
  responseChars: 512 * 1024,
};

export type ClampedResearch = ResearchParse & { truncated: boolean };

function cutReport(report: string): { text: string; cut: boolean } {
  if (report.length <= LIMITS.reportChars) return { text: report, cut: false };
  const head = report.slice(0, LIMITS.reportChars);
  const boundary = head.lastIndexOf("\n\n");
  return { text: boundary > 0 ? head.slice(0, boundary) : head, cut: true };
}

function clampCitation(citation: Citation): Citation {
  return {
    name: citation.name === null ? null : citation.name.slice(0, LIMITS.titleChars),
    url: citation.url.slice(0, LIMITS.urlChars),
    snippet: citation.snippet.slice(0, LIMITS.snippetChars),
  };
}

export function clampResearchResult(input: ResearchParse): ClampedResearch {
  const report = cutReport(input.report);
  let citations = input.citations.slice(0, LIMITS.citations).map(clampCitation);
  let truncated = report.cut || input.citations.length > LIMITS.citations;
  let result: ClampedResearch = { ...input, report: report.text, citations, truncated };

  while (
    Buffer.byteLength(JSON.stringify(result), "utf8") > LIMITS.responseChars &&
    citations.length > 0
  ) {
    citations = citations.slice(0, -1);
    truncated = true;
    result = { ...result, citations, truncated };
  }
  if (Buffer.byteLength(JSON.stringify(result), "utf8") > LIMITS.responseChars) {
    const smaller = cutReport(report.text.slice(0, Math.floor(report.text.length / 2)));
    result = { ...result, report: smaller.text, truncated: true };
  }
  return result;
}
