/**
 * Opt-in Prometheus metrics (OMNIROUTE_PROMETHEUS_METRICS, default off). No dependency: the
 * text exposition format is written here. One observation per logged call (saveCallLog).
 *
 * Series carry provider, model and status class only. The series count is capped, and the
 * overflow folds into model="other", so a client that sends random model names cannot grow
 * memory without bound. Memory only: counters reset on restart, as Prometheus expects.
 */

const DURATION_BUCKETS_S = [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60, 120, 300, 600, 900];
const TTFT_BUCKETS_S = [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60];
const RETRY_BUCKETS = [0, 1, 2, 3, 5, 10];
const MAX_SERIES = 500;
const MAX_LABEL_CHARS = 64;

type Hist = { counts: number[]; sum: number; count: number };
type Series = { labels: string; duration: Hist; ttft: Hist; retries: Hist };

const series = new Map<string, Series>();

export const isPrometheusMetricsEnabled = () =>
  ["1", "true", "yes"].includes((process.env.OMNIROUTE_PROMETHEUS_METRICS ?? "").toLowerCase());

const newHist = (bounds: number[]): Hist => ({ counts: bounds.map(() => 0), sum: 0, count: 0 });
const labelValue = (v: unknown) =>
  String(v ?? "unknown")
    .slice(0, MAX_LABEL_CHARS)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
const statusClass = (s: unknown) => {
  const n = Number(s);
  return n >= 200 && n < 600 ? `${Math.floor(n / 100)}xx` : "other";
};

function seriesFor(provider: string, model: string, status: string): Series {
  const key = `provider="${provider}",model="${model}",status_class="${status}"`;
  let found = series.get(key);
  // The "other" series is exempt from the cap: it is what the overflow folds into.
  if (!found && series.size >= MAX_SERIES && model !== "other") {
    return seriesFor(provider, "other", status);
  }
  if (!found) {
    found = {
      labels: key,
      duration: newHist(DURATION_BUCKETS_S),
      ttft: newHist(TTFT_BUCKETS_S),
      retries: newHist(RETRY_BUCKETS),
    };
    series.set(key, found);
  }
  return found;
}

function observe(hist: Hist, bounds: number[], value: number) {
  const i = bounds.findIndex((b) => value <= b);
  if (i >= 0) hist.counts[i] += 1;
  hist.sum += value;
  hist.count += 1;
}

/** Never throws: metrics must not break call logging. */
export function recordRequestMetrics(entry: Record<string, unknown> | null | undefined) {
  if (!entry || !isPrometheusMetricsEnabled()) return;
  try {
    const s = seriesFor(
      labelValue(entry.provider),
      labelValue(entry.model),
      statusClass(entry.status)
    );
    const durationMs = Number(entry.duration);
    if (Number.isFinite(durationMs) && durationMs >= 0) {
      observe(s.duration, DURATION_BUCKETS_S, durationMs / 1000);
    }
    const ttftMs = Number(entry.ttftMs ?? entry.ttft);
    if (entry.ttftMs != null || entry.ttft != null) {
      if (Number.isFinite(ttftMs) && ttftMs >= 0) observe(s.ttft, TTFT_BUCKETS_S, ttftMs / 1000);
    }
    const attempts = Number((entry.upstreamHttp as { total?: unknown } | null | undefined)?.total);
    observe(s.retries, RETRY_BUCKETS, Number.isFinite(attempts) && attempts > 1 ? attempts - 1 : 0);
  } catch {
    // best effort
  }
}

function renderHistogram(name: string, help: string, bounds: number[], pick: (s: Series) => Hist) {
  const out = [`# HELP ${name} ${help}`, `# TYPE ${name} histogram`];
  for (const s of series.values()) {
    const h = pick(s);
    if (h.count === 0) continue;
    let cumulative = 0;
    bounds.forEach((bound, i) => {
      cumulative += h.counts[i];
      out.push(`${name}_bucket{${s.labels},le="${bound}"} ${cumulative}`);
    });
    out.push(`${name}_bucket{${s.labels},le="+Inf"} ${h.count}`);
    out.push(`${name}_sum{${s.labels}} ${h.sum}`);
    out.push(`${name}_count{${s.labels}} ${h.count}`);
  }
  return out;
}

/** Prometheus text format 0.0.4; empty while the flag is off. */
export function renderMetrics(): string {
  if (!isPrometheusMetricsEnabled()) return "";
  return (
    [
      ...renderHistogram(
        "omniroute_request_duration_seconds",
        "Duration of a logged call in seconds.",
        DURATION_BUCKETS_S,
        (s) => s.duration
      ),
      ...renderHistogram(
        "omniroute_ttft_seconds",
        "Time to the first forwarded stream chunk in seconds (streaming calls only).",
        TTFT_BUCKETS_S,
        (s) => s.ttft
      ),
      ...renderHistogram(
        "omniroute_request_retries",
        "Upstream attempts beyond the first, per logged call.",
        RETRY_BUCKETS,
        (s) => s.retries
      ),
    ].join("\n") + "\n"
  );
}

export function resetMetricsForTests() {
  series.clear();
}
