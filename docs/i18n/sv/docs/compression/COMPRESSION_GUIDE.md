# 🗜️ Prompt Compression Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spara automatiskt 15–95 % av kvalificerad kontext. En snabb översikt finns i [README-avsnittet om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Översikt

OmniRoute implementerar en modulär pipeline för promptkomprimering som körs **proaktivt** innan förfrågningar når uppströmsleverantörer. Det innebär att dina tokenbesparingar sker transparent — inga ändringar av ditt arbetsflöde krävs.

```
Klientförfrågan
  → Val av komprimeringsstrategi
    → Åsidosättning via kombination? → Använd kombinationsinställningen
    → Tröskelvärde för automatisk aktivering? → Använd automatiskt läge
    → Standardläge? → Använd global inställning
    → Av? → Hoppa över komprimering
  → Valt komprimeringsläge
    → Av: Ingen komprimering
    → Lätt: Säker rensning av blanksteg/formatering (~15 %)
    → Standard: Borttagning av utfyllnad med telegramstil (~30 %)
    → Aggressivt: Åldring av historik + sammanfattning (~50 %)
    → Ultra: Heuristisk beskärning + uttunning av kodblock (~75 %)
    → RTK: Kommandomedveten filtrering av terminal-/verktygsutdata (60–90 % uppströmsintervall)
    → Staplat: Ordnad pipeline med flera motorer, vanligtvis RTK följt av Caveman (78–95 % kvalificerat intervall)
  → Komprimerad förfrågan → Leverantör
```

---

## Komprimeringslägen

### Av

Ingen komprimering tillämpas. Alla meddelanden skickas vidare oförändrade.

### Lite-läge (~15 % besparing, <1 ms latens)

Det säkraste läget — rensar upp formatering. Dess trunkering av verktygsresultat är förlustbringande, så standardsökvägen
(utan opt-in med `allow-lossy`, `engine:lite` eller en namngiven kombination) kör lite med
`compressToolResults: false`: tidigare verktygsresultat når leverantören oförändrade.

| Teknik                   | Beskrivning                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Slår ihop på varandra följande tomrader och avslutande blanksteg                                            |
| `dedupSystemPrompt`      | Tar bort duplicerade systemmeddelanden                                                                      |
| `compressToolResults`    | Trunkerar tidigare verktygsresultat till lite-gränsen (förlustbringande: endast med ett uttryckligt opt-in) |
| `removeRedundantContent` | Tar bort upprepade instruktioner                                                                            |
| `replaceImageUrls`       | Förkortar base64-bilddata-URI:er                                                                            |

**Bäst för:** Alltid aktiverad användning och säkerhetskritiska arbetsflöden.

### Standardläge (~30 % besparing)

