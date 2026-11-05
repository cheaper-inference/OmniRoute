#!/usr/bin/env bash
# wave.sh — UMA onda de i18n de docs numa worktree do OmniRoute.
#
# Para cada doc que `check-translation-drift.mjs --json` acusa (fonte mudou, locale stale,
# espelho editado à mão ou faltando), roda `run-translation.mjs --files=<doc>` nos 66 locales
# (retradução por seção), com commit+push POR DOC e até 3 tentativas. Cota do backend (429) e
# backend fora não consomem tentativa: a onda espera e volta. No fim valida o drift do escopo;
# não readota hashes. Mudanças mecânicas exigem prova e revisão separadas de proveniência.
#
# Uso — SEMPRE desacoplado da sessão, para sobreviver a quedas:
#   setsid nohup bash wave.sh <worktree> <nome-da-onda> > "$I18N_OUT/<nome>.nohup" 2>&1 < /dev/null & disown
# Log: $I18N_OUT/<nome>.log — linhas "== <doc> try N", "[doc] … summary: translated= failed=",
#      "committed: …", "QUOTA …", "BACKEND DOWN …", "FAILED: <doc>", "WAVE END processed=N failed=M".
# Espera: until grep -q "WAVE END" "$I18N_OUT/<nome>.log" || ! pgrep -f "wave.sh .*<nome>" >/dev/null; do sleep 60; done
#
# Opcionais: FILES="a.md b.md" (só esses docs), FORCE=1 (retradução inteira na 1ª tentativa),
#            QUOTA_WAIT (s, padrão 900) QUOTA_MAX (padrão 8), DOWN_WAIT (300) DOWN_MAX (6),
#            I18N_OUT (logs); translation variables are inherited from the authorized launcher.
set -uo pipefail
WT="${1:?uso: run-doc-wave.sh <worktree> [nome]}"; NAME="${2:-wave-$(date +%m%d-%H%M)}"
[[ "$NAME" =~ ^[a-zA-Z0-9._-]+$ ]] || { echo "invalid wave name" >&2; exit 2; }
OUT="${I18N_OUT:-/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/i18n-waves}"
QUOTA_WAIT="${QUOTA_WAIT:-900}"; QUOTA_MAX="${QUOTA_MAX:-8}"
DOWN_WAIT="${DOWN_WAIT:-300}";   DOWN_MAX="${DOWN_MAX:-6}"
mkdir -p "$OUT/locks"; LOG="$OUT/$NAME.log"; : > "$LOG"
log() { echo "$(date +%T) $*" >> "$LOG"; }
STATUS=INCOMPLETE
PROCESSED=(); FAILED=(); SUCCEEDED=()
trap 'rc=$?; trap - EXIT; if [ "$rc" -eq 0 ] && [ "$STATUS" != PASS ]; then rc=2; fi; log "WAVE END processed=${#PROCESSED[@]} failed=${#FAILED[@]} status=$STATUS exit=$rc"; exit "$rc"' EXIT

cd "$WT" || { echo "worktree not found: $WT" >&2; exit 1; }
WT="$PWD"; B=$(git rev-parse --abbrev-ref HEAD)

# --- 1. Exclusão mútua: uma onda por worktree, e nenhum run-translation alheio nela -----------
LOCK="$OUT/locks/$(printf %s "$WT" | sha256sum | cut -c1-16).lock"
exec 9>"$LOCK"
if ! flock -n 9; then log "ABORT: another wave already holds the lock for $WT ($LOCK)"; exit 2; fi
for p in $(pgrep -f "scripts/i18n/run-translation.mjs" 2>/dev/null); do
  if [ "$(readlink -f "/proc/$p/cwd" 2>/dev/null)" = "$WT" ]; then
    log "ABORT: run-translation.mjs pid $p is already running in $WT — two writers corrupt .i18n-state.json"; exit 2
  fi
done

# --- 2. Backend: only the authorized inherited environment; never execute dotenv -------------
# Google engine (scripts/i18n/lib/google-translate.mjs, #18429): a wave never sleeps on quota /
# credits / a dead LLM backend any more — it switches the rest of the run to Google, which is
# structure-safe and needs no LLM variables. OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK=0 restores the
# old wait-and-retry behavior.
GOOGLE_OK=0
if [ "${OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK:-1}" != 0 ] && [ -f scripts/i18n/lib/google-translate.mjs ]; then GOOGLE_OK=1; fi
use_google() {  # $1 = reason
  export OMNIROUTE_TRANSLATION_ENGINE=google
  log "ENGINE: switching the wave to Google ($1)"
}
if [ "$(printf %s "${OMNIROUTE_TRANSLATION_ENGINE:-llm}" | tr '[:upper:]' '[:lower:]')" = google ]; then
  [ -f scripts/i18n/lib/google-translate.mjs ] || { log "ABORT: selected Google engine is unavailable in this candidate"; exit 2; }
