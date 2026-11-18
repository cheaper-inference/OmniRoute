# CLI Integrations (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Za dijeljeni izvršni manifest, ograničena podređena okruženja i trajno postavljanje Gemini, pogledajte [CLI launch contracts](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute isporučuje obitelj `setup-*` naredbi koje konfiguriraju kodiranje CLI (Codex, Claude kod, OpenCode, Cline, …) za korištenje OmniRoute kao pozadine — tako da alat razgovara s** jedan** endpoint i OmniRoute rute do pravog pružatelja usluga s automatskim vraćanjem. Svaka naredba glasi** živjeti** katalog modela iz pokrenutog OmniRoute (lokalnog ili udaljenog) i zapisuje vlastitu konfiguracijsku datoteku alata na** tvoje** stroj. Ključ API referencira varijabla okoline gdje god ga alat podržava. Naredbe koje održavaju datoteku lokalne okoline alata navedene su u nastavku.

Postoji i generički pokretač — `omniroute run <target>` — koji pokreće `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` ili `whycodes` s ubačenim pravim env-om, bez pisanja bilo kakve konfiguracije. Ciljevi i njihovi aliasi dolaze iz kanonskog manifesta `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), a `omniroute completion` nudi iste ciljne riječi izvedene iz manifesta. Naslijeđeni pokretači po alatima — `omniroute launch` (Claude kod) i `omniroute launch-codex` (Codex) — ostaju dostupni.

Uključivanje pružatelja dostupno je iz istog local/remote konteksta. API-first naredbe u nastavku drže autentifikaciju upravljanja odvojenom od vjerodajnica pružatelja usluga i nikada ne ispisuju vjerodajnice u strukturiranom izlazu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Za skripte, preferirajte `--credential-stdin` ili `--credential-env`; `--credential` se zadržava za kontroliranu lokalnu upotrebu. `providers remove` zahtijeva `--yes` na neinteraktivnom terminalu, a svih pet naredbi poštuju aktivni kontekst ili globalne opcije `--base-url`/`--api-key`.

Selektori pružatelja usluga odbijaju dvosmislene ID prefikse, imena ili imena pružatelja usluga; koristite punu vezu ID kada se nekoliko veza podudara. Naredbe za stvaranje i uređivanje vraćaju spremljenu vezu, a uklanjanje potvrđuje da više nije čitljiva. Uvozom se preskače postojeći provider/name par. Uvezeni unosi ne mogu nadjačati krajnju točku upravljanja, kontekst ili vjerodajnice za upravljanje dostavljene CLI.

Za jednokratnu, rukom pisanu osnovnu postavku dviju najbogatijih integracija, pogledajte detaljna istraživanja po alatu:

- [konfiguracija Claude koda](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguracija](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — upravljajte daljinskim OmniRoute (VPS / Tailnet) s vašeg prijenosnog računala
- [VS kod Copilot Chat](./VSCODE-COPILOT.md) — proširenje OmniCopilot ; također može pokrenuti ove `setup-*` naredbe za vas iz uređivača

---

## Glavni stol

Svaka zapovijed poštuje** aktivni kontekst** (postavljeno pomoću `omniroute connect`, pogledajte [Remote Mode](./REMOTE-MODE.md) ) ili eksplicitne `--remote <url> --api-key <key>` zastavice. "Lokalno nasuprot udaljenom" u nastavku znači: bez oznaka cilja `http://localhost:20128`; sa `--remote` (ili aktivnim daljinskim kontekstom) dohvaća katalog s tog poslužitelja i zapisuje konfiguraciju lokalno.

