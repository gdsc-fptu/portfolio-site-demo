// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../../assets/brands/logo.png";
import Background from "../Background";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { GoogleColor, getHexByColor } from "../../../utils/enum/color";

type GeneralLayoutProps = {
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  color?: GoogleColor;
};
export default function GeneralLayout({
  children,
  isLoading = false,
  color = GoogleColor.black,
}: GeneralLayoutProps) {
  const theme = {
    palette: {
      primary: {
        main: `#${getHexByColor(color)}`,
      },
    },
    typography: {
      fontSize: 16,
      subtitle1: {
        fontSize: 16,
      },
      body1: {
        fontSize: 20,
      },
      button: {
        fontSize: 14,
      },
    },
  };
  return (
    <ThemeProvider theme={createTheme(theme)}>
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
