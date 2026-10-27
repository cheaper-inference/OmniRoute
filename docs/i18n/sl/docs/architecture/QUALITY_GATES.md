# Quality Gates Reference (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ta dokument je avtoritativna referenca za vsa kakovostna preverjanja CI v projektu OmniRoute.
Opisuje vsako preverjanje, kaj preverja, v katerem opravilu CI se izvaja, ali uporablja
referenčno osnovo z ragljo ali pravilnik uspeh/neuspeh ter ali blokira gradnjo ali je zgolj svetovalno.

Za kratek povzetek in pravilnik seznama dovoljenih elementov glejte razdelek »Kakovostna preverjanja in raglje«
v datoteki `AGENTS.md`. Za kritično oceno, razvrstitev zrelosti in od orodij neodvisen
načrt ponovitve istega sistema glejte
[Priročnik za kakovostna preverjanja](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Popis kontrol in izvajalni profili

### Sprejem kandidata

Delovna toka CI in Quality Gates ustvarita stabilni razsodbi: `Gate / CI` in
`Gate / Quality`. Njuna verzionirana politika sprejema določa vsako predhodno opravilo
kot obvezno ali svetovalno. Veljavno obvezno opravilo mora uspeti: manjkajoči,
preklicani, preskočeni, čakajoči in neznani rezultati ne morejo potrditi stanja PASS. Veljavna
razvrstitev samo za dokumentacijo ali samo za katalog lahko povzroči, da kodna veja ni uporabna;
osnutek PR-ja ni sprejet kandidat. Oznaka `hotfix` ne odpravlja zahteve po dokazilih.

Oba delovna toka pokrivata PR-je v veje main/release, potiske v `main`, ročni zagon
in dogodke skupine združevanja. Potiski, ročni zagoni in skupine združevanja izvedejo celoten izbor. Potiski v
`release/**` ju ne zaženejo (2026-10-18): vsaka sprememba je matriko že izvedla v svojem PR-ju,
združena kombinacija pa je naloga sistema Release-Green (`docs/ops/RUNNER_BOX.md` → gostovana veja). Razcepi
in skupine združevanja uporabljajo gostovane izvajalnike za opravila, ki bi sicer izbrala samostojno gostovane
izvajalnike; pred uvedbo je treba preveriti zadostno gostovano zmogljivost.

Vsako potrdilo JSON identificira SHA prevzete delovne kopije, izvajanje delovnega toka in poskus.
CLI zavrne neujemanje SHA delovne kopije in dogodka. Preskusi delovnega toka vežejo članstvo v politiki
na seznam `needs` opravila z razsodbo, zato nova ali odstranjena veja ne more neopazno izginiti.
Potrdila pokrivajo svoj delovni tok, ne pa objave, uvedbe ali notranjega delovanja
obstoječega svetovalnega pregledovalnika. Aktiviranje obeh imen preverjanj v pravilih vej je
ločena skrbniška sprememba; dodajanje teh opravil samo po sebi ne zaščiti veje.

### Popis statičnih pregledov

Verzionirani popis vzdevkov npm in članstvo statičnih pregledov sta v
`config/quality/gate-manifest.json`. Za preverjanje imen skriptov in natančnih
ukazov glede na `package.json` zaženite `npm run check:gate-manifest`; dodajanja, odstranitve in
odstopanja ukazov povzročijo neuspeh tako lokalnega kavlja kot opravil za razvrščanje sprememb v CI.
Vzdevek ni opravilo delovnega toka, primerek matrike ali preskusni primer: teh števil
ne smete predstavljati kot medsebojno zamenljivih.

Za pregled izbranih vzdevkov brez njihovega izvajanja uporabite
`npm run quality:scan -- --list` ali `npm run quality:scan:fast -- --list`.
Izvajalnik prikliče vstopno točko npm, zato se ohrani njeno izvajalno okolje
(vključno z Bun, kjer je konfiguriran). Manifest beleži vzdevke zunaj teh profilov
kot ločeno priklicane, vzdrževalni ukazi pa so v profilih pregledovanja samo za branje prepovedani.

Ti profili pokrivajo samo statični pregled. Ne potrjujejo preskusov izdelka,
pokritosti, pakiranja, zunanjih preverjanj ali celotnega sprejema kandidata za izdajo.
Sprejem delovnega toka uporablja povezana `config/quality/admission-policy.json` in
`scripts/quality/admission-verdict.mjs`. Profili release-observer ostajajo ločeni;
njihova ustrezna preverjanja in potrdila preglejte neodvisno. Spodnji besedilni
popis je referenca in ne dokaz, da je bila kontrola dejansko izvedena.

Skripti so v `scripts/check/` (kontrole politik) in `scripts/quality/` (mehanizem postopnega zaostrovanja).
Vir resnice za CI je `.github/workflows/ci.yml`.

### Hitra pot za PR izdaje (`quality.yml`)

`.github/workflows/quality.yml` dopolnjuje CI pri PR-jih za main/release, potiskih v `main`,
ročnih zagonih in skupinah združevanja. PR-ji uporabljajo hitra preverjanja, filtrirana po poteh. Trajno
onemogočena podvojena gradnja je bila odstranjena; dejanska preverjanja gradnje/pakiranja/zagona ostajajo v CI.

| Opravilo                                         | Obseg                                                                                                                                                                                                                                                 | Blokiranje             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Dokumentacijski/kodni PR-ji; reference dokumentacije API in docs-all                                                                                                                                                                                  | Da                     |
| `Fast Quality Gates`                             | Kodni PR-ji; statična preverjanja, preverjanje tipov, preverjanje tipov nadzorne plošče, preskusi enot za prizadete dele                                                                                                                              | Da                     |
| `Forgotten sibling tests`                        | Kodni PR-ji; spremenjeni moduli, povezani s statičnimi porabniki in kandidati za sorodne preskuse; poti prek zbirnih modulov in dinamičnih uvozov so navedene kot svetovalna diagnostika, skupaj z navedenimi izjemami s seznama dovoljenih elementov | **Svetovalno**         |
| `Vitest (fast-path)`                             | Kodni PR-ji; hitra zbirka preskusov vitest                                                                                                                                                                                                            | Da                     |
| `Unit Tests fast-path`                           | Kodni PR-ji; zbirka preskusov enot v 4 delih                                                                                                                                                                                                          | Da                     |
| `No new ESLint warnings`                         | Kodni PR-ji; zaščita lint, ki upošteva izključitve                                                                                                                                                                                                    | Da, vključno z razcepi |
| `Merge integrity (changelog + generated skills)` | PR-ji, ki niso osnutki; dnevnik sprememb in sinhronizacija ustvarjenih veščin                                                                                                                                                                         | Da, vključno z razcepi |

#### Poročilo o pozabljenih sorodnih preskusih

`npm run check:forgotten-sibling-tests` ponovno uporabi razreševalnik uvozov, na katerem temelji zemljevid vpliva testov.
Za vsak spremenjen produkcijski modul poroča o determinističnih verigah
`changed module/symbol -> static consumer -> candidate sibling test`, kadar kandidatni
test ni prisoten v razlikah zahtevka za vključitev. Povzetek Markdown in rezultat JSON se shranita kot
artefakt poteka dela `forgotten-sibling-tests` za umerjanje pred uvedbo kakršnega koli blokiranja.

Ponovni izvozi zbirnih modulov in dinamični uvozi so namenjeni samo diagnostiki razreševanja; nikoli ne ustvarijo
blokirajoče ugotovitve. Pregledane izjeme so v
`config/quality/forgotten-sibling-allowlist.json`. Vsak vnos mora navesti porabnika in kandidatni
test, podati konkretno utemeljitev ter vsebovati povezavo do težave ali zahtevka za vključitev na GitHubu. Nepravilno oblikovani vnosi
povzročijo varno zavrnitev. Izjeme ne morejo prikriti izbrisanega kandidatnega testa ali razlike, ki dodaja `.skip`/`.todo`;
slabljenje preverjanj in drugo prikrivanje še naprej obravnava neodvisno blokirajoči
kontrolni mehanizem `check:test-masking`.

### Opravilo: `lint`

Izvede se pri vsakem zahtevku za vključitev v `main`. Ob neuspehu blokira združitev.

| Skript (`npm run ...`)            | Preverja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokira                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Različica Node.js je znotraj podprtega razpona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:cycles`                    | Krožne uvoze v celotnih imenikih `src/` in `open-sse/` (na podlagi AST, z razrešenimi `paths` iz tsconfig). Osnovni ukaz se konča s kodo 1, kadar obstaja kateri koli cikel (varno zavračanje od #15281), in izpiše SCC-je. `check:cycles:ratchet` (ki se izvaja v CI-ju) blokira, kadar število preseže zgornjo mejo `metrics.cycles` v `quality-baseline.json` — trenutno 14, `direction: down`, zato se lahko le znižuje (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da (omejevalnik)                             |
| `check:boundary`                  | Sklopitev `open-sse → src`: enolični uvozi med datotekami iz pogona v aplikacijo (`scripts/quality/measure-boundary.mjs`; seznam povezav je seznam preostalih nalog za odpravo težav z jedrom v4 oziroma razdelitvijo modulov). Osnovni ukaz = svetovalno poročilo (enako kot `quality:boundary`). `check:boundary:ratchet` (ki se izvaja v CI-ju in tudi v omejevalni zanki hitrih preverjanj v `quality.yml`) blokira, kadar število preseže zgornjo mejo `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — začetna vrednost je izmerjenih 771, `direction: down`; `--update` jo lahko samo zniža; pri PR-jih je relativna glede na osnovo (`--base-ref`, glejte spodaj)                                                                                                                                                                                                       | Da (omejevalnik)                             |
| `check:route-validation:t06`      | Prisotnost shem Zod na vseh poteh (pravilnik 6. stopnje)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:any-budget:t11`            | Število `@ts-expect-error // any` ne presega omejitve (catraca 11. ravni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:provider-consistency`      | Vsak ponudnik v `providers.ts` ima ustrezen vnos v `providerRegistry.ts` (in obratno, znotraj seznama dovoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:model-lifecycle`           | Tri ročno vzdrževane usmerjevalne tabele ostajajo skladne z vključeno različico posnetka življenjskega cikla (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne točkuje nobenega opuščenega ID-ja, ki ga lahko usmerja `REGISTRY`; vsak cilj `BUILT_IN_ALIASES` je prisoten v `REGISTRY` in odsoten iz posnetka opuščenih ID-jev; vsak opuščeni ID, ki je še vedno v `REGISTRY`, je posredovan ali naveden v `allowedRetiredInCatalog`; in noben vir ali cilj `DEFAULT_DEGRADATION_MAP` v tem posnetku ni označen kot opuščen. To ne dokazuje, da model trenutno zagotavlja delujoča nadrejena storitev. Brez povezave — primerja z `config/quality/model-lifecycle.json`, ki se ročno osveži z `npm run quality:refresh-model-lifecycle` (zahteva omrežje; ni vključeno v CI). `allowedRetiredInCatalog` je mehanizem postopnega zmanjševanja: vnos dodajte le skupaj s težavo za sledenje. | Da                                           |
| `check:fetch-targets`             | Vsak `fetch("/api/...")` v odjemalskem delu `src/` se razreši v dejanski `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:deps`                      | Vse odvisnosti, ki jih je mogoče namestiti z `npm install`, iz vseh datotek `package.json` v repozitoriju so navedene v `dependency-allowlist.json`; novi nepripeti paketi ali paketi z zavajajoče podobnimi imeni so označeni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `audit:deps`                      | `npm audit` (koren + electron) — brez opozoril visoke/kritične stopnje (prekriva se z osv `check:vuln-ratchet`; glejte seznam za racionalizacijo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:lockfile`                  | Celovitost datoteke `package-lock.json` — register HTTPS, zgoščene vrednosti celovitosti, brez preglasitev gostitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:licenses`                  | Seznam dovoljenih licenc SPDX za produkcijske odvisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:tracked-artifacts`         | Brez artefaktov gradnje / potrjenih simbolnih povezav `node_modules` (izvede se tudi v huskyjevem kavlju pred potrditvijo; kavelj pred potiskom je namenoma lahek — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:ai-attribution`            | Brez zaključne vrstice `Co-Authored-By` za UI/bota ali noge o ustvarjanju z UI v potrditvah, naslovu ali telesu PR-ja — Strogo pravilo #16 (v zanki hitrih kontrol v `quality.yml` za PR→`release/**` — prebere koristno vsebino dogodka, zunaj PR-jev pa ne naredi ničesar — in korak samo za PR-je pri preverjanju sloga v `ci.yml` za PR→`main`; tudi huskyjev kavelj `commit-msg`; človeški soavtorji so dovoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Vsaka izključitev Vitest navede sledilno težavo in je navedena v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) ostanejo znotraj omejitve `cap`, testne datoteke (`*.test.ts(x)`) pa znotraj omejitve `testCap`; datoteke, zamrznjene v `file-size-baseline.json` (`frozen` / `testFrozen`), ne smejo preseči svoje zabeležene velikosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:error-helper`              | Odzivi z napakami v izvajalnikih/obdelovalnikih uporabljajo `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo št. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:migration-numbering`       | Migracijske datoteke SQL so zaporedno oštevilčene, brez vrzeli ali podvojenih številk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:public-creds`              | Zunaj `publicCreds.ts` ni dobesedno navedenih poverilnic OAuth `client_id`/`client_secret` ali spletnih ključev Firebase (strogo pravilo št. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:db-rules`                  | Zunaj modulov `src/lib/db/` ni neposrednih poizvedb SQL; ni zbirnih uvozov iz `localDb.ts` (strogi pravili št. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:known-symbols`             | Izvajalniki ponudnikov, strategije usmerjanja in prevajalniki, registrirani v svojih tabelah za razpošiljanje, se ujemajo z datotekami na disku — brez osirotelih ali nedeklariranih simbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:route-guard-membership`    | Vsaka pot, ki zažene podrejeni proces, je razvrščena s funkcijo `isLocalOnlyPath()` (strogi pravili št. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:test-discovery`            | Vsako datoteko `*.test.ts` / `*.spec.ts` v repozitoriju zazna vsaj en izvajalnik testov (postopno zaostrovanje: seznam osirotelih datotek v `test-discovery-baseline.json` se lahko le krči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:test-tla-order`            | Nobena datoteka `node:test` v `tests/unit` ne registrira testa, izvede `await` na najvišji ravni in nato registrira dodatnih testov (#18045; postopno zaostrovanje: `test-tla-order-allowlist.json` se lahko le krči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:agent-skills-sync`         | Ustvarjeni artefakti zmožnosti agenta se ujemajo z izvornim katalogom (brez odstopanj)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Logotipi in sredstva ponudnikov imajo zabeležen vnos o izvoru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Konfiguracijske datoteke JSON je mogoče razčleniti in izpolnjujejo pravila preverjanja kode v repozitoriju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Prevajanje kode TypeScript brez napak (samo informativna opozorila)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmerjeno v prihodnost; številna obstoječa mesta klicev še vedno potrebujejo pripise                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Informativno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, omejen na `src/app/(dashboard)/**` (#7033) — skrbno izbrani seznam 27 datotek opravila `typecheck:core` ne vključuje nobene datoteke TSX nadzorne plošče, prav tako jih `next build` nikoli ne preverja glede tipov (`next.config.mjs` nastavi `ignoreBuildErrors: true`), zato regresije osirotelih identifikatorjev na tem mestu (#6625/#6909) za CI niso bile vidne. Razlike se primerjajo z zamrznjenim izhodiščem števila po datoteki in kodi TS (`config/quality/dashboard-typecheck-baseline.json`, enak vzorec preverjanja zastarelosti kot pri `check:known-symbols`) — preverjanje spodleti samo zaradi NOVIH napak, ki presegajo izhodiščno število; ko je obstoječa napaka odpravljena, izhodišče znižajte z `--update`.                                                                                                                                               | Da                                           |

### Opravilo: `quality-gate`

Zažene se po `test-coverage`. Ob neuspehu blokira združitev.

| Skript                       | Preverja                                                                                                                                                                                            | Blokira                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `quality:collect`            | Ustvari `quality-metrics.json` (število opozoril ESLint, pokritost iz združenega poročila delov)                                                                                                    | Da (pred zaskočnim preverjanjem) |
| `quality:ratchet`            | Nobena metrika v `quality-baseline.json` se ni poslabšala (opozorila ESLint ≤ izhodišče; pokritost ≥ izhodišče)                                                                                     | Da                               |
| `check:duplication`          | Podvajanje kode (jscpd@4) ne presega izhodišča v `quality-baseline.json`                                                                                                                            | Da                               |
| `check:complexity`           | Ciklomatska kompleksnost na ravni datoteke ne presega omejitve (osnovni pravili ESLint `complexity` + `max-lines-per-function`)                                                                     | Da                               |
| `check:cognitive-complexity` | Zaskočno preverjanje kognitivne kompleksnosti (`eslint-plugin-sonarjs`) — ločen prehod ESLint; CI oba izvede združeno v enem koraku `check:complexity-ratchets`                                     | Da                               |
| `check:dead-code`            | Zaskočno preverjanje neuporabljenih izvozov/datotek (knip) se glede na izhodišče ne poslabša                                                                                                        | Da                               |
| `check:compression-budget`   | Proračun primerjalnega preizkusa stiskanja — spodnje meje prihranka žetonov za posamezen mehanizem se ne smejo poslabšati                                                                           | Da                               |
| `check:type-coverage`        | Zaskočno preverjanje deleža tipizirane kode (`type-coverage`) se ne poslabša; večinoma zajema `typecheck:noimplicit:core`                                                                           | Da                               |
| `check:codeql-ratchet`       | Število odprtih opozoril CodeQL se ne poslabša (bere prek `gh api`; brez žetona preverjanje varno preskoči) — pogostost osveževanja in ročni sprožilec: glejte »Zaskočno preverjanje CodeQL« spodaj | Da                               |

### Opravilo: `quality-extended`

Celotno opravilo je svetovalno (`continue-on-error: true`). Zaskočna preverjanja, ki temeljijo na npm, se
dejansko izvedejo; zunanji pregledovalniki se namestijo prek `gh release download` in se sami preskočijo (exit 0),
če izvršna datoteka še vedno ni na voljo.

| Skript                   | Preverja                                                                                                                                                                                                                                                                  | Blokira                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Ni krožnih odvisnosti (dpdm)                                                                                                                                                                                                                                              | **Svetovalno**                                               |
| `check:bundle-size`      | Velikost paketa ne presega omejitve                                                                                                                                                                                                                                       | **Svetovalno**                                               |
| `check:secrets`          | Iskanje skrivnosti (gitleaks) — preskoči, če izvršna datoteka ni na voljo                                                                                                                                                                                                 | **Svetovalno**                                               |
| `check:vuln-ratchet`     | Ranljivosti odvisnosti (osv-scanner) se ne poslabšajo — preskoči, če izvršna datoteka ni na voljo                                                                                                                                                                         | **Svetovalno**                                               |
| `check:workflows`        | Preverjanje delovnih tokov (actionlint + zizmor); manjkajoči ali okvarjeni pregledovalniki, neveljavna poročila ali manjkajoče izhodišče zaskočnega preverjanja povzročijo stanje INCOMPLETE. Veljavne ugotovitve upoštevajo izbrani strogi/svetovalni/zaskočni pravilnik | Izvedba je obvezna; zaskočno preverjanje zizmor v CI blokira |
| `check:openapi-breaking` | Nezdružljive spremembe javne pogodbe API (`openapi.yaml`) glede na osnovno vejo (oasdiff) — ustvari `openapiBreaking=N`; preskoči, če oasdiff ni na voljo ali osnovne specifikacije ni mogoče razrešiti                                                                   | **Svetovalno**                                               |

### Opravilo: `docs-sync-strict`

Zažene se ob vsakem zahtevku za spojitev v `main`. Ob neuspehu blokira združitev.

| Skript                         | Preverja                                                                                                                                                                                            | Blokira                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metapreverjanje, ki zaporedno izvede spodnjih 6 podpreverjanj                                                                                                                                       | Da                        |
| ↳ `check:docs-sync`            | Skladnost različic med CHANGELOG, OpenAPI in llm.txt                                                                                                                                                | Da                        |
| ↳ `check:docs-counts`          | Števila v besedilu (število ponudnikov, število migracij itd.) so znotraj intervala postopnega zaostrovanja glede na dejanske vrednosti                                                             | Da                        |
| ↳ `check:env-doc-sync`         | Vsaka okoljska spremenljivka v `.env.example` je dokumentirana v tabeli dokumentacije in obratno                                                                                                    | Da                        |
| ↳ `check:deprecated-versions`  | V dokumentaciji ni opuščenih nizov različic                                                                                                                                                         | Da                        |
| ↳ `check:doc-links`            | Notranje povezave markdown v dokumentaciji kažejo na obstoječe datoteke (oblika `[text]`/`(path)`)                                                                                                  | Da                        |
| ↳ `check:fabricated-docs`      | Poti, okoljske spremenljivke, ukazi CLI, imena kavljev in poti datotek, navedeni v dokumentaciji, obstajajo v kodni zbirki. Strogo preverjanje prek `--strict`; brez zastavice napake ne blokirajo. | Da (prek `--strict` v CI) |
| `check:cli-i18n`               | Nizi ukazov CLI so prisotni v vseh datotekah področnih nastavitev i18n                                                                                                                              | Da                        |
| `check:openapi-coverage`       | Specifikacija OpenAPI pokriva vsaj postopoma zviševani minimalni delež dejanskih poti                                                                                                               | Da                        |
| `check:openapi-security-tiers` | Oznake varnostnih ravni v `openapi.yaml` so skladne s klasifikacijami v `routeGuard.ts`                                                                                                             | **Opozorilno**            |
| `check:openapi-routes`         | Vsaka pot v `openapi.yaml` se razreši v dejansko datoteko `route.ts` (preprečevanje izmišljanja)                                                                                                    | Da                        |
| `check:docs-symbols`           | Vsak sklic `/api/...` v `docs/**/*.md` se razreši v dejansko datoteko `route.ts` (preprečevanje izmišljanja)                                                                                        | Da                        |
| `i18n translation drift`       | Neprevedeni ključi v datotekah področnih nastavitev i18n — samo opozorilo                                                                                                                           | **Opozorilno**            |

### Opravilo: `i18n-ui-coverage`

| Skript                              | Preverja                                                                                                                                                                                                         | Blokira        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (vgrajeno) | Pokritost ključev i18n uporabniškega vmesnika je ≥ 65 %                                                                                                                                                          | Da             |
| `check-ui-value-drift` (vgrajeno)   | Spremenjena angleška **vrednost** ne pusti za seboj zastarelega prevoda                                                                                                                                          | Da             |
| `check-new-key-coverage` (vgrajeno) | **Nov** angleški ključ je preveden v vseh področnih nastavitvah — oznaka `__MISSING__:` je zavrnjena                                                                                                             | Da             |
| `check-translation-ratio`           | Delež dejanskih prevodov po področnih nastavitvah (vnosi, enaki angleškim / ograde / manjkajoči vnosi zunaj seznama dovoljenih izjem) ne sme preseči `config/quality/i18n-translation-baseline.json` + tolerance | **Opozorilno** |

Zahteva `fetch-depth: 0` — preverjanje odstopanja vrednosti primerja `en.json` z osnovo združitve.

#### `check-ui-value-drift` — preverjanje zastarelih prevodov

Zazna tisto regresijo i18n, ki je druga preverjanja strukturno ne morejo zaznati: angleška vrednost
je preoblikovana, prevodi, izpeljani iz _prejšnjega_ angleškega besedila, pa ostanejo, zato
uporabniki, ki ne uporabljajo angleščine, še naprej berejo samozavestno zapisano, a zdaj napačno besedilo.

To se je dejansko znašlo v izdani različici. `oauthModal.googleOAuthWarning` je bil preoblikovan ob uvedbi
pomočnika za prijavo Antigravity (#5203); **39 od 43 področnih nastavitev** je ohranilo besedilo, ki je skrbnikom
naročalo, naj »kopirajo celoten URL in ga prilepijo spodaj« — postopek, ki ga za tega ponudnika ni mogoče dokončati.
Težava je ostala neopažena do #8463, ker:

- `sync-ui-keys` dopolni samo ključe, ki **manjkajo**, nikoli pa tistih, ki so **zastareli**;
- `check-ui-keys-coverage` šteje _prisotnost_ ključev, zato se zastarel prevod šteje kot pokrit;
- `check-translation-drift` spremlja dokumentacijske zrcalne kopije `docs/i18n/<locale>/**.md` —
  datotek `src/i18n/messages/*.json` nikoli ne bere. Od ponovne sinhronizacije 2026-09 blokira v opravilu `docs-sync-strict`: uredite osrednji dokument → `npm run i18n:run -- --files=<doc>` (na ravni razdelka, cenovno ugodno).

**Upošteva razlike in ne temelji na izhodišču.** Primerja `en.json` v skupnem predniku združitve z
delovnim drevesom; za vsak ključ, katerega angleška vrednost se je spremenila, je vsaka jezikovna različica, ki še vedno vsebuje
nespremenjen prevod, zastarela. To namenoma **zamrzne obstoječi dolg** — iz razlike
ni mogoče ugotoviti, iz katere stare angleške različice izvira dolgo nespremenjen prevod, zato preverjanje presoja
samo tisto, česar se dotika trenutna sprememba. Alternativa (izhodišče z zgoščeno vrednostjo za vsak ključ) bi zahtevala
približno 600 KB veliko ustvarjeno datoteko, trikrat večjo od največjega obstoječega izhodišča, ki bi se spreminjala ob vsakem i18n PR-ju.

Preverjanje lahko izpolnite na dva načina:

1. posodobite zadevne prevode ali
2. jih nastavite na `__MISSING__:<new english>` — izvajalno okolje nato vrne popravljeno angleško besedilo
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ključ pa se uvrsti v čakalno vrsto za prevod.

Če se je spremenil **pomen** niza, raje **preimenujte ključ**: novi ključ ne more podedovati
zastarelega prevoda. Ta vzorec je bil uporabljen v #8463.

```bash
npm run i18n:check-value-drift          # strogo (to izvaja CI)
npm run i18n:check-value-drift:warn     # samo poročilo
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Konča se z izhodno kodo 0 in sporočilom `SKIP reason=base-unresolved`, kadar izhodiščnega kataloga ni mogoče prebrati (plitki
klon brez izhodiščnega sklica), po zgledu `check-openapi-breaking`.

### Opravilo: `i18n`

Celotna matrika preverjanja i18n (eno opravilo na jezikovno različico). Celotno opravilo je neobvezujoče.

| Skript                          | Preverja                                            | Blokira                                                          |
| ------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Popolnost prevodov za posamezno jezikovno različico | **Neobvezujoče** (`continue-on-error: true` za celotno opravilo) |

### Opravilo: `pr-test-policy`

Izvede se samo za zahteve za spojitev.

| Skript                 | Preverja                                                                                                                                                     | Blokira |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `check:pr-test-policy` | PR-ji, ki spreminjajo produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/`, morajo vključevati ali posodobiti teste (strogo pravilo št. 8)        | Da      |
| `check:test-masking`   | Spremenjene testne datoteke ne zmanjšajo neto števila preverjanj in ne dodajajo tavtologij `assert.ok(true)`                                                 | Da      |
| `check:pr-evidence`    | Opis PR-ja navaja dokazila o testiranju/VPS za spremembo (avtomatizira strogo pravilo št. 18 z iskanjem po besedilu PR-ja — krhko, glejte seznam zaostankov) | Da      |

### Opravilo: `test-vitest`

Izvede se po `build`. Ob neuspehu blokira spojitev.

| Zbirka           | Preverja                                                                | Blokira                                                                                                            |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Strežnik MCP (110 orodij), autoCombo, predpomnilnik — izvajalnik vitest | Da                                                                                                                 |
| `test:vitest:ui` | Testi komponent uporabniškega vmesnika — izvajalnik vitest              | **Blokira** — obstoječe napake so izrecno izključene v `vitest.config.ts`; nove napake povzročijo neuspeh opravila |

### Nočni poteki dela (načrtovani, neobvezujoči)

Izvajajo se po urniku cron (in prek `workflow_dispatch`), nikoli za PR-je. Vsi so neobvezujoči.

| Potek dela             | Preverja                                                                                                                                                                  | Blokira          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Lastnostne teste fast-check z naključnim semenom in velikim številom izvedb                                                                                               | **Neobvezujoče** |
| `nightly-resilience`   | Preverjanje rasti kopice, kaotično vbrizgavanje napak, obremenitveno/dolgotrajno obremenitveno testiranje k6                                                              | **Neobvezujoče** |
| `nightly-llm-security` | Zaščito promptfoo pred vstavljanjem pozivov (način blokiranja) in preizkuse garak (preskočeni brez skrivnosti ponudnika)                                                  | **Neobvezujoče** |
| `nightly-schemathesis` | Fuzz testiranje pogodb OpenAPI (schemathesis) na delujočem OmniRoute z uporabo `docs/openapi.yaml` — razkrije kršitve specifikacije/neobravnavane napake 500 (faza 8 B.4) | **Neobvezujoče** |
| `nightly-mutation`     | Rezultat mutacijskega testiranja Stryker v hitrem sklopu enotnih testov — preživeli mutanti razkrijejo šibka preverjanja                                                  | **Neobvezujoče** |
| `nightly-compat`       | Matrika združljivosti izvajalnika Node v podprtih razponih `engines.node`                                                                                                 | **Neobvezujoče** |

Izhodiščne vrednosti zmogljivosti (kopica, TTFB, čas gradnje) se beležijo, vendar niso pogoj: glejte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza hitrosti (2026-08-30 → v4.0 LTS): vsa izhodišča omiljena za 20 %

Odločitev lastnika (2026-08-30): do modularizacije v4.0 je hitrost izdajanja pomembnejša
od omejevanja tehničnega dolga. Vsa **številska** izhodišča zaskočne politike so bila v enem
sledljivem koraku omiljena za 20 %, faza pa je navedena v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kaj se je spremenilo                                                                                                                                                                                                           | Kje                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — števci, pri katerih je manj bolje, ×1.2; odstotki, pri katerih je več bolje, ÷1.2 (spodnja meja pokritosti ostaja 60, `eslintErrors` ostaja 0, `eslintWarnings` 0 → 20 % zamrznjenega števila izključitev) | `quality-baseline.json` (opomba `_relax_velocity_2026_08_30` navaja vse vrednosti prej → potem)        |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, omejitev vrstic za vsak `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                   | `file-size-baseline.json`                                                                              |
| števci po datotekah / po kodah TS ×1.2                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` postane zgolj priporočilen, ko je `_policy.requireTighten === false`                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nočni postopek `bank-ratchet-shrinks` je začasno ustavljen (zabeležil bi izmerjeno zmanjšanje in izničil razpoložljivo rezervo)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Seznami dovoljenj (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **niso** proračuni in niso bili spremenjeni. Politična preverjanja uspeha/neuspeha (skrivnosti, pravila SQL,
pogodba dokumentacije/okolja, skladnost i18n, testi enot) ostajajo nespremenjena — neuspešen test je še vedno neuspešen test.

**Orodja**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — enkratna
  omilitev (`scripts/quality/relax-baselines.mjs`); zavrne ponovno izvajanje z isto opombo.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  izmeri vsa številska preverjanja na enak način kot CI in izpiše preostalo rezervo za vsako preverjanje
  (`scripts/quality/baseline-headroom.mjs`). Nočno opravilo `baseline-headroom` objavi
  tabelo v povzetku izvajanja delovnega toka ter naloži svoje poročilo JSON/Markdown kot
  `baseline-headroom-<run_id>`, ki se hrani 90 dni. Opozorilne in kritične vrstice označujejo preverjanja,
  ki so znotraj 10 % svoje zgornje meje ali jo že presegajo. Ta poročila pregledujte kot zgodnje opozorilo,
  da se proračuni porabljajo; preglejte opombe `_rebaseline_*` zadevnega preverjanja. Opravilo ne
  ustvarja ali posodablja več trajne težave; #12149 ohranja zgodovino prejšnjih poročil.

**Način za novo kodo (Clean-as-You-Code) — od 2026-08-30, samo hitra pot za PR**

Pri dogodkih `pull_request` datoteka `quality.yml` posreduje `--base-ref <PR base SHA>` ukazom `check:file-size`,
`check:complexity-ratchets` in `check:dead-code`. Pri `check:complexity-ratchets` in
`check:dead-code` preverjanje primerja HEAD z združitveno osnovo, pri čemer je primerjava **omejena na datoteke, ki jih je
PR spremenil** (`scripts/check/newCodeMode.mjs`: združitvena osnova se materializira v začasnem
`git worktree`, ESLint/knip se izvedeta tam in na HEAD, nato pa se primerjajo števci po datotekah):

- **blokirajoče** — PR je v spremenjenih datotekah dodal kršitve ciklomatske/kognitivne kompleksnosti ali mrtve izvoze
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v dnevniku);
- **priporočilno** — globalna skupna vrednost glede na zamrznjeno izhodišče. Podedovani odklon nikoli ne povzroči
  neuspeha nedolžnega PR-ja; odklon se ob uskladitvi izdaje ponovno zamrzne, spremlja pa ga opravilo za rezervo.

`check:file-size` uporablja osnovni sklic po lastnih pravilih (`scripts/check/check-file-size.mjs`, #8522):
preveri vsako izvorno in testno datoteko v drevesu, z `git show` prebere število vrstic vsake datoteke
v osnovi PR-ja in datoteko označi kot neuspešno samo, če zraste prek večje izmed naslednjih vrednosti:
njene izhodiščne zgornje meje (`frozen` / `testFrozen` oziroma `cap` / `testCap` za datoteko zunaj
izhodišča) in njene velikosti v osnovi. Datoteka, ki je odstopala že v osnovi, zato nikoli ne povzroči
neuspeha nedolžnega PR-ja.

`check:boundary:ratchet` uporablja isto pravilo za svojo edino številčno vrednost
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): ob dogodkih PR tako hitra preverjanja
`quality.yml` kot opravilo lint v `ci.yml` posredujejo SHA osnove PR-ja, osnovna potrditev se
izmeri iz izvoza `git archive`, PR pa ne uspe samo, kadar njegovo število povezav
`open-sse → src` preseže večjo izmed vrednosti `metrics.boundaryOpenSseToSrc` in števila na osnovi. Odmik
osnove nad zgornjo mejo se prijavi (`base drift herdado`), vendar nikoli ne povzroči neuspeha nedolžnega PR-ja; push → main
ohrani absolutno zgornjo mejo, nerazrešljiv SHA osnove pa se z opozorilom vrne nanjo.

Zagoni `workflow_dispatch`, končni pregled zelene izdaje in nočno opravilo za preverjanje rezerve nimajo osnove PR-ja
in ohranijo absolutno (globalno) primerjavo. Pokritost, podvajanje in pokritost tipov za zdaj ostajajo globalni
(njihova orodja ne ustvarijo poceni razlik po posameznih datotekah) — so kandidati za enako obravnavo.

**Zaključek faze pri v4.0 (LTS = strožje kot prej, ne »nazaj na običajno«)**

1. Na čistem vrhu `release/v4.0.0`: za evidenco zaženite `npm run quality:headroom --json`, nato
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` in `--update` za vsako preverjanje tipov
   — vse osnovne vrednosti se znižajo na izmerjeno vrednost.
2. Izbrišite `_policy` iz `quality-baseline.json` (s tem znova omogočite `--require-tighten` in nočno
   kopičenje rezerve), v `check-openapi-coverage.mjs` obnovite `THRESHOLD = 36` (ali več).
3. Zaostrite meje pod izmerjene vrednosti tam, kjer se je modularizacija obrestovala: `cap` velikosti datotek znova na 1000
   (ali 800), najnižje pragove pokritosti zvišajte za 5, število mrtvih izvozov pa nastavite na 0 za modularizirane pakete.

## Osnovno stanje zaskočke (`quality-baseline.json`)

Mehanizem zaskočke (`scripts/quality/check-quality-ratchet.mjs`) prebere `quality-baseline.json`
in ga primerja s sveže zbrano datoteko `quality-metrics.json`. Vsaka metrika, ki se poslabša
za več kot njen epsilon, povzroči neuspešno gradnjo.

Trenutno spremljane metrike:

| Metrika               | Smer   | Pomen                                      |
| --------------------- | ------ | ------------------------------------------ |
| `eslintWarnings`      | `down` | Število opozoril ESLint se ne sme povečati |
| `coverage.statements` | `up`   | Pokritost stavkov se ne sme zmanjšati      |
| `coverage.lines`      | `up`   | Pokritost vrstic se ne sme zmanjšati       |
| `coverage.functions`  | `up`   | Pokritost funkcij se ne sme zmanjšati      |
| `coverage.branches`   | `up`   | Pokritost vej se ne sme zmanjšati          |

Za posodobitev osnovnega stanja po dejanskem izboljšanju:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Zastavica `--update` zapiše trenutno izmerjene vrednosti v `quality-baseline.json`.
To datoteko objavite skupaj s spremembo, ki je izboljšala metriko. Zahtevo PR, ki izboljša
metriko brez posodobitve osnovnega stanja, bo zaznal `--require-tighten` (faza 6A.5,
implementacija je v pripravi).

### Zaskočka CodeQL: pogostost osveževanja in ročni sprožilec

`check:codeql-ratchet` bere **stanje repozitorija, ki se osvežuje po urniku — ne za vsak PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` poroča
`state: configured`, `schedule: weekly`: gre za pregled s privzeto nastavitvijo GitHuba, ne za
analizo ob vsakem potisku. Posledica: ko je PR, ki ODPRAVI opozorila, združen, zaskočka še naprej
bere staro, višje število do naslednjega načrtovanega pregleda — zato poroča o poslabšanju
pri vsakem odprtem PR-ju, vključno z nadaljnjimi spremembami popravljalnega PR-ja, dokler pregled ne dohiti stanja.

**Ročna osvežitev**: `gh workflow run codeql.yml --ref release/vX.Y.Z` znova zažene
analizo in v nekaj minutah ponovno objavi opozorila. Najprej preberite `.github/workflows/codeql.yml`
— glava datoteke pojasnjuje, da uporablja samo `workflow_dispatch`, **ker je v navzkrižju s
GitHubovo »privzeto nastavitvijo«** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Za obnovitev sprožilcev `push`/`pull_request`/
`schedule` je najprej potrebno **dejanje lastnika**: Settings → Code security →
CodeQL: Default → Advanced. Ne dodajajte sprožilca `schedule:`, dokler ta preklop ni opravljen — povzročil
bo samo neuspešne zagone.

**Po zmanjšanju števila zaostrite osnovno stanje** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapiše novo izmerjeno število v `quality-baseline.json` →
`metrics.codeqlAlerts.value`, tako da zaskočka ne dovoli neopaznega poslabšanja nazaj
do stare zgornje meje. Praktični primer (2026-09-02/03): PR #12502 je odpravil 7 resničnih opozoril
(13 → 6 izmerjenih odprtih); PR #12530 je zaostril zamrznjeno osnovno stanje z 11 → 6, da se je ujemalo;
preostalih 6 je bilo nato zavrnjenih z utemeljitvijo za vsako opozorilo posebej, tako da je število odprtih padlo na 0.

**Zavrnitve so odločitev upravljavca (strogo pravilo št. 14)** — opozorila CodeQL nikoli ne zavrnite,
ne da bi v komentarju ob zavrnitvi navedli tehnično utemeljitev: `won't fix` za
zahtevo nadrejenega protokola, `used in tests` za testni pripomoček, `false positive`
za razkuževalnik, ki ga CodeQL ne more zaznati (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Pravilnik ponovnih poskusov testov (WS5.4, v3.8.49)

Ponovni poskusi se določajo za vsak izvajalnik posebej, nikoli globalno — splošen ponovni poskus resnične regresije spremeni
v nevidne nestabilnosti:

| Izvajalnik       | Pravilnik                                                                                                                                   | Zakaj                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` samo v CI, z `trace: on-first-retry`                                                                                           | Časovno usklajevanje brskalnika/omrežja je dejansko nedeterministično; en ponovni poskus s sledjo spremeni nestabilnost v diagnostični artefakt |
| Vitest           | BREZ globalnega ponovnega poskusa. Dokazano nestabilen test dobi izrecen ponovni poskus na ravni testa (viden v razliki, pregledan v PR-ju) | Seznam izoliranih testov ostane v repozitoriju in ni nikoli nepregleden                                                                         |
| node:test (unit) | NIKOLI brez ponovnega poskusa                                                                                                               | Nestabilen test enote je napaka v testu — popravite ga, ne zaganjajte ga znova                                                                  |

Ciljni SLO-ji, ko bo na voljo telemetrija nestabilnosti (WS5.2/5.3): <1-% stopnja nestabilnosti na test
(prag »popravi takoj«), ≥95-% uspešnost na cevovod. Referenčne vrednosti panoge —
ponovno jih umerite glede na naše meritve.

## Odklon raglje na ravni izdaje (WS5.5, v3.8.49)

Ko raglja (velikost datoteke, kompleksnost, opozorila eslint) nazaduje na ČISTEM vrhu izdaje
— tj. nazadovanje je povzročila KOMBINACIJA združitev in ga noben posamezen PR ne poustvari
na svoji veji — je za popravek **enkratno odgovoren vodja izdaje, in sicer na veji
izdaje**: prednost dajte izločitvi/refaktoriranju; izhodiščno vrednost na novo določite samo z dokumentiranim
vnosom utemeljitve. Kombinacijskega odklona nikoli ne prelagajte na PR sodelujočega in nikoli
ne določajte nove izhodiščne vrednosti za vsak PR posebej (to skrije resnične regresije). Najprej razločite vzrok: rdeče stanje poustvarite
na čistem vrhu v preizkusnem delovnem drevesu, preden domnevate, da ga je povzročil vaš PR.

## Shranjevanje zmanjšanj raglje — smer navzdol (#8584)

Raglja je avtomatizirana le napol, in sicer napačna polovica. **Zvišanje** omejitve je
ročno urejanje JSON-a, ki traja deset sekund in je najhitrejši način za odblokiranje rdečega PR-ja.
**Znižanje** zahteva, da nekdo zažene `--update` in potrdi rezultat — dokler
ni bilo uvedeno opravilo `bank-ratchet-shrinks`, tega ni izvajal noben potek dela. Izmerjena posledica
(2026-07-25): 18 zamrznjenih datotek je bilo že na meji 800 vrstic za nove datoteke ali pod njo, najslabša
pa pri 132× (`src/shared/validation/schemas.ts`, 19 vrstic z omejitvijo 2.523); zgornja meja
kompleksnosti se je prek približno 37 opomb o ponovni določitvi izhodišča premaknila z `1794 → 2169`, pri čemer je bilo natanko eno
zmanjšanje (−1); zapis »zaostri z `--update` v naslednjem ciklu« pa se je pojavil 31-krat in bil upoštevan
enkrat. Omejitev, ki preživi kodo, zaradi katere je nastala, vsako dokončano
razgradnjo potiho spremeni v dovoljenje za rast za naslednjo osebo, ki ureja datoteko.

`nightly-release-green.yml` → opravilo **`bank-ratchet-shrinks`** sklene to zanko:

|              |                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Izvaja se ob | `schedule` (3×/dan) + `workflow_dispatch` — namenoma **ne** ob `push`                                               |
| Meri         | najvišjo vejo `release/vX.Y.Z`, z enakim razreševanjem in zaščito pred vbrizgavanjem kot `release-green`            |
| Zapiše       | `check:file-size --update` in `check:complexity-ratchets --update` (oba sta po zasnovi namenjena samo zmanjševanju) |
| Preveri      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Dostavi      | en vedno posodobljen PR za vejo izdaje — prisilno posodobljen, nikoli podvojen                                      |

Shranjevanje poteka paketno in ne ob vsakem potisku, ker zanj ni zahteve glede zakasnitve (zmanjšanje,
shranjeno v 8 urah, je sprejemljivo), medtem ko bi izvajanje ob vsaki združitvi med kampanjami združevanja
vedno znova gradilo vejo PR-ja in vsakič zahtevalo celoten pregled ESLint. Zaznavanje ostaja vezano na
potisk (`release-green`); paketno je le shranjevanje.

### Varnostni preverjevalnik

Opravilo nenadzorovano zapisuje v izhodiščne vrednosti, zato sprejemljivost tega zagotavlja `verify-ratchet-bank.mjs`.
Primerja drevo po `--update` z `HEAD` in **prekine opravilo,
še preden obstaja kakršna koli potrditev** — ne da bi odprlo PR — razen če je vsaka sprememba ena od naslednjih:

- številski vnos `frozen` / `testFrozen`, ki je **znižan** ali **odstranjen**
- `complexity-baseline.json` → `count` je **znižan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` je **znižan**

Vse drugo povzroči neuspeh: zvišanje števila, dodajanje vnosa, spreminjanje `cap`/`testCap` ali
brisanje/prepisovanje opombe `_rebaseline_*` (te opombe so revizijska sled razlogov za obstoj posamezne
zgornje meje in so shranjene znotraj istega objekta `frozen` kot vnosi datotek).
Bot, ki bi lahko zvišal omejitev, bi bil nedvomno slabši od obstoječega stanja. Varovalo pred regresijo:
`tests/unit/verify-ratchet-bank.test.ts`.

Opravilo nikoli ne potiska v `release/*` — PR združi človek, zato napačna meritev
ne more pristati brez pregleda.

## Pravilnik seznama dovoljenih izjem

Vsako preverjanje, ki ne sme spodleteti zaradi že obstoječih kršitev, uporablja zamrznjen seznam dovoljenih izjem
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilnik je:

**Odpravite temeljni vzrok; seznam dovoljenih izjem uporabite le, kadar je kršitev že obstajala in
je ni mogoče odpraviti v istem PR-ju.**

Ko dodajate vnos na seznam dovoljenih izjem:

1. Vključite komentar z utemeljitvijo.
2. Navedite povezano sledilno težavo (npr. `// #3498 — Funkcionalnost 2. faze, še ni implementirana`).
3. Vnos odstranite v istem PR-ju, ki odpravi kršitev — zastarel vnos, ki ne
   prezre več aktivne kršitve, je tudi sam napaka (preverjanje zastarelega uveljavljanja 6A.3 bo,
   ko bo implementirano, spodletelo zaradi osirotelega vnosa na seznamu dovoljenih izjem).

Vnosov na seznam dovoljenih izjem **ne** dodajajte zato, da bi testi hitreje uspeli. Uspešno preverjanje ob vse daljšem
seznamu dovoljenih izjem daje lažen občutek kakovosti.

### Ko preverjanje za vaš PR spodleti

1. **Pozorno preberite izpis preverjanja** — natančno vam pove, katera datoteka ali simbol je kršil
   pravilo.
2. **Odpravite kršitev** — večina preverjanj je determinističnih preverjanj datotečnega sistema, ki uspejo takoj,
   ko je koda pravilna.
3. **Če je kršitev že obstajala** (tj. niste je uvedli vi, vendar jo preverjanje zdaj
   zajema): dodajte vnos na seznam dovoljenih izjem s komentarjem, ki vsebuje utemeljitev in povezano sledilno težavo.
4. **Če je preverjanje omejevalnik** (pokritost, opozorila ESLint, podvajanje, kompleksnost):
   vaša sprememba je poslabšala metriko. Odpravite temeljno težavo ali pa (redko) zaženite
   `npm run quality:ratchet -- --update`, če je sprememba namerna in je poslabšanje
   metrike sprejemljivo — vendar v opisu PR-ja dokumentirajte razlog.
5. **Svetovalna preverjanja** (`continue-on-error: true`) so informativna — ne blokirajo
   združitve, vendar se prikažejo v povzetku CI. Kljub temu jih odpravite.

---

## Dodajanje novega preverjanja

1. Ustvarite `scripts/check/check-<name>.mjs` (ali `.ts`). Preverjanja pravilnikov se končajo s kodo 0/1.
   Preverjanja vrste omejevalnik prek `collect-metrics.mjs` zapišejo metriko v `quality-metrics.json`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` v `package.json`.
3. Povežite ga v `.github/workflows/ci.yml` pod ustreznim opravilom
   (pravilnik → `lint` ali `docs-sync-strict`; omejevalnik → `quality-gate`).
4. Če uporablja seznam dovoljenih izjem, uporabite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs`, da se zastareli vnosi samodejno zaznajo.
5. V `tests/unit/build/` napišite test, ki pokriva logiko zaznavanja preverjanja.
6. Posodobite ta dokument (dodajte vrstico v tabelo ustreznega opravila).

---

## Orodja za agente: LSP v zanki (izbirno)

Poleg preverjanj CI OmniRoute vključuje **izbirno** ogrodje `agent-lsp`
(datoteka `.mcp.json` na ravni projekta, Faza 7, naloga 15). Ustvarite `.mcp.json`,
da programerskim agentom omogočite dostop do jezikovnega strežnika TypeScript, tako da razrešijo simbole /
diagnostiko **pred** pisanjem kode — kot dopolnilo preverjanju `typecheck:core` po načelu prevajanja pred zatrjevanjem,
ki napake zaradi »izmišljenih simbolov« odpravlja pri viru. Namenoma se ne naloži
samodejno (most MCP↔LSP izberete in preverite sami); nedelujoč vnos zgolj zabeleži
napako povezave in nikoli ne prekine sej.

---

## Seznam za racionalizacijo (pregled ROI — Faza 9, val 3)

Ta popis je bil 2026-06-17 usklajen z `ci.yml` (prejšnja različica je izpustila
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI usklajenega nabora je
opredelil naslednje kandidate za racionalizacijo. **Združitve so mehanske spremembe CI;
preklopi/opustitve so odločitve o pravilnikih, pridržane operaterju.** Nič od spodaj
navedenega še ni uveljavljeno.

**Prav tako ni dokumentirano zgoraj** (svetovalno, šibek signal): opravilo `docs-lint`
(markdownlint + Vale, celotno opravilo ima `continue-on-error`) in samostojni delovni tokovi
pregledovalnikov `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` je v
`quality-baseline.json`, vendar ni povezan z blokirno zaskočko v `ci.yml` — metrika je
trenutno nepovezana.

### Združitev / odstranjevanje podvajanj (mehansko, manjše tveganje)

Vsak kandidat je bil 2026-06-17 preverjen glede na dejansko stanje prehodov (zaupaj, vendar preveri);
izkazalo se je, da več »očitnih« združitev skriva dolg in **niso** neposredno uporabne zamenjave.

- **`check:docs-sync` se izvede dvakrat** — samostojno v opravilu `lint` in ponovno znotraj `check:docs-all` (`docs-sync-strict`) ter v huskyjevi zanki pred potrditvijo. ✅ **OPRAVLJENO** — samostojni klic v `lint` je odstranjen.
- **Pregledovanje CVE-jev** — ❌ **NI primeren za neposredno združitev.** `audit:deps` se konča z napako ob katerem koli CVE-ju visoke/kritične stopnje; `check:vuln-ratchet` (osv) odpove samo ob _nazadovanju_ glede na izhodišče (trenutno 1 MODERATE). Različna semantika — opustitev `audit:deps` bi odstranila absolutni prehod za visoko/kritično stopnjo. Obdržite oba.
- **Zaznavanje ciklov** — ✅ **OPRAVLJENO** (#15159 G-01/G-02). Staro besedilo je `check:cycles` imenovalo »zeleni, kurirani« prehod in utemeljevalo, da mora ostati blokiren, ker je `check:circular-deps` (dpdm) poročal o 91 ciklih. Ta zelena oznaka je bila **lažno pozitivna**: `check:cycles` je pregledal 5 podimenikov (450 datotek), prepoznal samo statične `import|export … from` in zavrgel vsak določilnik `@/` ter `@omniroute/open-sse/`, zato ni mogel zaznati ciklov dinamičnih uvozov in vzdevkov, ki so prevladovali v repozitoriju. Popravljeno: prehod zdaj prehodi `src` + `open-sse` (5023 datotek), zbira določilnike iz AST-ja TypeScript (zato `import("…")` šteje, `typeof import("…")` na položaju tipa pa ne) in razrešuje `paths` iz tsconfig. Najde **14** ciklov, ne 0. Ker 14 obstoječih ciklov ni mogoče popraviti v PR-ju prehoda, je `check:cycles` zdaj **zaskočka** (`--ratchet`, zgornja meja `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokira vsako _nazadovanje_, število pa se lahko samo zmanjšuje. CI izvaja `npm run check:cycles:ratchet`. Postopno odpravljanje poteka skupaj z **A-01**. `check:circular-deps` (dpdm) ostaja svetovalen kot širše drugo mnenje.
- **Kompleksnost** — ✅ **OPRAVLJENO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en prehod ESLint, štetje po ruleId, tako da izhodišča za ciklomatsko kompleksnost + največje število vrstic ter kognitivno kompleksnost ostanejo neodvisna; posamezna `check:complexity` / `check:cognitive-complexity` ostaneta za lokalni `--update`.
- **Preprečevanje halucinacij `/api`** — ✅ **OPRAVLJENO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en popis datotečnega sistema za `src/app/api`, openapi-routes + docs-symbols še vedno poročata neodvisno; posamezni pregledi ostanejo za lokalna izvajanja.
- **`check:node-runtime` se izvaja v 11 opravilih** — ⚠️ **nizek ROI.** Vsako opravilo uporablja ločen izvajalnik in pregled traja <1 s; skupni prihranek je ~10 s, v zameno pa bi izgubili poceni varovalo za vsako opravilo. Ni vredno spreminjanja.
- **`typecheck:noimplicit:core` v preverjanju CI lint** — ✅ **odstranjeno iz opravila lint** (bilo je svetovalno z `continue-on-error`); blokirno površino tipov zagotavljata `typecheck:core` + `check:type-coverage`. Lokalni skript je ohranjen.

### Preklop / odločitev (pravilnik operaterja)

- `check:openapi-security-tiers` (svetovalno) — ❌ **NI mogoče neposredno preklopiti.** Konča se s kodo 0, vendar opozori, da več poti `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nima oznake `x-loopback-only: true`. Pred uveljavitvijo je treba te oznake najprej dodati v `openapi.yaml`.
- `typecheck:noimplicit:core` (svetovalno) — večinoma ga nadomešča blokirna zaskočka `check:type-coverage`. Preklopite ga na zaskočko ali opustite odvečni drugi prehod `tsc`.
- `test:vitest:ui` (zdaj **blokirno**) — obstoječe napake so izrecno izključene v `vitest.config.ts` s sledilnimi komentarji `// #8618`; nove napake povzročijo neuspeh opravila.
- `check:secrets` (gitleaks, blokirna zaskočka, zamrznjena pri 3 dokumentiranih lažno pozitivnih zadetkih) — dodajte te 3 na seznam dovoljenih, da dosežete 0, ali ga znižajte na svetovalnega. Prekriva se z GitHubovim vgrajenim pregledovanjem skrivnosti + `check:public-creds`.
- `check:pr-evidence` (blokirno, išče vzorce v proznem besedilu telesa PR-ja) — visoko tveganje lažno pozitivnih zadetkov; opustitev oslabi uveljavljanje strogega pravila št. 18, zato je to dejanska odločitev o pravilniku.
- `semgrep` (samostojno svetovalno) — pri družinah OWASP se prekriva s CodeQL; povežite njegovo izhodišče z zaskočko ali ga opustite.

---

## Povezana dokumentacija

- Dobavna veriga (izvor, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — prehod za pariteto nabora ključev

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, opravilo `i18n-ui-coverage`).
Primerja nabor končnih ključev vsake datoteke `src/i18n/messages/<locale>.json` z `en.json` in spodleti
ob vsakem manjkajočem ali dodatnem končnem ključu, ne glede na to, kdaj je bil ključ dodan. Ograde
`__MISSING__:` štejejo kot prisotne (njihova vsebina je stvar prehoda razmerja). To je absolutno dopolnilo
obeh prehodov, ki temeljita na razlikah oziroma odstotkih: `check-ui-keys-coverage` uveljavlja 80-% prag
za vsak jezik (43 manjkajočih ključev od približno 13.000 še vedno pomeni 99,7 %), `check-new-key-coverage`
pa presoja samo ključe, ki jih zahteva PR doda v `en.json`. Paket jezikov se ustvari iz različice `en.json`
na dan, ko je ustvarjena njegova veja, nato pa se prevaja več dni, medtem ko osnovna veja še naprej dodaja
ključe; zahteva PR za paket sama ne doda nobenega ključa, zato sta oba sorodna prehoda ostala tiha, ko je
bil paket 1 (#13044) združen s 43 manjkajočimi ključi v devetih jezikih, paket 2 (#13660) pa z 10
manjkajočimi ključi v osmih (2026-09-15). Napako odpravite z
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; dodatni končni ključ (`extra`)
pomeni, da ga je izvor odstranil — izbrišite ga iz jezika. `--warn` poroča brez sprožitve napake.
`--catalog=cli` izvede enako primerjavo nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba koraka sta del opravila `i18n-ui-coverage`.

#### `check-new-key-coverage` — prehod i18n za nove ključe

Sorodni prehod za `check-ui-value-drift`. Ta zazna angleško vrednost, ki je bila **prepisana**,
medtem ko so njeni prevodi ostali nespremenjeni; ta pa zazna angleški ključ, ki je bil **dodan**,
ne da bi ga nekateri jeziki prejeli.

`check-ui-keys-coverage` tega razreda ne more zaznati: uveljavlja odstotni prag za vsak jezik,
enajst manjkajočih ključev od približno 13.000 pa še vedno pomeni 99,9-% pokritost. Odstotek za
posamezen jezik ne more izraziti »ta funkcionalnost je bila izdana neprevedena« — celotna funkcionalnost
je lahko vključena v nov jezik brez kakršnega koli besedila, ne da bi se številka sploh spremenila.

Dogodek, ki ga ta prehod kodira: 3. faza platna Orchestration Canvas je svojih enajst ključev prevedla
v vseh 42 jezikov, ki so takrat obstajali. Nekaj ur pozneje je paket jezikov EU (#13044) povečal število
jezikov v repozitoriju na 51, devet novincev (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) pa
teh ključev ni nikoli prejelo. `deepMergeFallback` manjkajoči ključ nadomesti z angleščino, zato se je
napaka pokazala kot nepreveden uporabniški vmesnik in ne kot prazen uporabniški vmesnik — resnična težava,
ki je bila po zasnovi tiha.

Tako kot sorodni prehod tudi ta **upošteva razlike**, saj primerja angleščino na osnovi združitve z
delovnim drevesom, zato obstoječe vrzeli ostanejo zamrznjene in za vklop prehoda ni bila potrebna migracija.

**Ograda `__MISSING__:<english>` ga ne zadovolji (od 2026-09-17).** Prej je bila dokumentiran način
odloga — izvajalno okolje uporabi pravilno angleško nadomestno besedilo — dokler ni osem zahtev PR za
funkcionalnosti dne 2026-09-16 dodalo 61 ključev in v vseh 65 jezikih namesto prevoda vstavilo ogrado:
ta prehod je sprejel vse, nič ni blokiralo zahtev PR, blokirni prehod razmerja dejanskih prevodov pa je
nato spodletel na konici izdaje za vse (pt-BR 3,2 % > 2,5 % + 0,5). Ograda se zdaj obravnava kot
manjkajoči prevod. Napako odpravite z
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ali pa vse
jezike vzporedno obdelajte z `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
varno za ločeno izvajanje, zavrne zagon brez okoljske spremenljivke `OMNIROUTE_TRANSLATION_*`). Ključ,
ki mora ostati v angleščini (pripeto ime izdelka, pogona ali zastavice), spada v
`scripts/i18n/untranslatable-keys.json`, nikoli za ogrado. `vi` povsem prepoveduje ograde
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — prehod za odložene preizkuse

Datoteka na seznamu `exclude` v `vitest.config.ts` je preizkus, ki se ne izvede, vendar je vsakomur,
ki pregleduje drevo, videti kot pokritost. Za komentarjem
`// #8618 — pre-existing failure; remove this exclusion when fixed` se je nabralo dvainšestdeset datotek.
Zadeva #8618 je bila zaprta 2026-08-11, medtem ko je seznam, ki mu je sledila, zrasel s 45 na 62 vnosov,
pri čemer je vsak nov vnos podedoval komentar, ki je kazal na mrtvo zadevo. Ko je bil seznam končno
izmerjen po posameznih datotekah (#13204), je **51 od 62 datotek prestalo preizkus glede na trenutno
drevo brez kakršne koli spremembe izvorne kode**.

Prehod zahteva, da vsaka izključitev, ki se razreši v dejansko datoteko, (a) navede sledilno zadevo in
(b) nastopa v `config/quality/vitest-exclusions.json` skupaj z izmerjenim stanjem, tako da je dodajanje
izključitve pregledljiva razlika v namenski datoteki in ne le še ena vrstica v polju s 60 vnosi. Namenoma
ne zažene znova izključenih preizkusov — to traja približno 10 minut in sodi v periodično opravilo;
evidenca beleži, kdaj je bila posamezna izključitev nazadnje izmerjena.
