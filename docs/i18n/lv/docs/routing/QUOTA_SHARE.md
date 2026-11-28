# Quota Sharing Engine (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumenta atsauce**: `docs/routing/QUOTA_SHARE.md`
> Daļa no B grupas (plāni 16 + 22).

---

## Pārskats

Kvotu koplietošanas dzinis taisnīgi sadala pakalpojumu sniedzēja laika kvotu (piemēram, Codex
5 stundu logu, Kimi 1500 pieprasījumu stundā) starp vairākām API atslēgām, kurām ir viens un tas
pats savienojums.

**Atrisinātā problēma:** OmniRoute novirza daudzu API atslēgu pieprasījumus uz vienu un to pašu augšupstraumes
pakalpojumu sniedzēja kontu. Bez koplietošanas loģikas A atslēgas pieprasījumu uzplūds var izsmelt
pakalpojumu sniedzēja stundas kvotu, atstājot B un C atslēgas bloķētas līdz loga atiestatīšanai.
Dzinis to novērš šādi:

1. Izseko katras atslēgas slīdošo patēriņu katrā dimensijā (%, pieprasījumi, marķieri, $).
2. Lieto darbu saglabājošu taisnīgas daļas algoritmu: atslēga var aizņemties no neizmantotajām
   daļām, kamēr globālais kopums nav piesātināts.
3. Piemēro rezultātu kritiskajā izpildes ceļā (`chatCore.ts`), pirms pieprasījums
   sasniedz augšupstraumes izpildītāju.

---

## Algoritms: godīga darba sadale un saglabāšana

Ieviests `src/lib/quota/fairShare.ts`.

### Režīmi

| Stāvoklis                                  | Režīms      | Uzvedība                                                                  |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Dāsns**   | Atslēga var aizņemties līdz globālajam ierobežojumam mīnus patērētā summa |
| `globalUsedPercent >= saturationThreshold` | **Stingri** | Stingri ievērojiet individuālu taisnīgu daļu                              |

Noklusējuma `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Šie divi režīmi apraksta kopu noklusējuma aizņemšanās režīmā `saturation`. Uz baseinu `consent` režīmā vienmēr tiek piemēroti stingri noteikumi neatkarīgi no piesātinājuma. Skatiet [sadaļu Piekrišana aizdevumiem (izvēlēšanās katram kopfondam)](#consented-lending-per-pool-opt-in).

### Lēmums par dimensiju

Katrai aktīvajai dimensijai baseinā dzinējs aprēķina:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Attiecībā uz `percent` dimensijām `consumed` ir iegūts no attiecinājuma grāmatas (skatiet [sadaļu Procentuālie izmēri: attiecinājums pa atslēgu](#percent-dimensions-per-key-attribution) ).

Pēc tam:

- **`policy = hard`** : ja `consumed > fairShareAllowed` un režīms ir stingri →** bloks** .
- **`policy = soft`** : ja `consumed > fairShareAllowed` un režīms ir stingri →** sodīt** (kombinācijā noteikt prioritātes; nekad nebloķēt).
- **`policy = burst`** : atļaut, kamēr pastāv globālā brīvā telpa neatkarīgi no taisnīgas daļas.

### Absoluto vāciņš

`capValue` + `capUnit` piešķīrumā ir stingri griesti neatkarīgi no režīma vai politikas. Jebkura dimensija, kur `consumed >= capValue` vienmēr** bloki** pieprasījumu. `percent` vāciņam `consumed` ir tikai atslēgai piešķirtā daļa.

### Vairāku dimensiju pārbaude

Pieprasījums tiek bloķēts, ja** jebkura** izmērs baseinā to bloķētu. Izmēri ir neatkarīgi — a 5h% izsmelšana neietekmē nedēļas% izmēru.

### Aizņemšanās

Dāsnajā režīmā atslēga, kuras piešķiršana ir nepietiekami patērēta, var izmantot pārpalikumu no citu atslēgu nepiešķirto daļu. Formula ir:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kur `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` šai dimensijai) vienmēr ir cietie griesti.

### Piekrišanas aizdevumi (izvēlēšanās katram baseinam)

Katram baseinam ir aizņemšanās režīms. `saturation` ir noklusējuma iestatījums, un tajā tiek ievēroti iepriekš minētie noteikumi. `consent` režīmā `hard` atslēga nodod savu daļu tikai tādā ietilpībā, kādu citas atslēgas piekrita aizdot. Administrators iestata katra pūla režīmu. Katrs atslēgas turētājs nosaka savu piekrišanu, izmantojot [aizdevuma piekrišanu](#lending-consent).

Piekrišana ir procentuālā daļa no 0 līdz 100 un izvēles termiņš laikmeta milisekundēs. Atslēga aizdod šo procentuālo daļu no tās dīkstāves daļas, kamēr termiņš ir nākotnē.

Vienai dimensijai `L` ir efektīvais ierobežojums: plāna ierobežojums reizināts ar pūla kontiem. Pieprasītajai atslēgai vārti aprēķina:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` ir atslēgas svars vai `100 / n` katrai atslēgai, ja neviens svars nepārsniedz 0. `lend_k` ir atslēgas aktīvā procentuālā vērtība un 0, kad ir pagājis tās termiņš. Pieprasītājas atslēgas piekrišana nekad netiek ņemta vērā. `hard` atslēga tiek atteikta, tiklīdz tās patēriņš sasniedz savu daļu plus `borrowAvailable`.

Jauda, par kuru nav pretenziju par piešķiršanu (100 mīnus svērumu summa), nav aizdodama. Neviena atslēga nepiekrita to aizdot.

**Piemērs.** `L` ir 1000.

| Atslēga | Svars | Dalīties | Patērēts | Aizdod |
| ------- | ----- | -------- | -------- | ------ |
| A       | 50    | 500      | 530      | 0%     |
| B       | 30    | 300      | 100      | 50%    |
| C       | 0     | 0        | 60       | 0%     |

- B aizdod 50% no sava tukšgaitas 200, kas ir 100. C jau paņēma 60 virs savas daļas. A var aizņemties 40.
- A tiek pasniegta par 530 un tiek atteikta, tiklīdz tā patēriņš sasniedz 540.
- Pirms C kaut ko izmantoja, kad A bija vai bija mazāks par savu daļu, C varēja aizņemties 100.
- Pirms C kaut ko izmantoja, kad A bija 530, C varēja aizņemties 70.

**Nulles svars.** Atslēgas ar svaru 0 daļa ir 0. Tā tiek pasniegta tikai tad, kad tās patēriņš ir mazāks par citu aizdoto. Ja neviens neaizdod, tas tiek atteikts no pirmā pieprasījuma.

**Termiņi.** Nevienam fona uzdevumam nebeidzas piekrišanas termiņš. Katrs pieprasījums salīdzina termiņu ar savu laiku, un šim laikam vienāds termiņš ir pagājis. Saglabāts termiņš, kas nav ierobežots skaitlis vai ir pagājis lielākais `Date` iespējamais datums, tiek uzskatīts par izpildītu.

**`soft` un `burst`.** Kreditēšana tos neierobežo. `soft` atslēgai tiek piešķirta prioritāte, kad tā ir beigusies. `burst` atslēga tiek nodota, kamēr baseinā ir vieta. Baseina griesti joprojām atsakās no katras atslēgas, tiklīdz baseina kopējais apjoms sasniedz savu robežu.

**Maksa par pieprasījuma ceļu.** `saturation` baseins nelasa neko vairāk kā iepriekš. `consent` pūlā saskaitāmā dimensija nolasa pārējās atslēgas tikai `hard` atslēgai, kas ir vienāda vai lielāka par tās daļu, kamēr cita atslēga aizdod. Pēc tam tas paralēli lasa katru citu taustiņu. Neveiksmīga lasīšana tiek uzskatīta par šīs atslēgas patēriņu 0. `percent` dimensija neliek lasīt, jo attiecinājuma grāmatā ir visas atslēgas.

**Baseina rediģēšana.** Rediģējot, tiek saglabāta palikušo atslēgu piekrišana. Tas attiecas uz piešķiršanas labojumiem, grupas mēroga aizstāšanu un `ensure` zvaniem. Noņemtā atslēga zaudē piekrišanu, un atpakaļ pievienotā atslēga sākas ar 0. Administratora maršruti atgriež katras atslēgas piekrišanu un nekad to neieraksta. Pārslēdzot kopu atpakaļ uz `saturation` tiek saglabāta katra saglabātā piekrišana, kas šajā režīmā neietekmē. Atkārtoti pārslēdzot kopu uz `consent` tiek atkārtoti aktivizētas saglabātās piekrišanas, kuru termiņš nav beidzies. Atslēgas turētājs var notīrīt saglabāto piekrišanu jebkurā režīmā.

**Jaunināšana.** Ja kolonnas `lending_percent` un `lending_until` jau pastāv, migrācija pievieno tikai `borrow_mode`, un saglabātie procenti paliek tādi, kādi tie ir. Katrs baseins sākas `saturation` režīmā. Ieslēdziet `consent` katram baseinam baseina vednī. No saglabātajām vērtībām nekas netiek secināts.

**Ierobežojumi.**

- Aizdevējs var atrast baseinu pie tā griestiem, pirms tas izmanto savu daļu. Jauda, ko citi aizņēmās, tiek ieskaitīta kopsummas apjomā.
- Pārbaude tiek veikta pirms pieprasījuma un nekas netiek rezervēts. Vienlaicīgi pieprasījumi nolasa patēriņu, pirms tie tiek reģistrēti, tāpēc aizdoto jaudu var iztērēt vairāk nekā vienu reizi, ņemot vērā pieprasījumus lidojuma laikā. `saturation` režīma koplietošanas pārbaudei ir tāds pats īpašums.

---

## Slīdošā loga skaitītājs

Implementēts failos `src/lib/quota/sqliteQuotaStore.ts` un `redisQuotaStore.ts`.

Divi intervāli katram `(apiKeyId, dimensionKey)` pārim:

- `curr`: pašreizējais intervāls (`floor(nowMs / windowMs)`)
- `prev`: iepriekšējais intervāls (`curr - 1`)

Efektīvā slīdošā vērtība:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precizitāte**: aptuveni 99%. Kļūda nepārsniedz 1% no loga lieluma pie
intervālu robežas (tas ir raksturīgi 2 intervālu aproksimācijai).

### Vienlaicīga izpilde

SQLite draiveris: atmiņā glabāta savstarpējās izslēgšanas bloķēšana katrai `(apiKeyId | dimensionKey)` atslēgai novērš
lasīšanas-modificēšanas-rakstīšanas sacensību. Šis modelis līdzinās `src/sse/services/auth.ts` risinājumam pret vienlaicīgu pieprasījumu lavīnu.

Redis draiveris: Lua EVAL skripts atomārai palielināšanai — tiek izpildīts kā viena Redis komanda.

---

## Draiveri

### SQLite (noklusējums, bez instalēšanas)

