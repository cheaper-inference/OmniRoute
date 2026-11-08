/**
 * JZS Token API-key catalog entry. Kept out of gateways.ts so the frozen
 * catalog file only gains the import and spread.
 *
 * Facts are limited to the publisher's public pages checked 2026-11-07
 * (https://jzstoken.com, /tutorials/quick-start, /tutorials/api-endpoints)
 * and unauthenticated route probes. No prices, context windows, output caps,
 * or model aliases are copied in. A time-limited flagship promotion is not a
 * standing free tier, so hasFree stays false and no freeNote is published.
 */
export const jzstokenGateway = {
  jzstoken: {
    id: "jzstoken",
    serviceKinds: ["llm"],
    alias: "jzstoken",
    name: "JZS Token",
    icon: "hub",
    color: "#14532D",
    textIcon: "JZS",
    passthroughModels: true,
    website: "https://jzstoken.com",
    hasFree: false,
    authHint:
      "Paste a JZS Token API key as a Bearer token. A Standard key and a Dedicated key are mutually exclusive: Standard covers the catalog except jzs-max-3.0, and Dedicated covers only jzs-max-3.0.",
    apiHint:
      "Create an API key at https://jzstoken.com, then paste it here as a Bearer token. OpenAI-compatible base URL: https://jzstoken.com/api/v1 (the app calls /chat/completions and GET /models on that base). A Standard key and a Dedicated key are mutually exclusive: a Standard key covers the catalog except jzs-max-3.0, and a Dedicated key covers only jzs-max-3.0. GET /models returns only the models that key can call. Add a second JZS Token connection for the other key type. The catalog includes models served by third-party upstreams; check each upstream's terms before use.",
  },
} as const;
