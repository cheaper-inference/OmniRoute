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

Zachytí časti videa najvyššej úrovne v Dokončeniach rozhovoru `messages` a Odpovede API `input` pred volaním cieľa bez známej podpory natívneho videa. Podporované tvary sú `input_video`, `video_url`, `video_source`, HTTPS URLs a `data:video/*;base64,...` data URIs. Obyčajné názvy súborov v texte sa nepovažujú za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vlastní prechod požiadaviek, kontrolu capability/policy, agregáciu podľa požiadavky a užitočné zaťaženie odpovede. Akvizícia — pre prácu s videom, vyrovnávacia pamäť celého výsledku, ktorá popisuje sekvenciu snímok (ktorá spája akýkoľvek zvukový prepis deklarovaný volajúcim) a metrics/abort/cleanup — pre každý pokus je skryté za `processVideoPart` v `videoBridgePipeline.ts`, volá sa raz za video časť v slučke `preCall`. Tento modul tiež definuje explicitné hranice portu `VideoMediaBrokerPort` (získavanie bajtov a extrahovanie vzorkovaných snímok), `VideoAudioTranscriptionPort` (spájanie zvukového prepisu deklarovaného volajúcim so vzorkovanými titulkami) a `VideoDrilldownPort` (starý tvar surového obchodu). Produkčné STT a retencia rámca sú zložené okolo popisujúceho portu cez `createVideoSttAdapter` a `createVideoDrilldownAdapter`; ten druhý používa zdieľaný životný cyklus nepriehľadnej rukoväte.

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

Volajúci môžu pripojiť voliteľné pole `transcript.cues` k podporovanej časti videa, ak už majú zarovnaný text. Každá tága musí niesť `text`, konečný interval `start`/`end` v rámci testovaného trvania a `source` na bielej listine (`client`, `embedded` alebo `audio-bridge`); `confidence` je predvolene `1` a musí zostať medzi `0` a `1`. Presné duplicitné náznaky sú zbalené. OmniRoute nikdy nespustí prepis z týchto metadát: overené podnety sa skopírujú do opísaného výsledku so zdrojom, spoľahlivosťou a intervalom a vykreslia sa ako nedôveryhodné pozorovania spolu s titulkami snímok. Neplatný text, text mimo rozsah alebo text bez pôvodu je odmietnutý a nie zmiešaný do prúdu titulkov. Obidva kanály prepisu tela požiadavky normalizujú dodaný pôvod k `client`, vrátane označenia `embedded` alebo `audio-bridge`. Len adaptér vlastnený serverom môže priradiť tieto dôveryhodné označenia prostredníctvom argumentu `trustedSource` iba v kóde; pole request JSON nemôže dosiahnuť tento argument. Text prepisu zostáva nedôveryhodným obsahom z médií bez ohľadu na jeho pôvod a nikdy nesmie určovať autorizáciu.

Pokročilý volajúci môže poskytnúť stopu `audioTranscript` pre to isté video; považuje sa za text poskytnutý klientom, nie za dôkaz prepisu servera. Fúzny šev vykonáva vizuálne a zvukové pozorovania v jednom termíne a preruší signál, zoradí ich na spoločnú časovú os, zbalí presné duplikáty a ohlási čiastočný výsledok, keď uspeje len jedna strana. Neplatné `audioTranscript` degraduje na tento čiastočný výsledok — vizuálny popis sa zachová a audio vetva zaznamená dezinfikovaný kód zlyhania — namiesto zlyhania celého videa. Dostupnosť na pobočku, čiastočný príznak a dezinfikované chybové kódy sú zachované v opísanom výsledku, v metaúdajoch zábradlia (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), v metaúdajoch medzipamäte výsledkov a v počítadlách premostenia. Predvolená cesta Video Bridge nevyvoláva prevod reči na text ani nesťahuje druhú kópiu média; bez tejto explicitnej stopy zostane iba video.

