# Quality Gates Reference (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dieses Dokument ist die verbindliche Referenz für alle CI-Qualitätsprüfungen in OmniRoute.
Es beschreibt jede Prüfung, was sie validiert, in welchem CI-Job sie ausgeführt wird, ob sie
eine Ratchet-Baseline oder eine Bestanden/Nicht-bestanden-Richtlinie verwendet und ob sie den Build blockiert oder nur informativen Charakter hat.

Eine kurze Zusammenfassung und die Allowlist-Richtlinie finden Sie im Abschnitt „Quality Gates & Ratchets“
in `AGENTS.md`. Die kritische Bewertung, Reifegradklassifizierung und den werkzeugunabhängigen
Replikationsplan desselben Systems finden Sie im
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Torbestands- und Ausführungsprofile

### Kandidatenzulassung

Die Workflows CI und Quality Gates geben jeweils ein stabiles Urteil aus: `Gate / CI` und `Gate / Quality`. Ihre versionierte Zulassungsrichtlinie listet jeden Upstream-Job nach Bedarf oder Empfehlung auf. Ein anwendbarer erforderlicher Job muss erfolgreich sein: Fehlende, abgebrochene, übersprungene, ausstehende und unbekannte Ergebnisse können PASS nicht ermitteln. Eine gültige Nur-Dokumente- oder Nur-Katalog-Klassifizierung kann dazu führen, dass eine Codespur nicht anwendbar ist. Ein PR -Entwurf ist kein akzeptierter Kandidat. Ein `hotfix` -Label verzichtet nicht auf Beweise.

Beide Workflows decken PRs in main/release Zweige, Push-Vorgänge zu `main`, manuelles Versenden und Merge-Group-Ereignisse ab. Push, Dispatch und Merge-Group führen die vollständige Auswahl aus. Pushs an `release/**` starten sie nicht (18.10.2026): Bei jeder Änderung wurde die Matrix bereits auf ihrem PR ausgeführt, und die zusammengeführte Kombination ist die Aufgabe von Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted Lane). Forks und Merge-Gruppen verwenden gehostete Läufer für Jobs, die ansonsten selbstgehostete Läufer auswählen; Vor der Einführung muss eine ausreichende gehostete Kapazität überprüft werden.

Ein gewöhnlicher PR führt die schnelle Auswahl aus. Die `full-code` und `full-code-e2e` Spuren der Zulassungsrichtlinie (E2E, Integration, Paketartefakt, Electron Smoke, Bun SQLite, Ökosystem- und Protokoll-Clients) werden nur bei einem Mergify-Warteschlangenentwurf oder bei einem vollständigen Lauf ausgeführt: `gh workflow run ci.yml --ref <branch>`.

### Warteschlange zusammenführen

Das `queue` Label sendet einen PR an die Mergify-Warteschlange (`.mergify.yml`). Mergify öffnet einen PR -Entwurf in einem `mergify/merge-queue/` Zweig, CI führt dort die vollständige Auswahl aus und der ursprüngliche PR wird zusammengeführt, wenn `Gate / CI`, `Gate / Quality` und `Merge integrity (changelog + generated skills)` übergeben werden.

Mergify schreibt seine Warteschlangenzusammenfassung in die Beschreibung des Entwurfs und andere Apps können sie auch bearbeiten. Ein `pull_request` `edited` -Ereignis für einen solchen Entwurf benötigt eine eigene Parallelitätsgruppe (`-queue-edit-<run_id>`), sodass es die tatsächliche Ausführung des Entwurfs nicht abbrechen kann und das Gate und die Matrix überspringt. Nur `Merge integrity` läuft noch. Der übersprungene Gate-Job trägt einen anderen Prüfnamen, da Mergify ein übersprungenes `Gate / CI` als fehlgeschlagene Prüfung liest und das PR aus der Warteschlange entfernt.

Nach einem Auszug aus der Warteschlange wird der PR durch einen Push nicht immer erneut in die Warteschlange gestellt. Kommentiere `@mergifyio queue` dazu.

Jeder JSON -Beleg identifiziert den ausgecheckten SHA, die Workflow-Ausführung und den Versuch. Der CLI lehnt eine checkout/event SHA Nichtübereinstimmung ab. Workflow-Tests binden die Richtlinienmitgliedschaft an die `needs` -Liste des Verdict-Jobs, sodass eine neue oder entfernte Spur nicht stillschweigend verschwinden kann. Die Belege decken ihren eigenen Arbeitsablauf ab, nicht die Veröffentlichung, Bereitstellung oder die Interna eines vorhandenen Beratungsscanners. Die Aktivierung beider Prüfnamen in Verzweigungsregeln ist eine separate administrative Änderung; Durch das Hinzufügen dieser Jobs wird ein Zweig nicht geschützt.

### Statisches Scan-Inventar

Das versionierte npm-alias-Inventar und die Static-Scan-Mitgliedschaft sind in `config/quality/gate-manifest.json` verfügbar. Führen Sie `npm run check:gate-manifest` aus, um Skriptnamen und genaue Befehle anhand von `package.json` zu validieren. Hinzufügungen, Entfernungen und Befehlsdrift schlagen sowohl beim lokalen Hook als auch bei den Änderungsklassifizierungsjobs in CI fehl. Ein Alias ist kein Workflow-Job, keine Matrixinstanz oder kein Testfall: Diese Zählungen dürfen nicht als austauschbar dargestellt werden.

Verwenden Sie `npm run quality:scan -- --list` oder `npm run quality:scan:fast -- --list` um die ausgewählten Aliase zu überprüfen, ohne sie auszuführen. Der Läufer ruft den NPM-Einstiegspunkt auf, sodass seine Laufzeit (einschließlich Bun sofern konfiguriert) erhalten bleibt. Das Manifest zeichnet Aliase außerhalb dieser Profile als separat aufgerufen auf, und Wartungsbefehle sind in schreibgeschützten Scanprofilen verboten.

Diese Profile decken nur den statischen Scan ab. Sie zertifizieren keine Produkttests, Abdeckung, Verpackung, externe Prüfungen oder die vollständige Freigabeabnahme eines Kandidaten. Für die Workflow-Zulassung werden die verknüpften Elemente `config/quality/admission-policy.json` und `scripts/quality/admission-verdict.mjs` verwendet. Release-Beobachter-Profile bleiben getrennt; die entsprechenden Schecks und Quittungen selbstständig prüfen. Die folgende Prosainventur ist eine Referenz und kein Beweis dafür, dass tatsächlich ein Tor geöffnet war.

Skripte laufen unter `scripts/check/` (Policy Gates) und `scripts/quality/` (Ratchet Engine). Die CI Quelle der Wahrheit ist `.github/workflows/ci.yml`.

### Geben Sie PR -Fast-Path (`quality.yml`) frei.

`.github/workflows/quality.yml` ergänzt CI auf main/release PRs, pusht auf `main`, versendet und führt Gruppen zusammen. PRs verwendet pfadgefilterte Schnellprüfungen. Der dauerhaft deaktivierte Duplikat-Build wurde entfernt; Die echten build/package/boot -Prüfungen verbleiben in CI. Die Unit Suite und vitest laufen nur in CI (`Unit Tests (N/8)` und `Vitest`).

| Arbeit                                           | Umfang                                                                                                                         | Blockierung               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs und docs-all                                                                                      | Ja                        |
| `Fast Quality Gates`                             | Code PRs; Statische Prüfungen, Typprüfung, Dashboard-Typprüfung, betroffene Unit-Tests, vergessene Geschwistertests (Beratung) |
| `No new ESLint warnings`                         | Code PRs; Unterdrückungsbewusster Flusenschutz                                                                                 | Ja, einschließlich Gabeln |
| `Merge integrity (changelog + generated skills)` | Nicht-Entwurfs- PRs; Änderungsprotokoll und generierte Skill-Synchronisierung                                                  | Ja, einschließlich Gabeln |

#### Bericht über vergessene Geschwistertests

`npm run check:forgotten-sibling-tests` wird als Beratungsschritt von `Fast Quality Gates` ausgeführt und verwendet den Import-Resolver hinter der Test-Impact-Map wieder. Für jedes geänderte Produktionsmodul werden deterministische `changed module/symbol -> static consumer -> candidate sibling test` Ketten gemeldet, wenn der Kandidatentest im Pull-Request-Diff fehlt. Die Markdown-Zusammenfassung und JSON Ergebnis werden als `forgotten-sibling-tests` -Workflow-Artefakt zur Kalibrierung vor einem blockierenden Rollout beibehalten.

