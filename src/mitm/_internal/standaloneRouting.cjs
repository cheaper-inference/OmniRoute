"use strict";

const CODEX_RESPONSES_PATHS = ["/backend-api/codex/responses", "/v1/responses"];
const CODEX_CHAT_PATHS = ["/backend-api/codex/chat/completions", "/v1/chat/completions"];

const AGENT_ROUTE_CONFIG = {
  antigravity: {
    aliasKey: "antigravity",
    chatUrlPatterns: [":generateContent", ":streamGenerateContent"],
    routerPath: "/v1/chat/completions",
  },
  "claude-code": {
    aliasKey: "claude-code",
    chatUrlPatterns: ["/v1/messages"],
    routerPath: "/v1/messages",
  },
  kiro: {
    aliasKey: "kiro",
    chatUrlPatterns: ["/v1/messages"],
    routerPath: "/v1/messages",
  },
  codex: {
    aliasKey: "codex",
    chatUrlPatterns: [...CODEX_RESPONSES_PATHS, ...CODEX_CHAT_PATHS],
    routerPath: "/v1/chat/completions",
  },
};

function getAgentRouteConfig(agentId) {
  return AGENT_ROUTE_CONFIG[agentId] || AGENT_ROUTE_CONFIG.antigravity;
}

function isCodexResponses(requestUrl) {
  return CODEX_RESPONSES_PATHS.includes(requestUrl?.split("?", 1)[0]);
}

function matchesAgentRequest(agentId, method, requestUrl) {
  const patterns = getAgentRouteConfig(agentId).chatUrlPatterns;
  if (agentId === "codex") {
    return method === "POST" && patterns.includes(requestUrl?.split("?", 1)[0]);
  }
  return patterns.some((pattern) => requestUrl?.includes(pattern));
}

function resolveForwardTargetForAgent({
  routerBaseUrl,
  routerMessagesUrl,
  body,
  agentId,
  requestUrl,
  fallbackResolver,
}) {
  const config = getAgentRouteConfig(agentId);
  if (agentId === "codex") {
    if (isCodexResponses(requestUrl)) {
      return { format: "openai-responses", url: `${routerBaseUrl}/v1/responses` };
    }
    return { format: "openai", url: `${routerBaseUrl}${config.routerPath}` };
  }
  if (config.routerPath === "/v1/messages") {
    return { format: "anthropic", url: routerMessagesUrl };
  }
  return fallbackResolver(routerBaseUrl, body);
}

function resolveMappedOverride(model, agentId, deps) {
  if (!model) return null;

  const config = getAgentRouteConfig(agentId);
  const { fs, dbFile, getSqliteDb, aliasConfigShim } = deps;

  try {
    const db = getSqliteDb();
    if (db) {
      const row = db
        .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
        .get(config.aliasKey);
      if (row) {
        const mappings = aliasConfigShim.normalizeAliasMappings(JSON.parse(row.value));
        return mappings[model] || mappings["*"] || null;
      }
    }
  } catch {
    // Fall through to JSON fallback.
  }

  try {
    if (fs.existsSync(dbFile)) {
      const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
      const mappings = aliasConfigShim.normalizeAliasMappings(db.mitmAlias?.[config.aliasKey]);
      return mappings[model] || mappings["*"] || null;
    }
  } catch {
    // Ignore malformed legacy state.
  }

  return null;
}

module.exports = {
  AGENT_ROUTE_CONFIG,
  getAgentRouteConfig,
  isCodexResponses,
  matchesAgentRequest,
  resolveForwardTargetForAgent,
  resolveMappedOverride,
};
