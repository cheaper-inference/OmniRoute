import { MEGABRAIN_CONFIG } from "../constants/oauth";
import { kilocode } from "./kilocode";

/**
 * MegaBrain signs in with Kilo's device auth flow (its gateway is built on Kilo's):
 * POST {apiBaseUrl}/api/device-auth/codes, then poll /codes/{code} until it answers
 * 200 with a long-lived token. Only the host differs, so kilocode's handlers are reused.
 */
export const megabrain = {
  ...kilocode,
  config: MEGABRAIN_CONFIG,
};
