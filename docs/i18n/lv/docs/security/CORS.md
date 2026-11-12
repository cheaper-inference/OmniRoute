# CORS Configuration & Security (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrolē, kuras **pārlūkprogrammas izcelsme** var lasīt vairāku izcelsmju atbildes no viena centralizēta atļauju saraksta. Modelis ir **pēc noklusējuma ir aizvērts** : izcelsme nav atļauta, kamēr neesat to izvēlējies. Šajā lapā ir norādīts, kā atļaušanas saraksts tiek atrisināts, ko `CORS_ALLOW_ALL=true` faktiski atklāj (un, kas ir svarīgi, ko tas dara **nē** ), kā droši konfigurēt dev vs production, un izpildlaika brīdinājums informācijas panelī parāda, kad ir aktivizēta aizstājējzīme.

**Patiesības avots:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Atļaušanas saraksts tiek lietots vienreiz, starpprogrammatūrā (`src/server/authz/pipeline.ts`) — maršruta apstrādātāji paši neiestata `Access-Control-Allow-Origin`.

## Kā tiek atrisināta izcelsme

Katram pieprasījumam starpprogrammatūra aprēķina `Access-Control-Allow-Origin` vērtību šādā secībā:

1. **`CORS_ALLOW_ALL=true`** (vai mantotais `CORS_ORIGIN=*`) → atbalso zvanītāja `Origin` atpakaļ (vai `*`, ja nav `Origin` galvenes), izmantojot `Vary: Origin`, lai kešatmiņas paliktu pareizas. Tas pats `applyCorsHeaders()` droseles punkts arī pievieno `Vary: Accept-Encoding` katrai 2xx-ar ķermeni atbildei uz marķiera autentificētas `/v1*`/`/v1beta*` virsmas (`relaxForTokenAuth`, RFC 9110 §12.5.5, #6737 izdevums ), tāpēc downstream/shared kešatmiņas var pareizi atšķirt saspiestos un nesaspiestos variantus.
2. Pretējā gadījumā pieprasījums `Origin` tiek normalizēts (ar mazajiem burtiem, beigu slīpsvītra ir noņemta) un saskaņota ar **apvienots atļauju saraksts** :
   - env **`CORS_ALLOWED_ORIGINS`** — ar komatiem atdalīts saraksts un
   - izpildlaiks **`corsOrigins`** iestatījums (Dashboard → Security → _CORS Allowed Origins_), kas ievadīts, izmantojot `setRuntimeAllowedOrigins()` no `src/lib/config/runtimeSettings.ts`.
3. Nav atbilstības →**`Access-Control-Allow-Origin` galvene netiek izvadīta** . Pārlūkprogramma bloķē pārrobežu izcelsmes lasīšanu. Šis ir paredzētais kļūmju aizvēršanas noklusējuma iestatījums.

| Env var                | Nozīme                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Precīzas izcelsmes CSV, lai atļautu (ieteicams).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → atbalso jebkuru izcelsmi (aizstājējzīme). Tikai izstrādātājs.                      |
| `CORS_ORIGIN`          | Mantojums. `*` uzvedas kā `CORS_ALLOW_ALL`; atļaušanas sarakstam tiek pievienota viena vērtība. |

## Draudi modelis —, ko `CORS_ALLOW_ALL=true` patiešām atklāj

Vispārīgo OWASP brīdinājumu ("aizstājējzīme CORS = jebkura vietne var saukt par jūsu API") ir vērts uztvert nopietni, taču OmniRoute iedarbība ir **šaurāks nekā vispārīgais gadījums** , viena konkrēta īstenošanas fakta dēļ:

> **Centrālā `applyCorsHeaders()` nekad neizstaro `Access-Control-Allow-Credentials`.** Pārlūkprogramma neatklās _credentialed_ (sīkfailu saturošu) vairāku izcelsmes atbildi, ja vien serveris nenosūtīs `Access-Control-Allow-Credentials: true`. OmniRoute kopīgais CORS ceļš nekad neder.

Ko tas nozīmē uz virsmu, pat ar `CORS_ALLOW_ALL=true`:

| Virsma                                     | Autentifikācijas mehānisms      | Aizstājējzīmes CORS efekts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Informācijas panelis / MANAGEMENT `/api/*` | Sīkdatņu sesija                 | Izcelsme tiek piebalsota, bet **bez `Allow-Credentials`** pārlūkprogrammā **bloki** nolasīja akreditācijas datus. Ļaunprātīga vairāku izcelsmes vietne **nevar lasīt** jūsu autentificētās informācijas paneļa atbildes, un sesijas sīkfails netiek atklāts.                                                                                                                                                                                                                                                                                                              |
| Klients API `/v1/*`, `/v1beta/*`           | Uzrādītājs/ `x-api-key` galvene | Jau visatļauts **pēc dizaina** (`relaxForTokenAuth`): pārlūkprogrammas nekad automātiski nepievieno `Authorization`/`x-api-key`, tāpēc uzbrucēja lapa nevar nodrošināt jūsu atslēgu. Atslābinātai atbalss nodrošināšanai ir nepieciešams autentificēts subjekts (validēta API atslēga vai informācijas paneļa sesija), nevis tikai akreditācijas datu galvene, un tas nekad neietver `Access-Control-Allow-Credentials`. Anonīmās atbildēs (`REQUIRE_API_KEY=false`) tiek izmantots konfigurēts izcelsmes atļauju saraksts, tostarp skaidra `CORS_ALLOW_ALL=true` izvēle. |
| Publisks tikai lasāms (`/api/health`,…)    | Nav                             | Nejutīgs; aizstājējzīme ir nekaitīga.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Tātad **atlikums** `CORS_ALLOW_ALL=true` iedarbība ir ierobežota līdz: (a) neakreditētai savstarpējai izcelsmei **skan** no jau neautentificētiem datiem, un (b) ļaujot CORS**pirmslidojuma caurlaide** pārvaldības maršrutos —, kuriem joprojām ir nepieciešama autentifikācija, ko nevar nodrošināt savstarpējas izcelsmes lapa. Tā ir **nē** sesijas nolaupīšanas vai akreditācijas datu nozagšanas vektors koplietotajā CORS ceļā.

### Viens īsts izņēmums — `/api/v1/agents/`

Cloud-Agent maršruti (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) iestata savus **pašu** CORS galvenes (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) un **darīt** izstaro `Access-Control-Allow-Origin: <origin>|*` kopā ar `Access-Control-Allow-Credentials: true`. Šī ir vienīgā virsma, kur līdzās pastāv izcelsme, atbalss un akreditācijas dati, un tā arī ir **neatkarīgi no `CORS_ALLOW_ALL`** . Šie maršruti ir pārvaldības autentificēti (`requireManagementAuth`); operatoriem, kuri atklāj informācijas paneli ārpus saimniekdatora, ir jāapzinās, ka šī ir vieta, kur atbildes galvenes atļauj nolasīt vairāku izcelsmju akreditācijas datus. Pievilkšana līdz skaidram atļaušanas sarakstam tiek izsekota atsevišķi no šīm CORS vadlīnijām.

## Ražošanas kontrolsaraksts

- **Nekad neiestatiet `CORS_ALLOW_ALL=true` ražošanā.** Atstājiet to nenoregulētu.
- Iestatiet an **nepārprotami** izcelsmes saraksts — vai nu env var, vai cilnes Drošība lauks:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ja OmniRoute darbojas aiz apgrieztā starpniekservera/tuneļa (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS ir **nē** jūsu vienīgā vadība — cilpas maršruta aizsargs joprojām aizsargā maršrutus, kas spēj radīt nārsta spēju (skatiet [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Neveidojiet `X-Forwarded-For: 127.0.0.1`, lai "labotu" 403; kas no jauna atver RCE klasi, maršruta aizsargs aizveras.
- Apstipriniet izpildlaika stāvokli: informācijas panelī tiek rādīts a **noturīgs dzintara baneris** zem informācijas paneļa → drošība → autorizācijas inventārs ikreiz, kad `CORS_ALLOW_ALL=true` ir tiešsaitē, un `/api/settings/authz-inventory` atgriež `cors: { allowAll, allowedOrigins }` aploksnes pārraudzības rīkus, ko var aptaujāt.

## Attīstības ērtība — pieļauj konkrētu vietējo izcelsmi

Aizstājējzīme ir reti nepieciešama pat dev. Atļaujiet tikai jūsu izmantotajiem izstrādātāju serveriem:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izcelsme tiek saskaņota ar reģistru nejutīgu, bet beigu slīpsvītra tiek ignorēta, tāpēc `http://localhost:3000` un `http://localhost:3000/` ir līdzvērtīgi. To pašu CSV var iestatīt izpildlaikā **Informācijas panelis → Drošība → CORS Atļautā izcelsme** bez restartēšanas.

## API atslēgas pret sīkfailu sesijām

- **Nesējs / `x-api-key` ( `/v1/*` secinājuma virsma):** pārlūkprogrammas nekad tos nepievieno automātiski. CORS šeit nav nozīmīgs šķērslis. — API atslēga ir barjera —, tāpēc šī virsma ir apzināti pieļaujama, lai pārlūkprogrammas un Electron klienti varētu lasīt atbildes, uz kurām viņiem jau ir tiesības. Atslābinātai atbalss nodrošināšanai ir nepieciešams autentificēts subjekts (validēta API atslēga vai informācijas paneļa sesija), nevis tikai akreditācijas datu galvene, un tas nekad neietver `Access-Control-Allow-Credentials`. Anonīmās atbildēs (`REQUIRE_API_KEY=false`) tiek izmantots konfigurēts izcelsmes atļauju saraksts, tostarp skaidra `CORS_ALLOW_ALL=true` izvēle. Autentifikācijas noraidījumi (401) paliek nolasāmi, lai klienti varētu parādīt atsauktu vai nepareizi ievadītu atslēgu (#5242): konveijera 401 saglabā atbalsi un maršrutu, kas atsaka pašu atslēgu pēc tam, kad konveijera to izmantoja kā anonīmu (`/v1/models` un `/v1beta/models` ar konfigurētu pārvaldības autentifikāciju, īpašnieka tvēruma `/v1/files` un `/v1/media` `/v1/batches` `/v1/session-leases` -bo kandidātu maršruti) pievieno atbalsi šim 401, izmantojot `credentialRejectionHeaders()`. Atbalss tiek ievadīta pieprasījumam ar akreditācijas datu galveni (`Authorization`, `x-api-key`, `x-goog-api-key` vai `auth_token` sīkfailu), nevis tam, kurā no tiem maršruts ir pārbaudīts, un tas nekad nav savienots pārī ar `Access-Control-Allow-Credentials`; korpuss ir fiksēts kļūdu apvalks. Pārvaldības maršrutos saskaņā ar `/api/v1/`, ko apsargā `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), šis akreditācijas datu noraidīšanas izņēmums netiek izmantots: `REQUIRE_API_KEY=false` gadījumā to 401/403 atbildes atbilst konfigurētajai CORS izcelsmes politikai.
- **Sīkfailu sesija (informācijas panelis):** aizsargāts ar neveiksmes aizvēršanas noklusējuma iestatījumu **un** `Access-Control-Allow-Credentials` neesamības dēļ kopīgajā ceļā. Neļaujiet management/dashboard izcelsmei iekļūt jebkādā pieļaujamā konfigurācijā; tiem jāpaliek precīzi aizvērtiem.

## WebSocket rokasspiedieni (`/v1/responses`, `/v1/ws`)

Pārlūkprogrammas nepiemēro CORS uz WebSocket, tāpēc WebSocket transports, kas atgriež secinājumu izvadi, pārbauda paši rokasspiedienu `Origin` (`src/server/origin/wsOrigin.ts`): atbildes WebSocket (`/v1/responses`) un, kad OmniRoute iet caur `npm start` / `npm run dev`, `/v1/ws` un `/api/v1/ws` tiltu, kas straumē `/v1/chat/completions` un `/v1/messages` kā `/v1/responses`. Tilts pieprasa `/api/v1/ws?handshake=1` spriedumu un atsakās jaunināt, ja vien šis maršruts nav pārbaudīts. Autentifikācijas prasības joprojām tiek piemērotas atsevišķi. Izcelsmes pārbaude iziet, ja:

- tai nav `Origin` galvenes (Codex CLI, SDKs un citi klienti, kas nav pārlūkprogrammas);
- `Origin` ir atļauta iepriekš minētajā atļaušanas sarakstā (`CORS_ALLOWED_ORIGINS`, `corsOrigins` iestatījums, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` ir viena no paša OmniRoute publiskajām izcelsmēm (konfigurēta publiskā bāze URL, uzticama starpniekservera pārsūtītā izcelsme vai tiešais loopback/LAN resursdators, kas norādīts kā IP literāls vai `localhost` — tie paši kandidāti, kurus izmanto informācijas paneļa mutāciju pārbaude); vai
- tam ir derīga API atslēga, tāpat kā uz HTTP `/v1/*` virsmas.

Jebkas cits saņem `403 ws_origin_forbidden`. Informācijas paneļa sesijas sīkfails neatbrīvo svešu `Origin`, jo pārlūkprogramma to pievieno jebkurai lapas ligzdai. `localhost` citā ostā netiek uzskatīts par vienas izcelsmes; pievienot šādas izstrādātāja izcelsmes `CORS_ALLOWED_ORIGINS`.

## Piemērs: apgrieztais starpniekserveris pirms OmniRoute

CORS īsteno pats OmniRoute, tāpēc starpniekserveram parasti tas ir jādara **nē** pievienot vai pārrakstīt `Access-Control-*` galvenes (dubultās galvenes pārtrauc pārlūkprogrammas). Pārtraukt TLS un pārsūtīt —, lai OmniRoute atbildētu pirms lidojuma:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Iestatiet atļauto pārlūkprogrammas izcelsmi OmniRoute (`CORS_ALLOWED_ORIGINS` vai cilnē Drošība), nevis starpniekserverī.

## Avota faili

| Bažas                                                          | Fails                                                                |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| Atļauju saraksta izšķirtspēja + `getCorsStatus()`              | `src/server/cors/origins.ts`                                         |
| Starpprogrammatūras lietojumprogramma (viens patiesības avots) | `src/server/authz/pipeline.ts`                                       |
| Iestatījumi → izpildlaika sākuma injekcija                     | `src/lib/config/runtimeSettings.ts`                                  |
| Informācijas paneļa izpildlaika statuss                        | `src/app/api/settings/authz-inventory/route.ts`                      |
| Informācijas paneļa brīdinājuma reklāmkarogs                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS atļautās izcelsmes lauks                                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent katram maršrutam CORS (izņēmums)                   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket rokasspiediena `Origin` pārbaude                     | `src/server/origin/wsOrigin.ts`                                      |

## Skatīt arī

- [Maršruta apsardzes līmeņu](./ROUTE_GUARD_TIERS.md) — cilpas izpilde maršrutiem ar nārsta spēju (atsevišķa papildu kontrole).
- [Autorizācijas rokasgrāmata](../architecture/AUTHZ_GUIDE.md) — pilnā autentifikācijas konveijera.
