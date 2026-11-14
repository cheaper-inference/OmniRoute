# Release Checklist (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Zadnja posodobitev:** 2026-08-28 — v3.8.51
> Poenostavljen postopek izdaje, ki za avtomatizacijo uporablja veščine Claude Code.
>
> **Med izdajami ohranjajte čakalno vrsto/vejo v zelenem stanju:** glejte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (družina `/green-prs` + `npm run check:release-green` + `/babysit` + nočno izvajanje). Redno izvajanje
> tega postopka — še posebej **pred** uporabo tega kontrolnega seznama — zagotovi, da se PR za izdajo začne v zelenem stanju.

## Na kratko

```bash
# 1. Povečajte različico in ustvarite CHANGELOG (veščina)
/version-bump-cc patch    # ali minor/major

# 2. Lokalno izvedite preverjanje kakovosti
npm run check              # lint + preizkusi
npm run test:coverage      # celovito preverjanje pokritosti (60/60/60/60)

# 3. Izdelajte in izvedite osnovni preizkus
npm run build
npm run test:e2e           # izbirno, vendar priporočeno

# 4. Ustvarite izdajo (veščina)
/generate-release-cc

# 5. Namestite (veščina)
/deploy-vps-both-cc        # ali akamai-cc / local-cc

# 6. Zajemite dokazila o izdaji (veščina)
/capture-release-evidences-cc
```

## Zaupanja vredno objavljanje npm (privzeto od v3.8.51) — na zahtevo postopno, neposredno kot rezervna možnost

`npm-publish.yml` privzeto objavlja prek **zaupanja vrednega objavljanja npm (OIDC)**:
opravilo `stage-npm` (ki ga gosti GitHub) zamenja GitHubov žeton id-token za kratkotrajno
poverilnico npm za to izvajanje — brez dolgotrajnega žetona npm med skrivnostmi repozitorija, brez poziva za 2FA, s priloženim dokazilom o izvoru.
To je obvod, ki ga npm zdaj odobrava, saj opušča žetone, ki preskočijo 2FA;
obnovi popolnoma samodejen potek, ki ga je projekt uporabljal do v3.8.48, obenem pa ohrani
zagotovilo WS1.3 (razkrit žeton sam ne more objavljati — ker žetona ni).

**Enkratna nastavitev (lastnik):** npmjs.com → paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: lastnik `diegosouzapw`, repozitorij `OmniRoute`, potek dela `npm-publish.yml`
(okolje: brez). Dokler to ni nastavljeno, samodejni korak ne uspe z napako `ENEEDAUTH`:
znova ga sprožite z `publish_mode=staged` (spodaj) ali `direct`.

### Postopno objavljanje (na zahtevo — `publish_mode=staged`)

Potek dela za objavljanje v npm ne objavlja več neposredno: zažene zapakirani arhiv tar
(`check:pack-boot`) in nato izvede `npm stage publish` — natančno ti bajti so shranjeni v
registru, vendar jih **ni mogoče namestiti**, dokler jih lastnik ne odobri. Človeški varnostni korak 2FA je
premaknjen ZA preverjanje, ne pred njega.

**Postopek za lastnika, ko potek dela uspešno zaključi v zelenem stanju:**

1. `npm stage list omniroute` — poiščite ID postopne objave (izpisan je tudi v povzetku poteka dela).
2. Preverite shranjene bajte (priporočeno): `npm stage download <id>`, nato namestite
   preneseni arhiv tar v začasno predpono in ga zaženite (`npm run check:pack-boot` v okolju CI
   avtomatizira enako preverjanje paket→namestitev→zagon).
3. `npm stage approve <id>` — poziv za 2FA JE objava. `npm stage reject <id>` jo zavrže.
4. Varnostno preverjanje po objavi: preverjevalnik po objavi (WS1.4 načrta za v3.8.49) v čistem
   vsebniku namesti objavljeno različico iz javnega registra in jo zažene.

**Rezervna možnost v sili:** `workflow_dispatch` z `publish_mode=direct` obnovi
podedovano takojšnje izvajanje `npm publish` (uporabite samo, če postopno objavljanje ne deluje pravilno; zabeležite razlog).

