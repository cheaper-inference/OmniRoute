import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { buildAlert, sendAlertEmail } from "../../../scripts/merge-queue/alert.mjs";

const now = "2026-11-28T16:00:00.000Z";
const env = {
  OMNI_QUEUE_ALERT_EMAIL_TO: "alerts@example.invalid",
  OMNI_QUEUE_SMTP_USER: "sender@example.invalid",
  OMNI_QUEUE_SMTP_APP_PASSWORD: "fake-app-password",
};

test("buildAlert substitutes only template fields and strips controls from every field", () => {
  assert.deepEqual(
    buildAlert({
      base: "release/\rv\n1\u0000",
      batch: "b\t1",
      reason: "error\u0085",
      link: "https://example.invalid/\n{base}",
    }),
    {
      subject: "omni-queue on release/v1: error",
      text: "omni-queue on release/v1: batch b1 hit a problem (error). This is the only alert for this episode. Details and next steps: https://example.invalid/{base}",
    }
  );
  const { subject, text } = buildAlert({ base: "main", reason: "x".repeat(201), link: "-" });
  assert.equal(subject.length, 150);
  assert.ok(text.includes(`batch - hit a problem (${"x".repeat(200)}).`));
});

test("sendAlertEmail is off when any secret is missing", async () => {
  for (const key of Object.keys(env)) {
    assert.deepEqual(
      await sendAlertEmail({ env: { ...env, [key]: "" }, run: () => assert.fail("ran curl") }),
      { sent: false, reason: "not-configured" }
    );
  }
});

for (const fail of [false, true]) {
  test(`sendAlertEmail uses private files and cleans them up (curl fails: ${fail})`, async () => {
    let dir;
    let observed;
    const result = await sendAlertEmail({
      env,
      subject: "A queue alert\r\nBcc: injected@example.invalid",
      text: "queue text",
      now,
      async run(command, argv, options) {
        const file = (flag) => argv[argv.indexOf(flag) + 1];
        const netrc = file("--netrc-file");
        const config = file("--config");
        const message = file("--upload-file");
        dir = join(netrc, "..");
        observed = {
          command,
          argv,
          childEnv: options.env,
          netrc: await readFile(netrc, "utf8"),
          netrcMode: (await stat(netrc)).mode & 0o777,
          config: await readFile(config, "utf8"),
          message: await readFile(message, "utf8"),
        };
        if (fail) {
          throw Object.assign(new Error("unredacted error"), {
            code: 67,
            stderr:
              "curl: alerts@example.invalid rejected sender@example.invalid (fake-app-password)\r\nextra line",
          });
        }
      },
    });
    assert.equal(observed.command, "curl");
    assert.ok(observed.argv.includes("smtps://smtp.gmail.com:465"));
    for (const [name, value] of Object.entries(env)) {
      assert.ok(observed.argv.every((arg) => !arg.includes(value)));
      assert.equal(observed.childEnv[name], undefined);
    }
    assert.equal(observed.netrcMode, 0o600);
    assert.equal(
      observed.netrc,
      "machine smtp.gmail.com login sender@example.invalid password fake-app-password\n"
    );
    assert.equal(
      observed.config,
      'mail-from = "sender@example.invalid"\nmail-rcpt = "alerts@example.invalid"\n'
    );
    assert.equal(
      observed.message,
      [
        "From: sender@example.invalid",
        "To: alerts@example.invalid",
        "Subject: A queue alertBcc: injected@example.invalid",
        "Date: Sat, 28 Nov 2026 16:00:00 +0000",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=utf-8",
        "",
        "queue text",
        "",
      ].join("\r\n")
    );
    assert.deepEqual(
      result,
      fail
        ? {
            sent: false,
            reason: "failed",
            detail: "exit 67: curl: <redacted> rejected <redacted> (<redacted>)",
          }
        : { sent: true }
    );
    await assert.rejects(stat(dir), { code: "ENOENT" });
  });
}

test("sendAlertEmail redacts secrets with regex characters, in any case", async () => {
  const tricky = {
    OMNI_QUEUE_ALERT_EMAIL_TO: "Alerts+Queue@Example.invalid",
    OMNI_QUEUE_SMTP_USER: "sender@example.invalid",
    OMNI_QUEUE_SMTP_APP_PASSWORD: "p.ss+(word)*",
  };
  const result = await sendAlertEmail({
    env: tricky,
    subject: "s",
    text: "t",
    now,
    async run() {
      throw Object.assign(new Error("x"), {
        code: 67,
        stderr: "curl: alerts+queue@example.INVALID SENDER@example.invalid p.ss+(word)* pXss",
      });
    },
  });
  assert.deepEqual(result, {
    sent: false,
    reason: "failed",
    detail: "exit 67: curl: <redacted> <redacted> <redacted> pXss",
  });
});
