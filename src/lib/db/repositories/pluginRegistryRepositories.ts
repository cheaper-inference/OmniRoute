import type {
  PluginExecutionLogRepository,
  PluginRegistryRepository,
} from "@/domain/persistence/pluginRegistryRepositories";
import {
  sqlitePluginExecutionLogLegacySync,
  sqlitePluginExecutionLogRepository,
  sqlitePluginRegistryLegacySync,
  sqlitePluginRegistryRepository,
} from "./sqlitePluginRegistryRepository";

export interface PluginRegistryRepositories {
  plugins: PluginRegistryRepository;
  executions: PluginExecutionLogRepository;
  legacySync: {
    plugins: typeof sqlitePluginRegistryLegacySync;
    executions: typeof sqlitePluginExecutionLogLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Plugin loading, hook execution and sandboxing stay in `src/lib/plugins`.
 * Legacy synchronous access is explicitly separate from the Promise contract.
 */
export const pluginRegistryRepositories: PluginRegistryRepositories = {
  plugins: sqlitePluginRegistryRepository,
  executions: sqlitePluginExecutionLogRepository,
  legacySync: {
    plugins: sqlitePluginRegistryLegacySync,
    executions: sqlitePluginExecutionLogLegacySync,
  },
};