elif [ -z "${OMNIROUTE_TRANSLATION_API_URL:-}" ] || [ -z "${OMNIROUTE_TRANSLATION_MODEL:-}" ] || [ -z "${OMNIROUTE_TRANSLATION_API_KEY:-}" ]; then
  log "ABORT: authorized inherited translation environment is incomplete"
  exit 2
fi

probe() {  # imprime: ok | quota | down:<code>
  local f="$OUT/$NAME.probe" code
  code=$(curl -s -o "$f" -w '%{http_code}' --max-time 180 \
    -H "Authorization: Bearer $OMNIROUTE_TRANSLATION_API_KEY" -H "Content-Type: application/json" \
    -d "{\"model\":\"$OMNIROUTE_TRANSLATION_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with the single word: ok\"}],\"max_tokens\":5,\"stream\":false}" \
    "$OMNIROUTE_TRANSLATION_API_URL/chat/completions" 2>/dev/null) || code=000
  if [ "$code" = 200 ]; then echo ok
  elif [ "$code" = 402 ] || { [ "$code" = 429 ] && grep -qiE "quota|credit|exhausted" "$f" 2>/dev/null; }; then echo quota
  else echo "down:$code"; fi
}
wait_backend() {  # 0 = backend respondeu (ou Google assumiu); 1 = desistiu (limites atingidos)
  local q=0 d=0 r
  [ "${OMNIROUTE_TRANSLATION_ENGINE:-}" = google ] && return 0
  while :; do
    r=$(probe)
    case "$r" in
      ok) return 0 ;;
      quota) [ "$GOOGLE_OK" = 1 ] && { use_google "LLM quota/credits exhausted"; return 0; }
             q=$((q+1)); log "QUOTA: translation backend reports exhausted quota ($q/$QUOTA_MAX); sleeping ${QUOTA_WAIT}s"
             [ "$q" -ge "$QUOTA_MAX" ] && return 1; sleep "$QUOTA_WAIT" ;;
      *)     [ "$GOOGLE_OK" = 1 ] && { use_google "LLM backend down: probe=$r"; return 0; }
             d=$((d+1)); log "BACKEND DOWN: probe=$r ($d/$DOWN_MAX); sleeping ${DOWN_WAIT}s"
             [ "$d" -ge "$DOWN_MAX" ] && return 1; sleep "$DOWN_WAIT" ;;
    esac
  done
}

