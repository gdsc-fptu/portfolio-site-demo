// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../../assets/brands/logo.png";
import Background from "../Background";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { GoogleColor } from "../../../utils/enum/color";
import { getMUIGlobalTheme } from "../../../utils/utils";

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
    <ThemeProvider theme={createTheme(getMUIGlobalTheme(color))}>
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
    </ThemeProvider>
  );
}
