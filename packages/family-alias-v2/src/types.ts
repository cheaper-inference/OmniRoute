export type BillingClass = "subscription" | "payg" | "unknown";

export type LocalEndpoint = {
  connectionId: string;
  providerId: string;
  modelId: string;
  billingClass: BillingClass;
  active: boolean;
  localFamilyId?: string | null;
};

export type MetadataRecord = {
  modelId: string;
  familyId?: string | null;
  releaseDate?: string | null;
  created?: number | null;
  contextWindow?: number | null;
};

export type VersionIdentity = {
  generation: number[];
  display: string;
  releaseTag?: string | null;
  contextSize?: string | null;
};

export type LineageIdentity = {
  owner: string;
  line: string;
  modality?: string | null;
};

export type ClassifiedEndpoint = {
  endpoint: LocalEndpoint;
  lineage: LineageIdentity;
  version: VersionIdentity;
  isReasoningVariant: boolean;
};

export type EndpointIdentity = {
  connectionId: string;
  providerId: string;
  modelId: string;
};

export type FamilyGraph = {
  families: Array<{
    alias: string;
    versions: Array<{
      version: VersionIdentity;
      endpoints: ClassifiedEndpoint[];
    }>;
  }>;
};
