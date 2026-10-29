# 🗜️ Prompt Compression Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetrite 15 – 95 % tokenov vo vhodnom kontexte. Stručný prehľad nájdete v [časti README o kompresii](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prehľad

OmniRoute implementuje modulárny pipeline kompresie promptov, ktorý sa spúšťa **proaktívne** predtým, než požiadavky dorazia k nadradeným poskytovateľom. Úspora tokenov tak prebieha transparentne — nie sú potrebné žiadne zmeny vo vašom pracovnom postupe.

```
Požiadavka klienta
  → Výber stratégie kompresie
    → Prepísanie kombináciou? → Použiť nastavenie kombinácie
    → Prahová hodnota automatického spustenia? → Použiť automatický režim
    → Predvolený režim? → Použiť globálne nastavenie
    → Vypnuté? → Preskočiť kompresiu
  → Vybratý režim kompresie
    → Vypnutý: Bez kompresie
    → Ľahký: Bezpečné vyčistenie medzier/formátovania (~15 %)
    → Štandardný: Odstránenie výplne v štýle jaskynnej reči (~30 %)
    → Agresívny: Starnutie histórie + sumarizácia (~50 %)
    → Ultra: Heuristické prerezávanie + stenčenie blokov kódu (~75 %)
    → RTK: Filtrovanie terminálového/výstupného obsahu nástrojov so zohľadnením príkazov (rozsah 60 – 90 % pre nadradeného poskytovateľa)
    → Vrstvený: Usporiadaný pipeline viacerých enginov, zvyčajne RTK a potom Caveman (rozsah 78 – 95 % vhodného obsahu)
  → Komprimovaná požiadavka → Poskytovateľ
```

---

## Režimy kompresie

### Vypnuté

Nepoužíva sa žiadna kompresia. Všetky správy prechádzajú nezmenené.

### Režim Lite (úspora ~15 %, latencia <1 ms)

Najbezpečnejší režim — nulová sémantická zmena, iba vyčistenie formátovania:

| Technika                 | Popis                                                |
| ------------------------ | ---------------------------------------------------- |
| `collapseWhitespace`     | Zlúči po sebe idúce prázdne riadky a koncové medzery |
| `dedupSystemPrompt`      | Odstráni duplicitné systémové správy                 |
| `compressToolResults`    | Komprimuje ukecané výstupy nástrojov/funkcií         |
| `removeRedundantContent` | Odstráni opakujúce sa pokyny                         |
| `replaceImageUrls`       | Skráti dátové URI obrázkov v base64                  |

**Vhodné pre:** Neustále zapnuté používanie, bezpečnostne kritické pracovné postupy.

### Režim Standard (úspora ~30 %)

