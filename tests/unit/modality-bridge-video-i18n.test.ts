import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

const messagesDirectory = path.resolve("src/i18n/messages");
const requiredKeys = [
  "modalityBridgeVideoTitle",
  "modalityBridgeVideoDesc",
  "modalityBridgeVideoRuntimeReady",
  "modalityBridgeVideoRuntimeUnavailable",
  "modalityBridgeVideoRuntimeInstall",
  "modalityBridgeVideoEnabled",
  "modalityBridgeVideoEnabledDesc",
  "modalityBridgeVideoModel",
  "modalityBridgeVideoModelInherited",
  "modalityBridgeVideoFrameCount",
  "modalityBridgeVideoMaxVideos",
] as const;
const inspectedKeys = [
  ...requiredKeys,
  "modalityBridgeIntro",
  "modalityBridgeVideoComingSoon",
] as const;

type CatalogSettings = Partial<Record<(typeof inspectedKeys)[number], unknown>>;

// Parse the catalogs in a short-lived child, never in this process. They add up to about 80 MB
// of JSON, and parsing them here left the heap at its limit with concurrent Sparkplug/Maglev jobs
// still running when --test-force-exit called process.exit(). Such a job parks until the main
// thread collects garbage while process.exit() joins it, so this file hung the shard it landed on
// until the job timed out (nodejs/node#64274, fix proposed in nodejs/node#66171, unreleased). The
// child ends on its own: isolate teardown wakes parked jobs, which process.exit() does not do.
const CATALOG_READER = `
const fs = require("node:fs");
const path = require("node:path");
const [directory, keys] = [process.argv[1], JSON.parse(process.argv[2])];
const catalogs = {};
for (const file of fs.readdirSync(directory).filter((entry) => entry.endsWith(".json")).sort()) {
  const { settings } = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
  catalogs[file] = settings
    ? Object.fromEntries(keys.filter((key) => Object.hasOwn(settings, key)).map((key) => [key, settings[key]]))
    : null;
}
process.stdout.write(JSON.stringify(catalogs));
`;

const settingsByCatalog = JSON.parse(
  execFileSync(
    process.execPath,
    ["-e", CATALOG_READER, messagesDirectory, JSON.stringify(inspectedKeys)],
    { encoding: "utf8" }
  )
) as Record<string, CatalogSettings | null>;

test(`all ${i18nConfig.locales.length} UI locale catalogs contain non-placeholder Video Bridge settings`, () => {
  const catalogs = Object.keys(settingsByCatalog);
  assert.equal(catalogs.length, i18nConfig.locales.length);
  const english = settingsByCatalog["en.json"]!;
  for (const file of catalogs) {
    const settings = settingsByCatalog[file];
    for (const key of requiredKeys) {
      const value = settings?.[key];
      assert.equal(typeof value, "string", `${file}: settings.${key} missing`);
      assert.ok(String(value).trim().length > 0, `${file}: settings.${key} empty`);
      assert.equal(String(value).startsWith("__MISSING__:"), false, `${file}: ${key} placeholder`);
      if (file !== "en.json" && key !== "modalityBridgeVideoTitle") {
        assert.notEqual(
          value,
          english[key],
          `${file}: settings.${key} copied from English instead of translated`
        );
      }
    }
  }
});

test("localized Modality Bridge copy describes the shipped Video Bridge without stale backlog text", () => {
  const ptBr = settingsByCatalog["pt-BR.json"]!;
  assert.equal(
    ptBr.modalityBridgeIntro,
    "Converta conteúdo multimodal em texto antes que ele chegue a modelos apenas de texto. As pontes de visão, áudio e vídeo estão disponíveis e podem ser configuradas."
  );
  assert.equal(
    ptBr.modalityBridgeVideoDesc,
    "Faça uma amostragem dos quadros do vídeo, descreva-os com um modelo de visão e continue com o modelo de texto escolhido."
  );

  for (const [file, settings] of Object.entries(settingsByCatalog)) {
    assert.equal(
      Object.hasOwn(settings!, "modalityBridgeVideoComingSoon"),
      false,
      `${file}: stale Video Bridge backlog key`
    );
  }
});
