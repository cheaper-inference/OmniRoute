# Quota Sharing Engine (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumendi viide**: `docs/routing/QUOTA_SHARE.md`
> Osa rühmast B (plaanid 16 + 22).

---

## Ülevaade

Kvoodijagamismootor jaotab teenusepakkuja ajapõhise kvoodi (nt Codexi
5-tunnine aken, Kimi 1500 päringut tunnis) õiglaselt mitme sama ühendust jagava
API-võtme vahel.

**Probleem, mille see lahendab:** OmniRoute vahendab paljusid API-võtmeid sama ülesvoolu
teenusepakkuja konto kaudu. Ilma jagamisloogikata võib võtme A päringute puhang ammendada
teenusepakkuja tunnikvoodi, jättes võtmed B ja C blokeerituks kuni akna lähtestamiseni.
Mootor hoiab seda ära järgmiselt:

1. Jälgib iga võtme jooksvat tarbimist dimensioonide kaupa (%, päringud, tokenid, $).
2. Rakendab tööd säilitavat õiglase jaotuse algoritmi: võti võib laenata jõude seisvatest
   osadest seni, kuni globaalne kogum ei ole küllastunud.
3. Jõustab tulemuse põhitäitmisrajal (`chatCore.ts`) enne, kui päring
   jõuab ülesvoolu täiturini.

---

## Algoritm: õiglane jagamine töö säästmine

Rakendatud `src/lib/quota/fairShare.ts`.

### Režiimid

| Seisund                                    | Režiim    | Käitumine                                                                              |
| ------------------------------------------ | --------- | -------------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Helde** | Võti võib laenata kuni globaalse limiidini, millest on maha arvatud tarbitud kogusumma |
| `globalUsedPercent >= saturationThreshold` | **Range** | Kehtestage rangelt individuaalset õiglast jaotust                                      |

Vaikimisi `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Need kaks režiimi kirjeldavad basseini vaikelaenurežiimis `saturation`. `consent` -režiimis bassein järgib alati rangeid reegleid, olenemata küllastumisest. Vt [Nõusolekuga laenamine (pooli liitumine)](#consented-lending-per-pool-opt-in).

### Dimensioonipõhine otsus

Mootor arvutab iga basseini aktiivse mõõtme jaoks:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

`percent` dimensioonide puhul pärineb `consumed` selle asemel omistamisraamatust (vt [jaotist Dimensioonide protsent: võtmepõhine omistamine](#percent-dimensions-per-key-attribution) ).

Seejärel:

- **`policy = hard`** : kui `consumed > fairShareAllowed` ja režiim on range →** blokk** .
- **`policy = soft`** : kui `consumed > fairShareAllowed` ja režiim on range →** karistada** (prioriteetide määramine kombinatsioonis; mitte kunagi kõvablokeering).
- **`policy = burst`** : luba, kuni ülemaailmne vaba ruum on olemas, olenemata õiglasest jaotusest.

### Absoluutne kork

`capValue` + `capUnit` jaotamisel on režiimist või poliitikast sõltumatu kõva ülemmäär. Iga mõõde, kus `consumed >= capValue` alati** plokid** taotlus. `percent` -korgi puhul on `consumed` ainult võtmele omistatud osa.

### Mitmemõõtmeline kontroll

Taotlus blokeeritakse, kui** ükskõik milline** dimensioon basseinis blokeeriks selle. Mõõdud on sõltumatud — a 5h% ammendumine ei mõjuta nädala% mõõdet.

### Laenamine

Suures režiimis võib võti, mille jaotust alakasutatakse, kasutada teiste võtmete jaotamata osade ülejääki. Valem on:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kus `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (selle mõõtme jaoks bassein `limit` ) on alati kõva lagi.

### Nõusolekuga laenamine (basseinipõhine valik)

