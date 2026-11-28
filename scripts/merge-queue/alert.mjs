import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

export const ALERT_TEXT =
  "omni-queue on {base}: batch {batch} hit a problem ({reason}). This is the only alert for this episode. Details and next steps: {link}";

const runCurl = promisify(execFile);
const SMTP_HOST = "smtp.gmail.com";
export const ALERT_EMAIL_ENV_KEYS = Object.freeze([
  "OMNI_QUEUE_ALERT_EMAIL_TO",
  "OMNI_QUEUE_SMTP_USER",
  "OMNI_QUEUE_SMTP_APP_PASSWORD",
]);
const singleLine = (value) => String(value ?? "").replace(/[\p{Cc}\p{Zl}\p{Zp}]/gu, "");
const quote = (value) => `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;

export function buildAlert({ base, batch, reason, link }) {
  const fields = {
    base: singleLine(base),
    batch: singleLine(batch) || "-",
    reason: singleLine(reason).slice(0, 200),
    link: singleLine(link),
  };
  return {
    subject: `omni-queue on ${fields.base}: ${fields.reason}`.slice(0, 150),
    text: ALERT_TEXT.replace(/\{(base|batch|reason|link)\}/g, (_, field) => fields[field]),
  };
}

function failureDetail(error, secrets) {
  const pattern = secrets
    .sort((a, b) => b.length - a.length)
    .map(RegExp.escape)
    .join("|");
  const stderr = String(error?.stderr ?? "").replace(new RegExp(pattern, "gi"), "<redacted>");
  const first = singleLine(stderr.split(/[\r\n]/, 1)[0]).slice(0, 300);
  const exit = Number.isInteger(error?.code) ? error.code : "unknown";
  return first ? `exit ${exit}: ${first}` : `exit ${exit}`;
}

export async function sendAlertEmail({ env, subject, text, now, run = runCurl }) {
  const secrets = ALERT_EMAIL_ENV_KEYS.map((key) => singleLine(env[key]).trim());
  if (secrets.some((value) => !value)) return { sent: false, reason: "not-configured" };
  const [to, user, password] = secrets;

  try {
    const dir = await mkdtemp(join(tmpdir(), "omni-queue-alert-"));
    try {
      const netrc = join(dir, "netrc");
      const config = join(dir, "curl.conf");
      const message = join(dir, "message");
      const privateFile = { mode: 0o600 };
      const netrcToken = (value) => (/\s|["\\]/u.test(value) ? quote(value) : value);
      await writeFile(
        netrc,
        `machine ${SMTP_HOST} login ${netrcToken(user)} password ${netrcToken(password)}\n`,
        privateFile
      );
      // Keep the SMTP envelope addresses out of the process arguments as well.
      await writeFile(
        config,
        `mail-from = ${quote(user)}\nmail-rcpt = ${quote(to)}\n`,
        privateFile
      );
      await writeFile(
        message,
        [
          `From: ${user}`,
          `To: ${to}`,
          `Subject: ${singleLine(subject).slice(0, 150)}`,
          `Date: ${new Date(now).toUTCString().replace(/GMT$/, "+0000")}`,
          "MIME-Version: 1.0",
          "Content-Type: text/plain; charset=utf-8",
          "",
          String(text).replace(/\r\n|\r|\n/g, "\r\n"),
          "",
        ].join("\r\n"),
        privateFile
      );
      await run(
        "curl",
        [
          "--disable",
          "--silent",
          "--show-error",
          "--ssl-reqd",
          "--max-time",
          "30",
          "--url",
          `smtps://${SMTP_HOST}:465`,
          "--netrc-file",
          netrc,
          "--config",
          config,
          "--upload-file",
          message,
        ],
        { env: { PATH: env.PATH ?? process.env.PATH } }
      );
      return { sent: true };
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  } catch (error) {
    return { sent: false, reason: "failed", detail: failureDetail(error, secrets) };
  }
}
