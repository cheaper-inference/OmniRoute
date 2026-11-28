# Quota Sharing Engine (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumento nuoroda**: `docs/routing/QUOTA_SHARE.md`
> B grupės dalis (planai 16 + 22).

---

## Apžvalga

Kvotų bendrinimo variklis teisingai paskirsto paslaugų teikėjo laiku pagrįstą kvotą (pvz., Codex
5 valandų langą, Kimi 1500 užklausų/val.) keliems API raktams, naudojantiems tą patį
ryšį.

**Sprendžiama problema:** „OmniRoute“ per tą pačią išorinę paslaugų teikėjo paskyrą
tarpininkauja daugelio API raktų užklausoms. Be bendrinimo logikos staigus A rakto užklausų
srautas gali išnaudoti paslaugų teikėjo valandos kvotą, todėl B ir C raktai liktų užblokuoti,
kol langas būtų nustatytas iš naujo. Variklis to išvengia:

1. Stebėdamas kiekvieno rakto slenkantį suvartojimą pagal kiekvieną matmenį (%, užklausas, žetonus, $).
2. Taikydamas darbą išsaugantį teisingo paskirstymo algoritmą: raktas gali skolintis iš nenaudojamų
   dalių, kol bendrasis fondas nėra prisotintas.
3. Užtikrindamas rezultato vykdymą kritiniame kelyje (`chatCore.ts`) prieš užklausai
   pasiekiant išorinį vykdytoją.

---

## Algoritmas: sąžiningas darbo pasidalijimas ir taupymas

Įdiegta `src/lib/quota/fairShare.ts`.

### Režimai

| Būklė                                      | Režimas      | Elgesys                                                               |
| ------------------------------------------ | ------------ | --------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Dosnus**   | Raktas gali pasiskolinti iki visuotinio limito, atėmus sunaudotą sumą |
| `globalUsedPercent >= saturationThreshold` | **Griežtas** | Griežtai vykdykite individualią sąžiningą dalį                        |

Numatytoji `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Šie du režimai apibūdina fondą numatytuoju skolinimosi režimu `saturation`. Baseinas `consent` režimu visada taiko griežtas taisykles, kad ir koks būtų prisotinimas. Žr. [Sutiktas skolinimas (pasirinkimas kiekvienam fondui)](#consented-lending-per-pool-opt-in).

### Sprendimas dėl dimensijos

Kiekvienam aktyviam baseino matmeniui variklis apskaičiuoja:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

`percent` dimensijos `consumed` gaunamas iš priskyrimo knygos (žr. [Procentiniai aspektai: priskyrimas pagal raktą](#percent-dimensions-per-key-attribution) ).

Tada:

- **`policy = hard`** : jei `consumed > fairShareAllowed` ir režimas yra griežtas →** blokas** .
- **`policy = soft`** : jei `consumed > fairShareAllowed` ir režimas yra griežtas →** nubausti** (suteikite pirmenybę derinyje; niekada neblokuokite).
- **`policy = burst`** : leisti, kol egzistuoja pasaulinė erdvė, nepaisant teisingos dalies.

### Cap absoluto

`capValue` + `capUnit` paskirstymui yra griežta riba, nepriklausoma nuo režimo ar politikos. Bet koks matmuo, kur `consumed >= capValue` visada** blokai** prašymą. `percent` dangtelyje `consumed` yra tik raktui priskirta dalis.

### Daugiamatis patikrinimas

Užklausa blokuojama, jei** bet koks** matmuo baseine jį užblokuotų. Matmenys nepriklausomi — a 5h% išsekimas neturi įtakos savaitiniam% matmeniui.

### Skolinimasis

Esant dosniam režimui, raktas, kurio paskirstymas yra nepakankamai išnaudotas, gali panaudoti kitų raktų nepaskirstytų dalių perteklių. Formulė yra tokia:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kur `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (to dimensijos baseinas `limit` ) visada yra kietos lubos.

### Sutiktas skolinimas (pasirinkimas kiekvienam fondui)

