import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

// cliTools.ts imports application registries. Count its literal records with
// the TypeScript parser; never import the module merely to measure its size.
function literalDeclaration(source, name) {
  const file = ts.createSourceFile(
    "catalog.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  if (file.parseDiagnostics.length) throw new Error("COUNT_FACTS_CLI_SYNTAX");
  const declarations = file.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name);
  if (declarations.length !== 1) throw new Error("COUNT_FACTS_CLI_DECLARATION");
  let initializer = declarations[0].initializer;
  while (
    initializer &&
    (ts.isAsExpression(initializer) ||
      ts.isSatisfiesExpression(initializer) ||
      ts.isParenthesizedExpression(initializer))
  )
    initializer = initializer.expression;
  if (!initializer || !ts.isObjectLiteralExpression(initializer))
    throw new Error("COUNT_FACTS_CLI_SHAPE");
  return initializer;
}

function cliRecords(source) {
  const records = literalDeclaration(source, "CLI_TOOLS").properties.map((property) => {
    if (
      !ts.isPropertyAssignment(property) ||
      (!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name))
    )
      throw new Error("COUNT_FACTS_CLI_PROPERTY");
    return { name: property.name.text, value: property.initializer };
  });
  if (!records.length || new Set(records.map((record) => record.name)).size !== records.length)
    throw new Error("COUNT_FACTS_CLI_KEYS");
  return records;
}

export function countCliToolRecords(source) {
  return cliRecords(source).length;
}

