import ts from "typescript";
import { parse as parseIcu, TYPE } from "@formatjs/icu-messageformat-parser";
import path from "node:path";
import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";
import { lookupMessagePath } from "../message-lookup.mjs";

const WRAPPER_PATH = "src/app/(dashboard)/dashboard/combos/comboPageHelpers.tsx";
const WRAPPER_SOURCE =
  'export function getI18nOrFallback(t, key, fallback, values = undefined) { try { if (typeof t.has === "function" && t.has(key)) return t(key, values); } catch {} return fallback; }';
export const FLAG_REGISTRY_PATH = "src/shared/constants/featureFlagDefinitions.ts";
export const FLAG_CONSUMER_PATH =
  "src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx";
const printer = ts.createPrinter({ removeComments: true });
const wrapperContracts = new WeakMap();
const expectedWrapperSyntax = JSON.stringify(
  syntaxShape(
    ts.createSourceFile(
      "wrapper.tsx",
      WRAPPER_SOURCE,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    ).statements[0]
  )
);
export const DEFAULT_LIMITS = Object.freeze({
  // Distinct source paths across both revisions, including supporting sources.
  // Each baseFiles/headFiles map has at most one snapshot per path. Byte and
  // analysis-work limits still charge every snapshot, even for identical text.
  maxFiles: 128,
  maxFileBytes: 1024 * 1024,
  maxTotalBytes: 8 * 1024 * 1024,
  maxReferences: 20000,
  maxNodes: 500000,
  maxBindingDepth: 16,
  maxMilliseconds: 15000,
  maxMessageBytes: 65536,
});

class IncompleteAnalysis extends Error {
  constructor(reason, file) {
    super(reason);
    this.reason = reason;
    this.file = file;
  }
}

function requireInput(condition, reason, file) {
  if (!condition) throw new IncompleteAnalysis(reason, file);
}

function validPath(file) {
  return (
    typeof file === "string" &&
    file.startsWith("src/") &&
    !file.includes("\0") &&
    !file.includes("\\") &&
    !file.split("/").includes("..") &&
    path.posix.normalize(file) === file &&
    /\.[cm]?[jt]sx?$/.test(file)
  );
}

function makeBudget(overrides = {}) {
  const limits = { ...DEFAULT_LIMITS };
  for (const [key, value] of Object.entries(overrides)) {
    requireInput(
      Object.hasOwn(limits, key) && Number.isInteger(value) && value > 0 && value <= limits[key],
      "INVALID_ANALYSIS_LIMIT"
    );
    limits[key] = value;
  }
  const started = performance.now();
  const budget = {
    limits,
    nodes: 0,
    references: 0,
    started,
    check(node = false) {
      if (node) this.nodes++;
      requireInput(
        this.nodes <= limits.maxNodes && this.references <= limits.maxReferences,
        "ANALYSIS_WORK_LIMIT"
      );
      requireInput(performance.now() - started <= limits.maxMilliseconds, "ANALYSIS_TIME_LIMIT");
    },
  };
  return budget;
}

