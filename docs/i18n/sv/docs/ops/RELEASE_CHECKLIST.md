# Release Checklist (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Senast uppdaterad:** 2026-08-28 — v3.8.51
> Effektiviserat releaseflöde som använder Claude Code-färdigheter för automatisering.
>
> **Håll kön/grenen grön mellan releaser:** se [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-familjen + `npm run check:release-green` + `/babysit` + nattlig körning). Att köra
> detta regelbundet — och särskilt **före** den här checklistan — gör att release-PR:en börjar grönt.

## Kortfattat

```bash
# 1. Höj versionen + generera CHANGELOG (färdighet)
/version-bump-cc patch    # eller minor/major

# 2. Kör kvalitetskontrollen lokalt
npm run check              # lintning + tester
npm run test:coverage      # fullständig täckningskontroll (60/60/60/60)

# 3. Bygg och röktesta
npm run build
npm run test:e2e           # valfritt men rekommenderas

# 4. Generera releasen (färdighet)
/generate-release-cc

# 5. Driftsätt (färdighet)
/deploy-vps-both-cc        # eller akamai-cc / local-cc

# 6. Samla in releasebevis (färdighet)
/capture-release-evidences-cc
```

## npm Trusted Publishing (standard sedan v3.8.51) — mellanlagrad på begäran, direkt som reservlösning

`npm-publish.yml` publicerar som standard via **npm Trusted Publishing (OIDC)**:
jobbet `stage-npm` (GitHub-hostat) byter GitHubs id-token mot en kortlivad npm-
autentiseringsuppgift för den körningen — ingen långlivad npm-token i lagrets hemligheter, ingen 2FA-prompt och härkomstinformation bifogas.
Detta är den förbikoppling som npm godkänner nu när token som hoppar över 2FA fasas ut;
det återställer det helautomatiska flöde som projektet hade fram till v3.8.48 samtidigt som
WS1.3-garantin bibehålls (en läckt token kan inte publicera på egen hand — det finns ingen token).

**Engångskonfiguration (ägare):** npmjs.com → paketet `omniroute` → Settings → _Trusted
Publisher_ → GitHub: ägare `diegosouzapw`, repo `OmniRoute`, arbetsflöde `npm-publish.yml`
(miljö: ingen). Tills detta finns misslyckas det automatiska steget med `ENEEDAUTH`:
starta om manuellt med `publish_mode=staged` (nedan) eller `direct`.

### Mellanlagrad publicering (på begäran — `publish_mode=staged`)

Arbetsflödet npm-publish publicerar inte längre direkt: det starttestar den paketerade tar-filen
(`check:pack-boot`) och kör sedan `npm stage publish` — exakt dessa byte placeras i vänteläge i
registret och är **inte installerbara** förrän ägaren godkänner dem. Den mänskliga 2FA-kontrollen har flyttats
till EFTER verifieringen, inte före den.

**Ägarens flöde efter att arbetsflödet blivit grönt:**

1. `npm stage list omniroute` — hitta mellanlagrings-id:t (visas även i arbetsflödets sammanfattning).
2. Verifiera de mellanlagrade byten (rekommenderas): `npm stage download <id>`, installera sedan den
   nedladdade tar-filen i ett tillfälligt prefix och starttesta den (`npm run check:pack-boot` automatiserar
   samma packa→installera→starta-verifiering i CI).
3. `npm stage approve <id>` — 2FA-prompten ÄR publiceringen. `npm stage reject <id>` kasserar den.
4. Skyddsnät efter publicering: verifieraren efter publicering (WS1.4 i planen för v3.8.49) installerar den
   publicerade versionen från det offentliga registret i en ren container och starttestar den.

**Reservlösning för nödlägen:** `workflow_dispatch` med `publish_mode=direct` återställer den
tidigare omedelbara `npm publish` (använd endast om själva mellanlagringen inte fungerar; dokumentera varför).

**Engångshärdning (ägare, npmjs.com):** konfigurera Trusted Publisher för
`omniroute` i läget endast mellanlagring, så att en läckt långlivad token inte kan köra `npm publish`
direkt någonstans — CI kan endast mellanlagra; endast ägarens 2FA kan släppa releasen.

**Åtgärdsplan för trasiga artefakter (oförändrad):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
som standardåtgärd (tar minuter, kan återställas); `npm unpublish` endast inom 72-timmarsfönstret/om inga beroenden finns
och aldrig som första åtgärd. Docker: skriv aldrig om en versionstagg — återställning innebär att
`latest` pekas om till den senaste fungerande digesten.

