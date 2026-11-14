// The Ultrafast model scope lives in the engine (open-sse/config/codexServiceTierModels.ts) so
// the Codex executor and chatCore can read it without an open-sse → src import.
export {
  CODEX_ULTRAFAST_LABEL,
  CODEX_ULTRAFAST_MODEL_LABEL,
  CODEX_ULTRAFAST_SUPPORTED_MODELS,
  isCodexUltrafastModel,
} from "@omniroute/open-sse/config/codexServiceTierModels.ts";
