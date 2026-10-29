# Self-Hosted Runner Box Operations (.113 pool) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

מאגר ה־self-hosted פועל על השרת **.113** (`tomni-proxmox-113`). מאז 2026-10-18 לכל
runner של OmniRoute יש **תפקיד אחד**, תווית אחת ותקציב זיכרון/CPU המותאם לצריכה שנמדדה
בעומס העבודה שלו. המשבצת של Turbopack מקבלת את המשאבים שהבנייה דורשת; שאר המשבצות מותאמות
לשיאים שנמדדו בהן. הקצאת יתר בשרת מתרחשת רק כאשר בניית Turbopack חופפת לבניית webpack של
Release-Green ולמשימת lint; זיכרון ה־swap של המארח (16 GB) סופג זאת, ומכיוון שבניות של בקשות משיכה
רצות על תשתית מתארחת, משבצת Turbopack אינה פעילה רוב הזמן:

| runner               | תווית          | תפקיד                                                                                                                                                     | `MemoryHigh` / `MemoryMax`    | `CPUQuota`    |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `omniroute-113-5`    | `omni-build`   | בניות Turbopack:‏ `ci.yml` `Build` (עבור push/dispatch בלבד), Docker amd64,‏ `npm-publish`,‏ `nightly-v4-build`,‏ `preview-artifact`, בניית ה־a11y הלילית | 56 GB / 60 GB (ללא swap)      | 1600 %        |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), בניית webpack                                                                                             | 20 GB / 24 GB (‏swap של 4 GB) | 800 %         |
| `omniroute-113-2`    | `omni-light`   | משימות ליליות (Schemathesis,‏ promptfoo,‏ garak,‏ k6) ו־`quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (‏swap של 4 GB) | 600 %         |
| `omniroute-113`      | `omni-light`   | אותו מאגר כמו לעיל                                                                                                                                        | 8 GB / 12 GB                  | 400 %         |
| OmniHeuris, OmniMind | (המאגרים שלהם) | Dependabot בלבד (שיא של 155 MB לכל אחד, 2026-10-18)                                                                                                       | 4 GB / 6 GB                   | 200 % לכל אחד |

נמדד ב־2026-10-18:

| משאב      | ערך                         | משמעות לתזמון                                                                                                                                                                                                                                                                                                                                                           |
| --------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 ליבות**        | בניית ייצור של Turbopack הגיעה לשיא של 49 GB ללא הגבלה (`tests/unit/ci-build-bundler-webpack.test.ts`); ב־Next 16.3.8 שלב הקומפילציה לבדו מחזיק כ־40 GB (‏36 GB של RSS ב־`next-build` ועוד 17 תהליכי loader בהיקף של 3 GB, נמדד ב־2026-10-18); בניית webpack צורכת כ־14–16 GB. בניית Turbopack אחת ובניית webpack אחת יכולות לפעול יחד; שתי בניות Turbopack אינן יכולות |
| swap      | 16 GB                       | `omniroute-113-5` פועל כאשר swap מושבת (`MemorySwapMax=0`), כך שבנייה שיצאה משליטה נעצרת בגבול שלה במקום לגרום לשרת להשתמש ב־swap                                                                                                                                                                                                                                       |
| `/tmp`    | **tmpfs של 12 GB = RAM**    | כל דבר שמאוחסן שם צורך זיכרון; שאריות נמחקות לאחר 3 שעות                                                                                                                                                                                                                                                                                                                |
| CPU       | נצפה עומס של 60 על 32 ליבות | לפני המכסות, בניית Turbopack אחת (כ־1166 % CPU) יחד עם חבילת בדיקות כיסוי באותו שרת מנעו את אותות החיים של המאזינים האחרים (`The self-hosted runner lost communication`,‏ #16853)                                                                                                                                                                                       |
| runners   | **7 מאזינים** (2026-10-28)  | 5 של OmniRoute +‏ OmniHeuris +‏ OmniMind;‏ `omniroute-113-7` נושא גם את `omni-build`;‏ `omniroute-113-3/-4/-8` נמחקו מהמאגר (2026-10-28)                                                                                                                                                                                                                                |

ההגבלות נמצאות בקובץ `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` של כל יחידה
(הערכים הקודמים נשמרו בשם `override.conf.bak-20261018`) והוחלו בזמן אמת באמצעות
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — ללא הפעלה מחדש, ולכן
אף משימה פעילה לא הושפעה. התוויות משתנות באמצעות API ה־runners (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), גם כן בזמן אמת.

## התקנת המנקה (פעם אחת, בשרת)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): כל 30 דקות, רישום אל /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

נדרש `lsof`: המנקה מוודא שנתיב אינו בשימוש באמצעות תמונת מצב אחת של קבצים
פתוחים לפני הסרתו, ובהיעדר הכלי הוא אינו מסיר דבר ומדווח על כך
(exit 1). נסו תחילה כל שינוי עם `--dry-run` — הוא מדפיס בדיוק מה היה
עושה ואינו משנה דבר.

מה הוא עושה בכל הפעלה: מנקה את השאריות שלנו (`runner-*`,‏ `omniroute-*`,
‏`next-build*`,‏ `e2e-build.tar.gz`) לאחר **3 שעות ב-tmpfs** ולאחר 24 שעות בדיסק
`_work/_temp`; מפסיק `next-build` שגילו עולה על 75 דקות (אף משימה אינה רצה זמן רב כל כך — ב-
2026-08-27 אחת מהן רצה במשך 70 דקות לאחר ש-GitHub הכריז שהמשימה שלה אבדה); מסיר עותקי עבודה
בני 48 שעות של runners שהיחידה שלהם **מופסקת**; מתריע כאשר ניצולת הדיסק ≥ 85%,‏ memory PSI
‏`full/avg60` ≥ 10%, וכאשר מספר המאזינים גדול מ-`MAX_ACTIVE_RUNNERS` (עם
פילוח ל-omniroute/אחרים). Exit 1 = נדרשת תשומת לב; קראו את יומן הרישום.

כלל 75 הדקות אינו מזהה בנייה ש-GitHub כבר ויתר על המשימה שלה. כאשר
`Runner.Listener` אינו מצליח לחדש את המשימה שלו, `_diag/Runner_*.log` מציג
`POST request to …/renewjob timed out after 100 seconds`, ה-API מדווח שהמשימה `completed`
(כישלון) כעשר דקות לאחר החידוש המוצלח האחרון, ו-`next-build` ממשיך לפעול
ללא משימה משויכת (2026-10-18: הבנייה של #17066 סומנה ככושלת ב-19:43, והבנייה שלה עדיין
החזיקה 40 GB חמש דקות לאחר מכן). אמתו את ה-ref בקובץ `_diag/Worker_*.log` החדש ביותר, ואז
שלחו SIGTERM רק לעץ הבנייה לפי PID —‏ `next-build`,‏ `npm run build`,‏ `build-next-isolated.mjs` וכן
ה-workers של `_work`. לעולם אל תגעו ב-`Runner.Listener`,‏ `RunnerService.js` או `Runner.Worker`: ה-
worker מדווח שהמשימה בוטלה, וה-listener חוזר למצב מקוון בעצמו.

## יחידות Runner:‏ KillMode

ברירת המחדל של ה-runner,‏ `KillMode=process`, משאירה את
`Runner.Worker → npm → next-build` פעילים כאשר יחידה מופסקת או מופעלת מחדש — בנייה יתומה
ממשיכה לצרוך RAM ו-CPU ללא משימה משויכת. לכל יחידת OmniRoute יש קובץ drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
עם `KillMode=mixed`:‏ SIGTERM נשלח תחילה ל-listener, ולאחר מכן SIGKILL לכל ה-cgroup בנקודת
`TimeoutStop`. ההגדרה נכנסת לתוקף בהפעלה מחדש הבאה של היחידה — הפעילו מחדש **runner אחד
בכל פעם, ורק כשהוא אינו פעיל**, כאשר בדיקת חוסר הפעילות וההפעלה מחדש נמצאות באותה פקודה.

## כללי תפעול

- **בניית Turbopack אחת בכל רגע — נאכף באמצעות label.** כל job שמריץ
  `next build` מלא עם Turbopack מכוון אל `[self-hosted, omni-build]`, ורק **`omniroute-113-5`**
  נושא את ה-label הזה: `ci.yml` `Build`,‏ `npm-publish.yml` `publish`,‏ `nightly-v4-build`,‏
  `preview-artifact`, בניית ה-a11y הלילית (#16853) ו-**amd64** של `docker-publish.yml`
  (webpack בתוך BuildKit —‏ Turbopack קרס שם, ריצה 33253576569). שלב ה-Docker של arm64 נשאר על
  `ubuntu-24.04-arm`. שלב amd64 של `docker-publish` חולק את קבוצת המקביליות
  `heavy-build-main` עם `Build` של `ci.yml`‏ (`cancel-in-progress: false`). Docker Engine חייב
  להיות על `omniroute-113-5`. משבצת Turbopack שנייה אינה נכנסת ב-78 GB‏ (2 × 33–37 GB ועוד
  שאר העומס במכונה); משבצת שנייה בטוחה רק לבניות webpack.
- **בניות של בקשות משיכה רצות על תשתית מתארחת (2026-10-18).** `Build` של `ci.yml` מגיע אל
  `omni-build` רק עבור `push` ו-`workflow_dispatch`; כל `Build` של `pull_request` (מאותו מקור
  או מ-fork) ושל `merge_group` רץ על `ubuntu-latest` עם webpack. כאשר כל PR מאותו מקור נותב
  למשבצת, בניית Turbopack החזיקה אותה במשך 29–58 דקות, 18 בניות המתינו בתור עד 18 שעות,
  ובניית ה-push של ענף השחרור עצמו קיבלה את המשבצת פעם אחת בלבד מתוך 40 jobs. בתשתית
  המתארחת, אותה בניית PR אורכת 8–12 דקות לצד שאר ה-jobs של ה-PR. ‏Turbopack, ה-bundler
  שמופץ על ידי `npm-publish`, ממשיך להיבדק בענף השחרור באמצעות בניית ה-a11y הלילית של ענף
  ברירת המחדל (04:41 UTC), באמצעות כל בניית push או dispatch שמגיעה למשבצת, ובאמצעות
  `npm-publish` עצמו. `tests/unit/build/heavy-build-queue.test.ts` מקבע את התנאי בן ארבעת
  הסעיפים.
- **לעולם אין להקטין את משבצת Turbopack מתחת לצורך שנמדד עבורה.** ב-2026-10-18 בשעה 18:06
  המשבצת הוקטנה מ-56G/60G ל-40G/44G כדי לפנות מקום עבור `omni-release`. שלב הקומפילציה נשאר
  ב-`MemoryHigh` לאורך כל הריצה (memory PSI ‏`full` של 30–43%), ו-`Runner.Listener`, שחולק
  את ה-cgroup, לא הצליח לחדש את ה-job שלו. ערכי ה-56G/60G של הבעלים מ-2026-10-17 שוחזרו
  באותו היום. מתחת לערך הזה הבנייה אינה נכשלת; היא נכנסת ל-thrashing, וה-job אובד.
- **ל-Release-Green יש משבצת משלו (2026-10-18).** עד אז שתי בדיקות ה-Release-Green רצו על
  `omni-build`: בכל push (כ-10 בשעה, 97 מתוך 100 ריצות push בוטלו באמצע העבודה ביום אחד)
  ובשלוש סריקות מלאות של כשעתיים ביום (הסריקה של 05:29 המתינה 6 שעות למשבצת) — משבצת הבנייה
  היחידה הייתה בעומס יתר של פי כמה, ובניות PR מאותו מקור המתינו במשך שעות.
  `release-green` ו-`main-green` מכוונים כעת אל `omni-release` (רק `omniroute-113-6`) עם
  `OMNIROUTE_USE_TURBOPACK=0`, וריצה שכבר התחילה אינה מבוטלת עוד על ידי push חדש יותר
  (המשבצת הממתינה עדיין מאחדת את סערת הריצות). `tests/unit/build/runner-capacity-routing.test.ts`
  מקבע את הניתוב, את המעבר ל-webpack ואת העובדה ששום דבר על `omni-release` אינו נבנה עם
  Turbopack.
- **המאגר הקל: `omni-light`.** `omniroute-113` ו-`omniroute-113-2` מריצים את המשימות הליליות
  שזקוקות ל-`next build` של ה-backend בלבד (כ-5–6 GB;‏ webpack) ואת `lint-guard` של
  `quality.yml`. ל-`omniroute-113` היה `MemoryHigh=4G` עד 2026-10-18 — בניית promptfoo
  בילתה שם 54 דקות בפינוי זיכרון; 8 GB מבטלים את ההאטה.
- **פחות listeners בכוונה.** ארבע יחידות OmniRoute הושבתו ב-2026-08-29 — כל listener נוסף
  הוא צרכן נוסף של תקציב הזיכרון שלעיל. התקרה של ה-janitor היא 8 (`MAX_ACTIVE_RUNNERS=8` ב-cron): הוא סופר
  כל `Runner.Listener` במכונה, ו-OmniHeuris + OmniMind מוסיפים שניים לחמישה שלנו.
- **משימות ה-unit וה-Vitest נשארות מתארחות.** `ci.yml` שולח את רסיסי ה-unit שלו ואת משימת ה-Vitest אל `[self-hosted, omni-ci]` רק כאשר משתנה המאגר `vars.USE_VPS_TEST_RUNNER` הוא `true`, וגם אז רק להרצות `pull_request` מאותו מאגר; פיצולים (forks), `merge_group` ודחיפות נשארים על `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). המשתנה הוא `false`. ב-2026-10-28 שלושה מאזיני `omni-ci` בני 4 ליבות נזקקו ל-250–270 שניות עבור `npm ci`, וכל רסיס unit הגיע למגבלת המשימה של 30 דקות, לעומת ~634 שניות לרסיס מתארח, כשהעומס על המכונה היה 17–24. המאזינים נמחקו. אין להפעיל את המשתנה מחדש בלי מאזינים בגודל המתאים לרסיס unit.
- **לעולם אין לנקות ידנית את `/tmp` או את `_work` בזמן ש-runner כלשהו עסוק.**
  בדיקה ולאחריה מחיקה, עם מרווח בין השתיים, היא הדרך שבה job פעיל של Build איבד את
  `_work` שלו ב-2026-08-27. ה-janitor מבצע את הבדיקה ואת ההסרה בשלב אחד;
  הניחו לו לעשות זאת.
