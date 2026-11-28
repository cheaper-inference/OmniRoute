/**
 * onomeo API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its 1544-line ceiling (#14297).
 */
export const onomeoGateway = {
  onomeo: {
    id: "onomeo",
    serviceKinds: ["llm"],
    alias: "onomeo",
    name: "onomeo",
    icon: "router",
    color: "#C2410C",
    textIcon: "ONO",
    passthroughModels: true,
    website: "https://onomeo.com",
    hasFree: true,
    freeNote:
      "Up to 30 calls per 5 hours per account within a site-wide pool, and 12 requests per minute before a top-up. Free replies include 'via onomeo.com'.",
    apiHint:
      "Create a dashboard API key and use https://onomeo.com/v1. Some third-party upstreams train on prompts. Check the training label for your model.",
  },
} as const;
