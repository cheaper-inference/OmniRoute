import test from "node:test";
import assert from "node:assert/strict";

import {
  getTelegramAllowedUserIds,
  getTelegramAllowlistConfigWarnings,
  isTelegramUserAllowed,
  isTelegramUserAllowlistEnabled,
} from "../../src/lib/telegram/config";

function withEnv(env: Record<string, string | undefined>, fn: () => void): void {
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(env)) {
    saved[k] = process.env[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    fn();
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

test("the Telegram user allowlist is off by default (existing bots keep serving everyone)", () => {
  withEnv(
    { TELEGRAM_USER_ALLOWLIST_ENABLED: undefined, TELEGRAM_ALLOWED_USER_IDS: undefined },
    () => {
      assert.equal(isTelegramUserAllowlistEnabled(), false);
      assert.equal(isTelegramUserAllowed(999001), true);
      assert.equal(isTelegramUserAllowed(undefined), true);
    }
  );
});

test("a user list without the switch does not restrict the bot", () => {
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: undefined, TELEGRAM_ALLOWED_USER_IDS: "1001" }, () => {
    assert.equal(isTelegramUserAllowed(1002), true);
  });
});

test("with the allowlist enabled only listed Telegram user ids are allowed", () => {
  withEnv(
    { TELEGRAM_USER_ALLOWLIST_ENABLED: "true", TELEGRAM_ALLOWED_USER_IDS: " 1001, 555333 " },
    () => {
      assert.equal(isTelegramUserAllowed(1001), true);
      assert.equal(isTelegramUserAllowed(555333), true);
      assert.equal(isTelegramUserAllowed(1002), false);
    }
  );
});

test("with the allowlist enabled an empty list serves nobody", () => {
  for (const flag of ["true", "1", "on", "YES"]) {
    withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: flag, TELEGRAM_ALLOWED_USER_IDS: undefined }, () => {
      assert.equal(isTelegramUserAllowlistEnabled(), true);
      assert.equal(isTelegramUserAllowed(999001), false);
    });
  }
});

test("with the allowlist enabled a missing or non-positive user id is never allowed", () => {
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: "true", TELEGRAM_ALLOWED_USER_IDS: "0,1001" }, () => {
    assert.equal(isTelegramUserAllowed(0), false);
    assert.equal(isTelegramUserAllowed(undefined), false);
    assert.equal(isTelegramUserAllowed(null), false);
    assert.equal(isTelegramUserAllowed(-100555), false);
  });
});

test("TELEGRAM_USER_ALLOWLIST_ENABLED=false keeps the bot open", () => {
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: "false", TELEGRAM_ALLOWED_USER_IDS: "1001" }, () => {
    assert.equal(isTelegramUserAllowed(999001), true);
  });
});

test("allowlist entries that are not plain positive integers never match", () => {
  withEnv(
    {
      TELEGRAM_USER_ALLOWLIST_ENABLED: "true",
      TELEGRAM_ALLOWED_USER_IDS: "0777001,+1001,@name,1002",
    },
    () => {
      assert.deepEqual(getTelegramAllowedUserIds(), ["1002"]);
      assert.equal(isTelegramUserAllowed(777001), false);
      assert.equal(isTelegramUserAllowed(1001), false);
      assert.equal(isTelegramUserAllowed(1002), true);
    }
  );
});

test("allowlist misconfiguration is reported instead of failing silently", () => {
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: "ture", TELEGRAM_ALLOWED_USER_IDS: undefined }, () => {
    const warnings = getTelegramAllowlistConfigWarnings();
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /not a recognised boolean/);
  });
  withEnv(
    { TELEGRAM_USER_ALLOWLIST_ENABLED: "true", TELEGRAM_ALLOWED_USER_IDS: "1001,abc" },
    () => {
      const warnings = getTelegramAllowlistConfigWarnings();
      assert.equal(warnings.length, 1);
      assert.match(warnings[0], /1 entry\(ies\)/);
      assert.doesNotMatch(warnings[0], /abc/);
    }
  );
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: undefined, TELEGRAM_ALLOWED_USER_IDS: "1001" }, () => {
    assert.match(getTelegramAllowlistConfigWarnings().join("\n"), /ALLOWLIST_ENABLED is off/);
  });
  withEnv({ TELEGRAM_USER_ALLOWLIST_ENABLED: "true", TELEGRAM_ALLOWED_USER_IDS: "1001" }, () => {
    assert.deepEqual(getTelegramAllowlistConfigWarnings(), []);
  });
});