**Docker Hub `latest` (krävs vid varje publicering av stabil SemVer):**
arbetsflödet `docker-publish` måste tagga **både** `X.Y.Z` och, när
`should-promote-latest.sh` bekräftar att detta är den högsta stabila SemVer-versionen, `:latest`
med **samma digest**. Efter jobbet: Hub-digesten för `latest` är densamma som den nya
SemVer-digesten och `last_updated` har uppdaterats. Lämna inte `:latest` på ett äldre
bygge medan releaseanteckningarna beskriver korrigeringar som endast finns i git. Compose-
snabbstarter använder `:latest`; GitOps bör fortsätta fästa `X.Y.Z`. Se
[Docker-releasekanaler](../guides/DOCKER_GUIDE.md#release-channels) och #10317.

## Snabbspår för hotfixar (etiketten `hotfix`)

En PR märkt med `hotfix` hoppar över den tunga CI-matrisen (E2E med 9 sharder, täckningströskel,
quality-gate, quality-extended) och behåller de snabba kontrollerna med hög signalnivå: bygge,
enhetstestsharder, integration, vitest, lint/typkontroll, docs-sync, `check:pack-artifact`
och uppstartsröktestet för tarball-paketet (`check:pack-boot`). Mål: grönt inom ≤15 min i stället för ~33 min.

**Inträdespolicy — samtliga fyra krav måste vara uppfyllda (utformad efter Chromium/VS Code/Nodes nödfiler):**

1. **Allvarlighetsgrad**: produktionen är trasig — en publicerad artefakt kraschar vid uppstart /
   en säkerhetskorrigering / alla användare av versionen påverkas. ”Viktigt” är inte ”trasigt”.
2. **Behörighet**: endast lagringsplatsens ägare får tillämpa etiketten `hotfix`. Etiketten ÄR
   godkännandet — tillämpa den aldrig själv på en kampanj-PR.
3. **Bevis**: PR-beskrivningen länkar till den föregående helt gröna tunga körningen (testsviten som
   de överhoppade jobben annars skulle validera på nytt) samt korrigeringens eget test som först misslyckas och sedan lyckas.
4. **Omfattning**: endast cherry-pick — den minsta möjliga korrigeringen, inga refaktoriseringar, inga medföljande ändringar.

Den överhoppade täcknings-/tröskelytan valideras på nytt av nästa fullständiga körning på
release-grenen (kontinuerligt grön release) — spåret hoppar över VÄNTAN, aldrig validering.
Diffar som endast innehåller tester (alla filer under `tests/`, inga under `tests/e2e/`) hoppar automatiskt över E2E-
matrisen utan någon etikett.

## Detaljerad checklista

### Pre-release

- [ ] Alla PRs som är inriktade på den här versionen slås samman till `release/vX.Y.0`
- [ ] Alla öppna Linear/issue objekt för denna version stängs eller flyttas till nästa milstolpe
- [ ] CI grön på `release/vX.Y.0` gren
- [ ] Inga `TODO(release)` markörer i koden: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker basbild uppdaterad (för närvarande `node:24.15.0-trixie-slim`)

### Version & Ändringslogg

- [ ] Kör `/version-bump-cc <patch|minor|major>` (Claude -kodfärdighet)
  - Bump `package.json`, `electron/package.json`
  - Återskapar `CHANGELOG.md` från git-commits sedan senaste taggen
  - Uppdaterar README.md -märken
- [ ] Granska CHANGELOG.md manuellt och rensa upp commit-meddelanden om det behövs
- [ ] Se till att den senaste semver-sektionen i `CHANGELOG.md` är lika med `package.json` -versionen
- [ ] Behåll `## [Unreleased]` som den första ändringsloggsektionen för kommande arbete
- [ ] Uppdatera `docs/openapi.yaml` → `info.version` måste vara lika med `package.json` -versionen

### Kodkvalitet

- [ ] `npm run lint` — 0 fel (varningar finns redan)
- [ ] `npm run typecheck:core` — ren
- [ ] `npm run typecheck:noimplicit:core` — ren (strikt)
- [ ] `npm run check:cycles:ratchet` — inom det frusna `metrics.cycles` taket (bar `check:cycles` går ut 1 på valfri cykel, #15281)
- [ ] `npm run check:any-budget:t11` — inom budget
- [ ] `npm run check:route-validation:t06` — ren
- [ ] `npm run check:node-runtime` — stödd runtime floor met (`>=22.22.2 <23`, `>=24.0.0 <27`, per `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; justerad med `package.json` `engines`)

### Testning

- [ ] `npm run test:unit` — pass
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 60/60/60/60 nöjd (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (om ändringar trycker på DB / hanterare)
- [ ] `npm run test:combo:matrix` — pass (kombostrategimatris: bevisar alla 22 offentliga routingstrategiers valbeslut deterministiskt; körs när du trycker på combo routing, strategiupplösning eller reservlogik)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (gated real upstream-rök; hämtar en skrivskyddad DB ögonblicksbild från VPS `root@192.168.0.15`; träffar riktiga leverantörer, kostar krediter; körs aldrig i CI; hoppar rent utan grinden)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 HTTP scenarier mot live `.15` servern via vanlig Node ESM; kräver `ssh root@192.168.0.15`; creates/deletes endast `__live_test__*` kombinationer; träffar riktiga leverantörer; körs aldrig i CI)
- [ ] `npm run test:e2e` — pass (UI ändringar)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A ändringar)
- [ ] `npm run test:ecosystem` — pass

### Krokar (Husky-validerade)

Husky hooks bor i `.husky/` och körs automatiskt på git-operationer.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** snabba deterministiska grindar — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiverad 2026-06-13). Utesluter avsiktligt `test:unit` (långsam; täcks av CI `test-unit` -jobbet).
  - Kör `npm run test:unit` manuellt innan du trycker på frigöringsgrenar.

Om en krok misslyckas: fixa det underliggande problemet, gå inte förbi med `--no-verify`.

### Konventionella åtaganden

Alla release-bundna commits måste följa `type(scope): subject` format.

**Giltiga typer:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Giltiga omfång:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Bryta ändringar: lägg till `BREAKING CHANGE:` sidfot eller `!` efter omfånget (t.ex. `feat(api)!: drop /v0`).

### Dokumentation

- [ ] `npm run check:docs-sync` -pass (autokörning av pre-commit)
- [ ] `npm run check:docs-all` pass (paraply: docs-sync + docs-counts + env-doc-sync + utfasade-versioner + doc-links)
- [ ] `npm run check:env-doc-sync` exit 0 — kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env kontrakt är intakt
- [ ] `npm run check:doc-links` går ut 0 — inga trasiga interna markdown-referenser efter omstrukturering
- [ ] `docs/architecture/ARCHITECTURE.md` recenserad för storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` granskas för env var och driftdrift
- [ ] Om `.env.example` ändrades: `docs/reference/ENVIRONMENT.md` uppdaterad
- [ ] Om ny funktion har en UI: `docs/guides/USER_GUIDE.md` nämner den
- [ ] Om ny funktion har API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` uppdaterad
- [ ] Om ny funktion är en modul: dedikerad `docs/<MODULE>.md` finns
- [ ] Om bryta ändring: `docs/guides/TROUBLESHOOTING.md` har migration note

### i18n

- [ ] `npm run i18n:check` avslutar 0 — -översättningstillstånd (`.i18n-state.json`) synkroniserat med källdokument (inga avvikande källor i strikt läge; varningslägesrådgivning är acceptabelt för uppdateringar i sista minuten, men bör vara 0 innan taggning)
- [ ] `npm run i18n:check-ui-coverage` lämnar 0 — varje UI lokal vid eller över 80 % täckningsgolv
- [ ] `npm run i18n:sync-ui:dry` rapporterar 0 saknade nycklar över alla 66 mållokaler (varje språk utom `en` källan)
- [ ] Om engelska källdokument har ändrats, kör `npm run i18n:run` (kräver `OMNIROUTE_TRANSLATION_API_KEY` i `.env`) innan taggning
- [ ] Översättningsbidrag kan skjutas upp till nästa utgåva om mindre (spår i CHANGELOG)

### Databasmigreringar

- [ ] Om `src/lib/db/migrations/` har nya filer:
  - [ ] Varje migrering är idempotent (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Migrationer insvept i transaktioner
  - [ ] Rätt numrerad (inga luckor i sekvensen)
- [ ] Testa på nyinstallation: ta bort `~/.omniroute/omniroute.db` och kör `npm run dev`
- [ ] Testa på befintlig installation: säkerhetskopiera DB, kör migrering, verifiera schema
- [ ] WAL filer (`-wal`, `-shm`) hanteras korrekt om migreringen skriver om tabeller

### Leverantörskatalog (Zod-validerad)

- [ ] `src/shared/constants/providers.ts` Zod schema giltigt vid laddningstid
  - [ ] Alla leverantörer har obligatoriska fält (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` tillhandahålls för nya gratisleverantörer
  - [ ] OAuth leverantörer har `oauthConfig` registrerade i `src/lib/oauth/constants/oauth.ts`
- [ ] Om ny leverantör lagts till: motsvarande executor i `open-sse/executors/`
- [ ] Om formatet inte är OpenAI: översättare i `open-sse/translator/`
- [ ] Modeller registrerade i `open-sse/config/providerRegistry.ts`
- [ ] Enhetstester i klassificering och routing av `tests/unit/` -skyddsleverantörer

### Desktop (Electron)

Om `electron/` ändrades:

- [ ] `npm run electron:smoke:packaged` passerar
- [ ] Bygger testade för minst en av `:win`, `:mac`, `:linux`
- [ ] Kodsigneringscertifikat har inte gått ut (om signering)
- [ ] `electron/package.json` versionen matchar root `package.json`
- [ ] Automatisk uppdatering av kanalpekaren uppdateras om den släpps till `stable`

### Bygg layout

Förvaret använder tre distinkta utdatakataloger — blanda aldrig ihop dem:

| Katalog   | Ändamål                                                   | Spåras?          |
| --------- | --------------------------------------------------------- | ---------------- |
| `src/`    | Applikationskälla (TypeScript / TSX)                      | Ja               |
| `.build/` | Bygg mellanprodukter — `next build` output (`distDir`)    | Nej (gitignored) |
| `dist/`   | Leveransbart npm-paket — monterat av `assembleStandalone` | Nej (gitignored) |

> **Operatörens anmärkning:** den fjärranslutna VPS -bildkatalogen förblir `/usr/lib/node_modules/omniroute/app/`. Endast den** i repo** byggutgång flyttad (`app/` → `dist/`). Deploy skills rsync `dist/` innehåll till fjärrkontrollen `app/` dir — inga VPS -vägändringar krävs.

**Enkelbyggt flöde:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Kör NOT `npm run build` följt av en separat `npm run build:cli` för att distribuera — använd `npm run build:release` som gör en ren ombyggnad av + sentinel i ett kommando.

### Artefaktvalidering

- [ ] `npm run build:release` lyckas och `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` eller andra lokala rester
- [ ] `dist/server.js` finns efter build
- [ ] Valfri lokal paketerad runtime smoke: `npm run dev:candidate -- validate` efter att `npm run dev:candidate -- build` startar den packade tarballen på en isolerad `DATA_DIR` och kontrollerar `/api/health` + `/v1/models` (se [Bidrag Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Taggning & Release

- [ ] Kör `/generate-release-cc` (Claude Code skicklighet):
  - Skapar tagg `vX.Y.Z`
  - Trycker tag och gren
  - Öppnar GitHub Release med ändringsloggkropp
  - Bifogar Electron installatörer (om byggda)
- [ ] Eller manuellt:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Distribuera

Distribuera färdigheter använd det lätta rsync-flödet — no `npm pack`, no `npm i -g`:

- [ ] Använd implementeringsförmåga som matchar målet:
  - `/deploy-vps-local-cc` — lokal VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — båda
- [ ] Innan du distribuerar, bekräfta `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build måste köras där `node_modules` är verklig (huvudutcheckning eller `npm ci`'d worktree — NOT ett symlinked worktree)
- [ ] Utplacerad instans av röktest:
  - Öppna `/dashboard/health` → kontrollera version sträng matchar release
  - Kör en `/v1/chat/completions` -förfrågan mot en känd leverantör
  - Verifiera att `/api/monitoring/health` returnerar `CLOSED` -kretsbrytare
  - Bekräfta att MCP transports svarar (`/mcp` HTTP, `/mcp-sse` SSE)

### Efter release

- [ ] Kör `/capture-release-evidences-cc` (Claude -kodfärdighet)
  - Fångar WebP screenshots/recordings av nya funktioner
  - Bifogar till release notes/blogginlägg
- [ ] Uppdatera GitHub Discussions / Discord med releasemeddelande
- [ ] Öppna milstolpe för nästa version
- [ ] Om det är kritiskt: fäst diskussion eller inlägg i `news.json` för banner i appen

### Radar offentlig lanseringsport

Radarmeddelandet är avsiktligt begått med `active: false`. Aktivering är en separat ändring efter att varje objekt nedan har bevisats:

- [ ] Alla staplade Radar PRs slås samman och release-tipset CI är grön
- [ ] Utplacera och rök OSS Radar-rutterna med `RADAR_ENABLED` fortfarande avstängd som standard
- [ ] Rök `GET /planos`, `/termos`, `/privacidade` och `/reembolso` på den namngivna radarvärden
- [ ] Skivoperatör identity/contact/address och ägargodkänd juridisk granskning i privat tjänst
- [ ] Träning Stripe Checkout och den signerade webhook endast i testläge
- [ ] Utöva en krypterad transaktions-e-postleverans med den godkända sender/domain
- [ ] Bevisa säkerhetskopieringsåterställning och en övervakad, budgetbegränsad undersökningskörning
- [ ] Godkänn BRL/PIX granskningspolicy innan du accepterar donationsbevis
- [ ] Aktivera offentlig utcheckning först efter de föregående grindarna, aktivera sedan den nya `news.json` ID
- [ ] Kontrollera att hembannern använder lokaliserad kopia och att en ny ID dyker upp igen efter att en äldre ID har avvisats

## Röktest för inbäddade tjänster (v3.8.4+)

Innan en version som innehåller ändringar i inbäddade tjänster släpps, verifiera följande:

### Start med ny databas (upptäcker migreringskollisioner — tillagt efter snabbkorrigeringen för v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — vänta 10 s på uppstart
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` returnerar `"9router"` (INTE 404, INTE 500). Bekräftar att migreringen `071_services.sql` har tillämpats och att raden har skapats.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` returnerar 3 rader.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` returnerar 2 rader (verifierar att `070_webhooks_kind_metadata.sql` har tillämpats).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` godkänns — skyddar mot framtida kollisioner.

### 9Router

- [ ] `POST /api/services/9router/install` returnerar 200 med `installedVersion` inom 2 min
- [ ] `POST /api/services/9router/start` returnerar 200 och `state: "running"` inom 30 s
- [ ] `GET /api/services/9router/status` rapporterar `health: "healthy"`
- [ ] `POST /v1/chat/completions` med `"model": "9router/auto/..."` returnerar 200 (heltäckande dirigering via 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderar 9Routers inbyggda gränssnitt inuti proxyn (ingen iframe direkt mot `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` returnerar `{ keyRotated: true }` och tjänsten startas om utan problem
- [ ] `POST /api/services/9router/stop` returnerar 200 och `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` returnerar en SSE-ström med en `snapshot`-händelse som innehåller de senaste raderna
- [ ] Installation i en miljö utan `npm` i PATH returnerar 500 med ett användarvänligt felmeddelande (utan stackspårning)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` returnerar 200 inom 2 min
- [ ] `POST /api/services/cliproxy/start` returnerar 200 och `state: "running"` inom 30 s
- [ ] `GET /api/services/cliproxy/status` rapporterar `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` returnerar 200 och `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` returnerar en SSE-ström

### Säkerhetsregression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` returnerar `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` returnerar `403 LOCAL_ONLY`
- [ ] Felsvar från `/api/services/*` innehåller inte `err.stack` eller absoluta filsökvägar

## Kontroller för v3.8.0+

Innan en v3.8.x-version släpps, verifiera även följande:

- [ ] `omniroute --tray` startar på macOS (systray2 installerat i `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` startar på Linux (kräver DISPLAY; tydligt fel om det inte är inställt)
- [ ] `omniroute --tray` startar på Windows (PowerShell NotifyIcon, inga extra binärfiler)
- [ ] `omniroute config tray enable` skapar en autostartpost; inaktivering tar bort den
- [ ] `npm install -g omniroute@<this-version>` kör postinstall utan att avslutas med ett allvarligt fel
- [ ] Uppdateringssökvägen behåller valfria beroenden: `omniroute update --apply` och den automatiska uppdateraren
      kör `npm install -g … --include=optional` så att `optionalDependencies` (better-sqlite3,
      keytar, tls-client och llmlinguas SLM-stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) finns kvar efter en uppdatering. SLM-nivån ultra med `modelPath` behöver även
      tinybert-modellen, som automatiskt hämtas till `${DATA_DIR}/models/llmlingua` vid första användningen. Postinstall
      (`scripts/build/colocateOptionals.mjs`) placerar sedan den valfria SLM-beroendekedjan tillsammans i
      `dist/node_modules` så att workern använder EN ENDA instans av `@huggingface/transformers` ^4.2.0
      — den fristående spårningen paketerar endast transformers, inte de dynamiskt importerade
      valfria beroendena, så utan detta skulle workern läsa in llmlingua-2 mot rotens transformers
      och SLM-nivån skulle omärkligt återgå till standardbeteendet.
- [ ] `omniroute status` fungerar utan `.env` (CLI-tokensökväg, endast loopback)
- [ ] `curl http://localhost:20128/api/shutdown` returnerar 401 (alltid skyddad route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` returnerar 401 (loopback-skydd)
- [ ] SQLite-körmiljön matchar `bundled` vid första körningen (den paketerade binärfilen är giltig för plattformen)
- [ ] SQLite-körmiljön återgår till `runtime` när `node_modules/better-sqlite3` tas bort
- [ ] Det smarta MCP-filtret komprimerar verkliga utdata från `playwright-mcp browser_snapshot` (≥50 % minskning)
- [ ] Alla 10 `skills/omniroute*/SKILL.md`-filer är offentligt tillgängliga via råa GitHub-URL:er
- [ ] Introduktionsguiden visar genomgångssteget "Så fungerar det" för nivåerna vid en ny installation
- [ ] Widgeten för nivåtäckning på startpanelen visar antal konfigurerade/aktiva

---

## 3.9.0 LTS-avknoppning (repeterad i 3.8.58)

Efter v3.8.59 är nästa version 3.9.0, och dess spets blir två långlivade grenar:
`stable/v3` (v3:s LTS-linje, npm `latest`) och `develop` (v4, höjd till 4.0.0, npm
`nightly`). Modellen för grenar/kanaler, framåtportering och etiketter finns i
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); planen finns i [ROADMAP](../../ROADMAP.md) (fas 3). Avknoppningen körs en gång;
3.8.58 repeterar den från början till slut på en fork, och 3.8.59 avslutas med
[GO/NO-GO-checklistan](./LTS_GO_NO_GO.md).

### Provkörning (skrivskyddad, säker när som helst)

```bash
npm run release:dry-run-lts-cut                       # den verkliga avknoppningen: 3.9.0 från HEAD, föregående tagg v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # lås källcommiten
```

`scripts/release/dry-run-lts-cut.mjs` utför ingenting: det läser git och `gh` och skriver ut
hela sekvensen — förhandsvillkor (källan kan lösas upp, källarkivet har fullständig historik —
en grund klon kan inte pusha `stable/v3`, den mottagande sidan avvisar paketet vid den första
inympade föräldern, så gör avknoppningen från en fullständig klon eller kör först
`git fetch --unshallow origin` — föregående tagg finns, `package.json` har målversionen, ett
`release-freeze`-ärende är öppet, inget öppet `Release branch not green`-ärende
finns på en befintlig releasegren — en gren som inte finns rapporteras som `?` okänd, aldrig
grön — Mergify-kön `release` är konfigurerad (G11: `queue_rules`, `checks_timeout`,
etiketten `queue`), regeluppsättningen `release/*` blockerar fortfarande borttagning och
force-push, och `stable/v3` samt `develop` finns inte ännu), de två grenstegen, vilka utlösare
för vilande arbetsflöden och `if:`-villkor som blir sanna (och vilka som förblir spärrade av
en arkivvariabel eller låsta till det kanoniska arkivet), förväntade dist-tags (`latest` →
3.9.0, `next` och `nightly` tomma) samt återställningen. Avslutningskod `0` = `RESULT: READY`,
`1` = ett blockerande förhandsvillkor misslyckades (`✗`), `2` = användningsfel.
`--advisory <id,...>` nedgraderar en kontroll till en varning (`!`) utan att dölja den.

Kör provkörningen för den verkliga avknoppningen medan releasefrysningen för 3.9.0 fortfarande
är aktiv — grenarna skapas efter taggen och innan fas 12c häver frysningen.

### 3.8.58-repetition (endast fork)

```bash
# 1. Provkör på den aktuella spetsen med repetitionsparametrar
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Kör mot en FORK-fjärrserver (origin, eller någon fjärrserver vars URL är det kanoniska
#    arkivet, avvisas; varje steg begär bekräftelse i terminalen)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Testa de vilande arbetsflödena i forken (workflow_dispatch där provkörningen
#    rapporterar en låsning till det kanoniska arkivet) och återställ sedan
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commitsen som höjer versionen på develop skapas med git plumbing (inget arbetsträd berörs)
och höjer versionen i samma fem filer som en commit som öppnar en cykel: `package.json`,
`open-sse/package.json`, `electron/package.json`, `package-lock.json` och
`docs/openapi.yaml`. Avsnittet `[4.0.0]` i CHANGELOG och dess i18n-speglar öppnas därefter
på `develop`, före dess första PR. Skriptet ändrar aldrig npm dist-tags — repetera dessa på
ett testpaket.

### Förhandsgranskningsartefakt för PR (bygg en gång, befordra samma byteföljd)

`.github/workflows/preview-artifact.yml` bygger en produktions-tarball från ett PR-huvud och
validerar exakt detta bygge (#8084 del (a)). Endast PR:er från samma arkiv; ingenting
publiceras.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # eller lägg till etiketten `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # installation av förhandsgranskningen
```

Körningen utför `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, paketerar
tarballen, kör `npm run check:pack-boot` (falska hemligheter, tillfällig datakatalog),
paketerar om och misslyckas om inte kontrollsumman är identisk. Därefter registreras
`artifact-identity.json` (huvud-SHA, bas-SHA, hash för låsfilen, plattform, arkitektur,
node ABI, bundlare, byggpolicy — `scripts/release/artifact-identity.mjs`) och tarballen
attesteras i ett separat jobb. Att befordra en förhandsgranskning innebär att installera
denna tarball: bygg aldrig om från källkod.

### Avknoppningen (3.9.0, efter GO)

1. GO registrerat i [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` skriver ut `RESULT: READY`.
3. Skapa grenarna på `origin` manuellt med kommandona som provkörningen skriver ut —
   skriptet vägrar att pusha till `origin`. För att återanvända en granskad develop-commit,
   kör först `--execute`-repetitionen på 3.9.0-spetsen mot din fork; den skriver ut båda
   SHA-värdena, och samma commits kan pushas:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Skydda `stable/v3` och `develop` (regeluppsättningar + sammanslagningskö) innan den första PR:en slås samman.
5. De vilande arbetsflödena aktiveras när grenarna finns: `forward-port.yml` (push till
   `stable/v3`), `validate-stable-pr.yml` (PR:er till `stable/v3`) och `nightly-v4-build.yml`
   (bygger `develop`). Före produktionssättningen ska databashemligheten `secrets.FORWARD_PORT_TOKEN` konfigureras (så att CI körs för
   vidareportnings-PR:er); nattlig publicering förblir avstängd tills ägaren anger databasvariabeln
   `vars.NIGHTLY_PUBLISH` till `true` och npm Trusted Publishing godkänner
   `nightly-v4-build.yml`. Kanalbestämningen görs av `scripts/release/dist-tag.mjs`, samma
   resolver som `npm-publish.yml` använder.
6. Verifiera kanalerna: `npm view omniroute dist-tags --json` visar `latest` = 3.9.0 och inga
   `next` / `nightly` förrän v4 publiceras.
7. Återställ vid behov: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   och `npm dist-tag add omniroute@3.8.59 latest`.

---

## Återställning

Om releasen har ett kritiskt problem:

1. `gh release edit vX.Y.Z --prerelease` (markerar den som inte den senaste)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (endast om användare ännu inte har börjat använda den)
3. Eller: skapa en snabbkorrigering på `release/vX.Y.0` → patchrelease `vX.Y.(Z+1)`
4. Kommunicera omedelbart i GitHub Discussions och Discord

## Hårda regler

- Gör aldrig commits direkt till `main`
- Använd aldrig `git push --force` till `main`- eller `release/*`-grenar
- Hoppa aldrig över Husky-hooks (`--no-verify`)
- Lägg aldrig in hemligheter, autentiseringsuppgifter eller `.env`-filer i commits
- Täckningsgraden måste förbli ≥60/60/60/60 (satser/rader/funktioner/grenar)
- Inkludera eller uppdatera alltid tester när du ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/`

## Automatisk synkroniseringskontroll

Kör synkroniseringskontrollen för dokumentationen lokalt innan du öppnar en PR:

```bash
npm run check:docs-sync
```

CI kör också den här kontrollen i `.github/workflows/ci.yml` (lint-jobbet).
