// @ts-ignore
import style from "./style.module.scss";

type InputZoneProps = {
  title: string;
  children?: React.ReactNode;
};
export default function InputZone({ title, children }: InputZoneProps) {
  return (
    <div className={style.zone}>
      <div className={style.zoneText}>{title}</div>
      {children}
    </div>
  );
}
