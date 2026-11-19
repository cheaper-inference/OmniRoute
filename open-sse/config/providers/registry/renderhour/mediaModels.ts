// RenderHour (renderhour.com): one async job API for images, video and speech. The same
// `renderhour` connection serves all three, whether it holds an API key (rh_…, dollar
// balance) or a signed-in subscription (OAuth access token, plan credits). The catalog
// mirrors GET https://renderhour.com/v1/models; ids are RenderHour's own.

export const RENDERHOUR_BASE_URL = "https://renderhour.com";

const IMAGE_SIZES = ["1024x1024", "896x1152", "1152x896", "896x1120", "768x1344", "1344x768"];
const WITH_REFERENCES = ["text", "image"];

export const RENDERHOUR_IMAGE_PROVIDER = {
  id: "renderhour",
  baseUrl: RENDERHOUR_BASE_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "renderhour-image",
  models: [
    { id: "nano-banana-pro", name: "Nano Banana Pro", inputModalities: WITH_REFERENCES },
    { id: "nano-banana-2.1", name: "Nano Banana 2.1", inputModalities: WITH_REFERENCES },
    { id: "nano-banana-2", name: "Nano Banana 2", inputModalities: WITH_REFERENCES },
    { id: "gpt-image-2", name: "GPT Image 2", inputModalities: WITH_REFERENCES },
    { id: "seedream-5.0-pro", name: "Seedream 5.0 Pro", inputModalities: WITH_REFERENCES },
    { id: "seedream-5.0-flash", name: "Seedream 5.0 Flash", inputModalities: WITH_REFERENCES },
    { id: "flux-3-image", name: "FLUX 3 Image", inputModalities: WITH_REFERENCES },
    { id: "flux-2-pro", name: "FLUX.2 Pro", inputModalities: WITH_REFERENCES },
    { id: "grok-imagine-image-2.0", name: "Grok Imagine 2.0", inputModalities: WITH_REFERENCES },
    { id: "z-image", name: "Z-Image", inputModalities: ["text"] },
    { id: "recraft-v4.1", name: "Recraft V4.1", inputModalities: ["text"] },
  ],
  // Sent as the nearest aspect ratio (1:1, 3:4, 4:3, 4:5, 9:16, 16:9).
  supportedSizes: IMAGE_SIZES,
};

export const RENDERHOUR_VIDEO_PROVIDER = {
  id: "renderhour",
  baseUrl: RENDERHOUR_BASE_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "renderhour-video",
  models: [
    { id: "seedance-2.5", name: "Seedance 2.5" },
    { id: "seedance-2.0", name: "Seedance 2.0" },
    { id: "seedance-2.0-fast", name: "Seedance 2.0 Fast" },
    { id: "seedance-2.0-mini", name: "Seedance 2.0 Mini" },
    { id: "kling-3.0", name: "Kling 3.0" },
    { id: "kling-3.0-turbo", name: "Kling 3.0 Turbo" },
    { id: "veo-3.1", name: "Google Veo 3.1" },
    { id: "grok-imagine-video-1.5", name: "Grok Imagine 1.5" },
    { id: "grok-imagine-video-1.5-lite", name: "Grok Imagine 1.5 Lite" },
    { id: "happyhorse-1.1", name: "HappyHorse 1.1" },
    { id: "gemini-omni-flash", name: "Gemini Omni Flash" },
    { id: "flux-3-video", name: "FLUX.3 Video" },
    { id: "flux-3-max", name: "FLUX 3 Max" },
    { id: "wan-3.0", name: "Wan 3.0" },
    { id: "minimax-h3", name: "MiniMax H3" },
    { id: "hailuo-2.3", name: "MiniMax Hailuo 2.3" },
  ],
};

export const RENDERHOUR_SPEECH_PROVIDER = {
  id: "renderhour",
  baseUrl: RENDERHOUR_BASE_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "renderhour-tts",
  models: [
    { id: "eleven-v4", name: "ElevenLabs v4" },
    { id: "eleven-v4-turbo", name: "ElevenLabs v4 Turbo" },
    { id: "minimax-speech-2.8-hd", name: "MiniMax Speech 2.8 HD" },
  ],
};
