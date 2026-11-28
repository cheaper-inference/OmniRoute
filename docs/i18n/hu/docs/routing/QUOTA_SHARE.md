# Quota Sharing Engine (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentumhivatkozás**: `docs/routing/QUOTA_SHARE.md`
> A B csoport része (16. és 22. terv).

---

## Áttekintés

A kvótamegosztó motor méltányosan osztja el egy szolgáltató időalapú kvótáját
(pl. a Codex 5 órás időablakát vagy a Kimi 1500 kérés/óra korlátját) az azonos
kapcsolatot használó több API-kulcs között.

**A megoldott probléma:** Az OmniRoute számos API-kulcs kéréseit továbbítja
ugyanahhoz a felsőbb szintű szolgáltatói fiókhoz. Megosztási logika nélkül az A
kulcstól érkező hirtelen terhelés kimerítheti a szolgáltató adott órára vonatkozó
kvótáját, így a B és C kulcsok az időablak visszaállásáig blokkolva maradnak.
A motor ezt a következőkkel akadályozza meg:

1. Nyomon követi az egyes kulcsok gördülő fogyasztását dimenziónként (%, kérések, tokenek, $).
2. Munkamegőrző, méltányos részesedési algoritmust alkalmaz: egy kulcs kölcsönvehet
   a kihasználatlan részesedésekből, amíg a globális készlet nem telítődik.
3. Az eredményt a kritikus végrehajtási útvonalon (`chatCore.ts`), még azelőtt
   érvényesíti, hogy a kérés elérné a felsőbb szintű végrehajtót.

---

## Algoritmus: Fair-Share Work-Conserving

`src/lib/quota/fairShare.ts`-ban végrehajtva.

### Módok

| Állapot                                    | Mód           | Viselkedés                                                                        |
| ------------------------------------------ | ------------- | --------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Nagylelkű** | A kulcs a globális limit mínusz a felhasznált teljes összeg erejéig kölcsönözhető |
| `globalUsedPercent >= saturationThreshold` | **Szigorú**   | Szigorúan érvényesítse az egyéni méltányos részesedést                            |

Alapértelmezett `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Ez a két mód egy készletet ír le az alapértelmezett kölcsönzési módban, `saturation`. A `consent` módban lévő pool mindig a szigorú szabályokat alkalmazza, bármilyen telítettség is legyen. Lásd: [Hozzájárult hitelezés (poolonkénti részvétel)](#consented-lending-per-pool-opt-in).

### Dimenziónkénti döntés

A készlet minden aktív dimenziójához a motor kiszámítja:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

`percent` dimenziók esetében `consumed` a hozzárendelési könyvből származik (lásd: [Százalékos dimenziók: kulcsonkénti hozzárendelés](#percent-dimensions-per-key-attribution) ).

Majd:

- **`policy = hard`** : ha `consumed > fairShareAllowed` és a mód szigorú →** tömb** .
- **`policy = soft`** : ha `consumed > fairShareAllowed` és a mód szigorú →** büntetni** (prioritizálja a kombinációt; soha ne tiltsa le).
- **`policy = burst`** : engedélyezze, amíg a globális szabadidő létezik, függetlenül a méltányos megosztástól.

### Cap absoluto

`capValue` + `capUnit` egy kiosztáson egy kemény plafon, amely független az üzemmódtól vagy a szabályzattól. Bármilyen méret, ahol `consumed >= capValue` mindig** blokkok** a kérést. A `percent` sapka esetén `consumed` csak a kulcsnak tulajdonított rész.

### Többdimenziós ellenőrzés

Egy kérés blokkolva van, ha** bármilyen** méret a medencében blokkolná azt. A méretek függetlenek — az 5h%-os kimerülés nem befolyásolja a heti% dimenziót.

### Hitelfelvétel

Nagyvonalú módban az a kulcs, amelynek allokációja alulhasznált, felhasználhatja a többi kulcs ki nem osztott megosztásából származó többletet. A képlet a következő:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

ahol `consumedByOtherKeys = consumedTotal - consumedByThisKey`. A teto global (az adott dimenzióhoz tartozó `limit` medence) mindig a kemény mennyezet.

### Hozzájárult hitelezés (poolonkénti részvétel)

Minden medence rendelkezik kölcsönzési móddal. `saturation` az alapértelmezett, és megtartja a fenti szabályokat. `consent` módban a `hard` kulcs csak azon kapacitáson belül adja át a részét, amelyet más kulcsok kölcsönadtak. A rendszergazda beállítja az egyes készletek módját. Minden kulcstulajdonos megadja saját hozzájárulását [a kölcsönadási hozzájáruláson](#lending-consent) keresztül.

A beleegyezés 0-tól 100-ig terjedő százalékos arány, és egy opcionális határidő ezredmásodpercben. A kulcs a tétlen részesedésének azt a százalékát adja kölcsön, amíg a határidő a jövőben van.

Az egyik dimenzió esetében `L` az effektív korlát: a terv korlátja a készletben lévő számlák szorzata. A kapu kiszámítja a kérő kulcshoz:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` a kulcs súlya, vagy `100 / n` minden kulcshoz, ha egyik súly sem haladja meg a 0-t. `lend_k` a kulcs aktív százaléka, és 0, ha lejárt a határidő. A kérő kulcs saját hozzájárulása soha nem számít. A `hard` kulcs elutasításra kerül, ha a fogyasztás eléri `borrowAvailable` plusz részesedését.

Az a kapacitás, amelyre nem igényel allokációt (100 mínusz a súlyok összege), nem kölcsönözhető. Egyetlen kulcs sem vállalta, hogy kölcsönadja.

**Példa.** `L` 1000.

| Kulcsfontosságú | Súly | Részesedés | Elfogyasztott | Kölcsönöz |
| --------------- | ---- | ---------- | ------------- | --------- |
| A               | 50   | 500        | 530           | 0%        |
| B               | 30   | 300        | 100           | 50%       |
| C               | 0    | 0          | 60            | 0%        |

- B kölcsönadja az üresjárati 200 50%-át, ami 100. C már 60-at vett a részesedése fölé. A kölcsönözhet 40-et.
- Az A-t 530-on szolgálják fel, és visszautasítják, ha a fogyasztás eléri az 540-et.
- Mielőtt C bármit is használt volna, amikor A a részesedése volt vagy az alatt, C kölcsönkérhetett 100-at.
- Mielőtt C bármit is használt volna, amikor A 530 volt, C kölcsönkérhetett 70-et.

**Nulla súly.** A 0 súlyú kulcs részesedése 0. Csak addig szolgálják fel, amíg a fogyasztása nem éri el a mások által kölcsönadott mennyiséget. Ha senki nem ad kölcsön, azt az első kéréstől kezdve elutasítják.

**Határidők.** Egyetlen háttérfeladat sem jár le a hozzájárulással. Minden kérés összehasonlítja a határidőt a saját idejével, és ezzel megegyező határidő telt el. Az a tárolt határidő, amely nem egy véges szám, vagy lejárt a `Date` által tárolható legnagyobb dátumon, lejártnak számít.

**`soft` és `burst`.** A hitelezés nem korlátozza őket. A `soft` kulcsok prioritása megszűnik, ha túllépi a megosztását. A `burst` kulcs átmegy, amíg a medencében van hely. A medence mennyezete továbbra is visszautasít minden kulcsot, ha a medence teljes értéke eléri a határt.

**Költség a kérési útvonalon.** A `saturation` medence semmi mást nem olvas, mint korábban. A `consent` készletben egy megszámlálható dimenzió csak egy `hard` kulcshoz olvassa be a többi kulcsot, amely eléri vagy meghaladja a részesedését, míg egy másik kulcs kölcsönöz. Ezután egy másik kulcsonként egyet olvas párhuzamosan. A sikertelen olvasás az adott kulcs 0 fogyasztásának számít. A `percent` dimenzió nem olvassa tovább, mivel a hozzárendelési könyv minden kulcsot tartalmaz.

**Medence szerkesztése.** A szerkesztés megtartja a megmaradt kulcsok hozzájárulását. Ez érvényes a kiosztás szerkesztésére, a csoportszintű cserékre és `ensure` hívásokra. Az eltávolított kulcs elveszti hozzájárulását, és a visszahelyezett kulcs 0-val kezdődik. Az adminisztrátori útvonalak minden egyes kulcs hozzájárulását visszaadják, és soha nem írják ki. A készlet visszaállítása `saturation` re minden tárolt beleegyezést megtart, aminek ebben a módban nincs hatása. A készlet `consent` -re váltása újraaktiválja azokat a tárolt hozzájárulásokat, amelyek határideje még nem telt el. A kulcstulajdonos bármelyik módban törölheti a tárolt hozzájárulást.

**Frissítés.** Ha a `lending_percent` és `lending_until` oszlop már létezik, az áttelepítés csak `borrow_mode` adja hozzá, és a tárolt százalékok változatlanok maradnak. Minden medence `saturation` módban indul. Kapcsolja be `consent` készletenként a Pool varázslóban. A tárolt értékekből semmi sem következik.

**Korlátozások.**

- A hitelező megtalálhatja a készletet a plafonján, mielőtt felhasználná a saját részesedését. A mások által kölcsönzött kapacitás beleszámít a pool teljes összegébe.
- Az ellenőrzés a kérés előtt lefut, és nem foglal semmit. Az egyidejű kérések leolvassák a fogyasztást, mielőtt bármelyiket rögzítenék, így a kölcsönadott kapacitás többször is elkölthető, a repülés közbeni kérések függvényében. A `saturation` mód megosztási ellenőrzése ugyanazzal a tulajdonsággal rendelkezik.

---

## Csúszóablakos számláló

Megvalósítási helye: `src/lib/quota/sqliteQuotaStore.ts` és `redisQuotaStore.ts`.

Két gyűjtő tartozik minden `(apiKeyId, dimensionKey)` párhoz:

- `curr`: aktuális gyűjtő (`floor(nowMs / windowMs)`)
- `prev`: előző gyűjtő (`curr - 1`)

A tényleges gördülő érték:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Pontosság**: ~99%-os. A hiba legfeljebb az időablak méretének 1%-a lehet a
gyűjtők közötti határon (ez a kétgyűjtős közelítés velejárója).

### Egyidejűség

