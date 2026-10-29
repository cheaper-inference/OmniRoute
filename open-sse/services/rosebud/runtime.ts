import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile, stat, rm } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { rosebudArtifactType, ROSEBUD_ARTIFACT_FORMATS } from "./artifact.ts";
import { rosebudModel, validateRosebudInput, type RosebudModel } from "./catalog.ts";
import {
  runRosebud,
  rosebudRoot,
  rosebudProfile,
  RosebudError,
  type RosebudRunner,
  type JsonObject,
} from "./cli.ts";

export const generationInput = z
  .object({
    model: z.string().regex(/^(?:rosebud\/)?[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/),
    input: z.record(z.string(), z.unknown()),
    category: z
      .enum(["image", "skybox", "model_3d", "sound_effect", "music", "video", "speech"])
      .optional(),
    idempotencyKey: z.string().min(1).max(200).optional(),
    maxCredits: z.number().int().nonnegative().optional(),
  })
  .strict();
export type RosebudJob = {
  id: string;
  profile: string;
  model: string;
  category: string;
  input: JsonObject;
  fingerprint: string;
  status: string;
  upstreamId?: string;
  assetId?: string;
  estimatedCredits?: number;
  actualCredits?: number;
  refundedCredits?: number;
  maxCredits?: number;
  error?: string;
  unpaidFailure?: boolean;
  updatedAt: string;
};
const PROCESS_INSTANCE = Symbol.for("omniroute.rosebud.processInstance");
const processState = globalThis as typeof globalThis & { [PROCESS_INSTANCE]?: string };
const processInstance = (processState[PROCESS_INSTANCE] ??= randomUUID());
const REFRESHES = Symbol.for("omniroute.rosebud.refreshes");
const refreshState = globalThis as typeof globalThis & {
  [REFRESHES]?: Map<string, Promise<RosebudJob>>;
};
const refreshes = (refreshState[REFRESHES] ??= new Map<string, Promise<RosebudJob>>());
const ordered = (input: JsonObject) =>
  Object.fromEntries(Object.entries(input).sort(([a], [b]) => a.localeCompare(b)));
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
export class RosebudRuntime {
  constructor(private run: RosebudRunner = runRosebud) {}
  async models(profile: string): Promise<RosebudModel[]> {
    const result = await this.run(profile, ["assets", "models"]);
    if (!Array.isArray(result.models)) throw new RosebudError("invalid_model_catalog", 502);
    return result.models.flatMap((entry) => {
      const parsed = rosebudModel.safeParse(entry);
      return parsed.success && (!parsed.data.status || parsed.data.status === "live")
        ? [parsed.data]
        : [];
    });
  }
  async account(profile: string) {
    return this.run(profile, ["whoami"]);
  }
  async quote(profile: string, modelId: string, input: JsonObject) {
    const model = (await this.models(profile)).find(
      (entry) => entry.id === modelId.replace(/^rosebud\//, "")
    );
    if (!model) throw new RosebudError("unknown_model", 400);
    const validated = validateRosebudInput(model, input);
    const dir = join(rosebudRoot(), "quotes", randomUUID());
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const file = join(dir, "input.json");
    await writeFile(file, JSON.stringify(validated), { mode: 0o600 });
    try {
      return await this.run(profile, [
        "assets",
        "quote",
        "--model",
        model.id,
        "--input-json",
        file,
      ]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
  private folder(id: string) {
    if (!/^[a-f0-9]{64}$/.test(id)) throw new RosebudError("invalid_job", 400);
    return join(rosebudRoot(), "jobs", id);
  }
  private async save(job: RosebudJob) {
    job.updatedAt = new Date().toISOString();
    const path = join(this.folder(job.id), "job.json"),
      temporary = path + "." + randomUUID();
    await writeFile(temporary, JSON.stringify(job), { mode: 0o600 });
    await rename(temporary, path);
  }
  // Reclaim a crashed worker's lease only after proving its process is gone.
  // A missing/malformed owner stays closed for operator reconciliation.
  private async lock(id: string): Promise<() => Promise<void>> {
    const folder = this.folder(id);
    const lock = join(folder, "lock");
    const reclaim = join(folder, "reclaim");
    try {
      await mkdir(lock);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      try {
        await mkdir(reclaim);
      } catch {
        throw new RosebudError("job_busy", 409);
      }
      try {
        const owner = JSON.parse(await readFile(join(lock, "owner.json"), "utf8"));
        if (!Number.isInteger(owner.pid) || owner.pid <= 0) throw new Error("invalid owner");
        let dead =
          owner.pid === process.pid &&
          typeof owner.instance === "string" &&
          owner.instance !== processInstance;
        try {
          process.kill(owner.pid, 0);
        } catch (cause) {
          dead = (cause as NodeJS.ErrnoException).code === "ESRCH";
        }
        if (!dead) throw new RosebudError("job_busy", 409);
        await rm(lock, { recursive: true });
        await mkdir(lock);
      } catch {
        throw new RosebudError("job_busy", 409);
      } finally {
        await rm(reclaim, { recursive: true, force: true });
      }
    }
    await writeFile(
      join(lock, "owner.json"),
      JSON.stringify({ pid: process.pid, instance: processInstance }),
      {
        mode: 0o600,
      }
    );
    return () => rm(lock, { recursive: true, force: true });
  }
  async read(profile: string, id: string): Promise<RosebudJob> {
    const job = JSON.parse(await readFile(join(this.folder(id), "job.json"), "utf8")) as RosebudJob;
    if (job.profile !== profile) throw new RosebudError("job_not_found", 404);
    return job;
  }
  async generate(profile: string, raw: unknown, signal?: AbortSignal | null): Promise<RosebudJob> {
    const request = generationInput.parse(raw);
    const modelId = request.model.replace(/^rosebud\//, "");
    const model = (await this.models(profile)).find((entry) => entry.id === modelId);
    if (!model) throw new RosebudError("unknown_model", 400);
    if (request.category && request.category !== model.category)
      throw new RosebudError("unsupported_modality", 400);
    const input = validateRosebudInput(model, request.input);
    const formats =
      typeof input.output_format === "string" ? [input.output_format] : model.output_formats;
    if (
      !formats.length ||
      formats.some(
        (format) => !ROSEBUD_ARTIFACT_FORMATS.has(format.toLowerCase().replace(/^\./, ""))
      )
    )
      throw new RosebudError("unsupported_output_format", 400);

    const fingerprint = hash(JSON.stringify([modelId, ordered(input), request.maxCredits ?? null]));
    const id = hash(JSON.stringify([profile, request.idempotencyKey ?? randomUUID()]));
    const folder = this.folder(id);
    await mkdir(folder, { recursive: true, mode: 0o700 });
    let existing: RosebudJob | undefined;
    try {
      existing = await this.read(profile, id);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    if (existing && existing.fingerprint !== fingerprint)
      throw new RosebudError("idempotency_conflict", 409);
    if (existing && !existing.unpaidFailure)
      return existing.upstreamId ? this.refresh(profile, id) : existing;
    const unlock = await this.lock(id);
    const job: RosebudJob = {
      id,
      profile,
      model: modelId,
      category: model.category,
      input,
      fingerprint,
      maxCredits: request.maxCredits,
      status: "submitting",
      updatedAt: new Date().toISOString(),
    };
    let submitted = false;
    let persist = false;
    let claimed = false;
    const claim = join(
      rosebudRoot(),
      "pending",
      hash(JSON.stringify([profile, modelId, ordered(input)]))
    );
    try {
      try {
        const latest = await this.read(profile, id);
        if (latest.fingerprint !== fingerprint) throw new RosebudError("idempotency_conflict", 409);
        if (!latest.unpaidFailure) return latest.upstreamId ? this.refresh(profile, id) : latest;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      persist = true;
      await this.save(job);
      const quote = await this.quote(profile, modelId, input);
      if (typeof quote.credits === "number") job.estimatedCredits = quote.credits;
      await writeFile(join(folder, "input.json"), JSON.stringify(input), { mode: 0o600 });
      await this.save(job);
      if (signal?.aborted) throw new RosebudError("request_cancelled", 408);
      await mkdir(join(rosebudRoot(), "pending"), { recursive: true, mode: 0o700 });
      try {
        await writeFile(claim, job.id, { flag: "wx", mode: 0o600 });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        if ((await readFile(claim, "utf8")) !== job.id)
          throw new RosebudError("matching_request_requires_reconciliation", 409);
      }
      claimed = true;
      submitted = true;
      return await this.submit(job, request.maxCredits);
    } catch (error) {
      if (!persist) throw error;
      const uncertain = submitted && (!(error instanceof RosebudError) || error.uncertain);
      job.unpaidFailure = !uncertain;
      job.status = uncertain ? "uncertain" : "failed";
      job.error = error instanceof RosebudError ? error.code : "generation_failed";
      await this.save(job);
      if (error instanceof RosebudError) error.jobId = job.id;
      throw error;
    } finally {
      if (claimed && (job.upstreamId || job.unpaidFailure)) await rm(claim, { force: true });
      await unlock();
    }
  }
  private async submit(job: RosebudJob, maxCredits?: number) {
    const args = [
      "assets",
      "create",
      "--model",
      job.model,
      "--input-json",
      join(this.folder(job.id), "input.json"),
      "--no-wait",
    ];
    if (maxCredits !== undefined) args.push("--max-credits", String(maxCredits));
    const result = await this.run(job.profile, args);
    this.apply(job, result);
    await this.save(job);
    return job;
  }
  private apply(job: RosebudJob, result: JsonObject) {
    if (typeof result.id === "string") job.upstreamId = result.id;
    if (typeof result.status === "string") job.status = result.status;
    const asset = result.asset as JsonObject | undefined;
    if (asset && typeof asset.id === "string") job.assetId = asset.id;
    // `credits` is the reservation/quote; only charged_credits is actual spending.
    if (typeof result.charged_credits === "number") job.actualCredits = result.charged_credits;
    else delete job.actualCredits;
    if (typeof result.refunded_credits === "number") job.refundedCredits = result.refunded_credits;
    const error = result.error as JsonObject | undefined;
    if (error && typeof error.code === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(error.code))
      job.error = error.code;
  }
  async refresh(profile: string, id: string) {
    const key = JSON.stringify([profile, id]);
    const existing = refreshes.get(key);
    if (existing) return existing;
    const pending = (async () => {
      const job = await this.read(profile, id);
      // Terminal jobs may receive later refunds; status reads must reconcile those too.
      if (job.upstreamId) {
        this.apply(job, await this.run(profile, ["assets", "status", job.upstreamId]));
        await this.save(job);
      }
      return job;
    })();
    refreshes.set(key, pending);
    try {
      return await pending;
    } finally {
      if (refreshes.get(key) === pending) refreshes.delete(key);
    }
  }

  /** Re-run only the identical CLI command; its durable pending state owns the upstream idempotency key. */
  async recover(profile: string, id: string) {
    let job = await this.read(profile, id);
    if (job.upstreamId) return this.refresh(profile, id);
    if (!["uncertain", "submitting"].includes(job.status)) return job;
    const pendingFingerprint = hash(
      JSON.stringify([
        job.model,
        Object.keys(job.input)
          .sort()
          .map((key) => [key, job.input[key]]),
      ])
    );
    const folder = await rosebudProfile(profile);
    let durablePending = false;
    for (const name of await readdir(folder)) {
      if (!/^asset-[a-f0-9]+\.json$/.test(name)) continue;
      try {
        const saved = JSON.parse(await readFile(join(folder, name), "utf8"));
        if (saved.fingerprint === pendingFingerprint && typeof saved.idempotency_key === "string")
          durablePending = true;
      } catch {
        /* malformed unrelated state cannot authorize another paid submission */
      }
    }
    // The CLI may have acknowledged and removed its pending record before its
    // stdout was lost. Without a durable upstream key, never pay a second time.
    const claim = join(
      rosebudRoot(),
      "pending",
      hash(JSON.stringify([profile, job.model, ordered(job.input)]))
    );
    let owner: string | undefined;
    try {
      owner = await readFile(claim, "utf8");
    } catch {
      /* no provable ownership */
    }
    if (!durablePending || owner !== id)
      throw new RosebudError("manual_reconciliation_required", 409, true);
    const unlock = await this.lock(id);
    try {
      job = await this.read(profile, id);
      if (job.upstreamId) return this.refresh(profile, id);
      const result = await this.submit(job, job.maxCredits);
      if (result.upstreamId) await rm(claim, { force: true });
      return result;
    } finally {
      await unlock();
    }
  }
  private async download(profile: string, assetId: string, file: string, category: string) {
    let exists = false;
    try {
      exists = (await stat(file)).isFile();
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    if (!exists) {
      const temporary = file + "." + randomUUID();
      try {
        await this.run(profile, ["assets", "download", assetId, "--out", temporary], 600000);
        const info = await stat(temporary);
        if (!info.isFile() || info.size > 128 * 1024 * 1024)
          throw new RosebudError("artifact_too_large", 413);
        rosebudArtifactType(await readFile(temporary), category);
        try {
          await rename(temporary, file);
        } catch (error) {
          // Another downloader may have published this same completed asset on Windows.
          if (!["EEXIST", "EPERM"].includes((error as NodeJS.ErrnoException).code || ""))
            throw error;
          await stat(file);
        }
      } finally {
        await rm(temporary, { force: true });
      }
    }
    const info = await stat(file);
    if (!info.isFile() || info.size > 128 * 1024 * 1024)
      throw new RosebudError("artifact_too_large", 413);
    const data = await readFile(file);
    return {
      data,
      mime: rosebudArtifactType(data, category),
      sha256: createHash("sha256").update(data).digest("hex"),
    };
  }
  async artifact(profile: string, id: string) {
    const job = await this.refresh(profile, id);
    if (job.status !== "succeeded" || !job.assetId) throw new RosebudError("asset_not_ready", 409);
    return {
      ...(await this.download(
        profile,
        job.assetId,
        join(this.folder(id), "artifact"),
        job.category
      )),
      job,
    };
  }
  async list(profile: string) {
    return this.run(profile, ["assets", "list"]);
  }
  async downloadAsset(profile: string, assetId: string) {
    await rosebudProfile(profile);
    z.string().uuid().parse(assetId);
    const folder = join(rosebudRoot(), "downloads", profile, assetId);
    await mkdir(folder, { recursive: true, mode: 0o700 });
    const result = await this.download(profile, assetId, join(folder, "artifact"), "any");
    return {
      assetId,
      b64_data: result.data.toString("base64"),
      mime_type: result.mime,
      sha256: result.sha256,
    };
  }
}
export const rosebudRuntime = new RosebudRuntime();
