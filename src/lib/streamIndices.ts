export function resolveStreamIndices(
  obj: Record<string, unknown>,
  currentChoiceIdx = 0,
  currentToolIdx = 0
): { choiceIdx: number; toolIdx: number } {
  let choiceIdx = currentChoiceIdx;
  let toolIdx = currentToolIdx;
  if (typeof obj.index === "number") {
    if (obj.delta || obj.message || obj.finish_reason) {
      choiceIdx = obj.index;
    } else if (obj.function || obj.id || obj.type === "function") {
      toolIdx = obj.index;
    } else {
      choiceIdx = obj.index;
    }
  }
  return { choiceIdx, toolIdx };
}
