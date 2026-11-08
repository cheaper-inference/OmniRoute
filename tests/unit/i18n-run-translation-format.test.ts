import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { formatMarkdown } from "../../scripts/i18n/run-translation.mjs";

// A mirror path inside the repo, so config resolution walks up to prettier.config.mjs the way
// `prettier --write` does at commit time. Nothing is written there.
const MIRROR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../docs/i18n/pt-BR/docs/architecture/AUTHZ_GUIDE.md"
);

// 82 columns: wider than Prettier's default printWidth (80), within the repo's (100).
const CODE_LINE =
  'const READ_ONLY_PREFIXES = ["/api/v1/models", "/api/v1/health", "/api/v1/status"];';
const MARKDOWN = `# Título\n\nTexto traduzido.\n\n\`\`\`ts\n${CODE_LINE}\n\`\`\`\n`;

test("formatMarkdown formats a mirror with the repo's Prettier config", async () => {
  const out = await formatMarkdown(MARKDOWN, MIRROR);
  assert.ok(out.includes(CODE_LINE), `code line was re-wrapped:\n${out}`);
});

test("lint-staged's Prettier pass leaves a formatted mirror byte-identical", async () => {
  // The pipeline records target_hash over formatMarkdown's output; lint-staged then runs
  // `prettier --write` on the staged mirror. Any change there makes the committed file
  // disagree with .i18n-state.json.
  const config = await prettier.resolveConfig(MIRROR, { editorconfig: true });
  assert.equal(config?.printWidth, 100);
  const out = await formatMarkdown(MARKDOWN, MIRROR);
  assert.equal(await prettier.format(out, { ...config, filepath: MIRROR }), out);
});