Inspirerat av [Caveman](https://github.com/JuliusBrussee/caveman) — tar bort utfyllnadsord och omständliga formuleringar samtidigt som betydelsen bevaras:

- Tar bort utfyllnadsord ("snälla", "jag tror", "i princip", "faktiskt")
- Komprimerar omständliga formuleringar ("för att" → "att", "som ett resultat av" → "eftersom")
- Tar bort artiga reservationer ("Skulle du kunna...", "Om du möjligen skulle kunna...")
- Över 30 regex-regler optimerade för kodningsprompter

**Bäst för:** Dagliga kodningsarbetsflöden och kostnadsmedvetna team.

### Aggressivt läge (~50 % besparing)

Smart historikhantering för långa sessioner:

- **Meddelandeåldring** — äldre meddelanden komprimeras gradvis mer
- **Komprimering av verktygsresultat** — långa verktygsutdata trunkeras eller utelämnas (första/sista raderna,
  filtrering på matchande rader, komprimering av JSON-nycklar)
- **Skydd för strukturell integritet** — säkerställer att paren `tool_use` + `tool_result` förblir konsekventa
- **Medvetenhet om kontextfönstret** — respekterar tokenbegränsningar per modell

**Bäst för:** Utökade felsökningssessioner och stora kodbaser.

### Ultraläge (~75 % besparing)

Maximal komprimering för tokenskritiska scenarier:

- **Heuristisk beskärning** — poängbaserad tokenbeskärning av löptext
- **Bevarande av struktur** — kodblock med staket, inline-kod, URL:er och identifierare markeras och sys ihop igen
  ordagrant och beskärs aldrig
- **Valfritt SLM-skikt** — en liten lokal modell kan förfina beskärningen när den är konfigurerad
- Oberoende av aggressivt läge: det kör inte meddelandeåldring, komprimering av verktygsresultat
  eller reservsammanfattaren (endast ett fel i SLM-skiktet kan dirigera en reservomgång genom aggressivt läge)

**Bäst för:** När du upprepade gånger når kontextgränserna.

### RTK-läge (60–90 % av uppströmsintervallet)

RTK-läget är optimerat för utförliga verktygsutdata som förekommer i kodningsagentssessioner:

- Identifierar kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkörningar,
  TypeScript/Vite/Webpack-byggen, ESLint/Biome/Prettier, npm-granskningar/-installationer, Docker-loggar, infrastrukturutdata
  och generiska shell-utdata
- Tillämpar JSON-filterpaket från `open-sse/services/compression/engines/rtk/filters/`
- Importerar RTK TOML-schema v1-filter från projektomfattande eller globala `filters.toml`-filer, med inline-testvalidering och förtroendestyrning för projektfiler
- Levereras med 56 inbyggda filter med inline-verifieringsexempel
- Tar bort ANSI-kontrollsekvenser, förloppsindikatorer, upprepade rader och icke-handlingsbar störning
- Bevarar fel, varningar, ändrade filer, sammanfattningar och slutet av långa utdata
- Har stöd för förtroendestyrda projektfilter, globala filter och valfri återställning av råutdata efter redigering

**Bäst för:** Agentsessioner med shell-, build-, test-, git-, grep- och filutdatatranskript.

### Staplat läge (78–95 % av det berättigade intervallet)

Staplat läge kör flera komprimeringsmotorer i en deterministisk ordning. Standardpipeline:

```txt
RTK -> Caveman
```

Den ordningen håller terminal-/verktygsutdata kompakt först och tillämpar sedan Cavemans semantiska kondensering på
den återstående prompten i naturligt språk. Staplade pipelines kan konfigureras globalt eller genom
komprimeringskombinationer som tilldelats routningskombinationer.

**Bäst för:** Blandad kontext med stora verktygsloggar samt mänskliga instruktioner eller assistentsammanfattningar.

---

## Matematik för uppströmsbesparingar

OmniRoute dokumenterar komprimeringsbesparingar från två källor: riktmärken från uppströmsprojekt och
OmniRoutes egen motorsammansättning.

| Källa   | Siffra från uppströmsprojektets README som används här                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` färre utdata-tokens, `65%` genomsnittlig besparing av utdata i riktmärken, intervallet `22-87%` och ett verktyg för `~46%` komprimering av indata |
| RTK     | `60-90%` besparing för kommandoutdata; exempelsession med `~118,000 -> ~23,900` tokens, eller `79.7%` sparat (`~80%`)                                    |

För överlappande verktygs-/kontextnyttolaster staplar OmniRoutes standardkombination motorerna:

```txt
RTK -> Caveman
```

De kombinerade besparingarna är multiplikativa, inte additiva:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Siffran `78-95%` gäller när både RTK och Caveman kan reducera samma indata-/kontextnyttolast.
Cavemans läge för svarsutdata är separat: när det är aktiverat används Cavemans egna besparingar för utdata (`65%`
i genomsnitt, `~75%` som huvudbudskap, intervallet `22-87%`). De totala faktureringsbesparingarna beror på din fördelning mellan prompt och utdata.

### Vad ”berättigad” faktiskt innebär

Det angivna intervallet 15-95% är verkligt, men det gäller endast **redundant eller mångordigt** innehåll — upprepade
felrader, en bygglogg som spammar samma varning eller en alltför stor dump från `grep`/filläsning. Det innebär
**inte** att varje begäran sparar så mycket.

Empiriskt verifierat (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): en
`stacked`-körning (RTK + Caveman) mot ett `tool_result`-block i Anthropic-format som innehöll 300 identiska
felrader gav **95.93% tokenbesparing / 96.26% teckenbesparing** — helt i linje med det angivna
intervallet. Men när samma pipeline körs mot normala, icke-redundanta verktygsutdata (en ren lista med `grep`-träffar,
en kort filläsning eller vanlig samtalstext) ger den korrekt **nära noll i besparing**, eftersom
det inte finns något repetitivt att ta bort och `validateCompression()` (`validation.ts`) vägrar att leverera en
omskrivning som skulle ta bort eller ändra kodblock, URL:er, rubriker, versioner eller konstantidentifierare med ENBART VERSALER.

Detta är förväntat och säkert beteende, inte en bugg: en kodningssession som mestadels läser/söker med grep i rena filer får
måttliga totala besparingar även när komprimering är fullt aktiverad, medan en session som fastnar i en felande
loop eller möter en pratglad linter får hela intervallet 78-95% för den trafiken. Använd inte en enskild sessions
låga aggregerade besparingsprocent som bevis för att komprimeringen är felkonfigurerad — kontrollera först om
de underliggande verktygsutdata faktiskt var redundanta.

---

## Visualisering av tokenbesparingar

```
Utan komprimering: 47K tokens skickade till LLM
Med Lite:          40K tokens skickade          (15% sparat — säkert, alltid aktivt)
Med Standard:      33K tokens skickade          (30% sparat — caveman-speak-regler)
Med Aggressive:    24K tokens skickade          (50% sparat — åldrande + sammanfattning)
Med Ultra:         12K tokens skickade          (75% sparat — heuristisk beskärning)
Med RTK:           19K-5K tokens skickade       (60-90% sparat på kommando-/verktygsutdata)
Med Stacked:       10K-2.5K tokens skickade     (78-95% berättigat intervall för RTK+Caveman)
```

---

## Konfiguration

### Instrumentpanel

Navigera till `Dashboard → Context & Cache`:

- **Caveman** — val av läge, språkpaket, förhandsgranskning och globala standardvärden
- **RTK** — förhandsgranskning av kommandofilter, RTK-säkerhetsinställningar och filterkatalog
- **Compression Combos** — namngivna motorpipelines som tilldelats routningskombinationer
- **Auto-Trigger Threshold** — aktiverar komprimering automatiskt när antalet token överskrider tröskelvärdet

### Åsidosättning per kombination

I `Dashboard → Context & Cache → Compression Combos` tilldelar du en komprimeringskombination till en routningskombination:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Detta låter dig använda staplad komprimering med kostnadsfria kodningsleverantörer och samtidigt behålla lite-läget för betalda prenumerationer.

Denna tilldelning av "Per-Combo Override" är en annan inställning än åsidosättningen av **komprimeringsläget för routningskombinationen** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — fältets schema accepterar även `rtk`, `stacked` och `omniglyph`) — den åsidosättningen väljer inte en namngiven pipeline för komprimeringskombinationen, utan anger endast fältet `compressionMode` som används av `resolveCompressionPlan`. Den kan ställas in antingen på kombinationskortet (`Dashboard → Combos`) eller, sedan #6760, per routningskombination i listan "Assign to routing" på `Dashboard → Context & Cache → Compression Combos`, precis bredvid kryssrutan för pipeline-tilldelning som dokumenteras ovan. Båda gränssnitten sparar via samma `PUT /api/combos/{id}`-slutpunkt.

### Åsidosättning per begäran

Skicka begärandehuvudet `x-omniroute-compression` för att åsidosätta komprimeringsplanen för en enskild begäran. Det har högst prioritet — det åsidosätter åsidosättningen för routningskombinationen, den aktiva profilen, automatisk aktivering och standardvärdet i panelen. Okända värden ignoreras (begäran avvisas aldrig), och den globala huvudbrytaren gäller fortfarande för allt: när komprimering är globalt avstängd kan rubriken inte aktivera den. Värden:

| Värde         | Effekt                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering för denna begäran.                                                                          |
| `default`     | Den panelhärledda standardprofilen (ignorerar den aktiva profilen). Förlustbringande motorer lämnas avstängda. |
| `safe`        | Samma som om rubriken utelämnas.                                                                               |
| `allow-lossy` | Behåller operatörens plan för denna begäran, inklusive sammanfattningar, relevansfilter och stilomskrivningar. |
| `engine:<id>` | En enskild motor när den är aktiverad, till exempel `engine:rtk`. Detta är opt-in per begäran för den motorn.  |
| `<combo>`     | En namngiven kombination, som först matchas efter namn (skiftlägesokänsligt) och därefter efter id.            |

Utan `allow-lossy`, `engine:<id>` eller en namngiven kombination tillämpas inga förlustbringande motorer. När ett förlustbringande standardvärde, en automatisk aktivering eller en routningsåtsidosättning nedgraderas behåller OmniRoute de identifierade förlustfria stegen från den konfigurerade staplade pipelinen, i konfigurerad ordning. Den faller endast tillbaka till `session-dedup → lite` när inget konfigurerat förlustfritt steg överlever.

Förhandsgranskningen **Effective pipeline** i panelen Settings visar den normala planen i viloläge. När en automatisk aktivering kan köras visar samma förhandsgranskning även den villkorliga effektiva pipelinen, så att panelen och körningens upplösning utan rubrik förblir samordnade.

Den tillämpade planen återspeglas i svarsrubriken `X-OmniRoute-Compression: <mode>; source=<source>`, där `<source>` är ett av `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hämta komprimeringsinställningar
curl http://localhost:20128/api/settings/compression

# Uppdatera komprimeringsinställningar
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Förhandsgranska en specifik RTK-/staplad nyttolast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Lista RTK-filterpaket
curl http://localhost:20128/api/context/rtk/filters

# Testa RTK direkt med valfria kommandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Vad som skyddas

Komprimeringsmotorn **bevarar alltid:**

- ✅ Kodblock (inhägnade och infogade)
- ✅ URL:er och filsökvägar
- ✅ JSON-strukturer och strukturerade data
- ✅ Identifierare och skyddade tekniska token
- ✅ Matematiska uttryck
- ✅ Definitioner av verktygs-/funktionsanrop
- ✅ Systempromptar (i lite-läge)

RTK:s återställning av råutdata maskerar vanliga API-nycklar, bearer-token, Slack-token, AWS-åtkomstnycklar,
lösenord, token och hemligheter innan något sparas.

---

## Komprimeringsstatistik

Varje komprimerad begäran inkluderar statistik i serverloggarna:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Fasplan

| Fas    | Lägen                                                                                                                                                      | Status      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fas 1  | Off, Lite                                                                                                                                                  | ✅ Lanserad |
| Fas 2  | Standard, Aggressive, Ultra                                                                                                                                | ✅ Lanserad |
| Fas 3  | RTK, Stacked, Compression Combos                                                                                                                           | ✅ Lanserad |
| Fas 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                | ✅ Lanserad |
| Fas 4C | Adaptiv kontextbudget ("reglage") — beräkningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + läges-/policykontroller i kontrollpanelen | ✅ Lanserad |

---

## Erkännanden

Komprimeringsreglerna för Standard-läget är inspirerade av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virala projektet "why use many token when few token do trick". Caveman rapporterar `~75%` färre token i utdata, en genomsnittlig besparing på `65%` i benchmark-utdata, ett intervall på `22-87%` för utdata och ett verktyg för indatakomprimering på `~46%`.

RTK-läget är inspirerat av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — högprestandaprojektet för komprimering av kommandoutdata för terminal-, bygg-, test-, git- och verktygsutdatafiltrering. RTK rapporterar besparingar på `60-90%`, där exempelsessionen i dess README visar en besparing på `~80%`.

---

## Avancerade kompressionssystem

Utöver de 7 lägena som beskrivs ovan (källan accepterar även `codex-responses` och `omniglyph` -lägen, som den här guiden inte täcker), täcker avsnitten nedan funktioner som fungerar i eller vid sidan av dessa lägen: Verktygsresultatkompression och progressiv åldrande är steg 1 och 2 i den aggressiva motorn (aggressivt läge och ett `aggressive` steg i en staplad pipeline), Stacked-A-nedåtkörningen, är Stacked-A-downware. `aggressive` och `ultra` till `standard` för cachning av leverantörer medan komprimering är på, och Caveman Output Mode och Output Styles är opt-in systemprompt-instruktioner, av som standard, som formar modellens utdata istället för att komprimera begäran.

### Cache-medveten komprimering

Vissa leverantörer (som Anthropic med snabb cachelagring) stöder** snabb cachning** , vilket låter dem cache delar av prompten för att minska kostnader och latens. När cachning är aktiverad kan aggressiv komprimering faktiskt** skada** prestanda eftersom det ändrar de cachade tokens, vilket ogiltigförklarar cachen.

`cachingAware.ts` modulen löser detta genom att** upptäcka cachingkontext** och** justering av kompressionsstrategin** följaktligen.

#### Hur det fungerar

1. **Upptäck cachingkontext** — Söker igenom förfrågningstexten efter `cache_control` -markörer
2. **Identifiera caching-leverantörer** — Kontrollerar om målleverantören stöder cachelagring
3. **Justera strategi** — Nedgraderar `aggressive`/`ultra` till `standard` för cache-leverantörer
4. **Hoppa över systemprompten** — Systemuppmaningar cachelagras vanligtvis, så komprimera dem inte

Strategihjälparen returnerar också en `deterministicOnly` flagga, men planbyggaren förbrukar bara strategin — ingenting nedströms läser flaggan idag.

#### Kodexempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### När ska användas

Cache-medveten komprimering är** alltid på** — behövs ingen konfiguration. Den startar när komprimering är på och målleverantören stöder snabb cachelagring (Anthropic, OpenAI, etc.); explicita `cache_control` markörer krävs inte — en caching-leverantör ensam utlöser nedgraderingen, och markörer ensamma gör det aldrig (markördetektering matar cache-telemetri, inte strategibeslutet).

OpenRouter räknas som en caching-leverantör endast för `anthropic/*` -modeller: Claude -kodförfrågningar behåller sina `cache_control` brytpunkter (högst fyra) och guarden skyddar prefixet, medan alla andra OpenRouter familjer (`openai/`, `google/`, `qwen/`, ...) förblir avskalade och obevakade.

### Progressivt åldrande

Långa samtal samlar på sig många meddelandevändningar, men äldre vändor blir mindre relevanta. `progressiveAging.ts` modulen** försämrar meddelanden med svängavstånd** (avstånd mätt från slutet av samtalet). Med de levererade standardinställningarna (`verbatim: 2, light: 2, moderate: 3`):

- **Sista 2 varven (avstånd ≤ 2)** : Förvaras ordagrant
- **Avstånd 3** : Caveman-kompression (borttagning av fyllmedel)
- **Avstånd 4 +** : Assistentmeddelanden sammanfattade; användarmeddelanden reducerade till sin första rad, begränsat till 120 tecken; andra roller orörda. Systemuppmaningar, redan åldrade meddelanden och det senaste användarmeddelandet hålls alltid ordagrant oavsett avstånd. Ingenting släpps direkt, och `light` bandet går inte att nå med de levererade standardvärdena (`light` är lika med `verbatim`).

#### Kodexempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### När ska användas

Progressivt åldrande är** alltid på** för `aggressive` läge — är det steg 2 i `compressAggressive()`. Ultra-läget kör det inte. Det är särskilt effektivt för:

- Långa kodningssessioner
- Flera dagars samtal
- Agentiska arbetsflöden med många verktygsanrop

### Caveman Output Mode

Caveman utgångsläge lägger till** systemprompt instruktioner** som frågar själva modellen om kortfattad utdata — `lite` -nivån ber om kortfattade svar som håller hela meningar, `full` ber den att "svara kortfattat som smart grottman", och `ultra` ber om telegrafisk utdata; instruktioner bara frågar, de kan inte garantera det. Förfrågningar tar emot dem via `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` löser först valet med back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), som, medan `outputStyles` är tom, mappar en aktiverad `cavemanOutputMode` till `terse-prose` -utgångsstilen vid `cavemanOutputMode.intensity` (se Back-compat nedan); ett icke-tomt `outputStyles` -val används som det är, och `cavemanOutputMode.enabled` och `intensity` har då ingen effekt, medan dess `autoClarity` växling fortfarande gäller. `outputMode.ts` innehåller instruktionstexterna (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), innehållsförbikopplingen och placeringshjälpen som injektionen använder; sin egen `applyCavemanOutputMode()` injektor har ingen produktionsanropare.

