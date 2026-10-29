#!/usr/bin/env node
// Codemod: <span className="material-symbols-outlined ..." ...>name</span>  →  <Icon name="name" ... />
// Só converte o padrão simples (className como string literal). Spans com className dinâmico
// (cn(...), template com ${}) ou com style={} ficam para conversão manual e são listados em
// `leftovers` (linha do `<span`, mesmo quando a tag abre em várias linhas → exit 2). Spans
// multi-linha com className estático (incl. {`…`} sem ${}) são normalizados e convertidos.
// O import entra DEPOIS do prólogo de diretivas ("use client" atrás de docblock/comentários).
// `title="…"` vira `ariaLabel` (role="img" + aria-label); o tooltip de hover some — o lote
// recoloca `title` no wrapper quando o tooltip importava.
// `pointer-events-none` (e `shrink-0`) é descartado do span porque o adapter já o recoloca.
//   node scripts/dev/codemod-material-icons.mjs src/app/\(dashboard\)/dashboard/health [--write]
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SPAN_RE =
  /<span((?:\s+(?:className="[^"]*"|aria-hidden(?:="true"|=\{true\})?|aria-label="[^"]*"|title="[^"]*"))*)\s*>\s*([a-z][a-z0-9_]+|\{[^{}]+\})\s*<\/span>/g;
const SPAN_ONE_RE = new RegExp(`^${SPAN_RE.source}$`);
const IMPORT = 'import Icon from "@/shared/components/Icon";';
const SPAN_CONTENT_RE = /^\s*([a-z][a-z0-9_]+|\{[^{}]+\})\s*<\/span>/;

function convertSpan(attrs, content) {
  if (!/className="[^"]*material-symbols-outlined[^"]*"/.test(attrs)) return null;
  const cls = /className="([^"]*)"/.exec(attrs)[1].split(/\s+/).filter(Boolean);
  let size;
  const rest = [];
  for (const c of cls) {
    if (c === "material-symbols-outlined" || c === "pointer-events-none" || c === "shrink-0")
      continue;
    const px = /^text-\[(\d+)px\]$/.exec(c);
    if (px) {
      size = px[1];
      continue;
    }
    rest.push(c);
  }
  const ariaLabel = /aria-label="([^"]*)"/.exec(attrs)?.[1];
  const title = /title="([^"]*)"/.exec(attrs)?.[1];
  const name = content.startsWith("{") ? `name=${content}` : `name="${content}"`;
  const props = [name];
  if (size) props.push(`size={${size}}`);
  if (ariaLabel) props.push(`ariaLabel="${ariaLabel}"`);
  else if (title) props.push(`ariaLabel="${title}"`);
  if (rest.length) props.push(`className="${rest.join(" ")}"`);
  return `<Icon ${props.join(" ")} />`;
}

// Index just past the `>` that closes the JSX opening tag starting at `start` (`<span…`),
// skipping `>` inside `{…}` expressions, strings and template literals (`=>`, `a > b`, …).
function openingTagEnd(src, start) {
  let depth = 0;
  for (let i = start + 1; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipQuoted(src, i);
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return i + 1;
  }
  return -1;
}

function skipQuoted(src, i) {
  const q = src[i];
  for (let j = i + 1; j < src.length; j++) {
    if (src[j] === "\\") j++;
    else if (src[j] === q) return j;
    else if (q === "`" && src[j] === "$" && src[j + 1] === "{") {
      let depth = 1;
      for (j += 2; j < src.length && depth; j++) {
        if (src[j] === '"' || src[j] === "'" || src[j] === "`") j = skipQuoted(src, j);
        else if (src[j] === "{") depth++;
        else if (src[j] === "}") depth--;
      }
      j--;
    }
  }
  return src.length;
}

// Every Material span opening tag, including ones whose attributes span several lines.
function materialSpans(src) {
  const spans = [];
  const re = /<span(?=[\s>])/g; // local regex: no lastIndex shared between files
  for (let m; (m = re.exec(src));) {
    const end = openingTagEnd(src, m.index);
    if (end === -1) break;
    const tag = src.slice(m.index, end);
    if (tag.includes("material-symbols-outlined")) spans.push({ start: m.index, end, tag });
    re.lastIndex = end;
  }
  return spans;
}

