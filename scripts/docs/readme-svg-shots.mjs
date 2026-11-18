// Render an SVG the way GitHub serves README images: through an <img> tag, from an HTTP
// response carrying the camo proxy's Content-Security-Policy and image/svg+xml content type.
// Captures a light and a dark frame (prefers-color-scheme) so embedded fonts and the in-file
// media query are judged under the same constraints the README will meet, and reports how
// many external font requests the page made (must be 0: camo blocks every external fetch).
//
//   node scripts/docs/readme-svg-shots.mjs <file.svg> <outdir> [--size WxH]
//   (the frame defaults to the file's own viewBox — 1200×548 for the hero, 1200×842 for the
//    budget card — so --size is only an override)
//
// Companion to the studio's svg-shots.mjs (multi-timestamp frames prove animation runs).
import { createServer } from "node:http";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import { chromium } from "playwright";

const [file, outdir] = process.argv.slice(2);
if (!file || !outdir) {
  console.error("usage: node scripts/docs/readme-svg-shots.mjs <file.svg> <outdir> [--size WxH]");
  process.exit(1);
}
mkdirSync(outdir, { recursive: true });
const svg = readFileSync(resolve(file));

// Frame size: --size WxH when given, otherwise the file's viewBox="0 0 W H".
const sizeArg = process.argv.indexOf("--size");
const viewBox = svg.toString("utf8").match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
if (sizeArg < 0 && !viewBox) {
  console.error(`no viewBox="0 0 W H" in ${file} — pass --size WxH`);
  process.exit(1);
}
const [W, H] =
  sizeArg > 0
    ? process.argv[sizeArg + 1].split("x").map(Number)
    : [Math.round(Number(viewBox[1])), Math.round(Number(viewBox[2]))];

// camo's observed response headers for SVG README images
const CAMO_CSP = "default-src 'none'; style-src 'unsafe-inline'; sandbox";
const server = createServer((req, res) => {
  if (req.url.startsWith("/asset.svg")) {
    res.writeHead(200, {
      "content-type": "image/svg+xml",
      "content-security-policy": CAMO_CSP,
      "x-content-type-options": "nosniff",
      "cache-control": "no-store",
    });
    res.end(svg);
    return;
  }
  const dark = req.url.includes("dark");
  res.writeHead(200, { "content-type": "text/html" });
  res.end(
    `<!doctype html><html><body style="margin:0;background:${dark ? "#0d1117" : "#ffffff"}">` +
      `<img src="/asset.svg?v=${Date.now()}" width="${W}" height="${H}"/></body></html>`
  );
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

const browser = await chromium.launch();
const results = [];
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({
      viewport: { width: W, height: H },
      colorScheme: scheme,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const fontRequests = [];
    page.on("request", (r) => {
      if (r.resourceType() === "font") fontRequests.push(r.url());
    });
    await page.goto(`http://127.0.0.1:${port}/page-${scheme}.html`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const out = resolve(outdir, `${basename(file, ".svg")}-camo-${scheme}.png`);
    await page.screenshot({ path: out });
    results.push({ scheme, out, externalFontRequests: fontRequests.length });
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(JSON.stringify({ csp: CAMO_CSP, results }, null, 1));
if (results.some((r) => r.externalFontRequests > 0)) {
  console.error("external font requests detected — the file would not render its type on GitHub");
  process.exit(1);
}
