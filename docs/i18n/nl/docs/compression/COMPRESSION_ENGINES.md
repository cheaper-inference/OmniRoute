# Compression Engines (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute-compressie is opgebouwd rond enginecontracten. Een modus kan één engine rechtstreeks uitvoeren
(`caveman` of `rtk`) of een deterministische gestapelde pipeline die meerdere engines op volgorde uitvoert.

## Modi

| Modus        | Engine-pad                                                                             | Beoogde invoer                                     |
| ------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `off`        | geen                                                                                   | Exacte promptbehoud                                |
| `lite`       | Caveman lite helpers                                                                   | Laag-risico altijd-actieve opschoning              |
| `standard`   | Caveman                                                                                | Natuurlijke-taal promptcondensatie                 |
| `aggressive` | Caveman + history/tool summarizers                                                     | Lange chatsessies                                  |
| `ultra`      | Caveman + pruning helpers                                                              | Herstel van contextlimiet                          |
| `rtk`        | RTK                                                                                    | Terminal-, shell-, build-, test- en git-uitvoer    |
| `omniglyph`  | OmniGlyph                                                                              | Context-als-afbeelding op de native provider-draad |
| `stacked`    | Pijplijn. De standaardaanvraag is `session-dedup -> lite`. `rtk -> caveman` is opt-in. | Gemengde toollogs en proza, maximale besparingen   |

### OmniGlyph compressieprofielen

De `omniglyph`-engine (pakket `omniglyph`, 1.4.0+) accepteert een benoemd semantisch profiel, globaal ingesteld
via `omniglyph.profile` in de compressie-instellingen of per stap via de
stapconfiguratie van de gestapelde pijplijn:

| Profiel       | Grens                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Standaard. Het beleid dat de gepubliceerde ontvangsten maten — afbeeldingssysteem, tool-documenten en dichte geschiedenis |
| `balanced`    | Houdt live status native, beschermt de laatste 8 beurten, vouwt oudere gesloten geschiedenis samen                        |
| `coding-safe` | Houdt autoriteit, tool-schema's en live tool-uitvoer native, beschermt de laatste 12 beurten                              |
| `passthrough` | Routeert zonder transformatie; de engine wordt overgeslagen                                                               |

Het profiel is een **plafond, geen vloer**: `mergeCompressionProfileOptions` in het pakket
weigert een aanroeper toe te staan een verlieslatende baan te heropenen die het profiel heeft gesloten, dus een `preserveSystemPrompt: false` per stap
kan systeemcompressie onder `coding-safe` niet opnieuw inschakelen.

Gemeten op deze codebase: `coding-safe` en `balanced` verhogen `minCompressChars` tot het
maximum en houden systeem, tool-schema's en tool-resultaten native, dus een sessie die nog niet
geschiedenis heeft opgebouwd, stopt bij `below_min_chars` en de engine transformeert niets. Dat
is waarom de standaard `aggressive` is in plaats van het veiligste profiel.

Het pakket lost zijn eigen modelbereik en profiel op uit zijn omgevingsconfiguratie.
OmniRoute delegeert de beslissing nooit: de adapter koppelt de modelpoort aan het meest
restrictieve bereik van het pakket, zodat hostomgevingsinstellingen de allowlist alleen kunnen
verkleinen, nooit verbreden voorbij de gemeten ontvangsten van OmniRoute.

## Engineregister

Het register bevindt zich in `open-sse/services/compression/engines/registry.ts`. Engines bieden een gedeeld contract:

- `id`: stabiele engine-id, zoals `caveman` of `rtk`
- `apply(text, config)`: verouderd uitvoeringspad dat door gestapelde pipelines wordt gebruikt
- `compress(input, config)`: primair uitvoeringspad dat tekst + statistieken retourneert
- `getConfigSchema()`: retourneert de JSON-Schema-achtige structuur van een geldige configuratie
- `validateConfig(config)`: retourneert `{ valid, errors[] }`

Registratie maakt gebruik van `registerCompressionEngine(engine)` (of `registerEngine` voor geavanceerde gevallen), waarbij `assertValidEngine()` en `validateConfig(defaultConfig)` worden aangeroepen voordat de engine wordt geaccepteerd.
Gebruik `unregisterCompressionEngine(id)` om tijdens runtime een engine te verwijderen.

`strategySelector.ts` registreert de ingebouwde engines voordat compressie wordt uitgevoerd. Hierdoor kunnen voorbeelden, runtimecompressie, gestapelde modus, tests en toekomstige engines hetzelfde uitvoeringspad gebruiken.

### Compressie van MCP-beschrijvingen (gerelateerd)

