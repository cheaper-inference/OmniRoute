import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildCavemanOutputInstruction,
  detectCompressionLanguage,
  loadAllRulesForLanguage,
} from "../../../open-sse/services/compression/index.ts";
import { applyRulesToText } from "../../../open-sse/services/compression/caveman.ts";
import { getRulesForContext } from "../../../open-sse/services/compression/cavemanRules.ts";

const LANGUAGES = ["pt-BR", "es", "de", "fr", "ja", "id", "hu", "tr"];

// Gerçekçi Türkçe geliştirme istekleri; her örnek beklenen kuralı ve ölçülebilir kısalmayı sabitler.
const TURKISH_DEVELOPER_PROMPTS = [
  {
    prompt: "Lütfen şu bağlantı hatasını açıklar mısın? Teşekkürler.",
    rule: "tr_question_to_directive",
  },
  {
    prompt: "Lütfen, aşağıdaki kod çalıştırılınca ödeme servisi 500 hatası veriyor.",
    rule: "tr_context_setup",
  },
  {
    prompt: "Şu hatayı alıyorum: TypeError: Cannot read properties of undefined.",
    rule: "tr_error_report",
  },
  {
    prompt: "Lütfen beklenen davranış şu: boş yanıt yerine 404 dönmeli.",
    rule: "tr_expected_behavior",
  },
  {
    prompt: "Amacım şu endpoint için önbelleği devre dışı bırakmak.",
    rule: "tr_intent",
  },
  {
    prompt: "Şunu denedim: cache temizliği yaptım ama dosyadaki hata sürüyor.",
    rule: "tr_already_tried",
  },
  {
    prompt: "Bildiğiniz gibi, bu dosya Redis bağlantısını yönetiyor.",
    rule: "tr_background_removal",
  },
  {
    prompt: "Not olarak: yapılandırma yalnız test ortamında değişmeli.",
    rule: "tr_scope_note",
  },
  {
    prompt: "Daha önce konuştuğumuz gibi, bu dosyadaki hata tekrar oluşuyor.",
    rule: "tr_background_removal",
  },
  {
    prompt: "Aynı soruyu tekrar soruyorum: bu hata neden 500 dönüyor?",
    rule: "tr_repeated_question",
  },
  {
    prompt: "Lütfen, yukarıdaki koda dönersek dosyadaki null kontrolü eksik.",
    rule: "tr_reestablished_context",
  },
  {
    prompt: "Başka bir deyişle, yapılandırma dosyası istek başına yükleniyor.",
    rule: "tr_restating",
  },
  {
    prompt: "Aslında veritabanı bağlantısı çok yavaş; sorgu süresini nasıl ölçerim?",
    rule: "tr_filler_adverbs",
  },
  {
    prompt: "Şunu çözmeye çalışıyorum: dosyadaki değişken neden tanımsız?",
    rule: "tr_self_reference",
  },
  {
    prompt: "Detaylı bir açıklama ver: bu hata neden yalnız test ortamında oluşuyor?",
    rule: "tr_verbose_instructions",
  },
  {
    prompt: "Teşekkürü borç bilirim; şu dosyadaki hatayı bugün düzeltebilir miyiz?",
    rule: "tr_excessive_gratitude",
  },
  {
    prompt: "Müsait olduğunda yapılandırma dosyasını gözden geçirir misin?",
    rule: "tr_softeners",
  },
  {
    prompt: "Lütfen hata ayıklama amacıyla dosya günlüğünü etkinleştir.",
    rule: "tr_purpose_phrase",
  },
  {
    prompt: "Bu nedenle servis bazen çalışmıyor; hata kaydını nerede bulurum?",
    rule: "tr_causal_connector",
  },
  {
    prompt: "Fonksiyonun veritabanı parametresini yapılandırma dosyasında güncelle.",
    rule: "tr_ultra_database",
  },
] as const;