#### Hur det fungerar

Detta läge komprimerar inte ingången. Den lägger till ett instruktionsblock till systemprompten (se Hur injektion fungerar nedan), och alla inmatningskompressionslägen som valts för begäran körs fortfarande efteråt, på kroppen som nu bär blocket. Inför klausulen om delade gränser som varje nivå slutar med, lyder den engelska `full` nivån:

> "Svara kortfattat som smart grottman. Släpp artiklar (a/an/the), filler (just/really/basically/actually/simply), trevligheter, hedging. Fragment OK. Korta synonymer (stora inte omfattande, fixa inte implementera). Behåll all teknisk substans, kod, fel, URLs, identifierare exakta."

Detta fungerar särskilt bra för:

- Kodgenerering (terserutgång = färre tokens)
- Snabba frågor och svar (inget behov av utförliga förklaringar)
- Batchbearbetning (maximera genomströmningen)

#### När ska användas

Caveman utgångsläge är** opt-in** . Med komprimering på (`enabled: true`, huvudväxeln på sidan Kompressionsinställningar), slå på den med `cavemanOutputMode.enabled`; `intensity` väljer `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

En kompressionskombo** Utgångsläge** toggle (`outputMode`, nivå i `outputModeIntensity`) ställer in samma switch för de förfrågningar som combo gäller, och `omniroute_set_compression_engine` MCP verktyget skriver det genom sitt booleska `outputMode` argument. Ett icke-tomt `outputStyles` -val har företräde framför denna switch. Aktivera i instrumentpanelen** Terse prosa** output style injicerar samma block (se Output Styles nedan).

### Output Styles (katalog)

Caveman output läge ovan är** äldre väg i singelstil** . Fas 4 generaliserade det till en katalog av komponerbara utdatastilar: `OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`. Varje stil är en systeminstruktion som ber modellen själv om billigare produktion; stilar kan aktiveras tillsammans och injiceras i katalogordning.

| Stil                                | `id`            | Vad den gör                                                                                                                                                                                                                                                 | Instruktionsspråk                             |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Terse prosa                         | `terse-prose`   | Släpp filler/articles/hedging; hålla tekniskt innehåll exakt. Samma text som det gamla grottmansutmatningsläget (referens, inte omskrivet).                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kod                          | `less-code`     | YAGNI ladder: minsta arbetsförändring, inga oönskade abstraktioner.                                                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hästsvans (lat senior utvecklare)   | `ponytail`      | "Den bästa koden är koden som aldrig skrivits": återanvänd > omskrivning, rotorsak > symptom, kortaste arbetsdiff.                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jag har ADHD (action-first)         | `i-have-adhd`   | Handling först (command/path/snippet före prosa), numrerade avgränsade steg, ONE konkret nästa steg, ingen preamble/recap/closers. Anpassad från [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                  | `antislop-ui`   | Varje visuell teknik måste klara ett syftestest (hierarki, identitet, läsbarhet); ingen standard gradients/glass/glow, begränsad palett, inga malllayouter. Båda antislopstilarna lägger till en gräns för inga döda kontroller / inga tillverkade anspråk. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antisladdkopia och mänskligt filter | `antislop-copy` | Specifik kopia (ingen em dash, generisk CTAs, buzzwords, chatbot closers, påhittade fakta) plus folkregler: WCAG AA kontrast, synligt fokus, tangentbordsräckvidd, empty/loading/error -tillstånd, mobil reflow.                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                    | `terse-cjk`     | `full`/`ultra` svar på klassisk kinesiska (文言); `lite` ber bara om korta svar utan funktionsord, trevligheter eller utsmyckning.                                                                                                                          | zh (lokal gated, se nedan)                    |

Varje stil levererar tre intensitetsnivåer — `lite`, `full`, `ultra` — och varje nivå slutar med delade gränser-satsen (`SHARED_BOUNDARIES` i `outputMode.ts`), som håller kodblock, filsökvägar, kommandon, fel och URLs exakta. `terse-prose` och `terse-cjk` nivåtexterna lägger till identifierare till den listan.

`terse-cjk` är locale-gated till `zh` på två ställen. Sidan Kompressionsinställningar visar dess rad endast när instrumentpanelens UI språk är kinesiska (`zh-CN` eller `zh-TW`), och `applyOutputStyles()` injicerar det endast när begärans lösta språk (se Språkval nedan) är `zh`. Att dölja raden rensar inte ett sparat `terse-cjk` -val: inställningarna API accepterar alla stil-id, och om du sparar andra stilar på sidan behålls det. Vid begäran är `applyOutputStyles()` språkkontrollen den enda lokalporten.

#### Hur injektion fungerar

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) löser urvalet mot katalogen (okända id och språk som inte matchar stilar tas bort, aldrig ett fel; ett urval som löser sig till ingen stil lämnar brödtexten oförändrad, hoppas över som `no_styles`), sammanfogar de valda instruktionerna i katalogordning, lägger till gränssatssatsen** en gång** (plus säkerhetssatsen, `SAFETY_BOUNDARIES` eller dess översättning, när `less-code` eller `ponytail` är vald), och startar blocket med en enda idempotensmarkör (`[OmniRoute Output Styles]`), så att återansöka är en no-op. När det lösta språket (se Språkval nedan) har en översättning, injiceras den lokaliserade instruktionen istället för engelska.

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

När förbikopplingen släpper igenom svängen placerar `placeSystemInstruction()` (samma fil), som aldrig skapar en ny `messages[0]`, blocket i det första av dessa det hittar:

1. Ett ledande systemmeddelande med stränginnehåll: blocket läggs till efter dess text.
2. `system` -fältet på översta nivån: blocket läggs till efter texten i en sträng, eller läggs till som ett nytt textblock i en innehållsblockmatris.
3. Det första senare systemmeddelandet med stränginnehåll: blocket läggs till efter dess text.
4. Inget av ovanstående: blocket går in i ett nytt systemmeddelande i slutet av `messages`.

På en kropp utan en `messages` array (eller med en tom sådan) körs ingen innehållsbypass och ett `system` fält på toppnivå konsulteras inte. Blocket läggs till efter texten i ett sträng `instructions` -fält, om inte det fältet redan innehåller `[OmniRoute Output Styles]` markören, i vilket fall kroppen lämnas oförändrad som `already_applied`. När kroppen inte har något sträng `instructions` -fält utan bär `input` (en sträng eller en array), blir blocket `instructions`, och ersätter alla icke-strängvärden som fältet innehöll. En kropp med varken ett sträng `instructions` -fält eller en sträng eller array `input` lämnas oförändrad och hoppas över som `no_messages`.

#### Hur man aktiverar

I instrumentpanelen:** Kompressionskontext → Kompressionsinställningar** (`/dashboard/context/settings`), avsnittet Utdatastilar: en rad per stil med en on/off -växling och en nivåväljare. Stilar injicerar medan själva komprimeringen är på (sidans huvudväxling, `enabled`). De** Auto-Clarity Bypass** växeln är på** Grottman** sida (`/dashboard/context/caveman`), i dess** Utgångsläge** kort. Programmatiskt fortsätter komprimeringskonfigurationen valet som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: medan `outputStyles` är tom, mappas den äldre `cavemanOutputMode.enabled` -inställningen till `terse-prose` vid `cavemanOutputMode.intensity`. Blocket börjar sedan med `[OmniRoute Output Styles]` markören, där den äldre `applyCavemanOutputMode()` injektorn skrev `[OmniRoute Caveman Output Mode]`. Under markören matchar texten den äldre injektionen i en, pt-BR, es, de, fr, it, ru, id och vi; i ja och zh har det ett extra mellanslag före gränssatssatsen. `terse-prose` översätts till pt-BR, es, de, fr, it, ru, zh, ja, id och vi, så en begäran vars lösta språk är `hu` får den engelska texten där den äldre injektorn använde sin ungerska.

Val av utdatastil (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): med `languageConfig.enabled` på, samplar `autoDetect` det senaste användarmeddelandet i begärans `messages` array som har text (stränginnehåll eller `text` för dess innehållsdelar) och kör Caveman-motorns detektor (`detectCompressionLanguage()`) på den. Detektorn returnerar `zh` för text med Han-tecken och ingen kana; annars returnerar den den av `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` och `id` som har flest ledtrådsmatchningar, och `en` när ingen matchar — -text den inte kan klassificera får engelska, aldrig `defaultLanguage`, och `vi` upptäcks aldrig även om stilarna skickas med `vi`. En Responses API kropp behåller sina varv i `input`, som inte samplas, så den får `defaultLanguage`, sedan engelska. När inget användarmeddelande i `messages` har text, eller med `autoDetect` avstängt, gäller `defaultLanguage`, sedan engelska. Med `languageConfig.enabled` av, är språket engelska — såvida inte en kompressionskombination gäller för begäran (en kombination som tilldelats förfrågans routingkombination, eller standardkompressionskombinationen chatCore faller tillbaka till för den inbyggda staplade pipelinen): applicering av en kombination aktiverar `languageConfig.enabled` för den begäran och ställer in värdet `defaultLanguage` från den ena (save it is) av kombons paket, annars kombons första paket, som är standard på `en`), medan den sparade `autoDetect` (på som standard) fortfarande gäller. Caveman-inmatningsmotorn väljer sitt regelpaketspråk annorlunda — per textdel och, med autodetektering avstängd, gated på `enabledPacks`.

Stilen × språkmatrisen är fäst av `tests/unit/compression/output-styles-i18n-matrix.test.ts`: varje katalogstil behöver en post i testets `BASELINE_LANGUAGES`; en stil som inte är lokalstyrd måste skicka en pt-BR-översättning (den lokalstyrda `terse-cjk` är undantagen från denna regel) såvida den inte är listad i `KNOWN_ENGLISH_ONLY`, som endast kan innehålla stilar utan översättning alls — en listad stil som har någon översättning misslyckas i testet; och en stil misslyckas i testet när den tappar ett språk som dess `BASELINE_LANGUAGES` -post listar. För att lägga till en stil, se [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Verktygsresultatkomprimering

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts` komprimerar verktygsresultattext med** 5 strategier** . Den provar dem i denna ordning, och den första aktiverade strategin vars kontroll matchar innehållet avgör resultatet:

