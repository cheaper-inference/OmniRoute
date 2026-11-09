# CORS Configuration & Security (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrolira koje **podrijetlo preglednika** može čitati odgovore različitih izvora s jednog, centraliziranog popisa dopuštenih. Model je **fail-closed prema zadanim postavkama** : podrijetlo nije dopušteno dok ga ne uključite. Ova stranica dokumentira kako popis dopuštenih rješava, što `CORS_ALLOW_ALL=true` zapravo izlaže (i, što je važno, što radi **ne** ), kako sigurno konfigurirati programere u odnosu na proizvodnju i upozorenje o vremenu izvođenja koje nadzorna ploča prikazuje kada je zamjenski znak aktivan.

**Izvor istine:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Popis dopuštenih se primjenjuje jednom, u srednjem softveru (`src/server/authz/pipeline.ts`) — rukovatelji po ruti sami ne postavljaju `Access-Control-Allow-Origin`.

## Kako se rješava podrijetlo

Za svaki zahtjev međuprogram izračunava `Access-Control-Allow-Origin` vrijednost ovim redoslijedom:

1. **`CORS_ALLOW_ALL=true`** (ili naslijeđeni `CORS_ORIGIN=*`) → vraća pozivateljev `Origin` (ili `*` kada nema `Origin` zaglavlja), sa `Vary: Origin` tako da predmemorije ostaju točne. Ista točka prigušnice `applyCorsHeaders()` također dodaje `Vary: Accept-Encoding` svakom odgovoru 2xx-with-body na površini `/v1*`/`/v1beta*` s autentifikacijom tokena (`relaxForTokenAuth`, RFC 9110 §12.5.5, izdanje #6737), tako da downstream/shared predmemorije mogu ispravno razlikovati komprimirane od nekomprimiranih varijanti.
2. U suprotnom, zahtjev `Origin` se normalizira (mala slova, bez kose crte) i uspoređuje se s **spojeni popis dopuštenih** :
   - okolina **`CORS_ALLOWED_ORIGINS`** — popis odvojen zarezom i
   - vrijeme izvođenja **`corsOrigins`** postavka (Dashboard → Security → _CORS Allowed Origins_), umetnuta putem `setRuntimeAllowedOrigins()` iz `src/lib/config/runtimeSettings.ts`.
3. Nema podudaranja →**ne emitira se `Access-Control-Allow-Origin` zaglavlje** . Preglednik blokira čitanje iz drugog izvora. Ovo je namjeravana fail-closed default.

| Env var                | Značenje                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV točnog podrijetla dopustiti (preporučeno).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → ponavlja bilo koje podrijetlo (zamjenski znak). Samo Dev.                        |
| `CORS_ORIGIN`          | nasljeđe. `*` se ponaša kao `CORS_ALLOW_ALL`; jedna se vrijednost dodaje na popis dopuštenih. |

## Model prijetnji — ono što `CORS_ALLOW_ALL=true` stvarno izlaže

Generičko OWASP upozorenje ("zamjenski znak CORS = bilo koje mjesto može nazvati vaš API") vrijedi shvatiti ozbiljno, ali izloženost OmniRoute-a je **uži od generičkog slučaja** , zbog jedne konkretne činjenice implementacije:

> **Središnji `applyCorsHeaders()` nikada ne emitira `Access-Control-Allow-Credentials`.** Preglednik neće izložiti _credentialed_ (koji nosi kolačić) odgovor unakrsnog porijekla osim ako poslužitelj ne pošalje `Access-Control-Allow-Credentials: true`. OmniRoute-ov zajednički CORS put to nikada ne čini.

Što to znači po površini, čak i sa `CORS_ALLOW_ALL=true`:

| Površinski                               | Auth mehanizam                   | Učinak zamjenskog znaka CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna ploča / MANAGEMENT `/api/*`     | Sesija kolačića                  | Podrijetlo se ponavlja, ali **bez `Allow-Credentials`** preglednik **blokovi** ovlašteni čitati. Zlonamjerna stranica s različitim izvorima **ne može čitati** vaši provjereni odgovori nadzorne ploče, a kolačić sesije nije izložen.                                                                                                                                                                                                                                                                                           |
| Klijent API `/v1/*`, `/v1beta/*`         | Nositelj / `x-api-key` zaglavlje | Već popustljivo **prema dizajnu** (`relaxForTokenAuth`): preglednici nikada automatski ne prilažu `Authorization`/`x-api-key`, tako da stranica napadača ne može dati vaš ključ. Opušteni odjek zahtijeva autentificirani subjekt (potvrđeni API ključ ili sesiju nadzorne ploče), a ne samo zaglavlje vjerodajnice, i nikada ne uključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) koriste konfigurirani izvorni popis dopuštenih, uključujući eksplicitnu `CORS_ALLOW_ALL=true` opciju. |
| Javno samo za čitanje (`/api/health`, …) | Nijedan                          | Neosjetljivo; zamjenski znak je bezopasan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