// Yirmi gerçekçi Türkçe isteğinde algılamayı, kural kapsamını ve toplam karakter tasarrufunu ölçer.
it("measures Turkish compression on 20 realistic developer prompts", (t) => {
  const rules = getRulesForContext("user", "ultra", "tr");
  let inputChars = 0;
  let outputChars = 0;

  assert.equal(TURKISH_DEVELOPER_PROMPTS.length, 20);
  for (const [index, sample] of TURKISH_DEVELOPER_PROMPTS.entries()) {
    const detected = detectCompressionLanguage(sample.prompt);
    assert.equal(detected, "tr", `prompt ${index + 1} was detected as ${detected}`);

    const result = applyRulesToText(sample.prompt, rules);
    assert.ok(result.text.trim().length > 0, `prompt ${index + 1} compressed to empty text`);
    assert.ok(
      result.appliedRules.includes(sample.rule),
      `prompt ${index + 1} did not apply ${sample.rule}: ${JSON.stringify(result.text)}`
    );
    inputChars += Array.from(sample.prompt).length;
    outputChars += Array.from(result.text).length;
  }

  const reductionPct = ((inputChars - outputChars) / inputChars) * 100;
  t.diagnostic(
    `20 prompt ölçümü: giriş=${inputChars} karakter, çıkış=${outputChars} karakter, tasarruf=${reductionPct.toFixed(1)}%`
  );
  assert.ok(
    reductionPct >= 5,
    `20 Turkish prompts should save at least 5% characters; measured ${reductionPct.toFixed(1)}% (${inputChars} → ${outputChars})`
  );
});

