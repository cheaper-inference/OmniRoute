# Release Checklist (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Zuletzt aktualisiert:** 2026-08-28 — v3.8.51
> Optimierter Release-Ablauf, der Claude Code Skills zur Automatisierung nutzt.
>
> **Queue/Branch zwischen Releases grün halten:** siehe [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-Familie + `npm run check:release-green` + `/babysit` + nächtlicher Lauf). Wird dies
> regelmäßig — und insbesondere **vor** dieser Checkliste — ausgeführt, startet der Release-PR grün.

## Kurzfassung

```bash
# 1. Version erhöhen + CHANGELOG generieren (Skill)
/version-bump-cc patch    # oder minor/major

# 2. Qualitätsprüfung lokal ausführen
npm run check              # Linting + Tests
npm run test:coverage      # vollständige Coverage-Prüfung (60/60/60/60)

# 3. Build & Smoke-Test
npm run build
npm run test:e2e           # optional, aber empfohlen

# 4. Release generieren (Skill)
/generate-release-cc

# 5. Bereitstellen (Skill)
/deploy-vps-both-cc        # oder akamai-cc / local-cc

# 6. Release-Nachweise erfassen (Skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (Standard seit v3.8.51) — auf Anfrage gestuft, direkt als Fallback

`npm-publish.yml` veröffentlicht standardmäßig über **npm Trusted Publishing (OIDC)**: Der
`stage-npm`-Job (GitHub-gehostet) tauscht das ID-Token von GitHub gegen kurzlebige npm-
Anmeldedaten für diesen Lauf aus — kein langlebiges npm-Token in den Repository-Secrets, keine 2FA-Abfrage, Provenance angehängt.
Das ist der von npm vorgesehene Ersatz, da Tokens, die 2FA umgehen, abgeschafft werden;
dadurch wird der vollständig automatische Ablauf wiederhergestellt, den das Projekt bis v3.8.48 hatte, während die
WS1.3-Garantie bestehen bleibt (ein geleaktes Token kann nicht allein veröffentlichen — es gibt kein Token).

**Einmalige Einrichtung (Eigentümer):** npmjs.com → Paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: Eigentümer `diegosouzapw`, Repository `OmniRoute`, Workflow `npm-publish.yml`
(Umgebung: keine). Solange diese Konfiguration nicht vorhanden ist, schlägt der automatische Schritt mit `ENEEDAUTH` fehl:
erneut mit `publish_mode=staged` (siehe unten) oder `direct` auslösen.

### Gestufte Veröffentlichung (auf Anfrage — `publish_mode=staged`)

Der npm-publish-Workflow veröffentlicht nicht mehr direkt: Er startet den gepackten Tarball
(`check:pack-boot`) und führt anschließend `npm stage publish` aus — exakt diese Bytes werden in
der Registry zwischengespeichert und sind **nicht installierbar**, bis der Eigentümer sie genehmigt. Die menschliche 2FA-Freigabe erfolgt
nun NACH dem Nachweis, nicht davor.

**Ablauf für den Eigentümer, nachdem der Workflow grün ist:**

1. `npm stage list omniroute` — die Stage-ID ermitteln (sie wird auch in der Workflow-Zusammenfassung ausgegeben).
2. Die bereitgestellten Bytes überprüfen (empfohlen): `npm stage download <id>`, anschließend den
   heruntergeladenen Tarball in ein temporäres Präfix installieren und starten (`npm run check:pack-boot` automatisiert
   dieselbe Packen→Installieren→Starten-Prüfung in CI).
3. `npm stage approve <id>` — die 2FA-Abfrage IST die Veröffentlichung. `npm stage reject <id>` verwirft sie.
4. Sicherheitsnetz nach der Veröffentlichung: Der Post-Publish-Verifizierer (WS1.4 des v3.8.49-Plans) installiert die
   veröffentlichte Version aus der öffentlichen Registry in einem sauberen Container und startet sie.

**Notfall-Fallback:** `workflow_dispatch` mit `publish_mode=direct` stellt das
bisherige sofortige `npm publish` wieder her (nur verwenden, wenn das Staging selbst fehlerhaft ist; Grund dokumentieren).

**Einmalige Härtung (Eigentümer, npmjs.com):** Den Trusted Publisher für
`omniroute` im „stage-only“-Modus konfigurieren, damit ein geleaktes langlebiges Token nicht direkt von einem beliebigen Ort aus
`npm publish` ausführen kann — CI kann nur bereitstellen; ausschließlich die 2FA des Eigentümers veröffentlicht.

**Vorgehensweise bei defakten Artefakten (unverändert):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
als Standardreaktion (innerhalb von Minuten, umkehrbar); `npm unpublish` nur innerhalb des 72-Stunden-/Keine-Abhängigen-
Zeitfensters und niemals als erste Maßnahme. Docker: Ein Versions-Tag niemals überschreiben — ein Rollback bedeutet,
`latest` wieder auf den letzten funktionsfähigen Digest zu verweisen.

**Docker Hub `latest` (bei jeder stabilen SemVer-Veröffentlichung erforderlich):** Der
`docker-publish`-Workflow muss **sowohl** `X.Y.Z` als auch, sofern
`should-promote-latest.sh` bestätigt, dass es sich um die höchste stabile SemVer-Version handelt, `:latest`
mit **demselben Digest** taggen. Nach dem Job: Der Digest von Hub `latest` entspricht dem neuen
SemVer-Digest und `last_updated` wurde aktualisiert. `:latest` darf nicht auf einem älteren
Build verbleiben, während die Release Notes Korrekturen beschreiben, die nur in Git vorhanden sind. Compose-
Schnellstarts verwenden `:latest`; GitOps sollte weiterhin `X.Y.Z` fest vorgeben. Siehe
[Docker-Release-Kanäle](../guides/DOCKER_GUIDE.md#release-channels) und #10317.

## Hotfix-Schnellspur (Label `hotfix`)

Ein mit `hotfix` gekennzeichneter PR überspringt die umfangreiche CI-Matrix (E2E mit 9 Shards, Coverage-Ratchet,
Quality-Gate, Quality-Extended) und behält die schnellen Gates mit hoher Aussagekraft bei: Build,
Unit-Shards, Integration, Vitest, Lint/Typecheck, Docs-Sync, `check:pack-artifact`
und den Boot-Smoke-Test des Tarballs (`check:pack-boot`). Ziel: grün in ≤15 Min. statt in ~33 Min.

**Zugangsrichtlinie — alle vier Voraussetzungen sind erforderlich (nach dem Vorbild der Notfallspuren von Chromium/VS Code/Node):**

1. **Schweregrad**: Die Produktion ist defekt — ein veröffentlichtes Artefakt stürzt beim Start ab /
   ein Sicherheitsfix / jeder Benutzer des Releases ist betroffen. „Wichtig“ bedeutet nicht „defekt“.
2. **Berechtigung**: Nur der Repository-Eigentümer wendet das Label `hotfix` an. Das Label IST
   die Genehmigung — bei einem Kampagnen-PR darf es niemals eigenmächtig verwendet werden.
3. **Nachweis**: Der PR-Text verlinkt den vorherigen vollständig grünen umfangreichen Lauf (die Suite,
   die von den übersprungenen Jobs erneut validiert würde) sowie den eigenen Test des Fixes, der zuerst fehlschlägt und anschließend erfolgreich ist.
4. **Umfang**: Nur Cherry-Pick — der minimale Fix, keine Refactorings, keine beiläufig mitgenommenen Änderungen.

Die übersprungene Coverage-/Ratchet-Oberfläche wird durch den nächsten vollständigen Lauf auf dem
Release-Branch erneut validiert (kontinuierlich grüner Release-Status) — die Spur überspringt nur das WARTEN, niemals die Validierung.
Reine Test-Diffs (alle Dateien unter `tests/`, keine unter `tests/e2e/`) überspringen die E2E-
Matrix automatisch und ohne Label.

## Detaillierte Checkliste

### Vorabversion

- [ ] Alle für diese Version vorgesehenen PRs werden mit `release/vX.Y.0` zusammengeführt
- [ ] Alle offenen Linear/issue Elemente für diese Version werden geschlossen oder auf den nächsten Meilenstein verschoben
- [ ] CI grün auf `release/vX.Y.0` Zweig
- [ ] Keine `TODO(release)` -Markierungen im Code: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker Basisimage auf dem neuesten Stand (derzeit `node:24.15.0-trixie-slim`)

### Version und Änderungsprotokoll

- [ ] Führen Sie `/version-bump-cc <patch|minor|major>` aus (Claude Code-Skill)
  - Unebenheiten `package.json`, `electron/package.json`
  - Generiert `CHANGELOG.md` aus Git-Commits seit dem letzten Tag neu
  - Aktualisiert README.md Abzeichen
- [ ] Überprüfen Sie CHANGELOG.md manuell und bereinigen Sie Commit-Nachrichten bei Bedarf
- [ ] Stellen Sie sicher, dass der neueste Semver-Abschnitt in `CHANGELOG.md` mit `package.json` Version übereinstimmt
- [ ] Behalten Sie `## [Unreleased]` als ersten Changelog-Abschnitt für anstehende Arbeiten bei
- [ ] Das Update `docs/openapi.yaml` → `info.version` muss mit `package.json` Version übereinstimmen

