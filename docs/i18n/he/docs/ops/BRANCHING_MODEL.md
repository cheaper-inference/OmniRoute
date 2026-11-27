# Branching & Release Model (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/BRANCHING_MODEL.md) · 🇪🇹 [am](../../../am/docs/ops/BRANCHING_MODEL.md) · 🇸🇦 [ar](../../../ar/docs/ops/BRANCHING_MODEL.md) · 🇦🇿 [az](../../../az/docs/ops/BRANCHING_MODEL.md) · 🇧🇬 [bg](../../../bg/docs/ops/BRANCHING_MODEL.md) · 🇧🇩 [bn](../../../bn/docs/ops/BRANCHING_MODEL.md) · 🇧🇦 [bs](../../../bs/docs/ops/BRANCHING_MODEL.md) · 🇨🇿 [cs](../../../cs/docs/ops/BRANCHING_MODEL.md) · 🇩🇰 [da](../../../da/docs/ops/BRANCHING_MODEL.md) · 🇩🇪 [de](../../../de/docs/ops/BRANCHING_MODEL.md) · 🇬🇷 [el](../../../el/docs/ops/BRANCHING_MODEL.md) · 🇪🇸 [es](../../../es/docs/ops/BRANCHING_MODEL.md) · 🇪🇪 [et](../../../et/docs/ops/BRANCHING_MODEL.md) · 🇮🇷 [fa](../../../fa/docs/ops/BRANCHING_MODEL.md) · 🇫🇮 [fi](../../../fi/docs/ops/BRANCHING_MODEL.md) · 🇫🇷 [fr](../../../fr/docs/ops/BRANCHING_MODEL.md) · 🇮🇪 [ga](../../../ga/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [gu](../../../gu/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ha](../../../ha/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [hi](../../../hi/docs/ops/BRANCHING_MODEL.md) · 🇭🇷 [hr](../../../hr/docs/ops/BRANCHING_MODEL.md) · 🇭🇺 [hu](../../../hu/docs/ops/BRANCHING_MODEL.md) · 🇦🇲 [hy](../../../hy/docs/ops/BRANCHING_MODEL.md) · 🇮🇩 [id](../../../id/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [ig](../../../ig/docs/ops/BRANCHING_MODEL.md) · 🇮🇹 [it](../../../it/docs/ops/BRANCHING_MODEL.md) · 🇯🇵 [ja](../../../ja/docs/ops/BRANCHING_MODEL.md) · 🇬🇪 [ka](../../../ka/docs/ops/BRANCHING_MODEL.md) · 🇰🇭 [km](../../../km/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [kn](../../../kn/docs/ops/BRANCHING_MODEL.md) · 🇰🇷 [ko](../../../ko/docs/ops/BRANCHING_MODEL.md) · 🇱🇹 [lt](../../../lt/docs/ops/BRANCHING_MODEL.md) · 🇱🇻 [lv](../../../lv/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ml](../../../ml/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [mr](../../../mr/docs/ops/BRANCHING_MODEL.md) · 🇲🇾 [ms](../../../ms/docs/ops/BRANCHING_MODEL.md) · 🇲🇹 [mt](../../../mt/docs/ops/BRANCHING_MODEL.md) · 🇲🇲 [my](../../../my/docs/ops/BRANCHING_MODEL.md) · 🇳🇵 [ne](../../../ne/docs/ops/BRANCHING_MODEL.md) · 🇳🇱 [nl](../../../nl/docs/ops/BRANCHING_MODEL.md) · 🇳🇴 [no](../../../no/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [or](../../../or/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [pa](../../../pa/docs/ops/BRANCHING_MODEL.md) · 🇵🇭 [phi](../../../phi/docs/ops/BRANCHING_MODEL.md) · 🇵🇱 [pl](../../../pl/docs/ops/BRANCHING_MODEL.md) · 🇵🇹 [pt](../../../pt/docs/ops/BRANCHING_MODEL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/BRANCHING_MODEL.md) · 🇷🇴 [ro](../../../ro/docs/ops/BRANCHING_MODEL.md) · 🇷🇺 [ru](../../../ru/docs/ops/BRANCHING_MODEL.md) · 🇱🇰 [si](../../../si/docs/ops/BRANCHING_MODEL.md) · 🇸🇰 [sk](../../../sk/docs/ops/BRANCHING_MODEL.md) · 🇸🇮 [sl](../../../sl/docs/ops/BRANCHING_MODEL.md) · 🇷🇸 [sr](../../../sr/docs/ops/BRANCHING_MODEL.md) · 🇸🇪 [sv](../../../sv/docs/ops/BRANCHING_MODEL.md) · 🇰🇪 [sw](../../../sw/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [ta](../../../ta/docs/ops/BRANCHING_MODEL.md) · 🇮🇳 [te](../../../te/docs/ops/BRANCHING_MODEL.md) · 🇹🇭 [th](../../../th/docs/ops/BRANCHING_MODEL.md) · 🇹🇷 [tr](../../../tr/docs/ops/BRANCHING_MODEL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/BRANCHING_MODEL.md) · 🇵🇰 [ur](../../../ur/docs/ops/BRANCHING_MODEL.md) · 🇺🇿 [uz](../../../uz/docs/ops/BRANCHING_MODEL.md) · 🇻🇳 [vi](../../../vi/docs/ops/BRANCHING_MODEL.md) · 🇳🇬 [yo](../../../yo/docs/ops/BRANCHING_MODEL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/BRANCHING_MODEL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/BRANCHING_MODEL.md)

