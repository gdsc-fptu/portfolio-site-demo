// @ts-ignore
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../components/Shared/GeneralLayout";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "../../apis/user";
import AppButton from "../../components/Shared/Button";

export default function LoginPage() {
  const navigator = useNavigate();

  async function handleLogin() {
    await loginWithGoogle();
    navigator("/edit");
  }

  return (
    <GeneralLayout>
      <h1 className={style.text}>You must login to continue</h1>
      <div className={style.login}>
        <AppButton onClick={handleLogin}>
          <FcGoogle />
          Login with Google
        </AppButton>
      </div>
    </GeneralLayout>
  );
}
