import { useNavigate } from "react-router-dom";
import { checkCookieIsEnabled } from "../utils/utils";

type CookieProtectProps = {
  children: React.ReactNode;
};
export default function CookieProtect({ children }: CookieProtectProps) {
  const navigator = useNavigate();

  if (!checkCookieIsEnabled()) {
    navigator("/docs/cookie");
  }

  return <>{children}</>;
}
