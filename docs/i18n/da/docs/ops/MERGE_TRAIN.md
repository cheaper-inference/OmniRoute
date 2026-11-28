# Merge Queue & Manual Merge-Train Runbook (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Lander på en frigørelsesgren

Omni-køen styrer landinger i `release/vX.Y.Z`. Læs `mode` på øverste niveau i `config/merge-queue/config.json` på standardgrenen, før du lander en PR. Se [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** kører validering og overlader landing til en manuel fletning. Anvend `omni-queue` på den godkendte PR ved dets sidste hoved. Tjek berettigelse med `npm run queue -- why <PR>`. Vent på dommen for det hoved i `npm run queue -- history --base <branch>`. Fortsæt på `would-land`. På `culprit-found` eller `would-dequeue` skal du holde sammenfletningen og rette årsagen.
- **Skygge undtagelser.** Et tog med grøn fuld CI mod den aktuelle basisspids kan fortsætte uden en særskilt kødom. Den samme undtagelse gælder, når PR hovedet allerede indeholder den aktuelle basisspids.
- **`live`** bruger `omni-queue` etiketten til at udløse landing. Alene køen lander PR. Forlad flettekommandoer og direkte push til køen.

Hver landing kræver ejerens tilladelse og de relevante påkrævede kontroller. Anvend først `omni-queue`, efter at ejeren har godkendt landing. PRs i kø, der berører beskyttede stier, kræver også ejerens `protected-approved` beslutning for den PR.

Regelsættet "Kræv grønne porte på den aktive udgivelse" kræver grønne `Gate / CI` og `Gate / Quality` på hovedet. Brug aldrig `--admin` til at omgå en rød port. En frigivelsesfryseblokke smelter sammen i den frosne gren. Se [hård regel 21](HARD_RULES_DETAIL.md). Aldrig markere, flette eller skubbe til en pull-anmodning om, at en anden session fungerer. Se [hård regel 22](HARD_RULES_DETAIL.md).

## Anmodningen om togtræk

1. Start en toggren ved den aktuelle frigivelsesbasespids. Integrer de nøjagtige godkendte medlemshoveder ved hjælp af merge commits. Bevar deres forpligtelseshistorie ved at undgå squash og rebase.
2. Åbn én pull-anmodning for toggrenen. Valider den PR med sin egen fulde CI på den aktuelle basisspids. Kontroller basisspidsen og de godkendte elementhoveder igen før landing. Opdater toget og dets CI når den validerede kandidat ændres.
3. Land toget PR med en merge commit under den gældende køtilstand. I live-tilstand bevarer køens `merge-ff` landingsmetode sammenfletningsforpligtelserne. De originale medlemshoveder bliver tilgængelige fra udløsergrenen. GitHub markerer medlemmet PRs som fusioneret, og commits bevarer deres forfattere.

Et offentligt eksempel er [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Det kombinerede 18 medlemmer PRs og landede med en fusionsforpligtelse 2026-11-24.

En sync-back fra `main` til den næste udgivelsesgren lander også gennem en merge commit. Bevarelse af `main` herkomst er påkrævet for senere sync-backs. Se [Worktree Isolation](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Den lokale fusionstog-validator

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validatoren henter basis- og PR hovederne og kombinerer dem i et engangsarbejdstræ. Den kører sin paritetssuite én gang på det resulterende træ. En mislykket headfetch- eller fletkonflikt skubber den PR ud, og scriptet fortsætter med den resterende PRs.

- **`--plan`** udskriver den valgte tilstands trin og afslutter uden at oprette et arbejdstræ eller kontakte fjernbetjeningen. Kombiner det med `--fast` for at inspicere den hurtige plan.
- **`--fast`** kører de almindelige statiske porte, de valgte ændrede `node:test` filer under `tests/unit/`, og `npm run test:vitest`. Kør en fuld lokal validering mindst én gang om dagen på den akkumulerede spids, når du bruger hurtig tilstand.
- **Fuld tilstand** tilføjer de fuldstændige statiske porte og kører `npm run test:unit` og `npm run test:vitest`.

En svigtende statisk gate køres igen på den uberørte base, hvis basesonden er tilgængelig. Scriptet rapporterer nedarvede fejl og fortsætter, når hver genkendt overtrædelseslinje også vises på basen, og det samlede antal ikke er vokset.

| Udgang | Mening                                                                                                                                   |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Printede planen eller færdiggjorde suiten. Suiteresuméet viser alle nedarvede statiske fejl og udstødt PRs.                              |
| `1`    | Ugyldige argumenter, ingen Git checkout, mislykket preflight eller ingen PR boarded.                                                     |
| `2`    | En suitecheck mislykkedes og kvalificerede sig ikke som nedarvet. Operatøren kan opdele partiet, skubbe den stødende PR ud og køre igen. |

Et lokalt pas leverer kun diagnostisk bevis for ejerens dossier. Hver landing kræver stadig ejerautorisation, egne påkrævede kontroller og skyggekø-afgørelsen, når det er relevant.

## Tiering

- **Per PR.** CI og Quality select kontroller baseret på de ændrede stier. Code PRs kører hurtige kvalitetsporte og påvirkede tests med separate enheds- og Vitest -job i CI.
- **Pr. køkandidat.** CI og Quality kører den fulde profil for den sammensatte kandidat på dens køref.
- **Per udløserspids.** Release-Green kører hurtige hårde porte på push, der matcher dens stifiltre. Tre planlagte kørsler om dagen bruger det fulde sweep for frigivelsesgrenen.
- **Per udgivelse.** Den fulde CI matrix inkluderer E2E shards, pakkevalidering, tarball boot smoke og dækningstjek. Se [udgivelsestjeklisten](RELEASE_CHECKLIST.md).

## Frisk-checkout forudsætninger for `merge-train.sh`

Preflighten kører før oprettelse af arbejdstræer. Installer afhængigheder med `npm ci`. Bekræft, at `node_modules/.bin/tsc` er eksekverbar, og at `node_modules/node_modules` er fraværende. Tjek at `node_modules/.bin/bun --version` lykkes.

Hvis Bun efterinstallationen blev sprunget over, skal du køre `(cd node_modules/bun && node install.js)`. Tjek af udbyderens konsistens og kendte symboler bruger Bun. Validatoren kører `npm run check:cycles:ratchet` som en blokerende gate. Den selvstændige `npm run check:cycles` kommando er rådgivende.

## Historie

Mergify-fletningskøen blev trukket tilbage den 2026-11-19.
