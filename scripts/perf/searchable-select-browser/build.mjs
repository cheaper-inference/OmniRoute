import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import tailwind from "@tailwindcss/postcss";
import { build } from "esbuild";
import postcss from "postcss";

const execFileAsync = promisify(execFile);
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const generated = path.join(repoRoot, ".build/searchable-select-browser");
const out = path.join(generated, "dist");
const componentPath = "src/shared/components/SearchableSelectField.tsx";
const baselineRef = process.env.FIXTURE_BASELINE;
const plugins = [];
let baselineCommit = null;

// Resolve the supplied ref to a commit before reading it. Git runs without a shell,
// and neither the index nor the working tree is changed by the baseline build.
if (baselineRef) {
  const { stdout: commit } = await execFileAsync(
    "git",
    ["rev-parse", "--verify", "--end-of-options", `${baselineRef}^{commit}`],
    { cwd: repoRoot }
  );
  baselineCommit = commit.trim();
  const { stdout: source } = await execFileAsync(
    "git",
    ["show", `${baselineCommit}:${componentPath}`],
    { cwd: repoRoot }
  );
  plugins.push({
    name: "baseline",
    setup(builder) {
      builder.onResolve({ filter: /^@\/shared\/components\/SearchableSelectField$/ }, () => ({
        path: componentPath,
        namespace: "fixture-baseline",
      }));
      builder.onLoad({ filter: /.*/, namespace: "fixture-baseline" }, () => ({
        contents: source,
        loader: "tsx",
        resolveDir: path.join(repoRoot, path.dirname(componentPath)),
      }));
    },
  });
}

await mkdir(out, { recursive: true });
await mkdir(path.join(generated, ".openai"), { recursive: true });
await build({
  absWorkingDir: repoRoot,
  entryPoints: ["scripts/perf/searchable-select-browser/fixture.tsx"],
  bundle: true,
  minify: true,
  format: "esm",
  outdir: out,
  define: { "process.env.NODE_ENV": '"production"' },
  jsx: "automatic",
  tsconfig: "tsconfig.json",
  plugins,
  logLevel: "warning",
});
const cssFile = path.join(repoRoot, "src/app/globals.css");
const result = await postcss([tailwind()]).process(await readFile(cssFile, "utf8"), {
  from: cssFile,
});
const compiledCss = path.join(generated, "compiled.css");
await writeFile(compiledCss, result.css);
await build({
  absWorkingDir: repoRoot,
  entryPoints: [compiledCss],
  bundle: true,
  minify: true,
  outdir: out,
  loader: { ".woff2": "file", ".woff": "file", ".ttf": "file", ".svg": "file" },
  logLevel: "warning",
});
await writeFile(
  path.join(out, "frame.html"),
  '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Search selector browser QA</title><link rel="stylesheet" href="compiled.css"></head><body><div id="root"></div><script type="module" src="fixture.js"></script></body></html>'
);
await writeFile(
  path.join(out, "index.html"),
  '<!doctype html><html><head><meta charset="utf-8"><title>Search selector QA</title></head><body style="margin:0;background:#777"><nav style="padding:8px;background:#eee;font-family:sans-serif"><a href="?viewport=desktop&locale=en&theme=light">EN desktop light</a> | <a href="?viewport=desktop&locale=en&theme=dark">EN desktop dark</a> | <a href="?viewport=desktop&locale=fa&theme=light">FA desktop light</a> | <a href="?viewport=desktop&locale=fa&theme=dark">FA desktop dark</a> | <a href="?viewport=mobile&locale=en&theme=light">EN mobile light</a> | <a href="?viewport=mobile&locale=en&theme=dark">EN mobile dark</a> | <a href="?viewport=mobile&locale=fa&theme=light">FA mobile light</a> | <a href="?viewport=mobile&locale=fa&theme=dark">FA mobile dark</a></nav><iframe title="App acceptance fixture" style="display:block;border:0"></iframe><script>const p=new URLSearchParams(location.search), f=document.querySelector("iframe");f.width=p.get("viewport")==="mobile"?390:1280;f.height=p.get("viewport")==="mobile"?844:800;f.src="frame.html?"+p;</script></body></html>'
);
const { stdout: head } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoRoot });
await writeFile(
  path.join(out, "fixture-source.json"),
  JSON.stringify(
    { worktreeHead: head.trim(), componentPath, baselineRef: baselineRef || null, baselineCommit },
    null,
    2
  ) + "\n"
);
await writeFile(
  path.join(generated, ".openai/hosting.json"),
  JSON.stringify({ static: { directory: "dist" } }) + "\n"
);
console.log(
  "Built actual-component browser fixture",
  out,
  baselineCommit ? `(selector baseline: ${baselineCommit})` : "(working-tree selector)"
);