function validateInput(input, budget) {
  requireInput(input && typeof input === "object", "INVALID_ANALYSIS_INPUT");
  const comparison = input.comparison;
  requireInput(
    comparison &&
      ["snapshot", "commit"].includes(comparison.kind) &&
      [comparison.base, comparison.candidate].every(
        (id) => /^[a-f0-9]{40}$/.test(id) && !/^0+$/.test(id)
      ) &&
      comparison.base !== comparison.candidate,
    "IMMUTABLE_COMPARISON_REQUIRED"
  );
  requireInput(Array.isArray(input.changes), "CHANGE_INVENTORY_REQUIRED");
  requireInput(
    [input.baseEn, input.headEn, input.baseFiles, input.headFiles].every(
      (value) => value && typeof value === "object" && !Array.isArray(value)
    ),
    "INVALID_SOURCE_OBJECT"
  );
  if (input.affectedFiles !== undefined) {
    const allowed = [
      WRAPPER_PATH.replace("comboPageHelpers", "page"),
      WRAPPER_PATH.replace("comboPageHelpers", "ComboListControls"),
    ];
    requireInput(
      Array.isArray(input.affectedFiles) &&
        input.affectedFiles.every(
          (file) =>
            allowed.includes(file) &&
            Object.hasOwn(input.baseFiles, file) &&
            Object.hasOwn(input.headFiles, file)
        ),
      "UNREVIEWED_DEPENDENT_TARGET"
    );
  }
  const sources = [...Object.entries(input.baseFiles), ...Object.entries(input.headFiles)];
  const sourcePaths = new Set(sources.map(([file]) => file));
  requireInput(sourcePaths.size <= budget.limits.maxFiles, "SOURCE_FILE_LIMIT");
  let total = 0;
  for (const [file, source] of sources) {
    requireInput(
      validPath(file) && typeof source === "string",
      "INVALID_SOURCE_PATH_OR_BYTES",
      file
    );
    const bytes = Buffer.byteLength(source);
    requireInput(bytes <= budget.limits.maxFileBytes, "SOURCE_BYTE_LIMIT", file);
    total += bytes;
  }
  requireInput(total <= budget.limits.maxTotalBytes, "SOURCE_TOTAL_BYTE_LIMIT");
  const seen = new Set();
  for (const row of input.changes) {
    requireInput(
      row &&
        ["A", "M", "R", "D"].includes(row.status) &&
        validPath(row.path) &&
        !seen.has(row.path),
      "INVALID_CHANGE_INVENTORY"
    );
    seen.add(row.path);
    const before = row.status === "R" ? row.previousPath : row.path;
    requireInput(row.status !== "R" || validPath(before), "INVALID_RENAME_PATH");
    requireInput(
      !(
        (row.status === "D" && row.path === WRAPPER_PATH) ||
        (row.status === "R" && before === WRAPPER_PATH && row.path !== WRAPPER_PATH)
      ),
      "WRAPPER_CONTRACT_PATH_CHANGED",
      WRAPPER_PATH
    );
    requireInput(
      row.status === "A" || Object.hasOwn(input.baseFiles, before),
      "MISSING_BASE_SOURCE",
      before
    );
    requireInput(
      row.status === "D" || Object.hasOwn(input.headFiles, row.path),
      "MISSING_CANDIDATE_SOURCE",
      row.path
    );
    requireInput(
      row.status !== "A" || !Object.hasOwn(input.baseFiles, row.path),
      "ADDED_SOURCE_ALREADY_EXISTS",
      row.path
    );
  }
  return { sourceFiles: sources.length, sourcePaths: sourcePaths.size, sourceBytes: total };
}

function printed(node) {
  return printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());
}

function syntaxShape(node) {
  const children = [];
  ts.forEachChild(node, (child) => {
    children.push(syntaxShape(child));
  });
  const value =
    ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isLiteralExpression(node)
      ? node.text
      : null;
  return [node.kind, value, children];
}

function sameSyntax(left, right) {
  return JSON.stringify(syntaxShape(left)) === JSON.stringify(syntaxShape(right));
}

function resolveFile(specifier, from, files) {
  const base = specifier.startsWith("@/")
    ? "src/" + specifier.slice(2)
    : specifier.startsWith(".")
      ? path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier))
      : null;
  if (!base) return null;
  return (
    [
      base,
      base + ".ts",
      base + ".tsx",
      base + ".js",
      base + ".jsx",
      base + "/index.ts",
      base + "/index.tsx",
    ].find((file) => Object.hasOwn(files, file)) || null
  );
}

function literal(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : null;
}

// Enumerate literal outcomes without evaluating the condition or importing product code.
// Unknown branches remain incomplete; expansion uses the existing work/depth limits.
function literalKeys(node, budget) {
  const pending = [{ node, depth: 0 }];
  const keys = new Set();
  while (pending.length) {
    const current = pending.pop();
    budget.check(true);
    requireInput(current.depth <= budget.limits.maxBindingDepth, "ANALYSIS_DEPTH_LIMIT");
    const key = literal(current.node);
    if (key !== null) {
      keys.add(key);
    } else if (current.node && ts.isParenthesizedExpression(current.node)) {
      pending.push({ node: current.node.expression, depth: current.depth + 1 });
    } else if (current.node && ts.isConditionalExpression(current.node)) {
      pending.push({ node: current.node.whenFalse, depth: current.depth + 1 });
      pending.push({ node: current.node.whenTrue, depth: current.depth + 1 });
    } else {
      return null;
    }
  }
  return [...keys];
}

function programFor(files, budget) {
  const sources = new Map(
    Object.entries(files).map(([file, text]) => {
      budget?.check();
      const source = ts.createSourceFile(
        file,
        text,
        ts.ScriptTarget.Latest,
        true,
        /\.[jt]sx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS
      );
      requireInput(source.parseDiagnostics.length === 0, "SOURCE_PARSE_ERROR", file);
      return [file, source];
    })
  );
  const host = {
    getSourceFile: (file) => sources.get(file),
    getDefaultLibFileName: () => "",
    writeFile: () => {
      throw new Error("NO_EMIT");
    },
    getCurrentDirectory: () => "",
    getDirectories: () => [],
    fileExists: (file) => sources.has(file),
    readFile: (file) => files[file],
    getCanonicalFileName: (file) => file,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    resolveModuleNames: (names, from) =>
      names.map((name) => {
        const file = resolveFile(name, from, files);
        return file
          ? {
              resolvedFileName: file,
              extension: file.endsWith("x") ? ts.Extension.Tsx : ts.Extension.Ts,
            }
          : undefined;
      }),
  };
  const program = ts.createProgram([...sources.keys()], { noLib: true, noEmit: true }, host);
  return {
    sources,
    checker: program.getTypeChecker(),
    budget,
    props: new Map(),
    forcedProps: new Map(),
  };
}

