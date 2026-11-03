import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { README_DIAGRAMS } from "../../../scripts/docs/gen-readme-diagrams.mjs";
import {
  DRAWN_SYMBOLS,
  captureTextBoxes,
  compactPath,
  drawnSymbol,
  measureText,
  outlineSvg,
} from "../../../scripts/docs/readme-outline.mjs";

// The shared last step of every README diagram: Switzer becomes outlines (its licence forbids
// embedding it in any form, packages/ui-kit/src/fonts/FFL.txt), code stays real text on the mono
// subset, and every string stays in the file as invisible text.

const svgWith = (css: string, body: string) =>
  `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><style>\n${css}\n</style>${body}</svg>\n`;

const parse = (svg: string) =>
  new JSDOM(svg, { contentType: "image/svg+xml" }).window.document as unknown as Document;

const groups = (doc: Document) => [...doc.querySelectorAll("g[transform]")] as Element[];

const translateX = (el: Element) =>
  Number(el.getAttribute("transform")?.match(/^translate\((-?[\d.]+) /)?.[1]);

const close = (actual: number, expected: number, what: string) =>
  assert.ok(Math.abs(actual - expected) < 0.02, `${what}: ${actual} vs ${expected}`);

const ROLE = ".t{font-weight:500;font-size:20px;fill:var(--ink)}";

test("a Switzer role becomes outlines; the string stays as invisible text and the fill as a class", async () => {
  const doc = parse(
    await outlineSvg(svgWith(ROLE, `<text x="10" y="50" class="t">Route 380</text>`))
  );
  const [group] = groups(doc);
  assert.equal(group.getAttribute("class"), "t");
  assert.match(group.getAttribute("transform") ?? "", /^translate\(10 50\) scale\(\.02 -\.02\)$/);
  assert.equal(group.querySelectorAll("use").length, 8, "eight glyphs, the space draws nothing");
  const text = doc.querySelector("text");
  assert.equal(text?.textContent, "Route 380");
  assert.equal(text?.getAttribute("class"), "ol");
  assert.match(doc.querySelector("style")?.textContent ?? "", /\.ol\{fill-opacity:0\}/);
});

test("glyphs share one definition per weight", async () => {
  const doc = parse(
    await outlineSvg(
      svgWith(
        `${ROLE}.w{font-weight:600;font-size:20px}`,
        `<text class="t">aaa</text><text class="w">aaa</text>`
      )
    )
  );
  assert.equal(doc.querySelectorAll("defs path").length, 2, "one a per weight");
  assert.equal(doc.querySelectorAll("use").length, 6);
});

test("text-anchor moves the run by its real width", async () => {
  const width = measureText("Provider", { size: 20, weight: 500 });
  for (const [anchor, left] of [
    ["start", 200],
    ["middle", 200 - width / 2],
    ["end", 200 - width],
  ] as const) {
    const doc = parse(
      await outlineSvg(
        svgWith(ROLE, `<text x="200" y="50" class="t" text-anchor="${anchor}">Provider</text>`)
      )
    );
    close(translateX(groups(doc)[0]), left, anchor);
  }
  const inherited = parse(
    await outlineSvg(
      svgWith(ROLE, `<g text-anchor="end"><text x="200" y="50" class="t">Provider</text></g>`)
    )
  );
  close(translateX(groups(inherited)[0]), 200 - width, "anchor inherited from the parent");
});

test("letter-spacing in em and px spreads the glyphs, and a tracked end anchor keeps its edge", async () => {
  const useX = (doc: Document) =>
    [...doc.querySelectorAll("use")].map((u) => Number(u.getAttribute("x") ?? 0));
  const plain = useX(parse(await outlineSvg(svgWith(ROLE, `<text class="t">HH</text>`))));
  const em = useX(
    parse(
      await outlineSvg(svgWith(`${ROLE}.s{letter-spacing:0.1em}`, `<text class="t s">HH</text>`))
    )
  );
  const pixels = useX(
    parse(await outlineSvg(svgWith(`${ROLE}.s{letter-spacing:2px}`, `<text class="t s">HH</text>`)))
  );
  // 0.1em at 20px = 2px; at .02 scale that is 100 font units
  assert.equal(em[1] - plain[1], 100);
  assert.equal(pixels[1] - plain[1], 100);
  const width = measureText("HH", { size: 20, weight: 500, tracking: 2 });
  const end = parse(
    await outlineSvg(
      svgWith(
        `${ROLE}.s{letter-spacing:2px}`,
        `<text x="100" class="t s" text-anchor="end">HH</text>`
      )
    )
  );
  close(translateX(groups(end)[0]), 100 - width, "no trailing letter-spacing past the edge");
});

test("a tspan is its own run: weight, colour and size are honoured and the advance carries across", async () => {
  const doc = parse(
    await outlineSvg(
      svgWith(
        `${ROLE}.b{font-weight:600}.big{font-size:40px}`,
        `<text x="10" y="50" class="t">One <tspan class="b" style="fill:var(--ok)">Two</tspan> Three<tspan class="big">!</tspan></text>`
      )
    )
  );
  const runs = groups(doc);
  assert.equal(runs.length, 4);
  const w = (s: string, weight: number) => measureText(s, { size: 20, weight });
  close(translateX(runs[1]), 10 + w("One ", 500), "second run starts after the first");
  close(translateX(runs[2]), 10 + w("One ", 500) + w("Two", 600), "third after the second");
  assert.match(runs[1].getAttribute("style") ?? "", /fill:var\(--ok\)/);
  assert.match(runs[3].getAttribute("transform") ?? "", /scale\(\.04 -\.04\)/);
  assert.equal(doc.querySelector("text")?.textContent, "One Two Three!");
});

test("the cascade is the browser's: inline style > class rule > presentation attribute > parent", async () => {
  const scale = async (css: string, body: string) =>
    groups(parse(await outlineSvg(svgWith(css, body))))[0]
      .getAttribute("transform")
      ?.match(/scale\((\.\d+)/)?.[1];
  const s = ".a{font-size:10px;font-weight:400}.b{font-size:20px}";
  assert.equal(
    await scale(s, `<text class="a b" font-size="30">x</text>`),
    ".02",
    "last rule wins"
  );
  assert.equal(
    await scale(s, `<text class="a" font-size="30">x</text>`),
    ".01",
    "rule beats attribute"
  );
  assert.equal(
    await scale(s, `<text class="a" style="font-size:40px">x</text>`),
    ".04",
    "style wins"
  );
  assert.equal(
    await scale(s, `<text font-size="30" font-weight="500">x</text>`),
    ".03",
    "attribute"
  );
  assert.equal(
    await scale(s, `<g class="b"><text font-weight="500">x</text></g>`),
    ".02",
    "parent"
  );
});

test("whitespace collapses across runs the way SVG text does", async () => {
  const doc = parse(
    await outlineSvg(svgWith(ROLE, `<text class="t">  a  b <tspan>  c</tspan>  </text>`))
  );
  // a, b, c: the spaces between them are in the advance, not in the uses
  assert.equal(doc.querySelectorAll("use").length, 3);
  const w = measureText("a b ", { size: 20, weight: 500 });
  close(translateX(groups(doc)[1]), w, "one space before c, however many were written");
});

test("animations and opacity move onto the outline, so a fade still fades the drawing", async () => {
  const doc = parse(
    await outlineSvg(
      svgWith(
        ROLE,
        `<text class="t" opacity="0">Fade<animate attributeName="opacity" values="0;1" dur="1s"/></text>`
      )
    )
  );
  const [group] = groups(doc);
  assert.equal(group.getAttribute("opacity"), "0");
  assert.equal(group.querySelector("animate")?.getAttribute("attributeName"), "opacity");
  assert.equal(doc.querySelector("text animate"), null);
});

test("code text stays real text on the embedded mono subset, and only then is a font embedded", async () => {
  const mono = `.c{font-family: "CI Mono", monospace;font-weight:500;font-size:13px}`;
  const withCode = await outlineSvg(
    svgWith(`${ROLE}${mono}`, `<text class="t">x</text><text class="c">npm i</text>`)
  );
  const doc = parse(withCode);
  assert.equal((withCode.match(/@font-face/g) || []).length, 1);
  assert.ok(withCode.includes('font-family:"CI Mono"'));
  const code = [...doc.querySelectorAll("text")].find((t) => t.getAttribute("class") === "c");
  assert.equal(code?.textContent, "npm i");
  const without = await outlineSvg(svgWith(`${ROLE}${mono}`, `<text class="t">x</text>`));
  assert.doesNotMatch(without, /@font-face/);
  assert.doesNotMatch(without, /CI Mono/, "an unused code rule leaves the stylesheet");
  await assert.rejects(
    outlineSvg(svgWith(mono, `<text class="c">●</text>`)),
    /not in the embedded CI Mono subset/
  );
});

test("the finished stylesheet carries no font declarations for drawn text", async () => {
  const svg = await outlineSvg(svgWith(`${ROLE}.gone{font-size:9px}`, `<text class="t">x</text>`));
  const style = parse(svg).querySelector("style")?.textContent ?? "";
  assert.match(style, /\.t\{fill:var\(--ink\)\}/);
  assert.doesNotMatch(style, /font-|\.gone/);
});

test("the Switzer metrics are real, not a monospace guess", () => {
  const i = measureText("iiii", { size: 20, weight: 500 });
  const w = measureText("wwww", { size: 20, weight: 500 });
  assert.ok(w > i * 2, `proportional: ${w} vs ${i}`);
  assert.ok(
    measureText("Route", { size: 20, weight: 600 }) >
      measureText("Route", { size: 20, weight: 400 }),
    "the wght axis is applied"
  );
  assert.equal(
    measureText("a  b", { size: 20, weight: 500 }),
    measureText("a b", { size: 20, weight: 500 })
  );
});

test("it fails loudly on what it cannot draw faithfully", async () => {
  await assert.rejects(
    outlineSvg(svgWith(ROLE, `<text class="t">★</text>`)),
    /no glyph for U\+2605/
  );
  await assert.rejects(
    outlineSvg(svgWith(".t{font-weight:700;font-size:20px}", `<text class="t">x</text>`)),
    /weight 700 is not one of 400\/500\/600/
  );
  await assert.rejects(
    outlineSvg(svgWith(".t{fill:red}", `<text class="t">x</text>`)),
    /no font-size/
  );
  await assert.rejects(
    outlineSvg(svgWith(ROLE, `<text class="t" textLength="90">x</text>`)),
    /textLength.*not supported/
  );
  await assert.rejects(
    outlineSvg(svgWith(ROLE, `<text class="t"><tspan dy="4">x</tspan></text>`)),
    /dy.*not supported/
  );
  await assert.rejects(outlineSvg("<svg xmlns='http://www.w3.org/2000/svg'/>"), /no <style>/);
});

test("every symbol Switzer lacks is drawn, with spacing, in every weight the kit has", async () => {
  assert.deepEqual([...DRAWN_SYMBOLS].sort(), [..."→←↔↑↓●○◒✓▮ⁿ"].sort());
  for (const char of DRAWN_SYMBOLS) {
    for (const weight of [400, 500, 600]) {
      const { d, advance } = drawnSymbol(char, weight);
      assert.ok(advance > 0, `${char} advances`);
      assert.match(d, /^M/, `${char} has a path`);
      assert.match(d, /z$/, `${char} is closed`);
    }
    const doc = parse(await outlineSvg(svgWith(ROLE, `<text class="t">a${char}b</text>`)));
    assert.equal(doc.querySelectorAll("use").length, 3, `${char} is drawn in the run`);
    const use = [...doc.querySelectorAll("use")].map((u) => Number(u.getAttribute("x") ?? 0));
    assert.ok(use[2] - use[1] >= drawnSymbol(char, 500).advance, `${char} takes up its advance`);
  }
  assert.throws(() => drawnSymbol("a"), /no drawn symbol/);
  const weights = [400, 600].map((w) => drawnSymbol("→", w).d);
  assert.notEqual(weights[0], weights[1], "the stroke follows the weight");
});

test("compactPath writes integer relative commands without letting rounding drift", () => {
  assert.equal(compactPath("M0.4,0.4L10.6,0.4L10.6,20.2L0.4,0.4Z"), "M0 0h11v20l-11-20z");
  assert.equal(compactPath("M0 0Q10.2 5 20 0Q30 5.1 40 0Z"), "M0 0q10 5 20 0 10 5 20 0z");
  assert.equal(
    compactPath("M0 0L1 1", (x, y) => [x * 10, y * 10 + 5]),
    "M0 5l10 10"
  );
  assert.throws(() => compactPath("M0 0Q1 1"), /malformed path/);
});

test("same input, same bytes", async () => {
  const input = svgWith(ROLE, `<text x="1" class="t">Determinism → <tspan>tspan</tspan></text>`);
  assert.equal(await outlineSvg(input), await outlineSvg(input));
});

// --- the twelve committed diagrams ---------------------------------------------------------------

type Diagram = { name: string; out: string; render: () => Promise<string> };

for (const { name, out, render } of README_DIAGRAMS as Diagram[]) {
  test(`${name}: Switzer is outlines only, never a font in the file`, () => {
    const svg = readFileSync(out, "utf8");
    const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
    assert.doesNotMatch(style, /Switzer/, "no rule may name Switzer: it is drawn, not embedded");
    assert.doesNotMatch(style, /CI Serif|CI Sans/, "the old faces are gone");
    const faces = [...svg.matchAll(/@font-face\{font-family:"([^"]+)"/g)].map((m) => m[1]);
    assert.ok(faces.length <= 1, `at most the mono subset, got ${faces.join(", ")}`);
    for (const f of faces) assert.equal(f, "CI Mono");
    const dataUris = svg.match(/data:[a-z-]+\/[a-z0-9.+-]+/g) ?? [];
    assert.equal(dataUris.length, faces.length, "the mono subset is the only data: URI");
    for (const uri of dataUris) assert.equal(uri, "data:font/woff2");
  });

  test(`${name}: nothing visible is non-code text, and the invisible text is all there`, () => {
    const svg = readFileSync(out, "utf8");
    const doc = parse(svg);
    const css = doc.querySelector("style")?.textContent ?? "";
    const codeClasses = new Set(
      [...css.matchAll(/\.([\w-]+)\{[^}]*font-family[^}]*\}/g)].map((m) => m[1])
    );
    let invisible = 0;
    for (const text of doc.querySelectorAll("text")) {
      const classes = (text.getAttribute("class") ?? "").split(/\s+/);
      if (classes.includes("ol")) {
        invisible += 1;
        assert.ok(text.textContent?.trim(), "invisible text keeps its string");
        assert.equal(text.children.length, 0, "and nothing else");
        continue;
      }
      let code = false;
      for (let e: Element | null = text; e; e = e.parentElement) {
        for (const c of (e.getAttribute("class") ?? "").split(/\s+/)) {
          if (codeClasses.has(c)) code = true;
        }
      }
      assert.ok(code, `visible non-code text: "${text.textContent?.slice(0, 40)}"`);
    }
    if (name !== "cli-terminal") {
      assert.ok(invisible > 0, "outlined strings stay in the file");
      assert.match(css, /\.ol\{fill-opacity:0\}/);
    }
  });

  test(`${name}: every outline reference resolves and every definition is used`, () => {
    const svg = readFileSync(out, "utf8");
    const doc = parse(svg);
    const defined = new Set(
      [...doc.querySelectorAll("defs > path[id^='g']")].map((p) => p.getAttribute("id"))
    );
    const used = new Set(
      [...doc.querySelectorAll("use")]
        .map((u) => u.getAttribute("href")?.slice(1))
        .filter((id) => id && /^g[0-9a-z]+$/.test(id))
    );
    for (const id of used) assert.ok(defined.has(id as string), `#${id} has no definition`);
    for (const id of defined) assert.ok(used.has(id as string), `#${id} is never used`);
    if (name !== "cli-terminal") assert.ok(used.size > 0, "outlines present");
    assert.ok(Buffer.byteLength(svg) < 200 * 1024, "under the 200 KB studio target");
  });

  test(`${name}: real metrics: the outlined text stays on the canvas and no two strings collide`, async () => {
    const svg = readFileSync(out, "utf8");
    const [, canvasW, canvasH] = svg.match(/viewBox="0 0 (\d+) (\d+)"/) as RegExpMatchArray;
    const boxes = await captureTextBoxes(render);
    for (const b of boxes) {
      assert.ok(
        b.left >= 0 && b.right <= Number(canvasW) && b.top >= 0 && b.bottom <= Number(canvasH),
        `"${b.text}" leaves the ${canvasW}x${canvasH} canvas: ${JSON.stringify(b)}`
      );
    }
    // Stacked copies of one string are how SMIL cross-fades a colour, not a collision.
    const collisions = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const [a, b] = [boxes[i], boxes[j]];
        if (a.text === b.text) continue;
        if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) {
          collisions.push(`"${a.text}" × "${b.text}"`);
        }
      }
    }
    assert.deepEqual(collisions, []);
  });
}