1. **`fileContent`** : innehåll av 3 eller fler rader där minst en rad, ignorerar inledande indrag, börjar med `import `, `export `, `function `, `class `, `const `, `let `, `var ` eller `return ` (nyckelordet plus ett mellanslag), eller med `if`, `for` eller `while` följt av `(` eller ` (` 5 första raderna 20, håll raden mitten markerad.
2. **`grepSearch`** : innehåll med minst en rad av formen `<path>:<digits>:`, där texten före det första kolonet inte har något blanksteg, behåller endast dessa rader, högst 30, följt av en räkning av eventuella ytterligare matchningar och listan över matchade filer; varannan rad tas bort. En sådan rad räcker för att utlösa strategin, så en loggrad som börjar med en tidsstämpel som `12:30:45` räknas också.
3. **`shellOutput`** : utdata som innehåller en ANSI CSI sekvens (`ESC[` sedan siffror eller semikolon sedan en bokstav, som i färgkoder) eller en `$` följt av blanksteg var som helst i texten förlorar dessa sekvenser (andra escapes, som `ESC[?25l` eller en OSC fönstertitelsekvens, behålls) och behåller sina senaste 50 rader upprepade, med konsekventa rader. Eftersom den här kontrollen körs före `json` och `errorMessage`, JSON eller felutgång som innehåller en sådan `$` dem aldrig medan `shellOutput` är på.
4. **`json`** : en JSON nyttolast över 2 000 tecken som börjar med `{` eller `[` (efter valfritt blanksteg) och analyserar sammanfattas: en array med mer än 7 objekt behåller sina första 5 och sista 2 objekt och dess totala antal, och ett objekt behåller sina första 20 nycklar, med varje kapslat objekt eller ett arrayvärde som ersätts av en `{…N keys}` platshållare och (för ett zq-värde) `_remaining_<N>_keys` markör som räknar nycklarna som fallit förbi de första 20. Skalära värden kopieras hela, så ett objekt med 20 nycklar eller färre utan några kapslade värden dras bara in igen — en minifierad får tecken och förblir oförändrad.
5. **`errorMessage`** : utdata som innehåller, var som helst och oavsett skiftläge, `error:`, `error ` (ordet följt av ett mellanslag, som i `no error found`), `[error]`, `exception:`, `exception `, `[exception]` eller `traceback` behåller sin första rad, de nästa 10 raderna och de sista 3, med en `… [N frames elided] …` markör i stället för linjerna mellan dem. Markören visas endast när fler än 13 rader följer den första raden, så felutmatning på 14 rader eller färre förkortas inte (vid 12 eller 13 rader har de sista 3 upprepade raderna redan sparats).

