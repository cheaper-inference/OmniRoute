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

Er wordt geen compressie toegepast. Alle berichten worden ongewijzigd doorgegeven.

### Lite-modus (~15% besparing, <1ms latentie)

De veiligste modus — geen semantische wijzigingen, alleen opschoning van de opmaak:

| Techniek                 | Beschrijving                                                 |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | Opeenvolgende lege regels en afsluitende spaties samenvoegen |
| `dedupSystemPrompt`      | Dubbele systeemberichten verwijderen                         |
| `compressToolResults`    | Uitgebreide tool-/functie-uitvoer comprimeren                |
| `removeRedundantContent` | Herhaalde instructies verwijderen                            |
| `replaceImageUrls`       | URI's met base64-afbeeldingsgegevens inkorten                |

**Het meest geschikt voor:** Permanent gebruik en veiligheidskritieke workflows.

### Standard-modus (~30% besparing)

Geïnspireerd door [Caveman](https://github.com/JuliusBrussee/caveman) — verwijdert opvulwoorden en omslachtige formuleringen met behoud van de betekenis:

- Verwijdert opvulwoorden ("alstublieft", "ik denk", "eigenlijk", "feitelijk")
- Kort omslachtige zinnen in ("met als doel om" → "om", "als gevolg van" → "omdat")
- Verwijdert beleefde afzwakkingen ("Zou je...", "Als je misschien zou kunnen...")
- Meer dan 30 regex-regels, afgestemd op programmeerprompts

**Het meest geschikt voor:** Dagelijkse programmeerworkflows en kostenbewuste teams.

### Aggressive-modus (~50% besparing)

Slim geschiedenisbeheer voor lange sessies:

- **Berichtveroudering** — oudere berichten worden steeds verder gecomprimeerd
- **Compressie van toolresultaten** — lange tooluitvoer wordt afgekapt of weggelaten (eerste/laatste regels,
  filtering op overeenkomende regels, compactie van JSON-sleutels)
- **Bewaking van structurele integriteit** — zorgt ervoor dat paren van `tool_use` en `tool_result` consistent blijven
- **Bewustzijn van het contextvenster** — houdt rekening met tokenlimieten per model

**Het meest geschikt voor:** Langdurige debugsessies en grote codebases.

### Ultra-modus (~75% besparing)

Maximale compressie voor scenario's waarin tokens van cruciaal belang zijn:

- **Heuristisch snoeien** — scoregebaseerd snoeien van tokens uit lopende tekst
- **Structuurbehoud** — omheinde codeblokken, inlinecode, URL's en identifiers worden
  gemarkeerd en later letterlijk teruggeplaatst; ze worden nooit gesnoeid
- **Optionele SLM-laag** — een klein lokaal model kan het snoeiresultaat verfijnen wanneer dit is geconfigureerd
- Onafhankelijk van de Aggressive-modus: berichtveroudering, compressie van toolresultaten
  en de fallback-samenvatter worden niet uitgevoerd (alleen een fout in de SLM-laag kan een fallback-pass via
  Aggressive laten verlopen)

**Het meest geschikt voor:** Wanneer je herhaaldelijk contextlimieten bereikt.

### RTK-modus (upstreambereik van 60-90%)

De RTK-modus is geoptimaliseerd voor uitgebreide tooluitvoer die voorkomt in sessies met programmeeragents:

- Detecteert opdracht-/uitvoerklassen zoals `git status`, `git diff`, `git log`, testrunners,
  TypeScript/Vite/Webpack-builds, ESLint/Biome/Prettier, npm-audits/-installaties, Docker-logs, infra-
  uitvoer en generieke shelluitvoer
- Past JSON-filterpakketten toe uit `open-sse/services/compression/engines/rtk/filters/`
- Importeert RTK-filters met TOML-schema v1 uit project- of globale `filters.toml`-bestanden, met validatie
  via inline-tests en vertrouwenscontrole voor projectbestanden
- Wordt geleverd met 55 ingebouwde filters en inline-verificatievoorbeelden
- Verwijdert ANSI-besturingsreeksen, voortgangsbalken, herhaalde regels en niet-relevante ruis
- Behoudt mislukkingen, fouten, waarschuwingen, gewijzigde bestanden, samenvattingen en het einde van lange uitvoer
- Ondersteunt projectfilters met vertrouwenscontrole, globale filters en optioneel herstel van geredigeerde onbewerkte uitvoer

**Het meest geschikt voor:** Agentsessies met shell-, build-, test-, git-, grep- en bestandsuitvoertranscripten.

### Stacked-modus (geschikt bereik van 78-95%)

De Stacked-modus voert meerdere compressie-engines in een deterministische volgorde uit. De standaardpipeline is:

```txt
RTK -> Caveman
```

Door die volgorde wordt terminal-/tooluitvoer eerst compact gemaakt, waarna Caveman semantische condensatie toepast op
de resterende prompt in natuurlijke taal. Stacked-pipelines kunnen globaal worden geconfigureerd of via
compressiecombo's die aan routeringscombo's zijn toegewezen.

**Het meest geschikt voor:** Gemengde context met grote toollogs in combinatie met menselijke instructies of assistentsamenvattingen.

---

## Berekening van upstreambesparingen

OmniRoute documenteert compressiebesparingen uit twee bronnen: benchmarks van upstreamprojecten en
de eigen enginecompositie van OmniRoute.

| Bron    | Getal uit de upstream-README dat hier wordt gebruikt                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` minder uitvoertokens, gemiddeld `65%` uitvoerbesparing in benchmarks, een bereik van `22-87%` en een tool met `~46%` invoercompressie |
| RTK     | `60-90%` besparing op opdrachtuitvoer; voorbeeldsessie van `~118,000 -> ~23,900` tokens, oftewel `79.7%` bespaard (`~80%`)                   |

Voor overlappende tool-/contextpayloads stapelt de standaardcombinatie van OmniRoute de engines:

```txt
RTK -> Caveman
```

De gecombineerde besparingen zijn multiplicatief, niet additief:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Dat getal van `78-95%` is van toepassing wanneer zowel RTK als Caveman dezelfde invoer-/contextpayload
kunnen verkleinen. De uitvoermodus voor Caveman-antwoorden staat hiervan los: gebruik, wanneer deze is
ingeschakeld, de eigen uitvoerbesparingen van Caveman (gemiddeld `65%`, ongeveer `75%` als hoofdgetal,
bereik van `22-87%`). De totale factureringsbesparing hangt af van uw verhouding tussen prompts en uitvoer.

### Wat "geschikt" daadwerkelijk betekent

Het genoemde bereik van 15-95% is reëel, maar geldt alleen voor **redundante of breedsprakige** inhoud —
herhaalde foutregels, een buildlog die steeds dezelfde waarschuwing spamt, een buitensporig grote
`grep`-uitvoer of bestandsuitlezing. Het betekent **niet** dat elk verzoek zoveel bespaart.

Empirisch geverifieerd (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): een
`stacked`-uitvoering (RTK + Caveman) op een Anthropic-vormig `tool_result`-blok met 300 identieke
foutregels leverde **95.93% tokenbesparing / 96.26% tekenbesparing** op — precies binnen het geadverteerde
bereik. Maar dezelfde pijplijn toegepast op normale, niet-redundante tooluitvoer (een nette lijst met
`grep`-overeenkomsten, een korte bestandsuitlezing, gewone gesprekstekst) levert terecht **vrijwel geen
besparing** op, omdat er niets repetitiefs te verwijderen valt en `validateCompression()`
(`validation.ts`) weigert een herschrijving te versturen die codeblokken, URL's, koppen, versies of
constante-identificatoren in HOOFDLETTERS zou weglaten of wijzigen.

Dit is verwacht, veilig gedrag en geen bug: een programmeersessie waarin voornamelijk nette bestanden
worden gelezen of met grep doorzocht, zal zelfs met volledig ingeschakelde compressie een bescheiden
totale besparing opleveren, terwijl een sessie die in een falende lus terechtkomt of een breedsprakige
linter gebruikt, voor dat verkeer het volledige bereik van 78-95% zal bereiken. Gebruik het lage
totale besparingspercentage van één sessie niet als bewijs dat compressie verkeerd is geconfigureerd —
controleer eerst of de onderliggende tooluitvoer daadwerkelijk redundant was.

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
- **RTK** — voorbeeldweergave van commandofilters, RTK-veiligheidsinstellingen en filtercatalogus
- **Compressiecombinaties** — benoemde engine-pijplijnen die aan routeringscombinaties zijn toegewezen
- **Drempelwaarde voor automatisch activeren** — activeert automatisch compressie wanneer het aantal tokens de drempelwaarde overschrijdt

### Overschrijving per combinatie

Wijs in `Dashboard → Context & Cache → Compression Combos` een compressiecombinatie toe aan een
routeringscombinatie:

```txt
Combinatie: "free-tier-fallback"
  Compressiecombinatie: "coding-agent-stack"
  Pijplijn: RTK -> Caveman
  Doelen:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Hiermee kunt u gestapelde compressie gebruiken voor gratis/codeerproviders, terwijl de lite-modus
behouden blijft voor betaalde abonnementen.

Deze toewijzing via "Overschrijving per combinatie" is een andere instelling dan de overschrijving
van de **compressiemodus van de routeringscombinatie** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — het schema van het veld
accepteert ook `rtk`, `stacked` en `omniglyph`) — die overschrijving selecteert geen benoemde
pijplijn voor een compressiecombinatie; deze stelt alleen het veld `compressionMode` in dat door
`resolveCompressionPlan` wordt geraadpleegd. Dit kan worden ingesteld op de combinatiekaart
(`Dashboard → Combos`) of, sinds #6760, per routeringscombinatie in de lijst "Assign to routing" op
`Dashboard → Context & Cache → Compression Combos`, direct naast het selectievakje voor
pijplijntoewijzing dat hierboven is beschreven. Beide interfaces slaan hun instellingen op via
hetzelfde eindpunt `PUT /api/combos/{id}`.

