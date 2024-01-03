// @ts-ignore
import style from "./style.module.scss";
import { GoogleColor } from "../../../utils/enum/color";

type AppButtonProps = {
  onClick?: () => void | Promise<void>;
  children?: React.ReactNode | React.ReactNode[];
  color?: GoogleColor;
  disabled?: boolean;
};
export default function AppButton({
  onClick,
  children,
  color = GoogleColor.black,
  disabled = false,
}: AppButtonProps) {
  const buttonClassName = `btn_${color}`;
  return (
    <button
      className={style[buttonClassName]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
