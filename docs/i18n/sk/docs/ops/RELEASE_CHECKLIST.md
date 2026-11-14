# Release Checklist (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Posledná aktualizácia:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydávania, ktorý využíva zručnosti Claude Code na automatizáciu.
>
> **Udržiavajte frontu/vetvu zelenú medzi vydaniami:** pozrite si [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + nočné spúšťanie). Pravidelné
> spúšťanie — a najmä **pred** týmto kontrolným zoznamom — zabezpečí, že PR vydania začne zelený.

## V skratke

```bash
# 1. Zvýšte verziu + vygenerujte CHANGELOG (zručnosť)
/version-bump-cc patch    # alebo minor/major

# 2. Spustite lokálne kontrolu kvality
npm run check              # lintovanie + testy
npm run test:coverage      # úplná kontrola pokrytia (60/60/60/60)

# 3. Zostavte a vykonajte základný test
npm run build
npm run test:e2e           # voliteľné, ale odporúčané

# 4. Vygenerujte vydanie (zručnosť)
/generate-release-cc

# 5. Nasaďte (zručnosť)
/deploy-vps-both-cc        # alebo akamai-cc / local-cc

# 6. Zachyťte dôkazy o vydaní (zručnosť)
/capture-release-evidences-cc
```

## Dôveryhodné publikovanie npm (predvolené od v3.8.51) — na požiadanie fázované, ako záloha priame

`npm-publish.yml` predvolene publikuje prostredníctvom **dôveryhodného publikovania npm (OIDC)**:
úloha `stage-npm` (hosťovaná na GitHube) vymení id-token GitHubu za krátkodobé prihlasovacie
údaje npm pre dané spustenie — žiadny dlhodobý token npm v tajných údajoch repozitára, žiadna výzva 2FA, pripojený pôvod.
Toto je spôsob obídenia, ktorý npm povoľuje po ukončovaní podpory tokenov preskakujúcich 2FA;
obnovuje plne automatický proces, ktorý projekt používal až do v3.8.48, a zároveň zachováva
záruku WS1.3 (uniknutý token sám osebe nemôže publikovať — žiadny token neexistuje).

