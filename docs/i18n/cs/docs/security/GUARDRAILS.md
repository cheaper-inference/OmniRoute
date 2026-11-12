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

Zachytí části videa nejvyšší úrovně v Dokončení chatu `messages` a Odpovědi API `input` před voláním cíle bez známé podpory nativního videa. Podporované tvary jsou `input_video`, `video_url`, `video_source`, HTTPS URLs a `data:video/*;base64,...` data URIs. Prosté názvy souborů v textu nejsou považovány za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vlastní procházení požadavků, kontrolu capability/policy, agregaci podle požadavků a užitečné zatížení odpovědi. Akvizice — pro práci s videem, mezipaměť celého výsledku, popisující sekvenci snímků (která spojuje jakýkoli zvukový přepis deklarovaný volajícím) a metrics/abort/cleanup — na každý pokus se skrývá za `processVideoPart` v `videoBridgePipeline.ts`, volá se jednou za video část uvnitř smyčky `preCall`. Tento modul také definuje explicitní hranice portu `VideoMediaBrokerPort` (získávání bajtů a extrahování vzorkovaných snímků), `VideoAudioTranscriptionPort` (sloučení zvukového přepisu deklarovaného volajícím se vzorkovanými titulky) a `VideoDrilldownPort` (starší tvar raw-store). Produkční STT a retence rámce jsou složeny kolem popisujícího portu přes `createVideoSttAdapter` a `createVideoDrilldownAdapter`; druhý používá sdílený životní cyklus neprůhledné rukojeti.

The public `/v1` request path never imports or invokes a subprocess. Remote videos are downloaded under a 50 MiB bound; inline base64 videos have a conservative 36 MiB decoded per-video cap so the model/messages/framing envelope can remain inside the public JSON request admission limit of 50 MiB. Inline length and decoded-size estimates are checked before allocation. HTTPS is required on the initial remote URL and every redirect, using the existing public-only outbound guard with DNS pinning. The bytes then cross the exact internal `POST /api/modality-bridge/video/extract` broker boundary. That route is both `LOCAL_ONLY` and `SPAWN_CAPABLE`, accepts only a per-process authenticated, trusted-loopback request, and never accepts a URL, filesystem path, executable, or argument list. The API body-size pipeline and the handler's incremental body reader independently enforce a 50 MiB broker input cap. Its bounded queue runs one extraction at a time, allows four pending jobs, and caps pending input at 100 MiB.

Uvnitř brokera čte `ffprobe` soukromý lokální soubor; pevný formát povolených formátů nezahrnuje formáty playlistů a manifestů. U povolených kontejnerů rodiny MOV zůstávají externí datové odkazy MOV ve výchozím nastavení zakázány a příkaz Fix se k nim nepřihlásí. `ffprobe` i `ffmpeg` používají whitelist protokolu `file` -only, jedno vlákno, pevná pole argumentů, žádný shell a spustitelné soubory vyřešené z `PATH`. Obálky s přiloženými obrázky nejsou kandidáty na přehrávání. Všechny přehrávatelné streamy musí splňovat limity a před deterministickou rezervou s nejnižším indexem je preferován explicitní výchozí stream. Videa jsou omezena na 600 sekund, 8 192 pixelů na rozměr a 33 554 432 zdrojových pixelů. FFmpeg vzorkuje 1–16 snímků středního bodu JPEG, zmenší delší okraj na maximálně 1 024 pixelů bez převzorkování menších vstupů a nikdy nepřijme URL. Vzorkování je standardně `uniform`. Volitelné zásady `scene_aware` a experimental `segment_aware` provádějí jeden další pevný přechod FFmpeg přes již ověřený místní tok, vybírají ohraničená časová razítka scény `showinfo` a deterministicky se vrací ke stejným jednotným středním bodům při selhání detektoru, vypršení časového limitu, chybném výstupu nebo prázdné sadě kandidátů. Režim s ohledem na segmenty přiděluje vzorky středních bodů úměrně ověřeným intervalům scén; důkazy s ohledem na segmenty a nouzové chování jsou podrobně popsány níže. Pevné 16-snímkové omezení se použije po výběru v každé politice. Když má požadavek s ohledem na scénu rozpočet pouze na jeden snímek, použije jednotný střed aktivního okna plného videa nebo zaostření a hlásí `policyEffective: uniform`: jeden vybraný snímek scény nemůže zachovat oba časové konce. Volající může volitelně poskytnout okno s konečným zaměřením (`start`/`end` sekund); hranice jsou uchyceny k trvání média, obrácená nebo neomezená okna jsou odmítnuta a všechny zásady vzorkování se provádějí pouze v rámci normalizovaného intervalu. Výsledné okno je zahrnuto do vzorkovacích metadat a do předpony nedůvěryhodného popisu, takže následné modely mohou rozlišit zaměřený úryvek od úplné časové osy.