function wrapperCall(node, checker) {
  if (!ts.isIdentifier(node)) return null;
  let symbol = checker.getSymbolAtLocation(node);
  const original = symbol?.declarations?.[0];
  const importedWrapper =
    original &&
    ts.isImportSpecifier(original) &&
    (original.propertyName || original.name).text === "getI18nOrFallback" &&
    path.posix.normalize(
      path.posix.join(
        path.posix.dirname(original.getSourceFile().fileName),
        original.parent.parent.parent.moduleSpecifier.text
      )
    ) === WRAPPER_PATH.replace(/\.tsx$/, "");
  if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  const declaration = symbol?.declarations?.[0];
  if (
    !declaration ||
    !ts.isFunctionDeclaration(declaration) ||
    declaration.name?.text !== "getI18nOrFallback" ||
    declaration.getSourceFile().fileName !== WRAPPER_PATH
  )
    return importedWrapper ? false : null;
  if (!wrapperContracts.has(declaration)) {
    wrapperContracts.set(
      declaration,
      JSON.stringify(syntaxShape(declaration)) === expectedWrapperSyntax
    );
  }
  return wrapperContracts.get(declaration);
}

function hookImport(node, checker) {
  if (!ts.isIdentifier(node)) return false;
  const declaration = checker.getSymbolAtLocation(node)?.declarations?.[0];
  return (
    declaration &&
    ts.isImportSpecifier(declaration) &&
    (declaration.propertyName || declaration.name).text === "useTranslations" &&
    declaration.parent.parent.parent.moduleSpecifier.text === "next-intl"
  );
}

function targetDeclaration(node, checker) {
  let symbol = checker.getSymbolAtLocation(node);
  if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  return symbol?.declarations?.[0];
}

// Keep one bounded node index per immutable Program. Gathering syntax does not
// bind JSX targets; that work remains lazy in jsxCallers(). Publish only a fully
// traversed index, and never share nodes or symbols across base/head Programs.
function indexedSourceNodes(context) {
  if (context.nodeIndex) return context.nodeIndex;
  const callsByFile = new Map();
  const jsxNodes = [];
  for (const [file, source] of context.sources) {
    const calls = [];
    function visit(node) {
      context.budget?.check(true);
      if (ts.isCallExpression(node)) calls.push(node);
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) jsxNodes.push(node);
      ts.forEachChild(node, visit);
    }
    visit(source);
    callsByFile.set(file, calls);
  }
  context.nodeIndex = { callsByFile, jsxNodes };
  return context.nodeIndex;
}

function jsxCallers(context, component) {
  if (!context.jsxCallers) {
    context.jsxCallers = new Map();
    for (const node of indexedSourceNodes(context).jsxNodes) {
      context.budget?.check(true);
      const target = targetDeclaration(node.tagName, context.checker);
      if (target) {
        const callers = context.jsxCallers.get(target) || [];
        callers.push(node);
        context.jsxCallers.set(target, callers);
      }
    }
  }
  return context.jsxCallers.get(component) || [];
}

function typedTranslatorProp(declaration, context) {
  const parameter = declaration.parent.parent;
  let type = parameter.type;
  if (type && ts.isTypeReferenceNode(type)) {
    const definition = context.checker.getSymbolAtLocation(type.typeName)?.declarations?.[0];
    type = definition && ts.isTypeAliasDeclaration(definition) ? definition.type : definition;
  }
  const prop = (declaration.propertyName || declaration.name).text;
  const property = type?.members?.find((member) => member.name?.getText() === prop);
  const reference = property?.type;
  if (!reference || !ts.isTypeReferenceNode(reference)) return false;
  const definition = context.checker.getSymbolAtLocation(reference.typeName)?.declarations?.[0];
  const alias = definition && ts.isTypeAliasDeclaration(definition) ? definition.type : null;
  return Boolean(
    alias &&
    ts.isTypeReferenceNode(alias) &&
    alias.typeName.getText() === "ReturnType" &&
    alias.typeArguments?.length === 1 &&
    ts.isTypeQueryNode(alias.typeArguments[0]) &&
    hookImport(alias.typeArguments[0].exprName, context.checker)
  );
}

