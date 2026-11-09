# CORS Configuration & Security (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontroluje które **pochodzenie przeglądarki** może odczytywać odpowiedzi pochodzące z różnych źródeł z jednej, scentralizowanej listy dozwolonych. Model jest **domyślnie zamknięte w trybie awaryjnym** : żadne źródło nie jest dozwolone, dopóki się na to nie zgodzisz. Ta strona dokumentuje, w jaki sposób lista dozwolonych rozwiązuje problemy, co faktycznie ujawnia `CORS_ALLOW_ALL=true` (i, co ważne, co robi **nie** ), jak bezpiecznie skonfigurować programowanie i produkcję oraz ostrzeżenie w czasie wykonywania na pulpicie nawigacyjnym, gdy aktywny jest symbol wieloznaczny.

**Źródło prawdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Lista dozwolonych jest stosowana jednorazowo, w oprogramowaniu pośrednim (`src/server/authz/pipeline.ts`) — procedury obsługi poszczególnych tras nie ustawiają same `Access-Control-Allow-Origin`.

## Jak rozwiązuje się pochodzenie

Dla każdego żądania oprogramowanie pośredniczące oblicza wartość `Access-Control-Allow-Origin` w następującej kolejności:

1. **`CORS_ALLOW_ALL=true`** (lub starsze `CORS_ORIGIN=*`) → odbija echo `Origin` wywołującego (lub `*` gdy nie ma nagłówka `Origin` ), z `Vary: Origin`, więc pamięci podręczne pozostają poprawne. Ten sam chokepoint `applyCorsHeaders()` dołącza również `Vary: Accept-Encoding` do każdej odpowiedzi 2xx-with-body na uwierzytelnionej tokenem powierzchni `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, wydanie #6737), więc pamięci podręczne downstream/shared mogą poprawnie rozróżniać warianty skompresowane i nieskompresowane.
2. W przeciwnym razie żądanie `Origin` jest normalizowane (małe litery i usuwany ukośnik końcowy) i dopasowywane do **połączona lista dozwolonych** :
   - śr **`CORS_ALLOWED_ORIGINS`** Lista rozdzielana przecinkami — i
   - czas wykonania **`corsOrigins`** ustawienie (Dashboard → Security → _CORS dozwolone Origins_), wstrzyknięte przez `setRuntimeAllowedOrigins()` z `src/lib/config/runtimeSettings.ts`.
3. Nie pasuje →**nie jest emitowany żaden nagłówek `Access-Control-Allow-Origin`** . Przeglądarka blokuje odczyt między źródłami. Jest to zamierzona wartość domyślna w przypadku zamknięcia awaryjnego.

| Kop. zm                | Oznaczający                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV dokładnego pochodzenia, aby umożliwić (zalecane).                                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → odzwierciedla dowolne pochodzenie (znak wieloznaczny). Tylko Dev.                                |
| `CORS_ORIGIN`          | Dziedzictwo. `*` zachowuje się jak `CORS_ALLOW_ALL`; do listy dozwolonych zostanie dodana pojedyncza wartość. |

## Model zagrożenia — który tak naprawdę ujawnia `CORS_ALLOW_ALL=true`

Ogólne ostrzeżenie OWASP („dzika karta CORS = każda witryna może wywołać Twoje API”) warto potraktować poważnie, ale narażenie OmniRoute jest **węższy niż przypadek ogólny** , ze względu na jeden konkretny fakt dotyczący wdrożenia:

> **Centralny `applyCorsHeaders()` nigdy nie emituje `Access-Control-Allow-Credentials`.** Przeglądarka nie udostępni _credentialed_ (zawierającej pliki cookie) odpowiedzi między źródłami, chyba że serwer wyśle `Access-Control-Allow-Credentials: true`. Wspólna ścieżka CORS OmniRoute nigdy tego nie robi.

Co to oznacza w przeliczeniu na powierzchnię, nawet w przypadku `CORS_ALLOW_ALL=true`:

| Powierzchnia                                  | Mechanizm uwierzytelniania     | Wpływ symbolu wieloznacznego CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deska rozdzielcza / MANAGEMENT `/api/*`       | Sesja cookie                   | Pochodzenie jest powtarzane, ale **bez `Allow-Credentials`** przeglądarkę **bloki** uwierzytelniony odczyt. Szkodliwa witryna pochodząca z różnych źródeł **nie mogę czytać** Twoje uwierzytelnione odpowiedzi na panelu kontrolnym, a plik cookie sesji nie jest ujawniany.                                                                                                                                                                                                                                                                                       |
| Klient API `/v1/*`, `/v1beta/*`               | Nagłówek nośnika / `x-api-key` | Już pobłażliwy **rozmyślnie** (`relaxForTokenAuth`): przeglądarki nigdy nie dołączają automatycznie `Authorization`/`x-api-key`, więc strona atakującego nie może dostarczyć Twojego klucza. Zrelaksowane echo wymaga uwierzytelnionego tematu (zweryfikowanego klucza API lub sesji pulpitu nawigacyjnego), a nie tylko nagłówka poświadczenia i nigdy nie zawiera `Access-Control-Allow-Credentials`. Odpowiedzi anonimowe (`REQUIRE_API_KEY=false`) korzystają ze skonfigurowanej listy dozwolonych pochodzenia, łącznie z wyraźną zgodą `CORS_ALLOW_ALL=true`. |
| Publiczny tylko do odczytu (`/api/health`, …) | Nic                            | Niewrażliwy; symbol wieloznaczny jest nieszkodliwy.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Więc **pozostały** Ekspozycja `CORS_ALLOW_ALL=true` jest ograniczona do: (a) nieuwierzytelnionego pochodzenia krzyżowego **czyta** już nieuwierzytelnionych danych oraz (b) umożliwienie CORS**przepustka przed lotem** na trasach zarządzania —, które nadal wymagają uwierzytelnienia, którego nie może zapewnić strona z innego źródła. To jest **nie** wektor przejęcia sesji lub kradzieży danych uwierzytelniających na współdzielonej ścieżce CORS.

### Jeden prawdziwy wyjątek — `/api/v1/agents/`

Trasy Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ustawiają swoje **własny** Nagłówki CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **Do** emituj `Access-Control-Allow-Origin: <origin>|*` razem z `Access-Control-Allow-Credentials: true`. Jest to pojedyncza powierzchnia, na której współistnieją echo pochodzenia i referencje, i tak właśnie jest **niezależny od `CORS_ALLOW_ALL`** . Trasy te są uwierzytelniane przez kierownictwo (`requireManagementAuth`); operatorzy, którzy udostępniają pulpit nawigacyjny poza hostem, powinni mieć świadomość, że jest to jedyne miejsce, w którym nagłówki odpowiedzi pozwalają na odczyt poświadczeń między źródłami. Zaostrzenie go do wyraźnej listy dozwolonych jest śledzone oddzielnie od niniejszych wytycznych CORS.

## Lista kontrolna produkcji

- **Nigdy nie uruchamiaj `CORS_ALLOW_ALL=true` w produkcji.** Pozostaw to nieskonfigurowane.
- Ustaw **wyraźny** lista pochodzenia — pole env var lub pole zakładki Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jeśli OmniRoute działa za odwrotnym proxy/tunelem (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS jest **nie** twoja jedyna kontrola — strażnik trasy z pętlą zwrotną nadal chroni trasy z możliwością odrodzenia (patrz [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nie fałszuj `X-Forwarded-For: 127.0.0.1`, aby „naprawić” 403; który ponownie otwiera klasę RCE, którą zamyka strażnik trasy.
- Potwierdź stan środowiska wykonawczego: na pulpicie nawigacyjnym pojawi się a **trwały bursztynowy sztandar** w obszarze Dashboard → Security → Authorization Inventory za każdym razem, gdy `CORS_ALLOW_ALL=true` jest aktywne, a `/api/settings/authz-inventory` zwraca narzędzia do monitorowania koperty `cors: { allowAll, allowedOrigins }`, które mogą odpytywać.

## Wygoda zabudowy — pozwala na specyficzne lokalne pochodzenie

Rzadko potrzebujesz symbolu wieloznacznego nawet w wersji deweloperskiej. Zezwalaj tylko na serwery deweloperskie, których używasz:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Początki są dopasowywane bez uwzględniania wielkości liter, a końcowy ukośnik jest ignorowany, więc `http://localhost:3000` i `http://localhost:3000/` są równoważne. To samo CSV można ustawić w czasie wykonywania w **Deska rozdzielcza → Security → CORS Dozwolone pochodzenie** bez ponownego uruchomienia.

## Klucze API a sesje plików cookie

- **Nośnik / `x-api-key` (powierzchnia wnioskowania `/v1/*` ):** przeglądarki nigdy nie dołączają ich automatycznie. CORS nie jest tutaj znaczącą barierą. — klucz API jest barierą —, dlatego ta powierzchnia jest celowo zezwalająca, aby klienci przeglądarki i Electron mogli czytać odpowiedzi, do których już mają prawo. Zrelaksowane echo wymaga uwierzytelnionego tematu (zweryfikowanego klucza API lub sesji pulpitu nawigacyjnego), a nie tylko nagłówka poświadczenia i nigdy nie zawiera `Access-Control-Allow-Credentials`. Odpowiedzi anonimowe (`REQUIRE_API_KEY=false`) korzystają ze skonfigurowanej listy dozwolonych pochodzenia, łącznie z wyraźną zgodą `CORS_ALLOW_ALL=true`. Odrzucenia uwierzytelnienia (401) pozostają czytelne, dzięki czemu klienci mogą uzyskać unieważniony lub błędnie wpisany klucz (#5242): własny 401 potoku przechowuje echo, a trasa, która sama odrzuca klucz po tym, jak potok obsłuży go jako anonimowy (`/v1/models` i `/v1beta/models` ze skonfigurowaną autoryzacją zarządzania, trasami `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` i auto-combo o zasięgu właściciela) dodaje echo do tego 401 poprzez `credentialRejectionHeaders()`. Echo jest wprowadzane na żądanie niosące nagłówek poświadczenia (`Authorization`, `x-api-key`, `x-goog-api-key` lub plik cookie `auth_token` ), a nie na tym, który z nich sprawdza trasę, i nigdy nie jest sparowane z `Access-Control-Allow-Credentials`; treść jest stałą kopertą błędu. Ścieżki zarządzania w `/api/v1/` strzeżone przez `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) nie korzystają z tego wyjątku odrzucenia poświadczeń: w przypadku `REQUIRE_API_KEY=false` ich odpowiedzi 401/403 są zgodne ze skonfigurowaną polityką pochodzenia CORS.
- **Sesja cookies (pulpit nawigacyjny):** chroniony przez domyślne zamknięcie awaryjne **I** przez brak `Access-Control-Allow-Credentials` na współdzielonej ścieżce. Trzymaj pochodzenie management/dashboard z dala od jakiejkolwiek zezwalającej konfiguracji; muszą pozostać dokładnie zamknięte.

## Uściski dłoni WebSocket (`/v1/responses`, `/v1/ws`)

Przeglądarki nie stosują CORS do WebSocket, więc transporty WebSocket, które zwracają wyjście wnioskowania, same sprawdzają uzgadnianie `Origin` (`src/server/origin/wsOrigin.ts`): odpowiedzi WebSocket (`/v1/responses`) i, gdy OmniRoute przebiega przez `npm start` / `npm run dev`, most `/v1/ws` i `/api/v1/ws`, który przesyła strumieniowo `/v1/chat/completions`, `/v1/messages` i `/v1/responses` jako ramki. Most zwraca się do `/api/v1/ws?handshake=1` o werdykt i odmawia modernizacji, chyba że trasa ta przeszła kontrolę. Wymogi dotyczące uwierzytelniania nadal obowiązują osobno. Kontrola pochodzenia przechodzi pomyślnie, gdy:

- nie ma nagłówka `Origin` (Codex CLI, SDKs i inni klienci niebędący przeglądarkami);
- `Origin` jest dopuszczone przez powyższą listę dozwolonych (`CORS_ALLOWED_ORIGINS`, ustawienie `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` jest jednym z publicznych źródeł OmniRoute(skonfigurowana publiczna baza URL, przekazane źródło zaufanego proxy lub bezpośredni host loopback/LAN podany jako literał IP lub `localhost` — ci sami kandydaci, których używa sprawdzanie mutacji w panelu kontrolnym); Lub
- zawiera ważny klucz API, tak jak na powierzchni HTTP `/v1/*`.

Wszystko inne dostaje `403 ws_origin_forbidden`. Plik cookie sesji panelu kontrolnego nie zwalnia obcego `Origin`, ponieważ przeglądarka podłącza go do gniazda dowolnej strony. `localhost` na innym porcie nie jest traktowane jako tego samego pochodzenia; dodaj takie źródła deweloperów do `CORS_ALLOWED_ORIGINS`.

## Przykład: odwrotne proxy przed OmniRoute

CORS jest egzekwowane przez samo OmniRoute, więc serwer proxy generalnie powinien **nie** dodaj lub przepisz nagłówki `Access-Control-*` (podwójne nagłówki psują przeglądarki). Zakończ TLS i przekaż —, aby OmniRoute odpowiedział przed lotem:

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

Ustaw dozwolone źródła przeglądarki w OmniRoute (`CORS_ALLOWED_ORIGINS` lub zakładka Bezpieczeństwo), a nie w proxy.

## Pliki źródłowe

| Obawa                                                               | Plik                                                                 |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Rozwiązanie listy dozwolonych + `getCorsStatus()`                   | `src/server/cors/origins.ts`                                         |
| Aplikacja oprogramowania pośredniczącego (pojedyncze źródło prawdy) | `src/server/authz/pipeline.ts`                                       |
| Ustawienia wtrysku źródła środowiska wykonawczego →                 | `src/lib/config/runtimeSettings.ts`                                  |
| Stan środowiska wykonawczego pulpitu nawigacyjnego                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Baner ostrzegawczy na desce rozdzielczej                            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Pole Dozwolone źródła CORS                                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent na trasę CORS (wyjątek)                                 | `src/lib/cloudAgent/api.ts`                                          |
| Uścisk dłoni WebSocket Kontrola `Origin`                            | `src/server/origin/wsOrigin.ts`                                      |

## Zobacz także

- [Poziomy Straży Trasy](./ROUTE_GUARD_TIERS.md) Egzekwowanie pętli zwrotnej — dla tras obsługujących spawnowanie (oddzielna, uzupełniająca kontrola).
- [Przewodnik po autoryzacji](../architecture/AUTHZ_GUIDE.md) — proces pełnego uwierzytelniania.
