import { NextResponse } from "next/server";

type IntegerParam = { ok: true; value: number } | { ok: false; response: Response };

/**
 * Reads an integer query parameter (`?limit=`, `?offset=`, `?page=`). An absent or empty parameter gives the
 * fallback; anything that is not a plain decimal integer is refused with the 400 `response` the caller returns.
 * Range limits stay with the caller (the routes clamp `limit` and `offset` themselves): this only stops a value
 * such as `abc`, which `Number` and `Number.parseInt` turn into `NaN`. A `NaN` reaching the SQLite `LIMIT ?`
 * bind throws "datatype mismatch", and the list routes answered it with a 500.
 */
export function parseIntegerQueryParam(
  searchParams: URLSearchParams,
  name: string,
  fallback: number
): IntegerParam {
  const raw = searchParams.get(name);
  if (raw === null || raw === "") return { ok: true, value: fallback };
  const value = /^-?\d+$/.test(raw) ? Number(raw) : Number.NaN;
  if (!Number.isSafeInteger(value)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: { message: `${name} must be an integer`, type: "invalid_request_error" } },
        { status: 400 }
      ),
    };
  }
  return { ok: true, value };
}
