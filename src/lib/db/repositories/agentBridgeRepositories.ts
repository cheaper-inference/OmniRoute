import type {
  AgentBridgeBypassRepository,
  AgentBridgeStateRepository,
  InspectorCustomHostRepository,
} from "@/domain/persistence/agentBridgeRepositories";
import {
  sqliteAgentBridgeBypassLegacySync,
  sqliteAgentBridgeBypassRepository,
} from "./sqliteAgentBridgeBypassRepository";
import {
  sqliteAgentBridgeStateLegacySync,
  sqliteAgentBridgeStateRepository,
} from "./sqliteAgentBridgeStateRepository";
import {
  sqliteInspectorCustomHostLegacySync,
  sqliteInspectorCustomHostRepository,
} from "./sqliteInspectorCustomHostRepository";

export interface AgentBridgeRepositories {
  state: AgentBridgeStateRepository;
  bypass: AgentBridgeBypassRepository;
  customHosts: InspectorCustomHostRepository;
  legacySync: {
    state: typeof sqliteAgentBridgeStateLegacySync;
    bypass: typeof sqliteAgentBridgeBypassLegacySync;
    customHosts: typeof sqliteInspectorCustomHostLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Agent bridge mappings (which also write MITM aliases) and inspector sessions
 * stay in their own modules for now. Legacy synchronous access is explicitly
 * separate from the Promise contract.
 */
export const agentBridgeRepositories: AgentBridgeRepositories = {
  state: sqliteAgentBridgeStateRepository,
  bypass: sqliteAgentBridgeBypassRepository,
  customHosts: sqliteInspectorCustomHostRepository,
  legacySync: {
    state: sqliteAgentBridgeStateLegacySync,
    bypass: sqliteAgentBridgeBypassLegacySync,
    customHosts: sqliteInspectorCustomHostLegacySync,
  },
};
