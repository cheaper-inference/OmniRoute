---
title: "Marketplace wtyczek"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Marketplace wtyczek

> **Źródło prawdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` oraz
> `src/app/(dashboard)/dashboard/plugins/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute dostarcza system wtyczek w stylu WordPressa. Wtyczki to samodzielne
katalogi — każdy z manifestem `plugin.json` i plikiem wejściowym — które wpinają
się w potok żądań (`onRequest` / `onResponse` / `onError`) oraz w
zdarzenia cyklu życia (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Marketplace wtyczek** to warstwa odkrywania na wierzchu tego systemu. Udostępnia
przeglądalny katalog instalowalnych wtyczek. Domyślnie katalog to mały wbudowany
rejestr seed; operator może wskazać własny zdalny URL rejestru — wtedy pobieranie
jest utwardzone przez ochronę SSRF z resolucją DNS
(zob. [Bezpieczeństwo](#bezpieczeństwo)).

Każda trasa wtyczek jest **tylko loopback** (Tier 1 — `LOCAL_ONLY`): wtyczki ładują
i wykonują kod w procesach potomnych, więc trasy są niedostępne z
źródła spoza loopbacka niezależnie od uwierzytelnienia. Zob.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Jak to pasuje Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Warstwa rejestru** — `src/lib/plugins/marketplace.ts`: listuje/przeszukuje katalog, w przypadku jakichkolwiek niepowodzeń powraca do rejestru nasion.
- **Warstwa cyklu życia** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instaluj, aktualizuj, aktywuj, dezaktywuj, odinstaluj, skanuj, uruchamiaj ładowanie.
- **Warstwa jawna** — `src/lib/plugins/manifest.ts`: schemat Zod, wartości domyślne + dla `plugin.json`.
- **Skaner** — `src/lib/plugins/scanner.ts`: odkrywa wtyczki na dysku w katalogu wtyczek.
- **Ładowarka** — `src/lib/plugins/loader.ts`: uruchamia każdą wtyczkę w oddzielnym procesie potomnym Node.js, a brokerzy przechwytują wywołania przez IPC. Dziecko nie jest piaskownicą (patrz „Izolacja wykonania wtyczki” poniżej).

## Katalog marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) zwraca listę
obiektów `MarketplaceEntry`:

| Field         | Type     | Notes                                |
| ------------- | -------- | ------------------------------------ |
| `name`        | string   | kebab-case plugin name               |
| `version`     | string   | semver                               |
| `description` | string   | Short summary                        |
| `author`      | string   | Author / org                         |
| `license`     | string   | SPDX-style license id                |
| `downloadUrl` | string   | Source download URL (may be empty)   |
| `repository`  | string?  | Optional repository URL              |
| `tags`        | string[] | Search/filter tags                   |
| `downloads`   | number   | Download count                       |
| `rating`      | number   | 0–5                                  |
| `verified`    | boolean  | Whether the entry is marked verified |
| `lastUpdated` | string   | ISO-ish date string                  |

Gdy nie skonfigurowano własnego URL rejestru, katalog to wbudowany
`SEED_REGISTRY` (obecnie `request-logger`, `rate-limiter`, `cost-tracker` oraz
`theme-manager`). Rejestr seed jest zawsze dostępny — jeśli skonfigurowany zdalny
rejestr jest nieosiągalny, zwraca status inny niż `200` albo zwraca nierozpoznane
ciało odpowiedzi, `listMarketplacePlugins()` loguje ostrzeżenie i wraca do listy seed.

> Uwaga: **katalog** marketplace (przeglądanie/wyszukiwanie) jest podpięty od końca do końca, ale
> jednoklikowa **instalacja** z katalogu marketplace nie jest jeszcze zaimplementowana — przycisk
> „Install” na wpisie marketplace w dashboardzie pokazuje obecnie
> komunikat „coming soon”. Instalacja dziś odbywa się przez przepływ instalacji ze ścieżki lokalnej
> (`POST /api/plugins`) oraz odkrywanie na dysku (`POST /api/plugins/scan`).

## REST API

Wszystkie punkty końcowe wymagają autoryzacji zarządzania (`requireManagementAuth`)** I** są przeznaczone wyłącznie do pętli zwrotnej. — `/api/plugins` i `/api/plugins/` są wymienione w `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Punkt końcowy                    | Metoda | Opis                                                             |
| -------------------------------- | ------ | ---------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista zainstalowanych wtyczek (opcjonalny filtr `?status=` )     |
| `/api/plugins`                   | POST   | Zainstaluj wtyczkę z katalogu źródeł wtyczek                     |
| `/api/plugins/scan`              | POST   | Zeskanuj katalog wtyczek i zarejestruj nowe wtyczki              |
| `/api/plugins/marketplace`       | GET    | Lista wpisów katalogu Marketplace                                |
| `/api/plugins/[name]`            | GET    | Pobierz szczegółowe informacje o zainstalowanej wtyczce          |
| `/api/plugins/[name]`            | DELETE | Odinstaluj wtyczkę                                               |
| `/api/plugins/[name]/activate`   | POST   | Aktywuj (załaduj haki rejestru + )                               |
| `/api/plugins/[name]/deactivate` | POST   | Dezaktywuj (odpal `onDeactivate`, wyrejestruj hooki)             |
| `/api/plugins/[name]/config`     | GET    | Pobierz schemat konfiguracji wtyczki +                           |
| `/api/plugins/[name]/config`     | PUT    | Zaktualizuj konfigurację wtyczki (sprawdzoną pod kątem schematu) |

Filtr `GET /api/plugins` `status` akceptuje jeden z `installed` / `active` / `inactive` / `error`. Nieprawidłowa wartość zwraca `400`.

### Lista zainstalowanych wtyczek

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Zainstaluj ze ścieżki lokalnej

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` musi być** absolutny** ścieżka do katalogu** w katalogu źródeł wtyczek** : `plugin-sources` obok katalogu głównego wtyczki, więc domyślnie `~/.omniroute/plugin-sources/` lub `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` gdy ta zmienna jest ustawiona (`getPluginSourcesDir()` w `src/lib/plugins/installSource.ts`). Najpierw skopiuj lub sklonuj tam wtyczkę. Instalacja zostaje odrzucona za pomocą `400`, gdy ścieżka zawiera `..` lub bajt zerowy, leży poza tym katalogiem, jest rozpoznawana poza nim poprzez dowiązanie symboliczne, zawiera dowiązanie symboliczne, którego cel znajduje się poza nim lub gdy katalog nie istnieje. Katalog źródłowy musi zawierać prawidłowy `plugin.json` (lub być jego rodzicem). Jeśli się powiedzie, odpowiedzią będzie `201` z zainstalowanym wierszem wtyczki.

W przeciwieństwie do innych tras wtyczek, ta wymaga poświadczeń zarządzania (sesja pulpitu nawigacyjnego lub klucz API o zakresie zarządzania), nawet jeśli logowanie jest wyłączone (`requireLogin=false`): instalowanie kodu nigdy nie jest działaniem anonimowym.

### Przeglądaj rynek

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Zaktualizuj konfigurację wtyczki

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` sprawdza każdą podaną wartość względem `configSchema` wtyczki (zadeklarowanego w manifeście): pola `number` honorują `min`/`max`, pola `select` muszą odpowiadać zadeklarowanemu `enum`. Klucze, których nie ma w schemacie, są dozwolone.

## Konfiguracja

### Katalog wtyczek

Wtyczki znajdują się w katalogu danych OmniRoute :

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (or whatever manifest.main points to)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) rozwiązuje ten katalog w trzech krokach:

1. **`OMNIROUTE_PLUGINS_DIR`** , gdy ustawione — jest używane dosłownie, niezależnie od tego, co mówi `HOME`. Jest to wyraźne pokrętło dla Docker/K8s, gdzie drzewo wtyczek jest montowane w ścieżce, która zwykle nie ma nic wspólnego z katalogiem domowym kontenera (#11827).
2. `<home>/.omniroute/plugins`, gdzie `<home>` pochodzi ze zmiennych środowiskowych `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, gdy proces w ogóle nie eksportuje żadnego domu.

Rozwiązany katalog jest rejestrowany raz przy uruchomieniu jako `scanner.dir_resolved`, nadając nazwę wejściu, które wygrało (`OMNIROUTE_PLUGINS_DIR`, `home` lub `no-home-fallback`) —, więc obraz, który po cichu ląduje w kroku 3, mówi o tym, zamiast raportować tylko pustą listę wtyczek. `POST /api/plugins/scan` odkrywa tam dowolny podkatalog, w którym znajduje się prawidłowy `plugin.json` i rejestruje go; ten sam katalog jest katalogiem głównym, do którego `pluginManager.install()` kopiuje wtyczki, więc zastąpienie przenosi razem wykrywanie i instalację.

> **`OMNIROUTE_PLUGINS_DIR` nie jest `OMNIROUTE_PLUGIN_PATH`.** Ta ostatnia jest odczytywana tylko przez moduł ładujący wtyczki CLI (`bin/cli/plugins.mjs`) w celu znalezienia pakietów `omniroute-cmd-*` npm, które dodają podkomendy `omniroute` — Nie ma to wpływu na opisany tutaj skaner środowiska wykonawczego. Zobacz [PLUGINS.md](./PLUGINS.md) dla tej strony.

### Niestandardowy rejestr rynku URL

Źródło katalogu Marketplace jest odczytywane z ustawienia `pluginMarketplaceUrl` (`src/lib/plugins/marketplace.ts` czyta `settings.pluginMarketplaceUrl`). Po ustawieniu na `http(s)` URL, `listMarketplacePlugins()` pobiera to URL i akceptuje albo tablicę wpisów JSON najwyższego poziomu, albo obiekt z tablicą `plugins` ; wpisy bez ciągu `name` są odfiltrowywane. Gdy nieustawione (lub gdy pobieranie nie powiedzie się, strażnik SSRF / zwróci złą odpowiedź), używany jest wbudowany rejestr nasion.

Zakładka „Rynek” na pulpicie nawigacyjnym udostępnia pole dla tego URL (odczyt z `GET /api/settings`).

> Uwaga dotycząca wdrożenia: akcja „Zapisz” na pulpicie nawigacyjnym wysyła `pluginMarketplaceUrl` do `PATCH /api/settings`. W chwili pisania tego klucza ten klucz nie jest zadeklarowany w `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`), więc sprawdź trwałość swojej wersji, zanim na nim zaczniesz —** Czytać** path (`getSettings()` → `listMarketplacePlugins()`) honoruje klucz, gdy jest on obecny w magazynie ustawień.

## Bezpieczeństwo

### Tylko pętla zwrotna — na poziomie trasy

Wtyczki wykonują kod w procesach potomnych, więc cała powierzchnia `/api/plugins` jest klasyfikowana `LOCAL_ONLY` (poziom 1). Wymuszanie pętli zwrotnej działa bezwarunkowo** zanim** dowolną kontrolę uwierzytelnienia, więc token zarządzania, który wyciekł do skrzynki przez tunel, nadal nie może zainstalować, aktywować ani odinstalować wtyczki. Zobacz [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) i Hard Rules #15 / #17.

### Strażnik rejestru SSRF na rynku

Niestandardowy rejestr URL jest konfiguracją, na którą atakujący może mieć wpływ, więc przed pobraniem `listMarketplacePlugins()` przepuszcza go przez dwie warstwy:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odrzuca wszystko, co nie jest `http:` / `https:`.
   - Odrzuca dosłowne hosty private/loopback/link-local/ULA (IPv4** I** IPv6, w tym IPv4-mapped) poprzez kanoniczne `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Rozwiązuje** Zarówno** `A` i `AAAA` rejestruje i odrzuca if** każdy** rozwiązany adres to prywatny — zamykający publiczną nazwę hosta → obejście prywatnego adresu IP.
   - **Niepowodzenie zamknięte** : błąd rozdzielczości DNS odrzuca URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ponownie stosuje publiczną ochronę URL w czasie pobierania i** blokuje przekierowania** (brak publicznego → prywatnego `30x` obrotowego).

URL które nie powiedzie się w żadnej warstwie, nie przerywa żądania. — rynek po cichu wraca do wbudowanego rejestru nasion i rejestruje ostrzeżenie.

> Ta osłona została wzmocniona w PR #3774 specjalnie po to, aby rozwiązać A + AAAA i użyć kanonicznego `isPrivateHost` zamiast testu IPv4-only.

### Izolacja wykonania wtyczki

> **Wtyczki nie są piaskownicą.** Dziecko to zwykły proces Node.js działający jako użytkownik OmniRoute, bez kontekstu VM i bez flag uprawnień Node.js, więc kod wtyczki może czytać i zapisywać dowolny plik, który może czytać użytkownik, uruchamiać programy i łączyć się z siecią. `requires.permissions` decyduje tylko, które zmienne środowiskowe otrzyma dziecko; pozostałe uprawnienia nie są egzekwowane. Instaluj tylko wtyczki, którym ufasz. Granica procesu poniżej zawiera awarie i zawieszenia; nie jest to granica bezpieczeństwa.

- **Izolacja procesu** — `loadPlugin()` (`src/lib/plugins/loader.ts`) tworzy każdą wtyczkę w oddzielnym procesie potomnym Node.js i komunikuje się przez IPC. Wywołania hooków mają limit czasu z eskalacją `SIGTERM` → `SIGKILL`.
- **Lista dozwolonych kopert** — dziecko otrzymuje tylko dozwolony zestaw zmiennych środowiskowych; szerszy zestaw jest przyznawany tylko wtedy, gdy manifest żąda pozwolenia `env`.
- **Zainstaluj zabezpieczenie źródła** — `POST /api/plugins` czyta tylko z katalogu źródeł wtyczek (patrz „Instalacja ze ścieżki lokalnej”): ścieżka jest kanonizowana za pomocą `realpath`, musi znajdować się ściśle w tym katalogu, a drzewo źródłowe zawierające dowiązanie symboliczne, które z niego ucieka, jest odrzucane przed skopiowaniem czegokolwiek.
- **Zatrzymanie ścieżki** — install/upgrade/uninstall zapewnia, że katalog wtyczek i `manifest.main` zostaną rozwiązane** w** zarządzany katalog główny wtyczki przed jakąkolwiek kopią lub rekurencyjnym usunięciem (chroni przed manipulowaniem ścieżkami DB i przechodzeniem `../` w `manifest.main`). Aktywacja rozwiązuje dowiązania symboliczne poprzez `realpath` i odmawia załadowania punktu wejścia, który ucieka z katalogu wtyczek.
- **Opcjonalny pin integralności** — manifest może zadeklarować pole `integrity` (format `sha256-<base64>`, SRI ). Jeśli jest obecny, moduł ładujący weryfikuje skrót pliku wejściowego w czasie ładowania i odmawia aktywacji w przypadku niezgodności. Jest to opcja wykrywania manipulacji,** nie** granica bezpieczeństwa: nie ogranicza możliwości załadowanej wtyczki.
- **Brak poświadczeń klienta w hakach** — kontekst przekazany do `onRequest`, `onResponse` i `onError` ma usunięte nagłówki `authorization`, `x-api-key`, `proxy-authorization` i `cookie`, a rekord klucza API nie zawiera wartości klucza (`redactPluginContext()` w `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Zatwierdzone przez `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Pole               | Typ               | Notatki                                                             |
| ------------------ | ----------------- | ------------------------------------------------------------------- |
| `name`             | smyczkowy         | Wymagany; kebab-case (`^[a-z0-9-]+$`), 1–100 znaków                 |
| `version`          | smyczkowy         | Wymagany; semver (`MAJOR.MINOR.PATCH`)                              |
| `description`      | smyczkowy?        | ≤ 500 znaków                                                        |
| `author`           | smyczkowy?        | ≤ 200 znaków                                                        |
| `license`          | smyczkowy?        | Domyślnie jest to `MIT`                                             |
| `main`             | smyczkowy?        | plik wejściowy; domyślnie jest to `index.js`                        |
| `source`           | wyliczenie?       | `local` \| `marketplace` (domyślnie `local`)                        |
| `tags`             | smyczkowy[]?      | Szukaj tagów                                                        |
| `requires`         | obiekt?           | `{ omniroute?, permissions[] }`                                     |
| `hooks`            | obiekt?           | Wartości logiczne deklarujące, które zaczepia implementację wtyczki |
| `skills`           | obiekt[]?         | Opcjonalne definicje umiejętności                                   |
| `enabledByDefault` | wartość logiczna? | Aktywuj automatycznie podczas instalacji                            |
| `configSchema`     | obiekt?           | Mapa pól konfiguracyjnych (`string`/`number`/`boolean`/`select`)    |
| `integrity`        | smyczkowy?        | Opcjonalny pin pliku wejściowego `sha256-<base64>`                  |

Uprawnienia pobierane są z wyliczenia `network` / `file-read` / `file-write` / `env` / `exec`. Tylko `env` ma wpływ na środowisko wykonawcze (nieco większa lista dozwolonych zmiennych środowiskowych dla dziecka). pozostałe to deklaracje i nie są egzekwowane.

## Przepływ cyklu życia

```
install (POST /api/plugins, path)
  → scan/validate manifest → copy to staging → assert main within dir
  → atomic rename into ~/.omniroute/plugins/<name> → insert DB row
  → fire onInstall → if enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → realpath containment check → loadPlugin() (spawn child process)
  → register declared hooks → status = "active" → fire onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → fire onDeactivate (BEFORE unregister) → unregister hooks
  → kill child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate if active → fire onUninstall
  → containment-checked recursive delete of plugin dir → delete DB row
```

Ponowne uruchomienie `install` wobec katalogu, którego wersja w manifeście jest **ściśle
nowsza** niż zainstalowana, automatycznie aktualizuje (czysta reinstalacja; konfiguracja wraca
do domyślnych). Ta sama lub starsza wersja jest odrzucana.

## Baza danych

Tabela `plugins` (migracja `076_create_plugins.sql`):

| Kolumna         | Typ     | Notatki                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Unikalny                                               |
| `version`       | TEXT    | Sewer; domyślny `1.0.0`                                |
| `description`   | TEXT    | Fakultatywny                                           |
| `author`        | TEXT    | Fakultatywny                                           |
| `license`       | TEXT    | Domyślne `MIT`                                         |
| `main`          | TEXT    | plik wejściowy; domyślny `index.js`                    |
| `source`        | TEXT    | Domyślne `local`                                       |
| `tags`          | TEXT    | tablica JSON ; domyślny `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; domyślnie 0                                       |
| `manifest`      | TEXT    | Pełny manifest JSON                                    |
| `config`        | TEXT    | JSON; domyślny `{}`                                    |
| `config_schema` | TEXT    | JSON; domyślny `{}`                                    |
| `hooks`         | TEXT    | JSON tablica zadeklarowanych nazw haków; domyślny `[]` |
| `permissions`   | TEXT    | tablica JSON ; domyślny `[]`                           |
| `plugin_dir`    | TEXT    | Absolutny katalog instalacyjny                         |
| `error_message` | TEXT    | Ustaw, kiedy `status = "error"`                        |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Ustaw na aktywację                                     |

Wtyczki metrics/analytics są śledzone w dodatkowych tabelach (`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Panel

Strona panelu kontrolnego w `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) zawiera dwie zakładki:

- **Zainstalowany** — wyświetla listę zainstalowanych wtyczek z ich zadeklarowanymi hakami, przełącznikiem activate/deactivate, przyciskiem odinstalowywania i akcją „Skanuj w poszukiwaniu wtyczek” (`POST /api/plugins/scan`).
- **Rynek** — pokazuje katalog z `GET /api/plugins/marketplace` z polem do ustawienia niestandardowego rejestru URL.

Strona zawsze wyświetla ostrzeżenie, że wtyczki działają z pełnymi uprawnieniami procesu OmniRoute.

Strona konfiguracji poszczególnych wtyczek znajduje się w `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Zobacz też

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  dlaczego `/api/plugins` jest tylko loopback (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — powiązany framework skills
  (`src/lib/skills/`); wtyczki mogą deklarować skills w manifeście
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — event-driven outbound
  integracje
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  wzorzec `buildErrorBody()` używany przez każdą trasę wtyczek w odpowiedziach błędów
