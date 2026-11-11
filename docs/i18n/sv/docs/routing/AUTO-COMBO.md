# OmniRoute Auto-Combo Engine (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **För användare**: Letar du efter en snabbstart? Se [användarguiden för Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) för enkla förklaringar och exempel.

> Självhanterande modellkedjor med adaptiv poängsättning + automatisk dirigering utan konfiguration

## Automatisk routing utan konfiguration (`auto/`-prefix)

> **NYTT:** Ingen kombination behöver skapas. Använd prefixet `auto/` direkt i valfri klient.

### Snabba exempel

| Modell-ID      | Variant  | Beteende                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------- |
| `auto`         | standard | Alla anslutna leverantörer, LKGP-strategi, balanserade vikter                 |
| `auto/coding`  | coding   | Kvalitetsprioriterade vikter, lämpligt för kodgenerering                      |
| `auto/fast`    | fast     | Viktat val med låg latens                                                     |
| `auto/cheap`   | cheap    | Kostnadsoptimerad routing (lägsta kostnad först)                              |
| `auto/offline` | offline  | Föredrar leverantörer med högst tillgänglig kvot                              |
| `auto/smart`   | smart    | Kvalitet först + högre utforskningsgrad (10 %) för bättre modellidentifiering |
| `auto/lkgp`    | lkgp     | Explicit LKGP (samma som standardvärdet `auto`)                               |
| `auto/chaos`   | chaos    | Parallell distribution, en modell per leverantör (inte felinjektion)          |

### Sammansättning av kategori × nivå (`auto/<category>:<tier>`)

Suffix i OpenRouter-stil separerar **vilken typ av rutt** (kategori) från **hur den ska optimeras** (nivå), så att du kan kombinera dem fritt (#4235 fas B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorier** (filtrerar kandidatpoolen efter kapacitet): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` behåller modeller med stöd för bilddata; `reasoning` behåller modeller för resonemang/tänkande.
- **Nivåer** (väljer poängvikter/poolfilter): `fast` (snabb leverans) · `cheap` (alias `floor`, kostnadsbesparande) · `reliable` (kretsbrytarhälsa + latensstabilitet) · `free` / `pro` (filtrerar poolen efter modellnivå via `classifyTier` — kostnadsfri nivå jämfört med premiumnivå).

| Exempel                | Matchas mot                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `auto/coding:fast`     | kodningspool, vikter för låg latens                              |
| `auto/coding:cheap`    | kodningspool, kostnadsoptimerad (alias `auto/coding:floor`)      |
| `auto/reasoning:pro`   | endast modeller för resonemang/tänkande, premiumnivå             |
| `auto/vision`          | modeller med stöd för bilddata (ingen nivå → balanserade vikter) |
| `auto/multimodal:free` | modeller med multimodalt stöd, endast kostnadsfri nivå           |

Alla giltiga `auto/<category>[:<tier>]` matchas vid behov; en utvald delmängd annonseras i `/v1/models` och på kontrollpanelen (`AUTO_SUFFIX_VARIANTS` i `open-sse/services/autoCombo/builtinCatalog.ts`). Filtreringen är **fail-open** — om ett villkor inte matchar några anslutna modeller används hela poolen, så att routingen aldrig slutar fungera. Kärnpoängsättaren (`combo.ts`) är oförändrad; kategori-/nivåfiltret tillämpas i `buildAutoCandidates`.

> **Livebaserad modellinformation:** automatisk routings lämplighetsbedömning baseras på aktuella **Arena ELO**-rankningar + nivådata från **models.dev** när flaggan `ARENA_ELO_SYNC_ENABLED` är aktiverad (annars används den statiska lämplighetskartan som reserv).

**Så här använder du funktionen:**

```bash
# Valfri IDE eller valfritt CLI-verktyg som stöder OpenAI-formatet
Bas-URL: http://localhost:20128/v1
API-nyckel:  <din-slutpunktsnyckel>

# Ange modellen så här i din kod/konfiguration:
model: "auto"                 # balanserat standardvärde
model: "auto/coding"          # bäst för kodningsuppgifter
model: "auto/fast"            # snabbast tillgängliga
model: "auto/cheap"           # billigast per token
```

**Detta händer:**

1. OmniRoute identifierar prefixet `auto/` i `src/sse/handlers/chat.ts`
2. Hämtar alla **aktiva leverantörsanslutningar** från databasen
3. Filtrerar fram de som har giltiga autentiseringsuppgifter (API-nyckel eller OAuth-token)
4. Fastställer modellen per anslutning (`connection.defaultModel` eller leverantörens första modell)
5. Skapar en **virtuell kombination** i minnet (lagras inte i databasen)
6. Utför routing med den valda variantens viktprofil + LKGP-strategi

**Viktiga egenskaper:**

- ✅ **Alltid aktiv:** Ingen växling, ingen kombination behöver skapas och ingen konfiguration krävs
- ✅ **Dynamisk:** Återspeglar automatiskt de leverantörer som för närvarande är anslutna
- ✅ **Sessionsbeständighet:** LKGP säkerställer att den senast framgångsrika leverantören prioriteras
- ✅ **Stöd för flera konton:** Varje leverantörsanslutning blir en separat kandidat
- ✅ **Inga databasskrivningar:** Den virtuella kombinationen finns endast under begäran, utan beständighetskostnad

### Kandidatkontroll per nyckel (#7819, nivå 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = suffixet efter `auto/`, eller
det literala värdet `auto` för baskanalen) är en **skrivskyddad** slutpunkt som listar
den aktuella kandidatpoolen för en `auto/*`-kanal, kompletterad med aktuell nåbarhet, genom
att återanvända befintliga resiliensavläsningar (aldrig rå `state` från kretsbrytaren):

- leverantörens kretsbrytare — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- anslutningens nedkylningsperiod — `rateLimitedUntil` / `testStatus` på den matchade
  `provider_connections`-raden
- modellspärr — `isModelLocked(provider, connectionId, model)`

