# Quota Sharing Engine (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referenca dokumenta**: `docs/routing/QUOTA_SHARE.md`
> Dio grupe B (planovi 16 + 22).

---

## Pregled

Mehanizam za dijeljenje kvote pravedno raspodjeljuje vremenski ograničenu kvotu pružatelja usluge (npr. Codexov
5-satni prozor, Kimi 1500 zahtjeva/h) među više API ključeva koji dijele
istu vezu.

**Problem koji rješava:** OmniRoute prosljeđuje zahtjeve mnogih API ključeva prema istom računu
uzvodnog pružatelja usluge. Bez logike dijeljenja, nagli porast zahtjeva ključa A može iscrpiti
kvotu pružatelja usluge za taj sat, ostavljajući ključeve B i C blokiranima sve dok se prozor ne poništi.
Mehanizam to sprječava na sljedeći način:

1. Prati tekuću potrošnju svakog ključa po dimenziji (%, zahtjevi, tokeni, $).
2. Primjenjuje algoritam pravedne raspodjele koji ne ostavlja resurse neiskorištenima: ključ može posuditi neiskorištene
   udjele dok globalni skup nije zasićen.
3. Provodi rezultat u kritičnoj putanji (`chatCore.ts`) prije nego što zahtjev
   stigne do uzvodnog izvršitelja.

---

## Algoritam: pravedna podjela posla-čuvanje

Implementirano u `src/lib/quota/fairShare.ts`.

### Načini rada

| Stanje                                     | Način rada      | Ponašanje                                                              |
| ------------------------------------------ | --------------- | ---------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Velikodušno** | Ključ se može posuditi do globalnog ograničenja minus ukupno potrošeno |
| `globalUsedPercent >= saturationThreshold` | **Strogi**      | Strogo provodite pojedinačnu pravednu raspodjelu                       |

Zadani `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Ova dva načina opisuju skup u zadanom načinu posuđivanja, `saturation`. Skup u `consent` modu uvijek primjenjuje stroga pravila, bez obzira na zasićenje. Pogledajte [Pozajmljivanje s pristankom (priključivanje po skupu)](#consented-lending-per-pool-opt-in).

### Odluka po dimenzijama

Za svaku aktivnu dimenziju u skupu, motor izračunava:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Za `percent` dimenzije, `consumed` umjesto toga dolazi iz knjige atribucija (pogledajte [Postotne dimenzije: atribucija po ključu](#percent-dimensions-per-key-attribution) ).

Zatim:

- **`policy = hard`** : ako je `consumed > fairShareAllowed` i način striktan →** blokirati** .
- **`policy = soft`** : ako je `consumed > fairShareAllowed` i način striktan →** sankcionirati** (ukloni prioritete u kombinaciji; nikada ne blokiraj).
- **`policy = burst`** : dopustiti dok postoji globalni prostor bez obzira na pravičan udio.

### Cap absoluto

`capValue` + `capUnit` na dodjeli je čvrsti strop neovisno o načinu ili politici. Bilo koja dimenzija gdje `consumed >= capValue` uvijek** blokovi** zahtjev. Za `percent` cap, `consumed` je samo dio koji se pripisuje ključu.

### Višedimenzionalna provjera

Zahtjev je blokiran ako** bilo koji** dimenzija u bazenu bi to blokirala. Dimenzije su neovisne — 5h% iscrpljenosti ne utječe na tjednu% dimenziju.

### Posuđivanje

U velikodušnom načinu rada, ključ čija je dodjela nedovoljno potrošena može koristiti višak iz nedodijeljenih dionica drugih ključeva. Formula je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

gdje `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (bazen `limit` za tu dimenziju) uvijek je tvrdi strop.

### Pozajmljivanje s pristankom (uključivanje po skupu)

