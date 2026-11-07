import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProviderConnection, getProviderConnections } from "@/lib/db/providers";
import {
  getEligibleFreeOnboardingProviders,
  selectUnconfiguredFreeOnboardingProviders,
  setupFreeProviderConnections,
  withFreeProviderSetupLock,
} from "@/lib/providers/freeOnboarding";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const setupSchema = z.object({
  providerIds: z.array(z.string().trim().min(1)).min(1).max(20),
  confirmed: z.literal(true),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const candidates = getEligibleFreeOnboardingProviders();
    const connections = await getProviderConnections();
    return NextResponse.json({
      providers: selectUnconfiguredFreeOnboardingProviders(candidates, connections),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load free providers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(setupSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = await withFreeProviderSetupLock(() =>
      setupFreeProviderConnections({
        requestedIds: validation.data.providerIds,
        candidates: getEligibleFreeOnboardingProviders(),
        listExisting: () => getProviderConnections(),
        create: (input) => createProviderConnection(input),
      })
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Ineligible free provider IDs:")) {
      return NextResponse.json(
        { error: "One or more providers are not eligible" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to set up free providers" }, { status: 500 });
  }
}
