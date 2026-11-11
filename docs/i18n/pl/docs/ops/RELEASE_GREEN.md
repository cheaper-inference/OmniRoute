# Release-Green: candidate validation and evidence (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green obserwuje konkretne zatwierdzenie i raportuje wyniki jego walidacji. [Odniesienie do Quality Gates](../architecture/QUALITY_GATES.md) definiuje aktualne profile CI, wymagane kontrole i politykę akceptacji. Wersjonowana polityka dostępu w `config/quality/admission-policy.json` jest wykonywalną umową dla `Gate / CI` i `Gate / Quality`.

## CI i zakres obserwacyjny

`ci.yml` i `quality.yml` obejmują żądania ściągnięcia do gałęzi głównej i wydania. Wybrany profil określa, które stanowiska pracy mają zastosowanie. Pełne CI obejmuje także linie, których nie wykonuje zwykłe żądanie ściągnięcia. Wynik szybkiego obserwatora nie może zastąpić tych zadań, a ukończone opakowanie przepływu pracy nie może zastąpić potwierdzeń.

Wersja produkcyjna należy do CI. W `quality.yml` nie ma zduplikowanej kompilacji doradczej. Brakujące artefakty, anulowana praca i niekompletne pomiary nie stanowią podstawy do pomyślnej wymaganej kontroli. Przed zatwierdzeniem wyników potwierdź obecną bazę, głowę i połączonego kandydata.

## Weryfikacja lokalna

Uruchom obserwatora w posiadanym drzewie roboczym po przygotowaniu jego zależności. Przed wnikliwą walidacją postępuj zgodnie z protokołem drzewa roboczego i zasobów w `docs/ops/WORKTREE_ISOLATION.md`.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Szybki profil jest częściowy. Pełny profil sprawdza modelowane wymagania i zachowuje potwierdzenia poleceń; nie potwierdza wdrożenia ani nie zastępuje odpowiednich hostowanych kontroli. W raporcie rozróżnia się niepowodzenie wykonania od dryfu metryki. Wymagane grzechotki pozostają blokowane zgodnie z wybraną polityką. Nie podnoś poziomu bazowego tylko po to, aby uzyskać pozytywny wynik.

## Zamiatanie nocne i ręczne

Programy do rozwiązywania problemów z wydaniem nocnym i zgodnością wybierają gałąź wydania kanonicznego. Ten wybór musi pasować do gałęzi, która wyzwoliła przepływ pracy, a zestawy korzystają z niezmiennego SHA zdarzenia. W przypadku ręcznego wykonania wybierz zamierzoną wersję w `release_branch` i wyślij w tym samym ref.:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Wysyłka międzyoddziałowa zostaje odrzucona przed wykonaniem wybranego kodu. Hostowane główne pakiety sprawdzają `main` i przed instalacją sprawdzają, czy jego SHA nadal odpowiada ustalonemu celowi. Jeśli główne ruchy zostaną przesunięte podczas rozwiązywania, ponownie uruchom niekompletne przeszukanie w nowym zatwierdzeniu. Nie łącz rachunków za apartament od różnych kandydatów.

## Segregacja awarii i rekonwalescencja

Użyj zdarzenia jako indeksu diagnostycznego, a następnie sprawdź dokładny przebieg, próbę, nieudany krok i artefakt. Porównaj równoważne dowody podstawowe i potencjalne, zanim przypiszesz błąd autorowi. Błędy w infrastrukturze, wady odziedziczone, regresje kandydatów i oczekujące zatwierdzenia wymagają różnych środków zaradczych.

Umiejętności `/green-prs`, `/sweep-reds`, `/validate-release-green` i `/babysit` zbierają dowody i przygotowują poprawki w ramach ich udokumentowanego zakresu. Zachowaj kredyt współautora, korzystaj z izolowanych oddziałów napraw i sprawdzaj wszystkie wymagane kontrole przed autoryzowanym połączeniem. Żadne automatyczne ponowne ustalenie wartości bazowej ani zamknięcie incydentu nie zastępują aktualnego kandydata.
