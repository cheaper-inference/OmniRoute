#!/usr/bin/env bash
# wave.sh — UMA onda de i18n de docs numa worktree do OmniRoute.
#
# Para cada doc que `check-translation-drift.mjs --json` acusa (fonte mudou, locale stale,
# espelho editado à mão ou faltando), roda `run-translation.mjs --files=<doc>` nos 66 locales
# (retradução por seção), com commit+push POR DOC e até 3 tentativas. Cota do backend (429) e
# backend fora não consomem tentativa: a onda espera e volta. No fim readota só os target_hash
# dos docs processados (nunca o adopt global, que esconderia edições manuais alheias).
#
# Uso — SEMPRE desacoplado da sessão, para sobreviver a quedas:
#   setsid nohup bash wave.sh <worktree> <nome-da-onda> > "$I18N_OUT/<nome>.nohup" 2>&1 < /dev/null & disown
# Log: $I18N_OUT/<nome>.log — linhas "== <doc> try N", "[doc] … summary: translated= failed=",
#      "committed: …", "QUOTA …", "BACKEND DOWN …", "FAILED: <doc>", "WAVE END processed=N failed=M".
# Espera: until grep -q "WAVE END" "$I18N_OUT/<nome>.log" || ! pgrep -f "wave.sh .*<nome>" >/dev/null; do sleep 60; done
#
# Opcionais: FILES="a.md b.md" (só esses docs), FORCE=1 (retradução inteira na 1ª tentativa),
#            QUOTA_WAIT (s, padrão 900) QUOTA_MAX (padrão 8), DOWN_WAIT (300) DOWN_MAX (6),
#            I18N_OUT (logs), I18N_ENV (arquivo de env do backend — nunca imprimir seu conteúdo).
set -uo pipefail
WT="${1:?uso: run-doc-wave.sh <worktree> [nome]}"; NAME="${2:-wave-$(date +%m%d-%H%M)}"
[[ "$NAME" =~ ^[a-zA-Z0-9._-]+$ ]] || { echo "invalid wave name" >&2; exit 2; }
OUT="${I18N_OUT:-/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/i18n-waves}"
ENVF="${I18N_ENV:-}"   # fallback: arquivo da máquina do dono, depois o .env da própria worktree
for c in "$ENVF" /home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/i18n-completion/env.translation "$1/.env"; do
  [ -n "$c" ] && [ -r "$c" ] && { ENVF="$c"; break; }
done
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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

# --- 2. Backend (variáveis carregadas sem nunca serem impressas) -------------------------------
[ -r "$ENVF" ] || { log "ABORT: env file not readable: $ENVF"; exit 1; }
set -a; . "$ENVF"; set +a
: "${OMNIROUTE_TRANSLATION_API_URL:?missing in env file}" "${OMNIROUTE_TRANSLATION_MODEL:?missing in env file}" "${OMNIROUTE_TRANSLATION_API_KEY:?missing in env file}"

probe() {  # imprime: ok | quota | down:<code>
  local f="$OUT/$NAME.probe" code
  code=$(curl -s -o "$f" -w '%{http_code}' --max-time 180 \
    -H "Authorization: Bearer $OMNIROUTE_TRANSLATION_API_KEY" -H "Content-Type: application/json" \
    -d "{\"model\":\"$OMNIROUTE_TRANSLATION_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with the single word: ok\"}],\"max_tokens\":5,\"stream\":false}" \
    "$OMNIROUTE_TRANSLATION_API_URL/chat/completions" 2>/dev/null) || code=000
  if [ "$code" = 200 ]; then echo ok
  elif [ "$code" = 429 ] && grep -qi quota "$f" 2>/dev/null; then echo quota
  else echo "down:$code"; fi
}
wait_backend() {  # 0 = backend respondeu; 1 = desistiu (limites atingidos)
  local q=0 d=0 r
  while :; do
    r=$(probe)
    case "$r" in
      ok) return 0 ;;
      quota) q=$((q+1)); log "QUOTA: translation backend reports exhausted quota ($q/$QUOTA_MAX); sleeping ${QUOTA_WAIT}s"
             [ "$q" -ge "$QUOTA_MAX" ] && return 1; sleep "$QUOTA_WAIT" ;;
      *)     d=$((d+1)); log "BACKEND DOWN: probe=$r ($d/$DOWN_MAX); sleeping ${DOWN_WAIT}s"
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
  git add -- "${paths[@]}" >/dev/null 2>&1 || return 2
  git diff --cached --quiet
  rc=$?
  [ "$rc" -eq 0 ] && return 0
  [ "$rc" -eq 1 ] || return 2
  git commit -q -m "$message" >/dev/null 2>&1 || return 2
  git push -q -u origin "$B" >/dev/null 2>&1 || return 2
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
        !["driftedSources","missingTargets","driftedTargets","staleTargets"].every(k => Array.isArray(j[k]))) {
      console.error("DRIFT_JSON_INVALID schema"); process.exit(3);
    }
    const set = new Set();
    for (const k of ["driftedSources","missingTargets","driftedTargets","staleTargets"])
      for (const x of (j[k] || [])) if (x && x.rel) set.add(x.rel);
    console.log([...set].sort().join("\n"));' "$j" 2>>"$LOG"
}

locs=$(ls docs/i18n | grep -v '\.md$' | paste -sd,)
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
      log "QUOTA during $f ($q/$QUOTA_MAX): sleeping ${QUOTA_WAIT}s"
      [ "$q" -ge "$QUOTA_MAX" ] && return 1
      sleep "$QUOTA_WAIT"
    elif grep -qiE ' failed: (fetch failed|ECONN|upstream 50[234]|timed? ?out)' <<< "$errors"; then
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

# --- 6. Readoção dirigida: o pre-commit (prettier) reformatou os espelhos commitados -----------
if [ "${#SUCCEEDED[@]}" -gt 0 ]; then
  python3 -I "$KIT/readopt_targets.py" "${SUCCEEDED[@]}" >> "$LOG" 2>&1 || exit 2
  npx prettier --write .i18n-state.json >/dev/null 2>&1 || exit 2
  wip "docs(i18n): re-adopt target hashes after pre-commit formatting" "${SUCCEEDED[@]}" || exit 2
fi
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
  const fields = ["driftedSources", "missingTargets", "driftedTargets", "staleTargets"];
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
