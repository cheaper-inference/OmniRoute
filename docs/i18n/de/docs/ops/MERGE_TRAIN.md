# Merge Queue & Manual Merge-Train Runbook (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Landung auf einem Release-Zweig

Die Omni-Warteschlange regelt Landungen in `release/vX.Y.Z`. Lesen Sie den `mode` der obersten Ebene in `config/merge-queue/config.json` im Standardzweig, bevor Sie einen PR landen. Siehe [Omni-Warteschlange](OMNI_QUEUE.md).

- **`shadow`** führt die Validierung durch und überlässt die Landung einer manuellen Zusammenführung. Wenden Sie `omni-queue` an der endgültigen Spitze des genehmigten PR an. Überprüfen Sie die Berechtigung mit `npm run queue -- why <PR>`. Warten Sie auf das Urteil für diesen Kopf in `npm run queue -- history --base <branch>`. Fahren Sie mit `would-land` fort. Halten Sie bei `culprit-found` oder `would-dequeue` die Zusammenführung an und beheben Sie die Ursache.
- **Schattenausnahmen.** Ein Zug mit grüner voller CI gegen die aktuelle Basisspitze kann ohne separates Warteschlangenurteil weiterfahren. Die gleiche Ausnahme gilt, wenn der PR Kopf bereits die aktuelle Basisspitze enthält.
- **`live`** verwendet das `omni-queue` Label, um die Landung auszulösen. Allein die Warteschlange landet den PR. Überlassen Sie Zusammenführungsbefehle und direkte Pushs der Warteschlange.

Jede Landung erfordert die Genehmigung des Eigentümers und die entsprechenden erforderlichen Kontrollen. Wenden Sie `omni-queue` erst an, nachdem der Eigentümer die Landung genehmigt hat. Für in der Warteschlange befindliches PRs, das geschützte Pfade berührt, ist auch die `protected-approved` Entscheidung des Eigentümers für dieses PR erforderlich.

Der Regelsatz „Erfordern grüne Tore für die aktive Version“ erfordert grünes `Gate / CI` und `Gate / Quality` am Kopf. Verwenden Sie `--admin` niemals, um ein rotes Tor zu umgehen. Ein Release-Freeze-Block verschmilzt mit dem Frozen-Zweig. Siehe [harte Regel 21](HARD_RULES_DETAIL.md). Kennzeichnen Sie niemals eine Pull-Anfrage, führen Sie sie zusammen oder pushen Sie sie nicht darauf, dass eine andere Sitzung funktioniert. Siehe [harte Regel 22](HARD_RULES_DETAIL.md).

## Die Zug-Pull-Anfrage

1. Starten Sie einen Zugzweig an der Spitze der aktuellen Release-Basis. Integrieren Sie mithilfe von Merge-Commits genau die genehmigten Mitgliederköpfe. Behalten Sie ihren Commit-Verlauf bei, indem Sie Squash und Rebase vermeiden.
2. Öffnen Sie eine Pull-Anfrage für den Zugzweig. Validieren Sie diesen PR mit seinem eigenen vollständigen CI auf der aktuellen Basisspitze. Überprüfen Sie vor der Landung erneut die Basisspitze und die zugelassenen Mitgliedsköpfe. Aktualisieren Sie den Zug und seinen CI wenn sich der validierte Kandidat ändert.
3. Landen Sie den Zug PR mit einem Merge-Commit im entsprechenden Warteschlangenmodus. Im Live-Modus behält die `merge-ff` Landemethode der Warteschlange die Merge-Commits bei. Die ursprünglichen Mitgliedsköpfe werden vom Release-Zweig aus erreichbar. GitHub markiert das Mitglied PRs als zusammengeführt und die Commits behalten ihre Autoren.