SQLite-illesztőprogram: egy memóriabeli mutex minden `(apiKeyId | dimensionKey)`
kulcshoz megakadályozza az olvasás–módosítás–írás versenyhelyzetét. A minta a
`src/sse/services/auth.ts` párhuzamos kéréshullám elleni megoldását követi.

Redis-illesztőprogram: Lua EVAL-szkript az atomi növeléshez — egyetlen Redis-parancsként fut.

---

## Illesztőprogramok

### SQLite (alapértelmezett, telepítést nem igényel)

- Tábla: `quota_consumption` (lásd a `073_quota_pools.sql` / `074_quota_consumption.sql` migrációt).
- Egyetlen példányból álló telepítésekhez a legjobb.
- Minden tartós adat a meglévő OmniRoute SQLite-adatbázisban található (`DATA_DIR/storage.sqlite`).

### Redis (opcionális, több példányhoz)

- Az `ioredis` npm-csomagot igényli.
- A számlálók a Redisben tárolódnak; a metaadatok (készletek/kiosztások) továbbra is az SQLite-ban maradnak.
- Több replikából álló telepítésekhez a legjobb, ahol a számlálókat meg kell osztani.

### Illesztőprogramok közötti váltás

A beállítási felületen (`/dashboard/settings` → Kvótatároló), vagy környezeti változókkal:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Az adatbázis-beállítás elsőbbséget élvez a környezeti változóval szemben. Ha `driver=redis`, de az URL hiányzik, vagy az `ioredis` nincs telepítve, a gyár visszaáll az SQLite használatára, és figyelmeztetést naplóz.

Az illesztőprogram kiválasztási sorrendje:

1. Adatbázis-beállítás: `quotaStore.driver`
2. Környezeti változó: `QUOTA_STORE_DRIVER`
3. Alapértelmezés: `sqlite`

---

## Többdimenziós

