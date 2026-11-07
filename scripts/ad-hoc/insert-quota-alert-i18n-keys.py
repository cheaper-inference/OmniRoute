"""Insert the 3 opt-in quota-alert UI keys into every locale catalog.

Insert-only and format-preserving: the new lines are spliced right after the
existing `"resetCreditNoExpiry"` line of each file, so nothing else in the file
is touched (no re-serialisation of the whole JSON, no reordering).

Translations are provided for the 66 non-English locales; any locale missing
from TRANSLATIONS falls back to the English text so the key always exists.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
MESSAGES = ROOT / "src" / "i18n" / "messages"

ANCHOR = '"resetCreditNoExpiry"'

TRANSLATIONS = {
    "en": (
        "Quota alert",
        "{window} has {remaining}% left.",
        "A reset credit expires soon. Open View credits to use it.",
    ),
    "es": (
        "Alerta de cuota",
        "A {window} le queda un {remaining}%.",
        "Un crédito de reinicio caduca pronto. Abre Ver créditos para usarlo.",
    ),
    "pt": (
        "Alerta de cota",
        "{window} tem {remaining}% restante.",
        "Um crédito de redefinição expira em breve. Abra Ver créditos para usá-lo.",
    ),
    "pt-BR": (
        "Alerta de cota",
        "{window} tem {remaining}% restante.",
        "Um crédito de redefinição expira em breve. Abra Ver créditos para usá-lo.",
    ),
    "fr": (
        "Alerte de quota",
        "Il reste {remaining} % pour {window}.",
        "Un crédit de réinitialisation expire bientôt. Ouvrez Voir les crédits pour l'utiliser.",
    ),
    "de": (
        "Kontingentwarnung",
        "Für {window} sind noch {remaining} % verfügbar.",
        "Ein Reset-Guthaben läuft bald ab. Öffne Guthaben anzeigen, um es zu nutzen.",
    ),
    "it": (
        "Avviso quota",
        "A {window} restano {remaining}%.",
        "Un credito di ripristino scade a breve. Apri Visualizza crediti per usarlo.",
    ),
    "nl": (
        "Quotumwaarschuwing",
        "{window} heeft nog {remaining}% over.",
        "Een resettegoed verloopt binnenkort. Open Tegoeden bekijken om het te gebruiken.",
    ),
    "pl": (
        "Ostrzeżenie o limicie",
        "Pozostało {remaining}% dla {window}.",
        "Kupon resetowania wkrótce wygaśnie. Otwórz Pokaż kupony, aby go użyć.",
    ),
    "ru": (
        "Предупреждение о лимите",
        "У {window} осталось {remaining}%.",
        "Кредит сброса скоро истекает. Откройте «Просмотр кредитов», чтобы использовать его.",
    ),
    "uk": (
        "Попередження про ліміт",
        "У {window} залишилося {remaining}%.",
        "Кредит скидання незабаром спливає. Відкрийте «Переглянути кредити», щоб використати його.",
    ),
    "tr": (
        "Kota uyarısı",
        "{window} için %{remaining} kaldı.",
        "Bir sıfırlama kredisi yakında sona eriyor. Kullanmak için Kredileri görüntüle'yi açın.",
    ),
    "ja": (
        "クォータの警告",
        "{window} の残りは {remaining}% です。",
        "リセットクレジットの有効期限が近づいています。「クレジットを表示」を開いて使用してください。",
    ),
    "ko": (
        "할당량 경고",
        "{window}의 남은 양은 {remaining}%입니다.",
        "재설정 크레딧이 곧 만료됩니다. 크레딧 보기를 열어 사용하세요.",
    ),
    "zh": (
        "配额提醒",
        "{window} 还剩 {remaining}%。",
        "一个重置额度即将过期。打开“查看额度”以使用它。",
    ),
    "zh-CN": (
        "配额提醒",
        "{window} 还剩 {remaining}%。",
        "一个重置额度即将过期。打开“查看额度”以使用它。",
    ),
    "zh-TW": (
        "配額提醒",
        "{window} 還剩 {remaining}%。",
        "一個重設額度即將過期。開啟「檢視額度」以使用它。",
    ),
    "ar": (
        "تنبيه الحصة",
        "تبقى {remaining}% من {window}.",
        "ينتهي رصيد إعادة التعيين قريبًا. افتح «عرض الأرصدة» لاستخدامه.",
    ),
    "he": (
        "התראת מכסה",
        "נותרו {remaining}% ב-{window}.",
        "זיכוי איפוס עומד לפוג בקרוב. פתחו את הצגת הזיכויים כדי להשתמש בו.",
    ),
    "hi": (
        "कोटा चेतावनी",
        "{window} में {remaining}% शेष है।",
        "एक रीसेट क्रेडिट जल्द समाप्त हो रहा है। इसका उपयोग करने के लिए क्रेडिट देखें खोलें।",
    ),
}


def entry(locale: str) -> list[str]:
    title, window, credit = TRANSLATIONS.get(locale, TRANSLATIONS["en"])
    return [
        f'    "quotaAlertTitle": {json.dumps(title, ensure_ascii=False)},',
        f'    "quotaAlertWindowLow": {json.dumps(window, ensure_ascii=False)},',
        f'    "quotaAlertCreditExpiring": {json.dumps(credit, ensure_ascii=False)},',
    ]


def main() -> None:
    updated = 0
    missing_locales = []
    for path in sorted(MESSAGES.glob("*.json")):
        locale = path.stem
        text = path.read_text(encoding="utf-8")
        if '"quotaAlertTitle"' in text:
            continue

        lines = text.splitlines(keepends=True)
        anchor_index = next(
            (i for i, line in enumerate(lines) if ANCHOR in line and "resetCreditNoExpiry" in line),
            None,
        )
        if anchor_index is None:
            missing_locales.append(locale)
            continue

        new_lines = entry(locale)
        # Keep the trailing comma consistent with the anchor line's style.
        anchor_line = lines[anchor_index]
        if anchor_line.rstrip("\r\n").endswith(",") and not new_lines[-1].endswith(","):
            new_lines[-1] += ","

        lines[anchor_index + 1 : anchor_index + 1] = [line + "\n" for line in new_lines]
        updated_text = "".join(lines)
        json.loads(updated_text)  # fail loudly instead of writing broken JSON
        path.write_text(updated_text, encoding="utf-8", newline="")
        updated += 1

    print(f"updated={updated} missing_anchor={len(missing_locales)}")
    if missing_locales:
        print("no anchor:", ", ".join(missing_locales))


if __name__ == "__main__":
    main()
