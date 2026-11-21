/**
 * Live probe: replay two consecutive real Claude Code requests through a running OmniRoute
 * deployment and read the Anthropic cache accounting from the responses.
 *
 * If the second request's cache_read is smaller than the first request's total prompt, the
 * deployed compression stack rewrote already-sent history: that is a real prompt-cache miss
 * (paid as cache-write tokens every turn).
 *
 * Usage: node --import tsx scripts/ad-hoc/cc-live-prefix-probe.ts <session.jsonl> --turns=A,B
 *          [--url=https://...] [--key=sk-...] [--dry]
 *          (or set OMNIROUTE_URL / OMNIROUTE_API_KEY instead of the flags)
 */
import fs from "node:fs";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const turnsArg = args.find((a) => a.startsWith("--turns="));
const url = args.find((a) => a.startsWith("--url="))?.split("=")[1] ?? process.env.OMNIROUTE_URL;
const key =
  args.find((a) => a.startsWith("--key="))?.split("=")[1] ?? process.env.OMNIROUTE_API_KEY;
const dry = args.includes("--dry");
if (!url) throw new Error("missing deployment URL (--url= or OMNIROUTE_URL)");
const lossless = args.includes("--lossless");
// A fresh nonce makes every probe independent of cache entries written by earlier runs.
const nonce = args.find((a) => a.startsWith("--nonce="))?.split("=")[1] ?? "";
// `x-n` is the documented per-request compression override (off | safe | engine:<id> | <combo>).
const compressHeader =
  args.find((a) => a.startsWith("--compress="))?.split("=")[1] ?? (lossless ? null : "allow-lossy");
if (!file || !turnsArg)
  throw new Error("usage: cc-live-prefix-probe.ts <session.jsonl> --turns=A,B");

const lines = fs
  .readFileSync(file, "utf8")
  .split("\n")
  .filter((l) => l.trim())
  .map((l) => JSON.parse(l) as any);
const shape = lines.find((l) => l.type === "api-request-shape")!.shape as any;
const system = shape.system as any[];
const tools = (shape.tools ?? []) as any[];

const messages: any[] = [];
for (const line of lines) {
  if (line.type !== "user" && line.type !== "assistant") continue;
  if (line.isSidechain === true) continue;
  const msg = line.message;
  if (!msg || typeof msg !== "object" || !msg.role) continue;
  messages.push({ role: msg.role, content: msg.content });
}
const boundaries: number[] = [];
for (let i = 0; i < messages.length; i++) if (messages[i].role === "user") boundaries.push(i + 1);

/** Claude Code marker placement: system[0], system[1] and a rolling message marker. */
function buildBody(upTo: number) {
  const history = messages.slice(0, upTo).map((m) => ({ ...m }));

  const markerIdx = history.length - 2;
  const marked = history.map((msg, index) =>
    index === markerIdx ? { ...msg, content: addMarker(msg.content) } : msg
  );
  return {
    model: "claude-opus-5-5",
    max_tokens: 16,
    stream: false,
    system: [
      ...system.map((block, index) =>
        index < 2 && block && typeof block === "object"
          ? { ...block, cache_control: { type: "ephemeral" } }
          : block
      ),
      // Nonce block: guarantees a cache-cold prefix so a probe never reuses an earlier run's bytes.
      ...(nonce ? [{ type: "text", text: `probe nonce ${nonce}` }] : []),
    ],
    tools,
    messages: marked,
  };
}
function addMarker(content: any) {
  if (typeof content === "string")
    return [{ type: "text", text: content, cache_control: { type: "ephemeral" } }];
  if (Array.isArray(content) && content.length > 0)
    return [{ ...content[0], cache_control: { type: "ephemeral" } }, ...content.slice(1)];
  return content;
}

const [a, b] = turnsArg
  .split("=")[1]
  .split(",")
  .map((n) => Number(boundaries[Number(n) - 1]));
const bodies = [buildBody(a), buildBody(b)];
for (const [index, body] of bodies.entries()) {
  console.log(
    `turn ${index + 1}: ${body.messages.length} messages, ${JSON.stringify(body).length} body bytes`
  );
}
if (dry) process.exit(0);
if (!key) throw new Error("missing API key (--key= or OMNIROUTE_API_KEY)");

const results: any[] = [];
for (const [index, body] of bodies.entries()) {
  const started = Date.now();
  const response = await fetch(`${url}/v1/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      ...(compressHeader ? { "x-omniroute-compression": compressHeader } : {}),
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  const usage = payload?.usage ?? {};
  const total =
    (usage.input_tokens ?? 0) +
    (usage.cache_creation_input_tokens ?? 0) +
    (usage.cache_read_input_tokens ?? 0);
  results.push({ status: response.status, usage, total, ms: Date.now() - started });
  const omniHeaders = [...response.headers.entries()].filter(([name]) =>
    /omniroute|compression|x-n/i.test(name)
  );
  console.log(
    `turn ${index + 1}: HTTP ${response.status} in ${Date.now() - started}ms usage=${JSON.stringify(usage)}`
  );
  if (omniHeaders.length)
    console.log(`  headers: ${JSON.stringify(Object.fromEntries(omniHeaders))}`);
  if (response.status !== 200) console.log("  body:", JSON.stringify(payload).slice(0, 400));
}
if (results.length === 2 && results[1].status === 200) {
  // Anthropic never caches the segment past the client's last breakpoint: that tail is billed as
  // `input_tokens`. Compare against what the first request actually cached, not its total.
  const cached =
    results[0].usage.cache_read_input_tokens + results[0].usage.cache_creation_input_tokens;
  const read = results[1].usage.cache_read_input_tokens ?? 0;
  const wrote = results[1].usage.cache_creation_input_tokens ?? 0;
  const reuse = cached ? (read / cached) * 100 : 0;
  console.log(
    `\nreused ${read}/${cached} cached tokens (${reuse.toFixed(1)}%) | rewrote ${wrote} tok | ${reuse < 95 ? "PREFIX INVALIDATED" : "prefix stable"}`
  );
}
