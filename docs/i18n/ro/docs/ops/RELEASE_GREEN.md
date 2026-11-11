# Release-Green: candidate validation and evidence (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observă un anumit commit și raportează rezultatele validării acestuia. [Referința Quality Gates](../architecture/QUALITY_GATES.md) definește profilurile actuale CI, verificările necesare și politica de acceptare. [Politica de admitere](../../config/quality/admission-policy.json) versionată este contractul executabil pentru `Gate / CI` și `Gate / Quality`.

## CI și domeniul de aplicare al observatorului

`ci.yml` și `quality.yml` acoperă solicitările de tragere în ramurile principale și de eliberare. Profilul selectat determină ce locuri de muncă se aplică. CI complet include, de asemenea, benzile pe care o cerere de tragere obișnuită nu le execută. Un rezultat rapid de observator nu poate înlocui acele lucrări, iar un pachet de flux de lucru finalizat nu poate înlocui chitanțele sale.

Construcția de producție aparține CI. Nu există o versiune de consiliere duplicată în `quality.yml`. Artefactele lipsă, lucrările anulate și măsurătorile incomplete nu stabilesc verificarea necesară cu succes. Confirmați baza curentă, șeful și candidatul combinat înainte de a accepta rezultatele.

## Validare locală

Rulați observatorul într-un arbore de lucru deținut după pregătirea dependențelor acestuia. Utilizați arborele [de lucru și protocolul de resurse](WORKTREE_ISOLATION.md) înainte de validarea grea.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Profilul rapid este parțial. Profilul complet verifică cerințele modelate și păstrează bonurile de comandă; nu certifică implementarea și nu înlocuiește controalele găzduite aplicabile. Raportul distinge eșecul de execuție de deriva metrică. Clichetele necesare rămân blocate conform politicii selectate. Nu ridicați o linie de bază doar pentru a obține un rezultat trecător.

## Măturări nocturne și manuale

Rezolvatorii de lansare nocturnă și compatibilitate selectează o ramură de lansare canonică. Această selecție trebuie să se potrivească cu ramura care a declanșat fluxul de lucru, iar suitele folosesc SHA imuabil al evenimentului. Pentru execuția manuală, selectați versiunea dorită în `release_branch` și expediați pe aceeași ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Dispeceratul între ramuri este respinsă înainte de a executa codul selectat. Suitele principale găzduite verificați `main` și verificați dacă SHA său încă se potrivește cu ținta rezolvată înainte de instalare. Dacă principalele mișcări în timpul rezoluției, rulați din nou scanarea incompletă la noua comitere. Nu combinați chitanțele de suită de la diferiți candidați.

## Triajul eșecului și recuperarea

Folosiți incidentul ca index de diagnostic, apoi inspectați rularea exactă, încercarea, pasul eșuat și artefactul. Comparați dovezile de bază și candidate echivalente înainte de a atribui un eșec unui colaborator. Erorile de infrastructură, defectele moștenite, regresiile candidaților și aprobările în așteptare necesită remedii diferite.

Abilitățile `/green-prs`, `/sweep-reds`, `/validate-release-green` și `/babysit` colectează dovezi și pregătesc remedieri conform domeniului lor documentat. Păstrați creditul contribuabilului, utilizați filiale de reparații izolate și verificați toate verificările necesare înainte de o fuziune autorizată. Nicio referință automată sau închiderea incidentului nu înlocuiește un candidat actual care trece.
