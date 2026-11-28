import { z } from "zod";

export const JEV_INSTRUCTIONS_MAX_LENGTH = 4_000;

export const jevInstructionsSchema = z.string().trim().max(JEV_INSTRUCTIONS_MAX_LENGTH);
