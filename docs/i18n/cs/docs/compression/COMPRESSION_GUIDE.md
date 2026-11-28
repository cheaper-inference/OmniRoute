# 🗜️ Prompt Compression Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetřete 15–95 % tokenů u vhodného kontextu. Stručný přehled najdete v [části README o kompresi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Přehled

OmniRoute implementuje modulární pipeline komprese promptů, která se spouští **proaktivně** před odesláním požadavků upstream poskytovatelům. K úspoře tokenů tak dochází transparentně — váš pracovní postup není nutné nijak měnit.

```
Požadavek klienta
  → Výběr strategie komprese
    → Přepsání kombinací? → Použít nastavení kombinace
    → Prahová hodnota automatického spuštění? → Použít automatický režim
    → Výchozí režim? → Použít globální nastavení
    → Vypnuto? → Přeskočit kompresi
  → Vybraný režim komprese
    → Vypnuto: Bez komprese
    → Lehký: Bezpečné vyčištění mezer a formátování (~15 %)
    → Standardní: Odstranění výplňových slov ve stylu Caveman (~30 %)
    → Agresivní: Stárnutí historie + sumarizace (~50 %)
    → Ultra: Heuristické prořezávání + ztenčování bloků kódu (~75 %)
    → RTK: Filtrování výstupu terminálu/nástrojů se zohledněním příkazů (upstream rozsah 60–90 %)
    → Skládaný: Uspořádaná pipeline více enginů, obvykle RTK a poté Caveman (rozsah 78–95 % u vhodného obsahu)
  → Komprimovaný požadavek → Poskytovatel
```

---

## Režimy komprese

### Vypnuto

Komprese se nepoužívá. Všechny zprávy projdou beze změny.

### Odlehčený režim (~15% úspora, latence <1 ms)

Nejbezpečnější režim — úprava formátování. Zkrácení výsledků nástrojů je ztrátové, takže výchozí
cesta (bez `allow-lossy`, `engine:lite` nebo explicitního opt-inu pojmenované kombinace) používá odlehčený režim s
`compressToolResults: false`: dřívější výsledky nástrojů se poskytovateli předají beze změny.

| Technika                 | Popis                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Sloučení po sobě jdoucích prázdných řádků a koncových mezer                                                |
| `dedupSystemPrompt`      | Odebrání duplicitních systémových zpráv                                                                    |
| `compressToolResults`    | Zkrácení dřívějších výsledků nástrojů na limit odlehčeného režimu (ztrátové: pouze s opt-inem v požadavku) |
| `removeRedundantContent` | Odstranění opakujících se instrukcí                                                                        |
| `replaceImageUrls`       | Zkrácení datových URI obrázků v kódování base64                                                            |

**Vhodné pro:** Vždy aktivní používání a bezpečnostně kritické pracovní postupy.

### Standardní režim (~30% úspora)