Bei Fass-Reexporten und dynamischen Importen handelt es sich lediglich um Auflösungsdiagnosen. Sie erstellen niemals einen blockierenden Befund. Überprüfte Ausnahmen leben in `config/quality/forgotten-sibling-allowlist.json`. Jeder Eintrag muss den Verbraucher- und Kandidatentest benennen, eine spezifische Begründung angeben und einen GitHub -Issue- oder Pull-Request verlinken. Fehlerhafte Einträge können nicht geschlossen werden. Ausnahmen können einen gelöschten Kandidatentest oder einen Diff, der `.skip`/`.todo` hinzufügt, nicht unterdrücken. Behauptungsschwächung und andere Maskierungen verbleiben im Besitz des unabhängig blockierenden `check:test-masking` Gates.

### Arbeit: `lint`

Läuft auf jedem PR bis `main`. Bei einem Fehler werden Blöcke zusammengeführt.

| Skript (`npm run ...`)            | Validiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blockierung                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js Version liegt im unterstützten Bereich                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                       |
| `check:cycles`                    | Zirkuläre Importe in ganz `src/` + `open-sse/` (AST-basiert, tsconfig `paths` gelöst). Bare beendet 1, wann immer ein Zyklus existiert (nicht geschlossen seit #15281) und listet die SCCs auf. `check:cycles:ratchet` (was CI ausführt) blockiert, wenn die Anzahl die `metrics.cycles` Obergrenze in `quality-baseline.json` — überschreitet, derzeit 14, `direction: down`, sodass es nur fallen kann (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja (Ratsche)                             |
| `check:boundary`                  | `open-sse → src` Kopplung: Eindeutige Datei-zu-Datei-Importe von der Engine in die App (`scripts/quality/measure-boundary.mjs`; die Edge-Liste ist der v4- core/module-split -Remediation-Backlog). Bare = -Beratungsbericht (identisch mit `quality:boundary`). `check:boundary:ratchet` (was CI läuft, auch in der `quality.yml` Fast-Gates-Ratschenschleife) blockiert, wenn die Zählung die `metrics.boundaryOpenSseToSrc` Obergrenze in `quality-baseline.json` — überschreitet, gesät bei der gemessenen 771, `direction: down`; `--update` senkt es nur; Basisrelativ zu PRs (`--base-ref`, siehe unten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja (Ratsche)                             |
| `check:route-validation:t06`      | Zod Schemata auf allen Routen vorhanden (Tier-6-Richtlinie)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` Anzahl überschreitet nicht das Budget (Tier 11 Catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                       |
| `check:provider-consistency`      | Jeder Anbieter in `providers.ts` hat einen passenden Eintrag in `providerRegistry.ts` (und umgekehrt, innerhalb der Zulassungsliste)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                       |
| `check:model-lifecycle`           | Die drei handverwalteten Routing-Tabellen bleiben mit dem eingecheckten Lebenszyklus-Snapshot (#11503) konsistent: `FITNESS_TABLE` (`taskFitness.ts`) erhält keine zurückgezogene ID, die `REGISTRY` weiterleiten kann; Jedes `BUILT_IN_ALIASES` Ziel ist in `REGISTRY` vorhanden und fehlt im Retired-ID-Snapshot. jede ausgemusterte ID, die sich noch in `REGISTRY`, wird weitergeleitet oder in `allowedRetiredInCatalog` aufgelistet; und in diesem Snapshot scheint keine `DEFAULT_DEGRADATION_MAP` Quelle oder kein ZQI-Ziel veraltet zu sein. Dies beweist nicht, dass ein Modell derzeit von einem Live-Upstream bedient wird. Offline wird — mit `config/quality/model-lifecycle.json` verglichen, manuell aktualisiert mit `npm run quality:refresh-model-lifecycle` (Netzwerk; nicht mit CI verbunden). `allowedRetiredInCatalog` ist eine Burn-Down-Ratsche: Fügen Sie einen Eintrag nur bei Tracking-Problemen hinzu.                                                                                                                                             | Ja                                       |
| `check:fetch-targets`             | Jeder `fetch("/api/...")` im clientseitigen `src/` wird in einen echten `route.ts` aufgelöst                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                       |
| `check:deps`                      | Alle `npm install` -able -Abhängigkeiten in jedem `package.json` im Repo befinden sich in `dependency-allowlist.json`. Neue nicht angeheftete oder heruntergekommene Pakete wurden markiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `audit:deps`                      | `npm audit` (Wurzel- + Elektron) — keine high/critical Hinweise (Überschneidungen mit osv `check:vuln-ratchet`; siehe Rationalisierungsrückstand)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                       |
| `check:lockfile`                  | `package-lock.json` -Integrität — https-Registrierung, Integritäts-Hashes, keine Host-Überschreibungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                       |
| `check:licenses`                  | SPDX -Lizenzzulassungsliste für Produktionsabhängigkeiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                       |
| `check:tracked-artifacts`         | Keine Build-Artefakte / festgeschriebene `node_modules` Symlinks (läuft auch im Husky-Pre-Commit; Pre-Push ist absichtlich leicht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                       |
| `check:ai-attribution`            | Kein AI/bot `Co-Authored-By` Trailer oder AI-Generation-Fußzeile in PR -Commits, Titel oder Text — Harte Regel #16 (in der `quality.yml` Fast-Gates-Schleife für PR→ `release/**` — liest die Ereignisnutzlast, No-Op-off PRs — und einen nur PR-Schritt in `ci.yml` lint für PR→ `main`; auch der Husky `commit-msg` Hook; menschliche Co-Autoren erlaubt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Jeder Vitest Ausschluss benennt ein Tracking-Problem und erscheint in `config/quality/vitest-exclusions.json` (#13204).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                       |
| `check:file-size`                 | Quelldateien (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) bleiben in `cap` und Testdateien (`*.test.ts(x)`) in `testCap`; In `file-size-baseline.json` (`frozen` / `testFrozen`) eingefrorene Dateien dürfen ihre aufgezeichnete Größe nicht überschreiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                       |
| `check:error-helper`              | Fehlerantworten in executors/handlers verwenden `buildErrorBody()` / `sanitizeErrorMessage()` (harte Regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                       |
| `check:migration-numbering`       | Migrations- SQL Dateien sind fortlaufend nummeriert, es gibt keine Lücken oder Duplikate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                       |
| `check:public-creds`              | Keine wörtlichen OAuth `client_id`/`client_secret` oder Firebase-Webschlüssel außerhalb von `publicCreds.ts` (harte Regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                       |
| `check:db-rules`                  | Kein Roh- SQL außerhalb von `src/lib/db/` -Modulen; keine Barrel-Importe von `localDb.ts` (harte Regeln #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                       |
| `check:known-symbols`             | In ihren Dispatch-Tabellen registrierte Anbieter-Ausführer, Routing-Strategien und Übersetzer stimmen mit den Dateien auf der Festplatte überein — keine verwaisten oder nicht deklarierten Symbole vorhanden sind                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                       |
| `check:route-guard-membership`    | Jede Route, die einen untergeordneten Prozess erzeugt, wird durch `isLocalOnlyPath()` (harte Regeln #15/#17) klassifiziert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `check:test-discovery`            | Jede `*.test.ts` / `*.spec.ts` Datei im Repo wird von mindestens einem Testläufer gesammelt (Ratsche: Waisenliste in `test-discovery-baseline.json` kann nur verkleinert werden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                       |
| `check:test-tla-order`            | Keine `node:test` Datei unter `tests/unit` registriert einen Test, trifft auf einen `await` der obersten Ebene und registriert dann weitere (#18045; Ratsche: `test-tla-order-allowlist.json` kann nur schrumpfen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                       |
| `check:agent-skills-sync`         | Generierte Agentenfähigkeitsartefakte stimmen mit ihrem Quellkatalog überein (keine Abweichung)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Anbieter logos/assets führen einen dokumentierten Herkunftseintrag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON -Konfigurationsdateien analysieren und erfüllen die Repo-Lint-Regeln                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript -Kompilierung ohne Fehler (nur Hinweiswarnungen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `typecheck:noimplicit:core`       | Strenge `noImplicitAny` — zukunftsorientiert; Viele bereits bestehende Anrufseiten benötigen noch Anmerkungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Beratung** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` auf `src/app/(dashboard)/**` (#7033) beschränkt. — `typecheck:core` kuratierte Zulassungsliste mit 27 Dateien enthält kein Dashboard TSX, und `next build` führt auch nie eine Typprüfung durch (`next.config.mjs` setzt `ignoreBuildErrors: true`), so dass Regressionen mit verwaisten Bezeichnern dort (#6625/#6909) für CI unsichtbar waren. — zu einer eingefrorenen per-file/per-TS-code NEW Zählungsbasislinie (`config/quality/dashboard-typecheck-baseline.json`, dasselbe veraltete Erzwingungsmuster wie `check:known-symbols`). Ratsche mit `--update` nach unten, wenn ein bereits bestehender Fehler behoben ist.                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                       |
| `check:build-typecheck`           | Die Prüfung des gesamten App-Produktionstyps über `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), die 27-Dateien-Zulassungsliste von surface `typecheck:core` und das Dashboard-Gate decken nicht ab. Unterschiede zu `config/quality/build-typecheck-baseline.json`; Eine neue oder erhöhte Anzahl pro (Datei, Code) schlägt fehl, eine niedrigere Anzahl fordert Sie zum Ratschen auf. `--update` weigert sich, solange der Lauf ein neues oder erhöhtes Paar enthält, es sei denn `--force-regressions` wird übergeben, und lehnt eine neu zum Schweigen gebrachte Datei ab, es sei denn, `--force-nocheck` wird übergeben. Daher sind das Erweitern der Grundlinie, um grün zu werden, und das Gewähren einer permanenten Stille zwei separate bewusste Handlungen. Ein nackter `--force` wird abgelehnt. Scannt auch den Build-Bereich für `@ts-nocheck` gegen `config/quality/ts-nocheck-baseline.json`, da eine Datei, die ihn verwendet, überhaupt keine Diagnose meldet und andernfalls für jedes Gate unsichtbar wäre. | Ja                                       |

#### Zwei Typprüfprogramme antworten unterschiedlich

`typecheck:core` und `check:build-typecheck` kompilieren unterschiedliche Programme mit unterschiedlichen Optionen, und dieselbe Datei kann in einem sauber und in dem anderen voller Fehler sein.

`tsconfig.build.json` setzt `"strict": false`, also ist `noImplicitAny` ausgeschaltet. Die Kernkonfiguration erstellt eine kuratierte 27-Dateien-Zulassungsliste mit strengeren Optionen und folgt dem Importdiagramm jedes Eintrags, sodass Dateien, die nie im Build-Programm erscheinen, dort trotzdem überprüft werden.

Bei der Beurteilung, ob eine Datei typisiert ist, ist die Konsequenz wichtig:** Null-Diagnose unter `check:build-typecheck` bedeutet nicht Null** . Das Entfernen von `@ts-nocheck` aus 26 Dateien zeigte, dass 23 davon im Build-Programm sauber waren; Sechzehn davon brachten etwa 120 implizite Fehler im strengen Fall zum Vorschein. Überprüfen Sie beides, bevor Sie eine Dateibereinigung aufrufen.

### Arbeit: `quality-gate`

Läuft nach `test-coverage`. Bei einem Fehler werden Blöcke zusammengeführt.

| Skript                       | Validiert                                                                                                                                                                                 | Blockierung          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Gibt `quality-metrics.json` aus (ESLint Warnungsanzahl, Abdeckung durch zusammengeführten Shard-Bericht)                                                                                  | Ja (vor der Ratsche) |
| `quality:ratchet`            | Jede Metrik in `quality-baseline.json` hat sich nicht zurückgebildet (ESLint Warnungen, ≤ Basislinie; Abdeckung, ≥ -Basislinie).                                                          | Ja                   |
| `check:duplication`          | Die Codeduplizierung (jscpd@4) überschreitet nicht die Grundlinie in `quality-baseline.json`                                                                                              | Ja                   |
| `check:complexity`           | Die zyklomatische Komplexität auf Dateiebene überschreitet nicht die Obergrenze (Kern ESLint `complexity` + `max-lines-per-function`).                                                    | Ja                   |
| `check:cognitive-complexity` | Kognitive Komplexitätsratsche (`eslint-plugin-sonarjs`) — separater ESLint Durchgang; CI führt beide zusammengeführt als einen einzigen `check:complexity-ratchets` Schritt aus           | Ja                   |
| `check:dead-code`            | Die Ratsche (Knip) für ungenutzte Exporte/Dateien weist gegenüber dem Ausgangswert keinen Rückschritt auf                                                                                 | Ja                   |
| `check:compression-budget`   | Komprimierungs-Benchmark-Budget- — -Token-Einsparungsuntergrenzen pro Engine dürfen nicht zurückgehen                                                                                     | Ja                   |
| `check:type-coverage`        | Die prozentuale Ratsche (`type-coverage`) bildet sich nicht zurück; fasst größtenteils `typecheck:noimplicit:core` zusammen                                                               | Ja                   |
| `check:codeql-ratchet`       | Die Anzahl der geöffneten CodeQL Alarme geht nicht zurück (liest über `gh api`; Graceful-Skip ohne Token). — Aktualisierungsrhythmus und manueller Auslöser: siehe „CodeQL Ratsche“ unten | Ja                   |

### Arbeit: `quality-extended`

Der gesamte Job ist beratend (`continue-on-error: true`). Die npm-basierten Ratschen funktionieren echt; Die externen Scanner werden über `gh release download` installiert und überspringen sich selbst (Exit 0), wenn noch keine Binärdatei vorhanden ist.

| Skript                   | Validiert                                                                                                                                                                                                                   | Blockierung                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Keine zirkulären Abhängigkeiten (dpdm)                                                                                                                                                                                      | **Beratung**                                              |
| `check:bundle-size`      | Die Bündelgröße überschreitet die Obergrenze nicht                                                                                                                                                                          | **Beratung**                                              |
| `check:secrets`          | Geheimes Scannen (Gitleaks) — überspringt, wenn keine Binärdatei vorhanden ist                                                                                                                                              | **Beratung**                                              |
| `check:vuln-ratchet`     | Abhängigkeitsschwachstellen (OSV-Scanner) bilden sich nicht zurück. — überspringt, wenn die Binärdatei nicht vorhanden ist                                                                                                  | **Beratung**                                              |
| `check:workflows`        | Workflow-Lint (actionlint + zizmor); missing/broken -Scanner, ungültige Berichte oder fehlende Ratchet-Baseline schlagen als INCOMPLETE fehl. Gültige Ergebnisse folgen der ausgewählten strict/advisory/ratchet Richtlinie | Ausführung erforderlich; Zizmor-Ratschenblockierung in CI |
| `check:openapi-breaking` | Breaking Changes am öffentlichen API Vertrag (`openapi.yaml`) im Vergleich zum Basiszweig (oasdiff) — gibt `openapiBreaking=N` aus; Wird übersprungen, wenn oasdiff fehlt oder die Basisspezifikation nicht auflösbar ist   | **Beratung**                                              |

### Arbeit: `docs-sync-strict`

Läuft auf jedem PR bis `main`. Bei einem Fehler werden Blöcke zusammengeführt.

| Skript                         | Validiert                                                                                                                                                                         | Blockierung                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-Gate, das die folgenden 6 Unter-Gates nacheinander ausführt                                                                                                                  | Ja                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt -Versionskonsistenz                                                                                                                                 | Ja                         |
| ↳ `check:docs-counts`          | Die Zählungen in Prosa (Anbieterzählung, Migrationszählung usw.) liegen innerhalb des Ratschenfensters der tatsächlichen Zählungen                                                | Ja                         |
| ↳ `check:env-doc-sync`         | Jede Umgebungsvariable in `.env.example` wird in einer Dokumentationstabelle dokumentiert und umgekehrt                                                                           | Ja                         |
| ↳ `check:deprecated-versions`  | Keine veralteten Versionszeichenfolgen in Dokumenten                                                                                                                              | Ja                         |
| ↳ `check:doc-links`            | Interne Markdown-Links in Dokumenten werden in echte Dateien aufgelöst (`[text]`/`(path)` -Form)                                                                                  | Ja                         |
| ↳ `check:fabricated-docs`      | In den Dokumenten zitierte Routen, Umgebungsvariablen, CLI -Befehle, Hook-Namen und Dateipfade sind in der Codebasis vorhanden. Hartes Gate über `--strict`; Soft-Fail ohne Flag. | Ja (über `--strict` in CI) |
| `check:cli-i18n`               | CLI -Befehlszeichenfolgen sind in allen i18n-Gebietsschemadateien vorhanden                                                                                                       | Ja                         |
| `check:openapi-coverage`       | OpenAPI Spezifikation deckt mindestens einen Teil der realen Routen ab                                                                                                            | Ja                         |
| `check:openapi-security-tiers` | Anmerkungen zur Sicherheitsstufe in `openapi.yaml` stimmen mit `routeGuard.ts` Klassifizierungen überein                                                                          | **Beratung**               |
| `check:openapi-routes`         | Jeder Pfad in `openapi.yaml` wird zu einem echten `route.ts` (Anti-Halluzination).                                                                                                | Ja                         |
| `check:docs-symbols`           | Jede `/api/...` -Referenz in `docs/**/*.md` wird zu einem echten `route.ts` (Anti-Halluzination) aufgelöst.                                                                       | Ja                         |
| `i18n translation drift`       | Nur nicht übersetzte Schlüssel in i18n-Gebietsschemadateien. — Warnung                                                                                                            | **Beratung**               |

Die zwölf README SVGs unter `docs/diagrams/` werden generiert (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regeneriert sie alle). Jeder verfügt über einen Byte-Vergleichs-Einheitentest (`tests/unit/docs/readme-*-svg.test.ts`, Job `test-unit`), der fehlschlägt, wenn die festgeschriebene Datei veraltet ist, und `check:docs-counts` liest kanonische Zahlen aus ihren `<text>` Knoten — weshalb der Outlining-Schritt jede umrissene Zeichenfolge in der Datei als unsichtbares `<text>` behält. Die SVG -Prüfung auf kanonische Zahlen liest die in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) aufgeführten Dateien: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` sowie `public/images/tier-flow-dark.svg` und `tier-flow-light.svg`; Die Ansprüche „Für immer kostenlos“, „Katalogeintrag“, „Wiederkehrender Pool“ und „Bewertungsfaktoren“ lauten auch `promise-pillars.svg`, `free-tier-budget.svg` und `strategies-grid.svg`. `free-tier-budget.svg` bezieht seine Zahlen aus dem Live-Katalog-Loader, sodass eine Änderung an `FREE_MODEL_BUDGETS` oder einem Anbieter-Anzeigenamen CI reduziert, bis diese Datei neu generiert wird.

### Arbeit: `i18n-ui-coverage`

| Skript                            | Validiert                                                                                                                                                                                                                      | Blockierung  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check-ui-keys-coverage` (inline) | Die Schlüsselabdeckung UI i18n beträgt ≥ 65 %                                                                                                                                                                                  | Ja           |
| `check-ui-value-drift` (inline)   | Ein umgeschriebenes Englisch** Wert** hinterlässt keine veraltete Übersetzung                                                                                                                                                  | Ja           |
| `check-new-key-coverage` (inline) | A** neu** Der englische Schlüssel wird in jedem Gebietsschema übersetzt — ein `__MISSING__:` Marker wird abgelehnt                                                                                                             | Ja           |
| `check-translation-ratio`         | Das tatsächliche Übersetzungsverhältnis pro Gebietsschema (identisch mit Englisch/Platzhalter/fehlende Blätter außerhalb der Zulassungsliste) darf `config/quality/i18n-translation-baseline.json` + slack nicht überschreiten | **Beratung** |

Benötigt `fetch-depth: 0` — das Value-Drift-Gate unterscheidet `en.json` von der Merge-Basis.

#### `check-ui-value-drift` — veraltetes Übersetzungstor

Fängt die eine i18n-Regression ab, die die anderen Tore strukturell nicht sehen können: Ein englischer Wert wird umgeschrieben und die aus dem _vorherigen_ Englisch abgeleiteten Übersetzungen bleiben erhalten, sodass nicht-englische Benutzer weiterhin sicher formulierte, jetzt falsche Kopien lesen.

Das wurde echt geliefert. `oauthModal.googleOAuthWarning` wurde neu geschrieben, als der Antigravity -Anmeldehelfer landete (#5203);** 39 von 43 Orten** Behalten Sie den Text bei, der die Bediener auffordert, „den vollständigen URL zu kopieren und unten einzufügen“ — einen Fluss, der für diesen Anbieter nicht abgeschlossen werden kann. Es blieb bis #8463 unbemerkt, weil:

- `sync-ui-keys` füllt nur Schlüssel auf, die vorhanden sind** abwesend** , niemals diejenigen, die es sind** abgestanden** ;
- `check-ui-keys-coverage` zählt die _Präsenz_ des Schlüssels, sodass eine veraltete Übersetzung als abgedeckt gilt;
- `check-translation-drift` verfolgt die `docs/i18n/<locale>/**.md` -Dokumentation und spiegelt — wider, es liest niemals `src/i18n/messages/*.json`. Blockierung im Job `docs-sync-strict` seit der Neusynchronisierung 2026–09: Bearbeiten eines Kerndokuments → `npm run i18n:run -- --files=<doc>` (Abschnittsebene, günstig).

**Differenzbewusst, nicht baseline-unterstützt.** Es vergleicht `en.json` an der Zusammenführungsbasis mit dem Arbeitsbaum; Für jeden Schlüssel, dessen englischer Wert sich geändert hat, ist jedes Gebietsschema, das noch eine unberührte Übersetzung enthält, veraltet. Dies bewusst** Friert bereits bestehende Schulden ein** — a diff kann nicht offenbaren, aus welchem alten Englisch eine langjährige Übersetzung stammt, daher beurteilt das Gate nur, was die aktuelle Änderung betrifft. Die Alternative (eine Pro-Schlüssel-Hash-Baseline) würde eine generierte Datei ~ 600 KB kosten, 3 × die größte existierende Baseline, die bei jedem i18n PR abwandert.

Zwei Möglichkeiten, es zu befriedigen:

1. die betroffenen Übersetzungen aktualisieren, oder
2. Setzen Sie sie auf `__MISSING__:<new english>` — Die Laufzeit stellt dann das korrigierte Englisch (`src/i18n/request.ts::deepMergeFallback`, #7258) und die Schlüsselwarteschlangen zur Übersetzung bereit.

Wenn die Zeichenfolge** Bedeutung** geändert, lieber** Umbenennen des Schlüssels** : Ein neuer Schlüssel kann keine veraltete Übersetzung erben. Das ist das Muster, #8463 verwendet hat.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Beendet 0 mit `SKIP reason=base-unresolved`, wenn der Basiskatalog nicht gelesen werden kann (flacher Klon ohne Basisreferenz), was `check-openapi-breaking` widerspiegelt.

### Arbeit: `i18n`

Vollständige i18n-Validierungsmatrix (ein Job pro Gebietsschema). Die gesamte Arbeit ist beratend.

| Skript                          | Validiert                                         | Blockierung                                                   |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Vollständigkeit der Übersetzung pro Gebietsschema | **Beratung** (`continue-on-error: true` für den gesamten Job) |

### Arbeit: `pr-test-policy`

Wird nur auf Pull-Anfragen ausgeführt.

| Skript                 | Validiert                                                                                                                                           | Blockierung |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs, die den Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` ändern, müssen Tests einschließen oder aktualisieren (harte Regel #8). | Ja          |
| `check:test-masking`   | Geänderte Testdateien reduzieren nicht die Netto-Assert-Anzahl und fügen `assert.ok(true)` Tautologien hinzu                                        | Ja          |
| `check:pr-evidence`    | PR Körper zitiert test/VPS -Beweise für die Änderung (mechanisiert Hard Rule #18, indem PR Prosa — fragil wird, siehe Rückstand)                    | Ja          |

### Arbeit: `test-vitest`

Läuft nach `build`. Bei einem Fehler werden Blöcke zusammengeführt.

| Suite            | Validiert                                                | Blockierung                                                                                                                      |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP Server (110 Tools), autoCombo, Cache — Vitest Runner | Ja                                                                                                                               |
| `test:vitest:ui` | UI Komponente testet — Vitest-Runner                     | **Blockierung** — bereits vorhandene Fehler werden in `vitest.config.ts` explizit ausgeschlossen; Neue Ausfälle scheitern am Job |

### Nächtliche Arbeitsabläufe (geplant, beratend)

Diese laufen nach einem Cron-Zeitplan (und `workflow_dispatch`), niemals nach PRs. Alle sind beratend.

| Arbeitsablauf          | Validiert                                                                                                                                                                                  | Blockierung  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `nightly-property`     | Schnellprüfungs-Eigenschaftstests mit einem zufälligen Seed- + -High-Run-Count                                                                                                             | **Beratung** |
| `nightly-resilience`   | Heap-Wachstumstor, Chaos-Fehlerinjektion, k6 load/soak                                                                                                                                     | **Beratung** |
| `nightly-llm-security` | promptfoo-Injection-Guard (Blockmodus) + Garak-Probes (ohne Provider-Geheimnis übersprungen)                                                                                               | **Beratung** |
| `nightly-schemathesis` | OpenAPI -Vertrags-Fuzzing (Schemathese) gegen einen Live- OmniRoute unter Verwendung von `docs/openapi.yaml` — Oberflächen-Spezifikationsverletzungen/nicht behandelte 500er (Phase 8 B.4) | **Beratung** |
| `nightly-mutation`     | Stryker-Mutationstest-Score über der Fast-Unit-Lane — Überlebensmutantenoberfläche schwache Behauptungen                                                                                   | **Beratung** |
| `nightly-compat`       | Knoten-Engine-Kompatibilitätsmatrix für die unterstützten `engines.node` Bereiche                                                                                                          | **Beratung** |

Leistungsbasislinien (Heap, TTFB, Build-Zeit) werden aufgezeichnet und nicht gesteuert: siehe [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Velocity-Phase (2026-08-30 → v4.0 LTS): Alle Baselines um 20 % gelockert

Entscheidung des Owners (2026-08-30): Bis zur Modularisierung in v4.0 ist die Auslieferungsgeschwindigkeit wichtiger
als die Begrenzung technischer Schulden. Jede **numerische** Ratchet-Baseline wurde in einem
auditierbaren Durchlauf um 20 % gelockert, und die Phase ist in `config/quality/quality-baseline.json` deklariert:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Was geändert wurde                                                                                                                                                                                                                               | Wo                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — Werte, bei denen niedriger besser ist, ×1,2; Prozentsätze, bei denen höher besser ist, ÷1,2 (Coverage-Untergrenze 60 beibehalten, `eslintErrors` bleibt 0, `eslintWarnings` 0 → 20 % der eingefrorenen Unterdrückungsanzahl) | `quality-baseline.json` (Hinweis `_relax_velocity_2026_08_30` führt jeden Vorher- → Nachher-Wert auf)  |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, jede Zeilenobergrenze in `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| Anzahl pro Datei / pro TS-Code ×1,2                                                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` dient nur noch als Hinweis, solange `_policy.requireTighten === false`                                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| Der nächtliche Job `bank-ratchet-shrinks` pausiert (er würde die gemessene Reduzierung festschreiben und den Spielraum rückgängig machen)                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Positivlisten (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) sind **keine** Budgets und wurden nicht verändert. Bestanden-/Fehlgeschlagen-Policy-Gates (Secrets, SQL-Regeln,
Vertrag zwischen Dokumentation und Umgebung, i18n-Parität, Unit-Tests) bleiben unverändert — ein fehlgeschlagener Test bleibt ein fehlgeschlagener Test.

**Werkzeuge**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — die
  einmalige Lockerung (`scripts/quality/relax-baselines.mjs`); verweigert eine zweite Ausführung mit
  demselben Hinweis.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  misst jedes numerische Gate auf dieselbe Weise wie CI und gibt den verbleibenden Spielraum pro Gate aus
  (`scripts/quality/baseline-headroom.mjs`). Der nächtliche Job `baseline-headroom` veröffentlicht
  die Tabelle in der Zusammenfassung des Workflow-Laufs und lädt seinen JSON-/Markdown-Bericht als
  `baseline-headroom-<run_id>` hoch, der 90 Tage lang aufbewahrt wird. Warnungs- und kritische Zeilen kennzeichnen Gates,
  die höchstens 10 % von ihrer Obergrenze entfernt sind oder diese bereits überschritten haben. Prüfen Sie diese Berichte als
  Frühwarnung dafür, dass Budgets aufgebraucht werden; untersuchen Sie die Hinweise `_rebaseline_*` des betroffenen Gates. Der Job
  erstellt oder aktualisiert kein dauerhaftes Issue mehr; #12149 bewahrt den früheren Berichtsverlauf auf.

**Modus für neuen Code (Clean-as-You-Code) — seit 2026-08-30, nur PR-Schnellpfad**

Bei `pull_request`-Ereignissen übergibt `quality.yml` `--base-ref <PR base SHA>` an `check:file-size`,
`check:complexity-ratchets` und `check:dead-code`. Bei `check:complexity-ratchets` und
`check:dead-code` vergleicht das Gate HEAD mit der Merge-Basis, **beschränkt auf die vom PR
geänderten Dateien** (`scripts/check/newCodeMode.mjs`: Die Merge-Basis wird in einem temporären
`git worktree` materialisiert, ESLint/knip werden dort und auf HEAD ausgeführt und die Anzahlen pro Datei miteinander verglichen):

- **blockierend** — der PR hat in von ihm geänderten Dateien Verstöße gegen die zyklomatische/kognitive Komplexität oder tote Exporte hinzugefügt
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` im Protokoll);
- **Hinweis** — die globale Gesamtanzahl im Vergleich zur eingefrorenen Baseline. Übernommene Abweichungen lassen einen
  unbeteiligten PR niemals fehlschlagen; die Abweichung wird beim Release-Abgleich erneut eingefroren und vom Headroom-Job überwacht.

`check:file-size` verwendet die Basisreferenz nach eigenen Regeln (`scripts/check/check-file-size.mjs`, #8522):
Es prüft jede Quell- und Testdatei im Baum, liest die jeweilige Zeilenanzahl an der PR-Basis
mit `git show` und lässt eine Datei nur dann fehlschlagen, wenn sie über den größeren Wert aus ihrer Baseline-Obergrenze
(`frozen` / `testFrozen` oder `cap` / `testCap` für eine Datei außerhalb der Baseline) und ihrer
Basisgröße hinauswächst. Eine Datei, die bereits an der Basis abgewichen ist, lässt einen unbeteiligten PR daher niemals fehlschlagen.

`check:boundary:ratchet` wendet dieselbe Regel auf seine einzelne Zahl an
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): Bei PR-Ereignissen übergeben sowohl
die Fast-Gates in `quality.yml` als auch der Lint-Job in `ci.yml` den Basis-SHA des PRs, der Basis-Commit wird
aus einem `git archive`-Export gemessen, und der PR schlägt nur dann fehl, wenn seine Anzahl an
`open-sse → src`-Kanten den größeren Wert aus `metrics.boundaryOpenSseToSrc` und der Anzahl in der
Basis überschreitet. Eine Abweichung der Basis oberhalb der Obergrenze wird gemeldet
(`base drift herdado`), lässt aber niemals einen unbeteiligten PR fehlschlagen; Pushes → main
behalten die absolute Obergrenze bei, und bei einem nicht auflösbaren Basis-SHA wird unter Ausgabe
einer Warnung auf diese zurückgegriffen.

`workflow_dispatch`-Läufe, der Release-Green-Durchlauf und der nächtliche Headroom-Job haben keine
PR-Basis und behalten den absoluten (globalen) Vergleich bei. Coverage, Duplizierung und Type-Coverage
bleiben vorerst global (ihre Tools erzeugen nicht kostengünstig einen Diff pro Datei) — sie sind
Kandidaten für dieselbe Behandlung.

**Abschluss der Phase bei v4.0 (LTS = strenger als zuvor, nicht „zurück zum Normalzustand“)**

1. Auf dem unveränderten Tip von `release/v4.0.0`: zunächst `npm run quality:headroom --json` zur
   Dokumentation, dann `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` sowie `--update` für jedes
   Typecheck-Gate — jede Baseline wird auf den gemessenen Wert abgesenkt.
2. `_policy` aus `quality-baseline.json` löschen (aktiviert `--require-tighten` und das nächtliche
   Banking wieder), `THRESHOLD = 36` (oder höher) in `check-openapi-coverage.mjs` wiederherstellen.
3. Über die Messwerte hinaus verschärfen, wo sich die Modularisierung ausgezahlt hat: den
   Datei-Größen-`cap` wieder auf 1000 (oder 800) setzen, die Coverage-Untergrenzen um 5 erhöhen,
   0 ungenutzte Exporte für die modularisierten Pakete.

## Ratchet-Baseline (`quality-baseline.json`)

Die Ratchet-Engine (`scripts/quality/check-quality-ratchet.mjs`) liest `quality-baseline.json`
und vergleicht sie mit der neu erfassten `quality-metrics.json`. Jede Metrik, die sich
über ihren Epsilonwert hinaus verschlechtert, lässt den Build fehlschlagen.

Derzeit erfasste Metriken:

| Metrik                | Richtung | Bedeutung                                          |
| --------------------- | -------- | -------------------------------------------------- |
| `eslintWarnings`      | `down`   | Die Anzahl der ESLint-Warnungen darf nicht steigen |
| `coverage.statements` | `up`     | Die Statement-Abdeckung darf nicht sinken          |
| `coverage.lines`      | `up`     | Die Zeilenabdeckung darf nicht sinken              |
| `coverage.functions`  | `up`     | Die Funktionsabdeckung darf nicht sinken           |
| `coverage.branches`   | `up`     | Die Zweigabdeckung darf nicht sinken               |

So aktualisieren Sie die Baseline nach einer tatsächlichen Verbesserung:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Das Flag `--update` schreibt die aktuell gemessenen Werte in `quality-baseline.json`.
Committen Sie diese Datei zusammen mit der Änderung, durch die die Metrik verbessert wurde. Ein PR, der eine
Metrik verbessert, ohne die Baseline zu aktualisieren, wird von `--require-tighten` erkannt (Phase 6A.5,
Implementierung ausstehend).

### CodeQL-Ratchet: Aktualisierungsintervall und manuelle Auslösung

`check:codeql-ratchet` liest **den Repository-Status, der nach einem Zeitplan aktualisiert wird — nicht pro PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` meldet
`state: configured`, `schedule: weekly`: GitHubs Scan mit Standardkonfiguration, keine Analyse
bei jedem Push. Folge: Nachdem ein PR, der Warnungen BEHEBT, gemergt wurde, liest das Ratchet
weiterhin die alte, höhere Anzahl, bis der nächste geplante Scan ausgeführt wird — daher meldet es
bei jedem offenen PR eine Regression, einschließlich der Folge-PRs des Korrektur-PRs selbst, bis der Scan den aktuellen Stand erfasst.

**Manuelle Aktualisierung**: `gh workflow run codeql.yml --ref release/vX.Y.Z` führt die
Analyse erneut aus und veröffentlicht die Warnungen innerhalb weniger Minuten neu. Lesen Sie zuerst
`.github/workflows/codeql.yml` — der Header erklärt, dass sie ausschließlich für `workflow_dispatch`
vorgesehen ist, **weil sie mit GitHubs „Standardkonfiguration“ kollidiert** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Das Wiederherstellen der Trigger `push`/`pull_request`/
`schedule` erfordert **zuerst eine Aktion des Eigentümers**: Settings → Code security →
CodeQL: Default → Advanced. Fügen Sie ohne diese Umstellung keinen `schedule:`-Trigger hinzu — er
würde lediglich fehlschlagende Läufe erzeugen.

**Verschärfen Sie die Baseline, nachdem die Anzahl gesunken ist** — `node scripts/check/check-codeql-ratchet.mjs
--update` schreibt die neu gemessene Anzahl in `quality-baseline.json` →
`metrics.codeqlAlerts.value`, damit das Ratchet nicht stillschweigend eine Regression zurück
auf den alten Grenzwert zulässt. Praxisbeispiel (2026-09-02/03): PR #12502 behob 7 echte Warnungen
(13 → 6 gemessene offene Warnungen); PR #12530 verschärfte die eingefrorene Baseline von 11 → 6, um sie anzugleichen; die
verbleibenden 6 wurden anschließend mit einer Begründung für jede einzelne Warnung verworfen, sodass 0 offen blieben.

**Verwerfungen liegen im Ermessen des Operators (Strikte Regel #14)** — verwerfen Sie niemals eine CodeQL-Warnung,
ohne die technische Begründung im Verwerfungskommentar festzuhalten: `won't fix` für
eine Anforderung eines vorgelagerten Protokolls, `used in tests` für eine Test-Fixture, `false positive`
für einen Sanitizer, den CodeQL nicht erkennen kann (Präzedenzfall: `docs/security/ERROR_SANITIZATION.md`).

---

## Richtlinie für Testwiederholungen (WS5.4, v3.8.49)

Wiederholungen werden pro Runner konfiguriert, niemals pauschal global — eine pauschale Wiederholung macht aus echten Regressionen unsichtbare Flakes:

| Runner           | Richtlinie                                                                                                                                    | Begründung                                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` nur in CI, mit `trace: on-first-retry`                                                                                           | Browser-/Netzwerk-Timing ist tatsächlich nicht deterministisch; eine Wiederholung mit einem Trace macht aus einem Flake ein diagnostizierbares Artefakt |
| Vitest           | KEINE globale Wiederholung. Ein nachweislich instabiler Test erhält eine explizite Wiederholung pro Test (im Diff sichtbar und im PR geprüft) | So bleibt die Quarantäneliste im Repository und ist niemals undurchsichtig                                                                              |
| node:test (Unit) | NIEMALS Wiederholungen                                                                                                                        | Ein instabiler Unit-Test ist ein Fehler im Test — beheben, nicht erneut ausführen                                                                       |

Ziel-SLOs, sobald die Flake-Telemetrie verfügbar ist (WS5.2/5.3): <1 % Flake-Rate pro Test
(Schwellenwert für „sofort beheben“), ≥95 % Erfolgsrate pro Pipeline. Branchenübliche Referenzwerte —
anhand unserer eigenen Messungen neu kalibrieren.

## Drift der Ratchets auf Release-Ebene (WS5.5, v3.8.49)

Wenn sich ein Ratchet (Dateigröße, Komplexität, eslint-Warnungen) am REINEN Release-
Tip verschlechtert — d. h., die KOMBINATION der Merges hat die Verschlechterung verursacht und kein einzelner PR reproduziert sie
in seinem eigenen Branch — obliegt die Behebung **einmalig dem Release Captain auf dem
Release-Branch**: Extraktion/Refactoring bevorzugen; die Baseline nur mit dem dokumentierten
Begründungseintrag neu setzen. Kombinationsbedingte Drift niemals auf einen Contributor-PR abwälzen und niemals
pro PR neu baselinen (das verbirgt echte Regressionen). Zuerst differenzieren: Den
roten Status in einem Probe-Worktree gegen den reinen Tip reproduzieren, bevor angenommen wird, dass der eigene PR ihn verursacht hat.

## Ratchet-Absenkungen übernehmen — die Abwärtsrichtung (#8584)

Das Ratchet ist nur zur Hälfte automatisiert, und zwar zur falschen Hälfte. Das **Anheben** eines Limits ist eine
manuelle JSON-Bearbeitung, die zehn Sekunden dauert und der schnellste Weg ist, einen roten PR wieder freizugeben.
Das **Absenken** erfordert, dass jemand `--update` ausführt und das Ergebnis committet — und bis
der Job `bank-ratchet-shrinks` eingeführt wurde, führte kein Workflow diesen Vorgang aus. Die gemessene Folge
(2026-07-25): 18 eingefrorene Dateien lagen bereits bei oder unter dem Limit von 800 Zeilen für neue Dateien, im schlimmsten
Fall beim 132-Fachen (`src/shared/validation/schemas.ts`, 19 Zeilen bei einem Limit von 2.523); die
Komplexitätsobergrenze stieg über etwa 37 Rebaseline-Hinweise hinweg von `1794 → 2169`, bei genau einer
Absenkung (−1); und „im nächsten Zyklus über `--update` verschärfen“ wurde 31-mal geschrieben und
einmal umgesetzt. Ein Limit, das länger bestehen bleibt als der Code, durch den es begründet wurde, verwandelt
jede abgeschlossene Zerlegung stillschweigend in zusätzlichen Wachstumsspielraum für die Person, die die Datei als Nächstes bearbeitet.

`nightly-release-green.yml` → Job **`bank-ratchet-shrinks`** schließt diesen Regelkreis:

|             |                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Läuft bei   | `schedule` (3×/Tag) + `workflow_dispatch` — bewusst **nicht** bei `push`                                                  |
| Misst       | den höchsten `release/vX.Y.Z`, mit derselben Auflösung und demselben Injection Guard wie `release-green`                  |
| Schreibt    | `check:file-size --update` und `check:complexity-ratchets --update` (beide konstruktionsbedingt ausschließlich absenkend) |
| Verifiziert | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                  |
| Liefert aus | einen stets aktuellen PR gegen den Release-Branch — per Force-Update aktualisiert, niemals als Spam                       |

Die Übernahme erfolgt gebündelt statt bei jedem Push, da es keine Latenzanforderung gibt (eine innerhalb von
8 Stunden übernommene Absenkung ist ausreichend), während eine Ausführung bei jedem Merge den PR-Branch während
Merge-Kampagnen wiederholt neu erstellen und jedes Mal einen vollständigen ESLint-Durchlauf verursachen würde. Die Erkennung erfolgt weiterhin bei
`push` (`release-green`); nur die Übernahme wird gebündelt.

### Der Sicherheitsprüfer

Der Job schreibt unbeaufsichtigt in die Baselines, daher sorgt `verify-ratchet-bank.mjs` dafür,
dass dies vertretbar ist. Er vergleicht den Baum nach `--update` mit `HEAD` und **bricht den Job ab,
bevor ein Commit existiert** — ohne einen PR zu öffnen —, sofern nicht jede Änderung einer der folgenden Kategorien entspricht:

- ein numerischer `frozen`- / `testFrozen`-Eintrag wurde **abgesenkt** oder **entfernt**
- `complexity-baseline.json` → `count` wurde **abgesenkt**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` wurde **abgesenkt**

Alles andere schlägt fehl: das Anheben einer Zahl, das Hinzufügen eines Eintrags, das Ändern von `cap`/`testCap` oder
das Löschen/Umschreiben eines `_rebaseline_*`-Hinweises (diese Hinweise bilden den Audit-Trail dafür, warum die jeweilige
Obergrenze existiert, und werden innerhalb desselben `frozen`-Objekts wie die Dateieinträge gespeichert).
Ein Bot, der ein Limit anheben könnte, wäre eindeutig schlechter als der Status quo. Regressions-
Guard: `tests/unit/verify-ratchet-bank.test.ts`.

Der Job pusht niemals nach `release/*` — ein Mensch mergt den PR, sodass eine fehlerhafte Messung
nicht ungeprüft übernommen werden kann.

## Richtlinie für Positivlisten

Jeder Prüfschritt, der bei bereits vorhandenen Verstößen nicht fehlschlagen darf, verwendet eine unveränderliche Positivliste
(z. B. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Es gilt folgende Richtlinie:

**Beheben Sie die eigentliche Ursache; verwenden Sie die Positivliste nur, wenn der Verstoß bereits vorhanden ist und
nicht im selben PR behoben werden kann.**

Beim Hinzufügen eines Eintrags zu einer Positivliste:

1. Fügen Sie einen Kommentar mit der Begründung ein.
2. Verweisen Sie auf das zugehörige Tracking-Issue (z. B. `// #3498 — Funktion aus Phase 2, noch nicht implementiert`).
3. Entfernen Sie den Eintrag in demselben PR, der den Verstoß behebt — ein veralteter Eintrag, der keinen aktiven
   Verstoß mehr unterdrückt, ist selbst ein Fehler (die stale-enforcement-Prüfung aus 6A.3 wird
   den Prüfschritt bei einem verwaisten Positivlisteneintrag fehlschlagen lassen, sobald sie implementiert ist).

Fügen Sie **keine** Positivlisteneinträge hinzu, nur damit Tests schneller erfolgreich sind. Ein erfolgreicher Prüfschritt bei einer wachsenden
Positivliste vermittelt ein falsches Gefühl von Qualität.

### Wenn ein Prüfschritt bei Ihrem PR fehlschlägt

1. **Lesen Sie die Ausgabe des Prüfschritts sorgfältig** — sie gibt genau an, welche Datei oder welches Symbol gegen
   die Regel verstoßen hat.
2. **Beheben Sie den Verstoß** — die meisten Prüfschritte sind deterministische Dateisystemprüfungen, die erfolgreich sind, sobald
   der Code korrekt ist.
3. **Wenn der Verstoß bereits vorhanden ist** (d. h., Sie haben ihn nicht verursacht, aber der Prüfschritt
   deckt ihn nun ab): Fügen Sie einen Positivlisteneintrag mit einem Begründungskommentar und einem Tracking-Issue hinzu.
4. **Wenn es sich um einen Ratchet-Prüfschritt handelt** (Testabdeckung, ESLint-Warnungen, Duplizierung, Komplexität):
   Ihre Änderung hat die Metrik verschlechtert. Beheben Sie das zugrunde liegende Problem oder führen Sie (in seltenen Fällen)
   `npm run quality:ratchet -- --update` aus, wenn die Änderung beabsichtigt und die Verschlechterung
   der Metrik akzeptabel ist — dokumentieren Sie die Gründe jedoch in der PR-Beschreibung.
5. **Hinweisgebende Prüfschritte** (`continue-on-error: true`) dienen nur der Information — sie blockieren
   das Zusammenführen nicht, erscheinen aber in der CI-Zusammenfassung. Beheben Sie sie trotzdem.

---

## Hinzufügen eines neuen Prüfschritts

1. Erstellen Sie `scripts/check/check-<name>.mjs` (oder `.ts`). Richtlinienprüfschritte beenden sich mit 0/1.
   Ratchet-Prüfschritte schreiben über `collect-metrics.mjs` eine Metrik nach `quality-metrics.json`.
2. Fügen Sie `"check:<name>": "node scripts/check/check-<name>.mjs"` zu `package.json` hinzu.
3. Binden Sie ihn in `.github/workflows/ci.yml` unter dem passenden Job ein
   (Richtlinie → `lint` oder `docs-sync-strict`; Ratchet → `quality-gate`).
4. Falls er eine Positivliste verwendet, wenden Sie `reportStaleEntries()` aus
   `scripts/check/lib/allowlist.mjs` an, damit veraltete Einträge automatisch erkannt werden.
5. Schreiben Sie einen Test in `tests/unit/build/`, der die Erkennungslogik des Prüfschritts abdeckt.
6. Aktualisieren Sie dieses Dokument (fügen Sie der Tabelle des entsprechenden Jobs eine Zeile hinzu).

---

## Agentenwerkzeuge: LSP-in-the-loop (optional)

Zusätzlich zu den CI-Prüfschritten enthält OmniRoute ein **optionales** `agent-lsp`-Grundgerüst
(eine `.mcp.json` auf Projektebene, Phase 7, Aufgabe 15). Erstellen Sie `.mcp.json`,
um Coding-Agenten einen TypeScript-Sprachserver bereitzustellen, sodass sie Symbole /
Diagnosen **vor** dem Schreiben von Code auflösen — eine „Kompilieren vor dem Behaupten“-Ergänzung zu
`typecheck:core`, die Fehler durch „erfundene Symbole“ an der Quelle reduziert. Es wird absichtlich
nicht automatisch geladen (Sie wählen und überprüfen die MCP↔LSP-Brücke); ein fehlerhafter Eintrag protokolliert lediglich einen
Verbindungsfehler und unterbricht niemals Sitzungen.

---

## Rationalisierungs-Backlog (ROI-Prüfung — Phase 9 Welle 3)

Dieses Inventar wurde am 2026-06-17 mit `ci.yml` abgeglichen (in der vorherigen Version fehlten
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Eine ROI-Prüfung des abgeglichenen Bestands
ergab die folgenden Rationalisierungskandidaten. **Die Zusammenführungen sind mechanische
CI-Änderungen; die Umstellungen/Entfernungen sind Richtlinienentscheidungen, die dem Betreiber
vorbehalten sind.** Nichts davon wurde bisher umgesetzt.

**Oben ebenfalls nicht dokumentiert** (nur Hinweischarakter, geringe Aussagekraft): der Job
`docs-lint` (markdownlint + Vale, gesamter Job mit `continue-on-error`) und die eigenständigen
Scanner-Workflows `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ist in
`quality-baseline.json` enthalten, aber nicht mit einer blockierenden Ratchet-Prüfung in `ci.yml`
verknüpft — die Metrik ist derzeit verwaist.

### Zusammenführen / Deduplizieren (mechanisch, geringeres Risiko)

Jeder Kandidat wurde am 2026-06-17 anhand des aktiven Gate-Status validiert (Vertrauen ist gut,
Kontrolle ist besser); mehrere „offensichtliche“ Zusammenführungen verbargen tatsächlich
Altlasten und sind **kein** sauberer direkter Ersatz.

- **`check:docs-sync` wird zweimal ausgeführt** — eigenständig im Job `lint` und nochmals innerhalb von `check:docs-all` (`docs-sync-strict`) sowie im husky-Pre-Commit-Hook. ✅ **ERLEDIGT** — eigenständiger Aufruf in `lint` entfernt.
- **CVE-Scanning** — ❌ **KEINE saubere Zusammenführung.** `audit:deps` schlägt bei jeder CVE mit hohem/kritischem Schweregrad hart fehl; `check:vuln-ratchet` (osv) schlägt nur bei einer _Regression_ gegenüber der Baseline fehl (derzeit 1 MODERATE). Unterschiedliche Semantik — durch das Entfernen von `audit:deps` würde das absolute Gate für hohe/kritische Schweregrade verloren gehen. Beide beibehalten.
- **Zyklenerkennung** — ✅ **ERLEDIGT** (#15159 G-01/G-02). Der alte Text bezeichnete `check:cycles` als „das grüne, kuratierte“ Gate und begründete dessen blockierende Beibehaltung damit, dass `check:circular-deps` (dpdm) 91 Zyklen meldete. Dieses Grün war ein **falsch positives Grün**: `check:cycles` scannte 5 Unterverzeichnisse (450 Dateien), erfasste nur statische `import|export … from`-Anweisungen und verwarf jeden `@/`- und `@omniroute/open-sse/`-Spezifizierer, sodass die im Repository vorherrschenden Zyklen aus dynamischen Imports und Aliasen nicht erkannt werden konnten. Behoben: Das Gate durchsucht nun `src` + `open-sse` (5023 Dateien), erfasst Spezifizierer aus dem TypeScript-AST (sodass `import("…")` zählt, `typeof import("…")` an Typpositionen hingegen nicht) und löst `paths` aus tsconfig auf. Es findet **14** Zyklen, nicht 0. Da 14 bereits vorhandene Zyklen nicht in einem Gate-PR behoben werden können, ist `check:cycles` nun eine **Ratchet-Prüfung** (`--ratchet`, Obergrenze `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — sie blockiert jede _Regression_, und die Anzahl kann nur sinken. CI führt `npm run check:cycles:ratchet` aus. Der schrittweise Abbau erfolgt zusammen mit **A-01**. `check:circular-deps` (dpdm) bleibt als umfassendere Zweitmeinung im Hinweisstatus.
- **Komplexität** — ✅ **ERLEDIGT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ein ESLint-Durchlauf, Zählung nach ruleId, sodass die Baselines für zyklomatische Komplexität + maximale Zeilenzahl und kognitive Komplexität unabhängig bleiben; die einzelnen Prüfungen `check:complexity` / `check:cognitive-complexity` bleiben für lokale Ausführungen mit `--update` erhalten.
- **`/api`-Anti-Halluzination** — ✅ **ERLEDIGT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): eine einzige Dateisystem-Inventarisierung von `src/app/api`; openapi-routes + docs-symbols berichten weiterhin unabhängig; die einzelnen Prüfungen bleiben für lokale Ausführungen erhalten.
- **`check:node-runtime` wird in 11 Jobs ausgeführt** — ⚠️ **geringer ROI.** Jeder Job verwendet einen separaten Runner, und die Prüfung dauert <1 s; die Gesamtersparnis läge bei ~10 s, während dabei eine kostengünstige Schutzprüfung pro Job verloren ginge. Den Änderungsaufwand nicht wert.
- **`typecheck:noimplicit:core` im CI-Linting** — ✅ **aus dem Job `lint` entfernt** (war mit `continue-on-error` nur hinweisend); die blockierende Typabdeckung besteht aus `typecheck:core` + `check:type-coverage`. Lokales Skript beibehalten.

### Umstellen / Entscheiden (Betreiberrichtlinie)

- `check:openapi-security-tiers` (hinweisend) — ❌ **NICHT ohne Weiteres umstellbar.** Die Prüfung beendet sich mit 0, warnt jedoch, dass mehreren `traffic-inspector`-Routen unter `LOCAL_ONLY_API_PREFIXES` die Annotation `x-loopback-only: true` fehlt. Vor einer Erzwingung müssen diese Annotationen zuerst zu `openapi.yaml` hinzugefügt werden.
- `typecheck:noimplicit:core` (hinweisend) — wird weitgehend durch die blockierende Ratchet-Prüfung `check:type-coverage` abgedeckt. In eine Ratchet-Prüfung umwandeln oder den redundanten zweiten `tsc`-Durchlauf entfernen.
- `test:vitest:ui` (jetzt **blockierend**) — bereits vorhandene Fehler sind in `vitest.config.ts` ausdrücklich mit `// #8618`-Tracking-Kommentaren ausgeschlossen; neue Fehler lassen den Job fehlschlagen.
- `check:secrets` (gitleaks, blockierende Ratchet-Prüfung, eingefroren bei 3 dokumentierten Falschmeldungen) — die 3 Einträge auf die Zulassungsliste setzen, um 0 zu erreichen, oder auf Hinweisstatus herabstufen. Überschneidet sich mit dem nativen Secret-Scanning von GitHub + `check:public-creds`.
- `check:pr-evidence` (blockierend, durchsucht den Fließtext des PR-Texts) — hohes Falsch-Positiv-Risiko; eine Entfernung würde die Durchsetzung der festen Regel Nr. 18 schwächen, daher handelt es sich um eine echte Richtlinienentscheidung.
- `semgrep` (eigenständig, hinweisend) — überschneidet sich bei den OWASP-Kategorien mit CodeQL; die Baseline mit einer Ratchet-Prüfung verknüpfen oder entfernen.

---

## Zugehörige Dokumentation

- Lieferkette (Provenienz, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — Prüfschranke für die Übereinstimmung der Schlüsselmengen

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, Job `i18n-ui-coverage`).
Vergleicht die Menge der Blattschlüssel jeder Datei `src/i18n/messages/<locale>.json` mit `en.json`
und schlägt bei jedem fehlenden oder zusätzlichen Blatt fehl, unabhängig davon, wann der Schlüssel
hinzugefügt wurde. `__MISSING__:`-Platzhalter gelten als vorhanden (ihr Inhalt ist Sache der
Verhältnis-Prüfschranke). Dies ist die absolute Ergänzung zu den beiden diff-basierten bzw.
prozentualen Prüfschranken: `check-ui-keys-coverage` erzwingt eine Untergrenze von 80 % pro Locale
(43 fehlende Schlüssel von etwa 13.000 ergeben immer noch 99,7 %), und `check-new-key-coverage`
bewertet nur die Schlüssel, die ein PR zu `en.json` hinzufügt. Ein Locale-Batch wird aus dem
`en.json` des Tages generiert, an dem sein Branch erstellt wird, und über mehrere Tage übersetzt,
während die Basis weiterhin neue Schlüssel hinzufügt; der Batch-PR selbst fügt keinen Schlüssel
hinzu, sodass beide verwandten Prüfschranken stumm blieben, als Batch 1 (#13044) mit 43 fehlenden
Schlüsseln in neun Locales und Batch 2 (#13660) mit 10 fehlenden Schlüsseln in acht Locales
(2026-09-15) integriert wurden. Beheben Sie einen roten Fehler mit
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ein `extra`-Blatt
bedeutet, dass es aus der Quelle entfernt wurde — löschen Sie es aus der Locale. `--warn` meldet
Probleme, ohne fehlzuschlagen. `--catalog=cli` führt denselben Vergleich für `bin/cli/locales` aus
(`npm run i18n:check-keys:cli`); beide Schritte befinden sich im Job `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-Prüfschranke für neue Schlüssel

Verwandte Prüfschranke von `check-ui-value-drift`. Letztere erkennt einen englischen Wert, der
**umgeschrieben** wurde, während seine Übersetzungen unverändert blieben; diese erkennt einen
englischen Schlüssel, der **hinzugefügt** wurde, ohne dass einige Locales ihn erhalten haben.

`check-ui-keys-coverage` kann diese Fehlerklasse nicht erkennen: Es erzwingt eine prozentuale
Untergrenze pro Locale, und elf fehlende Schlüssel von etwa 13.000 lassen die Abdeckung bei
99,9 %. Ein Prozentsatz pro Sprache kann nicht ausdrücken: „Diese Funktion wurde unübersetzt
ausgeliefert“ — eine vollständige Funktion kann in einer neuen Locale ohne jeglichen Text
hinzukommen, ohne den Wert jemals zu verändern.

Der zugrunde liegende Vorfall: Phase 3 des Orchestration Canvas übersetzte ihre elf Schlüssel in
die 42 Locales, die zu diesem Zeitpunkt existierten. Stunden später erhöhte der EU-Sprachen-Batch
(#13044) die Anzahl der Locales im Repository auf 51, und die neun Neuzugänge (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) erhielten sie nie. `deepMergeFallback` setzt für einen
fehlenden Schlüssel Englisch ein, sodass der Fehler zu einer unübersetzten statt einer leeren
Benutzeroberfläche führte — ein reales Problem, das konstruktionsbedingt unbemerkt blieb.

Wie die verwandte Prüfschranke ist auch diese **diff-bewusst**: Sie vergleicht den englischen
Stand an der Merge-Basis mit dem Arbeitsbaum, sodass bereits vorhandene Lücken eingefroren bleiben
und für die Aktivierung der Prüfschranke keine Migration erforderlich war.

**Ein `__MISSING__:<english>`-Marker erfüllt die Anforderung nicht (seit 2026-09-17).** Zuvor war
er der dokumentierte Aufschub — zur Laufzeit wird auf korrektes Englisch zurückgegriffen —, bis
acht Feature-PRs am 2026-09-16 61 Schlüssel hinzufügten und den Marker in alle 65 Locales
eintrugen, anstatt sie zu übersetzen: Diese Prüfschranke akzeptierte jeden einzelnen davon, nichts
blockierte die PRs, und die blockierende Prüfschranke für das Verhältnis echter Übersetzungen
schlug anschließend an der Release-Spitze für alle fehl (pt-BR 3,2 % > 2,5 % + 0,5). Ein Marker
wird nun wie eine fehlende Übersetzung bewertet. Beheben Sie einen roten Fehler mit
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` oder
alle Locales parallel mit `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sicher bei getrenntem Terminal, verweigert den Start ohne die Umgebungsvariablen
`OMNIROUTE_TRANSLATION_*`). Ein Schlüssel, der Englisch bleiben muss (der fest vorgegebene Name
eines Produkts, einer Engine oder eines Flags), gehört in
`scripts/i18n/untranslatable-keys.json`, niemals hinter einen Marker. `vi` verbietet Marker
vollständig (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — Prüfschranke für zurückgestellte Tests

Eine Datei in der `exclude`-Liste von `vitest.config.ts` ist ein Test, der nicht ausgeführt wird,
und wirkt für jeden, der den Verzeichnisbaum liest, wie vorhandene Abdeckung. Zweiundsechzig
Dateien sammelten sich hinter dem Kommentar
`// #8618 — bereits vorhandener Fehler; diese Ausnahme nach der Behebung entfernen` an. Issue
#8618 wurde am 2026-08-11 geschlossen, während die von ihm nachverfolgte Liste von 45 auf 62
Einträge anwuchs, wobei jeder neue Eintrag einen Kommentar erbte, der auf ein abgeschlossenes
Issue verwies. Als die Liste schließlich Datei für Datei geprüft wurde (#13204), bestanden
**51 der 62 Tests mit dem aktuellen Stand des Verzeichnisbaums ohne jegliche Änderung am
Quellcode**.

Die Prüfschranke verlangt, dass jeder Ausschluss, der auf eine tatsächlich vorhandene Datei
verweist, (a) ein Tracking-Issue benennt und (b) mit seinem gemessenen Status in
`config/quality/vitest-exclusions.json` aufgeführt ist. Dadurch wird das Hinzufügen eines
Ausschlusses zu einem überprüfbaren Diff in einer dedizierten Datei statt zu einer weiteren Zeile
in einem Array mit 60 Einträgen. Die ausgeschlossenen Tests werden bewusst nicht erneut
ausgeführt — das dauert etwa 10 Minuten und gehört in einen regelmäßigen Job; das Inventar hält
fest, wann jeder Test zuletzt gemessen wurde.
