import { createHash } from "node:crypto";

import { parseFragment } from "parse5";

export function htmlToText(input) {
  const chunks = [];
  const nodes = [parseFragment(input)];
  while (nodes.length) {
    const node = nodes.pop();
    if (node.nodeName === "#text") {
      chunks.push(node.value);
    } else if (node.tagName !== "script" && node.tagName !== "style") {
      const children = node.childNodes ?? [];
      for (let i = children.length - 1; i >= 0; i--) nodes.push(children[i]);
    }
  }
  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

export function normalizeForMatch(text) {
  return text
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}

export function extractExcerpt(matchText, anchor, chars) {
  const start = matchText.indexOf(normalizeForMatch(anchor));
  return start === -1 ? null : matchText.slice(start, start + chars);
}

export function shortHash(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