**Zachovanie prepisu (#12150 P1).** Toto platí automaticky vždy, keď Video Bridge (samotné prihlásenie) vykreslí prepisovú nápovedu — neexistuje žiadny samostatný príznak zachovania. Keď požiadavka vykreslí akúkoľvek prepisovú nápovedu (volajúcim deklarovaným `transcript` alebo zlúčeným `audioTranscript`), zábradlie ho označí `videoBridgeObserved` a vytvorí redigovaný tieň popisu videa — identické vykreslenie, v ktorom je telo voľného textu každého cue nahradené `[redacted-video-transcript]`, vytvorené nahradením poľa štrukturovaného nápovede pred zostavením splošteného obsahu — nepriateľské alebo bežné, vrátane tiel obsahujúcich `]`, ako je `[inaudible]`/`[music]` — môžu prežiť). Telo žiadosti trvalého protokolu hovorov zamieňa každú textovú časť odvodenú z videa za redigovaný tieň, ktorý zodpovedá rovnosti obsahu; kotva `fullText` sa znovu načíta z hotového užitočného zaťaženia zábradlia pred zavolaním, takže zhoda je stále úspešná po tom, čo neskoršie zábradlia reťaze ( PII a maskovače poverení, priority 10/95) prepíšu text popisu na miesto a po injekcii system-prompt/handoff/memory pretvorí pole správ. Telo odoslané proti prúdu k modelu je nezmenené. Pozorovaná požiadavka tiež nevypĺňa žiadnu trvalú pamäť (extrakcia z požiadavky aj z odpovede sa preskočí), takže vlastná odpoveď modelu nemôže opakovať text prepisu do pamäte.

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

Snímky sa popisujú postupne podľa nakonfigurovaného modelu videa. Prázdne prepísanie videa zdedí nastavenie Vision; ak sú obe prázdne, automatický smerovač Vision vyberie efektívny model so schopnosťou videnia. Úspešné titulky nahrádzajú pôvodnú časť stabilnou predponou `[Video description:`, ktorá tiež označuje text ako nedôveryhodné pozorovanie odvodené od médií a prikazuje modelom, aby sa neriadili pokynmi v médiách. Kľúče vyrovnávacej pamäte pre titulky rámca zahŕňajú bajty JPEG, výzvu, časovú značku a efektívny model; do vyrovnávacej pamäte sa ukladajú iba úspešné titulky. Záznamy vo vyrovnávacej pamäti zachovávajú skutočný model úspešného výrobcu vrátane záložného modelu; most hlási `mixed` keď boli vyrobené rôzne rámy rôznymi modelmi. Zásah do vyrovnávacej pamäte opätovne používa túto identitu výrobcu namiesto toho, aby ju znova označil ako požadovaný plán smerovania. Vyrovnávacia pamäť výsledkov celého videa je kľúčovaná na každom vstupe, ktorý mení výstupnú výzvu —, efektívny model, politiku vzorkovania, počet snímok, režim sémantickej analýzy, odtlačok prsta SHA-256 normalizovanej nápovedy zamerania, okna zamerania, `transcript`, `audioTranscript` a príznaku kontaktného hárka —, takže zmena ktorejkoľvek z týchto dimenzií znamená vynechanie vyrovnávacej pamäte, nikdy nie zastarané opätovné použitie. Verzia vizuálnej dedupovanej politiky, prah a počet ohraničených kandidátskych rámcov sú tiež explicitné v kľúči a metadátach cache výsledkov; zmena pravidiel preto nemôže znova použiť zastaraný popis celého videa. Metadáta Result-cache v4 uchovávajú režim a odtlačok prsta, nikdy nie surovú používateľskú úlohu. Metadáta zábradlia hlásia požadované aj efektívne spôsoby analýzy; požadovaný režim `focused` bez použiteľného používateľského textu je hlásený ako efektívne `full`.

Zábradlie extrahuje každú podporovanú časť videa, ale neopisuje viac ako `modalityBridgeVideoMaxVideos`. Pre cieľ, ktorý má `supportsVideo === false`, sa neúspešné a prekročené videá stanú explicitnými bezpečnými textovými značkami, takže žiadne nespracované video neprežije. Ak funkcia nie je známa, tieto časti si ponechajú svoj video nosič; akýkoľvek záložný prepis nasleduje po konverzii ohraničeného textu vyššie. Ciele so `supportsVideo === true` obchádzajú most. Signál zrušenia požiadavky klienta sa šíri cez sťahovanie, front sprostredkovateľa, podprocesy a volania titulkov; preruší zastavenie medzi videami a nikdy nezlyhá otvorené nespracované médiá.

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

### Maska PII (`piiMasker.ts`)

Beží ďalej **oboje** etapy.

- **`preCall`** klonuje užitočné zaťaženie, prechádza `system`, `messages`, `input` a `prompt` (vrátane položiek s jednoduchým reťazcom) a aplikuje `processPII()` (z `@/shared/utils/inputSanitizer`) na polia `content`/`text` reťazca. Keď `PII_REDACTION_ENABLED=true`, zistený PII sa zredukuje v odchádzajúcej užitočnej záťaži. Toto je nezávislé od `INPUT_SANITIZER_MODE` (ktoré riadi iba politiku rýchleho vstrekovania). Keď je redigovanie vypnuté, hovor zaznamenáva počty detekcií bez prepisovania obsahu.
- **`postCall`** hlboko klonuje odpoveď, spúšťa `sanitizePIIResponse()` plus maskovač tvaru Responses-API (`maskResponsesOutput` — pokrýva `output_text` a `output[].content[].text`). Ak dôjde k akejkoľvek úprave, upravená odpoveď nahradí originál.

Zábradlie nikdy neblokuje; iba anotuje (`meta.detections`, `meta.redacted`) alebo prepisuje.

#### Výber podľa typu, vlastné vzory a počítadlá detekcie

**Prístrojová doska → Nastavenia → Zabezpečenie → PII maskovanie** vyberie _čo_ je maskované. Nezapína maskovanie: to je stále `PII_REDACTION_ENABLED` (požiadavka) a `PII_RESPONSE_SANITIZATION` (odpoveď + SSE), obe sú štandardne vypnuté.

- **Výber podľa typu** — vstavané identifikátory sú uvedené v `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavené znamená každý typ (správanie pred týmto nastavením). Vzor `ssn_us` vyhľadávacieho nástroja sa mapuje na `ssn`. Šablóny (minimálne, štandardné, finančné, brazílske, USA, GDPR, POPIA, úplné) vyplňte iba začiarkavacie políčka v UI.
- **Identifikátory GDPR a POPIA** Dvanásť vstavaných identifikátorov — pokrývajúcich EU a juhoafrické osobné identifikátory (tabuľka nižšie). Ich regulárne výrazy, validátory a značky jurisdikcie žijú v jednej tabuľke, `src/shared/utils/piiPatterns.ts`, ktorú využíva dezinfekčný prostriedok odpovede (`src/lib/piiSanitizer.ts`) aj maskovač žiadosti (`src/shared/utils/inputSanitizer.ts`). Zhoda je zredukovaná iba vtedy, keď ju jej validátor akceptuje; holých čísel nie je nikdy dosť. Operátor, ktorý uložil zúžený výber predtým, ako tieto identifikátory existovali, si zachová správanie, ktoré mal, kým sa nezaškrtnú nové identifikátory.
- **Vlastné vzory** — až 20 vzorov regulárnych výrazov alebo zástupných znakov (`*` = až 64 znakov bez medzier, `?` = jeden). Zápasy sa stávajú `[CUSTOM_REDACTED]`. Každý vzor prechádza cez `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): najviac 500 znakov, príznaky obmedzené na `g i m s u`, musí sa skompilovať, musí prejsť `safe-regex` (katastrofické spätné sledovanie) a nesmie sa zhodovať s prázdnym reťazcom alebo zástupným symbolom pre redigovanie. Vzor, ktorý zlyhá, sa pri ukladaní a testovaní odmietne a uložený riadok, ktorý zlyhá, sa namiesto kompilácie preskočí za behu. Vlastné vzory sa spúšťajú iba vtedy, keď je zapnuté maskovanie.
- **Detekčné počítadlá** — za typ počíta (nikdy sa nezhodujú s hodnotami), uchováva sa v pamäti a resetuje sa pri reštarte (`src/lib/pii/piiDetectionStats.ts`). Zvyšujú sa iba vtedy, keď je maskovanie zapnuté.

