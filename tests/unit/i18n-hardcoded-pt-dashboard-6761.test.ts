// ABOUTME: Guard test — dashboard files translated in #6761/#6768 and the i18n UI cleanup must
// ABOUTME: stay free of hardcoded Portuguese UI strings (regression guard).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Files cleaned of hardcoded Portuguese in #6769 (issues #6761, #6768).
const FILES = [
  "src/app/(dashboard)/dashboard/compression/studio/CompareView.tsx",
  "src/app/(dashboard)/dashboard/compression/studio/PlaygroundInput.tsx",
  "src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx",
  "src/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion.tsx",
  "src/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection.tsx",
  "src/app/(dashboard)/dashboard/translator/components/advanced/PipelineView.tsx",
  "src/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel.tsx",
  "src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard.tsx",
];

// Portuguese-only words that appeared as hardcoded UI copy before the fix.
// Distinct from English + from shared tech terms, so a hit means real PT regression.
const PT_MARKERS = [
  "Retenção",
  "Fidelidade",
  "Compressão",
  "Proteger conteúdo",
  "delegada ao provedor",
  "Deixa o próprio provedor",
  "Hoje disponível apenas",
  "Técnicas:",
  "Não afeta",
  "reescrevemos",
  // Translator advanced accordions.
  "ferramentas técnicas",
  "Tudo aqui é igual às tabs antigas",
  "Pipeline OpenAI intermediário",
  "Visualize cada passo da tradução",
  "Envie um request pelo Chat Tester",
  "auto-detecção",
  "Cole um request JSON",
  // Qdrant memory card.
  "Execute um teste de busca",
  "Coleção compatível com vetores",
  "A coleção ainda não existe",
];

for (const rel of FILES) {
  test(`no hardcoded Portuguese in ${rel}`, () => {
    const src = readFileSync(join(repoRoot, rel), "utf8");
    const hits = PT_MARKERS.filter((m) => src.includes(m));
    assert.deepEqual(
      hits,
      [],
      `Hardcoded Portuguese found in ${rel}: ${hits.join(", ")} — translate to English or route through t().`
    );
  });
}
