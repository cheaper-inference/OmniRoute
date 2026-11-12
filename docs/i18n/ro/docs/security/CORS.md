# CORS Configuration & Security (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controlează care **originile browserului** poate citi răspunsuri de origine încrucișată dintr-o singură listă de permisiuni centralizată. Modelul este **fail-closed implicit** : nicio origine nu este permisă până când nu vă înscrieți. Această pagină documentează cum se rezolvă lista de permise, ce expune de fapt `CORS_ALLOW_ALL=true` (și, mai important, ce face **nu** ), cum să configurați dev vs. producție în siguranță, iar avertismentul de rulare pe tabloul de bord afișează când un wildcard este activ.

**Sursa adevărului:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Lista de permise este aplicată o singură dată, în middleware (`src/server/authz/pipeline.ts`) — per-rută de gestionare nu setează ei înșiși `Access-Control-Allow-Origin`.

## Cum se rezolvă o origine

Pentru fiecare cerere, middleware-ul calculează valoarea `Access-Control-Allow-Origin` în această ordine:

1. **`CORS_ALLOW_ALL=true`** (sau `CORS_ORIGIN=*` moștenit) → ecou `Origin` înapoi al apelantului (sau `*` când nu există antet `Origin` ), cu `Vary: Origin`, astfel încât cache-urile să rămână corecte. Același punct de sufocare `applyCorsHeaders()` adaugă, de asemenea, `Vary: Accept-Encoding` la fiecare răspuns 2xx-cu-corp pe suprafața `/v1*`/`/v1beta*` autentificată cu jeton (`relaxForTokenAuth`, RFC 9110 §12.5.5, problema #6737), astfel încât cache-urile downstream/shared pot distinge corect variantele comprimate de cele necomprimate.
2. În caz contrar, cererea `Origin` este normalizată (minuscule, slash final eliminat) și potrivită cu **lista permisă fuzionată** :
   - înv **`CORS_ALLOWED_ORIGINS`** — listă separată prin virgulă și
   - timpul de rulare **`corsOrigins`** setare (Dashboard → Security → _CORS Allowed Origins_), injectat prin `setRuntimeAllowedOrigins()` de la `src/lib/config/runtimeSettings.ts`.
3. Nicio potrivire →**nu este emis niciun antet `Access-Control-Allow-Origin`** . Browserul blochează citirea cu origini încrucișate. Aceasta este valoarea implicită pentru eșec-închis.

| Env var                | Sens                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de origini exacte pentru a permite (recomandat).                                            |
| `CORS_ALLOW_ALL`       | `true`/`1` → ecou orice origine (wildcard). Doar Dev.                                           |
| `CORS_ORIGIN`          | Moştenire. `*` se comportă ca `CORS_ALLOW_ALL`; o singură valoare este adăugată listei permise. |

## Modelul de amenințare — ceea ce `CORS_ALLOW_ALL=true` expune cu adevărat

Avertismentul generic OWASP ("wildcard CORS = orice site poate apela dvs. API") merită luat în serios, dar expunerea OmniRoute este **mai restrâns decât cazul generic** , din cauza unui fapt concret de implementare:

> **`applyCorsHeaders()` central nu emite niciodată `Access-Control-Allow-Credentials`.** Un browser nu va expune un răspuns cu origini încrucișate _credentialed_ (purtător de cookie-uri) decât dacă serverul trimite `Access-Control-Allow-Credentials: true`. Calea CORS comună a lui OmniRoute nu o face niciodată.

Ce înseamnă asta pe suprafață, chiar și cu `CORS_ALLOW_ALL=true`:

| Suprafaţă                               | Mecanismul de autentificare  | Efectul wildcardului CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tabloul de bord / MANAGEMENT `/api/*`   | Sesiune cookie               | Originea are ecou, dar **fără `Allow-Credentials`** browserul **blocuri** cititul acreditat. Un site rău intenționat cu origini încrucișate **nu pot citi** răspunsurile dvs. autentificate din tabloul de bord și cookie-ul de sesiune nu este expus.                                                                                                                                                                                                                                                                                                     |
| Client API `/v1/*`, `/v1beta/*`         | Antet purtător / `x-api-key` | Deja permisiv **prin proiectare** (`relaxForTokenAuth`): browserele nu atașează niciodată automat `Authorization`/`x-api-key`, astfel încât pagina unui atacator nu poate furniza cheia dvs. Ecoul relaxat necesită un subiect autentificat (o cheie API validată sau o sesiune de tablou de bord), nu doar un antet de acreditări și nu include niciodată `Access-Control-Allow-Credentials`. Răspunsurile anonime (`REQUIRE_API_KEY=false`) utilizează lista de autorizare de origine configurată, inclusiv o înscriere explicită `CORS_ALLOW_ALL=true`. |
| Numai citire publică (`/api/health`, …) | Nici unul                    | nonsensibil; wildcard este inofensiv.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

Deci **rezidual** expunerea `CORS_ALLOW_ALL=true` este limitată la: (a) origine încrucișată neacreditată **citeste** de date deja neautentificate și (b) lăsarea CORS**permisul de preflight** pe rutele de gestionare — care necesită încă o autentificare pe care o pagină cu origini încrucișate nu o poate oferi. Este **nu** un vector de sesiune sau furt de acreditări pe calea CORS partajată.

### O excepție autentică — `/api/v1/agents/`

Rutele Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) își stabilesc **proprii** Antetele CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) și **do** emit `Access-Control-Allow-Origin: <origin>|*` împreună cu `Access-Control-Allow-Credentials: true`. Aceasta este suprafața unică în care coexistă ecoul originii și acreditările și este **independent de `CORS_ALLOW_ALL`** . Aceste rute sunt autentificate prin management (`requireManagementAuth`); operatorii care expun tabloul de bord în afara gazdei ar trebui să fie conștienți de faptul că acesta este singurul loc în care este permisă citirea cu acreditări de origine încrucișată de antetele răspunsului. Strângerea acesteia la o listă de permise explicită este urmărită separat de acest ghid CORS.

