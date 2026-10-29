// Regenerates every generated README diagram in one go, in README order. Each SVG under
// docs/diagrams/ is committed and byte-compared by tests/unit/docs/readme-<name>-svg.test.ts,
// so a stale picture fails `test-unit`; after touching a generator, a shared module
// (readme-fonts.mjs, readme-diagram-theme.mjs) or the data a generator reads (the free-tier
// catalog, provider display names), run this and commit the SVGs it rewrites.
//
//   npm run docs:readme-diagrams
//   (node --import tsx/esm scripts/docs/gen-readme-diagrams.mjs — tsx because
//    gen-readme-free-tier-budget.mjs imports open-sse/config/freeModelCatalog.ts)
//
// Output paths are resolved from the repository root, so the command works from any cwd.
// A generator that throws stops the run with a non-zero exit; the files already written stay
// on disk (they are the generators' own output, never a partial write).
//
// README_DIAGRAMS is exported for tests/unit/docs/readme-diagrams-driver.test.ts (the list must
// equal the gen-readme-*.mjs glob, in README order) and readme-glyph-coverage.test.ts.
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderReadmeHero } from "./gen-readme-hero.mjs";
import { renderReadmeFreeTierBudget } from "./gen-readme-free-tier-budget.mjs";
import { renderReadmeWorksZeroConfig } from "./gen-readme-works-zero-config.mjs";
import { renderReadmePromisePillars } from "./gen-readme-promise-pillars.mjs";
import { renderReadmeWhyPainFix } from "./gen-readme-why-pain-fix.mjs";
import { renderTierCascade } from "./gen-readme-tier-cascade.mjs";
import { renderStrategiesGrid } from "./gen-readme-strategies-grid.mjs";
import { renderResilienceLayers } from "./gen-readme-resilience-layers.mjs";
import { renderComparisonTable } from "./gen-readme-comparison-table.mjs";
import { renderPrivacyLocal } from "./gen-readme-privacy-local.mjs";
import { renderCliTerminal } from "./gen-readme-cli-terminal.mjs";
import { renderCompressionPipeline } from "./gen-readme-compression-pipeline.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// README order (top to bottom). `out` is relative to the repository root.
export const README_DIAGRAMS = [
  { name: "readme-hero", render: renderReadmeHero, out: "docs/diagrams/readme-hero.svg" },
  {
    name: "free-tier-budget",
    render: renderReadmeFreeTierBudget,
    out: "docs/diagrams/free-tier-budget.svg",
  },
  {
    name: "works-zero-config",
    render: renderReadmeWorksZeroConfig,
    out: "docs/diagrams/works-zero-config.svg",
  },
  {
    name: "promise-pillars",
    render: renderReadmePromisePillars,
    out: "docs/diagrams/promise-pillars.svg",
  },
  { name: "why-pain-fix", render: renderReadmeWhyPainFix, out: "docs/diagrams/why-pain-fix.svg" },
  { name: "tier-cascade", render: renderTierCascade, out: "docs/diagrams/tier-cascade.svg" },
  {
    name: "strategies-grid",
    render: renderStrategiesGrid,
    out: "docs/diagrams/strategies-grid.svg",
  },
  {
    name: "resilience-layers",
    render: renderResilienceLayers,
    out: "docs/diagrams/resilience-layers.svg",
  },
  {
    name: "comparison-table",
    render: renderComparisonTable,
    out: "docs/diagrams/comparison-table.svg",
  },
  { name: "privacy-local", render: renderPrivacyLocal, out: "docs/diagrams/privacy-local.svg" },
  { name: "cli-terminal", render: renderCliTerminal, out: "docs/diagrams/cli-terminal.svg" },
  {
    name: "compression-pipeline",
    render: renderCompressionPipeline,
    out: "docs/diagrams/compression-pipeline.svg",
  },
];

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  for (const { name, render, out } of README_DIAGRAMS) {
    let svg;
    try {
      svg = await render();
    } catch (err) {
      console.error(`${name}: generator failed`);
      console.error(err);
      process.exit(1);
    }
    writeFileSync(resolve(ROOT, out), svg);
    console.log(`${name} → ${out} (${Math.round(Buffer.byteLength(svg) / 1024)} KB)`);
  }
}