export function countCliToolCategories(source, referencedSources = {}) {
  const counts = { cliCode: 0, cliAgent: 0 };
  for (const record of cliRecords(source)) {
    let value = record.value;
    if (ts.isIdentifier(value) && Object.hasOwn(referencedSources, value.text))
      value = literalDeclaration(referencedSources[value.text], value.text);
    if (!ts.isObjectLiteralExpression(value)) throw new Error("COUNT_FACTS_CLI_CATEGORY_SHAPE");
    const categories = value.properties
      .filter(ts.isPropertyAssignment)
      .filter(
        (property) =>
          (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
          property.name.text === "category"
      );
    if (categories.length !== 1 || !ts.isStringLiteral(categories[0].initializer))
      throw new Error("COUNT_FACTS_CLI_CATEGORY");
    const category = categories[0].initializer.text;
    if (category === "code") counts.cliCode++;
    else if (category === "agent") counts.cliAgent++;
    else throw new Error("COUNT_FACTS_CLI_CATEGORY_UNKNOWN");
  }
  return counts;
}

// Resolve only the literal metadata requested by a count. Handler bodies, schema
// constructors, headers and unrelated imports are never evaluated. Unsupported
// construction fails closed rather than silently undercounting a future shape.
export function createStaticMetadataReader(readSource) {
  const modules = new Map();
  const fail = (detail) => {
    throw new Error(`COUNT_STATIC_METADATA:${detail}`);
  };
  const parse = (file) => {
    if (!modules.has(file)) {
      const source = readSource(file);
      if (typeof source !== "string") fail(`SOURCE_MISSING:${file}`);
      const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      if (ast.parseDiagnostics.length) fail(`SOURCE_SYNTAX:${file}`);
      modules.set(file, ast);
    }
    return modules.get(file);
  };
  const importFile = (from, specifier) => {
    let candidate;
    if (specifier.startsWith("./") || specifier.startsWith("../"))
      candidate = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
    else if (specifier.startsWith("@/")) candidate = `src/${specifier.slice(2)}`;
    else if (specifier.startsWith("@omniroute/open-sse/"))
      candidate = `open-sse/${specifier.slice("@omniroute/open-sse/".length)}`;
    else fail(`IMPORT_UNSUPPORTED:${specifier}`);
    if (candidate.startsWith("../") || path.posix.isAbsolute(candidate))
      fail("IMPORT_OUTSIDE_ROOT");
    for (const file of /\.[cm]?tsx?$/.test(candidate)
      ? [candidate]
      : [candidate + ".ts", candidate + "/index.ts"])
      if (typeof readSource(file) === "string") return file;
    fail(`IMPORT_MISSING:${candidate}`);
  };
  const declaration = (file, name) => {
    const ast = parse(file);
    const declarations = ast.statements
      .filter(ts.isVariableStatement)
      .flatMap((statement) => [...statement.declarationList.declarations])
      .filter((item) => ts.isIdentifier(item.name) && item.name.text === name);
    if (declarations.length > 1) fail(`DECLARATION_DUPLICATE:${file}:${name}`);
    if (declarations.length === 1 && declarations[0].initializer)
      return { file, node: declarations[0].initializer };
    const imports = ast.statements.filter(ts.isImportDeclaration).flatMap((statement) => {
      const binding = statement.importClause?.namedBindings;
      if (!binding || !ts.isNamedImports(binding)) return [];
      return binding.elements
        .filter((item) => item.name.text === name)
        .map((item) => ({
          file: importFile(file, statement.moduleSpecifier.text),
          name: (item.propertyName ?? item.name).text,
        }));
    });
    if (imports.length !== 1) fail(`DECLARATION_MISSING:${file}:${name}`);
    // Keep the alias as a reference; resolve() tracks the full chain for cycles.
    return { file: imports[0].file, node: ts.factory.createIdentifier(imports[0].name) };
  };
  const literalFactory = (file, name, trail = []) => {
    const key = `${file}:${name}`;
    if (trail.includes(key)) fail(`FACTORY_CYCLE:${key}`);
    const ast = parse(file);
    const matches = ast.statements
      .filter(ts.isFunctionDeclaration)
      .filter((item) => item.name?.text === name);
    if (matches.length === 1) {
      const fn = matches[0];
      if (
        fn.asteriskToken ||
        fn.modifiers?.some((item) => item.kind === ts.SyntaxKind.AsyncKeyword) ||
        fn.parameters.length !== 1 ||
        !ts.isIdentifier(fn.parameters[0].name) ||
        fn.parameters[0].initializer ||
        fn.parameters[0].dotDotDotToken ||
        fn.body?.statements.length !== 1 ||
        !ts.isReturnStatement(fn.body.statements[0])
      )
        fail(`FACTORY_NOT_LITERAL:${key}`);
      return {
        file,
        parameter: fn.parameters[0].name.text,
        node: fn.body.statements[0].expression,
      };
    }
    const aliases = ast.statements.filter(ts.isImportDeclaration).flatMap((statement) => {
      const binding = statement.importClause?.namedBindings;
      if (!binding || !ts.isNamedImports(binding)) return [];
      return binding.elements
        .filter((item) => item.name.text === name)
        .map((item) => ({
          file: importFile(file, statement.moduleSpecifier.text),
          name: (item.propertyName ?? item.name).text,
        }));
    });
    if (aliases.length !== 1) fail(`FACTORY_MISSING:${key}`);
    return literalFactory(aliases[0].file, aliases[0].name, [...trail, key]);
  };
  const resolve = (ref, trail = []) => {
    if (!ref) fail("REFERENCE_MISSING");
    let node = ref.node;
    while (
      node &&
      (ts.isAsExpression(node) ||
        ts.isSatisfiesExpression(node) ||
        ts.isParenthesizedExpression(node))
    )
      node = node.expression;
    if (!node) fail(`INITIALIZER_MISSING:${ref.file}`);
    if (ts.isCallExpression(node)) {
      if (!ts.isIdentifier(node.expression) || node.arguments.length !== 1)
        fail(`CALL_NOT_LITERAL_FACTORY:${ref.file}`);
      const factory = literalFactory(ref.file, node.expression.text);
      const key = `call:${factory.file}:${node.expression.text}`;
      if (trail.includes(key)) fail(`FACTORY_CYCLE:${key}`);
      const bindings = new Map([[factory.parameter, { ...ref, node: node.arguments[0] }]]);
      return resolve({ file: factory.file, node: factory.node, bindings }, [...trail, key]);
    }
    if (!ts.isIdentifier(node)) return { ...ref, node };
    if (ref.bindings?.has(node.text)) return resolve(ref.bindings.get(node.text), trail);
    if (node.text === "undefined") return { ...ref, node };
    const key = `${ref.file}:${node.text}`;
    if (trail.includes(key)) fail(`REFERENCE_CYCLE:${key}`);
    return resolve(declaration(ref.file, node.text), [...trail, key]);
  };
  const properties = (ref, trail = []) => {
    const value = resolve(ref);
    if (trail.includes(value.node)) fail(`OBJECT_CYCLE:${value.file}`);
    const next = [...trail, value.node];
    if (!ts.isObjectLiteralExpression(value.node)) fail(`OBJECT_REQUIRED:${value.file}`);
    const entries = new Map();
    for (const property of value.node.properties) {
      if (ts.isSpreadAssignment(property)) {
        for (const [key, entry] of properties({ ...value, node: property.expression }, next))
          entries.set(key, entry);
        continue;
      }
      if (
        (!ts.isPropertyAssignment(property) &&
          !ts.isShorthandPropertyAssignment(property) &&
          !ts.isMethodDeclaration(property)) ||
        (!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name))
      )
        fail(`PROPERTY_NOT_LITERAL:${value.file}`);
      const key = property.name.text;
      if (entries.has(key)) fail(`PROPERTY_DUPLICATE:${value.file}:${key}`);
      entries.set(key, {
        ...value,
        node: ts.isShorthandPropertyAssignment(property)
          ? property.name
          : ts.isPropertyAssignment(property)
            ? property.initializer
            : property,
      });
    }
    return entries;
  };
  const list = (ref, trail = []) => {
    const value = resolve(ref);
    if (trail.includes(value.node)) fail(`ARRAY_CYCLE:${value.file}`);
    const next = [...trail, value.node];
    if (!ts.isArrayLiteralExpression(value.node)) fail(`ARRAY_REQUIRED:${value.file}`);
    return value.node.elements.flatMap((node) =>
      ts.isSpreadElement(node)
        ? list({ ...value, node: node.expression }, next)
        : [{ ...value, node }]
    );
  };
  const string = (ref) => {
    const value = resolve(ref);
    if (!ts.isStringLiteral(value.node) && !ts.isNoSubstitutionTemplateLiteral(value.node))
      fail(`STRING_REQUIRED:${value.file}`);
    if (!value.node.text) fail(`STRING_EMPTY:${value.file}`);
    return value.node.text;
  };
  return {
    reference: (file, name) => ({ file, node: ts.factory.createIdentifier(name) }),
    properties,
    list,
    string,
    optionalString(ref) {
      if (!ref) return undefined;
      const value = resolve(ref);
      return ts.isIdentifier(value.node) && value.node.text === "undefined"
        ? undefined
        : string(value);
    },
    records(ref) {
      const value = resolve(ref);
      return ts.isArrayLiteralExpression(value.node)
        ? list(value)
        : [...properties(value).values()];
    },
  };
}

