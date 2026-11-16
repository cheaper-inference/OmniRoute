import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The README mirrors under docs/i18n/<locale>/ carried the root README's references verbatim,
// so every image (`./docs/screenshots/...`, `docs/assets/flags/...`) and repo link was broken on
// GitHub in all 66 locales. run-translation now rebases them when it writes the mirror.

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE = [
  "# Demo",
  "",
  "Intro paragraph.",
  "",
  '<img src="./docs/screenshots/main.png" alt="Main" width="100%">',
  "",
  "## Usage",
  "",
  "See ![flag](docs/assets/flags/us.svg) and the [license](LICENSE).",
  "",
  "```bash",
  "cat ./docs/screenshots/main.png",
  "```",
  "",
].join("\n");

const FAKE_FETCH = `
globalThis.fetch = async (url, init) => {
  const q = new URLSearchParams(init.body).getAll("q");
  return { ok: true, status: 200, json: async () => q };
};
`;

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-mirror-paths-"));
  cpSync(path.join(REPO, "scripts", "i18n"), path.join(root, "scripts", "i18n"), {
    recursive: true,
  });
  symlinkSync(path.join(REPO, "node_modules"), path.join(root, "node_modules"), "dir");
  mkdirSync(path.join(root, "config"), { recursive: true });
  const locale = (code: string) => ({
    code,
    label: code.toUpperCase(),
    native: code,
    english: code,
  });
  writeFileSync(
    path.join(root, "config", "i18n.json"),
    JSON.stringify({ default: "en", docsExcluded: ["en"], locales: ["en", "ja"].map(locale) })
  );
  writeFileSync(path.join(root, "fake-fetch.mjs"), FAKE_FETCH);
  writeFileSync(path.join(root, "README.md"), SOURCE);
  writeFileSync(path.join(root, "LICENSE"), "MIT\n");
  for (const rel of ["docs/screenshots/main.png", "docs/assets/flags/us.svg"]) {
    mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    writeFileSync(path.join(root, rel), "");
  }
  writeFileSync(path.join(root, ".i18n-state.json"), JSON.stringify({ sources: {} }));
  return root;
}

test("a root README mirror is written with references that resolve from docs/i18n/<locale>/", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const res = spawnSync(
    process.execPath,
    [
      "--import",
      path.join(root, "fake-fetch.mjs"),
      path.join(root, "scripts", "i18n", "run-translation.mjs"),
      "--files=README.md",
    ],
    {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CEILING_DIRECTORIES: path.dirname(root),
        OMNIROUTE_TRANSLATION_ENGINE: "google",
        OMNIROUTE_TRANSLATION_GOOGLE_API_KEY: "",
      },
    }
  );
  assert.equal(res.status, 0, `${res.stdout}\n${res.stderr}`);

  const mirror = readFileSync(path.join(root, "docs", "i18n", "ja", "README.md"), "utf8");
  assert.match(mirror, /<img src="\.\.\/\.\.\/screenshots\/main\.png"/);
  assert.match(mirror, /!\[[^\]]*\]\(\.\.\/\.\.\/assets\/flags\/us\.svg\)/);
  assert.match(mirror, /\]\(\.\.\/\.\.\/\.\.\/LICENSE\)/);
  // the language bar keeps its own relative form, and code stays a literal
  assert.match(mirror, /\[English\]\(\.\.\/\.\.\/\.\.\/README\.md\)/);
  assert.match(mirror, /cat \.\/docs\/screenshots\/main\.png/);
  assert.doesNotMatch(mirror, /src="\.\/docs\//);
});
