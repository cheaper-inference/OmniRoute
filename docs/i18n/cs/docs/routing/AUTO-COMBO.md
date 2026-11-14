# OmniRoute Auto-Combo Engine (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pro uživatele**: Hledáte rychlý úvod? Jednoduchá vysvětlení a příklady najdete v [uživatelské příručce Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md).

> Samořídicí řetězce modelů s adaptivním hodnocením + automatickým směrováním bez konfigurace

## Automatické směrování bez konfigurace (prefix `auto/`)

> **NOVINKA:** Není nutné vytvářet žádnou kombinaci. Použijte prefix `auto/` přímo v libovolném klientovi.

### Rychlé příklady

| ID modelu      | Varianta | Chování                                                                          |
| -------------- | -------- | -------------------------------------------------------------------------------- |
| `auto`         | výchozí  | Všichni připojení poskytovatelé, strategie LKGP, vyvážené váhy                   |
| `auto/coding`  | coding   | Váhy upřednostňující kvalitu, vhodné pro generování kódu                         |
| `auto/fast`    | fast     | Vážený výběr s nízkou latencí                                                    |
| `auto/cheap`   | cheap    | Směrování optimalizované podle nákladů (nejnižší náklady jako první)             |
| `auto/offline` | offline  | Upřednostňuje poskytovatele s nejvyšší dostupnou kvótou                          |
| `auto/smart`   | smart    | Kvalita na prvním místě + vyšší míra průzkumu (10 %) pro lepší objevování modelů |
| `auto/lkgp`    | lkgp     | Explicitní LKGP (stejné jako výchozí `auto`)                                     |
| `auto/chaos`   | chaos    | Paralelní rozeslání, jeden model na poskytovatele (nikoli vkládání poruch)       |

### Složení kategorie × úroveň (`auto/<category>:<tier>`)

