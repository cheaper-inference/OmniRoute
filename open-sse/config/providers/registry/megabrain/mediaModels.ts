// MegaBrain (getmegabrain.com) image and video generation. The `megabrain` connection that
// serves chat (registry/megabrain/index.ts) serves these too: a signed-in account's device
// token or an mb-v1-… API key, both paid from the account's credit balance. The catalog
// mirrors GET https://api.getmegabrain.com/api/gateway/v1/media/models; ids are MegaBrain's
// own, so address them as megabrain/<model> (e.g. megabrain/nano-banana-pro).

export const MEGABRAIN_MEDIA_BASE_URL = "https://api.getmegabrain.com/api/gateway/v1";

// OpenAI-style sizes the image handler turns into each model's own size field.
const IMAGE_SIZES = ["1024x1024", "1024x1536", "1536x1024", "1024x1792", "1792x1024"];

const TEXT = ["text"];
const EDIT = ["text", "image"];

/**
 * Input fields each model takes besides `prompt`. MegaBrain refuses unknown fields with a
 * 400, so the handlers send a field only when the addressed model lists it here.
 */
const FLUX_1 = [
  "image_size",
  "num_images",
  "seed",
  "output_format",
  "num_inference_steps",
  "guidance_scale",
  "acceleration",
];
const FLUX_2 = [...FLUX_1, "enable_prompt_expansion"];
const NANO_BANANA = ["aspect_ratio", "num_images", "seed", "output_format", "safety_tolerance"];
const NANO_BANANA_RES = [...NANO_BANANA, "resolution"];
const SEEDREAM = ["image_size", "num_images", "seed"];
const H3_IMAGE = ["image_size", "num_images", "output_format", "enable_prompt_expansion"];
const H3_EDIT = ["image_size", "num_images", "output_format"];
const KLING_T2V = ["duration", "aspect_ratio", "generate_audio", "negative_prompt", "cfg_scale"];
const KLING_I2V = [
  "start_image_url",
  "end_image_url",
  "duration",
  "generate_audio",
  "negative_prompt",
  "cfg_scale",
];

export const MEGABRAIN_MEDIA_PARAMS: Readonly<Record<string, readonly string[]>> = {
  "flux/schnell": FLUX_1,
  "flux/dev": FLUX_1,
  "flux-2": FLUX_2,
  "flux-2/edit": [...FLUX_2, "image_urls"],
  "flux-2/flash": [
    "image_size",
    "num_images",
    "seed",
    "output_format",
    "guidance_scale",
    "enable_prompt_expansion",
  ],
  "nano-banana": NANO_BANANA,
  "nano-banana/edit": [...NANO_BANANA, "image_urls"],
  "nano-banana-2": NANO_BANANA_RES,
  "nano-banana-pro": NANO_BANANA_RES,
  "nano-banana-pro/edit": [...NANO_BANANA_RES, "image_urls"],
  "bytedance/seedream/v4.5/text-to-image": SEEDREAM,
  "bytedance/seedream/v4.5/edit": [...SEEDREAM, "image_urls"],
  "minimax/h3-image": H3_IMAGE,
  "minimax/h3-image/edit": [...H3_EDIT, "image_urls"],
  "minimax/h3-image/highspeed": H3_IMAGE,
  "minimax/h3-image/highspeed/edit": [...H3_EDIT, "image_urls"],
  "kling-video/v2.6/pro/text-to-video": KLING_T2V,
  "kling-video/v2.6/pro/image-to-video": KLING_I2V.filter((name) => name !== "cfg_scale"),
  "kling-video/v3/standard/text-to-video": KLING_T2V,
  "kling-video/v3/standard/image-to-video": KLING_I2V,
  "kling-video/v3/pro/text-to-video": KLING_T2V,
  "kling-video/v3/pro/image-to-video": KLING_I2V,
};

export const MEGABRAIN_IMAGE_PROVIDER = {
  id: "megabrain",
  baseUrl: MEGABRAIN_MEDIA_BASE_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "megabrain-image",
  models: [
    { id: "nano-banana-pro", name: "Nano Banana Pro", inputModalities: TEXT },
    {
      id: "nano-banana-pro/edit",
      name: "Nano Banana Pro Edit",
      inputModalities: EDIT,
      imageRequired: true,
    },
    { id: "nano-banana-2", name: "Nano Banana 2", inputModalities: TEXT },
    { id: "nano-banana", name: "Nano Banana", inputModalities: TEXT },
    {
      id: "nano-banana/edit",
      name: "Nano Banana Edit",
      inputModalities: EDIT,
      imageRequired: true,
    },
    { id: "flux-2", name: "FLUX 2", inputModalities: TEXT },
    { id: "flux-2/edit", name: "FLUX 2 Edit", inputModalities: EDIT, imageRequired: true },
    { id: "flux-2/flash", name: "FLUX 2 Flash", inputModalities: TEXT },
    { id: "flux/dev", name: "FLUX.1 [dev]", inputModalities: TEXT },
    { id: "flux/schnell", name: "FLUX.1 [schnell]", inputModalities: TEXT },
    {
      id: "bytedance/seedream/v4.5/text-to-image",
      name: "Seedream 4.5",
      inputModalities: TEXT,
    },
    {
      id: "bytedance/seedream/v4.5/edit",
      name: "Seedream 4.5 Edit",
      inputModalities: EDIT,
      imageRequired: true,
    },
    { id: "minimax/h3-image", name: "MiniMax H3 Image", inputModalities: TEXT },
    {
      id: "minimax/h3-image/edit",
      name: "MiniMax H3 Image Edit",
      inputModalities: EDIT,
      imageRequired: true,
    },
    {
      id: "minimax/h3-image/highspeed",
      name: "MiniMax H3 Image Highspeed",
      inputModalities: TEXT,
    },
    {
      id: "minimax/h3-image/highspeed/edit",
      name: "MiniMax H3 Image Highspeed Edit",
      inputModalities: EDIT,
      imageRequired: true,
    },
  ],
  supportedSizes: IMAGE_SIZES,
};

export const MEGABRAIN_VIDEO_PROVIDER = {
  id: "megabrain",
  baseUrl: MEGABRAIN_MEDIA_BASE_URL,
  authType: "apikey",
  authHeader: "bearer",
  format: "megabrain-video",
  models: [
    { id: "kling-video/v3/pro/text-to-video", name: "Kling 3.0 Pro — text to video" },
    { id: "kling-video/v3/pro/image-to-video", name: "Kling 3.0 Pro — image to video" },
    {
      id: "kling-video/v3/standard/text-to-video",
      name: "Kling 3.0 Standard — text to video",
    },
    {
      id: "kling-video/v3/standard/image-to-video",
      name: "Kling 3.0 Standard — image to video",
    },
    { id: "kling-video/v2.6/pro/text-to-video", name: "Kling 2.6 Pro — text to video" },
    { id: "kling-video/v2.6/pro/image-to-video", name: "Kling 2.6 Pro — image to video" },
  ],
};
