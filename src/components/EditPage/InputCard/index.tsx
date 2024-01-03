// @ts-ignore
import style from "./style.module.scss";
import IconButton from "@mui/material/IconButton";
import { MdDelete } from "react-icons/md";
import { getHorizontalItemWidthResponsive } from "../../../utils/utils";

type InputCardProps = {
  title: String;
  onDelete?: () => void;
  children?: React.ReactNode;
};
export default function InputCard({
  title,
  onDelete,
  children,
}: InputCardProps) {
  const cardWidth = getHorizontalItemWidthResponsive();
  return (
    <div
      className={style.card}
      style={{
        width: `${cardWidth}px`,
      }}
    >
      <div className={style.cardTitle}>
        {title}
        <IconButton
          aria-label="delete-btn-card"
          color="error"
          onClick={onDelete}
        >
          <MdDelete />
        </IconButton>
      </div>
      {children}
    </div>
  );
}
