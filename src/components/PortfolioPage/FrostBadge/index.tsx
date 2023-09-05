// @ts-ignore
import style from "./style.module.scss";

type FrostBadgeProps = {
  icon?: React.ReactNode;
  text: String;
};
export default function FrostBadge({ icon, text }: FrostBadgeProps) {
  return (
    <div className={style.badge}>
      {icon}
      {text}
    </div>
  );
}
