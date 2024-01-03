// @ts-ignore
import style from "./style.module.scss";

type HorizontalInputsProps = {
  button?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
};
export default function HorizontalInputs({
  button,
  children,
}: HorizontalInputsProps) {
  return (
    <div className={style.horizontal}>
      <div className={style.horizontalContainer}>
        {children}
        {button}
      </div>
    </div>
  );
}
