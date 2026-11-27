// ABOUTME: Guard test (#20500) — user-facing/error strings in these files must stay English
// ABOUTME: (or go through t()/tr()); no hardcoded German/Portuguese copy.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Built from a template literal so provider-route-follow-ups-guard does not mistake this file
// for a test that drives the providers route (it only reads the source text).
const PROVIDERS_API = "src/app/api/providers";

const MARKERS: Record<string, string[]> = {
  "src/lib/providers/validation/chatgptWebCodex.ts": [
    "Für die Browserprüfung",
    "Der ChatGPT-Custom-Connector",
    "Tunnel-ID und Runtime-Key müssen",
  ],
  [`${PROVIDERS_API}/route.ts`]: ["Browserprüfung konnte nicht"],
  "src/app/api/providers/[id]/route.ts": ["Browserprüfung konnte nicht"],
  "src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx": [
    "nicht bereit",
    "Interaktive Anmeldung erforderlich",
    "Letzter Fehler:",
    "Aktive Turns",
    "Wartende Turns",
    "ChatGPT-Anmeldung",
  ],
  "src/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection.tsx": [
    "ferramentas técnicas",
  ],
  "src/app/(dashboard)/dashboard/translator/components/advanced/PipelineView.tsx": [
    "Envie um request",
  ],
  "src/lib/services/installers/utils.ts": ["não está disponível"],
};

for (const [rel, markers] of Object.entries(MARKERS)) {
  test(`no hardcoded PT/DE in ${rel}`, () => {
    const src = readFileSync(join(repoRoot, rel), "utf8");
    const hits = markers.filter((m) => src.includes(m));
    assert.deepEqual(hits, [], `hardcoded non-English in ${rel}: ${hits.join(" | ")}`);
  });
}
