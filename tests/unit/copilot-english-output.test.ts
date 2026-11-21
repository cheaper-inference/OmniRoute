/**
 * The copilot's system prompt and built-in replies are user-facing prose. They used to
 * carry accidental Spanish even though the rest of the product (and the copilot's own
 * default answer language) is English. The Spanish words that remain in engine.ts are
 * input-matching patterns on purpose: they let the copilot classify a Spanish-speaking
 * user's request. This test pins both halves of that contract — prose is English,
 * multilingual matching is untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { getCopilotSystemPrompt } from "../../src/lib/copilot/systemPrompt.ts";

const ENGINE_SOURCE_URL = new URL("../../src/lib/copilot/engine.ts", import.meta.url);

const SPANISH_PROSE_MARKERS = [
  "Eres el asistente IA integrado",
  "Tu función es ayudar a los usuarios",
  "TOOLS DISPONIBLES",
  "Tienes acceso a estas herramientas",
  "### Configuración",
  "Lista proveedores configurados",
  "Lista combos de routing",
  "Crea un nuevo combo",
  "Lista grupos de keys",
  "investigación del código",
  "Encuentra quién llama a un símbolo",
  "Estadísticas del índice",
  "control total",
  "Sé conciso y directo",
  "Cuando ejecutes herramientas",
  "Si no estás seguro",
  "Para operaciones avanzadas",
  "Prioriza las herramientas específicas",
  "guíalo con preguntas específicas",
];

const LEGACY_ENGINE_SPANISH_LITERALS = [
  '"Busca la función handleChatCore"',
  '"Quién llama a sanitizeMessage?"',
  '"Qué funciones hay en combo.ts?"',
  '"Dame contexto del archivo chatCore.ts"',
  '"Lista los archivos TypeScript indexados"',
  "## OmniRoute Copilot — Comandos disponibles",
  "### Configuración",
  '"Lista los providers"',
  '"Lista mis combos"',
  "(te pediré detalles)",
  '"Crea una API key para desarrollo"',
  '"Revoca la key abc123"',
  "### CodeGraph (investigar el código)",
  '"Lista los archivos indexados"',
  "→ ejecuta ",
  "### Conocimiento",
  '"Cómo funciona OmniRoute?"',
  "explica la arquitectura",
  "### Tools disponibles",
  "Para crear un combo, necesito algunos detalles",
  "**Nombre** del combo",
  "**Estrategia**",
  "los proveedores/modelos en orden",
  "Puedes decirme algo como",
  '> Crea un combo llamado "fallback-claude" con estrategia priority y targets:',
];

// These classify Spanish (and English) user input. They are not user-facing prose and
// must survive the translation verbatim.
const MULTILINGUAL_MATCHING_PATTERNS = [
  "architecture|arquitectura|pipeline",
  "combo|routing|strategy|estrategia",
  "/provider|proveedor/",
  "debug|error|fail|fallo|problema|issue|crash|log",
  "codigo|código|codebase|cómo funciona|how does|where is|dónde está",
  "qu[eé].*combo",
  "crea(?:te|r?)\\s*(?:un\\s*)?combo",
  "crea(?:te|r?)\\s*(?:un\\s*)?(?:api.?)?key",
  "revoke|revocar|borrar.*key",
  "(?:group|grupo)",
  "(?:busca|search|find|dónde está|where is)",
  "(?:qui[ée]n|who|what)",
  "(?:qué|what|que)",
  "(?:contexto|context|símbolos|symbols|funciones|functions)",
  "(?:archivos|files|index)",
  "(?:cli|terminal|ejecuta|run|exec)",
  "(?:health|status|salud|estado)",
  "(?:help|ayuda|que puedes hacer|qué puedes hacer|\\?)",
  "llamad[oa]|named?|par[ae]?",
  "(?:con\\s*)?scope?s?",
];

test("getCopilotSystemPrompt() contains no Spanish prose", () => {
  const prompt = getCopilotSystemPrompt();

  for (const marker of SPANISH_PROSE_MARKERS) {
    assert.ok(!prompt.includes(marker), `system prompt still contains Spanish prose: ${marker}`);
  }

  for (const english of [
    "You are the integrated AI assistant of **OmniRoute**",
    "## 5. AVAILABLE TOOLS",
    "You have access to these tools to help the user:",
    "### Configuration",
    "### CodeGraph (code investigation)",
    "### CLI (full control)",
    "- Be concise and direct. Respond in Spanish or English depending on the user.",
    "- Prefer specific tools over the CLI executor when they exist.",
  ]) {
    assert.ok(prompt.includes(english), `system prompt lost English prose: ${english}`);
  }
});

test("engine.ts uses English user-facing text", async () => {
  const source = await readFile(ENGINE_SOURCE_URL, "utf8");

  for (const literal of LEGACY_ENGINE_SPANISH_LITERALS) {
    assert.ok(
      !source.includes(literal),
      `engine.ts still contains legacy Spanish literal: ${literal}`
    );
  }

  for (const english of [
    '"Search for the handleChatCore function"',
    '"Who calls sanitizeMessage?"',
    '"What functions are in combo.ts?"',
    "## OmniRoute Copilot — Available commands",
    "### Configuration",
    "(I'll ask you for details)",
    "→ runs \\`omniroute health\\`",
    "### Knowledge",
    "### Available tools:",
    "To create a combo, I need some details:",
    '> Create a combo named "fallback-claude" with strategy priority and targets:',
  ]) {
    assert.ok(source.includes(english), `engine.ts lost English text: ${english}`);
  }
});

test("engine.ts still matches Spanish user input", async () => {
  const source = await readFile(ENGINE_SOURCE_URL, "utf8");

  for (const pattern of MULTILINGUAL_MATCHING_PATTERNS) {
    assert.ok(source.includes(pattern), `engine.ts lost multilingual input pattern: ${pattern}`);
  }
});