Kiekvienas baseinas turi skolinimosi režimą. `saturation` yra numatytasis ir išlaiko aukščiau pateiktas taisykles. `consent` režimu `hard` raktas perduoda savo dalį tik tiek, kiek kiti raktai sutiko paskolinti. Administratorius nustato kiekvieno telkinio režimą. Kiekvienas rakto turėtojas nustato savo sutikimą per [skolinimo sutikimą](#lending-consent).

Sutikimas yra procentas nuo 0 iki 100 ir pasirenkamas terminas milisekundėmis. Raktas skolina tą nenaudojamos dalies procentą, kol terminas yra ateityje.

Vienai dimensijai `L` yra efektyvi riba: plano limitas padauginamas iš sąskaitų telkinyje. Vartai apskaičiuoja užklausantį raktą:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` yra rakto svoris arba `100 / n` kiekvienam raktui, kai joks svoris neviršija 0. `lend_k` yra rakto aktyvumo procentas ir 0, kai pasibaigia jo terminas. Prašančiojo rakto sutikimas niekada neskaičiuojamas. `hard` raktas atsisakomas, kai jo suvartojimas pasiekia dalį plius `borrowAvailable`.

Pajėgumai, kuriems nereikalaujama paskirstyti (100 atėmus svorių sumą), nėra skolinami. Joks raktas nesutiko paskolinti.

**Pavyzdys.** `L` yra 1000.

| Raktas | Svoris | Dalintis | Suvartotas | Skolina |
| ------ | ------ | -------- | ---------- | ------- |
| A      | 50     | 500      | 530        | 0%      |
| B      | 30     | 300      | 100        | 50%     |
| C      | 0      | 0        | 60         | 0%      |

- B paskolina 50% savo tuščiosios eigos 200, tai yra 100. C jau paėmė 60 daugiau nei jo dalis. A gali pasiskolinti 40.
- A patiekiamas už 530 ir atsisakoma, kai jo suvartojimas pasiekia 540.
- Prieš tai, kai C naudojo ką nors, kai A buvo lygi arba mažesnė, C galėjo pasiskolinti 100.
- Kol C nieko nenaudojo, kai A buvo 530, C galėjo pasiskolinti 70.

**Nulinis svoris.** Raktas, kurio svoris yra 0, turi 0 dalį. Jis patiekiamas tik tada, kai jo suvartojimas yra mažesnis nei kiti skolina. Kai niekas neskolina, atsisakoma nuo pirmo prašymo.

**Terminai.** Jokia foninė užduotis nesibaigia sutikimo galiojimo metu. Kiekvienoje užklausoje terminas lyginamas su savo laiku ir praėjo tam laikui lygus terminas. Išsaugotas terminas, kuris nėra baigtinis skaičius arba yra pasibaigęs didžiausios `Date` datos, skaičiuojamas kaip praleistas.

**`soft` ir `burst`.** Skolinimas jų neriboja. `soft` raktui pirmenybė netenkama, kai jis pasibaigia. `burst` raktas perduodamas, kol baseine yra vietos. Baseino lubos vis tiek atsisako kiekvieno rakto, kai baseino bendra suma pasiekia ribą.

**Užklausos kelio kaina.** `saturation` baseinas nerodo nieko daugiau nei anksčiau. `consent` telkinyje skaičiuojamasis aspektas nuskaito kitus raktus tik `hard` raktui, kurio dalis yra arba didesnė, o kitas raktas skolina. Tada lygiagrečiai nuskaito vieną kitą klavišą. Nesėkmingas skaitymas skaičiuojamas kaip 0 šio rakto suvartojimas. `percent` matmuo neprideda skaitymo, nes priskyrimo knygoje yra kiekvienas raktas.

**Baseino redagavimas.** Redaguojant išlaikomas likusių raktų sutikimas. Tai taikoma paskirstymo redagavimui, visos grupės pakeitimams ir `ensure` skambučiams. Pašalintas raktas praranda sutikimą, o pridėtas raktas prasideda nuo 0. Administratoriaus maršrutai grąžina kiekvieno rakto sutikimą ir niekada jo nerašo. Grąžinus telkinį į `saturation`, kiekvienas išsaugotas sutikimas išsaugomas, o tai neturi jokios įtakos tuo režimu. Vėl perjungus baseiną į `consent` vėl suaktyvinami išsaugoti sutikimai, kurių terminas nepraėjo. Rakto turėtojas gali išvalyti išsaugotą sutikimą bet kuriuo režimu.

**Atnaujinimas.** Jei stulpeliai `lending_percent` ir `lending_until` jau yra, perkėlimas prideda tik `borrow_mode`, o išsaugoti procentai lieka tokie, kokie yra. Kiekvienas baseinas paleidžiamas `saturation` režimu. Įjunkite `consent` kiekvienam baseinui baseino vedlyje. Iš saugomų verčių nieko nenurodoma.

**Apribojimai.**

- Prieš panaudodamas savo dalį, skolintojas gali rasti fondą ties lubomis. Kitų pasiskolinta talpa įskaičiuojama į bendrą baseino sumą.
- Patikrinimas vykdomas prieš pateikiant užklausą ir nieko nerezervuoja. Lygiagrečios užklausos nuskaito suvartojimą prieš juos įrašant, todėl paskolintas pajėgumas gali būti išleistas daugiau nei vieną kartą, atsižvelgiant į užklausas skrydžio metu. `saturation` režimo dalies patikrinimas turi tą pačią savybę.

---

## Slenkančio lango skaitiklis

Įgyvendintas failuose `src/lib/quota/sqliteQuotaStore.ts` ir `redisQuotaStore.ts`.

Du segmentai kiekvienai `(apiKeyId, dimensionKey)` porai:

- `curr`: dabartinis segmentas (`floor(nowMs / windowMs)`)
- `prev`: ankstesnis segmentas (`curr - 1`)

Efektyvioji slenkanti reikšmė:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Tikslumas**: ~99 %. Paklaida yra ne didesnė nei 1 % lango dydžio ties
segmentų riba (tai būdinga 2 segmentų aproksimacijai).

### Lygiagretumas

SQLite tvarkyklė: atmintyje laikomas blokavimo mechanizmas kiekvienam `(apiKeyId | dimensionKey)` raktui apsaugo nuo
skaitymo–keitimo–rašymo lenktyniavimo. Šablonas atitinka `src/sse/services/auth.ts` apsaugą nuo vienalaikių perteklinių užklausų.

Redis tvarkyklė: atomiškam didinimui naudojamas Lua EVAL scenarijus — jis vykdomas kaip viena Redis komanda.

---

## Tvarkyklės

### SQLite (numatytoji, nereikia diegti)

- Lentelė: `quota_consumption` (žr. migracijas `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Geriausiai tinka diegimams su vienu egzemplioriumi.
- Visi duomenys išsaugomi esamoje OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (pasirenkama, keliems egzemplioriams)

- Reikalingas `ioredis` npm paketas.
- Skaitikliai saugomi Redis; metaduomenys (telkiniai / paskirstymai) vis tiek saugomi SQLite.
- Geriausiai tinka diegimams su keliomis replikomis, kai skaitikliai turi būti bendrinami.

### Tvarkyklių perjungimas

Per nustatymų naudotojo sąsają (`/dashboard/settings` → Kvotų saugykla) arba per aplinkos kintamuosius:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB nustatymas turi pirmenybę prieš aplinkos kintamąjį. Jei `driver=redis`, bet URL nėra arba
`ioredis` neįdiegtas, gamykla grįžta prie SQLite ir užregistruoja įspėjimą.

Tvarkyklės pasirinkimo tvarka:

1. DB nustatymas `quotaStore.driver`
2. Aplinkos kintamasis `QUOTA_STORE_DRIVER`
3. Numatytoji reikšmė: `sqlite`

---

## Daugiamatis

Baseinas gali būti kelių matmenų. Kiekvienas matmuo yra nepriklausomas:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Pavyzdys: Codex planas** (5h% + per savaitę%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Kad prašymas būtų leistinas, jis turi atitikti visus matmenis.

### Procentiniai aspektai: priskyrimas pagal raktą

Procentų plane nurodomas vienas naudojimo skaičius vienoje paskyroje ir plano lange. Teikėjas nenurodo skaitiklio už API raktą.

Norėdami padalyti tą skaičių tarp raktų, kiekvienas telkinys turi priskyrimo knygą kiekvienai paskyrai ir plano langui. `src/lib/quota/percentLedger.ts` laikosi knygos taisyklių. `src/lib/quota/percentAttribution.ts` paverčia knygą skaičiais, kuriuos naudoja vykdymo užtikrinimas. Rezultatas yra įvertinimas, sudarytas iš kiekvieno pagrindinio maršruto žetonų.

#### Skaitiniai, kurie judina knygą

Knyga juda tik pagal paties teikėjo norimą plano langą. Šios jungtys praneša apie vieną:

| Teikėjas                 | Suplanuokite langus |
| ------------------------ | ------------------- |
| Claude, per OAuth jungtį | `5h`, `weekly`      |
| Codex                    | `5h`, `weekly`      |

Tai nelaikoma skaitymu:

- atsakymas, kurį teikėjo klientas pažymi kaip pasenusį
- Claude langas, kurio procento teikėjas nepranešė
- kito lango figūra arba blogiausias atvejis per langus
- greičio ribos antraštės atsarginė dalis
- nesėkmingas skaitymas

Kiti tiekėjai, įskaitant Claude su API raktu, knygos neturi. Kiekvienas raktas apmokestinamas 0 procentais, kaip ir prieš šį pakeitimą.

Skaitymas dalijasi 30 sekundžių prisotinimo signalo talpykla. Claude rodmuo datuojamas tuo, kada figūra buvo pastebėta atsakymų antraštėse, arba nuskaityta iš naudojimo pabaigos taško, kai šis laikas žinomas. Kiti rodmenys yra datuojami, kai buvo sukurtas šis talpyklos įrašas.

#### Ką saugo knyga

Kiekviena įrašyta užklausa vieną kartą prideda savo žetonus prie kiekvieno telkinio, paskyros ir rakto skaitiklio. Skaitiklis tik auga. Knygoje saugomi trys dalykai:

- pradinė linija: skaičius, kai atsivertė knyga arba paskutinį kartą atsivertė langas
- paskutinė pritaikyta figūra
- už raktą, jo žetonų skaitiklis tuo pačiu momentu, vadinamas jo ženklu

Knyga atnaujinama, kai priskyrimas apskaičiuojamas vykdant vykdymą arba naudojant naudojimo maršrutą. Rašai lyginami ir nustatomi pagal taisymo numerį. Rašytojas, kuris netenka pakartotinio skaitymo.

#### Kaip apskaičiuojama rakto dalis

Kiekvieno klavišo dalis apskaičiuojama, kai knyga skaitoma. Figūros augimas nuo pradinės linijos padalijamas tarp raktų proporcingai žetonams, kurie buvo nukreipti nuo žymėjimo.

Together, tie žetonai paaiškina daugiausiai vieną `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` žetonų skaičiaus tašką (numatytasis 1000). Augimas, kurio jie nepaaiškina, yra išorinis. Bazinė linija taip pat yra išorinė.

Pavyzdžiui, knyga atidaroma 0. Raktas A nukreipia 900 000 žetonų, o raktas B – 100 000. Kai skaičius yra 60, A dalis yra 54 taškai, o B dalis yra 6.

Skaitiklis, esantis žemiau rakto žymos, buvo paleistas iš naujo ir skaičiuojamas visiškai. Raktas be ženklo, pvz., raktas, kuris prisijungia prie baseino lango viduryje, skaičiuoja visus jo žetonus. Skaičius, kuris atsilieka nuo žetonų, sukelia klaidą, kuri išnyksta kitą kartą. Jis nesikaupia.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` skaitomas ant kiekvieno priskyrimo. Vertė, kuri nėra baigtinis skaičius, bent 1, grįžta į 1000.

#### Kaip skaitymas pakeičia knygą

Taikoma pirmoji atitikimo taisyklė:

1. **Dar nėra knygos:** skaitymas atveria knygą. Jo skaičius yra bazinė linija ir kiekvienas skaitiklis yra pažymėtas.
2. **Senesnis skaitymas:** skaitinys, datuojamas prieš paskutinį kartą pritaikytą, ignoruojamas. Taip pat ir rodmenys, kurių atstatymo laikas yra daugiau nei 30 minučių anksčiau nei išsaugotas.
3. **Naujas teikėjo langas:** atstatymo laikas daugiau nei 30 minučių vėliau, nei išsaugotas atverčia knygą. Skaičius tampa bazine linija ir kiekvienas skaitiklis vėl pažymimas. Raktai be skaitiklio palieka knygą.
4. **Baigtas langas:** išsaugotas atstatymo laikas, kuris nėra pasibaigęs skaitymo duomenų laiku, reiškia, kad langas baigėsi. Skaitymas paverčia knygą, kad ir kokia ji būtų.
5. **Aukštesnė figūra:** juda tik paskutinė figūra. Bazinė linija ir ženklai išlieka.
6. **Ta pati figūra:** figūra, bazinė linija ir ženklai išlieka. Parašytas tik laikas, kurio knygai trūksta.
7. **Apatinė figūra:** mažesnis skaičius niekada netaikomas kaip toks. Knygą apverčia tik tada, kai laikosi trys dalykai. Jis yra bent dviem minutėmis naujesnis nei paskutinis pritaikytas rodmuo. Niekas nesako, kad langas yra toks pat atviras. Jis yra daugiau nei vienu tašku mažesnis.

Langas laikomas tuo pačiu atidarytu, kai laikosi trys dalykai. Abu atstatymo laikai žinomi. Jie yra 30 minučių atstumu vienas nuo kito. Išsaugotas dar prieš skaitymą. Mažesnė figūra tame lange nieko nekeičia.

Iš naujo nustatytas laikas išsaugomas tik tada, kai jis yra prieš nuskaitymo duomenų laiką, kuris jį atlieka. Didesnis skaičius išsaugo savo rodmenų nustatymo iš naujo laiką, kai tą galima naudoti, ir išsaugo išsaugotą kitu atveju. Vienodas skaičius įrašo skaitymo atstatymo laiką tik tada, kai knygoje jo nėra. Tai nieko kito nekeičia. Mažesnis skaičius, kuris neapverčia knygos įrašų, nenustato iš naujo laiko.

#### Kai knyga naudojama

Po skaitymo knyga naudojama, nebent jos išsaugotas nustatymo iš naujo laikas nėra po dabartinio laiko. Toks atvejis atsiranda, kai prieš pat atstatymą atliktas rodmuo, pvz., pateiktas iš talpyklos, stebimas iškart po jo.

Be tinkamo skaitymo, saugoma knyga naudojama tik tol, kol ji vis dar gali būti dabartinio lango knyga. Tai galioja dviem atvejais:

- jo nustatymo iš naujo laikas žinomas ir dar laukia
- jis neturi nustatymo iš naujo laiko, o paskutinis rodmuo, kuris jį pakeitė, yra daugiausia 15 minučių senumo

Kitaip nieko nepriskiriama, kaip kai knygos nėra. Knyga, kurios išsaugotas nustatymo iš naujo laikas praėjo, niekada neapmokestinama.

#### Vykdymas

Rakto suvartojimas procentais yra jam priskirta dalis ir išorinės dalies dalis. Išorinė dalis pirmiausia naudoja pajėgumų nepaskirstymo pretenzijas (100 atėmus svorių sumą). Tik perteklius paskirstomas tarp raktų pagal svorį.

Tas suvartojimas lyginamas su teisinga rakto dalimi, kaip ir bet kuri kita dimensija. Griežtas režimas vis tiek įsijungia, kai prisotinimo signalas pasiekia `QUOTA_SATURATION_THRESHOLD` (numatytasis 0,5). Kiekvienas skaičius padidinamas pagal galiojančią ribą: vienos paskyros limitas padauginamas iš sąskaitų skaičiaus telkinyje.

Absoliutus dangtelis su `capUnit: "percent"` skaičiuoja tik raktui priskirtą dalį, kurios dydis yra toks pat. Nustatykite 100 paskyrų limitą ir k paskyrų. Tada pasiekiama N viršutinė riba, kai aptarnaujamos sąskaitos skaičiaus rakto dalis pasiekia N/k taškus. Kiekviena sąskaita tikrinama pagal savo knygą. Pavyzdžiui, naudojant dvi paskyras, 10 viršutinė riba pasiekiama 5 vienos paskyros skaičiaus taškuose.

Kai parduotuvės negalima nuskaityti, niekas nepriskiriama ir kiekvienas raktas apmokestinamas 0 toje dimensijoje. Kai nepavyksta parašyti knygos, priskyrimui naudojama knyga tokia, kokia ji buvo perskaityta. Nepavykus įrašyti prieigos raktą, tos užklausos prieigos raktai išbraukiami iš knygos. Nė viena iš šių klaidų neužblokuoja užklausos.

`consent` fonde skolinimo formulė naudoja kiekvieno rakto suvartojimą procentais, kaip aprašyta aukščiau. Kai skolinamas kitas raktas, knyga perskaitoma vieną kartą ir priskiriama kiekvienam raktui. Be tinkamos naudoti knygos kiekvienas raktas apmokestinamas 0. Raktas su svarmeniu tada perduodamas, o raktas su svoriu 0 perduodamas tik tada, kai paskolina kitas raktas.

#### Naudojimo maršrutas

`GET /api/quota/pools/{id}/usage` praneša tuos pačius skaičius per tą pačią funkciją. Procento matmuo turi vieną įrašą kiekvienam baseino ryšiui `accounts`. Jo aukščiausio lygio `consumedTotal` ir `perKey` atspindi pirmąjį įrašą.

Maršrutas taip pat taiko dabartinį skaitymą, todėl jis gali patobulinti knygą, kaip tai daroma. `internal + external` gali skirtis nuo `consumedTotal`, kai nėra tinkamo rodmens arba kai netaikomas mažesnis skaičius.

#### Sandėliavimas ir laikymas

Abi kvotos parduotuvės saugo knygą. SQLite automatinis duomenų bazės išvalymas, kai įjungtas, pašalina eilutes, kurios nebuvo atnaujintos 60 dienų. Redis baseino ryšio knygos ir skaitikliai turi vieną raktą. Jis nustoja galioti praėjus 60 dienų po paskutinio prieigos rakto įrašymo ar knygos pakeitimo. Knyga, kuri nesikeičia, nėra perrašoma, todėl riba nustatoma virš ilgiausio plano lango. Rankinis naudojimo istorijos nustatymas iš naujo taip pat išvalo SQLite knygas (žr. Apribojimai).

#### Apribojimai

- Visas sąskaitos skaičiaus padidėjimas nuo pradinės linijos yra padalintas pagal kiekvieno rakto, nukreipto nuo tada, žetonus. Kada tas augimas įvyko, nesvarbu.
- Taigi už naudojimąsi už OmniRoute ribų apmokestinami raktai tiek, kiek leidžia jų žetonai. Tai apima naudojimą prieš pirmą rakto užklausą langui, kai knyga jau buvo atidaryta.
- Pavyzdžiui, naudojimas lauke padidina sąskaitą 60 taškų, o nėra pagrindinių maršrutų. Tada raktas nukreipia 30 000 žetonų ir skaičius pasiekia 60,6.
- Jei knyga buvo atidaryta prieš naudojimą, rakto dalis yra 30 taškų. Jis taip pat neša 7,65 išorinio naudojimo, su keturiais raktais, kurių svoris yra 25.
- Jei knyga atidaryta po naudojimo, 60 taškų yra pradinis lygis. Rakto dalis yra 0,6 taško, o išorinis naudojimas yra 15.
- Užklausa arba apsilankymas naudojimo maršrute atveria knygą. Taigi, ar toks naudojimas laikomas pradiniu, priklauso nuo to, kada knyga buvo atidaryta.
- Naudojant numatytąją žemę, raktas, nukreipiantis 60 000 žetonų, kai naudojamas išorėje, padidina sąskaitą 60 taškų, gauna visus 60 kaip atskirą dalį.
- Kai grindys yra 50 000, jos dalis yra 1,2 balo. Kiti 58.8 yra išoriniai ir įkraunami pagal svorį, kaip ir bet koks išorinis naudojimas.
- Nustatykite `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` arti to, kiek kainuoja vienas taškas jūsų plane. Išorinis naudojimas apima srautą toje pačioje paskyroje iš raktų už baseino ribų.
- Kiekviename režime taikoma procentinė riba. Apribotas raktas gali būti atmestas, kai paskyra yra daug žemiau prisotinimo slenksčio.
- Anksčiau lange paimkite 10 ir 12 lauko naudojimo taškų dangtelį. Tada raktas, nukreipiantis 20 000 žetonų, atmetamas, kai sąskaitos skaičius yra 12,4%.
- Padalijimas yra įvertinimas pagal žetonų tūrį. Užklausa skaičiuojama kaip jos raginimo žetonai ir jos užbaigimo žetonai. Talpyklos nuolaidos ir modelių kainos šio skaičiaus nekeičia.
- Užklausoje, kuri nesibaigia būsena 200, žetonų nėra. Pavyzdžiai yra srautas, kurį klientas atjungia, ir klaida prieš srovę po naudojimo.
- Už naudojimąsi tokia užklausa apmokestinami raktai, kurie įrašė žetonus, tiek, kiek leidžia jų prieigos raktai. Likusi dalis yra išorinė. Tai nejuda atgal. Atsakymas, kuriame pranešama, kad žetonų nenaudojama, taip pat neįrašo žetonų.
- Vykdomos užklausos naudojimas gali būti rodomas kitos aktyvios visos užklausos rakto dalyje. Jis grįžta atgal tik tada, kai užklausa baigiasi 200 būsena.
- Naudojimas jau paskyroje atidarant knygą laikomas išoriniu. Tai apima atnaujinimą, naują fondą ir naują paskyrą. Naudojimas naujame lange prieš pirmąjį jo skaitymą taip pat skaičiuojamas kaip išorinis.
- Kiekvienas raktas prasideda nuo jo naudojimo svorio dalies, o po talpos nepaskirstymo pretenzijų nėra. Kai viena paskyra yra 85% ir penki raktai, kurių svoris yra 20, kiekvienas prasideda nuo 17 iš 20 naudojamų.
- Kelių paskyrų telkinyje aptarnaujamos sąskaitos skaičius taikomas suminiam biudžetui. Tai nepakeista knygoje.
- Mažesnis skaičius lange, kurį teikėjas praneša kaip atidarytą, netaikomas. Iš naujo nustatytas laikas, kuris pasislenka daugiau nei 30 minučių, laikomas senu rodmu.
- Abiem atvejais knyga išlaiko savo būseną, kol praeis išsaugotas nustatymo iš naujo laikas. Po to knyga neapmokestinama tol, kol jos nepasuka.
- Ištaisymas yra rankinis naudojimo istorijos nustatymas iš naujo (`POST /api/settings/purge-usage-history`). Jis išvalo priskyrimo knygas ir jų žetonų skaitiklius SQLite duomenų bazėje.
- `all` laikotarpis išvalo kiekvieną knygą ir skaitiklį. Trumpesnis laikotarpis pirmiausia išvalo jame neparašytas knygas. Tada jis išvalo skaitiklius, kurie nėra įrašyti jame, o tik baseino ryšiui, kuriame nėra knygos. Saugoma knyga vis dar pažymi kiekvieną raktą prie jo skaitiklio.
- Knyga, kurios figūra nepajudėjo, nėra perrašoma, todėl trumpesnis laikotarpis taip pat gali išvalyti esamo lango knygą. Kitas skaitymas atveria naują dabartinio skaičiaus knygą.
- Atstatymas neliečia Redis kvotos parduotuvės. Ten knyga baigiasi jos langu arba baigiasi 60 dienų po paskutinio parašymo.
- Kai teikėjas nesiunčia nustatymo iš naujo laiko, langas, kuris iš naujo nustatomas ir užpildomas virš senojo skaičiaus tarp dviejų rodmenų, atrodo kaip didesnis skaičius. Knyga išlaiko seną bazę ir ženklus.
- Skaitymai datuojami pagal vietinį laikrodį. Kai ji paleidžiama anksčiau nei teikėjas arba šaltinis praneša apie nustatymo iš naujo laiką šiek tiek anksčiau, knyga gali pasirodyti anksti.
- To trumpo intervalo augimą skaido jame nukreipiami žetonai. Kito lango pirmasis skaitymas jį ištaiso. Kai atverčiama knyga neturi iš naujo nustatyti laiko, tai pataisymui reikia bent dviem minutėmis naujesnio skaičiaus, palyginti su paskutiniu skaitytu.
- Atvejai, kurie bendrina Redis parduotuvės datos rodmenis su savo laikrodžiais, todėl tuos laikrodžius sinchronizuokite. Atvejo rodmenys, kurių laikrodis vėluoja, atrodo senesni ir yra ignoruojami.
- Kai po išsaugoto iš naujo nustatymo laiko negaunama tinkamų rodmenų, procentų dalis už raktą ir procentų ribos neįgyvendinamos, kol rodmenys negrįžta. Nenustačius laiko iš naujo, tai prasideda praėjus 15 minučių po paskutinio skaitymo, kuris pakeitė knygą.
- Redis parduotuvėje 60 dienų nenaudojamos knygos galiojimo laikas gali baigtis nuo čekio parašymo iki jos parašymo. Tada jis iš naujo sukuriamas naudojant ankstesnę versiją, kuri yra tinkama būsena.

---

## Plano nustatymo priemonė

Įgyvendinta faile `src/lib/quota/planResolver.ts`.

Pirmenybės tvarka (nuo aukščiausios iki žemiausios):

1. **Rankinis DB nepaisymas** — lentelė `provider_plans`, kiekvienam `connectionId`.
2. **Žinomas katalogas** — `src/lib/quota/planRegistry.ts` (tik duomenys).
3. **Tuščias planas** — nėra matmenų, reikia sukonfigūruoti rankiniu būdu.

### Žinomas katalogas

| Teikėjas              | Matmenys                                                      |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nežinoma), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nenumatyta — reikia sukonfigūruoti rankiniu būdu              |

---

## Dujotiekio integravimas

### PRE kablys (`open-sse/handlers/chatCore.ts`)

Vykdoma prieš ankstesnį vykdytoją, po autentifikavimo ir politikos patikrinimų:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Nesėkmingas atidarymas** : jei `enforceQuotaShare` meta, užklausa leidžiama per `pino.warn` žurnalą. Tai neleidžia kvotos variklio klaidai blokuoti viso srauto.

**Kai grįžta pajėgumai.** Atsisakymas naudotis rakto dalimi arba prie baseino lubų baigiasi vienu iš dviejų sakinių abiem skolinimosi režimais:

- `percent` langas: `. The <window> window resets at <time>.` Laikas yra iš naujo nustatytas teikėjo ataskaitose.
- Skaičiuojamas vienetas: `. Enough <window> usage is expected to clear by <time>.` Laikas yra viršutinė riba nuo slankiojo lango, jei raktas nesiunčia nieko kito.

`<time>` yra ISO 8601 momentinė programa UTC. Atsisakymas perduodamas `Retry-After`: visos sekundės iki tos akimirkos, plius viena. Klientas, kuris laukia tiek laiko, bando pakartotinai ne ilgiau kaip vieną sekundę po akimirkos. Kai momentas nežinomas, atsisakymas neturi nei sakinio, nei antraštės. Absoliutus atsisakymas negalioja. Viešasis kodas lieka `quota_share_blocked`.

Atsisakymas dalytis bendrinamo ryšio neliečia. Jis nenustato vėsinimo, modelio užrakto ir tiekėjo pertraukiklio gedimo, o kiti baseino raktai ir toliau aptarnaujami. Kai kiekvienas kombinacijos taikinys atsisako rakto už savo dalį, derinys atsako 429 nelaukdamas. Jo atsakymas turi užuominą kaip `Retry-After`. Įdėjimo kelias užbaigia atsisakymą tuo pačiu sakiniu ir nesiunčia `Retry-After`.

### POST kabliukas (rekordinis suvartojimas)

Po sėkmingo atsakymo:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Dreifo nata** : jei `consume` nepavyksta reaguoti, slenkantis skaitiklis skaičiuojamas per mažai. Prisotinimo signalas iš teikėjo (pvz., `anthropic-ratelimit-unified-5h-utilization`) pataiso bendrą įvertinimą kitoje užklausoje.

### Kombinuotas švelnus baudinys (`open-sse/services/combo.ts`)

Kai `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Nuobauda skiriama po visų kitų taškų skaičiavimo faktorių. Tai sumažina automatinio derinimo tikimybę, kad bus pasirinktas prisotintas klavišas jo neužblokavus.

---

## UI Perėjimas

### `/dashboard/costs/quota-share` — Pagrindinis baseinų puslapis

Komponentai (visi `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponentas            | Tikslas                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Įvadinė kortelė, paaiškinanti kvotos dalijimąsi naujiems vartotojams                     |
| `CreatePoolModal`      | Sukurti naują kvotų telkinį (ryšio + pavadinimas + pradiniai paskirstymai)               |
| `PoolCard`             | Grupės santrauka: pavadinimas, ryšys, paskirstymo skaičius                               |
| `DimensionBar`         | Kiekvienam matmeniui sukrauta juosta: kiekvieno rakto dalis + naudojama visame pasaulyje |
| `AllocationTable`      | Stalas su sunaudota, teisinga dalis, deficit/surplus, skolinimosi vėliavėlė              |
| `BurnRateChart`        | EMA degimo greičio linijinė diagrama (tingūs kartojimai per `dynamic()`)                 |
| `EditAllocationsModal` | Redaguokite fondo paskirstymo svorius, viršutines ribas ir strategijas                   |
| `BorrowModeField`      | Pasiskolinimo režimo parinkiklis (`saturation` arba `consent`) vedlyje                   |
| `LendingBadge`         | Tik skaitomas ženklelis ant rakto, kuris skolina, tik `consent` baseinuose               |

Skolinimo ženklelis rodo procentą ir, kai nustatytas, terminą UTC su zona pavadinimu. Jis nustato terminą naudojimo momentinės nuotraukos metu. Pasibaigęs arba neįskaitomas terminas rodomas kaip `lending expired`.

Puslapio kabliukai:

- `usePools` — atsiunčia `GET /api/quota/pools` kas 30 sek.
- `usePoolUsage` — atsiunčia `GET /api/quota/pools/[id]/usage` pagal pareikalavimą.
- `useLocalStoragePoolMigration` — paleidžiamas vieną kartą prijungus, kad būtų perkelti pasenę LS duomenys.

Baseino vedlio klavišų žingsnis turi `Show usage by member to key holders` langelį. Ji nustato telkinio `memberBreakdown` parinktį (žr. [Narių naudojimas](#member-usage) ). Po juo vedlys įspėja, kad kas nors, kas žino, kokį klavišą naudojo, gali suderinti juostą su tuo klavišu. Pažymėjus langelį, taip sakoma, kai veiksmo sąraše yra mažiau nei trys arba daugiau nei 20 klavišų, nes juostos lieka paslėptos. Jis skaičiuoja veiksmo raktus ir negali pasakyti, kuris iš jų gali pateikti užklausas.

### `/dashboard/costs/quota-share/plans` — Tiekėjo plano konfig

- `ProviderPlanConfigClient.tsx`: išskleidžiamasis meniu, skirtas pasirinkti teikėją, peržiūrėti išspręstą planą (automatinis iš katalogo arba rankinis nepaisymas) ir redaguoti matmenis.
- Pakeitimai rašyti į `PUT /api/quota/plans/[connectionId]`.
- Ištrynus grąžinamas katalogas arba tuščias planas.

---

## Savitarnos kvota API (pasirinkimas)

`GET /api/v1/me/quota/{provider}` (taip pat aptarnaujama `/v1/me/quota/{provider}`) leidžia API rakto turėtojui su savo raktu nuskaityti, kiek bendrinamos prenumeratos priklauso ir kas juos blokuoja. Maršrutas yra plonas apvalkalas virš `src/server/selfService/quotaHandler.ts`; vaizdas yra sukurtas `src/lib/quota/selfView.ts` ir jo atsako sutartis yra `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Įjungimas ir autentifikavimas

- Funkcijos vėliavėlė `QUOTA_SELF_PANEL`, numatytasis `false`. Kai jis išjungtas, užklausa, pasiekusi maršrutą, gauna 404. Naudojant `REQUIRE_API_KEY=true`, kliento API politika atmeta trūkstamą arba netinkamą raktą su 401 prieš paleidžiant maršrutą, neatsižvelgiant į vėliavėlę. Užklausa be rakto, bet prisijungus prie prietaisų skydelio atitinka šią politiką ir gauna maršruto atsakymą. Vėliava išsprendžiama kaip ir bet kuri kita vėliavėlė (prietaisų skydelis arba REST nepaisymas, tada to paties pavadinimo aplinkos kintamasis); žr. [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Kiekvieno telkinio rodomas pavadinimas ir kiekvieno tvarkaraščio etiketė grąžinami fondo raktų turėtojams tiksliai taip, kaip juos parašė administratorius. Prieš įjungdami vėliavėlę, patikrinkite, ar raktų laikikliai tinka juos perskaityti.
- Raktas skaitomas tik iš antraščių: `Authorization: Bearer <key>` arba `x-api-key: <key>`. Kai siunčiami abu, naudojamas pirmasis patvirtinantis. Raktas užklausos eilutėje arba slapukas ignoruojamas. Serverio aplinkos raktas atmetamas (401).
- Raktui reikia `self:usage` taikiklio (403 be jo).
- Teikėjų segmentas apkarpomas, mažosiomis raidėmis ir patikrinamas pagal `^[a-z0-9][a-z0-9._-]{0,63}$` (kitu atveju 400), tada išsprendžiamas teikėjo registre, todėl slapyvardis, pvz., `cc` nuskaito `claude` telkinius. `claude` ir `anthropic` skaito tuos pačius telkinius.

### Ką rodo kiekvienas matomumas

| Matomumas       | Reikalauja                                                                   | Laukai                                                                                                                                                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nuosavas akcija | `self:usage`                                                                 | `pools[]` (nuoroda, pavadinimas, teikėjas, politika, svoris, viršutinė riba), `dimensions[].yourShare`, `accounts[]` su `yourShare` (ant `percent` lange be `attributed` ir `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`              |
| Paskyros lygis  | `self:usage` + `self:account-quota` ir teikėjas rakto `sharedQuotaProviders` | prideda `dimensions[].total`, `accounts[].dimensions[].account` ir `accounts[].modelWindows`, `attributed` ir `external` prie `percent` lango `yourShare`, o `members` telkinyje, kuriame įjungtas narių naudojimas (žr. [Narių naudojimas](#member-usage) ) |

- `sharedQuotaProviders` yra rakto nustatymas (`PUT /api/keys/[id]/self-service`): `null`, numatytasis, reiškia kiekvieną tiekėją, kurį pasiekia raktas; `[]` reiškia nieko. Kiekvieno baseino `accountVisible` nurodoma, kuris matomumas jam taikomas.
- Paskyros juostos ir modelių langai rodomi tik paskyroms, kurių ryšį gali naudoti raktas. Kai raktas turi leidžiamų jungčių sąrašą, už jo ribų esanti paskyra išlaiko savo `Account N` įrašą be `account` arba `modelWindows`. Tuščias sąrašas reiškia, kad nėra jokių apribojimų, kaip ir `/v1/me/status`. Bendra baseino suma (`dimensions[].total`) nuo to sąrašo nepriklauso.
- Dvi figūros, pavaizduotos vien tik su `self:usage` gautos naudojant kitus raktus. Grafiko biudžeto `exhausted` atspindi kiekvieno rakto sunaudojimą pagal tą tvarkaraštį. Baseine, kurio visi svoriai lygūs nuliui, rakto `weight` yra `100 / number of members`. Abu yra tai, kas taikoma raktui.
- Baseiną identifikuoja tik `ref`, nepermatoma reikšmė, susieta su skambinimo raktu. Jo rodomas pavadinimas (`name`) įtrauktas taip, kaip jį parašė administratorius. `ref` gaunamas iš rakto ir telkinio su serverio API rakto paslaptimi (`API_KEY_SECRET`). Klientai neturi to išlaikyti: ji pasikeičia, jei ši paslaptis pasukama.
- Sąskaitos pateikiamos kaip `Account 1`, `Account 2`, … fondo tvarka. Nėra grąžinamas telkinio ID, ryšio ID, paskyros el. pašto adresas ar paskyros pavadinimas, o atsakymas eina per sutarties schemą, kuri pašalina bet kurį lauką už jos ribų.
- Skaičiuojami vienetai (`requests`, `tokens`, `usd`) pateikiami kaip telkinio segmentas, kurį vykdo kvotos vartai: `limit` = plano limitas × sąskaitos telkinyje, `fairShare` = svoris / 100 × `limit` (lygus padalijimas), kai kiekvienas svoris yra skaitiklis =. kvotų parduotuvė, `consumed` `remaining` = `fairShare` − `consumed` grindys 0.
- `blocks.schedules` išvardija rakto tvarkaraščio langus (`open`/`closed`, `blackout` arba `outside-window`, `retryAfterSeconds`, rezervo aukštus ir ar išleidžiamas lango biudžetas); `blocks.modelCaps` pateikia savo modelio valandines viršutines ribas su suvartojimu.
- Raktas už kiekvieno teikėjo fondo ribų gauna 200 su `pools: []`; `availableModels` ( `qtSd/` ID, kuriuos raktas mato `/v1/models`), `expiresAt` ir `apiBaseUrl` vis dar užpildyti.
- `apiBaseUrl` yra `OMNIROUTE_PUBLIC_API_BASE_URL`, tada `OMNIROUTE_PUBLIC_BASE_URL`, kitaip `null`. Tai niekada nėra paties prašymo kilmė.

### `status` ir `reason`

| `status`      | Reikšmė                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Dabartinis skaitymas.                                                                                                                                                                                                                                                                                                                                         |
| `stale`       | Talpykloje esanti paskyra pažymėta pasenusia arba ta, kurios nustatymo iš naujo laikas praėjo nuo nuskaitymo. Skaičiai saugomi. Vienas modelio langas, kurio atstatymo laikas praėjo, žymi visą `modelWindows` grupę `stale`. Dėl nuosavo `percent` lango rakto dalies: knyga buvo perskaityta be paskyros nuskaitymo vartų talpykloje, kad būtų patvirtinta. |
| `unavailable` | Jokio skaitymo; skaičiai yra `null`, niekada ne `0`. `reason` sako kodėl.                                                                                                                                                                                                                                                                                     |

| `reason`                          | Kada                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Nepavyko perskaityti kvotos parduotuvės arba ji negali skaityti priskyrimo knygų.                             |
| `percent_attribution_unavailable` | Rakto dalis `percent` lange: dar nėra tos paskyros ir lango priskyrimo knygos arba knygoje nėra rakto sąrašo. |
| `percent_window_ended`            | Rakto dalis `percent` lange: knyga priklauso plano langui, kuris baigėsi.                                     |
| `account_not_used_by_key`         | Paties rakto dalis `percent` lange: paskyros ryšys yra už rakto leidžiamų jungčių ribų. Jo knyga neskaitoma.  |
| `window_not_reported`             | Teikėjo apribojimų talpykla nenuskaito to plano lango.                                                        |
| `connection_lookup_failed`        | Nepavyko nuskaityti paskyros ryšio.                                                                           |
| `not_supported`                   | OmniRoute negali nuskaityti paskyros teikėjo naudojimo apribojimų.                                            |
| `fetch_failed`                    | Nebuvo galima naudoti talpyklos skaitymo ir teikėjo apribojimų atnaujinti nepavyko.                           |
| `not_available`                   | Skaitmenyje nėra jokių naudojimo langų arba paskyroje iš viso nenurodoma.                                     |

Kai negalima nuskaityti kvotos saugyklos, parduotuvės palaikomi `blocks` laukai (grafiko biudžeto `exhausted`, modelio ribos `consumed` ir `reached`) taip pat yra `null`.

### Paskolos sutikimas

`PATCH /api/v1/me/quota/{provider}` įrašo paties skambinančiojo rakto sutikimą vienam telkiniui. Jis naudoja `GET` vėliavėlę, antraštes ir teikėjo taisykles. `self:usage` apimtis leidžia tai rašyti, nors jos pavadinimas skaitomas kaip tik skaitomas.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` yra `ref`, kurį `GET` grąžina tam telkiniui.
- `lendingPercent` yra sveikasis skaičius nuo 0 iki 100. Nustačius reikšmę, sutikimas ir jo terminas išvalomi. Kūnas su `lendingPercent` 0 priimamas bet kuriuo režimu.
- `lendingUntil` yra neprivalomas: epochos milisekundės arba `null` be termino. Ji turi būti ateityje ir ne daugiau kaip 8640000000000000. Mažesnė nei 100000000000 reikšmė skaitoma sekundėmis ir atmetama.
- Bet koks kitas laukas atmetamas. Turinys, ilgesnis nei 4096 baitai, atmetamas. Skaitymas sustoja ties tokiu dydžiu, todėl ilgesnis kūnas niekada nelaikomas sveikas.

Patikrinimai vykdomi šioje lentelėje nurodyta tvarka. Kiekvienam atsisakymui naudojamas standartinis klaidos tekstas su fiksuotu pranešimu. Vieno iš šių patikrinimų atsisakymas nieko nepateikia.

| Būsena | Pranešimas                                                                                         | Kada                                                                        |
| ------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | `QUOTA_SELF_PANEL` vėliava išjungta.                                        |
| 401    | `Valid API key required`                                                                           | Trūksta rakto arba jis neteisingas, arba yra serverio aplinkos raktas.      |
| 403    | `API key lacks the self:usage scope`                                                               | Raktui trūksta `self:usage`.                                                |
| 400    | `Invalid provider`                                                                                 | Teikėjo segmentas netinkamas.                                               |
| 429    | `Too many lending changes. Retry later.`                                                           | Raktas peržengė savo ribą. Atsakymas neša `Retry-After`.                    |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Korpusas nėra JSON, per ilgas arba neatitinka schemos.                      |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Terminas skaitomas sekundėmis.                                              |
| 400    | `lendingUntil must be in the future`                                                               | Galutinis terminas yra užklausos laikas arba anksčiau.                      |
| 404    | `Pool not found`                                                                                   | `ref` nenurodo šio teikėjo šio rakto telkinio.                              |
| 403    | `Lending is not enabled for this pool`                                                             | Baseinas veikia `saturation` režimu, o `lendingPercent` yra didesnis nei 0. |
| 500    | `Failed to build quota view`                                                                       | Bet kokia kita nesėkmė. Jo priežastis yra užregistruota serveryje.          |

Apribojimas yra 20 užklausų per 60 sekundžių kiekvienam raktui. Skaičiuojama kiekviena užklausa, kuri praeina teikėjo patikrą, net ir vėliau atmesta arba nieko nekeičianti. Jis turi savo skaitiklį, išskyrus rakto užklausų dažnio limitą.

Užklausa, pakeičianti saugomą sutikimą, įrašo vieną `quota.pool.lending.updated` audito įrašą. Jis įvardija raktą su senomis ir naujomis reikšmėmis. Ta pati įstaiga du kartus siunčiama vieną kartą rašo ir vieną kartą atlieka auditą. Atsakymas yra 200 su visu `GET` vaizdu, sukurtu po rašymo.

`GET` View“ praneša apie skolinimą taip:

- Kiekviename baseine yra `borrowMode` (`saturation` arba `consent`) ir rakto `lendingPercent` ir `lendingUntil`.
- `lendingActive` yra `true` tik `consent` baseine, kai procentas didesnis nei 0 ir terminas nepasiektas.
- `consent` baseine kiekvienas suskaičiuojamas `dimensions[].yourShare` neša `borrowAvailable`. Tai yra tai, ką raktas gali naudoti virš savo dalies, paskolintas kitų raktų.
- `borrowAvailable` naudoja vartų formulę. Jis skaito kiekvieną kitą raktą, taip pat tada, kai raktas yra po jo dalimi. `hard` raktui, kuris yra vienas papildomas skaitymas kiekvienam kitam raktui ir skaičiuojamas matmuo, lygiagrečiai.
- `borrowAvailable` yra `null` `soft` arba `burst` klavišui ir `null`, kai nuskaityti nepavyksta.
- `borrowAvailable` yra vienas skaičius visiems kitiems klavišams kartu. Dviejų raktų rinkinyje tai yra kito rakto figūra.
- `borrowAvailable` dar nepranešama `percent` langams arba `accounts[]`.
- `saturation` telkinyje rodinys praneša apie išsaugotą sutikimą su `lendingActive: false` ir be `borrowAvailable`.

### Klaidos

Kiekvienas šio maršruto atsakas, sėkmė ar klaida, neša `Cache-Control: no-store`. Atsisakymas, įvykęs prieš pradedant vykdyti maršrutą, jo neperduoda, pavyzdžiui, kliento API politikos 401 arba IP filtro 403. Maršruto klaidoms naudojamas standartinis klaidos turinys su fiksuotu pranešimu: 400 (netinkamas teikėjas), 401 (trūksta arba netinkamas raktas), 403 (trūksta `self:usage` ir 50 `Failed to build quota view`). ). 500 apima bet kokį gedimą, kai užklausa pasiekia maršrutą, įskaitant patį rakto paiešką; jo priežastis užregistruojama serveryje ir niekada negrąžinama. `PATCH` klaidos išvardytos [paskolos sutikime](#lending-consent).

### Apribojimai

- `remaining` yra teisingos rakto dalies dalis, kurios jis nepanaudojo. Tai nėra garantija. Raktas vis tiek gali būti įteiktas už jo, kol baseine yra vietos. Kai baseino bendra suma pasiekia `limit`, kiekvienas telkinio raktas yra atmetamas, nesvarbu, koks jo `remaining`, o raktas be `self:account-quota` negali matyti tos sumos.
- `remaining` neatsižvelgia į paskirstymo absoliutų `cap`. Vykdymas atsisako rakto, kai jo paties suvartojimas dangtelio vieneto lange pasiekia viršutinės ribos vertę.
- Paskyros lygio juosta gaunama iš teikėjo apribojimų talpyklos ir gali keliomis minutėmis atidėti vykdymo sprendimą. Rodmenys, kurių nustatymo iš naujo laikas praėjo, pranešami kaip `stale`.
- Kiekvieno modelio langai (`modelWindows`) pateikiami tik tiems teikėjams, kurie turi plano ir lango atvaizdavimą: Claude ir Codex šiandien. Kitų paslaugų teikėjų `modelWindows` vis dar rodomas, kai rodomi paskyros duomenys, su tuščiu `windows` sąrašu.
- `percent` lango rakto dalis yra apytikslė. Jis paimtas iš priskyrimo knygos ir apima visus apribojimus, nurodytus aukščiau esančioje dalyje „Procentiniai aspektai: priskyrimas pagal raktą“.
- `consumed` yra skaičiaus vykdymas, palyginti su teisinga dalimi. Tiksliai tai yra `attributed` plius `external`. `attributed` yra dalis, kuriai knygoje suteikiamas jos nukreiptų žetonų raktas. `external` yra paskyros naudojimo rakto dalis, į kurią fondo raktai neatsižvelgia.
- Abi dalys siunčiamos tik tada, kai baseino `accountVisible` yra teisinga: raktas turi `self:account-quota`, o teikėjas yra jo `sharedQuotaProviders`. Raktas be jo gauna tik `consumed`, su tuo pačiu `status` ir `reason`.
- Turėdamas abi dalis ir savo svorį, laikiklis gali atlikti naudojimą už baseino, kuris įkraunamas iš baseino raktų. Savininkas, turintis paskyros apimtį, jau mato bendrą sąskaitos sumą.
- Raktas, kuris lange nieko nenukreipė, vis tiek gali nuskaityti savo išorinį krūvį iš `consumed`, nes tada jam priskirta dalis yra 0.
- Pavyzdžiui, knyga atidaroma 0, o raktai A ir B yra po 50. Raktas A nukreipia 900 000 žetonų, o raktas B - 100 000. Tada paskyra pasiekia 60 % ribos 100. Tada `attributed` yra 54 klavišui A ir 6 klavišui B, o `external` yra 0 abiem.
- Vaizdas skaito knygą ir niekada nerašo jos būsenos. Ji neatverčia knygos ir niekada neprašo teikėjo perskaityti. Naudojant Redis parduotuvę, skaitymas pašalina pakeistus peržiūros laukus fone, kaip tai daro vartų skaitymai.
- Dalis yra `ok` tik tuo metu, kai vartų talpykloje yra sąskaitos nuskaitymas. Be jo, jis yra `stale`, todėl rinkinyje be naujausių užklausų jis rodomas kaip galbūt pasenęs.
- Kol užklausa nepateikiama per fondą, dalis nepasiekiama. Ši užklausa atveria knygą, o sąskaitos skaičius tuo metu skaičiuojamas kaip naudojimas už telkinio ribų.
- Kelių paskyrų telkinyje kiekvienas paskyros įrašas naudoja tos paskyros knygą ir vienos paskyros limitą. Vykdymas apskaičiuoja abi puses pagal sąskaitų skaičių, todėl proporcija yra tokia pati.
- Atskiro modelio langams raktas neskiriamas. Knygoje nėra duomenų apie modelį.
- Tvarkaraščio rezervinės aukštumos neįvertinamos pagal rodinį: tvarkaraštis gali būti rodomas kaip `open` o užklausa atmetama dėl priežasties `schedule-reserve`.
- Kai du to paties rakto telkiniai turi ryšį, vykdymas taikomas vienam iš jų, o rodinyje pateikiami abu.
- Nepavykusiems klavišų bandymams adresų limito nėra: už atvirkštinio tarpinio serverio skambinantieji gali dalytis vienu adresu (tai priklauso nuo to, ar peradresuoti klientų adresai yra patikimi), todėl užraktas gali uždrausti kelią kiekvienam rakto turėtojui. Naudojant `REQUIRE_API_KEY=true`, kliento API politika atmeta negaliojantį raktą prieš paleidžiant maršrutą, o tos politikos 401 turinys vietoj šio maršruto.

### Narių naudojimas

Administratorius gali leisti raktų turėtojams matyti, kaip lango naudojimas pasiskirsto tarp telkinio narių. Parinktis yra baseino `memberBreakdown`, išjungta pagal numatytuosius nustatymus. Jis nustatytas baseino vedlyje arba su `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` ir `GET /api/quota/pools/{id}` praneša apie tai.

Rodinio matmuo yra `members` tik tada, kai visa tai galioja:

- baseino parinktis įjungta
- telkinyje yra daugiausia 20 priskirtų raktų ir mažiausiai trys iš jų gali pateikti užklausas: aktyvūs, neatšaukti, neuždrausti ir nepasibaigęs jų galiojimo laikas
- baseino `accountVisible` yra tiesa: raktas turi `self:account-quota`, o teikėjas yra jo `sharedQuotaProviders`
- `percent` lange raktas gali naudoti paskyros ryšį
- buvo perskaityta paties rakto dalis to lango: jo `status` nėra `unavailable`

Kitu atveju `members` nėra. Tai niekada nėra tuščias sąrašas.

- Kiekvienas gabalas yra `{ slot, consumed, isYou }`. Atsakymo schema atmeta bet kokią kitą pjūvio ypatybę ir daugiau nei 20 dalių sąrašą. Pjaustukai pateikiami lizdų tvarka.
- Kiekvienam priskirtam raktui yra viena dalis, įskaitant raktą, kuris nebegali pateikti užklausų. Nenaudingas narys rodo tikrą nulį.
- 1 lizdas visada yra klausimo raktas su `isYou` true. Kiti lizdų numeriai yra raktinės maišos eilės. Jis yra raktas su `API_KEY_SECRET` ir apima baseiną, klausimo raktą ir narį.
- Taigi skaičiai nesutampa tarp laikiklių. Vienam turėtojui jie išlieka tokie patys tarp apsilankymų. Jie gali pasikeisti, kai raktas prisijungia prie baseino arba palieka jį, arba kai ši paslaptis pasukama.
- Skaičiuojamame lange dalis yra nario skaitiklis kvotų saugykloje, tas pats skaitiklis kaip ir jo paties `consumed`.
- `percent` lange dalis yra nario `attributed` dalis, iš tos pačios knygos, skaitoma kaip rakto dalis. Naudojimas ne baseine niekada neskirstomas į dalis. Tas krūvis yra padalintas pagal svorį, todėl jį nešančiose dalyse būtų rodomas svoris.
- Kiekvienas rodinys lygiagrečiai nuskaito vieną reikšmę kiekvienam kitam nariui ir skaičiuojamam langui. Ant `percent` lango skiltelės nekainuoja perskaityti, nei perskaityta akcijos knyga. Kai vienos reikšmės nuskaityti nepavyksta, tame lange nėra `members`, o rakto dalis lieka.
- Parinktis ir naudojamų raktų skaičius nuskaitomi vieną kartą kiekviename telkinyje ir tik raktui, kuris gali matyti paskyros duomenis. Nepavykus nuskaityti parinkties arba naudojamų raktų skaičiaus, to telkinio juostos išjungiamos. Serveris registruoja įspėjimą, o likusi rodinio dalis sukuriama.

Juostos neturi pavadinimų ar ID. Jie vis tiek pasakoja raktų turėtojui apie kitus narius:

- Savininkai vis tiek gali suderinti gabalėlius pagal savo vertes.
- Stabili numeracija leidžia turėtojui laikui bėgant sekti vieną narį.
- Skilčių skaičius parodo, kiek raktų yra skirta telkinyje.
- Trijų raktų rinkinyje kas nors, kas žino, ką naudojo vienas raktas, gali pasakyti, ką naudojo paskutinis raktas.
- Kai baseinas nukrenta žemiau trijų tinkamų raktų, juostos išnyksta. Anksčiau pateikti vaizdai vis dar rodo, ką kiekvienas narys naudojo.
- Skaičiuojamame lange iš viso telkinio atėmus skilteles gali būti rodomas nebepriskirtų raktų naudojimas.
- Narys, kuris vienoje paskyroje rodo nulį, o kitoje naudoja, gali parodyti, kuris narys naudoja kurią paskyrą.
- Skaičiuojamame telkinyje taikant `hard` politiką, dalis, kuri nustoja augti esant teisingai nario daliai, rodo to nario svorį.

### Naudojimo serija (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (taip pat aptarnaujama `/v1/me/usage`) grąžina skambinimo rakto užklausų naudojimą ir kainą: bendrą sumą, vieną įrašą per UTC dieną, dieną ir modelį, modelį ir teikėją. Jis dalijasi vėliava, autentifikavimo taisyklėmis, `self:usage` apimtimi, `Cache-Control: no-store` ir aukščiau pateikto kvotos maršruto klaidų elgesiu. Raktas patikrinamas prieš `range`. Klaidos yra 400 (`Invalid range`), 401, 403, 404 ir 500 (`Failed to build usage`).

- `range` yra vienas iš `1d`, `7d`, `30d` (numatytasis) arba `90d`. Bet kuri kita reikšmė, tuščia reikšmė arba pasikartojantis parametras yra 400. Rinkinys sustoja ties `90d`, kad apribotų skambučio kainą. Rodinys skaito tik neapdorotą naudojimo istoriją, o ne kasdienes suvestines, kuriose nėra rakto.
- Eilutės parenkamos pagal skambinimo klavišo ID. Rakto pavadinimo stulpelis niekada nesutampa, o eilutės, įrašytos be rakto ID, niekada neskaičiuojamos.
- Kuriant seriją, lango rakto eilutėse vykdomos penkios sugrupuotos užklausos. Sukurta serija pakartotinai naudojama 60 sekundžių vienam klavišui ir diapazonui, o pakartotinai naudojamas skambutis nevyksta. Jo `generatedAt` nurodo amžių.
- Langas baigiasi, kai yra pastatyta serija. Eilutė, pažymėta vėliau, pavyzdžiui, pagal laikrodžio pasvirimą, neskaičiuojama.
- `coverage.retentionDays` yra operatoriaus neapdorotas naudojimo istorijos išsaugojimo nustatymas (`retention.usageHistory` duomenų bazės nustatymuose). `coverage.truncatedByRetention` yra tiesa, kai prašomas diapazonas yra ilgesnis nei šis nustatymas. Jis lygina du skaičius ir netikrina, ar iš tikrųjų nėra eilučių.
- Teikėjas grąžinamas kaip įrašyta pagal paties rakto užklausas. Modelis yra įrašytas pavadinimas po paskutinio `/`, o eilutės grupuojamos pagal jį. Kombinuota užklausa, kurios kiekvienas taikinys buvo atmestas, įrašomas su maršruto etikete kaip teikėjas (kombinacijos pavadinimas, `auto` arba `combo`) ir kliento išsiųsta modelio eilute. Kitos atmestos užklausos, pvz., dėl atvirojo grandinės pertraukiklio, modelio aušinimo ar kvotos praleidimo, išsaugo tikslinį teikėją ir modelį.
- Be skaičiavimų ir išlaidų, atsakyme nurodomas vidutinis delsos laikas, sėkmės rodikliai ir pirmosios bei paskutinės užklausos laikas.
- `byModel` išvardija 50 tiekėjo ir modelio porų, turinčių daugiausiai užklausų. Su daugiau porų jo įrašai nesudaro `summary`, o `summary.uniqueModels` skaičiuoja kiekvieną įrašytą modelio rašybą. Tada `byModelTruncated` yra tiesa, o modelis, kurio poros patenka į abi pjūvio puses, rodo dalines sumas.
- Pranešamos dvi išlaidos. `costUsd` yra sąskaitoje nurodyta kaina, kaip rodo naudojimo analizė. Fiksuoto tarifo prenumeratos teikėjai, tokie kaip Claude kodo planas, ten skaičiuoja 0 USD. `listPriceUsd` yra ta pati naudojimo kaina mažmenine kaina, įskaitant prenumeratas. Užklausoje, kurios modelyje nėra kainos eilutės, skaičiuojama saugoma kaina: teikėjo nurodyta kaina arba kaina, apskaičiuota įrašant užklausą. Tik užklausa, kurioje nėra nė vieno, skaičiuojama 0, be žymeklio, todėl bendra suma gali būti dalinė.
- Atsakymo sutartis yra `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Savitarnos puslapis

Įjungus `QUOTA_SELF_PANEL`, `/quota/{provider}` yra viešas puslapis. Rakto turėtojas ten įveda API raktą ir mato to rakto telkinius teikėjui. Kiekviename telkinyje rodoma po vieną kortelę kiekvienam fondo lange, su fondo naudojimu visi ir rakto dalimi. Kiekviena fondo sąskaita turi savo korteles su sąskaitos naudojimu ir rakto dalimi. Paskyros naudojimas rodomas tik tada, kai raktas gali matyti paskyros duomenis. Puslapyje taip pat pateikiami kiekvienos paskyros modelio apribojimai ir paties rakto naudojimas. Pranešimas rodomas, kai tvarkaraštis blokuoja raktą šiuo metu. Kortelėje pateikiamas kiekvieno modelio rakto dangtelis su jo naudojimu ir pažymimas pasiektas. `{provider}` yra teikėjo ID arba jo slapyvardis (`/quota/claude`, `/quota/cc`). Nežinomas teikėjas ir kiekvienas `/quota/*` kelias, kol vėliavėlė išjungta, atsakykite į 404. Pasirinktinio OpenAI arba Anthropic suderinamo mazgo telkiniai neturi puslapio. API vis tiek atsako už juos.

Puslapyje nėra seanso. Raktas siunčiamas tik `Authorization` antraštėje `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` ir `GET /api/v1/me/usage`, niekada nesiunčiamas URL. Raktas, kurį serveris priima, saugomas skirtuko `sessionStorage`. Naudojant funkciją „Prisiminti šiame įrenginyje“, jis išsaugomas `localStorage`, o „Pamiršti raktą“ jį pašalina iš abiejų. Raktas, kurį serveris atmeta, pašalinamas iš saugyklos.

Baseinas `consent` režimu rodo skolinimo kortelę. Ten rakto turėtojas nustato visą procentą nuo 0 iki 100 nuo rakto nenaudojamos paskolos dalies. Turėtojas taip pat pasirenka, kiek laiko galioja sutikimas: iki išjungimo, 1 valandą, 8 valandas, 24 valandas, 7 dienas ar 30 dienų. Trukmė skaičiuojama nuo išsaugojimo momento. Kol galioja terminas, turėtojas gali jo laikytis. Jei šis terminas praeina prieš Išsaugoti, kortelė nieko nesiunčia ir prašo kito pasirinkimo. Su 0% galutinis terminas nesiunčiamas. Kortelėje rodomas išsaugotas terminas su pavadinta laiko juosta. Sutikimas, kurio terminas praėjo, rodomas kaip pasibaigęs.

`hard` raktui kortelėje taip pat nurodoma, kokie kiti raktai šiuo metu suteikiami raktui. Kiekviena eilutė yra viena figūra, skirta visiems kitiems klavišams kartu. Dviejų raktų rinkinyje tai yra kito rakto figūra. Skaičius, kurio rodinys nepraneša, skaitomas kaip nepasiekiamas, o ne kaip nulis. `soft` arba `burst` raktui kortelėje nurodyta, kad joks skaičius netaikomas.

Fondas `saturation` režimu, kurio raktas išsaugo procentą, viršijantį 0, rodo tik išėmimą. Ten rašoma, kad saugomas procentas neturi jokios įtakos. Išėmimo mygtukas siunčia 0 be termino. `saturation` režimo telkinys su išsaugotu 0 nerodo skolinimo kortelės. Išsaugojus kortelę, kurios grąžintam rodiniui nebereikia, jos pranešimas lieka tol, kol vėl nepasikeis puslapio rodinys.

Niekas neišsaugomas, kol laikiklis nepaspaudžia Išsaugoti arba Atšaukti. Kiekvienas paspaudimas siunčia vieną `PATCH /api/v1/me/quota/{provider}` užklausą, o antrasis paspaudimas nieko nesiunčia, kol laukiama pirmojo. Kūnas neša baseino nepermatomą `ref` nuo vaizdo, procentų ir termino. Atsakymas yra atkurtas kvotos rodinys, o puslapyje jis rodomas be antro skaitymo. Kai du įrašai sutampa, puslapis nuskaito kvotą vieną kartą po paskutinio atsakymo. Puslapis nesaugo sutikimo naršyklės saugykloje.

Atmestas pakeitimas kortelėje paaiškinamas tekstu, pasirinktu iš HTTP būsenos. Klaidos tekstas neskaitomas. 401 sako, kad raktas nebuvo priimtas, ir iš naujo įkelia kvotą. 403 sako, kad fondas nepriima skolinimo pakeitimų, o 404 sako, kad fondo nebeliko. Abiejuose yra mygtukas, kuris iš naujo įkelia kvotą. 400 ar kitas 4xx atsakymas prašo turėtojo patikrinti procentą ir terminą. 429 prašo turėtojo palaukti, o `Retry-After` sekundės, kai atsakymas jas pateiks. 5xx atsakymas, 408 arba tinklo gedimas sako, kad pakeitimas gali būti neišsaugotas, ir išsaugomos įvestos reikšmės. Atsakymas už sutarties ribų perkrauna kvotą. Nepavykus išsaugoti raktas savaime nepašalinamas. Kai atsisakoma įkelti iš naujo, puslapis pašalina raktą, kaip ir bet kurio atmesto skaitymo atveju.

Priėmus raktą, puslapyje taip pat rodoma kortelė „Nustatykite savo įrankius“ su trimis skirtukais. "Claude kodas" suteikia `env` bloką `~/.claude/settings.json`. „Shell“ pateikia tuos pačius kintamuosius kaip ir `export` eilutės. „Claude Desktop“ pateikia savo trečiosios šalies išvadų lango reikšmes. Modeliai yra kvotos dalies modeliai, kurių raktas gali reikalauti tam teikėjui. Kai tokio sąrašo nėra su raktu, blokas įjungia šliuzo modelio aptikimą. Šliuzo adresas yra viešoji API kilmė, apie kurią praneša serveris (`OMNIROUTE_PUBLIC_API_BASE_URL`, tada `OMNIROUTE_PUBLIC_BASE_URL`). Kai nė vienas nenustatytas, kortelė rodo rezervuotąją vietą ir nurodo savininkui paklausti administratoriaus. Raktas rodomas kaip rezervuota vieta. „Įtraukti mano raktą“ įveda visą raktą į ekrano tekstą ir į tai, ką kopijuoja mygtukas „kopijuoti“. Tai tęsiasi tol, kol išvalomas langelis, pamirštamas ar pakeistas raktas arba paliekamas puslapis. Kortelė nesiunčia užklausos ir nesiūlo failų atsisiuntimo.

Rodomas API ženklų `stale` rodmuo kaip galbūt pasenęs. Skaitymas, kuris žymi `unavailable` rodomas su priežastimi, o ne kaip nulis.

Procentiniuose planuose puslapis traukia nuosavą rakto dalį, kai apie tai praneša API. Jame sakoma, kad skaičius yra apytikslis ir įvardijamos dvi jo dalys. Kiekvienam modeliui taikomi apribojimai rodo tik paskyrą.

Kai lange yra `members`, jo kortelėje taip pat rodoma juosta su po vieną segmentą kiekvienam nariui lizdų tvarka. Klausimo klavišo segmente naudojama akcento spalva. Kiti segmentai keičia temos diagramos spalvas. Teksto legendoje pateikiamas kiekvienas segmentas su jo verte, todėl niekas nepriklauso nuo spalvos. Segmentai pažymėti `You` arba `Member N`, kur N yra lizdas.

### Puslapiui skirtas prievadas

`QUOTA_PANEL_PORT` atidaro antrą klausytoją, kuris aptarnauja tik savitarnos puslapį. Jis išjungtas, nebent kintamasis nustatytas. `QUOTA_PANEL_HOST` yra susiejimo adresas ir numatytasis `127.0.0.1`.

Klausytojas perduoda šiuos kelius į pagrindinį prievadą ir atsako 404 už kiekvieną kitą kelią:

| Kelias                                                                   | Aptarnauja                                   |
| ------------------------------------------------------------------------ | -------------------------------------------- |
| `/quota/{provider}`                                                      | Puslapis                                     |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Kvotos rodinys rašomas puslapyje             |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Puslapyje skaitoma naudojimo serija          |
| `/_next/static/`                                                         | Konstrukcijos scenarijai, stiliai ir šriftai |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Piktogramos                                  |

`GET` ir `HEAD` yra perduodami be korpuso. Taip pat perduodama viena užklausa su turiniu: kvotos peržiūros kelio `PATCH`, kurią puslapis siunčia, kad išsaugotų skolinimo pasirinkimą. Bet kuris kitas metodas atsako 404, išskyrus CONNECT užklausą, kurios ryšys uždaromas be atsakymo. Bet kuri kita užklausa, deklaruojanti kūną, atsako 404 ir jos ryšys nutraukiamas. Atnaujinimo prašymai atmetami ir jų ryšys nutraukiamas. Kelias su taško segmentu arba fragmento žymekliu atmetamas, kaip ir API prievade. Taip pat yra ir užklausos tikslas su simboliu už spausdinamo ASCII ribų. Į neapdorotą valdymo simbolį taikinyje HTTP analizatorius atsako 400 prieš šio prievado patikrinimą. Neperduodamos užklausų antraštės, kurias sistema pasilieka savo reikmėms: pavadinimai, prasidedantys `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` arba `x-next-`, ir pavadinimai `x-matched-path` ir `next-resume`. Prašymas perduodamas be jų. Prietaisų skydelis, prisijungimo puslapis, valdymo API ir išvadų maršrutai nepasiekiami per šį prievadą.

`PATCH` turi turėti `Content-Type: application/json`, be parametrų arba tik su `charset=utf-8`. Jame turi būti vienas `Content-Length` nuo 1 iki 4096, parašytas paprastais skaitmenimis ir be `Transfer-Encoding`. `PATCH` kuris pažeidžia vieną iš šių taisyklių, atsako į 404. Kai kurie netinkamai suformuoti ilgiai, pvz., pasirašyti ar pasikartojantys, HTTP analizatorius atsako 400 prieš šio prievado patikrinimą. Prievadas nuskaito deklaruotus baitus prieš susisiekdamas su pagrindiniu prievadu ir laukia jų daugiausiai 5 sekundes. Iki tol nebaigtas kūnas atsako į 404 ir jo ryšys nutraukiamas. Niekas nepasiekia pagrindinio prievado tokiu atveju arba kai klientas išeina pirmas. Prievadas perduoda tiksliai deklaruotus baitus su tuo pačiu `Content-Length`. Baitai po jų skaitomi kaip kita ryšio užklausa. Priešais esantis TLS atvirkštinis tarpinis serveris turi persiųsti `Content-Length` ir negali iš naujo suskaidyti užklausos turinio. Pagrindinis prievadas tikrina API raktą `Authorization` antraštėje, kaip ir `GET`.

404 korpusas yra `{"error":"not_found","message":"Not found."}`. Sugedusi relė atsako į 502 (`api_bridge_unavailable`) arba 504 (`api_bridge_timeout`) be `detail` lauko.

Klausytojas neskaito `QUOTA_SELF_PANEL` ir neįjungia puslapio. Kol vėliavėlė išjungta, puslapis ir jo API atsako į 404 pagrindiniame prievade, o klausytojas perduoda šį atsakymą.

Kūrimo serveryje (`next dev`) puslapis netampa interaktyvus per šį prievadą. Kūrimo karšto perkrovimo lizdas yra atnaujinimo užklausa, o prievadas jo atsisako. Kurdami naudokite pagrindinį prievadą.

Prievadas aptarnauja paprastą HTTP, o puslapis siunčia API raktus. Išsaugokite numatytąjį susiejimo adresą ir priešais jį įdėkite atvirkštinį tarpinį serverį su TLS. Surišimo adresas, išskyrus grįžtamąjį ryšį, registruoja šį pranešimą:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Atgalinis partneris, kuris nesiunčia persiuntimo antraštės, skaičiuojamas kaip vietinis pagrindiniame prievade. Taigi to paties pagrindinio kompiuterio tarpinis serveris turi siųsti `X-Forwarded-For`. Privataus adreso įgaliotasis serveris tos antraštės patikimas tik naudojant `OMNIROUTE_TRUST_PROXY=private` (arba `lan`). Apie bet kurį kitą lygiavertį partnerią pranešama jo ryšio adresu, o jo išsiųstos persiuntimo antraštės atmetamos.

Klausytojas vienu metu palaiko daugiausia 256 ryšius. Klientas turi 10 sekundžių išsiųsti užklausos antraštes ir 30 sekundžių visą užklausą. Neveikiantis palaikomas ryšys užsidaro maždaug po 5 sekundžių. Ryšys, kai 60 sekundžių nevykdoma, nutraukiamas. Šios vertės yra fiksuotos. Priekyje esančiame atvirkštiniame tarpiniame serveryje taip pat nustatykite ryšio ir greičio apribojimus. Priekyje esantis atvirkštinis tarpinis serveris turėtų išlaikyti tuščiosios eigos jungtis prieš srovę mažiau nei 5 sekundes arba pakartotinai jų nenaudoti. Relė į pagrindinį prievadą naudoja API prievado (`API_BRIDGE_*`) skirtąjį laiką.

Klausytojas taip pat pradeda, kai `API_PORT` nenustatytas. `QUOTA_PANEL_PORT` turi būti prievadas nuo 1 iki 65535, parašytas tik skaitmenimis. Jis turi skirtis nuo prietaisų skydelio prievado ir API prievado. Kol tiesioginis WebSocket serveris įjungtas, jis taip pat turi skirtis nuo `LIVE_WS_PORT` (numatytasis 20132). Bet kuri kita reikšmė nieko neatveria ir įrašo įspėjimą. Įspėjimas apie atmestą reikšmę įvardija kintamąjį ir reikšmės nekartoja. Jau naudojamas prievadas nieko neatidaro ir registruoja šį įspėjimą:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Nustačius `OMNIROUTE_BASE_PATH`, klausytojas tikisi kiekvieno aukščiau esančio kelio po šiuo priešdėliu. Naudokite tą patį `OMNIROUTE_BASE_PATH` kūrimo metu ir vykdymo metu. Parašykite jį su pirmuoju pasviruoju brūkšniu ir be pasvirojo brūkšnio, pavyzdžiui `/omniroute`. Kita forma, įskaitant `/` ir `/omniroute/`, išjungia prievadą su įspėjimu, nors versija priima šias formas. Taip pat ir bazinis kelias, kurio pirmasis segmentas įvardija taikymo maršrutą: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` arba `connect`, bet kuriuo atveju.

Apribojimai:

- `/quota/{provider}/` su pasviruoju brūkšniu atsako į 404 šiame prievade.
- Aptarnavimo darbuotojas ir žiniatinklio programos aprašas nepateikiami šiame prievade.
- Šiame prievade nerodomas prietaisų skydelyje nustatytas tinkintas adresynas.
- Piktogramos nerodomos, kai programa veikia pagal pagrindinį kelią.
- Uostas kalba paprastai HTTP/1.1.
- Nepavykęs susiejimas nėra bandomas iš naujo, kol procesas nebus paleistas iš naujo.
- Klausytojas neturi ryšio ar greičio apribojimo vienam kliento adresui.
- Sudėtinio rodinio sąrankos ši dalis neapima.

---

## Aplinkos kintamieji

| Kintamasis                           | Numatytoji    | Aprašymas                                                                      |
| ------------------------------------ | ------------- | ------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`      | Naudojamas vairuotojas: `sqlite` arba `redis`                                  |
| `QUOTA_STORE_REDIS_URL`              | _(tuščia)_    | Redis URL, pvz., `redis://localhost:6379`                                      |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`         | 0..1; `>= threshold` įjungia griežtą režimą                                    |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`        | Žetonai, paaiškinantys daugiausiai vieną procentinio plano lango tašką         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`         | 0..1; švelnios politikos kombinuoto balo daugiklis                             |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`          | Kelios dienos, kol GC pašalina senus `quota_consumption` kibirus               |
| `QUOTA_PANEL_PORT`                   | _(nustatyta)_ | Savitarnos puslapiui skirtas prievadas. Išjungta reiškia, kad nėra klausytojo. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`   | Susiejimo adresas šiam prievadui                                               |

DB parametrai (`quotaStore.*`) nepaisyti env vars.

---

## Trikčių šalinimas

### Redis sukonfigūruota, bet neprisijungia

Patikrinkite, ar įdiegtas `ioredis` (`npm ls ioredis`) ir ar pasiekiamas `QUOTA_STORE_REDIS_URL`.
Nepavykus prisijungti, gamykla grįžta prie SQLite (registruojama `warn` lygiu).

### `peek` grąžina pasenusius duomenis / leidžia veiksmą įvykus trikčiai

Jei `peek` pateikia klaidą, `enforceQuotaShare` traktuoja rezultatą kaip „leisti“ (leidimas įvykus trikčiai).
Norėdami nustatyti pagrindinę priežastį, `pino` žurnaluose patikrinkite `quota:enforce` ir
`quota:factory` įrašus.

### Sunaudojimo skaitiklio nuokrypis

Jei faktinis teikėjo naudojimas skiriasi nuo skaitiklių, tai yra tikėtina — 2 segmentų
slankiojo lango paklaida ties lango ribomis yra ~1 %, o `consume` vykdomas asinchroniškai
po atsako, nelaukiant rezultato. Prisotinimo signalas (`saturationSignals.ts`)
nuskaito faktinį teikėjo panaudojimą su 30 s TTL ir atitinkamai pakoreguoja `globalUsedPercent`.

### Telkinio naudojimo spartos rodinyje rodoma „nėra duomenų“

`computeBurnRate` reikia bent 2 istorinių mėginių. Naujuose telkiniuose, kuriuose anksčiau
nebuvo `consume` iškvietimų, bus rodoma `tokensPerSecond: 0` ir `timeToExhaustionMs: null`.

---

## Perkėlimas iš localStorage

Kai `/dashboard/costs/quota-share` įkeliamas pirmą kartą, kabliukas `useLocalStoragePoolMigration`
patikrina:

1. `localStorage.getItem("omniroute:quota-share:pools")` nėra tuščias.
2. `GET /api/quota/pools` grąžina `[]` (DB yra tuščia).

Jei abi sąlygos tenkinamos, kiekvienas senas telkinys paketiniu būdu siunčiamas į `POST /api/quota/pools`,
tada localStorage raktas pašalinamas. Perkėlimas yra idempotentinis: 2-oji sąlyga apsaugo
nuo pakartotinio perkėlimo.

---

## Vidinis strategijos klasifikavimas

`quota-share` yra **tik vidiniam naudojimui** skirta maršruto parinkimo strategija (`INTERNAL_ROUTING_STRATEGY_VALUES` faile
`src/shared/constants/routingStrategies.ts`). Ją naudoja tik sistemos sukurtos
`qtSd/` telkinių kombinacijos ir ji sąmoningai neįtraukta į `ROUTING_STRATEGY_VALUES`, todėl
naudotojo sąsajoje ar API ji niekada nepateikiama kaip naudotojo pasirenkama parinktis.

---

## Bandymo aprėptis

Du automatinės aprėpties sluoksniai pristatomi su kvotos pasidalijimo varikliu:

| Liukso numeris       | komandą                                                                | Ką jis apima                                                                                                                                                                                                                 |
| :------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vienetas (29 testai) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR planuoklis, prisotinimo blokavimas, lygiagretumo ribos, fairShare matematika, atsilikimų eiliškumas                                                                                                                      |
| Integravimo matrica  | `npm run test:combo:matrix`                                            | Galutinis maršruto sprendimas naudojant tikrą kombinuotą dujotiekį; DRR sąžiningumas + prisotinimo prioritetų mažinimas naudojant gyvas siūles (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integracijos matrica veikia CI kartu su visomis 22 viešosiomis strategijomis. Vieneto komplektą galima valdyti atskirai.

---

## DB schemos santrauka

Trys lentelės, pridėtos perkėlus `078`, `079` ir `085`:

- `quota_pools` + `quota_allocations` — telkinio apibrėžimai ir paskirstymai pagal raktą.
- `quota_consumption` — 2 kaušų skaitikliai vienam `(apiKeyId, dimensionKey)`.
- `provider_plans` — rankinio teikėjo plano nepaisymas (matmenys JSON per connectionId).

Visos lentelės pridėtos per idempotentą `CREATE TABLE IF NOT EXISTS` perkėlimą.

Sutiktas skolinimas prideda tris stulpelius: `quota_allocations.lending_percent` (sveikas skaičius, numatytasis 0), `quota_allocations.lending_until` (epochos milisekundės arba `NULL`, jei nėra termino) ir `quota_pools.borrow_mode` (numatytasis `saturation`). Jo perkėlimas tik prideda šiuos stulpelius ir neįrašo esamos eilutės.

Procentų priskyrimo knygoje pridedama `quota_percent_ledger` (viena eilutė vienam telkiniui, paskyros ir plano lange) ir `quota_percent_ledger_tokens` (vienas prieigos raktų skaitiklis kiekvienam telkiniui, paskyrai ir API raktui). `src/lib/db/quotaPercentLedger.ts` juos skaito ir rašo.