describe("Caveman language packs", () => {
  it("ships 8 language packs with at least 15 rules each", () => {
    for (const language of LANGUAGES) {
      const rules = loadAllRulesForLanguage(language, { refresh: true });
      assert.ok(rules.length >= 15, `${language} expected 15+ rules, got ${rules.length}`);
      assert.ok(
        rules.some((rule) => rule.category === "filler"),
        `${language} missing filler`
      );
      assert.ok(
        rules.some((rule) => rule.category === "context"),
        `${language} missing context`
      );
      assert.ok(
        rules.some((rule) => rule.category === "structural"),
        `${language} missing structural`
      );
    }
  });

  it("detects supported languages", () => {
    assert.equal(detectCompressionLanguage("preciso corrigir este arquivo com erro"), "pt-BR");
    assert.equal(detectCompressionLanguage("necesito corregir este archivo con error"), "es");
    assert.equal(detectCompressionLanguage("ich brauche diese konfiguration"), "de");
    assert.equal(detectCompressionLanguage("j'ai besoin de corriger cette erreur fichier"), "fr");
    assert.equal(detectCompressionLanguage("このコードを修正してください"), "ja");
    assert.equal(detectCompressionLanguage("bisa tolong jelaskan tentang database ini"), "id");
    assert.equal(detectCompressionLanguage("kérlek javítsd ezt a hibát a kódban"), "hu");
    assert.equal(detectCompressionLanguage("lütfen bu dosyadaki hatayı düzelt"), "tr");
  });

  it("applies non-English rule packs to golden samples", () => {
    const ptRules = getRulesForContext("user", "full", "pt-BR");
    const { text } = applyRulesToText("por favor segue o código: const auth = true", ptRules);

    assert.ok(!text.toLowerCase().includes("por favor"));
    assert.ok(text.includes("Código:"));
    assert.ok(text.includes("auth"));
  });

  it("keeps the Spanish pack aligned with English rule categories", () => {
    const esRules = loadAllRulesForLanguage("es", { refresh: true });
    assert.ok(esRules.length >= 40, `es expected 40+ rules, got ${esRules.length}`);
    assert.ok(
      esRules.some((rule) => rule.category === "dedup"),
      "es missing dedup"
    );
    assert.ok(
      esRules.some((rule) => rule.category === "ultra"),
      "es missing ultra"
    );
    assert.ok(
      esRules.some((rule) => rule.category === "terse"),
      "es missing terse"
    );
  });

  it("applies expanded Spanish rules without touching technical terms", () => {
    const esRules = getRulesForContext("user", "ultra", "es");
    const { text } = applyRulesToText(
      "Por favor proporciona una explicación detallada de la base de datos y autenticación en src/auth.ts",
      esRules
    );

    assert.ok(!text.toLowerCase().includes("por favor"));
    assert.ok(!text.toLowerCase().includes("explicación detallada"));
    assert.ok(text.includes("BD"));
    assert.ok(text.includes("auth"));
    assert.ok(text.includes("src/auth.ts"));
  });

  it("applies Indonesian rules without touching technical terms", () => {
    const idRules = getRulesForContext("user", "ultra", "id");
    const { text } = applyRulesToText(
      "Tolong berikan penjelasan detail tentang basis data dan autentikasi di src/auth.ts",
      idRules
    );

    assert.ok(!text.toLowerCase().includes("tolong"));
    assert.ok(!text.toLowerCase().includes("penjelasan detail"));
    assert.ok(text.includes("DB"));
    assert.ok(text.includes("auth"));
    assert.ok(text.includes("src/auth.ts"));
  });

  it("applies Hungarian rules without touching technical terms", () => {
    const huRules = getRulesForContext("user", "ultra", "hu");
    const { text } = applyRulesToText(
      "Kérlek, adj részletes magyarázatot az adatbázis és a hitelesítés hibájáról a src/auth.ts fájlban.",
      huRules
    );

    assert.ok(!text.toLowerCase().includes("kérlek"));
    assert.ok(!text.toLowerCase().includes("részletes magyarázatot"));
    assert.ok(text.includes("DB"));
    assert.ok(text.includes("auth"));
    assert.ok(text.includes("src/auth.ts"));
  });

  it("applies Turkish rules without touching technical terms", () => {
    const trRules = getRulesForContext("user", "ultra", "tr");
    const { text } = applyRulesToText(
      "Lütfen veritabanı ve yapılandırma hatasını src/auth.ts dosyasında düzelt.",
      trRules
    );

    assert.ok(!text.toLowerCase().includes("lütfen"));
    assert.ok(text.includes("DB"));
    assert.ok(text.includes("config"));
    assert.ok(text.includes("src/auth.ts"));
  });

  // Regression: a rule whose replacement ends with a word AND whose pattern swallows the
  // trailing whitespace glues that word onto the next token ("açıklaTeşekkürler").
  it("Turkish question→imperative keeps the word boundary after the replacement", () => {
    const trRules = getRulesForContext("user", "lite", "tr");
    const { text } = applyRulesToText("şu hatayı anlatır mısın? Teşekkürler.", trRules);

    assert.ok(text.includes("anlat"), `expected the imperative, got ${JSON.stringify(text)}`);
    assert.ok(!/anlat\p{L}/u.test(text), `replacement glued to the next word: ${JSON.stringify(text)}`);
    assert.ok(!text.toLowerCase().includes("teşekkür"), "pleasantry should be dropped");
  });

  it("builds localized output mode instructions", () => {
    const config = { enabled: true, intensity: "full" as const, autoClarity: true };

    assert.match(buildCavemanOutputInstruction(config, "pt-BR"), /Responda/);
    assert.match(buildCavemanOutputInstruction(config, "es"), /Responde/);
    assert.match(buildCavemanOutputInstruction(config, "de"), /Antworte/);
    assert.match(buildCavemanOutputInstruction(config, "fr"), /Reponds/);
    assert.match(buildCavemanOutputInstruction(config, "ja"), /回答/);
    assert.match(buildCavemanOutputInstruction(config, "id"), /Jawab/);
    assert.match(buildCavemanOutputInstruction(config, "hu"), /Válaszolj/);
    assert.match(buildCavemanOutputInstruction(config, "tr"), /Kısa|mağara/);
  });
});
