# CLI Integrations (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Per il manifest eseguibile condiviso, gli ambienti figlio con restrizioni e la configurazione Gemini persistente, vedere [contratti di lancio CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute fornisce una famiglia di comandi `setup-*` che configurano una codifica CLI (Codex, Claude Code, OpenCode, Cline, …) per utilizzare OmniRoute come backend, in modo che lo strumento comunichi** uno** endpoint e instradamenti OmniRoute al provider giusto con fallback automatico. Ogni comando legge il file** vivere** catalogo dei modelli da un OmniRoute in esecuzione (locale o remoto) e scrive il file di configurazione dello strumento** tuo** macchina. La chiave API fa riferimento a una variabile di ambiente ovunque lo strumento la supporti. I comandi che mantengono un file di ambiente locale dello strumento sono indicati di seguito.

C'è anche un launcher generico — `omniroute run <target>` — che genera `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` o `whycodes` con l'env corretto inserito, senza scrivere alcuna configurazione. I target e i relativi alias provengono dal manifest canonico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`) e `omniroute completion` offre le stesse parole target derivate dal manifest. I lanciatori legacy per strumento — `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex) — rimangono disponibili.

L'onboarding del fornitore è disponibile dallo stesso contesto local/remote. I comandi API-first riportati di seguito mantengono l'autenticazione di gestione separata dalle credenziali del provider e non stampano mai una credenziale nell'output strutturato:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Per gli script, preferisci `--credential-stdin` o `--credential-env`; `--credential` viene mantenuto per uso locale controllato. `providers remove` richiede `--yes` su un terminale non interattivo e tutti e cinque i comandi rispettano il contesto attivo o le opzioni globali `--base-url`/`--api-key`.

I selettori dei fornitori rifiutano prefissi, nomi o nomi di fornitori ambigui ID ; utilizzare una connessione completa ID quando più connessioni corrispondono. I comandi di creazione e modifica rileggono la connessione salvata e la rimozione verifica che non sia più leggibile. Un'importazione salta una coppia provider/name esistente. Le voci importate non possono sovrascrivere l'endpoint di gestione, il contesto o le credenziali di gestione fornite a CLI.

Per la configurazione di base una tantum scritta a mano delle due integrazioni più ricche, consulta gli approfondimenti per strumento:

- [Claude Configurazione del codice](./CLAUDE-CODE-CONFIGURATION.md)
- [configurazione Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modalità remota](./REMOTE-MODE.md) : guida uno OmniRoute remoto (VPS / Tailnet) dal tuo laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) : l'estensione OmniCopilot ; può anche eseguire questi comandi `setup-*` dall'interno dell'editor

---

## Tavolo maestro

Ogni comando onora il** contesto attivo** (impostato con `omniroute connect`, vedere [Remote Mode](./REMOTE-MODE.md) ) o flag `--remote <url> --api-key <key>` espliciti. "Locale vs remoto" di seguito significa: senza flag prende di mira `http://localhost:20128`; con `--remote` (o un contesto remoto attivo) recupera il catalogo da quel server e scrive la configurazione localmente.

