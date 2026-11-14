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

## Popis in izvedbeni profili vrat

### Sprejem kandidatov

Vsak od delovnih tokov CI in Quality Gates izda stabilno razsodbo: `Gate / CI` in `Gate / Quality`. Njihov pravilnik o sprejemanju v različicah našteva vsako predhodno delovno mesto kot zahtevano ali svetovalno. Ustrezno zahtevano opravilo mora uspeti: manjkajoči, preklicani, preskočeni, čakajoči in neznani rezultati ne morejo vzpostaviti PASS. Zaradi veljavne klasifikacije samo za dokumente ali samo za katalog lahko kodni pas postane neuporaben; osnutek PR ni sprejet kandidat. Oznaka `hotfix` ne opusti dokazov.

Oba delovna toka zajemata PRs v veje main/release, potiske v `main`, ročno odpošiljanje in dogodke združevanja skupin. Push, dispatch in merge-group izvaja celotno izbiro. Potiski v `release/**` jih ne zaženejo (2026-10-18): vsaka sprememba je že zagnala matriko na svojem PR in združena kombinacija je naloga Release-Greena (`docs/ops/RUNNER_BOX.md` → Hosted lane). Razcepi in skupine za združevanje uporabljajo gostujoče izvajalce za opravila, ki sicer izbirajo samogostiteljske izvajalce; pred uvedbo je treba preveriti zadostno gostujočo zmogljivost.

Navadna PR izvaja hitro izbiro. Proga `full-code` in `full-code-e2e` politike sprejema (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, odjemalci ekosistema in protokola) se izvajata samo na osnutku čakalne vrste Mergify ali v celotnem zagonu: `gh workflow run ci.yml --ref <branch>`.

Vsako potrdilo JSON identificira odjavljeni SHA, zagon in poskus delovnega toka. CLI zavrne neujemanje checkout/event SHA. Preizkusi delovnega toka vežejo članstvo v pravilniku na seznam `needs` opravila sodbe, tako da nov ali odstranjen pas ne more tiho izginiti. Potrdila pokrivajo lasten potek dela, ne pa objave, uvajanja ali notranjosti obstoječega svetovalnega skenerja. Aktiviranje obeh imen preverjanja v pravilih veje je ločena administrativna sprememba; dodajanje teh opravil samo po sebi ne ščiti podružnice.

### Združi čakalno vrsto

Oznaka `queue` pošlje PR v čakalno vrsto Mergify (`.mergify.yml`). Mergify odpre osnutek PR na veji `mergify/merge-queue/`, CI tam zažene celotno izbiro in izvirni PR se združi, ko `Gate / CI`, `Gate / Quality` in `Merge integrity (changelog + generated skills)` prehajajo.

Mergify zapiše svoj povzetek čakalne vrste v opis osnutka, urejajo pa ga lahko tudi druge aplikacije. Dogodek `pull_request` `edited` na takem osnutku prevzame lastno sočasno skupino (`-queue-edit-<run_id>`), tako da ne more preklicati dejanskega izvajanja osnutka in preskoči vrata in matriko. Samo `Merge integrity` še deluje. Preskočeno opravilo vrat nosi drugačno ime preverjanja, ker Mergify prebere preskočeno `Gate / CI` kot neuspelo preverjanje in odstrani PR iz čakalne vrste.

Po odstranitvi iz čakalne vrste potisni element PR ne postavi vedno znova v čakalno vrsto. Komentirajte `@mergifyio queue` o tem.

### Zadržani dokazi v sprejemnem reduktorju

`scripts/quality/validate-release-acceptance.mjs` zmanjša predloženi načrt in njegove manifeste; ne dokazuje, da načrt zajema celoten cevovod za sprostitev. Njegova poročila izrecno določajo `releaseAcceptance: false`, tudi če je ta načrt `VERIFIED`. Delovni tok `release-acceptance.yml` še vedno uporablja senčne napeljave, ne pravih potrdil o gradnji, pakiranju, zagonu ali napredovanju.

CLI zahteva, da `--evidence-root` preveri zadržane dokaze. Datoteke so razrešene kot `<evidence-root>/<artifact_id>/<member>` in zgoščene kot SHA-256. Zapis PASS brez dokazov, manjkajoča ali spremenjena datoteka, nevarna pot ali simbolna povezava preprečuje preverjanje. Manjkajoče datoteke niso enakovredne praznim uspešnim dnevnikom. Obstoječa preverjanja SHA/run/attempt ostajajo neodvisna: ujemajoči se bajti ne morejo rešiti zastarelega računa. Celovitost datoteke ni dokaz pristnosti izvajanja ali promocije artefaktov.

### Inventar statičnega skeniranja

Popis vzdevkov npm z različicami in članstvo v statičnem skeniranju sta v živo v `config/quality/gate-manifest.json`. Zaženite `npm run check:gate-manifest`, da preverite imena skriptov in natančne ukaze glede na `package.json`; dodajanja, odstranjevanja in premikanje ukazov ne uspejo tako pri lokalnem kavlju kot pri opravilih spreminjanja klasifikacije v CI. Vzdevek ni opravilo delovnega toka, primerek matrike ali testni primer: ta števila ne smejo biti predstavljena kot zamenljiva.

Uporabite `npm run quality:scan -- --list` ali `npm run quality:scan:fast -- --list` da pregledate izbrane vzdevke, ne da bi jih izvršili. Izvajalec prikliče vstopno točko npm, tako da se njegov čas izvajanja (vključno Bun kjer je konfiguriran) ohrani. Manifest beleži vzdevke zunaj teh profilov kot ločeno klicane, ukazi za vzdrževanje pa so prepovedani v profilih pregledovanja samo za branje.

