import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { AUTO_ROUTING_STRATEGY_VALUES } from "../../../src/shared/constants/routingStrategies.ts";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";
import {
  AUTO_ROUTER_STRATEGIES_COPY,
  renderAutoRouterStrategies,
} from "../../../scripts/docs/gen-readme-auto-router-strategies.mjs";

const FILE = "docs/diagrams/auto-router-strategies.svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test(
  "the committed auto router strategies diagram is exactly what the generator produces",
  { skip: releaseOnlyUnlessTouched(FILE) },
  async () => {
    assert.equal(
      readFileSync(FILE, "utf8"),
      await renderAutoRouterStrategies(),
      `${FILE} is stale — regenerate with \`node scripts/docs/gen-readme-auto-router-strategies.mjs\``
    );
  }
);

test("the grid draws one animated tile per auto router strategy with aliases grouped", async () => {
  const { names } = AUTO_ROUTER_STRATEGIES_COPY;
  assert.deepEqual(
    names.filter((name: string) => name.includes(" / ")),
    ["cost / eco", "latency / fast", "sla-aware / sla"]
  );
  assert.deepEqual(
    names.flatMap((name: string) => name.split(" / ")),
    [...AUTO_ROUTING_STRATEGY_VALUES]
  );
  const svg = await renderAutoRouterStrategies();
  assert.equal(svg.match(/<rect width="268" height="192"/g)?.length, names.length);
  assert.equal(svg.match(/<animateMotion\b/g)?.length, names.length);
  assert.equal(svg.match(/class="ok-bg stroke-ok"/g)?.length, names.length);
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderAutoRouterStrategies();
  for (const s of Object.values(AUTO_ROUTER_STRATEGIES_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the SVG has accessible metadata, outlined labels and a single embedded mono font", async () => {
  const svg = await renderAutoRouterStrategies();
  assert.match(svg, /^<svg viewBox="0 0 1200 536" [^>]*role="img" aria-labelledby="t d"/);
  assert.match(svg, /<title id="t">Auto router strategies<\/title>/);
  assert.match(svg, /<desc id="d">Eight animated tiles/);
  assert.match(svg, /<use href="#g[0-9a-z]+"/);
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderAutoRouterStrategies();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