Inspirováno nástrojem [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňová slova a rozvláčné formulace při zachování významu:

- Odstraňuje výplňová slova („please“, „I think“, „basically“, „actually“)
- Zkracuje rozvláčné fráze („in order to“ → „to“, „as a result of“ → „because“)
- Odstraňuje zdvořilé zmírňování („Would you mind...“, „If you could possibly...“)
- Více než 30 regulárních výrazů vyladěných pro programátorské prompty

**Vhodné pro:** Každodenní programátorské pracovní postupy a týmy dbající na náklady.

### Agresivní režim (~50% úspora)

Inteligentní správa historie pro dlouhá sezení:

- **Stárnutí zpráv** — starší zprávy se postupně více komprimují
- **Komprese výsledků nástrojů** — dlouhé výstupy nástrojů se zkracují nebo vynechávají (první/poslední řádky,
  filtrování řádků se shodami, kompaktnější klíče JSON)
- **Strážce strukturální integrity** — zajišťuje konzistenci dvojic `tool_use` + `tool_result`
- **Zohlednění kontextového okna** — respektuje limity tokenů jednotlivých modelů

**Vhodné pro:** Dlouhá ladicí sezení a rozsáhlé kódové základny.

### Ultra režim (~75% úspora)

Maximální komprese pro scénáře kritické z hlediska počtu tokenů:

- **Heuristické prořezávání** — prořezávání tokenů v próze na základě skóre
- **Zachování struktury** — bloky kódu s ohraničením, vložený kód, URL a identifikátory se označí a znovu beze změny vloží; nikdy se neprořezávají
- **Volitelná úroveň SLM** — malý lokální model může při konfiguraci zpřesnit prořezání
- Nezávislé na agresivním režimu: nespouští stárnutí zpráv, kompresi výsledků nástrojů ani záložní sumarizátor (pouze selhání úrovně SLM může přesměrovat záložní průchod přes agresivní režim)

**Vhodné pro:** Situace, kdy opakovaně narážíte na limity kontextu.

### Režim RTK (rozsah 60–90 % upstreamu)

Režim RTK je optimalizován pro rozvláčné výstupy nástrojů, které se objevují v sezeních s programátorskými agenty:

- Rozpoznává třídy příkazů/výstupů, jako jsou `git status`, `git diff`, `git log`, spouštěče testů,
  sestavení TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/instalace npm, protokoly Dockeru, výstupy infrastruktury a obecné výstupy shellu
- Používá balíčky filtrů JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schématu RTK TOML v1 ze souborů `filters.toml` projektu nebo globálních souborů, s validací vložených testů a ověřováním důvěryhodnosti souborů projektu
- Obsahuje 56 vestavěných filtrů se vzorky pro vložené ověřování
- Odstraňuje řídicí sekvence ANSI, indikátory průběhu, opakující se řádky a nerelevantní šum
- Zachovává selhání, chyby, varování, změněné soubory, souhrny a konec dlouhých výstupů
- Podporuje projektové filtry s ověřováním důvěryhodnosti, globální filtry a volitelné obnovení redigovaného surového výstupu

**Vhodné pro:** Sezení agentů s výstupy shellu, sestavení, testů, git, grep a souborů.

### Skládaný režim (způsobilý rozsah 78–95 %)

Skládaný režim spouští více kompresních modulů v deterministickém pořadí. Výchozí pipeline je:

```txt
RTK -> Caveman
```

Toto pořadí nejprve zkomprimuje výstup terminálu/nástrojů a poté použije sémantickou kondenzaci Cavemanu na
zbývající prompt v přirozeném jazyce. Skládané pipeline lze konfigurovat globálně nebo prostřednictvím
kompresních kombinací přiřazených směrovacím kombinacím.

**Vhodné pro:** Smíšený kontext s rozsáhlými protokoly nástrojů a lidskými instrukcemi nebo souhrny asistenta.

## Výpočet úspor oproti upstream projektům

OmniRoute dokumentuje úspory díky kompresi ze dvou zdrojů: benchmarků upstream projektů a
vlastní kombinace enginů OmniRoute.

| Zdroj   | Hodnota z upstream README použitá zde                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | o `~75%` méně výstupních tokenů, průměrná úspora výstupu v benchmarku `65%`, rozsah `22-87%` a nástroj pro kompresi vstupu `~46%` |
| RTK     | úspora výstupu příkazů `60-90%`; ukázková relace `~118,000 -> ~23,900` tokenů neboli úspora `79.7%` (`~80%`)                      |

U překrývajících se dat nástrojů a kontextu výchozí kombinace OmniRoute skládá enginy takto:

```txt
RTK -> Caveman
```

Kombinované úspory se násobí, nikoli sčítají:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí v případech, kdy RTK i Caveman mohou zmenšit stejná vstupní nebo kontextová data.
Režim výstupu odpovědi Caveman je samostatný: pokud je povolen, použijí se vlastní úspory výstupu nástroje Caveman (`65%`
v průměru, hlavní uváděná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladů závisí na poměru promptů a výstupů.

### Co „způsobilý“ skutečně znamená

Uváděný rozsah 15-95% je reálný, ale platí pouze pro **redundantní nebo příliš podrobný** obsah — opakované
řádky chyb, protokol sestavení, který neustále vypisuje stejné varování, nebo nadměrně velký výpis z `grep` či čtení souboru. **Neznamená**
to, že každý požadavek dosáhne takové úspory.

Empiricky ověřeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): běh
`stacked` (RTK + Caveman) nad blokem `tool_result` ve formátu Anthropic obsahujícím 300 identických
řádků chyb dosáhl **úspory 95.93% tokenů / úspory 96.26% znaků** — přesně v uváděném
rozsahu. Stejný pipeline spuštěný nad běžným, neredundantním výstupem nástroje (čistým seznamem shod z `grep`,
krátkým čtením souboru nebo běžným konverzačním textem) však správně dosahuje **téměř nulových úspor**, protože
neobsahuje nic opakujícího se, co by bylo možné odstranit, a `validateCompression()` (`validation.ts`) odmítá odeslat
přepracovaný obsah, který by odstranil nebo změnil bloky kódu, URL, nadpisy, verze nebo identifikátory konstant psané VELKÝMI PÍSMENY.

Jde o očekávané a bezpečné chování, nikoli o chybu: programovací relace, která převážně čte a prohledává čisté soubory,
dosáhne i při plně povolené kompresi pouze mírných celkových úspor, zatímco relace, která narazí na chybovou
smyčku nebo příliš upovídaný linter, dosáhne u takového provozu plného rozsahu 78-95%. Nepovažujte nízké souhrnné
procento úspor jediné relace za důkaz, že je komprese nesprávně nakonfigurována — nejprve ověřte, zda byl
původní výstup nástroje skutečně redundantní.

---

## Vizualizace úspor tokenů

```
Bez komprese:       47K tokenů odeslaných do LLM
S Lite:             40K tokenů odeslaných          (úspora 15% — bezpečné, vždy zapnuté)
Se Standard:        33K tokenů odeslaných          (úspora 30% — pravidla caveman-speak)
S Aggressive:       24K tokenů odeslaných          (úspora 50% — stárnutí + sumarizace)
S Ultra:            12K tokenů odeslaných          (úspora 75% — heuristické prořezávání)
S RTK:              19K-5K tokenů odeslaných       (úspora 60-90% na výstupu příkazů/nástrojů)
Se Stacked:         10K-2.5K tokenů odeslaných     (způsobilý rozsah RTK+Caveman 78-95%)
```

---

## Konfigurace

### Řídicí panel

Přejděte na `Dashboard → Context & Cache`:

- **Caveman** — výběr režimu, jazykové balíčky, náhled a globální výchozí hodnoty
- **RTK** — náhled filtrování příkazů, nastavení bezpečnosti RTK a katalog filtrů
- **Compression Combos** — pojmenované pipelines enginů přiřazené k routingovým kombinacím
- **Auto-Trigger Threshold** — automaticky aktivuje kompresi, když počet tokenů překročí práh

### Přepsání pro jednotlivou kombinaci

V `Dashboard → Context & Cache → Compression Combos` přiřaďte kompresní kombinaci k routingové
kombinaci:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vám umožní používat vrstvenou kompresi u bezplatných poskytovatelů a poskytovatelů pro kódování
a zároveň zachovat odlehčený režim u placených předplatných.

Toto přiřazení „Per-Combo Override“ je odlišné nastavení od přepsání **režimu komprese routingové
kombinace** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schéma tohoto pole přijímá
také `rtk`, `stacked` a `omniglyph`) — toto přepsání nevybírá pojmenovanou pipeline kompresní
kombinace; pouze nastavuje pole `compressionMode`, ke kterému přistupuje
`resolveCompressionPlan`. Lze ho nastavit buď na kartě kombinace (`Dashboard → Combos`), nebo od
`#6760` pro jednotlivou routingovou kombinaci v seznamu „Assign to routing“ na
`Dashboard → Context & Cache → Compression Combos`, hned vedle výše popsaného zaškrtávacího políčka
pro přiřazení pipeline. Obě rozhraní ukládají data prostřednictvím stejného koncového bodu
`PUT /api/combos/{id}`.

