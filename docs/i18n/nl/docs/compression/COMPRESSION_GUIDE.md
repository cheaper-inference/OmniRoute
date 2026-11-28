# 🗜️ Prompt Compression Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Bespaar automatisch 15-95% op geschikte context. Zie voor een snel overzicht de [sectie README Compression](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Overzicht

OmniRoute implementeert een modulaire pipeline voor promptcompressie die **proactief** wordt uitgevoerd voordat verzoeken upstreamproviders bereiken. Dit betekent dat je tokenbesparingen transparant plaatsvinden — je hoeft je workflow niet aan te passen.

```
Clientverzoek
  → Selectie van compressiestrategie
    → Combo-overschrijving? → Gebruik combo-instelling
    → Drempelwaarde voor automatische activering? → Gebruik automatische modus
    → Standaardmodus? → Gebruik globale instelling
    → Uit? → Sla compressie over
  → Geselecteerde compressiemodus
    → Uit: Geen compressie
    → Lite: Veilige opschoning van witruimte/opmaak (~15%)
    → Standard: Verwijdering van opvulwoorden in telegramstijl (~30%)
    → Aggressive: Veroudering en samenvatting van geschiedenis (~50%)
    → Ultra: Heuristisch snoeien + uitdunnen van codeblokken (~75%)
    → RTK: Opdrachtherkenende filtering van terminal-/tooluitvoer (upstreambereik van 60-90%)
    → Stacked: Geordende pipeline met meerdere engines, doorgaans eerst RTK en daarna Caveman (geschikt bereik van 78-95%)
  → Gecomprimeerd verzoek → Provider
```

---

## Compressiemodi

### Uit

Geen compressie toegepast. Alle berichten worden ongewijzigd doorgestuurd.

### Lite-modus (~15% besparing, <1 ms latentie)

De veiligste modus — opschoning van de opmaak. Het afkappen van toolresultaten is verliesgevend. Daarom gebruikt het standaardpad (zonder `allow-lossy`, `engine:lite` of expliciete opt-in voor een benoemde combinatie) lite met
`compressToolResults: false`: eerdere toolresultaten bereiken de provider ongewijzigd.

| Techniek                 | Beschrijving                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Opeenvolgende lege regels en afsluitende spaties samenvoegen                          |
| `dedupSystemPrompt`      | Dubbele systeemberichten verwijderen                                                  |
| `compressToolResults`    | Eerdere toolresultaten afkappen tot de lite-limiet (verliesgevend: alleen met opt-in) |
| `removeRedundantContent` | Herhaalde instructies verwijderen                                                     |
| `replaceImageUrls`       | Base64-afbeeldingsgegevens-URI's inkorten                                             |

**Geschikt voor:** Altijd ingeschakeld gebruik, veiligheidskritieke workflows.

### Standaardmodus (~30% besparing)

