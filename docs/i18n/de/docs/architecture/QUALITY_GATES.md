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

## Gate-Inventar und Ausführungsprofile

### Zulassung von Kandidaten

Die Workflows für CI und Quality Gates geben jeweils ein stabiles Ergebnis aus: `Gate / CI` und
`Gate / Quality`. Ihre versionierte Zulassungsrichtlinie führt jeden vorgelagerten Job
als erforderlich oder informativ auf. Ein anwendbarer erforderlicher Job muss erfolgreich sein:
Fehlende, abgebrochene, übersprungene, ausstehende und unbekannte Ergebnisse können keinen PASS
begründen. Eine gültige Klassifizierung als reine Dokumentations- oder Katalogänderung kann einen
Code-Ausführungspfad unanwendbar machen; ein PR-Entwurf ist kein akzeptierter Kandidat. Ein
`hotfix`-Label hebt die Nachweispflicht nicht auf.

Beide Workflows decken PRs in main-/release-Branches, Pushes auf `main`, manuelle Ausführungen
und Merge-Group-Ereignisse ab. Bei Pushes, manuellen Ausführungen und Merge Groups wird die vollständige
Auswahl ausgeführt. Pushes auf `release/**` starten sie nicht (2026-10-18): Jede Änderung hat die Matrix
bereits in ihrem PR durchlaufen, und die zusammengeführte Kombination fällt in den Aufgabenbereich von
Release-Green (`docs/ops/RUNNER_BOX.md` → gehosteter Ausführungspfad). Forks und Merge Groups verwenden
gehostete Runner für Jobs, die andernfalls selbst gehostete Runner auswählen würden; vor der Einführung
muss eine ausreichende gehostete Kapazität verifiziert werden.

Jeder JSON-Beleg identifiziert den ausgecheckten SHA, den Workflow-Lauf und den Versuch.
Die CLI weist eine Abweichung zwischen Checkout- und Ereignis-SHA zurück. Workflow-Tests verknüpfen
die Richtlinienzugehörigkeit mit der `needs`-Liste des Ergebnis-Jobs, sodass ein neuer oder entfernter
Ausführungspfad nicht unbemerkt verschwinden kann. Die Belege decken den jeweils eigenen Workflow ab,
nicht die Veröffentlichung, das Deployment oder die interne Funktionsweise eines vorhandenen
informativen Scanners. Die Aktivierung beider Prüfnamen in Branch-Regeln ist eine separate
administrative Änderung; das Hinzufügen dieser Jobs schützt einen Branch nicht automatisch.

### Inventar der statischen Scans

Das versionierte Inventar der npm-Aliasse und die Zugehörigkeit zu statischen Scans befinden sich in
`config/quality/gate-manifest.json`. Führen Sie `npm run check:gate-manifest` aus, um
Skriptnamen und exakte Befehle anhand von `package.json` zu validieren; Ergänzungen, Entfernungen und
Befehlsabweichungen führen sowohl beim lokalen Hook als auch bei den Jobs zur Änderungsklassifizierung
in CI zu einem Fehler. Ein Alias ist weder ein Workflow-Job noch eine Matrixinstanz oder ein Testfall:
Diese Anzahlen dürfen nicht als austauschbar dargestellt werden.

Verwenden Sie `npm run quality:scan -- --list` oder `npm run quality:scan:fast -- --list`,
um die ausgewählten Aliasse zu prüfen, ohne sie auszuführen. Der Runner ruft den
npm-Einstiegspunkt auf, sodass dessen Laufzeitumgebung – einschließlich Bun, sofern konfiguriert –
beibehalten wird. Das Manifest erfasst Aliasse außerhalb dieser Profile als separat aufgerufen,
und Wartungsbefehle sind in schreibgeschützten Scanprofilen verboten.