# --- 3. Commit+push por doc (a worktree pode ser varrida por outra sessão) --------------------
wip() {
  local message="$1" doc target rc
  shift
  local paths=(.i18n-state.json)
  for doc in "$@"; do
    for target in docs/i18n/*/"$doc"; do
      [ ! -f "$target" ] || paths+=("$target")
    done
  done
  # Numeric values and their reviewed prose bindings must pass before publication.
  # A changed translation anchor requires review; never regenerate bindings or adopt hashes here.
  local count_gate=scripts/check/check-docs-counts-sync.mjs count_source input
  local count_inputs=("$@" package.json "$count_gate" scripts/check/lib/readmeMigrationCount.mjs config/i18n.json)
  local managed_inputs=(scripts/docs/lib/count-sync.mjs scripts/docs/lib/count-claims.json tests/fixtures/docs/readme-model-claims.json)
  # Select from committed source: deleting managed files must never select legacy mode.
  if ! count_source="$(git show "HEAD:$count_gate" 2>> "$LOG")"; then
    log "ABORT: committed documentation count gate is unavailable"
    return 2
  fi
  if [[ "$count_source" != *'from "./lib/readmeMigrationCount.mjs"'* ]]; then
    log "ABORT: committed documentation count layout is unsupported"
    return 2
  fi
  if [[ "$count_source" == *'../docs/lib/count-sync.mjs'* || "$count_source" == *'scripts/docs/lib/count-claims.json'* ]]; then
    if [[ "$count_source" != *'from "../docs/lib/count-sync.mjs"'* || "$count_source" != *'scripts/docs/lib/count-claims.json'* ]]; then
      log "ABORT: committed documentation count layout is incomplete"
      return 2
    fi
    count_inputs+=("${managed_inputs[@]}")
  elif [[ "$count_source" == *'from "./lib/readmeMigrationCount.mjs"'* ]]; then
    for input in "${managed_inputs[@]}"; do
      if git cat-file -e "HEAD:$input" 2>/dev/null || [ -e "$input" ] || [ -L "$input" ]; then
        log "ABORT: legacy documentation count layout contains managed artifacts"
        return 2
      fi
    done
  else
    log "ABORT: committed documentation count layout is unsupported"
    return 2
  fi
  for input in "${count_inputs[@]}"; do
    if ! git cat-file -e "HEAD:$input" 2>/dev/null || [ ! -f "$input" ] || [ -L "$input" ]; then
      log "ABORT: required documentation count input is missing or not a regular file"
      return 2
    fi
  done
  if ! git diff --quiet -- "${count_inputs[@]}" ||
     ! git diff --cached --quiet -- "${count_inputs[@]}"; then
    log "ABORT: commit reviewed source/count-binding repairs separately before resuming the wave"
    return 2
  fi
  if ! node -e 'try { const p=JSON.parse(require("node:fs").readFileSync("package.json","utf8")); process.exit(p.scripts?.["check:docs-counts"] === "node scripts/check/check-docs-counts-sync.mjs" ? 0 : 1); } catch { process.exit(1); }' >> "$LOG" 2>&1; then
    log "ABORT: documentation count command is unsupported"
    return 2
  fi
  if ! npm run check:docs-counts >> "$LOG" 2>&1; then
    log "ABORT: documentation counts failed before commit; review stale values or changed claim bindings"
    return 2
  fi
  git add -- "${paths[@]}" >/dev/null 2>&1 || return 2
  git diff --cached --quiet
  rc=$?
  [ "$rc" -eq 0 ] && return 0
  [ "$rc" -eq 1 ] || return 2
  git commit -q -m "$message" >/dev/null 2>&1 || return 2
  # Normal hooks may format the committed bytes. Keep a rejected commit locally, without push.
  for input in "${count_inputs[@]}"; do
    if ! git cat-file -e "HEAD:$input" 2>/dev/null || [ ! -f "$input" ] || [ -L "$input" ]; then
      log "ABORT: required documentation count input disappeared after commit"
      return 2
    fi
  done
  if ! git diff --quiet -- "${paths[@]}" "${count_inputs[@]}" ||
     ! git diff --cached --quiet -- "${paths[@]}" "${count_inputs[@]}"; then
    log "ABORT: published count inputs differ from the local commit; review hook changes before push"
    return 2
  fi
  if ! npm run check:docs-counts >> "$LOG" 2>&1; then
    log "ABORT: documentation counts failed after commit; keep the local commit and review hook changes before push"
    return 2
  fi
  if ! git push -q -u origin "$B" >/dev/null 2>&1; then
    log "committed: $message ($(git rev-parse --short HEAD)) — PUSH REJECTED: remote branch moved (someone merged into it?); fetch + merge origin/$B before pushing"
    return 2
  fi
  log "committed and pushed: $message ($(git rev-parse --short HEAD))"
}

# --- 4. Lista de docs: drift em JSON (fontes mudadas, stale, alvos editados, alvos faltando) ----
# O JSON vai para ARQUIVO, não para pipe: `process.stdout.write` + `process.exit` em Node trunca
# a saída em 64 KiB quando stdout é um pipe (aconteceu em 2026-10-16: JSON cortado → "nada a fazer").
drift_docs() {
  local j="$OUT/$NAME.drift.json"
  node scripts/i18n/check-translation-drift.mjs --json > "$j" 2>/dev/null
  local rc=$?
  [ "$rc" -le 1 ] || return 2
  node -e '
    const fs = require("fs"); let j;
    try { j = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); }
    catch (e) { console.error("DRIFT_JSON_INVALID " + e.message); process.exit(3); }
    if (typeof j.ok !== "boolean" || j.error || !Number.isSafeInteger(j.checkedSources) || j.checkedSources < 1 ||
        !["driftedSources","missingTargets","driftedTargets","staleTargets","inconsistentSectionCaches"].every(k => Array.isArray(j[k]))) {
      console.error("DRIFT_JSON_INVALID schema"); process.exit(3);
    }
    const set = new Set();
    for (const k of ["driftedSources","missingTargets","driftedTargets","staleTargets","inconsistentSectionCaches"])
      for (const x of (j[k] || [])) if (x && x.rel) set.add(x.rel);
    console.log([...set].sort().join("\n"));' "$j" 2>>"$LOG"
}

locs=""
for locale_dir in docs/i18n/*/; do
  [ -d "$locale_dir" ] || continue
  locale_dir="${locale_dir%/}"
  locs+="${locs:+,}${locale_dir##*/}"
done
if [ -n "${FILES:-}" ]; then
  docs="$FILES"
else
  docs=$(drift_docs) || {
    log "ABORT: drift report unavailable or invalid"
    exit 2
  }
fi
log "drift verdict: $(node scripts/i18n/check-translation-drift.mjs 2>&1 | grep -E 'PASS|FAIL' | tail -1)"
[ -z "$docs" ] && { log "nothing to do: valid drift report is clean"; STATUS=PASS; exit 0; }
for f in $docs; do
  case "$f" in
    /*|..|../*|*/../*|*/..|*\\*) log "ABORT: unsafe document path"; exit 2 ;;
  esac
  [ -f "$f" ] || { log "ABORT: source document missing"; exit 2; }