Efter att en strategi matchar, även en som inte sparar något, prövas inte de senare strategierna. När matchningsstrategin inte sparar några uppskattade tokens (längd ÷ 4, avrundat uppåt) — till exempel en kodliknande fil på 25 rader eller färre, eller en JSON array över 2 000 tecken med 7 objekt eller färre — behåller den aggressiva `compressToolResult()` det ursprungliga verktygsresultatet: båda anroparna (`compressAggressive()` och `compressAnthropicToolResultBlock()` är stilla under `saved` ) returnerar den strategins resultat. Verktygsresultatsteget är inte sista ordet: motorns reservsammanfattning kan fortfarande förkorta ett `tool` eller `function` meddelande längre än 8 192 tecken (`maxTokensPerMessage`, 2 048, gånger 4).

#### När ska användas

Verktygsresultatkompression är steg 1 i den aggressiva motorn (`compressAggressive()` i `open-sse/services/compression/aggressive.ts`), så den körs i aggressivt läge och i ett `aggressive` steg i en staplad pipeline. Den komprimerar `tool` och `function` meddelanden i OpenAI-form och texten inuti Anthropic `tool_result` blocken. Varje strategi har sin egen switch under `aggressive.toolStrategies`, allt på som standard. I instrumentpanelen finns omkopplarna på Caveman-sidan** Avancerad** visa medan komprimering är på och standardläget är Aggressivt.