Een afzonderlijk register comprimeert de beschrijvende metadata van MCP-tools op registerniveau — zie
`open-sse/mcp-server/descriptionCompressor.ts` en [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Het hergebruikt
Caveman-regels, maar past deze toe op toolmetadata en niet op requestpayloads.

### Aanvullende ingebouwde engines

Naast Caveman, RTK en LLMLingua-2 bevat het register verschillende gespecialiseerde verliesvrije /
structurele engines (gebruikt door gestapelde pipelines, de playground en tests):

| Engine        | Id              | Wat deze doet                                                                                                                                                                                                         |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): vervangt grote aaneengesloten tekstblokken door inhoudsgeadresseerde verwijzingen, zodat herhaalde/grote blokken eenmaal worden verzonden en daarna via verwijzingen worden gebruikt. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): verliesvrije tabulaire compactie van homogene JSON-arraypayloads naar een kolomgebaseerde vorm `[N rows]`.                                                                                    |
| ionizer       | `ionizer`       | Bemonstering van rijen aan het begin, in het midden en aan het einde voor zeer grote homogene blokken, waarbij het weggelaten middendeel als een inhoudsgeadresseerde CCR-verwijzing wordt opgeslagen.                |
| session-dedup | `session-dedup` | Inhoudsgeadresseerde ontdubbeling over beurten heen (geïnspireerd door TokenMizer): laat tekst weg die al in eerdere beurten van dezelfde sessie is gezien.                                                           |

**CCR-instructie voor het retrieve-protocol (#8033):** de eerste keer dat CCR ≥1 blok in een
request vervangt, voegt de engine één idempotent `system`-bericht vooraan toe (beginnend met de
`[CCR protocol]`-sentinel) dat de aanroeper het contract tussen marker en tool uitlegt: wat een
`[CCR retrieve hash=<24hex> chars=N]`-marker betekent, dat de hash letterlijk moet worden gekopieerd
(alle 24 hexadecimale tekens — verkeerd gekopieerde hashes zijn de waarschijnlijke oorzaak van
meldingen dat het blok niet is gevonden), en dat een `[dedup:ref sha=...]`-marker betekent
"zoek terug in de geschiedenis", niet "roep de tool aan". De opmerking wordt **alleen toegevoegd
wanneer de geadverteerde `tools[]` van de aanroeper aantonen dat deze daadwerkelijk toegang heeft
tot `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` in
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — een gewone
OpenAI-compatibele aanroeper zonder die tool ontvangt nooit een instructie om iets aan te roepen
waartoe deze geen toegang heeft. Idempotentie wordt afgedwongen door de berichtgeschiedenis op de
sentinel te controleren voordat de instructie wordt toegevoegd, zodat requests met meerdere beurten
(die eerdere berichten opnieuw afspelen) de opmerking niet bij elke beurt opnieuw toevoegen.

## Caveman

De Caveman-modus richt zich op semantische condensatie van normale proza:

- behoudt codeblokken, URL's, JSON, paden en gestructureerde gegevens
- verwijdert opvulling, afzwakkingen, herhaalde context en omslachtige verbindingsfrasen
- ondersteunt taalbewuste regelpakketten voor bestanden in `open-sse/services/compression/rules/`
- blijft beschikbaar via de verouderde modi `standard`, `aggressive` en `ultra`

Het dashboardonderdeel is `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream rapporteert `~75%` minder uitvoertokens, gemiddeld `65%` besparing op uitvoer in benchmarks
met een bereik van `22-87%`, en een hulpmiddel voor invoercompressie van `~46%`. OmniRoute gebruikt het Caveman-cijfer voor invoer
bij het documenteren van gecombineerde besparingen op prompts/context; de Caveman-uitvoermodus blijft een afzonderlijke
functie voor responsgedrag.

## RTK

De RTK-modus richt zich op uitvoer van opdrachten en hulpmiddelen:

- detecteert uitvoerklassen zoals `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go-tests, TypeScript/Vite/Webpack-builds, ESLint, npm-audits/installaties, Docker-logboeken,
  shell-`find`/`grep`, stacktraces en algemene logboeken
- past 49 JSON-filters toe uit `open-sse/services/compression/engines/rtk/filters/`
- ondersteunt de declaratieve pipeline in RTK-stijl: ANSI-verwijdering, vervangen, kortsluiting bij overeenkomende uitvoer,
  regels verwijderen/behouden, afkapping per regel, afkapping op basis van begin/einde/maximaal aantal regels en terugval bij lege uitvoer
- ondersteunt op vertrouwen gebaseerde projectfilters in `.rtk/filters.json` en globale filters in
  `DATA_DIR/rtk/filters.json`
- verwijdert ANSI-reeksen, voortgangsruis, herhaalde regels en nutteloze standaardtekst
- behoudt fouten waarop actie kan worden ondernomen, waarschuwingen, samenvattingen, gewijzigde bestanden en context aan het einde
- kan optioneel geredigeerde onbewerkte uitvoer bewaren voor herstel/foutopsporing via geauthenticeerde beheer-
  routes

Het dashboardonderdeel is `Dashboard -> Context & Cache -> RTK`.

Operationele details over aangepaste filters, vertrouwen, verificatie en herstel van onbewerkte uitvoer staan in
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream rapporteert een besparing van `60-90%` voor compressie van opdrachtuitvoer. Het voorbeeld in de README toont een
Claude Code-sessie van 30 minuten die van `~118,000` tokens naar `~23,900` gaat, oftewel een besparing van `79.7%`.

## LLMLingua-2 (Semantisch snoeien)

De LLMLingua-2-modus voert **semantisch snoeien van tokens** uit op proza met behulp van een kleine ONNX-token-
classifier, als aanvulling op de op regels gebaseerde Caveman- en RTK-engines:

- comprimeert alleen proza in niet-systeemberichten; omheinde codeblokken en andere behouden
  constructies worden nooit gewijzigd
- voert de `@atjsh/llmlingua-2`-backend (ONNX via `@huggingface/transformers`) uit in een
  worker-thread, zodat modelinferentie de eventloop van aanvragen nooit blokkeert
- is **stapelbaar** (`stackPriority` 35): in een gestapelde pipeline wordt deze uitgevoerd na de
  structurele engines (CCR, session-dedup, headroom, Caveman), maar vóór `ultra`, omdat
  semantisch snoeien het effectiefst is op tekst die al structureel is gecomprimeerd — bijvoorbeeld
  `rtk -> caveman -> llmlingua`
- **valt bij elke fout terug zonder te blokkeren** (ontbrekende optionele afhankelijkheden, starten van de worker, laden van het model, inferentie
  of time-out) → de oorspronkelijke tekst wordt ongewijzigd geretourneerd, nooit een fout

Locatie van de engine: `open-sse/services/compression/engines/llmlingua/`. Het dashboardonderdeel
is `Dashboard -> Context & Cache -> LLMLingua`.

### Modellen

Het standaardmodel is **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
snel). Een nauwkeuriger **BERT-base**-model (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) is beschikbaar via het veld `model` in de engineconfiguratie. `@huggingface/transformers`
downloadt het geselecteerde model bij de eerste aanroep naar
`${DATA_DIR}/models/llmlingua` vanuit de HuggingFace Hub (`modelStore.ts`); met een `modelPath`-configuratie-
overschrijving kan in plaats daarvan naar een lokale kopie worden verwezen (offline / air-gapped installaties).

