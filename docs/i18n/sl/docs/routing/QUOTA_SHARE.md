# Quota Sharing Engine (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referenca dokumenta**: `docs/routing/QUOTA_SHARE.md`
> Del skupine B (načrta 16 + 22).

---

## Pregled

Mehanizem za deljenje kvot pravično porazdeli časovno omejeno kvoto ponudnika (npr. Codexovo
5-urno okno, Kimijevih 1500 zahtev/h) med več ključev API, ki si delijo isto
povezavo.

**Težava, ki jo rešuje:** OmniRoute posreduje zahteve več ključev API istemu računu
pri zunanjem ponudniku. Brez logike deljenja lahko naval zahtev ključa A izčrpa
ponudnikovo kvoto za tekočo uro, zaradi česar ključa B in C ostaneta blokirana do ponastavitve okna.
Mehanizem to preprečuje tako, da:

1. Spremlja drsečo porabo vsakega ključa po posameznih dimenzijah (%, zahteve, žetoni, $).
2. Uporablja algoritem pravičnega deleža z učinkovito izrabo zmogljivosti: ključ si lahko izposodi neizkoriščene
   deleže, dokler skupni bazen ni nasičen.
3. Uveljavi rezultat na kritični poti (`chatCore.ts`), preden zahteva
   doseže izvajalnik zunanjega ponudnika.

---

## Algoritem: poštena delitev dela-ohranjanje

Implementirano v `src/lib/quota/fairShare.ts`.

### Načini

| Pogoj                                      | Način           | Vedenje                                                              |
| ------------------------------------------ | --------------- | -------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Velikodušen** | Ključ si lahko izposodi do globalne omejitve minus skupno porabljeno |
| `globalUsedPercent >= saturationThreshold` | **Strogo**      | Strogo uveljavljajte pravičen delež posameznikov                     |

Privzeti `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Ta dva načina opisujeta bazen v privzetem načinu izposoje, `saturation`. Bazen v načinu `consent` vedno uporablja stroga pravila, ne glede na nasičenost. Glejte [Posojanje s soglasjem (priglasitev na skupino)](#consented-lending-per-pool-opt-in).

### Odločitev glede na dimenzijo

Za vsako aktivno dimenzijo v skupini motor izračuna:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Za dimenzije `percent` `consumed` namesto tega prihaja iz knjige dodeljevanja (glejte [Odstotne dimenzije: dodeljevanje po ključu](#percent-dimensions-per-key-attribution) ).

Nato:

- **`policy = hard`** : če `consumed > fairShareAllowed` in je način strog →** blok** .
- **`policy = soft`** : če `consumed > fairShareAllowed` in je način strog →** kaznovati** (deprioritizirajte v kombinaciji; nikoli trdo blokirajte).
- **`policy = burst`** : dovoli, medtem ko obstaja globalna višina ne glede na pošten delež.

### Cap absoluto

`capValue` + `capUnit` na dodelitvi je trda zgornja meja, neodvisna od načina ali politike. Katera koli dimenzija, kjer je vedno `consumed >= capValue`** bloki** zahteva. Pri kapici `percent` je `consumed` samo del, ki je pripisan ključu.

### Večdimenzionalno preverjanje

Zahteva je blokirana, če** katerikoli** dimenzija v bazenu bi ga blokirala. Dimenzije so neodvisne — 5h% izčrpanost ne vpliva na tedensko % dimenzijo.

### Izposoja

V velikodušnem načinu lahko ključ, katerega dodelitev je premalo porabljena, uporabi presežek iz nedodeljenih deležev drugih ključev. Formula je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kjer `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` za to dimenzijo) je vedno trd strop.

### Posojanje s soglasjem (izbira na skupino)

Vsak bazen ima način izposoje. `saturation` je privzet in ohranja zgornja pravila. V načinu `consent` ključ `hard` prenese svoj delež samo znotraj zmogljivosti, ki so jo drugi ključi odobrili. Skrbnik nastavi način vsakega bazena. Vsak imetnik ključa določi svoje soglasje prek [soglasja za posojanje](#lending-consent).

Soglasje je odstotek od 0 do 100 in izbirni rok v milisekundah epohe. Ključ posodi ta odstotek svojega neuporabnega deleža, medtem ko je rok v prihodnosti.

Za eno dimenzijo je `L` efektivna omejitev: omejitev načrta je pomnožena z računi v skupini. Vrata za zahtevani ključ izračunajo:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` je utež ključa ali `100 / n` za vsak ključ, če nobena utež ni višja od 0. `lend_k` je aktivni odstotek ključa in 0 po preteku njegovega roka. Lastno soglasje ključa, ki zahteva, nikoli ne šteje. Ključ `hard` je zavrnjen, ko njegova poraba doseže svoj delež plus `borrowAvailable`.

Zmogljivosti, ki je ni zahtevana dodelitev (100 minus vsota uteži), ni mogoče posoditi. Noben ključ se ni strinjal, da bi ga posodil.

**Primer.** `L` je 1000.

| Ključ | Teža | Delite | Porabljeno | Posoja |
| ----- | ---- | ------ | ---------- | ------ |
| A     | 50   | 500    | 530        | 0%     |
| B     | 30   | 300    | 100        | 50%    |
| C     | 0    | 0      | 60         | 0%     |

- B posodi 50 % svojih nedejavnih 200, kar je 100. C je že vzel 60 nad svoj delež. A si lahko izposodi 40.
- A je postrežen pri 530 in zavrnjen, ko njegova poraba doseže 540.
- Preden je C uporabil karkoli, z A na njegovem deležu ali manj, si je C lahko izposodil 100.
- Preden je C uporabil karkoli, si je A pri 530 lahko izposodil 70.

**Ničelna teža.** Ključ s težo 0 ima delež 0. Služi le, dokler je njegova poraba nižja od tiste, ki jo posojajo drugi. Ko nihče ne posodi, je zavrnjen že ob prvi prošnji.

**Roki.** Nobenemu opravilu v ozadju ne poteče soglasje. Vsaka zahteva primerja rok s svojim časom in rok, ki je enak temu času, je potekel. Shranjeni rok, ki ni končno število ali je po največjem datumu, ki ga lahko vsebuje `Date`, se šteje kot pretečen.

**`soft` in `burst`.** Posojanje jih ne omejuje. Ključ `soft` se razveljavi, ko preseže svoj delež. Ključ `burst` prehaja, medtem ko ima bazen prostor. Zgornja meja bazena še vedno zavrača vsak ključ, ko skupni znesek bazena doseže svojo mejo.

**Stroški na poti zahteve.** Bazen `saturation` ne bere nič več kot prej. V bazenu `consent` števna dimenzija bere druge ključe samo za ključ `hard`, ki je enak ali višji od njegovega deleža, medtem ko drug ključ posoja. Nato vzporedno izvede eno branje na drug ključ. Neuspešno branje se šteje kot poraba 0 za ta ključ. Dimenzija `percent` ne dodaja branja, ker knjiga pripisovanja vsebuje vse ključe.

**Urejanje bazena.** Urejanje ohrani soglasje ključev, ki ostanejo. To velja za urejanje dodelitev, zamenjave na ravni skupine in klice `ensure`. Odstranjeni ključ izgubi soglasje, ključ, ki je dodan nazaj, pa se začne pri 0. Skrbniške poti vrnejo soglasje vsakega ključa in ga nikoli ne zapišejo. Preklop skupine nazaj na `saturation` ohrani vse shranjene privolitve, ki v tem načinu nimajo učinka. Ponovni preklop skupine na `consent` ponovno aktivira shranjena soglasja, katerih rok še ni potekel. Imetnik ključa lahko počisti shranjeno privolitev v katerem koli načinu.

**Nadgradnja.** Če stolpca `lending_percent` in `lending_until` že obstajata, selitev doda samo `borrow_mode`, shranjeni odstotki pa ostanejo takšni, kot so. Vsak bazen se zažene v načinu `saturation`. V čarovniku za bazen vklopite `consent` na bazen. Iz shranjenih vrednosti ni sklepanih ničesar.

**Omejitve.**

- Posojilodajalec lahko najde zgornjo mejo sklada, preden porabi svoj delež. Zmogljivost, ki so si jo izposodili drugi, se šteje k skupni vrednosti sklada.
- Preverjanje poteka pred zahtevo in ne rezervira ničesar. Sočasne zahteve preberejo porabo, preden se katera koli zabeleži, tako da se posojena zmogljivost lahko porabi več kot enkrat, omejena z zahtevami v letu. Preverjanje skupne rabe načina `saturation` ima enako lastnost.

---

## Števec z drsečim oknom

Implementirano v `src/lib/quota/sqliteQuotaStore.ts` in `redisQuotaStore.ts`.

Dve vedri za vsak `(apiKeyId, dimensionKey)`:

- `curr`: trenutno vedro (`floor(nowMs / windowMs)`)
- `prev`: prejšnje vedro (`curr - 1`)

Efektivna drseča vrednost:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Natančnost**: približno 99-odstotna. Napaka znaša največ 1 % velikosti okna na
meji med vedroma (kar je neločljivo povezano z aproksimacijo z dvema vedroma).

### Sočasnost

Gonilnik SQLite: pomnilniška medsebojna izključitev za vsak ključ `(apiKeyId | dimensionKey)` preprečuje
tekmo med branjem, spreminjanjem in pisanjem. Vzorec posnema zaščito pred stampedom iz `src/sse/services/auth.ts`.

Gonilnik Redis: skript Lua EVAL za atomsko povečanje — izvede se kot en sam ukaz Redis.

