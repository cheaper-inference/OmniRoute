# Release-Green: candidate validation and evidence (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Tu-Alawọ ewe ṣe akiyesi ifaramo kan pato ati ṣe ijabọ awọn abajade afọwọsi rẹ. [Itọkasi Didara Gates](../architecture/QUALITY_GATES.md) n ṣalaye awọn profaili CI lọwọlọwọ, awọn sọwedowo ti o nilo ati eto imulo gbigba. Ilana gbigba ti ikede ni `config/quality/admission-policy.json` jẹ adehun ṣiṣe fun `Gate / CI` ati `Gate / Quality`.

## CI ati alawoye dopin

`ci.yml` ati `quality.yml` ideri fa awọn ibeere sinu akọkọ ati awọn ẹka itusilẹ. Profaili ti o yan pinnu iru awọn iṣẹ ti o lo. CI ni kikun tun pẹlu awọn ọna ti ibeere fa lasan ko ṣiṣẹ. Abajade oluwoye ni iyara ko le rọpo awọn iṣẹ wọnyẹn, ati ipari iṣẹ ṣiṣe ti pari ko le rọpo awọn owo-owo rẹ.

Itumọ iṣelọpọ jẹ ti CI. Ko si idamọran ẹda ẹda ni `quality.yml`. Awọn ohun-ọṣọ ti o padanu, iṣẹ ifagile ati awọn wiwọn ti ko pe ko ṣe agbekalẹ ayẹwo ti o nilo aṣeyọri. Jẹrisi ipilẹ lọwọlọwọ, ori ati oludije apapọ ṣaaju gbigba awọn abajade.

## Afọwọsi agbegbe

Ṣiṣe awọn Oluwoye ni ohun ini worktree lẹhin mura awọn oniwe-gbára. Tẹle igi iṣẹ ati ilana awọn orisun ni `docs/ops/WORKTREE_ISOLATION.md` ṣaaju ijẹrisi eru.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Profaili iyara jẹ apakan. Awọn profaili ni kikun sọwedowo awọn oniwe-awoṣe awọn ibeere ati itoju awọn gbigba aṣẹ; ko ṣe ijẹrisi imuṣiṣẹ tabi aropo fun awọn sọwedowo ti gbalejo to wulo. Ijabọ naa ṣe iyatọ ikuna ipaniyan lati fiseete metric. Awọn ratchets ti a beere fun wa ni idinamọ ni ibamu si eto imulo ti o yan. Maṣe gbe ipilẹ kan soke nikan lati gba abajade ti o kọja.

## Nightly ati Afowoyi sweeps

Itusilẹ alẹ ati awọn ipinnu ibaramu yan ẹka itusilẹ canonical kan. Yiyan yẹn gbọdọ baramu ẹka ti o fa ṣiṣiṣẹsẹhin iṣẹ, ati awọn suites lo SHA aileyipada iṣẹlẹ naa. Fun ipaniyan afọwọṣe, yan itusilẹ ti a pinnu ni `release_branch` ki o firanṣẹ lori atunṣe kanna:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Ifijiṣẹ ẹka-agbelebu jẹ kọ ṣaaju ṣiṣe koodu ti o yan. Ti gbalejo awọn suites akọkọ ibi isanwo `main` ati rii daju pe SHA rẹ tun baamu ibi-afẹde ipinnu ṣaaju fifi sori ẹrọ. Ti o ba n gbe ni akọkọ lakoko ipinnu, tun ṣe gbigba ti ko pe lori adehun tuntun. Maṣe dapọ awọn owo-owo suite lati oriṣiriṣi awọn oludije.

## Iyatọ ikuna ati imularada

Lo iṣẹlẹ naa bi atọka iwadii, lẹhinna ṣayẹwo ṣiṣe gangan, igbiyanju, igbesẹ ti kuna ati iṣẹ-ọnà. Ṣe afiwe ipilẹ deede ati ẹri oludije ṣaaju sisọ ikuna si oluranlọwọ kan. Awọn aṣiṣe amayederun, awọn abawọn ti a jogun, awọn atunṣe oludije ati awọn ifọwọsi ni isunmọ nilo awọn atunṣe oriṣiriṣi.

Awọn `/green-prs`, `/sweep-reds`, `/validate-release-green` ati awọn ogbon `/babysit` gba ẹri ati mura awọn atunṣe labẹ aaye iwe-ipamọ wọn. Jeki kirẹditi olùkópa, lo awọn ẹka atunṣe ti o ya sọtọ, ati ṣayẹwo gbogbo awọn sọwedowo ti a beere ṣaaju iṣakojọpọ ti a fun ni aṣẹ. Ko si isọdọtun aifọwọyi tabi awọn aropo isẹlẹ tiipa fun oludije lọwọlọwọ ti nkọja.