// A local helper parameter is provable only when every reference to the helper
// is a direct call and every caller supplies the same proven translator. An
// exported, escaped, reassigned or recursive binding is deliberately unresolved.
function localParameterTranslator(parameter, context, seen, forced) {
  const fn = parameter.parent;
  if (
    !ts.isFunctionDeclaration(fn) ||
    !fn.name ||
    !ts.isSourceFile(fn.parent) ||
    fn.modifiers?.some((item) => item.kind === ts.SyntaxKind.ExportKeyword) ||
    parameter.initializer ||
    parameter.dotDotDotToken
  )
    return forced ? { reason: "UNRESOLVED_TRANSLATOR_PARAMETER" } : null;

  if (!context.localFunctionUses) {
    context.localFunctionUses = new Map();
    context.parameterUses = new Map();
    for (const source of context.sources.values()) {
      function visit(node) {
        context.budget?.check(true);
        if (ts.isIdentifier(node)) {
          const declaration = targetDeclaration(node, context.checker);
          const index =
            declaration && ts.isFunctionDeclaration(declaration)
              ? context.localFunctionUses
              : declaration && ts.isParameter(declaration)
                ? context.parameterUses
                : null;
          if (index && node !== declaration.name) {
            const uses = index.get(declaration) || [];
            uses.push(node);
            index.set(declaration, uses);
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }

  const uses = context.localFunctionUses.get(fn) || [];
  const parameterUses = context.parameterUses.get(parameter) || [];
  const position = fn.parameters.indexOf(parameter);
  const closed =
    uses.length > 0 &&
    uses.every((node) => ts.isCallExpression(node.parent) && node.parent.expression === node);
  const immutable = parameterUses.every((node) => {
    const parent = node.parent;
    return (
      (ts.isCallExpression(parent) &&
        (parent.expression === node || parent.arguments.includes(node))) ||
      (ts.isPropertyAccessExpression(parent) && parent.expression === node) ||
      (ts.isVariableDeclaration(parent) &&
        parent.initializer === node &&
        Boolean(parent.parent.flags & ts.NodeFlags.Const))
    );
  });
  const values = uses
    .filter((node) => ts.isCallExpression(node.parent) && node.parent.expression === node)
    .map((node) =>
      node.parent.arguments.some(ts.isSpreadElement)
        ? null
        : translator(node.parent.arguments[position], context, seen, forced)
    );
  if (!forced && !values.some((value) => value !== null)) return null;
  if (!closed || !immutable || values.some((value) => typeof value?.namespace !== "string"))
    return { reason: "UNRESOLVED_TRANSLATOR_PARAMETER" };
  if (new Set(values.map((value) => value.namespace)).size !== 1)
    return { reason: "AMBIGUOUS_TRANSLATOR_PARAMETER" };
  return {
    namespace: values[0].namespace,
    dependencyFingerprint: createHash("sha256")
      .update(JSON.stringify(syntaxShape(fn)))
      .digest("hex"),
    binding: {
      kind: "local-parameter",
      file: fn.getSourceFile().fileName,
      function: fn.name.text,
      position,
      callers: values.map((value) => value.binding),
    },
  };
}

// A stable dependency proof does not resolve a dynamic namespace for translation.
// Only immutable local aliases ending in a string literal may retain an inherited
// limitation; calls, mutable values and unavailable imports remain unproven.
function constantNamespaceProof(node, context, seen = new Set()) {
  context.budget?.check();
  requireInput(seen.size <= (context.budget?.limits.maxBindingDepth || 16), "BINDING_DEPTH_LIMIT");
  const value = literal(node);
  if (value !== null) return { kind: "constant-string", value };
  if (!node) return null;
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isTypeAssertionExpression(node) ||
    ts.isSatisfiesExpression(node)
  )
    return constantNamespaceProof(node.expression, context, seen);
  if (!ts.isIdentifier(node)) return null;
  const declaration = context.checker.getSymbolAtLocation(node)?.declarations?.[0];
  if (
    !declaration ||
    !ts.isVariableDeclaration(declaration) ||
    !(declaration.parent.flags & ts.NodeFlags.Const) ||
    seen.has(declaration)
  )
    return null;
  return constantNamespaceProof(declaration.initializer, context, new Set([...seen, declaration]));
}

function translator(node, context, seen = new Set(), forced = false) {
  const { checker } = context;
  context.budget?.check();
  requireInput(seen.size <= (context.budget?.limits.maxBindingDepth || 16), "BINDING_DEPTH_LIMIT");
  if (!node || !ts.isIdentifier(node)) return null;
  const declaration = checker.getSymbolAtLocation(node)?.declarations?.[0];
  if (!declaration) return null;
  if (seen.has(declaration)) return { reason: "CYCLIC_TRANSLATOR_BINDING" };
  const next = new Set([...seen, declaration]);
  if (forced && ts.isParameter(declaration) && ts.isIdentifier(declaration.name))
    return localParameterTranslator(declaration, context, next, forced);
  if (ts.isVariableDeclaration(declaration)) {
    const initial = declaration.initializer;
    if (initial && ts.isIdentifier(initial)) {
      const binding = translator(initial, context, next, forced);
      return binding && !(declaration.parent.flags & ts.NodeFlags.Const)
        ? { reason: "MUTABLE_TRANSLATOR_BINDING" }
        : binding;
    }
    if (!initial || !ts.isCallExpression(initial) || !hookImport(initial.expression, checker))
      return null;
    if (!(declaration.parent.flags & ts.NodeFlags.Const))
      return { reason: "MUTABLE_TRANSLATOR_BINDING" };
    const namespace = initial.arguments.length === 0 ? "" : literal(initial.arguments[0]);
    return namespace === null
      ? {
          reason: "DYNAMIC_NAMESPACE",
          namespaceProof: constantNamespaceProof(initial.arguments[0], context),
        }
      : {
          namespace,
          binding: { kind: "hook", file: declaration.getSourceFile().fileName, namespace },
        };
  }
  if (
    !ts.isBindingElement(declaration) ||
    !ts.isObjectBindingPattern(declaration.parent) ||
    !ts.isParameter(declaration.parent.parent)
  )
    return null;
  const component = declaration.parent.parent.parent;
  const prop = (declaration.propertyName || declaration.name).text;
  const cache = forced ? context.forcedProps : context.props;
  if (cache.has(declaration)) return cache.get(declaration);
  const found = [];
  for (const candidate of jsxCallers(context, component)) {
    const attribute = candidate.attributes.properties.find((item) => item.name?.text === prop);
    const expression =
      attribute?.initializer && ts.isJsxExpression(attribute.initializer)
        ? attribute.initializer.expression
        : null;
    const value = translator(expression, context, next);
    found.push(
      candidate.attributes.properties.some(ts.isJsxSpreadAttribute)
        ? { reason: "UNRESOLVED_TRANSLATOR_PROP_SPREAD", expectedTranslator: Boolean(value) }
        : value
    );
  }
  const expectedTranslator =
    forced ||
    typedTranslatorProp(declaration, context) ||
    found.some((value) => value && (Object.hasOwn(value, "namespace") || value.expectedTranslator));
  if (!expectedTranslator) {
    cache.set(declaration, null);
    return null;
  }
  if (!found.length || found.some((value) => !value || value.reason)) {
    const reason = found.find((value) => value?.reason) || { reason: "UNRESOLVED_TRANSLATOR_PROP" };
    const callerProofs = found.map((value) =>
      typeof value?.namespace === "string"
        ? { kind: "constant-string", value: value.namespace }
        : value?.namespaceProof || null
    );
    const allCallersProven =
      callerProofs.length > 0 && callerProofs.every((proof) => typeof proof?.value === "string");
    const compatible =
      allCallersProven && new Set(callerProofs.map((proof) => proof.value)).size === 1;
    const namespaceProof = compatible
      ? {
          kind: "all-prop-callers",
          value: callerProofs[0].value,
          proofs: [
            ...new Set(
              callerProofs.map((proof) =>
                createHash("sha256").update(JSON.stringify(proof)).digest("hex")
              )
            ),
          ].sort(),
        }
      : null;
    const result =
      allCallersProven && !compatible
        ? { reason: "AMBIGUOUS_TRANSLATOR_PROP" }
        : { ...reason, namespaceProof };
    cache.set(declaration, result);
    return result;
  }
  const namespaces = new Set(found.map((value) => value.namespace));
  const result =
    namespaces.size !== 1
      ? { reason: "AMBIGUOUS_TRANSLATOR_PROP" }
      : {
          namespace: found[0].namespace,
          binding: {
            kind: "prop",
            prop,
            file: component.getSourceFile().fileName,
            callers: found.map((value) => value.binding),
          },
        };
  cache.set(declaration, result);
  return result;
}

function references(files, targets, budget, existingContext) {
  const context = existingContext || programFor(files, budget);
  const { sources, checker } = context;
  const result = [];
  for (const file of targets) {
    const source = sources.get(file);
    if (!source) continue;
    for (const node of indexedSourceNodes(context).callsByFile.get(file) || []) {
      budget.check(true);
      if (ts.isCallExpression(node)) {
        const wrapped = wrapperCall(node.expression, checker);
        const method = ts.isPropertyAccessExpression(node.expression)
          ? node.expression.name.text
          : null;
        const receiver = method ? node.expression.expression : node.expression;
        const binding =
          translator(
            wrapped ? node.arguments[0] : receiver,
            context,
            new Set(),
            Boolean(wrapped)
          ) || (wrapped ? { reason: "UNRESOLVED_TRANSLATOR_BINDING" } : null);
        if (binding && method !== "has") {
          const keys =
            binding.reason || method ? null : literalKeys(node.arguments[wrapped ? 1 : 0], budget);
          const position = source.getLineAndCharacterOfPosition(node.getStart(source));
          const reason =
            binding.reason ||
            (method ? "UNSUPPORTED_TRANSLATION_METHOD" : keys === null ? "DYNAMIC_KEY" : null);
          const parameters = reason ? null : valueParameters(node.arguments[wrapped ? 3 : 1]);
          for (const key of keys || [null]) {
            result.push(
              reason
                ? {
                    file,
                    reason,
                    expression: printed(node),
                    baselineComparable:
                      typeof binding.namespace === "string" || Boolean(binding.namespaceProof),
                    syntaxFingerprint: createHash("sha256")
                      .update(
                        JSON.stringify({
                          receiver: wrapped ? "reviewed-wrapper" : method || "direct",
                          namespace: binding.namespace ?? null,
                          namespaceProof: binding.namespaceProof || null,
                          dependencyFingerprint: binding.dependencyFingerprint || null,
                          key: node.arguments[wrapped ? 1 : 0]
                            ? syntaxShape(node.arguments[wrapped ? 1 : 0])
                            : null,
                          values: node.arguments[wrapped ? 3 : 1]
                            ? syntaxShape(node.arguments[wrapped ? 3 : 1])
                            : null,
                        })
                      )
                      .digest("hex"),
                    namespace: binding.namespace,
                    line: position.line + 1,
                  }
                : {
                    file,
                    key: binding.namespace ? `${binding.namespace}.${key}` : key,
                    binding: binding.binding,
                    parameters,
                    line: position.line + 1,
                  }
            );
            budget.references++;
            budget.check();
          }
        } else if (wrapped === false) {
          result.push({ file, reason: "WRAPPER_CONTRACT_CHANGED", expression: printed(node) });
        }
      }
    }
  }
  return result;
}

function valueParameters(node) {
  if (
    !node ||
    (ts.isIdentifier(node) && node.text === "undefined") ||
    node.kind === ts.SyntaxKind.NullKeyword
  )
    return [];
  if (!ts.isObjectLiteralExpression(node)) return null;
  const keys = [];
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property))
      return null;
    const key = ts.isIdentifier(property.name) ? property.name.text : literal(property.name);
    if (key === null) return null;
    keys.push(key);
  }
  return [...new Set(keys)].sort();
}

