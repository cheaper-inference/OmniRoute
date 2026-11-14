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

Jeder JSON -Beleg identifiziert den ausgecheckten SHA, die Workflow-Ausführung und den Versuch. Der CLI lehnt eine checkout/event SHA Nichtübereinstimmung ab. Workflow-Tests binden die Richtlinienmitgliedschaft an die `needs` -Liste des Verdict-Jobs, sodass eine neue oder entfernte Spur nicht stillschweigend verschwinden kann. Die Belege decken ihren eigenen Arbeitsablauf ab, nicht die Veröffentlichung, Bereitstellung oder die Interna eines vorhandenen Beratungsscanners. Die Aktivierung beider Prüfnamen in Verzweigungsregeln ist eine separate administrative Änderung; Durch das Hinzufügen dieser Jobs wird eine Zweigstelle nicht geschützt.

### Warteschlange zusammenführen

Das `queue` Label sendet einen PR an die Mergify-Warteschlange (`.mergify.yml`). Mergify öffnet einen PR -Entwurf in einem `mergify/merge-queue/` Zweig, CI führt dort die vollständige Auswahl aus und der ursprüngliche PR wird zusammengeführt, wenn `Gate / CI`, `Gate / Quality` und `Merge integrity (changelog + generated skills)` übergeben werden.

Mergify schreibt seine Warteschlangenzusammenfassung in die Beschreibung des Entwurfs und andere Apps können sie auch bearbeiten. Ein `pull_request` `edited` -Ereignis für einen solchen Entwurf benötigt eine eigene Parallelitätsgruppe (`-queue-edit-<run_id>`), sodass es die tatsächliche Ausführung des Entwurfs nicht abbrechen kann und das Gate und die Matrix überspringt. Nur `Merge integrity` läuft noch. Der übersprungene Gate-Job trägt einen anderen Prüfnamen, da Mergify einen übersprungenen `Gate / CI` als fehlgeschlagene Prüfung liest und den PR aus der Warteschlange entfernt.

Nach einem Auszug aus der Warteschlange wird der PR durch einen Push nicht immer erneut in die Warteschlange gestellt. Kommentiere `@mergifyio queue` dazu.

### Beweissicherung im Akzeptanzminderer

`scripts/quality/validate-release-acceptance.mjs` reduziert einen bereitgestellten Plan und seine Manifeste; Es wird nicht festgestellt, dass der Plan die gesamte Release-Pipeline abdeckt. Seine Berichte legen `releaseAcceptance: false` explizit fest, auch wenn dieser Plan `VERIFIED` ist. Der `release-acceptance.yml` Workflow verwendet weiterhin Schatten-Fixtures, keine echten Build-, Paket-, Boot- oder Promotion-Belege.

Die CLI verpflichtet `--evidence-root` zur Überprüfung der aufbewahrten Beweise. Dateien werden als `<evidence-root>/<artifact_id>/<member>` aufgelöst und als SHA-256 gehasht. Ein PASS Eintrag ohne Beweise, eine fehlende oder geänderte Datei, ein unsicherer Pfad oder ein symbolischer Link verhindern die Überprüfung. Fehlende Dateien sind nicht gleichbedeutend mit leeren erfolgreichen Protokollen. Bestehende SHA/run/attempt -Prüfungen bleiben unabhängig: Übereinstimmende Bytes können eine veraltete Quittung nicht retten. Die Dateiintegrität ist kein Beweis für die Authentizität der Ausführung oder die Förderung von Artefakten.

### Statisches Scan-Inventar

Das versionierte npm-alias-Inventar und die Static-Scan-Mitgliedschaft sind in `config/quality/gate-manifest.json` verfügbar. Führen Sie `npm run check:gate-manifest` aus, um Skriptnamen und genaue Befehle anhand von `package.json` zu validieren. Hinzufügungen, Entfernungen und Befehlsdrift schlagen sowohl beim lokalen Hook als auch bei den Änderungsklassifizierungsjobs in CI fehl. Ein Alias ist kein Workflow-Job, keine Matrixinstanz oder kein Testfall: Diese Zählungen dürfen nicht als austauschbar dargestellt werden.

