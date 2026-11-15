#!/usr/bin/env python3
"""Re-hash `target_hash` for the given docs ONLY, keeping every `source_hash`.

Why not `run-translation.mjs --adopt --targets-only`? That mode deliberately covers the whole
recorded state (`--files` / `--locale` do not narrow it), so it also "blesses" mirrors that other
PRs edited by hand and that should still show up as drifted. Use this after the pre-commit hook
(prettier) reformatted the mirrors you just translated or hand-fixed.

Usage (worktree root, after the mirrors are committed/formatted):
  python3 -I readopt_targets.py docs/reference/ENVIRONMENT.md docs/security/AGENTROUTER_WAF.md
  npx prettier --write .i18n-state.json && git add .i18n-state.json && git commit -m "docs(i18n): re-adopt target hashes"

Hashing matches scripts/i18n/lib/translation-state.mjs: sha256 of the raw file bytes; mirror
path is docs/i18n/<locale>/<rel> (root MDs such as AGENTS.md included).
"""
import hashlib
import json
import os
import sys
from pathlib import Path, PurePosixPath
import tempfile

docs = [a for a in sys.argv[1:] if not a.startswith("--")]
if not docs:
    sys.exit("usage: readopt_targets.py <doc rel path>...")

root = Path.cwd().resolve()
state_path = root / ".i18n-state.json"
updates = []
temporary = None
try:
    if state_path.is_symlink():
        raise ValueError("state must be an owned regular file")
    st = json.loads(state_path.read_text())
    config = json.loads((root / "config/i18n.json").read_text())
    locales = {entry["code"] for entry in config["locales"]} - set(config.get("docsExcluded", ["en"]))
    for rel in docs:
        path = PurePosixPath(rel)
        if path.is_absolute() or ".." in path.parts or "\\" in rel:
            raise ValueError("unsafe document path")
        source = (root / rel).resolve()
        if not source.is_relative_to(root):
            raise ValueError("source escapes worktree")
        rec = st["sources"].get(rel)
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        if not rec or rec.get("source_hash") != source_hash:
            raise ValueError(f"stale or absent source: {rel}")
        if set(rec.get("locales", {})) != locales:
            raise ValueError(f"incomplete locale set: {rel}")
        for loc, record in rec["locales"].items():
            if not loc or "/" in loc or "\\" in loc or loc in (".", ".."):
                raise ValueError("unsafe locale")
            target = (root / "docs/i18n" / loc / rel).resolve()
            if not target.is_relative_to(root / "docs/i18n" / loc):
                raise ValueError("mirror escapes locale directory")
            if record.get("source_hash") != source_hash:
                raise ValueError(f"stale translated source: {loc}/{rel}")
            target_hash = hashlib.sha256(target.read_bytes()).hexdigest()
            if record.get("target_hash") != target_hash:
                updates.append((record, target_hash))
    # Validate every requested mirror before changing any record.
    for record, target_hash in updates:
        record["target_hash"] = target_hash
    with tempfile.NamedTemporaryFile(mode="w", dir=root, prefix=".i18n-state.json.", suffix=".tmp", delete=False, encoding="utf8") as fh:
        temporary = Path(fh.name)
        fh.write(json.dumps(st, indent=2, ensure_ascii=False) + "\n")
    os.chmod(temporary, state_path.stat().st_mode)
    os.replace(temporary, state_path)
except (OSError, ValueError, KeyError, TypeError) as error:
    print(f"readopt: INCOMPLETE ({type(error).__name__})", file=sys.stderr)
    sys.exit(2)
finally:
    if temporary is not None:
        temporary.unlink(missing_ok=True)
print(f"readopt: {len(docs)} doc(s), {len(updates)} target_hash updated; source hashes preserved")