function icuParameters(elements, out = new Set()) {
  for (const element of elements) {
    if (![TYPE.literal, TYPE.pound].includes(element.type)) out.add(element.value);
    if (element.options) {
      for (const option of Object.values(element.options)) icuParameters(option.value, out);
    }
    if (element.children) icuParameters(element.children, out);
  }
  return out;
}

function validateReference(row, catalog, budget) {
  const message = lookupMessagePath(catalog, row.key.split("."));
  if (typeof message !== "string" || message.trim() === "" || message.startsWith("__MISSING__:")) {
    return { violation: { ...row, reason: "MISSING_EN_MESSAGE" } };
  }
  requireInput(
    Buffer.byteLength(message) <= budget.limits.maxMessageBytes,
    "MESSAGE_BYTE_LIMIT",
    row.file
  );
  let parameters;
  try {
    parameters = [...icuParameters(parseIcu(message))].sort();
  } catch {
    return { violation: { ...row, reason: "INVALID_ICU" } };
  }
  if (parameters.length && row.parameters === null) {
    return {
      incomplete: { ...row, reason: "UNRESOLVED_ICU_VALUES", requiredParameters: parameters },
    };
  }
  const missing = parameters.filter((name) => !(row.parameters || []).includes(name));
  return missing.length
    ? { violation: { ...row, reason: "MISSING_ICU_ARGUMENTS", missingParameters: missing } }
    : {};
}