Inšpirovaný projektom [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňové slová a ukecané formulácie pri zachovaní významu:

- Odstraňuje výplňové slová („please", „I think", „basically", „actually")
- Skracuje ukecané frázy („in order to" → „to", „as a result of" → „because")
- Odstraňuje zdvorilostné obmedzujúce formulácie („Would you mind...", „If you could possibly...")
- Viac ako 30 regex pravidiel vyladených pre programátorské prompty

**Vhodné pre:** Každodenné programátorské pracovné postupy, tímy dbajúce na náklady.

### Režim Aggressive (úspora ~50 %)

Inteligentná správa histórie pre dlhé relácie:

- **Starnutie správ** — staršie správy sa postupne čoraz viac komprimujú
- **Kompresia výsledkov nástrojov** — dlhé výstupy nástrojov sa skracujú alebo vynechávajú
  (prvé/posledné riadky, filtrovanie riadkov so zhodou, kompakcia kľúčov JSON)
- **Ochranné mechanizmy štrukturálnej integrity** — zabezpečujú, že dvojice `tool_use` +
  `tool_result` zostávajú konzistentné
- **Povedomie o kontextovom okne** — rešpektuje limity tokenov jednotlivých modelov

**Vhodné pre:** Dlhšie relácie ladenia, veľké kódové bázy.

### Režim Ultra (úspora ~75 %)

Maximálna kompresia pre scenáre kritické z hľadiska tokenov:

- **Heuristické prerezávanie** — prerezávanie tokenov prózy na základe skóre
- **Zachovanie štruktúry** — ohraničené bloky kódu, inline kód, URL adresy a identifikátory
  sa nahradia zástupnými značkami a po spracovaní sa doslova znovu spoja; nikdy sa neprerezávajú
- **Voliteľná úroveň SLM** — po nakonfigurovaní môže malý lokálny model prerezanie spresniť
- Nezávisí od režimu Aggressive: nespúšťa starnutie správ, kompresiu výsledkov nástrojov
  ani záložný sumarizátor (iba zlyhanie úrovne SLM môže nasmerovať záložný prechod cez
  režim aggressive)

**Vhodné pre:** Keď opakovane narážate na limity kontextu.

### Režim RTK (rozsah 60-90 % v upstream)

Režim RTK je optimalizovaný pre ukecané výstupy nástrojov, ktoré sa objavujú v reláciách kódovacích agentov:

- Rozpoznáva triedy príkazov/výstupov, ako sú `git status`, `git diff`, `git log`, test runnery,
  buildy TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/inštalácie npm, logy Dockeru,
  výstup infraštruktúry a generický výstup shellu
- Aplikuje balíky JSON filtrov z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtre schémy RTK TOML v1 z projektových alebo globálnych súborov `filters.toml`,
  s validáciou inline testami a kontrolou dôveryhodnosti (trust-gating) projektových súborov
- Dodáva sa s 56 vstavanými filtrami s inline overovacími ukážkami
- Odstraňuje riadiace sekvencie ANSI, ukazovatele priebehu, opakujúce sa riadky a nevyužiteľný šum
- Zachováva zlyhania, chyby, upozornenia, zmenené súbory, súhrny a záver dlhého výstupu
- Podporuje projektové filtre s kontrolou dôveryhodnosti, globálne filtre a voliteľnú obnovu
  redigovaného pôvodného výstupu

**Vhodné pre:** Relácie agentov so záznamami shellu, buildov, testov, gitu, grepu a výstupov súborov.

### Režim Stacked (oprávnený rozsah 78-95 %)

Režim Stacked spúšťa viacero kompresných engineov v deterministickom poradí. Predvolená pipeline je:

```txt
RTK -> Caveman
```

Toto poradie najprv udrží výstup terminálu/nástrojov kompaktný a potom aplikuje sémantickú
kondenzáciu Caveman na zostávajúci prompt v prirodzenom jazyku. Pipeliny Stacked možno
konfigurovať globálne alebo prostredníctvom kompresných kombá priradených k smerovacím kombám.

**Vhodné pre:** Zmiešaný kontext s veľkými logmi nástrojov spolu s ľudskými pokynmi alebo súhrnmi asistenta.

---

## Výpočet úspor z upstream projektov

OmniRoute dokumentuje úspory vďaka kompresii z dvoch zdrojov: benchmarkov upstream projektov a
vlastnej kombinácie enginov OmniRoute.

| Zdroj   | Číslo z upstream README použité v tomto dokumente                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menej výstupných tokenov, priemerná úspora výstupu v benchmarkoch `65%`, rozsah `22-87%` a nástroj na kompresiu vstupu `~46%` |
| RTK     | Úspora výstupu príkazov `60-90%`; ukážková relácia `~118,000 -> ~23,900` tokenov, teda úspora `79.7%` (`~80%`)                       |

Pri prekrývajúcich sa dátach nástrojov/kontextu predvolená kombinácia OmniRoute vrství enginy:

```txt
RTK -> Caveman
```

Kombinované úspory sa násobia, nesčítavajú:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí vtedy, keď RTK aj Caveman dokážu zmenšiť rovnaké vstupné/kontextové dáta.
Režim výstupu odpovede Caveman je samostatný: keď je povolený, použite vlastné úspory výstupu nástroja Caveman (`65%`
v priemere, hlavná uvádzaná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladov závisia od pomeru vstupov a výstupov.

### Čo v skutočnosti znamená „vhodný“

Uvádzaný rozsah 15-95% je reálny, ale vzťahuje sa iba na **redundantný alebo príliš podrobný** obsah — opakované
riadky chýb, výpis zostavenia, ktorý zahlcuje výstup rovnakým upozornením, alebo nadmerne veľký výpis z `grep`/čítania súboru. To
**neznamená**, že každá požiadavka dosiahne takúto úsporu.

Empiricky overené (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): beh
`stacked` (RTK + Caveman) nad blokom `tool_result` vo formáte Anthropic, ktorý obsahoval 300 rovnakých
riadkov chýb, dosiahol **úsporu 95.93% tokenov / 96.26% znakov** — presne v rámci uvádzaného
rozsahu. Keď sa však rovnaký reťazec spracovania spustí nad bežným, neredundantným výstupom nástroja (čistý zoznam zhôd z `grep`,
krátke načítanie súboru, bežný konverzačný text), správne dosiahne **takmer nulovú úsporu**, pretože
neobsahuje nič opakujúce sa, čo by bolo možné odstrániť, a `validateCompression()` (`validation.ts`) odmietne odoslať
prepísaný obsah, ktorý by vynechal alebo zmenil bloky kódu, URL adresy, nadpisy, verzie alebo identifikátory konštánt písané VEĽKÝMI PÍSMENAMI.

Ide o očakávané a bezpečné správanie, nie o chybu: relácia programovania, ktorá prevažne číta alebo prehľadáva čisté súbory,
dosiahne skromné celkové úspory aj pri plne povolenej kompresii, zatiaľ čo relácia, ktorá narazí na zlyhávajúcu
slučku alebo príliš výrečný linter, dosiahne pri takomto prenose plný rozsah 78-95%. Nízke percento
súhrnných úspor jednej relácie nepovažujte za dôkaz nesprávnej konfigurácie kompresie — najskôr skontrolujte, či bol
príslušný výstup nástroja skutočne redundantný.

---

## Vizualizácia úspory tokenov

```
Bez kompresie:       47K tokenov odoslaných do LLM
S Lite:              40K odoslaných tokenov          (úspora 15% — bezpečné, vždy zapnuté)
So Standard:         33K odoslaných tokenov          (úspora 30% — pravidlá caveman-speak)
S Aggressive:        24K odoslaných tokenov          (úspora 50% — starnutie + sumarizácia)
S Ultra:             12K odoslaných tokenov          (úspora 75% — heuristické orezávanie)
S RTK:               19K-5K odoslaných tokenov       (úspora 60-90% na výstupe príkazov/nástrojov)
So Stacked:          10K-2.5K odoslaných tokenov     (rozsah 78-95% pre vhodné dáta RTK+Caveman)
```

---

## Konfigurácia

### Ovládací panel

Prejdite na `Dashboard → Context & Cache`:

- **Caveman** — výber režimu, jazykové balíky, náhľad a globálne predvolené nastavenia
- **RTK** — náhľad filtrovania príkazov, bezpečnostné nastavenia RTK a katalóg filtrov
- **Compression Combos** — pomenované postupnosti enginov priradené ku kombináciám smerovania
- **Auto-Trigger Threshold** — automaticky zapne kompresiu, keď počet tokenov prekročí prahovú hodnotu

### Prepísanie pre konkrétnu kombináciu

V časti `Dashboard → Context & Cache → Compression Combos` priraďte kombináciu kompresie ku kombinácii
smerovania:

```txt
Kombinácia: "free-tier-fallback"
  Kombinácia kompresie: "coding-agent-stack"
  Postupnosť: RTK -> Caveman
  Ciele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Vďaka tomu môžete používať vrstvenú kompresiu pre bezplatných poskytovateľov alebo poskytovateľov
určených na programovanie a súčasne zachovať režim Lite pre platené predplatné.

Toto priradenie „Prepísanie pre konkrétnu kombináciu“ je iný ovládací prvok než prepísanie
**režimu kompresie kombinácie smerovania** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses —
schéma poľa podporuje aj hodnoty `rtk`, `stacked` a `omniglyph`) — toto prepísanie nevyberá pomenovanú
postupnosť kombinácie kompresie; iba nastavuje pole `compressionMode`, ktoré používa
`resolveCompressionPlan`. Možno ho nastaviť buď na karte kombinácie (`Dashboard → Combos`), alebo od
verzie #6760 pre každú kombináciu smerovania v zozname „Assign to routing“ v časti
`Dashboard → Context & Cache → Compression Combos`, hneď vedľa začiarkavacieho políčka na priradenie
postupnosti, ktoré je zdokumentované vyššie. Obe rozhrania ukladajú nastavenia prostredníctvom rovnakého
koncového bodu `PUT /api/combos/{id}`.

### Prepísanie pre konkrétnu požiadavku

Odošlite hlavičku požiadavky `x-omniroute-compression`, ak chcete prepísať plán kompresie pre jednu
požiadavku. Má najvyššiu prioritu — má prednosť pred prepísaním kombinácie smerovania, aktívnym profilom,
automatickým spustením aj nastavením Default na paneli. Neznáme hodnoty sa ignorujú (požiadavka sa nikdy
neodmietne) a globálny hlavný prepínač má naďalej rozhodujúcu úlohu: keď je kompresia globálne vypnutá,
hlavička ju nemôže zapnúť. Hodnoty:

| Hodnota       | Účinok                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `off`         | Pre túto požiadavku sa nepoužije žiadna kompresia.                                                                    |
| `default`     | Profil Default odvodený z panela (ignoruje aktívny profil). Stratové enginy zostanú vypnuté.                          |
| `safe`        | Rovnaké ako vynechanie hlavičky: iba deduplikácia a zlučovanie bielych znakov.                                        |
| `allow-lossy` | Zachová plán operátora tejto požiadavky vrátane súhrnov, filtrov relevantnosti a úprav štýlu.                         |
| `engine:<id>` | Jeden engine, ak je povolený, napr. `engine:rtk`. Toto je explicitné zapnutie daného enginu pre konkrétnu požiadavku. |
| `<combo>`     | Pomenovaná kombinácia; najprv sa vyhľadáva podľa názvu (bez rozlišovania veľkosti písmen) a potom podľa ID.           |

Bez hodnoty `allow-lossy`, `engine:<id>` alebo pomenovanej kombinácie sa stratové enginy nepoužijú.
Ak je kompresia zapnutá, požiadavka naďalej využíva deduplikáciu relácie a zlučovanie bielych znakov.

Použitý plán sa zopakuje v hlavičke odpovede `X-OmniRoute-Compression: <mode>; source=<source>`,
kde `<source>` je jedna z hodnôt `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` alebo `off`.

### API

```bash
# Získanie nastavení kompresie
curl http://localhost:20128/api/settings/compression

# Aktualizácia nastavení kompresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Náhľad konkrétneho obsahu RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Zobrazenie zoznamu balíkov filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Priame testovanie RTK s voliteľnými metadátami príkazu
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Čo sa chráni

Kompresný mechanizmus **vždy zachováva:**

- ✅ Bloky kódu (ohraničené aj vložené)
- ✅ URL adresy a cesty k súborom
- ✅ Štruktúry JSON a štruktúrované údaje
- ✅ Identifikátory a chránené technické tokeny
- ✅ Matematické výrazy
- ✅ Definície volaní nástrojov/funkcií
- ✅ Systémové prompty (v režime lite)

Obnova surového výstupu RTK rediguje bežné API kľúče, bearer tokeny, tokeny Slacku, prístupové kľúče AWS,
heslá, tokeny a tajné údaje predtým, než sa čokoľvek trvalo uloží.

---

## Štatistiky kompresie

Každá komprimovaná požiadavka obsahuje štatistiky v serverových protokoloch:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Plán fáz

| Fáza    | Režimy                                                                                                                                                                 | Stav      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáza 1  | Vypnuté, Lite                                                                                                                                                          | ✅ Vydané |
| Fáza 2  | Standard, Aggressive, Ultra                                                                                                                                            | ✅ Vydané |
| Fáza 3  | RTK, Stacked, kombinácie kompresie                                                                                                                                     | ✅ Vydané |
| Fáza 4  | Štýly výstupu, Ultra na úrovni SLM, evaluačná infraštruktúra                                                                                                           | ✅ Vydané |
| Fáza 4C | Adaptívny rozpočet kontextu („ovládač“) — výpočtový mechanizmus + API (`contextBudget` na `PUT /api/settings/compression`) + ovládacie prvky režimu/politiky na paneli | ✅ Vydané |

---

## Poďakovanie

Pravidlá kompresie režimu Standard sú inšpirované projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** od autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálnym projektom „prečo používať veľa tokenov, keď stačí málo“. Caveman uvádza o `~75%` menej výstupných tokenov, priemernú úsporu výstupu v benchmarkoch na úrovni `65%`, rozsah výstupných úspor `22-87%` a nástroj na kompresiu vstupu s úsporou `~46%`.

Režim RTK je inšpirovaný projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysokovýkonným projektom kompresie výstupu príkazov pre terminál, zostavovanie, testovanie, git a filtrovanie výstupu nástrojov. RTK uvádza úsporu `60-90%`, pričom ukážková relácia v jeho README dosahuje úsporu `~80%`.

---

## Pokročilé systémy kompresie

Okrem 7 režimov opísaných vyššie (zdroj podporuje aj režimy `codex-responses` a
`omniglyph`, ktorým sa táto príručka nevenuje) sa nasledujúce časti zaoberajú funkciami,
ktoré fungujú v rámci týchto režimov alebo popri nich: Kompresia výsledkov nástrojov a Progresívne starnutie
sú kroky 1 a 2 agresívneho enginu (režim Aggressive a krok `aggressive` vo
vrstvenom spracovateľskom reťazci), Vrstvený spracovateľský reťazec určuje spôsob fungovania režimu Stacked, Kompresia
zohľadňujúca vyrovnávaciu pamäť znižuje pri poskytovateľoch s podporou ukladania do vyrovnávacej pamäte úroveň `aggressive` a `ultra` na `standard`,
keď je kompresia zapnutá, a Režim jaskynného výstupu a Štýly výstupu sú voliteľné inštrukcie
systémovej výzvy, predvolene vypnuté, ktoré namiesto kompresie požiadavky formujú výstup modelu.

### Kompresia zohľadňujúca vyrovnávaciu pamäť

Niektorí poskytovatelia (napríklad Anthropic s ukladaním výziev do vyrovnávacej pamäte) podporujú **ukladanie výziev do vyrovnávacej pamäte**,
ktoré im umožňuje ukladať časti výzvy do vyrovnávacej pamäte s cieľom znížiť náklady a latenciu. Keď
je ukladanie do vyrovnávacej pamäte zapnuté, agresívna kompresia môže v skutočnosti **zhoršiť** výkon,
pretože mení tokeny uložené vo vyrovnávacej pamäti, čím ju zneplatňuje.

Modul `cachingAware.ts` tento problém rieši **zisťovaním kontextu ukladania do vyrovnávacej pamäte** a
následnou **úpravou stratégie kompresie**.

#### Ako to funguje

1. **Zistenie kontextu ukladania do vyrovnávacej pamäte** — Vyhľadá v tele požiadavky značky `cache_control`
2. **Identifikácia poskytovateľov s podporou ukladania do vyrovnávacej pamäte** — Skontroluje, či cieľový poskytovateľ podporuje ukladanie do vyrovnávacej pamäte
3. **Úprava stratégie** — Zníži úroveň `aggressive`/`ultra` na `standard` pri poskytovateľoch s podporou ukladania do vyrovnávacej pamäte
4. **Vynechanie systémovej výzvy** — Systémové výzvy sa zvyčajne ukladajú do vyrovnávacej pamäte, preto ich nekomprimuje

Pomocná funkcia stratégie vracia aj príznak `deterministicOnly`, ale zostavovač plánu používa
iba stratégiu — tento príznak dnes žiadna následná časť nespracúva.

#### Príklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Značka vyrovnávacej pamäte
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kedy ju použiť

Kompresia zohľadňujúca vyrovnávaciu pamäť je **vždy zapnutá** — nie je potrebná žiadna konfigurácia. Aktivuje sa vždy,
keď je kompresia zapnutá a cieľový poskytovateľ podporuje ukladanie výziev do vyrovnávacej pamäte (Anthropic, OpenAI
atď.); explicitné značky `cache_control` sa nevyžadujú — na zníženie úrovne stačí samotný
poskytovateľ s podporou ukladania do vyrovnávacej pamäte, zatiaľ čo samotné značky ho nikdy nespustia (detekcia značiek poskytuje údaje
telemetrii vyrovnávacej pamäte, nie rozhodovaniu o stratégii).

### Progresívne starnutie

V dlhých konverzáciách sa hromadí veľa replík, ale staršie repliky sú čoraz menej
relevantné. Modul `progressiveAging.ts` **redukuje správy podľa vzdialenosti replík**
(vzdialenosť sa meria od konca konverzácie). S dodávanými predvolenými hodnotami
(`verbatim: 2, light: 2, moderate: 3`):

- **Posledné 2 repliky (vzdialenosť ≤ 2)**: Zachovajú sa doslovne
- **Vzdialenosť 3**: Jaskynná kompresia (odstránenie výplňových slov)
- **Vzdialenosť 4+**: Správy asistenta sa zhrnú; správy používateľa sa skrátia na prvý
  riadok s maximálnou dĺžkou 120 znakov; ostatné roly zostanú nezmenené. Systémové výzvy, už zostarnuté
  správy a najnovšia správa používateľa sa vždy zachovajú doslovne bez ohľadu na vzdialenosť.
  Nič sa úplne neodstráni a pásmo `light`
  je s dodávanými predvolenými hodnotami nedosiahnuteľné (`light` sa rovná `verbatim`).

#### Príklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ďalších 50 replík ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // posledné 3 repliky: doslovne
  light: 8, // vzdialenosť <= 8: ľahká kompresia
  moderate: 20, // vzdialenosť <= 20: jaskynná kompresia
  fullSummary: 5, // vyžadované typom, kód na rozdelenie do pásiem túto hodnotu nečíta
  // vzdialenosť > 20: zhrnuté (asistent) / zachovaný prvý riadok (používateľ)
});

