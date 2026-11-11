# Release-Green: candidate validation and evidence (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green наблюдает за конкретным коммитом и сообщает о результатах его проверки. [Справочник «Ворота качества»](../architecture/QUALITY_GATES.md) определяет текущие профили CI, необходимые проверки и политику приемки. [Политика допуска с поддержкой](../../config/quality/admission-policy.json) версий — это исполняемый контракт для `Gate / CI` и `Gate / Quality`.

## CI и область наблюдения

`ci.yml` и `quality.yml` охватывают запросы на включение в основную и релизную ветки. Выбранный профиль определяет, какие вакансии применяются. Полный CI также включает в себя полосы, которые не выполняются обычным запросом на извлечение. Результат быстрого наблюдения не может заменить эти задания, а завершенная оболочка рабочего процесса не может заменить его квитанции.

Производственная сборка принадлежит CI. В `quality.yml` нет повторяющихся консультативных сборок. Отсутствие артефактов, отмененная работа и неполные измерения не являются основанием для успешной обязательной проверки. Прежде чем принять результаты, подтвердите текущего базового, главного и объединенного кандидата.

## Локальная проверка

Запустите наблюдатель в принадлежащем ему рабочем дереве после подготовки его зависимостей. Используйте [рабочее дерево и протокол ресурсов](WORKTREE_ISOLATION.md) перед тщательной проверкой.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Быстрый профиль является частичным. Полный профиль проверяет смоделированные требования и сохраняет поступления команд; он не подтверждает развертывание и не заменяет применимые размещенные проверки. Отчет отличает сбой выполнения от отклонения показателя. Требуемые храповые механизмы продолжают блокироваться в соответствии с выбранной политикой. Не повышайте базовый уровень только для того, чтобы получить удовлетворительный результат.

## Ночные и ручные зачистки

Резолверы ночного выпуска и совместимости выбирают каноническую ветку выпуска. Этот выбор должен соответствовать ветке, которая запустила рабочий процесс, а пакеты используют неизменяемый SHA события. Для выполнения вручную выберите предполагаемый выпуск в `release_branch` и отправьте его по той же ссылке:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Межветвевая отправка отклоняется до выполнения выбранного кода. Размещенные основные пакеты проверяют `main` и перед установкой проверяют, что его SHA по-прежнему соответствует разрешенному целевому объекту. Если main перемещается во время разрешения, повторно запустите неполную очистку нового коммита. Не объединяйте поступления от разных кандидатов.

## Сортировка и восстановление отказов

Используйте инцидент в качестве диагностического индекса, а затем проверьте точный запуск, попытку, неудачный шаг и артефакт. Сравните эквивалентные базовые и возможные доказательства, прежде чем приписывать неудачу участнику. Ошибки инфраструктуры, унаследованные дефекты, возможные регрессии и ожидающие одобрения требуют различных средств устранения.

Навыки `/green-prs`, `/sweep-reds`, `/validate-release-green` и `/babysit` собирают доказательства и готовят исправления в соответствии с документированным объемом. Сохраняйте доверие участников, используйте изолированные ветки восстановления и проверяйте все необходимые проверки перед санкционированным слиянием. Никакое автоматическое изменение базовой линии или закрытие инцидента не заменяет проходящего текущего кандидата.