Geïnspireerd door [Caveman](https://github.com/JuliusBrussee/caveman) — verwijdert opvulwoorden en omslachtige formuleringen met behoud van de betekenis:

- Verwijdert opvulwoorden ("please", "I think", "basically", "actually")
- Beknopt omslachtige formuleringen ("in order to" → "to", "as a result of" → "because")
- Verwijdert beleefde afzwakkingen ("Would you mind...", "If you could possibly...")
- Meer dan 30 regexregels, afgestemd op codeprompts

**Geschikt voor:** Dagelijkse codeworkflows, kostenbewuste teams.

### Agressieve modus (~50% besparing)

Slim beheer van de geschiedenis voor lange sessies:

- **Berichten verouderen** — oudere berichten worden stapsgewijs verder gecomprimeerd
- **Compressie van toolresultaten** — lange uitvoer wordt afgekapt of weggelaten (eerste/laatste regels,
  filtering op overeenkomende regels, compactere JSON-sleutels)
- **Bewakers voor structurele integriteit** — zorgt dat `tool_use` + `tool_result`-paren consistent blijven
- **Bewustzijn van het contextvenster** — houdt rekening met tokenlimieten per model

**Geschikt voor:** Uitgebreide debug-sessies, grote codebases.

### Ultramodus (~75% besparing)

Maximale compressie voor scenario's waarin tokens kritiek zijn:

- **Heuristisch snoeien** — op scores gebaseerd snoeien van tokens in proza
- **Structuurbehoud** — fenced codeblokken, inline code, URL's en identifiers worden
  tijdelijk gemarkeerd en letterlijk opnieuw ingevoegd; ze worden nooit gesnoeid
- **Optionele SLM-laag** — een klein lokaal model kan het snoeien verfijnen wanneer dit is geconfigureerd
- Onafhankelijk van de agressieve modus: voert geen berichtenveroudering, compressie van toolresultaten
  of de fallback-samenvatter uit (alleen een fout in de SLM-laag kan een fallback-passage via agressief routeren)

**Geschikt voor:** Wanneer je herhaaldelijk tegen contextlimieten aanloopt.

### RTK-modus (60-90% upstreambereik)

De RTK-modus is geoptimaliseerd voor uitgebreide tooluitvoer in sessies met code-agents:

- Detecteert opdracht-/uitvoerklassen zoals `git status`, `git diff`, `git log`, testrunners,
  TypeScript/Vite/Webpack-builds, ESLint/Biome/Prettier, npm-audits/-installaties, Docker-logs, infrastructuuruitvoer en generieke shell-uitvoer
- Past JSON-filterpakketten toe uit `open-sse/services/compression/engines/rtk/filters/`
- Importeert RTK TOML-schema-v1-filters uit project- of globale `filters.toml`-bestanden, met inline-testvalidatie en vertrouwenscontrole voor projectbestanden
- Levert 56 ingebouwde filters met inline-verificatievoorbeelden
- Verwijdert ANSI-besturingsreeksen, voortgangsbalken, herhaalde regels en niet-actiegerichte ruis
- Behoudt fouten, errorberichten, waarschuwingen, gewijzigde bestanden, samenvattingen en het einde van lange uitvoer
- Ondersteunt projectfilters met vertrouwenscontrole, globale filters en optioneel herstel van geredigeerde onbewerkte uitvoer

**Geschikt voor:** Agent-sessies met shell-, build-, test-, git-, grep- en bestanduitvoertranscripten.

### Gestapelde modus (78-95% van het in aanmerking komende bereik)

De gestapelde modus voert meerdere compressie-engines uit in een deterministische volgorde. De standaardpipeline is:

```txt
RTK -> Caveman
```

Die volgorde houdt terminal-/tooluitvoer eerst compact en past vervolgens semantische condensatie van Caveman toe op
de resterende prompt in natuurlijke taal. Gestapelde pipelines kunnen globaal of via compressiecombinaties worden geconfigureerd die aan routeringscombinaties zijn toegewezen.

**Geschikt voor:** Gemengde context met grote tool.logboeken plus menselijke instructies of samenvattingen van de assistent.

## Stroomopwaartse spaarwiskunde

OmniRoute documenteert compressiebesparingen uit twee bronnen: upstream projectbenchmarks en OmniRoute's eigen motorsamenstelling.

| Bron       | Stroomopwaarts README nummer dat hier wordt gebruikt                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Holbewoner | `~75%` minder uitvoertokens, `65%` benchmark gemiddelde uitvoerbesparingen, `22-87%` bereik en `~46%` -invoercompressietool |
| RTK        | `60-90%` besparingen op commando-uitvoer; voorbeeldsessie `~118,000 -> ~23,900` tokens, of `79.7%` opgeslagen (`~80%`)      |

Voor overlappende tool/context payloads stapelt de standaard OmniRoute combo de motoren:

```txt
RTK -> Caveman
```

De gecombineerde besparingen zijn multiplicatief en niet additief:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Dat `78-95%` nummer is van toepassing wanneer zowel RTK als Caveman dezelfde input/context payload kunnen verminderen. De uitvoermodus voor de reactie van Caveman is afzonderlijk: indien ingeschakeld, gebruik Caveman's eigen outputbesparingen (`65%` gemiddelde, `~75%` -kop, `22-87%` -bereik). De totale factuurbesparing is afhankelijk van uw prompt/output mix.

### Wat ‘in aanmerking komen’ eigenlijk betekent

Het bereik van 15-95% is reëel, maar geldt alleen voor** overbodig of uitgebreid** inhoud — herhaalde foutregels, een buildlogboek dat dezelfde waarschuwing spamt, een te grote `grep`/file-read dump. Dat doet het** niet** betekent dat elk verzoek zoveel bespaart.

Empirisch geverifieerd (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): een `stacked` (RTK + Caveman) loopt tegen een `tool_result` -blok met antropische vorm met 300 geproduceerde identieke foutlijnen** 95,93% tokenbesparingen / 96,26% karakterbesparingen** — vierkant in het geadverteerde bereik. Maar dezelfde pijplijn die tegen normale, niet-redundante tooluitvoer (een schone `grep` matchlijst, een kort gelezen bestand, gewone gesprekstekst) correct produceert** bijna nul besparingen** , omdat er niets repetitiefs hoeft te worden verwijderd en `validateCompression()` (`validation.ts`) weigert een herschrijving te verzenden die codeblokken, URLs, koppen, versies of ALL-CAPS constante ID's zou verwijderen of wijzigen.

Dit is te verwachten, veilig gedrag, geen bug: een codeersessie die voornamelijk bestanden reads/greps, zal een bescheiden totale besparing opleveren, zelfs als de compressie volledig is ingeschakeld, terwijl een sessie die een falende lus of een spraakmakende linter tegenkomt, het volledige bereik van 78-95% op dat verkeer zal zien. Gebruik niet het lage totale besparingspercentage van een enkele sessie, omdat bewijscompressie verkeerd is geconfigureerd — Controleer eerst of de onderliggende tooluitvoer daadwerkelijk overbodig was.

---

## Visualisatie van tokenbesparingen

```
Zonder compressie: 47K tokens naar LLM verzonden
Met Lite:          40K tokens verzonden          (15% bespaard — veilig, altijd actief)
Met Standard:      33K tokens verzonden          (30% bespaard — regels voor holbewonerstaal)
Met Aggressive:    24K tokens verzonden          (50% bespaard — veroudering + samenvatting)
Met Ultra:         12K tokens verzonden          (75% bespaard — heuristisch snoeien)
Met RTK:           19K-5K tokens verzonden       (60-90% bespaard op opdracht-/tooluitvoer)
Met Stacked:       10K-2.5K tokens verzonden     (geschikt RTK+Caveman-bereik van 78-95%)
```

---

## Configuratie

### Dashboard

Navigeer naar `Dashboard → Context & Cache`:

- **Caveman** — modusselectie, taalpakketten, voorbeeldweergave en algemene standaardinstellingen
- **RTK** — voorbeeldweergave van opdrachtfilters, RTK-veiligheidsinstellingen en filtercatalogus
- **Compressiecombinaties** — benoemde engine-pipelines die aan routeringscombinaties zijn toegewezen
- **Drempelwaarde voor automatische activering** — compressie automatisch inschakelen wanneer het aantal tokens de drempelwaarde overschrijdt

### Override per combinatie

Wijs in `Dashboard → Context & Cache → Compression Combos` een compressiecombinatie toe aan een
routeringscombinatie:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Hiermee kun je gestapelde compressie gebruiken voor gratis/coding-providers, terwijl je de lite-modus
op betaalde abonnementen behoudt.

Deze toewijzing van een "Per-Combo Override" is een andere instelling dan de **compressiemodusoverride
voor routeringscombinaties** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — het schema
van het veld accepteert ook `rtk`, `stacked` en `omniglyph`) — die override selecteert geen benoemde
compressiecombinatie-pipeline; deze stelt alleen het veld `compressionMode` in dat door
`resolveCompressionPlan` wordt geraadpleegd. De instelling kan worden ingesteld op de combinatiekaart
(`Dashboard → Combos`) of, sinds #6760, per routeringscombinatie in de lijst "Assign to routing" op
`Dashboard → Context & Cache → Compression Combos`, direct naast het hierboven beschreven selectievakje
voor pipeline-toewijzing. Beide locaties slaan de instelling op via hetzelfde
`PUT /api/combos/{id}`-endpoint.

