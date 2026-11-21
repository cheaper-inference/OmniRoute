import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Comments-only change: translate accidentally non-English comments under src/** to English.
// Test 1 scans only the files this change touched and asserts that distinctive phrases from
// the old Portuguese/Turkish comments no longer appear in any comment. Test 2 locks the
// class-b decision: quoted runtime strings, CJK matchers, locale/domain tokens and vendor
// proper nouns must stay verbatim — "fixing" them would change behavior, not readability.

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

const CHANGED_FILES = [
  "src/app/(dashboard)/dashboard/a2a/page.tsx",
  "src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient.tsx",
  "src/app/(dashboard)/dashboard/batch/page.tsx",
  "src/app/(dashboard)/dashboard/cache/media/MediaPageClient.tsx",
  "src/app/(dashboard)/dashboard/cli-code/components/DroidToolCard.tsx",
  "src/app/(dashboard)/dashboard/cloud-agents/page.tsx",
  "src/app/(dashboard)/dashboard/conductor/ConductorPageClient.tsx",
  "src/app/(dashboard)/dashboard/conductor/FaroChat.tsx",
  "src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient.tsx",
  "src/app/(dashboard)/dashboard/context/omniglyph/sampleData.ts",
  "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx",
  "src/app/(dashboard)/dashboard/mcp/page.tsx",
  "src/app/(dashboard)/dashboard/memory/page.tsx",
  "src/app/(dashboard)/dashboard/omni-skills/OmniSkillsPageClient.tsx",
  "src/app/(dashboard)/dashboard/orchestration/edges/StatusEdge.tsx",
  "src/app/(dashboard)/dashboard/orchestration/model/orchestrationTypes.ts",
  "src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts",
  "src/app/(dashboard)/dashboard/providers/[id]/components/__tests__/customModelsAddContextWindow.test.tsx",
  "src/app/(dashboard)/dashboard/providers/providerPageUtils.ts",
  "src/app/(dashboard)/dashboard/radar/page.tsx",
  "src/app/(dashboard)/dashboard/search-tools/components/RerankPanel.tsx",
  "src/app/(dashboard)/dashboard/translator/types.ts",
  "src/app/(dashboard)/home/ProviderTopology.tsx",
  "src/app/api/a2a/tasks/route.ts",
  "src/app/api/cli-tools/guide-settings/[toolId]/route.ts",
  "src/app/api/conductor/ask/route.ts",
  "src/app/api/conductor/tasks/[id]/cancel/route.ts",
  "src/app/api/conductor/tasks/[id]/route.ts",
  "src/app/api/models/openrouter-catalog/route.ts",
  "src/app/api/settings/oneproxy/rotate/route.ts",
  "src/app/api/settings/oneproxy/route.ts",
  "src/app/api/v1/models/catalog.ts",
  "src/app/globals.css",
  "src/lib/audit/highLevelActions.ts",
  "src/lib/catalog/openrouterCatalog.ts",
  "src/lib/conductor/fleetSkills.ts",
  "src/lib/db/adapters/driverFactory.ts",
  "src/lib/db/adapters/types.ts",
  "src/lib/db/compression.ts",
  "src/lib/memory/embedding/types.ts",
  "src/lib/playground/codeExport.ts",
  "src/lib/playground/promptImprover.ts",
  "src/lib/quota/fairShare.ts",
  "src/lib/quota/planRegistry.ts",
  "src/lib/radar/scheduler.ts",
  "src/server/authz/accessScopes.ts",
  "src/shared/components/NotificationToast.tsx",
  "src/shared/constants/cliTools.ts",
  "src/shared/constants/modelSpecs.ts",
  "src/shared/constants/pricing/frontier-labs.ts",
  "src/shared/constants/pricing/regional.ts",
  "src/shared/schemas/cliCatalog.ts",
  "src/shared/schemas/memory.ts",
  "src/shared/schemas/playground.ts",
  "src/shared/schemas/qdrant.ts",
  "src/shared/schemas/searchTools.ts",
  "src/shared/validation/compressionConfigSchemas.ts",
] as const;

// Distinctive phrases lifted from the old comments. Kept specific so the preserved
// Sim/Não, grátis and quoted-error strings elsewhere never trigger a false failure.
const LEGACY_MARKERS = [
  "Identificador estável",
  "Tabs no shell",
  "Modo do simple controls",
  "Slugs canônicos",
  "Estado do deep-link parseado",
  "nenhum aberto",
  "Resultado narrado",
  "Renderizado por ResultNarrated",
  "formato detectado no input do usuário",
  "selecionado no SimpleControls",
  "primeiras N chars",
  'para botão "ver JSON"',
  "OpenAI intermediário quando",
  "sem stack)",
  "Props compartilhados",
  "só monta children",
  "o hook useTranslateDeepLink lê isso",
  "Caller pode forçar abertura",
  "Caller pode receber notificação",
  "não exporta este type",
  "NÃO duplicar os dados",
  "Catálogo OpenRouter com cache",
  "TTL configurável via env",
  "retorna último snapshot válido",
  "Atualização oportunista",
  "delegação de entrada",
  "Traduz uma task A2A externa",
  "Só skills da frota",
  "sanitizado quando o hub",
  "cancela a task no hub",
  "Ação destrutiva: auth de gerência",
  "recusa do hub volta só",
  "proxy para o Faro",
  "exige credencial do hub",
  "oferece Sim/Não (a trava",
  "Retorna catálogo OpenRouter",
  "(pendência), so",
  "formato `provider/model`",
  "Fonte ativa após",
  "Dimensão do vetor produzido",
  "Assinatura única usada como chave",
  "Motivo da escolha (UI exibe",
  "Perfil semântico do OmniGlyph",
  "só quando opt-in",
  "limit=0 = desconhecido",
  "manual obrigatório",
  "fixado por valor",
  "Cap absoluto (intransponível",
  "Teto global intransponível",
  "endpoints movidos",
  "Usa path relativo no header",
  "foi descontinuado junto",
  "forçar uma sincronização das fontes",
  "shape inválido: o card omite a frota",
  "Retorna uma função que quando chamada",
  "adquire write lock imediatamente",
  "Backup nativo ou file-copy fallback",
  "Cache das Promises de inicialização",
  "chamadores concorrentes (BATCH",
  "Tenta abrir com better-sqlite3",
  "Pré-inicializa sql.js",
  "Idempotente — seguro chamar",
  "Retorna adapter sql.js pré-inicializado",
  "Factory assíncrona completa",
  "Um perfil desconhecido não pode virar",
  "Item exposto pelo",
  "para os 20 search providers",
  "só search",
  "só fetch",
  "creds presentes",
  "Link para configurar provider",
  "mostrado na aba Scrape",
  "Row da tabela playground_presets",
  "JSON serializado (parsed na rota)",
  "Body de POST /api/playground/presets",
  "Body de PUT /api/playground/presets",
  "aceito pelo Build tab",
  "JSON schema do response_format",
  "uma medição por coluna/mensagem",
  "não chegou primeiro chunk ainda",
  "tokens/segundo",
  "string vazia OK quando enabled=false",
  "string vazia = remove",
  "Schema estendido para PUT",
  "Campos legados (já existem)",
  "Campos novos (D9)",
  "opcional: testa global se ausente",
  "regenera TODOS os vetores",
  "Response shape do GET",
  "Item de resultado do Playground",
  "Cardinalidade obrigatória",
  "fluxo MITM; baseUrlSupport",
  "excluído das listas",
  "acessível só via legacy",
  "buffer de tokens para thinking",
  "tokens disponíveis para output",
  "IDs alternativos para este modelo",
  "nasce exigindo `write`",
  "rota nova for sensível",
  "ALINHADO COM `logAuditEvent`",
  "pendência do kit",
  "Conteúdo atual a melhorar",
  "Modelo configurado no painel Config",
  'Tom: "concise" (padrão)',
  "Versões melhoradas (apenas",
  "Tokens consumidos no call",
  "Meta-prompt fixado (D8)",
  "NÃO alterar sem aprovação",
  "Monta o body de /v1/chat/completions",
  "Parse da resposta do meta-LLM",
  "Se raw não contém marcadores",
  "Whitespace é trimado",
  "Endpoint suportado pelo Playground",
  "contrato expandido de 10",
  "Linguagens de export suportadas",
  "Mensagem chat single-turn",
  "no formato OpenAI Function Calling",
  "Estado completo capturável",
  'ex.: "http://localhost:20128"',
  "não aplicável a web.fetch",
  "Gera código para uma linguagem",
  "Sempre usa `API_KEY_PLACEHOLDER`",
  "Page title (lote 7 pendência 12)",
  "modo privado: segue só em memória",
  "rede local instável: mantém",
  "Amostra REAL para o painel",
  "Números medidos: 254",
  "de economia, dentro da faixa",
  "não é mockup",
  "Perfis do pacote, na ordem",
  "O perfil vive na config do engine",
  "Mesma precedência do edgeStyle",
  "Fundo de badge com alpha",
  "dados atualizados a cada abrir",
  "Falha ao remover: dispensável",
  "Mede TTFT/TPS client-perceived",
  "ao receber 1º chunk SSE",
  "teknik string kontrolü",
  "kullanıcı metni araması değil",
  "teknik sıralama",
  "ASCII kasıtlı",
  "novo flagship Google",
  "Context: 262.144 tokens",
  "Context: 204.800 tokens",
  "o form de CADASTRO de modelo custom",
  "quando preenchido",
  "antes só a EDIÇÃO tinha o campo",
  "lista vazia; POST → sucesso",
] as const;

// Extract comment text only: line comments, JSX comments and /* */ blocks (including
// continuation lines, which is how the globals.css marker is written).
function commentLines(source: string): string[] {
  const out: string[] = [];
  let inBlock = false;
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (inBlock) {
      out.push(line);
      if (trimmed.includes("*/")) inBlock = false;
      continue;
    }
    if (trimmed.startsWith("/*") || trimmed.startsWith("{/*")) {
      out.push(line);
      if (!trimmed.includes("*/")) inBlock = true;
      continue;
    }
    if (trimmed.startsWith("//")) out.push(line);
  }
  return out;
}

