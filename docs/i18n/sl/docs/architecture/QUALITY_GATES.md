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

## Inventar vrat in izvedbeni profili

### Sprejem kandidatov

Delovni tokova CI in Quality Gates vsak oddajata stabilen rezultat: `Gate / CI` in
`Gate / Quality`. Njuna različicama določena sprejemna politika našteva vsako
zgornje opravilo kot zahtevano ali svetovalno. Vsako veljavno zahtevano opravilo mora
biti uspešno: manjkajoči, preklicani, preskočeni, čakajoči in neznani rezultati ne
morejo vzpostaviti PASS. Veljavna razvrstitev samo za dokumentacijo ali samo za
katalog lahko povzroči, da kodna veja ni relevantna; osnutek PR ni sprejet kandidat.
Oznaka `hotfix` ne odpravlja zahteve po dokazih.

Oba delovna toka pokrivata PR-je v veje main/release, potiske v `main`, ročni zagon
in dogodke merge-group. Potisk, odprema in merge-group izvedejo celoten izbor.
Potiski v `release/**` jih ne zaženejo (2026-10-18): vsaka sprememba je matriko že
zagnala na svojem PR-ju, združena kombinacija pa je naloga Release-Green
(`docs/ops/RUNNER_BOX.md` → gostujoča veja). Razcepi in skupine za združevanje
uporabljajo gostujoče izvajalnike za opravila, ki bi sicer izbrala lastno gostujoče
izvajalnike; pred uvedbo je treba preveriti zadostno zmogljivost gostujočih
izvajalnikov.

Vsako potrdilo JSON določa SHA odjavljene različice, zagon delovnega toka in poskus.
CLI zavrne neujemanje SHA-ja odjavljene različice in dogodka. Preizkusi delovnega
toka vežejo članstvo v politiki na seznam `needs` opravila z rezultatom, tako da
nova ali odstranjena veja ne more tiho izginiti. Potrdila zajemajo svoj delovni tok,
ne pa objave, uvajanja ali notranjosti obstoječega svetovalnega pregledovalnika.
Aktiviranje obeh imen preverjanj v pravilih vej je ločena skrbniška sprememba;
dodajanje teh opravil samo po sebi ne zaščiti veje.

### Inventar statičnega pregledovanja

Različicama določeni inventar vzdevkov npm in članstvo v statičnem pregledovanju
sta v datoteki `config/quality/gate-manifest.json`. Za preverjanje imen skript in
točnih ukazov glede na `package.json` zaženite `npm run check:gate-manifest`;
dodajanja, odstranitve in odstopanja ukazov povzročijo napako tako v lokalnem kavlju
kot v opravilih razvrščanja sprememb v CI-ju. Vzdevek ni opravilo delovnega toka,
primerek matrike ali testni primer: teh števil ni dovoljeno predstavljati kot
zamenljivih.

Uporabite `npm run quality:scan -- --list` ali `npm run quality:scan:fast -- --list`,
da pregledate izbrane vzdevke, ne da bi jih izvedli. Izvajalnik prikliče vstopno
točko npm, zato je njegovo izvajalno okolje (vključno z Bunom, kjer je konfiguriran)
ohranjeno. Manifest beleži vzdevke zunaj teh profilov kot ločeno priklicane, vzdrževalni
ukazi pa so v profilih pregledovanja samo za branje prepovedani.

Ti profili pokrivajo samo statično pregledovanje. Ne potrjujejo produktnih testov,
pokritosti, pakiranja, zunanjih preverjanj ali celotnega sprejema kandidata za izdajo.
Sprejemanje v delovnem toku uporablja povezani datoteki
`config/quality/admission-policy.json` in `scripts/quality/admission-verdict.mjs`.
Profili opazovalnika izdaje ostajajo ločeni; njim veljavna preverjanja in potrdila
preglejte neodvisno. Spodnji opisni inventar je referenca, ne dokaz, da so se vrata
dejansko zagnala.

Skripti so v `scripts/check/` (politična vrata) in `scripts/quality/` (mehanizem
ratcheta). Vir resnice za CI je `.github/workflows/ci.yml`.

### Hitra pot za PR-je izdaje (`quality.yml`)

