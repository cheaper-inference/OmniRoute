# Release-Green: candidate validation and evidence (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

रिलीझ-ग्रीन विशिष्ट वचनबद्धतेचे निरीक्षण करते आणि त्याचे प्रमाणीकरण परिणाम नोंदवते. [क्वालिटी गेट्स संदर्भ](../architecture/QUALITY_GATES.md) वर्तमान CI प्रोफाइल, आवश्यक चेक आणि स्वीकृती धोरण परिभाषित करतो. व्हर्जन केलेले [प्रवेश धोरण](../../config/quality/admission-policy.json) हे `Gate / CI` आणि `Gate / Quality` साठी एक्झिक्युटेबल करार आहे.

## CI आणि निरीक्षक व्याप्ती

`ci.yml` आणि `quality.yml` कव्हर विनंत्या मुख्य आणि रिलीज शाखांमध्ये खेचतात. निवडलेल्या प्रोफाइलवरून कोणत्या नोकऱ्या लागू होतात हे ठरवले जाते. पूर्ण CI लेन देखील समाविष्ट आहेत ज्या सामान्य पुल विनंती अंमलात आणत नाहीत. एक द्रुत निरीक्षक परिणाम त्या नोकऱ्या बदलू शकत नाही आणि पूर्ण झालेले वर्कफ्लो रॅपर त्याच्या पावत्या बदलू शकत नाही.

उत्पादन बिल्ड CI च्या मालकीचे आहे. `quality.yml` मध्ये कोणतेही डुप्लिकेट सल्लागार बिल्ड नाही. गहाळ कलाकृती, रद्द केलेले काम आणि अपूर्ण मोजमाप यशस्वी आवश्यक तपासणी स्थापित करत नाहीत. निकाल स्वीकारण्यापूर्वी वर्तमान आधार, प्रमुख आणि एकत्रित उमेदवाराची पुष्टी करा.

## स्थानिक प्रमाणीकरण

अवलंबित्व तयार केल्यानंतर मालकीच्या वर्कट्रीमध्ये निरीक्षक चालवा. हेवी व्हॅलिडेशन करण्यापूर्वी [वर्कट्री आणि रिसोर्स प्रोटोकॉल](WORKTREE_ISOLATION.md) वापरा.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

द्रुत प्रोफाइल आंशिक आहे. पूर्ण प्रोफाइल त्याच्या मॉडेल केलेल्या आवश्यकता तपासते आणि आदेश पावत्या जतन करते; ते तैनाती प्रमाणित करत नाही किंवा लागू होस्ट केलेल्या चेकसाठी पर्याय देत नाही. अहवाल मेट्रिक ड्रिफ्ट पासून अंमलबजावणी अपयश वेगळे करतो. निवडलेल्या धोरणानुसार आवश्यक रॅचेट्स ब्लॉक करत राहतात. केवळ उत्तीर्ण निकाल मिळविण्यासाठी आधाररेखा वाढवू नका.

## रात्री आणि मॅन्युअल स्वीप

रात्रीचे रिलीझ आणि कंपॅटिबिलिटी रिझॉल्व्हर एक कॅनोनिकल रिलीझ शाखा निवडतात. ती निवड वर्कफ्लो ट्रिगर करणाऱ्या शाखेशी जुळली पाहिजे आणि सुइट्स इव्हेंटचा अपरिवर्तनीय SHA वापरतात. मॅन्युअल अंमलबजावणीसाठी, `RELEASE_BRANCH` मध्ये इच्छित प्रकाशन निवडा आणि त्याच संदर्भावर पाठवा:

```bash
gh workflow run nightly-release-green.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
gh workflow run nightly-compat.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
```

निवडलेला कोड कार्यान्वित करण्यापूर्वी क्रॉस-ब्रांच डिस्पॅच नाकारला जातो. होस्ट केलेले मुख्य सुइट्स `main` चेकआऊट करतात आणि स्थापित करण्यापूर्वी त्याचा SHA अद्याप निराकरण केलेल्या लक्ष्याशी जुळत असल्याचे सत्यापित करा. रिझोल्यूशन दरम्यान मुख्य हालचाली असल्यास, नवीन कमिटवर अपूर्ण स्वीप पुन्हा चालवा. वेगवेगळ्या उमेदवारांच्या सुट पावत्या एकत्र करू नका.

## अपयश ट्रायज आणि पुनर्प्राप्ती

घटनेचा डायग्नोस्टिक इंडेक्स म्हणून वापर करा, नंतर अचूक धावणे, प्रयत्न, अयशस्वी चरण आणि कृत्रिमता तपासा. योगदानकर्त्याला अपयशाचे श्रेय देण्यापूर्वी समतुल्य आधार आणि उमेदवाराच्या पुराव्याची तुलना करा. पायाभूत सुविधांमधील त्रुटी, वारशाने मिळालेले दोष, उमेदवारांचे पुनरागमन आणि प्रलंबित मंजुरीसाठी वेगवेगळ्या उपायांची आवश्यकता असते.

`/green-prs`, `/sweep-reds`, `/validate-release-green` आणि `/babysit` कौशल्ये पुरावे गोळा करतात आणि त्यांच्या दस्तऐवजीकरण केलेल्या कार्यक्षेत्रात निराकरणे तयार करतात. कंट्रिब्युटर क्रेडिट ठेवा, पृथक दुरुस्ती शाखा वापरा आणि अधिकृत विलीनीकरणापूर्वी सर्व आवश्यक धनादेशांची पडताळणी करा. उत्तीर्ण वर्तमान उमेदवारासाठी कोणतेही स्वयंचलित रीबेसलाइन किंवा घटना बंद करण्याचे पर्याय नाहीत.
