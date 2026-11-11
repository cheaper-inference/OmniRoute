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

Die CI und Quality Gates-Workflows geben jeweils ein stabiles Urteil ab: `Gate / CI` und `Gate / Quality`. Ihre versionierte Zulassungsrichtlinie listet jeden Upstream-Job nach Bedarf oder Empfehlung auf. Ein anwendbarer erforderlicher Job muss erfolgreich sein: Fehlende, abgebrochene, übersprungene, ausstehende und unbekannte Ergebnisse können keine PASS ermitteln. Eine gültige Nur-Dokumente- oder Nur-Katalog-Klassifizierung kann dazu führen, dass eine Codespur nicht anwendbar ist. Ein gewöhnlicher PR -Entwurf ist kein akzeptierter Kandidat. Ein `hotfix` Label verzichtet nicht auf Nachweise.

Beide Workflows umfassen PRs in main/release Zweige, Pushs an `main`, manuelles Versenden und Merge-Group-Ereignisse. Push, Dispatch und Merge-Group führen die vollständige Auswahl aus. Ein vertrauenswürdiger Mergify-Warteschlangenentwurf führt auch anwendbare `full-code`/`full-code-e2e` Jobs aus; normale PRs überspringen sie. Führen Sie vor einer manuellen Zusammenführung einen vollständigen Versand für den genauen Kandidaten durch. Pushvorgänge an `release/**` starten diese Workflows nicht; Release-Green beobachtet die zusammengeführte Basis separat (`docs/ops/RUNNER_BOX.md` → Hosted Lane). Forks und Merge-Gruppen verwenden gehostete Läufer für Jobs, die ansonsten selbstgehostete Läufer auswählen; Vor der Einführung muss eine ausreichende gehostete Kapazität überprüft werden.

Eine gewöhnliche PR führt die Schnellauswahl durch. Die `full-code` und `full-code-e2e` Spuren der Zulassungsrichtlinie (E2E, Integration, Paketartefakt, Electron Smoke, Bun SQLite, Ökosystem- und Protokoll-Clients) werden nur bei einem Mergify-Warteschlangenentwurf oder bei einem vollständigen Lauf ausgeführt: `gh workflow run ci.yml --ref <branch>`.

Jede JSON Quittung identifiziert den ausgecheckten SHA, den Workflow-Lauf und den Versuch. Der CLI lehnt eine checkout/event SHA Nichtübereinstimmung ab. Workflow-Tests binden die Richtlinienmitgliedschaft an die `needs` -Liste des Verdict-Jobs, sodass eine neue oder entfernte Spur nicht stillschweigend verschwinden kann. Die Belege decken ihren eigenen Arbeitsablauf ab, nicht die Veröffentlichung, Bereitstellung oder die Interna eines vorhandenen Beratungsscanners. Die Durchführung der entsprechenden Prüfungen, die in den Filialregeln erforderlich sind, ist eine separate administrative Änderung; Die Festlegung ihrer Aufgaben allein schützt eine Branche nicht.

`API Route Typecheck` ist eine unabhängige Workflow-Prüfung, die sowohl außerhalb der aggregierten Urteile als auch des statischen Profils des lokalen vollständigen Beobachters liegt. Überprüfen Sie das Ergebnis separat auf den genauen Kandidaten. `.github/workflows/api-route-typecheck.yml` läuft auf PRs in `main` oder `release/**`, pusht zu einer der Zweigfamilien, zum manuellen Versand und zu `merge_group` Ereignissen vom Typ `checks_requested`. Es gibt keinen Pfadfilter. Gruppen zusammenführen, siehe `merge_group.head_sha`; Weitere Veranstaltungen finden Sie unter `github.sha`. Alle Ereignisse verwenden die gleichen API -Diagnose-Gate- und Gate-Unit-Tests. PR -Basis-Retargets fordern eine neue Prüfung an; body/title Änderungen verwenden den reinen Beobachtungsnamen `Admission not requested / API Route Typecheck` und können die Zulassungsprüfung nicht ersetzen.

### Beweissicherung im Akzeptanzminderer

`scripts/quality/validate-release-acceptance.mjs` reduziert einen bereitgestellten Plan und seine Manifeste; Es wird nicht festgestellt, dass der Plan die gesamte Release-Pipeline abdeckt. In seinen Berichten wird `releaseAcceptance: false` explizit festgelegt, auch wenn dieser Plan `VERIFIED` ist. Der `release-acceptance.yml` Workflow verwendet immer noch Schattenvorrichtungen, keine echten Build-, Paket-, Boot- oder Promotion-Belege.

Die CLI verlangt `--evidence-root` die Überprüfung der aufbewahrten Beweise. Dateien werden als `<evidence-root>/<artifact_id>/<member>` aufgelöst und als SHA-256 gehasht. Ein PASS Eintrag ohne Beweise, eine fehlende oder geänderte Datei, ein unsicherer Pfad oder ein symbolischer Link verhindern die Überprüfung. Fehlende Dateien sind nicht gleichbedeutend mit leeren erfolgreichen Protokollen. Bestehende SHA/run/attempt Prüfungen bleiben unabhängig: Übereinstimmende Bytes können eine veraltete Quittung nicht retten. Die Dateiintegrität ist kein Beweis für die Authentizität der Ausführung oder die Förderung von Artefakten.

### DAST nutzt den verifizierten CI -Build

Der erforderliche `dast-smoke` CI Job ruft `.github/workflows/dast-smoke.yml` nach `build` auf. Es folgt der gleichen code/draft Auswahl wie der Build, einschließlich unterstützter Fork PRs, Release-Ziel- PRs und Merge-Gruppen. Ein fehlender, fehlgeschlagener, abgebrochener oder unerwartet übersprungener DAST Job blockiert `Gate / CI`. Der wiederverwendbare Workflow verfügt über keinen unabhängigen PR/dispatch Trigger; Bei der manuellen Validierung wird der Dispatch von CI verwendet, sodass Build und Consumer in einem Lauf bleiben.

`scripts/ci/next-build-provenance.mjs` versiegelt das vollständige Next-Artefakt mit seinem Tar-Digest, repository/event/run, Producer-Versuch, head/base/checkout/tree, Workflow-Identitäten, Lockfile, exaktem Node- version/ABI, Plattform und Bundler. DAST wählt das unveränderliche Artefakt ID aus `needs.build.outputs` aus, erfordert eine Überprüfung des Download-Digests und hasht das ZIP unabhängig mit dem Producer-Digest, bevor es seine beiden zugelassenen Mitglieder über `scripts/ci/unpack-ci-build.py` extrahiert. Das Manifest und das TAR-Archiv müssen außerdem mit den Ausgaben unabhängiger Produzenten übereinstimmen, bevor der nächste Baum extrahiert wird. Es wird nie nach dem neuesten erfolgreichen Branch-Build gesucht. Bei einer teilweisen Wiederholung kann derselbe Versuch des Produzenten erneut verwendet werden, wenn sein ID und alle Eingaben immer noch übereinstimmen. Auf der Quittung sind beide Versuche vermerkt.

Der Verbraucher bleibt auf einem gehosteten Linux Läufer mit schreibgeschützter Repository-Berechtigung und ohne Repository-Geheimnisse. Es installiert die genaue Knotenversion des Herstellers und assembliert dann den CLI mit `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` lehnt einen fehlenden Standalone-Server vor jedem Fallback-Build ab; Normale lokale CLI -Builds behalten ihr bestehendes Fallback. Serverbereitschaft, Schemathesis und promptfoo müssen alle innerhalb des unveränderten 25-Minuten-Joblimits erfolgreich sein. Eine Herkunftsquittung beweist die Identität und Bytes der Eingabe, kein erfolgreicher DAST Scan. Artefaktablauf, Läuferunterbrechung oder ein fehlgeschlagener Scanner bleiben unvollständig oder fehlgeschlagene Beweise; Es kann nicht durch einen beratenden Wrapper zu PASS werden.

### UI Ausführungskapazität

CI führt das gesamte UI Inventar als vier `test-vitest` Matrix-Shards aus, jeweils mit höchstens zwei Workern pro Shard und der bestehenden Jobfrist von 15 Minuten. Auf dem ersten Shard wird auch die MCP/autoCombo Vitest Suite ausgeführt. Das erforderliche Jobergebnis deckt jeden Matrixzweig ab; Das Scheitern oder Annullieren eines Shards kann keine Zulassung des Kandidaten begründen.

Der nächtliche Beobachter behält für jeden UI Shard eine separate Quittung über den genauen Kandidaten, einschließlich der MCP Ausführung in der ersten Quittung. Alle vier Belege, Protokolle und passenden Ausführungsidentitäten sind erforderlich. Der lokale `npm run test:vitest:ui` wählt weiterhin die komplette Suite aus; Ein `--shard` -Lauf ist nur ein Teilbeweis.

### Erfassung der Einheitsdeckung

Die zwölf Einheiten-Shards erfassen während ihrer bestehenden Testausführung die V8-Abdeckung. Bei einem erfolgreichen Shard wird `scripts/ci/compact-v8-coverage.mjs` ausgeführt, um die Originaldateien zu komprimieren, ohne einen Istanbul-Zwischenbericht zu erstellen. Der letzte Coverage-Job überprüft alle zwölf Manifeste anhand des Kandidaten SHA, der Laufzeit, des Quellstamms und der Daten-Hashes und führt dann die Reporter von c8 und vorhandene Coverage-Schwellenwerte aus. Eingaben behalten die globale Dateinamenreihenfolge von c8 bei; Die Vorzusammenführung pro Shard ist für eine gemischte function/block Abdeckung unsicher. Fehlende, fehlerhafte oder inkompatible Shards schlagen bei der Zulassung fehl. Für fehlgeschlagene Test-Shards bleibt die Rohdiagnoseabdeckung separat erhalten. Es kann nicht an der endgültigen Zusammenführung teilnehmen.

