// scripts/release/lib/render-readme-diagrams.mjs
//
// Renders every README diagram (scripts/docs/gen-readme-diagrams.mjs → README_DIAGRAMS) into
// `--out-dir`, at the same relative paths, without touching the committed files. It is the
// "readme-diagrams" step of scripts/release/refresh-derived.mjs, which runs it as
//
//   OMNIROUTE_DERIVED_FACTS_PATH=<facts.json> node --import tsx/esm \
//     scripts/release/lib/render-readme-diagrams.mjs --out-dir <dir>
//
// in a child process (cwd = the tree being refreshed) so the generators read the facts the
// refresh is about to commit — even in `--check`, where the snapshot itself is never written —
// and so their module-level copy objects are built fresh for those facts. tsx is required:
// gen-readme-free-tier-budget.mjs imports the TypeScript free-tier catalog.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const i = process.argv.indexOf("--out-dir");
const outDir = i >= 0 ? process.argv[i + 1] : null;
if (!outDir) {
  process.stderr.write("usage: render-readme-diagrams.mjs --out-dir <dir>\n");
  process.exit(2);
}

const root = process.cwd();
const { README_DIAGRAMS } = await import(
  pathToFileURL(path.join(root, "scripts", "docs", "gen-readme-diagrams.mjs")).href
);
const written = [];
for (const { name, render, out } of README_DIAGRAMS) {
  let svg;
  try {
    svg = await render();
  } catch (err) {
    process.stderr.write(`${name}: generator failed\n${err?.stack || err}\n`);
    process.exit(1);
  }
  const abs = path.join(outDir, out);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, svg);
  written.push(out);
}
process.stdout.write("@@" + JSON.stringify(written) + "\n");
process.exit(0);