| Naredba                    | Alat                                       | Što piše                                                                                                                                                     | Ključne zastavice                                                                                                                          | Lokalno vs udaljeno |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                           | `~/.codex/<name>.config.toml` — jedan profil po kompatibilnom tekstualnom modelu (`codex --profile <name>`)                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oba                 |
| `omniroute setup-claude`   | Claude kod                                 | `~/.claude/profiles/<name>/settings.json` — jedan profil po odgovarajućem modelu (`CLAUDE_CONFIG_DIR`)                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oba                 |
| `omniroute setup-opencode` | OpenCode (openai kompatibilan)             | `~/.config/opencode/opencode.json` — pružatelj usluga `omniroute` sa svakim modelom kataloga (`opencode -m omniroute/<model>`)                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oba                 |
| `omniroute setup-cline`    | Cline                                      | `~/.cline/data/{globalState,secrets}.json` ( način rada CLI ) + ispisuje postavke ekstenzije VS koda                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oba                 |
| `omniroute setup-kilo`     | Šifra kilograma                            | `~/.local/share/kilo/auth.json` (CLI) + spaja `kilocode.*` u VS Kod `settings.json` ako postoji                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oba                 |
| `omniroute setup-continue` | Nastavi / `cn` CLI                         | `~/.continue/config.yaml` — `provider: openai` modeli, ključ preko `${{ secrets.OMNIROUTE_API_KEY }}`                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `omniroute setup-cursor`   | Cursor                                     | Ništa — ispisuje korake unutar aplikacije (Cursor konfiguracija je neprozirna SQLite)                                                                        | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oba                 |
| `omniroute setup-roo`      | Rooov kod                                  | `~/.omniroute/roo-settings.json` (uvoz dokumenta) + postavlja `roo-cline.autoImportSettingsPath` ako postoji VS kod `settings.json`                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oba                 |
| `omniroute setup-crush`    | Crush                                      | `~/.config/crush/crush.json` — `openai-compat` pružatelj, ključ preko `$OMNIROUTE_API_KEY`                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `omniroute setup-zed`      | Zed                                        | `~/.config/zed/settings.json` — pružatelj usluga `openai_compatible.omniroute` (modeli s mogućnostima alata ≤ 25), ključ putem `$OMNIROUTE_API_KEY`          | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Oba                 |
| `omniroute setup-goose`    | Guska                                      | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ispisuje env recept                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `omniroute setup-aider`    | Aider                                      | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ispisuje env recept                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `omniroute setup-qwen`     | Qwen kod                                   | `~/.qwen/settings.json` — V4 `modelProviders.openai` niz zqc + `~/.qwen/.env` `OMNIROUTE_API_KEY`                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oba                 |
| `omniroute setup-5dive`    | 5dive (agentska flota)                     | Ništa ispod `$HOME` — piše 5dive** autentičan profil** (`/var/lib/5dive/auth-profiles/<name>/`) preko `5dive agent auth set`; samo root, radi na hostu flote | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oba                 |
| `omniroute setup-whycodes` | WhyCodes                                   | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); put je `$WHYCODES_HOME/config.toml` ili `~/.whycodes/config.toml`                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `omniroute run <target>`   | Pokretanje u vrijeme izvođenja (generički) | Ništa — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` s pravim env i args; Qwen i Gemini koriste privremeni izolirani dom     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba                 |
| `omniroute launch`         | Claude kod                                 | Ništa — stvara `claude` s ubrizganim `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                             | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba                 |
| `omniroute launch-codex`   | OpenAI Codex CLI                           | Ništa — pokreće `codex` s pružateljem `omniroute` umetnutim putem `-c` zastavica                                                                             | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba                 |

Napomene o zastavicama (provjereno u izvoru naredbe):

