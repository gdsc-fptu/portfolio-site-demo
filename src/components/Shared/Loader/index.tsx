// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import catGif from "../../../assets/utils/cat.gif";

type LoaderProps = {
  progress?: number;
  description?: string;
};
export default function Loader({
  progress = 0,
  description = "",
}: LoaderProps) {
  return (
    <div className={style.container}>
      <img src={catGif} alt="cat" className={style.gif} />
      <div className={style.progress}>
        <div
          className={style.progressBar}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
