# Release-Green: candidate validation and evidence (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green hutazama ahadi mahususi na huripoti matokeo yake ya uthibitishaji. [Rejea ya Quality Gates](../architecture/QUALITY_GATES.md) inafafanua wasifu wa sasa CI, ukaguzi unaohitajika na sera ya kukubalika. [Sera ya uandikishaji](../../config/quality/admission-policy.json) iliyobadilishwa ni mkataba unaotekelezeka wa `Gate / CI` na `Gate / Quality`.

## CI na upeo wa mwangalizi

`ci.yml` na `quality.yml` maombi ya kuvuta jalada kwenye matawi makuu na ya kutolewa. Wasifu uliochaguliwa huamua ni kazi zipi zitatumika. CI kamili pia inajumuisha njia ambazo ombi la kawaida la kuvuta halitekelezeki. Matokeo ya mwangalizi wa haraka hayawezi kuchukua nafasi ya kazi hizo, na karatasi iliyokamilishwa ya mtiririko wa kazi haiwezi kuchukua nafasi ya risiti zake.

Jengo la uzalishaji ni la CI. Hakuna muundo wa ushauri unaorudiwa katika `quality.yml`. Vipengee vilivyokosekana, kazi iliyoghairiwa na vipimo visivyo kamili havifanyi ukaguzi unaohitajika. Thibitisha msingi wa sasa, kichwa na mgombea aliyeunganishwa kabla ya kukubali matokeo.

## Uthibitishaji wa ndani

Endesha mwangalizi kwenye mti wa kazi unaomilikiwa baada ya kuandaa vitegemezi vyake. Tumia [mti wa kazi na itifaki ya rasilimali](WORKTREE_ISOLATION.md) kabla ya uthibitisho mzito.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Wasifu wa haraka ni sehemu. Wasifu kamili hukagua mahitaji yake ya kielelezo na kuhifadhi risiti za amri; haidhibitishi kupelekwa au kuchukua nafasi ya ukaguzi unaotumika. Ripoti inatofautisha kutofaulu kwa utekelezaji na utelezi wa kipimo. Ratchets zinazohitajika husalia kuzuia kulingana na sera iliyochaguliwa. Usiongeze msingi ili tu kupata matokeo ya kupita.

## Ufagiaji wa usiku na kwa mikono

Utoaji wa kila usiku na visuluhishi vya uoanifu huchagua tawi la toleo la kisheria. Uchaguzi huo lazima ulingane na tawi lililoanzisha utendakazi, na vyumba vitumie tukio lisilobadilika SHA. Kwa utekelezaji wa mwongozo, chagua toleo lililokusudiwa katika `release_branch` na utume kwenye ref hiyo hiyo:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Utumaji wa tawi tofauti hukataliwa kabla ya kutekeleza nambari iliyochaguliwa. Angalia `main` vyumba vikuu kuu na uthibitishe kuwa SHA yake bado inalingana na lengo lililotatuliwa kabla ya usakinishaji. Ikiwa hatua kuu wakati wa utatuzi, endesha tena ufagiaji usio kamili kwenye ahadi mpya. Usichanganye stakabadhi za makundi kutoka kwa watahiniwa tofauti.

## Jaribio la kushindwa na kupona

Tumia tukio kama faharasa ya uchunguzi, kisha ukague kukimbia, jaribio, hatua iliyofeli na vizalia vya programu. Linganisha msingi sawa na ushahidi wa mgombea kabla ya kuhusisha kushindwa kwa mchangiaji. Hitilafu za miundomsingi, kasoro zilizorithiwa, kurudi nyuma kwa wagombeaji na uidhinishaji unaosubiri kuhitaji suluhu tofauti.

Ujuzi wa `/green-prs`, `/sweep-reds`, `/validate-release-green` na `/babysit` hukusanya ushahidi na kuandaa marekebisho chini ya mawanda yao yaliyoandikwa. Weka mkopo wa mchangiaji, tumia matawi ya ukarabati yaliyotengwa, na uthibitishe ukaguzi wote unaohitajika kabla ya muunganisho ulioidhinishwa. Hakuna uwekaji upya wa kiotomatiki au vibadala vya kufungwa kwa tukio kwa mgombeaji wa sasa anayepita.
