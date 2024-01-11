import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GoogleColor } from "../../../utils/enum/color";
import { getMUIGlobalTheme } from "../../../utils/utils";

type MUIWrapperProps = {
  color?: GoogleColor;
  children?: React.ReactNode | React.ReactNode[];
};
export default function MUIConfigsWrapper({
  children,
  color = GoogleColor.black,
}: MUIWrapperProps) {
  return (
    <ThemeProvider theme={createTheme(getMUIGlobalTheme(color))}>
      {children}
    </ThemeProvider>
  );
}