Igal basseinil on laenurežiim. `saturation` on vaikeseade ja järgib ülaltoodud reegleid. `consent` režiimis edastab `hard` -võti oma osa ainult selle mahu piires, mille teised võtmed on nõustunud laenutama. Administraator määrab iga basseini režiimi. Iga võtmeomanik annab oma nõusoleku [laenuandmise nõusoleku](#lending-consent) kaudu.

Nõusolek on protsent vahemikus 0 kuni 100 ja valikuline tähtaeg epohh-millisekundites. Võti laenab selle protsendi oma jõudeolevast osast, kuni tähtaeg on tulevikus.

Ühe dimensiooni jaoks on `L` efektiivne piirang: plaani limiit korrutab kogumis olevate kontode arvu. Värav arvutab taotleva võtme jaoks:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` on võtme kaal või `100 / n` iga klahvi jaoks, kui ükski kaal ei ületa 0. `lend_k` on võtme aktiivse protsent ja 0, kui selle tähtaeg on möödas. Taotleja võtme enda nõusolek ei lähe kunagi arvesse. `hard` -klahvist keeldutakse, kui selle tarbimine saavutab oma osa pluss `borrowAvailable`.

Mahutavus, mille kohta jaotusnõudeid ei ole (100 miinus kaalude summa), ei ole laenutatav. Ükski võti ei nõustunud seda laenutama.

**Näide.** `L` on 1000.

| Võti | Kaal | Jaga | Tarbitud | Laenab |
| ---- | ---- | ---- | -------- | ------ |
| A    | 50   | 500  | 530      | 0%     |
| B    | 30   | 300  | 100      | 50%    |
| C    | 0    | 0    | 60       | 0%     |

- B laenab 50% oma tühikäigust 200, mis on 100. C võttis juba 60 üle oma osa. A võib laenata 40.
- A serveeritakse hinnaga 530 ja keeldutakse, kui selle tarbimine jõuab 540-ni.
- Enne kui C midagi kasutas, kui A oli oma aktsia juures või alla selle, võis C laenata 100.
- Enne kui C midagi kasutas, kui A oli 530, võis C laenata 70.

**Null kaal.** Võtme kaaluga 0 osakaal on 0. Seda serveeritakse ainult siis, kui selle tarbimine jääb alla teiste laenatavale. Kui keegi ei laena, lükatakse see tagasi juba esimesest taotlusest.

**Tähtajad.** Ükski taustaülesanne ei aegu nõusolekut. Iga päring võrdleb tähtaega oma ajaga ja sellega võrdne tähtaeg on möödas. Salvestatud tähtaeg, mis ei ole lõplik arv või on möödunud `Date` suurimast kuupäevast, loetakse möödunuks.

**`soft` ja `burst`.** Laenamine neid ei piira. Kui `soft` -võti on oma jaotusest möödas, siis selle prioriteedid tühistatakse. `burst` -võti läheb läbi, kui basseinis on ruumi. Basseini lagi keeldub endiselt igast võtmest, kui basseini kogusumma jõuab oma piirini.

**Taotluse tee kulu.** `saturation` bassein ei loe midagi enamat kui varem. `consent` kogumis loeb loendatav dimensioon teisi võtmeid ainult `hard` -võtme puhul, mis on selle osakaaluga või sellest suurem, samal ajal kui teine võti laenab. Seejärel loeb see paralleelselt ühe teise klahvi kohta. Ebaõnnestunud lugemine loetakse selle võtme kuluks 0. `percent` dimensioon ei lisa lugemist, kuna omistamisraamat sisaldab kõiki võti.

**Basseini toimetamine.** Redigeerimine säilitab allesjäänud võtmete nõusoleku. See kehtib jaotamise muudatuste, grupiüleste asenduste ja `ensure` kõnede kohta. Eemaldatud võti kaotab nõusoleku ja tagasi lisatud võti algab nullist. Administraatori marsruudid tagastavad iga võtme nõusoleku ega kirjuta seda kunagi. Kui lülitate basseini tagasi `saturation` säilitatakse kõik salvestatud nõusolekud, mis selles režiimis ei mõjuta. Kui lülitate basseini uuesti `consent` aktiveeritakse uuesti salvestatud nõusolekud, mille tähtaeg ei ole möödunud. Võtmeomanik saab salvestatud nõusoleku kustutada mõlemas režiimis.

**Uuendamine.** Kui veerud `lending_percent` ja `lending_until` on juba olemas, lisab migratsioon ainult `borrow_mode` ja salvestatud protsendid jäävad samaks. Iga bassein käivitub `saturation` režiimis. Lülitage basseini viisardis sisse `consent` basseini kohta. Salvestatud väärtustest ei järeldata midagi.

**Piirangud.**

- Laenuandja leiab basseini ülemmäärast enne, kui ta kasutab oma osa. Teiste laenatud maht arvestatakse basseini kogumahu hulka.
- Kontroll jookseb enne päringut ega reserveeri midagi. Samaaegsed päringud loevad tarbimist enne nende registreerimist, nii et laenatud võimsust saab kulutada rohkem kui üks kord, piirdudes lennu ajal olevate päringutega. `saturation` -režiimi aktsiakontrollil on sama omadus.

---

## Libiseva akna loendur

Rakendatud failides `src/lib/quota/sqliteQuotaStore.ts` ja `redisQuotaStore.ts`.

Kaks salve iga `(apiKeyId, dimensionKey)` paari kohta:

- `curr`: praegune salv (`floor(nowMs / windowMs)`)
- `prev`: eelmine salv (`curr - 1`)

Efektiivne jooksev väärtus:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Täpsus**: ~99% täpne. Viga on salvete vahelisel piiril maksimaalselt 1% akna
suurusest (2 salvega lähenduse olemuslik omadus).

### Samaaegsus

SQLite'i draiver: mälusisene mutex iga `(apiKeyId | dimensionKey)` võtme kohta takistab
lugemise-muutmise-kirjutamise võidujooksu. Muster järgib faili `src/sse/services/auth.ts` päringutulva vältimise lahendust.

Redise draiver: Lua EVAL-i skript atomaarseks suurendamiseks — käivitatakse ühe Redise käsuna.

---

## Draiverid

### SQLite (vaikimisi, installimist pole vaja)

- Tabel: `quota_consumption` (vt migratsioone `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Sobib kõige paremini ühe instantsiga juurutustele.
- Kõik püsivandmed asuvad olemasolevas OmniRoute'i SQLite'i andmebaasis (`DATA_DIR/storage.sqlite`).

### Redis (valikuline, mitme instantsi jaoks)

- Nõuab npm-i paketti `ioredis`.
- Loendurid salvestatakse Redisesse; metaandmed (kogumid/jaotused) jäävad SQLite'i.
- Sobib kõige paremini mitme replika juurutustele, kus loendureid tuleb jagada.

### Draiverite vahetamine

Seadete kasutajaliidese kaudu (`/dashboard/settings` → Kvoodisalvesti) või keskkonnamuutujate kaudu:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Andmebaasi seadistus on keskkonnamuutujast prioriteetsem. Kui `driver=redis`, kuid URL puudub või
`ioredis` pole installitud, võtab tehas kasutusele SQLite'i ja logib hoiatuse.

Draiveri valimise järjekord:

1. Andmebaasi seadistus `quotaStore.driver`
2. Keskkonnamuutuja `QUOTA_STORE_DRIVER`
3. Vaikimisi: `sqlite`

---

## Mitmemõõtmeline

Basseinil võib olla mitu mõõdet. Iga mõõde on sõltumatu:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Näide: Codex plaan** (5h% + nädalas%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Taotluse lubamiseks peab see vastama kõigile mõõtmetele.

### Protsendimõõtmed: omistamine võtme kohta

Protsendiplaan annab konto ja plaaniakna kohta ühe kasutusarvu. Pakkuja ei anna loendurit API klahvi kohta.

Selle arvu võtmete vahel jagamiseks peab iga kogum konto ja plaani akna kohta omistamisraamatut. `src/lib/quota/percentLedger.ts` järgib raamatu reegleid. `src/lib/quota/percentAttribution.ts` muudab raamatu numbriteks, mida jõustamine kasutab. Tulemuseks on iga võtmemarsruudi žetoonide põhjal koostatud hinnang.

#### Lugemised, mis liigutavad raamatut

Raamat liigub taotletud plaaniakna jaoks ainult pakkuja enda joonisel. Need ühendused näitavad ühte:

| Pakkuja                    | Planeeri aknad |
| -------------------------- | -------------- |
| ClaudeOAuth ühenduse kaudu | `5h`, `weekly` |
| Codex                      | `5h`, `weekly` |

Neid ei loeta lugemiseks:

- vastus, mille pakkuja klient märgib aegunuks
- Claude aken, mille protsenti pakkuja ei teatanud
- teise akna kuju või halvimal juhul üle akende
- kiiruspiirangu päise varu
- ebaõnnestunud lugemine

Teistel pakkujatel, sealhulgas API -klahviga Claude, pole raamatut. Nagu enne seda muudatust, võetakse iga võtme eest 0 protsenti nende mõõtmetelt.

Lugemine jagab küllastussignaali 30-sekundilist vahemälu. Claude näit on dateeritud selle järgi, millal joonist vaadeldi vastuse päistes või loeti kasutuse lõpp-punktist, kui see aeg on teada. Muud näidud on dateeritud selle vahemälu kirje loomise ajal.

#### Mida raamat säilitab

Iga salvestatud päring lisab oma märgid üks kord loendurisse kogumi, konto ja võtme kohta. Loendur ainult kasvab. Raamat sisaldab kolme asja:

- lähtejoon: arv, millal raamat avati või aken viimati pöörati
- viimane rakendatud joonis
- võtme kohta, selle märgiloendur samal hetkel, mida nimetatakse selle märgiks

Raamatut värskendatakse, kui jõustamine või kasutusteekond arvutab omistamise. Kirjutisi võrreldakse ja seatakse redaktsiooninumbrile. Kirjanik, kes kaotab värske lugemise järel korduskatse.

#### Kuidas võtme osa arvutatakse

Iga klahvi osa arvutatakse raamatu lugemisel. Joonise kasv alates baasjoonest jagatakse võtmete vahel proportsionaalselt žetoonidega, millest igaüks on marsruuditud alates märgist.

Together, selgitavad need märgid maksimaalselt ühte punkti `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` märgi kohta (vaikimisi 1000). Kasv, mida nad ei seleta, on väline. Lähtejoon on ka väline.

Näiteks raamat avaneb 0. Klahv A suunab seejärel 900 000 märki ja võti B suunab 100 000. Arvu 60 korral on A osa 54 punkti ja B osa 6.

Võtme märgist allpool olev loendur on taaskäivitatud ja loeb täielikult. Ilma märgita võti, näiteks võti, mis liitub basseiniga akna keskel, loeb kõik oma märgid kokku. Märgistustest mahajäänud arv põhjustab vea, mis kaob järgmisel lugemisel. See ei kogune.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` loetakse igal omistamisel. Väärtus, mis ei ole lõplik arv vähemalt 1, langeb tagasi 1000-ni.

#### Kuidas lugemine raamatut muudab

Kehtib esimene sobitusreegel:

1. **Raamatut veel pole:** lugemine avab raamatu. Selle arv on lähtejoon ja iga loendur on märgitud.
2. **Vanem lugemine:** lugemit, mis on dateeritud enne viimati rakendatud näitu, eiratakse. Nii on ka näit, mille lähtestusaeg on rohkem kui 30 minutit varasem kui salvestatud.
3. **Uus pakkuja aken:** lähtestamisaeg rohkem kui 30 minutit hiljem kui salvestatud aeg raamatut pöörab. Joonisest saab lähtejoon ja iga loendur märgitakse uuesti. Ilma loendurita võtmed lahkuvad raamatust.
4. **Lõppenud aken:** salvestatud lähtestusaeg, mis ei ole pärast näidu andmete aega, tähendab, et aken on lõppenud. Lugemine muudab raamatu, olenemata selle kujundist.
5. **Kõrgem näitaja:** liigub ainult viimane kuju. Lähtejoon ja märgid jäävad.
6. **Sama kujund:** figuur, baasjoon ja märgid jäävad alles. Kirjutatakse vaid lähtestusaeg, mis raamatul puudub.
7. **Alumine näitaja:** madalamat arvu sellisena ei rakendata kunagi. See pöörab raamatut ainult siis, kui kolm asja kehtivad. See on vähemalt kaks minutit uuem kui viimati rakendatud näit. Miski ei ütle, et aken on sama avatud. See on rohkem kui üks punkt madalam.

Aken loetakse samaks avatud aknaks, kui kolm asja hoiavad. Mõlemad lähtestamisajad on teada. Need asuvad üksteisest 30 minuti kaugusel. Salvestatud on veel lugemisel ees. Madalam näitaja selle akna sees ei muuda midagi.

Lähtestamise aeg salvestatakse ainult siis, kui see on seda kandva näidu andmeajast ees. Kõrgem arv salvestab oma näidu lähtestamise aja, kui see on kasutatav, ja säilitab salvestatud aja muul viisil. Võrdne arv registreerib oma lugemise lähtestamise aja ainult siis, kui raamatul seda pole. See ei muuda midagi muud. Madalam näitaja, mis ei pööra raamatut, ei näita lähtestusaega.

#### Kui raamatut kasutatakse

Pärast lugemist kasutatakse raamatut, välja arvatud juhul, kui selle salvestatud lähtestamise aeg ei ole praegusest ajast hilisem. See juhtum tekib siis, kui vahetult enne lähtestamist tehtud näitu, näiteks vahemälust esitatud näitu, jälgitakse vahetult pärast seda.

Ilma kasutatava lugemiseta kasutatakse salvestatud raamatut ainult seni, kuni see võib olla praeguse akna raamat. See kehtib kahel juhul:

- selle lähtestamise aeg on teada ja alles ees
- sellel ei ole lähtestusaega ja viimane näit, mis seda muutis, on maksimaalselt 15 minutit vana

Muidu ei omistata midagi, nagu siis, kui raamatut pole. Raamatu eest, mille salvestatud lähtestamise aeg on möödas, ei võeta kunagi tasu.

#### Jõustamine

Võtme tarbimine protsentides on selle omistatud osa pluss osa välisest osast. Väline osa kasutab esmalt võimsuse jaotamise nõudeid (100 miinus kaalude summa). Võtmete vahel jagatakse kaalu järgi vaid ülejääk.

Seda tarbimist võrreldakse võtme õiglase osaga nagu mis tahes muu mõõtme puhul. Range režiim käivitub ikka siis, kui küllastussignaal jõuab `QUOTA_SATURATION_THRESHOLD` (vaikeväärtus 0,5). Iga arv on skaleeritud kehtiva limiidi järgi: konto piirang korrutatakse kogumis olevate kontode arvuga.

`capUnit: "percent"` -ga absoluutne kork arvestab ainult samamoodi skaleeritud võtmele omistatud osa. Võtke konto kohta limiit 100 ja k kontot. Ülempiir N saavutatakse siis, kui võtme osa teenindava konto arvust jõuab N/k punktideni. Iga kontot võrreldakse selle raamatuga. Näiteks kahe konto puhul saavutatakse ülempiir 10 ühe konto arvu 5 punkti juures.

Kui poodi ei saa lugeda, ei omistata midagi ja iga võtme eest võetakse selle dimensiooni eest 0. Kui raamatu kirjutamine ebaõnnestub, kasutab see omistamine raamatut sellisena, nagu seda loeti. Ebaõnnestunud märgi kirjutamine jätab selle taotluse märgid raamatust välja. Ükski neist tõrgetest ei blokeeri taotlust.

`consent` kogumis kasutab laenuvalem iga võtme tarbimist protsendidimensioonil, nagu eespool kirjeldatud. Kui laenab teine võti, loetakse raamat üks kord läbi ja omistatakse igale võtmele. Ilma kasutatava raamatuta on iga võtme tasu 0. Kaaluga võti läheb siis läbi ja 0 kaaluga võti läheb edasi ainult siis, kui laenab teine võti.

#### Kasutusmarsruut

`GET /api/quota/pools/{id}/usage` edastab samad numbrid sama funktsiooni kaudu. Protsendimõõtmel on `accounts` üks sisestus basseiniühenduse kohta. Selle tipptasemel `consumedTotal` ja `perKey` peegeldavad esimest kirjet.

Marsruut rakendab ka praegust lugemist, nii et see võib raamatut vastavalt soovile edasi viia. `internal + external` võib `consumedTotal` -st erineda, kui kasutatavat näitu pole või kui madalamat arvu ei rakendata.

#### Säilitamine ja säilitamine

Raamatut hoiavad mõlemad kvoodipoed. SQLite puhul eemaldab automaatne andmebaasipuhastus, kui see on lubatud, read, mida pole 60 päeva jooksul värskendatud. Redis s jagavad basseiniühenduse raamatud ja loendurid ühte võtit. See aegub 60 päeva pärast selle viimast märgi kirjutamist või raamatu muutmist. Raamatut, mis ei muutu, ümber ei kirjutata, seega määratakse piir pikima plaaniakna kohale. Käsitsi kasutusajaloo lähtestamine tühjendab ka SQLite raamatud (vt Piirangud).

#### Piirangud

- Konto kogukasv alates baasjoonest jagatakse iga sellest ajast saadik marsruutitud võtmete märkide järgi. Millal see kasv toimus, pole vahet.
- Nii et väljaspool OmniRoute tehtud kasutuse eest tasutakse võtmete summa ulatuses, mida nende märgid lubavad. See hõlmab kasutamist enne võtme esimest aknapäringut, kui raamat oli juba avatud.
- Näiteks väliskasutus suurendab kontot 60 punkti võrra, samas kui olulisi marsruute pole. Seejärel suunab võti 30 000 märgini ja see arv ulatub 60,6-ni.
- Kui raamat oli enne kasutamist avatud, on võtme osa 30 punkti. See kannab ka 7,65 välist kasutamist, nelja klahvi kaal 25.
- Kui raamat avatakse pärast seda kasutamist, on 60 punkti lähtetasemeks. Võtme osa on 0,6 punkti ja see kannab 15 välist kasutamist.
- Taotlus või kasutustee külastus avab raamatu. Nii et see, kas selline kasutus loetakse lähtetasemeks, sõltub raamatu avamise ajast.
- Vaikimisi madalaima tasemega võti, mis suunab 60 000 märki, samal ajal kui väliskasutus tõstab kontot 60 punkti, saab kõik 60 oma osana.
- Põrandaga 50 000 on oma osa 1,2 punkti. Teised 58.8 on välised ja laaditakse kaalu järgi, nagu iga väliskasutuse puhul.
- Seadke `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` oma plaanis ühe punkti maksumuse lähedale. Väliskasutus hõlmab sama konto liiklust võtmetelt väljaspool basseini.
- Protsendipiir kehtib igas režiimis. Piiratud võtme kasutamisest saab keelduda, kui konto on palju alla küllastusläve.
- Võtke varem aknast 10 ja 12 väliskasutuse punkti kork. Võtmest, mis suunab 20 000 žetoon, keeldutakse seejärel kontoarvuga 12,4%.
- Jaotus on hinnang märgi mahu järgi. Päring loetakse selle viipade ja lõpetamise märkidena. Vahemälu allahindlused ja mudelihinnad seda arvu ei muuda.
- Päring, mis ei lõpe olekuga 200, ei registreeri märke. Näited on voog, mille klient katkestab, ja ülesvoolu viga pärast kasutamist.
- Sellise päringu põhjustatud kasutuse eest tasutakse võtmeid, mis salvestasid märke, kuni nende lubade ulatuses. Ülejäänu on väline. See ei liigu tagasi. Vastus, mis teatab märgi kasutamise puudumisest, ei registreeri ka märke.
- Pooleli oleva päringu kasutamine võib kogu päringu jaoks kuvada mõne muu aktiivse võtme osa. See liigub tagasi ainult siis, kui päring lõpeb olekuga 200.
- Kasutus, mis on juba kontol raamatu avamisel, loetakse väliseks. See hõlmab täiendust, uut basseini ja uut kontot. Kasutamine uues aknas enne selle esimest lugemist loetakse ka väliseks.
- Iga võti algab selle kasutuse kaaluosaga, pärast mahutavuse jaotamise nõudeid. Kui üks konto on 85% ja viis klahvi kaaluga 20, algab igaüks 17-st 20-st kasutatud klahvist.
- Mitme kontoga kogumis rakendatakse summeeritud eelarvele esituskonto arv. See on raamatus muutmata.
- Madalamat numbrit akna sees, mille pakkuja teatab avatuks, ei rakendata. Lähtestamisaega, mis liigub rohkem kui 30 minuti võrra tagasi, käsitletakse vana näiduna.
- Mõlemal juhul säilitab raamat oma oleku kuni salvestatud lähtestamise aja möödumiseni. Pärast seda ei võeta raamatu eest tasu enne, kui lugemine muudab selle.
- Abinõu on kasutusajaloo käsitsi lähtestamine (`POST /api/settings/purge-usage-history`). See tühjendab omistamisraamatud ja nende märkide loendurid SQLite andmebaasis.
- `all` periood tühjendab iga raamatu ja loenduri. Lühem periood kustutab kõigepealt raamatud, mis pole selle sees kirjutatud. Seejärel tühjendab see loendurid, mis pole selle sees, vaid ainult basseiniühenduse jaoks, millel pole ühtegi raamatut. Hoitud raamat märgib ikka iga klahvi vastu loendurit.
- Raamatut, mille kuju pole liikunud, ümber ei kirjutata, nii et lühem periood võib ka praeguse akna raamatu tühjendada. Järgmine lugemine avab siis värske raamatu praeguse näitaja juures.
- Lähtestamine ei puuduta Redis kvoodipoodi. Seal lõpeb raamat oma aknaga või aegub 60 päeva pärast viimast kirjutamist.
- Kui teenusepakkuja lähtestamisaega ei saada, näib aken, mis lähtestab ja täitub kahe näidu vahel vana näitaja kohal, suurem näitaja. Raamat säilitab vana baasjoone ja märgid.
- Näidud on dateeritud kohaliku kella järgi. Kui see jookseb teenusepakkujast ette või kui allikas teatab lähtestamisajast veidi varem, võib raamat selle erinevuse varakult ära tunda.
- Selle lühikese ajavahemiku kasvu jagavad sellesse suunatavad märgid. Järgmise akna esimene lugemine parandab selle. Kui pööratud raamatul ei ole lähtestusaega, vajab see parandus vähemalt kaks minutit madalamat numbrit, mis on viimati rakendatud näit.
- Juhtumid, mis jagavad Redis poe kuupäevanäitu oma kelladega, seega hoidke need kellad sünkroonis. Näidud eksemplarist, mille kell jookseb tagapool, näevad välja vanemad ja neid eiratakse.
- Kui pärast salvestatud lähtestusaega ei saabu ühtegi kasutatavat näitu, ei jõustata võtmeprotsentide jagamist ja protsendimäärasid enne, kui näit naaseb. Ilma lähtestusajata algab see 15 minutit pärast viimast lugemist, mis raamatut muutis.
- Redis poes võib 60 päeva seisva raamatu kehtivusaeg kirjaliku tšeki ja selle kirjutamise vahel aeguda. Seejärel luuakse see uuesti versiooniga, mis on suurem kui 1, mis on kehtiv olek.

---

## Paketilahendaja

Rakendatud failis `src/lib/quota/planResolver.ts`.

Prioriteetsus (kõrgeimast madalaimani):

1. **Andmebaasi käsitsi määratud ülekirjutus** — tabel `provider_plans`, iga `connectionId` kohta.
2. **Teadaolev kataloog** — `src/lib/quota/planRegistry.ts` (ainult andmed).
3. **Tühi pakett** — mõõtmed puuduvad, vajalik on käsitsi seadistamine.

### Teadaolev kataloog

| Pakkuja               | Mõõtmed                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, teadmata), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Vaikeväärtus puudub — vajalik on käsitsi seadistamine         |

---

## Torujuhtmete integreerimine

### PRE konks (`open-sse/handlers/chatCore.ts`)

Käivitatakse enne ülesvoolu käivitajat, pärast autentimist ja eeskirjade kontrollimist:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Ebaõnnestunud** : kui `enforceQuotaShare` viskab, lubatakse päring `pino.warn` logiga läbi. See takistab kvoodimootori veal kogu liiklust blokeerimast.

**Kui võimsus taastub.** Võtmeosa või basseini lae juurest keeldumine lõpeb mõlema laenurežiimi puhul ühega kahest lausest:

- `percent` aken: `. The <window> window resets at <time>.` Kellaaeg on lähtestamine, mille pakkuja teatab.
- Loendatav ühik: `. Enough <window> usage is expected to clear by <time>.` Aeg on libiseva akna ülemine piir, kui võti muud ei saada.

`<time>` on ISO 8601 instant UTC. Seejärel kannab keeldumine `Retry-After`: terved sekundid kuni selle hetkeni pluss üks. Klient, kes ootab nii kaua, proovib uuesti kõige rohkem üks sekund pärast hetke. Kui hetk pole teada, ei sisalda keeldumine ei lauset ega päist. Absoluutne ülempiirist keeldumine ei hõlma kumbagi. Avalik kood jääb `quota_share_blocked`.

Jagamisest keeldumine ei puuduta jagatud ühendust. See ei määra jahtumist, mudelilukku ega teenusepakkuja kaitselüliti riket ning basseini teisi võtmeid serveeritakse jätkuvalt. Kui kombinatsiooni iga sihtmärk keeldub oma osa võtmest, vastab kombinatsioon 429 ootamata. Selle vastuses on vihje `Retry-After`. Manustustee lõpetab keeldumise sama lausega ega saada `Retry-After`.

### POST konks (rekordiline tarbimine)

Pärast edukat vastust:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Triiviv noot** : kui `consume` järelvastus ebaõnnestub, loeb veerev loendur alaloenduse. Pakkujalt saadav küllastussignaal (nt `anthropic-ratelimit-unified-5h-utilization`) parandab järgmise päringu korral üldist hinnangut.

### Kombineeritud pehme karistus (`open-sse/services/combo.ts`)

Kui `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Karistust rakendatakse pärast kõiki muid punktiarvestuse tegureid. See vähendab automaatse kombineerimise tõenäosust küllastunud võtme valimisel ilma seda kõvasti blokeerimata.

---

## UI Läbikäik

### `/dashboard/costs/quota-share` — Põhibasseinide leht

Komponendid (kõik `src/app/(dashboard)/dashboard/costs/quota-share/` keeles):

| Komponent              | Eesmärk                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Sissejuhatav kaart, mis selgitab uutele kasutajatele kvoodi jagamist        |
| `CreatePoolModal`      | Looge uus kvoodikogum (ühenduse + nimi + esialgsed jaotused)                |
| `PoolCard`             | Kogumipõhine kokkuvõte: nimi, ühendus, jaotuste arv                         |
| `DimensionBar`         | Dimensioonide kaupa virnastatud riba: iga võtme osakaal + globaalne kasutus |
| `AllocationTable`      | Tabel tarbitud, õiglase osaga, deficit/surplus, laenulipuga                 |
| `BurnRateChart`        | EMA põlemissageduse joondiagramm (laisk taasgraafikud `dynamic()` kaudu)    |
| `EditAllocationsModal` | Redigeerige kogumi jaotuse kaalusid, ülemmäärasid ja eeskirju               |
| `BorrowModeField`      | Laenamisrežiimi valija (`saturation` või `consent`) viisardis               |
| `LendingBadge`         | Kirjutuskaitstud märk võtmel, mis laenab, ainult `consent` basseinides      |

Laenumärk näitab protsenti ja, kui see on määratud, tähtaega UTC koos tsooniga. See hindab tähtaega kasutamise hetkeseisu ajal. Aegunud või loetamatu tähtaeg kuvatakse kui `lending expired`.

Lehe konksud:

- `usePools` — toob `GET /api/quota/pools` iga 30 sekundi järel.
- `usePoolUsage` — toob `GET /api/quota/pools/[id]/usage` nõudmisel.
- `useLocalStoragePoolMigration` — käitatakse monteerimisel üks kord, et LS pärandandmeid migreerida.

Basseini viisardi võtmete sammul on `Show usage by member to key holders` kast. See määrab basseini `memberBreakdown` valiku (vt [Liikmete kasutamine](#member-usage) ). Selle all hoiatab viisard, et keegi, kes teab, mida üks võti kasutas, saab selle klahviga riba sobitada. Kui ruut on märgitud, siis see ütleb nii, kui sammus on loetletud vähem kui kolm või rohkem kui 20 klahvi, kuna ribad jäävad siis peidetuks. See loendab etapi võtmeid ega suuda öelda, milline neist saab taotlusi esitada.

### `/dashboard/costs/quota-share/plans` — Pakkuja plaani konfiguratsioon

- `ProviderPlanConfigClient.tsx`: rippmenüü pakkuja valimiseks, lahendatud plaani vaatamiseks (automaatne kataloogist või käsitsi alistamine) ja mõõtmete muutmiseks.
- Muudatused kirjuta `PUT /api/quota/plans/[connectionId]`.
- Kustutamine naaseb kataloogi või tühja plaani.

---

## Self-service Quota API (lubatud)

`GET /api/v1/me/quota/{provider}` (serveeritakse ka `/v1/me/quota/{provider}`) võimaldab API võtmehoidjal oma võtmega lugeda, kui suur osa jagatud tellimusest on nende oma ja mis neid blokeerib. Marsruut on õhuke kest üle `src/server/selfService/quotaHandler.ts`; vaate ehitab `src/lib/quota/selfView.ts` ja selle vastuse leping on `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Lubamine ja autentimine

- Funktsiooni lipp `QUOTA_SELF_PANEL`, vaikimisi `false`. Kui see on välja lülitatud, saab marsruudile jõudnud päring numbri 404. `REQUIRE_API_KEY=true` puhul keeldub kliendi API -poliitika 401-ga puuduvast või kehtetust võtmest enne marsruudi käivitamist, olenemata lipust. Päring ilma võtmeta, kuid sisselogitud armatuurlaua seansiga läbib selle reegli ja saab marsruudi enda vastuse. Lipp lahendatakse nagu iga teine lipp (armatuurlaud või REST alistamine, seejärel samanimeline keskkonnamuutuja); vaata [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Iga kogumi kuvatav nimi ja iga ajakava silt tagastatakse kogumi võtmeomanikele täpselt nii, nagu administraator need kirjutas. Enne lipu sisselülitamist kontrollige, et need võtmehoidjad saaksid lugeda.
- Võti loetakse ainult päistest: `Authorization: Bearer <key>` või `x-api-key: <key>`. Kui mõlemad on saadetud, kasutatakse esimest, mis kinnitab. Päringustringis olevat võtit või küpsist ignoreeritakse. Serveri keskkonnavõtmest keeldutakse (401).
- Võti vajab `self:usage` ulatust (403 ilma selleta).
- Pakkuja segment kärbitakse, väikeste tähtedega ja seda võrreldakse `^[a-z0-9][a-z0-9._-]{0,63}$` (muul juhul 400), seejärel lahendatakse pakkuja registri kaudu, nii et pseudonüüm, näiteks `cc` loeb `claude` kogumeid. `claude` ja `anthropic` loevad samu basseine.

### Mida iga nähtavus näitab

| Nähtavus   | Nõuab                                                                        | Väljad                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oma osa    | `self:usage`                                                                 | `pools[]` (viide, nimi, pakkuja, poliitika, kaal, ülempiir), `dimensions[].yourShare`, `accounts[]` koos `yourShare` ( `percent` aknal ilma `attributed` ja `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                   |
| Konto tase | `self:usage` + `self:account-quota` ja pakkuja võtmes `sharedQuotaProviders` | lisab `dimensions[].total`, `accounts[].dimensions[].account` ja `accounts[].modelWindows`, `attributed` ja `external` `percent` `yourShare` ning `members` basseinile, kus liikmekasutus on sisse lülitatud (vt [Liikmekasutus](#member-usage) ) |

- `sharedQuotaProviders` on võtmepõhine säte (`PUT /api/keys/[id]/self-service`): `null`, vaikeseade, tähendab iga pakkujat, kelle poole võti jõuab; `[]` tähendab mitte ühtegi. Iga basseini `accountVisible` ütleb, milline nähtavus sellele rakendub.
- Kontoribasid ja mudeliaknaid kuvatakse ainult nende kontode puhul, mille ühendust võti võib kasutada. Kui võtmel on lubatud ühenduste loend, säilitab sellest väljaspool asuv konto oma `Account N` kirje ilma `account` või `modelWindows`. Tühi loend tähendab piirangute puudumist, nagu `/v1/me/status` puhul. Kogusumma (`dimensions[].total`) ei sõltu sellest loendist.
- Ainuüksi `self:usage` ga näidatud kaks figuuri pärinevad teiste klahvide kasutamisest. Ajakava eelarve `exhausted` peegeldab iga võtme tarbimist selle ajakava alusel. Kogumis, mille kõik kaalud on nullid, on võtme `weight` `100 / number of members`. Mõlemad on need, mida võtmele rakendatakse.
- Kogumi tuvastab ainult `ref`, läbipaistmatu väärtus, mis on seotud helistamisvõtmega. Selle kuvatav nimi (`name`) on lisatud nii, nagu administraator selle kirjutas. `ref` tuletatakse võtmest ja kogumist serveri API-võtme saladusega (`API_KEY_SECRET`). Kliendid ei tohi seda säilitada: see muutub, kui seda saladust pöörata.
- Kontod on basseini järjekorras loetletud `Account 1`, `Account 2`, …. Ühtegi basseini ID-d, ühenduse ID-d, konto e-posti aadressi ega konto nime ei tagastata ning vastus läbib lepinguskeemi, mis jätab kõik väljaspool seda välja.
- Loendatavad ühikud (`requests`, `tokens`, `usd`) esitatakse basseini salgina, mida kvoodivärav jõustab: `limit` = plaani piirang × kontode kogumis, `fairShare` = kaal / 100 × `limit` (võrdne jagamine `consumed`, kui iga kaal on loenduris 0 qlq = kvoodipood, `remaining` `consumed` = `fairShare` −, põrandaga 0.
- `blocks.schedules` loetleb võtme ajakava aknad (`open`/`closed`, `blackout` või `outside-window`, `retryAfterSeconds`, reservi korrused ja kas akna eelarve on kulutatud); `blocks.modelCaps` loetleb oma mudelipõhised tunnipiirangud koos tarbimisega.
- Võti väljaspool teenusepakkuja iga basseini saab 200 koos `pools: []`; `availableModels` ( `qtSd/` ID-d, mida võti `/v1/models` näeb), `expiresAt` ja `apiBaseUrl` on endiselt täidetud.
- `apiBaseUrl` on `OMNIROUTE_PUBLIC_API_BASE_URL`, siis `OMNIROUTE_PUBLIC_BASE_URL`, muidu `null`. See ei ole kunagi taotluse enda päritolu.

### `status` `reason`

| `status`      | Tähendus                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ok`          | Praegune näit.                                                                                                                                                                                                                                                                                                                                   |
| `stale`       | Vahemällu salvestatud konto lugemine on märgitud aegunuks või konto, mille lähtestusaeg on lugemisest möödunud. Numbrid hoitakse alles. Üks mudeliaken, mille lähtestusaeg on möödas, tähistab kogu `modelWindows` rühma `stale`. Võtme omaosa jaoks `percent` aknas: raamatut loeti ilma, et konto luges selle kinnitamiseks värava vahemälust. |
| `unavailable` | Ei mingit lugemist; numbrid on `null`, mitte kunagi `0`. `reason` ütleb, miks.                                                                                                                                                                                                                                                                   |

| `reason`                          | Millal                                                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kvoodipoodi ei saanud lugeda või see ei saa lugeda omistamisraamatuid.                                                 |
| `percent_attribution_unavailable` | Võtme omaosa `percent` aknas: selle konto ja akna jaoks pole veel omistamisraamatut või raamatus pole võtit loetletud. |
| `percent_window_ended`            | Võtme omaosa `percent` aknast: raamat kuulub lõppenud plaaniaknasse.                                                   |
| `account_not_used_by_key`         | Võtme omaosa `percent` aknas: konto ühendus on väljaspool võtme lubatud ühendusi. Selle raamatut ei loeta.             |
| `window_not_reported`             | Pakkujapiirangute vahemälus ei ole selle plaani akna jaoks lugemist.                                                   |
| `connection_lookup_failed`        | Konto ühendust ei õnnestunud lugeda.                                                                                   |
| `not_supported`                   | OmniRoute ei saa lugeda konto pakkuja kasutuspiiranguid.                                                               |
| `fetch_failed`                    | Vahemällu salvestatud lugemist ei saanud kasutada ja teenusepakkuja piirangute värskendamine ebaõnnestus.              |
| `not_available`                   | Näit ei sisalda kasutusaknaid või kontol pole lugemist üldse.                                                          |

Kui kvoodisalve ei saa lugeda, on poe tagatud väljad `blocks` (graafiku eelarve `exhausted`, mudeli ülempiiri `consumed` ja `reached`) samuti `null`.

### Laenu nõusolek

`PATCH /api/v1/me/quota/{provider}` salvestab helistamisvõtme enda nõusoleku ühe basseini jaoks. See kasutab `GET` lippu, päiseid ja pakkuja reegleid. `self:usage` ulatus lubab seda kirjutada, kuigi selle nimi on kirjutuskaitstud.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` on `ref`, mille `GET` selle kogumi jaoks tagastab.
- `lendingPercent` on täisarv vahemikus 0 kuni 100. Väärtus 0 kustutab nõusoleku ja selle tähtaja. Keha, mille `lendingPercent` 0 on aktsepteeritud mõlemas režiimis.
- `lendingUntil` on valikuline: epohh-millisekundid või `null` tähtajata. See peab olema tulevikus ja maksimaalselt 8640000000000000. Väärtust alla 100000000000 loetakse sekunditeks ja sellest keeldutakse.
- Kõigist muudest väljadest keeldutakse. Kehast, mis on pikem kui 4096 baiti, keeldutakse. Lugemine peatub selle suuruse juures, nii et pikemat keha ei hoita kunagi tervena.

Kontrollimine toimub selle tabeli järjekorras. Iga keeldumise korral kasutatakse standardvea sisu koos fikseeritud teatega. Ühest sellisest kontrollist keeldumine ei kirjuta midagi.

| Olek | Sõnum                                                                                              | Millal                                                                 |
| ---- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 404  | `Not found`                                                                                        | `QUOTA_SELF_PANEL` lipp on väljas.                                     |
| 401  | `Valid API key required`                                                                           | Võti puudub või on kehtetu või on see serveri keskkonnavõti.           |
| 403  | `API key lacks the self:usage scope`                                                               | Võtmel puudub `self:usage`.                                            |
| 400  | `Invalid provider`                                                                                 | Pakkuja segment on kehtetu.                                            |
| 429  | `Too many lending changes. Retry later.`                                                           | Võti ületas oma piiri. Vastus kannab `Retry-After`.                    |
| 400  | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Keha ei ole JSON, on liiga pikk või ei vasta skeemile.                 |
| 400  | `lendingUntil must be a Unix time in milliseconds`                                                 | Tähtaeg loetakse sekundites.                                           |
| 400  | `lendingUntil must be in the future`                                                               | Tähtaeg on taotluse esitamise ajal või varem.                          |
| 404  | `Pool not found`                                                                                   | `ref` ei nimeta selle teenusepakkuja jaoks ühtegi selle võtme kogumit. |
| 403  | `Lending is not enabled for this pool`                                                             | Bassein on `saturation` režiimis ja `lendingPercent` on üle 0.         |
| 500  | `Failed to build quota view`                                                                       | Mis tahes muu ebaõnnestumine. Selle põhjus logitakse serverisse.       |

Piirang on 20 päringut 60 sekundi jooksul iga võtme kohta. Arvesse läheb iga taotlus, mis läbib teenusepakkuja kontrolli, isegi see, millest keeldutakse hiljem või mis ei muuda midagi. Sellel on oma loendur, välja arvatud võtme päringu kiiruse limiit.

Taotlus, mis muudab salvestatud nõusolekut, kirjutab ühe `quota.pool.lending.updated` auditikirje. See nimetab võtit vanade ja uute väärtustega. Kaks korda saadetud sama asutus kirjutab ühe korra ja auditeerib ühe korra. Vastus on 200 täieliku `GET` vaatega, mis on ehitatud pärast kirjutamist.

`GET` vaade kajastab laenuandmist järgmiselt:

- Igas basseinis on `borrowMode` (`saturation` või `consent`) ning võtme enda `lendingPercent` ja `lendingUntil`.
- `lendingActive` on `true` ainult `consent` kogumis, protsent on üle 0 ja tähtaega ei ole saavutatud.
- `consent` kogumis kannab iga loendatav `dimensions[].yourShare` `borrowAvailable`. See on see, mida võti võib praegu oma osa kohal kasutada, teiste võtmete laenuks.
- `borrowAvailable` kasutab värava valemit. See loeb iga teist võtit, ka siis, kui võti on oma osa all. `hard` -võtme jaoks, mis on paralleelselt üks lisalugemine teise võtme kohta ja loendatav mõõde.
- `borrowAvailable` on `null` `soft` või `burst` võtme jaoks ja `null`, kui lugemine ebaõnnestub.
- `borrowAvailable` on üks arv kõigi teiste klahvide jaoks. Kahest võtmest koosnevas kogumis on see teise võtme enda kujund.
- `borrowAvailable` ei ole veel `percent` akende ega `accounts[]` puhul teatatud.
- `saturation` kogumis kuvab vaade salvestatud nõusoleku koos `lendingActive: false` ja ilma `borrowAvailable`.

### Vead

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Piirangud

- `remaining` on võtme õiglase osa osa, mida see ei ole kasutanud. See ei ole garantii. Kui basseinis on ruumi, võidakse võtit siiski kätte saada. Kui basseini kogusumma jõuab väärtuseni `limit`, lükatakse tagasi iga basseini võti, olenemata selle omast `remaining`, ja ilma `self:account-quota` võti ei näe seda kogusummat.
- `remaining` ei võta arvesse jaotuse absoluutset `cap`. Jõustamine keeldub võtmest, kui selle enda tarbimine korgi ühiku aknas jõuab ülempiiri väärtuseni.
- Kontotaseme riba pärineb pakkuja piirangute vahemälust ja võib jõustamisotsuse tegemisel mõne minuti võrra edasi lükata. Näit, mille lähtestusaeg on möödas, märgitakse kui `stale`.
- Mudelipõhised aknad (`modelWindows`) esitatakse ainult nende pakkujate puhul, kellel on plaan-akna vastendus: Claude ja Codex täna. Teiste pakkujate puhul on `modelWindows` endiselt olemas, kui kuvatakse konto andmeid, tühja `windows` loendiga.
- Võtme omaosa `percent` aknas on hinnanguline. See pärineb omistamisraamatust ja hõlmab kõiki ülaltoodud jaotises „Protsentuaalne mõõde: võtmepõhine omistamine” loetletud piiranguid.
- `consumed` on arvu jõustamine võrreldes õiglase osaga. See on täpselt `attributed` pluss `external`. `attributed` on osa, mille raamat annab marsruutitavate žetoonide võtme. `external` on võtme osa konto kasutamisest, mida kogumi võtmed ei arvesta.
- Mõlemad osad saadetakse ainult siis, kui basseini `accountVisible` on tõene: võtmel on `self:account-quota` ja pakkuja on oma `sharedQuotaProviders`. Ilma selleta võti saab `consumed` üksi, samade `status` ja `reason`.
- Mõlema osa ja oma raskusega hoidik saab treenida väljaspool basseini kasutatavat kasutamist, mis laetakse basseini võtmete eest. Konto ulatust omav omanik näeb juba konto kogusummat.
- Võti, mis ei suunanud aknas midagi, saab siiski lugeda oma välist laengut `consumed`, sest selle omistatud osa on siis 0.
- Näiteks raamat avaneb 0-ga ning klahvid A ja B kaaluvad kumbki 50. Klahv A suunab 900 000 märki ja võti B 100 000. Seejärel jõuab konto 60% piirini 100. Seejärel on `attributed` klahvi A jaoks 54 ja klahvi B puhul 6 ning `external` on mõlema jaoks 0.
- Vaade loeb raamatut ja ei kirjuta kunagi oma olekut. See ei ava raamatut ega küsi kunagi teenusepakkujalt lugemist. Redis poe puhul eemaldab lugemine taustal asendatud redaktsiooniväljad, nagu seda teevad värava lugemised.
- Jagamine on `ok` ainult siis, kui värava vahemälus on konto näit. Ilma selleta on see `stale`, nii et ilma hiljutise päringuta kogumis kuvatakse see tõenäoliselt aegunud.
- Kuni taotlus ei jõua basseini läbi, pole aktsia saadaval. See päring avab raamatu ja konto sellel hetkel olev arv loetakse kasutuseks väljaspool kogumit.
- Mitme kontoga kogumis kasutab iga kontokirje selle konto enda raamatut ja ühe konto limiiti. Täitmine skaleerib mõlemat poolt kontode arvu järgi, seega on proportsioon sama.
- Mudelipõhised aknad ei anna võtmele osa. Raamat ei säilita mudelite andmeid.
- Ajakava reservkorruseid vaade ei hinnata: ajakava võib kuvada kui `open` samas kui taotlus lükatakse tagasi põhjusega `schedule-reserve`.
- Kui kaks sama võtme kogumit jagavad ühendust, rakendab jõustamine neist ühte ja vaates on loetletud mõlemad.
- Ebaõnnestunud võtmekatsetel pole aadressipiirangut: vastupidise puhverserveri taga saavad helistajad jagada ühte aadressi (see sõltub sellest, kas edastatud kliendiaadressid on usaldusväärsed), nii et blokeering võib keelata marsruudi igale võtmeomanikule. Kui `REQUIRE_API_KEY=true`, keeldub kliendi API -poliitika kehtetu võtme andmisest enne marsruudi käivitamist, kusjuures selle poliitika põhitekst on 401 selle marsruudi asemel.

### Liikmete kasutamine

Administraator võib lubada võtmeomanikel näha, kuidas akna kasutus basseini liikmete vahel jaguneb. Valik on basseini `memberBreakdown`, vaikimisi välja lülitatud. See määratakse basseini viisardis või `PATCH /api/quota/pools/{id}`-ga. `GET /api/quota/pools` ja `GET /api/quota/pools/{id}` annavad sellest teada.

Vaate mõõde kannab `members` ainult siis, kui kõik need kehtivad:

- basseini valik on sisse lülitatud
- kogumil on maksimaalselt 20 eraldatud võtit ja vähemalt kolm neist saavad teha päringuid: aktiivne, tühistamata, keelatud ja aegunud
- basseini `accountVisible` on tõsi: võtmel on `self:account-quota` ja pakkuja on oma `sharedQuotaProviders`
- `percent` aknas võib võti kasutada konto ühendust
- loeti võtme enda osa sellest aknast: selle `status` ei ole `unavailable`

Muidu `members` puudub. See pole kunagi tühi nimekiri.

- Iga viil on `{ slot, consumed, isYou }`. Vastusskeem lükkab tagasi kõik muud lõigu atribuudid ja enam kui 20 lõigu loendi. Viilud on loetletud pesade järjekorras.
- Iga eraldatud võtme kohta on üks viil, sealhulgas võti, mis ei saa enam päringuid teha. Liige, kellel pole kasu, näitab tegelikku nulli.
- 1. pesa on alati küsiv võti, `isYou` true. Teised pesanumbrid on võtmega räsi auastmed. See on võtmega `API_KEY_SECRET` ja katab basseini, küsiva võtme ja liikme.
- Nii et numbrid ei asu hoidjate vahel. Ühe omaniku jaoks jäävad need külastuste vahel samaks. Need võivad muutuda, kui võti basseiniga liitub või sealt lahkub või kui seda saladust pööratakse.
- Loendataval aknal on viil liikme loendur kvoodipoes, sama loendur kui tema enda `consumed`.
- `percent` aknal on viil liikme `attributed` osa, mis on pärit samast raamatust, mida loetakse võtme enda osana. Väljaspool basseini tehtud kasutamist ei jagata kunagi viiludeks. See laeng on jagatud kaalu järgi, nii et seda kandvad viilud näitavad kaalu.
- Iga vaade loeb paralleelselt ühte väärtust teise liikme ja loendatava akna kohta. `percent` aknal ei maksa lõigud lugeda peale aktsia enda raamatu lugemise. Kui ühte väärtust ei saa lugeda, pole sellel aknal `members` ja võtme enda osa jääb alles.
- Valik ja kasutatavate võtmete arv loetakse üks kord basseini kohta ja ainult võtme puhul, mis võib näha konto andmeid. Ebaõnnestunud valiku või kasutatavate võtmete arvu lugemine lülitab selle kogumi ribad välja. Server logib hoiatuse ja ülejäänud vaade luuakse.

Baarid ei kanna nimesid ega ID-sid. Nad räägivad endiselt võtmeomanikule teiste liikmete kohta:

- Hoidjad saavad siiski viilud nende väärtuste järgi sobitada.
- Stabiilne nummerdamine võimaldab omanikul aja jooksul ühte liiget jälgida.
- Lõikude arv näitab, kui palju võtmeid on kogumis eraldatud.
- Kolmest võtmest koosnevas kogumis saab keegi, kes teab, mida üks võti kasutas, öelda, mida viimane võti kasutas.
- Kui bassein langeb alla kolme kasutatava võtme, kaovad latid. Varem tehtud vaated näitavad ikka, mida iga liige kasutas.
- Loendatavas aknas võib kogusumma miinus lõigud näidata võtmete kasutamist, mida enam ei eraldata.
- Liige, kes näitab ühel kontol nulli ja kasutab teisel kontol, võib näidata, milline liige millist kontot kasutab.
- Loendatavas `hard` -poliitikaga kogumis vihjab osa, mis peatub liikme õiglase osakaalu korral, selle liikme kaalule.

### Kasutusseeria (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (esitatakse ka aadressil `/v1/me/usage`) tagastab helistamisklahvi enda päringute kasutuse ja maksumuse: summad, üks kirje UTC päeva kohta, päeva ja mudeli, mudeli ja pakkuja kohta. See jagab ülaltoodud kvoodimarsruudi lippu, autentimisreegleid, `self:usage` ulatust, `Cache-Control: no-store` ja veakäitumist. Võtit kontrollitakse enne `range`. Vead on 400 (`Invalid range`), 401, 403, 404 ja 500 (`Failed to build usage`).

- `range` on üks järgmistest: `1d`, `7d`, `30d` (vaikeseade) või `90d`. Mis tahes muu väärtus, tühi väärtus või korduv parameeter on 400. Kõne maksumuse piiramiseks peatub komplekt `90d`. Vaade loeb ainult töötlemata kasutusajalugu, mitte kunagi igapäevaseid kokkuvõtteid, millel puudub võti.
- Read valitakse helistamisklahvi ID järgi. Võtme nime veergu ei sobitata kunagi ja ilma võtme ID-ta salvestatud ridu ei loeta kunagi.
- Sarja koostamisel käivitatakse viis rühmitatud päringut akna võtmeridade kohal. Ehitatud seeriat taaskasutatakse 60 sekundit klahvi ja vahemiku kohta ning korduskasutatud kõnet ei käivitata. Selle `generatedAt` annab selle vanuse.
- Aken lõpeb siis, kui seeria on ehitatud. Hiljem tembeldatud rida, näiteks kella kallutamise teel, ei arvestata.
- `coverage.retentionDays` on operaatori töötlemata kasutusajaloo säilitamise säte (`retention.usageHistory` andmebaasi sätetes). `coverage.truncatedByRetention` on tõene, kui taotletud vahemik on sellest sättest pikem. See võrdleb kahte numbrit ega kontrolli, kas ridu on tegelikult puudu.
- Pakkuja tagastatakse võtme enda päringutele salvestatud kujul. Mudel on selle viimase `/` järel salvestatud nimi ja read on rühmitatud selle järgi. Kombineeritud päring, mille igast sihtmärgist keelduti, salvestatakse pakkujana marsruutimissildiga (kombonimi, `auto` või `combo`) ja kliendi saadetud mudelistring. Muud tagasilükatud taotlused, näiteks kaitselüliti, mudeli jahtumine või kvoodiga pargitud vahelejätmine, jätavad sihtpakkuja ja mudeli alles.
- Lisaks loendustele ja kuludele sisaldab vastus ka keskmist latentsust, edukuse määra ning esimese ja viimase päringu aegu.
- `byModel` loetleb 50 pakkuja- ja mudelipaari, millel on kõige rohkem taotlusi. Rohkemate paaride korral ei moodusta selle kirjed `summary` ja `summary.uniqueModels` arvestab iga salvestatud mudeli õigekirja. `byModelTruncated` on siis tõene ja mudel, mille paarid langevad lõike mõlemale poole, näitab osalisi summasid.
- Aruandes on kaks kulu. `costUsd` on arveldatud kulu, nagu seda näitab kasutusanalüütika. Kindla tasumääraga abonemendi pakkujad, näiteks Claude Code kava, arvestavad seal 0 dollarit. `listPriceUsd` on sama kasutushinnaga loendihinnaga, mis sisaldab tellimusi. Päring, mille mudelil pole hinnarida, arvestab selle salvestatud kulu: teenusepakkuja teatatud kulu või päringu salvestamise ajal arvutatud kulu. Ainult taotlus, millel pole kumbagi, loeb 0, ilma markerita, seega võib kogusumma olla osaline.
- Vastusleping on `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Iseteenindusleht

Kui `QUOTA_SELF_PANEL` on sisse lülitatud, on `/quota/{provider}` avalik leht. Võtmehoidja tippib sinna API -võtme ja näeb teenusepakkuja jaoks selle võtme kogumeid. Iga bassein näitab ühte kaarti basseini akna kohta, kus on basseini kasutamine kõigi jaoks ja võtme enda osa. Igal basseini kontol on oma kaardid, millel on konto kasutus ja võtmeosa. Konto kasutus kuvatakse ainult siis, kui võti võib näha konto andmeid. Sellel lehel on loetletud ka iga konto mudelipõhised piirangud ja võtme enda kasutus. Kui ajakava blokeerib võtme praegu, kuvatakse teade. Kaardil loetletakse iga mudelipõhine võtmekork koos selle kasutamisega ja märgitakse saavutatud võtmed. `{provider}` on pakkuja ID või selle alias (`/quota/claude`, `/quota/cc`). Tundmatu pakkuja ja iga `/quota/*` tee, kui lipp on välja lülitatud, vastake 404. Kohandatud OpenAI- või Anthropic-ühilduva sõlme kogumitel pole lehte. API vastab endiselt nende eest.

Lehel pole seanssi. Võti saadetakse ainult `Authorization` päises `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` ja `GET /api/v1/me/usage`, mitte kunagi URL. Võti, mille server aktsepteerib, hoitakse vahekaardi `sessionStorage`. Funktsiooniga "Jäta selles seadmes meelde" hoitakse seda `localStorage` vormingus ja "Unusta võti" eemaldab selle mõlemast. Võti, mille server tagasi lükkab, eemaldatakse salvestusruumist.

`consent` -režiimis olev bassein näitab laenukaarti. Seal määrab võtmehoidja laenuks terve protsendi 0 kuni 100 võtme tühikäiguosast. Samuti valib omanik, kui kaua nõusolek kehtib: kuni väljalülitamiseni, 1 tund, 8 tundi, 24 tundi, 7 päeva või 30 päeva. Kestus loetakse salvestamise hetkest. Kuni tähtaeg on jõus, võib omanik sellest kinni pidada. Kui see tähtaeg möödub enne Salvesta, ei saada kaart midagi ja küsib teist valikut. 0% puhul tähtaega ei saadeta. Kaardil kuvatakse salvestatud tähtaeg koos selle ajavööndiga. Nõusolek, mille tähtaeg on möödunud, näidatakse lõppenuna.

`hard` -võtme puhul loetleb kaart basseiniakna kohta ka, millised muud võtmed võtmele praegu laenavad. Iga rida on üks number kõigi teiste klahvide jaoks. Kahest võtmest koosnevas kogumis on see teise võtme enda kujund. Arv, mida vaade ei teata, loetakse mitte saadaolevaks, mitte nulliks. `soft` või `burst` võtme puhul on kaardil kirjas, et arv ei kehti.

`saturation` -režiimis kogum, mille võtmes on 0-st suurem protsent, näitab ainult väljavõtmist. Seal on kirjas, et salvestatud protsendil pole seal mingit mõju. Selle väljavõtmise nupp saadab 0 ilma tähtajata. `saturation` -režiimis salvestatud 0-ga kogum ei näita laenukaarti. Pärast salvestamist jääb kaart, mida tagastatud vaade enam ei vaja, oma sõnumiga, kuni lehe vaade uuesti muutub.

Midagi ei salvestata enne, kui hoidik vajutab Salvesta või Tühista. Iga vajutus saadab ühe `PATCH /api/v1/me/quota/{provider}` päringu ja teine vajutus ei saada midagi, kuni esimene on ootel. Keha kannab basseini läbipaistmatu `ref` vaatest, protsent ja tähtaeg. Vastus on ümberehitatud kvoodivaade ja leht näitab seda ilma teise lugemiseta. Kui kaks salvestamist kattuvad, loeb leht kvooti üks kord pärast viimast vastust. Leht ei hoia nõusolekut brauseri salvestusruumis.

Keeldutud muudatust selgitatakse kaardil HTTP staatusest valitud tekstiga. Vea sisu ei loeta. 401 ütleb, et võtit ei aktsepteeritud ja laadib kvoodi uuesti. 403 ütleb, et puul ei võta laenumuudatusi vastu ja 404 ütleb, et puul on kadunud. Mõlemad pakuvad nuppu, mis laadib kvoodi uuesti. 400 või muu 4xx vastus palub omanikul kontrollida protsenti ja tähtaega. 429 palub omanikul oodata ja `Retry-After` sekundid, kui vastus neile antakse. 5xx vastus, 408 või võrgutõrge ütleb, et muudatust ei pruugitud salvestada, ja säilitab sisestatud väärtused. Vastus väljaspool lepingut laadib kvoodi uuesti. Ebaõnnestunud salvestamine ei eemalda võtit iseenesest. Pärast tagasilaadimisest keeldumist eemaldab leht võtme nagu igal lugemisel keeldumisel.

Kui võti on vastu võetud, kuvatakse lehel ka kolme vahekaardiga kaart „Tööriistade seadistamine”. "Claude kood" annab `~/.claude/settings.json` ploki `env`. "Shell" annab samad muutujad kui `export` read. "Claude Desktop" annab oma kolmanda osapoole järeldusakna väärtused. Mudelid on kvoodiosaga mudelid, mida võti võib selle pakkuja jaoks nõuda. Kui sellist loendit võtmega kaasas ei ole, lülitab plokk selle asemel sisse lüüsi mudeli avastamise. Lüüsi aadress on avalik API päritolu, millest server teatab (`OMNIROUTE_PUBLIC_API_BASE_URL`, seejärel `OMNIROUTE_PUBLIC_BASE_URL`). Kui kumbagi pole määratud, kuvatakse kaardil kohatäide ja käsib omanikul administraatorilt küsida. Võti kuvatakse kohatäidisena. "Kaasa minu võti" paneb kogu võtme ekraanil oleva teksti sisse ja sellesse, mida kopeerimisnupp kopeerib. See kestab kuni kasti tühjendamiseni, võtme unustamiseni või asendamiseni või lehe lahkumiseni. Kaart ei saada päringut ega paku failide allalaadimist.

API tähise `stale` näit on tõenäoliselt aegunud. Näit, mis tähistab `unavailable` kuvatakse koos põhjusega, mitte kunagi nullina.

Protsendiplaanide puhul tõmbab leht võtme omaosa, kui API sellest teatab. See ütleb, et arv on hinnanguline, ja nimetab selle kaks osa. Mudelipõhised piirangud näitavad ainult kontot.

Kui aken kannab `members`, näitab selle kaart ka riba, kus iga liikme kohta on pesa järjekorras üks segment. Küsimise klahvi segment kasutab aktsentvärvi. Teised segmendid liiguvad läbi teema diagrammi värvide. Tekstilegend loetleb iga segmendi koos selle väärtusega, nii et värvist ei sõltu midagi. Segmendid on märgistatud `You` või `Member N`, kus N on pesa.

### Spetsiaalne port lehe jaoks

`QUOTA_PANEL_PORT` avab teise kuulaja, mis teenindab ainult iseteeninduslehte. See on välja lülitatud, kui muutuja pole määratud. `QUOTA_PANEL_HOST` on sidumisaadress ja vaikimisi on `127.0.0.1`.

Kuulaja edastab need teed põhiporti ja vastab igale teisele teele 404:

| Tee                                                                      | Teenib                              |
| ------------------------------------------------------------------------ | ----------------------------------- |
| `/quota/{provider}`                                                      | Leht                                |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Kvoodivaade lehel loetakse          |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Kasutusseeria, mida lehel loetakse  |
| `/_next/static/`                                                         | Ehitise skriptid, stiilid ja fondid |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikoonid                             |

`GET` ja `HEAD` edastatakse ilma korpuseta. Samuti edastatakse üks kehaga päring: kvoodivaate tee `PATCH`, mille leht saadab laenuvaliku salvestamiseks. Mis tahes muu meetod vastab 404, välja arvatud CONNECT päring, mille ühendus suletakse vastuseta. Iga muu päring, mis deklareerib keha, vastab 404 ja selle ühendus suletakse. Uuendustaotlused lükatakse tagasi ja nende ühendus suletakse. Punktisegmendi või fragmendimarkeriga tee keelatakse, nagu API pordis. Nii on ka päringu sihtmärk, mille märk on väljaspool prinditavat ASCII. Sihtmärgi töötlemata juhtmärgile vastab HTTP parser enne selle pordi enda kontrollimist 400. Taotluste päiseid, mida raamistik enda tarbeks reserveerib, ei edastata: nimed, mis algavad tähega `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` või `x-next-`, ning nimed `x-matched-path` ja `next-resume`. Taotlus edastatakse ilma nendeta. Armatuurlauale, sisselogimislehele, halduse API ja järeldusmarsruutidele ei pääse selle pordi kaudu.

`PATCH` peab kandma `Content-Type: application/json` ilma parameetrita või ainult `charset=utf-8` ga. See peab sisaldama ühte `Content-Length` vahemikus 1 kuni 4096, mis on kirjutatud lihtnumbritena ja ilma `Transfer-Encoding`. Mõnda neist reeglitest rikkuv `PATCH` vastab 404. Mõnele väärale pikkusele, näiteks märgistatud või korduvale pikkusele, vastab HTTP parser enne selle pordi enda kontrollimist 400-ga. Port loeb deklareeritud baite enne põhipordiga ühenduse võtmist ja ootab neid kõige rohkem 5 sekundit. Keha, mis pole selleks ajaks valmis, vastab 404 ja selle ühendus on suletud. Sel juhul või siis, kui klient esimesena lahkub, ei jõua midagi põhiporti. Port edastab täpselt deklareeritud baidid sama `Content-Length`. Baite pärast neid loetakse ühenduse järgmise taotlusena. Ees olev TLS vastupidine puhverserver peab edastama `Content-Length` ja ei tohi päringu keha uuesti tükeldada. Peaport kontrollib `Authorization` päises olevat klahvi API, nagu ka `GET` puhul.

404 kere on `{"error":"not_found","message":"Not found."}`. Ebaõnnestunud relee vastab 502 (`api_bridge_unavailable`) või 504 (`api_bridge_timeout`) ilma `detail` väljata.

Kuulaja ei loe `QUOTA_SELF_PANEL` ja see ei lülita lehte sisse. Kui lipp on välja lülitatud, vastavad leht ja selle API põhipordis 404 ja kuulaja edastab selle vastuse.

Arendusserveri (`next dev`) all ei muutu leht selle pordi kaudu interaktiivseks. Arenduse kuuma taaslaadimise pesa on uuendustaotlus ja port keeldub sellest. Kasutage arendamise ajal peamist porti.

Port teenindab tavalist HTTP ja leht saadab API klahve. Säilitage vaikesideaadress ja pange selle ette pöördpuhverserver koos TLS. Muu sidumisaadress kui tagasisilmus logib selle teate:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Loopback partner, mis ei saada edasisuunamispäist, loetakse peapordis kohalikuks. Nii et sama hosti puhverserver peab saatma `X-Forwarded-For`. Privaatse aadressi puhverserverit usaldatakse selle päise puhul ainult `OMNIROUTE_TRUST_PROXY=private` (või `lan`) korral. Kõigist teistest partneritest teavitatakse selle ühenduse aadressi ja selle saadetud edasisuunamispäised jäetakse välja.

Kuulajal on korraga maksimaalselt 256 ühendust. Kliendil on päringu päiste saatmiseks aega 10 sekundit ja kogu päringu saatmiseks 30 sekundit. Tühikäigul hoitud ühendus sulgub umbes 5 sekundi pärast. Ühendus, kus 60 sekundit ei ole toiminud, suletakse. Need väärtused on fikseeritud. Määrake ühenduse ja kiiruse piirangud ka ees olevale pöördpuhverserverile. Ees olev vastupidine puhverserver peaks hoidma ülesvoolu olevaid ühendusi jõudeolekus vähem kui 5 sekundit või mitte neid uuesti kasutama. Peapordi relee kasutab API pordi (`API_BRIDGE_*`) ülesvoolu ajalõppe.

Kuulaja alustab ka siis, kui `API_PORT` pole määratud. `QUOTA_PANEL_PORT` peab olema port vahemikus 1 kuni 65535, kirjutatud ainult numbritega. See peab erinema armatuurlaua pordist ja API pordist. Kui reaalajas WebSocket server on sisse lülitatud, peab see erinema ka `LIVE_WS_PORT` (vaikimisi 20132). Mis tahes muu väärtus ei ava midagi ja logib hoiatuse. Hoiatus keeldutud väärtuse kohta nimetab muutujale nime ega korda väärtust. Juba kasutusel olev port ei ava midagi ja logib järgmise hoiatuse:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Kui `OMNIROUTE_BASE_PATH` on seatud, ootab kuulaja kõiki ülal olevaid teid selle eesliite all. Kasutage sama `OMNIROUTE_BASE_PATH` ehitamise ajal ja käitamise ajal. Kirjutage see eesmise kaldkriipsuga ja ilma lõpus oleva kaldkriipsuta, näiteks `/omniroute`. Teine kujund, sealhulgas `/` ja `/omniroute/`, jätab pordi välja hoiatusega, kuigi ehitamine aktsepteerib neid vorme. Nii ka baastee, mille esimene segment nimetab rakendusmarsruuti: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` või `connect`, igal juhul.

Piirangud:

- `/quota/{provider}/` lõpus oleva kaldkriipsuga vastab sellele pordile 404.
- Teenindustöötajat ja veebirakenduse manifesti selles pordis ei teenindata.
- Armatuurlauale seatud kohandatud lemmikikooni selles pordis ei kuvata.
- Kui rakendus töötab baastee all, ikoone ei kuvata.
- Port räägib lihtsat HTTP/1.1.
- Ebaõnnestunud sidumist ei proovita uuesti enne, kui protsess taaskäivitub.
- Kuulajal ei ole ühendust ega kiiruspiirangut kliendi aadressi kohta.
- See jaotis ei hõlma konteinerite seadistusi.

---

## Keskkonnamuutujad

| Muutuv                               | Vaikimisi     | Kirjeldus                                                                  |
| ------------------------------------ | ------------- | -------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`      | Kasutatav draiver: `sqlite` või `redis`                                    |
| `QUOTA_STORE_REDIS_URL`              | _(tühi)_      | Redis URL, nt `redis://localhost:6379`                                     |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`         | 0..1; `>= threshold` aktiveerib range režiimi                              |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`        | Tokenid, mis selgitavad maksimaalselt ühte punkti protsendiplaani aknast   |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`         | 0..1; pehme poliitika kombineeritud skoori kordaja                         |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`          | Päevi enne seda, kui GC eemaldab vanad `quota_consumption` ämbrid          |
| `QUOTA_PANEL_PORT`                   | _(määramata)_ | Spetsiaalne port iseteeninduslehe jaoks. Unset tähendab, et kuulajat pole. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`   | Selle pordi sidumisaadress                                                 |

DB seaded (`quotaStore.*`) alistavad env vars.

---

## Tõrkeotsing

### Redis on konfigureeritud, kuid ühendust ei looda

Kontrollige, kas `ioredis` on installitud (`npm ls ioredis`) ja kas
`QUOTA_STORE_REDIS_URL` on ligipääsetav. Ühenduse nurjumisel lülitub tehas tagasi
SQLite'ile (logitakse tasemel `warn`).

### `peek` tagastab aegunud tulemuse / lubab tõrke korral

Kui `peek` väljastab erindi, käsitleb `enforceQuotaShare` tulemust kui „luba“
(tõrke korral lubamine). Algpõhjuse tuvastamiseks otsige `pino` logidest
`quota:enforce` ja `quota:factory` kirjeid.

### Tarbimisloenduri triiv

Kui teenusepakkuja tegelik kasutus erineb loenduritest, on see ootuspärane —
kahe salvega libiseva akna viga on aknapiiridel ligikaudu 1% ning `consume`
käivitatakse pärast vastust ilma tulemust ootamata. Küllastussignaal
(`saturationSignals.ts`) loeb teenusepakkuja tegelikku kasutusastet 30-sekundilise
TTL-iga ja kohandab vastavalt väärtust `globalUsedPercent`.

### Kogum kuvab kulumiskiiruse kohta teate „andmed puuduvad“

`computeBurnRate` nõuab vähemalt kahte ajaloolist näidist. Uued kogumid, millel
puuduvad varasemad `consume` väljakutsed, kuvavad `tokensPerSecond: 0` ja
`timeToExhaustionMs: null`.

---

## Üleminek localStorage'ist

Kui `/dashboard/costs/quota-share` esimest korda laaditakse, kontrollib hook `useLocalStoragePoolMigration`
järgmist:

1. `localStorage.getItem("omniroute:quota-share:pools")` ei ole tühi.
2. `GET /api/quota/pools` tagastab `[]` (andmebaas on tühi).

Kui mõlemad tingimused on täidetud, saadab see iga pärandkogumi paketina aadressile `POST /api/quota/pools`
ja eemaldab seejärel localStorage'i võtme. Migratsioon on idempotentne: tingimus 2 takistab
korduvmigratsiooni.

---

## Strateegia sisemine klassifikatsioon

`quota-share` on **ainult sisekasutuseks mõeldud** marsruutimisstrateegia (`INTERNAL_ROUTING_STRATEGY_VALUES`
failis `src/shared/constants/routingStrategies.ts`). Seda kasutavad eranditult süsteemi loodud
`qtSd/` kogumikombinatsioonid ning see on teadlikult loendist `ROUTING_STRATEGY_VALUES` välja jäetud, et see ei
ilmuks kunagi kasutaja valitava suvandina kasutajaliideses ega API-s.

---

## Testi katvus

Kvoodijagamise mootoriga on kaasas kaks kihti automatiseeritud katvust:

| Sviit                  | Käsk                                                                   | Mida see hõlmab                                                                                                                                                                                                           |
| :--------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ühik (29 testi)        | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR planeerija, küllastusvärav, samaaegsuse piirid, fairShare matemaatika, mahajäämuse järjekord                                                                                                                          |
| Integratsioonimaatriks | `npm run test:combo:matrix`                                            | Otst-otsa marsruutimise otsus tõelise kombineeritud torujuhtme kaudu; DRR õiglus + küllastuse tähtsuse tühistamine reaalajas õmbluste kaudu (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integratsioonimaatriks töötab CI koos kõigi 22 avaliku strateegiaga. Ühikukomplekti saab käitada eraldiseisvana.

---

## DB skeemi kokkuvõte

Kolm tabelit, mis on lisatud migratsiooniga `078`, `079` ja `085`:

- `quota_pools` + `quota_allocations` — kogumi määratlused ja võtmete jaotused.
- `quota_consumption` — veerevad 2-kopalised loendurid `(apiKeyId, dimensionKey)` kohta.
- `provider_plans` — käsitsi pakkuja plaani alistamine (mõõtmed JSON connectionId kohta).

Kõik tabelid on lisatud idempotentse `CREATE TABLE IF NOT EXISTS` migratsiooni kaudu.

Nõusolekuga laenamine lisab kolm veergu: `quota_allocations.lending_percent` (täisarv, vaikeväärtus 0), `quota_allocations.lending_until` (perioodmillisekundid või `NULL` tähtaja puudumisel) ja `quota_pools.borrow_mode` (vaikeväärtus `saturation`). Selle üleviimine lisab ainult need veerud ja ei kirjuta ühtegi olemasolevat rida.

Protsentide omistamise raamat lisab `quota_percent_ledger` (üks rida kogumi, konto ja plaani akna kohta) ja `quota_percent_ledger_tokens` (üks märgiloendur basseini, konto ja API -võtme kohta). `src/lib/db/quotaPercentLedger.ts` loeb ja kirjutab neid.
