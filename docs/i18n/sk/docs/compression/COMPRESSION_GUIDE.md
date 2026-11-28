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

### Ľahký režim (~15 % úspora, <1 ms latencia)

Najbezpečnejší režim — čistenie formátovania. Skrátenie výsledkov nástrojov spôsobuje stratu údajov, preto predvolená
cesta (bez `allow-lossy`, `engine:lite` alebo explicitného povolenia pomenovanej kombinácie) spúšťa ľahký režim s
`compressToolResults: false`: predchádzajúce výsledky nástrojov sa poskytovateľovi odovzdajú nezmenené.

| Technika                 | Opis                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Zlúčenie po sebe idúcich prázdnych riadkov a koncových medzier                                                               |
| `dedupSystemPrompt`      | Odstránenie duplicitných systémových správ                                                                                   |
| `compressToolResults`    | Skrátenie skorších výsledkov nástrojov na limit ľahkého režimu (so stratou údajov: iba s explicitným povolením v požiadavke) |
| `removeRedundantContent` | Odstránenie opakujúcich sa pokynov                                                                                           |
| `replaceImageUrls`       | Skrátenie dát URI obrázkov v kódovaní base64                                                                                 |

**Vhodné pre:** Používanie vždy, kriticky dôležité pracovné postupy.

### Štandardný režim (~30 % úspora)

Inšpirovaný projektom [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňové slová a príliš rozvláčne formulácie pri zachovaní významu:

- Odstraňuje výplňové slová („please“, „I think“, „basically“, „actually“)
- Skracuje rozvláčne formulácie („in order to“ → „to“, „as a result of“ → „because“)
- Odstraňuje zdvorilé zmierňovanie („Would you mind...“, „If you could possibly...“)
- Viac než 30 regulárnych výrazov vyladených pre programátorské zadania

**Vhodné pre:** Každodenné programátorské pracovné postupy, tímy zamerané na úsporu nákladov.

### Agresívny režim (~50 % úspora)

Inteligentná správa histórie pre dlhé relácie:

- **Starnutie správ** — staršie správy sa postupne viac komprimujú
- **Kompresia výsledkov nástrojov** — dlhé výstupy nástrojov sa skracujú alebo vynechávajú (prvé/posledné riadky,
  filtrovanie podľa zhodných riadkov, kompaktné kľúče JSON)
- **Strážcovia štrukturálnej integrity** — zaisťujú konzistentnosť dvojíc `tool_use` + `tool_result`
- **Zohľadnenie kontextového okna** — rešpektuje limity tokenov jednotlivých modelov

**Vhodné pre:** Dlhšie relácie ladenia, rozsiahle kódové základne.

### Ultra režim (~75 % úspora)

Maximálna kompresia pre scenáre kritické z hľadiska počtu tokenov:

- **Heuristické orezávanie** — orezávanie tokenov prózy na základe skóre
- **Zachovanie štruktúry** — bloky kódu s ohraničením, vložený kód, URL a identifikátory sa označia a následne
  znovu vložia doslovne, nikdy sa neorezávajú
- **Voliteľná úroveň SLM** — malý lokálny model môže pri nakonfigurovaní spresniť orezanie
- Nezávislé od agresívneho režimu: nespúšťa starnutie správ, kompresiu výsledkov nástrojov
  ani záložný sumarizátor (iba zlyhanie úrovne SLM môže presmerovať spracovanie cez agresívny režim)

**Vhodné pre:** Situácie, keď opakovane narážate na limity kontextu.

### Režim RTK (60 – 90 % v rámci upstreamu)

Režim RTK je optimalizovaný pre rozvláčne výstupy nástrojov, ktoré sa objavujú v reláciách s programátorskými agentmi:

- Rozpoznáva triedy príkazov/výstupov, ako sú `git status`, `git diff`, `git log`, spúšťače testov,
  zostavenia TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/inštalácie, protokoly Docker, výstupy infraštruktúry
  a všeobecné výstupy shellu
- Používa balíky filtrov JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtre schémy RTK TOML v1 zo súborov `filters.toml` projektu alebo globálnych súborov s overením inline testov
  a riadením dôveryhodnosti súborov projektu
- Obsahuje 56 vstavaných filtrov s inline overovacími vzorkami
- Odstraňuje riadiace sekvencie ANSI, indikátory priebehu, opakujúce sa riadky a nerelevantný šum
- Zachováva zlyhania, chyby, upozornenia, zmenené súbory, súhrny a koniec dlhého výstupu
- Podporuje filtre projektu s riadením dôveryhodnosti, globálne filtre a voliteľnú obnovu redigovaného nespracovaného výstupu

**Vhodné pre:** Relácie agentov s výstupmi shellu, zostavení, testov, git, grep a súborov.

### Skladaný režim (78 – 95 % v rámci vhodného rozsahu)

Skladaný režim spúšťa viacero kompresných nástrojov v deterministickom poradí. Predvolený kanál je:

```txt
RTK -> Caveman
```

Toto poradie najprv zjednotí terminálový výstup/výstup nástrojov, potom použije sémantickú kondenzáciu Caveman na
zostávajúce zadanie v prirodzenom jazyku. Skladané kanály možno konfigurovať globálne alebo prostredníctvom
kompresných kombinácií priradených ku kombináciám smerovania.

**Vhodné pre:** Zmiešaný kontext s rozsiahlymi protokolmi nástrojov a ľudskými pokynmi alebo zhrnutiami asistenta.

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

### Panel

Prejdite na `Dashboard → Context & Cache`:

- **Caveman** — výber režimu, jazykové balíky, náhľad a globálne predvolené nastavenia
- **RTK** — náhľad filtrovania príkazov, nastavenia bezpečnosti RTK a katalóg filtrov
- **Compression Combos** — pomenované pipeline nástrojov priradené ku kombináciám smerovania
- **Auto-Trigger Threshold** — automatické zapnutie kompresie, keď počet tokenov prekročí prahovú hodnotu

### Prepísanie pre kombináciu

V časti `Dashboard → Context & Cache → Compression Combos` priraďte kompresnú kombináciu ku kombinácii
smerovania:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vám umožní používať vrstvenú kompresiu u bezplatných poskytovateľov a poskytovateľov na programovanie,
pričom v platených predplatných zostane zapnutý odľahčený režim.

Toto priradenie „Prepísanie pre kombináciu“ je iné nastavenie než prepísanie **režimu kompresie
kombinácie smerovania** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schéma poľa
akceptuje aj `rtk`, `stacked` a `omniglyph`) — toto prepísanie nevyberá pomenovanú pipeline kompresnej
kombinácie; iba nastavuje pole `compressionMode`, ktoré používa
`resolveCompressionPlan`. Dá sa nastaviť buď na karte kombinácie (`Dashboard → Combos`), alebo od
#6760 pre každú kombináciu smerovania v zozname „Assign to routing“ v časti
`Dashboard → Context & Cache → Compression Combos`, hneď vedľa začiarkavacieho políčka na priradenie
pipeline opísaného vyššie. Obe rozhrania ukladajú údaje prostredníctvom rovnakého koncového bodu
`PUT /api/combos/{id}`.

