# Release Checklist (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Ostatnia aktualizacja:** 2026-08-28 — v3.8.51
> Usprawniony proces wydawania, który wykorzystuje umiejętności Claude Code do automatyzacji.
>
> **Utrzymuj kolejkę/gałąź w stanie green między wydaniami:** zobacz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodzina `/green-prs` + `npm run check:release-green` + `/babysit` + zadanie nocne). Okresowe uruchamianie
> tego procesu — a zwłaszcza **przed** wykonaniem tej listy kontrolnej — sprawia, że PR wydania rozpoczyna się w stanie green.

## TL;DR

```bash
# 1. Zwiększ wersję + wygeneruj CHANGELOG (umiejętność)
/version-bump-cc patch    # albo minor/major

# 2. Uruchom lokalnie bramkę jakości
npm run check              # lintowanie + testy
npm run test:coverage      # pełna bramka pokrycia (60/60/60/60)

# 3. Zbuduj i wykonaj testy dymne
npm run build
npm run test:e2e           # opcjonalne, ale zalecane

# 4. Wygeneruj wydanie (umiejętność)
/generate-release-cc

# 5. Wdróż (umiejętność)
/deploy-vps-both-cc        # albo akamai-cc / local-cc

# 6. Zbierz dowody wydania (umiejętność)
/capture-release-evidences-cc
```

## npm Trusted Publishing (domyślnie od v3.8.51) — publikowanie etapowe na żądanie, bezpośrednie jako rozwiązanie awaryjne

`npm-publish.yml` domyślnie publikuje za pośrednictwem **npm Trusted Publishing (OIDC)**:
zadanie `stage-npm` (hostowane przez GitHub) wymienia token id-token GitHuba na krótkotrwałe
poświadczenie npm dla danego uruchomienia — bez długoterminowego tokenu npm w sekretach repozytorium,
bez monitu 2FA, z dołączonym poświadczeniem pochodzenia.
Jest to obejście dopuszczone obecnie przez npm, gdy tokeny pomijające 2FA są wycofywane;
przywraca ono w pełni automatyczny proces, który projekt miał do wersji v3.8.48, zachowując
gwarancję WS1.3 (wyciek tokenu nie umożliwia samodzielnego opublikowania — token nie istnieje).

**Konfiguracja jednorazowa (właściciel):** npmjs.com → pakiet `omniroute` → Settings → _Trusted
Publisher_ → GitHub: właściciel `diegosouzapw`, repozytorium `OmniRoute`, przepływ pracy `npm-publish.yml`
(środowisko: brak). Dopóki taka konfiguracja nie istnieje, automatyczny krok kończy się błędem `ENEEDAUTH`:
uruchom ponownie z `publish_mode=staged` (poniżej) albo `direct`.

### Publikowanie etapowe (na żądanie — `publish_mode=staged`)

Przepływ pracy npm-publish nie publikuje już bezpośrednio: uruchamia spakowany tarball
(`check:pack-boot`), a następnie wykonuje `npm stage publish` — dokładnie te same bajty są umieszczane
w rejestrze, ale **nie można ich zainstalować**, dopóki właściciel ich nie zatwierdzi. Bramka 2FA wymagająca
interwencji człowieka została przeniesiona na etap PO weryfikacji, a nie przed nią.

**Proces właściciela po pomyślnym zakończeniu przepływu pracy:**

1. `npm stage list omniroute` — znajdź identyfikator etapu (jest on również wyświetlany w podsumowaniu przepływu pracy).
2. Zweryfikuj przygotowane bajty (zalecane): `npm stage download <id>`, następnie zainstaluj
   pobrany tarball w tymczasowym prefiksie i uruchom go (`npm run check:pack-boot` automatyzuje
   w CI tę samą weryfikację pakowanie→instalacja→uruchomienie).
3. `npm stage approve <id>` — monit 2FA JEST publikacją. `npm stage reject <id>` odrzuca etap.
4. Zabezpieczenie po publikacji: weryfikator po publikacji (WS1.4 planu v3.8.49) instaluje
   opublikowaną wersję z publicznego rejestru w czystym kontenerze i ją uruchamia.

**Awaryjne rozwiązanie:** `workflow_dispatch` z `publish_mode=direct` przywraca
starszy, natychmiastowy proces `npm publish` (używaj tylko wtedy, gdy samo publikowanie etapowe działa nieprawidłowo; zapisz przyczynę).

