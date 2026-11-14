import { z } from "zod";
import type { MemoryType as MemoryTypeT } from "@/lib/memory/types";
/**
 * Lazily loads the memory store/retrieval chain on first memory tool invocation.
 *
 * The memory modules pull in qdrant + embeddings (~58 MB retained heap), so
 * loading is deferred until needed.
 *
 * @returns {Promise<{ retrieveMemories: Function, createMemory: Function, deleteMemory: Function, listMemories: Function, MemoryType: unknown, getMemorySettings: Function, toMemoryRetrievalConfig: Function, DEFAULT_MEMORY_SETTINGS: unknown }>}
 */
async function loadMemoryModules() {
  const [retrieval, store, settings] = await Promise.all([
    import("@/lib/memory/retrieval"),
    import("@/lib/memory/store"),
    import("@/lib/memory/settings"),
  ]);
  return {
    retrieveMemories: retrieval.retrieveMemories,
    createMemory: store.createMemory,
    deleteMemory: store.deleteMemory,
    listMemories: store.listMemories,
    getMemorySettings: settings.getMemorySettings,
    toMemoryRetrievalConfig: settings.toMemoryRetrievalConfig,
    DEFAULT_MEMORY_SETTINGS: settings.DEFAULT_MEMORY_SETTINGS,
  };
}
import { resolveMcpToolOwnerId } from "../mcpCallerIdentity.ts";
import type { McpToolExtraLike } from "../scopeEnforcement.ts";

/**
 * Resolve the memory owner id for an MCP tool call.
 *
 * The authenticated caller's principal ALWAYS wins over a caller-supplied
 * `apiKeyId` — otherwise any MCP caller could read, write, or delete another
 * principal's memories by putting a different id in the tool arguments
 * (GHSA-cpv3-xr7r-xf8q, IDOR). The caller is resolved from the per-request HTTP
 * auth headers on SSE / Streamable HTTP transports, or from OMNIROUTE_API_KEY on
 * stdio. The explicit argument is only honored as a fallback when no caller can
 * be resolved (a bare local stdio process with no configured key — already
 * trusted), preserving the local-tooling flow. Keeps MCP-stored memories under
 * the same owner id that chat-context memory uses, so retrieval in the chat
 * pipeline finds entries written via MCP.
 */
async function resolveMemoryOwnerId(explicit?: string, extra?: McpToolExtraLike): Promise<string> {
  return (await resolveMcpToolOwnerId(extra, explicit)) ?? "mcp";
}

export const MemorySearchSchema = z.object({
  apiKeyId: z.string().optional(),
  query: z.string().optional(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]).optional(),
  maxTokens: z.number().int().positive().max(8000).optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export const MemoryAddSchema = z.object({
  apiKeyId: z.string().optional(),
  sessionId: z.string().optional(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]),
  key: z.string().min(1),
  content: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const MemoryClearSchema = z.object({
  apiKeyId: z.string().optional(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]).optional(),
  olderThan: z.string().optional(),
});

export const memoryTools = {
  omniroute_memory_search: {
    name: "omniroute_memory_search",
    description: "Search memories by query, type, or API key with token budget enforcement",
    scopes: ["read:memory"],
    inputSchema: MemorySearchSchema,
    handler: async (args: z.infer<typeof MemorySearchSchema>, extra?: McpToolExtraLike) => {
      const M = await loadMemoryModules();
      const apiKeyId = await resolveMemoryOwnerId(args.apiKeyId, extra);
      // Plan 21 D16/Bug#7 fix: even on the error path the fallback must
      // respect M.DEFAULT_MEMORY_SETTINGS.strategy instead of hardcoding "exact".
      const memorySettings =
        (await M.getMemorySettings().catch(() => null)) ?? M.DEFAULT_MEMORY_SETTINGS;
      const baseConfig = M.toMemoryRetrievalConfig(memorySettings, {
        query: args.query,
      });

      const config = {
        ...baseConfig,
        enabled: true,
        maxTokens:
          args.maxTokens ??
          (memorySettings.enabled ? memorySettings.maxTokens : M.DEFAULT_MEMORY_SETTINGS.maxTokens),
      };

      const memories = await M.retrieveMemories(apiKeyId, config);

      const filtered = args.type ? memories.filter((m) => m.type === args.type) : memories;

      const limited = args.limit ? filtered.slice(0, args.limit) : filtered;

      return {
        success: true,
        data: {
          memories: limited,
          count: limited.length,
          totalTokens: limited.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0),
        },
      };
    },
  },

  omniroute_memory_add: {
    name: "omniroute_memory_add",
    description: "Add a new memory entry",
    scopes: ["write:memory"],
    inputSchema: MemoryAddSchema,
    handler: async (args: z.infer<typeof MemoryAddSchema>, extra?: McpToolExtraLike) => {
      const M = await loadMemoryModules();
      const apiKeyId = await resolveMemoryOwnerId(args.apiKeyId, extra);
      const memory = await M.createMemory({
        apiKeyId,
        sessionId: args.sessionId || "",
        type: args.type as MemoryTypeT,
        key: args.key,
        content: args.content,
        metadata: args.metadata || {},
        expiresAt: null,
      });

      return {
        success: true,
        data: {
          memory,
          message: "Memory created successfully",
        },
      };
    },
  },

  omniroute_memory_clear: {
    name: "omniroute_memory_clear",
    description: "Clear memories for an API key, optionally filtered by type or age",
    scopes: ["write:memory"],
    inputSchema: MemoryClearSchema,
    handler: async (args: z.infer<typeof MemoryClearSchema>, extra?: McpToolExtraLike) => {
      const M = await loadMemoryModules();
      const apiKeyId = await resolveMemoryOwnerId(args.apiKeyId, extra);
      const result = await M.listMemories({
        apiKeyId,
        type: args.type as MemoryTypeT | undefined,
      });
      const existingMemories = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      let toDelete = existingMemories;
      if (args.olderThan) {
        const cutoff = new Date(args.olderThan);
        toDelete = existingMemories.filter((m) => new Date(m.createdAt) < cutoff);
      }

      let deletedCount = 0;
      for (const memory of toDelete) {
        await M.deleteMemory(memory.id);
        deletedCount++;
      }

      return {
        success: true,
        data: {
          deletedCount,
          message: `Cleared ${deletedCount} memories`,
        },
      };
    },
  },
};
