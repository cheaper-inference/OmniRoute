import fs from "node:fs";
import path from "node:path";

const DATA_DIR = process.env.DATA_DIR || "/data";

function parseProxy(raw) {
  if (!raw) return null;
  const url = new URL(raw);
  return {
    server: `${url.protocol}//${url.host}`,
    username: url.username ? decodeURIComponent(url.username) : undefined,
    password: url.password ? decodeURIComponent(url.password) : undefined,
  };
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`missing env ${name}`);
  return v;
}

export const config = {
  port: Number(process.env.PORT || 8791),
  dataDir: DATA_DIR,
  profileDir: path.join(DATA_DIR, "profile"),
  headless: process.env.HEADLESS !== "false",
  proxy: parseProxy(process.env.PROXY_URL || ""),
  muse: {
    baseUrl: process.env.MUSE_BASE_URL || "https://muse.ai",
    email: required("MUSE_EMAIL"),
  },
  tmail: {
    baseUrl: process.env.TMAIL_BASE_URL || "https://www.tmail.pk",
    email: required("TMAIL_EMAIL"),
    password: required("TMAIL_PASSWORD"),
  },
  modelId: process.env.MODEL_ID || "muse-agent",
  replyTimeoutMs: Number(process.env.REPLY_TIMEOUT_MS || 240000),
  settleMs: Number(process.env.REPLY_SETTLE_MS || 3000),
};

export function ensureDirs() {
  fs.mkdirSync(config.dataDir, { recursive: true });
  fs.mkdirSync(config.profileDir, { recursive: true });
}

export function log(...args) {
  console.log(new Date().toISOString(), ...args);
}
