# CORS Configuration & Security (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controleert welke **browser oorsprong** kan cross-origine-reacties lezen van één enkele, gecentraliseerde toelatingslijst. Het model is **standaard fail-closed** : er is geen oorsprong toegestaan totdat u er een aanmeldt. Deze pagina documenteert hoe de toelatingslijst wordt opgelost, wat `CORS_ALLOW_ALL=true` daadwerkelijk blootlegt (en, belangrijker nog, wat het doet **niet** ), hoe u dev versus productie veilig kunt configureren, en de runtime-waarschuwing die op het dashboard wordt weergegeven wanneer een wildcard live is.

**Bron van waarheid:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). De toelatingslijst wordt één keer toegepast, in de middleware (`src/server/authz/pipeline.ts`) — -handlers per route stellen `Access-Control-Allow-Origin` zelf niet in.

## Hoe een oorsprong wordt opgelost

Voor elk verzoek berekent de middleware de `Access-Control-Allow-Origin` waarde in deze volgorde:

1. **`CORS_ALLOW_ALL=true`** (of de oude `CORS_ORIGIN=*`) → echo de `Origin` van de beller terug (of `*` als er geen `Origin` header is), met `Vary: Origin` zodat caches correct blijven. Hetzelfde `applyCorsHeaders()` chokepoint voegt ook `Vary: Accept-Encoding` toe aan elke 2xx-with-body-reactie op het token-geverifieerde `/v1*`/`/v1beta*` oppervlak (`relaxForTokenAuth`, RFC 9110 §12.5.5, uitgave #6737), zodat downstream/shared caches gecomprimeerde en niet-gecomprimeerde varianten correct kunnen onderscheiden.
2. Anders wordt het verzoek `Origin` genormaliseerd (kleine letters, schuine streep verwijderd) en vergeleken met de **samengevoegde toelatingslijst** :
   - omg **`CORS_ALLOWED_ORIGINS`** — door komma's gescheiden lijst, en
   - de looptijd **`corsOrigins`** instelling (Dashboard → Security → _CORS Allowed Origins_), geïnjecteerd via `setRuntimeAllowedOrigins()` vanuit `src/lib/config/runtimeSettings.ts`.
3. Geen wedstrijd →**er wordt geen `Access-Control-Allow-Origin` header verzonden** . De browser blokkeert het lezen van verschillende oorsprong. Dit is de beoogde fail-close-standaard.

| Env var                | Betekenis                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV van exacte oorsprong mogelijk maken (aanbevolen).                                                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → echo elke oorsprong (wildcard). Alleen ontwikkelaar.                                            |
| `CORS_ORIGIN`          | Nalatenschap. `*` gedraagt zich als `CORS_ALLOW_ALL`; Er wordt één waarde toegevoegd aan de toelatingslijst. |

## Bedreigingsmodel — wat `CORS_ALLOW_ALL=true` echt blootlegt

De generieke OWASP waarschuwing ("wildcard CORS = elke site kan uw API noemen") is de moeite waard om serieus te nemen, maar de bekendheid van OmniRoute is **smaller dan het generieke geval** , vanwege één concreet implementatiefeit:

> **De centrale `applyCorsHeaders()` zendt nooit `Access-Control-Allow-Credentials` uit.** Een browser zal geen _credentialed_ (cookie-dragende) cross-origin-reactie weergeven, tenzij de server `Access-Control-Allow-Credentials: true` verzendt. Het gedeelde CORS pad van OmniRoute doet dat nooit.

Wat dat betekent per oppervlak, ook bij `CORS_ALLOW_ALL=true`:

| Oppervlak                                | Verificatiemechanisme          | Effect van wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`          | Cookie-sessie                  | De oorsprong wordt herhaald, maar **zonder `Allow-Credentials`** de browser **blokken** de gelegitimeerde lezing. Een kwaadaardige cross-origin-site **kan niet lezen** uw geverifieerde dashboardreacties en de sessiecookie wordt niet weergegeven.                                                                                                                                                                                                                                                                              |
| Klant API `/v1/*`, `/v1beta/*`           | Drager / `x-api-key` -koptekst | Al tolerant **door ontwerp** (`relaxForTokenAuth`): browsers voegen `Authorization`/`x-api-key` nooit automatisch toe, dus de pagina van een aanvaller kan uw sleutel niet leveren. De ontspannen echo vereist een geverifieerd onderwerp (een gevalideerde API sleutel of dashboardsessie), niet alleen een referentiekop, en bevat nooit `Access-Control-Allow-Credentials`. Anonieme antwoorden (`REQUIRE_API_KEY=false`) gebruiken de geconfigureerde oorsprongslijst, inclusief een expliciete `CORS_ALLOW_ALL=true` -opt-in. |
| Openbaar alleen-lezen (`/api/health`, …) | Geen                           | Niet-gevoelig; wildcard is onschadelijk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Dus de **residu** blootstelling aan `CORS_ALLOW_ALL=true` is beperkt tot: (a) niet-gecertificeerde cross-origin **leest** van reeds niet-geauthenticeerde gegevens, en (b) het verhuren CORS**preflightpas** op beheerroutes — die nog steeds authenticatie vereisen die een cross-origin-pagina niet kan bieden. Het is **niet** een sessiekaping of inloggegevensdiefstalvector op het gedeelde CORS pad.

### Eén echte uitzondering — `/api/v1/agents/`

De Cloud-Agent-routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) stellen hun **eigen** CORS headers (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) en **Doen** zenden `Access-Control-Allow-Origin: <origin>|*` samen met `Access-Control-Allow-Credentials: true` uit. Dit is het enige oppervlak waar oorsprong-echo en referenties naast elkaar bestaan, en dat is ook zo **onafhankelijk van `CORS_ALLOW_ALL`** . Deze routes zijn door het management geverifieerd (`requireManagementAuth`); Operators die het dashboard off-host beschikbaar stellen, moeten zich ervan bewust zijn dat dit de enige plaats is waar een cross-origin gelegitimeerde lezing is toegestaan door de antwoordheaders. Het aanscherpen van een expliciete toelatingslijst wordt afzonderlijk van deze CORS richtlijnen bijgehouden.

## Controlelijst voor productie

- **Zet `CORS_ALLOW_ALL=true` nooit in productie.** Laat het uitgeschakeld.
- Stel een **expliciet** origin list — ofwel het env var ofwel het tabblad Beveiliging:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Als OmniRoute achter een reverse proxy/tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale) draait, is CORS**niet** je enige controle — de loopback-routebewaker beschermt nog steeds routes die geschikt zijn voor spawnen (zie [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Smeed `X-Forwarded-For: 127.0.0.1` niet om een 403 te "repareren"; die de RCE klasse heropent, sluit de routewachter.
- Bevestig de runtimestatus: het dashboard toont een **aanhoudende oranje banner** onder Dashboard → Beveiliging → Autorisatie-inventarisatie wanneer `CORS_ALLOW_ALL=true` live is en `/api/settings/authz-inventory` een `cors: { allowAll, allowedOrigins }` envelop retourneert die monitoringtools kunnen pollen.

## Ontwikkelingsgemak — maakt specifieke lokale herkomst mogelijk

Je hebt de wildcard zelden nodig, zelfs niet in dev. Sta alleen de ontwikkelaarsservers toe die u gebruikt:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Oorsprongen worden hoofdletterongevoelig gekoppeld, waarbij de afsluitende schuine streep wordt genegeerd, dus `http://localhost:3000` en `http://localhost:3000/` zijn gelijkwaardig. Dezelfde CSV kan tijdens runtime worden ingesteld **Dashboard → Beveiliging → CORS Toegestane oorsprong** zonder herstart.

## API -sleutels versus cookiesessies

- **Drager / `x-api-key` (het `/v1/*` inferentieoppervlak):** browsers voegen deze nooit automatisch toe. CORS is hier geen betekenisvolle barrière. — de API sleutel is de barrière — Daarom is dat oppervlak opzettelijk tolerant, zodat browser- en Electron clients antwoorden kunnen lezen waar ze al recht op hebben. De ontspannen echo vereist een geverifieerd onderwerp (een gevalideerde API sleutel of dashboardsessie), niet alleen een referentiekop, en bevat nooit `Access-Control-Allow-Credentials`. Anonieme reacties (`REQUIRE_API_KEY=false`) gebruiken de geconfigureerde oorsprongslijst, inclusief een expliciete `CORS_ALLOW_ALL=true` -opt-in. Auth-afwijzingen (401) blijven leesbaar, zodat clients een ingetrokken of verkeerd getypte sleutel (#5242) kunnen weergeven: de eigen 401 van de pijplijn behoudt de echo, en een route die de sleutel zelf weigert nadat de pijplijn deze als anoniem heeft aangeboden (`/v1/models` en `/v1beta/models` met geconfigureerde beheerauthenticatie, de op de eigenaar gerichte `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` en auto-combo kandidaat-routes) voegt de echo aan die 401 toe via `credentialRejectionHeaders()`. De echo wordt ingetoetst op het verzoek met een credential header (`Authorization`, `x-api-key`, `x-goog-api-key` of de `auth_token` cookie), niet op welke van hen de route is gecontroleerd, en is nooit gekoppeld aan `Access-Control-Allow-Credentials`; de body is een vaste foutenvelop. Beheerroutes onder `/api/v1/` bewaakt door `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) maken geen gebruik van deze uitzondering voor het afwijzen van referenties: met `REQUIRE_API_KEY=false` volgen hun 401/403 antwoorden het geconfigureerde CORS oorsprongsbeleid.
- **Cookiesessie (het dashboard):** beschermd door de fail-closed standaard **En** door de afwezigheid van `Access-Control-Allow-Credentials` op het gedeelde pad. Houd management/dashboard oorsprong buiten elke toegestane configuratie; ze moeten precies fail-closed blijven.

## WebSocket -handdrukken (`/v1/responses`, `/v1/ws`)

Browsers passen CORS niet toe op WebSocket, dus de WebSocket transporten die de inferentie-uitvoer retourneren, controleren de handshake `Origin` zelf (`src/server/origin/wsOrigin.ts`): de antwoorden WebSocket (`/v1/responses`) en, wanneer OmniRoute door `npm start` / `npm run dev` loopt, de `/v1/ws` en `/api/v1/ws` brug, die `/v1/chat/completions`, `/v1/messages` en `/v1/responses` als frames streamt. De brug vraagt `/api/v1/ws?handshake=1` om het oordeel en weigert te upgraden tenzij die route de controle heeft doorstaan. Authenticatievereisten zijn nog steeds afzonderlijk van toepassing. De oorsprongscontrole is geslaagd als:

- het heeft geen `Origin` header (Codex CLI, SDKs en andere niet-browserclients);
- de `Origin` wordt toegelaten op de toelatingslijst hierboven (`CORS_ALLOWED_ORIGINS`, de `corsOrigins` instelling, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- de `Origin` is een van de eigen openbare oorsprong van OmniRoute(de geconfigureerde openbare basis URL, de doorgestuurde oorsprong van een vertrouwde proxy, of een directe loopback/LAN host gegeven als een IP letterlijke of `localhost` — dezelfde kandidaten die de dashboardmutatiecontrole gebruikt); of
- het heeft een geldige API sleutel, zoals op het HTTP `/v1/*` oppervlak.

Al het andere krijgt `403 ws_origin_forbidden`. Een dashboardsessiecookie sluit een buitenlandse `Origin` niet uit, omdat de browser deze aan de socket van elke pagina koppelt. `localhost` op een andere poort wordt niet behandeld als dezelfde oorsprong; voeg dergelijke dev-oorsprong toe aan `CORS_ALLOWED_ORIGINS`.

## Voorbeeld: omgekeerde proxy voor OmniRoute

CORS wordt afgedwongen door OmniRoute zelf, dus de proxy zou dat over het algemeen ook moeten doen **niet** `Access-Control-*` headers toevoegen of herschrijven (dubbele headers breken browsers). Beëindig TLS en stuur — door, laat OmniRoute de preflight beantwoorden:

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

Stel de toegestane browseroorsprong in OmniRoute in (`CORS_ALLOWED_ORIGINS` of het tabblad Beveiliging), niet in de proxy.

## Bronbestanden

| Zorg                                             | Bestand                                                              |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Resolutie toelatingslijst + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Middleware-applicatie (single bron van waarheid) | `src/server/authz/pipeline.ts`                                       |
| Instellingen → runtime origin injectie           | `src/lib/config/runtimeSettings.ts`                                  |
| Runtimestatus voor het dashboard                 | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard-waarschuwingsbanner                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Veld CORS Toegestane oorsprong                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per route CORS (de uitzondering)     | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handdruk `Origin` controle             | `src/server/origin/wsOrigin.ts`                                      |

## Zie ook

- [Route Guard-niveaus](./ROUTE_GUARD_TIERS.md) — loopback-handhaving voor routes die geschikt zijn voor spawnen (een afzonderlijke, aanvullende controle).
- [Autorisatiegids](../architecture/AUTHZ_GUIDE.md) — de volledige auth-pijplijn.
