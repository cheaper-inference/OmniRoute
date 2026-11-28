# Progressive Web App (PWA) Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installieren Sie das OmniRoute Dashboard als Progressive Web App, um es von Ihrem Startbildschirm oder Desktop in einem eigenständigen Fenster zu öffnen. Die installierte App benötigt weiterhin eine Verbindung zu Ihrem OmniRoute -Server für Navigation, Dashboard-Daten und API Anfragen. Zwischengespeicherte statische Assets bieten kein Offline-Gateway oder Offline-Dashboard.

## Was ist ein PWA?

Eine Progressive Web App nutzt das Web-Dashboard mit einem App-Symbol und einem separaten Fenster. Nach der Installation führt OmniRoute Folgendes aus:

- Wird von Ihrem Startbildschirm oder Desktop gestartet
- Wird im Standalone-Modus geöffnet, ohne die übliche Adressleiste und Tabs des Browsers
- Speichert ausgewählte statische Assets im Cache
- Unterstützt Hoch- und Querformat

## Installation

Verwenden Sie eine HTTPS -Adresse für einen Server auf einem anderen Gerät. Wenn der Server auf demselben Gerät läuft, erfüllt `http://localhost:20128` auch die Anforderungen an die Browser-Installationsfähigkeit. Eine einfache `http://YOUR_IP:20128` -Adresse erfüllt diese Anforderungen nicht. Installationsmenüs und Eingabeaufforderungen hängen vom Browser und Betriebssystem ab. Siehe [die PWA Installationsanforderungen von MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Öffnen Sie Ihre OmniRoute HTTPS -Adresse oder `http://localhost:20128` für einen Server auf demselben Telefon.
2. Öffnen Sie die**⋮** Menü und wählen Sie** App installieren** oder** Zum Startbildschirm hinzufügen** , falls angeboten.
3. Bestätigen Sie die Aufforderung.
4. Öffnen Sie OmniRoute vom Startbildschirm aus.

### iOS (Safari)

1. Öffnen Sie Ihre OmniRoute HTTPS -Adresse in Safari.
2. Klopfen** Aktie** →** Zum Startbildschirm hinzufügen** .
3. Bestätigen Sie den Namen und tippen Sie auf** Hinzufügen** .
4. Öffnen Sie OmniRoute vom Startbildschirm aus.

### Desktop (Chrome / Edge)

1. Öffnen Sie Ihr OmniRoute Dashboard.
2. Verwenden Sie das Installationssymbol des Browsers oder das** App installieren** Menüeintrag, sofern angeboten.
3. Bestätigen Sie die Aufforderung, OmniRoute in einem eigenen Fenster zu öffnen.

## Merkmale

### Eigenständiges Fenster

Das Manifest legt `display: "standalone"` und `start_url: "/dashboard"` fest. Die installierte App öffnet das Dashboard in einem App-Fenster. Browser- und Betriebssystemsteuerelemente können weiterhin angezeigt werden. Das Manifest fordert keinen Vollbildmodus.

### Zwischengespeicherte Assets und Netzwerkanforderungen

Der [Service-Worker](../../public/sw.js) speichert ausgewählte Ressourcen gleichen Ursprungs im Cache:

| Anfrage oder Vermögenswert                        | Strategie               | Verhalten                                                                                                                                         |
| ------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ressourcen zur Installationszeit                  | Vorab zwischenspeichern | `/`, `/manifest.webmanifest`, `/icon-512.png` und `/apple-touch-icon.png` werden während der Worker-Installation zwischengespeichert              |
| statische Next.js Assets (`/_next/`)              | Netzwerk zuerst         | Erfolgreiche Antworten aktualisieren den Cache; Ein Netzwerkfehler geht auf eine vorhandene zwischengespeicherte Antwort zurück                   |
| Andere statische CSS, JS, Bilder und Schriftarten | Cache-first             | Eine vorhandene zwischengespeicherte Antwort wird wiederverwendet; Erfolgreiche Netzwerkantworten werden bei einem Fehlschlag zwischengespeichert |
| Seitennavigation                                  | Bypass                  | Der Browser ruft die Seite direkt ab; Es wird kein Offline-Fallback bereitgestellt                                                                |
| API, Dashboard und Authentifizierungsrouten       | Bypass                  | Der Worker fängt diese Anfragen nicht ab oder speichert sie zwischen                                                                              |
| Andere nicht statische Anfragen                   | Netzwerk                | Keine Cache-Suche oder Speicherung                                                                                                                |

Die ausgeschlossenen Routen sind `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` und `/login`, die an Pfadgrenzen ohne Berücksichtigung der Groß-/Kleinschreibung abgeglichen werden. Auch Cross-Origin- und Nicht-GET-Anfragen umgehen den Worker.

### Konnektivitätsseite

Die `/offline` -Seite stellt eine Konnektivitätsmeldung, einen online/offline Indikator usw. bereit** Verbindung erneut versuchen** Schaltfläche und ein Link zur Statusseite. Es ist** nicht vorab zwischengespeichert** und der Servicemitarbeiter tut es** nicht** Leiten Sie fehlgeschlagene Navigationen dorthin um. Seine Existenz macht neue Seiten ohne den Server nicht zugänglich.

### App-Symbole

Das Manifest bewirbt diese PNG Symbole:

| Datei                  | Größe   | Verwenden                               |
| ---------------------- | ------- | --------------------------------------- |
| `icon-192.png`         | 192×192 | Allgemeines App-Symbol                  |
| `icon-512.png`         | 512×512 | Allgemeines und maskierbares App-Symbol |
| `apple-touch-icon.png` | 180×180 | Apple-Startbildschirmsymbol             |

Der Browser wählt das entsprechende Symbol für das Installationsziel aus.

### Automatische Registrierung

`PwaRegister` registriert den Arbeiter in der Produktion, wenn der Browser Servicearbeiter unterstützt. Der Entwicklungsmodus hebt die Registrierung von Workern auf und löscht Caches, um zu verhindern, dass veraltete Assets das Hot-Reload beeinträchtigen. Installationsaufforderungen bleiben eine Entscheidung des Browsers.

## Technische Architektur

### Web-App-Manifest

Next.js generiert `/manifest.webmanifest` aus [`src/app/manifest.ts`](../../src/app/manifest.ts). Die wichtigsten Einstellungen sind:

| Einstellung                   | Wert                                             |
| ----------------------------- | ------------------------------------------------ |
| `short_name`                  | `OmniRoute`                                      |
| `start_url`                   | `/dashboard`                                     |
| `scope`                       | `/`                                              |
| `display`                     | `standalone`                                     |
| `orientation`                 | `any`                                            |
| Hintergrund- und Themenfarben | Die Standard-Lichtpalette von `PWA_THEME_COLORS` |

Der Name und die Beschreibung des Manifests sind statische Werte in dieser Quelldatei. Das installierte Manifest folgt nicht bei jedem Besuch der Instanznameneinstellung oder der aktiven Palette.

### Servicemitarbeiter

[`public/sw.js`](../../public/sw.js) hat keine Abhängigkeit vom Service-Worker-Framework:

- **Installieren:** speichert die vier oben aufgeführten Ressourcen vorab zwischen und aktiviert den neuen Worker.
- **Aktivieren:** Entfernt ältere Cache-Generationen und beansprucht Clients.
- **Bringen:** wendet die oben genannten Strategien für statische Assets und Routenausschlüsse an.
- **Versionierung:** Der Name des Quellcaches lautet `omniroute-pwa-v3`. Der Produktions-Build prägt die Cache-Identität.
- **Benachrichtigungen:** Verarbeitet eingehende `push` -Ereignisse und fokussiert oder öffnet ein Fenster, wenn auf eine Benachrichtigung geklickt wird.

Push-Ereignishandler allein stellen kein aktives Push-Abonnement oder keine konfigurierte Serverbereitstellung her. Gehen Sie nicht davon aus, dass Benachrichtigungen nur deshalb aktiviert sind, weil PWA installiert ist.

### Layout-Metadaten und Registrierung

[`src/app/layout.tsx`](../../src/app/layout.tsx) stellt den Manifest-Link, eigenständige Apple-Metadaten, Designfarben und `viewport-fit: cover` bereit. Der Seitentitel und der Titel der Apple-Web-App verwenden den Instanznamen. Die Farbe des Live-Browser-Designs folgt der Palette; Das Installationsmanifest verwendet die Standardlichtfarbe.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) läuft auf dem Client und registriert `/sw.js` mit dem Build ID in seinem URL. Es erkennt nicht übereinstimmende Cache-Generationen und kann den Worker zurücksetzen und einmal neu laden, um eine ältere Installation wiederherzustellen. Bei einem Registrierungsfehler wird das Dashboard nicht blockiert.

