# Release Checklist (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Ultimo aggiornamento:** 2026-08-28 — v3.8.51
> Flusso di rilascio semplificato che sfrutta le skill di Claude Code per l'automazione.
>
> **Mantieni verdi la coda e il branch tra un rilascio e l'altro:** consulta [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (famiglia `/green-prs` + `npm run check:release-green` + `/babysit` + esecuzione notturna). Eseguire
> periodicamente queste operazioni — e soprattutto **prima** di questa checklist — fa sì che la PR di rilascio parta già verde.

## In breve

```bash
# 1. Incrementa la versione + genera il CHANGELOG (skill)
/version-bump-cc patch    # oppure minor/major

# 2. Esegui localmente il controllo di qualità
npm run check              # lint + test
npm run test:coverage      # controllo completo della copertura (60/60/60/60)

# 3. Esegui la build e lo smoke test
npm run build
npm run test:e2e           # facoltativo ma consigliato

# 4. Genera il rilascio (skill)
/generate-release-cc

# 5. Esegui il deployment (skill)
/deploy-vps-both-cc        # oppure akamai-cc / local-cc

# 6. Acquisisci le evidenze del rilascio (skill)
/capture-release-evidences-cc
```

## Pubblicazione attendibile di npm (predefinita dalla v3.8.51) — in staging su richiesta, diretta come ripiego

`npm-publish.yml` pubblica tramite **npm Trusted Publishing (OIDC)** per impostazione predefinita: il
job `stage-npm` (ospitato da GitHub) scambia l'id-token di GitHub con una credenziale npm
di breve durata per quell'esecuzione — nessun token npm di lunga durata nei secret del repository, nessuna richiesta di 2FA, provenienza allegata.
Questo è il meccanismo di esclusione autorizzato da npm ora che i token che ignorano la 2FA sono in fase di dismissione;
ripristina il flusso completamente automatico che il progetto aveva fino alla v3.8.48, mantenendo al contempo la
garanzia WS1.3 (un token sottratto non può pubblicare da solo — non esiste alcun token).