**Enkratna utrditev (lastnik, npmjs.com):** za
`omniroute` nastavite zaupanja vrednega izdajatelja v način samo za postopno objavljanje, tako da razkrit dolgotrajni žeton ne more izvesti `npm publish`
neposredno od nikoder — CI lahko samo pripravi postopno objavo; izdajo lahko izvede le lastnikova 2FA.

**Postopek za poškodovan artefakt (nespremenjen):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
je privzeti prvi ukrep (traja nekaj minut in je povraten); `npm unpublish` uporabite samo znotraj 72-urnega okna/brez odvisnih paketov
in nikoli kot prvi ukrep. Docker: nikoli ne prepišite oznake različice — povrnitev pomeni
preusmeritev oznake `latest` na zadnjo brezhibno zgoščeno vrednost.

**Docker Hub `latest` (obvezno ob vsaki objavi stabilne različice SemVer):**
potek dela `docker-publish` mora označiti **tako** `X.Y.Z` **kot**, kadar
`should-promote-latest.sh` potrdi, da gre za najvišjo stabilno različico SemVer, `:latest`
z **isto zgoščeno vrednostjo**. Po opravilu: zgoščena vrednost oznake `latest` v Hubu se ujema z zgoščeno vrednostjo nove
različice SemVer, vrednost `last_updated` pa je posodobljena. Oznake `:latest` ne pustite na starejši
gradnji, medtem ko opombe ob izdaji omenjajo popravke, ki obstajajo samo v gitu. Hitri začetni primeri za Compose
uporabljajo `:latest`; GitOps naj še naprej pripenja `X.Y.Z`. Glejte
[Kanali izdaj Docker](../guides/DOCKER_GUIDE.md#release-channels) in #10317.

## Hitra pot za nujne popravke (oznaka `hotfix`)

PR z oznako `hotfix` preskoči obsežno matriko CI (9-delni E2E, preverjanje pokritosti,
quality-gate, quality-extended) in ohrani hitra preverjanja z visoko signalno vrednostjo: gradnjo,
dele enotskih testov, integracijske teste, vitest, lint/preverjanje tipov, docs-sync, `check:pack-artifact`
in zagonski preizkus tarballa (`check:pack-boot`). Cilj: uspešen rezultat v ≤15 min namesto v ~33 min.

**Pravila za vstop — zahtevani so vsi štirje pogoji (po vzoru nujnih poti Chromium/VS Code/Node):**

1. **Resnost**: produkcija je okvarjena — objavljeni artefakt se ob zagonu sesuje /
   varnostni popravek / prizadet je vsak uporabnik izdaje. »Pomembno« ne pomeni »okvarjeno«.
2. **Pooblastilo**: oznako `hotfix` lahko doda samo lastnik repozitorija. Oznaka JE
   odobritev — na kampanjskem PR-ju je nikoli ne dodajajte sami.
3. **Dokazila**: telo PR-ja vsebuje povezavo do prejšnjega v celoti uspešnega obsežnega izvajanja (zbirke,
   ki bi jo preskočena opravila ponovno preverila) ter testa samega popravka, ki je najprej spodletel in nato uspel.
4. **Obseg**: izključno cherry-pick — minimalni popravek, brez refaktoriranja in brez spremljevalnih sprememb.

Preskočena površina pokritosti/preverjanja pragov se ponovno preveri ob naslednjem polnem izvajanju na
veji izdaje (neprekinjeno uspešno stanje izdaje) — ta pot preskoči ČAKANJE, nikoli pa preverjanja.
Spremembe, ki zadevajo samo teste (vse datoteke pod `tests/`, nobena pod `tests/e2e/`), samodejno
preskočijo matriko E2E brez kakršne koli oznake.

## Podroben kontrolni seznam

### Predizdaja

- [ ] Vsi PRs namenjeni tej izdaji, so združeni z `release/vX.Y.0`
- [ ] Vsi odprti elementi Linear/issue za to različico so zaprti ali potisnjeni na naslednji mejnik
- [ ] CI zelena na veji `release/vX.Y.0`
- [ ] V kodi ni oznak `TODO(release)` : `grep -r "TODO(release)" src/ open-sse/`
- [ ] osnovna slika Docker posodobljena (trenutno `node:24.15.0-trixie-slim`)

### Različica in dnevnik sprememb

- [ ] Zaženi `/version-bump-cc <patch|minor|major>` (spretnost kode Claude )
  - Izbokline `package.json`, `electron/package.json`
  - Znova ustvari `CHANGELOG.md` iz potrditev git od zadnje oznake
  - Posodablja značke README.md
- [ ] Ročno preglejte CHANGELOG.md in po potrebi počistite sporočila o objavi
- [ ] Zagotovite, da je najnovejši razdelek semver v `CHANGELOG.md` enak različici `package.json`
- [ ] Ohranite `## [Unreleased]` kot prvi razdelek dnevnika sprememb za prihajajoče delo
- [ ] Posodobitev `docs/openapi.yaml` → `info.version` mora biti enaka različici `package.json`

### Kakovost kode

- [ ] napake `npm run lint` — 0 (opozorila že obstajajo)
- [ ] `npm run typecheck:core` — čisto
- [ ] `npm run typecheck:noimplicit:core` — čisto (strogo)
- [ ] `npm run check:cycles:ratchet` — znotraj zamrznjenega stropa `metrics.cycles` (goli `check:cycles` izstopi 1 v katerem koli ciklu, #15281)
- [ ] `npm run check:any-budget:t11` — znotraj proračuna
- [ ] `npm run check:route-validation:t06` — čisto
- [ ] `npm run check:node-runtime` — podprto spodnjo mejo izvajalnega časa (`>=22.22.2 <23`, `>=24.0.0 <27`, na `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; poravnano z `package.json` `engines`)

### Testiranje

- [ ] `npm run test:unit` — pass
- [ ] `npm run test:vitest` — pass (strežnik MCP, autoCombo, predpomnilnik)
- [ ] `npm run test:coverage` — vrata 60/60/60/60 zadovoljen (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (če se spremembe dotaknejo DB / handlers)
- [ ] `npm run test:combo:matrix` — prehod (matrika kombinirane strategije: deterministično dokaže odločitve o izbiri vseh 22 javnih strategij usmerjanja; zažene se ob dotiku kombiniranega usmerjanja, resolucije strategije ali nadomestne logike)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (zaprt realni navzgor dim; izvira posnetek DB samo za branje iz VPS `root@192.168.0.15`; zadene prave ponudnike, stane kredite; nikoli ne deluje v CI; čisto preskoči brez vrat)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 scenarijev HTTP proti strežniku `.15` v živo prek navadnega vozlišča ESM; zahteva `ssh root@192.168.0.15`; creates/deletes samo kombinacije `__live_test__*` ; zadene prave ponudnike; nikoli ne deluje v CI)
- [ ] `npm run test:e2e` — pass (UI spremembe)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A spremembe)
- [ ] `npm run test:ecosystem` — pass

### Trnki (preverjeno Husky)

Husky kljuke živijo v `.husky/` in se samodejno izvajajo pri operacijah git.

- **vnaprej zavezati:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **predhodni pritisk:** hitra deterministična vrata — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirana 2026-06-13). Namerno izključuje `test:unit` (počasen; zajet z opravilom CI `test-unit` ).
  - Zaženite `npm run test:unit` ročno, preden potisnete sprostitvene veje.

Če kavelj ne uspe: odpravite osnovno težavo, ne obidite z `--no-verify`.

### Konvencionalne zaveze

Vse objave, vezane na izdajo, morajo slediti formatu `type(scope): subject`.

**Veljavne vrste:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Veljavni obsegi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Prelomne spremembe: dodajte nogo `BREAKING CHANGE:` ali `!` za obseg (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` prehaja (samodejni zagon s predhodno potrditvijo)
- [ ] `npm run check:docs-all` prehaja (dežnik: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` izhodi 0 koda — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env pogodba je nedotaknjena
- [ ] `npm run check:doc-links` izhodi 0 — brez pokvarjenih notranjih referenc znižanja po prestrukturiranju
- [ ] `docs/architecture/ARCHITECTURE.md` pregledan za storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` pregledan za env var in operativni premik
- [ ] Če se je `.env.example` spremenil: `docs/reference/ENVIRONMENT.md` posodobljen
- [ ] Če ima nova funkcija UI: `docs/guides/USER_GUIDE.md` jo omenja
- [ ] Če ima nova funkcija API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Če je nova funkcija modul: namenski `docs/<MODULE>.md` obstaja
- [ ] Če se sprememba prekine: `docs/guides/TROUBLESHOOTING.md` ima opombo o selitvi

### i18n

- [ ] `npm run i18n:check` zapusti stanje prevoda 0 — (`.i18n-state.json`) sinhronizirano z izvornimi dokumenti (v strogem načinu ni spremenjenih virov; opozorilo o načinu opozorila je sprejemljivo za popravke dokumentov v zadnjem trenutku, vendar bi moralo biti 0 pred označevanjem)
- [ ] `npm run i18n:check-ui-coverage` zapusti 0 — vsake področne nastavitve UI na ali nad pragom 80 % pokritosti
- [ ] `npm run i18n:sync-ui:dry` poroča o 0 manjkajočih ključih v vseh 66 ciljnih področnih nastavitvah (vseh področnih nastavitvah razen vira `en` )
- [ ] Če so se izvirni angleški dokumenti spremenili, zaženite `npm run i18n:run` (zahteva `OMNIROUTE_TRANSLATION_API_KEY` v `.env`) pred označevanjem
- [ ] Prevajalske prispevke je mogoče preložiti na naslednjo izdajo, če so manjši (sled v CHANGELOG)

### Migracije baz podatkov

- [ ] Če ima `src/lib/db/migrations/` nove datoteke:
  - [ ] Vsaka selitev je idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Migracije zavite v transakcije
  - [ ] Pravilno oštevilčeno (brez vrzeli v zaporedju)
- [ ] Preizkusite novo namestitev: izbrišite `~/.omniroute/omniroute.db` in zaženite `npm run dev`
- [ ] Preizkusite obstoječo namestitev: varnostno kopirajte DB, zaženite selitev, preverite shemo
- [ ] datoteke WAL (`-wal`, `-shm`) se pravilno obravnavajo, če selitev prepiše tabele

### Katalog ponudnika (potrjeno z Zodom)

- [ ] `src/shared/constants/providers.ts` Zod veljavna ob času nalaganja
  - [ ] Vsi ponudniki imajo obvezna polja (`id`, `label`, `kind` itd.)
  - [ ] `freeNote` za nove brezplačne ponudnike
  - [ ] Ponudniki OAuth imajo `oauthConfig` registriran v `src/lib/oauth/constants/oauth.ts`
- [ ] Če je dodan nov ponudnik: ustrezni izvajalec v `open-sse/executors/`
- [ ] Če format ni OpenAI: prevajalnik v `open-sse/translator/`
- [ ] Modeli, registrirani v `open-sse/config/providerRegistry.ts`
- [ ] Preizkusi enot v `tests/unit/` zajemajo klasifikacijo in usmerjanje ponudnikov

### Namizje (Electron)

Če `electron/` spremeni:

- [ ] `npm run electron:smoke:packaged` prehaja
- [ ] Graditve preizkušene za vsaj enega od `:win`, `:mac`, `:linux`
- [ ] Potrdila za podpisovanje kode niso potekla (če podpisujejo)
- [ ] različica `electron/package.json` se ujema s korenom `package.json`
- [ ] Kazalec kanala za samodejno posodabljanje je posodobljen, če se sprosti v `stable`

### Postavitev zgradbe

Repozitorij uporablja tri različne izhodne imenike — jih nikoli ne mešajte:

| Imenik    | Namen                                                                     | Sledite?        |
| --------- | ------------------------------------------------------------------------- | --------------- |
| `src/`    | Vir aplikacije (TypeScript / TSX)                                         | ja              |
| `.build/` | Zgradite vmesne izdelke — `next build` (`distDir`)                        | Ne (ignorirano) |
| `dist/`   | Paket npm z možnostjo pošiljanja — ki ga je sestavil `assembleStandalone` | Ne (ignorirano) |

> **Opomba operaterja:** oddaljeni imenik slik VPS ostane `/usr/lib/node_modules/omniroute/app/`. Samo** v skladišču** izhod gradnje premaknjen (`app/` → `dist/`). Vsebina `dist/` rsync spretnosti uvajanja v oddaljeno `app/` dir — ni potrebna sprememba poti VPS.

**Potek enojne zgradbe:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Ali NOT zažene `npm run build` ki mu sledi ločen `npm run build:cli` za razmestitev — uporabite `npm run build:release`, ki v enem ukazu izvede čisto vnovično izgradnjo + sentinel.

### Validacija artefakta

- [ ] `npm run build:release` uspe in `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` čisto — brez `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ali drugih lokalnih ostankov
- [ ] `dist/server.js` obstaja po izgradnji
- [ ] Izbirno lokalno pakirano izvajanje: `npm run dev:candidate -- validate` za `npm run dev:candidate -- build` zažene zapakirano arhivsko datoteko na izoliranem `DATA_DIR` in preveri `/api/health` + `/v1/models` (glejte [Prispevek Zlata pot](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Označevanje in sprostitev

- [ ] Zaženi `/generate-release-cc` (spretnost kode Claude ):
  - Ustvari oznako `vX.Y.Z`
  - Potisne oznako in vejo
  - Odpre izdajo GitHub s telesom dnevnika sprememb
  - Priloži namestitvene programe Electron (če so vgrajeni)
- [ ] Ali ročno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Razporedi

Razmestite veščine, uporabite lahek tok rsync — brez `npm pack`, brez `npm i -g`:

- [ ] Uporabite veščino uvajanja, ki ustreza cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oboje
- [ ] Pred uvedbo potrdite `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Zgradba se mora izvajati tam, kjer je `node_modules` resničen (glavno preverjanje ali `npm ci`'d delovno drevo — NOT simbolično povezano delovno drevo)
- [ ] Razporejen primerek preizkusa dima:
  - Odpri `/dashboard/health` → preveri niz različice, ki se ujema z izdajo
  - Izvedite zahtevo `/v1/chat/completions` proti znanemu ponudniku
  - Preverite `/api/monitoring/health` vrne odklopnike `CLOSED`
  - Potrdite odziv transportov MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Po izdaji

- [ ] Zaženi `/capture-release-evidences-cc` (spretnost kode Claude )
  - Zajame WebP screenshots/recordings novih funkcij
  - Prilaga se opombam ob izdaji/objavi v spletnem dnevniku
- [ ] Posodobite razprave GitHub / Discord z obvestilom o izdaji
- [ ] Odprite mejnik za naslednjo različico
- [ ] Če je kritično: pripnite razpravo ali objavo v `news.json` za pasico v aplikaciji

### Radarska javna izstrelitvena vrata

Radarska objava je namerno potrjena z `active: false`. Aktivacija je ločena sprememba po dokazovanju vsakega spodnjega elementa:

- [ ] Vsi zloženi Radar PRs so združeni in konica za sprostitev CI je zelena
- [ ] Razporedi in zadimi radarske poti OSS, pri čemer je `RADAR_ENABLED` privzeto še vedno izklopljen
- [ ] Zadimite `GET /planos`, `/termos`, `/privacidade` in `/reembolso` na imenovanem gostitelju radarja
- [ ] Snemanje operaterja identity/contact/address in lastniški pravni pregled v zasebni storitvi
- [ ] Izvedite Stripe Checkout in podpisani webhook samo v testnem načinu
- [ ] Izvedite eno šifrirano dostavo transakcijske e-pošte z odobrenim sender/domain
- [ ] Dokažite obnovitev varnostne kopije in eno nadzorovano raziskavo z omejenim proračunom
- [ ] Odobrite politiko pregleda BRL/PIX preden sprejmete dokaze o donaciji
- [ ] Omogočite javno blagajno šele po prejšnjih vratih, nato aktivirajte novo `news.json` ID
- [ ] Preverite, ali domača pasica uporablja lokalizirano kopijo in da se nov ID znova prikaže, ko je starejši ID opuščen

## Hitri preizkus vgrajenih storitev (v3.8.4+)

Pred izdajo katere koli različice, ki vključuje spremembe vgrajenih storitev, preverite:

### Zagon s svežo zbirko podatkov (odkrije kolizije migracij — dodano po hitrem popravku v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počakajte 10 s na zagon
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrne `"9router"` (NE 404, NE 500). Potrjuje, da je bila migracija `071_services.sql` izvedena in vrstica dodana.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrne 3 vrstice.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrne 2 vrstici (potrjuje, da je bila migracija `070_webhooks_kind_metadata.sql` izvedena).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` uspe — ščiti pred prihodnjimi kolizijami.

### 9Router

- [ ] `POST /api/services/9router/install` vrne 200 z `installedVersion` v manj kot 2 min
- [ ] `POST /api/services/9router/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/9router/status` poroča `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` vrne 200 (usmerjanje od začetka do konca prek 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` prikaže izvorni uporabniški vmesnik 9Router znotraj posredniškega strežnika (brez neposrednega okvirja iframe z `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrne `{ keyRotated: true }` in storitev se brez težav znova zažene
- [ ] `POST /api/services/9router/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrne tok SSE z dogodkom `snapshot`, ki vsebuje nedavne vrstice
- [ ] Namestitev v okolju brez `npm` v PATH vrne 500 s prijaznim sporočilom o napaki (brez sledi sklada)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrne 200 v manj kot 2 min
- [ ] `POST /api/services/cliproxy/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/cliproxy/status` poroča `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrne tok SSE

### Varnostna regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrne `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrne `403 LOCAL_ONLY`
- [ ] Odzivi z napakami iz `/api/services/*` ne vsebujejo `err.stack` ali absolutnih poti datotek

## Preverjanja za v3.8.0+

Pred izdajo katere koli različice v3.8.x preverite še naslednje:

- [ ] `omniroute --tray` se zažene v sistemu macOS (systray2 je nameščen v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se zažene v sistemu Linux (zahteva DISPLAY; prijazna napaka, če ni nastavljen)
- [ ] `omniroute --tray` se zažene v sistemu Windows (PowerShell NotifyIcon, brez dodatnih binarnih datotek)
- [ ] `omniroute config tray enable` ustvari vnos za samodejni zagon; onemogočanje ga odstrani
- [ ] `npm install -g omniroute@<this-version>` izvede postinstall brez usodnega izhoda
- [ ] Pot posodobitve ohrani izbirne odvisnosti: `omniroute update --apply` in samodejni posodabljalnik
      izvajata `npm install -g … --include=optional`, tako da `optionalDependencies` (better-sqlite3,
      keytar, tls-client in sklad SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) preživijo posodobitev. Raven SLM ultra `modelPath` potrebuje tudi model
      tinybert, ki se ob prvi uporabi samodejno prenese v `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) nato izbirno zaprtje SLM namesti skupaj v
      `dist/node_modules`, tako da izvajalec razreši EN SAM primerek `@huggingface/transformers` ^4.2.0
      — samostojna sled vsebuje samo transformers, ne pa tudi dinamično uvoženih
      izbirnih odvisnosti, zato bi izvajalec brez tega naložil llmlingua-2 s korenskim transformers,
      raven SLM pa bi ob napaki neopazno nadaljevala brez stiskanja.
- [ ] `omniroute status` deluje brez `.env` (pot žetona CLI, samo povratna zanka)
- [ ] `curl http://localhost:20128/api/shutdown` vrne 401 (vedno zaščitena pot)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrne 401 (zaščita povratne zanke)
- [ ] Izvajalno okolje SQLite se ob prvem zagonu razreši v `bundled` (priložena binarna datoteka je veljavna za platformo)
- [ ] Izvajalno okolje SQLite preklopi na `runtime`, ko je `node_modules/better-sqlite3` izbrisan
- [ ] Pametni filter MCP stisne dejanski izhod `playwright-mcp browser_snapshot` (≥50-% zmanjšanje)
- [ ] Vseh 10 datotek `skills/omniroute*/SKILL.md` je javno dostopnih prek neobdelanega URL-ja GitHub
- [ ] Čarovnik za uvajanje pri sveži namestitvi prikaže korak predstavitve ravni »Kako deluje«
- [ ] Gradnik pokritosti ravni na domači nadzorni plošči prikaže število konfiguriranih/aktivnih ravni

---

## Izdaja 3.9.0 LTS (preizkušena v 3.8.58)

Po v3.8.59 je naslednja različica 3.9.0, njen vrh pa postane izhodišče za dve dolgoročni veji:
`stable/v3` (linija v3 LTS, npm `latest`) in `develop` (v4, zvišana na 4.0.0, npm
`nightly`). Model vej/kanalov, prenos sprememb naprej in oznake so opisani v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); načrt je v dokumentu [ROADMAP](../../ROADMAP.md) (3. faza). Izdaja se izvede enkrat;
3.8.58 jo v celoti preizkusi na razcepu, 3.8.59 pa se zaključi s
[seznamom preverjanj GO/NO-GO](./LTS_GO_NO_GO.md).

### Poskusni zagon (samo za branje, vedno varen)

```bash
npm run release:dry-run-lts-cut                       # dejanska izdaja: 3.9.0 iz HEAD, prejšnja oznaka v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pripni izvorno potrditev
```

`scripts/release/dry-run-lts-cut.mjs` ne izvede ničesar: bere podatke iz git in `gh` ter izpiše
celotno zaporedje — predpogoje (izvor je mogoče razrešiti, izvorni repozitorij ima celotno zgodovino —
plitvi klon ne more potisniti veje `stable/v3`, saj prejemna stran zavrne paket pri prvem
cepljenem nadrejenem elementu, zato izdajo izvedite iz polnega klona ali najprej zaženite
`git fetch --unshallow origin` — prejšnja oznaka obstaja, `package.json` vsebuje ciljno različico,
odprta je težava `release-freeze`, na obstoječi izdajni veji ni odprte težave
`Release branch not green` — veja, ki ne obstaja, je prikazana kot neznana `?`, nikoli
kot zelena — čakalna vrsta Mergify `release` je konfigurirana (G11: `queue_rules`, `checks_timeout`,
oznaka `queue`), nabor pravil `release/*` še vedno preprečuje brisanje in vsiljeno potiskanje ter
veji `stable/v3` in `develop` še ne obstajata), koraka za obe veji, kateri sprožilci nedejavnih
delovnih tokov in pogoji `if:` postanejo izpolnjeni (ter kateri ostanejo omejeni s spremenljivko
repozitorija ali pripeti na kanonični repozitorij), pričakovane oznake distribucije (`latest` → 3.9.0,
`next` in `nightly` sta prazni) ter povrnitev. Izhodna koda `0` = `RESULT: READY`, `1` = blokirajoči
predpogoj ni izpolnjen (`✗`), `2` = napaka pri uporabi. `--advisory <id,...>` spremeni preverjanje
v opozorilo (`!`), ne da bi ga skril.

Poskusni zagon dejanske izdaje izvedite, ko je zamrznitev izdaje 3.9.0 še vedno aktivna — veje se
ustvarijo po oznaki in preden faza 12c odpravi zamrznitev.

### Preizkus z različico 3.8.58 (samo na razcepu)

```bash
# 1. Poskusni zagon na trenutnem vrhu s parametri preizkusa
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Izvedba na oddaljenem RAZCEPU (origin oziroma vsak oddaljeni repozitorij, katerega URL
#    je kanonični repozitorij, je zavrnjen; vsak korak zahteva potrditev v terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Preizkus nedejavnih delovnih tokov v razcepu (workflow_dispatch tam, kjer poskusni zagon
#    sporoči pripetje na kanonični repozitorij), nato povrnitev
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Potrditev zvišanja različice na veji develop je ustvarjena z nizkonivojskimi orodji git (delovno drevo
ostane nedotaknjeno) in zviša različico v istih petih datotekah kot potrditev začetka cikla:
`package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` in
`docs/openapi.yaml`. Razdelek `[4.0.0]` v dnevniku CHANGELOG in njegove zrcalne različice i18n
se nato odprejo na veji `develop`, še pred njeno prvo zahtevo PR. Skript nikoli ne spremeni
oznak distribucije npm — preizkusite jih na začasnem paketu.

### Artefakt predogleda PR (zgradite enkrat, promovirajte iste bajte)

`.github/workflows/preview-artifact.yml` iz vrha zahteve PR zgradi en produkcijski arhiv tar in
preveri točno to gradnjo (del (a) težave #8084). Podprte so samo zahteve PR iz istega
repozitorija; nič se ne objavi.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # ali dodajte oznako `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # namestitev predogleda
```

Zagon izvede `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zapakira arhiv tar,
zažene `npm run check:pack-boot` (lažne skrivnosti, kratkotrajen imenik s podatki), ga znova
zapakira in ne uspe, če izvlečka nista enaka, nato pa zabeleži `artifact-identity.json` (SHA vrha,
SHA osnove, zgoščena vrednost zaklepne datoteke, platforma, arhitektura, ABI okolja node,
pakirnik, pravilnik gradnje — `scripts/release/artifact-identity.mjs`) ter v ločenem opravilu
potrdi izvor arhiva tar. Promoviranje predogleda pomeni namestitev tega arhiva tar: nikoli ga
znova ne zgradite iz izvorne kode.

### Izdaja (3.9.0, po odločitvi GO)

1. Odločitev GO je zabeležena v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` izpiše `RESULT: READY`.
3. Veji na `origin` ustvarite ročno z ukazi, ki jih izpiše poskusni zagon — skript zavrne
   potiskanje na `origin`. Če želite ponovno uporabiti pregledano potrditev za vejo develop,
   najprej izvedite preizkus z možnostjo `--execute` na vrhu različice 3.9.0 proti svojemu
   razcepu; izpiše oba SHA, iste potrditve pa lahko nato potisnete:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zaščitite `stable/v3` in `develop` (nabori pravil + čakalna vrsta za združevanje), preden se združi prvi PR.
5. Neaktivni delovni tokovi se vklopijo ob obstoju veje: `forward-port.yml` (potisk v
   `stable/v3`), `validate-stable-pr.yml` (PR-ji za `stable/v3`) in `nightly-v4-build.yml`
   (gradnje veje `develop`). Pred uvedbo nastavite skrivnost repozitorija `secrets.FORWARD_PORT_TOKEN` (da se CI izvaja za
   PR-je za prenos sprememb naprej); nočno objavljanje ostane izklopljeno, dokler lastnik ne nastavi spremenljivke repozitorija
   `vars.NIGHTLY_PUBLISH` na `true` in npm Trusted Publishing ne sprejme
   `nightly-v4-build.yml`. Razreševanje kanala izvaja `scripts/release/dist-tag.mjs`, isti
   razreševalnik, ki ga uporablja `npm-publish.yml`.
6. Preverite kanale: `npm view omniroute dist-tags --json` prikaže `latest` = 3.9.0 in brez
   `next` / `nightly`, dokler ni objavljena različica v4.
7. Povrnitev, če je potrebna: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   in `npm dist-tag add omniroute@3.8.59 latest`.

---

## Povrnitev na prejšnjo različico

Če ima izdaja kritično težavo:

1. `gh release edit vX.Y.Z --prerelease` (označi izdajo kot ne-najnovejšo)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo če je uporabniki še niso prevzeli)
3. Ali: hitri popravek na `release/vX.Y.0` → popravljalna izdaja `vX.Y.(Z+1)`
4. Nemudoma obvestite uporabnike v GitHub Discussions in Discordu

## Stroga pravila

- Nikoli ne potrjujte sprememb neposredno v `main`
- Nikoli ne uporabite `git push --force` za veje `main` ali `release/*`
- Nikoli ne preskočite kavljev Husky (`--no-verify`)
- Nikoli ne potrdite skrivnosti, poverilnic ali datotek `.env`
- Pokritost mora ostati ≥60/60/60/60 (stavki/vrstice/funkcije/veje)
- Pri spreminjanju produkcijske kode v `src/`, `open-sse/`, `electron/` ali `bin/` vedno vključite ali posodobite teste

## Samodejno preverjanje sinhronizacije

Preden odprete PR, lokalno zaženite varovalo za sinhronizacijo dokumentacije:

```bash
npm run check:docs-sync
```

CI to preverjanje izvaja tudi v `.github/workflows/ci.yml` (opravilo za lintanje).
