# Kiro Setup Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

title: "Przewodnik konfiguracji Kiro"
---

# Przewodnik konfiguracji Kiro

Ten przewodnik opisuje dodawanie kont Kiro (hostowany w AWS asystent AI do kodowania) do OmniRoute,
ze szczególnym uwzględnieniem jednoczesnej pracy wielu kont bez konfliktów sesji.

---

## Tło: dlaczego konta Kiro mogą wchodzić w konflikt

Backend Kiro używa rejestracji klientów AWS SSO OIDC do śledzenia aktywnych sesji.
Kluczowe ograniczenie: **każda rejestracja klienta OIDC obsługuje tylko jedną aktywną
sesję naraz**. Gdy drugie urządzenie lub użytkownik uwierzytelnia się przy użyciu tego
samego zarejestrowanego klienta, backend unieważnia refresh token pierwszego konta.

To ten sam mechanizm, który powoduje problemy przy uruchomieniu `kiro-cli login` na
maszynie, na której jest już zalogowane inne konto Kiro — nowe logowanie unieważnia
token pierwszego konta.

---

## Jak OmniRoute to rozwiązuje (v3.8.0+)

Od v3.8.0 OmniRoute wywołuje `registerClient()` (AWS SSO OIDC) przy każdym
imporcie połączenia Kiro. Dzięki temu każde połączenie OmniRoute ma własną, dedykowaną
rejestrację klienta OIDC. Ponieważ rejestracje klientów są od siebie niezależne,
odświeżanie lub ponowne uwierzytelnienie jednego konta nie wpływa na refresh token
żadnego innego konta.

Izolacja dotyczy metod importu opartych o refresh token, a autoryzacja kluczem API
całkowicie unika sesji odświeżania OIDC:

| Metoda importu                                    | Status izolacji                                                                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC device-code flow             | Izolowana od momentu wprowadzenia flow device-code                                                       |
| **Import Token** (ręcznie wklejony refresh token) | Izolowana od v3.8.0                                                                                      |
| **Google / GitHub social login**                  | Izolowana od v3.8.0                                                                                      |
| **Auto-Import** (kiro-cli SQLite)                 | Izolowana od v3.8.0 (ścieżka SQLite była już izolowana; fallback SSO-cache jest teraz również izolowany) |
| **API Key** (długoterminowy klucz CodeWhisperer)  | Brak sesji odświeżania; klucz jest walidowany i przechowywany jako poświadczenie bearer                  |

---

## Uwaga migracyjna dla połączeń utworzonych przed v3.8.0

Połączenia zaimportowane przed v3.8.0 nie mają dedykowanej rejestracji klienta OIDC
zapisanej w `providerSpecificData`. Nadal działają, ale korzystają ze współdzielonego
endpointu odświeżania social-auth, więc dwa takie połączenia mogą nadal wzajemnie się
unieważniać.

**Aby uzyskać izolację:** usuń stare połączenie w **Dashboard → Providers** i
zaimportuj je ponownie dowolnym obsługiwanym flow importu. Wszystkie nowo utworzone
połączenia automatycznie otrzymają własną rejestrację klienta.

---

## Dodawanie dwóch kont Kiro obok siebie

### Wymagania wstępne

- OmniRoute v3.8.0 lub nowszy.
- Działające konto Kiro (e-mail + hasło, Google lub logowanie GitHub).
- Opcjonalnie drugie konto Kiro.

### Krok 1: Zaimportuj pierwsze konto

1. Otwórz **Dashboard → Providers → Add Provider → Kiro**.
2. Wybierz jedną z opcji:
   - **Import Token** — wklej refresh token zaczynający się od `aorAAAAAG`.
   - **API Key** — wklej długoterminowy klucz API Kiro / CodeWhisperer.
   - **Google / GitHub login** — dokończ flow OAuth w przeglądarce.
   - **Auto-Import** — kliknij przycisk; OmniRoute odczyta poświadczenia z
     lokalnej bazy kiro-cli lub z `~/.aws/sso/cache`.
3. Połączenie zostaje zapisane. Flow oparte o refresh token automatycznie rejestrują
   dedykowanego klienta OIDC. Flow klucza API walidują klucz w AWS i nie przechowują refresh tokena.

### Krok 2: Zaimportuj drugie konto

Powtórz krok 1 dla drugiego konta. Ponieważ każdy import tworzy osobną rejestrację
klienta OIDC, oba połączenia są w pełni izolowane.

### Krok 3: Sprawdź, czy oba połączenia są aktywne

1. **Dashboard → Providers** — oba połączenia Kiro powinny mieć status **Active**.
2. **Dashboard → Health** — oba połączenia powinny przejść sprawdzenie zdrowia tokena.

### Krok 4: Użyj combo do routingu między kontami

Utwórz combo z oboma połączeniami jako celami, aby równoważyć obciążenie lub przełączać się awaryjnie między nimi:

```
kiro/kiro-dev → kiro/kiro-pro
```

Zobacz [FEATURES.md](./FEATURES.md) oraz dokumentację routingu dotyczącą konfiguracji combo.

---

## Użytkownicy Enterprise / IDC