### Quittungen über den Fortschritt der Einheitenausführung

Der gemeinsame `test:unit:ci:shard` Befehl zeichnet die Phasen `primary`, `dashboard` und `serial` über `scripts/ci/unit-progress-reporter.mjs` auf. Der normale Prüfbericht bleibt weiterhin verfügbar. Eine separate Quittung, die nur aus Metadaten besteht, zeichnet den Start und Abschluss jeder Datei auf, und ein 30-Sekunden-Heartbeat listet die noch aktiven Dateien und ihre verstrichene Zeit auf. Es zeichnet nur Ausführungsmetadaten auf, die auf der Zulassungsliste stehen. Testbeschreibungen, Ausgaben, Fehlertexte und die gesamte Umgebung werden nicht serialisiert.

CI behält die JSONL Dateien als `unit-progress-ci-<run>-<attempt>-<shard>` bei. Ein Job-Timeout kann den späteren Upload verhindern; Bereits abgegebene Herzschläge bleiben diagnostischer Beweis. Fehlende Heartbeats können auch auf einen blockierten oder beendeten Runner-Prozess hinweisen. Diese Belege bewahren die bestehende Testauswahl, Parallelität, Fristen und den Beendigungsstatus; Es handelt sich nicht um Urteile über die Zulassung von Kandidaten.

### Warteschlange zusammenführen

Das `queue` Label sendet einen PR an die Mergify-Warteschlange (`.mergify.yml`). Mergify öffnet einen PR -Entwurf in einem `mergify/merge-queue/` Zweig, CI führt dort die vollständige Auswahl aus und der ursprüngliche PR wird zusammengeführt, wenn `Gate / CI`, `Gate / Quality` und `Merge integrity (changelog + generated skills)` bestehen.

Mergify schreibt seine Warteschlangenzusammenfassung in die Beschreibung des Entwurfs. Body/title-only `pull_request` `edited` Ereignisse verwenden eine laufspezifische Parallelitätsgruppe und führen keine Klassifizierung, Testmatrizen, Zusammenführungsintegrität oder das Zulassungsurteil erneut aus. Namen von Nur-Beobachtungs-Prüfungen können `Gate / CI` oder `Gate / Quality` nicht ersetzen. Eine Bearbeitung, die die Zielbasis ändert, erfordert eine neue Kandidatenvalidierung.

Nach einem Auszug aus der Warteschlange wird die PR durch einen Push nicht immer erneut in die Warteschlange gestellt. Kommentieren Sie `@mergifyio queue` dazu.

### Statisches Scan-Inventar

Das versionierte npm-alias-Inventar und die Static-Scan-Mitgliedschaft sind in `config/quality/gate-manifest.json` verfügbar. Führen Sie `npm run check:gate-manifest` aus, um Skriptnamen und genaue Befehle anhand von `package.json` zu validieren. Hinzufügungen, Entfernungen und Befehlsdrift schlagen sowohl beim lokalen Hook als auch bei den Änderungsklassifizierungsjobs in CI fehl. Ein Alias ist kein Workflow-Job, keine Matrixinstanz oder kein Testfall: Diese Zählungen dürfen nicht als austauschbar dargestellt werden.

Verwenden Sie `npm run quality:scan -- --list` oder `npm run quality:scan:fast -- --list`, um die ausgewählten Aliase zu überprüfen, ohne sie auszuführen. Der Läufer ruft den npm-Einstiegspunkt auf, sodass seine Laufzeit (einschließlich Bun sofern konfiguriert) erhalten bleibt. Das Manifest zeichnet Aliase außerhalb dieser Profile als separat aufgerufen auf, und Wartungsbefehle sind in schreibgeschützten Scanprofilen verboten.

Diese Profile decken nur den statischen Scan ab. Sie zertifizieren keine Produkttests, Abdeckung, Verpackung, externe Prüfungen oder die vollständige Freigabeabnahme eines Kandidaten. Die Workflow-Zulassung nutzt die verknüpften `config/quality/admission-policy.json` und `scripts/quality/admission-verdict.mjs`. Release-Beobachter-Profile bleiben getrennt; die entsprechenden Schecks und Quittungen selbstständig prüfen. Die statischen Befehle des vollständigen Beobachters werden in `config/quality/release-green-static-profile.json` deklariert, einschließlich `audit:deps`, Mutationstestauswahl und Übersetzungsprüfungen. Der Loader validiert npm-Befehle anhand von package.json und modellierten CI/Quality Deklarationen. Es lehnt Drift ab, anstatt Shell-Token als Argumente auszuführen. Der erforderliche Scanner- SKIP/INCOMPLETE Ausgang kann PASS nicht herstellen. Das Profil zeichnet seine externen Ausschlüsse auf und ersetzt nicht die gehostete Abdeckung, Testmatrizen, Paket- oder Bereitstellungsnachweise. Die folgende Prosainventur ist eine Referenz und kein Beweis dafür, dass tatsächlich ein Tor geöffnet war.

Skripte leben unter `scripts/check/` (Policy Gates) und `scripts/quality/` (Ratchet Engine). Die CI Quelle der Wahrheit ist `.github/workflows/ci.yml`.

### Zustand der veröffentlichten Dokumentation

`.github/workflows/i18n-base-health.yml` überwacht den Zustand der Dokumentation nach ausgewählten Pushvorgängen an `main` und `release/v*` sowie beim manuellen Versand. Seine Filter umfassen Dokumentation, Root-Markdown, `llm.txt`, Übersetzungs- state/configuration und die relevanten i18n-Tools. Der einzelne `Published base documentation health` Job nutzt gehostetes Ubuntu und eine Frist von fünf Minuten. Es führt eine schreibgeschützte Validierung durch und schreibt einen Diagnosebeleg ohne Abhängigkeitsinstallation, Übersetzung oder Statusübernahme.

`scripts/i18n/check-base-health.mjs` erfordert keine Inkonsistenzen bei Quell-Hash, fehlendem Ziel, Ziel-Hash, veralteter Übersetzung und Abschnitts-Cache. Es validiert auch den aktuellen document/locale Kernumfang und seine aufgezeichnete Herkunft. Ungültiger Kontext, unvollständige Abdeckung oder ein unterbrochener Prüfer erzeugen `INCOMPLETE`; bestätigte Drift erzeugt `FAIL`. Beide geben einen fehlgeschlagenen Exit-Status zurück. Der Beleg ist an Kasse SHA, Workflow, Lauf und Versuch gebunden und wird als `i18n-base-health-<sha>-<run>-<attempt>` beibehalten.

Dies ist eine unabhängige Beobachtung der veröffentlichten Basis. Es fügt kein PR oder Merge-Group-Ereignis, keine erforderliche PR Prüfung, keinen NPM-Alias und kein Static-Scan-Profilmitglied hinzu. Der zugrunde liegende Prüfer blockiert auch alle fünf Klassen im absoluten Modus. Die reguläre PR Vorbereitung bleibt von der Zulassung getrennt. Ein erfolgreicher Upload kann ein fehlgeschlagenes Gesundheitsergebnis nicht in PASS umwandeln.

Eine gewöhnliche PR verwendet `--preflight` mit einem von `--baseline-evidence` generierten Basisbericht. Eine englische Quelle kann nur dann ausstehen, wenn der vollständige Übersetzungsdatensatz und die tatsächlichen Zielbytes gegenüber dieser genauen Basis unverändert bleiben. Neue Ziel- oder Abschnitts-Cache-Inkonsistenzen blockieren immer noch, und unvollständige Beweise können die Vorbereitung nicht autorisieren. Der Bericht stellt `preparationPending` und `mergeReady` getrennt dar: Eine erfolgreiche Vorbereitung macht ausstehende Übersetzungen nicht bereit für die Zusammenführung. Aktualisieren Sie die betroffenen Spiegel im zusammengesetzten Kandidaten vor der Zulassung. Der vertrauenswürdige Mergify-Warteschlangenkandidat `merge_group`, Branch Pushs und manuelle CI Läufe verwenden den absoluten Prüfer, ohne `--warn` oder Vergebung geerbter Fehler. Fehlende Ziel-Hashes und ein durch gelöschte aufgezeichnete Kerndateien reduzierter Umfang können nicht zu einem erfolgreichen absoluten Urteil führen.

### PR Fast-Path (`quality.yml`) freigeben

`.github/workflows/quality.yml` ergänzt CI auf main/release PRs, pusht auf `main`, verteilt Gruppen und führt sie zusammen. PRs verwendet pfadgefilterte Schnellprüfungen. Der dauerhaft deaktivierte Duplikat-Build wurde entfernt; die echten build/package/boot -Prüfungen verbleiben im CI. Die Unit Suite und vitest laufen nur in CI (`Unit Tests (N/12)` und `Vitest`).

| Arbeit                                           | Umfang                                                                                                                                                                                                                                       | Blockierung               |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API Dokumentreferenzen und Dokumente-alle                                                                                                                                                                                     | Ja                        |
| `Fast Quality Gates`                             | Code PRs; Statische Prüfungen, Typprüfung, Dashboard-Typprüfung, betroffene Komponententests                                                                                                                                                 | Ja                        |
| `Forgotten sibling tests`                        | Code PRs; geänderte Module, die auf statische Verbraucher und Kandidaten-Geschwistertests zurückgeführt werden; Barrel- und Dynamic-Import-Pfade werden als beratende Diagnose mit referenzierten Ausnahmen auf der Zulassungsliste gemeldet | **Beratung**              |
| `No new ESLint warnings`                         | Code PRs; Unterdrückungsbewusster Flusenschutz                                                                                                                                                                                               | Ja, einschließlich Gabeln |
| `Merge integrity (changelog + generated skills)` | PRs ohne Entwurf; Änderungsprotokoll und generierte Skill-Synchronisierung                                                                                                                                                                   | Ja, einschließlich Gabeln |