// saved = počet ušetrených tokenov
```

#### Kedy ho použiť

Progresívne starnutie je **vždy zapnuté** v režime `aggressive` — je druhým krokom
funkcie `compressAggressive()`. Režim Ultra ho nespúšťa. Je
obzvlášť účinné pri:

- Dlhodobých reláciách programovania
- Viacdňových konverzáciách
- Agentných pracovných postupoch s mnohými volaniami nástrojov

### Režim jaskynného výstupu

Režim jaskynného výstupu pridáva **inštrukcie systémovej výzvy**, ktoré od samotného modelu žiadajú
stručný výstup — úroveň `lite` žiada stručné odpovede zachovávajúce celé vety, úroveň `full`
žiada, aby „odpovedal stručne ako inteligentný jaskynný človek“, a úroveň `ultra` žiada telegrafický výstup;
inštrukcie iba žiadajú, nemôžu ho zaručiť. Požiadavky ich dostávajú prostredníctvom
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najprv určí výber pomocou vrstvy spätnej kompatibility
(`resolveOutputStyleSelection()` v
`open-sse/services/compression/outputStyles/backCompat.ts`), ktorá pri prázdnom `outputStyles`
mapuje zapnutý `cavemanOutputMode` na štýl výstupu `terse-prose` s úrovňou
`cavemanOutputMode.intensity` (pozrite si časť o spätnej kompatibilite nižšie); neprázdny výber `outputStyles`
sa použije bez zmien a `cavemanOutputMode.enabled` ani `intensity` potom nemajú žiadny
vplyv, zatiaľ čo jeho prepínač `autoClarity` sa naďalej uplatňuje. Súbor `outputMode.ts` obsahuje
texty inštrukcií (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), obídenie obsahu a
pomocnú funkciu umiestnenia, ktorú používa vkladanie; jeho vlastný injektor `applyCavemanOutputMode()` nemá žiadneho
volajúceho v produkčnom kóde.

#### Ako to funguje

Tento režim nekomprimuje vstup. Pridáva blok inštrukcií do systémovej výzvy
(pozrite si časť Ako funguje vkladanie nižšie) a každý režim kompresie vstupu vybraný pre požiadavku
sa potom naďalej spustí nad telom, ktoré už obsahuje tento blok. Pred spoločnou
klauzulou o hraniciach, ktorou sa končí každá úroveň, znie anglická úroveň `full` takto:

> "Odpovedaj stručne ako múdry jaskynný človek. Vynechávaj členy (a/an/the), výplňové slová (just/really/basically/actually/simply), zdvorilostné frázy a zmierňujúce výrazy. Útržky sú v poriadku. Používaj krátke synonymá (big, nie extensive; fix, nie implement). Zachovaj presne všetok technický obsah, kód, chyby, adresy URL a identifikátory."

Funguje to obzvlášť dobre pri:

- Generovaní kódu (stručnejší výstup = menej tokenov)
- Rýchlych otázkach a odpovediach (bez potreby podrobných vysvetlení)
- Dávkovom spracovaní (maximalizácia priepustnosti)

#### Kedy použiť

Režim výstupu jaskynného človeka je **voliteľný**. Keď je kompresia zapnutá (`enabled: true`, hlavný prepínač
na stránke Compression Settings), zapnite ho pomocou `cavemanOutputMode.enabled`; `intensity`
vyberá `lite`, `full` alebo `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Prepínač **Output Mode** kombinácie kompresie (`outputMode`, úroveň v `outputModeIntensity`)
nastavuje rovnaký prepínač pre požiadavky, na ktoré sa daná kombinácia vzťahuje, a nástroj MCP
`omniroute_set_compression_engine` ho zapisuje prostredníctvom svojho booleovského argumentu `outputMode`.
Neprázdny výber `outputStyles` má prednosť pred týmto prepínačom. Povolenie výstupného štýlu
**Terse prose** na ovládacom paneli vloží rovnaký blok (pozrite si časť Výstupné štýly nižšie).

