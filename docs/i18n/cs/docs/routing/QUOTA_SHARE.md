# Quota Sharing Engine (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Odkaz na dokumentaci**: `docs/routing/QUOTA_SHARE.md`
> Součást skupiny B (plány 16 + 22).

---

## Přehled

Modul pro sdílení kvót spravedlivě rozděluje časově omezenou kvótu poskytovatele
(např. 5hodinové okno Codex, Kimi 1500 požadavků/h) mezi více API klíčů, které
sdílejí stejné připojení.

**Řešený problém:** OmniRoute předává požadavky z mnoha API klíčů stejnému účtu
u nadřazeného poskytovatele. Bez logiky sdílení může nárazový provoz z klíče A
vyčerpat kvótu poskytovatele pro danou hodinu, takže klíče B a C zůstanou
zablokované až do obnovení okna. Modul tomu zabraňuje tím, že:

1. Sleduje průběžnou spotřebu každého klíče podle jednotlivých dimenzí (%, požadavky, tokeny, $).
2. Používá spravedlivý algoritmus zachovávající vytížení: klíč si může vypůjčit
   nevyužité podíly, dokud není globální fond nasycen.
3. Vynucuje výsledek v kritické cestě (`chatCore.ts`) předtím, než požadavek
   dorazí k nadřazenému vykonavateli.

---

## Algoritmus: Fair-Share Work-Conserving

Implementováno v `src/lib/quota/fairShare.ts`.

### Režimy

| Stav                                       | Režim      | Chování                                                                    |
| ------------------------------------------ | ---------- | -------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Štědrý** | Klíč si může půjčit až do výše globálního limitu mínus spotřebovaná částka |
| `globalUsedPercent >= saturationThreshold` | **Přísný** | Přísně vynucovat individuální spravedlivý podíl                            |

Výchozí `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Tyto dva režimy popisují fond ve výchozím režimu výpůjčky, `saturation`. Bazén v režimu `consent` vždy platí přísná pravidla, bez ohledu na saturaci. Viz [Souhlasné půjčování (přihlášení na skupinu)](#consented-lending-per-pool-opt-in).

### Rozhodnutí podle dimenze

Pro každou aktivní dimenzi ve fondu motor vypočítá:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pro dimenze `percent` pochází `consumed` místo toho z knihy atribuce (viz [Procentuální dimenze: atribuce na klíč](#percent-dimensions-per-key-attribution) ).

Pak:

- **`policy = hard`** : pokud je `consumed > fairShareAllowed` a režim přísný →** blok** .
- **`policy = soft`** : pokud je `consumed > fairShareAllowed` a režim přísný →** penalizovat** (deprioritizovat v kombinaci; nikdy neblokovat natvrdo).
- **`policy = burst`** : povolit, dokud existuje globální prostor bez ohledu na spravedlivý podíl.

### Čepice absoluto

`capValue` + `capUnit` na alokaci je pevný strop nezávislý na režimu nebo politice. Jakákoli dimenze, kde vždy `consumed >= capValue`** bloky** žádost. Pro čepici `percent` je `consumed` pouze část přiřazená klíči.

### Vícerozměrná kontrola

Požadavek je zablokován, pokud** žádný** rozměr v bazénu by to blokoval. Rozměry jsou nezávislé — 5h% vyčerpání neovlivňuje týdenní% dimenzi.

### Půjčování

Ve velkorysém režimu může klíč, jehož alokace je nedostatečně spotřebován, využít přebytek z nepřidělených akcií jiných klíčů. Vzorec je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` pro tuto dimenzi) je vždy pevný strop.

### Souhlasné půjčování (přihlášení na skupinu)

