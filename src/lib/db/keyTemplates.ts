/**
 * db/keyTemplates.ts — Key Templates storage and policy snapshots.
 *
 * Templates hold an editable, secret-free key policy (see shared/types/keyTemplates.ts).
 * Keys created from a template copy the submitted policy; they keep no link to the
 * template, so editing or deleting a template never changes an existing key.
 */

import { v4 as uuidv4 } from "uuid";
import type { z } from "zod";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import {
  collectReferenceIssues,
  deleteStoredTemplate,
  getStoredTemplate,
  insertStoredTemplate,
  KeyTemplateNameConflictError,
  listStoredTemplates,
  readKeyPolicyRows,
  runDeferred,
  snapshotToTemplatePolicy,
  updateStoredTemplate,
  type PolicyDb,
  type StoredKeyTemplate,
} from "./keyTemplates/policyCore.ts";
import { keyTemplatePolicySchema } from "@/shared/validation/schemas/keyTemplates";
import { KeyTemplateError } from "./keyTemplates/errors.ts";
import type {
  KeyTemplate,
  KeyTemplatePolicy,
  KeyTemplateRefStatus,
  ListKeyTemplatesResponse,
  TemplateReferenceIssue,
  TemplateWarning,
  TemplateWarningCode,
} from "@/shared/types/keyTemplates";
import * as log from "@/sse/utils/logger";

export { KeyTemplateError };

function db(): PolicyDb {
  return getDbInstance() as unknown as PolicyDb;
}

/** Maps zod issues onto the template issue shape (`path` is dotted, prefixed). */
export function zodIssuesToTemplateIssues(
  error: z.ZodError,
  prefix = ""
): TemplateReferenceIssue[] {
  return error.issues.map((zodIssue) => ({
    path: [prefix, ...zodIssue.path.map(String)].filter(Boolean).join("."),
    code: "INVALID_FIELD" as const,
    message: zodIssue.message,
    blocking: true,
  }));
}

function toTemplate(stored: StoredKeyTemplate): KeyTemplate {
  let policy: unknown;
  try {
    policy = JSON.parse(stored.policyJson);
  } catch {
    throw new KeyTemplateError(422, "VALIDATION_FAILED", "Stored template policy is unreadable");
  }
  if (stored.schemaVersion !== 1) {
    throw new KeyTemplateError(422, "VALIDATION_FAILED", "Unsupported stored template version");
  }
  const parsed = keyTemplatePolicySchema.safeParse(policy);
  if (!parsed.success) {
    throw new KeyTemplateError(422, "VALIDATION_FAILED", "Stored template policy is invalid", {
      issues: zodIssuesToTemplateIssues(parsed.error, "policy"),
    });
  }
  return {
    id: stored.id,
    name: stored.name,
    description: stored.description,
    revision: stored.revision,
    schemaVersion: 1,
    policy: policy as KeyTemplatePolicy,
    createdAt: stored.createdAt,
    updatedAt: stored.updatedAt,
  };
}

function validatePolicy(policy: unknown, prefix = "policy"): KeyTemplatePolicy {
  const parsed = keyTemplatePolicySchema.safeParse(policy);
  if (!parsed.success) {
    throw new KeyTemplateError(400, "VALIDATION_FAILED", "The policy is invalid", {
      issues: zodIssuesToTemplateIssues(parsed.error, prefix),
    });
  }
  return parsed.data as KeyTemplatePolicy;
}

async function audit(action: string, target: string, details: Record<string, unknown>) {
  try {
    const { logAuditEvent } = await import("@/lib/compliance");
    logAuditEvent({ action, target, resourceType: "key_template", details });
  } catch {
    // Audit must never turn a committed write into a failure.
  }
}

/** A corrupt policy does not hide other templates or prevent deleting its row by id. */
export function listKeyTemplates(): ListKeyTemplatesResponse {
  const result: ListKeyTemplatesResponse = { templates: [], unreadable: [] };
  for (const stored of listStoredTemplates(db())) {
    try {
      result.templates.push(toTemplate(stored));
    } catch (error) {
      if (!(error instanceof KeyTemplateError)) throw error;
      log.warn("key-templates", "Unreadable stored template", { id: stored.id, code: error.code });
      result.unreadable.push({
        id: stored.id,
        name: stored.name,
        revision: stored.revision,
        code: error.code,
      });
    }
  }
  return result;
}

export function getKeyTemplate(
  id: string
): { template: KeyTemplate; referenceIssues: TemplateReferenceIssue[] } | null {
  const handle = db();
  const stored = getStoredTemplate(handle, id);
  if (!stored) return null;
  const template = toTemplate(stored);
  return { template, referenceIssues: collectReferenceIssues(handle, template.policy) };
}

export function getKeyTemplateRefStatus(ref: {
  id: string;
  revision: number;
}): KeyTemplateRefStatus {
  const stored = getStoredTemplate(db(), ref.id);
  if (!stored) return "missing";
  return stored.revision === ref.revision ? "current" : "stale";
}

