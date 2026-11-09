// Bounded model-ID projection. Source modules and source functions are never executed.
// Supported syntax comes from the reviewed catalog shapes; unknown syntax fails closed.
import path from "node:path";

const MODEL_FACTORIES = Object.freeze([
  {
    file: "open-sse/config/providers/shared.ts",
    name: "buildModels",
  },
  {
    file: "open-sse/config/providers/shared.ts",
    name: "buildOpenAiCompatibleRegistryEntry",
  },
  {
    file: "open-sse/config/providers/registry/cursor/index.ts",
    name: "withOneMillionContext",
  },
  {
    file: "open-sse/config/providers/registry/devin/catalog.ts",
    name: "model",
  },
  {
    file: "open-sse/config/providers/registry/devin/catalog.ts",
    name: "effortModels",
  },
  {
    file: "open-sse/config/providers/registry/devin/catalog.ts",
    name: "fastEffortModels",
  },
  {
    file: "open-sse/config/providers/registry/devin/catalog.ts",
    name: "gptModels",
  },
  {
    file: "open-sse/config/providers/registry/muse-code/index.ts",
    name: "museSparkModel",
  },
  {
    file: "open-sse/config/antigravitySharedModels.ts",
    name: "buildSurfaceCatalog",
  },
  {
    file: "open-sse/config/providers/registry/cursor/grok47.ts",
    name: "cursorGrok47Variant",
  },
  {
    file: "open-sse/services/notionWebModels.ts",
    name: "withFriendlyNotionAliases",
  },
  {
    // Documentation counts the default catalog, independently of the host environment (#16573).
    // The exact opt-in expression is checked before projecting its unset-environment result.
    file: "open-sse/config/providers/registry/gemini/web/index.ts",
    name: "isGeminiWebArgonEnabled",
    defaultDisabledFlag: {
      constant: "GEMINI_WEB_ARGON_ENV",
      environmentName: "OMNIROUTE_GEMINI_WEB_ARGON_ENABLED",
      body: `{
        const raw = typeof process === "undefined" ? undefined : process.env?.[GEMINI_WEB_ARGON_ENV];
        const value = raw?.trim().toLowerCase();
        return value === "1" || value === "true" || value === "yes";
      }`,
    },
  },
]);