### Staplad rörledning

Det staplade läget körs** flera motorer i följd** — vanligtvis RTK först (60-90 % besparing på verktygsutgång), sedan Caveman på den återstående texten (~ 46 % ingångsbesparing). Sammansatt, det är** 78–95 % kvalificerat intervall** (se Upstream Savings Math ovan): `1 - (1 - 0.60..0.90) × (1 - 0.46)` är i genomsnitt ≈ 89%.

#### Hur det fungerar

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### När ska användas

Använd staplat läge för:

- Verktygstunga arbetsflöden (agentkodning, forskning)
- Kostnadskänslig batchbearbetning
- När du behöver maximala tokenbesparingar

Staplade pipelines konfigureras genom den globala `stackedPipeline` komprimeringsinställningen, eller genom en namngiven kompressionskombination som tilldelas en routingkombination (se Per-Combo Override ovan) — inte genom en auto-combo `modePack` (det fältet väger bara om auto-combo modellval, och `stacked` är inte ett giltigt paketnamn).

---

## Åsidosättningar för komprimering per kombination

Du kan åsidosätta det globala komprimeringsläget **per kombination** för att finjustera beteendet
för olika användningsfall:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Detta är användbart för:

- **Kodningskombinationer**: Använd läget `aggressive` för långa sessioner
- **Snabba fråge- och svarskombinationer**: Använd läget `lite` för snabba svar
- **Verktygsintensiva kombinationer**: Använd läget `stacked` för maximala besparingar
- **Produktionskombinationer**: lämna åsidosättningen avstängd för leverantörer med cachning — den ständigt aktiva
  cachemedvetna justeringen nedgraderar automatiskt `aggressive`/`ultra` till `standard`
  (det finns inget valbart `cache-aware`-läge)

---

## Se även

- [Miljökonfiguration](../reference/ENVIRONMENT.md) — Miljövariabler för komprimering
- [Arkitekturguide](../architecture/ARCHITECTURE.md) — Komprimeringspipelinens interna funktion
- [Användarguide](../guides/USER_GUIDE.md) — Kom igång med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filter, tillitsmodell, verifieringsspärr och återställning av rådatautdata
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API:er, MCP och instrumentpanel
- [Format för komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format för regelpaket
- [Språkpaket för komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Språkspecifika Caveman-regler
