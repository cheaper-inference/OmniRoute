# Cost & Spend Tracking (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Hvordan OmniRoute estimerer, registrerer og rapporterer kostnaden for hver forespørsel — og hvorfor
tallet i kontrollpanelet er en **sporing av besparelser**, ikke en faktura.

Se også: [Brukerveiledning](./USER_GUIDE.md) · [Funksjonsgalleri](./FEATURES.md)

---

## Hva det er (og hva det ikke er)

OmniRoute tilordner en kostnad i USD per forespørsel til hver fullføring ved å multiplisere
antall token med prismodellens satser. Disse tallene driver kontrollpanelet **Kostnader**,
CLI-kommandoene `omniroute cost` / `omniroute usage`, CSV-/JSON-eksporter og budsjetter per API-nøkkel.

> **«Kostnaden» i kontrollpanelet er en sporing av besparelser, ikke en faktura.** OmniRoute belaster deg aldri
> — det ruter forespørslene dine til leverandører du allerede har koblet til (dine egne
> abonnementer, gratiskvoter og API-nøkler). En «total kostnad på $290» som utelukkende er opptjent med gratis
> modeller, betyr at du omtrent **ikke betalte $290** til et betalt API. Tallet er et _estimat_
> på hva den samme trafikken ville ha kostet til standard listepriser, slik at du kan se hvor
> bruken din er konsentrert, og hvor mye du sparer ved å rute til rimeligere/gratis leverandører.

Denne fremstillingen er angitt direkte i prosjektets [README](../../README.md) («'kostnaden'
i kontrollpanelet er en sporing av besparelser, ikke en faktura»).

Fordi tallet er et estimat:

- Det avhenger av pristabellen OmniRoute har for hver modell. En modell uten en prisoppføring
  bidrar med en kostnad på `0` (den vises som en «Eldre / gratis»-rad i utforskeren).
- Trafikk gjennom gratiskvoter og abonnementer får fortsatt en _estimert_ kostnad — dette er
  beløpet du sparer, ikke et beløp du skylder.

---

## Hvordan kostnadene beregnes

### Priskilden

Kostnadene kommer fra den sammenslåtte pristabellen i [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), i denne rekkefølgen (** høyest først** ):

