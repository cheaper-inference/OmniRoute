/**
 * Pricing data — regional family (China + other regional providers (incl. GLM/Zhipu)).
 * Pure data; merged by default-pricing.ts via spread (god-file decomposition; semantic split).
 */
import { GLM_PRICING } from "./shared-tiers";

export const DEFAULT_PRICING_REGIONAL = {
  glm: GLM_PRICING,
  glmt: GLM_PRICING,
  kimi: {
    "kimi-latest": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
    // Kimi K2.5 — acesso direto via Moonshot API
    // Context: 262.144 tokens | Capabilities: reasoning, vision, agentic, tools
    "kimi-k2.5": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-for-coding": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "moonshot-kimi-k2.5": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
  },
  kmc: {
    "kimi-k2.5": { input: 0.6, output: 3.0, cached: 0.3, reasoning: 4.5, cache_creation: 0.6 },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-latest": { input: 1.0, output: 4.0, cached: 0.5, reasoning: 6.0, cache_creation: 1.0 },
  },
  kmca: {
    "kimi-k2.5": { input: 0.6, output: 3.0, cached: 0.3, reasoning: 4.5, cache_creation: 0.6 },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-latest": { input: 1.0, output: 4.0, cached: 0.5, reasoning: 6.0, cache_creation: 1.0 },
  },
  minimax: {
    // Source for the M3.1 Flash and M3 rows (USD per 1M tokens, pay-as-you-go):
    // https://platform.minimax.io/docs/guides/pricing — M3.1 Flash is flat 0.15 / 0.60 /
    // cache read 0.015; M3 is 0.30 / 1.20 / 0.06 up to 512k input tokens (0.60 / 2.40 / 0.12
    // above it; this table keeps the base tier).
    "minimax-m3.1-flash": {
      input: 0.15,
      output: 0.6,
      cached: 0.015,
    },
    "MiniMax-M3.1-Flash": {
      input: 0.15,
      output: 0.6,
      cached: 0.015,
    },
    // MiniMax M3 — default model (upstream upgrade from M2.7), base tier (<= 512k input).
    "minimax-m3": {
      input: 0.3,
      output: 1.2,
      cached: 0.06,
    },
    "MiniMax-M3": {
      input: 0.3,
      output: 1.2,
      cached: 0.06,
    },
    "minimax-m2.1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "MiniMax-M2.1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    // MiniMax M2.5 — mais barato que M2.1, reasoning + tools
    // Context: 204.800 tokens | Max Output: 16.384 tokens
    "minimax-m2.5": {
      input: 0.27,
      output: 0.95,
      cached: 0.135,
      reasoning: 1.425,
      cache_creation: 0.27,
    },
    "MiniMax-M2.5": {
      input: 0.27,
      output: 0.95,
      cached: 0.135,
      reasoning: 1.425,
      cache_creation: 0.27,
    },
    // T12: MiniMax M2.7 — new default model (sub2api PR #1120)
    // Upgraded from M2.5, same API endpoint api.minimax.io
    // Pricing estimated, check https://platform.minimaxi.com/document/Price
    "minimax-m2.7": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "MiniMax-M2.7": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "minimax-m2.7-highspeed": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
  },
  zai: {
    "glm-5": {
      input: 0.38,
      output: 1.98,
      cached: 0.19,
      reasoning: 2.97,
      cache_creation: 0.38,
    },
    "glm-5-turbo": {
      input: 1.2,
      output: 4.0,
      cached: 0.6,
      reasoning: 6.0,
      cache_creation: 1.2,
    },
    "glm-4.7": {
      input: 0.38,
      output: 1.98,
      cached: 0.19,
      reasoning: 2.97,
      cache_creation: 0.38,
    },
  },
};
