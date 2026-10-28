# Guardrails (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Naposledy aktualizováno:** 2026-10-17 — v3.8.52 (přidáno [Pokrytí a omezení](#coverage-and-limits):
> které routy a cesty odpovědí hooky pokrývají, sloučené hlavičky pro zakázání (#16412), režim
> blokování injekcí jako povinná hranice (#16413) a co vidí odpověď před post-call)

Guardrails vynucují bezpečnost, zásady a transformace obsahu na hranici
mezi OmniRoute a upstream poskytovateli. Každý guardrail může kontrolovat
(a volitelně zamítat, transformovat nebo anotovat) datové části požadavků
(`preCall`) a odpovědi upstreamu (`postCall`).

Systém je **fail-open**: pokud guardrail během provádění vyhodí výjimku,
registr chybu zaznamená a pokračuje dalším guardrailem, místo aby nechal
požadavek selhat. Blokování je explicitní rozhodnutí (`block: true`), nikdy
náhoda. Jedinou výjimkou je přerušený požadavek: když je `signal` volajícího
přerušen, vyhazující guardrail běh hooku zamítne, místo aby byl přeskočen.

Hooky se **nespouštějí** na každé routě ani u každé odpovědi. Než se na
guardrail začnete spoléhat jako na bezpečnostní kontrolu, přečtěte si
[Pokrytí a omezení](#coverage-and-limits).

## Vestavěné guardraily

Registr při importu automaticky načte šest guardrailů v pořadí podle priority
(viz `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Název               | Fáze           | Soubor                |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižší čísla priority běží **jako první**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Základní model GLM 5.3 a `glm-5.3-{low,high,max}` mají explicitní metadata
`supportsVision:false` v registru/specifikaci. Varianty GLM 5.3 Flash
zůstávají nativně vizuálními modely. Routa `/v1/messages` nástroje Claude Code
vstupuje do sdíleného pre-call řetězce guardrailů `handleChat` **ještě před**
překladem Claude→OpenAI; vnořené obrázky z výsledků nástroje `Read` musí být
popsány nebo zpracovány dříve, než je tento překlad přenese do obsahu OpenAI
`image_url` (#17069).

Zachytává požadavky nesoucí obrázky, které míří na **modely bez vidění**, a buď
celý požadavek přesměruje na model s podporou vidění, nebo před voláním
upstreamu nahradí obrazové části textovými popisy vytvořenými konfigurovatelným
vizuálním modelem. To umožňuje čistě textovým poskytovatelům transparentně
zpracovávat multimodální datové části.

Průběh:

1. Přeskočí, pokud cílový model již vidění podporuje (pokud se nevyskytuje
   v seznamu vynuceného můstku `isVisionBridgeForcedModel`).
2. Extrahuje obrazové části pomocí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), která deleguje na **sjednocený detektor
   médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný
   zdroj pravdy sdílený s filtrem kompatibility kombinací.
   Extrakce je allowlistem omezena na tvary, které `replaceImageParts`
   dokáže vmontovat zpět (kontrakt extrakce↔nahrazení): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`
   a Responses API `input_image`. Odpovídající obrázky vnořené uvnitř
   `tool_result.content` nástroje Claude Code a výstupů nástrojů Responses
   jsou rovněž extrahovány a nahrazovány na svých původních cestách; tvary
   sloužící pouze jako indikátory jsou materiálem pro filtr kombinací a nejsou
   extrahovány.
   Pokud žádné nenajde, přeskočí.
3. Vyhodnotí běhovou konfiguraci pomocí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové klíče nastavení
   `modalityBridge*` mají přednost; starší klíče `visionBridge*` zůstávají
   **jednocyklovým fallbackem** (okno pro rollback). Je-li můstek zakázán,
   přeskočí ještě před jakýmkoli procházením médií.
4. Selektor režimu (`modalityBridgeVisionMode`, viz tabulka níže) rozhoduje
   mezi přesměrováním a popisem. Přesměrování vrací `modifiedPayload` pouze
   s vyměněným `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Větev popisu: omezí obrázky na `maxImages`, sestaví prompt odpovídající
   úloze, nahlédne do mezipaměti popisů, zavolá vizuální model **paralelně**
   (`Promise.allSettled`) a na jejich místo vloží textové části
   `[Image N]: <description>`. Neúspěšný popis vrací `null`: u neznámých cílů
   nebo cílů s podporou vidění zůstane původní obrázek zachován (#4012), ale
   **potvrzený čistě textový přímý cíl** nebo kombinace bez vidění dostane za
   každý nepopsaný obrázek explicitní textový stub
   `(unavailable — no vision-capable provider connected)`, včetně částečných
   selhání a obrázků nad limitem volání popisu (#17069). Stávající fallback
   popisu kombinace při selhání všech pokusů zůstává zachován (#8430).
6. Vrátí `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor režimu (`modalityBridgeVisionMode`)

| Režim      | Výchozí | Chování                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Původní heuristika, beze změny (#6640/#7204): modely, které nejsou combo/`auto/`, se přesměrují na nejlepší vizuální model, ledaže původní model již má použitelné přihlašovací údaje (v takovém případě se provede describe); combo cíle vždy provádějí describe.                                                                          |
| `describe` |         | Vždy describe — blok přesměrování je zcela přeskočen; vždy odpovídá model zvolený uživatelem.                                                                                                                                                                                                                                               |
| `reroute`  |         | Vynucené přesměrování: pojistka zachování modelu s přihlašovacími údaji je obejita. Pojistka přihlašovacích údajů **cíle** přesměrování stále platí — pokud neexistuje žádný použitelný vizuální cíl, most zablokuje požadavek s jasnou chybou namísto toho, aby provedl describe nebo odeslal surové obrázky cíli určenému pouze pro text. |

Vynucené režimy se uplatní zkratově ještě **před** spuštěním automatické
heuristiky; chování `auto` je bajt po bajtu identické s pojistkou před PR-1.

#### Rozsah API klíče (`visionBridgeKeyScope.ts`)

Když API klíč volajícího omezuje `allowedConnections`, fondy kvót
(`allowedQuotas`) nebo modely (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most vybírá pro
reroute a describe pouze modely, které smí klíč používat, a to na připojeních,
která smí klíč používat. Volání describe pak vždy prochází self-loopem
OmniRoute s hlavičkou `x-omniroute-self-loop-key-id`, takže přijímající
požadavek chatu znovu vynucuje politiku připojení a modelů daného klíče.
`enforceApiKeyPolicy()` respektuje tuto hlavičku pouze společně s bearer
tokenem self-loopu, takže může přístup pouze zúžit, a id, které nelze
dohledat, je zamítnuto.

Pokud pro klíč není povolen žádný vizuální model, **potvrzený cíl pouze pro
text** zamítne požadavek s obrázkem lokálně s jasnou chybou HTTP 400, namísto
aby přeposílal bajty obrázku upstreamu, který je nedokáže zpracovat (#17069).
U cílů s neznámou nebo nativní vizuální schopností si cesta describe zachovává
své dosavadní fail-open chování (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Požadavky bez klíče
a klíče bez těchto omezení se chovají přesně jako dříve.

#### Prompt describe s ohledem na úlohu (`modalityBridgeVisionTaskAware`)

Výchozí **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) připojí k
základnímu promptu describe text **poslední uživatelské zprávy** (zkrácený na
500 znaků), čímž směřuje popis k tomu, na co se uživatel skutečně ptal (vzor
codex-vision-proxy), a žádá vizuální model o přepsání viditelného textu. Při
vypnutém příznaku — nebo pokud žádný uživatelský text neexistuje — se použije
základní prompt beze změny.

Vlastní OpenAI-kompatibilní požadavek self-loopu describe
(`callVisionModelSingle()` ve `visionBridgeHelpers.ts`) vždy žádá o
`image_url.detail: "high"` — bezpodmínečně, pro každého volajícího či
poskytovatele, bez vazby na jakýkoli signál klienta. Vzorkování s nízkou
úrovní detailu snižuje přesnost OCR právě u úlohy přepisu textu, o kterou
tento prompt žádá, takže samotné volání describe vždy žádá o vysoký detail bez
ohledu na to, jakou úroveň detailu použil původní příchozí požadavek. To
ovlivňuje pouze tělo interního požadavku describe; nemění to způsob, jakým
OmniRoute přeposílá vlastní `image_url.detail` volajícího v primárním
požadavku — tato výchozí hodnota se aplikuje samostatně, a pouze u detekovaných
klientů OpenCode, v `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Větev self-loopu describe ve
wire-formátu Anthropic nemá pole `detail` a není ovlivněna žádnou z těchto
výchozích hodnot.

#### Omezení délky výstupu describe (`modalityBridgeVisionMaxChars`)

| Klíč                           | Výchozí | Rozsah             |
| ------------------------------ | ------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`     | `0` nebo 100–50000 |

`0` (výchozí) znamená **bez omezení** — popis vrácený funkcí
`callVisionModel()` se předává dál beze změny, čímž se zachovává stávající
chování. Jakákoli hodnota v rozsahu 100–50000 zkrátí popis s příponou `…`
ještě předtím, než je vložen zpět jako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Hodnotu zvyšte u úloh OCR náročných na detail, kde downstream model potřebuje
úplný přepis; snižte ji, chcete-li omezit spotřebu tokenů u upovídaných
vizuálních modelů. Pole na dashboardu se nachází v panelu Advanced na kartě
Vision (`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a
jakoukoli hodnotu mezi 1 a 99 zvýší na spodní hranici 100, zatímco explicitní
`0` ponechá nedotčenou — `0` je sama o sobě platná hodnota Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nikoli
pouze „nenastavená" výchozí hodnota.

#### Mezipaměť describe (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL mezipaměť pro výstupy describe, sdílená v rámci celého
procesu. Klíč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
rámováním pomocí délkových prefixů (žádné kolize na hranicích polí). Složkou
modelu v klíči je **nakonfigurovaný** model mostu, nikoli model, který
skutečně odpověděl — `callVisionModel` může interně přejít na záložní variantu
a klíčování podle jednotlivých pokusů by mezipaměť fragmentovalo. Neúspěšná
volání describe se nikdy do mezipaměti neukládají. Nastavení:

| Klíč                            | Výchozí | Rozsah  |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalizace vzdálených obrázků (self-loop describe/base64 fetch)

Když bridge sám stáhne **vzdálený** obrázek — self-call pro describe přes
Anthropic a konverze do base64 pro claude-wire-format
(`ensureBase64ImagesForClaudeWire`), obojí přes
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledný data
URI prochází před vložením do požadavku na vizuální model funkcí
`normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`). Příliš velké obrázky se zmenší na
**dlouhou hranu 2048 px** (odpovídá limitu pro změnu velikosti, který
OpenAI/Anthropic již aplikují na serveru), což snižuje objem nahraných
dat/latenci, aniž by se změnilo to, co vizuální model vidí. Změna velikosti
používá `sharp`, načtený přes dynamický import: na platformě, kde se jeho
nativní binárka nepodaří načíst, `normalizeDataUri()` **nikdy nevyhodí výjimku** —
přejde do režimu přímého předání původních bajtů, takže cesta
describe/base64-konverze funguje vždy dál. Bajty, které nejsou obrázkem
(fetch, který nevrátil dekódovatelný obrázek), se rovněž předají beze změny.
Tato normalizace se vztahuje pouze na obrázky, které bridge stahuje pro svůj
vlastní self-call — nikdy se neaplikuje na nezpracovaný passthrough payload
volajícího, v souladu s principem mutace pouze na opt-in bázi (Hard Rule #20).

#### Schéma nastavení + migrace

Nové klíče `modalityBridge*` jsou validovány přes Zod v `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojice `modalityBridgeCache*` a skupina
`modalityBridgeAudio*` používaná Audio Bridge. Migrace
`141_modality_bridge_settings.sql` kopíruje existující starší hodnoty
`visionBridge*` do odpovídajících nových klíčů (idempotentně, nikdy
nepřepíše hodnotu `modalityBridge*` nastavenou operátorem); starší klíče
zůstávají přijímány jako read fallback po dobu jednoho release cyklu.

#### Hlavička transparentnosti + statistiky

Odpovědi transformované přes describe nesou hlavičku
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sestavenou funkcí `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`,
připojenou přes `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Přesměrované požadavky **žádnou** hlavičku nedostávají — payload zůstal
nedotčený a výměna modelu je již viditelná v poli `model` těla odpovědi.

`GET /api/modality-bridge/stats` (management auth, stejná úroveň jako
`GET /api/settings`) vrací in-memory čítače pro jednotlivé modality
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pro `vision`, `audio` a
`video`. `averageLatencyMs` používá jako jmenovatel `latencySamples`, nikoli
všechny pokusy; operace bez měření času nevymýšlí vzorek s nulovou dobou
v milisekundách. `bridged` zůstává zpětně kompatibilním aliasem pro úspěšné
konverze; neúspěšné pokusy ho neinkrementují.
Čítače se při restartu procesu záměrně resetují
(jde o telemetrii, ne o účetnictví).

#### Konfigurace dashboardu

Vyhrazená stránka dashboardu je
`/dashboard/settings/modality-bridge`. Její URL-adresovatelné záložky `Vision`,
`Audio` a `Video` při přepínání hodnoty `tab` zachovávají query parametry.
Záložka Vision zpřístupňuje povolení, režim, výběr modelu (včetně automatické
výchozí hodnoty), task-aware prompting, pokročilé limity pro
timeout/počet obrázků/délku popisu/cache, runtime čítače a chráněný ukázkový
požadavek. Záložka Audio je rovněž živá: zpřístupňuje povolení, výběr modelu
pouze pro STT s volbou Auto, limity pro timeout/maximální délku klipu, audio
čítače a ukázkový test `input_audio`. Záložka Video je funkční: hlásí stav
runtime FFmpeg/ffprobe — jeden ze čtyř explicitních UI stavů (`unknown`, dokud
probíhá detekce nebo nemohla být dokončena, `restricted` na non-loopback
hostiteli dashboardu, kde se detekce na klientovi přeskakuje, `unavailable` po
detekci a potvrzení absence, nebo `available` s verzemi FFmpeg/ffprobe) — ukládá
limity pro povolení/model/snímky/video/timeout, filtruje výběr modelu na modely
s podporou vision a zpřístupňuje video čítače.

Dřívější karta Vision Bridge v nastavení AI je nyní kompatibilním odkazem na
novou stránku; již nevlastní druhou kopii formuláře. Media Providers rovněž
odkazuje workflow Image-to-Text a Speech-to-Text na odpovídající záložky
Modality Bridge, aniž by odebíralo stávající Speech-to-Text playground.

**Obejití admission pro self-loop:** když describe call prochází přes vlastní
self-loop `/v1` OmniRoute (nestandardní model poskytovatele), dílčí požadavek
odesílá `x-omniroute-admission-bypass: internal` a je autentizován vyhodnoceným
self-loop credential — lokálním sentinelem `sk_omniroute` v lokálním režimu, nebo
operátorem nakonfigurovaným env klíčem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
(#1350), takže nasazení s `REQUIRE_API_KEY=true` mohou describe call stále
provádět. Bypass je uznáván pouze pro přesně tyto credentials, takže externí
klienti nemohou hlavičku použít k přeskočení admission.

Starší výchozí hodnoty se nacházejí v `src/shared/constants/visionBridgeDefaults.ts`;
nové výchozí hodnoty pro režim/task-aware/cache a settings resolver jsou v
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail zpřístupňuje
konstruktorovou volbu `deps`, aby testy mohly vložit falešné implementace
`getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachycuje chat požadavky nesoucí audio, než dosáhnou cíle, u kterého není
známo, že přijímá audio vstup. Chat požadavek nikdy nepřesměrovává: audio
části jsou přepsány přes existující OpenAI-kompatibilní multipart endpoint
a zvolený chat model pokračuje s textovými přepisy.

Průběh:

1. Hodnota `supportsAudio` se určuje prostřednictvím `getResolvedModelCapabilities()`. Přednost mají explicitní metadata z registru poskytovatelů, poté statická metadata modelu a nakonec synchronizované `modalities_input`. Deklarovaný seznam vstupů bez `audio` znamená `false`; při absenci důkazů o schopnostech zůstává hodnota `null`. Jak `false`, tak `null` aktivují konzervativní most, zatímco `true` jej obchází.
2. Načtou se nastavení `modalityBridgeAudio*` a z každé zprávy se prostřednictvím sdíleného detektoru `detectMediaParts()` extrahují oddělitelné audio části nejvyšší úrovně. Podporované přenosové tvary jsou OpenAI `input_audio`, `audio_url` a `source.media_type: "audio/*"`. Vnořené audio je detekováno pro účely směrování, ale cesta oddělení (splice) jej neodstraňuje. Množství práce je omezeno hodnotou `modalityBridgeAudioMaxClips`; pozdější části zůstávají nedotčeny.
3. Respektuje se nakonfigurovaný `provider/model`, nebo `selectAudioBridgeModel()` projde `AUDIO_TRANSCRIPTION_PROVIDERS` ve stabilním pořadí katalogu a vybere první model s použitelnými aktivními přihlašovacími údaji poskytovatele.
4. `callAudioTranscription()` převádí audio ve formátu base64/data-URI na multipart `file`, nebo stáhne vzdálené `audio_url` prostřednictvím odchozí ochrany omezené pouze na veřejné adresy s DNS pinningem a limitem 25 MB. Poté odešle soubor a vybraný model metodou POST na lokální self-loop `/v1/audio/transcriptions`, autentizovaný pomocí `resolveSelfLoopBearer()`. Stávající trasa transkripce provádí běžné vyhledání přihlašovacích údajů, zpracování cooldownu/rate-limitu a předání poskytovateli.
5. Úspěšná volání nahrazují své části textem `[Audio N]: <transcript>`. Volání probíhají pomocí `Promise.allSettled`: individuální selhání zachová danou původní audio část (kontrakt #4012). Pokud všechna volání selžou a u cíle je prokázáno `supportsAudio === false`, části se změní na `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430). U neznámého cíle (`null`) zůstává výsledek při úplném selhání nedotčen. Prokazatelně textový cíl bez použitelných STT přihlašovacích údajů obdrží stejnou explicitní zástupnou hodnotu, aniž by bylo provedeno síťové volání.

Úspěšné transkripty využívají procesově sdílenou LRU/TTL mezipaměť Modality Bridge. Klíč kombinuje odkaz na audio, stabilní štítek operace `audio-transcription` a vybraný STT model; selhání se nikdy neukládají do mezipaměti. Pokusy s audiem aktualizují sdílené čítače `bridged`, `cacheHits`, `failures` a `lastUsedAt`. Transformované odpovědi nesou hlavičku
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotčené požadavky segment Audio Bridge nedostávají.

Běhová nastavení jsou uložena v databázi a validována pomocí Zod:

| Klíč                          | Výchozí | Rozsah                  |
| ----------------------------- | ------- | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                       |
| `modalityBridgeAudioModel`    | `""`    | Automaticky nebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                    |

Sdílená mezipaměť zůstává řízena nastaveními `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytává video části nejvyšší úrovně v `messages` rozhraní Chat Completions a v `input` rozhraní Responses API ještě předtím, než je zavolán cíl bez známé nativní podpory videa. Podporované tvary jsou `input_video`, `video_url`, `video_source`, HTTPS URL a data URI ve tvaru `data:video/*;base64,...`. Prosté názvy souborů v textu nejsou považovány za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) zodpovídá za průchod požadavkem, kontrolu schopností/zásad, agregaci v rámci požadavku a obsah odpovědi. Práce na jednotlivých videích — získání dat, mezipaměť celého výsledku, popis sekvence snímků (který slučuje případný volatelem deklarovaný audio transkript) a metriky/přerušení/úklid pro každý pokus — je skryta za funkcí `processVideoPart` v `videoBridgePipeline.ts`, volanou jednou pro každou video část uvnitř smyčky `preCall`. Tento modul také definuje explicitní hranice portů `VideoMediaBrokerPort` (získávání bajtů a extrakce vzorkovaných snímků), `VideoAudioTranscriptionPort` (sloučení volatelem deklarovaného audio transkriptu se vzorkovanými titulky) a `VideoDrilldownPort` (hranice persistence pro drill-down snímků; zatím není zapojena do `processVideoPart` — drill-down záznamy dnes zapisuje pouze samostatná trasa `/api/modality-bridge/video/drilldown`).

Veřejná cesta požadavků `/v1` nikdy neimportuje ani nespouští podproces. Vzdálená videa se stahují s limitem 50 MiB; vložená base64 videa mají konzervativní limit 36 MiB dekódovaných dat na video, aby obálka modelu/zpráv/formátování zůstala v rámci veřejného limitu příjmu JSON požadavků 50 MiB. Délka vložených dat a odhad dekódované velikosti se kontrolují před alokací. HTTPS je vyžadováno na počáteční vzdálené URL i při každém přesměrování, s využitím stávající odchozí ochrany omezené na veřejné adresy s DNS pinningem. Bajty poté procházejí přesnou interní brokerskou hranicí `POST /api/modality-bridge/video/extract`. Tato trasa je zároveň `LOCAL_ONLY` i `SPAWN_CAPABLE`, přijímá pouze požadavky autentizované v rámci procesu z důvěryhodného loopbacku a nikdy nepřijímá URL, cestu v souborovém systému, spustitelný soubor ani seznam argumentů. Pipeline velikosti těla API a inkrementální čtečka těla v handleru nezávisle vynucují limit 50 MiB pro vstup brokera. Jeho omezená fronta zpracovává vždy jednu extrakci, povoluje čtyři čekající úlohy a omezuje čekající vstup na 100 MiB.

Uvnitř brokeru `ffprobe` čte soukromý lokální soubor; pevný seznam povolených formátů vylučuje formáty playlistů a manifestů. U povolených kontejnerů řady MOV zůstávají externí datové reference MOV ve výchozím nastavení zakázané a pevný příkaz jejich použití neaktivuje. `ffprobe` i `ffmpeg` používají seznam povolených protokolů obsahující pouze `file`, jedno vlákno, pevná pole argumentů, žádný shell a spustitelné soubory překládané z `PATH`. Streamy přiložených obrázků obálek nejsou přehratelní kandidáti. Všechny přehratelné streamy musí splňovat limity a explicitní výchozí stream má přednost před deterministickým fallbackem na nejnižší index. Videa jsou omezena na 600 sekund, 8 192 pixelů na rozměr a 33 554 432 zdrojových pixelů. FFmpeg odebírá 1–16 středových snímků JPEG, zmenšuje delší stranu na nejvýše 1 024 pixelů, aniž by zvětšoval menší vstupy, a nikdy nedostává URL. Vzorkování je ve výchozím nastavení `uniform`. Volitelné zásady `scene_aware` a experimentální `segment_aware` provádějí jeden další pevný průchod FFmpeg nad již ověřeným lokálním streamem, vybírají ohraničené časové značky scén z `showinfo` a při selhání detektoru, timeoutu, poškozeném výstupu nebo prázdné množině kandidátů deterministicky přejdou na stejné uniformní středové body. Režim segment-aware přiděluje středové vzorky proporcionálně ověřeným intervalům scén; evidence a chování fallbacku režimu segment-aware jsou podrobně popsány níže. Pevný limit 16 snímků se u každé zásady uplatňuje až po výběru. Když má požadavek scene-aware rozpočet pouze jednoho snímku, použije uniformní středový bod aktivního okna celého videa nebo fokusního okna a hlásí `policyEffective: uniform`: jediný vybraný snímek scény nemůže zachovat oba časové konce. Volající může volitelně zadat konečné fokusní okno (`start`/`end` v sekundách); hranice jsou oříznuty na délku média, obrácená nebo nekonečná okna jsou odmítnuta a všechny zásady vzorkování se provádějí pouze uvnitř normalizovaného intervalu. Výsledné okno je zahrnuto v metadatech vzorkování a v prefixu nedůvěryhodného popisu, aby navazující modely dokázaly rozlišit zaměřený úryvek od celé časové osy.

Sémantické zaměření titulků je samostatné, explicitní nastavení. Výchozí analytický režim `full` zachovává stávající prompt snímku a nikdy nepředává text požadavku titulkovacímu modelu. V režimu `focused` bridge čte pouze poslední neprázdný uživatelem vytvořený `text`/`input_text` ze stejného kontejneru Chat nebo Responses, normalizuje jej do NFC, slučuje řídicí znaky a bílé znaky a omezuje jej na 500 kódových bodů Unicode. Prázdný výsledek přejde zpět na přesný prompt `full`. Použitelná nápověda je serializována jako JSON ve vyhrazeném bloku nedůvěryhodného uživatelského kontextu a smí pouze upřednostňovat pozorovatelné detaily; nemůže přepsat samostatné varování před následováním instrukcí viditelných nebo slyšitelných v médiu. Textové zaměření nikdy neodvozuje `start`/`end` ani nemění časový vzorkovač.

#### FU-07 strukturální evidence segmentů

`segment_aware` používá jeden ohraničený průchod předanalýzy nad již ověřeným lokálním videostreamem. Pevný řetězec filtrů nejprve škáluje na šířku nejvýše 320 pixelů, detekuje změny scén a zamrzlé intervaly a poté vzorkuje rychlostí 1 snímek za sekundu pro rozostření, průměrnou luma a prostorovou/časovou informaci. Průchod je omezen na 600 strukturálních vzorků, jedno vlákno FFmpeg/filtru, stejné seznamy povolených protokolů pouze `file` a kontejnerů, limit výstupu procesu 1 MiB a nejvýše 30 sekund v rámci sdíleného zrušení/termínu (abort/deadline) brokeru. Nikdy z požadavku nepřijímá příkaz, filtr, cestu ani URL.

Strukturální hodnoty jsou deterministickou evidencí vzorkování, nikoli sémantickým porozuměním videu. Neodvozují subjekty, akce, titulky, řeč ani záměr uživatele. Hranice scén a zamrznutí tvoří segmenty; rozsah zamrznutí, rozostření, expozice, prostorový detail a časová změna pouze ovlivňují, jak je přidělen stávající rozpočet 1–16 snímků. Plně zamrzlý segment je omezen na jeden snímek, zatímco nezamrzlé segmenty soupeří o zbývající rozpočet. Když je hranic více než snímků, zachovává se rovnoměrné pokrytí časové osy, aby rychlé počáteční střihy nemohly skrýt dlouhý závěrečný segment. Hranice scén, které leží v rozlišení analýzy 1 sekundy od hranice zamrznutí, jsou sloučeny.

Chybějící filtry, poškozená/prázdná evidence, chyba detektoru nebo ohraničený timeout předanalýzy selžou režimem fail-open na přesnou zásadu uniformního středového bodu. Zrušení volajícím nebo deadline brokeru režim fail-open nepoužívá: ukončí probíhající podproces, zabrání pozdější extrakci snímků a soukromý dočasný strom je odstraněn v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické reálné testovací přípravky (fixtures) FFmpeg pro úspory volání titulkování po deduplikaci, alokaci rozpočtu při hustém pohybu, evidenci rozostření/expozice/SI-TI, rychlé střihy s dlouhým ocasem a falešně pozitivní výsledky postupných přechodů (fade). Zaznamenává reálný čas předanalýzy (wall time) a tam, kde je k dispozici `/usr/bin/time`, také CPU podprocesu a špičkové RSS. Jeho kontroly kvality jsou pouze strukturální orákly. Skutečná kvalita titulkovacího modelu zůstává ve stavu `HOLD`, protože tato testovací sestava (harness) nemá autorizovaný koncový bod ani zmrazeného hodnotitele (judge). Finanční úspory rovněž zůstávají ve stavu `HOLD`, pokud `--caption-cost-per-call-usd` neposkytne explicitní kladný odhad nákladů na volání; skript nikdy nefabrikuje ani jeden z těchto výsledků.

Každý snímek je omezen na 4 MiB, všechny nezpracované snímky dohromady na 23 MiB a
serializovaná odpověď brokeru na 32 MiB. Soukromý dočasný adresář je odstraněn
v bloku `finally`. OmniRoute neobsahuje FFmpeg a neumožňuje zadat vlastní
cestu ke spustitelnému souboru. Před vytvořením popisků provede bridge konzervativní
vizuální deduplikaci: každý JPEG je zmenšen na 16×16 odstínů šedi a
porovnán pouze s posledním zachovaným snímkem. Je-li požadovaný limit popisků
vyšší než jeden snímek, extrakce poskytne
omezený fond kandidátů o velikosti nejvýše dvojnásobku tohoto limitu, nikdy však více než 16 snímků.
Požadovaný limit se použije až po deduplikaci, přičemž při závěrečném
prořezávání zůstanou zachováni první a poslední vybraný kandidát, pokud je limit alespoň
dva. Verzovaná zásada
`grayscale-16x16-mean-cells-v2` používá vyšší z hodnot průměrného rozdílu jasu a
podílu buněk miniatury, jejichž normalizovaný rozdíl je alespoň 0,05.
Prahová hodnota duplicity je konstanta 0,04, zvolená kvůli předvídatelnosti, nikoli
zpřístupněná jako nastavení za běhu. Tento sekundární
vysokokontrastní signál zachovává drobný pohyb a změny viditelného textu, které
může porovnání založené pouze na průměru skrýt. Při chybách komparátoru nebo dekodéru se
pokračuje bez omezení, aby bylo zachováno pokrytí. Výstupní metadata samostatně uvádějí extrahované kandidáty, úspěšně použité
snímky a odstraněné vizuální duplicity.

Explicitně označená část videa může požádat o kontaktní arch s časovými značkami. Bridge
vytvoří mřížku JPEG s nejvýše 4 sloupci a 16 snímky. Každá buňka o velikosti 512 pixelů
vloží časovou značku zdroje do vysoce kontrastního pruhu u spodního okraje, přičemž stejné časové značky
zůstávají také v textových metadatech pro následné přiřazení a audit. Celý
soubor JPEG je nadále omezen na 32 MiB. Pokud `sharp` nedokáže mřížku dekódovat nebo sestavit,
bridge se vrátí k jednotlivým snímkům JPEG; přerušení ze strany klienta se nadále propaguje
operací kontaktního archu.

Podklady pro schválení nasazení jsou záměrně odděleny od syntetického
mikrobenchmarku sestavování. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje
verzované schéma A/B testovacího nástroje pro skutečné modely vidění kompatibilní s OpenAI. Měří
počet tokenů hlášený poskytovatelem, celkovou koncovou latenci (včetně sestavení kontaktního archu),
počet volání modelu a zachování faktů definovaných v manifestu. Nezpracované odpovědi modelu se
do reportu nezapisují; uchovávají se pouze otisky SHA-256 a ID odpovídajících faktů. Tento
nástroj neprovede žádné síťové volání ani volání placeného modelu, pokud není předán přepínač `--execute-real` a
nejsou nakonfigurovány `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez
takového explicitního skutečného spuštění zůstane jeho strojově čitelný verdikt `HOLD`; samotná
syntetická měření datové zátěže a počtu volání nejsou podkladem pro schválení nasazení.

Volající mohou k podporované části videa připojit volitelné pole `transcript.cues`,
pokud již mají k dispozici zarovnaný text. Každý úsek musí obsahovat `text`,
konečný interval `start`/`end` v rámci zjištěné délky a povolený
`source` (`client`, `embedded` nebo `audio-bridge`); výchozí hodnota `confidence` je
`1` a musí zůstat mezi `0` a `1`. Přesně duplicitní úseky jsou sloučeny.
OmniRoute na základě těchto metadat nikdy nespouští přepis: ověřené úseky jsou
zkopírovány do výsledku popisu společně se zdrojem, mírou jistoty a intervalem a
zobrazeny jako nedůvěryhodná pozorování vedle popisků snímků. Neplatný text,
text mimo rozsah nebo text bez uvedeného původu je odmítnut, místo aby byl přimíchán do
proudu popisků. Oba kanály přepisu v těle požadavku normalizují dodaný
původ na `client`, včetně označení `embedded` nebo `audio-bridge`
uvedených samotným klientem. Tato důvěryhodná označení může prostřednictvím
argumentu `trustedSource` dostupného pouze z kódu přiřadit jen adaptér spravovaný serverem; pole JSON v požadavku
se k tomuto argumentu nemůže dostat. Text přepisu zůstává nedůvěryhodným obsahem
odvozeným z médií bez ohledu na svůj původ a nikdy nesmí určovat autorizaci.

Pokročilý volající může pro stejné video poskytnout stopu `audioTranscript`;
ta se považuje za text poskytnutý klientem, nikoli za důkaz přepisu na serveru.
Integrační vrstva slučování zpracovává vizuální a zvuková pozorování v rámci
jednoho termínu a signálu přerušení, řadí je na společnou časovou osu, slučuje
přesné duplicity a vrací částečný výsledek, pokud uspěje pouze jedna strana.
Neplatný `audioTranscript` vede k tomuto částečnému výsledku — vizuální
popis se zachová a zvuková větev zaznamená sanitizovaný kód selhání —
namísto selhání celého videa. Dostupnost jednotlivých větví, příznak částečného výsledku
a sanitizované kódy selhání jsou zachovány ve výsledku popisu, v
metadatech ochranných mechanismů (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metadatech mezipaměti výsledků a v čítačích
slučování bridge. Výchozí cesta Video Bridge nevolá převod řeči na text
ani nestahuje druhou kopii média; bez této explicitní stopy zůstává
omezena pouze na video.

**Uchovávání přepisů (#12150 P1).** Toto se použije automaticky vždy, když
Video Bridge (který je sám volitelně aktivovaný) vykreslí položku přepisu — žádný
samostatný příznak uchovávání neexistuje. Když požadavek vykreslí jakoukoli položku
přepisu (volajícím deklarovaný `transcript` nebo sloučený `audioTranscript`),
ochranný mechanismus ji označí jako `videoBridgeObserved` a vytvoří redigovanou
stínovou kopii popisu videa — identické vykreslení, ve kterém je volný text každé
položky nahrazen řetězcem `[redacted-video-transcript]`. Kopie se vytváří nahrazením
pole strukturované položky před sestavením řetězce (nikdy analýzou sloučeného textu,
takže žádný obsah položky — útočný ani běžný, včetně textů obsahujících `]`, jako
jsou `[inaudible]`/`[music]` — nemůže zůstat zachován). V uloženém těle požadavku
protokolu volání je každá textová část odvozená z videa nahrazena touto redigovanou
stínovou kopií na základě shody obsahu; kotva `fullText` se znovu načte z dokončeného
payloadu ochranných mechanismů před voláním, takže porovnání uspěje i poté, co
pozdější ochranné mechanismy v řetězci (maskovače PII a přihlašovacích údajů
s prioritami 10/95) přepíší text popisu na místě, a také poté, co vložení systémové
výzvy, předání kontextu nebo Memory změní strukturu pole zpráv. Tělo odeslané
modelu zůstává beze změny. Pozorovaný požadavek také nevytváří žádnou trvalou
Memory (extrakce z požadavku i odpovědi se přeskočí), takže ani vlastní odpověď
modelu nemůže zopakovaný text přepisu uložit do Memory.

**Nezpracovaná pole videa (#12430).** Když je most povolen a nativní podpora videa
není známa nebo není k dispozici, definovaná pole `transcript`/`audioTranscript`
také aktivují `videoBridgeObserved`, a to i po selhání popisu nebo překročení
limitu `maxVideos`. Hodnoty `null` a prázdné řetězce se započítávají; chybějící
pole a metadata nesouvisející s videem nikoli. Uchovávané kopie tato pole redigují
nebo požadavek vynechají a cache i Memory se obcházejí.

Na těchto záložních cestách se platné položky od volajícího změní na podporované
části `text`/`input_text`, nikoli na nestandardní pole poskytovatele. Obě stopy
dodané v požadavku zůstávají nedůvěryhodnými pozorováními typu `client` a obsahují
výslovné upozornění, že video nebylo popsáno a časové značky nebyly ověřeny vůči
médiu. Stávající limity 256 položek, celkem 64 KiB a limity na jednotlivé položky
se uplatňují na obě stopy dohromady; časové značky se musí vejít do
600sekundového stropu zprostředkovatele a do případně zadaného časového okna.
Neplatné stopy jsou zahozeny a nejsou předávány jako libovolný text; platnou
souběžnou stopu lze nadále použít, pokud není překročen jejich společný limit.
Pole s hodnotou null nebo prázdným řetězcem nepřidávají žádný text. Tato záložní
cesta nepřidává žádné načítání média ani přepis. Pole rozšíření přepisu jsou
odstraněna ze záložního nosiče videa a jeho objektů `video_url`/`source`. Seznam
povolených polí přenosového formátu OpenAI zůstává striktní; nosiče videa
s neznámou nativní podporou zůstávají dostupné a známé cíle podporující pouze
text si ponechávají bezpečné značky. Strukturované redigované stínové kopie chrání
připojený text přepisu, zatímco původní požadavek vlastněný volajícím zůstává
beze změny. Cíle s nativní podporou a zakázané mosty si zachovávají své stávající
chování spočívající v obejití této logiky.

Další uchovávané kopie používají stejný signál pozorovaného požadavku. Nezpracovaný
snapshot klientského požadavku před ochrannými mechanismy, čekající požadavek
v paměti a časný protokol odmítnutého požadavku strukturálně nahrazují pole
přepisu ve video částech; řetězcové výzvy vytvořené fázemi pipeline a předáním
kontextu jsou redigovány v místě ukládání těla požadavku. Uložená značka
`video_content_removed` způsobí, že pokračování pomocí `previous_response_id`
bezpečně selže, místo aby rekonstruovalo text, který byl záměrně odstraněn. Pokud
pozorovaný požadavek před protokolováním ztratí stínovou redigovanou kopii některé
části nebo pokud se po pozdějších změnách požadavku nepodaří spárovat byť jen jednu
z několika stínových kopií videa, uložené tělo požadavku se zcela vynechá namísto
uchování pouze částečně redigovaného přepisu.

U pozorovaného požadavku může odpověď modelu citovat libovolnou část přepisu bez
strukturované hranice položky. Její uložené pole `responseBody` v protokolu volání
je proto nahrazeno značkou vynechání; podrobný artefakt pipeline (který může
obsahovat těla komunikace s poskytovatelem či klientem a bloky streamu) se
neuchovává. Sémantické cache, cache idempotence a cache přehrávání odůvodnění
pro tento požadavek obcházejí čtení i zápisy. Požadavek poskytovateli a odpověď
viditelná klientovi zůstávají beze změny. Pokud je podrobný artefakt vynechán,
časné bajty keepalive se z dočasného bufferu odstraní. Upozornění Kiro na
poškozený EventStream hlásí pouze počet bajtů payloadu, nikdy jeho obsah ani
nezpracovanou chybu parseru JSON.
Netvrdí se tím, že byly auditovány všechny nesouvisející diagnostické výstupy
poskytovatelů či pluginů; širší kontrola míst s uchovávanými daty je sledována
v #11658.

Životní cyklus interního endpointu `/api/modality-bridge/video/drilldown` je
samostatný cacheovací subsystém ověřovaný přes loopback/token. Každá operace také
vyžaduje kanonické neprůhledné ID subjektu. Než bude produkční volající povolen,
musí toto ID odvodit z ověřeného tenanta a nikdy nesmí předat hodnotu zvolenou
klientem. Klíče cache vážou tento subjekt ke kanonickým ID relace a reference
videa, ukládají pouze jejich klíče odvozené pomocí SHA-256 a omezují čtení
i mazání na stejný subjekt. Cache ukládá nejvýše 16 odvozených snímků JPEG na
položku, po deseti minutách je nechá vypršet a podporuje omezená čtení pomocí
`start`/`end` nebo explicitní odstranění relace.

Každý subjekt je omezen na 16 položek a 64 MiB kanonických dat JPEG. Tyto limity
jsou nezávislé na globálním stropu 64 položek/256 MiB: tlak kvóty subjektu nejprve
odstraní pouze nejdéle nepoužívané položky daného subjektu a teprve poté se zvažuje
globální odstranění podle LRU. Při aktivitě cache jsou položky s vypršenou platností
odebrány z účtování subjektu i globálního účtování, zatímco zrušení a selhání
validace nepotvrdí částečnou náhradu.

Mezipaměť odmítá nekanonický Base64, nadměrný padding, média, která nejsou JPEG, poškozené nebo zkrácené JPEG soubory a JPEG soubory, které během omezeného dekódování celého obrázku pomocí `sharp` vygenerují varování. Každý přijatý obrázek znovu zakóduje jako kanonický JPEG, odvodí šířku a výšku z dekódovaných bajtů místo důvěřování polím volajícího a veškeré koncové polyglotní bajty zahodí, místo aby je zachovala. Do obou kvót se započítává pouze omezená kanonická komprimovaná vyrovnávací paměť. Limit JSON přenosu zahrnuje režii Base64 pro strop 32 MiB dekódovaného vstupu. Každá uložená derivace zaznamenává svůj validovaný formát/rozlišení JPEG, zásady vzorkování, verzi derivace, čas vytvoření, haš obsahu vypočtený serverem a hašovaný odkaz na rodiče spolu s hašem rodičovského obsahu důvěryhodného volajícího. Zrušení se kontroluje mezi asynchronními fázemi dekódování/hašování před atomickým zápisem do mezipaměti.

Tato dávka zatím k trase nepřipojuje produkčního producenta a neposkytuje výběr variant s více rozlišeními. Transparentní cesta požadavku Video Bridge proto nevyžaduje žádnou přidanou práci, zatímco odvození principálu vázaného na tenanta a plný životní cyklus více rozlišení FU-08 zůstávají explicitní navazující prací, nikoli dokumentovaným dokončeným chováním.

Snímky jsou popisovány sekvenčně nakonfigurovaným Video modelem. Prázdné přepsání Video dědí nastavení Vision; pokud jsou obě prázdná, auto-router Vision vybere efektivní model podporující vidění. Úspěšné popisky nahradí původní část stabilní předponou `[Video description:`, která text zároveň označuje jako nedůvěryhodné pozorování odvozené z médií a říká navazujícím modelům, aby neplnily instrukce nalezené v médiích. Klíče mezipaměti popisků snímků zahrnují bajty JPEG, prompt, časové razítko a efektivní model; do mezipaměti se ukládají pouze úspěšné popisky. Položky mezipaměti si ponechávají skutečný úspěšný produkční model, včetně záložního modelu; bridge hlásí `mixed`, když byly různé snímky vytvořeny různými modely. Zásah do mezipaměti znovu použije tuto identitu producenta, místo aby ji přeoznačil na požadovaný plán směrování. Mezipaměť výsledků celého videa je klíčována na každý vstup, který mění výstup — prompt, efektivní model, zásady vzorkování, počet snímků, režim sémantické analýzy, otisk SHA-256 normalizované nápovědy zaměření, okno zaměření, `transcript`, `audioTranscript` a příznak kontaktního listu — takže změna jakékoli z těchto dimenzí znamená minutí mezipaměti, nikdy zastaralé opětovné použití. Verze zásad vizuální deduplikace, práh a omezený počet kandidátních snímků jsou rovněž explicitně uvedeny v klíči a metadatech mezipaměti výsledků; změna zásad proto nemůže znovu použít zastaralý popis celého videa. Metadata mezipaměti výsledků v4 uchovávají režim a otisk, nikdy surový úkol uživatele. Metadata guardrailu hlásí požadovaný i efektivní režim analýzy; požadovaný režim `focused` bez použitelného uživatelského textu je hlášen jako efektivně `full`.

Guardrail extrahuje každou podporovanou video část, ale popisuje nejvýše `modalityBridgeVideoMaxVideos`. Pro cíl, u něhož je prokázáno `supportsVideo === false`, se neúspěšná a nadlimitní videa mění na explicitní bezpečné textové značky, takže žádné surové video nepřežije. Když je schopnost neznámá, tyto části si ponechávají svůj video nosič; případný záložní přepis se řídí výše popsanou omezenou konverzí textu. Cíle s `supportsVideo === true` bridge obcházejí. Signál přerušení požadavku klienta se šíří skrze stahování, frontu brokera, podprocesy a volání popisků; přerušení se zastaví mezi videi a nikdy nemůže selhat tak, že by propustilo surová média.

Nastavení runtime jsou uložena v databázi a validována pomocí Zod:

| Klíč                                | Výchozí     | Rozsah / chování                                                                                       |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Volitelný runtime, opt-in                                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachovává obecné popisky; `focused` používá omezený, nedůvěryhodný kontext posledního uživatele |
| `modalityBridgeVideoModel`          | `""`        | Zdědí model Vision Bridge                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` nebo proporcionální `segment_aware`; selhání detektoru se vrátí na `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Zděděné perzistentní hodnoty časového limitu videa nad 120 sekund jsou ořezány na deadline brokera; nové zápisy nastavení nad tento limit jsou odmítnuty. `GET /api/modality-bridge/video/runtime` vyžaduje před autentizací nebo sondováním runtime důvěryhodnou loopback lokalitu s razítkem a poté vyžaduje autentizaci správy. Vrací pouze `available`, sanitizované verze FFmpeg/ffprobe a pevně daný důvod, když je runtime nedostupný. Interní extrakční endpoint není veřejné upload API: nasycení fronty vrací `503` plus `Retry-After`, odpojení volajícího vrací `499` a pevný deadline brokera vrací `504`. Převedené odpovědi přidávají `video->text;model=<visionModel>;parts=<videos>` do centrální hlavičky `x-omniroute-modality-bridge`, aniž by odstraňovaly segmenty Vision nebo Audio.

### PII Masker (`piiMasker.ts`)

Běží na **obou** fázích.

- **`preCall`** naklonuje payload, projde `system`, `messages`, `input` a
  `prompt` (včetně prostých řetězcových položek) a na řetězcová pole
  `content`/`text` aplikuje `processPII()` (z
  `@/shared/utils/inputSanitizer`). Když je `PII_REDACTION_ENABLED=true`,
  jsou detekovaná PII v odchozím payloadu redigována. To je nezávislé na
  `INPUT_SANITIZER_MODE` (který řídí pouze politiku prompt injection). Když
  je redakce vypnutá, volání zaznamená počty detekcí bez přepisování obsahu.
- **`postCall`** hluboko naklonuje odpověď, spustí `sanitizePIIResponse()` plus
  maskovač tvaru Responses API (`maskResponsesOutput` — pokrývá
  `output_text` a `output[].content[].text`). Pokud dojde k jakékoli redakci,
  upravená odpověď nahradí původní.

Guardrail nikdy neblokuje; pouze anotuje (`meta.detections`,
`meta.redacted`) nebo přepisuje.

#### Výběr podle typu, vlastní vzory a čítače detekcí

**Dashboard → Nastavení → Zabezpečení → Maskování PII** volí, _co_ se maskuje.
Maskování to nezapíná: to stále řídí `PII_REDACTION_ENABLED` (požadavek) a
`PII_RESPONSE_SANITIZATION` (odpověď + SSE), obojí ve výchozím nastavení
vypnuto.

- **Výběr podle typu** — vestavěná ID jsou uvedena v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavená hodnota
  znamená všechny typy (chování z doby před existencí tohoto nastavení). Vzor
  `ssn_us` v enginu požadavků se mapuje na `ssn`. Šablony (Minimální,
  Standardní, Finanční, Brazilská, USA, Plná) pouze vyplňují zaškrtávací
  políčka v UI.
- **Vlastní vzory** — až 20 regex nebo wildcard vzorů (`*` = až 64 nebílých
  znaků, `?` = jeden). Shody se nahrazují za `[CUSTOM_REDACTED]`. Každý vzor
  prochází `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maximálně 500 znaků, flagy omezené
  na `g i m s u`, musí se zkompilovat, musí projít `safe-regex` (katastrofický
  backtracking) a nesmí odpovídat prázdnému řetězci ani zástupnému symbolu
  redakce. Vzor, který selže, je odmítnut při ukládání i při testování a
  uložený řádek, který selže, je za běhu přeskočen místo toho, aby se
  kompiloval. Vlastní vzory běží pouze při zapnutém maskování.
- **Čítače detekcí** — počty podle typu (nikdy odpovídající hodnoty), držené v
  paměti a resetované při restartu (`src/lib/pii/piiDetectionStats.ts`).
  Zvyšují se pouze při zapnutém maskování.

Nastavení jsou uložena v tabulce `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) a čtou se přes 1s cache. API:

| Metoda | Cesta                    | Účel                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav příznaků, `enabledTypes`, `customPatterns`, čítače detekcí      |
| `PUT`  | `/api/settings/pii`      | Nahradí `enabledTypes` (`null` = všechny) a/nebo `customPatterns`    |
| `POST` | `/api/settings/pii/test` | Zkušební běh jednoho vzoru proti vzorku o max. 8 KB; nic se neukládá |

Všechny tři vyžadují autentizaci pro správu a validují tělo požadavku pomocí
Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Detekuje adversariální struktury v obsahu dodaném uživatelem a vynucuje
nakonfigurovanou politiku. Chování je řízeno proměnnými prostředí a volbami
konstruktoru:

| Nastavení      | Proměnná prostředí                                                                                   | Výchozí | Efekt                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zapnuto        | `INPUT_SANITIZER_ENABLED`                                                                            | `true`  | Když `false`, guardrail se zkratuje.                                                                                                                                                       |
| Režim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`  | Politika injekcí: `block`, `warn` nebo `log`. (`redact` je přijímáno kvůli zpětné kompatibilitě, ale **neodstraňuje** injekční text; přepis PII v požadavku řídí `PII_REDACTION_ENABLED`.) |
| Práh blokování | volba `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimální závažnost vyžadovaná pro blokování. Při výchozím nastavení je medium pouze pozorovací.                                                                                           |

**Přednost režimu** (`getMode`): `options.mode` volajícího →
**přepis feature-flagu z DB** `INJECTION_GUARD_MODE` (Dashboard → Nastavení →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Přepis z dashboardu tedy vítězí nad env proměnnými, takže UI Feature
Flags ovládá běžící guard za provozu (bez restartu). Čtení z DB je fail-safe:
pokud selže, guard se vrátí k chování podle env, a když není nastaven žádný
přepis, je chování identické s řešením čistě podle env.

Zdroje detekce:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (sdílená sada
   detektorů používaná i jinde v pipeline).
2. Vestavěné `DEFAULT_GUARD_PATTERNS` (aktuálně `system_override_inline` a
   `markdown_system_block`, oba se závažností `high`).
3. Volitelné `customPatterns` předané přes volby konstruktoru (řetězce, regex
   nebo záznamy `{ name, pattern, severity }`).

Když `mode === "block"` **a** alespoň jedna detekce dosáhne prahové
hodnoty závažnosti, `preCall` vrátí `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimech `warn`/`log` guardrail událost
zaznamená, ale volání povolí. Sdílená pomocná funkce `evaluatePromptInjection()`
je také exportována pro volající, kteří potřebují vyhodnotit prompty, aniž by
procházeli registrem.

**Omezení skenování (v3.8.20):** detektor kontroluje pouze **prvních 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtů)
v `src/shared/utils/inputSanitizer.ts`. Jak `detectInjection()`, tak
`evaluatePromptInjection()` provádějí `slice(0, MAX_INJECTION_SCAN_BYTES)` před
spuštěním smyčky vzorů. Injekční direktivy se nacházejí poblíž začátku vstupu,
takže toto omezuje zátěž CPU/GC regexem u payloadů o velikosti několika stovek
KB, aniž by se oslabila detekce (viz #3932, #4041).

### Maskovač přihlašovacích údajů (`credentialMasker.ts`)

Běží v **obou** fázích, jako poslední ve výchozím řetězci (priorita `95`).
Maskuje známé vzory API klíčů / tajných tokenů z odchozího payloadu (obsah
zpráv, argumenty volání nástrojů, výsledky nástrojů) **a** z odpovědi
poskytovatele, takže přihlašovací údaj vložený do promptu (nebo vrácený
výsledkem nástroje) neunikne k upstream poskytovateli ani zpět klientovi.

- **Pouze opt-in**, stejná konvence jako maskování PII (příbuzné s Hard Rule
  #20): vypnuto, ledaže `settings.credentialRedactionEnabled === true` **nebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Při vypnutí je guardrail no-op — nikdy
  neblokuje a nikdy nic nepřepisuje.
- `redactCredentials()` prochází celý strom payloadu/odpovědi (`walkValue()`,
  bezpečný vůči prototype pollution, bezpečný vůči cyklům díky `WeakSet`)
  a nahrazuje shody zástupným symbolem `[REDACTED:<type>]`, přičemž klonuje
  pouze větve, které se skutečně změnily.
- `CREDENTIAL_PATTERNS` pokrývá klíče poskytovatelů LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platební klíče (Stripe, Square),
  cloudové klíče (AWS access key, Twilio, SendGrid, Mailgun), privátní klíče /
  JWT, připojovací řetězce obsahující přihlašovací údaje
  (`mongodb://user:pass@...`, atd.) a obecný vzor hodnoty hlavičky
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Klíče ve tvaru hlavičky
  (`authorization`, `x-api-key`, `api-key`, `apikey`) jsou maskovány
  strukturálně (pouze hodnota, prefix schématu jako `Bearer `/`Basic ` zůstává
  zachován), nikoli pomocí obecného textového regexu.
- Guardrail nikdy neblokuje; pouze přepisuje (`modifiedPayload` /
  `modifiedResponse`) a přidává anotace (`meta.credentialsRedacted`,
  `meta.count`).

Regresní pojistka: `tests/unit/credential-masker-guardrail.test.ts`.

## Základní kontrakt (`base.ts`)

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
  block?: boolean; // true zkratuje řetězec
  message?: string; // zobrazí se při blokování
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrací preCall pro přepsání požadavku
  modifiedResponse?: TValue; // vrací postCall pro přepsání odpovědi
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

Guardrail signalizuje „žádná změna" vrácením `void`, `{}` nebo
`{ block: false }`. Vrácení `modifiedPayload`/`modifiedResponse` nahradí
hodnotu procházející řetězcem pro následující guardraily.
`signal?: AbortSignal` přenáší životní cyklus volajícího do guardrailů. Přerušení požadavku (abort) je záměrnou výjimkou fail-open: mediální mosty zastaví práci a provedou úklid, aniž by vracely nezpracovaná média cíli, o němž je známo, že je nepodporuje.

## Registr (`registry.ts`)

Singleton `guardrailRegistry` poskytuje:

- `register(guardrail)` — přidá guardrail (nebo nahradí existující podle
  normalizovaného názvu) a znovu seřadí podle vzestupné `priority`.
- `clear()` / `list()` — administrativní pomocné metody.
- `runPreCallHooks(payload, context)` — iteruje aktivní guardraily, provléká
  payload přes `modifiedPayload` a zastaví se na prvním `block: true`.
- `runPostCallHooks(response, context)` — stejný průběh na straně odpovědi.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a volitelně
  znovu zaregistruje výchozí guardraily pro čistou izolaci testů.

Obě spouštěcí metody vracejí `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamů `GuardrailExecutionResult`, které obsahují pro
každý guardrail pole `blocked`, `skipped`, `modified`, `error` a `meta`,
což je užitečné pro trasování.

### Zakazování guardrailů pro jednotlivé požadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` sestavuje
deduplikovaný seznam názvů guardrailů, které mají být pro aktuální požadavek
přeskočeny. Existuje pět kanálů, čtených v tomto pořadí a sloučených do jednoho
seznamu (při deduplikaci vyhrává první výskyt):

1. `apiKeyInfo.disabledGuardrails`
2. Tělo požadavku `disabledGuardrails` (nejvyšší úroveň)
3. Tělo požadavku `metadata.disabledGuardrails` (pouze když je `metadata` objekt)
4. Hlavička `x-omniroute-disabled-guardrails`
5. Zastaralá hlavička `x-disabled-guardrails`

Všech pět kanálů se sloučí, včetně obou hlaviček: odeslání
`x-omniroute-disabled-guardrails` i `x-disabled-guardrails` současně přeskočí
sjednocení jejich seznamů a prázdná moderní hlavička již nezakrývá tu zastaralou
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), opraveno v
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Hodnoty mohou být pole řetězců nebo řetězec oddělený čárkami; názvy se oříznou
a normalizují na kebab-case malými písmeny (`pii_masker` → `pii-masker`) a
prázdné položky se zahodí. Výsledek se předává přes `context.disabledGuardrails`
do registru, který odpovídající guardraily přeskočí (`skipped: true` v `results`).

Seznam zakázaných ovlivňuje pouze **registr**. Režim `block` pro prompt injection
je povinnou hranicí: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) volá `evaluatePromptInjection()`
bez jakéhokoli seznamu zakázaných ovládaného volajícím (mrtvé volání
`resolveDisabledGuardrails({ body })`, které dříve prováděl, bylo odstraněno v
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), takže požadavek,
který zakazuje `prompt-injection`, je v režimu `block` stále zamítnut. To je
záměr. Kanály zakázání jsou ovládány volajícím (tělo požadavku, metadata,
hlavičky) a volající nesmí být schopen vypnout bezpečnostní kontrolu, kterou
nastavil operátor
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Sjednocení
hlaviček z [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
mění pouze to, které guardraily registru se přeskočí; neumožňuje klientovi
middleware obejít. Povinné politiky guardrailů na klíč a na skupinu jsou
sledovány v RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Viz [Pokrytí a limity](#coverage-and-limits).

## Pořadí provádění

Pro každý požadavek procházející přes `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts` (trasy rodiny chatu uvedené v části
[Pokrytí a omezení](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` sestaví seznam přeskočení z API klíče, těla
   požadavku a hlaviček.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí guardrails ve vzestupném
   pořadí priorit:
   - Zakázané guardrails se zaznamenají jako `skipped`.
   - `preCall` každého guardrailu může přepsat payload prostřednictvím `modifiedPayload`.
   - První `block: true` zkratuje řetězec a handler vrátí odpověď
     o zamítnutí guardrailem.
3. (Případně přepsaný) payload vstupuje do kombinovaného směrování (combo routing)
   a do odeslání upstream.
4. **Pouze nestreamované:** po sestavení odpovědi
   `guardrailRegistry.runPostCallHooks(...)` spustí stejný řetězec nad
   odpovědí. `block: true` zde zahodí upstream odpověď a vrátí HTTP 400. Streamované odpovědi tento krok zcela přeskakují.

Guardrails, které vyhodí výjimku, se zaznamenají s `error: <message>` a zalogují
pomocí `logger.warn`, ale řetězec pokračuje — záměrně je nastaveno chování
fail-open.

## Pokrytí a omezení

Registr guardrailů je zapojen pouze do chatové pipeline. Tato omezení jsou
ukotvena soubory `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` a
`tests/unit/guardrail-pipeline-characterization.test.ts`; při změně chování tyto
testy vědomě aktualizujte.

### Kde se hooky spouštějí

| Hook / kontrola                     | Spouští se pro                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Požadavky zpracovávané funkcí `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (a `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` a chatové proxy Telegramu. Také testovací endpoint dashboardu `/api/guardrails/test`. Pre-call blokace vrací HTTP 400. |
| `runPostCallHooks`                  | Pouze **nestreamované** chatové odpovědi (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamované odpovědi se k němu nikdy nedostanou.                                                                                                                                                                                                                                                                                  |
| PII při streamování                 | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), zapojený v `streamingPipeline.ts`, když je zapnuté `PII_RESPONSE_SANITIZATION`. Není to guardrail, takže kanály pro zakázání ho neovlivňují.                                                                                                                                                                                                                         |
| Middleware injection-guard (legacy) | Každá trasa `/v1` nesoucí prompt, včetně rodiny chatu (viz [pokrytí tras](#injection-guard-route-coverage--red-team-phase-8--block-d)). Pouze prompt injection.                                                                                                                                                                                                                                                                    |

### Co není pokryto

- **Trasy médií, embeddingů a dat** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) se nikdy nedostanou do registru.
  Neběží tam žádné maskování PII, maskování přihlašovacích údajů ani modality
  bridge. Jejich jedinou kontrolou je legacy middleware injection-guard.
- **Streamované odpovědi** nemají žádné post-call guardrails: žádný post-call
  `pii-masker` ani `credential-masker` a žádnou post-call blokaci. Použije se
  pouze streamovací PII transformace (když je zapnuté `PII_RESPONSE_SANITIZATION`).
  Přihlašovací údaj zopakovaný ve streamované odpovědi není redigován.
- **Kanály zakázání vs. middleware (záměrně):** middleware vyhodnocuje
  prompt injection vlastním voláním `evaluatePromptInjection()`, bez předání
  jakéhokoli seznamu zakázání ovládaného volajícím. Režim `block` je povinná
  hranice, kterou zakázání ovládaná volajícím nemohou obejít, včetně tras
  rodiny chatu
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Zakázání
  `prompt-injection` pouze přeskočí guardrail v registru.

### Co vidí odpověď před post-call

Na nestreamovací cestě je pořadí: extrakce paměti → spuštění vestavěných
nástrojů → post-call guardrails → výstup při post-call blokaci → uložení do
sémantické cache.

- **Extrakce paměti** a **spouštění nástrojů** vidí odpověď ještě předtím,
  než ji post-call guardrails mohou přepsat nebo zablokovat. Od
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) extrakce
  paměti pouští extrahovaný text přes `sanitizePII`, když je zapnutá
  `PII_RESPONSE_SANITIZATION` (jak při streamování, tak bez něj), ale
  odpověď, kterou post-call guardrail později zablokuje, už byla paměti a
  nástrojům nabídnuta.
- **Sémantická cache** ukládá odpověď až po post-call kontrole, takže ukládá
  přepsanou odpověď, a zablokovaná odpověď se nikdy necachuje. Položky cache
  jsou klíčovány podle API klíče.

## Konfigurace

Proměnné prostředí čtené vestavěnými ochrannými pojistkami:

| Proměnná                              | Používá                   | Účinek                                                                                                         |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Nastavením na `false` detekci zcela vypnete.                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Zásada pro injekce: `warn`, `block` nebo `log`. Zastaralá hodnota `redact` text injekce nepřepisuje.           |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim pojistky proti injekcím; zároveň příznak funkce v DB, který **přepisuje** proměnné prostředí (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimální závažnost, kterou `MODE=block` zamítá: `high` (výchozí), `medium` nebo `low`.                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastaralý alias pro `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Při hodnotě `true` jsou PII v požadavku redigována (nezávisle na režimu injekcí).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (navazující) | Řídí chování maskéru na straně odpovědi.                                                                       |

Ochranné pojistky Modality Bridge čtou konfiguraci za běhu z úložiště nastavení
podloženého databází (`getSettings()`), nikoli z proměnných prostředí. Primární
klíče modality Vision jsou
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Zastaralé klíče
`visionBridge*` jsou akceptovány pouze jako zdokumentovaná jednocyklová náhrada
při čtení; zápisy z dashboardu používají primární klíče. Výchozí hodnoty a
resolver náhradních klíčů se nacházejí v `src/shared/constants/modalityBridgeDefaults.ts`,
přičemž zastaralé konstanty zůstávají zachovány v
`src/shared/constants/visionBridgeDefaults.ts`.

Audio používá `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips`, a navíc sdílená
nastavení `modalityBridgeCache*`. Audio nemá náhradní čtení zastaralých klíčů,
protože tyto klíče byly zavedeny až se schématem Modality Bridge.

Video používá `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout`, a navíc sdílená nastavení `modalityBridgeCache*`.
Ve výchozím nastavení je vypnuté, protože FFmpeg/ffprobe jsou volitelné provozní
závislosti a popisování snímků přidává latenci a náklady na model.

## Vlastní guardraily

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

Postup:

1. Vytvořte `src/lib/guardrails/myGuardrail.ts` rozšiřující `BaseGuardrail`.
2. Implementujte `preCall` a/nebo `postCall`.
3. Proveďte registraci buď při importu (push z `registerDefaultGuardrails`), nebo
   zavolejte `guardrailRegistry.register(...)` za běhu — registr nahradí
   jakýkoli dřívější guardrail se stejným normalizovaným názvem.
4. Přidejte testy do `tests/unit/` (existující příklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testování

Mezi testy používejte `resetGuardrailsForTests()`, abyste vycházeli ze známého stavu.
Předejte `{ registerDefaults: false }`, abyste začali s prázdným registrem a
zaregistrovali pouze testované guardraily. Vision Bridge podporuje dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge nabízí
ekvivalentní záchytné body pro nastavení, schopnosti, výběr STT modelu, kontrolu
přihlašovacích údajů a přepis. Testy tak mohou prověřit oba toky bez přístupu
k databázi nebo síti.

## Viz také

- `src/lib/guardrails/` — implementace
- `src/shared/utils/inputSanitizer.ts` — sdílený detektor, který pohání
  detekci prompt injection a maskování PII
- `src/shared/constants/visionBridgeDefaults.ts` — výchozí hodnoty Vision Bridge a
  seznam modelů s vynuceným bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — sdílené výchozí runtime hodnoty pro Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonální vrstva (circuit breaker, cooldowny)
- `docs/reference/ENVIRONMENT.md` — úplný přehled proměnných prostředí

## Pokrytí tras injection-guardem a red-team (Fáze 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokrývá všechny trasy,
které přijímají uživatelské prompty. Respektuje `INJECTION_GUARD_MODE` (výchozí `warn` = pouze loguje;
`block` = vrací HTTP 400 `SECURITY_001`).

| Typ               | Trasy                                                                                                                                                | Výchozí režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (existující) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativní       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Extrakce textu (`extractMessageContents`) pokrývá `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noční, `nightly-llm-security.yml`):** promptfoo ověřuje, že každá trasa blokuje
OWASP-LLM korpus v režimu `INJECTION_GUARD_MODE=block`; garak spouští sondy (bez secretu se přeskočí).
`moderations` je zahrnuto pro konzistenci. Režim block je povinná hranice: `evaluatePromptInjection()`
ignoruje seznam zakázaných položek pro jednotlivé požadavky, který mu middleware předává, takže
`disabledGuardrails` trasu z něj **nevyjímá** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Noční workflow (`.github/workflows/nightly-llm-security.yml`, cron + manuální
spuštění) má dva joby:

- **`promptfoo-guard` (blokující)** — spouští `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý adversariální případ (např. „ignoruj všechny
  předchozí instrukce…", jailbreaky ve stylu DAN) ověřuje, že odpověď obsahuje
  `error.code === "SECURITY_001"`, tj. že guard skutečně požadavek zamítl.
- **`garak` (poradní)** — spouští garak `--probes promptinject,dan,leakreplay`
  proti lokální instanci OmniRoute (`http://localhost:20128/v1`). Je podmíněn
  provider secretem (`PROMPTFOO_PROVIDER_KEY`); bez něj se hladce přeskočí a je
  zakončen `|| true`, takže reportuje bez selhání CI.

Pokrytí pomocné funkce guardu (`createInjectionGuard` / `withInjectionGuard`)
zahrnuje každou trasu `/v1` nesoucí prompt; text promptu získává
z `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` funkce
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