`.github/workflows/quality.yml` dopolnjuje CI na PR-jih v veje main/release, pri
potiskih v `main`, ročnem zagonu in skupinah za združevanje. PR-ji uporabljajo hitro
preverjanje, filtrirano po poteh. Trajno onemogočeno podvojeno gradnjo so odstranili;
prava preverjanja gradnje/pakiranja/zagona ostajajo v CI-ju.

| Opravilo                                         | Obseg                                                                                                                                                                                                                              | Blokira                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Dokumentacijski/šifrski PR-ji; sklici API-dokumentacije in vse dokumentacije                                                                                                                                                       | Da                     |
| `Fast Quality Gates`                             | Kodni PR-ji; statična preverjanja, preverjanje tipov, preverjanje tipov nadzorne plošče, prizadeti testi enot                                                                                                                      | Da                     |
| `Forgotten sibling tests`                        | Kodni PR-ji; spremenjeni moduli, sledenje do statičnih porabnikov in kandidatnih sorodnih testov; poti z zbirnimi datotekami in dinamičnimi uvozi so poročane kot svetovalna diagnostika, z navedenimi izjemami seznama dovoljenih | **Svetovalno**         |
| `Vitest (fast-path)`                             | Kodni PR-ji; hitri paket vitest                                                                                                                                                                                                    | Da                     |
| `Unit Tests fast-path`                           | Kodni PR-ji; paket testov enot s 4 razdelki                                                                                                                                                                                        | Da                     |
| `No new ESLint warnings`                         | Kodni PR-ji; varovalo lintanja, ki upošteva potlačitve                                                                                                                                                                             | Da, vključno z razcepi |
| `Merge integrity (changelog + generated skills)` | PR-ji, ki niso osnutki; sinhronizacija dnevnika sprememb in ustvarjenih veščin                                                                                                                                                     | Da, vključno z razcepi |

#### Poročilo o pozabljenih testih sorojencev

`npm run check:forgotten-sibling-tests` ponovno uporabi razreševalnik uvozov, ki stoji za zemljevidom vpliva testov.
Za vsak spremenjeni produkcijski modul poroča o determinističnih verigah
`changed module/symbol -> static consumer -> candidate sibling test`, kadar kandidatni
test ni v diffu pull requesta. Povzetek Markdown in rezultat JSON se ohranita kot artefakt
delovnega toka `forgotten-sibling-tests` za kalibracijo pred kakršno koli uvedbo blokiranja.

Ponovni izvozi iz zbirnih modulov in dinamični uvozi so samo diagnostični podatki razreševanja; nikoli ne ustvarijo
blokirajoče ugotovitve. Pregledane izjeme so v
`config/quality/forgotten-sibling-allowlist.json`. Vsak vnos mora navesti porabnika in kandidatni
test, podati konkretno utemeljitev ter vključevati povezavo do težave ali pull requesta v GitHubu. Nepravilno oblikovani vnosi povzročijo neuspeh z zavrnitvijo. Izjeme ne morejo skriti izbrisanega kandidatnega testa ali diffa, ki doda `.skip`/`.todo`;
oslabljevanje trditev in drugo maskiranje ostajata v pristojnosti neodvisno blokirajočega
preverjanja `check:test-masking`.

### Opravilo: `lint`

Zažene se ob vsakem PR-ju v `main`. Ob neuspehu blokira združitev.