#### Bericht über vergessene Geschwistertests

`npm run check:forgotten-sibling-tests` wird als Beratungsschritt von `Fast Quality Gates` ausgeführt und verwendet den Import-Resolver hinter der Test-Impact-Map wieder. Für jedes geänderte Produktionsmodul werden deterministische `changed module/symbol -> static consumer -> candidate sibling test` Ketten gemeldet, wenn der Kandidatentest im Pull-Request-Diff fehlt. Die Markdown-Zusammenfassung und JSON Ergebnis werden als `forgotten-sibling-tests` -Workflow-Artefakt zur Kalibrierung vor einem blockierenden Rollout beibehalten.

Bei Fass-Reexporten und dynamischen Importen handelt es sich lediglich um Auflösungsdiagnosen. Sie erstellen niemals einen blockierenden Befund. Überprüfte Ausnahmen live in `config/quality/forgotten-sibling-allowlist.json`. Jeder Eintrag muss den Verbraucher- und Kandidatentest benennen, eine spezifische Begründung angeben und einen GitHub -Issue- oder Pull-Request verlinken. Fehlerhafte Einträge können nicht geschlossen werden. Ausnahmen können einen gelöschten Kandidatentest oder einen Diff, der `.skip`/`.todo` hinzufügt, nicht unterdrücken; Behauptungsschwächung und andere Maskierungen bleiben Eigentum des unabhängig blockierenden `check:test-masking` Gates.

### Beruf: `lint`

Läuft auf jedem PR bis `main`. Bei einem Fehler werden Blöcke zusammengeführt.