Diese Profile decken ausschließlich den statischen Scan ab. Sie zertifizieren weder Produkttests
noch Testabdeckung, Paketierung, externe Prüfungen oder die vollständige Release-Zulassung eines
Kandidaten. Die Workflow-Zulassung verwendet die verknüpfte Datei
`config/quality/admission-policy.json` und `scripts/quality/admission-verdict.mjs`.
Release-Observer-Profile bleiben separat; prüfen Sie deren anwendbare Prüfungen und Belege
unabhängig voneinander. Das nachfolgende textuelle Inventar dient als Referenz und ist kein
Nachweis dafür, dass ein Gate tatsächlich ausgeführt wurde.

Skripte befinden sich unter `scripts/check/` (Richtlinien-Gates) und `scripts/quality/` (Ratchet-Engine).
Die maßgebliche CI-Quelle ist `.github/workflows/ci.yml`.

### Schneller Pfad für Release-PRs (`quality.yml`)

`.github/workflows/quality.yml` ergänzt CI bei main-/release-PRs, Pushes auf `main`,
manuellen Ausführungen und Merge Groups. PRs verwenden anhand von Pfaden gefilterte Schnellprüfungen.
Der dauerhaft deaktivierte doppelte Build wurde entfernt; die tatsächlichen Build-, Paketierungs- und
Boot-Prüfungen verbleiben in CI.

| Job                                              | Umfang                                                                                                                                                                                                                                        | Blockierend              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Dokumentations-/Code-PRs; API-Dokumentationsreferenzen und docs-all                                                                                                                                                                           | Ja                       |
| `Fast Quality Gates`                             | Code-PRs; statische Prüfungen, Typprüfung, Dashboard-Typprüfung, betroffene Unit-Tests                                                                                                                                                        | Ja                       |
| `Forgotten sibling tests`                        | Code-PRs; geänderte Module werden bis zu statischen Konsumenten und potenziellen Geschwistertests nachverfolgt; Barrel- und Dynamic-Import-Pfade werden als informative Diagnosen gemeldet, einschließlich referenzierter Allowlist-Ausnahmen | **Informativ**           |
| `Vitest (fast-path)`                             | Code-PRs; schnelle Vitest-Suite                                                                                                                                                                                                               | Ja                       |
| `Unit Tests fast-path`                           | Code-PRs; Unit-Test-Suite mit 4 Shards                                                                                                                                                                                                        | Ja                       |
| `No new ESLint warnings`                         | Code-PRs; unterdrückungsabhängiger Lint-Schutz                                                                                                                                                                                                | Ja, einschließlich Forks |
| `Merge integrity (changelog + generated skills)` | PRs, die keine Entwürfe sind; Synchronisierung von Changelog und generierten Skills                                                                                                                                                           | Ja, einschließlich Forks |

#### Bericht zu vergessenen Geschwistertests

`npm run check:forgotten-sibling-tests` verwendet den Import-Resolver wieder, der der Testauswirkungszuordnung zugrunde liegt.
Für jedes geänderte Produktionsmodul meldet der Befehl deterministische
`changed module/symbol -> static consumer -> candidate sibling test`-Ketten, wenn der potenzielle
Test nicht im Diff des Pull Requests enthalten ist. Die Markdown-Zusammenfassung und das JSON-Ergebnis werden
zur Kalibrierung vor einer blockierenden Einführung als Workflow-Artefakt `forgotten-sibling-tests` aufbewahrt.

Barrel-Re-Exporte und dynamische Importe dienen ausschließlich der Auflösungsdiagnose; sie erzeugen niemals
einen blockierenden Befund. Überprüfte Ausnahmen befinden sich in
`config/quality/forgotten-sibling-allowlist.json`. Jeder Eintrag muss den Consumer und den potenziellen
Test benennen, eine konkrete Begründung enthalten und auf ein GitHub-Issue oder einen Pull Request verweisen. Fehlerhafte Einträge führen
standardmäßig zum Fehlschlag. Ausnahmen können weder einen gelöschten potenziellen Test noch einen Diff unterdrücken, der `.skip`/`.todo`
hinzufügt; das Abschwächen von Assertions und andere Verschleierungsmaßnahmen verbleiben im Zuständigkeitsbereich des unabhängig blockierenden
`check:test-masking`-Gates.

