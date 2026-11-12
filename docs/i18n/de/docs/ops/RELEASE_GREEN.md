# Release-Green: candidate validation and evidence (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green beobachtet einen bestimmten Commit und meldet seine Validierungsergebnisse. Die [Quality Gates-Referenz](../architecture/QUALITY_GATES.md) definiert die aktuellen CI Profile, erforderlichen Prüfungen und Akzeptanzrichtlinien. Die versionierte Zulassungsrichtlinie in `config/quality/admission-policy.json` ist der ausführbare Vertrag für `Gate / CI` und `Gate / Quality`.

## CI und Beobachterbereich

`ci.yml` und `quality.yml` decken Pull-Anfragen in Haupt- und Release-Zweige ab. Das ausgewählte Profil bestimmt, welche Stellen sich bewerben. Vollständiges CI umfasst auch Lanes, die ein gewöhnlicher Pull-Request nicht ausführt. Ein schnelles Beobachterergebnis kann diese Jobs nicht ersetzen, und ein abgeschlossener Workflow-Wrapper kann seine Belege nicht ersetzen.

Der Produktionsaufbau gehört CI. In `quality.yml` gibt es keinen doppelten Advisory-Build. Fehlende Artefakte, abgebrochene Arbeiten und unvollständige Messungen begründen keine erfolgreiche erforderliche Prüfung. Bestätigen Sie die aktuelle Basis, den Kopf und den kombinierten Kandidaten, bevor Sie die Ergebnisse akzeptieren.

## Lokale Validierung

Führen Sie den Beobachter in einem eigenen Arbeitsbaum aus, nachdem Sie seine Abhängigkeiten vorbereitet haben. Befolgen Sie vor der umfassenden Validierung das Arbeitsbaum- und Ressourcenprotokoll in `docs/ops/WORKTREE_ISOLATION.md`.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Das Schnellprofil ist teilweise. Das vollständige Profil prüft seine modellierten Anforderungen und bewahrt Befehlsbestätigungen auf; Es zertifiziert weder die Bereitstellung noch ersetzt es die entsprechenden gehosteten Prüfungen. Der Bericht unterscheidet zwischen Ausführungsfehlern und Metrikabweichungen. Erforderliche Ratschen bleiben entsprechend der gewählten Richtlinie sperrend. Erhöhen Sie die Grundlinie nicht nur, um ein passables Ergebnis zu erzielen.

## Nächtliche und manuelle Reinigung

Die nächtlichen Release- und Kompatibilitätsresolver wählen einen kanonischen Release-Zweig aus. Diese Auswahl muss mit dem Zweig übereinstimmen, der den Workflow ausgelöst hat, und die Suiten verwenden den unveränderlichen SHA des Ereignisses. Wählen Sie für die manuelle Ausführung die gewünschte Version in `release_branch` aus und senden Sie sie an dieselbe Referenz:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Der filialübergreifende Versand wird vor der Ausführung des ausgewählten Codes abgelehnt. Gehostete Hauptsuiten testen `main` und stellen vor der Installation sicher, dass ihr SHA immer noch mit dem aufgelösten Ziel übereinstimmt. Wenn sich der Hauptvorgang während der Auflösung bewegt, führen Sie den unvollständigen Sweep beim neuen Commit erneut aus. Kombinieren Sie keine Suite-Quittungen verschiedener Kandidaten.

## Fehlertriage und -wiederherstellung

Verwenden Sie den Vorfall als Diagnoseindex und überprüfen Sie dann den genauen Lauf, Versuch, fehlgeschlagenen Schritt und Artefakt. Vergleichen Sie gleichwertige Basis- und Kandidatennachweise, bevor Sie einen Fehler einem Mitwirkenden zuschreiben. Infrastrukturfehler, vererbte Mängel, Kandidatenregressionen und ausstehende Genehmigungen erfordern unterschiedliche Abhilfemaßnahmen.

Die Fertigkeiten `/green-prs`, `/sweep-reds`, `/validate-release-green` und `/babysit` sammeln Beweise und bereiten Korrekturen im Rahmen ihres dokumentierten Umfangs vor. Behalten Sie die Gutschrift der Mitwirkenden, nutzen Sie isolierte Reparaturzweige und überprüfen Sie alle erforderlichen Prüfungen vor einer autorisierten Zusammenführung. Kein automatischer Rebaseline- oder Incident-Closing-Ersatz ersetzt einen bestandenen aktuellen Kandidaten.