Zaměření sémantického titulku je samostatné, explicitní nastavení. Výchozí režim analýzy `full` zachovává stávající výzvu rámce a nikdy nepředává text požadavku do modelu titulků. V režimu `focused` most čte pouze nejnovější neprázdné uživatelem vytvořené `text`/`input_text` ze stejného kontejneru chatu nebo odpovědí, normalizuje je na NFC, sbalí řídicí znaky a mezery a omezí je na 500 bodů kódu Unicode. Prázdný výsledek se vrátí k přesné výzvě `full`. Použitelná nápověda je serializována jako JSON ve vyhrazeném bloku nedůvěryhodného uživatelského kontextu a může upřednostňovat pouze pozorovatelné detaily; nemůže přepsat samostatné varování před následováním pokynů, které je viditelné nebo slyšitelné v médiích. Textové zaměření nikdy neodvozuje `start`/`end` ani nemění časový sampler.

#### důkaz strukturálního segmentu FU-07

`segment_aware` používá jeden omezený předanalýzový průchod přes již ověřený místní video stream. Pevný řetězec filtrů se nejprve nastaví na šířku maximálně 320 pixelů, detekuje změny scény a zmrazené intervaly, poté vzorkuje rychlostí 1 snímek za sekundu pro informace o rozmazání, průměrném jasu a spatial/temporal. Průchod je omezen na 600 strukturálních vzorků, jedno vlákno FFmpeg/filter, stejný protokol `file` -only a seznamy povolených kontejnerů, 1 MiB vázaný proces-výstup a maximálně 30 sekund uvnitř sdíleného abort/deadline. brokera Nikdy nepřijme příkaz, filtr, cestu nebo URL z požadavku.

Strukturální hodnoty jsou deterministickým vzorkovacím důkazem, nikoli sémantickým pochopením videa. Neodvozují předměty, akce, titulky, řeč nebo záměr uživatele. Hranice scény a zmrazení tvoří segmenty; zmrazení pokrytí, rozostření, expozice, prostorové detaily a časové změny ovlivňují pouze to, jak je alokován stávající rozpočet 1–16 snímků. Plně zmrazený segment je omezen na jeden snímek, zatímco nezmrazené segmenty soutěží o zbývající rozpočet. Když hranice převyšují počet snímků, je zachováno jednotné pokrytí časové osy, takže rychlé rané střihy nemohou zakrýt dlouhý koncový segment. Hranice scény v rámci 1sekundového rozlišení analýzy hranice zmrazení se spojí.

Chybějící filtry, důkazy malformed/empty, chyba detektoru nebo omezený časový limit před analýzou selžou a otevřou přesně jednotnou politiku středního bodu. Termín přerušení volajícího nebo zprostředkovatele se nezdaří při otevření: ukončí to dílčí proces za letu, zabrání pozdější extrakci rámce a soukromý dočasný strom je odstraněn v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministická skutečná FFmpeg zařízení pro post-dedup úsporu titulků, přidělování rozpočtu s hustým pohybem, důkazy blur/exposure/SI-TI, rychlé škrty s dlouhým koncem a postupné vyblednutí falešných poplachů. Zaznamenává čas stěny před analýzou a tam, kde je k dispozici `/usr/bin/time`, podřízený CPU a vrchol RSS. Jeho kontroly kvality jsou pouze strukturální věštce. Skutečná kvalita titulkového modelu zůstává `HOLD`, protože tento svazek nemá žádný autorizovaný koncový bod nebo zmrazený soudce. Peněžní úspory také zůstávají `HOLD`, pokud `--caption-cost-per-call-usd` neposkytne explicitní kladný odhad na volání; skript nikdy nevymyslí ani jeden výsledek.

