// @ts-ignore
import style from "./style.module.scss";
import { getHorizontalItemWidthResponsive } from "../../../utils/utils";

type AddNewCardButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};
export default function AddNewCardButton({
  children,
  onClick,
}: AddNewCardButtonProps) {
  const cardWidth = getHorizontalItemWidthResponsive();
  return (
    <button
      className={style.newCardButton}
      onClick={onClick}
      style={{
        width: `${cardWidth}px`,
      }}
    >
      {children}
    </button>
  );
}
