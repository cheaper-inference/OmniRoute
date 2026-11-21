import { defineConfig } from "vitest/config";
import uiConfig from "./vitest.config";

// Only the guarded hosted runner selects this config. Never widen the general UI globs.
export default defineConfig({
  ...uiConfig,
  test: { ...uiConfig.test, include: ["tests/integration/managed-proxy/managedProxy*.test.tsx"] },
});