### Overschrijving per aanvraag

Stuur de aanvraagheader `x-omniroute-compression` om het compressieplan voor één aanvraag te
overschrijven. Deze heeft de hoogste prioriteit — hij heeft voorrang op de overschrijving van de
routeringscombinatie, het actieve profiel, automatische activering en de paneelinstelling Default.
Onbekende waarden worden genegeerd (de aanvraag wordt nooit afgewezen) en de algemene hoofdschakelaar
blijft altijd bepalend: wanneer compressie algemeen is uitgeschakeld, kan de header deze niet
inschakelen. Waarden:

| Waarde        | Effect                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Geen compressie voor deze aanvraag.                                                                                               |
| `default`     | Het uit het paneel afgeleide Default-profiel (negeert het actieve profiel). Compressie-engines met verlies blijven uitgeschakeld. |
| `safe`        | Hetzelfde als het weglaten van de header: alleen deduplicatie en het samenvoegen van witruimte.                                   |
| `allow-lossy` | Behoud het operatorplan van deze aanvraag, inclusief samenvattingen, relevantiefilters en stijlherschrijvingen.                   |
| `engine:<id>` | Eén engine indien ingeschakeld, bijvoorbeeld `engine:rtk`. Hiermee wordt die engine voor deze aanvraag geactiveerd.               |
| `<combo>`     | Een benoemde combinatie, eerst vergeleken op naam (hoofdletterongevoelig) en daarna op id.                                        |

