// @ts-ignore
import style from "./style.module.scss";

// Import React modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// Import custom components
import GeneralLayout from "../../components/Shared/GeneralLayout";
import AppButton from "../../components/Shared/Button";
import { AppStrings } from "../../utils/strings";

// Import apis and context
import useAppStore from "../../context/store";
import { GoogleLoginButton, GoogleResponse } from "../../utils/googleAuth";
import { verifyGoogleAccount } from "../../apis/user";

export default function LoginPage() {
  const [loading, setLoading] = useState<Boolean>(false);
  const navigator = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  async function handleLogin(response: GoogleResponse) {
    setLoading(true);
    await verifyGoogleAccount(response.access_token).then((userData) => {
      setLoading(false);
      setUser(userData);
      navigator("/edit");
    });
  }

  return (
    <GeneralLayout isLoading={loading}>
      <h1 className={style.text}>{AppStrings.language.loginPage.title}</h1>
      <div className={style.login}>
        <GoogleLoginButton
          onSuccess={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppButton disabled={loading as boolean}>
            <FcGoogle />
            <span>{AppStrings.language.loginPage.loginBtn}</span>
          </AppButton>
        </GoogleLoginButton>
      </div>
    </GeneralLayout>
  );
}
