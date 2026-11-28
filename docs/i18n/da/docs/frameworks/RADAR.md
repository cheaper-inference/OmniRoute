# Radar Free-Model Catalog (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Autoritativ kilde:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Senest opdateret:** 2026-09-01 — v3.8.51
> **Dokumentationsgrænse for hostet tjeneste:** Reglerne på serversiden, som beskrives her, blev verificeret
> 2026-09-01 mod den bevidst private Radar-server på den præcise revision
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Denne implementering distribueres ikke i
> dette OSS-repository; hostet tilgængelighed er fortsat en separat driftsmæssig tilstand.

Radar er en **valgfri tilføjelse**, der lægger et signeret, nyligt kurateret katalog over gratis modeller
oven på udgivelsens grundkatalog (`FREE_MODEL_BUDGETS` i
`open-sse/config/freeModelCatalog.data.ts`). Det findes, fordi landskabet for gratis niveauer ændrer sig
hurtigere end udgivelsesfrekvensen — udbydere tilføjer, reducerer eller udfaser gratis kvoter mellem
udgivelser, og grundkataloget kan kun opdateres, når en ny version udgives.

**Intet, der er gratis i dag, ophører med at være gratis på grund af det eksterne feed.** Radar
lægger aldrig en post fra grundkataloget bag en betalingsmur; det opdaterer kun felter for grænser/status på læsetidspunktet og kan
tilføje nyopdagede gratis modeller mellem udgivelser. En operatør kan stadig skjule en
model lokalt og kan gendanne den fra det samme dashboard. Selve grundkataloget
ændres aldrig på disken — se
[Fletteregler for overlejring på læsetidspunktet](#read-time-overlay-merge-rules) nedenfor.

---

## Leveringsstatus i v3.8.51

Følgende status skelner mellem, hvad denne OSS-udgivelse implementerer, og senere Radar-
arbejdsforløb. Det er en status på kodeniveau, ikke et løfte om, at en bestemt hostet implementering
eller ekstern integration er tilgængelig i øjeblikket.

| Område                                       | Status i denne udgivelse                                                                                                                                                                                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klient til signeret katalog                  | Implementeret bag `RADAR_ENABLED` med særskilt tilvalg, Ed25519-verifikation, lokale krypterede indstillinger/cache, vedvarende tilsidesættelser af visning/aktivering, reversible gravsten, planlægger og dashboard.                                      |
| Aktivering for bidragydere                   | Dashboardet linker til det serverhostede GitHub-flow til indløsning og accepterer en eksisterende `omr_…`-nøgle. Bidragyderes berettigelse afgøres af den private tjeneste; OSS-klienten indeholder ingen GitHub-token- eller udstedelseslogik.            |
| Aktivering med supporternøgle                | Implementeret. Den rå nøgle valideres, krypteres ved lagring, maskeres ved læsning og sendes kun under synkronisering på serversiden. Ændring eller rydning af nøglen ugyldiggør alle fire rettighedsfølsomme feedcacher.                                  |
| Henvisningslinks                             | Implementeret som et separat signeret feed, der opdateres hver time. Faste links er straks tilgængelige for fællesskabsniveauet; tidsbegrænsede kampagner forbliver livedata for niveauet.                                                                 |
| Supportertilbud                              | Implementeret som et separat signeret feed, der kun er tilgængeligt live, samt en dashboardside. Klienten genvaliderer det lukkede skema for fordele, bevarer den seneste gyldige cache, filtrerer udløbne poster fra og markerer partnertilbud eksplicit. |
| Efterretninger og anerkendelse af supportere | Implementeret som et strengt signeret feed, der kun er tilgængeligt live, med Radar-ejet ELO, faktuel aktualitet/tendens for kataloget, et verificeret lokalt supporterbadge, en dashboardside og lokale CLI-kommandoer til status/synkronisering.         |
| Betalinger og transaktionsmails              | Ikke implementeret i OSS-klienten. Køb, donation, kvitteringsgennemgang, gendannelse og maillevering hører til den private tjeneste; hostet tilgængelighed afhænger fortsat af dens overvågede implementering og udbyderkonfiguration.                     |
| Arbejdsforløb for forskningsagent            | Ikke en del af denne klientudgivelse. Indholdet i de kuraterede feeds forbliver data på serversiden; ingen autonom forskningsagent kører i en OmniRoute-installation.                                                                                      |

---

## Offentlig meddelelseslæser

Den generiske meddelelseslæser er adskilt fra Radar-funktionsflaget. Dashboardets startside og
Changelog-visning henter repositoryets offentlige `news.json` via en almindelig `GET` til
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). De sender ingen Radar-indstilling, prompt, udbyderkonfiguration,
brugsregistrering eller lokal afvisningstilstand.

`news.json` bruger det lukkede v2-skema, der er implementeret af `parseNewsPayload()`:

- `schemaVersion: 2` og en begrænset `items[]`-samling;
- stabile, entydige `id`-værdier for meddelelser;
- eksplicitte felter for `active` og ISO-`publishedAt`;
- påkrævet engelsk tekst med valgfri lokaliseret tekst;
- valgfrie HTTPS-links uden legitimationsoplysninger og et ikon fra en tilladelsesliste;
- valg af nyeste aktive meddelelse først, reservevalg af engelsk lokalitet og lokal afvisning pr. ID.

Parseren accepterer midlertidigt det tidligere entalsformat `{ active, title, message, ... }`, så
ældre forks kan migrere uden en defekt Changelog-visning. Ugyldige feeds er inaktive. Radar-lanceringsposten
leveres med `active: false`; at ændre den til `true` er en separat udgivelseshandling efter merge og udrulning
og ændrer ikke `RADAR_ENABLED` eller det uafhængige tilvalg af feedsynkronisering.

---

## Flag: `RADAR_ENABLED` (deaktiveret som standard)

