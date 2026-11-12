# Release-Green: candidate validation and evidence (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green наблюдава конкретен ангажимент и отчита резултатите от валидирането му. [Справката на Quality Gates](../architecture/QUALITY_GATES.md) определя текущите CI профили, необходимите проверки и политиката за приемане. Политиката за допускане с версии в `config/quality/admission-policy.json` е изпълнимият договор за `Gate / CI` и `Gate / Quality`.

## CI и обхват на наблюдателя

`ci.yml` и `quality.yml` покриват заявки за изтегляне в основни и освобождаващи клонове. Избраният профил определя кои работни места са приложими. Пълният CI също включва ленти, които обикновената заявка за изтегляне не се изпълнява. Резултатът от бърз наблюдател не може да замени тези задания, а завършената обвивка на работния поток не може да замени своите разписки.

Производствената конструкция принадлежи на CI. Няма дублирана консултативна компилация в `quality.yml`. Липсващи артефакти, отменена работа и непълни измервания не установяват успешна необходима проверка. Потвърдете текущата база, глава и комбинирания кандидат, преди да приемете резултатите.

## Локално валидиране

Стартирайте наблюдателя в притежавано работно дърво, след като подготвите неговите зависимости. Следвайте работното дърво и протокола за ресурси в `docs/ops/WORKTREE_ISOLATION.md` преди сериозно валидиране.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Бързият профил е частичен. Пълният профил проверява своите моделирани изисквания и запазва разписките за команди; не удостоверява внедряването или замества приложимите хоствани проверки. Докладът разграничава неуспешното изпълнение от отклонението на показателя. Необходимите тресчотки остават блокиращи според избраната политика. Не повишавайте базовата линия само за да получите положителен резултат.

## Нощно и ръчно почистване

Резолверите за нощно издание и съвместимост избират каноничен клон на изданието. Този избор трябва да съответства на клона, който е задействал работния поток, а пакетите използват неизменния SHA на събитието. За ръчно изпълнение изберете желаното издание в `release_branch` и изпратете на същата реф.

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Междуклоновото изпращане се отхвърля преди изпълнението на избрания код. Хостваните основни пакети проверяват `main` и проверяват дали неговият SHA все още съответства на разрешената цел преди инсталиране. Ако main се движи по време на разрешаване, изпълнете отново непълното почистване на новия комит. Не комбинирайте разписки за апартаменти от различни кандидати.

## Сортиране и възстановяване при отказ

Използвайте инцидента като диагностичен индекс, след което проверете точното изпълнение, опит, неуспешна стъпка и артефакт. Сравнете еквивалентни базови и кандидат доказателства, преди да припишете неуспех на сътрудник. Грешки в инфраструктурата, наследени дефекти, регресии на кандидати и чакащи одобрения изискват различни средства за защита.

Уменията `/green-prs`, `/sweep-reds`, `/validate-release-green` и `/babysit` събират доказателства и подготвят корекции в своя документиран обхват. Запазете кредита на сътрудниците, използвайте изолирани клонове за ремонт и проверете всички необходими проверки преди оторизирано сливане. Никаква автоматична нова базова линия или закриване на инцидент не замества преминаващ настоящ кандидат.
