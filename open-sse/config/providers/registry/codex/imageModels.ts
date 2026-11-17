// Hosted chat models and dedicated image engines use separate Codex routes.
// Catalog admission does not establish the served engine or account entitlement.
// Codex serves images under ChatGPT OAuth two ways (handleCodexImageGeneration):
//  - `gpt-image-*` ids use the dedicated `/backend-api/codex/images/{generations,edits}`
//    routes, which take the image model as a request field (codexImages.ts);
//  - the GPT-6.1/GPT-5.6 ids call `/responses` with the hosted `image_generation` tool,
//    whose image model the backend pins to `gpt-image-2-codex`.
export const CODEX_IMAGE_PROVIDER = {
  id: "codex",
  alias: "cx",
  baseUrl: "https://chatgpt.com/backend-api/codex/responses",
  authType: "oauth",
  authHeader: "bearer",
  format: "codex-responses",
  models: [
    {
      id: "gpt-6.1-sol",
      catalogId: "gpt-6.1-sol-image",
      name: "GPT 6.1 Sol (Codex Image)",
    },
    {
      id: "gpt-5.6-sol",
      catalogId: "gpt-5.6-sol-image",
      name: "GPT 5.6 Sol (Codex Image)",
    },
    {
      id: "gpt-5.6-terra",
      catalogId: "gpt-5.6-terra-image",
      name: "GPT 5.6 Terra (Codex Image)",
    },
    {
      id: "gpt-5.6-luna",
      catalogId: "gpt-5.6-luna-image",
      name: "GPT 5.6 Luna (Codex Image)",
    },
    { id: "gpt-image-2.5-flare", name: "GPT Image 2.5 Flare (Codex)" },
    { id: "gpt-image-2.5-sunburst", name: "GPT Image 2.5 Sunburst (Codex)" },
    { id: "gpt-image-2.6-sunburst", name: "GPT Image 2.6 Sunburst (Codex)" },
    { id: "gpt-image-2", name: "GPT Image 2 (Codex)" },
  ],
  supportedSizes: ["1024x1024", "1024x1536", "1536x1024"],
};