## Verwendung mit Termux (Android)

1. Starten Sie OmniRoute in Termux: `npx -y omniroute@latest`.
2. Öffnen Sie Chrome auf demselben Telefon: `http://localhost:20128`.
3. Installieren Sie PWA über das Installationsmenü des Browsers.
4. Lassen Sie den Termux-Server laufen, während Sie das Dashboard verwenden.

Das Telefon hostet sowohl das Gateway als auch sein Dashboard. Anfragen an entfernte AI -Anbieter benötigen weiterhin Netzwerkzugriff. Informationen zur Einrichtung und zu Überlegungen zur Android-Prozesslebensdauer finden Sie im [Termux-Handbuch](TERMUX_GUIDE.md).

## Verwendung von anderen Geräten

Öffnen Sie die HTTPS -Adresse des Servers auf einem Telefon, Tablet oder Desktop und folgen Sie dann dem Installationsablauf dieses Browsers. Der Server muss von jedem Gerät aus erreichbar bleiben. Informationen zu Fernzugriffsoptionen finden Sie im [Tunnel-Leitfaden](../ops/TUNNELS_GUIDE.md).

## Anpassung

### Instanzname

Der** Instanzname** Durch die Einstellung werden Dashboard-Metadaten geändert, einschließlich des Seitentitels und des Apple-Web-App-Titels. Das generierte Manifest verwendet einen statischen Namen, sodass diese Einstellung nicht garantiert, dass eine bereits installierte App umbenannt wird.