Zonder `allow-lossy`, `engine:<id>` of een benoemde combinatie worden compressie-engines met verlies
niet toegepast. De aanvraag krijgt nog steeds sessiededuplicatie en samenvoeging van witruimte
wanneer compressie is ingeschakeld.

Het toegepaste plan wordt teruggestuurd in de responseheader
`X-OmniRoute-Compression: <mode>; source=<source>`, waarbij `<source>` een van `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` of `off` is.

### API

```bash
# Compressie-instellingen ophalen
curl http://localhost:20128/api/settings/compression

# Compressie-instellingen bijwerken
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Voorbeeld van een specifieke RTK/stacked-payload bekijken
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK-filterpakketten weergeven
curl http://localhost:20128/api/context/rtk/filters

# RTK rechtstreeks testen met optionele commandometadata
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

Naast de 7 hierboven beschreven modi (de bron accepteert ook de modi `codex-responses` en
`omniglyph`, die niet in deze handleiding worden behandeld), bespreken de onderstaande secties functies
die binnen of naast deze modi werken: Compressie van toolresultaten en progressieve veroudering
zijn stap 1 en 2 van de agressieve engine (de modus Aggressive en een `aggressive`-stap van een
gestapelde pijplijn), de gestapelde pijplijn bepaalt hoe de modus Stacked wordt uitgevoerd, cachebewuste compressie
schaalt `aggressive` en `ultra` terug naar `standard` voor cachingproviders terwijl compressie
is ingeschakeld, en Caveman-uitvoermodus en uitvoerstijlen zijn optionele systeempromptinstructies,
standaard uitgeschakeld, die de uitvoer van het model vormgeven in plaats van het verzoek te comprimeren.

### Cachebewuste compressie

Sommige providers (zoals Anthropic met promptcaching) ondersteunen **promptcaching**,
waarmee ze delen van de prompt in de cache kunnen opslaan om kosten en latentie te verlagen. Wanneer
caching is ingeschakeld, kan agressieve compressie de prestaties juist **verslechteren**
omdat daarmee de gecachte tokens worden gewijzigd en de cache ongeldig wordt.

De module `cachingAware.ts` lost dit op door **de cachingcontext te detecteren** en
**de compressiestrategie dienovereenkomstig aan te passen**.

#### Hoe het werkt

1. **Cachingcontext detecteren** — Scant de requestbody op `cache_control`-markeringen
2. **Cachingproviders identificeren** — Controleert of de doelprovider caching ondersteunt
3. **Strategie aanpassen** — Schaalt `aggressive`/`ultra` terug naar `standard` voor cachingproviders
4. **Systeemprompt overslaan** — Systeemprompts worden doorgaans gecachet, dus comprimeer ze niet

De strategiehelper retourneert ook een `deterministicOnly`-vlag, maar de planbouwer gebruikt
alleen de strategie — momenteel leest niets verderop in de keten deze vlag.

#### Codevoorbeeld

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cachemarkering
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Wanneer te gebruiken

Cachebewuste compressie is **altijd ingeschakeld** — er is geen configuratie nodig. Deze wordt geactiveerd wanneer
compressie is ingeschakeld en de doelprovider promptcaching ondersteunt (Anthropic, OpenAI,
enz.); expliciete `cache_control`-markeringen zijn niet vereist — alleen een cachingprovider
activeert de terugschaling al, en markeringen alleen doen dat nooit (detectie van markeringen levert gegevens voor
cachetelemetrie, niet voor de strategiebeslissing).

### Progressieve veroudering

Lange gesprekken verzamelen veel berichtbeurten, maar oudere beurten worden minder
relevant. De module `progressiveAging.ts` **degradeert berichten op basis van de afstand in beurten**
(de afstand wordt gemeten vanaf het einde van het gesprek). Met de meegeleverde standaardwaarden
(`verbatim: 2, light: 2, moderate: 3`):

- **Laatste 2 beurten (afstand ≤ 2)**: Ongewijzigd behouden
- **Afstand 3**: Caveman-compressie (verwijdering van opvultekst)
- **Afstand 4+**: Assistentberichten worden samengevat; gebruikersberichten worden beperkt tot hun eerste
  regel, met een maximum van 120 tekens; andere rollen blijven ongewijzigd. Systeemprompts, reeds verouderde
  berichten en het nieuwste gebruikersbericht worden altijd ongewijzigd behouden, ongeacht de afstand.
  Niets wordt volledig verwijderd, en de band `light`
  is onbereikbaar met de meegeleverde standaardwaarden (`light` is gelijk aan `verbatim`).

#### Codevoorbeeld

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... nog 50 beurten ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // laatste 3 beurten: ongewijzigd
  light: 8, // afstand <= 8: lichte compressie
  moderate: 20, // afstand <= 20: caveman-compressie
  fullSummary: 5, // vereist door het type, niet gelezen door de bandindelingscode
  // afstand > 20: samengevat (assistent) / eerste regel behouden (gebruiker)
});

// saved = aantal bespaarde tokens
```