---

OmniRoute משתמש ב-a** מחזור מקביל** מודל שחרור: ענף `release/vX.Y.Z` ייעודי למחזור הפעיל, `main` לקו שפורסם ותג `vX.Y.Z` בלתי ניתן לשינוי כאשר מחזור זה יישלח. לראות מתחייב נוחת על `release/*` _and_ על `main` צפוי — לא ערבוב.

פרט המשמר חי ב- `CLAUDE.md` (הכלל הקשה #21) וב- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md). דף זה הוא הסיכום הפונה לתורמים ציבוריים.

## במבט חטוף

| הפניה            | תפקיד                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| `release/vX.Y.Z` | **מחזור פעיל** — פיתוח שוטף ומיזוגי PR עבור גרסה זו                      |
| `main`           | **קו שפורסם** — מקבל את המחזור באמצעות squash-merge כאשר הגרסה מופצת     |
| `vX.Y.Z` (תגית)  | **סמן הפצה** — מצביע בלתי ניתן לשינוי המציין „מה הופץ”, ונוצר בזמן ההפצה |

```mermaid
flowchart LR
  A["ענף feat/fix"] --> B["PR → release/vX.Y.Z"]
  B --> C["קצה release/vX.Y.Z"]
  C --> D["ה-PR של ההפצה עובר squash-merge → main"]
  D --> E["תגית vX.Y.Z"]
  C --> F["המחזור הבא: release/vX+1 נוצר מהקצה שהוקפא"]
```

## לאיזה ענף ה-PR שלי צריך לפנות?

**יש להפנות אותו לענף `release/vX.Y.Z` הפעיל — לא ל-`main`.**

1. מצאו את ענף `release/v*` הפתוח בעל הגרסה הגבוהה ביותר (דוגמה בזמן הכתיבה:
   `release/v3.8.49`).
2. צרו ענף מאותו קצה (`git fetch` ולאחר מכן checkout / rebase עליו).
3. פתחו את ה-PR כאשר **base = אותו `release/vX.Y.Z`**.

`main` אינו ענף האינטגרציה השוטף. בדרך כלל יש להפנות מחדש PRs שנפתחו מול `main`
לפני המיזוג.

## שחרור הקפאה (מחזורים מקבילים)

כאשר מהדורה מתאאמת, נפתחת בעיית סמן שכותרתה `release-freeze`. זֶה** לא עוצר את ההתפתחות** :

- `release/vX.Y.Z` הקפואה שייכת לקפטן השחרור של הספינה ההיא.
- ה- `release/vX+1` של המחזור הבא נחתך מהקצה הקפוא כך שהתורמים ממשיכים לנחות.
- פתח PRs שעדיין לכוון את הענף הקפוא צריך להיות** מיקוד מחדש** לסניף `release/v*` הפעיל (הגבוה ביותר).

בדוק אם יש הקפאה פתוחה לפני הנחה שהסניף הרצוי ניתן למיזוג:

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

מכניקת המיזוג (תווית הבעלים `queue` → Mergify) מתועדת ב- [MERGE_TRAIN.md](./MERGE_TRAIN.md).

> **2026-11-19: תור המיזוג של Mergify הופסק** (החלטת הבעלים). `.mergify.yml` כבר לא מגדירה תור ומסרבת לפקודות Mergify שממזגות או משכתבות בקשת משיכה. שחרור PRs מתמזגים ביד תחת ערכת הכללים של המאגר "דרוש שערים ירוקים בשחרור הפעיל" (`Gate / CI` + `Gate / Quality`) עד שה-omni-queue ירוץ במצב חי, ובאמצעות ה-omni-queue לאחר מכן ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). התווית `queue` כבר לא ממזגת שום דבר.

## מדוע נדרשים גם ענף וגם תגית?

| פריט             | משך חיים     | מטרה                                                 |
| ---------------- | ------------ | ---------------------------------------------------- |
| `release/vX.Y.Z` | מחזור בתהליך | אוסף PRs שנבדקו, נשאר תקין ב-CI ומשמש כבסיס ל-PR     |
| תגית `vX.Y.Z`    | לתמיד        | מסמנת את התוכן המדויק שהופץ אל npm / GitHub Releases |

הענף הוא סדנת העבודה; התגית היא החבילה החתומה. לאחר squash-merge אל
`main`, המחזור הבא ממשיך ב-`release/vX+1` בלי להמתין לסיום ה-PR של
ההפצה הקודמת.

## מסמכים קשורים

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — הגדרה, בדיקות ורשימת ביקורת ל-PR
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — אימות לפני הפצה
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — תור מיזוג ורכבת גיבוי
- [RELEASE_GREEN.md](./RELEASE_GREEN.md) — שמירה על תקינות קצה ההפצה
