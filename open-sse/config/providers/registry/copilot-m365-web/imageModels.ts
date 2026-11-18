// Microsoft 365 Copilot image generation: one Copilot chat turn with the web client's image
// options per image, authenticated by the copilot-m365-web connection (native sign-in, whose
// refresh token also mints the Designer token the generated artifacts need).
export const COPILOT_M365_IMAGE_PROVIDER = {
  id: "copilot-m365-web",
  alias: "m365copilot",
  baseUrl: "wss://substrate.office.com/m365Copilot/Chathub",
  authType: "oauth",
  authHeader: "bearer",
  format: "m365-image",
  models: [
    {
      id: "m365-copilot-image",
      name: "Copilot Image",
      inputModalities: ["text"],
      description: "Text-to-image with Microsoft 365 Copilot's built-in image tool.",
    },
  ],
  // Copilot picks the render size; `size` only steers landscape, portrait or square.
  supportedSizes: [],
};
