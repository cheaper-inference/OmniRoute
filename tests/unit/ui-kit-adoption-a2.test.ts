// CI UI Kit adoption, slice A2 (settings): static guards over
// `src/app/(dashboard)/dashboard/settings/**`. Each test pins one mapping of the adoption so
// the hand-written form does not come back. An exception is a `file|needle` line with the
// reason next to it; a stale exception fails the test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SETTINGS = path.join(ROOT, "src", "app", "(dashboard)", "dashboard", "settings");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const FILES = walk(SETTINGS).map((full) => ({
  file: path.relative(SETTINGS, full).split(path.sep).join("/"),
  text: fs.readFileSync(full, "utf8"),
}));

type Hit = { file: string; line: number; text: string };

/** Every line of the settings sources that matches `pattern`. */
function hits(pattern: RegExp): Hit[] {
  const found: Hit[] = [];
  for (const { file, text } of FILES) {
    text.split("\n").forEach((line, index) => {
      if (pattern.test(line)) found.push({ file, line: index + 1, text: line.trim() });
    });
  }
  return found;
}

/** Hits not covered by an exception, plus the exceptions that no longer match anything. */
function offenders(found: Hit[], exceptions: Record<string, string>) {
  const used = new Set<string>();
  const left = found.filter((hit) => {
    const key = Object.keys(exceptions).find((entry) => {
      const [file, needle] = entry.split("|");
      return hit.file === file && hit.text.includes(needle);
    });
    if (key) used.add(key);
    return !key;
  });
  const stale = Object.keys(exceptions).filter((key) => !used.has(key));
  return { left: left.map((hit) => `${hit.file}:${hit.line}: ${hit.text}`), stale };
}

type Element = { file: string; line: number; tag: string; attrs: Record<string, string> };

/**
 * Every JSX element of the settings sources whose tag is in `tags`, with the text of its
 * attributes: a string literal as is, an expression as source text, a bare attribute as "".
 */
function elements(tags: string[]): Element[] {
  const wanted = new Set(tags);
  const found: Element[] = [];
  for (const { file, text } of FILES) {
    if (!file.endsWith(".tsx")) continue;
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(tree);
        if (wanted.has(tag)) {
          const attrs: Record<string, string> = {};
          for (const attr of node.attributes.properties) {
            if (!ts.isJsxAttribute(attr)) continue;
            const init = attr.initializer;
            attrs[attr.name.getText(tree)] = !init
              ? ""
              : ts.isStringLiteral(init)
                ? init.text
                : init.getText(tree);
          }
          const line = tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
          found.push({ file, line, tag, attrs });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  }
  return found;
}

const FIELD_TAGS = ["Input", "Textarea", "NumberInput", "SavedNumberInput"];

// D — number-input: a numeric setting is the shared `NumberInput` (kit NumberInput inside the
// kit Field), never `<Input type="number">`: the value is `number | null`, the unit sits in
// the field and `min`/`max` apply when the edit ends.
test('A2/D: settings has no <Input type="number">', () => {
  const { left, stale } = offenders(hits(/type=["']number["']/), {});
  assert.deepEqual(left, []);
  assert.deepEqual(stale, []);
});

test("A2/D: the numeric fields of settings go through the shared NumberInput adapter", () => {
  const users = FILES.filter(({ text }) => /<(Saved)?NumberInput\b/.test(text)).map(
    ({ file }) => file
  );
  assert.ok(users.length >= 25, `expected the migrated screens, found ${users.length}`);
  // The kit component is never imported directly: the adapter passes the app locale and the
  // Field label/hint/error wiring.
  assert.deepEqual(
    FILES.filter(({ text }) => text.includes("@omniroute/ui-kit/number-input")).map(
      ({ file }) => file
    ),
    []
  );
});

// D — input-mono-xs: `font-mono` does nothing on an <input> or a <textarea> (the kit typography
// sheet wins), so code-like fields ask for the kit code font with `mono`; a dense field asks for
// `size="xs"` instead of shrinking the text by class.
test("A2/D: settings fields use `mono` and `size`, not font or text-size classes", () => {
  const fields = elements(FIELD_TAGS);
  assert.ok(fields.length > 150, `expected the settings fields, found ${fields.length}`);
  const bad = fields
    .filter(({ attrs }) => {
      const classes = `${attrs.className ?? ""} ${attrs.inputClassName ?? ""}`;
      const sized = /(^|[\s"'`])(text-(xs|\[\d+px\])|h-8)(?=$|[\s"'`])/.test(
        attrs.inputClassName ?? ""
      );
      return /\bfont-mono\b/.test(classes) || sized;
    })
    .map(({ file, line, tag }) => `${file}:${line} <${tag}>`);
  assert.deepEqual(bad, []);
  assert.ok(
    fields.filter(({ attrs }) => "mono" in attrs).length >= 13,
    "the code-like fields carry the `mono` prop"
  );
});

// D — file-trigger: a toolbar "Import"/"Upload" opens the native picker through the kit
// `FileTrigger` around its Button, not through a hidden <input type="file"> clicked by a ref.
test("A2/D: settings opens the file picker through FileTrigger", () => {
  assert.deepEqual(
    hits(/type=["']file["']|\.current\?\.click\(\)/).map(({ file, line }) => `${file}:${line}`),
    []
  );
  assert.equal(elements(["FileTrigger"]).length, 4);
});
