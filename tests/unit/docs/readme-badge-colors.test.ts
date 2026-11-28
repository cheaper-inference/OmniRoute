import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { recolorMarkdown } from "../../../scripts/docs/apply-readme-badge-colors.mjs";

test("root badge recoloring preserves Markdown, HTML, static badge paths, and URL encoding", () => {
  const before = [
    "[![Docker](https://img.shields.io/docker/v/cheaperinference/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/cheaperinference/omniroute)",
    '<img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square&labelColor=black" alt="License: MIT"/>',
    "![Other](https://example.com/badge.svg?color=blue)",
  ].join("\n");
  const expected = before
    .replace("color=2496ED", "color=e5ac82&labelColor=20211c")
    .replace("labelColor=black", "color=e5ac82&labelColor=20211c");

  const result = recolorMarkdown(before, { allBadges: true });
  assert.equal(result.changedLines, 2);
  assert.equal(result.text, expected);
  assert.equal(recolorMarkdown(expected, { allBadges: true }).changedLines, 0);
});

test("mirror recoloring recognizes the legacy star counter and targets only header badges", () => {
  const starsPath = "github/stars/diegosouzapw/OmniRoute";
  const stars = `![Estrelas](https://img.shields.io/${starsPath}?style=social)`;
  const npm = "![Versão](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)";
  const result = recolorMarkdown(`${stars}\n${npm}`);
  assert.equal(result.changedLines, 1);
  assert.deepEqual(result.found, [starsPath]);
  assert.equal(
    result.text,
    `![Estrelas](https://img.shields.io/${starsPath}?style=flat&logo=github&logoColor=white&label=Stars&color=e5ac82&labelColor=20211c)\n${npm}`
  );
});

test("the Open Source Friends tags keep each partner's own colors", () => {
  const friends = [
    '<img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="x"/>',
    '<img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="y"/>',
  ].join("\n");
  const result = recolorMarkdown(friends, { allBadges: true });
  assert.equal(result.changedLines, 0);
  assert.equal(result.text, friends);
});

test("every Shields.io badge in the root README uses the Editions palette, partner tags aside", () => {
  const readme = readFileSync("README.md", "utf8");
  const result = recolorMarkdown(readme, { allBadges: true });
  assert.equal(new Set(result.found).size, 8);
  assert.equal(result.text, readme);
});