**Jednorazové nastavenie (vlastník):** npmjs.com → balík `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitár `OmniRoute`, pracovný postup `npm-publish.yml`
(prostredie: žiadne). Kým toto nastavenie neexistuje, automatický krok zlyhá s `ENEEDAUTH`:
spustite ho znova s `publish_mode=staged` (nižšie) alebo `direct`.

### Fázované publikovanie (na požiadanie — `publish_mode=staged`)

Pracovný postup npm-publish už nepublikuje priamo: spustí zabalený archív tar
(`check:pack-boot`) a potom vykoná `npm stage publish` — presné bajty sú uložené
v registri, ale **nemožno ich nainštalovať**, kým ich vlastník neschváli. Ľudská kontrola 2FA sa
presunula až ZA overenie, nie predň.

**Postup vlastníka po úspešnom dokončení pracovného postupu:**

1. `npm stage list omniroute` — nájdite ID fázy (je uvedené aj v súhrne pracovného postupu).
2. Overte fázované bajty (odporúčané): `npm stage download <id>`, potom nainštalujte
   stiahnutý archív tar do dočasného prefixu a spustite ho (`npm run check:pack-boot` automatizuje
   rovnaké vyhodnotenie zabalenie→inštalácia→spustenie v CI).
3. `npm stage approve <id>` — výzva 2FA JE publikovaním. `npm stage reject <id>` obsah zahodí.
4. Ochrana po publikovaní: overovač po publikovaní (WS1.4 plánu v3.8.49) nainštaluje
   publikovanú verziu z verejného registra v čistom kontajneri a spustí ju.

**Núdzová záloha:** `workflow_dispatch` s `publish_mode=direct` obnoví
staršie okamžité `npm publish` (použite iba vtedy, ak samotné fázovanie nefunguje správne; zaznamenajte dôvod).

**Jednorazové posilnenie zabezpečenia (vlastník, npmjs.com):** nakonfigurujte dôveryhodného vydavateľa pre
`omniroute` v režime iba fázovania, aby uniknutý dlhodobý token nemohol vykonať `npm publish`
priamo odkiaľkoľvek — CI môže iba vytvoriť fázu; publikovať môže iba vlastník prostredníctvom 2FA.

**Postup pri poškodenom artefakte (bez zmeny):** predvolenou prvou reakciou je
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
(trvá niekoľko minút, je vratná); `npm unpublish` použite iba v rámci 72-hodinového obdobia/ak neexistujú závislé balíky
a nikdy nie ako prvý krok. Docker: nikdy neprepisujte značku verzie — návrat späť znamená
presmerovanie `latest` na posledný funkčný digest.

**Docker Hub `latest` (povinné pri každom stabilnom publikovaní SemVer):**
pracovný postup `docker-publish` musí označiť **oba** obrazy, `X.Y.Z`, a keď
`should-promote-latest.sh` potvrdí, že ide o najvyššiu stabilnú verziu SemVer, aj `:latest`,
s **rovnakým digestom**. Po dokončení úlohy: digest `latest` na Hube sa rovná digestu novej
verzie SemVer a hodnota `last_updated` sa zmenila. Nenechávajte `:latest` ukazovať na staršiu
zostavu, zatiaľ čo poznámky k vydaniu hovoria o opravách, ktoré existujú iba v gite. Rýchle
postupy Compose používajú `:latest`; GitOps by mal naďalej pripínať `X.Y.Z`. Pozrite si
[Kanály vydaní Docker](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrýchlený režim pre hotfixy (štítok `hotfix`)

PR označený štítkom `hotfix` preskočí rozsiahlu maticu CI (9-dielne E2E, sprísňovanie pokrytia,
quality-gate, quality-extended) a ponechá rýchle kontroly s vysokou výpovednou hodnotou: zostavenie,
diely jednotkových testov, integráciu, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
a boot-smoke test tarballu (`check:pack-boot`). Cieľ: zelený výsledok do ≤15 min namiesto ~33 min.

**Podmienky vstupu — vyžadujú sa všetky štyri (podľa vzoru núdzových režimov Chromium/VS Code/Node):**

1. **Závažnosť**: produkcia je nefunkčná — publikovaný artefakt zlyhá pri spustení /
   bezpečnostná oprava / problém sa týka každého používateľa vydania. „Dôležité“ neznamená „nefunkčné“.
2. **Oprávnenie**: štítok `hotfix` môže pridať iba vlastník repozitára. Samotný štítok JE
   schválením — na PR v rámci kampane ho nikdy nepridávajte sami.
3. **Dôkazy**: telo PR odkazuje na predchádzajúci úplne zelený rozsiahly beh (sadu, ktorú
   by preskočené úlohy opätovne overili) a tiež na test samotnej opravy, ktorý najprv zlyhá a potom prejde.
4. **Rozsah**: výhradne cherry-pick — iba minimálna oprava, bez refaktoringu a sprievodných zmien.

Preskočené pokrytie a sprísňovanie sa opätovne overia pri nasledujúcom úplnom behu na
release vetve (nepretržite zelené vydanie) — tento režim preskakuje ČAKANIE, nikdy nie overenie.
Zmeny týkajúce sa iba testov (všetky súbory pod `tests/`, žiadne pod `tests/e2e/`) preskočia maticu E2E
automaticky bez akéhokoľvek štítku.

## Podrobný kontrolný zoznam

### Predbežné vydanie

- [ ] Všetky PRs zacielené na toto vydanie sú zlúčené do `release/vX.Y.0`
- [ ] Všetky otvorené položky Linear/issue pre túto verziu sú zatvorené alebo posunuté na ďalší míľnik
- [ ] CI zelená na vetve `release/vX.Y.0`
- [ ] V kóde nie sú žiadne značky `TODO(release)` : `grep -r "TODO(release)" src/ open-sse/`
- [ ] Základný obrázok Docker je aktuálny (momentálne `node:24.15.0-trixie-slim`)

### Verzia a denník zmien

- [ ] Spustiť `/version-bump-cc <patch|minor|major>` (zručnosť kódu Claude )
  - Nárazy `package.json`, `electron/package.json`
  - Regeneruje `CHANGELOG.md` z git commitov od poslednej značky
  - Aktualizuje odznaky README.md
- [ ] Manuálne skontrolujte CHANGELOG.md a v prípade potreby vyčistite správy odovzdania
- [ ] Uistite sa, že najnovšia sekcia semver v `CHANGELOG.md` sa rovná verzii `package.json`
- [ ] Ponechajte si `## [Unreleased]` ako prvú sekciu changelogu pre nadchádzajúcu prácu
- [ ] Aktualizácia `docs/openapi.yaml` → `info.version` sa musí rovnať verzii `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chýb (upozornenia už existujú)
- [ ] `npm run typecheck:core` — čistý
- [ ] `npm run typecheck:noimplicit:core` — čistý (prísny)
- [ ] `npm run check:cycles:ratchet` — v rámci zmrazeného stropu `metrics.cycles` (holé `check:cycles` končí 1 v akomkoľvek cykle, #15281)
- [ ] `npm run check:any-budget:t11` — v rámci rozpočtu
- [ ] `npm run check:route-validation:t06` — čistý
- [ ] `npm run check:node-runtime` — podporované minimum runtime splnené (`>=22.22.2 <23`, `>=24.0.0 <27`, za `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; zarovnané s `package.json` `engines`)