export function createModelMetadataReader(
  ts,
  readSource,
  { maxSteps = 1_000_000, maxDepth = 120 } = {}
) {
  const modules = new Map();
  const reviewed = new Map(MODEL_FACTORIES.map((row) => [`${row.file}:${row.name}`, row]));
  const diagnostics = { steps: 0, reviewedCalls: new Set(), overriddenProperties: new Set() };
  const fail = (code, ref) => {
    throw new Error(`COUNT_MODEL_${code}:${ref?.file ?? "unknown"}`);
  };
  const scalar = (value) =>
    value === null || value === undefined || ["string", "number", "boolean"].includes(typeof value);
  const box = (value, ref = {}) => ({ file: ref.file, literalValue: value });
  const nodeRef = (ref, node, bindings = ref.bindings) => ({ file: ref.file, node, bindings });
  const array = (items) => ({ kind: "array", items });
  const object = (properties) => ({ kind: "object", properties });
  const required = (value, kind, ref) => {
    if (!value || value.kind !== kind) fail(`${kind.toUpperCase()}_REQUIRED`, ref);
    return value;
  };

  function module(file) {
    if (modules.has(file)) return modules.get(file);
    const source = readSource(file);
    if (typeof source !== "string") fail("SOURCE_MISSING", { file });
    if (Buffer.byteLength(source) > 262144) fail("SOURCE_TOO_LARGE", { file });
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (ast.parseDiagnostics.length) fail("SOURCE_SYNTAX", { file });
    const declarations = new Map();
    const put = (name, value) => {
      if (declarations.has(name)) fail("DECLARATION_DUPLICATE", { file });
      declarations.set(name, value);
    };
    for (const statement of ast.statements) {
      if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
          if (ts.isIdentifier(decl.name))
            put(decl.name.text, {
              type: "variable",
              decl,
              constant: Boolean(statement.declarationList.flags & ts.NodeFlags.Const),
            });
        }
      } else if (ts.isFunctionDeclaration(statement) && statement.name) {
        put(statement.name.text, { type: "function", decl: statement });
      } else if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause;
        const names = clause?.namedBindings;
        if (clause?.name) put(clause.name.text, { type: "unsupportedImport" });
        if (names && ts.isNamedImports(names)) {
          for (const imported of names.elements)
            put(imported.name.text, {
              type: "import",
              specifier: statement.moduleSpecifier.text,
              name: (imported.propertyName ?? imported.name).text,
              typeOnly: Boolean(clause.isTypeOnly || imported.isTypeOnly),
            });
        } else if (names && ts.isNamespaceImport(names))
          put(names.name.text, { type: "unsupportedImport" });
      }
    }
    const result = { source, ast, declarations };
    modules.set(file, result);
    return result;
  }

  function importedFile(file, specifier) {
    let candidate;
    if (specifier.startsWith("."))
      candidate = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
    else if (specifier.startsWith("@/")) candidate = `src/${specifier.slice(2)}`;
    else if (specifier.startsWith("@omniroute/open-sse/"))
      candidate = `open-sse/${specifier.slice(20)}`;
    else fail("IMPORT_NOT_PUBLIC_RELATIVE", { file });
    if (candidate.startsWith("../") || path.posix.isAbsolute(candidate))
      fail("IMPORT_OUTSIDE_ROOT", { file });
    for (const target of path.posix.extname(candidate)
      ? [candidate]
      : [`${candidate}.ts`, `${candidate}/index.ts`])
      if (typeof readSource(target) === "string") return target;
    fail("IMPORT_MISSING", { file });
  }

  function lookup(file, name) {
    const entry = module(file).declarations.get(name);
    if (!entry) fail("DECLARATION_MISSING", { file });
    if (entry.type === "import") {
      if (entry.typeOnly) fail("TYPE_ONLY_IMPORT", { file });
      return {
        file: importedFile(file, entry.specifier),
        node: ts.factory.createIdentifier(entry.name),
      };
    }
    if (entry.type === "function") return { file, node: entry.decl, factoryName: name };
    if (entry.type !== "variable" || !entry.constant || !entry.decl.initializer)
      fail("CONST_DECLARATION_REQUIRED", { file });
    return { file, node: entry.decl.initializer, factoryName: name };
  }

  const unshadowed = (name, ref) =>
    !ref.bindings?.has(name) && !module(ref.file).declarations.has(name);
  const truthy = (value) => (scalar(value) ? Boolean(value) : true);
  const string = (value, ref) => {
    if (typeof value !== "string") fail("STRING_REQUIRED", ref);
    return value;
  };

  function bind(pattern, valueRef, bindings, context, depth, trail) {
    if (ts.isIdentifier(pattern)) {
      if (bindings.has(pattern.text)) fail("BINDING_DUPLICATE", context);
      bindings.set(pattern.text, valueRef);
      return;
    }
    if (!ts.isArrayBindingPattern(pattern)) fail("BINDING_SHAPE", context);
    const values = required(evaluate(valueRef, depth + 1, trail), "array", context).items;
    pattern.elements.forEach((entry, index) => {
      if (
        !ts.isBindingElement(entry) ||
        entry.dotDotDotToken ||
        entry.initializer ||
        entry.propertyName
      )
        fail("BINDING_SHAPE", context);
      bind(
        entry.name,
        values[index] ?? box(undefined, context),
        bindings,
        context,
        depth + 1,
        trail
      );
    });
  }

  function validateBody(body, ref) {
    if (!ts.isBlock(body)) return;
    for (const statement of body.statements) {
      if (ts.isVariableStatement(statement)) {
        if (!(statement.declarationList.flags & ts.NodeFlags.Const))
          fail("LOCAL_CONST_REQUIRED", ref);
        for (const decl of statement.declarationList.declarations)
          if (!ts.isIdentifier(decl.name) || !decl.initializer)
            fail("LOCAL_DECLARATION_SHAPE", ref);
      } else if (ts.isReturnStatement(statement)) {
        if (!statement.expression) fail("RETURN_VALUE_REQUIRED", ref);
      } else if (ts.isIfStatement(statement)) {
        for (const branch of [statement.thenStatement, statement.elseStatement].filter(Boolean)) {
          if (ts.isBlock(branch)) validateBody(branch, ref);
          else if (!ts.isReturnStatement(branch) || !branch.expression)
            fail("IF_BRANCH_SHAPE", ref);
        }
      } else fail("STATEMENT_NOT_MODELED", ref);
    }
  }

  function invoke(fn, args, depth, trail, callback = false) {
    required(fn, "function", fn);
    let pin;
    if (fn.factoryName) {
      const key = `${fn.file}:${fn.factoryName}`;
      pin = reviewed.get(key);
      if (!pin) fail("FACTORY_UNREVIEWED", fn);
      diagnostics.reviewedCalls.add(key);
    } else if (!callback && !ts.isArrowFunction(fn.node)) fail("ANONYMOUS_CALL_NOT_MODELED", fn);
    const node = fn.node;
    if (
      node.asteriskToken ||
      node.modifiers?.some((item) => item.kind === ts.SyntaxKind.AsyncKeyword) ||
      !node.body
    )
      fail("FACTORY_SHAPE", fn);
    if (args.length > node.parameters.length && fn.factoryName && !callback)
      fail("ARGUMENT_COUNT", fn);
    if (pin?.defaultDisabledFlag) {
      const flag = pin.defaultDisabledFlag;
      const tokens = (source) => {
        const scanner = ts.createScanner(
          ts.ScriptTarget.Latest,
          true,
          ts.LanguageVariant.Standard,
          source
        );
        const result = [];
        for (
          let token = scanner.scan();
          token !== ts.SyntaxKind.EndOfFileToken;
          token = scanner.scan()
        ) {
          result.push([token, scanner.getTokenValue()]);
        }
        return JSON.stringify(result);
      };
      const body = node.body.getText(module(fn.file).ast);
      if (
        args.length ||
        node.parameters.length ||
        !ts.isFunctionDeclaration(node) ||
        !unshadowed("process", fn) ||
        !unshadowed("undefined", fn) ||
        body.length > 4096 ||
        tokens(body) !== tokens(flag.body) ||
        evaluate(lookup(fn.file, flag.constant), depth + 1, trail) !== flag.environmentName
      )
        fail("DEFAULT_FLAG_SHAPE", fn);
      // No runtime import, environment lookup, or source function execution.
      return false;
    }
    validateBody(node.body, fn);
    const bindings = new Map(fn.bindings ?? []);
    const parameterNames = new Set();
    for (let index = 0; index < node.parameters.length; index++) {
      const parameter = node.parameters[index];
      if (parameter.dotDotDotToken) fail("REST_PARAMETER", fn);
      let valueRef = args[index] ?? box(undefined, fn);
      if (parameter.initializer && evaluate(valueRef, depth + 1, trail) === undefined)
        valueRef = nodeRef(fn, parameter.initializer, bindings);
      const own = new Map();
      bind(parameter.name, valueRef, own, fn, depth + 1, trail);
      for (const [name, value] of own) {
        if (parameterNames.has(name)) fail("PARAMETER_DUPLICATE", fn);
        parameterNames.add(name);
        bindings.set(name, value);
      }
    }
    const context = { file: fn.file, bindings };
    if (!ts.isBlock(node.body)) return evaluate(nodeRef(context, node.body), depth + 1, trail);
    const result = executeBlock(node.body, context, depth + 1, trail);
    if (!result.returned) fail("RETURN_MISSING", fn);
    return result.value;
  }

  function executeBlock(block, context, depth, trail) {
    const bindings = new Map(context.bindings ?? []);
    const local = { ...context, bindings };
    const declared = new Set();
    for (const statement of block.statements) {
      if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
          if (declared.has(decl.name.text)) fail("LOCAL_DUPLICATE", local);
          declared.add(decl.name.text);
          const captured = new Map(bindings);
          bindings.set(decl.name.text, nodeRef(local, decl.initializer, captured));
        }
      } else if (ts.isReturnStatement(statement)) {
        return {
          returned: true,
          value: evaluate(nodeRef(local, statement.expression), depth + 1, trail),
        };
      } else if (ts.isIfStatement(statement)) {
        const branch = truthy(evaluate(nodeRef(local, statement.expression), depth + 1, trail))
          ? statement.thenStatement
          : statement.elseStatement;
        if (!branch) continue;
        const result = ts.isBlock(branch)
          ? executeBlock(branch, local, depth + 1, trail)
          : {
              returned: true,
              value: evaluate(nodeRef(local, branch.expression), depth + 1, trail),
            };
        if (result.returned) return result;
      } else fail("STATEMENT_NOT_MODELED", local);
    }
    return { returned: false };
  }

  function evaluate(ref, depth = 0, trail = []) {
    if (++diagnostics.steps > maxSteps) fail("STEP_LIMIT", ref);
    if (depth > maxDepth) fail("DEPTH_LIMIT", ref);
    if (!ref) fail("REFERENCE_MISSING", ref);
    if (Object.hasOwn(ref, "literalValue")) return ref.literalValue;
    let node = ref.node;
    if (!node) fail("NODE_MISSING", ref);
    while (
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isParenthesizedExpression(node) ||
      ts.isNonNullExpression(node)
    )
      node = node.expression;
    ref = { ...ref, node };
    const read = (child) => evaluate(nodeRef(ref, child), depth + 1, trail);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isIdentifier(node)) {
      if (ref.bindings?.has(node.text))
        return evaluate(ref.bindings.get(node.text), depth + 1, trail);
      if (node.text === "undefined" && unshadowed("undefined", ref)) return undefined;
      const key = `${ref.file}:${node.text}`;
      if (trail.includes(key)) fail("REFERENCE_CYCLE", ref);
      return evaluate(lookup(ref.file, node.text), depth + 1, [...trail, key]);
    }
    if (ts.isArrowFunction(node) || ts.isFunctionDeclaration(node))
      return {
        kind: "function",
        file: ref.file,
        node,
        bindings: ref.bindings,
        factoryName: ref.factoryName,
      };
    if (ts.isArrayLiteralExpression(node)) {
      const items = [];
      for (const element of node.elements) {
        if (ts.isOmittedExpression(element)) fail("SPARSE_ARRAY", ref);
        if (ts.isSpreadElement(element))
          items.push(...required(read(element.expression), "array", ref).items);
        else items.push(nodeRef(ref, element));
      }
      return array(items);
    }
    if (ts.isObjectLiteralExpression(node)) {
      const properties = new Map();
      const put = (key, value) => {
        if (key === "__proto__") fail("PROTOTYPE_KEY", ref);
        if (properties.has(key))
          diagnostics.overriddenProperties.add(`${ref.file}:${node.pos}:${key}`);
        properties.set(key, value);
      };
      for (const property of node.properties) {
        if (ts.isSpreadAssignment(property)) {
          const spread = read(property.expression);
          if (spread === undefined || spread === null) continue;
          for (const [key, value] of required(spread, "object", ref).properties) put(key, value);
          continue;
        }
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property))
          fail("PROPERTY_KIND", ref);
        const name = property.name;
        const key =
          ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)
            ? name.text
            : ts.isComputedPropertyName(name)
              ? string(read(name.expression), ref)
              : fail("PROPERTY_KEY", ref);
        if (ts.isShorthandPropertyAssignment(property) && property.objectAssignmentInitializer)
          fail("SHORTHAND_DEFAULT", ref);
        put(
          key,
          nodeRef(
            ref,
            ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer
          )
        );
      }
      return object(properties);
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      if (node.questionDotToken) fail("OPTIONAL_CHAIN", ref);
      const parent = read(node.expression);
      const key = ts.isPropertyAccessExpression(node)
        ? node.name.text
        : read(node.argumentExpression);
      if (parent?.kind === "object")
        return evaluate(
          parent.properties.get(String(key)) ?? box(undefined, ref),
          depth + 1,
          trail
        );
      if (parent?.kind === "array") {
        if (key === "length") return parent.items.length;
        if (
          !Number.isInteger(Number(key)) ||
          String(Number(key)) !== String(key) ||
          Number(key) < 0
        )
          fail("ARRAY_PROPERTY", ref);
        return evaluate(parent.items[Number(key)] ?? box(undefined, ref), depth + 1, trail);
      }
      fail("PROPERTY_RECEIVER", ref);
    }
    if (ts.isTemplateExpression(node))
      return (
        node.head.text +
        node.templateSpans
          .map((span) => string(read(span.expression), ref) + span.literal.text)
          .join("")
      );
    if (ts.isConditionalExpression(node))
      return read(truthy(read(node.condition)) ? node.whenTrue : node.whenFalse);
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.ExclamationToken)
      return !truthy(read(node.operand));
    if (ts.isBinaryExpression(node)) {
      const left = read(node.left);
      if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken)
        return truthy(left) ? left : read(node.right);
      if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken)
        return truthy(left) ? read(node.right) : left;
      if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
        return left === undefined || left === null ? read(node.right) : left;
      const right = read(node.right);
      if (
        node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken &&
        scalar(left) &&
        scalar(right)
      )
        return left === right;
      if (
        node.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken &&
        scalar(left) &&
        scalar(right)
      )
        return left !== right;
      if (
        node.operatorToken.kind === ts.SyntaxKind.PlusToken &&
        typeof left === "string" &&
        typeof right === "string"
      )
        return left + right;
      fail("BINARY_OPERATOR", ref);
    }
    if (ts.isNewExpression(node)) {
      if (
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== "Set" ||
        !unshadowed("Set", ref) ||
        node.arguments?.length !== 1
      )
        fail("CONSTRUCTOR_NOT_MODELED", ref);
      const values = required(read(node.arguments[0]), "array", ref).items.map((item) =>
        evaluate(item, depth + 1, trail)
      );
      if (!values.every(scalar)) fail("SET_NON_SCALAR", ref);
      return { kind: "set", values: new Set(values) };
    }
    if (ts.isCallExpression(node)) {
      if (node.questionDotToken || node.arguments.some(ts.isSpreadElement)) fail("CALL_SHAPE", ref);
      const args = node.arguments.map((arg) => nodeRef(ref, arg));
      const callee = node.expression;
      if (ts.isIdentifier(callee)) {
        if (callee.text === "Boolean" && unshadowed("Boolean", ref) && args.length === 1)
          return truthy(evaluate(args[0], depth + 1, trail));
        return invoke(read(callee), args, depth + 1, trail);
      }
      if (!ts.isPropertyAccessExpression(callee) || callee.questionDotToken)
        fail("CALL_TARGET", ref);
      const method = callee.name.text;
      if (
        ts.isIdentifier(callee.expression) &&
        callee.expression.text === "Object" &&
        method === "freeze" &&
        unshadowed("Object", ref)
      ) {
        if (args.length !== 1) fail("FREEZE_ARGUMENTS", ref);
        const value = evaluate(args[0], depth + 1, trail);
        if (value?.kind !== "array" && value?.kind !== "object") fail("FREEZE_SHAPE", ref);
        return value;
      }
      if (
        ts.isIdentifier(callee.expression) &&
        callee.expression.text === "Object" &&
        method === "keys" &&
        unshadowed("Object", ref)
      ) {
        if (args.length !== 1) fail("OBJECT_KEYS_ARGUMENTS", ref);
        const value = required(evaluate(args[0], depth + 1, trail), "object", ref);
        // Host enumeration receives only parsed strings and constant booleans.
        // It preserves JS array-index ordering and insertion order for other keys.
        const keys = Object.keys(
          Object.fromEntries([...value.properties.keys()].map((key) => [key, true]))
        );
        return array(keys.map((key) => box(key, ref)));
      }
      const receiver = read(callee.expression);
      if (receiver?.kind === "array" && ["map", "filter", "flatMap"].includes(method)) {
        if (args.length !== 1) fail("ARRAY_METHOD_ARGUMENTS", ref);
        const fn = required(evaluate(args[0], depth + 1, trail), "function", ref);
        if (!ts.isArrowFunction(fn.node) || fn.node.parameters.length > 1)
          fail("ARRAY_CALLBACK_SHAPE", ref);
        const items = [];
        for (const item of receiver.items) {
          const value = invoke(fn, [item], depth + 1, trail, true);
          if (method === "filter") {
            if (truthy(value)) items.push(item);
          } else if (method === "flatMap" && value?.kind === "array") items.push(...value.items);
          else items.push(box(value, ref));
        }
        return array(items);
      }
      if (receiver?.kind === "set" && method === "has" && args.length === 1) {
        const value = evaluate(args[0], depth + 1, trail);
        if (!scalar(value)) fail("SET_NON_SCALAR", ref);
        return receiver.values.has(value);
      }
      if (
        typeof receiver === "string" &&
        ["startsWith", "endsWith"].includes(method) &&
        args.length === 1
      ) {
        const value = string(evaluate(args[0], depth + 1, trail), ref);
        return method === "startsWith" ? receiver.startsWith(value) : receiver.endsWith(value);
      }
      fail("METHOD_NOT_MODELED", ref);
    }
    fail(`SYNTAX_NOT_MODELED_${ts.SyntaxKind[node.kind]}`, ref);
  }

  function arrayRefs(ref) {
    const value = evaluate(ref);
    if (value === null || value === undefined) return [];
    return required(value, "array", ref).items;
  }
  function properties(ref) {
    return required(evaluate(ref), "object", ref).properties;
  }
  function literalString(ref) {
    const value = string(evaluate(ref), ref);
    if (!value) fail("EMPTY_ID", ref);
    return value;
  }
  return {
    arrayRefs,
    properties,
    literalString,
    diagnostics() {
      return {
        steps: diagnostics.steps,
        reviewedCalls: [...diagnostics.reviewedCalls].sort(),
        overriddenProperties: [...diagnostics.overriddenProperties].sort(),
      };
    },
  };
}