### Job: `lint`

Wird bei jedem PR für `main` ausgeführt. Blockiert bei einem Fehler das Zusammenführen.

| Skript (`npm run ...`)            | Validiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Blockierend                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Die Node.js-Version liegt innerhalb des unterstützten Bereichs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:cycles`                    | Zyklische Importe im gesamten Verzeichnis `src/` + `open-sse/` (AST-basiert, `paths` aus der tsconfig werden aufgelöst). Ein direkter Aufruf wird mit Exit-Code 1 beendet, sobald ein Zyklus vorhanden ist (Fail-Closed seit #15281), und listet die SCCs auf. `check:cycles:ratchet` (wird von CI ausgeführt) blockiert, wenn die Anzahl den Grenzwert `metrics.cycles` in `quality-baseline.json` überschreitet — derzeit 14, `direction: down`, sodass sie nur sinken kann (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja (Ratchet)                               |
| `check:boundary`                  | Kopplung `open-sse → src`: eindeutige Datei-zu-Datei-Importe von der Engine in die Anwendung (`scripts/quality/measure-boundary.mjs`; die Kantenliste ist der Maßnahmen-Backlog für die v4-Kern-/Modulaufteilung). Direkter Aufruf = informativer Bericht (entspricht `quality:boundary`). `check:boundary:ratchet` (wird von CI ausgeführt und ist außerdem Teil der Ratchet-Schleife für schnelle Prüfungen in `quality.yml`) blockiert, wenn die Anzahl den Grenzwert `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` überschreitet — initialisiert mit dem gemessenen Wert 771, `direction: down`; `--update` senkt ihn ausschließlich; bei PRs relativ zur Basis (`--base-ref`, siehe unten)                                                                                                                                                                                                                                                                                                       | Ja (Ratchet)                               |
| `check:route-validation:t06`      | Zod-Schemas sind auf allen Routen vorhanden (Tier-6-Richtlinie)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:any-budget:t11`            | Anzahl der `@ts-expect-error // any` überschreitet das Budget nicht (Tier-11-Catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:provider-consistency`      | Jeder Provider in `providers.ts` hat einen entsprechenden Eintrag in `providerRegistry.ts` (und umgekehrt, innerhalb der Allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:model-lifecycle`           | Die drei manuell gepflegten Routingtabellen bleiben mit dem eingecheckten Lebenszyklus-Snapshot (#11503) konsistent: `FITNESS_TABLE` (`taskFitness.ts`) bewertet keine eingestellte ID, die `REGISTRY` routen kann; jedes Ziel von `BUILT_IN_ALIASES` ist in `REGISTRY` vorhanden und fehlt im Snapshot der eingestellten IDs; jede eingestellte ID, die noch in `REGISTRY` enthalten ist, wird weitergeleitet oder in `allowedRetiredInCatalog` aufgeführt; und weder Quelle noch Ziel in `DEFAULT_DEGRADATION_MAP` ist in diesem Snapshot als eingestellt markiert. Dies beweist nicht, dass ein Modell derzeit von einem aktiven Upstream bereitgestellt wird. Offline — wird mit `config/quality/model-lifecycle.json` verglichen, das manuell mit `npm run quality:refresh-model-lifecycle` aktualisiert wird (Netzwerkzugriff; nicht in CI eingebunden). `allowedRetiredInCatalog` ist ein schrittweise abzubauender Sperrmechanismus: Fügen Sie einen Eintrag nur zusammen mit einem Tracking-Issue hinzu. | Ja                                         |
| `check:fetch-targets`             | Jeder Aufruf von `fetch("/api/...")` im clientseitigen `src/` wird zu einer tatsächlich vorhandenen `route.ts` aufgelöst                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:deps`                      | Alle über `npm install` installierbaren Abhängigkeiten aus jeder `package.json` im Repository sind in `dependency-allowlist.json` enthalten; neue nicht angeheftete oder durch Slopsquatting entstandene Pakete werden markiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `audit:deps`                      | `npm audit` (Root + electron) — keine Sicherheitshinweise mit hohem/kritischem Schweregrad (überschneidet sich mit dem OSV-`check:vuln-ratchet`; siehe Rationalisierungs-Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:lockfile`                  | Integrität der `package-lock.json` — HTTPS-Registry, Integritäts-Hashes, keine Host-Überschreibungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:licenses`                  | SPDX-Lizenz-Zulassungsliste für Produktionsabhängigkeiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:tracked-artifacts`         | Keine Build-Artefakte bzw. eingecheckten `node_modules`-Symlinks (wird auch im Husky-Pre-Commit-Hook ausgeführt; Pre-Push ist absichtlich schlank gehalten — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:ai-attribution`            | Kein AI/Bot-Trailer `Co-Authored-By` und keine Fußzeile zur AI-Generierung in PR-Commits, -Titel oder -Beschreibung — verbindliche Regel Nr. 16 (in der Fast-Gates-Schleife von `quality.yml` für PR→`release/**` — liest die Event-Payload und führt außerhalb von PRs keine Aktion aus — sowie als reiner PR-Schritt im Lint-Job von `ci.yml` für PR→`main`; außerdem im Husky-Hook `commit-msg`; menschliche Mitautoren sind zulässig; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Jeder Vitest-Ausschluss nennt ein Tracking-Issue und ist in `config/quality/vitest-exclusions.json` aufgeführt (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:file-size`                 | Quelldateien (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) bleiben innerhalb von `cap` und Testdateien (`*.test.ts(x)`) innerhalb von `testCap`; in `file-size-baseline.json` eingefrorene Dateien (`frozen` / `testFrozen`) dürfen ihre erfasste Größe nicht überschreiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:error-helper`              | Fehlerantworten in Executors/Handlern verwenden `buildErrorBody()` / `sanitizeErrorMessage()` (Verbindliche Regel Nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:migration-numbering`       | Migrations-SQL-Dateien sind fortlaufend nummeriert, ohne Lücken oder Duplikate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:public-creds`              | Keine literalen OAuth-`client_id`-/`client_secret`- oder Firebase-Web-Schlüssel außerhalb von `publicCreds.ts` (Verbindliche Regel Nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:db-rules`                  | Kein SQL-Rohcode außerhalb der Module in `src/lib/db/`; keine Barrel-Imports aus `localDb.ts` (Verbindliche Regeln Nr. 2/Nr. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:known-symbols`             | In ihren Dispatch-Tabellen registrierte Provider-Executors, Routing-Strategien und Übersetzer stimmen mit den Dateien auf dem Datenträger überein – keine verwaisten oder nicht deklarierten Symbole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:route-guard-membership`    | Jede Route, die einen untergeordneten Prozess startet, wird durch `isLocalOnlyPath()` klassifiziert (Verbindliche Regeln Nr. 15/Nr. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:test-discovery`            | Jede `*.test.ts`- / `*.spec.ts`-Datei im Repository wird von mindestens einem Test-Runner erfasst (Ratchet-Prinzip: Die Liste verwaister Dateien in `test-discovery-baseline.json` darf nur kleiner werden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:test-tla-order`            | Keine `node:test`-Datei unter `tests/unit` registriert einen Test, erreicht anschließend ein `await` auf oberster Ebene und registriert danach weitere Tests (#18045; Ratchet-Prinzip: `test-tla-order-allowlist.json` darf nur kleiner werden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:agent-skills-sync`         | Generierte Agent-Skills-Artefakte stimmen mit ihrem Quellkatalog überein (keine Abweichungen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Anbieterlogos/-Assets verfügen über einen dokumentierten Herkunftsnachweis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON-Konfigurationsdateien können geparst werden und erfüllen die Lint-Regeln des Repositorys                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-Kompilierung ohne Fehler (nur informative Warnungen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `typecheck:noimplicit:core`       | Striktes `noImplicitAny` — zukunftsorientiert; viele bereits vorhandene Aufrufstellen benötigen noch Annotationen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Informativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Auf `src/app/(dashboard)/**` beschränktes `tsc` (#7033) — die kuratierte Positivliste von `typecheck:core` mit 27 Dateien enthält keine Dashboard-TSX-Dateien, und `next build` führt dafür ebenfalls nie eine Typprüfung durch (`next.config.mjs` setzt `ignoreBuildErrors: true`), sodass Regressionen durch verwaiste Bezeichner dort (#6625/#6909) für CI unsichtbar waren. Vergleicht mit einer eingefrorenen Baseline der Anzahl pro Datei und TS-Code (`config/quality/dashboard-typecheck-baseline.json`, dasselbe Muster zur Erzwingung der Aktualität wie bei `check:known-symbols`) — nur NEUE Fehler, die über die in der Baseline festgelegte Anzahl hinausgehen, lassen das Gate fehlschlagen; mit `--update` nach unten anpassen, wenn ein bereits vorhandener Fehler behoben wurde.                                                                                                                                                                                                               | Ja                                         |

### Job: `quality-gate`

Wird nach `test-coverage` ausgeführt. Blockiert bei einem Fehler das Zusammenführen.

| Skript                       | Validiert                                                                                                                                                                                               | Blockierend          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Erzeugt `quality-metrics.json` (Anzahl der ESLint-Warnungen, Abdeckung aus dem zusammengeführten Shard-Bericht)                                                                                         | Ja (vor dem Ratchet) |
| `quality:ratchet`            | Keine Metrik in `quality-baseline.json` hat sich verschlechtert (ESLint-Warnungen ≤ Baseline; Abdeckung ≥ Baseline)                                                                                     | Ja                   |
| `check:duplication`          | Codeduplizierung (jscpd@4) überschreitet die Baseline in `quality-baseline.json` nicht                                                                                                                  | Ja                   |
| `check:complexity`           | Die zyklomatische Komplexität auf Dateiebene überschreitet die Obergrenze nicht (ESLint-Kernregeln `complexity` + `max-lines-per-function`)                                                             | Ja                   |
| `check:cognitive-complexity` | Ratchet für kognitive Komplexität (`eslint-plugin-sonarjs`) — separater ESLint-Durchlauf; CI führt beide zusammengeführt als einzelnen Schritt `check:complexity-ratchets` aus                          | Ja                   |
| `check:dead-code`            | Ratchet für ungenutzte Exporte/Dateien (knip) verschlechtert sich gegenüber der Baseline nicht                                                                                                          | Ja                   |
| `check:compression-budget`   | Budget für den Komprimierungsbenchmark — Mindestwerte der Tokeneinsparungen pro Engine dürfen sich nicht verschlechtern                                                                                 | Ja                   |
| `check:type-coverage`        | Ratchet für den prozentual typisierten Anteil (`type-coverage`) verschlechtert sich nicht; ersetzt `typecheck:noimplicit:core` weitgehend                                                               | Ja                   |
| `check:codeql-ratchet`       | Anzahl offener CodeQL-Warnungen verschlechtert sich nicht (Abruf über `gh api`; kontrolliertes Überspringen ohne Token) — Aktualisierungsintervall und manuelle Auslösung: siehe „CodeQL-Ratchet“ unten | Ja                   |

### Job: `quality-extended`

Der gesamte Job ist informativ (`continue-on-error: true`). Die npm-basierten Ratchets werden
tatsächlich ausgeführt; die externen Scanner werden über `gh release download` installiert und überspringen sich selbst (Exit-Code 0),
wenn eine Binärdatei weiterhin fehlt.

| Skript                   | Validiert                                                                                                                                                                                                                               | Blockierend                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Keine zyklischen Abhängigkeiten (dpdm)                                                                                                                                                                                                  | **Informativ**                                          |
| `check:bundle-size`      | Bundle-Größe überschreitet die Obergrenze nicht                                                                                                                                                                                         | **Informativ**                                          |
| `check:secrets`          | Suche nach Geheimnissen (gitleaks) — wird übersprungen, wenn die Binärdatei fehlt                                                                                                                                                       | **Informativ**                                          |
| `check:vuln-ratchet`     | Abhängigkeitsschwachstellen (osv-scanner) verschlechtern sich nicht — wird übersprungen, wenn die Binärdatei fehlt                                                                                                                      | **Informativ**                                          |
| `check:workflows`        | Workflow-Linting (actionlint + zizmor); fehlende/defekte Scanner, ungültige Berichte oder eine fehlende Ratchet-Baseline führen zum Status INCOMPLETE. Gültige Befunde folgen der ausgewählten strikten/informativen/Ratchet-Richtlinie | Ausführung erforderlich; zizmor-Ratchet blockiert in CI |
| `check:openapi-breaking` | Inkompatible Änderungen am öffentlichen API-Vertrag (`openapi.yaml`) gegenüber dem Basis-Branch (oasdiff) — erzeugt `openapiBreaking=N`; wird übersprungen, wenn oasdiff fehlt oder die Basisspezifikation nicht aufgelöst werden kann  | **Informativ**                                          |

### Job: `docs-sync-strict`

Wird bei jedem PR an `main` ausgeführt. Blockiert bei einem Fehler das Zusammenführen.

| Skript                         | Validiert                                                                                                                                                                          | Blockierend                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-Gate, das die sechs unten aufgeführten Sub-Gates nacheinander ausführt                                                                                                        | Ja                         |
| ↳ `check:docs-sync`            | Versionskonsistenz zwischen CHANGELOG, OpenAPI und llm.txt                                                                                                                         | Ja                         |
| ↳ `check:docs-counts`          | Zahlenangaben im Fließtext (Anbieteranzahl, Migrationsanzahl usw.) liegen innerhalb des Ratchet-Fensters der tatsächlichen Werte                                                   | Ja                         |
| ↳ `check:env-doc-sync`         | Jede Umgebungsvariable in `.env.example` ist in einer Dokumentationstabelle dokumentiert und umgekehrt                                                                             | Ja                         |
| ↳ `check:deprecated-versions`  | Keine veralteten Versionszeichenfolgen in der Dokumentation                                                                                                                        | Ja                         |
| ↳ `check:doc-links`            | Interne Markdown-Links in der Dokumentation verweisen auf vorhandene Dateien (Format `[text]`/`(path)`)                                                                            | Ja                         |
| ↳ `check:fabricated-docs`      | In der Dokumentation genannte Routen, Umgebungsvariablen, CLI-Befehle, Hook-Namen und Dateipfade existieren in der Codebasis. Hartes Gate mit `--strict`; ohne Flag nur Soft-Fail. | Ja (über `--strict` in CI) |
| `check:cli-i18n`               | CLI-Befehlszeichenfolgen sind in allen i18n-Locale-Dateien vorhanden                                                                                                               | Ja                         |
| `check:openapi-coverage`       | Die OpenAPI-Spezifikation deckt mindestens einen per Ratchet festgelegten Mindestanteil der tatsächlichen Routen ab                                                                | Ja                         |
| `check:openapi-security-tiers` | Sicherheitsstufen-Annotationen in `openapi.yaml` stimmen mit den Klassifizierungen in `routeGuard.ts` überein                                                                      | **Hinweis**                |
| `check:openapi-routes`         | Jeder Pfad in `openapi.yaml` verweist auf eine tatsächlich vorhandene `route.ts` (Anti-Halluzinationsprüfung)                                                                      | Ja                         |
| `check:docs-symbols`           | Jede `/api/...`-Referenz in `docs/**/*.md` verweist auf eine tatsächlich vorhandene `route.ts` (Anti-Halluzinationsprüfung)                                                        | Ja                         |
| `i18n translation drift`       | Nicht übersetzte Schlüssel in i18n-Locale-Dateien – nur Warnung                                                                                                                    | **Hinweis**                |

### Job: `i18n-ui-coverage`

| Skript                            | Validiert                                                                                                                                                                                                                        | Blockierend |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Die Abdeckung der UI-i18n-Schlüssel beträgt ≥ 65 %                                                                                                                                                                               | Ja          |
| `check-ui-value-drift` (inline)   | Nach dem Umschreiben eines englischen **Werts** bleibt keine veraltete Übersetzung zurück                                                                                                                                        | Ja          |
| `check-new-key-coverage` (inline) | Ein **neuer** englischer Schlüssel ist in jeder Locale übersetzt – eine `__MISSING__:`-Markierung wird abgelehnt                                                                                                                 | Ja          |
| `check-translation-ratio`         | Der Anteil echter Übersetzungen pro Locale (mit dem Englischen identische, Platzhalter- oder fehlende Blätter außerhalb der Zulassungsliste) darf `config/quality/i18n-translation-baseline.json` + Toleranz nicht überschreiten | **Hinweis** |

Benötigt `fetch-depth: 0` – das Value-Drift-Gate vergleicht `en.json` mit der Merge-Basis.

#### `check-ui-value-drift` – Gate gegen veraltete Übersetzungen

Erkennt die eine i18n-Regression, die für die anderen Gates strukturell unsichtbar ist: Ein englischer Wert
wird umgeschrieben, während die aus dem _vorherigen_ englischen Text abgeleiteten Übersetzungen bestehen bleiben, sodass
nicht englischsprachige Benutzer weiterhin bestimmt formulierte, aber inzwischen falsche Texte lesen.

Dies gelangte tatsächlich in Produktion. `oauthModal.googleOAuthWarning` wurde umgeschrieben, als der Antigravity-
Anmeldehelfer eingeführt wurde (#5203); **39 von 43 Locales** behielten den Text, der Betreiber anwies, „die
vollständige URL zu kopieren und unten einzufügen“ – ein Ablauf, der für diesen Anbieter nicht abgeschlossen werden kann. Dies blieb
bis #8463 unbemerkt, weil:

- `sync-ui-keys` nur **fehlende** Schlüssel ergänzt, niemals **veraltete**;
- `check-ui-keys-coverage` das _Vorhandensein_ von Schlüsseln zählt, sodass eine veraltete Übersetzung als abgedeckt gilt;
- `check-translation-drift` die Dokumentationsspiegel unter `docs/i18n/<locale>/**.md` verfolgt –
  `src/i18n/messages/*.json` wird dabei nie gelesen. Seit der Neusynchronisierung 2026-09 im Job `docs-sync-strict` blockierend:
  ein Kerndokument bearbeiten → `npm run i18n:run -- --files=<doc>` (abschnittsweise, kostengünstig).

**Diff-bewusst, nicht durch eine Baseline gestützt.** Es vergleicht `en.json` am Merge-Base mit dem
Arbeitsbaum; für jeden Schlüssel, dessen englischer Wert geändert wurde, ist jede Locale mit
einer unveränderten Übersetzung veraltet. Dadurch werden **bereits bestehende Altlasten bewusst eingefroren** — ein Diff
kann nicht erkennen, aus welcher alten englischen Fassung eine seit Langem bestehende Übersetzung stammt, daher bewertet
die Prüfung nur, was von der aktuellen Änderung betroffen ist. Die Alternative (eine Hash-Baseline pro Schlüssel) würde
eine generierte Datei von ca. 600 KB erfordern, dreimal so groß wie die größte vorhandene Baseline, die sich bei jedem i18n-PR ändern würde.

Es gibt zwei Möglichkeiten, die Prüfung zu erfüllen:

1. die betroffenen Übersetzungen aktualisieren oder
2. sie auf `__MISSING__:<new english>` setzen — zur Laufzeit wird dann das korrigierte Englisch
   ausgeliefert (`src/i18n/request.ts::deepMergeFallback`, #7258) und der Schlüssel zur Übersetzung eingereiht.

Wenn sich die **Bedeutung** der Zeichenfolge geändert hat, sollte der **Schlüssel umbenannt** werden: Ein neuer Schlüssel kann
keine veraltete Übersetzung übernehmen. Dieses Muster wurde in #8463 verwendet.

```bash
npm run i18n:check-value-drift          # strikt (wird in CI ausgeführt)
npm run i18n:check-value-drift:warn     # nur Bericht
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Wird der Basiskatalog nicht gelesen (flacher Clone ohne Basis-Ref), wird der Prozess mit Statuscode 0 und
`SKIP reason=base-unresolved` beendet, analog zu `check-openapi-breaking`.

### Job: `i18n`

Vollständige i18n-Validierungsmatrix (ein Job pro Locale). Der gesamte Job ist nicht blockierend.

| Skript                          | Validiert                                 | Blockierend                                                            |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| `validate_translation.py quick` | Vollständigkeit der Übersetzung je Locale | **Nicht blockierend** (`continue-on-error: true` für den gesamten Job) |

### Job: `pr-test-policy`

Wird nur für Pull Requests ausgeführt.

| Skript                 | Validiert                                                                                                                                        | Blockierend |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | PRs, die Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` ändern, müssen Tests enthalten oder aktualisieren (Harte Regel Nr. 8)   | Ja          |
| `check:test-masking`   | Geänderte Testdateien verringern nicht die Nettoanzahl der Assertions und fügen keine `assert.ok(true)`-Tautologien hinzu                        | Ja          |
| `check:pr-evidence`    | Der PR-Text nennt Test-/VPS-Nachweise für die Änderung (automatisiert Harte Regel Nr. 18 durch Durchsuchen des PR-Texts — fragil, siehe Backlog) | Ja          |

### Job: `test-vitest`

Wird nach `build` ausgeführt. Blockiert den Merge bei einem Fehler.

| Suite            | Validiert                                                     | Blockierend                                                                                                                                 |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-Server (110 Tools), autoCombo, Cache — Vitest-Test-Runner | Ja                                                                                                                                          |
| `test:vitest:ui` | UI-Komponententests — Vitest-Test-Runner                      | **Blockierend** — bereits bestehende Fehler sind in `vitest.config.ts` ausdrücklich ausgeschlossen; neue Fehler lassen den Job fehlschlagen |

### Nächtliche Workflows (zeitgesteuert, nicht blockierend)

Diese werden nach einem Cron-Zeitplan (und über `workflow_dispatch`) ausgeführt, niemals für PRs. Sie sind alle nicht blockierend.

| Workflow               | Validiert                                                                                                                                                                               | Blockierend           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `nightly-property`     | fast-check-Property-Tests mit zufälligem Seed und hoher Anzahl an Durchläufen                                                                                                           | **Nicht blockierend** |
| `nightly-resilience`   | Prüfung des Heap-Wachstums, Chaos-Fehlerinjektion, k6-Last-/Dauertests                                                                                                                  | **Nicht blockierend** |
| `nightly-llm-security` | promptfoo-Injection-Schutz (Blockierungsmodus) + garak-Prüfungen (werden ohne Provider-Secret übersprungen)                                                                             | **Nicht blockierend** |
| `nightly-schemathesis` | OpenAPI-Vertrags-Fuzzing (schemathesis) anhand von `docs/openapi.yaml` gegen eine laufende OmniRoute-Instanz — deckt Spezifikationsverstöße/unbehandelte 500er-Fehler auf (Phase 8 B.4) | **Nicht blockierend** |
| `nightly-mutation`     | Stryker-Mutation-Testing-Ergebnis für die schnelle Unit-Test-Pipeline — überlebende Mutanten decken schwache Assertions auf                                                             | **Nicht blockierend** |
| `nightly-compat`       | Node-Engine-Kompatibilitätsmatrix für die unterstützten `engines.node`-Bereiche                                                                                                         | **Nicht blockierend** |

Performance-Baselines (Heap, TTFB, Build-Zeit) werden aufgezeichnet, aber nicht als Prüfkriterium verwendet: siehe [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