**Configurazione una tantum (proprietario):** npmjs.com → pacchetto `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietario `diegosouzapw`, repository `OmniRoute`, workflow `npm-publish.yml`
(ambiente: nessuno). Finché questa configurazione non esiste, il passaggio automatico non riesce con `ENEEDAUTH`:
avvia nuovamente il workflow con `publish_mode=staged` (vedi sotto) oppure `direct`.

### Pubblicazione in staging (su richiesta — `publish_mode=staged`)

Il workflow npm-publish non pubblica più direttamente: avvia il tarball creato
(`check:pack-boot`) e poi esegue `npm stage publish` — i byte esatti vengono depositati nel
registro, ma **non sono installabili** finché il proprietario non li approva. Il controllo umano tramite 2FA è stato spostato
a DOPO la verifica, non prima.

**Flusso del proprietario dopo che il workflow diventa verde:**

1. `npm stage list omniroute` — individua l'ID dello stage (indicato anche nel riepilogo del workflow).
2. Verifica i byte in staging (consigliato): `npm stage download <id>`, quindi installa il
   tarball scaricato in un prefisso temporaneo e avvialo (`npm run check:pack-boot` automatizza
   lo stesso verdetto di creazione del pacchetto→installazione→avvio nella CI).
3. `npm stage approve <id>` — la richiesta di 2FA CORRISPONDE alla pubblicazione. `npm stage reject <id>` elimina lo stage.
4. Rete di sicurezza post-pubblicazione: il verificatore post-pubblicazione (WS1.4 del piano v3.8.49) installa la
   versione pubblicata dal registro pubblico in un container pulito e la avvia.

**Ripiego di emergenza:** `workflow_dispatch` con `publish_mode=direct` ripristina la
precedente esecuzione immediata di `npm publish` (utilizzala solo se lo staging stesso non funziona correttamente; documentane il motivo).

**Rafforzamento una tantum (proprietario, npmjs.com):** configura il Trusted Publisher per
`omniroute` in modalità solo staging, in modo che un token di lunga durata sottratto non possa eseguire `npm publish`
direttamente da alcuna posizione — la CI può solo effettuare lo staging; soltanto la 2FA del proprietario consente il rilascio.

**Procedura per gli artefatti non validi (invariata):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
come reazione predefinita (richiede pochi minuti ed è reversibile); `npm unpublish` soltanto entro la finestra di 72 ore/senza dipendenti
e mai come prima azione. Docker: non riscrivere mai un tag di versione — il rollback consiste nel
far puntare nuovamente `latest` all'ultimo digest valido.

**`latest` su Docker Hub (obbligatorio per ogni pubblicazione SemVer stabile):** il
workflow `docker-publish` deve assegnare **entrambi** i tag `X.Y.Z` e, quando
`should-promote-latest.sh` conferma che si tratta della versione SemVer stabile più alta, `:latest`
con lo **stesso digest**. Dopo il job: il digest di `latest` su Hub corrisponde al nuovo
digest SemVer e `last_updated` è stato aggiornato. Non lasciare `:latest` su una build
precedente mentre le note di rilascio descrivono correzioni presenti soltanto in git. Le
guide introduttive di Compose utilizzano `:latest`; GitOps dovrebbe continuare a fissare `X.Y.Z`. Consulta
[Canali di rilascio Docker](../guides/DOCKER_GUIDE.md#release-channels) e #10317.

## Corsia rapida per hotfix (etichetta `hotfix`)

Una PR con etichetta `hotfix` salta la pesante matrice CI (E2E a 9 shard, incremento progressivo della copertura,
quality-gate, quality-extended) e mantiene i controlli rapidi e ad alto valore informativo: build,
shard unitari, integrazione, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
e il test rapido di avvio del tarball (`check:pack-boot`). Obiettivo: ottenere il verde in ≤15 min anziché ~33 min.

**Criteri di accesso — tutti e quattro obbligatori (modellati sulle corsie di emergenza di Chromium/VS Code/Node):**

1. **Gravità**: la produzione è compromessa — un artefatto pubblicato va in crash all'avvio / una
   correzione di sicurezza / ogni utente della release è interessato. "Importante" non significa "compromesso".
2. **Autorità**: solo il proprietario del repository applica l'etichetta `hotfix`. L'etichetta È
   l'approvazione — non applicarla mai autonomamente a una PR di campagna.
3. **Prove**: il corpo della PR contiene un link alla precedente esecuzione completa con tutti i controlli superati (la suite che
   i job saltati convaliderebbero nuovamente), oltre al test specifico della correzione, prima fallito e poi superato.
4. **Ambito**: esclusivamente cherry-pick — la correzione minima, senza refactoring né modifiche accessorie.

La copertura e la superficie di incremento progressivo saltate vengono convalidate nuovamente dalla successiva esecuzione completa sul
branch di release (release sempre verde) — la corsia salta l'ATTESA, mai la convalida.
Le modifiche relative esclusivamente ai test (tutti i file sotto `tests/`, nessuno sotto `tests/e2e/`) saltano automaticamente la matrice
E2E, senza alcuna etichetta.

## Lista di controllo dettagliata

### Pre-release

- [ ] Tutti PRs destinati a questa versione vengono uniti in `release/vX.Y.0`
- [ ] Tutti gli elementi Linear/issue aperti per questa versione vengono chiusi o spostati al traguardo successivo
- [ ] CI verde sul ramo `release/vX.Y.0`
- [ ] Nessun indicatore `TODO(release)` nel codice: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Immagine di base Docker aggiornata (attualmente `node:24.15.0-trixie-slim`)

### Versione e registro modifiche

- [ ] Esegui `/version-bump-cc <patch|minor|major>` (abilità codice Claude )
  - Dossi `package.json`, `electron/package.json`
  - Rigenera `CHANGELOG.md` dai commit git dall'ultimo tag
  - Aggiorna i badge README.md
- [ ] Esamina manualmente CHANGELOG.md e pulisci i messaggi di commit, se necessario
- [ ] Assicurarsi che l'ultima sezione del semestre in `CHANGELOG.md` sia uguale alla versione `package.json`
- [ ] Mantieni `## [Unreleased]` come prima sezione del registro delle modifiche per i prossimi lavori
- [ ] L'aggiornamento `docs/openapi.yaml` → `info.version` deve essere uguale alla versione `package.json`

