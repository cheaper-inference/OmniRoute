# CORS Configuration & Security (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrolliert welche **Herkunft des Browsers** kann herkunftsübergreifende Antworten aus einer einzigen, zentralen Zulassungsliste lesen. Das Modell ist **standardmäßig fehlgeschlagen** : Es ist kein Ursprung zulässig, bis Sie sich dafür entscheiden. Auf dieser Seite wird dokumentiert, wie die Zulassungsliste aufgelöst wird, was `CORS_ALLOW_ALL=true` tatsächlich offenlegt (und, was wichtig ist, was es tut).**nicht** ), wie man Entwicklung und Produktion sicher konfiguriert, und die Laufzeitwarnung, die das Dashboard anzeigt, wenn ein Platzhalter aktiv ist.

**Quelle der Wahrheit:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Die Zulassungsliste wird einmal angewendet, in der Middleware (`src/server/authz/pipeline.ts`) legen — Pro-Route-Handler `Access-Control-Allow-Origin` nicht selbst fest.

## Wie ein Ursprung aufgelöst wird

Für jede Anfrage berechnet die Middleware den `Access-Control-Allow-Origin` Wert in dieser Reihenfolge:

1. **`CORS_ALLOW_ALL=true`** (oder das alte `CORS_ORIGIN=*`) → gibt den `Origin` des Anrufers zurück (oder `*` wenn kein `Origin` Header vorhanden ist), mit `Vary: Origin`, damit die Caches korrekt bleiben. Derselbe `applyCorsHeaders()` Chokepoint hängt auch `Vary: Accept-Encoding` an jede 2xx-with-body-Antwort auf der tokenauthentifizierten `/v1*`/`/v1beta*` Oberfläche an (`relaxForTokenAuth`, RFC 9110 §12.5.5, Ausgabe #6737), sodass downstream/shared Caches korrekt zwischen komprimierten und unkomprimierten Varianten unterscheiden können.
2. Andernfalls wird die Anforderungs `Origin` normalisiert (Kleinschreibung, abschließender Schrägstrich entfernt) und mit der abgeglichen **zusammengeführte Zulassungsliste** :
   - env **`CORS_ALLOWED_ORIGINS`** — kommagetrennte Liste und
   - die Laufzeit **`corsOrigins`** Einstellung (Dashboard → Security → _CORS Allowed Origins_), injiziert über `setRuntimeAllowedOrigins()` von `src/lib/config/runtimeSettings.ts`.
3. Keine Übereinstimmung →**Es wird kein `Access-Control-Allow-Origin` Header ausgegeben** . Der Browser blockiert das Cross-Origin-Lesen. Dies ist die beabsichtigte Fail-Closed-Standardeinstellung.

| Umgebungsvar           | Bedeutung                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV der genauen Herkunft, um dies zu ermöglichen (empfohlen).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → gibt einen beliebigen Ursprung zurück (Platzhalter). Nur Entwickler.                            |
| `CORS_ORIGIN`          | Vermächtnis. `*` verhält sich wie `CORS_ALLOW_ALL`; Ein einzelner Wert wird zur Zulassungsliste hinzugefügt. |

## Bedrohungsmodell —, was `CORS_ALLOW_ALL=true` wirklich aufdeckt

Die generische OWASP Warnung („Platzhalter CORS = die jede Site als API bezeichnen kann“) ist es wert, ernst genommen zu werden, die Gefährdung durch OmniRoute jedoch schon **schmaler als das generische Gehäuse** , aufgrund einer konkreten Implementierungstatsache:

> **Die zentrale `applyCorsHeaders()` gibt niemals `Access-Control-Allow-Credentials` aus.** Ein Browser stellt keine _credentialed_ (Cookie-tragende) Cross-Origin-Antwort bereit, es sei denn, der Server sendet `Access-Control-Allow-Credentials: true`. Der gemeinsame CORS Pfad von OmniRoute tut dies nie.

Was das pro Fläche bedeutet, auch mit `CORS_ALLOW_ALL=true`:

| Oberfläche                                     | Authentifizierungsmechanismus | Wirkung von Wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`                | Cookie-Sitzung                | Herkunft wird widergespiegelt, aber **ohne `Allow-Credentials`** der Browser **Blöcke** die beglaubigte Lektüre. Eine bösartige Cross-Origin-Site **kann nicht lesen** Ihre authentifizierten Dashboard-Antworten und das Sitzungscookie wird nicht angezeigt.                                                                                                                                                                                                                                                                                                                                             |
| Kunde API `/v1/*`, `/v1beta/*`                 | Träger-/ `x-api-key` -Header  | Schon freizügig **mit Absicht** (`relaxForTokenAuth`): Browser hängen `Authorization`/`x-api-key` nie automatisch an, sodass die Seite eines Angreifers Ihren Schlüssel nicht bereitstellen kann. Das entspannte Echo erfordert einen authentifizierten Betreff (einen validierten API Schlüssel oder eine Dashboard-Sitzung), nicht nur einen Anmeldeinformationsheader, und enthält niemals `Access-Control-Allow-Credentials`. Anonyme Antworten (`REQUIRE_API_KEY=false`) verwenden die konfigurierte Herkunfts-Zulassungsliste, einschließlich einer expliziten `CORS_ALLOW_ALL=true` Opt-in-Antwort. |
| Öffentlich schreibgeschützt (`/api/health`, …) | Keiner                        | Unempfindlich; Platzhalter ist harmlos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Also die **Rest** Die Offenlegung von `CORS_ALLOW_ALL=true` ist beschränkt auf: (a) nicht beglaubigte Cross-Origin **liest** von bereits nicht authentifizierten Daten und (b) das Zulassen von CORS**Preflight-Pass** auf Verwaltungsrouten —, die weiterhin eine Authentifizierung erfordern, die eine Cross-Origin-Seite nicht bereitstellen kann. Es ist **nicht** ein Session-Hijack- oder Zugangsdatendiebstahl-Vektor auf dem gemeinsam genutzten CORS Pfad.

### Eine echte Ausnahme — `/api/v1/agents/`

Die Cloud-Agent-Routen (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) legen ihre fest **eigen** CORS Header (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) und **Tun** Gibt `Access-Control-Allow-Origin: <origin>|*` zusammen mit `Access-Control-Allow-Credentials: true` aus. Dies ist die einzige Oberfläche, auf der Ursprungsecho und Referenzen nebeneinander existieren, und das ist sie auch **unabhängig von `CORS_ALLOW_ALL`** . Diese Routen sind vom Management authentifiziert (`requireManagementAuth`); Betreiber, die das Dashboard außerhalb des Hosts verfügbar machen, sollten sich darüber im Klaren sein, dass dies der einzige Ort ist, an dem ein ursprungsübergreifender Lesevorgang mit Anmeldeinformationen durch die Antwortheader zulässig ist. Die Verschärfung auf eine explizite Zulassungsliste wird separat von dieser CORS Leitlinie verfolgt.

## Checkliste für die Produktion

- **Legen Sie `CORS_ALLOW_ALL=true` niemals in der Produktion fest.** Lassen Sie es deaktiviert.
- Legen Sie eine fest **explizit** Ursprungsliste — entweder die Umgebungsvariable oder das Feld „Sicherheit“:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Wenn OmniRoute hinter einem Reverse-Proxy/Tunnel (Nginx, Caddy, Cloudflare Tunnel, Tailscale) läuft, ist CORS**nicht** Ihr einziger Kontroll- — der Loopback-Route-Guard, schützt weiterhin spawnfähige Routen (siehe [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Fälschen Sie `X-Forwarded-For: 127.0.0.1` nicht, um einen 403-Fehler zu „reparieren“; Dadurch wird die RCE Klasse erneut geöffnet, die Route Guard schließt.
- Bestätigen Sie den Laufzeitstatus: Das Dashboard zeigt a **beständiges bernsteinfarbenes Banner** Wenn `CORS_ALLOW_ALL=true` live ist und `/api/settings/authz-inventory` einen `cors: { allowAll, allowedOrigins }` -Umschlag zurückgibt, können Überwachungstools unter Dashboard → Security → Authorization Inventory abfragen.

## Entwicklungskomfort — ermöglicht spezifische lokale Ursprünge

Selbst in der Entwicklungsumgebung benötigen Sie den Platzhalter selten. Erlauben Sie nur die Entwicklungsserver, die Sie verwenden:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ursprünge werden ohne Berücksichtigung der Groß- und Kleinschreibung abgeglichen, wobei der abschließende Schrägstrich ignoriert wird, sodass `http://localhost:3000` und `http://localhost:3000/` gleichwertig sind. Derselbe CSV kann zur Laufzeit in festgelegt werden **Dashboard → Sicherheit → CORS Zulässige Ursprünge** ohne Neustart.

## API -Schlüssel vs. Cookie-Sitzungen

- **Träger / `x-api-key` (die `/v1/*` Inferenzoberfläche):** Browser hängen diese niemals automatisch an. CORS ist hier keine sinnvolle Barriere. — der API Schlüssel ist die Barriere —, weshalb diese Oberfläche absichtlich freizügig ist, damit Browser- und Electron Clients Antworten lesen können, auf die sie bereits Anspruch haben. Das entspannte Echo erfordert einen authentifizierten Betreff (einen validierten API Schlüssel oder eine Dashboard-Sitzung), nicht nur einen Anmeldeinformationsheader, und enthält niemals `Access-Control-Allow-Credentials`. Anonyme Antworten (`REQUIRE_API_KEY=false`) verwenden die konfigurierte Ursprungs-Zulassungsliste, einschließlich einer expliziten `CORS_ALLOW_ALL=true` Opt-in-Option. Authentifizierungsablehnungen (401) bleiben lesbar, sodass Clients einen widerrufenen oder falsch eingegebenen Schlüssel (#5242) anzeigen können: Der eigene 401 der Pipeline behält das Echo, und eine Route, die den Schlüssel selbst ablehnt, nachdem die Pipeline ihn als anonym bereitgestellt hat (`/v1/models` und `/v1beta/models` mit konfigurierter Verwaltungsauthentifizierung, die besitzerbezogenen `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` und Auto-Combo-Kandidatenrouten) fügt das Echo zu diesem 401 hinzu `credentialRejectionHeaders()`. Das Echo basiert auf der Anfrage, die einen Credential-Header (`Authorization`, `x-api-key`, `x-goog-api-key` oder das `auth_token` Cookie) enthält, und nicht auf dem von der Route überprüften Cookie. Es wird niemals mit `Access-Control-Allow-Credentials` gepaart. Der Körper ist eine feste Fehlerhülle. Verwaltungsrouten unter `/api/v1/` die von `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) geschützt werden, verwenden diese Ausnahme zur Zurückweisung von Anmeldeinformationen nicht: Bei `REQUIRE_API_KEY=false` folgen ihre 401/403 Antworten der konfigurierten CORS Ursprungsrichtlinie.
- **Cookie-Sitzung (das Dashboard):** durch die Fail-Closed-Standardeinstellung geschützt **Und** durch das Fehlen von `Access-Control-Allow-Credentials` auf dem gemeinsamen Pfad. Halten Sie management/dashboard Ursprünge von jeglichen freizügigen Konfigurationen fern; sie müssen exakt geschlossen bleiben.

## WebSocket Handshakes (`/v1/responses`, `/v1/ws`)

Browser wenden CORS nicht auf WebSocket an, daher überprüfen die WebSocket Transporte, die die Inferenzausgabe zurückgeben, den Handshake- `Origin` selbst (`src/server/origin/wsOrigin.ts`): die Antworten WebSocket (`/v1/responses`) und, wenn OmniRoute über `npm start` / `npm run dev` läuft, die `/v1/ws` und `/api/v1/ws` Brücke, die `/v1/chat/completions`, `/v1/messages` und `/v1/responses` als Frames streamt. Die Brücke fragt `/api/v1/ws?handshake=1` nach dem Urteil und weigert sich, ein Upgrade durchzuführen, es sei denn, diese Route hat die Prüfung durchgeführt. Authentifizierungsanforderungen gelten weiterhin gesondert. Die Ursprungsprüfung ist erfolgreich, wenn:

- es hat keinen `Origin` Header (Codex CLI, SDKs und andere Nicht-Browser-Clients);
- Der `Origin` wird durch die obige Zulassungsliste zugelassen (`CORS_ALLOWED_ORIGINS`, die `corsOrigins` Einstellung, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- der `Origin` ist einer der eigenen öffentlichen Ursprünge von OmniRoute(der konfigurierte öffentliche Basis URL, der weitergeleitete Ursprung eines vertrauenswürdigen Proxys oder ein direkter loopback/LAN Host, der als IP Literal oder `localhost` — angegeben wird; dieselben Kandidaten verwendet die Dashboard-Mutationsprüfung); oder
- Es trägt einen gültigen API Schlüssel, wie auf der HTTP `/v1/*` Oberfläche.

Alles andere erhält `403 ws_origin_forbidden`. Ein Dashboard-Sitzungscookie schließt ein fremdes `Origin` nicht aus, da der Browser es an den Socket einer beliebigen Seite anfügt. `localhost` an einem anderen Port wird nicht als gleicher Ursprung behandelt; Fügen Sie solche Entwicklerursprünge zu `CORS_ALLOWED_ORIGINS` hinzu.

## Beispiel: Reverse-Proxy vor OmniRoute

CORS wird von OmniRoute selbst erzwungen, daher sollte dies im Allgemeinen der Proxy tun **nicht** `Access-Control-*` Header hinzufügen oder neu schreiben (doppelte Header machen Browser kaputt). Beenden Sie TLS und leiten Sie — weiter, damit OmniRoute vor dem Flug antworten kann:

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

Legen Sie die zulässigen Browser-Ursprünge in OmniRoute (`CORS_ALLOWED_ORIGINS` oder auf der Registerkarte „Sicherheit“) fest, nicht im Proxy.

## Quelldateien

| Sorge                                         | Datei                                                                |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Zulassungslistenauflösung + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware-Anwendung (Single Source of Truth) | `src/server/authz/pipeline.ts`                                       |
| Einstellungen → Laufzeitursprungsinjektion    | `src/lib/config/runtimeSettings.ts`                                  |
| Laufzeitstatus für das Dashboard              | `src/app/api/settings/authz-inventory/route.ts`                      |
| Warnbanner im Dashboard                       | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Feld „Zulässige CORS Ursprünge“.              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent pro Route CORS (die Ausnahme)     | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket -Handshake `Origin` Prüfung         | `src/server/origin/wsOrigin.ts`                                      |

## Siehe auch

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — -Loopback-Erzwingung für Spawn-fähige Routen (eine separate, ergänzende Kontrolle).
- [Autorisierungsleitfaden](../architecture/AUTHZ_GUIDE.md) — die vollständige Authentifizierungspipeline.