- Tabula: `quota_consumption` (skatiet migrāciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Vislabāk piemērots izvietojumiem ar vienu instanci.
- Visi pastāvīgie dati tiek glabāti esošajā OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (neobligāts, vairākām instancēm)

- Nepieciešama `ioredis` npm pakotne.
- Skaitītāji tiek glabāti Redis; metadati (pūli/piešķīrumi) joprojām tiek glabāti SQLite.
- Vislabāk piemērots izvietojumiem ar vairākām replikām, kurās skaitītāji ir jākoplieto.

### Draiveru pārslēgšana

Izmantojot iestatījumu lietotāja saskarni (`/dashboard/settings` → Kvotu krātuve) vai vides mainīgos:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB iestatījumam ir prioritāte pār vides mainīgo. Ja `driver=redis`, bet URL nav norādīts vai
`ioredis` nav instalēts, fabrika atkāpjas uz SQLite un reģistrē brīdinājumu žurnālā.

Draivera izvēles secība:

1. DB iestatījums `quotaStore.driver`
2. Vides mainīgais `QUOTA_STORE_DRIVER`
3. Noklusējums: `sqlite`

---

## Daudzdimensiju

Baseinam var būt vairāki izmēri. Katra dimensija ir neatkarīga:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Piemērs: Codex plāns** (5 h% + nedēļā%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Lai pieprasījumam būtu jāatbilst visiem izmēriem.

### Procentuālās kategorijas: attiecinājums uz katru atslēgu

Procentu plānā ir norādīts viens lietojuma rādītājs katram kontam un plāna logam. Pakalpojumu sniedzējs nesniedz skaitītāju par katru API taustiņu.

Lai sadalītu šo skaitli starp atslēgām, katrā grupā tiek saglabāta attiecinājuma grāmata katram kontam un plāna logam. `src/lib/quota/percentLedger.ts` ievēro grāmatas noteikumus. `src/lib/quota/percentAttribution.ts` pārvērš grāmatu par skaitļiem, ko izmanto izpilde. Rezultāts ir aprēķins, kas izveidots no katra galvenā maršruta marķieriem.

#### Lasījumi, kas aizkustina grāmatu

Grāmata virzās tikai uz paša nodrošinātāja skaitli pieprasītajā plāna logā. Šie savienojumi ziņo par vienu:

| Pakalpojumu sniedzējs                | Plānojiet logus |
| ------------------------------------ | --------------- |
| Claude, izmantojot OAuth savienojumu | `5h`, `weekly`  |
| Codex                                | `5h`, `weekly`  |

Tie netiek uzskatīti par lasījumiem:

- atbilde, ko pakalpojumu sniedzēja klients atzīmē kā novecojušu
- Claude logs, kura procentuālo daļu pakalpojumu sniedzējs nav ziņojis
- cita loga figūra vai sliktākais logu gadījums
- ātruma ierobežojuma galvenes atkāpšanās
- neveiksmīga lasīšana

Citiem pakalpojumu sniedzējiem, tostarp Claude ar API taustiņu, nav grāmatu. Par katru atslēgu tiek iekasēta 0 procentu likme, tāpat kā pirms šīm izmaiņām.

Lasījums koplieto piesātinājuma signāla 30 sekunžu kešatmiņu. Claude nolasījums ir datēts ar brīdi, kad skaitlis tika novērots atbildes galvenēs, vai nolasīts no lietošanas beigu punkta, ja šis laiks ir zināms. Citi rādījumi ir datēti pēc šī kešatmiņas ieraksta izveides.

#### Kas grāmatā glabājas

Katrs reģistrētais pieprasījums vienreiz pievieno savus marķierus skaitītājam katram pūlam, kontam un atslēgai. Skaitītājs tikai aug. Grāmatā ir saglabātas trīs lietas:

- bāzes līnija: skaitlis, kad grāmata tika atvērta vai logs pēdējo reizi pagriezās
- pēdējais lietotais skaitlis
- katrai atslēgai, tās marķiera skaitītājs tajā pašā brīdī, ko sauc par tās atzīmi

Grāmata tiek atjaunināta, kad izpilde vai lietošanas maršruts aprēķina attiecinājumu. Raksti tiek salīdzināti un iestatīti uz pārskatīšanas numura. Rakstnieks, kurš zaudē atkārtotus mēģinājumus pēc jaunas lasīšanas.

#### Kā tiek aprēķināta atslēgas daļa

Katra atslēgas daļa tiek aprēķināta, kad grāmata tiek lasīta. Skaitļa pieaugums kopš bāzes līnijas tiek sadalīts starp atslēgām proporcionāli marķieriem, kas ir maršrutēti kopš atzīmes.

Together, šie marķieri izskaidro ne vairāk kā vienu skaitļa punktu uz `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` marķieriem (noklusējuma 1000). Izaugsme, ko viņi neizskaidro, ir ārēja. Bāzes līnija ir arī ārēja.

Piemēram, grāmata tiek atvērta ar 0. Atslēga A pēc tam maršrutē 900 000 marķieru un atslēga B maršrutē 100 000. Ja skaitlis ir 60, A daļa ir 54 punkti un B daļa ir 6.

Skaitītājs zem atslēgas atzīmes ir restartēts un tiek skaitīts pilnībā. Atslēga bez atzīmes, piemēram, atslēga, kas pievienojas baseinam loga vidū, saskaita visus tā marķierus. Skaitlis, kas atpaliek no marķieriem, izraisa kļūdu, kas pazūd nākamajā lasījumā. Tas neuzkrājas.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tiek lasīts uz katra attiecinājuma. Vērtība, kas nav ierobežots skaitlis, kas ir vismaz 1, samazinās līdz 1000.

#### Kā lasīšana maina grāmatu

Tiek piemērots pirmais atbilstības noteikums:

1. **Vēl nav grāmatas:** lasīšana atver grāmatu. Tās skaitlis ir bāzes līnija, un katrs skaitītājs ir atzīmēts.
2. **Vecāks lasījums:** tiek ignorēts rādījums, kas datēts pirms pēdējās lietotās vērtības. Tāpat arī rādījums, kura atiestatīšanas laiks ir vairāk nekā 30 minūtes agrāks nekā saglabātais.
3. **Jauns pakalpojumu sniedzēja logs:** atiestatīšanas laiks ir vairāk nekā 30 minūtes vēlāks, nekā saglabātais pagriež grāmatu. Skaitlis kļūst par bāzes līniju, un katrs skaitītājs tiek atzīmēts vēlreiz. Atslēgas bez letes atstāj grāmatu.
4. **Beigts logs:** saglabātais atiestatīšanas laiks, kas nav pēc nolasījuma datu laika, nozīmē, ka logs ir beidzies. Lasīšana pārvērš grāmatu neatkarīgi no tās figūras.
5. **Augstāks skaitlis:** kustas tikai pēdējā figūra. Bāzes līnija un atzīmes paliek.
6. **Tas pats skaitlis:** figūra, bāzes līnija un atzīmes paliek. Tiek uzrakstīts tikai atiestatīšanas laiks, kas grāmatai trūkst.
7. **Apakšējais skaitlis:** zemāks skaitlis nekad netiek piemērots kā tāds. Tā pagriež grāmatu tikai tad, ja ir trīs lietas. Tas ir vismaz divas minūtes jaunāks par pēdējo lietoto rādījumu. Nekas neliecina, ka logs ir tāds pats atvērts. Tas ir vairāk nekā par vienu punktu zemāks.

Logs tiek uzskatīts par atvērtu, ja ir trīs lietas. Abi atiestatīšanas laiki ir zināmi. Tie atrodas 30 minūšu attālumā viens no otra. Saglabātais vēl priekšā nolasījumam. Zemāks skaitlis šajā logā neko nemaina.

Atiestatīšanas laiks tiek saglabāts tikai tad, kad tas ir pirms nolasījuma datu laika, kurā tas tiek veikts. Lielāks skaitlis saglabā rādījuma atiestatīšanas laiku, kad tas ir lietojams, un saglabā saglabāto citos gadījumos. Vienāds skaitlis reģistrē lasīšanas atiestatīšanas laiku tikai tad, ja grāmatai tāda nav. Tas neko citu nemaina. Zemāks skaitlis, kas nepārvērš grāmatu, nereģistrē atiestatīšanas laiku.

#### Kad grāmata tiek lietota

Pēc lasīšanas grāmata tiek izmantota, ja vien tās saglabātais atiestatīšanas laiks nav pēc pašreizējā laika. Šāds gadījums rodas, ja nolasījums, kas veikts tieši pirms atiestatīšanas, piemēram, no kešatmiņas, tiek novērots tieši pēc tās.

Ja nav izmantojama lasāmviela, saglabātā grāmata tiek izmantota tikai tad, kad tā joprojām var būt pašreizējā loga grāmata. Tas attiecas uz diviem gadījumiem:

- tā atiestatīšanas laiks ir zināms un vēl priekšā
- tam nav atiestatīšanas laika, un pēdējais rādījums, kas to mainīja, ir ne vairāk kā 15 minūtes vecs

Citādi nekas netiek piedēvēts, kā tad, kad grāmatas nav. Par grāmatu, kuras saglabātais atiestatīšanas laiks ir pagājis, maksa nekad netiek iekasēta.

#### Izpilde

Atslēgas patēriņš procentos ir tās piešķirtā daļa plus ārējās daļas daļa. Ārējā daļa vispirms izmanto jaudas bez piešķīruma pretenzijas (100 mīnus svaru summa). Tikai pārpalikums tiek sadalīts starp atslēgām pēc svara.

Šo patēriņu salīdzina ar atslēgas taisnīgo daļu kā jebkurai citai dimensijai. Stingrais režīms joprojām tiek sākts, kad piesātinājuma signāls sasniedz `QUOTA_SATURATION_THRESHOLD` (noklusējums 0,5). Katrs skaitlis tiek mērogots pēc spēkā esošā ierobežojuma: viena konta ierobežojums reizināts ar kontu skaitu pūlā.

Absolūtais vāciņš ar `capUnit: "percent"` ņem vērā tikai atslēgai piešķirto daļu, kas mērogota tāpat. Viena konta ierobežojums ir 100 un k konti. Kad atslēgas daļa no apkalpojošā konta skaitļa sasniedz N/k punktus, tiek sasniegts ierobežojums N. Katrs konts tiek salīdzināts ar savu grāmatu. Piemēram, ar diviem kontiem maksimālā robeža 10 tiek sasniegta 5 punktos no viena konta skaitļa.

Ja veikalu nevar nolasīt, nekas netiek attiecināts un par katru atslēgu šajā dimensijā tiek iekasēta 0. Ja grāmatas rakstīšana neizdodas, attiecinājumam tiek izmantota grāmata tāda, kāda tā tika lasīta. Ja marķiera ierakstīšana neizdevās, šī pieprasījuma marķieri tiek izslēgti no grāmatas. Neviena no šīm kļūmēm nebloķē pieprasījumu.

`consent` pūlā aizdevuma formula izmanto katras atslēgas patēriņu procentos, kā aprakstīts iepriekš. Kad tiek aizdota cita atslēga, grāmata tiek izlasīta vienreiz un tiek attiecināta uz katru taustiņu. Bez lietojamas grāmatas katra atslēga tiek iekasēta 0. Atslēga ar svaru pēc tam tiek nodota, un atslēga ar svaru 0 tiek nodota tikai tad, kad tiek aizdota cita atslēga.

#### Lietošanas maršruts

`GET /api/quota/pools/{id}/usage` ziņo par tiem pašiem skaitļiem, izmantojot to pašu funkciju. Procentu dimensijai ir viens ieraksts katram baseina savienojumam `accounts`. Tā augstākā līmeņa `consumedTotal` un `perKey` atspoguļo pirmo ierakstu.

Maršrutā tiek izmantots arī pašreizējais lasījums, tāpēc tas var virzīt grāmatu atbilstoši pieprasījumam. `internal + external` var atšķirties no `consumedTotal`, ja nav izmantojama rādījuma vai ja netiek piemērots mazāks skaitlis.

#### Uzglabāšana un saglabāšana

Abi kvotu veikali glabā grāmatu. Vietnē SQLite automātiskā datu bāzes tīrīšana, ja tā ir iespējota, noņem rindas, kas nav atjauninātas 60 dienas. Vietnē Redis baseina savienojuma grāmatām un skaitītājiem ir viena atslēga. Tā derīguma termiņš beidzas 60 dienas pēc pēdējās pilnvaras rakstīšanas vai grāmatas maiņas. Grāmata, kas nemainās, netiek pārrakstīta, tāpēc nogrieznis tiek iestatīts virs garākā plāna loga. Manuālā lietošanas vēstures atiestatīšana arī notīra grāmatas par SQLite (skatiet sadaļu Ierobežojumi).

#### Ierobežojumi

- Viss konta skaitļa pieaugums kopš bāzes līnijas tiek sadalīts pēc marķieriem, kas katrai atslēgai ir maršrutēti kopš tā laika. Kad šī izaugsme notika, nav nozīmes.
- Tātad par lietošanu ārpus OmniRoute tiek iekasēta atslēgām, ciktāl to atļauj to marķieri. Tas ietver lietojumu, kas veikts pirms atslēgas pirmā loga pieprasījuma, kad grāmata jau bija atvērta.
- Piemēram, izmantošana ārpusē palielina kontu par 60 punktiem, kamēr nav galveno maršrutu. Pēc tam atslēga novirza 30 000 žetonu, un skaitlis sasniedz 60,6.
- Ja grāmata bija atvērta pirms lietošanas, atslēgas daļa ir 30 punkti. Tam ir arī 7,65 ārēja izmantošana ar četrām taustiņiem, kuru svars ir 25.
- Ja grāmata tiek atvērta pēc šīs lietošanas, 60 punkti ir bāzes līnija. Atslēgas daļa ir 0,6 punkti, un tā veic 15 ārēju lietojumu.
- Pieprasījums vai lietošanas maršruta apmeklējums atver grāmatu. Tātad tas, vai šāds lietojums tiek uzskatīts par sākotnējo stāvokli, ir atkarīgs no grāmatas atvēršanas brīža.
- Izmantojot noklusējuma zemāko vērtību, atslēga, kas novirza 60 000 žetonu, kamēr tiek izmantota ārpusē, palielina kontu par 60 punktiem, kā savu daļu iegūst visus 60.
- Ja grīda ir 50 000, tā pati daļa ir 1,2 punkti. Pārējie 58.8 ir ārēji un tiek uzlādēti pēc svara, tāpat kā jebkura ārēja lietojuma gadījumā.
- Iestatiet `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tuvu tam, cik maksā viens punkts savā plānā. Ārējā izmantošana ietver datplūsmu tajā pašā kontā no atslēgām ārpus baseina.
- Procentu ierobežojums tiek piemērots katrā režīmā. Ja konts ir daudz zemāks par piesātinājuma slieksni, var atteikt atslēgas izmantošanu ar ierobežotu atslēgu.
- Iepriekš logā uzņemiet vāciņu 10 un 12 ārējās lietošanas vietās. Pēc tam atslēga, kas novirza 20 000 žetonu, tiek atteikta ar konta skaitli 12,4%.
- Sadalījums ir aprēķins pēc marķiera apjoma. Pieprasījums tiek uzskatīts par tā uzvednes marķieriem un tā pabeigšanas marķieriem. Kešatmiņas atlaides un modeļu cenas šo skaitu nemaina.
- Pieprasījums, kas nebeidzas ar statusu 200, nereģistrē marķierus. Piemēri ir straume, ko klients atvieno, un augšpuses kļūda pēc lietošanas.
- Par izmantošanu, ko izraisījis šāds pieprasījums, tiek iekasēta maksa no atslēgām, kas ierakstīja marķierus, nepārsniedzot to marķierus. Pārējais ir ārējs. Tas nepārvietojas atpakaļ. Atbildē, kurā netiek ziņots par marķiera izmantošanu, netiek reģistrēti arī marķieri.
- Notiekoša pieprasījuma lietojums var tikt parādīts cita aktīvās atslēgas daļā visam pieprasījumam. Tas tiek pārvietots atpakaļ tikai tad, kad pieprasījums beidzas ar statusu 200.
- Izmantošana, kas jau ir kontā, atverot grāmatu, tiek uzskatīta par ārēju. Tas attiecas uz jaunināšanu, jaunu pūlu un jaunu kontu. Arī izmantošana jaunā logā pirms pirmā nolasījuma tiek uzskatīta par ārēju.
- Katra atslēga sākas ar tās svara daļu no šī lietojuma, pēc jaudas nav pretenziju par piešķiršanu. Ja viens konts ir 85% un piecas atslēgas ar svaru 20, katra sākas ar 17 no 20 izmantotajām atslēgām.
- Kopā ar vairākiem kontiem apkalpojošā konta skaitlis tiek piemērots summētajam budžetam. Grāmatā tas nav mainīts.
- Zemāks skaitlis logā, ko pakalpojumu sniedzējs ziņo kā atvērtu, netiek lietots. Atiestatīšanas laiks, kas pāriet atpakaļ par vairāk nekā 30 minūtēm, tiek uzskatīts par vecu rādījumu.
- Abos gadījumos grāmata saglabā savu stāvokli, līdz beidzas saglabātais atiestatīšanas laiks. Pēc tam grāmata netiek iekasēta līdz brīdim, kad lasīšana to pārvērš.
- Risinājums ir manuāla lietošanas vēstures atiestatīšana (`POST /api/settings/purge-usage-history`). Tas notīra attiecinājuma grāmatas un to marķieru skaitītājus SQLite datubāzē.
- `all` periods notīra katru grāmatu un skaitītāju. Īsāks periods vispirms notīra grāmatas, kas tajā nav rakstītas. Pēc tam tas notīra skaitītājus, kas nav ierakstīti tajā, bet tikai baseina savienojumam, kuram nav palikusi neviena grāmata. Saglabāta grāmata joprojām atzīmē katru taustiņu pret savu skaitītāju.
- Grāmata, kuras figūra nav izkustējusies, netiek pārrakstīta, tāpēc īsāks periods var arī notīrīt pašreizējā loga grāmatu. Nākamajā lasījumā tiek atvērta jauna grāmata ar pašreizējo skaitli.
- Atiestatīšana neskar Redis kvotu veikalu. Tur grāmata beidzas ar tās logu vai beidzas 60 dienas pēc tās pēdējās rakstīšanas.
- Ja pakalpojumu sniedzējs nenosūta atiestatīšanas laiku, logs, kas tiek atiestatīts un uzpildīts virs vecā skaitļa starp diviem rādījumiem, izskatās kā lielāks skaitlis. Grāmata saglabā veco bāzes līniju un atzīmes.
- Rādījumi ir datēti pēc vietējā pulksteņa. Ja grāmata ir ātrāka par pakalpojumu sniedzēju vai avots ziņo par atiestatīšanas laiku nedaudz agrāk, šī atšķirība var tikt parādīta agri.
- Pieaugumu šajā īsajā laika posmā sadala tajā virzītie marķieri. Nākamā loga pirmais lasījums to izlabo. Ja pagrieztajai grāmatai nav atiestatīšanas laika, šim labojumam ir nepieciešams mazāks skaitlis, kas ir vismaz divas minūtes jaunāks par pēdējo lietoto lasījumu.
- Gadījumi, kas koplieto Redis veikala datuma rādījumus ar saviem pulksteņiem, tāpēc sinhronizējiet šos pulksteņus. Tādas instances rādījumi, kuras pulkstenis iet aiz muguras, izskatās vecāki un tiek ignorēti.
- Ja pēc saglabātā atiestatīšanas laika netiek saņemts neviens izmantojams rādījums, katras atslēgas procentuālā daļa un procentu ierobežojumi netiek piemēroti, līdz tiek atgriezts nolasījums. Bez atiestatīšanas laika tas sākas 15 minūtes pēc pēdējā lasījuma, kas mainīja grāmatu.
- Veikalā Redis 60 dienas dīkstāvē esošai grāmatai var beigties derīguma termiņš starp čeku un tās rakstīšanu. Pēc tam tas tiek atkārtoti izveidots, veicot pārskatīšanu virs 1, kas ir derīgs stāvoklis.

---

## Plāna noteicējs

Īstenots failā `src/lib/quota/planResolver.ts`.

Prioritāte (no augstākās līdz zemākajai):

1. **Manuāla DB ignorēšana** — tabula `provider_plans`, katram `connectionId`.
2. **Zināmais katalogs** — `src/lib/quota/planRegistry.ts` (tikai dati).
3. **Tukšs plāns** — nav dimensiju, nepieciešama manuāla konfigurācija.

### Zināmais katalogs

| Pakalpojuma sniedzējs | Dimensijas                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nezināms), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nav noklusējuma — nepieciešama manuāla konfigurācija          |

---

## Cauruļvadu integrācija

### PRE āķis (`open-sse/handlers/chatCore.ts`)

Darbojas pirms augšupējā izpildītāja, pēc autentifikācijas un politikas pārbaudēm:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : ja `enforceQuotaShare` met, pieprasījums ir atļauts cauri ar `pino.warn` žurnālu. Tas neļauj kvotas dzinēja kļūdai bloķēt visu trafiku.

**Kad kapacitāte atgriežas.** Atteikums pie atslēgas daļas vai baseina griestiem beidzas ar vienu no diviem teikumiem abos aizņemšanās režīmos:

- `percent` logs: `. The <window> window resets at <time>.` Laiks ir pakalpojumu sniedzēja ziņoto atiestatīšanas laiks.
- Skaitāmā vienība: `. Enough <window> usage is expected to clear by <time>.` Laiks ir augšējā robeža no bīdāmā loga, ja atslēga nesūta neko citu.

`<time>` ir ISO 8601 instant UTC. Atteikums pēc tam ietver `Retry-After`: visas sekundes līdz šim brīdim plus viens. Klients, kas gaida tik ilgi, mēģina atkārtoti, ilgākais, vienu sekundi pēc mirkļa. Ja moments nav zināms, atteikumam nav ne teikuma, ne galvenes. Absolūts ierobežojuma atteikums nesniedz ne vienu, ne otru. Publiskais kods paliek `quota_share_blocked`.

Koplietošanas atteikums neskar koplietoto savienojumu. Tas nenosaka atdzišanu, modeļa bloķēšanu un pakalpojumu sniedzēja slēdža atteici, un pārējās baseina atslēgas tiek apkalpotas. Kad katrs kombinācijas mērķis atsakās no atslēgas savai daļai, kombinācija atbild uz 429 bez gaidīšanas. Tās atbilde satur mājienu kā `Retry-After`. Iegulšanas ceļš beidz savu atteikumu ar tādu pašu teikumu un nenosūta `Retry-After`.

### POST āķis (rekordiskais patēriņš)

Pēc veiksmīgas atbildes:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drifta nots** : ja `consume` pēcreakcija neizdodas, ritošais skaitītājs tiek skaitīts par zemu. Piesātinājuma signāls no pakalpojumu sniedzēja (piem., `anthropic-ratelimit-unified-5h-utilization`) labo globālo novērtējumu nākamajā pieprasījumā.

### Kombinētais vieglais sods (`open-sse/services/combo.ts`)

Kad `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Sods tiek piemērots pēc visiem pārējiem punktu skaitīšanas faktoriem. Tas samazina automātiskās kombinācijas iespējamību, ka tiks atlasīta piesātināta atslēga, to stingri nebloķējot.

---

## UI Pamācība

### `/dashboard/costs/quota-share` — Galvenā baseinu lapa

Sastāvdaļas (visas `src/app/(dashboard)/dashboard/costs/quota-share/` formātā):

| Komponents             | Mērķis                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Ievadkarte, kas izskaidro kvotu koplietošanu jauniem lietotājiem                            |
| `CreatePoolModal`      | Izveidot jaunu kvotu kopu (savienojuma + nosaukums + sākotnējie piešķīrumi)                 |
| `PoolCard`             | Kopsavilkums par katru fondu: nosaukums, savienojums, piešķīrumu skaits                     |
| `DimensionBar`         | Kategorijas josla: katras atslēgas daļa + globāla izmantošana                               |
| `AllocationTable`      | Galds ar patērēto, godīgu daļu, deficit/surplus, aizņēmuma karogu                           |
| `BurnRateChart`        | EMA izdegšanas ātruma līniju diagramma (slinka atkārtota diagramma, izmantojot `dynamic()`) |
| `EditAllocationsModal` | Rediģēt pūla piešķiršanas svarus, ierobežojumus un politikas                                |
| `BorrowModeField`      | Aizņemšanās režīma atlasītājs (`saturation` vai `consent`) vednī                            |
| `LendingBadge`         | Tikai lasāma emblēma uz atslēgas, kas aizdod, tikai `consent` baseinos                      |

Aizdevuma žetons parāda procentuālo daļu un, ja tas ir iestatīts, termiņu UTC ar nosaukto zonu. Tā nosaka termiņu lietošanas momentuzņēmuma laikā. Beidzies vai nenolasāms termiņš tiek rādīts kā `lending expired`.

Lapas āķi:

- `usePools` — ienes `GET /api/quota/pools` ik pēc 30 sekundēm.
- `usePoolUsage` — ienes `GET /api/quota/pools/[id]/usage` pēc pieprasījuma.
- Lai migrētu mantotos LS datus,`useLocalStoragePoolMigration` — palaiž vienu reizi montāžā.

Baseina vedņa taustiņu solim ir `Show usage by member to key holders` lodziņš. Tas iestata pūla `memberBreakdown` opciju (skatiet [sadaļu Dalībnieku lietojums](#member-usage) ). Zem tā vednis brīdina, ka kāds, kurš zina, kāda atslēga tika izmantota, var saskaņot joslu ar šo taustiņu. Ja izvēles rūtiņa ir atzīmēta, tas norāda, ka solī ir norādīti mazāk nekā trīs vai vairāk nekā 20 taustiņi, jo stieņi paliek paslēpti. Tas saskaita atslēgas solī un nevar noteikt, kura no tām var veikt pieprasījumus.

### `/dashboard/costs/quota-share/plans` — Pakalpojumu sniedzēja plāna konfigurācija

- `ProviderPlanConfigClient.tsx`: nolaižamā izvēlne, lai atlasītu pakalpojumu sniedzēju, skatītu atrisināto plānu (automātiski no kataloga vai manuāla ignorēšana) un rediģētu izmērus.
- Izmaiņas rakstiet uz `PUT /api/quota/plans/[connectionId]`.
- Dzēšot, tiek atjaunots katalogs vai tukšs plāns.

---

## Pašapkalpošanās kvota API (izvēlēties)

`GET /api/v1/me/quota/{provider}` (tiek pasniegts arī vietnē `/v1/me/quota/{provider}`) ļauj API atslēgu turētājam ar savu atslēgu nolasīt, cik liela daļa koplietotā abonementa pieder viņam un kas to bloķē. Maršruts ir plāns apvalks virs `src/server/selfService/quotaHandler.ts`; skatu veido `src/lib/quota/selfView.ts`, un tā atbildes līgums ir `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Iespējošana un autentifikācija

- Funkcijas karodziņš `QUOTA_SELF_PANEL`, noklusējuma `false`. Kamēr tas ir izslēgts, pieprasījums, kas sasniedz maršrutu, saņem 404. Izmantojot `REQUIRE_API_KEY=true`, klienta API politika noraida trūkstošu vai nederīgu atslēgu ar 401 pirms maršruta palaišanas neatkarīgi no karoga. Pieprasījums bez atslēgas, bet ir pierakstījies informācijas paneļa sesijā, atbilst šai politikai un saņem paša maršruta atbildi. Karogs tiek atrisināts tāpat kā jebkurš cits karodziņš (informācijas panelis vai REST ignorēšana, pēc tam tāda paša nosaukuma vides mainīgais); skatiet [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Katra pūla parādāmais nosaukums un katra grafika iezīme tiek atgriezta pūla atslēgu turētājiem tieši tā, kā tos ierakstījis administrators. Pirms karoga ieslēgšanas pārbaudiet, vai tie ir piemēroti šiem atslēgu turētājiem.
- Atslēga tiek nolasīta tikai no galvenēm: `Authorization: Bearer <key>` vai `x-api-key: <key>`. Kad tiek nosūtīti abi, tiek izmantots pirmais, kas apstiprinās. Atslēga vaicājuma virknē vai sīkfails tiek ignorēts. Servera vides atslēga ir atteikta (401).
- Atslēgai nepieciešams `self:usage` tvērums (403 bez tā).
- Pakalpojumu sniedzēja segments tiek apgriezts, ar mazajiem burtiem un pārbaudīts pret `^[a-z0-9][a-z0-9._-]{0,63}$` (citādi — 400), pēc tam tiek atrisināts, izmantojot pakalpojumu sniedzēja reģistru, tāpēc aizstājvārds, piemēram, `cc` nolasa `claude` kopas. `claude` un `anthropic` lasa vienus un tos pašus baseinus.

### Ko parāda katra redzamība

| Redzamība     | Nepieciešams                                                                         | Lauki                                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pašu daļa     | `self:usage`                                                                         | `pools[]` (atsauce, nosaukums, pakalpojumu sniedzējs, politika, svars, vāciņš), `dimensions[].yourShare`, `accounts[]` ar `yourShare` (uz `percent` loga bez `attributed` un `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                 |
| Konta līmenis | `self:usage` + `self:account-quota` un nodrošinātājs atslēgas `sharedQuotaProviders` | pievieno `dimensions[].total`, `accounts[].dimensions[].account` un `accounts[].modelWindows`, `attributed` un `external` `percent` loga `yourShare` un `members` pūlam ar ieslēgtu dalībnieku lietojumu (skatiet [sadaļu Dalībnieka lietojums](#member-usage) ) |

- `sharedQuotaProviders` ir katras atslēgas iestatījums (`PUT /api/keys/[id]/self-service`): `null`, noklusējuma vērtība, nozīmē katru nodrošinātāju, kuru atslēga sasniedz; `[]` nozīmē neviens. Katra baseina `accountVisible` norāda, kura redzamība tika piemērota tam.
- Kontu joslas un modeļu logi tiek rādīti tikai tiem kontiem, kuru savienojumu var izmantot atslēga. Ja atslēgai ir atļauto savienojumu saraksts, konts ārpus tās saglabā savu `Account N` ierakstu bez `account` vai `modelWindows`. Tukšs saraksts nozīmē, ka nav ierobežojumu, tāpat kā `/v1/me/status`. Kopējais baseins (`dimensions[].total`) nav atkarīgs no šī saraksta.
- Divi skaitļi, kas parādīti tikai ar `self:usage` nāk no citu taustiņu izmantošanas. Grafika budžeta `exhausted` atspoguļo katras atslēgas patēriņu saskaņā ar šo grafiku. Baseinā, kura svars ir nulle, atslēgas `weight` ir `100 / number of members`. Abi ir tie, ko izpilde attiecas uz atslēgu.
- Kopu identificē tikai ar `ref`— necaurspīdīgu vērtību, kas saistīta ar izsaucēja taustiņu. Tā parādāmais nosaukums (`name`) ir iekļauts tā, kā administrators to rakstīja. `ref` tiek iegūts no atslēgas un pūla ar servera API atslēgas noslēpumu (`API_KEY_SECRET`). Klienti to nedrīkst paturēt: tas mainās, ja šis noslēpums tiek pagriezts.
- Konti ir norādīti kā `Account 1`, `Account 2`, … pūla secībā. Netiek atgriezts pūla id, savienojuma ID, konta e-pasts vai konta nosaukums, un atbilde tiek nosūtīta caur līguma shēmu, kas atstāj jebkuru lauku ārpus tās.
- Saskaitāmās vienības (`requests`, `tokens`, `usd`) tiek uzrādītas kā kopas segments, ko ievieš kvotas vārti: `limit` = plāna ierobežojums × konti pūlā, `fairShare` = svars / 100 × `limit` (vienāds sadalījums), kad katrs svars ir skaitītājs `consumed` = kvotu veikals, `remaining` = `fairShare` − `consumed`, grīda ar 0.
- `blocks.schedules` uzskaita atslēgas grafiku logus (`open`/`closed`, `blackout` vai `outside-window`, `retryAfterSeconds`, rezerves stāvus un to, vai loga budžets ir iztērēts); `blocks.modelCaps` uzskaita savus katra modeļa stundu ierobežojumus ar patēriņu.
- Atslēga ārpus katra pakalpojumu sniedzēja pūla saņem 200 ar `pools: []`; `availableModels` ( `qtSd/` ID, ko atslēga redz `/v1/models`), `expiresAt` un `apiBaseUrl` joprojām ir aizpildīti.
- `apiBaseUrl` ir `OMNIROUTE_PUBLIC_API_BASE_URL`, tad `OMNIROUTE_PUBLIC_BASE_URL`, vēl `null`. Tā nekad nav paša pieprasījuma izcelsme.

### `status` un `reason`

| `status`      | Nozīme                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Pašreizējais lasījums.                                                                                                                                                                                                                                                                                                                                          |
| `stale`       | Kešatmiņā saglabāts konts ir atzīmēts kā novecojis vai tāds, kura atiestatīšanas laiks ir pagājis kopš tā nolasīšanas. Cipari tiek saglabāti. Viens modeļa logs, kura atiestatīšanas laiks ir pagājis, iezīmē visu `modelWindows` grupu `stale`. Atslēgas daļai `percent` logā: grāmata tika lasīta bez konta nolasīšanas vārtu kešatmiņā, lai to apstiprinātu. |
| `unavailable` | Nav lasīšanas; skaitļi ir `null`, nekad `0`. `reason` saka, kāpēc.                                                                                                                                                                                                                                                                                              |

| `reason`                          | Kad                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `store_unavailable`               | Kvotu veikalu nevarēja lasīt, vai tas nevar lasīt attiecinājuma grāmatas.                                                |
| `percent_attribution_unavailable` | Atslēgas daļa `percent` logā: šim kontam un logam vēl nav attiecinājuma grāmatas, vai arī grāmatā nav norādīta atslēga.  |
| `percent_window_ended`            | Atslēgas daļa `percent` logā: grāmata pieder plāna logam, kas ir beidzies.                                               |
| `account_not_used_by_key`         | Atslēgas daļa `percent` logā: konta savienojums atrodas ārpus atslēgas atļautajiem savienojumiem. Tā grāmata nav lasīta. |
| `window_not_reported`             | Pakalpojumu sniedzēja ierobežojumu kešatmiņai nav šī plāna loga nolasījuma.                                              |
| `connection_lookup_failed`        | Konta savienojumu nevarēja nolasīt.                                                                                      |
| `not_supported`                   | OmniRoute nevar nolasīt konta nodrošinātāja lietošanas ierobežojumus.                                                    |
| `fetch_failed`                    | Kešatmiņā saglabātā lasīšana nebija izmantojama, un pakalpojumu sniedzēja ierobežojumu atsvaidzināšana neizdevās.        |
| `not_available`                   | Nolasījumam nav lietojuma logu, vai arī kontam vispār nav nolasījuma.                                                    |

Ja nevar nolasīt kvotas krātuves, veikala atbalstītie lauki `blocks` (grafika budžeta `exhausted`, modeļa vāciņa `consumed` un `reached`) ir arī `null`.

### Piekrišana aizdevumam

`PATCH /api/v1/me/quota/{provider}` ieraksta paša zvanīšanas atslēgas piekrišanu vienam pūlam. Tas izmanto `GET` karogu, galvenes un nodrošinātāja noteikumus. `self:usage` tvērums atļauj šo vienu rakstīšanu, lai gan tā nosaukums ir tikai lasāms.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` ir `ref`, ko `GET` atgriež šim pūlam.
- `lendingPercent` ir vesels skaitlis no 0 līdz 100. Vērtība 0 dzēš piekrišanu un tās termiņu. Ķermenis ar `lendingPercent` 0 tiek pieņemts jebkurā režīmā.
- `lendingUntil` nav obligāta: laikmeta milisekundes vai `null` bez termiņa. Tai ir jābūt nākotnē un ne vairāk kā 8640000000000000. Vērtība, kas ir mazāka par 100000000000, tiek nolasīta kā sekundes un tiek noraidīta.
- Jebkurš cits lauks tiek noraidīts. Pamatteksts, kas garāks par 4096 baitiem, tiek noraidīts. Lasīšana apstājas pie šī izmēra, tāpēc garāks ķermenis nekad netiek turēts vesels.

Pārbaudes tiek veiktas šajā tabulā norādītajā secībā. Katrā atteikumā tiek izmantots standarta kļūdas pamatteksts ar fiksētu ziņojumu. Atteikums ar kādu no šīm pārbaudēm neko neuzraksta.

| Statuss | Ziņojums                                                                                           | Kad                                                                      |
| ------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 404     | `Not found`                                                                                        | `QUOTA_SELF_PANEL` karogs ir izslēgts.                                   |
| 401     | `Valid API key required`                                                                           | Trūkst atslēgas vai tā ir nederīga, vai arī tā ir servera vides atslēga. |
| 403     | `API key lacks the self:usage scope`                                                               | Atslēgai trūkst `self:usage`.                                            |
| 400     | `Invalid provider`                                                                                 | Pakalpojumu sniedzēja segments nav derīgs.                               |
| 429     | `Too many lending changes. Retry later.`                                                           | Atslēga pārsniedza savu robežu. Atbilde nes `Retry-After`.               |
| 400     | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Korpuss nav JSON, ir pārāk garš vai neatbilst shēmai.                    |
| 400     | `lendingUntil must be a Unix time in milliseconds`                                                 | Termiņš ir sekundes.                                                     |
| 400     | `lendingUntil must be in the future`                                                               | Termiņš ir pieprasīšanas laikā vai pirms tā.                             |
| 404     | `Pool not found`                                                                                   | `ref` šim pakalpojumu sniedzējam nenosauc šīs atslēgas kopu.             |
| 403     | `Lending is not enabled for this pool`                                                             | Baseins ir `saturation` režīmā, un `lendingPercent` ir virs 0.           |
| 500     | `Failed to build quota view`                                                                       | Jebkura cita neveiksme. Tās iemesls ir reģistrēts serverī.               |

Ierobežojums ir 20 pieprasījumi 60 sekundēs katrai atslēgai. Ikviens pieprasījums, kas iztur pakalpojumu sniedzēja pārbaudi, tiek skaitīts, pat tāds, kas vēlāk noraidīts, vai tāds, kas neko nemaina. Tam ir savs skaitītājs, izņemot atslēgas pieprasījuma ātruma ierobežojumu.

Pieprasījumā, kas maina saglabāto piekrišanu, tiek ierakstīts viens `quota.pool.lending.updated` audita ieraksts. Tas nosauc atslēgu ar vecajām un jaunajām vērtībām. Viena un tā pati iestāde, kas nosūtīta divas reizes, raksta vienu reizi un veic revīziju vienu reizi. Atbilde ir 200 ar pilnu `GET` skatu, kas izveidots pēc rakstīšanas.

`GET` view ziņo par aizdevumiem šādi:

- Katrā baseinā ir `borrowMode` (`saturation` vai `consent`), kā arī atslēgas `lendingPercent` un `lendingUntil`.
- `lendingActive` ir `true` tikai `consent` pūlā, ar procentuālo vērtību virs 0 un termiņš nav sasniegts.
- `consent` baseinā katrs saskaitāmais `dimensions[].yourShare` nes `borrowAvailable`. Tas ir tas, ko atslēga tagad var izmantot virs savas daļas, ko aizdod citas atslēgas.
- `borrowAvailable` izmanto vārtu formulu. Tas nolasa katru otro taustiņu, arī tad, kad atslēga atrodas zem tās daļas. `hard` atslēgai, kas ir viena papildu nolasīšana katrai citai atslēgai un saskaitāma dimensija, paralēli.
- `borrowAvailable` ir `null` `soft` vai `burst` taustiņam un `null`, ja lasīšana neizdodas.
- `borrowAvailable` ir viens skaitlis visiem pārējiem taustiņiem kopā. Divu atslēgu kopā tā ir otras atslēgas paša figūra.
- `borrowAvailable` vēl nav ziņots par `percent` windows vai `accounts[]`.
- `saturation` pūlā skatā tiek ziņots par saglabāto piekrišanu ar `lendingActive: false` un bez `borrowAvailable`.

### Kļūdas

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Ierobežojumi

- `remaining` ir atslēgas godīgās daļas daļa, ko tā nav izmantojusi. Tā nav garantija. Kamēr baseinā ir vieta, aiz tā joprojām var tikt pasniegta atslēga. Kad pūla kopsumma sasniedz `limit`, katra pūla atslēga tiek atteikta neatkarīgi no tās `remaining`, un atslēga bez `self:account-quota` nevar redzēt šo kopējo vērtību.
- `remaining` neņem vērā piešķīruma absolūto `cap`. Izpilde atsaka atslēgu, tiklīdz tās paša patēriņš vāciņa vienības logā sasniedz vāciņa vērtību.
- Konta līmeņa josla nāk no pakalpojumu sniedzēja ierobežojumu kešatmiņas, un tā var aizkavēt izpildes lēmuma pieņemšanu par dažām minūtēm. Rādījums, kura atiestatīšanas laiks ir pagājis, tiek ziņots kā `stale`.
- Katra modeļa logi (`modelWindows`) tiek ziņoti tikai tiem pakalpojumu sniedzējiem, kuriem ir plāna loga kartēšana: Claude un Codex šodien. Citiem pakalpojumu sniedzējiem `modelWindows` joprojām ir redzams, kad tiek rādīti konta dati, ar tukšu `windows` sarakstu.
- Atslēgas daļa `percent` logā ir aptuvens. Tas nāk no attiecinājuma grāmatas un ietver visus ierobežojumus, kas norādīti iepriekš sadaļā “Procentuālās kategorijas: attiecinājums pēc atslēgas”.
- `consumed` ir skaitļu izpilde salīdzinājumā ar taisnīgo daļu. Tas ir tieši `attributed` plus `external`. `attributed` ir daļa, kurā grāmata sniedz atslēgu tās maršrutētajiem marķieriem. `external` ir atslēgas daļa no konta lietojuma, ko pūla atslēgas neņem vērā.
- Abas daļas tiek nosūtītas tikai tad, ja pūla `accountVisible` ir patiesa: atslēgai ir `self:account-quota` un nodrošinātājs atrodas savā `sharedQuotaProviders`. Atslēga bez tās iegūst tikai `consumed`, ar to pašu `status` un `reason`.
- Ar abām daļām un savu svaru turētājs var izmantot ārpus baseina, kas tiek uzlādēts no baseina atslēgām. Īpašnieks ar konta tvērumu jau redz konta kopējo summu.
- Atslēga, kas logā neko nav novirzījusi, joprojām var nolasīt savu ārējo lādiņu no `consumed`, jo tās piešķirtā daļa tad ir 0.
- Piemēram, grāmata tiek atvērta ar 0, un taustiņiem A un B katra svars ir 50. Atslēga A maršrutē 900 000 žetonu un atslēga B 100 000. Pēc tam konts sasniedz 60% no 100. Tad `attributed` ir 54 taustiņam A un 6 taustiņam B, un `external` ir 0 abiem.
- Skats lasa grāmatu un nekad neuzraksta tās stāvokli. Tas neatver grāmatu un nekad neprasa lasītāju pakalpojumu sniedzējam. Izmantojot Redis veikalu, lasīšana noņem fonā aizstātos pārskatīšanas laukus, kā to dara vārtu nolasījumi.
- Daļa ir `ok` tikai tad, kamēr vārtu kešatmiņā ir konta nolasījums. Bez tā tas ir `stale`, tāpēc pūlā bez nesena pieprasījuma tas tiek rādīts, iespējams, novecojis.
- Kamēr pieprasījums netiek nosūtīts caur kopu, daļa nav pieejama. Šis pieprasījums atver grāmatu, un konta skaitlis tajā brīdī tiek uzskatīts par izmantošanu ārpus pūla.
- Kopā ar vairākiem kontiem katrs konta ieraksts izmanto šī konta grāmatu un viena konta ierobežojumu. Izpilde mērogo abas puses pēc kontu skaita, tāpēc proporcija ir vienāda.
- Katra modeļa logiem nav nekādas atslēgas daļas. Grāmatā nav datu par katru modeli.
- Grafika rezerves stāvus skatā nenovērtē: grafiks var tikt rādīts kā `open` kamēr pieprasījums tiek noraidīts ar iemeslu `schedule-reserve`.
- Ja divi vienas atslēgas pūli koplieto savienojumu, izpilde tiek piemērota vienai no tām, un skatā tiek uzskaitīti abi.
- Neveiksmīgiem atslēgas mēģinājumiem nav ierobežojumu katrai adresei: aiz apgrieztā starpniekservera zvanītāji var koplietot vienu adresi (tas ir atkarīgs no tā, vai pārsūtītās klientu adreses ir uzticamas), tāpēc bloķēšana var liegt ceļu katram atslēgas turētājam. Izmantojot `REQUIRE_API_KEY=true`, klienta API politika noraida nederīgu atslēgu pirms maršruta palaišanas, izmantojot šīs politikas 401 pamattekstu šī maršruta vietā.

### Dalībnieku lietošana

Administrators var ļaut atslēgu īpašniekiem redzēt, kā loga lietojums sadalās starp pūla dalībniekiem. Opcija ir baseina `memberBreakdown`, kas pēc noklusējuma ir izslēgta. Tas ir iestatīts baseina vednī vai ar `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` un `GET /api/quota/pools/{id}` ziņo par to.

Skata dimensijā ir `members` tikai tad, ja tas viss ir spēkā:

- baseina opcija ir ieslēgta
- pūlam ir ne vairāk kā 20 piešķirtās atslēgas, un vismaz trīs no tām var veikt pieprasījumus: aktīvas, nav atsauktas, nav aizliegtas un nav beidzies to derīguma termiņš.
- baseina `accountVisible` ir patiess: atslēgai ir `self:account-quota`, un pakalpojumu sniedzējs ir savā `sharedQuotaProviders`
- `percent` logā atslēga var izmantot konta savienojumu
- tika nolasīta paša atslēgas daļa šajā logā: tās `status` nav `unavailable`

Citādi `members` nav. Tas nekad nav tukšs saraksts.

- Katra šķēle ir `{ slot, consumed, isYou }`. Atbildes shēma noraida jebkuru citu rekvizītu sadaļā un sarakstu, kurā ir vairāk nekā 20 slāņu. Šķēles ir norādītas slotu secībā.
- Katrai piešķirtajai atslēgai ir viena daļa, tostarp atslēga, kas vairs nevar veikt pieprasījumus. Biedrs bez lietojuma rāda īstu nulli.
- 1. vieta vienmēr ir jautājošā atslēga ar `isYou` true. Pārējie slotu numuri ir atslēgta jaucējkoda rindas. Tas ir atslēgts ar `API_KEY_SECRET` un aptver baseinu, jautājošo atslēgu un dalībnieku.
- Tātad skaitļi nesakrīt starp turētājiem. Vienam turētājam tie paliek nemainīgi starp apmeklējumiem. Tie var mainīties, kad atslēga pievienojas vai pamet pūlu, vai kad šis noslēpums tiek pagriezts.
- Saskaitāmā logā šķēle ir dalībnieka skaitītājs kvotu veikalā, tas pats skaitītājs kā tā paša `consumed`.
- `percent` logā šķēle ir dalībnieka `attributed` daļa no tās pašas grāmatas, kas tiek lasīta kā atslēgas paša daļa. Izmantošana ārpus baseina nekad netiek sadalīta šķēlēs. Šis lādiņš ir sadalīts pēc svara, tāpēc šķēlēs, kurās tas bija, būtu redzams svars.
- Katrs skats paralēli nolasa vienu vērtību katram citam dalībniekam un saskaitāmam logam. `percent` logā šķēles nemaksā par lasīšanu, izņemot paša akcijas grāmatas lasīšanu. Ja vienu vērtību nevar nolasīt, šim logam nav `members`, un atslēgas daļa paliek.
- Opcija un izmantojamo atslēgu skaits tiek nolasītas vienreiz katrā pūlā un tikai atslēgai, kurai var būt redzami konta dati. Neveiksmīga opcijas vai izmantojamo atslēgu skaita nolasīšana izslēdz joslas šim pūlam. Serveris reģistrē brīdinājumu, un pārējais skats ir izveidots.

Stieņiem nav nosaukumu vai ID. Viņi joprojām stāsta atslēgu turētājam lietas par citiem dalībniekiem:

- Turētāji joprojām var saskaņot šķēles pēc to vērtībām.
- Stabila numerācija ļauj turētājam laika gaitā sekot vienam dalībniekam.
- Skalu skaits parāda, cik atslēgu ir piešķirts baseinā.
- Trīs atslēgu kopā kāds, kurš zina, kāda atslēga tika izmantota, var pateikt, ko izmantoja pēdējā atslēga.
- Kad baseins nokrīt zem trim lietojamām atslēgām, stieņi pazūd. Iepriekš veiktie skati joprojām parāda, ko katrs dalībnieks izmantoja.
- Saskaitāmā logā kopsumma, no kuras atņemtas sadaļas, var parādīt vairs nepiešķirto atslēgu izmantošanu.
- Dalībnieks, kas vienā kontā parāda nulli un lieto citā kontā, var parādīt, kurš dalībnieks izmanto kuru kontu.
- Saskaitāmā pulkā ar `hard` politiku daļa, kas pārstāj augt pie biedra taisnīgās daļas, norāda uz šī dalībnieka svaru.

### Lietošanas sērija (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (tiek nodrošināts arī vietnē `/v1/me/usage`) atgriež paša izsaukšanas atslēgas pieprasījumu lietojumu un izmaksas: kopsummas, viens ieraksts UTC dienā, dienā un modelī, katram modelim un pakalpojumu sniedzējam. Tam ir kopīgs iepriekš minētā kvotas maršruta karodziņš, autentifikācijas noteikumi, `self:usage` darbības joma, `Cache-Control: no-store` un kļūdu darbība. Atslēga tiek pārbaudīta pirms `range`. Kļūdas ir 400 (`Invalid range`), 401, 403, 404 un 500 (`Failed to build usage`).

- `range` ir viens no `1d`, `7d`, `30d` (noklusējums) vai `90d`. Jebkura cita vērtība, tukša vērtība vai atkārtots parametrs ir 400. Kopa apstājas pie `90d`, lai ierobežotu zvana izmaksas. Skatā tiek nolasīta tikai neapstrādāta lietošanas vēsture, nevis ikdienas kopsavilkumi, kuriem nav atslēgas.
- Rindas tiek atlasītas pēc zvanīšanas atslēgas ID. Atslēgas nosaukuma kolonna nekad netiek saskaņota, un rindas, kas ierakstītas bez atslēgas ID, nekad netiek skaitītas.
- Veidojot sēriju, logā atslēgas rindās tiek izpildīti pieci grupēti vaicājumi. Izbūvētā sērija tiek atkārtoti izmantota 60 sekundes katram taustiņam un diapazonam, un atkārtoti izmantots zvans nedarbojas. Tā `generatedAt` norāda savu vecumu.
- Logs beidzas, kad sērija ir uzbūvēta. Rinda, kas apzīmogota vēlāk, piemēram, ar pulksteņa novirzi, netiek ieskaitīta.
- `coverage.retentionDays` ir operatora neapstrādāts lietošanas vēstures saglabāšanas iestatījums (`retention.usageHistory` datu bāzes iestatījumos). `coverage.truncatedByRetention` ir patiess, ja pieprasītais diapazons ir garāks par šo iestatījumu. Tas salīdzina divus skaitļus un nepārbauda, vai tiešām trūkst rindu.
- Pakalpojumu sniedzējs tiek atgriezts, kā reģistrēts paša atslēgas pieprasījumiem. Modelis ir ierakstītais nosaukums pēc pēdējā `/`, un rindas tiek grupētas pēc tā. Kombinētais pieprasījums, kura katrs mērķis tika noraidīts, tiek reģistrēts ar maršrutēšanas iezīmi kā nodrošinātāju (kombinācijas nosaukums, `auto` vai `combo`) un klienta nosūtīto modeļa virkni. Citos noraidītos pieprasījumos, piemēram, ja ir atvērts ķēdes pārtraucējs, modeļa dzesēšana vai kvotas izlaišana, tiek saglabāts mērķa nodrošinātājs un modelis.
- Papildus skaitļiem un izmaksām atbildē ir norādīts vidējais latentums, panākumu rādītāji un pirmā un pēdējā pieprasījuma laiks.
- `byModel` uzskaita 50 pakalpojumu sniedzēja un modeļa pārus, kuriem ir visvairāk pieprasījumu. Ja ir vairāk pāru, tā ieraksti netiek summēti līdz `summary`, un `summary.uniqueModels` uzskaita katru ierakstīto modeļa pareizrakstību. `byModelTruncated` tad ir patiess, un modelis, kura pāri atrodas abās griezuma pusēs, parāda daļējas kopsummas.
- Tiek ziņots par divām izmaksām. `costUsd` ir rēķinā norādītā maksa, kā to parāda lietošanas analīze. Vienotas likmes abonēšanas pakalpojumu sniedzēji, piemēram, Claude koda plāns, tur rēķina 0 USD. `listPriceUsd` ir tāda pati lietošanas cena par saraksta cenu, ieskaitot abonementus. Pieprasījumā, kura modelī nav cenu rindas, tiek uzskaitītas tā saglabātās izmaksas: pakalpojuma sniedzēja norādītās izmaksas vai izmaksas, kas aprēķinātas pieprasījuma ierakstīšanas laikā. Tikai pieprasījums ar ne vienu, ne otru tiek skaitīts 0, bez marķiera, tāpēc kopsumma var būt daļēja.
- Atbildes līgums ir `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Pašapkalpošanās lapa

Ja `QUOTA_SELF_PANEL` ir ieslēgts, `/quota/{provider}` ir publiska lapa. Atslēgas turētājs ieraksta API atslēgu un redz pakalpojumu sniedzēja šīs atslēgas kopas. Katrā pūlā tiek rādīta viena kartīte katrā baseina logā, un visi var izmantot kopu un pašu atslēgas daļu. Katram pūla kontam ir savas kartes ar konta lietojumu un atslēgas daļu. Konta lietojums tiek rādīts tikai tad, ja atslēga var redzēt konta datus. Lapā ir norādīti arī katra konta modeļa ierobežojumi un pašas atslēgas lietojums. Kad grafiks šobrīd bloķē atslēgu, tiek parādīts paziņojums. Kartītē ir norādīts katrs katra modeļa atslēgas vāciņš ar tā lietojumu un atzīmēti sasniegtie. `{provider}` ir nodrošinātāja ID vai tā aizstājvārds (`/quota/claude`, `/quota/cc`). Nezināms pakalpojumu sniedzējs un katrs `/quota/*` ceļš, kamēr karodziņš ir izslēgts, atbildiet uz 404. Pūliem pielāgotā ar OpenAI vai Anthropic saderīgā mezglā nav lapas. API joprojām atbild par viņiem.

Lapai nav sesijas. Atslēga tiek nosūtīta tikai `Authorization` galvenē `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` un `GET /api/v1/me/usage`, nekad URL. Atslēga, kuru serveris pieņem, tiek saglabāta cilnes `sessionStorage`. Izmantojot opciju “Atcerēties šajā ierīcē”, tā tiek saglabāta `localStorage` formātā, un funkcija “Aizmirst atslēgu” to noņem no abiem. Atslēga, kuru serveris noraida, tiek izņemta no krātuves.

Pūls `consent` režīmā parāda aizdevuma karti. Tur atslēgas turētājs nosaka veselu procentuālo daļu no 0 līdz 100 no atslēgas dīkstāves daļas, ko aizdot. Turētājs arī izvēlas, cik ilgi piekrišana ir spēkā: līdz izslēgšanai, 1 stunda, 8 stundas, 24 stundas, 7 dienas vai 30 dienas. Ilgums tiek skaitīts no saglabāšanas brīža. Kamēr termiņš ir spēkā, īpašnieks to var paturēt. Ja šis termiņš ir pagājis pirms Saglabāt, karte neko nesūta un pieprasa citu izvēli. Ar 0% termiņš netiek nosūtīts. Karte parāda saglabāto termiņu ar tās laika joslas nosaukumu. Piekrišana, kuras termiņš ir beidzies, tiek parādīta kā beigusies.

`hard` atslēgai kartē ir arī norādīts, kādas citas atslēgas šobrīd ir pieejamas atslēgai. Katra rinda ir viens cipars visiem pārējiem taustiņiem kopā. Divu atslēgu kopā tā ir otras atslēgas paša figūra. Skaitlis, par kuru skatā netiek ziņots, tiek uzskatīts par nepieejamu, nevis kā nulle. Uz `soft` vai `burst` atslēgām kartītē ir teikts, ka cipars neattiecas.

Pūls `saturation` režīmā, kura atslēga saglabā procentuālo daļu virs 0, parāda tikai izņemšanu. Tur teikts, ka saglabātajiem procentiem tur nav nekādas ietekmes. Tās izņemšanas poga nosūta 0 bez termiņa. Pūls `saturation` režīmā ar saglabātu 0 nerāda kredītkarti. Pēc saglabāšanas kartīte, kas atgrieztajam skatam vairs nav nepieciešama, paliek kopā ar ziņojumu, līdz lapas skats atkal mainās.

Nekas netiek saglabāts, kamēr turētājs nenospiež Saglabāt vai Izņemt. Katra nospiešana nosūta vienu `PATCH /api/v1/me/quota/{provider}` pieprasījumu, un otrā nospiešana nenosūta neko, kamēr pirmais tiek gaidīts. Ķermenis nes baseina necaurspīdīgo `ref` no skata, procentiem un termiņu. Atbilde ir pārbūvētais kvotas skats, un lapā tas tiek rādīts bez atkārtotas lasīšanas. Ja divas saglabāšanas pārklājas, lapa nolasa kvotu vienu reizi pēc pēdējās atbildes. Lapa nesaglabā piekrišanu pārlūkprogrammas krātuvē.

Atteiktās izmaiņas kartē ir izskaidrotas ar tekstu, kas izvēlēts no HTTP statusa. Kļūdas pamatteksts netiek nolasīts. 401 paziņo, ka atslēga netika pieņemta, un atkārtoti ielādē kvotu. 403 saka, ka pūls nepieņem izmaiņas kreditēšanā, un 404 saka, ka pūls ir pagājis. Abi piedāvā pogu, kas atkārtoti ielādē kvotu. 400 vai cita 4xx atbilde lūdz īpašniekam pārbaudīt procentus un termiņu. 429 lūdz īpašniekam pagaidīt ar `Retry-After` sekundēm, kad tiek sniegta atbilde. 5xx atbilde, 408 vai tīkla kļūme norāda, ka izmaiņas, iespējams, nav saglabātas, un saglabā ievadītās vērtības. Atbilde ārpus līguma pārlādē kvotu. Neveiksmīga saglabāšana nenoņem atslēgu pati par sevi. Pārlādējot pēc tam, kad tā tiek atteikta, lapa noņem atslēgu tāpat kā jebkurai atteiktai lasīšanai.

Kad atslēga ir pieņemta, lapā tiek parādīta arī kartīte “Iestatiet savus rīkus” ar trim cilnēm. "Claude kods" dod `env` bloku `~/.claude/settings.json`. "Shell" dod tādus pašus mainīgos lielumus kā `export` līnijas. "Claude Desktop" sniedz vērtības trešās puses secinājumu logam. Modeļi ir kvotu daļas modeļi, ko šim pakalpojumu sniedzējam var izmantot atslēga. Ja atslēgai nav pievienots šāds saraksts, bloks tā vietā ieslēdz vārtejas modeļa noteikšanu. Vārtejas adrese ir publiskā API izcelsme, par kuru serveri ziņo (`OMNIROUTE_PUBLIC_API_BASE_URL`, pēc tam `OMNIROUTE_PUBLIC_BASE_URL`). Ja neviens no tiem nav iestatīts, karte parāda vietturi un liek īpašniekam jautāt administratoram. Atslēga tiek parādīta kā vietturis. "Iekļaut manu atslēgu" visu atslēgu ievieto ekrānā redzamajā tekstā un tajā, ko kopēšanas poga kopē. Tas ilgst līdz brīdim, kad lodziņš tiek notīrīts, atslēga tiek aizmirsta vai nomainīta, vai lapa tiek atstāta. Karte nesūta pieprasījumu un nepiedāvā failu lejupielādi.

API atzīmes `stale` nolasījums tiek parādīts kā, iespējams, novecojis. Lasījums, kas apzīmē `unavailable` tiek parādīts ar iemeslu, nevis kā nulle.

Procentuālos plānos lapa ņem pašu atslēgas daļu, kad API par to ziņo. Tajā teikts, ka skaitlis ir aptuvens, un nosauktas divas tā daļas. Katra modeļa ierobežojumi parāda tikai kontu.

Ja logā ir `members`, tā kartītē ir redzama arī josla ar vienu segmentu katram dalībniekam slotu secībā. Jautāšanas taustiņa segmentā tiek izmantota akcenta krāsa. Pārējie segmenti cikliski maina tēmas diagrammas krāsas. Teksta leģendā ir norādīts katrs segments ar tā vērtību, tāpēc nekas nav atkarīgs no krāsas. Segmenti ir apzīmēti ar `You` vai `Member N`, kur N ir slots.

### Īpašs ports lapai

`QUOTA_PANEL_PORT` atver otru klausītāju, kas apkalpo tikai pašapkalpošanās lapu. Tas ir izslēgts, ja vien mainīgais nav iestatīts. `QUOTA_PANEL_HOST` ir saistīšanas adrese un pēc noklusējuma ir `127.0.0.1`.

Klausītājs pārraida šos ceļus uz galveno portu un atbild uz 404 par katru citu ceļu:

| Ceļš                                                                     | Kalpo                            |
| ------------------------------------------------------------------------ | -------------------------------- |
| `/quota/{provider}`                                                      | Lapa                             |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Lapā skan kvotas skats           |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Lapā lasāmās lietošanas sērijas  |
| `/_next/static/`                                                         | Būvējuma skripti, stili un fonti |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikonas                           |

`GET` un `HEAD` ir releji bez korpusa. Tiek pārraidīts arī viens pieprasījums ar pamattekstu: kvotas skata ceļa `PATCH`, ko lapa nosūta, lai saglabātu aizdošanas izvēli. Jebkura cita metode atbild uz 404, izņemot CONNECT pieprasījumu, kura savienojums tiek aizvērts bez atbildes. Jebkurš cits pieprasījums, kas deklarē ķermeni, atbild uz 404, un tā savienojums tiek slēgts. Jaunināšanas pieprasījumi tiek noraidīti, un to savienojums tiek slēgts. Ceļš ar punktu segmentu vai fragmenta marķieri tiek atteikts, tāpat kā API portā. Tāpat arī pieprasījuma mērķis ar rakstzīmi ārpus drukājamā ASCII. Uz neapstrādātu kontroles rakstzīmi mērķī HTTP parsētājs atbild ar 400 pirms šī porta pārbaudes. Pieprasījumu galvenes, kuras ietvars rezervē savām vajadzībām, netiek pārsūtītas: nosaukumi, kas sākas ar `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` vai `x-next-`, un nosaukumi `x-matched-path` un `next-resume`. Pieprasījums tiek pārraidīts bez tiem. Caur šo portu nevar sasniegt informācijas paneli, pieteikšanās lapu, pārvaldības API un secinājumus.

`PATCH` ir jāievada `Content-Type: application/json` bez parametriem vai tikai ar `charset=utf-8`. Tam ir jābūt vienam `Content-Length` no 1 līdz 4096, kas rakstīts kā vienkārši cipari, bez `Transfer-Encoding`. `PATCH`, kas pārkāpj kādu no šiem noteikumiem, atbild uz 404. Dažiem nepareizi veidotiem garumiem, piemēram, parakstītam vai atkārtotam, HTTP parsētājs pirms šī porta pārbaudes atbild ar 400. Ports nolasa deklarētos baitus, pirms tas sazinās ar galveno portu, un gaida tos ne ilgāk kā 5 sekundes. Ķermenis, kas līdz tam nav pabeigts, atbild uz 404, un tā savienojums tiek slēgts. Nekas nesasniedz galveno portu tādā gadījumā vai tad, kad klients aiziet pirmais. Ports pārsūta tieši deklarētos baitus ar to pašu `Content-Length`. Baiti pēc tiem tiek nolasīti kā nākamais savienojuma pieprasījums. Priekšpusē esošajam TLS apgrieztajam starpniekserveram ir jāpārsūta `Content-Length`, un tas nedrīkst atkārtoti sadalīt pieprasījuma pamattekstu. Galvenais ports pārbauda API taustiņu `Authorization` galvenē, tāpat kā `GET`.

404 korpuss ir `{"error":"not_found","message":"Not found."}`. Neveiksmīgs relejs atbild uz 502 (`api_bridge_unavailable`) vai 504 (`api_bridge_timeout`) bez `detail` lauka.

Klausītājs nelasa `QUOTA_SELF_PANEL` un neieslēdz lapu. Kamēr karodziņš ir izslēgts, lapa un tās API atbild uz 404 galvenajā portā, un klausītājs pārraida šo atbildi.

Zem izstrādes servera (`next dev`) lapa nekļūst interaktīva, izmantojot šo portu. Izstrādes karstās pārlādēšanas ligzda ir jaunināšanas pieprasījums, un ports to noraida. Izstrādes laikā izmantojiet galveno portu.

Ports apkalpo vienkāršu HTTP, un lapa sūta API atslēgas. Saglabājiet noklusējuma saistīšanas adresi un ievietojiet apgriezto starpniekserveri ar TLS tās priekšā. Saistīšanas adrese, kas nav atpakaļcilpas adrese, reģistrē šo paziņojumu:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Vienādranga cilpa, kas nesūta pārsūtīšanas galveni, tiek uzskatīta par lokālu galvenajā portā. Tātad starpniekserverim tajā pašā resursdatorā ir jānosūta `X-Forwarded-For`. Privātās adreses starpniekserveris šai galvenei tiek uzticēts tikai ar `OMNIROUTE_TRUST_PROXY=private` (vai `lan`). Par jebkuru citu vienādrangu tiek ziņots pēc tā savienojuma adreses, un tā nosūtītās pārsūtīšanas galvenes tiek atmestas.

Klausītājam vienlaikus ir ne vairāk kā 256 savienojumi. Klientam ir 10 sekundes, lai nosūtītu pieprasījuma galvenes un 30 sekundes, lai nosūtītu visu pieprasījumu. Dīkstāves uzturētais savienojums tiek aizvērts apmēram pēc 5 sekundēm. Savienojums bez darbības 60 sekundes tiek aizvērts. Šīs vērtības ir fiksētas. Iestatiet savienojuma un ātruma ierobežojumus arī reversajā starpniekserverī priekšā. Priekšpusē esošajam reversajam starpniekserveram ir jāpatur dīkstāvē esošie augšupējie savienojumi mazāk nekā 5 sekundes vai arī tie nav jāizmanto atkārtoti. Relejs uz galveno portu izmanto API porta (`API_BRIDGE_*`) augšupējo taimautu.

Klausītājs sāk darboties arī tad, kad `API_PORT` nav iestatīts. `QUOTA_PANEL_PORT` jābūt portam no 1 līdz 65535, kas rakstīts tikai ar cipariem. Tam ir jāatšķiras no informācijas paneļa porta un API porta. Kamēr tiešraides WebSocket serveris ir ieslēgts, tam ir arī jāatšķiras no `LIVE_WS_PORT` (noklusējuma 20132). Jebkura cita vērtība neko neatver un reģistrē brīdinājumu. Brīdinājums par atteiktu vērtību nosauc mainīgo un neatkārto vērtību. Ports, kas jau tiek izmantots, neko neatver un reģistrē šo brīdinājumu:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Ja ir iestatīts `OMNIROUTE_BASE_PATH`, klausītājs sagaida katru augstāk esošo ceļu zem šī prefiksa. Izmantojiet vienu un to pašu `OMNIROUTE_BASE_PATH` veidošanas laikā un izpildes laikā. Ierakstiet to ar slīpsvītru sākumā un bez beigu slīpsvītras, piemēram `/omniroute`. Cita forma, tostarp `/` un `/omniroute/`, atstāj portu ar brīdinājumu, lai gan būve pieņem šīs formas. Tāpat arī bāzes ceļš, kura pirmais segments nosauc lietojumprogrammas maršrutu: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` vai `connect`, jebkurā gadījumā.

Ierobežojumi:

- `/quota/{provider}/` ar beigu slīpsvītru atbild uz 404 šajā portā.
- Apkalpošanas darbinieks un tīmekļa lietotnes manifests netiek apkalpoti šajā portā.
- Informācijas panelī iestatītā pielāgotā favicon netiek rādīta šajā portā.
- Ikonas netiek rādītas, ja lietojumprogramma darbojas zem bāzes ceļa.
- Osta runā vienkāršā HTTP/1.1.
- Saistīšana, kas neizdodas, netiek mēģināta atkārtoti, līdz process tiek restartēts.
- Klausītājam nav savienojuma vai ātruma ierobežojuma katrai klienta adresei.
- Šī sadaļa neattiecas uz konteineru iestatījumiem.

---

## Vides mainīgie

| Mainīgs                              | Noklusējums     | Apraksts                                                                  |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`        | Izmantojamais draiveris: `sqlite` vai `redis`                             |
| `QUOTA_STORE_REDIS_URL`              | _(tukšs)_       | Redis URL, piemēram, `redis://localhost:6379`                             |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`           | 0..1; `>= threshold` aktivizē stingro režīmu                              |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`          | Tokeni, kas izskaidro ne vairāk kā vienu procentu plāna loga punktu       |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`           | 0..1; reizinātājs mīkstās politikas kombinētajam rezultātam               |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`            | Dienas pirms GC noņem vecos `quota_consumption` spaiņus                   |
| `QUOTA_PANEL_PORT`                   | _(atiestatīts)_ | Īpašs ports pašapkalpošanās lapai. Atiestatīts nozīmē, ka nav klausītāja. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`     | Saistīšanas adrese šim portam                                             |

DB iestatījumi (`quotaStore.*`) ignorēt env vars.

---

## Problēmu novēršana

### Redis ir konfigurēts, bet neveido savienojumu

Pārbaudiet, vai `ioredis` ir instalēts (`npm ls ioredis`) un vai
`QUOTA_STORE_REDIS_URL` ir sasniedzams. Ja savienojuma izveide neizdodas, fabrika
pārslēdzas uz SQLite (tas tiek reģistrēts `warn` līmenī).

### `peek` atgriež novecojušus datus / pieļauj darbību kļūmes gadījumā

Ja `peek` izmet izņēmumu, `enforceQuotaShare` rezultātu interpretē kā „atļaut”
(pieļauj darbību kļūmes gadījumā). Pārbaudiet `pino` žurnāla `quota:enforce` un
`quota:factory` ierakstus, lai noteiktu pamatcēloni.

### Patēriņa skaitītāja novirze

Ja pakalpojumu sniedzēja faktiskais lietojums atšķiras no skaitītāju datiem, tas ir
sagaidāms — 2 segmentu slīdošajam logam ir aptuveni 1% kļūda pie loga robežām, un
`consume` tiek izpildīts pēc atbildes nosūtīšanas, negaidot rezultātu. Piesātinājuma
signāls (`saturationSignals.ts`) nolasa pakalpojumu sniedzēja faktisko izmantojumu
ar 30 s TTL un attiecīgi pielāgo `globalUsedPercent`.

### Pūlam patēriņa ātrumam tiek rādīts „nav datu”

`computeBurnRate` nepieciešami vismaz 2 vēsturiskie paraugi. Jauniem pūliem bez
iepriekšējiem `consume` izsaukumiem tiks rādīts `tokensPerSecond: 0` un
`timeToExhaustionMs: null`.

---

## Migrācija no localStorage

Kad `/dashboard/costs/quota-share` tiek ielādēts pirmoreiz, āķis `useLocalStoragePoolMigration`
pārbauda:

1. `localStorage.getItem("omniroute:quota-share:pools")` nav tukšs.
2. `GET /api/quota/pools` atgriež `[]` (DB ir tukša).

Ja abi nosacījumi ir izpildīti, katrs mantotais pūls tiek paketē nosūtīts uz `POST /api/quota/pools`,
pēc tam localStorage atslēga tiek noņemta. Migrācija ir idempotenta: 2. nosacījums novērš
atkārtotu migrāciju.

---

## Iekšējās stratēģijas klasifikācija

`quota-share` ir **tikai iekšējai lietošanai** paredzēta maršrutēšanas stratēģija (`INTERNAL_ROUTING_STRATEGY_VALUES`
failā `src/shared/constants/routingStrategies.ts`). To izmanto tikai sistēmas izveidotās
`qtSd/` pūlu kombinācijas, un tā ir apzināti izslēgta no `ROUTING_STRATEGY_VALUES`, lai tā nekad
netiktu parādīta kā lietotāja izvēles opcija UI vai API.

---

## Testa pārklājums

Divi automatizēta pārklājuma slāņi tiek piegādāti ar kvotu sadales dzinēju:

| Suite                | Komanda                                                                | Ko tas aptver                                                                                                                                                                                                                              |
| :------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vienība (29 testi)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR plānotājs, piesātinājuma noteikšana, vienlaicīguma ierobežojumi, fairShare matemātika, neizpildītās rindas                                                                                                                             |
| Integrācijas matrica | `npm run test:combo:matrix`                                            | Maršrutēšanas lēmums no gala līdz galam, izmantojot reālo kombinēto konveijeru; DRR godīgums + piesātinājuma prioritāšu noteikšana , izmantojot dzīvās šuves (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrācijas matrica darbojas CI kopā ar visām 22 publiskajām stratēģijām. Vienības komplektu var palaist atsevišķi.

---

## DB shēmas kopsavilkums

Trīs tabulas, kas pievienotas migrācijas rezultātā `078`, `079` un `085`:

- `quota_pools` + `quota_allocations` — pūla definīcijas un katras atslēgas piešķīrumi.
- `quota_consumption` — ritošā 2 kausu skaitītāji uz `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuālā nodrošinātāja plāna ignorēšana (izmēri JSON uz connectionId).

Visas tabulas ir pievienotas, izmantojot idempotentu `CREATE TABLE IF NOT EXISTS` migrāciju.

Piekrišanas aizdevumam tiek pievienotas trīs kolonnas: `quota_allocations.lending_percent` (vesels skaitlis, noklusējuma 0), `quota_allocations.lending_until` (epoha milisekundes vai `NULL` bez termiņa) un `quota_pools.borrow_mode` (noklusējuma `saturation`). Tās migrācija tikai pievieno šīs kolonnas un neieraksta nevienu esošu rindu.

Procentuālā attiecinājuma grāmata pievieno `quota_percent_ledger` (viena rinda katram pūlam, konta un plāna logam) un `quota_percent_ledger_tokens` (viens pilnvaru skaitītājs katram pūlam, kontam un API atslēgai). `src/lib/db/quotaPercentLedger.ts` tos lasa un raksta.
