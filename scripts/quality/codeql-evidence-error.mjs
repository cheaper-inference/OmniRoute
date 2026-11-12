export class CodeqlEvidenceError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}