#### Wanneer te gebruiken

Progressieve veroudering is **altijd ingeschakeld** voor de modus `aggressive` — het is stap 2 van
`compressAggressive()`. De modus Ultra voert deze niet uit. Deze functie is
met name effectief voor:

- Langlopende programmeersessies
- Gesprekken die meerdere dagen duren
- Agentische workflows met veel toolaanroepen

### Caveman-uitvoermodus

De Caveman-uitvoermodus voegt **systeempromptinstructies** toe die het model zelf om
beknopte uitvoer vragen — het niveau `lite` vraagt om bondige antwoorden met volledige zinnen, `full`
vraagt het om "bondig te antwoorden als een slimme holbewoner" en `ultra` vraagt om telegramstijl;
instructies zijn slechts verzoeken en kunnen dit niet garanderen. Verzoeken ontvangen deze via
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` bepaalt eerst de selectie met de achterwaartse-compatibiliteitsshim
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`), die, zolang `outputStyles`
leeg is, een ingeschakelde `cavemanOutputMode` omzet naar de uitvoerstijl `terse-prose` met
`cavemanOutputMode.intensity` (zie Achterwaartse compatibiliteit hieronder); een niet-lege `outputStyles`-
selectie wordt ongewijzigd gebruikt, waarna `cavemanOutputMode.enabled` en `intensity` geen
effect hebben, terwijl de schakeloptie `autoClarity` nog steeds van toepassing is. `outputMode.ts` bevat de
instructieteksten (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), de omzeiling voor content en de
plaatsingshelper die voor injectie wordt gebruikt; de eigen injector `applyCavemanOutputMode()` heeft geen
productiecaller.

#### Hoe het werkt

Deze modus comprimeert de invoer niet. Hij voegt een instructieblok toe aan de systeemprompt
(zie Hoe injectie werkt hieronder), waarna elke voor de aanvraag geselecteerde invoercompressiemodus
alsnog wordt uitgevoerd op de inhoud die nu het blok bevat. Vóór de gedeelde
begrenzingsclausule waarmee elk niveau eindigt, luidt het Engelse niveau `full`:

> "Antwoord beknopt als slimme holbewoner. Laat lidwoorden (de/het/een), opvulling (gewoon/echt/in feite/daadwerkelijk/eenvoudig), beleefdheden en afzwakkingen weg. Zinsfragmenten zijn OK. Korte synoniemen (groot, niet omvangrijk; repareren, niet implementeren). Behoud alle technische inhoud, code, fouten, URL's en identifiers exact."

Dit werkt bijzonder goed voor:

- Codegeneratie (beknoptere uitvoer = minder tokens)
- Snelle vragen en antwoorden (geen uitgebreide uitleg nodig)
- Batchverwerking (maximaliseert doorvoer)

#### Wanneer te gebruiken