test("translated files contain no legacy non-English comment markers", () => {
  for (const rel of CHANGED_FILES) {
    const comments = commentLines(readFileSync(path.join(REPO_ROOT, rel), "utf8"));
    for (const marker of LEGACY_MARKERS) {
      const hits = comments.filter((line) => line.includes(marker));
      assert.deepEqual(hits, [], `${rel} still has "${marker}" in a comment: ${hits.join(" | ")}`);
    }
  }
});

// Class-b text is deliberately kept. A future "cleanup" that translates any of these
// would break runtime matchers, quoted error strings or domain tokens, so pin them here.
const CLASS_B_PRESERVED = [
  ["src/shared/utils/classify429.ts", "已达到 5 小时的使用上限"],
  ["src/shared/utils/classify429.ts", "余额不足或无可用资源包"],
  ["src/sse/services/auth.ts", "额度不足"],
  ["src/sse/services/auth.ts", "账号已封禁"],
  ["src/lib/db/sqliteLoadError.ts", "sql.js WASM ainda não foi"],
  ["src/app/api/pricing/route.ts", "Falha ao salvar preços"],
  ["src/lib/audit/timeline.ts", "pt-BR"],
  ["src/shared/utils/freeModels.ts", "grátis"],
  ["src/app/api/radar/referrals/route.ts", "créditos grátis"],
  [
    "src/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient.tsx",
    "Pegue seus créditos grátis",
  ],
  ["src/app/(dashboard)/dashboard/radar/page.tsx", "Pegue seus créditos grátis"],
  ["src/app/(dashboard)/dashboard/conductor/FaroChat.tsx", "Sim/Não"],
  ["src/app/api/conductor/ask/route.ts", "Sim/Não"],
  ["src/lib/conductor/faroProxy.ts", "Sim/Não"],
  ["src/shared/utils/turkishText.ts", "Türkçe-güvenli metin normalizasyonu"],
  ["src/shared/constants/pricing/frontier-labs.ts", "高峰时段为北京时间"],
  ["src/shared/constants/sidebarVisibility.ts", "隔断"],
  ["src/shared/utils/kimiBilling.ts", "额度加油包"],
  ["src/app/api/providers/[id]/models/discovery/providerSets.ts", "七牛云"],
  ["src/shared/components/CommandPalette.tsx", "configuracoes"],
  ["src/lib/db/adapters/driverFactory.ts", "sql.js WASM ainda não foi pré-inicializado"],
  ["src/lib/db/adapters/driverFactory.ts", "(falhou)"],
  ["src/instrumentation-node.ts", "sql.js WASM ainda não foi"],
  ["src/shared/schemas/cliCatalog.ts", "decolua/9router#1233"],
  ["src/app/(dashboard)/dashboard/batch/components/wizard/JsonlValidationStep.tsx", "campos OK"],
] as const;

test("class-b non-English text stays verbatim", () => {
  for (const [rel, marker] of CLASS_B_PRESERVED) {
    const source = readFileSync(path.join(REPO_ROOT, rel), "utf8");
    assert.ok(source.includes(marker), `${rel} must keep protected string "${marker}"`);
  }
});