### Override per aanvraag

Stuur de aanvraagheader `x-omniroute-compression` mee om het compressieplan voor één aanvraag te
overschrijven. Deze heeft de hoogste prioriteit — de header overschrijft de override voor de
routeringscombinatie, het actieve profiel, automatische activering en de standaardinstelling van het
paneel. Onbekende waarden worden genegeerd (de aanvraag wordt nooit afgewezen) en de algemene
hoofdschakelaar blijft voor alles bepalend: wanneer compressie globaal is uitgeschakeld, kan de header
deze niet inschakelen. Waarden:

| Waarde        | Effect                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `off`         | Geen compressie voor deze aanvraag.                                                                                |
| `default`     | Het uit het paneel afgeleide standaardprofiel (negeert het actieve profiel). Lossy-engines blijven uitgeschakeld.  |
| `safe`        | Hetzelfde als wanneer de header wordt weggelaten.                                                                  |
| `allow-lossy` | Behoud het operatorplan voor deze aanvraag, inclusief samenvattingen, relevantiefilters en stijltransformaties.    |
| `engine:<id>` | Eén engine wanneer deze is ingeschakeld, bijvoorbeeld `engine:rtk`. Dit is de opt-in per aanvraag voor die engine. |
| `<combo>`     | Een benoemde combinatie, eerst op naam (hoofdletterongevoelig) en daarna op id gevonden.                           |

Zonder `allow-lossy`, `engine:<id>` of een benoemde combinatie worden lossy-engines niet toegepast.
Wanneer een lossy Default, automatische activering of routeringsoverride wordt gedegradeerd, behoudt
OmniRoute de herkende lossless stappen uit de geconfigureerde gestapelde pipeline, in de
geconfigureerde volgorde. Er wordt alleen teruggevallen op `session-dedup → lite` wanneer geen enkele
geconfigureerde lossless stap behouden blijft.

De voorbeeldweergave **Effective pipeline** van het instellingenpaneel toont het normale plan in
rusttoestand. Wanneer automatische activering kan worden uitgevoerd, toont dezelfde voorbeeldweergave
ook de voorwaardelijke effectieve pipeline, zodat de oplossing in het paneel en zonder header in de
runtime op elkaar afgestemd blijven.

Het toegepaste plan wordt teruggegeven in de antwoordheader
`X-OmniRoute-Compression: <mode>; source=<source>`, waarbij `<source>` een van
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` of `off` is.

### API

```bash
# Compressie-instellingen ophalen
curl http://localhost:20128/api/settings/compression

# Compressie-instellingen bijwerken
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Een specifieke RTK/stacked-payload bekijken
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK-filterpakketten weergeven
curl http://localhost:20128/api/context/rtk/filters

# RTK rechtstreeks testen met optionele opdrachtmetadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Wat wordt beschermd

De compressie-engine **behoudt altijd:**

- ✅ Codeblokken (omheind en inline)
- ✅ URL's en bestandspaden
- ✅ JSON-structuren en gestructureerde gegevens
- ✅ Identificatoren en beschermde technische tokens
- ✅ Wiskundige uitdrukkingen
- ✅ Definities van tool-/functieaanroepen
- ✅ Systeemprompts (in lite-modus)

RTK-raw-outputherstel maskeert veelvoorkomende API-sleutels, bearer-tokens, Slack-tokens, AWS-toegangssleutels,
wachtwoorden, tokens en geheimen voordat er iets wordt opgeslagen.

---

## Compressiestatistieken

Elk gecomprimeerd verzoek bevat statistieken in de serverlogboeken:

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

## Faseroadmap

| Fase    | Modi                                                                                                                                                | Status         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Fase 1  | Uit, Lite                                                                                                                                           | ✅ Uitgebracht |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                         | ✅ Uitgebracht |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                    | ✅ Uitgebracht |
| Fase 4  | Output Styles, SLM-tier Ultra, evaluatieframework                                                                                                   | ✅ Uitgebracht |
| Fase 4C | Adaptief contextbudget ("regelaar") — rekenengine + API (`contextBudget` op `PUT /api/settings/compression`) + dashboardbesturing voor modus/beleid | ✅ Uitgebracht |