### Testovanie

- [ ] `npm run test:unit` — prejsť
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — brána 60/60/60/60 splnená (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (ak sa zmení, dotknite sa DB / handlerov)
- [ ] `npm run test:combo:matrix` — pass (matica kombinovanej stratégie: deterministicky preukazuje rozhodnutia o výbere všetkých 22 stratégií verejného smerovania; spustí sa, keď sa dotknete kombinovaného smerovania, riešenia stratégie alebo záložnej logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (gated real-upstream smoke; získava snímku DB len na čítanie zo VPS `root@192.168.0.15`; zasiahne skutočných poskytovateľov, stojí kredity; nikdy sa nespustí v CI; preskočí čisto bez brány)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 scenárov HTTP proti živému `.15` serveru cez obyčajný uzol ESM; vyžaduje `ssh root@192.168.0.15`; creates/deletes iba `__live_test__*` kombá; zasiahne skutočných poskytovateľov; nikdy sa nespustí v CI)
- [ ] `npm run test:e2e` — pass (UI zmeny)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A zmeny)
- [ ] `npm run test:ecosystem` — prejsť

### Háčiky (overené Husky)

Husky hooks žijú v `.husky/` a spúšťajú sa automaticky pri operáciách git.

- **vopred sa zaviazať:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **predtlačenie:** rýchle deterministické brány — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivované 2026-06-13). Zámerne vylučuje `test:unit` (pomalé; pokryté úlohou CI `test-unit` ).
  - Pred stlačením uvoľňovacích vetiev spustite `npm run test:unit` manuálne.

Ak hák zlyhá: opravte základný problém, neobíďte ho pomocou `--no-verify`.

### Konvenčné záväzky

Všetky odovzdania viazané na vydanie musia mať formát `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker` `authz` `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`

Prerušenie zmien: pridajte pätu `BREAKING CHANGE:` alebo `!` za rozsah (napr. `feat(api)!: drop /v0`).

### Dokumentácia

