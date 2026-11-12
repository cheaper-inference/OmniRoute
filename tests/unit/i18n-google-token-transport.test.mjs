import assert from "node:assert/strict";
import test from "node:test";
import {
  maskInline,
  translateMarkdownWithGoogle,
} from "../../scripts/i18n/lib/google-translate.mjs";

function endpoint(transform = (text) => text) {
  const requests = [];
  const fetchImpl = async (url, options) => {
    const official = new URL(url).hostname === "translation.googleapis.com";
    const q = official ? JSON.parse(options.body).q : new URLSearchParams(options.body).getAll("q");
    requests.push({ official, q });
    const translated = q.map((text) => transform(text.replace(/^Read /, "Leia ")));
    return new Response(
      JSON.stringify(
        official
          ? { data: { translations: translated.map((translatedText) => ({ translatedText })) } }
          : translated
      ),
      { headers: { "Content-Type": "application/json" } }
    );
  };
  return { requests, fetchImpl };
}

function translate(source, fetchImpl, apiKey = "") {
  return translateMarkdownWithGoogle(source, "pt-BR", {
    fetchImpl,
    apiKey,
    concurrency: 1,
    timeoutMs: 1000,
    backoffMs: 0,
  });
}

test("keyless transport avoids the observed extra echo of lowercase token ids", async () => {
  const fake = endpoint((text) => (text.includes(">zqa</span>") ? text + " zqa" : text));
  assert.equal(await translate("Read `TOKEN`.", fake.fetchImpl), "Leia `TOKEN`.");
});

test("keyless marker encoding keeps the same payload length and protected literals", async () => {
  const source = "Read `TOKEN` and `SECOND`.";
  const fake = endpoint();
  assert.equal(await translate(source, fake.fetchImpl), "Leia `TOKEN` and `SECOND`.");
  const sent = fake.requests[0].q[0];
  assert.equal(sent.length, maskInline(source).html.length);
  assert.match(sent, />ZQA<\/span>/);
  assert.match(sent, />ZQB<\/span>/);
  assert.doesNotMatch(sent, />zq[a-z]+<\/span>/);
});

test("a duplicated wire marker still fails canonical restoration", async () => {
  const fake = endpoint(
    (text) => text + " " + /<span translate="no">([^<]+)<\/span>/.exec(text)[1]
  );
  await assert.rejects(
    translate("Read `TOKEN`.", fake.fetchImpl),
    /segments could not be restored/
  );
});

test("a missing protected marker remains a failure", async () => {
  const fake = endpoint((text) => text.replace(/<span translate="no">[^<]+<\/span>/, ""));
  await assert.rejects(
    translate("Read `TOKEN`.", fake.fetchImpl),
    /segments could not be restored/
  );
});

test("an invented uppercase wire marker cannot leak into the translated prose", async () => {
  const fake = endpoint((text) => text + " ZQZZ");
  await assert.rejects(
    translate("Read `TOKEN`.", fake.fetchImpl),
    /segments could not be restored/
  );
});

test("longer marker ids cannot be partially decoded as shorter ids", async () => {
  const literals = Array.from({ length: 32 }, (_, i) => "`VALUE_" + i + "`").join(", ");
  const fake = endpoint();
  assert.equal(await translate("Read " + literals + ".", fake.fetchImpl), "Leia " + literals + ".");
});

test("source acronyms resembling wire markers survive as protected source text", async () => {
  const fake = endpoint();
  assert.equal(await translate("Read ZQZZ and `TOKEN`.", fake.fetchImpl), "Leia ZQZZ and `TOKEN`.");
});

test("a source prefix collision preserves legacy transport and the original prose", async () => {
  const fake = endpoint();
  assert.equal(
    await translate("Read ZQABC-test and `TOKEN`.", fake.fetchImpl),
    "Leia ZQABC-test and `TOKEN`."
  );
  assert.match(fake.requests[0].q[0], /ZQABC-test/);
  assert.match(fake.requests[0].q[0], />zqa<\/span>/);
});

test("the Cloud endpoint keeps its existing marker contract without live credentials", async () => {
  const fake = endpoint();
  assert.equal(
    await translate("Read `TOKEN`.", fake.fetchImpl, "synthetic-test-key"),
    "Leia `TOKEN`."
  );
  assert.equal(fake.requests[0].official, true);
  assert.match(fake.requests[0].q[0], />zqa<\/span>/);
  assert.doesNotMatch(fake.requests[0].q[0], />ZQA<\/span>/);
});
