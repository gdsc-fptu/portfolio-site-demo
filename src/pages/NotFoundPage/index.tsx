// @ts-ignore
import logo from "../../assets/brands/logo_only.png";
// @ts-ignore
import style from "./style.module.scss";

// Import React modules
import { useNavigate } from "react-router-dom";

// Import custom components
import Background from "../../components/Shared/Background";
import AppButton from "../../components/Shared/Button";
import Spacer from "../../components/Shared/Spacer";
import { AppStrings } from "../../utils/strings";

export default function NotFoundPage() {
  const navigator = useNavigate();
  return (
    <div className={style.container}>
      <img src={logo} alt="logo" className={style.logo} />
      <h1>{AppStrings.language.notFoundPage.title}</h1>
      <Spacer y={10} />
      <AppButton onClick={() => navigator("/")}>
        {AppStrings.language.notFoundPage.back}
      </AppButton>
      <Background />
    </div>
  );
}