- `--remote <url>` — dohvaćanje kataloga s udaljenog OmniRoute (nadjačava `--port` i aktivni kontekst). `--api-key <key>` daje vjerodajnicu za taj poslužitelj (zadano je `OMNIROUTE_API_KEY` env var, ili token aktivnog konteksta).
- `--only <patterns>` — podnizovi odvojeni zarezima; zadržati samo model IDs koji odgovara (npr. `--only glm,kimi`). Dostupno na `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — ispisati točno ono što bi bilo napisano bez diranja datotečnog sustava. Dostupno na svakoj `setup-*` naredbi** osim** `setup-cursor` (koji nikada ne piše datoteku).
- `--model <id>` — potrebno (ili odabrano interaktivno) za alate koji nemaju automatsko otkrivanje modela: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Ti alati također prihvaćaju `--yes` za neinteraktivna izvođenja (što onda zahtijeva `--model`). `setup-opencode` uzima `--model` za postavljanje zadanog modela najviše razine.
- `--model <id>` na `omniroute run` slijedi ožičenje manifesta po cilju (`bin/cli/cli-manifest.mjs`):** pomagač** prima `--model openai/<id>` i** otvoreni kod** `--model omniroute/<id>` (prefiks se dodaje samo kada ga ID već ne nosi);** qwen** i** Blizanci** dobiti id doslovno;** Claude** dobiva preko `ANTHROPIC_MODEL`,** guska** putem `GOOSE_MODEL`,** zaštokodovi** preko `-P omniroute -m <id>`, i** kodeks** preko `-c model_providers.omniroute.*` args.**Qwen je jedini run target koji teško zahtijeva `--model`** — `omniroute run qwen` bez njega izlazi iz `2` s eksplicitnom greškom.
- `--port <port>` — lokalni OmniRoute port (zadani `20128`, zanemaruje se kada je postavljen `--remote` ). Prisutan na svim `setup-*` i oba pokretača.
- `omniroute run` izlazni kodovi: vlastiti izlazni kod djeteta CLI prenosi se doslovno; `2` = nevažeći argumenti (nepodržani cilj, nedostaje potreban `--model`, čuvar spremnika); `127` = ciljna binarna datoteka nije u `PATH`; `130`/`143`/`129` kada je pokretanje završilo `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = drugi neuspjeh pokretanja vremena izvođenja.
- Dva pokretača (`launch`, `launch-codex`) prihvaćaju `--profile <name>` za odabir profila koji je napisao `setup-claude` / `setup-codex`, plus prolazne argumente za temeljnu `claude` / `codex` binarnu datoteku.

Interaktivni birač također dijele recepti za postavljanje:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` trenutno delegira testirane recepte za `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` i `5dive`. IDE-only, MITM i guide-only kataloški unosi ostaju eksplicitni `setup-*`/ručni tokovi i ne predstavljaju se kao ciljevi za pokretanje.

> `setup-opencode` je** lagani openai kompatibilan** OpenCode integracija. Tu je i bogatija integracija dodatka — `omniroute setup opencode` — koji instalira `@omniroute/opencode-plugin`. To su različite naredbe; tablica iznad dokumenata `setup-opencode`.
>
> Dodatak dolazi u dva paketa, jedan za OpenCode major, jer dva učitavača očekuju različite ulazne točke: `@omniroute/opencode-plugin` za OpenCode v1 i `@omniroute/opencode-plugin-v2` za OpenCode v2. Paket v2 je nov (`0.1.0`) i slijedi glavni ugovor koji se još uvijek kreće, tako da čita OpenCode sjemenke oblika u nacrtu kataloga umjesto da ga preuzima. Instalirajte ga dodavanjem `plugins` unosa u `opencode.json`; `omniroute setup opencode` i dalje instalira paket v1. Opcije i redoslijed pretraživanja vjerodajnica nalaze se u paketu README.

---

## Lokalna uporaba

S OmniRoute koji radi na `localhost:20128`, jednostavno pokrenite narebu za postavljanje vašeg
alata. Katalog se dohvaća s lokalnog poslužitelja.

```bash
# Codex: napiši profil po podudarenom modelu u ~/.codex/
omniroute setup-codex
codex --profile glm52            # koristi generirani profil

# Claude Code: napiši profile po modelu, zatim pokreni jedan
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: napiši openai-kompatibilnog pružatelja sa svim modelima iz kataloga
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referencira se putem {env:OMNIROUTE_API_KEY}, nikada na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Alati bez automatskog otkrivanja zahtijevaju eksplicitan model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pregled bez ikakvih zapisivanja:
omniroute setup-continue --dry-run
```

Pokretanje bez pisanja ikakve konfiguracije (samo ubrizgavanje okruženja):

```bash
omniroute launch                 # Claude Code → lokalni OmniRoute
omniroute launch-codex           # Codex CLI → lokalni OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Eksplicitna putanja naredbe: proslijedi sve što dolazi iza --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Udaljenja uporaba

