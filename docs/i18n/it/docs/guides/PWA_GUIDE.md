# Progressive Web App (PWA) Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installa la dashboard OmniRoute come app Web progressiva per aprirla dalla schermata iniziale o dal desktop in una finestra autonoma. L'app installata necessita ancora di una connessione al tuo server OmniRoute per la navigazione, i dati del dashboard e le richieste API. Le risorse statiche memorizzate nella cache non forniscono un gateway offline o un dashboard offline.

## Cos'è uno PWA?

Un'app Web progressiva utilizza la dashboard Web con un'icona dell'app e una finestra separata. Una volta installato, OmniRoute:

- Si avvia dalla schermata iniziale o dal desktop
- Si apre in modalità autonoma, senza la solita barra degli indirizzi e le schede del browser
- Memorizza nella cache le risorse statiche selezionate
- Supporta gli orientamenti verticale e orizzontale

## Installazione

Use an HTTPS address for a server on another device. When the server runs on the same device, `http://localhost:20128` also meets browser installability requirements. A plain `http://YOUR_IP:20128` address does not meet those requirements. Installation menus and prompts depend on the browser and operating system. See [MDN's PWA installation requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Cromo)

1. Apri il tuo indirizzo OmniRoute HTTPS o `http://localhost:20128` per un server sullo stesso telefono.
2. Apri il**⋮** menù e scegli** Installa l'app** O** Aggiungi alla schermata Home** , se offerto.
3. Conferma la richiesta.
4. Apri OmniRoute dalla schermata principale.

### iOS (Safari)

1. Apri il tuo indirizzo OmniRoute HTTPS in Safari.
2. Rubinetto** Condividere** →** Aggiungi alla schermata principale** .
3. Conferma il nome e tocca** Aggiungere** .
4. Apri OmniRoute dalla schermata principale.

### Desktop (Chrome/Edge)

1. Apri la dashboard di OmniRoute.
2. Utilizza l'icona di installazione del browser o il file** Installa l'app** voce di menu, se offerta.
3. Conferma la richiesta di aprire OmniRoute nella sua finestra.

## Caratteristiche

### Finestra indipendente

Il manifest imposta `display: "standalone"` e `start_url: "/dashboard"`. L'app installata apre la dashboard in una finestra dell'app. I controlli del browser e del sistema operativo possono ancora essere visualizzati; il manifest non richiede la modalità a schermo intero.

### Risorse memorizzate nella cache e requisiti di rete

L' [operatore del servizio](../../public/sw.js) memorizza nella cache le risorse selezionate della stessa origine:

| Richiesta o risorsa                         | Strategia      | Comportamento                                                                                                                                     |
| ------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Risorse in fase di installazione            | Pre-cache      | `/`, `/manifest.webmanifest`, `/icon-512.png` e `/apple-touch-icon.png` vengono memorizzati nella cache durante l'installazione del lavoratore    |
| Next.js risorse statiche (`/_next/`)        | Prima la rete  | Le risposte riuscite aggiornano la cache; un errore di rete ricorre a una risposta memorizzata nella cache esistente                              |
| Altri CSS, JS, immagini e caratteri statici | Prima la cache | Viene riutilizzata una risposta esistente memorizzata nella cache; le risposte di rete riuscite vengono memorizzate nella cache in caso di errore |
| Navigazione della pagina                    | Bypassare      | Il browser recupera direttamente la pagina; non viene offerto alcun fallback offline                                                              |
| API, dashboard e percorsi di autenticazione | Bypassare      | Il lavoratore non intercetta né memorizza nella cache queste richieste                                                                            |
| Altre richieste non statiche                | Rete           | Nessuna ricerca o archiviazione nella cache                                                                                                       |

I percorsi esclusi sono `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` e `/login`, abbinati senza distinzione tra maiuscole e minuscole ai limiti del percorso. Anche le richieste multiorigine e non GET ignorano il lavoratore.

### Pagina Connettività

La pagina `/offline` fornisce un messaggio di connettività, un indicatore online/offline, a** Riprovare la connessione** pulsante e un collegamento alla pagina di stato. È** non pre-memorizzato nella cache** e l'addetto ai servizi lo fa** non** reindirizzare ad esso le navigazioni non riuscite. La sua esistenza non rende accessibili nuove pagine senza il server.

### Icone dell'app

Il manifest pubblicizza queste icone PNG :

| File                   | Misurare | Utilizzo                                |
| ---------------------- | -------- | --------------------------------------- |
| `icon-192.png`         | 192×192  | Icona generale dell'app                 |
| `icon-512.png`         | 512×512  | Icona dell'app generale e mascherabile  |
| `apple-touch-icon.png` | 180×180  | Icona della schermata iniziale di Apple |

Il browser seleziona l'icona appropriata per la destinazione dell'installazione.

### Registrazione automatica

`PwaRegister` registra il lavoratore in produzione quando il browser supporta i lavoratori del servizio. La modalità di sviluppo annulla la registrazione dei lavoratori e cancella le cache per evitare che risorse obsolete interferiscano con il ricaricamento a caldo. Le richieste di installazione rimangono una decisione del browser.

## Architettura tecnica

### Manifesto dell'app Web

Next.js genera `/manifest.webmanifest` da [`src/app/manifest.ts`](../../src/app/manifest.ts). Le sue impostazioni chiave sono:

| Collocamento                   | Valore                                                    |
| ------------------------------ | --------------------------------------------------------- |
| `short_name`                   | `OmniRoute`                                               |
| `start_url`                    | `/dashboard`                                              |
| `scope`                        | `/`                                                       |
| `display`                      | `standalone`                                              |
| `orientation`                  | `any`                                                     |
| Colori dello sfondo e del tema | La tavolozza delle luci predefinita di `PWA_THEME_COLORS` |

Il nome e la descrizione del manifest sono valori statici nel file di origine. Il manifesto installato non segue l'impostazione del nome dell'istanza o la tavolozza attiva a ogni visita.

### Operaio di servizio

[`public/sw.js`](../../public/sw.js) non ha alcuna dipendenza dal framework service-worker:

- **Installare:** pre-memorizza nella cache le quattro risorse sopra elencate e attiva il nuovo lavoratore.
- **Attivare:** rimuove le generazioni di cache precedenti e rivendica i client.
- **Andare a prendere:** applica le strategie di risorse statiche e le esclusioni di percorsi di cui sopra.
- **Versione:** il nome della cache di origine è `omniroute-pwa-v3`; la build di produzione contrassegna l'identità della cache.
- **Notifiche:** gestisce gli eventi `push` in arrivo e focalizza o apre una finestra quando si fa clic su una notifica.

I gestori eventi push da soli non stabiliscono una sottoscrizione push attiva o la consegna del server configurato. Non dare per scontato che le notifiche siano abilitate semplicemente perché PWA è installato.

### Metadati di layout e registrazione

[`src/app/layout.tsx`](../../src/app/layout.tsx) fornisce il collegamento manifest, i metadati autonomi di Apple, i colori dei temi e `viewport-fit: cover`. Il titolo della pagina e il titolo dell'app Web Apple utilizzano il nome dell'istanza. Il colore del tema del browser live segue la tavolozza; il manifesto di installazione utilizza il colore chiaro predefinito.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) viene eseguito sul client e registra `/sw.js` con la build ID nel suo URL. Rileva generazioni di cache non corrispondenti e può reimpostare il lavoratore e ricaricarlo una volta per eseguire il ripristino da un'installazione precedente. La mancata registrazione non blocca la dashboard.

