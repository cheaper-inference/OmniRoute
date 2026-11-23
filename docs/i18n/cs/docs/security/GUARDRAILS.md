# Guardrails (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Naposledy aktualizováno:** 2026-08-29 — v3.8.51 (původ přepisu Video Bridge deklaruje volající,
> server jej zatím neověřuje — upřesněno dle #11661)

Guardraily prosazují bezpečnost, zásady a transformace obsahu na rozhraní
mezi OmniRoute a upstream poskytovateli. Každý guardrail může kontrolovat (a
volitelně odmítnout, transformovat nebo anotovat) datové části požadavků (`preCall`) a
upstream odpovědi (`postCall`).

Systém je **fail-open**: pokud guardrail během provádění vyvolá výjimku, registr
chybu zaznamená a pokračuje dalším guardrailem, místo aby požadavek
selhal. Blokování je výslovné rozhodnutí (`block: true`), nikdy ne nehoda.

## Vestavěná ochranná opatření

Registr při importu automaticky načte šest ochranných opatření v pořadí podle priority
(viz `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Název               | Fáze           | Soubor                |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižší čísla priority se spouštějí **dříve**.

### Přemostění obrazu (`visionBridge.ts`) — Přemostění modality PR-1

Zachytává požadavky obsahující obrázky, které směřují na **modely bez podpory obrazu**, a buď
přesměruje celý požadavek na model podporující obraz, nebo před
voláním nadřazené služby nahradí obrazové části textovými popisy vytvořenými
konfigurovatelným modelem pro zpracování obrazu. Díky tomu mohou poskytovatelé podporující pouze text transparentně zpracovávat
multimodální datové části.

Průběh:

1. Přeskočí zpracování, pokud cílový model již podporuje obraz (pokud není uveden
   v seznamu modelů s vynuceným přemostěním `isVisionBridgeForcedModel`).
2. Extrahuje obrazové části pomocí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), která deleguje na **sjednocený detektor médií**
   `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný zdroj pravdy
   sdílený s filtrem kompatibility kombinací.
   Extrakce je omezena seznamem povolených částí nejvyšší úrovně s tvary,
   které může `replaceImageParts` vložit zpět (smlouva extrakce↔nahrazení): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` a Responses API `input_image`. Vnořené nálezy a
   tvary pouze s indikátory jsou určeny pro filtr kombinací a nikdy se neextrahují.
   Pokud nejsou žádné nalezeny, zpracování se přeskočí.
3. Vyřeší konfiguraci běhového prostředí pomocí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové klíče nastavení `modalityBridge*`
   mají přednost; starší klíče `visionBridge*` zůstávají jako **záložní možnost na jeden
   cyklus** (okno pro návrat zpět). Pokud je přemostění zakázáno, zpracování se přeskočí ještě před
   jakýmkoli procházením médií.
4. Volič režimu (`modalityBridgeVisionMode`, viz tabulka níže) rozhodne
   mezi přesměrováním a popisem. Přesměrování vrátí `modifiedPayload`, ve kterém je změněn pouze
   `model`, a metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta popisu: omezí počet obrázků na `maxImages`, sestaví prompt s ohledem na úlohu,
   zkontroluje mezipaměť popisů, zavolá model pro zpracování obrazu **paralelně**
   (`Promise.allSettled`) a na jejich místo vloží textové části
   `[Image N]: <description>`. Neúspěšný popis vrátí `null` a původní obrazová část
   je **zachována** (#4012) — s výjimkou cesty popisu pro kombinaci, kde selhaly
   všechny popisy; v takovém případě dostane potvrzená nadřazená služba bez podpory obrazu zástupný text
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrátí `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Volič režimu (`modalityBridgeVisionMode`)

| Režim      | Výchozí | Chování                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Původní heuristika beze změn (#6640/#7204): modely mimo kombinaci / modely `auto/` jsou přesměrovány na nejlepší model podporující obraz, pokud původní model již nemá použitelné přihlašovací údaje (pak se použije popis); cíle kombinací vždy používají popis.                                                                            |
| `describe` |         | Vždy použije popis — blok přesměrování se zcela přeskočí; vždy odpovídá model zvolený uživatelem.                                                                                                                                                                                                                                            |
| `reroute`  |         | Vynutí přesměrování: kontrola zachování modelu s přihlašovacími údaji se obejde. Kontrola přihlašovacích údajů **cíle** přesměrování zůstává aktivní — pokud neexistuje žádný použitelný cíl podporující obraz, požadavek pokračuje cestou popisu, aby se nezpracované obrázky nikdy nedostaly do backendu podporujícího pouze text (#8430). |

Vynucené režimy ukončí rozhodování **před** spuštěním automatické heuristiky; chování režimu `auto`
je bajtově totožné s ochranným opatřením před PR-1.

#### Rozsah API klíče (`visionBridgeKeyScope.ts`)

Když API klíč volajícího omezuje `allowedConnections`, fondy kvót
(`allowedQuotas`) nebo modely (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), přemostění vybírá
pro přesměrování a popis pouze modely, které smí klíč používat, na připojeních, která smí klíč
používat. Volání popisu pak vždy prochází vlastní smyčkou OmniRoute
s hlavičkou `x-omniroute-self-loop-key-id`, takže přijímající požadavek chatu
znovu vynutí zásady daného klíče pro připojení a modely. `enforceApiKeyPolicy()`
respektuje tuto hlavičku pouze společně s bearer tokenem vlastní smyčky, takže může
přístup pouze zúžit, a ID, které nelze přeložit, je odmítnuto.

Pokud pro klíč není povolen žádný model podporující obraz, cesta popisu ustoupí
a požadavek projde beze změny, což odpovídá chování fail-open jako u zakázaného
ochranného opatření (metadata `{ skipped: true, reason: "no_permitted_vision_model" }`).
Požadavky bez klíče a klíče bez těchto omezení se chovají přesně stejně jako
dříve.

#### Prompt popisu s ohledem na úlohu (`modalityBridgeVisionTaskAware`)

Výchozí hodnota je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) připojí
text **poslední zprávy uživatele** (zkrácený na 500 znaků) k základnímu
promptu pro popis, čímž popis nasměruje k tomu, na co se uživatel skutečně ptal
(vzor codex-vision-proxy), a požádá model pro zpracování obrazu o přepis
viditelného textu. Pokud je příznak vypnutý — nebo není k dispozici žádný text
uživatele — použije se základní prompt beze změny.

Vlastní požadavek self-loopu pro popis kompatibilní s OpenAI (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` —
bezpodmínečně, pro každého volajícího/poskytovatele a bez závislosti na jakémkoli
signálu klienta. Vzorkování s nízkou úrovní detailů zhoršuje přesnost OCR právě
pro úlohu přepisu textu, kterou tento prompt požaduje, takže samotné volání pro
popis vždy požaduje vysokou úroveň detailů bez ohledu na to, jakou úroveň detailů
používal původní příchozí požadavek. Ovlivňuje to pouze tělo interního požadavku
pro popis; nemění to způsob, jakým OmniRoute předává vlastní
`image_url.detail` volajícího v primárním požadavku — tato výchozí hodnota se
aplikuje samostatně a pouze pro rozpoznané klienty OpenCode ve funkci
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Větev
self-loopu pro popis používající přenosový formát Anthropic nemá pole `detail`
a žádná z těchto výchozích hodnot ji neovlivňuje.

#### Limit výstupu popisu (`modalityBridgeVisionMaxChars`)

| Klíč                           | Výchozí hodnota | Rozsah             |
| ------------------------------ | --------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`             | `0` nebo 100–50000 |

`0` (výchozí hodnota) znamená **bez limitu** — popis vrácený funkcí
`callVisionModel()` se předá beze změny, čímž se zachová stávající
chování. Jakákoli hodnota v rozsahu 100–50000 zkrátí popis a přidá
příponu `…` před jeho vložením zpět ve formě `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Pro úlohy OCR s velkým množstvím detailů, u nichž navazující model potřebuje
úplný přepis, tuto hodnotu zvyšte; pro omezení spotřeby tokenů u příliš
upovídaných modelů pro zpracování obrazu ji snižte.
Pole na řídicím panelu se nachází v panelu Advanced na kartě Vision
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a každou
hodnotu mezi 1 a 99 zvýší na minimální hodnotu 100, zatímco explicitní
hodnotu `0` ponechá beze změny — `0` je sama o sobě platnou hodnotou Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nikoli
pouze výchozí hodnotou „nenastaveno“.

#### Mezipaměť popisů (`modalityBridge/bridgeCache.ts`)

Procesně sdílená mezipaměť LRU + TTL v paměti pro výstupy popisů.
Klíč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
rámcováním pomocí délkových prefixů (bez kolizí na hranicích polí). Komponentou
modelu je **nakonfigurovaný** model mostu, nikoli model, který skutečně
odpověděl — `callVisionModel` může interně použít záložní model a vytváření
klíčů pro jednotlivé pokusy by mezipaměť fragmentovalo. Neúspěšné popisy se
nikdy neukládají do mezipaměti. Nastavení:

| Klíč                            | Výchozí hodnota | Rozsah  |
| ------------------------------- | --------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`          | —       |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000 |

#### Normalizace vzdálených obrázků (self-loop popisu / načítání base64)

Když most sám načítá **vzdálený** obrázek — při vlastním volání popisu pro
Anthropic a při převodu do base64 pro přenosový formát claude
(`ensureBase64ImagesForClaudeWire`), v obou případech prostřednictvím
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledné datové
URI se před vložením do požadavku modelu pro zpracování obrazu zpracuje pomocí
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Obrázky s
nadměrnými rozměry se zmenší tak, aby jejich **delší strana měla 2048 px**
(což odpovídá limitu změny velikosti, který již OpenAI/Anthropic používají na
straně serveru), čímž se sníží počet nahrávaných bajtů a latence, aniž by se
změnilo to, co model pro zpracování obrazu vidí. Změna velikosti používá
`sharp`, načítaný dynamickým importem: na platformě, kde se nepodaří načíst
jeho nativní binární soubor, funkce `normalizeDataUri()` **nikdy nevyvolá
výjimku** — namísto toho předá původní bajty beze změny, takže cesta
popisu/převodu do base64 vždy zůstane funkční. Bajty, které nepředstavují
obrázek (načtený obsah, který nevrátil dekódovatelný obrázek), se rovněž
předají beze změny. Tato normalizace se omezuje na obrázky, které most načítá
pro své vlastní volání — nikdy se nepoužívá na nezpracovaný průchozí payload
volajícího, což je v souladu s principem provádění změn pouze po explicitním
zapnutí (Pevné pravidlo č. 20).

#### Schéma nastavení + migrace

Nové klíče `modalityBridge*` jsou validovány pomocí Zod v
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojice
`modalityBridgeCache*` a skupina `modalityBridgeAudio*` používaná mostem pro
zvuk. Migrace `141_modality_bridge_settings.sql` kopíruje stávající hodnoty
starších klíčů `visionBridge*` do odpovídajících nových klíčů (idempotentně,
bez přepsání hodnoty `modalityBridge*` nastavené operátorem); starší klíče
zůstanou po dobu jednoho cyklu vydání podporovány jako záložní zdroj pro čtení.

#### Hlavička transparentnosti + statistiky

Odpovědi transformované pomocí popisu obsahují
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(vytvořenou funkcí `buildModalityBridgeHeader()` v
`modalityBridge/bridgeStats.ts` a přidanou funkcí
`withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Přesměrované požadavky neobsahují **žádnou** hlavičku — payload zůstal
nezměněn a záměna modelu je již viditelná v poli `model` těla odpovědi.

`GET /api/modality-bridge/stats` (ověření správy, stejná úroveň jako
`GET /api/settings`) vrací čítače jednotlivých modalit uložené v paměti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pro `vision`, `audio` a
`video`. `averageLatencyMs` používá jako jmenovatel `latencySamples`, nikoli
všechny pokusy; operace bez měření času nevytváří fiktivní vzorek s nulovým
počtem milisekund. `bridged` zůstává zpětně kompatibilním aliasem pro úspěšné
konverze; neúspěšné pokusy jej nezvyšují.
Čítače se záměrně resetují při restartu procesu
(jde o telemetrii, nikoli účetnictví).

#### Konfigurace řídicího panelu

Vyhrazená stránka řídicího panelu se nachází na adrese
`/dashboard/settings/modality-bridge`. Její záložky `Vision`, `Audio` a
`Video`, které lze adresovat pomocí URL, při přepínání hodnoty `tab` zachovávají
parametry dotazu. Záložka Vision nabízí aktivaci, režim, výběr modelu (včetně
automatického výchozího nastavení), výzvy zohledňující úlohu, pokročilé limity
časového limitu/obrázku/délky popisu/mezipaměti, běhové
čítače a zabezpečený ukázkový požadavek. Aktivní je také záložka Audio: nabízí
aktivaci, výběr modelu pouze pro STT s možností Auto, limity časového
limitu/maximální délky klipu, čítače zvuku a ukázkový test `input_audio`.
Záložka Video je funkční: uvádí běhový stav FFmpeg/ffprobe — jeden ze čtyř
explicitních stavů uživatelského rozhraní (`unknown`, dokud kontrola probíhá
nebo ji nebylo možné dokončit, `restricted` na hostiteli řídicího panelu, který
není loopback a kde je kontrola přeskočena na straně klienta, `unavailable` po
provedení kontroly a potvrzení, že nástroje chybí, nebo `available` s verzemi
FFmpeg/ffprobe) — ukládá limity aktivace/modelu/snímků/videa/časového limitu,
filtruje výběr modelů pouze na modely podporující obraz a zobrazuje čítače videa.

Dřívější karta Vision Bridge v nastavení AI je kompatibilní odkaz na novou
stránku; již neobsahuje druhou kopii formuláře. Media Providers také odkazuje
pracovní postupy Image-to-Text a Speech-to-Text na odpovídající záložky Modality
Bridge, aniž by odstraňoval stávající testovací prostředí Speech-to-Text.

**Obejití řízení přístupu pro vlastní smyčku:** když je volání pro popis směrováno
přes vlastní smyčku `/v1` služby OmniRoute (nestandardní model poskytovatele),
dílčí požadavek odešle `x-omniroute-admission-bypass: internal` a je ověřen
pomocí přeloženého přihlašovacího údaje vlastní smyčky — lokálního zástupného
údaje `sk_omniroute` v lokálním režimu nebo klíče prostředí
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` nakonfigurovaného operátorem (#1350), aby
nasazení s `REQUIRE_API_KEY=true` mohla volání pro popis nadále provádět. Obejití
je uznáno pouze pro tyto přesné přihlašovací údaje, takže externí klienti nemohou
pomocí této hlavičky přeskočit řízení přístupu.

Starší výchozí hodnoty se nacházejí v
`src/shared/constants/visionBridgeDefaults.ts`; nové výchozí hodnoty pro
režim/zohlednění úlohy/mezipaměť a resolver nastavení se nacházejí v
`src/shared/constants/modalityBridgeDefaults.ts`. Ochranný mechanismus nabízí
volbu konstruktoru `deps`, aby testy mohly vložit falešné implementace
`getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytává chatové požadavky obsahující zvuk předtím, než dorazí k cíli, o němž
není známo, že přijímá zvukový vstup. Chatový požadavek nikdy nepřesměrovává:
zvukové části jsou přepsány prostřednictvím stávajícího koncového bodu multipart
kompatibilního s OpenAI a vybraný chatový model pokračuje s textovými přepisy.

Průběh:

1. Přeložte `supportsAudio` prostřednictvím `getResolvedModelCapabilities()`.
   Explicitní metadata registru poskytovatelů mají přednost, následují statická
   metadata modelu a poté synchronizované `modalities_input`. Deklarovaný seznam
   vstupů bez `audio` má hodnotu `false`; pokud nejsou k dispozici žádné důkazy
   o schopnosti, zůstává hodnota `null`. Jak `false`, tak `null` aktivují
   konzervativní přemostění, zatímco `true` jej obchází.
2. Přeložte nastavení `modalityBridgeAudio*` a ze všech zpráv extrahujte
   spojitelné zvukové části nejvyšší úrovně pomocí sdíleného detektoru
   `detectMediaParts()`. Podporované přenosové formáty jsou OpenAI `input_audio`,
   `audio_url` a `source.media_type: "audio/*"`. Vnořený zvuk je detekován pro
   směrování, ale cesta spojování jej neodstraňuje. Množství zpracování je
   omezeno pomocí `modalityBridgeAudioMaxClips`; pozdější části zůstávají
   nezměněny.
3. Respektujte nakonfigurovanou hodnotu `provider/model`, nebo nechte
   `selectAudioBridgeModel()` projít `AUDIO_TRANSCRIPTION_PROVIDERS` ve stabilním
   pořadí katalogu a vybrat první model s použitelným aktivním přihlašovacím
   údajem poskytovatele.
4. `callAudioTranscription()` převede zvuk ve formátu base64/data-URI na
   multipart `file`, nebo stáhne vzdálený `audio_url` přes ochranu odchozího
   provozu povolující pouze veřejné adresy, s připnutím DNS a limitem 25 MB.
   Poté odešle soubor a vybraný model metodou POST do lokální vlastní smyčky
   `/v1/audio/transcriptions`, ověřené pomocí `resolveSelfLoopBearer()`. Stávající
   trasa přepisu provede běžné vyhledání přihlašovacích údajů, zpracování období
   pozastavení/omezení rychlosti a předání poskytovateli.
5. Úspěšná volání nahradí své části textem `[Audio N]: <transcript>`. Volání
   probíhají pomocí `Promise.allSettled`: jednotlivé selhání zachová původní
   zvukovou část (smlouva #4012). Pokud selžou všechna volání a u cíle je
   prokázáno `supportsAudio === false`, části se změní na
   `[Audio N]: (unavailable — no STT provider connected)` (smlouva #8430).
   U neznámého cíle (`null`) zůstane při selhání všech volání obsah nezměněn.
   Cíl, u kterého je prokázáno, že podporuje pouze text, a který nemá použitelné
   přihlašovací údaje STT, obdrží stejný explicitní zástupný text bez provedení
   síťového volání.

Úspěšné přepisy používají celoprocesovou mezipaměť LRU/TTL Modality Bridge.
Klíč kombinuje odkaz na zvuk, stabilní označení operace `audio-transcription`
a vybraný model STT; selhání se nikdy neukládají do mezipaměti. Pokusy o
zpracování zvuku aktualizují sdílené čítače `bridged`, `cacheHits`, `failures`
a `lastUsedAt`. Transformované odpovědi obsahují
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nezměněné požadavky segment Audio Bridge neobdrží.

Běhová nastavení jsou uložena v databázi a ověřována pomocí Zod:

| Klíč                          | Výchozí hodnota | Rozsah           |
| ----------------------------- | --------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                |
| `modalityBridgeAudioModel`    | `""`            | Auto nebo ID STT |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10             |

Sdílená mezipaměť je nadále řízena nastaveními `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Přemostění videa (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytává části videa nejvyšší úrovně v `messages` rozhraní Chat Completions a
v `input` rozhraní Responses API před voláním cíle bez známé nativní podpory
videa. Podporovanými formáty jsou `input_video`, `video_url`, `video_source`,
adresy URL HTTPS a datové URI `data:video/*;base64,...`. Prosté názvy souborů
v textu nejsou považovány za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) zajišťuje průchod požadavkem,
kontrolu schopností a zásad, agregaci v rámci jednotlivých požadavků a datovou
část odpovědi. Zpracování jednotlivých videí — získání dat, mezipaměť celého
výsledku, popis sekvence snímků (který slučuje případný přepis zvuku deklarovaný
volajícím) a metriky, přerušení a úklid pro jednotlivé pokusy — je skryto za
`processVideoPart` v `videoBridgePipeline.ts`, které se volá jednou pro každou
část videa uvnitř smyčky v `preCall`. Tento modul také definuje explicitní
hranice portů `VideoMediaBrokerPort` (získávání bajtů a extrakce vzorkovaných
snímků), `VideoAudioTranscriptionPort` (sloučení přepisu zvuku deklarovaného
volajícím s popisky vzorkovaných snímků) a `VideoDrilldownPort` (hranice
perzistence podrobné analýzy snímků; dosud není zapojena do `processVideoPart` —
záznamy podrobné analýzy dnes zapisuje pouze samostatná trasa
`/api/modality-bridge/video/drilldown`).

Veřejná cesta požadavků `/v1` nikdy neimportuje ani nespouští podproces. Vzdálená
videa se stahují s limitem 50 MiB; vložená videa ve formátu base64 mají
konzervativní limit 36 MiB dekódovaných dat na jedno video, aby se obálka
modelu, zpráv a rámcování vešla do veřejného limitu 50 MiB pro příjem požadavků
JSON. Délka vložených dat a odhad dekódované velikosti se kontrolují před
alokací. Pro počáteční vzdálenou adresu URL i každé přesměrování je vyžadováno
HTTPS s využitím stávající ochrany odchozích spojení pouze na veřejné adresy a
s připnutím DNS. Bajty poté překročí přesnou interní hranici zprostředkovatele
`POST /api/modality-bridge/video/extract`. Tato trasa je současně `LOCAL_ONLY`
a `SPAWN_CAPABLE`, přijímá pouze autentizovaný požadavek v rámci procesu
z důvěryhodného rozhraní zpětné smyčky a nikdy nepřijímá adresu URL, cestu
k souborovému systému, spustitelný soubor ani seznam argumentů. Zpracování
velikosti těla v API a inkrementální čtečka těla obslužné rutiny nezávisle
vynucují limit vstupu zprostředkovatele 50 MiB. Jeho omezená fronta provádí vždy
jednu extrakci, umožňuje čtyři čekající úlohy a omezuje čekající vstup na
100 MiB.

Uvnitř zprostředkovatele čte `ffprobe` soukromý místní soubor; pevný seznam
povolených formátů vylučuje formáty playlistů a manifestů. U povolených
kontejnerů rodiny MOV zůstávají externí datové reference MOV ve výchozím
nastavení zakázány a pevně daný příkaz jejich použití nepovoluje. `ffprobe`
i `ffmpeg` používají seznam povolených protokolů omezený pouze na `file`, jedno
vlákno, pevná pole argumentů, žádný shell a spustitelné soubory vyhledané
v `PATH`. Datové proudy připojených obrázků obalu nejsou kandidáty k přehrání.
Všechny přehratelné proudy musí splňovat limity a před deterministickým
náhradním výběrem proudu s nejnižším indexem je upřednostněn explicitní výchozí
proud. Videa jsou omezena na 600 sekund, 8 192 pixelů v každém rozměru a
33 554 432 zdrojových pixelů. FFmpeg vzorkuje 1–16 prostředních snímků JPEG,
zmenšuje delší hranu nejvýše na 1 024 pixelů bez zvětšování menších vstupů a
nikdy neobdrží adresu URL. Výchozí metodou vzorkování je `uniform`. Volitelné
zásady `scene_aware` a experimentální `segment_aware` provedou jeden dodatečný
pevně daný průchod FFmpeg přes již ověřený místní proud, vyberou omezené časové
značky scén `showinfo` a při selhání detektoru, vypršení časového limitu,
chybném výstupu nebo prázdné množině kandidátů deterministicky použijí stejné
rovnoměrné středové body. Režim zohledňující segmenty přiděluje vzorky středových
bodů úměrně ověřeným intervalům scén; podklady režimu zohledňujícího segmenty a
chování při použití náhradní metody jsou podrobně popsány níže. Pevný limit
16 snímků se u každé zásady aplikuje až po výběru. Pokud má požadavek
zohledňující scény rozpočet pouze na jeden snímek, použije rovnoměrný středový
bod aktivního okna celého videa nebo okna zaměření a uvede
`policyEffective: uniform`: jediný vybraný snímek scény nemůže zachovat oba
časové konce. Volající může volitelně zadat konečné okno zaměření (`start`/`end`
v sekundách); hranice se oříznou podle délky média, obrácená nebo nekonečná okna
jsou odmítnuta a všechny zásady vzorkování se provádějí pouze uvnitř
normalizovaného intervalu. Výsledné okno je zahrnuto v metadatech vzorkování a
v prefixu nedůvěryhodného popisu, aby navazující modely dokázaly odlišit
zaměřený výňatek od celé časové osy.

Sémantické zaměření popisků je samostatné explicitní nastavení. Výchozí režim
analýzy `full` zachovává stávající výzvu pro snímky a nikdy nepředává text
požadavku modelu pro vytváření popisků. V režimu `focused` čte přemostění pouze
nejnovější neprázdný uživatelský obsah `text`/`input_text` ze stejného kontejneru
Chat nebo Responses, normalizuje jej do NFC, slučuje řídicí znaky a bílé znaky
a omezuje jej na 500 kódových bodů Unicode. Prázdný výsledek způsobí návrat
k přesné výzvě režimu `full`. Použitelná nápověda je serializována jako JSON ve
vyhrazeném bloku nedůvěryhodného uživatelského kontextu a smí pouze
upřednostňovat pozorovatelné podrobnosti; nemůže potlačit samostatné varování
zakazující řídit se pokyny, které jsou v médiu viditelné nebo slyšitelné.
Textové zaměření nikdy neodvozuje `start`/`end` ani nemění časový vzorkovač.

#### Strukturální podklady segmentů FU-07

`segment_aware` používá jeden omezený průchod předběžné analýzy nad již ověřeným
lokálním videostreamem. Pevně daný řetězec filtrů nejprve zmenší obraz na šířku
nejvýše 320 pixelů, detekuje změny scén a zamrzlé intervaly a poté vzorkuje
rychlostí 1 snímek za sekundu za účelem vyhodnocení rozmazání, průměrné
svítivosti a prostorových/časových informací. Průchod je omezen na 600
strukturálních vzorků, jedno vlákno FFmpeg/filtru, stejné seznamy povolených
kontejnerů a protokol omezený pouze na `file`, limit výstupu procesu 1 MiB
a nejvýše 30 sekund v rámci sdíleného zrušení/termínu brokera. Nikdy nepřijímá
z požadavku příkaz, filtr, cestu ani URL.

Strukturální hodnoty představují deterministické důkazy ze vzorkování, nikoli
sémantické porozumění videu. Neodvozují subjekty, akce, titulky, řeč ani záměr
uživatele. Hranice scén a zamrznutí tvoří segmenty; pokrytí zamrznutí,
rozmazání, expozice, prostorové detaily a časové změny ovlivňují pouze způsob,
jakým je rozdělen stávající rozpočet 1–16 snímků. Zcela zamrzlý segment je
omezen na jeden snímek, zatímco nezamrzlé segmenty soutěží o zbývající
rozpočet. Pokud je hranic více než snímků, zachová se rovnoměrné pokrytí časové
osy, aby rychlé střihy na začátku nemohly skrýt dlouhý koncový segment. Hranice
scény nacházející se v rámci 1sekundového rozlišení analýzy od hranice
zamrznutí se sloučí.

Chybějící filtry, poškozené/prázdné důkazy, chyba detektoru nebo vypršení
časového limitu omezené předběžné analýzy vedou k otevřenému selhání a použití
přesné zásady rovnoměrných středových bodů. Zrušení volajícím nebo termín
brokera otevřeně neselhává: ukončí probíhající podproces, zabrání následné
extrakci snímků a soukromý dočasný strom je odstraněn v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické reálné testovací
vstupy FFmpeg pro úspory volání titulkovače po deduplikaci, přidělování rozpočtu
při intenzivním pohybu, důkazy o rozmazání/expozici/SI-TI, rychlé střihy
s dlouhým koncovým úsekem a falešně pozitivní výsledky při postupném prolínání.
Zaznamenává dobu předběžné analýzy podle reálného času a tam, kde je dostupný
`/usr/bin/time`, také využití CPU podřízeného procesu a maximální RSS. Jeho
kontroly kvality jsou pouze strukturálními orákuly. Kvalita reálného modelu
pro titulkování zůstává `HOLD`, protože tento testovací nástroj nemá autorizovaný
koncový bod ani zmrazeného hodnotitele. Peněžní úspory také zůstávají `HOLD`,
pokud `--caption-cost-per-call-usd` neposkytne explicitní kladný odhad nákladů
na jedno volání; skript žádný z těchto výsledků nikdy nevymýšlí.

Každý snímek je omezen na 4 MiB, všechny nezpracované snímky dohromady na
23 MiB a serializovaná odpověď brokera na 32 MiB. Soukromý dočasný adresář je
odstraněn v bloku `finally`. OmniRoute nepřibaluje FFmpeg a nepřijímá vlastní
cestu ke spustitelnému souboru. Před titulkováním bridge použije konzervativní
průchod vizuální deduplikace: každý JPEG zmenší na 16×16 odstínů šedi a porovná
jej pouze s posledním zachovaným snímkem. Při požadovaném rozpočtu titulků
vyšším než jeden snímek poskytne extrakce omezený fond kandidátů o velikosti
nejvýše dvojnásobku tohoto rozpočtu, nikdy však více než 16 snímků. Požadovaný
limit se použije až po deduplikaci, přičemž při závěrečném prořezávání zůstanou
zachováni první a poslední vybraný kandidát, pokud je rozpočet alespoň dva.
Verzovaná zásada
`grayscale-16x16-mean-cells-v2` používá vyšší z hodnot rozdílu průměrné
svítivosti a podílu buněk miniatury, jejichž normalizovaný rozdíl je alespoň
0.05. Prahová hodnota duplicity je konstanta 0.04, zvolená kvůli
předvídatelnosti, nikoli zpřístupněná jako běhové nastavení. Tento sekundární
signál s vysokým kontrastem zachovává drobný pohyb a změny viditelného textu,
které může porovnání založené pouze na průměru skrýt. Chyby komparátoru nebo
dekodéru vedou k otevřenému selhání a zachování pokrytí. Výstupní metadata
rozlišují extrahované kandidáty, úspěšně použité snímky a odstraněné vizuální
duplikáty.

Explicitně označená část videa může požádat o kontaktní náhled s časovými
značkami. Bridge sestaví mřížku JPEG s nejvýše 4 sloupci a 16 snímky. Každá
buňka o velikosti 512 pixelů napevno vloží časovou značku zdroje do vysoce
kontrastního spodního pruhu, zatímco stejné časové značky zůstávají v textových
metadatech pro následné přiřazení a audit. Celý JPEG zůstává omezen na 32 MiB.
Pokud `sharp` nedokáže mřížku dekódovat nebo sestavit, bridge použije jako
náhradní řešení jednotlivé snímky JPEG; zrušení klientem se nadále propaguje
operací s kontaktním náhledem.

Důkazy pro povýšení jsou záměrně odděleny od syntetického mikrobenchmarku
kompozice. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje
A/B testovací nástroj s verzovaným schématem pro reálné modely vidění
kompatibilní s OpenAI. Měří tokeny hlášené poskytovatelem, celkovou latenci
od začátku do konce (včetně sestavení kontaktního náhledu), počet volání modelu
a zachování faktů definovaných manifestem. Nezpracované odpovědi modelu se do
reportu nezapisují; uchovávají se pouze otisky SHA-256 a ID odpovídajících
faktů. Testovací nástroj neprovede žádné síťové ani placené volání modelu,
pokud není předán parametr `--execute-real` a nejsou nakonfigurovány `--model`,
`OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez takového explicitního reálného
spuštění zůstává jeho strojově čitelný verdikt `HOLD`; samotná syntetická měření
datové zátěže/počtu volání nejsou důkazem pro povýšení.

Volající mohou k podporované části videa připojit volitelné pole
`transcript.cues`, pokud již mají zarovnaný text. Každý cue musí obsahovat
`text`, konečný interval `start`/`end` v rámci zjištěné délky a hodnotu `source`
ze seznamu povolených hodnot (`client`, `embedded` nebo `audio-bridge`);
`confidence` má výchozí hodnotu `1` a musí zůstat mezi `0` a `1`. Přesně
duplicitní cues se sloučí. OmniRoute na základě těchto metadat nikdy nespouští
přepis: ověřené cues se zkopírují do popsaného výsledku spolu se zdrojem,
spolehlivostí a intervalem a vykreslí se jako nedůvěryhodná pozorování vedle
titulků snímků. Neplatný text, text mimo rozsah nebo text bez provenience je
odmítnut, místo aby byl přimíchán do proudu titulků. Oba kanály přepisu v těle
požadavku normalizují dodanou provenienci na `client`, včetně uživatelem
deklarovaných označení `embedded` nebo `audio-bridge`. Tato důvěryhodná označení
může prostřednictvím argumentu `trustedSource`, dostupného pouze z kódu, přiřadit
jen adaptér vlastněný serverem; pole JSON požadavku se k tomuto argumentu
nemůže dostat. Text přepisu zůstává nedůvěryhodným obsahem odvozeným z média
bez ohledu na svou provenienci a nikdy nesmí určovat autorizaci.

Pokročilý volající může pro stejné video poskytnout stopu `audioTranscript`;
zpracovává se jako text poskytnutý klientem, nikoli jako důkaz přepisu na serveru.
Spojovací vrstva spouští vizuální a zvuková pozorování se společným
termínem dokončení a signálem přerušení, řadí je na společnou časovou osu, slučuje
přesné duplicity a hlásí částečný výsledek, pokud uspěje pouze jedna strana.
Neplatný `audioTranscript` vede k tomuto částečnému výsledku — vizuální
popis se zachová a zvuková větev zaznamená sanitizovaný kód selhání —
namísto selhání celého videa. Dostupnost jednotlivých větví, příznak částečného
výsledku a sanitizované kódy selhání se zachovávají ve výsledku popisu, v
metadatech ochranných mechanismů (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metadatech mezipaměti výsledků a v čítačích
slučování mostu. Výchozí cesta Video Bridge nevyvolává převod řeči na text
ani nestahuje druhou kopii média; bez této explicitní stopy zůstává
omezena pouze na video.

**Uchovávání přepisu (#12150 P1).** Toto se použije automaticky vždy, když
Video Bridge (který je sám volitelný) vykreslí segment přepisu — samostatný
příznak uchovávání neexistuje. Když požadavek vykreslí libovolný segment přepisu
(volajícím deklarovaný `transcript` nebo sloučený `audioTranscript`), ochranný
mechanismus jej označí jako `videoBridgeObserved` a vytvoří redigovanou stínovou
kopii popisu videa — identické vykreslení, v němž je volný text každého segmentu
nahrazen řetězcem `[redacted-video-transcript]`; tato kopie vzniká nahrazením
pole strukturovaného segmentu před sestavením řetězce (nikdy ne analýzou
sloučeného textu, takže žádný obsah segmentu — škodlivý ani běžný, včetně textů
obsahujících `]`, jako jsou `[inaudible]`/`[music]` — nemůže zůstat zachován).
V těle požadavku uloženého v protokolu volání se každá textová část odvozená
z videa nahradí touto redigovanou stínovou kopií na základě shody obsahu;
kotva `fullText` se znovu načte z dokončené datové struktury ochranného
mechanismu před voláním, takže shoda zůstane úspěšná i poté, co pozdější
řetězené ochranné mechanismy (maskování osobních údajů a přihlašovacích údajů,
priority 10/95) přepíší text popisu na místě, a také poté, co vložení systémové
výzvy, předání a paměti změní strukturu pole zpráv. Tělo odeslané modelu zůstává
beze změny. Pozorovaný požadavek také neukládá žádná trvalá data do Memory
(přeskočí se extrakce odvozená z požadavku i odpovědi), takže ani vlastní odpověď
modelu nemůže přenést text přepisu do Memory.

**Nezpracovaná pole videa (#12430).** Když je most povolen a nativní podpora videa je neznámá nebo chybí, definovaná pole `transcript`/`audioTranscript` rovněž aktivují `videoBridgeObserved`, a to i po selhání popisu nebo překročení limitu `maxVideos`. Hodnota `null` a prázdné řetězce se započítávají; chybějící pole a metadata netýkající se videa nikoli. Uchovávané kopie tato pole redigují nebo požadavek vynechají a mezipaměti/Memory se obcházejí.

Na těchto záložních cestách se platné segmenty od volajícího převádějí na
podporované části `text`/`input_text`, nikoli na nestandardní pole poskytovatele.
Obě stopy dodané v požadavku zůstávají nedůvěryhodnými pozorováními typu
`client` s explicitním upozorněním, že video nebylo popsáno a časová razítka
nebyla ověřena vůči médiu. Stávající limity 256 segmentů/64 KiB celkem a limity
pro jednotlivé segmenty se uplatňují na obě stopy společně; časová razítka se
musí vejít do 600sekundového stropu zprostředkovatele a do případného zadaného
okna zaměření. Neplatné stopy se zahodí a nepředávají se jako libovolný text;
platnou související stopu lze nadále použít, pokud není překročen jejich společný
limit. Pole s hodnotou null či prázdná pole nepřidávají žádný text. Tato záložní
cesta nepřidává žádné načítání médií ani přepis. Pole rozšíření přepisu se
odstraňují ze záložního nosiče videa a jeho objektů `video_url`/`source`.
Seznam povolených položek přenosového formátu OpenAI zůstává striktní; nosiče
videa s neznámou nativní podporou zůstávají dostupné a cíle, o nichž je známo,
že podporují pouze text, si zachovávají bezpečné značky. Strukturované redigované
stínové kopie chrání připojený text přepisu, zatímco původní požadavek vlastněný
volajícím zůstává beze změny. Cíle s nativní podporou a zakázané mosty si
zachovávají své stávající chování s obejitím.

Další uchovávané kopie používají stejný signál pozorovaného požadavku. Nezpracovaný
snímek klientského požadavku před ochrannými mechanismy, čekající požadavek
v paměti a protokol předčasně odmítnutého požadavku strukturálně nahrazují pole
přepisu ve video částech; řetězcové výzvy vytvořené fázemi zpracování a předáním
kontextu se redigují ve výstupu pro ukládané tělo požadavku. Uložená značka
`video_content_removed` způsobí, že pokračování pomocí `previous_response_id`
bezpečně selže namísto rekonstrukce textu, který byl úmyslně zahozen. Pokud
pozorovaný požadavek před protokolováním ztratí svou redigovanou stínovou kopii
pro danou část nebo pokud po pozdějších úpravách požadavku neodpovídá byť jediná
z několika stínových kopií videa, uchovávané tělo požadavku se zcela vynechá,
namísto aby se uchoval pouze částečně redigovaný přepis.

U pozorovaného požadavku může odpověď modelu citovat libovolnou část
přepisu bez strukturované hranice segmentu. Její `responseBody` uložené
v protokolu volání se proto nahradí značkou vynechání; podrobný artefakt
zpracování (který může obsahovat těla komunikace se vzdálenou službou/klientem
a bloky streamu) se neuchovává. Sémantické mezipaměti, mezipaměti idempotence
a mezipaměti opakovaného přehrání uvažování pro tento požadavek obcházejí
čtení i zápisy. Požadavek poskytovateli a odpověď viditelná klientem zůstávají
beze změny. Při vynechání podrobného artefaktu se z dočasné vyrovnávací paměti
odčerpají dřívější bajty keepalive. Upozornění Kiro na poškozený EventStream
uvádí pouze počet bajtů datové části, nikdy její obsah ani nezpracovanou chybu
parseru JSON.
Tím se netvrdí, že byly prověřeny všechny nesouvisející diagnostické výstupy
poskytovatelů/pluginů; širší kontrola míst trvalého uložení se sleduje v #11658.

Interní životní cyklus `/api/modality-bridge/video/drilldown` představuje samostatnou,
loopback/tokenem ověřovanou vrstvu mezipaměti. Každá operace také vyžaduje
kanonické neprůhledné ID principalu. Než je produkční volající povolen, musí
toto ID odvodit z ověřeného tenantu a nikdy nesmí předat hodnotu zvolenou
klientem. Klíče mezipaměti vážou tento principal ke kanonickým ID relace a
reference videa, ukládají pouze jejich klíče odvozené pomocí SHA-256 a omezují
čtení i mazání na tentýž principal. Mezipaměť ukládá nejvýše 16 odvozených snímků
JPEG na záznam, jejich platnost vyprší po deseti minutách a podporuje omezená
čtení `start`/`end` nebo explicitní odstranění relace.

Každý principal je omezen na 16 záznamů a 64 MiB kanonických dat JPEG. Tyto
limity jsou nezávislé na globálním stropu 64 záznamů / 256 MiB: tlak na kvótu
principalu nejprve vyřazuje pouze nejméně nedávno používané záznamy daného
principalu a teprve poté se zvažuje globální vyřazování LRU. Záznamy s vypršenou
platností jsou při aktivitě mezipaměti odstraněny z účtování principalu i
globálního účtování, zatímco zrušení a selhání validace nepotvrdí částečnou
náhradu.

Mezipaměť odmítá nekanonický Base64, nadbytečné vyplnění, média jiná než JPEG,
poškozené nebo zkrácené soubory JPEG a soubory JPEG, které během omezeného
dekódování celého obrázku pomocí `sharp` vyvolají varování. Každý přijatý obrázek
znovu zakóduje jako kanonický JPEG, šířku a výšku odvodí z dekódovaných bajtů
namísto důvěry v pole volajícího a zahodí veškeré koncové polyglotní bajty,
místo aby je zachovala. Do obou kvót se započítává pouze omezený kanonický
komprimovaný buffer. Limit přenosu JSON zahrnuje režii Base64 pro limit
dekódovaného vstupu 32 MiB. Každé
uložené odvození zaznamenává svůj validovaný formát a rozlišení JPEG, zásady
vzorkování, verzi odvození, čas vytvoření, hash obsahu vypočítaný serverem a
hashovanou nadřazenou referenci spolu s hashem nadřazeného obsahu od důvěryhodného
volajícího. Zrušení se kontroluje mezi asynchronními fázemi dekódování a výpočtu
hashe před atomickým potvrzením do mezipaměti.

Tato etapa zatím k trase nepřipojuje produkčního producenta a neposkytuje výběr
variant s více rozlišeními. Transparentní cesta požadavku Video Bridge proto
nepřidává žádnou další práci, zatímco odvození principalu vázané na tenant a
úplný životní cyklus FU-08 pro více rozlišení zůstávají explicitně navazujícími
úkoly, nikoli zdokumentovaným dokončeným chováním.

Snímky jsou postupně opatřovány popisky pomocí nakonfigurovaného modelu Video.
Prázdné přepsání Video zdědí nastavení Vision; pokud jsou obě prázdná, automatický
router Vision vybere efektivní model podporující obraz. Úspěšné popisky nahradí
původní část stabilním prefixem `[Video description:`, který text rovněž označí
jako nedůvěryhodné pozorování odvozené z média a instruuje navazující modely,
aby se neřídily pokyny nalezenými v médiu. Klíče mezipaměti popisků snímků
zahrnují bajty JPEG, prompt, časové razítko a efektivní model; do mezipaměti se
ukládají pouze úspěšné popisky. Záznamy mezipaměti uchovávají skutečný úspěšný
producentský model včetně záložního modelu; pokud byly různé snímky vytvořeny
různými modely, bridge hlásí `mixed`. Zásah do mezipaměti znovu použije tuto
identitu producenta namísto jejího přeznačení podle požadovaného plánu směrování.
Mezipaměť výsledků celého videa používá klíč založený na každém vstupu, který
mění výstup — promptu, efektivním modelu, zásadách vzorkování, počtu snímků,
režimu sémantické analýzy, otisku SHA-256 normalizované nápovědy zaměření, okně
zaměření, `transcript`, `audioTranscript` a příznaku kontaktního archu — takže
změna kterékoli z těchto dimenzí znamená minutí mezipaměti, nikdy opětovné použití
zastaralého výsledku. Verze zásad vizuální deduplikace, práh a omezený počet
kandidátních snímků jsou také explicitně uvedeny v klíči a metadatech mezipaměti
výsledků; změna zásad proto nemůže znovu použít zastaralý popis celého videa.
Metadata mezipaměti výsledků v4 uchovávají režim a otisk, nikdy nezpracovaný úkol
uživatele. Metadata guardrailu uvádějí požadovaný i efektivní režim analýzy;
požadovaný režim `focused` bez použitelného uživatelského textu je vykázán jako
efektivně `full`.

Guardrail extrahuje každou podporovanou část videa, ale popíše nejvýše
`modalityBridgeVideoMaxVideos`. U cíle, u něhož je prokázáno
`supportsVideo === false`, se neúspěšná videa a videa nad limitem stanou
explicitními bezpečnými textovými značkami, takže žádné nezpracované video
nezůstane zachováno. Pokud schopnost není známa, tyto části si ponechají svůj
videonosič; případný záložní přepis následuje výše uvedený omezený převod textu.
Cíle s `supportsVideo === true` bridge obcházejí. Signál zrušení klientského
požadavku se přenáší přes stahování, frontu brokeru, podprocesy a volání pro
vytváření popisků; zrušení zastavují zpracování mezi videi a nikdy při selhání
nepropustí nezpracované médium.

Běhová nastavení jsou uložena v databázi a validována pomocí Zod:

| Klíč                                | Výchozí hodnota | Rozsah / chování                                                                                         |
| ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Volitelné běhové prostředí, nutné explicitně zapnout                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | `full` zachovává obecné popisky; `focused` používá omezený, nedůvěryhodný kontext posledního uživatele   |
| `modalityBridgeVideoModel`          | `""`            | Dědí model Vision Bridge                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` nebo proporcionální `segment_aware`; při selhání detektoru se použije `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                           |

Starší uložené hodnoty časového limitu videa nad 120 sekund jsou omezeny na
termín zprostředkovatele; zápisy nových nastavení nad tímto limitem jsou odmítnuty.
`GET /api/modality-bridge/video/runtime` před ověřením nebo kontrolou běhového
prostředí vyžaduje důvěryhodnou, označenou lokálnost zpětné smyčky a poté vyžaduje
ověření pro správu. Vrací pouze `available`, sanitizované verze FFmpeg/ffprobe a pevně
daný důvod, když běhové prostředí není dostupné. Interní koncový bod pro extrakci není
veřejným API pro nahrávání: při zaplnění fronty vrací `503` spolu s `Retry-After`, při
odpojení volajícího vrací `499` a při vypršení pevně stanoveného termínu zprostředkovatele
vrací `504`. Převedené odpovědi přidávají
`video->text;model=<visionModel>;parts=<videos>` do centrální hlavičky
`x-omniroute-modality-bridge`, aniž by odstraňovaly segmenty Vision nebo Audio.

### Maskování PII (`piiMasker.ts`)

Spouští se v **obou** fázích.

- **`preCall`** naklonuje datovou část, projde `system`, `messages`, `input` a
  `prompt` (včetně položek obsahujících prostý řetězec) a aplikuje `processPII()` (z
  `@/shared/utils/inputSanitizer`) na řetězcová pole `content`/`text`. Když je
  `PII_REDACTION_ENABLED=true`, zjištěné PII jsou v odchozí datové části redigovány.
  To je nezávislé na `INPUT_SANITIZER_MODE` (které řídí pouze zásady proti
  prompt injection). Když je redigování vypnuté, volání zaznamenává počty detekcí,
  aniž by přepisovalo obsah.
- **`postCall`** vytvoří hlubokou kopii odpovědi a spustí `sanitizePIIResponse()` spolu
  s maskováním struktury rozhraní Responses API (`maskResponsesOutput` — pokrývá
  `output_text` a `output[].content[].text`). Pokud dojde k jakémukoli redigování,
  upravená odpověď nahradí původní.

Ochranné pravidlo nikdy neblokuje; pouze přidává anotace (`meta.detections`,
`meta.redacted`) nebo přepisuje obsah.

#### Výběr podle typu, vlastní vzory a čítače detekcí

**Dashboard → Settings → Security → PII masking** určuje, _co_ se maskuje.
Maskování však nezapíná: to nadále zajišťují `PII_REDACTION_ENABLED` (požadavek) a
`PII_RESPONSE_SANITIZATION` (odpověď + SSE), přičemž obě možnosti jsou ve výchozím
nastavení vypnuté.

- **Výběr podle typu** — vestavěná ID jsou uvedena v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavená hodnota znamená
  všechny typy (chování před zavedením tohoto nastavení). Vzor `ssn_us` modulu pro
  zpracování požadavků se mapuje na `ssn`. Šablony (Minimal, Standard, Financial,
  Brazilian, USA, Full) pouze vyplňují zaškrtávací políčka v uživatelském rozhraní.
- **Vlastní vzory** — až 20 regulárních výrazů nebo vzorů se zástupnými znaky
  (`*` = až 64 znaků kromě bílých znaků, `?` = jeden znak). Shody se změní na
  `[CUSTOM_REDACTED]`. Každý vzor prochází funkcí `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): nejvýše 500 znaků, příznaky jsou omezeny
  na `g i m s u`, vzor musí být možné zkompilovat, musí projít kontrolou `safe-regex`
  (katastrofické zpětné procházení) a nesmí odpovídat prázdnému řetězci ani zástupnému
  textu redigování. Vzor, který neprojde, je při ukládání i testování odmítnut a uložený
  řádek, který neprojde, je za běhu přeskočen namísto kompilace. Vlastní vzory se
  používají pouze tehdy, když je maskování zapnuté.
- **Čítače detekcí** — počty podle jednotlivých typů (nikdy neodpovídající hodnoty)
  jsou uchovávány v paměti a při restartu se vynulují
  (`src/lib/pii/piiDetectionStats.ts`). Zvyšují se pouze tehdy, když je maskování
  zapnuté.

Nastavení jsou uložena v tabulce `key_value` (jmenný prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) a načítají se prostřednictvím mezipaměti s dobou 1 s. API:

| Metoda | Cesta                    | Účel                                                                           |
| ------ | ------------------------ | ------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Stav příznaků, `enabledTypes`, `customPatterns`, čítače detekcí                |
| `PUT`  | `/api/settings/pii`      | Nahradí `enabledTypes` (`null` = všechny) a/nebo `customPatterns`              |
| `POST` | `/api/settings/pii/test` | Zkušebně použije jeden vzor na vzorek o velikosti nejvýše 8 KB; nic se neuloží |

Všechny tři vyžadují ověření pro správu a validují tělo pomocí Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Detekuje škodlivé struktury v obsahu poskytnutém uživatelem a vynucuje
nakonfigurované zásady. Chování je řízeno proměnnými prostředí a možnostmi
konstruktoru:

| Nastavení                 | Proměnná prostředí                                                                                   | Výchozí hodnota | Účinek                                                                                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povoleno                  | `INPUT_SANITIZER_ENABLED`                                                                            | `true`          | Při hodnotě `false` se ochranné opatření ukončí bez dalšího zpracování.                                                                                                                                 |
| Režim                     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`          | Zásady pro injekce: `block`, `warn` nebo `log`. (`redact` je podporováno kvůli zpětné kompatibilitě, ale **neodstraňuje** text injekce; přepis PII v požadavku se řídí pomocí `PII_REDACTION_ENABLED`.) |
| Prahová hodnota blokování | Volba `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`          | Minimální závažnost vyžadovaná pro blokování. Při výchozím nastavení je střední závažnost pouze sledována.                                                                                              |

**Priorita režimu** (`getMode`): `options.mode` volajícího →
**přepsání příznakem funkce v DB** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → proměnná prostředí `INJECTION_GUARD_MODE` → proměnná prostředí `INPUT_SANITIZER_MODE` →
`warn`. Přepsání z řídicího panelu má tedy přednost před proměnnými prostředí, takže uživatelské rozhraní Feature
Flags řídí běžící ochranu živě (bez restartu). Čtení z DB je zabezpečené proti selhání:
pokud skončí chybou, ochrana se vrátí k chování založenému na proměnných prostředí, a pokud není nastaveno žádné
přepsání, je chování totožné s vyhodnocením pouze podle proměnných prostředí.

Zdroje detekce:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (sdílená sada detektorů
   používaná i jinde v pipeline).
2. Vestavěné `DEFAULT_GUARD_PATTERNS` (aktuálně `system_override_inline` a
   `markdown_system_block`, oba se závažností `high`).
3. Volitelné `customPatterns` předané prostřednictvím voleb konstruktoru (řetězce, regulární výrazy
   nebo záznamy `{ name, pattern, severity }`).

Když platí `mode === "block"` **a** alespoň jedna detekce splňuje prahovou hodnotu
závažnosti, `preCall` vrátí `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimech `warn`/`log` ochranné opatření událost zaznamená, ale
volání povolí. Sdílená pomocná funkce `evaluatePromptInjection()` se také exportuje
pro volající, kteří potřebují vyhodnocovat prompty bez použití registru.

**Limit kontroly (v3.8.20):** detektor kontroluje pouze **prvních 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtů) v
`src/shared/utils/inputSanitizer.ts`. Funkce `detectInjection()` i
`evaluatePromptInjection()` před spuštěním smyčky vzorů použijí `slice(0, MAX_INJECTION_SCAN_BYTES)`.
Direktivy injekce se nacházejí poblíž začátku vstupu, takže toto omezení snižuje zátěž CPU/GC způsobenou regulárními výrazy
u payloadů o velikosti stovek KB, aniž by oslabovalo detekci (viz
#3932, #4041).

### Maskování přihlašovacích údajů (`credentialMasker.ts`)

Spouští se v **obou** fázích, jako poslední ve výchozím řetězci (priorita `95`). Rediguje
známé vzory klíčů API / tajných tokenů z odchozího payloadu (obsahu zpráv,
argumentů volání nástrojů, výsledků nástrojů) **i** z odpovědi poskytovatele, takže
přihlašovací údaj vložený do promptu (nebo vrácený ve výsledku nástroje) neunikne
upstream poskytovateli ani zpět klientovi.

- **Pouze na základě výslovného povolení**, podle stejné konvence jako redigování PII (související s Pevným pravidlem č. 20):
  je vypnuto, pokud neplatí `settings.credentialRedactionEnabled === true` **nebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Když je vypnuto, ochranné opatření neprovádí žádnou operaci —
  nikdy neblokuje ani nepřepisuje.
- `redactCredentials()` prochází celý strom payloadu/odpovědi (`walkValue()`,
  bezpečně vůči zneužití prototypu a bezpečně vůči cyklům díky `WeakSet`) a nahrazuje shody
  zástupným symbolem `[REDACTED:<type>]`, přičemž klonuje pouze větve, které se skutečně
  změnily.
- `CREDENTIAL_PATTERNS` pokrývá klíče poskytovatelů LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platební klíče (Stripe, Square), cloudové
  klíče (přístupový klíč AWS, Twilio, SendGrid, Mailgun), soukromé klíče / JWT,
  připojovací řetězce obsahující přihlašovací údaje (`mongodb://user:pass@...` atd.) a
  obecný vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Klíče ve formátu hlaviček (`authorization`, `x-api-key`, `api-key`,
  `apikey`) jsou redigovány strukturálně (pouze hodnota, prefix schématu jako
  `Bearer `/`Basic ` je zachován), nikoli prostřednictvím obecného textového regulárního výrazu.
- Ochranné opatření nikdy neblokuje; pouze přepisuje (`modifiedPayload` /
  `modifiedResponse`) a přidává anotace (`meta.credentialsRedacted`, `meta.count`).

Ochrana proti regresím: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true zkrátí vyhodnocování řetězce
  message?: string; // zobrazí se při zablokování
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vráceno metodou preCall pro přepsání požadavku
  modifiedResponse?: TValue; // vráceno metodou postCall pro přepsání odpovědi
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

Ochranné pravidlo signalizuje „žádnou změnu“ vrácením hodnoty `void`, `{}` nebo
`{ block: false }`. Vrácení `modifiedPayload`/`modifiedResponse` nahradí
hodnotu procházející řetězcem pro následná ochranná pravidla.
`signal?: AbortSignal` přenáší životní cyklus volajícího do ochranných pravidel. Přerušení požadavku je záměrnou výjimkou z režimu fail-open: mediální převodníky ukončí práci a provedou úklid, aniž by obnovily nezpracovaná média pro cíl, o kterém je známo, že je nepodporuje.

## Registr (`registry.ts`)

Singleton `guardrailRegistry` poskytuje:

- `register(guardrail)` — přidá ochranné pravidlo (nebo je nahradí podle normalizovaného názvu) a
  znovu seřadí pravidla vzestupně podle `priority`.
- `clear()` / `list()` — pomocné administrativní funkce.
- `runPreCallHooks(payload, context)` — prochází aktivní ochranná pravidla, předává
  payload prostřednictvím `modifiedPayload` a zastaví se při prvním `block: true`.
- `runPostCallHooks(response, context)` — stejný postup na straně odpovědi.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a volitelně
  znovu zaregistruje výchozí pravidla pro čistou izolaci testů.

Oba spouštěče vracejí `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamů `GuardrailExecutionResult`, které obsahují
pro jednotlivá ochranná pravidla pole `blocked`, `skipped`, `modified`, `error` a `meta`,
užitečná pro trasování.

### Zakázání ochranných pravidel pro jednotlivé požadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` shromažďuje
deduplikovaný seznam názvů ochranných pravidel, která mají být pro aktuální
požadavek přeskočena. Zdroje (všechny jsou volitelné a všechny se slučují):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v těle požadavku (na nejvyšší úrovni)
- `metadata.disabledGuardrails` v těle požadavku
- Hlavička `x-omniroute-disabled-guardrails` (nebo starší
  `x-disabled-guardrails`)

Hodnoty mohou být pole řetězců nebo řetězec oddělený čárkami; názvy jsou
normalizovány na malá písmena ve formátu kebab-case (`pii_masker` → `pii-masker`). Výsledek
je předán registru prostřednictvím `context.disabledGuardrails`, který přeskočí
odpovídající ochranná pravidla (`skipped: true` v `results`).

## Pořadí zpracování

Pro každý požadavek procházející přes `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sestaví seznam vynechaných ochranných mechanismů z klíče API, těla požadavku
   a hlaviček.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí ochranné mechanismy ve vzestupném
   pořadí priorit:
   - Zakázané ochranné mechanismy se zaznamenají jako `skipped`.
   - Metoda `preCall` každého ochranného mechanismu může přepsat datovou část pomocí `modifiedPayload`.
   - První výskyt `block: true` okamžitě ukončí řetězec a obslužná rutina vrátí
     odpověď o zamítnutí ochranným mechanismem.
3. (Případně přepsaná) datová část pokračuje do kombinovaného směrování a odeslání
   nadřazené službě.
4. Po sestavení odpovědi spustí `guardrailRegistry.runPostCallHooks(...)`
   stejný řetězec nad odpovědí. Hodnota `block: true` v této fázi zahodí odpověď
   nadřazené služby.

Ochranné mechanismy, které vyvolají výjimku, se zaznamenají s `error: <message>` a zaprotokolují prostřednictvím
`logger.warn`, ale řetězec pokračuje — záměrně tedy funguje v režimu fail-open.

## Konfigurace

Proměnné prostředí načítané vestavěnými ochrannými mechanismy:

| Proměnná                              | Používá ji                | Účinek                                                                                                        |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Nastavením na `false` se detekce zcela zakáže.                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Zásady pro injekce: `warn`, `block` nebo `log`. Zastaralá hodnota `redact` text injekce nepřepisuje.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim ochrany proti injekcím; zároveň příznak funkce v DB, který **přepisuje** proměnné prostředí (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimální závažnost, kterou `MODE=block` odmítne: `high` (výchozí), `medium` nebo `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastaralý alias pro `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Je-li nastaveno na `true`, údaje PII v požadavku se začerní (nezávisle na režimu injekcí).                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (na výstupu) | Řídí chování maskování na straně odpovědi.                                                                    |

Ochranné mechanismy Modality Bridge načítají běhovou konfiguraci z úložiště nastavení
založeného na DB (`getSettings()`), nikoli z proměnných prostředí. Primární klíče pro obraz jsou
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Zastaralé klíče
`visionBridge*` jsou přijímány pouze jako zdokumentovaný záložní zdroj pro čtení během jednoho cyklu;
zápisy z řídicího panelu používají primární klíče. Výchozí hodnoty a záložní
resolver se nacházejí v `src/shared/constants/modalityBridgeDefaults.ts`, přičemž zastaralé
konstanty zůstávají zachovány v `src/shared/constants/visionBridgeDefaults.ts`.

Zvuk používá `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips` společně se sdílenými
nastaveními `modalityBridgeCache*`. Zvuk nemá záložní podporu zastaralých klíčů, protože tyto
klíče byly zavedeny se schématem Modality Bridge.

Video používá `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout` společně se sdílenými nastaveními `modalityBridgeCache*`.
Ve výchozím nastavení je zakázáno, protože FFmpeg/ffprobe jsou volitelné provozní
závislosti a popisování snímků zvyšuje latenci a náklady na model.

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

1. Vytvořte `src/lib/guardrails/myGuardrail.ts`, který rozšiřuje `BaseGuardrail`.
2. Implementujte `preCall` a/nebo `postCall`.
3. Buď jej zaregistrujte při importu (přidáním z `registerDefaultGuardrails`), nebo
   za běhu zavolejte `guardrailRegistry.register(...)` — registr nahradí
   jakýkoli dřívější guardrail se stejným normalizovaným názvem.
4. Přidejte testy do `tests/unit/` (existující příklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testování

Mezi testy použijte `resetGuardrailsForTests()`, abyste vždy začínali ze známého stavu.
Předejte `{ registerDefaults: false }`, chcete-li začít s prázdným registrem a
zaregistrovat pouze testované guardraily. Vision Bridge podporuje vkládání závislostí
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge zpřístupňuje ekvivalentní
rozhraní pro nastavení, schopnosti, výběr modelu STT, kontrolu přihlašovacích údajů
a přepis. Testy tak mohou ověřovat oba toky bez přístupu k databázi nebo síti.

## Viz také

- `src/lib/guardrails/` — implementace
- `src/shared/utils/inputSanitizer.ts` — sdílený detektor zajišťující
  detekci prompt injection a maskování PII
- `src/shared/constants/visionBridgeDefaults.ts` — výchozí hodnoty Vision Bridge a
  seznam modelů s vynuceným přemostěním
- `src/shared/constants/modalityBridgeDefaults.ts` — sdílené výchozí hodnoty běhového prostředí Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonální vrstva (circuit breaker, intervaly zklidnění)
- `docs/reference/ENVIRONMENT.md` — úplný přehled proměnných prostředí

## Pokrytí tras ochranou proti injection a red-team testování (Fáze 8 · Blok D)

Ochrana proti injection (`createInjectionGuard` / `withInjectionGuard`) pokrývá všechny trasy,
které přijímají uživatelské prompty. Respektuje `INJECTION_GUARD_MODE` (výchozí `warn` = pouze protokolování;
`block` = vrátí HTTP 400 `SECURITY_001`).

| Typ              | Trasy                                                                                                                                                | Výchozí režim |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (stávající) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativní      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Extrakce textu (`extractMessageContents`) pokrývá `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testování (každou noc, `nightly-llm-security.yml`):** promptfoo ověřuje, že každá trasa blokuje
korpus OWASP-LLM v režimu `INJECTION_GUARD_MODE=block`; garak spouští sondy (bez tajného klíče se přeskočí).
`moderations` je zahrnuto kvůli konzistenci — provozovatelé jej mohou v režimu blokování vyjmout pomocí
`resolveDisabledGuardrails`.

Noční pracovní postup (`.github/workflows/nightly-llm-security.yml`, cron + ruční
spuštění) obsahuje dvě úlohy:

- **`promptfoo-guard` (blokující)** — spouští `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý nepřátelský případ (např. „ignoruj všechny
  předchozí instrukce…“, jailbreaky ve stylu DAN) ověřuje, že odpověď obsahuje
  `error.code === "SECURITY_001"`, tj. že ochrana požadavek skutečně odmítla.
- **`garak` (informativní)** — spouští garak `--probes promptinject,dan,leakreplay`
  proti lokální instanci OmniRoute (`http://localhost:20128/v1`). Je podmíněna
  tajným klíčem poskytovatele (`PROMPTFOO_PROVIDER_KEY`); pokud není k dispozici, korektně se přeskočí a je doplněna
  o `|| true`, takže podá hlášení, aniž by způsobila selhání CI.

Pokrytí pomocné funkce ochrany (`createInjectionGuard` / `withInjectionGuard`)
zahrnuje každou trasu `/v1` přijímající prompt; text promptu se získává z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomocí
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
