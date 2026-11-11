# Release-Green: candidate validation and evidence (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observeert een specifieke commit en rapporteert de validatieresultaten ervan. De [Quality Gates-referentie](../architecture/QUALITY_GATES.md) definieert de huidige CI profielen, vereiste controles en acceptatiebeleid. Het versietoelatingsbeleid in `config/quality/admission-policy.json` is het uitvoerbare contract voor `Gate / CI` en `Gate / Quality`.

## CI en waarnemersscope

`ci.yml` en `quality.yml` behandelen pull-aanvragen in hoofd- en vrijgavetakken. Het geselecteerde profiel bepaalt welke functies van toepassing zijn. Volledige CI omvat ook rijstroken die een gewoon pull-verzoek niet uitvoert. Een snel resultaat kan deze taken niet vervangen, en een voltooide workflow-wrapper kan de bonnen niet vervangen.

De productiebuild is eigendom van CI. Er is geen dubbele adviesbuild in `quality.yml`. Ontbrekende artefacten, geannuleerd werk en onvolledige metingen vormen geen succesvolle vereiste controle. Bevestig de huidige basis-, hoofd- en gecombineerde kandidaat voordat u de resultaten accepteert.

## Lokale validatie

Voer de waarnemer uit in een eigen werkboom nadat u de afhankelijkheden ervan hebt voorbereid. Volg de werkboom en het resourceprotocol in `docs/ops/WORKTREE_ISOLATION.md` vóór zware validatie.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Het snelle profiel is gedeeltelijk. Het volledige profiel controleert de gemodelleerde vereisten en bewaart opdrachtbewijzen; het certificeert de implementatie niet en vervangt geen toepasselijke gehoste controles. In het rapport wordt onderscheid gemaakt tussen mislukte uitvoering en metrische drift. Vereiste ratels blijven blokkeren volgens het geselecteerde beleid. Verhoog de basislijn niet alleen maar om een voldoende resultaat te verkrijgen.

## Nachtelijke en handmatige veegbewegingen

De nachtelijke release- en compatibiliteitsresolvers selecteren een canonieke release-vertakking. Die selectie moet overeenkomen met de vertakking die de workflow heeft geactiveerd, en de suites gebruiken de onveranderlijke SHA van de gebeurtenis. Voor handmatige uitvoering selecteert u de beoogde vrijgave in `release_branch` en verzendt u deze op dezelfde ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Verzending tussen vestigingen wordt afgewezen voordat de geselecteerde code wordt uitgevoerd. Gehoste hoofdsuites checken `main` uit en verifiëren dat de SHA nog steeds overeenkomt met het opgeloste doel vóór de installatie. Als er hoofdbewegingen zijn tijdens het oplossen, voer dan de onvolledige sweep opnieuw uit op de nieuwe commit. Combineer geen suitebonnen van verschillende kandidaten.

## Triage en herstel van mislukkingen

Gebruik het incident als diagnostische index en inspecteer vervolgens de exacte uitvoering, poging, mislukte stap en artefact. Vergelijk gelijkwaardig basis- en kandidaat-bewijsmateriaal voordat u een tekortkoming aan een bijdrager toeschrijft. Infrastructuurfouten, erfelijke defecten, achteruitgang van kandidaten en lopende goedkeuringen vereisen verschillende oplossingen.

De vaardigheden `/green-prs`, `/sweep-reds`, `/validate-release-green` en `/babysit` verzamelen bewijsmateriaal en bereiden oplossingen voor binnen hun gedocumenteerde reikwijdte. Behoud het krediet van de bijdrager, gebruik geïsoleerde reparatiefilialen en verifieer alle vereiste controles vóór een geautoriseerde samenvoeging. Geen enkele automatische rebaseline of incidentafsluiting kan een passerende huidige kandidaat vervangen.
