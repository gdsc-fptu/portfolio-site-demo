// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../assets/brands/logo.png";
// @ts-ignore
import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { mockResponse } from "../../utils/mock";
import RotationMarker from "../../components/Shared/RotationMarker";
import Background, { BackgroundStyle } from "../../components/Shared/Background";
import { GoogleColor } from "../../utils/enum/color";
import Badge from "../../components/Shared/Badges";
import { getColorByRole, getFullNameByRole } from "../../utils/enum/roles";

export default function PortfolioPage() {
  const handleTranslateImage = useCallback(() => {
    let grandImage = document.getElementById("GrandImg");
    let lastName = document.getElementById("Lastname");
    // Get the current scroll position
    let scrollPosition = window.scrollY;
    // Get the current screen height
    let screenHeight = window.innerHeight;
    if (scrollPosition < screenHeight) {
      // Calculate the translate value
      let translateValue = (scrollPosition * 25) / screenHeight;
      // Set the translate value
      grandImage.style.transform = "translateX(" + translateValue + "%)";
    }
    if (scrollPosition < screenHeight / 2 - 100) {
      // Set the translate value
      lastName.style.zIndex = 2;
    } else {
      lastName.style.zIndex = 1;
    }
  }, []);

  const handleBubbleTranslate = useCallback((event: any) => {
    let bubble = document.getElementById("Bubble");
    // Get the current mouse position
    let mousePositionX = event.clientX;
    let mousePositionY = event.clientY;
    // Translate the bubble
    bubble.style.inset = `calc(${mousePositionY}px - 22.5rem) auto auto calc(${mousePositionX}px - 22.5rem)`;
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleTranslateImage);
    document.addEventListener("mousemove", handleBubbleTranslate);
    return () => {
      document.removeEventListener("scroll", handleTranslateImage);
      document.removeEventListener("mousemove", handleBubbleTranslate);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.headerLogo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={style.headerName}>
          <div>{mockResponse.lastName.toUpperCase()}</div>
          <div className={clsx(style.lastname, style[getColorByRole(mockResponse.roles[0])])} id="Lastname">
            {mockResponse.firstName.toUpperCase()}
          </div>
        </div>
        <div className={style.headerRoles}>
          {mockResponse.roles.map((role: String, index: number) => <Badge key={index} color={getColorByRole(role)}>{getFullNameByRole(role)}</Badge>)}
        </div>
        <div className={style.headerMarker}>
          <RotationMarker color={getColorByRole(mockResponse.roles[0])} />
        </div>
        <div className={style.headerImg} id={"GrandImg"}>
          <img src={mockResponse.imageUrl} alt="" />
        </div>
      </div>
      <div className={style.info}></div>
      <Background style={BackgroundStyle.dotted} color={GoogleColor.red}/>
      <div className={clsx(style.movingBubble, style[getColorByRole(mockResponse.roles[0])])} id="Bubble"></div>
    </div>
  );
}
