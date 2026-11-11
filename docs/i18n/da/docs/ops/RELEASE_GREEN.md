# Release-Green: candidate validation and evidence (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observerer en specifik forpligtelse og rapporterer dens valideringsresultater. [Quality Gates-referencen](../architecture/QUALITY_GATES.md) definerer de aktuelle CI profiler, påkrævede kontroller og acceptpolitik. Den versionerede [optagelsespolitik](../../config/quality/admission-policy.json) er den eksekverbare kontrakt for `Gate / CI` og `Gate / Quality`.

## CI og observer scope

`ci.yml` og `quality.yml` dækning trækker anmodninger ind i hoved- og frigivelsesgrene. Den valgte profil afgør, hvilke job der gælder. Fuld CI inkluderer også baner, som en almindelig pull-anmodning ikke udfører. Et hurtigt observatørresultat kan ikke erstatte disse job, og en fuldført workflow-indpakning kan ikke erstatte sine kvitteringer.

Produktionsbygningen tilhører CI. Der er ingen dobbelt rådgivende build i `quality.yml`. Manglende artefakter, annulleret arbejde og ufuldstændige målinger etablerer ikke en vellykket påkrævet kontrol. Bekræft den aktuelle base, chef og kombinerede kandidat, før du accepterer resultaterne.

## Lokal validering

Kør observatøren i et ejet arbejdstræ efter at have forberedt dens afhængigheder. Brug [arbejdstræet og ressourceprotokollen](WORKTREE_ISOLATION.md) før omfattende validering.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Den hurtige profil er delvis. Den fulde profil kontrollerer dens modellerede krav og bevarer kommandokvitteringer; det certificerer ikke implementering eller erstatter gældende hostede kontroller. Rapporten skelner mellem udførelsesfejl og metrisk drift. Påkrævede skralder forbliver blokerende i henhold til den valgte politik. Hæv ikke en baseline blot for at opnå et bestået resultat.

## Natlige og manuelle fejninger

De natlige udgivelses- og kompatibilitetsopløsere vælger en kanonisk udgivelsesgren. Dette valg skal matche den gren, der udløste arbejdsgangen, og suiterne bruger begivenhedens uforanderlige SHA. For manuel udførelse skal du vælge den tilsigtede udgivelse i `release_branch` og sende på samme ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Afsendelse på tværs af brancher afvises, før den valgte kode udføres. Hostede hovedsuiter checker `main` og kontroller, at dens SHA stadig matcher det løste mål før installation. Hvis de vigtigste træk under løsningen, skal du køre det ufuldstændige sweep på den nye commit igen. Kombiner ikke suitekvitteringer fra forskellige kandidater.

## Fejltriage og bedring

Brug hændelsen som et diagnostisk indeks, og inspicér derefter den nøjagtige kørsel, forsøg, fejltrin og artefakt. Sammenlign tilsvarende basis- og kandidatbeviser, før du tilskriver en bidragyder en fejl. Infrastrukturfejl, nedarvede defekter, kandidatregression og afventende godkendelser kræver forskellige afhjælpninger.

`/green-prs`, `/sweep-reds`, `/validate-release-green` og `/babysit` færdigheder indsamler beviser og forbereder rettelser under deres dokumenterede omfang. Behold bidragyderkredit, brug isolerede reparationsafdelinger, og bekræft alle nødvendige kontroller før en autoriseret sammenlægning. Ingen automatisk rebaseline eller hændelseslukning erstatter en bestået nuværende kandidat.
