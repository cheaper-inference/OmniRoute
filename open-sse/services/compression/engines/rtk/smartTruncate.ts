export interface SmartTruncateOptions {
  maxLines?: number;
  maxChars?: number;
  preserveHead?: number;
  preserveTail?: number;
  priorityPatterns?: RegExp[];
}

/**
 * Per-file headers emitted when one tool result concatenates several files (Gemini CLI
 * `read_many_files`, MCP `read_multiple_files`) or by our own concatenators: `--- path ---`,
 * `=== path ===`, `<file path="…">`. A bare `---` (frontmatter, markdown rule) deliberately does
 * NOT match, and a single header is never enough to split — a normal single-file read must never
 * be reshaped by this path.
 */
const FILE_HEADER_RE =
  /^(?:-{3}[ \t]+\S.*?[ \t]*-{3}|={3}[ \t]+\S.*?[ \t]*={3}|<file[ \t][^>]*>)[ \t]*$/;

/** Split a concatenated multi-file result into segments; `null` when it is not one. */
export function splitFileSegments(text: string): string[][] | null {
  const lines = text.split(/\r?\n/);
  const starts: number[] = [];
  for (let index = 0; index < lines.length; index++) {
    if (FILE_HEADER_RE.test(lines[index].trim())) starts.push(index);
  }
  if (starts.length < 2) return null;
  const segments: string[][] = [];
  if (starts[0] > 0) segments.push(lines.slice(0, starts[0]));
  for (let index = 0; index < starts.length; index++) {
    segments.push(lines.slice(starts[index], starts[index + 1] ?? lines.length));
  }
  return segments;
}

export function smartTruncate(
  text: string,
  options: SmartTruncateOptions = {}
): { text: string; truncated: boolean; droppedLines: number } {
  return truncate(text, options, true);
}

