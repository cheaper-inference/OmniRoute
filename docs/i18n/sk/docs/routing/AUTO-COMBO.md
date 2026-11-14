# OmniRoute Auto-Combo Engine (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pre používateľov**: Hľadáte rýchly začiatok? Jednoduché vysvetlenia a príklady nájdete v [Používateľskej príručke Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md).

> Samostatne sa spravujúce reťazce modelov s adaptívnym hodnotením + automatickým smerovaním bez konfigurácie

## Automatické smerovanie bez konfigurácie (prefix `auto/`)

> **NOVINKA:** Nie je potrebné vytvárať žiadne combo. Použite prefix `auto/` priamo v ľubovoľnom klientovi.

### Rýchle príklady

| ID modelu      | Variant | Správanie                                                                             |
| -------------- | ------- | ------------------------------------------------------------------------------------- |
| `auto`         | default | Všetci pripojení poskytovatelia, stratégia LKGP, vyvážené váhy                        |
| `auto/coding`  | coding  | Váhy uprednostňujúce kvalitu, vhodné na generovanie kódu                              |
| `auto/fast`    | fast    | Vážený výber s nízkou latenciou                                                       |
| `auto/cheap`   | cheap   | Smerovanie optimalizované podľa nákladov (najnižšie náklady ako prvé)                 |
| `auto/offline` | offline | Uprednostňuje poskytovateľov s najvyššou dostupnou kvótou                             |
| `auto/smart`   | smart   | Kvalita na prvom mieste + vyššia miera prieskumu (10 %) na lepšie objavovanie modelov |
| `auto/lkgp`    | lkgp    | Explicitné LKGP (rovnaké ako predvolené `auto`)                                       |
| `auto/chaos`   | chaos   | Paralelné rozvetvenie, jeden model na poskytovateľa (nejde o vkladanie porúch)        |

### Kombinácia kategórie × úrovne (`auto/<category>:<tier>`)

