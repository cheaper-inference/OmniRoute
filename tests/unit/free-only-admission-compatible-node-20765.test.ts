// tests/unit/free-only-admission-compatible-node-20765.test.ts
// A free-only OpenAI-compatible node imported its free models (payload evidence) but the read path
// rejected every row because it used the shipped-catalog predicate. Import and admission must agree.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  admitConnectionModels,
  admitSyncedModelsByConnection,
} from '@/lib/db/models/freeOnlyAdmission';

const NODE = 'openai-compatible-chat-11111111-2222-3333-4444-555555555555';

function row(id: string, extra: Record<string, unknown> = {}) {
  return { id, name: id, source: 'imported', ...extra } as never;
}

test('compatible node: a free-only connection keeps the rows its import admitted', () => {
  const kept = admitConnectionModels(
    NODE,
    [row('qwen/qwen3.8-27b:free'), row('z-ai/glm-5-turbo')],
    true
  );
  assert.deepEqual(
    kept.map((model) => model.id),
    ['qwen/qwen3.8-27b:free']
  );
});

test('compatible node: a zero-priced payload row is admitted', () => {
  const kept = admitConnectionModels(
    NODE,
    [row('nvidia/nemotron-3-super-120b', { pricing: { input: 0, output: 0 } })],
    true
  );
  assert.equal(kept.length, 1);
});

test('compatible node: an explicit paid price is still vetoed', () => {
  const kept = admitConnectionModels(
    NODE,
    [row('nvidia/paid-row', { pricing: { input: 2, output: 6 } })],
    true
  );
  assert.equal(kept.length, 0);
});

test('compatible node: freeOnly off passes every row through', () => {
  const kept = admitConnectionModels(NODE, [row('a/paid'), row('b/free:free')], false);
  assert.equal(kept.length, 2);
});

test('registered provider keeps the shipped-catalog rule (paid row filtered)', () => {
  const kept = admitConnectionModels(
    'openrouter',
    [row('openai/gpt-5', { pricing: { prompt: '0.000003', completion: '0.00001' } })],
    true
  );
  assert.equal(kept.length, 0);
});

test('freeOnlyExhausted stays false when a compatible node admits a row', () => {
  const admitted = admitSyncedModelsByConnection(
    NODE,
    { conn1: [row('qwen/qwen3.8-27b:free')] },
    [{ id: 'conn1', freeOnly: true, syncedModelsAt: new Date().toISOString() }]
  );
  assert.equal(admitted.freeOnlyExhausted, false);
  assert.equal(admitted.byConnection.conn1.length, 1);
});