Varje kandidat innehåller även den här API-nyckelns `excluded`-flagga. Undantag lagras
per API-nyckel (`auto_candidate_overrides`-tabellen, migrering `128`) — OmniRoute är
en klientinstans utan någon `users`-tabell, så `apiKeyId` är den närmaste verkliga identiteten
per anropare — och tillämpas vid kandidatpoolens kontrollpunkt i
`open-sse/services/autoCombo/virtualFactory.ts` via den rena, enhetstestade
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtret är **fail-open**: ett ej angivet apiKeyId/channel eller ett misslyckat databasuppslag
lämnar poolen ofiltrerad, så en operatör utan konfigurerade undantag får routing
som är identisk byte för byte med beteendet före den här funktionen.

**Skjuts upp till ett uppföljningsärende:** vikter per kandidat + explicit ordning (nivå 3
— integreras i de befintliga viktade/prioritetsbaserade strategiflödena) samt låsning till en specifik
`combo.ts`-strategi per `auto/*`-kanal (nivå 4). Se planen för #7819 för den öppna
frågan om åsidosättningar ska förbli per API-nyckel eller bli globala med tanke på
modellen med en enda klientorganisation.

**Bakom kulisserna:**

```txt
Begäran: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts identifierar prefixet
   ↓
createVirtualAutoCombo('coding') → candidatePool från aktiva anslutningar
   ↓
handleComboChat (samma motor som för beständiga kombinationer)
   ↓
Automatisk poängsättning väljer bästa leverantör/modell per begäran
```

**Implementationsfiler:**

| Fil                                                       | Syfte                                       |
| --------------------------------------------------------- | ------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefixtolk (`parseAutoPrefix`)              |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Skapar virtuella `AutoComboConfig`-objekt   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testkrok för att mocka leverantörsregistret |
| `src/sse/handlers/chat.ts`                                | Integrering: genväg för automatiskt prefix  |
| `src/shared/constants/providers.ts`                       | Systemposten `SYSTEM_PROVIDERS.auto`        |

## Kontoinställningar för sparade automatiska kombinationer

Den intelligenta automatiska editorn erbjuder ett tillval** Kontoinställningar** avsnitt. Varje anslutning kan vara Preferred, Normal (standard), Reservera eller Excluded. Flera anslutningar kan dela en nivå. Auto väljer inom den första kvalificerade nivån och behåller sitt scoring/router beteende där; misslyckade försök faller igenom till de återstående konkreta kontona, föredragna före normala före reserv. Undantagna anslutningar används aldrig av denna kombination.

Inställningen lagras som `config.accountPreferences`, knappad av anslutningen ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

En utelämnad eller tom karta behåller befintlig rutt. Inställningar aktiverar inte inaktiverade anslutningar, beviljar inte API-nyckelåtkomst, återställer inte kvotblockerade kandidater eller kringgår budgetkontroller. Varje försök är begränsat till dess konkreta anslutning, så reservkonto kan inte hoppa nivåer bakom den kombinerade routern. Befintlig sessionsaffinitet kan behålla ett kvalificerat konto; exkludera kontot bundet till en inbyggd sväng stoppar den svängen istället för att tyst byta konto.

Konfigurerade inställningar använder den kontomedvetna automatiska sökvägen: obunden kontextcache, smart-pipeline, kaos och skugggenvägar skickas inte. Spekulativ säkring är inaktiverad för dessa förfrågningar så reservkonton kan inte tävla mot föredragna. Andra kombinationsstrategier tolkar inte denna inställning. Om du ändrar en kombination från Auto behåller de sparade inställningarna för en senare byte tillbaka.

## Combo-namn som matchar ett verkligt modell-id