Každý snímek je omezen na 4 MiB, všechny nezpracované snímky dohromady na 23 MiB a odezva serializovaného brokera na 32 MiB. V `finally` je odstraněn soukromý dočasný adresář. OmniRoute nesbalí FFmpeg a nepřijímá vlastní cestu ke spustitelnému souboru. Před titulkováním můstek aplikuje konzervativní vizuální deduplikační průchod: každý JPEG je redukován na 16 × 16 vyrovnávací paměť ve stupních šedi a je porovnáván pouze s posledním zachovaným snímkem. Pro požadovaný rozpočet titulků nad jeden snímek poskytuje extrakce omezený fond kandidátů až do dvojnásobku rozpočtu a nikdy více než 16 snímků. Požadovaný strop se uplatní až po deduplikaci, přičemž první a poslední vybraní kandidáti budou zachováni při konečném ztenčení, kdy je rozpočet alespoň dva. Verzovaná zásada `grayscale-16x16-mean-cells-v2` používá větší ze středních delta luma a poměr buněk miniatur, jejichž normalizovaná delta je alespoň 0,05. Prahová hodnota duplikace je konstanta 0,04, zvolená pro předvídatelnost spíše než vystavená jako nastavení za běhu. Tento sekundární signál s vysokým kontrastem zachovává malý pohyb a změny viditelného textu, které může skrýt pouze průměrné srovnání. Chyby komparátoru nebo dekodéru se nedaří otevřít a udržet pokrytí. Výstupní metadata oddělují extrahované kandidáty, úspěšně použité snímky a vyřazené vizuální duplikáty.

Explicitně označená část videa může vyžadovat kontaktní list s časovým razítkem. Most staví nanejvýš 4sloupovou, 16snímkovou mřížku JPEG. Každá 512pixelová buňka vypálí své zdrojové časové razítko do vysoce kontrastního spodního pásma, zatímco stejná časová razítka zůstanou v textových metadatech pro následnou asociaci a audit. Kompletní JPEG zůstává omezeno na 32 MiB. Pokud `sharp` nemůže dekódovat nebo sestavit mřížku, most se vrátí zpět k jednotlivým snímkům JPEG ; klientské přerušení se stále šíří operací listu.

