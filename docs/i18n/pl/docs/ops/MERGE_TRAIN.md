# Merge Queue & Manual Merge-Train Runbook (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Lądowanie na gałęzi uwalniającej

Omni-kolejka reguluje lądowanie w `release/vX.Y.Z`. Przeczytaj najwyższy poziom `mode` w `config/merge-queue/config.json` w domyślnej gałęzi przed wylądowaniem PR. Zobacz [Omni-kolejka](OMNI_QUEUE.md).

- **`shadow`** uruchamia weryfikację i pozostawia lądowanie do ręcznego scalania. Nałóż `omni-queue` na zatwierdzony PR w jego końcowej części. Sprawdź uprawnienia za pomocą `npm run queue -- why <PR>`. Poczekaj na werdykt dla tej głowy w `npm run queue -- history --base <branch>`. Kontynuuj `would-land`. Na `culprit-found` lub `would-dequeue` przytrzymaj scalanie i napraw przyczynę.
- **Wyjątki w cieniu.** Pociąg z zielonym pełnym CI w stosunku do aktualnej końcówki bazy może jechać bez osobnego wyroku w sprawie kolejki. Ten sam wyjątek ma zastosowanie, gdy głowica PR zawiera już aktualną końcówkę podstawy.
- **`live`** używa etykiety `omni-queue` do wyzwalania lądowania. Sama kolejka ląduje PR. Pozostaw polecenia scalania i kieruj wypychania do kolejki.

Każde lądowanie wymaga zgody właściciela i odpowiednich wymaganych kontroli. Zastosuj `omni-queue` dopiero po autoryzacji lądowania przez właściciela. Ustawione w PRs dotykające chronionych ścieżek również wymagają decyzji właściciela `protected-approved` dla tego PR.

Zestaw reguł „Wymagaj zielonych bram w aktywnym wydaniu” wymaga zielonych `Gate / CI` i `Gate / Quality` na głowie. Nigdy nie używaj `--admin` do ominięcia czerwonej bramy. Uwolnione bloki zamrażające łączą się z zamrożoną gałęzią. Zobacz [Twardą Regułę 21](HARD_RULES_DETAIL.md). Nigdy nie oznaczaj, nie łącz ani nie wysyłaj żądania ściągnięcia, informującego, że działa inna sesja. Zobacz [Twardą Regułę 22](HARD_RULES_DETAIL.md).

## Żądanie ściągnięcia pociągu

1. Rozpocznij odgałęzienie pociągu na końcówce podstawy bieżącego zwolnienia. Zintegruj dokładnie zatwierdzone głowy członków, używając zatwierdzeń scalających. Zachowaj historię zatwierdzeń, unikając squasha i rebase.
2. Otwórz jedno żądanie ściągnięcia dla gałęzi pociągu. Sprawdź, czy PR ma własne pełne CI na bieżącej końcówce podstawy. Przed lądowaniem sprawdź ponownie końcówkę podstawy i zatwierdzone główki prętów. Odśwież pociąg i jego CI, gdy zmieni się zatwierdzony kandydat.
3. Wyląduj pociągiem PR za pomocą zatwierdzenia scalania w odpowiednim trybie kolejki. W trybie na żywo metoda lądowania `merge-ff` kolejki zachowuje zatwierdzenia scalania. Oryginalne głowy członków stają się dostępne z gałęzi wydania. GitHub oznacza element PRs jako połączony, a zatwierdzenia zachowują swoich autorów.