| Skript (`npm run ...`)            | Validiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blockierung                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Node.js Version liegt im unterstützten Bereich                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                       |
| `check:cycles`                    | Zirkuläre Importe im gesamten `src/` + `open-sse/` (AST-basiert, tsconfig `paths` behoben). Bare beendet 1, wann immer ein Zyklus existiert (seit #15281 fehlgeschlagen) und listet die SCCs auf. `check:cycles:ratchet` (was CI ausführt) blockiert, wenn die Zählung die `metrics.cycles` Obergrenze in `quality-baseline.json` — derzeit 14 überschreitet, `direction: down`, sodass sie nur fallen kann (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja (Ratsche)                             |
| `check:boundary`                  | `open-sse → src` Kopplung: Eindeutige Datei-zu-Datei-Importe von der Engine in die App (`scripts/quality/measure-boundary.mjs`; die Edge-Liste ist der v4- core/module-split -Remediation-Backlog). Bare = -Beratungsbericht (identisch mit `quality:boundary`). `check:boundary:ratchet` (was CI ausführt, auch in der `quality.yml` -Fast-Gates-Ratschenschleife) blockiert, wenn die Zählung die `metrics.boundaryOpenSseToSrc` Obergrenze in `quality-baseline.json` überschreitet. — gesetzt beim gemessenen 771, `direction: down`; `--update` senkt es nur; basisrelativ zu PRs (`--base-ref`, siehe unten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja (Ratsche)                             |
| `check:route-validation:t06`      | Zod Schemata auf allen Routen vorhanden (Tier-6-Richtlinie)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` Anzahl überschreitet nicht das Budget (Tier 11 Catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                       |
| `check:provider-consistency`      | Jeder Anbieter in `providers.ts` hat einen passenden Eintrag in `providerRegistry.ts` (und umgekehrt, innerhalb der Zulassungsliste)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                       |
| `check:model-lifecycle`           | Die drei manuell gepflegten Routing-Tabellen bleiben mit dem eingecheckten Lebenszyklus-Snapshot konsistent (#11503): `FITNESS_TABLE` (`taskFitness.ts`) punktet nicht im Ruhestand `REGISTRY` kann routen; jeder `BUILT_IN_ALIASES` Das Ziel ist vorhanden `REGISTRY` und fehlt im Ruhestand-ID-Schnappschuss; Jeder Rentnerausweis ist noch da `REGISTRY` weitergeleitet oder eingetragen wird `allowedRetiredInCatalog`; und nein `DEFAULT_DEGRADATION_MAP` Quelle oder Ziel erscheinen in diesem Snapshot als veraltet. Dies beweist nicht, dass ein Modell derzeit von einem Live-Upstream bedient wird. Offline — vergleicht mit `config/quality/model-lifecycle.json`, von Hand aufgefrischt mit `npm run quality:refresh-model-lifecycle` (Netzwerk; nicht verkabelt CI). `allowedRetiredInCatalog` ist eine Burn-Down-Ratsche: Fügen Sie einen Eintrag nur bei Tracking-Problemen hinzu.                                                                                                                                                                                    | Ja                                       |
| `check:fetch-targets`             | Jeder `fetch("/api/...")` im clientseitigen `src/` wird in einen echten `route.ts` aufgelöst                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                       |
| `check:deps`                      | Alle `npm install` -able Deps in jedem `package.json` im Repo befinden sich in `dependency-allowlist.json`; Neue nicht angeheftete oder heruntergekommene Pakete wurden markiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `audit:deps`                      | npm-Prüfung aller fünf unabhängigen Sperrdateien (Root, Electron, OpenCode -Plugins, v1/v2 und Anbieter). Kritischer Hinweisblock; Hohe Warnungen bleiben sichtbare Warnungen. Missing/failed -Audits sind INCOMPLETE und Block; Sperr-Hashes und Berichte pro Bereich werden beibehalten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                       |
| `check:lockfile`                  | `package-lock.json` Integrität, — https-Registrierung, Integritäts-Hashes, keine Host-Überschreibungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                       |
| `check:licenses`                  | SPDX -Lizenzzulassungsliste für Produktionsabhängigkeiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                       |
| `check:tracked-artifacts`         | Keine Build-Artefakte / festgeschriebene `node_modules` Symlinks (läuft auch im Husky-Pre-Commit; Pre-Push ist absichtlich Light — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                       |
| `check:ai-attribution`            | Kein AI/bot `Co-Authored-By` Trailer oder AI-Generation-Fußzeile in PR -Commits, -Titel oder -Text. — -Harte Regel #16 (in der `quality.yml` -Fast-Gates-Schleife für PR→ `release/**` — liest die Ereignisnutzlast, No-Op-Off PRs — und einen nur PR-Schritt im `ci.yml` Lint für PR→ `main`; auch der Husky `commit-msg` Hook; menschliche Co-Autoren erlaubt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Jeder Vitest Ausschluss benennt ein Tracking-Problem und erscheint im `config/quality/vitest-exclusions.json` (#13204).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                       |
| `check:file-size`                 | Quelldateien (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) bleiben in `cap` und Testdateien (`*.test.ts(x)`) in `testCap`; In `file-size-baseline.json` (`frozen` / `testFrozen`) eingefrorene Dateien dürfen ihre aufgezeichnete Größe nicht überschreiten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                       |
| `check:error-helper`              | Fehlerantworten in executors/handlers verwenden `buildErrorBody()` / `sanitizeErrorMessage()` (harte Regel #12).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `check:migration-numbering`       | Migrations- SQL Dateien sind fortlaufend nummeriert und weisen keine Lücken oder Duplikate auf                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                       |
| `check:public-creds`              | Keine wörtlichen OAuth `client_id`/`client_secret` oder Firebase-Webschlüssel außerhalb von `publicCreds.ts` (harte Regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                       |
| `check:db-rules`                  | Kein Roh- SQL außerhalb von `src/lib/db/` -Modulen; keine Barrel-Importe von `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                       |
| `check:known-symbols`             | In ihren Dispatch-Tabellen registrierte Anbieter-Ausführer, Routing-Strategien und Übersetzer stimmen mit den Dateien auf der Festplatte überein — enthält keine verwaisten oder nicht deklarierten Symbole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                       |
| `check:route-guard-membership`    | Jede Route, die einen untergeordneten Prozess erzeugt, wird durch `isLocalOnlyPath()` (harte Regeln #15/#17) klassifiziert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                       |
| `check:test-discovery`            | Jede `*.test.ts` / `*.spec.ts` Datei im Repo wird von mindestens einem Testläufer gesammelt (Ratsche: Waisenliste in `test-discovery-baseline.json` kann nur schrumpfen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                       |
| `check:test-tla-order`            | Keine `node:test` Datei unter `tests/unit` registriert einen Test, erreicht einen `await` der obersten Ebene und registriert dann weitere (#18045; Ratsche: `test-tla-order-allowlist.json` kann nur schrumpfen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                       |
| `check:agent-skills-sync`         | Generierte Agentenfähigkeitsartefakte stimmen mit ihrem Quellkatalog überein (keine Abweichung)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Der Anbieter logos/assets führt einen dokumentierten Herkunftseintrag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON -Konfigurationsdateien analysieren und erfüllen die Repo-Lint-Regeln                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | TypeScript Kompilierung ohne Fehler (nur Hinweiswarnungen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                       |
| `typecheck:noimplicit:core`       | Strenge `noImplicitAny` — zukunftsorientiert; Viele bereits bestehende Anrufseiten benötigen noch Anmerkungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Beratung** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` mit Gültigkeitsbereich für `src/app/(dashboard)/**` (#7033) — Die von `typecheck:core` kuratierte Zulassungsliste mit 27 Dateien enthält kein Dashboard- TSX, und `next build` auch nie eine Typprüfung durch (`next.config.mjs` legt `ignoreBuildErrors: true` fest), sodass dortige Regressionen mit verwaisten Bezeichnern (#6625/#6909) für CI unsichtbar waren. Unterschiede zu einer eingefrorenen per-file/per-TS-code Zählungsbasislinie (`config/quality/dashboard-typecheck-baseline.json`, dasselbe veraltete Durchsetzungsmuster wie `check:known-symbols`). Nur — NEW Fehler, die über die Basislinie hinausgehen, scheitern am Gate. Mit `--update` herunterrasten, wenn ein bereits bestehender Fehler behoben ist.                                                                                                                                                                                                                                                                                                                                             | Ja                                       |
| `check:build-typecheck`           | Die Prüfung des gesamten App-Produktionstyps über `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), die 27-Dateien-Zulassungsliste von Surface `typecheck:core` und das Dashboard-Gate decken nicht ab. Unterschiede zu `config/quality/build-typecheck-baseline.json`; Eine neue oder erhöhte Anzahl pro (Datei, Code) schlägt fehl, eine niedrigere Anzahl fordert Sie zum Ratschen auf. `--update` weigert sich, solange der Lauf ein neues oder erhöhtes Paar enthält, es sei denn `--force-regressions` wird bestanden, und lehnt eine neu zum Schweigen gebrachte Linie ab, es sei denn, `--force-nocheck` wird bestanden. Daher sind die Verbreiterung der Grundlinie, um grün zu werden, und die Gewährung einer dauerhaften Stille zwei separate bewusste Handlungen. Ein nackter `--force` wird abgelehnt. Scannt auch den Build-Bereich für `@ts-nocheck` gegen `config/quality/ts-nocheck-baseline.json`, da eine Datei, die ihn verwendet, überhaupt keine Diagnose meldet und andernfalls für jedes Gate unsichtbar wäre. | Ja                                       |

#### Zwei Typprüfprogramme antworten unterschiedlich

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) und `check:build-typecheck` kompilieren unterschiedliche Programme mit unterschiedlichen Optionen, und dieselbe Datei kann in einem sauber und in dem anderen voller Fehler sein.

`tsconfig.build.json` setzt `"strict": false`, also ist `noImplicitAny` ausgeschaltet. Die Kernkonfiguration erstellt eine kuratierte 27-Dateien-Zulassungsliste mit strengeren Optionen und folgt dem Importdiagramm jedes Eintrags, sodass Dateien, die nie im Build-Programm erscheinen, dort trotzdem überprüft werden.

Bei der Beurteilung, ob eine Datei typisiert ist, ist die Konsequenz wichtig:**Null-Diagnose nach `check:build-typecheck` bedeutet nicht Null** . Das Entfernen `@ts-nocheck` aus 26 Dateien zeigte, dass 23 davon im Build-Programm sauber waren; Sechzehn davon brachten etwa 120 implizite Fehler im strengen Fall zum Vorschein. Überprüfen Sie beides, bevor Sie eine Dateibereinigung aufrufen.

### Beruf: `quality-gate`

Läuft nach `test-coverage`. Bei einem Fehler werden Blöcke zusammengeführt.

| Skript                       | Validiert                                                                                                                                                                            | Blockierung          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `quality:collect`            | Gibt `quality-metrics.json` aus (ESLint Warnungsanzahl, Abdeckung durch zusammengeführten Shard-Bericht)                                                                             | Ja (vor der Ratsche) |
| `quality:ratchet`            | Jede Metrik in `quality-baseline.json` hat sich nicht zurückgebildet (ESLint Warnungen, ≤ Basislinie; Abdeckung ≥ -Basislinie).                                                      | Ja                   |
| `check:duplication`          | Die Codeduplizierung (jscpd@4) überschreitet nicht die Grundlinie in `quality-baseline.json`                                                                                         | Ja                   |
| `check:complexity`           | Die zyklomatische Komplexität auf Dateiebene überschreitet nicht die Obergrenze (Kern ESLint `complexity` + `max-lines-per-function`).                                               | Ja                   |
| `check:cognitive-complexity` | Ratchet der kognitiven Komplexität (`eslint-plugin-sonarjs`) — separater ESLint Durchlauf; CI führt beide zusammengeführt als einen einzigen `check:complexity-ratchets` Schritt aus | Ja                   |
| `check:dead-code`            | Die Ratsche (Knip) für ungenutzte Exporte/Dateien weist gegenüber dem Ausgangswert keinen Rückschritt auf                                                                            | Ja                   |
| `check:compression-budget`   | Komprimierungs-Benchmark-Budget- — -Token-Einsparuntergrenzen pro Engine dürfen nicht zurückgehen                                                                                    | Ja                   |
| `check:type-coverage`        | Die prozentuale Ratsche (`type-coverage`) bildet sich nicht zurück; subsumiert weitgehend `typecheck:noimplicit:core`                                                                | Ja                   |

### Jobs: `codeql-scan` und `codeql-admission`

`codeql-scan` erstellt alle konfigurierten Analysekategorien. Nachdem dieser Job erfolgreich war, validiert `codeql-admission` seine genauen Uploads und die Kandidatenbenachrichtigungssperre. Bei beiden handelt es sich um erforderliche Abhängigkeiten von `Gate / CI`, einschließlich Kandidaten, die nur für Dokumente bestimmt sind. Die administrativen Aktivierungs- und Canary-Anforderungen werden unten unter „CodeQL Ratsche“ beschrieben.

| Skript                 | Validiert                                                                                                                                                                                         | Blockierung |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:codeql-ratchet` | ref/SHA Kandidat und alle konfigurierten Analysekategorien müssen vor der Alarmsperre aktuell sein; fehlende Beweisblöcke. Der globale Lagerbestand bleibt separat — siehe „CodeQL Ratsche“ unten | Ja          |

### Beruf: `quality-extended`

Der Job blockiert geeignete Kandidaten. Bundle-Größe, geheime Ergebnisse, Schwachstellenergebnisse, Workflow-Ergebnisse und OpenAPI Änderungen werden mit den erforderlichen Ratschen überprüft. Die Diagnose der zirkulären Abhängigkeit bleibt beratend. Eine Scannerinstallation ist erforderlich: `scripts/ci/install-quality-scanners.sh` stellt angeheftete Versionen bereit und verbreitet Installationsfehler. Fehlende Werkzeuge, ungültige Berichte oder fehlende Baselines verlassen das erforderliche Scanner-Gate INCOMPLETE.

| Skript                   | Validiert                                                                                                                                                                                                             | Blockierung                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Keine zirkulären Abhängigkeiten (dpdm)                                                                                                                                                                                | **Beratung**                                              |
| `check:bundle-size`      | Die Bündelgröße überschreitet die Obergrenze nicht. Eine nicht verfügbare Messung schlägt fehl                                                                                                                        | **Blockierung mit --ratchet**                             |
| `check:secrets`          | Die Ergebnisse von Gitleaks gehen nicht zurück; Erforderliche Scans lehnen fehlende tools/source/baseline, fehlgeschlagene Scans und ungültige Berichte ab                                                            | **Blockierung mit --ratchet**                             |
| `check:vuln-ratchet`     | Abhängigkeitsschwachstellen bilden sich nicht zurück; Erforderliche Scans lehnen fehlende Tools, ungültige Berichte oder fehlende Baselines ab                                                                        | **Blockierung mit --ratchet**                             |
| `check:workflows`        | Workflow-Lint (Actionlint + Zizmor); missing/broken -Scanner, ungültige Berichte oder fehlende Ratchet-Baseline schlagen als INCOMPLETE fehl. Gültige Befunde folgen der gewählten strict/advisory/ratchet Richtlinie | Ausführung erforderlich; Zizmor-Ratschenblockierung in CI |
| `check:openapi-breaking` | Öffentlicher API Vertrag gegen angeheftete Ereignis-Commits (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); erforderliche Messung schlägt fehl geschlossen                    | **Blockierung mit --ratchet**                             |

### Beruf: `docs-sync-strict`

Bei Pull-Anfragen an `main` oder `release/**` wird dieser Job nur für Nicht-Entwurfskandidaten (oder vertrauenswürdige Warteschlangenkandidaten) ausgeführt, die als Dokumentation oder Codeänderungen klassifiziert sind. Es läuft auch bei Nicht-PR CI -Veranstaltungen; Der Push-Trigger dieses Workflows deckt nur `main` ab, nicht `release/**`. Ein Schritt, dessen Ausgänge ungleich Null sind, blockiert den Job; Nur berichtspflichtige Feststellungen und unten aufgeführte dokumentierte Ausnahmen gelten nicht.

| Skript                         | Validiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blockierung                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-Gate, das die 7 Unter-Gates unten nacheinander ausführt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                                                                                                                                             |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG Versionskonsistenz, exakte `llm.txt` Spiegel, übersetzte CHANGELOG section/size Invarianten und Fehlen ersetzter doppelter Dokumente                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                                                                                                                                             |
| ↳ `check:docs-frontmatter`     | Kompilierte Dokumentationsseiten tragen gültige Titeltitel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                                                                                                                                             |
| ↳ `check:docs-counts`          | Zählinvarianten mit hoher Konfidenz sind streng; Heuristische Dateianzahlprüfungen warnen nur, es sei denn, das Skript empfängt `--strict` (das CI Meta-Gate gibt es nicht weiter).                                                                                                                                                                                                                                                                                                                                                                | Strikte Tierblockierung; Soft-Tier-Beratung                                                                                                                    |
| ↳ `check:env-doc-sync`         | Quell-Env-Lesevorgänge, `.env.example` und `docs/reference/ENVIRONMENT.md` stimmen nach den expliziten Zulassungslisten „Ignorieren“, „Nur Dokument“ und „Nur Umgebung“ überein                                                                                                                                                                                                                                                                                                                                                                    | Ja, außerhalb der dokumentierten Zulassungslisten                                                                                                              |
| ↳ `check:deprecated-versions`  | Meldet potenziell veraltete Versionen außerhalb sicherer historischer Kontexte und veraltete Aktualisierungsdaten, mit Ausnahme ignorierter Dokumente                                                                                                                                                                                                                                                                                                                                                                                              | Hinweis zur aktuellen CI Verkabelung (`--strict` wird nicht bestanden)                                                                                         |
| ↳ `check:doc-links`            | Interne Markdown-Links in Dokumenten werden in echte Dateien aufgelöst (`[text]`/`(path)` -Formular)                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                                                                                                                                             |
| ↳ `check:fabricated-docs`      | In den Dokumenten zitierte Routen, Umgebungsvariablen, CLI -Befehle, Hook-Namen und Dateipfade sind in der Codebasis vorhanden. Hartes Tor über `--strict`; Soft-Fail ohne Flag.                                                                                                                                                                                                                                                                                                                                                                   | Ja (über `--strict` in CI)                                                                                                                                     |
| `check:cli-i18n`               | Verwendete CLI `t()` Schlüssel sind in `en` vorhanden; `pt-BR` behält jeden Abschnitt der obersten Ebene; `zh-CN` und `zh-TW` enthalten alle Schlüssel von `en`                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                                                                                                                                             |
| `check:openapi-coverage`       | OpenAPI Spezifikation deckt mindestens einen Teil der realen Routen ab                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                                                                                                                                             |
| `check:openapi-security-tiers` | Deklarierte `x-loopback-only`/`x-always-protected` -Anmerkungen müssen durch `routeGuard.ts` unterstützt werden; Parser- und Forward-Mismatches-Block. Die umgekehrte Prüfung auf fehlende `x-loopback-only` unter rein lokalen Präfixen gibt eine Warnung aus, und Nur-Muster-Routen werden von diesem Rückwärtsdurchlauf ausgeschlossen.                                                                                                                                                                                                         | Parser/forward prüft Blockierung; Hinweis zur Rückwärtsprüfung                                                                                                 |
| `check:openapi-routes`         | Jeder `/api...` Pfad in `openapi.yaml` wird nach der begründeten `KNOWN_STALE_SPEC` Zulassungsliste parameterunabhängig in eine echte Route aufgelöst; Auch veraltete Zulassungslisteneinträge schlagen fehl                                                                                                                                                                                                                                                                                                                                       | Ja                                                                                                                                                             |
| `check:docs-symbols`           | Interne `/api/...` URL Referenzen in kanonischen Nicht-Spiegeldokumenten werden in eine echte Route oder Routenfamilie aufgelöst; proxy/upstream/placeholder/file -Referenzen und begründete `KNOWN_STALE_DOC_REFS` Einträge werden ausgeschlossen und veraltete Zulassungslisteneinträge schlagen fehl                                                                                                                                                                                                                                            | Ja                                                                                                                                                             |
| `i18n translation drift`       | Für die absolute Zulassung sind keine Inkonsistenzen bei Quelle, fehlendem Ziel, Ziel-Hash, veralteter Übersetzung und Abschnitts-Cache erforderlich. Bei der gewöhnlichen PR Vorbereitung können exakte übernommene Beweise oder eine nur auf Englisch verfügbare ausstehende Änderung mit unveränderten vollständigen Status- und Zielbytes beibehalten werden. In seinem Bericht wird separat die Fusionsbereitschaft erklärt. Fehlende Ziel-Hashes und unvollständiger Basis-Beweisblock. Ein fehlender Legacy-Abschnittcache ist kein Fehler. | Alle fünf Klassen blockieren queue/base Zulassung; Die normale Vorbereitung erlaubt nur nachgewiesene vererbte oder nur englischsprachige ausstehende Arbeiten |

Die zwölf README SVGs unter `docs/diagrams/` werden generiert (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regeneriert sie alle). Jeder verfügt über einen Byte-Compare-Unit-Test (`tests/unit/docs/readme-*-svg.test.ts`, Job `test-unit`), der fehlschlägt, wenn die festgeschriebene Datei veraltet ist, und `check:docs-counts` liest kanonische Zahlen aus ihren `<text>` Knoten — weshalb der Gliederungsschritt jede umrissene Zeichenfolge in der Datei als unsichtbaren `<text>` behält. Die SVG -Prüfung auf kanonische Zahlen liest die in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) aufgeführten Dateien: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` sowie `public/images/tier-flow-dark.svg` und `tier-flow-light.svg`; Die Ansprüche „Für immer kostenlos“, „Katalogeintrag“, „Wiederkehrender Pool“ und „Bewertungsfaktoren“ lauten auch `promise-pillars.svg`, `free-tier-budget.svg` und `strategies-grid.svg`. `free-tier-budget.svg` bezieht seine Zahlen aus dem Live-Katalog-Loader, sodass eine Änderung an `FREE_MODEL_BUDGETS` oder an einem Anbieter-Anzeigenamen CI rot ändert, bis diese Datei neu generiert wird.

### Beruf: `i18n-ui-coverage`

| Skript                            | Validiert                                                                                                                                                                                                                      | Blockierung     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (inline) | UI i18n-Schlüsselabdeckung beträgt ≥ 65 %                                                                                                                                                                                      | Ja              |
| `check-ui-value-drift` (inline)   | Ein umgeschriebenes Englisch **Wert** hinterlässt keine veraltete Übersetzung                                                                                                                                                  | Ja              |
| `check-new-key-coverage` (inline) | A **neu** Der englische Schlüssel wird in jedem Gebietsschema — übersetzt, ein `__MISSING__:` Marker wird abgelehnt                                                                                                            | Ja              |
| `check-translation-ratio`         | Das tatsächliche Übersetzungsverhältnis pro Gebietsschema (identisch mit Englisch/Platzhalter/fehlende Blätter außerhalb der Zulassungsliste) darf `config/quality/i18n-translation-baseline.json` + Slack nicht überschreiten | **Blockierung** |

Benötigt `fetch-depth: 0` — unterscheidet das Value-Drift-Gate `en.json` von der Merge-Basis.

#### `check-ui-value-drift` — Stale-Translation-Gate

Fängt die eine i18n-Regression ab, die die anderen Tore strukturell nicht sehen können: Ein englischer Wert wird umgeschrieben und die aus dem _vorherigen_ Englisch abgeleiteten Übersetzungen bleiben erhalten, sodass nicht-englische Benutzer weiterhin sicher formulierte, jetzt falsche Kopien lesen.

Das wurde echt geliefert. `oauthModal.googleOAuthWarning` wurde neu geschrieben, als der Antigravity Anmeldehelfer landete (#5203);**39 von 43 Orten** Behalten Sie den Text bei, der die Bediener auffordert, „das vollständige URL zu kopieren und unten einzufügen“. — ein Ablauf, der für diesen Anbieter nicht abgeschlossen werden kann. Es blieb bis #8463 unbemerkt, weil:

- `sync-ui-keys` füllt nur Schlüssel auf, die vorhanden sind **abwesend** , niemals diejenigen, die es sind **abgestanden** ;
- `check-ui-keys-coverage` zählt die _Präsenz_ des Schlüssels, sodass eine veraltete Übersetzung als abgedeckt gilt;
- `check-translation-drift` verfolgt die `docs/i18n/<locale>/**.md` -Dokumentation und spiegelt — wider, es liest jedoch niemals `src/i18n/messages/*.json`. Blockierung im Job `docs-sync-strict` seit der Neusynchronisierung 2026–09: Bearbeiten eines Kerndokuments → `npm run i18n:run -- --files=<doc>` (Abschnittsebene, günstig).

**Differenzbewusst, nicht baseline-unterstützt.** Es vergleicht `en.json` an der Zusammenführungsbasis mit dem Arbeitsbaum; Für jeden Schlüssel, dessen englischer Wert sich geändert hat, ist jedes Gebietsschema, das noch eine unberührte Übersetzung enthält, veraltet. Dies bewusst **Friert bereits bestehende Schulden ein** Ein — -Diff kann nicht offenlegen, aus welchem alten Englisch eine langjährige Übersetzung stammt, daher beurteilt das Gate nur, was die aktuelle Änderung betrifft. Die Alternative (eine Hash-Basislinie pro Schlüssel) würde eine ~ generierte Datei 600 KB kosten, 3 × die größte existierende Basislinie, die bei jedem i18n PR abwandert.

Zwei Möglichkeiten, es zu befriedigen:

1. die betroffenen Übersetzungen aktualisieren, oder
2. Setzen Sie sie auf `__MISSING__:<new english>` — Die Laufzeit stellt dann das korrigierte Englisch (`src/i18n/request.ts::deepMergeFallback`, #7258) und die Schlüsselwarteschlangen für die Übersetzung bereit.

Wenn die Zeichenfolge **Bedeutung** geändert, lieber **Umbenennen des Schlüssels** : Ein neuer Schlüssel kann keine veraltete Übersetzung erben. Das ist das #8463 verwendete Muster.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Die Value-Drift- und New-Key-Gates teilen einen unveränderlichen Vergleich von `scripts/i18n/resolve-ui-diff-base.mjs`. Der Workflow übergibt an beide Prüfungen die gleiche Basis, die gleiche Basisspitze und den gleichen Kandidaten SHAs. PR/base-retarget, Push- und Merge-Group-Läufe verwenden ihren Ereigniskontext. Das Versenden eines Kandidatenzweigs erfordert seine exakte offene PR oder die explizite `i18n_base_sha` Eingabe. Der Versand oder die geplante Beobachtung von `main` oder `release/vX.Y.Z` ohne diese Eingabe vergleicht den letzten Commit mit seinem ersten übergeordneten Element. Es handelt sich nicht um eine Prüfung aller übernommenen Übersetzungsschulden. Für den lokalen Aufruf ist eine explizite Vergleichsbasis erforderlich, beispielsweise der obige `BASE_REF` -Befehl.

Fehlender oder mehrdeutiger Vergleichskontext, ein unleserlicher oder ungültiger erforderlicher Katalog und ein geänderter Kandidat führen zu `INCOMPLETE` mit Exit-Code **2** , auch im Warnmodus. Katalog-Lesevorgänge verwenden `scripts/i18n/read-ui-catalog.mjs`; Lesefehler werden nicht durch leere Objekte ersetzt. Weder eine nicht verfügbare Basis noch eine unvollständige Eingabe begründen PASS.

### Beruf: `i18n`

Vollständige i18n-Validierungsmatrix (ein Job pro Gebietsschema). Die gesamte Arbeit ist beratend.

| Skript                          | Validiert                                         | Blockierung                                                       |
| ------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `validate_translation.py quick` | Vollständigkeit der Übersetzung pro Gebietsschema | **Beratung** (`continue-on-error: true` für den gesamten Auftrag) |

### Beruf: `pr-test-policy`

Wird nur auf Pull-Anfragen ausgeführt.

| Skript                 | Validiert                                                                                                                                           | Blockierung |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs, die den Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` ändern, müssen Tests einschließen oder aktualisieren (harte Regel #8). | Ja          |
| `check:test-masking`   | Geänderte Testdateien reduzieren nicht die Netto-Assert-Anzahl und fügen keine `assert.ok(true)` Tautologien hinzu                                  | Ja          |
| `check:pr-evidence`    | PR Gremium zitiert test/VPS -Beweise für die Änderung (mechanisiert Hard Rule #18, indem PR -Prosa — als fragil eingestuft wird, siehe Rückstand)   | Ja          |

### Beruf: `test-vitest`

Benötigt den `changes` Klassifizierungsjob. Anwendbare Matrix-Shards blockieren die Zusammenführung bei einem Fehler.

| Suite            | Validiert                                                | Blockierung                                                                                                         |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP Server (110 Tools), autoCombo, Cache — Vitest Runner | Ja                                                                                                                  |
| `test:vitest:ui` | UI Komponententests — vitest Runner                      | **Blockierung** — -Vorausfälle werden im `vitest.config.ts` explizit ausgeschlossen; Neue Ausfälle scheitern am Job |

### Nächtliche Arbeitsabläufe (geplant, beratend)

Diese laufen nach einem Cron-Zeitplan (und `workflow_dispatch`), niemals nach PRs. Alle sind beratend.

| Arbeitsablauf          | Validiert                                                                                                                                                                                | Blockierung  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Schnellprüfungs-Eigenschaftstests mit einer zufälligen + Anzahl hoher Durchläufe                                                                                                         | **Beratung** |
| `nightly-resilience`   | Heap-Growth-Gate, Chaos-Fault-Injection, k6 load/soak                                                                                                                                    | **Beratung** |
| `nightly-llm-security` | promptfoo-Injection-Guard (Blockmodus) + -Garak-Probes (übersprungen ohne Provider-Geheimnis)                                                                                            | **Beratung** |
| `nightly-schemathesis` | OpenAPI -Vertrags-Fuzzing (Schemathese) gegen einen Live- OmniRoute unter Verwendung von `docs/openapi.yaml` — deckt Spezifikationsverletzungen/nicht behandelte 500er auf (Phase 8 B.4) | **Beratung** |
| `nightly-mutation`     | Stryker-Mutationstest-Score über der Fast-Unit-Lane — Oberfläche: Überlebende Mutanten zeigen schwache Behauptungen                                                                      | **Beratung** |
| `nightly-compat`       | Node-Engine-Kompatibilitätsmatrix für die unterstützten `engines.node` Bereiche                                                                                                          | **Beratung** |

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
- **Hinweis** — die globale Gesamtsumme im Vergleich zur eingefrorenen Baseline. Übernommene Abweichungen setzen einen
  unbeteiligten PR niemals auf Rot; die Abweichung wird zur Behebung beim Release-Abgleich erfasst und vom
  Headroom-Job überwacht.

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

### CodeQL Ratsche: Kandidatenaufnahme und Repository-Inventur

CI besitzt CodeQL Zulassung des Kandidaten über eine explizite Abhängigkeitskette: `codeql-scan` ruft die viersprachige Matrix in `codeql.yml` auf, dann führt `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` aus. `Gate / CI` erfordert beide Ergebnisse. Die Qualität behält ihre eigenen numerischen Prüfungen bei, fragt den Scanner jedoch nicht ab, bevor der Hersteller fertig ist. `Gate / Quality` allein ist keine vollständige Kandidatenzulassung. CodeQL bleibt für Kandidaten, die nur Dokumente benötigen, weiterhin erforderlich.

Die Richtlinie in `config/quality/codeql-admission-policy.json` wählt Aktionen, C/C++, JavaScript/TypeScript und Python, Abfragesuite-Standard, Remote-Bedrohungsmodell und Build-Modus „Keine“ aus. Der Producer-Preflight lehnt einen ausstehenden Aktivierungsdatensatz ab und verzweigt außerhalb der expliziten Zielliste. Die aktuellen Ziele sind Haupt- und release/v3.8.54. -Vertragstests vergleichen diese endliche Liste und den Wartungs-Push-Trigger mit der Paketversion; Die nächste Version muss beim Onboarding überprüft werden. Der bestehende PR Trigger für die breitere Version von CI wird beibehalten, aber ein nicht an Bord befindliches Ziel meldet HOLD vor der Extraktion, anstatt einen nicht gemessenen PASS zu erhalten.

Jeder Matrixjob zeichnet seinen tatsächlichen SARIF -Upload- ID, seine Sprache, seine Kategorie, seine Ausführung und seinen Versuch, seine Workflow-Identität des Aufrufers, seinen Ereignis- ref/head/base/merge SHA und seinen Richtlinien-Hash auf. Der abhängige Job lädt nur die Belege dieses Laufs herunter und validiert Artefakt-Digests. Es erfordert alle vier Kategorien, einen erfolgreichen Produzenten und eine abgeschlossene Verarbeitung jedes einzelnen Uploads. Es verwendet den sarif_id-Filter des API, nicht die neueste Analyse, die in einem Zweig gefunden wurde. Bei Teilwiederholungen können erfolgreiche Kategorien aus einem früheren Versuch desselben Laufs und Kandidaten wiederverwendet werden, wobei der produzierende Versuch erhalten bleibt. Ein gescheiterter aktueller Produzent kann frühere grüne Beweise nicht wiederverwenden.

Die CodeQL Aktion wartet auf die Verarbeitung, aber ihre angeheftete Implementierung kann eine Warnung auslösen und nach einem Statuslesefehler oder einer erschöpften Wartezeit fortfahren. Durch die Zulassung wird die Bearbeitung somit erneut überprüft. Fehlende Kategorien, ausstehende Verarbeitung, fehlgeschlagene oder abgebrochene Aufträge, veraltete Identität, unvollständige Paginierung oder nicht verfügbares APIs führen zu HOLD und Beenden 2. Es bleibt keine feste Wartezeit für einen unabhängigen Scanner-Workflow bestehen. Ein nicht gescannter PR kann nicht bestanden werden, da eine Warnabfrage 0 zurückgegeben hat. Eine gemessene Anzahl über `metrics.codeqlAlerts.value` ergibt 1; Die Baseline wird nicht angehoben, um die Warnungen einer anderen Verzweigung zu absorbieren. [Upload-Status und Analysesuche](https://docs.github.com/en/rest/code-scanning/code-scanning).

Der Beleg zeichnet den Upload und die Analyse IDs, Kategorien, Werkzeugversionen, ref/SHA, Baseline- und Alarmnummern auf. SARIF identity/result Anzahl, Mindestregelanzahl und genaue Alarminstanzen bleiben obligatorisch. PR/analysis Identitäten werden vor der Annahme erneut überprüft. Diese Prüfungen ermitteln die Abdeckung der konfigurierten Kategorien und nicht eine Bestandsaufnahme jeder extrahierten Quelldatei. C/C++ No-Build-Extraktion umfasst keinen Code, der während eines Projekt-Builds generiert wurde. Quellenausschlüsse müssen noch überprüft werden, und die Zuordnung der Mitwirkenden erfordert vergleichbare, exakte Belege.

`codeql-maintenance.yml` stellt Push-Scans für aktive Releases und den Wochenplan bereit, ohne PR/main Produzenten zu duplizieren. `nightly-codeql-inventory.yml` hält die Repository-weite Basislinie getrennt, mit `--strict-measurement` und einem Fehler, wenn die Messung nicht verfügbar ist. Das anmutige Überspringen des örtlichen Altlastensammlers ist keine Zulassung für einen Kandidaten. Die Verschärfung bleibt nach einer verifizierten niedrigeren Gesamtzahl ein explizites `--update`.

Der erweiterte Workflow darf nicht veröffentlicht werden, während das Standard-Setup konfiguriert ist: GitHub lehnt diese Kombination ab. Die versionierte Richtlinie bleibt ausstehend, bis der überprüfte Verwaltungsübergang zurückgelesen wird. Vor der Veröffentlichung pinnt ein Operator das Repository, head/base/tree und policy/patch/rollback Hashes und beobachtet den Setup-Status. `node scripts/quality/codeql-producer.mjs verify-admin-readback` prüft die bereitgestellten erwarteten und tatsächlichen JSON Datensätze. Dies ist ein technischer Schutz, keine Genehmigung durch den Bediener oder ein Ersatz für das Abrufen neuer Readbacks. Der PR Token fordert niemals Administrationszugriff an. Der Rollout und jede Änderung des Scanners erfordern dieses separate Readback sowie einen echten PR, Fork- und Merge-Group-Kompatibilitätsnachweis.

Forks verwenden gehostete Runner, checkout ohne persistente Anmeldeinformationen, keine Projekt- install/build im Produzenten und keine geerbten Repository-Geheimnisse. GitHub unterstützt SARIF -Upload für das pull_request-Ereignis mit seinem reduzierten Fork-Token; Die erstmalige Genehmigung der Beitragsausführung bleibt GitHub Richtlinie. Verwenden Sie niemals pull_request_target, um nicht vertrauenswürdigen Code auszuführen. Bestätigen Sie die tatsächlichen Token-Berechtigungen, den Analyseschlüssel und alle Kategorieumgebungen im kontrollierten Canary, bevor Sie die Migration als abgeschlossen betrachten. [Fork-Upload-Regeln](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [widersprüchliche Setup-Modi](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Entlassungen sind Sache des Betreibers (Hard Rule #14)** — lehnt eine CodeQL Warnung niemals ab, ohne die technische Begründung im Ablehnungskommentar anzugeben: `won't fix` für eine Upstream-Protokollanforderung, `used in tests` für eine Testvorrichtung, `false positive` für ein Desinfektionsmittel CodeQL nicht sehen kann (Präzedenzfall: `docs/security/ERROR_SANITIZATION.md`).

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

## Allowlist-Richtlinie

Jede Prüfung, die aufgrund bereits vorhandener Verstöße nicht fehlschlagen darf, verwendet eine unveränderliche Allowlist
(z. B. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Es gilt folgende Richtlinie:

**Beheben Sie die eigentliche Ursache; verwenden Sie die Allowlist nur, wenn der Verstoß bereits vorhanden ist und
nicht im selben PR behoben werden kann.**

Beim Hinzufügen eines Eintrags zu einer Allowlist:

1. Fügen Sie einen Kommentar mit der Begründung hinzu.
2. Verweisen Sie auf das zugehörige Tracking-Issue (z. B. `// #3498 — Phase 2 feature, not yet implemented`).
3. Entfernen Sie den Eintrag in demselben PR, der den Verstoß behebt — ein veralteter Eintrag, der keinen aktiven
   Verstoß mehr unterdrückt, ist selbst ein Fehler (die Prüfung auf veraltete Durchsetzungsregeln gemäß 6A.3 wird
   bei einem verwaisten Allowlist-Eintrag fehlschlagen, sobald sie implementiert ist).

Fügen Sie **keine** Allowlist-Einträge hinzu, nur damit Tests schneller erfolgreich sind. Eine erfolgreiche Prüfung bei einer wachsenden
Allowlist vermittelt ein falsches Gefühl von Qualität.

### Wenn eine Prüfung für Ihren PR fehlschlägt

1. **Lesen Sie die Ausgabe der Prüfung sorgfältig** — sie gibt genau an, welche Datei oder welches Symbol gegen
   die Regel verstoßen hat.
2. **Beheben Sie den Verstoß** — die meisten Prüfungen sind deterministische Dateisystemprüfungen, die erfolgreich sind, sobald
   der Code korrekt ist.
3. **Wenn der Verstoß bereits vorhanden ist** (d. h., Sie haben ihn nicht verursacht, aber die Prüfung
   deckt ihn nun ab): Fügen Sie einen Allowlist-Eintrag mit einem begründenden Kommentar und einem Tracking-Issue hinzu.
4. **Wenn es sich bei der Prüfung um eine Ratchet-Prüfung handelt** (Abdeckung, ESLint-Warnungen, Duplizierung, Komplexität):
   Ihre Änderung hat die Metrik verschlechtert. Beheben Sie das zugrunde liegende Problem oder führen Sie (in seltenen Fällen)
   `npm run quality:ratchet -- --update` aus, wenn die Änderung beabsichtigt und die Verschlechterung
   der Metrik akzeptabel ist — dokumentieren Sie jedoch den Grund in der PR-Beschreibung.
5. **Hinweisprüfungen** (`continue-on-error: true`) dienen nur zur Information — sie blockieren
   das Zusammenführen nicht, erscheinen jedoch in der CI-Zusammenfassung. Beheben Sie sie trotzdem.

---

## Hinzufügen eines neuen Prüfschritts

1. Erstellen Sie `scripts/check/check-<name>.mjs` (oder `.ts`). Richtlinienprüfschritte beenden sich mit 0/1.
   Ratchet-Prüfschritte schreiben über `collect-metrics.mjs` eine Metrik nach `quality-metrics.json`.
2. Fügen Sie `"check:<name>": "node scripts/check/check-<name>.mjs"` zu `package.json` hinzu und
   synchronisieren Sie den Alias und seinen exakten Befehl in `config/quality/gate-manifest.json`.
   Führen Sie dieselbe Synchronisierung durch, wenn Sie einen bestehenden Validierungsalias ändern oder entfernen.
   Führen Sie `npm run check:gate-manifest` aus; der Pre-Commit-Hook und die CI-Änderungsklassifizierung
   erzwingen diese Vereinbarung.
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
ergab die folgenden Rationalisierungskandidaten. **Die Zusammenführungen sind mechanische CI-
Änderungen; die Umstellungen/Entfernungen sind Richtlinienentscheidungen, die dem Betreiber vorbehalten sind.** Nichts davon
wurde bisher umgesetzt.

**Oben ebenfalls nicht dokumentiert** (beratend, geringe Aussagekraft): der Job `docs-lint` (markdownlint + Vale, gesamter Job mit `continue-on-error`) und die eigenständigen Scanner-Workflows `semgrep.yml` / `scorecard.yml`. CodeQL hat nun verpflichtende Erzeuger- und Zulassungsjobs unter `Gate / CI`, vorbehaltlich der oben beschriebenen Aktivierungsanforderungen. `semgrepFindings: 0` steht in `quality-baseline.json`, ist aber nicht mit einer blockierenden Ratsche in `ci.yml` verbunden — die Metrik ist derzeit verwaist.

### Zusammenführen / Deduplizieren (mechanisch, geringeres Risiko)

Jeder Kandidat wurde am 2026-06-17 gegen den aktuellen Gate-Status validiert (Vertrauen ist gut, Kontrolle ist besser);
mehrere „offensichtliche“ Zusammenführungen verbargen technische Schulden und sind **kein** problemloser Ersatz.

- **`check:docs-sync` wird zweimal ausgeführt** — eigenständig im Job `lint` und erneut innerhalb von `check:docs-all` (`docs-sync-strict`) sowie im husky-Pre-Commit-Hook. ✅ **ERLEDIGT** — eigenständiger Aufruf in `lint` entfernt.
- **CVE-Scanning** — ❌ **KEINE problemlose Zusammenführung.** `audit:deps` blockiert kritische Sicherheitshinweise und unvollständige Audits für alle fünf Lockfiles, während Sicherheitshinweise der Stufe „high“ gemäß der aktuellen Richtlinie als Warnungen gemeldet werden; `check:vuln-ratchet` (osv) schlägt nur bei einer _Regression_ gegenüber der eingecheckten Baseline fehl und weist fehlende Messwerte zurück, wenn diese erforderlich sind. Unterschiedliche Semantik — das Entfernen von `audit:deps` würde das absolute Gate für kritische Befunde und die unabhängigen Nachweise der Paket-Audits beseitigen. Beide beibehalten.
- **Zyklenerkennung** — ✅ **ERLEDIGT** (#15159 G-01/G-02). Der alte Text bezeichnete `check:cycles` hier als „grünes, kuratiertes“ Gate und begründete dessen blockierende Beibehaltung damit, dass `check:circular-deps` (dpdm) 91 Zyklen meldete. Dieses Grün war ein **falsch positives Grün**: `check:cycles` scannte 5 Unterverzeichnisse (450 Dateien), erkannte nur statische `import|export … from`-Anweisungen und verwarf jeden `@/`- und `@omniroute/open-sse/`-Spezifizierer, sodass es die aus dynamischen Imports und Aliasen bestehenden Zyklen, die das Repository dominierten, nicht erkennen konnte. Behoben: Das Gate durchläuft nun `src` + `open-sse` (5023 Dateien), erfasst Spezifizierer aus dem TypeScript-AST (sodass `import("…")` zählt, `typeof import("…")` an einer Typposition hingegen nicht) und löst tsconfig-`paths` auf. Es findet **14** Zyklen, nicht 0. Da 14 bereits vorhandene Zyklen nicht in einem Gate-PR behoben werden können, ist `check:cycles` nun ein **Ratchet** (`--ratchet`, Obergrenze `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — es blockiert jede _Regression_, und die Anzahl kann nur sinken. CI führt `npm run check:cycles:ratchet` aus. Der schrittweise Abbau erfolgt zusammen mit **A-01**. `check:circular-deps` (dpdm) bleibt als breiter angelegte zweite Einschätzung nicht blockierend.
- **Komplexität** — ✅ **ERLEDIGT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ein ESLint-Durchlauf, Zählung nach ruleId, sodass die Baselines für zyklomatische Komplexität + maximale Zeilenzahl und kognitive Komplexität unabhängig bleiben; die einzelnen Prüfungen `check:complexity` / `check:cognitive-complexity` bleiben für lokale `--update`-Aufrufe erhalten.
- **`/api`-Anti-Halluzination** — ✅ **ERLEDIGT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): eine FS-Inventarisierung von `src/app/api`; openapi-routes + docs-symbols melden weiterhin unabhängig voneinander; die einzelnen Prüfungen bleiben für lokale Ausführungen erhalten.
- **`check:node-runtime` wird in 11 Jobs ausgeführt** — ⚠️ **geringer ROI.** Jeder verwendet einen separaten Runner, und die Prüfung dauert <1s; die Gesamtersparnis beträgt ca. 10s, dafür ginge eine kostengünstige Schutzprüfung pro Job verloren. Den Aufwand nicht wert.
- **`typecheck:noimplicit:core` im CI-Lint** — ✅ **aus dem Lint-Job entfernt** (war mit `continue-on-error` nicht blockierend); die blockierende Typoberfläche besteht aus `typecheck:core` + `check:type-coverage`. Lokales Skript beibehalten.

### Umstellen / Entscheiden (Betreiberrichtlinie)

- `check:openapi-security-tiers` (nicht blockierend) — ❌ **NICHT problemlos umstellbar.** Die Prüfung wird mit 0 beendet, warnt jedoch davor, dass mehreren `traffic-inspector`-Routen unter `LOCAL_ONLY_API_PREFIXES` die Annotation `x-loopback-only: true` fehlt. Ihre Durchsetzung erfordert, diese Annotationen zunächst zu `openapi.yaml` hinzuzufügen.
- `typecheck:noimplicit:core` (nicht blockierend) — weitgehend durch das blockierende Ratchet `check:type-coverage` abgedeckt. In ein Ratchet umwandeln oder den redundanten zweiten `tsc`-Durchlauf entfernen.
- `test:vitest:ui` (jetzt **blockierend**) — bereits vorhandene Fehler sind in `vitest.config.ts` mit `// #8618`-Tracking-Kommentaren explizit ausgeschlossen; neue Fehler lassen den Job fehlschlagen.
- `check:secrets` (gitleaks, blockierendes Ratchet) — die aktuelle Obergrenze ist `metrics.secretFindings` in `quality-baseline.json`. Jede Ausnahme benötigt einen begründeten Eintrag in `.gitleaks.toml`; ein nicht verfügbarer Messwert gilt als INCOMPLETE. Der Scan ergänzt das native Secret-Scanning von GitHub und `check:public-creds`.
- `check:pr-evidence` (blockierend, durchsucht den Prosatext des PR-Texts per grep) — hohes Risiko falsch positiver Ergebnisse; eine Entfernung würde die Durchsetzung von Hard Rule #18 schwächen, daher handelt es sich um eine echte Richtlinienentscheidung.
- `semgrep` (eigenständig, nicht blockierend) — überschneidet sich bei den OWASP-Kategorien mit CodeQL; die Baseline mit einem Ratchet verknüpfen oder entfernen.

---

## Zugehörige Dokumentation

- Lieferkette (Provenienz, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — Prüfschritt für die Gleichheit der Schlüsselmengen

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, Job `i18n-ui-coverage`).
Vergleicht die Menge der Blattschlüssel jeder Datei unter `src/i18n/messages/<locale>.json` mit `en.json` und schlägt
bei jedem fehlenden oder zusätzlichen Blatt fehl, unabhängig davon, wann der Schlüssel hinzugefügt wurde. `__MISSING__:`-Platzhalter
gelten als vorhanden (ihr Inhalt fällt in die Zuständigkeit des Verhältnis-Prüfschritts). Dies ist die absolute Ergänzung
der beiden differenz- bzw. prozentbasierten Prüfschritte: `check-ui-keys-coverage` erzwingt eine Untergrenze von 80 % je
Locale (43 fehlende Schlüssel von ~13.000 ergeben immer noch 99,7 %), und `check-new-key-coverage` bewertet
nur die Schlüssel, die ein PR zu `en.json` hinzufügt. Ein Locale-Batch wird aus dem `en.json` des Tages generiert,
an dem sein Branch erstellt wird, und wird über mehrere Tage übersetzt, während in der Basis weiterhin Schlüssel hinzukommen; der Batch-PR fügt selbst
keinen Schlüssel hinzu, sodass beide verwandten Prüfschritte stumm blieben, als Batch 1 (#13044) mit 43 fehlenden Schlüsseln in neun
Locales und Batch 2 (#13660) mit 10 fehlenden Schlüsseln in acht Locales integriert wurden (2026-09-15). Einen fehlgeschlagenen Prüfschritt beheben Sie mit
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ein `extra`-Blatt
bedeutet, dass es aus der Quelle entfernt wurde — löschen Sie es aus der Locale. `--warn` meldet Probleme, ohne einen Fehler auszulösen.
`--catalog=cli` führt denselben Vergleich für `bin/cli/locales` aus (`npm run i18n:check-keys:cli`);
beide Schritte befinden sich im Job `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-Prüfschritt für neue Schlüssel

Verwandter Prüfschritt von `check-ui-value-drift`. Dieser erkennt einen englischen Wert, der **umgeschrieben**
wurde, während seine Übersetzungen unverändert blieben; dieser Prüfschritt erkennt einen englischen Schlüssel, der **hinzugefügt**
wurde, während einige Locales ihn nie erhielten.

`check-ui-keys-coverage` kann diese Fehlerklasse nicht erkennen: Der Prüfschritt erzwingt eine prozentuale Untergrenze je Locale, und
elf fehlende Schlüssel von ~13.000 ergeben weiterhin eine Abdeckung von 99,9 %. Ein Prozentwert je Sprache kann nicht
ausdrücken, dass „diese Funktion unübersetzt ausgeliefert wurde“ — eine vollständige Funktion kann ohne jeglichen
Text in einer neuen Locale landen, ohne den Wert jemals zu verändern.

Der dadurch erfasste Vorfall: Phase 3 des Orchestration Canvas übersetzte ihre elf Schlüssel in
die damals vorhandenen 42 Locales. Stunden später erhöhte der EU-Sprachen-Batch (#13044) die Anzahl der Locales im Repository
auf 51, und die neun Neuzugänge (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) erhielten
diese Schlüssel nie. `deepMergeFallback` setzt für einen fehlenden Schlüssel Englisch ein, sodass sich der Fehler
als unübersetzte statt als leere Benutzeroberfläche zeigte — ein reales Problem, das konstruktionsbedingt unbemerkt blieb.

Wie der verwandte Prüfschritt ist auch dieser **differenzsensitiv**: Er vergleicht das Englische am Merge-Base mit dem
Arbeitsbaum, sodass bereits vorhandene Lücken unverändert bleiben und der Prüfschritt ohne Migration aktiviert werden konnte.

**Ein `__MISSING__:<english>`-Marker erfüllt die Anforderung nicht (seit 2026-09-17).** Früher war er die
dokumentierte Möglichkeit zum Aufschub — zur Laufzeit wird auf korrektes Englisch zurückgegriffen —, bis acht Feature-PRs am
2026-09-16 insgesamt 61 Schlüssel hinzufügten und den Marker in alle 65 Locales eintrugen, anstatt sie zu übersetzen: Dieser
Prüfschritt akzeptierte jeden einzelnen, nichts blockierte die PRs, und der blockierende Prüfschritt für den Anteil echter Übersetzungen
schlug anschließend an der Release-Spitze für alle fehl (pt-BR 3,2 % > 2,5 % + 0,5). Ein Marker wird nun
wie eine fehlende Übersetzung bewertet. Einen fehlgeschlagenen Prüfschritt beheben Sie mit
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` oder
für alle Locales parallel mit `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
für Detached-Zustände geeignet, verweigert den Start ohne die `OMNIROUTE_TRANSLATION_*`-Umgebungsvariablen). Ein Schlüssel, der
englisch bleiben muss (ein festgelegter Produkt-, Engine- oder Flag-Name), gehört in `scripts/i18n/untranslatable-keys.json`,
niemals hinter einen Marker. `vi` verbietet Marker vollständig (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — Prüfschritt für zurückgestellte Tests

Eine Datei in der `exclude`-Liste von `vitest.config.ts` ist ein Test, der nicht ausgeführt wird, und wirkt für jeden,
der den Verzeichnisbaum liest, dennoch wie vorhandene Testabdeckung. Zweiundsechzig Dateien sammelten sich hinter dem Kommentar
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618 wurde am
2026-08-11 geschlossen, während die von ihm nachverfolgte Liste von 45 auf 62 Einträge anwuchs, wobei jeder neue Eintrag einen Kommentar
erbte, der auf ein erledigtes Issue verwies. Als die Liste schließlich Datei für Datei überprüft wurde (#13204), **bestanden 51 der 62
Tests mit dem aktuellen Stand des Verzeichnisbaums, ohne jegliche Änderung am Quellcode**.

Der Prüfschritt verlangt, dass jeder Ausschluss, der auf eine tatsächlich vorhandene Datei verweist, (a) ein Tracking-Issue benennt und
(b) mit seinem gemessenen Status in `config/quality/vitest-exclusions.json` erscheint, sodass das Hinzufügen eines Ausschlusses
eine überprüfbare Änderung in einer dedizierten Datei darstellt und nicht bloß eine weitere Zeile in einem Array mit 60 Einträgen. Der Prüfschritt
führt die ausgeschlossenen Tests bewusst nicht erneut aus — das kostet etwa 10 Minuten und gehört in einen regelmäßig ausgeführten Job; das
Inventar hält fest, wann jeder Test zuletzt überprüft wurde.
