// Display formatting for the benchmark metric shown next to each ranked model.
// Lives outside page.tsx: an App Router page module may only export the page and route config.

export function formatBenchmarkMetric(
  m?: {
    metric?: string | null;
    eloRaw?: number | null;
    category?: string;
  } | null
): string | null {
  if (!m) return null;
  const metric = m.metric?.toLowerCase() ?? "";
  const raw = m.eloRaw;

  if (metric.startsWith("artificial-analysis")) {
    const sub = metric.includes("coding")
      ? "Code Index"
      : metric.includes("agentic")
        ? "Agentic Index"
        : "AA Index";
    return raw !== null && raw !== undefined ? `${sub} ${raw}` : "Artificial Analysis";
  }

  if (metric.startsWith("design-arena")) {
    return raw !== null && raw !== undefined ? `ELO ${raw} (Design Arena)` : "Design Arena";
  }

  if (metric.startsWith("openrouter")) {
    const benchName = metric.includes(":") ? metric.split(":")[1] : "Task";
    if (raw !== null && raw !== undefined) {
      return `Acc ${raw}% (${benchName})`;
    }
    return `OpenRouter (${benchName})`;
  }

  if (metric.startsWith("huggingface")) {
    return raw !== null && raw !== undefined ? `ELO ${raw} (Arena AI · HF)` : "Arena AI · HF";
  }

  if (metric.startsWith("arena") || metric.startsWith("wulong")) {
    return raw !== null && raw !== undefined ? `ELO ${raw} (Arena AI)` : "Arena AI";
  }

  if (raw !== null && raw !== undefined) {
    return m.category === "coding" ? `Code ${raw}` : `ELO ${raw}`;
  }

  return metric || null;
}
