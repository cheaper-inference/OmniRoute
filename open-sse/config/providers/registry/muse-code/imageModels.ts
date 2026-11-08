import { MUSE_CODE_IMAGES_GENERATIONS_URL } from "../../../museCode.ts";

// Muse Image on the Meta Model API: OpenAI-compatible /v1/images/generations (JSON)
// and /v1/images/edits (multipart), authenticated with the same muse-code credential
// (pasted META_API_KEY or the device-flow minted inference key).
export const MUSE_CODE_IMAGE_PROVIDER = {
  id: "muse-code",
  alias: "mc",
  baseUrl: MUSE_CODE_IMAGES_GENERATIONS_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "muse-image",
  models: [
    {
      id: "muse-image-1.0",
      name: "Muse Image 1.0",
      inputModalities: ["text", "image"],
      description: "Text-to-image, or image edit when a reference image is supplied.",
    },
  ],
  // Meta does not publish a size list for Muse Image; do not advertise one.
  supportedSizes: [],
};