| Comando                    | Attrezzo                          | Cosa scrive                                                                                                                                                                                    | Flag chiave                                                                                                                                | Locale vs remoto |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` : un profilo per modello di testo compatibile (`codex --profile <name>`)                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Entrambi         |
| `omniroute setup-claude`   | Codice Claude                     | `~/.claude/profiles/<name>/settings.json` : un profilo per modello abbinato (`CLAUDE_CONFIG_DIR`)                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Entrambi         |
| `omniroute setup-opencode` | OpenCode (compatibile con openai) | `~/.config/opencode/opencode.json` : fornitore `omniroute` con ogni modello di catalogo (`opencode -m omniroute/<model>`)                                                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Entrambi         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (modalità CLI ) + stampa le impostazioni dell'estensione del codice VS                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Entrambi         |
| `omniroute setup-kilo`     | Codice Kilo                       | `~/.local/share/kilo/auth.json` (CLI) + unisce `kilocode.*` in VS Codice `settings.json` se presente                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Entrambi         |
| `omniroute setup-continue` | Continua / `cn` CLI               | `~/.continue/config.yaml` : modelli `provider: openai`, chiave tramite `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Entrambi         |
| `omniroute setup-cursor`   | Cursor                            | Niente: stampa i passaggi in-app (Cursor config è opaco SQLite)                                                                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | Entrambi         |
| `omniroute setup-roo`      | Codice Roo                        | `~/.omniroute/roo-settings.json` (importa doc) + imposta `roo-cline.autoImportSettingsPath` se esiste un codice VS `settings.json`                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Entrambi         |
| `omniroute setup-crush`    | Schiacciare                       | `~/.config/crush/crush.json` : fornitore `openai-compat`, chiave tramite `$OMNIROUTE_API_KEY`                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Entrambi         |
| `omniroute setup-zed`      | Zed                               | `~/.config/zed/settings.json` : provider `openai_compatible.omniroute` (modelli ≤ 25 compatibili con gli strumenti), chiave tramite `$OMNIROUTE_API_KEY`                                       | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Entrambi         |
| `omniroute setup-goose`    | Oca                               | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + stampa la ricetta env                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Entrambi         |
| `omniroute setup-aider`    | Aiutante                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + stampa la ricetta env                                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Entrambi         |
| `omniroute setup-qwen`     | Codice Qwen                       | `~/.qwen/settings.json` : array `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Entrambi         |
| `omniroute setup-5dive`    | 5 immersioni (flotta agente)      | Niente sotto `$HOME` - scrive un 5dive** profilo di autenticazione** (`/var/lib/5dive/auth-profiles/<name>/`) tramite `5dive agent auth set`; solo root, viene eseguito sull'host della flotta | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Entrambi         |
| `omniroute setup-whycodes` | WhyCodes                          | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); il percorso è `$WHYCODES_HOME/config.toml` o `~/.whycodes/config.toml`                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Entrambi         |
| `omniroute run <target>`   | Lancio del runtime (generico)     | Niente: genera `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` con env e args corretti; Qwen e Gemini utilizzano una casa isolata temporanea                            | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Entrambi         |
| `omniroute launch`         | Codice Claude                     | Niente: genera `claude` con `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` iniettato                                                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Entrambi         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Niente: genera `codex` con il provider `omniroute` inserito tramite flag `-c`                                                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Entrambi         |

Note sui flag (verificati nell'origine del comando):

- `--remote <url>` : recupera il catalogo da uno OmniRoute remoto (sostituisce `--port` e il contesto attivo). `--api-key <key>` fornisce le credenziali per quel server (il valore predefinito è `OMNIROUTE_API_KEY` env var o il token del contesto attivo).
- `--only <patterns>` : sottostringhe separate da virgole; mantieni solo il modello IDs corrispondente (ad esempio `--only glm,kimi`). Disponibile su `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` : stampa esattamente ciò che verrebbe scritto senza toccare il filesystem. Disponibile su ogni comando `setup-*`** tranne** `setup-cursor` (che non scrive mai un file).
- `--model <id>` : richiesto (o selezionato in modo interattivo) per gli strumenti che non dispongono del rilevamento automatico del modello: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Questi strumenti accettano anche `--yes` per esecuzioni non interattive (che quindi richiedono `--model`). `setup-opencode` impiega `--model` per impostare il modello di livello superiore predefinito.
- `--model <id>` su `omniroute run` segue il cablaggio per destinazione del manifest (`bin/cli/cli-manifest.mjs`):** aiutante** riceve `--model openai/<id>` e** opencode** `--model omniroute/<id>` (il prefisso viene aggiunto solo quando l'id non lo riporta già);** qwen** E** Gemelli** ricevere l'id parola per parola;** claude** lo ottiene tramite `ANTHROPIC_MODEL`,** oca** tramite `GOOSE_MODEL`,** whycodes** tramite `-P omniroute -m <id>` e** codice** tramite `-c model_providers.omniroute.*` args.**Qwen è l'unico target di esecuzione che richiede fortemente `--model`** — `omniroute run qwen` senza di esso esce `2` con un errore esplicito.
- `--port <port>` — porta OmniRoute locale ( `20128` predefinita, ignorata quando è impostato `--remote` ). Presente su tutti `setup-*` ed entrambi i launcher.
- Codici di uscita `omniroute run` : il codice di uscita del figlio CLI viene propagato alla lettera; `2` = argomenti non validi (destinazione non supportata, `--model` richiesto mancante, protezione del contenitore); `127` = il binario di destinazione non è in `PATH`; `130`/`143`/`129` quando il lancio viene terminato da `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = altro errore di avvio del runtime.
- I due lanciatori (`launch`, `launch-codex`) accettano `--profile <name>` per selezionare un profilo scritto da `setup-claude` / `setup-codex`, oltre ad argomenti pass-through per il binario `claude` / `codex` sottostante.

