# Radar Free-Model Catalog (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Patiesais avots:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Pēdējoreiz atjaunināts:** 2026-09-01 — v3.8.51
> **Mitinātā pakalpojuma pierādījumu robeža:** šeit aprakstītie servera puses noteikumi tika pārbaudīti
> 2026-09-01 pret apzināti privāto Radar serveri precīzā revīzijā
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Šī implementācija netiek izplatīta
> šajā OSS repozitorijā; mitinātā pakalpojuma pieejamība joprojām ir atsevišķs darbības stāvoklis.

Radar ir **neobligāts papildinājums**, kas virs laidiena bāzes kataloga (`FREE_MODEL_BUDGETS` failā
`open-sse/config/freeModelCatalog.data.ts`) uzslāņo parakstītu, nesen atjauninātu bezmaksas modeļu
katalogu. Tas pastāv tāpēc, ka bezmaksas līmeņa piedāvājums mainās ātrāk par laidienu izdošanas
tempu — pakalpojumu sniedzēji starp laidieniem pievieno, samazina vai pārtrauc bezmaksas kvotas,
bet bāzes katalogu var atjaunināt tikai tad, kad tiek izdota jauna versija.

**Nekas, kas šodien ir bezmaksas, attālās plūsmas dēļ nepārstāj būt bezmaksas.** Radar nekad
nepadara bāzes ierakstu par maksas ierakstu; tas tikai lasīšanas laikā atjaunina ierobežojumu/statusa
laukus un starp laidieniem var pievienot jaunatklātus bezmaksas modeļus. Operators joprojām var
lokāli paslēpt modeli un to atjaunot tajā pašā informācijas panelī. Pats bāzes katalogs diskā
nekad netiek mainīts — skatiet tālāk sadaļu
[Lasīšanas laika pārklājuma sapludināšanas noteikumi](#read-time-overlay-merge-rules).

---

## Piegādes statuss versijā v3.8.51

Tālāk norādītais statuss nošķir šajā OSS laidienā implementēto no vēlākām Radar
darba plūsmām. Tas ir koda līmeņa statuss, nevis solījums, ka konkrēta mitinātā izvietošana
vai ārēja integrācija pašlaik ir pieejama.

| Joma                                   | Statuss šajā laidienā                                                                                                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parakstītā kataloga klients            | Implementēts aiz `RADAR_ENABLED`, ar atsevišķu piekrišanu, Ed25519 verifikāciju, lokāli šifrētiem iestatījumiem/kešatmiņu, pastāvīgām attēlošanas/iespējošanas ignorēšanas vērtībām, atgriezeniskiem dzēšanas marķieriem, plānotāju un informācijas paneli.               |
| Līdzautoru aktivizācija                | Informācijas panelis novirza uz serverī mitināto GitHub pieprasīšanas plūsmu un pieņem esošu `omr_…` atslēgu. Līdzautora atbilstību nosaka privātais pakalpojums; OSS klients nesatur GitHub pilnvaru vai izsniegšanas loģiku.                                            |
| Atbalstītāja atslēgas aktivizācija     | Implementēta. Neapstrādātā atslēga tiek validēta, šifrēta glabāšanas laikā, maskēta lasīšanas laikā un nosūtīta tikai servera puses sinhronizācijas laikā. Atslēgas mainīšana vai notīrīšana padara nederīgas visas četras piekļuves tiesību jutīgās plūsmu kešatmiņas.   |
| Novirzīšanas saites                    | Implementētas kā atsevišķi parakstīta, ik stundu atjaunināta plūsma. Fiksētās saites kopienas līmenim ir pieejamas nekavējoties; ierobežotās kampaņas joprojām ir tiešsaistes līmeņa dati.                                                                                |
| Piedāvājumi atbalstītājiem             | Implementēti kā atsevišķa parakstīta, tikai tiešsaistē pieejama plūsma un informācijas paneļa lapa. Klients atkārtoti validē slēgto priekšrocību shēmu, saglabā pēdējo derīgo kešatmiņu, filtrē ierakstus ar beigušos termiņu un skaidri marķē partneru piedāvājumus.     |
| Informācija un atbalstītāju atpazīšana | Implementēta kā stingri parakstīta, tikai tiešsaistē pieejama plūsma ar Radar pārvaldītu ELO, faktiskajiem kataloga aktualitātes/tendenču datiem, verificētu lokālo atbalstītāja emblēmu, informācijas paneļa lapu un tikai lokālām CLI statusa/sinhronizācijas komandām. |
| Maksājumi un transakciju e-pasts       | OSS klientā nav implementēti. Pirkumi, ziedojumi, kvīšu pārskatīšana, atkopšana un pasta piegāde pieder privātajam pakalpojumam; mitinātā pakalpojuma pieejamība joprojām ir atkarīga no tā uzraudzītās izvietošanas un pakalpojumu sniedzēja konfigurācijas.             |
| Izpētes aģenta darba plūsma            | Nav daļa no šī klienta laidiena. Pārvaldīto plūsmu saturs paliek servera puses dati; nevienā OmniRoute instalācijā nedarbojas autonoms izpētes aģents.                                                                                                                    |

---

## Publisko paziņojumu lasītājs

Vispārīgais paziņojumu lasītājs ir nodalīts no Radar funkcijas karoga. Informācijas paneļa sākumlapa un
izmaiņu žurnāla skatītājs iegūst repozitorija publisko `news.json`, izmantojot parastu `GET` pieprasījumu uz
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Tie nesūta Radar iestatījumus, uzvednes, pakalpojumu sniedzēja
konfigurāciju, lietojuma ierakstus vai lokālo noraidīšanas stāvokli.

`news.json` izmanto slēgto v2 shēmu, kas ieviesta ar `parseNewsPayload()`:

- `schemaVersion: 2` un ierobežota `items[]` kolekcija;
- stabilas, unikālas paziņojumu `id` vērtības;
- skaidri norādīti `active` un ISO `publishedAt` lauki;
- obligāts teksts angļu valodā ar neobligātu lokalizētu tekstu;
- neobligātas HTTPS saites bez akreditācijas datiem un atļauto ikonu sarakstā iekļauta ikona;
- jaunākā aktīvā ieraksta izvēle, atkāpšanās uz angļu valodu, ja lokalizācija nav pieejama, un lokāla noraidīšana katram ID.

Parsētājs īslaicīgi pieņem iepriekšējo vienskaitļa formu `{ active, title, message, ... }`, lai
vecāki atzarojumi varētu migrēt bez bojāta izmaiņu žurnāla skata. Nederīgas plūsmas ir neaktīvas. Radar palaišanas
ieraksts tiek piegādāts ar `active: false`; tā maiņa uz `true` ir atsevišķa laidiena darbība pēc sapludināšanas un izvietošanas,
un tā nemaina `RADAR_ENABLED` vai neatkarīgo plūsmas sinhronizācijas piekrišanu.

---

## Karogs: `RADAR_ENABLED` (pēc noklusējuma izslēgts)

Radar darbību visā sistēmā ierobežo funkcijas karogs `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorija `policies`,
`defaultValue: "false"`).

**Kad karogs ir izslēgts, šī saskarne nepastāv:**

- Visi `/api/radar/*` galapunkti, tostarp lokālā modeļa stāvokļa lasīšana un rakstīšana,
  atgriež `404`, pirms tiek skarts jebkurš Radar modulis.
- Informācijas paneļa ekrāni (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) izpilda
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) atgriež nemainītu bāzes katalogu —
  tādu pašu ierakstu skaitu, tās pašas vērtības, katram ierakstam pievienojot `origin: "baseline"` — un nekad
  nelasa plūsmas kešatmiņu.
- Neviens Radar tīkla izsaukums nekad netiek veikts; katrs sinhronizācijas modulis atgriež `{ status: "disabled" }`,
  pirms tiek skarts `fetch`.

Šis ir stingrs virskopas ierobežojums: karoga ieslēgšana atbloķē tikai _ekrānus_ un neko
vairāk. Tā neaugšupielādē datus, nesāk fona sinhronizāciju un nemaina
maršrutēšanu vai modeļa izvēli — skatiet tālāk aprakstīto atsevišķo piekrišanu.

---

## Datu sinhronizācija ir SEPARATE izvēle, — apsolīja privātumu

Ieslēdzot `RADAR_ENABLED`, tiek atbloķēta tikai UI. Plūsmas sinhronizēšanai ir nepieciešama otra neatkarīga izvēle, kas tiek saglabāta `radar_settings.opt_in` (`src/lib/db/radar.ts`, migration `136_radar_cache_settings.sql`). `syncRadar()` pārbauda karogu _un_ izvēles iespēju pirms jebkura tīkla zvana veikšanas:

```
Flag off      → { status: "disabled" }   — no network call
Opt-in false  → { status: "opt_out" }    — no network call
```

Kad abi ir ieslēgti, sinhronizācijas ceļš ir:

1. `GET <feed base URL>/v1/catalog/latest` ar `x-omniroute-radar-schema: 2` un izvēles `Authorization: Bearer <supporter key>` galveni (skatiet tālāk). Ja shēmas galvenes nav, serveri pēc noklusējuma izmanto atsevišķi parakstīto v1 pārejas artefaktu, tāpēc vecāki instalētie klienti turpina saņemt atjauninājumus.
2. Šī ir tikai lejupielādes lietojumprogrammu plūsma, taču tā joprojām ir HTTPS pieprasījums. Mitinātā infrastruktūra saņem parastus savienojuma metadatus, piemēram, avota IP. Kad atbalstītāja atslēga ir konfigurēta, sinhronizācija arī nosūta šo atslēgu nesēja galvenē, lai pakalpojums varētu atrisināt šīs tiesības. Precīzā privātā servera pārskatīšanā, kas norādīta iepriekš norādītajā pierādījumu robežās, plūsmas pieprasījuma uzskaite izmanto atslēgu jaucējumus, apkopoto lietojumu un katru dienu rotējošu saīsinātu IP HMAC manuālai ļaunprātīgas izmantošanas pārskatīšanai; šīs tabulas neapstrādātā veidā saglabā ne taustiņu, ne IP. Infrastruktūras piekļuves žurnāli un šifrētā piegādes izsūtne ir atsevišķas darbības robežas.
3. OmniRoute nekad nesūta uzvednes, atbildes, sarunas, pakalpojumu sniedzēja akreditācijas datus, modeļa trafiku, darbspējas laiku, latentumu vai vietējā nodrošinātāja konfigurāciju pakalpojumam Radars.
4. Atbilde tiek pārbaudīta, apstiprināta un lokāli saglabāta kešatmiņā (skatiet [drošības modeli](#security-model) ). Radaram ir tieši četri servera puses tīkla ceļi: `syncRadar()` katalogam, `syncRadarReferrals()` novirzīšanai un `syncRadarOffers()` / `syncRadarIntel()` tikai atbalstītāju piedāvājumiem un Intel.

Kataloga pārbaude notiek ik pēc 24 stundām. Ja verificētajā plūsmā joprojām ir kešatmiņā saglabātā versija un līmenis, sinhronizācija saglabā kešatmiņā saglabāto lietderīgo slodzi, atjauno `fetchedAt`, un nākamā pārbaude tiek veikta pēc 24 stundām vēlāk, nevis ar nākamo stundu.

The** atbalstītāja atslēga** ir neobligāts Nesēja marķieris (`radar_settings.supporter_key`), kas ļauj plūsmas pakalpojumam izlemt, kuru līmeni apkalpot (skatiet [sadaļu Līmeņi](#tiers-community-and-live) ). Tas ir:

- Saglabāts** šifrēts miera stāvoklī** ar tiem pašiem AES-256-GCM `encrypt()`/`decrypt()` palīgiem (`src/lib/db/encryption.ts`), kas tiek izmantoti pakalpojumu sniedzēja akreditācijas datiem.
- Iestatīt, izmantojot `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) un** nekad neatsaucās** — atbilde atgriež maskētu formu (`omr_****abcd`).
- Mainot vai notīrot to, katalogs, ieteikumi, piedāvājumi un Intel kešatmiņas kļūst nederīgi. Nākamā sync/read atrisina jaunās tiesības servera pusē; atslēgas saglabāšana pati par sevi neveic tīkla pieprasījumu vai neizmanto vienreiz lietojamu aktivizācijas atslēgu.
- Nosūtīts plūsmas pakalpojumam kā nesēja marķieris sinhronizācijā GET — nekas cits par atslēgu nekad netiek atstāts no klienta.

---

## Piekļuves un drošības noteikumi, kas tiek parādīti pirms piekrišanas

Neaktīvajā informācijas panelī šie noteikumi tiek atveidoti no
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **pirms** jebkuras aktivizēšanas darbības.
Kanoniskā piekļuves skala ir šāda:

| Līmenis                      | Atbilstības kritēriji                                                                              | Piekļuve                                                     | Atkārtošanas/termiņa beigu noteikums                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Kopiena                      | Ikviens; atslēga nav nepieciešama                                                                  | Pilns katalogs ar aptuveni 30 dienu aizkavi                  | Vienmēr pieejams; atslēga netiek izsniegta                                         |
| Zvaigzne + sekošana          | GitHub OAuth pārbauda gan zvaigzni repozitorijam, gan sekošanu tā īpašniekam                       | Viena aktuālā kataloga nolasīšana, pēc tam Kopiena           | Viena izsniegšana katrā pieteikšanās reizē; netiek izsniegta atkārtoti             |
| Dalībnieku Top 10            | 1.–10. vieta jaunākajā pilnīgajā nedēļas reitingā                                                  | 365 dienas aktuālās piekļuves                                | Tiek piešķirta pēc pieprasījuma; izkrišana no reitinga nesaīsina piešķirto periodu |
| Dalībnieku Top 100           | 11.–100. vieta šajā reitingā                                                                       | 90 dienas aktuālās piekļuves                                 | Tas pats pēc pieprasījuma izpildāmais/idempotentais piešķiršanas noteikums         |
| Atbalstītāja pirkums         | Vienreizējs pirkums uz 6 mēnešiem, 1 gadu vai visu mūžu                                            | Aktuālais katalogs, parakstīti aktuālie piedāvājumi un Intel | Nav automātiskas atjaunošanas                                                      |
| Ziedojums/manuāls piešķīrums | Īpašnieka pārskatīts ziedojums vai īpašnieka piešķīrums uz skaidri noteiktu dienu skaitu/visu mūžu | Tādas pašas aktuālās tiesības piešķirtajā periodā            | Auditēts, idempotents piešķīrums                                                   |

Apvienotie PR, komiti un mainītās rindas ir **tikai reitinga ievaddati**. Pieteikšanās ārpus Top 100
nepiešķir dalībnieka tiesības neatkarīgi no PR skaita. Ierobežota termiņa pirkumi, ziedojumi, dalībnieka periodi un
manuālie piešķīrumi tiek pieskaitīti pašreizējam derīguma termiņam; mūža piekļuvei ir priekšroka. Reitinga izmaiņas nekad
ar atpakaļejošu spēku neatsauc un nesaīsina jau piešķirto laiku.

Mitinātā licence ir personiska, un lietotājiem paredzētais noteikums atļauj vienlaikus izmantot vienu aktīvu instalāciju. Šajā
laidienā **netiek** apgalvots, ka pastāv aparatūras bloķēšana: OSS sinhronizācija neveido aparatūras digitālnospiedumu un neuztur
kriptogrāfisku ierīces nomu. Iepriekš norādītajā verificētajā privātā servera revīzijā ieviestā kontrole
ietver tiesību validāciju un manuālas pārskatīšanas signālu, ja viena un tā pati aktuālā atslēga 24 stundu laikā tiek konstatēta no ceturtās
atšķirīgās IP adreses. Šis signāls nekad automātiski nebloķē un neatsauc atslēgu. Atkopšanas laikā
pazaudētā atslēga tiek atsaukta un aizstāta, saglabājot esošo derīguma termiņu; iegādātais vai piešķirtais
periods netiek sākts no jauna.

Aktuālie piedāvājumi tiek atlasīti manuāli un var mainīties vai zaudēt spēku. Piekrišanas ekrānā ir arī precīzi norādīta
privātuma robeža: tiek lejupielādēti parakstīti kataloga/novirzīšanas metadati; derīga atslēga papildus atbloķē
parakstītus piedāvājumus un Intel; Bearer atslēga un parastie savienojuma metadati sasniedz mitināto pakalpojumu;
uzvednes, atbildes, sarunas, pakalpojumu sniedzēju akreditācijas dati, modeļu datplūsma, darbspējas laiks, latentums un lokālā
pakalpojumu sniedzēju konfigurācija to nesasniedz.

---

## Atbalstītāja atslēgas iegūšana

Aktivizācijas ekrānā (`/dashboard/radar`) ir saites uz divām plūsmām atbalstītāja atslēgas **iegūšanai**. Pats OSS repozitorijs nekad neizsniedz atslēgas, neizpilda maksājumu kodu un **nekad nenorāda cenu** — cenas tiek noteiktas un pilnībā attēlotas galamērķa lapās, nevis šajā repozitorijā (specifikācijas lēmums D14).

- **"Esmu līdzautors"** — atver `RADAR_CONTRIBUTOR_CLAIM_URL` (pēc noklusējuma
  `https://radar.omniroute.online/auth/github`), GitHub OAuth pieprasījuma plūsmu, kas tiek mitināta
  privātajā Radar serverī. Tā pārbauda jaunāko pilnībā pabeigto nedēļas reitingu: pirmās 10 vietas saņem 365 dienas,
  bet 11.–100. vieta saņem 90 dienas. Ārpus pirmā simtnieka PR skaits nekad nepiešķir piekļuvi; tā vietā plūsma
  pārbauda atsevišķo vienreiz izmantojamo zvaigznes + sekošanas līmeni.
- **"Atbalstīt projektu"** — atver `RADAR_SUPPORTER_PLANS_URL` (pēc noklusējuma
  `https://radar.omniroute.online/planos`), mitināto lapu ar vienreizējas iegādes iespējām uz 6 mēnešiem, 1 gadu un
  visu mūžu. OSS lapā joprojām netiek attēlota nekāda naudas summa.

Abi URL tiek noteikti servera pusē (`src/lib/radar/links.ts`, izmantojot tādu pašu vides mainīgā pārrakstīšanas
modeli kā `RADAR_FEED_URL`) un pārsūtīti uz informācijas paneli ar esošo
`GET /api/radar/settings` atbildi (`contributorClaimUrl`, `supporterPlansUrl`) — klienta
komponents pats nekad nelasa `process.env`.

| Mainīgais                     | Mērķis                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Pārraksta līdzautora pieprasījuma URL (pēc noklusējuma `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Pārraksta atbalstītāja plānu URL (pēc noklusējuma `https://radar.omniroute.online/planos`).           |

### Nozaudētas atbalstītāja atslēgas atgūšana

Mitinātā pakalpojuma atgūšanas sākumpunkts ir `https://radar.omniroute.online/recover`; saite uz to ir pieejama arī
plānu lapā. Atgūšana pilnībā notiek ārpus OSS klienta, jo lokālā instalācija nekad nesaņem pircēja/līdzautora e-pasta adresi un nevar rekonstruēt neapstrādāto atslēgu no
šifrētajiem iestatījumiem.

1. Iesniedziet ar atslēgu saistīto e-pasta adresi. Pakalpojums atgriež to pašu apstiprinājuma lapu neatkarīgi no tā,
   vai atgūstama licence pastāv, tādēļ forma neatklāj kontu esamību.
2. Ja lietotājs ir tiesīgs veikt atgūšanu, piegādes darbinis nosūta īslaicīgu, vienreiz izmantojamu saiti. Tās atvēršana nekavējoties pārvieto
   marķieri uz pārejošu, šifrētu `HttpOnly`/`Secure` sīkfailu un novirza uz tīro
   `/recover` URL; lapā nav marķiera, e-pasta adreses, vecās atslēgas vai aizstājējatslēgas.
3. Apstipriniet atsaukšanu. Privātais pakalpojums atsauc iepriekšējo atslēgu, izveido aizstājēju ar
   to pašu plānu/derīguma termiņu un vienā transakcijā ievieto to nosūtīšanas rindā e-pastam. Aizstājējatslēga nekad
   netiek atgriezta pārlūkprogrammai.
4. Ielīmējiet aizstājējatslēgu laukā `/dashboard/radar`. Vecajai atslēgai tagad jāatgriežas `community` līmenī;
   aizstājējatslēgai jānodrošina verificēta `live` sinhronizācija. Atkārtoti atverot to pašu atgūšanas saiti, darbībai jābeidzas ar
   vispārīgu nederīgas/beigušās saites atbildi.

Mitinātais atgūšanas maršruts un pasta darbinis var būt iekļauti kodā, bet konkrētā
izvietojumā joprojām nebūt pieejami. Neuzskatiet plūsmu par gatavu produkcijai, kamēr serveris nav izvietots, piegādes
pakalpojuma sniedzējs nav konfigurēts ar kontrolētu saņēmēju un nav pārbaudīta pilnā vienreiz izmantojamās saites plūsma.

Kad apmeklētājam ir atslēga (`omr_` + 40 heksadecimālas rakstzīmes), aktivizācijas ekrānā
(`src/app/(dashboard)/dashboard/radar/page.tsx`) atslēgas ielīmēšanas ievades lauks ir galvenais
ceļš: ielīmējot atslēgu un iesniedzot formu, vienā izsaukumā tiek nosūtīts `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — atslēgas ielīmēšana to gan iestata, gan iespējo dalību,
atbloķējot ekrānu. Formāts (`omr_` + 40 heksadecimālas rakstzīmes) vispirms tiek pārbaudīts klienta pusē,
izmantojot kopīgoto `isValidSupporterKeyFormat()` palīgfunkciju (`src/lib/radar/supporterKey.ts`),
lai uzlabotu lietotāja pieredzi; servera Zod shēma jebkurā gadījumā ir autoritatīvā pārbaude. Kad
atslēga ir iestatīta, aktivizācijas ekrānā tukša ievades lauka vietā tiek parādīta maskētā forma (`supporterKeyMasked` no
`GET /api/radar/settings`) ar vadīklu "mainīt atslēgu", lai
ielīmētu jaunu — neapstrādātā atslēga nekad netiek atkārtoti parādīta. Abas iepriekš minētās pieprasīšanas/plānu pogas
joprojām ir paredzētas atslēgas sākotnējai _iegūšanai_; šajā ievades laukā operators,
kuram tā jau ir, to aktivizē.

### Pilna aktivizācija un vadīta iestatīšana

Privātajam plūsmas pakalpojumam un šim OSS klientam ir apzināti šauri nodalīta atbildība: pakalpojums
izsniedz un validē atbalstītāja atslēgu, savukārt lokālā OmniRoute instalācija šifrē atslēgu,
sinhronizē parakstītos artefaktus servera pusē un vada pakalpojumu sniedzēja iestatīšanu. Vadītās validācijas secība ir:

1. Iegūstiet no jauna izsniegtu vai atgūtu atslēgu, izmantojot līdzdalībnieka pieprasījumu, plānu/noformēšanas procesu, atkopšanas
   procesu vai pilnvarotu privātā servera operatoru. Neievietojiet neapstrādāto atslēgu žurnālos,
   ekrānuzņēmumos, problēmu komentāros vai komandrindas argumentos.
2. Iespējojiet `RADAR_ENABLED` funkcionalitātes karogu lokālajā OmniRoute instalācijā. Tas padara lietotāja saskarni
   pieejamu, taču tīkla darbības netiek veiktas, kamēr nav saglabāta atsevišķā piekrišana.
3. Atveriet `/dashboard/radar`, ielīmējiet atslēgu un aktivizējiet. Pārlūks nosūta vienu lokālu
   `POST /api/radar/settings` pieprasījumu ar `{ optIn: true, supporterKey }`; atslēga tiek šifrēta lokāli, un
   atbildē ir tikai `omr_****<last4>`.
4. Ļaujiet aktivizēšanas ekrānam pabeigt kataloga sinhronizāciju vai atlasiet **Sinhronizēt tagad**. Pārliecinieties, ka lapā
   tiek rādīts `live`, plūsmas versija un izgūšanas laiks. Autentificētai lokālai diagnostikai
   `GET /api/radar/status` ziņo par piekrišanas/atslēgas esamību un četriem kešatmiņas stāvokļiem, neatgriežot
   atslēgu. `POST /api/radar/sync-all` var tieši atsvaidzināt katalogu, novirzījumus, piedāvājumus un Intel.
5. Atveriet `/dashboard/radar/setup?provider=<provider>`. Atveriet pakalpojumu sniedzēja pārvaldīto akreditācijas datu URL,
   atlasiet **Pievienot API atslēgu**, saglabājiet to īstajā pakalpojumu sniedzēja veidlapā, atgriezieties ceļvedī un palaidiet
   **Pārbaudīt savienojumu**. Ceļvedis izmanto parastos `/api/providers` un
   `/api/providers/<connection-id>/test` maršrutus; tas neveido atsevišķus Radar akreditācijas datus.
6. Atveriet `/dashboard/radar/combos`, kad ir aktīvi vismaz divi saderīgi pakalpojumu sniedzēju savienojumi.
   Pārskatiet ieteikto saimi un izveidojiet kombināciju, izmantojot esošo kombināciju API. Piedāvājumi un
   Intel joprojām ir atsevišķas, tikai `live` režīmā pieejamas parakstītas kešatmiņas, un tās var pārbaudīt tām paredzētajās Radar lapās.
7. Atkārtoti ielādējiet `/dashboard/radar` un iestatīšanas lapu. Piekrišanai, maskētās atslēgas stāvoklim, verificētajai kešatmiņai, saglabātajam
   pakalpojumu sniedzēja savienojumam un pārbaudes darbībai jāsaglabājas pēc atkārtotas ielādes. Fiksējiet pierādījumus tikai tad, kad
   neapstrādātā atslēga un pakalpojumu sniedzēja akreditācijas dati vairs nav redzami.

Atslēgas saglabāšana pati par sevi nav pierādījums aktīvām `live` piekļuves tiesībām. Pierādījumu veido privātā
pakalpojuma `GET /v1/license/check` rezultāta, OSS kataloga nodrošinātā `live` līmeņa, verificētas parakstītas
kešatmiņas un īstā pakalpojumu sniedzēja savienojuma/pārbaudes procesa kopums. Nederīgas, beigušās vai atsauktas atslēgas gadījumā
katalogs droši pāriet uz `community` līmeni; to nedrīkst norādīt kā veiksmīgu `live` atslēgas validāciju.

### Privātā administratora paneļa saite

`RADAR_ADMIN_URL` pēc izvēles pievieno **Radar administrēšana ↗** uzreiz aiz lietotājiem paredzētā
Radar vienuma sānjoslas sadaļā Izmaksas. Tai apzināti nav noklusējuma vērtības: ja mainīgais
nav iestatīts vai nav derīgs, statiskajā sānjoslā, komandu paletē un sānjoslas pielāgošanas ekrānā nav
administratora vienuma un privāta URL.

Vērtība tiek noteikta servera pusē un ar pārvaldības autentifikāciju aizsargātajā
`GET /api/settings` atbildē nosūtīta tikai autentificētai informācijas paneļa sesijai vai uzticamajam
atgriezeniskās cilpas īpašniekam lokālās sākotnējās ielādes laikā bez pieteikšanās. CLI, iekšējā pakalpojuma un `manage` tvēruma API atslēgas
autentifikācija to nesaņem. Pirms ārējās saites izveidošanas pārlūks vēlreiz validē atbildi, un
saite tiek atvērta ar `noopener noreferrer`.

Izmantojiet HTTPS tuneļa/tailnet URL bez akreditācijas datiem. Vienkāršs HTTP tiek pieņemts tikai atgriezeniskās cilpas SSH
pāradresācijai, piemēram, `http://127.0.0.1:9351`; citas shēmas, iegulti akreditācijas dati, nepareizi veidoti URL un
attāli HTTP galamērķi tiek droši noraidīti, un navigācija paliek neaktīva.

---

## Drošības modelis

### Ed25519 paraksts precīziem baitiem

Plūsmas lietderīgā slodze ir parakstīta ar Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) pārbauda parakstu **precīzi tiem atbildes baitiem**,
kas saņemti pa tīklu — lietderīgā slodze pirms pārbaudes nekad netiek atkārtoti serializēta, tāpēc
atkārtota kodēšana baitu pa baitam nevar nemanāmi padarīt paraksta pārbaudi nederīgu vai to apiet.
Pārbaudes kļūme (`invalid_signature`) pārtrauc sinhronizāciju, pirms lietderīgā slodze vispār tiek
parsēta vai saglabāta kešatmiņā.

### Piesaistīta publiskā atslēga un tās rotācija

Pārbaudes publiskā atslēga ir piesaistīta failā `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`); tas ir masīvs, lai pirms rotācijas varētu sākumā pievienot jaunu
atslēgu, kamēr vecās kešatmiņā saglabātās plūsmas, kas parakstītas ar iepriekšējo atslēgu, paliktu
derīgas līdz atkārtotai sinhronizācijai.

### Atzariem piemērotas vides mainīgo pārrakstīšanas iespējas

Divi vides mainīgie ļauj atzariem un pašmitinātājiem noklusējuma OmniRoute pakalpojuma vietā
novirzīt klientu uz savu plūsmu — skatiet tālāk
[Kā pašmitināt plūsmu](#how-to-self-host-a-feed):

| Mainīgais           | Nolūks                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Pārraksta plūsmas bāzes URL (noklusējums: `https://radar.omniroute.online`).                                     |
| `RADAR_FEED_PUBKEY` | Pārraksta piesaistīto publisko atslēgu (base64-DER SPKI vai PEM), aizstājot iebūvēto masīvu ar šo vienu atslēgu. |

### Minimālā versija

`syncRadar()` noraida lejupielādētu plūsmu, kuras `version` nav stingri jaunāka par
pašlaik kešatmiņā saglabāto versiju (`compareVersions()`, punktēts `YYYY.MM.DD.n` salīdzinājums) —
`{ status: "stale" }`. Tas neļauj kompromitētam vai nepareizi konfigurētam plūsmas galapunktam
atgriezt klientu uz vecāku, citādi parakstītu lietderīgo slodzi.

### Divi datumi un kāpēc tiek saglabāti abi

Kešatmiņā saglabātai plūsmai ir divi atšķirīgi datumi, un to sajaukšanas iespēja ir tieši tas
iemesls, kāpēc tiek saglabāti abi:

| Lauks         | Izcelsme                    | Uz ko tas atbild                         |
| ------------- | --------------------------- | ---------------------------------------- |
| `generatedAt` | parakstītais plūsmas saturs | cik veci ir **dati**                     |
| `fetchedAt`   | šīs instalācijas pulkstenis | kad šī instalācija tos **lejupielādēja** |

Pirms dažām minūtēm ielādēta plūsma var saturēt vairākas nedēļas vecus rādītājus, tāpēc
`fetchedAt` vien nevar operatoram pateikt, vai pārklājums ir jaunāks par pamatdatiem, uz kuriem
tas balstās. Abi tiek saglabāti `radar_feed_cache`, atgriezti laukā
`getRadarCatalog().meta` un atsevišķi uzrādīti ar `GET /api/radar/status`. Rinda, kas
kešatmiņā saglabāta pirms kolonnas `generated_at` ieviešanas (migrācija 163), tiek nolasīta
kā `null` — nezināms paliek nezināms, nevis aizņemas lejupielādes laiku.
`radar_referrals_cache` savu `generated_at` ir saglabājusi kopš migrācijas 142.

Iepriekš aprakstītā minimālās versijas pārbaude salīdzina `version`, nevis kādu no datumiem.

Joprojām pastāv divi apzināti atstāti trūkumi: informācijas panelī joprojām tiek rādīts tikai
`Last fetched`, tāpēc būvējuma datuma attēlošanai tajā nepieciešama jauna etiķete (un tās
41 lokalizācijas ieraksts); turklāt piedāvājumu un izlūkdatu kešatmiņas vispār nesaglabā
būvējuma datumu, lai gan to plūsmu shēmas tādu satur — tādēļ `GET
/api/radar/status` šiem abiem šo lauku izlaiž, nevis uzrāda `null`, kas būtu lasāms kā
„nezināms”.

### Shēmas validācija

Lejupielādētie baiti tiek parsēti un validēti atbilstoši `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, Zod shēma) **pēc** paraksta pārbaudes. Shēmas neatbilstības
gadījumā tiek atgriezts `{ status: "invalid_schema" }`, un kešatmiņa paliek neskarta.
Kešatmiņā saglabātā lietderīgā slodze piesardzības nolūkos tiek atkārtoti validēta katrā
nolasīšanas reizē (`getRadarCatalog()`) — bojāta vai manuāli rediģēta kešatmiņas rinda
tiek aizstāta ar pamatdatiem, nevis atgriezta klientam.

### Atbildes izmēra ierobežojums (10 MB)

`syncRadar()` nosaka plūsmas atbildes ķermenim **stingru 10 MB ierobežojumu** — parakstītā
plūsma ir KB mēroga JSON dokuments, tāpēc viss, kas pārsniedz šo apjomu, norāda uz nepareizi
konfigurētu vai naidīgu `RADAR_FEED_URL` (vai augšupēju avotu, kas atgriež nederīgus datus),
nevis uz derīgu katalogu. Ierobežojums tiek piemērots divos līmeņos:

1. Sākotnējā `Content-Length` pārbaude pilnībā izlaiž ķermeņa nolasīšanu, ja
   galvene jau norāda vērtību, kas pārsniedz ierobežojumu.
2. Ķermeņa nolasīšanas laikā veiktā kopējā apjoma uzskaite nodrošina ierobežojuma ievērošanu
   arī tad, ja `Content-Length` nav norādīts vai uzrāda mazāku vērtību par faktisko izmēru —
   galvenei nekad neuzticas vienai pašai. Uzkrāto fragmentu konkatenēšana saglabā precīzos
   baitus, kas pēc tam nepieciešami Ed25519 paraksta pārbaudei.

Ierobežojuma pārsniegšanas gadījumā tiek atgriezts `{ status: "too_large" }`, un kešatmiņa
paliek neskarta, ievērojot to pašu nedestruktīvo principu kā visu pārējo sinhronizācijas
kļūmju gadījumā (`invalid_signature`, `invalid_schema`, `stale`).

---

## Līmeņi: `community` un `live`

Plūsmas shēma ietver lauku `tier: "community" | "live"`, ko **servera pusē**
nosaka plūsmas pakalpojums, pamatojoties uz pieprasījumu (atbalstītāja atslēgas esamību un derīgumu)
— klients nekad pats nenosaka savu līmeni.

- **`community`** — bezmaksas katalogs, kas no jaunākajiem datiem atpaliek aptuveni par 30 dienām.
  To saņem neautentificēts pieprasījums vai pieprasījums ar nederīgu atslēgu.
- **`live`** — jaunākais katalogs, kas tiek nodrošināts pieprasījumiem ar derīgu atbalstītāja
  atslēgu.

**Nederīgas atbalstītāja atslēgas vai atslēgas ar beigušos derīguma termiņu gadījumā līmenis tiek pazemināts uz `community` — tā nekad nav
kļūda.** Sinhronizācijas ceļš no sekmīga `{ status:
"updated", version, tier }` nošķir tikai paraksta/shēmas/versijas kļūmes (visas
atkopjamas un neviena nav kritiska kešatmiņas stāvoklim). Klientam nav jāapstrādā
atsevišķs konkrētam līmenim paredzēts kļūdas ceļš.

### Nodrošinātais līmenis tiek iegūts no atbildes galvenes, nevis parakstītā pamatteksta

Parakstītās plūsmas **pamatteksta** lauks `tier` vienmēr ir `"live"` — plūsmas pakalpojums katrai
versijai piegādā **divus parakstītus artefaktus**: live ietver pašreizējās kampaņas, bet community
tās neietver. Katrs artefakts ir parakstīts, izmantojot tieši tā baitus. Pamatteksts joprojām
netiek izmantots piekļuves tiesību noteikšanai; pieprasījumam faktiski atlasītais līmenis tiek norādīts
**`x-omniroute-feed-tier` atbildes galvenē**, un to servera pusē nosaka pēc pieprasījuma
`Authorization` atslēgas.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) ir vienīgā vieta,
kurā tiek noteikts līmenis, kam klientam jāuzticas:

1. Parsēt `x-omniroute-feed-tier` ar `RadarTierSchema` (Zod) — trūkstoša galvene vai
   vērtība, kas nav precīzi `"community"` vai `"live"`, tiek uzskatīta par **neesošu**
   (tā nekad netiek nemainītā veidā uzskatīta par uzticamu un ievietota kešatmiņā/UI; tas attiecas arī uz vecākiem plūsmas
   serveriem, kas izveidoti pirms šīs galvenes).
2. Izmantot parakstītā pamatteksta lauku `tier` (vienmēr `"live"`) kā atkāpšanās variantu tikai tad, ja 1. darbībā
   nekas netiek iegūts.
3. Atrisinātais līmenis tiek saglabāts kešatmiņā un atgriezts kā `{ status: "updated",
version, tier }` — informācijas panelī tiek rādīta šī vērtība, nevis neapstrādātais pamatteksta
   lauks.

---

## Lasīšanas laika pārklājuma sapludināšanas noteikumi

`applyFeed()` (`src/lib/radar/applyFeed.ts`) apvieno kešatmiņā saglabāto plūsmu** beidzies** statiskā bāzes līnija plkst** lasīšanas laiks** , iekšpusē `getRadarCatalog()`. Bāzes līnijas masīvs (`FREE_MODEL_BUDGETS`) nekad netiek mutēts — a `MergedEntry[]` tiek aprēķināts svaigs katrā izsaukumā.

Četri noteikumi prioritātes secībā:

1. **Plūsma nekad nepārraksta vietējo ignorēšanu.** Katram laukam: ja operators ir pielāgojis ieraksta lauku (`localOverrides` karte, kodētais `provider:modelId`), plūsmas vērtība konkrētajam laukam tiek izlaista — operatora vērtība uzvar.
2. **`enabled: false` atspējo ierakstu ar izcelsmi.** Plūsmas ieraksts, kas izslēdz ierakstu, iestata `enabled: false` un `disabledBy: "radar"` sapludinātajam rezultātam, tāpēc UI var izskaidrot, _kāpēc_ ieraksts kļuva no pieejams uz atspējotu.
3. **Lietotāja pievienots ieraksts, kas nav pieejams plūsmā, paliek neskarts.** Ieraksti, kas eksistē tikai bāzes līnijā (vai tika pievienoti lokāli) un kuriem nav atbilstoša plūsmas ieraksta, tiek izvadīti nemainīgi.
4. **Ieraksts ar kapa pieminekļiem nekad netiek augšāmcelts.** Ja operators nepārprotami izdzēsa ierakstu (`tombstones` set), plūsmas atkārtota pievienošana `provider:modelId` jaunākā versijā to neatgriež.

Rediģējamie lauki un kapakmeņi tiek saglabāti `radar_local_model_state` (migrācijas `153_radar_local_model_state.sql`). Publiskais DB adapteris (`src/lib/db/radar.ts`) pārvērš šīs rindas `localOverrides` kartē un `tombstones` komplektā, ko izmanto `applyFeed()`; ražošanas `getRadarCatalog()` ielādes, kas tiek rādītas pēc karoga, kešatmiņas un shēmas vārtiem. Tikai `displayName` un `enabled` var rediģēt operators. Izmantojot šo virsmu, nevar ierakstīt Provider/model identitāti, barības izcelsmi, kvotu, iespējas, ToS un iestatīšanas datus.

Informācijas panelī ir redzamas četras vietējās darbības:

- **Rediģēt** maina vietējo parādāmo nosaukumu un iespējoto stāvokli.
- **Atiestatīt vietējās izmaiņas** notīra abus rediģējamos laukus, nemainot kapa pieminekli.
- **Slēpt** izveido kapa pieminekli, tāpēc vēlāki plūsmas atjauninājumi nevar atkārtoti izveidot rindu.
- **Atjaunot** noņem kapa pieminekli; jebkura atsevišķi saglabāta ignorēšana paliek spēkā.

Plūsma `enabled: false` joprojām ir drošības izņēmums: tā uzvar novecojušu vietējo `enabled: true`, apvieno apvienoto ierakstu atspējotu un ieraksta `disabledBy: "radar"`.

Kataloga publikācijās tiek izmantots `schemaVersion: 2`. `contextWindow` un katrs no `tools`, `vision` un `thinking` ir neatkarīgi `number | null` / `boolean | null`: `null` nozīmē nezināms, savukārt `false` nozīmē D16-confirmed oficiālu pakalpojumu sniedzēja avotu, kurā skaidri norādīts, ka iespējas nav. Iekšējie OmniRoute registry/model-spec karodziņi nekad netiek tieši reklamēti, lai sniegtu faktus. Klients joprojām pieņem v1 momentuzņēmumus; jo vecais veidotājs izmantoja `false` kā prombūtnes vietturi, v1 `false` tiek normalizēts uz nezināmu, bet v1 `true` paliek faktisks. Nezināmas shēmas versijas neizdodas aizvērt, un pēdējā derīgā kešatmiņa paliek pieejama. Katram v2 modelim ar context/capability kas nav nulle, ir jābūt bez akreditācijas datiem HTTPS `metadataEvidenceUrls[]`; pretējā gadījumā shēmas validācija neizdodas un kešatmiņa netiek aizstāta. Kataloga tabulā visi trīs stāvokļi tiek attēloti kā `✓`, `✕` un `?`.

### Vadāmas kombinācijas un piekļuve MCP

Apstiprinātās `familyId` vērtības saglabā lasīšanas laika pārklājumu un vada tīro `buildRadarComboSuggestions()` moduli (`src/lib/radar/comboSuggestions.ts`). Ģimene tiek ieteikta tikai tad, ja vismaz diviem atšķirīgiem pakalpojumu sniedzējiem ir aktīvi savienojumi un tie atklāj precīzu atlasīto modeli ID. Atspējotie modeļi, neaktīvi pakalpojumu sniedzēji, trūkstošais modelis IDs, atsevišķas ģimenes un neskaidras alias/prefix atbilstības neizdodas aizvērt. Ieteikumos tiek izmantota esošā `priority` stratēģija, vispirms pasūtot lielāko periodisko mēneša budžetu; UI tos rada tikai caur `POST /api/combos`.

Vadītā UI dzīvo `/dashboard/radar/combos`. Tas nolasa tikai vietējos `GET /api/radar/catalog` un `GET /api/combos/builder/options` galapunktus. Tas nekad neaktivizē radara sinhronizāciju, nenolasa pakalpojumu sniedzēja akreditācijas datus vai neieraksta tieši kombinētajā datu bāzē.

MCP klienti var lasīt to pašu lokālo projekciju ar `omniroute_radar_catalog` (`read:radar`). Izvēles `provider`, `familyId` un `enabledOnly` filtri tiek novērtēti pēc vienas vietējās `GET /api/radar/catalog` nolasīšanas. Tās slēgtajā izvadē ir iekļauti kataloga metadati plus provider/model, parādāmais nosaukums, `familyId`, kvota, iespējas, iespējotais stāvoklis, izcelsme un `disabledBy`; setup URLs, soļi, savienojumi, e-pasta adreses, atslēgas un novirzīšanas dati nekad netiek atgriezti. Šis rīks ir tikai lasāms un nekad neizsauc `/api/radar/sync`. Ja kešatmiņā saglabātā plūsma ir pirms instalētā kataloga, `meta.olderThanRelease` ir `true`, un rīks atgriež modeļus no instalētā kataloga ar vietējiem ignorējumiem un lietotajiem kapakmeņiem.

### Izcelsmes marķieri

Katram apvienotajam ierakstam ir `origin` lauks, ko UI atveido kā emblēmu:

- `"baseline"` — neskarts no statiskā izlaiduma kataloga.
- `"radar"` — viens vai vairāki lauki tika atsvaidzināti ar plūsmu.
- `"local"` — operatoram šim ierakstam ir vismaz viena vietēja ignorēšana (vietējie ignorējumi vienmēr uzvar plūsmu saskaņā ar 1. kārtulu neatkarīgi no plūsmas teiktā).

---

## Lokālās saskarnes — nekad nav plūsmas starpniekserveris

Tālāk norādītās lokālās Radar maršrutu saimes nodrošina lietotāja saskarnes darbību zem `src/app/api/radar/`:

| Maršruts                       | Metode | Mērķis                                                                                                                                 |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Atgriež apvienoto katalogu (`getRadarCatalog()`) no lokālās kešatmiņas.                                                                |
| `/api/radar/sync`              | POST   | Aktivizē `syncRadar()` servera pusē; atgriež iegūto statusu.                                                                           |
| `/api/radar/settings`          | GET    | Atgriež `{ optIn, hasSupporterKey, supporterKeyMasked }` — nekad neatgriež neapstrādāto atslēgu.                                       |
| `/api/radar/settings`          | POST   | Iestata piekrišanu un/vai (šifrēto) atbalstītāja atslēgu.                                                                              |
| `/api/radar/referrals`         | GET    | Atgriež `{ fixed, campaigns, tier }` no lokālās kešatmiņas — skatiet tālāk sadaļu [Novirzīšanas saites](#referral-links-free-credits). |
| `/api/radar/offers`            | GET    | Atgriež aktīvos piedāvājumus no verificētās lokālās aktuālo datu kešatmiņas; nekad neatgriež atbalstītāja atslēgu.                     |
| `/api/radar/offers/sync`       | POST   | Aktivizē servera puses, tikai aktuālajai atslēgai paredzēto `syncRadarOffers()` konveijeru.                                            |
| `/api/radar/intel`             | GET    | Atgriež verificētus lokālos aktuālos Intel datus un atbalstītāja atpazīšanas Būla vērtību; nekad neatgriež identitāti vai atslēgu.     |
| `/api/radar/intel/sync`        | POST   | Aktivizē servera puses, tikai aktuālajai atslēgai paredzēto `syncRadarIntel()` konveijeru.                                             |
| `/api/radar/status`            | GET    | Atgriež tikai lasāmu lokālo iestatījumu/kešatmiņas statusu katalogam, novirzījumiem, piedāvājumiem un Intel bez noslēpumiem.           |
| `/api/radar/sync-all`          | POST   | Palaiž visus četrus servera puses sinhronizācijas moduļus un atgriež atsevišķu statusu katrai plūsmai.                                 |
| `/api/radar/local-model-state` | GET    | Uzskaita saglabātos pārrakstījumus un dzēšanas marķierus rediģēšanas/atjaunošanas vadīklām.                                            |
| `/api/radar/local-model-state` | PATCH  | Iestata vai notīra validētos `displayName`/`enabled` pārrakstīšanas laukus.                                                            |
| `/api/radar/local-model-state` | PUT    | Izveido vai noņem dzēšanas marķieri ar `{ provider, modelId, tombstoned }`.                                                            |
| `/api/radar/local-model-state` | DELETE | Notīra rediģējamos pārrakstīšanas laukus, saglabājot visus dzēšanas marķierus.                                                         |

**Stingrs noteikums: šie maršruti nekad nedarbojas kā plūsmas pakalpojuma starpniekserveris.** Pārlūkprogramma sazinās tikai
ar lokālo OmniRoute serveri. Četri moduļi, kas sazinās ar Radar pakalpojumu, ir
`src/lib/radar/sync.ts` (katalogs), `src/lib/radar/referralsSync.ts` (novirzījumi) un
`src/lib/radar/offersSync.ts` (piedāvājumi), kā arī `src/lib/radar/intelSync.ts` (Intel); tie visi darbojas
servera pusē, nekad klienta pusē. Tādējādi
plūsmas URL un jebkura atbalstītāja atslēga pilnībā tiek paslēpta no klientam redzamās tīkla datplūsmas.

Visi Radar galapunkti atgriež `404`, kad `RADAR_ENABLED` ir izslēgts (skatiet
iepriekš sadaļu [Karodziņš](#flag-radar_enabled-default-off)), un maršrutu kļūdu atbildes tiek apstrādātas, izmantojot
`buildErrorBody()`/`sanitizeErrorMessage()` saskaņā ar visa repozitorija kļūdu sanitizācijas noteikumu
(`docs/security/ERROR_SANITIZATION.md`).

### Autentifikācija

Visiem Radar galapunktiem ir nepieciešama autentifikācija, izmantojot `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — vadības paneļa sesijas sīkdatni vai pārvaldības tvērumam paredzētu
API atslēgu; tā ir tā pati piekļuves pārbaude, kas aizsargā pārējo `/api/settings/*`. Izslēgta karodziņa
`404` pārbaude vienmēr tiek veikta **pirms** autentifikācijas pārbaudes, tāpēc instalācija, kurā `RADAR_ENABLED`
ir izslēgts, saglabājas identiska baitu līmenī (netiek parādīts autentifikācijas pieprasījums tikai tādēļ, lai uzzinātu, ka saskarne nepastāv);
kad karodziņš ir ieslēgts, neautentificēts pieprasījums saņem `401` pirms jebkādas DB lasīšanas vai
rakstīšanas. `GET /api/radar/settings` nekad neatgriež neapstrādāto atbalstītāja atslēgu neatkarīgi no
autentifikācijas stāvokļa — tikai maskēto formu un `hasSupporterKey` Būla vērtību.

---

## Atbalstītāju piedāvājumi

Piedāvājumi izmanto atsevišķu parakstītu artefaktu `GET /v1/offers/latest` un nekad nekoplieto kataloga vai
ieteikumu kešatmiņu. Servera galapunktam ir nepieciešama derīga aktīva atbalstītāja Bearer atslēga; kopienas
atkāpšanās mehānisma nav. Tādēļ `syncRadarOffers()` apstājas pirms tīkla pieprasījuma, ja funkcijas karodziņš ir
izslēgts, operators nav piekritis vai nav konfigurēta atbalstītāja atslēga.

Pēc veiksmīga GET pieprasījuma klients pārbauda Ed25519 parakstu precīzi tām atbildes baitu vērtībām,
validē `RadarOffersFeedSchema`, pieprasa, lai gan parakstītajā pamattekstā, gan
`x-omniroute-feed-tier` galvenē būtu norādīts `live`, pieprasa strikti jaunāku punktētu versiju un tikai pēc tam
atomāri aizstāj `radar_offers_cache` (migrācija `144_radar_offers_cache.sql`). Ir spēkā tas pats 10 MB
galvenes un straumes kopējais ierobežojums, ko izmanto citām plūsmām. Paraksta, shēmas, līmeņa, atkārtošanas, izmēra, HTTP
un tīkla kļūmju gadījumā tiek saglabāta pēdējā verificētā kešatmiņa.

Slēgtā piedāvājuma struktūra atbalsta trīs salīdzināmus ieguvumu veidus: procentuālo vērtību bāzes punktos, kredītu
valūtas mazākajās vienībās vai izmēģinājuma dienas. Partnera piedāvājumā ir jāiekļauj tāda paša veida publiskais bāzes piedāvājums, un
tā ieguvumam jābūt strikti lielākam; oficiālajiem piedāvājumiem partnera bāzes piedāvājuma nav. Vietrāžiem URL jāizmanto
HTTPS, un tajos nedrīkst būt akreditācijas datu. `getRadarOffers()` aizsardzības nolūkos atkārtoti validē kešatmiņā saglabāto datu kopu un filtrē
ierakstus ar beigušos derīguma termiņu katrā lokālajā nolasīšanas reizē; `/dashboard/radar/offers` pirms atveidošanas vēlreiz filtrē ierakstus pēc derīguma termiņa,
izmanto tekstu portugāļu valodā, ja tas ir pieejams, ar atkāpšanos uz angļu valodu, un skaidri marķē partneru piedāvājumus.

Pārlūkprogramma izsauc tikai lokālos maršrutus: tā nolasa maskēto iestatījumu momentuzņēmumu, pieprasa
`POST /api/radar/offers/sync`, lai veiktu servera puses atsvaidzināšanu, un pēc tam nolasa `GET /api/radar/offers`. Ja
atslēgas nav, tā rāda esošās atbalstītāju/atbalsta saites, nevis mēģina veikt plūsmas pieprasījumu. Ārējās
piedāvājumu saites tiek atvērtas jaunā cilnē ar `noopener noreferrer`. Šajā laidienā netiek piedāvāts
`radar_offers` MCP rīks.

---

## Radar Intel, atbalstītāja emblēma un CLI

Intel ir parakstīts artefakts, kas pieejams vietnē `GET /v1/intel/latest`. Slēgtā shēma `RadarIntelFeedSchema` pieņem
tikai Radar piederošus ELO reitingus, kurus privātais kurators ieguvis no apstiprinātiem salīdzinājumiem, un faktiskās
kataloga vecuma/skaita izmaiņas, kas iegūtas no parakstītiem kataloga momentuzņēmumiem. Metodoloģija ir fiksēta: sākotnējais
reitings ir 1000 un K=32. Ja nav apstiprināts neviens salīdzinājums, tukšs reitings ir derīgs; klients
nekad pats tādu neģenerē.

`syncRadarIntel()` izmanto tādu pašu servera puses Bearer autentifikāciju, 30 sekunžu taimautu, 10 MiB straumētu datu ierobežojumu,
precīzo baitu Ed25519 verifikāciju, stingru shēmu, `live` prasību pamattekstam/galvenei, minimālās versijas prasību un
pēdējās derīgās kešatmiņas saglabāšanu kā piedāvājumiem. Kad verificēts aktīvais momentuzņēmums ir saglabāts, klients
atvasina `radar:<sha256(supporter key)>`, saglabā tikai šo vienvirziena identitāti un ģenerē īpašo
`radar_supporter` atzinības notikumu. Tā `radar-supporter` emblēma ir idempotenta un piešķir nulle XP;
tā nekad neatjaunina līderu tabulas un atkārtoti neizmanto `token_share`. `/dashboard/radar/intel` atveido emblēmu
tikai no verificētas lokālās kešatmiņas metadatiem.

CLI nodrošina komandas `omniroute radar status` un `omniroute radar sync`. Abas sazinās tikai ar
lokālo OmniRoute API. `status` veic tikai lasāmu `GET /api/radar/status`; `sync` nosūta vienu
`POST /api/radar/sync-all` un izdrukā rezultātu katrai plūsmai. Neviena no komandām nelasa, nepieņem un neizdrukā
atbalstītāja atslēgu, un neviena tieši nesazinās ar Radar pakalpojumu.

---

## Ieteikumu saites (bezmaksas kredīti)

Ieteikumu saites tiek nodrošinātas no **atsevišķas, vienmēr aktuālas** plūsmas —
`GET /v1/referrals/latest` — atsevišķi no kataloga plūsmas. Tas ir darīts apzināti:
kopienas līmeņa kataloga plūsma ir momentuzņēmums, kas var būt līdz 30 dienām vecs,
tāpēc no tās iegūta ieteikuma saite iepriekš atpalika no servera faktiskā saišu
saraksta par tikpat ilgu laiku (jauns ieteikums bezmaksas/kopienas lietotāju varēja
sasniegt tikai pēc mēneša). Ieteikumu plūsma novērš šo aizkavi, sinhronizējoties
atsevišķi un daudz biežāk.

```ts
// GET /v1/referrals/latest atbildes ķermenis (parakstīts ar Ed25519, tā pati
// piesaistītā atslēga kā kataloga plūsmai):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisks: max(updatedAt) starp ieteikumu
                                  // saitēm, tāpēc divi identiski pieprasījumi rada precīzi
                                  // vienādus parakstītos baitus/parakstu
  referrals: {
    fixed: RadarReferral[],      // pieejams KATRĀ līmenī, tostarp bez autentifikācijas/kopienas līmenī
    campaigns: RadarReferral[],  // aizpildīts tikai derīgai aktīvai (atbalstītāja) Bearer
                                  // atslēgai; pieprasījumi bez autentifikācijas/ar atslēgu, kam beidzies derīgums, saņem []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Atšķirībā no kataloga plūsmas šajā ķermenī vispār nav lauka `tier` — serveris katram
pieprasījumam nosaka, ko iekļaut, pamatojoties uz `Authorization` atslēgu, tāpēc
atbildes galvene `x-omniroute-feed-tier` ir VIENĪGAIS nodrošinātā līmeņa avots
(`referralsSync.ts::syncRadarReferrals`); neesoša vai neatpazīta galvene tiek pazemināta
uz `"community"`, kas ir pieņēmums ar vismazākajām privilēģijām.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) validē visu
ķermeni, atkārtoti izmantojot to pašu katra ieteikuma shēmu `RadarReferralSchema`,
kas eksportēta no `feedSchema.ts`, lai abas plūsmas validētu atsevišķus ieteikumus
identiski. Katram `RadarReferral.url` ir jābūt `https://` — `http://` URL neiztur
shēmas validāciju.

VECĀ kataloga shēmā `RadarFeedSchema` (`feedSchema.ts`) iegultais lauks `referrals`
ir saglabāts atpakaļsaderībai ar jau kešotām kataloga plūsmām, taču
`getRadarReferrals()` to vairs nelasa — skatiet sadaļu [Piekļuves funkcija](#accessor)
tālāk.

### Sinhronizācija

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) ir VIENĪGAIS modulis, kas
ieteikumu vajadzībām izmanto tīklu, precīzi atdarinot `syncRadar()` līgumu: izslēgts
karogs → `disabled`; atteikšanās iestatīta uz false → `opt_out`; lejupielādē
`${RADAR_FEED_URL}/v1/referrals/latest` (tie paši `RADAR_FEED_URL`/
`RADAR_FEED_PUBKEY` atzarojumu pārrakstījumi kā katalogam), verificē Ed25519 parakstu
precīziem atbildes baitiem (`verifyFeedBytes`), validē pret
`RadarReferralsFeedSchema` un kešo tabulā `radar_referrals_cache` (migrācija
`142_radar_referrals_cache.sql`) — tabulā, kas ir pilnībā nodalīta no kataloga
`radar_feed_cache`. 10 MB atbildes ierobežojums un `generatedAt` apakšējā robeža
noraida ienākošu plūsmu, kas ir vecāka par kešoto, tādējādi aizsargājot pret vecāka
parakstīta artefakta atkārtotu atskaņošanu. Vienāds laikspiedols tiek pieņemts:
serveris apzināti piešķir kopienas un aktīvajiem ieteikumu variantiem vienādu,
deterministisku `generatedAt`, lai pēc atbalstītāja atslēgas maiņas parakstītā
lietderīgā slodze un nodrošinātais līmenis varētu mainīties, nemainoties pamatā
esošajai saišu kopai. Nekad neizmet izņēmumu — vienmēr atgriež statusa objektu;
kļūdu laukā `reason` nekad nav steka izsekojuma.

Divi trigeri uztur ieteikumu kešu gatavu lietošanai, un abi ir neatkarīgi no paša
kataloga 24 stundu intervāla:

- **Sinhronizācija lasīšanas laikā** — pats `GET /api/radar/referrals` izsauc
  `syncRadarReferrals()` iekļautā veidā ikreiz, kad keša nav vai tas ir vecāks par
  `REFERRALS_STALE_MS` (1h, `shouldSyncReferralsOnRead()`), pirms atbildes
  nodrošināšanas. Tas padara fiksētās saites „vienmēr aktuālas” jau nākamajā
  informācijas paneļa ielādē, negaidot nevienu fona taimeri.
- **Plānotāja papildu sinhronizācija** — `radarSchedulerTick()` (`scheduler.ts`)
  neatkarīgi novērtē ieteikumu novecojušumu tajā pašā ikstundas ciklā, ko izmanto
  katalogam, un vajadzības gadījumā izsauc `syncRadarReferrals()`. Tas darbojas
  neatkarīgi no tā, vai šajā ciklā bija jāatjaunina pats katalogs, un nekad neietekmē
  `RadarTickResult` formu (tikai labāko centienu blakusefekts, kļūdas tiek ignorētas).

### Piekļuves funkcija

`src/lib/radar/index.ts` eksportē divas tikai lasāmas piekļuves funkcijas, un neviena
no tām neizmet izņēmumus (tas pats aizsardzības līgums kā `getRadarCatalog()` —
izslēgts karogs, neesošs kešs vai bojāta kešotā lietderīgā slodze kļūdas vietā vienmēr
atgriež tukšu struktūru):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lasa no `radar_referrals_cache` (izmantojot `getRadarReferralsCache()`) un validē
  ar `RadarReferralsFeedSchema` — **nevis** kataloga kešu.
- `getDefaultReferralFor(provider)` → `fixed` ieteikums ar `isDefault: true`
  attiecīgajam pakalpojumu sniedzējam vai `null`. Pārbauda tikai `fixed` — kampaņa
  nekad netiek izmantota kā pakalpojumu sniedzēja „noklusējuma” saite.

Faktiskais noteikums, kas nosaka, „kurš ieteikums ir pakalpojumu sniedzēja
noklusējuma ieteikums”, atrodas `findDefaultReferral()`
(`src/lib/radar/referrals.ts`) — nelielā tīrā funkcijā **bez DB importa** — to var
droši importēt `"use client"` komponentā. `getRadarReferrals`/
`getDefaultReferralFor` (failā `index.ts`) importē `@/lib/db/radar`, tāpēc paliek
tikai serverī; pakalpojumu sniedzēju informācijas panelis importē `referrals.ts`
tieši, nevis `index.ts` (skatiet tālāk), lai pārlūkprogrammas komplektā neiekļautu
`better-sqlite3`.

### `GET /api/radar/referrals`

Ievēro tieši tādu pašu pārbaudes secību kā visi pārējie Radar maršruti: `RADAR_ENABLED` izslēgts →
`404` (tiek pārbaudīts vispirms, saglabājot baitu līmenī identisku nemainību); neautentificēts → `401`; pretējā gadījumā,
ja dati ir novecojuši, aktivizē sinhronizāciju lasīšanas laikā (skatiet iepriekš), pēc tam atgriež `200` ar
`{ fixed, campaigns, tier }` — `tier` tiek iegūts tieši no (iespējams, tikko atsvaidzinātās)
kešatmiņas rindas un ir tikai informatīvs (nosaka tālāk aprakstīto UI neuzbāzīgā papildiespēju piedāvājuma tekstu). Nekad
tieši nestarpnieko plūsmas servera pieprasījumus — paša maršruta avota kodā nav neviena `fetch(` izsaukuma;
tīkla saziņa notiek tikai funkcijā `syncRadarReferrals()`, ievērojot to pašu principu, ka tiek izmantota
tikai lokālā kešatmiņa, kā maršrutā `/api/radar/catalog`.

### Informācijas paneļa UI — cilne "Bezmaksas kredīti" lapā `/dashboard/radar`

Atkārtoti izmanto esošo Radar lapu (`src/app/(dashboard)/dashboard/radar/page.tsx`) kā
otro cilni, nevis jaunu maršrutu — tā funkcijai, kas ir jau lapā iegūto datu
variācija, ir mazāka maršrutēšanas/i18n virsma. Pēc izvēles piedalīties ciļņu joslā ir pieejamas
**Katalogs** (esošā tabula) un **Bezmaksas kredīti**:

- Fiksētās saites ir grupētas pēc pakalpojumu sniedzēja, un katrai no tām tiek rādīts `requiredAction` (ja tāds ir)
  un poga ar `target="_blank" rel="noopener noreferrer"`, kas ved uz novirzījuma URL.
- Kampaņām tiek rādīta tā pati informācija, kā arī `validUntil`, ja tas ir norādīts.
- Ja `campaigns` ir tukšs **un** nodrošinātais līmenis ir `community`, UI parāda
  īsu papildiespēju piedāvājuma piezīmi ("ierobežota laika kampaņas ir atbalstītājiem paredzēta papildiespēja") — tā **nekad**
  neslēpj un neierobežo fiksēto saišu sarakstu, kas visos līmeņos paliek pilnībā aizpildīts.
  Papildiespēju piedāvājums ir tikai neuzbāzīgs paziņojums, nevis ierobežojums.

### Novirzījuma saite pakalpojumu sniedzēja nosaukumā (pakalpojumu sniedzēju informācijas panelis)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
jau sasaistīja pakalpojumu sniedzēja nosaukumu ar `providerInfo.website`, ja tas bija pieejams, un tajā
jau bija viens monetizētas saites precedents: Kimi (Moonshot AI) partnera saites piezīme
(`providers.kimiPartnerLinkNote` i18n atslēga). D28 Radar noklusējuma novirzījumiem atkārtoti izmanto tieši šo pašu neuzkrītošās piezīmes
modeli, nevis ievieš jaunu atslēgu.

Apzināti vāja sasaiste:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  ir **tīra** funkcija — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — bez atkarības no `@/lib/radar` vai `@/lib/db/*`. `providerPageUtils.ts` kopumā
  joprojām neietver šos importus (to pārbauda
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (`"use client"` komponents) ir vienīgā vieta, kurai ir atļauts
  iegūt Radar datus — izmantojot `fetch("/api/radar/referrals")`, to pašu lokālā maršruta
  modeli, ko izmanto pati Radar informācijas paneļa lapa — un tas klienta pusē aprēķina noklusējuma novirzījumu,
  izmantojot `findDefaultReferral()` no datubāzes neatkarīgajā `src/lib/radar/referrals.ts`.
- Ja `RADAR_ENABLED` ir izslēgts, pieprasījums saņem 404, `referralUrl` paliek `null`, un
  `resolveProviderHeaderLink()` atgriež statisko kataloga `website` bez izmaiņām — pakalpojumu sniedzēja
  lapa baitu līmenī ir identiska tai, kāda tā bija pirms šīs funkcijas ieviešanas. Tāds pats rezultāts ir tad, ja
  kešatmiņas vēl nav vai konkrētajam pakalpojumu sniedzējam nav noklusējuma novirzījuma.
- Ja noklusējuma novirzījums ir piemērojams, `ProviderPageHeader` saņem `isReferralLink`
  un parāda tādu pašu neuzkrītošu piezīmi/rīka padomu kā Kimi partnera saitei (atkārtoti izmantojot
  `providers.kimiPartnerLinkNote` atslēgu) — nekad neizmantojot jaunu, atšķirīgu vizuālo noformējumu.

---

## Kā pašmitināt plūsmu

Atzarojums vai pašmitinātājs, kas vēlas pilnībā kontrolēt katalogu, var darbināt savu plūsmas
pakalpojumu, nemainot klienta kodu:

1. Nodrošiniet `GET /v1/catalog/latest` galapunktu, kas atgriež JSON pamattekstu, kurš atbilst
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — augšējā līmeņa `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` un `totals`. Ievērojiet `x-omniroute-radar-schema: 2`; ar pārejas periodu saderīgam serverim
   pieprasījumiem bez šīs galvenes pēc noklusējuma jāatgriež atsevišķi parakstīts v1 artefakts.
2. Parakstiet precīzos atbildes baitus ar Ed25519 atslēgu pāri un atgrieziet base64
   parakstu atbildes galvenē `x-omniroute-feed-signature`.
3. Iestatiet `RADAR_FEED_URL` uz jauno bāzes URL un `RADAR_FEED_PUBKEY` uz atbilstošo
   publisko atslēgu (base64-DER SPKI vai PEM) — skatiet
   [vides mainīgo atsauci](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Iespējojiet `RADAR_ENABLED` un piesakieties, izmantojot `POST /api/radar/settings`
   (`{ optIn: true }`).

Citas koda izmaiņas nav nepieciešamas — `verifyFeedBytes()` automātiski izmanto
pārrakstīto vērtību (`getFeedPublicKeys()` failā `src/lib/radar/pinnedKeys.ts`), un versiju
salīdzināšana, shēmas validācija un sapludināšanas kārtulas pašmitinātai
plūsmai tiek piemērotas identiski.

Novirzīšanas saites (skatiet iepriekš sadaļu [Novirzīšanas saites (bezmaksas kredīti)](#referral-links-free-credits))
ir atsevišķs, neobligāts artefakts: atzarojums, kas nodrošina tikai `/v1/catalog/latest`,
joprojām darbojas pilnvērtīgi — saņemot `404` no `/v1/referrals/latest`,
`syncRadarReferrals()` atgriež `{ status: "error" }`, un kešatmiņa vienkārši paliek tukša, tādēļ
`GET /api/radar/referrals` turpina atgriezt `{ fixed: [], campaigns: [], tier: null }`,
neizraisot pārējās lapas darbības kļūmi. Lai piedāvātu arī novirzīšanas saites, nodrošiniet
`GET /v1/referrals/latest`, kas atbilst `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`), un parakstiet to ar to pašu Ed25519 atslēgu pāri, ko
izmanto kataloga plūsmai.

Atbalstītāju piedāvājumi ir vēl viens neobligāts artefakts. Lai tos nodrošinātu, ieviesiet
`GET /v1/offers/latest` ar slēgto `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), pieprasiet aktīvas piekļuves tiesības, atgrieziet
`x-omniroute-feed-tier: live` un parakstiet precīzos baitus ar to pašu atslēgu. Atzarojumā, kurā šī
galapunkta nav, kataloga un novirzīšanas saišu darbība nemainās; piedāvājumu atsvaidzināšana beidzas
bez datu zaudēšanas, un pēdējā verificētā lokālā piedāvājumu kešatmiņa joprojām ir pieejama.

Intel tādā pašā veidā ir neobligāts. Pašmitinātājs var nodrošināt `GET /v1/intel/latest`, izmantojot
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), pieprasīt aktīvas piekļuves tiesības, atgriezt
`x-omniroute-feed-tier: live` un parakstīt precīzos baitus ar kopīgoto Ed25519 atslēgu. Galapunkta
nenodrošināšana neietekmē katalogu, novirzīšanas saites un piedāvājumus; Intel atsvaidzināšana saglabā
pēdējo verificēto lokālo momentuzņēmumu, ja tāds ir.

---

## Saistītā dokumentācija

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — kļūdu
  atbilžu modelis, ko izmanto `/api/radar/*` maršruti.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` atsauce.
