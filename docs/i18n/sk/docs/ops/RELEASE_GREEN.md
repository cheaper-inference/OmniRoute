# Release-Green: candidate validation and evidence (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green sleduje konkrétne odovzdanie a oznamuje výsledky jeho overenia. [Referencia Quality Gates](../architecture/QUALITY_GATES.md) definuje aktuálne profily CI, požadované kontroly a politiku akceptácie. Verzívna [politika prijatia](../../config/quality/admission-policy.json) je vykonateľná zmluva pre `Gate / CI` a `Gate / Quality`.

## CI a rozsah pozorovateľa

`ci.yml` a `quality.yml` pokrývajú požiadavky na stiahnutie do hlavnej a uvoľnenej vetvy. Vybratý profil určuje, ktoré úlohy sa použijú. Úplné CI zahŕňa aj pruhy, ktoré obyčajná požiadavka na stiahnutie nevykoná. Výsledok rýchleho pozorovateľa nemôže nahradiť tieto úlohy a dokončený obal pracovného toku nemôže nahradiť jeho príjmy.

Produkčná zostava patrí CI. V `quality.yml` nie je žiadna duplicitná zostava poradenstva. Chýbajúce artefakty, zrušená práca a neúplné merania nezakladajú úspešnú požadovanú kontrolu. Pred prijatím výsledkov potvrďte aktuálnu základňu, hlavu a kombinovaného kandidáta.

## Lokálne overenie

Spustite pozorovateľa vo vlastnom pracovnom strome po príprave jeho závislostí. Pred náročným overovaním použite [protokol pracovného stromu a prostriedkov](WORKTREE_ISOLATION.md).

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Rýchly profil je čiastočný. Úplný profil kontroluje svoje modelované požiadavky a uchováva potvrdenia o príkazoch; necertifikuje nasadenie ani nenahrádza príslušné hostované kontroly. Prehľad rozlišuje zlyhanie vykonania od posunu metrík. Požadované račne zostávajú blokované podľa zvolenej politiky. Nezvyšujte základnú líniu len preto, aby ste dosiahli prechodný výsledok.

## Nočné a manuálne zametanie

Nočné uvoľňovanie a rozkladače kompatibility vyberajú vetvu kanonického vydania. Tento výber sa musí zhodovať s vetvou, ktorá spustila pracovný tok, a sady používajú nemenné SHA udalosti. Ak chcete vykonať manuálne vykonanie, vyberte zamýšľané vydanie v `release_branch` a odošlite ho s rovnakým číslom:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Odoslanie medzi pobočkami je odmietnuté pred vykonaním zvoleného kódu. Hosťované hlavné sady si pred inštaláciou overia SHA `main` zhoduje s vyriešeným cieľom. Ak sa počas riešenia pohne hlavná časť, zopakujte neúplné zametanie pri novom odovzdaní. Nekombinujte účtenky od rôznych kandidátov.

## Triedenie a zotavenie zlyhaní

Použite incident ako diagnostický index a potom skontrolujte presný priebeh, pokus, neúspešný krok a artefakt. Pred pripísaním zlyhania prispievateľovi porovnajte ekvivalentnú základňu a dôkazy kandidátov. Chyby infraštruktúry, zdedené defekty, regresie kandidátov a čakajúce schválenia vyžadujú rôzne nápravné opatrenia.

Zručnosti `/green-prs`, `/sweep-reds`, `/validate-release-green` a `/babysit` zbierajú dôkazy a pripravujú opravy v rámci svojho zdokumentovaného rozsahu. Uchovajte si kredit prispievateľa, používajte izolované pobočky opravy a overte všetky požadované kontroly pred autorizovaným zlúčením. Žiadna automatická prestavba alebo ukončenie incidentu nenahrádzajú prechádzajúceho aktuálneho kandidáta.