### Optionele afhankelijkheden en installatie op aanvraag

De verwijderbare LLMLingua-runtimepeerstack is **optioneel**. Twee pakketten zijn gedeclareerd als
`optionalDependencies` in `package.json` en worden door de productiebuild **extern** gehouden
(`scripts/build/prepublish.ts` bundelt ze niet):

| Pakket               | Versie (vastgezet) | Opmerkingen                                    |
| -------------------- | ------------------ | ---------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Ingangspakket; declareert de overige als peers |
| `js-tiktoken`        | `^1.0.20`          | Tokenizer                                      |

`@huggingface/transformers` is vastgezet op `^4.2.0` (gedeeld met het lokale embeddingspad en
ook opgenomen in de zelfstandige bundel); `@atjsh/llmlingua-2@2.0.5` gebruikt hiervoor
`"^3.5.2 || ^4.0.0"` als peerbereik, zodat zowel Transformers.js v3 als v4 worden ondersteund. Sinds 2.0.4
vereist `@atjsh/llmlingua-2` niet langer `@tensorflow/tfjs`, waardoor de grootste afzonderlijke
bijdrage (TensorFlow.js) uit de SLM-stack is verwijderd. Alleen de twee bovenstaande pakketten zijn verwijderbare SLM-
peers. Een standaard `npm install` (ontwikkeling) installeert de optionele stack automatisch, tenzij optionele
afhankelijkheden worden weggelaten.

**Waarom op aanvraag:** het via npm gepubliceerde pakket, de zelfstandige bundel en de Docker-image
worden **zonder** deze afhankelijkheden geleverd om compact te blijven. Wanneer ze ontbreken, mislukt de afhankelijkheids-
controle van de worker (een probe in `worker.ts` om `@atjsh/llmlingua-2` op te lossen) en valt de engine
**stilzwijgend terug zonder te blokkeren** — LLMLingua selecteren heeft dan geen effect (tekst wordt ongewijzigd geretourneerd, er wordt geen
fout gelogd). Installeer de optionele stack om deze in een opgeschoonde omgeving te activeren:

