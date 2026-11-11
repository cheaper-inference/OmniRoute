# Release-Green: candidate validation and evidence (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green opazuje določeno objavo in poroča o rezultatih preverjanja. [Referenca Quality Gates](../architecture/QUALITY_GATES.md) določa trenutne profile CI, zahtevana preverjanja in politiko sprejemanja. Politika sprejema z različicami v `config/quality/admission-policy.json` je izvedljiva pogodba za `Gate / CI` in `Gate / Quality`.

## CI in obseg opazovalca

`ci.yml` in `quality.yml` pokrivata zahteve za vlečenje v glavne in izdajne veje. Izbrani profil določa, katera delovna mesta veljajo. Celoten CI vključuje tudi steze, ki jih navadna zahteva za vlečenje ne izvede. Rezultat hitrega opazovalca ne more nadomestiti teh opravil in dokončan ovoj delovnega toka ne more nadomestiti njegovih potrdil.

Proizvodna zgradba pripada CI. V `quality.yml` ni podvojene svetovalne zgradbe. Manjkajoči artefakti, preklicano delo in nepopolne meritve ne zagotavljajo uspešnega zahtevanega preverjanja. Potrdite trenutno bazo, glavo in kombiniranega kandidata, preden sprejmete rezultate.

## Lokalna validacija

Po pripravi njegovih odvisnosti zaženite opazovalca v lastnem delovnem drevesu. Sledite delovnemu drevesu in protokolu virov v `docs/ops/WORKTREE_ISOLATION.md` pred obsežno validacijo.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Hitri profil je delen. Polni profil preveri svoje modelirane zahteve in ohrani potrdila o ukazih; ne potrjuje uvajanja ali nadomešča veljavnih gostujočih preverjanj. Poročilo loči neuspešno izvedbo od premika metrike. Zahtevane raglje ostanejo blokirane v skladu z izbranim pravilnikom. Ne dvigujte izhodiščne črte zgolj zato, da bi dosegli prehoden rezultat.

## Nočno in ročno pometanje

Nočna izdaja in razreševalci združljivosti izberejo kanonično izdajo. Ta izbor se mora ujemati z vejo, ki je sprožila potek dela, in paketi uporabljajo nespremenljivo SHA dogodka. Za ročno izvedbo izberite predvideno izdajo v `release_branch` in odpošljite na isti ref.

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Medpanožno pošiljanje je zavrnjeno pred izvedbo izbrane kode. Gostujoči glavni paketi preverijo `main` in pred namestitvijo preverijo, ali se njegov SHA še vedno ujema z razrešenim ciljem. Če se main premakne med razreševanjem, znova zaženite nepopolno brisanje na novi objavi. Ne združujte računov različnih kandidatov.

## Triaža napak in okrevanje

Uporabite incident kot diagnostični indeks, nato preglejte natančen zagon, poskus, neuspeli korak in artefakt. Primerjajte enakovredno bazo in možne dokaze, preden neuspeh pripišete sodelujočemu. Infrastrukturne napake, podedovane napake, regresije kandidatov in čakajoče odobritve zahtevajo drugačna sredstva.

Veščine `/green-prs`, `/sweep-reds`, `/validate-release-green` in `/babysit` zbirajo dokaze in pripravljajo popravke v svojem dokumentiranem obsegu. Ohranite zasluge sodelavca, uporabite izolirane veje za popravilo in preverite vsa zahtevana preverjanja pred pooblaščeno združitvijo. Nobena samodejna ponovna izhodiščna linija ali zaprtje incidenta ne nadomesti prehodnega trenutnega kandidata.
