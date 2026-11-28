# Public Credentials Handling (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

title: "Obsługa publicznych poświadczeń"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Obsługa publicznych poświadczeń

> **Source of truth:** `open-sse/utils/publicCreds.ts`
> **Tests:** `tests/unit/publicCreds.test.ts`
> **Last updated:** 2026-06-28 — v3.8.40
> **Audience:** Inżynierowie integrujący providerów, którzy udostępniają publiczne OAuth client_id / client_secret / klucze Firebase Web API w swoich publicznych CLI.
> **Status:** **OBOWIĄZKOWE** dla każdego nowego kodu, który osadza identyfikatory upstream.

## Po co to istnieje

- [OAuth 2.0 for native apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret dla zainstalowanych aplikacji są publiczne; rzeczywiste bezpieczeństwo zapewnia PKCE.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — identyfikatory klientów Web są publiczne z założenia.

OmniRoute musi osadzać te wartości, aby użytkownicy, którzy nie konfigurują `.env`, nadal mieli działający flow OAuth od razu po uruchomieniu. Bez wbudowanego fallbacku providerzy Gemini / Antigravity przestają działać dla każdego, kto idzie ścieżką „po prostu sklonuj i uruchom”.

Jednak literały w stylu `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` są łapane przez **GitHub Secret Scanning**, **Semgrep** i podobne skanery wzorców. Każdy release zamienia się w szum fałszywych alarmów, push protection blokuje legalne commity, a operatorzy tracą zaufanie do feedu alertów.

Helper `open-sse/utils/publicCreds.ts` rozwiązuje oba ograniczenia naraz:

- Osadza publiczny identyfikator jako **sekwencję bajtów zamaskowaną XOR** (brak wzorca skanera w źródle).
- Dekoduje w runtime przez `decodePublicCred` / `resolvePublicCred`.
- Wykrywa surowe wartości z dobrze znanymi prefiksami (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) i przepuszcza je bez zmian, dzięki czemu użytkownicy z surowymi wartościami w istniejącym `.env` działają dalej przy **zerowej migracji**.

To jest **obfuskacja, nie szyfrowanie.** Każdy, kto czyta źródło, może odzyskać wartość — i to jest w porządku, bo wartość jest publiczna z założenia. Jedynym celem jest uniknięcie dopasowań regex skanerów.

## Obowiązkowy wzorzec

### 1. Dodawanie nowego publicznego poświadczenia

Gdy musisz osadzić nową wartość dostarczoną przez upstream, która:

- pochodzi z publicznego CLI / aplikacji desktopowej / bundla przeglądarkowego, **oraz**
- upstream provider dokumentuje ją (lub traktuje) jako publiczny identyfikator klienta, **oraz**
- skaner wzorców w przeciwnym razie by ją złapał (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` itd.),

…postępuj według tej checklisty:

1. Wygeneruj zamaskowaną sekwencję bajtów:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Dodaj nowy wpis do `EMBEDDED_DEFAULTS` w `open-sse/utils/publicCreds.ts` z **neutralną nazwą klucza** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` itd.). **Nie** używaj w helperze nazw w stylu `client_secret` ani `api_key` — te słowa uruchamiają reguły Semgrep generic-secret.

3. Dodaj `keyof typeof EMBEDDED_DEFAULTS` do publicznej unii typów (jest wnioskowany automatycznie).

4. W kodzie konsumenckim zamień zahardkodowany literał na:

   ```ts
   // single env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // multiple env aliases (first non-empty wins)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // no env override (always embedded default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Usuń literał z `.env.example` (zastąp dokumentacją wyłącznie w komentarzach, wskazującą czytelników tutaj):

   ```dotenv
   # ── Provider (Google / Firebase / etc.) ──
   # Public OAuth credentials are baked into the code via
   # open-sse/utils/publicCreds.ts. Set these vars only to use your own.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Zaktualizuj `tests/unit/publicCreds.test.ts`, dodając asercję kształtu dla nowego klucza (weryfikuj format, nie literał wartości — wzorzec w istniejących testach).

7. **Nigdy** nie dodawaj literałów `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` do plików testowych. Używaj stałych `FAKE_*` zbudowanych z fragmentów `.join("")` (patrz istniejące testy).

### 2. Konsumenci

- **Czytaj wyłącznie z `resolvePublicCred()` / `resolvePublicCredMulti()`** — nigdy nie wywołuj `decodePublicCredBytes()` bezpośrednio poza helperem.
- Helper jest celowo tani (liniowy XOR na bajtach) i bezpieczny do wywołania w czasie ładowania modułu; domyślne wartości są liczone raz.
- Override ze zmiennej env zawsze wygrywa. Jeśli użytkownik ustawi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, helper przepuszcza tę surową wartość bez zmian.

### 3. Zabronione wzorce

❌ **Nigdy** nie rób żadnej z poniższych rzeczy w kodzie produkcyjnym (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// BAD: literal value triggers Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// BAD: base64 of the literal — GitHub still detects since Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// BAD: string concatenation that re-assembles the pattern at runtime
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// BAD: hex/ROT13 encoding — different obfuscation, same risk of detection
clientSecret: hexDecode("474f4353..."),
```

Wszystkie te warianty w końcu odpala skaner. Używaj `resolvePublicCred()`.

❌ **Nigdy** nie dodawaj literałów poświadczeń do `.env.example`. Użytkownicy, którzy potrzebują prawdziwych wartości upstream, mogą je wyciągnąć z publicznego CLI sami albo użyć własnej rejestracji OAuth.

❌ **Nigdy** nie odrzucaj nowego alertu secret-scanning bez wcześniejszego sprawdzenia, czy poświadczenie nie powinno trafić do tego helpera.

## Powiązane kontrole

- `RAW_VALUE_PATTERN` w `publicCreds.ts` wylicza prefiksy uruchamiające passthrough (retrokompatybilność). Rozszerzaj go wyłącznie o udokumentowane formaty publicznych poświadczeń, nigdy o sekrety własnościowe.
- `.env.example` jest objęty skryptem CI `check-env-doc-sync` — gdy usuniesz tu zmienną, upewnij się, że dokumentacja się zgadza.
- Oba zestawy testów `npm run test:vitest` oraz `node --import tsx/esm --test tests/unit/publicCreds.test.ts` muszą pozostać zielone.

## Kiedy NIE używać tego helpera

Ten helper jest **wyłącznie** dla poświadczeń, które są:

1. Publicznie dystrybuowane przez upstream providera (binarka CLI, bundel przeglądarkowy, oficjalna dokumentacja).
2. Udokumentowane lub silnie sugerowane jako niepoufne (chronione PKCE, klucz Firebase Web, podobne).

Dla wszystkiego innego — tokeny wydane przez operatora, sekrety per-tenant, client_secret Twojej własnej aplikacji OAuth, klucze szyfrowania, sekrety JWT, hasła do bazy — używaj **wyłącznie zmiennych env** (`process.env.FOO`, fallback `||` do pustego / jawnego błędu). Te wartości należą do `.env` i do [szyfrowanego magazynu poświadczeń](./COMPLIANCE.md), nie do źródeł.

## Referencje

- [Google: OAuth 2.0 dla aplikacji natywnych](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: klucze API do identyfikacji klienta](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Sekretne skanowanie obsługiwane sekrety](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: wykrywanie tokenów base64 (luty 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Zatwierdź wprowadzenie tego pomocnika: `1a39c31f` — _fix(security): maskuj publiczne uprawnienia nadrzędne + scentralizuj usuwanie błędów_