### Prepísanie pre jednotlivú požiadavku

Odošlite hlavičku požiadavky `x-omniroute-compression`, ktorou prepíšete plán kompresie pre jednu
požiadavku. Má najvyššiu prioritu — prepisuje nastavenie kombinácie smerovania, aktívny profil,
automatické spustenie aj predvolené nastavenie panela. Neznáme hodnoty sa ignorujú (požiadavka sa
nikdy nezamietne) a globálny hlavný prepínač stále riadi všetko: keď je kompresia globálne vypnutá,
hlavička ju nemôže zapnúť. Hodnoty:

| Hodnota       | Účinok                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Pre túto požiadavku sa nepoužije žiadna kompresia.                                                                       |
| `default`     | Profil Default odvodený z panela (ignoruje aktívny profil). Strátové nástroje zostanú vypnuté.                           |
| `safe`        | To isté ako pri vynechaní hlavičky.                                                                                      |
| `allow-lossy` | Zachová plán operátora pre túto požiadavku vrátane súhrnov, filtrov relevantnosti a prepisov štýlu.                      |
| `engine:<id>` | Jeden nástroj, ak je povolený, napr. `engine:rtk`. Ide o explicitné povolenie daného nástroja pre jednotlivú požiadavku. |
| `<combo>`     | Pomenovaná kombinácia, najskôr porovnaná podľa názvu (bez rozlišovania veľkých a malých písmen), potom podľa ID.         |

