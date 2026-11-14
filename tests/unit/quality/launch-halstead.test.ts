import test from "node:test";
import assert from "node:assert/strict";

import { computeHalstead, listFunctions } from "../../../scripts/quality/launch-halstead.mjs";

// Hand counts. Operators are keywords and punctuators; operands are identifiers and literals.
//
// add: function add(a, b) { return a + b; }
//   operators: function ( , ) { return + ; }   -> N1 = 9, n1 = 9
//   operands:  add a b a b                      -> N2 = 5, n2 = 3
//   difficulty = (9 / 2) * (5 / 3) = 7.5
test("simple function matches the hand count", () => {
  const [fn] = computeHalstead("function add(a, b) { return a + b; }", "a.ts");
  assert.equal(fn.name, "add");
  assert.equal(fn.line, 1);
  assert.deepEqual([fn.n1, fn.n2, fn.N1, fn.N2], [9, 3, 9, 5]);
  assert.equal(fn.difficulty, 7.5);
});

// pick: function pick(x) { if (x) { return "a"; } return "b"; }
//   operators: function ( ) { if ( ) { return ; } return ; }
//              -> N1 = 14, distinct: function ( ) { if return ; } -> n1 = 8
//   operands:  pick x x "a" "b"                 -> N2 = 5, n2 = 4
//   difficulty = (8 / 2) * (5 / 4) = 5
test("function with if and string literals matches the hand count", () => {
  const src = 'function pick(x) { if (x) { return "a"; } return "b"; }';
  const [fn] = computeHalstead(src, "b.ts");
  assert.deepEqual([fn.n1, fn.n2, fn.N1, fn.N2], [8, 4, 14, 5]);
  assert.equal(fn.difficulty, 5);
});

// outer (arrow excluded): function outer(a) { const f = (b) => b; return a; }
//   operators: function ( ) { const = ; return ; }  -> N1 = 10, n1 = 9
//   operands:  outer a f a                          -> N2 = 4, n2 = 3
//   difficulty = (9 / 2) * (4 / 3) = 6
// f (arrow): (b) => b
//   operators: ( ) =>  -> 3; operands: b b -> N2 = 2, n2 = 1; difficulty = 1.5 * 2 = 3
test("nested functions are measured separately", () => {
  const src = "function outer(a) { const f = (b) => b; return a; }";
  const [outer, inner] = computeHalstead(src, "c.ts");
  assert.deepEqual([outer.n1, outer.n2, outer.N1, outer.N2], [9, 3, 10, 4]);
  assert.equal(outer.difficulty, 6);
  assert.equal(inner.name, "f");
  assert.deepEqual([inner.n1, inner.n2, inner.N1, inner.N2], [3, 1, 3, 2]);
  assert.equal(inner.difficulty, 3);
});

test("class members are prefixed with the class name", () => {
  const names = computeHalstead("class A { get x() { return 1; } m() {} }", "d.ts").map(
    (f) => f.name
  );
  assert.deepEqual(names, ["A.get x", "A.m"]);
});

test("declarations without a body yield no entries", () => {
  const src = "export declare function f(a: number): string;\nexport interface I { m(): void }";
  assert.deepEqual(computeHalstead(src, "e.d.ts"), []);
});

test("listFunctions reports spans and nested ranges", () => {
  const src = "function outer(a) {\n  const f = (b) => b;\n  return a;\n}";
  const [outer, inner] = listFunctions(src, "f.ts");
  assert.equal(outer.name, "outer");
  assert.deepEqual([outer.line, outer.column, outer.startLine, outer.endLine], [1, 1, 1, 4]);
  assert.deepEqual([outer.start, outer.end], [0, src.length]);
  assert.deepEqual(outer.nested, [[inner.start, inner.end]]);
  assert.equal(inner.column, 13);
  assert.deepEqual(inner.nested, []);
});
