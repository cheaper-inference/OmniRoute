export function resolveStreamIndices(
  obj: Record<string, unknown>,
  currentChoiceIdx = 0,
  currentToolIdx = 0,
  parentKey = ""
): { choiceIdx: number; toolIdx: number } {
  // A reasoning-detail index identifies its own record, not a choice or tool.
  // Keep the enclosing wire identities even when the record also has an id.
  if (parentKey === "reasoning_details") {
    return { choiceIdx: currentChoiceIdx, toolIdx: currentToolIdx };
  }
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
