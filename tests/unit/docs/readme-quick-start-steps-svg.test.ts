import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { SECURE_NODE_LINES } from "../../../bin/nodeRuntimeSupport.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";
import {
  buildQuickStartSteps,
  renderReadmeQuickStartSteps,
} from "../../../scripts/docs/gen-readme-quick-start-steps.mjs";

const path = "docs/diagrams/quick-start-steps.svg";

test(
  "quick-start-steps.svg matches its generator byte for byte",
  {
    skip: releaseOnlyUnlessTouched(path),
  },
  async () => {
    assert.equal(readFileSync(path, "utf8"), await renderReadmeQuickStartSteps());
  }
);

test("the first step lists the Node.js lines accepted by the CLI runtime policy", () => {
  const [beforeInstall] = buildQuickStartSteps();
  const nodeSupport = beforeInstall.lines[0][1];
  assert.deepEqual(
    [...nodeSupport.matchAll(/(\d+)\.x/g)].map(([, major]) => Number(major)),
    SECURE_NODE_LINES.map(({ major }: { major: number }) => major)
  );
  const floors = SECURE_NODE_LINES.filter(
    ({ minor, patch }: { minor: number; patch: number }) => minor !== 0 || patch !== 0
  );
  for (const { major, minor, patch } of floors) {
    assert.ok(nodeSupport.includes(`${major}.${minor}.${patch} and later ${major}.x`));
  }
});

test("the Quick Start SVG shows six numbered cards with outlined headings and embedded commands", async () => {
  const svg = await renderReadmeQuickStartSteps();
  const doc = new JSDOM(svg, { contentType: "image/svg+xml" }).window.document;
  const cards = [...doc.querySelectorAll(".quick-start-step")];
  assert.deepEqual(
    cards.map((card) => card.getAttribute("transform")),
    [
      "translate(32,32)",
      "translate(416,32)",
      "translate(800,32)",
      "translate(32,236)",
      "translate(416,236)",
      "translate(800,236)",
    ]
  );
  assert.deepEqual(
    cards.map((card) =>
      [...card.querySelectorAll('text.ol[y="42"], text.ol[y="41"], text.ol[y="86"]')].map(
        (t) => t.textContent
      )
    ),
    buildQuickStartSteps().map(({ place, title }, i) => [String(i + 1), place, title])
  );
  for (const card of cards) {
    assert.ok(card.querySelector("circle.surface-muted"));
    const stepNumber = card.querySelector("circle.surface-muted + g.h3");
    assert.ok(stepNumber);
    assert.equal(stepNumber.hasAttribute("style"), false, "the step number inherits the kit's ink");
  }
  assert.match(svg, /\.h3\{[^}]*fill:var\(--ink\)/);
  assert.doesNotMatch(svg, /var\(--ok(?:-bg)?\)/);
  assert.deepEqual(
    [...doc.querySelectorAll("text.mono")].map((t) => t.textContent),
    [
      "npm install -g omniroute",
      "omniroute",
      "omniroute configure codex",
      "omniroute run claude --model auto",
    ]
  );
  assert.match(svg, /@font-face\{font-family:"CI Mono"/);
  assert.match(svg, /<use href="#g[0-9a-z]+"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024);
});