Caveman-uitvoermodus is **opt-in**. Als compressie aanstaat (`enabled: true`, de hoofdschakelaar
op de pagina Compression Settings), schakel je deze in met `cavemanOutputMode.enabled`; `intensity`
kiest `lite`, `full` of `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

De schakelaar **Output Mode** van een compressiecombinatie (`outputMode`, met het niveau in `outputModeIntensity`)
stelt dezelfde optie in voor de aanvragen waarop die combinatie van toepassing is, en de
MCP-tool `omniroute_set_compression_engine` schrijft deze weg via het booleaanse argument `outputMode`.
Een niet-lege `outputStyles`-selectie heeft voorrang op deze schakelaar. Als je in het
dashboard de uitvoerstijl **Terse prose** inschakelt, wordt hetzelfde blok geïnjecteerd (zie Output
Styles hieronder).

### Uitvoerstijlen (catalogus)

De caveman-uitvoermodus hierboven is het **verouderde pad voor één stijl**. Fase 4 heeft dit
gegeneraliseerd tot een catalogus met combineerbare uitvoerstijlen: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Elke stijl is een instructie in de systeemprompt
die het model zelf om goedkopere uitvoer vraagt; stijlen kunnen samen worden ingeschakeld
en worden in catalogusvolgorde geïnjecteerd.

| Stijl                                   | `id`            | Wat deze doet                                                                                                                                                                                                                                                                   | Instructietalen                               |
| --------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Beknopt proza                           | `terse-prose`   | Laat opvulling/lidwoorden/afzwakkingen weg; behoud technische inhoud exact. Dezelfde tekst als de verouderde caveman-uitvoermodus (ernaar verwezen, niet opnieuw uitgeschreven).                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Minder code                             | `less-code`     | YAGNI-ladder: kleinst werkende wijziging, geen niet-gevraagde abstracties.                                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Paardenstaart (luie seniorontwikkelaar) | `ponytail`      | "De beste code is code die nooit is geschreven": hergebruik > herschrijven, hoofdoorzaak > symptoom, kortste werkende diff.                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ik heb ADHD (actie eerst)               | `i-have-adhd`   | Actie eerst (opdracht/pad/fragment vóór proza), genummerde begrensde stappen, ÉÉN concrete volgende stap, geen inleiding/samenvatting/afsluiting. Aangepast van [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-UI-filter                      | `antislop-ui`   | Elke visuele techniek moet een doeltoets doorstaan (hiërarchie, identiteit, leesbaarheid); geen standaardverlopen/glas/gloed, beperkt palet, geen sjabloonlay-outs. Beide antislop-stijlen voegen een begrenzing toe die dode bedieningselementen en verzonnen claims verbiedt. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-tekst- en mensfilter           | `antislop-copy` | Specifieke tekst (geen gedachtestreepje, generieke CTA's, modewoorden, chatbotafsluitingen of verzonnen feiten), plus regels voor mensen: WCAG AA-contrast, zichtbare focus, toetsenbordtoegankelijkheid, lege/laad-/foutstatussen en mobiele herindeling.                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Beknopt CJK (文言)                      | `terse-cjk`     | Antwoord bij `full`/`ultra` in Klassiek Chinees (文言); `lite` vraagt alleen om korte antwoorden zonder functiewoorden, beleefdheden of verfraaiing.                                                                                                                            | zh (locale-beperkt, zie hieronder)            |

Elke stijl wordt geleverd met drie intensiteitsniveaus — `lite`, `full`, `ultra` — en elk niveau
eindigt met de gedeelde begrenzingsclausule (`SHARED_BOUNDARIES` in `outputMode.ts`), die
codeblokken, bestandspaden, opdrachten, fouten en URL's exact behoudt. De niveauteksten van `terse-prose` en
`terse-cjk` voegen identifiers aan die lijst toe.

`terse-cjk` is op twee plaatsen beperkt tot de locale `zh`. De pagina Compression Settings toont
de bijbehorende rij alleen wanneer de UI-taal van het dashboard Chinees is (`zh-CN` of `zh-TW`), en
`applyOutputStyles()` injecteert deze alleen wanneer de bepaalde taal van de aanvraag (zie Taal-
selectie hieronder) `zh` is. Het verbergen van de rij wist een opgeslagen `terse-cjk`-selectie niet:
de instellingen-API accepteert elke stijl-id, en bij het opslaan van andere stijlen op de pagina blijft deze behouden. Tijdens
de aanvraag is de taalcontrole van `applyOutputStyles()` de enige locale-beperking.

#### Hoe injectie werkt

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) vergelijkt
de selectie met de catalogus (onbekende id's en stijlen waarvan de landinstelling niet
overeenkomt, worden verwijderd en veroorzaken nooit een fout; een selectie die geen
stijl oplevert, laat de body ongewijzigd en wordt overgeslagen als `no_styles`),
voegt de geselecteerde instructies samen in catalogusvolgorde,
voegt de clausule met grenzen **eenmaal** toe (plus de veiligheidsclausule,
`SAFETY_BOUNDARIES` of de vertaling daarvan, wanneer `less-code` of `ponytail` is
geselecteerd) en begint het blok met één idempotentiemarkering
(`[OmniRoute Output Styles]`), zodat opnieuw toepassen geen effect heeft. Wanneer voor
de vastgestelde taal (zie Taalkeuze hieronder) een vertaling beschikbaar is, wordt de
gelokaliseerde instructie ingevoegd in plaats van de Engelse.

Bij een body met een niet-lege `messages`-array wordt de idempotentiecontrole vóór het
omzeilen op basis van inhoud uitgevoerd: wanneer de markering
`[OmniRoute Output Styles]` al aanwezig is in het `system`-veld op het hoogste niveau
(een tekenreeks of een array van inhoudsblokken) of in een systeembericht met inhoud
van het type tekenreeks, blijft de body ongewijzigd als `already_applied` en wordt er
geen trefwoordcontrole uitgevoerd. Anders controleert een omzeiling op basis van inhoud
(`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) de tekst van de laatste drie berichten,
ongeacht hun rol, en slaat de stijlen voor de gehele beurt over wanneer die tekst
overeenkomt met trefwoorden voor beveiliging, onomkeerbare acties of verduidelijking,
of met een volgordegevoelige reeks: `first`, `then`, `after that`, `before`, `rollback`
of `backup`, binnen 240 tekens gevolgd door `delete`, `drop`, `migrate`, `deploy` of
`release`. De omzeiling wordt uitgevoerd zolang de schakelaar **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, standaard ingeschakeld) aanstaat; als de schakelaar
wordt uitgezet, wordt de trefwoordcontrole overgeslagen.