Publiczny przykład to [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Połączył 18 członków PRs i wylądował z zatwierdzeniem połączenia 24.11.2026.

Synchronizacja zwrotna z `main` do następnej gałęzi wydania również następuje poprzez zatwierdzenie scalania. Do późniejszych synchronizacji zwrotnych wymagane jest zachowanie pochodzenia `main`. Zobacz [Izolacja drzewa roboczego](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Lokalny moduł sprawdzający połączenie-pociąg

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Walidator pobiera głowicę podstawową i PR i łączy je w jednorazowe drzewo robocze. Uruchamia swój zestaw parzystości raz na wynikowym drzewie. Nieudane pobranie nagłówka lub konflikt scalania powoduje wyrzucenie tego PR i skrypt jest kontynuowany z pozostałym PRs.

- **`--plan`** drukuje kroki wybranego trybu i kończy pracę bez tworzenia drzewa roboczego lub kontaktowania się z pilotem. Połącz go z `--fast`, aby sprawdzić szybki plan.
- **`--fast`** uruchamia wspólne bramki statyczne, wybrane zmienione pliki `node:test` w `tests/unit/` i `npm run test:vitest`. Przynajmniej raz dziennie przeprowadzaj pełną lokalną weryfikację zgromadzonego napiwku, gdy używasz trybu szybkiego.
- **Tryb pełny** dodaje tylko pełne bramki statyczne i uruchamia `npm run test:unit` i `npm run test:vitest`.

Niesprawna bramka statyczna jest uruchamiana ponownie na nienaruszonej bazie, jeśli dostępna jest sonda bazowa. Skrypt zgłasza odziedziczone awarie i kontynuuje pracę, gdy w bazie pojawi się także każda rozpoznana linia naruszenia, a łączna liczba nie wzrosła.

| Wyjście | Oznaczający                                                                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`     | Wydrukowałem plan lub ukończyłem pakiet. Podsumowanie pakietu zawiera listę wszelkich odziedziczonych błędów statycznych i wyrzuconych PRs.                                        |
| `1`     | Nieprawidłowe argumenty, brak realizacji transakcji Git, nieudana inspekcja wstępna lub brak wejścia na pokład PR.                                                                 |
| `2`     | Sprawdzenie pakietu nie powiodło się i nie kwalifikowało się jako odziedziczone. Operator może podzielić partię na pół, wyrzucić PR powodującą naruszenie i uruchomić ją ponownie. |

Lokalna przepustka dostarcza dowodów diagnostycznych wyłącznie dla dokumentacji właściciela. Każde lądowanie nadal wymaga autoryzacji właściciela, własnych wymaganych kontroli i, jeśli ma to zastosowanie, werdyktu w kolejce cieni.

## Poziomowanie

- **Za PR.** CI i Quality Select sprawdzają w oparciu o zmienione ścieżki. Kod PRs uruchamia szybkie bramki jakości i testy, na które ma to wpływ, z oddzielnymi zadaniami jednostkowymi i Vitest w CI.
- **Na kandydata z kolejki.** CI i Quality uruchamiają pełny profil wybranego kandydata w jego kolejce nr ref.
- **Na końcówkę wydania.** Release-Green uruchamia szybkie, twarde bramy na podstawie pchnięć pasujących do filtrów ścieżki. Trzy zaplanowane uruchomienia dziennie korzystają z pełnego cyklu dla gałęzi wydania.
- **Na wydanie.** Pełna macierz CI obejmuje fragmenty E2E, sprawdzanie poprawności pakietów, dymowanie z archiwum tar i sprawdzanie zasięgu. Zobacz listę [kontrolną wydania](RELEASE_CHECKLIST.md).

## Wymagania wstępne dotyczące świeżej transakcji dla `merge-train.sh`

Inspekcja wstępna jest uruchamiana przed utworzeniem drzew roboczych. Zainstaluj zależności za pomocą `npm ci`. Potwierdź, że `node_modules/.bin/tsc` jest wykonywalny i że nie ma `node_modules/node_modules`. Sprawdź, czy `node_modules/.bin/bun --version` się powiedzie.

Jeśli pominięto instalację poinstalacyjną Bun, uruchom `(cd node_modules/bun && node install.js)`. Do sprawdzania spójności dostawcy i znanych symboli używa się Bun. Walidator uruchamia `npm run check:cycles:ratchet` jako bramkę blokującą. Samodzielne polecenie `npm run check:cycles` ma charakter doradczy.

## Historia

Kolejka scalania Mergify została wycofana 19.11.2026.
