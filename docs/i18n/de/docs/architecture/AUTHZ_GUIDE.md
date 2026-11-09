# Authorization Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Maßgebliche Quelle:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Zuletzt aktualisiert:** 2026-09-22 — Scope-Namespaces verweisen auf MCP-SERVER.md

OmniRoute verfügt über eine routenabhängige Autorisierungspipeline, die jede API-Anfrage absichert. Die Klassifizierung ist **deterministisch** und erfolgt nach dem **Fail-Closed-Prinzip** — alles, was nicht klassifiziert werden kann, wird als `MANAGEMENT` eingestuft und erfordert eine Sitzung oder ein Token mit Berechtigungen auf Management-Ebene. Diese Seite erläutert das Modell für Entwickler, die Routen verwalten oder neue Endpunkte entwerfen.

![Autorisierungspipeline (3 Routenklassen + Richtlinienauswertung)](../diagrams/exported/authz-pipeline.svg)

> Quelle: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Zwei Authentifizierungsmodi

### 1. API-Schlüssel (Bearer)

Wird für die mit OpenAI/Anthropic/Gemini kompatiblen Client-APIs und einige Verwaltungsrouten verwendet, wenn der Schlüssel den `manage`-Scope besitzt.

```
Authorization: Bearer <api-key>
```

Wird durch `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` validiert und über `src/shared/utils/apiAuth.ts` erneut exportiert. Der Validator akzeptiert außerdem die Umgebungsvariablen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` als dauerhafte Passthrough-Schlüssel (Issue #1350).

### 2. Dashboard-Sitzung (auth_token-Cookie)

Für Dashboard-Seiten und Admin-Operationen.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ein Cookie ist nur dann eine Sitzung, wenn das JWT erfolgreich verifiziert wird **und** `authenticated: true` enthält
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Jeder
Consumer des Cookies (Dashboard-Route-Guard (`isDashboardSessionAuthenticated()`), Aktualisierung
der Authz-Pipeline, WebSocket-Handshake, Live-Server,
`/api/settings/require-login`, `/api/auth/status`) verwendet diesen Helper.
Es gibt weitere mit `JWT_SECRET` signierte JWTs — der Cursor-CLI-Passthrough erstellt
für Schlüsselinhaber Tokens mit `iss "omniroute" / aud "cursor-cli"` — und diese sind niemals Sitzungen
(#13298).

Wird durch `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts` verifiziert. Die Pipeline aktualisiert das JWT automatisch, wenn es in seiner 30-tägigen Gültigkeitsdauer noch weniger als 7 Tage gültig ist.

Eine Sitzung kann auch vor Ablauf der 30 Tage enden, da jeder Aussteller `mintDashboardSessionToken` verwendet (mit einem Ausstellungszeitpunkt `iat` und einer ID `jti`) und der Verifier zwei Einstellungen prüft: `sessionsValidAfter`, die bei einer Passwortänderung gesetzt wird, sodass jede zuvor ausgestellte Sitzung nicht mehr verifiziert wird (der Browser, in dem das Passwort geändert wurde, erhält ein neues Cookie), sowie `revokedDashboardSessions`, zu der `POST /api/auth/logout` die `jti` der abgemeldeten Sitzung hinzufügt. Sitzungen, die von einer älteren Version ausgestellt wurden, enthalten keinen dieser beiden Claims und bleiben bis zur ersten Passwortänderung gültig. Wenn die Einstellungen nicht gelesen werden können, wird der Sitzung nicht vertraut.

Einige Verwaltungsrouten akzeptieren **beide** Modi: Cookie ODER `Bearer <key>`, wenn der API-Schlüssel den `manage`- (oder `admin`-)Scope besitzt. Dies ermöglicht den in v3.8 eingeführten Workflow „über API-Aufrufe konfigurierbar“.

#### Optionales OIDC-Login-Gate (#6973)

Die Dashboard-Admin-Anmeldung unterstützt neben der standardmäßigen Passwortanmeldung auch einen **opt-in**-OIDC-(OpenID-Connect-)Flow
— die Passwortanmeldung wird niemals entfernt, sondern nur
ergänzt:

- Deaktiviert, sofern `settings.oidcEnabled === true` **und** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nicht alle konfiguriert sind (Einstellungen → Auth).
  `GET /api/auth/oidc/login` gibt andernfalls `400` zurück.
- `GET /api/auth/oidc/login` ermittelt den `authorization_endpoint` aus der
  `/.well-known/openid-configuration` des Issuers (fällt auf
  `<issuer>/authorize` zurück), erstellt die Redirect-URI aus der eingehenden
  Anfrage (`x-forwarded-proto`-aware) und leitet mit einem zufälligen `state`,
  der in einem `httpOnly`-Cookie namens `oidc_state` gespeichert wird, zum IdP
  weiter.
- `GET /api/auth/oidc/callback` validiert `state`, tauscht den
  Autorisierungscode aus und verifiziert die Signatur des ID-Tokens über die
  JWKS des Issuers (`createRemoteJWKSet` von `jose`, pro JWKS-URI
  zwischengespeichert) mit Prüfungen von `issuer` und `audience`. Für die
  Dashboard-Zulassung ist eine nichtleere Liste `oidcAllowedSubjects`, eine
  Richtlinie `oidcAdmissionClaim` oder beides erforderlich. Die Subjektliste
  gleicht `sub` oder `email` nur ab, wenn `email_verified === true` ist. Die
  optionale Claim-Richtlinie verwendet einen durch Punkte getrennten Pfad zu
  einem ID-Token-Claim (zum Beispiel `realm_access.roles`) sowie ein Array
  akzeptierter Werte; der aufgelöste Claim muss ein Array aus Zeichenfolgen
  sein, das mindestens einen akzeptierten Wert enthält. Wenn beide Richtlinien
  konfiguriert sind, müssen beide erfüllt sein. Fehlende oder fehlerhaft
  formatierte Claims führen zu einer Ablehnung, und ohne eine der beiden
  Richtlinien verweigert der Callback die Anmeldung (`not_configured`).
  Bestehende Konfigurationen, die ausschließlich auf Subjekten basieren,
  bleiben unverändert.
- Keycloak ordnet Realm-Rollen normalerweise Zugriffstoken zu, nicht
  unbedingt ID-Tokens. Um die Realm-Rolle `admin` zu verlangen, konfigurieren
  Sie für diesen Client einen Protocol Mapper, der `realm_access.roles` in
  **dessen ID-Token** aufnimmt, und setzen Sie anschließend
  `oidcAdmissionClaim` auf `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Überprüfen Sie den tatsächlichen ID-Token-Claim für diesen Client, bevor Sie
  eine ausschließlich rollenbasierte Zulassung aktivieren; die Anwendung liest
  keine Rollen aus Zugriffstoken. Eine tokenbezogene Ablehnung auf IdP-Seite
  kann diese anwendungsseitige Prüfung ergänzen, aber nicht ersetzen.
