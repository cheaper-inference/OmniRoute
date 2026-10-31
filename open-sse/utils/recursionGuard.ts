export class RecursionLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecursionLimitExceededError";
  }
}

export class TimeBudgetExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeBudgetExceededError";
  }
}

export interface RecursionGuardOptions {
  maxDepth?: number;
  timeBudgetMs?: number;
  tag?: string;
}

export class RecursionGuard {
  private depth = 0;
  private readonly maxDepth: number;
  private readonly timeBudgetMs: number;
  private readonly tag: string;
  private startTime: number = 0;

  constructor(options: RecursionGuardOptions = {}) {
    this.maxDepth = options.maxDepth ?? 10;
    this.timeBudgetMs = options.timeBudgetMs ?? 60_000;
    this.tag = options.tag ?? "GUARD";
  }

  public enter(): void {
    if (this.depth === 0) {
      this.startTime = Date.now();
    }

    this.depth++;

    if (this.depth > this.maxDepth) {
      throw new RecursionLimitExceededError(
        `[${this.tag}] Recursion limit exceeded: current depth ${this.depth} > limit ${this.maxDepth}`
      );
    }

    if (Date.now() - this.startTime > this.timeBudgetMs) {
      throw new TimeBudgetExceededError(
        `[${this.tag}] Time budget exceeded: ${Date.now() - this.startTime}ms > ${this.timeBudgetMs}ms`
      );
    }
  }

  public exit(): void {
    if (this.depth > 0) {
      this.depth--;
    }
  }

  public get currentDepth(): number {
    return this.depth;
  }

  public async run<T>(fn: () => Promise<T>): Promise<T> {
    this.enter();
    try {
      return await fn();
    } finally {
      this.exit();
    }
  }
}