## Lista de verificare a producției

- **Nu setați niciodată `CORS_ALLOW_ALL=true` în producție.** Lăsați-l neasezat.
- Setați o **explicit** lista de origine — fie înv var sau câmpul Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Dacă OmniRoute rulează în spatele unui proxy/tunel invers (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS este **nu** singurul dvs. control — paza traseului loopback încă protejează rutele capabile de generare (vezi [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nu falsificați `X-Forwarded-For: 127.0.0.1` pentru a „repara” un 403; care redeschide clasa RCE, paza traseului o închide.
- Confirmați starea de rulare: tabloul de bord arată a **banner de chihlimbar persistent** în Dashboard → Security → Authorization Inventory ori de câte ori `CORS_ALLOW_ALL=true` este activ și `/api/settings/authz-inventory` returnează un plic `cors: { allowAll, allowedOrigins }` instrumentele de monitorizare pot sonda.

## Confortul de dezvoltare — permite origini locale specifice

Rareori aveți nevoie de wildcard chiar și în dev. Permiteți doar serverelor de dezvoltare pe care le utilizați:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Originile sunt corelate fără a ține seama de majuscule și minuscule, iar bara oblică finală este ignorată, astfel încât `http://localhost:3000` și `http://localhost:3000/` sunt echivalente. Același CSV poate fi setat la runtime în **Tabloul de bord → Security → CORS Origini permise** fără repornire.

## Chei API vs sesiuni cookie

- **Purtător / `x-api-key` (suprafața de inferență `/v1/*` ):** browserele nu le atașează niciodată automat. CORS nu este o barieră semnificativă aici — cheia API este bariera —, motiv pentru care acea suprafață este permisivă în mod intenționat, astfel încât clienții browser și Electron să poată citi răspunsurile la care au deja dreptul. Ecoul relaxat necesită un subiect autentificat (o cheie API validată sau o sesiune de tablou de bord), nu doar un antet de acreditări și nu include niciodată `Access-Control-Allow-Credentials`. Răspunsurile anonime (`REQUIRE_API_KEY=false`) utilizează lista de autorizare de origine configurată, inclusiv o înscriere explicită `CORS_ALLOW_ALL=true`. Respingerile de autorizare (401) rămân lizibile, astfel încât clienții să poată scoate la suprafață o cheie revocată sau scrisă greșit (#5242): propriul 401 al conductei păstrează ecoul și o rută care refuză cheia în sine după ce conducta a servit-o ca anonimă (`/v1/models` și `/v1beta/models` cu autorizarea de gestionare configurată, `/v1/files`, `/v1/batches` și ruta candidate auto, `/v1/media` și `/v1/session-leases` ) adaugă ecoul la acel 401 prin `credentialRejectionHeaders()`. Ecoul este introdus pe cerere purtând un antet de acreditări (`Authorization`, `x-api-key`, `x-goog-api-key` sau cookie-ul `auth_token` ), nu pe care dintre ele a verificat ruta și nu este niciodată asociat cu `Access-Control-Allow-Credentials`; corpul este un plic de eroare fix. Rutele de gestionare sub `/api/v1/` păzite de `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) nu folosesc această excepție de respingere a acreditărilor: cu `REQUIRE_API_KEY=false`, răspunsurile lor 401/403 urmează politica de origine CORS configurată.
- **Sesiune cookie (tabloul de bord):** protejat de default-closed **şi** prin absența `Access-Control-Allow-Credentials` pe calea partajată. Păstrați originile management/dashboard în afara oricărei configurații permisive; trebuie să rămână exact închise.

## Strângeri de mână WebSocket (`/v1/responses`, `/v1/ws`)

Browserele nu aplică CORS la WebSocket, astfel încât transporturile WebSocket care returnează ieșirea de inferență verifică ei înșiși handshake `Origin` (`src/server/origin/wsOrigin.ts`): răspunsurile WebSocket (`/v1/responses`) și, când OmniRoute rulează prin `npm start` / `npm run dev`, `/v1/ws` și `/api/v1/ws` bridge, care transmite `/v1/chat/completions`, `/v1/messages` ca cadre și `/v1/responses`. Podul cere verdictul `/api/v1/ws?handshake=1` și refuză să facă upgrade, cu excepția cazului în care acea rută a fost verificată. Cerințele de autentificare se aplică în continuare separat. Verificarea originii trece atunci când:

- nu are antet `Origin` (Codex CLI, SDKs și alți clienți non-browser);
- `Origin` este admis de lista de permise de mai sus (`CORS_ALLOWED_ORIGINS`, setarea `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` este una dintre originile publice proprii ale OmniRoute(baza publică configurată URL, originea redirecționată a unui proxy de încredere sau o gazdă loopback/LAN directă dată ca un literal IP sau `localhost` — aceiași candidați pe care le folosește verificarea mutațiilor tabloului de bord); sau
- poartă o cheie API validă, ca pe suprafața HTTP `/v1/*`.

Orice altceva primește `403 ws_origin_forbidden`. Un cookie de sesiune de tablou de bord nu scutește un `Origin` străin, deoarece browserul îl atașează la socket-ul oricărei pagini. `localhost` pe alt port nu este tratat ca de aceeași origine; adăugați astfel de origini dev la `CORS_ALLOWED_ORIGINS`.

## Exemplu: proxy invers în fața OmniRoute

CORS este aplicat chiar de OmniRoute, deci proxy-ul ar trebui, în general **nu** adăugați sau rescrieți anteturi `Access-Control-*` (antetele duble sparg browserele). Închideți TLS și redirecționați —, lăsați OmniRoute să răspundă la zborul prealabil:

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

Setați originile browserului permise în OmniRoute (`CORS_ALLOWED_ORIGINS` sau fila Securitate), nu în proxy.

## Fișiere sursă

| Îngrijorare                                     | Fişier                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Rezoluția listei permise + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Aplicație middleware (sursă unică de adevăr)    | `src/server/authz/pipeline.ts`                                       |
| Setări → runtime origine injectare              | `src/lib/config/runtimeSettings.ts`                                  |
| Starea de rulare pentru tabloul de bord         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner de avertizare pentru tabloul de bord     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Câmpul Origini permise CORS                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent CORS pe rută (excepție)             | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket strângere de mână Verificare `Origin` | `src/server/origin/wsOrigin.ts`                                      |

## Vezi de asemenea

- [Strat Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback pentru rutele capabile de spawn (un control separat, complementar).
- [Ghid de autorizare](../architecture/AUTHZ_GUIDE.md) — canalul complet de autorizare.