Nastavenia sú uložené v tabuľke `key_value` (priestor názvov `pii_settings`, `src/lib/db/piiSettings.ts`) a čítajú sa cez 1 s cache. API:

| Metóda | Cesta                    | Účel                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav príznakov, `enabledTypes`, `customPatterns`, počítadlá detekcií |
| `PUT`  | `/api/settings/pii`      | Nahradiť `enabledTypes` (`null` = všetky) a/alebo `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Dry-run jedného vzoru voči vzorke najviac 8 KB; nič sa neukladá      |

Všetky tri vyžadujú manažérske overenie a overenie tela pomocou Zod (`src/shared/validation/schemas/piiSettings.ts`). So zakázaným prihlásením (`requireLogin=false`) sú `GET` a testovací koncový bod otvorené, ale `PUT` stále potrebuje reláciu dashboardu, kľúč `manage` -scope API, prístupový token `oma_` s rozsahom zápisu alebo vyšším alebo token CLI alebo token internej služby odoslaný zo spätnej slučky.

#### Identifikátory GDPR (EU) a POPIA (Južná Afrika).

| ID                  | Identifikátor                       | Overenie                                                                                   |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                                | Známa krajina, presná dĺžka pre túto krajinu, ISO 13616 MOD-97-10                          |
| `eu_vat`            | Číslo DPH v EÚ                      | Známa predpona členského štátu a formát čísla daného štátu (bez vyhľadávania vo VIES)      |
| `es_dni_nie`        | Španielske DNI / NIE                | Kontrolné písmeno (hodnota mod 23); NIE je `X/Y/Z` + 7 číslic                              |
| `it_codice_fiscale` | Taliansky Codice Fiscale            | Kontrolné písmeno z tabuliek nepárnych/párnych pozícií                                     |
| `pl_pesel`          | Poľský PESEL                        | Vážený kontrolný súčet a vierohodné rozsahy zakódovaného mesiaca/dňa narodenia             |
| `nl_bsn`            | Holandské BSN                       | Skúška 11 (váhy 9..2, -1)                                                                  |
| `de_steuer_id`      | Nemecké Steuer-ID                   | ISO 7064 Mod 11,10 a pravidlá štruktúry číslic (bez úvodnej 0)                             |
| `se_personnummer`   | Švédske personnummer                | Luhn nad poslednými desiatimi číslicami a vierohodný dátum narodenia (10 alebo 12 číslic)  |
| `za_id`             | Juhoafrické identifikačné číslo     | Luhn nad všetkými 13 číslicami, platný mesiac/deň narodenia, číslica občianstva 0 alebo 1  |
| `za_phone`          | Juhoafrický telefón                 | Predpona `+27` / `27` alebo národný tvar `0..` zapísaný s medzerou či spojovníkom          |
| `za_vat`            | Juhoafrické číslo DPH               | 10 číslic začínajúcich na `4` **a** "VAT" / "BTW" v predchádzajúcich 48 znakoch            |
| `za_tax_ref`        | Juhoafrické daňové referenčné číslo | 10 číslic začínajúcich na `0`-`3`, Luhn **a** "tax" / "SARS" v predchádzajúcich 48 znakoch |

Pretože formáty obsahujúce iba číslice kolidujú s číslami objednávok, číslami zostavy a časovými pečiatkami, tie najslabšie (`za_vat`, `za_tax_ref`) potrebujú kľúčové slovo a holé desaťmiestne číslo `0..` sa nepovažuje za telefónne číslo v Južnej Afrike. Medzery IBANs (`GB29 NWBK ...`) sa nezhodujú. Na streamovacej ceste sa tágo vyhľadá iba v rámci aktuálneho bloku. ID sú pred všeobecnými vzormi telefónov, takže overený identifikátor si ponecháva svoj vlastný zástupný symbol (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Šablóny `gdpr` a `popia` vyberajú identifikátory EU a Južnej Afriky. Samotné maskovanie zostáva voliteľné (tvrdé pravidlo #20): nič tu nemení predvolené nastavenie príznaku funkcie.

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