Bez `allow-lossy`, `engine:<id>` alebo pomenovanej kombinácie sa strátové nástroje nepoužijú. Keď sa
strátové nastavenie Default, automatického spustenia alebo prepísania smerovania zníži, OmniRoute
zachová rozpoznané bezstrátové kroky z nakonfigurovanej vrstvenej pipeline v nakonfigurovanom poradí.
Na `session-dedup → lite` sa prejde iba vtedy, keď neprežije žiadny nakonfigurovaný bezstrátový krok.

Náhľad **Effective pipeline** na paneli Nastavenia zobrazuje bežný plán uložený v konfigurácii. Keď
je možné spustiť automatické spustenie, rovnaký náhľad zobrazí aj jeho podmienenú efektívnu pipeline,
aby rozlíšenie počas behu v paneli aj bez hlavičky zostalo zosúladené.

Použitý plán sa vracia v hlavičke odpovede
`X-OmniRoute-Compression: <mode>; source=<source>`, kde `<source>` je jedna z hodnôt
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` alebo `off`.

### API

```bash
# Získať nastavenia kompresie
curl http://localhost:20128/api/settings/compression

# Aktualizovať nastavenia kompresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Zobraziť náhľad konkrétneho payloadu RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Zobraziť zoznam balíkov filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Priamo otestovať RTK s voliteľnými metadátami príkazu
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

## Pokročilé kompresné systémy

Okrem 7 režimov opísaných vyššie (zdroj akceptuje aj režimy `codex-responses` a `omniglyph`, ktoré táto príručka nepokrýva), nižšie uvedené časti pokrývajú funkcie, ktoré fungujú v rámci týchto režimov alebo popri nich: Kompresia výsledkov nástroja a progresívne starnutie sú kroky 1 a 2 agresívneho motora (agresívny režim a krok `aggressive` stohovaného potrubia), režim Cachegraded Pipeline je spustený `aggressive` a `ultra` až `standard` pre poskytovateľov ukladania do vyrovnávacej pamäte, keď je kompresia zapnutá, a režim výstupu a štýly výstupu Caveman sú voliteľné systémové pokyny, ktoré sú predvolene vypnuté a ktoré tvarujú výstup modelu namiesto kompresie požiadavky.

### Cache-Aware Compression

Niektorí poskytovatelia (napríklad Anthropic s rýchlym ukladaním do vyrovnávacej pamäte) podporujú** rýchle ukladanie do vyrovnávacej pamäte** , čo im umožňuje uložiť časti výzvy do vyrovnávacej pamäte, aby sa znížili náklady a oneskorenie. Keď je povolené ukladanie do vyrovnávacej pamäte, môže v skutočnosti agresívna kompresia** ublížiť** výkon, pretože zmení tokeny uložené vo vyrovnávacej pamäti, čím zruší platnosť vyrovnávacej pamäte.

Modul `cachingAware.ts` to rieši pomocou** zisťovanie kontextu ukladania do vyrovnávacej pamäte** a** úprava stratégie kompresie** podľa toho.

#### Ako to funguje

1. **Zistiť kontext ukladania do vyrovnávacej pamäte** — Skenuje telo požiadavky na značky `cache_control`
2. **Identifikujte poskytovateľov ukladania do vyrovnávacej pamäte** — Skontroluje, či cieľový poskytovateľ podporuje ukladanie do vyrovnávacej pamäte
3. **Upravte stratégiu** — Downgrade `aggressive`/`ultra` na `standard` pre poskytovateľov ukladania do vyrovnávacej pamäte
4. **Preskočiť výzvu systému** Systémové výzvy — sa zvyčajne ukladajú do vyrovnávacej pamäte, takže ich nekomprimujte

Pomocník stratégie tiež vráti príznak `deterministicOnly`, ale tvorca plánu spotrebuje iba stratégiu — nič po prúde nečíta príznak dnes.

#### Príklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kedy použiť

Cache-aware kompresia je** vždy zapnuté** — nie je potrebná žiadna konfigurácia. Spustí sa vždy, keď je zapnutá kompresia a cieľový poskytovateľ podporuje rýchle ukladanie do vyrovnávacej pamäte (Anthropic, OpenAI atď.); explicitné značky `cache_control` sa nevyžadujú — downgrade spúšťa samotný poskytovateľ vyrovnávacej pamäte a samotné značky to nikdy nerobia (detekcia značiek dodáva telemetriu vyrovnávacej pamäte, nie rozhodnutie o stratégii).

