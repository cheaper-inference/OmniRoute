# Release Checklist (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Poslední aktualizace:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydávání, který k automatizaci využívá dovednosti Claude Code.
>
> **Udržujte frontu/větev mezi vydáními v zeleném stavu:** viz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + noční běh). Pravidelné
> spouštění — a zejména **před** tímto kontrolním seznamem — zajistí, že PR vydání začne v zeleném stavu.

## Stručně

```bash
# 1. Zvyšte verzi + vygenerujte CHANGELOG (dovednost)
/version-bump-cc patch    # nebo minor/major

# 2. Spusťte místní kontrolu kvality
npm run check              # lint + testy
npm run test:coverage      # úplná kontrola pokrytí (60/60/60/60)

# 3. Sestavte a proveďte základní test
npm run build
npm run test:e2e           # volitelné, ale doporučené

# 4. Vygenerujte vydání (dovednost)
/generate-release-cc

# 5. Nasaďte (dovednost)
/deploy-vps-both-cc        # nebo akamai-cc / local-cc

# 6. Zachyťte důkazy o vydání (dovednost)
/capture-release-evidences-cc
```

## Důvěryhodné publikování npm (výchozí od v3.8.51) — na vyžádání fázované, jako záložní možnost přímé

`npm-publish.yml` ve výchozím nastavení publikuje prostřednictvím **npm Trusted Publishing (OIDC)**:
úloha `stage-npm` (hostovaná na GitHubu) vymění id-token GitHubu za krátkodobé
přihlašovací údaje npm pro daný běh — bez dlouhodobého tokenu npm v tajných údajích repozitáře,
bez výzvy k 2FA a s připojeným dokladem původu.
Jde o mechanismus, který npm nyní schvaluje namísto rušených tokenů obcházejících 2FA;
obnovuje plně automatický proces, který projekt používal až do v3.8.48, a současně zachovává
záruku WS1.3 (uniklý token sám o sobě nemůže publikovat — žádný token neexistuje).