## Utilizzare con Termux (Android)

1. Avvia OmniRoute in Termux: `npx -y omniroute@latest`.
2. Apri Chrome sullo stesso telefono: `http://localhost:20128`.
3. Installa PWA tramite il menu di installazione del browser.
4. Mantieni il server Termux in esecuzione mentre utilizzi la dashboard.

Il telefono ospita sia il gateway che il relativo dashboard. Le richieste ai fornitori AI remoti necessitano ancora dell'accesso alla rete. Consulta la [guida di Termux](TERMUX_GUIDE.md) per considerazioni sulla configurazione e sulla durata del processo Android.

## Utilizzo da altri dispositivi

Apri l'indirizzo HTTPS del server su un telefono, tablet o desktop, quindi segui il flusso di installazione del browser. Il server deve rimanere raggiungibile da ciascun dispositivo. Consulta la [guida al tunnel](../ops/TUNNELS_GUIDE.md) per le opzioni di accesso remoto.

## Personalizzazione

### Nome istanza

IL** Nome istanza** l'impostazione modifica i metadati della dashboard, inclusi il titolo della pagina e il titolo dell'app Web Apple. Il manifest generato utilizza un nome statico, quindi questa impostazione non garantisce che un'app già installata venga rinominata.

### Favicon personalizzata

Una favicon personalizzata modifica la favicon del browser. Il manifesto di installazione pubblicizza ancora i file PNG sopra; la modifica della favicon non sostituisce le icone della schermata iniziale.

## Limitazioni

- **Connessione al server richiesta:** la navigazione della pagina, lo stato del dashboard e le richieste API non hanno un fallback offline.
- **Nessuna sincronizzazione in background:** le azioni offline non vengono messe in coda per la riproduzione.
- **Differenze del browser:** i menu di installazione, la presentazione delle finestre e il supporto delle notifiche variano in base alla piattaforma.
- **Nessuna cache di risposta API :** il lavoratore esclude API, dashboard e percorsi di autenticazione.
- **Icone di installazione statiche:** l'aggiornamento di tali icone richiede la modifica delle risorse pubblicizzate; i browser potrebbero conservare i metadati installati.

## Riferimento ai file

| File                                                                                   | Scopo                                                            |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifesto dell'app Web generato                                  |
| [public/sw.js](../../public/sw.js)                                                     | Caching, esclusioni e gestori di eventi di notifica              |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registrazione della produzione e ripristino della cache obsoleta |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Pagina Connettività, non un fallback offline automatico          |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadati della pagina e impostazioni del viewport                |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valori tema-colore condivisi                                     |
| [public/icon-512.png](../../public/icon-512.png)                                       | Icona dell'app 512 × 512                                         |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Icona Apple                                            |
