# CORS Configuration & Security (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontroliuoja, kuris **naršyklės kilmė** gali skaityti įvairių šaltinių atsakymus iš vieno centralizuoto leidžiamųjų sąrašo. Modelis yra **pagal numatytuosius nustatymus nepavyko uždaryti** : jokia kilmė neleidžiama, kol nepasirinkote. Šiame puslapyje aprašoma, kaip išsprendžiamas leidžiamųjų sąrašas, ką iš tikrųjų atskleidžia `CORS_ALLOW_ALL=true` (ir, svarbiausia, ką jis daro **ne** ), kaip saugiai konfigūruoti dev vs production, o vykdymo laiko įspėjimas prietaisų skydelyje rodomas, kai veikia pakaitos simbolis.

**Tiesos šaltinis:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Leidžiamas sąrašas taikomas vieną kartą, tarpinėje programinėje įrangoje (`src/server/authz/pipeline.ts`) — maršruto tvarkytojai patys nenustato `Access-Control-Allow-Origin`.

## Kaip išsprendžiama kilmė

Kiekvienai užklausai tarpinė programinė įranga apskaičiuoja `Access-Control-Allow-Origin` reikšmę tokia tvarka:

1. **`CORS_ALLOW_ALL=true`** (arba senasis `CORS_ORIGIN=*`) → atkartoja skambinančiojo `Origin` (arba `*`, kai nėra `Origin` antraštės) su `Vary: Origin`, todėl talpyklos išliks teisingos. Tas pats `applyCorsHeaders()` droselio taškas taip pat prideda `Vary: Accept-Encoding` prie kiekvieno 2xx-su kūnu atsako žetonu autentifikuotame `/v1*`/`/v1beta*` paviršiuje (`relaxForTokenAuth`, RFC 9110 §12.5.5, #6737 leidimas ), todėl downstream/shared talpyklos gali teisingai atskirti suglaudintus ir nesuglaudintus variantus.
2. Kitu atveju užklausa `Origin` normalizuojama (mažosios raidės, galinis pasvirasis brūkšnys pašalinamas) ir suderinama su **sujungtas leidimų sąrašas** :
   - env **`CORS_ALLOWED_ORIGINS`** — kableliais atskirtas sąrašas ir
   - vykdymo laikas **`corsOrigins`** nustatymas (Dashboard → Security → _CORS Allowed Origins_), įpurškiamas per `setRuntimeAllowedOrigins()` iš `src/lib/config/runtimeSettings.ts`.
3. Nėra atitikimo →**neskleidžiama `Access-Control-Allow-Origin` antraštė** . Naršyklė blokuoja kryžminės kilmės skaitymą. Tai numatytasis numatytasis nesėkmingo uždarymo režimas.

| Env var                | Reikšmė                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Tikslios kilmės CSV leisti (rekomenduojama).                                             |
| `CORS_ALLOW_ALL`       | `true`/`1` → atkartoja bet kokią kilmę (pakaitalas). Tik kūrėjas.                        |
| `CORS_ORIGIN`          | Palikimas. `*` elgiasi kaip `CORS_ALLOW_ALL`; į leidimų sąrašą įtraukiama viena reikšmė. |

## Grėsmės modelis —, ką `CORS_ALLOW_ALL=true` iš tikrųjų atskleidžia

Į bendrąjį OWASP įspėjimą („pakeistinė raidė CORS = bet kuri svetainė gali vadinti jūsų API“) verta žiūrėti rimtai, tačiau OmniRoute parodymas **siauresnis nei bendrasis atvejis** , dėl vieno konkretaus įgyvendinimo fakto:

> **Centrinis `applyCorsHeaders()` niekada neskleidžia `Access-Control-Allow-Credentials`.** Naršyklė nepateiks _credentialed_ (slapukus turinčio) kryžminės kilmės atsakymo, nebent serveris atsiųs `Access-Control-Allow-Credentials: true`. OmniRoute bendras CORS kelias niekada neveikia.

Ką tai reiškia vienam paviršiui, net naudojant `CORS_ALLOW_ALL=true`:

| Paviršius                                | Auth mechanizmas               | Pakaitos simbolio CORS poveikis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prietaisų skydelis / MANAGEMENT `/api/*` | Slapukų seansas                | Kilmė aidi, bet **be `Allow-Credentials`** naršyklę **blokai** perskaitė kredencialas. Kenkėjiška kelios kilmės svetainė **negali skaityti** autentifikuotų prietaisų skydelio atsakymų, o seanso slapukas neatskleidžiamas.                                                                                                                                                                                                                                                                                                              |
| Klientas API `/v1/*`, `/v1beta/*`        | Nešyklė / `x-api-key` antraštė | Jau leistinas **pagal dizainą** (`relaxForTokenAuth`): naršyklės niekada automatiškai neprideda `Authorization`/`x-api-key`, todėl užpuoliko puslapis negali pateikti jūsų rakto. Atsipalaidavęs aidas reikalauja autentifikuoto subjekto (patvirtinto API rakto arba prietaisų skydelio seanso), o ne tik kredencialų antraštės ir niekada neapima `Access-Control-Allow-Credentials`. Anoniminiai atsakymai (`REQUIRE_API_KEY=false`) naudoja sukonfigūruotą kilmės leistinų sąrašą, įskaitant aiškų `CORS_ALLOW_ALL=true` pasirinkimą. |
| Viešas tik skaitomas (`/api/health`,…)   | Nėra                           | Nejautri; pakaitos simbolis yra nekenksmingas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Taigi,**likutinis** `CORS_ALLOW_ALL=true` poveikis apsiriboja: (a) neįrodyta kryžmine kilme **skaito** jau neautentifikuotų duomenų ir (b) leisti CORS**leidimas prieš skrydį** valdymo maršrutuose —, kuriems vis tiek reikalingas autentifikavimas, kurio negali pateikti įvairios kilmės puslapis. Tai yra **ne** seanso užgrobimo arba kredencialų vagystės vektorius bendrame CORS kelyje.

### Viena tikra išimtis — `/api/v1/agents/`

„Cloud-Agent“ maršrutai (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nustato juos **savo** CORS antraštės (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ir **daryti** skleidžia `Access-Control-Allow-Origin: <origin>|*` kartu su `Access-Control-Allow-Credentials: true`. Tai yra vienintelis paviršius, kuriame kartu egzistuoja kilmė, aidas ir kredencialai, ir taip yra **nepriklausomas nuo `CORS_ALLOW_ALL`** . Šie maršrutai yra valdymo autentifikuoti (`requireManagementAuth`); operatoriai, kurie atskleidžia prietaisų skydelį ne priegloboje, turėtų žinoti, kad tai yra ta vieta, kurioje atsakymų antraštėse leidžiama skaityti kryžminės kilmės kredencialus. Priveržimas į aiškų leistinų sąrašą stebimas atskirai nuo šių CORS gairių.

## Gamybos kontrolinis sąrašas

- **Niekada nenustatykite `CORS_ALLOW_ALL=true` gamyboje.** Palikite nenustatytą.
- Nustatyti an **aiškus** kilmės sąrašas — arba env var, arba skirtuko Sauga laukas:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jei OmniRoute veikia už atvirkštinio tarpinio serverio / tunelio (nginx, Caddy, Cloudflare tunelis, Tailscale), CORS yra **ne** jūsų vienintelis valdiklis — atgalinio maršruto apsauga vis tiek apsaugo maršrutus, kuriuose gali atsirasti neršimas (žr. [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Neklastokite `X-Forwarded-For: 127.0.0.1`, kad „sutaisytų“ 403; kad vėl atidaroma RCE klasė, maršruto apsauga užsidaro.
- Patvirtinkite vykdymo būseną: prietaisų skydelyje rodoma a **patvari gintaro vėliava** Prietaisų skydelyje → sauga → autorizacijos inventorius, kai `CORS_ALLOW_ALL=true` veikia, ir `/api/settings/authz-inventory` grąžina `cors: { allowAll, allowedOrigins }` voko stebėjimo priemones, kurias gali apklausti.

## Plėtros patogumas — leidžia konkrečią vietinę kilmę

Pakaitos simbolio jums retai reikia net dev. Leisti tik jūsų naudojamiems kūrėjų serveriams:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ištakos derinamos neskiriant didžiųjų ir mažųjų raidžių, o pasvirasis brūkšnys ignoruojamas, todėl `http://localhost:3000` ir `http://localhost:3000/` yra lygiaverčiai. Tą patį CSV galima nustatyti vykdymo metu **Prietaisų skydelis → sauga → CORS Leidžiama kilmė** be pakartotinio paleidimo.

## API raktai ir slapukų seansai

- **Nešiklis / `x-api-key` ( `/v1/*` išvadinis paviršius):** naršyklės niekada jų neprideda automatiškai. CORS čia nėra prasminga kliūtis. — API raktas yra — kliūtis, todėl šis paviršius yra sąmoningai leistinas, todėl naršyklės ir Electron klientai gali skaityti atsakymus, į kuriuos jie jau turi teisę. Atsipalaidavęs aidas reikalauja autentifikuoto subjekto (patvirtinto API rakto arba prietaisų skydelio seanso), o ne tik kredencialų antraštės ir niekada neapima `Access-Control-Allow-Credentials`. Anoniminiuose atsakymuose (`REQUIRE_API_KEY=false`) naudojamas sukonfigūruotas kilmės leistinas sąrašas, įskaitant aiškų `CORS_ALLOW_ALL=true` pasirinkimą. Auth atmetimai (401) lieka nuskaitomi, kad klientai galėtų parodyti atšauktą arba klaidingai įvestą raktą (#5242): paties dujotiekio 401 išlaiko aidą ir maršrutą, kuris atsisako paties rakto po to, kai dujotiekis jį naudojo kaip anoniminį (`/v1/models` ir `/v1beta/models` su sukonfigūruota valdymo autentifikacija, savininko aprėptis `/v1/files`, `/v1/batches` `/v1/media`, `/v1/session-leases`, kandidatų maršrutai) prideda aidą prie to 401 per `credentialRejectionHeaders()`. Aidas įvedamas užklausoje, turinčioje kredencialų antraštę (`Authorization`, `x-api-key`, `x-goog-api-key` arba `auth_token` slapuką), o ne kuriame iš jų buvo patikrintas maršrutas, ir niekada nėra susietas su `Access-Control-Allow-Credentials`; korpusas yra fiksuotas klaidų apvalkalas. Valdymo maršrutuose pagal `/api/v1/` saugomus `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), ši kredencialų atmetimo išimtis nenaudojama: naudojant `REQUIRE_API_KEY=false`, jų 401/403 atsakymai atitinka sukonfigūruotą CORS kilmės politiką.
- **Slapukų sesija (prietaisų skydelis):** apsaugotas pagal nutylėjimą **ir** nesant `Access-Control-Allow-Credentials` bendrame kelyje. Saugokite management/dashboard pradžią nuo bet kokios leidžiamos konfigūracijos; jie turi likti tiksliai uždaryti.

## WebSocket rankos paspaudimai (`/v1/responses`, `/v1/ws`)

Naršyklės netaiko CORS į WebSocket, todėl WebSocket transportavimas, kuris grąžina išvados išvestį, tikrina pačius rankos paspaudimus `Origin` (`src/server/origin/wsOrigin.ts`): atsakus WebSocket (`/v1/responses`) ir, kai OmniRoute eina per `npm start` / `npm run dev`, `/v1/ws` ir `/api/v1/ws` tiltą, kuris perduoda `/v1/chat/completions` `/v1/messages` ir `/v1/responses`, kaip ZQs. Tiltas prašo `/api/v1/ws?handshake=1` nuosprendžio ir atsisako atnaujinti, nebent šis maršrutas būtų patikrintas. Autentifikavimo reikalavimai vis tiek taikomi atskirai. Kilmės patikrinimas praeina, kai:

- jis neturi `Origin` antraštės (Codex CLI, SDKs ir kiti ne naršyklės klientai);
- `Origin` leidžiamas aukščiau pateiktame leidimų sąraše (`CORS_ALLOWED_ORIGINS`, `corsOrigins` nustatymas, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` yra viena iš OmniRoute viešųjų šaltinių (sukonfigūruota viešoji bazė URL, patikimo tarpinio serverio persiųsta kilmė arba tiesioginis loopback/LAN prieglobas, pateiktas kaip IP literal arba `localhost` — tie patys kandidatai, kuriuos naudoja prietaisų skydelio mutacijų patikra); arba
- jis turi galiojantį API raktą, kaip ir ant HTTP `/v1/*` paviršiaus.

Visa kita gauna `403 ws_origin_forbidden`. Prietaisų skydelio seanso slapukas neatleidžia nuo svetimo `Origin`, nes naršyklė prideda jį prie bet kurio puslapio lizdo. `localhost` kitame prievade nėra traktuojamas kaip tos pačios kilmės; pridėkite tokias kūrėjo ištakas prie `CORS_ALLOWED_ORIGINS`.

## Pavyzdys: atvirkštinis tarpinis serveris prieš OmniRoute

CORS vykdo pats OmniRoute, todėl tarpinis serveris paprastai turėtų **ne** pridėti arba perrašyti `Access-Control-*` antraštes (dvigubos antraštės pažeidžia naršykles). Nutraukite TLS ir persiųskite — leiskite OmniRoute atsakyti prieš patikrinimą:

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

Leidžiamas naršyklės kilmes nustatykite OmniRoute (`CORS_ALLOWED_ORIGINS` arba skirtuke Sauga), o ne tarpiniame serveryje.

## Šaltinio failai

| Susirūpinimas                                                  | Failas                                                               |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| Leidžiamų sąrašo rezoliucija + `getCorsStatus()`               | `src/server/cors/origins.ts`                                         |
| Tarpinės programinės įrangos programa (vienas tiesos šaltinis) | `src/server/authz/pipeline.ts`                                       |
| Nustatymai → vykdymo laiko kilmės įterpimas                    | `src/lib/config/runtimeSettings.ts`                                  |
| Informacijos suvestinės vykdymo būsena                         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Prietaisų skydelio įspėjimo reklamjuostė                       | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS leistinos kilmės laukas                                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| „Cloud-Agent“ vienam maršrutui CORS (išimtis)                  | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket rankos paspaudimas `Origin` patikrinimas             | `src/server/origin/wsOrigin.ts`                                      |

## Taip pat žr

- [„Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback“ vykdymas maršrutams, kuriuose gali atsirasti neršimas (atskiras, papildomas valdymas).
- [Autorizacijos vadovas](../architecture/AUTHZ_GUIDE.md) — visą autentifikavimo vamzdyną.
