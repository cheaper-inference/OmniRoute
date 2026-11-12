# CORS Configuration & Security (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrollib, millised **brauseri päritolu** võib lugeda päritoluüleseid vastuseid ühest tsentraliseeritud lubade loendist. Mudel on **vaikimisi tõrkesuletud** : ükski päritolu pole lubatud enne, kui olete selle lubanud. Sellel lehel kirjeldatakse, kuidas lubade loend lahendatakse, mida `CORS_ALLOW_ALL=true` tegelikult paljastab (ja mis kõige tähtsam, mida see teeb **mitte** ), kuidas dev vs tootmine ohutult konfigureerida, ja armatuurlaua käitusaja hoiatus näitab, kui metamärk on aktiivne.

**Tõe allikas:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Lubatud loendit rakendatakse üks kord, vahevaras (`src/server/authz/pipeline.ts`) — -i marsruudihaldurid ei määra ise `Access-Control-Allow-Origin`.

## Kuidas päritolu lahendatakse

Vahevara arvutab iga päringu jaoks `Access-Control-Allow-Origin` väärtuse järgmises järjekorras:

1. **`CORS_ALLOW_ALL=true`** (või pärand `CORS_ORIGIN=*`) → kordab helistaja `Origin` tagasi (või `*`, kui `Origin` päist pole), koos `Vary: Origin`, nii et vahemälud jäävad õigeks. Sama `applyCorsHeaders()` chokepoint lisab `Vary: Accept-Encoding` ka igale 2xx-kehaga vastusele märgiga autentitud `/v1*`/`/v1beta*` pinnal (`relaxForTokenAuth`, RFC 9110 §12.5.5, väljaanne #6737), nii et downstream/shared vahemälud suudavad tihendatud ja tihendamata variante õigesti eristada.
2. Vastasel juhul normaliseeritakse taotlus `Origin` (väikesed tähed, lõpu kaldkriips eemaldatakse) ja sobitatakse **ühendatud lubatud loend** :
   - env **`CORS_ALLOWED_ORIGINS`** — komadega eraldatud loend ja
   - käitusaeg **`corsOrigins`** seade (Armatuurlaud → Turvalisus → _CORS Allowed Origins_), sisestatud `setRuntimeAllowedOrigins()` kaudu `src/lib/config/runtimeSettings.ts`-st.
3. → le ei vasta **`Access-Control-Allow-Origin` päist ei väljastata** . Brauser blokeerib ristpäritolu lugemise. See on kavandatud tõrkesulgemise vaikeseade.

| Env var                | Tähendus                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Lubamiseks täpse päritoluga CSV (soovitatav).                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → kajastab mis tahes päritolu (metamärk). Ainult arendaja.              |
| `CORS_ORIGIN`          | Pärand. `*` käitub nagu `CORS_ALLOW_ALL`; lubatud loendisse lisatakse üks väärtus. |

## Ohu mudel — mida `CORS_ALLOW_ALL=true` tegelikult paljastab

Üldist OWASP hoiatust ("metamärk CORS = mida iga sait võib teie API nimetada") tasub tõsiselt võtta, kuid OmniRoute kokkupuude on **kitsam kui üldjuhtum** , ühe konkreetse rakendamise fakti tõttu:

> **Keskne `applyCorsHeaders()` ei kiirga kunagi `Access-Control-Allow-Credentials`.** Brauser ei avalda _credentialed_ (küpsiseid kandvat) ristpäritolu vastust, välja arvatud juhul, kui server saadab `Access-Control-Allow-Credentials: true`. OmniRoute jagatud CORS tee ei tee seda kunagi.

Mida see tähendab pinna kohta, isegi `CORS_ALLOW_ALL=true` puhul:

| Pind                                       | Auth mehhanism            | Metamärgi CORS mõju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Armatuurlaud / MANAGEMENT `/api/*`         | Küpsiseanss               | Päritolu on vastukaja, kuid **ilma `Allow-Credentials`** brauser **plokid** volikiri lugeda. Pahatahtlik mitme päritoluga sait **ei oska lugeda** teie autenditud armatuurlaua vastused ja seansiküpsist ei avaldata.                                                                                                                                                                                                                                                                                               |
| Klient API `/v1/*`, `/v1beta/*`            | Kandja / `x-api-key` päis | Juba lubav **disaini järgi** (`relaxForTokenAuth`): brauserid ei ühenda kunagi `Authorization`/`x-api-key` automaatselt, seega ei saa ründaja leht teie võtit edastada. Lõdvestunud kaja nõuab autentitud subjekti (valideeritud API -võti või armatuurlaua seanss), mitte ainult mandaadi päist ja see ei sisalda kunagi `Access-Control-Allow-Credentials`. Anonüümsed vastused (`REQUIRE_API_KEY=false`) kasutavad konfigureeritud päritolu lubade loendit, sealhulgas selgesõnalist `CORS_ALLOW_ALL=true` luba. |
| Avalik kirjutuskaitstud (`/api/health`, …) | Mitte ühtegi              | Mittetundlik; metamärk on kahjutu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Nii et **jääk** `CORS_ALLOW_ALL=true` kokkupuude on piiratud: (a) mittevolitatud ristpäritoluga **loeb** juba autentimata andmetest ja (b) lubades CORS**lennueelne pass** haldusmarsruutidel —, mis nõuavad endiselt autentimist, mida ristpäritolu leht pakkuda ei suuda. On küll **mitte** seansi kaaperdamise või mandaadi varguse vektor jagatud CORS teel.

### Üks tõeline erand — `/api/v1/agents/`

Pilveagendi marsruudid (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) määravad oma **oma** CORS päised (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ja **teha** kiirgavad `Access-Control-Allow-Origin: <origin>|*` koos `Access-Control-Allow-Credentials: true`. See on üksainus pind, kus päritolu-kaja ja mandaadid eksisteerivad, ja see on nii **sõltumatu `CORS_ALLOW_ALL`** . Need marsruudid on haldusautenditud (`requireManagementAuth`); operaatorid, kes avaldavad armatuurlaua väljaspool hosti, peaksid teadma, et see on koht, kus vastuse päised lubavad ristpäise mandaadi lugemist. Selle pingutamist selgesõnaliseks lubatud loendiks jälgitakse sellest CORS juhendist eraldi.

## Tootmise kontrollnimekiri

- **Ärge kunagi määrake `CORS_ALLOW_ALL=true` d tootmises.** Jätke määramata.
- Määra an **selgesõnaline** päritoluloend — kas env var või vahekaart Turvalisus:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Kui OmniRoute jookseb vastupidise puhverserveri/tunneli taga (nginx, Caddy, Cloudflare tunnel, Tailscale), on CORS**mitte** sinu ainus juht — tagasisilmustee valvur kaitseb endiselt kudemisvõimelisi marsruute (vt [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ärge sepistage `X-Forwarded-For: 127.0.0.1` d 403 "parandamiseks"; mis avab uuesti RCE klassi, suletakse marsruudivalvur.
- Kinnitage käitusaja olek: armatuurlaual kuvatakse a **püsiv merevaiguvärvi bänner** Armatuurlaua all → turve → autoriseerimisloend alati, kui `CORS_ALLOW_ALL=true` on aktiivne, ja `/api/settings/authz-inventory` tagastab `cors: { allowAll, allowedOrigins }` ümbriku jälgimise tööriistad, mida saab küsitleda.

## Arendusmugavus — võimaldab konkreetset kohalikku päritolu

Metamärki vajate harva isegi arenduses. Lubage ainult teie kasutatavad arendusserverid:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Lähtekohad sobitatakse tõstutundlikult ja lõpu kaldkriipsu eiratakse, seega on `http://localhost:3000` ja `http://localhost:3000/` samaväärsed. Sama CSV saab seadistada tööajal **Armatuurlaud → Turvalisus → CORS Lubatud päritolu** ilma taaskäivituseta.

## API võtmed vs küpsiseansid

- **Kandja / `x-api-key` ( `/v1/*` järelduspind):** brauserid ei lisa neid kunagi automaatselt. CORS ei ole siin tähendusrikas takistus. — API -võti on — takistus, mistõttu on see pind tahtlikult lubatav, nii et brauseri ja Electron kliendid saavad lugeda vastuseid, millele neil on juba õigus. Lõdvestunud kaja nõuab autentitud subjekti (valideeritud API -võti või armatuurlaua seanss), mitte ainult mandaadi päist ja see ei sisalda kunagi `Access-Control-Allow-Credentials`. Anonüümsed vastused (`REQUIRE_API_KEY=false`) kasutavad konfigureeritud päritolu lubade loendit, sealhulgas selgesõnalist `CORS_ALLOW_ALL=true` lubamist. Auth-keeldumised (401) jäävad loetavaks, et kliendid saaksid esile tõsta tühistatud või valesti sisestatud võtme (#5242): konveieri enda 401 hoiab kaja ja marsruut, mis keeldub võtmest ise pärast seda, kui konveier on seda anonüümseks pakkunud (`/v1/models` ja `/v1beta/models` koos konfigureeritud haldusautendiga, omaniku ulatusega `/v1/files` ja ZQ- `/v1/batches`, `/v1/session-leases` `/v1/media`, kandidaatmarsruudid) lisab sellele 401-le kaja `credentialRejectionHeaders()` kaudu. Kaja sisestatakse päringule, mis kannab mandaadi päist (`Authorization`, `x-api-key`, `x-goog-api-key` või `auth_token` küpsis), mitte seda, millisel neist marsruuti kontrolliti, ja seda ei seostata kunagi `Access-Control-Allow-Credentials` iga; keha on fikseeritud veaümbris. `/api/v1/` all olevad haldusmarsruudid, mida valvab `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), ei kasuta seda mandaadi tagasilükkamise erandit: `REQUIRE_API_KEY=false` puhul järgivad nende 401/403 vastused konfigureeritud CORS päritolupoliitikat.
- **Küpsiste seanss (juhtpaneel):** kaitstud tõrkesulgemise vaikeseadega **ja** `Access-Control-Allow-Credentials` puudumise tõttu jagatud teel. Hoidke management/dashboard lähtepunktid eemal igasugusest lubavast konfiguratsioonist; need peavad jääma täpselt suletuks.

## WebSocket käepigistused (`/v1/responses`, `/v1/ws`)

Brauserid ei rakenda CORS d WebSocket, seega kontrollivad WebSocket transpordid, mis tagastavad järeldusväljundi, ise käepigistuse `Origin` (`src/server/origin/wsOrigin.ts`): vastuseid WebSocket (`/v1/responses`) ja kui OmniRoute läbib `npm start` / `npm run dev`, siis `/v1/ws` ja `/api/v1/ws` silda, mis voogesitab `/v1/chat/completions`- `/v1/messages` ja `/v1/responses`. Sild küsib `/api/v1/ws?handshake=1` otsust ja keeldub versiooniuuendusest, kui see marsruut ei kontrolli. Autentimisnõuded kehtivad endiselt eraldi. Päritolukontroll läbib, kui:

- sellel pole `Origin` päist (Codex CLI, SDKs ja muud brauserivälised kliendid);
- `Origin` on lubatud ülaltoodud lubade loendis (`CORS_ALLOWED_ORIGINS`, `corsOrigins` seadistus, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` on üks OmniRoute enda avalikest algallikatest (konfigureeritud avalik baas URL, usaldusväärse puhverserveri edastatud lähtekoht või otsene loopback/LAN host, mis on antud IP literaalina või `localhost` — samad kandidaadid, mida armatuurlaua mutatsioonikontroll kasutab); või
- sellel on kehtiv API võti, nagu HTTP `/v1/*` pinnal.

Kõik muu saab `403 ws_origin_forbidden`. Armatuurlaua seansiküpsis ei vabasta välismaist `Origin`, sest brauser lisab selle mis tahes lehe pesasse. `localhost` teises pordis ei käsitleta sama päritoluna; lisage sellised arendusallikad `CORS_ALLOWED_ORIGINS`.

## Näide: vastupidine puhverserver OmniRoute ees

CORS jõustab OmniRoute ise, seega peaks puhverserver üldiselt seda tegema **mitte** lisada või ümber kirjutada `Access-Control-*` päised (topeltpäised rikuvad brausereid). Lõpetage TLS ja edastage — laske OmniRoute il vastata eelkatsele:

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

Määrake lubatud brauseri lähtekohad OmniRoute (`CORS_ALLOWED_ORIGINS` või vahekaart Turvalisus), mitte puhverserveris.

## Lähtefailid

| Mure                                           | Fail                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| Lubamisloendi eraldusvõime + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Vahevara rakendus (üks tõeallikas)             | `src/server/authz/pipeline.ts`                                       |
| Seaded → käitusaja päritolu süstimine          | `src/lib/config/runtimeSettings.ts`                                  |
| Juhtpaneeli käitusaegne olek                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Armatuurlaua hoiatusbänner                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS lubatud päritolu väli                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent marsruudi kohta CORS (erand)       | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket käepigistus `Origin` kontroll        | `src/server/origin/wsOrigin.ts`                                      |

## Vaata ka

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback jõustamine kudemisvõimeliste marsruutide jaoks (eraldi täiendav juhtseade).
- [Autoriseerimisjuhend](../architecture/AUTHZ_GUIDE.md) — täielik autentimiskonveier.
