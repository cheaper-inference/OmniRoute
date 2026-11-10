import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import type {
  KeyTemplateApiError,
  KeyTemplateErrorCode,
  TemplateReferenceIssue,
  TemplateWarning,
} from "../../../shared/types/keyTemplates.ts";

/** A Key Templates failure carrying its HTTP status and the `{error, code, issues?}` body. */
export class KeyTemplateError extends Error {
  readonly status: number;
  readonly code: KeyTemplateErrorCode;
  readonly issues?: TemplateReferenceIssue[];
  readonly warnings?: TemplateWarning[];

  constructor(
    status: number,
    code: KeyTemplateErrorCode,
    message: string,
    extra: { issues?: TemplateReferenceIssue[]; warnings?: TemplateWarning[] } = {}
  ) {
    super(message);
    this.name = "KeyTemplateError";
    this.status = status;
    this.code = code;
    if (extra.issues) this.issues = extra.issues;
    if (extra.warnings) this.warnings = extra.warnings;
  }

  toBody(): KeyTemplateApiError {
    return {
      error: sanitizeErrorMessage(this.message),
      code: this.code,
      ...(this.issues && { issues: this.issues }),
      ...(this.warnings && { warnings: this.warnings }),
    };
  }
}