### Přepsání pro jednotlivý požadavek

Odešlete hlavičku požadavku `x-omniroute-compression` a přepište tak plán komprese pro jediný
požadavek. Má nejvyšší prioritu — přebíjí přepsání routingové kombinace, aktivní profil,
automatickou aktivaci i výchozí hodnotu panelu. Neznámé hodnoty se ignorují (požadavek se nikdy
neodmítne) a globální hlavní přepínač stále řídí vše: když je komprese globálně vypnutá, hlavička ji
nemůže zapnout. Hodnoty:

| Hodnota       | Efekt                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Pro tento požadavek se nepoužije žádná komprese.                                                                         |
| `default`     | Panelový profil Default (odvozený z panelu; aktivní profil se ignoruje). Ztrátové enginy zůstanou vypnuté.               |
| `safe`        | Stejné jako při vynechání hlavičky.                                                                                      |
| `allow-lossy` | Zachová plán operátora pro tento požadavek včetně souhrnů, filtrů relevance a přepisů stylu.                             |
| `engine:<id>` | Jeden engin, pokud je povolen, například `engine:rtk`. Jde o přihlášení k použití tohoto enginu pro konkrétní požadavek. |
| `<combo>`     | Pojmenovaná kombinace, nejprve porovnaná podle názvu (bez rozlišení velikosti písmen), poté podle ID.                    |

Bez `allow-lossy`, `engine:<id>` nebo pojmenované kombinace se ztrátové enginy nepoužijí. Když je
ztrátový režim Default, automatická aktivace nebo přepsání routingu sníženo, OmniRoute zachová
rozpoznané bezztrátové kroky z nakonfigurované vrstvené pipeline v nakonfigurovaném pořadí. Na
`session-dedup → lite` přejde pouze v případě, že nepřežije žádný nakonfigurovaný bezztrátový krok.

Náhled **Effective pipeline** na panelu Settings zobrazuje běžný plán uložený v konfiguraci. Když
lze spustit automatickou aktivaci, stejný náhled zobrazí také její podmíněnou efektivní pipeline,
aby rozlišení v panelu i běhové rozlišení bez hlavičky zůstaly synchronizované.

Použitý plán se vrací v hlavičce odpovědi `X-OmniRoute-Compression: <mode>; source=<source>`, kde
`<source>` je jedna z hodnot `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` nebo `off`.

### API

