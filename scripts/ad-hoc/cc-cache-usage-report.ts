/**
 * Diagnostic: per-request Anthropic prompt-cache usage from a Claude Code transcript.
 * Flags a request as a MISS when it re-wrote a large cache segment (>1024 tok) while
 * reading less than 90% of the previous request's total prompt from cache.
 */
import fs from "node:fs";

const file = process.argv[2];
if (!file) throw new Error("usage: cc-cache-usage-report.ts <session.jsonl>");
const seen = new Map<string, { input: number; create: number; read: number; out: number }>();
for (const line of fs.readFileSync(file, "utf8").split("\n")) {
  if (!line.trim()) continue;
  const record = JSON.parse(line) as Record<string, any>;
  if (record.type !== "assistant") continue;
  const usage = record.message?.usage;
  const id = record.message?.id;
  if (!usage || !id || seen.has(id)) continue;
  seen.set(id, {
    input: usage.input_tokens ?? 0,
    create: usage.cache_creation_input_tokens ?? 0,
    read: usage.cache_read_input_tokens ?? 0,
    out: usage.output_tokens ?? 0,
  });
}
const rows = [...seen.values()];
let prevTotal = 0;
let misses = 0;
let rewritten = 0;
console.log("req | input | cache_write | cache_read | total | verdict");
rows.forEach((row, index) => {
  const total = row.input + row.create + row.read;
  const reused = prevTotal > 0 ? row.read / prevTotal : 1;
  const miss = index > 0 && row.create > 1024 && reused < 0.9;
  if (miss) {
    misses++;
    rewritten += row.create;
  }
  console.log(
    `${String(index + 1).padStart(3)} | ${String(row.input).padStart(5)} | ${String(row.create).padStart(11)} | ${String(row.read).padStart(10)} | ${String(total).padStart(6)} | ${index === 0 ? "cold start" : miss ? `MISS (reused ${(reused * 100).toFixed(0)}%, rewrote ${row.create} tok)` : `hit (reused ${(reused * 100).toFixed(0)}%, wrote ${row.create} tok)`}`
  );
  prevTotal = total;
});
console.log(
  `\n${file.split("/").pop()}: ${rows.length} requests, ${misses} prefix-invalidating misses, ${rewritten} tokens re-written`
);