**Jednorázové nastavení (vlastník):** npmjs.com → balíček `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitář `OmniRoute`, pracovní postup `npm-publish.yml`
(prostředí: none). Dokud toto nastavení neexistuje, automatický krok selže s `ENEEDAUTH`:
spusťte jej znovu s `publish_mode=staged` (níže) nebo `direct`.

### Fázované publikování (na vyžádání — `publish_mode=staged`)

Pracovní postup npm-publish již nepublikuje přímo: spustí zabalený tarball
(`check:pack-boot`) a poté provede `npm stage publish` — přesné bajty jsou uloženy
v registru, ale **nelze je nainstalovat**, dokud je vlastník neschválí. Lidská kontrola 2FA
se přesunula až ZA ověření, nikoli před něj.

**Postup vlastníka poté, co pracovní postup přejde do zeleného stavu:**

1. `npm stage list omniroute` — vyhledejte ID fáze (je také uvedeno v souhrnu pracovního postupu).
2. Ověřte fázované bajty (doporučeno): `npm stage download <id>`, poté nainstalujte
   stažený tarball do dočasného prefixu a spusťte jej (`npm run check:pack-boot` automatizuje
   stejný verdikt zabalení→instalace→spuštění v CI).
3. `npm stage approve <id>` — výzva k 2FA JE samotným publikováním. `npm stage reject <id>` obsah zahodí.
4. Pojistka po publikování: ověřovací proces po publikování (WS1.4 plánu v3.8.49) nainstaluje
   publikovanou verzi z veřejného registru v čistém kontejneru a spustí ji.

**Nouzová záložní možnost:** `workflow_dispatch` s `publish_mode=direct` obnoví
původní okamžité `npm publish` (použijte pouze v případě, že samotné fázování nefunguje správně;
zaznamenejte důvod).

**Jednorázové zabezpečení (vlastník, npmjs.com):** nakonfigurujte Trusted Publisher pro
`omniroute` v režimu pouze fázovaného publikování, aby uniklý dlouhodobý token nemohl provést
`npm publish` přímo odkudkoli — CI může pouze připravit fázi; vydání může provést pouze vlastník
pomocí 2FA.

**Postup při poškozeném artefaktu (beze změny):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako výchozí reakce (trvá minuty, je vratná); `npm unpublish` pouze v rámci 72hodinového okna
bez závislých balíčků a nikdy ne jako první krok. Docker: nikdy nepřepisujte značku verze —
návrat zpět znamená přesměrování `latest` na poslední funkční digest.

**Docker Hub `latest` (povinné při každém publikování stabilní verze SemVer):**
pracovní postup `docker-publish` musí označit **jak** `X.Y.Z`, **tak**, pokud
`should-promote-latest.sh` potvrdí, že jde o nejvyšší stabilní SemVer, také `:latest`
se **stejným digestem**. Po dokončení úlohy: digest `latest` na Hubu se rovná digestu nové
verze SemVer a `last_updated` se změnil. Nenechávejte `:latest` odkazovat na starší
sestavení, zatímco poznámky k vydání popisují opravy, které existují pouze v gitu. Rychlé
úvodní konfigurace Compose používají `:latest`; GitOps by měl nadále připínat `X.Y.Z`. Viz
[Kanály vydání Dockeru](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrychlený režim pro opravy (štítek `hotfix`)

PR označený štítkem `hotfix` přeskočí náročnou matici CI (E2E s 9 shardy, kontrolu navyšování pokrytí,
quality-gate, quality-extended) a ponechá rychlé kontroly s vysokou vypovídací hodnotou: sestavení,
shardy jednotkových testů, integrační testy, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
a základní test spuštění z tarballu (`check:pack-boot`). Cíl: zelený výsledek do ≤15 min namísto ~33 min.

**Podmínky použití — všechny čtyři jsou povinné (podle nouzových režimů Chromium/VS Code/Node):**

1. **Závažnost**: produkce je nefunkční — publikovaný artefakt při spuštění selhává /
   bezpečnostní oprava / problém se týká každého uživatele daného vydání. „Důležité“ neznamená „nefunkční“.
2. **Oprávnění**: štítek `hotfix` přidává pouze vlastník repozitáře. Štítek JE
   schválením — nikdy jej nepřidávejte sami u PR v rámci kampaně.
3. **Důkazy**: tělo PR odkazuje na předchozí plně zelený náročný běh (sadu, kterou
   by přeskočené úlohy znovu ověřily) a také na vlastní test opravy, který nejprve selže a poté projde.
4. **Rozsah**: pouze cherry-pick — minimální oprava, žádné refaktorizace ani přidružené změny.

Přeskočené kontroly pokrytí/navyšování jsou znovu ověřeny následujícím úplným během ve
větvi vydání (průběžně zelené vydání) — tento režim přeskočí ČEKÁNÍ, nikdy ne validaci.
Změny pouze v testech (všechny soubory pod `tests/`, žádné pod `tests/e2e/`) přeskočí matici E2E
automaticky, bez jakéhokoli štítku.

## Podrobný kontrolní seznam

### Předběžné vydání

- [ ] Všechny PRs cílené na toto vydání jsou sloučeny do `release/vX.Y.0`
- [ ] Všechny otevřené položky Linear/issue pro tuto verzi jsou uzavřeny nebo posunuty k dalšímu milníku
- [ ] CI zelená na větvi `release/vX.Y.0`
- [ ] V kódu nejsou žádné značky `TODO(release)` : `grep -r "TODO(release)" src/ open-sse/`
- [ ] základní obrázek Docker aktuální (aktuálně `node:24.15.0-trixie-slim`)

### Verze a seznam změn

- [ ] Spustit `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - Nárazy `package.json`, `electron/package.json`
  - Regeneruje `CHANGELOG.md` z git commitů od poslední značky
  - Aktualizace odznaků README.md