Každý bazén má režim výpůjčky. `saturation` je výchozí a zachovává výše uvedená pravidla. V režimu `consent` předává klíč `hard` svůj podíl pouze v rámci kapacity, kterou ostatní klíče odsouhlasily zapůjčení. Správce nastavuje režim každého fondu. Každý držitel klíče si nastavuje svůj vlastní souhlas prostřednictvím [Půjčování souhlasu](#lending-consent).

Souhlas je procento od 0 do 100 a volitelná lhůta v milisekundách epochy. Klíč půjčuje toto procento svého nevyužitého podílu, zatímco termín je v budoucnosti.

Pro jednu dimenzi je `L` efektivní limit: limit plánu krát účty ve fondu. Brána vypočítá pro požadující klíč:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` je váha klíče, nebo `100 / n` pro každý klíč, když žádná váha není vyšší než 0. `lend_k` je aktivní procento klíče a 0 po uplynutí termínu. Vlastní souhlas žádajícího klíče se nikdy nepočítá. Klíč `hard` je odmítnut, jakmile jeho spotřeba dosáhne svého podílu plus `borrowAvailable`.

Kapacita, kterou si žádná alokace nenárokuje (100 minus součet vah), není zapůjčitelná. Žádný klíč nesouhlasil s jeho zapůjčením.

**Příklad.** `L` je 1000.

| Klíč | Hmotnost | Podíl | Spotřebováno | půjčuje |
| ---- | -------- | ----- | ------------ | ------- |
| A    | 50       | 500   | 530          | 0%      |
| B    | 30       | 300   | 100          | 50%     |
| C    | 0        | 0     | 60           | 0%      |

- B půjčuje 50 % svých nečinných 200, což je 100. C si již vzal 60 nad svůj podíl. A může si půjčit 40.
- A je podáváno za 530 a odmítnuto, jakmile jeho spotřeba dosáhne 540.
- Než C něco použil, s A na nebo pod svým podílem, C si mohl půjčit 100.
- Než C něco použil, s A na 530 si C mohl půjčit 70.

**Nulová hmotnost.** Klíč s váhou 0 má podíl 0. Obsluhuje se pouze v době, kdy je jeho spotřeba nižší, než půjčují ostatní. Když nikdo nepůjčí, je od první žádosti odmítnut.

**Termíny.** Platnost souhlasu nevyprší žádnému úkolu na pozadí. Každá žádost porovnává termín se svým vlastním časem a termín rovný tomuto času již uplynul. Uložený termín, který není konečným číslem nebo je po největším datu, které `Date` může pojmout, se počítá jako prošlý.

**`soft` a `burst`.** Půjčka je neomezuje. Klíč `soft` je zbaven priority, jakmile překročí svůj podíl. Když má bazén místo, projde klíč `burst`. Strop bazénu stále odmítá všechny klíče, jakmile celková hodnota bazénu dosáhne svého limitu.

**Cena na trase požadavku.** Bazén `saturation` nečte nic víc než dříve. Ve fondu `consent` čte počitatelná dimenze ostatní klíče pouze pro klíč `hard` na nebo nad jeho podílem, zatímco jiný klíč půjčuje. Poté provede jedno čtení na další klíč paralelně. Neúspěšné čtení se počítá jako spotřeba 0 pro daný klíč. Dimenze `percent` nepřidává žádné čtení, protože kniha atribuce obsahuje každý klíč.

**Úprava bazénu.** Úprava zachovává souhlas klíčů, které zůstávají. To platí pro úpravy přidělení, celoskupinové nahrazení a volání `ensure`. Odebraný klíč ztratí svůj souhlas a klíč přidaný zpět začíná na 0. Směrování správce vrátí souhlas každého klíče a nikdy jej nezapíše. Přepnutí fondu zpět na `saturation` zachová každý uložený souhlas, který nemá v tomto režimu žádný účinek. Opětovným přepnutím fondu na `consent` se znovu aktivují uložené souhlasy, jejichž termín neuplynul. Držitel klíče může vymazat uložený souhlas v obou režimech.

**Upgrade.** Pokud sloupce `lending_percent` a `lending_until` již existují, migrace přidá pouze `borrow_mode` a uložená procenta zůstanou tak, jak jsou. Každý bazén začíná v režimu `saturation`. Zapněte `consent` na bazén v průvodci bazénem. Z uložených hodnot se nic neodvozuje.

**Omezení.**

- Věřitel může najít bazén u jeho stropu, než použije svůj vlastní podíl. Kapacita, kterou si ostatní půjčili, se započítává do celkového počtu.
- Kontrola probíhá před požadavkem a nic nerezervuje. Souběžné požadavky odečítají spotřebu dříve, než jsou jakékoli zaznamenány, takže zapůjčenou kapacitu lze utratit více než jednou, v závislosti na žádostech za běhu. Stejnou vlastnost má i kontrola sdílení režimu `saturation`.

---

## Čítač klouzavého okna

Implementováno v `src/lib/quota/sqliteQuotaStore.ts` a `redisQuotaStore.ts`.

Dva intervaly pro každou dvojici `(apiKeyId, dimensionKey)`:

- `curr`: aktuální interval (`floor(nowMs / windowMs)`)
- `prev`: předchozí interval (`curr - 1`)

Efektivní průběžná hodnota:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Přesnost**: přibližně 99 %. Chyba činí nanejvýš 1 % velikosti okna na rozhraní
mezi intervaly (což je vlastní aproximaci pomocí 2 intervalů).

### Souběžnost

Ovladač SQLite: mutex v paměti pro každý klíč `(apiKeyId | dimensionKey)` zabraňuje
souběhu při čtení, úpravě a zápisu. Tento vzor odpovídá ochraně proti zahlcení
současnými požadavky v `src/sse/services/auth.ts`.

Ovladač Redis: skript Lua EVAL pro atomické navýšení — spouští se jako jediný příkaz Redis.

---

## Ovladače

### SQLite (výchozí, bez nutnosti instalace)

- Tabulka: `quota_consumption` (viz migrace `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Nejvhodnější pro nasazení s jednou instancí.
- Veškerá perzistence je uložena ve stávající databázi SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (volitelný, pro více instancí)

- Vyžaduje npm balíček `ioredis`.
- Čítače jsou uloženy v Redis; metadata (fondy/alokace) zůstávají v SQLite.
- Nejvhodnější pro nasazení s více replikami, kde je nutné čítače sdílet.

### Přepínání ovladačů

Prostřednictvím uživatelského rozhraní nastavení (`/dashboard/settings` → Úložiště kvót) nebo pomocí proměnných prostředí:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavení v DB má přednost před proměnnými prostředí. Pokud je `driver=redis`, ale chybí URL nebo není nainstalován balíček `ioredis`, tovární funkce se přepne zpět na SQLite a zapíše varování do protokolu.

Pořadí výběru ovladače:

1. Nastavení DB `quotaStore.driver`
2. Proměnná prostředí `QUOTA_STORE_DRIVER`
3. Výchozí hodnota: `sqlite`

---

## Multi-Dimension

Bazén může mít více rozměrů. Každá dimenze je nezávislá:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Příklad: plán Codex** (5h % + týdně %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Aby byl požadavek povolen, musí splňovat všechny rozměry.

### Procentní dimenze: atribuce na klíč

Procentuální plán uvádí jednu hodnotu využití na účet a okno plánu. Poskytovatel neposkytuje žádné počítadlo na klíč API.

Aby bylo možné toto číslo rozdělit mezi klíče, každý fond vede knihu přiřazení pro účet a okno plánu. `src/lib/quota/percentLedger.ts` dodržuje pravidla knihy. `src/lib/quota/percentAttribution.ts` přemění knihu na čísla, která používá prosazování. Výsledkem je odhad sestavený z tokenů, které jednotlivé klíčové cesty vedou.

#### Čtení, které posouvá knihu

Kniha se pohybuje pouze na vlastní figurce poskytovatele pro požadované okno plánu. Tato připojení hlásí jednu:

| Poskytovatel                           | Plánujte okna  |
| -------------------------------------- | -------------- |
| Claude prostřednictvím připojení OAuth | `5h`, `weekly` |
| Codex                                  | `5h`, `weekly` |

Tyto se nepočítají jako čtení:

- odpověď, kterou klient poskytovatele označí jako zastaralou
- okno Claude, jehož procento poskytovatel nenahlásil
- obrázek jiného okna nebo v nejhorším případě přes okna
- záložní hlavička limitu rychlosti
- neúspěšné čtení

Ostatní poskytovatelé, včetně Claude s klíčem API, žádnou knihu nemají. Každý klíč je zpoplatněn nulou na jeho procentuální rozměry, jako před touto změnou.

Čtení sdílí 30sekundovou mezipaměť signálu saturace. Čtení Claude je datováno tím, kdy byl údaj pozorován v hlavičkách odpovědí nebo přečten z koncového bodu použití, když je tento čas znám. Ostatní údaje jsou datovány do doby, kdy byla tato položka mezipaměti vytvořena.

#### Co kniha uchovává

Každý zaznamenaný požadavek přidá své tokeny jednou na počítadlo pro fond, účet a klíč. Počítadlo pouze roste. Kniha zachovává tři věci:

- základní čára: údaj, kdy se kniha otevřela nebo se okno naposledy otočilo
- poslední aplikovaný obrázek
- na klíč, jeho počítadlo tokenů ve stejném okamžiku, volal jeho značku

Kniha se aktualizuje, když vynucení nebo způsob použití vypočítá přiřazení. Zápisy jsou porovnávány a nastaveny na číslo revize. Spisovatel, který jednou prohraje pokusy o nové čtení.

#### Jak se vypočítá část klíče

Část každého klíče se vypočítá při čtení knihy. Růst čísla od základní linie je rozdělen mezi klíče v poměru k tokenům, které každý z nich směruje od své značky.

Together, tyto tokeny vysvětlují nejvýše jeden bod hodnoty na tokeny `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (výchozí 1 000). Růst, který nevysvětlují, je vnější. Základní linie je také vnější.

Například kniha se otevře na 0. Klíč A pak směruje 900 000 tokenů a klíč B směruje 100 000. Při čísle 60 je část A 54 bodů a část B je 6.

Počítadlo pod značkou klíče se restartovalo a počítá v plné výši. Klíč bez značky, jako je klíč, který se připojí k fondu uprostřed okna, počítá všechny své žetony. Číslo, které zaostává za tokeny, způsobí chybu, která zmizí při dalším čtení. Nehromadí se.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` se čte u každého přiřazení. Hodnota, která není konečným číslem alespoň 1, spadne zpět na 1 000.

#### Jak čtení změní knihu

Platí první pravidlo shody:

1. **Zatím žádná kniha:** čtení otevře knihu. Jeho číslo je základní čárou a každý čítač je označen.
2. **Starší čtení:** čtení datované před posledním použitým je ignorováno. Stejně tak odečet, jehož resetovací čas je o více než 30 minut dřívější než uložený.
3. **Nové okno poskytovatele:** resetovací čas o více než 30 minut později než uložený čas otočí knihu. Figura se stane základní linií a každý žeton je znovu označen. Klíče bez pultu opouštějí knihu.
4. **Ukončené okno:** uložený čas resetování, který není po datovém čase odečtu, znamená, že okno skončilo. Čtení obrátí knihu, ať už je její postava jakákoli.
5. **Vyšší číslo:** pohybuje se pouze poslední postava. Základní linie a značky zůstávají.
6. **Stejná postava:** postava, základní linie a značky zůstávají. Je napsán pouze resetovací čas, který kniha postrádá.
7. **Nižší číslo:** nižší číslo se jako takové nikdy nepoužije. Otočí knihu pouze tehdy, když tři věci platí. Je alespoň o dvě minuty novější než poslední použitá hodnota. Nic neříká, že okno je stejné otevřené. Je o více než jeden bod nižší.

Okno se počítá jako stejné otevřené, když drží tři věci. Oba časy resetování jsou známy. Jsou od sebe do 30 minut. Uložený je stále před čtením. Nižší číslo uvnitř tohoto okna nic nemění.

Čas resetování je uložen pouze tehdy, když je před datovým časem čtení, které jej nese. Vyšší číslo ukládá resetovací čas jeho čtení, když je tento použitelný, a uchovává uložený čas jinak. Stejné číslo zaznamená čas resetování čtení pouze v případě, že kniha žádný nemá. Nic jiného to nemění. Nižší číslo, které neotočí knihu, nezaznamená žádný čas resetování.

#### Když je kniha používána

Po přečtení se kniha použije, pokud její uložený resetovací čas není pozdější než aktuální čas. Tento případ nastává, když je těsně po resetování pozorováno čtení provedené těsně před resetem, jako je čtení z mezipaměti.

Bez použitelného čtení je uložená kniha použita pouze tehdy, pokud může být stále knihou aktuálního okna. To platí ve dvou případech:

- jeho resetovací čas je známý a stále před námi
- nemá čas resetování a poslední čtení, které jej změnilo, je maximálně 15 minut staré

Jinak se nic nepřipisuje, jako když není kniha. Kniha, jejíž uložený čas resetování uplynul, se nikdy neúčtuje.

#### Vynucení

Spotřeba klíče v procentuální dimenzi je jeho přiřazená část plus podíl vnější části. Externí část nejprve využívá kapacitu bez nároků na přidělení (100 minus součet vah). Pouze přebytek se rozdělí mezi klíče podle hmotnosti.

Tato spotřeba se porovnává se spravedlivým podílem klíče jako u jakékoli jiné dimenze. Striktní režim se stále spustí, když signál saturace dosáhne `QUOTA_SATURATION_THRESHOLD` (výchozí 0,5). Každé číslo je škálováno podle efektivního limitu: limit na účet krát počet účtů ve fondu.

Absolutní horní hranice se `capUnit: "percent"` počítá pouze část přiřazenou klíči, a to stejným způsobem. Vezměte na účet limit 100 ak účtů. Horní hranice N je pak dosažena, když klíčová část čísla obsluhujícího účtu dosáhne bodů N/k. Každý účet je porovnán se svou vlastní knihou. Například u dvou účtů je limitu 10 dosaženo při 5 bodech z hodnoty jednoho účtu.

Když úložiště nelze číst, nic se nepřiřazuje a každý klíč je v této dimenzi zpoplatněn 0. Když selže zápis do knihy, tato atribuce použije knihu tak, jak byla přečtena. Neúspěšný zápis tokenu opustí tokeny tohoto požadavku z knihy. Žádné z těchto selhání neblokuje požadavek.

Ve fondu `consent` používá vzorec půjčování spotřebu každého klíče v procentuální dimenzi, jak je popsáno výše. Když se půjčí jiný klíč, kniha se přečte jednou a přiřadí se každému klíči. Bez použitelné knihy je každý klíč zpoplatněn 0. Klíč s váhou pak projde a klíč s váhou 0 projde pouze tehdy, když půjčí jiný klíč.

#### Cesta použití

`GET /api/quota/pools/{id}/usage` hlásí stejná čísla prostřednictvím stejné funkce. Dimenze procent má jednu položku na připojení fondu v `accounts`. Jeho nejvyšší úroveň `consumedTotal` a `perKey` odráží první položku.

Trasa také použije aktuální čtení, takže může posouvat knihu tak, jak to dělá požadavek. `internal + external` se může lišit od `consumedTotal`, když není použitelný údaj nebo když není použita nižší hodnota.

#### Skladování a uchovávání

Obě úložiště kvót vedou knihu. Pokud je na SQLite povoleno automatické čištění databáze, odstraní řádky neaktualizované po dobu 60 dnů. Na Redis sdílejí knihy a čítače připojení fondu jeden klíč. Jeho platnost vyprší 60 dní po posledním zápisu tokenu nebo změně knihy. Kniha, která se nemění, se nepřepisuje, takže cutoff je nastaven nad nejdelším oknem plánu. Ruční resetování historie použití také vymaže knihy o SQLite (viz Omezení).

#### Omezení

- Veškerý růst účtu od základní linie je rozdělen podle tokenů, které od té doby směroval každý klíč. Nezáleží na tom, kdy k tomuto růstu došlo.
- Takže použití mimo OmniRoute je účtováno klíčům do výše, co jejich tokeny umožňují. To zahrnuje použití provedené před prvním požadavkem klíče na okno, když byla kniha již otevřena.
- Například vnější použití zvyšuje účet o 60 bodů, zatímco žádné klíčové cesty. Klíč pak směruje 30 000 tokenů a číslo dosáhne 60,6.
- Pokud byla kniha otevřena před tímto použitím, část klíče je 30 bodů. Nese také 7,65 externího použití, se čtyřmi klíči o hmotnosti 25.
- Pokud se kniha otevřela po tomto použití, 60 bodů je výchozí. Část klíče je 0,6 bodu a nese 15 externích použití.
- Požadavek nebo návštěva trasy použití otevře knihu. Zda se tedy takové použití počítá jako základní, závisí na tom, kdy byla kniha otevřena.
- S výchozí úrovní, klíč, který směruje 60 000 tokenů při použití venku, zvyšuje účet o 60 bodů, získá všech 60 jako svou vlastní část.
- S podlahou na 50 000 je vlastní část 1,2 bodu. Ostatních 58,8 jsou externí a účtované podle hmotnosti, jako každé externí použití.
- Nastavte `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` blízko tomu, co stojí jeden bod ve vašem plánu. Vnější použití zahrnuje provoz na stejném účtu z klíčů mimo fond.
- V každém režimu platí procentuální omezení. Limitovaný klíč lze odmítnout, když je účet hluboko pod prahem nasycení.
- Vezměte si čepici 10 a 12 bodů vnějšího použití dříve v okně. Klíč, který směruje 20 000 tokenů, je pak odmítnut při hodnotě účtu 12,4 %.
- Rozdělení je odhadem podle objemu tokenu. Požadavek se počítá jako jeho tokeny výzvy plus jeho tokeny dokončení. Slevy mezipaměti a ceny modelů tento počet nemění.
- Požadavek, který nekončí stavem 200, nezaznamenává žádné tokeny. Příklady jsou stream, který klient odpojí, a chyba upstreamu po využití.
- Využití, které takový požadavek způsobil, je účtováno klíčům, které zaznamenaly tokeny, až do výše, co jejich tokeny umožňují. Zbytek je externí. Nehýbe se zpět. Odpověď, která nehlásí žádné použití tokenu, nezaznamenává ani žádné tokeny.
- Využití probíhajícího požadavku se může zobrazit v jiné aktivní části klíče pro celý požadavek. Zpět se přesune pouze tehdy, když požadavek skončí se stavem 200.
- Využití již na účtu při otevření knihy se počítá jako externí. To zahrnuje upgrade, nový fond a nový účet. Za externí se počítá i použití v novém okně před jeho prvním čtením.
- Každý klíč začíná svým váhovým podílem daného využití, po kapacitě žádné nároky na přidělení. S jedním účtem na 85 % a pěti klíči o hmotnosti 20 začíná každý se 17 ze svých 20 použitých.
- Ve fondu s několika účty se na celkový rozpočet použije hodnota účtu obsluhy. To se knihou nemění.
- Nižší číslo v okně, které poskytovatel hlásí jako otevřené, se nepoužije. Čas resetování, který se posune zpět o více než 30 minut, je považován za starý údaj.
- V obou případech si kniha zachovává svůj stav, dokud neuplyne uložený čas resetování. Poté se kniha nenabíjí, dokud ji čtení neobrátí.
- Řešením je ruční resetování historie použití (`POST /api/settings/purge-usage-history`). Vymaže knihy atribuce a jejich počítadla tokenů v databázi SQLite.
- Období `all` vymaže každou knihu a počítadlo. Kratší období nejprve vymaže knihy, které v něm nejsou napsány. Poté vymaže počítadla, která nejsou v něm zapsaná, ale pouze pro připojení fondu, ve kterém nezůstala žádná kniha. Uchovávaná kniha stále označuje každý klíč proti jeho počítadlu.
- Kniha, jejíž postava se nepohnula, není přepsána, takže kratší období může také vymazat knihu aktuálního okna. Další čtení pak otevře novou knihu na aktuálním obrázku.
- Reset se nedotkne úložiště kvót Redis. Tam kniha končí svým oknem nebo vyprší 60 dní po jejím posledním zápisu.
- Když poskytovatel nepošle žádný čas resetování, okno, které se resetuje a doplní nad starou hodnotu mezi dvěma měřeními, vypadá jako vyšší hodnota. Kniha zachovává staré základní linie a značky.
- Údaje jsou datovány místními hodinami. Když předběhne poskytovatele nebo zdroj hlásí čas resetování o něco dříve, kniha se může k tomuto rozdílu dostat brzy.
- Růst v tomto krátkém rozpětí je rozdělen tokeny, které jsou v něm směrovány. První čtení v dalším okně to opraví. Když otočená kniha nemá žádný resetovací čas, tato korekce potřebuje nižší hodnotu, alespoň o dvě minuty novější než poslední použitá hodnota.
- Instance, které sdílejí data Redis, ukládají data s vlastními hodinami, takže tyto hodiny udržujte v synchronizaci. Čtení instance, jejíž hodiny běží pozadu, vypadají starší a jsou ignorovány.
- Když po uplynutí uloženého času resetu nedorazí žádná použitelná hodnota, procentuální podíly na klíč a procentuální omezení se nevynucují, dokud se hodnota nevrátí. Bez času resetu to začne 15 minut po posledním přečtení, které změnilo knihu.
- V obchodě Redis může kniha nečinná po dobu 60 dnů vypršet mezi šekem pisatelem a zápisem. Poté se znovu vytvoří při revizi nad 1, což je platný stav.

---

## Překladač tarifů

Implementován v `src/lib/quota/planResolver.ts`.

Priorita (od nejvyšší po nejnižší):

1. **Ruční přepsání v DB** — tabulka `provider_plans`, pro jednotlivá `connectionId`.
2. **Známý katalog** — `src/lib/quota/planRegistry.ts` (pouze data).
3. **Prázdný tarif** — bez dimenzí, je vyžadována ruční konfigurace.

### Známý katalog

| Poskytovatel          | Dimenze                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, neznámý), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Bez výchozí hodnoty — je vyžadována ruční konfigurace         |

---

## Integrace potrubí

### PRE hák (`open-sse/handlers/chatCore.ts`)

Spustí se před nadřazeným exekutorem, po ověření a kontrole zásad:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Selhání otevřít** : pokud `enforceQuotaShare` hodí, požadavek je povolen prostřednictvím protokolu `pino.warn`. Tím se zabrání tomu, aby chyba motoru kvót zablokovala veškerý provoz.

**Až se kapacita vrátí.** Odmítnutí u klíčového podílu nebo u stropu bazénu končí jednou ze dvou vět, v obou režimech výpůjčky:

- `percent` window: `. The <window> window resets at <time>.` Čas je reset, který poskytovatel hlásí.
- Počitatelná jednotka: `. Enough <window> usage is expected to clear by <time>.` Čas je horní hranicí z posuvného okna, pokud klíč nevysílá nic jiného.

`<time>` je ISO 8601 instant v UTC. Odmítnutí pak nese `Retry-After`: celé sekundy do tohoto okamžiku plus jedna. Klient, který čeká tak dlouho, se pokusí zopakovat maximálně jednu sekundu po okamžiku. Pokud okamžik není znám, odmítnutí neobsahuje ani větu, ani záhlaví. Absolutní odmítnutí stropu nenese ani jedno. Veřejný kód zůstává `quota_share_blocked`.

Odmítnutí sdílení se nedotkne sdíleného připojení. Nenastaví žádné cooldown, žádný zámek modelu a žádné selhání poskytovatele jističe a ostatní klíče fondu jsou stále obsluhovány. Když každý cíl komba odmítne klíč pro svůj podíl, kombo bez čekání odpoví 429. Jeho odpověď nese nápovědu jako `Retry-After`. Cesta vložení ukončí své odmítnutí stejnou větou a nepošle žádné `Retry-After`.

### POST hook (rekordní spotřeba)

Po úspěšné odpovědi:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Poznámka k driftu** : pokud `consume` selže po odpovědi, rolovací počítadlo se podpočítá. Signál saturace od poskytovatele (např. `anthropic-ratelimit-unified-5h-utilization`) opraví globální odhad při příštím požadavku.

### Kombinovaný měkký trest (`open-sse/services/combo.ts`)

Když `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Pokuta se uplatní po všech ostatních bodovacích faktorech. Snižuje pravděpodobnost automatického kombinování výběru saturovaného klíče bez jeho tvrdého blokování.

---

## UI Návod

### `/dashboard/costs/quota-share` — Hlavní stránka bazénů

Komponenty (vše v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Účel                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Úvodní karta vysvětlující sdílení kvót novým uživatelům                         |
| `CreatePoolModal`      | Vytvořte nový fond kvót (počáteční přidělení + název + )                        |
| `PoolCard`             | Souhrn podle fondu: název, připojení, počet přidělení                           |
| `DimensionBar`         | Skládaný pruh podle dimenze: podíl každého klíče + globální využití             |
| `AllocationTable`      | Tabulka se spotřebovanými, spravedlivý podíl, deficit/surplus, půjčování vlajky |
| `BurnRateChart`        | Spojnicový graf rychlosti vypalování EMA (líné grafy přes `dynamic()`)          |
| `EditAllocationsModal` | Upravte alokační váhy, limity a zásady pro fond                                 |
| `BorrowModeField`      | Volič režimu výpůjčky (`saturation` nebo `consent`) v průvodci                  |
| `LendingBadge`         | Odznak pouze pro čtení na klíči, který půjčuje, pouze ve fondech `consent`      |

Odznak půjčování ukazuje procento a, je-li nastaven, termín v UTC s pojmenovanou zónou. Posuzuje lhůtu v době snímku použití. Prošlý nebo nečitelný termín se zobrazí jako `lending expired`.

Stránka se zavěšuje:

- `usePools` — načítá `GET /api/quota/pools` každých 30 s.
- `usePoolUsage` — načte `GET /api/quota/pools/[id]/usage` na vyžádání.
- `useLocalStoragePoolMigration` — se spustí jednou při připojení k migraci starších dat LS.

Klíčový krok průvodce bazénem má pole `Show usage by member to key holders`. Nastavuje možnost `memberBreakdown` fondu (viz [Použití členů](#member-usage) ). Pod ním průvodce varuje, že někdo, kdo ví, jakou klávesu používal, může k této klávese přiřadit pruh. Když je políčko zaškrtnuté, říká to, když krok uvádí méně než tři nebo více než 20 kláves, protože pruhy pak zůstanou skryté. Počítá klíče v kroku a nedokáže říct, který z nich může zadávat požadavky.

### `/dashboard/costs/quota-share/plans` — Konfigurace plánu poskytovatele

- `ProviderPlanConfigClient.tsx`: rozevírací seznam pro výběr poskytovatele, zobrazení vyřešeného plánu (automaticky z katalogu nebo ruční přepsání) a úpravu rozměrů.
- Změny zapište do `PUT /api/quota/plans/[connectionId]`.
- Smazání se vrátí do katalogu nebo prázdného plánu.

---

## Samoobslužná kvóta API (přihlášení)

`GET /api/v1/me/quota/{provider}` (také poskytováno na `/v1/me/quota/{provider}`) umožňuje držiteli klíče API číst pomocí vlastního klíče, kolik ze sdíleného předplatného je jeho a co ho blokuje. Trasa je tenká skořápka přes `src/server/selfService/quotaHandler.ts`; pohled je vytvořen `src/lib/quota/selfView.ts` a jeho kontrakt odezvy je `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` v `docs/openapi.yaml`).

### Povolení a ověření

- Příznak funkce `QUOTA_SELF_PANEL`, výchozí `false`. Když je vypnuto, požadavek, který dosáhne trasy, dostane 404. Se `REQUIRE_API_KEY=true` zásada API klienta odmítne chybějící nebo neplatný klíč s 401 před spuštěním trasy, bez ohledu na příznak. Požadavek bez klíče, ale s přihlášenou relací řídicího panelu projde touto zásadou a získá vlastní odpověď trasy. Příznak se vyhodnotí jako každý jiný příznak (dashboard nebo přepsání REST, poté proměnná prostředí se stejným názvem); viz [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Zobrazovaný název každého fondu a štítek každého plánu jsou vráceny držitelům klíčů fondu přesně tak, jak je zapsal správce. Před zapnutím vlajky zkontrolujte, zda je vhodná pro čtení těmito držáky klíčů.
- Klíč se čte pouze ze záhlaví: `Authorization: Bearer <key>` nebo `x-api-key: <key>`. Když jsou odeslány obě, použije se první, která se ověřuje. Klíč v řetězci dotazu nebo cookie je ignorován. Klíč prostředí serveru je odmítnut (401).
- Klíč potřebuje rozsah `self:usage` (403 bez něj).
- Segment poskytovatele je oříznut, malá písmena a zkontrolována proti `^[a-z0-9][a-z0-9._-]{0,63}$` (v opačném případě 400), poté vyřešena prostřednictvím registru poskytovatelů, takže alias jako `cc` čte fondy `claude`. `claude` a `anthropic` čtou stejné fondy.

### Co každá viditelnost ukazuje

| Viditelnost   | Vyžaduje                                                                          | Pole                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vlastní podíl | `self:usage`                                                                      | `pools[]` (ref, jméno, poskytovatel, politika, váha, strop), `dimensions[].yourShare`, `accounts[]` se `yourShare` (v okně `percent` bez `attributed` a `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                |
| Úroveň účtu   | `self:usage` + `self:account-quota` a poskytovatel v `sharedQuotaProviders` klíče | přidá `dimensions[].total`, `accounts[].dimensions[].account` a `accounts[].modelWindows`, `attributed` a `external` do `yourShare` okna `percent` a `members` do fondu se zapnutým využitím členů (viz [Používání členů](#member-usage) ) |

- `sharedQuotaProviders` je nastavení na klíč (`PUT /api/keys/[id]/self-service`): `null`, výchozí, znamená každého poskytovatele, kterého klíč dosáhne; `[]` znamená žádné. `accountVisible` každého fondu říká, která viditelnost se na něj vztahuje.
- Účtové lišty a modelová okna se zobrazují pouze pro účty, jejichž spojení smí klíč používat. Když má klíč seznam povolených připojení, účet mimo něj si ponechává svůj záznam `Account N` bez `account` nebo `modelWindows`. Prázdný seznam znamená žádné omezení, jako u `/v1/me/status`. Součet fondu (`dimensions[].total`) nezávisí na tomto seznamu.
- Dvě postavy zobrazené pouze se `self:usage` pocházejí z použití jiných klíčů. `exhausted` rozpočtu plánu odráží spotřebu každého klíče v rámci tohoto plánu. Ve fondu, jehož váhy jsou nulové, je `weight` klíče `100 / number of members`. Obojí platí pro klíč.
- Fond je identifikován pouze pomocí `ref`, neprůhledné hodnoty vázané na volací klíč. Jeho zobrazovaný název (`name`) je zahrnut tak, jak jej administrátor napsal. `ref` je odvozeno z klíče a fondu s tajemstvím klíče API serveru (`API_KEY_SECRET`). Klienti jej nesmí uchovávat: změní se, pokud se toto tajemství otočí.
- Účty jsou uvedeny jako `Account 1`, `Account 2`, … v pořadí skupiny. Není vráceno žádné ID fondu, ID připojení, e-mail účtu nebo název účtu a odpověď prochází schématem smlouvy, které vynechá všechna pole mimo něj.
- Počitatelné jednotky (`requests`, `tokens`, `usd`) jsou hlášeny jako skupina fondu, kterou brána kvóty vynucuje: `limit` = limit plánu × účty ve fondu, `fairShare` = váha / 100 × `limit` (rovné rozdělení `consumed` když je každá váha 0), `consumed` = vlastní počítadlo klíče v obchodě kvóty, `remaining` = `fairShare` − 0.
- `blocks.schedules` uvádí seznam oken plánu klíče (`open`/`closed`, `blackout` nebo `outside-window`, `retryAfterSeconds`, rezervovaná podlaží a zda je rozpočet okna vyčerpán); `blocks.modelCaps` uvádí své hodinové limity na model se spotřebou.
- Klíč mimo každý fond poskytovatele dostane 200 s `pools: []`; `availableModels` (ID `qtSd/`, který klíč vidí v `/v1/models`), `expiresAt` a `apiBaseUrl` jsou stále vyplněny.
- `apiBaseUrl` je `OMNIROUTE_PUBLIC_API_BASE_URL`, pak `OMNIROUTE_PUBLIC_BASE_URL`, jinak `null`. Nikdy nejde o vlastní původ žádosti.

### `status` a `reason`

| `status`      | Význam                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ok`          | Aktuální čtení.                                                                                                                                                                                                                                                                                                                                                    |
| `stale`       | Čtení účtu uloženého v mezipaměti označené jako zastaralé nebo účet, jehož doba resetování od přečtení uplynula. Čísla jsou zachována. Jedno modelové okno, jehož resetovací čas uplynul, označuje celou skupinu `modelWindows` `stale`. Pro vlastní podíl klíče v okně `percent` : kniha byla přečtena bez načtení účtu v mezipaměti brány, který by to potvrdil. |
| `unavailable` | Žádné čtení; čísla jsou `null`, nikdy `0`. `reason` říká proč.                                                                                                                                                                                                                                                                                                     |

| `reason`                          | Když                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Úložiště kvót nelze číst nebo nemůže číst knihy s uvedením zdroje.                                                           |
| `percent_attribution_unavailable` | Vlastní podíl klíče v okně `percent` : pro tento účet a okno zatím neexistuje žádná kniha přiřazení nebo kniha klíč neuvádí. |
| `percent_window_ended`            | Vlastní podíl klíče v okně `percent` : kniha patří do okna plánu, které skončilo.                                            |
| `account_not_used_by_key`         | Vlastní podíl klíče v okně `percent` : připojení účtu je mimo povolená připojení klíče. Jeho kniha se nečte.                 |
| `window_not_reported`             | Mezipaměť limitů poskytovatele nemá pro toto okno plánu žádné čtení.                                                         |
| `connection_lookup_failed`        | Připojení účtu nelze přečíst.                                                                                                |
| `not_supported`                   | OmniRoute nemůže číst limity využití pro poskytovatele účtu.                                                                 |
| `fetch_failed`                    | Nebylo použitelné žádné čtení z mezipaměti a obnovení limitů poskytovatele se nezdařilo.                                     |
| `not_available`                   | Čtení nenese žádná okna použití nebo účet nemá žádné čtení.                                                                  |

Pokud nelze číst úložiště kvót, jsou také `null` zálohovaná pole `blocks` ( `exhausted` rozpočtu plánu, `consumed` a `reached` modelového stropu).

### Souhlas s půjčováním

`PATCH /api/v1/me/quota/{provider}` zaznamenává vlastní souhlas volacího klíče pro jeden fond. Používá příznak, hlavičky a pravidla poskytovatele `GET`. Rozsah `self:usage` opravňuje tento zápis, ačkoli jeho název je pouze pro čtení.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` je `ref`, které `GET` vrátí pro daný fond.
- `lendingPercent` je celé číslo od 0 do 100. Hodnota 0 vymaže souhlas a jeho termín. Tělo s `lendingPercent` 0 je akceptováno v obou režimech.
- `lendingUntil` je volitelné: epocha milisekundy, nebo `null` bez uzávěrky. Musí to být v budoucnosti a maximálně 8640000000000000. Hodnota pod 100000000000 se čte jako sekundy a je odmítnuta.
- Jakékoli jiné pole je odmítnuto. Tělo delší než 4096 bajtů je odmítnuto. Čtení se při této velikosti zastaví, takže delší tělo není nikdy drženo celé.

Kontroly probíhají v pořadí podle této tabulky. Každé odmítnutí používá standardní chybové tělo s pevnou zprávou. Odmítnutí jednou z těchto kontrol nic nenapíše.

| Postavení | Zpráva                                                                                             | Když                                                                  |
| --------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 404       | `Not found`                                                                                        | Vlajka `QUOTA_SELF_PANEL` je vypnutá.                                 |
| 401       | `Valid API key required`                                                                           | Klíč chybí nebo je neplatný nebo se jedná o klíč prostředí serveru.   |
| 403       | `API key lacks the self:usage scope`                                                               | Klíč postrádá `self:usage`.                                           |
| 400       | `Invalid provider`                                                                                 | Segment poskytovatele je neplatný.                                    |
| 429       | `Too many lending changes. Retry later.`                                                           | Klíč překročil svůj limit. Odpověď nese `Retry-After`.                |
| 400       | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Tělo není JSON, je příliš dlouhé nebo neodpovídá schématu.            |
| 400       | `lendingUntil must be a Unix time in milliseconds`                                                 | Termín se čte jako sekundy.                                           |
| 400       | `lendingUntil must be in the future`                                                               | Termín je v době žádosti nebo před ní.                                |
| 404       | `Pool not found`                                                                                   | `ref` nepojmenovává žádný fond tohoto klíče pro tohoto poskytovatele. |
| 403       | `Lending is not enabled for this pool`                                                             | Fond je v režimu `saturation` a `lendingPercent` je nad 0.            |
| 500       | `Failed to build quota view`                                                                       | Jakékoli jiné selhání. Jeho příčina je zaznamenána na serveru.        |

Limit je 20 požadavků za 60 sekund pro každý klíč. Každý požadavek, který projde kontrolou poskytovatele, se počítá, dokonce i ten, který byl později odmítnut nebo který nic nemění. Má vlastní počítadlo, kromě limitu rychlosti požadavku klíče.

Požadavek, který změní uložený souhlas, zapíše jeden záznam auditu `quota.pool.lending.updated`. Pojmenuje klíč se starou a novou hodnotou. Stejné tělo odeslané dvakrát jednou zapíše a jednou audituje. Odpověď je 200 s úplným zobrazením `GET`, vytvořeným po zápisu.

Pohled `GET` uvádí půjčování takto:

- Každý fond nese `borrowMode` (`saturation` nebo `consent`) a vlastní klíč `lendingPercent` a `lendingUntil`.
- `lendingActive` je `true` pouze ve fondu `consent`, s procentem vyšším než 0 a termín není dosažen.
- Ve fondu `consent` nese každý počitatelný `dimensions[].yourShare` `borrowAvailable`. To je to, co nyní může klíč používat nad svým podílem, propůjčeným ostatními klíči.
- `borrowAvailable` používá vzorec brány. Přečte každý druhý klíč, i když je klíč pod jeho podílem. Pro klíč `hard`, který je o jedno čtení navíc na jiný klíč a spočítatelný rozměr, paralelně.
- `borrowAvailable` je `null` pro klíč `soft` nebo `burst` a `null`, když čtení selže.
- `borrowAvailable` je jedna číslice pro všechny ostatní klíče dohromady. Ve skupině dvou klíčů je to vlastní postava druhého klíče.
- `borrowAvailable` zatím není hlášeno pro okna `percent` ani v `accounts[]`.
- Ve fondu `saturation` pohled hlásí uložený souhlas se `lendingActive: false` a bez `borrowAvailable`.

### Chyby

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Omezení

- `remaining` je část spravedlivého podílu klíče, kterou nepoužil. Není to záruka. Dokud má bazén místo, může být klíč doručen i mimo něj. Jakmile součet fondu dosáhne `limit`, každý klíč fondu je odmítnut, ať už je jeho vlastní `remaining`, a klíč bez `self:account-quota` tento součet neuvidí.
- `remaining` nebere v úvahu absolutní `cap` přidělení. Enforcement odmítne klíč, jakmile jeho vlastní spotřeba v okně jednotky uzávěru dosáhne hodnoty uzávěru.
- Lišta na úrovni účtu pochází z mezipaměti limitů poskytovatele a může zpozdit rozhodnutí o vynucení o několik minut. Údaj, jehož resetovací čas uplynul, je hlášen jako `stale`.
- Okna podle modelu (`modelWindows`) jsou hlášena pouze pro poskytovatele, kteří mají mapování oken plánu: Claude a Codex dnes. U ostatních poskytovatelů je `modelWindows` stále přítomen, když jsou zobrazena data účtu, s prázdným seznamem `windows`.
- Vlastní podíl klíče v okně `percent` je odhad. Pochází z knihy atribuce a nese všechna omezení uvedená výše v části „Procentuální dimenze: atribuce na klíč“.
- `consumed` je počet srovnatelný se spravedlivým podílem. Je to `attributed` plus `external`, přesně tak. `attributed` je část, které kniha dává klíč k tokenům, které směrovala. `external` je klíčová část použití účtu, kterou klíče fondu nezohledňují.
- Obě části jsou odeslány pouze tehdy, když je `accountVisible` fondu pravdivé: klíč má `self:account-quota` a poskytovatel je ve svém `sharedQuotaProviders`. Klíč bez něj získá `consumed` samostatně, se stejnými `status` a `reason`.
- S oběma díly a vlastní hmotností může držák vyřešit použití mimo bazén, které se účtuje na klíče od bazénu. Držitel s rozsahem účtu již vidí součet účtu.
- Klíč, který v okně nic nesměroval, může stále číst svůj externí náboj z `consumed`, protože jeho přiřazená část je pak 0.
- Například kniha se otevře v 0, s klávesami A a B o hmotnosti 50 každý. Klíč A směruje 900 000 tokenů a klíč B 100 000. Účet pak dosáhne 60 % limitu 100. Pak je `attributed` 54 pro klíč A a 6 pro klíč B a `external` je 0 pro oba.
- Pohled čte knihu a nikdy nenapíše její stav. Neotevře knihu a nikdy nepožádá poskytovatele o přečtení. S úložištěm Redis čtení odstraňuje nahrazená pole revizí na pozadí, jako to dělají čtení brány.
- Sdílení je `ok` pouze v době, kdy mezipaměť brány obsahuje čtení účtu. Bez něj je to `stale`, takže ve fondu bez nedávného požadavku se zobrazuje jako možná zastaralý.
- Dokud požadavek neprojde fondem, sdílená položka není k dispozici. Tento požadavek otevře knihu a částka účtu v daném okamžiku se počítá jako použití mimo fond.
- Ve fondu s několika účty používá každý záznam účtu vlastní knihu a limit jednoho účtu. Vymáhání se měří na obou stranách podle počtu účtů, takže poměr je stejný.
- Okna jednotlivých modelů nenesou žádný klíč pro klíč. Kniha neuchovává žádná data podle modelu.
- Minimální rezervy plánu nejsou pohledem vyhodnoceny: plán se může zobrazit jako `open` když je požadavek odmítnut s důvodem `schedule-reserve`.
- Když dva fondy stejného klíče sdílejí připojení, vynucení použije jeden z nich a zobrazení uvádí oba.
- Neexistuje žádný limit na adresu na neúspěšné pokusy o klíče: volající za reverzní proxy mohou sdílet jednu adresu (záleží na tom, zda jsou adresy předávaných klientů důvěryhodné), takže uzamčení může odmítnout cestu ke každému držiteli klíče. U `REQUIRE_API_KEY=true` je neplatný klíč odmítnut klientskou zásadou API před spuštěním trasy, s tělem této zásady 401 namísto těla této trasy.

### Využití členů

Správce může držitelům klíčů umožnit, aby viděli, jak se použití okna rozděluje mezi členy fondu. Tato možnost je `memberBreakdown` fondu, ve výchozím nastavení vypnutá. Nastavuje se v průvodci bazénem nebo pomocí `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` a `GET /api/quota/pools/{id}` to nahlásí.

Dimenze pohledu nese `members` pouze tehdy, když platí všechny tyto podmínky:

- možnost bazénu je zapnutá
- fond má maximálně 20 přidělených klíčů a alespoň tři z nich mohou zadávat požadavky: aktivní, neodvolané, nezabanované a bez vypršení platnosti
- `accountVisible` fondu je pravdivá: klíč má `self:account-quota` a poskytovatel je v jeho `sharedQuotaProviders`
- v okně `percent` je připojení účtu jedním z klíčů, které může používat
- byl přečten vlastní podíl klíče tohoto okna: jeho `status` není `unavailable`

Jinak `members` chybí. Nikdy to není prázdný seznam.

- Každý plátek je `{ slot, consumed, isYou }`. Schéma odezvy odmítá jakoukoli jinou vlastnost na řezu a seznamu více než 20 řezů. Řezy jsou uvedeny v pořadí slotů.
- Na každý přidělený klíč je jeden řez, včetně klíče, který již nemůže zadávat požadavky. Člen bez použití ukazuje skutečnou nulu.
- Slot 1 je vždy požadovaný klíč, s `isYou` true. Ostatní čísla slotů jsou hodnosti klíčového hashe. Je klíčován `API_KEY_SECRET` a pokrývá pool, dotazovací klíč a člena.
- Čísla tedy mezi držáky nejsou v řadě. Pro jednoho držitele zůstávají mezi návštěvami stejné. Mohou se změnit, když se klíč připojí nebo opustí bazén, nebo když se toto tajemství otočí.
- V počitatelném okně je řez počítadlem člena v úložišti kvót, stejným počítadlem jako jeho vlastní `consumed`.
- V okně `percent` je řez částí `attributed` člena ze stejné knihy přečtené jako vlastní podíl klíče. Použití mimo bazén se nikdy nerozděluje na plátky. Tato nálož je rozdělena podle hmotnosti, takže řezy, které ji nesly, by ukazovaly hmotnosti.
- Každý pohled čte paralelně jednu hodnotu na další člen a spočítatelné okno. V okně `percent` plátky nestojí žádné přečtení kromě přečtení vlastní knihy podílníka. Když nelze přečíst jednu hodnotu, toto okno nemá `members` a vlastní sdílení klíče zůstává.
- Možnost a počet použitelných klíčů se načítají jednou za fond a pouze pro klíč, který může vidět data účtu. Selhání čtení možnosti nebo počtu použitelných klíčů vypne sloupce pro daný fond. Server zaprotokoluje varování a vytvoří se zbytek zobrazení.

Tyče nenesou žádná jména ani ID. Stále říkají držiteli klíčů věci o ostatních členech:

- Držitelé mohou stále porovnávat řezy podle jejich hodnot.
- Stabilní číslování umožňuje držiteli sledovat jednoho člena v průběhu času.
- Počet řezů ukazuje, kolik klíčů je alokováno ve fondu.
- Ve skupině tří klíčů může někdo, kdo ví, jaký klíč byl použit, říct, jaký klíč používal poslední.
- Když bazén klesne pod tři použitelné klíče, pruhy zmizí. Pohledy pořízené dříve stále ukazují, co každý člen používal.
- V počitatelném okně může součet fondu mínus řezy ukazovat použití klíčů, které již nejsou přiděleny.
- Člen, který ukazuje nulu na jednom účtu a použití na jiném, může ukázat, který člen používá který účet.
- V počitatelném poolu s politikou `hard` plátek, který přestane růst při spravedlivém podílu člena, naznačuje váhu tohoto člena.

### Série použití (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (obsluhováno také na `/v1/me/usage`) vrací využití a cenu vlastních požadavků volacího klíče: součty, jeden záznam na den UTC, na den a model, na model a na poskytovatele. Sdílí příznak, pravidla ověřování, rozsah `self:usage`, `Cache-Control: no-store` a chybové chování výše uvedené trasy kvót. Klíč je zkontrolován před `range`. Chyby jsou 400 (`Invalid range`), 401, 403, 404 a 500 (`Failed to build usage`).

- `range` je jedno z `1d`, `7d`, `30d` (výchozí) nebo `90d`. Jakákoli jiná hodnota, prázdná hodnota nebo opakovaný parametr je 400. Sada se zastaví na `90d`, aby se omezila cena hovoru. Zobrazení čte pouze nezpracovanou historii používání, nikoli denní souhrny, které nenesou žádný klíč.
- Řádky jsou vybírány podle ID volajícího klíče. Sloupec názvu klíče se nikdy neshoduje a řádky zaznamenané bez ID klíče se nikdy nepočítají.
- Vytvoření série spustí pět seskupených dotazů nad řádky klíče v okně. Sestavená série je znovu použita po dobu 60 sekund na klíč a rozsah a znovu použitý hovor neproběhne. Jeho `generatedAt` udává jeho věk.
- Okno končí, když je série sestavena. Řádek označený později, například zkosením hodin, se nepočítá.
- `coverage.retentionDays` je nezpracované nastavení zachování historie použití operátora (`retention.usageHistory` v nastavení databáze). `coverage.truncatedByRetention` je pravda, když je požadovaný rozsah delší než toto nastavení. Porovnává dvě čísla a nekontroluje, zda řádky skutečně chybí.
- Poskytovatel je vrácen jako zaznamenaný pro vlastní požadavky klíče. Model je zaznamenaný název po jeho posledním `/` a řádky jsou podle něj seskupeny. Kombinovaný požadavek, jehož každý cíl byl odmítnut, je zaznamenán se směrovacím štítkem jako poskytovatel (název combo, `auto` nebo `combo`) a modelovým řetězcem, který klient odeslal. Jiné odmítnuté požadavky, například přerušeným jističem, cooldown modelu nebo kvótově zaparkovaným skipem, si ponechávají cílového poskytovatele a model.
- Kromě počtů a nákladů nese odpověď průměrnou latenci, úspěšnost a časy prvního a posledního požadavku.
- `byModel` uvádí 50 párů poskytovatele a modelu s největším počtem požadavků. S více páry se jeho položky nesčítají do `summary` a `summary.uniqueModels` počítá každý zaznamenaný pravopis modelu. `byModelTruncated` je pak pravdivé a model, jehož dvojice padají na obě strany řezu, ukazuje částečné součty.
- Jsou hlášeny dva náklady. `costUsd` jsou účtované náklady, jak ukazují analýzy využití. Poskytovatelé paušálního předplatného, jako je Claude kódový plán, tam počítají 0 $. `listPriceUsd` je stejná cena za použití podle katalogové ceny, včetně předplatného. Požadavek, jehož model nemá žádný řádek s cenou, počítá své uložené náklady: náklady, které poskytovatel nahlásil, nebo náklady vypočítané při zaznamenání požadavku. Pouze požadavek, který nemá žádný počet 0, bez značky, takže součet může být částečný.
- Kontrakt odpovědi je `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` v `docs/openapi.yaml`).

### Samoobslužná stránka

Se zapnutým `QUOTA_SELF_PANEL` je `/quota/{provider}` veřejná stránka. Držitel klíče tam zadá klíč API a uvidí fondy tohoto klíče pro poskytovatele. Každý fond zobrazuje jednu kartu na okno fondu, přičemž fond je použit pro všechny a vlastní podíl klíče. Každý účet fondu má své vlastní karty s použitím účtu a podílem klíče. Použití účtu se zobrazí pouze v případě, že klíč může vidět data účtu. Na stránce jsou také uvedeny limity na model každého účtu a vlastní použití klíče. Když plán právě teď blokuje klíč, zobrazí se upozornění. Karta obsahuje seznam všech víček klíče podle modelu s jejich použitím a označuje ty, kterých bylo dosaženo. `{provider}` je id poskytovatele nebo jeho alias (`/quota/claude`, `/quota/cc`). Neznámý poskytovatel a každá cesta `/quota/*`, když je příznak vypnutý, odpoví 404. Fondy na vlastním uzlu kompatibilním s OpenAI nebo Anthropic nemají žádnou stránku. API za ně stále odpovídá.

Stránka nemá žádnou relaci. Klíč je odeslán pouze v hlavičce `Authorization` `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` a `GET /api/v1/me/usage`, nikdy v URL. Klíč, který server akceptuje, je uložen v `sessionStorage` na kartě. Pomocí možnosti „Zapamatovat na tomto zařízení“ se místo toho uchovává v `localStorage` a „Zapomenout klíč“ jej z obou odstraní. Klíč, který server odmítne, je odstraněn z úložiště.

Skupina v režimu `consent` zobrazuje půjčovací kartu. Tam držitel klíče nastaví celé procento od 0 do 100 nečinného podílu klíče k zapůjčení. Držitel také volí, jak dlouho bude souhlas trvat: do vypnutí, 1 hodina, 8 hodin, 24 hodin, 7 dní nebo 30 dní. Doba trvání se počítá od okamžiku uložení. Po dobu platnosti lhůty ji držitel může dodržet. Pokud tato lhůta uplyne před uložením, karta nic neodešle a požádá o jinou volbu. S 0 % není odeslána žádná uzávěrka. Karta zobrazuje uloženou uzávěrku s pojmenovanou časovou zónou. Souhlas, jehož lhůta uplynula, se zobrazuje jako ukončený.

U klíče `hard` karta také uvádí, pro každé okno fondu, jaké další klíče právě půjčují klíči. Každý řádek je jedna číslice pro všechny ostatní klíče dohromady. Ve skupině dvou klíčů je to vlastní postava druhého klíče. Číslo, které pohled neuvádí, se čte jako nedostupné, nikoli jako nulové. U klíče `soft` nebo `burst` karta říká, že neplatí žádný údaj.

Fond v režimu `saturation`, jehož klíč obsahuje procento nad 0, ukazuje pouze výběr. Píše to, že tam uložené procento nemá žádný vliv. Jeho tlačítko Vybrat odešle 0 bez termínu. Fond v režimu `saturation` s uloženou 0 nezobrazuje žádnou výpůjční kartu. Po uložení zůstane karta, kterou vrácený pohled již nepotřebuje, se svou zprávou, dokud se zobrazení stránky znovu nezmění.

Nic se neuloží, dokud držitel nestiskne Uložit nebo Vyjmout. Každé stisknutí odešle jeden požadavek `PATCH /api/v1/me/quota/{provider}` a druhé stisknutí neodešle nic, zatímco první čeká. Tělo nese neprůhledný `ref` bazénu z pohledu, procenta a uzávěrky. Odpovědí je přestavěné zobrazení kvóty a stránka jej zobrazí bez dalšího čtení. Když se dvě uložení překrývají, stránka přečte kvótu jednou po poslední odpovědi. Stránka neuchovává souhlas v úložišti prohlížeče.

Odmítnutá změna je na kartě vysvětlena textem vybraným ze stavu HTTP. Tělo chyby se nečte. 401 říká, že klíč nebyl přijat a znovu načte kvótu. 403 říká, že fond nepřijímá změny půjček a 404 říká, že fond je pryč. Oba nabízejí tlačítko, které znovu načte kvótu. Odpověď 400 nebo jiná 4xx žádá držitele o kontrolu procenta a termínu. A 429 požádá držitele, aby počkal, s sekundami `Retry-After` když jim odpověď dá. Odpověď 5xx, 408 nebo selhání sítě říká, že změna možná nebyla uložena, a uchovává zadané hodnoty. Odpověď mimo smlouvu znovu načte kvótu. Neúspěšné uložení neodstraní klíč sám o sobě. Když je opětovné načtení po odmítnutí, stránka odstraní klíč jako při každém odmítnutém čtení.

Jakmile je klíč přijat, na stránce se také zobrazí karta „Nastavit nástroje“ se třemi kartami. „Kód Claude “ udává blok `env` pro `~/.claude/settings.json`. "Shell" poskytuje stejné proměnné jako řádky `export`. "Claude Desktop" udává hodnoty pro své inferenční okno třetí strany. Modely jsou modely sdílení kvót, které může klíč vyžadovat pro daného poskytovatele. Pokud s klíčem není žádný takový seznam, blok místo toho zapne zjišťování modelu brány. Adresa brány je veřejný původ API který server hlásí (`OMNIROUTE_PUBLIC_API_BASE_URL`, poté `OMNIROUTE_PUBLIC_BASE_URL`). Pokud není nastaveno ani jedno, na kartě se zobrazí zástupný symbol a držiteli se řekne, aby se zeptal správce. Klíč je zobrazen jako zástupný symbol. "Zahrnout můj klíč" vloží celý klíč do textu na obrazovce a do toho, co kopíruje tlačítko kopírování. To trvá, dokud není pole vymazáno, klíč zapomenut nebo nahrazen, nebo dokud není stránka opuštěna. Karta neodesílá žádný požadavek a nenabízí žádné stahování souborů.

Čtení značek API `stale` se zobrazuje jako možná zastaralé. Čtení, které označuje `unavailable` je zobrazeno se svým důvodem, nikdy jako nula.

Na procentuálních plánech stránka vykreslí vlastní podíl klíče, když to API nahlásí. Říká, že číslo je odhad a pojmenovává jeho dvě části. Limity na model zobrazují pouze účet.

Když okno nese `members`, jeho karta také zobrazuje pruh s jedním segmentem na člena v pořadí slotů. Segment dotazovací klávesy používá barvu zvýraznění. Ostatní segmenty cyklicky procházejí barvami grafu tématu. Textová legenda uvádí každý segment s jeho hodnotou, takže nic nezávisí na barvě. Segmenty jsou označeny `You` nebo `Member N`, kde N je slot.

### Vyhrazený port pro stránku

`QUOTA_PANEL_PORT` otevře druhý posluchač, který obsluhuje pouze samoobslužnou stránku. Pokud není nastavena proměnná, je vypnutá. `QUOTA_PANEL_HOST` je adresa vazby a výchozí je `127.0.0.1`.

Posluchač předá tyto cesty hlavnímu portu a odpoví 404 pro každou další cestu:

| Cesta                                                                    | Slouží                              |
| ------------------------------------------------------------------------ | ----------------------------------- |
| `/quota/{provider}`                                                      | Stránka                             |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Zobrazení kvóty, kterou stránka čte |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Série použití, kterou stránka čte   |
| `/_next/static/`                                                         | Skripty, styly a fonty sestavení    |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | ikony                               |

`GET` a `HEAD` jsou přenášeny bez těla. Odesílá se také jeden požadavek s tělem: `PATCH` cesty zobrazení kvóty, které stránka odešle, aby se uložila volba půjčování. Jakákoli jiná metoda odpovídá 404, kromě požadavku CONNECT, jehož spojení je uzavřeno bez odpovědi. Jakýkoli další požadavek, který deklaruje tělo, odpoví 404 a jeho spojení je uzavřeno. Požadavky na upgrade jsou odmítnuty a jejich připojení je uzavřeno. Cesta s tečkovým segmentem nebo značkou fragmentu je odmítnuta, jako na portu API. Stejně tak cíl požadavku se znakem mimo tisknutelný ASCII. Nezpracovaný řídicí znak v cíli je zodpovězen 400 analyzátorem HTTP před vlastní kontrolou tohoto portu. Záhlaví požadavků, které si framework vyhrazuje pro své vlastní použití, se nepředávají: názvy začínající na `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` nebo `x-next-` a názvy `x-matched-path` a `next-resume`. Požadavek je předán bez nich. Dashboard, přihlašovací stránka, management API a inferenční cesty nejsou dostupné přes tento port.

`PATCH` musí nést `Content-Type: application/json`, bez parametru nebo pouze se `charset=utf-8`. Musí obsahovat jedno `Content-Length` od 1 do 4096, zapsané jako obyčejné číslice, a žádné `Transfer-Encoding`. `PATCH`, který poruší jedno z těchto pravidel, odpovídá 404. Některé nesprávně tvarované délky, jako je podepsané nebo opakované, jsou zodpovězeny 400 analyzátorem HTTP před vlastní kontrolou tohoto portu. Port přečte deklarované bajty předtím, než kontaktuje hlavní port, a čeká na ně maximálně 5 sekund. Těleso, které do té doby není kompletní, odpoví 404 a jeho spojení je uzavřeno. V takovém případě nic nedosáhne hlavního portu nebo když klient odejde jako první. Port přenáší přesně deklarované bajty se stejným `Content-Length`. Bajty za nimi jsou načteny jako další požadavek na připojení. Reverzní proxy TLS vpředu musí přeposílat `Content-Length` a nesmí znovu rozdělit tělo požadavku. Hlavní port kontroluje klíč API v záhlaví `Authorization`, stejně jako `GET`.

Tělo 404 je `{"error":"not_found","message":"Not found."}`. Selhalo relé odpoví 502 (`api_bridge_unavailable`) nebo 504 (`api_bridge_timeout`) bez pole `detail`.

Posluchač nečte `QUOTA_SELF_PANEL` a nezapne stránku. Když je příznak vypnutý, stránka a její API odpoví 404 na hlavním portu a posluchač tuto odpověď přenese.

Pod vývojovým serverem (`next dev`) se stránka nestane interaktivní prostřednictvím tohoto portu. Vývojový hot-reload socket je požadavek na upgrade a port jej odmítne. Při vývoji použijte hlavní port.

Port obsluhuje prosté HTTP a stránka posílá klíče API. Ponechte výchozí adresu vazby a vložte před ni reverzní proxy se TLS. Vazebná adresa jiná než zpětná smyčka zaprotokoluje toto upozornění:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Protějšek se zpětnou smyčkou, který neposílá žádnou předávací hlavičku, se na hlavním portu počítá jako místní. Takže proxy na stejném hostiteli musí odeslat `X-Forwarded-For`. Proxy na soukromé adrese je důvěryhodný pro tuto hlavičku pouze s `OMNIROUTE_TRUST_PROXY=private` (nebo `lan`). Jakýkoli jiný peer je hlášen pomocí adresy svého připojení a hlavičky pro předávání, které odeslal, jsou vynechány.

Posluchač drží maximálně 256 spojení najednou. Klient má 10 sekund na odeslání záhlaví požadavku a 30 sekund na odeslání celého požadavku. Nečinné, udržované připojení se asi po 5 sekundách uzavře. Spojení bez aktivity po dobu 60 sekund je uzavřeno. Tyto hodnoty jsou pevné. Nastavte limity připojení a rychlosti také na reverzní proxy vpředu. Reverzní proxy na přední straně by měla udržovat nečinná upstream připojení po dobu kratší než 5 sekund, nebo je znovu nepoužívat. Přenos na hlavní port využívá upstream timeouty portu API (`API_BRIDGE_*`).

Posluchač se také spustí, když není nastaveno `API_PORT`. `QUOTA_PANEL_PORT` musí být port od 1 do 65535, zapsaný pouze číslicemi. Musí se lišit od portu palubní desky a portu API. Když je aktivní server WebSocket zapnutý, musí se také lišit od `LIVE_WS_PORT` (výchozí 20132). Jakákoli jiná hodnota nic neotevře a zaprotokoluje varování. Upozornění na odmítnutou hodnotu pojmenuje proměnnou a hodnotu neopakuje. Port, který se již používá, nic neotevře a zaznamená toto varování:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

S nastaveným `OMNIROUTE_BASE_PATH` posluchač očekává každou cestu nahoře pod tímto prefixem. Použijte stejný `OMNIROUTE_BASE_PATH` v době sestavení a v době běhu. Napište to s úvodním lomítkem a bez koncového lomítka, například `/omniroute`. Jiný tvar, včetně `/` a `/omniroute/`, nechává port vypnutý s varováním, ačkoli sestavení tyto formuláře přijímá. Stejně tak základní cesta, jejíž první segment pojmenovává aplikační trasu: v každém případě `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` nebo `connect`.

Omezení:

- `/quota/{provider}/` s koncovým lomítkem odpovídá 404 na tomto portu.
- Service worker a manifest webové aplikace se na tomto portu neobsluhují.
- Vlastní favicon nastavená na řídicím panelu se na tomto portu nezobrazuje.
- Ikony se nezobrazují, když aplikace běží pod základní cestou.
- V přístavu se mluví obyčejně HTTP/1.1.
- Vazba, která se nezdaří, není opakována, dokud se proces nerestartuje.
- Posluchač nemá žádné připojení ani omezení rychlosti na adresu klienta.
- Tato část nepokrývá nastavení kontejnerů.

---

## Proměnné prostředí

| Variabilní                           | Výchozí         | Popis                                                                          |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`        | Použitý ovladač: `sqlite` nebo `redis`                                         |
| `QUOTA_STORE_REDIS_URL`              | _(prázdný)_     | Redis URL, např. `redis://localhost:6379`                                      |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`           | 0..1; `>= threshold` aktivuje přísný režim                                     |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`          | Tokeny, které vysvětlují nejvýše jeden bod okna procentního plánu              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`           | 0..1; multiplikátor pro kombinované skóre měkkých zásad                        |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`            | Dny předtím, než GC odstraní staré kbelíky `quota_consumption`                 |
| `QUOTA_PANEL_PORT`                   | _(nenastaveno)_ | Vyhrazený port pro samoobslužnou stránku. Nenastaveno znamená žádný posluchač. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`     | Svázat adresu pro tento port                                                   |

DB settings (`quotaStore.*`) přepíše env vars.

---

## Řešení problémů

### Redis je nakonfigurován, ale nepřipojuje se

Ověřte, že je nainstalován `ioredis` (`npm ls ioredis`) a že je
`QUOTA_STORE_REDIS_URL` dostupná. Při selhání připojení se továrna přepne zpět
na SQLite (zaznamenáno na úrovni `warn`).

### `peek` vrací zastaralé výsledky / povoluje při selhání

Pokud `peek` vyvolá výjimku, `enforceQuotaShare` považuje výsledek za „povolit“
(fail-open). Zkontrolujte v protokolech `pino` záznamy `quota:enforce`
a `quota:factory`, abyste určili hlavní příčinu.

### Odchylka čítače spotřeby

Pokud se skutečné využití poskytovatele liší od čítačů, je to očekávané —
klouzavé okno se 2 intervaly má na hranicích okna chybu přibližně 1 % a `consume`
se po odeslání odpovědi spouští bez čekání na dokončení. Signál saturace
(`saturationSignals.ts`) načítá skutečné využití poskytovatele s TTL 30 s
a podle toho upravuje `globalUsedPercent`.

### Fond zobrazuje „žádná data“ pro rychlost spotřeby

`computeBurnRate` vyžaduje alespoň 2 historické vzorky. Nové fondy bez předchozích
volání `consume` budou zobrazovat `tokensPerSecond: 0` a `timeToExhaustionMs: null`.

---

## Migrace z localStorage

Při prvním načtení `/dashboard/costs/quota-share` hook `useLocalStoragePoolMigration`
zkontroluje:

1. `localStorage.getItem("omniroute:quota-share:pools")` není prázdné.
2. `GET /api/quota/pools` vrátí `[]` (DB je prázdná).

Pokud platí obě podmínky, odešle každý starší fond dávkově na `POST /api/quota/pools`
a poté odstraní klíč z localStorage. Migrace je idempotentní: podmínka 2 zabraňuje
opakované migraci.

---

## Interní klasifikace strategie

`quota-share` je směrovací strategie **pouze pro interní použití** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Používají ji výhradně systémem generované
kombinace fondů `qtSd/` a je záměrně vyloučena z `ROUTING_STRATEGY_VALUES`, takže se nikdy
nezobrazí jako možnost volitelná uživatelem v uživatelském rozhraní ani API.

---

## Test pokrytí

S modulem pro sdílení kvót jsou dodávány dvě vrstvy automatického pokrytí:

| Suite               | Příkaz                                                                 | Co pokrývá                                                                                                                                                                                                                              |
| :------------------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jednotka (29 testů) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | plánovač DRR, saturační hradlování, omezení souběžnosti, matematika fairShare, řazení nevyřízených položek                                                                                                                              |
| Integrační matice   | `npm run test:combo:matrix`                                            | End-to-end rozhodnutí o směrování prostřednictvím skutečného kombinovaného potrubí; DRR spravedlnost + deprioritizace saturace prostřednictvím živých švů (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrační matice běží v CI spolu se všemi 22 veřejnými strategiemi. Jednotku lze provozovat samostatně.

---

## Souhrn schématu DB

Tři tabulky přidané migrací `078`, `079` a `085`:

- `quota_pools` + `quota_allocations` — definice fondu a alokace na klíč.
- `quota_consumption` — rolovací 2 kbelíkové čítače na `(apiKeyId, dimensionKey)`.
- `provider_plans` — ruční přepsání plánu poskytovatele (rozměry JSON na connectionId).

Všechny tabulky byly přidány pomocí idempotentních migrací `CREATE TABLE IF NOT EXISTS`.

Souhlasné půjčování přidává tři sloupce: `quota_allocations.lending_percent` (celé číslo, výchozí 0), `quota_allocations.lending_until` (milisekundy epochy nebo `NULL` bez uzávěrky) a `quota_pools.borrow_mode` (výchozí `saturation`). Jeho migrace pouze přidá tyto sloupce a nezapíše žádný existující řádek.

Kniha přiřazení procent přidává `quota_percent_ledger` (jeden řádek na fond, účet a okno plánu) a `quota_percent_ledger_tokens` (jeden čítač tokenů na fond, účet a klíč API ). `src/lib/db/quotaPercentLedger.ts` je čte a zapisuje.