### Benutzerdefiniertes Favicon

Ein benutzerdefiniertes Favicon ändert das Browser-Favicon. Das Installationsmanifest kündigt weiterhin die oben genannten PNG Dateien an; Durch das Ändern des Favicons werden diese Startbildschirmsymbole nicht ersetzt.

## Einschränkungen

- **Serververbindung erforderlich:** Seitennavigation, Dashboard-Status und API Anfragen verfügen nicht über einen Offline-Fallback.
- **Keine Hintergrundsynchronisierung:** Offline-Aktionen werden nicht zur Wiedergabe in die Warteschlange gestellt.
- **Browserunterschiede:** Installationsmenüs, Fensterdarstellung und Benachrichtigungsunterstützung variieren je nach Plattform.
- **Kein API -Antwortcache:** Der Worker schließt API, Dashboard- und Authentifizierungsrouten aus.
- **Statische Installationssymbole:** Die Aktualisierung dieser Symbole erfordert eine Änderung der beworbenen Assets. Browser behalten möglicherweise installierte Metadaten bei.

## Dateireferenz

| Datei                                                                                  | Zweck                                                            |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Generiertes Web-App-Manifest                                     |
| [public/sw.js](../../public/sw.js)                                                     | Caching, Ausschlüsse und Benachrichtigungsereignishandler        |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Produktionsregistrierung und Wiederherstellung veralteter Caches |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Konnektivitätsseite, kein automatischer Offline-Fallback         |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Seitenmetadaten und Ansichtsfenstereinstellungen                 |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Gemeinsame Themenfarbwerte                                       |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 App-Symbol                                             |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-Symbol                                           |
