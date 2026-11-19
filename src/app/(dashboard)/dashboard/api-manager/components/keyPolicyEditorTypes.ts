import {
  type KeyTemplatePolicy,
  type PolicyEditorFormState,
  type TemplateReferenceIssue,
} from "../keyTemplatePolicyUtils";

export interface KeyPolicySixTabEditorProps {
  policy: KeyTemplatePolicy;
  onChange?: (nextPolicy: KeyTemplatePolicy, isDirty: boolean) => void;
  formStateOverride?: PolicyEditorFormState;
  onFormStateChange?: (state: PolicyEditorFormState) => void;
  serverReferenceIssues?: readonly TemplateReferenceIssue[];
  onValidationStateChange?: (state: {
    hasErrors: boolean;
    hasBlockingReferenceIssues: boolean;
    activeIssues: TemplateReferenceIssue[];
  }) => void;
  disabled?: boolean;
}