Ti profili pokrivajo samo statično skeniranje. Ne potrjujejo preskusov izdelkov, pokritosti, embalaže, zunanjih pregledov ali kandidatove popolne izdaje. Sprejem poteka dela uporablja povezana `config/quality/admission-policy.json` in `scripts/quality/admission-verdict.mjs`. Profili opazovalcev izdaje ostanejo ločeni; neodvisno pregledati svoje veljavne čeke in potrdila. Celotni statični ukazi opazovalca so deklarirani v `config/quality/release-green-static-profile.json`, vključno `audit:deps`, izbiro testa mutacije in preverjanja prevoda. Nalagalnik preveri ukaze npm glede na package.json in modelirane deklaracije CI/Quality ; zavrača odmik namesto izvajanja žetonov lupine kot argumentov. Zahtevan izhod SKIP/INCOMPLETE optičnega bralnika ne more vzpostaviti PASS. Profil beleži svoje zunanje izključitve in ne nadomešča gostujoče pokritosti, testnih matrik, paketov ali dokazov o uvedbi. Spodnji popis proze je referenca in ne dokaz, da so vrata dejansko tekla.

Skripti živijo pod `scripts/check/` (policy gates) in `scripts/quality/` (ratchet engine). Vir resnice CI je `.github/workflows/ci.yml`.

### Izdaja hitre poti PR (`quality.yml`)

`.github/workflows/quality.yml` dopolnjuje CI na main/release PRs, potiska v `main`, pošilja in spaja skupine. PRs uporablja hitra preverjanja s filtriranjem poti. Trajno onemogočena podvojena zgradba je bila odstranjena; pravi build/package/boot pregledi ostanejo v CI. Zbirka enot in vitest delujeta samo v CI (`Unit Tests (N/8)` in `Vitest`).

| delo                                             | Področje uporabe                                                                                                                                     | Blokiranje              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs in docs-all                                                                                                             | ja                      |
| `Fast Quality Gates`                             | koda PRs; statična preverjanja, preverjanje tipa, preverjanje tipa armaturne plošče, testi prizadetih enot, pozabljeni sorodniški testi (svetovalno) |
| `No new ESLint warnings`                         | koda PRs; zaščita proti vlaknom, ki se zaveda zatiranja                                                                                              | Da, vključno z vilicami |
| `Merge integrity (changelog + generated skills)` | Neosnutek PRs; dnevnik sprememb in ustvarjena sinhronizacija spretnosti                                                                              | Da, vključno z vilicami |

#### Poročilo o testih pozabljenega brata in sestre

`npm run check:forgotten-sibling-tests` deluje kot svetovalni korak za `Fast Quality Gates` in ponovno uporabi razreševalnik uvoza za zemljevidom vpliva preskusa. Za vsak spremenjen produkcijski modul poroča o determinističnih verigah `changed module/symbol -> static consumer -> candidate sibling test`, ko test kandidata ni v razliki zahteve po vleku. Povzetek Markdown in rezultat JSON se ohranita kot artefakt delovnega toka `forgotten-sibling-tests` za kalibracijo pred kakršno koli uvedbo blokiranja.

Ponovni izvozi sodov in dinamični uvozi so samo diagnostika ločljivosti; nikoli ne ustvarijo blokirajoče ugotovitve. Pregledane izjeme so v živo v `config/quality/forgotten-sibling-allowlist.json`. Vsak vnos mora poimenovati test potrošnika in kandidata, navesti posebno utemeljitev in povezati težavo GitHub ali zahtevo za vlečenje. Napačno oblikovani vnosi se ne zaprejo. Izjeme ne morejo zavrniti izbrisanega kandidatnega testa ali razlike, ki dodaja `.skip`/`.todo`; oslabitev trditve in drugo maskiranje ostanejo v lasti neodvisno blokirajočih vrat `check:test-masking`.

### Delovno mesto: `lint`

Deluje na vsakem PR do `main`. Bloki se združijo ob napaki.