OpenRouter sa počíta ako poskytovateľ ukladania do vyrovnávacej pamäte iba pre modely `anthropic/*` : Žiadosti o kód Claude si zachovávajú svoje body prerušenia `cache_control` (najviac 4) a strážca chráni predponu, zatiaľ čo každá ďalšia rodina OpenRouter (`openai/`, `google/`, `qwen/`, ...) zostáva zbavená a nestrážená.

### Progresívne starnutie

Dlhé konverzácie hromadia veľa správ, ale staršie odbočky sú menej relevantné. Modul `progressiveAging.ts`** degraduje správy podľa vzdialenosti otočenia** (vzdialenosť meraná od konca rozhovoru). S dodanými predvolenými nastaveniami (`verbatim: 2, light: 2, moderate: 3`):

- **Posledné 2 otáčky (vzdialenosť ≤ 2)** : Doslovne
- **Vzdialenosť 3** : Stlačenie jaskynného muža (odstránenie výplne)
- **Vzdialenosť 4 +** : Súhrn správ asistenta; správy používateľov zredukované na ich prvý riadok, obmedzené na 120 znakov; ostatné role nedotknuté. Systémové výzvy, už zastarané správy a najnovšie správy používateľa sa vždy uchovávajú doslovne bez ohľadu na vzdialenosť. Nič nie je úplne vypustené a pásmo `light` je nedosiahnuteľné s dodanými predvolenými nastaveniami (`light` sa rovná `verbatim`).

#### Príklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Kedy použiť

Progresívne starnutie je** vždy zapnuté** pre režim `aggressive` — je to krok 2 `compressAggressive()`. Ultra režim ho nespustí. Je obzvlášť účinný pri:

- Dlhotrvajúce relácie kódovania
- Viacdňové rozhovory
- Agentné pracovné postupy s mnohými volaniami nástrojov

### Výstupný režim jaskynného muža

Režim výstupu Caveman pridáva** systémové pokyny** ktoré žiadajú samotný model o stručný výstup — úroveň `lite` žiada stručné odpovede, ktoré zachovávajú celé vety, `full` ho žiada, aby „odpovedal stručne ako inteligentný jaskynný muž“ a `ultra` žiada telegrafický výstup; návod len pýta, nevedia to zaručiť. Požiadavky ich prijímajú cez `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` najskôr vyrieši výber pomocou back-compat shim (`resolveOutputStyleSelection()` v `open-sse/services/compression/outputStyles/backCompat.ts`), ktorý, keď je `outputStyles` prázdny, mapuje povolený `cavemanOutputMode` na štýl výstupu `terse-prose` na `cavemanOutputMode.intensity` (pozri Back-compat nižšie); neprázdny výber `outputStyles` sa použije tak, ako je, a `cavemanOutputMode.enabled` a `intensity` potom nemajú žiadny účinok, zatiaľ čo jeho prepínač `autoClarity` stále platí. `outputMode.ts` obsahuje texty inštrukcií (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), vynechanie obsahu a pomocníka umiestnenia, ktorý injekcia používa; jeho vlastný injektor `applyCavemanOutputMode()` nemá žiadne výrobné vyvolávanie.

#### Ako to funguje

Tento režim nekomprimuje vstup. Do systémovej výzvy pridá inštrukčný blok (pozri Ako funguje injekcia nižšie) a akýkoľvek režim kompresie vstupu vybraný pre požiadavku sa potom stále spúšťa v tele, ktoré teraz nesie blok. Pred klauzulou o zdieľaných hraniciach, ktorou sa končí každá úroveň, anglická úroveň `full` znie:

> "Odpovedajte stručne ako inteligentný jaskynný muž. Zahoďte články (a/an/the), výplň (just/really/basically/actually/simply), zdvorilosti, hedging. Fragmenty OK. Krátke synonymá (veľké nie rozsiahle, oprava nie implementácia). Udržujte všetku technickú podstatu, kód, chyby, URLs, identifikátory presné."

Toto funguje obzvlášť dobre pre:

- Generovanie kódu (terser výstup = menej tokenov)
- Rýchle otázky a odpovede (nie sú potrebné zložité vysvetlenia)
- Dávkové spracovanie (maximalizácia výkonu)

#### Kedy použiť