```bash
# zet vast op de versies die in package.json optionalDependencies zijn gedeclareerd
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

De verwijdering van `@tensorflow/tfjs` (2.0.4+) elimineert de voorheen dominante bijdrage van ~800 MB
— de resterende omvang bestaat uit de transformers.js- en onnxruntime-node-runtimes,
plus het TinyBERT-model (~57 MB) dat bij het eerste gebruik wordt gedownload (niet via npm).

Per omgeving:

- **Dev / `npm install`** — automatisch geïnstalleerd, tenzij je `--omit=optional`
  (of `--no-optional`) hebt opgegeven. Geen actie nodig.
- **Globale npm (`npm i -g omniroute`) / standalone** — voer de bovenstaande installatieopdracht uit in
  de map van het geïnstalleerde pakket, of installeer het opnieuw zonder optionele afhankelijkheden weg te laten.
- **Docker** — voeg de installatieopdracht toe in een afgeleide imagelaag; de gepubliceerde image
  wordt bewust in minimale vorm geleverd.
- **VPS (PM2)** — installeer in de `node_modules` van de app en herstart vervolgens het proces, zodat de
  worker de gate opnieuw controleert.
- **Raw Next-standalone (`npm run build` → `.build/next/standalone/server.js`)** — de
  standalone-trace bevat NOCH de worker, NOCH de optionele afhankelijkheden, waardoor de engine ongemerkt
  fail-open wordt uitgevoerd. `scripts/build/colocate-standalone.mjs` voegt beide opnieuw toe (worker-esbuild +
  de sluiting van optionele afhankelijkheden in de standalone-structuur); dit wordt na elke build automatisch uitgevoerd via de
  `postbuild`-npm-hook. Idempotent en faalt zonder gevolgen wanneer afhankelijkheden ontbreken.

**Controleer of het actief is:** als LLMLingua is geselecteerd, wordt echte prozatekst daadwerkelijk ingekort (de engine
stopt met fail-open uitvoeren) en activeert het eerste verzoek het downloaden van het model naar
`${DATA_DIR}/models/llmlingua`. De gate controleert bewust alleen `@atjsh/llmlingua-2` —
de andere peers zijn uitsluitend ESM en `require.resolve` genereert hiervoor een fout, zelfs wanneer ze aanwezig zijn — waardoor
de worker nog steeds fail-open wordt uitgevoerd als een peer daadwerkelijk ontbreekt tijdens `import()`.

## Gestapelde pipelines

De gestapelde modus voert pipelinestappen op volgorde uit. De standaardvolgorde is:

```txt
rtk -> caveman
```

Gebruik dit voor sessies met coding-agents waarin een prompt opdrachtuitvoer combineert met tekst van een gebruiker of assistent. RTK reduceert eerst omvangrijke toollogs, waarna Caveman de resterende natuurlijke taal comprimeert.

Pipelinestappen worden geconfigureerd met `stackedPipeline` in de compressie-instellingen of via compressiecombinaties.

Wanneer beide engines dezelfde geschikte payload reduceren, worden de besparingen gecombineerd:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter voor MCP-toegankelijkheidsbomen

Het slimme filter voor MCP-toegankelijkheidsbomen is een compressielaag na uitvoering die wordt toegepast op **toolresultaten** van MCP, niet op prompts of context. Het is gericht op de uitgebreide payloads van toegankelijkheidsbomen en browsersnapshots die worden geretourneerd door tools zoals Playwright, computer-use en MCP-servers voor browserautomatisering.

### Wat het doet

1. **Ruis verwijderen** — verwijdert lege generieke/tekstitems (`- generic:`, `- text: ""`)
2. **Opeenvolgende items samenvouwen** — wanneer ≥ `collapseThreshold` (standaard 30) opeenvolgende regels structurele herhalingen zijn, worden deze samengevouwen tot de eerste `collapseKeepHead` (standaard 10) regels + een samenvatting van het aantal + de laatste `collapseKeepTail` (standaard 5) regels
3. **Referenties behouden** — `[ref=eXX]`-ankers die vereist zijn voor Playwright/computer-use worden nooit gewijzigd
4. **Harde afkapping** — als de tekst na het samenvouwen nog steeds langer is dan `maxTextChars` (standaard 50.000), wordt deze afgekapt met een navigatiehint, zodat de agent verder kan werken

### Locatie van de engine

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← toegangspunt smartFilterText()
  collapseRepeated.ts ← algoritme voor het samenvouwen van opeenvolgende items
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuratie

Wordt beheerd via `compression.mcpAccessibility` in de algemene instellingen (migratie 056). Standaardconfiguratie:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Het filter wordt alleen toegepast op payloads van toolresultaten waarvan `type` gelijk is aan `"text"` en waarvan de lengte groter is dan `minLengthToProcess`. Het heeft geen invloed op promptcompressie of verzoekpayloads.

### Verwachte besparingen

60–80% op toolresultaten van browsersnapshots, afhankelijk van de complexiteit van de pagina. Het algoritme voor samenvouwen heeft een complexiteit van O(n) ten opzichte van het aantal regels en voegt verwaarloosbare latentie toe.

### Dit filter versus de bovenstaande compressie-engines

| Aspect           | Caveman / RTK / gestapeld  | MCP-toegankelijkheidsfilter            |
| ---------------- | -------------------------- | -------------------------------------- |
| Doel             | Verzoekprompts / context   | MCP-toolresultaten                     |
| Trigger          | Instelling compressiemodus | `compression.mcpAccessibility.enabled` |
| Bereik           | Alle SSE-berichten         | Alleen toolresultaten                  |
| Referentieankers | N.v.t.                     | Worden onvoorwaardelijk behouden       |

---

## Compressiecombinaties

Compressiecombinaties zijn benoemde compressieprofielen die aan routeringscombinaties kunnen worden toegewezen:

- `compression_combos`: slaat modus, pijplijn, RTK-configuratie, taalconfiguratie en standaardmarkering op
- `compression_combo_assignments`: koppelt een compressiecombinatie aan een routeringscombinatie
- de runtime-integratie zoekt eerst een toegewezen compressiecombinatie op, vóór generieke combinatie-overschrijvingen
- analyses bevatten `compression_combo_id` en `engine`

Dashboardlocatie: `Dashboard -> Context & Cache -> Compression Combos`.

## Vereisten / operatorhandleiding (CCR & sessie-dedup)

CCR (`ccr`) en `session-dedup` vervangen of verwijderen tekst en laten a achter** markering** achter. Dit gedeelte is de referentie voor de operator voor het aansluiten van een client, het lezen van de twee markeringen en het ophalen of diagnosticeren van de weggelaten inhoud. De mechanica van elke motor wordt hierboven besproken; dit is de laag "hoe voer ik het uit".

### Transporten en eindpunten

De MCP server waarop de CCR tools beschikbaar zijn, kan op drie manieren worden bereikt. De standaardbasis URL is `http://localhost:20128` (`OMNIROUTE_BASE_URL`):