Prípony v štýle OpenRouter oddeľujú **aký druh trasy** (kategória) od toho, **ako ju optimalizovať** (úroveň), takže ich môžete ľubovoľne kombinovať (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategórie** (filtrujú množinu kandidátov podľa schopností): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zachovávajú modely podporujúce obrazový vstup; `reasoning` zachováva modely s uvažovaním/premýšľaním.
- **Úrovne** (vyberajú váhy hodnotenia/filter množiny): `fast` (rýchle nasadenie) · `cheap` (alias `floor`, úspora nákladov) · `reliable` (stav ističa + stabilita latencie) · `free` / `pro` (filtrujú množinu podľa úrovne modelu prostredníctvom `classifyTier` — bezplatná vs. prémiová úroveň).

| Príklad                | Výsledok                                                                         |
| ---------------------- | -------------------------------------------------------------------------------- |
| `auto/coding:fast`     | množina pre kódovanie, váhy s nízkou latenciou                                   |
| `auto/coding:cheap`    | množina pre kódovanie, optimalizovaná podľa nákladov (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | iba modely s uvažovaním/premýšľaním, prémiová úroveň                             |
| `auto/vision`          | modely podporujúce obrazový vstup (bez úrovne → vyvážené váhy)                   |
| `auto/multimodal:free` | modely s multimodálnymi schopnosťami, iba bezplatná úroveň                       |

Každé platné `auto/<category>[:<tier>]` sa vyhodnocuje na požiadanie; vybraná podmnožina sa zobrazuje v `/v1/models` a na ovládacom paneli (`AUTO_SUFFIX_VARIANTS` v `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrovanie funguje v režime **fail-open** — ak obmedzeniu nezodpovedá žiadny pripojený model, použije sa celá množina, aby sa smerovanie nikdy neprerušilo. Základný hodnotiaci mechanizmus (`combo.ts`) zostáva nezmenený; filter kategórie/úrovne sa aplikuje v `buildAutoCandidates`.

> **Aktuálne informácie o modeloch:** vhodnosť pre automatické smerovanie sa určuje pomocou aktuálnych rebríčkov **Arena ELO** a údajov o úrovniach z **models.dev**, keď je zapnutý príznak `ARENA_ELO_SYNC_ENABLED` (inak sa použije statická mapa vhodnosti).

**Ako používať:**

```bash
# Ľubovoľné IDE alebo nástroj CLI, ktorý podporuje formát OpenAI
Base URL: http://localhost:20128/v1
API Key:  <váš-kľúč-koncového-bodu>

# V kóde/konfigurácii nastavte model na:
model: "auto"                 # vyvážené predvolené nastavenie
model: "auto/coding"          # najlepšie pre úlohy programovania
model: "auto/fast"            # najrýchlejší dostupný
model: "auto/cheap"           # najlacnejší na token
```

**Čo sa stane:**

1. OmniRoute zistí prefix `auto/` v `src/sse/handlers/chat.ts`
2. Z databázy načíta všetky **aktívne pripojenia poskytovateľov**
3. Vyfiltruje tie, ktoré majú platné prihlasovacie údaje (kľúč API alebo token OAuth)
4. Určí model pre každé pripojenie (`connection.defaultModel` alebo prvý model poskytovateľa)
5. Zostaví **virtuálne combo** v pamäti (neukladá sa do DB)
6. Smeruje pomocou váhového profilu vybraného variantu + stratégie LKGP

**Kľúčové vlastnosti:**

- ✅ **Vždy aktívne:** Nie je potrebný prepínač, vytvorenie comba ani konfigurácia
- ✅ **Dynamické:** Automaticky zohľadňuje aktuálne pripojených poskytovateľov
- ✅ **Stabilita relácie:** LKGP zabezpečuje uprednostnenie posledného úspešného poskytovateľa
- ✅ **Podpora viacerých účtov:** Každé pripojenie poskytovateľa sa stane samostatným kandidátom
- ✅ **Žiadne zápisy do DB:** Virtuálne combo existuje iba počas požiadavky, bez režijných nákladov na perzistenciu

### Riadenie kandidátov podľa kľúča (#7819, úroveň 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = prípona za `auto/` alebo
doslovná hodnota `auto` pre základný kanál) je koncový bod **iba na čítanie**, ktorý uvádza
aktuálnu množinu kandidátov kanála `auto/*` doplnenú o aktuálnu dostupnosť, pričom opätovne používa
existujúce čítania odolnosti (nikdy nie surovú hodnotu `state` ističa):

- istič poskytovateľa — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- čakacia lehota pripojenia — `rateLimitedUntil` / `testStatus` vo vyhodnotenom
  riadku `provider_connections`
- uzamknutie modelu — `isModelLocked(provider, connectionId, model)`

Každý kandidát obsahuje aj príznak `excluded` pre tento kľúč API. Vylúčenia sa ukladajú
samostatne pre každý kľúč API (tabuľka `auto_candidate_overrides`, migrácia `128`) — OmniRoute je
systém s jedným tenantom bez tabuľky `users`, takže `apiKeyId` je najbližšia skutočná identita
jednotlivého volajúceho — a vynucujú sa v kritickom bode množiny kandidátov v
`open-sse/services/autoCombo/virtualFactory.ts` prostredníctvom čistej, jednotkovo testovanej funkcie
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter funguje v režime **fail-open**: nenastavené apiKeyId/kanál aj zlyhanie vyhľadávania v DB
ponechajú množinu nefiltrovanú, takže operátor bez nakonfigurovaných prepísaní uvidí smerovanie
na úrovni bajtov identické so stavom pred zavedením tejto funkcie.

**Odložené na nadväzujúcu úlohu:** váhy jednotlivých kandidátov + explicitné poradie (úroveň 3
— napája sa na existujúce cesty stratégií váženia/priority) a pripnutie konkrétnej
stratégie `combo.ts` ku každému kanálu `auto/*` (úroveň 4). Otvorenú otázku, či majú
prepísania vzhľadom na model s jedným nájomníkom zostať viazané na jednotlivé kľúče API,
alebo sa majú stať globálnymi, nájdete v pláne #7819.

**Na pozadí:**

```txt
Požiadavka: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts zistí prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool z aktívnych pripojení
   ↓
handleComboChat (rovnaký mechanizmus ako pri uložených kombináciách)
   ↓
Automatické vyhodnocovanie vyberie pre každú požiadavku najlepšieho poskytovateľa/model
```

**Implementačné súbory:**

| Súbor                                                     | Účel                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyzátor prefixu (`parseAutoPrefix`)                       |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytvára virtuálne objekty `AutoComboConfig`                  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací mechanizmus na simulovanie registra poskytovateľov |
| `src/sse/handlers/chat.ts`                                | Integrácia: skrátené spracovanie automatického prefixu       |
| `src/shared/constants/providers.ts`                       | Systémová položka `SYSTEM_PROVIDERS.auto`                    |

## Predvoľby účtu pre uložené automatické kombinácie

Inteligentný automatický editor ponúka voliteľné** Predvoľby účtu** oddiele. Každé pripojenie môže byť Preferované, Normálne (predvolené), Rezervované alebo Vylúčené. Viaceré pripojenia môžu zdieľať vrstvu. Automaticky vyberá v rámci prvej vhodnej úrovne, pričom si tam zachováva svoje správanie scoring/router ; neúspešné pokusy prepadnú na zostávajúce konkrétne účty, uprednostnené pred normálnymi pred rezervou. Táto kombinácia nikdy nepoužíva vylúčené pripojenia.

Nastavenie je uložené ako `config.accountPreferences`, zakódované spojením ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Vynechaná alebo prázdna mapa si zachová existujúcu trasu. Predvoľby nepovoľujú zakázané pripojenia, neudeľujú prístup ku kľúču API, neobnovujú kandidátov so zablokovanými kvótami ani neobchádzajú kontroly rozpočtu. Každý pokus je obmedzený na konkrétne pripojenie, takže záložný účet nemôže preskakovať úrovne za kombinovaný smerovač. Súčasná príbuznosť relácie si môže zachovať vhodný účet; vylúčenie účtu viazaného na natívny obrat zastavuje, ktoré sa otáčajú namiesto tichého menenia účtov.

Nakonfigurované preferencie používajú automatickú cestu s ohľadom na účet: neviazaná kontextová vyrovnávacia pamäť, inteligentné potrubie, chaos a tieňové skratky sa neodosielajú. Špekulatívne zaistenie je pre tieto požiadavky zakázané, takže rezervné účty nemôžu súťažiť s preferovanými. Iné kombinované stratégie toto nastavenie neinterpretujú. Ak zmeníte kombináciu z možnosti Automaticky, uložené predvoľby sa zachovajú na neskoršie prepnutie späť.

## Názvy kombinácií zhodné so skutočným identifikátorom modelu

Kombinácia, ktorej `name` je zhodný s holým identifikátorom modelu (napr. kombinácia s názvom
`gpt-5.5`), je **zámerný a podporovaný vzor**, nie chyba: ide o
mechanizmus záložného prepínania poskytovateľov pre jednotlivé identifikátory modelov, zdokumentovaný v
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Keďže rozlíšenie
kombinácie sa kontroluje pred rozlíšením holého identifikátora modelu
(`getComboForModel()` v `src/sse/services/model.ts`), požiadavka na holý
identifikátor `gpt-5.5` je smerovaná cez ciele kombinácie (napr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) namiesto priameho smerovania
k jedinému poskytovateľovi — opätovne sa tým využíva priorita kombinácie pred prepisovaním, vytvorená pre
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), a regresne sa testuje pomocou `tests/unit/responses-combo-resolution-3227.test.ts` a
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Vytvorenie alebo premenovanie kombinácie na názov, ktorý prekrýva skutočný identifikátor modelu,
sa **nikdy neodmietne** — takýto postup by narušil tento zdokumentovaný pracovný postup. Namiesto toho
(#8530) pripájajú `POST /api/combos` a `PUT /api/combos/[id]` k odpovedi neblokujúce
pole `warning`, keď sa (nový) názov zhoduje so skutočným
identifikátorom modelu:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Pri spustení funkcia `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) tiež zaznamená jednoriadkové upozornenie `[STARTUP]`
s výpočtom všetkých existujúcich kombinácií, ktoré prekrývajú identifikátor modelu, aby prevádzkovatelia,
ktorí na túto situáciu narazia omylom (namiesto zámerného použitia podľa #6940), dostali upozornenie.
Pomocná funkcia na detekciu sa nachádza v `src/lib/combos/modelNameCollision.ts`.

## Volanie vlastnej kombinácie z klienta

Uložené kombinácie (Nastavenia → Kombinácie) sa použijú iba vtedy, keď klient odošle **presný názov** kombinácie v poli `model` — názov kombinácie sa neporovnáva približne ani čiastočne a nepoužíva sa žiadna predpona `auto/`. Poradie rozlíšenia (`getComboForModel()` v `src/sse/services/model.ts`):

1. presná zhoda názvu kombinácie (`model: "my-combo"`),
2. predpona `combo/<name>` (`model: "combo/my-combo"`),
3. mapovania modelov na kombinácie pomocou glob vzorov (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dve bežné nástrahy:

- **`auto` nepoužíva vaše kombinácie.** `auto`/`auto/*` vytvára vlastnú množinu kandidátov bez potreby konfigurácie a uložené kombinácie zohľadní iba vtedy, ak má niektorá kombinácia doslova názov `auto` (neodporúča sa). Ak chcete smerovať cez kombináciu, odošlite jej presný názov — nie `auto`.
- **`openrouter/auto` je skutočný platený produkt OpenRouter** („Auto Best Available“), nie alias OmniRoute. Ide o jedinú statickú položku modelu v registri OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) a účtuje sa samostatne. Ak ho chcete vylúčiť z množín `auto`, použite Nastavenia → Smerovanie → Skryť platené modely.

Pôvodné nejasnosti, ktoré táto dokumentácia objasňuje, nájdete v [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) a [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Ako to funguje (trvalé automatické kombá)

Auto-Combo Engine dynamicky vyberá najlepšiu provider/model pre každú požiadavku pomocou a** 16-faktorová bodovacia funkcia** (definované v `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Súčet predvolených váh je `1.0`; vlastné váhy sú renormalizované pomocou `normalizeScoringWeights()`. Dve zo šestnástich — `cacheAffinity` a `resetWindowAffinity` — majú štandardnú váhu `0`; `reliability` nesie `0` v `DEFAULT_WEIGHTS`, ale `0.03` v generických balíkoch a `0.04` v `reliability-first` a `quality` nesie `0.02` v balíkoch (`0.03` v `quality-first`): stále sa počítajú pre každého kandidáta a `cacheAffinity` bráni deduplikácii rýchlej vyrovnávacej pamäte mimo skóre, takže faktory s nulovým predvoleným nastavením jednoducho v predvolenom nastavení nehlasujú.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Zdroj: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerovať cez `npm run docs:render-diagrams`). Názov súboru je historický; zdroj a vykreslený diagram zobrazujú všetkých 16 faktorov deklarovaných v `DEFAULT_WEIGHTS`.

| Faktor                | Predvolená hmotnosť | Popis                                                                                                                                                                                                                  |
| :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429              | Zostávajúca rezerva kvóty / limitu sadzby [0..1]                                                                                                                                                                       |
| `health`              | 0.1605              | Skóre zdravia z ističa (CLOSED= 1,0, HALF_OPEN= 0,5, OPEN= 0,0)                                                                                                                                                        |
| `costInv`             | 0.1429              | Inverzný** zmiešané** náklady (60 % vstup + 40 % výstupná cena tokenu, normalizované) — lacnejšie = vyššie skóre                                                                                                       |
| `latencyInv`          | 0.1143              | Inverzná latencia p95 sa normalizovala tak, aby — rýchlejšie = vyššie skóre                                                                                                                                            |
| `taskFit`             | 0.0762              | Vhodnosť typu úlohy (kódovanie, kontrola, plánovanie, analýza, ladenie, dokumenty)                                                                                                                                     |
| `stability`           | 0.0476              | Stabilita založená na rozptyle od štandardnej odchýlky latencie — kandidát, ktorého kolísanie času odozvy má nižšie skóre                                                                                              |
| `tierPriority`        | 0.0476              | Priorita na úrovni účtu — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Free = 0.0                                                                                                                                         |
| `tierAffinity`        | 0.0476              | Afinita medzi úrovňou kandidáta a úrovňou odporúčanou v manifeste                                                                                                                                                      |
| `specificityMatch`    | 0.0476              | Zhoda medzi špecifickosťou požiadavky (zjavná nápoveda) a úrovňou modelu                                                                                                                                               |
| `contextAffinity`     | 0.0476              | Afinita medzi potrebou kontextového okna požiadavky a kontextovým oknom modelu                                                                                                                                         |
| `sessionAvailability` | 0.0476              | dostupnosť relácie OAuth kandidáta na pripojenie pre túto reláciu (`getOAuthSessionAvailability()`; skóre pripojení bez protokolu OAuth 1,0)                                                                           |
| `connectionDensity`   | 0.0476              | Rozkladá zaťaženie medzi pripojenia toho istého poskytovateľa (anti-koncentrácia)                                                                                                                                      |
| `cacheAffinity`       | 0.00                | Rendezvous-hash afinita k pripojeniu, ktoré už pravdepodobne obsahuje predponu rýchlej vyrovnávacej pamäte tejto požiadavky (`open-sse/services/combo/promptCacheAffinity.ts`); predvolene zakázané (#8008)            |
| `resetWindowAffinity` | 0.00                | Zaujatosť voči pripojeniam, ktorých okno na obnovenie kvóty je priaznivé (v predvolenom nastavení zakázané)                                                                                                            |
| `quality`             | 0.03                | Výstupný kvalitný signál riadený spätnou väzbou zo sledovača kvality udalosti smerovania; kandidáti bez pozorovaní dostanú neutrálnych 0,5                                                                             |
| `reliability`         | 0.00                | Pozorovaný podiel úspechu, `1 - failureRate`, z 24-hodinovej histórie používania za hranicou desiatich vzoriek (v opačnom prípade metriky v reálnom čase); kandidáti bez pozorovaní čítajú ako 1.0. Predvolene vypnuté |

Sledovač `quality` v pamäti (`open-sse/services/routing/quality.ts`) je po studenom reštarte prázdny, takže každý kandidát získa neutrálne `0.5` kým nepristanú prvé pozorovania.

> **Nečitateľná kvóta (#15347).** Keď poskytovateľ má nástroj na získanie kvóty, ale nevracia nič čitateľné (neúspešné načítanie, chýbajúce poverenia, použitie iba v správach alebo chybná snímka bez analyzovateľného `windows` a bez konečného `percentUsed`, vrátane `percentUsed: null`), kandidát skóruje `0` na osi `quota` a jeho konečné skóre sa vynásobí vzorom `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR`, `autoStrategy.ts` ako rovnaké spojenie-0,5 pokuta. Neúspešné čítanie o používaní je dôkazom o telemetrii, nie o poskytovateľovi, takže sa radí striktne pod akékoľvek skutočné čítanie, vrátane potvrdeného 100%-used, ale nikdy nie je pevne zablokované ani vyradené. Poskytovateľ bez obmedzenia hlási `unlimited: true` a hodnotí ako plnú kvótu; poskytovateľ bez zaregistrovaného nástroja na získanie kvót nemá žiadny zdroj telemetrie a ponecháva si predvolenú hodnotu `100`.

**Suma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` ako je deklarované v `DEFAULT_WEIGHTS`; užívateľom nakonfigurované váhy sú pred vyhodnotením prenormalizované do distribúcie podľa `normalizeScoringWeights()`.

## Balíky režimov

6 preddefinovaných profilov váh v `open-sse/services/autoCombo/modePacks.ts`. Každý balík úplne nahrádza predvolené váhy, aby uprednostnil výber zameraný na jeden cieľ. Súčet hodnôt každého balíka je už `1.0` (`0.9999` pri zobrazení na štyri desatinné miesta), takže `normalizeScoringWeights()` nemá pri aktívnom balíku čo významne upravovať — nižšie uvedené hodnoty sú po zaokrúhlení tie, ktoré vyhodnocovací mechanizmus používa.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Poznámky:

- **Balíky obsahujú `quality` a `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) a úplne nahrádzajú mapu váh (`weights = pack`, nejde o zlúčenie). `DEFAULT_WEIGHTS` obsahuje `quality 0.03 / reliability 0`; výber `balanced`/`default` zachová tieto predvolené hodnoty, zatiaľ čo výber balíka použije jeho hodnoty uvedené vyššie. V nenaplnenom poole (zatiaľ bez pozorovaní, takže `quality 0.5` a `reliability 1`) tieto dva faktory pridajú `+0.04` pri všeobecnom balíku (`0.03 + 0.01`), `+0.045` pri `quality-first` a `+0.05` pri `reliability-first`.
- `tierAffinity`, `specificityMatch` a `resetWindowAffinity` majú v každom balíku explicitne nastavenú hodnotu `0`.
- Stručný prehľad zamerania jednotlivých balíkov:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdravé pripojenia s nízkou latenciou)
  - **cost-saver** → costInv 0.3324 (vyhrávajú najlacnejšie tokeny)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, najvyššia hodnota spomedzi všetkých balíkov (najlepší a konzistentný model pre danú úlohu)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximálna rezerva bez ohľadu na rýchlosť či cenu)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, najvyššia hodnota spomedzi všetkých balíkov (najmenej prekvapení)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (balík váh, ktorý `auto/chaos` priraďuje členom svojho panela; paralelné vetvenie tieto váhy nečíta a nejde o profil vkladania porúch, pozrite si [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Ovládanie pre jednotlivé požiadavky (hlavičky) — #6023 / #6024 / #6025 / #3470

Kombináciu `auto` možno **pre každú požiadavku** riadiť pomocou troch hlavičiek bez zmeny
uloženej konfigurácie kombinácie. Tie sa vzťahujú iba na stratégiu `auto` a iba na požiadavku,
ktorá ich obsahuje; ak hlavička nie je prítomná, použijú sa uložené hodnoty `modePack`/`budgetCap`/`budgetFallback`
danej kombinácie.

| Hlavička                      | Akceptuje                                                                                                                                                                                             | Účinok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias predvoľby (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) alebo nespracovaný názov balíka (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Prepíše váhy hodnotenia pre túto požiadavku. `balanced`/`default` vynútia predvolené váhy (bez balíka). Neznáme hodnoty sa ignorujú (konfigurácia sa zachová).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | kladné číslo (maximálna suma v USD na požiadavku)                                                                                                                                                     | Pevný strop nákladov: kandidáti, ktorých odhadované náklady ho prekračujú, sa pred výberom odfiltrujú. To, čo sa stane, keď ho prekročí **každý** kandidát, určuje nižšie uvedená hlavička `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predvolené, aliasy: `cheapest-viable`, `soft`) alebo `strict` (aliasy: `block`, `hard`)                                                                                                   | `cheapest`: použije globálne najlacnejšieho kandidáta, hoci stále prekračuje strop (pôvodné správanie). `strict`: odmietne vykonať výber — požiadavka okamžite zlyhá s kódom `HTTP 402` namiesto tichého prekročenia rozpočtu. Neznáme hodnoty sa ignorujú.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (ostatné hodnoty sú rezervované)                                                                                                                                                               | Adaptívny rozpočet na uvažovanie: keď požiadavka neobsahuje **žiadne** pole uvažovania v akejkoľvek podobe (`reasoning_effort`, `reasoning`, `thinking`), brána prevedie hodnotu `auto` na `low`/`medium`/`high` na základe deterministických signálov zo štruktúry požiadavky (dĺžka poslednej správy používateľa, veľkosť kontextu po poslednú správu používateľa, predchádzajúce výsledky nástrojov, hĺbka cyklu nástrojov). Signály sú obmedzené na aktuálny ťah — všetko za poslednou správou používateľa sa ignoruje — takže každá požiadavka v cykle nástrojov sa vyhodnotí na rovnakú úroveň (bezstavové pripnutie pre daný ťah, žiadny stav relácie, žiadne zvýšenie úrovne uprostred cyklu, ktoré by narušilo prefixy vyrovnávacej pamäte promptov nadradeného systému). Explicitné pole uvažovania zadané klientom má vždy prednosť. Platí pre požiadavky, ktorých odoslanie do nadradeného systému sa vyhodnotí na formát OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je pole vo formáte OpenAI, takže hlavička nemá žiadny účinok na požiadavku smerovanú na Claude alebo Gemini (pozrite `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Vynúti najrýchlejší profil, obmedzí túto požiadavku na $0.05 a namiesto prekročenia rozpočtu ju úplne zablokuje
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Vyhodnotenie je čistá funkcia (`open-sse/services/autoCombo/requestControls.ts`);
vyhodnotené hodnoty vstupujú do existujúcich vstupov mechanizmu `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Uložená hodnota `config.budgetFallback` kombinácie ("strict" |
"cheapest") nastavuje trvalú politiku; hlavička ju prepíše pre jednu požiadavku.

## Všetky stratégie smerovania

OmniRoute's combo engine podporuje** 22 smerovacích stratégií** (deklarované v `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Samotný motor Auto Combo je vystavený v rámci stratégie `auto` ; ostatné sú dostupné pre trvalé kombá.

| Stratégia           | Popis                                                                                                                                                                                                                                                  |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Prvý cieľový zoradený zoznam s explicitnou prioritou                                                                                                                                                                                                   |
| `weighted`          | Náhodné vážené podľa hmotnosti každého cieľa                                                                                                                                                                                                           |
| `round-robin`       | Prechádzajte cieľmi v poradí (dávkové; pozri nižšie)                                                                                                                                                                                                   |
| `context-relay`     | Odovzdanie kontextu medzi cieľmi (dlhé rozhovory)                                                                                                                                                                                                      |
| `fill-first`        | Pred prechodom na ďalší vyplňte kvótu každého cieľa                                                                                                                                                                                                    |
| `p2c`               | Power-of-2-choices náhodné vyrovnávanie záťaže                                                                                                                                                                                                         |
| `random`            | Jednotný náhodný výber                                                                                                                                                                                                                                 |
| `least-used`        | Vyberte cieľ s najnižším prúdovým zaťažením                                                                                                                                                                                                            |
| `cost-optimized`    | Minimalizujte $ za požiadavku podľa katalógových cien                                                                                                                                                                                                  |
| `reset-aware` ⭐    | Uprednostnite podľa času resetovania kvóty — krátke resetovacie okná sú hodnotené vyššie                                                                                                                                                               |
| `reset-window`      | Uprednostniť ciele, ktorých okno kvóty sa resetuje čo najskôr                                                                                                                                                                                          |
| `expiry-first`      | Utraťte účet, ktorého kvóta by inak vypršala, nevyužitá ako prvá — najvyššia zvyšná suma s najbližším termínom resetovania ide ako prvá                                                                                                                |
| `headroom`          | Vyberte cieľ s najväčšou zostávajúcou rezervou kvóty                                                                                                                                                                                                   |
| `quota-weighted`    | Preskočte vyčerpané účty a potom vyberte spomedzi ostatných v pomere k zostávajúcej kvóte vydelenej nákladom počas letu; existujúce konverzácie zostanú pripnuté                                                                                       |
| `strict-random`     | Náhodné bez deduplikácie opakovaní                                                                                                                                                                                                                     |
| `auto`              | Použite automatické kombo bodovanie (16-faktorové) —** odporúčané**                                                                                                                                                                                    |
| `lkgp`              | Posledná známa dobrá cesta (pripne posledného úspešného poskytovateľa, potom sa vráti k pravidlám)                                                                                                                                                     |
| `context-optimized` | Vyberte cieľ, ktorý najlepšie vyhovuje aktuálnej veľkosti kontextu                                                                                                                                                                                     |
| `cache-optimized`   | Zmeňte poradie cieľov podľa afinity rýchlej vyrovnávacej pamäte — Najprv sa vyskúša pripojenie, ktoré už pravdepodobne obsahuje predponu tejto požiadavky vo vyrovnávacej pamäti (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)             |
| `fusion` 🧬         | Rozviňte paralelne panel modelov a potom pomocou porotcu syntetizujte jednu odpoveď (pozri nižšie)                                                                                                                                                     |
| `pipeline`          | Spustite ciele postupne, pričom výstup každého kroku sa prenesie do vstupu nasledujúceho kroku; vráti sa iba konečná odpoveď (#6396)                                                                                                                   |
| `jev`               | zoznam preferencií zoradených používateľmi; TypeSafe Jev pripúšťa, ktoré položky sa spúšťajú pre túto požiadavku. Prvý víťaz, ostatné povolené ciele udržujú užívateľský poriadok. Otvára sa na objednávku používateľa, keď je Jev nedostupný (#15276) |

⭐ = Novinka vo verzii 3.8.0 · 🧬 = Novinka vo verzii 3.8.36

### sémantika `weighted`

`weighted` je a** proporcionálne náhodné žrebovanie na žiadosť** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nie ekvalizér:

- Každá žiadosť sa žrebuje** jeden** krok s pravdepodobnosťou `weight / totalWeight`; zostávajúce kroky sú zoradené podľa zostupnej váhy ako záložný reťazec pre danú požiadavku.
- Krok, ktorého hmotnosť je `0` (alebo chýba), je** nikdy nekreslené** zatiaľ čo akýkoľvek iný krok má váhu > 0 — môže slúžiť len ako záložný krok, keď nakreslený krok zlyhá. Len keď** všetky** váhy sú 0, výber bude jednotný.
- Kroky, ktorých ciele sú nedostupné — poskytovateľ obvodu `OPEN`, ochladzovanie pripojenia, blokovanie modelu — sú odstránené zo žrebovania skôr, ako sa tak stane (`open-sse/services/combo/targetResolution.ts`), takže každú požiadavku môže dočasne vyhrať jeden zdravý krok.
- `stickyWeightedLimit` (kombinovaná konfigurácia, predvolené `1` = vypnuté) pripne nakreslený krok pre toľko po sebe nasledujúcich úspechov pred opätovným vykreslením.

Na presné striedanie použite `round-robin`; rovnaké váhy na `weighted` poskytujú štatistické — nie striktné — zostatok.

### Agentický režim potrubia

Kombinácia `pipeline` s najmenej dvoma modelmi sa môže rozhodnúť pre smerovanie planner/executor pomocou `config.agenticOrchestration.enabled`. Prvý cieľ vlastní plánovanie a konečné odpovede; druhý cieľ vydáva volania nástroja natívneho klienta. OmniRoute deteguje pokračovanie výsledkov nástroja z protokolu požiadaviek, pýta sa plánovača, či je potrebné ďalšie kolo nástroja, a dynamicky robí z vykonávateľa alebo plánovača posledný krok, ktorý je pred klientom.

Voliteľné `config.agenticOrchestration.contextCompaction` aplikuje samostatný rozpočet užitočného zaťaženia pred každým odoslaním plánovača alebo vykonávateľa. Povoliť explicitne:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Ide o serializované rozpočty znakov JSON vybrané operátorom, nie kontextové okná tokenov alebo garantované upstream limity. Presný model IDs prepíše predvolené nastavenie. Nad prahovou hodnotou zhutnenie odstraňuje identické definície nástrojov, orezáva evidenciu nadmerných nástrojov pomocou súhrnu a odstraňuje staré kompletné skupiny histórie smerom k cieľovému pomeru. Zachováva inštrukcie system/developer, najnovšiu požiadavku používateľa, posledné kolo nástroja vrátane paralelného calls/results a vedúcu smerovaciu inštrukciu Gemini. Zachovajú sa pokyny na najvyššej úrovni a nastavenia nástrojov. Značka vynechania zaznamenáva odstránenú históriu; ide o deterministické orezávanie, nie o sémantické zhrnutie. Ak pripnutý kontext stále prekračuje rozpočet, žiadosť pred kontaktovaním modelu vráti 413. Keď je zhutňovanie vypnuté alebo je pod prahovou hodnotou, požiadavka prechádza nezmenená.

Pri pokračovaní výsledkov nástroja OmniRoute tiež zastaví vykonávanie, keď dve po sebe idúce dokončené kolá opakujú rovnaké volania nástroja s nezmenenými výsledkami, alebo keď zlyhal každý explicitne označený výsledok v dvoch po sebe nasledujúcich kolách. Zmenené výsledky umožňujú opakované volania (napríklad hlasovanie). Strážca sa resetuje na novú požiadavku používateľa, zoskupí paralelné hovory do jedného kola a podporuje históriu Anthropic, dokončenia chatu, odpovedí a Gemini. Plánovač dostane dôvod a vlastní konečnú odpoveď, aj keď požaduje ďalšie kolo nástroja.

Ďalšie modely po druhom cieli sú objednané zálohy vykonávateľa. Zlyhaná odozva HTTP alebo výnimka prenosu postupuje k ďalšiemu vykonávateľovi, ktorý nesie rovnaké rozhodnutie plánovača a natívne nástroje, ale výzvu na vykonanie vlastného kroku a vyriešené pripojenie. Prvá úspešná odpoveď sa vráti nezmenená, vrátane streamovania SSE ; zlyhania po úspešnom spustení streamu tu nemožno zopakovať. Ak zlyhajú všetci exekútori, vráti sa posledné zlyhanie. Klient preruší zastavenie odoslania.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Vykonávateľ môže vyslať viacero nezávislých volaní v jednej odpovedi. Závislé hovory sa spracúvajú v neskorších turnusoch klientskych nástrojov a výsledkov, pričom plánovač kontroluje každý výsledok. `maxToolRounds` je predvolene `8` a akceptuje `1`–`32`; po dosiahnutí musí plánovač vytvoriť najlepšiu dostupnú konečnú odpoveď. Rozhodnutia interného plánovača sa ukladajú do vyrovnávacej pamäte, zatiaľ čo vybratá odpoveď pre klienta zachováva pôvodné preferencie streamovania.

### `round-robin` lepkavá dávka a rozšírenie účtu

Round-robin je dávkový, nie jedna požiadavka na krok:

- `stickyRoundRobinLimit` (kombinovaná konfigurácia, potom `comboStickyRoundRobinLimit`, potom `settings.stickyRoundRobinLimit`, predvolená hodnota** 3** ) si pred otočením udrží rovnaký cieľ pre toľko po sebe idúcich úspechov. Nastavte prepísanie komba na `1` pre rotáciu s jednou požiadavkou. Kombinovaný editor zobrazuje efektívnu hodnotu a vrstvu, z ktorej pochádza.
- `connectionAwareExpansion` (kombinovaná konfigurácia, potom nastavenia, predvolené** falošný** ) rozširuje každý krok na úrovni poskytovateľa na ciele pre jednotlivé účty pred rotáciou. Stratégie skupiny B (prioritná, vážená, cyklická, náhodná, p2c, najmenej používaná, nákladovo optimalizovaná, lkgp, fill-first, striktne náhodná, kontextovo optimalizovaná, cache-optimalizovaná, kontextová relé, fúzia, pipeline, jev) si uchovávajú zobrazenie na úrovni poskytovateľa, kým sa nezapne. Kombinovaný editor odhaľuje dedičstvo / zapnutie / vypnutie; dedičstvo používa globálne predvolené nastavenie (vypnuté).
- Prompt-cache local routing (`promptCacheAffinityEnabled`, predvolené** pravda** ) zmení poradie pripnutých pripojení tak, aby zhodné kľúče vyrovnávacej pamäte zostali na jednom účte. Má prednosť pred obojstrannou a váženou rotáciou medzi pripnutými krokmi pre jednotlivé účty. Ak potrebujete striktnú rotáciu, vypnite ho v časti Nastavenia → Combo predvolené. Neexistuje žiadne prepísanie pre jednotlivé kombinácie.

Uprednostňujte rotáciu viacerých účtov na jednom modeli** jeden krok dynamického účtu** (prázdne `connectionId`, celý bazén) s lepivým limitom `1`, nie tri pripnuté `connectionId` s. Pripnuté kroky plus afinita sa zrútia na rovnaký účet, aj keď sa počítadlo RR posúva.

## Stratégia fúzie

`fusion` je jediná stratégia, ktorá to robí** nie** vybrať jeden cieľ. To fandí výzva von** každý panelový model paralelne** , potom konfigurovateľný** sudcovský model** syntetizuje jednu konečnú odpoveď zo všetkých odpovedí panelu. Prenesené z upstream `decolua/9router` (OpenRouter's Fusion dizajn); implementácia v `open-sse/services/fusion.ts`.

Ako to funguje:

0. **Obtok ložísk nástroja** — požiadavka, ktorá nesie neprázdne pole `tools` so `tool_choice` ktoré nie je explicitne uvedené `"none"` preskočí panel úplne: smeruje priamo k jedinému modelu (nakonfigurovanému sudcovi alebo `panel[0]`) so `tools`/`tool_choice` ktorý prešiel nezmenený. Členovia panelu nemajú prístup k nástrojom a príkaz sudcu na syntézu odrádza od emisie vyvolania nástroja, takže klienti agentic/tool-calling dostanú skutočné rozhodnutie o vyvolaní nástroja namiesto syntetizovanej prózy (#6771).
1. **Fan-out** (iba požiadavky, ktoré nesúvisia s nástrojmi) — výzva sa odošle každému modelu panelu naraz, vynútené nestreamovanie s odstránenými nástrojmi (sudca potrebuje na syntetizovanie kompletnú prózu).
2. **Zbierka milosti kvóra** — hneď ako dorazia odpovede `minPanel`, pre opozdilcov sa spustí krátky časový spínač a potom pokračuje fúzia so všetkým, čo sa nazbieralo. Toto obmedzuje penalizáciu najpomalšieho modelu v čase múru, ktorý je ohraničený tvrdým časovým limitom.
3. **Syntéza sudcu** Odpovede panelu — sú anonymizované (`Source 1`, `Source 2`, … — takže porotca váži látku, nie značku modelu) a odovzdajú sa porotcovi, ktorý analyzuje konsenzus / rozpory / čiastočné pokrytie / jedinečné poznatky / slepé miesta a potom napíše** jeden** smerodajná odpoveď. Rozhodca zachová pôvodné nástroje `stream` flag + klienta, takže streamovanie a následné používanie nástroja stále funguje.
4. **Pôvabná degradácia** — 0 panel odpovedí → `503`; presne 1 preživší → že odpoveď je vrátená priamo (nie je potrebné spojiť); panel s jedným modelom odpovedá priamo.

Člen panelu môže byť tiež krokom `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) odkazujúcim na inú kombináciu — ktorú rieši ako** jeden panelový hlas čiernej skrinky** (úplné rekurzívne odoslanie do odkazovaného komba, nie rozvetvenie vlastných cieľov tohto komba), s rovnakou ochranou depth/cycle, ktorú už používa každá iná stratégia spotrebovávajúca kombo-ref (#6764).

### Konfigurácia

Nakonfigurované na blobe `config` komba (bez migrácie schémy — opätovne používa existujúcu tabuľku `combos` ):

| Pole                                     | Typ      | Predvolené          | Účel                                                                                          |
| :--------------------------------------- | :------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvý panelový model | Model, ktorý syntetizuje konečnú odpoveď                                                      |
| `config.fusionTuning.minPanel`           | `number` | `2`                 | Úspešné odpovede sa vyžadujú pred spustením časovača odkladu (pripevnené na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`              | Ako dlho čakať na zaostávajúcich po dosiahnutí kvóra                                          |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`             | Absolútny uzáver, takže jeden zavesený model nemôže zastaviť požiadavku                       |

Predvolené hodnoty sú aktívne v `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Príklad

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Potom to nazvite ako každé kombo: `{"model":"fusion-panel","messages":[...]}`.

## Virtuálna továreň Auto-Combo

Mechanizmus Auto Combo nevyžaduje vopred definované kombá. Namiesto toho `open-sse/services/autoCombo/virtualFactory.ts` vytvára kandidátov dynamicky:

1. Načíta `getProviderConnections({ isActive: true })` (všetky povolené pripojenia)
2. Vyfiltruje tie, ktoré majú platné prihlasovacie údaje (kľúč API alebo neexpirovaný token OAuth overený pomocou `hasUsableOAuthToken()`)
3. Porovná ich s `getProviderRegistry()` s cieľom zistiť dostupnosť modelov a ceny
4. Pre každú trojicu `(provider, model, connection)` vytvorí `VirtualAutoComboCandidate`
5. Ako cieľ odoslania vyberie `connection.defaultModel` (alebo prvý model v registri)
6. Každého kandidáta ohodnotí pomocou 16-faktorovej funkcie `scorePool()` a balíka váh daného variantu
7. Vráti výslednú konfiguráciu `AutoComboConfig` v pamäti pre `handleComboChat()` — nikdy sa neukladá do DB

To znamená, že **pridanie nového poskytovateľa s povoleným `auto/*` automaticky rozšíri množinu kandidátov** — nie je potrebné manuálne upravovať kombo. Virtuálne kombo sa vytvára nanovo pri každej požiadavke, takže novo pridané alebo opätovne funkčné pripojenia sa zohľadnia okamžite.

## Samooprava

- **Dočasné vylúčenie**: Skóre < 0.2 → vylúčenie na 5 min. (progresívne predlžovanie, max. 30 min.)
- **Zohľadnenie ističa**: OPEN → automaticky vylúčené; HALF_OPEN → skúšobné požiadavky
- **Režim incidentu**: >50 % OPEN → vypnutie prieskumu, maximalizácia stability
- **Obnovenie po prestávke**: Po skončení vylúčenia je prvá požiadavka „skúšobná“ so skráteným časovým limitom

## Prieskum pomocou banditového algoritmu

5 % požiadaviek (konfigurovateľné) sa na účely prieskumu smeruje k náhodným poskytovateľom. V režime incidentu je táto funkcia vypnutá.

## API

**Neexistuje žiadny vyhradený koncový bod `POST /api/combos/auto`** — Auto-Combo sa používa dvoma spôsobmi:

1. **Bez konfigurácie (odporúčané):** Odošlite ľubovoľnú požiadavku na dokončenie chatu s `model: "auto"` alebo `model: "auto/<variant>"`. Virtuálna továreň zostaví kombo pre každú požiadavku — nie je potrebné žiadne trvalé uloženie ani volania API.

2. **Trvalo uložené kombo so `strategy: "auto"`:** Vytvorte bežné kombo prostredníctvom `POST /api/combos` a nastavte `strategy: "auto"` spolu s `config.auto.weights` / `config.auto.candidatePool`. Používa sa rovnaký mechanizmus hodnotenia; kombo sa uloží do `combos` a možno ho opakovane používať podľa ID.

Na zisťovanie možností uvádza `GET /api/combos/auto` každý variant s jeho vyhodnotenou množinou kandidátov spolu s `context_length` / `max_output_tokens` — maximálnymi hodnotami zo všetkých kontextových okien v množine kandidátov. Klienti (napr. doplnok opencode) musia uvádzať tieto hodnoty namiesto `0`: nulový kontext úplne zakáže automatickú kompakciu v opencode, čo umožní reláciám rásť, až kým vymazanie histórie bránou nezničí kontext. Uvádzanie maximálnej hodnoty je bezpečné, pretože predbežný filter kontextu automatického komba smeruje príliš veľké požiadavky ku kandidátom s veľkým kontextovým oknom.

```bash
# Použitie bez konfigurácie (bez vytvorenia komba)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Trvalo uložené automatické kombo prostredníctvom bežného koncového bodu pre kombá
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Stratégie automatického smerovača

Trvalo uložené kombá so `strategy: "auto"` môžu nastaviť `config.routerStrategy` (alebo staršie
`config.auto.routerStrategy`) na jednu z týchto hodnôt:

- `rules` — predvolené vážené hodnotenie
- `score` — vyberie najvyššie nakonfigurované vážené skóre. Pri presnej zhode sa zachová nakonfigurované
  poradie kandidátov; existujúca hodnota `explorationRate` vykonáva výber z celej zoradenej množiny.
- `cost` / `eco` — najlacnejší zdravý poskytovateľ
- `latency` / `fast` — najnižšia latencia p95 s penalizáciou za nespoľahlivosť
- `sla-aware` / `sla` — uprednostní kandidátov, ktorí spĺňajú ciele SLO pre latenciu p95, mieru chýb a voliteľne
  náklady
- `lkgp` — najskôr naposledy známy funkčný poskytovateľ
- `nadir` — opýta sa rozhodovacieho API služby [Nadir](https://getnadir.com), ktorý model z množiny
  potrebuje daný prompt; vyžaduje výslovné zapnutie a pri zlyhaní prejde na `rules`

### Podrobnosti o stratégiách smerovača

Mechanizmus automatického komba poskytuje 7 vymeniteľných implementácií **RouterStrategy**,
medzi ktorými môžete prepínať prostredníctvom `config.routerStrategy` (alebo staršieho `config.auto.routerStrategy`).
Každá stratégia vyberie jedného poskytovateľa z množiny kandidátov na základe `RoutingContext`
(typ úlohy, informácie o nástrojoch/vizuálnych vstupoch, odhad počtu tokenov, voliteľné pravidlá SLA, voliteľný
naposledy známy funkčný poskytovateľ).

#### 1. `rules` (predvolené) — 16-faktorové vážené hodnotenie

Obaľuje existujúci mechanizmus hodnotenia. Odfiltruje kandidátov s ističom v stave `OPEN`
a následne spustí `scorePool()` s aktuálnym typom úlohy a `getTaskFitness()`,
pričom vyberie poskytovateľa s najvyšším skóre.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kedy použiť**: Predvolená možnosť. Použite ju, keď chcete vyvážený kompromis medzi všetkými signálmi.

**Alias**: `rules` (bez aliasu)

---

#### 2. `cost` / `eco` — najlacnejší zdravý poskytovateľ

Zoradí množinu kandidátov podľa `costPer1MTokens` (vzostupne) a vyberie najlacnejšieho.
Najskôr odfiltruje kandidátov v stave `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kedy použiť**: Úlohy citlivé na náklady, dávkové spracovanie alebo úlohy na pozadí.

**Aliasy**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najnižšia latencia p95 s penalizáciou za nespoľahlivosť

Zoraďuje podľa `p95LatencyMs + (errorRate * 1000)`. Penalizácia za mieru chýb zaisťuje,
že nespoľahliví poskytovatelia budú umiestnení nižšie, aj keď je ich nominálna latencia nízka.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kedy použiť**: Úlohy citlivé na latenciu, ako sú chat v reálnom čase, automatické dopĺňanie alebo
interaktívni asistenti pri programovaní.

**Aliasy**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — súlad s cieľmi SLO pre latenciu/chyby/náklady

Ohodnotí každého kandidáta podľa toho, ako dobre spĺňa nakonfigurované pravidlá SLO:

| Faktor          | Váha | Vzorec                                                   |
| --------------- | ---- | -------------------------------------------------------- |
| Skóre latencie  | 35%  | `threshold / max(value, ε)`                              |
| Skóre chýb      | 35%  | `threshold / max(value, ε)`                              |
| Skóre zdravia   | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)        |
| Skóre nákladov  | 10%  | `threshold / max(value, ε)` alebo inverzne normalizované |
| Skóre stability | 5%   | inverzne normalizovaná smerodajná odchýlka latencie      |

Keď je `hardConstraints: true`, kandidáti sa zoraďujú primárne podľa **skóre porušenia**
(miery, o ktorú prekračujú niektoré SLO) a následne podľa kombinovaného skóre. V opačnom prípade
sa používa iba kombinované skóre.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... ohodnotí každého kandidáta podľa politiky: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Polia SLA** (nastavujú sa v konfigurácii kombinácie):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kedy použiť**: Produkčné pracovné záťaže s prísnymi limitmi latencie, miery chýb alebo nákladov.

**Aliasy**: `sla-aware`, `sla`

---

#### 5. `lkgp` — posledný známy funkčný poskytovateľ ako prvý

Najprv vyskúša **posledného známeho funkčného poskytovateľa** (ak je nastavený) a potom použije
stratégiu `rules` ako záložnú možnosť. Je to užitočné na zachovanie relácie — následné
požiadavky v konverzácii spracúva rovnaký poskytovateľ.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Použitie stratégie rules ako záložnej možnosti
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kedy použiť**: Viackolové konverzácie, pri ktorých chcete, aby rovnaký poskytovateľ spracúval
následné požiadavky (napr. z dôvodu ukladania do vyrovnávacej pamäte, kontinuity kontextu alebo konzistentnosti cien).

**Alias**: `lkgp` (bez aliasu)

---

#### 6. `nadir` — výber modelu s ohľadom na výzvu prostredníctvom služby Nadir

Každá z vyššie uvedených stratégií zoraďuje kandidátov podľa vlastnej telemetrie; žiadna z nich nečíta
požiadavku. `nadir` odošle posledný vstup používateľa spolu s identifikátormi modelov v skupine
do rozhodovacieho API služby [Nadir](https://getnadir.com) (`POST /v1/bucket`) a smeruje požiadavku na model,
ktorý Nadir vyberie z tejto ponuky (`simple` → najlacnejší vyhovujúci model, `complex` → špičkový
model). Pripojenie obsluhujúce daný model sa naďalej vyberá pomocou `rules`, takže kvóta,
zdravie a náklady naďalej rozhodujú o tom, ktorý účet sa použije.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` a `OMNIROUTE_NADIR_BASE_URL` sú záložné premenné prostredia pre tieto dva
reťazce. `baseUrl` je potrebné iba pre vlastnú inštanciu služby Nadir (koncové `/v1` je akceptované).
Volania bez kľúča smerujú do anonymnej úrovne služby Nadir, ktorá má obmedzenú frekvenciu podľa IP adresy. S kľúčom
([vytvorte si ho](https://app.getnadir.com/dashboard/api-keys)) sa každé rozhodnutie
zaznamená na vašom ovládacom paneli služby Nadir. Kompletné nastavenie a overenie:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Čo sa odosiela mimo systému: text poslednej správy používateľa (prvých 16-tisíc znakov), identifikátory
kandidátskych modelov a značka kanála `source: "omniroute"`. Neodosiela sa systémová výzva, história, nástroje ani
hlavičky.

Správanie pri zlyhaní je typu fail-open: časový limit (predvolene 2000 ms), odpoveď mimo rozsahu 2xx, nedostupný
hostiteľ, chybná odpoveď alebo výber mimo skupiny vedie k rozhodnutiu stratégie `rules`
a dôvod dostane predponu `NadirStrategy: fallback (…)`. Po neúspešnom volaní stratégia
na 30 s preskočí sieťovú komunikáciu, takže výpadok spôsobí jeden časový limit za 30 s namiesto
jedného pri každej požiadavke. Udalosti smerovania uvádzajú `strategy: "nadir"` iba vtedy, keď výber
skutočne vykonal Nadir.

**Kedy použiť**: Prevádzka s rôznou náročnosťou v skupine, ktorá zahŕňa viac úrovní modelov (malý, stredný
a špičkový model), keď chcete znížiť náklady spôsobené neustálym používaním špičkového modelu.

**Alias**: `nadir` (bez aliasu)

---

### Vlastné stratégie smerovača

Prostredníctvom verejného API môžete zaregistrovať vlastnú implementáciu `RouterStrategy`:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Sem patrí vaša logika smerovania
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Potom ju použite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Sprievodca výberom stratégie smerovača

| Prípad použitia         | Stratégia   | Dôvod                                              |
| ----------------------- | ----------- | -------------------------------------------------- |
| Vyvážená pracovná záťaž | `rules`     | Predvolená — zohľadňuje všetky faktory             |
| Minimalizácia nákladov  | `cost`      | Vždy vyberie najlacnejšiu možnosť                  |
| Minimalizácia latencie  | `latency`   | Vyberie najrýchlejšieho spoľahlivého poskytovateľa |
| Prísne SLO              | `sla-aware` | Filtruje podľa limitov p95/chybovosti/nákladov     |
| Viackolový čet          | `lkgp`      | Zachovanie konzistencie relácie                    |
| Rôzna náročnosť         | `nadir`     | Vyberie úroveň modelu pre každý prompt             |

Polia pre SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Vhodnosť pre úlohy

Viac ako 30 modelov bolo ohodnotených v rámci 6 typov úloh (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podporuje vzory so zástupnými znakmi (napr. `*-coder` → vysoké skóre pre programovanie).

## Súhrn variantov Auto

Vrátane samotného `auto` (predvolené) a 6 hodnôt `AutoVariant` deklarovaných v `autoPrefix.ts` existuje **7 vyvolateľných ID modelov**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` samotný vymenúva 6 hodnôt; siedmou možnosťou je „bez variantu“ — samotné `auto` — ktoré funkcia `parseAutoPrefix()` spracuje ako `variant: undefined`.)

## Ako úrovne zapadajú do Auto-Combo

Bodovacia funkcia so 16 faktormi (`open-sse/services/autoCombo/scoring.ts`) považuje
príslušnosť k úrovni za dva signály: `tierPriority` (0.0476) a `tierAffinity` (0.0476). Úplnú
množinu `DEFAULT_WEIGHTS` nájdete v kanonickej [tabuľke faktorov bodovania](#how-it-works-persisted-auto-combos) vyššie — nastavenia pre jednotlivé balíky (ship-fast/cost-saver/quality-first/
offline-friendly) sú uvedené v tabuľke „Váhové profily jednotlivých balíkov“.

Samotná úroveň **nezaručuje**, že sa ako prvá použije úroveň 1 — ak má úroveň 1 vysokú latenciu alebo
neoptimálny pomer ceny a kvality, zvíťazí úroveň 2. Ak chcete vynútiť poradie úrovní, použite
stratégiu kombinácie `priority` a zoraďte poskytovateľov podľa úrovní.

Ak chcete výrazne uprednostniť úroveň 1 (predplatné), zvýšte váhu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definície úrovní a klasifikáciu poskytovateľov nájdete v dokumente [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testovanie a pokrytie

### Deterministická matica smerovania a rozhodovania (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje smerovanie** rozhodnutie** všetkých 21 verejných stratégií end-to-end prostredníctvom skutočného kombinovaného potrubia s falošným upstreamom. Pokrytie zahŕňa:

- Všetkých 21 stratégií `ROUTING_STRATEGY_VALUES` (usporiadané, vážené, náklady, kontext, fúzia, ...).
- `quota-share` (interné) end-to-end: DRR spravodlivosť + saturácia deprioritizácia cez skutočný šev `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay` univerzálne pokrytie všetkých cieľov.

Tento balík beží v CI (`test:integration` job) s `--test-concurrency=1` a `--test-force-exit`, takže je deterministický a nevyžaduje živé poverenia.

### Gated live smoke (NOT v CI — skutoční poskytovatelia)

| Príkaz                                 | Čo to robí                                                                     |
| :------------------------------------- | :----------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Priebežné skutočné smerovanie s `RUN_COMBO_LIVE=1`; snímky živého OmniRoute DB |
| `npm run test:combo:live:vps`          | volania HTTP proti živému serveru OmniRoute (nastavte `COMBO_LIVE_BASE_URL`)   |
| `npm run test:combo:live:vps:failover` | To isté so zámernými scenármi zlyhania                                         |

Tieto dymové testy vykonávajú skutočnú dráhu drôtu (kombo → provider → dokončenie). Sú zámerne vylúčené zo CI pretože vyžadujú živé poverenia a prístup VPS.

---

## Súbory

| Súbor                                                     | Účel                                                                                                       |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16-faktorová bodovacia funkcia, `DEFAULT_WEIGHTS`, bazénová norma                                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Vyhľadávanie fitness úloh modelu ×                                                                         |
| `open-sse/services/autoCombo/engine.ts`                   | Selekčná logika, bandita, rozpočtový strop                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Vylúčenie, sondy, režim incidentu                                                                          |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 hmotnostných profilov (rýchla preprava, úspora nákladov, prvoradá kvalita, offline, spoľahlivosť, chaos) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefix parser + 6 variantov                                                                        |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytvára `AutoComboConfig` v pamäti zo živých spojení                                                       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací hák na zosmiešňovanie registra poskytovateľov                                                    |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 stratégií)                                                                   |
| `src/sse/handlers/chat.ts`                                | Integrácia: auto-prefix skrat                                                                              |