### Codequalität

- [ ] `npm run lint` — 0 Fehler (Warnungen liegen bereits vor)
- [ ] `npm run typecheck:core` — sauber
- [ ] `npm run typecheck:noimplicit:core` — sauber (streng)
- [ ] `npm run check:cycles:ratchet` — innerhalb der gefrorenen `metrics.cycles` Decke (nackter `check:cycles` verlässt 1 in jedem Zyklus, #15281)
- [ ] `npm run check:any-budget:t11` — innerhalb des Budgets
- [ ] `npm run check:route-validation:t06` — sauber
- [ ] `npm run check:node-runtime` — unterstützte Laufzeituntergrenze erfüllt (`>=22.22.2 <23`, `>=24.0.0 <27`, pro `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; abgestimmt auf `package.json` `engines`)

### Testen

- [ ] `npm run test:unit` — pass
- [ ] `npm run test:vitest` — pass (MCP Server, autoCombo, Cache)
- [ ] `npm run test:coverage` — Tor 60/60/60/60 zufrieden (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (bei Änderungen berühren Sie DB / Handler)
- [ ] `npm run test:combo:matrix` — pass (Combo-Strategiematrix: beweist die Auswahlentscheidungen aller 22 öffentlichen Routing-Strategien deterministisch; wird ausgeführt, wenn Combo-Routing, Strategieauflösung oder Fallback-Logik berührt werden)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (Gated Real-Upstream Smoke; bezieht einen schreibgeschützten DB Snapshot von VPS `root@192.168.0.15`; trifft echte Anbieter, kostet Credits; läuft nie in CI; überspringt sauber ohne das Gate)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS Live Smoke: 7 HTTP Szenarien gegen den Live `.15` Server über einfachen Knoten ESM; erfordert `ssh root@192.168.0.15`; creates/deletes nur `__live_test__*` Kombinationen; trifft echte Anbieter; läuft nie in CI)
- [ ] `npm run test:e2e` — pass (UI ändert sich)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A ändert sich)
- [ ] `npm run test:ecosystem` — pass

### Haken (Husky validiert)

Husky-Hooks leben in `.husky/` und werden automatisch bei Git-Operationen ausgeführt.

- **Vorab festlegen:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **Vorschub:** schnelle deterministische Tore — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiviert am 13.06.2026). Schließt absichtlich `test:unit` aus (langsam; abgedeckt durch den CI `test-unit` Job).
  - Führen Sie `npm run test:unit` manuell aus, bevor Sie Release-Zweige verschieben.

Wenn ein Hook fehlschlägt: Beheben Sie das zugrunde liegende Problem und umgehen Sie es nicht mit `--no-verify`.

### Konventionelle Commits

Alle releasegebundenen Commits müssen dem `type(scope): subject` Format folgen.

**Gültige Typen:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Gültige Bereiche:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Wichtige Änderungen: `BREAKING CHANGE:` Fußzeile oder `!` nach dem Bereich hinzufügen (z. B. `feat(api)!: drop /v0`).

### Dokumentation

- [ ] `npm run check:docs-sync` besteht (automatische Ausführung durch Pre-Commit)
- [ ] `npm run check:docs-all` besteht (Umbrella: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` beendet 0 — Code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env-Vertrag ist intakt
- [ ] `npm run check:doc-links` beendet 0 — keine defekten internen Markdown-Referenzen nach der Umstrukturierung
- [ ] `docs/architecture/ARCHITECTURE.md` auf storage/runtime Drift überprüft
- [ ] `docs/guides/TROUBLESHOOTING.md` überprüfte die Umgebungsvariable und die Betriebsdrift
- [ ] Wenn sich `.env.example` geändert hat: `docs/reference/ENVIRONMENT.md` aktualisiert
- [ ] Wenn eine neue Funktion ein UI hat: `docs/guides/USER_GUIDE.md` erwähnt es
- [ ] Wenn die neue Funktion API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aktualisiert hat
- [ ] Wenn es sich bei der neuen Funktion um ein Modul handelt: Es ist ein dediziertes `docs/<MODULE>.md` vorhanden
- [ ] Bei Breaking Change: `docs/guides/TROUBLESHOOTING.md` hat einen Migrationshinweis

### i18n

- [ ] `npm run i18n:check` beendet 0 — Übersetzungsstatus (`.i18n-state.json`) in Synchronisierung mit Quelldokumenten (keine verschobenen Quellen im strikten Modus; Warnungsmodus-Hinweis ist für Dokumentkorrekturen in letzter Minute akzeptabel, sollte aber vor dem Markieren 0 sein)
- [ ] `npm run i18n:check-ui-coverage` beendet 0 — jedes UI Gebietsschema bei oder über der 80 %-Abdeckungsuntergrenze
- [ ] `npm run i18n:sync-ui:dry` meldet 0 fehlende Schlüssel in allen 66 Zielgebietsschemas (jedes Gebietsschema außer der `en` Quelle).
- [ ] Wenn sich die englischen Quelldokumente geändert haben, führen Sie vor dem Taggen `npm run i18n:run` aus (erfordert `OMNIROUTE_TRANSLATION_API_KEY` in `.env`).
- [ ] Übersetzungsbeiträge können auf die nächste Veröffentlichung verschoben werden, wenn sie geringfügig sind (Spur in CHANGELOG).

### Datenbankmigrationen

- [ ] Wenn `src/lib/db/migrations/` neue Dateien hat:
  - [ ] Jede Migration ist idempotent (`CREATE TABLE IF NOT EXISTS` usw.)
  - [ ] In Transaktionen verpackte Migrationen
  - [ ] Korrekt nummeriert (keine Lücken in der Reihenfolge)
- [ ] Test bei Neuinstallation: Löschen Sie `~/.omniroute/omniroute.db` und führen Sie `npm run dev` aus
- [ ] Testen Sie die vorhandene Installation: Sichern Sie DB, führen Sie die Migration aus und überprüfen Sie das Schema
- [ ] WAL Dateien (`-wal`, `-shm`) werden korrekt behandelt, wenn bei der Migration Tabellen neu geschrieben werden

### Anbieterkatalog (Zod-validiert)

- [ ] `src/shared/constants/providers.ts` Zod Schema zum Ladezeitpunkt gültig
  - [ ] Alle Anbieter verfügen über Pflichtfelder (`id`, `label`, `kind` usw.)
  - [ ] `freeNote` sorgte für neue kostenlose Anbieter
  - [ ] OAuth Anbieter haben `oauthConfig` in `src/lib/oauth/constants/oauth.ts` registriert
- [ ] Wenn neuer Anbieter hinzugefügt: entsprechender Executor in `open-sse/executors/`
- [ ] Bei Nicht-OpenAI-Format: Übersetzer in `open-sse/translator/`
- [ ] Im `open-sse/config/providerRegistry.ts` registrierte Modelle
- [ ] Unit-Tests zur Klassifizierung und Weiterleitung von `tests/unit/` -Anbietern

### Desktop (Electron)

Wenn sich `electron/` geändert hat:

- [ ] `npm run electron:smoke:packaged` geht vorbei
- [ ] Builds, die für mindestens eines von `:win`, `:mac` und `:linux` getestet wurden
- [ ] Code Signing-Zertifikate sind nicht abgelaufen (bei Signierung)
- [ ] `electron/package.json` Version entspricht dem Root- `package.json`
- [ ] Der Kanalzeiger für die automatische Aktualisierung wurde aktualisiert, wenn er für `stable` freigegeben wurde

### Build-Layout

Das Repository verwendet drei unterschiedliche Ausgabeverzeichnisse — niemals verwechselt werden sollten:

| Verzeichnis | Zweck                                                              | Verfolgt?        |
| ----------- | ------------------------------------------------------------------ | ---------------- |
| `src/`      | Anwendungsquelle (TypeScript / TSX)                                | Ja               |
| `.build/`   | Erstellen Sie Zwischenprodukte — `next build` -Ausgabe (`distDir`) | Nein (ignoriert) |
| `dist/`     | Lieferbares NPM-Bundle — zusammengestellt von `assembleStandalone` | Nein (ignoriert) |

> **Betreiberhinweis:** Das Remote- VPS Image-Verzeichnis bleibt `/usr/lib/node_modules/omniroute/app/`. Nur die** im Repo** Build-Ausgabe verschoben (`app/` → `dist/`). Die Bereitstellungsfähigkeiten rsync `dist/` Inhalte in das Remote- `app/` Verzeichnis — keine Änderungen VPS -Pfads erforderlich.

**Ablauf für einen einzelnen Build:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Führen Sie NOT `npm run build` aus, gefolgt von einem separaten `npm run build:cli` für die Bereitstellung — Verwenden Sie `npm run build:release` das einen sauberen + Sentinel-Neuaufbau in einem Befehl durchführt.

### Artefaktvalidierung

- [ ] `npm run build:release` ist erfolgreich und `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` reinigt — ohne `app.__qa_backup`, `scripts/scratch`, `package-lock.json` oder andere lokale Rückstände
- [ ] `dist/server.js` existiert nach dem Build
- [ ] Optionaler lokaler gepackter Laufzeitrauch: `npm run dev:candidate -- validate` nach `npm run dev:candidate -- build` bootet den gepackten Tarball auf einem isolierten `DATA_DIR` und überprüft `/api/health` + `/v1/models` (siehe [Beitrag Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Markieren und Freigeben

- [ ] Führen Sie `/generate-release-cc` (Claude -Code-Skill) aus:
  - Erstellt das Tag `vX.Y.Z`
  - Pusht Tag und Branch
  - Öffnet GitHub Version mit dem Änderungsprotokolltext
  - Hängt Electron -Installer an (falls erstellt)
- [ ] Oder manuell:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Einsetzen

Bereitstellungsfähigkeiten verwenden den leichten Rsync-Flow — nein `npm pack`, nein `npm i -g`:

- [ ] Verwenden Sie den Bereitstellungs-Skill, der dem Ziel entspricht:
  - `/deploy-vps-local-cc` — lokal VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — beides
- [ ] Bestätigen Sie vor der Bereitstellung `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build muss dort ausgeführt werden, wo `node_modules` real ist (Haupt-Checkout oder `npm ci`'d worktree — NOT ein symbolischer Arbeitsbaum)
- [ ] Bereitgestellte Instanz des Rauchtests:
  - Öffnen Sie `/dashboard/health` → und prüfen Sie, ob die Versionszeichenfolge mit der Version übereinstimmt
  - Führen Sie eine `/v1/chat/completions` Anfrage bei einem bekannten Anbieter aus
  - Überprüfen Sie, `/api/monitoring/health` `CLOSED` -Leistungsschalter zurückgibt
  - Bestätigen Sie, dass MCP Transporte antworten (`/mcp` HTTP, `/mcp-sse` SSE).

### Nach der Veröffentlichung

- [ ] Führen Sie `/capture-release-evidences-cc` aus (Claude Code-Skill)
  - Erfasst WebP screenshots/recordings neuer Funktionen
  - Wird den Versionshinweisen/Blogbeiträgen beigefügt
- [ ] Aktualisieren Sie GitHub Discussions / Discord mit der Veröffentlichungsankündigung
- [ ] Offener Meilenstein für die nächste Version
- [ ] Wenn kritisch: Diskussion anpinnen oder im `news.json` für In-App-Banner posten

### Öffentliches Radar-Starttor

Die Radarankündigung erfolgt absichtlich mit `active: false`. Die Aktivierung ist eine separate Änderung, nachdem jedes der folgenden Elemente nachgewiesen wurde:

- [ ] Alle gestapelten Radar- PRs werden zusammengeführt und der Release-Tip CI ist grün
- [ ] Stellen Sie die OSS -Radarrouten bereit und räuchern Sie sie, während `RADAR_ENABLED` standardmäßig noch deaktiviert ist
- [ ] Rauchen Sie `GET /planos`, `/termos`, `/privacidade` und `/reembolso` auf dem genannten Radar-Host
- [ ] Plattenbetreiber identity/contact/address und inhabergenehmigte Rechtsprüfung im privaten Dienst
- [ ] Üben Sie Stripe Checkout und den signierten Webhook nur im Testmodus aus
- [ ] Führen Sie eine verschlüsselte Transaktions-E-Mail-Zustellung mit dem genehmigten sender/domain durch
- [ ] Nachweis der Backup-Wiederherstellung und eines überwachten, budgetbegrenzten Forschungslaufs
- [ ] Genehmigen Sie die BRL/PIX -Überprüfungsrichtlinie, bevor Sie Spendennachweise annehmen
- [ ] Aktivieren Sie den öffentlichen Checkout erst nach den vorherigen Toren und aktivieren Sie dann das neue `news.json` ID
- [ ] Stellen Sie sicher, dass das Home-Banner eine lokalisierte Kopie verwendet und ein neues ID erneut angezeigt wird, nachdem ein älteres ID verworfen wurde

## Smoke-Test für eingebettete Dienste (v3.8.4+)

Vor der Veröffentlichung eines Releases, das Änderungen an eingebetteten Diensten enthält, Folgendes überprüfen:

### Start mit frischer DB (erkennt Migrationskollisionen — nach dem v3.8.4-Hotfix hinzugefügt)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 10 s auf den Start warten
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` gibt `"9router"` zurück (NICHT 404, NICHT 500). Bestätigt, dass die Migration `071_services.sql` angewendet und die Zeile eingefügt wurde.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` gibt 3 Zeilen zurück.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` gibt 2 Zeilen zurück (bestätigt, dass `070_webhooks_kind_metadata.sql` angewendet wurde).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` wird erfolgreich ausgeführt — schützt vor zukünftigen Kollisionen.

### 9Router

- [ ] `POST /api/services/9router/install` gibt innerhalb von 2 min den Status 200 mit `installedVersion` zurück
- [ ] `POST /api/services/9router/start` gibt innerhalb von 30 s den Status 200 und `state: "running"` zurück
- [ ] `GET /api/services/9router/status` meldet `health: "healthy"`
- [ ] `POST /v1/chat/completions` mit `"model": "9router/auto/..."` gibt den Status 200 zurück (End-to-End-Routing über 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` rendert die native Benutzeroberfläche von 9Router innerhalb des Proxys (kein direktes `127.0.0.1:port`-iframe)
- [ ] `POST /api/services/9router/rotate-key` gibt `{ keyRotated: true }` zurück und der Dienst wird ordnungsgemäß neu gestartet
- [ ] `POST /api/services/9router/stop` gibt den Status 200 und `state: "stopped"` zurück
- [ ] `GET /api/services/9router/logs?tail=50` gibt einen SSE-Stream mit einem `snapshot`-Ereignis zurück, das die letzten Zeilen enthält
- [ ] Die Installation in einer Umgebung ohne `npm` im PATH gibt den Status 500 mit einer verständlichen Fehlermeldung (ohne Stacktrace) zurück

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` gibt innerhalb von 2 min den Status 200 zurück
- [ ] `POST /api/services/cliproxy/start` gibt innerhalb von 30 s den Status 200 und `state: "running"` zurück
- [ ] `GET /api/services/cliproxy/status` meldet `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` gibt den Status 200 und `state: "stopped"` zurück
- [ ] `GET /api/services/cliproxy/logs?tail=50` gibt einen SSE-Stream zurück

### Sicherheitsregression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` gibt `403 LOCAL_ONLY` zurück
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` gibt `403 LOCAL_ONLY` zurück
- [ ] Fehlerantworten von `/api/services/*` enthalten weder `err.stack` noch absolute Dateipfade

## Prüfungen für v3.8.0+

Vor der Veröffentlichung eines v3.8.x-Releases diese zusätzlichen Punkte überprüfen:

- [ ] `omniroute --tray` startet unter macOS (systray2 wurde in `~/.omniroute/runtime/` installiert)
- [ ] `omniroute --tray` startet unter Linux (erfordert DISPLAY; verständliche Fehlermeldung, falls nicht festgelegt)
- [ ] `omniroute --tray` startet unter Windows (PowerShell NotifyIcon, keine zusätzlichen Binärdateien)
- [ ] `omniroute config tray enable` erstellt einen Autostart-Eintrag; die Deaktivierung entfernt ihn
- [ ] `npm install -g omniroute@<this-version>` führt postinstall ohne schwerwiegenden Abbruch aus
- [ ] Der Aktualisierungspfad behält optionale Abhängigkeiten bei: `omniroute update --apply` und der automatische Updater
      führen `npm install -g … --include=optional` aus, sodass `optionalDependencies` (better-sqlite3,
      keytar, tls-client und der llmlingua-SLM-Stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) eine Aktualisierung überstehen. Die Ultra-SLM-Stufe `modelPath` benötigt außerdem das
      tinybert-Modell, das bei der ersten Verwendung automatisch nach `${DATA_DIR}/models/llmlingua` heruntergeladen wird. Postinstall
      (`scripts/build/colocateOptionals.mjs`) legt anschließend den optionalen SLM-Abhängigkeitsbaum gemeinsam in
      `dist/node_modules` ab, sodass der Worker eine EINZIGE Instanz von `@huggingface/transformers` ^4.2.0
      auflöst — der eigenständige Trace bündelt nur transformers, nicht die dynamisch importierten
      optionalen Abhängigkeiten. Ohne dies würde der Worker llmlingua-2 mit transformers aus dem Stammverzeichnis laden
      und die SLM-Stufe würde unbemerkt im Fail-open-Modus ausfallen.
- [ ] `omniroute status` funktioniert ohne `.env` (CLI-Token-Pfad, nur Loopback)
- [ ] `curl http://localhost:20128/api/shutdown` gibt den Status 401 zurück (immer geschützte Route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` gibt den Status 401 zurück (Loopback-Schutz)
- [ ] Die SQLite-Laufzeit wird beim ersten Start als `bundled` aufgelöst (gebündelte Binärdatei ist für die Plattform gültig)
- [ ] Die SQLite-Laufzeit fällt auf `runtime` zurück, wenn `node_modules/better-sqlite3` gelöscht wird
- [ ] Der intelligente MCP-Filter komprimiert die reale Ausgabe von `playwright-mcp browser_snapshot` (Reduzierung um ≥50 %)
- [ ] Alle 10 Dateien unter `skills/omniroute*/SKILL.md` sind öffentlich über eine rohe GitHub-URL abrufbar
- [ ] Der Onboarding-Assistent zeigt bei einer neuen Einrichtung den Stufenüberblick „Funktionsweise“ an
- [ ] Das Stufenabdeckungs-Widget des Home-Dashboards zeigt die Anzahl der konfigurierten/aktiven Stufen an

---

## 3.9.0-LTS-Abzweigung (in 3.8.58 erprobt)

Nach v3.8.59 ist die nächste Version 3.9.0, und ihre Spitze wird zum Ausgangspunkt zweier langlebiger Branches:
`stable/v3` (die v3-LTS-Linie, npm `latest`) und `develop` (v4, auf 4.0.0 angehoben, npm
`nightly`). Das Branch-/Kanalmodell, der Forward-Port und die Labels sind in
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) beschrieben; der Plan befindet sich in der [ROADMAP](../../ROADMAP.md) (Phase 3). Die Abzweigung wird einmal durchgeführt;
3.8.58 erprobt sie vollständig auf einem Fork, und 3.8.59 schließt mit der
[GO/NO-GO-Checkliste](./LTS_GO_NO_GO.md) ab.

### Probelauf (schreibgeschützt, jederzeit sicher)

```bash
npm run release:dry-run-lts-cut                       # die echte Abzweigung: 3.9.0 von HEAD, vorheriges Tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # Quell-Commit festlegen
```

`scripts/release/dry-run-lts-cut.mjs` führt nichts aus: Es liest git und `gh` aus und gibt die
gesamte Abfolge aus — Voraussetzungen (die Quelle kann aufgelöst werden, das Quell-Repository verfügt über den vollständigen Verlauf —
ein flacher Klon kann `stable/v3` nicht pushen, die empfangende Seite weist das Paket beim ersten
aufgepfropften Parent zurück; führen Sie die Abzweigung daher von einem vollständigen Klon aus oder führen Sie zuerst
`git fetch --unshallow origin` aus — das vorherige Tag ist vorhanden, `package.json` enthält die Zielversion, ein
`release-freeze`-Issue ist offen, es gibt kein offenes
`Release branch not green`-Issue
auf einem vorhandenen Release-Branch — ein nicht vorhandener Branch meldet `?` als unbekannt, niemals
grün — die Mergify-`release`-Queue ist konfiguriert (G11: `queue_rules`, `checks_timeout`,
Label `queue`), das `release/*`-Regelwerk blockiert weiterhin das Löschen und Force-Pushes, und
`stable/v3` sowie `develop` sind noch nicht vorhanden), die beiden Branch-Schritte, welche Trigger
inaktiver Workflows und `if:`-Bedingungen wahr werden (und welche weiterhin durch eine Repository-Variable
gesperrt oder auf das kanonische Repository festgelegt bleiben), die erwarteten Dist-Tags (`latest` → 3.9.0,
`next` und `nightly` leer) sowie das Rollback. Exit `0` = `RESULT: READY`, `1` = eine blockierende Voraussetzung
ist fehlgeschlagen (`✗`), `2` = Verwendungsfehler. `--advisory <id,...>` stuft eine Prüfung zu einer Warnung (`!`)
herab, ohne sie auszublenden.

Führen Sie den Probelauf der echten Abzweigung aus, solange der Release-Freeze für 3.9.0 noch aktiv ist — die Branches werden
nach dem Tag und bevor Phase 12c den Freeze aufhebt erstellt.

### 3.8.58-Erprobung (nur Fork)

```bash
# 1. Probelauf auf der aktuellen Spitze mit Erprobungsparametern
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Gegen ein FORK-Remote ausführen (origin oder jedes Remote, dessen URL dem kanonischen
#    Repository entspricht, wird abgelehnt; jeder Schritt fordert im Terminal eine Bestätigung an)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Die inaktiven Workflows im Fork durchlaufen lassen (workflow_dispatch, wenn der Probelauf
#    eine Festlegung auf das kanonische Repository meldet), anschließend zurücksetzen
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Der Commit zum Anheben von develop wird mit Git-Plumbing erstellt (der Arbeitsbaum bleibt unberührt) und hebt
dieselben fünf Dateien wie ein Commit zur Zykluseröffnung an: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` und `docs/openapi.yaml`. Der Abschnitt `[4.0.0]`
im CHANGELOG und seine i18n-Entsprechungen werden anschließend auf `develop` eröffnet, noch vor dessen erstem
PR. Das Skript ändert niemals npm-Dist-Tags — erproben Sie diese mit einem Wegwerf-Paket.

### PR-Vorschauartefakt (einmal bauen, dieselben Bytes übernehmen)

`.github/workflows/preview-artifact.yml` erstellt einen Produktions-Tarball von der Spitze eines PRs und
validiert exakt diesen Build (Ausschnitt (a) von #8084). Nur PRs aus demselben Repository; es wird nichts veröffentlicht.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # oder das Label `preview-artifact` hinzufügen
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # Vorschauinstallation
```

Der Lauf führt `npm ci`, `npm run build:release` und `npm run check:pack-artifact` aus, packt den
Tarball, führt `npm run check:pack-boot` aus (gefälschte Secrets, temporäres Datenverzeichnis), packt ihn
erneut und schlägt fehl, sofern der Digest nicht identisch ist. Anschließend zeichnet er
`artifact-identity.json` auf (Head-SHA, Base-SHA, Lockfile-Hash, Plattform, Architektur, Node-ABI,
Bundler, Build-Richtlinie — `scripts/release/artifact-identity.mjs`) und attestiert den Tarball in einem
separaten Job. Eine Vorschau zu übernehmen bedeutet, diesen Tarball zu installieren: niemals erneut aus
dem Quellcode bauen.

### Die Abzweigung (3.9.0, nach GO)

1. GO ist in [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) festgehalten.
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` gibt `RESULT: READY` aus.
3. Erstellen Sie die Branches auf `origin` manuell mit den vom Probelauf ausgegebenen Befehlen — das
   Skript verweigert Pushes zu `origin`. Um einen geprüften develop-Commit wiederzuverwenden, führen Sie
   zunächst die `--execute`-Erprobung auf der 3.9.0-Spitze gegen Ihren Fork aus; sie gibt beide SHAs aus,
   und dieselben Commits können gepusht werden:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Schützen Sie `stable/v3` und `develop` (Regelsätze + Merge-Warteschlange), bevor der erste PR eingeht.
5. Die inaktiven Workflows werden durch die Existenz der Branches aktiviert: `forward-port.yml` (Push auf
   `stable/v3`), `validate-stable-pr.yml` (PRs für `stable/v3`) und `nightly-v4-build.yml`
   (baut `develop`). Legen Sie vor der Inbetriebnahme das Repository-Secret `secrets.FORWARD_PORT_TOKEN` fest (damit CI für
   Forward-Port-PRs ausgeführt wird); die nächtliche Veröffentlichung bleibt deaktiviert, bis der Verantwortliche die Repository-
   Variable `vars.NIGHTLY_PUBLISH` auf `true` setzt und npm Trusted Publishing
   `nightly-v4-build.yml` akzeptiert. Die Kanalauflösung erfolgt über `scripts/release/dist-tag.mjs`, denselben
   Resolver, den `npm-publish.yml` verwendet.
6. Überprüfen Sie die Kanäle: `npm view omniroute dist-tags --json` zeigt `latest` = 3.9.0 und kein
   `next` / `nightly`, bis v4 veröffentlicht wird.
7. Rollback, falls erforderlich: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   und `npm dist-tag add omniroute@3.8.59 latest`.

---

## Rollback

Wenn ein Release ein kritisches Problem aufweist:

1. `gh release edit vX.Y.Z --prerelease` (markiert es als nicht neueste Version)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (nur, wenn es noch nicht von Benutzern übernommen wurde)
3. Oder: Hotfix auf `release/vX.Y.0` → Patch-Release `vX.Y.(Z+1)`
4. Sofort in GitHub Discussions und Discord kommunizieren

## Strikte Regeln

- Niemals direkt nach `main` committen
- Niemals `git push --force` für `main` oder `release/*`-Branches verwenden
- Niemals Husky-Hooks überspringen (`--no-verify`)
- Niemals Secrets, Anmeldedaten oder `.env`-Dateien committen
- Die Testabdeckung muss bei ≥60/60/60/60 (Anweisungen/Zeilen/Funktionen/Verzweigungen) bleiben
- Bei Änderungen am Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` immer Tests hinzufügen oder aktualisieren

## Automatisierte Synchronisierungsprüfung

Vor dem Öffnen eines PR den Schutzmechanismus für die Dokumentationssynchronisierung lokal ausführen:

```bash
npm run check:docs-sync
```

CI führt diese Prüfung ebenfalls in `.github/workflows/ci.yml` (Lint-Job) aus.