done
log "docs to process: $(echo "$docs" | wc -w)"; for f in $docs; do log "  - $f"; done

run_doc() {  # $1 doc — 0 quando failed=0; 1 após 3 tentativas reais ou cota/backend esgotados
  local f="$1" i=0 q=0 out rc errors force=""
  [ "${FORCE:-0}" = 1 ] && force="--force"
  while [ "$i" -lt 3 ]; do
    i=$((i+1)); log "== $f try $i"
    out=$(node scripts/i18n/run-translation.mjs $force --locale="$locs" --files="$f" 2>&1)
    rc=$?
    printf '%s\n' "$out" | grep -E "summary|failed:" | sed "s|^|[$f] |" >> "$LOG"
    wip "docs(i18n): sync $f mirrors with the base" "$f" || {
      log "ABORT: could not commit and push $f"; return 2;
    }
    if [ "$rc" -eq 0 ] && grep -Eq 'summary:.*failed=0([,[:space:]]|$)' <<< "$out" &&
       ! grep -Eq 'summary:.*failed=[1-9]' <<< "$out"; then return 0; fi
    log "translation did not complete: command_exit=$rc"
    force=""   # a repetição só refaz os locales que falharam
    # Classify terminal errors, not document literals or an earlier recovered retry.
    errors=$(grep -E '^\[i18n-run\] ERROR .* failed:' <<< "$out" || true)
    if grep -qiE ' failed: upstream 429([[:space:]:]|$)' <<< "$errors"; then
      q=$((q+1)); i=$((i-1))   # cota não consome tentativa
      if [ "$GOOGLE_OK" = 1 ] && [ "${OMNIROUTE_TRANSLATION_ENGINE:-}" != google ]; then
        use_google "quota during $f"; continue
      fi
      log "QUOTA during $f ($q/$QUOTA_MAX): sleeping ${QUOTA_WAIT}s"
      [ "$q" -ge "$QUOTA_MAX" ] && return 1
      sleep "$QUOTA_WAIT"
    elif grep -qiE ' failed: (fetch failed|ECONN|upstream 50[234]|timed? ?out)' <<< "$errors"; then
      if [ "$GOOGLE_OK" = 1 ] && [ "${OMNIROUTE_TRANSLATION_ENGINE:-}" != google ]; then
        use_google "backend errors during $f"; continue
      fi
      log "TRANSIENT during $f: sleeping ${DOWN_WAIT}s"; sleep "$DOWN_WAIT"
    else
      sleep 30
    fi
  done
  return 1
}

# --- 5. Onda -----------------------------------------------------------------------------------
wait_backend || { log "ABORT: translation backend unavailable before start"; exit 2; }
for f in $docs; do
  run_doc "$f"
  rc=$?
  PROCESSED+=("$f")
  if [ "$rc" -eq 0 ]; then SUCCEEDED+=("$f"); else
    FAILED+=("$f"); log "FAILED: $f (see summary lines above)"
    [ "$rc" -ne 2 ] || exit 2
    wait_backend || { log "ABORT: translation backend unavailable; stopping the wave after $f"; exit 2; }
  fi
done

# --- 6. Preserve provenance: never adopt hashes merely because the runner skipped a target ------
# Formatting-only target changes require a separately reviewed, scoped proof. The final
# report below keeps those changes visible; this runner never rewrites source/cache hashes.
[ "${#FAILED[@]}" -eq 0 ] || { STATUS=FAIL; exit 1; }

# Verify the requested scope after formatting/persistence. Drift elsewhere remains visible
# in the full report; PASS here certifies only this wave, never release admission.
FINAL="$OUT/$NAME.final-drift.json"
node scripts/i18n/check-translation-drift.mjs --json > "$FINAL" 2>/dev/null
rc=$?
[ "$rc" -le 1 ] || exit 2
node -e '
  const fs = require("fs");
  let report;
  try { report = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); }
  catch { process.exit(2); }
  const fields = ["driftedSources", "missingTargets", "driftedTargets", "staleTargets", "inconsistentSectionCaches"];
  if (typeof report.ok !== "boolean" || report.error || !Number.isSafeInteger(report.checkedSources) || report.checkedSources < 1 || !fields.every(k => Array.isArray(report[k]))) process.exit(2);
  const selected = new Set(process.argv.slice(2));
  const failures = fields.flatMap(k => report[k]).filter(item => selected.has(item.rel));
  process.exit(failures.length ? 1 : 0);
' "$FINAL" "${SUCCEEDED[@]}"
rc=$?
[ "$rc" -ne 2 ] || exit 2
[ "$rc" -eq 0 ] || { STATUS=FAIL; exit 1; }
STATUS=PASS
exit 0