Verwenden Sie `npm run quality:scan -- --list` oder `npm run quality:scan:fast -- --list` um die ausgewählten Aliase zu überprüfen, ohne sie auszuführen. Der Läufer ruft den NPM-Einstiegspunkt auf, sodass seine Laufzeit (einschließlich Bun sofern konfiguriert) erhalten bleibt. Das Manifest zeichnet Aliase außerhalb dieser Profile als separat aufgerufen auf, und Wartungsbefehle sind in schreibgeschützten Scanprofilen verboten.

Diese Profile decken nur den statischen Scan ab. Sie zertifizieren keine Produkttests, Abdeckung, Verpackung, externe Prüfungen oder die vollständige Freigabeabnahme eines Kandidaten. Für die Workflow-Zulassung werden die verknüpften Elemente `config/quality/admission-policy.json` und `scripts/quality/admission-verdict.mjs` verwendet. Release-Beobachter-Profile bleiben getrennt; die entsprechenden Schecks und Quittungen selbstständig prüfen. Die statischen Befehle des vollständigen Beobachters werden in `config/quality/release-green-static-profile.json` deklariert, einschließlich `audit:deps`, Mutationstestauswahl und Übersetzungsprüfungen. Der Loader validiert npm-Befehle anhand von package.json und modellierten CI/Quality Deklarationen. Es lehnt Drift ab, anstatt Shell-Token als Argumente auszuführen. Die erforderliche Scanner- SKIP/INCOMPLETE Ausgabe kann PASS nicht herstellen. Das Profil zeichnet seine externen Ausschlüsse auf und ersetzt nicht die gehostete Abdeckung, Testmatrizen, Paket- oder Bereitstellungsnachweise. Die folgende Prosainventur ist eine Referenz und kein Beweis dafür, dass tatsächlich ein Tor geöffnet war.

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

