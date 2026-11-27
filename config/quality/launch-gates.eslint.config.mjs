// Dedicated ESLint flat config for the launch quality gates (docs/qa/LAUNCH-QA.md).
// Loaded explicitly by scripts/quality/launch-quality.mjs (overrideConfigFile), so the repo
// config (which ignores bin/) does not apply. Only the gate rules run, and inline
// eslint-disable comments are ignored (noInlineConfig) so no violation can be hidden.
import { readFileSync } from "node:fs";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

const gates = JSON.parse(readFileSync(new URL("./launch-gates.json", import.meta.url), "utf8"));
const { cyclomatic, cognitive, fileLinesMax } = gates.limits;

const gateRules = {
  complexity: ["error", { max: cyclomatic }],
  "max-lines": ["error", { max: fileLinesMax, skipBlankLines: false, skipComments: false }],
  "sonarjs/cognitive-complexity": ["error", cognitive],
};

const config = [
  {
    files: ["**/*.mjs"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: { sonarjs },
    linterOptions: { reportUnusedDisableDirectives: "off", noInlineConfig: true },
    rules: gateRules,
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { sonarjs },
    linterOptions: { reportUnusedDisableDirectives: "off", noInlineConfig: true },
    rules: gateRules,
  },
];
export default config;