function flagKeys(text) {
  if (text === undefined) return [];
  const source = ts.createSourceFile(FLAG_REGISTRY_PATH, text, ts.ScriptTarget.Latest, true);
  const declarations = source.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations]);
  const matches = declarations.filter(
    (declaration) => declaration.name.getText(source) === "FEATURE_FLAG_DEFINITIONS"
  );
  const value = matches.length === 1 ? matches[0].initializer : null;
  if (!value || !ts.isArrayLiteralExpression(value)) return null;
  const keys = [];
  for (const element of value.elements) {
    if (!ts.isObjectLiteralExpression(element)) return null;
    if (
      element.properties.some(
        (item) => ts.isSpreadAssignment(item) || (item.name && ts.isComputedPropertyName(item.name))
      )
    )
      return null;
    const properties = element.properties.filter(
      (item) =>
        item.name &&
        (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
        item.name.text === "key"
    );
    const property =
      properties.length === 1 && ts.isPropertyAssignment(properties[0]) ? properties[0] : null;
    const key = literal(property?.initializer);
    if (key === null || !/^[A-Z][A-Z0-9_]*$/.test(key) || keys.includes(key)) return null;
    keys.push(key);
  }
  return keys;
}

function flagConsumerFields(files, budget, existingContext) {
  const context = existingContext || programFor(files, budget);
  const source = context.sources.get(FLAG_CONSUMER_PATH);
  if (!source) return null;
  const fields = new Map();
  function visit(node) {
    budget.check(true);
    if (
      ts.isCallExpression(node) &&
      translator(node.expression, context)?.namespace === "featureFlags"
    ) {
      const template = node.arguments[0];
      if (
        template &&
        ts.isTemplateExpression(template) &&
        template.head.text === "definitions." &&
        template.templateSpans.length === 1
      ) {
        const span = template.templateSpans[0];
        const field = span.literal.text.slice(1);
        const access = span.expression;
        const conditional = node.parent;
        if (
          ["label", "description"].includes(field) &&
          span.literal.text === "." + field &&
          ts.isPropertyAccessExpression(access) &&
          access.name.text === "key" &&
          ts.isIdentifier(access.expression) &&
          ts.isConditionalExpression(conditional) &&
          conditional.whenTrue === node
        ) {
          const condition = conditional.condition;
          const fallback = conditional.whenFalse;
          const owner = conditional.parent;
          const object = owner.parent;
          const attribute = object?.parent?.parent;
          const element = attribute?.parent?.parent;
          const cardImport =
            element && (ts.isJsxSelfClosingElement(element) || ts.isJsxOpeningElement(element))
              ? context.checker.getSymbolAtLocation(element.tagName)?.declarations?.[0]
              : null;
          let component = node.parent;
          while (component && !(ts.isFunctionDeclaration(component) && component.name))
            component = component.parent;
          const parameter = context.checker.getSymbolAtLocation(access.expression)
            ?.declarations?.[0];
          const callback = parameter?.parent;
          const map = callback?.parent;
          const supported =
            ts.isCallExpression(condition) &&
            ts.isPropertyAccessExpression(condition.expression) &&
            condition.expression.name.text === "has" &&
            sameSyntax(condition.expression.expression, node.expression) &&
            condition.arguments.length === 1 &&
            sameSyntax(condition.arguments[0], template) &&
            ts.isPropertyAccessExpression(fallback) &&
            sameSyntax(fallback.expression, access.expression) &&
            fallback.name.text === field &&
            ts.isPropertyAssignment(owner) &&
            owner.name.getText(source) === field &&
            ts.isObjectLiteralExpression(object) &&
            object.parent &&
            ts.isJsxExpression(object.parent) &&
            attribute &&
            ts.isJsxAttribute(attribute) &&
            attribute.name.text === "flag" &&
            cardImport &&
            ts.isImportClause(cardImport) &&
            cardImport.parent.moduleSpecifier.text === "./FeatureFlagCard" &&
            component?.name?.text === "FeatureFlagsGrid" &&
            parameter &&
            ts.isParameter(parameter) &&
            callback &&
            ts.isArrowFunction(callback) &&
            map &&
            ts.isCallExpression(map) &&
            ts.isPropertyAccessExpression(map.expression) &&
            map.expression.name.text === "map" &&
            map.expression.expression.getText(source) === "filteredFlags";
          if (supported)
            fields.set(field, source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return fields.has("label") && fields.has("description") ? fields : null;
}

function newFlagReferences(input, budget, context) {
  if (!input.changes.some((row) => row.path === FLAG_REGISTRY_PATH && row.status !== "D"))
    return { references: [], incomplete: [] };
  const before = flagKeys(input.baseFiles[FLAG_REGISTRY_PATH]);
  const after = flagKeys(input.headFiles[FLAG_REGISTRY_PATH]);
  if (!before || !after)
    return {
      references: [],
      incomplete: [{ file: FLAG_REGISTRY_PATH, reason: "FLAG_REGISTRY_CONTRACT_CHANGED" }],
    };
  const added = after.filter((key) => !before.includes(key));
  if (!added.length) return { references: [], incomplete: [] };
  const fields = flagConsumerFields(input.headFiles, budget, context);
  if (!fields)
    return {
      references: [],
      incomplete: [{ file: FLAG_CONSUMER_PATH, reason: "FLAG_CONSUMER_CONTRACT_CHANGED" }],
    };
  return {
    references: added.flatMap((flag) =>
      [...fields].map(([field, line]) => ({
        file: FLAG_CONSUMER_PATH,
        line,
        key: `featureFlags.definitions.${flag}.${field}`,
        binding: {
          kind: "finite-flag-consumer",
          registry: FLAG_REGISTRY_PATH,
          flag,
          field,
          namespace: "featureFlags",
        },
      }))
    ),
    incomplete: [],
  };
}

/** Pure source-reference contract. Files/catalogs are supplied, never imported. */
function runAudit(input, budget) {
  const targets = [
    ...new Set([
      ...input.changes.filter((row) => row.status !== "D").map((row) => row.path),
      ...(input.affectedFiles || []),
    ]),
  ];
  const baseTargets = [
    ...new Set([
      ...input.changes
        .filter((row) => row.status !== "A")
        .map((row) => (row.status === "R" ? row.previousPath : row.path)),
      ...(input.affectedFiles || []),
    ]),
  ];
  const rename = new Map(
    input.changes.filter((row) => row.status === "R").map((row) => [row.previousPath, row.path])
  );
  const old = references(input.baseFiles, baseTargets, budget).map((row) =>
    rename.has(row.file) ? { ...row, file: rename.get(row.file), renamedFrom: row.file } : row
  );
  const counts = new Map();
  for (const row of old) {
    if (row.reason && !row.baselineComparable) continue;
    const key = referenceIdentity(row);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const headContext = programFor(input.headFiles, budget);
  const added = references(input.headFiles, targets, budget, headContext).filter((row) => {
    if (row.reason && !row.baselineComparable) return true;
    const key = referenceIdentity(row);
    const count = counts.get(key) || 0;
    if (count) counts.set(key, count - 1);
    return count === 0;
  });
  const flags = newFlagReferences(input, budget, headContext);
  const newReferences = [...added.filter((row) => row.key), ...flags.references];
  const incomplete = [...added.filter((row) => row.reason), ...flags.incomplete];
  const violations = [];
  for (const row of newReferences) {
    const validation = validateReference(row, input.headEn, budget);
    if (validation.violation) violations.push(validation.violation);
    if (validation.incomplete) incomplete.push(validation.incomplete);
  }
  const baselineGaps = old
    .filter((row) => row.key)
    .map((row) => validateReference(row, input.baseEn, budget).violation)
    .filter(Boolean);
  return {
    status: incomplete.length ? "INCOMPLETE" : violations.length ? "FAIL" : "PASS",
    violations,
    incomplete,
    newReferences,
    baselineGaps,
  };
}

/** Reads only supplied public source strings and JSON data; emits no files. */
export function auditNewUiReferences(input) {
  const started = performance.now();
  let budget;
  try {
    budget = makeBudget(input?.limits);
    const size = validateInput(input, budget);
    const result = runAudit(input, budget);
    budget.check();
    return {
      ...result,
      comparison: input.comparison,
      scope: {
        newReferencesOnly: true,
        translationsChecked: false,
        routePayloadChecked: false,
        englishDeletionChecked: false,
      },
      sourceHashes: Object.fromEntries(
        ["baseFiles", "headFiles"].map((side) => [
          side,
          Object.fromEntries(
            Object.entries(input[side]).map(([file, source]) => [
              file,
              createHash("sha256").update(source).digest("hex"),
            ])
          ),
        ])
      ),
      statistics: {
        ...size,
        nodesVisited: budget.nodes,
        referencesObserved: budget.references,
        milliseconds: performance.now() - started,
        limits: budget.limits,
      },
    };
  } catch (error) {
    if (!(error instanceof IncompleteAnalysis) && !(error instanceof RangeError)) throw error;
    return {
      status: "INCOMPLETE",
      violations: [],
      newReferences: [],
      baselineGaps: [],
      incomplete: [
        {
          reason: error.reason || "ANALYSIS_DEPTH_LIMIT",
          ...(error.file ? { file: error.file } : {}),
        },
      ],
      statistics: { milliseconds: performance.now() - started },
    };
  }
}

function referenceIdentity(row) {
  return `${row.file}\0${row.key || row.reason + (row.syntaxFingerprint || row.expression) + (row.namespace || "")}\0${JSON.stringify(row.parameters || [])}`;
}