### Výstupné štýly (katalóg)

Vyššie uvedený režim výstupu jaskynného človeka je **starší spôsob s jedným štýlom**. Fáza 4 ho zovšeobecnila
na katalóg kombinovateľných výstupných štýlov: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl je inštrukcia systémovej výzvy,
ktorá žiada samotný model o úspornejší výstup; štýly možno povoliť
spoločne a vkladajú sa v poradí katalógu.

| Štýl                                                 | `id`            | Čo robí                                                                                                                                                                                                                                                                                         | Jazyky inštrukcií                                         |
| ---------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Stručná próza                                        | `terse-prose`   | Vynecháva výplňové slová/členy/zmierňujúce výrazy; zachováva presný technický obsah. Rovnaký text ako v staršom režime výstupu jaskynného človeka (odkazovaný, nie prepísaný).                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Menej kódu                                           | `less-code`     | Rebrík YAGNI: najmenšia funkčná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Copík (lenivý seniorný vývojár)                      | `ponytail`      | „Najlepší kód je kód, ktorý nikdy nebol napísaný“: opätovné použitie > prepisovanie, základná príčina > príznak, najkratší funkčný rozdiel.                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Mám ADHD (najprv akcia)                              | `i-have-adhd`   | Najprv akcia (príkaz/cesta/úryvok pred textom), číslované ohraničené kroky, JEDEN konkrétny ďalší krok, bez úvodu/zhrnutia/záverečných fráz. Upravené podľa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Filter používateľského rozhrania proti balastu       | `antislop-ui`   | Každá vizuálna technika musí prejsť testom účelu (hierarchia, identita, čitateľnosť); žiadne predvolené prechody/sklo/žiara, obmedzená paleta, žiadne šablónové rozloženia. Oba štýly proti balastu pridávajú hranicu zakazujúcu nefunkčné ovládacie prvky a vymyslené tvrdenia.                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Filter textu proti balastu a filter zameraný na ľudí | `antislop-copy` | Konkrétny text (bez dlhej pomlčky, všeobecných výziev na akciu, módnych slov, chatbotových záverov a vymyslených faktov) spolu s pravidlami pre ľudí: kontrast WCAG AA, viditeľné zameranie, ovládanie klávesnicou, prázdne/načítavacie/chybové stavy, prispôsobenie na mobilných zariadeniach. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi             |
| Stručná CJK (文言)                                   | `terse-cjk`     | Odpoveď úrovne `full`/`ultra` v klasickej čínštine (文言); `lite` žiada iba stručné odpovede bez funkčných slov, zdvorilostných fráz alebo prikrášľovania.                                                                                                                                      | zh (obmedzené podľa miestneho nastavenia, pozrite nižšie) |

