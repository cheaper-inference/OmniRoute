#!/usr/bin/env bash
# =============================================================================
# codex-ws — roda a OpenAI Codex CLI contra um OmniRoute LOCAL usando o
#            transporte Responses-over-WebSocket (em vez do HTTP da Cloud).
#
# POR QUE ESTE WRAPPER EXISTE
# ---------------------------

#   ws(s)://<host>/v1/responses
# A Codex CLI sabe falar esse transporte quando o provider tem
# `supports_websockets = true` + `wire_api = "responses"`. But there are TWO details
# that break naive use:
#
#1) The Codex CLI validates the model NAME on the client. Ids with provider prefix
#     (ex.: "codex/gpt-5.5") são REJEITADOS ("model is not supported ... ChatGPT
#     account"). Send the "pure" id -> "gpt-5.5". (OmniRoute, in the
#     bridge WS, re-resolve "gpt-5.5" -> provider codex internamente.)
#
#2) Codex CLI v0.136 ALSO loads "$CWD/.codex/config.toml" as config
# "project-local". If you run from a directory that has a .codex (e.g.:
# /root, where the Cloud config lives), the `model` of that file OVERWRITE
#     the `model` of your CODEX_HOME -> you end up sending the wrong model.
#     That is why we force model + model_provider via `-c` (highest precedence),
# which beats any file config (user-level OR project-local).
#
# Additionally, in `exec` (headless) mode the CLI requires a "trusted" directory or
# a flag --skip-git-repo-check; o wrapper adiciona a flag automaticamente.
#
# USO
# ---
# codex-ws "your question" # opens the interactive TUI (needs terminal)
# codex-ws exec "Reply: PONG" # headless one-shot (CI/validation)
#   codex-ws --help                  # repassa flags pra Codex CLI
#
# Environment variables (all with default; override by exporting first):
#   OMNIROUTE_WS_BASE   base URL do OmniRoute local   (default abaixo)
#   OMNIROUTE_WS_MODEL  modelo codex (id puro)        (default "gpt-5.5")
#   OMNIROUTE_LOCAL_KEY API key (qualquer valor se REQUIRE_API_KEY=false)
#   CODEX_WS_HOME       dir de config isolado da Codex (default ~/.codex-ws)
# =============================================================================

set -euo pipefail

# ---- Configuration (with safe defaults) ------------------------------------
OMNIROUTE_WS_BASE="${OMNIROUTE_WS_BASE:-http://127.0.0.1:20128/v1}"  # base do OmniRoute local
OMNIROUTE_WS_MODEL="${OMNIROUTE_WS_MODEL:-gpt-5.5}"                  # id PURO (sem "codex/")
CODEX_WS_HOME="${CODEX_WS_HOME:-$HOME/.codex-ws}"                    # CODEX_HOME isolado da Cloud

# The Codex CLI reads the Bearer key from the env var named in `env_key`. We keep a name
# to avoid colliding with OPENAI_API_KEY in the Cloud config.
export OMNIROUTE_LOCAL_KEY="${OMNIROUTE_LOCAL_KEY:-local}"

# CODEX_HOME isolated: Codex CLI uses THIS directory as "user-level" config,
# deixando a sua ~/.codex (Cloud) totalmente intacta.
export CODEX_HOME="$CODEX_WS_HOME"

# ---- Garante que a config do CODEX_HOME exista (auto-bootstrap) --------------
# Only the [model_providers.*] block needs to be here; model/model_provider are
# forced via -c below (because of detail #2 in the header).
if [ ! -f "$CODEX_HOME/config.toml" ]; then
  mkdir -p "$CODEX_HOME"
  cat > "$CODEX_HOME/config.toml" <<EOF
# Gerado por codex-ws.sh — config isolada para o WS local do OmniRoute.
model = "$OMNIROUTE_WS_MODEL"
model_provider = "omniroute-local"

[model_providers.omniroute-local]
name = "OmniRoute Local (WS)"
base_url = "$OMNIROUTE_WS_BASE"   # the WebSocket URL is derived from this base by the CLI
wire_api = "responses"            # only supported value since Feb/2026
supports_websockets = true        # <- liga o transporte Responses-over-WebSocket
env_key = "OMNIROUTE_LOCAL_KEY" # the CLI reads the Bearer key from this env var

# Mark HOME as a trusted directory for exec mode.
[projects."$HOME"]
trust_level = "trusted"
EOF
fi

# ---- highest-precedence overrides ----------------------------------------
# Any file config (including the Cloud project-local in
# $CWD/.codex/config.toml). This is what guarantees the right model on the right transport.
overrides=(-c model="$OMNIROUTE_WS_MODEL" -c model_provider="omniroute-local")

# ---- Dispatch ---------------------------------------------------------------
# In headless mode (`exec`) inject --skip-git-repo-check (otherwise the CLI refuses
# run out of a "trusted" git repo). `shift` removes the duplicate "exec".
if [ "${1:-}" = "exec" ]; then
  shift
  exec codex exec --skip-git-repo-check "${overrides[@]}" "$@"
fi

# Modo interativo (TUI) ou qualquer outro subcomando/flag: repassa direto.
exec codex "${overrides[@]}" "$@"
