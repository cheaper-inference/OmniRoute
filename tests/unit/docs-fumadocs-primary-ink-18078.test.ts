/**
 * #18078 — on /docs the active nav link (`data-[active=true]:text-fd-primary` in fumadocs-ui)
 * painted the brand accent as text. The accent is a surface colour: Classic lime on the light
 * background is ≈ 1.1:1 and Editions copper ≈ 1.8:1 (see the --color-primary-ink comment in
 * globals.css). `text-*` utilities read `--text-color-*` before `--color-*`, so pointing
 * `--text-color-fd-primary` at the readable primary ink fixes every `text-fd-primary` use while
 * `bg-fd-primary` / `border-fd-primary` keep the accent.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const css = fs.readFileSync(path.join(ROOT, "src/app/globals.css"), "utf8");

/** Body of the first `@theme inline { … }` block (balanced braces). */
function themeInlineBlock(source: string): string {
  const start = source.indexOf("@theme inline {");
  assert.notEqual(start, -1, "globals.css has an @theme inline block");
  let depth = 0;
  for (let i = source.indexOf("{", start); i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error("unbalanced @theme inline block");
}

test("text-fd-primary reads the readable primary ink, not the accent surface colour", () => {
  const theme = themeInlineBlock(css);
  assert.match(theme, /--text-color-fd-primary:\s*var\(--color-primary-ink\);/);
});

test("the Fumadocs accent itself stays the kit accent for surfaces", () => {
  assert.match(css, /--color-fd-primary:\s*var\(--ci-color-accent\);/);
});

test("fumadocs-ui still colours the active nav link with text-fd-primary", () => {
  // If an upgrade renames the utility, this override silently stops applying: fail loudly.
  const dist = path.join(ROOT, "node_modules/fumadocs-ui/dist");
  const stack = [dist];
  let found = false;
  while (stack.length > 0 && !found) {
    const dir = stack.pop() as string;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.name.endsWith(".js")) {
        if (fs.readFileSync(full, "utf8").includes("data-[active=true]:text-fd-primary")) {
          found = true;
          break;
        }
      }
    }
  }
  assert.ok(found, "fumadocs-ui dist uses data-[active=true]:text-fd-primary");
});