Wanneer de omzeiling de beurt doorlaat, plaatst `placeSystemInstruction()` (hetzelfde
bestand), dat nooit een nieuwe `messages[0]` maakt, het blok op de eerste van deze
gevonden locaties:

1. Een vooraanstaand systeembericht met inhoud van het type tekenreeks: het blok wordt
   na de tekst toegevoegd.
2. Het `system`-veld op het hoogste niveau: het blok wordt toegevoegd na de tekst van
   een tekenreeks, of als een nieuw tekstblok toegevoegd aan een array van
   inhoudsblokken.
3. Het eerste latere systeembericht met inhoud van het type tekenreeks: het blok wordt
   na de tekst toegevoegd.
4. Geen van bovenstaande: het blok wordt in een nieuw systeembericht aan het einde van
   `messages` geplaatst.

Bij een body zonder `messages`-array (of met een lege array) wordt geen omzeiling op
basis van inhoud uitgevoerd en wordt een `system`-veld op het hoogste niveau niet
geraadpleegd. Het blok wordt toegevoegd na de tekst van een `instructions`-veld van het
type tekenreeks, tenzij dat veld al de markering `[OmniRoute Output Styles]` bevat. In
dat geval blijft de body ongewijzigd als `already_applied`. Wanneer de body geen
`instructions`-veld van het type tekenreeks heeft, maar wel `input` bevat (een
tekenreeks of een array), wordt het blok `instructions`, waarbij een eventuele waarde
van een ander type in dat veld wordt vervangen. Een body zonder een
`instructions`-veld van het type tekenreeks en zonder `input` van het type tekenreeks
of array blijft ongewijzigd en wordt overgeslagen als `no_messages`.

#### Inschakelen

In het dashboard: **Compressiecontext → Compressie-instellingen**
(`/dashboard/context/settings`), sectie Uitvoerstijlen: één rij per stijl met een
aan/uit-schakelaar en een niveaukiezer. Stijlen worden ingevoegd zolang compressie zelf
is ingeschakeld (de hoofdschakelaar van de pagina, `enabled`). De schakelaar
**Auto-Clarity Bypass** staat op de pagina **Caveman**
(`/dashboard/context/caveman`), op de kaart **Uitvoermodus**. Programmatisch bewaart
de compressieconfiguratie de selectie als:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Achterwaartse compatibiliteit: zolang `outputStyles` leeg is, wordt de oude instelling
`cavemanOutputMode.enabled` gekoppeld aan `terse-prose` op
`cavemanOutputMode.intensity`. Het blok begint dan met de markering
`[OmniRoute Output Styles]`, waar het oude injectiemechanisme
`applyCavemanOutputMode()` `[OmniRoute Caveman Output Mode]` invoegde. Onder de
markering komt de tekst overeen met de oude invoeging in en, pt-BR, es, de, fr, it, ru,
id en vi; in ja en zh bevat deze één extra spatie vóór de clausule met grenzen.
`terse-prose` is vertaald naar pt-BR, es, de, fr, it, ru, zh, ja, id en vi, zodat een
verzoek waarvan de vastgestelde taal `hu` is de Engelse tekst krijgt, terwijl het oude
injectiemechanisme de Hongaarse tekst gebruikte.