- עצירת runner באמצע job מבטלת את ה-job (כפי שנצפה בזמן אמת): יש לבצע `systemctl stop` רק
  כאשר ל-listener שלו אין תהליך צאצא `Runner.Worker` — ויש לעשות זאת בפקודה אחת.
- אסור ל-workflows להחנות ארטיפקטים ב-`/tmp` (הוא נמצא ב-RAM). יש להוריד אל
  `$RUNNER_TEMP` (על הדיסק, בנפרד לכל runner) — לארטיפקט `next-build` בנפח 1.3 GB נדרשו
  27–32 דקות כדי להגיע ל-tmpfs ו-2 דקות כדי לעלות מהדיסק.
- ה-VPS ‏`.15` מיועד להומולוגציה בלבד — לעולם אינו מריץ runners של CI.

## מסלול מתארח (רצים המתארחים ב-GitHub)

המאגר שייך לארגון `cheaper-inference`, בתוכנית **Team**: **60 משימות מתארחות בו-זמנית**, המשותפות לכל המאגרים בארגון, לכל בדיקות ה-PR, לכל תהליך עבודה שמופעל בדחיפה ולהגדרת ברירת המחדל של CodeQL. הנתונים שלהלן נמדדו בתוכנית **Pro** (40 משימות מתארחות בו-זמנית). במדידה שנערכה ב-2026-10-18 במהלך
מסע מיזוגים (כ-10 מיזוגים בשעה אל `release/v3.8.52`): **2,500 הרצות של תהליכי עבודה נוצרו בתוך
24 שעות**, 44 דחיפות לענף בתוך 6 שעות, ו-**106 משימות מתארחות המתינו בתור** בזמן שבדיקות PR המתינו
שעות ופריטי PR מוזגו בלעדיהן. תשעה תהליכי עבודה הופעלו בכל דחיפה לענף:

