# Release-Green: candidate validation and evidence (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green აკვირდება კონკრეტულ ვალდებულებას და აცნობებს მის ვალიდაციის შედეგებს. [Quality Gates-ის მითითება](../architecture/QUALITY_GATES.md) განსაზღვრავს მიმდინარე CI პროფილებს, საჭირო შემოწმებებს და მიღების პოლიტიკას. [დაშვების ვერსიული პოლიტიკა](../../config/quality/admission-policy.json) არის შესრულებადი კონტრაქტი `Gate / CI` და `Gate / Quality` სთვის.

## CI და დამკვირვებლის ფარგლები

`ci.yml` და `quality.yml` საფარი იზიდავს მოთხოვნებს მთავარ და გამოშვების ფილიალებში. არჩეული პროფილი განსაზღვრავს, თუ რომელი ვაკანსიებია გამოყენებული. სრული CI ასევე მოიცავს ხაზებს, რომლებსაც ჩვეულებრივი pull მოთხოვნა არ ასრულებს. სწრაფი დამკვირვებლის შედეგი ვერ შეცვლის ამ სამუშაოებს და დასრულებული სამუშაო პროცესის შეფუთვა ვერ შეცვლის მის ქვითრებს.

საწარმოო კონსტრუქცია ეკუთვნის CI. `quality.yml` ში არ არის დუბლიკატი საკონსულტაციო ნაგებობა. გამოტოვებული არტეფაქტები, გაუქმებული სამუშაო და არასრული გაზომვები არ ადგენს წარმატებულ საჭირო შემოწმებას. დაადასტურეთ მიმდინარე ბაზა, ხელმძღვანელი და კომბინირებული კანდიდატი შედეგების მიღებამდე.

## ადგილობრივი დადასტურება

გაუშვით დამკვირვებელი საკუთრებაში არსებულ სამუშაო ხეზე მისი დამოკიდებულებების მომზადების შემდეგ. გამოიყენეთ [სამუშაო ხე და რესურსების პროტოკოლი](WORKTREE_ISOLATION.md) მძიმე ვალიდაციამდე.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

სწრაფი პროფილი ნაწილობრივია. სრული პროფილი ამოწმებს მის მოდელირებულ მოთხოვნებს და ინახავს ბრძანების ქვითრებს; ის არ ადასტურებს განლაგებას ან ჩაანაცვლებს მოქმედი ჰოსტინგის შემოწმებებს. ანგარიში განასხვავებს შესრულების წარუმატებლობას მეტრულ დრიფტისაგან. არჩეული პოლიტიკის მიხედვით, საჭირო ჩოგნები რჩება დაბლოკილი. ნუ აამაღლებთ საბაზისო ხაზს მხოლოდ წარმავალი შედეგის მისაღებად.

## ღამის და ხელით წმენდა

ღამის გამოშვების და თავსებადობის გადამწყვეტები ირჩევენ კანონიკური გამოშვების ფილიალს. ეს არჩევანი უნდა ემთხვეოდეს იმ ფილიალს, რომელმაც გამოიწვია სამუშაო ნაკადი, ხოლო კომპლექტები გამოიყენებენ ღონისძიების უცვლელ SHA. ხელით შესრულებისთვის შეარჩიეთ განკუთვნილი გამოშვება `release_branch` ში და გაგზავნეთ იმავე რეფერალზე:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

განშტოებათა გაგზავნა უარყოფილია არჩეული კოდის შესრულებამდე. მასპინძლობს მთავარ კომპლექტს, შეამოწმეთ `main` და შეამოწმეთ, რომ მისი SHA მაინც ემთხვევა გადაწყვეტილ სამიზნეს ინსტალაციამდე. თუ ძირითადი მოძრაობს გადაწყვეტის დროს, ხელახლა გაიმეორეთ არასრული სვიპი ახალ დავალებაში. არ დააკავშიროთ კომპლექტის ქვითრები სხვადასხვა კანდიდატებისგან.

## წარუმატებლობის ტრიაჟი და აღდგენა

გამოიყენეთ ინციდენტი, როგორც დიაგნოსტიკური ინდექსი, შემდეგ შეამოწმეთ ზუსტი გაშვება, მცდელობა, წარუმატებელი ნაბიჯი და არტეფაქტი. შეადარეთ ექვივალენტური ბაზა და კანდიდატის მტკიცებულებები, სანამ მარცხს მიაწერთ კონტრიბუტორს. ინფრასტრუქტურის შეცდომები, მემკვიდრეობითი დეფექტები, კანდიდატების რეგრესია და მომლოდინე დამტკიცებები საჭიროებს განსხვავებულ საშუალებებს.

`/green-prs`, `/sweep-reds`, `/validate-release-green` და `/babysit` უნარები აგროვებს მტკიცებულებებს და ამზადებს შესწორებებს მათი დოკუმენტირებული ფარგლების ფარგლებში. შეინახეთ კონტრიბუტორის კრედიტი, გამოიყენეთ იზოლირებული სარემონტო ფილიალები და გადაამოწმეთ ყველა საჭირო შემოწმება ავტორიზებული შერწყმამდე. ავტომატური გადაყენება ან ინციდენტის დახურვა არ ჩაანაცვლებს გამვლელ კანდიდატს.
