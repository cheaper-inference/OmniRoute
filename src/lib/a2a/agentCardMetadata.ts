import { APP_CONFIG } from "@/shared/constants/appConfig";
import type { FleetSkill } from "@/lib/conductor/fleetSkills";

/** Common discovery metadata; protocol-specific envelopes stay in the routes. */
export function buildAgentCardMetadata(baseUrl: string, fleetSkills: FleetSkill[]) {
  return {
    name: "OmniRoute AI Gateway",
    description:
      "Intelligent AI routing gateway with 36+ providers, smart fallback, quota tracking, " +
      "format translation, and auto-managed combos. Routes AI requests to the optimal " +
      "provider based on cost, latency, quota availability, and task requirements.",
    url: `${baseUrl}/a2a`,
    version: APP_CONFIG.version,
    capabilities: {
      streaming: true,
      pushNotifications: false,
    },
    skills: [
      {
        id: "smart-routing",
        name: "Smart Request Routing",
        description:
          "Routes AI requests to the optimal provider based on quota, cost, latency, and reliability.",
        tags: ["routing", "llm", "optimization", "fallback"],
        examples: [
          "Route this coding task to the fastest available model",
          "Send this review to an analytical model under a $0.50 budget",
        ],
      },
      {
        id: "quota-management",
        name: "Quota & Cost Management",
        description:
          "Tracks and manages API quotas across providers with auto-fallback when quotas are exhausted.",
        tags: ["quota", "cost", "monitoring", "budget"],
        examples: ["Check remaining quota for all providers", "Generate a cost report for today"],
      },
      {
        id: "provider-discovery",
        name: "Provider Discovery",
        description:
          "Discovers providers that can handle a requested capability (chat, images, audio, search, embeddings, rerank, video).",
        tags: ["providers", "discovery", "capabilities", "health"],
        examples: [
          "Which providers can handle image generation?",
          "Find healthy providers for embeddings",
        ],
      },
      {
        id: "cost-analysis",
        name: "Cost Analysis",
        description:
          "Analyzes usage costs by provider and model and returns cost-saving opportunities.",
        tags: ["cost", "usage", "analytics", "optimization"],
        examples: ["How much did we spend this week?", "Which provider costs the most?"],
      },
      {
        id: "health-report",
        name: "Health Report",
        description:
          "Summarizes provider health, circuit-breaker state, rate-limit queues, and telemetry into a structured report.",
        tags: ["health", "monitoring", "resilience", "telemetry"],
        examples: ["Is everything healthy?", "Report degraded providers and retry timing"],
      },
      {
        id: "list-capabilities",
        name: "List Capabilities",
        description: "Returns the full catalog of OmniRoute agent skills.",
        tags: ["discovery", "capabilities"],
        examples: ["What can you do?", "List your skills"],
      },
      ...fleetSkills,
    ],
  };
}