Taalkeuze voor uitvoerstijlen (`resolveOutputStyleLanguage()` in
`outputStyles/apply.ts`): wanneer `languageConfig.enabled` aanstaat, neemt
`autoDetect` als steekproef het meest recente gebruikersbericht met tekst in de
`messages`-array van het verzoek (inhoud van het type tekenreeks, of de `text` van de
inhoudsdelen) en voert daarop het detectiemechanisme van de Caveman-engine uit
(`detectCompressionLanguage()`). De detector retourneert `zh` voor tekst met
Han-tekens en zonder kana; anders retourneert deze de taal met de meeste overeenkomende
aanwijzingen uit `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` en `id`, en `en`
wanneer er geen overeenkomsten zijn — tekst die niet kan worden geclassificeerd, krijgt
Engels, nooit `defaultLanguage`, en `vi` wordt nooit gedetecteerd, hoewel de stijlen wel
`vi`-tekst bevatten. Een body van de Responses API bewaart de beurten in `input`, dat
niet als steekproef wordt gebruikt, en krijgt daarom `defaultLanguage` en vervolgens
Engels. Wanneer geen enkel gebruikersbericht in `messages` tekst bevat, of wanneer
`autoDetect` uitstaat, wordt `defaultLanguage` gebruikt en vervolgens Engels. Wanneer
`languageConfig.enabled` uitstaat, is de taal Engels — tenzij een compressiecombinatie
op het verzoek van toepassing is (een combinatie die is toegewezen aan de
routeringscombinatie van het verzoek, of de standaardcompressiecombinatie waarop
chatCore terugvalt voor de ingebouwde gestapelde pipeline): het toepassen van een
combinatie schakelt `languageConfig.enabled` voor dat verzoek in en stelt
`defaultLanguage` in op basis van de taalpakketten van de combinatie (de opgeslagen
waarde als die een van de pakketten van de combinatie is, anders het eerste pakket van
de combinatie, dat standaard `en` is), terwijl de opgeslagen instelling `autoDetect`
(standaard ingeschakeld) van toepassing blijft. De Caveman-invoerengine kiest de taal
van het regelpakket op een andere manier — per tekstdeel en, wanneer automatische
detectie uitstaat, afhankelijk van `enabledPacks`.

De stijl-×-taalmatrix wordt vastgelegd door
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: elke catalogusstijl moet een
vermelding hebben in de `BASELINE_LANGUAGES` van de test; een stijl die niet door een
locale wordt beperkt, moet een pt-BR-vertaling bevatten (de door een locale beperkte
`terse-cjk` is van deze regel vrijgesteld), tenzij de stijl wordt vermeld in
`KNOWN_ENGLISH_ONLY`, dat alleen stijlen zonder enige vertaling mag bevatten — een
vermelde stijl met ook maar één vertaling laat de test mislukken; bovendien mislukt de
test voor een stijl wanneer deze een taal verliest die in zijn vermelding in
`BASELINE_LANGUAGES` staat. Zie
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) om een
stijl toe te voegen.