| Skript (`npm run ...`)            | Potrjuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokiranje                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Različica Node.js je znotraj podprtega obsega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ja                                         |
| `check:cycles`                    | Krožni uvozi v celotnem `src/` + `open-sse/` (na osnovi AST, razrešen tsconfig `paths` ). Bare zapusti 1, kadar koli obstaja kakršen koli cikel (neuspešno zaprt od #15281) in navede SCCs. `check:cycles:ratchet` (kaj teče CI ) blokira, ko štetje preseže zgornjo mejo `metrics.cycles` v `quality-baseline.json` — trenutno 14, `direction: down`, tako da lahko le pade (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da (raglja)                                |
| `check:boundary`                  | spajanje `open-sse → src` : edinstveni uvozi med datotekami iz mehanizma v aplikacijo (`scripts/quality/measure-boundary.mjs`; robni seznam je zaostanek popravkov core/module-split v4). Golo svetovalno poročilo = (enako kot `quality:boundary`). `check:boundary:ratchet` (kar teče CI, tudi v zanki z ragljo z hitrimi vrati `quality.yml` ) blokira, ko štetje preseže zgornjo mejo `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — zasejano pri izmerjenih 771, `direction: down`; `--update` samo zniža; osnovno relativno na PRs (`--base-ref`, glej spodaj)                                                                                                                                                                                                                                                                                                                                                                       | Da (raglja)                                |
| `check:route-validation:t06`      | sheme Zod prisotne na vseh poteh (pravilnik stopnje 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ja                                         |
| `check:any-budget:t11`            | število `@ts-expect-error // any` ne presega proračuna (stopnja 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:provider-consistency`      | Vsak ponudnik v `providers.ts` ima ustrezen vnos v `providerRegistry.ts` (in obratno, znotraj seznama dovoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ja                                         |
| `check:model-lifecycle`           | Tri ročno vzdrževane usmerjevalne tabele ostajajo skladne s prijavljenim posnetkom življenjskega cikla (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne zabeleži nobenega odsluženega ID-ja, ki bi ga `REGISTRY` lahko usmerjal; vsak cilj `BUILT_IN_ALIASES` je prisoten v `REGISTRY` in ga ni na posnetku upokojenega ID-ja; vsaka upokojena id, ki je še vedno v `REGISTRY` je posredovana ali navedena v `allowedRetiredInCatalog`; in v tem posnetku noben izvor ali cilj `DEFAULT_DEGRADATION_MAP` ni videti umaknjen. To ne dokazuje, da model trenutno streže v živo navzgor. Offline — se primerja z `config/quality/model-lifecycle.json`, ročno osveženim z `npm run quality:refresh-model-lifecycle` (omrežje; ni povezano z CI). `allowedRetiredInCatalog` je zaskočna raglja: dodajte vnos samo s težavo sledenja.                                                                                                                        | ja                                         |
| `check:fetch-targets`             | Vsak `fetch("/api/...")` v `src/` na strani odjemalca se razreši v pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ja                                         |
| `check:deps`                      | Vsi depi `npm install` -able v vsakem `package.json` v repoju so v `dependency-allowlist.json`; označeni novi odpeti ali pokvarjeni paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ja                                         |
| `audit:deps`                      | npm revizija vseh petih neodvisnih zaklepnih datotek (root, Electron, OpenCode vtičniki v1/v2 in ponudnik). Blok kritičnih nasvetov; visoka opozorila ostajajo vidna opozorila. revizije Missing/failed so INCOMPLETE in blok; zgoščene vrednosti in poročila zaklepanja na obseg se ohranijo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ja                                         |
| `check:lockfile`                  | `package-lock.json` integriteta — https register, zgoščene vrednosti celovitosti, brez preglasitev gostitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ja                                         |
| `check:licenses`                  | seznam dovoljenih licenc SPDX za proizvodne odvisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ja                                         |
| `check:tracked-artifacts`         | Brez gradbenih artefaktov/dodeljenih simbolnih povezav `node_modules` (teče tudi v husky vnaprejšnji potrditvi; predhodni pritisk je namenoma lahek — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ja                                         |
| `check:ai-attribution`            | Brez napovednika AI/bot `Co-Authored-By` ali noge generacije AI v PR commits, naslovu ali telesu — Hard Rule #16 (v zanki hitrih vrat `quality.yml` za PR→ `release/**` — prebere obremenitev dogodka, brez izklopa PRs — in korak samo za PR v `ci.yml` lint za PR→ `main`; tudi husky `commit-msg` hook; dovoljeni človeški soavtorji #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Vsaka izključitev Vitest poimenuje težavo s sledenjem in se pojavi v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ja                                         |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) ostanejo znotraj `cap`, testne datoteke (`*.test.ts(x)`) pa znotraj `testCap`; datoteke, zamrznjene v `file-size-baseline.json` (`frozen` / `testFrozen`), ne smejo preseči zabeležene velikosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:error-helper`              | Odgovori na napake v executors/handlers uporabljajo `buildErrorBody()` / `sanitizeErrorMessage()` (trdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ja                                         |
| `check:migration-numbering`       | Datoteke SQL za selitev so zaporedno oštevilčene, brez vrzeli ali dvojnikov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:public-creds`              | Brez dobesednih ključev OAuth `client_id`/`client_secret` ali Firebase Web zunaj `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ja                                         |
| `check:db-rules`                  | Brez surovega SQL zunaj modulov `src/lib/db/` ; brez barrel-imports iz `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ja                                         |
| `check:known-symbols`             | Izvajalci ponudnika, strategije usmerjanja in prevajalci, registrirani v njihovih odpremnih tabelah, se ujemajo z datotekami na disku — brez osirotelih ali neprijavljenih simbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ja                                         |
| `check:route-guard-membership`    | Vsaka pot, ki ustvari podrejeni proces, je razvrščena po `isLocalOnlyPath()` (trda pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ja                                         |
| `check:test-discovery`            | Vsako datoteko `*.test.ts` / `*.spec.ts` v repoju zbere vsaj en preskusni izvajalec (ratchet: seznam sirot v `test-discovery-baseline.json` se lahko samo skrči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ja                                         |
| `check:test-tla-order`            | Nobena datoteka `node:test` pod `tests/unit` ne registrira testa, zadene `await` najvišje ravni, nato registrira več (#18045; ratchet: `test-tla-order-allowlist.json` se lahko samo skrči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:agent-skills-sync`         | Ustvarjeni artefakti spretnosti agenta se ujemajo z izvornim katalogom (brez premikanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Ponudnik logos/assets nosi zabeležen vnos porekla                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | konfiguracijske datoteke JSON razčlenjujejo in izpolnjujejo pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | prevajanje TypeScript brez napak (samo svetovalna opozorila)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ja                                         |
| `typecheck:noimplicit:core`       | Stroga `noImplicitAny` — usmerjenost v prihodnost; številna že obstoječa spletna mesta za klice še vedno potrebujejo opombe                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Svetovalni** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obsega `src/app/(dashboard)/**` (#7033) — `typecheck:core`-jev kuriran seznam dovoljenih s 27 datotekami ne vključuje nobene nadzorne plošče TSX in `next build` je tudi nikoli ne preveri (`next.config.mjs` nastavi `ignoreBuildErrors: true`), zato so bile regresije osirotelega identifikatorja tam (#6625/#6909) nevidne za CI. Razlikuje glede na zamrznjeno osnovno linijo števila per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti vzorec zastarelega uveljavljanja kot `check:known-symbols`) — le napake NEW ki presegajo osnovno linijo števila, ne uspejo; ratchet navzdol z `--update`, ko je že obstoječa napaka odpravljena.                                                                                                                                                                                                                                                                       | ja                                         |
| `check:build-typecheck`           | Preverjanje vrste produkcije celotne aplikacije prek `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinskega seznama dovoljenih 27 datotek `typecheck:core` in vrat nadzorne plošče ne pokrivajo. Razlike proti `config/quality/build-typecheck-baseline.json`; novo ali povišano število na (datoteko, kodo) ne uspe, nižje število vas zahteva, da povečate. `--update` zavrne, medtem ko zagon vsebuje nov ali dvignjen par, razen če je predan `--force-regressions`, in zavrne novo utišano datoteko, razen če je predan `--force-nocheck`, tako da sta razširitev osnovne črte, da postane zelena, in odobritev trajne tišine dve ločeni namerni dejanji. Goli `--force` je zavrnjen. Prav tako skenira obseg gradnje za `@ts-nocheck` proti `config/quality/ts-nocheck-baseline.json`, ker datoteka, ki ga uporablja, ne poroča o nobeni diagnostiki in bi bila sicer nevidna za vsa vrata. | ja                                         |

#### Dva programa za preverjanje tipov odgovarjata različno

`typecheck:core` in `check:build-typecheck` prevajata različna programa pod različnimi možnostmi in ista datoteka je lahko v enem čista, v drugem pa polna napak.

`tsconfig.build.json` nastavi `"strict": false`, zato je `noImplicitAny` izklopljen. Osnovna konfiguracija sestavi izbran seznam dovoljenih 27 datotek s strožjimi možnostmi in sledi grafu uvoza vsakega vnosa, tako da so datoteke, ki se nikoli ne pojavijo v programu za gradnjo, tam še vedno preverjene.

Posledica je pomembna pri presoji, ali je datoteka vtipkana:** zero diagnostika pod `check:build-typecheck` ne pomeni nič** . Odstranjevanje `@ts-nocheck` iz 26 datotek je pokazalo, da jih je 23 čistih v programu za gradnjo; šestnajst od teh je pokazalo približno 120 implicitnih napak v strogem. Preverite oboje, preden datoteko označite za čisto.

### Delovno mesto: `quality-gate`

Teče po `test-coverage`. Bloki se združijo ob napaki.

| Skripta                      | Potrjuje                                                                                                                                                              | Blokiranje       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `quality:collect`            | Oddaja `quality-metrics.json` (število opozoril ESLint, pokritost iz združenega poročila o delcih)                                                                    | Da (pred ragljo) |
| `quality:ratchet`            | Vsaka metrika v `quality-baseline.json` ni nazadovala (ESLint opozorila ≤ baseline; pokritost ≥ baseline)                                                             | ja               |
| `check:duplication`          | Podvajanje kode (jscpd@4) ne presega osnovne vrednosti v `quality-baseline.json`                                                                                      | ja               |
| `check:complexity`           | Ciklopmatska kompleksnost na ravni datoteke ne presega zgornje meje (jedro ESLint `complexity` + `max-lines-per-function`)                                            | ja               |
| `check:cognitive-complexity` | Ratchet kognitivne kompleksnosti (`eslint-plugin-sonarjs`) — ločen prehod ESLint ; CI zažene oba združena kot en sam korak `check:complexity-ratchets`                | ja               |
| `check:dead-code`            | Neuporabljeni izvozi/datoteke Ratchet (knip) se ne zmanjšajo glede na osnovno vrednost                                                                                | ja               |
| `check:compression-budget`   | Kompresijska primerjalna vrednost proračuna — na mehanske vrednosti prihranka žetonov ne sme nazadovati                                                               | ja               |
| `check:type-coverage`        | Odstotno tipizirana raglja (`type-coverage`) ne nazaduje; v veliki meri vključuje `typecheck:noimplicit:core`                                                         | ja               |
| `check:codeql-ratchet`       | Odprto število opozoril CodeQL se ne zmanjša (bere prek `gh api`; graceful-skip brez žetona) kadenca osveževanja — in ročni sprožilec: spodaj glejte "CodeQL ratchet" | ja               |

### Delovno mesto: `quality-extended`

Celotno delo je svetovalno (`continue-on-error: true`). Raglje, ki temeljijo na npm, delujejo resnično; zunanji skenerji se namestijo prek `gh release download` in samopreskočijo (izhod 0), ko binarne datoteke še ni.

| Skripta                  | Potrjuje                                                                                                                                                                                                                 | Blokiranje                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `check:circular-deps`    | Brez krožnih odvisnosti (dpdm)                                                                                                                                                                                           | **Svetovalni**                                  |
| `check:bundle-size`      | Velikost svežnja ne presega zgornje meje                                                                                                                                                                                 | **Svetovalni**                                  |
| `check:secrets`          | Skrivno skeniranje (gitleaks) — preskoči, če binarno ni                                                                                                                                                                  | **Svetovalni**                                  |
| `check:vuln-ratchet`     | Ranljivosti odvisnosti (osv-skener) se ne poslabšajo — `--ratchet` ne uspe kot INCOMPLETE (izhod 2), če ni izmerjeno                                                                                                     | **Svetovalni**                                  |
| `check:workflows`        | Potek dela lint (actionlint + zizmor); missing/broken skenerji, neveljavna poročila ali manjkajoča osnovna linija zaskoka ne uspejo kot INCOMPLETE. Veljavne ugotovitve sledijo izbrani politiki strict/advisory/ratchet | Zahtevana izvedba; zizmor zaskočna blokada v CI |
| `check:openapi-breaking` | Javna pogodba API proti zavezam pripetih dogodkov (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); zahtevana meritev ne zapre                                                     | **Blokiranje z --ratchet**                      |

### Delovno mesto: `docs-sync-strict`

Deluje na vsakem PR do `main`. Bloki se združijo ob napaki.

| Skripta                        | Potrjuje                                                                                                                                                       | Blokiranje                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Meta-vrata, ki vodijo 6 spodnjih pod-vrat zaporedoma                                                                                                           | ja                        |
| ↳ `check:docs-sync`            | doslednost različice CHANGELOG / OpenAPI / llm.txt                                                                                                             | ja                        |
| ↳ `check:docs-counts`          | Štetje v prozi (število ponudnikov, število selitev itd.) je v okvirju dejanskega števila                                                                      | ja                        |
| ↳ `check:env-doc-sync`         | Vsaka env var v `.env.example` je dokumentirana v tabeli dokumentov in obratno                                                                                 | ja                        |
| ↳ `check:deprecated-versions`  | V dokumentih ni nizov zastarele različice                                                                                                                      | ja                        |
| ↳ `check:doc-links`            | Notranje označevalne povezave v dokumentih razrešijo prave datoteke (obrazec `[text]`/`(path)` )                                                               | ja                        |
| ↳ `check:fabricated-docs`      | Poti, env vars, ukazi CLI, imena kavljev in poti datotek, navedene v dokumentih, obstajajo v kodni bazi. Trda vrata prek `--strict`; mehka napaka brez oznake. | Da (prek `--strict` v CI) |
| `check:cli-i18n`               | ukazni nizi CLI so prisotni v vseh področnih datotekah i18n                                                                                                    | ja                        |
| `check:openapi-coverage`       | specifikacija OpenAPI pokriva vsaj del resničnih poti                                                                                                          | ja                        |
| `check:openapi-security-tiers` | Opombe varnostnih stopenj v `openapi.yaml` so skladne s klasifikacijami `routeGuard.ts`                                                                        | **Svetovalni**            |
| `check:openapi-routes`         | Vsaka pot v `openapi.yaml` se razreši v pravi `route.ts` (proti halucinaciji)                                                                                  | ja                        |
| `check:docs-symbols`           | Vsaka referenca `/api/...` v `docs/**/*.md` se razreši v pravi `route.ts` (proti halucinaciji)                                                                 | ja                        |
| `i18n translation drift`       | Neprevedeni ključi v področnih datotekah i18n opozarjajo samo —                                                                                                | **Svetovalni**            |

Ustvarjenih je dvanajst README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenerira vse). Vsak ima preizkus enote za primerjavo bajtov (`tests/unit/docs/readme-*-svg.test.ts`, opravilo `test-unit`), ki ne uspe, ko je odobrena datoteka zastarela, `check:docs-counts` pa bere kanonična števila iz njihovih vozlišč `<text>` — zato korak orisov ohranja vsak orisani niz v datoteki kot neviden `<text>`. Preverjanje kanoničnih števil SVG prebere datoteke, navedene v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` ter `public/images/tier-flow-dark.svg` in `tier-flow-light.svg`; trditve o brezplačnem za vedno, vnosu v katalog, ponavljajočem se zbiranju in faktorjih točkovanja se glasijo tudi `promise-pillars.svg`, `free-tier-budget.svg` in `strategies-grid.svg`. `free-tier-budget.svg` črpa svoje številke iz nalagalnika živega kataloga, tako da sprememba v `FREE_MODEL_BUDGETS` ali v prikazno ime ponudnika povzroči red CI dokler ta datoteka ni ponovno ustvarjena.

### Delovno mesto: `i18n-ui-coverage`

| Skripta                              | Potrjuje                                                                                                                                                                                           | Blokiranje     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (v vrstici) | pokritost ključa UI i18n je ≥ 65%                                                                                                                                                                  | ja             |
| `check-ui-value-drift` (v vrstici)   | Prepisana angleščina** vrednost** za seboj ne pušča zastarelega prevoda                                                                                                                            | ja             |
| `check-new-key-coverage` (v vrstici) | A** novo** Angleški ključ je preveden v vsak jezik — oznaka `__MISSING__:` pa je zavrnjena                                                                                                         | ja             |
| `check-translation-ratio`            | Razmerje dejanskega prevoda na jezik (identično z angleščino / nadomestni znak / manjkajoči listi zunaj seznama dovoljenih) ne sme preseči `config/quality/i18n-translation-baseline.json` + slack | **Svetovalni** |

Potrebuje `fetch-depth: 0` — vrata za premik vrednosti diff `en.json` glede na osnovo spajanja.

#### `check-ui-value-drift` — stale-translation gate

Ujame eno i18n regresijo, ki je druga vrata strukturno ne vidijo: angleška vrednost je prepisana in prevodi, izpeljani iz _prejšnje_ angleščine, ostanejo zadaj, tako da neangleški uporabniki še naprej berejo samozavestno ubesedeno, zdaj pa napačno kopijo.

To je res poslano. `oauthModal.googleOAuthWarning` je bil prepisan, ko je pristal pomočnik za prijavo Antigravity (#5203);** 39 od 43 krajev** ohranjeno besedilo, ki operaterjem sporoča, naj "kopirajo celoten URL in ga prilepijo spodaj" — tok, ki se ne more dokončati za tega ponudnika. Do #8463 je ostalo neopaženo, ker:

- `sync-ui-keys` zapolni samo ključe, ki so** odsoten** , nikoli takih, ki so** zastarel** ;
- `check-ui-keys-coverage` šteje _prisotnost_ ključa, zato zastarel prevod šteje kot pokrit;
- `check-translation-drift` sledi dokumentaciji `docs/i18n/<locale>/**.md` zrcala — nikoli ne bere `src/i18n/messages/*.json`. Blokiranje v opravilu `docs-sync-strict` od ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na ravni razdelka, poceni).

**Zaveda se razlik, ni podprt z osnovno linijo.** Primerja `en.json` na osnovi spajanja z delovnim drevesom; za vsak ključ, katerega angleška vrednost se je spremenila, so vse področne nastavitve, ki še vedno vsebujejo nedotaknjen prevod, zastarele. To namerno** zamrzne že obstoječi dolg** — a diff ne more razkriti, iz katere stare angleščine je prišel dolgoletni prevod, zato vrata presojajo le, česa se trenutna sprememba dotakne. Alternativa (osnovna vrednost razpršitve na ključ) bi stala ~ 600 KB generirano datoteko, 3 × največjo obstoječo osnovno linijo, ki se vrti na vsakem i18n PR.

Dva načina za zadovoljitev:

1. posodobiti prizadete prevode ali
2. nastavite jih na `__MISSING__:<new english>` — izvajalno okolje nato postreže popravljeno angleščino (`src/i18n/request.ts::deepMergeFallback`, #7258) in ključne čakalne vrste za prevod.

Če je niz** pomen** spremenjeno, raje** preimenovanje ključa** : nov ključ ne more podedovati zastarelega prevoda. To je uporabljen vzorec #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izhodi 0 z `SKIP reason=base-unresolved`, ko osnovnega kataloga ni mogoče prebrati (plitek klon brez osnovne ref), zrcaljenje `check-openapi-breaking`.

### Delovno mesto: `i18n`

Popolna validacijska matrika i18n (eno opravilo na jezik). Celotno delo je svetovalno.

| Skripta                         | Potrjuje                   | Blokiranje                                                 |
| ------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Popolnost prevoda na jezik | **Svetovalni** (`continue-on-error: true` na celotno delo) |

### Delovno mesto: `pr-test-policy`

Deluje samo na zahtevo za vleko.

| Skripta                | Potrjuje                                                                                                                                  | Blokiranje |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, ki spreminja produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/` mora vključevati ali posodobiti teste (trdo pravilo #8) | ja         |
| `check:test-masking`   | Spremenjene testne datoteke ne zmanjšajo števila neto trditev ali dodajo tavtologij `assert.ok(true)`                                     | ja         |
| `check:pr-evidence`    | telo PR navaja dokaze test/VPS za spremembo (mehanizira Hard Rule #18 z greppingom PR prose — fragile, glejte Backlog)                    | ja         |

### Delovno mesto: `test-vitest`

Teče po `build`. Bloki se združijo ob napaki.

| Apartma          | Potrjuje                                                            | Blokiranje                                                                                                    |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | strežnik MCP (110 orodij), autoCombo, predpomnilnik — vitest runner | ja                                                                                                            |
| `test:vitest:ui` | testi komponente UI — vitest runner                                 | **Blokiranje** — že obstoječe okvare so v `vitest.config.ts` izrecno izključene; novi neuspehi propadejo delo |

### Nočni delovni tokovi (načrtovani, svetovalni)

Te delujejo po urniku cron (in `workflow_dispatch`), nikoli po PRs. Vsi so svetovalni.

| Potek dela             | Potrjuje                                                                                                                                                    | Blokiranje     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testi lastnosti hitrega preverjanja z naključnim začetnim številom +                                                                                        | **Svetovalni** |
| `nightly-resilience`   | heap-growth gate, kaos fault-injection, k6 load/soak                                                                                                        | **Svetovalni** |
| `nightly-llm-security` | promptfoo injection guard (blok način) + garak sonde (preskočeno brez skrivnosti ponudnika)                                                                 | **Svetovalni** |
| `nightly-schemathesis` | OpenAPI pogodba fuzzing (shemateza) proti OmniRoute v živo z uporabo `docs/openapi.yaml` — površin kršitve specifikacij / neobravnavanih 500 s (faza 8 B.4) | **Svetovalni** |
| `nightly-mutation`     | Strykerjev rezultat mutacijskega testiranja nad hitrim pasom enote — preživeli mutanti na površini šibki trdi                                               | **Svetovalni** |
| `nightly-compat`       | Matrika združljivosti motorja vozlišča v podprtih obsegih `engines.node`                                                                                    | **Svetovalni** |

Osnovne črte zmogljivosti (kopiča, TTFB, čas gradnje) se zabeležijo, ne preklopijo: glejte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Ratchet Baseline (`quality-baseline.json`)

Ratchet engine (`scripts/quality/check-quality-ratchet.mjs`) bere `quality-baseline.json` in ga primerja s sveže zbranim `quality-metrics.json`. Vsaka metrika, ki nazaduje preko svojega epsilona, ne uspe zgraditi.

Trenutno spremljane meritve:

| metrika               | Smer   | Pomen                                    |
| --------------------- | ------ | ---------------------------------------- |
| `eslintWarnings`      | `down` | število opozoril ESLint ne sme naraščati |
| `coverage.statements` | `up`   | Pokritost izjave ne sme pasti            |
| `coverage.lines`      | `up`   | Pokritost linije ne sme pasti            |
| `coverage.functions`  | `up`   | Pokritost funkcij ne sme pasti           |
| `coverage.branches`   | `up`   | Pokritost veje ne sme pasti              |

Če želite posodobiti osnovno vrednost po resničnem izboljšanju:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Zastavica `--update` zapiše trenutne izmerjene vrednosti v `quality-baseline.json`. Objavite to datoteko skupaj s spremembo, ki je izboljšala meritev. PR, ki izboljša metriko brez posodobitve osnovne linije, bo ujel `--require-tighten` (faza 6A.5, čaka na implementacijo).

### raglja CodeQL : kadenca osveževanja in ročni sprožilec

`check:codeql-ratchet` bere** repo stanje, osveženo po urniku — ne po PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` poroča `state: configured`, `schedule: weekly`: GitHub-ovo skeniranje privzetih nastavitev, ne analiza na pritisk. Posledica: po združitvi PR, ki ga FIXES opozori, raglja nadaljuje z branjem starega, višjega števila, dokler ne zažene naslednji načrtovani pregled — tako da poroča o regresiji pri vsakem odprtem PR, vključno z lastnimi nadaljnjimi ukrepi PR za popravljanje, dokler skeniranje ne dohiti.

**Ročna osvežitev** : `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovno zažene analizo in ponovno objavi opozorila v nekaj minutah. Najprej preberite `.github/workflows/codeql.yml` — njegova glava pojasnjuje, da je `workflow_dispatch` -only** ker je v nasprotju s "privzeto nastavitvijo" GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). Obnovitev sprožilcev `push`/`pull_request`/ `schedule` zahteva an** lastnik najprej ukrepa** : Nastavitve → Varnost kode → CodeQL: Privzeto → Napredno. Ne dodajajte sprožilca `schedule:` brez tega stikala — saj bo ustvaril samo neuspešne zagone.

**Zategnite osnovno linijo, ko štetje pade** — `node scripts/check/check-codeql-ratchet.mjs --update` zapiše novo izmerjeno štetje v `quality-baseline.json` → `metrics.codeqlAlerts.value`, tako da raglja tiho ne dovoli regresije nazaj na staro zgornjo mejo. Delujoč primer (2026-09-02/03): PR #12502 je popravil 7 pravih opozoril (13 → 6 izmerjeno odprtih); PR #12530 je zaostril zamrznjeno osnovno linijo 11 → 6, da se ujema; preostalih 6 je bilo nato zavrnjenih z utemeljitvijo na opozorilo do 0 odprtih.

**Odpuščanja so klic operaterja (Hard Rule #14)** — nikoli ne opusti opozorila CodeQL ne da bi zabeležil tehnično utemeljitev v komentarju o zavrnitvi: `won't fix` za zahtevo protokola navzgor, `used in tests` za testno napravo, `false positive` za razkužilo, CodeQL ne vidi (precedens: `docs/security/ERROR_SANITIZATION.md`).

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

## Pravilnik o seznamu dovoljenih

Vsaka vrata, ki ne morejo odpovedati zaradi že obstoječih kršitev, uporabljajo zamrznjen seznam dovoljenih (npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika je:

**Odpravite glavni vzrok; uporabite seznam dovoljenih le, če je kršitev že prisotna in je ni mogoče popraviti v istem PR.**

Ko dodate vnos na seznam dovoljenih:

1. Vključite komentar z utemeljitvijo.
2. Navedite težavo s sledenjem (npr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Odstranite vnos v istem PR, ki odpravlja kršitev — Zastarel vnos, ki ne zavira več aktivne kršitve, je sam po sebi napaka (zastarela uveljavitev 6A.3 ne bo prenesla vrat na osirotelem vnosu na seznam dovoljenih, ko bo enkrat implementirana).

naredi** ne** dodajte vnose na seznam dovoljenih, da bodo testi potekali hitreje. Zelena vrata z naraščajočim seznamom dovoljenih so napačen občutek kakovosti.

### Ko vrata na vašem PR odpovejo

1. **Pazljivo preberite izpis vrat** — vam natančno pove, katera datoteka ali simbol je kršil pravilo.
2. **Odpravite kršitev** — večina vrat je determinističnih pregledov datotečnega sistema, ki prestanejo takoj, ko je koda pravilna.
3. **Če je kršitev že prisotna** (tj. niste ga uvedli, vendar ga vrata zdaj pokrivajo): dodajte vnos na seznam dovoljenih z utemeljitvenim komentarjem in težavo s sledenjem.
4. **Če so vrata zaskočna** (pokritost, opozorila ESLint, podvajanje, kompleksnost): vaša sprememba je poslabšala meritev. Odpravite osnovno težavo ali (redko) zaženite `npm run quality:ratchet -- --update`, če je sprememba namerna in je poslabšanje metrike sprejemljivo — vendar dokumentirajte, zakaj v opisu PR.
5. **Svetovalna vrata** (`continue-on-error: true`) so informativni — ne blokirajo spajanja, ampak se pojavijo v povzetku CI. Vseeno jih popravi.

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

## Rationalization Backlog (ROI review — Fase 9 Onda 3)

Ta inventar je bil usklajen z `ci.yml` dne 2026-06-17 (prejšnja različica je izpustila `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI usklajenega niza je identificiral naslednje kandidate za racionalizacijo.** Spajanja so mehanske spremembe CI ; flips/drops so politične odločitve, rezervirane za operaterja.** Nič spodaj še ni uporabljeno.

**Tudi zgoraj nedokumentirano** (nasvet, nizek signal): opravilo `docs-lint` (markdownlint + Vale, celotno opravilo `continue-on-error`) in delovni tokovi samostojnega optičnega bralnika `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` je v `quality-baseline.json`, vendar ni povezan z blokirno ragljo v `ci.yml` — metrika je trenutno osirotela.

### Spajanje/odstranjevanje (mehansko, manjše tveganje)

Vsak kandidat je bil potrjen glede na stanje vrat v živo dne 2026-06-17 (zaupaj, vendar preveri); izkazalo se je, da več "očitnih" združitev skriva dolg in je** ne** čiste vpadnice.

- **`check:docs-sync` teče dvakrat** — samostojno v opravilu `lint` in spet znotraj `check:docs-all` (`docs-sync-strict`) in husky pre-commit hook. ✅**DONE** — samostojni priklic `lint` odstranjen.
- **CVE skeniranje** — ❌**NOT čisto spajanje.** `audit:deps` blokira kritična svetovanja in nepopolne revizije v vseh petih zaklenjenih datotekah, medtem ko v skladu s trenutno politiko poroča o visokih nasvetih kot opozorilih; `check:vuln-ratchet` (osv) ne deluje samo pri _regresiji_ v primerjavi s prijavljeno osnovno linijo in zavrne manjkajoče meritve, ko je to potrebno. Drugačna semantika — ki bi izpustila `audit:deps`, bi izgubila absolutna kritična vrata in neodvisna potrdila o reviziji paketa. Obdrži oboje.
- **Zaznavanje cikla** — ✅**DONE** (#15159 G-01/G-02). Staro besedilo tukaj je imenovalo `check:cycles` "zelena, izbrana" vrata in utemeljilo njihovo blokiranje, ker je `check:circular-deps` (dpdm) poročal o 91 ciklih. Ta zelena je bila a** lažno zelena** : `check:cycles` je pregledal 5 podimenikov (450 datotek), se ujemal samo s statičnim `import|export … from` in opustil vsak specifikator `@/` in `@omniroute/open-sse/`, tako da ni mogel videti ciklov vzdevkov + z dinamičnim uvozom, ki so prevladovali v repoju. Popravljeno: vrata zdaj hodijo `src` + `open-sse` (5023 datotek), zbirajo specifikatorje iz TypeScript AST (tako da `import("…")` šteje, položaj tipa `typeof import("…")` ne) in razrešuje tsconfig `paths`. Najde** 14** ciklov, ne 0. Ker 14 že obstoječih ciklov ni mogoče popraviti v vratih PR, je `check:cycles` zdaj** raglja** (`--ratchet`, zgornja meja `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokira vsako _regresijo_ in število lahko samo pade. CI izvaja `npm run check:cycles:ratchet`. Izgorele vožnje z**A-01** . `check:circular-deps` (dpdm) ostaja svetovalno kot širše drugo mnenje.
- **Kompleksnost** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en sprehod ESLint, šteje z ruleId tako da ciklomatske maksimalne črte + in kognitivne osnovne črte ostanejo neodvisne; posamezni `check:complexity` / `check:cognitive-complexity` ostanejo za lokalni `--update`.
- **`/api` proti halucinaciji** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS popis `src/app/api`, openapi-routes + docs-symbols še vedno poroča neodvisno; posamezniki ostajajo za lokalne teke.
- **`check:node-runtime` izvaja 11 delovnih mest** — ⚠️** nizek ROI.** Vsak je ločen tekač in ček je < 1s; skupni prihranek ~ 10s, proti izgubi poceni stražarja na delovno mesto. Ni vredno odpovedi.
- **`typecheck:noimplicit:core` na CI lint** — ✅** odstranjen iz opravila lint** (je bil svetovalni `continue-on-error`); blokirna površina je `typecheck:core` + `check:type-coverage`. Lokalna pisava ohranjena.

### Obrni/odloči (politika operaterja)

- `check:openapi-security-tiers` (svetovalni) — ❌**NOT čisto preklopljiv.** Zapusti 0, vendar opozori, da več poti `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nima opombe `x-loopback-only: true`. Uveljavljanje zahteva, da te opombe najprej dodate v `openapi.yaml`.
- `typecheck:noimplicit:core` (svetovalni) — v veliki meri vključen v blokirno zaskočno `check:type-coverage`. Obrnite se na ragljo ali spustite odvečni drugi prehod `tsc`.
- `test:vitest:ui` (zdaj** blokiranje** ) že obstoječe napake — so izrecno izključene v `vitest.config.ts` s komentarji sledenja `// #8618` ; novi neuspehi propadejo delo.
- `check:secrets` (gitleaks, blokiranje ratchet zamrznjeno pri 3 dokumentiranih lažno pozitivnih) — seznam dovoljenih 3, da dosežete 0, ali znižate na svetovalno. GitHub izvorno tajno skeniranje + `check:public-creds`.
- `check:pr-evidence` (blokiranje, greps PR-telesna proza) — visoko lažno pozitivno tveganje; oslabi uveljavljanje Hard Rule #18 če je opuščeno, zato je to pristen klic pravilnika.
- `semgrep` (samostojno svetovanje) — prekriva CodeQL za družine OWASP ; z žico povežite njegovo osnovno linijo z ragljo ali padcem.

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
