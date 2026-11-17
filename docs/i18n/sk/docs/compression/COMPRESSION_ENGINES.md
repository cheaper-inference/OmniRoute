# Compression Engines (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Kompresia OmniRoute je postavená na kontraktoch enginov. Režim môže priamo spustiť jeden engine
(`caveman` alebo `rtk`) alebo deterministický skladaný pipeline, ktorý vykonáva viacero enginov v danom poradí.

## Režimy

| Režim        | Cesta k enginu                                                                             | Zamýšľaný vstup                                        |
| :----------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| `off`        | žiadny                                                                                     | Presné zachovanie výzvy                                |
| `lite`       | Caveman lite pomocníci                                                                     | Nízkorizikové vždy zapnuté čistenie                    |
| `standard`   | Caveman                                                                                    | Kondenzácia výzvy v prirodzenom jazyku                 |
| `aggressive` | Caveman + sumarizátory histórie/nástrojov                                                  | Dlhé chatovacie relácie                                |
| `ultra`      | Caveman + pomocníci na orezávanie                                                          | Obnova limitu kontextu                                 |
| `rtk`        | RTK                                                                                        | Výstup terminálu, shellu, buildu, testu a gitu         |
| `omniglyph`  | OmniGlyph                                                                                  | Kontext ako obrázok na natívnom poskytovateľovi        |
| `stacked`    | Pipeline. Predvolená požiadavka je `session-dedup -> lite`. `rtk -> caveman` je voliteľné. | Zmiešané protokoly nástrojov a próza, maximálne úspory |

### Profily kompresie OmniGlyph

Engine `omniglyph` (balík `omniglyph`, 1.4.0+) akceptuje pomenovaný sémantický profil, nastavený
globálne prostredníctvom `omniglyph.profile` v nastaveniach kompresie alebo pre každý krok prostredníctvom
konfigurácie kroku v skladanom pipeline:

| Profil        | Hranica                                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Predvolené. Politika, ktorú merali zverejnené potvrdenky – systém obrázkov, dokumentácia nástrojov a hustá história |
| `balanced`    | Zachováva živý stav natívny, chráni posledných 8 ťahov, zbalí staršiu uzavretú históriu                             |
| `coding-safe` | Zachováva autoritu, schémy nástrojov a živý výstup nástrojov natívny, chráni posledných 12 ťahov                    |
| `passthrough` | Smeruje bez transformácie; engine je preskočený                                                                     |

Profil je **strop, nie podlaha**: `mergeCompressionProfileOptions` v balíku
odmieta povoliť volajúcemu prepísať znovu otvorenú stratovú cestu, ktorú profil uzavrel, takže
`preserveSystemPrompt: false` pre každý krok nemôže znova povoliť kompresiu systému pod `coding-safe`.

Merané na tejto kódovej základni: `coding-safe` a `balanced` zvyšujú `minCompressChars` na svoje
maximum a zachovávajú systém, schémy nástrojov a výsledky nástrojov natívne, takže relácia, ktorá
ešte nenazbierala históriu, sa zastaví na `below_min_chars` a engine nič netransformuje. Preto
je predvolený `aggressive` namiesto najbezpečnejšieho profilu.

Balík rieši svoj vlastný rozsah modelu a profil z konfigurácie prostredia.
OmniRoute nikdy nedeleguje rozhodnutie: adaptér pripína bránu modelu k najreštriktívnejšiemu rozsahu balíka,
takže nastavenia hostiteľského prostredia môžu iba zúžiť zoznam povolených, nikdy ho nerozšíriť
nad merané potvrdenky OmniRoute.

## Register enginov

Register sa nachádza v `open-sse/services/compression/engines/registry.ts`. Enginy poskytujú spoločný
kontrakt:

- `id`: stabilný identifikátor enginu, napríklad `caveman` alebo `rtk`
- `apply(text, config)`: pôvodná cesta vykonávania používaná skladanými reťazcami spracovania
- `compress(input, config)`: primárna cesta vykonávania vracajúca text + štatistiky
- `getConfigSchema()`: vracia štruktúru platnej konfigurácie podobnú JSON Schema
- `validateConfig(config)`: vracia `{ valid, errors[] }`

Registrácia používa `registerCompressionEngine(engine)` (alebo `registerEngine` v pokročilých prípadoch),
ktorá pred prijatím volá `assertValidEngine()` a `validateConfig(defaultConfig)`.
Na odstránenie enginu počas behu použite `unregisterCompressionEngine(id)`.

`strategySelector.ts` registruje vstavané enginy pred spustením kompresie. Vďaka tomu môžu náhľad,
kompresia počas behu, skladaný režim, testy a budúce enginy používať rovnakú cestu vykonávania.

### Kompresia opisov MCP (súvisiace)

