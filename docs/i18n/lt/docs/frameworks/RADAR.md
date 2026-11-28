# Radar Free-Model Catalog (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Patikimas šaltinis:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Paskutinį kartą atnaujinta:** 2026-09-01 — v3.8.51
> **Priglobtos paslaugos įrodymų ribos:** čia aprašytos serverio pusės taisyklės buvo patikrintos
> 2026-09-01 naudojant sąmoningai privatų Radar serverį, kurio tiksli revizija yra
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Ši realizacija nėra platinama
> šioje OSS saugykloje; prieinamumas priglobtoje aplinkoje išlieka atskira eksploatacine būsena.

Radar yra **pasirenkamas priedas**, kuris ant leidimo bazinio katalogo
(`FREE_MODEL_BUDGETS`, esančio `open-sse/config/freeModelCatalog.data.ts`) uždeda pasirašytą,
naujai kuruojamą nemokamų modelių katalogą. Jis reikalingas todėl, kad nemokamų pakopų aplinka
keičiasi greičiau nei leidžiamos naujos versijos — tarp leidimų paslaugų teikėjai prideda,
sumažina arba panaikina nemokamas kvotas, o bazinį katalogą galima atnaujinti tik išleidus
naują versiją.

**Niekas, kas šiandien yra nemokama, dėl nuotolinio kanalo nenustoja būti nemokama.** Radar
niekada nepadaro bazinio įrašo mokamo; skaitymo metu jis tik atnaujina limitų ir būsenos
laukus bei tarp leidimų gali pridėti naujai aptiktų nemokamų modelių sluoksnį. Operatorius
vis tiek gali paslėpti modelį vietoje ir atkurti jį tame pačiame valdymo skydelyje. Pats
bazinis katalogas diske niekada nekeičiamas — žr. toliau pateiktas
[Skaitymo metu taikomas sluoksnių sujungimo taisykles](#read-time-overlay-merge-rules).

---

## Pateikimo būsena v3.8.51 versijoje

Toliau pateikta būsena atskiria tai, kas įgyvendinta šiame OSS leidime, nuo vėlesnių Radar
darbų krypčių. Tai yra kodo lygmens būsena, o ne pažadas, kad konkretus priglobtas diegimas
ar išorinė integracija šiuo metu yra prieinami.

| Sritis                               | Būsena šiame leidime                                                                                                                                                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pasirašyto katalogo klientas         | Įgyvendintas už `RADAR_ENABLED`, su atskiru pasirenkamu įjungimu, Ed25519 tikrinimu, vietiniais šifruotais nustatymais ir podėliu, išliekančiomis rodymo bei įjungimo išimtimis, grįžtamaisiais antkapiais, planuokle ir valdymo skydeliu.                                      |
| Bendraautorių aktyvinimas            | Valdymo skydelyje pateikiama nuoroda į serveryje priglobtą GitHub patvirtinimo procesą ir galima įvesti turimą `omr_…` raktą. Bendraautorio tinkamumą nustato privati paslauga; OSS kliente nėra GitHub prieigos rakto ar išdavimo logikos.                                     |
| Rėmėjo rakto aktyvinimas             | Įgyvendintas. Neapdorotas raktas patikrinamas, ramybės būsenoje šifruojamas, nuskaitant užmaskuojamas ir siunčiamas tik vykdant serverio pusės sinchronizavimą. Pakeitus arba pašalinus raktą, anuliuojami visi keturi su teisėmis susiję kanalų podėliai.                      |
| Nukreipimo nuorodos                  | Įgyvendintos kaip atskirai pasirašytas, kas valandą atnaujinamas kanalas. Fiksuotos nuorodos bendruomenės pakopai prieinamos iš karto; ribotos kampanijos išlieka tiesiogiai teikiamais pakopos duomenimis.                                                                     |
| Pasiūlymai rėmėjams                  | Įgyvendinti kaip atskiras pasirašytas, tik tiesiogiai teikiamas kanalas ir valdymo skydelio puslapis. Klientas iš naujo patikrina uždarą privilegijų schemą, išsaugo paskutinį tinkamą podėlį, atfiltruoja nebegaliojančius įrašus ir aiškiai pažymi partnerių pasiūlymus.      |
| Analitika ir rėmėjų pripažinimas     | Įgyvendinti kaip griežtas pasirašytas, tik tiesiogiai teikiamas kanalas su Radar valdoma ELO, faktine katalogo naujumo ir tendencijų informacija, patikrintu vietiniu rėmėjo ženkleliu, valdymo skydelio puslapiu ir tik vietinėmis CLI būsenos bei sinchronizavimo komandomis. |
| Mokėjimai ir operaciniai el. laiškai | OSS kliente neįgyvendinti. Pirkimas, aukojimas, kvitų tikrinimas, atkūrimas ir laiškų pristatymas priklauso privačiai paslaugai; prieinamumas priglobtoje aplinkoje vis dar priklauso nuo jos prižiūrimo diegimo ir paslaugų teikėjų konfigūracijos.                            |
| Tyrimų agento darbų kryptis          | Nėra šio kliento leidimo dalis. Kuruojamų kanalų turinys išlieka serverio pusės duomenimis; OmniRoute dieginyje neveikia joks autonominis tyrimų agentas.                                                                                                                       |

---

## Viešų pranešimų skaitytuvas

Bendrasis pranešimų skaitytuvas yra atskirtas nuo Radar funkcijos žymos. Valdymo skydelio pradžios ir
pakeitimų žurnalo peržiūros priemonės gauna saugyklos viešąjį `news.json`, atlikdamos paprastą `GET` užklausą į
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Jos nesiunčia jokios Radar nuostatos, užklausos,
teikėjo konfigūracijos, naudojimo įrašo ar vietinės atmetimo būsenos.

`news.json` naudoja uždarą v2 schemą, įgyvendintą naudojant `parseNewsPayload()`:

- `schemaVersion: 2` ir riboto dydžio `items[]` rinkinys;
- stabilios, unikalios pranešimų `id` reikšmės;
- aiškiai nurodyti `active` ir ISO formato `publishedAt` laukai;
- privalomas tekstas anglų kalba ir pasirenkamas lokalizuotas tekstas;
- pasirenkamos HTTPS nuorodos, kurioms nereikia prisijungimo duomenų, ir piktograma iš leidžiamųjų sąrašo;
- pirmiausia parenkamas naujausias aktyvus įrašas, neradus lokalizacijos naudojama anglų kalba, o vietinis atmetimas saugomas kiekvienam ID atskirai.

Analizatorius laikinai priima ankstesnę vienaskaitos formą `{ active, title, message, ... }`, kad
senesnės atšakos galėtų pereiti prie naujos versijos nesugadindamos pakeitimų žurnalo rodinio. Netinkami kanalai yra neaktyvūs. Radar paleidimo
įrašas pateikiamas su `active: false`; jo pakeitimas į `true` yra atskiras išleidimo veiksmas po sujungimo ir įdiegimo
ir nekeičia `RADAR_ENABLED` ar nepriklausomo srauto sinchronizavimo pasirinkimo.

---

## Žyma: `RADAR_ENABLED` (pagal numatytąsias nuostatas išjungta)

Radar nuo pradžios iki galo valdomas funkcijos žyma `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorija `policies`,
`defaultValue: "false"`).

**Kai žyma išjungta, ši sąsajos dalis neegzistuoja:**

- Visi `/api/radar/*` galiniai taškai, įskaitant vietinės modelio būsenos skaitymą ir rašymą,
  grąžina `404` prieš pasiekdami bet kurį Radar modulį.
- Valdymo skydelio ekranai (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) pateikia
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) grąžina nepakeistą bazinį variantą —
  toks pats įrašų skaičius, tos pačios reikšmės, kiekvienas įrašas pažymėtas `origin: "baseline"` — ir niekada
  neskaito srauto podėlio.
- Nė viena Radar tinklo užklausa neatliekama; kiekvienas sinchronizavimo modulis grąžina `{ status: "disabled" }`
  prieš pasiekdamas `fetch`.

Tai griežtas viršaibio prieigos valdiklis: įjungus žymą atrakinami tik _ekranai_ ir nieko
daugiau. Duomenys neįkeliami, foninis sinchronizavimas nepradedamas, o
maršruto parinkimas ar modelio pasirinkimas nekeičiamas — žr. toliau aprašytą atskirą pasirinkimą.

---

## Duomenų sinchronizavimas yra SEPARATE pasirinkimas — privatumo pažadas

Įjungus `RADAR_ENABLED` atrakinamas tik UI. Norint sinchronizuoti sklaidos kanalą, reikalingas antras nepriklausomas pasirinkimas, saugomas `radar_settings.opt_in` (`src/lib/db/radar.ts`, migracija `136_radar_cache_settings.sql`). `syncRadar()` patikrina vėliavėlę _ir_ pasirinkimą prieš skambindamas tinkle:

```
Flag off      → { status: "disabled" }   — no network call
Opt-in false  → { status: "opt_out" }    — no network call
```

Kai abu įjungti, sinchronizavimo kelias yra:

1. `GET <feed base URL>/v1/catalog/latest` su `x-omniroute-radar-schema: 2` ir pasirenkama `Authorization: Bearer <supporter key>` antrašte (žr. toliau). Serveriai pagal numatytuosius nustatymus naudoja atskirai pasirašytą v1 perėjimo artefaktą, kai schemos antraštės nėra, todėl senesni įdiegti klientai nuolat gauna naujinimus.
2. Tai tik atsisiuntimo programos srautas, tačiau tai vis tiek yra HTTPS užklausa. Priglobta infrastruktūra gauna įprastus ryšio metaduomenis, pvz., šaltinį IP. Kai sukonfigūruotas palaikymo raktas, sinchronizavimas taip pat siunčia tą raktą nešiklio antraštėje, kad paslauga galėtų išspręsti teisę. Tiksliai privataus serverio peržiūroje, nurodytoje aukščiau pateiktoje įrodymų riboje, sklaidos kanalo užklausų apskaitoje naudojamos raktų maišos, bendras naudojimas ir kasdien besisukantis sutrumpintas HMAC IP piktnaudžiavimo peržiūrai; tose lentelėse neapdorota forma nėra nei rakto, nei IP. Infrastruktūros prieigos žurnalai ir šifruotas pristatymo siuntų aplankas yra atskiros veiklos ribos.
3. OmniRoute niekada nesiunčia raginimų, atsakymų, pokalbių, teikėjo kredencialų, modelio srauto, veikimo laiko, delsos ar vietinio teikėjo konfigūracijos į radaro paslaugą.
4. Atsakymas patikrinamas, patvirtinamas ir saugomas talpykloje vietoje (žr. [Saugos modelis](#security-model) ). „Radar“ turi tiksliai keturis serverio tinklo kelius: `syncRadar()` katalogui, `syncRadarReferrals()` nukreipimams ir `syncRadarOffers()` / `syncRadarIntel()` tik rėmėjams skirtiems pasiūlymams ir „Intel“.

Katalogo tikrinimas vyksta kas 24 valandas. Kai patvirtintame sklaidos kanale vis dar yra talpykloje saugoma versija ir pakopa, sinchronizavimas išlaiko talpykloje saugomą naudingąją apkrovą, atnaujina `fetchedAt` ir kitas patikrinimas atliekamas po 24 valandų, o ne kas valandą.

The** rėmėjo raktas** yra pasirenkamas nešiklio prieigos raktas (`radar_settings.supporter_key`), leidžiantis tiekimo tarnybai nuspręsti, kurią pakopą teikti (žr. [Pakopos](#tiers-community-and-live) ). Tai yra:

- Saugoma** užšifruotas ramybės būsenoje** su tais pačiais AES-256-GCM `encrypt()`/`decrypt()` pagalbininkais (`src/lib/db/encryption.ts`), naudojamais teikėjo kredencialams.
- Nustatyti per `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) ir** niekada neatsiliepė** — atsakymas grąžina užmaskuotą formą (`omr_****abcd`).
- Pakeitus arba išvalius jį, katalogas, persiuntimai, pasiūlymai ir „Intel“ talpyklos tampa negaliojančiais. Kitas sync/read išsprendžia naujas teises serverio pusėje; Išsaugojus raktą savaime nepateikiama tinklo užklausa ir nesunaudojamas vienkartinis aktyvinimo raktas.
- Išsiųstas sklaidos kanalo tarnybai kaip nešiklio prieigos raktas sinchronizacijoje GET — nieko daugiau apie raktą nepalieka kliento.

---

## Prieigos ir saugos taisyklės, rodomos prieš pasirenkant dalyvauti

Neaktyviame valdymo skydelyje šios taisyklės pateikiamos iš
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **prieš** atliekant bet kurį aktyvinimo veiksmą.
Kanoninė prieigos skalė:

| Lygis                           | Tinkamumo kriterijai                                                                                         | Prieiga                                                                | Pakartojimo / galiojimo pabaigos taisyklė                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Bendruomenė                     | Bet kas; rakto nereikia                                                                                      | Visas katalogas pateikiamas maždaug 30 dienų vėliau                    | Visada prieinama; prieiga nesuteikiama išduodant                                 |
| Žvaigždutė + sekimas            | GitHub OAuth patvirtina ir saugyklai skirtą žvaigždutę, ir jos savininko sekimą                              | Vienkartinė tiesioginio katalogo peržiūra, tada – bendruomenės prieiga | Vienas išdavimas per prisijungimą; pakartotinai neišduodama                      |
| Prisidėjęs dalyvis, Top 10      | 1–10 vietos naujausiame užbaigtame savaitiniame reitinge                                                     | 365 dienos tiesioginės prieigos                                        | Pasiimama pareikalavus; iškritus iš reitingo, suteiktas laikotarpis nesutrumpėja |
| Prisidėjęs dalyvis, Top 100     | 11–100 vietos tame reitinge                                                                                  | 90 dienų tiesioginės prieigos                                          | Ta pati pareikalavimu pagrįsta / idempotentinė pasiėmimo taisyklė                |
| Rėmėjo pirkinys                 | Vienkartinis 6 mėnesių, 1 metų arba viso gyvenimo pirkinys                                                   | Tiesioginis katalogas, pasirašyti tiesioginiai pasiūlymai ir Intel     | Automatiškai nepratęsiama                                                        |
| Auka / neautomatinis suteikimas | Savininko peržiūrėta auka arba savininko suteikta prieiga aiškiai nurodytam dienų skaičiui / visam gyvenimui | Tokia pati tiesioginė teisė suteiktu laikotarpiu                       | Audituojamas, idempotentinis suteikimas                                          |

Sujungtos PR, įvykdyti commit ir pakeistos eilutės yra **tik reitingo įvesties duomenys**. Prisijungus už Top 100 ribų,
prisidėjusio dalyvio prieiga nesuteikiama, neatsižvelgiant į PR skaičių. Ribotos trukmės pirkiniai, aukos, prisidėjusio dalyvio laikotarpiai ir
neautomatiniai suteikimai pridedami prie dabartinės galiojimo pabaigos; viso gyvenimo prieiga yra viršesnė. Reitingo pasikeitimas niekada
atgaline data neatšaukia ir nesutrumpina jau suteikto laikotarpio.

Priglobta licencija yra asmeninė, o naudotojui pateikiama taisyklė leidžia vienu metu turėti vieną aktyvų diegimą. Ši
laida **neteigia**, kad naudojamas aparatinės įrangos užraktas: OSS sinchronizavimas nekuria aparatinės įrangos kontrolinio atspaudo ir nepalaiko
kriptografinės įrenginio nuomos. Naudojant pirmiau nurodytą patvirtintą privataus serverio reviziją, įgyvendintas vykdymo užtikrinimas
apima teisės patvirtinimą ir neautomatinės peržiūros signalą, kai tas pats galiojantis raktas per 24 valandas aptinkamas iš ketvirto
skirtingo IP adreso. Šis signalas niekada automatiškai neblokuoja ir neatšaukia rakto. Atkūrimo metu
pamestas raktas atšaukiamas ir pakeičiamas išsaugant esamą galiojimo pabaigą; įsigytas arba suteiktas
laikotarpis nepradedamas iš naujo.

Tiesioginiai pasiūlymai kuruojami rankiniu būdu ir gali pasikeisti arba nustoti galioti. Pasirinkimo dalyvauti ekrane taip pat tiksliai nurodoma
privatumo riba: atsisiunčiami pasirašyti katalogo / rekomendacijų metaduomenys; galiojantis raktas papildomai atrakina
pasirašytus pasiūlymus ir Intel; Bearer raktas ir įprasti ryšio metaduomenys pasiekia priglobtą paslaugą;
užklausos, atsakymai, pokalbiai, paslaugų teikėjo prisijungimo duomenys, modelio srautas, veikimo laikas, delsa ir vietinio
paslaugų teikėjo konfigūracija jos nepasiekia.

---

## Kaip gauti rėmėjo raktą

Aktyvinimo ekrane (`/dashboard/radar`) pateikiamos nuorodos į du būdus, kaip **gauti**
rėmėjo raktą. Pats OSS repozitoriumas niekada jo neišduoda, nevykdo mokėjimo kodo ir
**niekada nenurodo kainos** — kainodara nustatoma ir rodoma tiksliniuose
puslapiuose, o ne šiame repozitoriume (specifikacijos sprendimas D14).

- **„Esu bendraautoris“** — atidaromas `RADAR_CONTRIBUTOR_CLAIM_URL` (numatytoji reikšmė
  `https://radar.omniroute.online/auth/github`), privačiame Radar serveryje veikiantis
  GitHub OAuth paraiškos procesas. Jis tikrina naujausią užbaigtą savaitinį reitingą: 10 geriausiųjų gauna prieigą 365 dienoms,
  o 11–100 vietas užėmę dalyviai — 90 dienų. Nepatekus į geriausiųjų šimtuką, PR skaičius niekada nesuteikia prieigos; vietoje to
  procesas patikrina atskirą vienkartinį lygį, pagrįstą žvaigždute ir sekimu.
- **„Paremti projektą“** — atidaromas `RADAR_SUPPORTER_PLANS_URL` (numatytoji reikšmė
  `https://radar.omniroute.online/planos`), nuotolinis puslapis, kuriame siūlomi vienkartinio mokėjimo 6 mėnesių, 1 metų ir
  viso gyvenimo planai. OSS puslapyje piniginė vertė vis tiek nerodoma.

Abu URL nustatomi serverio pusėje (`src/lib/radar/links.ts`, naudojant tą patį aplinkos kintamojo perrašymo
modelį kaip `RADAR_FEED_URL`) ir perduodami valdymo skydui esamame
`GET /api/radar/settings` atsakyme (`contributorClaimUrl`, `supporterPlansUrl`) — kliento
komponentas niekada pats neskaito `process.env`.

| Kintamasis                    | Paskirtis                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Perrašo bendraautorio paraiškos URL (numatytoji reikšmė `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Perrašo rėmėjo planų URL (numatytoji reikšmė `https://radar.omniroute.online/planos`).                 |

### Prarasto rėmėjo rakto atkūrimas

Nuotolinės paslaugos atkūrimo pradžios taškas yra `https://radar.omniroute.online/recover`; nuoroda į jį taip pat
pateikiama planų puslapyje. Atkūrimas vykdomas visiškai už OSS kliento ribų, nes vietinis
diegimas niekada negauna pirkėjo ar bendraautorio el. pašto adreso ir negali atkurti neapdoroto rakto iš
užšifruotų nustatymų.

1. Pateikite su raktu susietą el. pašto adresą. Paslauga grąžina tą patį paraiškos priėmimo puslapį nepriklausomai nuo to, ar
   yra atkuriama licencija, todėl forma neatskleidžia, kurios paskyros egzistuoja.
2. Jei reikalavimai tenkinami, pristatymo vykdyklė išsiunčia trumpai galiojančią vienkartinę nuorodą. Ją atidarius,
   prieigos raktas iškart perkeliamas į laikiną užšifruotą `HttpOnly`/`Secure` slapuką ir nukreipiama į švarų
   `/recover` URL; puslapyje nėra prieigos rakto, el. pašto adreso, seno rakto ar pakaitinio rakto.
3. Patvirtinkite atšaukimą. Privati paslauga atšaukia ankstesnį raktą, sukuria pakaitinį raktą su
   tuo pačiu planu ir galiojimo terminu bei vienos operacijos metu įtraukia jį į siuntimo el. paštu eilę. Pakaitinis raktas niekada
   negrąžinamas naršyklei.
4. Įklijuokite pakaitinį raktą į `/dashboard/radar`. Seno rakto būsena dabar turi būti sumažinta iki `community`;
   pakaitinis raktas turi užtikrinti patvirtintą `live` sinchronizavimą. Dar kartą atidarius tą pačią atkūrimo nuorodą, veiksmas turi nepavykti
   ir turi būti pateiktas bendro pobūdžio atsakymas apie negaliojančią arba nebegaliojančią nuorodą.

Nuotolinio atkūrimo maršrutas ir laiškų siuntimo vykdyklė gali būti kode, tačiau konkrečiame
diegime vis tiek gali būti nepasiekiami. Nelaikykite šio proceso paruoštu naudoti gamybinėje aplinkoje, kol serveris neįdiegtas, pristatymo
paslaugų teikėjas nesukonfigūruotas naudojant kontroliuojamą gavėją ir neišbandyta visa vienkartinė nuoroda.

Kai lankytojas turi raktą (`omr_` + 40 šešioliktainių simbolių), aktyvinimo ekrane
(`src/app/(dashboard)/dashboard/radar/page.tsx`) kaip pagrindinis būdas pateikiamas rakto įklijavimo
įvesties laukas: įklijavus raktą ir pateikus formą, viena užklausa siunčiama į `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — įklijavus raktą, jis ir nustatomas, ir įjungiama dalyvavimo parinktis,
todėl ekranas atrakinamas. Formatas (`omr_` + 40 šešioliktainių simbolių) pirmiausia patikrinamas kliento pusėje
naudojant bendrinamą `isValidSupporterKeyFormat()` pagalbinę funkciją (`src/lib/radar/supporterKey.ts`),
kad būtų patogiau naudotojui; bet kuriuo atveju serverio Zod schema yra galutinis patikros šaltinis. Nustačius
raktą, aktyvinimo ekrane vietoje tuščio įvesties lauko rodoma užmaskuota forma (`supporterKeyMasked` iš
`GET /api/radar/settings`) ir valdiklis „keisti raktą“, leidžiantis įklijuoti
naują raktą — neapdorotas raktas niekada pakartotinai nerodomas. Du pirmiau pateikti paraiškos ir planų mygtukai
ir toliau naudojami norint pirmiausia _gauti_ raktą; šiame įvesties lauke jį aktyvina operatorius,
kuris raktą jau turi.

### Visapusis aktyvinimas ir vedamasis nustatymas

Privati informacijos santraukos paslauga ir šis OSS klientas turi sąmoningai siaurą sąveikos ribą: paslauga
išduoda ir tikrina rėmėjo raktą, o vietinis OmniRoute diegimas užšifruoja raktą,
serverio pusėje sinchronizuoja pasirašytus artefaktus ir padeda sukonfigūruoti teikėją. Pagalbinio tikrinimo tvarka yra:

1. Gaukite naujai išduotą arba atkurtą raktą per pagalbininko paraišką, planų / atsiskaitymo procesą, atkūrimo
   eigą arba iš įgalioto privataus serverio operatoriaus. Neįklijuokite neapdoroto rakto į žurnalus,
   ekrano kopijas, problemų komentarus ar komandinės eilutės argumentus.
2. Vietiniame OmniRoute diegime įjunkite `RADAR_ENABLED` funkcijos vėliavėlę. Taip atveriama naudotojo sąsaja,
   tačiau tinklo ryšiai lieka neaktyvūs, kol neįrašomas atskiras sutikimas.
3. Atidarykite `/dashboard/radar`, įklijuokite raktą ir suaktyvinkite. Naršyklė išsiunčia vieną vietinę
   `POST /api/radar/settings` užklausą su `{ optIn: true, supporterKey }`; raktas užšifruojamas vietoje, o
   atsakyme pateikiama tik `omr_****<last4>`.
4. Leiskite aktyvinimo ekranui sinchronizuoti katalogą arba pasirinkite **Sinchronizuoti dabar**. Patikrinkite, ar puslapyje
   rodoma `live`, sklaidos kanalo versija ir gavimo laikas. Atliekant autentifikuotą vietinę diagnostiką,
   `GET /api/radar/status` praneša apie sutikimo / rakto buvimą ir keturias podėlio būsenas, tačiau
   rakto negrąžina. `POST /api/radar/sync-all` gali tiesiogiai atnaujinti katalogą, nukreipimus, pasiūlymus ir Intel.
5. Atidarykite `/dashboard/radar/setup?provider=<provider>`. Pereikite į paslaugų teikėjui priklausantį kredencialų URL,
   pasirinkite **Pridėti API raktą**, įrašykite naudodami tikrąją paslaugų teikėjo formą, grįžkite į vadovą ir paleiskite
   **Tikrinti ryšį**. Vadovas naudoja įprastus `/api/providers` ir
   `/api/providers/<connection-id>/test` maršrutus; jis nekuria atskiro Radar kredencialo.
6. Kai bus aktyvūs bent du suderinami paslaugų teikėjų ryšiai, atidarykite `/dashboard/radar/combos`.
   Peržiūrėkite siūlomą šeimą ir sukurkite derinį naudodami esamą derinių API. Pasiūlymai ir
   Intel išlieka atskiri, pasirašyti ir tik `live` režimui skirti podėliai, kuriuos galima patikrinti jiems skirtuose Radar puslapiuose.
7. Iš naujo įkelkite `/dashboard/radar` ir sąrankos puslapį. Sutikimas, užmaskuoto rakto būsena, patvirtintas podėlis, įrašytas
   paslaugų teikėjo ryšys ir tikrinimo veiksmas turi išlikti po pakartotinio įkėlimo. Įrodymus fiksuokite tik tada, kai
   neapdorotas raktas ir paslaugų teikėjo kredencialas nebebus matomi.

Pats rakto įrašymas neįrodo, kad suteikta galiojanti `live` prieiga. Tai įrodo privataus
serviso `GET /v1/license/check` rezultato, OSS katalogo pateikiamo `live` lygio, patvirtinto pasirašyto
podėlio ir tikrojo paslaugų teikėjo ryšio / tikrinimo proceso visuma. Jei raktas negaliojantis, jo galiojimo laikas pasibaigęs arba jis atšauktas,
katalogas saugiai perjungiamas į `community`; tai neturi būti nurodoma kaip sėkmingas `live` rakto patvirtinimas.

### Privačios administravimo skydelio nuoroda

`RADAR_ADMIN_URL` pasirinktinai prideda **Radar Admin ↗** iškart po naudotojams skirto
Radar elemento išlaidų šoninės juostos skiltyje. Sąmoningai nenustatyta jokia numatytoji reikšmė: kai kintamasis
nenustatytas arba negalioja, statinėje šoninėje juostoje, komandų paletėje ir šoninės juostos tinkinimo ekrane nėra
administravimo elemento ar privataus URL.

Reikšmė nustatoma serverio pusėje ir per valdymo autentifikavimu apsaugotą
`GET /api/settings` atsakymą perduodama tik autentifikuotai ataskaitų srities sesijai arba patikimam
grįžtamojo ryšio sąsajos savininkui vietinio paleidimo be prisijungimo metu. Naudojant CLI, vidinio serviso ir valdymo aprėpties API rakto
autentifikavimą ši reikšmė negaunama. Prieš sukurdamas išorinę nuorodą, kuri atidaroma su `noopener noreferrer`,
naršyklė atsakymą patikrina dar kartą.

Naudokite kredencialų neturintį HTTPS tunelio / tailnet URL. Paprastasis HTTP priimamas tik grįžtamojo ryšio sąsajos SSH
persiuntimui, pavyzdžiui, `http://127.0.0.1:9351`; kitos schemos, įterpti kredencialai, netinkamai suformuoti URL ir
nuotolinės HTTP paskirties vietos saugiai atmetami, o naršymas lieka neaktyvus.

---

## Apsaugos modelis

### Ed25519 parašas per tikslius baitus

Tiekimo naudingoji apkrova pasirašyta su Ed25519. `verifyFeedBytes()` (`src/lib/radar/verify.ts`) patikrina parašą per** tikslaus atsakymo baitų** Gauta per laidą — naudingoji apkrova niekada neperserializuojama prieš patikrinimą, todėl baitas po baito perkodavimas negali tyliai anuliuoti arba apeiti parašo tikrinimo. Patvirtinimo klaida (`invalid_signature`) nutraukia sinchronizavimą, kol naudingoji apkrova kada nors išanalizuota arba talpykloje.

### Prisegtas viešojo rakto + pasukimas

Patvirtinantis viešasis raktas yra prisegtas `src/lib/radar/pinnedKeys.ts` (`PINNED_FEED_PUBLIC_KEYS`) – masyve, todėl prieš sukimąsi galima pridėti naują raktą, o senos talpyklos informacijos santraukos, pasirašytos ankstesniu raktu, galioja iki pakartotinio sinchronizavimo.

### Šakės draugiškas env nepaiso

Du env vartai leidžia šakėms ir savarankiškiems priegloboms nukreipti klientą į savo sklaidos kanalą, o ne į [numatytąją](#how-to-self-host-a-feed) OmniRoute paslaugą —

| Var                 | Tikslas                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Nepaiso tiekimo bazės URL (numatytasis `https://radar.omniroute.online`).                                  |
| `RADAR_FEED_PUBKEY` | Nepaiso prisegto viešojo rakto (base64-DER SPKI arba PEM), pakeisdamas integruotą masyvą šiuo vienu raktu. |

### Versija grindys

`syncRadar()` atmeta atsisiųstą informacijos santrauką, kurios `version` nėra griežtai naujesnė nei šiuo metu talpykloje saugoma versija (`compareVersions()`, taškinis `YYYY.MM.DD.n` palyginimas) — `{ status: "stale" }`. Tai neleidžia pažeistam arba netinkamai sukonfigūruotam sklaidos kanalo galutiniam taškui grąžinti klientą į senesnį, kitaip pasirašytą naudingą apkrovą.

### Dvi datos ir kodėl saugomos abi

Talpykloje esančiame sklaidos kanale yra dvi skirtingos datos, o jas supainioti yra svarbiausia išlaikyti abi:

| Laukas        | Ateina iš                   | Atsakymai                              |
| ------------- | --------------------------- | -------------------------------------- |
| `generatedAt` | pasirašytas pašaro korpusas | kiek metų** duomenis** yra             |
| `fetchedAt`   | šio diegimo laikrodis       | kai šis įdiegiamas** atsisiųstas** tai |

Prieš kelias minutes gautame sklaidos kanale gali būti kelių savaičių senumo skaičiai, todėl vien `fetchedAt` negali pasakyti operatoriui, ar perdanga yra naujesnė už bazinę liniją, ant kurios ji yra. Abu yra išsaugoti `radar_feed_cache`, grąžinami `getRadarCatalog().meta` ir pateikiami atskirai `GET /api/radar/status`. Eilutė, įrašyta talpykloje prieš egzistuojant `generated_at` stulpeliui (163 perkėlimas), skaitoma atgal, nes `null` — unknown lieka nežinomas, o ne skolina gavimo laiką. `radar_referrals_cache` išlaikė savo `generated_at` nuo migracijos 142.

Aukščiau pateiktoje versijos aukšte lyginama `version`, o ne data.

Liko dvi spragos, abi apgalvotos: prietaisų skydelyje vis dar rodoma tik `Last fetched`, todėl norint nuskaityti sukūrimo datą, reikia naujos etiketės (ir jos 41 lokalės įrašo); o pasiūlymuose ir „Intel“ talpyklose iš viso nėra sukūrimo datos, nors jų sklaidos kanalo schemose yra vienas — `GET /api/radar/status` todėl praleidžiamas šių dviejų laukelis, o ne pranešama apie `null`, kuris būtų skaitomas kaip „nežinomas“.

### Schemos patvirtinimas

Atsisiųsti baitai išanalizuojami ir patvirtinami pagal `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`, Zod schema)** po to** parašo patikrinimas. Schemos neatitikimas grąžina `{ status: "invalid_schema" }`, o talpykla lieka nepaliesta. Talpykloje saugoma naudingoji apkrova gynybiniu būdu iš naujo patvirtinama kiekvieną kartą nuskaitant (`getRadarCatalog()`) — sugadinta arba ranka redaguota talpyklos eilutė grįžta į pradinę, o ne aptarnaujama.

### Atsako dydžio riba (10 MB)

`syncRadar()` vykdo a** 10 MB kietas dangtelis** informacijos santraukos atsako tekste — pasirašytas sklaidos kanalas yra KB masto JSON dokumentas, todėl viskas, kas yra anksčiau, rodo netinkamai sukonfigūruotą arba priešišką `RADAR_FEED_URL` (arba prieš srovę teikiamą šiukšlę), o ne teisėtą katalogą. Vykdymas yra dviejų sluoksnių:

1. `Content-Length` patikrinimas prieš skrydį praleidžia visą tekstą, kai antraštė jau deklaruoja vertę virš ribos.
2. Vykdomas sumos patikrinimas nuskaitant turinį, net kai `Content-Length` nėra arba jis pervertinamas realaus dydžio — antrašte niekada nepasitikima. Sujungus sukauptus gabalus, išsaugomi tikslūs baitai, reikalingi Ed25519 parašo patikrinimui vėliau.

Viršijus ribą, grąžinama `{ status: "too_large" }`, o talpykla lieka nepaliesta, vadovaujantis tuo pačiu neardomuoju modeliu, kaip ir bet kuri kita sinchronizavimo klaida (`invalid_signature`, `invalid_schema`, `stale`).

---

## Pakopos: `community` ir `live`

Srauto schemoje yra laukas `tier: "community" | "live"`, kurį **serverio pusėje**
nustato srauto paslauga pagal užklausą (rėmėjo rakto buvimą ir galiojimą)
— klientas niekada pats nenustato savo pakopos.

- **`community`** — nemokamas katalogas, nuo naujausių duomenų atsiliekantis maždaug
  30 dienų. Jį gauna užklausa be autentifikavimo arba su negaliojančiu raktu.
- **`live`** — naujausias katalogas, pateikiamas užklausoms su galiojančiu rėmėjo
  raktu.

**Dėl negaliojančio arba pasibaigusio rėmėjo rakto pereinama į `community` — tai niekada
nelaikoma klaida.** Sinchronizavimo eiga skiria tik parašo, schemos ar versijos klaidas (visos
yra atkuriamos ir neturi kritinio poveikio podėlio būsenai) nuo sėkmingo rezultato `{ status:
"updated", version, tier }`. Klientui nereikia apdoroti jokio konkrečiai pakopai skirto
klaidos scenarijaus.

### Pateikta pakopa gaunama iš atsakymo antraštės, o ne iš pasirašyto turinio

Pasirašyto srauto **turinio** laukas `tier` visada yra `"live"` — srauto paslauga kiekvienai
versijai pateikia **du pasirašytus artefaktus**: „live“ apima dabartines kampanijas, o „community“
jų neapima. Kiekvienas artefaktas pasirašomas pagal tikslius jo baitus. Turinys vis tiek nėra
naudojamas prieigos teisei nustatyti; užklausai faktiškai parinkta pakopa perduodama
**`x-omniroute-feed-tier` atsakymo antraštėje**, kurią serveris nustato pagal užklausos
`Authorization` raktą.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) yra vienintelė vieta,
kurioje nustatoma pakopa, kuria klientas turėtų pasitikėti:

1. Išanalizuoti `x-omniroute-feed-tier` naudojant `RadarTierSchema` (Zod) — jei antraštės nėra arba
   jos reikšmė nėra tiksliai `"community"` ar `"live"`, laikoma, kad ji **nepateikta**
   (ji niekada neišsaugoma podėlyje ir nerodoma naudotojo sąsajoje tokia, kokia yra; tai taip pat
   taikoma senesniems srauto serveriams, sukurtoms iki šios antraštės).
2. Tik jei atlikus 1 veiksmą nieko negaunama, naudoti pasirašyto turinio lauką `tier`
   (visada `"live"`).
3. Nustatyta pakopa išsaugoma podėlyje ir grąžinama kaip `{ status: "updated",
version, tier }` — būtent šią reikšmę rodo valdymo skydelis, o ne neapdorotą turinio
   lauką.

---

## Skaitymo laiko perdangos sujungimo taisyklės

`applyFeed()` (`src/lib/radar/applyFeed.ts`) sujungia talpykloje saugomą tiekimą** baigta** statinė bazinė linija ties** skaitymo laikas** , viduje `getRadarCatalog()`. Bazinis masyvas (`FREE_MODEL_BUDGETS`) niekada nėra mutuojamas — a `MergedEntry[]` skaičiuojamas iš naujo kiekvieno skambučio metu.

Keturios taisyklės, išdėstytos pirmumo tvarka:

1. **Sklaidos kanalas niekada neperrašo vietinio nepaisymo.** Kiekvienam laukui: jei operatorius pritaikė lauką įraše (`localOverrides` žemėlapis, raktas `provider:modelId`), to konkretaus lauko sklaidos kanalo reikšmė praleidžiama — laimi operatoriaus reikšmė.
2. **`enabled: false` išjungia įvestį su kilme.** Sklaidos kanalo įrašas, išjungiantis įrašą, nustato `enabled: false` ir `disabledBy: "radar"` sujungtame rezultate, todėl UI gali paaiškinti, _kodėl_ įrašas tapo prieinamas į išjungtą.
3. **Naudotojo pridėtas įrašas, kurio nėra sklaidos kanale, išlieka nepaliestas.** Įrašai, kurie egzistuoja tik bazinėje linijoje (arba buvo įtraukti vietoje) ir neturi atitinkamo sklaidos kanalo įrašo, praeina nepakitę.
4. **Antkapinis įrašas niekada neprikeliamas.** Jei operatorius aiškiai ištrynė įrašą (`tombstones` set ), sklaidos kanalas vėl pridedant tą `provider:modelId` vėlesnėje versijoje jo nesugrąžina.

Redaguojami laukai ir antkapiai išlieka `radar_local_model_state` (migracijos `153_radar_local_model_state.sql`). Viešasis DB adapteris (`src/lib/db/radar.ts`) konvertuoja tas eilutes į `localOverrides` žemėlapį ir `tombstones` rinkinį, kurį naudoja `applyFeed()`; gamybos `getRadarCatalog()` įkelia, kad būsena po to, kai vėliavėlė, talpykla ir schemos vartai praeina. Tik `displayName` ir `enabled` gali redaguoti operatorius. Provider/model tapatybės, pašarų kilmės, kvotos, galimybių, ToS ir sąrankos duomenų negalima įrašyti per šį paviršių.

Prietaisų skydelyje rodomi keturi vietiniai veiksmai:

- **Redaguoti** pakeičia vietinį rodomą pavadinimą ir įjungtą būseną.
- **Iš naujo nustatyti vietinius pakeitimus** išvalo abu redaguojamus laukus nekeičiant antkapio.
- **Slėpti** sukuria antkapinį paminklą, todėl vėlesni informacijos santraukos atnaujinimai negali atkurti eilutės.
- **Atkurti** nuima antkapinį paminklą; bet koks atskirai išsaugotas nepaisymas lieka galioti.

Sklaidos kanalas `enabled: false` išlieka saugos išimtimi: jis laimi pasenusį vietinį `enabled: true`, sulietą įrašą palieka išjungtą ir įrašo `disabledBy: "radar"`.

Katalogo leidiniuose naudojama `schemaVersion: 2`. `contextWindow` ir kiekvienas iš `tools`, `vision` ir `thinking` yra nepriklausomai `number | null` / `boolean | null`: `null` reiškia nežinomą, o `false` reiškia D16-confirmed oficialų teikėjo šaltinį, kuriame aiškiai nurodyta, kad galimybės nėra. Vidinės OmniRoute registry/model-spec vėliavėlės niekada nėra tiesiogiai reklamuojamos siekiant pateikti faktus. Klientas vis tiek priima v1 momentines nuotraukas; kadangi senasis kūrėjas naudojo `false` kaip nebuvimo vietos rezervavimo ženklą, v1 `false` normalizuojamas iki nežinomo, o v1 `true` lieka faktinis. Nežinomos schemos versijos nepavyksta uždaryti, o paskutinė galiojanti talpykla lieka pasiekiama. Kiekvienas v2 modelis su nenuline context/capability turi turėti be kredencialų HTTPS `metadataEvidenceUrls[]`; kitu atveju nepavyksta patvirtinti schemos ir talpykla nepakeičiama. Katalogo lentelėje visos trys būsenos pateikiamos kaip `✓`, `✕` ir `?`.

### Vadovaujami deriniai ir MCP prieiga

Patvirtintos `familyId` reikšmės išlaiko skaitymo laiko perdangą ir valdo gryną `buildRadarComboSuggestions()` modulį (`src/lib/radar/comboSuggestions.ts`). Šeima siūloma tik tada, kai bent du skirtingi paslaugų teikėjai turi aktyvius ryšius ir pateikia tikslų kuruojamą modelį ID. Išjungti modeliai, neaktyvūs teikėjai, trūkstamo modelio IDs, pavienių šeimų ir dviprasmiškų alias/prefix atitikčių nepavyksta uždaryti. Pasiūlymuose naudojama esama `priority` strategija, pirmiausia užsakant didžiausią pasikartojantį mėnesio biudžetą; UI juos sukuria tik per `POST /api/combos`.

Vadovaujamas UI gyvena `/dashboard/radar/combos`. Jis skaito tik vietinius `GET /api/radar/catalog` ir `GET /api/combos/builder/options` galutinius taškus. Jis niekada nesuaktyvina radaro sinchronizavimo, neskaito teikėjo kredencialų arba nerašo tiesiai į kombinuotą duomenų bazę.

MCP klientai gali skaityti tą pačią vietinę projekciją naudodami `omniroute_radar_catalog` (`read:radar`). Pasirenkami `provider`, `familyId` ir `enabledOnly` filtrai įvertinami po vieno vietinio `GET /api/radar/catalog` nuskaitymo. Jo uždaroje išvestyje yra katalogo metaduomenys ir provider/model, rodomas pavadinimas, `familyId`, kvota, galimybės, įjungta būsena, kilmė ir `disabledBy`; setup URLs, veiksmai, ryšiai, el. pašto adresai, raktai ir persiuntimo duomenys niekada negrąžinami. Šis įrankis yra tik skaitomas ir niekada neiškviečia `/api/radar/sync`. Kai talpykloje esantis sklaidos kanalas yra ankstesnis nei įdiegtas katalogas, `meta.olderThanRelease` yra `true` ir įrankis grąžina modelius iš įdiegto katalogo su vietiniais nepaisymais ir pritaikytais antkapiais.

### Kilmės žymenys

Kiekviename sujungtame įraše yra `origin` laukas, kurį UI pateikia kaip ženklelį:

- `"baseline"` — nepaliestas iš statinio leidimų katalogo.
- `"radar"` — sklaidos kanalas atnaujino vieną ar daugiau laukų.
- `"local"` — operatorius turi bent vieną vietinį šio įrašo nepaisymą (vietiniai nepaisymai visada laimi sklaidos kanalą pagal 1 taisyklę, neatsižvelgiant į tai, kas sakoma sklaidos kanale).

---

## Vietinės sąsajos — niekada ne srauto tarpinis serveris

Toliau nurodytos vietinės Radar maršrutų grupės palaiko naudotojo sąsają, esančią `src/app/api/radar/`:

| Maršrutas                      | Metodas | Paskirtis                                                                                                                                |
| ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET     | Grąžina sujungtą katalogą (`getRadarCatalog()`) iš vietinės podėlio atmintinės.                                                          |
| `/api/radar/sync`              | POST    | Paleidžia `syncRadar()` serverio pusėje ir grąžina gautą būseną.                                                                         |
| `/api/radar/settings`          | GET     | Grąžina `{ optIn, hasSupporterKey, supporterKeyMasked }` — niekada negrąžina neapdoroto rakto.                                           |
| `/api/radar/settings`          | POST    | Nustato sutikimą ir (arba) užšifruotą rėmėjo raktą.                                                                                      |
| `/api/radar/referrals`         | GET     | Grąžina `{ fixed, campaigns, tier }` iš vietinės podėlio atmintinės — žr. toliau [Rekomendacijų nuorodos](#referral-links-free-credits). |
| `/api/radar/offers`            | GET     | Grąžina aktyvius pasiūlymus iš patvirtintos vietinės tiesioginių duomenų podėlio atmintinės; niekada negrąžina rėmėjo rakto.             |
| `/api/radar/offers/sync`       | POST    | Paleidžia serverio pusės, tik tiesioginį raktą naudojančią `syncRadarOffers()` duomenų apdorojimo seką.                                  |
| `/api/radar/intel`             | GET     | Grąžina patvirtintus vietinius tiesioginius Intel duomenis ir rėmėjo atpažinimo loginę reikšmę; niekada negrąžina tapatybės ar rakto.    |
| `/api/radar/intel/sync`        | POST    | Paleidžia serverio pusės, tik tiesioginį raktą naudojančią `syncRadarIntel()` duomenų apdorojimo seką.                                   |
| `/api/radar/status`            | GET     | Grąžina tik skaitomą vietinių nuostatų ir katalogo, rekomendacijų, pasiūlymų bei Intel podėlių būseną be paslapčių.                      |
| `/api/radar/sync-all`          | POST    | Paleidžia visus keturis serverio pusės sinchronizavimo modulius ir grąžina atskirą kiekvieno srauto būseną.                              |
| `/api/radar/local-model-state` | GET     | Pateikia išsaugotų perrašymų ir antkapių sąrašą, skirtą redagavimo ir atkūrimo valdikliams.                                              |
| `/api/radar/local-model-state` | PATCH   | Nustato arba išvalo patikrintus `displayName`/`enabled` perrašymo laukus.                                                                |
| `/api/radar/local-model-state` | PUT     | Sukuria arba pašalina antkapį naudodamas `{ provider, modelId, tombstoned }`.                                                            |
| `/api/radar/local-model-state` | DELETE  | Išvalo redaguojamus perrašymo laukus, išsaugodamas bet kokį antkapį.                                                                     |

**Griežta taisyklė: šie maršrutai niekada neveikia kaip srauto paslaugos tarpinis serveris.** Naršyklė visada komunikuoja
tik su vietiniu OmniRoute serveriu. Keturi su Radar paslauga sąveikaujantys moduliai yra
`src/lib/radar/sync.ts` (katalogas), `src/lib/radar/referralsSync.ts` (rekomendacijos) ir
`src/lib/radar/offersSync.ts` (pasiūlymai), taip pat `src/lib/radar/intelSync.ts` (Intel); visi jie vykdomi
serverio pusėje, niekada kliento pusėje. Taip srauto URL ir bet koks rėmėjo raktas visiškai
nepatenka į klientui matomą tinklo srautą.

Visi Radar galiniai taškai grąžina `404`, kai `RADAR_ENABLED` išjungtas (žr.
aukščiau pateiktą [vėliavą](#flag-radar_enabled-default-off)), o maršrutų klaidų atsakymus apdoroja per
`buildErrorBody()`/`sanitizeErrorMessage()` pagal visai saugyklai taikomą klaidų išvalymo taisyklę
(`docs/security/ERROR_SANITIZATION.md`).

### Autentifikavimas

Visuose Radar galiniuose taškuose privalomas autentifikavimas naudojant `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — valdymo skydelio seanso slapuką arba valdymo aprėpties
API raktą; tai tas pats prieigos tikrinimas, kuris saugo likusią `/api/settings/*` dalį. Kai vėliava išjungta,
`404` patikra visada vykdoma **prieš** autentifikavimo patikrą, todėl diegimo egzemplioriaus, kuriame `RADAR_ENABLED`
išjungtas, baitai lieka identiški (nėra autentifikavimo raginimo vien tam, kad būtų sužinota, jog sąsaja neegzistuoja);
įjungus vėliavą, neautentifikuota užklausa gauna `401` prieš bet kokį DB skaitymą ar
rašymą. `GET /api/radar/settings` niekada negrąžina neapdoroto rėmėjo rakto, nepaisant
autentifikavimo būsenos — tik užmaskuotą jo formą ir loginę reikšmę `hasSupporterKey`.

---

## Rėmėjų pasiūlymai

Pasiūlymai naudoja savo pasirašytą artefaktą `GET /v1/offers/latest` ir niekada nesidalija katalogo ar
rekomendacijų podėliu. Serverio galiniam taškui reikalingas galiojantis aktyvaus rėmėjo Bearer raktas;
bendruomeninės atsarginės parinkties nėra. Todėl `syncRadarOffers()` sustoja dar prieš kreipiantis į
tinklą, jei funkcijos vėliavėlė išjungta, operatorius nėra pasirinkęs dalyvauti arba nesukonfigūruotas
rėmėjo raktas.

Po sėkmingos GET užklausos klientas patikrina tiksliai tų pačių atsako baitų Ed25519 parašą,
validuoja `RadarOffersFeedSchema`, reikalauja, kad ir pasirašytame turinyje, ir
`x-omniroute-feed-tier` antraštėje būtų nurodyta `live`, užtikrina, kad taškais atskirta versija būtų
griežtai naujesnė, ir tik tada atomiškai pakeičia `radar_offers_cache` (migracija
`144_radar_offers_cache.sql`). Taikoma ta pati 10 MB antraštės ir srauto dydžio riba, kurią naudoja
kiti kanalai. Parašo, schemos, lygio, pakartojimo, dydžio, HTTP ir tinklo klaidų atvejais išsaugomas
paskutinis patikrintas podėlis.

Uždara pasiūlymo struktūra palaiko tris palyginamus naudos tipus: procentinę vertę baziniais
punktais, kreditą smulkiausiais valiutos vienetais arba bandomojo laikotarpio dienas. Partnerio
pasiūlyme turi būti tokio paties tipo vieša bazinė vertė, o jo nauda turi būti griežtai didesnė;
oficialiems pasiūlymams partnerio bazinė vertė netaikoma. URL turi naudoti HTTPS ir juose negali būti
prisijungimo duomenų. `getRadarOffers()` prevenciškai iš naujo validuoja podėlyje saugomą turinį ir
kiekvieno vietinio nuskaitymo metu išfiltruoja nebegaliojančius įrašus;
`/dashboard/radar/offers` prieš pateikdamas rezultatą dar kartą filtruoja pagal galiojimo laiką,
naudoja portugališką tekstą, kai jis pasiekiamas, kitu atveju – anglišką, ir aiškiai pažymi partnerių
pasiūlymus.

Naršyklė kreipiasi tik į vietinius maršrutus: ji nuskaito užmaskuotą nuostatų momentinę kopiją,
paprašo `POST /api/radar/offers/sync` atnaujinti duomenis serverio pusėje, tada nuskaito
`GET /api/radar/offers`. Jei rakto nėra, užuot bandžiusi siųsti kanalo užklausą, ji rodo esamas
bendradarbiavimo ir paramos nuorodas. Išorinės pasiūlymų nuorodos atidaromos naujame skirtuke su
`noopener noreferrer`. Šioje laidoje `radar_offers` MCP įrankis nėra pasiekiamas.

---

## Radar Intel, rėmėjo ženklelis ir CLI

Intel yra pasirašytas artefaktas, pasiekiamas adresu `GET /v1/intel/latest`. Uždara
`RadarIntelFeedSchema` priima tik Radar priklausančius ELO reitingus, kuriuos privatus kuratorius
apskaičiavo pagal patvirtintus palyginimus, ir faktinius katalogo amžiaus bei įrašų skaičiaus pokyčius,
apskaičiuotus pagal pasirašytas katalogo momentines kopijas. Metodikoje nustatytas pradinis 1000
reitingas ir K=32. Tuščias reitingas yra tinkamas, kai nepatvirtintas joks palyginimas; klientas
niekada nesukuria jo dirbtinai.

`syncRadarIntel()` taiko tokį patį serverio pusės Bearer autentifikavimą, 30 sekundžių skirtąjį laiką,
10 MiB srauto dydžio ribą, tikslių baitų Ed25519 patikrą, griežtą schemą, `live` reikšmės turinyje ir
antraštėje reikalavimą, minimalią versijos ribą ir paskutinio tinkamo podėlio išsaugojimą kaip ir
pasiūlymų atveju. Išsaugojęs patikrintą aktyvią momentinę kopiją, klientas išveda
`radar:<sha256(supporter key)>`, saugo tik šią vienkryptę tapatybę ir išsiunčia specialų
`radar_supporter` pripažinimo įvykį. Jo `radar-supporter` ženklelio suteikimas yra idempotentinis ir
nesuteikia XP; jis niekada neatnaujina lyderių lentelių ir pakartotinai nenaudoja `token_share`.
`/dashboard/radar/intel` pateikia ženklelį tik pagal patikrintus vietinio podėlio metaduomenis.

CLI pateikia komandas `omniroute radar status` ir `omniroute radar sync`. Abi jos palaiko ryšį tik su
vietine OmniRoute API. `status` atlieka tik skaitomąją `GET /api/radar/status` užklausą; `sync`
išsiunčia vieną `POST /api/radar/sync-all` užklausą ir išveda kiekvieno kanalo rezultatą. Nė viena
komanda neskaito, nepriima ir neišveda rėmėjo rakto, taip pat nė viena tiesiogiai nesikreipia į Radar
paslaugą.

---

## Rekomendacijų nuorodos (nemokami kreditai)

Rekomendacijų nuorodos pateikiamos iš **atskiro, visada aktualaus** kanalo —
`GET /v1/referrals/latest` — atskirai nuo katalogo kanalo. Tai padaryta sąmoningai:
bendruomenės pakopos katalogo kanalas yra momentinė kopija, kuri gali būti iki 30 dienų
senumo, todėl iš jo išgauta rekomendacijos nuoroda nuo tikrojo serverio nuorodų sąrašo
atsilikdavo tiek pat laiko (naujai pridėta rekomendacija nemokamą / bendruomenės
naudotoją galėjo pasiekti tik po mėnesio). Rekomendacijų kanalas pašalina šį vėlavimą,
nes sinchronizuojamas savarankiškai ir daug dažniau.

```ts
// GET /v1/referrals/latest atsako turinys (pasirašytas Ed25519, naudojamas tas pats
// prisegtas raktas kaip ir katalogo kanale):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministinis: didžiausia updatedAt reikšmė tarp
                                  // rekomendacijų nuorodų, todėl dvi identiškos užklausos sukuria
                                  // lygiai tuos pačius pasirašytus baitus / parašą
  referrals: {
    fixed: RadarReferral[],      // pateikiama KIEKVIENOJE pakopoje, įskaitant be autentifikavimo / bendruomenės
    campaigns: RadarReferral[],  // užpildoma tik galiojančiam aktyviam (rėmėjo) Bearer
                                  // raktui; užklausos be autentifikavimo / su nebegaliojančiu raktu gauna []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Kitaip nei katalogo kanale, šiame turinyje apskritai nėra `tier` lauko — serveris pagal
`Authorization` raktą kiekvienai užklausai nusprendžia, ką įtraukti, todėl
`x-omniroute-feed-tier` atsako antraštė yra VIENINTELIS pateiktos pakopos šaltinis
(`referralsSync.ts::syncRadarReferrals`); jei antraštės nėra arba ji neatpažįstama,
naudojama `"community"` — mažiausiai privilegijuota prielaida.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) patikrina visą
turinį ir pakartotinai naudoja tą pačią kiekvienos rekomendacijos
`RadarReferralSchema`, eksportuojamą iš `feedSchema.ts`, todėl abu kanalai atskiras
rekomendacijas tikrina vienodai. Kiekvienas `RadarReferral.url` turi prasidėti
`https://` — `http://` URL neatitinka schemos patikros.

SENASIS kataloge įterptas `RadarFeedSchema` laukas `referrals` (`feedSchema.ts`)
paliktas dėl atgalinio suderinamumo su jau podėlyje esančiais katalogo kanalais, tačiau
`getRadarReferrals()` jo nebeskaito — žr. toliau pateiktą [Prieigos funkciją](#accessor).

### Sinchronizavimas

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) yra VIENINTELIS modulis,
kuris kreipiasi į tinklą dėl rekomendacijų, ir tiksliai atkartoja `syncRadar()` sutartį:
išjungta žyma → `disabled`; atsisakyta dalyvauti → `opt_out`; atsisiunčia
`${RADAR_FEED_URL}/v1/referrals/latest` (naudojamos tos pačios
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` atšakų perrašymo reikšmės kaip ir katalogui),
patikrina tikslių atsako baitų Ed25519 parašą (`verifyFeedBytes`), validuoja pagal
`RadarReferralsFeedSchema` ir įrašo į `radar_referrals_cache` lentelę
(migracija `142_radar_referrals_cache.sql`) — ši lentelė visiškai atskirta nuo katalogo
`radar_feed_cache`. 10 MB atsako apribojimas ir `generatedAt` apatinė riba atmeta
gaunamą kanalą, senesnį už podėlyje esantį kanalą, taip apsaugant nuo pakartotinio
senesnio pasirašyto artefakto panaudojimo. Vienoda laiko žyma priimama: serveris
bendruomenės ir aktyviai rekomendacijų versijoms sąmoningai priskiria tą pačią
deterministinę `generatedAt` reikšmę, todėl pakeitus rėmėjo raktą pasirašytas turinys ir
pateikiama pakopa gali pasikeisti nepasikeitus pagrindiniam nuorodų rinkiniui. Niekada
neišmeta išimties — visada grąžina būsenos objektą; klaidų lauke `reason` niekada nėra
dėklo išklotinės.

Rekomendacijų podėlį aktualų palaiko du paleidikliai, abu nepriklausomi nuo paties
katalogo 24 val. intervalo:

- **Sinchronizavimas skaitant** — pats `GET /api/radar/referrals` iškviečia
  `syncRadarReferrals()` tiesiogiai, kai podėlio nėra arba jis senesnis nei
  `REFERRALS_STALE_MS` (1 val., `shouldSyncReferralsOnRead()`), prieš pateikdamas
  atsaką. Dėl to fiksuotos nuorodos jau per kitą valdymo skydelio įkėlimą būna
  „visada aktualios“, nelaukiant jokio foninio laikmačio.
- **Šalutinis planuoklio sinchronizavimas** — `radarSchedulerTick()` (`scheduler.ts`)
  savarankiškai įvertina rekomendacijų pasenimą per tą patį valandinį ciklą, naudojamą
  katalogui, ir prireikus iškviečia `syncRadarReferrals()`. Tai vykdoma nepriklausomai
  nuo to, ar tuo ciklu turėjo būti atnaujintas pats katalogas, ir niekada nekeičia
  `RadarTickResult` struktūros (tik geriausių pastangų šalutinis poveikis, klaidos
  nutildomos).

### Prieigos funkcija

`src/lib/radar/index.ts` eksportuoja dvi tik skaitymui skirtas prieigos funkcijas,
kurios niekada neišmeta išimties (ta pati apsauginė sutartis kaip `getRadarCatalog()` —
išjungta žyma, nėra podėlio arba sugadintas podėlyje esantis turinys visais atvejais
grąžina tuščią struktūrą, o ne klaidą):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  skaito iš `radar_referrals_cache` (per `getRadarReferralsCache()`) ir validuoja
  naudodama `RadarReferralsFeedSchema` — **ne** katalogo podėlį.
- `getDefaultReferralFor(provider)` → to teikėjo `fixed` rekomendacija, kurios
  `isDefault: true`, arba `null`. Tikrina tik `fixed` — kampanija niekada nenaudojama
  kaip teikėjo „numatytoji“ nuoroda.

Tikroji taisyklė, nustatanti, „kuri rekomendacija yra numatytoji teikėjui“, yra
`findDefaultReferral()` (`src/lib/radar/referrals.ts`) — maža grynoji funkcija,
**neimportuojanti DB**, todėl ją saugu importuoti į `"use client"` komponentą.
`getRadarReferrals`/`getDefaultReferralFor` (faile `index.ts`) įtraukia
`@/lib/db/radar`, todėl naudojamos tik serverio pusėje; teikėjų valdymo skydelis
tiesiogiai importuoja `referrals.ts`, o ne `index.ts` (žr. toliau), kad
`better-sqlite3` nebūtų įtrauktas į naršyklės paketą.

### `GET /api/radar/referrals`

Laikomasi lygiai tokios pačios patikrų tvarkos kaip ir visuose kituose Radar maršrutuose: `RADAR_ENABLED` išjungtas →
`404` (tikrinama pirmiausia, išlaikant identiškus baitus); neautentifikuotas naudotojas → `401`; kitu atveju,
jei duomenys pasenę, skaitant inicijuojamas sinchronizavimas (žr. pirmiau), tada grąžinamas `200` su
`{ fixed, campaigns, tier }` — `tier` gaunamas tiesiai iš (galbūt ką tik atnaujintos)
podėlio eilutės ir yra tik informacinis (jis valdo toliau aprašytą neįkyrų UI pasiūlymą). Niekada
tiesiogiai neveikia kaip sklaidos kanalo serverio tarpinis serveris — paties maršruto šaltinio kode nėra `fetch(` iškvietimo;
tinklo užklausa visada vykdoma tik `syncRadarReferrals()` viduje, laikantis to paties
tik vietinio podėlio principo kaip ir `/api/radar/catalog`.

### Valdymo skydelio UI — „Nemokami kreditai“ skirtukas puslapyje `/dashboard/radar`

Esamas Radar puslapis (`src/app/(dashboard)/dashboard/radar/page.tsx`) pakartotinai
naudojamas kaip antras skirtukas, užuot kūrus naują maršrutą — funkcijai, kuri yra
puslapyje jau gaunamų duomenų variacija, taip sumažinama maršrutizavimo / i18n apimtis.
Pasirinkus dalyvauti, skirtukų juostoje pateikiami **Katalogas** (esama lentelė) ir
**Nemokami kreditai**:

- Fiksuotos nuorodos grupuojamos pagal paslaugų teikėją; prie kiekvienos rodomas `requiredAction` (jei yra)
  ir mygtukas su `target="_blank" rel="noopener noreferrer"`, nukreipiantis į rekomendacijos URL.
- Kampanijose rodoma ta pati informacija ir, jei yra, `validUntil`.
- Kai `campaigns` yra tuščias **ir** pateiktas lygis yra `community`, UI rodo
  trumpą pasiūlymo pastabą („riboto laiko kampanijos yra papildoma rėmėjams skirta galimybė“) — ji **niekada**
  nepaslepia ir neapriboja fiksuotų nuorodų sąrašo, kuris išlieka visiškai užpildytas kiekvienam lygiui.
  Tai tik neįkyrus pasiūlymo tekstas, o ne blokavimas.

### Rekomendacijos nuoroda paslaugų teikėjo pavadinime (paslaugų teikėjų valdymo skydelis)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
jau susiedavo paslaugų teikėjo pavadinimą su `providerInfo.website`, kai ši reikšmė buvo pateikta, ir turėjo vieną
precedentą komercinei nuorodai: Kimi (Moonshot AI) partnerio nuorodos pastabą
(`providers.kimiPartnerLinkNote` i18n raktą). D28 pakartotinai naudoja lygiai tokį patį santūrios pastabos
šabloną numatytosioms Radar rekomendacijoms, užuot įvedęs naują raktą.

Silpnas susiejimas yra sąmoningas:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  yra **grynoji** funkcija — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — nepriklausanti nuo `@/lib/radar` ar `@/lib/db/*`. Visame `providerPageUtils.ts`
  taip pat nėra šių importų (tai tikrinama
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (`"use client"` komponentas) yra vienintelė vieta, kuriai leidžiama
  gauti Radar duomenis — naudojant `fetch("/api/radar/referrals")`, tą patį vietinio maršruto
  šabloną, kurį naudoja ir pats Radar valdymo skydelio puslapis, — o numatytoji rekomendacija
  kliento pusėje apskaičiuojama naudojant `findDefaultReferral()` iš nuo DB nepriklausančio
  `src/lib/radar/referrals.ts`.
- Kai `RADAR_ENABLED` išjungtas, užklausa grąžina 404, `referralUrl` lieka `null`, o
  `resolveProviderHeaderLink()` grąžina statinę katalogo `website` reikšmę nepakeistą — paslaugų
  teikėjo puslapis baitų lygmeniu yra identiškas tam, koks buvo prieš atsirandant šiai funkcijai.
  Toks pat rezultatas gaunamas, kai podėlio dar nėra arba konkrečiam paslaugų teikėjui nėra
  numatytosios rekomendacijos.
- Kai numatytoji rekomendacija pritaikoma, `ProviderPageHeader` gauna `isReferralLink`
  ir rodo tokią pačią santūrią pastabą / paaiškinimą kaip ir Kimi partnerio nuorodai (pakartotinai naudojant
  `providers.kimiPartnerLinkNote` raktą) — niekada netaikomas naujas, atskiras vizualinis pateikimas.

---

## Kaip savarankiškai prieglobti informacijos santrauką

Atšaka arba savarankiškos prieglobos naudotojas, norintis visiškai valdyti katalogą, gali paleisti savo informacijos santraukos
paslaugą nekeisdamas kliento kodo:

1. Pateikite `GET /v1/catalog/latest` galinį tašką, grąžinantį JSON turinį, kuris atitinka
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — aukščiausio lygio `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` ir `totals`. Paisykite `x-omniroute-radar-schema: 2`; su pereinamuoju laikotarpiu suderinamas serveris
   turėtų pagal numatytąją nuostatą užklausoms be šios antraštės pateikti atskirai pasirašytą v1 artefaktą.
2. Pasirašykite tikslius atsakymo baitus Ed25519 raktų pora ir grąžinkite base64
   parašą atsakymo antraštėje `x-omniroute-feed-signature`.
3. Nustatykite `RADAR_FEED_URL` į naują bazinį URL, o `RADAR_FEED_PUBKEY` — į atitinkamą
   viešąjį raktą (base64-DER SPKI arba PEM) — žr.
   [aplinkos kintamųjų nuorodą](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Įjunkite `RADAR_ENABLED` ir sutikite naudodami `POST /api/radar/settings`
   (`{ optIn: true }`).

Jokių kitų kodo pakeitimų nereikia — `verifyFeedBytes()` automatiškai aptinka perrašytą
nuostatą (`getFeedPublicKeys()` faile `src/lib/radar/pinnedKeys.ts`), o versijų
palyginimas, schemos tikrinimas ir sujungimo taisyklės savarankiškai priglobtai
informacijos santraukai taikomi taip pat.

Rekomendacijų nuorodos (žr. pirmiau pateiktą skiltį [Rekomendacijų nuorodos (nemokami kreditai)](#referral-links-free-credits))
yra atskiras, pasirenkamas artefaktas: atšaka, kuri pateikia tik `/v1/catalog/latest`,
vis tiek veikia visavertiškai — gavus `404` iš `/v1/referrals/latest`,
`syncRadarReferrals()` pereina į `{ status: "error" }`, o podėlis tiesiog lieka tuščias, todėl
`GET /api/radar/referrals` ir toliau grąžina `{ fixed: [], campaigns: [], tier: null }`,
užuot sutrikdęs likusios puslapio dalies veikimą. Norėdami taip pat siūlyti rekomendacijų nuorodas, pateikite
`GET /v1/referrals/latest`, atitinkantį `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`), ir pasirašykite jį ta pačia Ed25519 raktų pora kaip
katalogo informacijos santrauką.

Rėmėjų pasiūlymai yra dar vienas pasirenkamas artefaktas. Norėdami juos pateikti, įgyvendinkite
`GET /v1/offers/latest` su uždarąja `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), reikalaukite aktyvios prieigos teisės, grąžinkite
`x-omniroute-feed-tier: live` ir pasirašykite tikslius baitus tuo pačiu raktu. Šio galinio taško
neįtraukianti atšaka nekeičia katalogo ir rekomendacijų veikimo; pasiūlymų atnaujinimas nepavyksta
nesukeldamas žalos, o paskutinis patikrintas vietinis pasiūlymų podėlis lieka pasiekiamas.

Intel taip pat yra pasirenkamas. Savarankiškos prieglobos naudotojas gali pateikti `GET /v1/intel/latest` naudodamas
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), reikalauti aktyvios prieigos teisės, grąžinti
`x-omniroute-feed-tier: live` ir pasirašyti tikslius baitus bendrinamu Ed25519 raktu. Neįtraukus šio
galinio taško katalogas, rekomendacijos ir pasiūlymai lieka nepakitę; atnaujinant Intel išsaugoma bet kokia paskutinė patikrinta
vietinė momentinė kopija.

---

## Susijusi dokumentacija

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — klaidų
  atsakymų šablonas, kurio laikosi `/api/radar/*` maršrutai.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` nuoroda.