Egy medence több méretű lehet. Minden dimenzió független:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Példa: Codex terv** (5 óra% + heti%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

A kérésnek minden méretet meg kell felelnie ahhoz, hogy engedélyezhető legyen.

### Százalékos dimenziók: kulcsonkénti hozzárendelés

A százalékos terv számlánként és tervablakonként egy használati adatot jelent. A szolgáltató nem ad számlálót API kulcsonként.

A szám kulcsok közötti felosztásához minden készlet fiókonként és tervablakonként vezet egy hozzárendelési könyvet. `src/lib/quota/percentLedger.ts` betartja a könyv szabályait. `src/lib/quota/percentAttribution.ts` a könyvet a végrehajtás által használt számokká alakítja. Az eredmény egy becslés, amely az egyes kulcsú útvonalak tokenjeiből épül fel.

#### Olvasmányok, amelyek megmozgatják a könyvet

A könyv csak a szolgáltató saját figuráján mozog a kért tervablakhoz. Ezek a kapcsolatok egyet jelentenek:

| Szolgáltató                         | Tervezzen ablakokat |
| ----------------------------------- | ------------------- |
| Claude, OAuth kapcsolaton keresztül | `5h`, `weekly`      |
| Codex                               | `5h`, `weekly`      |

Ezek nem számítanak olvasmánynak:

- válasz, amelyet a szolgáltató kliens elavultnak jelöl meg
- egy Claude ablak, amelynek százalékát a szolgáltató nem jelentette
- egy másik ablak alakja, vagy a legrosszabb eset az ablakokon át
- a sebességkorlát fejléc visszaesése
- egy sikertelen olvasás

Más szolgáltatóknak, köztük a API kulcsos Claude, nincs könyvük. Minden kulcsra 0 százalékos díjat számítanak fel a százalékos méretük alapján, mint a változás előtt.

Az olvasás megosztja a telítési jel 30 másodperces gyorsítótárát. A Claude leolvasás dátuma az, hogy mikor figyelték meg az ábrát a válaszfejlécekben, vagy amikor a használati végpontból olvasták ki, ha ez az idő ismert. A többi leolvasás dátuma a gyorsítótár-bejegyzés elkészítésének időpontja.

#### Amit a könyv őriz

Minden rögzített kérés egyszer hozzáadja a tokenjeit egy számlálóhoz készletenként, számlánként és kulcsonként. Egy számláló csak nő. A könyv három dolgot tartalmaz:

- az alapvonal: az az ábra, amikor a könyv kinyílt vagy az ablak utoljára fordult
- az utolsó alkalmazott ábra
- kulcsonként a tokenszámlálója ugyanabban a pillanatban, az úgynevezett jel

A könyv akkor frissül, amikor a végrehajtás vagy a használati útvonal kiszámítja a hozzárendelést. Az írások összehasonlítása és beállítása egy revíziószámra történik. Egy író, aki elveszíti újrapróbálkozását egy új olvasmány után.

#### Hogyan számítják ki a kulcs részét

A könyv olvasása során minden kulcs része kiszámításra kerül. Az ábra növekedése az alapvonal óta a kulcsok között felosztásra kerül a jelölése óta irányított tokenek arányában.

Together, ezek a tokenek a szám legfeljebb egy pontját magyarázzák `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tokenenként (alapértelmezett 1000). A növekedés, amit nem magyaráznak, külső. Az alapvonal is külső.

Például egy könyv 0-nál nyílik meg. Az A kulcs ezután 900 000 tokent irányít, a B kulcs pedig 100 000-et. A 60-as számnál A része 54 pont, B része pedig 6.

A kulcs jele alatti számláló újraindult, és teljesen számol. A jel nélküli kulcsok, például az ablak közepén a készlethez csatlakozó kulcsok minden tokenjét megszámolják. Az a szám, amely lemarad a tokenektől, hibát okoz, amely a következő leolvasáskor eltűnik. Nem halmozódik fel.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` minden attribúciónál olvasható. Az az érték, amely nem véges szám, legalább 1, visszaesik 1000-re.

#### Hogyan változtatja meg egy olvasás a könyvet

Az első egyezési szabály érvényes:

1. **Még nincs könyv:** az olvasás kinyitja a könyvet. Az ábra az alapvonal, és minden számláló meg van jelölve.
2. **Régebbi olvasmány:** az utoljára alkalmazott érték előtti leolvasást figyelmen kívül hagyja. Ugyanígy az olyan leolvasás is, amelynek visszaállítási ideje több mint 30 perccel korábbi, mint a tárolt érték.
3. **Új szolgáltató ablak:** a visszaállítási idő több mint 30 perccel későbbi, mint a tárolt fordulat a könyvben. Az ábra lesz az alapvonal, és minden számláló újra megjelölődik. A számláló nélküli kulcsok elhagyják a könyvet.
4. **Befejezett ablak:** a tárolt visszaállítási idő, amely nem a leolvasási adatidő után van, azt jelenti, hogy az ablak véget ért. Az olvasás megfordítja a könyvet, bármi legyen is az alakja.
5. **Magasabb adat:** csak az utolsó alak mozog. Az alapvonal és a jelek maradnak.
6. **Ugyanaz az ábra:** az ábra, az alapvonal és a jelek maradnak. Csak a könyvből hiányzó visszaállítási idő van megírva.
7. **Alsó ábra:** alacsonyabb számot soha nem alkalmaznak ilyenként. Csak akkor fordítja meg a könyvet, ha három dolog tart. Legalább két perccel újabb, mint a legutóbb alkalmazott leolvasás. Semmi sem mondja, hogy az ablak ugyanolyan nyitott. Több mint egy ponttal alacsonyabb.

Az ablak ugyanolyan nyitottnak számít, ha három dolog tart. Mindkét visszaállítási idő ismert. 30 percen belül vannak egymástól. A tárolt még a leolvasás előtt van. Az ablakon belüli alacsonyabb szám semmit sem változtat.

A visszaállítási idő csak akkor kerül tárolásra, ha megelőzi az azt hordozó leolvasás adatidejét. A magasabb érték eltárolja leolvasásának visszaállítási idejét, amikor az használható, és egyébként megtartja a tárolt értéket. Egy egyenlő szám csak akkor rögzíti az olvasás visszaállítási idejét, ha a könyvben nincs ilyen. Semmi máson nem változtat. Az alacsonyabb szám, amely nem fordítja meg a könyvet, nem jelent visszaállítási időt.

#### Amikor a könyvet használják

Az olvasás után a könyv használható, kivéve, ha a tárolt visszaállítási ideje nem az aktuális idő után van. Ez az eset akkor fordul elő, ha egy közvetlenül az alaphelyzetbe állítás előtt leolvasott, például a gyorsítótárból kiszolgált olvasást közvetlenül utána figyeljük meg.

Használható olvasmány nélkül a tárolt könyv csak addig használható, amíg az még az aktuális ablak könyve lehet. Ez két esetben érvényes:

- az alaphelyzetbe állítás ideje ismert, és még hátravan
- nincs visszaállítási ideje, és az utolsó leolvasás, amely megváltoztatta, legfeljebb 15 perces

Különben nem tulajdonítanak semmit, mint amikor nincs könyv. Azon könyvekért, amelyeknek a tárolt visszaállítási ideje lejárt, soha nem kell fizetni.

#### Végrehajtás

A kulcs százalékos fogyasztása a hozzárendelt része plusz a külső rész egy része. A külső rész először a kapacitáskiosztás nélküli igényeket használja (100 mínusz a súlyok összege). Csak a felesleg oszlik meg a kulcsok között súly szerint.

Ezt a fogyasztást a kulcs méltányos részesedésével hasonlítják össze, mint bármely más dimenzió esetében. A szigorú mód akkor is elindul, ha a telítési jel eléri `QUOTA_SATURATION_THRESHOLD` értéket (alapértelmezett 0,5). Minden szám az érvényes korlát szerint van méretezve: a számlánkénti korlát szorozva a készletben lévő számlák számával.

A `capUnit: "percent"` ellátott abszolút sapka csak a kulcsnak tulajdonított részt számít, ugyanúgy méretezve. A fiókonkénti korlát 100 és k fiók. Ekkor elérjük az N felső határt, amikor a kiszolgáló fiók számának kulcsrésze eléri N/k pontot. Minden fiókot összevetnek a saját könyvével. Például két fiók esetén a 10-es felső határ egy számla számának 5 pontján érhető el.

Ha az áruház nem olvasható, akkor semmi nem lesz hozzárendelve, és minden kulcs 0-val kerül felszámításra ezen a dimenzión. Ha egy könyvírás sikertelen, akkor ez a forrásmegjelölés a könyvet úgy használja, ahogyan olvasták. A sikertelen tokenírás kihagyja a kérés tokenjeit a könyvből. Ezen hibák egyike sem blokkolja a kérést.

A `consent` poolban a kölcsönzési képlet az egyes kulcsok fogyasztását használja a százalékos dimenzióban a fent leírtak szerint. Ha egy másik kulcs kölcsönad, a könyv egyszer elolvasásra kerül, és minden kulcshoz hozzárendelődik. Használható könyv nélkül minden kulcs 0-val jár. A súlyú kulcs átmegy, a 0 súlyú kulcs pedig csak akkor megy át, ha másik kulcs kölcsönad.

#### Használati útvonal

`GET /api/quota/pools/{id}/usage` ugyanazokat a számokat jelenti ugyanazon a függvényen keresztül. A százalékos dimenzióhoz készletkapcsolatonként egy bejegyzés tartozik `accounts` ben. A legfelső szintű `consumedTotal` és `perKey` tükrözi az első bejegyzést.

Az útvonal az aktuális olvasatot is alkalmazza, így kérésnek megfelelően előre tudja vinni a könyvet. `internal + external` eltérhet `consumedTotal` től, ha nincs használható leolvasás, vagy ha nem alkalmaznak alacsonyabb értéket.

#### Tárolás és megőrzés

Mindkét kvótabolt őrzi a könyvet. SQLite rendszeren az automatikus adatbázis-tisztítás, ha engedélyezve van, eltávolítja a 60 napig nem frissített sorokat. Redis-n a készletkapcsolat könyvei és számlálói egy kulcson osztoznak. A jogkivonat utolsó írása vagy könyvelése után 60 nappal jár le. Az a könyv, amely nem változik, nem íródik át, így a levágás a leghosszabb tervablak fölé van beállítva. A kézi használati előzmények visszaállítása törli a SQLite könyveit is (lásd Korlátozások).

#### Korlátozások

- A számlaszám minden növekedése az alapvonal óta fel van osztva az azóta továbbított kulcsok tokenek alapján. Nem számít, hogy mikor történt ez a növekedés.
- Tehát OmniRoute kívüli használatot a kulcsok terhelik a tokenek által megengedett mértékig. Ez magában foglalja a kulcs első ablakkérése előtti használatot, amikor a könyv már nyitva volt.
- Például a külső használat 60 ponttal növeli a számlát, miközben nincs kulcsfontosságú útvonal. Egy kulcs ezután 30 000 tokent irányít, és ez a szám eléri a 60,6-ot.
- Ha a könyv a használat előtt nyitva volt, a kulcs része 30 pont. 7,65-ös külső használatot is hordoz, négy 25-ös súlyú billentyűvel.
- Ha a könyvet a használat után nyitották meg, a 60 pont az alapérték. A kulcs része 0,6 pont, és 15 külső használatot hordoz.
- Egy kérés vagy a használati útvonal meglátogatása nyitja meg a könyvet. Tehát az, hogy az ilyen használat alapértéknek számít-e, attól függ, hogy mikor nyitották meg a könyvet.
- Az alapértelmezett küszöbnél egy kulcs, amely 60 000 tokent irányít, míg a külső használat megemeli a fiókot, 60 pontot kap mind a 60 saját része.
- 50 000-es padlóval a saját része 1,2 pont. A többi 58.8 külső és súly szerint töltődik, mint minden külső használatnál.
- Állítsa `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` közel ahhoz, amennyibe kerül egy pont a tervben. A külső használat magában foglalja a készleten kívüli kulcsok forgalmát ugyanazon a fiókon.
- Minden üzemmódban százalékos korlát érvényes. A korlátos kulcs visszautasítható, ha a fiók messze a telítettségi küszöb alatt van.
- Vegyünk egy 10 és 12 pontból álló sapkát a külső használatra korábban az ablakban. A 20 000 tokent irányító kulcsot 12,4%-os számlaszám mellett elutasítják.
- A felosztás a token mennyiségére vonatkozó becslés. Egy kérés a prompt tokennek és a befejezési tokennek számít. A gyorsítótár-engedmények és a modellárak nem változtatják ezt a számot.
- A nem 200-as állapottal végződő kérés nem rögzít tokent. Ilyen például egy adatfolyam, amelyet a kliens megszakít, és egy upstream hiba a használat elhasználódása után.
- Az ilyen kérés által okozott használatot a jogkivonatokat rögzítő kulcsokra terheljük, a tokenek által megengedett mértékig. A többi külső. Nem mozdul vissza. A jogkivonat használatának hiányát jelző válasz nem rögzít tokent sem.
- Egy folyamatban lévő kérés használata megjelenhet egy másik aktív kulcs részében a teljes kérelemre vonatkozóan. Csak akkor lép vissza, ha a kérés 200-as állapottal ér véget.
- A könyv megnyitásakor már a fiókban lévő használat külsőnek számít. Ez magában foglal egy frissítést, egy új készletet és egy új fiókot. Az első leolvasás előtti új ablakban történő használat is külsőnek számít.
- Minden kulcs az adott használat súlyrészével kezdődik, a kapacitás után nincs kiosztási igény. Egy 85%-os fiók és öt 20-as súlyú kulcs esetén mindegyik 20-ból 17-tel kezdődik.
- Egy több számlát tartalmazó készletben a kiszolgálási számla értéke az összesített költségvetésre vonatkozik. Ezt a könyv nem változtatja meg.
- A szolgáltató által nyitottnak nyilvánított ablakon belüli alacsonyabb érték nem kerül alkalmazásra. A 30 percet meghaladó visszaállítási idő régi leolvasásnak minősül.
- A könyv mindkét esetben megőrzi állapotát, amíg a tárolt visszaállítási idő le nem telik. Ezt követően a könyvet nem töltik fel, amíg egy olvasás meg nem fordítja.
- A megoldás a használati előzmények kézi visszaállítása (`POST /api/settings/purge-usage-history`). Törli a hozzárendelési könyveket és azok tokenszámlálóit a SQLite adatbázisban.
- A `all` időszak minden könyvet és számlálót töröl. Egy rövidebb időszak először törli a nem azon belül megírt könyveket. Ezután törli a nem benne írt számlálókat, hanem csak egy olyan készletkapcsolatnál, amelynél nincs könyv. Egy vezetett könyv továbbra is minden kulcsot a pultjához jelöl.
- Az a könyv, amelynek alakja nem mozdult, nem íródik át, így egy rövidebb időszak is törölheti az aktuális ablak könyvét. A következő olvasmány ezután új könyvet nyit az aktuális ábrán.
- A visszaállítás nem érinti a Redis kvótatárolót. Ott egy könyv az ablakkal ér véget, vagy az utolsó írása után 60 nappal jár le.
- Ha a szolgáltató nem küld visszaállítási időt, egy ablak, amely két leolvasás között visszaáll, és a régi érték fölé töltődik, magasabb értéknek tűnik. A könyv megtartja a régi alapvonalat és jeleket.
- A leolvasásokat a helyi óra keltezi. Ha megelőzi a szolgáltatóét, vagy ha egy forrás egy kicsit korán visszaállítási időpontról számol be, a könyv korán felbukkanhat erre a különbségre.
- Ebben a rövid tartományban a növekedést felosztják a benne irányított tokenek. A következő ablak első olvasata kijavítja. Ha a megfordított könyvben nincs visszaállítási idő, akkor a javításhoz legalább két perccel alacsonyabb értékre van szükség, amely legalább két perccel frissebb, mint az utolsó alkalmazott olvasmány.
- Példányok, amelyek megosztják a Redis áruház dátumát a saját óráikkal, ezért tartsa ezeket az órákat szinkronban. Egy olyan példány leolvasása, amelynek az órája lemarad, régebbinek tűnnek, és figyelmen kívül hagyják.
- Ha a tárolt visszaállítási idő után nem érkezik használható leolvasás, a kulcsonkénti százalékos megosztások és százalékkorlátok nem érvényesülnek mindaddig, amíg az olvasás vissza nem tér. Visszaállítási idő nélkül ez 15 perccel a könyvet megváltoztató utolsó olvasás után kezdődik.
- A Redis üzletben egy 60 napig tétlen könyv lejárhat az írói csekk és a megírása között. Ezután újra létrejön egy 1 feletti változatnál, ami érvényes állapot.

---

## Csomagfeloldó

Megvalósítás: `src/lib/quota/planResolver.ts`.

Prioritási sorrend (legmagasabbtól a legalacsonyabbig):

1. **Kézi adatbázis-felülbírálás** — `provider_plans` tábla, `connectionId` szerint.
2. **Ismert katalógus** — `src/lib/quota/planRegistry.ts` (csak adatokat tartalmaz).
3. **Üres csomag** — nincsenek dimenziók, kézi konfiguráció szükséges.

### Ismert katalógus

| Szolgáltató           | Dimenziók                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, ismeretlen), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nincs alapértelmezés — kézi konfiguráció szükséges            |

---

## Csővezeték integráció

### PRE horog (`open-sse/handlers/chatCore.ts`)

Fut az upstream végrehajtó előtt, a hitelesítés és a házirend ellenőrzése után:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Sikertelen** : ha `enforceQuotaShare` dob, a kérést egy `pino.warn` naplóval átengedik. Ez megakadályozza, hogy a kvótamotor hibája blokkolja az összes forgalmat.

**Amikor a kapacitás visszatér.** A kulcsrésznél vagy a medence mennyezeténél történő visszautasítás két mondat egyikével végződik mindkét kölcsönzési módban:

- `percent` ablak: `. The <window> window resets at <time>.` Az idő a szolgáltató által jelentett visszaállítás.
- Megszámlálható mértékegység: `. Enough <window> usage is expected to clear by <time>.` Az idő egy felső korlát a tolóablakból, ha a kulcs nem küld mást.

`<time>` egy ISO 8601 instant UTC ben. Az elutasítás ezután `Retry-After` hordoz: az egész másodpercet addig a pillanatig, plusz egyet. Olyan ügyfél, amely ennyi ideig vár, legfeljebb egy másodperccel a pillanat után próbálkozik újra. Ha a pillanat nem ismert, az elutasítás nem tartalmazza sem a mondatot, sem a fejlécet. A felső határ abszolút elutasítása egyiket sem tartalmazza. A nyilvános kód `quota_share_blocked` marad.