Svaki bazen ima način posudbe. `saturation` je zadana i zadržava gore navedena pravila. U `consent` načinu rada `hard` ključ prenosi svoj dio samo unutar kapaciteta koji su drugi ključevi pristali posuditi. Administrator postavlja način rada svakog bazena. Svaki nositelj ključa postavlja vlastitu suglasnost putem [suglasnosti za posuđivanje](#lending-consent).

Pristanak je postotak od 0 do 100 i izborni rok u milisekundama epohe. Ključ posuđuje taj postotak svog udjela u mirovanju dok je rok u budućnosti.

Za jednu dimenziju, `L` je efektivno ograničenje: ograničenje plana pomnoženo s računima u skupu. Vrata izračunavaju, za traženi ključ:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` je težina ključa, ili `100 / n` za svaki ključ kada nijedna težina nije iznad 0. `lend_k` je aktivni postotak ključa, a 0 kada prođe njegov rok. Vlastiti pristanak podnositelja zahtjeva nikada se ne računa. Ključ `hard` se odbija kada njegova potrošnja dosegne svoj udio plus `borrowAvailable`.

Kapacitet koji ne zahtijeva dodjelu (100 minus zbroj pondera) nije posuđivan. Nijedan ključ nije pristao posuditi ga.

**Primjer.** `L` je 1000.

| Ključ | Težina | Udio | Potrošeno | posuđuje |
| ----- | ------ | ---- | --------- | -------- |
| A     | 50     | 500  | 530       | 0%       |
| B     | 30     | 300  | 100       | 50%      |
| C     | 0      | 0    | 60        | 0%       |

- B posuđuje 50% svojih neaktivnih 200, što je 100. C je već uzeo 60 iznad svog udjela. A može posuditi 40.
- A se poslužuje na 530 i odbija se kada njegova potrošnja dosegne 540.
- Prije nego što je C upotrijebio bilo što, s A na ili ispod svog udjela, C je mogao posuditi 100.
- Prije nego što je C upotrijebio bilo što, s A na 530, C je mogao posuditi 70.

**Nulta težina.** Ključ s težinom 0 ima udio 0. Služi se samo dok je njegova potrošnja ispod one koju drugi posuđuju. Kad nitko ne posuđuje, odbija se od prvog zahtjeva.

**Rokovi.** Nijedan zadatak u pozadini ne ističe privolu. Svaki zahtjev uspoređuje rok sa svojim vremenom, a rok jednak tom vremenu je prošao. Pohranjeni rok koji nije konačan broj ili je prošao najveći datum koji `Date` može sadržavati, računa se kao prošao.

**`soft` i `burst`.** Posuđivanje ih ne ograničava. Ključ `soft` deprioritizira se kada pređe svoj udio. `burst` ključ prolazi dok bazen ima mjesta. Strop bazena i dalje odbija svaki ključ nakon što ukupni iznos bazena dosegne svoju granicu.

**Trošak na putu zahtjeva.** `saturation` skup ne čita ništa više nego prije. U `consent` skupu, prebrojiva dimenzija čita druge ključeve samo za `hard` ključ na ili iznad svog udjela, dok drugi ključ posuđuje. Zatim čini jedno čitanje po drugom ključu, paralelno. Neuspjelo čitanje računa se kao potrošnja 0 za taj ključ. `percent` dimenzija ne dodaje čitanje, jer knjiga atribucije sadrži svaki ključ.

**Uređivanje bazena.** Uređivanje zadržava suglasnost ključeva koji ostaju. Ovo vrijedi za uređivanja dodjele, zamjene na razini cijele grupe i `ensure` pozive. Uklonjeni ključ gubi pristanak, a ponovno dodan ključ počinje s 0. Administratorske rute vraćaju pristanak svakog ključa i nikad ga ne zapisuju. Prebacivanje bazena natrag na `saturation` zadržava svaki pohranjeni pristanak, koji nema učinka u tom načinu rada. Ponovno prebacivanje skupa na `consent` ponovno aktivira pohranjene privole čiji rok nije prošao. Vlasnik ključa može izbrisati pohranjeni pristanak u bilo kojem načinu.

**Nadogradnja.** Ako stupci `lending_percent` i `lending_until` već postoje, migracija dodaje samo `borrow_mode`, a pohranjeni postoci ostaju kakvi jesu. Svaki skup se pokreće u `saturation` modu. Uključite `consent` po bazenu u čarobnjaku za bazen. Ništa se ne zaključuje iz pohranjenih vrijednosti.

**Ograničenja.**

- Zajmodavac može pronaći fond na vrhuncu prije nego što iskoristi svoj udio. Kapacitet koji su drugi posudili ubraja se u ukupni skup.
- Provjera se izvodi prije zahtjeva i ne rezervira ništa. Istodobni zahtjevi čitaju potrošnju prije nego što se zabilježi, tako da se posuđeni kapacitet može potrošiti više puta, ograničen zahtjevima u letu. Provjera dijeljenja `saturation` načina ima isto svojstvo.

---

## Brojač s kliznim prozorom

Implementirano u `src/lib/quota/sqliteQuotaStore.ts` i `redisQuotaStore.ts`.

Dvije vremenske skupine za svaki `(apiKeyId, dimensionKey)`:

- `curr`: trenutačna vremenska skupina (`floor(nowMs / windowMs)`)
- `prev`: prethodna vremenska skupina (`curr - 1`)

Efektivna tekuća vrijednost:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Preciznost**: približno 99%. Pogreška iznosi najviše 1% veličine prozora na
granici između vremenskih skupina (svojstveno aproksimaciji s dvije vremenske skupine).

### Istodobnost

SQLite upravljački program: mutex u memoriji za svaki ključ `(apiKeyId | dimensionKey)` sprječava
utrku čitanja, izmjene i zapisivanja. Obrazac odgovara zaštiti od istodobne navale zahtjeva iz `src/sse/services/auth.ts`.

Redis upravljački program: Lua EVAL skripta za atomsko povećanje — izvršava se kao jedna Redis naredba.

---

## Upravljački programi

### SQLite (zadano, bez instalacije)

- Tablica: `quota_consumption` (pogledajte migraciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najbolje za implementacije s jednom instancom.
- Svi se podaci trajno pohranjuju u postojećoj OmniRoute SQLite bazi podataka (`DATA_DIR/storage.sqlite`).

### Redis (neobavezno, više instanci)

- Zahtijeva npm paket `ioredis`.
- Brojači se pohranjuju u Redisu; metapodaci (skupovi/alokacije) i dalje se pohranjuju u SQLiteu.
- Najbolje za implementacije s više replika u kojima brojači moraju biti zajednički.

### Promjena upravljačkih programa

Putem korisničkog sučelja za postavke (`/dashboard/settings` → Pohrana kvota) ili putem varijabli okruženja:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Postavka baze podataka ima prednost pred varijablom okruženja. Ako je `driver=redis`, ali URL nije naveden ili
`ioredis` nije instaliran, tvornica se vraća na SQLite i zapisuje upozorenje.

Redoslijed odabira upravljačkog programa:

1. Postavka baze podataka `quotaStore.driver`
2. Varijabla okruženja `QUOTA_STORE_DRIVER`
3. Zadano: `sqlite`

---

## Više dimenzija

Bazen može imati više dimenzija. Svaka dimenzija je neovisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Primjer: Codex plan** (5h% + tjedno%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Zahtjev mora zadovoljiti sve dimenzije da bi bio dopušten.

### Postotne dimenzije: atribucija po ključu

Postotni plan prijavljuje jednu brojku upotrebe po računu i prozoru plana. Davatelj ne daje brojač po API ključu.

Da bi se ta brojka podijelila između ključeva, svaki skup vodi knjigu atribucije po računu i prozoru plana. `src/lib/quota/percentLedger.ts` drži pravila knjige. `src/lib/quota/percentAttribution.ts` pretvara knjigu u brojeve koje koristi provedba. Rezultat je procjena sastavljena od tokena svake ključne rute.

#### Čitanja koja pokreću knjigu

Knjiga se kreće samo prema vlastitoj figuri pružatelja za traženi prozor plana. Ove veze izvješćuju o jednom:

| Davatelj                 | Plan prozora   |
| ------------------------ | -------------- |
| Claude, preko OAuth veze | `5h`, `weekly` |
| Codex                    | `5h`, `weekly` |

Ovo se ne računa kao čitanje:

- odgovor koji klijent davatelja označava kao ustajao
- Claude prozor čiji postotak pružatelj nije prijavio
- figura drugog prozora, ili u najgorem slučaju preko prozora
- povratno zaglavlje ograničenja brzine
- neuspjelo čitanje

Ostali pružatelji usluga, uključujući Claude s ključem API, nemaju knjigu. Svaki ključ se naplaćuje 0 na njihovu postotnu dimenziju, kao i prije ove promjene.

Očitavanje dijeli predmemoriju od 30 sekundi signala zasićenja. Očitanje Claude datirano je prema vremenu kada je brojka uočena u zaglavljima odgovora ili očitana s krajnje točke upotrebe, kada je to vrijeme poznato. Ostala očitanja datirana su prema vremenu kada je taj unos u predmemoriju napravljen.

#### Što knjiga čuva

Svaki snimljeni zahtjev dodaje svoje tokene, jednom, u brojač po skupu, računu i ključu. Brojač samo raste. Knjiga čuva tri stvari:

- osnovna linija: brojka kada se knjiga otvorila ili prozor zadnji put okrenuo
- zadnja primijenjena figura
- po ključu, njegov brojač tokena u tom istom trenutku, koji se naziva njegova oznaka

Knjiga se ažurira kada provedba ili način korištenja izračunaju atribuciju. Zapisi se uspoređuju i postavljaju na broj revizije. Pisac koji gubi, pokušava jednom ponovno pročitati.

#### Kako se izračunava dio ključa

Svaki dio ključa izračunava se kada se knjiga čita. Rast figure od osnovne linije dijeli se između ključeva proporcionalno žetonima koje je svaki preusmjerio od svoje oznake.

Together, ti tokeni objašnjavaju najviše jednu točku brojke po `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tokenima (zadano 1000). Rast koji ne objašnjavaju je vanjski. Osnovna linija je također vanjska.

Na primjer, knjiga se otvara na 0. Tipka A zatim usmjerava 900.000 tokena, a tipka B usmjerava 100.000. Kod brojke 60 dio A je 54 boda, a dio B 6.

Brojač ispod svoje oznake ključa ponovno se pokrenuo i broji do kraja. Ključ bez oznake, kao što je ključ koji se pridružuje skupu u sredini prozora, broji sve svoje žetone. Brojka koja zaostaje za žetonima uzrokuje pogrešku koja nestaje pri sljedećem očitavanju. Ne nakuplja se.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` se čita na svakoj atribuciji. Vrijednost koja nije konačan broj od najmanje 1 vraća se na 1000.

#### Kako čitanje mijenja knjigu

Primjenjuje se prvo pravilo podudaranja:

1. **Još nema knjige:** čitanje otvara knjigu. Njegov lik je osnovna linija i svaki brojač je označen.
2. **Starije štivo:** očitanje koje je datirano prije posljednjeg primijenjenog se zanemaruje. Isto vrijedi i za očitanje čije je vrijeme resetiranja više od 30 minuta ranije od pohranjenog.
3. **Novi prozor pružatelja usluga:** vrijeme resetiranja više od 30 minuta kasnije od pohranjenog okreće knjigu. Figura postaje osnovna linija i svaki se brojač ponovno označava. Ključevi bez brojača ostavljaju knjigu.
4. **Završeni prozor:** pohranjeno vrijeme resetiranja koje nije nakon vremena očitanja podataka znači da je taj prozor završio. Čitanje okreće knjigu, kakva god bila figura.
5. **Viša brojka:** pomiče se samo zadnja figura. Osnovna linija i oznake ostaju.
6. **Ista figura:** figura, osnovna linija i oznake ostaju. Napisano je samo vrijeme resetiranja koje knjizi nedostaje.
7. **Donja brojka:** niža brojka se nikada ne primjenjuje kao takva. Knjigu okreće samo kad vrijede tri stvari. Najmanje je dvije minute novije od posljednjeg primijenjenog očitanja. Ništa ne govori da je prozor isti otvoren. Niži je za više od jednog boda.

Prozor se računa kao isti otvoren kada tri stvari stoje. Poznata su oba vremena resetiranja. Nalaze se unutar 30 minuta jedno od drugog. Pohranjeni je još uvijek ispred očitanja. Niža brojka unutar tog prozora ne mijenja ništa.

Vrijeme resetiranja pohranjuje se samo dok je ispred vremena podataka očitanja koje ga nosi. Veća brojka pohranjuje svoje vrijeme ponovnog postavljanja očitanja kada je ono upotrebljivo, a u suprotnom zadržava pohranjeno vrijeme. Jednaka brojka bilježi vrijeme ponovnog postavljanja čitanja samo kada ga knjiga nema. Ne mijenja ništa drugo. Niža brojka koja ne okreće knjigu ne bilježi vrijeme resetiranja.

#### Kada se knjiga koristi

Nakon čitanja, knjiga se koristi osim ako njeno pohranjeno vrijeme resetiranja nije nakon trenutnog vremena. Taj slučaj nastaje kada se očitanje snimljeno neposredno prije resetiranja, kao što je ono posluženo iz predmemorije, promatra neposredno nakon njega.

Bez upotrebljivog čitanja, pohranjena knjiga se koristi samo dok još može biti knjiga trenutnog prozora. To vrijedi u dva slučaja:

- njegovo vrijeme resetiranja je poznato i još uvijek je ispred
- nema vrijeme resetiranja, a posljednje očitanje koje ga je promijenilo staro je najviše 15 minuta

Inače se ništa ne pripisuje, kao kad nema knjige. Knjiga čije je pohranjeno vrijeme resetiranja prošlo nikada se ne naplaćuje.

#### Ovrha

Potrošnja ključa na postotnoj dimenziji je njegov pripisani dio plus udio vanjskog dijela. Vanjski dio prvo koristi kapacitet bez zahtjeva za dodjelu (100 minus zbroj pondera). Samo se višak dijeli između ključeva po težini.

Ta se potrošnja uspoređuje s udjelom ključa kao i za bilo koju drugu dimenziju. Strogi način i dalje počinje kada signal zasićenja dosegne `QUOTA_SATURATION_THRESHOLD` (zadano 0,5). Svaki broj je skaliran efektivnim ograničenjem: ograničenje po računu pomnoženo s brojem računa u skupu.

Apsolutno ograničenje sa `capUnit: "percent"` računa samo dio pripisan ključu, skaliran na isti način. Uzmite ograničenje po računu od 100 i k računa. Gornja granica od N tada se dostiže kada ključni dio brojke računa za posluživanje dosegne N/k bodova. Svaki se račun provjerava prema vlastitoj knjizi. Na primjer, s dva računa, gornja granica od 10 doseže se na 5 bodova brojke jednog računa.

Kada se pohrana ne može pročitati, ništa se ne pripisuje i svaki ključ se naplaćuje 0 na toj dimenziji. Kada pisanje knjige ne uspije, ta atribucija koristi knjigu onako kako je pročitana. Neuspjelo pisanje tokena ostavlja tokene tog zahtjeva izvan knjige. Nijedan od ovih kvarova ne blokira zahtjev.

U `consent` skupu, formula za posuđivanje koristi potrošnju svakog ključa na postotnoj dimenziji kao što je gore opisano. Kada drugi ključ posuđuje, knjiga se čita jednom i pripisuje svakom ključu. Bez uporabne knjige svaki ključ se naplaćuje 0. Ključ s težinom tada prolazi, a ključ s težinom 0 prolazi samo kada drugi ključ posuđuje.

#### Ruta korištenja

`GET /api/quota/pools/{id}/usage` prijavljuje iste brojeve kroz istu funkciju. Postotna dimenzija ima jedan unos po vezi skupa u `accounts`. Njegovi `consumedTotal` i `perKey` najviše razine odražavaju prvi unos.

Ruta također primjenjuje trenutno čitanje, tako da može premjestiti knjigu kao što to čini zahtjev. `internal + external` se može razlikovati od `consumedTotal` kada nema upotrebljivog očitanja ili kada se ne primjenjuje niža brojka.

#### Pohranjivanje i zadržavanje

Obje trgovine kvota vode knjigu. Na SQLite, automatsko čišćenje baze podataka, kada je omogućeno, uklanja retke koji nisu ažurirani 60 dana. Na Redis, knjige i brojači veze skupa dijele jedan ključ. Ističe 60 dana nakon zadnjeg pisanja tokena ili promjene knjige. Knjiga koja se ne mijenja nije prepisana, pa je rubna granica postavljena iznad najdužeg prozora plana. Ručno resetiranje povijesti korištenja također briše knjige na SQLite (pogledajte Ograničenja).

#### Ograničenja

- Sav rast broja računa od osnovne linije dijeli se tokenima koje je svaki ključ od tada preusmjerio. Nije važno kada se taj rast dogodio.
- Dakle, korištenje izvan OmniRoute naplaćuje se ključevima do onoga što dopuštaju njihovi tokeni. To uključuje korištenje prije prvog zahtjeva ključa za prozor, kada je knjiga već bila otvorena.
- Na primjer, vanjska uporaba podiže račun za 60 bodova dok nema ključnih ruta. Ključ zatim usmjerava 30 000 žetona i brojka doseže 60,6.
- Ako je knjiga bila otvorena prije te upotrebe, dio ključa je 30 bodova. Također nosi 7,65 za vanjsku upotrebu, s četiri ključa težine 25.
- Ako se knjiga otvori nakon te upotrebe, 60 bodova je osnovna vrijednost. Dio tipke je 0,6 bodova, a nosi 15 vanjske upotrebe.
- Zahtjev ili posjet putu korištenja otvara knjigu. Stoga hoće li se takvo korištenje računati kao osnovno ovisi o tome kada je knjiga otvorena.
- Sa zadanim pragom, ključ koji usmjerava 60 000 tokena dok vanjska upotreba podiže račun za 60 bodova dobiva svih 60 kao svoj dio.
- S podom na 50.000, vlastiti dio iznosi 1,2 boda. Ostalih 58,8 su vanjski i pune se prema težini, kao i svaka vanjska uporaba.
- Postavite `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` blizu onoga što košta jedan bod na vašem planu. Vanjska upotreba uključuje promet na istom računu s ključeva izvan skupa.
- Ograničenje postotka primjenjuje se u svakom načinu rada. Ograničeni ključ može biti odbijen dok je račun daleko ispod praga zasićenja.
- Uzmite kapu od 10 i 12 bodova vanjske uporabe ranije u prozoru. Ključ koji usmjerava 20.000 tokena tada se odbija na računu od 12,4%.
- Podjela je procjena volumena tokena. Zahtjev se računa kao promptni tokeni plus tokeni završetka. Cache popusti i cijene modela ne mijenjaju taj broj.
- Zahtjev koji ne završava statusom 200 ne bilježi tokene. Primjeri su tok koji klijent prekida i uzvodna pogreška nakon što je korištenje potrošeno.
- Upotreba koju je uzrokovao takav zahtjev naplaćuje se ključevima koji su zabilježili tokene, do onoga što njihovi tokeni dopuštaju. Ostalo je vanjsko. Ne miče se natrag. Odgovor koji prijavljuje da nema upotrebe tokena ne bilježi ni tokene.
- Korištenje zahtjeva u tijeku može se prikazati u dijelu drugog aktivnog ključa za cijeli zahtjev. Vraća se samo kada zahtjev završi sa statusom 200.
- Upotreba koja je već na računu kada se knjiga otvori računa se kao vanjska. Ovo pokriva nadogradnju, novi skup i novi račun. Korištenje u novom prozoru prije njegovog prvog čitanja također se računa kao vanjsko.
- Svaki ključ počinje sa svojim težinskim udjelom te upotrebe, nakon kapaciteta bez zahtjeva za dodjelu. S jednim računom na 85% i pet ključeva težine 20, svaki počinje sa 17 od svojih 20 iskorištenih.
- U skupu s nekoliko računa, iznos računa koji poslužuje primjenjuje se na zbrojeni proračun. Ovo je knjiga nepromijenjena.
- Niža brojka unutar prozora koji pružatelj prijavljuje kao otvoren se ne primjenjuje. Vrijeme resetiranja koje se pomakne unatrag za više od 30 minuta tretira se kao staro očitanje.
- U oba slučaja knjiga zadržava svoje stanje dok ne prođe pohranjeno vrijeme resetiranja. Nakon toga, knjiga se ne naplaćuje dok se očitanjem ne okrene.
- Lijek je ručno resetiranje povijesti korištenja (`POST /api/settings/purge-usage-history`). Briše knjige atribucija i njihove brojače tokena u SQLite bazi podataka.
- Razdoblje `all` briše sve knjige i brojače. Kraće razdoblje najprije briše knjige koje nisu u njemu napisane. Zatim briše brojače koji nisu upisani u njemu, već samo za vezu s bazenom koja nema preostalu knjigu. Vodena knjiga i dalje označava svaki ključ u odnosu na njegov brojač.
- Knjiga čija se figura nije pomaknula ne prepisuje se, tako da kraće razdoblje također može očistiti knjigu trenutnog prozora. Sljedeće čitanje tada otvara novu knjigu na trenutnoj slici.
- Resetiranje ne dotiče pohranu Redis kvote. Tamo knjiga završava svojim prozorom ili ističe 60 dana nakon posljednjeg pisanja.
- Kada pružatelj ne pošalje vrijeme resetiranja, prozor koji se resetira i ponovno napuni iznad stare brojke između dva očitanja izgleda kao viša brojka. Knjiga zadržava staru osnovicu i oznake.
- Očitavanja su data prema lokalnom satu. Kada radi ispred davatelja ili izvor malo ranije prijavi vrijeme resetiranja, knjiga se može rano pojaviti na tu razliku.
- Rast u tom kratkom rasponu podijeljen je tokenima koji su u njemu usmjereni. Prvo čitanje sljedećeg prozora to ispravlja. Kada okrenuta knjiga ne sadrži vrijeme ponovnog postavljanja, za tu korekciju potrebna je niža brojka barem dvije minute novija od posljednjeg primijenjenog očitanja.
- Instance koje dijele Redis pohranjuju očitanja datuma s vlastitim satovima, stoga održavajte te satove sinkroniziranim. Očitavanja instance čiji sat kasni izgledaju starije i zanemaruju se.
- Kada nakon pohranjenog vremena resetiranja ne stigne upotrebljivo očitanje, postotni udjeli po ključu i postotna ograničenja ne primjenjuju se dok se očitanje ne vrati. Bez vremena ponovnog postavljanja, ovo počinje 15 minuta nakon posljednjeg čitanja koje je promijenilo knjigu.
- U trgovini Redis, knjiga koja nije korištena 60 dana može isteći između spisateljskog čeka i upisa. Zatim se ponovno stvara na reviziji iznad 1, što je važeće stanje.

---

## Razrješivač paketa

Implementiran u `src/lib/quota/planResolver.ts`.

Redoslijed prioriteta (od najvišeg prema najnižem):

1. **Ručna zamjena u bazi podataka** — tablica `provider_plans`, za svaki `connectionId`.
2. **Poznati katalog** — `src/lib/quota/planRegistry.ts` (samo podaci).
3. **Prazan paket** — nema dimenzija, potrebna je ručna konfiguracija.

### Poznati katalog

| Pružatelj             | Dimenzije                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nepoznato), `tokens/weekly`             |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nema zadanih vrijednosti — potrebna je ručna konfiguracija    |

---

## Integracija cjevovoda

### PRE kuka (`open-sse/handlers/chatCore.ts`)

Pokreće se prije uzvodnog izvršitelja, nakon provjere autentifikacije i pravila:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Otvoreno bez greške** : ako `enforceQuotaShare` izbaci, zahtjev je dopušten kroz `pino.warn` dnevnik. Ovo sprječava pogrešku motora kvota da blokira sav promet.

**Kada se kapacitet vrati.** Odbijanje kod udjela ključa ili kod plafona bazena završava s jednom od dvije rečenice, u oba načina posuđivanja:

- `percent` prozor: `. The <window> window resets at <time>.` Vrijeme je resetiranje izvješća pružatelja.
- Brojiva jedinica: `. Enough <window> usage is expected to clear by <time>.` Vrijeme je gornja granica iz kliznog prozora, ako ključ ne šalje ništa drugo.

`<time>` je ISO 8601 instant u UTC. Odbijanje tada nosi `Retry-After`: cijele sekunde do tog trenutka, plus jedan. Klijent koji toliko dugo čeka pokušava ponovno najviše jednu sekundu nakon trenutka. Kada trenutak nije poznat, odbijanje ne sadrži ni rečenicu ni naslov. Apsolutno odbijanje ograničenja ne nosi ni jedno ni drugo. Javni kod ostaje `quota_share_blocked`.

Odbijanje dijeljenja ne dotiče zajedničku vezu. Ne postavlja hlađenje, nema zaključavanja modela i ne kvara prekidača pružatelja usluga, a ostali ključevi skupa nastavljaju se posluživati. Kada svaka meta kombinacije odbije ključ za svoj dio, kombinacija odgovara 429 bez čekanja. Njegov odgovor nosi nagovještaj kao `Retry-After`. Putanja ugrađivanja završava svoje odbijanje istom rečenicom i ne šalje `Retry-After`.

### POST kuka (rekordna potrošnja)

Nakon uspješnog odgovora:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Bilješka o driftu** : ako `consume` ne odgovori nakon odgovora, valjani brojač broji manje. Signal zasićenja od pružatelja (npr. `anthropic-ratelimit-unified-5h-utilization`) ispravlja globalnu procjenu na sljedećem zahtjevu.

### Kombinirana blaga kazna (`open-sse/services/combo.ts`)

Kada `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Kazna se primjenjuje nakon svih ostalih faktora bodovanja. Smanjuje vjerojatnost automatskog kombiniranja odabira zasićenog ključa bez njegovog teškog blokiranja.

---

## UI Uputstvo

### `/dashboard/costs/quota-share` — Glavna stranica bazena

Komponente (sve u `src/app/(dashboard)/dashboard/costs/quota-share/`):

| komponenta             | Svrha                                                                         |
| ---------------------- | ----------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Uvodna kartica koja objašnjava dijeljenje kvota novim korisnicima             |
| `CreatePoolModal`      | Stvorite novi skup kvota (veza + ime + početne dodjele)                       |
| `PoolCard`             | Sažetak po skupu: naziv, veza, broj dodjele                                   |
| `DimensionBar`         | Složena traka po dimenziji: svaki ključ dijeli globalnu upotrebu +            |
| `AllocationTable`      | Tablica s potrošenim, poštenim udjelom, deficit/surplus, zastavom posudbe     |
| `BurnRateChart`        | EMA linijski grafikon stope sagorijevanja (lijeni Recharts putem `dynamic()`) |
| `EditAllocationsModal` | Uredite težine dodjele, ograničenja i pravila za skup                         |
| `BorrowModeField`      | Izbornik načina posuđivanja (`saturation` ili `consent`) u čarobnjaku         |
| `LendingBadge`         | Značka samo za čitanje na ključu koji posuđuje, samo u `consent` skupovima    |

Značka za posuđivanje pokazuje postotak i, kada je postavljen, rok u UTC s nazivom zone. Procjenjuje rok u trenutku snimke korištenja. Istekao ili nečitljiv rok prikazuje se kao `lending expired`.

Stranica se zakači:

- `usePools` — dohvaća `GET /api/quota/pools` svakih 30s.
- `usePoolUsage` — dohvaća `GET /api/quota/pools/[id]/usage` na zahtjev.
- `useLocalStoragePoolMigration` — se pokreće jednom prilikom montiranja za migraciju naslijeđenih LS podataka.

Korak ključeva čarobnjaka bazena ima `Show usage by member to key holders` okvir. Postavlja opciju `memberBreakdown` skupa (pogledajte [Člansko korištenje](#member-usage) ). Ispod njega, čarobnjak upozorava da netko tko zna koji je ključ korišten može povezati traku s tim ključem. Kad je okvir označen, tako piše kada korak navodi manje od tri ili više od 20 ključeva, jer trake tada ostaju skrivene. Broji ključeve u koraku i ne može reći koji od njih može postavljati zahtjeve.

### `/dashboard/costs/quota-share/plans` — Konfiguracija plana pružatelja usluga

- `ProviderPlanConfigClient.tsx`: padajući izbornik za odabir pružatelja, pregled riješenog plana (automatski iz kataloga ili ručno nadjačavanje) i uređivanje dimenzija.
- Promjene pišu u `PUT /api/quota/plans/[connectionId]`.
- Brisanje se vraća na katalog ili prazan plan.

---

## Samoposlužna kvota API (uključivanje)

`GET /api/v1/me/quota/{provider}` (također poslužuje se na `/v1/me/quota/{provider}`) omogućuje vlasniku API ključa da pročita, s vlastitim ključem, koliki je dio zajedničke pretplate njihov i što ih blokira. Ruta je tanka ljuska preko `src/server/selfService/quotaHandler.ts`; pogled je izgrađen od strane `src/lib/quota/selfView.ts` i njegov ugovor odgovora je `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` u `docs/openapi.yaml`).

### Omogućavanje i autentifikacija

- Oznaka značajke `QUOTA_SELF_PANEL`, zadana `false`. Dok je isključeno, zahtjev koji stigne do rute dobiva 404. Uz `REQUIRE_API_KEY=true`, API politika klijenta odbija ključ koji nedostaje ili nije valjan s 401 prije pokretanja rute, bez obzira na oznaku. Zahtjev bez ključa, ali prijavljena sesija nadzorne ploče prolazi to pravilo i dobiva vlastiti odgovor rute. Oznaka se rješava kao svaka druga zastavica (nadjačavanje nadzorne ploče ili REST, zatim varijabla okruženja istog imena); vidi [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Prikazno ime svakog skupa i oznaka svakog rasporeda vraćaju se vlasnicima ključeva skupa točno onako kako ih je administrator napisao. Prije uključivanja zastavice, provjerite jesu li prikladni za čitanje od strane tih držača ključeva.
- Ključ se čita samo iz zaglavlja: `Authorization: Bearer <key>` ili `x-api-key: <key>`. Kada su oba poslana, koristi se prvi koji potvrđuje. Ključ u nizu upita ili kolačić se zanemaruje. Ključ okruženja poslužitelja je odbijen (401).
- Ključ treba `self:usage` opseg (403 bez njega).
- Segment pružatelja se skraćuje, ispisuje malim slovima i provjerava u odnosu na `^[a-z0-9][a-z0-9._-]{0,63}$` (inače 400), zatim se rješava kroz registar pružatelja, tako da pseudonim kao što je `cc` čita `claude` skupove. `claude` i `anthropic` čitaju iste bazene.

### Što pokazuje svaka vidljivost

| Vidljivost    | Zahtijeva                                                                        | Polja                                                                                                                                                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vlastiti udio | `self:usage`                                                                     | `pools[]` (ref, naziv, pružatelj, politika, težina, ograničenje), `dimensions[].yourShare`, `accounts[]` sa `yourShare` (na `percent` prozoru bez `attributed` i `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                      |
| Razina računa | `self:usage` + `self:account-quota`, a pružatelj u `sharedQuotaProviders` ključa | dodaje `dimensions[].total`, `accounts[].dimensions[].account` i `accounts[].modelWindows`, `attributed` i `external` na `yourShare` `percent` prozora i `members` na skup s uključenom upotrebom članova (pogledajte [Upotrebu članova](#member-usage) ) |

- `sharedQuotaProviders` je postavka po ključu (`PUT /api/keys/[id]/self-service`): `null`, zadana vrijednost, znači da svaki pružatelj do kojeg ključ dođe; `[]` znači nijedan. `accountVisible` svakog bazena govori koja se vidljivost odnosi na njega.
- Trake računa i prozori modela prikazuju se samo za račune čiju vezu ključ može koristiti. Kada ključ ima popis dopuštenih veza, račun izvan njega zadržava svoj `Account N` unos bez `account` ili `modelWindows`. Prazna lista znači da nema ograničenja, kao za `/v1/me/status`. Ukupni skup (`dimensions[].total`) ne ovisi o tom popisu.
- Dvije figure prikazane samo sa `self:usage` potječu iz upotrebe drugih ključeva. `exhausted` proračuna rasporeda odražava potrošnju svakog ključa prema tom rasporedu. U skupu čije su sve težine nula, `weight` ključa je `100 / number of members`. Oba su ono što se provedba primjenjuje na ključ.
- Skup se identificira samo pomoću `ref`, neprozirne vrijednosti vezane za pozivni ključ. Njegovo ime za prikaz (`name`) uključeno je onako kako ga je administrator napisao. `ref` se izvodi iz ključa i skupa s tajnom API-ključa poslužitelja (`API_KEY_SECRET`). Klijenti je ne smiju ustrajati: ona se mijenja ako se ta tajna rotira.
- Računi su navedeni kao `Account 1`, `Account 2`, … u skupnom redoslijedu. Ne vraća se ID skupa, ID veze, e-pošta računa ili naziv računa, a odgovor prolazi kroz shemu ugovora, koja ispušta sva polja izvan nje.
- Brojive jedinice (`requests`, `tokens`, `usd`) prijavljene su kao spremnik skupa koji provodi kvota: `limit` = ograničenje plana × računi u skupu, `fairShare` = težina / 100 × `limit` (jednaka podjela kada je svaka težina 0), `consumed` = vlastiti brojač ključa u spremištu kvota, `remaining` = `fairShare` − `consumed`, spušten na 0.
- `blocks.schedules` navodi prozore rasporeda ključa (`open`/`closed`, `blackout` ili `outside-window`, `retryAfterSeconds`, rezervni katovi i je li proračun prozora potrošen); `blocks.modelCaps` navodi svoja ograničenja po satu s potrošnjom po modelu.
- Ključ izvan svakog skupa pružatelja dobiva 200 sa `pools: []`; `availableModels` ( `qtSd/` ID-ovi koje ključ vidi u `/v1/models`), `expiresAt` i `apiBaseUrl` su još uvijek popunjeni.
- `apiBaseUrl` je `OMNIROUTE_PUBLIC_API_BASE_URL`, zatim `OMNIROUTE_PUBLIC_BASE_URL`, inače `null`. To nikada nije izvor samog zahtjeva.

### `status` i `reason`

| `status`      | Značenje                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Trenutno čitanje.                                                                                                                                                                                                                                                                                                                                                               |
| `stale`       | Očitavanje računa u predmemoriji označeno kao ustajalo ili ono čije je vrijeme ponovnog postavljanja prošlo od čitanja. Brojevi se čuvaju. Jedan prozor modela čije je vrijeme resetiranja prošlo označava cijelu `modelWindows` grupu `stale`. Za vlastiti udio ključa u `percent` prozoru: knjiga je pročitana bez čitanja računa u predmemoriji vrata da bi se to potvrdilo. |
| `unavailable` | Nema čitanja; brojevi su `null`, nikad `0`. `reason` kaže zašto.                                                                                                                                                                                                                                                                                                                |

| `reason`                          | Kada                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Pohranu kvota nije moguće pročitati ili ne može pročitati knjige o atribuciji.                                               |
| `percent_attribution_unavailable` | Vlastiti udio ključa u `percent` prozoru: još ne postoji knjiga atribucije za taj račun i prozor ili knjiga ne navodi ključ. |
| `percent_window_ended`            | Vlastiti udio ključa u `percent` prozoru: knjiga pripada prozoru plana koji je završio.                                      |
| `account_not_used_by_key`         | Vlastiti udio ključa u `percent` prozoru: veza računa je izvan dopuštenih veza ključa. Njegova knjiga nije čitana.           |
| `window_not_reported`             | Predmemorija ograničenja pružatelja nema očitanja za taj prozor plana.                                                       |
| `connection_lookup_failed`        | Veza računa nije se mogla pročitati.                                                                                         |
| `not_supported`                   | OmniRoute ne može čitati ograničenja korištenja za pružatelja računa.                                                        |
| `fetch_failed`                    | Nije bilo upotrebljivog predmemoriranog čitanja i osvježavanje ograničenja pružatelja nije uspjelo.                          |
| `not_available`                   | Očitavanje ne sadrži prozore upotrebe ili račun uopće nema očitanje.                                                         |

Kada se pohrana kvote ne može pročitati, polja `blocks` podržana pohranom ( `exhausted` proračuna rasporeda, `consumed` i `reached` ograničenja modela) također su `null`.

### Pristanak na posudbu

`PATCH /api/v1/me/quota/{provider}` bilježi vlastiti pristanak pozivnog ključa za jedan skup. Koristi zastavu, zaglavlja i pravila pružatelja usluge `GET`. Opseg `self:usage` dopušta ovo pisanje, iako se njegovo ime čita kao samo za čitanje.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` je `ref` koji `GET` vraća za taj skup.
- `lendingPercent` je cijeli broj od 0 do 100. Vrijednost 0 briše privolu i njen rok. Tijelo sa `lendingPercent` 0 prihvaća se u oba načina.
- `lendingUntil` nije obavezan: epoha milisekundi ili `null` ako nema roka. Mora biti u budućnosti i najviše 8640000000000000. Vrijednost ispod 100000000000 čita se kao sekunde i odbija se.
- Svako drugo polje se odbija. Tijelo duže od 4096 bajtova se odbija. Čitanje se zaustavlja na toj veličini, tako da se duže tijelo nikada ne drži cijelo.

Provjere se izvode prema redoslijedu ove tablice. Svako odbijanje koristi standardno tijelo pogreške s fiksnom porukom. Odbijanje jedne od ovih provjera ne piše ništa.

| Status | Poruka                                                                                             | Kada                                                                 |
| ------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Zastavica `QUOTA_SELF_PANEL` je isključena.                          |
| 401    | `Valid API key required`                                                                           | Ključ nedostaje ili je nevažeći ili je ključ okruženja poslužitelja. |
| 403    | `API key lacks the self:usage scope`                                                               | Ključu nedostaje `self:usage`.                                       |
| 400    | `Invalid provider`                                                                                 | Segment pružatelja nije važeći.                                      |
| 429    | `Too many lending changes. Retry later.`                                                           | Ključ je prešao svoje ograničenje. Odgovor nosi `Retry-After`.       |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Tijelo nije JSON, predugo je ili ne odgovara shemi.                  |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Rok se čita kao sekunde.                                             |
| 400    | `lendingUntil must be in the future`                                                               | Rok je u ili prije vremena zahtjeva.                                 |
| 404    | `Pool not found`                                                                                   | `ref` ne imenuje skup ovog ključa za ovog pružatelja usluga.         |
| 403    | `Lending is not enabled for this pool`                                                             | Skup je u `saturation` modu i `lendingPercent` je iznad 0.           |
| 500    | `Failed to build quota view`                                                                       | Svaki drugi neuspjeh. Njegov uzrok je zapisan na poslužitelju.       |

Ograničenje je 20 zahtjeva po 60 sekundi za svaki ključ. Svaki zahtjev koji prođe provjeru pružatelja računa se, čak i onaj koji je kasnije odbijen ili onaj koji ništa ne mijenja. Ima vlastiti brojač, osim ograničenja brzine zahtjeva ključa.

Zahtjev koji mijenja pohranjeni pristanak upisuje jedan `quota.pool.lending.updated` revizijski zapis. Imenuje ključ sa starim i novim vrijednostima. Isto tijelo dvaput poslano jednom piše i jednom revidira. Odgovor je 200 s punim `GET` prikazom, izgrađenim nakon pisanja.

Prikaz `GET` izvještava o posuđivanju na sljedeći način:

- Svaki skup nosi `borrowMode` (`saturation` ili `consent`), i vlastiti `lendingPercent` i `lendingUntil` ključa.
- `lendingActive` je `true` samo u `consent` skupu, s postotkom iznad 0 i nedostignutim rokom.
- U `consent` skupu, svaki prebrojivi `dimensions[].yourShare` nosi `borrowAvailable`. To je ono što ključ sada može koristiti iznad svog udjela, posuđenog od drugih ključeva.
- `borrowAvailable` koristi formulu vrata. Čita svaki drugi ključ, čak i dok je ključ pod njegovom dionicom. Za `hard` ključ koji je jedno dodatno čitanje po drugom ključu i prebrojivoj dimenziji, paralelno.
- `borrowAvailable` je `null` za `soft` ili `burst` ključ, a `null` kada čitanje ne uspije.
- `borrowAvailable` je jedna brojka za sve ostale ključeve zajedno. U skupini od dva ključa to je vlastita figura drugog ključa.
- `borrowAvailable` još nije prijavljen za `percent` windows ili u `accounts[]`.
- U `saturation` skupu prikaz izvješćuje o pohranjenom pristanku sa `lendingActive: false` i bez `borrowAvailable`.

### Greške

Svaki odgovor ove rute, uspjeh ili greška, nosi `Cache-Control: no-store`. Odbijanje koje se dogodi prije pokretanja rute ne nosi je, na primjer politika API klijenta 401 ili filtar IP 403. Pogreške rute koriste standardno tijelo pogreške s fiksnom porukom: 400 (nevažeći pružatelj), 401 (nedostaje ili nevažeći ključ), 403 (nedostaje `self:usage`), 404 (isključena zastavica) i 500 (`Failed to build quota view`). 500 pokriva svaki neuspjeh nakon što zahtjev stigne do rute, uključujući samo traženje ključa; njegov uzrok je zapisan na poslužitelju i nikad se ne vraća. Pogreške `PATCH` navedene su u [Suglasnosti za posudbu](#lending-consent).

### Ograničenja

- `remaining` je dio pravednog udjela ključa koji nije iskoristio. To nije jamstvo. Ključ se još uvijek može poslužiti iza njega dok bazen ima mjesta. Jednom kad ukupni skup skupa dosegne `limit`, svaki ključ skupa se odbija, bez obzira na vlastiti `remaining`, a ključ bez `self:account-quota` ne može vidjeti taj ukupni iznos.
- `remaining` ne uzima u obzir apsolutni `cap` dodjele. Izvršenje odbija ključ nakon što vlastita potrošnja u prozoru jedinice ograničenja dosegne vrijednost ograničenja.
- Traka na razini računa dolazi iz predmemorije ograničenja pružatelja usluga i može odgoditi odluku o provedbi za nekoliko minuta. Očitanje čije je vrijeme resetiranja prošlo prijavljuje se kao `stale`.
- Prozori po modelu (`modelWindows`) prijavljeni su samo za pružatelje koji imaju preslikavanje plana i prozora: Claude i Codex danas. Za druge pružatelje usluga `modelWindows` je i dalje prisutan kada se prikazuju podaci o računu, s praznim popisom `windows`.
- Vlastiti udio ključa u `percent` prozoru je procjena. Dolazi iz knjige atribucija i nosi sva ograničenja navedena pod "Postotne dimenzije: atribucija po ključu" iznad.
- `consumed` je broj koji se uspoređuje s pravednim udjelom. Točno je `attributed` plus `external`. `attributed` je dio koji knjiga daje ključ za tokene koje je preusmjerila. `external` je dio upotrebe računa ključa koji ključevi skupa ne uzimaju u obzir.
- Oba dijela se šalju samo kada je `accountVisible` skupa istinit: ključ ima `self:account-quota`, a pružatelj je u svom `sharedQuotaProviders`. Ključ bez njega dobiva samo `consumed`, s istim `status` i `reason`.
- S oba dijela i vlastitom težinom, držač može izračunati korištenje izvan bazena koje se naplaćuje na ključeve bazena. Vlasnik s opsegom računa već vidi ukupni iznos računa.
- Ključ koji nije usmjerio ništa u prozoru još uvijek može pročitati svoj vanjski naboj iz `consumed`, jer je njegov pripisani dio tada 0.
- Na primjer, knjiga se otvara na 0, s ključevima A i B težine 50 svaki. Ključ A usmjerava 900.000 tokena, a ključ B 100.000. Račun tada dosegne 60% ograničenja od 100. Tada je `attributed` 54 za ključ A i 6 za ključ B, a `external` je 0 za oba.
- Pogled čita knjigu i nikada ne piše svoje stanje. Ne otvara knjigu i nikada ne traži čitanje od pružatelja usluga. Sa Redis pohranom, čitanje uklanja zamijenjena polja revizije u pozadini, kao što to čine čitanja vrata.
- Dijeljenje je `ok` samo dok predmemorija vrata čuva očitanje računa. Bez njega je `stale`, pa se u skupu bez nedavnog zahtjeva prikazuje kao moguće zastarjelo.
- Dok zahtjev ne prođe kroz skup, dionica je nedostupna. Taj zahtjev otvara knjigu, a iznos računa u tom trenutku računa se kao korištenje izvan bazena.
- U skupu s nekoliko računa, svaki unos računa koristi vlastitu knjigu tog računa i ograničenje jednog računa. Ovrha mjeri obje strane prema broju računa, tako da je omjer isti.
- Prozori po modelu nemaju udio za ključ. Knjiga ne čuva podatke po modelu.
- Rezervni katovi rasporeda ne procjenjuju se pogledom: raspored se može prikazati kao `open` dok je zahtjev odbijen s razlogom `schedule-reserve`.
- Kada dva skupa istog ključa dijele vezu, provedba primjenjuje jedan od njih, a prikaz navodi oba.
- Ne postoji ograničenje po adresi za neuspjele pokušaje ključa: pozivatelji iza obrnutog proxyja mogu dijeliti jednu adresu (ovisi o tome jesu li proslijeđene adrese klijenata pouzdane), tako da zaključavanje može uskratiti rutu do svakog vlasnika ključa. Uz `REQUIRE_API_KEY=true`, API politika klijenta odbija nevažeći ključ prije pokretanja rute, s tijelom 401 te politike umjesto ove rute.

### Člansko korištenje

Administrator može dopustiti vlasnicima ključeva da vide kako se korištenje prozora dijeli između članova grupe. Opcija je `memberBreakdown` bazena, isključena prema zadanim postavkama. Postavlja se u čarobnjaku za bazen ili pomoću `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` i `GET /api/quota/pools/{id}` to prijaviti.

Dimenzija pogleda nosi `members` samo kada sve ovo vrijedi:

- uključena je opcija bazena
- bazen ima najviše 20 dodijeljenih ključeva, a najmanje tri od njih mogu postavljati zahtjeve: aktivan, neopozvan, nije zabranjen i nije im istekao
- `accountVisible` bazena je istinit: ključ ima `self:account-quota` i pružatelj je u svom `sharedQuotaProviders`
- na `percent` prozoru, veza računa je ona koju ključ može koristiti
- vlastiti udio ključa u tom prozoru je očitan: njegov `status` nije `unavailable`

Inače `members` ne postoji. Nikada nije prazna lista.

- Svaka kriška je `{ slot, consumed, isYou }`. Shema odgovora odbija bilo koja druga svojstva na odsječku i popis od više od 20 odsječaka. Isječci su navedeni redom utora.
- Postoji jedan odsječak po dodijeljenom ključu, uključujući ključ koji više ne može postavljati zahtjeve. Član bez koristi pokazuje pravu nulu.
- Utor 1 je uvijek traženi ključ, sa `isYou` istinitim. Ostali brojevi utora su rangovi ključnog hash-a. Ima ključ `API_KEY_SECRET` i pokriva skup, tražeći ključ i člana.
- Dakle, brojevi se ne slažu između nositelja. Za jednog nositelja ostaju isti između posjeta. Mogu se promijeniti kada se ključ pridruži ili napusti skup, ili kada se ta tajna rotira.
- Na prebrojivom prozoru odsječak je brojač člana u spremištu kvota, isti brojač kao i njegov vlastiti `consumed`.
- Na `percent` prozoru isječak je `attributed` dio člana, iz iste knjige koja se čita kao vlastiti udio ključa. Upotreba izvan bazena nikada se ne dijeli na kriške. Taj naboj je podijeljen prema težini, tako da bi kriške koje su ga nosile pokazivale težinu.
- Svaki prikaz čita jednu vrijednost po drugom članu i prebrojivom prozoru, paralelno. Na `percent` prozoru kriške ne koštaju čitanje osim čitanja vlastite knjige dionice. Kada se jedna vrijednost ne može pročitati, taj prozor nema `members`, a vlastiti udio ključa ostaje.
- Opcija i broj upotrebljivih ključeva čitaju se jednom po skupu i samo za ključ koji može vidjeti podatke računa. Neuspješno čitanje opcije ili broja upotrebljivih ključeva isključuje trake za taj bazen. Poslužitelj bilježi upozorenje, a ostatak prikaza je izgrađen.

Šipke nemaju imena ni identifikacijske oznake. Još uvijek vlasniku ključa govore stvari o drugim članovima:

- Nositelji još uvijek mogu usporediti rezove po njihovim vrijednostima.
- Stabilno numeriranje omogućuje nositelju da prati jednog člana tijekom vremena.
- Broj odsječaka pokazuje koliko je ključeva dodijeljeno u skupu.
- U grupi od tri ključa, netko tko zna što je jedan ključ koristio može reći što je posljednji ključ koristio.
- Kada bazen padne ispod tri upotrebljiva ključa, trake nestaju. Raniji pregledi još uvijek pokazuju što je svaki član koristio.
- U prozoru koji se može prebrojiti, ukupni skup minus odsječci može pokazati korištenje ključeva koji više nisu dodijeljeni.
- Član koji prikazuje nulu na jednom računu i korištenje na drugom može pokazati koji član koristi koji račun.
- U prebrojivom skupu s politikom `hard`, dio koji prestaje rasti na poštenom udjelu člana ukazuje na težinu tog člana.

### Serija upotrebe (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (također služi na `/v1/me/usage`) vraća korištenje i cijenu vlastitih zahtjeva ključa za pozivanje: ukupne vrijednosti, jedan unos po UTC danu, po danu i modelu, po modelu i po davatelju usluga. Dijeli zastavu, pravila provjere autentičnosti, opseg `self:usage`, `Cache-Control: no-store` i ponašanje pogreške gornje rute kvote. Ključ se provjerava prije `range`. Pogreške su 400 (`Invalid range`), 401, 403, 404 i 500 (`Failed to build usage`).

- `range` je jedan od `1d`, `7d`, `30d` (zadano) ili `90d`. Bilo koja druga vrijednost, prazna vrijednost ili ponovljeni parametar je 400. Skup se zaustavlja na `90d` da ograniči cijenu poziva. Prikaz čita samo neobrađenu povijest korištenja, nikad dnevne sažetke, koji ne sadrže ključ.
- Redovi su odabrani ID-om pozivne tipke. Stupac naziva ključa nikada se ne podudara, a retci snimljeni bez ID-a ključa nikada se ne broje.
- Izgradnja niza pokreće pet grupiranih upita preko redaka ključa u prozoru. Izgrađeni niz ponovno se koristi 60 sekundi po ključu i rasponu, a ponovno korišteni poziv ne pokreće se. Njegova `generatedAt` daje njegovu starost.
- Prozor završava kada je serija izgrađena. Redak utisnut kasnije, na primjer zbog krivljenja sata, ne računa se.
- `coverage.retentionDays` je operatorova neobrađena postavka zadržavanja povijesti korištenja (`retention.usageHistory` u postavkama baze podataka). `coverage.truncatedByRetention` je istinit kada je traženi raspon duži od te postavke. Uspoređuje dva broja i ne provjerava nedostaju li redi.
- Davatelj se vraća kao što je zabilježeno za vlastite zahtjeve ključa. Model je zabilježeno ime nakon zadnjeg `/`, a retci su grupirani po njemu. Kombinirani zahtjev čiji je svaki cilj odbijen bilježi se s oznakom usmjeravanja kao pružateljem (kombinirani naziv, `auto` ili `combo`) i nizom modela koji je klijent poslao. Drugi odbijeni zahtjevi, na primjer otvorenim prekidačem, hlađenjem modela ili preskakanjem parkiranog kvote, zadržavaju ciljnog pružatelja usluga i model.
- Osim brojeva i troškova, odgovor nosi prosječnu latenciju, stopu uspješnosti i vrijeme prvog i zadnjeg zahtjeva.
- `byModel` navodi 50 parova pružatelja usluga i modela s najviše zahtjeva. S više parova njegovi unosi ne zbrajaju `summary`, a `summary.uniqueModels` broji svaki snimljeni pravopis modela. `byModelTruncated` je tada istinit, a model čiji parovi padaju s obje strane reza pokazuje djelomične ukupne zbrojeve.
- Prijavljena su dva troška. `costUsd` je naplaćeni trošak, kao što pokazuju analize korištenja. Davatelji paušalne pretplate, kao što je plan Claude Code, tamo računaju 0 USD. `listPriceUsd` je ista upotreba po cijeni u maloprodaji, uključujući pretplate. Zahtjev čiji model nema red s cijenom broji svoj pohranjeni trošak: trošak koji je prijavio pružatelj ili onaj koji je izračunat kada je zahtjev zabilježen. Samo zahtjev s niti jednim broji 0, bez markera, tako da zbroj može biti djelomičan.
- Odgovorni ugovor je `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` u `docs/openapi.yaml`).

### Samoposlužna stranica

Kada je `QUOTA_SELF_PANEL` uključen, `/quota/{provider}` je javna stranica. Vlasnik ključa tamo upisuje API ključ i vidi skupove tog ključa za pružatelja. Svaki skup prikazuje jednu kartu po prozoru bazena, s korištenjem bazena za sve i vlastitim udjelom ključa. Svaki račun u bazenu ima svoje kartice, s korištenjem računa i udjelom ključa. Upotreba računa pojavljuje se samo kada ključ može vidjeti podatke računa. Stranica također navodi ograničenja po modelu za svaki račun i vlastitu upotrebu ključa. Obavijest se pojavljuje kada raspored trenutno blokira ključ. Kartica navodi svaku kapicu ključa po modelu s njegovom upotrebom i označava one dosegnute. `{provider}` je ID pružatelja usluga ili njegov alias (`/quota/claude`, `/quota/cc`). Nepoznati pružatelj i svaka `/quota/*` staza dok je zastavica isključena, odgovor 404. Skupovi na prilagođenom OpenAI- ili Anthropic-kompatibilnom čvoru nemaju stranicu. API i dalje odgovara umjesto njih.

Stranica nema sesiju. Ključ se šalje samo u `Authorization` zaglavlju `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` i `GET /api/v1/me/usage`, nikada u URL. Ključ koji poslužitelj prihvaća čuva se u `sessionStorage`-u kartice. Uz "Zapamti na ovom uređaju" umjesto toga se čuva u `localStorage`, a "Zaboravi ključ" uklanja ga iz oba. Ključ koji poslužitelj odbije uklanja se iz pohrane.

Skup u `consent` načinu rada prikazuje karticu za posuđivanje. Tamo vlasnik ključa postavlja cijeli postotak od 0 do 100 udjela mirovanja ključa za posuđivanje. Nositelj također bira koliko dugo privola traje: do isključivanja, 1 sat, 8 sati, 24 sata, 7 dana ili 30 dana. Trajanje se računa od trenutka spremanja. Dok je rok na snazi, nositelj ga može zadržati. Ako taj rok prođe prije spremanja, kartica ne šalje ništa i traži drugi izbor. S 0% rok se ne šalje. Kartica prikazuje pohranjeni rok s nazivom vremenske zone. Suglasnost čiji je rok istekao prikazuje se kao okončana.

Za `hard` ključ kartica također navodi, po prozoru bazena, koji drugi ključevi trenutno posuđuju ključu. Svaki red je jedna figura za sve ostale ključeve zajedno. U skupini od dva ključa to je vlastita figura drugog ključa. Brojka koju pogled ne prijavljuje čita se kao nedostupna, a ne kao nula. Za `soft` ili `burst` ključ kartica kaže da se ne primjenjuje nikakva brojka.

Skup u `saturation` načinu rada čiji ključ pohranjuje postotak iznad 0 pokazuje samo povlačenje. Kaže da pohranjeni postotak tamo nema učinka. Njegov gumb za povlačenje šalje 0 bez roka. Skup u `saturation` načinu rada s pohranjenom 0 ne pokazuje karticu za posuđivanje. Nakon spremanja, kartica koja vraćenom prikazu više ne treba ostaje sa svojom porukom dok se ponovno ne promijeni prikaz stranice.

Ništa nije spremljeno dok nositelj ne pritisne Spremi ili Povuci. Svaki pritisak šalje jedan `PATCH /api/v1/me/quota/{provider}` zahtjev, a drugi pritisak ne šalje ništa dok je prvi na čekanju. Tijelo nosi bazenski neprozirni `ref` od pogleda, postotka i roka. Odgovor je ponovno izgrađeni prikaz kvote, a stranica ga prikazuje bez drugog čitanja. Kada se dva spremanja preklapaju, stranica čita kvotu jednom nakon zadnjeg odgovora. Stranica ne čuva privolu u pohrani preglednika.

Odbijena promjena objašnjena je na kartici tekstom odabranim iz HTTP statusa. Tijelo pogreške nije pročitano. 401 kaže da ključ nije prihvaćen i ponovno učitava kvotu. 403 kaže da skup ne prihvaća promjene kredita, a 404 kaže da je skup nestao. Oba nude gumb koji ponovno učitava kvotu. Odgovor 400 ili neki drugi 4xx traži od nositelja da provjeri postotak i rok. 429 traži od nositelja da pričeka, sa sekundama `Retry-After` kada ih odgovor da. Odgovor 5xx, 408 ili greška mreže govori da promjena možda nije spremljena i zadržava unesene vrijednosti. Odgovor izvan ugovora ponovno učitava kvotu. Neuspješno spremanje ne uklanja ključ samo po sebi. Kada se ponovno učitavanje nakon njega odbije, stranica uklanja ključ kao i kod svakog odbijenog čitanja.

Nakon što je ključ prihvaćen, stranica također prikazuje karticu "Postavite svoje alate" s tri kartice. "Claude kod" daje `env` blok za `~/.claude/settings.json`. "Shell" daje iste varijable kao `export` linije. "Claude Desktop" daje vrijednosti za svoj prozor za zaključivanje treće strane. Modeli su modeli dijeljenja kvota koje ključ može zahtijevati za tog pružatelja usluga. Kada takav popis ne dolazi s ključem, blok umjesto toga uključuje otkrivanje modela pristupnika. Adresa pristupnika javno je API porijeklo koje poslužitelj prijavljuje (`OMNIROUTE_PUBLIC_API_BASE_URL`, zatim `OMNIROUTE_PUBLIC_BASE_URL`). Kad nijedno nije postavljeno, kartica prikazuje rezervirano mjesto i govori nositelju da pita administratora. Ključ je prikazan kao rezervirano mjesto. "Uključi moj ključ" stavlja cijeli ključ u tekst na ekranu i u ono što gumb za kopiranje kopira. To traje dok se okvir ne izbriše, ključ se zaboravi ili zamijeni ili se stranica ostavi. Kartica ne šalje zahtjeve i ne nudi preuzimanje datoteke.

Očitavanje API označava `stale` prikazano je kao moguće zastarjelo. Očitanje koje označava `unavailable` prikazuje se sa svojim razlogom, nikad kao nula.

Na postotnim planovima stranica izvlači vlastiti udio ključa kada API to prijavi. Kaže da je broj procjena i imenuje njegova dva dijela. Ograničenja po modelu prikazuju samo račun.

Kada prozor nosi `members`, njegova kartica također prikazuje traku s jednim segmentom po članu, u redoslijedu utora. Segment traženog ključa koristi boju naglaska. Ostali segmenti kruže kroz boje grafikona teme. Legenda teksta navodi svaki segment s njegovom vrijednošću, tako da ništa ne ovisi o boji. Segmenti su označeni `You` ili `Member N`, gdje je N utor.

### Namjenski priključak za stranicu

`QUOTA_PANEL_PORT` otvara drugog slušatelja koji služi samo samoposlužnu stranicu. Isključeno je osim ako je varijabla postavljena. `QUOTA_PANEL_HOST` je adresa vezanja i zadana je `127.0.0.1`.

Slušatelj prosljeđuje ove putove glavnom portu i odgovara 404 za svaki drugi put:

| Put                                                                      | Poslužuje                            |
| ------------------------------------------------------------------------ | ------------------------------------ |
| `/quota/{provider}`                                                      | Stranica                             |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Prikaz kvote koju stranica čita      |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Serija korištenja koju stranica čita |
| `/_next/static/`                                                         | Skripte, stilovi i fontovi izrade    |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikone                                |

`GET` i `HEAD` se prenose bez tijela. Također se prosljeđuje jedan zahtjev s tijelom: `PATCH` staze pogleda kvote, koji stranica šalje kako bi spremila izbor posudbe. Bilo koja druga metoda odgovara 404, osim CONNECT zahtjeva, čija je veza zatvorena bez odgovora. Svaki drugi zahtjev koji deklarira tijelo odgovara 404 i njegova veza je zatvorena. Zahtjevi za nadogradnjom se odbijaju i njihova se veza prekida. Staza s točkastim segmentom ili markerom fragmenta se odbija, kao na API priključku. Kao i cilj zahtjeva sa znakom izvan ASCII koji se može ispisati. Neobrađeni kontrolni znak u cilju dobiva odgovor 400 od strane HTTP parsera, prije vlastite provjere ovog porta. Zaglavlja zahtjeva koja okvir rezervira za vlastitu upotrebu nisu proslijeđena: imena koja počinju s `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` ili `x-next-`, te imena `x-matched-path` i `next-resume`. Zahtjev se prosljeđuje bez njih. Kontrolna ploča, stranica za prijavu, API za upravljanje i rute zaključivanja ne mogu se pristupiti preko ovog priključka.

`PATCH` mora nositi `Content-Type: application/json`, bez parametra ili samo sa `charset=utf-8`. Mora sadržavati jedan `Content-Length` od 1 do 4096, napisan kao obične znamenke, a ne `Transfer-Encoding`. `PATCH` koji krši jedno od ovih pravila odgovara 404. Na neke krivo oblikovane duljine, kao što je predznak ili ponovljena, HTTP parser odgovara 400 prije vlastite provjere ovog priključka. Port čita deklarirane bajtove prije nego što kontaktira glavni port i čeka ih najviše 5 sekundi. Tijelo koje do tada nije potpuno odgovara na 404 i njegova veza se prekida. Ništa ne stiže do glavne luke u tom slučaju ili kada klijent prvi ode. Port prenosi točno deklarirane bajtove, s istim `Content-Length`. Bajtovi nakon njih čitaju se kao sljedeći zahtjev na vezi. TLS obrnuti proxy ispred mora proslijediti `Content-Length` i ne smije ponovno dijeliti tijelo zahtjeva. Glavni port provjerava API ključ u `Authorization` zaglavlju, kao i za `GET`.

Tijelo 404 je `{"error":"not_found","message":"Not found."}`. Neuspjeli relej odgovara 502 (`api_bridge_unavailable`) ili 504 (`api_bridge_timeout`) bez polja `detail`.

Slušatelj ne čita `QUOTA_SELF_PANEL` i ne okreće stranicu. Dok je zastavica isključena, stranica i njezin API odgovaraju 404 na glavnom portu, a slušatelj prenosi taj odgovor.

Pod razvojnim poslužiteljem (`next dev`), stranica ne postaje interaktivna kroz ovaj priključak. Razvojni hot-reload socket je zahtjev za nadogradnju, a luka ga odbija. Koristite glavni priključak tijekom razvoja.

Port služi obični HTTP, a stranica šalje API ključeve. Zadržite zadanu adresu vezanja i stavite obrnuti proxy sa TLS ispred nje. Adresa vezanja koja nije povratna petlja bilježi ovu obavijest:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Peer povratne petlje koji ne šalje zaglavlje za prosljeđivanje računa se kao lokalni na glavnom priključku. Dakle, proxy na istom hostu mora poslati `X-Forwarded-For`. Proxy na privatnoj adresi je pouzdan za to zaglavlje samo sa `OMNIROUTE_TRUST_PROXY=private` (ili `lan`). Bilo koji drugi peer prijavljen je adresom svoje veze, a zaglavlja za prosljeđivanje koje je poslao se ispuštaju.

Slušatelj ima najviše 256 veza odjednom. Klijent ima 10 sekundi za slanje zaglavlja zahtjeva i 30 sekundi za slanje cijelog zahtjeva. Neaktivna održavana veza zatvara se nakon otprilike 5 sekundi. Veza bez aktivnosti 60 sekundi je zatvorena. Ove vrijednosti su fiksne. Također postavite ograničenja veze i brzine na obrnutom proxyju ispred. Obrnuti proxy ispred trebao bi zadržati neaktivne uzvodne veze kraće od 5 sekundi ili ih ne koristiti ponovno. Relej prema glavnom priključku koristi uzvodno vremensko ograničenje API priključka (`API_BRIDGE_*`).

Slušatelj se također pokreće kada `API_PORT` nije postavljen. `QUOTA_PANEL_PORT` mora biti port od 1 do 65535, napisan samo znamenkama. Mora se razlikovati od priključka na nadzornoj ploči i API priključka. Dok je live WebSocket poslužitelj uključen, također se mora razlikovati od `LIVE_WS_PORT` (zadano 20132). Bilo koja druga vrijednost ne otvara ništa i bilježi upozorenje. Upozorenje o odbijenoj vrijednosti imenuje varijablu i ne ponavlja vrijednost. Port koji je već u upotrebi ne otvara ništa i bilježi ovo upozorenje:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Sa postavljenim `OMNIROUTE_BASE_PATH`, slušatelj očekuje svaki gornji put ispod tog prefiksa. Koristite isti `OMNIROUTE_BASE_PATH` za vrijeme izgradnje i za vrijeme izvođenja. Napišite s kosom crtom na početku i bez kose crte na kraju, na primjer `/omniroute`. Drugi oblik, uključujući `/` i `/omniroute/`, ostavlja priključak isključen s upozorenjem, iako verzija prihvaća te oblike. Isto tako i osnovni put čiji prvi segment imenuje rutu aplikacije: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` ili `connect`, u svakom slučaju.

Ograničenja:

- `/quota/{provider}/` s kosom crtom na kraju odgovara 404 na ovom priključku.
- Uslužni radnik i manifest web-aplikacije ne poslužuju se na ovom priključku.
- Prilagođeni favicon postavljen na nadzornoj ploči nije prikazan na ovom priključku.
- Ikone se ne prikazuju kada se aplikacija izvodi pod osnovnom stazom.
- Luka govori običan HTTP/1.1.
- Povezivanje koje ne uspije ne pokušava se ponovno sve dok se proces ponovno ne pokrene.
- Slušatelj nema vezu ili ograničenje brzine po adresi klijenta.
- Postavke spremnika nisu obuhvaćene ovim odjeljkom.

---

## Varijable okoline

| Varijabilna                          | Zadano               | Opis                                                                                  |
| ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`             | Upravljački program za korištenje: `sqlite` ili `redis`                               |
| `QUOTA_STORE_REDIS_URL`              | _(prazan)_           | Redis URL, npr `redis://localhost:6379`                                               |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`                | 0..1; `>= threshold` aktivira strogi način rada                                       |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`               | Tokeni koji objašnjavaju najviše jedan bod postotnog prozora plana                    |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`                | 0..1; množitelj za kombinirani rezultat meke politike                                 |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`                 | Nekoliko dana prije nego što GC ukloni stare `quota_consumption` spremnike            |
| `QUOTA_PANEL_PORT`                   | _(nije postavljeno)_ | Namjenski priključak za samouslužnu stranicu. Nepostavljeno znači da nema slušatelja. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`          | Povežite adresu za taj port                                                           |

DB postavke (`quotaStore.*`) nadjačavaju env vars.

---

## Rješavanje problema

### Redis je konfiguriran, ali se ne povezuje

Provjerite je li `ioredis` instaliran (`npm ls ioredis`) i je li
`QUOTA_STORE_REDIS_URL` dostupan. U slučaju neuspjelog povezivanja tvornica se
vraća na SQLite (bilježi se na razini `warn`).

### `peek` vraća zastarjele podatke / dopušta pristup u slučaju pogreške

Ako `peek` izazove iznimku, `enforceQuotaShare` tretira rezultat kao „dopusti”
(dopuštanje pristupa u slučaju pogreške). Provjerite zapise sustava `pino` za
unose `quota:enforce` i `quota:factory` kako biste utvrdili osnovni uzrok.

### Odstupanje brojača potrošnje

Ako se stvarna potrošnja kod pružatelja usluge razlikuje od brojača, to je
očekivano — klizni prozor s 2 segmenta ima pogrešku od približno 1 % na
granicama prozora, a `consume` se nakon odgovora izvršava bez čekanja na
rezultat. Signal zasićenja (`saturationSignals.ts`) očitava stvarnu iskorištenost
pružatelja usluge uz TTL od 30 s i u skladu s tim prilagođava
`globalUsedPercent`.

### Skup prikazuje „nema podataka” za stopu potrošnje

`computeBurnRate` zahtijeva najmanje 2 povijesna uzorka. Novi skupovi bez
prethodnih poziva `consume` prikazivat će `tokensPerSecond: 0` i
`timeToExhaustionMs: null`.

---

## Migracija s localStoragea

Pri prvom učitavanju `/dashboard/costs/quota-share`, hook `useLocalStoragePoolMigration`
provjerava:

1. `localStorage.getItem("omniroute:quota-share:pools")` nije prazan.
2. `GET /api/quota/pools` vraća `[]` (DB je prazan).

Ako su oba uvjeta ispunjena, svaki naslijeđeni skup šalje se skupno na `POST /api/quota/pools`,
nakon čega se uklanja ključ iz localStoragea. Migracija je idempotentna: uvjet 2 sprječava
ponovnu migraciju.

---

## Interna klasifikacija strategije

`quota-share` je strategija usmjeravanja **isključivo za internu upotrebu** (`INTERNAL_ROUTING_STRATEGY_VALUES` u
`src/shared/constants/routingStrategies.ts`). Upotrebljavaju je isključivo sistemski generirane
kombinacije skupova `qtSd/` te je namjerno izostavljena iz `ROUTING_STRATEGY_VALUES` kako se nikada
ne bi pojavila kao opcija koju korisnik može odabrati u korisničkom sučelju ili API-ju.

---

## Pokrivenost testa

Dva sloja automatizirane pokrivenosti isporučuju se s motorom dijeljenja kvota:

| Suite                 | Naredba                                                                | Što pokriva                                                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedinica (29 testova) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR planer, saturation gating, concurrency limits, fairShare math, backlog queuing                                                                                                                                 |
| Integracijska matrica | `npm run test:combo:matrix`                                            | Odluka o usmjeravanju s kraja na kraj kroz pravi kombinirani cjevovod; DRR pravednost + zasićenost deprioritizacija putem live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integracijska matrica radi u CI zajedno sa sve 22 javne strategije. Jedinica se može pokrenuti samostalno.

---

## DB Sažetak sheme

Tri tablice dodane migracijama `078`, `079` i `085`:

- `quota_pools` + `quota_allocations` — definicije bazena i dodjele po ključu.
- `quota_consumption` — kotrljajući brojači s 2 kante po `(apiKeyId, dimensionKey)`.
- `provider_plans` — ručna nadjačavanja plana pružatelja (dimenzije JSON po connectionId).

Sve tablice dodane putem idempotentnih `CREATE TABLE IF NOT EXISTS` migracija.

Posudba uz suglasnost dodaje tri stupca: `quota_allocations.lending_percent` (cijeli broj, zadano 0), `quota_allocations.lending_until` (milisekunde epohe ili `NULL` bez roka) i `quota_pools.borrow_mode` (zadano `saturation`). Njegova migracija samo dodaje ove stupce i ne upisuje postojeći redak.

Knjiga postotka atribucije dodaje `quota_percent_ledger` (jedan red po skupu, računu i prozoru plana) i `quota_percent_ledger_tokens` (jedan brojač tokena po skupu, računu i API ključu). `src/lib/db/quotaPercentLedger.ts` čita i zapisuje.
