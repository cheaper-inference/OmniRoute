# Merge Queue & Manual Merge-Train Runbook (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Lander på en slippgren

Omni-køen styrer landinger i `release/vX.Y.Z`. Les `mode` på toppnivå i `config/merge-queue/config.json` på standardgrenen før du lander en PR. Se [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** kjører validering og overlater landing til en manuell sammenslåing. Påfør `omni-queue` på den godkjente PR på dens siste hode. Sjekk kvalifisering med `npm run queue -- why <PR>`. Vent på dommen for det hodet i `npm run queue -- history --base <branch>`. Fortsett på `would-land`. På `culprit-found` eller `would-dequeue`, hold sammenslåingen og fiks årsaken.
- **Skyggeunntak.** Et tog med grønn full CI mot gjeldende basespiss kan fortsette uten egen kødom. Det samme unntaket gjelder når PR hodet allerede inneholder den gjeldende basespissen.
- **`live`** bruker `omni-queue` etiketten for å utløse landing. Køen alene lander PR. La sammenslåingskommandoer og direkte push til køen.

Hver landing krever eierens autorisasjon og de gjeldende nødvendige sjekkene. Påfør `omni-queue` først etter at eieren har godkjent landing. PRs i kø som berører beskyttede stier krever også eierens `protected-approved` avgjørelse for den PR.

Regelsettet "Krev grønne porter på den aktive utgivelsen" krever grønne `Gate / CI` og `Gate / Quality` på hodet. Bruk aldri `--admin` for å omgå en rød port. En frigjøringsfryseblokk smelter sammen i den frosne grenen. Se [hard regel 21](HARD_RULES_DETAIL.md). Ikke merk, slå sammen eller trykk til en pull-forespørsel om at en annen økt fungerer. Se [hard regel 22](HARD_RULES_DETAIL.md).

## Forespørselen om togtrekk

1. Start en toggren ved den nåværende utløserbasespissen. Integrer de eksakte godkjente medlemshodene ved å bruke merge commits. Bevar deres forpliktelseshistorie ved å unngå squash og rebase.
2. Åpne en trekkforespørsel for toggrenen. Bekreft at PR med sin egen fulle CI på den gjeldende basespissen. Kontroller basespissen og de godkjente medlemshodene på nytt før landing. Oppdater toget og dets CI når den validerte kandidaten endres.
3. Land toget PR med en merge commit under gjeldende kømodus. I live-modus bevarer køens `merge-ff` landingsmetode sammenslåingsforpliktelsene. De originale medlemshodene blir tilgjengelige fra utgivelsesgrenen. GitHub merker medlemmet PRs som slått sammen og forpliktelsene beholder sine forfattere.

Et offentlig eksempel er [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Den kombinerte 18 medlemmer PRs og landet med en fusjonsforpliktelse 2026-11-24.

En sync-back fra `main` til neste utgivelsesgren lander også gjennom en merge commit. Bevaring av `main` forfedre er nødvendig for senere sync-backs. Se [Worktree Isolering](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Den lokale sammenslåingstogvalidatoren

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validatoren henter base- og PR hodene og kombinerer dem i et engangsarbeidstre. Den kjører paritetssuiten sin én gang på det resulterende treet. En mislykket head-henting eller merge-konflikt løser ut den PR og skriptet fortsetter med den gjenværende PRs.

- **`--plan`** skriver ut den valgte modusens trinn og avslutter uten å opprette et arbeidstre eller kontakte fjernkontrollen. Kombiner den med `--fast` for å inspisere den raske planen.
- **`--fast`** kjører de vanlige statiske portene, de valgte endrede `node:test` filene under `tests/unit/`, og `npm run test:vitest`. Kjør en full lokal validering minst én gang om dagen på den akkumulerte spissen når du bruker hurtigmodus.
- **Full modus** legger til de fullstendige statiske portene og kjører `npm run test:unit` og `npm run test:vitest`.

En sviktende statisk port kjøres på nytt på den uberørte basen hvis basesonden er tilgjengelig. Skriptet rapporterer nedarvede feil og fortsetter når hver gjenkjent bruddlinje også vises på basen og det totale antallet ikke har vokst.

| Gå  | Betydning                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `0` | Printet planen eller fullførte suiten. Suitesammendraget viser eventuelle nedarvede statiske feil og utkastede PRs.                     |
| `1` | Ugyldige argumenter, ingen Git-utsjekking, mislykket forhåndskontroll eller ingen PR boarded.                                           |
| `2` | En suitesjekk mislyktes og kvalifiserte ikke som arvet. Operatøren kan dele partiet i to, kaste ut den fornærmende PR og kjøre på nytt. |

Et lokalt pass gir kun diagnostisk bevis for eierens dokumentasjon. Hver landing krever fortsatt eierautorisasjon, egne nødvendige kontroller og skyggekødommen når det er aktuelt.

## Tiering

- **Per PR.** CI og kvalitetskontroller basert på de endrede banene. Code PRs kjører raske kvalitetsporter og påvirkede tester, med separate enhets- og Vitest -jobber i CI.
- **Per køkandidat.** CI og Quality kjører hele profilen for den sammensatte kandidaten på sin køref.
- **Per utløserspiss.** Release-Green kjører raske harde porter på dytt som matcher banefiltrene. Tre planlagte kjøringer per dag bruker full sveip for utgivelsesgrenen.
- **Per utgivelse.** Den fullstendige CI matrisen inkluderer E2E skår, pakkevalidering, tarballstøvelrøyk og dekningssjekker. Se [utgivelsessjekklisten](RELEASE_CHECKLIST.md).

## Forutsetninger for fersk utsjekking for `merge-train.sh`

Preflighten kjører før du oppretter arbeidstrær. Installer avhengigheter med `npm ci`. Bekreft at `node_modules/.bin/tsc` er kjørbar og at `node_modules/node_modules` er fraværende. Sjekk at `node_modules/.bin/bun --version` lykkes.

Hvis Bun etterinstallasjonen ble hoppet over, kjør `(cd node_modules/bun && node install.js)`. Leverandørens konsistens og kjente symbolkontroller bruker Bun. Validatoren kjører `npm run check:cycles:ratchet` som en blokkerende port. Den frittstående `npm run check:cycles` kommandoen er rådgivende.

## Historie

Mergify-flettingskøen ble trukket tilbake 2026-11-19.
