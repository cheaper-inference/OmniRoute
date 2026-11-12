import assert from "node:assert/strict";
import test from "node:test";
import { translateMarkdownWithGoogle } from "../../scripts/i18n/lib/google-translate.mjs";

const source = "**Read** `TOKEN` and [API Guide](docs/guide.md).";

function endpoint({
  primary,
  retry = (text) =>
    text.replaceAll("Read", "Leia").replaceAll("and", "e").replaceAll("Guide", "Guia"),
} = {}) {
  const requests = [];
  const fetchImpl = async (url, options) => {
    const cloud = new URL(url).hostname === "translation.googleapis.com";
    const queries = cloud
      ? JSON.parse(options.body).q
      : new URLSearchParams(options.body).getAll("q");
    requests.push({ cloud, queries });
    const output = queries.map((text) => {
      if (!text.includes('<span translate="no">')) return retry(text);
      const ids = [...text.matchAll(/<span translate="no">([^<]+)<\/span>/g)].map((m) => m[1]);
      return primary ? primary(text, ids) : text.replace("Read", "CORRUPTED") + " " + ids.at(-1);
    });
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

function translate(fake, extra = {}) {
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

test("a known bare-marker echo retries only source prose and keeps every protected node", async () => {
  const fake = endpoint();
  const stats = {};
  assert.equal(await translate(fake, { stats }), "**Leia** `TOKEN` e [API Guia](docs/guide.md).");
  assert.equal(fake.requests.length, 2);
  assert.equal(stats.requests, 2);
  assert.equal(stats.untranslated, 0);
  assert.ok(
    fake.requests[1].queries.every((text) => !/[<>]|ZQ[A-Z]+|zq[a-z]+|TOKEN|docs\/guide/.test(text))
  );
});

test("the corrupt translated prose is discarded, never repaired by dropping its echoed id", async () => {
  const fake = endpoint({
    primary: (text, ids) => text.replace("Read", "UNTRUSTED REPLY") + " " + ids.at(-1),
  });
  const result = await translate(fake);
  assert.doesNotMatch(result, /UNTRUSTED|REPLY|ZQ[A-Z]+|zq[a-z]+/);
  assert.match(result, /Leia/);
});

test("a prose retry that simply echoes the English source does not count as translation", async () => {
  const fake = endpoint({ retry: (text) => text });
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("new markup in a prose-only retry remains rejected", async () => {
  const fake = endpoint({ retry: () => "<b>Leia</b>" });
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("new markers in a prose-only retry remain rejected", async () => {
  const fake = endpoint({ retry: () => "Leia ZQZZ" });
  await assert.rejects(translate(fake), /segments could not be restored/);
});

test("a missing protected marker does not enter the echo-only retry", async () => {
  const fake = endpoint({
    primary: (text) => text.replace(/<span translate="no">[^<]+<\/span>/, ""),
  });
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 1);
});

test("an invented marker does not enter the echo-only retry", async () => {
  const fake = endpoint({ primary: (text) => text + " ZQZZ" });
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 2);
  assert.ok(fake.requests[1].queries.every((text) => text.includes('<span translate="no">')));
});

test("a duplicated protected span does not enter the echo-only retry", async () => {
  const fake = endpoint({
    primary: (text) => text + /<span translate="no">[^<]+<\/span>/.exec(text)[0],
  });
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 1);
});

test("Cloud translation keeps its existing request and restoration contract", async () => {
  const fake = endpoint();
  await assert.rejects(
    translate(fake, { apiKey: "synthetic-test-key" }),
    /segments could not be restored/
  );
  assert.equal(fake.requests.length, 1);
  assert.equal(fake.requests[0].cloud, true);
});

test("failure of the prose retry cannot accept the original corrupt response", async () => {
  const fake = endpoint({
    retry: () => {
      throw new Error("synthetic retry unavailable");
    },
  });
  await assert.rejects(translate(fake), /segments could not be restored/);
});

for (const [name, indexes] of [
  ["an intermediate marker", [0]],
  ["a repeated intermediate marker", [0, 0]],
  ["several known markers", [0, 1, 0]],
]) {
  test(`${name} retries source prose while keeping the original spans local`, async () => {
    const fake = endpoint({
      primary: (text, ids) => {
        assert.ok(ids.length >= 2);
        return text.replace("Read", "CORRUPTED") + " " + indexes.map((i) => ids[i]).join(" ");
      },
    });
    const result = await translateMarkdownWithGoogle("**Read** `FIRST` and `SECOND`.", "pt-BR", {
      fetchImpl: fake.fetchImpl,
      apiKey: "",
      concurrency: 1,
      timeoutMs: 1000,
      backoffMs: 0,
      maxUntranslatedRatio: 0,
    });
    assert.equal(result, "**Leia** `FIRST` e `SECOND`.");
    assert.equal(fake.requests.length, 2);
    assert.ok(fake.requests[1].queries.every((text) => !/[<>]|ZQ[A-Z]+|zq[a-z]+/.test(text)));
  });
}

test("a known echo mixed with an invented marker cannot enter the prose retry", async () => {
  const fake = endpoint({ primary: (text, ids) => text + " " + ids.at(-1) + " ZQZZ" });
  await assert.rejects(translate(fake), /segments could not be restored/);
  assert.equal(fake.requests.length, 2);
  assert.ok(fake.requests[1].queries.every((text) => text.includes('<span translate="no">')));
});
