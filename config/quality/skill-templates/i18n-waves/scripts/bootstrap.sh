#!/usr/bin/env bash
# bootstrap.sh — reconhecimento + worktree + diagnóstico de uma onda de i18n, num comando.
#
#   bash bootstrap.sh <branch> <reviewed-base>
#     <branch>  ex.: docs/i18n-wave-1016   (a worktree fica em .claude/worktrees/<último segmento>)
#     <base>    the reviewed branch; I18N_BASE is accepted only when explicitly supplied
#
# Creates/reuses the selected worktree, writes a report and probes the backend. Requires
# authorization for those effects; does not translate, commit or merge. Receives translation
# variables from the authorized launcher and never reads or executes dotenv files.
set -u
ROOT=/home/diegosouzapw/dev/proxys/OmniRoute
BR="${1:?usage: bootstrap.sh <branch> <reviewed-base>}"
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE="${2:-${I18N_BASE:-}}"; BASE="${BASE#origin/}"
[ -n "$BASE" ] || { echo "INCOMPLETE: explicit reviewed base required" >&2; exit 2; }
git check-ref-format --branch "$BR" >/dev/null 2>&1 || { echo "INCOMPLETE: invalid task branch" >&2; exit 2; }
git check-ref-format --branch "$BASE" >/dev/null 2>&1 || { echo "INCOMPLETE: invalid reviewed base" >&2; exit 2; }
if [ -z "${OMNIROUTE_TRANSLATION_API_URL:-}" ] || [ -z "${OMNIROUTE_TRANSLATION_API_KEY:-}" ]; then
  echo "INCOMPLETE: authorized inherited translation environment required for the probe" >&2
  exit 2
fi
export I18N_OUT="${I18N_OUT:-$ROOT/_artifacts/i18n-waves}"; mkdir -p "$I18N_OUT"
REPORT="$I18N_OUT/bootstrap-${BR##*/}.txt"
exec > >(tee "$REPORT") 2>&1

cd "$ROOT" || exit 1
git fetch -q origin "$BASE" 2>/dev/null || { echo "INCOMPLETE: reviewed base fetch failed" >&2; exit 2; }
git rev-parse --verify "origin/$BASE^{commit}" >/dev/null 2>&1 || { echo "INCOMPLETE: reviewed base unavailable" >&2; exit 2; }
export I18N_BASE="origin/$BASE"

echo "== base: $BASE  tip $(git rev-parse --short "origin/$BASE")  ($(date '+%F %T'))"
echo "== release-freeze aberto:"
gh issue list --repo cheaper-inference/OmniRoute --label release-freeze --state open --json number,title -q '.[]|"   #\(.number) \(.title)"' 2>/dev/null | sed 's/^$/   (nenhum)/'
echo "== base-red da release:"
gh issue list --repo cheaper-inference/OmniRoute --state open --search "Release branch not green in:title" --json number,title -q '.[]|"   #\(.number) \(.title)"' 2>/dev/null
echo "== PRs de i18n abertas (não pisar nas alheias):"
gh pr list --state open --search "i18n in:title" --json number,title,author,headRefName -q '.[]|"   #\(.number) \(.author.login) \(.headRefName) — \(.title)"' 2>/dev/null
echo "== worktrees existentes:"; git worktree list | sed 's/^/   /'

DIR=".claude/worktrees/${BR##*/}"
if [ -d "$DIR" ]; then
  [ "$(git -C "$DIR" branch --show-current)" = "$BR" ] || { echo "INCOMPLETE: existing worktree belongs to another branch" >&2; exit 2; }
  echo "== worktree reutilizada: $DIR"
else
  echo "== criando worktree $DIR a partir de $BASE"
  bash scripts/dev/new-worktree.sh "$BR" "$BASE" || { echo "INCOMPLETE: worktree preparation failed" >&2; exit 2; }
fi
cd "$DIR" || { echo "ABORT: worktree não disponível"; exit 1; }
echo "== branch $(git rev-parse --abbrev-ref HEAD) está $(git log --oneline "HEAD..origin/$BASE" | wc -l) commit(s) atrás de $BASE"
# Onda em andamento nesta worktree? (lock do wave.sh ou run-translation com cwd aqui) — NUNCA lance outra.
LOCK="$I18N_OUT/locks/$(printf %s "$PWD" | sha256sum | cut -c1-16).lock"
if [ -e "$LOCK" ] && ! flock -n "$LOCK" true 2>/dev/null; then echo "== ⚠ ONDA EM ANDAMENTO nesta worktree (lock $LOCK) — não lance outra; acompanhe o log em $I18N_OUT/"; fi
for p in $(pgrep -f "scripts/i18n/run-translation.mjs" 2>/dev/null); do
  [ "$(readlink -f "/proc/$p/cwd" 2>/dev/null)" = "$PWD" ] && echo "== ⚠ run-translation.mjs pid $p está rodando nesta worktree — um escritor por vez"
done

echo "== drift (CI scope = docs core set; use --all para o estado inteiro):"
node scripts/i18n/check-translation-drift.mjs 2>&1 | grep -E "^\s+-|PASS|FAIL" \
  | sed -E 's/ \[[a-zA-Z-]+\]( \([a-z-]+\))?/ [loc]/' | sort | uniq -c | sort -rn | head -40 | sed 's/^/   /'
echo "== gates:"
for s in i18n:check-keys i18n:check-keys:cli i18n:check-ratio check:docs-sync; do
  printf "   %-22s " "$s"; npm run -s "$s" >/dev/null 2>&1 && echo PASS || echo FAIL
done
echo "   __MISSING__ em src/i18n/messages: $(grep -l '__MISSING__' src/i18n/messages/*.json 2>/dev/null | wc -l) arquivo(s)"
echo "== audit_all (estrutura vs fonte, todo espelho — docs ainda em drift aparecem aqui até a onda retraduzi-los):"; python3 -I "$KIT/audit_all.py" | head -8 | sed 's/^/   /'
echo "== audit_spans (code spans inline):";           python3 -I "$KIT/audit_spans.py" | head -8 | sed 's/^/   /'
echo "== backend de tradução:"
curl -s -o /dev/null -w "   /models HTTP %{http_code} em %{time_total}s (200 em até ~20 s é normal sob carga)\n" --max-time 60 \
  -H "Authorization: Bearer $OMNIROUTE_TRANSLATION_API_KEY" "$OMNIROUTE_TRANSLATION_API_URL/models" || {
  echo "INCOMPLETE: backend probe could not complete" >&2; exit 2;
}
echo "== próximo passo:"
echo "   cd $ROOT/$DIR && export I18N_BASE=origin/$BASE I18N_OUT=$I18N_OUT"
echo "   setsid nohup bash $KIT/wave.sh \"\$PWD\" wave-${BR##*/} > \"$I18N_OUT/wave-${BR##*/}.nohup\" 2>&1 < /dev/null & disown"
echo "== relatório salvo em $REPORT"
