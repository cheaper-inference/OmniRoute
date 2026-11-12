# Release-Green: candidate validation and evidence (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green josserva impenn speċifiku u jirrapporta r-riżultati tal-validazzjoni tiegħu. [Ir-referenza tal-Quality Gates](../architecture/QUALITY_GATES.md) tiddefinixxi l-profili CI attwali, il-kontrolli meħtieġa u l-politika ta 'aċċettazzjoni. Il-politika ta' ammissjoni b'verżjoni `config/quality/admission-policy.json` hija l-kuntratt eżekutibbli għal `Gate / CI` u `Gate / Quality`.

## CI u l-ambitu tal-osservatur

`ci.yml` u `quality.yml` ikopru talbiet ta 'ġibda f'fergħat prinċipali u ta' rilaxx. Il-profil magħżul jiddetermina liema impjiegi japplikaw. CI sħiħ jinkludi wkoll korsiji li talba ta 'ġibda ordinarja ma tesegwixxix. Riżultat ta 'osservatur ta' malajr ma jistax jissostitwixxi dawk l-impjiegi, u wrapper tal-fluss tax-xogħol komplut ma jistax jissostitwixxi l-irċevuti tiegħu.

Il-bini tal-produzzjoni jappartjeni lil CI. M'hemm l-ebda bini konsultattiv duplikat `quality.yml`. Artifacts nieqsa, xogħol ikkanċellat u kejl mhux komplut ma jistabbilixxux kontroll meħtieġ b'suċċess. Ikkonferma l-bażi attwali, ir-ras u l-kandidat magħqud qabel ma taċċetta r-riżultati.

## Validazzjoni lokali

Mexxi l-osservatur f'siġra tax-xogħol proprjetà wara li tħejji d-dipendenzi tagħha. Segwi l-worktree u l-protokoll tar-riżorsi `docs/ops/WORKTREE_ISOLATION.md` qabel validazzjoni qawwija.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Il-profil ta 'malajr huwa parzjali. Il-profil sħiħ jiċċekkja r-rekwiżiti mudellati tiegħu u jippreserva l-irċevuti tal-kmand; ma jiċċertifikax l-iskjerament jew jissostitwixxi kontrolli ospitati applikabbli. Ir-rapport jiddistingwi falliment ta 'eżekuzzjoni minn drift metriku. Il-ratchets meħtieġa jibqgħu jimblukkaw skont il-politika magħżula. Tgħollix linja bażi sempliċement biex tikseb riżultat li jgħaddi.

## Sweeps bil-lejl u manwali

Ir-riżoluzzjonijiet ta' rilaxx u kompatibilità ta' kull filgħaxija jagħżlu fergħa ta' rilaxx kanoniku. Dik l-għażla trid taqbel mal-fergħa li xprunat il-fluss tax-xogħol, u s-suites jużaw iż- SHA immutabbli tal-avveniment. Għall-eżekuzzjoni manwali, agħżel ir-rilaxx maħsub `release_branch` u ibgħat fuq dak l-istess ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Id-dispaċċ bejn il-fergħat huwa miċħud qabel ma jiġi esegwit il-kodiċi magħżul. Hosted suites prinċipali checkout `main` u tivverifika li SHA tagħha għadu jaqbel mal-mira solvuta qabel l-installazzjoni. Jekk jiċċaqlaq prinċipali waqt ir-riżoluzzjoni, erġa' wettaq l-isweep mhux komplut fuq il-kommit il-ġdid. Tgħaqqadx irċevuti ta' suite minn kandidati differenti.

## Trija ta' falliment u rkupru

Uża l-inċident bħala indiċi dijanjostiku, imbagħad spezzjona l-ġirja eżatta, l-attentat, il-pass li jonqos u l-artifact. Qabbel bażi ekwivalenti u evidenza kandidat qabel ma attribwixxi nuqqas lil kontributur. L-iżbalji fl-infrastruttura, id-difetti li jintirtu, ir-rigressjonijiet tal-kandidati u l-approvazzjonijiet pendenti jeħtieġu rimedji differenti.

Il-ħiliet `/green-prs`, `/sweep-reds`, `/validate-release-green` u `/babysit` jiġbru evidenza u jħejju soluzzjonijiet taħt l-ambitu dokumentat tagħhom. Żomm il-kreditu tal-kontributur, uża fergħat ta' tiswija iżolati, u ivverifika l-kontrolli kollha meħtieġa qabel fużjoni awtorizzata. L-ebda rebaseline awtomatiku jew sostitut tal-għeluq tal-inċidenti għal kandidat attwali li jgħaddi.
