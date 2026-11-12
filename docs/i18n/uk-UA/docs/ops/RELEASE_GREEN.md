# Release-Green: candidate validation and evidence (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green спостерігає за певним комітом і повідомляє результати його перевірки. [Посилання Quality Gates](../architecture/QUALITY_GATES.md) визначає поточні профілі CI, необхідні перевірки та політику прийняття. Політика доступу з версіями в `config/quality/admission-policy.json` є виконуваним контрактом для `Gate / CI` і `Gate / Quality`.

## CI та область спостереження

`ci.yml` та `quality.yml` охоплюють запити на підключення до головної та випускної гілок. Вибраний профіль визначає, які вакансії застосовуються. Повний CI також включає смуги, які звичайний запит на отримання не виконується. Швидкий результат спостереження не може замінити ці завдання, а завершена оболонка робочого циклу не може замінити його квитанції.

Виробництво належить CI. У `quality.yml` немає дублікатів консультаційної збірки. Відсутні артефакти, скасована робота та неповні вимірювання не свідчать про успішну перевірку. Підтвердьте поточну базу, голову та комбінованого кандидата, перш ніж приймати результати.

## Локальна перевірка

Запустіть спостерігач у власному робочому дереві після підготовки його залежностей. Дотримуйтеся робочого дерева та протоколу ресурсів у `docs/ops/WORKTREE_ISOLATION.md` перед серйозною перевіркою.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Швидкий профіль частковий. Повний профіль перевіряє свої змодельовані вимоги та зберігає квитанції про команди; він не сертифікує розгортання та не замінює відповідні розміщені перевірки. Звіт розрізняє помилку виконання від дрейфу метрики. Необхідні тріскачки залишаються блокованими відповідно до вибраної політики. Не підвищуйте базову лінію лише для отримання позитивного результату.

## Нічні та ручні підмітання

Нічний випуск і розв’язувачі сумісності вибирають канонічну гілку випуску. Цей вибір має збігатися з гілкою, яка ініціювала робочий процес, а пакети використовують незмінний SHA події. Для ручного виконання виберіть запланований випуск у `release_branch` і надішліть його за тим самим посиланням:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Міжфіліальне відправлення відхиляється до виконання вибраного коду. Розміщені основні пакети перевіряють `main` та перевіряють, що його SHA все ще відповідає вирішеній цілі перед встановленням. Якщо основний переміщується під час вирішення, повторно запустіть неповне очищення на новому коміті. Не поєднуйте квитанції від різних кандидатів.

## Сортування відмов і відновлення

Використовуйте інцидент як діагностичний індекс, а потім перевірте точний запуск, спробу, невдалий крок і артефакт. Порівняйте еквівалентну базу та потенційні докази, перш ніж приписувати помилку учаснику. Помилки інфраструктури, успадковані дефекти, регресії кандидатів і очікування схвалення потребують різних засобів правового захисту.

Навички `/green-prs`, `/sweep-reds`, `/validate-release-green` і `/babysit` збирають докази та готують виправлення відповідно до їх задокументованого обсягу. Зберігайте кредит співавторів, використовуйте ізольовані ремонтні гілки та перевіряйте всі необхідні перевірки перед авторизованим злиттям. Жодне автоматичне перебазування чи закриття інциденту не замінить поточного кандидата, який пройшов.
