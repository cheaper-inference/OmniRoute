import { getModelInfo } from "../../services/model.ts";
import { isMicrosoftDesignerWebProviderRetiredError } from "@/shared/constants/designerWebRetirement";
import { isRuntimeProviderRetirementError } from "@/shared/constants/providerRetirement";
import { isCommonChatGptWebRetirementError } from "@/shared/constants/chatgptWebRetirement";

/** A stored target on a retired provider is unavailable, so the combo can continue. */
export async function getComboPreflightModelInfo(model: string) {
  try {
    return await getModelInfo(model);
  } catch (error) {
    if (
      isMicrosoftDesignerWebProviderRetiredError(error) ||
      isRuntimeProviderRetirementError(error) ||
      isCommonChatGptWebRetirementError(error)
    )
      return null;
    throw error;
  }
}