Každý štýl obsahuje tri úrovne intenzity — `lite`, `full`, `ultra` — a každá úroveň
sa končí spoločnou klauzulou o hraniciach (`SHARED_BOUNDARIES` v `outputMode.ts`), ktorá
zachováva presne bloky kódu, cesty k súborom, príkazy, chyby a adresy URL. Texty úrovní
`terse-prose` a `terse-cjk` pridávajú do tohto zoznamu identifikátory.

`terse-cjk` je na dvoch miestach obmedzený na miestne nastavenie `zh`. Stránka Compression Settings zobrazuje
jeho riadok iba vtedy, keď je jazykom používateľského rozhrania ovládacieho panela čínština (`zh-CN` alebo `zh-TW`), a
`applyOutputStyles()` ho vloží iba vtedy, keď je rozpoznaným jazykom požiadavky (pozrite si časť Výber jazyka
nižšie) `zh`. Skrytie riadka nevymaže uložený výber `terse-cjk`:
rozhranie API nastavení prijíma ľubovoľné id štýlu a uloženie ostatných štýlov na stránke ho zachová. Pri
spracovaní požiadavky je kontrola jazyka v `applyOutputStyles()` jediným obmedzením podľa miestneho nastavenia.

#### Ako funguje vkladanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výber s katalógom (neznáme identifikátory a štýly nezodpovedajúce lokalizácii sa
vynechajú, nikdy nejde o chybu; ak sa výber nezhoduje so žiadnym štýlom, telo zostane
nezmenené a spracovanie sa preskočí ako `no_styles`), spojí vybrané pokyny v poradí
katalógu,
jedenkrát pridá klauzulu o hraniciach **once** (spolu s bezpečnostnou klauzulou,
`SAFETY_BOUNDARIES` alebo jej prekladom, keď je vybratý štýl `less-code` alebo
`ponytail`) a blok začne jedinou značkou idempotencie
(`[OmniRoute Output Styles]`), takže opätovné použitie nevykoná žiadnu zmenu. Keď má
rozpoznaný jazyk (pozrite časť Výber jazyka nižšie) preklad, namiesto angličtiny sa
vloží lokalizovaný pokyn.

