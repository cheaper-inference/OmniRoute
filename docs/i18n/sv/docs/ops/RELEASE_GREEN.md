# Release-Green: candidate validation and evidence (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observerar ett specifikt åtagande och rapporterar dess valideringsresultat. [Quality Gates-referensen](../architecture/QUALITY_GATES.md) definierar aktuella CI profiler, nödvändiga kontroller och acceptanspolicy. Den versionerade [antagningspolicyn](../../config/quality/admission-policy.json) är det körbara kontraktet för `Gate / CI` och `Gate / Quality`.

## CI och observatörs räckvidd

`ci.yml` och `quality.yml` -täckningsförfrågningar till huvud- och släppgrenar. Den valda profilen avgör vilka jobb som gäller. Full CI inkluderar också banor som en vanlig pull-begäran inte exekverar. Ett snabbt observatörsresultat kan inte ersätta dessa jobb, och ett slutfört arbetsflödesomslag kan inte ersätta sina kvitton.

Produktionsbygget tillhör CI. Det finns ingen dubblett av rådgivningsbyggen i `quality.yml`. Saknade artefakter, inställt arbete och ofullständiga mätningar skapar inte en framgångsrik obligatorisk kontroll. Bekräfta aktuell bas, chef och kombinerad kandidat innan du accepterar resultaten.

## Lokal validering

Kör observatören i ett ägt arbetsträd efter att ha förberett dess beroenden. Använd [arbetsträdet och resursprotokollet](WORKTREE_ISOLATION.md) innan tung validering.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Snabbprofilen är delvis. Den fullständiga profilen kontrollerar dess modellerade krav och bevarar kommandokvitton; det certifierar inte driftsättning eller ersätter tillämpliga värdbaserade kontroller. Rapporten skiljer exekveringsfel från metrisk drift. Nödvändiga spärrhakar förblir blockerande enligt den valda policyn. Höj inte en baslinje bara för att få ett godkänt resultat.

## Nattliga och manuella svep

De nattliga release- och kompatibilitetslösare väljer en kanonisk releasegren. Det valet måste matcha grenen som utlöste arbetsflödet, och sviterna använder händelsens oföränderliga SHA. För manuell exekvering, välj den avsedda versionen i `release_branch` och skicka på samma ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Branschöverskridande utskick avvisas innan den valda koden exekveras. Hosted main suites checkar ut `main` och verifierar att dess SHA fortfarande matchar det lösta målet före installationen. Om huvuddrag under upplösning, kör om det ofullständiga svepet på den nya commit. Kombinera inte svitkvitton från olika kandidater.

## Misslyckande triage och återhämtning

Använd incidenten som ett diagnostiskt index, inspektera sedan den exakta körningen, försöket, det misslyckade steget och artefakten. Jämför motsvarande bas- och kandidatbevis innan du tillskriver en bidragsgivare ett misslyckande. Infrastrukturfel, ärvda defekter, kandidatregressioner och väntande godkännanden kräver olika åtgärder.

Färdigheterna `/green-prs`, `/sweep-reds`, `/validate-release-green` och `/babysit` samlar in bevis och förbereder korrigeringar inom deras dokumenterade omfattning. Behåll bidragsgivarens kredit, använd isolerade reparationsgrenar och verifiera alla nödvändiga kontroller innan en auktoriserad sammanslagning. Ingen automatisk rebaseline eller incident stängning ersätter en passerande aktuell kandidat.