---

## Dankwoord

De compressieregels van de Standard-modus zijn geïnspireerd op **[Caveman](https://github.com/JuliusBrussee/caveman)** van **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — het virale project "why use many token when few token do trick". Caveman rapporteert `~75%` minder outputtokens, een gemiddelde outputbesparing van `65%` in benchmarks, een outputbereik van `22-87%` en een tool voor inputcompressie van `~46%`.

De RTK-modus is geïnspireerd op **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** van **[RTK AI](https://github.com/rtk-ai)** — het krachtige project voor compressie van opdrachtoutput voor terminal-, build-, test-, git- en tooloutputfiltering. RTK rapporteert een besparing van `60-90%`, waarbij de voorbeeldsessie in de README een besparing van `~80%` laat zien.

---

## Geavanceerde compressiesystemen

Naast de zeven hierboven beschreven modi (de bron accepteert ook `codex-responses` en `omniglyph` modi, die in deze handleiding niet worden behandeld), behandelen de secties hieronder functies die binnen of naast deze modi werken: Tool Result Compression en Progressive Aging zijn stappen 1 en 2 van de agressieve engine (Agressieve modus en een `aggressive` stap van een gestapelde pijplijn), de Stacked Pipeline is hoe de Stacked-modus werkt, Cache-Aware Compression downgradet `aggressive` en `ultra` naar `standard` voor caching providers terwijl compressie is ingeschakeld, en Caveman Output Mode en Output Styles zijn opt-in systeemprompt-instructies, standaard uitgeschakeld, die de uitvoer van het model vormgeven in plaats van het verzoek te comprimeren.

### Cachebewuste compressie

Sommige providers (zoals Anthropic met prompt caching) ondersteunen** snel cachen** , waarmee ze delen van de prompt in de cache kunnen opslaan om de kosten en latentie te verminderen. Wanneer caching is ingeschakeld, kan agressieve compressie daadwerkelijk plaatsvinden** pijn doen** prestaties omdat het de in de cache opgeslagen tokens verandert, waardoor de cache ongeldig wordt.

De `cachingAware.ts` module lost dit op door** cachingcontext detecteren** En** het aanpassen van de compressiestrategie** overeenkomstig.

#### Hoe het werkt

1. **Cachingcontext detecteren** — Scant de hoofdtekst van het verzoek op `cache_control` -markeringen
2. **Identificeer cachingproviders** — Controleert of de doelprovider caching ondersteunt
3. **Strategie aanpassen** — Downgradet `aggressive`/`ultra` naar `standard` voor cachingproviders
4. **Systeemprompt overslaan** — Systeemprompts worden meestal in de cache opgeslagen, dus comprimeer ze niet

De strategiehelper retourneert ook een `deterministicOnly` vlag, maar de planbouwer gebruikt alleen de strategie — niets stroomafwaarts leest vandaag de vlag.

#### Codevoorbeeld

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

#### Wanneer te gebruiken

Cachebewuste compressie is dat wel** altijd aan** — geen configuratie nodig. Het treedt in werking wanneer compressie is ingeschakeld en de doelprovider prompt caching ondersteunt (Anthropic, OpenAI, enz.); expliciete `cache_control` markeringen zijn niet vereist — alleen een cachingprovider activeert de downgrade, en markers alleen doen dat nooit (markeringsdetectie voedt cachetelemetrie, niet de strategiebeslissing).

OpenRouter geldt alleen als cachingprovider voor `anthropic/*` modellen: Claude -codeverzoeken behouden hun `cache_control` breekpunten (maximaal 4) en de bewaker beschermt het voorvoegsel, terwijl elke andere OpenRouter familie (`openai/`, `google/`, `qwen/`, ...) gestript en onbewaakt blijft.

### Progressief ouder worden

Bij lange gesprekken worden veel berichtenwisselingen verzameld, maar oudere gesprekken worden minder relevant. De `progressiveAging.ts` module** degradeert berichten op basis van de beurtafstand** (afstand gemeten vanaf het einde van het gesprek). Met de verzonden standaardwaarden (`verbatim: 2, light: 2, moderate: 3`):

- **Laatste 2 beurten (afstand ≤ 2)** : Letterlijk bewaard
- **Afstand 3** : Caveman-compressie (verwijdering van vulmiddel)
- **Afstand 4 +** : Assistent-berichten samengevat; gebruikersberichten teruggebracht tot de eerste regel, met een maximum van 120 tekens; andere rollen onaangeroerd. Systeemprompts, reeds verouderde berichten en het laatste gebruikersbericht worden altijd woordelijk weergegeven, ongeacht de afstand. Er wordt niets meteen weggelaten, en de `light` band is onbereikbaar met de standaardwaarden (`light` is gelijk aan `verbatim`).

#### Codevoorbeeld

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

#### Wanneer te gebruiken

Progressief ouder worden wel** altijd aan** voor `aggressive` modus — is dit stap 2 van `compressAggressive()`. Ultra-modus voert het niet uit. Het is vooral effectief voor:

- Langdurige codeersessies
- Meerdaagse gesprekken
- Agentische workflows met veel tooloproepen

### Holbewoner-uitvoermodus

Caveman-uitvoermodus voegt toe** systeempromptinstructies** die het model zelf om beknopte uitvoer vragen — het `lite` -niveau vraagt om beknopte antwoorden die volledige zinnen bevatten, `full` vraagt het om "kort te reageren als een slimme holbewoner", en `ultra` vraagt om telegrafische uitvoer; instructies vragen alleen maar, ze kunnen het niet garanderen. Verzoeken ontvangen ze via `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` lost eerst de selectie op met de back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), die, terwijl `outputStyles` leeg is, een ingeschakelde `cavemanOutputMode` toewijst aan de `terse-prose` uitvoerstijl op `cavemanOutputMode.intensity` (zie Back-compat hieronder); een niet-lege `outputStyles` selectie wordt gebruikt zoals hij is, en `cavemanOutputMode.enabled` en `intensity` hebben dan geen effect, terwijl de `autoClarity` schakelaar nog steeds van toepassing is. `outputMode.ts` bevat de instructieteksten (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), de content bypass en de plaatsingshulp die injection gebruikt; zijn eigen `applyCavemanOutputMode()` injector heeft geen productie-caller.

#### Hoe het werkt

Deze modus comprimeert de invoer niet. Het voegt een instructieblok toe aan de systeemprompt (zie Hoe injectie werkt hieronder), en elke invoercompressiemodus die voor het verzoek is geselecteerd, wordt daarna nog steeds uitgevoerd op de body die nu het blok draagt. Voorafgaand aan de gedeelde grenzenclausule waarmee elk niveau eindigt, luidt het Engelse `full` niveau:

> "Reageer bondig als een slimme holbewoner. Laat artikelen vallen (a/an/the), filler (just/really/basically/actually/simply), beleefdheden, hedging. Fragmenten OK. Korte synoniemen (groot niet uitgebreid, oplossing niet geïmplementeerd). Houd alle technische inhoud, code, fouten, URLs, identificatiegegevens exact."

Dit werkt vooral goed voor:

- Codegeneratie (terseruitvoer = minder tokens)
- Snelle vraag-en-antwoordsessie (geen uitgebreide uitleg nodig)
- Batchverwerking (maximaliseer de doorvoer)

#### Wanneer te gebruiken

Caveman-uitvoermodus is** aanmelden** . Als compressie is ingeschakeld (`enabled: true`, de hoofdschakelaar op de pagina Compressie-instellingen), zet u deze aan met `cavemanOutputMode.enabled`; `intensity` kiest `lite`, `full` of `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Een compressiecombo** Uitvoermodus** toggle (`outputMode`, level in `outputModeIntensity`) stelt dezelfde schakelaar in voor de verzoeken waarop combo van toepassing is, en de `omniroute_set_compression_engine` MCP tool schrijft dit via zijn booleaanse `outputMode` argument. Een niet-lege `outputStyles` selectie heeft voorrang op deze schakelaar. In het dashboard schakelt u de** Kort proza** output style injecteert hetzelfde blok (zie Output Styles hieronder).

### Uitvoerstijlen (catalogus)

Caveman-uitvoermodus hierboven is de** verouderd pad met één stijl** . Fase 4 generaliseerde het in een catalogus van samenstelbare uitvoerstijlen: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Elke stijl is een systeemprompt-instructie die het model zelf om goedkopere uitvoer vraagt; stijlen kunnen samen worden ingeschakeld en worden in catalogusvolgorde geïnjecteerd.

| Stijl                                    | `id`            | Wat het doet                                                                                                                                                                                                                                               | Instructie talen                              |
| ---------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Kort proza                               | `terse-prose`   | Laat filler/articles/hedging vallen; houd de technische inhoud exact. Dezelfde tekst als de oude uitvoermodus van de holbewoner (waarnaar wordt verwezen, niet opnieuw getypt).                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Minder code                              | `less-code`     | YAGNI ladder: kleinste werkverandering, geen ongevraagde abstracties.                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Paardenstaart (luie senior ontwikkelaar) | `ponytail`      | "De beste code is de code die nooit is geschreven": hergebruik > herschrijven, hoofdoorzaak > symptoom, kortste werkende diff.                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ik heb ADHD (eerst actie)                | `i-have-adhd`   | Eerst actie (command/path/snippet vóór proza), genummerde begrensde stappen, ONE concrete volgende stap, geen preamble/recap/closers. Overgenomen van [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislip UI filter                       | `antislop-ui`   | Elke visuele techniek moet een doeltest doorstaan (hiërarchie, identiteit, leesbaarheid); geen standaard gradients/glass/glow, afgedekt palet, geen sjabloonlay-outs. Beide antislop-stijlen voegen een no-dead-controls / no-fabricated-claims-grens toe. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-kopie en menselijk filter       | `antislop-copy` | Specifieke kopie (geen em-streepje, generieke CTAs, buzzwords, chatbot-sluiters, verzonnen feiten) plus mensenregels: WCAG AA contrast, zichtbare focus, toetsenbordbereik, empty/loading/error -statussen, mobiele reflow.                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kort CJK (文言)                          | `terse-cjk`     | `full`/`ultra` antwoord in Klassiek Chinees (文言); `lite` vraagt alleen om korte antwoorden, zonder functiewoorden, beleefdheden of verfraaiing.                                                                                                          | zh (locale-gated, zie hieronder)              |

Elke stijl heeft drie intensiteitsniveaus — `lite`, `full`, `ultra` — en elk niveau eindigt met de gedeelde grenzenclausule (`SHARED_BOUNDARIES` in `outputMode.ts`), die codeblokken, bestandspaden, opdrachten, fouten en URLs exact houdt. De teksten `terse-prose` en `terse-cjk` niveau voegen identificatiegegevens toe aan die lijst.

`terse-cjk` is op twee plaatsen locale-gated naar `zh`. Op de pagina Compressie-instellingen wordt de rij alleen weergegeven als de UI -taal van het dashboard Chinees is (`zh-CN` of `zh-TW`), en `applyOutputStyles()` injecteert deze alleen als de opgeloste taal van het verzoek (zie Taalselectie hieronder) `zh` is. Het verbergen van de rij wist een opgeslagen `terse-cjk` selectie niet: de instellingen API accepteert elke stijl-ID, en het opslaan van andere stijlen op de pagina behoudt deze. Op verzoekstijd is de `applyOutputStyles()` taalcontrole de enige locale-poort.

#### Hoe injectie werkt

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) lost de selectie op aan de hand van de catalogus (onbekende id's en niet-overeenkomende stijlen met locale worden verwijderd, nooit een fout; een selectie die naar geen stijl wordt omgezet, laat de hoofdtekst ongewijzigd, overgeslagen als `no_styles`), voegt de geselecteerde instructies samen in catalogusvolgorde, voegt de grensclausule toe** eenmaal** (plus de veiligheidsclausule, `SAFETY_BOUNDARIES` of de vertaling ervan, wanneer `less-code` of `ponytail` is geselecteerd), en start het blok met een enkele idempotentiemarkering (`[OmniRoute Output Styles]`), dus opnieuw toepassen is een no-op. Wanneer de opgeloste taal (zie Taalselectie hieronder) een vertaling heeft, wordt de gelokaliseerde instructie geïnjecteerd in plaats van het Engels.

Op een body met een niet-lege `messages` array wordt de idempotency-controle uitgevoerd voordat de inhoud wordt omzeild: wanneer de `[OmniRoute Output Styles]` markering zich al in het `system` veld op het hoogste niveau bevindt (een string of een content-block-array) of in een systeembericht met string-inhoud, blijft de body ongewijzigd als `already_applied` en wordt er geen trefwoordcontrole uitgevoerd. Anders controleert een content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) de tekst van de laatste drie berichten, ongeacht hun rol, en slaat de stijlen voor de hele beurt over wanneer die tekst overeenkomt met de trefwoorden voor beveiliging, onomkeerbare actie of verduidelijking, of een volgordegevoelige reeks: `first`, `then`, `after that`, `before`, `rollback` of `backup` gevolgd binnen 240 tekens door `delete`, `drop`, `migrate`, `deploy` of `release`. De bypass loopt terwijl de** Automatische helderheidsbypass** toggle (`cavemanOutputMode.autoClarity`, standaard aan) is ingeschakeld; Als u de schakelaar uitschakelt, wordt de trefwoordcontrole overgeslagen.

Wanneer de bypass de doorgang doorlaat, plaatst `placeSystemInstruction()` (hetzelfde bestand), dat nooit een nieuwe `messages[0]` aanmaakt, het blok in de eerste van deze die het vindt:

1. Een leidend systeembericht met stringinhoud: het blok wordt achter de tekst toegevoegd.
2. Het `system` veld op het hoogste niveau: het blok wordt toegevoegd na de tekst van een string, of toegevoegd als een nieuw tekstblok aan een content-block-array.
3. Het eerste latere systeembericht met stringinhoud: het blok wordt achter de tekst toegevoegd.
4. Geen van bovenstaande: het blok gaat aan het einde van `messages` in een nieuw systeembericht.

Op een body zonder `messages` array (of met een lege array) wordt er geen content-bypass uitgevoerd en wordt een `system` veld op het hoogste niveau niet geraadpleegd. Het blok wordt toegevoegd na de tekst van een string `instructions` veld, tenzij dat veld al de `[OmniRoute Output Styles]` markering bevat, in welk geval de body ongewijzigd blijft als `already_applied`. Wanneer de body geen string `instructions` veld heeft maar `input` (een string of een array) bevat, wordt het blok `instructions` en vervangt het elke niet-stringwaarde die dat veld bevat. Een lichaam zonder een string `instructions` veld, noch een string of array `input` blijft ongewijzigd en wordt overgeslagen als `no_messages`.

#### Hoe in te schakelen

In het dashboard:** Compressiecontext → Compressie-instellingen** (`/dashboard/context/settings`), Sectie Uitvoerstijlen: één rij per stijl met een on/off schakelaar en een niveaukiezer. Stijlen worden geïnjecteerd terwijl de compressie zelf is ingeschakeld (de hoofdschakelaar van de pagina, `enabled`). De** Automatische helderheidsbypass** schakelaar staat op** Holbewoner** pagina (`/dashboard/context/caveman`), in zijn** Uitvoermodus** kaart. Programmatisch blijft de compressieconfiguratie de selectie behouden als:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: terwijl `outputStyles` leeg is, wordt de oude `cavemanOutputMode.enabled` -instelling toegewezen aan `terse-prose` op `cavemanOutputMode.intensity`. Het blok begint dan met de `[OmniRoute Output Styles]` markering, waar de oudere `applyCavemanOutputMode()` injector `[OmniRoute Caveman Output Mode]` schreef. Onder de markering komt de tekst overeen met de oude injectie in en, pt-BR, es, de, fr, it, ru, id en vi; in ja en zh staat er één extra spatie vóór de grenzenclausule. `terse-prose` vertaalt zich in pt-BR, es, de, fr, it, ru, zh, ja, id en vi, dus een verzoek waarvan de opgeloste taal `hu` is, krijgt de Engelse tekst waarin de oude injector zijn Hongaarse tekst gebruikte.

Taalselectie in uitvoerstijl (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): met `languageConfig.enabled` aan, bemonstert `autoDetect` het laatste gebruikersbericht in de `messages` array van het verzoek dat tekst bevat (tekenreeksinhoud, of de `text` van de inhoudsdelen ervan) en voert de detector van de Caveman-engine (`detectCompressionLanguage()`) daarop uit. De detector retourneert `zh` voor tekst met Han-tekens en zonder kana; anders retourneert het welke van `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` en `id` de meeste hintovereenkomsten heeft, en `en` wanneer geen enkele overeenkomt met — tekst die niet kan worden geclassificeerd, wordt Engels, nooit `defaultLanguage` en `vi` wordt nooit gedetecteerd, hoewel de stijlen `vi` -tekst verzenden. Een API body van Responses behoudt zijn beurten in `input`, die niet wordt bemonsterd, dus het krijgt `defaultLanguage` en vervolgens Engels. Als geen enkel gebruikersbericht in `messages` tekst bevat, of als `autoDetect` uitgeschakeld is, is `defaultLanguage` van toepassing, daarna Engels. Als `languageConfig.enabled` is uitgeschakeld, is de taal — Engels, tenzij een compressiecombo van toepassing is op het verzoek (een combo die is toegewezen aan de routeringscombo van het verzoek, of de standaard compressiecombo waar chatCore op terugvalt voor de ingebouwde gestapelde pijplijn): door een combo toe te passen wordt `languageConfig.enabled` ingeschakeld voor dat verzoek en wordt `defaultLanguage` ingesteld op basis van de taalpakketten van de combo (de opgeslagen waarde als het een van de combopakketten is, anders het eerste pakket van de combo, dat standaard `en` is), terwijl de opgeslagen waarde `autoDetect` (standaard ingeschakeld) is nog steeds van toepassing. De Caveman-invoerengine kiest de taal van het regelpakket verschillend — per tekstgedeelte en, met automatische detectie uitgeschakeld, op `enabledPacks`.

De stijl × taalmatrix wordt vastgezet door `tests/unit/compression/output-styles-i18n-matrix.test.ts`: elke catalogusstijl heeft een vermelding nodig in de `BASELINE_LANGUAGES` van de test; een stijl die niet locale-gated is, moet een pt-BR-vertaling leveren (de locale-gated `terse-cjk` is vrijgesteld van deze regel), tenzij deze wordt vermeld in `KNOWN_ENGLISH_ONLY`, die alleen stijlen kan bevatten zonder helemaal geen vertalingen — een vermelde stijl die enige vertaling heeft, slaagt niet voor de test; en een stijl faalt in de test wanneer deze een taal verliest die in `BASELINE_LANGUAGES` -invoer wordt vermeld. Zie [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) om een stijl toe te voegen.

### Compressie van gereedschapsresultaten

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts` comprimeert tool-resultaattekst met** 5 strategieën** . Het probeert ze in deze volgorde, en de eerste ingeschakelde strategie waarvan de controle overeenkomt met de inhoud bepaalt het resultaat:

1. **`fileContent`** : inhoud van 3 of meer regels waarin ten minste één regel, waarbij de voorafgaande inspringing wordt genegeerd, begint met `import `, `export `, `function `, `class `, `const `, `let `, `var ` of `return ` (het trefwoord plus een spatie), of met `if`, `for` of `while` gevolgd door `(` of ` (`, waarbij de eerste 20 en laatste 5 regels behouden blijven, waarbij het midden is weggelaten.
2. **`grepSearch`** : inhoud met ten minste één regel van de vorm `<path>:<digits>:`, waarbij de tekst vóór de eerste dubbele punt geen witruimte heeft, behoudt alleen die regels, maximaal 30, gevolgd door een telling van eventuele verdere overeenkomsten en de lijst met overeenkomende bestanden; elke andere regel valt weg. Eén zo'n regel is voldoende om de strategie te activeren, dus een logregel die begint met een tijdstempel zoals `12:30:45` telt ook.
3. **`shellOutput`** : uitvoer die een ANSI CSI reeks bevat (`ESC[` dan cijfers of puntkomma's en dan een letter, zoals in kleurcodes) of een `$` gevolgd door witruimte ergens in de tekst, verliest die reeksen (andere ontsnappingen, zoals `ESC[?25l` of een OSC -venstertitelreeks, blijven behouden) en behoudt de laatste 50 regels, met opeenvolgende herhaalde regels samengevouwen. Omdat deze controle vóór `json` en `errorMessage` wordt uitgevoerd, bereikt JSON of foutuitvoer die een dergelijke `$` bevat deze nooit terwijl `shellOutput` is ingeschakeld.
4. **`json`** : een JSON payload van meer dan 2.000 tekens die begint met `{` of `[` (na optionele witruimte) en wordt geparseerd: een array van meer dan 7 items behoudt de eerste 5 en laatste 2 items en het totale aantal, en een object behoudt de eerste 20 sleutels, waarbij elk genest object of elke arraywaarde wordt vervangen door een `{…N keys}` placeholder (voor een array is N de lengte ervan) en een `_remaining_<N>_keys` markering die de sleutels telt die voorbij de eerste 20 zijn gevallen. Scalaire waarden worden in hun geheel gekopieerd, dus een object van 20 sleutels of minder zonder geneste waarden wordt alleen opnieuw ingesprongen — een verkleind object tekens krijgt en ongewijzigd blijft.
5. **`errorMessage`** : uitvoer die, overal en in elke hoofdletter, `error:`, `error ` (het woord gevolgd door een spatie, zoals in `no error found`), `[error]`, `exception:`, `exception `, `[exception]` of `traceback` bevat, behoudt de eerste regel, de volgende 10 regels en de laatste 3, met een `… [N frames elided] …` markering in plaats van de regels ertussen. De markering verschijnt alleen als er meer dan 13 regels de eerste regel volgen, dus de foutuitvoer van 14 regels of minder wordt niet ingekort (bij 12 of 13 regels blijven de laatste 3 herhaalde regels al behouden).

Nadat een strategie overeenkomt, zelfs als er niets wordt bespaard, worden de latere strategieën niet geprobeerd. Wanneer de matchingstrategie geen geschatte tokens opslaat (lengte ÷ 4, afgerond naar boven) — bijvoorbeeld een codeachtig bestand van 25 regels of minder, of een JSON array van meer dan 2.000 tekens met 7 items of minder — behoudt de agressieve engine het oorspronkelijke toolresultaat: beide bellers (`compressAggressive()` en `compressAnthropicToolResultBlock()`) behouden het origineel wanneer `saved` 0 of lager is, terwijl `compressToolResult()` zelf nog steeds de uitvoer van die strategie retourneert. De tool-resultaatstap is niet het laatste woord: de fallback-samenvatting van de engine kan nog steeds een `tool` of `function` bericht inkorten dat langer is dan 8.192 tekens (`maxTokensPerMessage`, 2.048, maal 4).

#### Wanneer te gebruiken

Compressie van gereedschapsresultaten is stap 1 van de agressieve engine (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), dus deze draait in de agressieve modus en in een `aggressive` stap van een gestapelde pijplijn. Het comprimeert OpenAI-vormige `tool` en `function` berichten en de tekst binnen Anthropic `tool_result` blokken. Elke strategie heeft zijn eigen schakelaar onder `aggressive.toolStrategies`, die standaard allemaal aanstaat. In het dashboard bevinden de schakelaars zich op de Caveman-pagina's** Geavanceerd** bekijken terwijl de compressie is ingeschakeld en de standaardmodus Agressief is.

### Gestapelde pijpleiding

De gestapelde modus wordt uitgevoerd** meerdere motoren achter elkaar** — meestal eerst RTK (60-90% besparing op gereedschapsuitvoer), daarna Caveman op de resterende tekst (~ 46% invoerbesparing). Samengesteld, dat is de** In aanmerking komend bereik van 78-95%** (zie Upstream Savings Math hierboven): `1 - (1 - 0.60..0.90) × (1 - 0.46)` gemiddeld ≈ 89%.

#### Hoe het werkt

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Wanneer te gebruiken

Gebruik de gestapelde modus voor:

- Gereedschapsintensieve workflows (agentische codering, onderzoek)
- Kostengevoelige batchverwerking
- Wanneer u maximale tokenbesparingen nodig heeft

Gestapelde pijplijnen worden geconfigureerd via de globale `stackedPipeline` -compressie-instelling, of via een benoemde compressiecombo die is toegewezen aan een routeringscombo (zie Per-Combo Override hierboven). — niet via een auto-combo `modePack` (dat veld weegt alleen de auto-combo-modelselectie opnieuw, en `stacked` is geen geldige pakketnaam).

---

## Overschrijvingen voor compressiecombo's

Je kunt de globale compressiemodus **per combo** overschrijven om het gedrag
voor verschillende gebruikssituaties nauwkeurig af te stemmen:

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

Dit is nuttig voor:

- **Codeercombo's**: gebruik de modus `aggressive` voor lange sessies
- **Combo's voor snelle vragen en antwoorden**: gebruik de modus `lite` voor snelle antwoorden
- **Combo's met veel tools**: gebruik de modus `stacked` voor maximale besparingen
- **Productiecombo's**: laat de overschrijving uitgeschakeld voor cachingproviders — de altijd actieve
  cachebewuste aanpassing verlaagt `aggressive`/`ultra` automatisch naar `standard`
  (er is geen selecteerbare modus `cache-aware`)

---

## Zie ook

- [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Omgevingsvariabelen voor compressie
- [Architectuurgids](../architecture/ARCHITECTURE.md) — Interne werking van de compressiepijplijn
- [Gebruikershandleiding](../guides/USER_GUIDE.md) — Aan de slag met compressie
- [RTK-compressie](./RTK_COMPRESSION.md) — RTK-filters, vertrouwensmodel, verificatiepoort en herstel van onbewerkte uitvoer
- [Compressie-engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API's, MCP en dashboard
- [Indeling van compressieregels](./COMPRESSION_RULES_FORMAT.md) — JSON-indeling voor regelpakketten
- [Taalpakketten voor compressie](./COMPRESSION_LANGUAGE_PACKS.md) — Taalspecifieke Caveman-regels