Dakle,**rezidualni** izloženost `CORS_ALLOW_ALL=true` u ograničena je na: (a) unakrsno podrijetlo bez vjerodajnice **glasi** već neautentificiranih podataka i (b) dopuštanje CORS**pretpoletnu propusnicu** na upravljačkim rutama — koje i dalje zahtijevaju autentifikaciju koju stranica s različitim izvorima ne može pružiti. jeste **ne** vektor otmice sesije ili krađe vjerodajnica na zajedničkom CORS putu.

### Jedna istinska iznimka — `/api/v1/agents/`

Cloud-Agent rute (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) postavljaju svoje **vlastiti** CORS zaglavlja (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **učiniti** emitiraju `Access-Control-Allow-Origin: <origin>|*` zajedno sa `Access-Control-Allow-Credentials: true`. Ovo je jedinstvena površina na kojoj koegzistiraju origin-echo i vjerodajnice, i to i jest **neovisno o `CORS_ALLOW_ALL`** . Ove rute su provjerene od strane upravljanja (`requireManagementAuth`); operateri koji nadzornu ploču izlažu izvan glavnog računala trebali bi biti svjesni da je to jedino mjesto na kojem je zaglavlja odgovora dopušteno čitanje s vjerodajnicama s više izvora. Pooštravanje na eksplicitnu listu dopuštenih prati se odvojeno od ovih CORS smjernica.

## Kontrolni popis proizvodnje

- **Nikada ne postavljajte `CORS_ALLOW_ALL=true` u proizvodnju.** Ostavite ga nepostavljenim.
- Postavite **eksplicitan** izvorni popis — ili env var ili polje kartice Sigurnost:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ako OmniRoute radi iza obrnutog proxyja/tunela (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS je **ne** vaša jedina kontrola — zaštita rute povratne petlje i dalje štiti rute sposobne za spawn (vidi [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nemojte krivotvoriti `X-Forwarded-For: 127.0.0.1` da "popravite" 403; koji ponovno otvara RCE klasu koju zaštitar zatvara.
- Potvrdite stanje vremena izvođenja: nadzorna ploča prikazuje a **uporan jantarni transparent** pod Dashboard → Security → Authorization Inventory kad god je `CORS_ALLOW_ALL=true` aktivan, a `/api/settings/authz-inventory` vraća `cors: { allowAll, allowedOrigins }` omotnicu koju alati za praćenje mogu anketirati.

## Pogodnost razvoja — omogućuje specifično lokalno podrijetlo

Rijetko vam je potreban zamjenski znak čak i u dev. Dopusti samo razvojnim poslužiteljima koje upotrebljavaš:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izvori se uparuju bez obzira na velika i mala slova, a kosa crta na kraju se zanemaruje, tako da su `http://localhost:3000` i `http://localhost:3000/` ekvivalentni. Isti CSV može se postaviti tijekom izvođenja u **Kontrolna ploča → Sigurnost → CORS Dopušteno porijeklo** bez ponovnog pokretanja.

## API ključevi vs sesije kolačića

- **Nositelj / `x-api-key` ( `/v1/*` inferencijska površina):** preglednici ih nikad ne prilažu automatski. CORS ovdje nije značajna prepreka — ključ API je prepreka — zbog čega je ta površina namjerno dopustiva tako da preglednik i Electron klijenti mogu čitati odgovore na koje već imaju pravo. Opušteni odjek zahtijeva autentificirani subjekt (potvrđeni API ključ ili sesiju nadzorne ploče), a ne samo zaglavlje vjerodajnice, i nikada ne uključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) koriste konfigurirani izvorni popis dopuštenih, uključujući eksplicitnu `CORS_ALLOW_ALL=true` opt-in. Odbijanja autentifikacije (401) ostaju čitljiva kako bi klijenti mogli otkriti opozvani ili pogrešno upisani ključ (#5242): vlastiti 401 cjevovoda čuva odjek i ruta koja odbija sam ključ nakon što ga je cjevovod poslužio kao anoniman (`/v1/models` i `/v1beta/models` s konfiguriranom autentifikacijom za upravljanje, `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` i kandidat za auto-kombinaciju s opsegom vlasnika rute) dodaje eho tom 401 putem `credentialRejectionHeaders()`. Odjek je ključan na zahtjevu koji nosi zaglavlje vjerodajnice (`Authorization`, `x-api-key`, `x-goog-api-key` ili `auth_token` kolačić), a ne na kojem je od njih ruta provjerila, i nikada nije uparen sa `Access-Control-Allow-Credentials`; tijelo je fiksna omotnica pogreške. Rute upravljanja pod `/api/v1/` koje čuva `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ne koriste ovu iznimku odbijanja vjerodajnica: sa `REQUIRE_API_KEY=false`, njihovi 401/403 odgovori slijede konfiguriranu politiku izvora CORS.
- **Sesija kolačića (nadzorna ploča):** zaštićen fail-closed defaultom **i** odsutnošću `Access-Control-Allow-Credentials` na zajedničkom putu. Držite management/dashboard podrijetla izvan bilo koje dopuštene konfiguracije; moraju ostati točno zatvorene.

## WebSocket rukovanja (`/v1/responses`, `/v1/ws`)

Preglednici ne primjenjuju CORS na WebSocket, tako da WebSocket prijenosi koji vraćaju izlaz zaključivanja sami provjeravaju rukovanje `Origin` (`src/server/origin/wsOrigin.ts`): odgovore WebSocket (`/v1/responses`) i, kada OmniRoute prolazi kroz `npm start` / `npm run dev`, `/v1/ws` i `/api/v1/ws` most, koji struji `/v1/chat/completions`, `/v1/messages` i `/v1/responses` kao okvire. Most traži od `/api/v1/ws?handshake=1` presudu i odbija nadogradnju osim ako ta ruta nije prošla provjeru. Zahtjevi za autentifikaciju i dalje se primjenjuju zasebno. Provjera porijekla prolazi kada:

- nema `Origin` zaglavlje (Codex CLI, SDKs i drugi klijenti koji nisu preglednici);
- `Origin` je dopušten gornjim popisom dopuštenih (`CORS_ALLOWED_ORIGINS`, postavka `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` je jedno od OmniRoute-ovih vlastitih javnih izvora (konfigurirana javna baza URL, proslijeđeno porijeklo pouzdanog proxyja ili izravni loopback/LAN host dan kao IP literal ili `localhost` — isti kandidati koje koristi provjera mutacije nadzorne ploče); ili
- nosi važeći API ključ, kao na površini HTTP `/v1/*`.

Sve drugo dobiva `403 ws_origin_forbidden`. Kolačić sesije nadzorne ploče ne izuzima strani `Origin` jer ga preglednik pričvršćuje na utičnicu bilo koje stranice. `localhost` na drugom portu ne tretira se kao isti izvor; dodajte takvo razvojno podrijetlo u `CORS_ALLOWED_ORIGINS`.

## Primjer: obrnuti proxy ispred OmniRoute

CORS provodi sam OmniRoute, tako da bi proxy općenito trebao **ne** dodati ili prepisati `Access-Control-*` zaglavlja (dvostruka zaglavlja kvare preglednike). Prekini TLS i proslijedi — neka OmniRoute odgovori prije leta:

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

Postavite dopuštene izvore preglednika u OmniRoute (`CORS_ALLOWED_ORIGINS` ili kartici Sigurnost), a ne u proxyju.

## Izvorne datoteke

| Zabrinutost                                     | File                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Rezolucija liste dopuštenih + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware aplikacija (jedan izvor istine)      | `src/server/authz/pipeline.ts`                                       |
| Postavke → runtime origin injection             | `src/lib/config/runtimeSettings.ts`                                  |
| Status vremena izvođenja za nadzornu ploču      | `src/app/api/settings/authz-inventory/route.ts`                      |
| Upozorenje na nadzornoj ploči                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS dopušteno polje Izvori                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent po ruti CORS (iznimka)              | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket rukovanje `Origin` provjera           | `src/server/origin/wsOrigin.ts`                                      |

## Vidi također

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback provedba za rute sposobne za stvaranje (odvojena, komplementarna kontrola).
- [Vodič za autorizaciju](../architecture/AUTHZ_GUIDE.md) — cjevovod s punom autentifikacijom.
