export interface DeduplicateOptions {
  threshold?: number;
}

/** Length of the run of identical lines that starts at `start` (1 when the next line differs). */
export function identicalRunLength(lines: readonly string[], start: number): number {
  let runLength = 1;
  while (start + runLength < lines.length && lines[start + runLength] === lines[start]) {
    runLength++;
  }
  return runLength;
}

export function deduplicateRepeatedLines(
  text: string,
  options: DeduplicateOptions = {}
): {
  text: string;
  collapsed: number;
} {
  const threshold = Math.max(2, Math.floor(options.threshold ?? 3));
  const lines = text.split(/\r?\n/);
  const output: string[] = [];
  let collapsed = 0;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const runLength = identicalRunLength(lines, index);

    if (line.trim() && runLength >= threshold) {
      output.push(line);
      output.push(`[line repeated ${runLength - 1}x]`);
      output.push(`[rtk:dropped ${runLength - 1} repeated lines]`);
      collapsed += runLength - 1;
      index += runLength - 1;
      continue;
    }

    output.push(line);
  }

  return { text: output.join("\n"), collapsed };
}