- Bei Erfolg wird dasselbe **exakte** 30-Tage-`auth_token`-JWT ausgestellt, das
  auch die kennwortbasierte Anmeldung ausstellt
  (`src/app/api/auth/login/route.ts`). Dadurch bleibt der übrige
  Dashboard-Sitzungspfad (automatische Erneuerung, Cookie-Flags) unverändert —
  OIDC ersetzt nur die Art, wie das Cookie ausgestellt wird, nicht die damit
  gewährten Berechtigungen. Änderungen an IdP-Rollen oder -Gruppen machen
  bestehende OmniRoute-Sitzungen nicht ungültig; Abmeldung,
  Kennwortänderung oder Sitzungsablauf bestimmen weiterhin deren Lebensdauer.
- Jede `oidc*`-Einstellung (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ist in
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) enthalten:
  `PATCH /api/settings` antwortet mit `400 PASSWORD_REQUIRED`, sofern der Body
  nicht das Verwaltungspasswort als `currentPassword` enthält
  (`401 PASSWORD_MISMATCH`, wenn es falsch ist).
  `oidcDisablePasswordLogin` verweigert die Kennwortanmeldung
  (`POST /api/auth/login`), behält aber den gespeicherten Kennwort-Hash bei;
  auch die erneute Authentifizierung prüft `currentPassword` dagegen.
