# Progressive Web App (PWA) Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Zainstaluj panel kontrolny OmniRoute jako progresywną aplikację internetową, aby otwierać go z ekranu głównego lub pulpitu w samodzielnym oknie. Zainstalowana aplikacja nadal potrzebuje połączenia z serwerem OmniRoute w celu nawigacji, danych panelu kontrolnego i żądań API. Buforowane zasoby statyczne nie udostępniają bramy offline ani pulpitu nawigacyjnego offline.

## Co to jest PWA?

Progresywna aplikacja internetowa korzysta z panelu internetowego z ikoną aplikacji i oddzielnym oknem. Po zainstalowaniu OmniRoute:

- Uruchamia się z ekranu głównego lub komputera
- Otwiera się w trybie autonomicznym, bez zwykłego paska adresu i kart przeglądarki
- Buforuje wybrane zasoby statyczne
- Obsługuje orientację pionową i poziomą

## Instalacja

Użyj adresu HTTPS dla serwera na innym urządzeniu. Gdy serwer działa na tym samym urządzeniu, `http://localhost:20128` spełnia również wymagania dotyczące instalowalności przeglądarki. Zwykły adres `http://YOUR_IP:20128` nie spełnia tych wymagań. Menu i monity instalacyjne zależą od przeglądarki i systemu operacyjnego. Zobacz [wymagania instalacyjne MDNPWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Otwórz swój adres OmniRoute HTTPS lub `http://localhost:20128` dla serwera na tym samym telefonie.
2. Otwórz**⋮** menu i wybierz** Zainstaluj aplikację** Lub** Dodaj do ekranu głównego** , jeśli jest oferowany.
3. Potwierdź monit.
4. Otwórz OmniRoute na ekranie głównym.

### iOS (Safari)

1. Otwórz swój adres OmniRoute HTTPS w przeglądarce Safari.
2. Uzyskiwać** Udział** →** Dodaj do ekranu głównego** .
3. Potwierdź nazwę i dotknij** Dodać** .
4. Otwórz OmniRoute na ekranie głównym.

### Komputer stacjonarny (Chrome / Edge)

1. Otwórz pulpit nawigacyjny OmniRoute.
2. Użyj ikony instalacji przeglądarki lub** Zainstaluj aplikację** pozycja menu, jeśli jest oferowana.
3. Potwierdź monit o otwarcie OmniRoute w osobnym oknie.

## Cechy

### Samodzielne okno

Manifest ustawia `display: "standalone"` i `start_url: "/dashboard"`. Zainstalowana aplikacja otwiera pulpit nawigacyjny w oknie aplikacji. Nadal mogą pojawiać się elementy sterujące przeglądarki i systemu operacyjnego; manifest nie żąda trybu pełnoekranowego.

### Zasoby buforowane i wymagania sieciowe

[Service worker](../../public/sw.js) buforuje wybrane zasoby tego samego pochodzenia:

| Żądanie lub zasób                                | Strategia                 | Zachowanie                                                                                                                                   |
| ------------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Zasoby potrzebne do instalacji                   | Wstępna pamięć podręczna  | `/`, `/manifest.webmanifest`, `/icon-512.png` i `/apple-touch-icon.png` są buforowane podczas instalacji procesu roboczego                   |
| zasoby statyczne Next.js (`/_next/`)             | Najpierw sieć             | Pomyślne odpowiedzi aktualizują pamięć podręczną; błąd sieciowy powraca do istniejącej odpowiedzi z pamięci podręcznej                       |
| Inne statyczne CSS, JS, obrazy i czcionki        | Najpierw pamięć podręczna | Istniejąca odpowiedź z pamięci podręcznej jest ponownie wykorzystywana; pomyślne odpowiedzi sieciowe są buforowane w przypadku niepowodzenia |
| Nawigacja strony                                 | Objazd                    | Przeglądarka bezpośrednio pobiera stronę; nie jest obsługiwana żadna funkcja zastępcza offline                                               |
| API, pulpit nawigacyjny i trasy uwierzytelniania | Objazd                    | Proces roboczy nie przechwytuje ani nie buforuje tych żądań                                                                                  |
| Inne żądania niestatyczne                        | Sieć                      | Brak wyszukiwania i przechowywania pamięci podręcznej                                                                                        |

Wykluczone trasy to `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` i `/login`, dopasowywane bez uwzględniania wielkości liter na granicach ścieżek. Żądania między źródłami i żądania inne niż GET również omijają proces roboczy.

### Strona Łączność

Strona `/offline` wyświetla komunikat o połączeniu, wskaźnik online/offline, a** Ponów próbę połączenia** przycisk i łącze do strony stanu. To jest** nie jest wstępnie buforowany** i robi to pracownik serwisu** nie** przekieruj do niego nieudane nawigacje. Jego istnienie nie powoduje, że nowe strony będą dostępne bez serwera.

### Ikony aplikacji

Manifest reklamuje następujące ikony PNG :

| Plik                   | Rozmiar | Używać                                         |
| ---------------------- | ------- | ---------------------------------------------- |
| `icon-192.png`         | 192×192 | Ogólna ikona aplikacji                         |
| `icon-512.png`         | 512×512 | Ikona aplikacji ogólna i możliwa do maskowania |
| `apple-touch-icon.png` | 180×180 | Ikona ekranu głównego Apple                    |

Przeglądarka wybiera odpowiednią ikonę dla celu instalacji.

### Automatyczna rejestracja

`PwaRegister` rejestruje pracownika w środowisku produkcyjnym, gdy przeglądarka obsługuje pracowników usługowych. Tryb programistyczny wyrejestrowuje pracowników i czyści pamięć podręczną, aby uniknąć zakłócania nieaktualnych zasobów podczas ponownego ładowania na gorąco. Monity dotyczące instalacji pozostają decyzją przeglądarki.

## Architektura Techniczna

### Manifest aplikacji internetowej

Next.js generuje `/manifest.webmanifest` z [`src/app/manifest.ts`](../../src/app/manifest.ts). Jego kluczowe ustawienia to:

| Ustawienie          | Wartość                                      |
| ------------------- | -------------------------------------------- |
| `short_name`        | `OmniRoute`                                  |
| `start_url`         | `/dashboard`                                 |
| `scope`             | `/`                                          |
| `display`           | `standalone`                                 |
| `orientation`       | `any`                                        |
| Kolory tła i motywu | Domyślna paleta światła z `PWA_THEME_COLORS` |

Nazwa i opis manifestu są wartościami statycznymi w tym pliku źródłowym. Zainstalowany manifest nie jest zgodny z ustawieniem nazwy instancji ani aktywną paletą przy każdej wizycie.

### Pracownik serwisu

[`public/sw.js`](../../public/sw.js) nie ma zależności od frameworka Service-Worker:

- **Zainstalować:** wstępnie buforuje cztery zasoby wymienione powyżej i aktywuje nowego pracownika.
- **Aktywować:** usuwa starsze generacje pamięci podręcznej i zgłasza klientów.
- **Aportować:** stosuje powyższe strategie dotyczące zasobów statycznych i wykluczenia tras.
- **Wersjonowanie:** nazwa źródłowej pamięci podręcznej to `omniroute-pwa-v3`; kompilacja produkcyjna stempluje tożsamość pamięci podręcznej.
- **Powiadomienia:** obsługuje przychodzące zdarzenia `push` i skupia lub otwiera okno po kliknięciu powiadomienia.

Same procedury obsługi zdarzeń push nie ustanawiają aktywnej subskrypcji push ani skonfigurowanego dostarczania serwera. Nie zakładaj, że powiadomienia są włączone tylko dlatego, że PWA jest zainstalowana.

### Metadane układu i rejestracja

[`src/app/layout.tsx`](../../src/app/layout.tsx) zapewnia łącze do manifestu, samodzielne metadane Apple, kolory motywu i `viewport-fit: cover`. Tytuł strony i tytuł aplikacji internetowej Apple korzystają z nazwy instancji. Kolor motywu przeglądarki na żywo jest zgodny z paletą; manifest instalacji używa domyślnego koloru jasnego.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) działa na kliencie i rejestruje `/sw.js` z kompilacją ID w swoim URL. Wykrywa niedopasowane generacje pamięci podręcznej i może raz zresetować proces roboczy i załadować ponownie, aby odzyskać starszą instalację. Błąd rejestracji nie blokuje panelu.

