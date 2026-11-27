import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { CLI_ICON_TILES, renderCliIconTile } from "../../../scripts/docs/gen-cli-icon-tiles.mjs";

// The README's neutral initials tiles (docs/assets/cli-icons/, docs/assets/provider-icons/) must be
// exactly what scripts/docs/gen-cli-icon-tiles.mjs writes, the directories must hold nothing the
// generator does not own, and every tile must stay a self-contained, brand-free text tile.

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

test("the tile directories hold exactly the generator's files", () => {
  const onDisk = DIRS.flatMap((dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith(".svg"))
      .map((f) => `${dir}/${f}`)
  ).sort();
  assert.deepEqual(onDisk, tiles.map((t) => t.path).sort());
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
