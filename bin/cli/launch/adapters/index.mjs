/**
 * Launch adapter registration list (architecture section 14): every adapter
 * whose tier is not "later". Tier "later" adapters stay out of v1 builds.
 */

import aider from "./aider.mjs";
import claude from "./claude.mjs";
import cline from "./cline.mjs";
import codex from "./codex.mjs";
import continue_ from "./continue.mjs";
import copilot from "./copilot.mjs";
import crush from "./crush.mjs";
import deepseek from "./deepseek.mjs";
import gemini from "./gemini.mjs";
import goose from "./goose.mjs";
import hermes from "./hermes.mjs";
import kilo from "./kilo.mjs";
import kimi from "./kimi.mjs";
import omp from "./omp.mjs";
import openclaw from "./openclaw.mjs";
import opencode from "./opencode.mjs";
import pi from "./pi.mjs";
import pool from "./pool.mjs";
import qwen from "./qwen.mjs";

const ALL_ADAPTERS = [
  aider,
  claude,
  cline,
  codex,
  continue_,
  copilot,
  crush,
  deepseek,
  gemini,
  goose,
  hermes,
  kilo,
  kimi,
  omp,
  openclaw,
  opencode,
  pi,
  pool,
  qwen,
];

export const ADAPTERS = Object.freeze(
  ALL_ADAPTERS.filter((adapter) => adapter.capabilities.tier !== "later")
);
