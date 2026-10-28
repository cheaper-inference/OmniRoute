import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import { pathToFileURL } from "node:url";

import { createLocaleMessagesLoader, parseLocaleMessages } from "../../../src/i18n/request.ts";

// Webpack loads the locale catalogs as raw text (`asset/source`, minified and
// validated by scripts/build/localeMessagesLoader.cjs) instead of `json`
// modules, so the server compile no longer keeps every catalog as an object
// tree with per-key export tracking. src/i18n/request.ts parses the text.
const repoRoot = process.cwd();
const nextConfigUrl = pathToFileURL(path.join(repoRoot, "next.config.mjs")).href;
const { default: nextConfig } = await import(`${nextConfigUrl}?case=webpack-locale-messages`);
const requireFromRepo = createRequire(path.join(repoRoot, "package.json"));

type Rule = { test?: RegExp; type?: string; use?: Array<{ loader: string }> };

// Stands in for any `json` handling already in the config when the hook runs.
// When several rules match a module, webpack takes `type` from the last one,
// so the catalog rule has to come after it.
const EARLIER_JSON_RULE: Rule = { test: /\.json$/i, type: "json" };

function webpackRules(dev: boolean): Rule[] {
  const config: Record<string, unknown> = {
    context: repoRoot,
    ignoreWarnings: [],
    module: { rules: [EARLIER_JSON_RULE] },
    optimization: { splitChunks: { cacheGroups: {} } },
    plugins: [],
  };
  nextConfig.webpack(config, { dev, isServer: true, defaultLoaders: { babel: {} }, webpack: {} });
  return (config.module as { rules: Rule[] }).rules;
}

function localeRule(dev: boolean): Rule {
  const rule = webpackRules(dev).find((r) => r.type === "asset/source");
  assert.ok(rule?.test instanceof RegExp, "webpack hook must add an asset/source rule");
  return rule;
}

test("webpack loads src/i18n/messages catalogs as raw text in dev and production", () => {
  for (const dev of [false, true]) {
    const rule = localeRule(dev);
    assert.ok(rule.test!.test(path.join(repoRoot, "src/i18n/messages/en.json")));
    assert.ok(rule.test!.test("C:\\repo\\src\\i18n\\messages\\zh-CN.json"));
    const loader = rule.use?.[0]?.loader ?? "";
    assert.equal(path.basename(loader), "localeMessagesLoader.cjs");
    assert.ok(fs.existsSync(loader), loader);
  }
});

test("the raw-text rule leaves every other JSON file alone", () => {
  const rule = localeRule(false);
  for (const file of [
    "src/i18n/global-error-messages/en.json",
    "src/i18n/routeNamespaces.generated.json",
    "src/i18n/messages/nested/en.json",
    "config/i18n.json",
    "package.json",
  ]) {
    assert.equal(rule.test!.test(path.join(repoRoot, file)), false, file);
  }
});

test("parseLocaleMessages accepts raw text (webpack) and parsed objects (Turbopack, Node)", () => {
  const raw = fs.readFileSync(path.join(repoRoot, "src/i18n/messages/de.json"), "utf-8");
  const parsed = JSON.parse(raw);
  assert.deepEqual(parseLocaleMessages(raw), parsed);
  assert.equal(parseLocaleMessages(parsed), parsed);
});

test("each locale catalog is imported and parsed once per process", async () => {
  const imported: string[] = [];
  const load = createLocaleMessagesLoader(async (locale) => {
    imported.push(locale);
    return JSON.stringify({ locale });
  });
  const de = await load("de");
  assert.deepEqual(de, { locale: "de" });
  assert.equal(await load("de"), de);
  assert.deepEqual(await load("en"), { locale: "en" });
  assert.deepEqual(imported, ["de", "en"]);
});

// End to end with the webpack Next bundles: a dynamic import of a catalog built
// with the hook's rules (after an earlier `json` rule) yields the file's text without the pretty-print
// whitespace, and parseLocaleMessages turns it back into the same messages
// object a `json` module would have produced. A malformed catalog still fails
// the build instead of failing at request time.
const { webpack } = requireFromRepo("next/dist/compiled/webpack/bundle5.js")();

type Stats = { hasErrors(): boolean; toString(): string };

async function compileCatalog(catalogText: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "locale-asset-source-"));
  const messagesDir = path.join(dir, "src/i18n/messages");
  fs.mkdirSync(messagesDir, { recursive: true });
  fs.writeFileSync(path.join(messagesDir, "de.json"), catalogText);
  fs.writeFileSync(
    path.join(dir, "src/i18n/entry.mjs"),
    "export const load = async (l) => (await import(`./messages/${l}.json`)).default;\n"
  );
  const outDir = path.join(dir, "out");
  // Every rule the config ends up with for a catalog path, in config order.
  const catalogRules = webpackRules(false).filter(
    (rule) => rule.test instanceof RegExp && rule.test.test(path.join(messagesDir, "de.json"))
  );
  const stats = await new Promise<Stats>((resolve, reject) =>
    webpack(
      {
        mode: "production",
        target: "node",
        context: dir,
        entry: "./src/i18n/entry.mjs",
        optimization: { minimize: false },
        output: { path: outDir, filename: "main.js", library: { type: "commonjs2" } },
        module: { rules: catalogRules },
      },
      (err: Error | null, result: Stats) => (err ? reject(err) : resolve(result))
    )
  );
  return { dir, outDir, stats };
}

test("a catalog compiled with the hook's rule round-trips through parseLocaleMessages", async () => {
  const catalog = { auth: { password: "Passwort", nested: { quote: 'say "hi"\n' } } };
  const { dir, outDir, stats } = await compileCatalog(JSON.stringify(catalog, null, 2));
  try {
    assert.equal(stats.hasErrors(), false, stats.toString());
    const bundle = createRequire(path.join(outDir, "main.js"))(path.join(outDir, "main.js"));
    const loaded = await bundle.load("de");
    assert.equal(loaded, JSON.stringify(catalog));
    assert.deepEqual(parseLocaleMessages(loaded), catalog);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a malformed catalog fails the webpack build", async () => {
  const { dir, stats } = await compileCatalog('{ "auth": { "password": "Passwort", } }');
  try {
    assert.equal(stats.hasErrors(), true);
    assert.match(stats.toString(), /de\.json/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