En combo vars `name` är identiskt med ett fristående modell-id (t.ex. en combo med namnet
`gpt-5.5`) är ett **avsiktligt mönster som stöds**, inte ett fel: det är
mekanismen för reservleverantörer per modell-id som dokumenteras i
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Eftersom combo-
matchning kontrolleras före matchning av fristående modell-id
(`getComboForModel()` i `src/sse/services/model.ts`) dirigeras en begäran för det fristående
id:t `gpt-5.5` genom combons mål (t.ex.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) i stället för direkt till
en enda leverantör — detta återanvänder prioriteringen combo före omskrivning som skapades för
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) och
regressionstestas av `tests/unit/responses-combo-resolution-3227.test.ts` och
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Att skapa eller byta namn på en combo så att dess namn överskuggar ett verkligt modell-id
**avvisas aldrig** — det skulle bryta detta dokumenterade arbetsflöde. I stället
(#8530) lägger `POST /api/combos` och `PUT /api/combos/[id]` till ett icke-blockerande
`warning`-fält i svaret när det (nya) namnet kolliderar med ett verkligt
modell-id:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Vid uppstart loggar `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) även en enradsvarning med `[STARTUP]` som
räknar upp varje befintlig combo som överskuggar ett modell-id, så att operatörer som
råkar ut för detta av misstag (snarare än avsiktligt, enligt #6940) får en indikation.
Hjälpfunktionen för identifiering finns i `src/lib/combos/modelNameCollision.ts`.

## Anropa en anpassad combo från en klient

Beständiga combos (Inställningar → Combos) används endast när klienten skickar combons **exakta namn** i fältet `model` — det finns ingen ungefärlig eller partiell matchning av combo-namnet och inget `auto/`-prefix används. Matchningsordning (`getComboForModel()` i `src/sse/services/model.ts`):

1. exakt matchning av combo-namn (`model: "my-combo"`),
2. prefixet `combo/<name>` (`model: "combo/my-combo"`),
3. glob-mappningar från modell till combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Två vanliga fallgropar:

- **`auto` använder inte dina combos.** `auto`/`auto/*` bygger sin egen kandidatpool utan konfiguration och använder endast beständiga combos om en combo bokstavligen heter `auto` (rekommenderas inte). För att dirigera genom en combo ska du skicka dess exakta namn — inte `auto`.
- **`openrouter/auto` är en verklig betald OpenRouter-produkt** ("Auto Best Available"), inte ett OmniRoute-alias. Det är den enda statiska modellposten i OpenRouter-registret (`open-sse/config/providers/registry/openrouter/index.ts`) och faktureras separat. Använd Inställningar → Dirigering → Dölj betalda modeller för att utesluta den från `auto`-pooler.

Se [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) och [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) för den ursprungliga förvirring som detta dokumenterar.

## Hur det fungerar (beständiga automatiska kombinationer)

Auto-Combo Engine väljer dynamiskt den bästa provider/model för varje begäran med hjälp av en **16-faktors poängfunktion** (definierad i `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Standardvikterna summerar till `1.0`; anpassade vikter åternormaliseras av `normalizeScoringWeights()`. Två av de sexton — `cacheAffinity` och `resetWindowAffinity` — har en standardvikt på `0`; `reliability` bär `0` i `DEFAULT_WEIGHTS` men `0.03` i generiska paket och `0.04` i `reliability-first`, och `quality` bär `0.02` i paket (`0.03` i `quality-first`): de beräknas fortfarande för varje kandidat, och `cacheAffinity` portar prompt-cache-deduplicering utanför poängen, så noll-default-röstningsfaktorerna gör det helt enkelt inte som standard.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Källa: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (återskapa via `npm run docs:render-diagrams`). Filnamnet är historiskt; källan och det renderade diagrammet visar alla 16 faktorer som deklareras i `DEFAULT_WEIGHTS`.

| Faktor                | Standardvikt | Beskrivning                                                                                                                                                                                                          |
| :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429       | Återstående utrymme för kvot/prisgräns [0..1]                                                                                                                                                                        |
| `health`              | 0.1605       | Hälsoresultat från strömbrytare (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                             |
| `costInv`             | 0.1429       | Omvänd **blandad** kostnad (60 % input + 40 % output token pris, normaliserat) — billigare = högre poäng                                                                                                             |
| `latencyInv`          | 0.1143       | Omvänd p95-latens normaliserad för att slå samman — snabbare = högre poäng                                                                                                                                           |
| `taskFit`             | 0.0762       | Aktivitetstyp (kodning, granskning, planering, analys, felsökning, dokument)                                                                                                                                         |
| `stability`           | 0.0476       | Variansbaserad stabilitet från latensstandardavvikelse — en kandidat vars svarstid svänger får lägre poäng                                                                                                           |
| `tierPriority`        | 0.0476       | Kontonivåprioritet — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Gratis = 0.0                                                                                                                                          |
| `tierAffinity`        | 0.0476       | Samhörighet mellan kandidatens nivå och den manifest-rekommenderade nivån                                                                                                                                            |
| `specificityMatch`    | 0.0476       | Matchning mellan begäransspecificitet (uppenbart tips) och modellnivå                                                                                                                                                |
| `contextAffinity`     | 0.0476       | Affinitet mellan begärans kontextfönsterbehov och modellens kontextfönster                                                                                                                                           |
| `sessionAvailability` | 0.0476       | OAuth sessionstillgänglighet för kandidatanslutningen för denna session (`getOAuthSessionAvailability()`; icke-OAuth-anslutningar poäng 1,0)                                                                         |
| `connectionDensity`   | 0.0476       | Sprider belastningen över anslutningar från samma leverantör (anti-koncentration)                                                                                                                                    |
| `cacheAffinity`       | 0.00         | Rendezvous-hashöverensstämmelse med den anslutning som troligast redan innehåller den här begärans prefix i promptcachen (`open-sse/services/combo/promptCacheAffinity.ts`); inaktiverad som standard (#8008)        |
| `resetWindowAffinity` | 0.00         | Bias mot anslutningar vars kvotåterställningsfönster är gynnsamt (inaktiverat som standard)                                                                                                                          |
| `quality`             | 0.03         | Återkopplingsdriven utgångskvalitetssignal från routinghändelsekvalitetsspåraren; kandidater utan observationer får en neutral 0,5                                                                                   |
| `reliability`         | 0.00         | Observerad framgångsandel, `1 - failureRate`, från 24 timmars användningshistorik bakom ett golv med tio exempel (i övrigt realtidsstatistik); kandidater utan observationer läses som 1.0. Inaktiverad som standard |

`quality` spåraren i minnet (`open-sse/services/routing/quality.ts`) är tom efter en kall omstart, så varje kandidat får en neutral `0.5` tills de första observationerna landar.

> **Oläsbar kvot (#15347).** När en leverantör har en kvothämtare men den returnerar inget läsbart (misslyckad hämtning, saknade autentiseringsuppgifter, användning av endast meddelande eller en felaktig ögonblicksbild utan tolkbar `windows` och ingen finit `percentUsed`, inklusive `percentUsed: null`), får kandidaten `0` på `quota` axeln och dess slutliga poäng multipliceras med `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` -mjukt (0,5Q, `autoStrategy.ts`, G, Mjuk). som anslutningsstatusstraff. En misslyckad användningsavläsning är bevis på telemetrin, inte leverantören, så den rankas strikt under alla verkliga avläsningar, inklusive en bekräftad 100 %-used, men den blockeras aldrig eller vräkts. En leverantör utan tak rapporterar `unlimited: true` och får poäng som full kvot; en leverantör utan registrerad kvothämtare har ingen telemetrikälla alls och behåller standardvärdet `100`.

**Belopp:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` som deklareras i `DEFAULT_WEIGHTS`; användarkonfigurerade vikter åternormaliseras till en fördelning av `normalizeScoringWeights()` innan poängsättning.

## Lägespaket

6 fördefinierade viktprofiler i `open-sse/services/autoCombo/modePacks.ts`. Varje paket ersätter standardvikterna helt för att styra valet mot ett visst mål. Varje paket summerar redan till `1.0` (`0.9999` när det visas med fyra decimaler), så `normalizeScoringWeights()` har inget meningsfullt att korrigera när ett paket är aktivt — värdena nedan är, med avrundning, de som poängsättaren använder.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Anmärkningar:

- **Paketen innehåller `quality` och `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) och ersätter viktmappningen i sin helhet (`weights = pack`, inte en sammanslagning). `DEFAULT_WEIGHTS` innehåller `quality 0.03 / reliability 0`; om `balanced`/`default` väljs behålls dessa standardvärden, medan ett valt paket använder paketets värden ovan. För en kall pool (inga observationer ännu, alltså `quality 0.5` och `reliability 1`) lägger dessa två faktorer till `+0.04` med ett generiskt paket (`0.03 + 0.01`), `+0.045` med `quality-first` och `+0.05` med `reliability-first`.
- `tierAffinity`, `specificityMatch` och `resetWindowAffinity` är uttryckligen `0` i varje paket.
- En snabb överblick över vad varje paket betonar:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (anslutningar med låg latens och god hälsa)
  - **cost-saver** → costInv 0.3324 (de billigaste token vinner)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, det högsta värdet bland alla paket (bästa modellen för uppgiften, konsekvent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximalt utrymme oavsett hastighet/kostnad)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, det högsta värdet bland alla paket (minst antal överraskningar)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (viktpaketet som `auto/chaos` tilldelar sina panelmedlemmar; den parallella fan-out-processen läser inte dessa vikter, och detta är inte en profil för felinjicering, se [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Kontroller per begäran (headers) — #6023 / #6024 / #6025 / #3470

En `auto`-kombination kan styras **per begäran** via tre headers, utan att ändra kombinationens
lagrade konfiguration. Dessa gäller endast för strategin `auto` och endast för den begäran
som innehåller dem; kombinationens sparade `modePack`/`budgetCap`/`budgetFallback` används
när headern saknas.

| Rubrik                        | Accepterar                                                                                                                                                                                           | Effekt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | ett förinställt alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) eller ett rått paketnamn (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Åsidosätter viktningen för poängberäkningen för denna begäran. `balanced`/`default` framtvingar standardviktningen (inget paket). Okända värden ignoreras (konfigurationen bevaras).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | ett positivt tal (maximalt antal USD per begäran)                                                                                                                                                    | Fast kostnadstak: kandidater vars uppskattade kostnad överstiger det filtreras bort före valet. Vad som händer när **alla** kandidater överstiger det styrs av `X-OmniRoute-Budget-Fallback` nedan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standard, alias: `cheapest-viable`, `soft`) eller `strict` (alias: `block`, `hard`)                                                                                                      | `cheapest`: återgår till den totalt sett billigaste kandidaten även om den fortfarande överstiger taket (äldre beteende). `strict`: vägrar att göra ett val – begäran avbryts omedelbart med `HTTP 402` i stället för att kostnadsgränsen överskrids utan meddelande. Okända värden ignoreras.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Effort`          | `auto` (andra värden är reserverade)                                                                                                                                                                 | Adaptiv beräkningsbudget: när begäran **inte** innehåller något resonemangsfält i någon form (`reasoning_effort`, `reasoning`, `thinking`) omvandlar gatewayen `auto` till `low`/`medium`/`high` utifrån deterministiska signaler från begärans struktur (längden på det senaste användarmeddelandet, kontextstorleken fram till och med det senaste användarmeddelandet, tidigare verktygsresultat, verktygsslingans djup). Signalerna är begränsade till den aktuella turen — allt efter det senaste användarmeddelandet ignoreras — så varje begäran i en verktygsslinga får samma nivå (tillståndslös låsning per tur, inget sessionstillstånd och ingen eskalering mitt i slingan som skulle bryta prefixen i den uppströms promptcachen). Ett explicit resonemangsfält från klienten har alltid företräde. Begränsat till begäranden vars uppströmsdirigering använder formatet OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` är ett fält i OpenAI-format, så headern har ingen effekt på en begäran riktad till Claude eller Gemini (se `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Tvinga fram den snabbaste profilen, begränsa denna begäran till 0,05 USD och blockera helt i stället för att överskrida budgeten
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Upplösningen är en ren funktion (`open-sse/services/autoCombo/requestControls.ts`);
de upplösta värdena matas in i motorns befintliga indata `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. En kombinations lagrade `config.budgetFallback` ("strict" |
"cheapest") anger den beständiga policyn; headern åsidosätter den för en enskild begäran.

## Alla routingstrategier

OmniRoute:s kombomotor stöder **20 routingstrategier** (deklareras i `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Själva Auto Combo-motorn är exponerad under `auto` -strategin; de andra är tillgängliga för beständiga kombinationer.

| Strategi            | Beskrivning                                                                                                                                                                             |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Förstamålsordnad lista med explicit prioritet                                                                                                                                           |
| `weighted`          | Viktas slumpmässigt efter målvikt                                                                                                                                                       |
| `round-robin`       | Gå igenom målen i ordning (batchade; se nedan)                                                                                                                                          |
| `context-relay`     | Överlämna sammanhang över mål (långa konversationer)                                                                                                                                    |
| `fill-first`        | Fyll varje måls kvot innan du går vidare till nästa                                                                                                                                     |
| `p2c`               | Power-of-2-choices slumpmässig lastbalansering                                                                                                                                          |
| `random`            | Enhetligt slumpmässigt urval                                                                                                                                                            |
| `least-used`        | Välj mål med lägst aktuell belastning                                                                                                                                                   |
| `cost-optimized`    | Minimera $ per förfrågan givet katalogprissättning                                                                                                                                      |
| `reset-aware` ⭐    | Prioritera efter kvotåterställningstid — korta återställningsfönster rankades högre                                                                                                     |
| `reset-window`      | Föredrar mål vars kvotfönster återställs snarast                                                                                                                                        |
| `headroom`          | Välj målet med mest återstående kvotutrymme                                                                                                                                             |
| `quota-weighted`    | Hoppa över uttömda konton och välj sedan bland resten i proportion till överbliven kvot dividerat med last under flygning; befintliga konversationer förblir fästa                      |
| `strict-random`     | Slumpmässigt utan deduplicering av upprepningar                                                                                                                                         |
| `auto`              | Använd Auto Combo scoring (16-faktor) —**rekommenderad**                                                                                                                                |
| `lkgp`              | Last-Known-Good Path (nålar till den senaste framgångsrika leverantören och faller sedan tillbaka till reglerna)                                                                        |
| `context-optimized` | Välj mål som passar bäst för aktuell kontextstorlek                                                                                                                                     |
| `cache-optimized`   | Ordna om mål efter prompt-cache-affinitet — den anslutning som sannolikt redan har denna begärans cachade prefix prövas först (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Fläkta ut till en panel av modeller parallellt och syntetisera sedan ett svar via en domare (se nedan)                                                                                  |
| `pipeline`          | Kör mål sekventiellt, trä in varje stegs utdata till nästa stegs input; endast det slutliga svaret returneras (#6396)                                                                   |

⭐ = Nytt i v3.8.0 · 🧬 = Nytt i v3.8.36

### `weighted` semantik

`weighted` är en **proportionell slumpmässig dragning per begäran** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), inte en equalizer:

- Varje begäran drar **en** steg med sannolikhet `weight / totalWeight`; de återstående stegen ordnas efter fallande vikt som reservkedja för den begäran.
- Ett steg vars vikt är `0` (eller saknas) är **aldrig ritad** medan vilket annat steg som helst har en vikt > 0 — kan det endast fungera som en reserv efter att det ritade steget misslyckas. Bara när **alla** vikterna är 0 blir urvalet enhetligt.
- Steg vars mål alla är otillgängliga — leverantörens strömbrytare `OPEN`, nedkylning av anslutning, modelllåsning — tas bort från dragningen innan det händer (`open-sse/services/combo/targetResolution.ts`), så ett enda hälsosamt steg kan tillfälligt vinna varje begäran.
- `stickyWeightedLimit` (combo config, standard `1` = off) fäster det ritade steget för så många på varandra följande framgångar innan du ritar om.

För strikt rotation använd `round-robin`; lika vikter på `weighted` ger statistisk — inte strikt — balans.

### Agentiskt pipelineläge

En `pipeline` kombo med minst två modeller kan välja planner/executor -routing med `config.agenticOrchestration.enabled`. Det första målet äger planering och slutliga svar; det andra målet sänder ut klientinbyggda verktygsanrop. OmniRoute upptäcker fortsättningar av verktygsresultat från förfrågningsprotokollet, frågar planeraren om ytterligare en verktygsrunda behövs och gör dynamiskt antingen utföraren eller planeraren till det slutliga steget mot klienten.

Valfri `config.agenticOrchestration.contextCompaction` tillämpar en separat nyttolastbudget före varje utskick av planerare eller utförare. Aktivera det uttryckligen:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Dessa är serialiserade JSON teckenbudgetar som valts av operatören, inte tokenkontextfönster eller garanterade uppströmsgränser. Exakt modell IDs åsidosätter standard. Över tröskeln tar komprimering bort identiska verktygsdefinitioner, trimmar överdimensionerade verktygsbevis med en sammanfattning och tar bort gamla kompletta historikgrupper mot målförhållandet. Den behåller system/developer instruktioner, den senaste användarförfrågan, den senaste verktygsomgången inklusive parallell calls/results och Gemini:s ledande routinginstruktion. Instruktioner på toppnivå och verktygsinställningar bevaras. En utelämnande markör registrerar borttagen historik; detta är deterministisk trimning, inte en semantisk sammanfattning. Om det fästa sammanhanget fortfarande överskrider budgeten, returnerar begäran 413 innan modellen kontaktas. Med komprimering inaktiverad eller under tröskeln passerar begäran oförändrad.

På fortsättning på verktygsresultat, stoppar OmniRoute också exekveringen när två på varandra följande avslutade omgångar upprepar samma verktygsanrop med oförändrade resultat, eller när varje explicit markerat resultat i två på varandra följande omgångar misslyckades. Ändrade resultat tillåter upprepade samtal (till exempel polling). Vakten återställs på en ny användarförfrågan, grupperar parallella samtal i en omgång och stöder Anthropic, Chat Completion, Responses och Gemini -historik. Planeraren får anledningen och äger det slutliga svaret även om den begär ytterligare en verktygsrunda.

Ytterligare modeller efter det andra målet är beställda executor-säkerhetskopior. Ett misslyckat HTTP svar eller transportundantag går vidare till nästa executor, med samma planerarbeslut och inbyggda verktyg men den executorns egen stegprompt och lösta anslutning. Det första lyckade svaret returneras oförändrat, inklusive SSE -strömning; misslyckanden efter att en framgångsrik stream startar kan inte testas igen här. Om alla exekutorer misslyckas, returneras det sista felet. Klienten avbryter sändningen.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Exekutorn kan sända flera oberoende anrop i ett svar. Beroende samtal hanteras i senare klientverktyg-resultatsvarv, där planeraren granskar varje resultat. `maxToolRounds` har som standard `8` och accepterar `1`–`32`; När den väl har nåtts måste planeraren ta fram det bästa tillgängliga slutliga svaret. Interna planerarebeslut buffras, medan det valda klientinriktade svaret bevarar den ursprungliga strömningspreferensen.

### `round-robin` sticky batch och kontoexpansion

Round-robin är batchad, inte en begäran per steg:

- `stickyRoundRobinLimit` (combo config, sedan `comboStickyRoundRobinLimit`, sedan `settings.stickyRoundRobinLimit`, standard **3** ) håller samma mål för så många framgångar i följd innan de roterar. Ställ in kombinationsöverstyrningen till `1` för rotation med en begäran. Kombinationsredigeraren visar det effektiva värdet och vilket lager det kom från.
- `connectionAwareExpansion` (combo config, sedan settings, default **falsk** ) utökar varje steg på leverantörsnivå till mål per konto före rotation. Grupp-B-strategier (prioritet, viktad, round-robin, slumpmässig, p2c, minst använda, kostnadsoptimerad, lkgp, fill-first, strikt-slumpmässig, kontextoptimerad, cache-optimerad, kontextrelä, fusion, pipeline) behåller en vy på leverantörsnivå tills detta är på. Kombinationsredigeraren visar ärv/på/av; inherit använder den globala standarden (av).
- Prompt-cache lokalitetsrouting (`promptCacheAffinityEnabled`, standard **sann** ) ordnar om fästa anslutningar så att matchande cache-nycklar stannar på ett konto. Det har företräde framför round-robin och viktad rotation över fästa per konto steg. Stäng av den under Inställningar → Combo standarder om du behöver strikt rotation. Det finns ingen per-kombo åsidosättande.

För rotation av flera konton på en modell, föredrar **ett dynamiskt kontosteg** (tom `connectionId`, hela poolen) med sticky limit `1`, inte tre nålade `connectionId`:er. Fästa steg plus affinitet kollapsar på samma konto även när RR räknaren går framåt.

## Fusionsstrategi

`fusion` är den enda strategin som **inte** väljer ett enskilt mål. Den skickar prompten
till **varje panelmodell parallellt**, varefter en konfigurerbar **domarmodell** sammanställer
ett enda slutgiltigt svar från alla panelsvar. Porterad från uppströmsprojektet `decolua/9router`
(OpenRouters Fusion-design); implementeringen finns i `open-sse/services/fusion.ts`.

Så fungerar det:

0. **Förbikoppling vid verktyg** — en begäran som innehåller en icke-tom `tools`-array där
   `tool_choice` inte uttryckligen är `"none"` hoppar över panelen helt: den dirigeras direkt till
   en enda modell (den konfigurerade domaren eller `panel[0]`) med `tools`/`tool_choice`
   vidarebefordrade oförändrade. Panelmedlemmarna har ingen åtkomst till verktyg och domarens
   sammanställningsdirektiv avråder från att generera verktygsanrop, så agentbaserade klienter
   och klienter som anropar verktyg får ett verkligt beslut om verktygsanrop i stället för
   sammanställd prosa (#6771).
1. **Utspridning** (endast begäranden utan verktyg) — prompten skickas till alla panelmodeller
   samtidigt, med icke-strömmande läge påtvingat och verktygen borttagna (domaren behöver
   fullständig prosa för att kunna sammanställa).
2. **Insamling med kvorumfrist** — så snart `minPanel` svar har inkommit startar en kort
   respittimer för eftersläntrarna, varefter fusionen fortsätter med det som har samlats in.
   Detta begränsar den långsammaste modellens inverkan på den totala tiden, inom ramen för
   en fast tidsgräns.
3. **Domarsammanställning** — panelsvaren anonymiseras (`Source 1`, `Source 2`, … — så att
   domaren väger innehållet, inte modellvarumärket) och överlämnas till domaren, som analyserar
   samstämmighet / motsägelser / ofullständig täckning / unika insikter / blinda fläckar och
   därefter skriver **ett** auktoritativt svar. Domaranropet behåller klientens ursprungliga
   `stream`-flagga och verktyg, så strömning och efterföljande verktygsanvändning fungerar fortfarande.
4. **Gradvis degradering** — 0 panelsvar → `503`; exakt 1 kvarvarande svar → det svaret
   returneras direkt (det finns inget att fusionera); en panel med en enda modell svarar direkt.

En panelmedlem kan också vara ett `combo-ref`-steg (`{kind: "combo-ref", comboName: "..."}`) som refererar
till en annan combo — den löses upp som **en enda panelröst i form av en svart låda** (en fullständig
rekursiv dirigering till den refererade combon, inte en utspridning till den combons egna mål), med samma
skydd för djup och cykler som alla andra strategier som använder combo-ref redan tillämpar (#6764).

### Konfiguration

Konfigureras i combons `config`-blob (ingen schemamigrering — den återanvänder den befintliga
tabellen `combos`):

| Fält                                     | Typ      | Standardvärde        | Syfte                                                                                     |
| :--------------------------------------- | :------- | :------------------- | :---------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | första panelmodellen | Modell som sammanställer det slutgiltiga svaret                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                  | Antal lyckade svar som krävs innan respittimern startar (begränsas till `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`               | Hur länge eftersläntrare inväntas efter att kvorum har uppnåtts                           |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`              | Absolut gräns så att en modell som har hängt sig inte kan blockera begäran                |

Standardvärdena finns i `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exempel

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Anropa den sedan som vilken combo som helst: `{"model":"fusion-panel","messages":[...]}`.

## Virtuell Auto-Combo-fabrik

Auto Combo-motorn kräver inte fördefinierade kombinationer. I stället skapar `open-sse/services/autoCombo/virtualFactory.ts` kandidater dynamiskt:

1. Hämtar `getProviderConnections({ isActive: true })` (alla aktiverade anslutningar)
2. Filtrerar fram dem som har giltiga autentiseringsuppgifter (API-nyckel eller OAuth-token som inte har löpt ut via `hasUsableOAuthToken()`)
3. Jämför med `getProviderRegistry()` för modelltillgänglighet och prissättning
4. Skapar en `VirtualAutoComboCandidate` för varje tupel `(provider, model, connection)`
5. Väljer `connection.defaultModel` (eller registrets första modell) som mål för dirigeringen
6. Poängsätter varje kandidat med `scorePool()` och variantens viktpaket med 16 faktorer
7. Returnerar den resulterande minnesbaserade `AutoComboConfig` till `handleComboChat()` — den lagras aldrig i databasen

Det innebär att **om en ny leverantör läggs till med `auto/*` aktiverat utökas kandidatpoolen automatiskt** — ingen manuell redigering av kombinationer krävs. Den virtuella kombinationen byggs om för varje begäran, så nya anslutningar eller anslutningar som återfått god status tas med omedelbart.

## Självläkning

- **Tillfällig exkludering**: Poäng < 0,2 → exkluderas i 5 min (progressiv backoff, högst 30 min)
- **Medvetenhet om kretsbrytare**: OPEN → exkluderas automatiskt; HALF_OPEN → sonderingsbegäranden
- **Incidentläge**: >50 % OPEN → inaktivera utforskning, maximera stabiliteten
- **Återhämtning efter väntetid**: Efter exkludering är den första begäran en ”sondering” med kortare tidsgräns

## Banditutforskning

5 % av begärandena (konfigurerbart) dirigeras till slumpmässiga leverantörer för utforskning. Inaktiverat i incidentläge.

## API

Det finns **ingen dedikerad slutpunkt för `POST /api/combos/auto`** – Auto-Combo används på två sätt:

1. **Utan konfiguration (rekommenderas):** Skicka valfri begäran om chattkomplettering med `model: "auto"` eller `model: "auto/<variant>"`. Den virtuella fabriken skapar kombinationen för varje begäran – ingen beständig lagring eller några API-anrop krävs.

2. **Beständig kombination med `strategy: "auto"`:** Skapa en vanlig kombination via `POST /api/combos` och ange `strategy: "auto"` samt `config.auto.weights` / `config.auto.candidatePool`. Samma poängmotor används; kombinationen lagras i `combos` och kan återanvändas via ID.

För identifiering listar `GET /api/combos/auto` varje variant med dess fastställda kandidatpool samt `context_length` / `max_output_tokens` – MAX-värdet bland kandidatpoolens fönster. Klienter (t.ex. opencode-pluginen) måste annonsera dessa värden i stället för `0`: en kontext på noll inaktiverar opencodes automatiska komprimering helt, vilket gör att sessioner växer tills gatewayens historikrensning förstör kontexten. MAX är säkert att annonsera eftersom auto-kombinationens kontextförfilter dirigerar för stora begäranden till kandidater med stora fönster.

```bash
# Användning utan konfiguration (ingen kombination skapas)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Beständig automatisk kombination via den vanliga kombinationsslutpunkten
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategier för automatisk dirigering

Beständiga kombinationer med `strategy: "auto"` kan ange `config.routerStrategy` (eller äldre
`config.auto.routerStrategy`) till något av följande:

- `rules` – standardmässig viktad poängsättning
- `score` – väljer den högsta konfigurerade viktade poängen. Vid exakt lika resultat bevaras den konfigurerade
  kandidatordningen; befintliga `explorationRate` gör urval från hela den rangordnade poolen.
- `cost` / `eco` – billigaste friska leverantören
- `latency` / `fast` – lägsta p95-latens med tillförlitlighetsavdrag
- `sla-aware` / `sla` – föredrar kandidater som uppfyller SLO:er för p95-latens, felfrekvens och valfri
  kostnad
- `lkgp` – senast kända fungerande leverantör först
- `nadir` – frågar besluts-API:t från [Nadir](https://getnadir.com) vilken modell i poolen som
  prompten behöver; kräver aktivt val och faller vid fel tillbaka till `rules`

### Dirigeringsstrategier i detalj

Auto-Combo-motorn tillhandahåller 7 utbytbara **RouterStrategy**-implementationer som
du kan växla mellan via `config.routerStrategy` (eller äldre `config.auto.routerStrategy`).
Varje strategi väljer en leverantör från kandidatpoolen baserat på ett `RoutingContext`
(uppgiftstyp, verktygs-/bildledtrådar, uppskattat antal token, valfri SLA-policy och valfri
senast känd fungerande leverantör).

#### 1. `rules` (standard) – viktad poängsättning med 16 faktorer

Omsluter den befintliga poängmotorn. Filtrerar bort kandidater vars kretsbrytare har
tillståndet `OPEN` och kör sedan `scorePool()` med aktuell uppgiftstyp och `getTaskFitness()`,
varefter leverantören med högst poäng väljs.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**När den bör användas**: Standardvalet. Använd den när du vill ha en balanserad avvägning mellan alla signaler.

**Alias**: `rules` (inget alias)

---

#### 2. `cost` / `eco` – billigaste friska leverantören

Sorterar kandidatpoolen efter `costPer1MTokens` (stigande) och väljer den billigaste.
Filtrerar först bort kandidater med tillståndet `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**När den bör användas**: Kostnadskänsliga arbetsbelastningar, batchbearbetning eller bakgrundsjobb.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` – lägsta p95-latens med tillförlitlighetsavdrag

Sorterar efter `p95LatencyMs + (errorRate * 1000)`. Avdraget för felfrekvens säkerställer
att otillförlitliga leverantörer rankas lägre även om deras nominella latens är låg.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**När den bör användas**: Latenskänsliga arbetsbelastningar som chatt i realtid, automatisk komplettering eller
interaktiva kodningsassistenter.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` – efterlevnad av SLO:er för latens/fel/kostnad

Poängsätter varje kandidat utifrån hur väl den uppfyller den konfigurerade SLO-policyn:

| Faktor           | Vikt | Formel                                               |
| ---------------- | ---- | ---------------------------------------------------- |
| Latenspoäng      | 35%  | `threshold / max(value, ε)`                          |
| Felpoäng         | 35%  | `threshold / max(value, ε)`                          |
| Hälsopoäng       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)    |
| Kostnadspoäng    | 10%  | `threshold / max(value, ε)` eller inversnormaliserat |
| Stabilitetspoäng | 5%   | inversnormaliserad standardavvikelse för latens      |

När `hardConstraints: true` sorteras kandidaterna i första hand efter **överträdelsepoäng**
(hur mycket de överskrider en SLO), därefter efter sammanvägt poäng. Annars används endast
det sammanvägda poänget.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... poängsätter varje kandidat mot policyn: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-fält** (anges i kombinationskonfigurationen):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**När den bör användas**: Produktionsarbetslaster med strikta budgetar för latens, felfrekvens eller kostnad.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — senast kända fungerande leverantör först

Provar först den **senast kända fungerande leverantören** (om en sådan har angetts) och faller sedan tillbaka på
strategin `rules`. Användbart för sessionsaffinitet — samma leverantör hanterar
uppföljande förfrågningar i en konversation.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Faller tillbaka på strategin rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**När den bör användas**: Konversationer med flera turer där du vill att samma leverantör ska hantera
uppföljande förfrågningar (t.ex. för cachelagring, kontextkontinuitet eller konsekvent prissättning).

**Alias**: `lkgp` (inget alias)

---

#### 6. `nadir` — promptmedvetet modellval via Nadir

Varje strategi ovan rangordnar kandidaterna utifrån sin egen telemetri; ingen av dem läser
förfrågan. `nadir` skickar den senaste användarturen tillsammans med poolens modell-ID:n till
[Nadirs](https://getnadir.com) besluts-API (`POST /v1/bucket`) och dirigerar till den modell
som Nadir väljer från menyn (`simple` → den billigaste kapabla modellen, `complex` → den
mest avancerade modellen). Anslutningen som betjänar modellen väljs fortfarande av `rules`, så kvot,
hälsa och kostnad fortsätter att avgöra vilket konto som används.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` och `OMNIROUTE_NADIR_BASE_URL` används som reservvärden från miljön för de två
strängarna. `baseUrl` behövs endast för en egenhostad Nadir-instans (ett avslutande `/v1` godtas).
Anrop utan nyckel hamnar på Nadirs anonyma nivå, som har frekvensbegränsning per IP-adress. Med en nyckel
([skapa en](https://app.getnadir.com/dashboard/api-keys)) loggas varje beslut
på din Nadir-instrumentpanel. Fullständiga anvisningar för konfiguration och verifiering:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Detta lämnar systemet: texten i det senaste användarmeddelandet (de första 16 000 tecknen), kandidaternas
modell-ID:n och en kanaltagg med `source: "omniroute"`. Ingen systemprompt, historik, inga verktyg eller
HTTP-huvuden.

Felhanteringen är fail-open: en tidsgräns (standard 2000 ms), ett svar som inte är 2xx, en onåbar
värd, ett felaktigt svar eller ett val utanför poolen leder till beslutet från `rules`
och anledningen får prefixet `NadirStrategy: fallback (…)`. Efter ett misslyckat anrop
hoppar strategin över nätverket i 30 s, så ett avbrott kostar en tidsgräns per 30 s i stället för
en per förfrågan. Dirigeringshändelser rapporterar `strategy: "nadir"` endast när Nadir faktiskt gjorde
valet.

**När den bör användas**: trafik med varierande svårighetsgrad i en pool som omfattar flera modellnivåer (en liten, en
mellanstor och en avancerad modell), när du vill minska kostnaden för att alltid använda den mest avancerade modellen.

**Alias**: `nadir` (inget alias)

---

### Anpassade dirigeringsstrategier

Du kan registrera din egen implementation av `RouterStrategy` via det publika API:et:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Din dirigeringslogik här
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Använd den sedan:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guide för val av dirigeringsstrategi

| Användningsfall       | Strategi    | Orsak                                             |
| --------------------- | ----------- | ------------------------------------------------- |
| Balanserad arbetslast | `rules`     | Standard — tar hänsyn till alla faktorer          |
| Minimera kostnad      | `cost`      | Väljer alltid det billigaste alternativet         |
| Minimera latens       | `latency`   | Väljer den snabbaste pålitliga leverantören       |
| Strikta SLO:er        | `sla-aware` | Filtrerar efter tröskelvärden för p95/fel/kostnad |
| Fleromgångschatt      | `lkgp`      | Sessionsbundenhet                                 |
| Varierande svårighet  | `nadir`     | Väljer modellnivå för varje prompt                |

SLA-medvetna fält:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Uppgiftslämplighet

Över 30 modeller har poängsatts inom 6 uppgiftstyper (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Stöder jokerteckenmönster (t.ex. `*-coder` → högt kodningsresultat).

## Sammanfattning av automatiska varianter

Inklusive enbart `auto` (standard) samt de 6 `AutoVariant`-värdena som deklareras i `autoPrefix.ts` finns det **7 anropbara modell-ID:n**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` i sig räknar upp 6 värden; det sjunde alternativet är ”ingen variant” — enbart `auto` — som hanteras av `parseAutoPrefix()` som `variant: undefined`.)

## Hur nivåer passar in i Auto-Combo

Poängfunktionen med 16 faktorer (`open-sse/services/autoCombo/scoring.ts`) behandlar nivåtillhörighet som två signaler: `tierPriority` (0.0476) och `tierAffinity` (0.0476). Se den kanoniska [tabellen över poängfaktorer](#how-it-works-persisted-auto-combos) ovan för den fullständiga uppsättningen `DEFAULT_WEIGHTS` — åsidosättningarna per paket (ship-fast/cost-saver/quality-first/
offline-friendly) anges i tabellen ”Weight profiles per pack”.

Enbart nivån gör **inte** att nivå 1 alltid kommer först — om latensen för nivå 1 är dålig eller förhållandet mellan kostnad och kvalitet är suboptimalt vinner nivå 2. Om du vill tvinga fram nivåordningen använder du kombinationsstrategin `priority` och ordnar leverantörerna efter nivå.

Om du tydligt vill prioritera nivå 1 (prenumeration) ökar du vikten för `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Se [`docs/guides/TIERS.md`](../guides/TIERS.md) för nivådefinitioner och klassificering av leverantörer.

## Testning och täckning

### Deterministisk matris för routningsbeslut (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` verifierar routnings**beslutet** för alla 19 offentliga strategier från början till slut genom den verkliga kombinationspipelinen med en simulerad uppströmsleverantör. Täckningen omfattar:

- Alla 19 `ROUTING_STRATEGY_VALUES`-strategier (ordered, weighted, cost, context, fusion, …).
- `quota-share` (intern) från början till slut: DRR-rättvisa + nedprioritering vid mättnad via den verkliga `selectQuotaShareTarget`-skarven (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay`-täckning för universell överlämning för varje antal mål.

Den här testsviten körs i CI (`test:integration`-jobbet) med `--test-concurrency=1` och `--test-force-exit`, så att den är deterministisk och inte kräver autentiseringsuppgifter för livetjänster.

### Villkorad röktestning mot livetjänster (INTE i CI — verkliga leverantörer)

| Kommando                               | Vad det gör                                                                                                 |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Verklig routning i processen med `RUN_COMBO_LIVE=1`; skapar en ögonblicksbild av en aktiv OmniRoute-databas |
| `npm run test:combo:live:vps`          | HTTP-anrop mot en aktiv OmniRoute-server (ange `COMBO_LIVE_BASE_URL`)                                       |
| `npm run test:combo:live:vps:failover` | Samma sak, med avsiktliga redundansväxlingsscenarier                                                        |

Dessa röktester testar den verkliga kommunikationsvägen (kombination → leverantör → slutförande). De är avsiktligt undantagna från CI eftersom de kräver autentiseringsuppgifter för livetjänster och VPS-åtkomst.

---

## Filer

| Fil                                                       | Syfte                                                                                                  |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Poängfunktion med 16 faktorer, `DEFAULT_WEIGHTS`, poolnormalisering                                    |
| `open-sse/services/autoCombo/taskFitness.ts`              | Uppslagning av lämplighet för modell × uppgift                                                         |
| `open-sse/services/autoCombo/engine.ts`                   | Urvalslogik, bandit, budgettak                                                                         |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exkludering, prober, incidentläge                                                                      |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 viktprofiler (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser för prefixet `auto/` + 6 varianter                                                              |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Skapar `AutoComboConfig` i minnet från aktiva anslutningar                                             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testkrok för mockning av leverantörsregistret                                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strategier)                                                              |
| `src/sse/handlers/chat.ts`                                | Integration: kortslutning för auto-prefix                                                              |
