export const MINIMAX_H3_MODELS = [
  { id: "MiniMax-H3-Image", name: "MiniMax H3 Image" },
  { id: "MiniMax-H3-Image-Highspeed", name: "MiniMax H3 Image Highspeed" },
];

export const MINIMAX_H3_GLOBAL_URL = "https://api.minimax.io/v1/images/generations";
export const MINIMAX_H3_CN_URL = "https://api.minimax.cn/v1/images/generations";

export const MINIMAX_H3_SIZES = ["auto", "1024x1024", "2720x1536", "1536x2720"];

// The upstream can wait up to ten minutes before returning a completed batch.
export const MINIMAX_H3_TIMEOUT_MS = 610_000;