Samostatný register komprimuje metadáta opisov nástrojov MCP na úrovni registra — pozrite si
`open-sse/mcp-server/descriptionCompressor.ts` a [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Opätovne používa
pravidlá Caveman, ale pracuje s metadátami nástrojov, nie s dátami požiadaviek.

### Ďalšie vstavané enginy

Okrem Caveman, RTK a LLMLingua-2 register obsahuje niekoľko špecializovaných bezstratových /
štrukturálnych enginov (používaných skladanými reťazcami spracovania, interaktívnym prostredím a testami):

| Engine        | Id              | Čo robí                                                                                                                                                                            |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): nahrádza veľké súvislé bloky textu referenciami adresovanými podľa obsahu, takže opakované/veľké bloky sa odošlú raz a následne sa na ne odkazuje. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bezstratová tabuľková kompakcia dát homogénnych polí JSON do stĺpcovej formy `[N rows]`.                                                                   |
| ionizer       | `ionizer`       | Vzorkovanie riadkov zo začiatku, stredu a konca veľmi veľkých homogénnych blokov, pričom vynechaný stred sa uloží ako referencia CCR adresovaná podľa obsahu.                      |
| session-dedup | `session-dedup` | Deduplikácia medzi ťahmi adresovaná podľa obsahu (inšpirovaná TokenMizer): vynecháva text, ktorý sa už objavil v predchádzajúcich ťahoch tej istej relácie.                        |