## Używaj z Termux (Android)

1. Uruchom OmniRoute w Termuxie: `npx -y omniroute@latest`.
2. Otwórz Chrome na tym samym telefonie: `http://localhost:20128`.
3. Zainstaluj PWA poprzez menu instalacyjne przeglądarki.
4. Utrzymuj działanie serwera Termux podczas korzystania z pulpitu nawigacyjnego.

Na telefonie znajduje się zarówno bramka, jak i pulpit nawigacyjny. Żądania kierowane do zdalnych dostawców AI nadal wymagają dostępu do sieci. Zobacz [przewodnik Termux](TERMUX_GUIDE.md), aby zapoznać się z kwestiami dotyczącymi konfiguracji i cyklu życia procesu Androida.

## Używaj z innych urządzeń

Otwórz adres HTTPS serwera na telefonie, tablecie lub komputerze stacjonarnym, a następnie postępuj zgodnie z instalacją tej przeglądarki. Serwer musi być dostępny z każdego urządzenia. Informacje na temat opcji zdalnego dostępu można znaleźć [w przewodniku po tunelu](../ops/TUNNELS_GUIDE.md).

## Personalizacja

### Nazwa instancji

The** Nazwa instancji** ustawienie zmienia metadane pulpitu nawigacyjnego, w tym tytuł strony i tytuł aplikacji internetowej Apple. Wygenerowany manifest używa nazwy statycznej, więc to ustawienie nie gwarantuje zmiany nazwy już zainstalowanej aplikacji.