Výstupný režim Caveman je** prihlásiť sa** . Keď je kompresia zapnutá (`enabled: true`, hlavný prepínač na stránke Nastavenia kompresie), zapnite ju pomocou `cavemanOutputMode.enabled`; `intensity` vyberie `lite`, `full` alebo `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresné kombinácie** Výstupný režim** toggle (`outputMode`, úroveň v `outputModeIntensity`) nastaví rovnaký prepínač pre požiadavky, na ktoré sa vzťahuje combo, a nástroj `omniroute_set_compression_engine` MCP ho zapíše cez svoj booleovský argument `outputMode`. Neprázdny výber `outputStyles` má prednosť pred týmto prepínačom. Na prístrojovej doske povoľte** Krátka próza** výstupný štýl vstrekuje rovnaký blok (pozri Štýly výstupu nižšie).

### Štýly výstupu (katalóg)

Výstupný režim Caveman uvedený vyššie je** starú jednoštýlovú cestu** . Fáza 4 to zovšeobecnila do katalógu skladateľných výstupných štýlov: `OUTPUT_STYLE_CATALOG` v `open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl je systémová inštrukcia, ktorá od samotného modelu požaduje lacnejší výstup; štýly môžu byť povolené spolu a sú vstrekované v katalógovom poradí.

| štýl                             | `id`            | Čo to robí                                                                                                                                                                                                                                                        | Jazyky výučby                                 |
| -------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Krátka próza                     | `terse-prose`   | Drop filler/articles/hedging; dodržujte presnú technickú podstatu. Rovnaký text ako v starom režime výstupu jaskynného muža (odkazovaný, neprepisovaný).                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menej kódu                       | `less-code`     | YAGNI rebrík: najmenšia pracovná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (lenivý starší vývojár) | `ponytail`      | „Najlepší kód je kód, ktorý sa nikdy nenapísal“: opätovné použitie prepísania >, symptóm hlavnej príčiny >, najkratší pracovný rozdiel.                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mám ADHD (prvá akcia)            | `i-have-adhd`   | Najprv akcia (command/path/snippet pred prózou), očíslované ohraničené kroky, ONE konkrétny ďalší krok, žiadne preamble/recap/closers. Upravené z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter               | `antislop-ui`   | Každá vizuálna technika musí prejsť testom účelu (hierarchia, identita, čitateľnosť); žiadna predvolená gradients/glass/glow, obmedzená paleta, žiadne rozloženia šablón. Oba antislop štýly pridávajú hranicu bez mŕtveho ovládania / bez fabrikovaných nárokov. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kópia a ľudský filter   | `antislop-copy` | Špecifická kópia (bez pomlčky, generické CTAs, módne slová, približovače chatbotov, vymyslené fakty) plus pravidlá pre ľudí: kontrast WCAG AA, viditeľné zameranie, dosah klávesnice, stavy empty/loading/error, preformátovanie mobilu.                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| stručné CJK (文言)               | `terse-cjk`     | `full`/`ultra` odpoveď v klasickej čínštine (文言); `lite` žiada iba stručné odpovede bez funkčných slov, zdvorilosti alebo zdobenia.                                                                                                                             | zh (miestne s bránou, pozri nižšie)           |

Každý štýl dodáva tri úrovne intenzity — `lite`, `full`, `ultra` — a každá úroveň končí klauzulou zdieľaných hraníc (`SHARED_BOUNDARIES` v `outputMode.ts`), ktorá udržuje presné bloky kódu, cesty k súborom, príkazy, chyby a URLs. Texty na úrovni `terse-prose` a `terse-cjk` pridávajú identifikátory do tohto zoznamu.

`terse-cjk` je lokálna brána na `zh` na dvoch miestach. Stránka Nastavenia kompresie uvádza svoj riadok iba vtedy, keď je jazyk UI ovládacieho panela čínština (`zh-CN` alebo `zh-TW`), a `applyOutputStyles()` ho vloží iba vtedy, keď je jazykom vyriešenia požiadavky (pozri Výber jazyka nižšie) `zh`. Skrytím riadka sa nevymaže uložený výber `terse-cjk` : nastavenia API akceptujú akékoľvek ID štýlu a uloženie iných štýlov na stránke ho zachová. V čase požiadavky je kontrola jazyka `applyOutputStyles()` jedinou bránou miestneho nastavenia.

