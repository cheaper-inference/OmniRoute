# Merge Queue & Manual Merge-Train Runbook (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Aterizare pe o ramură de eliberare

Omni-coada guvernează aterizările în `release/vX.Y.Z`. Citiți `mode` de nivel superior în `config/merge-queue/config.json` pe ramura implicită înainte de a obține un PR. Consultați [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** rulează validarea și lasă aterizarea unei îmbinări manuale. Aplicați `omni-queue` la PR aprobat la capul său final. Verificați eligibilitatea cu `npm run queue -- why <PR>`. Așteptați verdictul pentru acel cap în `npm run queue -- history --base <branch>`. Continuați pe `would-land`. Pe `culprit-found` sau `would-dequeue`, țineți apăsat combinarea și remediați cauza.
- **Excepții în umbră.** Un tren cu CI verde plin împotriva vârfului de bază curent poate continua fără un verdict separat de coadă. Aceeași excepție se aplică atunci când capul PR conține deja vârful de bază curent.
- **`live`** folosește eticheta `omni-queue` pentru a declanșa aterizarea. Numai coada aterizează PR. Lăsați comenzile de îmbinare și împinge direct în coadă.

Fiecare aterizare necesită autorizația proprietarului și verificările necesare aplicabile. Aplicați `omni-queue` numai după ce proprietarul a autorizat aterizarea. PRs pus în coadă care atinge căile protejate necesită, de asemenea, decizia `protected-approved` a proprietarului pentru acel PR.

Setul de reguli „Necesită porți verzi pentru lansarea activă” necesită `Gate / CI` și `Gate / Quality` verzi pe cap. Nu utilizați niciodată `--admin` pentru a ocoli o poartă roșie. Blocurile de înghețare de eliberare se îmbină în ramura înghețată. Vezi [Regula 21](HARD_RULES_DETAIL.md). Nu etichetați, îmbinați sau împingeți niciodată la o solicitare de extragere că o altă sesiune funcționează. Vezi [Regula 22](HARD_RULES_DETAIL.md).

## Cererea de tragere a trenului

1. Începeți o ramură de tren la vârful actual al bazei de eliberare. Integrați exact șefii de membri aprobati folosind comite de îmbinare. Păstrează istoricul de comitere evitând squash și rebase.
2. Deschideți o cerere de tragere pentru ramura de tren. Validați acel PR cu propriul CI complet pe vârful de bază curent. Verificați din nou vârful bazei și capetele membrelor aprobate înainte de aterizare. Actualizează trenul și CI său atunci când candidatul validat se schimbă.
3. Aterizați trenul PR cu un commit de îmbinare în modul de coadă aplicabil. În modul live, metoda de aterizare `merge-ff` a cozii păstrează comiterile de îmbinare. Capetele de membru original devin accesibile din ramura de lansare. GitHub marchează membrul PRs ca fuzionat și commit-urile își păstrează autorii.

Un exemplu public este [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). A combinat 18 membri PRs și a aterizat cu un commit de fuziune pe 2026-11-24.

O sincronizare înapoi de la `main` la următoarea ramură de lansare ajunge, de asemenea, printr-o comitere de îmbinare. Păstrarea ascendenței `main` este necesară pentru sincronizările ulterioare. Consultați [Izolarea arborelui de lucru](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Validatorul local de îmbinare-tren

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validatorul preia capetele de bază și PR și le combină într-un arbore de lucru de unică folosință. Își rulează suita de paritate o dată pe arborele rezultat. Un conflict de preluare sau de îmbinare a capului eșuat ejectează acel PR și scriptul continuă cu PRs rămas.

- **`--plan`** imprimă pașii modului selectat și iese fără a crea un arbore de lucru sau a contacta telecomanda. Combină-l cu `--fast` pentru a inspecta planul rapid.
- **`--fast`** rulează porțile statice comune, fișierele `node:test` modificate selectate sub `tests/unit/` și `npm run test:vitest`. Rulați o validare locală completă cel puțin o dată pe zi pe vârful acumulat atunci când utilizați modul rapid.
- **Modul complet** adaugă porțile statice complete și rulează `npm run test:unit` și `npm run test:vitest`.

O poartă statică eșuată este reluată pe baza neatinsă dacă sonda de bază este disponibilă. Scriptul raportează eșecurile moștenite și continuă atunci când fiecare linie de încălcare recunoscută apare și pe bază și numărul total nu a crescut.

| Ieșire | Sens                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `0`    | A tipărit planul sau a finalizat suita. Rezumatul suitei listează toate erorile statice moștenite și PRs ejectat.              |
| `1`    | Argumente nevalide, nicio verificare Git, verificare prealabilă eșuată sau PR îmbarcat.                                        |
| `2`    | O verificare a sumei nu a reușit și nu s-a calificat ca moștenit. Operatorul poate diviza lotul, ejecta PR ofensator și relua. |

Un permis local oferă dovezi de diagnosticare numai pentru dosarul proprietarului. Fiecare aterizare necesită încă autorizarea proprietarului, propriile verificări necesare și verdictul din coada umbră, atunci când este cazul.

## Nivelare

- **Per PR.** CI și Verificări de selectare a calității pe baza căilor modificate. Code PRs rulează rapid porți de calitate și teste de impact, cu unități separate și joburi Vitest în CI.
- **Pe candidat la coadă.** CI și Quality rulează profilul complet pentru candidatul compus din lista sa de ref.
- **Per vârf de eliberare.** Release-Green rulează porți rapide și dure la împingeri care se potrivesc cu filtrele sale de cale. Trei execuții programate pe zi folosesc întregul sweep pentru ramura de lansare.
- **Per lansare.** Matricea completă CI include fragmente E2E, validarea pachetului, fumul de cizme tarball și verificări de acoperire. Consultați [Lista de verificare a lansării](RELEASE_CHECKLIST.md).

## Cerințe preliminare pentru proaspăt achiziție pentru `merge-train.sh`

Verificarea prealabilă rulează înainte de a crea arbori de lucru. Instalați dependențe cu `npm ci`. Confirmați că `node_modules/.bin/tsc` este executabil și că `node_modules/node_modules` este absent. Verificați dacă `node_modules/.bin/bun --version` reușește.

Dacă postinstalarea Bun a fost omisă, rulați `(cd node_modules/bun && node install.js)`. Consecvența furnizorului și verificările simbolurilor cunoscute folosesc Bun. Validatorul rulează `npm run check:cycles:ratchet` ca o poartă de blocare. Comanda `npm run check:cycles` autonomă este consultativă.

## Istorie

Coada de îmbinare Mergify a fost retrasă pe 2026-11-19.
