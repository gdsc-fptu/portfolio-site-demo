import { AppStrings } from "../utils/strings";

export default function setDocumentTitle(
  firstName?: String,
  lastName?: String,
  userName?: String
) {
  const title =
    firstName && lastName ? `${firstName} ${lastName}` : userName || "User";
  document.title = `${title} | ${AppStrings.footerBrand}`;
}