### Qualità del codice

- [ ] errori `npm run lint` — 0 (gli avvisi sono preesistenti)
- [ ] `npm run typecheck:core` — pulito
- [ ] `npm run typecheck:noimplicit:core` — pulito (severo)
- [ ] `npm run check:cycles:ratchet` — all'interno del soffitto `metrics.cycles` congelato ( `check:cycles` nudo esce 1 su qualsiasi ciclo, #15281)
- [ ] `npm run check:any-budget:t11` — nel rispetto del budget
- [ ] `npm run check:route-validation:t06` — pulito
- [ ] `npm run check:node-runtime` — runtime floor supportato incontrato (`>=22.22.2 <23`, `>=24.0.0 <27`, per `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; allineato con `package.json` `engines`)

### Test

- [ ] passaggio `npm run test:unit` —
- [ ] passaggio `npm run test:vitest` — (server MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — cancello 60/60/60/60 soddisfatto (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (se cambia tocca DB /handlers)
- [ ] `npm run test:combo:matrix` — pass (matrice della strategia combinata: dimostra in modo deterministico tutte le 22 decisioni di selezione delle strategie di routing pubbliche; esegui quando si tocca il routing combinato, la risoluzione della strategia o la logica di fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (fumo reale a monte con gate; genera un'istantanea DB di sola lettura da VPS `root@192.168.0.15`; colpisce fornitori reali, costa crediti; non viene mai eseguito in CI; salta in modo pulito senza il gate)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 scenari HTTP contro il server `.15` live tramite il semplice nodo ESM; richiede `ssh root@192.168.0.15`; creates/deletes solo combo `__live_test__*` ; colpisce fornitori reali; non viene mai eseguito in CI)
- [ ] passaggio `npm run test:e2e` — (modifiche UI )
- [ ] passaggio `npm run test:protocols:e2e` — (modifiche MCP/A2A )
- [ ] passaggio `npm run test:ecosystem` —

### Ganci (convalidati Husky)

Gli hook Husky risiedono in `.husky/` e vengono eseguiti automaticamente sulle operazioni git.

- **impegno preliminare:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-spinta:** cancelli deterministici veloci — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (attivato il 13-06-2026). Esclude intenzionalmente `test:unit` (lento; coperto dal lavoro CI `test-unit` ).
  - Esegui `npm run test:unit` manualmente prima di premere i rami di rilascio.

Se un hook fallisce: risolvi il problema di fondo, non aggirarlo con `--no-verify`.

### Impegni convenzionali

Tutti i commit legati al rilascio devono seguire il formato `type(scope): subject`.

**Tipi validi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Ambiti validi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Modifiche importanti: aggiungi il piè di pagina `BREAKING CHANGE:` o `!` dopo l'ambito (ad esempio `feat(api)!: drop /v0`).

### Documentazione

- [ ] Pass `npm run check:docs-sync` (esecuzione automatica tramite pre-commit)
- [ ] `npm run check:docs-all` pass (ombrello: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` esce 0 codice — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` il contratto env è intatto
- [ ] `npm run check:doc-links` esce 0 — nessun riferimento di ribasso interno interrotto dopo la ristrutturazione
- [ ] `docs/architecture/ARCHITECTURE.md` recensito per storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` rivisto per env var e deriva operativa
- [ ] Se `.env.example` è cambiato: `docs/reference/ENVIRONMENT.md` aggiornato
- [ ] Se la nuova funzionalità ha uno UI: `docs/guides/USER_GUIDE.md` lo menziona
- [ ] Se la nuova funzionalità ha API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aggiornato
- [ ] Se la nuova funzionalità è un modulo: esiste `docs/<MODULE>.md` dedicato
- [ ] In caso di modifica sostanziale: `docs/guides/TROUBLESHOOTING.md` ha una nota di migrazione

### i18n

- [ ] `npm run i18n:check` esce da 0 — stato di traduzione (`.i18n-state.json`) in sincronia con i documenti di origine (nessuna fonte derivata in modalità rigorosa; l'avviso in modalità di avviso è accettabile per i ritocchi dei documenti dell'ultimo minuto, ma dovrebbe essere 0 prima dell'etichettatura)
- [ ] `npm run i18n:check-ui-coverage` esce da 0 — ogni locale UI pari o superiore al livello di copertura dell'80%.
- [ ] `npm run i18n:sync-ui:dry` segnala 0 chiavi mancanti in tutte le 66 impostazioni locali di destinazione (tutte le impostazioni locali tranne l'origine `en` )
- [ ] Se i documenti di origine in inglese sono cambiati, esegui `npm run i18n:run` (richiede `OMNIROUTE_TRANSLATION_API_KEY` in `.env`) prima di taggare
- [ ] I contributi di traduzione possono essere rinviati alla prossima versione se minori (traccia in CHANGELOG)

### Migrazioni dei database

- [ ] Se `src/lib/db/migrations/` ha nuovi file:
  - [ ] Ogni migrazione è idempotente (`CREATE TABLE IF NOT EXISTS`, ecc.)
  - [ ] Migrazioni racchiuse in transazioni
  - [ ] Numerato correttamente (senza spazi vuoti in sequenza)
- [ ] Test su una nuova installazione: elimina `~/.omniroute/omniroute.db` ed esegui `npm run dev`
- [ ] Test sull'installazione esistente: backup DB, esecuzione della migrazione, verifica dello schema
- [ ] I file WAL (`-wal`, `-shm`) vengono gestiti correttamente se la migrazione riscrive le tabelle

### Catalogo fornitori (convalidato Zod)

- [ ] schema `src/shared/constants/providers.ts` Zod valido al momento del caricamento
  - [ ] Tutti i fornitori hanno campi obbligatori (`id`, `label`, `kind`, ecc.)
  - [ ] `freeNote` prevedeva nuovi fornitori gratuiti
  - [ ] I fornitori OAuth hanno `oauthConfig` registrato in `src/lib/oauth/constants/oauth.ts`
- [ ] Se viene aggiunto un nuovo provider: esecutore corrispondente in `open-sse/executors/`
- [ ] Se formato non OpenAI: traduttore in `open-sse/translator/`
- [ ] Modelli registrati in `open-sse/config/providerRegistry.ts`
- [ ] I test unitari in `tests/unit/` coprono la classificazione e il routing dei provider

### Desktop (Electron)

Se `electron/` è cambiato:

- [ ] `npm run electron:smoke:packaged` passa
- [ ] Build testate per almeno uno tra `:win`, `:mac`, `:linux`
- [ ] I certificati di firma del codice non sono scaduti (se firmati)
- [ ] La versione `electron/package.json` corrisponde alla radice `package.json`
- [ ] Puntatore del canale di aggiornamento automatico aggiornato se rilasciato su `stable`

### Costruisci layout

Il repository utilizza tre directory di output distinte — non mescolarle mai:

| Direttorio | Scopo                                                        | Tracciato?       |
| ---------- | ------------------------------------------------------------ | ---------------- |
| `src/`     | Origine dell'applicazione (TypeScript / TSX)                 | SÌ               |
| `.build/`  | Costruisci intermedi — `next build` output (`distDir`)       | No (gitignorato) |
| `dist/`    | Pacchetto npm spedibile — assemblato da `assembleStandalone` | No (gitignorato) |

> **Nota per l'operatore:** la directory delle immagini VPS remota rimane `/usr/lib/node_modules/omniroute/app/`. Solo il** nel repository** l'output della build è stato spostato (`app/` → `dist/`). Le competenze di distribuzione sincronizzano i contenuti `dist/` nella directory `app/` remota — senza che siano necessarie modifiche al percorso VPS.

**Flusso di creazione singola:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Esegui NOT `npm run build` seguito da uno `npm run build:cli` separato per distribuire — usa `npm run build:release` che esegue una ricostruzione pulita + sentinel in un comando.

### Convalida degli artefatti

- [ ] `npm run build:release` riesce e `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` pulire — senza `app.__qa_backup`, `scripts/scratch`, `package-lock.json` o altri residui locali
- [ ] `dist/server.js` esiste dopo la compilazione
- [ ] Smoke locale opzionale in fase di runtime del pacchetto: `npm run dev:candidate -- validate` dopo che `npm run dev:candidate -- build` avvia il tarball compresso su un `DATA_DIR` isolato e controlla `/api/health` + `/v1/models` (vedi [Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Etichettatura e rilascio

- [ ] Esegui `/generate-release-cc` (abilità codice Claude ):
  - Crea il tag `vX.Y.Z`
  - Spinge tag e ramo
  - Apre la versione GitHub con il corpo del log delle modifiche
  - Allega i programmi di installazione Electron (se creati)
- [ ] Oppure manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Distribuire

Le competenze di distribuzione utilizzano il flusso rsync leggero — no `npm pack`, no `npm i -g`:

- [ ] Utilizza l'abilità di distribuzione che corrisponde al target:
  - `/deploy-vps-local-cc` — locale VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — entrambi
- [ ] Prima della distribuzione, conferma `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] La build deve essere eseguita dove `node_modules` è reale (checkout principale o `npm ci`'d worktree — NOT un worktree con collegamento simbolico)
- [ ] Istanza distribuita del test del fumo:
  - Apri `/dashboard/health` → controlla che la stringa della versione corrisponda alla versione
  - Esegui una richiesta `/v1/chat/completions` contro un provider noto
  - Verificare `/api/monitoring/health` restituisca gli interruttori automatici `CLOSED`
  - Conferma la risposta dei trasporti MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Post-rilascio

- [ ] Esegui `/capture-release-evidences-cc` (abilità codice Claude )
  - Cattura WebP screenshots/recordings di nuove funzionalità
  - Si allega alle note sulla versione/al post del blog
- [ ] Aggiornamento GitHub Discussions / Discord con annuncio di rilascio
- [ ] Pietra miliare aperta per la prossima versione
- [ ] Se critico: aggiungi la discussione o pubblica in `news.json` per il banner in-app

### Cancello di lancio pubblico del radar

L'annuncio Radar è intenzionalmente impegnato con `active: false`. L'attivazione è una modifica separata dopo che è stato evidenziato ogni elemento seguente:

- [ ] Tutti i radar PRs in pila vengono uniti e il suggerimento di rilascio CI è verde
- [ ] Distribuisci e fuma le rotte radar OSS con `RADAR_ENABLED` ancora disattivato per impostazione predefinita
- [ ] Fuma `GET /planos`, `/termos`, `/privacidade` e `/reembolso` sull'host Radar denominato
- [ ] Operatore discografico identity/contact/address e revisione legale approvata dal proprietario nel servizio privato
- [ ] Esercita Stripe Checkout e il webhook firmato solo in modalità test
- [ ] Esercita un invio di e-mail transazionali crittografate con la sender/domain approvata
- [ ] Dimostra il ripristino del backup e un'esecuzione di ricerca supervisionata e con un budget limitato
- [ ] Approvare la politica di revisione BRL/PIX prima di accettare prove di donazione
- [ ] Abilita il Checkout pubblico solo dopo i cancelli precedenti, poi attiva il nuovo `news.json` ID
- [ ] Verifica che il banner Home utilizzi la copia localizzata e che un nuovo ID ricompaia dopo che uno ID precedente è stato ignorato

## Smoke test dei servizi incorporati (v3.8.4+)

Prima di distribuire qualsiasi release che includa modifiche ai servizi incorporati, verificare quanto segue:

### Avvio con DB nuovo (rileva collisioni tra migrazioni — aggiunto dopo l'hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — attendere 10 s per l'avvio
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` restituisce `"9router"` (NON 404, NON 500). Conferma che la migrazione `071_services.sql` sia stata applicata e che la riga sia stata inserita.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` restituisce 3 righe.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` restituisce 2 righe (conferma che `070_webhooks_kind_metadata.sql` sia stata applicata).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` viene completato correttamente — impedisce collisioni future.

### 9Router

- [ ] `POST /api/services/9router/install` restituisce 200 con `installedVersion` in meno di 2 min
- [ ] `POST /api/services/9router/start` restituisce 200 e `state: "running"` in meno di 30 s
- [ ] `GET /api/services/9router/status` riporta `health: "healthy"`
- [ ] `POST /v1/chat/completions` con `"model": "9router/auto/..."` restituisce 200 (instradamento end-to-end tramite 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` mostra l'interfaccia nativa di 9Router all'interno del proxy (nessun iframe diretto a `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` restituisce `{ keyRotated: true }` e il servizio si riavvia correttamente
- [ ] `POST /api/services/9router/stop` restituisce 200 e `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` restituisce uno stream SSE con un evento `snapshot` contenente le righe recenti
- [ ] L'installazione in un ambiente senza `npm` nel PATH restituisce 500 con un messaggio di errore comprensibile (senza stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` restituisce 200 in meno di 2 min
- [ ] `POST /api/services/cliproxy/start` restituisce 200 e `state: "running"` in meno di 30 s
- [ ] `GET /api/services/cliproxy/status` riporta `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` restituisce 200 e `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` restituisce uno stream SSE

### Regressione della sicurezza

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` restituisce `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` restituisce `403 LOCAL_ONLY`
- [ ] Le risposte di errore provenienti da `/api/services/*` non contengono `err.stack` né percorsi assoluti dei file

## Controlli per v3.8.0+

Prima di distribuire qualsiasi release v3.8.x, verificare anche i seguenti elementi:

- [ ] `omniroute --tray` si avvia su macOS (systray2 installato in `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` si avvia su Linux (richiede DISPLAY; errore gestito correttamente se non è impostato)
- [ ] `omniroute --tray` si avvia su Windows (PowerShell NotifyIcon, nessun file binario aggiuntivo)
- [ ] `omniroute config tray enable` crea una voce di avvio automatico; la disabilitazione la rimuove
- [ ] `npm install -g omniroute@<this-version>` esegue postinstall senza terminare con un errore irreversibile
- [ ] Il percorso di aggiornamento mantiene le dipendenze opzionali: `omniroute update --apply` e il programma di aggiornamento automatico
      eseguono `npm install -g … --include=optional` affinché le `optionalDependencies` (better-sqlite3,
      keytar, tls-client e lo stack SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) non vengano rimosse durante un aggiornamento. Il livello SLM ultra `modelPath` richiede anche il
      modello tinybert, scaricato automaticamente in `${DATA_DIR}/models/llmlingua` al primo utilizzo. Postinstall
      (`scripts/build/colocateOptionals.mjs`) colloca quindi la chiusura opzionale SLM in
      `dist/node_modules`, affinché il worker risolva una SINGOLA istanza di `@huggingface/transformers` ^4.2.0
      — la traccia autonoma include nel bundle solo transformers, non le dipendenze opzionali importate dinamicamente;
      senza questa procedura, il worker caricherebbe llmlingua-2 rispetto a transformers nella directory radice
      e il livello SLM passerebbe silenziosamente alla modalità fail-open.
- [ ] `omniroute status` funziona senza `.env` (percorso del token CLI, solo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` restituisce 401 (route sempre protetta)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` restituisce 401 (protezione loopback)
- [ ] Il runtime SQLite viene risolto come `bundled` alla prima esecuzione (file binario incluso valido per la piattaforma)
- [ ] Il runtime SQLite passa a `runtime` come fallback quando `node_modules/better-sqlite3` viene eliminato
- [ ] Il filtro MCP intelligente comprime l'output reale di `playwright-mcp browser_snapshot` (riduzione ≥50%)
- [ ] Tutti i 10 file `skills/omniroute*/SKILL.md` sono accessibili pubblicamente tramite URL raw di GitHub
- [ ] La procedura guidata di onboarding mostra il passaggio introduttivo ai livelli "How It Works" durante una nuova configurazione
- [ ] Il widget relativo alla copertura dei livelli nella dashboard principale mostra i conteggi configurati/attivi

---

## Taglio LTS 3.9.0 (provato nella 3.8.58)

Dopo v3.8.59 la versione successiva è 3.9.0 e il relativo tip diventa due branch di lunga durata:
`stable/v3` (la linea LTS v3, npm `latest`) e `develop` (v4, incrementata a 4.0.0, npm
`nightly`). Il modello di branch/canali, il forward-port e le etichette sono descritti in
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); il piano è nella [ROADMAP](../../ROADMAP.md) (Fase 3). Il taglio viene eseguito una sola volta;
la 3.8.58 lo prova end-to-end su un fork e la 3.8.59 si conclude con la
[checklist GO/NO-GO](./LTS_GO_NO_GO.md).

### Esecuzione di prova (sola lettura, sicura in qualsiasi momento)

```bash
npm run release:dry-run-lts-cut                       # il taglio reale: 3.9.0 da HEAD, tag precedente v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # fissa il commit sorgente
```

`scripts/release/dry-run-lts-cut.mjs` non esegue alcuna operazione: legge git e `gh` e stampa
l'intera sequenza — prerequisiti (il riferimento sorgente viene risolto, il repository sorgente dispone della cronologia completa —
un clone shallow non può eseguire il push di `stable/v3`, il lato ricevente rifiuta il pack al primo
parent innestato, quindi eseguire il taglio da un clone completo oppure prima eseguire `git fetch --unshallow origin` — il tag
precedente esiste, `package.json` contiene la versione di destinazione, è aperta una issue `release-freeze`, non è aperta
alcuna issue `Release branch not green`
su un branch di rilascio esistente — un branch inesistente restituisce `?` sconosciuto, mai
verde — la coda `release` di Mergify è configurata (G11: `queue_rules`, `checks_timeout`,
etichetta `queue`), il ruleset `release/*` continua a bloccare l'eliminazione e il force-push e
`stable/v3` e `develop` non esistono ancora), i due passaggi per i branch, quali trigger dei workflow
inattivi e condizioni `if:` diventano veri (e quali restano bloccati da una variabile del repository o
vincolati al repository canonico), i dist-tag previsti (`latest` → 3.9.0, `next` e
`nightly` vuoti) e il rollback. Codice di uscita `0` = `RESULT: READY`, `1` = un prerequisito bloccante
non è stato soddisfatto (`✗`), `2` = errore di utilizzo. `--advisory <id,...>` declassa un controllo a semplice avviso (`!`)
senza nasconderlo.

Eseguire la prova del taglio reale mentre il freeze del rilascio 3.9.0 è ancora attivo — i branch vengono
creati dopo il tag e prima che la Fase 12c rimuova il freeze.

### Prova della 3.8.58 (solo fork)

```bash
# 1. Esecuzione di prova sul tip corrente con i parametri della prova
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Eseguire su un remote FORK (origin, o qualsiasi remote il cui URL corrisponda al repository
#    canonico, viene rifiutato; ogni passaggio richiede conferma nel terminale)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Eseguire i workflow inattivi nel fork (workflow_dispatch quando l'esecuzione di prova
#    segnala un vincolo al repository canonico), quindi eseguire il rollback
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Il commit di incremento di develop viene creato mediante i comandi plumbing di git (senza modificare il working tree) e incrementa
gli stessi cinque file di un commit di apertura del ciclo: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` e `docs/openapi.yaml`. La sezione `[4.0.0]` del
CHANGELOG e i relativi mirror i18n vengono aperti successivamente su `develop`, prima del suo primo
PR. Lo script non modifica mai i dist-tag npm — provarli su un pacchetto temporaneo.

### Artefatto di anteprima del PR (creare una sola build, promuovere gli stessi byte)

`.github/workflows/preview-artifact.yml` crea un unico tarball di produzione dall'head di un PR e
convalida esattamente quella build (sezione (a) di #8084). Solo PR dello stesso repository; non viene pubblicato nulla.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # oppure aggiungere l'etichetta `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # installazione dell'anteprima
```

L'esecuzione esegue `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, crea il
tarball, esegue `npm run check:pack-boot` (segreti fittizi, directory dei dati effimera), ricrea il pacchetto e
fallisce se il digest non è identico; quindi registra `artifact-identity.json` (SHA dell'head, SHA della base,
hash del lockfile, piattaforma, architettura, ABI di node, bundler, policy di build —
`scripts/release/artifact-identity.mjs`) e attesta il tarball in un job separato. Promuovere
un'anteprima significa installare quel tarball: non ricreare mai la build dal sorgente.

### Il taglio (3.9.0, dopo il GO)

1. GO registrato in [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` stampa `RESULT: READY`.
3. Creare manualmente i branch su `origin` usando i comandi stampati dall'esecuzione di prova — lo
   script rifiuta di eseguire il push su `origin`. Per riutilizzare un commit develop già revisionato, eseguire prima
   la prova con `--execute` sul tip della 3.9.0 usando il proprio fork; vengono stampati entrambi gli SHA e
   gli stessi commit possono essere sottoposti a push:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Proteggi `stable/v3` e `develop` (ruleset + coda di merge) prima che venga integrata la prima PR.
5. I workflow inattivi si attivano in base all'esistenza dei branch: `forward-port.yml` (push su
   `stable/v3`), `validate-stable-pr.yml` (PR verso `stable/v3`) e `nightly-v4-build.yml`
   (build di `develop`). Prima della messa in produzione, imposta il segreto del repository `secrets.FORWARD_PORT_TOKEN` (affinché la CI venga eseguita sulle
   PR di forward-port); la pubblicazione notturna rimane disattivata finché il responsabile non imposta la variabile del repository
   `vars.NIGHTLY_PUBLISH` su `true` e npm Trusted Publishing non accetta
   `nightly-v4-build.yml`. La risoluzione del canale è gestita da `scripts/release/dist-tag.mjs`, lo stesso
   resolver usato da `npm-publish.yml`.
6. Verifica i canali: `npm view omniroute dist-tags --json` mostra `latest` = 3.9.0 e nessun
   `next` / `nightly` finché non viene pubblicata la v4.
7. Ripristino, se necessario: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   e `npm dist-tag add omniroute@3.8.59 latest`.

---

## Rollback

Se una release presenta un problema critico:

1. `gh release edit vX.Y.Z --prerelease` (la contrassegna come non più recente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (solo se non è ancora stata adottata dagli utenti)
3. Oppure: hotfix su `release/vX.Y.0` → release di patch `vX.Y.(Z+1)`
4. Comunicare immediatamente su GitHub Discussions e Discord

## Regole inderogabili

- Non eseguire mai commit direttamente su `main`
- Non usare mai `git push --force` su `main` o sui branch `release/*`
- Non ignorare mai gli hook di Husky (`--no-verify`)
- Non eseguire mai commit di segreti, credenziali o file `.env`
- La copertura deve rimanere ≥60/60/60/60 (istruzioni/righe/funzioni/rami)
- Includere o aggiornare sempre i test quando si modifica il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/`

## Controllo automatico della sincronizzazione

Eseguire localmente il controllo della sincronizzazione della documentazione prima di aprire una PR:

```bash
npm run check:docs-sync
```

Anche la CI esegue questo controllo in `.github/workflows/ci.yml` (job di lint).
