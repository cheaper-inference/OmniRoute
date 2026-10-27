import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// F4 (KEA-7886, lote 7 pendência 12): six lote-7 pages had no page title of their own — only the
// shell top bar, which is hidden below lg and now hides itself next to a PageHeader. Each page
// renders a kit PageHeader titled like its sidebar entry (same keys the shell title used).
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const PAGES: Array<[string, string, string]> = [
  ["src/app/(dashboard)/dashboard/memory/page.tsx", "memory", "memorySubtitle"],
  ["src/app/(dashboard)/dashboard/mcp/page.tsx", "mcp", "mcpSubtitle"],
  ["src/app/(dashboard)/dashboard/a2a/page.tsx", "a2a", "a2aSubtitle"],
  ["src/app/(dashboard)/dashboard/cloud-agents/page.tsx", "cloudAgents", "cloudAgentsSubtitle"],
  [
    "src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient.tsx",
    "agentSkills",
    "agentSkillsSubtitle",
  ],
  [
    "src/app/(dashboard)/dashboard/omni-skills/OmniSkillsPageClient.tsx",
    "omniSkills",
    "omniSkillsSubtitle",
  ],
];

test("the six lote-7 pages render a kit PageHeader with their sidebar title", () => {
  for (const [file, title, subtitle] of PAGES) {
    const src = fs.readFileSync(path.join(ROOT, file), "utf8");
    assert.match(src, /from "@omniroute\/ui-kit\/page-header"/, `${file}: PageHeader import`);
    assert.match(
      src,
      new RegExp(
        `<PageHeader[\\s\\S]{0,80}title=\\{tSidebar\\("${title}"\\)\\}[\\s\\S]{0,80}description=\\{tSidebar\\("${subtitle}"\\)\\}`
      ),
      `${file}: <PageHeader title=sidebar.${title} description=sidebar.${subtitle}>`
    );
  }
});

test("the sidebar title keys exist in en, pt-BR and vi", () => {
  for (const locale of ["en", "pt-BR", "vi"]) {
    const sidebar = JSON.parse(
      fs.readFileSync(path.join(ROOT, `src/i18n/messages/${locale}.json`), "utf8")
    ).sidebar;
    for (const [, title, subtitle] of PAGES) {
      assert.equal(typeof sidebar[title], "string", `${locale} sidebar.${title}`);
      assert.equal(typeof sidebar[subtitle], "string", `${locale} sidebar.${subtitle}`);
    }
  }
});