V tele s neprázdnym poľom `messages` sa kontrola idempotencie vykoná pred obídením na
základe obsahu: keď sa značka `[OmniRoute Output Styles]` už nachádza v poli `system`
najvyššej úrovne (ako reťazec alebo pole blokov obsahu) alebo v systémovej správe s
reťazcovým obsahom, telo zostane nezmenené ako `already_applied` a kontrola kľúčových
slov sa nevykoná. V opačnom prípade obídenie na základe obsahu
(`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) skontroluje text posledných troch
správ bez ohľadu na ich rolu a preskočí štýly pre celý krok, keď sa tento text zhoduje
s kľúčovými slovami týkajúcimi sa zabezpečenia, nezvratnej akcie alebo požiadavky na
objasnenie, prípadne so sekvenciou citlivou na poradie: `first`, `then`, `after that`,
`before`, `rollback` alebo `backup`, za ktorými do 240 znakov nasleduje `delete`,
`drop`, `migrate`, `deploy` alebo `release`. Obídenie sa vykonáva, kým je zapnutý
prepínač **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, predvolene zapnutý); vypnutím prepínača sa kontrola
kľúčových slov preskočí.

Keď obídenie umožní spracovanie kroku, `placeSystemInstruction()` (v rovnakom súbore),
ktorá nikdy nevytvára nové `messages[0]`, umiestni blok do prvého nájdeného umiestnenia
z nasledujúcich:

1. Úvodná systémová správa s reťazcovým obsahom: blok sa pripojí za jej text.
2. Pole `system` najvyššej úrovne: blok sa pripojí za text reťazca alebo
   sa pridá ako nový textový blok do poľa blokov obsahu.
3. Prvá neskoršia systémová správa s reťazcovým obsahom: blok sa pripojí za jej
   text.
4. Žiadna z uvedených možností: blok sa vloží do novej systémovej správy na konci
   `messages`.

V tele bez poľa `messages` (alebo s prázdnym poľom) sa nevykoná obídenie na základe
obsahu a pole `system` najvyššej úrovne sa nekontroluje. Blok sa pripojí za text
reťazcového poľa `instructions`, pokiaľ toto pole už neobsahuje značku
`[OmniRoute Output Styles]`; v takom prípade telo zostane nezmenené ako
`already_applied`. Keď telo nemá reťazcové pole `instructions`, ale obsahuje `input`
(reťazec alebo pole), blok sa stane hodnotou `instructions` a nahradí akúkoľvek
nereťazcovú hodnotu, ktorú toto pole obsahovalo. Telo bez reťazcového poľa `instructions`
a zároveň bez reťazca alebo poľa `input` zostane nezmenené a preskočí sa ako
`no_messages`.

#### Ako povoliť

Na ovládacom paneli: **Kontext kompresie → Nastavenia kompresie**
(`/dashboard/context/settings`), sekcia Výstupné štýly: jeden riadok pre každý štýl s
prepínačom zapnutia/vypnutia a výberom úrovne. Štýly sa vkladajú, keď je zapnutá samotná
kompresia (hlavný prepínač stránky `enabled`). Prepínač **Auto-Clarity Bypass** sa
nachádza na stránke **Caveman** (`/dashboard/context/caveman`) na jej karte
**Výstupný režim**. Programovo konfigurácia kompresie uchováva výber takto:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Spätná kompatibilita: kým je `outputStyles` prázdne, staršie nastavenie
`cavemanOutputMode.enabled` sa mapuje na `terse-prose` s hodnotou
`cavemanOutputMode.intensity`. Blok sa potom začína značkou
`[OmniRoute Output Styles]`, zatiaľ čo starší vkladač `applyCavemanOutputMode()`
vkladal `[OmniRoute Caveman Output Mode]`. Pod značkou sa text zhoduje so starším
vloženým textom v jazykoch en, pt-BR, es, de, fr, it, ru, id a vi; v ja a zh obsahuje
pred klauzulou o hraniciach jednu medzeru navyše. `terse-prose` má preklady do pt-BR,
es, de, fr, it, ru, zh, ja, id a vi, takže požiadavka, ktorej rozpoznaný jazyk je `hu`,
dostane anglický text, zatiaľ čo starší vkladač používal maďarský text.

Výber jazyka výstupného štýlu (`resolveOutputStyleLanguage()` v
`outputStyles/apply.ts`): keď je zapnuté `languageConfig.enabled`, funkcia
`autoDetect` odoberie vzorku z najnovšej používateľskej správy v poli `messages`
požiadavky, ktorá obsahuje text (reťazcový obsah alebo `text` jej častí obsahu), a
spustí na nej detektor enginu Caveman (`detectCompressionLanguage()`). Detektor vráti
`zh` pre text so znakmi Han a bez znakov kana; inak vráti ten z jazykov `it`, `pt-BR`,
`es`, `de`, `fr`, `ru`, `ja`, `hu` a `id`, ktorý má najviac zhôd s indíciami, a `en`,
keď sa nezhoduje žiadny — text, ktorý nedokáže klasifikovať, dostane angličtinu, nikdy
nie `defaultLanguage`, a `vi` sa nikdy nerozpozná, hoci štýly obsahujú text v `vi`.
Telo Responses API uchováva svoje kroky v `input`, z ktorého sa vzorka neodoberá, preto
dostane `defaultLanguage` a následne angličtinu. Keď žiadna používateľská správa v
`messages` neobsahuje text alebo keď je `autoDetect` vypnuté, použije sa
`defaultLanguage` a následne angličtina. Keď je `languageConfig.enabled` vypnuté,
jazykom je angličtina — pokiaľ sa na požiadavku nevzťahuje kombinácia kompresie
(kombinácia priradená smerovacej kombinácii požiadavky alebo predvolená kombinácia
kompresie, ktorú chatCore použije ako náhradnú pre vstavaný vrstvený kanál): použitie
kombinácie zapne pre danú požiadavku `languageConfig.enabled` a nastaví
`defaultLanguage` podľa jazykových balíkov kombinácie (uložená hodnota, ak patrí medzi
balíky kombinácie, inak prvý balík kombinácie, ktorého predvolená hodnota je `en`),
pričom sa naďalej uplatňuje uložené nastavenie `autoDetect` (predvolene zapnuté).
Vstupný engine Caveman vyberá jazyk svojho balíka pravidiel odlišne — pre každú textovú
časť samostatne a pri vypnutej automatickej detekcii v závislosti od `enabledPacks`.

Matica štýl × jazyk je pevne stanovená testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: každý štýl katalógu potrebuje
položku v `BASELINE_LANGUAGES` daného testu; štýl, ktorý nie je obmedzený podľa locale, musí obsahovať
preklad pt-BR (štýl `terse-cjk` obmedzený podľa locale je z tohto pravidla vyňatý), pokiaľ nie je
uvedený v `KNOWN_ENGLISH_ONLY`, ktorý môže obsahovať iba štýly úplne bez prekladov —
uvedený štýl, ktorý má akýkoľvek preklad, spôsobí zlyhanie testu; a štýl spôsobí zlyhanie testu, keď
stratí jazyk uvedený v jeho položke `BASELINE_LANGUAGES`. Ak chcete pridať štýl, pozrite si
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledkov nástrojov

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts`
komprimuje text výsledku nástroja pomocou **5 stratégií**. Skúša ich v tomto poradí a
o výsledku rozhodne prvá povolená stratégia, ktorej kontrola zodpovedá obsahu:

1. **`fileContent`**: obsah s 3 alebo viacerými riadkami, v ktorom aspoň jeden riadok po ignorovaní
   úvodného odsadenia začína na `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` alebo `return ` (kľúčové slovo nasledované medzerou), prípadne na `if`,
   `for` alebo `while`, za ktorým nasleduje `(` alebo ` (`, zachová prvých 20 a posledných 5 riadkov,
   pričom vynechaná stredná časť je označená.
2. **`grepSearch`**: obsah s aspoň jedným riadkom vo formáte `<path>:<digits>:`,
   kde text pred prvou dvojbodkou neobsahuje žiadne medzery, zachová iba takéto riadky,
   najviac 30, po ktorých nasleduje počet prípadných ďalších zhôd a zoznam súborov so zhodami;
   všetky ostatné riadky sa zahodia. Na spustenie stratégie stačí jeden takýto riadok, takže sa
   započíta aj riadok denníka začínajúci časovou pečiatkou, napríklad `12:30:45`.
3. **`shellOutput`**: výstup, ktorý obsahuje sekvenciu ANSI CSI (`ESC[`, potom číslice alebo
   bodkočiarky a následne písmeno, ako vo farebných kódoch) alebo znak `$` nasledovaný medzerou
   kdekoľvek v texte, stratí tieto sekvencie (ostatné únikové sekvencie, napríklad `ESC[?25l` alebo
   sekvencia názvu okna OSC, zostanú zachované) a zachová posledných 50 riadkov, pričom po sebe
   idúce opakované riadky zlúči. Keďže táto kontrola prebieha pred `json` a `errorMessage`,
   výstup JSON alebo chybový výstup obsahujúci takýto znak `$` sa k nim nikdy nedostane, kým je
   `shellOutput` zapnutý.
4. **`json`**: obsah JSON dlhší ako 2 000 znakov, ktorý začína na `{` alebo `[` (po
   voliteľných medzerách) a dá sa analyzovať, sa zhrnie: pole s viac ako 7 položkami zachová
   prvých 5 a posledné 2 položky a svoj celkový počet; objekt zachová prvých 20
   kľúčov, pričom každá hodnota vnoreného objektu alebo poľa sa nahradí zástupným symbolom `{…N keys}`
   (pri poli je N jeho dĺžka) a značka `_remaining_<N>_keys` uvádza počet kľúčov
   zahodených po prvých 20. Skalárne hodnoty sa kopírujú celé, takže objekt s 20 alebo menej kľúčmi
   bez vnorených hodnôt sa iba nanovo odsadí — minifikovaný objekt nadobudne ďalšie znaky
   a zostane nezmenený.
5. **`errorMessage`**: výstup, ktorý kdekoľvek a bez ohľadu na veľkosť písmen obsahuje `error:`,
   `error ` (slovo nasledované medzerou, ako v `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` alebo `traceback`, zachová prvý riadok,
   nasledujúcich 10 riadkov a posledné 3, pričom riadky medzi nimi nahradí značka
   `… [N frames elided] …`. Značka sa zobrazí iba vtedy, keď po prvom riadku nasleduje viac ako
   13 riadkov, takže chybový výstup so 14 alebo menej riadkami sa neskráti (pri 12 alebo 13 riadkoch
   posledné 3 riadky opakujú už zachované riadky).

Keď stratégia nájde zhodu, neskoršie stratégie sa už neskúšajú, a to ani vtedy, ak daná stratégia
nič neušetrí. Keď zodpovedajúca stratégia neušetrí žiadne odhadované tokeny (dĺžka ÷ 4, zaokrúhlená nahor) —
napríklad súbor podobný kódu s 25 alebo menej riadkami alebo pole JSON dlhšie ako 2 000
znakov so 7 alebo menej položkami — agresívny mechanizmus zachová pôvodný výsledok nástroja:
obaja volajúci (`compressAggressive()` a `compressAnthropicToolResultBlock()`)
zachovajú originál, keď je `saved` rovné 0 alebo menšie, zatiaľ čo samotné `compressToolResult()`
naďalej vracia výstup danej stratégie. Krok spracovania výsledku nástroja nemá posledné slovo:
záložný sumarizátor mechanizmu môže stále skrátiť správu `tool` alebo `function` dlhšiu
ako 8 192 znakov (`maxTokensPerMessage`, 2 048, krát 4).

#### Kedy použiť

Kompresia výsledkov nástrojov je krokom 1 agresívneho mechanizmu (`compressAggressive()` v
`open-sse/services/compression/aggressive.ts`), takže sa spúšťa v režime Aggressive a v
kroku `aggressive` skladaného kanála. Komprimuje správy `tool` a `function`
vo formáte OpenAI a text vnútri blokov Anthropic `tool_result`. Každá stratégia má vlastný
prepínač pod `aggressive.toolStrategies`; všetky sú predvolene zapnuté. Na ovládacom paneli sa
prepínače nachádzajú v zobrazení **Advanced** stránky Caveman, keď je kompresia zapnutá a
predvoleným režimom je Aggressive.

### Skladaný kanál

Skladaný režim spúšťa **viacero mechanizmov za sebou** — zvyčajne najprv RTK
(60 – 90 % úspora na výstupe nástroja) a potom Caveman na zostávajúcom texte (~46 % úspora
vstupu). V kombinácii ide o **oprávnený rozsah 78 – 95 %** (pozrite si vyššie časť Matematika úspor upstreamu):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` má priemer ≈89 %.

#### Ako to funguje

```
Vstup (1000 tokenov)
  → RTK (filter zohľadňujúci príkazy) → 200 tokenov
    → Caveman (odstránenie výplne) → 108 tokenov
  → Výstup (108 tokenov, ~89 % úspora)
```

#### Kedy použiť

Skladaný režim použite na:

- Pracovné postupy s intenzívnym využívaním nástrojov (agentické programovanie, výskum)
- Nákladovo citlivé dávkové spracovanie
- Situácie, keď potrebujete maximálnu úsporu tokenov

Skladané kanály sa konfigurujú prostredníctvom globálneho nastavenia kompresie
`stackedPipeline` alebo prostredníctvom pomenovanej kombinácie kompresie priradenej ku kombinácii smerovania (pozrite si
vyššie časť Prepísanie podľa kombinácie) — nie prostredníctvom `modePack` automatickej kombinácie (toto pole iba
mení váhy výberu modelu automatickej kombinácie a `stacked` nie je platný názov balíka).

---

## Prepísanie kombinácií kompresie

Globálny režim kompresie môžete prepísať **pre každú kombináciu samostatne**, aby ste doladili správanie
pre rôzne prípady použitia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Je to užitočné pre:

- **Kombinácie na programovanie**: Pri dlhých reláciách použite režim `aggressive`
- **Kombinácie na rýchle otázky a odpovede**: Na rýchle odpovede použite režim `lite`
- **Kombinácie s intenzívnym používaním nástrojov**: Na dosiahnutie maximálnej úspory použite režim `stacked`
- **Produkčné kombinácie**: Pre poskytovateľov s ukladaním do vyrovnávacej pamäte ponechajte prepísanie vypnuté — neustále aktívna
  úprava zohľadňujúca vyrovnávaciu pamäť automaticky zníži `aggressive`/`ultra` na `standard`
  (režim `cache-aware` nie je možné vybrať)

---

## Pozrite tiež

- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Premenné prostredia kompresie
- [Sprievodca architektúrou](../architecture/ARCHITECTURE.md) — Vnútorné fungovanie kompresného kanála
- [Používateľská príručka](../guides/USER_GUIDE.md) — Začíname s kompresiou
- [Kompresia RTK](./RTK_COMPRESSION.md) — Filtre RTK, model dôveryhodnosti, overovacia brána, obnovenie nespracovaného výstupu
- [Kompresné mechanizmy](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, ovládací panel
- [Formát pravidiel kompresie](./COMPRESSION_RULES_FORMAT.md) — Formát balíka pravidiel JSON
- [Jazykové balíky kompresie](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidlá Caveman špecifické pre jednotlivé jazyky