- `corsOrigins` und `bruteForceProtection` befinden sich ebenfalls in
  `SECURITY_IMPACTING_SETTINGS_KEYS`: Eine Lockerung schwächt die
  Anmeldeschutzmaßnahmen, daher erfordern sie dieselbe erneute
  Authentifizierung mit `currentPassword` (die Registerkarte „Sicherheit“
  fragt danach), und der JSON-Import lässt sie weg.
- Jeder Sicherheitsschlüssel — die Einträge in
  `SECURITY_IMPACTING_SETTINGS_KEYS`, jeder `oidc*`-Schlüssel und der Zustand
  der Dashboard-Sitzung — ist bei `PATCH /api/settings` **ausschließlich für
  Betreiber** bestimmt: Ein API-Schlüssel mit Manage-Bereich oder ein
  `oma_`-Zugriffstoken wird mit `403` abgelehnt, selbst wenn das korrekte
  `currentPassword` übermittelt wird. Die Ablehnung wird als
  `settings.update_failed` mit `reason: OPERATOR_REQUIRED` protokolliert
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`).
  Gewöhnliche Einstellungen (Design, Anzeigeeinstellungen) bleiben für einen
  `manage`-Schlüssel oder ein `admin`-Zugriffstoken schreibbar. Jede Änderung an
  `/api/settings` selbst (sowie an `/api/settings/require-login`) erfordert
  außerdem den `admin`-Bereich des Zugriffstokens
  (`ADMIN_MUTATION_EXACT_PATHS` in `src/server/authz/accessScopes.ts`,
  Abgleich mit dem exakten Pfad); `GET` bleibt bei `read`, und die übrigen
  `/api/settings/*`-Unterrouten (Proxies, Combo-Standardeinstellungen,
  Modell-Aliase, Komprimierung, Bereinigungen …) behalten den aus der Methode
  abgeleiteten `write`-Bereich.
- `POST /api/settings/import-json` überspringt diese erneute Authentifizierung
  und entfernt daher vor dem Schreiben jeden Schlüssel aus
  `IMPORT_STRIPPED_SETTINGS_KEYS` (dieselbe Datei): das Kennwort und
  `currentPassword`, jeden Eintrag aus `SECURITY_IMPACTING_SETTINGS_KEYS`
  sowie den Zustand der Dashboard-Sitzung
  (`sessionsValidAfter`, `revokedDashboardSessions`). Der Import einer älteren
  Sicherung kann daher keine Sitzung wiederbeleben, die durch eine
  Kennwortänderung oder eine Abmeldung bereits beendet wurde.

#### Optionale TOTP-Zwei-Faktor-Anmeldung (#16619)

Wird unter Einstellungen → Sicherheit eingerichtet und bleibt deaktiviert, bis
der Betreiber sie aktiviert
(`src/server/auth/dashboardMfa.ts`).

- **Was abgedeckt ist:** Passwortanmeldung (`POST /api/auth/login`, die anschließend
  `POST /api/auth/mfa/verify` benötigt) und `omniroute connect` (`POST /api/cli/connect`,
  das einen reinen Passwortaustausch ablehnt und den Code als `totp` entgegennimmt).
- **Was nicht abgedeckt ist:** OIDC-/SSO-Anmeldung (`/api/auth/oidc/callback`) fragt
  nicht nach dem OmniRoute-TOTP. Sie verwendet den eigenen zweiten Faktor des
  Identitätsanbieters. Wenn OIDC aktiviert ist, muss MFA daher beim IdP erzwungen werden.
- **Wiederherstellung** (verlorenes Gerät, keine Wiederherstellungscodes mehr oder ein
  Faktor, der nicht mehr verifiziert werden kann, beispielsweise nachdem sich
  `STORAGE_ENCRYPTION_KEY` geändert hat):
  1. Starten Sie den Server mit `OMNIROUTE_DISABLE_MFA=true` neu.
  2. Melden Sie sich direkt auf dem Host (Loopback-Peer und Loopback-`Host`, z. B.
     `http://localhost:20128`) mit dem Passwort an. Der zweite Faktor wird nur für diesen
     Ursprung übersprungen; für jeden anderen Ursprung ist der Code weiterhin erforderlich.
  3. Geben Sie unter Einstellungen → Sicherheit → Deaktivieren das Passwort ein und
     lassen Sie den Code leer. `POST /api/auth/mfa/disable` akzeptiert einen Body ohne
     `code` nur, solange die Variable gesetzt ist und die Anfrage vom Host stammt. Die
     Dashboard-Sitzung und das aktuelle Passwort sind weiterhin erforderlich. Außerdem
     wird der Vorgang als `auth.mfa.disabled` mit `secondFactor: "recovery_switch"`
     protokolliert.
  4. Heben Sie die Setzung von `OMNIROUTE_DISABLE_MFA` auf, starten Sie den Server neu
     und führen Sie die Registrierung bei Bedarf erneut durch.

## Routenklassen

`src/server/authz/types.ts` definiert drei Klassen. Jede Route, die sich nicht eindeutig klassifizieren lässt, fällt auf `MANAGEMENT` zurück.

| Klasse       | Beschreibung                                                                                                                                                      | Authentifizierung erforderlich                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `PUBLIC`     | Ausdrücklich sichere Routen: Login, Logout, Status, Initialisierung, Health-Check, Onboarding-Bootstrap.                                                          | Keine                                                                            |
| `CLIENT_API` | Endpunkte zur Modellbereitstellung: `/api/v1/*`, `/api/v1beta/*`, plus die Aliase `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-Schlüssel, wenn das wirksame Feature-Flag `REQUIRE_API_KEY` aktiviert ist |
| `MANAGEMENT` | Dashboard-Seiten, Einstellungen, Provider, Schlüssel, Admin- und Diagnose-Endpunkte.                                                                              | Dashboard-Sitzung ODER Bearer mit Scope `manage`                                 |

Einige Aktionen der Klasse `MANAGEMENT` sind **nur für Operatoren** zugänglich: Ein Schlüssel mit `manage` reicht nicht aus. Das Exportieren gespeicherter Zugangsdaten (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), das Wiederherstellen eines Backups über die aktiven Daten (`POST /api/db-backups/import` einschließlich `dryRun=true`, `POST /api/db-backups` mit Wiederherstellung per ID, `POST /api/settings/import-json`) sowie das Vernichten von Wiederherstellungspunkten (`DELETE /api/db-backups` zur Bereinigung und `PATCH /api/db-backups`, da die darin gespeicherte Aufbewahrung die automatische Bereinigung nach jedem Backup steuert) erfordern eine Dashboard-Sitzung, die lokale CLI-Identität oder deaktivierte Anmeldung. Das Ausstellen eines Sync-Tokens (`POST /api/sync/tokens`) und das Prägen eines CLI-Access-Tokens mit Scope `admin` (`POST /api/cli/tokens`) erfordern in jedem Anmeldemodus eine Dashboard-Sitzung oder die lokale CLI-Identität. API-Schlüssel jedes Scopes und `oma_`-Access-Tokens sind keine Operator-Zugangsdaten: Wo eines davon erforderlich ist, erhalten sie `403`. Die Prüfung liegt in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Auch das Ändern der Anmeldeeinstellungen ist nur für Operatoren möglich: `POST /api/settings/require-login` (Verwaltungspasswort setzen / `requireLogin` umschalten) akzeptiert, sobald ein Passwort existiert, ausschließlich diese Zugangsdaten. Das Bootstrap-Fenster der Erstinbetriebnahme (noch kein Passwort) bleibt unverändert. Eine Dashboard-Sitzung muss `currentPassword` senden, um das Passwort zu ersetzen (`403`, wenn es fehlt oder falsch ist, protokolliert als `settings.update_failed`). Die lokale CLI und eine Instanz mit deaktivierter Anmeldung behalten den Wiederherstellungspfad und dürfen ein Passwort ohne diesen Schritt setzen, da beide an den Host gebunden sind, der das Datenverzeichnis besitzt.

## Pipeline

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Vertrauenswürdige interne Header (definiert in `src/server/authz/headers.ts`) sind** von eingehenden Anfragen ausgeschlossen** Vor der Klassifizierung können — Clients `x-omniroute-auth-*` nicht vorab ausfüllen, um sich als Subjekt auszugeben.

### Policenverträge

Jede Routenklasse hat eine Richtlinie in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — gibt immer `allow({ kind: "anonymous", id: "anonymous" })` zurück.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahiert Bearer und validiert über `validateApiKey()`. Fällt nur dann auf „Anonym“ durch, wenn das effektive `REQUIRE_API_KEY` Feature-Flag deaktiviert ist. Das effektive Flag wird durch `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) aufgelöst, sodass Dashboard-Feature-Flags und Umgebungsvariablen `/api/v1/*`, `/api/v1beta/*` und Aliase konsistent steuern. Resolver-Ausfälle schlagen fehl. Ermöglicht Dashboard-Sitzungsanfragen auf Client- API Routen (einschließlich `/api/v1/models`, das vom Dashboard-Modellkatalog verwendet wird). Wenn Entra ID SSO aktiviert ist, wird ein Bearer, der strukturell ein Entra-Token ist (drei base64url-Segmente, `RS*` alg, `kid`), vom SSO Zweig verarbeitet** vor** `validateApiKey()` und sein Urteil ist endgültig — es fällt niemals auf den API-Schlüsselpfad oder den Degrade-to-anonymous-Zweig durch, sodass ein Ausfall des Identitätsanbieters nicht zu offenem Zugriff werden kann. Statische API Schlüssel sind davon nicht betroffen. Siehe [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — akzeptiert Dashboard-Sitzungen, interne Modellsynchronisierungsanforderungen (abgeglichen mit `/api/providers/[name]/(sync-models|models)`) oder überspringt vollständig, wenn `isAuthRequired()` „false“ zurückgibt. Gibt 403 (`AUTH_001`) zurück, wenn ein Bearer-Token vorhanden, aber ungültig ist, andernfalls 401. Erzwingt außerdem die Route-Guard-Stufen (LOCAL_ONLY / ALWAYS_PROTECTED) vor jedem Authentifizierungszweig — siehe [Route Guard-Stufen](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY Pfade in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (heute: `/api/mcp/`) kann von Nicht-Loopback aus zugegriffen werden, wenn der Bearer-Schlüssel den `manage` Bereich trägt; Alle anderen LOCAL_ONLY -Pfade bleiben unabhängig vom Bereich strikt-Loopback.

Eine erfolgreiche Richtlinie gibt `AuthSubject` mit `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` zurück. Downstream-Handler können es über `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` lesen, anstatt die Authentifizierungslogik erneut ausführen zu müssen.

## Liste der öffentlichen Routen

`src/shared/constants/publicApiRoutes.ts` ist die explizite Allowlist:

Die Liste ist nach **Form** aufgeteilt, und diese Aufteilung ist sicherheitsrelevant (GHSA-74g9-q8f6-793h): Ein Präfix
wird mit `startsWith()` abgeglichen und stimmt daher auch mit jedem benachbarten Pfad überein, der dieselben
führenden Zeichen enthält. Das Präfix `/api/usage/om-usage` markierte `/api/usage/om-usage<anything>` als PUBLIC, und Next löst
dies zu `/api/usage/[connectionId]` auf — einem Handler ohne eigene Authentifizierung.

```ts
// Echte Teilbäume. Jeder Eintrag MUSS mit "/" enden (wird durch einen Unit-Test überprüft).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // in classify als CLIENT_API behandelt, nicht als "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Einzelne Routen, die EXAKT abgeglichen werden (mit oder ohne abschließenden Schrägstrich).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // Login-Schritt 2 für optional aktiviertes TOTP; benötigt das MFA-pending-Cookie
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Schreibgeschützte Einzelrouten, die ebenfalls die CORS-Ursprungslockerung erhalten.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Schreibgeschützte Einzelroute OHNE CORS-Ursprungslockerung.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Schreibgeschützte Routen sind **nur** für sichere Methoden öffentlich. Hinweis: `classifyRoute()` schließt `/api/v1/*` und `/api/v1beta/*` vom PUBLIC-Fallback aus — diese sind immer `CLIENT_API`, sodass die Bearer-Key-Richtlinie weiterhin gilt.

## Hinzufügen einer neuen Route

### Muster 1 — Öffentlicher Client-API-Endpunkt (Bearer-Authentifizierung)

Routen unter `/api/v1/` und `/api/v1beta/` werden automatisch als `CLIENT_API` klassifiziert. Die Middleware erzwingt die Bearer-Prüfung; Routen-Handler müssen sie nicht erneut durchführen, können bei Bedarf jedoch das Subjekt auslesen.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... Handler-Logik
}
```

### Muster 2 — Verwaltungsendpunkt (Sitzung oder Bearer + manage)

Verwenden Sie `requireManagementAuth()` aus `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... Handler-Logik
}
```

`requireManagementAuth()` gibt bei Erfolg `null` zurück, andernfalls eine JSON-Fehler-`Response`:

- 401 `AUTH_001` „Authentifizierung erforderlich“ — keinerlei Anmeldedaten vorhanden
- 403 — ungültiger Bearer **oder** Bearer vorhanden, aber dem Schlüssel fehlt der Scope `manage` / `admin`

`hasManageScope(scopes)` gibt für `"manage"` oder `"admin"` true zurück.

### Muster 3 — Hinzufügen zur öffentlichen Positivliste

Wählen Sie die Menge anhand der Form aus, nicht nach Bequemlichkeit. Eine einzelne Route gehört in `PUBLIC_API_ROUTES_EXACT` (oder bei ausschließlich per GET aufrufbaren Routen in `PUBLIC_READONLY_CORS_API_ROUTES`); nur ein echter Unterbaum gehört in `PUBLIC_API_ROUTE_PREFIXES`, und er **muss mit `/` enden**. Wird eine einzelne Route in die Präfixliste aufgenommen, werden dadurch auch alle benachbarten Pfade veröffentlicht, die dieselben führenden Zeichen aufweisen — einschließlich später hinzugefügter Geschwister mit dynamischen Segmenten (GHSA-74g9-q8f6-793h). Aktualisieren Sie die Unit-Tests unter `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` und `tests/unit/authz/classify.test.ts`.

## Scopes

Drei Namensräume. Jede Prüfung liest nur ihre eigenen Zeichenfolgen. Die Gegenüberstellung,
einschließlich der Gründe, warum `manage` bei `scopeMatches` für `read:compression` fehlschlägt und warum ein
`read`-Zugriffstoken `PATCH /api/keys/{id}` nicht aufrufen kann, finden Sie unter
[Drei Scope-Namensräume](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-Schlüssel enthalten ein `scopes`-Array (als JSON in `api_keys.scopes` gespeichert, siehe `src/lib/db/apiKeys.ts`).

### Verwaltungs-Scope

- `manage` / `admin` — `hasManageScope`. Bearer-Zugriff auf Routen der Verwaltungs-API.
- `mcp:connect`, `self:usage`, `self:account-quota` und
  `policy:bypass-provider-quota` sind additive Scopes mit exakter Übereinstimmung. Sie liegen
  außerhalb von `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` öffnet nur die
  Nicht-Loopback-Ausnahme für `/api/mcp/`.

### MCP-Tool-Scopes

Katalog und Abgleichregeln (identische Zeichenfolge oder ein gewährter Scope, der mit `*` endet):
[MCP-Tool-Scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` ist die ursprüngliche typisierte
Teilmenge, nicht der vollständige Katalog. Die Durchsetzung erfolgt in
`open-sse/mcp-server/scopeEnforcement.ts`, nachdem `resolveCallerScopeContext()`
die Scopes aus MCP-Authentifizierungsinformationen, Anfragemetadaten oder `OMNIROUTE_MCP_SCOPES`
ermittelt hat. Sie bleibt deaktiviert, sofern nicht `OMNIROUTE_MCP_ENFORCE_SCOPES=true` gesetzt ist.

### Zugriffstoken-Scopes

`read` / `write` / `admin` für `oma_live_…`-Token, eingestuft durch `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Diese Rangfolge gilt nur für die Zugriffstoken-
Anmeldeinformationen. Siehe [Verwaltungsauthentifizierung](../guides/MANAGEMENT-AUTH.md).

## Schalter für erforderliche Authentifizierung

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` entscheidet, ob für eine Anfrage **irgendeine** Authentifizierung erzwungen wird:

- `settings.requireLogin === false` → die Authentifizierung ist global deaktiviert, mit Ausnahme der immer geschützten Stufe (siehe [Route-Guard-Stufen](../security/ROUTE_GUARD_TIERS.md)) und der Aufrufe, die ein Credential ausgeben, das die Anmeldung akzeptiert. Diese benötigen dasselbe Credential wie bei aktivierter Anmeldung: das Ausstellen von Sync-Tokens, das Prägen von CLI-Access-Tokens mit beliebigem Scope sowie das Erstellen eines API-Schlüssels mit Scope `manage`/`admin`, das Gewähren dieses Scopes an einen Schlüssel oder das Erneuern bzw. Anzeigen eines solchen Schlüssels (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Reine Inferenz-Schlüssel bleiben offen.
- Kein Passwort konfiguriert **und** keine Umgebungsvariable `INITIAL_PASSWORD` → der Bootstrap-Modus erlaubt den Onboarding-Assistenten und Loopback-Anfragen, aber exponierte Netzwerkanfragen benötigen weiterhin Credentials.
- Jeder DB-Fehler → schlägt sicher fehl (fail-closed, sicherer Standard).

Die Durchsetzung der Client-API-Schlüssel verwendet `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts` und nicht einen direkten Lesezugriff auf `process.env.REQUIRE_API_KEY`. Das ist für produktive Instanzen wichtig: Wird `REQUIRE_API_KEY` unter Dashboard → Feature-Flags umgeschaltet, speichert das eine Überschreibung in der Datenbank und wirkt sofort auf `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` und die übrigen Client-API-Prüfungen, die diesen Helper teilen. Kann der Speicher der Feature-Flags nicht gelesen werden, schlägt die Client-API-Authentifizierung fehl und verlangt einen Schlüssel.

## Inkompatible Änderung — v3.8.0

Die Endpunkte `/api/v1/agents/tasks/*` und `/api/resilience/model-cooldowns` **erfordern jetzt eine Management-Authentifizierung** (Commit `588a0333`). Clients, die bisher einen normalen API-Schlüssel ohne den Scope `manage` gesendet haben, erhalten `403`. Migration: Weisen Sie dem Schlüssel entweder im API Keys Dashboard den Scope `manage` zu oder verwenden Sie eine angemeldete Dashboard-Sitzung.

## Verhaltensänderung — v3.8.2

`/api/mcp/*` (der Remote-MCP-Server) ist standardmäßig weiterhin LOCAL_ONLY, akzeptiert nun jedoch Nicht-Loopback-Anfragen, wenn der Header `Authorization: Bearer <api-key>` den Scope `manage` enthält. Die Ausnahme wird explizit pro Pfad über `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts` gesteuert; das verwandte LOCAL_ONLY-Präfix `/api/cli-tools/runtime/*` kann absichtlich NICHT umgangen werden, da es beliebige Unterprozesse starten kann. Anonyme Anfragen aus Nicht-Loopback-Quellen an `/api/mcp/*` erhalten weiterhin `403 LOCAL_ONLY` — für jeden neuen LOCAL_ONLY-Pfad gilt standardmäßig weiterhin die strikte Beschränkung auf Loopback. Siehe [Route-Guard-Stufen](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tests

- Unit-Tests: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Öffentliche Positivliste: `tests/unit/public-api-routes.test.ts`.
- Gezielt ausführen: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debuggen

Die Pipeline stempelt Antworten immer mit:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Für authentifizierte Anfragen enthalten die Upstream-Anfrage-Header (Handlerseite) außerdem Folgendes:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Verwenden Sie `assertAuth(req, expectedClass)` innerhalb der Handler — Es löst `AuthzAssertionError` mit dem Code `AUTHZ_NOT_INITIALIZED` aus, wenn die Middleware umgangen wurde (hilfreich zum Erkennen von Konfigurationsregressionen in Tests).

## Siehe auch

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — Authentifizierungskennzeichnung pro Endpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — Auditprotokoll für Authentifizierungsereignisse
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — drei Scope-Namensräume und MCP-Tool-Scope-Katalog
- Quelle: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
