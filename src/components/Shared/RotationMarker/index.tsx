// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../../assets/brands/logo_only.png";
import clsx from "clsx";
import { GoogleColor } from "../../../utils/enum/color";
import { AppStrings } from "../../../utils/strings";

type RotationMarkerProps = {
  color?: GoogleColor;
};
export default function RotationMarker({ color }: RotationMarkerProps) {
  return (
    <div className={style.marker}>
      <section className={style.markerContainer}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            id="circlePath"
            fill="none"
            strokeWidth="0"
            stroke="hsl(0 100% 50% / 0.5)"
            d="
                M 10, 50
                a 40,40 0 1,1 80,0
                a 40,40 0 1,1 -80,0
            "
          />
          <text className={style.text}>
            <textPath
              href="#circlePath"
              className={clsx(style.textPath, style[color])}
            >
              {AppStrings.marker}&nbsp;
            </textPath>
          </text>
        </svg>
      </section>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
