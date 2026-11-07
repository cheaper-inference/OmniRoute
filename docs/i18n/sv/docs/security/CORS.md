# CORS Configuration & Security (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute styr vilka **webbläsarursprung** som får läsa svar mellan olika ursprung
från en enda, centraliserad tillåtelselista. Modellen är **stängd som standard**:
inget ursprung tillåts förrän du uttryckligen lägger till det. Den här sidan beskriver hur tillåtelselistan
utvärderas, vad `CORS_ALLOW_ALL=true` faktiskt exponerar (och, vilket är viktigt, vad den
**inte** exponerar), hur utvecklings- respektive produktionsmiljöer konfigureras säkert samt den körningsvarning
som instrumentpanelen visar när ett jokertecken är aktivt.

**Primär källa:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Tillåtelselistan tillämpas en gång i
mellanprogramvaran (`src/server/authz/pipeline.ts`) — hanterare för enskilda rutter anger inte själva
`Access-Control-Allow-Origin`.

## Så utvärderas ett ursprung

För varje begäran beräknar mellanprogramvaran värdet för `Access-Control-Allow-Origin`
i följande ordning:

1. **`CORS_ALLOW_ALL=true`** (eller äldre `CORS_ORIGIN=*`) → returnera anroparens
   `Origin` (eller `*` när det inte finns något `Origin`-huvud), med `Vary: Origin`
   så att cachar förblir korrekta. Samma centrala kontrollpunkt, `applyCorsHeaders()`, lägger även till
   `Vary: Accept-Encoding` i varje 2xx-svar med en meddelandetext på den tokenautentiserade
   `/v1*`-/`/v1beta*`-ytan (`relaxForTokenAuth`, RFC 9110 §12.5.5, ärende #6737), så att
   efterföljande/delade cachar kan skilja korrekt mellan komprimerade och okomprimerade
   varianter.
2. Annars normaliseras begärans `Origin` (konverteras till gemener och avslutande snedstreck
   tas bort) och matchas mot den **sammanslagna tillåtelselistan**:
   - miljövariabeln **`CORS_ALLOWED_ORIGINS`** — en kommaseparerad lista, och
   - körningsinställningen **`corsOrigins`** (Instrumentpanel → Säkerhet → _Tillåtna
     CORS-ursprung_), som injiceras via `setRuntimeAllowedOrigins()` från
     `src/lib/config/runtimeSettings.ts`.
3. Ingen matchning → **inget `Access-Control-Allow-Origin`-huvud skickas**. Webbläsaren
   blockerar läsningen mellan olika ursprung. Detta är den avsedda stängda standardinställningen.

| Miljövariabel          | Betydelse                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV-lista med exakta ursprung som ska tillåtas (rekommenderas).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → returnera valfritt ursprung (jokertecken). Endast för utveckling.                        |
| `CORS_ORIGIN`          | Äldre alternativ. `*` fungerar som `CORS_ALLOW_ALL`; ett enskilt värde läggs till i tillåtelselistan. |

## Hotmodell — vad `CORS_ALLOW_ALL=true` verkligen exponerar

Den allmänna OWASP-varningen ("CORS med jokertecken = vilken webbplats som helst kan anropa ditt API") bör
tas på allvar, men OmniRoutes exponering är **mer begränsad än i det allmänna fallet**,
på grund av ett konkret implementeringsfaktum:

> **Den centrala `applyCorsHeaders()` skickar aldrig
> `Access-Control-Allow-Credentials`.** En webbläsare exponerar inte ett _autentiserat_
> svar mellan olika ursprung (som innehåller cookies) om inte servern skickar
> `Access-Control-Allow-Credentials: true`. OmniRoutes gemensamma CORS-sökväg gör
> aldrig det.

Detta innebär följande för varje yta, även med `CORS_ALLOW_ALL=true`:

| Yta                                       | Autentiseringsmekanism    | Effekt av CORS med jokertecken                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instrumentpanel / MANAGEMENT `/api/*`     | Cookiesession             | Ursprunget returneras, men **utan `Allow-Credentials`** **blockerar** webbläsaren den autentiserade läsningen. En skadlig webbplats med ett annat ursprung **kan inte läsa** dina autentiserade svar från instrumentpanelen, och sessionscookien exponeras inte.                                                                                             |
| Klient-API `/v1/*`, `/v1beta/*`           | Bearer-/`x-api-key`-huvud | Redan tillåtande **avsiktligt** (`relaxForTokenAuth`): webbläsare bifogar aldrig `Authorization`/`x-api-key` automatiskt, så en angripares sida kan inte tillhandahålla din nyckel. Ursprunget returneras bara när den angivna nyckeln har validerats; anonyma svar (`REQUIRE_API_KEY=false`) behåller tillåtelselistan. `CORS_ALLOW_ALL` utökar inte detta. |
| Offentlig skrivskyddad (`/api/health`, …) | Ingen                     | Icke-känslig; jokertecken är ofarligt.                                                                                                                                                                                                                                                                                                                       |

Den **kvarvarande** exponeringen med `CORS_ALLOW_ALL=true` är alltså begränsad till: (a)
oautentiserade läsningar mellan olika ursprung av data som redan är tillgängliga utan autentisering, och (b)
att CORS-**förhandskontroller godkänns** på hanteringsrutter — vilka fortfarande kräver autentisering
som en sida med ett annat ursprung inte kan tillhandahålla. Det är **inte** en vektor för sessionskapning eller
stöld av autentiseringsuppgifter i den gemensamma CORS-sökvägen.

### Ett verkligt undantag — `/api/v1/agents/`

Cloud-Agent-rutterna (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) anger
sina **egna** CORS-huvuden
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) och skickar **faktiskt**
`Access-Control-Allow-Origin: <origin>|*` tillsammans med
`Access-Control-Allow-Credentials: true`. Detta är den enda ytan där
returnering av ursprung och autentiseringsuppgifter förekommer samtidigt, och den är **oberoende av
`CORS_ALLOW_ALL`**. Dessa rutter är hanteringsautentiserade
(`requireManagementAuth`); operatörer som exponerar instrumentpanelen utanför värddatorn bör vara
medvetna om att detta är det enda stället där svarshuvudena tillåter en autentiserad läsning mellan
olika ursprung. En skärpning till en explicit tillåtelselista hanteras
separat från denna CORS-vägledning.