| Vervoer                              | URL / commando                          | Opmerkingen                                                                                                                     |
| ------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Streambare HTTP (client, aanbevolen) | `http://localhost:20128/api/mcp/stream` | Het eindpunt waarmee huidige MCP clients praten.                                                                                |
| Legacy SSE singleton                 | `http://localhost:20128/api/mcp/sse`    | Ouder singletonvervoer. Het** sluit** streambare sessies; gebruik `streamable-http` clients tegen `/api/mcp/stream`, niet deze. |
| stdio                                | `omniroute --mcp`                       | Voor IDE MCP configuratie die het proces voortbrengt. Er is geen `--dev` vlag; `omniroute --mcp` is het stdio-ingangspunt.      |

### Opslaglagen (wat een herstart overleeft)

CCR is een** tweeledig** opslaan, niet alleen in het geheugen:

- **Hot in-memory-laag** — per blok cap 2 MiB, per hoofdsom 16 MiB, globaal 64 MiB. Inzendingen hebben standaard een periode van 24 TTL (maximaal 7 dagen). Het volledige ophalen MCP uit het geheugen is beperkt tot 256 KiB; alles wat groter is, is nog steeds bereikbaar via de ranged / grep-modi.
- **Duurzame SQLite -laag** (`ccr_blocks`, `COMPRESSION_CCR_DURABLE_STORE`, standaard aan) — ondersteunt de laag in het geheugen, zodat een blok LRU uitzetting, een herstart of een herstellanding op een andere instantie overleeft. De rij behoudt de TTL van het blok, dus een blok voorbij zijn TTL is van beide niveaus verdwenen.

Drie bewakers houden de duurzame laag begrensd — een blok blijft alleen geheugen wanneer:

1. het blok is voorbij** 512 KB** (`MAX_DURABLE_BLOCK_BYTES`);
2. de runtime is een cloudruntime (geen lokale schijf);
3. `COMPRESSION_CCR_DURABLE_STORE=false`.

Dus "het blok is verdwenen" is geen algemeen herstartverhaal: een sub-512 KB blok op een lokale, niet-cloud-runtime overleeft een herstart via de duurzame laag totdat de TTL opraakt. Zie [Omgevingsreferentie](../reference/ENVIRONMENT.md) voor de variabele.