| Skript (`npm run ...`)            | Preverja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokira                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Različica Node.js je znotraj podprtega obsega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:cycles`                    | Ciklične uvoze v celotnem `src/` + `open-sse/` (na osnovi AST-ja, razrešene poti `paths` v tsconfigu). Samostojni zagon se konča z izhodno kodo 1, kadar obstaja katerikoli cikel (od različice #15281 je privzeto varen ob napaki), in izpiše SCC-je. `check:cycles:ratchet` (kar izvaja CI) blokira, ko število preseže omejitev `metrics.cycles` v `quality-baseline.json` — trenutno 14, `direction: down`, zato se lahko samo zmanjša (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da (ratchet)                               |
| `check:boundary`                  | Povezovanje `open-sse → src`: enolični uvozi iz datoteke v datoteko iz pogona v aplikacijo (`scripts/quality/measure-boundary.mjs`; seznam povezav je zaostanek za odpravo težav v jedru v4/razdelitvi modulov). Samostojni zagon ustvari svetovalno poročilo (enako kot `quality:boundary`). `check:boundary:ratchet` (kar izvaja CI, tudi v zanki ratchet hitrih preverjanj `quality.yml`) blokira, ko število preseže omejitev `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — začetna vrednost je izmerjenih 771, `direction: down`; `--update` jo lahko samo zniža; pri zahtevah za vključitev je relativna glede na osnovo (`--base-ref`, glejte spodaj)                                                                                                                                                                                                                                                                  | Da (ratchet)                               |
| `check:route-validation:t06`      | Sheme Zod so prisotne na vseh poteh (pravilnik ravni 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                         |
| `check:any-budget:t11`            | Število `@ts-expect-error // any` ne presega proračuna (catraca Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:provider-consistency`      | Vsak ponudnik v `providers.ts` ima ustrezen vnos v `providerRegistry.ts` (in obratno, znotraj seznama dovoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `check:model-lifecycle`           | Tri ročno vzdrževane usmerjevalne tabele ostajajo skladne s posnetkom življenjskega cikla (#11503), vključenim v repozitorij: `FITNESS_TABLE` (`taskFitness.ts`) ne ocenjuje nobenega umaknjenega ID-ja, ki bi ga lahko usmerjal `REGISTRY`; vsak cilj v `BUILT_IN_ALIASES` je prisoten v `REGISTRY` in odsoten iz posnetka umaknjenih ID-jev; vsak umaknjeni ID, ki je še vedno v `REGISTRY`, je posredovan ali naveden v `allowedRetiredInCatalog`; poleg tega se noben izvor ali cilj v `DEFAULT_DEGRADATION_MAP` ne pojavlja kot umaknjen v tem posnetku. To ne dokazuje, da model trenutno streže aktiven nadrejeni ponudnik. Deluje brez povezave – primerja se z datoteko `config/quality/model-lifecycle.json`, ki se ročno osveži z ukazom `npm run quality:refresh-model-lifecycle` (omrežje; ni vključeno v CI). `allowedRetiredInCatalog` je mehanizem postopnega zmanjševanja: vnos dodajte samo skupaj z zadevo za sledenje. | Da                                         |
| `check:fetch-targets`             | Vsak `fetch("/api/...")` v odjemalskem delu `src/` se razreši v dejanski `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                         |
| `check:deps`                      | Vse odvisnosti, ki jih je mogoče namestiti z `npm install`, v vseh datotekah `package.json` v repozitoriju so navedene v `dependency-allowlist.json`; novi nepinirani ali slopsquatted paketi so označeni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `audit:deps`                      | `npm audit` (korenski projekt + electron) – brez opozoril visoke ali kritične stopnje (prekriva se z osv `check:vuln-ratchet`; glejte seznam opravil Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:lockfile`                  | Celovitost datoteke `package-lock.json` — register https, zgoščevalne vrednosti celovitosti, brez preglasitev gostitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:licenses`                  | Seznam dovoljenih licenc SPDX za produkcijske odvisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:tracked-artifacts`         | Brez artefaktov gradnje / predanih simbolnih povezav `node_modules` (zažene se tudi v husky pre-commit; pre-push je namerno omejen — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                         |
| `check:ai-attribution`            | Brez zaključka `Co-Authored-By`, povezanega z umetno inteligenco oziroma botom, ali noge o ustvarjanju z umetno inteligenco v commitih PR-ja, naslovu ali telesu — strogo pravilo št. 16 (v zanki hitrih preverjanj `quality.yml` za PR→`release/**` — prebere tovor dogodka, zunaj PR-jev ne izvede ničesar — in v koraku, namenjenem samo PR-jem, v preverjanju lint `ci.yml` za PR→`main`; tudi v husky kavlju `commit-msg`; človeški soavtorji so dovoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Vsaka izključitev Vitesta navede sledilno težavo in se pojavi v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                         |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) ostanejo znotraj omejitve `cap`, testne datoteke (`*.test.ts(x)`) pa znotraj `testCap`; datoteke, zamrznjene v `file-size-baseline.json` (`frozen` / `testFrozen`), ne smejo preseči svoje zabeležene velikosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                         |
| `check:error-helper`              | Odzivi z napakami v izvajalnikih/obdelovalnikih uporabljajo `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo št. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `check:migration-numbering`       | Datoteke SQL za migracije so zaporedno oštevilčene, brez vrzeli ali dvojnikov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:public-creds`              | Brez dobesednih vrednosti OAuth `client_id`/`client_secret` ali spletnih ključev Firebase zunaj datoteke `publicCreds.ts` (strogo pravilo št. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `check:db-rules`                  | Brez neobdelanega SQL zunaj modulov v `src/lib/db/`; brez uvozov prek zbirnih modulov iz `localDb.ts` (strogi pravili št. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                         |
| `check:known-symbols`             | Izvajalniki ponudnikov, strategije usmerjanja in prevajalniki, registrirani v svojih odpremljevalnih tabelah, se ujemajo z datotekami na disku — brez osirotelih ali neprijavljenih simbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                         |
| `check:route-guard-membership`    | Vsaka pot, ki ustvari podrejeni proces, je razvrščena z `isLocalOnlyPath()` (strogi pravili št. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:test-discovery`            | Vsaka datoteka `*.test.ts` / `*.spec.ts` v repozitoriju je zbrana z vsaj enim izvajalnikom testov (ratchet: seznam osirotelih datotek v `test-discovery-baseline.json` se lahko samo skrajša)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:test-tla-order`            | Nobena datoteka `node:test` v mapi `tests/unit` ne registrira testa, doseže vrhnji `await` in nato registrira dodatne teste (#18045; ratchet: `test-tla-order-allowlist.json` se lahko samo skrajša)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:agent-skills-sync`         | Ustvarjeni artefakti agentovih veščin se ujemajo z izvornim katalogom (brez odstopanj)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Logotipi/sredstva ponudnikov imajo zabeležen vnos o izvoru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Konfiguracijske datoteke JSON je mogoče razčleniti in izpolnjujejo pravila za preverjanje repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | Prevajanje TypeScripta brez napak (opozorila so zgolj informativna)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                         |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmerjeno v prihodnost; številna obstoječa mesta klicev še vedno potrebujejo opombe tipov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Svetovalno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` omejen na `src/app/(dashboard)/**` (#7033) — kuriran seznam dovoljenih 27 datotek za `typecheck:core` ne vključuje nobenih nadzornih plošč TSX, `next build` pa tega prav tako nikoli ne preverja tipov (`next.config.mjs` nastavi `ignoreBuildErrors: true`), zato regresije osirotelih identifikatorjev tam (#6625/#6909) niso bile vidne CI-ju. Razlike se primerjajo z zamrznjeno osnovo števila napak po datotekah in kodah TS (`config/quality/dashboard-typecheck-baseline.json`, enak vzorec zastarelega uveljavljanja kot pri `check:known-symbols`) — vrata preverjanja zaprejo samo NOVE napake nad osnovnim številom; znižajte prag z `--update`, ko je predhodno obstoječa napaka odpravljena.                                                                                                                                                                                                                          | Da                                         |

### Posel: `quality-gate`

Zažene se po `test-coverage`. Ob neuspehu prepreči združitev.

| Skript                       | Preverja                                                                                                                                                                             | Blokiranje                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `quality:collect`            | Ustvari `quality-metrics.json` (število opozoril ESLint, pokritost iz združenega poročila shardov)                                                                                   | Da (predhodno koraku ratcheta) |
| `quality:ratchet`            | Nobena metrika v `quality-baseline.json` se ni poslabšala (opozorila ESLint ≤ osnova; pokritost ≥ osnova)                                                                            | Da                             |
| `check:duplication`          | Podvajanje kode (jscpd@4) ne presega osnove v `quality-baseline.json`                                                                                                                | Da                             |
| `check:complexity`           | Ciklomatska kompleksnost na ravni datotek ne presega omejitve (osnovni ESLint `complexity` + `max-lines-per-function`)                                                               | Da                             |
| `check:cognitive-complexity` | Ratchet kognitivne kompleksnosti (`eslint-plugin-sonarjs`) — ločen prehod ESLint; CI oba združi v en sam korak `check:complexity-ratchets`                                           | Da                             |
| `check:dead-code`            | Ratchet neuporabljenih izvozov / datotek (knip) se glede na osnovo ne poslabša                                                                                                       | Da                             |
| `check:compression-budget`   | Proračun primerjalnega preizkusa stiskanja — minimalni prihranki žetonov po pogonih se ne smejo poslabšati                                                                           | Da                             |
| `check:type-coverage`        | Ratchet odstotka tipiziranosti (`type-coverage`) se ne poslabša; v veliki meri vključuje `typecheck:noimplicit:core`                                                                 | Da                             |
| `check:codeql-ratchet`       | Število odprtih opozoril CodeQL se ne poslabša (bere prek `gh api`; brez žetona se kontrolirano preskoči) — pogostost osveževanja in ročni sprožilec: glejte »Ratchet CodeQL« spodaj | Da                             |

### Posel: `quality-extended`

Celoten posel je svetovalen (`continue-on-error: true`). Ratcheti, ki temeljijo na npm, se izvajajo
dejansko; zunanji pregledovalniki se namestijo prek `gh release download` in se samodejno preskočijo (izhod 0),
če binarna datoteka še ni na voljo.

| Skript                   | Preverja                                                                                                                                                                                                                                                       | Blokiranje                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Ni krožnih odvisnosti (dpdm)                                                                                                                                                                                                                                   | **Svetovalno**                                   |
| `check:bundle-size`      | Velikost svežnja ne presega omejitve                                                                                                                                                                                                                           | **Svetovalno**                                   |
| `check:secrets`          | Pregledovanje skrivnosti (gitleaks) — preskoči, če binarna datoteka ni na voljo                                                                                                                                                                                | **Svetovalno**                                   |
| `check:vuln-ratchet`     | Ranljivosti odvisnosti (osv-scanner) se ne poslabšajo — preskoči, če binarna datoteka ni na voljo                                                                                                                                                              | **Svetovalno**                                   |
| `check:workflows`        | Preverjanje delovnih tokov (actionlint + zizmor); manjkajoči/pokvarjeni pregledovalniki, neveljavna poročila ali manjkajoča osnovna vrednost ratcheta povzročijo napako INCOMPLETE. Veljavne ugotovitve upoštevajo izbrano strogo/svetovalno politiko ratcheta | Izvajanje zahtevano; ratchet zizmor v CI blokira |
| `check:openapi-breaking` | Prelomne spremembe javnega pogodbenega vmesnika API (`openapi.yaml`) glede na osnovno vejo (oasdiff) — ustvari `openapiBreaking=N`; preskoči, če oasdiff ni na voljo ali osnovne specifikacije ni mogoče razrešiti                                             | **Svetovalno**                                   |

### Posel: `docs-sync-strict`

Zažene se pri vsakem PR v `main`. Ob neuspehu prepreči združitev.

| Skript                         | Preverja                                                                                                                                                                                         | Blokira                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | Metaprehod, ki zaporedno zažene 6 spodnjih podprehodov                                                                                                                                           | Da                        |
| ↳ `check:docs-sync`            | Skladnost različic v CHANGELOG / OpenAPI / llm.txt                                                                                                                                               | Da                        |
| ↳ `check:docs-counts`          | Števci v proznem besedilu (število ponudnikov, število migracij itd.) so znotraj okna ratcheta glede na dejanske števce                                                                          | Da                        |
| ↳ `check:env-doc-sync`         | Vsaka spremenljivka okolja v `.env.example` je dokumentirana v tabeli dokumentacije in obratno                                                                                                   | Da                        |
| ↳ `check:deprecated-versions`  | V dokumentaciji ni nizov zastarelih različic                                                                                                                                                     | Da                        |
| ↳ `check:doc-links`            | Notranje povezave Markdown v dokumentaciji vodijo do dejanskih datotek (oblika `[text]`/`(path)`)                                                                                                | Da                        |
| ↳ `check:fabricated-docs`      | Poti, spremenljivke okolja, ukazi CLI, imena hookov in poti datotek, navedeni v dokumentaciji, obstajajo v zbirki kode. Strogi prehod z `--strict`; brez zastavice neuspeh ne prekine izvajanja. | Da (prek `--strict` v CI) |
| `check:cli-i18n`               | Nizi ukazov CLI so prisotni v vseh datotekah z lokalizacijami i18n                                                                                                                               | Da                        |
| `check:openapi-coverage`       | Specifikacija OpenAPI zajema vsaj ratchetirano spodnjo mejo dejanskih poti                                                                                                                       | Da                        |
| `check:openapi-security-tiers` | Opombe varnostnih ravni v `openapi.yaml` so skladne s klasifikacijami v `routeGuard.ts`                                                                                                          | **Svetovalno**            |
| `check:openapi-routes`         | Vsaka pot v `openapi.yaml` se razreši v dejanski `route.ts` (preprečevanje halucinacij)                                                                                                          | Da                        |
| `check:docs-symbols`           | Vsaka referenca `/api/...` v `docs/**/*.md` se razreši v dejanski `route.ts` (preprečevanje halucinacij)                                                                                         | Da                        |
| `i18n translation drift`       | Neprevedeni ključi v datotekah z lokalizacijami i18n — samo opozorilo                                                                                                                            | **Svetovalno**            |

Dvanajst datotek README SVG v `docs/diagrams/` je ustvarjenih (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` jih znova ustvari vse). Vsaka ima test enote s primerjavo bajtov
(`tests/unit/docs/readme-*-svg.test.ts`, opravilo `test-unit`), ki spodleti, ko je
predana datoteka zastarela, `check:docs-counts` pa bere kanonična števila iz njihovih vozlišč `<text>` — zato korak orisovanja ohrani vsak orisani niz v datoteki kot neviden `<text>`. Preverjanje kanoničnih števil SVG bere datoteke, navedene v
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, pa tudi `public/images/tier-flow-dark.svg` in `tier-flow-light.svg`;
trditve free-forever, catalog-entry, recurring-pool in scoring-factors prav tako berejo
`promise-pillars.svg`, `free-tier-budget.svg` in `strategies-grid.svg`. `free-tier-budget.svg`
črpa svoje številke iz aktivnega nalagalnika kataloga, zato sprememba v `FREE_MODEL_BUDGETS` ali prikaznega imena ponudnika označi CI kot neuspešen, dokler ta datoteka ni znova ustvarjena.

### Opravilo: `i18n-ui-coverage`

| Skript                               | Preverja                                                                                                                                                                                    | Blokira        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (v vrstici) | Pokritost ključev UI i18n je ≥ 65 %                                                                                                                                                         | Da             |
| `check-ui-value-drift` (v vrstici)   | Prepisana angleška **vrednost** ne pusti za seboj zastarelega prevoda                                                                                                                       | Da             |
| `check-new-key-coverage` (v vrstici) | **Nov** angleški ključ je preveden v vsaki lokalizaciji — oznaka `__MISSING__:` se zavrne                                                                                                   | Da             |
| `check-translation-ratio`            | Delež dejanskih prevodov na lokalizacijo (enako angleščini / ograda / manjkajoči vnosi zunaj seznama dovoljenih) ne sme preseči `config/quality/i18n-translation-baseline.json` + ohlapnost | **Svetovalno** |

Potreben je `fetch-depth: 0` — prehod za zaznavanje sprememb vrednosti primerja `en.json` z osnovo združevanja.

#### `check-ui-value-drift` — prehod za zastarele prevode

Zazna edino regresijo i18n, ki je druga strukturna preverjanja ne morejo zaznati: angleška vrednost
se prepiše, prevodi, izpeljani iz _prejšnje_ angleščine, pa ostanejo nespremenjeni, zato
neangleško govoreči uporabniki še naprej samozavestno berejo zdaj napačno besedilo.

To se je dejansko zgodilo v produkciji. `oauthModal.googleOAuthWarning` je bil prepisan, ko je bil dodan
pomočnik za prijavo Antigravity (#5203); **39 od 43 jezikovnih različic** je ohranilo besedilo, ki je operaterjem naročalo, naj »kopirajo
celoten URL in ga prilepijo spodaj« — postopek, ki ga za tega ponudnika ni mogoče dokončati. To je ostalo neopaženo do #8463, ker:

- `sync-ui-keys` dopolni samo ključe, ki so **manjkajoči**, nikoli tistih, ki so **zastareli**;
- `check-ui-keys-coverage` šteje **prisotnost** ključa, zato se zastarel prevod šteje kot pokrit;
- `check-translation-drift` spremlja dokumentacijske zrcalne kopije `docs/i18n/<locale>/**.md` —
  nikoli ne bere `src/i18n/messages/*.json`. Od ponovne sinhronizacije 2026-09 blokira v opravilu `docs-sync-strict`: uredite jedrni dokument → `npm run i18n:run -- --files=<doc>` (na ravni razdelka, poceni).

**Upošteva razlike, ne osnovne različice.** Primerja `en.json` v izhodišču združitve z
delovnim drevesom; za vsak ključ, katerega angleška vrednost se je spremenila, je vsak jezik, ki še vedno vsebuje
nespremenjen prevod, zastarel. To namerno **zamrzne obstoječi dolg** — razlika ne more razkriti, iz katere stare angleške vrednosti je izhajal dolgotrajni prevod, zato preverjanje presoja samo tisto, česar se dotika trenutna sprememba. Druga možnost (osnovna različica z zgoščeno vrednostjo za vsak ključ) bi zahtevala približno 600 KB veliko ustvarjeno datoteko, kar je trikrat več od največje obstoječe osnovne različice, ter bi povzročala spremembe pri vsakem PR-ju za i18n.

To lahko izpolnite na dva načina:

1. posodobite zadevne prevode ali
2. nastavite jih na `__MISSING__:<new english>` — izvajalno okolje bo nato uporabilo popravljeno angleščino
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ključ pa bo uvrščen v čakalno vrsto za prevod.

Če se je **pomen** niza spremenil, raje **preimenujte ključ**: nov ključ ne more podedovati
zastarelega prevoda. To je vzorec, uporabljen pri #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Konča se s kodo 0 in `SKIP reason=base-unresolved`, ko osnovnega kataloga ni mogoče prebrati (plitva
klonirana kopija brez osnovne reference), podobno kot `check-openapi-breaking`.

### Opravilo: `i18n`

Celotna matrika preverjanja i18n (eno opravilo za vsak jezik). Celotno opravilo je neobvezno.

| Script                          | Validates                            | Blocking                                                      |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `validate_translation.py quick` | Popolnost prevoda za posamezni jezik | **Neobvezno** (`continue-on-error: true` za celotno opravilo) |

### Opravilo: `pr-test-policy`

Zažene se samo pri zahtevah za vključitev sprememb.

| Script                 | Validates                                                                                                                                             | Blocking |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR-ji, ki spreminjajo produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/`, morajo vključevati ali posodobiti teste (strogo pravilo št. 8) | Da       |
| `check:test-masking`   | Spremenjene testne datoteke ne zmanjšajo skupnega števila trditev in ne dodajo tavtologij `assert.ok(true)`                                           | Da       |
| `check:pr-evidence`    | Telo PR-ja navaja dokaze iz testov/VPS za spremembo (avtomatizira strogo pravilo št. 18 z iskanjem po besedilu PR-ja — krhko, glejte zaostanke)       | Da       |

### Opravilo: `test-vitest`

Zažene se po `build`. Ob neuspehu blokira združitev.

| Suite            | Validates                                                               | Blocking                                                                                                           |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Strežnik MCP (110 orodij), autoCombo, predpomnilnik — izvajalnik vitest | Da                                                                                                                 |
| `test:vitest:ui` | Testi komponent uporabniškega vmesnika — izvajalnik vitest              | **Blokira** — obstoječe napake so izrecno izključene v `vitest.config.ts`; nove napake povzročijo neuspeh opravila |

### Nočni delovni tokovi (načrtovani, neobvezni)

Ti se zaženejo po urniku cron (in prek `workflow_dispatch`), nikoli pri zahtevah za vključitev sprememb. Vsi so neobvezni.

| Potek dela             | Preverja                                                                                                                                                                 | Blokiranje     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | preizkuse lastnosti fast-check z naključnim semenom + velikim številom zagonov                                                                                           | **Svetovalno** |
| `nightly-resilience`   | prag rasti kopice, vbrizgavanje napak s kaosom, obremenitveno testiranje in testiranje vzdržljivosti s k6                                                                | **Svetovalno** |
| `nightly-llm-security` | zaščito pred vbrizgavanjem promptfoo (način blokiranja) + sonde garak (preskočeno brez skrivnosti ponudnika)                                                             | **Svetovalno** |
| `nightly-schemathesis` | fuzzing pogodbe OpenAPI (schemathesis) proti delujočemu OmniRoute z uporabo `docs/openapi.yaml` — razkrije kršitve specifikacije / neobravnavane napake 500 (Faza 8 B.4) | **Svetovalno** |
| `nightly-mutation`     | rezultat mutacijskega testiranja Stryker v hitrem sklopu enotnih testov — preživeli mutanti razkrijejo šibke trditve                                                     | **Svetovalno** |
| `nightly-compat`       | matriko združljivosti pogona Node v podprtih obsegih `engines.node`                                                                                                      | **Svetovalno** |

Osnove zmogljivosti (kopica, TTFB, čas gradnje) se beležijo, vendar niso pogoj za uspeh: glejte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
