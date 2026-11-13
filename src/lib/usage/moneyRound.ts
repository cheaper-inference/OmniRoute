/**
 * Opt-in money rounding (OMNIROUTE_MONEY_ROUND_8DP, default off). One rule, applied once where an
 * amount is written: round half away from zero to 8 decimals, so the spend history and the cost
 * ledger hold the identical value and their sums reconcile.
 *
 * The rounding works on the shortest decimal text of the number, not on `x * 1e8`: the product
 * lands a hair below an exact tie for values such as 1.000000015, and Math.round then rounds
 * the wrong way. No decimal package: BigInt on the digit string is enough.
 */

export const isMoneyRound8Enabled = (env: Record<string, string | undefined> = process.env) =>
  ["1", "true", "yes"].includes((env.OMNIROUTE_MONEY_ROUND_8DP ?? "").toLowerCase());

/** Plain decimal digits of |x| (never exponent form). */
function plainDigits(abs: number): { whole: string; frac: string } {
  const text = abs.toString();
  if (!/e/i.test(text)) {
    const [whole, frac = ""] = text.split(".");
    return { whole, frac };
  }
  const [mantissa, exponent] = text.toLowerCase().split("e");
  const [mWhole, mFrac = ""] = mantissa.split(".");
  const digits = mWhole + mFrac;
  const point = mWhole.length + Number(exponent); // position of the decimal point in `digits`
  if (point <= 0) return { whole: "0", frac: "0".repeat(-point) + digits };
  if (point >= digits.length)
    return { whole: digits + "0".repeat(point - digits.length), frac: "" };
  return { whole: digits.slice(0, point), frac: digits.slice(point) };
}

/** Round half away from zero to 8 decimals. A non-finite value is returned unchanged. */
export function roundMoney8(value: number): number {
  if (!Number.isFinite(value) || value === 0) return value;
  const { whole, frac } = plainDigits(Math.abs(value));
  if (frac.length <= 8) return value;
  const scaled = BigInt(whole + frac.slice(0, 8)) + (frac.charCodeAt(8) >= 53 ? 1n : 0n);
  const text = scaled.toString().padStart(9, "0");
  const rounded = Number(`${text.slice(0, -8)}.${text.slice(-8)}`);
  return value < 0 ? -rounded : rounded;
}

/** The flag-gated form the money writers call. */
export const moneyForWrite = (value: number): number =>
  isMoneyRound8Enabled() ? roundMoney8(value) : value;