function truncate(
  text: string,
  options: SmartTruncateOptions,
  allowSplit: boolean
): { text: string; truncated: boolean; droppedLines: number } {
  const maxChars = Math.max(0, Math.floor(options.maxChars ?? 0));
  const maxLines = Math.max(0, Math.floor(options.maxLines ?? 0));
  const lines = text.split(/\r?\n/);
  const overLineLimit = maxLines > 0 && lines.length > maxLines;
  const overCharLimit = maxChars > 0 && text.length > maxChars;
  if (!overLineLimit && !overCharLimit) {
    return { text, truncated: false, droppedLines: 0 };
  }

  const preserveHead = Math.max(0, Math.floor(options.preserveHead ?? 20));
  const preserveTail = Math.max(0, Math.floor(options.preserveTail ?? 20));
  // A priority pattern that matches most lines (e.g. shell-grep's summaryPatterns, which match
  // every grep line) would put the whole result in `selected` and report 0 dropped lines while
  // the char pass below actually cut the middle out. Same half-the-lines rule that pass uses.
  const priorityPatterns = (options.priorityPatterns ?? []).filter((pattern) => {
    const hits = lines.filter((line) => pattern.test(line)).length;
    return hits > 0 && hits * 2 <= lines.length;
  });

  const sourceLineCount = lines.length;
  let droppedLines = 0;
  let result: string;

  // Multi-file results are elided PER FILE. Truncating the concatenation as one blob keeps the
  // head and tail of the whole thing, which is the first file and the last file — every file in
  // between disappears without even its header surviving, so the reader cannot tell it was there.
  const segments = overLineLimit && allowSplit ? splitFileSegments(text) : null;
  if (segments) {
    const budget = Math.max(3, Math.floor(maxLines / segments.length));
    const keep = Math.max(1, Math.floor(budget / 3));
    const parts = segments.map((segment) =>
      truncate(
        segment.join("\n"),
        {
          maxLines: budget,
          preserveHead: keep,
          preserveTail: keep,
          priorityPatterns: options.priorityPatterns,
        },
        false
      )
    );
    result = parts.map((part) => part.text).join("\n");
    droppedLines = parts.reduce((sum, part) => sum + part.droppedLines, 0);
  } else {
    const head = lines.slice(0, preserveHead);
    const tail = preserveTail > 0 ? lines.slice(-preserveTail) : [];
    const selected = [...head];
    const priorityLines = lines.filter((line) =>
      priorityPatterns.some((pattern) => pattern.test(line))
    );
    for (const line of priorityLines) {
      if (!selected.includes(line)) selected.push(line);
    }
    const tailStart = lines.length - tail.length;
    tail.forEach((line, offset) => {
      const originalIndex = tailStart + offset;
      if (originalIndex >= preserveHead && !selected.includes(line)) selected.push(line);
    });

    droppedLines = Math.max(0, sourceLineCount - selected.length);
    result = [
      ...selected.slice(0, head.length),
      `[rtk:truncated ${droppedLines} lines]`,
      ...selected.slice(head.length),
    ].join("\n");
  }

  if (maxChars > 0 && result.length > maxChars) {
    const marker = "\n[rtk:truncated by chars]\n";
    const budget = Math.max(0, maxChars - marker.length);
    if (budget === 0) {
      result = marker.slice(0, maxChars);
      return { text: result, truncated: true, droppedLines };
    }
    // Enforcing the char budget with a blind slice would cut the very priority lines this
    // function just selected: they come from the middle of the list, outside both slices, so
    // on long-line output the char limit (not the line limit) binds and the diagnostics
    // disappear. Reserve budget for them first instead.
    //
    // Patterns are ranked by selectivity (fewest matching lines first) and a pattern matching
    // more than half the remaining lines is ignored: e.g. shell-grep's summaryPatterns
    // `^[^:\n]+(?::\d+)?:` matches every grep line, so treating it as "priority" would fill
    // the budget with the first lines and still cut the markers further down.
    const lines = result.split(/\r?\n/);
    const ranked: Array<{ pattern: RegExp; hits: number }> = [];
    for (const pattern of priorityPatterns) {
      let hits = 0;
      for (const line of lines) if (pattern.test(line)) hits += 1;
      if (hits > 0 && hits * 2 <= lines.length) ranked.push({ pattern, hits });
    }
    ranked.sort((a, b) => a.hits - b.hits);

    const forcedCap = Math.floor(budget / 2);
    const seen = new Set<string>();
    const forced: string[] = [];
    let forcedLength = 0;
    for (const entry of ranked) {
      for (const line of lines) {
        if (seen.has(line)) continue;
        if (!entry.pattern.test(line)) continue;
        const cost = line.length + 1;
        if (cost > forcedCap - forcedLength) continue;
        seen.add(line);
        forced.push(line);
        forcedLength += cost;
      }
    }

    const rest = Math.max(0, budget - forcedLength);
    const headChars = Math.ceil(rest * 0.55);
    const tailChars = Math.max(0, rest - headChars);
    const headRaw = rest > 0 ? result.slice(0, headChars) : "";
    // Cut on line boundaries: a blind slice leaves a half line (a partial anchor or a partial
    // grep hit) that still reads like a real result to the agent.
    const headBreak = headRaw.lastIndexOf("\n");
    const headText = headBreak === -1 ? headRaw : headRaw.slice(0, headBreak + 1);
    const tailRaw = tailChars > 0 ? result.slice(-tailChars) : "";
    const tailBreak = tailRaw.indexOf("\n");
    const tailText = tailChars > 0 && tailBreak !== -1 ? tailRaw.slice(tailBreak + 1) : tailRaw;
    // Drop forced lines already present in a slice so nothing is duplicated.
    const forcedText = forced
      .filter((line) => !headText.includes(line) && !tailText.includes(line))
      .join("\n");
    result = `${headText}${marker}${forcedText ? `${forcedText}\n` : ""}${tailText}`;
    if (result.length > maxChars) result = result.slice(0, maxChars);
    // Report what the caller actually lost, markers excluded.
    const kept = result.split(/\r?\n/).filter((line) => !line.startsWith("[rtk:")).length;
    droppedLines = Math.max(0, sourceLineCount - kept);
    // The line-pass marker above was rendered BEFORE this pass ran, so it still states the
    // pre-char count — `[rtk:truncated 0 lines]` next to a text that lost five. Rewrite it with
    // the recount, so the number in the text always matches what is missing.
    result = result.replace(/\[rtk:truncated \d+ lines\]/, `[rtk:truncated ${droppedLines} lines]`);
  }

  return { text: result, truncated: true, droppedLines };
}