Il selettore interattivo è condiviso anche dalle ricette di setup:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` attualmente delega alle ricette testate per `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` e `5dive`. Le voci del catalogo solo IDE, MITM e solo guida rimangono flussi `setup-*`/manual espliciti e non vengono presentate come destinazioni avviabili.

> `setup-opencode` è il** leggero e compatibile con openai** integrazione OpenCode. Esiste anche un'integrazione di plugin più ricca — `omniroute setup opencode` — che installa `@omniroute/opencode-plugin`. Sono comandi diversi; la tabella sopra documenta `setup-opencode`.
>
> Il plugin è disponibile in due pacchetti, uno per OpenCode major, perché i due caricatori si aspettano punti di ingresso diversi: `@omniroute/opencode-plugin` per OpenCode v1 e `@omniroute/opencode-plugin-v2` per OpenCode v2. Il pacchetto v2 è nuovo (`0.1.0`) e segue un contratto host che è ancora in movimento, quindi legge la forma OpenCode seed nella bozza del catalogo anziché assumerne una. Installalo aggiungendo una voce `plugins` a `opencode.json`; `omniroute setup opencode` installa comunque il pacchetto v1. Le opzioni e l'ordine di ricerca delle credenziali si trovano nel pacchetto README.

---

## Utilizzo locale

Con OmniRoute in esecuzione su `localhost:20128`, è sufficiente eseguire il comando di configurazione per il proprio strumento. Il catalogo viene recuperato dal server locale.

```bash
# Codex: scrive un profilo per ogni modello corrispondente in ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa un profilo generato

# Claude Code: scrive i profili per modello, quindi ne avvia uno
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: scrive il provider compatibile con OpenAI con tutti i modelli del catalogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenziata tramite {env:OMNIROUTE_API_KEY}, mai salvata su disco
opencode -m omniroute/glm/glm-5.2 "..."

# Gli strumenti senza rilevamento automatico richiedono un modello esplicito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Anteprima senza scrivere nulla:
omniroute setup-continue --dry-run
```

Avvia senza scrivere alcuna configurazione (solo iniezione delle variabili d'ambiente):

```bash
omniroute launch                 # Claude Code → OmniRoute locale
omniroute launch-codex           # Codex CLI → OmniRoute locale
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Percorso esplicito del comando: inoltra tutto ciò che segue --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Utilizzo remoto

Indirizza qualsiasi comando di configurazione verso un'istanza OmniRoute remota con `--remote` + `--api-key`. Il catalogo viene recuperato dall'istanza remota; la configurazione viene scritta sul computer locale.