Radar er beskyttet hele vejen igennem af funktionsflaget `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorien `policies`,
`defaultValue: "false"`).

**Når flaget er deaktiveret, findes grænsefladen ikke:**

- Alle `/api/radar/*`-endpoints, inklusive lokale læse- og skriveoperationer for modeltilstand,
  returnerer `404`, før et Radar-modul berøres.
- Dashboard-skærmene (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderer
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returnerer det uberørte grundlag —
  samme antal poster, samme værdier, hver post markeret med `origin: "baseline"` — og læser aldrig
  feedcachen.
- Der foretages aldrig noget Radar-netværkskald; hvert synkroniseringsmodul returnerer `{ status: "disabled" }`,
  før `fetch` berøres.

Dette er en streng overordnet gate: Aktivering af flaget låser kun _skærmene_ op,
ikke andet. Det uploader ikke data, starter ikke en baggrundssynkronisering og ændrer ikke
routing eller modelvalg — se det separate tilvalg nedenfor.

---

## Datasynkronisering er en SEPARATE opt-in — løftet om privatlivets fred

Tænde for `RADAR_ENABLED` låser kun UI op. Synkronisering af feedet kræver en anden, uafhængig opt-in, der er gemt i `radar_settings.opt_in` (`src/lib/db/radar.ts`, migration `136_radar_cache_settings.sql`). `syncRadar()` tjekker flaget _og_ opt-in, før der foretages et netværksopkald:

```
Flag off      → { status: "disabled" }   — no network call
Opt-in false  → { status: "opt_out" }    — no network call
```

Når begge er aktiveret, er synkroniseringsstien:

1. `GET <feed base URL>/v1/catalog/latest` med `x-omniroute-radar-schema: 2` og en valgfri `Authorization: Bearer <supporter key>` header (se nedenfor). Servere bruger som standard den separat signerede v1-overgangsartefakt, når skemaheaderen er fraværende, så ældre installerede klienter bliver ved med at modtage opdateringer.
2. Dette er et program, der kun kan downloades, men det er stadig en HTTPS anmodning. Den hostede infrastruktur modtager almindelige forbindelsesmetadata såsom kilden IP. Når en supportnøgle er konfigureret, sender synkronisering også denne nøgle i bærerhovedet, så tjenesten kan løse berettigelsen. Ved den nøjagtige revision af den private server, der er identificeret i bevisgrænsen ovenfor, bruger feed-anmodningsregnskabet nøglehash, samlet brug og en daglig roterende trunkeret HMAC af IP til manuel misbrugsgennemgang; disse tabeller bevarer hverken nøglen eller IP i rå form. Infrastrukturadgangslogfiler og den krypterede leveringsudbakke er separate operationelle grænser.
3. OmniRoute sender aldrig prompter, svar, samtaler, udbyderoplysninger, modeltrafik, oppetid, latenstid eller den lokale udbyderkonfiguration til Radar-tjenesten.
4. Svaret verificeres, valideres og cachelagres lokalt (se [Sikkerhedsmodel](#security-model) ). Radar har præcis fire netværksstier på serversiden: `syncRadar()` til kataloget, `syncRadarReferrals()` for henvisninger og `syncRadarOffers()` / `syncRadarIntel()` for kun supportertilbud og Intel.

Katalogkontrollen kører hver 24 timer. Når det verificerede feed stadig indeholder den cachelagrede version og niveau, beholder synkronisering den cachelagrede nyttelast, fornyer `fetchedAt`, og den næste kontrol kommer 24 timer senere i stedet for på det næste flueben.

De** supporter nøgle** er et valgfrit bærer-token (`radar_settings.supporter_key`), der lader feed-tjenesten bestemme, hvilket niveau der skal serveres (se [niveauer](#tiers-community-and-live) ). Det er:

- Gemt** krypteret i hvile** med de samme AES-256-GCM `encrypt()`/`decrypt()` hjælpere (`src/lib/db/encryption.ts`), som bruges til udbyderoplysninger.
- Indstil via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) og** lød aldrig tilbage** — svaret returnerer en maskeret form (`omr_****abcd`).
- Ændring eller sletning af det ugyldiggør kataloget, henvisninger, tilbud og Intel-cacher. Den næste sync/read løser den nye rettighedsserver-side; gemmer en nøgle ikke i sig selv en netværksanmodning eller bruger en engangsaktiveringsnøgle.
- Sendt til feed-tjenesten som en bærer-token på sync GET — intet andet om nøglen forlader nogensinde klienten.

---

## Adgangs- og sikkerhedsregler vist før tilvalg

Det inaktive dashboard viser disse regler fra
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **før** en af de to aktiveringshandlinger.
Den kanoniske adgangsskala er:

| Niveau                    | Berettigelse                                                                         | Adgang                                            | Regel for gentagelse/udløb                                                             |
| ------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Fællesskab                | Alle; ingen nøgle                                                                    | Komplet katalog forsinket med cirka 30 dage       | Altid tilgængeligt; ingen udstedelse                                                   |
| Stjerne + følg            | GitHub OAuth bekræfter både en stjerne på repositoryet og en følgning af ejeren      | Én live-læsning af kataloget, derefter Fællesskab | Én udstedelse pr. login; genudstedes aldrig                                            |
| Bidragyder Top 10         | Placering 1–10 i den seneste komplette ugentlige rangliste                           | 365 live-dage                                     | Gøres krav på efter behov; det forkorter ikke en tildelt periode at forlade ranglisten |
| Bidragyder Top 100        | Placering 11–100 på den rangliste                                                    | 90 live-dage                                      | Samme regel for krav efter behov/idempotent krav                                       |
| Supporterkøb              | Engangskøb på 6 måneder, 1 år eller livstid                                          | Live-katalog, signerede live-tilbud og Intel      | Ingen automatisk fornyelse                                                             |
| Donation/manuel tildeling | Ejer-godkendt donation eller en ejertildeling for et udtrykkeligt antal dage/livstid | Samme live-rettighed i den tildelte periode       | Revideret, idempotent tildeling                                                        |

Mergede PR'er, commits og ændrede linjer er **kun input til ranglisten**. Et login uden for Top 100 får
ingen bidragydertildeling uanset antallet af PR'er. Tidsbegrænsede køb, donationer, bidragyderperioder og
manuelle tildelinger lægges til den aktuelle udløbsdato; livstid har forrang. En ændring i placeringen
tilbagekalder eller forkorter aldrig med tilbagevirkende kraft allerede tildelt tid.

Den hostede licens er personlig, og den brugervendte regel er én aktiv installation ad gangen. Denne
udgivelse hævder **ikke**, at der er en hardwarelås: OSS-synkroniseringen tager ikke fingeraftryk af hardware eller opretholder en
kryptografisk enhedslease. Ved den verificerede private serverrevision ovenfor består den implementerede håndhævelse
af validering af rettigheder samt et signal til manuel gennemgang, når den samme aktive nøgle ses fra en fjerde
unik IP-adresse inden for 24 timer. Dette signal blokerer eller tilbagekalder aldrig automatisk en nøgle. Gendannelse
tilbagekalder og erstatter den mistede nøgle, mens den eksisterende udløbsdato bevares; den genstarter ikke den
købte eller tildelte periode.

Live-tilbud kurateres manuelt og kan ændres eller udløbe. Tilvalgsskærmen angiver også den præcise
privatlivsgrænse: Signerede katalog-/henvisningsmetadata downloades; en gyldig nøgle låser desuden op for
signerede tilbud og Intel; Bearer-nøglen og normale forbindelsesmetadata sendes til den hostede tjeneste;
prompter, svar, samtaler, udbyderlegitimationsoplysninger, modeltrafik, oppetid, latenstid og lokal
udbyderkonfiguration gør ikke.

---

## Sådan får du en supporternøgle

Aktiveringsskærmen (`/dashboard/radar`) linker til to flows til at **få** en
supporternøgle. Selve OSS-repositoriet udsteder aldrig en nøgle, kører aldrig betalingskode og
**angiver aldrig en pris** — prissætningen besluttes og vises udelukkende på
destinationssiderne, ikke i dette repository (specifikationsbeslutning D14).

- **"Jeg er bidragyder"** — åbner `RADAR_CONTRIBUTOR_CLAIM_URL` (standard
  `https://radar.omniroute.online/auth/github`), et GitHub OAuth-claimflow hostet på
  den private Radar-server. Det kontrollerer den seneste fuldførte ugentlige rangering: Top 10 modtager 365 dage,
  og placeringerne 11–100 modtager 90 dage. Uden for Top 100 giver antallet af PR'er aldrig adgang; flowet
  kontrollerer i stedet det separate niveau for engangsbrug baseret på stjernemarkering + følgning.
- **"Støt projektet"** — åbner `RADAR_SUPPORTER_PLANS_URL` (standard
  `https://radar.omniroute.online/planos`), den hostede side med engangsmulighederne 6 måneder, 1 år og
  livstid. OSS-siden viser stadig ingen pengeværdi.

Begge URL'er fortolkes på serversiden (`src/lib/radar/links.ts`, samme mønster for
miljøvariabeltilsidesættelse som `RADAR_FEED_URL`) og videresendes til dashboardet via det eksisterende
`GET /api/radar/settings`-svar (`contributorClaimUrl`, `supporterPlansUrl`) —
klientkomponenten læser aldrig selv `process.env`.

| Variabel                      | Formål                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Tilsidesætter URL'en til bidragyder-claimet (standard `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Tilsidesætter URL'en til supporterplanerne (standard `https://radar.omniroute.online/planos`).       |

### Gendannelse af en mistet supporternøgle

Den hostede tjenestes startpunkt for gendannelse er `https://radar.omniroute.online/recover`; der linkes også
til det fra plansiden. Gendannelsen forbliver helt uden for OSS-klienten, fordi den lokale
installation aldrig modtager køberens/bidragyderens e-mail og ikke kan rekonstruere en rå nøgle fra
sine krypterede indstillinger.

1. Indsend den e-mail, der er knyttet til nøglen. Tjenesten returnerer den samme bekræftelsesside, uanset om der
   findes en nøgle, der kan gendannes, så formularen afslører ikke, hvilke konti der findes.
2. Hvis brugeren er berettiget, sender leveringsworkeren et kortlivet link til engangsbrug. Når det åbnes, flyttes
   tokenet straks til en midlertidig, krypteret `HttpOnly`/`Secure`-cookie, hvorefter der omdirigeres til den rene
   `/recover`-URL; siden indeholder intet token, ingen e-mail, ingen gammel nøgle og ingen erstatningsnøgle.
3. Bekræft tilbagekaldelsen. Den private tjeneste tilbagekalder den tidligere nøgle, opretter erstatningen med
   samme plan/udløbsdato og sætter den i kø til afsendelse via e-mail i én transaktion. Erstatningen
   returneres aldrig til browseren.
4. Indsæt erstatningen i `/dashboard/radar`. Den gamle nøgle skal nu nedgraderes til `community`;
   erstatningen skal resultere i en verificeret `live`-synkronisering. Hvis det samme gendannelseslink åbnes igen,
   skal det mislykkes med et generisk svar om, at det er ugyldigt eller udløbet.

Den hostede gendannelsesrute og mailworker kan være til stede i koden, mens de stadig er utilgængelige i en given
installation. Kald ikke flowet produktionsklart, før serveren er blevet installeret, leveringsudbyderen
er blevet konfigureret med en kontrolleret modtager, og hele engangslinket er blevet testet.

Når en besøgende har en nøgle (`omr_` + 40 hex-tegn), har aktiveringsskærmen
(`src/app/(dashboard)/dashboard/radar/page.tsx`) et indsætningsfelt til nøglen som den primære
vej: Når en nøgle indsættes og indsendes, sendes `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) i ét kald — indsættelse af en nøgle angiver den og tilmelder samtidig brugeren,
hvilket låser skærmen op. Formatet (`omr_` + 40 hex-tegn) kontrolleres først på klientsiden
med den delte `isValidSupporterKeyFormat()`-hjælpefunktion (`src/lib/radar/supporterKey.ts`)
som en UX-forbedring; serverens Zod-skema er under alle omstændigheder den autoritative kontrol. Når en
nøgle er angivet, viser aktiveringsskærmen den maskerede form (`supporterKeyMasked` fra
`GET /api/radar/settings`) i stedet for et tomt inputfelt med en "skift nøgle"-kontrol til
at indsætte en ny — den rå nøgle vises aldrig igen. De to claim-/planknapper ovenfor
er fortsat den måde, man _får_ en nøgle på i første omgang; dette inputfelt er stedet, hvor en operatør,
der allerede har en, aktiverer den.

### End-to-end-aktivering og guidet opsætning

Den private feedtjeneste og denne OSS-klient har en bevidst snæver grænseflade: Tjenesten
udsteder og validerer supporternøglen, mens den lokale OmniRoute-installation krypterer nøglen,
synkroniserer signerede artefakter på serversiden og guider opsætningen af udbyderen. Rækkefølgen for den assisterede validering er:

1. Hent en nyudstedt eller gendannet nøgle fra bidragyderkravet, planer/checkout, gendannelsesforløbet eller en autoriseret privat serveroperatør. Indsæt ikke den rå nøgle i logfiler, skærmbilleder, kommentarer til issues eller kommandolinjeargumenter.
2. Aktivér feature-flaget `RADAR_ENABLED` i den lokale OmniRoute-installation. Dette gør brugergrænsefladen tilgængelig, men den forbliver netværksinaktiv, indtil det separate tilvalg er gemt.
3. Åbn `/dashboard/radar`, indsæt nøglen, og aktivér. Browseren sender én lokal `POST /api/radar/settings` med `{ optIn: true, supporterKey }`; nøglen krypteres lokalt, og svaret indeholder kun `omr_****<last4>`.
4. Lad aktiveringsskærmen køre sin katalogsynkronisering, eller vælg **Synkroniser nu**. Bekræft, at siden viser `live`, en feedversion og et hentningstidspunkt. Til lokal diagnosticering med godkendelse rapporterer `GET /api/radar/status` tilvalgs-/nøgletilstedeværelse og de fire cachetilstande uden at returnere nøglen. `POST /api/radar/sync-all` kan eksplicit opdatere katalog, henvisninger, tilbud og Intel.
5. Åbn `/dashboard/radar/setup?provider=<provider>`. Følg den udbyderejede URL til legitimationsoplysninger, vælg **Tilføj API-nøgle**, gem via udbyderens rigtige formular, vend tilbage til vejledningen, og kør **Test forbindelse**. Vejledningen bruger de normale `/api/providers`- og `/api/providers/<connection-id>/test`-ruter; den opretter ikke separate Radar-legitimationsoplysninger.
6. Åbn `/dashboard/radar/combos`, når mindst to kompatible udbyderforbindelser er aktive. Gennemgå den foreslåede familie, og opret kombinationen via det eksisterende kombinations-API. Tilbud og Intel forbliver separate, signerede caches, der kun er aktive live, og de kan kontrolleres på deres dedikerede Radar-sider.
7. Genindlæs `/dashboard/radar` og opsætningssiden. Tilvalget, den maskerede nøglestatus, den verificerede cache, den gemte udbyderforbindelse og testhandlingen skal bevares efter genindlæsningen. Registrér først dokumentation, når den rå nøgle og udbyderens legitimationsoplysninger ikke længere er synlige.

Lagring af en nøgle er ikke i sig selv bevis på live-berettigelse. Beviset er kombinationen af den private tjenestes `GET /v1/license/check`-resultat, OSS-katalogets leverede `live`-niveau, en verificeret signeret cache og den reelle proces for udbyderforbindelse/-test. En ugyldig, udløbet eller tilbagekaldt nøgle nedgraderer på sikker vis kataloget til `community`; dette må ikke rapporteres som en vellykket validering af en live-nøgle.

### Link til privat administrationspanel

`RADAR_ADMIN_URL` tilføjer valgfrit **Radar-administration ↗** umiddelbart efter det brugervendte Radar-element i sektionen Omkostninger i sidepanelet. Det har bevidst ingen standardværdi: Når variablen ikke er angivet eller er ugyldig, indeholder det statiske sidepanel, kommandopaletten og skærmen til tilpasning af sidepanelet intet administrationselement og ingen privat URL.

Værdien fortolkes på serversiden og videresendes via det administrationsgodkendte `GET /api/settings`-svar udelukkende til en godkendt dashboardsession eller til den betroede loopback-ejer under lokal opstart uden login. CLI-, intern tjeneste- og manage-scope-API-nøglegodkendelse modtager den ikke. Browseren validerer svaret igen, før det eksterne link oprettes, og linket åbnes med `noopener noreferrer`.

Brug en legitimationsfri HTTPS-tunnel-/tailnet-URL. Almindelig HTTP accepteres kun til en loopback-SSH-viderestilling såsom `http://127.0.0.1:9351`; andre skemaer, indlejrede legitimationsoplysninger, ugyldige URL'er og eksterne HTTP-destinationer afvises sikkert og efterlader navigationen inaktiv.

---

## Sikkerhedsmodel

### Ed25519 signatur over nøjagtige bytes

Feednyttelasten er signeret med Ed25519. `verifyFeedBytes()` (`src/lib/radar/verify.ts`) verificerer signaturen over** nøjagtige svarbytes** modtaget over ledningen — bliver nyttelasten aldrig gen-serialiseret før verifikation, så en byte-for-byte-omkodning kan ikke ugyldigt ugyldiggøre eller omgå signaturkontrollen. Bekræftelsesfejl (`invalid_signature`) afbryder synkroniseringen, før nyttelasten nogensinde parses eller cachelagres.

### Fastgjort offentlig nøgle + rotation

Den offentlige bekræftelsesnøgle er fastgjort i `src/lib/radar/pinnedKeys.ts` (`PINNED_FEED_PUBLIC_KEYS`), et array, så en ny nøgle kan sættes forud for en rotation, mens gamle cachelagrede feeds, der er signeret med en tidligere nøgle, forbliver gyldige, indtil de gensynkroniseres.

### Gaffelvenlige env-tilsidesættelser

To env vars lader gafler og selvhostere pege klienten på deres eget feed i stedet for standard OmniRoute tjenesten — se [Sådan hoster du selv et feed](#how-to-self-host-a-feed) nedenfor:

| Var                 | Formål                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Tilsidesætter feedbasen URL (standard `https://radar.omniroute.online`).                                                              |
| `RADAR_FEED_PUBKEY` | Tilsidesætter den fastgjorte offentlige nøgle (base64-DER SPKI eller PEM), og erstatter det indbyggede array med denne enkelte nøgle. |

### Version gulv

`syncRadar()` afviser et downloadet feed, hvis `version` strengt taget ikke er nyere end den aktuelt cachelagrede version (`compareVersions()`, prikket `YYYY.MM.DD.n` sammenligning) — `{ status: "stale" }`. Dette forhindrer et kompromitteret eller forkert konfigureret feedslutpunkt i at rulle en klient tilbage til en ældre, anderledes signeret nyttelast.

### To datoer, og hvorfor begge holdes

Et cachelagret feed har to forskellige datoer, og at forveksle dem er hele pointen med at beholde begge:

| Felt          | Kommer fra                | Svar                                      |
| ------------- | ------------------------- | ----------------------------------------- |
| `generatedAt` | det signerede foderlegeme | hvor gammel** data** er                   |
| `fetchedAt`   | denne installations ur    | når denne installation** downloadet** det |

Et feed hentet for minutter siden kan indeholde uger gamle figurer, så `fetchedAt` alene kan ikke fortælle en operatør, om overlejringen er friskere end den baseline, den sidder på. Begge er persisteret i `radar_feed_cache`, returneret af `getRadarCatalog().meta` og rapporteret separat af `GET /api/radar/status`. En række, der blev gemt i cachen, før `generated_at` kolonnen eksisterede (migrering 163), læses tilbage, som `null` — unknown forbliver ukendt i stedet for at låne hentetidspunktet. `radar_referrals_cache` har beholdt sin egen `generated_at` siden migration 142.

Versionsgulvet ovenfor sammenligner `version`, ikke nogen af datoen.

Der er to huller tilbage, begge bevidst: dashboardet viser stadig kun `Last fetched`, så læsning af byggedatoen der skal have en ny etiket (og dens 41 lokalitetsindgange); og tilbuddene og intel-cachene holder ingen byggedato overhovedet, selvom deres feed-skemaer bærer en — `GET /api/radar/status` udelader derfor feltet for disse to i stedet for at rapportere en `null`, der ville læses som "ukendt".

### Skema validering

De downloadede bytes parses og valideres mod `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`, et Zod -skema)** efter** signaturbekræftelse. Et skemamismatch returnerer `{ status: "invalid_schema" }`, og cachen forbliver uberørt. Den cachelagrede nyttelast valideres defensivt igen ved hver læst (`getRadarCatalog()`) — en korrupt eller håndredigeret cacherække falder tilbage til basislinjen i stedet for at blive serveret.

### Svarstørrelsesgrænse (10 MB)

`syncRadar()` håndhæver en** 10 MB hård kasket** på feed-svar-legemet — er det signerede feed et JSON dokument i KB-skala, så alt forbi dette peger på en forkert konfigureret eller fjendtlig `RADAR_FEED_URL` (eller en opstrøms servering af skrald), ikke et legitimt katalog. Håndhævelsen er to-lags:

1. Et `Content-Length` preflight-tjek springer helt over at læse brødteksten, når headeren allerede erklærer en værdi over hætten.
2. En løbende kontrol, mens du læser brødteksten, håndhæver hætten, selv når `Content-Length` er fraværende eller undervurderer den rigtige størrelse — headeren er aldrig tillid til alene. Sammenkædning af de akkumulerede bidder bevarer de nøjagtige bytes, der er nødvendige for Ed25519-signaturkontrollen efterfølgende.

Overskridelse af grænsen returnerer `{ status: "too_large" }` og efterlader cachen urørt, efter det samme ikke-destruktive mønster som enhver anden synkroniseringsfejl (`invalid_signature`, `invalid_schema`, `stale`).

---

## Niveauer: `community` og `live`

Feed-skemaet indeholder feltet `tier: "community" | "live"`, som fastlægges **på serversiden**
af feed-tjenesten ud fra anmodningen (tilstedeværelsen og gyldigheden af supporternøglen)
— klienten bestemmer aldrig selv sit niveau.

- **`community`** — det gratis katalog, som er cirka 30 dage forsinket i forhold til de nyeste
  data. Dette modtager en ikke-godkendt anmodning eller en anmodning med en ugyldig nøgle.
- **`live`** — det nyeste katalog, som leveres til anmodninger med en gyldig
  supporternøgle.

**En ugyldig eller udløbet supporternøgle nedgraderes til `community` — det er aldrig en
fejl.** Synkroniseringsstien skelner kun mellem signatur-/skema-/versionsfejl (alle
kan håndteres, og ingen af dem er fatale for den cachelagrede tilstand) og et vellykket `{ status:
"updated", version, tier }`. Der er ingen niveauspecifik fejlsti, som en klient skal
håndtere.

### Det leverede niveau kommer fra en svarheader, ikke fra den signerede brødtekst

Det signerede feeds **brødtekst** har altid værdien `"live"` i feltet `tier` — feed-tjenesten leverer
**to signerede artefakter pr. version**: live indeholder aktuelle kampagner, mens community
udelader dem. Hvert artefakt signeres ud fra sine egne nøjagtige bytes. Brødteksten fungerer stadig ikke
som adgangsbeslutning; det niveau, der faktisk vælges til en anmodning, angives i
**svarheaderen `x-omniroute-feed-tier`** og bestemmes på serversiden ud fra anmodningens
`Authorization`-nøgle.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) er det eneste sted,
der afgør, hvilket niveau en klient skal have tillid til:

1. Fortolk `x-omniroute-feed-tier` med `RadarTierSchema` (Zod) — en manglende header eller
   en værdi, der ikke er præcis `"community"` eller `"live"`, behandles som **ikke
   til stede** (den gemmes aldrig uændret som en betroet værdi i cachen/brugergrænsefladen; dette omfatter også ældre feed-
   servere fra før headeren blev indført).
2. Fald kun tilbage til den signerede brødteksts `tier`-felt (altid `"live"`), hvis trin 1
   ikke giver noget resultat.
3. Det fastlagte niveau er det, der cachelagres og returneres som `{ status: "updated",
version, tier }` — dette er den værdi, dashboardet viser, aldrig det rå felt fra brødteksten.

---

## Overlejringsregler for læsetid

`applyFeed()` (`src/lib/radar/applyFeed.ts`) fletter det cachelagrede feed** over** den statiske baseline kl** læse tid** , inde i `getRadarCatalog()`. Baseline-arrayet (`FREE_MODEL_BUDGETS`) er aldrig muteret — en `MergedEntry[]` beregnes frisk ved hvert opkald.

Fire regler i prioriteret rækkefølge:

1. **Feed overskriver aldrig en lokal tilsidesættelse.** Per felt: hvis operatøren har tilpasset et felt på en post (`localOverrides` map, keyed `provider:modelId`), springes feedets værdi for det specifikke felt — operatørens værdi vinder.
2. **`enabled: false` deaktiverer posten med herkomst.** En feed-indgang, der slår en post fra, sætter `enabled: false` og `disabledBy: "radar"` på det flettede resultat, så UI kan forklare _hvorfor_ en post gik fra tilgængelig til deaktiveret.
3. **En brugertilføjet post, der ikke findes i feedet, overlever urørt.** Indgange, der kun eksisterer i basislinjen (eller er tilføjet lokalt), og som ikke har nogen tilsvarende foderindtastning, passerer uændret.
4. **En gravstensbelagt indgang genopstår aldrig.** Hvis operatøren eksplicit har slettet en post (`tombstones` set), vil feedet, der gentilføjer den `provider:modelId` i en senere version, ikke bringe det tilbage.

De redigerbare felter og gravsten er bevaret i `radar_local_model_state` (migrering `153_radar_local_model_state.sql`). Den offentlige DB adapter (`src/lib/db/radar.ts`) konverterer disse rækker til `localOverrides` kortet og `tombstones` sættet, der bruges af `applyFeed()`; production `getRadarCatalog()` indlæses denne tilstand efter flag-, cache- og skema-gates passerer. Kun `displayName` og `enabled` kan operatørredigeres. Provider/model identitet, feed herkomst, kvote, kapaciteter, ToS og opsætningsdata kan ikke skrives gennem denne overflade.

Dashboardet afslører fire lokale handlinger:

- **Redigere** ændrer det lokale visningsnavn og aktiverede tilstand.
- **Nulstil lokale ændringer** rydder begge redigerbare felter uden at ændre en gravsten.
- **Skjule** opretter en gravsten, så senere feedopdateringer kan ikke genskabe rækken.
- **Gendan** fjerner gravstenen; enhver separat gemt tilsidesættelse forbliver i kraft.

En feed `enabled: false` forbliver sikkerhedsundtagelsen: den vinder over en gammel lokal `enabled: true`, holder den flettede post deaktiveret og registrerer `disabledBy: "radar"`.

Katalogpublikationer bruger `schemaVersion: 2`. `contextWindow` og hver af `tools`, `vision` og `thinking` er uafhængigt `number | null` / `boolean | null`: `null` betyder ukendt, mens `false` betyder en D16-confirmed officiel leverandørkilde udtrykkeligt siger, at kapaciteten er fraværende. Interne OmniRoute registry/model-spec flag fremmes aldrig direkte for at fremføre fakta. Klienten accepterer stadig v1 snapshots; fordi den gamle builder brugte `false` som en fraværspladsholder, normaliseres v1 `false` til ukendt, mens v1 `true` forbliver faktuel. Ukendte skemaversioner lukkes ikke, og den sidste gyldige cache forbliver tilgængelig. Hver v2-model med en ikke-null context/capability skal have en legitimationsfri HTTPS `metadataEvidenceUrls[]`; ellers mislykkes skemavalidering, og cachen udskiftes ikke. Katalogtabellen gengiver alle tre tilstande som `✓`, `✕` og `?`.

### Guidede kombinationer og MCP adgang

Bekræftede `familyId` værdier overlever læsetidsoverlejringen og driver det rene `buildRadarComboSuggestions()` modul (`src/lib/radar/comboSuggestions.ts`). En familie foreslås kun, når mindst to forskellige udbydere har aktive forbindelser og afslører den nøjagtige kurerede model ID. Deaktiverede modeller, inaktive udbydere, manglende model IDs, singleton-familier og tvetydige alias/prefix matches mislykkedes. Forslag bruger den eksisterende `priority` strategi, og bestiller det største tilbagevendende månedlige budget først; UI skaber dem kun gennem `POST /api/combos`.

Den guidede UI bor på `/dashboard/radar/combos`. Den læser kun de lokale `GET /api/radar/catalog` og `GET /api/combos/builder/options` endepunkter. Det udløser aldrig Radar-synkronisering, læser udbyderoplysninger eller skriver direkte til kombinationsdatabasen.

MCP klienter kan læse den samme lokale projektion med `omniroute_radar_catalog` (`read:radar`). De valgfri `provider`, `familyId` og `enabledOnly` filtre evalueres efter én lokal `GET /api/radar/catalog` læsning. Dens lukkede output inkluderer katalogmetadata plus provider/model, visningsnavn, `familyId`, kvote, kapaciteter, aktiveret tilstand, oprindelse og `disabledBy`; opsætning URLs, trin, forbindelser, e-mail-adresser, nøgler og henvisningsdata returneres aldrig. Dette værktøj er skrivebeskyttet og kalder aldrig `/api/radar/sync`. Når det cachelagrede feed går forud for det installerede katalog, er `meta.olderThanRelease` `true`, og værktøjet returnerer modeller fra det installerede katalog med lokale tilsidesættelser og gravsten anvendt.

### Herkomstmarkører

Hver flettet indgang har et `origin` felt, som UI gengiver som et badge:

- `"baseline"` — uberørt fra det statiske udgivelseskatalog.
- `"radar"` — et eller flere felter blev opdateret af feedet.
- `"local"` — operatøren har mindst én lokal tilsidesættelse på denne post (lokale tilsidesættelser vinder altid feedet pr. regel 1, uanset hvad feedet siger).

---

## Lokale grænseflader — aldrig en feed-proxy

De lokale Radar-rutefamilier nedenfor understøtter brugergrænsefladen under `src/app/api/radar/`:

| Rute                           | Metode | Formål                                                                                                                       |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Returnerer det samlede katalog (`getRadarCatalog()`) fra den lokale cache.                                                   |
| `/api/radar/sync`              | POST   | Udløser `syncRadar()` på serversiden og returnerer den resulterende status.                                                  |
| `/api/radar/settings`          | GET    | Returnerer `{ optIn, hasSupporterKey, supporterKeyMasked }` — aldrig den rå nøgle.                                           |
| `/api/radar/settings`          | POST   | Angiver tilmelding og/eller den (krypterede) supporternøgle.                                                                 |
| `/api/radar/referrals`         | GET    | Returnerer `{ fixed, campaigns, tier }` fra den lokale cache — se [Henvisningslinks](#referral-links-free-credits) nedenfor. |
| `/api/radar/offers`            | GET    | Returnerer aktive tilbud fra den verificerede lokale live-cache; returnerer aldrig supporternøglen.                          |
| `/api/radar/offers/sync`       | POST   | Udløser den serversidebaserede `syncRadarOffers()`-pipeline, som kun bruger live-nøglen.                                     |
| `/api/radar/intel`             | GET    | Returnerer verificeret lokal live-Intel samt en boolesk værdi for supporterstatus; aldrig en identitet eller nøgle.          |
| `/api/radar/intel/sync`        | POST   | Udløser den serversidebaserede `syncRadarIntel()`-pipeline, som kun bruger live-nøglen.                                      |
| `/api/radar/status`            | GET    | Returnerer skrivebeskyttet lokal indstillings-/cachestatus for katalog, henvisninger, tilbud og Intel uden hemmeligheder.    |
| `/api/radar/sync-all`          | POST   | Kører alle fire synkroniseringsmoduler på serversiden og returnerer en separat status for hvert feed.                        |
| `/api/radar/local-model-state` | GET    | Viser gemte tilsidesættelser og tombstones til kontrolelementer for redigering/gendannelse.                                  |
| `/api/radar/local-model-state` | PATCH  | Angiver eller rydder de validerede tilsidesættelsesfelter `displayName`/`enabled`.                                           |
| `/api/radar/local-model-state` | PUT    | Opretter eller fjerner en tombstone med `{ provider, modelId, tombstoned }`.                                                 |
| `/api/radar/local-model-state` | DELETE | Rydder redigerbare tilsidesættelsesfelter, mens en eventuel tombstone bevares.                                               |

**Ufravigelig regel: Disse ruter fungerer aldrig som proxy for feed-tjenesten.** Browseren kommunikerer udelukkende
med den lokale OmniRoute-server. De fire moduler, der kommunikerer med Radar-tjenesten, er
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (henvisninger) og
`src/lib/radar/offersSync.ts` (tilbud) samt `src/lib/radar/intelSync.ts` (Intel); alle kører
på serversiden, aldrig på klientsiden. Dette holder
feed-URL'en og eventuelle supporternøgler helt ude af klientvendt netværkstrafik.

Alle Radar-slutpunkter returnerer `404`, når `RADAR_ENABLED` er slået fra (se
[Flag](#flag-radar_enabled-default-off) ovenfor), og videresender rutefejlsvar gennem
`buildErrorBody()`/`sanitizeErrorMessage()` i henhold til den repository-dækkende regel om fejlsanering
(`docs/security/ERROR_SANITIZATION.md`).

### Godkendelse

Alle Radar-slutpunkter kræver godkendelse via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — en sessionscookie til dashboardet eller en API-nøgle med administrationsomfang,
den samme adgangskontrol, der beskytter resten af `/api/settings/*`. Kontrollen, der returnerer
`404`, når flaget er slået fra, kører altid **før** godkendelseskontrollen, så en installation med `RADAR_ENABLED`
slået fra forbliver byte-identisk (ingen godkendelsesprompt blot for at opdage, at grænsefladen ikke findes);
når flaget er slået til, modtager en ikke-godkendt anmodning `401` før læsning fra eller
skrivning til databasen. `GET /api/radar/settings` returnerer aldrig den rå supporternøgle uanset
godkendelsesstatus — kun den maskerede form og en boolesk `hasSupporterKey`-værdi.

---

## Supportertilbud

Tilbud bruger deres eget signerede artefakt, `GET /v1/offers/latest`, og deler aldrig katalog- eller
henvisningscachen. Serverendepunktet kræver en gyldig aktiv Bearer-nøgle for supportere; der er ingen
fallback til fællesskabet. `syncRadarOffers()` stopper derfor før netværkskaldet, når funktionsflaget er
slået fra, operatøren ikke har tilvalgt funktionen, eller der ikke er konfigureret en supporternøgle.

Efter en vellykket GET-anmodning verificerer klienten Ed25519-signaturen over de nøjagtige svarbytes,
validerer `RadarOffersFeedSchema`, kræver, at både den signerede body og
`x-omniroute-feed-tier`-headeren angiver `live`, håndhæver en strengt nyere punktsepareret version og
erstatter først derefter atomisk `radar_offers_cache` (migrering `144_radar_offers_cache.sql`). Den
samme grænse på 10 MB for header plus stream, som bruges af de andre feeds, gælder. Fejl ved
signatur, skema, niveau, genafspilning, størrelse, HTTP og netværk bevarer alle den senest
verificerede cache.

Den lukkede tilbudsstruktur understøtter tre sammenlignelige fordelstyper: procent i basispoint,
kredit i valutaens mindste enhed eller prøveperiodedage. Et partnertilbud skal indeholde en offentlig
baseline af samme type, og dets fordel skal være strengt større; officielle tilbud har ingen
partnerbaseline. URL'er skal bruge HTTPS og være uden legitimationsoplysninger. `getRadarOffers()`
genvaliderer defensivt den cachelagrede payload og filtrerer udløbne poster ved hver lokal læsning;
`/dashboard/radar/offers` filtrerer igen efter udløb før rendering, bruger portugisisk tekst, når den
er tilgængelig, med engelsk som fallback og markerer udtrykkeligt partnertilbud.

Browseren kalder kun lokale ruter: Den læser det maskerede øjebliksbillede af indstillingerne, anmoder
`POST /api/radar/offers/sync` om at opdatere på serversiden og læser derefter
`GET /api/radar/offers`. Uden en nøgle viser den de eksisterende links til bidragydere/support i
stedet for at forsøge en feedanmodning. Eksterne tilbudslinks åbnes i en ny fane med
`noopener noreferrer`. Intet `radar_offers`-MCP-værktøj udstilles i denne udgivelse.

---

## Radar Intel, supporterbadge og CLI

Intel er et signeret artefakt på `GET /v1/intel/latest`. Det lukkede `RadarIntelFeedSchema`
accepterer kun Radar-ejede ELO-rangeringer, som den private kurator har udledt af bekræftede
sammenligninger, samt faktuelle forskelle i katalogets alder/antal, der er udledt af signerede
katalogøjebliksbilleder. Metoden er fastlagt med en indledende rating på 1000 og K=32. En tom
rangering er gyldig, når ingen sammenligning er blevet bekræftet; klienten genererer aldrig selv en.

`syncRadarIntel()` anvender samme Bearer-godkendelse på serversiden, timeout på 30 sekunder,
streaminggrænse på 10 MiB, Ed25519-verifikation af de nøjagtige bytes, strikte skemavalidering, krav om
`live` i body/header, versionsgrænse og bevarelse af den senest gyldige cache som tilbud. Når et
verificeret aktivt øjebliksbillede er gemt, udleder klienten `radar:<sha256(supporter key)>`, gemmer
kun denne envejsidentitet og udsender den dedikerede `radar_supporter`-anerkendelseshændelse. Dets
`radar-supporter`-badge er idempotent og tildeler nul XP; det opdaterer aldrig ranglister eller
genbruger `token_share`. `/dashboard/radar/intel` renderer kun badget ud fra verificerede lokale
cachemetadata.

CLI'en tilbyder `omniroute radar status` og `omniroute radar sync`. Begge kommunikerer kun med det
lokale OmniRoute-API. `status` udfører en skrivebeskyttet `GET /api/radar/status`; `sync` sender én
`POST /api/radar/sync-all` og udskriver et resultat pr. feed. Ingen af kommandoerne læser, accepterer
eller udskriver supporternøglen, og ingen af dem kontakter Radar-tjenesten direkte.

---

## Henvisningslinks (gratis kreditter)

Henvisningslinks leveres fra et **selvstændigt, altid opdateret** feed —
`GET /v1/referrals/latest` — adskilt fra katalogfeedet. Dette er tilsigtet:
Katalogfeedet på community-niveauet er et øjebliksbillede, der kan være op til 30 dage
gammelt, så et henvisningslink udtrukket derfra var tidligere lige så langt bagefter
serverens faktiske liste over links (en nyligt tilføjet henvisning ville ikke nå en
gratis/community-bruger i op til en måned). Henvisningsfeedet fjerner denne forsinkelse
ved at synkronisere efter sin egen, langt kortere frekvens.

```ts
// Svarkroppen fra GET /v1/referrals/latest (Ed25519-signeret, samme fastgjorte nøgle som
// katalogfeedet):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisk: max(updatedAt) på tværs af
                                  // henvisningslinks, så to identiske anmodninger producerer
                                  // præcis de samme signerede bytes/den samme signatur
  referrals: {
    fixed: RadarReferral[],      // findes på ALLE niveauer, inklusive uden godkendelse/community
    campaigns: RadarReferral[],  // udfyldes kun for en gyldig aktiv (supporter) Bearer-
                                  // nøgle; anmodninger uden godkendelse/med udløbet nøgle får []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

I modsætning til katalogfeedet indeholder denne krop slet intet `tier`-felt — serveren
afgør for hver anmodning, hvad der skal inkluderes, baseret på `Authorization`-nøglen,
så svarheaderen `x-omniroute-feed-tier` er den ENESTE kilde til det leverede niveau
(`referralsSync.ts::syncRadarReferrals`); en manglende/ukendt header nedgraderes til
`"community"`, den mindst privilegerede antagelse. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validerer hele kroppen og genbruger det samme
`RadarReferralSchema` for hver henvisning, som eksporteres fra `feedSchema.ts`, så begge
feeds validerer individuelle henvisninger identisk. Hver `RadarReferral.url` skal være
`https://` — en `http://`-url får skemavalideringen til at mislykkes.

Det GAMLE katalogindlejrede `referrals`-felt i `RadarFeedSchema` (`feedSchema.ts`)
beholdes af hensyn til bagudkompatibilitet med katalogfeeds, der allerede er cachet,
men `getRadarReferrals()` læser det ikke længere — se [Accessor](#accessor) nedenfor.

### Synkronisering

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) er det ENESTE modul, der
tilgår netværket for henvisninger, og det afspejler kontrakten for `syncRadar()` præcist:
flag deaktiveret → `disabled`; fravalg → `opt_out`; downloader
`${RADAR_FEED_URL}/v1/referrals/latest` (samme forgreningstilsidesættelser via
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` som kataloget), verificerer Ed25519-signaturen over
de præcise svarbytes (`verifyFeedBytes`), validerer mod `RadarReferralsFeedSchema` og
cacher i tabellen `radar_referrals_cache` (migrering
`142_radar_referrals_cache.sql`) — en tabel, der er helt adskilt fra katalogets
`radar_feed_cache`. En grænse på 10 MB for svar og en nedre grænse for `generatedAt`
afviser et indgående feed, der er ældre end det cachede, hvilket beskytter mod
genafspilning af en ældre signeret artefakt. Et identisk tidsstempel accepteres:
Serveren giver med vilje community- og live-varianterne af henvisninger samme
deterministiske `generatedAt`, så den signerede nyttelast og det leverede niveau kan
ændres efter en ændring af supporter-nøglen, uden at det underliggende linksæt ændres.
Kaster aldrig en undtagelse — returnerer altid et statusobjekt; fejl indeholder aldrig
et stack trace i `reason`.

To udløsere holder henvisningscachen varm, begge uafhængigt af katalogets egen
24-timersfrekvens:

- **Synkronisering ved læsning** — `GET /api/radar/referrals` kalder selv
  `syncRadarReferrals()` direkte, når cachen mangler eller er ældre end
  `REFERRALS_STALE_MS` (1 time, `shouldSyncReferralsOnRead()`), før svaret leveres. Det
  er dette, der gør faste links "altid opdaterede" ved den næste indlæsning af
  dashboardet uden at vente på en baggrundstimer.
- **Sidesynkronisering via planlæggeren** — `radarSchedulerTick()` (`scheduler.ts`)
  evaluerer uafhængigt henvisningernes aktualitet på det samme timetick, der bruges til
  kataloget, og kalder `syncRadarReferrals()`, når det er tid. Dette kører, uanset om
  kataloget selv skulle opdateres ved det pågældende tick, og påvirker aldrig formen på
  `RadarTickResult` (kun en best effort-sideeffekt, der ignoreres ved fejl).

### Accessor

`src/lib/radar/index.ts` eksporterer to skrivebeskyttede accessors, der begge aldrig
kaster en undtagelse (samme defensive kontrakt som `getRadarCatalog()` — et deaktiveret
flag, manglende cache eller en beskadiget cachet nyttelast resulterer alle i den tomme
form i stedet for en fejl):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  som læser fra `radar_referrals_cache` (via `getRadarReferralsCache()`) og validerer
  gennem `RadarReferralsFeedSchema` — **ikke** katalogcachen.
- `getDefaultReferralFor(provider)` → den `fixed`-henvisning med `isDefault: true` for
  den pågældende udbyder eller `null`. Ser kun på `fixed` — en kampagne bruges aldrig
  som en udbyders "standardlink".

Den faktiske regel for, "hvilken henvisning der er standarden for en udbyder", findes i
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), en lille ren funktion **uden
DB-import** — den kan trygt importeres i en `"use client"`-komponent.
`getRadarReferrals`/`getDefaultReferralFor` (i `index.ts`) indlæser `@/lib/db/radar` og
forbliver derfor kun på serversiden; udbyderdashboardet importerer `referrals.ts`
direkte i stedet for `index.ts` (se nedenfor) for at undgå at inkludere
`better-sqlite3` i browserbundtet.

### `GET /api/radar/referrals`

Følger nøjagtig den samme gate-rækkefølge som alle andre Radar-ruter: `RADAR_ENABLED` slået fra →
`404` (kontrolleres først, byte-identisk inerti); ikke-godkendt → `401`; ellers
udløses en synkronisering ved læsning (se ovenfor), når dataene er forældede, og derefter `200` med
`{ fixed, campaigns, tier }` — `tier` kommer direkte fra cache-rækken (som muligvis netop er blevet
opdateret) og er udelukkende informativ (styrer UI'ets afdæmpede mersalgstekst nedenfor). Proxyer
aldrig feedserveren direkte — rutens egen kildekode indeholder intet `fetch(`-kald;
netværkstrafik forekommer kun inde i `syncRadarReferrals()`, efter samme princip om kun
at bruge den lokale cache som `/api/radar/catalog`.

### Dashboard-UI — fanen "Gratis kreditter" på `/dashboard/radar`

Genbruger den eksisterende Radar-side (`src/app/(dashboard)/dashboard/radar/page.tsx`) som en
anden fane i stedet for en ny rute — mindre routing-/i18n-overflade for en funktion, der er en
variation af data, som siden allerede henter. Efter tilmelding tilbyder fanelinjen
**Katalog** (eksisterende tabel) og **Gratis kreditter**:

- Faste links grupperes efter udbyder, og hvert link viser `requiredAction` (når den findes)
  samt en `target="_blank" rel="noopener noreferrer"`-knap til henvisnings-URL'en.
- Kampagner viser det samme samt `validUntil`, når den findes.
- Når `campaigns` er tom **og** det leverede niveau er `community`, viser UI'et en
  kort mersalgsnote ("tidsbegrænsede kampagner er en ekstra fordel for støtter") — dette
  skjuler eller begrænser **aldrig** listen over faste links, som forbliver fuldt udfyldt
  for alle niveauer. Mersalget er kun en afdæmpet meddelelse og aldrig en blokering.

### Henvisningslink på udbydernavnet (udbyder-dashboard)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
linkede allerede udbydernavnet til `providerInfo.website`, når den var angivet, med ét
fortilfælde for et indtægtsgenererende link: noten om Kimi-partnerlinket (Moonshot AI)
(`providers.kimiPartnerLinkNote`-i18n-nøglen). D28 genbruger præcis det samme diskrete
notemønster til Radars standardhenvisninger i stedet for at introducere en ny nøgle.

Løs kobling, helt bevidst:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  er en **ren** funktion — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — uden afhængighed af `@/lib/radar` eller `@/lib/db/*`. `providerPageUtils.ts` som
  helhed forbliver fri for disse imports (håndhævet af
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (en `"use client"`-komponent) er det eneste sted, der må
  hente Radar-data — via `fetch("/api/radar/referrals")`, samme lokale rutemønster,
  som selve Radar-dashboard-siden bruger — og den beregner standardhenvisningen
  på klientsiden med `findDefaultReferral()` fra den DB-frie `src/lib/radar/referrals.ts`.
- Når `RADAR_ENABLED` er slået fra, returnerer hentningen en 404, `referralUrl` forbliver
  `null`, og `resolveProviderHeaderLink()` returnerer det statiske `website` fra kataloget
  uændret — udbydersiden er byte-identisk med, hvordan den var, før denne funktion
  fandtes. Samme resultat, når der endnu ikke er nogen cache eller ingen
  standardhenvisning for den specifikke udbyder.
- Når en standardhenvisning er relevant, modtager `ProviderPageHeader` `isReferralLink`
  og viser den samme diskrete note/det samme værktøjstip som Kimi-partnerlinket (ved at
  genbruge nøglen `providers.kimiPartnerLinkNote`) — aldrig en ny, separat visuel
  behandling.

---

## Sådan hoster du selv et feed

En fork eller selvhoster, der ønsker fuld kontrol over kataloget, kan køre sin egen feedtjeneste
uden at ændre klientkoden:

1. Udbyd et `GET /v1/catalog/latest`-slutpunkt, der returnerer en JSON-body, som opfylder
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — på øverste niveau `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` og `totals`. Respekter `x-omniroute-radar-schema: 2`; en overgangskompatibel server
   bør som standard sende anmodninger uden denne header til en separat signeret v1-artefakt.
2. Signér de nøjagtige responsbytes med et Ed25519-nøglepar, og returnér base64-signaturen
   i responsheaderen `x-omniroute-feed-signature`.
3. Indstil `RADAR_FEED_URL` til den nye basis-URL og `RADAR_FEED_PUBKEY` til den tilsvarende
   offentlige nøgle (base64-DER SPKI eller PEM) — se
   [referencen til miljøvariabler](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Aktivér `RADAR_ENABLED`, og tilvælg via `POST /api/radar/settings`
   (`{ optIn: true }`).

Der kræves ingen andre kodeændringer — `verifyFeedBytes()` registrerer automatisk tilsidesættelsen
(`getFeedPublicKeys()` i `src/lib/radar/pinnedKeys.ts`), og versionssammenligning,
skemavalidering og flettereglerne anvendes på samme måde på et selvhostet
feed.

Henvisningslinks (se [Henvisningslinks (gratis kreditter)](#referral-links-free-credits)
ovenfor) er en separat, valgfri artefakt: En fork, der kun udbyder `/v1/catalog/latest`,
fungerer stadig fuldt ud — `syncRadarReferrals()` nedgraderer til `{ status: "error" }` ved en `404`
fra `/v1/referrals/latest`, og cachen forbliver blot tom, så
`GET /api/radar/referrals` fortsat returnerer `{ fixed: [], campaigns: [], tier: null }`
i stedet for at få resten af siden til at fejle. Hvis du også vil tilbyde henvisningslinks, skal du udbyde
`GET /v1/referrals/latest`, der opfylder `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`), og signere det med det samme Ed25519-nøglepar som
katalogfeedet.

Supportertilbud er endnu en valgfri artefakt. For at udbyde dem skal du implementere
`GET /v1/offers/latest` med det lukkede `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), kræve en aktiv rettighed, returnere
`x-omniroute-feed-tier: live` og signere de nøjagtige bytes med den samme nøgle. En fork, der udelader dette
slutpunkt, bevarer katalogets og henvisningernes adfærd uændret; opdatering af tilbud fejler uden at forårsage skade, og
den senest verificerede lokale tilbudscache forbliver tilgængelig.

Intel er valgfrit på samme måde. En selvhoster kan udbyde `GET /v1/intel/latest` ved hjælp af
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), kræve en aktiv rettighed, returnere
`x-omniroute-feed-tier: live` og signere de nøjagtige bytes med den delte Ed25519-nøgle. Hvis
slutpunktet udelades, forbliver katalog, henvisninger og tilbud uændrede; opdatering af Intel bevarer ethvert senest verificeret
lokalt snapshot.

---

## Relateret dokumentation

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — det
  fejlresponsmønster, som `/api/radar/*`-ruterne følger.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — reference til `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