function readSourceAt(root) {
  return (file) => {
    const absolute = path.resolve(root, file);
    if (!absolute.startsWith(path.resolve(root) + path.sep))
      throw new Error("COUNT_STATIC_METADATA:OUTSIDE_ROOT");
    try {
      return fs.readFileSync(absolute, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") return undefined;
      throw error;
    }
  };
}

export function readCliCountMetadata(root) {
  const source = readSourceAt(root);
  const cli = source("src/shared/constants/cliTools.ts");
  return {
    cliTotal: countCliToolRecords(cli),
    ...countCliToolCategories(cli, {
      GROK_BUILD_CLI_TOOL: source("src/shared/constants/cliToolsGrokBuild.ts"),
    }),
  };
}

export function readStaticCountMetadata(root) {
  const reader = createStaticMetadataReader(readSourceAt(root));
  const registry = Object.fromEntries(
    [...reader.properties(reader.reference("open-sse/config/providers/index.ts", "REGISTRY"))].map(
      ([key, value]) => {
        const properties = reader.properties(value);
        const id = reader.string(properties.get("id"));
        const alias = reader.optionalString(properties.get("alias"));
        return [key, { id, ...(alias ? { alias } : {}) }];
      }
    )
  );
  const names = new Set();
  const scopes = new Set();
  const collections = [
    ["open-sse/mcp-server/schemas/tools.ts", "MCP_TOOLS"],
    ...[
      "memoryTools",
      "skillTools",
      "agentSkillTools",
      "githubSkillTools",
      "poolTools",
      "gamificationTools",
      "pluginTools",
      "notionTools",
      "obsidianTools",
      "localCorpusTools",
      "compressionTools",
    ].map((name) => [`open-sse/mcp-server/tools/${name}.ts`, name]),
  ];
  for (const [file, name] of collections) {
    const records = reader.records(reader.reference(file, name));
    if (!records.length) throw new Error(`COUNT_STATIC_METADATA:EMPTY_COLLECTION:${name}`);
    for (const record of records) {
      const properties = reader.properties(record);
      names.add(reader.string(properties.get("name")));
      if (properties.has("scopes"))
        for (const scope of reader.list(properties.get("scopes"))) scopes.add(reader.string(scope));
    }
  }
  return { ...readCliCountMetadata(root), registry, mcpTools: names.size, mcpScopes: scopes.size };
}