Bei Fass-Reexporten und dynamischen Importen handelt es sich lediglich um Auflösungsdiagnosen. Sie erstellen niemals einen blockierenden Befund. Überprüfte Ausnahmen leben in `config/quality/forgotten-sibling-allowlist.json`. Jeder Eintrag muss den Verbraucher- und Kandidatentest benennen, eine spezifische Begründung angeben und einen GitHub -Issue- oder Pull-Request verlinken. Fehlerhafte Einträge können nicht geschlossen werden. Ausnahmen können einen gelöschten Kandidatentest oder einen Diff, der `.skip`/`.todo` hinzufügt, nicht unterdrücken; Behauptungsschwächung und andere Maskierungen verbleiben im Besitz des unabhängig blockierenden `check:test-masking` Gates.

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
| `audit:deps`                      | NPM-Prüfung aller fünf unabhängigen Sperrdateien (Root, Electron, OpenCode -Plugins, v1/v2 und Provider). Kritischer Hinweisblock; Hohe Warnungen bleiben sichtbare Warnungen. Missing/failed -Audits sind INCOMPLETE und block; Sperr-Hashes und Berichte pro Bereich werden beibehalten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                       |
| `check:lockfile`                  | `package-lock.json` -Integrität — https-Registrierung, Integritäts-Hashes, keine Host-Überschreibungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                       |
| `check:licenses`                  | SPDX -Lizenzzulassungsliste für Produktionsabhängigkeiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                       |
| `check:tracked-artifacts`         | Keine Build-Artefakte / festgeschriebene `node_modules` Symlinks (läuft auch im Husky-Pre-Commit; Pre-Push ist absichtlich leicht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                       |
| `check:ai-attribution`            | Kein AI/bot `Co-Authored-By` Trailer oder AI-Generation-Fußzeile in PR -Commits, Titel oder Text — Harte Regel #16 (in der `quality.yml` Fast-Gates-Schleife für PR→ `release/**` — liest die Ereignisnutzlast, No-Op-off PRs — und einen nur PR-Schritt in `ci.yml` lint für PR→ `main`; auch der Husky `commit-msg` Hook; menschliche Co-Autoren erlaubt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Jeder Vitest Ausschluss benennt ein Tracking-Problem und erscheint in `config/quality/vitest-exclusions.json` (#13204).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                       |
| `check:file-size`                 | Quelldateien (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) bleiben in `cap` und Testdateien (`*.test.ts(x)`) in `testCap`; In `file-size-baseline.json` (`frozen` / `testFrozen`) eingefrorene Dateien dürfen ihre aufgezeichnete Größe nicht überschreiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                       |
| `check:error-helper`              | Fehlerantworten in executors/handlers verwenden `buildErrorBody()` / `sanitizeErrorMessage()` (harte Regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                       |
| `check:migration-numbering`       | Migrations- SQL Dateien sind fortlaufend nummeriert, es gibt keine Lücken oder Duplikate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                       |
| `check:public-creds`              | Keine wörtlichen OAuth `client_id`/`client_secret` oder Firebase-Webschlüssel außerhalb von `publicCreds.ts` (harte Regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                       |
| `check:db-rules`                  | Kein rohes SQL außerhalb von `src/lib/db/` -Modulen; keine Barrel-Importe von `localDb.ts` (harte Regeln #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                       |
| `check:known-symbols`             | In ihren Dispatch-Tabellen registrierte Anbieter-Ausführer, Routing-Strategien und Übersetzer stimmen mit den Dateien auf der Festplatte überein — keine verwaisten oder nicht deklarierten Symbole vorhanden sind                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                       |
| `check:route-guard-membership`    | Jede Route, die einen untergeordneten Prozess erzeugt, wird durch `isLocalOnlyPath()` (harte Regeln #15/#17) klassifiziert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `check:test-discovery`            | Jede `*.test.ts` / `*.spec.ts` Datei im Repo wird von mindestens einem Testläufer gesammelt (Ratsche: Waisenliste in `test-discovery-baseline.json` kann nur kleiner werden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                       |
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
| `check:vuln-ratchet`     | Abhängigkeitsschwachstellen (OSV-Scanner) bilden sich nicht zurück. — `--ratchet` schlägt als INCOMPLETE (Exit 2) fehl, wenn es nicht gemessen wird                                                                         | **Beratung**                                              |
| `check:workflows`        | Workflow-Lint (actionlint + zizmor); missing/broken -Scanner, ungültige Berichte oder fehlende Ratchet-Baseline schlagen als INCOMPLETE fehl. Gültige Ergebnisse folgen der ausgewählten strict/advisory/ratchet Richtlinie | Ausführung erforderlich; Zizmor-Ratschenblockierung in CI |
| `check:openapi-breaking` | Öffentlicher API Vertrag gegen angeheftete Ereignis-Commits (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); erforderliche Messung schlägt fehl geschlossen                          | **Blockieren mit --ratchet**                              |

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

## Richtlinie zur Zulassungsliste

Jedes Gate, das bei bereits bestehenden Verstößen nicht fehlschlagen kann, verwendet eine eingefrorene Zulassungsliste (z. B. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Die Richtlinie lautet:

**Beheben Sie die Grundursache. Verwenden Sie die Zulassungsliste nur, wenn der Verstoß bereits besteht und nicht im selben PR behoben werden kann.**

Beim Hinzufügen eines Eintrags zu einer Zulassungsliste:

1. Fügen Sie der Begründung einen Kommentar bei.
2. Verweisen Sie auf das Tracking-Problem (z. B. `// #3498 — Phase 2 feature, not yet implemented`).
3. Entfernen Sie den Eintrag in demselben PR, der den Verstoß behebt — Ein veralteter Eintrag, der einen aktiven Verstoß nicht mehr unterdrückt, ist selbst ein Fehler (6A.3 Stale-Enforcement führt dazu, dass das Gate bei einem verwaisten Zulassungslisteneintrag scheitert, sobald er implementiert ist).

Tun** nicht** Fügen Sie Zulassungslisteneinträge hinzu, um das Bestehen von Tests zu beschleunigen. Ein grünes Tor mit einer wachsenden Zulassungsliste ist ein falsches Qualitätsgefühl.

### Wenn ein Tor an Ihrem PR ausfällt

1. **Lesen Sie die Gate-Ausgabe sorgfältig durch** — sagt Ihnen genau, welche Datei oder welches Symbol gegen die Regel verstoßen hat.
2. **Beheben Sie den Verstoß** — den meisten Gates handelt es sich um deterministische Dateisystemprüfungen, die bestanden werden, sobald der Code korrekt ist.
3. **Wenn der Verstoß bereits vorliegt** (d. h. Sie haben es nicht eingeführt, aber das Tor deckt es jetzt ab): Fügen Sie einen Zulassungslisteneintrag mit einem Begründungskommentar und einem Tracking-Problem hinzu.
4. **Wenn das Tor eine Ratsche ist** (Abdeckung, ESLint Warnungen, Duplizierung, Komplexität): Ihre Änderung hat die Metrik verschlechtert. Beheben Sie das zugrunde liegende Problem oder führen Sie (selten) `npm run quality:ratchet -- --update` aus, wenn die Änderung beabsichtigt ist und die Metrikverschlechterung akzeptabel ist. —, aber dokumentieren Sie den Grund in der PR -Beschreibung.
5. **Beratungstore** (`continue-on-error: true`) sind Informations- — sie blockieren die Zusammenführung nicht, erscheinen aber in der CI Zusammenfassung. Repariere sie trotzdem.

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

## Rationalisierungsrückstand (ROI review — Phase 9 Onda 3)

Dieses Inventar wurde am 17.06.2026 mit `ci.yml` abgeglichen (in der vorherigen Version wurden `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet` und `check:pr-evidence` weggelassen). Eine ROI Überprüfung des abgeglichenen Satzes identifizierte die folgenden Rationalisierungskandidaten.** Bei den Zusammenführungen handelt es sich um mechanische CI Änderungen; Bei den flips/drops handelt es sich um Richtlinienentscheidungen, die dem Betreiber vorbehalten sind.** Untenstehendes wird noch nicht angewendet.

**Auch oben nicht dokumentiert** (Hinweis, niedriges Signal): der `docs-lint` Job (Markdownlint + Vale, Gesamtjob `continue-on-error`) und die eigenständigen Scanner-Workflows `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` befindet sich in `quality-baseline.json`, ist aber nicht mit einer Sperrklinke in `ci.yml` — verbunden, die Metrik ist derzeit verwaist.

### Zusammenführung/Deduplizierung (mechanisch, geringeres Risiko)

Jeder Kandidat wurde am 17.06.2026 anhand des Live-Gate-Status validiert (vertrauen, aber verifizieren); Es stellte sich heraus, dass mehrere „offensichtliche“ Fusionen Schulden verschleierten, und das sind sie auch** nicht** saubere Drop-Ins.

- **`check:docs-sync` läuft zweimal** — eigenständig im `lint` -Job und erneut innerhalb `check:docs-all` (`docs-sync-strict`) und dem Husky-Pre-Commit-Hook. ✅**DONE** — eigenständiger `lint` -Aufruf entfernt.
- **CVE -Scannen** — ❌**NOT eine saubere Zusammenführung.** `audit:deps` blockiert kritische Hinweise und unvollständige Prüfungen in allen fünf Sperrdateien, während hohe Hinweise gemäß der aktuellen Richtlinie als Warnungen gemeldet werden; `check:vuln-ratchet` (osv) schlägt nur bei einer _Regression_ gegenüber der eingecheckten Basislinie fehl und lehnt fehlende Messungen bei Bedarf ab. Bei einer anderen Semantik — würde das Weglassen von `audit:deps` zum Verlust des absoluten kritischen Gates und der unabhängigen Paketprüfungsbelege führen. Behalte beides.
- **Zykluserkennung** — ✅**DONE** (#15159 G-01/G-02). Der alte Text hier bezeichnete `check:cycles` als „das grüne, kuratierte“ Tor und begründete die Blockierung damit, dass `check:circular-deps` (dpdm) 91 Zyklen meldete. Das Grün war ein** falsches Grün** : `check:cycles` hat 5 Unterverzeichnisse (450 Dateien) gescannt, nur statisches `import|export … from` abgeglichen und alle `@/` und `@omniroute/open-sse/` Spezifizierer gelöscht, sodass die Dynamic-Import- + -Aliaszyklen, die das Repo dominierten, nicht erkannt werden konnten. Behoben: Das Gate durchläuft jetzt `src` + `open-sse` (5023 Dateien), sammelt Spezifizierer aus dem TypeScript AST (also `import("…")` zählt und type-position `typeof import("…")` nicht) und löst tsconfig `paths` auf. Es findet** 14** Zyklen, nicht 0. Da 14 bereits existierende Zyklen nicht in einem Gatter PR fixiert werden können, ist `check:cycles` jetzt a** Ratsche** (`--ratchet`, Decke `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — blockiert jede _Regression_ und die Anzahl kann nur fallen. CI führt `npm run check:cycles:ratchet` aus. Abbrandfahrten mit**A-01** . `check:circular-deps` (dpdm) bleibt als breitere Zweitmeinung beratend.
- **Komplexität** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ein ESLint Spaziergang, zählt nach ruleId sodass zyklomatische +-Max-Linien und kognitive Grundlinien unabhängig bleiben; einzelne `check:complexity` / `check:cognitive-complexity` bleiben für lokales `--update` übrig.
- **`/api` Anti-Halluzination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): ein FS Inventar von `src/app/api`, openapi-routes + docs-symbols melden weiterhin unabhängig; Einzelpersonen bleiben für lokale Läufe.
- **`check:node-runtime` läuft in 11 Jobs** — ⚠️** niedriger ROI.** Jeder ist ein separater Läufer und die Prüfung beträgt < 1s; Gesamteinsparungen von 10 ~, gegenüber dem Verlust eines günstigen Wachmanns pro Job. Die Abwanderung lohnt sich nicht.
- **`typecheck:noimplicit:core` auf CI lint** — ✅** aus dem Flusenjob entfernt** (war beratend `continue-on-error`); Die blockierende Oberfläche ist `typecheck:core` + `check:type-coverage`. Lokales Skript beibehalten.

### Umdrehen / entscheiden (Betreiberrichtlinie)

- `check:openapi-security-tiers` (Beratung) — ❌**NOT sauber umklappbar.** Es gibt 0 aus, warnt jedoch, dass mehreren `traffic-inspector` Routen unter `LOCAL_ONLY_API_PREFIXES` die `x-loopback-only: true` Annotation fehlt. Um dies durchzusetzen, müssen diese Anmerkungen zunächst zu `openapi.yaml` hinzugefügt werden.
- `typecheck:noimplicit:core` (Beratung) — wird weitgehend von der blockierenden `check:type-coverage` Ratsche erfasst. Wechseln Sie zu einer Ratsche oder lassen Sie den überflüssigen zweiten `tsc` Durchgang fallen.
- `test:vitest:ui` (jetzt** Blockierung** ) Bereits bestehende — -Fehler werden in `vitest.config.ts` mit `// #8618` Tracking-Kommentaren explizit ausgeschlossen; Neue Ausfälle scheitern am Job.
- `check:secrets` (Gitleaks, Sperrratsche eingefroren bei 3 dokumentierten Falsch-Positiven) — erlaubt die 3, um 0 zu erreichen, oder degradiert sie auf beratend. Überlappt GitHub natives Secret-Scanning + `check:public-creds`.
- `check:pr-evidence` (Blockierung, Greps PR-Körperprosa) — hohes falsch-positives Risiko; schwächt #18 -Durchsetzung harter Regeln, wenn sie fallen gelassen wird, es handelt sich also um eine echte politische Forderung.
- `semgrep` (advisory standalone) — überlappt CodeQL für die OWASP -Familien; Verdrahten Sie die Grundlinie mit einer Ratsche oder einem Tropfen.

---

## Verwandte Dokumentation

- Lieferkette (Herkunft, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — Schlüsselsatz-Paritätsgatter

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, Job `i18n-ui-coverage`). Vergleicht den Blattschlüsselsatz jedes `src/i18n/messages/<locale>.json` mit `en.json` und schlägt bei jedem fehlenden oder zusätzlichen Blatt fehl, unabhängig davon, wann der Schlüssel hinzugefügt wurde. `__MISSING__:` Platzhalter gelten als vorhanden (ihr Inhalt ist Sache des Ratio-Gates). Es ist die absolute Ergänzung der beiden diff-based/percentage Gatter: `check-ui-keys-coverage` erzwingt eine Untergrenze von 80 % pro Gebietsschema (43 fehlende Schlüssel von 13.000 ~ lesen immer noch 99,7 %) und `check-new-key-coverage` beurteilt nur die Schlüssel, die ein PR zu `en.json` hinzufügt. Ein Locale-Batch wird aus dem `en.json` des Tages generiert, an dem sein Zweig geschnitten wird, und tagelang übersetzt, während die Basis weiterhin Schlüssel hinzufügt. Der Batch PR fügt selbst keinen Schlüssel hinzu, daher schwiegen beide Geschwister, als Batch 1 (#13044) in neun Lokalisierungen 43 Schlüssel fehlte und Batch 2 (#13660) in acht Lokalisierungen 10 Schlüssel fehlte (15.09.2026). Repariere ein Rot mit `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; Ein `extra` -Blatt bedeutet, dass die Quelle es gelöscht hat. — löscht es aus dem Gebietsschema. `--warn` meldet ohne Fehler. `--catalog=cli` führt den gleichen Vergleich über `bin/cli/locales` (`npm run i18n:check-keys:cli`) durch; Beide Schritte sind im Job `i18n-ui-coverage` enthalten.

#### `check-new-key-coverage` — neuer Schlüssel i18n Gate

Geschwister von `check-ui-value-drift`. Das fängt einen englischen Wert ein, der war** umgeschrieben** während seine Übersetzungen zurückgelassen wurden; Dieser fängt einen englischen Schlüssel ein** hinzugefügt** während einige Orte es nie erhalten haben.

`check-ui-keys-coverage` kann diese Klasse nicht sehen: Sie erzwingt eine prozentuale Untergrenze pro Gebietsschema, und elf fehlende Schlüssel von ~ 13.000 belassen die Abdeckung bei 99,9 %. Ein Prozentsatz pro Sprache kann nicht ausdrücken, dass „diese Funktion unübersetzt ausgeliefert wurde“, — eine ganze Funktion kann in einem neuen Gebietsschema ohne Text landen und die Zahl nie verschieben.

Der Vorfall, den es kodiert: Phase 3 des Orchestration Canvas übersetzte seine elf Schlüssel in die 42 zu diesem Zeitpunkt existierenden Gebietsschemas. Stunden später brachte die EU-Sprachgruppe (#13044) das Repo auf 51 Standorte, und die neun Neuankömmlinge (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) erhielten sie nie. `deepMergeFallback` ersetzt einen fehlenden Schlüssel durch Englisch, daher war der Fehlermodus unübersetztes UI statt leeres UI — real und konstruktionsbedingt still.

Wie sein Geschwister ist es** diff-bewusst** , wobei Englisch an der Zusammenführungsbasis mit dem Arbeitsbaum verglichen wird, sodass bereits vorhandene Lücken eingefroren bleiben und das Gate keine Migration zum Einschalten benötigt.

**Ein `__MISSING__:<english>` Marker erfüllt dies nicht (seit 17.09.2026).** Früher war es die dokumentierte Verzögerung — bei der die Laufzeit auf korrektes englisches — zurückgreift, bis acht Feature PRs am 16.09.2026 61 Schlüssel hinzufügten und die Markierung in alle 65 Gebietsschemas einprägten, anstatt zu übersetzen: Dieses Gate akzeptierte alle, nichts blockierte das PRs, und das blockierende Real-Translation-Ratio-Gate schlug dann bei der Veröffentlichungsspitze für alle fehl (pt-BR 3,2 % > 2,5 % + 0,5). Eine Markierung wird nun als fehlende Übersetzung gewertet. Beheben Sie einen Fehler mit `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` oder allen Locales parallel mit `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, tached-safe, weigert sich, ohne die `OMNIROUTE_TRANSLATION_*` Umgebung zu starten). Ein Schlüssel, der englisch bleiben muss (ein angehefteter product/engine/flag Name), gehört in `scripts/i18n/untranslatable-keys.json` und niemals hinter eine Markierung. `vi` verbietet Marker komplett (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — geparktes Testtor

Eine Datei in der `exclude` Liste von `vitest.config.ts` ist ein Test, der nicht ausgeführt wird, und sieht für denjenigen, der den Baum liest, wie eine Abdeckung aus. Hinter dem Kommentar `// #8618 — pre-existing failure; remove this exclusion when fixed` haben sich 62 Dateien angesammelt. Die Ausgabe #8618 wurde am 11.08.2026 geschlossen, während die von ihr verfolgte Liste von 45 Einträgen auf 62 anwuchs, wobei jeder neue Eintrag einen Kommentar erbte, der auf eine tote Ausgabe verwies. Als die Liste schließlich Datei für Datei vermessen wurde (#13204),** 51 der 62 wurden ohne Quelländerung an den aktuellen Baum übergeben** .

Das Gate erfordert, dass jeder Ausschluss, der sich in eine echte Datei auflöst, (a) ein Tracking-Problem benennt und (b) mit seinem gemessenen Status in `config/quality/vitest-exclusions.json` erscheint. Das Hinzufügen eines solchen Ausschlusses ist also ein überprüfbarer Unterschied in einer dedizierten Datei und nicht eine weitere Zeile in einem Array mit 60 Einträgen. Die ausgeschlossenen Tests — werden absichtlich nicht erneut ausgeführt, was ~ 10 Minuten kostet und zu einem periodischen Job gehört; Die Inventaraufzeichnungen zeigen, wann jeweils das letzte Mal gemessen wurde.
