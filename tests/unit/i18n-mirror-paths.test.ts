import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  isRelativeReference,
  rebaseMirrorPaths,
  rebaseReference,
  rebasesMirrorOf,
} from "../../scripts/i18n/lib/mirror-paths.mjs";
import { rebaseMirrors } from "../../scripts/i18n/rebase-mirror-paths.mjs";

const repo = new Set([
  "README.md",
  "LICENSE",
  "docs",
  "docs/screenshots",
  "docs/screenshots/MainOmniRoute.png",
  "docs/diagrams",
  "docs/diagrams/readme-hero.svg",
  "docs/diagrams/readme-hero-dark.svg",
  "docs/assets",
  "docs/assets/flags",
  "docs/assets/flags/us.svg",
  "docs/guides",
  "docs/guides/USER_GUIDE.md",
  "docs/i18n",
  "docs/i18n/ja",
  "docs/i18n/ja/README.md",
  "docs/i18n/ar",
  "docs/i18n/ar/README.md",
  "contrib",
  "contrib/podman",
  "contrib/podman/README.md",
]);
const ctx = {
  sourceRel: "README.md",
  mirrorRel: "docs/i18n/ja/README.md",
  exists: (p: string) => repo.has(p),
};

test("isRelativeReference accepts only path references", () => {
  for (const url of ["./docs/a.png", "docs/a.png", "LICENSE", "../x.md", "a.md#top"]) {
    assert.equal(isRelativeReference(url), true, url);
  }
  for (const url of [
    "https://x.io/a.png",
    "mailto:a@b.c",
    "data:image/png;base64,AA",
    "//cdn.x/a.png",
    "/docs/a.png",
    "#anchor",
    "?q=1",
    "",
  ]) {
    assert.equal(isRelativeReference(url), false, url);
  }
});

test("only mirrors of root-level sources are rebased", () => {
  assert.equal(rebasesMirrorOf("README.md"), true);
  assert.equal(rebasesMirrorOf("CHANGELOG.md"), true);
  assert.equal(rebasesMirrorOf("docs/guides/USER_GUIDE.md"), false);
});

test("a root README image is rebased from docs/i18n/<locale>/", () => {
  assert.equal(
    rebaseReference("./docs/screenshots/MainOmniRoute.png", ctx),
    "../../screenshots/MainOmniRoute.png"
  );
  assert.equal(rebaseReference("docs/assets/flags/us.svg", ctx), "../../assets/flags/us.svg");
  assert.equal(rebaseReference("LICENSE", ctx), "../../../LICENSE");
});

test("anchors, queries, directories and <…> destinations keep their shape", () => {
  assert.equal(
    rebaseReference("contrib/podman/README.md#data-directory", ctx),
    "../../../contrib/podman/README.md#data-directory"
  );
  assert.equal(
    rebaseReference("docs/guides/USER_GUIDE.md?plain=1", ctx),
    "../../guides/USER_GUIDE.md?plain=1"
  );
  assert.equal(rebaseReference("contrib/podman/", ctx), "../../../contrib/podman/");
  assert.equal(rebaseReference("<docs/guides/USER_GUIDE.md>", ctx), "<../../guides/USER_GUIDE.md>");
});

test("a peer mirror link written from the root is rebased sideways", () => {
  assert.equal(rebaseReference("docs/i18n/ar/README.md", ctx), "../ar/README.md");
});

test("references that already resolve from the mirror, or resolve nowhere, are left alone", () => {
  // the language bar and anything a translator already fixed
  assert.equal(rebaseReference("../../../README.md", ctx), "../../../README.md");
  assert.equal(rebaseReference("../ar/README.md", ctx), "../ar/README.md");
  // broken in the source too: no path is invented
  assert.equal(rebaseReference("docs/missing.png", ctx), "docs/missing.png");
  // non-relative
  assert.equal(rebaseReference("https://x.io/docs/a.png", ctx), "https://x.io/docs/a.png");
});

test("rebaseMirrorPaths covers markdown links, images, HTML attributes, srcset and reference definitions", () => {
  const input = [
    "🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md)",
    "",
    '<img src="./docs/diagrams/readme-hero.svg" alt="hero" width="100%">',
    '<source media="(prefers-color-scheme: dark)" srcset="./docs/diagrams/readme-hero-dark.svg 1x, ./docs/diagrams/readme-hero.svg 2x">',
    '<a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/us.svg"></a>',
    '![screenshot](./docs/screenshots/MainOmniRoute.png) and [license](LICENSE "MIT")',
    "[guide]: docs/guides/USER_GUIDE.md",
  ].join("\n");
  const expected = [
    "🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md)",
    "",
    '<img src="../../diagrams/readme-hero.svg" alt="hero" width="100%">',
    '<source media="(prefers-color-scheme: dark)" srcset="../../diagrams/readme-hero-dark.svg 1x, ../../diagrams/readme-hero.svg 2x">',
    '<a href="../ar/README.md"><img src="../../assets/flags/us.svg"></a>',
    '![screenshot](../../screenshots/MainOmniRoute.png) and [license](../../../LICENSE "MIT")',
    "[guide]: ../../guides/USER_GUIDE.md",
  ].join("\n");
  assert.equal(rebaseMirrorPaths(input, ctx), expected);
});

test("rebaseMirrorPaths never touches fenced code or inline code", () => {
  const input = [
    "Run `cat ./docs/screenshots/MainOmniRoute.png` then see ![x](./docs/screenshots/MainOmniRoute.png).",
    "```html",
    '<img src="./docs/screenshots/MainOmniRoute.png">',
    "```",
    "~~~",
    "[link](LICENSE)",
    "~~~",
  ].join("\n");
  const out = rebaseMirrorPaths(input, ctx).split("\n");
  assert.equal(
    out[0],
    "Run `cat ./docs/screenshots/MainOmniRoute.png` then see ![x](../../screenshots/MainOmniRoute.png)."
  );
  assert.deepEqual(out.slice(1), input.split("\n").slice(1));
});

test("rebaseMirrorPaths is idempotent", () => {
  const input =
    '<img src="./docs/diagrams/readme-hero.svg"> ![s](docs/screenshots/MainOmniRoute.png)';
  const once = rebaseMirrorPaths(input, ctx);
  assert.notEqual(once, input);
  assert.equal(rebaseMirrorPaths(once, ctx), once);
});

test("rebaseMirrors repairs mirrors of root sources and skips mirrors of docs pages", async () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "mirror-paths-"));
  try {
    const write = (rel: string, text: string) => {
      mkdirSync(path.join(root, path.dirname(rel)), { recursive: true });
      writeFileSync(path.join(root, rel), text, "utf8");
    };
    const served = "docs/i18n/ja/docs/guides/USER_GUIDE.md";
    write("docs/i18n/ja/README.md", "![s](./docs/screenshots/MainOmniRoute.png)\n");
    write(served, "![s](../screenshots/MainOmniRoute.png)\n");
    const exists = (p: string) => repo.has(p) || p === "docs/i18n/ja/docs/guides/USER_GUIDE.md";
    const changed = await rebaseMirrors(["docs/i18n/ja/README.md", served], { root, exists });
    assert.deepEqual(changed, ["docs/i18n/ja/README.md"]);
    assert.equal(
      readFileSync(path.join(root, "docs/i18n/ja/README.md"), "utf8"),
      "![s](../../screenshots/MainOmniRoute.png)\n"
    );
    assert.equal(
      readFileSync(path.join(root, served), "utf8"),
      "![s](../screenshots/MainOmniRoute.png)\n"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
