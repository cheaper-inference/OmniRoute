#!/usr/bin/env bash
# Copia src/ do clone do CI UI Kit (em _references, só no checkout principal) para packages/ui-kit/src
# no commit pedido, aplica a ÚNICA transformação permitida (remove o sufixo .js dos imports relativos,
# porque o kit compila com tsc puro e o Next/Vite/tsx resolvem extensionless) e atualiza UPSTREAM.md.
# Falha se packages/ui-kit/src tiver diff local não documentado em PATCHES.md.
# Uso: scripts/dev/sync-ui-kit.sh <commit> [caminho-do-clone]
set -euo pipefail
COMMIT="${1:?uso: sync-ui-kit.sh <commit> [clone]}"
MAIN=$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")
CLONE="${2:-$MAIN/_references/cheaper-inference-ui-kit}"
ROOT=$(git rev-parse --show-toplevel)
DEST="$ROOT/packages/ui-kit"
[ -d "$CLONE/.git" ] || { echo "clone do kit não encontrado em $CLONE" >&2; exit 1; }

# 1) diff local não documentado?
if [ -d "$DEST/src" ] && [ -f "$DEST/UPSTREAM.md" ]; then
  PREV=$(grep -m1 -oE '^- commit: [0-9a-f]{40}' "$DEST/UPSTREAM.md" | cut -d' ' -f3 || true)
  if [ -n "$PREV" ]; then
    TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
    git -C "$CLONE" archive "$PREV" src | tar -x -C "$TMP"
    find "$TMP/src" \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i -E 's#(from "\.{1,2}/[^"]+)\.js"#\1"#g' {} +
    if ! diff -rq "$TMP/src" "$DEST/src" >/dev/null; then
      if ! grep -q "^## $PREV" "$DEST/PATCHES.md" 2>/dev/null; then
        echo "packages/ui-kit/src tem mudanças locais fora do snapshot $PREV e PATCHES.md não as documenta" >&2
        diff -rq "$TMP/src" "$DEST/src" >&2 || true
        exit 1
      fi
    fi
  fi
fi

# 2) copiar o commit pedido
git -C "$CLONE" cat-file -e "$COMMIT^{commit}" || { echo "commit $COMMIT não existe no clone (git -C $CLONE fetch?)" >&2; exit 1; }
rm -rf "$DEST/src"; mkdir -p "$DEST"
git -C "$CLONE" archive "$COMMIT" src | tar -x -C "$DEST"
find "$DEST/src" \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i -E 's#(from "\.{1,2}/[^"]+)\.js"#\1"#g' {} +
git -C "$CLONE" show "$COMMIT:public/brand/lucide-license.txt" > "$DEST/lucide-license.txt"
VERSION=$(git -C "$CLONE" show "$COMMIT:package.json" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).version))')
DATE=$(git -C "$CLONE" show -s --format=%cs "$COMMIT")

# 3) UPSTREAM.md (preserva a linha de autorização de licença se existir)
AUTH=$(grep -E '^- license-authorization:' "$DEST/UPSTREAM.md" 2>/dev/null || echo '- license-authorization: (preencher — ver spec §1)')
cat > "$DEST/UPSTREAM.md" <<MD
# Upstream snapshot — @keak/cheaper-inference-ui-kit

- repo: https://github.com/keak-ai/cheaper-inference-ui-kit
- commit: $COMMIT
- version: $VERSION
- upstream-date: $DATE
- synced: $(date -u +%Y-%m-%d)
$AUTH

Fonte consumida (sem build): \`src/\` é cópia byte a byte do commit acima, exceto pela única
transformação do sync: imports relativos perdem o sufixo \`.js\` (\`./button.js\` → \`./button\`).
Para atualizar: \`scripts/dev/sync-ui-kit.sh <commit>\` (precisa do clone em \`_references/\`).
Patches locais são proibidos; quando inevitáveis, documentar em PATCHES.md (seção \`## <commit>\`) e enviar upstream.
MD
[ -f "$DEST/PATCHES.md" ] || printf '# Patches locais\n\nNenhum. (Formato: `## <commit do snapshot>` + diff + link da PR upstream.)\n' > "$DEST/PATCHES.md"
echo "ok: packages/ui-kit/src ← $COMMIT ($VERSION, $DATE)"
