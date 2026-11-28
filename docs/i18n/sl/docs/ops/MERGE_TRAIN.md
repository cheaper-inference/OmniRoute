# Merge Queue & Manual Merge-Train Runbook (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Pristanek na veji za sprostitev

Čakalna vrsta Omni upravlja pristanke v `release/vX.Y.Z`. Preberite `mode` najvišje ravni v `config/merge-queue/config.json` na privzeti veji, preden pristanete na PR. Glejte [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** zažene preverjanje in prepusti pristanek ročnemu združevanju. Nanesite `omni-queue` na odobreni PR na končni glavi. Preverite primernost z `npm run queue -- why <PR>`. Počakajte na razsodbo za tisto glavo v `npm run queue -- history --base <branch>`. Nadaljujte z `would-land`. Na `culprit-found` ali `would-dequeue` zadržite spajanje in odpravite vzrok.
- **Senčne izjeme.** Vlak z zelenim polnim CI proti trenutni osnovni konici lahko nadaljuje brez ločene razsodbe čakalne vrste. Ista izjema velja, če glava PR že vsebuje trenutno osnovno konico.
- **`live`** uporablja oznako `omni-queue` za sprožitev pristanka. Samo čakalna vrsta pristane na PR. Pustite ukaze za spajanje in neposredne potiske v čakalno vrsto.

Za vsako pristajanje je potrebno dovoljenje lastnika in ustrezna zahtevana preverjanja. Uporabite `omni-queue` šele potem, ko lastnik dovoli pristanek. PRs v čakalni vrsti, ki se dotika zaščitenih poti, zahteva tudi lastnikovo odločitev `protected-approved` za ta PR.

Nabor pravil »Zahtevaj zelena vrata pri aktivni izdaji« zahteva zelena `Gate / CI` in `Gate / Quality` na glavi. Nikoli ne uporabljajte `--admin` za obhod rdečih vrat. Zamrznjeni bloki sprostitve se združijo v zamrznjeno vejo. Glej [Trdo pravilo 21](HARD_RULES_DETAIL.md). Nikoli ne označite, združite ali potisnite na zahtevo za vlečenje, da druga seja deluje. Glej [Trdo pravilo 22](HARD_RULES_DETAIL.md).

## Zahteva za vlečenje vlaka

1. Začnite vejo vlaka na trenutni konici baze za sprostitev. Integrirajte natančno odobrene glave članov z uporabo potrditev spajanja. Ohranite njihovo zgodovino objave tako, da se izognete stiskanju in ponovni bazi.
2. Odprite eno zahtevo za vleko za vejo vlaka. Potrdite ta PR z lastnim polnim CI na trenutni osnovni konici. Pred pristankom ponovno preverite osnovno konico in odobrene glave elementov. Osvežite vlak in njegov CI, ko se spremeni potrjeni kandidat.
3. Prizemljite vlak PR s potrditvijo spajanja v ustreznem načinu čakalne vrste. V načinu v živo metoda pristanka `merge-ff` čakalne vrste ohrani potrditve spajanja. Izvirne glave članov postanejo dosegljive iz izdajne veje. GitHub označi člana PRs kot združenega in objave obdržijo svoje avtorje.

Javni primer je [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Združil je 18 članov PRs in pristal z združitvijo 24. 11. 2026.

Povratna sinhronizacija z `main` na naslednjo vejo izdaje prav tako pristane prek potrditve spajanja. Ohranitev prednikov `main` je potrebna za poznejše sinhronizacije. Glejte [Izolacija delovnega drevesa](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Lokalni validator združevanja

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator pridobi osnovo in glave PR ter ju združi v delovno drevo za enkratno uporabo. Enkrat zažene svoj paritetni paket na nastalem drevesu. Neuspelo pridobivanje glave ali konflikt spajanja izvrže ta PR in skript nadaljuje s preostalim PRs.

- **`--plan`** natisne korake izbranega načina in zapusti brez ustvarjanja delovnega drevesa ali stika z daljincem. Združite ga z `--fast`, da pregledate hitri načrt.
- **`--fast`** zažene skupna statična vrata, izbrane spremenjene datoteke `node:test` pod `tests/unit/` in `npm run test:vitest`. Pri uporabi hitrega načina vsaj enkrat na dan zaženite popolno lokalno preverjanje zbrane napitnine.
- **Polni način** doda samo polna statična vrata in zažene `npm run test:unit` in `npm run test:vitest`.

Okvarjena statična vrata se znova zaženejo na nedotaknjeni podlagi, če je osnovna sonda na voljo. Skript poroča o podedovanih napakah in se nadaljuje, ko se vsaka prepoznana vrstica kršitve pojavi tudi na osnovi in skupno število ni naraslo.

| Izhod | Pomen                                                                                                                         |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| `0`   | Natisnil načrt ali dokončal zbirko. Povzetek zbirke navaja vse podedovane statične napake in izvržene PRs.                    |
| `1`   | Neveljavni argumenti, ni preverjanja Git, neuspešen pregled pred tiskom ali PR ni vkrcan.                                     |
| `2`   | Preverjanje zbirke ni uspelo in se ni štelo za podedovano. Operater lahko razpolovi serijo, izvrže motnjo PR in znova zažene. |

Lokalna izkaznica nudi diagnostične dokaze samo za lastnikovo dokumentacijo. Vsak pristanek še vedno zahteva avtorizacijo lastnika, lastna zahtevana preverjanja in razsodbo senčne čakalne vrste, kadar je to primerno.

## Stopnjevanje

- **Po PR.** CI in preverjanja kakovosti izberite na podlagi spremenjenih poti. Koda PRs izvaja hitre prehode kakovosti in vpliva na preizkuse z ločenimi opravili enote in Vitest v CI.
- **Na kandidata v čakalni vrsti.** CI in Quality izvajata celoten profil za sestavljenega kandidata na njegovi čakalni vrsti ref.
- **Na nasvet za izdajo.** Release-Green izvaja hitre trde prehode na potiske, ki se ujemajo z njegovimi filtri poti. Trije načrtovani zagoni na dan uporabijo celotno čiščenje za izdajno vejo.
- **Na izdajo.** Celotna matrika CI vključuje drobce E2E, validacijo paketov, dima za zagon tarballa in preverjanja pokritosti. Oglejte si [kontrolni seznam za izdajo](RELEASE_CHECKLIST.md).

## Predpogoji za novo odjavo za `merge-train.sh`

Preverjanje pred tiskom se izvede pred ustvarjanjem delovnih dreves. Namestite odvisnosti z `npm ci`. Potrdite, da je `node_modules/.bin/tsc` izvedljiv in da `node_modules/node_modules` ni. Preverite, ali `node_modules/.bin/bun --version` uspe.

Če je bila ponamestitev Bun preskočena, zaženite `(cd node_modules/bun && node install.js)`. Doslednost ponudnika in preverjanja znanih simbolov uporabljajo Bun. Validator izvaja `npm run check:cycles:ratchet` kot blokirna vrata. Samostojni ukaz `npm run check:cycles` je priporočljiv.

## Zgodovina

Čakalna vrsta za spajanje Mergify je bila umaknjena 19.11.2026.
