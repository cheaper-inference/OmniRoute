/** Read one balanced reasoning wrapper while preserving its inner text. */
function consumeThought(content: string, start: number) {
  const tags = /<\/?think>/g;
  tags.lastIndex = start;
  let depth = 1;
  let cursor = start;
  let thought = "";
  let closeEnd = -1;
  for (let tag = tags.exec(content); tag; tag = tags.exec(content)) {
    thought += content.slice(cursor, tag.index);
    cursor = tags.lastIndex;
    depth += tag[0] === "<think>" ? 1 : -1;
    if (depth === 0) {
      closeEnd = cursor;
      break;
    }
  }
  if (closeEnd < 0) thought += content.slice(cursor);
  return { thought, closeEnd };
}

/** Native ZCode sometimes returns reasoning wrappers inside its final text. */
export function normalizeZcodeResponseText(text: string, reasoning = "") {
  const thoughts = reasoning ? [reasoning] : [];
  let content = text;
  // Only protocol prefixes, not quoted examples or tool arguments, are consumed.
  while (true) {
    const marker = content.match(
      /^\s*\[COMPRESSED:(?:summary|aging:(?:fullSummary|moderate|light|verbatim))\]\s*/
    );
    if (marker) {
      content = content.slice(marker[0].length);
      continue;
    }
    const open = content.match(/^\s*<think>\s*/);
    if (!open) break;
    const { thought, closeEnd } = consumeThought(content, open[0].length);
    if (thought.trim()) thoughts.push(thought.trim());
    content = closeEnd < 0 ? "" : content.slice(closeEnd).trimStart();
  }
  return { content, reasoning: thoughts.join("\n\n") };
}