#### Ako funguje injekcia

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rieši výber podľa katalógu (neznáme identifikátory a štýly nezhodné s miestnym nastavením sú vypustené, nikdy nedôjde k chybe; výber, ktorý nevyrieši žiadny štýl, ponechá telo nezmenené, preskočí sa ako `no_styles`), zreťazí vybraté inštrukcie v poradí katalógu, pripojí klauzulu hraníc** raz** (plus bezpečnostná klauzula, `SAFETY_BOUNDARIES` alebo jej preklad, keď je vybraté `less-code` alebo `ponytail` ) a začína blok s jednou značkou idempotencie (`[OmniRoute Output Styles]`), takže opätovné podanie žiadosti nie je možné. Keď má rozlíšený jazyk (pozri Výber jazyka nižšie) preklad, namiesto angličtiny sa vloží lokalizovaná inštrukcia.

V tele s neprázdnym poľom `messages` sa kontrola idempotencie spustí pred vynechaním obsahu: keď je značka `[OmniRoute Output Styles]` už v poli `system` najvyššej úrovne (reťazec alebo pole blokov obsahu) alebo v systémovej správe s obsahom reťazca, telo zostane nezmenené ako `already_applied` a nespustí sa žiadna kontrola kľúčových slov. V opačnom prípade vynechanie obsahu (`shouldBypassCavemanOutputMode()` v `open-sse/services/compression/outputMode.ts`) skontroluje text posledných troch správ bez ohľadu na ich úlohu a preskočí štýly pre celé kolo, keď sa tento text zhoduje s kľúčovými slovami zabezpečenia, nezvratnej akcie alebo objasnenia alebo sekvencie citlivej na poradie: `first`, `then`, `after that`, `before`, `rollback` alebo `backup` za ktorými nasledujú znaky `delete`, `drop`, `migrate` `deploy` alebo `release`. Obtok beží počas** Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, predvolene zapnuté) je zapnuté; vypnutím prepínača preskočíte kontrolu kľúčových slov.

Keď obtok umožní odbočenie, `placeSystemInstruction()` (rovnaký súbor), ktorý nikdy nevytvorí nový `messages[0]`, umiestni blok do prvého z nich, ktorý nájde:

1. Hlavná systémová správa s obsahom reťazca: blok je pripojený za jeho text.
2. Pole `system` najvyššej úrovne: blok sa pridá za text reťazca alebo sa pridá ako nový textový blok do poľa blokov obsahu.
3. Prvá neskoršia systémová správa s obsahom reťazca: blok sa pripojí za jeho text.
4. Nič z vyššie uvedeného: blok prechádza do novej systémovej správy na konci `messages`.

Na tele bez poľa `messages` (alebo s prázdnym) sa nespustí obchádzanie obsahu a pole `system` najvyššej úrovne sa nekonzultuje. Blok sa pridá za text poľa reťazca `instructions`, pokiaľ toto pole už neobsahuje značku `[OmniRoute Output Styles]`, v takom prípade sa telo ponechá nezmenené ako `already_applied`. Keď telo nemá pole reťazca `instructions` ale nesie `input` (reťazec alebo pole), blok sa zmení na `instructions`, čím nahradí akúkoľvek nereťazcovú hodnotu, ktorú pole obsahovalo. Telo bez poľa reťazca `instructions` ani reťazca alebo poľa `input` zostane nezmenené a preskočí sa ako `no_messages`.

#### Ako povoliť

Na palubnej doske:** Kontext kompresie → Nastavenia kompresie** (`/dashboard/context/settings`), časť Výstupné štýly: jeden riadok na štýl s prepínačom on/off a voličom úrovne. Štýly sa vkladajú, keď je samotná kompresia zapnutá (hlavný prepínač stránky, `enabled`). The** Auto-Clarity Bypass** prepínač je zapnutý** Jaskyniar** strana (`/dashboard/context/caveman`), vo svojom** Výstupný režim** kartu. Programovo konfigurácia kompresie zachová výber ako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: zatiaľ čo `outputStyles` je prázdne, staré nastavenie `cavemanOutputMode.enabled` sa mapuje na `terse-prose` na `cavemanOutputMode.intensity`. Blok potom začína značkou `[OmniRoute Output Styles]`, kde starý injektor `applyCavemanOutputMode()` napísal `[OmniRoute Caveman Output Mode]`. Pod značkou sa text zhoduje so staršou injekciou v en, pt-BR, es, de, fr, it, ru, id a vi; v ja a zh obsahuje jednu medzeru navyše pred klauzulou hraníc. `terse-prose` sa prekladá do pt-BR, es, de, fr, it, ru, zh, ja, id a vi, takže žiadosť, ktorej vyriešený jazyk je `hu` dostane anglický text, kde starý injektor použil svoj maďarský.

