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

## Vstavané guardrails

Registry pri importe automaticky načíta šesť guardrailov v poradí podľa
priority (pozri `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Názov               | Fáza(y)        | Súbor                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižšie čísla priority sa spúšťajú **prvé**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Základný model GLM 5.3 a `glm-5.3-{low,high,max}` majú explicitné metadáta
`supportsVision:false` v registry/špecifikácii. Varianty GLM 5.3 Flash
zostávajú modelmi s natívnym videním. Routa `/v1/messages` v Claude Code
vstupuje do zdieľaného pre-call reťazca guardrailov `handleChat` **pred**
prekladom Claude-to-OpenAI; vnorené obrázky z výsledkov nástroja `Read`
musia byť popísané alebo spracované ešte predtým, ako ich tento preklad
prenesie do obsahu OpenAI `image_url` (#17069).

Zachytáva požiadavky obsahujúce obrázky zamerané na **modely bez podpory
videnia** a buď presmeruje celú požiadavku na model s podporou videnia,
alebo pred volaním upstream nahradí obrazové časti textovými popismi
vytvorenými konfigurovateľným vision modelom. To umožňuje poskytovateľom
pracujúcim len s textom transparentne spracovávať multimodálne payloady.

Priebeh:

1. Preskočí, ak cieľový model už podporuje videnie (pokiaľ sa neobjavuje
   v zozname vynúteného bridge `isVisionBridgeForcedModel`).
2. Extrahuje obrazové časti cez `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ktorá deleguje na **unifikovaný detektor
   médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný
   zdroj pravdy zdieľaný s filtrom kompatibility combo. Extrakcia je
   obmedzená allowlistom na tvary, ktoré `replaceImageParts` dokáže vložiť
   späť (kontrakt extract↔replace): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` a Responses
   API `input_image`. Zodpovedajúce obrázky vnorené v Claude Code
   `tool_result.content` a vo výstupoch nástrojov Responses sa tiež
   extrahujú a nahrádzajú na svojich pôvodných cestách; tvary slúžiace len
   ako indikátory sú materiálom pre combo filter a neextrahujú sa.
   Preskočí, ak sa nenájdu žiadne.
3. Vyrieši runtime konfiguráciu cez `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové kľúče nastavení
   `modalityBridge*` majú prednosť; staré kľúče `visionBridge*` zostávajú
   **fallbackom na jeden cyklus** (okno pre rollback). Preskočí pred
   akýmkoľvek prechodom médií, keď je bridge zakázaný.
4. Selektor režimu (`modalityBridgeVisionMode`, pozri tabuľku nižšie)
   rozhoduje medzi reroute a describe. Reroute vráti `modifiedPayload`
   len s vymeneným `model`, plus meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta describe: obmedzí obrázky na `maxImages`, zostaví prompt
   prispôsobený úlohe, pozrie do describe cache, zavolá vision model
   **paralelne** (`Promise.allSettled`) a na ich miesto vloží textové časti
   `[Image N]: <description>`. Neúspešný describe vráti `null`: surový
   obrázok sa zachová pre neznáme/vizuálne ciele (#4012), ale **potvrdený
   priamy cieľ pracujúci len s textom** alebo combo bez videnia dostane
   explicitný textový stub `(unavailable — no vision-capable provider connected)`
   pre každý nepopísaný obrázok, vrátane čiastočných zlyhaní a obrázkov
   nad stropom describe volaní (#17069). Existujúci fallback describe pre
   combo pri úplnom zlyhaní zostáva zachovaný (#8430).
6. Vráti `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor režimu (`modalityBridgeVisionMode`)

| Režim      | Predvolené | Správanie                                                                                                                                                                                                                                                                                                                            |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔          | Pôvodná heuristika, nedotknutá (#6640/#7204): modely non-combo/`auto/` sa presmerujú na najlepší vision model, pokiaľ pôvodný model ešte nemá použiteľné prihlasovacie údaje (potom describe); combo ciele vždy describe.                                                                                                            |
| `describe` |            | Vždy describe — blok presmerovania sa úplne preskočí; vždy odpovedá model zvolený používateľom.                                                                                                                                                                                                                                      |
| `reroute`  |            | Vynútené presmerovanie: obíde sa kontrola ponechania modelu s prihlasovacími údajmi. Stále však platí kontrola prihlasovacích údajov **cieľa** presmerovania — keď neexistuje žiadny použiteľný vision cieľ, most zablokuje požiadavku s jasnou chybou namiesto opisu alebo odoslania surových obrázkov cieľu určenému iba pre text. |

Vynútené režimy sa vykonajú skratom ešte **pred** spustením automatickej heuristiky; správanie `auto` je bajtovo identické s guardrailom pred PR-1.

#### Rozsah API kľúča (`visionBridgeKeyScope.ts`)

Keď API kľúč volajúceho obmedzuje `allowedConnections`, fondy kvót
(`allowedQuotas`) alebo modely (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most vyberá iba
také modely pre reroute a describe, ktoré kľúč smie použiť, a iba na
pripojeniach, ktoré kľúč smie použiť. Volanie describe potom vždy prechádza cez
OmniRoute self-loop s hlavičkou `x-omniroute-self-loop-key-id`, takže
prijímajúca chat požiadavka znova vynucuje politiku pripojení a modelov tohto
kľúča. `enforceApiKeyPolicy()` rešpektuje túto hlavičku iba spolu so self-loop
bearer tokenom, takže môže prístup iba zužovať, a id, ktoré sa nedá rozpoznať,
sa zamietne.

Ak pre kľúč nie je povolený žiadny vision model, **potvrdený cieľ iba pre text**
zamietne požiadavku s obrázkom lokálne s jasnou HTTP 400 namiesto preposielania
bajtov obrázka upstreamu, ktorý túto schopnosť nemá (#17069). Pre ciele s
neznámou alebo natívnou vision schopnosťou si cesta describe ponecháva
predchádzajúce fail-open správanie (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Požiadavky bez kľúča a kľúče bez týchto obmedzení sa správajú presne ako predtým.

#### Prompt describe zohľadňujúci úlohu (`modalityBridgeVisionTaskAware`)

Predvolene **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pridá
text **poslednej používateľskej správy** (skrátený na 500 znakov) k základnému
promptu describe, čím nasmeruje opis k tomu, o čo používateľ skutočne žiadal
(vzor codex-vision-proxy), a žiada vision model o prepísanie viditeľného textu.
S vypnutým prepínačom — alebo bez používateľského textu — sa použije základný
prompt nezmenený.

Vlastná OpenAI-kompatibilná požiadavka self-loop describe
(`callVisionModelSingle()` vo `visionBridgeHelpers.ts`) vždy žiada
`image_url.detail: "high"` — bezpodmienečne, pre každého volajúceho/poskytovateľa,
nie je podmienená žiadnym klientským signálom. Vzorkovanie s nízkym detailom
zhoršuje presnosť OCR práve pri úlohe prepisu textu, o ktorú tento prompt žiada,
takže samotné volanie describe vždy žiada vysoký detail bez ohľadu na to, akú
úroveň detailu použila pôvodná prichádzajúca požiadavka. Toto ovplyvňuje iba
telo internej požiadavky describe; nemení to, ako OmniRoute preposiela vlastný
`image_url.detail` volajúceho na primárnej požiadavke — táto predvolená hodnota
sa aplikuje samostatne, a iba pre detegovaných klientov OpenCode, vo
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Vetva
Anthropic wire-format self-loop describe nemá pole `detail` a nie je ovplyvnená
žiadnou z týchto predvolených hodnôt.

#### Limit výstupu describe (`modalityBridgeVisionMaxChars`)

| Kľúč                           | Predvolené | Rozsah              |
| ------------------------------ | ---------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` alebo 100–50000 |

`0` (predvolené) znamená **bez limitu** — opis vrátený funkciou
`callVisionModel()` sa prenesie nezmenený, čím sa zachová existujúce správanie.
Akákoľvek hodnota v rozsahu 100–50000 skráti opis s príponou `…` predtým, ako sa
vloží späť ako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Zvýšte túto hodnotu pre OCR úlohy náročné na detaily, kde downstream model
potrebuje úplný prepis; znížte ju na ohraničenie spotreby tokenov pri ukecaných
vision modeloch. Pole dashboardu sa nachádza na paneli Advanced karty Vision
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a obmedzí
akúkoľvek hodnotu medzi 1 a 99 na spodnú hranicu 100, pričom explicitnú `0`
necháva nedotknutú — `0` je samostatne platná hodnota Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nie len
„nenastavená" predvolená hodnota.

#### Medzipamäť describe (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL medzipamäť pre výstupy describe, zdieľaná v rámci celého
procesu. Kľúč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
rámovaním s predponou dĺžky (žiadne kolízie hraníc polí). Zložka modelu je
**nakonfigurovaný** model mosta, nie model, ktorý skutočne odpovedal —
`callVisionModel` môže interne prejsť na náhradný model (fallback) a kľúčovanie
podľa jednotlivých pokusov by medzipamäť fragmentovalo. Neúspešné describe sa
nikdy necachujú. Nastavenia:

| Kľúč                            | Predvolené | Rozsah  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Normalizácia vzdialených obrázkov (self-loop describe/base64 fetch)

Keď bridge sám načíta **vzdialený** obrázok — self-call describe cez Anthropic a konverzia do base64 vo formáte claude-wire (`ensureBase64ImagesForClaudeWire`), obe cez `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledný data URI prejde cez `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) ešte pred vložením do požiadavky na vision model. Príliš veľké obrázky sa zmenšia na **dlhú hranu 2048 px** (zhodne s limitom zmeny veľkosti, ktorý OpenAI/Anthropic už aplikujú na strane servera), čo zníži objem nahrávaných bajtov/latenciu bez zmeny toho, čo vision model vidí. Na zmenu veľkosti sa používa `sharp`, načítaný cez dynamický import: na platforme, kde sa jeho natívny binárny súbor nepodarí načítať, `normalizeDataUri()` **nikdy nevyhodí výnimku** — vráti sa k priamemu preposlaniu pôvodných bajtov, takže cesta describe/base64 konverzie funguje vždy. Bajty, ktoré nie sú obrázkom (načítanie, ktoré nevrátilo dekódovateľný obrázok), sa tiež preposielajú nezmenené. Táto normalizácia sa vzťahuje len na obrázky, ktoré bridge načíta pre vlastný self-call — nikdy sa neaplikuje na surový passthrough payload volajúceho, v súlade s princípom mutácie len na výslovnú žiadosť (Hard Rule #20).

#### Schéma nastavení + migrácia

Nové kľúče `modalityBridge*` sú validované cez Zod v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` a skupina `modalityBridgeAudio*`, ktorú používa Audio Bridge. Migrácia `141_modality_bridge_settings.sql` skopíruje existujúce staré hodnoty `visionBridge*` do zodpovedajúcich nových kľúčov (idempotentne, nikdy neprepíše hodnotu `modalityBridge*` nastavenú operátorom); staré kľúče zostávajú akceptované ako fallback pri čítaní počas jedného vydávacieho cyklu.

#### Hlavička transparentnosti + štatistiky

Odpovede transformované cez describe nesú hlavičku
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(zostavuje ju `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, pridáva `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Presmerované požiadavky nedostanú **žiadnu** hlavičku — payload zostal nedotknutý a výmena modelu je už viditeľná v poli `model` tela odpovede.

`GET /api/modality-bridge/stats` (management auth, rovnaká úroveň ako `GET /api/settings`) vracia in-memory počítadlá podľa jednotlivých modalít `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pre `vision`, `audio` a `video`. `averageLatencyMs` používa ako menovateľ `latencySamples`, nie všetky pokusy; operácia bez merania času nevymýšľa vzorku s nulovými milisekundami. `bridged` zostáva spätne kompatibilným aliasom pre úspešné konverzie; neúspešné pokusy ho neinkrementujú. Počítadlá sa pri reštarte procesu zámerne resetujú (ide o telemetriu, nie účtovníctvo).

#### Konfigurácia dashboardu

Vyhradená stránka dashboardu je `/dashboard/settings/modality-bridge`. Jej cez URL adresovateľné karty `Vision`, `Audio` a `Video` zachovávajú query parametre pri prepínaní hodnoty `tab`. Karta Vision sprístupňuje zapnutie, režim, výber modelu (vrátane automatickej predvolenej hodnoty), task-aware promptovanie, pokročilé limity timeoutu/počtu obrázkov/dĺžky popisu/cache, runtime počítadlá a chránenú ukážkovú požiadavku. Karta Audio je tiež funkčná: sprístupňuje zapnutie, výber modelu len pre STT s možnosťou Auto, limity timeoutu/maximálnej dĺžky klipu, audio počítadlá a ukážkový test `input_audio`. Karta Video je funkčná: hlási runtime stav FFmpeg/ffprobe — jeden zo štyroch explicitných stavov UI (`unknown`, kým sonda prebieha alebo sa nedala dokončiť, `restricted` na hostiteľovi dashboardu mimo loopback, kde sa sonda preskočí na strane klienta, `unavailable` po preskúmaní a potvrdení, že chýba, alebo `available` s verziami FFmpeg/ffprobe) — trvalo ukladá limity zapnutia/modelu/snímok/videa/timeoutu, filtruje výber modelu na modely s podporou videnia a sprístupňuje video počítadlá.

Pôvodná karta Vision Bridge v nastaveniach AI je kompatibilný odkaz na novú stránku; už nevlastní druhú kópiu formulára. Media Providers tiež prepája workflow Image-to-Text a Speech-to-Text so zodpovedajúcimi kartami Modality Bridge bez odstránenia existujúceho Speech-to-Text playgroundu.

**Obídenie admission pri self-loop:** keď describe volanie smeruje cez vlastný self-loop `/v1` OmniRoute (neštandardný model poskytovateľa), podpožiadavka posiela `x-omniroute-admission-bypass: internal` a autentifikuje sa vyriešeným self-loop poverením — lokálnym sentinelom `sk_omniroute` v lokálnom režime, alebo operátorom nastaveným env kľúčom `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), aby nasadenia s `REQUIRE_API_KEY=true` mohli stále spúšťať describe volanie. Bypass sa uznáva len pre tieto presné poverenia, takže externí klienti nemôžu použiť hlavičku na obídenie admission.

Predvolené hodnoty legacy sa nachádzajú v `src/shared/constants/visionBridgeDefaults.ts`; nové predvolené hodnoty pre režim/task-aware/cache a resolver nastavení sa nachádzajú v `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail sprístupňuje voľbu konštruktora `deps`, aby testy mohli vložiť náhradné (fake) implementácie `getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytáva chat požiadavky nesúce audio skôr, než dosiahnu cieľ, o ktorom nie je známe, že prijíma audio vstup. Chat požiadavku nikdy nepresmerováva: audio časti sa prepíšu cez existujúci OpenAI-kompatibilný multipart endpoint a zvolený chat model pokračuje s textovými prepismi.

Priebeh:

1. Vyhodnoťte `supportsAudio` cez `getResolvedModelCapabilities()`. Prednosť majú
   explicitné metadáta registra poskytovateľov, potom statické metadáta modelu a
   potom synchronizované `modalities_input`. Deklarovaný zoznam vstupov bez `audio`
   znamená `false`; pri absencii dôkazu o schopnostiach zostáva `null`. Hodnoty
   `false` aj `null` aktivujú konzervatívny most, zatiaľ čo `true` ho obchádza.
2. Vyhodnoťte nastavenia `modalityBridgeAudio*` a extrahujte z každej správy
   audiocasti najvyššej úrovne vhodné na nahradenie cez zdieľaný detektor
   `detectMediaParts()`. Podporované prenosové tvary sú OpenAI `input_audio`,
   `audio_url` a `source.media_type: "audio/*"`. Vnorené audio sa detekuje na účely
   smerovania, ale cesta nahradenia ho neodstraňuje. Objem práce je ohraničený
   nastavením `modalityBridgeAudioMaxClips`; neskoršie časti zostávajú nedotknuté.
3. Rešpektujte nakonfigurovaný `provider/model`, alebo nechajte
   `selectAudioBridgeModel()` prejsť zoznam `AUDIO_TRANSCRIPTION_PROVIDERS` v
   stabilnom poradí katalógu a vybrať prvý model s použiteľným aktívnym poverením
   poskytovateľa.
4. `callAudioTranscription()` konvertuje base64/data-URI audio na multipart `file`,
   alebo stiahne vzdialené `audio_url` cez ochranu odchádzajúcich požiadaviek
   povoľujúcu len verejné adresy, s DNS pinningom a limitom 25 MB. Potom odošle
   (POST) súbor a vybraný model na lokálnu self-loop trasu
   `/v1/audio/transcriptions`, autentifikovanú cez `resolveSelfLoopBearer()`.
   Existujúca transkripčná trasa vykonáva štandardné vyhľadanie poverení,
   spracovanie cooldownu/rate-limitu a smerovanie k poskytovateľovi.
5. Úspešné volania nahradia svoje časti textom `[Audio N]: <transcript>`. Volania
   bežia cez `Promise.allSettled`: individuálne zlyhanie zachová danú pôvodnú
   audiocasť (kontrakt #4012). Ak zlyhajú všetky volania a cieľ je preukázateľne
   `supportsAudio === false`, časti sa zmenia na
   `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430). Pri
   neznámom cieli (`null`) zostáva výsledok so samými zlyhaniami nedotknutý.
   Preukázateľne textový cieľ bez použiteľného STT poverenia dostane rovnakú
   explicitnú zástupnú hodnotu bez vykonania sieťového volania.

Úspešné transkripcie využívajú celoprocesovú LRU/TTL cache Modality Bridge. Kľúč
kombinuje referenciu na audio, stabilné označenie operácie `audio-transcription`
a vybraný STT model; zlyhania sa nikdy neukladajú do cache. Pokusy s audiom
aktualizujú zdieľané počítadlá `bridged`, `cacheHits`, `failures` a `lastUsedAt`.
Transformované odpovede nesú hlavičku
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotknuté
požiadavky segment Audio Bridge nedostávajú.

Nastavenia za behu sú podložené databázou a validované cez Zod:

| Kľúč                          | Predvolené | Rozsah                   |
| ----------------------------- | ---------- | ------------------------ |
| `modalityBridgeAudioEnabled`  | `true`     | —                        |
| `modalityBridgeAudioModel`    | `""`       | Automaticky alebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000              |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                     |

Zdieľaná cache zostáva riadená nastaveniami `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytáva videocasti najvyššej úrovne v `messages` rozhrania Chat Completions a
v `input` rozhrania Responses API ešte predtým, ako sa zavolá cieľ bez známej
natívnej podpory videa. Podporované tvary sú `input_video`, `video_url`,
`video_source`, HTTPS URL a data URI `data:video/*;base64,...`. Obyčajné názvy
súborov v texte sa za video nepovažujú.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vlastní prechádzanie požiadavky,
kontrolu schopností/politiky, agregáciu na úrovni požiadavky a payload odpovede.
Práca na úrovni jednotlivého videa — získanie, cache celého výsledku, opis
sekvencie snímok (ktorý zlúči prípadný transkript audia deklarovaný volajúcim)
a metriky/prerušenie/upratovanie na úrovni pokusu — je skrytá za `processVideoPart`
v `videoBridgePipeline.ts`, volanom raz za každú videocasť v rámci slučky
`preCall`. Tento modul zároveň definuje explicitné hranice portov
`VideoMediaBrokerPort` (získavanie bajtov a extrakcia vzorkovaných snímok),
`VideoAudioTranscriptionPort` (zlúčenie transkriptu audia deklarovaného volajúcim
s opismi vzorkovaných snímok) a `VideoDrilldownPort` (hranica perzistencie pre
drill-down snímok; zatiaľ nie je zapojená do `processVideoPart` — záznamy
drill-down dnes zapisuje len samostatná trasa
`/api/modality-bridge/video/drilldown`).

Verejná cesta požiadavky `/v1` nikdy neimportuje ani nespúšťa podproces. Vzdialené
videá sa sťahujú s limitom 50 MiB; inline base64 videá majú konzervatívny limit
36 MiB dekódovanej veľkosti na video, aby obálka model/správy/rámcovanie zostala
v rámci limitu prijímania verejných JSON požiadaviek 50 MiB. Dĺžka inline dát a
odhady dekódovanej veľkosti sa kontrolujú ešte pred alokáciou. HTTPS sa vyžaduje
na počiatočnej vzdialenej URL aj na každom presmerovaní, s využitím existujúcej
ochrany odchádzajúcich požiadaviek povoľujúcej len verejné adresy s DNS
pinningom. Bajty potom prechádzajú cez presne vymedzenú internú broker hranicu
`POST /api/modality-bridge/video/extract`. Táto trasa je zároveň `LOCAL_ONLY` aj
`SPAWN_CAPABLE`, akceptuje iba per-procesovo autentifikovanú dôveryhodnú loopback
požiadavku a nikdy neakceptuje URL, cestu v súborovom systéme, spustiteľný súbor
ani zoznam argumentov. Pipeline veľkosti tela API a inkrementálny čítač tela v
handleri nezávisle od seba vynucujú limit vstupu brokera 50 MiB. Jeho ohraničená
fronta spúšťa vždy len jednu extrakciu naraz, povoľuje štyri čakajúce úlohy a
ohraničuje čakajúci vstup na 100 MiB.

V rámci brokera načítava `ffprobe` súkromný lokálny súbor; pevný zoznam
povolených formátov vylučuje formáty playlistov a manifestov. Pre povolené
kontajnery rodiny MOV zostávajú externé odkazy na dáta MOV predvolene zakázané
a pevne stanovený príkaz ich nepovoľuje. `ffprobe` aj `ffmpeg` používajú zoznam
povolených protokolov obmedzený iba na `file`, jedno vlákno, pevné polia
argumentov, žiadny shell a spustiteľné súbory vyhľadané cez `PATH`. Prúdy
s priloženým obrázkom obalu nie sú kandidátmi na prehrávanie. Všetky
prehrateľné prúdy musia spĺňať limity a explicitný predvolený prúd má prednosť
pred deterministickým záložným výberom prúdu s najnižším indexom. Videá sú
obmedzené na 600 sekúnd, 8 192 pixelov na rozmer a 33 554 432 zdrojových
pixelov. FFmpeg odoberie 1 až 16 snímok JPEG zo stredov intervalov, zmenší dlhšiu
hranu najviac na 1 024 pixelov bez zväčšovania menších vstupov a nikdy
nedostane URL. Predvolenou politikou vzorkovania je `uniform`. Voliteľná
politika `scene_aware` a experimentálna politika `segment_aware` vykonajú jeden
dodatočný pevne stanovený prechod FFmpeg nad už overeným lokálnym prúdom,
vyberú obmedzené časové značky scén z `showinfo` a pri zlyhaní detektora,
vypršaní časového limitu, poškodenom výstupe alebo prázdnej množine kandidátov
sa deterministicky vrátia k rovnakým rovnomerným stredom intervalov. Režim
zohľadňujúci segmenty prideľuje vzorky zo stredov intervalov proporcionálne
k overeným intervalom scén; dôkazy a záložné správanie režimu zohľadňujúceho
segmenty sú podrobne opísané nižšie. Pevný limit 16 snímok sa vo všetkých
politikách uplatňuje po výbere. Keď má požiadavka zohľadňujúca scény rozpočet
iba jednej snímky, použije rovnomerný stred aktívneho okna celého videa alebo
okna zamerania a uvedie `policyEffective: uniform`: jediná vybraná snímka scény
nedokáže zachovať oba časové konce. Volajúci môže voliteľne poskytnúť konečné
okno zamerania (`start`/`end` v sekundách); hranice sa orežú podľa dĺžky média,
obrátené alebo nekonečné okná sa odmietnu a všetky politiky vzorkovania sa
vykonajú iba v rámci normalizovaného intervalu. Výsledné okno sa zahrnie do
metadát vzorkovania aj do prefixu nedôveryhodného opisu, aby nadväzujúce modely
dokázali rozlíšiť zameraný výňatok od celej časovej osi.

Sémantické zameranie titulku je samostatné, explicitné nastavenie. Predvolený
režim analýzy `full` zachováva existujúcu výzvu pre snímky a nikdy neposiela
text požiadavky modelu titulkov. V režime `focused` most načíta iba najnovší
neprázdny používateľom vytvorený obsah `text`/`input_text` z rovnakého
kontajnera Chat alebo Responses, normalizuje ho do NFC, zlúči riadiace znaky
a medzery a obmedzí ho na 500 kódových bodov Unicode. Prázdny výsledok sa vráti
k presnej výzve režimu `full`. Použiteľná pomôcka sa serializuje ako JSON vo
vyhradenom bloku nedôveryhodného používateľského kontextu a môže iba
uprednostniť pozorovateľné detaily; nemôže prepísať samostatné upozornenie, že
sa nemajú vykonávať pokyny viditeľné alebo počuteľné v médiu. Textové zameranie
nikdy neodvodzuje `start`/`end` ani nemení časový vzorkovač.

#### FU-07 štrukturálne dôkazy segmentov

`segment_aware` používa jeden obmedzený predbežný analytický prechod nad už
overeným lokálnym videoprúdom. Pevne stanovený reťazec filtrov najprv zmenší
šírku najviac na 320 pixelov, deteguje zmeny scén a zamrznuté intervaly a potom
vzorkuje rýchlosťou 1 snímka za sekundu na určenie rozmazania, priemerného jasu
a priestorových/časových informácií. Prechod je obmedzený na 600 štrukturálnych
vzoriek, jedno vlákno FFmpeg/filtrov, rovnaké zoznamy povolených protokolov iba
pre `file` a kontajnerov, limit výstupu procesu 1 MiB a najviac 30 sekúnd
v rámci zdieľaného prerušenia/termínu brokera. Nikdy neprijíma príkaz, filter,
cestu ani URL z požiadavky.

Štrukturálne hodnoty sú deterministické dôkazy vzorkovania, nie sémantické
porozumenie videu. Neodvodzujú subjekty, činnosti, titulky, reč ani zámer
používateľa. Hranice scén a zamrznutí vytvárajú segmenty; pokrytie zamrznutím,
rozmazanie, expozícia, priestorové detaily a časová zmena ovplyvňujú iba spôsob
pridelenia existujúceho rozpočtu 1 až 16 snímok. Úplne zamrznutý segment je
obmedzený na jednu snímku, zatiaľ čo nezamrznuté segmenty súťažia o zostávajúci
rozpočet. Keď je hraníc viac než snímok, zachová sa rovnomerné pokrytie časovej
osi, aby rýchle počiatočné strihy nemohli skryť dlhý koncový segment. Hranice
scén v rámci 1-sekundového analytického rozlíšenia hranice zamrznutia sa zlúčia.

Chýbajúce filtre, poškodené alebo prázdne dôkazy, chyba detektora či vypršanie
časového limitu obmedzenej predbežnej analýzy vedú k bezpečnému pokračovaniu
s presnou politikou rovnomerných stredov intervalov. Prerušenie volajúcim alebo
termín brokera nevedú k takémuto pokračovaniu: ukončia prebiehajúci podproces,
zabránia následnej extrakcii snímok a súkromný dočasný strom sa odstráni
v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické reálne
testovacie dáta FFmpeg na meranie úspor volaní titulkov po odstránení duplicít,
pridelenia rozpočtu pri intenzívnom pohybe, dôkazov rozmazania/expozície/SI-TI,
rýchlych strihov s dlhým koncovým segmentom a falošne pozitívnych výsledkov pri
postupnom prelínaní. Zaznamenáva skutočný čas predbežnej analýzy a tam, kde je
k dispozícii `/usr/bin/time`, aj čas CPU podradeného procesu a maximálnu hodnotu
RSS. Jeho kontroly kvality sú iba štrukturálne orákulá. Kvalita reálneho modelu
titulkov zostáva `HOLD`, pretože tento testovací nástroj nemá autorizovaný
koncový bod ani nemenného hodnotiteľa. Peňažné úspory tiež zostávajú `HOLD`,
pokiaľ `--caption-cost-per-call-usd` neposkytne explicitný kladný odhad nákladov
na jedno volanie; skript nikdy nevytvára ani jeden z týchto výsledkov umelo.

Každý snímok je obmedzený na 4 MiB, všetky surové snímky spolu na 23 MiB a serializovaná odpoveď brokera na 32 MiB. Súkromný dočasný adresár sa odstráni vo `finally`. OmniRoute neobsahuje FFmpeg a neprijíma vlastnú cestu k spustiteľnému súboru. Pred popisovaním bridge vykoná konzervatívny priechod vizuálnej deduplikácie: každý JPEG sa zredukuje na 16×16 šedotónový buffer a porovná sa iba s posledným zachovaným snímkom. Pri požadovanom rozpočte popisov nad jeden snímok extrakcia poskytne ohraničenú množinu kandidátov až do dvojnásobku tohto rozpočtu a nikdy viac ako 16 snímkov. Požadovaný strop sa uplatní až po deduplikácii, pričom počas finálneho riedenia sa zachovajú prvý a posledný vybraný kandidát, ak je rozpočet aspoň dva. Verzovaná politika `grayscale-16x16-mean-cells-v2` používa väčšiu z hodnôt: priemernú deltu jasu a podiel buniek miniatúry, ktorých normalizovaná delta je aspoň 0.05. Prah duplicity je konštanta 0.04, zvolená pre predvídateľnosť a nie vystavená ako nastavenie za behu. Tento sekundárny vysokokontrastný signál zachováva malé pohyby a zmeny viditeľného textu, ktoré môže porovnanie iba na základe priemeru skryť. Chyby komparátora alebo dekodéra zlyhajú otvorene (fail open) a zachovajú pokrytie. Výstupné metadáta oddeľujú extrahovaných kandidátov, úspešne použité snímky a vyradené vizuálne duplikáty.

Explicitne označená video časť môže požiadať o kontaktnú tabuľku s časovými pečiatkami. Bridge zostaví maximálne 4-stĺpcovú, 16-snímkovú JPEG mriežku. Každá 512-pixelová bunka vypáli svoju zdrojovú časovú pečiatku do vysokokontrastného spodného pásu, zatiaľ čo rovnaké časové pečiatky zostávajú v textových metadátach pre následné priradenie a audit. Kompletný JPEG zostáva obmedzený na 32 MiB. Ak `sharp` nedokáže dekódovať alebo zložiť mriežku, bridge sa vráti k jednotlivým JPEG snímkam; prerušenie klienta sa stále šíri cez operáciu tabuľky.

Dôkaz o promócii je zámerne oddelený od syntetického mikrobenchmarku kompozície. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje schémou verzovaný A/B testovací rámec pre reálne OpenAI-kompatibilné zrakové modely. Meria tokeny hlásené poskytovateľom, celkovú reálnu (wall) latenciu end-to-end (vrátane kompozície tabuľky), počet volaní modelu a zachovanie faktov definované manifestom. Surové odpovede modelov sa do reportu nezapisujú; zachovávajú sa len SHA-256 digesty a priradené ID faktov. Testovací rámec nevykoná žiadne sieťové ani platené volanie modelu, pokiaľ nie je zadaný `--execute-real` a nakonfigurované `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez tohto explicitného reálneho spustenia zostáva jeho strojovo čitateľný verdikt `HOLD`; samotné syntetické merania payloadu a počtu volaní nie sú dôkazom o promócii.

Volajúci môže k podporovanej video časti pripojiť voliteľné pole `transcript.cues`, ak už disponuje zarovnaným textom. Každý cue musí obsahovať `text`, konečný interval `start`/`end` v rámci zisťovanej dĺžky a `source` z povoleného zoznamu (`client`, `embedded` alebo `audio-bridge`); `confidence` má predvolene hodnotu `1` a musí ostať medzi `0` a `1`. Presné duplicitné cues sa zlúčia. OmniRoute z týchto metadát nikdy nespúšťa transkripciu: validované cues sa skopírujú do popísaného výsledku so zdrojom, confidence a intervalom a vykreslia sa ako nedôveryhodné pozorovania vedľa popisov snímkov. Neplatný text, text mimo rozsah alebo text bez uvedenia pôvodu sa odmietne namiesto zmiešania do prúdu popisov. Oba kanály transcriptu v tele požiadavky normalizujú dodaný pôvod na `client`, vrátane samodeklarovaných štítkov `embedded` alebo `audio-bridge`. Iba serverom vlastnený adaptér môže priradiť tieto dôveryhodné štítky prostredníctvom code-only argumentu `trustedSource`; pole JSON v požiadavke sa k tomuto argumentu nedostane. Text transcriptu zostáva nedôveryhodným obsahom odvodeným z médií bez ohľadu na jeho pôvod a nikdy nesmie určovať autorizáciu.

Pokročilý volajúci môže poskytnúť stopu `audioTranscript` pre to isté video; považuje sa za text poskytnutý klientom, nie za dôkaz serverovej transkripcie. Fúzne rozhranie spúšťa vizuálne a audio pozorovania pod jedným časovým limitom a signálom prerušenia, zoradí ich na spoločnej časovej osi, zlúči presné duplikáty a nahlási čiastočný výsledok, keď uspeje len jedna strana. Neplatný `audioTranscript` degraduje na tento čiastočný výsledok — vizuálny popis sa zachová a audio vetva zaznamená sanitizovaný kód zlyhania — namiesto zlyhania celého videa. Dostupnosť jednotlivých vetiev, príznak čiastočného výsledku a sanitizované kódy zlyhaní sa zachovávajú v popísanom výsledku, v metadátach guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), v metadátach cache výsledkov a vo fúznych počítadlách bridge. Predvolená cesta Video Bridge nevyvoláva prevod reči na text ani nesťahuje druhú kópiu médií; bez tejto explicitnej stopy zostáva iba video.

**Uchovávanie prepisu (#12150 P1).** Uplatňuje sa automaticky vždy, keď Video Bridge (sám osebe opt-in) vykreslí cue prepisu — neexistuje samostatný príznak uchovávania. Keď požiadavka vykreslí akýkoľvek cue prepisu (volateľom deklarovaný `transcript` alebo zlúčený `audioTranscript`), guardrail ju označí ako `videoBridgeObserved` a vytvorí redigovaný tieň popisu videa — identické vykreslenie, v ktorom je voľné textové telo každého cue nahradené `[redacted-video-transcript]`, zostavené nahradením štruktúrovaného poľa cue pred zostavením reťazca (nikdy parsovaním splošteného textu, takže žiadny obsah cue — škodlivý ani bežný, vrátane tiel obsahujúcich `]`, ako `[inaudible]`/`[music]` — nemôže prežiť). Telo požiadavky v perzistovanom zázname volaní (call-log) vymení každú z videa odvodenú textovú časť za tento redigovaný tieň, priradené podľa rovnosti obsahu; kotva `fullText` sa znova prečíta z dokončeného payloadu guardrailu pred volaním, takže priradenie stále uspeje aj potom, čo neskoršie guardraile v reťazci (maskéry PII a prihlasovacích údajov, priority 10/95) prepíšu text popisu na mieste, a potom, čo vloženie systémového promptu/handoffu/pamäte preformuje pole správ. Telo odoslané upstream modelu zostáva nezmenené. Pozorovaná požiadavka tiež nezapĺňa žiadnu trvalú Memory (extrakcia odvodená z požiadavky aj z odpovede sa preskočí), takže vlastná odpoveď modelu nemôže odrážať text prepisu do Memory.

**Surové polia videa (#12430).** Keď je bridge povolený a natívna podpora videa je neznáma alebo chýba, definované polia `transcript`/`audioTranscript` tiež aktivujú `videoBridgeObserved`, a to aj po zlyhaní popisu alebo pri limite `maxVideos`. Počítajú sa `null` a prázdne reťazce; chýbajúce polia a metadáta nesúvisiace s videom nie. Uchované kópie tieto polia redigujú alebo požiadavku vynechajú a cache aj Memory sa obchádzajú.

Na týchto fallback cestách sa platné cue od volateľa stávajú podporovanými časťami `text`/`input_text` namiesto neštandardných polí poskytovateľa. Obe stopy dodané v požiadavke zostávajú nedôveryhodnými pozorovaniami `client`, s explicitným varovaním, že video nebolo popísané a časové pečiatky neboli overené oproti médiu. Existujúce celkové rozpočty 256 cue/64 KiB a rozpočty na jednotlivý cue sa uplatňujú na obe stopy spoločne; časové pečiatky sa musia zmestiť do 600-sekundového stropu brokera a do akéhokoľvek dodaného okna zamerania. Neplatné stopy sa zahodia, nepreposielajú sa ako ľubovoľný text; platná sesterská stopa sa stále môže použiť, pokiaľ nie je prekročený ich spoločný rozpočet. Polia s hodnotou null/prázdne polia nepridávajú žiadny text. Tento fallback nepridáva žiadne získavanie médií ani prepis. Polia rozšírenia prepisu sa odstránia z fallback nosiča videa a z jeho objektov `video_url`/`source`. Allowlist prenosového (wire) rozhrania OpenAI zostáva prísny; nosiče videa s neznámou natívnou podporou zostávajú dostupné a známe čisto textové ciele si ponechávajú bezpečné markery. Štruktúrované redigované tiene chránia pripojený text prepisu, zatiaľ čo pôvodná požiadavka vo vlastníctve volateľa zostáva nezmenená. Ciele s natívnou podporou a vypnuté bridge si zachovávajú svoje doterajšie obchádzacie správanie.

Ďalšie uchovávané kópie používajú rovnaký signál pozorovanej požiadavky. Surový snapshot klientskej požiadavky pred guardrailom, čakajúca požiadavka v pamäti a log včas zamietnutých požiadaviek štrukturálne nahrádzajú polia prepisu vo video častiach; reťazcové prompty syntetizované fázami pipeline a odovzdávaním kontextu sa redigujú v úložisku (sink) tela perzistovanej požiadavky. Perzistovaný marker `video_content_removed` spôsobí, že pokračovanie cez `previous_response_id` zlyhá do uzavretého stavu (fail-closed) namiesto rekonštrukcie textu, ktorý bol zámerne zahodený. Ak pozorovaná požiadavka stratí svoj redakčný tieň pre jednotlivú časť pred zaznamenaním, alebo ak sa po neskorších zmenách požiadavky nepodarí priradiť ani len jeden z viacerých tieňov videa, uchované telo požiadavky sa vynechá celé namiesto uchovania čiastočne redigovaného prepisu.

Pri pozorovanej požiadavke môže odpoveď modelu citovať ľubovoľnú časť prepisu bez štruktúrovanej hranice cue. Jej perzistovaný `responseBody` v zázname volaní sa preto nahradí markerom vynechania; podrobný artefakt pipeline (ktorý môže zahŕňať upstream/klientske telá a kusy streamu) sa neuchováva. Sémantické, idempotenčné a reasoning-replay cache obchádzajú čítania aj zápisy pre túto požiadavku. Požiadavka poskytovateľa a klientovi viditeľná odpoveď zostávajú nezmenené. Včasné bajty keepalive sa vyprázdnia z dočasnej vyrovnávacej pamäte, keď sa podrobný artefakt vynechá. Varovanie Kiro o poškodenom EventStream hlási iba počet bajtov payloadu, nikdy jeho obsah ani surovú chybu JSON parsera.
Týmto sa netvrdí, že bola auditovaná každá nesúvisiaca diagnostika poskytovateľa/pluginu; širšie preverenie uchovávaných úložísk sa sleduje v #11658.

Interný životný cyklus `/api/modality-bridge/video/drilldown` je samostatný substrát cache autentifikovaný cez loopback/token. Každá operácia vyžaduje aj kanonické nepriehľadné (opaque) ID principála. Predtým, než sa povolí produkčný volateľ, musí toto ID odvodiť z autentifikovaného tenanta a nikdy nesmie preposlať hodnotu zvolenú klientom. Kľúče cache viažu tohto principála na kanonické ID relácie a referencie videa, ukladajú iba ich zo SHA-256 odvodené kľúče a obmedzujú čítanie aj mazanie na rovnakého principála. Cache ukladá najviac 16 odvodených JPEG snímkov na záznam, ich platnosť vyprší po desiatich minútach a podporuje ohraničené čítania `start`/`end` alebo explicitné zmazanie relácie.

Každý principál je obmedzený na 16 záznamov a 64 MiB kanonických JPEG dát. Tieto limity sú nezávislé od globálneho stropu 64 záznamov/256 MiB: tlak kvóty principála vyraďuje iba najdlhšie nepoužívané (LRU) záznamy daného principála skôr, než sa zváži globálne LRU vyradenie. Expirované záznamy sa pri aktivite cache zametú z účtovania principála aj z globálneho účtovania, zatiaľ čo zrušenie a zlyhanie validácie nepotvrdia (commit) čiastočnú náhradu.

Cache odmietne nekanonickú Base64, nadbytočný padding, médiá, ktoré nie sú JPEG, poškodené alebo
skrátené JPEG súbory a JPEG súbory, ktoré počas ohraničeného dekódovania celého obrázka pomocou `sharp`
vygenerujú varovanie. Každý prijatý obrázok prekóduje na kanonický JPEG, šírku a výšku odvodí
z dekódovaných bajtov namiesto dôvery poliam volajúceho a zahodí akékoľvek koncové
polyglotné bajty namiesto ich zachovania. Do oboch kvót sa účtuje len ohraničená kanonická
komprimovaná vyrovnávacia pamäť. Limit JSON prenosu zahŕňa režijné náklady Base64 pre strop
dekódovaného vstupu 32 MiB. Každá
uložená derivácia zaznamenáva svoj overený formát/rozlíšenie JPEG, politiku vzorkovania,
verziu derivácie, čas vytvorenia, serverom vypočítaný hash obsahu a hashovaný odkaz na
rodiča plus hash obsahu rodiča od dôveryhodného volajúceho. Zrušenie sa kontroluje
medzi asynchrónnymi fázami dekódovania/hashovania pred atomickým zápisom do cache.

Táto tranša zatiaľ nepripája produkčného producenta k trase a neposkytuje
výber variantov s viacerými rozlíšeniami. Transparentná cesta požiadavky Video Bridge
preto neprináša žiadnu pridanú prácu, zatiaľ čo derivácia principála viazaného na nájomcu
a úplný životný cyklus FU-08 s viacerými rozlíšeniami zostávajú explicitnou pokračovacou
prácou, a nie správaním zdokumentovaným ako dokončené.

Snímky sú popisované postupne nakonfigurovaným modelom Video. Prázdne
prepísanie Video zdedí nastavenie Vision; ak sú obe prázdne, auto-router Vision
vyberie efektívny model schopný videnia. Úspešné popisky
nahradia pôvodnú časť stabilným prefixom `[Video description:`, ktorý zároveň
označuje text ako nedôveryhodné pozorovanie odvodené z médií a hovorí naväzujúcim
modelom, aby nevykonávali inštrukcie nájdené v médiách. Kľúče cache popiskov
snímok zahŕňajú bajty JPEG, prompt, časovú pečiatku a efektívny model; cacheujú sa len úspešné
popisky. Záznamy cache si ponechávajú skutočný úspešný model producenta,
vrátane záložného modelu; bridge hlási `mixed`, keď boli rôzne snímky
vytvorené rôznymi modelmi. Zásah cache znovu použije túto identitu producenta
namiesto jej premenovania na požadovaný plán smerovania. Cache výsledkov celého videa
je kľúčovaná na každom vstupe, ktorý mení výstup — prompt, efektívny
model, politika vzorkovania, počet snímok, režim semantickej analýzy, otlačok SHA-256
normalizovaného náznaku zamerania, okno zamerania, `transcript`,
`audioTranscript` a príznak kontaktnej tabuľky — takže zmena ktorejkoľvek z týchto
dimenzií znamená minutie cache, nikdy nie zastarané opätovné použitie. Verzia politiky
vizuálnej deduplikácie, prah a ohraničený počet kandidátnych snímok sú tiež explicitne uvedené
v kľúči a metadátach cache výsledkov; zmena politiky preto nemôže znovu použiť zastaraný
popis celého videa. Metadáta cache výsledkov v4 si ponechávajú režim a
otlačok, nikdy nie surovú úlohu používateľa. Metadáta guardrailu hlásia
požadovaný aj efektívny režim analýzy; požadovaný režim `focused` bez
použiteľného textu používateľa je hlásený ako efektívne `full`.

Guardrail extrahuje každú podporovanú videočasť, ale popíše najviac
`modalityBridgeVideoMaxVideos`. Pre cieľ, u ktorého je preukázané
`supportsVideo === false`, sa zlyhané a nadlimitné videá stávajú explicitnými bezpečnými
textovými značkami, takže žiadne surové video neprežije. Keď je schopnosť neznáma,
tieto časti si ponechajú svoj video nosič; akýkoľvek záložný prepis nasleduje vyššie
uvedenú ohraničenú konverziu textu. Ciele s `supportsVideo === true` obchádzajú bridge.
Signál prerušenia požiadavky klienta sa šíri cez sťahovanie, frontu brokera,
podprocesy a volania popisov; prerušenia sa zastavia medzi videami a nikdy nezlyhajú
tak, že by prešli surové médiá.

Nastavenia za behu sú podložené databázou a validované pomocou Zod:

| Kľúč                                | Predvolené  | Rozsah / správanie                                                                                             |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Voliteľné za behu, opt-in                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachováva všeobecné popisky; `focused` používa ohraničený, nedôveryhodný kontext posledného používateľa |
| `modalityBridgeVideoModel`          | `""`        | Zdedí model Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` alebo proporcionálne `segment_aware`; zlyhanie detektora sa vráti na `uniform`        |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Staršie perzistované hodnoty časového limitu Video nad 120 sekúnd sa obmedzia na
lehotu brokera; nové zápisy nastavení nad tento limit sú odmietnuté.
`GET /api/modality-bridge/video/runtime` vyžaduje dôveryhodnú označenú loopback
lokalitu pred autentifikáciou alebo skúmaním prostredia za behu, potom vyžaduje manažérsku
autentifikáciu. Vracia len `available`, sanetizované verzie FFmpeg/ffprobe a pevný
dôvod, keď je prostredie za behu nedostupné. Interný koncový bod extrakcie nie je
verejné API na nahrávanie: nasýtenie fronty vráti `503` plus `Retry-After`, odpojenie
volajúceho vráti `499` a pevná lehota brokera vráti `504`. Konvertované odpovede pridajú
`video->text;model=<visionModel>;parts=<videos>` do centrálnej
hlavičky `x-omniroute-modality-bridge` bez odstránenia segmentov Vision alebo Audio.

### PII Masker (`piiMasker.ts`)

Beží v **oboch** fázach.

- **`preCall`** naklonuje payload, prejde `system`, `messages`, `input` a
  `prompt` (vrátane jednoduchých reťazcových položiek) a aplikuje `processPII()` (z
  `@/shared/utils/inputSanitizer`) na reťazcové polia `content`/`text`. Keď je
  `PII_REDACTION_ENABLED=true`, detegované PII sa vo východzom payloade
  zamaskujú. Je to nezávislé od `INPUT_SANITIZER_MODE` (ktorý riadi len politiku
  prompt-injection). Keď je maskovanie vypnuté, volanie zaznamená počty detekcií
  bez prepisovania obsahu.
- **`postCall`** hlboko naklonuje odpoveď, spustí `sanitizePIIResponse()` plus
  maskovač pre tvar Responses API (`maskResponsesOutput` — pokrýva
  `output_text` a `output[].content[].text`). Ak dôjde k akémukoľvek maskovaniu,
  upravená odpoveď nahradí pôvodnú.

Guardrail nikdy neblokuje; len anotuje (`meta.detections`,
`meta.redacted`) alebo prepisuje.

#### Výber podľa typu, vlastné vzory a počítadlá detekcií

**Dashboard → Nastavenia → Zabezpečenie → Maskovanie PII** volí, _čo_ sa maskuje.
Nezapína maskovanie: to naďalej zabezpečujú `PII_REDACTION_ENABLED` (požiadavka) a
`PII_RESPONSE_SANITIZATION` (odpoveď + SSE), obe predvolene vypnuté.

- **Výber podľa typu** — vstavané id sú uvedené v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavené znamená
  všetky typy (správanie spred zavedenia tohto nastavenia). Vzor `ssn_us` z
  enginu požiadaviek sa mapuje na `ssn`. Šablóny (Minimal, Standard, Financial,
  Brazilian, USA, Full) len vypĺňajú začiarkavacie políčka v UI.
- **Vlastné vzory** — až 20 regex alebo wildcard vzorov (`*` = až 64
  nebielych znakov, `?` = jeden). Zhody sa nahradia za `[CUSTOM_REDACTED]`.
  Každý vzor prechádza cez `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviac 500 znakov, flagy obmedzené
  na `g i m s u`, musí sa skompilovať, musí prejsť `safe-regex` (katastrofálny
  backtracking) a nesmie zodpovedať prázdnemu reťazcu ani zástupnému symbolu
  maskovania. Vzor, ktorý zlyhá, sa odmietne pri uložení aj pri testovaní a
  uložený riadok, ktorý zlyhá, sa počas behu preskočí namiesto kompilovania.
  Vlastné vzory sa spúšťajú len pri zapnutom maskovaní.
- **Počítadlá detekcií** — počty podľa typu (nikdy nie zhodné hodnoty), držané
  v pamäti a resetované pri reštarte (`src/lib/pii/piiDetectionStats.ts`).
  Zvyšujú sa len pri zapnutom maskovaní.

Nastavenia sú uložené v tabuľke `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) a čítajú sa cez cache s platnosťou 1 s. API:

| Metóda | Cesta                    | Účel                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav príznakov, `enabledTypes`, `customPatterns`, počítadlá detekcií |
| `PUT`  | `/api/settings/pii`      | Nahradiť `enabledTypes` (`null` = všetky) a/alebo `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Dry-run jedného vzoru voči vzorke najviac 8 KB; nič sa neukladá      |

Všetky tri vyžadujú autentifikáciu správy (management auth) a validujú telo
pomocou Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Deteguje nepriateľské (adversarial) štruktúry v obsahu dodanom používateľom a
vynucuje nakonfigurovanú politiku. Správanie je riadené premennými prostredia a
voľbami konštruktora:

| Nastavenie      | Premenná prostredia                                                                                  | Predvolené | Účinok                                                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zapnuté         | `INPUT_SANITIZER_ENABLED`                                                                            | `true`     | Pri `false` sa guardrail skratovo vynechá.                                                                                                                                                        |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`     | Politika injekcií: `block`, `warn` alebo `log`. (`redact` je akceptovaný kvôli spätnej kompatibilite, ale **neodstraňuje** injekčný text; prepis PII v požiadavke riadi `PII_REDACTION_ENABLED`.) |
| Práh blokovania | voľba `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Minimálna závažnosť potrebná na blokovanie. Pri predvolenom nastavení je medium len na pozorovanie.                                                                                               |

**Priorita režimu** (`getMode`): `options.mode` volajúceho →
`INJECTION_GUARD_MODE` **prepis z DB feature-flagu** (Dashboard → Nastavenia →
Príznaky funkcií) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Prepis z dashboardu preto vyhráva nad env premennými, takže UI príznakov
funkcií ovláda bežiaci guard naživo (bez reštartu). Čítanie z DB je fail-safe:
ak zlyhá, guard sa vráti k správaniu založenému na env premenných, a keď nie je
nastavený žiadny prepis, správanie je totožné s rozlíšením len cez env.

Zdroje detekcie:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (zdieľaná sada
   detektorov používaná aj inde v pipeline).
2. Vstavané `DEFAULT_GUARD_PATTERNS` (aktuálne `system_override_inline` a
   `markdown_system_block`, obe so závažnosťou `high`).
3. Voliteľné `customPatterns` odovzdané cez voľby konštruktora (reťazce, regex
   alebo záznamy `{ name, pattern, severity }`).

Keď `mode === "block"` **a** aspoň jedna detekcia spĺňa prah závažnosti,
`preCall` vráti `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimoch `warn`/`log` guardrail zaznamená
(loguje), ale volanie povolí. Zdieľaný pomocník `evaluatePromptInjection()` je
tiež exportovaný pre volajúcich, ktorí potrebujú vyhodnotiť prompty bez
použitia registra.

**Hranica skenovania (v3.8.20):** detektor skúma iba **prvých 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
bajtov) v `src/shared/utils/inputSanitizer.ts`. Obe funkcie `detectInjection()`
a `evaluatePromptInjection()` vykonajú `slice(0, MAX_INJECTION_SCAN_BYTES)`
pred spustením slučky vzorov. Injekčné direktívy sa nachádzajú pri hornej
časti vstupu, takže toto obmedzuje CPU/GC regexu pri payloadoch s veľkosťou
niekoľkých stoviek KB bez oslabenia detekcie (porov. #3932, #4041).

### Maskovač prihlasovacích údajov (`credentialMasker.ts`)

Beží v **oboch** fázach, posledný v predvolenom reťazci (priorita `95`).
Rediguje známe vzory API kľúčov / tajných tokenov z odchádzajúceho payloadu
(obsah správ, argumenty volaní nástrojov, výsledky nástrojov) **a** z odpovede
poskytovateľa, takže prihlasovacie údaje vložené do promptu (alebo vrátené
výsledkom nástroja) neuniknú upstream poskytovateľovi ani späť klientovi.

- **Len opt-in**, rovnaká konvencia ako redakcia PII (súvisí s Hard Rule
  #20): zakázané, pokiaľ `settings.credentialRedactionEnabled === true`
  **alebo** `CREDENTIAL_REDACTION_ENABLED=true`. Keď je vypnutý, guardrail je
  no-op — nikdy neblokuje a nikdy neprepisuje.
- `redactCredentials()` prechádza celý strom payloadu/odpovede (`walkValue()`,
  bezpečný voči prototype pollution, bezpečný voči cyklom cez `WeakSet`) a
  nahrádza zhody zástupným symbolom `[REDACTED:<type>]`, pričom klonuje iba
  vetvy, ktoré sa skutočne zmenili.
- `CREDENTIAL_PATTERNS` pokrýva kľúče LLM poskytovateľov (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokeny (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platobné kľúče (Stripe, Square),
  cloudové kľúče (AWS access key, Twilio, SendGrid, Mailgun), privátne kľúče /
  JWT, pripojovacie reťazce obsahujúce prihlasovacie údaje
  (`mongodb://user:pass@...` a pod.) a generický vzor hodnoty hlavičky
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Kľúče vo forme hlavičiek
  (`authorization`, `x-api-key`, `api-key`, `apikey`) sa redigujú štrukturálne
  (iba hodnota, prefix schémy ako `Bearer `/`Basic ` zostáva zachovaný)
  namiesto generického textového regexu.
- Guardrail nikdy neblokuje; iba prepisuje (`modifiedPayload` /
  `modifiedResponse`) a anotuje (`meta.credentialsRedacted`, `meta.count`).

Regresná záruka: `tests/unit/credential-masker-guardrail.test.ts`.

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

## Poradie vykonávania

Pre každú požiadavku prechádzajúcu cez `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts` (trasy rodiny chat uvedené v časti
[Pokrytie a limity](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` zostaví zoznam preskočení z API kľúča, tela
   požiadavky a hlavičiek.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí guardrails vo vzostupnom
   poradí priorít:
   - Vypnuté guardrails sa zaznamenajú ako `skipped`.
   - `preCall` každého guardrailu môže prepísať payload cez `modifiedPayload`.
   - Prvé `block: true` skratuje reťazec a handler vráti odpoveď o zamietnutí
     guardrailom.
3. (Prípadne prepísaný) payload pokračuje do combo routingu a odoslania na
   upstream.
4. **Iba nestreamované:** po zostavení odpovede spustí
   `guardrailRegistry.runPostCallHooks(...)` rovnaký reťazec na odpovedi.
   `block: true` tu zahodí odpoveď z upstreamu a vráti HTTP 400. Streamované
   odpovede tento krok úplne preskočia.

Guardrails, ktoré vyhodia výnimku, sa zaznamenajú s `error: <message>` a
zalogujú cez `logger.warn`, ale reťazec pokračuje — zámerne fail-open.

## Pokrytie a limity

Register guardrailov je zapojený iba do chat pipeline. Tieto limity sú fixované
testami `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` a
`tests/unit/guardrail-pipeline-characterization.test.ts`; pri zmene správania
tieto testy vedome aktualizujte.

### Kde sa hooky spúšťajú

| Hook / ovládanie                    | Spúšťa sa pri                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Požiadavky spracúvané funkciou `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (a `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` a chatovací proxy Telegramu. Tiež testovací endpoint dashboardu `/api/guardrails/test`. Pre-call blok vráti HTTP 400. |
| `runPostCallHooks`                  | Iba **nestreamované** chatové odpovede (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamované odpovede sa k nemu nikdy nedostanú.                                                                                                                                                                                                                                                                                     |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), napojený v `streamingPipeline.ts`, keď je zapnuté `PII_RESPONSE_SANITIZATION`. Nie je to guardrail, takže kanály na vypnutie ho neovplyvňujú.                                                                                                                                                                                                                        |
| Middleware injection-guard (legacy) | Každá trasa `/v1` nesúca prompt, vrátane rodiny chat (pozri [pokrytie trás](#injection-guard-route-coverage--red-team-phase-8--block-d)). Iba prompt injection.                                                                                                                                                                                                                                                                    |

### Čo nie je pokryté

- **Trasy médií, embeddings a dátové trasy** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) sa nikdy nedostanú do registra.
  Nebeží tam žiadne maskovanie PII, maskovanie prihlasovacích údajov ani
  modality bridge. Ich jedinou kontrolou je starý middleware injection-guard.
- **Streamované odpovede** nemajú žiadne post-call guardrails: žiadny post-call
  `pii-masker` ani `credential-masker` a žiadny post-call blok. Aplikuje sa iba
  streamingová PII transformácia (keď je zapnuté `PII_RESPONSE_SANITIZATION`).
  Prihlasovacie údaje zopakované v streamovanej odpovedi sa nezamaskujú.
- **Kanály vypnutia vs. middleware (zámerne):** middleware vyhodnocuje prompt
  injection vlastným volaním `evaluatePromptInjection()`, bez odovzdania
  akéhokoľvek volateľom ovládaného zoznamu vypnutí. Režim `block` je povinná
  hranica, ktorú volateľom ovládané vypnutia nedokážu obísť, a to ani na
  trasách rodiny chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Vypnutie
  `prompt-injection` preskočí iba guardrail registra.

### Čo vidí odpoveď pred post-call

Na nestreamovanej ceste je poradie: extrakcia pamäte → vykonanie vstavaných
nástrojov → post-call guardrails → výstup pri post-call bloku → uloženie do
semantickej cache.

- **Extrakcia pamäte** a **vykonávanie nástrojov** vidia odpoveď skôr, ako ju môžu guardrails po volaní (post-call) prepísať alebo zablokovať. Od
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) extrakcia
  pamäte preposiela extrahovaný text cez `sanitizePII`, keď je zapnuté
  `PII_RESPONSE_SANITIZATION` (pri streamovanom aj nestreamovanom režime), ale
  odpoveď, ktorú post-call neskôr zablokuje, už bola pamäti a nástrojom
  ponúknutá.
- **Sémantická cache** ukladá odpoveď až po post-call, takže ukladá
  prepísanú odpoveď a zablokovaná odpoveď sa nikdy do cache nedostane. Záznamy
  v cache sú kľúčované podľa API kľúča.

## Konfigurácia

Premenné prostredia čítané vstavanými strážami:

| Premenná                              | Používa                   | Účinok                                                                                                   |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Nastavte `false`, aby sa detekcia úplne vypnula.                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika injekcie: `warn`, `block` alebo `log`. Zastaralá hodnota `redact` neprepisuje text injekcie.    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim stráže injekcie; zároveň príznak funkcie v DB, ktorý **prepisuje** premenné prostredia (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimálna závažnosť, ktorú `MODE=block` odmietne: `high` (predvolená), `medium` alebo `low`.             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastaralý alias pre `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Ak je nastavené `true`, PII v požiadavke sa anonymizujú (nezávisle od režimu injekcie).                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Riadi správanie maskovača na strane odpovede.                                                            |

Stráže Modality Bridge čítajú konfiguráciu za behu z úložiska nastavení
podporovaného databázou (`getSettings()`), nie z premenných prostredia. Primárne
kľúče pre Vision sú
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Zastaralé
kľúče `visionBridge*` sú akceptované iba ako zdokumentovaná záložná možnosť
čítania na jeden cyklus; zápisy z panela používajú primárne kľúče. Predvolené
hodnoty a riešiteľ záložného mechanizmu sa nachádzajú v
`src/shared/constants/modalityBridgeDefaults.ts`, pričom zastaralé
konštanty sú zachované v `src/shared/constants/visionBridgeDefaults.ts`.

Audio používa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips`, plus zdieľané
nastavenia `modalityBridgeCache*`. Audio nemá záložný mechanizmus pre zastaralé
kľúče, pretože tieto kľúče boli zavedené so schémou Modality Bridge.

Video používa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout`, plus zdieľané nastavenia `modalityBridgeCache*`.
Je predvolene vypnuté, pretože FFmpeg/ffprobe sú voliteľné prevádzkové
závislosti a opisovanie snímok pridáva latenciu a náklady na model.

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
