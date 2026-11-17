// Neutral initials tiles for the README's CLI-tool and provider grids: one 52×52 SVG per tool or
// provider that has no icon asset stored in the repository. Same stroke and gray as
// public/providers/cli-generic.svg; initials only, never a brand color or shape, and the <title>
// says it is a text tile, not the project's logo. Output is committed under
// docs/assets/cli-icons/ and docs/assets/provider-icons/;
// tests/unit/docs/readme-cli-icons-svg.test.ts fails when a committed tile no longer matches.
//
//   node scripts/docs/gen-cli-icon-tiles.mjs [--out-root dir]
//
// Not a gen-readme-*.mjs module on purpose: that glob is the README diagram driver's inventory
// (tests/unit/docs/readme-diagrams-driver.test.ts), and these tiles are not diagrams. When a real
// icon for one of these lands in the repo, point the README at it and drop the entry here.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const CLI_DESC = "used where no official icon is stored in the repository.";
const PROVIDER_DESC = "matching the provider text icon used in the dashboard.";

// [id, display name, initials]. Order is the README grid's; it does not change the output.
const CLI_TOOLS = [
  ["kilo", "Kilo Code", "KC"],
  ["aider", "Aider", "Ai"],
  ["forge", "ForgeCode", "FC"],
  ["jcode", "jcode", "jc"],
  ["codewhale", "CodeWhale", "CW"],
  ["opencode", "OpenCode", "OC"],
  ["smelt", "Smelt", "Sm"],
  ["pi", "Pi", "Pi"],
  ["interpreter", "Open Interpreter", "OI"],
  ["warp", "Warp AI", "Wa"],
  ["crush", "Crush", "Cr"],
  ["letta", "Letta CLI", "Le"],
  ["omp", "Oh My Pi", "OMP"],
  ["prime-agent", "Prime Agent", "PA"],
  ["openclaude", "OpenClaude", "OCL"],
  ["agent-deck", "Agent Deck", "AD"],
  ["5dive", "5dive", "5d"],
  ["whycodes", "WhyCodes", "WC"],
  ["antigravity", "Antigravity", "Ag"],
  ["amp", "Amp", "Am"],
  ["devin", "Devin CLI", "Dv"],
  ["zoo-code", "Zoo Code", "ZC"],
];

const PROVIDERS = [["kilo-gateway", "Kilo Gateway", "KG"]];

/** Every tile, as { path (repo-relative), id, name, initials, desc }. */
export const CLI_ICON_TILES = [
  ...CLI_TOOLS.map(([id, name, initials]) => ({
    path: `docs/assets/cli-icons/${id}.svg`,
    id,
    name,
    initials,
    desc: CLI_DESC,
  })),
  ...PROVIDERS.map(([id, name, initials]) => ({
    path: `docs/assets/provider-icons/${id}.svg`,
    id,
    name,
    initials,
    desc: PROVIDER_DESC,
  })),
];

/**
 * One tile. Three-letter initials drop to 14px so they fit the 44px frame; the baseline sits at
 * 26 + 0.36·size, which centers Arial's cap height in the tile.
 * @param {{ id: string, name: string, initials: string, desc: string }} tile
 */
export function renderCliIconTile({ id, name, initials, desc }) {
  const size = initials.length >= 3 ? 14 : 19;
  const y = (26 + size * 0.36).toFixed(1);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" role="img" aria-labelledby="t-${id}">` +
    `<title id="t-${id}">${name} (text tile, not the project's logo)</title>` +
    `<desc>Neutral rounded tile with the initials ${initials}, ${desc}</desc>` +
    `<rect x="4" y="4" width="44" height="44" rx="10" fill="none" stroke="#8b8b95" stroke-width="3"/>` +
    `<text x="26" y="${y}" text-anchor="middle" font-family="Arial, Helvetica, 'Liberation Sans', sans-serif" font-size="${size}" font-weight="700" fill="#8b8b95">${initials}</text>` +
    `</svg>\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--out-root");
  if (i >= 0 && !process.argv[i + 1]) throw new Error("--out-root requires a directory");
  const outRoot = i >= 0 ? resolve(process.argv[i + 1]) : ROOT;
  for (const tile of CLI_ICON_TILES) {
    const out = join(outRoot, tile.path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, renderCliIconTile(tile));
  }
  console.log(`cli icon tiles → ${CLI_ICON_TILES.length} files under ${outRoot}`);
}