A megosztás megtagadása nem érinti a megosztott kapcsolatot. Nem állítja be a lehűlést, a modellzárat és a szolgáltatói megszakító meghibásodását, és a medence többi kulcsát továbbra is kiszolgálják. Amikor egy kombó minden célpontja visszautasítja a kulcsot a megosztásáért, a kombó várakozás nélkül válaszol 429-re. A válaszában a `Retry-After` utalás szerepel. A beágyazási útvonal ugyanazzal a mondattal fejezi be az elutasítást, és nem küld `Retry-After`.

### POST horog (rekord fogyasztás)

Sikeres válasz után:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift jegyzet** : ha `consume` utólag nem válaszol, a gördülő számláló alul számol. A szolgáltatótól kapott telítési jel (pl. `anthropic-ratelimit-unified-5h-utilization`) korrigálja a globális becslést a következő kéréskor.

### Kombinált lágy büntetés (`open-sse/services/combo.ts`)

Amikor `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

A büntetés az összes többi pontozási tényező után kerül alkalmazásra. Csökkenti annak az automatikus kombinálásának valószínűségét, hogy a telített kulcsot kemény blokkolás nélkül választják ki.

---

## UI végigjátszás

### `/dashboard/costs/quota-share` — A medencék fő oldala

Összetevők (mind `src/app/(dashboard)/dashboard/costs/quota-share/`-ban):

| Összetevő              | Cél                                                                          |
| ---------------------- | ---------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Bevezető kártya, amely elmagyarázza a kvótamegosztást az új felhasználóknak  |
| `CreatePoolModal`      | Új kvótakészlet létrehozása (kapcsolat + neve + kezdeti kiosztások)          |
| `PoolCard`             | Csoportonkénti összefoglaló: név, kapcsolat, kiosztások száma                |
| `DimensionBar`         | Dimenziónként halmozott sáv: az egyes kulcsok + a globális használatból      |
| `AllocationTable`      | Asztal elfogyasztott, fair share, deficit/surplus, kölcsönzási zászlóval     |
| `BurnRateChart`        | EMA égési sebesség vonaldiagram (lusta újragrafikonok `dynamic()` keresztül) |
| `EditAllocationsModal` | Szerkessze a készlet kiosztási súlyait, korlátait és szabályzatait           |
| `BorrowModeField`      | Kölcsönzési mód választó (`saturation` vagy `consent`) a varázslóban         |
| `LendingBadge`         | Csak olvasható jelvény kölcsönadható kulcson, csak `consent` poolokban       |

A kölcsönzési jelvény mutatja a százalékot, és ha be van állítva, a határidőt UTC -ban a megnevezett zónával. A határidőt a használati pillanatfelvétel időpontjában ítéli meg. A lejárt vagy olvashatatlan határidő `lending expired` jelenik meg.

Az oldal horgok:

- `usePools` — 30 másodpercenként letölti `GET /api/quota/pools`.
- `usePoolUsage` — igény szerint letölti `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — egyszer lefut beszereléskor a régi LS adatok migrálásához.

