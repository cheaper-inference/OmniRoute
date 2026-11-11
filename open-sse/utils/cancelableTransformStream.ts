/**
 * `TransformStream` with a `cancel` handler on its transformer.
 *
 * WHATWG Streams defines `transformer.cancel(reason)`, invoked when the readable
 * side is cancelled, and Node implements it (verified on v24). `lib.dom.d.ts`
 * still omits the member, so `new TransformStream({ ..., cancel() {} })` fails
 * with TS2353 even though the handler is valid and runs on client disconnect.
 *
 * A `declare global` patch on `Transformer` only applies to programs that load
 * the declaring file. The previous patch lived in `open-sse/types.d.ts`, which
 * nothing imports. Programs whose root set includes `open-sse/**` did load it and
 * stayed green (that is why `open-sse/tsconfig.json` and the open-sse typecheck
 * gate were clean). Programs that reach open-sse only through imports did not:
 * the api typecheck program is the reproducible one, and it is where
 * `src/lib/sseTextTransform.ts` had to carry `as any`. Moving the workaround into
 * an imported module removes that dependence on how a program is rooted.
 *
 * Two side notes from measuring the old patch:
 *  - Under `skipLibCheck: false` it also raised TS2428, because lib.dom declares
 *    `<I = any, O = any>` while the patch used `unknown`. The members still
 *    merged; the error was noise, not a failed merge.
 *  - A bare `new TransformStream({ cancel })` is still rejected without the
 *    helper, which is why the helper is load-bearing rather than cosmetic.
 *
 * This module keeps the workaround in one place. Callers write a
 * `CancelableTransformer` (typed with `unknown`, so nothing degrades to `any`)
 * and the single cast below adapts it to the lib's shape.
 *
 * Delete this module once TypeScript ships `Transformer.cancel`.
 * Tracking: https://github.com/microsoft/TypeScript/issues/65008
 */

export type CancelableTransformer<I = unknown, O = unknown> = Transformer<I, O> & {
  /**
   * Called when the readable side is cancelled, e.g. an SSE client disconnects.
   * Unlike `flush`, this runs for abnormal termination, so it is where timers
   * and intervals belonging to the stream must be released.
   */
  cancel?: (reason?: unknown) => void | PromiseLike<void>;
};

/**
 * Build a `TransformStream` whose transformer may carry a `cancel` handler.
 *
 * Same arguments as `new TransformStream(...)`. The cast below adapts a
 * `CancelableTransformer` to the lib's `Transformer`, because `lib.dom` omits
 * the `cancel` member. Two other places touch that member, each in its own way:
 * `sseOutputSink.ts` also casts to `CancelableTransformer`, reads `.cancel` off
 * its argument, and defines a fresh handler on the wrapped result; `stream.ts`
 * passes a `cancel` into `outputSink.wrap()`, whose generic return preserves it.
 * This helper centralises the construct-time cast; it is not the only place
 * `cancel` survives.
 */
export function transformStreamWithCancel<I = unknown, O = unknown>(
  transformer: CancelableTransformer<I, O>,
  writableStrategy?: QueuingStrategy<I>,
  readableStrategy?: QueuingStrategy<O>,
): TransformStream<I, O> {
  return new TransformStream<I, O>(
    transformer as Transformer<I, O>,
    writableStrategy,
    readableStrategy,
  );
}