### Niestandardowa Favikona

Niestandardowa ikona favicon zmienia ikonę ulubionych przeglądarki. Manifest instalacji nadal reklamuje powyższe pliki PNG ; zmiana favikony nie zastępuje ikon na ekranie głównym.

## Ograniczenia

- **Wymagane połączenie z serwerem:** nawigacja po stronie, stan pulpitu nawigacyjnego i żądania API nie mają możliwości działania awaryjnego w trybie offline.
- **Brak synchronizacji w tle:** działania offline nie są umieszczane w kolejce do ponownego odtworzenia.
- **Różnice w przeglądarce:** menu instalacyjne, prezentacja okien i obsługa powiadomień różnią się w zależności od platformy.
- **Brak pamięci podręcznej odpowiedzi API :** pracownik wyklucza trasy API, pulpitu nawigacyjnego i uwierzytelniania.
- **Ikony instalacji statycznej:** aktualizacja tych ikon wymaga zmiany reklamowanych zasobów; przeglądarki mogą zachować zainstalowane metadane.

## Odniesienia do plików

| Plik                                                                                   | Zamiar                                                          |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Wygenerowany manifest aplikacji internetowej                    |
| [public/sw.js](../../public/sw.js)                                                     | Buforowanie, wykluczenia i obsługa zdarzeń powiadomień          |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Rejestracja produkcji i odzyskiwanie starej pamięci podręcznej  |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Strona łączności, a nie automatyczne przejście do trybu offline |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadane strony i ustawienia widocznego obszaru                 |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Wspólne wartości kolorów motywu                                 |
| [public/icon-512.png](../../public/icon-512.png)                                       | Ikona aplikacji 512 × 512                                       |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Ikona Apple                                           |
