# Quota Sharing Engine (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreferens**: `docs/routing/QUOTA_SHARE.md`
> Del av grupp B (planerna 16 + 22).

---

## Översikt

Motorn för kvotdelning fördelar en leverantörs tidsbaserade kvot (t.ex. Codex
5-timmarsfönster, Kimi 1500 förfrågningar/timme) rättvist mellan flera API-nycklar som delar
samma anslutning.

**Problem som den löser:** OmniRoute vidarebefordrar trafik från många API-nycklar till samma
leverantörskonto uppströms. Utan delningslogik kan en trafikökning från nyckel A förbruka
hela leverantörskvoten för timmen, vilket gör att nycklarna B och C blockeras tills fönstret återställs.
Motorn förhindrar detta genom att:

1. Spåra varje nyckels rullande förbrukning per dimension (%, förfrågningar, token, $).
2. Tillämpa en arbetsbevarande algoritm för rättvis fördelning: en nyckel får låna från inaktiva
   andelar så länge den globala poolen inte är mättad.
3. Verkställa resultatet i den kritiska exekveringsvägen (`chatCore.ts`) innan förfrågan
   når exekveraren uppströms.

---

## Algoritm: Fair-Share Work-Conserving

Implementerad i `src/lib/quota/fairShare.ts`.

### Lägen

| Skick                                      | Läge        | Beteende                                                              |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generös** | Nyckeln kan låna upp till den globala gränsen minus konsumerat totalt |
| `globalUsedPercent >= saturationThreshold` | **Sträng**  | Genomför strikt individuell rättvis andel                             |

Standard `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Dessa två lägen beskriver en pool i standardlåneläget, `saturation`. En pool i `consent` läge tillämpar alltid de strikta reglerna, oavsett mättnad. Se [Samtyckt utlåning (tillval per pool)](#consented-lending-per-pool-opt-in).

### Beslut per dimension

För varje aktiv dimension i poolen beräknar motorn:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

För `percent` dimensioner kommer `consumed` istället från attributionsboken (se [Procentdimensioner: per-key attribution](#percent-dimensions-per-key-attribution) ).

Sedan:

- **`policy = hard`** : om `consumed > fairShareAllowed` och läget är strikt →** blockera** .
- **`policy = soft`** : om `consumed > fairShareAllowed` och läget är strikt →** straffa** (nedprioritera i kombination; aldrig hårdblockera).
- **`policy = burst`** : tillåt medan det finns globalt utrymme oavsett rättvis andel.

### Cap absoluto

`capValue` + `capUnit` på en allokering är ett hårt tak oberoende av läge eller policy. Alla dimensioner där `consumed >= capValue` alltid** block** begäran. För en `percent` cap är `consumed` endast den del som tillskrivs nyckeln.

### Flerdimensionell kontroll

En begäran blockeras om** några** dimension i poolen skulle blockera den. Dimensioner är oberoende — en 5h% utmattning påverkar inte vecko%-dimensionen.

### Upplåning

I generöst läge kan en nyckel vars tilldelning är underförbrukad använda överskott från andra nycklars otilldelade andelar. Formeln är:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

där `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` för den dimensionen) är alltid det hårda taket.

### Samtyckt utlåning (tillval per pool)

Varje pool har ett låneläge. `saturation` är standard och behåller reglerna ovan. I `consent` läge skickar en `hard` nyckel sin andel endast inom den kapacitet som andra nycklar gick med på att låna ut. Administratören ställer in läget för varje pool. Varje nyckelinnehavare anger sitt eget samtycke genom [utlåningssamtycke](#lending-consent).

Ett samtycke är en procentandel från 0 till 100 och en valfri deadline i epok millisekunder. Nyckeln lånar ut den procentandelen av sin lediga andel medan deadline ligger i framtiden.

För en dimension är `L` den effektiva gränsen: plangränsen gånger kontona i poolen. Grinden beräknar, för den begärande nyckeln:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` är nyckelns vikt, eller `100 / n` för varje nyckel när ingen vikt är över 0. `lend_k` är nyckelns aktiva procent, och 0 när dess deadline har passerat. Den begärande nyckelns eget samtycke räknas aldrig. En `hard` nyckel nekas när dess konsumtion når sin andel plus `borrowAvailable`.

Kapacitet som ingen tilldelning gör anspråk på (100 minus summan av vikterna) är inte utlånbar. Ingen nyckel gick med på att låna ut den.

**Exempel.** `L` är 1000.

| Nyckel | Vikt | Dela | Förbrukad | Lånar ut |
| ------ | ---- | ---- | --------- | -------- |
| A      | 50   | 500  | 530       | 0%       |
| B      | 30   | 300  | 100       | 50%      |
| C      | 0    | 0    | 60        | 0%       |

- B lånar ut 50 % av sina lediga 200, vilket är 100. C tog redan 60 över sin andel. A får låna 40.
- A serveras vid 530 och vägras när dess konsumtion når 540.
- Innan C använde något, med A på eller under sin andel, kunde C låna 100.
- Innan C använde något, med A på 530, kunde C låna 70.

**Noll vikt.** En nyckel med vikt 0 har en andel på 0. Den serveras endast medan dess konsumtion är lägre än vad andra lånar ut. När ingen lånar ut avvisas det från första begäran.

**Deadlines.** Ingen bakgrundsuppgift löper ut ett samtycke. Varje begäran jämför deadline med sin egen tid, och en deadline som är lika med den tiden har passerat. En lagrad deadline som inte är ett ändligt tal, eller som har passerat det största datum en `Date` kan hålla, räknas som passerad.

**`soft` och `burst`.** Utlåning begränsar dem inte. En `soft` nyckel nedprioriteras en gång förbi sin andel. En `burst` nyckel passerar medan poolen har plats. Pooltaket vägrar fortfarande varje nycklar när poolens totalsumma når sin gräns.

**Kostnad på sökvägen för begäran.** En `saturation` pool läser inget mer än tidigare. I en `consent` pool läser en räknebar dimension de andra nycklarna endast för en `hard` nyckel vid eller över dess andel medan en annan nyckel lånar ut. Den gör sedan en läsning per annan tangent, parallellt. En misslyckad läsning räknas som en förbrukning på 0 för den nyckeln. En `percent` dimension lägger inte till någon läsning, eftersom attributionsboken innehåller varje nyckel.

**Redigera en pool.** En redigering behåller samtycke från nycklarna som stannar. Detta gäller för allokeringsredigeringar, gruppomfattande ersättningar och `ensure` anrop. En borttagen nyckel förlorar sitt samtycke, och en nyckel som läggs tillbaka börjar vid 0. Administratörsvägarna returnerar varje nyckels samtycke och skriver det aldrig. Att byta tillbaka en pool till `saturation` behåller varje lagrat samtycke, vilket inte har någon effekt i det läget. Om du växlar poolen till `consent` igen aktiveras de lagrade samtyckena vars deadline inte har passerat. En nyckelinnehavare kan rensa ett lagrat samtycke i båda lägena.

**Uppgraderar.** Om kolumnerna `lending_percent` och `lending_until` redan finns, lägger migreringen endast till `borrow_mode` och lagrade procentsatser förblir som de är. Varje pool startar i `saturation` läge. Slå på `consent` per pool i poolguiden. Ingenting härleds från de lagrade värdena.

**Begränsningar.**

- En långivare kan hitta poolen i taket innan den använder sin egen andel. Kapacitet som andra lånat räknas till poolens totala.
- Checken körs före begäran och reserverar ingenting. Samtidiga förfrågningar läser förbrukningen innan någon registreras, så utlånad kapacitet kan spenderas mer än en gång, begränsat av förfrågningarna under flygning. Dela kontrollen av `saturation` läget har samma egenskap.

---

## Räknare med glidande fönster

Implementerad i `src/lib/quota/sqliteQuotaStore.ts` och `redisQuotaStore.ts`.

Två segment per `(apiKeyId, dimensionKey)`:

- `curr`: aktuellt segment (`floor(nowMs / windowMs)`)
- `prev`: föregående segment (`curr - 1`)

Effektivt rullande värde:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precision**: cirka 99 % noggrannhet. Felet är högst 1 % av fönstrets storlek vid
gränsen mellan segmenten (inneboende i approximationen med två segment).

### Samtidighet

SQLite-drivrutin: ett mutexlås i minnet per nyckel `(apiKeyId | dimensionKey)` förhindrar
kapplöpningen vid läsning-modifiering-skrivning. Mönstret motsvarar skyddet mot samtidiga anropsstormar i `src/sse/services/auth.ts`.