```bash
# OpenCode verso un VPS remoto, mantenendo solo i modelli glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # esporta prima OMNIROUTE_API_KEY

# Profili Codex da un catalogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Avvia una CLI direttamente verso l'istanza remota
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Anziché specificare ogni volta `--remote`/`--api-key`, accedi una volta e lascia che il **contesto attivo** li fornisca automaticamente:

```bash
omniroute connect 192.168.0.15        # genera un token con ambito limitato e salva il contesto
omniroute setup-codex                 # ← ora usa il catalogo remoto
omniroute setup-opencode              # ← lo stesso
omniroute launch                      # ← Claude Code verso l'istanza remota
```

Consulta [Modalità remota](./REMOTE-MODE.md) per informazioni su contesti, ambiti e gestione dei token.

---

## Flotte di agenti 5dive

[5dive](https://5dive.ai) esegue una flotta di agenti di programmazione di lunga durata, ciascuno come unità systemd sotto il proprio utente Unix. Non è di per sé una CLI di programmazione, quindi non c'è nulla che `omniroute run` possa avviare: `5dive` è una destinazione di **sola configurazione**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Entrambe le forme scrivono un **profilo di autenticazione** 5dive e ogni postazione `claude` associata a quel profilo comunica quindi con OmniRoute. Tre aspetti sono specifici di questa destinazione:

- **Viene eseguito sull'host della flotta, come root.** I verbi di 5dive agiscono sulle unità systemd locali e su una directory di stato di proprietà di root; non esiste una modalità remota. La procedura si riesegue tramite `sudo` quando non è già in esecuzione come root (`--no-sudo` disattiva questo comportamento e stampa invece il comando).
- **L'endpoint deve usare `https://`, a meno che non sia di loopback.** La chiave API dell'agente viene trasmessa a tale URL a ogni richiesta e 5dive rifiuta un endpoint esterno al computer che utilizzi testo in chiaro. Un indirizzo LAN privato non costituisce un'eccezione.
- **Il modello fissato per ogni postazione ha la precedenza sul profilo.** Il profilo include `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ma una postazione ancora vincolata all'ID di un modello standard fallisce alla prima interazione con _"Si è verificato un problema con il modello selezionato"_. Specifica `--agent <name>` (ripetibile) per fissare anche i modelli delle postazioni; in caso contrario, la procedura stampa il comando.

La chiave API viene passata a 5dive tramite **stdin** (`--api-key=-`), quindi non compare mai nell'output di `ps`.

Puntare il profilo a una **combinazione** OmniRoute anziché a un singolo modello consente alla flotta di utilizzare il failover del provider: quando l'endpoint primario è diventato completamente irraggiungibile a metà interazione durante l'esecuzione documentata in [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), l'agente ha completato i passaggi rimanenti usando il fallback senza mai mostrare l'interruzione.

---

## Convenzioni base URL (quali strumenti vogliono `/v1`)

OmniRoute espone la superficie OpenAI in `/v1`, la superficie Anthropic alla radice e una superficie Gemini nativa in `/v1beta`. Ogni integrazione è collegata al modulo previsto dal suo strumento (verificato nell'origine del comando):

| Integrazione                                                               | Base URL scritta | `/v1`?                                       |
| -------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | radice           | No: Cline aggiunge `/v1/chat/completions`    |
| `setup-goose` (`OPENAI_HOST`)                                              | radice           | No: Goose aggiunge il percorso               |
| `setup-aider` (`OPENAI_API_BASE`)                                          | radice           | No: LiteLLM aggiunge `/v1/chat/completions`  |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | con `/v1`        | SÌ                                           |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | con `/v1`        | SÌ                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | radice           | No: il codice Claude aggiunge `/v1/messages` |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | con `/v1`        | SÌ                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | con `/v1`        | SÌ                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | radice           | No, SDK aggiunge `/v1beta/models/…`          |
| `setup-5dive` (`ANTHROPIC_BASE_URL` nel profilo di autenticazione)         | radice           | No: il codice Claude aggiunge `/v1/messages` |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | con `/v1`        | Sì, WhyCodes pubblica `/chat/completions`    |

---

## Mantenere le dipendenze native durante l'aggiornamento: `--include=optional`

Quando esegui l'aggiornamento con `omniroute update` (dopo la conferma oppure con `--apply`),
OmniRoute esegue l'installazione includendo automaticamente `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Questo **non** è un flag da passare a `omniroute update`: viene sempre applicato dal
programma di aggiornamento. Garantisce che le `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, lo stack SLM di LLMLingua) non vengano rimosse durante l'aggiornamento, anche se la configurazione
npm contiene `omit=optional`, che altrimenti eliminerebbe silenziosamente il driver SQLite
nativo e l'integrazione con il portachiavi del sistema operativo. Per visualizzare in anteprima il comando esatto senza applicarlo:

```bash
omniroute update --dry-run
# [ESECUZIONE DI PROVA] Verrebbe eseguito: npm install -g omniroute@latest --include=optional
```

Altri flag di `omniroute update` (verificati nel sorgente): `--check` (termina con codice 1 se
non aggiornato), `--apply` (installa senza chiedere conferma), `--changelog`, `--no-backup`,
`--yes`.

---

## CLI di Google Gemini tramite `omniroute run gemini`

Contratto verificato con `@google/gemini-cli` 0.50.0: la CLI rispetta
`GOOGLE_GEMINI_BASE_URL` e invia `POST /v1beta/models/<model>:generateContent`
(e `:streamGenerateContent?alt=sse`) a tale URL, che corrisponde esattamente all'interfaccia Gemini
nativa di OmniRoute (`/v1beta`). `omniroute run gemini` configura tutto automaticamente:

- `GOOGLE_GEMINI_BASE_URL` → l'URL di base OmniRoute attivo (radice, senza `/v1`);
- `GEMINI_API_KEY` → la credenziale OmniRoute risolta (opzione/ambiente/contesto);
- una **`GEMINI_CLI_HOME` temporanea e isolata**, il cui `.gemini/settings.json`
  seleziona l'autenticazione `gemini-api-key`, affinché una sessione Google OAuth memorizzata (Code Assist)
  non prevalga mai sull'avvio indirizzato a OmniRoute; viene rimossa dopo l'uscita;
- **igiene dell'ambiente**: dall'ambiente del processo figlio vengono rimosse `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` e `GOOGLE_GENAI_USE_GCA` (che reindirizzerebbero
  l'autenticazione a Vertex/Code Assist) e viene impostata `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  come ulteriore misura di sicurezza; agli altri target di `run` viene applicato lo stesso
  trattamento per le rispettive variabili in conflitto;