---

## Gonilniki

### SQLite (privzeto, brez namestitve)

- Tabela: `quota_consumption` (glejte migraciji `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najprimernejši za uvedbe z enim primerkom.
- Vsi trajni podatki so shranjeni v obstoječi zbirki podatkov SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (izbirno, več primerkov)

- Zahteva paket npm `ioredis`.
- Števci so shranjeni v Redis; metapodatki (skladi/dodelitve) ostanejo v SQLite.
- Najprimernejši za uvedbe z več replikami, kjer morajo biti števci skupni.

### Preklapljanje gonilnikov

Prek uporabniškega vmesnika z nastavitvami (`/dashboard/settings` → Shramba kvot) ali prek okoljskih spremenljivk:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavitev zbirke podatkov ima prednost pred okoljsko spremenljivko. Če je `driver=redis`, vendar URL manjka ali paket `ioredis` ni nameščen, tovarna preklopi nazaj na SQLite in zabeleži opozorilo.

Vrstni red izbire gonilnika:

1. Nastavitev zbirke podatkov `quotaStore.driver`
2. Okoljska spremenljivka `QUOTA_STORE_DRIVER`
3. Privzeto: `sqlite`

---

## Večrazsežnost

Bazen ima lahko več dimenzij. Vsaka dimenzija je neodvisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Primer: načrt Codex** (5h% + tedensko%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Zahteva mora izpolnjevati vse dimenzije, da je dovoljena.

### Odstotne dimenzije: dodeljevanje po ključu

Odstotni načrt poroča o eni številki uporabe na račun in okno načrta. Ponudnik ne daje števca na ključ API.

Da bi to številko razdelili med ključe, vsaka skupina vodi knjigo dodeljevanja za posamezen račun in okno načrta. `src/lib/quota/percentLedger.ts` drži pravila knjige. `src/lib/quota/percentAttribution.ts` pretvori knjigo v številke, ki jih uporablja pregon. Rezultat je ocena, sestavljena iz žetonov vsake ključne poti.

#### Branje, ki premakne knjigo

Knjiga se giblje samo po lastni številki ponudnika za zahtevano okno načrta. Te povezave poročajo o enem:

| Ponudnik                   | Načrtujte okna |
| -------------------------- | -------------- |
| Claude prek povezave OAuth | `5h`, `weekly` |
| Codex                      | `5h`, `weekly` |

To se ne šteje za branje:

- odgovor, ki ga odjemalec ponudnika označi kot zastarel
- okno Claude katerega odstotka ponudnik ni sporočil
- slika drugega okna ali v najslabšem primeru čez okna
- nadomestna glava omejitve hitrosti
- neuspešno branje

Drugi ponudniki, tudi Claude z API ključem, nimajo knjige. Vsak ključ se zaračuna 0 glede na odstotek dimenzij, kot pred to spremembo.

Odčitek si deli 30-sekundni predpomnilnik signala nasičenosti. Odčitek Claude je datiran s časom, ko je bila številka opažena v glavah odgovorov ali prebrana s končne točke uporabe, ko je ta čas znan. Drugi odčitki so datirani s časom, ko je bil ta vnos v predpomnilnik zgrajen.

#### Kaj knjiga hrani

Vsaka zabeležena zahteva enkrat doda svoje žetone v števec na skupino, račun in ključ. Števec samo raste. Knjiga hrani tri stvari:

- osnovna črta: številka, ko se je knjiga odprla ali okno nazadnje obrnilo
- zadnja uporabljena številka
- na ključ, njegov števec žetonov v istem trenutku, imenovan njegova oznaka

Knjiga se posodobi, ko uveljavljanje ali pot uporabe izračuna dodelitev. Zapisi se primerjajo in nastavljajo na številko revizije. Pisatelj, ki izgubi, znova poskusi enkrat pri novem branju.

#### Kako se izračuna del ključa

Vsak del ključa se izračuna, ko se knjiga bere. Rast figure od osnovne črte je razdeljena med ključe sorazmerno z žetoni, ki jih je vsak usmeril od svoje oznake.

Together ti žetoni pojasnjujejo največ eno točko številke na žeton `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (privzeto 1000). Rast, ki je ne razložijo, je zunanja. Osnovna linija je tudi zunanja.

Na primer, knjiga se odpre pri 0. Tipka A nato usmeri 900.000 žetonov, tipka B pa 100.000. Pri številki 60 je A-jev del 54 točk, B-jev del pa 6.

Števec pod oznako ključa se je znova zagnal in šteje v celoti. Ključ brez oznake, na primer ključ, ki se pridruži skupini na sredini okna, šteje vse svoje žetone. Številka, ki zaostaja za žetoni, povzroči napako, ki izgine pri naslednjem branju. Ne kopiči se.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` se bere pri vsaki atribuciji. Vrednost, ki ni končno število vsaj 1, pade nazaj na 1.000.

#### Kako branje spremeni knjigo

Velja prvo pravilo ujemanja:

1. **Ni še knjige:** branje odpre knjigo. Njegova figura je osnovna črta in vsak števec je označen.
2. **Starejše branje:** odčitek z datumom pred zadnjim uporabljenim se ne upošteva. Enako velja za odčitek, katerega čas ponastavitve je več kot 30 minut pred shranjenim.
3. **Novo okno ponudnika:** čas ponastavitve več kot 30 minut kasneje od shranjenega obrne knjigo. Figura postane osnovna črta in vsak števec je ponovno označen. Ključi brez števca zapustijo knjigo.
4. **Končano okno:** shranjen čas ponastavitve, ki ni po času odčitavanja podatkov, pomeni, da se je to okno končalo. Branje obrne knjigo, ne glede na njeno figuro.
5. **Višja številka:** premakne se le zadnja figura. Osnovna črta in oznake ostanejo.
6. **Ista številka:** številka, osnovna linija in oznake ostanejo. Napisan je le čas ponastavitve, ki knjigi manjka.
7. **Spodnja slika:** nižja številka se kot taka nikoli ne uporabi. Knjigo obrne šele, ko držijo tri stvari. Je vsaj dve minuti novejši od zadnjega uporabljenega odčitka. Nič ne pove, da je okno enako odprto. Je več kot eno točko nižja.

Okno se šteje kot enako odprto, ko držijo tri stvari. Znana sta oba časa ponastavitve. Drug od drugega sta oddaljena 30 minut. Shranjeni je še vedno pred odčitkom. Nižja številka znotraj tega okna ne spremeni ničesar.

Čas ponastavitve je shranjen le, ko je pred časom podatkov odčitka, ki ga nosi. Višja številka shrani svoj čas ponastavitve odčitka, ko je ta uporabna, in ohrani shranjenega v nasprotnem primeru. Enaka številka beleži čas ponastavitve svojega branja le, če ga knjiga nima. Ne spremeni nič drugega. Nižja številka, ki ne obrne knjige, ne beleži časa ponastavitve.

#### Ko je knjiga uporabljena

Po branju se knjiga uporabi, razen če njen shranjeni čas ponastavitve ni po trenutnem času. Ta primer nastane, ko je odčitek, vzet tik pred ponastavitvijo, na primer iz predpomnilnika, opazen takoj za njo.

Brez uporabnega branja se shranjena knjiga uporablja samo, dokler je še lahko knjiga trenutnega okna. To velja v dveh primerih:

- njegov čas ponastavitve je znan in še pred nami
- nima časa ponastavitve, zadnji odčitek, ki ga je spremenil, pa je star največ 15 minut

Sicer se nič ne pripisuje, kot takrat, ko knjige ni. Knjiga, katere shranjeni čas ponastavitve je potekel, se nikoli ne zaračuna.

#### Izvrševanje

Poraba ključa na odstotni dimenziji je njegov pripisani del plus delež zunanjega dela. Zunanji del najprej uporabi zmogljivost brez zahtevkov za dodelitev (100 minus vsota uteži). Le presežek se razdeli med ključe po teži.

Ta poraba se primerja s pravičnim deležem ključa kot pri kateri koli drugi dimenziji. Strogi način se še vedno zažene, ko signal nasičenosti doseže `QUOTA_SATURATION_THRESHOLD` (privzeto 0,5). Vsako število je prilagojeno efektivni omejitvi: omejitev na račun, pomnožena s številom računov v skupini.

Absolutna zgornja meja z `capUnit: "percent"` šteje samo del, ki je pripisan ključu, skalirano na enak način. Upoštevajte omejitev na račun 100 in k računov. Zgornja meja N je nato dosežena, ko ključni del številke servirnega računa doseže N/k točk. Vsak račun se preveri glede na svojo knjigo. Na primer, z dvema računoma je zgornja meja 10 dosežena pri 5 točkah številke enega računa.

Ko shrambe ni mogoče prebrati, se nič ne pripiše in vsak ključ se na tej dimenziji zaračuna 0. Ko pisanje knjige ne uspe, to pripisovanje uporabi knjigo, kot je bila prebrana. Neuspelo pisanje žetona izloči žetone te zahteve iz knjige. Nobena od teh napak ne blokira zahteve.

V skupini `consent` formula posojanja uporablja porabo vsakega ključa na odstotni dimenziji, kot je opisano zgoraj. Ko drug ključ posodi, se knjiga prebere enkrat in pripiše vsakemu ključu. Brez uporabne knjige se vsak ključ zaračuna 0. Ključ s težo nato preide, ključ s težo 0 pa le, ko drug ključ posodi.

#### Pot uporabe

`GET /api/quota/pools/{id}/usage` poroča iste številke prek iste funkcije. Odstotna dimenzija ima en vnos na povezavo bazena v `accounts`. Njegova `consumedTotal` in `perKey` na najvišji ravni odražata prvi vnos.

Pot uporablja tudi trenutno branje, tako da lahko knjigo premakne naprej, kot to počne zahteva. `internal + external` se lahko razlikuje od `consumedTotal`, če ni uporabnega odčitka ali če nižja vrednost ni uporabljena.

#### Shranjevanje in hramba

Obe trgovini s kvotami vodita knjigo. Na SQLite samodejno čiščenje baze podatkov, ko je omogočeno, odstrani vrstice, ki niso posodobljene 60 dni. Na Redis si knjige in števci povezave bazena delijo en ključ. Poteče 60 dni po zadnjem zapisu žetona ali spremembi knjige. Knjiga, ki se ne spreminja, ni prepisana, zato je meja postavljena nad najdaljšim načrtom. Ročna ponastavitev zgodovine uporabe počisti tudi knjige na SQLite (glejte Omejitve).

#### Omejitve

- Vsa rast številke računa od osnovne vrednosti se razdeli na žetone, ki jih je od takrat preusmeril vsak ključ. Kdaj se je ta rast zgodila, ni pomembno.
- Torej se uporaba zunaj OmniRoute zaračuna ključem do vrednosti, ki jo omogočajo njihovi žetoni. To vključuje uporabo pred prvo zahtevo ključa po oknu, ko je bila knjiga že odprta.
- Na primer, zunanja uporaba poveča račun za 60 točk, medtem ko ni ključnih poti. Ključ nato usmeri 30.000 žetonov in številka doseže 60,6.
- Če je bila knjiga odprta pred to uporabo, je del ključa 30 točk. Ima tudi 7,65 za zunanjo uporabo, s štirimi ključi teže 25.
- Če se je knjiga odprla po tej uporabi, je 60 točk izhodišče. Del ključa je 0,6 točke, nosi pa 15 zunanje uporabe.
- Zahteva ali obisk poti uporabe odpre knjigo. Ali se takšna uporaba šteje kot osnovna vrednost, je torej odvisno od tega, kdaj se je knjiga odprla.
- S privzetim pragom dobi ključ, ki usmeri 60.000 žetonov, medtem ko zunanja uporaba dvigne račun za 60 točk, vseh 60 kot svoj del.
- Pri dnu pri 50.000 je njegov lastni del 1,2 točke. Drugih 58,8 je zunanjih in se polni po teži, kot vsaka zunanja uporaba.
- Nastavite `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` blizu vrednosti ene točke v vašem načrtu. Zunanja uporaba vključuje promet na istem računu s ključev zunaj bazena.
- V vsakem načinu velja odstotna omejitev. Omejeni ključ je mogoče zavrniti, medtem ko je račun daleč pod pragom nasičenosti.
- Prej v oknu vzemite zgornjo mejo 10 in 12 točk zunanje uporabe. Ključ, ki usmerja 20.000 žetonov, je nato zavrnjen pri vrednosti računa 12,4 %.
- Razdelitev je ocena glede na količino žetona. Zahteva se šteje kot žetoni za poziv in žetoni za dokončanje. Popusti za shranjevanje in cene modelov ne spremenijo tega števila.
- Zahteva, ki se ne konča s statusom 200, ne beleži žetonov. Primera sta tok, ki ga odjemalec prekine, in napaka navzgor po uporabi.
- Uporaba, ki jo je povzročila taka zahteva, se zaračuna ključem, ki so posneli žetone, do tistega, kar njihovi žetoni dovoljujejo. Ostalo je zunanje. Ne premakne se nazaj. Odgovor, ki ne poroča o uporabi žetona, prav tako ne zabeleži nobenih žetonov.
- Uporaba zahteve v teku se lahko prikaže v delu drugega aktivnega ključa za celotno zahtevo. Nazaj se premakne šele, ko se zahteva konča s statusom 200.
- Uporaba že na računu, ko se knjiga odpre, se šteje kot zunanja. To zajema nadgradnjo, nov bazen in nov račun. Kot zunanja se šteje tudi uporaba v novem oknu pred njegovim prvim branjem.
- Vsak ključ se začne s svojim utežnim deležem te uporabe, za zmogljivostjo brez zahtevkov za dodelitev. Z enim računom pri 85 % in petimi ključi s težo 20 se vsak začne s 17 od svojih 20 uporabljenih.
- V skupini z več računi se številka servirnega računa uporabi za seštevek proračuna. To je s knjigo nespremenjeno.
- Spodnja številka znotraj okna, ki ga ponudnik prijavi kot odprto, se ne uporabi. Čas ponastavitve, ki se premakne nazaj za več kot 30 minut, se obravnava kot stari odčitek.
- V obeh primerih knjiga ohrani svoje stanje, dokler ne mine shranjeni čas ponastavitve. Po tem se knjiga ne zaračuna, dokler je branje ne obrne.
- Rešitev je ročna ponastavitev zgodovine uporabe (`POST /api/settings/purge-usage-history`). Počisti knjige dodeljevanja in njihove števce žetonov v bazi podatkov SQLite.
- Obdobje `all` počisti vse knjige in števce. Krajše obdobje najprej počisti knjige, ki v njem niso bile napisane. Nato počisti števce, ki niso vpisani v njem, ampak samo za povezavo bazena, ki nima več nobene knjige. Vodena knjiga še vedno označuje vsak ključ proti svojemu števcu.
- Knjiga, katere številka se ni premaknila, se ne prepiše, tako da lahko krajše obdobje počisti tudi knjigo trenutnega okna. Naslednje branje nato odpre novo knjigo na trenutni številki.
- Ponastavitev se ne dotakne shrambe kvote Redis. Tam se knjiga konča s svojim oknom ali poteče 60 dni po zadnjem zapisu.
- Ko ponudnik ne pošlje časa ponastavitve, je okno, ki se ponastavi in ponovno napolni nad staro številko med dvema odčitkoma, videti kot višja številka. Knjiga ohranja stare temelje in oznake.
- Odčitki so datirani po lokalni uri. Ko teče pred ponudnikom ali vir poroča o času ponastavitve nekoliko zgodaj, se lahko knjiga prej obrne na to razliko.
- Rast v tem kratkem razponu je razdeljena z žetoni, usmerjenimi v njej. Prvo branje naslednjega okna to popravi. Ko obrnjena knjiga ne vsebuje časa ponastavitve, ta popravek potrebuje nižjo številko, ki je vsaj dve minuti novejša od zadnje uporabljene vrednosti.
- Primerki, ki si delijo Redis shranjujejo odčitke datuma s svojimi urami, zato naj bodo te ure sinhronizirane. Odčitki primerka, katerega ura zaostaja, so videti starejši in so prezrti.
- Če po shranjenem času ponastavitve ne pride noben uporaben odčitek, se odstotni deleži in omejitve odstotkov na ključ ne uveljavijo, dokler se odčitek ne vrne. Brez časa ponastavitve se to začne 15 minut po zadnjem branju, ki je spremenilo knjigo.
- V trgovini Redis lahko knjiga, ki ne deluje 60 dni, poteče med pisateljskim čekom in pisanjem. Nato se znova ustvari pri reviziji nad 1, kar je veljavno stanje.

---

## Razreševalnik paketov

Implementiran v `src/lib/quota/planResolver.ts`.

Prednostni vrstni red (od najvišje do najnižje):

1. **Ročna preglasitev v zbirki podatkov** — tabela `provider_plans`, za vsak `connectionId`.
2. **Znani katalog** — `src/lib/quota/planRegistry.ts` (samo podatki).
3. **Prazen paket** — brez razsežnosti, potrebna je ročna konfiguracija.

### Znani katalog

| Ponudnik              | Razsežnosti                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, neznano), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Brez privzete vrednosti — potrebna je ročna konfiguracija     |

---

## Integracija cevovoda

### kavelj PRE (`open-sse/handlers/chatCore.ts`)

Zažene se pred zgornjim izvajalcem, po preverjanju avtorizacije in pravilnika:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Neuspešno odprto** : če `enforceQuotaShare` vrže, je zahteva dovoljena prek dnevnika `pino.warn`. To preprečuje, da bi hrošč mehanizma kvot blokiral ves promet.

**Ko se zmogljivost povrne.** Zavrnitev deleža ključa ali zgornje meje bazena se konča z enim od dveh stavkov v obeh načinih izposoje:

- okno `percent` : `. The <window> window resets at <time>.` Čas je ponastavitev, ki jo poroča ponudnik.
- Števna enota: `. Enough <window> usage is expected to clear by <time>.` Čas je zgornja meja drsnega okna, če ključ ne pošlje ničesar drugega.

`<time>` je instant ISO 8601 v UTC. Zavrnitev nato nosi `Retry-After`: cele sekunde do tega trenutka plus ena. Odjemalec, ki čaka tako dolgo, poskusi znova največ eno sekundo po trenutku. Kadar trenutek ni znan, zavrnitev ne vsebuje niti stavka niti glave. Absolutna zavrnitev zgornje meje ne nosi ne enega ne drugega. Javna koda ostane `quota_share_blocked`.

Zavrnitev skupne rabe se ne dotakne skupne povezave. Ne nastavi ohlajanja, ne zaklene modela in ne odpove odklopnika ponudnika, drugi ključi skupine pa se še naprej strežejo. Ko vsaka tarča kombinacije zavrne ključ za svoj delež, kombinacija odgovori 429 brez čakanja. Njegov odgovor nosi namig kot `Retry-After`. Pot vdelave svojo zavrnitev konča z istim stavkom in ne pošlje `Retry-After`.

### POST hook (rekordna poraba)

Po uspešnem odgovoru:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Opomba za nanos** : če `consume` ne odgovori po odzivu, tekoči števec šteje premalo. Signal zasičenosti od ponudnika (npr. `anthropic-ratelimit-unified-5h-utilization`) popravi globalno oceno ob naslednji zahtevi.

### Kombinirana mehka kazen (`open-sse/services/combo.ts`)

Ko `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Kazen se uporabi po vseh drugih faktorjih točkovanja. Zmanjša verjetnost samodejnega kombiniranja izbire nasičenega ključa brez njegovega trdega blokiranja.

---

## UI Navodila

### `/dashboard/costs/quota-share` — Glavna stran bazenov

Komponente (vse v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponenta             | Namen                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Uvodna kartica, ki razlaga delitev kvot novim uporabnikom                        |
| `CreatePoolModal`      | Ustvari novo področje kvot (povezava + ime + začetne dodelitve)                  |
| `PoolCard`             | Povzetek na področje: ime, povezava, število dodelitev                           |
| `DimensionBar`         | Zložena vrstica na dimenzijo: globalna uporaba + vsakega ključa                  |
| `AllocationTable`      | Tabela s porabljenim, poštenim deležem, deficit/surplus, zastavico izposoje      |
| `BurnRateChart`        | črtni grafikon stopnje izgorevanja EMA (leni ponovni grafikoni prek `dynamic()`) |
| `EditAllocationsModal` | Uredite uteži dodelitve, zgornje meje in pravilnike za skupino                   |
| `BorrowModeField`      | Izbirnik načina izposoje (`saturation` ali `consent`) v čarovniku                |
| `LendingBadge`         | Značka samo za branje na ključu, ki posoja, samo v bazenih `consent`             |

Značka posojanja prikazuje odstotek in, če je nastavljen, rok v UTC z imenovanim območjem. Rok presoja v trenutku posnetka uporabe. Potekel ali neberljiv rok je prikazan kot `lending expired`.

Kavlji strani:

- `usePools` — pridobi `GET /api/quota/pools` vsakih 30 s.
- `usePoolUsage` — pridobi `GET /api/quota/pools/[id]/usage` na zahtevo.
- `useLocalStoragePoolMigration` — se zažene enkrat ob namestitvi za selitev podedovanih podatkov LS.

Korak ključev čarovnika za bazen ima polje `Show usage by member to key holders`. Nastavi možnost `memberBreakdown` bazena (glejte [Uporaba članov](#member-usage) ). Pod njim čarovnik opozori, da lahko nekdo, ki ve, kateri ključ je bil uporabljen, poveže vrstico s tem ključem. Ko je polje označeno, piše tako, ko so v koraku navedeni manj kot trije ali več kot 20 ključev, saj vrstice ostanejo skrite. Prešteje ključe v koraku in ne more ugotoviti, kateri od njih lahko zahteva.

### `/dashboard/costs/quota-share/plans` — Konfiguracija načrta ponudnika

- `ProviderPlanConfigClient.tsx`: spustni meni za izbiro ponudnika, ogled razrešenega načrta (samodejno iz kataloga ali ročna preglasitev) in urejanje dimenzij.
- Spremembe pišejo v `PUT /api/quota/plans/[connectionId]`.
- Brisanje se vrne v katalog ali prazen načrt.

---

## Samopostrežna kvota API (opt-in)

`GET /api/v1/me/quota/{provider}` (na voljo tudi pri `/v1/me/quota/{provider}`) omogoča imetniku ključa API, da z lastnim ključem prebere, koliko skupne naročnine je njegova in kaj jih blokira. Pot je tanka lupina nad `src/server/selfService/quotaHandler.ts`; pogled zgradi `src/lib/quota/selfView.ts` in njegova odzivna pogodba je `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` v `docs/openapi.yaml`).

### Omogočanje in preverjanje pristnosti

- Zastavica funkcije `QUOTA_SELF_PANEL`, privzeto `false`. Medtem ko je izklopljen, zahteva, ki doseže pot, prejme 404. Z `REQUIRE_API_KEY=true` pravilnik API odjemalca zavrne manjkajoči ali neveljavni ključ s 401, preden se pot zažene, ne glede na oznako. Zahteva brez ključa, vendar s prijavljeno sejo nadzorne plošče preide ta pravilnik in dobi lasten odgovor poti. Zastavica se razreši kot vsaka druga zastavica (nadzorna plošča ali preglasitev REST, nato spremenljivka okolja z istim imenom); glej [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Vsako prikazno ime bazena in vsaka oznaka razporeda se vrneta imetnikom ključev bazena točno tako, kot ju je napisal skrbnik. Preden vklopite zastavo, preverite, ali so primerni za branje s temi imetniki ključev.
- Ključ se bere samo iz glav: `Authorization: Bearer <key>` ali `x-api-key: <key>`. Ko sta poslana oba, se uporabi prvi, ki potrdi veljavnost. Ključ v nizu poizvedbe ali piškotek je prezrt. Ključ okolja strežnika je zavrnjen (401).
- Ključ potrebuje obseg `self:usage` (403 brez njega).
- Segment ponudnika je obrezan, napisan z malimi črkami in preverjen glede na `^[a-z0-9][a-z0-9._-]{0,63}$` (sicer 400), nato pa razrešen prek registra ponudnika, tako da vzdevek, kot je `cc` bere bazene `claude`. `claude` in `anthropic` bereta iste bazene.

### Kaj kaže vsaka vidnost

| Vidnost      | Zahteva                                                                         | Polja                                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lastni delež | `self:usage`                                                                    | `pools[]` (ref, ime, ponudnik, pravilnik, teža, zgornja meja), `dimensions[].yourShare`, `accounts[]` z `yourShare` (v oknu `percent` brez `attributed` in `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                 |
| Raven računa | `self:usage` + `self:account-quota` in ponudnik v `sharedQuotaProviders` ključa | doda `dimensions[].total`, `accounts[].dimensions[].account` in `accounts[].modelWindows`, `attributed` in `external` na `yourShare` okna `percent` in `members` na bazen z vključeno uporabo članov (glejte [Uporabo članov](#member-usage) ) |

- `sharedQuotaProviders` je nastavitev za vsak ključ (`PUT /api/keys/[id]/self-service`): `null`, privzeto, pomeni vsakega ponudnika, ki ga doseže ključ; `[]` pomeni nič. `accountVisible` vsakega bazena pove, katera vidnost je veljala zanj.
- Vrstice računov in okna modela so prikazani samo za račune, katerih povezavo morda uporablja ključ. Ko ima ključ seznam dovoljenih povezav, račun zunaj njega ohrani svoj vnos `Account N` brez `account` ali `modelWindows`. Prazen seznam ne pomeni nobene omejitve, kot za `/v1/me/status`. Skupni znesek bazena (`dimensions[].total`) ni odvisen od tega seznama.
- Dve številki, prikazani samo z `self:usage` izhajata iz uporabe drugih ključev. `exhausted` proračuna razporeda odraža porabo vsakega ključa v tem razporedu. V bazenu, katerega vse uteži so nič, je `weight` ključa `100 / number of members`. Oboje je tisto, kar uveljavitev velja za ključ.
- Bazen je identificiran samo z `ref`, neprozorno vrednostjo, vezano na klicni ključ. Njegovo prikazno ime (`name`) je vključeno tako, kot ga je napisal skrbnik. `ref` je izpeljan iz ključa in bazena s skrivnostjo API-ključa strežnika (`API_KEY_SECRET`). Stranke ga ne smejo vztrajati: spremeni se, če se ta skrivnost zamenja.
- Računi so navedeni kot `Account 1`, `Account 2`, … v vrstnem redu skupine. ID bazena, ID povezave, e-pošta računa ali ime računa niso vrnjeni, odgovor pa gre skozi pogodbeno shemo, ki izpusti vsa polja zunaj nje.
- Števne enote (`requests`, `tokens`, `usd`) so sporočene kot vedro bazena, ki ga uveljavljajo vrata kvote: `limit` = omejitev načrta × računi v bazenu, `fairShare` = teža / 100 × `limit` (enaka razdelitev, ko je vsaka utež 0), `consumed` = lastni števec ključa v shrambi kvot, `remaining` = `fairShare` − `consumed`, spodnja na 0.
- `blocks.schedules` navaja okna urnika ključa (`open`/`closed`, `blackout` ali `outside-window`, `retryAfterSeconds`, rezervna tla in ali je proračun okna porabljen); `blocks.modelCaps` navaja svoje urne omejitve glede na model s porabo.
- Ključ zunaj vsakega bazena ponudnika dobi 200 z `pools: []`; `availableModels` (id-ji `qtSd/`, ki jih ključ vidi v `/v1/models`), `expiresAt` in `apiBaseUrl` so še vedno zapolnjeni.
- `apiBaseUrl` je `OMNIROUTE_PUBLIC_API_BASE_URL`, nato `OMNIROUTE_PUBLIC_BASE_URL`, sicer `null`. Nikoli ni izvor zahteve.

### `status` in `reason`

| `status`      | Pomen                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Trenutno branje.                                                                                                                                                                                                                                                                                                                                                             |
| `stale`       | Branje predpomnjenega računa je označeno kot zastarelo ali tisto, katerega čas ponastavitve je potekel od branja. Številke se hranijo. Eno okno modela, katerega čas ponastavitve je potekel, označuje celotno skupino `modelWindows` `stale`. Za lastni delež ključa v oknu `percent` : knjiga je bila prebrana brez branja računa v predpomnilniku vrat, da bi to potrdil. |
| `unavailable` | Brez branja; številke so `null`, nikoli `0`. `reason` pove zakaj.                                                                                                                                                                                                                                                                                                            |

| `reason`                          | kdaj                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kvotne shrambe ni bilo mogoče prebrati ali pa ne more prebrati knjig pripisovanja.                                           |
| `percent_attribution_unavailable` | Lastni delež ključa v oknu `percent` : za ta račun in okno še ne obstaja knjiga dodeljevanja ali pa knjiga ne navaja ključa. |
| `percent_window_ended`            | Lastni delež ključa v oknu `percent` : knjiga pripada oknu načrta, ki se je končalo.                                         |
| `account_not_used_by_key`         | Lastni delež ključa v oknu `percent` : povezava računa je zunaj dovoljenih povezav ključa. Njegova knjiga ni prebrana.       |
| `window_not_reported`             | Predpomnilnik omejitev ponudnika nima branja za to okno načrta.                                                              |
| `connection_lookup_failed`        | Povezave računa ni bilo mogoče prebrati.                                                                                     |
| `not_supported`                   | OmniRoute ne more brati omejitev uporabe za ponudnika računa.                                                                |
| `fetch_failed`                    | Nobeno predpomnjeno branje ni bilo uporabno in osvežitev omejitev ponudnika ni uspela.                                       |
| `not_available`                   | Branje ne vsebuje oken uporabe ali pa račun sploh nima branja.                                                               |

Ko shrambe kvote ni mogoče prebrati, so polja `blocks`, ki jih podpira trgovina ( `exhausted` proračuna razporeda, `consumed` in `reached` zgornje meje modela), prav tako `null`.

### Soglasje za posojilo

`PATCH /api/v1/me/quota/{provider}` zabeleži lastno privolitev klicnega ključa za eno skupino. Uporablja zastavo, glave in pravila ponudnika `GET`. Obseg `self:usage` dovoljuje to pisanje, čeprav se njegovo ime glasi kot samo za branje.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` je `ref`, ki ga `GET` vrne za ta bazen.
- `lendingPercent` je celo število od 0 do 100. Vrednost 0 počisti soglasje in njegov rok. Telo z `lendingPercent` 0 je sprejeto v obeh načinih.
- `lendingUntil` ni obvezen: epoha milisekunde ali `null` brez roka. Mora biti v prihodnosti in največ 8640000000000000. Vrednost pod 100000000000 se bere kot sekunde in je zavrnjena.
- Vsako drugo polje je zavrnjeno. Telo, daljše od 4096 bajtov, je zavrnjeno. Branje se pri tej velikosti ustavi, zato daljše telo nikoli ne drži celega.

Preverjanja potekajo po vrstnem redu te tabele. Vsaka zavrnitev uporablja standardno telo napake s fiksnim sporočilom. Zavrnitev enega od teh pregledov ne piše nič.

| Stanje | Sporočilo                                                                                          | kdaj                                                             |
| ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Zastavica `QUOTA_SELF_PANEL` je izklopljena.                     |
| 401    | `Valid API key required`                                                                           | Ključ manjka ali je neveljaven ali pa je ključ okolja strežnika. |
| 403    | `API key lacks the self:usage scope`                                                               | Ključu manjka `self:usage`.                                      |
| 400    | `Invalid provider`                                                                                 | Segment ponudnika je neveljaven.                                 |
| 429    | `Too many lending changes. Retry later.`                                                           | Ključ je presegel svojo mejo. Odgovor nosi `Retry-After`.        |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Telo ni JSON, je predolgo ali se ne ujema s shemo.               |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Rok se glasi kot sekunde.                                        |
| 400    | `lendingUntil must be in the future`                                                               | Rok je ob ali pred časom zahteve.                                |
| 404    | `Pool not found`                                                                                   | `ref` ne imenuje skupine tega ključa za tega ponudnika.          |
| 403    | `Lending is not enabled for this pool`                                                             | Bazen je v načinu `saturation` in `lendingPercent` je nad 0.     |
| 500    | `Failed to build quota view`                                                                       | Vsak drug neuspeh. Njegov vzrok je prijavljen na strežniku.      |

Omejitev je 20 zahtev na 60 sekund za posamezen ključ. Šteje vsaka zahteva, ki prestane preverjanje ponudnika, tudi tista, ki je pozneje zavrnjena ali tista, ki ne spremeni ničesar. Ima svoj števec, razen omejitve hitrosti zahtev ključa.

Zahteva, ki spremeni shranjeno privolitev, zapiše en revizijski zapis `quota.pool.lending.updated`. Ključ poimenuje s starimi in novimi vrednostmi. Enkrat poslani organ enkrat piše in enkrat revidira. Odgovor je 200 s polnim pogledom `GET`, zgrajenim po zapisu.

Pogled `GET` poroča o posojanju na naslednji način:

- Vsak bazen nosi `borrowMode` (`saturation` ali `consent`) in lastna `lendingPercent` in `lendingUntil` ključa.
- `lendingActive` je `true` samo v skupini `consent`, z odstotkom nad 0 in nedoseženim rokom.
- V bazenu `consent` nosi vsak štetni `dimensions[].yourShare` `borrowAvailable`. To je tisto, kar lahko ključ zdaj uporabi nad svojim deležem, ki so ga posodili drugi ključi.
- `borrowAvailable` uporablja formulo vrat. Bere vsak drugi ključ, tudi ko je ključ pod njegovim deležem. Za ključ `hard`, ki je eno dodatno branje na drug ključ in štetno dimenzijo, vzporedno.
- `borrowAvailable` je `null` za ključ `soft` ali `burst` in `null`, ko branje ne uspe.
- `borrowAvailable` je ena številka za vse ostale ključe skupaj. V skupini dveh ključev je lastna figura drugega ključa.
- `borrowAvailable` še ni prijavljen za `percent` windows ali v `accounts[]`.
- V skupini `saturation` pogled poroča o shranjenem soglasju z `lendingActive: false` in brez `borrowAvailable`.

### Napake

Vsak odziv te poti, uspeh ali napaka, nosi `Cache-Control: no-store`. Zavrnitev, ki se zgodi, preden se pot zažene, je ne nosi, na primer 401 pravilnika odjemalca API ali 403 filtra IP. Napake poti uporabljajo standardno telo napake s popravljenim sporočilom: 400 (neveljaven ponudnik), 401 (manjkajoči ali neveljavni ključ), 403 (manjka `self:usage`), 404 (zastavica izklopljena) in 500 (`Failed to build quota view`). 500 krije vsako napako, ko zahteva doseže pot, vključno s samim iskanjem ključa; njen vzrok je prijavljen na strežniku in se nikoli ne vrne. Napake `PATCH` so navedene v [soglasju za izposojo](#lending-consent).

### Omejitve

- `remaining` je del pravičnega deleža ključa, ki ga ni uporabil. To ni garancija. Ključ je še vedno mogoče vročiti onkraj njega, medtem ko je bazen prostor. Ko skupni znesek bazena doseže `limit`, je vsak ključ bazena zavrnjen, ne glede na njegov lastni `remaining`, in ključ brez `self:account-quota` ne more videti tega skupnega zneska.
- `remaining` ne upošteva absolutnega `cap` dodelitve. Enforcement zavrne ključ, ko lastna poraba v oknu enote zgornje meje doseže vrednost zgornje meje.
- Vrstica na ravni računa prihaja iz predpomnilnika omejitev ponudnika in lahko zakasni odločitev o uveljavitvi za nekaj minut. Odčitek, katerega čas ponastavitve je potekel, se poroča kot `stale`.
- Okna po modelu (`modelWindows`) so sporočena samo za ponudnike, ki imajo preslikavo načrt-okno: Claude in Codex danes. Pri drugih ponudnikih je `modelWindows` še vedno prisoten, ko so prikazani podatki o računu s praznim seznamom `windows`.
- Lastni delež ključa v oknu `percent` je ocena. Izhaja iz knjige dodeljevanja in vsebuje vse omejitve, navedene pod "Odstotne dimenzije: dodeljevanje po ključu" zgoraj.
- `consumed` je uveljavljanje števila v primerjavi s pravičnim deležem. Natančno je `attributed` plus `external`. `attributed` je del, ki mu knjiga daje ključ za žetone, ki jih je usmerila. `external` je del uporabe računa ključa, ki ga ključi bazena ne upoštevajo.
- Oba dela sta poslana le, če je `accountVisible` bazena resnična: ključ ima `self:account-quota` in ponudnik je v svojem `sharedQuotaProviders`. Ključ brez njega dobi sam `consumed` z enakima `status` in `reason`.
- Z obema deloma in lastno težo lahko nosilec izračuna uporabo zunaj bazena, ki se obračuna na ključe bazena. Imetnik z obsegom računa že vidi vsoto računa.
- Ključ, ki ni preusmeril ničesar v oknu, lahko še vedno prebere svoj zunanji naboj iz `consumed`, ker je njegov pripisani del takrat 0.
- Na primer, knjiga se odpre pri 0, s ključema A in B s težo 50 vsak. Ključ A usmerja 900.000 žetonov, ključ B pa 100.000. Račun nato doseže 60 % omejitve 100. Nato je `attributed` 54 za ključ A in 6 za ključ B, `external` pa je 0 za oba.
- Pogled bere knjigo in nikoli ne zapiše svojega stanja. Ne odpre knjige in nikoli ne vpraša ponudnika za branje. S shrambo Redis branje odstrani nadomeščena revizijska polja v ozadju, kot to storijo branja vrat.
- Delež je samo `ok`, medtem ko predpomnilnik vrat hrani branje računa. Brez enega je `stale`, tako da je v bazenu brez nedavne zahteve prikazano kot morda zastarelo.
- Dokler zahteva ne gre skozi skupino, skupna raba ni na voljo. Ta zahteva odpre knjigo in vrednost računa v tistem trenutku se šteje kot uporaba zunaj skupine.
- V skupini z več računi vsak vnos računa uporablja lastno knjigo tega računa in omejitev enega računa. Izvršba meri obe strani glede na število računov, tako da je razmerje enako.
- Okna po modelu nimajo nobenega deleža za ključ. Knjiga ne hrani podatkov po modelu.
- Pogled ne ovrednoti rezervnih nadstropij urnika: urnik je lahko prikazan kot `open` medtem ko je zahteva zavrnjena z razlogom `schedule-reserve`.
- Ko si dve skupini istega ključa delita povezavo, uveljavitev uporabi enega od njiju, pogled pa navede oba.
- Za neuspešne poskuse ključa ni omejitve glede na naslov: klicatelji za povratnim posrednikom lahko delijo en naslov (odvisno od tega, ali so posredovani naslovi odjemalcev zaupanja vredni), zato bi lahko zaklepanje zavrnilo pot do vsakega imetnika ključa. Pri `REQUIRE_API_KEY=true` pravilnik API odjemalca zavrne neveljaven ključ, preden se pot zažene, s telesom 401 tega pravilnika namesto te poti.

### Članska uporaba

Skrbnik lahko dovoli imetnikom ključev, da vidijo, kako se uporaba okna razdeli med člane skupine. Možnost je `memberBreakdown` bazena, ki je privzeto izklopljena. Nastavi se v čarovniku za bazen ali z `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` in `GET /api/quota/pools/{id}` poročata o tem.

Dimenzija pogleda nosi `members` le, če vse to velja:

- možnost bazena je vklopljena
- bazen ima največ 20 dodeljenih ključev in vsaj trije od njih lahko zahtevajo: aktivni, nepreklicani, neprepovedani in ne potečeni
- `accountVisible` bazena je resničen: ključ ima `self:account-quota` in ponudnik je v svojem `sharedQuotaProviders`
- v oknu `percent` je povezava računa tista, ki jo ključ lahko uporablja
- lastni delež ključa tega okna je bil prebran: njegov `status` ni `unavailable`

V nasprotnem primeru `members` ni. Nikoli ni prazen seznam.

- Vsaka rezina je `{ slot, consumed, isYou }`. Odzivna shema zavrne katero koli drugo lastnost na rezini in seznam z več kot 20 rezinami. Rezine so navedene v vrstnem redu rež.
- Na dodeljeni ključ je ena rezina, vključno s ključem, ki ne more več postavljati zahtev. Član brez uporabe kaže realno ničlo.
- Reža 1 je vedno vprašalni ključ, pri čemer `isYou` res. Druge številke rež so rangi zgoščene vrednosti s ključem. Zaklenjen je z `API_KEY_SECRET` in pokriva bazen, vprašalni ključ in člana.
- Torej se številke med imetniki ne ujemajo. Za enega imetnika med obiski ostanejo enaki. Lahko se spremenijo, ko se ključ pridruži ali zapusti bazen ali ko se ta skrivnost zavrti.
- V štetnem oknu je rezina števec člana v shrambi kvot, enak števec kot njegov lastni `consumed`.
- V oknu `percent` je rezina članov del `attributed`, iz iste knjige, ki se bere kot lastni delež ključa. Uporaba zunaj bazena ni nikoli razdeljena na rezine. Ta naboj je razdeljen na težo, tako da bi rezine, ki so ga nosile, pokazale uteži.
- Vsak pogled vzporedno prebere eno vrednost na drugega člana in šteto okno. V oknu `percent` rezine ne stanejo nobenega branja, razen branja knjige delnice. Ko ene vrednosti ni mogoče prebrati, to okno nima `members` in lastni delež ključa ostane.
- Možnost in število uporabnih ključev se prebereta enkrat na skupino in samo za ključ, ki lahko vidi podatke računa. Neuspešno branje možnosti ali števila uporabnih ključev izklopi vrstice za ta bazen. Strežnik zabeleži opozorilo in preostali del pogleda je zgrajen.

Palice nimajo imen ali identifikacijskih številk. Imetniku ključa še vedno povedo stvari o drugih članih:

- Imetniki lahko še vedno primerjajo rezine po njihovih vrednostih.
- Stabilno oštevilčenje omogoča, da imetnik skozi čas sledi enemu članu.
- Število rezin kaže, koliko ključev je dodeljenih v bazenu.
- V skupini treh ključev lahko nekdo, ki ve, kaj je uporabil en ključ, pove, kaj je uporabil zadnji ključ.
- Ko bazen pade pod tri uporabne ključe, palice izginejo. Prejšnji pogledi še vedno kažejo, kaj je vsak član uporabljal.
- V oknu, ki ga je mogoče prešteti, lahko skupni znesek bazena minus rezine prikaže uporabo ključev, ki niso več dodeljeni.
- Član, ki na enem računu prikaže nič, na drugem pa uporabo, lahko pokaže, kateri član uporablja kateri račun.
- V števnem bazenu s politiko `hard` rezina, ki preneha rasti pri poštenem deležu člana, namiguje na težo tega člana.

### Serija uporabe (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (na voljo tudi pri `/v1/me/usage`) vrne uporabo in stroške lastnih zahtev klicnega ključa: skupne vrednosti, en vnos na dan UTC, na dan in model, na model in na ponudnika. Deli zastavo, pravila za preverjanje pristnosti, obseg `self:usage`, `Cache-Control: no-store` in vedenje napak zgornje kvotne poti. Ključ je preverjen pred `range`. Napake so 400 (`Invalid range`), 401, 403, 404 in 500 (`Failed to build usage`).

- `range` je eden od `1d`, `7d`, `30d` (privzeto) ali `90d`. Katera koli druga vrednost, prazna vrednost ali ponovljeni parameter je 400. Niz se ustavi pri `90d`, da se omejijo stroški klica. Pogled bere samo neobdelano zgodovino uporabe, nikoli dnevnih povzetkov, ki nimajo ključa.
- Vrstice so izbrane z ID-jem klicne tipke. Stolpec z imenom ključa se nikoli ne ujema in vrstice, zabeležene brez ID-ja ključa, se nikoli ne štejejo.
- Gradnja niza izvede pet združenih poizvedb po vrsticah ključa v oknu. Zgrajena serija je ponovno uporabljena 60 sekund na ključ in obseg, ponovno uporabljen klic pa se ne izvaja. Njegova `generatedAt` pove njegovo starost.
- Okno se konča, ko je niz zgrajen. Kasneje odtisnjena vrstica, na primer zaradi poševnega ura, se ne šteje.
- `coverage.retentionDays` je operaterjeva neobdelana nastavitev hrambe zgodovine uporabe (`retention.usageHistory` v nastavitvah zbirke podatkov). `coverage.truncatedByRetention` je resničen, ko je zahtevani obseg daljši od te nastavitve. Primerja obe številki in ne preverja, ali vrstice dejansko manjkajo.
- Ponudnik se vrne kot zabeležen za lastne zahteve ključa. Model je zabeleženo ime za zadnjim `/` in vrstice so razvrščene po njem. Kombinirana zahteva, katere vsak cilj je bil zavrnjen, se zabeleži z usmerjevalno oznako kot ponudnik (kombinirano ime, `auto` ali `combo`) in nizom modela, ki ga je poslal odjemalec. Druge zavrnjene zahteve, na primer zaradi odprtega odklopnika, ohlajanja modela ali preskoka parkiranega kvote, obdržijo ciljnega ponudnika in model.
- Poleg števila in stroškov odgovor vsebuje povprečno zakasnitev, stopnje uspešnosti ter čas prve in zadnje zahteve.
- `byModel` navaja 50 parov ponudnika in modela z največ zahtevami. Z več pari se njegovi vnosi ne seštejejo z `summary` in `summary.uniqueModels` šteje vsako zabeleženo črkovanje modela. `byModelTruncated` je potem resničen in model, katerega pari padejo na obe strani reza, prikazuje delne vsote.
- Prijavljena sta dva stroška. `costUsd` je zaračunani strošek, kot ga kažejo analitike uporabe. Ponudniki pavšalnih naročnin, kot je paket kode Claude, tam štejejo 0 USD. `listPriceUsd` je enaka uporaba po maloprodajni ceni, vključno z naročninami. Zahteva, katere model nima vrstice s cenami, šteje svoje shranjene stroške: strošek, ki ga je ponudnik prijavil, ali strošek, izračunan, ko je bila zahteva zabeležena. Samo zahteva z nobenim šteje 0, brez označevalca, tako da je seštevek lahko delen.
- Odgovorna pogodba je `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` v `docs/openapi.yaml`).

### Samopostrežna stran

Z vklopljeno `QUOTA_SELF_PANEL` je `/quota/{provider}` javna stran. Imetnik ključa tam vtipka ključ API in vidi skupine tega ključa za ponudnika. Vsak bazen prikazuje eno kartico na okno bazena, z uporabo bazena za vse in lastnim deležem ključa. Vsak račun skupine ima svoje kartice z uporabo računa in deležem ključa. Uporaba računa se pojavi le, če ključ vidi podatke računa. Na strani so navedene tudi omejitve glede na model za vsak račun in lastna uporaba ključa. Ko urnik trenutno blokira ključ, se prikaže obvestilo. Na kartici so navedeni vsi pokrovčki ključa po modelu z njegovo uporabo in označeni tisti, ki so bili doseženi. `{provider}` je ID ponudnika ali njegov vzdevek (`/quota/claude`, `/quota/cc`). Neznani ponudnik in vsaka pot `/quota/*`, medtem ko je zastavica izklopljena, odgovori 404. Bazeni v vozlišču, združljivem z OpenAI ali Anthropic, nimajo strani. API še vedno odgovarja namesto njih.

Stran nima seje. Ključ je poslan samo v glavi `Authorization` `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` in `GET /api/v1/me/usage`, nikoli v URL. Ključ, ki ga sprejme strežnik, je shranjen v `sessionStorage` zavihka. Z možnostjo »Zapomni si v tej napravi« se namesto tega shrani v `localStorage`, možnost »Pozabi ključ« pa jo odstrani iz obeh. Ključ, ki ga strežnik zavrne, se odstrani iz pomnilnika.

Skupina v načinu `consent` prikazuje posojilno kartico. Tam imetnik ključa nastavi cel odstotek od 0 do 100 nedejavnega deleža ključa za posojanje. Imetnik izbere tudi, kako dolgo velja soglasje: do izklopa, 1 uro, 8 ur, 24 ur, 7 dni ali 30 dni. Trajanje se šteje od trenutka shranjevanja. Dokler rok velja, ga lahko imetnik obdrži. Če ta rok poteče pred shranjevanjem, kartica ne pošlje ničesar in zahteva drugo izbiro. Pri 0 % rok ni poslan. Kartica prikazuje shranjeni rok z imenovanim časovnim pasom. Soglasje, katerega rok je potekel, je prikazano kot zaključeno.

Kartica za ključ `hard` prav tako navaja, na okno skupine, kateri drugi ključi trenutno posojajo ključ. Vsaka vrstica je ena figura za vse ostale ključe skupaj. V skupini dveh ključev je lastna figura drugega ključa. Številka, o kateri pogled ne poroča, se glasi kot ni na voljo, ne kot nič. Za ključ `soft` ali `burst` kartica pravi, da nobena številka ne velja.

Bazen v načinu `saturation`, katerega ključ shrani odstotek nad 0, prikazuje samo dvig. Piše, da tam shranjeni odstotek nima učinka. Njegov gumb za dvig pošlje 0 brez roka. Skupina v načinu `saturation` s shranjeno 0 ne kaže nobene kreditne kartice. Po shranjevanju kartica, ki je vrnjeni pogled ne potrebuje več, ostane s svojim sporočilom, dokler se pogled strani znova ne spremeni.

Nič ni shranjeno, dokler imetnik ne pritisne Shrani ali Umakni. Vsak pritisk pošlje eno zahtevo `PATCH /api/v1/me/quota/{provider}`, drugi pritisk pa ne pošlje ničesar, medtem ko prvi čaka. Telo nosi bazen neprozoren `ref` od pogleda, odstotek in rok. Odgovor je prenovljen pogled kvote in stran ga prikaže brez drugega branja. Ko se dve shranitvi prekrivata, stran prebere kvoto enkrat po zadnjem odgovoru. Stran ne hrani soglasja v shrambi brskalnika.

Zavrnjena sprememba je na kartici pojasnjena z besedilom, izbranim iz statusa HTTP. Telo napake ni prebrano. 401 pravi, da ključ ni bil sprejet in ponovno naloži kvoto. 403 pravi, da združenje ne sprejema sprememb posojil, 404 pa pravi, da združenja ni več. Oba ponujata gumb, ki ponovno naloži kvoto. 400 ali drug odgovor 4xx od imetnika zahteva, da preveri odstotek in rok. A 429 prosi imetnika, naj počaka, s sekundami `Retry-After`, ko jim da odgovor. Odgovor 5xx, 408 ali napaka omrežja pove, da sprememba morda ni bila shranjena, in ohrani vnesene vrednosti. Odgovor izven pogodbe ponovno naloži kvoto. Neuspelo shranjevanje ključa ne odstrani samo po sebi. Ko je ponovno nalaganje po tem, ko je zavrnjeno, stran odstrani ključ kot pri vsakem zavrnjenem branju.

Ko je ključ sprejet, stran prikaže tudi kartico »Nastavite svoja orodja« s tremi zavihki. »koda Claude « daje blok `env` za `~/.claude/settings.json`. "Shell" daje enake spremenljivke kot vrstice `export`. "Claude Desktop" daje vrednosti za okno sklepanja tretje osebe. Modeli so modeli deleža kvot, ki jih lahko ključ zahteva za tega ponudnika. Če s ključem ni takšnega seznama, blok namesto tega vklopi odkrivanje modela prehoda. Naslov prehoda je javni izvor API, o katerem poroča strežnik (`OMNIROUTE_PUBLIC_API_BASE_URL`, nato `OMNIROUTE_PUBLIC_BASE_URL`). Če nobeno ni nastavljeno, kartica prikaže ogrado in imetniku sporoči, naj vpraša skrbnika. Ključ je prikazan kot ograda. »Vključi moj ključ« postavi celoten ključ v besedilo na zaslonu in v tisto, kar gumb za kopiranje kopira. To traja, dokler polje ni počiščeno, ključ ni pozabljen ali zamenjan ali stran zapuščena. Kartica ne pošilja nobenih zahtev in ne ponuja prenosa datotek.

Odčitek API označuje `stale` je prikazan kot morda zastarel. Odčitek, ki ga označi `unavailable` je prikazan z razlogom, nikoli kot nič.

Na odstotnih načrtih stran črpa lastni delež ključa, ko API to sporoči. Piše, da je številka ocena, in poimenuje njena dva dela. Omejitve glede na model prikazujejo samo račun.

Ko okno vsebuje `members`, njegova kartica prikazuje tudi vrstico z enim segmentom na člana v vrstnem redu rež. Segment vprašalnega ključa uporablja poudarjeno barvo. Drugi segmenti krožijo skozi barve grafikona teme. Besedilna legenda navaja vsak segment z njegovo vrednostjo, tako da nič ni odvisno od barve. Segmenti so označeni `You` ali `Member N`, kjer je N reža.

### Namenska vrata za stran

`QUOTA_PANEL_PORT` odpre drugega poslušalca, ki služi samo samopostrežni strani. Izklopljen je, razen če je spremenljivka nastavljena. `QUOTA_PANEL_HOST` je povezovalni naslov in privzeto `127.0.0.1`.

Poslušalec posreduje te poti do glavnih vrat in odgovori 404 za vsako drugo pot:

| Pot                                                                      | Služi                               |
| ------------------------------------------------------------------------ | ----------------------------------- |
| `/quota/{provider}`                                                      | Stran                               |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Pogled kvote, ki ga stran bere      |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Serija uporabe, ki jo prebere stran |
| `/_next/static/`                                                         | Skripti, slogi in pisave zgradbe    |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikone                               |

`GET` in `HEAD` se prenašata brez telesa. Posreduje se tudi ena zahteva s telesom: `PATCH` poti pogleda kvote, ki jo stran pošlje, da shrani izbiro posojanja. Katera koli druga metoda odgovori na 404, razen zahteve CONNECT, katere povezava je zaprta brez odgovora. Vsaka druga zahteva, ki razglasi telo, odgovori 404 in njena povezava je zaprta. Zahteve za nadgradnjo so zavrnjene in njihova povezava je prekinjena. Pot s segmentom pike ali oznako fragmenta je zavrnjena, kot na vratih API. Enako velja za cilj zahteve z znakom zunaj natisljivega ASCII. Razčlenjevalnik HTTP odgovori na neobdelani kontrolni znak v cilju 400 pred lastnim preverjanjem teh vrat. Glave zahtev, ki jih okvir rezervira za lastno uporabo, niso posredovane: imena, ki se začnejo z `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` ali `x-next-`, ter imena `x-matched-path` in `next-resume`. Zahteva se posreduje brez njih. Preko teh vrat ni mogoče doseči nadzorne plošče, prijavne strani, upravljanja API in sklepnih poti.

`PATCH` mora vsebovati `Content-Type: application/json` brez parametrov ali samo z `charset=utf-8`. Vsebovati mora en `Content-Length` od 1 do 4096, zapisan kot navadne števke, in brez `Transfer-Encoding`. `PATCH`, ki prekrši eno od teh pravil, odgovori 404. Na nekatere napačno oblikovane dolžine, kot je predpisana ali ponovljena, razčlenjevalnik HTTP odgovori 400 pred lastnim preverjanjem teh vrat. Vrata preberejo deklarirane bajte, preden vzpostavijo stik z glavnimi vrati, in nanje čakajo največ 5 sekund. Telo, ki do takrat ni dokončano, odgovori na 404 in njegova povezava se prekine. Nič ne doseže glavnih vrat v tem primeru ali ko odjemalec prvi odide. Vrata posredujejo točno deklarirane bajte z enakim `Content-Length`. Bajti za njimi se preberejo kot naslednja zahteva v povezavi. Obratni posrednik TLS spredaj mora posredovati `Content-Length` in ne sme ponovno razdeliti telesa zahteve. Glavna vrata preverijo ključ API v glavi `Authorization`, kot za `GET`.

Telo 404 je `{"error":"not_found","message":"Not found."}`. Neuspeli rele odgovori na 502 (`api_bridge_unavailable`) ali 504 (`api_bridge_timeout`) brez polja `detail`.

Poslušalec ne bere `QUOTA_SELF_PANEL` in ne obrne strani. Medtem ko je zastavica izklopljena, stran in njen API odgovorita 404 na glavnih vratih, poslušalec pa posreduje ta odgovor.

Pod razvojnim strežnikom (`next dev`) stran ne postane interaktivna prek teh vrat. Razvojna vtičnica za vroče ponovno nalaganje je zahteva za nadgradnjo, vrata pa jo zavrnejo. Med razvijanjem uporabite glavna vrata.

Vrata služijo navadnemu HTTP, stran pa pošilja ključe API. Ohranite privzeti povezovalni naslov in postavite obratni proxy z TLS pred njim. Povezovalni naslov, ki ni povratna zanka, zabeleži to obvestilo:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Enak povratne zanke, ki ne pošlje nobene glave za posredovanje, se šteje kot lokalni na glavnih vratih. Torej mora proxy na istem gostitelju poslati `X-Forwarded-For`. Proxy na zasebnem naslovu je zaupanja vreden za to glavo samo z `OMNIROUTE_TRUST_PROXY=private` (ali `lan`). Vsak drug vrstnik je sporočen z naslovom svoje povezave, glave za posredovanje, ki jih je poslal, pa se izbrišejo.

Poslušalec ima največ 256 povezav hkrati. Odjemalec ima na voljo 10 sekund, da pošlje glave zahteve, in 30 sekund, da pošlje celotno zahtevo. Nedejavna vzdrževalna povezava se prekine po približno 5 sekundah. Povezava brez dejavnosti 60 sekund je zaprta. Te vrednosti so fiksne. Nastavite tudi omejitve povezave in hitrosti na povratnem proxyju spredaj. Obratni proxy na sprednji strani bi moral ohraniti nedejavne povezave navzgor manj kot 5 sekund ali pa jih ne bi ponovno uporabil. Rele do glavnih vrat uporablja časovne omejitve v zgornjem toku vrat API (`API_BRIDGE_*`).

Poslušalec se zažene tudi, ko `API_PORT` ni nastavljen. `QUOTA_PANEL_PORT` morajo biti vrata od 1 do 65535, zapisana samo s ciframi. Razlikovati se mora od vrat armaturne plošče in vrat API. Medtem ko je strežnik WebSocket v živo vklopljen, se mora tudi razlikovati od `LIVE_WS_PORT` (privzeto 20132). Katera koli druga vrednost ne odpre ničesar in zabeleži opozorilo. Opozorilo o zavrnjeni vrednosti poimenuje spremenljivko in ne ponavlja vrednosti. Vrata, ki so že v uporabi, ne odprejo ničesar in zabeležijo to opozorilo:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Z nastavljenim `OMNIROUTE_BASE_PATH` poslušalec pričakuje vse zgornje poti pod to predpono. Uporabite isti `OMNIROUTE_BASE_PATH` v času gradnje in med izvajanjem. Napišite ga z začetno poševnico in brez končne poševnice, na primer `/omniroute`. Druga oblika, vključno z `/` in `/omniroute/`, zapusti vrata z opozorilom, čeprav zgradba sprejema te oblike. Enako velja za osnovno pot, katere prvi segment imenuje pot aplikacije: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` ali `connect`, v vsakem primeru.

Omejitve:

- `/quota/{provider}/` s poševnico na koncu odgovori 404 na teh vratih.
- Storitveni delavec in manifest spletne aplikacije se ne strežeta na teh vratih.
- Nastavljena ikona priljubljenega po meri na nadzorni plošči ni prikazana na teh vratih.
- Ikone niso prikazane, ko se aplikacija izvaja pod osnovno potjo.
- Pristanišče govori navaden HTTP/1.1.
- Vezava, ki ne uspe, se ne poskusi znova, dokler se postopek znova ne zažene.
- Poslušalec nima povezave ali omejitve hitrosti na naslov odjemalca.
- Nastavitve vsebnika niso zajete v tem razdelku.

---

## Spremenljivke okolja

| Spremenljivka                        | Privzeto          | Opis                                                                           |
| ------------------------------------ | ----------------- | ------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`          | Gonilnik za uporabo: `sqlite` ali `redis`                                      |
| `QUOTA_STORE_REDIS_URL`              | _(prazno)_        | Redis URL, npr `redis://localhost:6379`                                        |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`             | 0..1; `>= threshold` aktivira strogi način                                     |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`            | Žetoni, ki pojasnjujejo največ eno točko okna načrta odstotka                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`             | 0..1; množitelj za kombinirani rezultat mehke politike                         |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`              | Dnevi, preden GC odstrani stara vedra `quota_consumption`                      |
| `QUOTA_PANEL_PORT`                   | _(nenastavljeno)_ | Namenska vrata za samopostrežno stran. Nenastavljeno pomeni, da ni poslušalca. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`       | Vezani naslov za ta vrata                                                      |

nastavitve DB (`quotaStore.*`) preglasijo env vars.

---

## Odpravljanje težav

### Redis je konfiguriran, vendar se ne poveže

Preverite, ali je `ioredis` nameščen (`npm ls ioredis`) in ali je
`QUOTA_STORE_REDIS_URL` dosegljiv. Ob neuspešni povezavi tovarna preklopi nazaj
na SQLite (zabeleženo na ravni `warn`).

### `peek` vrača zastarele podatke / omogoči dostop ob napaki

Če `peek` sproži izjemo, `enforceQuotaShare` rezultat obravnava kot »dovoli«
(omogočanje dostopa ob napaki). V dnevnikih `pino` preverite vnose
`quota:enforce` in `quota:factory`, da ugotovite osnovni vzrok.

### Odstopanje števca porabe

Če se dejanska poraba ponudnika razlikuje od števcev, je to pričakovano —
drsno okno z 2 segmentoma ima na mejah okna približno 1-% napako, `consume`
pa se po odgovoru izvede brez čakanja na rezultat. Signal nasičenosti
(`saturationSignals.ts`) bere dejansko izkoriščenost ponudnika s 30-sekundnim
TTL-jem in temu ustrezno prilagodi `globalUsedPercent`.

### Skupina za stopnjo porabe prikazuje »ni podatkov«

`computeBurnRate` zahteva vsaj 2 zgodovinska vzorca. Nove skupine brez predhodnih
klicev `consume` bodo prikazale `tokensPerSecond: 0` in `timeToExhaustionMs: null`.

---

## Migracija iz localStorage

Ko se `/dashboard/costs/quota-share` prvič naloži, hook `useLocalStoragePoolMigration`
preveri:

1. `localStorage.getItem("omniroute:quota-share:pools")` ni prazen.
2. `GET /api/quota/pools` vrne `[]` (podatkovna zbirka je prazna).

Če oba pogoja držita, paketno pošlje vsak podedovani sklad na `POST /api/quota/pools`,
nato pa odstrani ključ localStorage. Migracija je idempotentna: pogoj 2 preprečuje
ponovno migracijo.

---

## Interna klasifikacija strategije

`quota-share` je strategija usmerjanja **samo za interno uporabo** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Uporabljajo jo izključno sistemsko ustvarjene
kombinacije skladov `qtSd/` in je namenoma izključena iz `ROUTING_STRATEGY_VALUES`, zato se nikoli
ne prikaže kot možnost, ki bi jo uporabnik lahko izbral v uporabniškem vmesniku ali API-ju.

---

## Pokritost testa

Dve ravni avtomatiziranega kritja sta opremljeni z motorjem za delitev kvot:

| Apartma               | Ukaz                                                                   | Kaj zajema                                                                                                                                                                                                               |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enota (29 testov)     | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | razporejevalnik DRR, preklop nasičenosti, omejitve sočasnosti, matematika fairShare, čakanje v čakalni vrsti                                                                                                             |
| Integracijska matrika | `npm run test:combo:matrix`                                            | Odločitev o usmerjanju od konca do konca prek pravega kombiniranega cevovoda; DRR poštenost + nasičenost deprioritizacija prek živih šivov (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integracijska matrika teče v CI poleg vseh 22 javnih strategij. Paket enot se lahko izvaja samostojno.

---

## Povzetek sheme DB

Tri tabele, dodane s selitvami `078`, `079` in `085`:

- `quota_pools` + `quota_allocations` — definicije področja in dodelitve po ključu.
- `quota_consumption` — kotalni števci z 2 vedri na `(apiKeyId, dimensionKey)`.
- `provider_plans` — ročne preglasitve načrta ponudnika (dimenzije JSON na connectionId).

Vse tabele so dodane prek idempotentnih migracij `CREATE TABLE IF NOT EXISTS`.

Posojanje s soglasjem doda tri stolpce: `quota_allocations.lending_percent` (celo število, privzeto 0), `quota_allocations.lending_until` (milisekunde epohe ali `NULL` brez roka) in `quota_pools.borrow_mode` (privzeto `saturation`). Njegova selitev samo doda te stolpce in ne zapiše nobene obstoječe vrstice.

Knjiga dodeljevanja odstotkov dodaja `quota_percent_ledger` (ena vrstica na skupino, račun in okno načrta) in `quota_percent_ledger_tokens` (en števec žetonov na skupino, račun in ključ API ). `src/lib/db/quotaPercentLedger.ts` jih bere in zapisuje.
