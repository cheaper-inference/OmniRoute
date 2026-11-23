# Guardrails (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Naposledy aktualizované:** 2026-08-29 — v3.8.51 (pôvod prepisu Video Bridge deklaruje volajúci,
> server ho zatiaľ neoveruje — spresnené podľa #11661)

Guardraily vynucujú bezpečnosť, pravidlá a transformácie obsahu na rozhraní
medzi OmniRoute a nadradenými poskytovateľmi. Každý guardrail môže kontrolovať
(a voliteľne odmietnuť, transformovať alebo anotovať) dátové časti požiadaviek
(`preCall`) a odpovede nadradených poskytovateľov (`postCall`).

Systém je navrhnutý ako **fail-open**: ak guardrail počas vykonávania vyhodí
výnimku, register zaznamená chybu a namiesto zlyhania požiadavky pokračuje
ďalším guardrailom. Blokovanie je explicitné rozhodnutie (`block: true`), nikdy
nie náhoda.

## Vstavané ochranné mechanizmy

Register pri importe automaticky načíta šesť ochranných mechanizmov v poradí podľa priority
(pozrite si `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Názov               | Fáza(-y)       | Súbor                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižšie čísla priority sa vykonávajú **ako prvé**.

### Premostenie obrazového vstupu (`visionBridge.ts`) — Premostenie modalít PR-1

Zachytáva požiadavky obsahujúce obrázky, ktoré sú určené pre **modely bez podpory obrazového vstupu**, a buď
presmeruje celú požiadavku na model s podporou obrazového vstupu, alebo pred
volaním nadradenej služby nahradí obrazové časti textovými opismi vytvorenými
konfigurovateľným modelom s podporou obrazového vstupu. Poskytovatelia podporujúci
iba text tak môžu transparentne spracúvať multimodálne dátové časti.

Priebeh:

1. Preskočí spracovanie, ak cieľový model už podporuje obrazový vstup (pokiaľ sa nenachádza v
   zozname modelov s vynúteným premostením `isVisionBridgeForcedModel`).
2. Extrahuje obrazové časti pomocou `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ktorá deleguje spracovanie na **zjednotený
   detektor médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný
   zdroj pravdy zdieľaný s filtrom kompatibility kombinácií.
   Extrakcia je obmedzená zoznamom povolených tvarov častí najvyššej úrovne,
   ktoré môže `replaceImageParts` vložiť späť (zmluva extrakcia↔nahradenie): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` a Responses API `input_image`. Vnorené zhody a
   tvary obsahujúce iba indikátor sú určené pre filter kombinácií a nikdy sa
   neextrahujú. Ak sa žiadne nenájdu, spracovanie sa preskočí.
3. Určí konfiguráciu za behu pomocou `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové kľúče nastavení `modalityBridge*`
   majú prednosť; staršie kľúče `visionBridge*` zostávajú ako **záložná možnosť na
   jeden cyklus** (okno na návrat k predchádzajúcej verzii). Ak je premostenie
   zakázané, spracovanie sa preskočí ešte pred prechádzaním médií.
4. Volič režimu (`modalityBridgeVisionMode`, pozrite si tabuľku nižšie) rozhodne
   medzi presmerovaním a opisom. Presmerovanie vráti `modifiedPayload`, v ktorom
   sa zmení iba `model`, spolu s metaúdajmi `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta opisu: obmedzí počet obrázkov na `maxImages`, zostaví výzvu zohľadňujúcu
   úlohu, skontroluje vyrovnávaciu pamäť opisov, zavolá model s podporou obrazového
   vstupu **paralelne** (`Promise.allSettled`) a na ich miesto vloží textové časti
   `[Image N]: <description>`. Neúspešný opis vráti `null` a pôvodná obrazová časť
   sa **zachová** (#4012) — okrem cesty opisu kombinácie, keď zlyhali všetky
   opisy; vtedy sa pri potvrdenej nadradenej službe bez podpory obrazového vstupu
   použije zástupný text `(unavailable — no vision-capable provider connected)`
   (#8430).
6. Vráti `modifiedPayload` + metaúdaje (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Volič režimu (`modalityBridgeVisionMode`)

| Režim      | Predvolený | Správanie                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Pôvodná heuristika bez zmien (#6640/#7204): modely, ktoré nie sú kombinované, a modely `auto/` sa presmerujú na najlepší model s podporou obrazového vstupu, pokiaľ pôvodný model už nemá použiteľné prihlasovacie údaje (vtedy sa vytvorí opis); kombinované ciele vždy vytvárajú opis.                                                                    |
| `describe` |            | Vždy vytvorí opis — blok presmerovania sa úplne preskočí; vždy odpovedá model vybraný používateľom.                                                                                                                                                                                                                                                         |
| `reroute`  |            | Vynúti presmerovanie: kontrola zachovania modelu s prihlasovacími údajmi sa obíde. Kontrola prihlasovacích údajov **cieľa** presmerovania naďalej platí — ak neexistuje žiadny použiteľný cieľ s podporou obrazového vstupu, požiadavka prejde na vytvorenie opisu, aby sa nespracované obrázky nikdy nedostali do backendu podporujúceho iba text (#8430). |

Vynútené režimy ukončia rozhodovanie **pred** spustením automatickej heuristiky;
správanie režimu `auto` je na úrovni bajtov identické s ochranným mechanizmom
spred PR-1.

#### Rozsah kľúča API (`visionBridgeKeyScope.ts`)

Keď kľúč API volajúceho obmedzuje `allowedConnections`, fondy kvót
(`allowedQuotas`) alebo modely (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), premostenie vyberie
na presmerovanie a vytváranie opisov iba modely, ktoré môže daný kľúč používať,
a iba v pripojeniach, ktoré môže daný kľúč používať. Volanie na vytvorenie opisu
potom vždy prechádza cez samoslučku OmniRoute s hlavičkou
`x-omniroute-self-loop-key-id`, takže prijímajúca požiadavka chatu znova uplatní
pravidlá daného kľúča pre pripojenia a modely. `enforceApiKeyPolicy()` túto
hlavičku rešpektuje iba spolu s bearerom samoslučky, takže môže prístup iba
zúžiť, a identifikátor, ktorý nemožno rozpoznať, sa odmietne.

Ak pre daný kľúč nie je povolený žiadny model s podporou obrazového vstupu,
cesta opisu ustúpi a požiadavka prejde bez zmeny, čo je rovnaké správanie
ponechávajúce systém otvorený pri zlyhaní ako pri zakázanom ochrannom mechanizme
(metaúdaje `{ skipped: true, reason: "no_permitted_vision_model" }`).
Požiadavky bez kľúča a kľúče bez týchto obmedzení sa správajú presne ako
predtým.

#### Výzva na opis zohľadňujúca úlohu (`modalityBridgeVisionTaskAware`)

Predvolená hodnota je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pripája
text **poslednej správy používateľa** (skrátený na 500 znakov) k základnej
výzve na opis, čím smeruje opis k tomu, na čo sa používateľ skutočne pýtal
(vzor codex-vision-proxy), a žiada model videnia o prepis viditeľného
textu. Ak je príznak vypnutý — alebo chýba text používateľa — základná výzva sa použije bez zmien.

Vlastná požiadavka kompatibilná s OpenAI v samoslučke opisu (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` —
bezpodmienečne, pre každého volajúceho/poskytovateľa, bez závislosti od akéhokoľvek signálu klienta.
Vzorkovanie s nízkou úrovňou detailov znižuje presnosť OCR presne pri úlohe
prepisu textu, ktorú táto výzva požaduje, preto samotné volanie opisu vždy žiada vysokú
úroveň detailov bez ohľadu na to, akú úroveň detailov používala pôvodná prichádzajúca požiadavka. Toto
ovplyvňuje iba telo internej požiadavky na opis; nemení spôsob, akým
OmniRoute odovzdáva vlastnú hodnotu `image_url.detail` volajúceho v primárnej požiadavke —
táto predvolená hodnota sa aplikuje samostatne a iba pre rozpoznaných klientov OpenCode vo
funkcii `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Vetva
s prenosovým formátom Anthropic v samoslučke opisu nemá pole `detail`
a neovplyvňuje ju ani jedna z týchto predvolených hodnôt.

#### Limit výstupu opisu (`modalityBridgeVisionMaxChars`)

| Kľúč                           | Predvolená hodnota | Rozsah              |
| ------------------------------ | ------------------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`                | `0` alebo 100–50000 |

`0` (predvolená hodnota) znamená **bez limitu** — opis vrátený funkciou
`callVisionModel()` sa odovzdá bez úprav, čím sa zachová existujúce
správanie. Akákoľvek hodnota v rozsahu 100–50000 skráti opis a pridá
príponu `…` predtým, než sa vloží späť ako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Zvýšte ju pri úlohách OCR s množstvom detailov, pri ktorých nadväzujúci model potrebuje
úplný prepis; znížte ju, aby ste obmedzili spotrebu tokenov pri príliš obšírnych modeloch videnia.
Pole na ovládacom paneli sa nachádza na karte Vision v paneli Advanced
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a každú
hodnotu od 1 do 99 zvýši na minimálnu hodnotu 100, pričom explicitnú hodnotu `0`
ponechá nezmenenú — `0` je samostatne platná hodnota Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nielen
predvolená hodnota označujúca „nenastavené“.

#### Vyrovnávacia pamäť opisov (`modalityBridge/bridgeCache.ts`)

Procesom zdieľaná vyrovnávacia pamäť LRU + TTL v pamäti pre výstupy opisov.
Kľúč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
rámcovaním pomocou dĺžkových prefixov (bez kolízií na hraniciach polí). Komponent modelu predstavuje
**nakonfigurovaný** model mosta, nie model, ktorý skutočne odpovedal —
`callVisionModel` môže interne použiť záložný model a vytváranie kľúčov podľa jednotlivých pokusov by
fragmentovalo vyrovnávaciu pamäť. Neúspešné opisy sa nikdy neukladajú do vyrovnávacej pamäte. Nastavenia:

| Kľúč                            | Predvolená hodnota | Rozsah  |
| ------------------------------- | ------------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`             | —       |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000 |

#### Normalizácia vzdialených obrázkov (samoslučka opisu/načítanie base64)

Keď most sám načítava **vzdialený** obrázok — pri samostatnom volaní opisu Anthropic
a pri konverzii do base64 vo formáte claude
(`ensureBase64ImagesForClaudeWire`), v oboch prípadoch prostredníctvom
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledný dátový
identifikátor URI sa pred vložením do požiadavky modelu videnia spracuje funkciou `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`). Nadmerne veľké obrázky sa zmenšia tak, aby ich **dlhšia hrana mala 2048 px** (v súlade
s limitom zmenšenia, ktorý OpenAI/Anthropic už používajú na strane servera), čím sa zníži
objem odosielaných dát a latencia bez zmeny toho, čo model videnia vidí. Zmena veľkosti
používa `sharp`, načítaný dynamickým importom: na platforme, kde sa jeho natívny
binárny súbor nepodarí načítať, `normalizeDataUri()` **nikdy nevyvolá výnimku** — namiesto toho
bez úprav odovzdá pôvodné bajty, takže cesta opisu/konverzie do base64
zostane vždy funkčná. Dáta, ktoré nie sú obrázkom (načítanie, ktoré nevrátilo
dekódovateľný obrázok), sa tiež odovzdajú bez zmien. Táto normalizácia
sa vzťahuje iba na obrázky, ktoré most načíta pre svoje vlastné samostatné volanie — nikdy
sa nepoužije na nespracovaný, priamo odovzdávaný obsah volajúceho, v súlade so
zásadou úprav iba po explicitnom povolení (Pevné pravidlo č. 20).

#### Schéma nastavení + migrácia

Nové kľúče `modalityBridge*` sa overujú pomocou Zod v `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` a skupina
`modalityBridgeAudio*`, ktorú používa Audio Bridge. Migrácia
`141_modality_bridge_settings.sql` kopíruje existujúce staršie hodnoty
`visionBridge*` do zodpovedajúcich nových kľúčov (idempotentne, nikdy neprepíše
hodnotu `modalityBridge*` nastavenú operátorom); staršie kľúče zostanú
akceptované ako záložný zdroj na čítanie počas jedného cyklu vydania.

#### Hlavička transparentnosti + štatistiky

Odpovede transformované opisom obsahujú
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(vytvorenú funkciou `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`,
pridanú funkciou `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Presmerované požiadavky nedostanú **žiadnu** hlavičku — ich obsah zostal nezmenený a zámena modelu
je už viditeľná v poli `model` tela odpovede.

`GET /api/modality-bridge/stats` (autentifikácia na správu, rovnaká úroveň ako
`GET /api/settings`) vracia počítadlá jednotlivých modalít uložené v pamäti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pre `vision`, `audio` a
`video`. `averageLatencyMs` používa ako menovateľ `latencySamples`, nie všetky
pokusy; operácia bez merania času nevytvorí fiktívnu vzorku s nulovým počtom
milisekúnd. `bridged` zostáva spätne kompatibilným aliasom pre úspešné
konverzie; neúspešné pokusy ho nezvyšujú.
Počítadlá sa zámerne vynulujú po reštarte procesu
(telemetria, nie účtovníctvo).

#### Konfigurácia ovládacieho panela

Vyhradená stránka ovládacieho panela je
`/dashboard/settings/modality-bridge`. Jej karty `Vision`, `Audio`
a `Video`, ktoré možno adresovať pomocou URL, pri prepínaní hodnoty `tab`
zachovávajú parametre dopytu.
Karta Vision sprístupňuje zapnutie, režim, výber modelu (vrátane automatického
predvoleného modelu), výzvy zohľadňujúce úlohu, pokročilé limity časového
limitu/obrázka/dĺžky opisu/vyrovnávacej pamäte, prevádzkové
počítadlá a chránenú vzorovú požiadavku. Karta Audio je takisto aktívna:
sprístupňuje zapnutie, výber modelu určeného iba pre STT s možnosťou Auto,
limity časového limitu/maximálnej dĺžky klipu, počítadlá zvuku a vzorový test
`input_audio`. Karta Video je funkčná: hlási prevádzkový stav FFmpeg/ffprobe —
jeden zo štyroch explicitných stavov používateľského rozhrania (`unknown`, kým
prebieha sonda alebo ju nebolo možné dokončiť, `restricted` na hostiteľovi
ovládacieho panela mimo rozhrania loopback, kde sa sonda preskočí na strane
klienta, `unavailable` po vykonaní sondy a potvrdení neprítomnosti alebo
`available` s verziami FFmpeg/ffprobe) — zachováva nastavenia
zapnutia/modelu/snímok/videa/časových limitov, filtruje výber modelu na modely
podporujúce obrazové vstupy a sprístupňuje počítadlá videa.

Pôvodná karta Vision Bridge v nastaveniach AI je odkazom na novú stránku
z dôvodu kompatibility; už neobsahuje druhú kópiu formulára. Media Providers
tiež odkazuje pracovné postupy Image-to-Text a Speech-to-Text na príslušné
karty Modality Bridge bez odstránenia existujúceho testovacieho prostredia
Speech-to-Text.

**Obídenie kontroly prijatia pre spätnú slučku:** keď sa volanie opisu smeruje
cez vlastnú spätnú slučku `/v1` systému OmniRoute (neštandardný model
poskytovateľa), čiastková požiadavka odošle
`x-omniroute-admission-bypass: internal` a autentifikuje sa pomocou zisteného
prístupového údaja spätnej slučky — lokálneho zástupného kľúča `sk_omniroute`
v lokálnom režime alebo kľúča prostredia `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` nakonfigurovaného operátorom (#1350), aby nasadenia
s `REQUIRE_API_KEY=true` mohli aj naďalej vykonať volanie opisu. Obídenie sa
akceptuje iba pre tieto presné prístupové údaje, takže externí klienti nemôžu
použiť túto hlavičku na preskočenie kontroly prijatia.

Staršie predvolené hodnoty sa nachádzajú v
`src/shared/constants/visionBridgeDefaults.ts`; nové predvolené hodnoty
režimu/funkcie zohľadňujúcej úlohu/vyrovnávacej pamäte a resolver nastavení sa
nachádzajú v `src/shared/constants/modalityBridgeDefaults.ts`. Ochranný
mechanizmus sprístupňuje možnosť konštruktora `deps`, aby testy mohli vložiť
falošné implementácie `getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytáva chatové požiadavky obsahujúce zvuk predtým, než sa dostanú k cieľu,
o ktorom nie je známe, že prijíma zvukový vstup. Chatovú požiadavku nikdy
nepresmeruje: zvukové časti sa prepíšu prostredníctvom existujúceho
multipartového koncového bodu kompatibilného s OpenAI a zvolený chatový model
pokračuje s textovými prepismi.

Postup:

1. Zisti `supportsAudio` prostredníctvom `getResolvedModelCapabilities()`.
   Explicitné metadáta registra poskytovateľov majú prednosť, potom nasledujú
   statické metadáta modelu a napokon synchronizované `modalities_input`.
   Deklarovaný zoznam vstupov bez `audio` má hodnotu `false`; ak neexistujú
   žiadne údaje o schopnostiach, zostáva hodnota `null`. Hodnoty `false` aj
   `null` aktivujú konzervatívny most, zatiaľ čo `true` ho obíde.
2. Načítaj nastavenia `modalityBridgeAudio*` a pomocou zdieľaného detektora
   `detectMediaParts()` extrahuj z každej správy nahraditeľné zvukové časti
   najvyššej úrovne. Podporované formáty prenosu sú OpenAI `input_audio`,
   `audio_url` a `source.media_type: "audio/*"`. Vnorený zvuk sa zistí na účely
   smerovania, ale cesta nahradenia ho neodstráni. Množstvo práce je obmedzené
   hodnotou `modalityBridgeAudioMaxClips`; neskoršie časti zostanú nedotknuté.
3. Rešpektuj nakonfigurovanú hodnotu `provider/model` alebo nechaj
   `selectAudioBridgeModel()` prejsť `AUDIO_TRANSCRIPTION_PROVIDERS`
   v stabilnom poradí katalógu a vybrať prvý model s použiteľným aktívnym
   prístupovým údajom poskytovateľa.
4. `callAudioTranscription()` skonvertuje zvuk vo formáte base64/data-URI na
   multipartový `file` alebo stiahne vzdialený `audio_url` prostredníctvom
   ochrany odchádzajúcich spojení povoľujúcej iba verejné adresy, s pripnutím
   DNS a limitom 25 MB. Potom odošle súbor a vybraný model metódou POST do
   lokálnej spätnej slučky `/v1/audio/transcriptions`, autentifikovanej pomocou
   `resolveSelfLoopBearer()`. Existujúca trasa prepisu vykoná bežné vyhľadanie
   prístupových údajov, spracovanie časového obmedzenia/obmedzenia frekvencie
   a odoslanie poskytovateľovi.
5. Úspešné volania nahradia svoje časti textom `[Audio N]: <transcript>`.
   Volania sa spúšťajú pomocou `Promise.allSettled`: jednotlivé zlyhanie
   zachová pôvodnú zvukovú časť (zmluva #4012). Ak zlyhajú všetky volania
   a je preukázané, že cieľ má `supportsAudio === false`, časti sa zmenia na
   `[Audio N]: (unavailable — no STT provider connected)` (zmluva #8430).
   Pri neznámom cieli (`null`) zostane výsledok pri zlyhaní všetkých volaní
   nedotknutý. Cieľ, pri ktorom je preukázané, že podporuje iba text a nemá
   použiteľný prístupový údaj STT, dostane rovnaký explicitný zástupný text bez
   vykonania sieťového volania.

Úspešné prepisy používajú vyrovnávaciu pamäť LRU/TTL Modality Bridge spoločnú
pre celý proces. Kľúč kombinuje odkaz na zvuk, stabilný názov operácie
`audio-transcription` a vybraný model STT; zlyhania sa nikdy neukladajú do
vyrovnávacej pamäte. Pokusy o spracovanie zvuku aktualizujú zdieľané počítadlá
`bridged`, `cacheHits`, `failures` a `lastUsedAt`.
Transformované odpovede obsahujú
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nedotknuté požiadavky nedostanú segment Audio Bridge.

Nastavenia za behu sú uložené v databáze a overované pomocou Zod:

| Kľúč                          | Predvolená hodnota | Rozsah                   |
| ----------------------------- | ------------------ | ------------------------ |
| `modalityBridgeAudioEnabled`  | `true`             | —                        |
| `modalityBridgeAudioModel`    | `""`               | Automaticky alebo ID STT |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000              |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10                     |

Zdieľaná vyrovnávacia pamäť zostáva riadená nastaveniami `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Premostenie videa (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytáva videočasti najvyššej úrovne v `messages` rozhrania Chat Completions a
v `input` rozhrania Responses API pred volaním cieľa bez známej natívnej podpory
videa. Podporované formáty sú `input_video`, `video_url`, `video_source`, URL
adresy HTTPS a dátové URI `data:video/*;base64,...`. Samotné názvy súborov v texte
sa nepovažujú za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) zabezpečuje prechádzanie
požiadavky, kontrolu schopností a zásad, agregáciu jednotlivých požiadaviek a
dátový obsah odpovede. Spracovanie jednotlivých videí — získanie, vyrovnávacia
pamäť celého výsledku, opis sekvencie snímok (ktorý zlučuje akýkoľvek volajúcim
deklarovaný prepis zvuku) a metriky, prerušenie a vyčistenie jednotlivých pokusov
— je skryté za `processVideoPart` v `videoBridgePipeline.ts`, ktoré sa volá raz
pre každú videočasť v slučke `preCall`. Tento modul tiež definuje explicitné
rozhrania portov `VideoMediaBrokerPort` (získavanie bajtov a extrahovanie
vzorkovaných snímok), `VideoAudioTranscriptionPort` (zlúčenie volajúcim
deklarovaného prepisu zvuku s titulkami vzorkovaných snímok) a
`VideoDrilldownPort` (hranica perzistencie podrobného skúmania snímok; zatiaľ nie
je zapojená do `processVideoPart` — položky podrobného skúmania dnes zapisuje iba
samostatná trasa `/api/modality-bridge/video/drilldown`).

Verejná cesta požiadavky `/v1` nikdy neimportuje ani nevolá podproces. Vzdialené
videá sa sťahujú s limitom 50 MiB; vložené videá vo formáte base64 majú
konzervatívny limit 36 MiB dekódovaných dát na jedno video, aby obálka modelu,
správ a rámcovania mohla zostať v rámci verejného limitu 50 MiB pre prijatie
požiadavky JSON. Dĺžka vložených dát a odhady dekódovanej veľkosti sa kontrolujú
pred pridelením pamäte. Na počiatočnej vzdialenej URL adrese aj pri každom
presmerovaní sa vyžaduje HTTPS, pričom sa používa existujúca ochrana odchádzajúcich
spojení len na verejné adresy s pripnutím DNS. Bajty potom prechádzajú cez presnú
internú hranicu sprostredkovateľa `POST /api/modality-bridge/video/extract`. Táto
trasa je zároveň `LOCAL_ONLY` aj `SPAWN_CAPABLE`, prijíma iba autentifikovanú
požiadavku dôveryhodnej spätnej slučky platnú pre daný proces a nikdy neprijíma
URL adresu, cestu k súboru, spustiteľný súbor ani zoznam argumentov. Reťazec
spracovania veľkosti tela API a inkrementálny čítač tela obslužnej rutiny
nezávisle vynucujú limit 50 MiB pre vstup sprostredkovateľa. Jeho ohraničený rad
spracúva vždy jednu extrakciu, povoľuje štyri čakajúce úlohy a obmedzuje čakajúci
vstup na 100 MiB.

V rámci sprostredkovateľa číta `ffprobe` súkromný lokálny súbor; pevný zoznam
povolených formátov vylučuje formáty zoznamov prehrávania a manifestov. Pri
povolených kontajneroch rodiny MOV zostávajú externé odkazy na dáta MOV predvolene
zakázané a pevne stanovený príkaz ich nepovoľuje. `ffprobe` aj `ffmpeg` používajú
zoznam povolených protokolov obmedzený iba na `file`, jedno vlákno, pevné polia
argumentov, žiadny shell a spustiteľné súbory vyhľadané v `PATH`. Prúdy obrázkov
obalov pripojených k súboru nie sú kandidátmi na prehrávanie. Všetky prehrateľné
prúdy musia spĺňať limity a pred deterministickým záložným výberom prúdu
s najnižším indexom sa uprednostňuje explicitný predvolený prúd. Videá sú
obmedzené na 600 sekúnd, 8 192 pixelov na rozmer a 33 554 432 zdrojových pixelov.
FFmpeg vzorkuje 1–16 snímok JPEG zo stredov intervalov, zmenšuje dlhšiu hranu
najviac na 1 024 pixelov bez zväčšovania menších vstupov a nikdy nedostáva URL
adresu. Predvolenou metódou vzorkovania je `uniform`. Voliteľné zásady
`scene_aware` a experimentálne `segment_aware` vykonávajú jeden dodatočný pevne
stanovený prechod FFmpeg cez už overený lokálny prúd, vyberajú ohraničené časové
značky scén `showinfo` a pri zlyhaní detektora, prekročení časového limitu,
nesprávne vytvorenom výstupe alebo prázdnej množine kandidátov sa deterministicky
vrátia k rovnakým rovnomerným stredom intervalov. Režim zohľadňujúci segmenty
prideľuje vzorky zo stredov intervalov pomerne podľa overených intervalov scén;
dôkazy a záložné správanie režimu zohľadňujúceho segmenty sú podrobne opísané
nižšie. Pevný limit 16 snímok sa pri každej zásade uplatňuje po výbere. Ak má
požiadavka zohľadňujúca scény rozpočet iba na jednu snímku, použije rovnomerný
stred aktívneho okna celého videa alebo okna zaostrenia a uvedie
`policyEffective: uniform`: jediná vybraná snímka scény nedokáže zachovať oba
časové konce. Volajúci môže voliteľne poskytnúť konečné okno zaostrenia
(`start`/`end` v sekundách); hranice sa orezávajú podľa trvania média, obrátené
alebo nekonečné okná sa odmietajú a všetky zásady vzorkovania sa vykonávajú iba
v rámci normalizovaného intervalu. Výsledné okno je zahrnuté v metadátach
vzorkovania aj v nedôveryhodnej predpone opisu, aby nadväzujúce modely dokázali
rozlíšiť zameraný úryvok od celej časovej osi.

Sémantické zameranie titulkov je samostatné explicitné nastavenie. Predvolený
režim analýzy `full` zachováva existujúcu výzvu pre snímku a nikdy neposiela text
požiadavky modelu titulkov. V režime `focused` číta premostenie iba najnovší
neprázdny obsah `text`/`input_text` vytvorený používateľom z rovnakého kontajnera
Chat alebo Responses, normalizuje ho do NFC, zlučuje riadiace znaky a biele znaky
a obmedzuje ho na 500 kódových bodov Unicode. Prázdny výsledok sa vráti k presnej
výzve režimu `full`. Použiteľná pomôcka sa serializuje ako JSON vo vyhradenom
bloku nedôveryhodného používateľského kontextu a môže iba uprednostňovať
pozorovateľné podrobnosti; nemôže zrušiť samostatné upozornenie zakazujúce riadiť
sa pokynmi viditeľnými alebo počuteľnými v médiu. Textové zameranie nikdy
neodvodzuje `start`/`end` ani nemení časový vzorkovač.

#### FU-07 štrukturálne dôkazy segmentov

`segment_aware` používa jeden ohraničený preanalytický prechod cez už overený
lokálny videostream. Pevne stanovený reťazec filtrov najskôr zmenší šírku najviac
na 320 pixelov, zistí zmeny scén a zamrznuté intervaly a potom vzorkuje frekvenciou
1 snímka za sekundu na určenie rozmazania, priemernej luminancie a
priestorových/časových informácií. Prechod je obmedzený na 600 štrukturálnych
vzoriek, jedno vlákno FFmpeg/filtra, rovnaký zoznam povolených protokolov iba
s protokolom `file` a zoznamy povolených kontajnerov, limit výstupu procesu 1 MiB
a najviac 30 sekúnd v rámci zdieľaného prerušenia/termínu brokera. Nikdy
neprijíma príkaz, filter, cestu ani URL z požiadavky.

Štrukturálne hodnoty sú deterministickým dôkazom zo vzorkovania, nie sémantickým
porozumením videu. Neodvodzujú subjekty, činnosti, titulky, reč ani zámer
používateľa. Hranice scén a zamrznutí tvoria segmenty; pokrytie zamrznutia,
rozmazanie, expozícia, priestorové detaily a časové zmeny ovplyvňujú iba to,
ako sa pridelí existujúci rozpočet 1–16 snímok. Úplne zamrznutý segment je
obmedzený na jednu snímku, zatiaľ čo nezamrznuté segmenty súťažia o zostávajúci
rozpočet. Keď počet hraníc prekročí počet snímok, zachová sa rovnomerné pokrytie
časovej osi, aby rýchle skoré strihy nemohli skryť dlhý koncový segment. Hranice
scén v rámci 1-sekundového analytického rozlíšenia hranice zamrznutia sa zlúčia.

Chýbajúce filtre, poškodené/prázdne dôkazy, chyba detektora alebo vypršanie
časového limitu ohraničenej preanalýzy vedú k bezpečnému návratu k presnej
politike rovnomerných stredových bodov. Prerušenie volajúcim alebo termín
brokera nevedú k takémuto návratu: ukončia prebiehajúci podproces, zabránia
neskoršej extrakcii snímok a súkromný dočasný strom sa odstráni v bloku
`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické skutočné
testovacie dáta FFmpeg na vyhodnotenie úspor volaní titulkovania po odstránení
duplicít, prideľovania rozpočtu pri hustom pohybe, dôkazov rozmazania/expozície/SI-TI,
rýchlych strihov s dlhým koncom a falošne pozitívnych výsledkov pri postupnom
prelínaní. Zaznamenáva reálny čas preanalýzy a tam, kde je k dispozícii
`/usr/bin/time`, aj čas CPU podradeného procesu a maximálnu RSS. Jeho kontroly
kvality sú iba štrukturálne orákulá. Kvalita skutočného modelu titulkovania
zostáva `HOLD`, pretože tento testovací nástroj nemá autorizovaný koncový bod
ani nemenného hodnotiteľa. Finančné úspory tiež zostávajú `HOLD`, pokiaľ
`--caption-cost-per-call-usd` neposkytne explicitný kladný odhad nákladov na
jedno volanie; skript nikdy nevytvára ani jeden z týchto výsledkov umelo.

Každá snímka je obmedzená na 4 MiB, všetky nespracované snímky spolu na 23 MiB
a serializovaná odpoveď brokera na 32 MiB. Súkromný dočasný adresár sa odstráni
v bloku `finally`. OmniRoute neobsahuje FFmpeg a neprijíma vlastnú cestu
k spustiteľnému súboru. Pred titulkovaním most aplikuje konzervatívny prechod
vizuálneho odstraňovania duplicít: každý JPEG sa zmenší na 16×16 buffer
v odtieňoch sivej a porovná sa iba s poslednou zachovanou snímkou. Pri
požadovanom rozpočte titulkovania vyššom než jedna snímka poskytne extrakcia
ohraničenú množinu kandidátov s veľkosťou najviac dvojnásobku tohto rozpočtu,
nikdy však viac než 16 snímok. Požadovaný limit sa aplikuje až po odstránení
duplicít, pričom sa počas konečného preriedenia zachová prvý a posledný vybraný
kandidát, ak je rozpočet aspoň dva. Verziovaná politika
`grayscale-16x16-mean-cells-v2` používa väčšiu z hodnôt priemernej zmeny
luminancie a podielu buniek miniatúry, ktorých normalizovaná zmena je aspoň
0.05. Prahová hodnota duplicity je konštanta 0.04, zvolená kvôli
predvídateľnosti namiesto jej sprístupnenia ako nastavenia za behu. Tento
sekundárny vysokokontrastný signál zachováva malé pohyby a zmeny viditeľného
textu, ktoré môže porovnanie založené iba na priemere skryť. Chyby porovnávača
alebo dekodéra vedú k bezpečnému zachovaniu pokrytia. Výstupné metadáta
rozlišujú extrahovaných kandidátov, úspešne použité snímky a vyradené vizuálne
duplikáty.

Explicitne označená časť videa môže požadovať kontaktný hárok s časovými
značkami. Most vytvorí mriežku JPEG s najviac 4 stĺpcami a 16 snímkami. Každá
512-pixelová bunka napevno vykreslí časovú značku svojho zdroja do
vysokokontrastného spodného pruhu, pričom rovnaké časové značky zostávajú aj
v textových metadátach na následné priradenie a audit. Celý súbor JPEG zostáva
obmedzený na 32 MiB. Ak `sharp` nedokáže dekódovať alebo zostaviť mriežku,
most sa vráti k jednotlivým snímkam JPEG; prerušenie klientom sa aj naďalej
prenáša cez operáciu s hárkom.

Dôkazy na povýšenie sú zámerne oddelené od syntetického mikrob benchmarku
zostavovania. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje
A/B testovací nástroj s verziovanou schémou pre skutočné modely videnia
kompatibilné s OpenAI. Meria tokeny hlásené poskytovateľom, celkovú latenciu
(vrátane zostavenia hárka), počet volaní modelu a zachovanie faktov definovaných
v manifeste. Nespracované odpovede modelu sa do správy nezapisujú; zachovajú sa
iba odtlačky SHA-256 a ID zodpovedajúcich faktov. Testovací nástroj nevykoná
žiadne sieťové ani platené volanie modelu, pokiaľ nie je zadané `--execute-real`
a nakonfigurované `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez
takéhoto explicitného skutočného spustenia zostáva jeho strojovo čitateľný
verdikt `HOLD`; samotné syntetické merania veľkosti dát/počtu volaní nie sú
dôkazom na povýšenie.

Volajúci môžu k podporovanej časti videa pripojiť voliteľné pole
`transcript.cues`, ak už majú zarovnaný text. Každý úsek musí obsahovať `text`,
konečný interval `start`/`end` v rámci zistenej dĺžky a povolený `source`
(`client`, `embedded` alebo `audio-bridge`); predvolená hodnota `confidence`
je `1` a musí zostať medzi `0` a `1`. Presné duplicitné úseky sa zlúčia.
OmniRoute nikdy nespúšťa prepis z týchto metadát: overené úseky sa skopírujú
do opísaného výsledku spolu so zdrojom, mierou istoty a intervalom a vykreslia
sa ako nedôveryhodné pozorovania vedľa titulkov snímok. Neplatný text, text
mimo rozsahu alebo text bez informácie o pôvode sa odmietne namiesto toho, aby
sa zmiešal s prúdom titulkov. Oba kanály prepisu v tele požiadavky normalizujú
dodaný pôvod na `client` vrátane samostatne deklarovaných označení `embedded`
alebo `audio-bridge`. Iba adaptér vlastnený serverom môže priradiť tieto
dôveryhodné označenia prostredníctvom argumentu `trustedSource` dostupného iba
v kóde; pole JSON v požiadavke nemôže tento argument ovplyvniť. Text prepisu
zostáva nedôveryhodným obsahom odvodeným z média bez ohľadu na jeho pôvod
a nikdy nesmie určovať autorizáciu.

Pokročilý volajúci môže pre rovnaké video poskytnúť stopu `audioTranscript`;
považuje sa za text poskytnutý klientom, nie za dôkaz prepisu vykonaného serverom.
Spojovacia vrstva spracúva vizuálne a zvukové pozorovania v rámci
jedného termínu a signálu prerušenia, zoraďuje ich na spoločnej časovej osi, zlučuje
presné duplikáty a hlási čiastočný výsledok, keď uspeje iba jedna strana.
Neplatný `audioTranscript` vedie k tomuto čiastočnému výsledku — vizuálny
opis sa zachová a zvuková vetva zaznamená sanitizovaný kód zlyhania —
namiesto zlyhania celého videa. Dostupnosť jednotlivých vetiev, príznak čiastočnosti
a sanitizované kódy zlyhania sa zachovajú v opísanom výsledku, v metadátach
ochranného mechanizmu (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metadátach vyrovnávacej pamäte výsledkov a v počítadlách
spájania mosta. Predvolená cesta Video Bridge nevyvoláva prevod reči na text
ani nesťahuje druhú kópiu média; bez tejto explicitnej stopy zostáva
iba pri videu.

**Uchovávanie prepisov (#12150 P1).** Toto sa použije automaticky vždy, keď
Video Bridge (ktorý je sám osebe voliteľný) vykreslí položku prepisu — neexistuje
samostatný príznak uchovávania. Keď požiadavka vykreslí ľubovoľnú položku prepisu (volajúcim deklarovaný
`transcript` alebo zlúčený `audioTranscript`), ochranný mechanizmus ju označí ako
`videoBridgeObserved` a vytvorí redigovaný tieň opisu videa —
identické vykreslenie, v ktorom je voľný text tela každej položky nahradený reťazcom
`[redacted-video-transcript]`, vytvorený nahradením štruktúrovaného poľa položky
pred zostavením reťazca (nikdy nie analýzou zlúčeného textu, takže žiadny obsah
položky — škodlivý ani bežný, vrátane tiel obsahujúcich `]`, ako napríklad
`[inaudible]`/`[music]` — nemôže zostať zachovaný). Telo požiadavky v uloženom protokole volaní nahradí
každú textovú časť odvodenú z videa týmto redigovaným tieňom, pričom sa zhoda
určí podľa rovnosti obsahu; kotva `fullText` sa znovu načíta z dokončeného dátového obsahu
ochranného mechanizmu pred volaním, takže porovnanie je úspešné aj po tom, ako neskoršie reťazové ochranné mechanizmy
(maskovače osobných identifikačných údajov a prihlasovacích údajov, priority 10/95) prepíšu text opisu priamo
na mieste, a po tom, ako vloženie systémovej výzvy/odovzdania/pamäte zmení tvar poľa správ. Telo
odoslané nadradenému modelu zostáva nezmenené. Pozorovaná požiadavka tiež neukladá
žiadnu trvalú Memory (extrakcia odvodená od požiadavky aj odpovede sa preskočí),
takže vlastná odpoveď modelu nemôže zopakovať text prepisu do Memory.

**Nespracované polia videa (#12430).** Keď je most povolený a natívna podpora videa je neznáma alebo chýba, definované polia `transcript`/`audioTranscript` tiež aktivujú `videoBridgeObserved`, a to aj po zlyhaní opisu alebo prekročení limitu `maxVideos`. Hodnota `null` a prázdne reťazce sa započítavajú; chýbajúce polia a metadáta nesúvisiace s videom nie. Uchované kópie tieto polia redigujú alebo požiadavku vynechajú a vyrovnávacie pamäte/Memory sa obídu.

Na týchto záložných cestách sa platné položky volajúceho zmenia na podporované časti
`text`/`input_text` namiesto neštandardných polí poskytovateľa. Obe stopy dodané v požiadavke
zostávajú nedôveryhodnými pozorovaniami typu `client` s explicitným upozornením, že video
nebolo opísané a časové pečiatky neboli overené voči médiu. Existujúce limity
256 položiek/64 KiB celkovo aj limity na jednotlivé položky sa uplatňujú na obe stopy spoločne;
časové pečiatky sa musia zmestiť do 600-sekundového stropu sprostredkovateľa a do prípadného zadaného
okna zamerania. Neplatné stopy sa zahodia a nepreposielajú sa ako ľubovoľný text; platná
súbežná stopa sa môže naďalej použiť, pokiaľ sa neprekročí ich spoločný limit. Prázdne polia alebo polia s hodnotou `null`
nepridávajú žiadny text. Táto záložná cesta nepridáva načítanie média ani prepis.
Rozširujúce polia prepisu sa odstránia zo záložného nosiča videa a jeho
objektov `video_url`/`source`. Zoznam povolených položiek prenosového formátu OpenAI zostáva prísny; nosiče
videa s neznámou natívnou podporou zostávajú dostupné a známe ciele podporujúce iba text si zachovajú bezpečné značky.
Štruktúrované redigované tiene chránia pripojený text prepisu, zatiaľ čo
pôvodná požiadavka vlastnená volajúcim zostáva nezmenená. Ciele s natívnou podporou a
vypnuté mosty si zachovávajú svoje existujúce správanie obídenia.

Ďalšie uchované kópie používajú rovnaký signál pozorovanej požiadavky. Nespracovaná
snímka požiadavky klienta spred ochranného mechanizmu, čakajúca požiadavka v pamäti a skorý
protokol odmietnutej požiadavky štruktúrne nahrádzajú polia prepisu v častiach videa;
reťazcové výzvy vytvorené fázami spracovateľského reťazca a odovzdaním kontextu sa redigujú
v cieli uloženého tela požiadavky. Uložená značka `video_content_removed`
spôsobí, že pokračovanie cez `previous_response_id` sa bezpečne ukončí neúspechom namiesto rekonštrukcie
textu, ktorý bol zámerne zahodený. Ak pozorovaná požiadavka pred zaznamenaním stratí
svoj redigovaný tieň príslušnej časti alebo ak sa po neskorších zmenách požiadavky
nepodarí nájsť zhodu čo i len pre jeden z viacerých tieňov videa, uchovávané telo požiadavky sa
úplne vynechá namiesto uchovania iba čiastočne redigovaného prepisu.

Pri pozorovanej požiadavke môže odpoveď modelu citovať ľubovoľnú časť
prepisu bez štruktúrovanej hranice položky. Jej uložené pole `responseBody` v protokole volaní
sa preto nahradí značkou vynechania; podrobný
artefakt spracovateľského reťazca (ktorý môže zahŕňať telá nadradenej služby/klienta a bloky streamu)
sa neuchováva. Sémantické vyrovnávacie pamäte, vyrovnávacie pamäte idempotencie a opakovaného prehrávania uvažovania
pri tejto požiadavke obchádzajú čítanie aj zápis. Požiadavka poskytovateľa a odpoveď
viditeľná klientovi zostávajú nezmenené. Skoré bajty `keepalive` sa z dočasnej
vyrovnávacej pamäte odstránia, keď sa podrobný artefakt vynechá. Upozornenie Kiro na poškodený EventStream
uvádza iba počet bajtov dátového obsahu, nikdy nie jeho obsah ani nespracovanú chybu
analyzátora JSON.
Týmto sa netvrdí, že bol vykonaný audit každého nesúvisiaceho diagnostického výstupu poskytovateľa/zásuvného modulu;
širšia kontrola cieľov uchovávania sa sleduje v #11658.

Interný životný cyklus `/api/modality-bridge/video/drilldown` predstavuje samostatnú
vyrovnávaciu vrstvu so spätnou slučkou a autentifikáciou pomocou tokenu. Každá operácia
vyžaduje aj kanonické nepriehľadné ID principála. Pred povolením produkčného volajúceho
musí tento volajúci odvodiť dané ID z autentifikovaného tenanta a nikdy nesmie postúpiť
hodnotu zvolenú klientom. Kľúče vyrovnávacej pamäte viažu daného principála na kanonické
ID relácie a odkazu na video, ukladajú iba ich kľúče odvodené pomocou SHA-256 a obmedzujú
čítanie aj odstraňovanie na rovnakého principála. Vyrovnávacia pamäť ukladá najviac 16
odvodených snímok JPEG na záznam, ich platnosť vyprší po desiatich minútach a podporuje
ohraničené čítania `start`/`end` alebo explicitné odstránenie relácie.

Každý principál je obmedzený na 16 záznamov a 64 MiB kanonických údajov JPEG. Tieto
limity sú nezávislé od globálneho stropu 64 záznamov/256 MiB: tlak na kvótu principála
vyradí najprv iba jeho najmenej nedávno používané záznamy a až potom sa zvažuje globálne
vyraďovanie LRU. Záznamy po uplynutí platnosti sa pri aktivite vyrovnávacej pamäte
odstránia z účtovania principála aj globálneho účtovania, zatiaľ čo zrušenie a zlyhanie
overenia nepotvrdia čiastočnú náhradu.

Vyrovnávacia pamäť odmieta nekanonické Base64, nadmernú výplň, médiá, ktoré nie sú vo
formáte JPEG, poškodené alebo skrátené súbory JPEG a súbory JPEG, ktoré počas
ohraničeného dekódovania celého obrázka pomocou `sharp` vygenerujú upozornenie. Každý
prijatý obrázok znova zakóduje ako kanonický JPEG, odvodí šírku a výšku z dekódovaných
bajtov namiesto dôvery v polia volajúceho a zahodí všetky koncové polyglotné bajty,
namiesto toho, aby ich zachovala. Do oboch kvót sa započítava iba ohraničená kanonická
komprimovaná vyrovnávacia pamäť. Limit prenosu JSON zahŕňa réžiu Base64 pre strop 32 MiB
dekódovaného vstupu. Každé uložené odvodenie zaznamenáva svoj overený formát a rozlíšenie
JPEG, politiku vzorkovania, verziu odvodenia, čas vytvorenia, hash obsahu vypočítaný
serverom a zahashovaný nadradený odkaz spolu s hashom nadradeného obsahu od dôveryhodného
volajúceho. Zrušenie sa kontroluje medzi asynchrónnymi fázami dekódovania a hashovania
pred atómovým potvrdením do vyrovnávacej pamäte.

Táto etapa zatiaľ nepripája k trase produkčného producenta a neposkytuje výber variantu
s viacerými rozlíšeniami. Transparentná cesta požiadavky Video Bridge preto nespôsobuje
žiadnu dodatočnú prácu, zatiaľ čo odvodenie principála viazaného na tenanta a úplný
životný cyklus FU-08 s viacerými rozlíšeniami zostávajú explicitnou následnou úlohou,
namiesto toho, aby boli zdokumentované ako dokončené správanie.

Snímky sú postupne opisované nakonfigurovaným modelom Video. Prázdne prepísanie Video
zdedí nastavenie Vision; ak sú obe prázdne, automatický smerovač Vision vyberie efektívny
model podporujúci videnie. Úspešné opisy nahradia pôvodnú časť stabilným prefixom
`[Video description:`, ktorý zároveň označuje text ako nedôveryhodné pozorovanie odvodené
z média a oznamuje následným modelom, aby sa neriadili pokynmi nájdenými v médiu. Kľúče
vyrovnávacej pamäte opisov snímok zahŕňajú bajty JPEG, výzvu, časovú značku a efektívny
model; do vyrovnávacej pamäte sa ukladajú iba úspešné opisy. Záznamy vyrovnávacej pamäte
uchovávajú skutočný úspešný produkčný model vrátane záložného modelu; most hlási `mixed`,
keď boli rôzne snímky vytvorené rôznymi modelmi. Zásah vo vyrovnávacej pamäti opätovne
použije túto identitu producenta namiesto toho, aby ju znova označil ako požadovaný plán
smerovania. Vyrovnávacia pamäť výsledkov celého videa používa kľúč založený na každom
vstupe, ktorý mení výstup — výzve, efektívnom modeli, politike vzorkovania, počte snímok,
režime sémantickej analýzy, odtlačku SHA-256 normalizovaného náznaku zamerania, okne
zamerania, `transcript`, `audioTranscript` a príznaku kontaktného hárka — takže zmena
ktorejkoľvek z týchto dimenzií spôsobí minutie vyrovnávacej pamäte, nikdy nie opätovné
použitie zastaraného výsledku. Verzia politiky vizuálnej deduplikácie, prah a ohraničený
počet kandidátskych snímok sú tiež explicitne uvedené v kľúči a metaúdajoch vyrovnávacej
pamäte výsledkov; zmena politiky preto nemôže opätovne použiť zastaraný opis celého videa.
Metaúdaje vyrovnávacej pamäte výsledkov v4 uchovávajú režim a odtlačok, nikdy nie pôvodnú
úlohu používateľa. Metaúdaje ochranných mechanizmov hlásia požadovaný aj efektívny režim
analýzy; požadovaný režim `focused` bez použiteľného používateľského textu sa hlási ako
efektívne `full`.

Ochranný mechanizmus extrahuje každú podporovanú časť videa, ale neopíše viac než
`modalityBridgeVideoMaxVideos`. Pri cieli, pri ktorom sa preukázalo
`supportsVideo === false`, sa zlyhané videá a videá nad limit zmenia na explicitné
bezpečné textové značky, aby sa nezachovalo žiadne nespracované video. Keď je schopnosť
neznáma, tieto časti si zachovajú svoj nosič videa; prípadný záložný prepis sa riadi
ohraničenou konverziou textu uvedenou vyššie. Ciele s `supportsVideo === true` most
obchádzajú. Signál prerušenia klientskej požiadavky sa šíri cez sťahovanie, front
sprostredkovateľa, podprocesy a volania na vytvorenie opisov; prerušenia zastavujú
spracovanie medzi videami a nikdy pri otvorenom zlyhaní neprepustia nespracované médium.

Nastavenia behu sú uložené v DB a overované pomocou Zod:

| Kľúč                                | Predvolená hodnota | Rozsah / správanie                                                                                            |
| ----------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`            | Voliteľné runtime prostredie, vyžaduje explicitné zapnutie                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` zachováva všeobecné titulky; `focused` používa obmedzený, nedôveryhodný kontext posledného používateľa |
| `modalityBridgeVideoModel`          | `""`               | Dedí model Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` alebo proporcionálne `segment_aware`; pri zlyhaní detektora sa použije `uniform`     |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                                |

Staršie uložené hodnoty časového limitu videa nad 120 sekúnd sa obmedzia na
konečný termín sprostredkovateľa; nové zápisy nastavení nad týmto limitom sa odmietnu.
`GET /api/modality-bridge/video/runtime` vyžaduje dôveryhodnú označenú lokálnosť
slučky loopback ešte pred autentifikáciou alebo zisťovaním runtime prostredia a následne vyžaduje
správcovskú autentifikáciu. Vracia iba `available`, očistené verzie FFmpeg/ffprobe a pevne stanovený
dôvod, keď runtime prostredie nie je dostupné. Interný koncový bod extrakcie nie je
verejné API na nahrávanie: pri preťažení frontu vráti `503` spolu s `Retry-After`, pri odpojení
volajúceho vráti `499` a pri dosiahnutí pevne stanoveného konečného termínu sprostredkovateľa vráti `504`. Konvertované odpovede pridávajú
`video->text;model=<visionModel>;parts=<videos>` do centrálnej hlavičky
`x-omniroute-modality-bridge` bez odstránenia segmentov Vision alebo Audio.

### Maskovanie PII (`piiMasker.ts`)

Spúšťa sa v **oboch** fázach.

- **`preCall`** naklonuje dátový obsah, prejde `system`, `messages`, `input` a
  `prompt` (vrátane položiek s obyčajným reťazcom) a aplikuje `processPII()` (z
  `@/shared/utils/inputSanitizer`) na reťazcové polia `content`/`text`. Keď je
  `PII_REDACTION_ENABLED=true`, zistené PII sa v odosielanom dátovom obsahu
  redigujú. Toto je nezávislé od `INPUT_SANITIZER_MODE` (ktorý riadi iba
  politiku injektovania výziev). Keď je redigovanie vypnuté, volanie zaznamená počty
  detekcií bez prepísania obsahu.
- **`postCall`** vytvorí hĺbkovú kópiu odpovede, spustí `sanitizePIIResponse()` spolu
  s maskovaním tvaru Responses API (`maskResponsesOutput` — zahŕňa
  `output_text` a `output[].content[].text`). Ak dôjde k akémukoľvek redigovaniu,
  upravená odpoveď nahradí pôvodnú.

Ochranný mechanizmus nikdy neblokuje; iba pridáva anotácie (`meta.detections`,
`meta.redacted`) alebo prepisuje obsah.

#### Výber podľa typu, vlastné vzory a počítadlá detekcií

**Dashboard → Settings → Security → PII masking** určuje, _čo_ sa maskuje.
Maskovanie nezapína: to naďalej riadia `PII_REDACTION_ENABLED` (požiadavka) a
`PII_RESPONSE_SANITIZATION` (odpoveď + SSE), pričom obe sú predvolene vypnuté.

- **Výber podľa typu** — vstavané identifikátory sú uvedené v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavená hodnota znamená všetky
  typy (správanie pred zavedením tohto nastavenia). Vzor `ssn_us` nástroja
  požiadaviek sa mapuje na `ssn`. Šablóny (Minimálna, Štandardná, Finančná,
  Brazílska, USA, Úplná) iba vyplnia začiarkavacie políčka v používateľskom rozhraní.
- **Vlastné vzory** — najviac 20 regulárnych výrazov alebo vzorov so zástupnými znakmi (`*` = najviac 64
  znakov, ktoré nie sú medzerami, `?` = jeden znak). Zhody sa zmenia na `[CUSTOM_REDACTED]`.
  Každý vzor prejde cez `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviac 500 znakov, príznaky sú obmedzené
  na `g i m s u`, musí sa dať skompilovať, musí prejsť kontrolou `safe-regex` (katastrofické
  spätné sledovanie) a nesmie sa zhodovať s prázdnym reťazcom ani so zástupným textom redigovania.
  Vzor, ktorý nevyhovie, sa pri ukladaní aj testovaní odmietne a uložený riadok,
  ktorý nevyhovie, sa počas behu preskočí namiesto skompilovania. Vlastné vzory sa
  používajú iba vtedy, keď je maskovanie zapnuté.
- **Počítadlá detekcií** — počty podľa typu (nikdy nie zhodné hodnoty), uchovávané v
  pamäti a vynulované pri reštarte (`src/lib/pii/piiDetectionStats.ts`). Zvyšujú sa iba
  vtedy, keď je maskovanie zapnuté.

Nastavenia sa nachádzajú v tabuľke `key_value` (menný priestor `pii_settings`,
`src/lib/db/piiSettings.ts`) a čítajú sa prostredníctvom 1-sekundovej vyrovnávacej pamäte. API:

| Metóda | Cesta                    | Účel                                                                                |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stav príznakov, `enabledTypes`, `customPatterns`, počítadlá detekcií                |
| `PUT`  | `/api/settings/pii`      | Nahradenie `enabledTypes` (`null` = všetky) a/alebo `customPatterns`                |
| `POST` | `/api/settings/pii/test` | Skúšobné spustenie jedného vzoru na vzorke s veľkosťou najviac 8 KB; nič sa neuloží |

Všetky tri vyžadujú správcovskú autentifikáciu a overujú telo pomocou Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injektovanie výziev (`promptInjection.ts`)

Zisťuje nepriateľské štruktúry v obsahu poskytnutom používateľom a presadzuje
nakonfigurovanú politiku. Správanie je riadené premennými prostredia a možnosťami
konštruktora:

| Nastavenie      | Premenná prostredia                                                                                    | Predvolená hodnota | Účinok                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povolené        | `INPUT_SANITIZER_ENABLED`                                                                              | `true`             | Keď je hodnota `false`, ochranný mechanizmus sa okamžite ukončí.                                                                                                                               |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`             | Zásady pre injekcie: `block`, `warn` alebo `log`. (`redact` sa akceptuje pre spätnú kompatibilitu, ale **neodstraňuje** text injekcie; prepis PII v požiadavke riadi `PII_REDACTION_ENABLED`.) |
| Prah blokovania | možnosť `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`             | Minimálna závažnosť potrebná na zablokovanie. Pri predvolenom nastavení sa stredná závažnosť iba pozoruje.                                                                                     |

**Priorita režimu** (`getMode`): `options.mode` volajúceho →
**prepísanie príznakom funkcie v DB** `INJECTION_GUARD_MODE` (Ovládací panel → Nastavenia →
Príznaky funkcií) → premenná prostredia `INJECTION_GUARD_MODE` → premenná prostredia `INPUT_SANITIZER_MODE` →
`warn`. Prepísanie z ovládacieho panela má preto prednosť pred premennými prostredia, takže používateľské rozhranie
Príznaky funkcií riadi spustený ochranný mechanizmus v reálnom čase (bez reštartu). Čítanie z DB je bezpečné pri zlyhaní:
ak dôjde k chybe, ochranný mechanizmus sa vráti k správaniu založenému na premenných prostredia, a ak nie je nastavené žiadne
prepísanie, správanie je totožné s vyhodnotením iba podľa premenných prostredia.

Zdroje detekcie:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (zdieľaná súprava detektorov
   používaná inde v spracovateľskom reťazci).
2. Vstavané `DEFAULT_GUARD_PATTERNS` (aktuálne `system_override_inline` a
   `markdown_system_block`, obe so závažnosťou `high`).
3. Voliteľné `customPatterns` odovzdané prostredníctvom možností konštruktora (reťazce, regulárne výrazy
   alebo záznamy `{ name, pattern, severity }`).

Keď `mode === "block"` **a** aspoň jedna detekcia dosiahne prah
závažnosti, `preCall` vráti `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimoch `warn`/`log` ochranný mechanizmus zaznamená udalosť,
ale volanie povolí. Zdieľaná pomocná funkcia `evaluatePromptInjection()` sa tiež exportuje
pre volajúcich, ktorí potrebujú vyhodnotiť prompty bez použitia registra.

**Limit kontroly (v3.8.20):** detektor kontroluje iba **prvých 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Funkcie `detectInjection()` aj
`evaluatePromptInjection()` pred spustením slučky vzorov používajú `slice(0, MAX_INJECTION_SCAN_BYTES)`.
Príkazy injekcie sa nachádzajú blízko začiatku vstupu, takže sa tým obmedzuje zaťaženie CPU/GC regulárnymi výrazmi
pri niekoľkostokilobajtových dátach bez oslabenia detekcie (pozri
#3932, #4041).

### Maskovanie prihlasovacích údajov (`credentialMasker.ts`)

Spúšťa sa v **oboch** fázach, ako posledné v predvolenom reťazci (priorita `95`). Rediguje
známe vzory kľúčov API / tajných tokenov z odchádzajúcich dát (obsah správ,
argumenty volaní nástrojov, výsledky nástrojov) **aj** z odpovede poskytovateľa, aby sa
prihlasovací údaj vložený do promptu (alebo zopakovaný vo výsledku nástroja) neprezradil
externému poskytovateľovi ani späť klientovi.

- **Iba s výslovným súhlasom**, podľa rovnakej konvencie ako redigovanie PII (súvisiace s pevným pravidlom č. 20):
  vypnuté, pokiaľ `settings.credentialRedactionEnabled === true` **alebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Keď je funkcia vypnutá, ochranný mechanizmus nevykoná žiadnu operáciu —
  nikdy neblokuje ani neprepisuje.
- `redactCredentials()` prechádza celý strom dát/odpovede (`walkValue()`,
  bezpečne z hľadiska zneužitia prototypov, bezpečne pri cykloch vďaka `WeakSet`) a nahrádza zhody
  zástupným symbolom `[REDACTED:<type>]`, pričom klonuje iba vetvy, ktoré sa skutočne
  zmenili.
- `CREDENTIAL_PATTERNS` pokrýva kľúče poskytovateľov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platobné kľúče (Stripe, Square), cloudové
  kľúče (prístupový kľúč AWS, Twilio, SendGrid, Mailgun), súkromné kľúče / JWT,
  reťazce pripojenia obsahujúce prihlasovacie údaje (`mongodb://user:pass@...` atď.) a
  všeobecný vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kľúče v tvare hlavičiek (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sa redigujú štrukturálne (iba hodnota, pričom prefix schémy, ako napríklad
  `Bearer `/`Basic `, sa zachováva), a nie pomocou všeobecného textového regulárneho výrazu.
- Ochranný mechanizmus nikdy neblokuje; iba prepisuje (`modifiedPayload` /
  `modifiedResponse`) a pridáva anotácie (`meta.credentialsRedacted`, `meta.count`).

Ochrana proti regresii: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // hodnota true okamžite ukončí reťazec
  message?: string; // zobrazí sa pri blokovaní
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrátené metódou preCall na úpravu požiadavky
  modifiedResponse?: TValue; // vrátené metódou postCall na úpravu odpovede
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

Ochranný mechanizmus signalizuje „bez zmeny“ vrátením hodnoty `void`, `{}` alebo
`{ block: false }`. Vrátenie hodnoty `modifiedPayload`/`modifiedResponse` nahradí
hodnotu prechádzajúcu reťazcom pre nasledujúce ochranné mechanizmy.
`signal?: AbortSignal` prenáša životný cyklus volajúceho do ochranných mechanizmov. Prerušenie požiadavky je zámernou výnimkou typu fail-open: mediálne mosty zastavia prácu a vykonajú vyčistenie bez obnovenia nespracovaných médií pre cieľ, o ktorom je známe, že ich nepodporuje.

## Register (`registry.ts`)

Jediná inštancia `guardrailRegistry` poskytuje:

- `register(guardrail)` — pridá ochranný mechanizmus (alebo ho nahradí podľa normalizovaného názvu) a
  opätovne zoradí mechanizmy vzostupne podľa `priority`.
- `clear()` / `list()` — administratívne pomocné metódy.
- `runPreCallHooks(payload, context)` — prechádza aktívnymi ochrannými mechanizmami, odovzdáva
  payload prostredníctvom `modifiedPayload` a zastaví sa pri prvom výskyte `block: true`.
- `runPostCallHooks(response, context)` — rovnaký postup na strane odpovede.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a voliteľne
  znova zaregistruje predvolené mechanizmy, aby sa zabezpečila čistá izolácia testov.

Obe spúšťacie metódy vracajú `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamov `GuardrailExecutionResult`, ktoré obsahujú
polia `blocked`, `skipped`, `modified`, `error` a `meta` pre každý ochranný mechanizmus,
čo je užitočné pri trasovaní.

### Vypnutie ochranných mechanizmov pre jednotlivé požiadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zhromažďuje
deduplikovaný zoznam názvov ochranných mechanizmov, ktoré sa majú pre aktuálnu
požiadavku preskočiť. Zdroje (všetky sú voliteľné a zlúčia sa):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v tele požiadavky (na najvyššej úrovni)
- `metadata.disabledGuardrails` v tele požiadavky
- Hlavička `x-omniroute-disabled-guardrails` (alebo staršia
  `x-disabled-guardrails`)

Hodnoty môžu byť polia reťazcov alebo reťazec oddelený čiarkami; názvy sa
normalizujú na malé písmená vo formáte kebab-case (`pii_masker` → `pii-masker`). Výsledok
sa prostredníctvom `context.disabledGuardrails` odovzdá registru, ktorý preskočí
zodpovedajúce ochranné mechanizmy (`skipped: true` v `results`).

## Poradie vykonávania

Pre každú požiadavku prechádzajúcu cez `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` zostaví zoznam vynechaných ochranných mechanizmov z kľúča API, tela požiadavky
   a hlavičiek.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí ochranné mechanizmy vo vzostupnom
   poradí priority:
   - Zakázané ochranné mechanizmy sa zaznamenajú ako `skipped`.
   - Metóda `preCall` každého ochranného mechanizmu môže prepísať dátový obsah prostredníctvom `modifiedPayload`.
   - Prvý výskyt `block: true` ukončí reťazec a obslužná rutina vráti
     odpoveď o odmietnutí ochranným mechanizmom.
3. (Potenciálne prepísaný) dátový obsah pokračuje do kombinovaného smerovania a následného
   odoslania nadradenému systému.
4. Po zostavení odpovede spustí `guardrailRegistry.runPostCallHooks(...)`
   rovnaký reťazec nad odpoveďou. Hodnota `block: true` v tomto bode zahodí odpoveď
   nadradeného systému.

Ochranné mechanizmy, ktoré vyvolajú výnimku, sa zaznamenajú s `error: <message>` a zapíšu do protokolu
prostredníctvom `logger.warn`, ale reťazec pokračuje — zámerne využíva princíp fail-open.

## Konfigurácia

Premenné prostredia čítané vstavanými ochrannými mechanizmami:

| Premenná                              | Používa ju                          | Účinok                                                                                                                                |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`                  | Nastavením na `false` sa detekcia úplne zakáže.                                                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`                  | Pravidlá pre injektáž: `warn`, `block` alebo `log`. Staršia hodnota `redact` text injektáže neprepisuje.                              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`                  | Režim ochrany proti injektáži; zároveň ide o príznak funkcie v databáze, ktorý **má prednosť** pred premennými prostredia (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`                  | Minimálna závažnosť, ktorú režim `MODE=block` odmietne: `high` (predvolené), `medium` alebo `low`.                                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`                  | Starší alias pre `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                        | Ak je nastavená na `true`, osobné údaje v požiadavke sa redigujú (nezávisle od režimu injektáže).                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (následné spracovanie) | Ovláda správanie maskovania na strane odpovede.                                                                                       |

Ochranné mechanizmy Modality Bridge čítajú konfiguráciu za behu z úložiska nastavení
založeného na databáze (`getSettings()`), nie z premenných prostredia. Primárne kľúče pre Vision sú
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Staršie kľúče
`visionBridge*` sa akceptujú iba ako zdokumentované záložné hodnoty na čítanie počas jedného cyklu;
zápisy z ovládacieho panela používajú primárne kľúče. Predvolené hodnoty a záložný
resolver sa nachádzajú v `src/shared/constants/modalityBridgeDefaults.ts`, pričom staršie
konštanty zostávajú zachované v `src/shared/constants/visionBridgeDefaults.ts`.

Audio používa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips` spolu so zdieľanými
nastaveniami `modalityBridgeCache*`. Audio nemá záložný mechanizmus pre staršie kľúče, pretože tieto
kľúče boli zavedené spolu so schémou Modality Bridge.

Video používa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout` spolu so zdieľanými nastaveniami `modalityBridgeCache*`.
V predvolenom nastavení je zakázané, pretože FFmpeg/ffprobe sú voliteľné prevádzkové
závislosti a opis snímok zvyšuje latenciu a náklady na model.

## Vlastné ochranné mechanizmy

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Denný rozpočet bol prekročený" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Postup:

1. Vytvorte `src/lib/guardrails/myGuardrail.ts`, ktorý rozširuje `BaseGuardrail`.
2. Implementujte `preCall` a/alebo `postCall`.
3. Buď ho zaregistrujte pri importe (pridaním z `registerDefaultGuardrails`), alebo
   zavolajte `guardrailRegistry.register(...)` za behu — register nahradí
   každý predchádzajúci ochranný mechanizmus s rovnakým normalizovaným názvom.
4. Pridajte testy do `tests/unit/` (existujúce príklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testovanie

Medzi testami používajte `resetGuardrailsForTests()`, aby ste začali zo známeho stavu.
Ak chcete začať s prázdnym registrom a zaregistrovať iba testované ochranné mechanizmy,
odovzdajte `{ registerDefaults: false }`. Vision Bridge podporuje vkladanie závislostí
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge poskytuje ekvivalentné
body napojenia pre nastavenia, schopnosti, výber modelu STT, kontroly prihlasovacích
údajov a transkripciu. Testy tak môžu overiť oba toky bez prístupu k databáze
alebo sieti.

## Pozrite tiež

- `src/lib/guardrails/` — implementácia
- `src/shared/utils/inputSanitizer.ts` — zdieľaný detektor, ktorý zabezpečuje
  detekciu injektovania promptov a maskovanie osobných údajov
- `src/shared/constants/visionBridgeDefaults.ts` — predvolené nastavenia Vision Bridge a
  zoznam modelov s vynúteným premostením
- `src/shared/constants/modalityBridgeDefaults.ts` — zdieľané predvolené nastavenia behu pre Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonálna vrstva (istič, doby čakania)
- `docs/reference/ENVIRONMENT.md` — úplný prehľad premenných prostredia

## Pokrytie trás ochranou pred injektovaním a red-team testovanie (Fáza 8 · Blok D)

Ochrana pred injektovaním (`createInjectionGuard` / `withInjectionGuard`) pokrýva všetky trasy,
ktoré prijímajú používateľské prompty. Rešpektuje `INJECTION_GUARD_MODE` (predvolená hodnota `warn` = iba zaznamenať;
`block` = vráti HTTP 400 `SECURITY_001`).

| Typ               | Trasy                                                                                                                                                | Predvolený režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Text (existujúce) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generatívne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dáta              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Extrakcia textu (`extractMessageContents`) pokrýva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testovanie (každú noc, `nightly-llm-security.yml`):** promptfoo overuje, že každá trasa blokuje
korpus OWASP-LLM v režime `INJECTION_GUARD_MODE=block`; garak spúšťa sondy (bez tajného kľúča sa preskočí).
Trasa `moderations` je zahrnutá kvôli konzistentnosti — prevádzkovatelia ju môžu v režime blokovania vyňať
prostredníctvom `resolveDisabledGuardrails`.

Nočný pracovný postup (`.github/workflows/nightly-llm-security.yml`, cron + manuálne
spustenie) obsahuje dve úlohy:

- **`promptfoo-guard` (blokujúca)** — spúšťa `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý nepriateľský prípad (napr. „ignoruj všetky
  predchádzajúce pokyny…“, prelomenia obmedzení v štýle DAN) overuje, že odpoveď obsahuje
  `error.code === "SECURITY_001"`, t. j. ochrana požiadavku skutočne odmietla.
- **`garak` (poradná)** — spúšťa garak s `--probes promptinject,dan,leakreplay`
  voči lokálnej inštancii OmniRoute (`http://localhost:20128/v1`). Je podmienená dostupnosťou
  tajného kľúča poskytovateľa (`PROMPTFOO_PROVIDER_KEY`); ak nie je dostupný, úloha sa korektne
  preskočí a je zakončená `|| true`, takže iba hlási výsledky bez zlyhania CI.

Pokrytie pomocnej ochrany (`createInjectionGuard` / `withInjectionGuard`)
zahŕňa každú trasu `/v1`, ktorá prijíma prompt; text promptu sa získava z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomocou
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