Dla kont AWS IAM Identity Center (IDC) użyj flow **AWS Builder ID / IDC device-code**
z **Dashboard → Providers → Kiro → Device Code**. Flow device-code był zawsze w pełni
izolowany. Ponowny import tych połączeń nie jest potrzebny.

Użytkownicy enterprise pracujący w innym niż domyślny regionie AWS mogą podać region
przy imporcie przez Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Pole `region` domyślnie ma wartość `us-east-1`, gdy zostanie pominięte.

---

## Przepływ importowania klucza API

Uwierzytelnianie za pomocą klucza API jest przeznaczone dla długoterminowych danych uwierzytelniających typu bearer usługi Kiro / AWS CodeWhisperer. Nie korzysta ono
z odświeżania OAuth, dzięki czemu pozwala uniknąć unieważniania współdzielonej sesji OIDC.

### Panel

1. Otwórz **Panel -> Dostawcy -> Kiro**.
2. Wybierz **Klucz API**.
3. Wklej klucz API i wybierz region AWS: **Automatyczne wykrywanie** (domyślnie), **Wschodnie
   stany USA (Północna Wirginia)** lub **Europa (Frankfurt)**.
4. OmniRoute weryfikuje klucz i zapisuje połączenie przypisane do regionu, w którym
   klucz działa.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "auto"}'
```

`region` akceptuje `auto` (domyślnie), `us-east-1` lub `eu-central-1`; każda inna wartość
jest odrzucana z kodem HTTP 400.

### Kontrakt wewnętrzny

Trasa API weryfikuje klucz, wywołując `KiroService.validateApiKey()`, która
wywołuje `GET https://q.<region>.amazonaws.com/ListAvailableModels?origin=AI_EDITOR`
(interfejs Amazon Q używany do wnioskowania za pomocą klucza API) z limitem czasu 10 s dla każdego regionu. W
trybie `auto` najpierw sprawdzany jest `us-east-1`, a następnie `eu-central-1`; zapisywany jest pierwszy region,
który zaakceptuje klucz. Jeśli klucz zostanie odrzucony we wszystkich regionach kandydujących, import kończy się
niepowodzeniem z kodem HTTP 400. Następnie podejmowana jest opcjonalna próba wywołania `ListAvailableProfiles`
w celu wykrycia opcjonalnego `profileArn` (AWS odmawia dostępu w przypadku większości kluczy API).

Zapisane połączenie używa:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

W czasie wykonywania `KiroExecutor.buildHeaders()` wysyła klucz jako
`Authorization: Bearer <key>` i dodaje `tokentype: API_KEY`. Wywołania dotyczące limitów/profili
używają tego samego znacznika, dzięki czemu AWS traktuje dane typu bearer jako długoterminowy klucz API, a nie
token dostępu OIDC lub społecznościowy. `KiroExecutor.execute()` wysyła żądania wnioskowania za pomocą klucza API wyłącznie
do `https://q.<region>.amazonaws.com/generateAssistantResponse` — w tym do `us-east-1`
— ponieważ brama IDE Kiro odrzuca `TokenType=API_KEY`, a
`codewhisperer.us-east-1` odrzuca ładunki klucza API jako nieprawidłową treść żądania (HTTP 400).

---

## Wygaśnięcie klienta OIDC

Publiczne klienty AWS SSO OIDC zwykle wygasają po 90 dniach
(`clientSecretExpiresAt`). OmniRoute przechowuje ten znacznik czasu w `providerSpecificData`
na potrzeby obserwowalności. Jeśli połączenie przestanie się odświeżać po ok. 90 dniach,
zaimportuj je ponownie, aby uzyskać świeżą rejestrację klienta OIDC. Automatyczna
ponowna rejestracja po wygaśnięciu jest planowana jako przyszłe usprawnienie.

Połączenia oparte o klucz API nie mają wygaśnięcia klienta OIDC, ponieważ nie
odświeżają się przez AWS SSO OIDC.

---

## Rozwiązywanie problemów

### Drugie konto wciąż jest wylogowywane

- Sprawdź oba połączenia w **Dashboard → Providers** i upewnij się, że każde ma
  niepuste `clientId` w surowym JSON (widoczne przez ikonę informacji). Jeśli któremukolwiek
  połączeniu brakuje `clientId`, zostało zaimportowane przed v3.8.0 — zaimportuj je ponownie.

### Import kończy się błędem "Token validation failed"

- Upewnij się, że refresh token zaczyna się od `aorAAAAAG`.
- Upewnij się, że OmniRoute może dotrzeć do `https://oidc.us-east-1.amazonaws.com` (lub
  skonfigurowanego regionu). Jeśli jesteś za proxy firmowym, ustaw proxy na poziomie
  providera w **Dashboard → Settings → Proxies**.

### Import klucza API kończy się niepowodzeniem

- Potwierdź, że klucz to klucz API Kiro / CodeWhisperer, a nie refresh token.
- Potwierdź, że region AWS odpowiada kluczowi/kontu. Domyślnie jest to `us-east-1`.
- Klucz musi móc wywołać `ListAvailableProfiles`; w przeciwnym razie OmniRoute nie może
  rozwiązać wymaganego `profileArn`.

W przypadku innych problemów zobacz główny plik [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