```bash
# Získat nastavení komprese
curl http://localhost:20128/api/settings/compression

# Aktualizovat nastavení komprese
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Zobrazit náhled konkrétního payloadu RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Vypsat balíčky filtrů RTK
curl http://localhost:20128/api/context/rtk/filters

# Otestovat RTK přímo s volitelnými metadaty příkazu
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co je chráněno

Kompresní engine **vždy zachovává:**

- ✅ Bloky kódu (ohraničené i vložené)
- ✅ Adresy URL a cesty k souborům
- ✅ Struktury JSON a strukturovaná data
- ✅ Identifikátory a chráněné technické tokeny
- ✅ Matematické výrazy
- ✅ Definice volání nástrojů/funkcí
- ✅ Systémové prompty (v režimu lite)

Obnova nezpracovaného výstupu RTK před jakýmkoli uložením rediguje běžné klíče API, bearer tokeny, tokeny Slacku, přístupové klíče AWS,
hesla, tokeny a tajné údaje.

---

## Statistiky komprese

Každý komprimovaný požadavek zahrnuje statistiky v protokolech serveru:

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

## Plán fází

| Fáze    | Režimy                                                                                                                                                                | Stav      |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáze 1  | Off, Lite                                                                                                                                                             | ✅ Vydáno |
| Fáze 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Vydáno |
| Fáze 3  | RTK, Stacked, kombinace komprese                                                                                                                                      | ✅ Vydáno |
| Fáze 4  | Styly výstupu, Ultra na úrovni SLM, evaluační nástroj                                                                                                                 | ✅ Vydáno |
| Fáze 4C | Adaptivní rozpočet kontextu („číselník“) — výpočetní engine + API (`contextBudget` v `PUT /api/settings/compression`) + ovládací prvky režimu/zásad na řídicím panelu | ✅ Vydáno |

---

## Poděkování

Pravidla komprese režimu Standard jsou inspirována projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** od **[Juliuse Brusseeho](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálním projektem „proč používat mnoho tokenů, když málo tokenů stačí“. Caveman uvádí o `~75%` méně výstupních tokenů, průměrnou úsporu výstupu v benchmarku `65%`, rozsah úspory výstupu `22-87%` a nástroj pro kompresi vstupu s úsporou `~46%`.

Režim RTK je inspirován projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysoce výkonným projektem pro kompresi výstupu příkazů pro terminál, sestavení, testování, git a filtrování výstupu nástrojů. RTK uvádí úsporu `60-90%`, přičemž ukázková relace v jeho souboru README vykazuje úsporu `~80%`.

---

## Pokročilé kompresní systémy

Kromě 7 režimů popsaných výše (zdroj také akceptuje režimy `codex-responses` a `omniglyph`, které tato příručka nepokrývá), níže uvedené části pokrývají funkce, které fungují uvnitř nebo vedle těchto režimů: Komprese výsledku nástroje a Progresivní stárnutí jsou kroky 1 a 2 agresivního motoru (režim Aggressive a krok `aggressive` složeného potrubí), režim Stackgraded Pipeline je režim Cachegraded-Aging `aggressive` a `ultra` až `standard` pro poskytovatele ukládání do mezipaměti, když je komprese zapnutá, a režim výstupu Caveman a styly výstupu jsou systémové pokyny, které jsou ve výchozím nastavení vypnuty a které tvarují výstup modelu namísto komprimace požadavku.

### Komprese s vědomím mezipaměti

Někteří poskytovatelé (jako Anthropic s rychlým ukládáním do mezipaměti) podporují** rychlé ukládání do mezipaměti** , což jim umožňuje ukládat části výzvy do mezipaměti, aby se snížily náklady a latence. Když je povoleno ukládání do mezipaměti, agresivní komprese skutečně může** ublížit** výkon, protože mění tokeny uložené v mezipaměti a znehodnocuje mezipaměť.

Modul `cachingAware.ts` to řeší pomocí** detekce kontextu mezipaměti** a** úprava strategie komprese** podle toho.

#### Jak to funguje

1. **Zjistit kontext ukládání do mezipaměti** — Prohledá v těle požadavku značky `cache_control`
2. **Identifikujte poskytovatele mezipaměti** — Zkontroluje, zda cílový poskytovatel podporuje ukládání do mezipaměti
3. **Upravte strategii** — Downgrade `aggressive`/`ultra` na `standard` pro poskytovatele ukládání do mezipaměti
4. **Přeskočit systémovou výzvu** Systémové výzvy — se obvykle ukládají do mezipaměti, takže je nekomprimujte

Pomocník strategie také vrací příznak `deterministicOnly`, ale tvůrce plánu spotřebovává pouze strategii — nic po proudu dnes příznak nečte.

#### Příklad kódu

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

#### Kdy použít

Komprese s vědomím mezipaměti je** vždy zapnuto** — není potřeba žádná konfigurace. Spustí se vždy, když je zapnutá komprese a cílový poskytovatel podporuje rychlé ukládání do mezipaměti (Anthropic, OpenAI atd.); explicitní značky `cache_control` nejsou vyžadovány — downgrade spouští sám poskytovatel mezipaměti a samotné značky nikdy ne (detekce značek dodává telemetrii mezipaměti, nikoli rozhodnutí o strategii).

OpenRouter se počítá jako poskytovatel mezipaměti pouze pro modely `anthropic/*` : požadavky na kód Claude si zachovávají své zarážky `cache_control` (nejvýše 4) a strážce chrání předponu, zatímco každá druhá rodina OpenRouter (`openai/`, `google/`, `qwen/`, …) zůstává zbavena a nechráněna.

### Progresivní stárnutí

Dlouhé konverzace hromadí mnoho zpráv, ale starší odbočky se stávají méně relevantními. Modul `progressiveAging.ts`** degraduje zprávy podle vzdálenosti otočení** (vzdálenost měřená od konce rozhovoru). S dodanými výchozími nastaveními (`verbatim: 2, light: 2, moderate: 3`):

- **Poslední 2 otáčky (vzdálenost ≤ 2)** : Zachováno doslovně
- **Vzdálenost 3** : komprese Caveman (odstranění výplně)
- **Vzdálenost 4 +** : Shrnutí zpráv asistenta; uživatelské zprávy redukované na jejich první řádek, omezený na 120 znaků; ostatní role nedotčené. Systémové výzvy, již staré zprávy a nejnovější uživatelské zprávy jsou vždy uchovávány doslovně bez ohledu na vzdálenost. Nic není vypuštěno přímo a pásmo `light` je nedosažitelné s dodanými výchozími nastaveními (`light` se rovná `verbatim`).

#### Příklad kódu

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

#### Kdy použít

Progresivní stárnutí je** vždy zapnuto** pro režim `aggressive` — je to krok 2 `compressAggressive()`. Ultra režim to nespustí. Je zvláště účinný pro:

- Dlouhotrvající relace kódování
- Vícedenní rozhovory
- Agentní pracovní postupy s mnoha voláními nástrojů

### Výstupní režim Caveman

Režim výstupu Caveman přidává** systémové pokyny** které se zeptají samotného modelu na stručný výstup — úroveň `lite` požaduje stručné odpovědi, které zachovávají celé věty, `full` jej žádá, aby „odpověděl stručně jako chytrý jeskynní muž“ a `ultra` požaduje telegrafický výstup; návod se pouze ptá, nemůže to zaručit. Požadavky je obdrží prostřednictvím `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` nejprve vyřeší výběr pomocí back-compat shim (`resolveOutputStyleSelection()` v `open-sse/services/compression/outputStyles/backCompat.ts`), který, když je `outputStyles` prázdný, mapuje povolený `cavemanOutputMode` na výstupní styl `terse-prose` na `cavemanOutputMode.intensity` (viz Back-compat níže); neprázdný výběr `outputStyles` se použije tak, jak je, a `cavemanOutputMode.enabled` a `intensity` pak nemají žádný účinek, zatímco jeho přepínač `autoClarity` stále platí. `outputMode.ts` obsahuje texty instrukcí (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), vynechání obsahu a pomocníka umístění, který používá injekce; jeho vlastní vstřikovač `applyCavemanOutputMode()` nemá žádné produkční volání.

#### Jak to funguje

Tento režim nekomprimuje vstup. Do systémové výzvy přidá blok instrukce (viz Jak funguje injekce níže) a jakýkoli režim komprese vstupu vybraný pro požadavek poté stále běží na těle, které nyní nese blok. Před klauzulí o sdílených hranicích, kterou končí každá úroveň, anglická úroveň `full` zní:

> "Odpovídejte stručně jako chytrý jeskynní muž. Pusťte články (a/an/the), výplň (just/really/basically/actually/simply), zdvořilosti, hedging. Fragmenty OK. Krátká synonyma (velká ne rozsáhlá, oprava neimplementovaná). Udržujte veškerou technickou podstatu, kód, chyby, URLs, identifikátory přesné."

To funguje zvláště dobře pro:

- Generování kódu (terser výstup = méně tokenů)
- Rychlé otázky a odpovědi (není třeba složitých vysvětlení)
- Dávkové zpracování (maximalizace propustnosti)

#### Kdy použít

Režim výstupu Caveman je** přihlásit se** . Se zapnutou kompresí (`enabled: true`, hlavní přepínač na stránce Nastavení komprese) ji zapněte pomocí `cavemanOutputMode.enabled`; `intensity` vybere `lite`, `full` nebo `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresní kombinace** Výstupní režim** toggle (`outputMode`, úroveň v `outputModeIntensity`) nastaví stejný přepínač pro požadavky, na které se combo vztahuje, a nástroj `omniroute_set_compression_engine` MCP jej zapíše prostřednictvím svého booleovského argumentu `outputMode`. Neprázdný výběr `outputStyles` má přednost před tímto přepínačem. Na palubní desce povolte** Laskavá próza** výstupní styl injektuje stejný blok (viz výstupní styly níže).

### Styly výstupu (katalog)

Výše uvedený výstupní režim Caveman je** starší cesta v jednom stylu** . Fáze 4 to zobecnila do katalogu sestavitelných výstupních stylů: `OUTPUT_STYLE_CATALOG` v `open-sse/services/compression/outputStyles/catalog.ts`. Každý styl je systémová instrukce, která žádá samotný model o levnější výstup; styly mohou být povoleny společně a jsou vkládány v katalogové objednávce.

| Styl                          | `id`            | Co to dělá                                                                                                                                                                                                                                       | Výukové jazyky                                |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Laskavá próza                 | `terse-prose`   | Drop filler/articles/hedging; dodržujte přesnou technickou podstatu. Stejný text jako u staršího výstupního režimu jeskynního muže (referenční, nepřepisovaný).                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Méně kódu                     | `less-code`     | žebřík YAGNI : nejmenší pracovní změna, žádné nevyžádané abstrakce.                                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| culík (líný starší vývojář)   | `ponytail`      | "Nejlepší kód je kód, který nebyl nikdy napsán": znovu použijte přepsání >, hlavní příčina příznaku >, nejkratší pracovní rozdíl.                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mám ADHD (nejprve akce)       | `i-have-adhd`   | Nejprve akce (command/path/snippet před prózou), číslované ohraničené kroky, ONE konkrétní další krok, žádné preamble/recap/closers. Převzato z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtr             | `antislop-ui`   | Každá vizuální technika musí projít účelovým testem (hierarchie, identita, čitelnost); žádná výchozí gradients/glass/glow, omezená paleta, žádné rozvržení šablon. Oba antislop styly přidávají hranici ne-dead-controls / no-fabricated-claims. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopie a lidský filtr | `antislop-copy` | Konkrétní kopie (bez em pomlčky, generické CTAs, buzzwords, zavírače chatbotů, vymyšlená fakta) plus pravidla lidí: kontrast WCAG AA, viditelné zaměření, dosah klávesnice, stavy empty/loading/error, přeformátování mobilních zařízení.        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| stručné CJK (文言)            | `terse-cjk`     | `full`/`ultra` odpověď v klasické čínštině (文言); `lite` žádá pouze stručné odpovědi bez funkčních slov, zdvořilostí nebo ozdob.                                                                                                                | zh (místně chráněné, viz níže)                |

Každý styl dodává tři úrovně intenzity — `lite`, `full`, `ultra` — a každá úroveň končí klauzulí sdílených hranic (`SHARED_BOUNDARIES` v `outputMode.ts`), která udržuje přesné bloky kódu, cesty k souborům, příkazy, chyby a URLs. Texty úrovně `terse-prose` a `terse-cjk` přidávají do tohoto seznamu identifikátory.

`terse-cjk` je na dvou místech nastaveno na `zh`. Stránka Nastavení komprese uvádí svůj řádek pouze v případě, že jazykem UI řídicího panelu je čínština (`zh-CN` nebo `zh-TW`), a `applyOutputStyles()` jej vloží pouze v případě, že jazyk vyřešeného požadavku (viz Výběr jazyka níže) je `zh`. Skrytím řádku se nevymaže uložený výběr `terse-cjk` : nastavení API přijme jakékoli ID stylu a uložením ostatních stylů na stránce se zachová. V době požadavku je kontrola jazyka `applyOutputStyles()` jedinou bránou národního prostředí.

#### Jak funguje injekce

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) řeší výběr podle katalogu (neznámá id a styly neshodující se s národním prostředím jsou vynechány, nikdy se nejedná o chybu; výběr, který nevyřeší žádný styl, ponechá tělo beze změny, přeskočeno jako `no_styles`), zřetězí vybrané instrukce v pořadí katalogu, připojí klauzuli hranic** jednou** (plus bezpečnostní klauzuli, `SAFETY_BOUNDARIES` nebo její překlad, když je vybráno `less-code` nebo `ponytail` ), a zahájí blok s jedinou značkou idempotence (`[OmniRoute Output Styles]`), takže opětovné použití je ne-op. Když má vyřešený jazyk (viz Výběr jazyka níže) překlad, místo angličtiny se vloží lokalizovaná instrukce.

V těle s neprázdným polem `messages` se kontrola idempotence spustí před vynecháním obsahu: když je značka `[OmniRoute Output Styles]` již v poli `system` nejvyšší úrovně (řetězec nebo pole bloků obsahu) nebo v systémové zprávě s obsahem řetězce, tělo zůstane nezměněno jako `already_applied` a neproběhne žádná kontrola klíčových slov. Jinak vynechání obsahu (`shouldBypassCavemanOutputMode()` v `open-sse/services/compression/outputMode.ts`) zkontroluje text posledních tří zpráv bez ohledu na jejich roli a přeskočí styly pro celé kolo, pokud text odpovídá klíčovým slovům zabezpečení, nevratné akce nebo vyjasnění nebo sekvenci citlivá na pořadí: `first`, `then`, `after that`, `before`, `rollback` nebo `backup` následované znaky `delete`, `drop`, `migrate` `deploy` nebo `release`. Bypass běží, zatímco** Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, ve výchozím nastavení zapnuto) je zapnuto; vypnutím přepínače přeskočí kontrola klíčových slov.

Když bypass propustí odbočku, `placeSystemInstruction()` (stejný soubor), který nikdy nevytvoří nový `messages[0]`, umístí blok do prvního z nich, který najde:

1. Úvodní systémová zpráva s obsahem řetězce: blok je připojen za jeho text.
2. Pole `system` nejvyšší úrovně: blok se připojí za text řetězce nebo se přidá jako nový textový blok do pole bloků obsahu.
3. První pozdější systémová zpráva s obsahem řetězce: blok je připojen za jeho text.
4. Nic z výše uvedeného: blok přejde do nové systémové zprávy na konci `messages`.

Na těle bez pole `messages` (nebo s prázdným polem) neprobíhá žádné obcházení obsahu a pole `system` nejvyšší úrovně není konzultováno. Blok je připojen za text pole `instructions` řetězce, pokud toto pole již neobsahuje značku `[OmniRoute Output Styles]`, v takovém případě je tělo ponecháno beze změny jako `already_applied`. Když tělo nemá žádné pole řetězce `instructions` ale nese `input` (řetězec nebo pole), blok se změní na `instructions` a nahradí jakoukoli neřetězcovou hodnotu, kterou pole obsahovalo. Tělo bez pole řetězce `instructions` ani řetězce nebo pole `input` zůstane nezměněno a přeskočeno jako `no_messages`.

#### Jak povolit

Na palubní desce:** Kontext komprese → Nastavení komprese** (`/dashboard/context/settings`), sekce Výstupní styly: jeden řádek na styl s přepínačem on/off a voličem úrovně. Styly se vkládají, když je samotná komprese zapnutá (hlavní přepínač stránky, `enabled`). The** Auto-Clarity Bypass** přepínač je zapnutý** Barbar** stránce (`/dashboard/context/caveman`), v jeho** Výstupní režim** karta. Programově konfigurace komprese zachová výběr jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: zatímco `outputStyles` je prázdné, původní nastavení `cavemanOutputMode.enabled` se mapuje na `terse-prose` na `cavemanOutputMode.intensity`. Blok pak začíná značkou `[OmniRoute Output Styles]`, kde starší injektor `applyCavemanOutputMode()` napsal `[OmniRoute Caveman Output Mode]`. Pod značkou se text shoduje se starší injekcí v en, pt-BR, es, de, fr, it, ru, id a vi; v ja a zh nese jednu mezeru navíc před klauzulí hranic. `terse-prose` se překládá do pt-BR, es, de, fr, it, ru, zh, ja, id a vi, takže požadavek, jehož vyřešený jazyk je `hu` získá anglický text, kde původní vstřikovač použil svůj maďarský.

Výběr jazyka ve stylu výstupu (`resolveOutputStyleLanguage()` v `outputStyles/apply.ts`): se zapnutým `languageConfig.enabled` `autoDetect` vzorkuje nejnovější uživatelskou zprávu v poli `messages` požadavku, které má text (obsah řetězce nebo `text` jeho částí obsahu) a spustí na něm detektor enginu Caveman (`detectCompressionLanguage()`). Detektor vrací `zh` pro text se znaky Han a bez kana; jinak vrátí podle toho, které z `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` a `id` má nejvíce shod nápověd, a `en` když se žádný neshoduje s textem — který nelze klasifikovat, získá angličtinu, nikdy `defaultLanguage` a `vi` není nikdy zjištěn, ačkoli styly dodávají text `vi`. Tělo Responses API udržuje své otáčky v `input`, které není vzorkováno, takže dostane `defaultLanguage`, pak English. Pokud žádná uživatelská zpráva v `messages` nemá text nebo když je `autoDetect` vypnutá, použije se `defaultLanguage` a poté angličtina. Při vypnutém `languageConfig.enabled` je jazykem angličtina —, pokud se na požadavek nevztahuje kompresní kombo (kombo přiřazené k směrovacímu kombu požadavku nebo výchozí kompresní kombo chatCore spadá zpět na vestavěný skládaný kanál): použití komba zapne `languageConfig.enabled` pro tento požadavek a nastaví `defaultLanguage` z jazykových balíčků komba (uložená hodnota z kombo balíčku, pokud je to první výchozí je `en`), zatímco uložené `autoDetect` (ve výchozím nastavení zapnuto) stále platí. Vstupní modul Caveman vybírá svůj jazyk sady pravidel odlišně — na textovou část a s vypnutou automatickou detekcí je hradlován na `enabledPacks`.

Jazyková matice stylu × je připojena pomocí `tests/unit/compression/output-styles-i18n-matrix.test.ts`: každý styl katalogu potřebuje záznam v `BASELINE_LANGUAGES` testu; styl, který není locale-gated, musí dodávat překlad pt-BR (locale-gated `terse-cjk` je z tohoto pravidla vyjmuto), pokud není uveden v `KNOWN_ENGLISH_ONLY`, který může obsahovat pouze styly bez jakýchkoli překladů — uvedený styl, který má jakýkoli překlad, v testu neprojde; a styl v testu neprojde, když ztratí jazyk, který obsahuje jeho položka `BASELINE_LANGUAGES`. Chcete-li přidat styl, viz [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprese výsledku nástroje

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts` komprimuje text výsledku nástroje pomocí** 5 strategií** . Zkouší je v tomto pořadí a první povolená strategie, jejíž kontrola odpovídá obsahu, rozhodne o výsledku:

1. **`fileContent`** : obsah 3 nebo více řádků, ve kterých alespoň jeden řádek, bez ohledu na odsazení na začátku, začíná na `import `, `export `, `function `, `class `, `const `, `let `, `var ` nebo `return ` (klíčové slovo plus mezera), nebo na `if`, `for` nebo `while` následovaný `(` nebo ` (` 5 řádky uprostřed a zachovává se jako poslední 5 řádků se znaménkem 2 a zachovává se.
2. **`grepSearch`** : obsah s alespoň jedním řádkem ve tvaru `<path>:<digits>:`, kde text před první dvojtečkou neobsahuje mezery, ponechá pouze tyto řádky, maximálně 30, za nimiž následuje počet případných dalších shod a seznam odpovídajících souborů; každý druhý řádek je vypuštěn. Jeden takový řádek stačí ke spuštění strategie, takže se počítá i řádek protokolu začínající časovým razítkem, jako je `12:30:45`.
3. **`shellOutput`** : výstup, který obsahuje sekvenci ANSI CSI (`ESC[` pak číslice nebo středníky a potom písmeno, jako v barevných kódech) nebo `$` následované mezerami kdekoli v textu, tyto sekvence ztratí (jiné únikové cesty, jako je `ESC[?25l` nebo sekvence názvu okna OSC, jsou zachovány) a ponechá si posledních 50 řádků se sbalenými po sobě jdoucími opakovanými řádky. Protože tato kontrola probíhá před `json` a `errorMessage`, JSON nebo chybový výstup, který takové `$` obsahuje, je nikdy nedosáhne, když je `shellOutput` zapnuté.
4. **`json`** : je shrnuta užitečná zátěž JSON větší než 2 000 znaků, která začíná `{` nebo `[` (po volitelných mezerách) a analyzuje: pole více než 7 položek si uchovává prvních 5 a poslední 2 položky a svůj celkový počet a objekt si uchovává svých prvních 20 klíčů, přičemž každý vnořený objekt nebo hodnota pole je nahrazena značkou `{…N keys}`, první zástupný znak `_remaining_<N>_keys` je jeho délka za polem (za pole) 20. Skalární hodnoty jsou zkopírovány celé, takže objekt s 20 nebo méně klíči bez vnořených hodnot je pouze přesazen — minifikovaný získá znaky a zůstane nezměněn.
5. **`errorMessage`** : výstup, který obsahuje kdekoli a v libovolné velikosti písmen, `error:`, `error ` (slovo následované mezerou, jako v `no error found`), `[error]`, `exception:`, `exception `, `[exception]` nebo `traceback` si ponechává svůj první řádek, dalších 10 řádků a poslední 3 se značkou `… [N frames elided] …` na místě řádků mezi nimi. Značka se objeví pouze tehdy, když za prvním řádkem následuje více než 13 řádků, takže chybový výstup 14 řádků nebo méně není zkrácen (při 12 nebo 13 řádcích jsou již zachovány poslední 3 opakující se řádky).

After a strategy matches, even one that saves nothing, the later strategies are not tried. When the matching strategy saves no estimated tokens (length ÷ 4, rounded up) — for example a code-like file of 25 lines or fewer, or a JSON array over 2,000 characters with 7 items or fewer — the aggressive engine keeps the original tool result: both callers (`compressAggressive()` and `compressAnthropicToolResultBlock()`) keep the original when `saved` is 0 or below, while `compressToolResult()` itself still returns that strategy's output. The tool-result step is not the last word: the engine's fallback summarizer can still shorten a `tool` or `function` message longer than 8,192 characters (`maxTokensPerMessage`, 2,048, times 4).

#### Kdy použít

Komprese výsledku nástroje je krokem 1 agresivního motoru (`compressAggressive()` v `open-sse/services/compression/aggressive.ts`), takže běží v agresivním režimu a v kroku `aggressive` složeného potrubí. Komprimuje zprávy `tool` a `function` ve tvaru OpenAI a text uvnitř bloků Anthropic `tool_result`. Každá strategie má svůj vlastní přepínač pod `aggressive.toolStrategies`, všechny jsou ve výchozím nastavení zapnuté. Na řídicím panelu jsou přepínače na stránce Caveman** Moderní** zobrazení při zapnuté kompresi a výchozí režim je Agresivní.

### Skládaný potrubí

Spustí se skládaný režim** více motorů za sebou** — obvykle nejprve RTK (60-90% úspora na výstupu nástroje), poté Caveman na zbývajícím textu (~ 46% úspora vstupu). Složené, to je** 78–95 % způsobilý rozsah** (viz výše matematická matematika pro upstream úspory): `1 - (1 - 0.60..0.90) × (1 - 0.46)` průměry ≈ 89 %.

#### Jak to funguje

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kdy použít

Skládaný režim použijte pro:

- Pracovní postupy náročné na nástroje (agentní kódování, výzkum)
- Nákladově citlivé dávkové zpracování
- Když potřebujete maximální úspory tokenů

Skládaná potrubí se konfigurují prostřednictvím globálního nastavení komprese `stackedPipeline` nebo pomocí pojmenovaného komba komprese přiřazeného k kombu směrování (viz Přepsání jednotlivých kombo výše) — nikoli prostřednictvím automatického komba `modePack` (toto pole pouze převáží výběr modelu autokomba a `stacked` není platný název balíčku).

---

## Přepsání komprese pro jednotlivé kombinace

Globální režim komprese můžete přepsat **pro každou kombinaci zvlášť** a doladit tak chování
pro různé případy použití:

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

To je užitečné pro:

- **Kombinace pro programování**: Pro dlouhé relace použijte režim `aggressive`
- **Kombinace pro rychlé otázky a odpovědi**: Pro rychlé odpovědi použijte režim `lite`
- **Kombinace intenzivně využívající nástroje**: Pro maximální úsporu použijte režim `stacked`
- **Produkční kombinace**: U poskytovatelů s ukládáním do mezipaměti ponechte přepsání vypnuté — trvale aktivní
  úprava zohledňující mezipaměť automaticky sníží režim `aggressive`/`ultra` na `standard`
  (režim `cache-aware` nelze vybrat)

---

## Viz také

- [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Proměnné prostředí pro kompresi
- [Průvodce architekturou](../architecture/ARCHITECTURE.md) — Vnitřní fungování kompresního kanálu
- [Uživatelská příručka](../guides/USER_GUIDE.md) — Začínáme s kompresí
- [Komprese RTK](./RTK_COMPRESSION.md) — Filtry RTK, model důvěryhodnosti, ověřovací brána a obnovení nezpracovaného výstupu
- [Kompresní moduly](./COMPRESSION_ENGINES.md) — Caveman, RTK, vrstvení, API, MCP a řídicí panel
- [Formát pravidel komprese](./COMPRESSION_RULES_FORMAT.md) — Formát balíčku pravidel JSON
- [Jazykové balíčky komprese](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidla Caveman specifická pro jednotlivé jazyky
