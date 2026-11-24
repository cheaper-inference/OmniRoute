/**
 * Replays the Lua scripts of the percent attribution book against an in-memory fake of the ioredis
 * hash commands. The fake has no Lua engine. It recognizes a script by the commands its text calls
 * and runs the same commands, in the same order, through the fake's own methods.
 */

export interface FakeLedgerHashCommands {
  hset(key: string, field: string, value: string): Promise<number>;
  hsetnx(key: string, field: string, value: string): Promise<number>;
  hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
  expire(key: string, seconds: number): Promise<number>;
}

/**
 * The reply of the book script `script` called with `numkeys` keys, then its arguments. Returns
 * null for any other script, as the fakes did before the book used scripts.
 */
export async function runFakeLedgerScript(
  fake: FakeLedgerHashCommands,
  script: string,
  numkeys: number,
  args: unknown[]
): Promise<unknown> {
  const [key] = args.slice(0, numkeys).map(String);
  const argv = args.slice(numkeys);
  if (/"HSETNX"/.test(script) && /"EXPIRE"/.test(script)) {
    // Commit: HSETNX of the revision field, then EXPIRE of the hash when the field was stored.
    const set = await fake.hsetnx(key, String(argv[0]), String(argv[1]));
    if (set === 1) await fake.expire(key, Number(argv[2]));
    return set;
  }
  if (/"HSET"/.test(script) && /"HINCRBYFLOAT"/.test(script) && /"EXPIRE"/.test(script)) {
    // Token write: HSET of the write time, HINCRBYFLOAT of the tokens, EXPIRE of the hash.
    await fake.hset(key, String(argv[0]), String(argv[1]));
    await fake.hincrbyfloat(key, String(argv[2]), Number(argv[3]));
    await fake.expire(key, Number(argv[4]));
    return 1;
  }
  return null;
}