- [ ] `npm run check:docs-sync` passy (automatické spustenie predbežným potvrdením)
- [ ] `npm run check:docs-all` passy (dáždnik: docs-sync + docs-counts + env-doc-sync + zastarané verzie + doc-links)
- [ ] `npm run check:env-doc-sync` výstupy 0 — kód ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env zmluva je nedotknutá
- [ ] `npm run check:doc-links` končí 0 — žiadne nefunkčné interné referencie znižovania po reštrukturalizácii
- [ ] `docs/architecture/ARCHITECTURE.md` recenzované na storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` recenzovaný pre env var a operačný drift
- [ ] Ak sa `.env.example` zmenil: `docs/reference/ENVIRONMENT.md` aktualizované
- [ ] Ak má nová funkcia UI: `docs/guides/USER_GUIDE.md` ju spomína
- [ ] Ak má nová funkcia API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aktualizované
- [ ] Ak je novou funkciou modul: existuje vyhradený `docs/<MODULE>.md`
- [ ] Ak dôjde k zmene: `docs/guides/TROUBLESHOOTING.md` má poznámku o migrácii

### i18n

- [ ] `npm run i18n:check` ukončí 0 stav prekladu — (`.i18n-state.json`) v synchronizácii so zdrojovými dokumentmi (žiadne posunuté zdroje v prísnom režime; upozornenie v režime varovania je prijateľné pre úpravy dokumentov na poslednú chvíľu, ale pred označením by malo byť 0)
- [ ] `npm run i18n:check-ui-coverage` opustí 0 — každé miestne UI na úrovni 80 % pokrytia alebo nad ňou
- [ ] `npm run i18n:sync-ui:dry` hlási 0 chýbajúcich kľúčov vo všetkých 66 cieľových lokalitách (každé miestne nastavenie okrem zdroja `en` )
- [ ] Ak sa zdrojové anglické dokumenty zmenili, pred označením spustite `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`).
- [ ] Prekladové príspevky môžu byť odložené do ďalšieho vydania, ak sú menšie (stopa v CHANGELOG)

### Migrácie databáz

- [ ] Ak má `src/lib/db/migrations/` nové súbory:
  - [ ] Každá migrácia je idempotentná (`CREATE TABLE IF NOT EXISTS` atď.)
  - [ ] Migrácie zabalené do transakcií
  - [ ] Správne očíslované (žiadne medzery v poradí)
- [ ] Otestujte novú inštaláciu: odstráňte `~/.omniroute/omniroute.db` a spustite `npm run dev`
- [ ] Otestujte existujúcu inštaláciu: zálohujte DB, spustite migráciu, overte schému
- [ ] WAL súbory (`-wal`, `-shm`) spracované správne, ak migrácia prepíše tabuľky

### Katalóg poskytovateľa (overené Zod)

- [ ] schéma `src/shared/constants/providers.ts` Zod platná v čase načítania
  - [ ] Všetci poskytovatelia majú povinné polia (`id`, `label`, `kind` atď.)
  - [ ] `freeNote` poskytovaná pre nových bezplatných poskytovateľov
  - [ ] poskytovatelia OAuth majú `oauthConfig` zaregistrovaný v `src/lib/oauth/constants/oauth.ts`
- [ ] Ak bol pridaný nový poskytovateľ: zodpovedajúci exekútor v `open-sse/executors/`
- [ ] Ak nie je formát OpenAI: prekladač v `open-sse/translator/`
- [ ] Modely registrované v `open-sse/config/providerRegistry.ts`
- [ ] Jednotkové testy v `tests/unit/` pokrývajú klasifikáciu a smerovanie poskytovateľov

### Desktop (Electron)

Ak sa `electron/` zmenil:

- [ ] `npm run electron:smoke:packaged` prechádza
- [ ] Zostavy testované aspoň na jeden z `:win`, `:mac`, `:linux`
- [ ] Platnosť certifikátov na podpis kódu nevypršala (ak sa podpisujete)
- [ ] Verzia `electron/package.json` sa zhoduje s koreňovým `package.json`
- [ ] Ukazovateľ kanála automatickej aktualizácie sa aktualizuje pri uvoľnení do `stable`

### Rozloženie zostavy

Úložisko používa tri odlišné výstupné adresáre — ich nikdy nemiešajú:

| Adresár   | Účel                                                                | Sledované?       |
| --------- | ------------------------------------------------------------------- | ---------------- |
| `src/`    | Zdroj aplikácie (TypeScript / TSX)                                  | áno              |
| `.build/` | Zostavte medziprodukty — `next build` výstup (`distDir`)            | Nie (ignorované) |
| `dist/`   | Odoslateľný balík npm — zostavený spoločnosťou `assembleStandalone` | Nie (ignorované) |

> **Poznámka operátora:** vzdialený adresár obrázkov VPS zostáva `/usr/lib/node_modules/omniroute/app/`. Iba ten** in-repo** výstup zostavy sa presunul (`app/` → `dist/`). Zručnosti nasadenia rsync obsah `dist/` do vzdialeného adresára `app/` — nie sú potrebné žiadne zmeny cesty VPS.

**Postup jednej zostavy:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Spustite NOT `npm run build` nasledované samostatným `npm run build:cli` na nasadenie — použite `npm run build:release` ktoré vykoná čisté prebudovanie + sentinelu v jednom príkaze.

### Overenie artefaktov

- [ ] `npm run build:release` uspeje a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, alebo iné lokálne zvyšky
- [ ] `dist/server.js` existuje po zostavení
- [ ] Voliteľné miestne zabalené-runtime dym: `npm run dev:candidate -- validate` potom, čo `npm run dev:candidate -- build` spustí zbalený tarball na izolovanom `DATA_DIR` a skontroluje `/api/health` + `/v1/models` (pozri [Príspevok Zlatá cesta](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Označenie a uvoľnenie

- [ ] Spustiť `/generate-release-cc` (zručnosť kódu Claude ):
  - Vytvorí značku `vX.Y.Z`
  - Tlačí značku a vetvu
  - Otvorí GitHub Release s telom changelogu
  - Pripája inštalačné programy Electron (ak sú vytvorené)
- [ ] Alebo ručne:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasadiť

Nasaďte zručnosti pomocou ľahkého toku rsync — no `npm pack`, no `npm i -g`:

- [ ] Použite zručnosť nasadenia, ktorá zodpovedá cieľu:
  - `/deploy-vps-local-cc` — miestne VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — obaja
- [ ] Pred nasadením potvrďte `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Zostavenie musí bežať tam, kde je `node_modules` skutočné (hlavná pokladňa alebo `npm ci`'d worktree — NOT a symbolicky prepojený pracovný strom)
- [ ] Inštancia nasadenia testu dymu:
  - Otvoriť `/dashboard/health` → kontrola verzie reťazca zodpovedá uvoľneniu
  - Spustite požiadavku `/v1/chat/completions` proti známemu poskytovateľovi
  - Overte `/api/monitoring/health` vracia ističe `CLOSED`
  - Potvrdenie odozvy transportov MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydaní

- [ ] Spustiť `/capture-release-evidences-cc` (zručnosť kódu Claude )
  - Zachytáva WebP screenshots/recordings nových funkcií
  - Pripája sa k poznámkam k vydaniu / blogovému príspevku
- [ ] Aktualizujte diskusie GitHub / Discord s oznámením o vydaní
- [ ] Otvoriť míľnik pre ďalšiu verziu
- [ ] Ak je to kritické: pripnite diskusiu alebo príspevok v `news.json` pre banner v aplikácii

### Radarová verejná spúšťacia brána

Radarové oznámenie je úmyselne spáchané s `active: false`. Aktivácia je samostatnou zmenou po preukázaní každej položky nižšie:

- [ ] Všetky naskladané Radar PRs sú zlúčené a uvoľňovacia špička CI je zelená
- [ ] Nasadzujte a fajčite trasy radaru OSS, pričom `RADAR_ENABLED` je predvolene stále vypnuté
- [ ] Smoke `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na pomenovanom radarovom hostiteľovi
- [ ] Operátor záznamu identity/contact/address a vlastníkom schválené právne preskúmanie v súkromnej službe
- [ ] Cvičenie Stripe Checkout a podpísaný webhook iba v testovacom režime
- [ ] Vykonajte jedno zašifrované doručenie transakčného e-mailu so schváleným sender/domain
- [ ] Dokážte obnovenie zálohy a jeden kontrolovaný výskum s obmedzeným rozpočtom
- [ ] Pred prijatím dôkazov o dare schváľte pravidlá kontroly BRL/PIX
- [ ] Povoľte verejnú platbu iba za predchádzajúcimi bránami a potom aktivujte novú `news.json` ID
- [ ] Overte, či banner Domov používa lokalizovanú kópiu a po zrušení staršieho ID sa znova zobrazí nové ID

## Rýchly test vstavaných služieb (v3.8.4+)

Pred vydaním akejkoľvek verzie, ktorá obsahuje zmeny vstavaných služieb, overte:

### Spustenie s novou databázou (odhaľuje kolízie migrácií — pridané po rýchlej oprave v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkajte 10 s na spustenie
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vráti `"9router"` (NIE 404, NIE 500). Potvrdzuje, že migrácia `071_services.sql` bola použitá a riadok bol vytvorený.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vráti 3 riadky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vráti 2 riadky (overuje použitie migrácie `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prejde — chráni pred budúcimi kolíziami.

### 9Router

- [ ] `POST /api/services/9router/install` vráti do 2 minút stav 200 s `installedVersion`
- [ ] `POST /api/services/9router/start` vráti do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlási `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vráti stav 200 (smerovanie od začiatku do konca cez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí natívne používateľské rozhranie 9Router v rámci proxy (žiadny priamy prvok iframe s `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vráti `{ keyRotated: true }` a služba sa korektne reštartuje
- [ ] `POST /api/services/9router/stop` vráti stav 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vráti prúd SSE s udalosťou `snapshot` obsahujúcou najnovšie riadky
- [ ] Inštalácia v prostredí bez `npm` v PATH vráti stav 500 s používateľsky zrozumiteľným chybovým hlásením (bez výpisu zásobníka)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vráti do 2 minút stav 200
- [ ] `POST /api/services/cliproxy/start` vráti do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/cliproxy/status` hlási `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vráti stav 200 a `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vráti prúd SSE

### Regresia zabezpečenia

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vráti `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vráti `403 LOCAL_ONLY`
- [ ] Chybové odpovede z `/api/services/*` neobsahujú `err.stack` ani absolútne cesty k súborom

## Kontroly pre v3.8.0+

Pred vydaním akejkoľvek verzie v3.8.x overte aj tieto položky:

- [ ] `omniroute --tray` sa spustí v systéme macOS (systray2 je nainštalovaný v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` sa spustí v systéme Linux (vyžaduje DISPLAY; ak nie je nastavená, zobrazí sa zrozumiteľná chyba)
- [ ] `omniroute --tray` sa spustí v systéme Windows (PowerShell NotifyIcon, bez ďalších binárnych súborov)
- [ ] `omniroute config tray enable` vytvorí položku automatického spustenia; jej deaktivovanie ju odstráni
- [ ] `npm install -g omniroute@<this-version>` spustí postinstall bez fatálneho ukončenia
- [ ] Proces aktualizácie zachová voliteľné závislosti: `omniroute update --apply` a automatický aktualizátor
      spúšťajú `npm install -g … --include=optional`, aby `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) zostali zachované aj po aktualizácii. Úroveň SLM ultra s `modelPath` tiež vyžaduje
      model tinybert, ktorý sa pri prvom použití automaticky stiahne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) následne umiestni uzáver voliteľných závislostí SLM do
      `dist/node_modules`, aby worker používal JEDINÚ inštanciu `@huggingface/transformers` ^4.2.0
      — samostatné sledovanie zahŕňa iba transformers, nie dynamicky importované
      voliteľné závislosti, takže bez toho by worker načítal llmlingua-2 voči transformers z koreňového adresára
      a úroveň SLM by v prípade chyby bez upozornenia prešla na záložné správanie.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, iba loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vráti stav 401 (trvalo chránená trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vráti stav 401 (ochrana loopback)
- [ ] Runtime SQLite sa pri prvom spustení nastaví na `bundled` (pribalený binárny súbor je platný pre danú platformu)
- [ ] Runtime SQLite prejde na `runtime`, keď je `node_modules/better-sqlite3` odstránený
- [ ] Inteligentný filter MCP skomprimuje skutočný výstup `playwright-mcp browser_snapshot` (zmenšenie o ≥50 %)
- [ ] Všetkých 10 súborov `skills/omniroute*/SKILL.md` je verejne dostupných prostredníctvom priamej URL adresy GitHubu
- [ ] Sprievodca úvodným nastavením pri novom nastavení zobrazí krok prehliadky úrovní „Ako to funguje“
- [ ] Widget pokrytia úrovní na domovskom paneli zobrazuje počty nakonfigurovaných/aktívnych položiek

---

## Oddelenie 3.9.0 LTS (nacvičené vo verzii 3.8.58)

Po verzii v3.8.59 nasleduje verzia 3.9.0 a jej špička sa stane základom dvoch dlhodobých vetiev:
`stable/v3` (línia v3 LTS, npm `latest`) a `develop` (v4, povýšená na 4.0.0, npm
`nightly`). Model vetiev/kanálov, dopredný prenos zmien a štítky sú opísané v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plán sa nachádza v dokumente [ROADMAP](../../ROADMAP.md) (fáza 3). Oddelenie sa vykoná raz;
verzia 3.8.58 ho kompletne nacvičuje na forku a verzia 3.8.59 sa uzatvára pomocou
[kontrolného zoznamu GO/NO-GO](./LTS_GO_NO_GO.md).

### Skúšobný beh (iba na čítanie, bezpečný kedykoľvek)

```bash
npm run release:dry-run-lts-cut                       # skutočné oddelenie: 3.9.0 z HEAD, predchádzajúci tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pripnutie zdrojového commitu
```

`scripts/release/dry-run-lts-cut.mjs` nič nevykonáva: číta údaje z git a `gh` a vypíše
celú postupnosť — predpoklady (zdroj sa dá rozpoznať, zdrojový repozitár má úplnú históriu —
plytký klon nemôže odoslať `stable/v3`, prijímajúca strana odmietne balík pri prvom
navrúbľovanom rodičovi, preto oddelenie vykonajte z úplného klonu alebo najskôr spustite
`git fetch --unshallow origin` — predchádzajúci tag existuje, `package.json` obsahuje cieľovú verziu,
je otvorený problém `release-freeze`, na existujúcej vydávacej vetve nie je otvorený žiadny
problém `Release branch not green`
— vetva, ktorá neexistuje, hlási `?` ako neznámy stav, nikdy nie zelený — front Mergify
`release` je nakonfigurovaný (G11: `queue_rules`, `checks_timeout`,
štítok `queue`), súprava pravidiel `release/*` stále blokuje odstránenie a vynútené odoslanie
a vetvy `stable/v3` a `develop` ešte neexistujú), dva kroky vytvorenia vetiev, ktoré spúšťače
neaktívnych pracovných postupov a podmienky `if:` sa stanú pravdivými (a ktoré zostanú
blokované premennou repozitára alebo pripnuté ku kanonickému repozitáru), očakávané
dist-tagy (`latest` → 3.9.0, `next` a `nightly` prázdne) a vrátenie zmien. Návratový kód
`0` = `RESULT: READY`, `1` = zlyhal blokujúci predpoklad (`✗`), `2` = chyba použitia.
`--advisory <id,...>` zmení kontrolu na upozornenie (`!`) bez toho, aby ju skryl.

Skúšobný beh skutočného oddelenia spustite, kým je zmrazenie vydania 3.9.0 stále aktívne —
vetvy sa vytvárajú po tagu a pred tým, ako fáza 12c zruší zmrazenie.

### Nácvik verzie 3.8.58 (iba fork)

```bash
# 1. Skúšobný beh na aktuálnej špičke s parametrami nácviku
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Vykonanie voči vzdialenému FORKU (`origin` alebo akýkoľvek vzdialený repozitár, ktorého URL
#    patrí kanonickému repozitáru, bude odmietnutý; každý krok si v termináli vyžiada potvrdenie)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Vyskúšanie neaktívnych pracovných postupov vo forku (`workflow_dispatch` tam, kde skúšobný
#    beh hlási pripnutie ku kanonickému repozitáru), potom vrátenie zmien
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit povýšenia vetvy develop sa vytvára pomocou nízkoúrovňových mechanizmov git (pracovný
strom sa nemení) a aktualizuje rovnakých päť súborov ako commit otvorenia cyklu:
`package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` a
`docs/openapi.yaml`. Sekcia `[4.0.0]` v CHANGELOG-u a jej i18n zrkadlá sa následne otvoria
vo vetve `develop` ešte pred jej prvým PR. Skript nikdy nemení npm dist-tagy — nacvičte ich
na pomocnom balíku.

### Artefakt náhľadu PR (zostavte raz, propagujte rovnaké bajty)

`.github/workflows/preview-artifact.yml` zostaví jeden produkčný tarball zo špičky PR a
overí presne túto zostavu (časť (a) úlohy #8084). Iba PR z rovnakého repozitára; nič sa
nepublikuje.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # alebo pridajte štítok `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # inštalácia náhľadu
```

Beh vykoná `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zabalí tarball,
spustí `npm run check:pack-boot` (falošné tajné údaje, dočasný dátový adresár), znova ho
zabalí a zlyhá, ak kontrolný súčet nie je identický. Potom zaznamená
`artifact-identity.json` (SHA špičky, SHA základu, hash súboru zámku, platforma,
architektúra, ABI node, nástroj na vytváranie balíkov, politika zostavenia —
`scripts/release/artifact-identity.mjs`) a v samostatnej úlohe vytvorí atestáciu tarballu.
Propagovanie náhľadu znamená inštaláciu daného tarballu: nikdy ho znova nezostavujte zo
zdrojového kódu.

### Oddelenie (3.9.0, po GO)

1. GO je zaznamenané v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` vypíše `RESULT: READY`.
3. Vetvy na `origin` vytvorte manuálne pomocou príkazov vypísaných skúšobným behom —
   skript odmietne odosielať zmeny na `origin`. Ak chcete znova použiť skontrolovaný commit
   vetvy develop, najskôr na špičke verzie 3.9.0 spustite nácvik s `--execute` voči svojmu
   forku; vypíše obe SHA a rovnaké commity potom možno odoslať:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Pred zlúčením prvého PR chráňte vetvy `stable/v3` a `develop` (súbory pravidiel + front zlúčení).
5. Neaktívne pracovné postupy sa zapnú po vytvorení príslušnej vetvy: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR do `stable/v3`) a `nightly-v4-build.yml`
   (zostavenia vetvy `develop`). Pred spustením nastavte tajný údaj repozitára `secrets.FORWARD_PORT_TOKEN` (aby sa CI spúšťalo pri
   PR na prenos zmien dopredu); nočné publikovanie zostane vypnuté, kým vlastník nenastaví premennú
   repozitára `vars.NIGHTLY_PUBLISH` na `true` a npm Trusted Publishing nepovolí
   `nightly-v4-build.yml`. Kanál určuje `scripts/release/dist-tag.mjs`, teda rovnaký
   mechanizmus, aký používa `npm-publish.yml`.
6. Overte kanály: `npm view omniroute dist-tags --json` zobrazí `latest` = 3.9.0 a žiadne
   `next` / `nightly`, kým nebude publikovaná verzia v4.
7. V prípade potreby vykonajte návrat späť: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   a `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vrátenie zmien

Ak má vydanie kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí ho ako nie najnovšie)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (iba ak ho používatelia ešte nezačali používať)
3. Alebo: rýchla oprava vo vetve `release/vX.Y.0` → opravné vydanie `vX.Y.(Z+1)`
4. Okamžite o tom informujte v GitHub Discussions a na Discorde

## Prísne pravidlá

- Nikdy nepotvrdzujte zmeny priamo do vetvy `main`
- Nikdy nepoužívajte `git push --force` pre vetvu `main` ani vetvy `release/*`
- Nikdy nevynechávajte kontroly Husky (`--no-verify`)
- Nikdy nepotvrdzujte tajné údaje, prihlasovacie údaje ani súbory `.env`
- Pokrytie musí zostať ≥60/60/60/60 (príkazy/riadky/funkcie/vetvy)
- Pri zmene produkčného kódu v `src/`, `open-sse/`, `electron/` alebo `bin/` vždy pridajte alebo aktualizujte testy

## Automatizovaná kontrola synchronizácie

Pred otvorením PR lokálne spustite kontrolu synchronizácie dokumentácie:

```bash
npm run check:docs-sync
```

CI túto kontrolu spúšťa aj v `.github/workflows/ci.yml` (úloha lint).
