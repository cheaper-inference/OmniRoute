import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Voice chat security/UX invariants (React components: vitest-ui advisory dashboard-typecheck).
const CHAT = "src/app/(dashboard)/dashboard/conductor/FaroChat.tsx";

function src(): string {
  return fs.readFileSync(path.join(process.cwd(), CHAT), "utf8");
}

test("client ONLY talks to OmniRoute: /api/conductor/ask + /api/v1/audio/* (never direct Faro/hub)", () => {
  const s = src();
  assert.match(s, /"use client"/);
  assert.match(s, /\/api\/conductor\/ask/);
  assert.match(s, /\/api\/v1\/audio\/transcriptions/);
  assert.match(s, /\/api\/v1\/audio\/speech/);
  assert.ok(!s.includes(":7920"), "endereço do Faro nunca no client");
  assert.ok(!s.includes("CONDUCTOR_"), "nenhuma env do Conductor no client");
});

test("Faro pending → Yes/No buttons that send 'yes'/'no' (confirmation lock is from the Faro engine)", () => {
  const s = src();
  assert.match(s, /pending/);
  assert.match(s, /"sim"/);
  assert.match(s, /"não"/);
});

test("voz: push-to-talk com MediaRecorder/getUserMedia; STT multipart sem Content-Type manual; TTS via Blob com revoke", () => {
  const s = src();
  assert.match(s, /navigator\.mediaDevices\.getUserMedia/);
  assert.match(s, /MediaRecorder/);
  assert.match(s, /FormData\(\)/);
  assert.ok(!/audio\/transcriptions[\s\S]{0,300}content-type/i.test(s), "multipart deixa o browser definir o boundary");
  assert.match(s, /URL\.createObjectURL/);
  assert.match(s, /URL\.revokeObjectURL/);
  assert.match(s, /useTranslations\("conductor"\)/);
});