Výber jazyka v štýle výstupu (`resolveOutputStyleLanguage()` v `outputStyles/apply.ts`): so zapnutým `languageConfig.enabled` `autoDetect` vzorkuje najnovšiu správu používateľa v poli `messages` požiadavky, ktoré obsahuje text (obsah reťazca alebo `text` jeho častí obsahu) a spustí na ňom detektor motora Caveman (`detectCompressionLanguage()`). Detektor vráti `zh` pre text so znakmi Han a bez kana; inak vráti podľa toho, čo z `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` a `id` má najviac zhodných tipov, a `en` keď sa žiadna nezhoduje s textom — ktorý nemôže klasifikovať, dostane angličtinu, nikdy `defaultLanguage` a `vi` sa nikdy nezistí, hoci štýly dodávajú text `vi`. Telo odpovedí API ponecháva svoje otáčky v `input`, ktoré nie je vzorkované, takže dostane `defaultLanguage`, potom English. Ak žiadna správa používateľa v `messages` nemá text alebo ak je `autoDetect` vypnuté, použije sa `defaultLanguage`, potom angličtina. Keď `languageConfig.enabled` vypnuté, jazykom je angličtina — pokiaľ sa na požiadavku nevzťahuje kompresné kombo (kombo priradené k smerovaciemu kombu požiadavky alebo predvolené kompresné kombo chatCore spadá späť do vstavaného skladaného potrubia): použitím komba sa pre danú požiadavku zapne `languageConfig.enabled` a nastaví `defaultLanguage` z jazykových balíkov komba (ak je to uložená hodnota komba, ak je to prvá hodnota komba). predvolene je `en`), zatiaľ čo uložené `autoDetect` (štandardne zapnuté) stále platí. Vstupný modul Caveman vyberá svoj jazyk balíka pravidiel odlišne — na textovú časť a pri vypnutej automatickej detekcii je hradlovaný na `enabledPacks`.

