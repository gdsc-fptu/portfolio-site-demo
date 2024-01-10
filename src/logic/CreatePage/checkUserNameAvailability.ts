import { PRESERVE_KEYWORDS } from "../../utils/constant";
import { isASCII } from "../../utils/utils";
import { checkUserAvailability } from "../../apis/user";
import { AppStrings } from "../../utils/strings";

export default async function checkUserNameAvailability(
  userName: String,
  onError?: (error: String | null) => void
): Promise<Boolean> {
  if (userName === "") {
    onError && onError(AppStrings.language.errors.userNameRequired);
    return false;
  }
  if (userName.includes(" ")) {
    onError && onError(AppStrings.language.errors.userNameContainSpace);
    return false;
  }
  if (PRESERVE_KEYWORDS.includes(userName as string)) {
    onError &&
      onError(
        AppStrings.language.errors.userNameNotContain(
          PRESERVE_KEYWORDS.join(", ")
        )
      );
    return false;
  }
  if (!isASCII(userName)) {
    onError &&
      onError(AppStrings.language.errors.userNameNotContainSpecialChar);
    return false;
  }
  if (!(await checkUserAvailability(userName))) {
    onError && onError(AppStrings.language.errors.userNameNotAvailable);
    return false;
  }
  onError && onError(null);
  return true;
}
