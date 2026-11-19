// `card` is not a class of this app.
//
// Neither globals.css nor the vendored kit defines `.card` (the kit classes are `ci-card…`, and
// `card` is only a colour and a radius token: `bg-card`, `rounded-card`). A
// `<div className="card p-5">` therefore renders the padding and nothing else: no surface, no
// border, no radius. The UI review of 2026-11-15 found 14 such boxes in the search and
// compression analytics tabs and in the translator compression preview. The surface is the
// `Card` adapter (src/shared/components/Card.tsx).

import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import ts from "typescript";

import {
  ROOT,
  lineOf,
  literalTokens,
  parse,
  read,
  rel,
  sourceFiles,
} from "../helpers/classScan.ts";

test("no stylesheet defines a bare .card rule", () => {
  for (const css of ["src/app/globals.css", "packages/ui-kit/src/ci-ui.css"]) {
    assert.doesNotMatch(read(path.join(ROOT, css)), /(^|[\s,}])\.card\b/m, css);
  }
});

test("no className in src/app or src/shared uses the bare `card` class", () => {
  const hits: string[] = [];
  for (const file of sourceFiles("src/app", "src/shared")) {
    if (!file.endsWith(".tsx")) continue;
    const text = read(file);
    if (!/(?<![\w-])card(?![\w-])/.test(text)) continue;
    const sf = parse(file, text);
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && /class(Name)?$/i.test(node.name.getText(sf))) {
        for (const { token, node: literal } of literalTokens(node)) {
          if (token === "card") hits.push(`${rel(file)}:${lineOf(sf, literal)}`);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  assert.deepEqual(
    hits,
    [],
    "`card` paints nothing: use the Card adapter (@/shared/components/Card)"
  );
});