Jazyková matica štýlu × je pripnutá pomocou `tests/unit/compression/output-styles-i18n-matrix.test.ts`: každý štýl katalógu potrebuje záznam v `BASELINE_LANGUAGES` testu; štýl, ktorý nie je chránený miestnym nastavením, musí dodať preklad pt-BR ( `terse-cjk` s miestnym nastavením je vyňatý z tohto pravidla), pokiaľ nie je uvedený v `KNOWN_ENGLISH_ONLY`, ktorý môže obsahovať iba štýly bez akýchkoľvek prekladov — uvedený štýl, ktorý má akýkoľvek preklad, neprejde testom; a štýl zlyhá v teste, keď stratí jazyk, ktorý obsahuje jeho položka `BASELINE_LANGUAGES`. Ak chcete pridať štýl, pozrite si [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledku nástroja

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts` komprimuje text výsledku nástroja pomocou** 5 stratégií** . Skúša ich v tomto poradí a prvá povolená stratégia, ktorej kontrola sa zhoduje s obsahom, rozhodne o výsledku:

1. **`fileContent`** : obsah 3 alebo viacerých riadkov, v ktorých aspoň jeden riadok, bez ohľadu na zarážku na začiatku, začína znakmi `import `, `export `, `function `, `class `, `const `, `let `, `var ` alebo `return ` (kľúčové slovo plus medzera), alebo `if`, `for` alebo `while`, za ktorými nasleduje `(` alebo ` (` 2, pričom posledných 5 riadkov je označených 2, pričom jeho posledných 5 sa ponecháva.
2. **`grepSearch`** : obsah s aspoň jedným riadkom vo forme `<path>:<digits>:`, kde text pred prvou dvojbodkou neobsahuje medzery, ponecháva len tieto riadky, maximálne 30, za ktorými nasleduje počet prípadných ďalších zhôd a zoznam zhodných súborov; každý druhý riadok je vypustený. Jeden takýto riadok stačí na spustenie stratégie, takže sa počíta aj riadok denníka začínajúci časovou pečiatkou, ako je `12:30:45`.
3. **`shellOutput`** : výstup, ktorý obsahuje sekvenciu ANSI CSI (`ESC[` potom číslice alebo bodkočiarky a potom písmeno, ako vo farebných kódoch) alebo `$` za ktorým nasleduje medzera kdekoľvek v texte, tieto sekvencie stratia (ostatné únikové znaky, ako napríklad `ESC[?25l` alebo OSC sekvencia názvu okna, sa zachovajú) a zachová si posledných 50 riadkov so zbalenými po sebe idúcimi opakovanými riadkami. Pretože táto kontrola prebieha pred `json` a `errorMessage`, JSON alebo chybový výstup, ktorý obsahuje takéto `$` ich nikdy nedosiahne, keď je `shellOutput` zapnuté.
4. **`json`** : užitočné zaťaženie JSON viac ako 2 000 znakov, ktoré sa začína `{` alebo `[` (po voliteľnej medzere) a analyzuje je zhrnuté: pole s viac ako 7 položkami si uchováva prvých 5 a posledné 2 položky a svoj celkový počet a objekt si uchováva svojich prvých 20 kľúčov, pričom každý vnorený objekt alebo hodnota poľa je nahradený znakom `{…N keys}`, prvý zástupný znak `_remaining_<N>_keys` je vynechaný za pole a jeho dĺžka je vynechaná 20. Skalárne hodnoty sa skopírujú celé, takže objekt s 20 kľúčmi alebo menej bez vnorených hodnôt sa iba presunie — a minimovaný získa znaky a zostane nezmenený.
5. **`errorMessage`** : výstup, ktorý obsahuje kdekoľvek a v ľubovoľnom formáte písmen, `error:`, `error ` (slovo, za ktorým nasleduje medzera, ako v `no error found`), `[error]`, `exception:`, `exception `, `[exception]` alebo `traceback` si ponechá svoj prvý riadok, ďalších 10 riadkov a posledné 3 so značkou `… [N frames elided] …` na mieste riadkov medzi nimi. Značka sa zobrazí iba vtedy, keď za prvým riadkom nasleduje viac ako 13 riadkov, takže chybový výstup 14 alebo menej riadkov sa neskráti (pri 12 alebo 13 riadkoch už zostávajú zachované posledné 3 opakujúce sa riadky).

After a strategy matches, even one that saves nothing, the later strategies are not tried. When the matching strategy saves no estimated tokens (length ÷ 4, rounded up) — for example a code-like file of 25 lines or fewer, or a JSON array over 2,000 characters with 7 items or fewer — the aggressive engine keeps the original tool result: both callers (`compressAggressive()` and `compressAnthropicToolResultBlock()`) keep the original when `saved` is 0 or below, while `compressToolResult()` itself still returns that strategy's output. The tool-result step is not the last word: the engine's fallback summarizer can still shorten a `tool` or `function` message longer than 8,192 characters (`maxTokensPerMessage`, 2,048, times 4).

#### Kedy použiť

Kompresia výsledku nástroja je krokom 1 agresívneho motora (`compressAggressive()` v `open-sse/services/compression/aggressive.ts`), takže beží v agresívnom režime a v kroku `aggressive` naskladaného potrubia. Komprimuje správy `tool` a `function` v tvare OpenAI a text vo vnútri blokov Anthropic `tool_result`. Každá stratégia má svoj vlastný prepínač pod `aggressive.toolStrategies`, všetky sú predvolene zapnuté. Na prístrojovej doske sú prepínače na stránke Caveman** Pokročilé** zobraziť, keď je kompresia zapnutá a predvolený režim je Agresívny.

### Skladané potrubie

Spustí sa skladaný režim** viacero motorov za sebou** — zvyčajne najprv RTK (60-90% úspora na výstupe nástroja), potom Caveman na zvyšný text (~ 46% úspora na vstupe). Zložené, to je** 78 – 95 % prípustný rozsah** (pozrite si vyššie uvedenú matematickú matematiku úspor na začiatku): priemer `1 - (1 - 0.60..0.90) × (1 - 0.46)` ≈ 89 %.

#### Ako to funguje

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kedy použiť

Použite skladaný režim pre:

- Pracovné postupy náročné na nástroje (agentné kódovanie, výskum)
- Nákladovo citlivé dávkové spracovanie
- Keď potrebujete maximálnu úsporu tokenov

Skladané potrubia sa konfigurujú prostredníctvom globálneho nastavenia kompresie `stackedPipeline` alebo pomocou pomenovaného komba kompresie priradeného k smerovaciemu kombu (pozri Prepísanie jednotlivých kombinácií vyššie) — nie prostredníctvom automatického komba `modePack` (toto pole prehodnocuje iba výber modelu automatického komba a `stacked` nie je platný názov balíka).

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