## Checklista för produktion

- **Ange aldrig `CORS_ALLOW_ALL=true` i produktion.** Lämna den odefinierad.
- Ange en **explicit** lista över ursprung — antingen via miljövariabeln eller fältet på fliken Säkerhet:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Om OmniRoute körs bakom en omvänd proxy/tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) är CORS **inte** din enda kontroll — ruttskyddet för
  loopback skyddar fortfarande rutter som kan starta processer (se
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Förfalska inte
  `X-Forwarded-For: 127.0.0.1` för att ”åtgärda” ett 403-fel; det öppnar återigen
  den RCE-klass som ruttskyddet stänger.
- Bekräfta körningstillståndet: instrumentpanelen visar en **permanent
  bärnstensfärgad banderoll** under Instrumentpanel → Säkerhet →
  Auktoriseringsinventering när `CORS_ALLOW_ALL=true` är aktivt, och
  `/api/settings/authz-inventory` returnerar ett
  `cors: { allowAll, allowedOrigins }`-hölje som övervakningsverktyg kan avfråga.

## Bekvämlighet vid utveckling — tillåt specifika lokala ursprung

Du behöver sällan jokertecknet, ens under utveckling. Tillåt endast de
utvecklingsservrar du använder:

```bash
# Utvecklingsservrarna Vite (5173) och Next.js (3000) som anropar en lokal OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ursprung matchas skiftlägesokänsligt och avslutande snedstreck ignoreras, så
`http://localhost:3000` och `http://localhost:3000/` är likvärdiga. Samma
CSV-lista kan anges under körning i **Instrumentpanel → Säkerhet → Tillåtna
CORS-ursprung** utan omstart.

## API-nycklar kontra cookiesessioner

- **Bearer / `x-api-key` (`/v1/*`-inferensytan):** webbläsare bifogar aldrig dessa
  automatiskt. CORS utgör inget meningsfullt hinder här — API-nyckeln är hindret
  — vilket är anledningen till att den ytan avsiktligt är tillåtande så att
  webbläsar- och Electron-klienter kan läsa svar som de redan har rätt till.
  Den tillåtande ursprungsreturneringen följer den validerade nyckeln, inte enbart att
  huvudet finns: när `REQUIRE_API_KEY=false` betjänar en begäran anonymt behåller dess
  lyckade svar den tillåtelselista som nekar som standard. Autentiseringsavslag (401)
  förblir läsbara så att klienter kan visa en återkallad eller felskriven nyckel (#5242):
  pipelinens egen 401 behåller ursprungsreturneringen, och en rutt som själv avvisar
  nyckeln efter att pipelinen har betjänat begäran som anonym (`/v1/models` och
  `/v1beta/models` när hanteringsautentisering är konfigurerad, de ägarbegränsade
  `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` och rutterna för
  auto-combo-kandidater) lägger till ursprungsreturneringen i den 401:an via
  `credentialRejectionHeaders()`. Returneringen styrs av att begäran bär ett
  autentiseringshuvud (`Authorization`, `x-api-key`, `x-goog-api-key` eller cookien
  `auth_token`), inte av vilket av dem rutten kontrollerade, och kombineras aldrig med
  `Access-Control-Allow-Credentials`; brödtexten är ett fast felkuvert. Hanteringsrutter
  under `/api/v1/` som skyddas av `requireManagementAuth()` (`/api/v1/management/*`,
  `/api/v1/registered-keys`) lägger inte till returneringen: med `REQUIRE_API_KEY=false`
  går deras 401/403 inte att läsa från ett annat ursprung.
- **Cookiesession (instrumentpanelen):** skyddas av standardinställningen som
  nekar vid fel **och** av avsaknaden av `Access-Control-Allow-Credentials` på
  den delade sökvägen. Undanta ursprung för hantering/instrumentpanelen från alla
  tillåtande konfigurationer; de måste fortsätta att neka vid fel utan undantag.

## WebSocket-handskakningar (`/v1/responses`, `/v1/ws`)

Webbläsare tillämpar inte CORS på WebSocket, så de WebSocket-transporter som returnerar
inferensutdata kontrollerar själva handskakningens `Origin`
(`src/server/origin/wsOrigin.ts`): Responses-WebSocketen (`/v1/responses`) och, när
OmniRoute körs via `npm start` / `npm run dev`, bryggan `/v1/ws` och `/api/v1/ws`, som
strömmar `/v1/chat/completions`, `/v1/messages` och `/v1/responses` som ramar. Bryggan
frågar `/api/v1/ws?handshake=1` om utslaget och vägrar uppgradera om inte den rutten
har kört kontrollen. En handskakning accepteras när:

- den saknar `Origin`-huvud (Codex CLI, SDK:er och andra klienter som inte är webbläsare);
- `Origin` godkänns av tillåtelselistan ovan (`CORS_ALLOWED_ORIGINS`, inställningen
  `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` är ett av OmniRoutes egna offentliga ursprung (den konfigurerade offentliga
  bas-URL:en, en betrodd proxys vidarebefordrade ursprung eller en direkt
  loopback-/LAN-värd angiven som IP-literal eller `localhost` — samma kandidater som
  instrumentpanelens mutationskontroll använder); eller
- den bär en giltig API-nyckel, precis som på HTTP-ytan `/v1/*`.

Allt annat får `403 ws_origin_forbidden`. En sessionscookie för instrumentpanelen
undantar inte ett främmande `Origin`, eftersom webbläsaren bifogar den till varje sidas
socket. `localhost` på en annan port behandlas inte som samma ursprung; lägg till
sådana utvecklingsursprung i `CORS_ALLOWED_ORIGINS`.

## Exempel: omvänd proxy framför OmniRoute

CORS tillämpas av OmniRoute självt, så proxyn bör i allmänhet **inte** lägga till eller
skriva om `Access-Control-*`-rubriker (dubbla rubriker orsakar problem i webbläsare). Terminera TLS
och vidarebefordra — låt OmniRoute besvara preflight-förfrågningar:

```nginx
# nginx — vidarebefordra till OmniRoute; injicera INTE Access-Control-* här
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Behåll vidarebefordringsrubrikerna: en proxy på samma värd ansluter från loopback, och det är
    # de som talar om för OmniRoute att anroparen inte är den lokala operatören. En proxy som inte lägger till någon av dem
    # får alla fjärranropare att se lokala ut. Ange heller aldrig X-Forwarded-For som 127.0.0.1.
}
```

Ange de tillåtna webbläsarursprungen i OmniRoute (`CORS_ALLOWED_ORIGINS` eller fliken
Säkerhet), inte i proxyn.

## Källfiler

| Område                                               | Fil                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Upplösning av tillåtelselista + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Tillämpning av mellanprogram (enda sanningskälla)    | `src/server/authz/pipeline.ts`                                       |
| Inställningar → injicering av ursprung under körning | `src/lib/config/runtimeSettings.ts`                                  |
| Körningsstatus för instrumentpanelen                 | `src/app/api/settings/authz-inventory/route.ts`                      |
| Varningsbanderoll på instrumentpanelen               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Fält för tillåtna CORS-ursprung                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Routningsspecifik CORS för Cloud-Agent (undantaget)  | `src/lib/cloudAgent/api.ts`                                          |
| Kontroll av `Origin` vid WebSocket-handskakning      | `src/server/origin/wsOrigin.ts`                                      |

## Se även

- [Nivåer för ruttskydd](./ROUTE_GUARD_TIERS.md) — loopback-tillämpning för
  rutter som kan starta processer (en separat, kompletterande kontroll).
- [Auktoriseringsguide](../architecture/AUTHZ_GUIDE.md) — hela autentiseringsflödet.
