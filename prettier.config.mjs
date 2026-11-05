const prettierConfig = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  // Trivy accepts JSON as YAML; keep the dependency-free policy guard's JSON input.
  overrides: [{ files: ".trivyignore.yaml", options: { parser: "json" } }],
};

export default prettierConfig;
