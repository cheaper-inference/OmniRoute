#!/usr/bin/env bash

# in the requested commit, apply the ONLY allowed transformation (remove the .js suffix from relative imports,
# because the kit compiles with pure tsc and Next/Vite/tsx resolves extensionless) and updates UPSTREAM.md.
# Fails if packages/ui-kit/src has undocumented local diff in PATCHES.md.
# Usage: scripts/dev/sync-ui-kit.sh <commit|latest> [clone-path]
# latest = the largest upstream v* tag (git fetch --tags in clone before) — the normal way to
# get the newest release; `npm run check:ui-kit-upstream` tells you when there is a new one.
set -euo pipefail
COMMIT="${1:?uso: sync-ui-kit.sh <commit|latest> [clone]}"
MAIN=$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")
CLONE="${2:-$MAIN/_references/cheaper-inference-ui-kit}"
ROOT=$(git rev-parse --show-toplevel)
DEST="$ROOT/packages/ui-kit"
[ -d "$CLONE/.git" ] || { echo "kit clone not found in $CLONE" >&2; exit 1; }
if [ "$COMMIT" = latest ]; then
  git -C "$CLONE" fetch -q --tags origin || { echo "tags fetch failed in $CLONE" >&2; exit 1; }
  TAG=$(git -C "$CLONE" tag --list 'v*' --sort=-v:refname | head -1)
  [ -n "$TAG" ] || { echo "nenhuma tag v* no clone" >&2; exit 1; }
  echo "latest: $TAG"
  COMMIT="$TAG"
fi
COMMIT=$(git -C "$CLONE" rev-parse --verify -q "$COMMIT^{commit}") || { echo "commit/tag $1 does not exist in clone (git -C $CLONE fetch?)" >&2; exit 1; }

#1) undocumented local diff?
if [ -d "$DEST/src" ] && [ -f "$DEST/UPSTREAM.md" ]; then
  PREV=$(grep -m1 -oE '^- commit: [0-9a-f]{40}' "$DEST/UPSTREAM.md" | cut -d' ' -f3 || true)
  if [ -n "$PREV" ]; then
    TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
    git -C "$CLONE" archive "$PREV" src | tar -x -C "$TMP"
    find "$TMP/src" \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i -E 's#(from "\.{1,2}/[^"]+)\.js"#\1"#g' {} +
    if ! diff -rq "$TMP/src" "$DEST/src" >/dev/null; then
      if ! grep -q "^## $PREV" "$DEST/PATCHES.md" 2>/dev/null; then
        echo "packages/ui-kit/src has local changes outside the $PREV snapshot and PATCHES.md does not document them" >&2
        diff -rq "$TMP/src" "$DEST/src" >&2 || true
        exit 1
      fi
    fi
  fi
fi

# 2) copiar o commit pedido
git -C "$CLONE" cat-file -e "$COMMIT^{commit}" || { echo "commit $COMMIT does not exist in clone (git -C $CLONE fetch?)" >&2; exit 1; }
rm -rf "$DEST/src"; mkdir -p "$DEST"
git -C "$CLONE" archive "$COMMIT" src | tar -x -C "$DEST"
find "$DEST/src" \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i -E 's#(from "\.{1,2}/[^"]+)\.js"#\1"#g' {} +
git -C "$CLONE" show "$COMMIT:public/brand/lucide-license.txt" > "$DEST/lucide-license.txt"
VERSION=$(git -C "$CLONE" show "$COMMIT:package.json" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).version))')
DATE=$(git -C "$CLONE" show -s --format=%cs "$COMMIT")

#3) UPSTREAM.md (preserves the license authorization line if it exists)
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
sync transformation: relative imports lose the \`.js\` suffix (\`./button.js\` → \`./button\`).
To update: \`scripts/dev/sync-ui-kit.sh <commit>\` (needs clone in \`_references/\`).
Local patches are prohibited; when unavoidable, document in PATCHES.md (section \`## <commit>\`) and send upstream.
MD
#4) workspace version (package.json + package-lock.json) mirrors upstream version
node - "$DEST/package.json" "$ROOT/package-lock.json" "$VERSION" <<'JS'
const fs = require("fs");
const [pkgPath, lockPath, version] = process.argv.slice(2);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.version = version;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
if (fs.existsSync(lockPath)) {
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  if (lock.packages?.["packages/ui-kit"]) {
    lock.packages["packages/ui-kit"].version = version;
    fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");
  }
}
JS
[ -f "$DEST/PATCHES.md" ] || printf '# Local patches\n\nNone. (Format: `## <snapshot commit>` + diff + upstream PR link.)\n' > "$DEST/PATCHES.md"
echo "ok: packages/ui-kit/src ← $COMMIT ($VERSION, $DATE)"