### Compressie van toolresultaten

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts`
comprimeert tekst van toolresultaten met **5 strategieën**. De strategieën worden in
deze volgorde geprobeerd, en de eerste ingeschakelde strategie waarvan de controle
overeenkomt met de inhoud, bepaalt het resultaat:

1. **`fileContent`**: inhoud van 3 of meer regels waarin ten minste één regel, waarbij
   inspringing aan het begin wordt genegeerd, begint met `import `, `export `,
   `function `, `class `, `const `, `let `, `var ` of `return ` (het trefwoord plus
   een spatie), of met `if`, `for` of `while` gevolgd door `(` of ` (`, behoudt de
   eerste 20 en laatste 5 regels, waarbij het weggelaten middendeel wordt gemarkeerd.
2. **`grepSearch`**: inhoud met ten minste één regel van de vorm `<path>:<digits>:`,
   waarbij de tekst vóór de eerste dubbele punt geen witruimte bevat, behoudt alleen
   die regels, maximaal 30, gevolgd door het aantal eventuele verdere overeenkomsten
   en de lijst met overeenkomende bestanden; elke andere regel wordt verwijderd. Eén
   zo'n regel is voldoende om de strategie te activeren, dus een logregel die begint
   met een tijdstempel zoals `12:30:45` telt ook mee.
3. **`shellOutput`**: uitvoer die een ANSI CSI-reeks bevat (`ESC[` gevolgd door cijfers
   of puntkomma's en daarna een letter, zoals in kleurcodes), of ergens in de tekst
   een `$` gevolgd door witruimte, verliest die reeksen (andere escape-reeksen, zoals
   `ESC[?25l` of een OSC-reeks voor de venstertitel, blijven behouden) en behoudt de
   laatste 50 regels, waarbij opeenvolgende herhaalde regels worden samengevoegd. Omdat
   deze controle vóór `json` en `errorMessage` wordt uitgevoerd, bereikt JSON- of
   foutuitvoer die zo'n `$` bevat deze strategieën nooit zolang `shellOutput` is
   ingeschakeld.
4. **`json`**: een JSON-payload van meer dan 2.000 tekens die (na eventuele witruimte)
   begint met `{` of `[` en correct kan worden geparseerd, wordt samengevat: van een
   array met meer dan 7 items worden de eerste 5 en laatste 2 items en het totale
   aantal behouden, en van een object worden de eerste 20 sleutels behouden, waarbij
   elke geneste object- of arraywaarde wordt vervangen door een tijdelijke aanduiding
   `{…N keys}` (voor een array is N de lengte) en een markering
   `_remaining_<N>_keys` het aantal sleutels aangeeft dat na de eerste 20 is
   weggelaten. Scalaire waarden worden volledig gekopieerd, zodat een object met 20 of
   minder sleutels zonder geneste waarden alleen opnieuw wordt ingesprongen — een
   geminimaliseerd object krijgt daardoor meer tekens en blijft ongewijzigd.
5. **`errorMessage`**: uitvoer die ergens, ongeacht hoofdlettergebruik, `error:`,
   `error ` (het woord gevolgd door een spatie, zoals in `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` of `traceback` bevat, behoudt de eerste
   regel, de volgende 10 regels en de laatste 3, met een markering
   `… [N frames elided] …` in plaats van de tussenliggende regels. De markering
   verschijnt alleen wanneer er meer dan 13 regels op de eerste regel volgen, zodat
   foutuitvoer van 14 regels of minder niet wordt ingekort (bij 12 of 13 regels
   herhalen de laatste 3 regels reeds behouden regels).

Nadat een strategie overeenkomt, worden de latere strategieën niet meer geprobeerd,
zelfs als die strategie niets bespaart. Wanneer de overeenkomende strategie geen
geschatte tokens bespaart (lengte ÷ 4, naar boven afgerond) — bijvoorbeeld bij een
codeachtig bestand van 25 regels of minder, of een JSON-array van meer dan 2.000
tekens met 7 items of minder — behoudt de agressieve engine het oorspronkelijke
toolresultaat: beide aanroepers (`compressAggressive()` en
`compressAnthropicToolResultBlock()`) behouden het origineel wanneer `saved` 0 of
lager is, terwijl `compressToolResult()` zelf nog steeds de uitvoer van die strategie
retourneert. De toolresultaatstap heeft niet het laatste woord: de
fallback-samenvatter van de engine kan een `tool`- of `function`-bericht van meer dan
8.192 tekens nog steeds inkorten (`maxTokensPerMessage`, 2.048, maal 4).

#### Wanneer te gebruiken

Compressie van toolresultaten is stap 1 van de agressieve engine
(`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), en wordt
dus uitgevoerd in de Aggressive-modus en in een `aggressive`-stap van een gestapelde
pipeline. Deze stap comprimeert `tool`- en `function`-berichten in OpenAI-indeling en
de tekst in Anthropic-`tool_result`-blokken. Elke strategie heeft een eigen schakelaar
onder `aggressive.toolStrategies`; ze staan standaard allemaal aan. In het dashboard
staan de schakelaars in de weergave **Advanced** van de Caveman-pagina wanneer
compressie is ingeschakeld en de standaardmodus Aggressive is.

### Gestapelde pipeline

De gestapelde modus voert **meerdere engines achter elkaar uit** — doorgaans eerst RTK
(60-90% besparing op tooluitvoer), en vervolgens Caveman op de resterende tekst
(~46% besparing op invoer). Gecombineerd levert dat het **toepasselijke bereik van
78-95%** op (zie Berekening van upstreambesparingen hierboven):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` is gemiddeld ≈89%.

#### Hoe het werkt

```
Invoer (1000 tokens)
  → RTK (opdrachtafhankelijk filter) → 200 tokens
    → Caveman (verwijdering van opvultekst) → 108 tokens
  → Uitvoer (108 tokens, ~89% besparing)
```

#### Wanneer te gebruiken

Gebruik de gestapelde modus voor:

- Workflows met intensief toolgebruik (agentisch programmeren, onderzoek)
- Kostengevoelige batchverwerking
- Wanneer u maximale tokenbesparingen nodig hebt

Gestapelde pipelines worden geconfigureerd via de algemene compressie-instelling
`stackedPipeline`, of via een benoemde compressiecombinatie die aan een
routeringscombinatie is toegewezen (zie Overschrijven per combinatie hierboven) —
niet via een `modePack` van een automatische combinatie (dat veld wijzigt alleen de
weging van de modelselectie voor automatische combinaties, en `stacked` is geen
geldige pakketnaam).

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
