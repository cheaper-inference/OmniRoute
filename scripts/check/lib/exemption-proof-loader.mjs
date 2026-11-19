#!/usr/bin/env node
// scripts/check/lib/exemption-proof-loader.mjs — in-memory neutralizer for a named constant.
//
// Registered only inside the proof subprocess. It reads the target file's bytes,
// replaces the initializer of one anchored declaration with a declared neutral
// value, and hands the transformed source to Node. No file in the checkout is
// written: the proof is a load-time transformation, so list values stay intact.

import { register } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { threadId } from "node:worker_threads";

/**
 * Replace the initializer of one anchored `const NAME = ...` declaration.
 * The anchor is deliberately strict: only a declaration at the start of a line
 * (optionally `export`ed) is a target, never a mention in a string or a comment.
 * A 1-based `line` limits the rewrite to the declaration found by discovery;
 * trailing identifier characters are allowed because a registry name can be a
 * prefix of a longer declaration name.
 *
 * @param {{source: string, name: string, neutralValue: string, line?: number}} input
 * @returns {{source: string, changed: boolean}}
 */
/** Line holding the semicolon that closes the initializer started at `fromColumn`. */
function initializerEndLine(lines, startLine, fromColumn) {
  let depth = 0;
  let quote = "";
  let inBlockComment = false;
  for (let i = startLine; i < lines.length; i++) {
    const text = lines[i];
    for (let j = i === startLine ? fromColumn : 0; j < text.length; j++) {
      const ch = text[j];
      const next = text[j + 1];
      if (inBlockComment) {
        if (ch === "*" && next === "/") {
          inBlockComment = false;
          j++;
        }
        continue;
      }
      if (quote) {
        if (ch === "\\") j++;
        else if (ch === quote) quote = "";
        continue;
      }
      if (ch === "/" && next === "/") break;
      if (ch === "/" && next === "*") {
        inBlockComment = true;
        j++;
        continue;
      }
      if (ch === "'" || ch === '"' || ch === "`") {
        quote = ch;
        continue;
      }
      if (ch === "(" || ch === "[" || ch === "{") depth++;
      else if (ch === ")" || ch === "]" || ch === "}") depth--;
      else if (ch === ";" && depth === 0) return i;
    }
  }
  return startLine;
}

export function neutralizeDeclaration({ source, name, neutralValue, line = 0 }) {
  if (typeof source !== "string" || typeof name !== "string" || !name) {
    return { source, changed: false };
  }
  const anchor = new RegExp(`^([ \\t]*(?:export )?const\\s+)([A-Z_0-9]+)(?:\\s*:[^=;]+)?\\s*=`);
  const lines = source.split("\n");
  const named = (text) => {
    const candidate = text.match(anchor);
    return candidate && (candidate[2] === name || candidate[2].startsWith(name));
  };
  const index = line > 0 ? line - 1 : lines.findIndex(named);
  if (index < 0 || index >= lines.length) return { source, changed: false };
  const match = lines[index].match(anchor);
  if (!match || (match[2] !== name && !match[2].startsWith(name))) {
    return { source, changed: false };
  }
  const out = [...lines];
  out[index] = `${match[1]}${match[2]} = ${neutralValue};`;
  // Replace the whole initializer so a multiline Set/array/object cannot leave
  // dangling elements behind. Blanking the consumed lines keeps line numbers
  // stable for any later declaration resolved from the same source.
  const end = initializerEndLine(lines, index, match[0].length - 1);
  for (let i = index + 1; i <= end; i++) out[i] = "";
  return { source: out.join("\n"), changed: true };
}

/**
 * ESM load hook. Delegates every module except the one named by
 * `OMNIROUTE_EXEMPTION_PROOF_TARGET` (`file#name`) unchanged. The declaration
 * line, when supplied, comes from runtime discovery so a prefix name never
 * neutralizes a neighbouring constant.
 */
export async function load(url, context, nextLoad) {
  const target = process.env.OMNIROUTE_EXEMPTION_PROOF_TARGET || "";
  const neutralValue = process.env.OMNIROUTE_EXEMPTION_PROOF_NEUTRAL || "";
  const proofLine = Number(process.env.OMNIROUTE_EXEMPTION_PROOF_LINE || 0);
  const hash = target.lastIndexOf("#");
  if (!url.startsWith("file:") || hash < 1 || !neutralValue) return nextLoad(url, context);

  const file = target.slice(0, hash);
  const name = target.slice(hash + 1);
  let requested;
  try {
    requested = fileURLToPath(url);
  } catch {
    return nextLoad(url, context);
  }
  if (requested !== resolve(process.cwd(), file)) return nextLoad(url, context);

  const raw = readFileSync(requested, "utf8");
  const { source, changed } = neutralizeDeclaration({
    source: raw,
    name,
    neutralValue,
    line: proofLine,
  });
  if (!changed) return nextLoad(url, context);
  return { format: "module", source, shortCircuit: true };
}

// Self-register when used as the proof subprocess entrypoint. Loader hooks run
// in a worker thread (threadId !== 0), so this runs once, in the main thread.
if (threadId === 0 && process.env.OMNIROUTE_EXEMPTION_PROOF_REGISTER === "1") {
  register(import.meta.url);
}
