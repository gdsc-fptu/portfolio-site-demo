// @ts-ignore
import style from "./style.module.scss";

export default function SubSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={style.subSection}>{children}</div>;
}