Přípony ve stylu OpenRouter oddělují **jaký druh trasy** (kategorie) od toho, **jak ji optimalizovat** (úroveň), takže je můžete libovolně kombinovat (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorie** (filtrují fond kandidátů podle schopností): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zachovávají modely podporující obrazový vstup; `reasoning` zachovává modely pro uvažování/přemýšlení.
- **Úrovně** (volí váhy hodnocení / filtr fondu): `fast` (rychlé doručení) · `cheap` (alias `floor`, úspora nákladů) · `reliable` (stav jističe + stabilita latence) · `free` / `pro` (filtrují fond podle úrovně modelu prostřednictvím `classifyTier` — bezplatná vs. prémiová úroveň).

| Příklad                | Výsledek                                                                        |
| ---------------------- | ------------------------------------------------------------------------------- |
| `auto/coding:fast`     | fond pro programování, váhy s nízkou latencí                                    |
| `auto/coding:cheap`    | fond pro programování, optimalizovaný podle nákladů (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | pouze modely pro uvažování/přemýšlení, prémiová úroveň                          |
| `auto/vision`          | modely podporující obrazový vstup (bez úrovně → vyvážené váhy)                  |
| `auto/multimodal:free` | modely podporující multimodalitu, pouze bezplatná úroveň                        |

Libovolná platná hodnota `auto/<category>[:<tier>]` se vyhodnocuje na vyžádání; vybraná podmnožina je zveřejněna v `/v1/models` a na řídicím panelu (`AUTO_SUFFIX_VARIANTS` v `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrování je **fail-open** — pokud omezení neodpovídá žádnému připojenému modelu, použije se celý fond, aby se směrování nikdy nepřerušilo. Základní hodnoticí mechanismus (`combo.ts`) zůstává beze změny; filtr kategorie/úrovně se použije v `buildAutoCandidates`.

> **Živá inteligence modelů:** vhodnost automatického směrování vychází z živých žebříčků **Arena ELO** a údajů o úrovních z **models.dev**, pokud je zapnutý příznak `ARENA_ELO_SYNC_ENABLED` (jinak se použije statická mapa vhodnosti).

**Jak používat:**

```bash
# Libovolné IDE nebo nástroj CLI podporující formát OpenAI
Základní URL: http://localhost:20128/v1
Klíč API:    <váš-klíč-koncového-bodu>

# V kódu/konfiguraci nastavte model na:
model: "auto"                 # vyvážené výchozí nastavení
model: "auto/coding"          # nejlepší pro programátorské úlohy
model: "auto/fast"            # nejrychlejší dostupná varianta
model: "auto/cheap"           # nejlevnější za token
```

**Co se stane:**

1. OmniRoute detekuje prefix `auto/` v `src/sse/handlers/chat.ts`
2. Dotáže se databáze na všechna **aktivní připojení poskytovatelů**
3. Vyfiltruje ta, která mají platné přihlašovací údaje (klíč API nebo token OAuth)
4. Určí model pro každé připojení (`connection.defaultModel` nebo první model poskytovatele)
5. Sestaví **virtuální kombinaci** v paměti (neukládá se do DB)
6. Směruje pomocí profilu vah vybrané varianty + strategie LKGP

**Klíčové vlastnosti:**

- ✅ **Vždy aktivní:** Není potřeba žádný přepínač, vytváření kombinace ani konfigurace
- ✅ **Dynamické:** Automaticky odráží aktuálně připojené poskytovatele
- ✅ **Stálost relace:** LKGP zajišťuje upřednostnění posledního úspěšného poskytovatele
- ✅ **Podpora více účtů:** Každé připojení poskytovatele se stane samostatným kandidátem
- ✅ **Žádné zápisy do DB:** Virtuální kombinace existuje pouze po dobu požadavku, bez režie spojené s perzistencí

### Řízení kandidátů pro jednotlivé klíče (#7819, úroveň 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = přípona za `auto/`, nebo
doslovná hodnota `auto` pro základní kanál) je koncový bod **jen pro čtení**, který vypisuje
aktuální fond kandidátů kanálu `auto/*` doplněný o živé údaje o dosažitelnosti a opětovně
využívá existující čtení odolnosti (nikdy ne nezpracovanou hodnotu `state` jističe):

- jistič poskytovatele — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- doba zklidnění připojení — `rateLimitedUntil` / `testStatus` na odpovídajícím řádku
  `provider_connections`
- blokování modelu — `isModelLocked(provider, connectionId, model)`

Každý kandidát rovněž obsahuje příznak `excluded` pro tento klíč API. Vyloučení se ukládají
pro každý klíč API zvlášť (tabulka `auto_candidate_overrides`, migrace `128`) — OmniRoute je
jednonájemcový a nemá tabulku `users`, takže `apiKeyId` představuje nejbližší skutečnou identitu
jednotlivého volajícího — a vynucují se v kritickém bodě fondu kandidátů v
`open-sse/services/autoCombo/virtualFactory.ts` prostřednictvím čisté, jednotkově testované
funkce `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtr je **fail-open**: nenastavené apiKeyId/kanál i selhání vyhledávání v DB ponechají
fond nefiltrovaný, takže operátor bez nakonfigurovaných přepsání uvidí směrování
bajtově identické se stavem před zavedením této funkce.

**Odloženo na navazující issue:** váhy jednotlivých kandidátů + explicitní pořadí (úroveň 3
— napojuje se na stávající cesty strategií založených na váhách/prioritách) a připnutí konkrétní
strategie `combo.ts` pro každý kanál `auto/*` (úroveň 4). Otevřenou otázku, zda mají přepsání
vzhledem k modelu s jedním tenantem zůstat pro jednotlivé API klíče, nebo se stát globálními,
naleznete v plánu #7819.

**Na pozadí:**

```txt
Požadavek: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detekuje prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool z aktivních připojení
   ↓
handleComboChat (stejný mechanismus jako u uložených kombinací)
   ↓
Automatické vyhodnocení vybere pro každý požadavek nejlepšího poskytovatele/model
```

**Soubory implementace:**

| Soubor                                                    | Účel                                                    |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefixu (`parseAutoPrefix`)                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytváří virtuální objekty `AutoComboConfig`             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací rozhraní pro mockování registru poskytovatelů |
| `src/sse/handlers/chat.ts`                                | Integrace: zkratka pro automatický prefix               |
| `src/shared/constants/providers.ts`                       | Systémová položka `SYSTEM_PROVIDERS.auto`               |

## Předvolby účtu pro uložená automatická komba

Inteligentní automatický editor nabízí volitelnou možnost** Předvolby účtu** sekce. Každé připojení může být Preferované, Normální (výchozí), Rezervované nebo Vyloučené. Více připojení může sdílet vrstvu. Automaticky vybírá v rámci první vhodné úrovně a zachovává zde své chování scoring/router ; neúspěšné pokusy propadají na zbývající konkrétní účty, upřednostňované před normálními před rezervou. Toto kombo nikdy nepoužívá vyloučená připojení.

Nastavení je uloženo jako `config.accountPreferences`, klíčované spojením ID:

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

Vynechaná nebo prázdná mapa zachová stávající směrování. Předvolby nepovolují zakázaná připojení, neudělují přístup ke klíči API, neobnovují kandidáty s blokováním kvót ani neobcházejí kontroly rozpočtu. Každý pokus je omezen na jeho konkrétní připojení, takže záložní účet nemůže přeskakovat úrovně za kombinovaným routerem. Stávající afinita relace si může ponechat způsobilý účet; vyloučení účtu vázaného na nativní tah zastaví, že se otočí místo tichého střídání účtů.

Nakonfigurované předvolby používají automatickou cestu s ohledem na účet: neodesílají se neomezená kontextová mezipaměť, inteligentní potrubí, chaos a stínové zkratky. Spekulativní zajištění je pro tyto požadavky zakázáno, takže rezervní účty nemohou závodit s těmi preferovanými. Jiné kombinované strategie toto nastavení neinterpretují. Změnou kombinace z možnosti Auto zůstanou uložené předvolby pro pozdější přepnutí zpět.

## Názvy kombinací odpovídající skutečnému ID modelu

Kombinace, jejíž `name` je shodný se samotným ID modelu (např. kombinace s názvem
`gpt-5.5`), je **záměrný a podporovaný vzor**, nikoli chyba: jde o
mechanismus záložního poskytovatele pro jednotlivá ID modelů popsaný v
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Protože se
rozlišení kombinace kontroluje před rozlišením samotného ID modelu
(`getComboForModel()` v `src/sse/services/model.ts`), požadavek na samotné
ID `gpt-5.5` je směrován přes cíle kombinace (např.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) namísto přímo k
jedinému poskytovateli — tím se znovu využívá priorita kombinace před přepisem vytvořená pro
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), která je
regresně testována pomocí `tests/unit/responses-combo-resolution-3227.test.ts` a
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Vytvoření nebo přejmenování kombinace na název, který zastiňuje skutečné ID modelu,
**není nikdy odmítnuto** — tím by se narušil tento zdokumentovaný pracovní postup. Namísto
toho (#8530) připojí `POST /api/combos` a `PUT /api/combos/[id]` k odpovědi
neblokující pole `warning`, pokud se (nový) název shoduje se skutečným
ID modelu:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Při spuštění funkce `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) také zapíše jednořádkové varování `[STARTUP]`
se seznamem všech existujících kombinací, které zastiňují ID modelu, takže provozovatelé, kteří
na tuto situaci narazí omylem (namísto záměrně podle #6940), dostanou upozornění.
Pomocná funkce pro detekci se nachází v `src/lib/combos/modelNameCollision.ts`.

## Volání vlastní kombinace z klienta

Uložené kombinace (Nastavení → Kombinace) se použijí pouze tehdy, když klient odešle **přesný název** kombinace v poli `model` — nepoužívá se žádná přibližná ani částečná shoda názvu kombinace a není potřeba prefix `auto/`. Pořadí rozlišení (`getComboForModel()` v `src/sse/services/model.ts`):

1. přesná shoda názvu kombinace (`model: "my-combo"`),
2. prefix `combo/<name>` (`model: "combo/my-combo"`),
3. globální mapování model→kombinace (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvě časté nástrahy:

- **`auto` vaše kombinace nepoužívá.** `auto`/`auto/*` vytváří vlastní fond kandidátů bez nutnosti konfigurace a uložené kombinace zohlední pouze v případě, že je některá kombinace doslova pojmenována `auto` (nedoporučuje se). Chcete-li směrovat přes kombinaci, odešlete její přesný název — nikoli `auto`.
- **`openrouter/auto` je skutečný placený produkt OpenRouter** („Auto Best Available“), nikoli alias OmniRoute. Jde o jedinou statickou položku modelu v registru OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) a je účtována samostatně. Chcete-li ji vyloučit z fondů `auto`, použijte Nastavení → Směrování → Skrýt placené modely.

Původní nejasnosti, které tato dokumentace objasňuje, naleznete v [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) a [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Jak to funguje (trvalá automatická komba)

Auto-Combo Engine dynamicky vybírá nejlepší provider/model pro každý požadavek pomocí a** 16faktorová skórovací funkce** (definováno v `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Výchozí váhy součet `1.0`; vlastní váhy jsou renormalizovány pomocí `normalizeScoringWeights()`. Dva ze šestnácti — `cacheAffinity` a `resetWindowAffinity` — mají výchozí váhu `0`; `reliability` přenáší `0` v `DEFAULT_WEIGHTS`, ale `0.03` v generických balíčcích a `0.04` v `reliability-first` a `quality` přenáší `0.02` v balíčcích (`0.03` v `quality-first`): jsou stále vypočítávány pro každého kandidáta a `cacheAffinity` omezuje deduplikaci prompt-cache mimo skóre, takže nulové výchozí faktory prostě ve výchozím nastavení nehlasují, zatímco balíčky.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Zdroj: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerujte přes `npm run docs:render-diagrams`). Název souboru je historický; zdroj a vykreslený diagram ukazují všech 16 faktorů deklarovaných v `DEFAULT_WEIGHTS`.

| Faktor                | Výchozí hmotnost | Popis                                                                                                                                                                                                                    |
| :-------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | Zbývající rezerva kvóty / limitu sazby [0..1]                                                                                                                                                                            |
| `health`              | 0.1605           | Zdravotní skóre z jističe (CLOSED= 1,0, HALF_OPEN= 0,5, OPEN= 0,0)                                                                                                                                                       |
| `costInv`             | 0.1429           | Inverzní** smíšené** náklady (60 % vstup + 40 % výstupní cena tokenu, normalizováno) — levnější = vyšší skóre                                                                                                            |
| `latencyInv`          | 0.1143           | Inverzní latence p95 se normalizovala tak, aby shromáždila — rychlejší = vyšší skóre                                                                                                                                     |
| `taskFit`             | 0.0762           | Vhodnost typu úkolu (kódování, kontrola, plánování, analýza, ladění, dokumenty)                                                                                                                                          |
| `stability`           | 0.0476           | Stabilita založená na rozptylu od standardní odchylky latence — kandidát, jehož kolísání doby odezvy má nižší skóre                                                                                                      |
| `tierPriority`        | 0.0476           | Priorita na úrovni účtu — Ultra = 1.0, Pro = 0.67, standardní = 0.33, zdarma = 0.0                                                                                                                                       |
| `tierAffinity`        | 0.0476           | Afinita mezi úrovní kandidáta a úrovní doporučenou manifestem                                                                                                                                                            |
| `specificityMatch`    | 0.0476           | Shoda mezi specifičností požadavku (zjevná nápověda) a úrovní modelu                                                                                                                                                     |
| `contextAffinity`     | 0.0476           | Afinita mezi potřebou kontextového okna požadavku a kontextovým oknem modelu                                                                                                                                             |
| `sessionAvailability` | 0.0476           | dostupnost relace OAuth kandidáta připojení pro tuto relaci (`getOAuthSessionAvailability()`; skóre připojení bez OAuth 1,0)                                                                                             |
| `connectionDensity`   | 0.0476           | Rozloží zatížení mezi připojení stejného poskytovatele (anti-koncentrace)                                                                                                                                                |
| `cacheAffinity`       | 0.00             | Rendezvous-hash afinita k připojení, které pravděpodobně již obsahuje předponu prompt-cache tohoto požadavku (`open-sse/services/combo/promptCacheAffinity.ts`); ve výchozím nastavení zakázáno (#8008)                  |
| `resetWindowAffinity` | 0.00             | Předpojatost vůči připojením, jejichž okno pro obnovení kvóty je příznivé (ve výchozím nastavení zakázáno)                                                                                                               |
| `quality`             | 0.03             | Signál výstupní kvality řízený zpětnou vazbou ze sledovače kvality události směrování; kandidáti bez pozorování obdrží neutrálních 0,5                                                                                   |
| `reliability`         | 0.00             | Pozorovaný podíl úspěšnosti, `1 - failureRate`, z 24h historie používání za minimální hranicí deseti vzorků (jinak metriky v reálném čase); kandidáti bez připomínek jsou čteni jako 1.0. Ve výchozím nastavení zakázáno |

In-memory `quality` tracker (`open-sse/services/routing/quality.ts`) je po studeném restartu prázdný, takže každý kandidát získá neutrální `0.5` dokud nepřistanou první pozorování.

> **Nečitelná kvóta (#15347).** Když má poskytovatel načítání kvót, ale nevrací nic čitelného (neúspěšné načítání, chybějící pověření, použití pouze zprávou nebo chybně vytvořený snímek bez analyzovatelného `windows` a žádného konečného `percentUsed`, včetně `percentUsed: null`), kandidát získá `0` na ose `quota` a jeho konečné skóre se vynásobí vzorem `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` jako soft- `autoStrategy.ts`. pokuta. Neúspěšné čtení o použití je důkazem o telemetrii, nikoli o poskytovateli, takže se řadí přísně pod jakékoli skutečné čtení, včetně potvrzeného 100%-used, ale nikdy není tvrdě blokováno nebo vyřazeno. Poskytovatel bez omezení hlásí `unlimited: true` a hodnotí jako plnou kvótu; poskytovatel bez registrovaného nástroje pro získávání kvót nemá vůbec žádný zdroj telemetrie a zachovává výchozí hodnotu `100`.

**Součet:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` jak je deklarováno v `DEFAULT_WEIGHTS`; uživatelem konfigurované váhy jsou před vyhodnocením renormalizovány do rozdělení podle `normalizeScoringWeights()`.

## Balíčky režimů

6 předdefinovaných profilů vah v `open-sse/services/autoCombo/modePacks.ts`. Každý balíček zcela nahrazuje výchozí váhy, aby upřednostnil výběr podle jednoho cíle. Součet hodnot každého balíčku je již `1.0` (při zobrazení na čtyři desetinná místa `0.9999`), takže `normalizeScoringWeights()` nemá při aktivním balíčku co smysluplně opravovat — níže uvedené hodnoty jsou po zaokrouhlení hodnotami, které vyhodnocovací mechanismus používá.

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

- **Balíčky obsahují `quality` a `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) a zcela nahrazují mapu vah (`weights = pack`, nejde o sloučení). `DEFAULT_WEIGHTS` obsahuje `quality 0.03 / reliability 0`; výběr `balanced`/`default` zachová tyto výchozí hodnoty, zatímco výběr balíčku použije výše uvedené hodnoty daného balíčku. V počátečním fondu (zatím bez pozorování, takže `quality 0.5` a `reliability 1`) přidávají tyto dva faktory `+0.04` u obecného balíčku (`0.03 + 0.01`), `+0.045` u `quality-first` a `+0.05` u `reliability-first`.
- `tierAffinity`, `specificityMatch` a `resetWindowAffinity` jsou v každém balíčku explicitně nastaveny na `0`.
- Stručný přehled zaměření jednotlivých balíčků:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdravá připojení s nízkou latencí)
  - **cost-saver** → costInv 0.3324 (vyhrávají nejlevnější tokeny)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, nejvyšší hodnota ze všech balíčků (nejlepší a konzistentní model pro danou úlohu)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximální rezerva bez ohledu na rychlost/náklady)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, nejvyšší hodnota ze všech balíčků (nejméně překvapení)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (balíček vah, který `auto/chaos` přiřazuje členům svého panelu; paralelní rozvětvení tyto váhy nečte a nejde o profil vkládání chyb, viz [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Ovládací prvky pro jednotlivé požadavky (hlavičky) — #6023 / #6024 / #6025 / #3470

Kombinaci `auto` lze **pro každý požadavek samostatně** řídit pomocí tří hlaviček, aniž by se změnila
uložená konfigurace kombinace. Tyto hlavičky se vztahují pouze na strategii `auto` a pouze na požadavek,
který je obsahuje; pokud hlavička chybí, použijí se uložené hodnoty `modePack`/`budgetCap`/`budgetFallback`
dané kombinace.

| Hlavička                      | Přijímá                                                                                                                                                                                               | Účinek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias předvolby (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) nebo nezpracovaný název balíčku (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Přepíše váhy hodnocení pro tento požadavek. `balanced`/`default` vynutí výchozí váhy (bez balíčku). Neznámé hodnoty jsou ignorovány (konfigurace zůstane zachována).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Budget`          | kladné číslo (maximální částka v USD na požadavek)                                                                                                                                                    | Pevný cenový limit: kandidáti, jejichž odhadované náklady jej překračují, jsou před výběrem odfiltrováni. Chování v případě, že jej překročí **všichni** kandidáti, určuje níže uvedená hlavička `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (výchozí, aliasy: `cheapest-viable`, `soft`) nebo `strict` (aliasy: `block`, `hard`)                                                                                                       | `cheapest`: použije jako náhradní možnost globálně nejlevnějšího kandidáta, i když stále překračuje limit (původní chování). `strict`: odmítne provést výběr — požadavek rychle selže s `HTTP 402`, místo aby bez upozornění překročil rozpočet. Neznámé hodnoty jsou ignorovány.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Effort`          | `auto` (ostatní hodnoty jsou rezervovány)                                                                                                                                                             | Adaptivní rozpočet na uvažování: pokud požadavek neobsahuje **žádné** pole pro uvažování v jakékoli podobě (`reasoning_effort`, `reasoning`, `thinking`), brána převede hodnotu `auto` na `low`/`medium`/`high` na základě deterministických signálů ze struktury požadavku (délka poslední zprávy uživatele, velikost kontextu až po poslední zprávu uživatele, předchozí výsledky nástrojů, hloubka smyčky nástrojů). Signály jsou omezeny na aktuální tah — vše za poslední zprávou uživatele je ignorováno — takže každý požadavek ve smyčce nástrojů se vyhodnotí na stejnou úroveň (bezstavové připnutí pro každý tah, žádný stav relace, žádné navyšování uprostřed smyčky, které by narušilo prefixy mezipaměti promptů u upstreamu). Explicitní pole klienta pro uvažování má vždy přednost. Platí pouze pro požadavky, jejichž upstreamové směrování se vyhodnotí na formát OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je pole ve formátu OpenAI, takže tato hlavička nemá žádný účinek na požadavek směrovaný na Claude nebo Gemini (viz `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Vynutit nejrychlejší profil, omezit tento požadavek na $0.05 a místo překročení rozpočtu jej natvrdo zablokovat
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Vyhodnocení je čistá funkce (`open-sse/services/autoCombo/requestControls.ts`); výsledné
hodnoty jsou předány do stávajících vstupů enginu `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Uložená hodnota `config.budgetFallback` dané kombinace ("strict" |
"cheapest") nastavuje trvalou zásadu; hlavička ji přepíše pro jediný požadavek.

## Všechny směrovací strategie

OmniRoute's combo engine podporuje** 22 směrovacích strategií** (deklarováno v `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Samotný motor Auto Combo je vystaven v rámci strategie `auto` ; ostatní jsou k dispozici pro trvalá komba.

| Strategie           | Popis                                                                                                                                                                                                                            |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Seřazený seznam prvního cíle s explicitní prioritou                                                                                                                                                                              |
| `weighted`          | Váženo náhodně podle váhy cíle                                                                                                                                                                                                   |
| `round-robin`       | Procházejte cíle v pořadí (dávkové; viz níže)                                                                                                                                                                                    |
| `context-relay`     | Předání kontextu napříč cíli (dlouhé konverzace)                                                                                                                                                                                 |
| `fill-first`        | Před přechodem na další vyplňte kvótu každého cíle                                                                                                                                                                               |
| `p2c`               | Power-of-2-choices náhodné vyrovnávání zátěže                                                                                                                                                                                    |
| `random`            | Jednotný náhodný výběr                                                                                                                                                                                                           |
| `least-used`        | Vyberte cíl s nejnižší proudovou zátěží                                                                                                                                                                                          |
| `cost-optimized`    | Minimalizujte $ za požadavek podle katalogové ceny                                                                                                                                                                               |
| `reset-aware` ⭐    | Upřednostněte podle času resetování kvóty — krátká okna resetování jsou zařazena výše                                                                                                                                            |
| `reset-window`      | Preferovat cíle, jejichž okno kvóty se resetuje co nejdříve                                                                                                                                                                      |
| `expiry-first`      | Utraťte účet, jehož kvóta by jinak vypršela, nevyužitá jako první — nejvyšší zbytek s nejbližším termínem resetování je první                                                                                                    |
| `headroom`          | Vyberte cíl s největší zbývající rezervou kvóty                                                                                                                                                                                  |
| `quota-weighted`    | Přeskočte vyčerpané účty a poté vyberte ze zbývajících v poměru ke zbývající kvótě vydělené zatížením během letu; existující konverzace zůstanou připnuté                                                                        |
| `strict-random`     | Náhodné bez deduplikace opakování                                                                                                                                                                                                |
| `auto`              | Použijte automatické kombo hodnocení (16faktorové) —** doporučeno**                                                                                                                                                              |
| `lkgp`              | Poslední známá dobrá cesta (připne se k poslednímu úspěšnému poskytovateli, pak se vrátí k pravidlům)                                                                                                                            |
| `context-optimized` | Vyberte cíl, který nejlépe odpovídá aktuální velikosti kontextu                                                                                                                                                                  |
| `cache-optimized`   | Změňte pořadí cílů podle afinity rychlé mezipaměti — nejprve se vyzkouší připojení, které pravděpodobně již obsahuje předponu tohoto požadavku uloženou v mezipaměti (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)   |
| `fusion` 🧬         | Rozprostřete paralelně panel modelů a poté pomocí porotce syntetizujte jednu odpověď (viz níže)                                                                                                                                  |
| `pipeline`          | Spouštět cíle postupně, seřadit výstup každého kroku do vstupu dalšího kroku; je vrácena pouze konečná odpověď (#6396)                                                                                                           |
| `jev`               | seznam uživatelských preferencí; TypeSafe Jev připouští, které položky běží pro tento požadavek. První vítěz, ostatní přiznané cíle udržují uživatelské pořadí. Spadá do uživatelské objednávky, když je Jev nedostupný (#15276) |

⭐ = Novinka ve verzi 3.8.0 · 🧬 = Novinka ve verzi 3.8.36

### sémantika `weighted`

`weighted` je a** poměrné náhodné losování na žádost** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nikoli ekvalizér:

- Každá žádost se losuje** jeden** krok s pravděpodobností `weight / totalWeight`; zbývající kroky jsou seřazeny podle sestupné váhy jako záložní řetězec pro daný požadavek.
- Krok, jehož váha je `0` (nebo chybí), je** nikdy nekreslené** zatímco jakýkoli jiný krok má váhu > 0 — může sloužit pouze jako nouzový krok poté, co nakreslený krok selže. Jen když** vše** váhy jsou 0, výběr bude jednotný.
- Kroky, jejichž cíle jsou všechny nedostupné — jistič poskytovatele `OPEN`, ochlazení připojení, uzamčení modelu — jsou odstraněny z losování dříve, než k tomu dojde (`open-sse/services/combo/targetResolution.ts`), takže každý požadavek může dočasně vyhrát jediný zdravý krok.
- `stickyWeightedLimit` (kombinovaná konfigurace, výchozí `1` = vypnuto) připíná nakreslený krok pro tolik po sobě jdoucích úspěchů, než se znovu vykreslí.

Pro striktní rotaci použijte `round-robin`; stejné váhy na `weighted` poskytují statistické —, nikoli striktní rovnováhu —.

### Agentický režim potrubí

Kombinace `pipeline` s alespoň dvěma modely se může rozhodnout pro směrování planner/executor pomocí `config.agenticOrchestration.enabled`. První cíl vlastní plánování a konečné odpovědi; druhý cíl vysílá klientská nativní volání nástrojů. OmniRoute detekuje pokračování ve výsledcích nástroje z protokolu požadavku, zeptá se plánovače, zda je potřeba další kolo nástroje, a dynamicky učiní z vykonavatele nebo plánovače konečným krokem pro klienta.

Volitelné `config.agenticOrchestration.contextCompaction` aplikuje samostatný rozpočet užitečného zatížení před každým odesláním plánovače nebo exekutora. Aktivujte to explicitně:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Jedná se o serializované rozpočty znaků JSON vybrané operátorem, nikoli kontextová okna tokenů nebo garantované upstream limity. Přesný model IDs přepíše výchozí. Nad prahovou hodnotou zhutnění odstraní identické definice nástrojů, ořízne evidenci příliš velkých nástrojů pomocí výtahu a odstraní staré kompletní skupiny historie směrem k cílovému poměru. Uchovává instrukce system/developer, nejnovější požadavek uživatele, poslední kolo nástroje včetně paralelního calls/results a hlavní směrovací instrukce Gemini. Nejvyšší úrovně pokynů a nastavení nástrojů jsou zachovány. Značka vynechání zaznamenává odstraněnou historii; toto je deterministické ořezávání, nikoli sémantické shrnutí. Pokud připnutý kontext stále překračuje rozpočet, požadavek před kontaktováním modelu vrátí 413. Pokud je komprimace vypnuta nebo je pod prahovou hodnotou, požadavek prochází beze změny.

U pokračování s výsledkem nástroje OmniRoute také zastaví provádění, když dvě po sobě jdoucí dokončená kola opakují stejná volání nástroje s nezměněnými výsledky, nebo když každý explicitně označený výsledek ve dvou po sobě jdoucích kolech selhal. Změněné výsledky umožňují opakované volání (například dotazování). Strážce se resetuje na nový požadavek uživatele, seskupuje paralelní hovory do jednoho kola a podporuje Anthropic, dokončení chatu, odpovědi a historii Gemini. Plánovač obdrží důvod a vlastní konečnou odpověď, i když požaduje další kolo nástroje.

Další modely po druhém cíli jsou objednány zálohy exekutorů. Neúspěšná odezva HTTP nebo výjimka přenosu postoupí k dalšímu spouštěcímu programu, který nese stejné rozhodnutí plánovače a nativní nástroje, ale vlastní krok a vyřešené připojení daného spouštěče. První úspěšná odpověď je vrácena beze změny, včetně streamování SSE ; selhání po úspěšném spuštění streamu zde nelze opakovat. Pokud selžou všechny exekutory, vrátí se poslední selhání. Klient přeruší odeslání.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Exekutor může vydávat více nezávislých volání v jedné odpovědi. Závislá volání jsou zpracovávána v pozdějších kolech klientského nástroje a výsledku, přičemž plánovač kontroluje každý výsledek. `maxToolRounds` je výchozí `8` a přijímá `1`–`32`; jakmile je dosaženo, musí plánovač vytvořit nejlepší dostupnou konečnou odpověď. Rozhodnutí interního plánovače jsou ukládána do vyrovnávací paměti, zatímco vybraná odezva na straně klienta zachovává původní preference streamování.

### `round-robin` lepkavá dávka a rozšíření účtu

Round-robin je dávkový, nikoli jeden požadavek na krok:

- `stickyRoundRobinLimit` (kombinovaná konfigurace, poté `comboStickyRoundRobinLimit` a poté `settings.stickyRoundRobinLimit`, výchozí** 3** ) udržuje stejný cíl pro tolik po sobě jdoucích úspěchů před otočením. Nastavte přepis komba na `1` pro rotaci jednoho požadavku. Combo editor ukazuje efektivní hodnotu a z jaké vrstvy pochází.
- `connectionAwareExpansion` (kombinovaná konfigurace, poté nastavení, výchozí** falešný** ) rozšiřuje každý krok na úrovni poskytovatele na cíle pro jednotlivé účty před rotací. Strategie skupiny B (prioritní, vážené, cyklické, náhodné, p2c, nejméně používané, nákladově optimalizované, lkgp, fill-first, striktně náhodné, kontextově optimalizované, mezipaměť optimalizované, kontextové relé, fúze, potrubí, jev) uchovávají zobrazení na úrovni poskytovatele, dokud není zapnuto. Combo editor odhaluje inherit / on / off; dědit používá globální výchozí nastavení (vypnuto).
- Směrování lokality prompt-cache (`promptCacheAffinityEnabled`, výchozí** věrný** ) změní pořadí připojených připojení, takže odpovídající klíče mezipaměti zůstanou na jednom účtu. Má přednost před cyklickou a váženou rotací mezi připnutými kroky pro jednotlivé účty. Pokud potřebujete striktní rotaci, vypněte jej v Nastavení → Combo výchozí hodnoty. Neexistuje žádné přepsání jednotlivých kombinací.

Upřednostňujte rotaci více účtů na jednom modelu** jeden krok dynamického účtu** (prázdné `connectionId`, celý bazén) s lepivým limitem `1`, nikoli tři připnuté `connectionId` s. Připnuté kroky plus afinita se hroutí na stejný účet, i když počítadlo RR postupuje.

## Strategie Fusion

`fusion` je jediná strategie, která **nevybírá** jeden cíl. Rozešle prompt
**všem modelům panelu paralelně** a poté konfigurovatelný **hodnoticí model** syntetizuje
ze všech odpovědí panelu jedinou finální odpověď. Převzato z upstream projektu `decolua/9router`
(návrh Fusion od OpenRouteru); implementace se nachází v `open-sse/services/fusion.ts`.

Jak funguje:

0. **Vynechání panelu u požadavků s nástroji** — požadavek, který obsahuje neprázdné pole `tools`
   a jehož `tool_choice` není explicitně nastaveno na `"none"`, panel zcela vynechá: je směrován
   přímo do jediného modelu (nakonfigurovaného hodnoticího modelu nebo `panel[0]`), přičemž
   `tools`/`tool_choice` jsou předány beze změny. Členové panelu nemají přístup k nástrojům
   a instrukce pro syntézu hodnoticího modelu odrazuje od generování volání nástrojů, takže
   klienti využívající agenty či volání nástrojů získají skutečné rozhodnutí o volání nástroje
   namísto syntetizované prózy (#6771).
1. **Paralelní rozeslání** (pouze požadavky bez nástrojů) — prompt je odeslán současně všem
   modelům panelu, vynuceně bez streamování a s odebranými nástroji (hodnoticí model potřebuje
   pro syntézu kompletní text).
2. **Shromažďování s kvórem a dodatečnou lhůtou** — jakmile dorazí `minPanel` odpovědí, spustí
   se krátký časovač dodatečné lhůty pro opozdilé modely; poté Fusion pokračuje s tím, co bylo
   shromážděno. Tím se omezuje dopad nejpomalejšího modelu na celkovou dobu zpracování, která
   je ohraničena pevným časovým limitem.
3. **Syntéza hodnoticím modelem** — odpovědi panelu jsou anonymizovány (`Source 1`, `Source 2`, … —
   hodnoticí model tak posuzuje obsah, nikoli značku modelu) a předány hodnoticímu modelu, který
   analyzuje shodu / rozpory / částečné pokrytí / jedinečné postřehy / slepá místa a poté
   vytvoří **jednu** autoritativní odpověď. Volání hodnoticího modelu zachovává původní příznak
   `stream` klienta i nástroje, takže streamování a následné použití nástrojů nadále fungují.
4. **Řízená degradace** — 0 odpovědí panelu → `503`; právě 1 přeživší odpověď → tato odpověď
   je vrácena přímo (není co slučovat); panel s jediným modelem odpovídá přímo.

Členem panelu může být také krok `combo-ref` (`{kind: "combo-ref", comboName: "..."}`), který
odkazuje na jiné combo — vyhodnotí se jako **jeden samostatný hlas panelu** (úplné rekurzivní
směrování do odkazovaného comba, nikoli paralelní rozeslání na vlastní cíle tohoto comba),
se stejnou ochranou proti nadměrné hloubce a cyklům, jakou již používají všechny ostatní
strategie pracující s combo-ref (#6764).

### Konfigurace

Konfiguruje se v objektu `config` daného comba (bez migrace schématu — znovu využívá
existující tabulku `combos`):

| Pole                                     | Typ      | Výchozí hodnota    | Účel                                                                                                |
| :--------------------------------------- | :------- | :----------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | první model panelu | Model, který syntetizuje finální odpověď                                                            |
| `config.fusionTuning.minPanel`           | `number` | `2`                | Počet úspěšných odpovědí nutných ke spuštění časovače dodatečné lhůty (omezeno na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`             | Jak dlouho po dosažení kvóra čekat na opozdilé modely                                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`            | Absolutní limit, aby jeden zaseknutý model nemohl pozdržet požadavek                                |

Výchozí hodnoty jsou definovány v `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Příklad

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

Poté jej volejte jako jakékoli jiné combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtuální továrna Auto-Combo

Engine Auto Combo nevyžaduje předem definované kombinace. Místo toho `open-sse/services/autoCombo/virtualFactory.ts` sestavuje kandidáty za běhu:

1. Načte `getProviderConnections({ isActive: true })` (všechna povolená připojení)
2. Vyfiltruje připojení s platnými přihlašovacími údaji (API klíč nebo neexpirovaný token OAuth prostřednictvím `hasUsableOAuthToken()`)
3. Porovná je s `getProviderRegistry()` za účelem zjištění dostupnosti modelů a cen
4. Pro každou trojici `(provider, model, connection)` sestaví `VirtualAutoComboCandidate`
5. Jako cíl směrování vybere `connection.defaultModel` (nebo první model v registru)
6. Ohodnotí každého kandidáta pomocí 16faktorové funkce `scorePool()` a sady vah dané varianty
7. Vrátí výslednou konfiguraci `AutoComboConfig` uloženou v paměti pro `handleComboChat()` — nikdy se neukládá do DB

To znamená, že **přidání nového poskytovatele s povoleným `auto/*` automaticky rozšíří fond kandidátů** — není nutná ruční úprava kombinace. Virtuální kombinace se znovu sestavuje pro každý požadavek, takže nově přidaná nebo nově funkční připojení jsou zohledněna okamžitě.

## Samoopravování

- **Dočasné vyloučení**: Skóre < 0.2 → vyloučení na 5 min (progresivní prodlužování, maximálně 30 min)
- **Zohlednění jističe**: OPEN → automaticky vyloučeno; HALF_OPEN → ověřovací požadavky
- **Režim incidentu**: >50 % OPEN → vypnout průzkum, maximalizovat stabilitu
- **Obnovení po uplynutí čekací doby**: Po vyloučení je první požadavek „ověřovací“ se zkráceným časovým limitem

## Průzkum metodou bandit

5 % požadavků (konfigurovatelné) je za účelem průzkumu směrováno k náhodným poskytovatelům. V režimu incidentu je tato funkce vypnutá.

## API

**Neexistuje žádný vyhrazený koncový bod `POST /api/combos/auto`** — Auto-Combo se používá dvěma způsoby:

1. **Bez konfigurace (doporučeno):** Odešlete libovolný požadavek na dokončení chatu s `model: "auto"` nebo `model: "auto/<variant>"`. Virtuální továrna vytvoří kombinaci pro každý požadavek — není potřeba žádná perzistence ani volání API.

2. **Trvalá kombinace se `strategy: "auto"`:** Vytvořte běžnou kombinaci prostřednictvím `POST /api/combos` a nastavte `strategy: "auto"` spolu s `config.auto.weights` / `config.auto.candidatePool`. Použije se stejný vyhodnocovací modul; kombinace se uloží do `combos` a lze ji opakovaně používat podle ID.

Pro zjišťování dostupných možností vypíše `GET /api/combos/auto` všechny varianty s jejich vyhodnoceným fondem kandidátů a také `context_length` / `max_output_tokens` — hodnoty MAX napříč kontextovými okny fondu kandidátů. Klienti (např. plugin opencode) musí uvádět tyto hodnoty namísto `0`: nulový kontext zcela vypne automatickou kompakci opencode, takže relace rostou, dokud vymazání historie na bráně nezničí kontext. Hodnotu MAX lze bezpečně uvádět, protože předběžný filtr kontextu automatické kombinace směruje nadměrně velké požadavky ke kandidátům s velkým kontextovým oknem.

```bash
# Použití bez konfigurace (bez vytváření kombinace)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Trvalá automatická kombinace prostřednictvím běžného koncového bodu pro kombinace
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategie automatického směrovače

Trvalé kombinace se `strategy: "auto"` mohou nastavit `config.routerStrategy` (nebo starší
`config.auto.routerStrategy`) na jednu z následujících možností:

- `rules` — výchozí vážené vyhodnocování
- `score` — vybere nejvyšší nakonfigurované vážené skóre. Při přesné shodě se zachová nakonfigurované
  pořadí kandidátů; stávající `explorationRate` vybírá vzorky z celého seřazeného fondu.
- `cost` / `eco` — nejlevnější dostupný poskytovatel
- `latency` / `fast` — nejnižší latence p95 s penalizací za nespolehlivost
- `sla-aware` / `sla` — upřednostní kandidáty, kteří splňují SLO pro latenci p95, chybovost a volitelně
  náklady
- `lkgp` — nejprve poslední známý funkční poskytovatel
- `nadir` — dotáže se rozhodovacího API služby [Nadir](https://getnadir.com), který model ve fondu
  daný prompt potřebuje; vyžaduje výslovné zapnutí, při selhání přejde na `rules`

### Strategie směrovače podrobně

Modul automatických kombinací nabízí 7 zaměnitelných implementací **RouterStrategy**,
mezi kterými můžete přepínat pomocí `config.routerStrategy` (nebo staršího `config.auto.routerStrategy`).
Každá strategie vybere jednoho poskytovatele z fondu kandidátů na základě `RoutingContext`
(typ úlohy, indikace nástrojů/vizuálních vstupů, odhad počtu tokenů, volitelná zásada SLA a volitelně
poslední známý funkční poskytovatel).

#### 1. `rules` (výchozí) — 16faktorové vážené vyhodnocování

Zapouzdřuje stávající vyhodnocovací modul. Odfiltruje kandidáty s jističem ve stavu `OPEN`
a poté spustí `scorePool()` s aktuálním typem úlohy a `getTaskFitness()`,
přičemž vybere poskytovatele s nejvyšším skóre.

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

**Kdy použít**: Výchozí možnost. Použijte, pokud chcete vyvážený kompromis mezi všemi signály.

**Alias**: `rules` (bez aliasu)

---

#### 2. `cost` / `eco` — nejlevnější dostupný poskytovatel

Seřadí fond kandidátů podle `costPer1MTokens` (vzestupně) a vybere nejlevnějšího.
Nejprve odfiltruje kandidáty ve stavu `OPEN`.

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

**Kdy použít**: Úlohy citlivé na náklady, dávkové zpracování nebo úlohy na pozadí.

**Aliasy**: `cost`, `eco`

---

#### 3. `latency` / `fast` — nejnižší latence p95 s penalizací za nespolehlivost

Řadí podle `p95LatencyMs + (errorRate * 1000)`. Penalizace za chybovost zajišťuje,
že nespolehliví poskytovatelé budou hodnoceni hůře, i když je jejich nominální latence nízká.

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

**Kdy použít**: Úlohy citlivé na latenci, jako jsou chat v reálném čase, automatické doplňování nebo
interaktivní asistenti pro programování.

**Aliasy**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — splnění SLO pro latenci/chybovost/náklady

Ohodnotí každého kandidáta podle toho, jak dobře splňuje nakonfigurovanou zásadu SLO:

| Faktor           | Váha | Vzorec                                                  |
| ---------------- | ---- | ------------------------------------------------------- |
| Skóre latence    | 35%  | `threshold / max(value, ε)`                             |
| Skóre chybovosti | 35%  | `threshold / max(value, ε)`                             |
| Skóre stavu      | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Skóre nákladů    | 10%  | `threshold / max(value, ε)` nebo inverzně normalizované |
| Skóre stability  | 5%   | inverzně normalizovaná směrodatná odchylka latence      |

Když je nastaveno `hardConstraints: true`, kandidáti se řadí primárně podle **skóre porušení**
(o kolik překračují některý z cílů SLO) a poté podle složeného skóre. Jinak se používá pouze
složené skóre.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... ohodnotí každého kandidáta podle zásad: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Pole SLA** (nastavují se v konfiguraci kombinace):

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

**Kdy použít**: Produkční úlohy s přísnými limity latence, chybovosti nebo nákladů.

**Aliasy**: `sla-aware`, `sla`

---

#### 5. `lkgp` — nejprve poslední známý funkční poskytovatel

Nejprve vyzkouší **posledního známého funkčního poskytovatele** (pokud je nastaven) a poté
přejde na strategii `rules`. To je užitečné pro zachování stejného poskytovatele v rámci relace —
následné požadavky v konverzaci zpracovává stejný poskytovatel.

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

    // Návrat ke strategii rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kdy použít**: Vícekolové konverzace, u kterých chcete, aby následné požadavky
zpracovával stejný poskytovatel (např. kvůli ukládání do mezipaměti, kontinuitě kontextu nebo konzistenci cen).

**Alias**: `lkgp` (bez aliasu)

---

#### 6. `nadir` — výběr modelu zohledňující prompt prostřednictvím Nadiru

Každá z výše uvedených strategií řadí kandidáty podle vlastních telemetrických dat; žádná z nich
nečte požadavek. `nadir` odešle poslední vstup uživatele spolu s ID modelů z fondu
rozhodovacímu API služby [Nadir](https://getnadir.com) (`POST /v1/bucket`) a směruje požadavek do modelu,
který Nadir z této nabídky vybere (`simple` → nejlevnější vyhovující model, `complex` → špičkový
model). Připojení obsluhující tento model stále vybírá strategie `rules`, takže o výběru účtu
nadále rozhodují kvóty, stav a náklady.

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

`OMNIROUTE_NADIR_API_KEY` a `OMNIROUTE_NADIR_BASE_URL` slouží jako záložní proměnné prostředí pro
tyto dva řetězce. `baseUrl` je potřeba pouze pro vlastní hostovanou instanci Nadiru (koncové `/v1` je tolerováno).
Volání bez klíče používají anonymní úroveň Nadiru, která má omezenou frekvenci požadavků pro jednotlivé IP adresy. S klíčem
([vytvořit klíč](https://app.getnadir.com/dashboard/api-keys)) se každé rozhodnutí
zaznamená na váš řídicí panel Nadiru. Kompletní postup nastavení a ověření:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Co se odesílá mimo systém: text poslední zprávy uživatele (prvních 16 tisíc znaků), ID kandidátních
modelů a značka kanálu `source: "omniroute"`. Neodesílá se systémový prompt, historie, nástroje ani
hlavičky.

Chování při selhání je typu fail-open: vypršení časového limitu (výchozí hodnota je 2000 ms), odpověď mimo rozsah 2xx, nedostupný
hostitel, chybná odpověď nebo výběr mimo fond vedou k rozhodnutí strategie `rules`
a důvod dostane předponu `NadirStrategy: fallback (…)`. Po neúspěšném volání strategie
na 30 s přeskočí síťové volání, takže výpadek způsobí jedno vypršení časového limitu za 30 s namísto
jednoho pro každý požadavek. Události směrování uvádějí `strategy: "nadir"` pouze tehdy, když výběr
skutečně provedl Nadir.

**Kdy použít**: Provoz s různou obtížností požadavků ve fondu zahrnujícím několik úrovní modelů (malý, střední
a špičkový model), kde chcete snížit náklady vznikající neustálým používáním špičkového modelu.

**Alias**: `nadir` (bez aliasu)

---

### Vlastní strategie směrovače

Prostřednictvím veřejného API můžete zaregistrovat vlastní implementaci `RouterStrategy`:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Sem patří vaše logika směrování
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

Poté ji použijte:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Průvodce výběrem strategie směrovače

| Případ použití       | Strategie   | Důvod                                            |
| -------------------- | ----------- | ------------------------------------------------ |
| Vyvážená zátěž       | `rules`     | Výchozí — zohledňuje všechny faktory             |
| Minimalizace nákladů | `cost`      | Vždy vybere nejlevnější možnost                  |
| Minimalizace latence | `latency`   | Vybere nejrychlejšího spolehlivého poskytovatele |
| Přísné cíle SLO      | `sla-aware` | Filtruje podle prahů p95/chybovosti/nákladů      |
| Vícekolový chat      | `lkgp`      | Zachování poskytovatele v rámci relace           |
| Různá obtížnost      | `nadir`     | Vybere úroveň modelu pro každý prompt            |

Pole pro strategii zohledňující SLA:

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

## Vhodnost pro úlohy

Více než 30 modelů bylo ohodnoceno napříč 6 typy úloh (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podporuje zástupné vzory (např. `*-coder` → vysoké skóre pro programování).

## Rekapitulace automatických variant

Včetně samotného `auto` (výchozího) a 6 hodnot `AutoVariant` deklarovaných v `autoPrefix.ts` existuje **7 použitelných ID modelů**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` samotný obsahuje 6 hodnot; 7. možností je „žádná varianta“ — samotné `auto` — kterou `parseAutoPrefix()` zpracovává jako `variant: undefined`.)

## Jak úrovně zapadají do Auto-Combo

Bodovací funkce se 16 faktory (`open-sse/services/autoCombo/scoring.ts`) považuje příslušnost k úrovni za dva signály: `tierPriority` (0.0476) a `tierAffinity` (0.0476). Úplnou sadu `DEFAULT_WEIGHTS` najdete výše v kanonické [tabulce bodovacích faktorů](#how-it-works-persisted-auto-combos) — přepsané hodnoty pro jednotlivé balíčky (ship-fast/cost-saver/quality-first/offline-friendly) jsou uvedeny v tabulce „Váhové profily jednotlivých balíčků“.

Samotná úroveň **nezaručuje**, že bude Tier 1 první — pokud má Tier 1 vysokou latenci nebo neoptimální poměr ceny a kvality, zvítězí Tier 2. Chcete-li vynutit pořadí podle úrovní, použijte strategii kombinace `priority` a seřaďte poskytovatele podle úrovně.

Chcete-li výrazně upřednostnit Tier 1 (předplatné), zvyšte váhu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definice úrovní a klasifikaci poskytovatelů najdete v souboru [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testování a pokrytí

### Deterministická matice směrování-rozhodování (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje směrování** rozhodnutí** všech 21 veřejných strategií end-to-end prostřednictvím skutečného kombinovaného potrubí s falešným upstreamem. Pokrytí zahrnuje:

- Všech 21 strategií `ROUTING_STRATEGY_VALUES` (uspořádané, vážené, náklady, kontext, fúze, …).
- `quota-share` (interní) end-to-end: DRR spravedlivost + deprioritizace saturace přes skutečný šev `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay` univerzální předání pokrytí v každém cílovém počtu.

Tato sada běží v CI (`test:integration` job) s `--test-concurrency=1` a `--test-force-exit`, takže je deterministická a nevyžaduje živé přihlašovací údaje.

### Gated live smoke (skuteční poskytovatelé NOT v CI — )

| Příkaz                                 | Co to dělá                                                                   |
| :------------------------------------- | :--------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Průběžné skutečné směrování s `RUN_COMBO_LIVE=1`; snímky živého OmniRoute DB |
| `npm run test:combo:live:vps`          | volání HTTP proti živému serveru OmniRoute (set `COMBO_LIVE_BASE_URL`)       |
| `npm run test:combo:live:vps:failover` | Totéž se scénáři záměrného převzetí služeb při selhání                       |

Tyto kouřové testy procvičují skutečnou drátovou cestu (kombo → provider → dokončení). Jsou záměrně vyloučeni ze CI, protože vyžadují aktivní přihlašovací údaje a přístup VPS.

---

## Soubory

| Soubor                                                    | Účel                                                                                                             |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16faktorová skórovací funkce, `DEFAULT_WEIGHTS`, norm                                                            |
| `open-sse/services/autoCombo/taskFitness.ts`              | Hledání kondice modelu ×                                                                                         |
| `open-sse/services/autoCombo/engine.ts`                   | Logika výběru, bandita, rozpočtový strop                                                                         |
| `open-sse/services/autoCombo/selfHealing.ts`              | Vyloučení, sondy, režim incidentu                                                                                |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 hmotnostních profilů (rychlá přeprava, úspora nákladů, kvalita především, offline, spolehlivost, režim chaosu) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefix parser + 6 variant                                                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytváří in-memory `AutoComboConfig` z živých připojení                                                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací háček pro zesměšňování registru poskytovatelů                                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 strategií)                                                                         |
| `src/sse/handlers/chat.ts`                                | Integrace: auto-prefix zkrat                                                                                     |