Usmjerite bilo koju naredbu za postavljanje prema udaljenom OmniRouteu s `--remote` + `--api-key`. Katalog
se dohvaća s udaljenog poslužitelja; konfiguracija se zapisuje na vašem lokalnom računalu.

```bash
# OpenCode prema udaljenom VPS-u, zadrži samo modele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # prvo izvezite OMNIROUTE_API_KEY

# Codex profili iz udaljenog kataloga
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Pokretanje CLI-ja izravno prema udaljenom poslužitelju
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Umjesto da svaki put prosljeđujete `--remote`/`--api-key`, prijavite se jednom i prepustite
**aktivnom kontekstu** da ih automatski osigura:

```bash
omniroute connect 192.168.0.15        # kreira opsežni token, pohranjuje kontekst
omniroute setup-codex                 # ← sada koristi udaljeni katalog
omniroute setup-opencode              # ← isto
omniroute launch                      # ← Claude Code prema udaljenom poslužitelju
```

Pogledajte [Udaljeni način rada](./REMOTE-MODE.md) za kontekste, opsege i upravljanje tokenima.

---

## 5dive flote agenata

[5dive](https://5dive.ai) pokreće flotu dugotrajnih agenata za kodiranje, od kojih je svaki
systemd jedinica pod vlastitim Unix korisnikom. To nije CLI za kodiranje sam po sebi, pa nema
ničega što bi `omniroute run` trebao pokrenuti — `5dive` je cilj **samo za konfiguriranje**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Oba oblika zapisuju jedan 5dive **auth profil**, a svako `claude` sjedalo vezano uz taj
profil tada komunicira s OmniRouteom. Tri stvari su specifične za ovaj cilj:

- **Pokreće se na poslužitelju flote, kao root.** 5dive-ovi glagoli djeluju na lokalne systemd jedinice
  i direktorij stanja koji je u vlasništvu roota; ne postoji udaljeni način rada. Recept se ponovno izvršava kroz
  `sudo` kada već nije root (`--no-sudo` to isključuje i umjesto toga ispisuje naredbu).
- **Krajnja točka mora biti `https://` osim ako nije loopback.** API ključ agenta
  putuje tom URL-om na svakom zahtjevu, a 5dive odbija nešifriranu krajnju točku izvan uređaja.
  Privatna LAN adresa nije iznimka.
- **Vlastiti pin modela svakog sjedala nadmašuje profil.** Profil nosi
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ali sjedalo koje je i dalje prikvačeno na standardni
  id modela ne uspijeva pri prvom potezu s porukom _"There's an issue with the selected model"_.
  Prosljeđujte `--agent <name>` (može se ponavljati) da biste prikvačili i sjedala; recept ispisuje
  naredbu kada to ne učinite.

API ključ se predaje 5diveu putem **stdin-a** (`--api-key=-`), pa se nikada ne pojavljuje u
ispisu `ps`.

Usmjeravanje profila na OmniRoute **kombinaciju** umjesto na jedan model ono je što
osigurava prebacivanje pružatelja usluge za flotu: kada je primarna krajnja točka potpuno pala usred poteza
u snimljenom izvođenju na
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent je završio
preostale korake na rezervnoj krajnjoj točki i nikada nije izložio prekid rada.

---

## Osnovne URL konvencije (koji alati žele `/v1`)

OmniRoute izlaže OpenAI površinu na `/v1`, Anthropic površinu na korijenu i nativnu Gemini površinu na `/v1beta`. Svaka integracija povezana je s oblikom koji njezin alat očekuje (potvrđeno u izvoru naredbe):

| Integracija                                                                | Napisana baza URL | `/v1`?                                       |
| -------------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | korijen           | Ne — Cline dodaje `/v1/chat/completions`     |
| `setup-goose` (`OPENAI_HOST`)                                              | korijen           | Ne — guska dodaje stazu                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | korijen           | Ne — LiteLLM dodaje `/v1/chat/completions`   |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | sa `/v1`          | Da                                           |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | sa `/v1`          | Da                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | korijen           | Ne — Claude kod dodaje `/v1/messages`        |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | sa `/v1`          | Da                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | sa `/v1`          | Da                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | korijen           | Ne — SDK dodaje `/v1beta/models/…`           |
| `setup-5dive` (`ANTHROPIC_BASE_URL` u profilu autentifikacije)             | korijen           | Ne — Claude kod dodaje `/v1/messages`        |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | sa `/v1`          | Da — WhyCodes objavljuje `/chat/completions` |