| בכל דחיפה אל `release/v*`                   | משימות מתארחות | התוצאה במהלך העומס                                              | מאז 2026-10-18                                                          |
| ------------------------------------------- | -------------: | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `ci.yml` (מטריצה מלאה)                      |          עד 30 | בוטל בעקבות הדחיפה הבאה, 24 מתוך 24 ביום                        | אינו מופעל בדחיפות אל `release/**` (הרצת PR + Release-Green)            |
| `quality.yml`                               |             ~6 | בוטל, 23 מתוך 23                                                | אינו מופעל בדחיפות אל `release/**`                                      |
| `Release-Green` `--quick`                   |              0 | רץ על `omni-build`, בוטל ב-97 מתוך 100                          | משבצת `omni-release`, לעולם אינו מבוטל, הרצה ממתינה מתמזגת              |
| `Lock released branch`, `OpenSSF Scorecard` |              2 | הרצה אחת בתור לכל דחיפה                                         | הרצה אחת לכל הפניה (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (דוח צל)               |              1 | `npm ci` מתארח אחד לכל דחיפה, לעולם אינו מבוטל                  | ללא שינוי — מועמד למסנן `paths:`                                        |
| `Publish to Docker Hub` → `Deploy to VPS`   |              2 | מבוטל בכל דחיפה; זרוע amd64 מתחרה על `omni-build`               | ללא שינוי — ערוץ הפריסה של הבעלים                                       |
| הגדרת ברירת המחדל של CodeQL (`dynamic`)     |              4 | `javascript-typescript`, `actions`, `c-cpp`, `python` בכל דחיפה | ללא שינוי — הגדרות → אבטחת קוד; `c-cpp`/`python` אינם סורקים כאן דבר    |

`tests/unit/build/push-storm-diet.test.ts` מקבע את טריגר הדחיפה ל-`main` בלבד של `ci.yml` ושל
`quality.yml`. תופעת לוואי: Codecov אינו מקבל עוד העלאת בסיס בכל דחיפת גרסה (השלב מיועד למידע
ומוגדר עם `continue-on-error`); שער הכיסוי שבמאגר וההערה ב-PR אינם מושפעים.

**קיבולת נוספת באירוח עצמי אינה פותרת את התור המתארח.** תיבת הפיתוח
(`devbox-vm-06-dev002`,‏ 24 vCPU / 54 GB) יכולה לארח רץ, אך הפעלות הסוכנים כבר
מחזיקות את העומס שלה ברמה של 20–26, לקונטיינר הסוכן אין דמון Docker, והמסלול הרווי
הוא המסלול המתארח. בתיבה `.113` היו באותו רגע 71 GB פנויים ועומס של 5–8; האילוץ שלה
הוא תקציב הזיכרון לכל מאזין שצוין לעיל (תקרה של 6 מאזינים), ולא המעבד. המנופים שנותרו
הם תהליכיים: להכניס פריטי PR של מסע המיזוגים דרך התור של Mergify (`label=queue`), כך שאצוות
יחלקו הרצת CI יחידה מסוג `merge_group` במקום הרצה אחת לכל PR ועוד אחת לכל דחיפה; לצמצם את
השפות בהגדרת ברירת המחדל של CodeQL; ולסנן את `release-acceptance.yml` לפי הקבצים שהוא קורא.