A pool varázsló kulcslépése `Show usage by member to key holders` dobozzal rendelkezik. Beállítja a készlet `memberBreakdown` beállítását (lásd [a Taghasználat című részt](#member-usage) ). Alatta a varázsló arra figyelmeztet, hogy valaki, aki tudja, mit használt az egyik billentyű, hozzá tudja rendelni a sávot az adott billentyűhöz. Ha a jelölőnégyzet be van jelölve, akkor ezt írja ki, ha a lépés háromnál kevesebb vagy 20-nál több kulcsot tartalmaz, mivel a sávok ekkor rejtve maradnak. Számolja a kulcsokat a lépésben, és nem tudja megmondani, melyikük küldhet kérést.

### `/dashboard/costs/quota-share/plans` — Szolgáltatói terv konfig

- `ProviderPlanConfigClient.tsx`: legördülő menü a szolgáltató kiválasztásához, a megoldott terv megtekintéséhez (automatikus katalógusból vagy kézi felülbírálás), és a méretek szerkesztéséhez.
- A változtatások a `PUT /api/quota/plans/[connectionId]` íródnak.
- A törlés visszatér a katalógushoz vagy az üres tervhez.

---

## Önkiszolgáló kvóta API (feliratkozás)

`GET /api/v1/me/quota/{provider}` ( `/v1/me/quota/{provider}` szolgáltatónál is szolgál) lehetővé teszi, hogy a API kulcstartó a saját kulccsal leolvassa, mekkora a megosztott előfizetés az övék, és mi akadályozza meg őket. Az útvonal egy vékony héj `src/server/selfService/quotaHandler.ts` felett; a nézetet `src/lib/quota/selfView.ts` építi fel, és válaszszerződése `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Engedélyezés és hitelesítés

- Funkciójelző `QUOTA_SELF_PANEL`, alapértelmezett `false`. Ha ki van kapcsolva, az útvonalat elérő kérés 404-et kap. `REQUIRE_API_KEY=true` esetén a kliens API házirendje 401-gyel utasítja el a hiányzó vagy érvénytelen kulcsot, mielőtt az útvonal futna, bármilyen jelző is legyen. A kulcs nélküli, de bejelentkezett irányítópult-munkamenettel rendelkező kérés átmegy a szabályzaton, és megkapja az útvonal saját válaszát. A jelző a többi jelzőhöz hasonlóan oldódik fel (műszerfal vagy REST felülírás, majd az azonos nevű környezeti változó); lásd [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Minden egyes készlet megjelenített neve és ütemezésének címkéje pontosan úgy kerül vissza a készlet kulcstartóihoz, ahogyan a rendszergazda írta. A zászló bekapcsolása előtt ellenőrizze, hogy azok alkalmasak-e a kulcstartók általi olvasásra.
- A kulcs csak a fejlécekből olvasható: `Authorization: Bearer <key>` vagy `x-api-key: <key>`. Ha mindkettőt elküldi, akkor az elsőként érvényesítő kerül felhasználásra. A lekérdezési karakterláncban lévő kulcsot vagy a cookie-t figyelmen kívül hagyja. A kiszolgáló környezeti kulcsa elutasítva (401).
- A kulcshoz kell a `self:usage` távcső (enélkül 403).
- A szolgáltatói szegmenst levágják, kisbetűk írják le, és összevetik `^[a-z0-9][a-z0-9._-]{0,63}$` (egyébként 400), majd a szolgáltatói nyilvántartáson keresztül feloldják, így egy álnév, például `cc` olvassa a `claude` készleteket. `claude` és `anthropic` ugyanazokat a készleteket olvassa be.

### Amit az egyes láthatóságok mutatnak

| Láthatóság       | Megköveteli                                                                                | Mezők                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Saját részesedés | `self:usage`                                                                               | `pools[]` (ref, név, szolgáltató, szabályzat, súly, sapka), `dimensions[].yourShare`, `accounts[]` `yourShare` -vel ( `percent` ablakon `attributed` és `external` nélkül), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                                   |
| Fiókszint        | `self:usage` + `self:account-quota`, és a szolgáltató a kulcs `sharedQuotaProviders` jében | hozzáadja `dimensions[].total`, `accounts[].dimensions[].account` és `accounts[].modelWindows`, `attributed` és `external` a `percent` ablak `yourShare`, és `members` egy olyan készlethez, ahol a taghasználat be van kapcsolva (lásd [a Taghasználat című részt](#member-usage) ) |

- `sharedQuotaProviders` kulcsonkénti beállítás (`PUT /api/keys/[id]/self-service`): `null`, az alapértelmezett, minden szolgáltatót jelent, amelyet a kulcs elér; `[]` azt jelenti, hogy egyik sem. Minden medence `accountVisible` azt mondja, hogy melyik láthatóság vonatkozik rá.
- A fióksávok és a modellablak csak azoknál a fiókoknál jelennek meg, amelyek kapcsolatát a kulcs használhatja. Ha a kulcshoz tartozik az engedélyezett kapcsolatok listája, egy azon kívüli fiók megtartja a `Account N` bejegyzését `account` vagy `modelWindows` nélkül. Az üres lista azt jelenti, hogy nincs korlátozás, mint `/v1/me/status` esetében. A készletösszeg (`dimensions[].total`) nem függ ettől a listától.
- Két `self:usage` val ábrázolt figura más billentyűk használatából származik. Az ütemterv költségvetésének `exhausted` tükrözi az ütemezés szerinti összes kulcs fogyasztását. Egy olyan poolban, amelynek súlya nulla, a kulcs `weight` `100 / number of members`. Mindkettő a kulcsra vonatkozik.
- A készletet csak `ref` azonosítja, amely a hívókulcshoz kötött átlátszatlan érték. A megjelenített neve (`name`) úgy szerepel, ahogy az adminisztrátor írta. A `ref` a kulcsból és a szerver API-kulcstitkával (`API_KEY_SECRET`) rendelkező készletből származik. A klienseknek nem szabad megőrizniük: megváltozik, ha ezt a titkot elforgatják.
- A számlák `Account 1`, `Account 2`, … formátumban vannak felsorolva a pool sorrendben. Nem ad vissza készletazonosítót, kapcsolatazonosítót, fiók e-mail-címét vagy fióknevét, és a válasz átmegy a szerződéssémán, amely minden azon kívül eső mezőt eldob.
- A megszámlálható egységek (`requests`, `tokens`, `usd`) a kvótakapu által érvényesített gyűjtőkörként jelennek meg: `limit` = terv limit × számlák a készletben, `fairShare` = súly / 100 × `limit` (egyenlő felosztás `consumed`, ha minden súly a számlálóban s z = kvótabolt, `consumed` `remaining` = `fairShare` −, padló 0.
- `blocks.schedules` felsorolja a kulcs ütemezési ablakait (`open`/`closed`, `blackout` vagy `outside-window`, `retryAfterSeconds`, szintek tartaléka, és hogy az ablak költségvetését elköltik-e); `blocks.modelCaps` felsorolja modellenkénti óránkénti felső határait fogyasztással együtt.
- A szolgáltató minden készletén kívüli kulcs 200-at kap `pools: []` val; `availableModels` (a `qtSd/` azonosítók, amelyeket a kulcs `/v1/models`-ben lát), `expiresAt` és `apiBaseUrl` még mindig ki van töltve.
- `apiBaseUrl` `OMNIROUTE_PUBLIC_API_BASE_URL`, majd `OMNIROUTE_PUBLIC_BASE_URL`, különben `null`. Soha nem a kérés eredete.

### `status` és `reason`

| `status`      | Jelentése                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Aktuális olvasmány.                                                                                                                                                                                                                                                                                                                                                                                      |
| `stale`       | A gyorsítótárazott fiók elavultnak minősült, vagy olyan, amelynek visszaállítási ideje eltelt az olvasás óta. A számokat megtartják. Egy modellablak, amelynek alaphelyzetbe állítási ideje lejárt, az egész `modelWindows` csoportot jelöli `stale`. Egy `percent` ablak kulcsának saját részéhez: a könyvet úgy olvasták el, hogy a fiók nem olvasott be a kapu gyorsítótárában, hogy megerősítse azt. |
| `unavailable` | Nincs olvasás; a számok `null`, soha nem `0`. `reason` mondja, hogy miért.                                                                                                                                                                                                                                                                                                                               |

| `reason`                          | Amikor                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `store_unavailable`               | A kvótatár nem olvasható, vagy nem tudja olvasni a hozzárendelési könyveket.                                                                                 |
| `percent_attribution_unavailable` | A kulcs saját részesedése egy `percent` ablakban: még nem létezik hozzárendelési könyv az adott fiókhoz és ablakhoz, vagy a könyv nem tartalmazza a kulcsot. |
| `percent_window_ended`            | A kulcs saját része egy `percent` ablakban: a könyv egy lezárt tervablakhoz tartozik.                                                                        |
| `account_not_used_by_key`         | A kulcs saját részesedése a `percent` ablakban: a fiók kapcsolata kívül esik a kulcs engedélyezett kapcsolatain. A könyvét nem olvassák.                     |
| `window_not_reported`             | A szolgáltatói korlátok gyorsítótárának nincs olvasása ehhez a tervablakhoz.                                                                                 |
| `connection_lookup_failed`        | A fiók kapcsolata nem olvasható.                                                                                                                             |
| `not_supported`                   | OmniRoute nem tudja beolvasni a fiók szolgáltatójának használati korlátait.                                                                                  |
| `fetch_failed`                    | A gyorsítótárazott olvasás nem volt használható, és a szolgáltatói korlátok frissítése meghiúsult.                                                           |
| `not_available`                   | Az olvasás nem tartalmaz használati ablakot, vagy a fióknak egyáltalán nincs olvasása.                                                                       |

Ha a kvótatároló nem olvasható, a `blocks` áruház által támogatott mezői (egy ütemterv költségvetésének `exhausted`, egy modell sapkájának `consumed` és `reached`) is `null`.

### Hitelezési hozzájárulás

`PATCH /api/v1/me/quota/{provider}` rögzíti a hívókulcs saját hozzájárulását egy készlethez. A `GET` zászlóját, fejléceit és szolgáltatói szabályait használja. A `self:usage` hatókör engedélyezi ezt az írást, bár a neve csak olvasható.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` az a `ref` a `GET` az adott készlethez visszaad.
- `lendingPercent` egy 0 és 100 közötti egész szám. A 0 érték törli a hozzájárulást és annak határidejét. A `lendingPercent` 0 testet mindkét mód elfogadja.
- `lendingUntil` opcionális: epocha milliszekundum, vagy `null` határidő nélkül. Ennek a jövőben kell lennie, és legfeljebb 8640000000000000. A 100000000000 alatti érték másodpercnek számít, és elutasításra kerül.
- Minden más mező elutasítva. A 4096 bájtnál hosszabb törzs elutasításra kerül. Ennél a méretnél megáll az olvasás, így a hosszabb testet soha nem lehet egészben tartani.

Az ellenőrzések a táblázat szerinti sorrendben futnak. Minden elutasításnál a szabványos hibatörzs szerepel, rögzített üzenettel. Az ilyen ellenőrzések valamelyikével történő elutasítás nem ír semmit.

| Állapot | Üzenet                                                                                             | Amikor                                                                  |
| ------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 404     | `Not found`                                                                                        | A `QUOTA_SELF_PANEL` zászló le van kapcsolva.                           |
| 401     | `Valid API key required`                                                                           | A kulcs hiányzik vagy érvénytelen, vagy a kiszolgáló környezeti kulcsa. |
| 403     | `API key lacks the self:usage scope`                                                               | A kulcsból hiányzik `self:usage`.                                       |
| 400     | `Invalid provider`                                                                                 | A szolgáltatói szegmens érvénytelen.                                    |
| 429     | `Too many lending changes. Retry later.`                                                           | A kulcs túllépte a határt. A válasz `Retry-After` hordoz.               |
| 400     | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | A törzs nem JSON, túl hosszú, vagy nem egyezik a sémával.               |
| 400     | `lendingUntil must be a Unix time in milliseconds`                                                 | A határidő másodpercben értendő.                                        |
| 400     | `lendingUntil must be in the future`                                                               | A határidő az igénylés időpontjában vagy azt megelőzően van.            |
| 404     | `Pool not found`                                                                                   | A `ref` ennek a szolgáltatónak a kulcsát nem nevezi meg.                |
| 403     | `Lending is not enabled for this pool`                                                             | A medence `saturation` módban van, és `lendingPercent` 0 felett van.    |
| 500     | `Failed to build quota view`                                                                       | Bármilyen más hiba. Ennek oka a szerveren van naplózva.                 |

A korlát 20 kérés 60 másodpercenként kulcsonként. Minden olyan kérés számít, amely átmegy a szolgáltatói ellenőrzésen, még a később elutasított vagy a semmit sem változtató kérés is. Saját számlálóval rendelkezik, a kulcs kérési sebességhatárán kívül.

A tárolt hozzájárulást módosító kérés egy `quota.pool.lending.updated` audit rekordot ír. Megnevezi a kulcsot a régi és az új értékekkel. Ugyanaz a szerv kétszer küldött egyszer ír és egyszer auditál. A válasz 200 a teljes `GET` nézettel, az írás után épülve.

A `GET` view a következőképpen számol be a hitelezésről:

- Minden készlet tartalmazza `borrowMode` (`saturation` vagy `consent`), valamint a kulcs saját `lendingPercent` és `lendingUntil`.
- `lendingActive` csak egy `consent` poolban `true`, 0 feletti százalékos értékkel, és a határidőt nem érte el.
- A `consent` poolban minden megszámlálható `dimensions[].yourShare` `borrowAvailable` hordoz. Ezt használhatja a kulcs a részesedése felett most, a többi kulcs által kölcsönözve.
- `borrowAvailable` a kapu képletét használja. Minden más kulcsot beolvas, akkor is, amikor a kulcs a megosztása alatt van. Olyan `hard` kulcshoz, amely egy másik kulcsonként egy extra olvasást és megszámlálható dimenziót jelent, párhuzamosan.
- `borrowAvailable` `null` `soft` vagy `burst` kulcs esetén, és `null`, ha az olvasás sikertelen.
- `borrowAvailable` egy számjegy az összes többi kulcshoz együtt. A két kulcsból álló készletben a másik kulcs saját alakja.
- `borrowAvailable` még nincs jelentve `percent` windowshoz vagy `accounts[]`.
- A `saturation` készletben a nézet a tárolt beleegyezést jelenti `lendingActive: false` vel és `borrowAvailable` vel.

### Hibák

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Korlátozások

- `remaining` a kulcs méltányos részesedésének az a része, amelyet nem használt. Ez nem garancia. Amíg a medencében van hely, a kulcs továbbra is kiszolgálható rajta. Ha a készlet összértéke eléri `limit` értéket, a készlet minden kulcsa elutasításra kerül, függetlenül a saját `remaining` értékétől, és `self:account-quota` nélküli kulcs nem láthatja ezt az összeget.
- `remaining` nem veszi figyelembe az allokáció abszolút `cap`. A végrehajtás visszautasítja a kulcsot, ha a saját fogyasztása a kupak egység ablakában eléri a kupak értékét.
- A fiókszintű sáv a szolgáltatói korlátok gyorsítótárából származik, és néhány perccel késleltetheti a végrehajtási döntést. Az a leolvasás, amelynek visszaállítási ideje lejárt, `stale` jelenik meg.
- A modellenkénti ablakok (`modelWindows`) csak azon szolgáltatók esetében jelennek meg, amelyek rendelkeznek terv-ablak leképezéssel: ma Claude és Codex. Más szolgáltatóknál `modelWindows` továbbra is jelen van, amikor a fiókadatok megjelennek, üres `windows` listával.
- A kulcs saját részesedése a `percent` ablakban egy becslés. A hozzárendelési könyvből származik, és magában foglalja a fenti „Százalékos dimenziók: kulcsonkénti hozzárendelés” részben felsorolt összes korlátozást.
- `consumed` a szám végrehajtása a méltányos részesedéshez képest. Pontosan `attributed` plusz `external`. `attributed` az a rész, amelynél a könyv megadja az általa irányított tokenek kulcsát. A `external` a kulcs azon része a fiók használatának, amelyet a készlet kulcsai nem vesznek figyelembe.
- Mindkét rész csak akkor kerül elküldésre, ha a készlet `accountVisible` értéke igaz: a kulcsban `self:account-quota`, a szolgáltató pedig `sharedQuotaProviders` ben van. A nélküle lévő kulcs csak `consumed` kapja, ugyanazzal a `status` vel és `reason`.
- A tartó mindkét részével és saját súlyával ki tudja dolgozni a medencén kívüli használatot, ami a medence kulcsaira terhelhető. A számla hatókörével rendelkező tulajdonos már látja a számla végösszegét.
- Az a kulcs, amelyik nem irányított semmit az ablakban, továbbra is ki tudja olvasni a külső töltését `consumed`-ból, mert a hozzárendelt része ekkor 0.
- Például egy könyv 0-val nyílik meg, az A és B kulcs pedig 50-es súlyú. Az A kulcs 900 000 tokent, a B kulcs pedig 100 000 tokent irányít. Ekkor a számla eléri a 100-as határ 60%-át. Ekkor `attributed` 54 az A kulcsnál és 6 a B kulcsnál, és `external` mindkettőnél 0.
- A nézet olvassa a könyvet, és soha nem írja le az állapotát. Nem nyit ki egy könyvet, és soha nem kér felolvasást a szolgáltatótól. A Redis áruházban az olvasás eltávolítja a háttérben lévő felülírt revíziós mezőket, ahogyan a kapu olvasatai is teszik.
- A megosztás csak akkor `ok`, amíg a kapu gyorsítótára tárolja a fiók leolvasását. Enélkül `stale`, tehát egy olyan készletben, ahol nincs legutóbbi kérés, valószínűleg elavultnak tűnik.
- Amíg egy kérelem át nem megy a készleten, a megosztás nem érhető el. Ez a kérés megnyitja a könyvet, és a számla abban a pillanatban elért értéke a poolon kívüli felhasználásnak számít.
- Egy több számlát tartalmazó készletben minden számlabejegyzés az adott fiók saját könyvét és egy fiókra vonatkozó korlátot használja. A végrehajtás mindkét oldalt a számlák számával skálázza, így az arány azonos.
- A modellenkénti ablakok nem járulnak hozzá a kulcshoz. A könyv nem tárol modellenkénti adatokat.
- A nézet nem értékeli ki az ütemezés tartalékszintjeit: az ütemezés `open` ként jelenhet meg, míg a kérést `schedule-reserve` indoklással elutasítják.
- Ha ugyanazon kulcs két készlete osztozik egy kapcsolaton, a végrehajtás az egyiket alkalmazza, és a nézet mindkettőt felsorolja.
- A sikertelen kulcskísérleteknek nincs címenkénti korlátja: a fordított proxy mögött a hívók egy címet oszthatnak meg (attól függ, hogy a továbbított klienscímek megbízhatóak-e), így a zárolás megtagadhatja az útvonalat minden kulcstartótól. `REQUIRE_API_KEY=true` esetén a kliens API házirendje visszautasítja az érvénytelen kulcsot az útvonal lefutása előtt, és ennek a házirendnek a 401-es törzse az útvonal helyett.

### Taghasználat

Az adminisztrátor megengedheti a kulcstulajdonosoknak, hogy lássák, hogyan oszlik meg az ablakhasználat a készlet tagjai között. Az opció a medence `memberBreakdown`, alapértelmezés szerint ki van kapcsolva. A pool varázslóban vagy `PATCH /api/quota/pools/{id}` vel van beállítva. `GET /api/quota/pools` és `GET /api/quota/pools/{id}` jelentik.

A nézet egy dimenziója csak akkor hordoz `members`, ha ezek mindegyike teljesül:

- a medence opció be van kapcsolva
- a készlet legfeljebb 20 kiosztott kulccsal rendelkezik, és ezek közül legalább három kérhet: aktív, nincs visszavonva, nem tiltott és nem járt le lejárata
- a pool `accountVisible` igaz: a kulcsban van `self:account-quota`, és a szolgáltató `sharedQuotaProviders` ben van
- `percent` ablakban a fiók kapcsolata az egyik kulcs, amelyet a kulcs használhat
- a kulcs saját részesedése az ablakból beolvasásra került: a `status` nem `unavailable`

Ellenkező esetben `members` hiányzik. Ez soha nem egy üres lista.

- Minden szelet `{ slot, consumed, isYou }`. A válaszséma elutasít minden más tulajdonságot a szeleten, valamint a 20-nál több szeletből álló listát. A szeletek réssorrendben vannak felsorolva.
- Lefoglalt kulcsonként egy szelet található, beleértve azt a kulcsot is, amely már nem tud kérelmet benyújtani. A haszontalan tag valódi nullát mutat.
- Az 1. slot mindig a kérdező kulcs, `isYou` true értékkel. A többi slotszám egy kulcsos hash rangja. `API_KEY_SECRET` vel van kulcsolva, és lefedi a medencét, a kérő kulcsot és a tagot.
- Tehát a számok nem sorakoznak a tartók között. Az egyik tulajdonosnál a látogatások között ugyanazok maradnak. Módosulhatnak, amikor egy kulcs csatlakozik a készlethez, elhagyja azt, vagy amikor a titkot elforgatják.
- Egy megszámlálható ablakon egy szelet a tag számlálója a kvótatárolóban, ugyanaz, mint a saját `consumed` számlálója.
- A `percent` ablakon egy szelet a tag `attributed` része, ugyanabból a könyvből, amely a kulcs saját részesedéseként olvasható. A medencén kívüli használatot soha nem osztják szeletekre. Ez a töltés súly szerint van felosztva, így az azt szállító szeletek mutatnák a súlyokat.
- Minden nézet párhuzamosan egy értéket olvas a többi tagonként és megszámlálható ablakonként. A `percent` ablakon a szeletek nem kerülnek olvasásba, mint a részvény saját könyve. Ha egy érték nem olvasható, abban az ablakban nincs `members`, és a kulcs saját megosztása megmarad.
- A beállítást és a használható kulcsok számát a rendszer készletenként egyszer olvassa be, és csak olyan kulcs esetén, amely láthatja a fiókadatokat. Az opció vagy a használható kulcsok számának sikertelen beolvasása kikapcsolja az adott készlet sávjait. A szerver naplóz egy figyelmeztetést, és a nézet többi része elkészül.

A sávokon nem szerepelnek nevek vagy azonosítók. Még mindig elmondanak egy kulcstartónak valamit a többi tagról:

- A tulajdonosok továbbra is egyeztethetik a szeleteket értékük alapján.
- A stabil számozás lehetővé teszi, hogy a tulajdonos egy tagot kövessen az idő múlásával.
- A szeletek száma megmutatja, hogy hány kulcs van lefoglalva a készletben.
- A három kulcsból álló készletben valaki, aki tudja, mit használt az egyik kulcs, meg tudja mondani, mit használt az utolsó kulcs.
- Ha egy medence három használható kulcs alá esik, a sávok eltűnnek. A korábbi nézetek még mindig azt mutatják, hogy az egyes tagok mit használtak.
- Egy megszámlálható ablakon a szeletekkel csökkentett készletösszeg megmutathatja a már nem lefoglalt kulcsok használatát.
- Az a tag, amelyik nullát mutat egy fiókban, és használja a másikban, megmutathatja, hogy melyik tag melyik fiókot használja.
- A `hard` politikával rendelkező megszámlálható készletben a szelet, amely megáll a növekedésben egy tag méltányos részesedésénél, az adott tag súlyára utal.

### Használati sorozat (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` ( `/v1/me/usage` szolgáltatónál is szolgál) a hívókulcs saját kéréseinek használatát és költségét adja vissza: összesen, egy bejegyzés UTC naponként, naponként és modellenként, modellenként és szolgáltatónként. Megosztja a fenti kvótaútvonal jelzőjét, a hitelesítési szabályokat, a `self:usage` hatókört, a `Cache-Control: no-store` és a hibaviselkedést. A kulcsot `range` előtt ellenőrizzük. A hibák 400 (`Invalid range`), 401 , 403 , 404 és 500 (`Failed to build usage`).

- `range` `1d`, `7d`, `30d` (alapértelmezett) vagy `90d` egyike. Minden más érték, üres érték vagy ismétlődő paraméter 400. A halmaz megáll `90d` nél, hogy lekösse a hívás költségét. A nézet csak a nyers használati előzményeket olvassa be, nem a napi összefoglalókat, amelyek nem tartalmaznak kulcsot.
- A sorokat a hívógomb azonosítója választja ki. A kulcsnév oszlop soha nem illeszkedik, és a kulcsazonosító nélkül rögzített sorokat soha nem számolja a rendszer.
- A sorozat felépítése öt csoportosított lekérdezést futtat le az ablak kulcssorain. A beépített sorozatot 60 másodpercig újrafelhasználják kulcsonként és tartományonként, az újrafelhasznált hívások pedig nem futnak le. A `generatedAt` megadja a korát.
- Az ablak akkor ér véget, amikor a sorozat elkészül. A később, például az óra elferdítésével bélyegzett sort nem számolja a rendszer.
- `coverage.retentionDays` az operátor nyers használati előzmény-megőrzési beállítása (`retention.usageHistory` az adatbázis-beállításokban). `coverage.truncatedByRetention` akkor igaz, ha a kért tartomány hosszabb, mint a beállítás. Összehasonlítja a két számot, és nem ellenőrzi, hogy valóban hiányoznak-e sorok.
- A szolgáltató a kulcs saját kérésére rögzített formában kerül visszaküldésre. A modell az utolsó `/` után rögzített név, és a sorok ez alapján vannak csoportosítva. Egy olyan kombinált kérést, amelynek minden célpontja elutasításra került, rögzítésre kerül az útválasztási címkével, mint szolgáltatóval (a kombinált név, `auto` vagy `combo`) és a kliens által küldött modellkarakterlánccal. Más elutasított kérések, például megszakító megszakító, modellhűtés vagy kvótaparkolt kihagyás, megtartják a célszolgáltatót és a modellt.
- A számon és a költségeken kívül a válasz tartalmazza az átlagos késleltetést, a sikerességi arányt, valamint az első és az utolsó kérés időpontját.
- `byModel` felsorolja azt az 50 szolgáltató-modell párt, amelyeknél a legtöbb kérés van. Több pár esetén a bejegyzései nem adják ki `summary`, és `summary.uniqueModels` minden rögzített modellelírást számol. `byModelTruncated` ekkor igaz, és egy modell, amelynek párjai a vágás mindkét oldalára esnek, részösszegeket mutat.
- Két költséget jelentenek. `costUsd` a számlázott költség, ahogy a használati elemzés is mutatja. Az átalánydíjas előfizetési szolgáltatók, mint például a Claude kódcsomag, 0 dollárral számolnak. `listPriceUsd` ugyanaz a használati ár, listaáron, az előfizetésekkel együtt. Az a kérés, amelynek modelljében nincs ársor, számolja a tárolt költségét: a szolgáltató által jelentett költséget vagy a kérés rögzítésekor számított költséget. Csak az egyiket sem tartalmazó kérés számít 0-nak, jelölő nélkül, tehát az összeg részleges is lehet.
- A válaszszerződés `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Önkiszolgáló oldal

Ha `QUOTA_SELF_PANEL` be van kapcsolva, `/quota/{provider}` nyilvános oldal. A kulcstartó beír egy API kulcsot, és meglátja a kulcskészleteket a szolgáltató számára. Minden készlet egy kártyát mutat készletablakonként, a készlet felhasználásával mindenki számára és a kulcs saját részesedésével. A pool minden számlája saját kártyákkal rendelkezik, a számlahasználattal és a kulcs részesedésével. A fiók használata csak akkor jelenik meg, ha a kulcs láthatja a fiókadatokat. Az oldal felsorolja az egyes fiókok modellenkénti korlátait és a kulcs saját használatát is. Értesítés jelenik meg, ha egy ütemezés jelenleg blokkolja a kulcsot. A kártya modellenként felsorolja a kulcs minden kupakját a használattal együtt, és megjelöli az elérteket. `{provider}` egy szolgáltatóazonosító vagy annak álneve (`/quota/claude`, `/quota/cc`). Egy ismeretlen szolgáltató és minden `/quota/*` elérési út, amíg a zászló ki van kapcsolva, a 404-es választ adja. Az egyéni OpenAI- vagy Anthropic-kompatibilis csomópontok készleteinek nincs oldala. A API továbbra is válaszol helyettük.

Az oldalnak nincs munkamenete. A kulcs csak a `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` és `GET /api/v1/me/usage` `Authorization` fejlécében kerül elküldésre, URL-ben soha. A kiszolgáló által elfogadott kulcs a lap `sessionStorage` fájljában található. Az „Emlékezzen erre az eszközre” funkcióval `localStorage` -ben marad, a „Felejtsd el a kulcsot” pedig mindkettőből eltávolítja. A szerver által elutasított kulcsot eltávolítják a tárhelyről.

A `consent` módban lévő pool egy hitelkártyát mutat. Itt a kulcstulajdonos beállítja a kulcs kölcsönadandó tétlen hányadának egy teljes százalékát 0 és 100 között. A jogosult kiválasztja azt is, hogy mennyi ideig tart a hozzájárulás: kikapcsolásig, 1 óra, 8 óra, 24 óra, 7 nap vagy 30 nap. Az időtartam a mentés pillanatától számít. Amíg a határidő érvényben van, a tulajdonos megtarthatja azt. Ha ez a határidő lejár a Mentés előtt, a kártya nem küld semmit, és más választást kér. 0% esetén nem küldenek határidőt. A kártya a tárolt határidőt mutatja a megnevezett időzónával. Az a hozzájárulás, amelynek határideje lejárt, lejártként jelenik meg.

A `hard` kulcs esetén a kártya azt is felsorolja, hogy készletablakonként milyen más kulcsok kölcsönöznek a kulcshoz jelenleg. Minden sor egy számjegy az összes többi kulcshoz együtt. A két kulcsból álló készletben a másik kulcs saját alakja. A nézet által nem közölt szám nem elérhető, nem pedig nulla. `soft` vagy `burst` kulcs esetén a kártya azt írja, hogy nem vonatkozik szám.

A `saturation` módban lévő pool, amelynek kulcsa 0 feletti százalékot tárol, csak kivonást mutat. Azt írja ki, hogy a tárolt százaléknak nincs hatása. A Visszavonás gombja 0-t küld határidő nélkül. A tárolt 0 `saturation` módban lévő pool nem mutat hitelkártyát. Mentés után egy kártya, amelyre a visszaadott nézetnek már nincs szüksége, az üzenetével együtt marad mindaddig, amíg az oldal nézete ismét meg nem változik.

Semmi sem kerül mentésre, amíg a tartó meg nem nyomja a Mentés vagy a Visszavonás gombot. Minden megnyomás egy `PATCH /api/v1/me/quota/{provider}` kérést küld, a második megnyomás pedig semmit sem küld, amíg az első függőben van. A test viszi a medence átlátszatlan `ref` a nézetből, százalékból és határidőből. A válasz az átépített kvóta nézet, és az oldal második olvasás nélkül mutatja. Ha két mentés átfedi egymást, az oldal az utolsó válasz után egyszer olvassa be a kvótát. Az oldal a hozzájárulást nem tárolja a böngésző tárhelyén.

Az elutasított változtatást a kártyán a HTTP állapotból választott szöveg magyarázza. A hibatörzs nem kerül beolvasásra. A 401-es azt mondja, hogy a kulcsot nem fogadták el, és újratölti a kvótát. A 403-as azt mondja, hogy a pool nem változtat a hitelezésen, a 404-es pedig azt mondja, hogy a pool eltűnt. Mindkettő kínál egy gombot, amely újratölti a kvótát. A 400-as vagy más 4xx-es válasz arra kéri a tulajdonost, hogy ellenőrizze a százalékot és a határidőt. A 429 megkéri a tulajdonost, hogy várjon, a `Retry-After` másodpercekkel, amikor a válasz megadja. Az 5xx-es válasz, a 408-as vagy hálózati hiba azt jelzi, hogy a változtatást nem sikerült elmenteni, és megtartja a beírt értékeket. A szerződésen kívüli válasz újratölti a kvótát. A sikertelen mentés önmagában nem távolítja el a kulcsot. Az elutasítás utáni újratöltéskor az oldal eltávolítja a kulcsot, mint minden elutasított olvasásnál.

A kulcs elfogadása után az oldalon megjelenik egy „Eszközök beállítása” kártya is, három füllel. A "Claude Code" a `~/.claude/settings.json` `env` blokkját adja meg. A "Shell" ugyanazokat a változókat adja, mint `export` sorok. A "Claude Desktop" megadja a harmadik féltől származó következtetési ablak értékeit. A modellek azok a kvóta-megosztási modellek, amelyeket a kulcs hívhat az adott szolgáltatóhoz. Ha nem érkezik ilyen lista a kulccsal, a blokk inkább bekapcsolja az átjárómodell felderítését. Az átjáró címe a nyilvános API eredet, amelyet a szerver jelent (`OMNIROUTE_PUBLIC_API_BASE_URL`, majd `OMNIROUTE_PUBLIC_BASE_URL`). Ha egyik sincs beállítva, a kártya egy helyőrzőt mutat, és felszólítja a birtokost, hogy kérdezze meg az adminisztrátort. A kulcs helyőrzőként jelenik meg. Az "Include my key" a teljes kulcsot a képernyőn megjelenő szövegbe helyezi, és abba, amit a másolás gomb másol. Ez addig tart, amíg a dobozt ki nem ürítik, a kulcsot elfelejtik vagy kicserélik, vagy az oldalt meg nem hagyják. A kártya nem küld kérést és nem kínál fájlletöltést.

A API jelzések `stale` leolvasása valószínűleg elavultnak tűnik. A `unavailable` jelölő leolvasás az okával együtt jelenik meg, soha nem nullaként.

Százalékos tervek esetén az oldal lehívja a kulcs saját részesedését, amikor a API jelenti azt. Azt mondja, hogy a szám becslés, és megnevezi a két részét. A modellenkénti korlátok csak a fiókot mutatják.

Ha egy ablak `members` hordoz, a kártyáján egy sáv is látható, amelyen tagonként egy szegmens található, nyílások sorrendjében. A kérdező gomb szegmense az ékezetes színt használja. A többi szegmens a téma diagram színei között váltakozik. A szöveges jelmagyarázat minden szegmenst felsorol az értékével együtt, így semmi sem függ a színtől. A szegmensek `You` vagy `Member N` címkével vannak ellátva, ahol N a slot.

### Dedikált port az oldal számára

`QUOTA_PANEL_PORT` megnyit egy második figyelőt, amely csak az önkiszolgáló oldalt szolgálja ki. Ki van kapcsolva, hacsak nincs beállítva a változó. `QUOTA_PANEL_HOST` a kötési cím, és alapértelmezés szerint `127.0.0.1`.

A figyelő ezeket az útvonalakat továbbítja a fő porthoz, és minden más útvonalra 404-et válaszol:

| Útvonal                                                                  | Kiszolgál                                   |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| `/quota/{provider}`                                                      | Az oldal                                    |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | A kvótanézet az oldalon olvasható           |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Az oldalon olvasható használati sorozat     |
| `/_next/static/`                                                         | A build szkriptjei, stílusai és betűtípusai |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikonok                                      |

`GET` és `HEAD` test nélkül van közvetítve. A rendszer egy törzstel rendelkező kérést is továbbít: a kvóta nézeti útvonalának `PATCH`, amelyet az oldal elküld a kölcsönzési választás mentéséhez. Minden más módszer 404-et válaszol, kivéve a CONNECT kérést, amelynek kapcsolata válasz nélkül bezárul. Minden egyéb kérés, amely egy testet deklarál, 404-es választ kap, és a kapcsolata megszakad. A frissítési kérelmek elutasításra kerülnek, és kapcsolatuk megszűnik. A pontszegmenssel vagy töredékjelölővel rendelkező útvonalat a rendszer elutasítja, mint a API porton. Ugyanígy a kéréscél a nyomtatható ASCII karakteren kívüli karakterrel. A célban lévő nyers vezérlőkarakterre 400-as választ ad a HTTP értelmező, mielőtt ez a port ellenőrizné. A keretrendszer saját használatra fenntartott kérésfejlécek nem kerülnek továbbításra: `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` vagy `x-next-` karakterekkel kezdődő nevek, valamint a `x-matched-path` és `next-resume` nevek. A kérést ezek nélkül továbbítják. Az irányítópult, a bejelentkezési oldal, a felügyeleti API és a következtetési útvonalak nem érhetők el ezen a porton keresztül.

A `PATCH` tartalmaznia kell a `Content-Type: application/json`, paraméter nélkül vagy csak `charset=utf-8` vel. Tartalmaznia kell egy `Content-Length` 1-től 4096-ig, sima számjegyként írva, `Transfer-Encoding` nélkül. Az egyik szabályt megszegő `PATCH` 404-es választ ad. Néhány hibás hosszúságra, például egy aláírt vagy ismétlődő hosszúságra, a HTTP értelmező 400-as választ ad a port saját ellenőrzése előtt. A port beolvassa a deklarált bájtokat, mielőtt kapcsolatba lépne a fő porttal, és legfeljebb 5 másodpercig vár rájuk. Az addigra nem teljes test válaszol a 404-re, és a kapcsolata megszakad. Ebben az esetben, vagy amikor a kliens először távozik, semmi sem éri el a fő portot. A port pontosan a deklarált bájtokat továbbítja, ugyanazzal a `Content-Length`-val. Az utánuk lévő bájtok a kapcsolat következő kéréseként kerülnek beolvasásra. Az elülső TLS fordított proxynak továbbítania kell `Content-Length`, és nem szabad újradarabolnia a kérés törzsét. A fő port ellenőrzi a API kulcsot a `Authorization` fejlécben, mint a `GET` esetében.

A 404-es karosszéria `{"error":"not_found","message":"Not found."}`. A meghibásodott relé 502-re (`api_bridge_unavailable`) vagy 504-re (`api_bridge_timeout`) válaszol `detail` mező nélkül.

A hallgató nem olvassa el `QUOTA_SELF_PANEL`, és nem kapcsolja be az oldalt. Amíg a zászló ki van kapcsolva, az oldal és a hozzá tartozó API 404-re válaszol a fő porton, és a figyelő továbbítja ezt a választ.

A fejlesztői szerver (`next dev`) alatt az oldal nem válik interaktívvá ezen a porton keresztül. A fejlesztési hot-reload socket frissítési kérés, és a port elutasítja. Fejlesztés közben használja a fő portot.

A port sima HTTP szolgál ki, az oldal pedig API kulcsokat küld. Tartsa meg az alapértelmezett kötési címet, és tegyen elé egy fordított proxyt TLS -vel. A visszahurkolástól eltérő kötési cím ezt az értesítést naplózza:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Az a visszacsatolási társ, amely nem küld továbbítási fejlécet, helyinek számít a fő porton. Tehát az ugyanazon a gazdagépen lévő proxynak el kell küldenie `X-Forwarded-For`. A privát címen lévő proxy csak `OMNIROUTE_TRUST_PROXY=private` (vagy `lan`) esetén megbízható az adott fejléchez. Minden más partnert a kapcsolat címe jelent, és az általa küldött továbbítási fejléceket eldobja.

A hallgató egyszerre legfeljebb 256 kapcsolatot tarthat fenn. Az ügyfélnek 10 másodperce van a kérés fejléceinek és 30 másodperce a teljes kérés elküldésére. A tétlen, életben tartott kapcsolat körülbelül 5 másodperc után bezárul. A 60 másodpercig nem végzett kapcsolat megszakad. Ezek az értékek rögzítettek. Állítson be csatlakozási és sebességkorlátokat az elülső fordított proxyn is. Az elülső fordított proxynak 5 másodpercnél rövidebb ideig meg kell tartania tétlen felfelé irányuló kapcsolatait, vagy nem szabad újra felhasználnia azokat. A fő porthoz vezető relé a API port (`API_BRIDGE_*`) upstream timeoutjait használja.

A figyelő akkor is elindul, ha `API_PORT` nincs beállítva. `QUOTA_PANEL_PORT` 1 és 65535 közötti portnak kell lennie, csak számjegyekkel kell írni. Ennek különböznie kell a műszerfali porttól és a API porttól. Amíg az élő WebSocket szerver be van kapcsolva, annak is különböznie kell `LIVE_WS_PORT` től (alapértelmezett 20132). Minden más érték nem nyit semmit, és figyelmeztetést naplóz. A visszautasított értékre vonatkozó figyelmeztetés megnevezi a változót, és nem ismétli meg az értéket. A már használatban lévő port nem nyit semmit, és naplózza a következő figyelmeztetést:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

`OMNIROUTE_BASE_PATH` beállítása esetén a hallgató minden fenti elérési utat az adott előtag alatt vár. Ugyanazt a `OMNIROUTE_BASE_PATH` használja felépítési és futási időben. Írja bevezető perjellel, és ne záró perjel, például `/omniroute`. Egy másik alakzat, beleértve `/` és `/omniroute/`, figyelmeztetéssel hagyja el a portot, bár a build elfogadja ezeket az űrlapokat. Ugyanez vonatkozik az alapútvonalra is, amelynek első szegmense egy alkalmazási útvonalat nevez meg: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` vagy `connect`, minden esetben.

Korlátozások:

- `/quota/{provider}/` egy perjellel 404-et válaszol ezen a porton.
- A szervizmunkás és a webalkalmazás jegyzéke nem szolgál ki ezen a porton.
- Az irányítópulton beállított egyéni favicon nem jelenik meg ezen a porton.
- Az ikonok nem jelennek meg, ha az alkalmazás alapútvonalon fut.
- A port sima HTTP/1.1. beszél
- A sikertelen összerendelést a rendszer nem próbálja újra, amíg a folyamat újra nem indul.
- A figyelőnek nincs kapcsolata vagy sebességkorlátja ügyfélcímenként.
- Ez a szakasz nem vonatkozik a konténerbeállításokra.

---

## Környezeti változók

| Változó                              | Alapértelmezett | Leírás                                                                                  |
| ------------------------------------ | --------------- | --------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`        | Használható illesztőprogram: `sqlite` vagy `redis`                                      |
| `QUOTA_STORE_REDIS_URL`              | _(üres)_        | Redis URL, pl `redis://localhost:6379`                                                  |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`           | 0..1; `>= threshold` szigorú módot aktivál                                              |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`          | Tokenek, amelyek a százalékos tervablak legfeljebb egy pontját magyarázzák              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`           | 0..1; szorzó a soft-policy kombinált pontszámhoz                                        |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`            | Napokkal azelőtt, hogy GC eltávolítja a régi `quota_consumption` vödröket               |
| `QUOTA_PANEL_PORT`                   | _(unset)_       | Dedikált port az önkiszolgáló oldal számára. Az Unset azt jelenti, hogy nincs hallgató. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`     | Az adott porthoz tartozó kötési cím                                                     |

DB beállítások (`quotaStore.*`) felülbírálják az env vars.

---

## Hibaelhárítás

### A Redis konfigurálva van, de nem csatlakozik

Ellenőrizze, hogy az `ioredis` telepítve van-e (`npm ls ioredis`), és hogy a
`QUOTA_STORE_REDIS_URL` elérhető-e. Kapcsolódási hiba esetén a gyár visszaáll
az SQLite használatára (naplózási szint: `warn`).

### A `peek` elavult eredményt ad / hiba esetén engedélyez

Ha a `peek` kivételt dob, az `enforceQuotaShare` az eredményt „engedélyezésként”
kezeli (hiba esetén engedélyező működés). A kiváltó ok azonosításához ellenőrizze
a `pino` naplóiban a `quota:enforce` és `quota:factory` bejegyzéseket.

### Fogyasztásszámláló eltérése

Ha a szolgáltató tényleges használata eltér a számlálóktól, az várható — a
két gyűjtős csúszóablak hibája az ablakhatároknál körülbelül 1%, a `consume`
pedig válasz utáni, „küldd el és felejtsd el” módon működik. A telítettségi jel
(`saturationSignals.ts`) 30 másodperces TTL-lel olvassa a szolgáltató valós
kihasználtságát, és ennek megfelelően módosítja a `globalUsedPercent` értékét.

### A készletnél „nincs adat” jelenik meg a felhasználási sebességhez

A `computeBurnRate` legalább 2 előzménybeli mintát igényel. A korábbi `consume`
hívások nélküli új készleteknél a `tokensPerSecond: 0` és a
`timeToExhaustionMs: null` érték jelenik meg.

---

## Migráció a localStorage-ból

A `/dashboard/costs/quota-share` első betöltésekor a `useLocalStoragePoolMigration`
hook a következőket ellenőrzi:

1. A `localStorage.getItem("omniroute:quota-share:pools")` értéke nem üres.
2. A `GET /api/quota/pools` `[]` értéket ad vissza (az adatbázis üres).

Ha mindkét feltétel teljesül, kötegelve elküldi az összes korábbi poolt a
`POST /api/quota/pools` végpontnak, majd eltávolítja a localStorage-kulcsot. A migráció idempotens:
a 2. feltétel megakadályozza az ismételt migrációt.

---

## Belső stratégia besorolása

A `quota-share` egy **kizárólag belső használatú** útválasztási stratégia
(`INTERNAL_ROUTING_STRATEGY_VALUES` az `src/shared/constants/routingStrategies.ts` fájlban).
Kizárólag a rendszer által létrehozott `qtSd/` poolkombinációk használják, és szándékosan ki van
zárva a `ROUTING_STRATEGY_VALUES` értékei közül, így soha nem jelenik meg felhasználó által
kiválasztható beállításként a felhasználói felületen vagy az API-ban.

---

## Teszt lefedettsége

Két rétegű automatizált lefedettség szállítja a kvótamegosztási motort:

| Kíséret            | Parancs                                                                | Mit takar                                                                                                                                                                                                                                      |
| :----------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egység (29 teszt)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR ütemező, telítettségi kapuzás, párhuzamossági korlátok, fairShare matematika, lemaradási sorban állás                                                                                                                                      |
| Integrációs mátrix | `npm run test:combo:matrix`                                            | Végpontok közötti útválasztási döntés a valódi kombinált csővezetéken keresztül; DRR fairness + telítettség prioritásának megszüntetése élő varratokon keresztül (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Az integrációs mátrix CI ban fut mind a 22 nyilvános stratégia mellett. Az egységcsomag önállóan is működtethető.

---

## DB séma összefoglaló

`078`, `079` és `085` migrációval hozzáadott három tábla:

- `quota_pools` + `quota_allocations` — készletdefiníciók és kulcsonkénti kiosztások.
- `quota_consumption` — gördülő 2 vödör számláló per `(apiKeyId, dimensionKey)`.
- `provider_plans` — kézi szolgáltatói terv felülbírálása (dimenziók JSON per connectionId).

Idempotens `CREATE TABLE IF NOT EXISTS` migrációval hozzáadott összes tábla.

A jóváhagyott kölcsönzés három oszlopot ad hozzá: `quota_allocations.lending_percent` (egész szám, alapértelmezett 0), `quota_allocations.lending_until` (korszak ezredmásodperc, vagy `NULL` határidő nélkül) és `quota_pools.borrow_mode` (alapértelmezett `saturation`). Az áttelepítés csak ezeket az oszlopokat adja hozzá, és nem ír meglévő sort.

A százalékos hozzárendelési könyv hozzáadja `quota_percent_ledger` (egy sor készletenként, fiókonként és tervablakonként) és `quota_percent_ledger_tokens` (egy tokenszámláló készletenként, fiókonként és API kulcsonként). `src/lib/db/quotaPercentLedger.ts` olvassa és írja őket.
