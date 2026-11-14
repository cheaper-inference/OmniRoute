# Guardrails (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Posledná aktualizácia:** 2026-10-17 — v3.8.52 (pridané [Pokrytie a limity](#coverage-and-limits):
> ktoré routy a cesty odpovedí hooky zasahujú, zlúčené vypínacie hlavičky (#16412), blokovací
> režim injekcie ako povinná hranica (#16413) a čo vidí odpoveď pred post-call)

Guardrails vynucujú bezpečnosť, zásady a transformácie obsahu na hranici
medzi OmniRoute a upstream poskytovateľmi. Každý guardrail môže kontrolovať
(a voliteľne zamietnuť, transformovať alebo anotovať) payloady požiadaviek
(`preCall`) a odpovede z upstream (`postCall`).

Systém je **fail-open**: ak guardrail počas vykonávania vyhodí výnimku,
registry chybu zaznamená a pokračuje ďalším guardrailom namiesto toho, aby
požiadavka zlyhala. Blokovanie je explicitné rozhodnutie (`block: true`),
nikdy nie náhoda. Jedinou výnimkou je prerušená požiadavka: keď je `signal`
volajúceho prerušený, guardrail, ktorý vyhodí výnimku, zamietne beh hooku
namiesto toho, aby sa preskočil.

Hooky **nebežia** pri každej route ani pri každej odpovedi. Predtým, ako sa
budete spoliehať na guardrail ako na bezpečnostný mechanizmus, prečítajte si
[Pokrytie a limity](#coverage-and-limits).

## Vstavané zábradlia

Register pri importe automaticky načíta šesť zábradlí v poradí podľa priority (pozri `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Meno                | Etapa(y)       | Súbor                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Spustia sa čísla s nižšou prioritou** najprv** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Základný model GLM 5.3 a `glm-5.3-{low,high,max}` majú explicitné metadáta `supportsVision:false` registry/spec. Varianty GLM 5.3 Flash zostávajú modelmi natívneho videnia. Trasa `/v1/messages` kódu Claude vstupuje do zdieľanej reťaze zábradlia pred volaním `handleChat`** predtým** preklad Claude-to-OpenAI; vnorené obrázky výsledkov nástroja `Read` musia byť popísané alebo spracované skôr, ako ich preklad pozdvihne na obsah OpenAI `image_url` (#17069).

Zachytáva požiadavky s obrazom zamerané na** nevidiacich modelov** a buď presmeruje celú požiadavku na model schopný videnia, alebo nahradí časti obrazu textovými popismi vytvorenými konfigurovateľným modelom videnia pred volaním smerom hore. To umožňuje poskytovateľom, ktorí poskytujú iba textové informácie, transparentne spracovávať multimodálne užitočné zaťaženie.

Prietok:

1. Preskočte, ak cieľový model už podporuje videnie (pokiaľ sa neobjaví v zozname nútených mostov `isVisionBridgeForcedModel`).
2. Extrahujte časti obrázka pomocou `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ktorý deleguje na** jednotný detektor médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný zdroj pravdy zdieľaný s kombinovaným filtrom kompatibility. Extrakcia je povolená pre tvary `replaceImageParts` ktoré sa môžu spájať späť (výťažok ↔ nahrádza zmluvu): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` a odpovede API `input_image`. Zodpovedajúce obrázky vnorené do výstupov nástroja Claude Code `tool_result.content` a Responses sú tiež extrahované a nahradené ich pôvodnými cestami; iba indikátorové tvary sú kombinovaným filtračným materiálom a nie sú extrahované. Preskočte, ak sa nič nenašlo.
3. Vyriešte konfiguráciu runtime cez `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nové kľúče nastavení `modalityBridge*` vyhrávajú; staré kľúče `visionBridge*` zostávajú a** jednocyklový núdzový režim** (okno návratu). Preskočiť pred akýmkoľvek prechodom média, keď je most zakázaný.
4. Volič režimu (`modalityBridgeVisionMode`, pozri tabuľku nižšie) rozhoduje o zmene trasy vs. Presmerovanie vráti `modifiedPayload` iba s vymeneným `model` plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opíšte cestu: uzavrite obrázky na `maxImages`, vytvorte výzvu so zreteľom na úlohu, pozrite si vyrovnávaciu pamäť popisu, zavolajte model videnia** paralelne** (`Promise.allSettled`) a na ich miesto vložte časti textu `[Image N]: <description>`. Neúspešný popis poskytuje `null`: nespracovaný obrázok sa zachová pre ciele unknown/vision-capable (#4012), ale** potvrdený priamy textový cieľ** alebo nulové videnie combo dostane explicitný textový útržok `(unavailable — no vision-capable provider connected)` pre každý nepopísaný obrázok, vrátane čiastočných zlyhaní a obrázkov za hranicou popisu (#17069). Existujúce nezlyhané kombo popísať núdzový režim zostáva na svojom mieste (#8430).
6. Vráti `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Volič režimu (`modalityBridgeVisionMode`)

| Režim      | Predvolené | Správanie                                                                                                                                                                                                                                                                                                            |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Staršie heuristické, nedotknuté (#6640/#7204): nekombinované/`auto/` modely sa presmerujú na najlepší model videnia, pokiaľ pôvodný model už nemá použiteľné poverenia (potom popíšte); kombo ciele vždy opisujú.                                                                                                    |
| `describe` |            | Vždy popíšte — blok presmerovania sa úplne preskočí; vždy odpovie užívateľom zvolený model.                                                                                                                                                                                                                          |
| `reroute`  |            | Vynútiť presmerovanie: Obíde sa strážca modelu udržiavania poverenia. Presmerovanie -** cieľ** Ochrana poverení stále aplikuje — keď neexistuje žiadny použiteľný cieľ videnia, most sa zablokuje s jasnou chybou, namiesto toho, aby popisoval alebo odosielal nespracované obrázky do cieľa obsahujúceho iba text. |

Vynútené režimy skrat** predtým** spustí sa automatická heuristika; Správanie `auto` je bajtovo identické so zábradlím pre-PR-1.

#### Rozsah kľúča API (`visionBridgeKeyScope.ts`)

Keď kláves API volajúceho obmedzuje `allowedConnections`, kvóty (`allowedQuotas`) alebo modely (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), most vyberie iba presmerovanie a popíše modely, ktoré môže kľúč použiť, pri spojeniach, ktoré môže kľúč použiť. Opis hovoru potom vždy prechádza cez vlastnú slučku OmniRoute s hlavičkou `x-omniroute-self-loop-key-id`, takže prijímajúca žiadosť o rozhovor znova vynúti pripojenie a modelovú politiku tohto kľúča. `enforceApiKeyPolicy()` rešpektuje túto hlavičku iba spolu s nositeľom vlastnej slučky, takže môže iba zúžiť prístup a id, ktoré sa nevyrieši, je odmietnuté.

Ak pre kľúč nie je povolený žiadny model zraku, a** potvrdený textový cieľ** odmietne požiadavku na obrázok lokálne s čistým HTTP 400 namiesto preposielania bajtov obrázka neschopnému upstream (#17069). Pre ciele s neznámou alebo natívnou schopnosťou videnia si dráha popisu zachováva svoje predchádzajúce správanie pri otvorení zlyhania (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Žiadosti bez kľúča a kľúče bez týchto obmedzení sa správajú rovnako ako predtým.

#### Výzva na opis s ohľadom na úlohu (`modalityBridgeVisionTaskAware`)

Predvolené** pravda** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pripája text súboru** posledná správa používateľa** (skrátené na 500 znakov) do základnej výzvy na opis, smerujúc popis k tomu, čo sa používateľ skutočne pýtal (vzor codex-vision-proxy) a žiadajúci model videnia, aby prepísal viditeľný text. Pri vypnutom príznaku — alebo bez používateľského textu — sa základná výzva použije nezmenená.

Vlastná požiadavka kompatibilná s OpenAI v popise self-loop (`callVisionModelSingle()` v `visionBridgeHelpers.ts`) vždy vyžaduje `image_url.detail: "high"` — bezpodmienečne, pre každé caller/provider, bez brány na žiadny klientsky signál. Vzorkovanie s nízkymi detailmi znižuje presnosť OCR presne pre úlohu prepisu textu, ktorú táto výzva požaduje, takže samotné volanie popisu vždy vyžaduje vysoké podrobnosti bez ohľadu na to, akú úroveň podrobností použila pôvodná prichádzajúca požiadavka. Toto má vplyv len na interné telo požiadavky popisu; nemení to, ako OmniRoute prepošle vlastné `image_url.detail` volajúceho na primárnu požiadavku — že predvolená hodnota sa použije samostatne a iba pre zistených klientov OpenCode v `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Vetva formátu drôtu Anthropic popisu vlastnej slučky nemá žiadne pole `detail` a nie je ovplyvnená ani jedným predvoleným nastavením.

#### Opíšte výstupný limit (`modalityBridgeVisionMaxChars`)

| kľúč                           | Predvolené | Rozsah                 |
| ------------------------------ | ---------- | ---------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` alebo 100 – 50 000 |

`0` (predvolené) znamená** bez čiapky** — popis vrátený `callVisionModel()` prechádza nezmenený, pričom sa zachová existujúce správanie. Akákoľvek hodnota v rozsahu 100–50 000 skráti popis s príponou `…` predtým, ako sa spojí späť ako `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`). Zvýšte to pri úlohách OCR náročných na detaily, kde následný model potrebuje úplný prepis; znížte ho na viazané používanie tokenov na modeloch s chatrným videním. Pole ovládacieho panela žije na paneli Rozšírené na karte Vízia (`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a upína akúkoľvek hodnotu medzi 1 a 99 až po 100 poschodí, pričom explicitné `0` ponecháva nedotknuté — `0` je platná hodnota Zod sama osebe (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nie iba „nenastavená“ predvolená hodnota.

#### Popis cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache pre popis výstupov, zdieľané v rámci celého procesu. Kľúč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s orámovaním s predponou dĺžky (bez kolízií medzi poľom). Modelovým komponentom je** nakonfigurovaný** model mosta, nie model, ktorý skutočne odpovedal — `callVisionModel` sa môže interne vrátiť späť a kľúčovanie na pokus by fragmentovalo vyrovnávaciu pamäť. Neúspešné popisy sa nikdy neukladajú do vyrovnávacej pamäte. Nastavenia:

| kľúč                            | Predvolené | Rozsah  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Vzdialená normalizácia obrazu (samocyklické načítanie describe/base64 )

Keď sa most dostane a** diaľkový** samotný obrázok — Anthropic popisuje samovolnú konverziu a konverziu vo formáte claude-wire base64 (`ensureBase64ImagesForClaudeWire`), obe cez `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — sa výsledné dáta URI prenesú cez `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) predtým, ako sa vložia do požiadavky na model videnia. Príliš veľké obrázky sú zmenšené na a** 2048px dlhý okraj** (zhodujúce sa s limitom pre zmenu veľkosti OpenAI/Anthropic už aplikovaným na strane servera), čím sa zníži veľkosť uploadu bytes/latency bez zmeny toho, čo vidí model videnia. Zmena veľkosti používa `sharp`, načítaný prostredníctvom dynamického importu: na platforme, kde sa nepodarí načítať jeho natívny binárny súbor, `normalizeDataUri()`** nikdy nehádže** — sa vráti späť na prechod pôvodných bajtov, takže cesta describe/base64-conversion vždy funguje. Neobrázkové bajty (načítanie, ktoré nevrátilo dekódovateľný obrázok) tiež prechádzajú bez zmeny. Táto normalizácia sa vzťahuje na obrázky, ktoré most načíta pre svoje vlastné volanie — nikdy sa nepoužije na nespracovaný prenosový obsah volajúceho, čo je v súlade s princípom mutácie iba pri prihlásení (Hard Rule #20).

#### Migrácia schémy nastavení +

Nové kľúče `modalityBridge*` sú overené Zod v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio a skupina `modalityBridgeAudio*` používaná zvukovým mostíkom. Migrácia `141_modality_bridge_settings.sql` skopíruje existujúce pôvodné hodnoty `visionBridge*` do zodpovedajúcich nových kľúčov (idempotentné, nikdy neprepíše hodnotu `modalityBridge*` nastavenú operátorom); staršie kľúče zostanú akceptované ako núdzové čítanie počas jedného cyklu vydania.

#### Štatistiky + hlavičky transparentnosti

Popíšte transformované odpovede nesú `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (vytvorené pomocou `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, označené `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Presmerované žiadosti dostanú** č** hlavička — užitočné zaťaženie bolo nedotknuté a výmena modelu je už viditeľná v poli `model` tela odpovede.

`GET /api/modality-bridge/stats` (autorizácia správy, rovnaká úroveň ako `GET /api/settings`) vracia počítadlá jednotlivých modalít v pamäti `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pre `vision`, `audio` a `video`. `averageLatencyMs` používa ako menovateľ `latencySamples`, nie všetky pokusy; operácia bez časovania nevytvára vzorku nula milisekúnd. `bridged` zostáva spätne kompatibilným aliasom pre úspešné konverzie; neúspešné pokusy ho nezvyšujú. Počítadlá sa resetujú pri reštarte procesu podľa návrhu (telemetria, nie účtovníctvo).

#### Konfigurácia palubnej dosky

Vyhradená stránka dashboardu je `/dashboard/settings/modality-bridge`. Jeho karty `Vision`, `Audio` a `Video` s adresou URL zachovávajú parametre dopytu pri prepínaní hodnoty `tab`. Karta Vision odhaľuje aktiváciu, režim, výber modelu (vrátane automatického predvoleného nastavenia), výzvy na základe úloh, rozšírené limity timeout/image/description-length/cache, počítadlá spustenia a požiadavku na chránenú vzorku. Karta Zvuk je tiež živá: odhaľuje aktiváciu, výber modelu iba STT s automatickým nastavením, limity timeout/max-clip, počítadlá zvuku a test vzorky `input_audio`. Karta Video je funkčná: hlási stav FFmpeg/ffprobe runtime — jeden zo štyroch explicitných stavov UI (`unknown` keď je sonda v lete alebo sa nemôže dokončiť, `restricted` na hostiteľskom paneli bez slučky, kde je sonda preskočená na strane klienta, `unavailable` po otestovaní a potvrdení chýba, alebo `available` s verziami FFmpeg/ffprobe ) —, pretrvávajú limity pre výber modelu videnia a enable/model/frame/video/timeout počítadlá.

Bývalá karta Vision Bridge v nastaveniach AI je odkazom kompatibility na novú stránku; už nevlastní druhú kópiu formulára. Poskytovatelia médií tiež prepájajú pracovné toky medzi obrazom a textom a prevodom reči na text s príslušnými kartami Modality Bridge bez odstránenia existujúceho ihriska prevodu reči na text.

**Samoslučkový vstupný bypass:** keď popis hovor smeruje cez vlastnú slučku `/v1` OmniRoute(neštandardný model poskytovateľa), čiastková požiadavka odošle `x-omniroute-admission-bypass: internal` a overí sa pomocou vyriešeného poverenia vlastnej slučky — miestneho strážcu `sk_omniroute` v lokálnom režime alebo operátorom nakonfigurovaný kľúč env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350) môže stále opísať nasadenie `REQUIRE_API_KEY=true`. Vynechanie je povolené iba pre tieto presné poverenia, takže externí klienti nemôžu použiť hlavičku na preskočenie vstupu.

Staršie predvolené nastavenia žijú v `src/shared/constants/visionBridgeDefaults.ts`; nové predvolené hodnoty mode/task-aware/cache a prekladač nastavení fungujú v `src/shared/constants/modalityBridgeDefaults.ts`. Ochranná zábradlia odhaľuje možnosť konštruktora `deps`, takže testy môžu vložiť falošné implementácie `getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytáva žiadosti o rozhovor so zvukom skôr, ako dosiahnu cieľ, o ktorom nie je známe, že akceptuje zvukový vstup. Nikdy nepresmeruje požiadavku na rozhovor: zvukové časti sa prepisujú cez existujúci koncový bod s viacerými časťami kompatibilný s OpenAI a vybraný model rozhovoru pokračuje s prepismi textu.

Prietok:

1. Vyriešte `supportsAudio` cez `getResolvedModelCapabilities()`. Vyhrávajú explicitné metadáta poskytovateľa a registra, potom metadáta statického modelu a potom synchronizované `modalities_input`. Deklarovaný zoznam vstupov bez `audio` je `false`; nezostáva žiadny dôkaz o spôsobilosti `null`. `false` aj `null` aktivujú konzervatívny most, zatiaľ čo `true` ho obchádza.
2. Vyriešte nastavenia `modalityBridgeAudio*` a extrahujte spájateľné audio časti najvyššej úrovne z každej správy prostredníctvom zdieľaného detektora `detectMediaParts()`. Podporované tvary drôtov sú OpenAI `input_audio`, `audio_url` a `source.media_type: "audio/*"`. Vnorený zvuk je detekovaný na smerovanie, ale nie je odstránený spojovacou cestou. Práca je obmedzená `modalityBridgeAudioMaxClips`; neskoršie časti zostanú nedotknuté.
3. Ctite si nakonfigurovaný `provider/model` alebo nechajte `selectAudioBridgeModel()` kráčať `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnom poradí katalógu a vyberte prvý model s použiteľnými povereniami aktívneho poskytovateľa.
4. `callAudioTranscription()` konvertuje zvuk base64/data-URI na viacdielny `file` alebo sťahuje vzdialené `audio_url` prostredníctvom iba verejného odchádzajúceho strážcu s pripnutím DNS a viazaním 25 MB. Potom POSTs súbor a vybraný model do lokálnej vlastnej slučky `/v1/audio/transcriptions`, autentifikovanej pomocou `resolveSelfLoopBearer()`. Existujúca trasa prepisu vykonáva normálne vyhľadávanie poverení, spracovanie cooldown/rate-limit a odoslanie poskytovateľa.
5. Úspešné hovory nahradia ich časti `[Audio N]: <transcript>`. Hovory prebiehajú so `Promise.allSettled`: individuálne zlyhanie zachová pôvodnú zvukovú časť (#4012 zmluva). Ak každé volanie zlyhá a cieľ je dokázaný `supportsAudio === false`, časti sa stanú `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). V prípade neznámeho cieľa (`null`) zostane výsledok úplného zlyhania nedotknutý. Osvedčený iba textový cieľ bez použiteľného poverenia STT dostane rovnaký explicitný výpis bez uskutočnenia sieťového volania.

Úspešné prepisy používajú vyrovnávaciu pamäť Modality Bridge LRU/TTL pre celý proces. Kláves kombinuje zvukovú referenciu, stabilné označenie prevádzky `audio-transcription` a vybraný model STT ; zlyhania sa nikdy neukladajú do vyrovnávacej pamäte. Zvukové pokusy aktualizujú zdieľané počítadlá `bridged`, `cacheHits`, `failures` a `lastUsedAt`. Transformované odpovede nesú `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotknuté požiadavky nedostanú segment Audio Bridge.

Nastavenia runtime sú zálohované DB a overené Zod:

| kľúč                          | Predvolené | Rozsah            |
| ----------------------------- | ---------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                 |
| `modalityBridgeAudioModel`    | `""`       | Auto alebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10              |

Zdieľaná vyrovnávacia pamäť zostáva riadená `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytí časti videa najvyššej úrovne v Dokončeniach rozhovoru `messages` a Odpovede API `input` pred volaním cieľa bez známej podpory natívneho videa. Podporované tvary sú `input_video`, `video_url`, `video_source`, HTTPS URLs a `data:video/*;base64,...` data URIs. Obyčajné názvy súborov v texte sa nepovažujú za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vlastní prechod požiadaviek, kontrolu capability/policy, agregáciu podľa požiadavky a užitočné zaťaženie odpovede. Akvizícia — pre prácu s videom, vyrovnávacia pamäť celého výsledku, ktorá popisuje sekvenciu snímok (ktorá spája akýkoľvek zvukový prepis deklarovaný volajúcim) a metrics/abort/cleanup — pre každý pokus je skryté za `processVideoPart` v `videoBridgePipeline.ts`, volá sa raz za video časť v slučke `preCall`. Tento modul tiež definuje explicitné hranice portu `VideoMediaBrokerPort` (získavanie bajtov a extrahovanie vzorkovaných snímok), `VideoAudioTranscriptionPort` (spájanie zvukového prepisu deklarovaného volajúcim so vzorkovanými titulkami) a `VideoDrilldownPort` (starý tvar surového obchodu). Produkčné STT a retencia rámca sú zložené okolo popisujúceho portu cez `createVideoSttAdapter` a `createVideoDrilldownAdapter`; druhý používa životný cyklus zdieľanej nepriehľadnej rukoväte.

Cesta verejnej požiadavky `/v1` nikdy neimportuje ani nevyvolá podproces. Vzdialené videá sa sťahujú pod hranicou 50 MiB ; inline base64 videá majú konzervatívny 36 MiB dekódovaný limit na video, takže obálka model/messages/framing môže zostať v rámci verejného limitu na prijatie žiadosti JSON 50 MiB. Pred pridelením sa kontroluje dĺžka riadku a odhady dekódovanej veľkosti. HTTPS sa vyžaduje na úvodnom vzdialenom URL a každom presmerovaní pomocou existujúceho iba verejného odchádzajúceho strážcu s pripnutím DNS. Bajty potom prekročia presnú internú hranicu makléra `POST /api/modality-bridge/video/extract`. Touto cestou je `LOCAL_ONLY` aj `SPAWN_CAPABLE`, akceptuje iba požiadavku overenú pre daný proces, dôveryhodnú spätnú väzbu a nikdy neakceptuje URL, cestu k súborovému systému, spustiteľný súbor alebo zoznam argumentov. Potrubie veľkosti tela API a prírastková čítačka tela obsluhy nezávisle presadzujú vstupný limit 50 MiB makléra. Jeho ohraničený front spúšťa jednu extrakciu naraz, umožňuje štyri čakajúce úlohy a obmedzuje čakajúci vstup na 100 MiB.

Vo vnútri brokera číta `ffprobe` súkromný lokálny súbor; zoznam povolených v pevnom formáte nezahŕňa formáty zoznamov skladieb a manifestov. Pre povolené kontajnery rodiny MOV zostávajú externé odkazy na údaje MOV predvolene vypnuté a príkaz Fix sa k nim neprihlasuje. `ffprobe` aj `ffmpeg` používajú whitelist protokolu `file` -only, jedno vlákno, pevné polia argumentov, žiadny shell a spustiteľné súbory vyriešené z `PATH`. Streamy s priloženými obrázkami nie sú kandidátmi na prehrávanie. Všetky prehrávateľné toky musia spĺňať limity a pred deterministickým záložným tokom s najnižším indexom sa uprednostňuje explicitný predvolený tok. Videá sú obmedzené na 600 sekúnd, 8 192 pixelov na rozmer a 33 554 432 zdrojových pixelov. FFmpeg navzorkuje 1–16 snímok JPEG v strede, zmenší dlhý okraj na maximálne 1 024 pixelov bez prevzorkovania menších vstupov a nikdy neprijme URL. Vzorkovanie je predvolene `uniform`. Voliteľné politiky `scene_aware` a experimental `segment_aware` vykonajú jeden ďalší pevný prechod FFmpeg cez už overený lokálny tok, vyberú ohraničené časové značky `showinfo` scény a deterministicky sa vrátia späť k rovnakým jednotným stredovým bodom pri poruche detektora, časovom limite, chybnom výstupe alebo prázdnej množine kandidátov. Segment-aware režim prideľuje vzorky stredného bodu proporcionálne k overeným intervalom scén; dôkaz o segmente a núdzové správanie sú podrobne uvedené nižšie. Pevná 16-snímková čiapočka sa aplikuje po výbere v každej politike. Keď má požiadavka s ohľadom na scénu rozpočet iba na jednu snímku, používa jednotný stred aktívneho okna s plným videom alebo zaostrením a hlási `policyEffective: uniform`: jedna vybraná snímka scény nemôže zachovať oba časové konce. Volajúci môže voliteľne poskytnúť okno s konečným zameraním (`start`/`end` sekúnd); Hranice sú upevnené na trvanie média, obrátené alebo neobmedzené okná sú odmietnuté a všetky politiky vzorkovania sa vykonávajú iba v rámci normalizovaného intervalu. Výsledné okno je zahrnuté do vzorkovacích metadát a do nedôveryhodného predponu popisu, takže následné modely môžu rozlíšiť zameraný úryvok od celej časovej osi.

Zameranie sémantických titulkov je samostatné, explicitné nastavenie. Predvolený režim analýzy `full` zachováva existujúcu výzvu rámca a nikdy neposiela text požiadavky do modelu titulkov. V režime `focused` most načíta iba posledné neprázdne `text`/`input_text` vytvorené používateľom z rovnakého kontajnera chatu alebo odpovedí, normalizuje ho na NFC, zbalí riadiace znaky a medzery a obmedzí ho na 500 bodov kódu Unicode. Prázdny výsledok sa vráti späť na presnú výzvu `full`. Použiteľná nápoveda je serializovaná ako JSON vo vyhradenom bloku nedôveryhodného používateľského kontextu a môže uprednostňovať iba pozorovateľné detaily; nemôže prepísať samostatné varovanie pred dodržiavaním pokynov, ktoré je viditeľné alebo počuteľné v médiách. Textové zameranie nikdy nevyvodzuje `start`/`end` ani nemení časový vzorkovač.

#### FU-07 štrukturálne segmentové dôkazy

`segment_aware` používa jeden ohraničený prechod predbežnej analýzy cez už overený lokálny tok videa. Pevný reťazec filtrov sa najprv zmení na šírku maximálne 320 pixelov, detekuje zmeny scény a zmrazené intervaly, potom vzorkuje rýchlosťou 1 snímka za sekundu pre rozmazanie, priemernú luma a informácie spatial/temporal. Prechod je obmedzený na 600 štrukturálnych vzoriek, jedno vlákno FFmpeg/filter, rovnaký protokol `file` -only a zoznamy povolených kontajnerov, 1 viazanosť procesu a výstupu na výstup MiB a maximálne 30 sekúnd v zdieľanom abort/deadline. makléra Nikdy neprijme príkaz, filter, cestu alebo URL z požiadavky.

Štrukturálne hodnoty sú deterministickým vzorkovacím dôkazom, nie sémantickým pochopením videa. Neodvodzujú predmety, akcie, titulky, reč ani zámer používateľa. Hranice scény a zmrazenia tvoria segmenty; zmrazenie pokrytia, rozmazania, expozície, priestorových detailov a časových zmien ovplyvňujú len to, ako sa pridelí existujúci rozpočet na 1–16 snímok. Úplne zmrazený segment je obmedzený na jednu snímku, zatiaľ čo nezmrazené segmenty súťažia o zostávajúci rozpočet. Keď hranice prevyšujú počet snímok, zachová sa jednotné pokrytie časovej osi, takže rýchle skoré strihy nemôžu zakryť dlhý segment. Hranice scény v rámci 1-sekundového rozlíšenia analýzy hranice zmrazenia sa spájajú.

Chýbajúce filtre, dôkazy malformed/empty, chyba detektora alebo ohraničený časový limit pred analýzou zlyhajú a neotvárajú presne jednotnú politiku stredného bodu. Otvorenie termínu zrušenia volajúceho alebo sprostredkovateľa sa nepodarí: ukončí sa počas letu podproces, zabráni neskoršej extrakcii rámca a súkromný dočasný strom sa odstráni v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické skutočné zariadenia FFmpeg pre post-odstránené úspory titulkov, rozdeľovanie rozpočtu s hustým pohybom, dôkazy blur/exposure/SI-TI, rýchle škrty s dlhým chvostom a postupné vyblednutie falošných poplachov. Zaznamenáva čas steny pred analýzou a tam, kde je k dispozícii `/usr/bin/time`, dieťa CPU a vrchol RSS. Jeho kontroly kvality sú iba štrukturálnymi veštcami. Skutočná kvalita modelu titulkov zostáva `HOLD` pretože tento zväzok nemá žiadny autorizovaný koncový bod alebo zmrazený sudca. Peňažné úspory tiež zostávajú `HOLD` pokiaľ `--caption-cost-per-call-usd` neposkytne explicitný kladný odhad na volanie; scenár nikdy nevyrobí ani jeden výsledok.

Každý rámec je obmedzený na 4 MiB, všetky nespracované snímky spolu na 23 MiB a odozva serializovaného makléra na 32 MiB. Súkromný dočasný adresár je odstránený v `finally`. OmniRoute nezdružuje FFmpeg a neakceptuje vlastnú cestu k spustiteľnému súboru. Pred titulkom použije most konzervatívny vizuálny deduplikačný prechod: každé JPEG sa zredukuje na vyrovnávaciu pamäť 16 × 16 odtieňov sivej a porovná sa iba s poslednou zachovanou snímkou. Pre požadovaný rozpočet titulkov nad jeden rámec poskytuje extrakcia ohraničenú skupinu kandidátov až do dvojnásobku rozpočtu a nikdy nie viac ako 16 snímok. Požadovaný strop sa uplatňuje až po deduplikácii, pričom prvý a posledný vybraní kandidáti sa zachovajú počas konečného preriedenia, keď je rozpočet aspoň dvoch. Verzia `grayscale-16x16-mean-cells-v2` politika používa väčšiu z priemerných delta luma a pomer miniatúrnych buniek, ktorých normalizovaná delta je aspoň 0,05. Prah duplicitných údajov je konštanta 0,04, ktorá sa volí skôr kvôli predvídateľnosti ako pri nastavení runtime. Tento sekundárny vysokokontrastný signál zachováva malý pohyb a zmeny viditeľného textu, ktoré môže skryť iba priemerné porovnanie. Chyby komparátora alebo dekodéra sa neotvoria a zachovajú pokrytie. Výstupné metadáta oddeľujú extrahovaných kandidátov, úspešne použité snímky a vizuálne duplikáty zahodené.

Explicitne označená časť videa si môže vyžiadať hárok kontaktov s časovou pečiatkou. Most vytvára nanajvýš 4-stĺpovú, 16-rámovú mriežku JPEG. Každá 512-pixelová bunka vypáli svoju zdrojovú časovú pečiatku do vysoko kontrastného spodného pásma, zatiaľ čo rovnaké časové pečiatky zostávajú v textových metadátach pre následné priradenie a audit. Úplné JPEG zostáva obmedzené na 32 MiB. Ak `sharp` nedokáže dekódovať alebo zostaviť mriežku, mostík spadne späť na jednotlivé snímky JPEG ; prerušenie klienta sa stále šíri cez operáciu listu.

Dôkaz o povýšení je zámerne oddelený od mikrobenchmarku syntetického zloženia. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje postroj A/B s verziou schémy pre skutočné modely videnia kompatibilné s OpenAI. Meria tokeny nahlásené poskytovateľom, latenciu end-to-end steny (vrátane zloženia listu), počet modelových hovorov a uchovanie evidentne definovaných faktov. Nespracované modelové odpovede sa do správy nezapisujú; zachovajú sa iba súhrny SHA-256 a zhodná skutočnosť IDs. Postroj neuskutoční žiadne sieťové alebo platené modelové volanie, pokiaľ neprejde `--execute-real` a nenakonfigurujú sa `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez tohto explicitného skutočného behu zostáva jeho strojovo čitateľný verdikt `HOLD`; samotné syntetické merania payload/call-count nie sú dôkazom povýšenia.

Samostatné `scripts/perf/video-bridge-promotion-eval.ts` spotrebuje pozorovania FU-07 alebo FU-09. Vstup do propagácie vyžaduje všetkých osem druhov syntetických scenárov plus dezinfikovaný skutočný klip, aspoň tri merané opakovania na rolu a prípad, všetkých desať deklarovaných metrík, zmrazené súhrny media/prompt/expected-fact/settings, jedinečné pozorovanie IDs a overené nasadené poradie A/B. Potvrdenie o vykonaní viaže súhrn korpusu, presné SHA kandidáta a revíziu modelu. Chýbajúce alebo neplatné merania zostávajú `HOLD`, vrátane CPU nad 30 s, vrchol RSS nad 512 MiB alebo predanalýza nad 30 s. Toto sú limity na prijatie dôkazov, nie nová záruka presadzovania RSS pri spustení.

FU-07 vyžaduje aspoň 98 % zachovanie kvality a latenciu p95 nie vyššiu ako 1,2-násobok základnej línie, plus buď 0,05 absolútne zlepšenie priemernej veľkosti prípadu pri ekvivalentnom priemernom volaní titulkov, alebo aspoň o 10 % menej priemerných volaní titulkov po odstránení duplikátov. FU-09 vyžaduje aspoň 0,85 kvalitu, 95 % zachovanie, 20 % zníženie mediánu latencie a 10 % zníženie tokenu. Strata kritických faktov, súlad s injekciou alebo chýbajúce použitie bránia propagácii. Jedno vykonanie nemôže nič podporiť: `--previous-report` potvrdzuje dve odlišné, neprekrývajúce sa, po sebe nasledujúce vhodné vykonania toho istého policy/model revision/candidate/corpus. Experiment s odberom vzoriek nemôže potvrdiť experiment s kontaktným hárkom.

Zberatelia by mali hodnotiť odpovede v pamäti a ukladať `responseDigest` plus metriky a väzby pozorovania, nikdy nie text odpovede. Spotrebiteľ tiež číta staršie nespracované pozorovania, ale nikdy nekopíruje tento text do svojich správ. Pre každé pozorovanie je akceptovaný presne jeden z `responseDigest` alebo `rawResponseText`. Verzovaný zoznam povolených zostáva prázdny s nemenným predvoleným nastavením `hold`. Oprávnený záznam vyžaduje referenciu dôkazov, politiku, revíziu modelu, presného kandidáta SHA, prehľad manifestu a dva rozdielne série IDs; protichodné kontexty sa odmietajú. Tieto metadáta sú zmluvou o audite, nie dôkazom toho, že referenčný súbor obsahuje skutočné merania. Pred pridaním akéhokoľvek záznamu skontrolujte skutočné účtenky. Koncový bod so štatistikami riadenia a informačný panel videa odhaľujú konzervatívnu pripravenosť. Samotný nakonfigurovaný alias modelu nestanovuje svoju revíziu ani bežiaceho kandidáta SHA, takže aktuálny informačný panel hlási `HOLD` namiesto opätovného použitia vhodnosti z iného kontextu vykonávania. Explicitný experimentálny výber zostáva oddelený od propagácie; žiadne predvolené nastavenie sa automaticky nezmení.

Volajúci môžu pripojiť voliteľné pole `transcript.cues` k podporovanej časti videa, ak už majú zarovnaný text. Každá tága musí niesť `text`, konečný interval `start`/`end` v rámci testovaného trvania a `source` na bielej listine (`client`, `embedded` alebo `audio-bridge`); `confidence` je predvolene `1` a musí zostať medzi `0` a `1`. Presné duplicitné náznaky sú zbalené. OmniRoute nikdy nespustí prepis z týchto metadát: overené podnety sa skopírujú do opísaného výsledku so zdrojom, spoľahlivosťou a intervalom a vykreslia sa ako nedôveryhodné pozorovania spolu s titulkami snímok. Neplatný text, text mimo rozsah alebo text bez pôvodu je odmietnutý a nie zmiešaný do prúdu titulkov. Obidva kanály prepisu tela požiadavky normalizujú dodaný pôvod k `client`, vrátane označenia `embedded` alebo `audio-bridge`. Len adaptér vlastnený serverom môže priradiť tieto dôveryhodné označenia prostredníctvom argumentu `trustedSource` iba v kóde; pole request JSON nemôže dosiahnuť tento argument. Text prepisu zostáva nedôveryhodným obsahom z médií bez ohľadu na jeho pôvod a nikdy nesmie určovať autorizáciu.

Pokročilý volajúci môže poskytnúť stopu `audioTranscript` pre to isté video; považuje sa za text poskytnutý klientom, nie za dôkaz prepisu servera. Fúzny šev vykonáva vizuálne a zvukové pozorovania v jednom termíne a preruší signál, zoradí ich na spoločnú časovú os, zbalí presné duplikáty a ohlási čiastočný výsledok, keď uspeje len jedna strana. Neplatné `audioTranscript` degraduje na tento čiastočný výsledok — vizuálny popis sa zachová a audio vetva zaznamená dezinfikovaný kód zlyhania — namiesto zlyhania celého videa. Dostupnosť na pobočku, čiastočný príznak a dezinfikované chybové kódy sú zachované v opísanom výsledku, v metaúdajoch zábradlia (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), v metaúdajoch medzipamäte výsledkov a v počítadlách premostenia. Predvolená cesta Video Bridge nevyvoláva prevod reči na text ani nesťahuje druhú kópiu média; bez tejto explicitnej stopy zostane iba video.

**Zachovanie prepisu (#12150 P1).** Toto platí automaticky vždy, keď Video Bridge (samotné prihlásenie) vykreslí prepisovú nápovedu — neexistuje žiadny samostatný príznak zachovania. Keď požiadavka vykreslí akúkoľvek prepisovú nápovedu (volajúcim deklarovaným `transcript` alebo zlúčeným `audioTranscript`), zábradlie ho označí `videoBridgeObserved` a vytvorí redigovaný tieň popisu videa — identické vykreslenie, v ktorom je telo voľného textu každého cue nahradené `[redacted-video-transcript]`, vytvorené nahradením poľa štrukturovaného nápovede pred zostavením splošteného obsahu — nepriateľské alebo bežné, vrátane tiel obsahujúcich `]`, ako je `[inaudible]`/`[music]` — môžu prežiť). Telo žiadosti trvalého protokolu hovorov zamieňa každú časť textu odvodenú z videa za tento redigovaný tieň, ktorý zodpovedá rovnosti obsahu; kotva `fullText` sa znovu načíta z hotového užitočného zaťaženia zábradlia pred zavolaním, takže zhoda je stále úspešná po tom, čo neskoršie zábradlia reťaze ( PII a maskovače poverení, priority 10/95) prepíšu text popisu na miesto a po injekcii system-prompt/handoff/memory pretvorí pole správ. Telo odoslané proti prúdu k modelu je nezmenené. Pozorovaná požiadavka tiež nevypĺňa žiadnu trvalú pamäť (extrakcia z požiadavky aj z odpovede sa preskočí), takže vlastná odpoveď modelu nemôže opakovať text prepisu do pamäte.

**Nespracované video polia (#12430).** Keď je most povolený a podpora natívneho videa je neznáma alebo chýba, definované polia `transcript`/`audioTranscript` tiež aktivujú `videoBridgeObserved`, a to aj po zlyhaní popisu alebo obmedzení `maxVideos`. počet `null` a prázdnych reťazcov; chýbajúce polia a iné ako video metadáta nie. Ponechané kópie revidujú tieto polia alebo vynechajú požiadavku a caches/Memory sa obídu.

Na týchto záložných cestách sa platné signály volajúceho stanú podporovanými časťami `text`/`input_text`, a nie neštandardnými poliami poskytovateľa. Obe stopy dodané žiadosťou zostávajú nedôveryhodnými pozorovaniami `client` s výslovným upozornením, že video nebolo popísané a časové pečiatky neboli overené voči médiám. Existujúce celkové rozpočty 256-cue/64-KiB a rozpočty na tágo sa vzťahujú na obe skladby spolu; časové pečiatky musia zodpovedať 600-sekundovému stropu makléra a akémukoľvek dodanému zaostrovaciemu okienku. Neplatné stopy sa zahodia, neposielajú sa ďalej ako svojvoľný text; platný súrodenec môže byť stále použitý, pokiaľ nie je prekročený ich kombinovaný rozpočet. Null/empty polia nepridávajú žiadny text. Táto záloha nepridáva žiadne načítanie médií ani prepis. Polia rozšírenia prepisu sa odstránia zo záložného video nosiča a jeho objektov `video_url`/`source`. Zoznam povolených káblov OpenAI zostáva prísny; Neznáme natívne video nosiče zostávajú dostupné a známe ciele, ktoré obsahujú iba text, uchovávajú bezpečné značky. Štruktúrované redakčné tiene chránia pripojený text prepisu, zatiaľ čo pôvodná požiadavka vlastnená volajúcim zostáva nezmenená. Natívne podporované ciele a deaktivované mosty si zachovávajú svoje existujúce správanie pri obchvate.

Ďalšie uchovávané kópie používajú rovnaký signál pozorovanej požiadavky. Neupravená snímka klientskej požiadavky pred ochranným zábradlím, nevybavená požiadavka v pamäti a protokol skorej zamietnutej požiadavky štrukturálne nahrádzajú polia prepisu vo video častiach; reťazcové výzvy syntetizované jednotlivými fázami potrubia a kontextovým odovzdaním sú redigované na priečinku tela trvalej požiadavky. Trvalá značka `video_content_removed` spôsobí, že pokračovanie `previous_response_id` zlyhá, a nie rekonštruuje text, ktorý bol úmyselne vyradený. Ak pozorovaná požiadavka pred zaprotokolovaním stratí tieň redigovania jednotlivých častí, alebo ak sa dokonca jeden z niekoľkých tieňov videa po neskorších mutáciách požiadavky nezhoduje, ponechané telo požiadavky sa úplne vynechá namiesto toho, aby sa zachoval čiastočne upravený prepis.

V prípade pozorovanej požiadavky môže odpoveď modelu citovať akúkoľvek časť prepisu bez ohraničenia štruktúrovaného podnetu. Jeho pretrvávajúci záznam hovorov `responseBody` je preto nahradený znakom vynechania; detailný artefakt potrubia (ktorý môže zahŕňať telá upstream/client a časti toku) sa nezachová. Sémantické, idempotencie a uvažovanie-replay cache obchádzajú čítanie a zápis pre túto požiadavku. Požiadavka poskytovateľa a odpoveď viditeľná klientovi zostávajú nezmenené. Predčasné udržiavacie bajty sa vypustia z dočasnej vyrovnávacej pamäte, keď sa vynechá podrobný artefakt. Chybné varovanie KiroEventStream iba počet bajtov užitočného zaťaženia, nikdy nie jeho obsah alebo hrubú chybu analyzátora JSON. Toto netvrdí, že každá nesúvisiaca diagnostika provider/plugin bola auditovaná; širšie zametanie zadržaného drezu sa sleduje v #11658.

Interný životný cyklus `/api/modality-bridge/video/drilldown` je samostatný substrát vyrovnávacej pamäte loopback/token-authenticated. Každá operácia tiež vyžaduje kanonickú nepriehľadnú hlavnú ID. Predtým, ako sa produkčný volajúci povolí, musí odvodiť ID od overeného nájomníka a nikdy nesmie preposlať hodnotu vybratú klientom. Kľúče vyrovnávacej pamäte viažu tento principál na kanonickú reláciu a videoreferenciu IDs, ukladajú iba ich kľúče SHA-256-derived a majú rozsah čítania aj odstraňovania na rovnaký princíp. Vyrovnávacia pamäť ukladá maximálne 16 odvodených rámcov JPEG na záznam, ich platnosť vyprší po desiatich minútach a podporuje obmedzené čítanie `start`/`end` alebo explicitné vymazanie relácie.

Každý princíp je obmedzený na 16 záznamov a 64 MiB kanonických údajov JPEG. Tieto limity sú nezávislé od globálneho stropu 64-entry/256 MiB : tlak na hlavné kvóty vysťahuje iba najmenej nedávno použité položky tohto príkazcu pred tým, ako sa zváži globálne vysťahovanie LRU. Položky s uplynutou platnosťou sa vymažú z hlavného aj globálneho účtovania o aktivite vyrovnávacej pamäte, zatiaľ čo zrušenie a zlyhanie overenia neznamenajú čiastočnú náhradu.

Vyrovnávacia pamäť odmieta nekanonický Base64, prebytočnú výplň, iné ako JPEG médiá, poškodené alebo skrátené JPEGs a JPEGs, ktoré vytvárajú varovanie počas dekódovania ohraničeného plného obrazu `sharp`. Prekóduje každý akceptovaný obrázok ako kanonický JPEG, odvodzuje šírku a výšku z dekódovaných bajtov namiesto dôveryhodných polí volajúceho a zahodí všetky koncové polyglot bajty namiesto toho, aby ich ponechal. Obom kvótam sa účtuje iba ohraničená kanonická komprimovaná vyrovnávacia pamäť. Limit JSON drôtu zahŕňa réžiu Base64 pre strop s dekódovaným vstupom 32 MiB. Každá uložená derivácia zaznamenáva svoj overený JPEG format/resolution, politiku vzorkovania, verziu odvodenia, čas vytvorenia, serverom vypočítanú hodnotu hash obsahu a hašovanú rodičovskú referenciu plus hodnotu hash rodičovského obsahu dôveryhodného volajúceho. Zrušenie sa kontroluje medzi asynchrónnymi fázami decode/hash pred potvrdením atómovej vyrovnávacej pamäte.

Produkčný producent opätovne používa už odvodené maklérske snímky až po úspešnej vizuálnej analýze, bez druhého videa download/extraction. Vyžaduje operátora `modalityBridgeVideoDrilldownEnabled=true`, prísne `drilldown: true` pre jednotlivé časti a overený záznam kľúča API ID. Klientom deklarované hodnoty principal/session nikdy nezakladajú vlastníctvo. Bez všetkých troch podmienok nehašuje, nezmení veľkosť ani neuchováva ďalšie snímky. Porucha retencie zachováva použiteľnú vizuálnu odozvu. Žiadosti so súhlasom obchádzajú vyrovnávaciu pamäť výsledkov celého videa, takže výsledky uložené vo vyrovnávacej pamäti sa nikdy neprehrávajú.

Úspešné odpovede JSON a SSE odhalia najviac štyri nepriehľadné rukoväte v ohraničenej hlavičke `x-omniroute-video-drilldown`. Autorizovaný pôvod prehliadača môže čítať túto hlavičku bez rozšírenia politiky pôvodu CORS. Nové rukoväte používajú `v1.<32-byte random base64url token>` a register uchováva iba ich haše SHA-256. Analyzátor reader/header tiež akceptuje staršie 64-hex tokeny. Overeným verejným spotrebiteľom je `GET /api/v1/video-bridge/drilldown?handle=...`, nezávisle hradený `modalityBridgeVideoDrilldownRemoteEnabled=true`. Explicitná trvalá nepravda ruší prístup, aj keď je povolená staršia záloha env `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`. Udržanie produkcie má analogický záložný systém `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Obe zálohy sú predvolene vypnuté.

Spotrebiteľ odvodzuje vlastníctvo z overeného kľúča a uplatňuje kľúčovú politiku: GET aj DELETE patria do kategórie koncových bodov `video` vrátane aliasov `/v1` a `/api/v1`. Kľúče s neprázdnym zoznamom povolených koncových bodov musia obsahovať `video`; neobmedzené kľúče zostávajú kompatibilné. Spotrebiteľ vráti rovnakú 404 pre neznáme, expirované a iné kľučky kľúča. Akceptuje `variant=preview|standard|detail` (maximálny rozmer JPEG 320/640/1280, nikdy sa neupscaluje), `limit=1..8` (alebo starý alias `frames`, nikdy nie oboje), `page` s nulovým základom a voliteľné sekundy zaostrenia `start`/`end`. Duplicitné klávesy dotazu a okná s obráteným zameraním sú odmietnuté. Každý vrátený variant má hash svojho skutočného obsahu a metadát skutočného rozlíšenia, ktoré sú prepojené s ponechaným zdrojom. Varianty sú odvodené pri čítaní a nie ukladané ako extra uchovávané kópie. Odozva JSON, vrátane Base64/envelope, je obmedzená na 32 MiB; príliš veľká stránka vráti 413 a klient musí požadovať menej rámcov. Pred vrátením prečíta zrušenie kontroly okolo každej zmeny veľkosti a prekontroluje platnosť rukoväte. `DELETE` vlastníkom je idempotentný; vymazanie alebo uplynutie platnosti TTL uvoľní uchovávaný zdroj a účtovanie používania.

Zdieľaný ukladací priestor je lokálny pre proces: platnosť rukovätí vyprší pri reštarte a nie sú prenosné medzi nezávislými procesmi OmniRoute. Štatistiky manažmentu odhaľujú efektívnu politiku uchovávania/vzdialeného prístupu a agregujú iba zachované entries/bytes, nikdy nie médiá, referencie, hlavné IDs alebo popisovače. Panel nastavení videa zobrazuje tieto hodnoty a môže zachovať oba prepínače súhlasu. Táto implementačná dokumentácia nie je dôkazom skutočného nasadenia alebo propagácie; akceptácia skutočného modelu sa sleduje samostatne.

Snímky sa popisujú postupne podľa nakonfigurovaného modelu videa. Prázdne prepísanie videa zdedí nastavenie Vision; ak sú obe prázdne, automatický smerovač Vision vyberie efektívny model so schopnosťou videnia. Úspešné titulky nahrádzajú pôvodnú časť stabilnou predponou `[Video description:`, ktorá tiež označuje text ako nedôveryhodné pozorovanie odvodené od médií a prikazuje modelom, aby sa neriadili pokynmi v médiách. Kľúče vyrovnávacej pamäte pre titulky rámca zahŕňajú bajty JPEG, výzvu, časovú značku a efektívny model; do vyrovnávacej pamäte sa ukladajú iba úspešné titulky. Záznamy vo vyrovnávacej pamäti zachovávajú skutočný model úspešného výrobcu vrátane záložného modelu; most hlási `mixed` keď boli vyrobené rôzne rámy rôznymi modelmi. Zásah do vyrovnávacej pamäte opätovne používa túto identitu výrobcu namiesto toho, aby ju znova označil ako požadovaný plán smerovania. Vyrovnávacia pamäť výsledkov celého videa je kľúčovaná na každom vstupe, ktorý mení výstupnú výzvu —, efektívny model, politiku vzorkovania, počet snímok, režim sémantickej analýzy, odtlačok prsta SHA-256 normalizovanej nápovedy zamerania, okna zamerania, `transcript`, `audioTranscript` a príznaku kontaktného hárka —, takže zmena ktorejkoľvek z týchto dimenzií znamená vynechanie vyrovnávacej pamäte, nikdy nie zastarané opätovné použitie. Verzia vizuálnej dedupovanej politiky, prah a počet ohraničených kandidátskych rámcov sú tiež explicitné v kľúči a metaúdajoch cache výsledkov; zmena pravidiel preto nemôže znova použiť zastaraný popis celého videa. Metadáta Result-cache v4 uchovávajú režim a odtlačok prsta, nikdy nie surovú používateľskú úlohu. Metadáta zábradlia hlásia požadované aj efektívne spôsoby analýzy; požadovaný režim `focused` bez použiteľného používateľského textu je hlásený ako efektívne `full`.

Ochranná zábradlia extrahuje každú podporovanú časť videa, ale neopisuje viac ako `modalityBridgeVideoMaxVideos`. V prípade cieľa, u ktorého sa preukázalo, že má `supportsVideo === false`, sa neúspešné a nadlimitné videá stanú explicitnými bezpečnými textovými značkami, takže neprežije žiadne nespracované video. Ak funkcia nie je známa, tieto časti si ponechajú svoj video nosič; akýkoľvek záložný prepis nasleduje po konverzii ohraničeného textu vyššie. Ciele s `supportsVideo === true` obchádzajú most. Signál zrušenia požiadavky klienta sa šíri cez sťahovanie, front sprostredkovateľa, podprocesy a volania titulkov; preruší zastavenie medzi videami a nikdy nezlyhá otvorené nespracované médiá.

Nastavenia runtime sú zálohované DB a overené Zod:

| kľúč                                | Predvolené  | Rozsah / správanie                                                                                              |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Voliteľné runtime, opt-in                                                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachováva všeobecné titulky; `focused` používa ohraničený, nedôveryhodný kontext najnovšieho používateľa |
| `modalityBridgeVideoModel`          | `""`        | Zdediť model Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` alebo proporcionálne `segment_aware`; porucha detektora klesne späť na `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                  |

Pretrvávajúce staré hodnoty časového limitu videa nad 120 sekúnd sú viazané na termín makléra; nové nastavenia zápisy nad tento limit sú odmietnuté. `GET /api/modality-bridge/video/runtime` vyžaduje dôveryhodnú opečiatkovanú lokalitu spätnej slučky pred autentifikáciou alebo testovaním za behu, potom vyžaduje autentizáciu manažmentu. Vracia iba `available`, vyčistené verzie FFmpeg/ffprobe a pevný dôvod, keď je runtime nedostupné. Koncový bod internej extrakcie nie je verejným uploadom API: saturácia frontu vráti `503` plus `Retry-After`, odpojenie volajúceho vráti `499` a pevný termín makléra vráti `504`. Konvertované odpovede pridávajú `video->text;model=<visionModel>;parts=<videos>` do centrálnej hlavičky `x-omniroute-modality-bridge` bez odstránenia segmentov Vision alebo Audio.

### PII maskér (`piiMasker.ts`)

Beží ďalej** oboje** etapy.

- **`preCall`** klonuje užitočné zaťaženie, prechádza `system`, `messages`, `input` a `prompt` (vrátane položiek s jednoduchým reťazcom) a aplikuje `processPII()` (zo `@/shared/utils/inputSanitizer`) na polia reťazcov `content`/`text`. Keď `PII_REDACTION_ENABLED=true`, zistený PII sa zredukuje v odchádzajúcej užitočnej záťaži. Toto je nezávislé od `INPUT_SANITIZER_MODE` (ktorý riadi iba politiku rýchleho vkladania). Keď je redigovanie vypnuté, hovor zaznamenáva počty detekcií bez prepisovania obsahu.
- **`postCall`** hlboko klonuje odpoveď, spustí `sanitizePIIResponse()` plus maskovač tvaru Responses-API (`maskResponsesOutput` — pokrýva `output_text` a `output[].content[].text`). Ak dôjde k akejkoľvek úprave, upravená odpoveď nahradí originál.

Zábradlie nikdy neblokuje; iba anotuje (`meta.detections`, `meta.redacted`) alebo prepisuje.

**Reverzibilný trezor (`PII_REVERSIBLE_VAULT_ENABLED`, predvolený `false`).** Keď sú `PII_REDACTION_ENABLED` aj `PII_REVERSIBLE_VAULT_ENABLED` zapnuté (DB prepíše predvolenú hodnotu > env >, číta sa raz na požiadavku), `handleChat` otvorí jeden trezor na požiadavku klienta (`src/lib/pii/requestTokenVaultScope.ts`) a odovzdá ho predvolaniu ako `GuardrailContext.tokenVault`. Maskovač potom zapíše náhradné tokeny, ako napríklad `<<PII_EMAIL_QWERTYUI_1>>` namiesto `[EMAIL_REDACTED]`, pre vstavané, overené (GDPR/POPIA) aj vlastné pravidlá. Nonce je 8 náhodných veľkých písmen na požiadavku a rovnaká hodnota dostane rovnaký token v rámci požiadavky. Iba maskér razí: strážca rýchleho vstreknutia a `/api/guardrails/test` bežia bez trezoru a ponechávajú si zástupné symboly.

- Poskytovateľ, každý kombo úsek, opakovaný pokus, člen fúzneho panelu a rozhodca fúzie vidia len tokeny. Tokeny sa obnovia raz, v odpovedi 2xx, ktorá zanechá `handleChat`: na pole v analyzovanom SSE (rozdelenie tokenu medzi udalosti sa stále rieši; argumenty volania nástroja sú chránené pred JSON) alebo na pole v tele JSON s prepočítaným `Content-Length`. Obsah a text odôvodnenia a argumenty volania nástroja sa obnovia. Telá chýb (4xx/5xx) uchovávajú tokeny.
- Zlyhania zostanú súkromné: ak razba zlyhá alebo trezor odmietne hodnotu (1000 záznamov, 256 znakov na hodnotu, celkovo 64 KB ), namiesto toho sa zapíše zástupný symbol; token, ktorý trezor nedokáže vyriešiť, alebo obnovenie, ktoré zlyhá, zostane doslovné a zaznamená sa iba počet. Trezor neobsahuje žiadne časovače ani globálny stav; vymaže sa, keď sa tok odpovedí skončí, je zrušený alebo sa vyskytne chyba.
- Keď požiadavka razila tokeny, extrakcia pamäte, uloženie idempotencie a oba zápisy do sémantickej vyrovnávacej pamäte sa preskočia, pretože žiadna neskoršia požiadavka nedokázala tieto tokeny vyriešiť. V protokoloch hovorov nesú tokeny požiadavky a odpovede poskytovateľa; zaprotokolované telo požiadavky klienta je stále nespracovaným vstupom klienta, ako pri obyčajnej redakcii.
- Tokeny používajú náhodnú nonce pre každú požiadavku, takže predpona výzvy sa mení pri každom ťahu: ukladanie výzvy do vyrovnávacej pamäte na strane poskytovateľa nezasiahne maskované ťahy a token, ktorý sa vráti v neskoršom ťahu (napríklad cez `previous_response_id`), patrí k starej požiadavke a zostáva doslovný.

#### Výber podľa typu, vlastné vzory a počítadlá detekcie

**Dashboard → Settings → Security → PII masking** vyberie _čo_ je maskované. Nezapne maskovanie: to je stále `PII_REDACTION_ENABLED` (požiadavka) a `PII_RESPONSE_SANITIZATION` (odpoveď + SSE), obe sú štandardne vypnuté.

- **Výber podľa typu** — vstavané identifikátory sú uvedené v `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavené znamená každý typ (správanie pred týmto nastavením). Vzor `ssn_us` vyhľadávacieho nástroja sa mapuje na `ssn`. Šablóny (minimálne, štandardné, finančné, brazílske, USA, GDPR, POPIA, úplné) vyplňte iba začiarkavacie políčka v UI.
- **identifikátory GDPR a POPIA** — dvanásť vstavaných identifikátorov pokrývajúcich EU a juhoafrické osobné identifikátory (tabuľka nižšie). Ich regulárne výrazy, validátory a značky jurisdikcie žijú v jednej tabuľke, `src/shared/utils/piiPatterns.ts`, ktorú spotrebuje dezinfekčný prostriedok odpovede (`src/lib/piiSanitizer.ts`) aj maskovač žiadosti (`src/shared/utils/inputSanitizer.ts`). Zhoda je zredukovaná iba vtedy, keď ju jej validátor akceptuje; holých čísel nie je nikdy dosť. Operátor, ktorý uložil zúžený výber predtým, ako tieto identifikátory existovali, si zachová správanie, ktoré mal, kým sa nezaškrtnú nové identifikátory.
- **Vlastné vzory** — až 20 vzorov regulárnych výrazov alebo zástupných znakov (`*` = až 64 znakov bez medzier, `?` = jeden). Zápasy sa stávajú `[CUSTOM_REDACTED]`. Každý vzor prechádza cez `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): najviac 500 znakov, príznaky sú obmedzené na `g i m s u`, musí sa skompilovať, musí prejsť `safe-regex` (katastrofické spätné sledovanie) a nesmie sa zhodovať s prázdnym reťazcom alebo zástupným zástupným symbolom pre redigovanie. Vzor, ktorý zlyhá, sa pri ukladaní a testovaní odmietne a uložený riadok, ktorý zlyhá, sa namiesto kompilácie preskočí za behu. Vlastné vzory sa spúšťajú iba vtedy, keď je zapnuté maskovanie.
- **Detekčné počítadlá** — na jednotlivé typy počtov (nikdy sa nezhodujúce hodnoty), uchovávané v pamäti a resetované pri reštarte (`src/lib/pii/piiDetectionStats.ts`). Zvyšujú sa iba vtedy, keď je maskovanie zapnuté.

Nastavenia sú uložené v tabuľke `key_value` (priestor názvov `pii_settings`, `src/lib/db/piiSettings.ts`) a čítajú sa cez 1 s cache. API:

| Metóda | Cesta                    | Účel                                                                      |
| ------ | ------------------------ | ------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav vlajky, `enabledTypes`, `customPatterns`, počítadlá detekcie         |
| `PUT`  | `/api/settings/pii`      | Nahradiť `enabledTypes` (`null` = všetky) and/or `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Spustite jeden vzor nasucho so vzorkou maximálne 8 KB; nič nie je uložené |

Všetky tri vyžadujú autorizáciu správy a overenie tela pomocou Zod (`src/shared/validation/schemas/piiSettings.ts`). So zakázaným prihlásením (`requireLogin=false`) sú `GET` a testovací koncový bod otvorené, ale `PUT` stále potrebuje reláciu dashboardu, kľúč `manage` -scope API, prístupový token `oma_` s rozsahom zápisu alebo vyšším alebo token CLI alebo token internej služby odoslaný zo spätnej slučky.

#### identifikátory GDPR (EU) a POPIA (Južná Afrika).

| Id                  | Identifikátor            | Validácia                                                                                      |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Známa krajina, presná dĺžka pre túto krajinu, ISO 13616 MOD-97-10                              |
| `eu_vat`            | EU VAT číslo             | Známa predpona členského štátu a formát čísla tohto štátu (bez vyhľadávania VIES )             |
| `es_dni_nie`        | španielsky DNI / NIE     | Riadiace písmeno (hodnota mod 23); NIE je `X/Y/Z` + 7 číslic                                   |
| `it_codice_fiscale` | Taliansky Codice Fiscale | Kontrolné písmeno z tabuliek pozícií odd/even                                                  |
| `pl_pesel`          | Poľská PESEL             | Vážený kontrolný súčet a zakódovaný dátum narodenia, ktorý existuje                            |
| `nl_bsn`            | holandská BSN            | 11-proof (hmotnosti 9..2, -1)                                                                  |
| `de_steuer_id`      | Nemecké Steuer-ID        | ISO 7064 Mod 11,10 plus pravidlá štruktúry číslic (bez úvodnej 0)                              |
| `se_personnummer`   | švédske personnummer     | Luhn za posledných desať číslic a hodnoverný dátum narodenia (10 alebo 12 číslic)              |
| `za_id`             | Juhoafrické číslo ID     | Luhn nad všetkými 13 číslicami, platný dátum narodenia month/day, číslica občianstva 0 alebo 1 |
| `za_phone`          | Telefón z Južnej Afriky  | predpona `+27` / `27` alebo národný tvar `0..` napísaný s medzerou alebo spojovníkom           |
| `za_vat`            | Juhoafrické číslo VAT    | 10 číslic začínajúcich na `4`** a** "VAT" / "BTW" v predchádzajúcich 48 znakoch                |
| `za_tax_ref`        | Juhoafrická daň ref.     | 10 číslic začínajúcich `0`-`3`, Luhn,** a** "daň" / "SARS" v 48 predchádzajúcich znakoch       |

Pretože formáty obsahujúce iba číslice kolidujú s číslami objednávok, číslami zostavy a časovými pečiatkami, tie najslabšie (`za_vat`, `za_tax_ref`) potrebujú kľúčové slovo tága a holé desaťmiestne číslo `0..` sa nepovažuje za juhoafrické telefónne číslo. Medzery IBANs (`GB29 NWBK ...`) sa nezhodujú. Na streamovacej ceste sa tága vyhľadá iba v rámci aktuálneho bloku. Identifikátory sú pred všeobecnými vzormi telefónov, takže overený identifikátor má svoj vlastný zástupný symbol (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Šablóny `gdpr` a `popia` vyberajú ID EU a juhoafrickej republiky. Samotné maskovanie zostáva voliteľné (tvrdé pravidlo #20): nič tu nemení predvolené nastavenie príznaku funkcie.

### Rýchla injekcia (`promptInjection.ts`)

Zisťuje nepriaznivé štruktúry v obsahu dodanom používateľom a presadzuje nakonfigurovanú politiku. Správanie je riadené premennými prostredia a možnosťami konštruktora:

| Nastavenie   | Env var                                                                                               | Predvolené | Effect                                                                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povolené     | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | Keď `false`, zábradlie skratuje.                                                                                                                                                                      |
| Režim        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Zásady vstrekovania: `block`, `warn` alebo `log`. (`redact` je akceptovaný pre spätnú kompatáciu, ale áno** nie** text vstrekovania prúžkov; žiadosť o prepísanie PII riadi `PII_REDACTION_ENABLED`.) |
| Blokový prah | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Na blokovanie je potrebná minimálna závažnosť. Stredné je predvolene len na pozorovanie.                                                                                                              |

**Prednosť režimu** (`getMode`): volajúci `options.mode` → `INJECTION_GUARD_MODE`** prepísanie príznaku funkcie DB** (Nastavenia ovládacieho panela → → Príznaky funkcií) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Prepísanie palubnej dosky preto vyhráva nad env vars, takže Feature Flags UI riadi bežiaci strážca naživo (bez reštartu). Čítanie DB je bezpečné: ak dôjde k chybe, ochrana sa vráti k správaniu založenému na env, a keď nie je nastavené žiadne prepísanie, správanie je identické s rozlíšením iba env.

Zdroje detekcie:

1. `sanitizeRequest()` zo `@/shared/utils/inputSanitizer` (spoločná súprava detektorov používaná inde v potrubí).
2. Vstavaná `DEFAULT_GUARD_PATTERNS` (momentálne `system_override_inline` a `markdown_system_block`, obidve závažnosť `high` ).
3. Voliteľné `customPatterns` odovzdané cez možnosti konštruktora (reťazce, regex alebo záznamy `{ name, pattern, severity }` ).

Keď `mode === "block"`** a** aspoň jedna detekcia spĺňa prah závažnosti, `preCall` vráti `{ block: true, message: "Request rejected: suspicious content detected" }`. V režimoch `warn`/`log` sa zábradlie zaznamená, ale umožní volanie. Zdieľaný pomocník `evaluatePromptInjection()` sa exportuje aj pre volajúcich, ktorí potrebujú vyhodnotiť výzvy bez toho, aby museli prejsť cez register.

**Skenovanie viazané (v3.8.20):** detektor iba kontroluje** prvých 16 KB** spojeného textu výzvy — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v `src/shared/utils/inputSanitizer.ts`. Pred spustením slučky vzoru `detectInjection()` aj `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`. Direktívy vstrekovania sú umiestnené v hornej časti vstupu, takže to obmedzuje regulárny výraz CPU/GC na viac stovkách kB dát bez detekcie oslabenia (porovnaj #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Beží ďalej** oboje** etapy, posledné v predvolenom reťazci (priorita `95`). Redukuje dobre známe vzory kľúčov API / tajných tokenov z odchádzajúceho užitočného zaťaženia (obsah správy, argumenty volania nástroja, výsledky nástroja)** a** odpoveď poskytovateľa, takže poverenie vložené do výzvy (alebo spätne vyjadrené výsledkom nástroja) neprenikne k poskytovateľovi upstream alebo späť ku klientovi.

- **Iba prihlásenie** , rovnaká konvencia ako pri redakcii PII (pevné pravidlo #20-susedné): zakázané, pokiaľ `settings.credentialRedactionEnabled === true`** alebo** `CREDENTIAL_REDACTION_ENABLED=true`. Keď je zábradlie vypnuté, nikdy sa — a nikdy neprepisuje.
- `redactCredentials()` prechádza celým stromom payload/response (`walkValue()`, prototyp-pollution-safe, cycle-safe cez `WeakSet`) a nahrádza zhody zástupným symbolom `[REDACTED:<type>]`, pričom klonuje iba vetvy, ktoré sa skutočne zmenili.
- `CREDENTIAL_PATTERNS` pokrýva kľúče poskytovateľa LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), platobné kľúče (Stripe, Square), cloudové kľúče (AWS zgun, SendGrid prístupový kľúč, JWTs reťazce pripojenia nesúce poverenie (`mongodb://user:pass@...` atď.) a všeobecný vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`. Kľúče v tvare hlavičky (`authorization`, `x-api-key`, `api-key`, `apikey`) sú redigované skôr štrukturálne (len hodnota, predpona schémy ako `Bearer `/`Basic ` je zachovaná), nie prostredníctvom všeobecného regulárneho výrazu textu.
- Zábradlie nikdy neblokuje; iba prepisuje (`modifiedPayload` / `modifiedResponse`) a anotuje (`meta.credentialsRedacted`, `meta.count`).

Regresná stráž: `tests/unit/credential-masker-guardrail.test.ts`.

## Základný kontrakt (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true skratuje reťazec
  message?: string; // zobrazené pri blokovaní
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrátené z preCall na prepísanie požiadavky
  modifiedResponse?: TValue; // vrátené z postCall na prepísanie odpovede
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Guardrail signalizuje „žiadna zmena“ vrátením `void`, `{}` alebo
`{ block: false }`. Vrátenie `modifiedPayload`/`modifiedResponse` nahradí
hodnotu prechádzajúcu reťazcom pre nasledujúce guardraily.
`signal?: AbortSignal` prenáša životný cyklus volajúceho do guardrailov. Prerušenie požiadavky je zámernou výnimkou fail-open: mediálne mosty zastavia prácu a vyčistia sa bez obnovenia surových médií do cieľa, o ktorom je známe, že ich nepodporuje.

## Register (`registry.ts`)

Singleton `guardrailRegistry` poskytuje:

- `register(guardrail)` — pridá (alebo nahradí podľa normalizovaného názvu) guardrail a
  preusporiada podľa vzostupnej `priority`.
- `clear()` / `list()` — administratívne pomocné funkcie.
- `runPreCallHooks(payload, context)` — iteruje aktívne guardraily, prevedie
  payload cez `modifiedPayload` a zastaví sa pri prvom `block: true`.
- `runPostCallHooks(response, context)` — rovnaký priebeh na strane odpovede.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a voliteľne
  znova zaregistruje predvolené guardraily pre čistú izoláciu testov.

Oba spúšťače vracajú `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamov `GuardrailExecutionResult`, ktoré obsahujú
polia `blocked`, `skipped`, `modified`, `error` a `meta` pre jednotlivé guardraily,
užitočné na sledovanie.

### Zakázanie guardrailov pre jednotlivé požiadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zlučuje
deduplikovaný zoznam názvov guardrailov, ktoré sa majú pre aktuálnu
požiadavku preskočiť. Existuje päť kanálov, čítaných v tomto poradí a zlúčených
do jedného zoznamu (pri deduplikácii vyhráva prvý výskyt):

1. `apiKeyInfo.disabledGuardrails`
2. Telo požiadavky `disabledGuardrails` (najvyššia úroveň)
3. Telo požiadavky `metadata.disabledGuardrails` (len keď je `metadata` objekt)
4. Hlavička `x-omniroute-disabled-guardrails`
5. Zastaralá hlavička `x-disabled-guardrails`

Všetkých päť kanálov sa zlučuje vrátane oboch hlavičiek: odoslanie oboch
`x-omniroute-disabled-guardrails` aj `x-disabled-guardrails` preskočí zjednotenie
ich zoznamov a prázdna moderná hlavička už nezakrýva tú zastaralú
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), opravené v
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Hodnoty môžu byť polia reťazcov alebo reťazec oddelený čiarkami; názvy sa
orezávajú a normalizujú na kebab-case s malými písmenami (`pii_masker` → `pii-masker`)
a prázdne položky sa vynechávajú. Výsledok sa odovzdáva cez `context.disabledGuardrails`
registru, ktorý preskočí zodpovedajúce guardraily (`skipped: true` v `results`).

Zoznam zakázaných ovplyvňuje len **register**. Režim `block` ochrany pred prompt injection
je povinnou hranicou: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) volá `evaluatePromptInjection()`
bez akéhokoľvek zoznamu zakázaných ovládaného volajúcim (mŕtve volanie
`resolveDisabledGuardrails({ body })`, ktoré predtým vykonával, bolo odstránené v
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), takže požiadavka,
ktorá zakáže `prompt-injection`, je v režime `block` stále zamietnutá. Toto je
zámerné správanie. Kanály na zakázanie sú ovládané volajúcim (telo požiadavky,
metadáta, hlavičky) a volajúci nesmie byť schopný vypnúť bezpečnostnú kontrolu,
ktorú nastavil operátor
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Zjednotenie hlavičiek
z [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
mení len to, ktoré guardraily registra sa preskočia; neumožňuje klientovi
obísť middleware. Povinné politiky guardrailov na kľúč a na skupinu sú
sledované v RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Pozri [Pokrytie a limity](#coverage-and-limits).

## Exekučný príkaz

Pre každú požiadavku prechádzajúcu cez `src/sse/handlers/chat.ts` a `open-sse/handlers/chatCore.ts` (cesty četovej rodiny uvedené v časti [Pokrytie a limity](#coverage-and-limits) ):

1. `resolveDisabledGuardrails(...)` vytvára zoznam preskočení z kľúča API, tela a hlavičiek.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spúšťa zábradlia vo vzostupnom poradí priority:
   - Deaktivované mantinely sú zaznamenané ako `skipped`.
   - `preCall` každého zábradlia môže prepísať užitočné zaťaženie pomocou `modifiedPayload`.
   - Prvá `block: true` skratuje reťaz a psovod vráti odpoveď odmietnutia zábradlia.
3. (potenciálne prepísané) užitočné zaťaženie prúdi do kombinovaného smerovania a odoslania proti prúdu.
4. **Iba bez streamovania:** po zostavení odpovede spustí `guardrailRegistry.runPostCallHooks(...)` rovnaký reťazec odpovede. `block: true` tu zruší odozvu upstream a vráti HTTP 400. Streamované odpovede tento krok úplne preskočia.
5. **Len reverzibilný trezor:** keď požiadavka razila tokeny, `handleChat` ich obnoví na odpovedi 2xx, ktorú vráti, po hákoch po hovore a streamovanej transformácii PII, takže `PII_RESPONSE_SANITIZATION` vidí tokeny a modelom vygenerované PII, nikdy nie obnovený originál.

Zábradlia, ktoré hádžu, sa zaznamenávajú pomocou `error: <message>` a zaznamenávajú sa cez `logger.warn`, ale reťaz pokračuje — bez zlyhania podľa návrhu.

## Pokrytie a limity

Register zábradlia je zapojený iba do kanála chatu. Tieto limity sú určené `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` a `tests/unit/guardrail-pipeline-characterization.test.ts`; tieto testy zámerne aktualizujte, keď sa správanie zmení.

### Tam, kde prebiehajú háky

| Hák / ovládanie                              | Beží ďalej                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                            | Požiadavky spracované `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (a `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` a proxy chatu Telegram. Tiež testovací koncový bod dashboard `/api/guardrails/test`. Blok pred volaním vráti HTTP 400. |
| `runPostCallHooks`                           | **Nestreamovanie** iba odpovede z chatu (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamované odpovede ho nikdy nedosiahnu.                                                                                                                                                                                                                                                                                  |
| Streamovanie PII                             | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), vložené do `streamingPipeline.ts`, keď je `PII_RESPONSE_SANITIZATION` zapnuté. Nie je to zábradlie, takže blokovacie kanály na to nemajú vplyv.                                                                                                                                                                                                              |
| Reverzibilná klenba PII                      | Požiadavky spracováva len `handleChat`, keď sú zapnuté `PII_REDACTION_ENABLED` a `PII_REVERSIBLE_VAULT_ENABLED`. Tokeny sú razené predvolaním `pii-masker` a obnovené na výstupe `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Zakázanie `pii-masker` pre požiadavku znamená, že sa nič nevytlačí.                                                                                                               |
| Middleware na ochranu vstrekovania (staršie) | Každá trasa `/v1` nesúca výzvu, vrátane rodiny chatov (pozri [pokrytie trasy](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Len rýchla injekcia.                                                                                                                                                                                                                                                          |

### Čo nie je kryté

- **Médiá, vkladanie a dátové trasy** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) sa nikdy nedostanú do registra. Nebeží tam žiadne maskovanie PII, maskovanie poverení ani most modality. Ich jedinou kontrolou je starý middleware na ochranu injekcií.
- **Streamované odpovede** nezískajte žiadne zábrany po hovore: žiadne `pii-masker` alebo `credential-masker` po hovore a žiadne blokovanie po hovore. Použije sa iba streaming PII transformácia (keď je `PII_RESPONSE_SANITIZATION` zapnuté). Poverenie vrátené späť v streamovanej odpovedi nie je redigované.
- **Zakázať kanály vs. middleware (podľa návrhu):** middleware vyhodnotí promptnú injekciu pomocou vlastného volania `evaluatePromptInjection()` bez toho, aby odovzdal zoznam zákazov riadený volajúcim. Režim `block` je povinná hranica, ktorú nemožno obísť blokovaním riadeným volajúcim, a to ani na rodinných trasách chatu ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ). Vypnutím `prompt-injection` preskočíte iba zábradlie registra.

### Čo vidí odpoveď pred následným hovorom

Na ceste bez streamovania je poradie: extrakcia pamäte → spustenie vstavaného nástroja → ochranné zábradlia po hovore → ukončenie bloku po hovore → úložisko sémantickej vyrovnávacej pamäte.

- **Extrakcia pamäte** a** vykonanie nástroja** pozrite si odpoveď skôr, ako ju zábradlia po zavolaní môžu prepísať alebo zablokovať. Od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) extrakcia pamäte spúšťa extrahovaný text cez `sanitizePII` keď je `PII_RESPONSE_SANITIZATION` zapnuté (streaming aj non-streaming), ale pamäť a nástroje stále ponúkajú odpoveď, ktorú neskôr blokuje po volaní.
- **Sémantická vyrovnávacia pamäť** ukladá odpoveď po volaní, takže ukladá prepísanú odpoveď a zablokovaná odpoveď sa nikdy neukladá do vyrovnávacej pamäte. Záznamy vo vyrovnávacej pamäti sú zakódované podľa kľúča API.

## Konfigurácia

Premenné prostredia, ktoré čítajú vstavané zábradlia:

| Variabilné                            | Používa                    | Effect                                                                                              |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Nastavte `false`, aby ste úplne deaktivovali detekciu.                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Zásady vstrekovania: `warn`, `block` alebo `log`. Staršia hodnota `redact` neprepíše text injekcie. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Režim pre ochranu vstrekovania; tiež príznak funkcie DB, ktorý** prepíše** variácie env (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimálna závažnosť, ktorú `MODE=block` odmieta: `high` (predvolené), `medium` alebo `low`.         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Starý alias pre `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Keď `true`, požiadavka PII sa zredukuje (nezávisle od režimu vstrekovania).                         |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Pomocou `PII_REDACTION_ENABLED` razte reverzibilné tokeny a obnovte ich v odpovediach 2xx.          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (dolný prúd)  | Ovláda správanie maskovača na strane odozvy.                                                        |

Ochranné zábradlia Modality Bridge čítajú konfiguráciu runtime z úložiska nastavení zálohovaného DB (`getSettings()`), nie env vars. Primárne kľúče Vision sú `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`. Staršie kľúče `visionBridge*` sú akceptované iba ako zdokumentovaná rezerva čítania s jedným cyklom; na zápis na dashboard sa používajú primárne kľúče. Predvolené hodnoty a záložný riešič fungujú v `src/shared/constants/modalityBridgeDefaults.ts`, pričom staršie konštanty sú zachované v `src/shared/constants/visionBridgeDefaults.ts`.

Zvuk používa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips` plus zdieľané nastavenia `modalityBridgeCache*`. Zvuk nemá žiadny záložný kľúč, pretože tieto kľúče boli zavedené so schémou Modality Bridge.

Video používa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` a `modalityBridgeVideoTimeout` plus zdieľané nastavenia `modalityBridgeCache*`. V predvolenom nastavení je vypnutá, pretože FFmpeg/ffprobe sú voliteľné prevádzkové závislosti a titulky snímok zvyšujú latenciu a náklady na model.

## Vlastné Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Kroky:

1. Vytvorte `src/lib/guardrails/myGuardrail.ts` rozširujúci `BaseGuardrail`.
2. Implementujte `preCall` a/alebo `postCall`.
3. Buď vykonajte registráciu v čase importu (push z `registerDefaultGuardrails`),
   alebo zavolajte `guardrailRegistry.register(...)` za behu — register nahradí
   akýkoľvek predchádzajúci guardrail s rovnakým normalizovaným názvom.
4. Pridajte testy do `tests/unit/` (existujúce príklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testovanie

Medzi testami používajte `resetGuardrailsForTests()`, aby ste vychádzali zo známeho stavu.
Odovzdajte `{ registerDefaults: false }`, aby ste začali s prázdnym registrom a
zaregistrovali len testované guardrails. Vision Bridge akceptuje dependency injection
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge odhaľuje ekvivalentné
testovacie body pre nastavenia, schopnosti, výber STT modelu, kontroly prihlasovacích
údajov a transkripciu. Testy tak môžu preveriť oba toky bez prístupu k databáze
alebo sieti.

## Pozri tiež

- `src/lib/guardrails/` — implementácia
- `src/shared/utils/inputSanitizer.ts` — zdieľaný detektor, ktorý poháňa
  detekciu prompt-injection a maskovanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — predvolené hodnoty Vision Bridge a
  zoznam modelov s vynúteným bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — zdieľané predvolené runtime hodnoty pre Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonálna vrstva (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — úplná referencia premenných prostredia

## Pokrytie rout injection-guardom a red-team (Fáza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokrýva všetky routy,
ktoré prijímajú používateľské prompty. Rešpektuje `INJECTION_GUARD_MODE` (predvolené
`warn` = len logovanie; `block` = vracia HTTP 400 `SECURITY_001`).

| Typ               | Routy                                                                                                                                                | Predvolený režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Text (existujúci) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generatívne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dáta              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Extrakcia textu (`extractMessageContents`) pokrýva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** promptfoo overuje, že každá routa blokuje
OWASP-LLM korpus v režime `INJECTION_GUARD_MODE=block`; garak spúšťa sondy (bez tajomstva sa preskočí).
`moderations` je zahrnutá pre konzistentnosť. Režim block je povinná hranica: `evaluatePromptInjection()`
ignoruje zoznam vypnutí na úrovni požiadavky, ktorý mu middleware odovzdáva, takže `disabledGuardrails`
routu z neho **nevyberá** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Nightly workflow (`.github/workflows/nightly-llm-security.yml`, cron + manuálne
spustenie) má dva joby:

- **`promptfoo-guard` (blokujúci)** — spúšťa `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý adversariálny prípad (napr. „ignoruj všetky
  predchádzajúce inštrukcie…", DAN-style jailbreaky) overuje, že odpoveď nesie
  `error.code === "SECURITY_001"`, t. j. že guard skutočne zamietol požiadavku.
- **`garak` (poradný)** — spúšťa garak `--probes promptinject,dan,leakreplay`
  proti lokálnej inštancii OmniRoute (`http://localhost:20128/v1`). Podmienený
  tajomstvom poskytovateľa (`PROMPTFOO_PROVIDER_KEY`); pri jeho absencii sa elegantne
  preskočí a má príponu `|| true`, takže reportuje bez zlyhania CI.

Pokrytie pomocníka guardu (`createInjectionGuard` / `withInjectionGuard`)
zahŕňa každú routu `/v1` nesúcu prompt; text promptu sa získava z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomocou
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
