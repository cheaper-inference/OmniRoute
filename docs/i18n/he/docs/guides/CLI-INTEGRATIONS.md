# CLI Integrations (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

למניפסט ההפעלה המשותף, סביבות ילד מוגבלות והגדרת Gemini מתמשכת, ראה [חוזי השקה של CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute שולחת משפחה של פקודות `setup-*` שמגדירות את הקידוד CLI (Codex, Claude Code, OpenCode, Cline, ...) לשימוש ב- OmniRoute בתור הקצה האחורי שלו - כך שהכלי מדבר אליו** אֶחָד** נתיבי נקודות קצה ו- OmniRoute לספק הנכון עם חזרה אוטומטית. כל פקודה קוראת את** לִחיוֹת** קטלוג דגמים מ- OmniRoute פועל (מקומי או מרוחק) וכותב את קובץ התצורה של הכלי עצמו על** שֶׁלְךָ** מְכוֹנָה. למפתח API מפנה משתנה סביבה בכל מקום שבו הכלי תומך בו. פקודות שנמשכות קובץ סביבה מקומית של כלי מצוינות להלן.

יש גם משגר גנרי - `omniroute run <target>` - שמוליד `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` או `whycodes` עם הזרקת ה-env הנכונה, מבלי לכתוב שום תצורה בכלל. יעדים וכינוייהם מגיעים מהמניפסט הקנוני `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), ו- `omniroute completion` מציע את אותן מילות מטרה שמקורן במניפסט. המשגרים מדור קודם לכל כלי - `omniroute launch` (Claude Code) ו- `omniroute launch-codex` (Codex) - נשארים זמינים.

הצטרפות ספק זמינה מאותו הקשר local/remote. הפקודות של ה-API-ראשונות למטה שומרות על אימות ניהול נפרד מאישורי הספק ולעולם לא מדפיסות אישור בפלט מובנה:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

עבור סקריפטים, העדיפו `--credential-stdin` או `--credential-env`; `--credential` נשמר לשימוש מקומי מבוקר. `providers remove` דורש `--yes` במסוף לא אינטראקטיבי, וכל חמש הפקודות מכבדות את ההקשר הפעיל או את אפשרויות `--base-url`/`--api-key` העולמיות.

בוררי ספקים דוחים קידומות ID, שמות או שמות ספקים מעורפלים; השתמש בחיבור מלא ID כאשר מספר חיבורים תואמים. צור וערוך פקודות לקרוא את החיבור השמור בחזרה, והסרה מוודאת שהוא אינו קריא יותר. ייבוא מדלג על זוג provider/name קיים. ערכים מיובאים אינם יכולים לעקוף את נקודת הקצה, ההקשר או אישורי הניהול שסופקו ל- CLI.

להגדרת הבסיס החד-פעמית בכתב יד של שני האינטגרציות העשירות ביותר, ראה את הצלילות העמוקות לכל כלי:

- [תצורת Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [תצורת Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [מצב מרוחק](./REMOTE-MODE.md) - התקן מרוחק OmniRoute (VPS / Tailnet) מהמחשב הנייד שלך
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) - סיומת OmniCopilot ; זה גם יכול להריץ עבורך את פקודות `setup-*` אלה מתוך העורך

---

## שולחן מאסטר

כל פקודה מכבדת את** הקשר פעיל** (מוגדר עם `omniroute connect`, ראה [מצב מרוחק](./REMOTE-MODE.md) ) או דגלי `--remote <url> --api-key <key>` מפורשים. "מקומי לעומת מרוחק" להלן פירושו: ללא דגלים הוא מכוון `http://localhost:20128`; עם `--remote` (או הקשר מרוחק פעיל) הוא מביא את הקטלוג מאותו שרת וכותב את התצורה באופן מקומי.

| פְּקוּדָה                  | כְּלִי                   | מה זה כותב                                                                                                                                             | דגלי מפתח                                                                                                                                  | מקומי לעומת מרחוק |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI         | `~/.codex/<name>.config.toml` - פרופיל אחד לכל דגם טקסט תואם (`codex --profile <name>`)                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | שְׁנֵיהֶם         |
| `omniroute setup-claude`   | קוד Claude               | `~/.claude/profiles/<name>/settings.json` - פרופיל אחד לכל דגם מותאם (`CLAUDE_CONFIG_DIR`)                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | שְׁנֵיהֶם         |
| `omniroute setup-opencode` | OpenCode (תואם ל-openai) | `~/.config/opencode/opencode.json` - ספק `omniroute` עם כל דגם קטלוגי (`opencode -m omniroute/<model>`)                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | שְׁנֵיהֶם         |
| `omniroute setup-cline`    | Cline                    | `~/.cline/data/{globalState,secrets}.json` (מצב CLI ) + מדפיס הגדרות הרחבת קוד VS                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | שְׁנֵיהֶם         |
| `omniroute setup-kilo`     | קוד קילו                 | `~/.local/share/kilo/auth.json` (CLI) + ממזג את `kilocode.*` לתוך VS Code `settings.json` אם קיים                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | שְׁנֵיהֶם         |
| `omniroute setup-continue` | המשך / `cn` CLI          | `~/.continue/config.yaml` - דגמי `provider: openai`, מפתח דרך `${{ secrets.OMNIROUTE_API_KEY }}`                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שְׁנֵיהֶם         |
| `omniroute setup-cursor`   | Cursor                   | כלום - מדפיס את השלבים בתוך האפליקציה (תצורת Cursor היא SQLite אטומה)                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | שְׁנֵיהֶם         |
| `omniroute setup-roo`      | קוד רו                   | `~/.omniroute/roo-settings.json` (ייבוא מסמך) + מגדיר `roo-cline.autoImportSettingsPath` אם קיים קוד VS `settings.json`                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | שְׁנֵיהֶם         |
| `omniroute setup-crush`    | לִמְחוֹץ                 | `~/.config/crush/crush.json` — `openai-compat`, מפתח דרך `$OMNIROUTE_API_KEY`                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שְׁנֵיהֶם         |
| `omniroute setup-zed`      | Zed                      | `~/.config/zed/settings.json` - ספק `openai_compatible.omniroute` (≤ 25 דגמים בעלי כלים), מפתח דרך `$OMNIROUTE_API_KEY`                                | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | שְׁנֵיהֶם         |
| `omniroute setup-goose`    | אווז                     | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + מדפיס מתכון env                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שְׁנֵיהֶם         |
| `omniroute setup-aider`    | עוזר                     | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + מדפיס מתכון env                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שְׁנֵיהֶם         |
| `omniroute setup-qwen`     | קוד Qwen                 | `~/.qwen/settings.json` — מערך V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` ב- `~/.qwen/.env`                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | שְׁנֵיהֶם         |
| `omniroute setup-5dive`    | 5dive (צי סוכנים)        | שום דבר מתחת `$HOME` - כותב צלילה 5** פרופיל אישור** (`/var/lib/5dive/auth-profiles/<name>/`) דרך `5dive agent auth set`; שורש בלבד, פועל על מארח הצי  | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | שְׁנֵיהֶם         |
| `omniroute setup-whycodes` | WhyCodes                 | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); הנתיב הוא `$WHYCODES_HOME/config.toml` או `~/.whycodes/config.toml`              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שְׁנֵיהֶם         |
| `omniroute run <target>`   | השקה בזמן ריצה (גנרי)    | שום דבר - התחל `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` עם ה-env וה-args הנכונים; Qwen ו- Gemini משתמשים בבית מבודד זמני | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | שְׁנֵיהֶם         |
| `omniroute launch`         | קוד Claude               | שום דבר - מולידה `claude` עם `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` מוזרק                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | שְׁנֵיהֶם         |
| `omniroute launch-codex`   | OpenAI Codex CLI         | שום דבר - מולידה `codex` עם ספק ה- `omniroute` המוזרק באמצעות דגלי `-c`                                                                                | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | שְׁנֵיהֶם         |

הערות על דגלים (מאומת במקור הפקודה):

- `--remote <url>` - אחזר את הקטלוג מ- OmniRoute מרוחק (עוקף `--port` ואת ההקשר הפעיל). `--api-key <key>` מספק את האישור עבור אותו שרת (ברירת המחדל של `OMNIROUTE_API_KEY` env var, או האסימון של ההקשר הפעיל).
- `--only <patterns>` - מחרוזות משנה מופרדות בפסיק; שמור רק דגם IDs שתואם (למשל `--only glm,kimi`). זמין ב- `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` - הדפס בדיוק את מה שייכתב מבלי לגעת במערכת הקבצים. זמין בכל פקודת `setup-*`** אֶלָא** `setup-cursor` (שאף פעם לא כותב קובץ).
- `--model <id>` - נדרש (או נבחר באופן אינטראקטיבי) עבור הכלים שאין להם מודל גילוי אוטומטי: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. כלים אלה מקבלים גם `--yes` עבור ריצות לא אינטראקטיביות (שאחר כך דורש `--model`). `setup-opencode` לוקח את `--model` כדי להגדיר את מודל ברירת המחדל ברמה העליונה.
- `--model <id>` ב- `omniroute run` עוקב אחר החיווט לכל יעד של המניפסט (`bin/cli/cli-manifest.mjs`):** מסייע** מקבל `--model openai/<id>` ו** קוד פתוח** `--model omniroute/<id>` (הקידומת מתווספת רק כאשר המזהה אינו נושא אותו כבר);** qwen** ו** מַזַל תְאוּמִים** לקבל את תעודת הזהות מילה במילה;** קלוד** מקבל את זה דרך `ANTHROPIC_MODEL`,** אווז** דרך `GOOSE_MODEL`,** קודים למה** דרך `-P omniroute -m <id>`, ו** קודקס** דרך `-c model_providers.omniroute.*` args.**Qwen הוא יעד הריצה היחיד שדורש `--model` קשה** — `omniroute run qwen` בלי זה יוצא מ- `2` עם שגיאה מפורשת.
- `--port <port>` - יציאת OmniRoute מקומית (ברירת מחדל `20128`, התעלמה כאשר `--remote` מוגדר). קיים בכל `setup-*` ובשני המשגרים.
- קודי יציאה `omniroute run` : קוד היציאה של הילד CLI עצמו מופץ מילה במילה; `2` = ארגומנטים לא חוקיים (יעד לא נתמך, חסר `--model`, שומר מיכל); `127` = הבינארי היעד אינו ב- `PATH`; `130`/`143`/`129` כאשר ההשקה מסתיימת ב- `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = כישלון הפעלה אחר בזמן ריצה.
- שני המשגרים (`launch`, `launch-codex`) מקבלים `--profile <name>` כדי לבחור פרופיל שנכתב על ידי `setup-claude` / `setup-codex`, בתוספת args מעבר עבור הבינארי הבסיסי `claude` / `codex`.

הבורר האינטראקטיבי משותף גם למתכוני ההגדרה:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` משלחת כעת למתכונים שנבדקו עבור `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ו- `5dive`. ערכי קטלוג IDE בלבד, MITM ומדריך בלבד נשארים זרימות `setup-*`/ידניות מפורשות ואינן מוצגות כיעדים שניתנים להפעלה.

> `setup-opencode` הוא ה** קל משקל תואם openai** אינטגרציה OpenCode. יש גם שילוב תוסף עשיר יותר - `omniroute setup opencode` - שמתקין את `@omniroute/opencode-plugin`. הן פקודות שונות; הטבלה לעיל מסמכים `setup-opencode`.
>
> התוסף מגיע בשתי חבילות, אחת לכל OpenCode major, מכיוון ששני המעמיסים מצפים לנקודות כניסה שונות: `@omniroute/opencode-plugin` עבור OpenCode v1 ו- `@omniroute/opencode-plugin-v2` עבור OpenCode v2. חבילת v2 היא חדשה (`0.1.0`) ועוקבת אחר חוזה מארח שעדיין זז, כך שהיא קוראת את הצורה OpenCode seeds לתוך טיוטת הקטלוג במקום להניח אחת. התקן אותו על ידי הוספת ערך `plugins` ל- `opencode.json`; `omniroute setup opencode` עדיין מתקין את חבילת v1. האפשרויות וסדר חיפוש האישורים נמצאים בחבילה README.

---

## שימוש מקומי

כאשר OmniRoute פועל ב־`localhost:20128`, פשוט הריצו את פקודת ההגדרה עבור
הכלי שלכם. הקטלוג נשלף מהשרת המקומי.

```bash
# Codex: כתיבת פרופיל לכל מודל תואם אל ~/.codex/
omniroute setup-codex
codex --profile glm52            # שימוש בפרופיל שנוצר

# Claude Code: כתיבת פרופילים נפרדים לכל מודל, ולאחר מכן הפעלת אחד מהם
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: כתיבת ספק תואם-openai עם כל מודלי הקטלוג
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # מופנה דרך {env:OMNIROUTE_API_KEY}, לעולם לא נשמר בדיסק
opencode -m omniroute/glm/glm-5.2 "..."

# כלים ללא גילוי אוטומטי דורשים מודל מפורש:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# תצוגה מקדימה בלי לכתוב דבר:
omniroute setup-continue --dry-run
```

הפעלה בלי לכתוב תצורה כלשהי (הזרקת משתני סביבה בלבד):

```bash
omniroute launch                 # Claude Code ← OmniRoute מקומי
omniroute launch-codex           # Codex CLI ← OmniRoute מקומי
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# נתיב פקודה מפורש: העברת כל מה שמופיע אחרי -- כפי שהוא
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## שימוש מרוחק

הפנו כל פקודת הגדרה אל OmniRoute מרוחק באמצעות `--remote` + `--api-key`. הקטלוג
נשלף מהשרת המרוחק; התצורה נכתבת במחשב המקומי שלכם.

```bash
# OpenCode מול VPS מרוחק, תוך שמירת מודלי glm/kimi בלבד
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # יש לייצא תחילה את OMNIROUTE_API_KEY

# פרופילי Codex מקטלוג מרוחק
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# הפעלת CLI ישירות מול השרת המרוחק
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

במקום להעביר את `--remote`/`--api-key` בכל פעם, התחברו פעם אחת ואפשרו
ל**הקשר הפעיל** לספק אותם אוטומטית:

```bash
omniroute connect 192.168.0.15        # מנפיק אסימון מוגבל-הרשאות ושומר את ההקשר
omniroute setup-codex                 # ← כעת משתמש בקטלוג המרוחק
omniroute setup-opencode              # ← כנ"ל
omniroute launch                      # ← Claude Code מול השרת המרוחק
```

ראו [מצב מרוחק](./REMOTE-MODE.md) למידע על הקשרים, היקפי הרשאות וניהול אסימונים.

---

## ציי סוכנים של 5dive

[5dive](https://5dive.ai) מפעיל צי של סוכני תכנות ארוכי-טווח, שכל אחד מהם הוא
יחידת systemd תחת משתמש Unix משלו. הוא אינו CLI לתכנות בפני עצמו, ולכן אין
ל־`omniroute run` מה להפעיל — `5dive` הוא יעד **להגדרה בלבד**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

שתי הצורות כותבות **פרופיל אימות** אחד של 5dive, וכל עמדת `claude` המשויכת
לפרופיל זה מתקשרת לאחר מכן עם OmniRoute. שלושה דברים ייחודיים ליעד זה:

- **הוא פועל במארח הצי, כ־root.** הפקודות של 5dive פועלות על יחידות systemd מקומיות
  ועל ספריית מצב בבעלות root; אין מצב מרוחק. המתכון מפעיל את עצמו מחדש דרך
  `sudo` כאשר הוא עדיין אינו root (`--no-sudo` משבית זאת ומדפיס את
  הפקודה במקום).
- **נקודת הקצה חייבת להיות `https://`, אלא אם היא loopback.** מפתח ה־API של הסוכן
  נשלח בכתובת URL זו בכל בקשה, ו־5dive מסרב לנקודת קצה שאינה מקומית בחיבור טקסט
  גלוי. כתובת LAN פרטית אינה חריגה.
- **קיבוע המודל של כל עמדה מקבל עדיפות על פני הפרופיל.** הפרופיל מכיל את
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, אך עמדה שעדיין מקובעת למזהה
  מודל מובנה נכשלת בפנייה הראשונה שלה עם _"יש בעיה במודל שנבחר"_.
  העבירו `--agent <name>` (ניתן לחזור על האפשרות) כדי לקבע גם את העמדות; המתכון
  מדפיס את הפקודה כאשר אינכם עושים זאת.

מפתח ה־API מועבר אל 5dive דרך **stdin** (`--api-key=-`), ולכן הוא לעולם אינו מופיע
בפלט של `ps`.

הפניית הפרופיל אל **combo** של OmniRoute במקום אל מודל יחיד היא שמספקת לצי
יתירות בעת כשל ספק: כאשר נקודת הקצה הראשית קרסה לחלוטין באמצע פנייה בהרצה שתועדה
ב־[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), הסוכן השלים
את שאר השלבים באמצעות החלופה ומעולם לא חשף את ההשבתה.

---

## מוסכמות בסיס URL (אילו כלים רוצים `/v1`)

OmniRoute חושף את משטח OpenAI ב- `/v1`, את משטח Anthropic בשורש, ומשטח Gemini מקורי ב- `/v1beta`. כל אינטגרציה מחוברת לצורה שהכלי שלו מצפה לו (מאומת במקור הפקודה):

| הִשׁתַלְבוּת                                                               | בסיס URL כתוב | `/v1`?                                    |
| -------------------------------------------------------------------------- | ------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | שׁוֹרֶשׁ      | לא - Cline מוסיף `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | שׁוֹרֶשׁ      | לא - אווז מוסיף את הנתיב                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | שׁוֹרֶשׁ      | לא - LiteLLM מוסיף `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | עם `/v1`      | כֵּן                                      |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | עם `/v1`      | כֵּן                                      |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | שׁוֹרֶשׁ      | לא - קוד Claude מוסיף `/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | עם `/v1`      | כֵּן                                      |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | עם `/v1`      | כֵּן                                      |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | שׁוֹרֶשׁ      | לא - ה- SDK מוסיף `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` בפרופיל האישור)                        | שׁוֹרֶשׁ      | לא - קוד Claude מוסיף `/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | עם `/v1`      | כן - WhyCodes פוסטים `/chat/completions`  |

---

## שמירת תלויות מקוריות בעת עדכון: `--include=optional`

בעת עדכון באמצעות `omniroute update` (לאחר אישור, או עם `--apply`),
OmniRoute מריץ את ההתקנה כאשר `--include=optional` כבר כלול:

```bash
npm install -g omniroute@latest --include=optional
```

זהו **לא** דגל שמעבירים אל `omniroute update` — הוא תמיד מוחל על ידי
מנגנון העדכון. הוא מבטיח שה-`optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, מחסנית ה-SLM של LLMLingua) ישרדו את העדכון גם אם בתצורת npm שלכם
מוגדר `omit=optional`, מצב שאחרת היה משמיט בשקט את מנהל ההתקן המקורי של SQLite
ואת הקישור לצרור המפתחות של מערכת ההפעלה. כדי להציג תצוגה מקדימה של הפקודה המדויקת בלי להחיל אותה:

```bash
omniroute update --dry-run
# [הרצה יבשה] הפקודה שתורץ: npm install -g omniroute@latest --include=optional
```

דגלים נוספים של `omniroute update` (אומתו בקוד המקור): `--check` (יציאה עם קוד 1 אם
הגרסה מיושנת), `--apply` (התקנה ללא בקשת אישור), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI באמצעות `omniroute run gemini`

החוזה אומת מול `@google/gemini-cli` 0.50.0: כלי שורת הפקודה מכבד את
`GOOGLE_GEMINI_BASE_URL` ושולח `POST /v1beta/models/<model>:generateContent`
(וכן `:streamGenerateContent?alt=sse`) אליו — בדיוק ממשק Gemini המקורי של
OmniRoute (`/v1beta`). הפקודה `omniroute run gemini` מגדירה זאת באופן אוטומטי:

- `GOOGLE_GEMINI_BASE_URL` ← כתובת ה-URL הבסיסית הפעילה של OmniRoute (נתיב הבסיס, ללא `/v1`);
- `GEMINI_API_KEY` ← פרטי האימות של OmniRoute לאחר פתרונם (אפשרות/סביבה/הקשר);
- **`GEMINI_CLI_HOME` זמני ומבודד** שקובץ ה-`.gemini/settings.json` שלו
  בוחר באימות `gemini-api-key`, כך שהפעלת Google OAuth שמורה (Code Assist)
  לעולם לא תדרוס הפעלה שמופנית אל OmniRoute — והוא מוסר לאחר היציאה;
- **היגיינת סביבה**: מסביבת תהליך הבן מוסרים `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ו-`GOOGLE_GENAI_USE_GCA` (שהיו מפנים מחדש את
  האימות אל Vertex/Code Assist), ו-`GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  מוגדר כאמצעי גיבוי נוסף — יעדי `run` האחרים מקבלים את אותו
  טיפול עבור המשתנים המתנגשים שלהם;
- הזרקת `--model <id>` מתוך `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

מנגנון האמון בסביבת העבודה של Gemini עדיין חל במצב ללא ממשק משתמש — העבירו
`--skip-trust` (או אשרו אמון בתיקייה באופן אינטראקטיבי) בעצמכם; המפעיל
בכוונה אינו עוקף אותו. מפעיל זה נפרד מ**רישום ה-ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), שנותר אינטגרציית
פרוטוקול הסוכנים עבור `/dashboard/acp-agents`.

---

## סריקת smoke אמיתית (opt-in)

הרצות רגרסיה דטרמיניסטיות של תוכנית ההפעלה מתבצעות ב-CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). כדי לאמת את קובצי ההרצה האמיתיים מול שרת
OmniRoute אמיתי, קיימת רתמת בדיקה אופציונלית ב-
`tests/integration/upstream-cli-smoke.int.test.ts`. היא לעולם אינה פועלת אוטומטית
(כל תת-בדיקה מדולגת אלא אם `RUN_CLI_SMOKE=1`), מעבירה את פרטי ההזדהות באמצעות שם
משתנה סביבה (לעולם לא באמצעות הערך), משחירה מחרוזות בעלות מבנה של מפתח בכל פלט מתועד, מדלגת על
יעדים שקובץ ההרצה שלהם אינו מותקן, ומסווגת כשלים בתור
אימות / upstream / תצורה במקום ערך בוליאני בלבד:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

אופציונלי: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` מגביל את הסריקה;
`OMNIROUTE_SMOKE_TIMEOUT_MS` דורס את פסק הזמן של 120 שניות לכל יעד.

---

## ראו גם

- [תצורת Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — המדריך המעמיק ל-Claude Code
- [תצורת Codex CLI](./CODEX-CLI-CONFIGURATION.md) — ההגדרה הבסיסית החד-פעמית של `[model_providers.omniroute]`
- [מצב מרוחק](./REMOTE-MODE.md) — הקשרים, אסימוני גישה מוגבלים לתחום והפעלת שרת מרוחק
- [חומר עזר לכלי CLI](../reference/CLI-TOOLS.md) — הקטלוג המלא של הכלים הנתמכים ועמודי לוח הבקרה
- [מדריך התקנה](./SETUP_GUIDE.md) — שיטות התקנה ותהליך ההיכרות בהפעלה הראשונה