### De twee markeringen

| Markering                             | Betekenis                                                                                                                                                          | Wat het model zou moeten doen                                                                                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[CCR retrieve hash=<24hex> chars=N]` | Een groot blok werd inhoudelijk geadresseerd opgeslagen.                                                                                                           | Bel `omniroute_ccr_retrieve` met de** 24-hexade hash letterlijk gekopieerd** om de originele tekst terug te krijgen.                                                                                                                               |
| `[dedup:ref sha=…]`                   | `session-dedup` heeft tekst weggelaten die al in een eerdere beurt van dezelfde sessie was verzonden. Dit is een** doelbewuste terugblik** , geen verlies of fout. | Doen** niet** bel een willekeurig hulpmiddel en doe het** niet** probeer het te ‘reconstrueren’. De eerste keer dat de tekst voorkomt is de canonieke kopie; de huidige beurt wordt nooit herschreven, maar wordt bij een latere beurt ontdubbeld. |

De `[dedup:ref]` -terugblik is een bewuste protocolbeslissing — Er is geen pre-send-reconstructie. Behandel het als "deze exacte tekst was al eerder in deze sessie aan de orde."

### Vereisten voor klanten

- **Toets (stdio):** een stdio-beller heeft geen identiteit per verzoek, dus authenticeert deze met `OMNIROUTE_API_KEY` (ingesteld in de `env` van de MCP server). Zonder dit is de beller anoniem en kunnen tools waarvoor een opdrachtgever nodig is, verslechteren.
- **`tools[]` is de injectievoorwaarde.** De CCR retrieve-protocol instructie (#8033) wordt geïnjecteerd** alleen** wanneer de geadverteerde `tools[]` van het verzoek bewijst dat de client daadwerkelijk `omniroute_ccr_retrieve` kan bereiken. De overeenkomst is een overeenkomst met een volgsegment, begrensd door een scheidingsteken (`__`, `.`, `/`, `:`) — nooit een kale subtekenreeks —, dus een naamruimtenaam zoals `mcp__gateway__omniroute_ccr_retrieve` telt nog steeds. Een afwezige of niet-overeenkomende `tools[]` betekent dat de instructie _niet_ is geïnjecteerd, door het ontwerp.
- **`codemode:false` (OpenCode clients).** OpenCode gebruikt standaard de Codemodus, die alleen de eigen tools aan het model adverteert en** niet** plaats MCP tools op de native `tools[]` lijst. Stel `codemode: false` in op de MCP serveringang zodat de `omniroute_ccr_*` tools worden geadverteerd. Dit is een** cliënt** instelling, niet een OmniRoute instelling. De CCR instructie wordt nog niet geïnjecteerd: OpenCode noemt een tool `<server>_<tool>`, dus een server met de naam `omniroute` stelt `omniroute_omniroute_ccr_retrieve` bloot, en `_` is niet een van de overeenkomende scheidingstekens.
- **opdrachtgevers.** Het opslaan en ophalen gebeurt geïsoleerd per geauthenticeerde opdrachtgever (per API sleutel). Een sleutel ziet alleen zijn eigen blokken.

### Scopes per gereedschap

Het afdwingen van het bereik is altijd ingeschakeld voor HTTP/SSE bellers met een beperkt bereik. De `omniroute_` CCR tools vereisen:

| Hulpmiddel               | Domein              |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

Een ontbrekend bereik retourneert een**MCP toolfoutresultaat** (`isError: true`, niet een HTTP 403 — de `403 LOCAL_ONLY` is de afzonderlijke loopback route-guard auth): `Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` Een minimale externe sleutel kan `mcp:connect` bevatten (autoriseert de `/api/mcp/` alleen lokale carve-out) plus de specifieke read/write scope die het nodig heeft.

### Klantenmatrix

| Cliënt            | Vervoer                                     | Configuratie om te gebruiken                                                                                                                                                                                                                             | `tools[]` geadverteerd? (→ CCR instructie geïnjecteerd)                                                                                                                                                               |
| ----------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude -code      | streambaar-http                             | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                                                        | Ja — MCP-compatibel; geïnjecteerd.                                                                                                                                                                                    |
| Cursor / Cline    | `stdio`** of** `streamable-http`            | stdio: `omniroute --mcp` met `OMNIROUTE_API_KEY` in `env`; of een externe MCP -invoer die naar `http://localhost:20128/api/mcp/stream` wijst (zie [Installatiehandleiding → MCP Clientconfiguratie](../guides/SETUP_GUIDE.md#mcp-client-configuration) ) | Ja — maakt reclame voor de `omniroute_ccr_*` tools.                                                                                                                                                                   |
| OpenCode          | streambaar-http                             | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream`, plus `codemode: false`                                                                                                                                                         | Tools die alleen worden geadverteerd met `codemode: false`; de instructie is nog steeds niet geïnjecteerd, omdat `omniroute_omniroute_ccr_retrieve` niet overeenkomt (zie [Clientvereisten](#client-prerequisites) ). |
| OpenAI-compatibel | OpenAI-compatibele HTTP (chat-voltooiingen) | standaard chat-voltooiingsclient tegen het OpenAI-compatibele eindpunt                                                                                                                                                                                   | **Nooit** — een gewone OpenAI-compatibele beller krijgt nooit te horen dat hij de tool moet aanroepen, en de instructie wordt niet geïnjecteerd.                                                                      |

### Ophaallimieten en paginering

MCP tooltekstresultaten worden rond `mcpAccessibility.maxTextChars` geknipt (standaard `50000`). Het ophalen van een `full` blok is beperkt tot 256 KiB —** er is geen onbegrensd volledig ophalen** . Wanneer de `chars=N` van een blok groot is, kunt u deze pagina's maken in plaats van het hele ding te trekken:

- Vuistregel:**`chars > 40000` → gebruik een `mode`** , nooit een kaal vol.
- `mode:"grep"` — regex `pattern` komt regel voor regel overeen, tot 1.000 overeenkomende regels (`unique: true` laat herhalingen vallen), het goedkoopst voor "vind de enige regel die ik nodig heb."
- `mode:"lines"` — een 1-geïndexeerd lijnbereik; heeft zowel `start` als `end` nodig.
- `mode:"head"` / `mode:"tail"` — first/last `n` lijnen.
- `mode:"stats"` — lijn-, teken- en bytetellingen zonder de hoofdtekst.

Gebruik `mode:"lines"` met `start`/`end` om een lang blok in pagina's te doorlopen in plaats van het hele ding in één keer op te vragen.

### Naamgeving van gereedschap

De ophaaltool heet momenteel `omniroute_ccr_retrieve` (het voorvoegsel `omniroute_` is een verouderde oplossing voor botsingen tussen servernamen). Een schonere toolnaam met een begrensd achtervoegsel en een oplossing voor MCP JSON resultaten die midden in de tekenreeks worden afgekapt, worden bijgehouden als upstream-follow-ups; deze pagina documenteert alleen het huidige, verzonden gedrag.

### Sessielevenscyclus

Streamable-HTTP-sessies vallen uit en de server plukt ze; het inactieve venster is de `MCP_SESSION_IDLE_MS` constante (waarnaar wordt verwezen met de naam, geen hardgecodeerde waarde, zodat deze pagina niet afwijkt als deze verandert). Het symptoom van een inactieve sessie is een HTTP 404 met `Unknown Mcp-Session-Id` — De remedie is om opnieuw verbinding te maken of de sessie opnieuw te starten,** niet** om een sleutel te draaien, een bereik te wijzigen of een gereedschap te hernoemen.

## API-oppervlak

| Route                                  | Doel                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| `/api/settings/compression`            | Algemene compressie-instellingen (inclusief `mcpAccessibility`-configuratie) |
| `/api/compression/preview`             | Voorvertoning van elke compressiemodus                                       |
| `/api/compression/language-packs`      | Beschikbare Caveman-taalpakketten weergeven                                  |
| `/api/context/caveman/config`          | Alias voor Caveman-instellingen                                              |
| `/api/context/rtk/config`              | RTK-standaardwaarden en -instellingen                                        |
| `/api/context/rtk/filters`             | RTK-filtercatalogus                                                          |
| `/api/context/rtk/test`                | RTK-eindpunt voor voorvertoning/tests                                        |
| `/api/context/rtk/raw-output/[id]`     | Geauthenticeerd herstel van geredigeerde onbewerkte uitvoer                  |
| `/api/context/combos`                  | CRUD voor compressiecombinaties                                              |
| `/api/context/combos/[id]/assignments` | CRUD voor toewijzingen aan routeringscombinaties                             |
| `/api/context/analytics`               | Alias voor compressieanalyses                                                |

Beheerroutes vereisen beheerauthenticatie of controles van het API-sleutelbeleid.

## MCP-tools

Compressie biedt vijf MCP-tools:

| Tool                                | Bereik              | Doel                                        |
| ----------------------------------- | ------------------- | ------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Instellingen, analyses en cachestatistieken |
| `omniroute_compression_configure`   | `write:compression` | Algemene instellingen bijwerken             |
| `omniroute_set_compression_engine`  | `write:compression` | Modus en optionele pijplijn instellen       |
| `omniroute_list_compression_combos` | `read:compression`  | Compressiecombinaties weergeven             |
| `omniroute_compression_combo_stats` | `read:compression`  | Combinatie-/engine-analyses lezen           |

## Bereik en uitsluitingen

**Embeddings worden nooit gecomprimeerd.** `open-sse/handlers/embeddings.ts` roept nooit een
compressie-engine aan — de aanvraag-/antwoordlichamen worden ongewijzigd rechtstreeks aan de executor
doorgegeven. Dit is momenteel structureel (embeddings en chatvoltooiingen hebben afzonderlijke handlers),
geen runtimecontrole, maar het betekent dat het risico op vectorvervorming in #8034 geen raakvlak
heeft in het embeddingspad.

**Uitsluitingsfilter per model/eindpunt (#8034).** Voor chatvoltooiingen kan een beheerder
model-id's / `provider/model`-doelen opgeven die nooit mogen worden gecomprimeerd — een beveiliging
die nuttig is als compressie later dichter bij een aan embeddings gerelateerd pad wordt geïntegreerd,
en in het algemeen nuttig is voor elk model waarbij de exacte byte-voor-byte-prompt belangrijk is
(deterministische evaluaties, cachegevoelige voorvoegsels, enz.).

- Instellingenveld: `exclusions?: string[]` in de algemene compressieconfiguratie
  (`GET`/`PUT /api/settings/compression`), opgeslagen via de bestaande `key_value`-compressienaamruimte
  (`src/lib/db/compression.ts`) — geen nieuwe tabel.
- Dashboardtabblad: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Patroonsyntaxis: `*` is het enige jokerteken. Elk ander regex-metateken in een patroon wordt
  vóór het matchen geëscapet, zodat `gpt-5.6` alleen overeenkomt met de letterlijke tekenreeks en nooit
  met `gpt-5x6` (veilig tegen ReDoS, begrensd, geen geneste kwantoren). Patronen worden hoofdletterongevoelig
  vergeleken met zowel de kale model-id als de samengestelde waarde `provider/model` — `gpt-5-6`,
  `openai/gpt-5-6` en `openai/*` werken allemaal, en alleen `*` sluit elk model uit.
- Matching: `isCompressionExcluded()` / `normalizeCompressionExclusions()` in
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` controleert het uitgesloten doel
  direct nadat de compressie-instellingen zijn bepaald, **voordat een engine wordt uitgevoerd**,
  en behandelt een overeenkomst precies alsof compressie algemeen is uitgeschakeld — de aanvraagbody
  is aantoonbaar byte-identiek. Het overslaan wordt via `writeCompressionSkip(..., "excluded")`
  vastgelegd voor zichtbaarheid in analyses.
- Standaard (lege/afwezige lijst): identiek aan het gedrag vóór #8034 — niets wordt uitgesloten.

## Bekende beperkingen

- **LLMLingua-2 (SLM) vereist optionele afhankelijkheden op dezelfde locatie.** De worker wordt in een
  productiebuild alleen uitgevoerd wanneer `@atjsh/llmlingua-2` en peer-afhankelijkheden samen in
  `dist/node_modules` zijn geplaatst (zie `scripts/build/colocateOptionals.mjs`, #4286). Zonder deze afhankelijkheden
  schakelt de engine bij fouten terug naar de oorspronkelijke tekst. De resolutie van de worker is niet langer afhankelijk van
  `import.meta.url` (dit werkt niet in de zelfstandige bundel), maar is gebaseerd op de runtime-
  cwd / `argv[1]`.
- **De Caveman-taalpakketten `de` / `fr` / `ja` zijn onvolledig.** Ze bevatten regels voor `context` +
  `filler` + `structural`, maar geen `dedup`- / `ultra`-pakketten. Daardoor is de intensiteit `ultra`
  voor die talen niet sterker dan `full` (ze gebruiken uitsluitend hun eigen regels — er is geen
  stilzwijgende terugval op de Engelse `dedup`-/`ultra`-regels, die anderstalige tekst zouden verminken).
  `en` / `es` / `id` / `pt-BR` zijn volledig. Bijdragen met `dedup.json` + `ultra.json`
  voor de onvolledige pakketten zijn welkom.
- **Gestapelde telemetrie vermeldt alleen engines die compressie hebben toegepast.** Een stap in een gestapelde pipeline waarvan
  de engine wel is uitgevoerd maar 0% besparing opleverde, retourneert `stats:null` en wordt daarom niet weergegeven in
  `engineBreakdown` — niet te onderscheiden van een overgeslagen stap. Om onderscheid te maken tussen
  „uitgevoerd, 0%” en „overgeslagen” is een wijziging van het uitsplitsingsmodel nodig; dit is uitgesteld.

## Geldigmaking

De gerichte poorten voor dit gebied zijn:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