- [ ] Ručně zkontrolujte CHANGELOG.md a v případě potřeby vyčistěte zprávy odevzdání
- [ ] Zajistěte, aby se nejnovější sekce semver v `CHANGELOG.md` rovnala verzi `package.json`
- [ ] Ponechte si `## [Unreleased]` jako první sekci changelog pro nadcházející práci
- [ ] Aktualizace `docs/openapi.yaml` → `info.version` se musí rovnat verzi `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chyb (upozornění již existují)
- [ ] `npm run typecheck:core` — čistý
- [ ] `npm run typecheck:noimplicit:core` — čistý (přísný)
- [ ] `npm run check:cycles:ratchet` — v rámci zmrazeného stropu `metrics.cycles` (holé `check:cycles` opustí 1 v jakémkoli cyklu, #15281)
- [ ] `npm run check:any-budget:t11` — v rámci rozpočtu
- [ ] `npm run check:route-validation:t06` — čistý
- [ ] `npm run check:node-runtime` — podporované runtime minimum (`>=22.22.2 <23`, `>=24.0.0 <27`, za `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; zarovnáno s `package.json` `engines`)

### Testování

- [ ] `npm run test:unit` — projít
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — brána 60/60/60/60 splněna (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (pokud se změní, dotkněte se DB / handlerů)
- [ ] `npm run test:combo:matrix` — pass (matice kombinované strategie: deterministicky prokazuje rozhodnutí o výběru všech 22 veřejných směrovacích strategií; spustí se, když se dotknete kombinovaného směrování, řešení strategie nebo záložní logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (gated real-upstream smoke; získává snímek DB pouze pro čtení ze VPS `root@192.168.0.15`; zasahuje skutečné poskytovatele, stojí kredity; nikdy neběží v CI; přeskakuje čistě bez brány)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 scénářů HTTP proti živému serveru `.15` prostřednictvím prostého uzlu ESM; vyžaduje `ssh root@192.168.0.15`; creates/deletes pouze komba `__live_test__*` ; zasáhne skutečné poskytovatele; nikdy neběží v CI)
- [ ] `npm run test:e2e` — pass (UI změny)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A změny)
- [ ] `npm run test:ecosystem` — projít

### Háčky (ověřeno Husky)

Husky hooky žijí v `.husky/` a spouštějí se automaticky při operacích git.

- **předem se zavázat:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **předtlačení:** rychlé deterministické brány — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivováno 2026-06-13). Záměrně vylučuje `test:unit` (pomalé; pokryto úlohou CI `test-unit` ).
  - Před zatlačením uvolňovacích větví spusťte `npm run test:unit` ručně.

Pokud hák selže: opravte základní problém, neobejděte pomocí `--no-verify`.

### Konvenční závazky

Všechny odevzdání vázané na vydání musí být ve formátu `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker` `authz` `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`

Přerušení změn: přidejte zápatí `BREAKING CHANGE:` nebo `!` za rozsah (např. `feat(api)!: drop /v0`).

### Dokumentace

