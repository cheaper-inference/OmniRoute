export function parseSseChunk(text) {
  // Iterates LINES within each block: the VPS emits SSE comment-lines
  // (": x-omniroute-*") in the same block as "data: [DONE]", so just look at the
  // beginning of block loses terminator.
  const events = [];
  for (const block of text.split(/\n\n/)) {
    for (const line of block.split("\n")) {
      const t = line.trim();
      if (t.startsWith("data:")) events.push(t.slice(5).trim());
    }
  }
  return events;
}

export function summarizeStream(events) {
  let contentDeltas = 0;
  let done = false;
  for (const e of events) {
    if (e === "[DONE]") {
      done = true;
      continue;
    }
    try {
      const j = JSON.parse(e);
      if (j.choices?.[0]?.delta?.content) contentDeltas++;
    } catch {
      /* partial fragment — ignored; the caller accumulates buffer */
    }
  }
  const ok = contentDeltas >= 1 && done;
  return { ok, contentDeltas, done };
}

/** Performs 1 real streaming chat and validates the end-to-end SSE protocol. */
export async function checkSse(baseUrl, apiKey, model, { retries = 1 } = {}) {
  try {
    const res = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Reply with exactly: OK" }],
        max_tokens: 5,
        stream: true,
      }),
    });
    if (res.status !== 200) return { ok: false, failures: [`HTTP ${res.status}`] };
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/event-stream")) return { ok: false, failures: [`content-type "${ct}"`] };

    const events = [];
    let buffer = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lastSep = buffer.lastIndexOf("\n\n");
      if (lastSep >= 0) {
        events.push(...parseSseChunk(buffer.slice(0, lastSep + 2)));
        buffer = buffer.slice(lastSep + 2);
      }
    }
    // flush the rest of the buffer (last block may arrive without "\n\n" in the final read)
    if (buffer.trim()) events.push(...parseSseChunk(buffer));
    const s = summarizeStream(events);
    return { ok: s.ok, failures: s.ok ? [] : [`contentDeltas=${s.contentDeltas} done=${s.done}`] };
  } catch (err) {
    // Socket keep-alive recycled by the server between requests is transient —
    // 1 retry before reporting failure. Persistent error is layer FAILURE,
    // never crash the orchestrator.
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1_000));
      return checkSse(baseUrl, apiKey, model, { retries: retries - 1 });
    }
    return { ok: false, failures: [`fetch/stream error: ${err?.cause?.message || err.message}`] };
  }
}
