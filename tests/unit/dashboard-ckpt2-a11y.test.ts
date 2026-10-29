import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// F4 (KEA-7886): axe/console findings of the wave-2/3 checkpoint smoke on routes F4-B touched
// (`_tasks/reports/uikit/wave2-checkpoint.md` §6 items 3, 4, 7, 8, 11).
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("console log timestamps and ids use the terminal's readable gray (§6.3, 17 contrast nodes)", () => {
  const src = read("src/shared/components/ConsoleLogViewer.tsx");
  assert.doesNotMatch(src, /#484f58/i); // 2.4:1 on #0d1117; #8b949e is ≈ 6:1
  // Positive pins (review M-6): timestamp and correlation-id spans carry the readable gray.
  assert.match(src, /<span className="text-\[#8b949e\] whitespace-nowrap shrink-0 select-none">/);
  assert.match(src, /<span className="text-\[#8b949e\] ml-2">cid:/);
  assert.doesNotMatch(src, /mt-1 opacity-60">\{tv\("emptyFileLoggingHint"\)/);
});

test("context engine rows are not dimmed with a list-wide opacity (§6.4, 19 contrast nodes)", () => {
  assert.doesNotMatch(
    read("src/app/(dashboard)/dashboard/context/settings/CompressionPanel.tsx"),
    /divide-y divide-border \$\{config\.enabled \? "" : "opacity-60"\}/
  );
  // Positive pin (review M-6): the list states "off" through data-disabled, not through opacity.
  const panel = read("src/app/(dashboard)/dashboard/context/settings/CompressionPanel.tsx");
  assert.match(
    panel,
    /className="divide-y divide-border"\s+data-disabled=\{config\.enabled \? undefined : "true"\}/
  );
});

test("the caveman prompt preview is a focusable scroll region (§6.7)", () => {
  assert.match(
    read("src/app/(dashboard)/dashboard/context/caveman/CavemanContextPageClient.tsx"),
    /<pre\s[^>]*tabIndex=\{0\}[^>]*overflow-auto/
  );
});

test("the inline Settings → Routing link on acp-agents is underlined (§6.8 link-in-text-block)", () => {
  assert.match(
    read("src/app/(dashboard)/dashboard/acp-agents/page.tsx"),
    /href="\/dashboard\/settings\?tab=routing" className="text-primary underline"/
  );
});

test("MCP/A2A step messages pass nodes, not functions, to their ICU {code} arguments (§6.11)", () => {
  // The en messages use `{code}` arguments (not `<code>` tags); a function value there renders as
  // "Functions are not valid as a React child".
  const en = JSON.parse(read("src/i18n/messages/en.json"));
  assert.match(en.mcpDashboard.mcpStep1, /\{code\}/);
  assert.match(en.a2aDashboard.a2aStep1, /\{code\}/);
  for (const page of ["mcp", "a2a"]) {
    assert.doesNotMatch(
      read(`src/app/(dashboard)/dashboard/${page}/page.tsx`),
      /code\d?: \(chunks\) =>/,
      `${page}/page.tsx`
    );
  }
});