**Jednorazowe utwardzenie zabezpieczeń (właściciel, npmjs.com):** skonfiguruj Trusted Publisher dla
`omniroute` w trybie wyłącznie etapowym, aby wyciek długoterminowego tokenu nie umożliwiał bezpośredniego
wykonania `npm publish` z dowolnego miejsca — CI może jedynie przygotować etap; tylko 2FA właściciela może wydać pakiet.

**Procedura obsługi uszkodzonego artefaktu (bez zmian):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako domyślna reakcja (kilka minut, działanie odwracalne); `npm unpublish` tylko w 72-godzinnym oknie,
gdy nie ma pakietów zależnych, i nigdy jako pierwszy krok. Docker: nigdy nie nadpisuj tagu wersji —
wycofanie wydania polega na ponownym wskazaniu przez `latest` ostatniego poprawnego skrótu.

**Docker Hub `latest` (wymagane przy każdej publikacji stabilnej wersji SemVer):**
przepływ pracy `docker-publish` musi oznaczyć **zarówno** `X.Y.Z`, jak i — gdy
`should-promote-latest.sh` potwierdzi, że jest to najwyższa stabilna wersja SemVer — `:latest`
przy użyciu **tego samego skrótu**. Po wykonaniu zadania: skrót `latest` w Hubie jest równy skrótowi
nowej wersji SemVer, a `last_updated` został zaktualizowany. Nie pozostawiaj `:latest` wskazującego
starszy obraz, gdy informacje o wydaniu opisują poprawki dostępne wyłącznie w git. Szybkie konfiguracje
Compose używają `:latest`; GitOps powinien nadal przypinać `X.Y.Z`. Zobacz
[Kanały wydań Dockera](../guides/DOCKER_GUIDE.md#release-channels) i #10317.

## Szybka ścieżka poprawek awaryjnych (etykieta `hotfix`)

PR z etykietą `hotfix` pomija rozbudowaną macierz CI (9-częściowe E2E, mechanizm zapadkowy pokrycia,
quality-gate, quality-extended) i zachowuje szybkie mechanizmy kontrolne o wysokiej wartości diagnostycznej: kompilację,
części testów jednostkowych, testy integracyjne, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
oraz test uruchomienia z archiwum tar (`check:pack-boot`). Cel: zielony status w ≤15 min zamiast ~33 min.

**Zasady dostępu — wymagane są wszystkie cztery warunki (wzorowane na awaryjnych ścieżkach Chromium/VS Code/Node):**

1. **Waga problemu**: środowisko produkcyjne nie działa — opublikowany artefakt ulega awarii podczas uruchamiania /
   poprawka bezpieczeństwa / problem dotyczy każdego użytkownika wydania. „Ważne” nie oznacza „niedziałające”.
2. **Uprawnienia**: tylko właściciel repozytorium nadaje etykietę `hotfix`. Etykieta JEST
   zatwierdzeniem — nigdy nie należy nadawać jej samodzielnie w PR kampanii.
3. **Dowody**: opis PR zawiera odnośnik do poprzedniego, w pełni zielonego uruchomienia rozbudowanego zestawu testów (zestawu, który
   pomijane zadania ponownie by zweryfikowały) oraz do testu samej poprawki, który najpierw kończył się niepowodzeniem, a następnie powodzeniem.
4. **Zakres**: wyłącznie cherry-pick — minimalna poprawka, bez refaktoryzacji ani dodatkowych zmian.

Pomijany zakres pokrycia/mechanizmu zapadkowego jest ponownie weryfikowany przez następne pełne uruchomienie na
gałęzi wydania (ciągły zielony status wydania) — ścieżka pomija OCZEKIWANIE, nigdy walidację.
Zmiany obejmujące wyłącznie testy (wszystkie pliki w `tests/`, żadne w `tests/e2e/`) automatycznie pomijają macierz
E2E, bez żadnej etykiety.

## Szczegółowa lista kontrolna

### Wersja przedpremierowa

- [ ] Wszystkie PRs przeznaczone dla tej wersji są scalone z `release/vX.Y.0`
- [ ] Wszystkie otwarte elementy Linear/issue dla tej wersji są zamknięte lub przesunięte do następnego kamienia milowego
- [ ] CI green na gałęzi `release/vX.Y.0`
- [ ] Brak znaczników `TODO(release)` w kodzie: `grep -r "TODO(release)" src/ open-sse/`
- [ ] aktualny obraz bazowy Docker (obecnie `node:24.15.0-trixie-slim`)

### Wersja i dziennik zmian

- [ ] Uruchom `/version-bump-cc <patch|minor|major>` (umiejętność kodowania Claude )
  - Uderza `package.json`, `electron/package.json`
  - Regeneruje `CHANGELOG.md` z zatwierdzeń git od ostatniego tagu
  - Aktualizuje odznaki README.md
- [ ] Ręcznie przejrzyj CHANGELOG.md i w razie potrzeby wyczyść komunikaty zatwierdzeń
- [ ] Upewnij się, że najnowsza sekcja semver w `CHANGELOG.md` jest równa wersji `package.json`
- [ ] Zachowaj `## [Unreleased]` jako pierwszą sekcję dziennika zmian dla nadchodzących prac
- [ ] Aktualizacja `docs/openapi.yaml` → `info.version` musi być równa wersji `package.json`

### Jakość kodu

- [ ] `npm run lint` — 0 błędów (ostrzeżenia już istnieją)
- [ ] `npm run typecheck:core` — czyste
- [ ] `npm run typecheck:noimplicit:core` — czysty (ścisły)
- [ ] `npm run check:cycles:ratchet` — w zamarzniętym suficie `metrics.cycles` (gołe `check:cycles` wychodzi 1 w dowolnym cyklu, #15281)
- [ ] `npm run check:any-budget:t11` — w ramach budżetu
- [ ] `npm run check:route-validation:t06` — czyste
- [ ] `npm run check:node-runtime` — obsługiwany poziom środowiska wykonawczego met (`>=22.22.2 <23`, `>=24.0.0 <27`, per `SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`; wyrównane z `package.json` `engines`)

### Testowanie

- [ ] `npm run test:unit` — przepustka
- [ ] `npm run test:vitest` — pass (serwer MCP, autoCombo, pamięć podręczna)
- [ ] `npm run test:coverage` — brama 60/60/60/60 usatysfakcjonowana (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (jeśli zmiany dotyczą DB / handlerów)
- [ ] `npm run test:combo:matrix` — pass (macierz strategii kombinowanej: w sposób deterministyczny potwierdza decyzje dotyczące wyboru wszystkich 22 strategii routingu publicznego; uruchamiane po dotknięciu routingu kombinowanego, rozwiązania strategii lub logiki awaryjnej)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (bramkowany dym z prawdziwego źródła; pobiera migawkę DB tylko do odczytu z VPS `root@192.168.0.15`; uderza w prawdziwych dostawców, kosztuje kredyty; nigdy nie działa w CI; przeskakuje czysto bez bramy)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 scenariuszy HTTP przeciwko żywemu serwerowi `.15` przez zwykły węzeł ESM; wymaga `ssh root@192.168.0.15`; creates/deletes tylko kombinacje `__live_test__*` ; uderza prawdziwych dostawców; nigdy nie działa w CI)
- [ ] `npm run test:e2e` — pass (zmiany UI )
- [ ] `npm run test:protocols:e2e` — pass (zmiany MCP/A2A )
- [ ] `npm run test:ecosystem` — przepustka

### Haczyki (zatwierdzone przez Husky)

Haki Husky żyją w `.husky/` i działają automatycznie podczas operacji git.

- **wstępne zatwierdzenie:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **przed naciśnięciem:** szybkie bramki deterministyczne — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktywacja 2026-06-13). Celowo wyklucza `test:unit` (powolny; objęty zadaniem CI `test-unit` ).
  - Uruchom `npm run test:unit` ręcznie przed wypchnięciem gałęzi wydania.

Jeśli hak zawiedzie: napraw podstawowy problem, nie omijaj `--no-verify`.

### Konwencjonalne zatwierdzenia

Wszystkie zatwierdzenia związane z wydaniem muszą być zgodne z formatem `type(scope): subject`.

**Prawidłowe typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Prawidłowe zakresy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Najważniejsze zmiany: dodaj stopkę `BREAKING CHANGE:` lub `!` po zakresie (np. `feat(api)!: drop /v0`).

### Dokumentacja

- [ ] `npm run check:docs-sync` przechodzi (automatycznie uruchamiane przed zatwierdzeniem)
- [ ] `npm run check:docs-all` passs (parasol: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` wychodzi 0 — kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env umowa jest nienaruszona
- [ ] `npm run check:doc-links` wychodzi 0 — brak zepsutych wewnętrznych odniesień do przecen po restrukturyzacji
- [ ] `docs/architecture/ARCHITECTURE.md` sprawdzone pod kątem storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` sprawdzono pod kątem env var i dryftu operacyjnego
- [ ] Jeśli `.env.example` się zmieniło: `docs/reference/ENVIRONMENT.md` zaktualizowano
- [ ] Jeśli nowa funkcja ma UI: `docs/guides/USER_GUIDE.md` o tym wspomina
- [ ] Jeśli nowa funkcja ma API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` zaktualizowana
- [ ] Jeśli nową funkcją jest moduł: istnieje dedykowane `docs/<MODULE>.md`
- [ ] W przypadku zmiany zmiany: `docs/guides/TROUBLESHOOTING.md` ma notatkę o migracji

### 18n

- [ ] `npm run i18n:check` wychodzi ze stanu tłumaczenia — (`.i18n-state.json`) zsynchronizowanego z dokumentami źródłowymi (brak dryfujących źródeł w trybie ścisłym; zalecenie trybu ostrzegania jest dopuszczalne w przypadku poprawek dokumentów w ostatniej chwili, ale powinno wynosić 0 przed tagowaniem)
- [ ] `npm run i18n:check-ui-coverage` wychodzi z 0 — w każdej lokalizacji UI na poziomie lub powyżej poziomu pokrycia 80%.
- [ ] `npm run i18n:sync-ui:dry` zgłasza 0 brakujących kluczy we wszystkich 66 docelowych lokalizacjach (każde ustawienia regionalne z wyjątkiem źródła `en` )
- [ ] Jeśli dokumenty źródłowe w języku angielskim uległy zmianie, uruchom `npm run i18n:run` (wymaga `OMNIROUTE_TRANSLATION_API_KEY` w `.env`) przed oznaczeniem
- [ ] Wkład w tłumaczenia może zostać przełożony na następne wydanie, jeśli jest niewielki (utwór w CHANGELOG)

### Migracje baz danych

- [ ] Jeśli `src/lib/db/migrations/` ma nowe pliki:
  - [ ] Każda migracja jest idempotentna (`CREATE TABLE IF NOT EXISTS` itp.)
  - [ ] Migracje opakowane w transakcje
  - [ ] Numerowane poprawnie (bez przerw w kolejności)
- [ ] Przetestuj na świeżej instalacji: usuń `~/.omniroute/omniroute.db` i uruchom `npm run dev`
- [ ] Przetestuj istniejącą instalację: wykonaj kopię zapasową DB, uruchom migrację, sprawdź schemat
- [ ] pliki WAL (`-wal`, `-shm`) są obsługiwane poprawnie, jeśli migracja powoduje przepisanie tabel

### Katalog dostawców (zatwierdzony przez ZOD)

- [ ] `src/shared/constants/providers.ts` schemat Zod ważny w czasie ładowania
  - [ ] Wszyscy dostawcy mają wymagane pola (`id`, `label`, `kind` itp.)
  - [ ] `freeNote` udostępniona nowym bezpłatnym dostawcom
  - [ ] Dostawcy OAuth zarejestrowali `oauthConfig` w `src/lib/oauth/constants/oauth.ts`
- [ ] Jeśli dodano nowego dostawcę: odpowiedni executor w `open-sse/executors/`
- [ ] Jeśli format inny niż OpenAI: tłumacz w `open-sse/translator/`
- [ ] Modelki zarejestrowane w `open-sse/config/providerRegistry.ts`
- [ ] Testy jednostkowe w `tests/unit/` obejmują klasyfikację i routing dostawców

### Pulpit (Electron)

Jeśli `electron/` uległo zmianie:

- [ ] `npm run electron:smoke:packaged` przechodzi
- [ ] Kompilacje testowane dla co najmniej jednego z `:win`, `:mac`, `:linux`
- [ ] Certyfikaty podpisywania kodu nie wygasły (w przypadku podpisywania)
- [ ] Wersja `electron/package.json` odpowiada rootowi `package.json`
- [ ] Wskaźnik kanału automatycznej aktualizacji zaktualizowany w przypadku wydania do `stable`

### Zbuduj układ

Repozytorium wykorzystuje trzy różne katalogi wyjściowe — nigdy nie mieszaj:

| Informator | Zamiar                                                                  | Śledzone?        |
| ---------- | ----------------------------------------------------------------------- | ---------------- |
| `src/`     | Źródło aplikacji (TypeScript / TSX)                                     | Tak              |
| `.build/`  | Zbuduj produkty pośrednie — `next build` wyjście (`distDir`)            | Nie (gitignored) |
| `dist/`    | Możliwość wysyłki pakietu npm — zmontowanego przez `assembleStandalone` | Nie (gitignored) |

> **Uwaga operatora:** zdalny katalog obrazu VPS pozostaje `/usr/lib/node_modules/omniroute/app/`. Tylko** w repozytorium** Przeniesiono dane wyjściowe kompilacji (`app/` → `dist/`). Wdrożenie umiejętności rsync zawartość `dist/` do zdalnego katalogu `app/` — nie wymaga zmian ścieżki VPS.

**Przepływ pojedynczej kompilacji:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Wykonaj NOT uruchom `npm run build` a następnie oddzielny `npm run build:cli`, aby wdrożyć — użyj `npm run build:release`, który wykonuje czystą przebudowę + wartownika w jednym poleceniu.

### Walidacja artefaktów

- [ ] `npm run build:release` się powiedzie i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` lub inne lokalne pozostałości
- [ ] `dist/server.js` istnieje po kompilacji
- [ ] Opcjonalne lokalne dymienie środowiska wykonawczego: `npm run dev:candidate -- validate` po tym, `npm run dev:candidate -- build` uruchamia spakowane archiwum tar na izolowanym `DATA_DIR` i sprawdza `/api/health` + `/v1/models` (zobacz [Złotą ścieżkę wkładu](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Tagowanie i zwalnianie

- [ ] Uruchom `/generate-release-cc` (umiejętność kodowania Claude ):
  - Tworzy tag `vX.Y.Z`
  - Popycha znacznik i gałąź
  - Otwiera wydanie GitHub z treścią dziennika zmian
  - Dołącza instalatory Electron (jeśli są wbudowane)
- [ ] Lub ręcznie:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Wdrożyć

Wdróż umiejętności, używając lekkiego przepływu rsync — no `npm pack`, no `npm i -g`:

- [ ] Użyj umiejętności wdrażania odpowiadającej celowi:
  - `/deploy-vps-local-cc` — lokalny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Przed wdrożeniem potwierdź `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Kompilacja musi działać tam, gdzie `node_modules` jest prawdziwa (główna kasa lub `npm ci`'d worktree — NOT drzewo robocze z dowiązaniem symbolicznym)
- [ ] Wdrożona instancja testu dymu:
  - Otwórz `/dashboard/health` → sprawdź ciąg znaków wersji zgodny z wersją
  - Uruchom żądanie `/v1/chat/completions` wobec znanego dostawcy
  - Sprawdź, `/api/monitoring/health` zwraca wyłączniki automatyczne `CLOSED`
  - Potwierdź odpowiedź transportów MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Po wydaniu

- [ ] Uruchom `/capture-release-evidences-cc` (umiejętność kodowania Claude )
  - Przechwytuje WebP screenshots/recordings nowych funkcji
  - Załączany do informacji o wersji/poście na blogu
- [ ] Zaktualizuj dyskusje GitHub / Discord z ogłoszeniem o wydaniu
- [ ] Otwórz kamień milowy dla następnej wersji
- [ ] Jeśli jest to krytyczne: przypnij dyskusję lub opublikuj post w `news.json`, aby wyświetlić baner w aplikacji

### Radarowa bramka do publicznego uruchamiania

Ogłoszenie Radaru zostało celowo przesłane za pomocą `active: false`. Aktywacja jest osobną zmianą po udokumentowaniu każdego poniższego elementu:

- [ ] Wszystkie ułożone w stos Radar PRs są łączone, a końcówka zwalniająca CI jest zielona
- [ ] Rozmieszczaj i pal trasy radaru OSS, przy domyślnie wyłączonym `RADAR_ENABLED`
- [ ] Zapal `GET /planos`, `/termos`, `/privacidade` i `/reembolso` na nazwanym hoście Radar
- [ ] Operator nagrań identity/contact/address i zatwierdzona przez właściciela opinia prawna w usłudze prywatnej
- [ ] Ćwicz Stripe Checkout i podpisany webhook tylko w trybie testowym
- [ ] Wykonaj jedną zaszyfrowaną dostawę e-maili transakcyjnych za pomocą zatwierdzonego sender/domain
- [ ] Udowodnij, że przywracanie kopii zapasowych i jeden nadzorowany przebieg badań przy ograniczonym budżecie
- [ ] Zatwierdź zasady przeglądu BRL/PIX przed przyjęciem dowodów darowizny
- [ ] Włącz publiczną kasę dopiero po poprzednich bramkach, następnie aktywuj nową `news.json` ID
- [ ] Sprawdź, czy baner główny korzysta ze zlokalizowanej kopii, a nowy ID pojawia się ponownie po odrzuceniu starszego ID

## Testy dymne usług wbudowanych (v3.8.4+)

Przed wydaniem dowolnej wersji zawierającej zmiany w usługach wbudowanych sprawdź:

### Uruchamianie ze świeżą bazą danych (wykrywa kolizje migracji — dodano po poprawce v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — odczekaj 10 s na uruchomienie
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` zwraca `"9router"` (NIE 404 ani 500). Potwierdza zastosowanie migracji `071_services.sql` i dodanie rekordu.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` zwraca 3 wiersze.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` zwraca 2 wiersze (potwierdza zastosowanie migracji `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` przechodzi pomyślnie — zabezpiecza przed przyszłymi kolizjami.

### 9Router

- [ ] `POST /api/services/9router/install` zwraca 200 z `installedVersion` w czasie poniżej 2 min
- [ ] `POST /api/services/9router/start` zwraca 200 i `state: "running"` w czasie poniżej 30 s
- [ ] `GET /api/services/9router/status` zgłasza `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` zwraca 200 (kompleksowy test routingu przez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderuje natywny interfejs 9Router wewnątrz proxy (bez bezpośredniego iframe `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` zwraca `{ keyRotated: true }`, a usługa uruchamia się ponownie bez błędów
- [ ] `POST /api/services/9router/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` zwraca strumień SSE ze zdarzeniem `snapshot` zawierającym ostatnie wiersze
- [ ] Instalacja w środowisku bez `npm` w PATH zwraca 500 z przyjaznym komunikatem o błędzie (bez śladu stosu)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` zwraca 200 w czasie poniżej 2 min
- [ ] `POST /api/services/cliproxy/start` zwraca 200 i `state: "running"` w czasie poniżej 30 s
- [ ] `GET /api/services/cliproxy/status` zgłasza `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` zwraca strumień SSE

### Regresja zabezpieczeń

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` zwraca `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` zwraca `403 LOCAL_ONLY`
- [ ] Odpowiedzi z błędami z `/api/services/*` nie zawierają `err.stack` ani bezwzględnych ścieżek plików

## Kontrole dla v3.8.0+

Przed wydaniem dowolnej wersji v3.8.x sprawdź także następujące elementy:

- [ ] `omniroute --tray` uruchamia się w systemie macOS (systray2 zainstalowano w `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` uruchamia się w systemie Linux (wymaga DISPLAY; czytelny błąd, jeśli nie ustawiono)
- [ ] `omniroute --tray` uruchamia się w systemie Windows (PowerShell NotifyIcon, bez dodatkowych plików binarnych)
- [ ] `omniroute config tray enable` tworzy wpis autostartu; wyłączenie go usuwa
- [ ] `npm install -g omniroute@<this-version>` wykonuje skrypt poinstalacyjny bez błędu krytycznego
- [ ] Ścieżka aktualizacji zachowuje zależności opcjonalne: `omniroute update --apply` oraz automatyczny aktualizator
      uruchamiają `npm install -g … --include=optional`, dzięki czemu `optionalDependencies` (better-sqlite3,
      keytar, tls-client oraz stos SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) pozostają dostępne po aktualizacji. Poziom SLM ultra z `modelPath` wymaga również modelu
      tinybert, pobieranego automatycznie do `${DATA_DIR}/models/llmlingua` przy pierwszym użyciu. Następnie skrypt poinstalacyjny
      (`scripts/build/colocateOptionals.mjs`) umieszcza domknięcie opcjonalnych zależności SLM w
      `dist/node_modules`, dzięki czemu proces roboczy rozpoznaje JEDNĄ instancję `@huggingface/transformers` ^4.2.0
      — autonomiczny pakiet śledzenia obejmuje tylko transformers, a nie opcjonalne zależności importowane dynamicznie,
      więc bez tego proces roboczy załadowałby llmlingua-2 z transformers z katalogu głównego,
      a poziom SLM po cichu przeszedłby w tryb awaryjny.
- [ ] `omniroute status` działa bez `.env` (ścieżka tokenu CLI, tylko interfejs loopback)
- [ ] `curl http://localhost:20128/api/shutdown` zwraca 401 (trasa zawsze chroniona)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` zwraca 401 (zabezpieczenie loopback)
- [ ] Środowisko uruchomieniowe SQLite przy pierwszym uruchomieniu jest rozpoznawane jako `bundled` (dołączony plik binarny jest prawidłowy dla danej platformy)
- [ ] Środowisko uruchomieniowe SQLite przełącza się na `runtime`, gdy `node_modules/better-sqlite3` zostanie usunięty
- [ ] Inteligentny filtr MCP kompresuje rzeczywiste dane wyjściowe `playwright-mcp browser_snapshot` (redukcja o ≥50%)
- [ ] Wszystkie 10 plików `skills/omniroute*/SKILL.md` jest publicznie dostępnych za pośrednictwem surowego adresu URL GitHub
- [ ] Kreator wdrożenia przy pierwszej konfiguracji wyświetla krok prezentacji poziomów „Jak to działa”
- [ ] Widżet pokrycia poziomów na głównym panelu wyświetla liczbę skonfigurowanych i aktywnych elementów

---

## Wydzielenie 3.9.0 LTS (przećwiczone w 3.8.58)

Po v3.8.59 następną wersją jest 3.9.0, a jej wierzchołek staje się początkiem dwóch długotrwałych gałęzi:
`stable/v3` (linia v3 LTS, npm `latest`) oraz `develop` (v4, z wersją podniesioną do 4.0.0, npm
`nightly`). Model gałęzi/kanałów, przenoszenie zmian do nowszych wersji oraz etykiety opisano w
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plan znajduje się w [ROADMAP](../../ROADMAP.md) (faza 3). Wydzielenie wykonywane jest raz;
w 3.8.58 zostaje przećwiczone od początku do końca na forku, a 3.8.59 kończy się
[listą kontrolną GO/NO-GO](./LTS_GO_NO_GO.md).

### Przebieg próbny (tylko do odczytu, bezpieczny w dowolnym momencie)

```bash
npm run release:dry-run-lts-cut                       # rzeczywiste wydzielenie: 3.9.0 z HEAD, poprzedni tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # przypnij commit źródłowy
```

`scripts/release/dry-run-lts-cut.mjs` niczego nie wykonuje: odczytuje dane z git i `gh`, po czym wyświetla
całą sekwencję — warunki wstępne (źródło jest rozpoznawane, repozytorium źródłowe zawiera pełną historię —
płytki klon nie może wypchnąć `stable/v3`, ponieważ strona odbierająca odrzuca pakiet przy pierwszym
sztucznie dołączonym rodzicu, dlatego wydzielenie należy wykonać z pełnego klonu lub najpierw uruchomić
`git fetch --unshallow origin` — poprzedni tag istnieje, `package.json` zawiera wersję docelową, otwarte jest
zgłoszenie `release-freeze`, nie ma otwartego zgłoszenia `Release branch not green`
dla istniejącej gałęzi wydania — nieistniejąca gałąź zwraca `?`, czyli stan nieznany, nigdy
zielony — kolejka Mergify `release` jest skonfigurowana (G11: `queue_rules`, `checks_timeout`,
etykieta `queue`), zestaw reguł `release/*` nadal blokuje usuwanie i wymuszone wypychanie, a
`stable/v3` i `develop` jeszcze nie istnieją), dwa kroki tworzenia gałęzi, informację o tym, które wyzwalacze
nieaktywnych przepływów pracy i warunki `if:` stają się prawdziwe (oraz które pozostają zablokowane przez
zmienną repozytorium lub przypięte do repozytorium kanonicznego), oczekiwane dist-tagi (`latest` → 3.9.0,
`next` i `nightly` puste) oraz procedurę wycofania. Kod zakończenia `0` = `RESULT: READY`, `1` = niespełniony
blokujący warunek wstępny (`✗`), `2` = błąd użycia. `--advisory <id,...>` obniża rangę kontroli do
ostrzeżenia (`!`), nie ukrywając jej.

Uruchom przebieg próbny rzeczywistego wydzielenia, gdy zamrożenie wydania 3.9.0 jest nadal aktywne — gałęzie
są tworzone po tagu i przed zniesieniem zamrożenia w fazie 12c.

### Próba 3.8.58 (wyłącznie na forku)

```bash
# 1. Przebieg próbny na bieżącym wierzchołku z parametrami próby
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Wykonanie względem zdalnego FORKA (origin ani żadne zdalne repozytorium, którego URL
#    wskazuje repozytorium kanoniczne, nie jest dozwolone; każdy krok wymaga potwierdzenia w terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Uruchomienie nieaktywnych przepływów pracy w forku (workflow_dispatch tam, gdzie przebieg próbny
#    zgłasza przypięcie do repozytorium kanonicznego), a następnie wycofanie zmian
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit podnoszący wersję w `develop` jest tworzony za pomocą niskopoziomowych mechanizmów git (bez modyfikowania
drzewa roboczego) i aktualizuje te same pięć plików co commit otwierający cykl: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` oraz `docs/openapi.yaml`. Sekcja `[4.0.0]`
w CHANGELOG-u oraz jej odpowiedniki i18n są następnie otwierane na `develop`, przed pierwszym
PR-em tej gałęzi. Skrypt nigdy nie zmienia dist-tagów npm — przećwicz to na pakiecie testowym.

### Artefakt podglądowy PR-a (zbuduj raz, promuj dokładnie te same bajty)

`.github/workflows/preview-artifact.yml` buduje jeden produkcyjny tarball z wierzchołka PR-a i
weryfikuje dokładnie ten build (fragment (a) zadania #8084). Obsługiwane są wyłącznie PR-y z tego samego repozytorium;
nic nie jest publikowane.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # lub dodaj etykietę `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalacja podglądowa
```

Przebieg wykonuje `npm ci`, `npm run build:release` oraz `npm run check:pack-artifact`, pakuje
tarball, uruchamia `npm run check:pack-boot` (fikcyjne sekrety, efemeryczny katalog danych), ponownie
pakuje i kończy się niepowodzeniem, jeśli skrót nie jest identyczny, po czym zapisuje
`artifact-identity.json` (SHA wierzchołka, SHA bazy, skrót pliku blokady, platforma, architektura,
ABI node, bundler, zasady budowania — `scripts/release/artifact-identity.mjs`) i poświadcza tarball
w osobnym zadaniu. Promowanie podglądu oznacza instalację tego tarballa: nigdy nie buduj go ponownie ze źródeł.

### Wydzielenie (3.9.0, po decyzji GO)

1. Decyzja GO jest zapisana w [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` wyświetla `RESULT: READY`.
3. Utwórz ręcznie gałęzie w `origin`, używając poleceń wyświetlonych przez przebieg próbny —
   skrypt odmawia wypychania do `origin`. Aby ponownie wykorzystać sprawdzony commit dla `develop`, najpierw uruchom
   próbę `--execute` na wierzchołku 3.9.0 względem swojego forka; wyświetli ona oba SHA, a następnie
   można wypchnąć te same commity:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zabezpiecz `stable/v3` i `develop` (zestawy reguł + kolejka scalania), zanim pierwszy PR zostanie scalony.
5. Nieaktywne przepływy pracy zostaną włączone po utworzeniu odpowiednich gałęzi: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR-y do `stable/v3`) oraz `nightly-v4-build.yml`
   (kompilacje gałęzi `develop`). Przed uruchomieniem ustaw sekret repozytorium `secrets.FORWARD_PORT_TOKEN` (aby CI uruchamiało się dla
   PR-ów typu forward-port); publikowanie kompilacji nocnych pozostanie wyłączone, dopóki właściciel nie ustawi zmiennej repozytorium
   `vars.NIGHTLY_PUBLISH` na `true`, a funkcja Trusted Publishing w npm nie zaakceptuje
   `nightly-v4-build.yml`. Za rozpoznawanie kanałów odpowiada `scripts/release/dist-tag.mjs` — ten sam
   mechanizm, którego używa `npm-publish.yml`.
6. Zweryfikuj kanały: `npm view omniroute dist-tags --json` pokazuje `latest` = 3.9.0 oraz brak
   `next` / `nightly` do czasu opublikowania v4.
7. W razie potrzeby wycofaj zmiany: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   oraz `npm dist-tag add omniroute@3.8.59 latest`.

---

## Wycofanie wydania

Jeśli wydanie zawiera krytyczny problem:

1. `gh release edit vX.Y.Z --prerelease` (oznacza wydanie jako niebędące najnowszym)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (tylko jeśli użytkownicy jeszcze go nie wdrożyli)
3. Lub: poprawka krytyczna na `release/vX.Y.0` → wydanie poprawkowe `vX.Y.(Z+1)`
4. Natychmiast poinformuj o tym w GitHub Discussions i na Discordzie

## Bezwzględne zasady

- Nigdy nie zatwierdzaj zmian bezpośrednio w `main`
- Nigdy nie używaj `git push --force` dla gałęzi `main` ani `release/*`
- Nigdy nie pomijaj hooków Husky (`--no-verify`)
- Nigdy nie zatwierdzaj sekretów, danych uwierzytelniających ani plików `.env`
- Pokrycie testami musi pozostać na poziomie ≥60/60/60/60 (instrukcje/wiersze/funkcje/gałęzie)
- Zawsze dodawaj lub aktualizuj testy podczas zmiany kodu produkcyjnego w `src/`, `open-sse/`, `electron/` lub `bin/`

## Automatyczne sprawdzanie synchronizacji

Przed otwarciem PR uruchom lokalnie mechanizm sprawdzający synchronizację dokumentacji:

```bash
npm run check:docs-sync
```

CI również uruchamia tę kontrolę w `.github/workflows/ci.yml` (zadanie lintowania).
