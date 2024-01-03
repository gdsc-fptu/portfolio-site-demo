/**
 * Background component
 * @param style Style of background -> @enum [dotted]
 * @param color Color of background -> [GoogleColor]
 *
 * @tutorial
 * Use this component as children of other component. It will inherite the size of parent.
 */

// @ts-ignore
import bgStyle from "./style.module.scss";
import { GoogleColor } from "../../../utils/enum/color";

export enum BackgroundStyle {
  dotted = "dotted",
}

type BackgroundProps = {
  style?: BackgroundStyle;
  color?: GoogleColor;
};
export default function Background({
  style = BackgroundStyle.dotted,
  color = GoogleColor.black,
}: BackgroundProps) {
  const backgroundClassName = `background_${style}_${color}`;
  return <div className={bgStyle[backgroundClassName]}></div>;
}