function storeTemplate(name: string, description: string, policy: KeyTemplatePolicy): KeyTemplate {
  try {
    return toTemplate(
      insertStoredTemplate(db(), {
        id: uuidv4(),
        name,
        description,
        policyJson: JSON.stringify(policy),
        now: new Date().toISOString(),
      })
    );
  } catch (error) {
    if (error instanceof KeyTemplateNameConflictError) {
      throw new KeyTemplateError(409, "TEMPLATE_NAME_CONFLICT", error.message);
    }
    throw error;
  }
}

export async function createKeyTemplate(input: {
  name: string;
  description?: string;
  policy: unknown;
}): Promise<KeyTemplate> {
  const policy = validatePolicy(input.policy);
  const template = storeTemplate(input.name, input.description ?? "", policy);
  await audit("keyTemplate.create", template.id, { name: template.name, source: "policy" });
  backupDbFile("pre-write");
  return template;
}

/**
 * Secret-free capture of an existing key. Throws KeyTemplateError when the key is
 * missing or cannot be captured faithfully (unreadable or unclassified values).
 */
export function previewKeyTemplatePolicy(keyId: string): {
  policy: KeyTemplatePolicy;
  warnings: TemplateWarning[];
  referenceIssues: TemplateReferenceIssue[];
} {
  const handle = db();
  return runDeferred(handle, () => {
    const rows = readKeyPolicyRows(handle, keyId);
    if (!rows) throw new KeyTemplateError(404, "KEY_NOT_FOUND", "Key not found");
    const snapshot = snapshotToTemplatePolicy(rows, Date.now());
    if (snapshot.problems.length > 0) {
      throw new KeyTemplateError(
        422,
        "SOURCE_POLICY_UNREADABLE",
        "The key holds settings that cannot be captured faithfully; fix them on the key first",
        { issues: snapshot.problems, warnings: snapshot.warnings }
      );
    }
    const parsed = keyTemplatePolicySchema.safeParse(snapshot.policy);
    if (!parsed.success) {
      throw new KeyTemplateError(
        422,
        "SOURCE_POLICY_UNREADABLE",
        "The key holds settings outside the editable ranges; fix them on the key first",
        { issues: zodIssuesToTemplateIssues(parsed.error, "policy"), warnings: snapshot.warnings }
      );
    }
    // Keep the exact snapshot (zod trimming must not alter captured values silently).
    const policy = snapshot.policy;
    return {
      policy,
      warnings: snapshot.warnings,
      referenceIssues: collectReferenceIssues(handle, policy),
    };
  });
}

export async function createKeyTemplateFromKey(
  input: {
    name: string;
    description?: string;
    fromKeyId: string;
    acknowledge?: string[];
  },
  preview: ReturnType<typeof previewKeyTemplatePolicy>
): Promise<{ template: KeyTemplate; warnings: TemplateWarning[] }> {
  const acknowledged = new Set(input.acknowledge ?? []);
  const pending = preview.warnings.filter(
    (warning) => warning.requiresAcknowledgement && !acknowledged.has(warning.code)
  );
  if (pending.length > 0) {
    throw new KeyTemplateError(
      409,
      "ACKNOWLEDGEMENT_REQUIRED",
      `Acknowledge before saving: ${pending.map((w) => w.code).join(", ")}`,
      { warnings: pending }
    );
  }
  const template = storeTemplate(input.name, input.description ?? "", preview.policy);
  await audit("keyTemplate.create", template.id, {
    name: template.name,
    source: "key",
    sourceKeyId: input.fromKeyId,
    acknowledged: preview.warnings
      .filter((w) => w.requiresAcknowledgement)
      .map((w) => w.code) as TemplateWarningCode[],
  });
  backupDbFile("pre-write");
  return { template, warnings: preview.warnings };
}

export async function updateKeyTemplate(
  id: string,
  input: { revision: number; name?: string; description?: string; policy?: unknown }
): Promise<KeyTemplate> {
  const policy = input.policy === undefined ? undefined : validatePolicy(input.policy);
  let result: ReturnType<typeof updateStoredTemplate>;
  try {
    result = updateStoredTemplate(db(), {
      id,
      revision: input.revision,
      name: input.name,
      description: input.description,
      policyJson: policy === undefined ? undefined : JSON.stringify(policy),
      now: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof KeyTemplateNameConflictError) {
      throw new KeyTemplateError(409, "TEMPLATE_NAME_CONFLICT", error.message);
    }
    throw error;
  }
  if (result.status === "not_found") {
    throw new KeyTemplateError(404, "TEMPLATE_NOT_FOUND", "Template not found");
  }
  if (result.status === "conflict") {
    throw new KeyTemplateError(
      409,
      "REVISION_CONFLICT",
      `The template changed (current revision ${result.currentRevision}); reload and reapply your edits`
    );
  }
  await audit("keyTemplate.update", id, {
    revision: result.template.revision,
    fields: Object.keys(input).filter((field) => field !== "revision"),
  });
  backupDbFile("pre-write");
  return toTemplate(result.template);
}

export async function deleteKeyTemplate(id: string): Promise<boolean> {
  const deleted = deleteStoredTemplate(db(), id);
  if (deleted) {
    await audit("keyTemplate.delete", id, {});
    backupDbFile("pre-write");
  }
  return deleted;
}