// A multi-line or `{`static`}` className reduced to the single-line shape SPAN_RE understands.
function normaliseTag(tag) {
  return tag
    .replace(/className=\{\s*`([^`$]*)`\s*\}/g, (_, c) => `className="${c}"`)
    .replace(/className=\{\s*"([^"]*)"\s*\}/g, (_, c) => `className="${c}"`)
    .replace(/className=\{\s*'([^'"]*)'\s*\}/g, (_, c) => `className="${c}"`)
    .replace(/\s+/g, " ")
    .replace(/ >$/, ">");
}

// Leading comments/whitespace + directive strings ("use client", 'use server', …).
// `end` is the offset just past the line holding the last directive (-1 when there is none).
export function directivePrologue(src) {
  const directives = [];
  let i = 0;
  let end = -1;
  for (;;) {
    i += /^(?:\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/)*/.exec(src.slice(i))[0].length;
    const d =
      /^(["'])(use [a-z]+)\1[ \t]*;?(?=[ \t]*(?:\/\/[^\n]*|\/\*.*?\*\/)?[ \t]*(?:\r?\n|$))/.exec(
        src.slice(i)
      );
    if (!d) break;
    directives.push(d[2]);
    i += d[0].length;
    const eol = src.indexOf("\n", i);
    end = eol === -1 ? src.length : eol + 1;
  }
  return { directives, end };
}

export function transformSource(source, file) {
  let converted = 0;
  let code = source.replace(SPAN_RE, (full, attrs, content) => {
    const icon = convertSpan(attrs, content);
    if (icon === null) return full;
    converted += 1;
    return icon;
  });
  // Second pass: spans the single-line regex missed (multi-line dynamic/static className).
  let rebuilt = "";
  let cursor = 0;
  for (const span of materialSpans(code)) {
    const body = SPAN_CONTENT_RE.exec(code.slice(span.end));
    if (!body) continue;
    const m = SPAN_ONE_RE.exec(`${normaliseTag(span.tag)}${body[1]}</span>`);
    const icon = m && convertSpan(m[1], m[2]);
    if (!icon) continue;
    rebuilt += code.slice(cursor, span.start) + icon;
    cursor = span.end + body[0].length;
    converted += 1;
  }
  code = rebuilt + code.slice(cursor);
  const leftovers = materialSpans(code).map((s) => ({
    file,
    line: code.slice(0, s.start).split("\n").length,
  }));
  let out = code;
  if (
    converted > 0 &&
    !out.includes(IMPORT) &&
    !/import Icon from ["']@\/shared\/components["']/.test(out)
  ) {
    const prologue = directivePrologue(out);
    if (prologue.end === -1) {
      out = IMPORT + "\n" + out;
    } else {
      const sep = out[prologue.end - 1] === "\n" ? "\n" : "\n\n";
      out = out.slice(0, prologue.end) + sep + IMPORT + "\n" + out.slice(prologue.end);
    }
  }
  // Guard: an import above "use client" silently turns the module into a server component.
  const before = directivePrologue(source).directives.join("\0");
  if (directivePrologue(out).directives.join("\0") !== before)
    throw new Error(`${file}: codemod would move the directive prologue — aborting`);
  return { code: out, converted, leftovers };
}

function walk(p, out = []) {
  const st = fs.statSync(p);
  if (st.isDirectory())
    for (const e of fs.readdirSync(p)) {
      if (e !== "node_modules" && e !== "__tests__") walk(path.join(p, e), out);
    }
  else if (/\.tsx$/.test(p) && !/\.test\.tsx$/.test(p)) out.push(p);
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const targets = args.filter((a) => !a.startsWith("--"));
  if (!targets.length) {
    console.error("uso: codemod-material-icons.mjs <dir|arquivo>... [--write]");
    process.exit(1);
  }
  let total = 0;
  const allLeft = [];
  for (const file of targets.flatMap((t) => walk(t))) {
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes("material-symbols-outlined")) continue;
    const { code, converted, leftovers } = transformSource(src, file);
    total += converted;
    allLeft.push(...leftovers);
    if (converted && write) fs.writeFileSync(file, code);
    if (converted && !write) console.log(`${file}: ${converted} span(s) convertible`);
  }
  console.log(
    `${write ? "converted" : "would convert"} ${total} span(s); ${allLeft.length} left for manual conversion`
  );
  for (const l of allLeft) console.log(`  manual: ${l.file}:${l.line}`);
  process.exit(allLeft.length ? 2 : 0);
}