**Inštrukcia protokolu načítania CCR (#8033):** keď CCR prvýkrát nahradí ≥1 blok v
požiadavke, engine pridá na začiatok jednu idempotentnú správu `system` (začínajúcu
sentinelom `[CCR protocol]`), ktorá volajúcemu vysvetľuje kontrakt značka → nástroj: čo znamená
značka `[CCR retrieve hash=<24hex> chars=N]`, že hash sa musí skopírovať doslovne
(všetkých 24 hexadecimálnych znakov — nesprávne skopírované hashe sú pravdepodobnou príčinou
chýb „blok sa nenašiel“) a že značka `[dedup:ref sha=...]` znamená „pozri sa späť do histórie“, nie „zavolaj
nástroj“. Poznámka sa vloží **iba vtedy, keď volajúcim inzerované `tools[]` preukazujú, že sa
skutočne dokáže dostať k `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` v
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — bežný
volajúci kompatibilný s OpenAI bez tohto nástroja nikdy nedostane inštrukciu, aby zavolal niečo,
k čomu nemá prístup. Idempotencia sa zabezpečuje kontrolou histórie správ na prítomnosť sentinelu
pred vložením, takže požiadavky s viacerými ťahmi (ktoré opätovne prehrávajú predchádzajúce správy) nepridávajú
poznámku raz za každý ťah.

## Caveman

Režim Caveman sa zameriava na sémantickú kondenzáciu bežnej prózy:

- zachováva bloky kódu, adresy URL, JSON, cesty a štruktúrované údaje
- odstraňuje výplňové slová, vyhýbavé formulácie, opakovaný kontext a rozvláčne spojovacie frázy
- podporuje jazykovo špecifické balíky pravidiel pre súbory v `open-sse/services/compression/rules/`
- zostáva dostupný prostredníctvom starších režimov `standard`, `aggressive` a `ultra`

V ovládacom paneli sa nachádza v časti `Dashboard -> Context & Cache -> Caveman`.

Projekt Caveman uvádza približne o `~75%` menej výstupných tokenov, priemernú úsporu výstupu `65%` v benchmarkoch
s rozsahom `22-87%` a nástroj na kompresiu vstupu s hodnotou `~46%`. OmniRoute používa hodnotu Caveman pre vstupnú
kompresiu pri dokumentovaní kombinovaných úspor promptov/kontextu; výstupný režim Caveman zostáva samostatnou
funkciou ovplyvňujúcou správanie odpovedí.

## RTK

Režim RTK sa zameriava na výstup príkazov a nástrojov:

- rozpoznáva triedy výstupu, ako sú `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testy Cargo/Go, zostavenia TypeScript/Vite/Webpack, ESLint, audity/inštalácie npm, protokoly Docker,
  shellové príkazy `find`/`grep`, trasovania zásobníka a všeobecné protokoly
- používa 49 filtrov JSON z `open-sse/services/compression/engines/rtk/filters/`
- podporuje deklaratívny pipeline v štýle RTK: odstraňovanie ANSI, nahrádzanie, predčasné ukončenie pri zhode výstupu,
  odstraňovanie/zachovávanie riadkov, skrátenie jednotlivých riadkov, skrátenie podľa začiatku/konca/maximálneho počtu riadkov a náhradný výstup pri prázdnom výsledku
- podporuje projektové filtre podmienené dôveryhodnosťou v `.rtk/filters.json` a globálne filtre v
  `DATA_DIR/rtk/filters.json`
- odstraňuje sekvencie ANSI, šum indikátorov priebehu, opakované riadky a neužitočný štandardný text
- zachováva chyby vyžadujúce zásah, upozornenia, súhrny, zmenené súbory a kontext na konci
- môže voliteľne uchovávať redigovaný nespracovaný výstup na obnovenie/ladenie prostredníctvom autentifikovaných správcovských
  trás

V ovládacom paneli sa nachádza v časti `Dashboard -> Context & Cache -> RTK`.

Prevádzkové podrobnosti o vlastných filtroch, dôveryhodnosti, overovaní a obnovení nespracovaného výstupu nájdete v
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Projekt RTK uvádza úsporu `60-90%` pri kompresii výstupu príkazov. Príklad v jeho súbore README ukazuje,
že počet tokenov počas 30-minútovej relácie Claude Code klesol z `~118,000` na `~23,900`, čo predstavuje úsporu `79.7%`.

## LLMLingua-2 (Sémantické prerezávanie)

Režim LLMLingua-2 vykonáva **sémantické prerezávanie tokenov** v próze pomocou malého klasifikátora
tokenov ONNX, čím dopĺňa enginy Caveman a RTK založené na pravidlách:

- komprimuje prózu iba v nesystémových správach; ohraničené bloky kódu a ďalšie zachovávané
  konštrukcie sa nikdy nemenia
- spúšťa backend `@atjsh/llmlingua-2` (ONNX prostredníctvom `@huggingface/transformers`) vo
  vlákne workera, takže inferencia modelu nikdy neblokuje slučku udalostí požiadavky
- je **kombinovateľný** (`stackPriority` 35): v kombinovanom pipeline sa spúšťa po
  štrukturálnych enginoch (CCR, session-dedup, headroom, Caveman), ale pred režimom `ultra`, pretože
  sémantické prerezávanie je najúčinnejšie na už štrukturálne komprimovanom texte — napr.
  `rtk -> caveman -> llmlingua`
- pri **akejkoľvek chybe pokračuje bez kompresie** (chýbajúce voliteľné závislosti, spustenie workera, načítanie modelu, inferencia
  alebo časový limit) → pôvodný text sa vráti bez zmeny, nikdy nie chyba

Umiestnenie enginu: `open-sse/services/compression/engines/llmlingua/`. V ovládacom paneli sa nachádza
v časti `Dashboard -> Context & Cache -> LLMLingua`.

### Modely

Predvoleným modelom je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rýchly). Presnejší model **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) je dostupný prostredníctvom poľa `model` v konfigurácii enginu. `@huggingface/transformers`
pri prvom volaní (`modelStore.ts`) podľa potreby stiahne vybraný model z HuggingFace Hub do
`${DATA_DIR}/models/llmlingua`; prepísanie konfigurácie pomocou `modelPath` ho namiesto toho
nasmeruje na lokálnu kópiu (offline / izolované inštalácie).

### Voliteľné závislosti a inštalácia na požiadanie

Odstrániteľná sada peer závislostí behového prostredia LLMLingua je **voliteľná**. Dva balíky sú deklarované ako
`optionalDependencies` v `package.json` a produkčné zostavenie ich ponecháva **externé**
(`scripts/build/prepublish.ts` ich nepribaľuje):

| Balík                | Verzia (pevne stanovená) | Poznámky                                   |
| -------------------- | ------------------------ | ------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`                  | Vstupný balík; ostatné deklaruje ako peers |
| `js-tiktoken`        | `^1.0.20`                | Tokenizátor                                |

`@huggingface/transformers` je pevne nastavený na `^4.2.0` (zdieľaný s cestou lokálnych embeddingov a
zahrnutý aj do samostatného balíka); `@atjsh/llmlingua-2@2.0.5` ho deklaruje ako peer s rozsahom
`"^3.5.2 || ^4.0.0"`, takže sú podporované verzie Transformers.js v3 aj v4. Od verzie 2.0.4
už `@atjsh/llmlingua-2` nevyžaduje `@tensorflow/tfjs`, čím sa zo sady SLM odstránila jej najväčšia
samostatná súčasť (TensorFlow.js). Odstrániteľnými peer závislosťami SLM sú iba dva balíky uvedené vyššie.
Štandardný príkaz `npm install` (vývojové prostredie) nainštaluje voliteľnú sadu automaticky, pokiaľ nie sú voliteľné
závislosti vynechané.

**Prečo na požiadanie:** balík publikovaný v npm, samostatný balík a obraz Docker sa
dodávajú **bez** týchto závislostí, aby zostali malé. Ak chýbajú, kontrola závislostí workera
(sonda rozlíšenia `@atjsh/llmlingua-2` v `worker.ts`) zlyhá a engine
**potichu pokračuje bez kompresie** — výber režimu LLMLingua nevykoná žiadnu operáciu (text sa vráti bez zmeny a
nezaznamená sa žiadna chyba). Ak ho chcete aktivovať v prostredí s odstránenými závislosťami, nainštalujte voliteľnú sadu:

```bash
# použite verzie deklarované v package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Odstránenie `@tensorflow/tfjs` (2.0.4+) eliminuje predtým dominantnú súčasť s veľkosťou ~800 MB
— zostávajúcu veľkosť tvoria behové prostredia transformers.js + onnxruntime-node
a model TinyBERT (~57 MB), ktorý sa stiahne pri prvom použití (nie prostredníctvom npm).

Pre jednotlivé prostredia:

- **Vývoj / `npm install`** — nainštaluje sa automaticky, pokiaľ ste nepoužili `--omit=optional`
  (alebo `--no-optional`). Nie je potrebná žiadna akcia.
- **Globálny npm (`npm i -g omniroute`) / samostatná inštalácia** — spustite vyššie uvedený inštalačný príkaz v adresári
  nainštalovaného balíka alebo ho preinštalujte bez vynechania voliteľných závislostí.
- **Docker** — pridajte inštalačný príkaz do vrstvy odvodeného obrazu; publikovaný obraz
  je zámerne odľahčený.
- **VPS (PM2)** — nainštalujte ho do `node_modules` aplikácie a potom reštartujte proces, aby
  worker znova skontroloval bránu.
- **Neupravený samostatný režim Next (`npm run build` → `.build/next/standalone/server.js`)** — samostatný
  trace neobsahuje ANI worker, ANI voliteľné závislosti, takže engine potichu pokračuje v otvorenom režime.
  `scripts/build/colocate-standalone.mjs` znova pridá oboje (worker zostavený cez esbuild +
  úplný strom voliteľných závislostí do samostatného stromu); spúšťa sa automaticky prostredníctvom
  npm hooku `postbuild` po každom zostavení. Je idempotentný a pri chýbajúcich závislostiach zlyhá bezpečne.

**Overenie, že je aktívny:** keď je vybraný LLMLingua, skutočný text sa naozaj skráti (engine
prestane pokračovať v otvorenom režime) a prvá požiadavka spustí stiahnutie modelu do
`${DATA_DIR}/models/llmlingua`. Brána zámerne kontroluje iba `@atjsh/llmlingua-2` —
ostatné peer závislosti sú určené výhradne pre ESM a `require.resolve` pri nich vyhodí výnimku, aj keď sú prítomné — takže
worker naďalej pokračuje v otvorenom režime, ak pri volaní `import()` skutočne chýba ktorákoľvek peer závislosť.

## Zreťazené pipeline

Zreťazený režim spúšťa kroky pipeline v poradí. Predvolené poradie je:

```txt
rtk -> caveman
```

Použite ho pre relácie kódovacích agentov, v ktorých prompt kombinuje výstup príkazov s textom od človeka alebo asistenta. RTK najprv zredukuje zahlcujúce protokoly nástrojov a potom Caveman skomprimuje zostávajúci prirodzený jazyk.

Kroky pipeline sa konfigurujú pomocou `stackedPipeline` v nastaveniach kompresie alebo prostredníctvom kombinácií kompresie.

Keď oba enginy zredukujú rovnaký vhodný obsah, úspory sa násobia:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter stromu prístupnosti MCP

Inteligentný filter stromu prístupnosti MCP je kompresná vrstva po vykonaní, ktorá sa spúšťa nad **výsledkami nástrojov** MCP, nie nad promptmi ani kontextom. Zameriava sa na objemné dátové obsahy stromu prístupnosti a snímok prehliadača, ktoré vracajú nástroje ako Playwright, computer-use a servery MCP na automatizáciu prehliadača.

### Čo robí

1. **Odstránenie šumu** — odstraňuje prázdne generické/textové položky (`- generic:`, `- text: ""`)
2. **Zbalenie súrodencov** — keď je ≥ `collapseThreshold` (predvolene 30) po sebe idúcich riadkov štrukturálne sa opakujúcich, zbalí ich na prvých `collapseKeepHead` (predvolene 10) riadkov + súhrn počtu + posledných `collapseKeepTail` (predvolene 5) riadkov
3. **Zachovanie referencií** — kotvy `[ref=eXX]` vyžadované nástrojmi Playwright/computer-use zostanú vždy nedotknuté
4. **Pevné skrátenie** — ak text po zbalení stále presahuje `maxTextChars` (predvolene 50 000), skráti ho a pridá navigačnú pomôcku, aby agent mohol pokračovať v práci

### Umiestnenie enginu

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← vstupný bod smartFilterText()
  collapseRepeated.ts ← algoritmus zbalenia súrodencov
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurácia

Ovláda sa pomocou `compression.mcpAccessibility` v globálnych nastaveniach (migrácia 056). Predvolená konfigurácia:

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

Filter sa použije iba na dátové obsahy výsledkov nástrojov, ktorých `type` je `"text"` a ktorých dĺžka presahuje `minLengthToProcess`. Neovplyvňuje kompresiu promptov ani dátové obsahy požiadaviek.

### Očakávané úspory

60–80 % pri výsledkoch nástrojov obsahujúcich snímky prehliadača v závislosti od zložitosti stránky. Algoritmus zbalenia má zložitosť O(n) vzhľadom na počet riadkov a pridáva zanedbateľnú latenciu.

### Tento filter v porovnaní s kompresnými enginmi uvedenými vyššie

| Aspekt           | Caveman / RTK / Stacked     | Filter prístupnosti MCP                |
| ---------------- | --------------------------- | -------------------------------------- |
| Cieľ             | Prompty/kontext požiadaviek | Výsledky nástrojov MCP                 |
| Spúšťač          | Nastavenie režimu kompresie | `compression.mcpAccessibility.enabled` |
| Rozsah           | Všetky správy SSE           | Iba výsledky nástrojov                 |
| Kotvy referencií | N/A                         | Vždy zachované                         |

---

## Kombinácie kompresie

Kombinácie kompresie sú pomenované profily kompresie, ktoré možno priradiť ku kombináciám smerovania:

- `compression_combos`: ukladá režim, pipeline, konfiguráciu RTK, konfiguráciu jazyka a označenie predvolenej možnosti
- `compression_combo_assignments`: mapuje kombináciu kompresie na kombináciu smerovania
- integrácia za behu vyrieši priradenú kombináciu kompresie pred všeobecnými prepísaniami kombinácií
- analytika zahŕňa `compression_combo_id` a `engine`

Umiestnenie v ovládacom paneli: `Dashboard -> Context & Cache -> Compression Combos`.

## Predpoklady / sprievodca operátora (CCR & session-dedup)

CCR (`ccr`) a `session-dedup` nahradia alebo vynechajú text a ponechajú a** marker** pozadu. Táto časť je referenciou pre operátora na zapojenie klienta, čítanie dvoch značiek a načítanie alebo diagnostiku elided obsahu. Mechanika každého motora je uvedená vyššie; toto je vrstva „ako to spustím“.

### Transporty a koncové body

Server MCP, ktorý odhaľuje nástroje CCR, je možné dosiahnuť tromi spôsobmi. Predvolený základ URL je `http://localhost:20128` (`OMNIROUTE_BASE_URL`):

| Doprava                                  | URL / príkaz                            | Poznámky                                                                                                                                           |
| ---------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Streamovateľné HTTP (klient, odporúčané) | `http://localhost:20128/api/mcp/stream` | Koncový bod, s ktorým hovoria súčasní klienti MCP.                                                                                                 |
| Legacy SSE singleton                     | `http://localhost:20128/api/mcp/sse`    | Staršia singletonová doprava. to** zatvára** streamovateľné relácie; použite klientov `streamable-http` proti `/api/mcp/stream`, nie proti tomuto. |
| stdio                                    | `omniroute --mcp`                       | Pre konfiguráciu IDE MCP, ktorá spúšťa proces. Neexistuje žiadna vlajka `--dev` ; `omniroute --mcp` je vstupný bod stdio.                          |

### Úložné vrstvy (čo prežije reštart)

CCR je a** dvojvrstvový** uložiť, nie iba v pamäti:

- **Horúca úroveň v pamäti** — na blok 2 MiB, na istinu 16 MiB, globálne 64 MiB. Vstupy sú štandardne nastavené na 24 h TTL (maximálne 7 dní). Úplné načítanie MCP z pamäte je obmedzené na 256 KiB; čokoľvek väčšie je stále dosiahnuteľné prostredníctvom režimov ranged / grep.
- **Odolná vrstva SQLite** (`ccr_blocks`, `COMPRESSION_CCR_DURABLE_STORE`, predvolene zapnuté) — podporuje vrstvu v pamäti, takže blok prežije vysťahovanie LRU, reštart alebo pristátie na inom mieste. Riadok si zachováva TTL bloku, takže blok za jeho TTL je preč z oboch vrstiev.

Tri stráže udržujú odolnú vrstvu ohraničenú — a blok zostáva iba v pamäti, keď:

1. blok sa skončil** 512 KB** (`MAX_DURABLE_BLOCK_BYTES`);
2. runtime je cloud runtime (bez lokálneho disku);
3. `COMPRESSION_CCR_DURABLE_STORE=false`.

Takže „blok zmizol“ nie je príbeh o plošnom reštarte: blok sub-512 KB na lokálnom, necloudovom runtime prežije reštart cez trvanlivú vrstvu, kým sa jeho TTL nevyčerpá. Premennú nájdete v časti [Referenčné informácie o prostredí](../reference/ENVIRONMENT.md).

### Dve značky

| Marker                                | Význam                                                                                                                                                              | Čo by mal model robiť                                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[CCR retrieve hash=<24hex> chars=N]` | Bol uložený veľký blok s adresným obsahom.                                                                                                                          | Zavolajte `omniroute_ccr_retrieve` s** 24-hexový hash skopírovaný doslovne** aby sa vrátil pôvodný text.                                                                                          |
| `[dedup:ref sha=…]`                   | `session-dedup` elidovaný text, ktorý už bol odoslaný v predchádzajúcom kole tej istej relácie. Toto je** úmyselné obzretie sa späť** , nejde o stratu alebo chybu. | Do** nie** zavolajte akýkoľvek nástroj a urobte to** nie** skús to "rekonštruovať". Prvý výskyt textu je kanonická kópia; aktuálny obrat sa nikdy neprepíše, pri neskoršom obrate sa deduplikuje. |

Spätný pohľad `[dedup:ref]` je zámerné rozhodnutie protokolu, — neexistuje žiadna rekonštrukcia pred odoslaním. Berte to tak, že „presný text už bol na drôte skôr v tejto relácii.“

### Predpoklady klienta

- **Kľúč (stdio):** volajúci stdio nenesie žiadnu identitu na žiadosť, takže sa autentifikuje pomocou `OMNIROUTE_API_KEY` (nastavené v `env` servera MCP ). Bez neho je volajúci anonymný a nástroje, ktoré vyžadujú príkazcu, sa môžu znehodnotiť.
- **`tools[]` je predpokladom injekcie.** Vloží sa inštrukcia protokolu načítania CCR (#8033).** iba** keď inzerovaný `tools[]` v požiadavke dokáže, že klient môže skutočne dosiahnuť `omniroute_ccr_retrieve`. Zhoda je zhoda koncového segmentu ohraničená oddeľovačom (`__`, `.`, `/`, `:`) — nikdy nie holý podreťazec —, takže názov v mennom priestore, ako napríklad `mcp__gateway__omniroute_ccr_retrieve` sa stále počíta. Chýbajúci alebo nezodpovedajúci `tools[]` znamená, že inštrukcia _nie je_ vložená podľa návrhu.
- **`codemode:false` (klienti OpenCode ).** OpenCode je predvolene nastavený na režim kódu, ktorý inzeruje iba svoje natívne nástroje pre model a** nie** vložte nástroje MCP do natívneho zoznamu `tools[]`. Nastavte `codemode: false` na záznam servera MCP, aby boli nástroje `omniroute_ccr_*` inzerované. Toto je a** klienta** nastavenie, nie OmniRoute. Zatiaľ nie je vložená inštrukcia CCR : OpenCode pomenúva nástroj `<server>_<tool>`, takže server s názvom `omniroute` odhaľuje `omniroute_omniroute_ccr_retrieve` a `_` nie je jedným zo zodpovedajúcich oddeľovačov.
- **Riaditeľky.** Ukladanie a získavanie sú izolované na overený princíp (na kľúč API ). Kľúč vidí iba svoje vlastné bloky.

### Rozsahy na nástroj

Presadzovanie rozsahu je vždy zapnuté pre úzky rozsah volaní HTTP/SSE. Nástroje `omniroute_` CCR vyžadujú:

| Nástroj                  | Rozsah              |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

Chýbajúci rozsah vráti an** výsledok chyby nástroja MCP** (`isError: true`, nie HTTP 403 — `403 LOCAL_ONLY` je samostatné overenie ochrany trasy spätnou slučkou): `Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` Minimálny diaľkový kľúč môže obsahovať `mcp:connect` (autorizuje len lokálne vyňatie `/api/mcp/` ) plus špecifický rozsah read/write ktorý potrebuje.

### Klientska matica

| Klient                | Doprava                                      | Konfigurácia na použitie                                                                                                                                                                                                                                    | `tools[]` inzerované? (inštrukcia → CCR bola vstreknutá)                                                                                                                                     |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude kód            | streamovateľný-http                          | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                                                           | Áno — s podporou MCP; injekčne.                                                                                                                                                              |
| Cursor / Cline        | `stdio`** alebo** `streamable-http`          | stdio: `omniroute --mcp` so `OMNIROUTE_API_KEY` v `env`; alebo vzdialený vstup MCP smerujúci na `http://localhost:20128/api/mcp/stream` (pozrite si [Inštalačný sprievodca → MCP Konfigurácia klienta](../guides/SETUP_GUIDE.md#mcp-client-configuration) ) | Áno — propaguje nástroje `omniroute_ccr_*`.                                                                                                                                                  |
| OpenCode              | streamovateľný-http                          | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream` plus `codemode: false`                                                                                                                                                             | Nástroje inzerované iba s `codemode: false`; inštrukcia stále nie je vložená, pretože `omniroute_omniroute_ccr_retrieve` sa nezhoduje (pozri [Predpoklady klienta](#client-prerequisites) ). |
| Kompatibilné s OpenAI | HTTP kompatibilná s OpenAI (dokončenie četu) | štandardný klient dokončenia chatu proti koncovému bodu kompatibilnému s OpenAI                                                                                                                                                                             | **Nikdy** — obyčajnému volajúcemu kompatibilnému s OpenAI sa nikdy nepovie, aby zavolal nástroj, a inštrukcia sa nevloží.                                                                    |

### Limity načítania a stránkovanie

Výsledky textu nástroja MCP sú orezané okolo `mcpAccessibility.maxTextChars` (predvolené `50000`). Načítanie bloku `full` je obmedzené na 256 KiB —** neexistuje žiadne neobmedzené úplné načítanie** . Keď je `chars=N` bloku veľké, namiesto vytiahnutia celej veci ho stránkujte:

- Základné pravidlo:**`chars > 40000` → použite `mode`** , nikdy holé plné.
- `mode:"grep"` — regulárny výraz `pattern` zhodný riadok po riadku, až 1 000 zodpovedajúcich riadkov (`unique: true` kvapky sa opakuje), najlacnejšie pre "nájsť jeden riadok, ktorý potrebujem."
- `mode:"lines"` — 1-indexovaný riadkový rozsah; potrebuje `start` aj `end`.
- `mode:"head"` / `mode:"tail"` — first/last `n` riadky.
- `mode:"stats"` — počet riadkov, znakov a bajtov bez tela.

Použite `mode:"lines"` s `start`/`end` na prechádzku dlhým blokom stránok, namiesto toho, aby ste požadovali celú vec naraz.

### Pomenovanie nástroja

Nástroj na načítanie sa momentálne volá `omniroute_ccr_retrieve` (predpona `omniroute_` je datované riešenie pre kolízie názvov medzi servermi). Čistejší názov nástroja s ohraničenou príponou a oprava výsledkov MCP JSON skrátená v strede reťazca sú sledované ako upstream follow-up; táto stránka dokumentuje iba aktuálne správanie pri dodávke.

### Životný cyklus relácie

Streamovateľné-HTTP relácie sú nečinné a server ich zbiera; nečinné okno je nastavené `OMNIROUTE_MCP_SESSION_IDLE_MS` (predvolené 5 minút; odkazuje sa na názov, nie na pevne zakódovanú hodnotu, takže táto stránka sa pri zmene nehýbe). Príznakom nečinne zozbieranej relácie je HTTP 404 s `Unknown Mcp-Session-Id` — nápravou je opätovné pripojenie alebo reštart relácie,** nie** na otočenie kľúča, zmenu rozsahu alebo premenovanie nástroja.

## Rozhranie API

| Trasa                                  | Účel                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `/api/settings/compression`            | Globálne nastavenia kompresie (zahŕňajú konfiguráciu `mcpAccessibility`) |
| `/api/compression/preview`             | Náhľad ľubovoľného režimu kompresie                                      |
| `/api/compression/language-packs`      | Zoznam dostupných jazykových balíkov Caveman                             |
| `/api/context/caveman/config`          | Alias nastavení Caveman                                                  |
| `/api/context/rtk/config`              | Predvolené hodnoty a nastavenia RTK                                      |
| `/api/context/rtk/filters`             | Katalóg filtrov RTK                                                      |
| `/api/context/rtk/test`                | Koncový bod na náhľad/testovanie RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Autentifikované obnovenie redigovaného nespracovaného výstupu            |
| `/api/context/combos`                  | Operácie CRUD pre kombinácie kompresie                                   |
| `/api/context/combos/[id]/assignments` | Operácie CRUD pre priradenia kombinácií smerovania                       |
| `/api/context/analytics`               | Alias analytiky kompresie                                                |

Trasy správy vyžadujú autentifikáciu správy alebo kontroly zásad pre kľúč API.

## Nástroje MCP

Kompresia poskytuje päť nástrojov MCP:

| Nástroj                             | Rozsah              | Účel                                                  |
| ----------------------------------- | ------------------- | ----------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavenia, analytika, štatistiky vyrovnávacej pamäte |
| `omniroute_compression_configure`   | `write:compression` | Aktualizácia globálnych nastavení                     |
| `omniroute_set_compression_engine`  | `write:compression` | Nastavenie režimu a voliteľného pipeline              |
| `omniroute_list_compression_combos` | `read:compression`  | Zoznam kombinácií kompresie                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Čítanie analytiky kombinácií/modulov                  |

## Rozsah a vylúčenia

**Embeddingy sa nikdy nekomprimujú.** `open-sse/handlers/embeddings.ts` nikdy nevolá žiadny
kompresný modul — telá požiadaviek/odpovedí prechádzajú priamo do exekútora bez zmeny.
V súčasnosti je to zabezpečené štruktúrou (embeddingy a dokončenia chatu používajú oddelené obslužné rutiny), nie
kontrolou za behu, znamená to však, že problém skreslenia vektorov uvedený v #8034 nemá
v ceste embeddingov žiadny povrch vystavenia.

**Filter vylúčení podľa modelu/koncového bodu (#8034).** Pri dokončeniach chatu môže operátor zadať
ID modelov/ciele `provider/model`, ktoré sa nikdy nesmú komprimovať — ochranné opatrenie užitočné v prípade,
že sa kompresia neskôr zapojí bližšie k ceste susediacej s embeddingami, a všeobecne užitočné
pre každý model, pri ktorom záleží na presnej bajtovej zhode promptu (deterministické vyhodnotenia, prefixy
citlivé na vyrovnávaciu pamäť atď.).

- Pole nastavení: `exclusions?: string[]` v globálnej konfigurácii kompresie
  (`GET`/`PUT /api/settings/compression`), uchovávané prostredníctvom existujúceho priestoru názvov kompresie `key_value`
  (`src/lib/db/compression.ts`) — bez novej tabuľky.
- Karta ovládacieho panela: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Syntax vzorov: `*` je jediný zástupný znak. Každý ďalší metaznak regulárnych výrazov vo vzore sa
  pred porovnaním escapuje, takže `gpt-5.6` zodpovedá iba doslovnému reťazcu, nikdy nie `gpt-5x6`
  (odolné voči ReDoS, ohraničené, bez vnorených kvantifikátorov). Vzory sa porovnávajú bez ohľadu na veľkosť písmen
  so samotným ID modelu aj so zloženým reťazcom `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  aj `openai/*` fungujú a samotné `*` vylúči každý model.
- Porovnávanie: `isCompressionExcluded()` / `normalizeCompressionExclusions()` v
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontroluje vylúčený cieľ
  ihneď po vyriešení nastavení kompresie, **pred spustením akéhokoľvek modulu**, a so zhodou
  zaobchádza presne tak, ako keby bola kompresia globálne zakázaná — telo požiadavky je preukázateľne
  bajtovo identické. Preskočenie sa zaznamenáva prostredníctvom `writeCompressionSkip(..., "excluded")`, aby bolo
  viditeľné v analytike.
- Predvolené nastavenie (prázdny/chýbajúci zoznam): identické so správaním pred #8034 — nič nie je vylúčené.

## Známe obmedzenia

- **LLMLingua-2 (SLM) vyžaduje spoločne umiestnené voliteľné závislosti.** Worker sa v
  produkčnom builde spustí iba vtedy, keď sú `@atjsh/llmlingua-2` a partnerské závislosti spoločne umiestnené v
  `dist/node_modules` (pozrite `scripts/build/colocateOptionals.mjs`, #4286). Bez nich
  engine zlyhá bezpečným spôsobom (vráti pôvodný text). Rozlíšenie workera už nezávisí od
  `import.meta.url` (v samostatnom bundle prestane fungovať) — opiera sa o cwd behového prostredia
  / `argv[1]`.
- **Jazykové balíky Caveman `de` / `fr` / `ja` sú čiastočné.** Obsahujú pravidlá `context` +
  `filler` + `structural`, ale neobsahujú balíky `dedup` / `ultra`, takže intenzita `ultra` nie je
  pre tieto jazyky silnejšia ako `full` (používajú iba vlastné pravidlá — neexistuje žiadny
  tichý návrat k anglickým pravidlám `dedup`/`ultra`, ktoré by skomolili cudzojazyčný text).
  `en` / `es` / `id` / `pt-BR` sú úplné. Príspevky s `dedup.json` + `ultra.json`
  pre čiastočné balíky sú vítané.
- **Telemetria vrstveného spracovania uvádza iba enginy, ktoré vykonali kompresiu.** Krok vrstveného pipeline, ktorého
  engine sa spustil, ale dosiahol úsporu 0 %, vráti `stats:null`, a preto sa nezobrazí v
  `engineBreakdown` — nemožno ho odlíšiť od kroku, ktorý bol preskočený. Rozlíšenie medzi
  „spustené, 0 %“ a „preskočené“ by si vyžadovalo zmenu modelu rozpisu a je odložené.

## Validácia

Zamerané brány pre túto oblasť sú:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