Ein öffentliches Beispiel ist [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Es kombinierte 18 Mitglieds PRs und landete mit einem Merge-Commit am 24.11.2026.

Eine Rücksynchronisierung von `main` zum nächsten Release-Zweig erfolgt ebenfalls über einen Merge-Commit. Für spätere Synchronisierungen ist die Beibehaltung `main` Abstammung erforderlich. Siehe [Worktree-Isolation](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Der lokale Merge-Train-Validator

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Der Validator ruft die Basis- und PR Köpfe ab und kombiniert sie in einem verfügbaren Arbeitsbaum. Es führt seine Paritätssuite einmal auf dem resultierenden Baum aus. Bei einem fehlgeschlagenen Head-Fetch- oder Merge-Konflikt wird dieser PR ausgeworfen und das Skript fährt mit dem verbleibenden PRs fort.

- **`--plan`** druckt die Schritte des ausgewählten Modus und beendet ihn, ohne einen Arbeitsbaum zu erstellen oder die Fernbedienung zu kontaktieren. Kombinieren Sie es mit `--fast` um den Schnellplan zu überprüfen.
- **`--fast`** führt die allgemeinen statischen Gates und die ausgewählten geänderten `node:test` Dateien unter `tests/unit/` und `npm run test:vitest` aus. Führen Sie im Schnellmodus mindestens einmal täglich eine vollständige lokale Validierung der angesammelten Trinkgelder durch.
- **Vollmodus** fügt die reinen statischen Tore hinzu und führt `npm run test:unit` und `npm run test:vitest` aus.

Ein fehlerhaftes statisches Gate wird auf der unberührten Basis erneut ausgeführt, wenn die Basissonde verfügbar ist. Das Skript meldet vererbte Fehler und fährt fort, wenn jede erkannte Verstoßzeile auch auf der Basis erscheint und die Gesamtzahl nicht gestiegen ist.

| Ausfahrt | Bedeutung                                                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`      | Den Plan ausgedruckt oder die Suite fertiggestellt. Die Suite-Zusammenfassung listet alle übernommenen statischen Fehler und ausgeworfenen PRs auf.               |
| `1`      | Ungültige Argumente, kein Git-Checkout, fehlgeschlagener Preflight oder kein PR Boarding.                                                                         |
| `2`      | Eine Suite-Prüfung schlug fehl und wurde nicht als vererbt eingestuft. Der Bediener kann den Stapel halbieren, das fehlerhafte PR auswerfen und erneut ausführen. |

Ein lokaler Pass liefert nur diagnostische Beweise für das Dossier des Eigentümers. Für jede Landung sind weiterhin die Genehmigung des Eigentümers, eigene erforderliche Prüfungen und ggf. das Urteil über die Schattenwarteschlange erforderlich.

## Abstufung

- **Per PR.** CI und Quality wählen Prüfungen basierend auf den geänderten Pfaden aus. Code PRs führt schnelle Quality Gates und Impact-Tests mit separaten Unit- und Vitest Jobs in CI aus.
- **Pro Warteschlangenkandidat.** CI und Quality führen das vollständige Profil für den zusammengesetzten Kandidaten in seiner Warteschlangenreferenz aus.
- **Pro Release-Tipp.** Release-Green führt schnelle harte Tore bei Pushs aus, die seinen Pfadfiltern entsprechen. Drei geplante Läufe pro Tag nutzen den vollständigen Sweep für den Release-Zweig.
- **Pro Veröffentlichung.** Die vollständige CI Matrix umfasst E2E Shards, Paketvalidierung, Tarball-Boot-Smoke und Abdeckungsprüfungen. Siehe die [Release-Checkliste](RELEASE_CHECKLIST.md).

## Fresh-Checkout-Voraussetzungen für `merge-train.sh`

Der Preflight wird vor dem Erstellen von Arbeitsbäumen ausgeführt. Installieren Sie Abhängigkeiten mit `npm ci`. Bestätigen Sie, dass `node_modules/.bin/tsc` ausführbar ist und dass `node_modules/node_modules` nicht vorhanden ist. Überprüfen Sie, ob `node_modules/.bin/bun --version` erfolgreich ist.

Wenn die Postinstallation Bun übersprungen wurde, führen Sie `(cd node_modules/bun && node install.js)` aus. Die Anbieterkonsistenz- und Known-Symbol-Prüfungen verwenden Bun. Der Validator führt `npm run check:cycles:ratchet` als blockierendes Gate aus. Der eigenständige `npm run check:cycles` Befehl ist beratend.

## Geschichte

Die Mergify-Merge-Warteschlange wurde am 19.11.2026 eingestellt.