---

## Zadržavanje izvornih ovisnosti pri ažuriranju: `--include=optional`

Kada ažurirate pomoću `omniroute update` (nakon potvrde ili s `--apply`),
OmniRoute pokreće instalaciju s ugrađenom zastavicom `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** zastavica koju prosljeđujete naredbi `omniroute update` — uvijek je primjenjuje
program za ažuriranje. Jamči da `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM skup) prežive ažuriranje čak i ako vaša npm konfiguracija
ima postavljeno `omit=optional`, što bi inače tiho uklonilo izvorni SQLite
upravljački program i vezanje OS privjeska za ključeve. Za pregled točne naredbe bez primjene:

```bash
omniroute update --dry-run
# [PROBNI POKRET] Bi pokrenuo: npm install -g omniroute@latest --include=optional
```

Ostale zastavice naredbe `omniroute update` (provjereno u izvornom kodu): `--check` (izlaz 1 ako je
zastarjelo), `--apply` (instalacija bez upita), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor provjeren za `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i šalje `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) na njega — točno OmniRouteovo izvorno
Gemini sučelje (`/v1beta`). `omniroute run gemini` to automatski povezuje:

- `GOOGLE_GEMINI_BASE_URL` → aktivni OmniRoute osnovni URL (korijen, bez `/v1`);
- `GEMINI_API_KEY` → razriješena OmniRoute vjerodajnica (opcija/env/kontekst);
- **privremeni izolirani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  odabire autentifikaciju `gemini-api-key`, tako da pohranjena Google OAuth sesija (Code Assist)
  nikada ne nadjača OmniRoute-usmjereno pokretanje — uklanja se nakon izlaska;
- **higijene okoline**: dječja okolina pročišćuje se od `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (koji bi preusmjerili
  autentifikaciju na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` postavlja se
  kao rezervna mjera pojačane sigurnosti — ostale mete `run` dobivaju jednaki
  tretman za vlastite varijable koje su u sukobu;
- ubacivanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminijev zaštitnik povjerenja radnog prostora i dalje se primjenjuje u bezglavom načinu — prenesite
`--skip-trust` (ili interaktivno prihvatite direktorij) sami; pokretač
to namjerno ne zaobilazi. Ovaj pokretač razlikuje se od **ACP
registracije** (`src/lib/acp/registry.ts`, `gemini --acp`), koja ostaje
integracija agentskog protokola za `/dashboard/acp-agents`.

---

## Pravi smoke test (opt-in)

Determinističko pokretanje regresijskih testova plana pokretanja u CI-u (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Za validaciju PRAVIH binara protiv PRAVOG
OmniRoute poslužitelja, opt-in okvir postoji na
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikada se ne pokreće automatski
(svaki podtest se preskače osim ako nije postavljen `RUN_CLI_SMOKE=1`), prosljeđuje vjerodajnicu putem env-var
NAZIVA (nikada putem vrijednosti), uklanja nizove koji izgledaju kao ključevi iz bilo kojeg snimljenog izlaza, preskače
ciljeve čiji binarni program nije instaliran, te klasificira neuspjehe kao
auth / upstream / config umjesto jednostavne logičke vrijednosti:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Neobavezno: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ograničava sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` nadjačava vremensko ograničenje od 120s po cilju.

---

## Vidi također

- [Konfiguracija Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — detaljniji vodič za Claude Code
- [Konfiguracija Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednokratno postavljanje `[model_providers.omniroute]` baze
- [Udaljeni način rada](./REMOTE-MODE.md) — konteksti, ograničeni pristupni tokeni, upravljanje udaljenim poslužiteljem
- [Referenca CLI alata](../reference/CLI-TOOLS.md) — potpuni katalog podržanih alata i stranica nadzorne ploče
- [Vodič za postavljanje](./SETUP_GUIDE.md) — metode instalacije i uvođenje pri prvom pokretanju
