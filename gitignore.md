# OmniRoute .gitignore Instructions for Coding Agents

**Context:** OmniRoute AI proxy/router (Next.js 16, SQLite, MCP/A2A servers, Electron)  
**Rules:** Hard Rule #1 (never commit secrets) | Hard Rule #23 (`_*` paths never tracked)  
**Reference:** [`AGENTS.md`](./AGENTS.md) for full conventions

---

## 🛑 Never Commit These (Quick Scan)

### 1. Secrets & Credentials (Hard Rule #1)
- `.env*` (except `.env.example`, `.env.selfhost.example`, `.env.homolog.example`, `.env.devin-bridge.example`)
- `*.api-key`, `.nvidia-api-key`, JWT secrets
- `*.pem`, `*.key`, `id_rsa*` (SSH keys)
- `*.crt`, `*.cer`, `*.pfx`, `*.p12`, `*.jks`, `*.keystore` (certificates)
- `*credentials.json`, `*service-account*.json`, `.aws/`, `.gcp/`
- `gitleaks-local.json`, `audit-report.json`
- `deploy.sh`, `clipr/`, `CODEX-SETUP-PROMPT.md`
- `.agents/workflows/*-ag.md`, `.claude/commands/*-cc.md` (private workflows)
- `tests/homolog/.auth/`, `http-client.private.env.json`

### 2. Private Paths (Hard Rule #23 — CRITICAL)
**Root `_*` paths are NEVER tracked** — enforced by `check:tracked-artifacts` gate:
- `/_*/` and `/_*` (matches `_tasks/`, `_references/`, `_mono_repo/`, `_ideia/`, `_cache/`, `_artifacts/`)
- `_tasks/` is a **separate git repository** — never `git add` from it

### 3. Build Artifacts
- `/.next/`, `/dist/`, `/build/`, `/out/`, `/target/`, `/bin/`
- `*.tsbuildinfo`, `*.map`, `next-env.d.ts`
- `*.exe`, `*.dll`, `*.so`, `*.o`, `__pycache__/`, `*.pyc`
- `electron/dist/`, `electron/out/`

### 4. Dependencies & Caches
- `node_modules/`, `venv/`, `.pnpm-store/`, `vendor/`
- `.cache/`, `.eslintcache`, `.turbo/`, `/.next/cache/`
- `coverage/`, `.nyc_output/`, `test-results/`, `playwright-report/`

### 5. Databases & Logs
- `*.sqlite`, `*.sqlite3`, `*.db`, `*.mdb` (except migrations)
- `*.log`, `npm-debug.log*`, `yarn-error.log*`, `pnpm-debug.log*`
- `*.crash`, `*.dmp`, `core`

### 6. OS/IDE Files
- `.DS_Store`, `Thumbs.db`, `Desktop.ini`, `$RECYCLE.BIN/`
- `.idea/`, `.vscode/` (unless sharing settings), `*.swp`, `*.sublime-workspace`

---

## ✅ Agent Workflow (4 Steps)

1. **Before creating new files:** Check if category should be gitignored → add pattern FIRST
2. **Pattern syntax:**
   ```gitignore
   /file.txt      # Root only
   /_*/           # Any _* at root (Hard Rule #23)
   !.env.example  # Exception (DO track)
   **/*.log       # Recursive
   ```
3. **Verify:** `git check-ignore -v <file>` | `npm run check:tracked-artifacts`
4. **If secret already committed:** STOP → alert user → recommend `git rm --cached <file>` + secret rotation

---

## ⚠️ Critical Warnings

**Never:**
- ❌ Commit `_*/` paths (Hard Rule #23) — `check:tracked-artifacts` will fail
- ❌ Commit `.env` files except templates
- ❌ Use `git add -f` without operator approval
- ❌ Commit SQLite DBs except migrations in `src/lib/db/migrations/`

**Always:**
- ✅ Reference [`AGENTS.md`](./AGENTS.md) before non-trivial changes
- ✅ Use anchored patterns (`/`) for root-level paths
- ✅ Alert immediately if sensitive file already tracked

---

## 📚 Resources

- [`AGENTS.md`](./AGENTS.md) — Project conventions
- [`docs/ops/HARD_RULES_DETAIL.md`](./docs/ops/HARD_RULES_DETAIL.md) — Complete rule text
- [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) — Credential patterns
- [`docs/architecture/QUALITY_GATES.md`](./docs/architecture/QUALITY_GATES.md) — Enforcement

**Last Updated:** 2026-10-23 | **Enforced By:** `check:tracked-artifacts` (pre-commit + CI)