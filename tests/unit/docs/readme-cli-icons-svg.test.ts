import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import {
  CLI_ICON_TILES,
  README_THEMED_ICONS,
  renderCliIconTile,
  renderReadmeThemedIcon,
} from "../../../scripts/docs/gen-cli-icon-tiles.mjs";

// The README's icon directories must hold exactly what gen-cli-icon-tiles.mjs produces.
// Initials tiles stay brand-free and themed icons preserve the dashboard artwork.

type Tile = { path: string; id: string; name: string; initials: string; desc: string };
const tiles = CLI_ICON_TILES as Tile[];

const DIRS = ["docs/assets/cli-icons", "docs/assets/provider-icons"];

test("every committed tile is exactly what the generator produces", () => {
  for (const tile of tiles) {
    const committed = readFileSync(tile.path, "utf8");
    assert.equal(
      committed,
      renderCliIconTile(tile),
      `${tile.path} is stale — regenerate with \`node scripts/docs/gen-cli-icon-tiles.mjs\``
    );
  }
});

test("every committed themed icon matches the generator and retains the source drawing", () => {
  const readme = readFileSync("README.md", "utf8");
  const svgRoot = (svg: string) =>
    new JSDOM(svg, { contentType: "image/svg+xml" }).window.document.documentElement;
  for (const icon of README_THEMED_ICONS) {
    const committed = readFileSync(icon.path, "utf8");
    assert.equal(committed, renderReadmeThemedIcon(icon), `${icon.path} is stale`);
    assert.ok(readme.includes(`src="./${icon.path}"`), `${icon.path} is used by the README`);
    const original = svgRoot(readFileSync(icon.source, "utf8"));
    const themed = svgRoot(committed);
    assert.equal(themed.getAttribute("viewBox"), original.getAttribute("viewBox"));
    assert.equal(themed.getAttribute("fill"), "currentColor");
    assert.equal(themed.getAttribute("fill-rule"), original.getAttribute("fill-rule"));
    assert.deepEqual(
      [...themed.querySelectorAll("path")].map((path) => path.outerHTML),
      [...original.querySelectorAll("path")].map((path) => path.outerHTML)
    );
    assert.equal(
      themed.querySelector("style")?.textContent,
      ":root{color:#20211c}@media (prefers-color-scheme: dark){:root{color:#f2f0e8}}"
    );
  }
});

test("the icon directories hold exactly the generator's files", () => {
  const onDisk = DIRS.flatMap((dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith(".svg"))
      .map((f) => `${dir}/${f}`)
  ).sort();
  assert.deepEqual(onDisk, [...tiles, ...README_THEMED_ICONS].map(({ path }) => path).sort());
});

test("ids are unique and every tile is a labelled, self-contained text tile", () => {
  const ids = tiles.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate tile id");
  for (const tile of tiles) {
    const svg = renderCliIconTile(tile);
    assert.match(
      svg,
      /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 52 52" role="img"/
    );
    assert.ok(svg.includes(`aria-labelledby="t-${tile.id}"`) && svg.includes(`id="t-${tile.id}"`));
    assert.ok(
      svg.includes(`${tile.name} (text tile, not the project's logo)`),
      "says it is no logo"
    );
    assert.ok(svg.includes(`>${tile.initials}</text>`), `${tile.id}: initials drawn`);
    assert.ok(tile.initials.length >= 2 && tile.initials.length <= 3, `${tile.id}: 2–3 initials`);
    assert.match(svg, /font-family="Arial, Helvetica, [^"]*sans-serif"/, "Linux-safe sans stack");
    assert.doesNotMatch(
      svg,
      /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<image|<foreignObject/
    );
    // one neutral gray, no brand color
    const colors = new Set(svg.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []);
    assert.deepEqual([...colors], ["#8b8b95"], `${tile.id}: only the neutral gray`);
  }
});
