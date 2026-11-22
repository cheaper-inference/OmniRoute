import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  handleVideoCut,
  handleVideoResize,
  handleVideoSpeed,
  imageGenerateInput,
  videoCutInput,
  videoResizeInput,
  videoSpeedInput,
  visionAnalyzeInput,
} from "../../open-sse/mcp-server/tools/filekitTools.ts";

function probe(pathToFile: string): { width: number; height: number; duration: number } {
  const out = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=width,height",
      "-of",
      "json",
      pathToFile,
    ],
    { encoding: "utf8" }
  );
  const parsed = JSON.parse(out) as {
    format?: { duration?: string };
    streams?: Array<{ width?: number; height?: number }>;
  };
  return {
    width: parsed.streams?.[0]?.width ?? 0,
    height: parsed.streams?.[0]?.height ?? 0,
    duration: Number(parsed.format?.duration ?? 0),
  };
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "filekit-tools-"));
const sourceVideo = path.join(tmpDir, "source.mp4");

test.before(() => {
  execFileSync(
    "ffmpeg",
    [
      "-f",
      "lavfi",
      "-i",
      "testsrc=duration=4:size=640x360:rate=15",
      "-pix_fmt",
      "yuv420p",
      sourceVideo,
      "-y",
    ],
    { stdio: "pipe" }
  );
});

test.after(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("video tools menghasilkan output valid", async () => {
  const cut = await handleVideoCut(
    videoCutInput.parse({ input: sourceVideo, start: "0", duration: "2" })
  );
  const cutPath = cut.match(/\/[^ \n]+\.mp4/)?.[0];
  assert.ok(cutPath, `path tidak ditemukan di: ${cut}`);
  assert.ok(fs.existsSync(cutPath), "file hasil cut tidak ada");
  const cutInfo = probe(cutPath);
  assert.ok(Math.abs(cutInfo.duration - 2) < 0.5, `durasi cut salah: ${cutInfo.duration}`);

  const sped = await handleVideoSpeed(videoSpeedInput.parse({ input: sourceVideo, factor: 0.5 }));
  const spedPath = sped.match(/\/[^ \n]+\.mp4/)?.[0];
  assert.ok(spedPath);
  const spedInfo = probe(spedPath);
  assert.ok(spedInfo.duration > 7, `speed 0.5x tidak memperlambat: ${spedInfo.duration}`);

  const resized = await handleVideoResize(
    videoResizeInput.parse({ input: sourceVideo, preset: "reels" })
  );
  const resizedPath = resized.match(/\/[^ \n]+\.mp4/)?.[0];
  assert.ok(resizedPath);
  const resizedInfo = probe(resizedPath);
  assert.equal(resizedInfo.width, 1080);
  assert.equal(resizedInfo.height, 1920);
});

test("validasi input menolak nilai tidak valid", () => {
  assert.throws(() => videoSpeedInput.parse({ input: sourceVideo, factor: 9 }));
  assert.throws(() => videoCutInput.parse({ input: sourceVideo, start: "abc", duration: "2" }));
  assert.throws(() => visionAnalyzeInput.parse({ path: "", context: "general" }));
  assert.throws(() => imageGenerateInput.parse({ prompt: "", n: 1 }));
});

test("handler mengembalikan pesan error untuk file yang tidak ada", async () => {
  const cut = await handleVideoCut(
    videoCutInput.parse({ input: "/tmp/tidak-ada-video.mp4", start: "0", duration: "1" })
  );
  assert.match(cut, /Gagal/);
});