Důkazy o propagaci jsou záměrně odděleny od mikrobenchmarku syntetického složení. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje A/B svazek s verzí schématu pro skutečné modely vidění kompatibilní s OpenAI. Měří tokeny hlášené poskytovatelem, latenci end-to-end stěny (včetně složení listu), počet volání modelu a retenci definovaných faktů. Nezpracované odpovědi modelu se nezapisují do zprávy; jsou zachovány pouze SHA-256 výtahy a odpovídající fakta IDs. Kabelový svazek neuskuteční žádné volání sítě nebo placeného modelu, pokud není předáno `--execute-real` a nejsou nakonfigurovány `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez tohoto explicitního skutečného běhu zůstává jeho strojově čitelný verdikt `HOLD`; syntetická měření payload/call-count sama o sobě nejsou důkazem povýšení.

Volající mohou připojit volitelné pole `transcript.cues` k podporované video části, pokud již mají zarovnaný text. Každé cue musí nést `text`, konečný interval `start`/`end` uvnitř zkoumané doby trvání a `source` na bílé listině (`client`, `embedded` nebo `audio-bridge`); `confidence` je výchozí `1` a musí zůstat mezi `0` a `1`. Přesné duplicitní podněty jsou sbaleny. OmniRoute nikdy nezahájí přepis z těchto metadat: ověřené podněty jsou zkopírovány do popsaného výsledku se zdrojem, spolehlivostí a intervalem a jsou vykresleny jako nedůvěryhodná pozorování spolu s titulky snímků. Neplatný text, text mimo rozsah nebo text bez provenience je zamítnut, nikoli přimíchán do proudu titulků. Oba kanály přepisu těla požadavku normalizují dodanou provenienci na `client`, včetně samostatně prosazovaných štítků `embedded` nebo `audio-bridge`. Pouze adaptér vlastněný serverem může přiřadit tyto důvěryhodné štítky prostřednictvím argumentu `trustedSource` pouze pro kód; pole požadavku JSON nemůže dosáhnout tohoto argumentu. Text přepisu zůstává nedůvěryhodným obsahem odvozeným z médií bez ohledu na jeho původ a nikdy nesmí určovat autorizaci.

Pokročilý volající může poskytnout stopu `audioTranscript` pro stejné video; je považován za text poskytnutý klientem, nikoli za důkaz přepisu serveru. Fúzní šev provádí vizuální a zvuková pozorování v rámci jednoho termínu a přeruší signál, objedná je na společné časové ose, sbalí přesné duplikáty a ohlásí částečný výsledek, když uspěje pouze jedna strana. Neplatné `audioTranscript` degraduje na tento částečný výsledek — vizuální popis je zachován a audio větev zaznamená dezinfikovaný chybový kód — namísto selhání celého videa. Dostupnost na pobočku, částečný příznak a dezinfikované chybové kódy jsou zachovány v popsaném výsledku, v metadatech ochranného zábradlí (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), v metadatech mezipaměti výsledků a v čítačích přemostění. Výchozí cesta Video Bridge nevyvolává převod řeči na text ani nestahuje druhou kopii média; bez této explicitní stopy zůstane pouze video.

**Uchování přepisu (#12150 P1).** To platí automaticky vždy, když Video Bridge (samotný opt-in) vykreslí přepisový signál — neexistuje žádný samostatný příznak zachování. Když požadavek vykreslí jakékoli přepisovací vodítko (volajícím deklarované `transcript` nebo sloučené `audioTranscript`), zábradlí jej označí `videoBridgeObserved` a vytvoří redigovaný stín popisu videa — identické vykreslení, ve kterém je tělo volného textu každého cue nahrazeno `[redacted-video-transcript]`, vytvořeným nahrazením pole strukturovaného cue před sestavením nesloučeného obsahu zkompletovaného — nepřátelské nebo obyčejné, včetně těl obsahujících `]`, jako je `[inaudible]`/`[music]` — mohou přežít). Tělo požadavku trvalého protokolu hovorů zamění každou textovou část odvozenou z videa za tento redigovaný stín, který odpovídá rovnosti obsahu; kotva `fullText` je znovu načtena z hotového užitečného zatížení zábradlí před voláním, takže shoda je stále úspěšná poté, co později zábradlí řetězu ( PII a maskování pověření, priority 10/95) přepíší text popisu na místo a poté, co system-prompt/handoff/memory injection přetvoří pole zpráv. Tělo odeslané proti proudu k modelu je nezměněno. Pozorovaný požadavek také nezaplňuje žádnou trvalou paměť (extrakce odvozená z požadavku i z odpovědi jsou přeskočeny), takže vlastní odpověď modelu nemůže opakovat text přepisu do paměti.

**Nezpracovaná pole videa (#12430).** Když je most povolen a podpora nativního videa je neznámá nebo chybí, definovaná pole `transcript`/`audioTranscript` také aktivují `videoBridgeObserved`, a to i po selhání popisu nebo omezení `maxVideos`. počet `null` a prázdných řetězců; chybějící pole a metadata bez videa ne. Uchované kopie redigují tato pole nebo vynechají požadavek a caches/Memory se vynechají.

Na těchto nouzových cestách se platná volání volajícího stávají podporovanými částmi `text`/`input_text` spíše než nestandardními poli poskytovatelů. Obě stopy poskytnuté žádostí zůstávají nedůvěryhodnými pozorováními `client` s výslovným varováním, že video nebylo popsáno a časová razítka nebyla ověřena vůči médiím. Stávající celkové rozpočty 256-cue/64-KiB a rozpočty na tágo platí pro obě stopy společně; časová razítka musí odpovídat 600sekundovému stropu makléře a jakémukoli dodanému zaostřovacímu oknu. Neplatné stopy jsou zahozeny, nejsou předávány jako libovolný text; platný sourozenec může být stále použit, pokud není překročen jejich kombinovaný rozpočet. Null/empty pole nepřidávají žádný text. Tato záložní reklama nepřidává žádné načítání ani přepis médií. Pole rozšíření přepisu jsou odstraněna ze záložního nosiče videa a jeho objektů `video_url`/`source`. Seznam povolených vodičů OpenAI zůstává striktní; Neznámé nativní video nosiče zůstávají dostupné a známé cíle pouze s textem udržují bezpečné značky. Strukturované stíny redakce chrání připojený text přepisu, zatímco původní požadavek vlastněný volajícím zůstává nezměněn. Nativně podporované cíle a deaktivované mosty si zachovávají své stávající chování při přemostění.

Další uchovávané kopie používají stejný signál pozorovaného požadavku. Nezpracovaný snímek klientského požadavku před ochranným zábradlím, nevyřízený požadavek v paměti a protokol včasného zamítnutého požadavku strukturálně nahrazují pole přepisu ve video částech; Řetězcové výzvy syntetizované fázemi potrubí a kontextovým předáním jsou redigovány v jímce těla trvalého požadavku. Trvalá značka `video_content_removed` způsobí, že pokračování `previous_response_id` se nezdaří, spíše než rekonstruuje text, který byl úmyslně zahozen. Pokud pozorovaný požadavek ztratí před protokolováním svůj stín redakce pro jednotlivé části nebo dokonce jeden z několika stínů videa po pozdějších mutacích požadavku neodpovídá, zadržené tělo požadavku je zcela vynecháno namísto zachování částečně redigovaného přepisu.

U pozorovaného požadavku může modelová odpověď citovat jakoukoli část přepisu bez hranice strukturovaného podnětu. Jeho trvalý záznam volání `responseBody` je proto nahrazen značkou vynechání; detailní artefakt potrubí (který může zahrnovat těla upstream/client a kousky proudu) není zachován. Sémantické, idempotence a uvažování-replay cache obcházejí čtení a zápisy pro tento požadavek. Požadavek poskytovatele a odpověď viditelná klientovi zůstávají nezměněny. Po vynechání podrobného artefaktu jsou z dočasné vyrovnávací paměti vypuštěny bajty předčasného udržování naživu. Chybné varování EventStream Kiro hlásí pouze počet bajtů užitečného zatížení, nikdy jeho obsah nebo nezpracovanou chybu analyzátoru JSON. To netvrdí, že každá nesouvisející diagnostika provider/plugin byla auditována; širší rozmítání zadrženého umyvadla je sledováno v #11658.

Interní životní cyklus `/api/modality-bridge/video/drilldown` je samostatný substrát mezipaměti loopback/token-authenticated. Každá operace také vyžaduje kanonickou neprůhlednou hlavní ID. Než je produkční volající povolen, musí toto ID odvodit od ověřeného tenanta a nikdy nesmí přeposílat klientem vybranou hodnotu. Klíče mezipaměti vážou tento principál s kanonickou relací a videoreferencí IDs, ukládají pouze jejich klíče SHA-256-derived a mají rozsah čtení i mazání na stejný objekt. Mezipaměť ukládá maximálně 16 odvozených snímků JPEG na záznam, jejich platnost vyprší po deseti minutách a podporuje omezené čtení `start`/`end` nebo explicitní mazání relace.

Každý principál je omezen na 16 záznamů a 64 MiB kanonických dat JPEG. Tyto limity jsou nezávislé na globálním stropu 64-entry/256 MiB : tlak na hlavní kvótu vystěhuje pouze položky, které byly v poslední době nejméně používané, než se uvažuje o globálním vystěhování LRU. Položky s prošlou platností jsou odstraněny z hlavního i globálního účtování aktivity mezipaměti, zatímco zrušení a selhání ověření nezpůsobí částečnou náhradu.

Mezipaměť odmítá nekanonický Base64, nadměrnou výplň, média bez JPEG, poškozené nebo zkrácené JPEGs a JPEGs, které vytvářejí varování během dekódování ohraničeného plného obrazu `sharp`. Znovu zakóduje každý přijatý obrázek jako kanonický JPEG, odvozuje šířku a výšku z dekódovaných bajtů namísto důvěryhodných polí volajících a všechny koncové polyglot bajty raději zahodí, než aby je ponechal. Do obou kvót se účtuje pouze omezená kanonická komprimovaná vyrovnávací paměť. Limit drátu JSON zahrnuje režii Base64 pro strop dekódovaného vstupu 32 MiB. Každá uložená derivace zaznamenává svůj ověřený JPEG format/resolution, zásady vzorkování, verzi odvození, čas vytvoření, serverem vypočítaný obsah hash a hashovanou rodičovskou referenci plus hodnotu hash nadřazeného obsahu důvěryhodného volajícího. Zrušení se kontroluje mezi asynchronními fázemi decode/hash před potvrzením atomické mezipaměti.

Produkční producent znovu používá již odvozené zprostředkovatelské snímky pouze po úspěšné vizuální analýze, bez druhého videa download/extraction. Vyžaduje operátor `modalityBridgeVideoDrilldownEnabled=true`, striktní `drilldown: true` pro jednotlivé části a ověřený záznam API klíče ID. Klientem deklarované hodnoty principal/session nikdy nezakládají vlastnictví. Bez všech tří podmínek nehašuje, nemění velikost ani neuchovává další snímky. Selhání retence zachovává použitelnou vizuální odezvu. Souhlasné požadavky obcházejí mezipaměť výsledků celého videa, takže výsledky uložené v mezipaměti se nikdy nepřehrají.

Úspěšné odpovědi JSON a SSE odkryjí maximálně čtyři neprůhledné úchyty v ohraničeném záhlaví `x-omniroute-video-drilldown`. Autorizovaný původ prohlížeče může číst tuto hlavičku bez rozšíření zásady původu CORS. Nové úchyty používají `v1.<32-byte random base64url token>` a registr uchovává pouze jejich hash SHA-256. Analyzátor reader/header také přijímá starší 64hex tokeny. Autentizovaným veřejným spotřebitelem je `GET /api/v1/video-bridge/drilldown?handle=...`, nezávisle řízený `modalityBridgeVideoDrilldownRemoteEnabled=true`. Explicitní trvalá false zruší přístup, i když je povolena starší verze `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env. Uchování produkce má analogický záložní systém `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Obě záložní verze jsou ve výchozím nastavení vypnuty.

Zákazník odvozuje vlastnictví z ověřeného klíče a aplikuje zásady klíče: GET i DELETE patří do kategorie koncových bodů `video`, včetně aliasů `/v1` a `/api/v1`. Klíče s neprázdným seznamem povolených koncových bodů musí obsahovat `video`; neomezené klíče zůstávají kompatibilní. Spotřebitel vrátí stejnou 404 pro neznámé, prošlé a jiné klíče. Přijímá `variant=preview|standard|detail` (maximální rozměr JPEG 320/640/1280, nikdy se neupscaluje), `limit=1..8` (nebo starší alias `frames`, nikdy obojí), `page` s nulou a volitelné zaostřovací sekundy `start`/`end`. Duplicitní klávesy dotazu a okna obráceného fokusu jsou odmítnuty. Každá vrácená varianta má hash svého skutečného obsahu a skutečných metadat rozlišení propojená s uchovaným zdrojem. Varianty jsou odvozeny při čtení spíše než uloženy jako další uchovávané kopie. Odezva JSON, včetně Base64/envelope, je omezena na 32 MiB; příliš velká stránka vrátí 413 a klient musí požadovat méně snímků. Přečte zrušení kontroly kolem každé změny velikosti a znovu zkontroluje platnost úchytu před návratem. `DELETE` vlastníkem je idempotentní; odstranění nebo vypršení platnosti TTL uvolní zadržený zdroj a účtování využití.

Sdílené úložiště je procesní: platnost úchytů vyprší při restartu a nelze je přenášet mezi nezávislými procesy OmniRoute. Statistiky správy odhalují efektivní politiku uchovávání / vzdáleného přístupu a agregují pouze uchované entries/bytes, nikdy média, reference, hlavní IDs nebo úchyty. Panel Nastavení videa zobrazuje tyto hodnoty a může zachovat oba přepínače souhlasu. Tato implementační dokumentace není důkazem o reálném nasazení nebo propagaci; akceptace skutečného modelu se sleduje samostatně.

Snímky jsou titulkovány postupně podle nakonfigurovaného modelu videa. Prázdné přepsání videa zdědí nastavení Vision; pokud jsou oba prázdné, automatický směrovač Vision vybere efektivní model schopný vidění. Úspěšné titulky nahrazují původní část stabilní předponou `[Video description:`, která také označí text jako nedůvěryhodné pozorování odvozené z médií a řekne následným modelům, aby se neřídily pokyny nalezenými v médiích. Klíče mezipaměti pro titulky snímků zahrnují bajty JPEG, výzvu, časové razítko a efektivní model; do mezipaměti se ukládají pouze úspěšné titulky. Záznamy mezipaměti zachovávají skutečný úspěšný model producenta, včetně záložního modelu; most hlásí `mixed` když byly vyrobeny různé rámy různými modely. Přístup do mezipaměti znovu použije tuto identitu producenta místo toho, aby ji znovu označil jako požadovaný plán směrování. Mezipaměť výsledků celého videa je klíčována na každém vstupu, který mění výstupní výzvu —, efektivní model, politiku vzorkování, počet snímků, režim sémantické analýzy, otisk SHA-256 normalizovaného tipu zaměření, okno zaměření, `transcript`, `audioTranscript` a příznak kontaktního listu —, takže změna kterékoli z těchto dimenzí znamená vynechání mezipaměti, nikdy zatuchlé opětovné použití. Verze zásady vizuálního odstranění duplicitních dat, práh a počet omezených kandidátských snímků jsou také explicitní v klíči a metadatech mezipaměti výsledků; změna zásad proto nemůže znovu použít zastaralý popis celého videa. Metadata Result-cache v4 uchovávají režim a otisk prstu, nikdy nezpracovanou uživatelskou úlohu. Metadata zábradlí hlásí požadovaný i efektivní režim analýzy; požadovaný režim `focused` bez použitelného uživatelského textu je hlášen jako efektivně `full`.

Zábradlí extrahuje každou podporovanou část videa, ale nepopisuje více než `modalityBridgeVideoMaxVideos`. U cíle, u kterého bylo prokázáno, že má `supportsVideo === false`, se neúspěšná a překročená videa stanou explicitními bezpečnými textovými značkami, takže žádné nezpracované video nepřežije. Není-li funkce známa, tyto části si ponechávají svůj video nosič; jakýkoli záložní přepis následuje převod ohraničeného textu výše. Cíle se `supportsVideo === true` obcházejí most. Signál přerušení požadavku klienta se šíří prostřednictvím stahování, fronty zprostředkovatele, podprocesů a volání titulků; přeruší zastavení mezi videi a nikdy nezklame otevření pro nezpracovaná média.

Nastavení runtime jsou zálohována DB a ověřena Zod:

| Klíč                                | Výchozí     | Rozsah / chování                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Volitelné runtime, opt-in                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachovává obecné titulky; `focused` používá omezený, nedůvěryhodný kontext nejnovějšího uživatele |
| `modalityBridgeVideoModel`          | `""`        | Zdědit model Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` nebo proporcionální `segment_aware`; porucha detektoru klesne zpět na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Legacy persistence Hodnoty časového limitu videa nad 120 sekund jsou upnuty do termínu zprostředkovatele; nové nastavení zápisy nad tento limit jsou odmítnuty. `GET /api/modality-bridge/video/runtime` vyžaduje před autentizací nebo běhovým testováním důvěryhodnou označenou lokalitu zpětné smyčky, poté vyžaduje ověření pro správu. Vrací pouze `available`, vyčištěné verze FFmpeg/ffprobe a pevný důvod, proč není runtime k dispozici. Koncový bod interní extrakce není veřejným uploadem API: saturace fronty vrátí `503` plus `Retry-After`, odpojení volajícího vrátí `499` a pevný termín zprostředkovatele vrátí `504`. Převedené odezvy přidávají `video->text;model=<visionModel>;parts=<videos>` do centrální hlavičky `x-omniroute-modality-bridge` bez odstranění segmentů Vision nebo Audio.

### PII Masker (`piiMasker.ts`)

Běží dál **obě** etapy.

- **`preCall`** klonuje užitečné zatížení, prochází `system`, `messages`, `input` a `prompt` (včetně položek prostého řetězce) a aplikuje `processPII()` (z `@/shared/utils/inputSanitizer`) na pole `content`/`text` řetězce. Když `PII_REDACTION_ENABLED=true`, detekovaný PII je redigován v odchozím užitečném zatížení. Toto je nezávislé na `INPUT_SANITIZER_MODE` (který řídí pouze politiku rychlého vkládání). Když je redakce vypnutá, hovor zaznamenává počty detekcí bez přepisování obsahu.
- **`postCall`** hluboce klonuje odpověď, spustí `sanitizePIIResponse()` plus maskovač tvaru Responses-API (`maskResponsesOutput` — pokrývá `output_text` a `output[].content[].text`). Pokud dojde k jakékoli úpravě, upravená odpověď nahradí původní.

Zábradlí nikdy neblokuje; pouze anotuje (`meta.detections`, `meta.redacted`) nebo přepisuje.

#### Výběr podle typu, vlastní vzory a počítadla detekce

**Dashboard Nastavení → → Zabezpečení → PII maskování** vybere _co_ je maskováno. Nezapne maskování: to je stále `PII_REDACTION_ENABLED` (požadavek) a `PII_RESPONSE_SANITIZATION` (odpověď + SSE), oba jsou standardně vypnuty.

- **Výběr podle typu** — vestavěná ID jsou uvedena v `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastaveno znamená každý typ (chování před tímto nastavením). Vzor `ssn_us` enginu požadavku se mapuje na `ssn`. Šablony (minimální, standardní, finanční, brazilské, USA, GDPR, POPIA, plné) vyplňte pouze zaškrtávací políčka v UI.
- **Identifikátory GDPR a POPIA** — dvanáct vestavěných ID pokrývajících EU a jihoafrické osobní identifikátory (tabulka níže). Jejich regulární výrazy, validátory a značky jurisdikce žijí v jedné tabulce, `src/shared/utils/piiPatterns.ts`, kterou spotřebovává jak dezinfekční prostředek odpovědi (`src/lib/piiSanitizer.ts`), tak maskovač požadavku (`src/shared/utils/inputSanitizer.ts`). Shoda je redigována pouze tehdy, když ji její validátor přijme; holých čísel není nikdy dost. Operátor, který uložil zúžený výběr předtím, než tato ID existovala, zachová chování, které měl, dokud nejsou zaškrtnuta nová ID.
- **Vlastní vzory** — až 20 vzorů regulárních výrazů nebo zástupných znaků (`*` = až 64 znaků bez mezer, `?` = jeden). Zápasy se stávají `[CUSTOM_REDACTED]`. Každý vzor prochází `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maximálně 500 znaků, příznaky jsou omezeny na `g i m s u`, musí se zkompilovat, musí projít `safe-regex` (katastrofické zpětné sledování) a nesmí odpovídat prázdnému řetězci nebo zástupnému symbolu redakce. Vzor, který selže, je při uložení a testování odmítnut a uložený řádek, který selže, je místo kompilace za běhu přeskočen. Vlastní vzory běží pouze při zapnutém maskování.
- **Detekční čítače** — za typ počítá (nikdy se neshodují s hodnotami), uchovává se v paměti a resetuje se při restartu (`src/lib/pii/piiDetectionStats.ts`). Zvyšují se pouze při zapnutém maskování.

Nastavení jsou uložena v tabulce `key_value` (jmenný prostor `pii_settings`, `src/lib/db/piiSettings.ts`) a jsou čtena prostřednictvím mezipaměti 1 s. API:

| Metoda | Cesta                    | Účel                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav příznaků, `enabledTypes`, `customPatterns`, čítače detekcí      |
| `PUT`  | `/api/settings/pii`      | Nahradí `enabledTypes` (`null` = všechny) a/nebo `customPatterns`    |
| `POST` | `/api/settings/pii/test` | Zkušební běh jednoho vzoru proti vzorku o max. 8 KB; nic se neukládá |

Všechny tři vyžadují oprávnění pro správu a ověřují tělo pomocí Zod (`src/shared/validation/schemas/piiSettings.ts`). S deaktivovaným přihlášením (`requireLogin=false`) jsou `GET` a testovací koncový bod otevřené, ale `PUT` stále potřebuje relaci řídicího panelu, klíč `manage` -scope API, přístupový token `oma_` s rozsahem zápisu nebo vyšším nebo token CLI nebo token interní služby odeslaný ze zpětné smyčky.

#### Identifikátory GDPR (EU) a POPIA (Jižní Afrika).

| ID                  | Identifikátor                   | Ověření                                                                             |
| ------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| `iban`              | IBAN                            | Známá země, přesná délka pro tuto zemi, ISO 13616 MOD-97-10                         |
| `eu_vat`            | DIČ EU                          | Známá předpona členského státu a jeho formát čísla (bez dotazu do VIES)             |
| `es_dni_nie`        | Španělské DNI / NIE             | Kontrolní písmeno (hodnota mod 23); NIE je `X/Y/Z` + 7 číslic                       |
| `it_codice_fiscale` | Italské Codice Fiscale          | Kontrolní písmeno z tabulek lichých/sudých pozic                                    |
| `pl_pesel`          | Polské PESEL                    | Vážený kontrolní součet a přípustné rozsahy zakódovaného měsíce/dne narození        |
| `nl_bsn`            | Nizozemské BSN                  | Kontrola 11 (váhy 9..2, -1)                                                         |
| `de_steuer_id`      | Německé Steuer-ID               | ISO 7064 Mod 11,10 a pravidla struktury číslic (bez úvodní 0)                       |
| `se_personnummer`   | Švédské personnummer            | Luhn pro posledních deset číslic a pravděpodobné datum narození (10 nebo 12 číslic) |
| `za_id`             | Jihoafrické identifikační číslo | Luhn pro všech 13 číslic, platný měsíc/den narození, číslice občanství 0 nebo 1     |
| `za_phone`          | Jihoafrický telefon             | Předpona `+27` / `27` nebo národní tvar `0..` zapsaný s mezerou či spojovníkem      |
| `za_vat`            | Jihoafrické DIČ                 | 10 číslic začínajících `4` **a** "VAT" / "BTW" v předchozích 48 znacích             |
| `za_tax_ref`        | Jihoafrické daňové číslo        | 10 číslic začínajících `0`-`3`, Luhn **a** "tax" / "SARS" v předchozích 48 znacích  |

Protože formáty pouze s číslicemi kolidují s čísly objednávek, čísly sestavení a časovými razítky, ty nejslabší (`za_vat`, `za_tax_ref`) potřebují klíčová slova a holé desetimístné číslo `0..` není považováno za telefonní číslo z Jižní Afriky. Rozložené IBANs (`GB29 NWBK ...`) se neshodují. Na streamovací cestě je cue vyhledáno pouze uvnitř aktuálního bloku. ID jsou před obecnými telefonními vzory, takže ověřený identifikátor si ponechává svůj vlastní zástupný symbol (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Šablony `gdpr` a `popia` vybírají ID EU a Jihoafrická republika. Samotné maskování zůstává přihlášeno (Hard Rule #20): nic zde nemění výchozí příznak funkce.

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
