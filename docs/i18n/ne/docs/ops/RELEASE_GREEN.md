# Release-Green: candidate validation and evidence (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

रिलीज-ग्रीनले एक विशिष्ट प्रतिबद्धता अवलोकन गर्दछ र यसको प्रमाणीकरण परिणामहरू रिपोर्ट गर्दछ। [गुणस्तर गेट्स सन्दर्भले](../architecture/QUALITY_GATES.md) हालको CI प्रोफाइलहरू, आवश्यक जाँचहरू र स्वीकृति नीति परिभाषित गर्दछ। `config/quality/admission-policy.json` मा संस्करण गरिएको प्रवेश नीति `Gate / CI` र `Gate / Quality` को लागि कार्यान्वयन योग्य अनुबंध हो।

## CI र पर्यवेक्षक दायरा

`ci.yml` र `quality.yml` कभर पुल अनुरोधहरू मुख्य र रिलीज शाखाहरूमा। चयन गरिएको प्रोफाइलले कुन कार्यहरू लागू हुन्छ भनेर निर्धारण गर्दछ। पूर्ण CI लेनहरू पनि समावेश गर्दछ जुन सामान्य पुल अनुरोध कार्यान्वयन गर्दैन। द्रुत पर्यवेक्षक परिणामले ती कार्यहरू प्रतिस्थापन गर्न सक्दैन, र पूर्ण कार्यप्रवाह र्यापरले यसको रसिदहरू प्रतिस्थापन गर्न सक्दैन।

उत्पादन निर्माण CI को हो। `quality.yml` मा कुनै डुप्लिकेट सल्लाहकार निर्माण छैन। हराएको कलाकृति, रद्द काम र अपूर्ण मापन सफल आवश्यक जाँच स्थापना गर्दैन। नतिजा स्वीकार गर्नु अघि हालको आधार, प्रमुख र संयुक्त उम्मेदवार पुष्टि गर्नुहोस्।

## स्थानीय प्रमाणीकरण

पर्यवेक्षकलाई यसको निर्भरताहरू तयार गरिसकेपछि स्वामित्वको वर्कट्रीमा चलाउनुहोस्। भारी प्रमाणीकरण अघि `docs/ops/WORKTREE_ISOLATION.md` मा worktree र संसाधन प्रोटोकल पालना गर्नुहोस्।

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

द्रुत प्रोफाइल आंशिक छ। पूर्ण प्रोफाइलले यसको मोडेल गरिएको आवश्यकताहरू जाँच गर्दछ र आदेश रसिदहरू सुरक्षित गर्दछ; यसले परिनियोजन वा लागू होस्ट गरिएका चेकहरूको विकल्पलाई प्रमाणित गर्दैन। रिपोर्टले मेट्रिक बहावबाट कार्यान्वयन असफलतालाई छुट्याएको छ। आवश्यक ratchets चयन नीति अनुसार अवरुद्ध रहन्छन्। उत्तीर्ण नतिजा प्राप्त गर्नको लागि मात्र आधार रेखा नबढाउनुहोस्।

## राती र म्यानुअल स्वीपहरू

रातको रिलिज र अनुकूलता समाधानकर्ताहरूले क्यानोनिकल रिलीज शाखा चयन गर्छन्। त्यो चयनले कार्यप्रवाह ट्रिगर गर्ने शाखासँग मेल खानुपर्छ, र सुइटहरूले घटनाको अपरिवर्तनीय SHA प्रयोग गर्दछ। म्यानुअल कार्यान्वयनको लागि, `release_branch` मा इच्छित रिलीज चयन गर्नुहोस् र त्यही सन्दर्भमा पठाउनुहोस्:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

चयन गरिएको कोड कार्यान्वयन गर्नु अघि क्रस-शाखा प्रेषण अस्वीकार गरिएको छ। होस्ट गरिएका मुख्य सुइटहरू `main` चेकआउट गर्नुहोस् र यसको SHA अझै स्थापना गर्नु अघि समाधान गरिएको लक्ष्यसँग मेल खान्छ भनेर प्रमाणित गर्नुहोस्। यदि रिजोल्युसनको समयमा मुख्य चालहरू, नयाँ कमिटमा अपूर्ण स्वीप पुन: चलाउनुहोस्। विभिन्न उम्मेद्वारहरूबाट सुइट रसिदहरू संयोजन नगर्नुहोस्।

## असफलता ट्राइएज र रिकभरी

घटनालाई निदान अनुक्रमणिकाको रूपमा प्रयोग गर्नुहोस्, त्यसपछि सही रन, प्रयास, असफल चरण र कलाकृति निरीक्षण गर्नुहोस्। योगदानकर्तालाई असफलताको श्रेय दिनु अघि बराबरको आधार र उम्मेदवार प्रमाणहरू तुलना गर्नुहोस्। पूर्वाधार त्रुटिहरू, वंशानुगत त्रुटिहरू, उम्मेदवार रिग्रेसनहरू र पेन्डिङ स्वीकृतिहरूलाई विभिन्न उपायहरू चाहिन्छ।

`/green-prs`, `/sweep-reds`, `/validate-release-green` र `/babysit` कौशलहरूले प्रमाणहरू सङ्कलन गर्दछ र तिनीहरूको दस्तावेज दायरा अन्तर्गत समाधानहरू तयार गर्दछ। योगदानकर्ता क्रेडिट राख्नुहोस्, पृथक मर्मत शाखाहरू प्रयोग गर्नुहोस्, र अधिकृत मर्जर अघि सबै आवश्यक जाँचहरू प्रमाणित गर्नुहोस्। उत्तीर्ण वर्तमान उम्मेद्वारको लागि कुनै स्वचालित रिबेसलाइन वा घटना बन्द गर्ने विकल्प छैन।
