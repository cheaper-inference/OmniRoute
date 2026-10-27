/**
 * Markdown lines outside fenced code blocks. A fence closes only with the same delimiter
 * character, at least its opening length, and no info string. Shorter or mixed fences inside an
 * example remain code.
 */
export function linesOutsideFencedCode(markdown) {
  const outside = [];
  let fence = null;

  for (const line of markdown.split(/\r?\n/)) {
    const delimiter = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (
        delimiter &&
        delimiter[1][0] === fence[0] &&
        delimiter[1].length >= fence.length &&
        /^[ \t]*$/.test(delimiter[2])
      ) {
        fence = null;
      }
      continue;
    }
    if (delimiter && (delimiter[1][0] === "~" || !delimiter[2].includes("`"))) {
      fence = delimiter[1];
      continue;
    }
    outside.push(line);
  }

  return outside;
}

/** Long prose lines (> 20 chars, not table/code/list scaffolding) outside fenced code. */
function proseLines(text) {
  return linesOutsideFencedCode(text)
    .map((line) => line.trim())
    .filter((line) => line.length > 20 && !/^[`|#\-*\d\s]+$/.test(line));
}

/**
 * True when a mirror fragment is still (mostly) the English source: its non-fenced content is
 * byte-equal, or at least 80 percent of its prose lines appear verbatim in the source. Fragments
 * with fewer than three prose lines fall back to non-fenced equality, while code-only sections
 * are legitimately identical.
 */
export function looksUntranslated(mirrorFragment, sourceFragment) {
  const mirrorOutside = linesOutsideFencedCode(mirrorFragment).join("\n").trim();
  const sourceOutside = linesOutsideFencedCode(sourceFragment).join("\n").trim();
  if (mirrorOutside && mirrorOutside === sourceOutside) {
    return /[A-Za-z]{3,}/.test(sourceOutside);
  }
  const mirrorLines = proseLines(mirrorFragment);
  if (mirrorLines.length < 3) return false;
  const sourceLines = new Set(proseLines(sourceFragment));
  return mirrorLines.filter((line) => sourceLines.has(line)).length / mirrorLines.length >= 0.8;
}
