# CORS Configuration & Security (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontroliše koje **porijeklo pretraživača** može čitati odgovore sa više izvora iz jedne, centralizirane liste dozvoljenih. Model je **fabrički zatvoreno** : nije dozvoljeno porijeklo dok ga ne uključite. Ova stranica dokumentira kako se lista dozvoljenih rješava, šta `CORS_ALLOW_ALL=true` zapravo otkriva (i, što je još važnije, šta radi **ne** ), kako bezbedno konfigurisati dev u odnosu na proizvodnju, a upozorenje o vremenu izvođenja na kontrolnoj tabli prikazuje kada je džoker oznaka aktivan.

**Izvor istine:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Lista dopuštenja se primjenjuje jednom, u srednjem softveru (`src/server/authz/pipeline.ts`) — rukovaoci po ruti ne postavljaju sami `Access-Control-Allow-Origin`.

## Kako se rješava porijeklo

Za svaki zahtjev međuvera izračunava vrijednost `Access-Control-Allow-Origin` ovim redoslijedom:

1. **`CORS_ALLOW_ALL=true`** (ili naslijeđeni `CORS_ORIGIN=*`) → eho vraća `Origin` pozivaoca (ili `*` kada nema `Origin` zaglavlja), sa `Vary: Origin` tako da kešovi ostaju ispravni. Ista `applyCorsHeaders()` chokepoint također dodaje `Vary: Accept-Encoding` svakom 2xx-with-body odgovoru na površini `/v1*`/`/v1beta*` potvrđenoj tokenom (`relaxForTokenAuth`, RFC 9110 §12.5.5, izdanje #6737), tako da downstream/shared kešovi mogu ispravno razlikovati komprimirane od nekomprimiranih varijanti.
2. U suprotnom, zahtjev `Origin` je normaliziran (mala slova, zadnja kosa crta uklonjena) i uparen sa **spojena lista dozvoljenih** :
   - env **`CORS_ALLOWED_ORIGINS`** — lista odvojena zarezima, i
   - vrijeme izvođenja **`corsOrigins`** postavka (Dashboard → Security → _CORS Allowed Origins_), ubrizgana preko `setRuntimeAllowedOrigins()` iz `src/lib/config/runtimeSettings.ts`.
3. Nema podudaranja →**ne emituje se `Access-Control-Allow-Origin` zaglavlje** . Pretraživač blokira čitanje s više izvora. Ovo je predviđena zadana postavka zatvaranja bez greške.

| Env var                | Značenje                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV tačnog porijekla koji treba dozvoliti (preporučuje se).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → eho bilo kojeg porijekla (džoker). Samo za programere.                             |
| `CORS_ORIGIN`          | Naslijeđe. `*` se ponaša kao `CORS_ALLOW_ALL`; jedna vrijednost se dodaje na listu dozvoljenih. |

## Model prijetnje — ono što `CORS_ALLOW_ALL=true` zaista razotkriva

Generičko OWASP upozorenje („wildcard CORS = bilo koja web lokacija može pozvati vaš API“) vrijedi uzeti za ozbiljno, ali OmniRoute-ova izloženost je **uži od generičkog slučaja** , zbog jedne konkretne činjenice o implementaciji:

> **Centralni `applyCorsHeaders()` nikada ne emituje `Access-Control-Allow-Credentials`.** Preglednik neće izložiti odgovor _credentialed_ (koji sadrži kolačiće) sa više izvora osim ako server ne pošalje `Access-Control-Allow-Credentials: true`. OmniRoute-ova zajednička CORS putanja nikada ne radi.

Šta to znači po površini, čak i sa `CORS_ALLOW_ALL=true`:

| Površina                                 | Auth mehanizam                  | Učinak zamjenskog znaka CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kontrolna tabla / MANAGEMENT `/api/*`    | Cookie session                  | Poreklo se ponavlja, ali **bez `Allow-Credentials`** pretraživač **blokova** akreditovano čitanje. Zlonamjerna stranica s više podrijetla **ne može čitati** vaše provjerene odgovore kontrolne ploče, a kolačić sesije nije izložen.                                                                                                                                                                                                                                                                                          |
| Klijent API `/v1/*`, `/v1beta/*`         | Nosilac / `x-api-key` zaglavlje | Već dopušteno **po dizajnu** (`relaxForTokenAuth`): pretraživači nikada ne pričvršćuju automatski `Authorization`/`x-api-key`, tako da stranica napadača ne može dati vaš ključ. Opušteni eho zahtijeva autentifikaciju subjekta (potvrđen API ključ ili sesiju kontrolne ploče), a ne samo zaglavlje vjerodajnica i nikada ne uključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) koriste konfigurisanu listu dozvoljenih izvora, uključujući eksplicitnu `CORS_ALLOW_ALL=true` opciju. |
| Javno samo za čitanje (`/api/health`, …) | Nema                            | Nonsensitive; džoker je bezopasan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Dakle **rezidualni** izloženost `CORS_ALLOW_ALL=true` ograničena je na: (a) unakrsno porijeklo bez akreditiva **čita** već neautorizovanih podataka i (b) prepuštanje CORS u **preflight pass** na rutama upravljanja — koje još uvijek zahtijevaju autentifikaciju koju stranica s više izvora ne može pružiti. Jeste **ne** vektor za otmicu sesije ili krađu akreditiva na zajedničkoj CORS putanji.