- inserimento di `--model <id>` da `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Il controllo dell'attendibilità dell'area di lavoro di Gemini si applica anche in modalità headless: passa
personalmente `--skip-trust` (oppure contrassegna interattivamente la directory come attendibile); il programma di avvio
non lo aggira deliberatamente. Questo programma di avvio è distinto dalla **registrazione
ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), che rimane
l'integrazione con il protocollo degli agenti per `/dashboard/acp-agents`.

---

## Verifica smoke reale (opt-in)

Le esecuzioni deterministiche di regressione del piano di avvio vengono effettuate nella CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Per convalidare i binari REALI rispetto a un server
OmniRoute REALE, è disponibile un harness opt-in in
`tests/integration/upstream-cli-smoke.int.test.ts`. Non viene mai eseguito automaticamente
(ogni sotto-test viene ignorato a meno che `RUN_CLI_SMOKE=1`), passa la credenziale tramite il NOME
della variabile di ambiente (mai tramite il valore), oscura le stringhe con formato simile a una chiave in qualsiasi output registrato, ignora
i target il cui binario non è installato e classifica gli errori come
autenticazione / upstream / configurazione anziché come semplice valore booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opzionale: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` limita la verifica;
`OMNIROUTE_SMOKE_TIMEOUT_MS` sostituisce il timeout predefinito di 120 secondi per ciascun target.

---

## Vedi anche

- [Configurazione di Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — la guida approfondita a Claude Code
- [Configurazione di Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configurazione di base iniziale di `[model_providers.omniroute]`
- [Modalità remota](./REMOTE-MODE.md) — contesti, token di accesso con ambito limitato e controllo di un server remoto
- [Riferimento degli strumenti CLI](../reference/CLI-TOOLS.md) — il catalogo completo degli strumenti supportati e delle pagine della dashboard
- [Guida alla configurazione](./SETUP_GUIDE.md) — metodi di installazione e procedura guidata per il primo avvio