- [ ] průkazy `npm run check:docs-sync` (automatické spuštění před potvrzením)
- [ ] `npm run check:docs-all` passy (deštník: docs-sync + docs-counts + env-doc-sync + zastaralé-verze + doc-links)
- [ ] `npm run check:env-doc-sync` ukončí 0 kód — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env smlouva je nedotčena
- [ ] `npm run check:doc-links` končí 0 — po restrukturalizaci žádné nefunkční interní markdown reference
- [ ] `docs/architecture/ARCHITECTURE.md` recenzován na storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` recenzován pro env var a provozní drift
- [ ] Pokud se `.env.example` změnilo: `docs/reference/ENVIRONMENT.md` aktualizováno
- [ ] Pokud má nová funkce UI: `docs/guides/USER_GUIDE.md` ji zmiňuje
- [ ] Pokud má nová funkce API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aktualizováno
- [ ] Pokud je novou funkcí modul: existuje vyhrazená `docs/<MODULE>.md`
- [ ] Pokud dojde ke změně: `docs/guides/TROUBLESHOOTING.md` má poznámku o migraci

### i18n

- [ ] `npm run i18n:check` ukončí 0 stav překladu — (`.i18n-state.json`) v synchronizaci se zdrojovými dokumenty (žádné posunuté zdroje v přísném režimu; upozornění v režimu varování je přijatelné pro úpravy dokumentů na poslední chvíli, ale před označením by mělo být 0)
- [ ] `npm run i18n:check-ui-coverage` opustí 0 — každé UI locale na nebo nad hranicí 80% pokrytí
- [ ] `npm run i18n:sync-ui:dry` hlásí 0 chybějících klíčů ve všech 66 cílových lokalitách (každé národní prostředí kromě zdroje `en` )
- [ ] Pokud se zdrojové anglické dokumenty změnily, spusťte před tagováním `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`).
- [ ] Překladové příspěvky mohou být odloženy do dalšího vydání, pokud jsou menší (track in CHANGELOG)

### Migrace databáze

- [ ] Pokud má `src/lib/db/migrations/` nové soubory:
  - [ ] Každá migrace je idempotentní (`CREATE TABLE IF NOT EXISTS` atd.)
  - [ ] Migrace zabalené do transakcí
  - [ ] Správně očíslováno (žádné mezery v pořadí)
- [ ] Otestujte novou instalaci: odstraňte `~/.omniroute/omniroute.db` a spusťte `npm run dev`
- [ ] Otestujte stávající instalaci: zálohujte DB, spusťte migraci, ověřte schéma
- [ ] WAL soubory (`-wal`, `-shm`) zpracované správně, pokud migrace přepisuje tabulky

### Katalog poskytovatelů (ověřeno Zod)

- [ ] `src/shared/constants/providers.ts` Zod schéma platné při načítání
  - [ ] Všichni poskytovatelé mají povinná pole (`id`, `label`, `kind` atd.)
  - [ ] `freeNote` poskytované pro nové bezplatné poskytovatele
  - [ ] poskytovatelé OAuth mají `oauthConfig` registrovanou v `src/lib/oauth/constants/oauth.ts`
- [ ] Pokud byl přidán nový poskytovatel: odpovídající exekutor v `open-sse/executors/`
- [ ] Pokud není formát OpenAI: překladač v `open-sse/translator/`
- [ ] Modely registrované v `open-sse/config/providerRegistry.ts`
- [ ] Unit testy v `tests/unit/` pokrývají klasifikaci a směrování poskytovatelů

### Desktop (Electron)

Pokud se `electron/` změnil:

- [ ] `npm run electron:smoke:packaged` projde
- [ ] Sestavení testována alespoň na jednu z `:win`, `:mac`, `:linux`
- [ ] Platnost certifikátů podepisování kódu nevypršela (pokud podepisujete)
- [ ] Verze `electron/package.json` odpovídá root `package.json`
- [ ] Ukazatel kanálu automatické aktualizace se aktualizuje při uvolnění do `stable`

### Rozvržení sestavení

Úložiště používá tři různé výstupní adresáře — nikdy je nesměšují:

| Adresář   | Účel                                                      | Sledováno?      |
| --------- | --------------------------------------------------------- | --------------- |
| `src/`    | Zdroj aplikace (TypeScript / TSX)                         | Ano             |
| `.build/` | Sestavení meziproduktů — `next build` výstup (`distDir`)  | Ne (ignorováno) |
| `dist/`   | Odesílatelný balíček npm — sestavený `assembleStandalone` | Ne (ignorováno) |

> **Poznámka provozovatele:** vzdálený adresář obrazu VPS zůstává `/usr/lib/node_modules/omniroute/app/`. Pouze** in-repo** výstup sestavení se přesunul (`app/` → `dist/`). Dovednosti nasazení rsync `dist/` obsah do vzdáleného `app/` dir — žádné změny VPS cesty.

**Postup jedné sestavení:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Proveďte NOT spuštění `npm run build` následované samostatným `npm run build:cli` pro nasazení — použijte `npm run build:release`, které provede čisté přebudování + sentinelu jedním příkazem.

### Ověření artefaktu

- [ ] `npm run build:release` uspěje a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` nebo jiné místní zbytky
- [ ] `dist/server.js` existuje po sestavení
- [ ] Volitelný místní zabalený běhový kouř: `npm run dev:candidate -- validate` poté, co `npm run dev:candidate -- build` nabootuje zabalený tarball na izolovaném `DATA_DIR` a zkontroluje `/api/health` + `/v1/models` (viz [Příspěvek Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Označování a uvolnění

- [ ] Spustit `/generate-release-cc` (Claude Code skill):
  - Vytvoří značku `vX.Y.Z`
  - Tlačí značku a větev
  - Otevře GitHub Release s tělem changelogu
  - Připojuje instalační programy Electron (pokud jsou vytvořeny)
- [ ] Nebo ručně:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasadit

Nasaďte dovednosti pomocí lehkého toku rsync — no `npm pack`, no `npm i -g`:

- [ ] Použijte dovednost nasazení, která odpovídá cíli:
  - `/deploy-vps-local-cc` — místní VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Před nasazením potvrďte `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Sestavení musí běžet tam, kde je `node_modules` skutečné (hlavní pokladna nebo pracovní strom `npm ci`'d — NOT symbolický pracovní strom)
- [ ] Instance nasazení testu kouře:
  - Otevřít `/dashboard/health` → kontrola verze řetězce odpovídá vydání
  - Spusťte požadavek `/v1/chat/completions` proti známému poskytovateli
  - Ověřte, `/api/monitoring/health` vrací jističe `CLOSED`
  - Potvrďte odezvu transportů MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydání

- [ ] Spustit `/capture-release-evidences-cc` (Claude Code skill)
  - Zachycuje WebP screenshots/recordings nových funkcí
  - Přikládá poznámky k vydání / blogový příspěvek
- [ ] Aktualizujte GitHub Diskuze / Discord s oznámením o vydání
- [ ] Otevřít milník pro další verzi
- [ ] Pokud je to kritické: připněte diskusi nebo příspěvek v `news.json` pro banner v aplikaci

### Radarová veřejná spouštěcí brána

Radarové oznámení je úmyslně spácháno pomocí `active: false`. Aktivace je samostatnou změnou po prokázání každé položky níže:

- [ ] Všechny naskládané radarové PRs jsou sloučeny a uvolňovací hrot CI je zelený
- [ ] Nasazujte a kouřte OSS radarové trasy se `RADAR_ENABLED` ve výchozím nastavení stále vypnutým
- [ ] Kouřte `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na pojmenovaném hostiteli radaru
- [ ] Provozovatel záznamu identity/contact/address a vlastníkem schválené právní přezkoumání v soukromé službě
- [ ] Cvičení Stripe Checkout a podepsaný webhook pouze v testovacím režimu
- [ ] Proveďte jedno šifrované doručení transakčního e-mailu se schváleným sender/domain
- [ ] Prokažte obnovení zálohy a jeden kontrolovaný výzkum s omezeným rozpočtem
- [ ] Před přijetím důkazů o daru schvalte zásady kontroly BRL/PIX
- [ ] Povolte veřejnou pokladnu pouze za předchozími branami a poté aktivujte novou `news.json` ID
- [ ] Ověřte, že domovský banner používá lokalizovanou kopii a po zrušení staršího ID se znovu objeví nové ID

## Rychlý test vestavěných služeb (v3.8.4+)

Před vydáním jakékoli verze, která obsahuje změny vestavěných služeb, ověřte:

### Spuštění s novou DB (odhalí kolize migrací — přidáno po opravě v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkejte 10 s na spuštění
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrátí `"9router"` (NE 404, NE 500). Potvrzuje, že byla použita migrace `071_services.sql` a vložen počáteční řádek.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrátí 3 řádky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrátí 2 řádky (ověřuje použití `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` projde — chrání před budoucími kolizemi.

### 9Router

- [ ] `POST /api/services/9router/install` vrátí do 2 min stav 200 s `installedVersion`
- [ ] `POST /api/services/9router/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlásí `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vrátí 200 (směrování přes 9Router od začátku do konce)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí nativní uživatelské rozhraní 9Router uvnitř proxy (žádný přímý iframe s `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrátí `{ keyRotated: true }` a služba se bez problémů restartuje
- [ ] `POST /api/services/9router/stop` vrátí 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrátí stream SSE s událostí `snapshot` obsahující nedávné řádky
- [ ] Instalace v prostředí bez `npm` v PATH vrátí 500 s přívětivou chybovou zprávou (bez trasování zásobníku)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrátí do 2 min stav 200
- [ ] `POST /api/services/cliproxy/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/cliproxy/status` hlásí `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrátí 200 a `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrátí stream SSE

### Bezpečnostní regrese

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrátí `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrátí `403 LOCAL_ONLY`
- [ ] Chybové odpovědi z `/api/services/*` neobsahují `err.stack` ani absolutní cesty k souborům

## Kontroly pro v3.8.0+

Před vydáním jakékoli verze v3.8.x ověřte také následující položky:

- [ ] `omniroute --tray` se spustí v systému macOS (systray2 je nainstalován do `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se spustí v systému Linux (vyžaduje DISPLAY; pokud není nastavena, zobrazí srozumitelnou chybu)
- [ ] `omniroute --tray` se spustí v systému Windows (PowerShell NotifyIcon, žádné další binární soubory)
- [ ] `omniroute config tray enable` vytvoří položku automatického spuštění; zakázání ji odstraní
- [ ] `npm install -g omniroute@<this-version>` provede postinstall bez kritického ukončení
- [ ] Proces aktualizace zachová volitelné závislosti: `omniroute update --apply` a automatický aktualizační nástroj
      spouštějí `npm install -g … --include=optional`, aby `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) přežily aktualizaci. Úroveň SLM ultra s `modelPath` také vyžaduje
      model tinybert, který se při prvním použití automaticky stáhne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) poté umístí volitelný uzávěr SLM společně do
      `dist/node_modules`, aby worker načetl JEDINOU instanci `@huggingface/transformers` ^4.2.0
      — samostatné trasování zahrnuje pouze transformers, nikoli dynamicky importované
      volitelné závislosti, takže bez tohoto kroku by worker načetl llmlingua-2 s transformers z kořenového adresáře
      a úroveň SLM by bez upozornění přešla do záložního režimu.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, pouze loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vrátí 401 (vždy chráněná trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrátí 401 (ochrana loopbacku)
- [ ] Běhové prostředí SQLite se při prvním spuštění přeloží na `bundled` (přibalený binární soubor je platný pro danou platformu)
- [ ] Běhové prostředí SQLite přejde na `runtime`, když je odstraněn `node_modules/better-sqlite3`
- [ ] Inteligentní filtr MCP komprimuje skutečný výstup `playwright-mcp browser_snapshot` (zmenšení ≥50 %)
- [ ] Všech 10 souborů `skills/omniroute*/SKILL.md` je veřejně dostupných prostřednictvím přímé adresy URL na GitHubu
- [ ] Průvodce úvodním nastavením při nové instalaci zobrazí krok prohlídky úrovní „Jak to funguje“
- [ ] Widget pokrytí úrovní na domovském řídicím panelu zobrazuje počty nakonfigurovaných/aktivních položek

---

## Vydání 3.9.0 LTS (nacvičeno ve verzi 3.8.58)

Po v3.8.59 následuje verze 3.9.0 a její vrchol se stane základem dvou dlouhodobých větví:
`stable/v3` (řada v3 LTS, npm `latest`) a `develop` (v4, zvýšená na 4.0.0, npm
`nightly`). Model větví/kanálů, forward-port a štítky jsou popsány v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plán je v dokumentu [ROADMAP](../../ROADMAP.md) (fáze 3). Vydání se provede jednou;
ve verzi 3.8.58 se celý postup od začátku do konce nacvičí na forku a verze 3.8.59 bude uzavřena pomocí
[kontrolního seznamu GO/NO-GO](./LTS_GO_NO_GO.md).

### Zkušební běh (pouze pro čtení, bezpečný kdykoli)

```bash
npm run release:dry-run-lts-cut                       # skutečné vydání: 3.9.0 z HEAD, předchozí značka v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # připnutí zdrojového commitu
```

`scripts/release/dry-run-lts-cut.mjs` nic nevykonává: načte git a `gh` a vypíše
celou posloupnost — předpoklady (zdroj lze přeložit, zdrojový repozitář má úplnou historii —
mělký klon nemůže odeslat `stable/v3`, přijímající strana odmítne balíček u prvního
naroubovaného rodiče, proto vydání proveďte z úplného klonu nebo nejprve spusťte `git fetch --unshallow origin` —
předchozí značka existuje, `package.json` obsahuje cílovou verzi, je otevřen problém se štítkem
`release-freeze`, na existující vydávací větvi není otevřen žádný problém
`Release branch not green` — u větve, která neexistuje, se zobrazí neznámý stav `?`, nikdy
zelený — fronta Mergify `release` je nakonfigurována (G11: `queue_rules`, `checks_timeout`,
štítek `queue`), sada pravidel `release/*` stále blokuje odstranění a vynucené odeslání a
`stable/v3` ani `develop` dosud neexistují), dva kroky pro větve, které spouštěče neaktivních
workflow a podmínky `if:` se stanou pravdivými (a které zůstanou blokovány proměnnou repozitáře
nebo připnuty ke kanonickému repozitáři), očekávané dist-tag (`latest` → 3.9.0, `next` a
`nightly` prázdné) a postup vrácení změn. Návratový kód `0` = `RESULT: READY`, `1` = nesplněný
blokující předpoklad (`✗`), `2` = chyba použití. `--advisory <id,...>` sníží závažnost kontroly
na varování (`!`), aniž by ji skryl.

Zkušební běh skutečného vydání spusťte, dokud je zmrazení vydání 3.9.0 stále aktivní — větve
se vytvoří po značce a předtím, než fáze 12c zmrazení zruší.

### Nácvik verze 3.8.58 (pouze na forku)

```bash
# 1. Zkušební běh na aktuálním vrcholu s parametry nácviku
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Provedení vůči vzdálenému FORKU (origin ani žádný vzdálený repozitář, jehož URL odpovídá
#    kanonickému repozitáři, není povolen; každý krok vyžaduje potvrzení v terminálu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Vyzkoušení neaktivních workflow ve forku (workflow_dispatch tam, kde zkušební běh
#    hlásí připnutí ke kanonickému repozitáři), poté vrácení změn
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit zvyšující verzi ve větvi develop se vytvoří pomocí nízkoúrovňových nástrojů gitu
(pracovní strom zůstane nedotčen) a aktualizuje stejných pět souborů jako commit otevírající
cyklus: `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json`
a `docs/openapi.yaml`. Sekce `[4.0.0]` souboru CHANGELOG a její lokalizované kopie se následně
otevřou ve větvi `develop`, ještě před jejím prvním PR. Skript nikdy nemění npm dist-tag —
jejich postup nacvičte na pomocném balíčku.

### Artefakt náhledu PR (sestavte jednou, propagujte stejné bajty)

`.github/workflows/preview-artifact.yml` vytvoří jeden produkční tarball z hlavičky PR a
ověří přesně toto sestavení (část (a) problému #8084). Pouze PR ze stejného repozitáře;
nic se nepublikuje.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # nebo přidejte štítek `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalace náhledu
```

Běh provede `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zabalí
tarball, spustí `npm run check:pack-boot` (falešné tajné údaje, dočasný datový adresář),
znovu jej zabalí a selže, pokud kontrolní součet není totožný; poté zaznamená
`artifact-identity.json` (SHA hlavičky, SHA základu, hash zamykacího souboru, platformu,
architekturu, ABI Node, bundler, zásady sestavení —
`scripts/release/artifact-identity.mjs`) a v samostatné úloze vytvoří atestaci tarballu.
Propagovat náhled znamená nainstalovat tento tarball: nikdy jej znovu nesestavujte ze zdrojového kódu.

### Vydání (3.9.0, po rozhodnutí GO)

1. Rozhodnutí GO je zaznamenáno v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` vypíše `RESULT: READY`.
3. Větve na `origin` vytvořte ručně pomocí příkazů vypsaných zkušebním během — skript
   odmítne odesílat změny do `origin`. Chcete-li znovu použít zkontrolovaný commit pro
   větev develop, nejprve spusťte nácvik s `--execute` na vrcholu 3.9.0 vůči svému forku;
   vypíše obě SHA a stejné commity pak lze odeslat:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Chraňte `stable/v3` a `develop` (sady pravidel + fronta slučování) ještě před začleněním prvního PR.
5. Neaktivní pracovní postupy se zapnou existencí větve: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR směřující do `stable/v3`) a `nightly-v4-build.yml`
   (sestavuje `develop`). Před spuštěním nastavte tajný údaj repozitáře `secrets.FORWARD_PORT_TOKEN` (aby CI běželo u
   PR pro přenos změn vpřed); noční publikování zůstane vypnuté, dokud vlastník nenastaví proměnnou repozitáře
   `vars.NIGHTLY_PUBLISH` na `true` a npm Trusted Publishing nepovolí
   `nightly-v4-build.yml`. Určení kanálu zajišťuje `scripts/release/dist-tag.mjs`, stejný
   resolver, který používá `npm-publish.yml`.
6. Ověřte kanály: `npm view omniroute dist-tags --json` zobrazí `latest` = 3.9.0 a žádné
   `next` / `nightly`, dokud nebude publikována verze v4.
7. V případě potřeby proveďte návrat zpět: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   a `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vrácení změn

Pokud má vydání kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí vydání jako neaktuální)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (pouze pokud jej už uživatelé nezačali používat)
3. Nebo: oprava hotfix ve větvi `release/vX.Y.0` → opravné vydání `vX.Y.(Z+1)`
4. Okamžitě informujte uživatele v GitHub Discussions a na Discordu

## Pevná pravidla

- Nikdy neprovádějte commity přímo do větve `main`
- Nikdy nepoužívejte `git push --force` pro větev `main` ani větve `release/*`
- Nikdy nepřeskakujte hooky Husky (`--no-verify`)
- Nikdy neukládejte do repozitáře tajné údaje, přihlašovací údaje ani soubory `.env`
- Pokrytí musí zůstat ≥60/60/60/60 (příkazy/řádky/funkce/větve)
- Při změně produkčního kódu v `src/`, `open-sse/`, `electron/` nebo `bin/` vždy zahrňte nebo aktualizujte testy

## Automatická kontrola synchronizace

Před otevřením PR spusťte místně kontrolu synchronizace dokumentace:

```bash
npm run check:docs-sync
```

CI tuto kontrolu spouští také v `.github/workflows/ci.yml` (úloha lint).