### Jedan pravi izuzetak — `/api/v1/agents/`

Rute Cloud-Agenta (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) postavljaju svoje **vlastiti** CORS zaglavlja (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **uradi** emituju `Access-Control-Allow-Origin: <origin>|*` zajedno sa `Access-Control-Allow-Credentials: true`. Ovo je jedina površina na kojoj izvorni eho i vjerodajnice koegzistiraju, i to je **nezavisno od `CORS_ALLOW_ALL`** . Ove rute su provjerene za upravljanje (`requireManagementAuth`); Operateri koji izlažu kontrolnu tablu izvan hosta trebali bi biti svjesni da je ovo jedno mjesto gdje zaglavlja odgovora dozvoljavaju čitanje vjerodajnica s više izvora. Pooštravanje na eksplicitnu listu dozvoljenih prati se odvojeno od ovih CORS uputstava.

## Kontrolna lista proizvodnje

- **Nikada nemojte postavljati `CORS_ALLOW_ALL=true` u proizvodnju.** Ostavite ga nepodešenim.
- Postavite an **eksplicitno** izvorna lista — ili env var ili polje Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ako OmniRoute radi iza obrnutog proxyja/tunela (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS je **ne** vaša jedina kontrolna — zaštita rute povratne petlje i dalje štiti rute koje su sposobne za stvaranje (pogledajte [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nemojte krivotvoriti `X-Forwarded-For: 127.0.0.1` da "popravi" 403; koji ponovo otvara RCE klasu zatvara se zaštita rute.
- Potvrdite stanje vremena rada: kontrolna tabla prikazuje a **uporni ćilibarski baner** u okviru Dashboard → Security → Autorizacijski inventar kad god je `CORS_ALLOW_ALL=true` aktivan, a `/api/settings/authz-inventory` vraća `cors: { allowAll, allowedOrigins }` alati za nadgledanje omotnice mogu anketirati.

## Pogodnost razvoja — dozvoljava specifično lokalno porijeklo

Zamjenski znak vam rijetko treba čak i u dev. Dozvolite samo dev servere koje koristite:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Porijeklo se uparuje bez osjetljivosti na velika i mala slova sa završnom kosom crtom koja se zanemaruje, tako da su `http://localhost:3000` i `http://localhost:3000/` ekvivalentni. Isti CSV se može postaviti u vrijeme izvođenja u **Dashboard → Security → CORS Allowed Origins** bez ponovnog pokretanja.

## API ključevi u odnosu na sesije kolačića

- **Nosilac/ `x-api-key` ( `/v1/*` površina zaključivanja):** pretraživači ih nikada ne prilažu automatski. CORS ovdje nije značajna prepreka — API ključ je barijera — zbog čega je ta površina namjerno dopuštena tako da pretraživač i Electron klijenti mogu čitati odgovore na koje već imaju pravo. Opušteni eho zahtijeva autentifikaciju subjekta (potvrđen API ključ ili sesiju kontrolne ploče), a ne samo zaglavlje akreditiva i nikada ne uključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) koriste konfigurisanu listu dozvoljenih izvora, uključujući eksplicitnu `CORS_ALLOW_ALL=true` opciju. Odbacivanja autentifikacije (401) ostaju čitljivi tako da klijenti mogu prikazati opozvani ili pogrešno upisani ključ (#5242): vlastiti 401 cjevovoda zadržava eho, a ruta koja odbija sam ključ nakon što mu je cjevovod poslužio kao anonimni (`/v1/models` i `/v1beta/models` s konfiguriranom autorizacijom upravljanja, vlasnikom, `/v1/batches`-com `/v1/files`, `/v1/media` kandidatom i `/v1/session-leases` rute) dodaje eho tom 401 preko `credentialRejectionHeaders()`. Eho se upisuje na zahtjev koji nosi zaglavlje akreditiva (`Authorization`, `x-api-key`, `x-goog-api-key` ili `auth_token` kolačić), a ne na koji od njih je ruta provjerena, i nikada nije uparen sa `Access-Control-Allow-Credentials`; tijelo je fiksna omotnica greške. Rute upravljanja pod `/api/v1/` koje čuva `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ne koriste ovaj izuzetak odbijanja vjerodajnica: sa `REQUIRE_API_KEY=false`, njihovi 401/403 odgovori slijede konfiguriranu CORS politiku porijekla.
- **Sesija kolačića (kontrolna tabla):** zaštićeno zadanim postavkama zatvorenog bez greške **i** odsustvom `Access-Control-Allow-Credentials` na zajedničkom putu. Držite management/dashboard porijeklo izvan bilo kakve dopuštene konfiguracije; oni moraju ostati tačno zatvoreni.

## WebSocket rukovanja (`/v1/responses`, `/v1/ws`)

Pretraživači ne primjenjuju CORS na WebSocket, tako da WebSocket transporti koji vraćaju izlaz zaključivanja sami provjeravaju rukovanje `Origin` (`src/server/origin/wsOrigin.ts`): odgovore WebSocket (`/v1/responses`) i, kada OmniRoute prolazi kroz `npm start` `/v1/responses` `npm run dev`, most `/v1/ws` i `/api/v1/ws`, koji struji `/v1/chat/completions`, `/v1/messages` kao okvire. Most traži od `/api/v1/ws?handshake=1` presudu i odbija nadogradnju osim ako ta ruta nije prošla provjeru. Zahtjevi za autentifikaciju i dalje se primjenjuju zasebno. Provjera porijekla prolazi kada:

- nema `Origin` zaglavlje (Codex CLI, SDKs i drugi klijenti koji nisu pretraživači);
- `Origin` je prihvaćen na gornjoj listi dozvoljenih (`CORS_ALLOWED_ORIGINS`, `corsOrigins` postavka, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` je jedno od OmniRoute-ovih vlastitih javnih izvora (konfigurirana javna baza URL, proslijeđeno porijeklo pouzdanog proxyja, ili direktni loopback/LAN host dat kao IP literal ili `localhost` — isti kandidati koje koristi provjera mutacije kontrolne ploče); ili
- nosi važeći API ključ, kao na površini HTTP `/v1/*`.

Sve ostalo dobija `403 ws_origin_forbidden`. Kolačić sesije kontrolne table ne izuzima strani `Origin`, jer ga pretraživač prikačuje na utičnicu bilo koje stranice. `localhost` na drugom portu se ne tretira kao istog porijekla; dodajte takve dev izvore u `CORS_ALLOWED_ORIGINS`.

## Primjer: obrnuti proxy ispred OmniRoute

CORS provodi sam OmniRoute, tako da bi proxy općenito trebao **ne** dodajte ili prepišite `Access-Control-*` zaglavlja (dvostruka zaglavlja razbijaju pretraživače). Prekinite TLS i proslijedite — neka OmniRoute odgovori prije leta:

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

Postavite dozvoljeno porijeklo pretraživača u OmniRoute (`CORS_ALLOWED_ORIGINS` ili kartica Sigurnost), a ne u proxy serveru.

## Izvorni fajlovi

| Zabrinutost                                     | File                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Rezolucija liste dopuštenja + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware aplikacija (jedan izvor istine)      | `src/server/authz/pipeline.ts`                                       |
| Postavke → runtime izvorna injekcija            | `src/lib/config/runtimeSettings.ts`                                  |
| Status vremena rada za kontrolnu tablu          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Baner upozorenja na kontrolnoj tabli            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS polje dozvoljeno porijeklo                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent po ruti CORS (izuzetak)             | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket rukovanje `Origin` provjera           | `src/server/origin/wsOrigin.ts`                                      |

## Vidi također

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback provođenje za rute koje mogu generirati (zasebna, komplementarna kontrola).
- [Vodič za autorizaciju](../architecture/AUTHZ_GUIDE.md) — potpuni auth cjevovod.