1. **Bruker overstyrer** — priser satt i dashbordet eller via `PATCH /api/pricing` (navneområdet `pricing` ).
2. **models.dev synkronisering** — -priser hentet fra `https://models.dev/api.json` (navneområdet `models_dev_pricing` ).
3. **LiteLLM synkronisering** — priser hentet fra LiteLLM offentlige `model_prices_and_context_window.json` (navneområdet `pricing_synced` ).
4. **Hardkodede standarder** — priser sendes i [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

For samme provider/model overskriver verdier fra høyere prioriterte lag samsvarende felt i lavere lag; felt fraværende fra et øvre lag kan fortsatt komme fra et nedre lag. Rekkefølgen er fast selv når begge uavhengige synkroniseringsjobber kjører samtidig. `GET /api/pricing?includeSources=1` returnerer `pricing` og `sourceMap`, hvis etiketter per modell (`user`, `modelsDev`, `litellm`, `default`) identifiserer det høyest prioriterte laget som inneholder den modellen.

**LiteLLM synkronisering** er opt-in, deaktivert som standard. Dens miljøvariabler (se [`.env.example`](../../.env.example) ) er:

| Env var                 | Misligholde | Hensikt                                                                         |
| ----------------------- | ----------- | ------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`     | Aktiver bakgrunnssynkronisering av LiteLLM priser.                              |
| `PRICING_SYNC_INTERVAL` | `86400`     | Synkroniseringsintervall i sekunder (daglig).                                   |
| `PRICING_SYNC_SOURCES`  | `litellm`   | Kildevalg kun for denne synkroniseringen; for øyeblikket støttes kun `litellm`. |

**models.dev synkronisering** er atskilt fra LiteLLM synkroniseringen og er også deaktivert som standard. Aktiver den i Innstillinger (models.dev sync) eller bruk disse variablene:

| Env var                    | Misligholde   | Hensikt                                                                                                                             |
| -------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(uaktivert)_ | Unset følger innstillingsbryteren; `1/true/on/yes` tvinger på og `0/false/off/no` tvinger av (selv om Innstillinger aktiverer det). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`       | Standard models.dev synkroniseringsintervall i sekunder (daglig).                                                                   |

`PRICING_SYNC_SOURCES` gjør det** ikke** aktivere models.dev; den kontrollerer bare LiteLLM synkroniseringen. Sletting av en brukeroverstyring sletter ikke noen av de synkroniserte navneområdene. neste tilgjengelige prislag trer i kraft. For en upriset modell, sjekk både synkroniseringsinnstillinger og `sourceMap` før du legger til en manuell overstyring.

### Kostnadsformelen

Kostnaden beregnes per forespørsel fra tokenantall og per million tokenpriser i [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`):

- **Skriv inn tokens** (minus cache lesing og cache-oppretting tokens) × `input` rate.
- **Bufferleste tokens** × `cached` rate (faller tilbake til inngangshastigheten).
- **Tokener for å lage cache** × `cache_creation` rate (faller tilbake til inngangshastigheten).
- **Output tokens** × `output` rate.
- **Resonneringstegn** × `reasoning` rate (faller tilbake til utgangshastigheten).

Alle priser tolkes som USD per 1 000 000 tokens. En Codex "rask"/"prioritet" eller "flex" tjenestenivå bruker en kostnadsmultiplikator (`getCodexFastCostMultiplier`) —, f.eks. flex faktureres med en 50 % symbolrabatt, dukket opp som** flex besparelser** i dashbordet.

Modellnavn normaliseres først (leverandørbaneprefikser som `openai/` eller `accounts/fireworks/models/` fjernes) slik at historiske rader fortsatt samsvarer med en pris.

### Hvordan forbruk registreres

- Kostnaden per forespørsel beregnes etter responsen og registreres brann-og-glem, slik at den aldri legger ventetid til klienten. Forbruk av delt kvote er planlagt på neste event-loop-merke via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- API-nøkkelforbruk bufres og tømmes i batcher av [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (standard 60-talls skylleintervall, 1000 inngangsbuffer). Kan justeres via:

  | Env var                             | Misligholde | Hensikt                             |
  | ----------------------------------- | ----------- | ----------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`     | Skylleintervall i millisekunder.    |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`      | Maks bufrede oppføringer før flush. |

Dashbordets kostnadstall er** ikke** leses fra et lagret per rad dollarbeløp — de beregnes på nytt fra tokenantall og gjeldende pristabell hver gang analyseendepunktet kjører. Det betyr at korrigering av en feil pris (og re-synkronisering) oppdaterer historiske kostnadsestimater med tilbakevirkende kraft.

---

## Kontrollpanel: Kostnader-siden

**Kostnader**-siden ligger på `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Hovedvisningen er fanen **Kostnadsoversikt**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
som laster inn alt fra `GET /api/usage/analytics`.

Dette vises:

- **Kostnadsfliser** — estimert forbruk for _I dag (1d)_, _7d_, _30d_ og den valgte
  perioden. Periodevelger: `7d`, `30d`, `90d`, `all`.
- **Hovedmålinger** — forespørsler i perioden, aktive leverandører, aktive modeller og
  gjennomsnittlig kostnad per forespørsel.
- **Kostnadsutforsker** — en sorterbar og filtrerbar tabell gruppert etter **leverandør**,
  **modell**, **API-nøkkel**, **konto** eller **tjenestenivå**, med kostnad, forespørsler,
  tokener, gjennomsnittlig kostnad per forespørsel og prosentandel av totalen.
- **Tokenbruk** — totalt antall tokener / inndatatokener / utdatatokener og forholdet
  mellom inndata og utdata.
- **Rutingseffektivitet** — antall reserveløsninger, reservefrekvens og dekning for
  forespurte modeller.
- **Månedsprognose** — beregner forventet forbruk ved månedsslutt basert på det nylige
  daglige gjennomsnittet.
- **Periodesammenligning** — prosentvis endring mellom første og andre halvdel av perioden.
- **Diagrammer** — daglig kostnadsutvikling, leverandørandel (sektordiagram), viktigste
  leverandører, viktigste modeller, kostnad per API-nøkkel, kostnad per konto, ukentlig
  bruksmønster og et aktivitetsvarmekart.
- **Eksport** — last ned gjeldende periode som **CSV** eller **JSON** (knappene vises
  når det finnes kostnadsdata som ikke er null).

Når det ikke finnes prissatt trafikk, vises radene med etiketten «Eldre / Gratis» i stedet for `$0`,
i tråd med modellen for sporing av besparelser.

### Relaterte undersider for Kostnader

Kostnader-området inneholder også (alle under `/dashboard/costs/`):

- **Prissetting** (`/dashboard/costs/pricing`) — vis og overstyr priser per modell (viser
  den delte Prissetting-fanen).
- **Budsjett** (`/dashboard/costs/budget`) — angi forbruksgrenser per omfang (viser den
  delte Budsjett-fanen).
- **Kvotedeling** (`/dashboard/costs/quota-share`) — delte kvotepuljer og visninger av
  forbruksrate.

---

## API -endepunkter

Alle disse krever administrasjonsgodkjenning (loopback/JWT, via `requireManagementAuth`) med mindre det er angitt.

### Bruks- og kostnadsanalyse

| Metode | Endepunkt                | Hensikt                                                                                                                                                           |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Full cost/usage -analyse: sammendrag, daglig trend, etter provider/model/API key/account/tier. Spørring: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Per-leverandør kvoteutnyttelse over tid. Spørring: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                   |
| `GET`  | `/api/usage/history`     | Rå brukshistorikk rader.                                                                                                                                          |
| `GET`  | `/api/usage/call-logs`   | Anropslogger per forespørsel (modell, tokens, kostnad, ventetid, status).                                                                                         |
| `GET`  | `/api/usage/quota`       | Leverandørkvotestatus.                                                                                                                                            |
| `GET`  | `/api/usage/proxy-logs`  | Logger for proxy-forespørsel.                                                                                                                                     |

### Budsjetter

| Metode | Endepunkt                | Hensikt                                                                                        |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Kostnadssammendrag + -budsjettsjekk for én API nøkkel (`apiKeyId` -spørringsparameter kreves). |
| `POST` | `/api/usage/budget`      | Angi daily/weekly/monthly USD grenser + advarselsterskel for en API nøkkel.                    |
| `GET`  | `/api/usage/budget/bulk` | Massebudsjettsammendrag på tvers av API nøkler.                                                |

> Budsjettet API er scoped pr**API nøkkel** (`apiKeyId`). Grenser returnert av `GET /api/usage/budget` inkluderer `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`, a `warningThreshold`, og de løpende summene (`totalCostToday`, `totalCostMonth`, ...).

### Prissetting

| Metode   | Endepunkt               | Hensikt                                                                                                                                       |
| -------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Sammenslått firelagsprising (bruker, models.dev, LiteLLM, standardinnstillinger). `?includeSources=1` returnerer `pricing` + `sourceMap`.     |
| `PATCH`  | `/api/pricing`          | Overstyr priser for `{ provider: { model: { input, output, cached, … } } }`.                                                                  |
| `DELETE` | `/api/pricing`          | Fjern brukerprisoverstyringer (valgfritt med `?provider=&model=`); synkroniserte priser eller innebygde standardverdier forblir som reserver. |
| `GET`    | `/api/pricing/defaults` | Vis standard reservefrekvenser per-1M.                                                                                                        |
| `GET`    | `/api/pricing/models`   | Pris tastet etter modell.                                                                                                                     |
| `POST`   | `/api/pricing/sync`     | Utløs en manuell synkronisering fra eksterne kilder (LiteLLM).                                                                                |
| `GET`    | `/api/pricing/sync`     | Gjeldende synkroniseringsstatus.                                                                                                              |
| `DELETE` | `/api/pricing/sync`     | Slett bare LiteLLM-synkroniserte priser (`pricing_synced`); models.dev-data er separate.                                                      |

### Andre kostnadsrelevante endepunkter

| Metode | Endepunkt                     | Hensikt                                                                           |
| ------ | ----------------------------- | --------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Token-totaler for gratismodeller, brukt denne måneden og gjenværende gratiskvote. |
| `GET`  | `/api/quota/pools/[id]/usage` | Bruk for en delt kvotepool.                                                       |

---

## CLI

OmniRoutes CLI tilbyr kommandoer for kostnader, bruk og priser (registrert i
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

En kostnadsrapport aggregert fra `/api/usage/analytics`.

```bash
omniroute cost                          # siste 30 dager, gruppert etter leverandør
omniroute cost --period 7d              # siste 7 dager
omniroute cost --group-by model         # grupper etter provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Kolonner: gruppe, forespørsler, tokens inn/ut, kostnad (USD) og prosentandel av totalen. En linje med totalsummen
skrives ut til slutt (utelates med `--quiet` eller `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # kostnadssammendrag per leverandør
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budsjetter
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` leser `GET /api/pricing/defaults`. For å redigere prisene for individuelle modeller
> i stedet bruker du instrumentbordsiden **Priser** eller `PATCH /api/pricing`.

---

## Feilsøking

- **Alle kostnader vises som $0 / «Legacy / Free».** Modellene som brukes, har ingen prisoppføring.
  Aktiver ekstern synkronisering (`PRICING_SYNC_ENABLED=true`) og kjør `omniroute pricing sync`, eller
  angi priser manuelt via siden Priser / `PATCH /api/pricing`.
- **En historisk modell har feil pris.** Korriger prisen (overstyr eller synkroniser på nytt) – kostnaden
  beregnes på nytt fra antall tokens hver gang analysedataene leses, slik at estimatene oppdateres med tilbakevirkende kraft.
- **Forbruket ligger etter sanntid.** Forbruk per nøkkel behandles satsvis. Reduser
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` hvis du trenger mer oppdaterte tall.

---

For å se hvordan dette passer inn i det overordnede instrumentbordet, kan du lese [brukerveiledningen](./USER_GUIDE.md) og
[funksjonsgalleriet](./FEATURES.md).
