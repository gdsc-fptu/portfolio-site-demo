// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../../assets/brands/logo.png";
import Background from "../Background";
import LinearProgress from "@mui/material/LinearProgress";
import { GoogleColor } from "../../../utils/enum/color";
import MUIConfigsWrapper from "./MUIWraper";

type GeneralLayoutProps = {
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: Boolean;
  color?: GoogleColor;
};
export default function GeneralLayout({
  children,
  isLoading = false,
  color = GoogleColor.black,
}: GeneralLayoutProps) {
  return (
    <MUIConfigsWrapper color={color}>
      <div className={style.container}>
        {isLoading ? (
          <div className={style.progress}>
            <LinearProgress />
          </div>
        ) : null}
        <div className={style.content}>
          <div className={style.logo}>
            <img src={logo} alt="Logo" />
          </div>
          {children}
        </div>
        <Background />
      </div>
    </MUIConfigsWrapper>
  );
}
