import assert from "node:assert/strict";
import test from "node:test";
import { translateMarkdownWithGoogle } from "../../scripts/i18n/lib/google-translate.mjs";

function endpoint(reply) {
  const requests = [];
  const fetchImpl = async (url, options) => {
    const cloud = new URL(url).hostname === "translation.googleapis.com";
    const queries = cloud
      ? JSON.parse(options.body).q
      : new URLSearchParams(options.body).getAll("q");
    requests.push({ cloud, queries });
    const output = queries.map((text) => reply(text, { queries, call: requests.length }));
    return new Response(
      JSON.stringify(
        cloud
          ? { data: { translations: output.map((translatedText) => ({ translatedText })) } }
          : output
      ),
      { headers: { "Content-Type": "application/json" } }
    );
  };
  return { fetchImpl, requests };
}

function translate(fake, source = "Read `TOKEN`.", extra = {}) {
  return translateMarkdownWithGoogle(source, "pt-BR", {
    fetchImpl: fake.fetchImpl,
    apiKey: "",
    concurrency: 1,
    timeoutMs: 1000,
    backoffMs: 0,
    maxUntranslatedRatio: 0,
    ...extra,
  });
}

test("unknown bare wire ids trigger one fresh source request with lowercase markers", async () => {
  const fake = endpoint((text) =>
    text.includes(">ZQA</span>")
      ? text.replace("Read", "UNTRUSTED") + " ZQZZ"
      : text.replace("Read", "Leia")
  );
  const stats = {};
  assert.equal(await translate(fake, undefined, { stats }), "Leia `TOKEN`.");
  assert.equal(fake.requests.length, 2);
  assert.match(fake.requests[1].queries[0], /^Read <span translate="no">zqa<\/span>\.$/);
  assert.doesNotMatch(fake.requests[1].queries[0], /UNTRUSTED|ZQZZ/);
  assert.equal(stats.requests, 2);
  assert.equal(stats.untranslated, 0);
});

test("empty batch responses retry original segments individually without changing their order", async () => {
  const fake = endpoint((text, { queries }) =>
    queries.length > 1 ? "" : text.replace("Read", "Leia").replace("Write", "Escreva")
  );
  const stats = {};
  assert.equal(
    await translate(fake, "Read `ONE`.\n\nWrite `TWO`.", { stats }),
    "Leia `ONE`.\n\nEscreva `TWO`."
  );
  assert.deepEqual(
    fake.requests.map((r) => r.queries.length),
    [2, 1, 1]
  );
  assert.equal(stats.requests, 3);
  assert.equal(stats.untranslated, 0);
});

test("an empty response to the individual retry remains rejected and cannot loop", async () => {
  const fake = endpoint(() => "");
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 2);
});

test("invented ids in both wire encodings remain rejected", async () => {
  const fake = endpoint((text) => text.replace("Read", "Leia") + " ZQZZ");
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("an alternate response that only repeats the source cannot count as recovery", async () => {
  const fake = endpoint((text) => (text.includes(">ZQA</span>") ? text + " ZQZZ" : text));
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("a missing protected span cannot qualify for alternate encoding", async () => {
  const fake = endpoint((text) => text.replace(/<span translate="no">[^<]+<\/span>/, "") + " ZQZZ");
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 1);
});

test("a duplicate protected span cannot qualify for alternate encoding", async () => {
  const fake = endpoint(
    (text) => text + /<span translate="no">[^<]+<\/span>/.exec(text)[0] + " ZQZZ"
  );
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 1);
});

test("failure of the alternate request cannot authorize its corrupt primary response", async () => {
  const fake = endpoint((text) => {
    if (text.includes(">zqa</span>")) throw new Error("synthetic alternate failure");
    return text.replace("Read", "UNTRUSTED") + " ZQZZ";
  });
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("Cloud responses do not acquire the keyless source retry", async () => {
  const fake = endpoint(() => "");
  await assert.rejects(
    translate(fake, undefined, { apiKey: "synthetic-test-key" }),
    /segments could not be restored/
  );
  assert.equal(fake.requests.length, 1);
  assert.equal(fake.requests[0].cloud, true);
});