Redis-drivrutin: Lua EVAL-skript för atomär ökning — körs som ett enda Redis-kommando.

---

## Drivrutiner

### SQLite (standard, ingen installation)

- Tabell: `quota_consumption` (se migrering `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Passar bäst för installationer med en enda instans.
- All persistens sker i den befintliga SQLite-databasen för OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (valfritt, flera instanser)

- Kräver npm-paketet `ioredis`.
- Räknare lagras i Redis, medan metadata (pooler/allokeringar) fortfarande lagras i SQLite.
- Passar bäst för installationer med flera repliker där räknare måste delas.

### Byta drivrutin

Via inställningsgränssnittet (`/dashboard/settings` → Kvotlagring) eller via miljövariabler:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Databasinställningen har företräde framför miljövariabler. Om `driver=redis` men URL:en saknas eller
`ioredis` inte är installerat, återgår fabriken till SQLite och loggar en varning.

Ordning för val av drivrutin:

1. Databasinställningen `quotaStore.driver`
2. Miljövariabeln `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Flerdimensionell

En pool kan ha flera dimensioner. Varje dimension är oberoende:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Exempel: Codex plan** (5h% + per vecka%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

En begäran måste uppfylla alla dimensioner för att tillåtas.

### Procentdimensioner: tillskrivning per nyckel

En procentplan rapporterar en användningssiffra per konto och planfönster. Leverantören ger ingen räknare per API nyckel.

För att dela den siffran mellan nycklar, för varje pool en tillskrivningsbok per konto och planfönster. `src/lib/quota/percentLedger.ts` håller bokens regler. `src/lib/quota/percentAttribution.ts` förvandlar boken till de siffror som tillsynsmyndigheten använder. Resultatet är en uppskattning byggd från tokens varje nyckelväg.

#### Läsningar som rör boken

Boken flyttar endast på leverantörens egen figur för det begärda planfönstret. Dessa anslutningar rapporterar en:

| Leverantör                        | Planera fönster |
| --------------------------------- | --------------- |
| Claude, genom en OAuth anslutning | `5h`, `weekly`  |
| Codex                             | `5h`, `weekly`  |

Dessa räknas inte som läsning:

- ett svar som leverantörens klient markerar som inaktuellt
- ett Claude fönster vars procentandel leverantören inte rapporterade
- ett annat fönsters figur, eller i värsta fall över fönster
- fallbacken för kursgränshuvudet
- en misslyckad läsning

Andra leverantörer, inklusive Claude med en API nyckel, har ingen bok. Varje nyckel debiteras 0 på sina procentdimensioner, som före denna ändring.

En avläsning delar mättnadssignalens 30-sekunders cache. En Claude -avläsning dateras till när siffran observerades i svarsrubriker eller lästes från användningsändpunkten, när den tiden är känd. Övriga avläsningar dateras till när denna cache-post byggdes.

#### Vad boken innehåller

Varje inspelad begäran lägger till sina tokens, en gång, till en räknare per pool, konto och nyckel. En disk bara växer. Boken innehåller tre saker:

- baslinjen: siffran när boken öppnades eller fönstret senast vände
- den senast tillämpade siffran
- per nyckel, dess token-räknare i samma ögonblick, kallas dess märke

Boken uppdateras när verkställighet eller användningsväg beräknar tillskrivningen. Skriver jämförs och sätts på ett revisionsnummer. En författare som tappar försök en gång på en ny läsning.

#### Hur en nyckels del beräknas

Varje nyckels del beräknas när boken läses. Tillväxten av figuren sedan baslinjen delas mellan nycklarna i proportion till de tokens som var och en har dirigerats sedan dess märke.

Together, dessa tokens förklarar högst en punkt av siffran per `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` -tokens (standard 1 000). Tillväxten de inte förklarar är extern. Baslinjen är också extern.

Till exempel öppnar en bok vid 0. Nyckel A leder sedan 900 000 tokens och nyckel B leder 100 000. Vid siffran 60 är A:s del 54 poäng och B:s del är 6.

En räknare under dess nyckelmärke har startat om och räknas fullt ut. En nyckel utan ett märke, till exempel en nyckel som ansluter till poolen i mitten av ett fönster, räknar alla dess polletter. En siffra som släpar efter tokens orsakar ett fel som försvinner vid nästa läsning. Det ackumuleras inte.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` läses på varje attribution. Ett värde som inte är ett ändligt tal på minst 1 faller tillbaka till 1 000.

#### Hur en läsning förändrar boken

Den första matchningsregeln gäller:

1. **Ingen bok ännu:** läsningen öppnar boken. Dess siffra är baslinjen och varje räknare är markerad.
2. **Äldre läsning:** en läsning daterad före den senast tillämpade ignoreras. Så är en avläsning vars återställningstid är mer än 30 minuter tidigare än den lagrade.
3. **Nytt leverantörsfönster:** en återställningstid mer än 30 minuter senare än den lagrade vänder boken. Siffran blir baslinjen och varje räknare markeras igen. Nycklar utan disk lämnar boken.
4. **Avslutat fönster:** en lagrad återställningstid som inte ligger efter avläsningens datatid betyder att fönstret har avslutats. Läsningen vänder på boken, oavsett figur.
5. **Högre siffra:** bara den sista figuren rör sig. Baslinjen och märkena stannar.
6. **Samma figur:** figuren, baslinjen och märkena stannar. Endast en återställningstid boken saknar skrivs.
7. **Nedre siffra:** a lower figure is never applied as such. It turns the book only when three things hold. Den är minst två minuter nyare än den senast tillämpade avläsningen. Nothing says the window is the same open one. It is more than one point lower.

Fönstret räknas som samma öppna när tre saker håller. Both reset times are known. They are within 30 minutes of each other. The stored one is still ahead of the reading. En lägre siffra inuti det fönstret förändrar ingenting.

En återställningstid lagras endast när den ligger före datatiden för den avläsning som bär den. En högre siffra lagrar sin avläsnings återställningstid när den är användbar, och behåller den lagrade annars. En lika siffra registrerar sin läsnings återställningstid endast när boken inte har någon. Det förändrar inget annat. En lägre siffra som inte vänder boken registrerar ingen återställningstid.

#### När boken används

Efter en läsning används boken om inte dess lagrade återställningstid inte är efter den aktuella tiden. Det fallet uppstår när en avläsning tagen strax före återställningen, såsom en som serveras från cachen, observeras strax efter den.

Utan en användbar läsning används den lagrade boken endast medan den fortfarande kan vara det aktuella fönstrets bok. Det gäller i två fall:

- its reset time is known and still ahead
- den har ingen återställningstid, och den senaste avläsningen som ändrade den är högst 15 minuter gammal

Annars tillskrivs ingenting, som när det inte finns någon bok. En bok vars lagrade återställningstid har passerat debiteras aldrig.

#### Tillämpning

En nyckels förbrukning på en procentdimension är dess tillskrivna del plus en andel av den externa delen. Den externa delen använder först kapaciteten inga tilldelningsanspråk (100 minus summan av vikterna). Endast överskottet delas mellan nycklarna efter vikt.

Den förbrukningen jämförs med nyckelns beskärda andel som för alla andra dimensioner. Strikt läge startar fortfarande när mättnadssignalen når `QUOTA_SATURATION_THRESHOLD` (standard 0,5). Varje nummer skalas med den effektiva gränsen: gränsen per konto gånger antalet konton i poolen.

Ett absolut tak med `capUnit: "percent"` räknar endast den del som tillskrivs nyckeln, skalad på samma sätt. Ta en gräns per konto på 100 och k konton. Ett tak på N uppnås sedan när nyckelns del av serverkontots siffra når N/k poäng. Varje konto kontrolleras mot sin egen bok. Till exempel, med två konton, uppnås ett tak på 10 vid 5 poäng av ett kontos siffra.

När butiken inte kan läsas tillskrivs ingenting och varje nyckel debiteras 0 på den dimensionen. När en bokskrivning misslyckas, använder den tillskrivningen boken som den lästes. En misslyckad tokenskrivning lämnar den begärans tokens ur boken. Inget av dessa fel blockerar en begäran.

I en `consent` pool använder utlåningsformeln varje nyckels konsumtion på procentdimensionen som beskrivs ovan. När en annan nyckel lånas ut läses boken en gång och tillskrivs varje nyckel. Utan en användbar bok debiteras varje nyckel 0. En nyckel med vikt passerar då och en nyckel med vikt 0 passerar endast när en annan nyckel lånar ut.

#### Användningsväg

`GET /api/quota/pools/{id}/usage` rapporterar samma siffror genom samma funktion. En procentdimension har en post per poolanslutning i `accounts`. Dess toppnivå `consumedTotal` och `perKey` speglar den första posten.

Rutten tillämpar den aktuella läsningen också, så att den kan flytta fram boken som en begäran gör. `internal + external` kan skilja sig från `consumedTotal` när det inte finns någon användbar avläsning, eller när en lägre siffra inte tillämpas.

#### Förvaring och retention

Båda kvotbutikerna håller boken. På SQLite tar den automatiska databasrensningen, när den är aktiverad, bort rader som inte har uppdaterats på 60 dagar. På Redis delar böckerna och räknarna för en poolanslutning en nyckel. Den upphör att gälla 60 dagar efter dess senaste tokenskrivning eller bokbyte. En bok som inte ändras skrivs inte om, så cutoff sätts ovanför det längsta planfönstret. Den manuella återställningen av användningshistorik rensar också böckerna om SQLite (se Begränsningar).

#### Begränsningar

- All tillväxt av kontosiffran sedan baslinjen delas av de tokens som varje nyckel har dirigerats sedan dess. När den tillväxten skedde spelar ingen roll.
- Så användning som görs utanför OmniRoute debiteras nycklarna upp till vad deras tokens tillåter. Det inkluderar användning som gjordes innan en nyckels första begäran av fönstret, när boken redan var öppen.
- Till exempel, extern användning höjer kontot 60 poäng medan inga nyckelvägar. En nyckel dirigerar sedan 30 000 tokens och siffran når 60,6.
- Om boken var öppen före den användningen är nyckelns del 30 poäng. Den bär också 7,65 extern användning, med fyra nycklar med vikten 25.
- Om boken öppnades efter den användningen är de 60 poängen baslinje. Nyckelns del är 0,6 poäng, och den har 15 extern användning.
- En förfrågan eller ett besök på användningsvägen öppnar boken. Så om sådan användning räknas som baslinje beror på när boken öppnades.
- Med standardgolvet, en nyckel som dirigerar 60 000 tokens medan den används utanför höjer kontot 60 poäng får alla 60 som sin egen del.
- Med golvet på 50 000 är den egna delen 1,2 poäng. De andra 58.8 är externa och laddade efter vikt, som all extern användning.
- Ställ `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` nära vad en poäng kostar på din plan. Användning utomhus inkluderar trafik på samma konto från nycklar utanför poolen.
- Ett procenttak gäller i varje läge. En begränsad nyckel kan nekas medan kontot ligger långt under mättnadströskeln.
- Ta ett tak på 10 och 12 poäng för utomhusbruk tidigare i fönstret. En nyckel som dirigerar 20 000 tokens nekas sedan till en kontosiffra på 12,4 %.
- Uppdelningen är en uppskattning av tokenvolym. En begäran räknas som dess prompt-tokens plus dess slutförande-tokens. Cacherabatter och modellpriser ändrar inte den räkningen.
- En begäran som inte slutar med status 200 registrerar inga tokens. Exempel är en ström som klienten kopplar bort och ett uppströmsfel efter att användningen förbrukats.
- Användningen som en sådan begäran orsakade debiteras nycklarna som registrerade tokens, upp till vad deras tokens tillåter. Resten är extern. Den rör sig inte tillbaka. Ett svar som rapporterar ingen tokenanvändning registrerar heller inga tokens.
- Användningen av en pågående begäran kan dyka upp i en annan aktiv nyckels del för hela begäran. Den flyttas tillbaka först när begäran slutar med status 200.
- Användning som redan finns på kontot när en bok öppnas räknas som extern. Detta omfattar en uppgradering, en ny pool och ett nytt konto. Användning i ett nytt fönster före den första läsningen räknas också som extern.
- Varje nyckel börjar med sin viktandel av den användningen, efter kapaciteten som ingen tilldelning gör anspråk på. Med ett konto på 85 % och fem nycklar med vikt 20, börjar var och en med 17 av sina 20 använda.
- I en pool med flera konton appliceras serveringskontots siffra på den summerade budgeten. Detta är oförändrat av boken.
- En lägre siffra i ett fönster som leverantören rapporterar som öppet tillämpas inte. En återställningstid som flyttas tillbaka med mer än 30 minuter behandlas som en gammal avläsning.
- I båda fallen behåller boken sitt tillstånd tills den lagrade återställningstiden går. Därefter laddas boken inte förrän en läsning vänder den.
- Lösningen är den manuella återställningen av användningshistorik (`POST /api/settings/purge-usage-history`). Det rensar tillskrivningsböckerna och deras tokenräknare i SQLite databasen.
- `all` perioden rensar varje bok och räknare. En kortare period rensar först de böcker som inte är skrivna i den. Den rensar sedan räknarna som inte är skrivna i den, utan bara för en poolanslutning som inte har någon bok kvar. En hållen bok markerar fortfarande varje nyckel mot dess disk.
- En bok vars figur inte har rört sig skrivs inte om, så en kortare period kan också rensa det aktuella fönstrets bok. Nästa läsning öppnar då en ny bok vid den aktuella figuren.
- Återställningen berör inte en Redis -kvotbutik. Där slutar en bok med sitt fönster, eller går ut 60 dagar efter att den senast skrivits.
- När leverantören inte skickar någon återställningstid ser ett fönster som återställs och fylls på ovanför den gamla siffran mellan två avläsningar ut som en högre siffra. Boken behåller den gamla baslinjen och märken.
- Avläsningar dateras av den lokala klockan. När den går före leverantörens, eller en källa rapporterar en återställningstid lite tidigt, kan boken dyka upp till den skillnaden tidigt.
- Tillväxten i det korta spannet delas av de tokens som leds i den. Nästa fönsters första läsning korrigerar det. När den vända boken inte har någon återställningstid behöver den korrigeringen en lägre siffra som är minst två minuter nyare än den senast tillämpade avläsningen.
- Förekomster som delar en Redis butiks datumavläsningar med sina egna klockor, så håll dessa klockor synkroniserade. Avläsningar av en instans vars klocka går bakom ser äldre ut och ignoreras.
- När ingen användbar avläsning kommer efter den lagrade återställningstiden, tillämpas inte procentandelar och procenttak per nyckel förrän en avläsning återkommer. Utan en återställningstid börjar detta 15 minuter efter den senaste läsningen som ändrade boken.
- I Redis butiken kan en bok som har varit ledig i 60 dagar löpa ut mellan en skribentcheck och dess skrivning. Den återskapas sedan vid en revision över 1, vilket är ett giltigt tillstånd.

---

## Planlösare

Implementerad i `src/lib/quota/planResolver.ts`.

Prioritetsordning (högst till lägst):

1. **Manuell åsidosättning i databasen** — tabellen `provider_plans`, per `connectionId`.
2. **Känd katalog** — `src/lib/quota/planRegistry.ts` (endast data).
3. **Tom plan** — inga dimensioner, manuell konfiguration krävs.

### Känd katalog

| Leverantör            | Dimensioner                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, okänd), `tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ingen standard — manuell konfiguration krävs                  |

---

## Pipeline Integration

### PRE krok (`open-sse/handlers/chatCore.ts`)

Körs före uppströmsexekveringen, efter autentiserings- och policykontroller:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Misslyckad öppen** : om `enforceQuotaShare` kastar, tillåts begäran igenom med en `pino.warn` logg. Detta förhindrar en bugg med kvotmotorer från att blockera all trafik.

**När kapaciteten kommer tillbaka.** Ett avslag på nyckelns andel eller vid pooltaket slutar med en av två meningar, i båda lånelägena:

- `percent` window: `. The <window> window resets at <time>.` Klockan är återställningen som leverantören rapporterar.
- Räknebar enhet: `. Enough <window> usage is expected to clear by <time>.` Tiden är en övre gräns från det skjutbara fönstret, om nyckeln inte skickar något annat.

`<time>` är en ISO 8601-instant i UTC. Avslaget bär sedan `Retry-After`: hela sekunderna till det ögonblicket, plus en. En klient som väntar så länge försöker igen högst en sekund efter ögonblicket. När ögonblicket inte är känt har avslaget varken meningen eller rubriken. En absolut takvägran bär ingetdera. Den offentliga koden förblir `quota_share_blocked`.

En andelsvägran berör inte den delade anslutningen. Den ställer ingen nedkylning, inget modelllås och inget fel på leverantörsbrytaren, och de andra nycklarna till poolen fortsätter att serveras. När varje mål i en combo vägrar nyckeln för sin del, svarar combo 429 utan att vänta. Dess svar bär ledtråden som `Retry-After`. Inbäddningsvägen avslutar sin vägran med samma mening och skickar ingen `Retry-After`.

### POST -krok (rekordförbrukning)

Efter ett lyckat svar:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Driftnotis** : om `consume` misslyckas efter svar, räknas den rullande räknaren under. Mättnadssignalen från leverantören (t.ex. `anthropic-ratelimit-unified-5h-utilization`) korrigerar den globala uppskattningen vid nästa begäran.

### Combo mjukt straff (`open-sse/services/combo.ts`)

När `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Straffet tillämpas efter alla andra poängfaktorer. Det sänker sannolikheten för autokombination att välja en mättad nyckel utan att hårdblockera den.

---

## UI genomgång

### `/dashboard/costs/quota-share` — Huvudsida för pooler

Komponenter (alla i `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Ändamål                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `QuotaConceptCard`     | Introduktionskort som förklarar kvotdelning för nya användare           |
| `CreatePoolModal`      | Skapa en ny kvotpool (anslutning + namn + initiala tilldelningar)       |
| `PoolCard`             | Sammanfattning per pool: namn, anslutning, tilldelningsantal            |
| `DimensionBar`         | Staplad stapel per dimension: varje nyckels andel + global användning   |
| `AllocationTable`      | Bord med konsumerad, fair share, deficit/surplus, lånande flagga        |
| `BurnRateChart`        | EMA burn-rate linjediagram (lazy Recharts via `dynamic()`)              |
| `EditAllocationsModal` | Redigera allokeringsvikter, tak och policyer för en pool                |
| `BorrowModeField`      | Lånelägesväljare (`saturation` eller `consent`) i guiden                |
| `LendingBadge`         | Skrivskyddat märke på en nyckel som lånar ut, endast i `consent` pooler |

Utlåningsbrickan visar procentandelen och, när den har ställts in, deadline i UTC med zonen angiven. Den bedömer deadline vid tidpunkten för användningsögonblicksbilden. En utgången eller oläsbar deadline visas som `lending expired`.

Sidan hakar:

- `usePools` — hämtar `GET /api/quota/pools` var 30:e:e.
- `usePoolUsage` — hämtar `GET /api/quota/pools/[id]/usage` på begäran.
- `useLocalStoragePoolMigration` — körs en gång på mount för att migrera äldre LS data.

Nyckelsteget i poolguiden har en `Show usage by member to key holders` låda. Den ställer in poolens `memberBreakdown` alternativ (se [Medlemsanvändning](#member-usage) ). Under den varnar guiden att någon som vet vilken nyckel som användes kan matcha en stapel med den nyckeln. Med rutan markerad står det så när steget listar färre än tre eller fler än 20 nycklar, eftersom staplarna då förblir dolda. Den räknar nycklarna i steget och kan inte säga vem av dem som kan göra förfrågningar.

### `/dashboard/costs/quota-share/plans` — Konfiguration av leverantörsplan

- `ProviderPlanConfigClient.tsx`: rullgardinsmeny för att välja en leverantör, se löst plan (auto från katalog eller manuell åsidosättning) och redigera dimensioner.
- Ändringar skriv till `PUT /api/quota/plans/[connectionId]`.
- Borttagning återgår till katalog eller tom plan.

---

## Självbetjäningskvot API (opt-in)

`GET /api/v1/me/quota/{provider}` (serveras även på `/v1/me/quota/{provider}`) låter en API nyckelinnehavare läsa, med sin egen nyckel, hur mycket av ett delat abonnemang som är deras och vad som blockerar dem. Rutten är ett tunt skal över `src/server/selfService/quotaHandler.ts`; vyn är byggd av `src/lib/quota/selfView.ts` och dess svarskontrakt är `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Aktivering och autentisering

- Funktionsflagga `QUOTA_SELF_PANEL`, standard `false`. Medan den är avstängd får en begäran som når rutten 404. Med `REQUIRE_API_KEY=true` vägrar klientens API policy en saknad eller ogiltig nyckel med 401 innan rutten körs, oavsett flagga. En begäran utan nyckel men en inloggad instrumentpanelsession passerar den policyn och får ruttens eget svar. Flaggan löser sig som alla andra flaggor (dashboard eller REST åsidosättande, sedan miljövariabeln med samma namn); se [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Varje pools visningsnamn och varje schemas etikett returneras till poolens nyckelinnehavare precis som administratören skrev dem. Innan du slår på flaggan, kontrollera att de är lämpliga att läsas av dessa nyckelhållare.
- Nyckeln läses endast från rubriker: `Authorization: Bearer <key>` eller `x-api-key: <key>`. När båda skickas används den första som validerar. En nyckel i frågesträngen eller en cookie ignoreras. Serverns miljönyckel nekas (401).
- Nyckeln behöver `self:usage` scope (403 utan det).
- Leverantörssegmentet trimmas, görs med små bokstäver och kontrolleras mot `^[a-z0-9][a-z0-9._-]{0,63}$` (400 annars), löses sedan genom leverantörsregistret, så ett alias som `cc` läser `claude` poolerna. `claude` och `anthropic` läser samma pooler.

### Vad varje synlighet visar

| Synlighet  | Kräver                                                                                  | Fält                                                                                                                                                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egen andel | `self:usage`                                                                            | `pools[]` (ref, namn, leverantör, policy, vikt, tak), `dimensions[].yourShare`, `accounts[]` med `yourShare` (på ett `percent` fönster utan `attributed` och `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                  |
| Kontonivå  | `self:usage` + `self:account-quota`, och leverantören i nyckelns `sharedQuotaProviders` | lägger till `dimensions[].total`, `accounts[].dimensions[].account` och `accounts[].modelWindows`, `attributed` och `external` på `yourShare` i ett `percent` -fönster och `members` på en pool med medlemsanvändning på (se [Medlemsanvändning](#member-usage) ) |

- `sharedQuotaProviders` är en inställning per nyckel (`PUT /api/keys/[id]/self-service`): `null`, standardinställningen, betyder varje leverantör som nyckeln når; `[]` betyder ingen. Varje pools `accountVisible` säger vilken synlighet som gällde för den.
- Kontofält och modellfönster visas endast för konton vars anslutning nyckeln kan använda. När nyckeln har en lista över tillåtna anslutningar, behåller ett konto utanför den sin `Account N` post utan `account` eller `modelWindows`. En tom lista betyder ingen begränsning, som för `/v1/me/status`. Poolsumman (`dimensions[].total`) beror inte på den listan.
- Två figurer som visas med enbart `self:usage` kommer från andra nycklars användning. En schemabudgets `exhausted` återspeglar förbrukningen av varje nyckel under det schemat. I en pool vars vikter alla är noll, är nyckelns `weight` `100 / number of members`. Båda är vad verkställighet gäller för nyckeln.
- En pool identifieras endast av `ref`, ett ogenomskinligt värde bundet till den anropande nyckeln. Dess visningsnamn (`name`) ingår som administratören skrev det. En `ref` härleds från nyckeln och poolen med serverns API-nyckelhemlighet (`API_KEY_SECRET`). Klienter får inte bestå det: det ändras om den hemligheten roteras.
- Konton listas som `Account 1`, `Account 2`, … i poolordning. Inget pool-id, anslutnings-id, konto-e-post eller kontonamn returneras, och svaret går igenom kontraktsschemat, vilket släpper alla fält utanför det.
- Räknebara enheter (`requests`, `tokens`, `usd`) rapporteras som poolhinken som kvotporten upprätthåller: `limit` = plan limit × konton i poolen, `fairShare` = vikt / 100 × `limit` (lika uppdelning när varje vikt är 0), `consumed` = = nyckelns egen zq räkneverk `remaining` `fairShare` − `consumed` golvad vid 0.
- `blocks.schedules` listar nyckelns schemafönster (`open`/`closed`, `blackout` eller `outside-window`, `retryAfterSeconds`, reservgolv och om fönstrets budget är förbrukad); `blocks.modelCaps` listar sina timtak per modell med förbrukning.
- En nyckel utanför varje pool hos leverantören får 200 med `pools: []`; `availableModels` ( `qtSd/` id:n som nyckeln ser i `/v1/models`), `expiresAt` och `apiBaseUrl` är fortfarande ifyllda.
- `apiBaseUrl` är `OMNIROUTE_PUBLIC_API_BASE_URL`, sedan `OMNIROUTE_PUBLIC_BASE_URL`, annars `null`. Det är aldrig begärans eget ursprung.

### `status` och `reason`

| `status`      | Menande                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | En aktuell läsning.                                                                                                                                                                                                                                                                                                                                             |
| `stale`       | En cachad kontoläsning markerad som inaktuell, eller en vars återställningstid har passerat sedan den lästes. Siffror behålls. Ett modellfönster vars återställningstid har passerat markerar hela `modelWindows` gruppen `stale`. För nyckelns egen del av ett `percent` fönster: boken lästes utan att ett konto lästes i portens cache för att bekräfta det. |
| `unavailable` | Ingen läsning; talen är `null`, aldrig `0`. `reason` säger varför.                                                                                                                                                                                                                                                                                              |

| `reason`                          | När                                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kvotbutiken kunde inte läsas, eller så kan den inte läsa tillskrivningsböcker.                                                                    |
| `percent_attribution_unavailable` | Nyckelns egen andel av ett `percent` -fönster: ingen tillskrivningsbok finns ännu för det kontot och fönstret, eller så visar boken inte nyckeln. |
| `percent_window_ended`            | Nyckelns egen andel av ett `percent` fönster: boken tillhör ett planfönster som har avslutats.                                                    |
| `account_not_used_by_key`         | Nyckelns egen andel av ett `percent` fönster: kontots anslutning är utanför nyckelns tillåtna anslutningar. Dess bok läses inte.                  |
| `window_not_reported`             | Providergränscachen har ingen läsning för det planfönstret.                                                                                       |
| `connection_lookup_failed`        | Kontots anslutning kunde inte läsas.                                                                                                              |
| `not_supported`                   | OmniRoute kan inte läsa användningsgränser för kontots leverantör.                                                                                |
| `fetch_failed`                    | Ingen cachad läsning var användbar och uppdateringen av leverantörsgränser misslyckades.                                                          |
| `not_available`                   | Avläsningen har inga användningsfönster, eller så har kontot ingen läsning alls.                                                                  |

När kvotlagringen inte kan läsas är de butiksbaserade fälten för `blocks` (en schemabudgets `exhausted`, en modellcaps `consumed` och `reached`) också `null`.

### Lånsamtycke

`PATCH /api/v1/me/quota/{provider}` registrerar den anropande nyckelns eget samtycke för en pool. Den använder flaggan, rubrikerna och leverantörsreglerna för `GET`. `self:usage` omfånget tillåter denna skrivning, även om dess namn läses som skrivskyddat.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` är `ref` som `GET` returnerar för den poolen.
- `lendingPercent` är ett heltal från 0 till 100. Ett värde på 0 rensar samtycket och dess deadline. En kropp med `lendingPercent` 0 accepteras i båda lägena.
- `lendingUntil` är valfritt: epok millisekunder, eller `null` för ingen deadline. Det måste vara i framtiden och som mest 8640000000000000. Ett värde under 100000000000 läses som sekunder och vägras.
- Alla andra fält avvisas. En kropp längre än 4096 byte nekas. Avläsningen stannar vid den storleken, så en längre kropp hålls aldrig hel.

Kontrollerna körs i ordningen enligt denna tabell. Varje avslag använder standardfeltexten med ett fast meddelande. Ett avslag från en av dessa kontroller skriver ingenting.

| Status | Meddelande                                                                                         | När                                                              |
| ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | `QUOTA_SELF_PANEL` -flaggan är avstängd.                         |
| 401    | `Valid API key required`                                                                           | Nyckeln saknas eller är ogiltig, eller är serverns miljönyckel.  |
| 403    | `API key lacks the self:usage scope`                                                               | Nyckeln saknar `self:usage`.                                     |
| 400    | `Invalid provider`                                                                                 | Leverantörssegmentet är ogiltigt.                                |
| 429    | `Too many lending changes. Retry later.`                                                           | Nyckeln passerade sin gräns. Svaret bär `Retry-After`.           |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Brödtexten är inte JSON, är för lång eller matchar inte schemat. |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Tidsfristen är sekunder.                                         |
| 400    | `lendingUntil must be in the future`                                                               | Deadline är vid eller före ansökningstiden.                      |
| 404    | `Pool not found`                                                                                   | `ref` namnger ingen pool av denna nyckel för denna leverantör.   |
| 403    | `Lending is not enabled for this pool`                                                             | Poolen är i `saturation` läge och `lendingPercent` är över 0.    |
| 500    | `Failed to build quota view`                                                                       | Något annat misslyckande. Dess orsak loggas på servern.          |

Gränsen är 20 förfrågningar per 60 sekunder för varje nyckel. Varje begäran som klarar leverantörskontrollen räknas, även en som avslås senare eller en som inte ändrar något. Den har en egen räknare, förutom nyckelns gräns för begäran.

En begäran som ändrar det lagrade samtycket skriver en `quota.pool.lending.updated` -revisionspost. Den namnger nyckeln med gamla och nya värden. Samma organ skickade två gånger skriver en gång och revisioner en gång. Svaret är 200 med den fullständiga `GET` -vyn, byggd efter skrivningen.

`GET` -vyn rapporterar utlåning enligt följande:

- Varje pool har `borrowMode` (`saturation` eller `consent`), och nyckelns egna `lendingPercent` och `lendingUntil`.
- `lendingActive` är `true` endast i en `consent` pool, med en procentandel över 0 och en deadline som inte nås.
- I en `consent` pool bär varje räknebar `dimensions[].yourShare` `borrowAvailable`. Det är vad nyckeln kan använda över sin andel nu, utlånad av de andra nycklarna.
- `borrowAvailable` använder portens formel. Den läser varannan nyckel, även när nyckeln är under sin del. För en `hard` nyckel som är en extra läsning per annan nyckel och räknebar dimension, parallellt.
- `borrowAvailable` är `null` för en `soft` eller `burst` nyckel och `null` när en läsning misslyckas.
- `borrowAvailable` är en siffra för alla andra nycklar tillsammans. I en pool med två nycklar är det den andra nyckelns egen figur.
- `borrowAvailable` har inte rapporterats för `percent` windows eller i `accounts[]` ännu.
- I en `saturation` pool rapporterar vyn det lagrade samtycket med `lendingActive: false` och ingen `borrowAvailable`.

### Fel

Varje svar på denna väg, framgång eller misstag, bär `Cache-Control: no-store`. En vägran som sker innan rutten körs bär den inte, till exempel klientens API policys 401 eller IP filtrets 403. Fel på rutten använder standardfeltexten med ett fast meddelande: 400 (ogiltig leverantör), 401 (saknad eller ogiltig nyckel), 403 (saknar `self:usage`(5f ), 40 av (`Failed to build quota view`)e). 500:n täcker alla fel när förfrågan når rutten, inklusive själva nyckelsökningen; dess orsak loggas på servern och returneras aldrig. Felen i `PATCH` listas i [Lånesamtycke](#lending-consent).

### Begränsningar

- `remaining` är den del av nyckelns beskärda andel som den inte har använt. Det är ingen garanti. En nyckel kan fortfarande serveras bortom den medan poolen har plats. När poolens totalsumma når `limit`, vägras varje nyckel i poolen, oavsett dess egen `remaining`, och en nyckel utan `self:account-quota` kan inte se den summan.
- `remaining` tar inte hänsyn till allokeringens absoluta `cap`. Tillsynen vägrar nyckeln när dess egen konsumtion i ett fönster av lockets enhet når lockets värde.
- Kontonivåfältet kommer från provider-limits-cachen och kan fördröja verkställighetsbeslutet med några minuter. En avläsning vars återställningstid har passerat rapporteras som `stale`.
- Fönster per modell (`modelWindows`) rapporteras endast för leverantörer som har en planfönstermappning: Claude och Codex idag. För andra leverantörer är `modelWindows` fortfarande närvarande när kontodata visas, med en tom `windows` lista.
- Nyckelns egen andel av ett `percent` fönster är en uppskattning. Den kommer från tillskrivningsboken och har alla begränsningar som anges under "Procentdimensioner: tillskrivning per nyckel" ovan.
- `consumed` är antalet verkställighet jämförs med den rättvisa andelen. Det är `attributed` plus `external`, exakt. `attributed` är den del som boken ger nyckeln till de tokens som den dirigerat. `external` är nyckelns del av kontots användning som poolens nycklar inte står för.
- Båda delarna skickas endast när poolens `accountVisible` är sann: nyckeln har `self:account-quota` och leverantören är i sin `sharedQuotaProviders`. En nyckel utan den får enbart `consumed`, med samma `status` och `reason`.
- Med både delar och egen vikt kan en hållare räkna ut användningen som görs utanför poolen som laddas till poolens nycklar. En innehavare med kontoomfattningen ser redan kontosumman.
- En nyckel som inte skickade något i fönstret kan fortfarande läsa sin externa laddning från `consumed`, eftersom dess tillskrivna del då är 0.
- Till exempel öppnar en bok vid 0, med tangenterna A och B på vikten 50 vardera. Nyckel A leder 900 000 tokens och nyckel B 100 000. Kontot når då 60 % av en gräns på 100. Då är `attributed` 54 för nyckel A och 6 för nyckel B, och `external` är 0 för båda.
- Utsikten läser boken och skriver aldrig dess tillstånd. Den öppnar inte en bok, och den ber aldrig leverantören om en läsning. Med Redis arkivet tar en läsning bort ersatta revisionsfält i bakgrunden, som portens läsningar gör.
- Andelen är endast `ok` medan portens cache innehåller en avläsning av kontot. Utan en är den `stale`, så i en pool utan någon ny begäran visas den som möjligen inaktuell.
- Tills en förfrågan går genom poolen är andelen inte tillgänglig. Den begäran öppnar boken, och kontots siffra i det ögonblicket räknas som användning utanför poolen.
- I en pool med flera konton använder varje kontopost kontots egen bok och gränsen för ett konto. Verkställighet skalar båda sidor med antalet konton, så andelen är densamma.
- Fönster per modell har ingen del för nyckeln. Boken innehåller inga data per modell.
- Reservgolv i ett schema utvärderas inte av vyn: ett schema kan visas som `open` medan en begäran avvisas med anledning `schedule-reserve`.
- När två pooler med samma nyckel delar en anslutning tillämpas en av dem, och vyn listar båda.
- Det finns ingen gräns per adress för misslyckade nyckelförsök: bakom en omvänd proxy kan uppringare dela en adress (det beror på om vidarebefordrade klientadresser är betrodda), så en lockout kan neka vägen till varje nyckelinnehavare. Med `REQUIRE_API_KEY=true` vägras en ogiltig nyckel av klientens API -policy innan rutten körs, med den policyns 401-kropp istället för den här ruttens.

### Medlemsanvändning

En administratör kan låta nyckelinnehavare se hur ett fönsters användning fördelar sig mellan poolens medlemmar. Alternativet är poolens `memberBreakdown`, av som standard. Det ställs in i poolguiden eller med `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` och `GET /api/quota/pools/{id}` rapporterar det.

En dimension av vyn bär endast `members` när alla dessa håller:

- poolens alternativ är på
- poolen har högst 20 tilldelade nycklar, och minst tre av dem kan göra förfrågningar: aktiva, inte återkallade, inte förbjudna och har inte gått ut
- poolens `accountVisible` är sant: nyckeln har `self:account-quota` och leverantören är i sin `sharedQuotaProviders`
- i ett `percent` fönster är kontots anslutning en som nyckeln kan använda
- nyckelns egen andel av det fönstret lästes: dess `status` är inte `unavailable`

Annars är `members` frånvarande. Det är aldrig en tom lista.

- Varje skiva är `{ slot, consumed, isYou }`. Svarsschemat avvisar alla andra egenskaper på ett segment och en lista med fler än 20 segment. Skivorna listas i platsordning.
- Det finns en skiva per tilldelad nyckel, inklusive en nyckel som inte längre kan göra förfrågningar. En medlem utan användning visar en riktig nolla.
- Slot 1 är alltid den frågande nyckeln, med `isYou` sant. De andra slotnumren är rangen av en nyckelad hash. Den är nyckelad med `API_KEY_SECRET` och täcker poolen, frågenyckeln och medlemmen.
- Så siffrorna står inte i linje mellan innehavarna. För en innehavare förblir de desamma mellan besöken. De kan ändras när en nyckel går med i eller lämnar poolen, eller när den hemligheten roteras.
- På ett räknebart fönster är en skiva medlemmens räknare i kvotbutiken, samma räknare som sin egen `consumed`.
- På ett `percent` fönster är en skiva medlemmens `attributed` del, från samma bok läst som nyckelns egen del. Användning utanför poolen delas aldrig upp i skivor. Den laddningen delas efter vikt, så skivor som bar den skulle visa vikterna.
- Varje vy läser ett värde per annan medlem och räknarbart fönster, parallellt. På ett `percent` fönster kostar skivorna ingen läsning utöver aktiens egen bok. När ett värde inte kan läsas har det fönstret ingen `members` och nyckelns egen del kvarstår.
- Alternativet och antalet användbara nycklar läses en gång per pool, och endast för en nyckel som kan se kontodata. En felaktig läsning av alternativet eller antalet användbara nycklar stänger av staplarna för den poolen. Servern loggar en varning och resten av vyn byggs.

Barerna bär inga namn eller ID. De berättar fortfarande saker för en nyckelinnehavare om de andra medlemmarna:

- Innehavare kan fortfarande matcha skivor med sina värden.
- En stabil numrering låter en innehavare följa en medlem över tiden.
- Antalet skivor visar hur många nycklar som är tilldelade i poolen.
- I en pool med tre nycklar kan någon som vet vad en nyckel använde berätta vad den senaste nyckeln använde.
- När en pool faller under tre användbara nycklar försvinner staplarna. Visningar som tagits tidigare visar fortfarande vad varje medlem använde.
- I ett räknebart fönster kan poolsumman minus skivorna visa användningen av nycklar som inte längre är tilldelade.
- En medlem som visar noll på ett konto och använder på ett annat kan visa vilken medlem som använder vilket konto.
- I en räknebar pool med `hard` policyn, antyder en skiva som slutar växa vid en medlems beskärda andel på den medlemmens vikt.

### Användningsserie (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (serveras även på `/v1/me/usage`) returnerar användningen och kostnaden för den anropande nyckelns egna förfrågningar: totalsummor, en post per UTC dag, per dag och modell, per modell och per leverantör. Den delar flaggan, autentiseringsreglerna, `self:usage` omfattningen, `Cache-Control: no-store` och felbeteendet för kvotvägen ovan. Nyckeln kontrolleras före `range`. Felen är 400 (`Invalid range`), 401, 403, 404 och 500 (`Failed to build usage`).

- `range` är en av `1d`, `7d`, `30d` (standard) eller `90d`. Alla andra värden, ett tomt värde eller en upprepad parameter är 400. Uppsättningen stannar vid `90d` för att begränsa kostnaden för ett samtal. Vyn läser endast rå användningshistorik, aldrig de dagliga sammanfattningarna, som inte har någon nyckel.
- Rader väljs av den anropande nyckelns id. Kolumnen för nyckelnamn matchas aldrig, och rader som registreras utan nyckel-id räknas aldrig.
- Att bygga en serie kör fem grupperade frågor över nyckelns rader i fönstret. Den byggda serien återanvänds i 60 sekunder per tangent och intervall, och ett återanvänt samtal kör inget. Dess `generatedAt` ger dess ålder.
- Fönstret slutar när serien är byggd. En rad stämplad senare, till exempel av klockskevning, räknas inte.
- `coverage.retentionDays` är operatörens lagringsinställning för rå användningshistorik (`retention.usageHistory` i databasinställningarna). `coverage.truncatedByRetention` är sant när det begärda intervallet är längre än den inställningen. Den jämför de två siffrorna och kontrollerar inte om rader faktiskt saknas.
- Leverantören returneras som registrerat för nyckelns egna förfrågningar. Modell är det registrerade namnet efter dess sista `/` och rader grupperas efter det. En kombinationsbegäran vars varje mål avvisades registreras med routingetiketten som leverantör (kombonamnet, `auto` eller `combo`) och modellsträngen som klienten skickade. Andra avvisade förfrågningar, till exempel av en öppen strömbrytare, en modellnedkylning eller ett kvotparkerat skip, behåller målleverantören och modellen.
- Förutom räkningar och kostnader, har svaret genomsnittlig latens, framgångsfrekvens och tidpunkterna för den första och sista begäran.
- `byModel` listar de 50 leverantörs- och modellparen med flest förfrågningar. Med fler par blir dess poster inte upp till `summary`, och `summary.uniqueModels` räknar varje registrerad modellstavning. `byModelTruncated` är då sant, och en modell vars par faller på båda sidor av snittet visar delsummor.
- Två kostnader redovisas. `costUsd` är den fakturerade kostnaden, som användningsanalysen visar det. Prenumerationsleverantörer med schablonbelopp, såsom Claude Code-planen, räknar $0 där. `listPriceUsd` är samma användning prissatt till listpris, abonnemang ingår. En förfrågan vars modell inte har någon prisrad räknar dess lagrade kostnad: en kostnad som leverantören rapporterade, eller en som beräknades när förfrågan registrerades. Endast en förfrågan med ingendera räknas 0, utan markör, så en summa kan vara partiell.
- Svarskontraktet är `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Självbetjäningssida

Med `QUOTA_SELF_PANEL` på är `/quota/{provider}` en offentlig sida. En nyckelinnehavare skriver en API nyckel där och ser nyckelns pooler för leverantören. Varje pool visar ett kort per poolfönster, med poolens användning för alla och nyckelns egen andel. Varje konto i poolen har sina egna kort, med kontots användning och nyckelns andel. Kontots användning visas endast när nyckeln kan se kontodata. Sidan listar också gränserna per modell för varje konto och nyckelns egen användning. Ett meddelande visas när ett schema blockerar nyckeln just nu. Ett kort listar varje nyckellock per modell med dess användning och markerar de som nåtts. `{provider}` är ett leverantörs-id eller dess alias (`/quota/claude`, `/quota/cc`). En okänd leverantör, och varje `/quota/*` sökväg medan flaggan är avstängd, svarar 404. Pooler på en anpassad OpenAI- eller Anthropic-kompatibel nod har ingen sida. API svarar fortfarande för dem.

Sidan har ingen session. Nyckeln skickas endast i `Authorization` huvudet för `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` och `GET /api/v1/me/usage`, aldrig i en URL. En nyckel som servern accepterar sparas i flikens `sessionStorage`. Med "Kom ihåg på den här enheten" hålls den i `localStorage` istället, och "Glöm nyckel" tar bort den från båda. En nyckel som servern avvisar tas bort från lagringen.

En pool i `consent` läge visar ett utlåningskort. Där sätter nyckelinnehavaren en hel procentandel från 0 till 100 av nyckelns lediga andel att låna ut. Innehavaren väljer också hur länge samtycket gäller: tills det stängs av, 1 timme, 8 timmar, 24 timmar, 7 dagar eller 30 dagar. En varaktighet räknas från tidpunkten för sparandet. Medan en tidsfrist är i kraft kan innehavaren hålla den istället. Om den deadline passerar innan Spara, skickar kortet ingenting och ber om ett annat val. Med 0% skickas ingen deadline. Kortet visar den lagrade deadline med dess tidszon namngiven. Ett samtycke vars tidsfrist har passerat visas som avslutat.

För en `hard` nyckel listar kortet också, per poolfönster, vilka andra nycklar som lånar ut till nyckeln just nu. Varje rad är en siffra för alla andra nycklar tillsammans. I en pool med två nycklar är det den andra nyckelns egen figur. En siffra som vyn inte rapporterar läses som inte tillgänglig, inte som noll. För en `soft` eller `burst` nyckel säger kortet att ingen siffra gäller.

En pool i `saturation` läge vars nyckel lagrar en procentandel över 0 visar endast ett uttag. Det står att den lagrade procenten inte har någon effekt där. Dess uttag-knapp skickar 0 utan deadline. En pool i `saturation` läge med en lagrad 0 visar inget utlåningskort. Efter en lagring stannar ett kort som den returnerade vyn inte längre behöver med sitt meddelande tills sidans vy ändras igen.

Inget sparas förrän innehavaren trycker på Spara eller Dra ut. Varje tryck skickar en `PATCH /api/v1/me/quota/{provider}` -begäran, och ett andra tryck skickar ingenting medan den första väntar. Kroppen bär poolens ogenomskinliga `ref` från utsikten, procenten och deadline. Svaret är den ombyggda kvotvyn, och sidan visar den utan andra läsning. När två sparade överlappar varandra läser sidan kvoten en gång efter det sista svaret. Sidan behåller inte samtycket i webbläsarens lagring.

En vägrad ändring förklaras på kortet med en text vald från HTTP statusen. Feltexten läses inte. En 401 säger att nyckeln inte accepterades och laddar om kvoten. En 403 säger att poolen inte tar emot utlåningsändringar och en 404 säger att poolen är borta. Båda erbjuder en knapp som laddar om kvoten. Ett 400 eller annat 4xx-svar ber innehavaren att kontrollera procentsatsen och deadline. En 429 ber innehavaren att vänta, med sekunderna av `Retry-After` när svaret ger dem. Ett 5xx-svar, ett 408 eller ett nätverksfel säger att ändringen kanske inte har sparats och behåller de inskrivna värdena. Ett svar utanför kontraktet laddar om kvoten. En misslyckad lagring tar inte bort nyckeln av sig själv. När omladdningen efter att den vägrats, tar sidan bort nyckeln som på alla nekade läsningar.

När en nyckel har accepterats visar sidan också ett "Ställ in dina verktyg"-kort med tre flikar. "Claude Code" ger `env` blocket för `~/.claude/settings.json`. "Shell" ger samma variabler som `export` linjer. "Claude Desktop" ger värdena för dess tredje parts slutledningsfönster. Modellerna är de kvotandelsmodeller som nyckeln kan kalla för den leverantören. När ingen sådan lista följer med nyckeln, aktiverar blocket gatewaymodellupptäckt istället. Gatewayadressen är det offentliga API ursprunget som servern rapporterar (`OMNIROUTE_PUBLIC_API_BASE_URL`, sedan `OMNIROUTE_PUBLIC_BASE_URL`). När ingetdera är inställt visar kortet en platshållare och ber innehavaren att fråga administratören. Nyckeln visas som en platshållare. "Inkludera min nyckel" lägger hela nyckeln i texten på skärmen och i vad en kopieringsknapp kopierar. Det varar tills lådan är tömd, nyckeln glöms eller byts ut eller sidan lämnas. Kortet skickar ingen förfrågan och erbjuder ingen filnedladdning.

En läsning av API markerar `stale` visas som möjligen inaktuell. En avläsning som markerar `unavailable` visas med dess orsak, aldrig som noll.

På procentplaner drar sidan nyckelns egen andel när API rapporterar det. Det står att antalet är en uppskattning och namnger dess två delar. Gränserna per modell visar endast kontot.

När ett fönster har `members` visar dess kort också en stapel med ett segment per medlem, i kortplatsordning. Den frågande nyckelns segment använder accentfärgen. De andra segmenten går igenom temats diagramfärger. En textförklaring listar varje segment med dess värde, så ingenting beror på färg. Segmenten är märkta `You` eller `Member N`, där N är luckan.

### Dedikerad port för sidan

`QUOTA_PANEL_PORT` öppnar en andra lyssnare som endast betjänar självbetjäningssidan. Den är avstängd om inte variabeln är inställd. `QUOTA_PANEL_HOST` är bindningsadressen och är standard till `127.0.0.1`.

Lyssnaren vidarebefordrar dessa vägar till huvudporten och svarar 404 för varannan väg:

| Väg                                                                      | Serverar                                |
| ------------------------------------------------------------------------ | --------------------------------------- |
| `/quota/{provider}`                                                      | Sidan                                   |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Kvotvyn som sidan läser                 |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Användningsserien sidan läser           |
| `/_next/static/`                                                         | Skript, stilar och typsnitt i byggnaden |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikoner                                  |

`GET` och `HEAD` förmedlas utan kropp. En begäran med en kropp vidarebefordras också: en `PATCH` av kvotvisningsvägen, som sidan skickar för att spara ett utlåningsval. Vilken annan metod som helst svarar 404, förutom en CONNECT förfrågan, vars anslutning stängs utan svar. Varje annan begäran som förklarar ett organ svarar 404 och dess anslutning stängs. Uppgraderingsbegäranden avvisas och deras anslutning stängs. En väg med ett punktsegment eller en fragmentmarkör nekas, som på API porten. Så är ett begäranmål med ett tecken utanför utskrivbar ASCII. Ett råkontrolltecken i målet besvaras 400 av HTTP parsern, före denna ports egen kontroll. Begärrubriker som ramverket reserverar för eget bruk inte vidarebefordras: namn som börjar med `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` eller `x-next-`, och namnen `x-matched-path` och `next-resume`. Begäran vidarebefordras utan dem. Instrumentpanelen, inloggningssidan, management API och slutledningsvägarna kan inte nås via denna port.

`PATCH` måste ha `Content-Type: application/json`, utan parameter eller endast med `charset=utf-8`. Den måste ha en `Content-Length` från 1 till 4096, skriven som vanliga siffror, och ingen `Transfer-Encoding`. En `PATCH` som bryter mot en av dessa regler svarar 404. Vissa felaktiga längder, såsom en signerad eller en upprepad, besvaras 400 av HTTP parsern före denna ports egen kontroll. Porten läser de deklarerade byten innan den kontaktar huvudporten och väntar högst 5 sekunder på dem. En kropp som inte är komplett då svarar 404 och dess anslutning stängs. Inget når huvudporten i så fall, eller när klienten lämnar först. Porten vidarebefordrar exakt de deklarerade byten, med samma `Content-Length`. Bytes efter dem läses som nästa begäran på anslutningen. En TLS -omvänd proxy framför måste vidarebefordra `Content-Length` och får inte chunka om förfrågan. Huvudporten kontrollerar API nyckeln i `Authorization` huvudet, som för `GET`.

404-kroppen är `{"error":"not_found","message":"Not found."}`. Ett misslyckat relä svarar 502 (`api_bridge_unavailable`) eller 504 (`api_bridge_timeout`) utan `detail` fält.

Lyssnaren läser inte `QUOTA_SELF_PANEL`, och den slår inte på sidan. Medan flaggan är avstängd svarar sidan och dess API 404 på huvudporten, och lyssnaren vidarebefordrar det svaret.

Under utvecklingsservern (`next dev`) blir sidan inte interaktiv via denna port. Utvecklings-hot-reload-socket är en uppgraderingsbegäran, och porten vägrar det. Använd huvudporten medan du utvecklar.

Porten betjänar vanlig HTTP och sidan skickar API nycklar. Behåll standardbindningsadressen och sätt en omvänd proxy med TLS framför den. En annan bindningsadress än loopback loggar detta meddelande:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

En loopback-peer som inte skickar någon vidarekopplingshuvud räknas som lokal på huvudporten. Så en proxy på samma värd måste skicka `X-Forwarded-For`. En proxy på en privat adress är betrodd för den rubriken endast med `OMNIROUTE_TRUST_PROXY=private` (eller `lan`). Alla andra peer rapporteras av adressen till dess anslutning, och vidarebefordranarna som den skickade tas bort.

The listener holds at most 256 connections at a time. A client has 10 seconds to send the request headers and 30 seconds to send the whole request. An idle kept-alive connection closes after about 5 seconds. A connection with no activity for 60 seconds is closed. Dessa värden är fasta. Set connection and rate limits on the reverse proxy in front as well. A reverse proxy in front should keep its idle upstream connections for less than 5 seconds, or not reuse them. The relay to the main port uses the upstream timeouts of the API port (`API_BRIDGE_*`).

The listener also starts when `API_PORT` is not set. `QUOTA_PANEL_PORT` must be a port from 1 to 65535, written in digits only. It must differ from the dashboard port and the API port. While the live WebSocket server is on, it must also differ from `LIVE_WS_PORT` (default 20132). Any other value opens nothing and logs a warning. A warning about a refused value names the variable and does not repeat the value. A port that is already in use opens nothing and logs this warning:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

With `OMNIROUTE_BASE_PATH` set, the listener expects every path above under that prefix. Use the same `OMNIROUTE_BASE_PATH` at build time and at run time. Write it with a leading slash and no trailing slash, for example `/omniroute`. Another shape, including `/` and `/omniroute/`, leaves the port off with a warning, although the build accepts those forms. So does a base path whose first segment names an application route: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` or `connect`, in any case.

Begränsningar:

- `/quota/{provider}/` med ett snedstreck svarar 404 på denna port.
- Service Worker och webbappmanifestet visas inte på den här porten.
- En anpassad favoritikon i instrumentpanelen visas inte på den här porten.
- Ikoner visas inte när programmet körs under en bassökväg.
- Hamnen talar vanlig HTTP/1.1.
- En bindning som misslyckas görs inte om förrän processen startar om.
- Lyssnaren har ingen anslutning eller hastighetsgräns per klientadress.
- Behållarinställningar täcks inte av detta avsnitt.

---

## Miljövariabler

| Variabel                             | Standard     | Beskrivning                                                               |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`     | Drivrutin att använda: `sqlite` eller `redis`                             |
| `QUOTA_STORE_REDIS_URL`              | _(tömma)_    | Redis URL, t.ex. `redis://localhost:6379`                                 |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`        | 0..1; `>= threshold` aktiverar strikt läge                                |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`       | Tokens som förklarar högst en punkt av ett procentplansfönster            |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`        | 0..1; multiplikator för soft-policy combo-poäng                           |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`         | Dagar innan GC tar bort gamla `quota_consumption` -hinkar                 |
| `QUOTA_PANEL_PORT`                   | _(avstängd)_ | Dedikerad port för självbetjäningssidan. Avstängd betyder ingen lyssnare. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`  | Bind adress för den porten                                                |

DB inställningar (`quotaStore.*`) åsidosätter env vars.

---

## Felsökning

### Redis har konfigurerats men ansluter inte

Kontrollera att `ioredis` är installerat (`npm ls ioredis`) och att `QUOTA_STORE_REDIS_URL`
går att nå. Om anslutningen misslyckas återgår fabriken till SQLite (loggas på
nivån `warn`).

### `peek` returnerar inaktuella data/fail-open

Om `peek` utlöser ett undantag behandlar `enforceQuotaShare` resultatet som "tillåt" (fail-open).
Kontrollera `pino`-loggarna efter poster för `quota:enforce` och `quota:factory` för att identifiera
grundorsaken.

### Avvikelse i förbrukningsräknaren

Om den faktiska leverantörsanvändningen skiljer sig från räknarna är det förväntat — det
glidande fönstret med två segment har ett fel på ~1 % vid fönstergränserna och `consume`
körs enligt fire-and-forget-principen efter svaret. Mättnadssignalen (`saturationSignals.ts`)
läser leverantörens faktiska nyttjandegrad med en TTL på 30 sekunder och justerar `globalUsedPercent`
i enlighet med detta.

### Poolen visar "inga data" för förbrukningstakt

`computeBurnRate` kräver minst två historiska mätvärden. Nya pooler utan tidigare
anrop till `consume` visar `tokensPerSecond: 0` och `timeToExhaustionMs: null`.

---

## Migrering från localStorage

När `/dashboard/costs/quota-share` laddas för första gången kontrollerar hooken `useLocalStoragePoolMigration` följande:

1. `localStorage.getItem("omniroute:quota-share:pools")` är inte tom.
2. `GET /api/quota/pools` returnerar `[]` (databasen är tom).

Om båda villkoren är uppfyllda skickas varje äldre pool satsvis till `POST /api/quota/pools`, varefter localStorage-nyckeln tas bort. Migreringen är idempotent: villkor 2 förhindrar att migreringen körs igen.

---

## Intern strategiklassificering

`quota-share` är en **endast intern** routningsstrategi (`INTERNAL_ROUTING_STRATEGY_VALUES` i
`src/shared/constants/routingStrategies.ts`). Den används uteslutande av systemgenererade
`qtSd/`-poolkombinationer och har avsiktligt uteslutits från `ROUTING_STRATEGY_VALUES`, så att den aldrig
visas som ett användarvalbart alternativ i användargränssnittet eller API:et.

---

## Testtäckning

Två lager av automatiserad täckning skickas med kvotdelningsmotorn:

| Svit               | Kommando                                                               | Vad det täcker                                                                                                                                                                                         |
| :----------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enhet (29 tester)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR schemaläggare, saturation gating, concurrency caps, fairShare math, backlog queuing                                                                                                                |
| Integrationsmatris | `npm run test:combo:matrix`                                            | End-to-end routingbeslut genom den verkliga kombinationspipelinen; DRR fairness + mättnadsnedprioritering via livesömmar (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrationsmatrisen körs i CI tillsammans med alla 22 offentliga strategier. Enhetssviten kan köras fristående.

---

## DB Schema Sammanfattning

Tre tabeller tillagda av migreringarna `078`, `079` och `085`:

- `quota_pools` + `quota_allocations` — pooldefinitioner och tilldelningar per nyckel.
- `quota_consumption` — rullande 2-skopsräknare per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuell leverantörsplan åsidosätter (dimensioner JSON per connectionId).

Alla tabeller har lagts till via idempotenta `CREATE TABLE IF NOT EXISTS` migreringar.

Samtyckt utlåning lägger till tre kolumner: `quota_allocations.lending_percent` (heltal, standard 0), `quota_allocations.lending_until` (epok millisekunder eller `NULL` för ingen deadline) och `quota_pools.borrow_mode` (standard `saturation`). Dess migrering lägger bara till dessa kolumner och skriver ingen befintlig rad.

Procenttillskrivningsboken lägger till `quota_percent_ledger` (en rad per pool, konto och planfönster) och `quota_percent_ledger_tokens` (en tokenräknare per pool, konto och API nyckel). `src/lib/db/quotaPercentLedger.ts` läser och skriver dem.
