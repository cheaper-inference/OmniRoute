export class ManagedCliRuntimeError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly httpStatus = 500
  ) {
    super(message);
    this.name = "ManagedCliRuntimeError";
  }
}
