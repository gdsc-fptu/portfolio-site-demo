// @ts-ignore
import style from "./style.module.scss";
import { useCallback, useEffect } from "react";
import clsx from "clsx";
import { GoogleColor } from "../../../utils/enum/color";

type Props = {
  color: GoogleColor;
};
export default function MovingBubble({ color }: Props) {
  const handleBubbleTranslate = useCallback((event: any) => {
    let bubble = document.getElementById("Bubble") as HTMLElement;
    // Get the current mouse position
    let mousePositionX = event.clientX;
    let mousePositionY = event.clientY;
    // Translate the bubble
    bubble.style.inset = `calc(${mousePositionY}px - 22.5rem) auto auto calc(${mousePositionX}px - 22.5rem)`;
  }, []);

  useEffect(() => {
    // Handle mousemove event
    window.addEventListener("mousemove", handleBubbleTranslate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleBubbleTranslate);
    };
  }, [handleBubbleTranslate]);

  return (
    <div className={clsx(style.movingBubble, style[color])} id="Bubble"></div>
  );
}
