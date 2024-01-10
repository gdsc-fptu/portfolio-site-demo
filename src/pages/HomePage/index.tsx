// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../assets/brands/logo.png";

// Import React modules
import { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

// Import custom components
import Loader from "../../components/Shared/Loader";
import Background from "../../components/Shared/Background";
import MovingBubble from "../../components/Shared/MovingBubble";
import Badge from "../../components/Shared/Badges";
import UserCircle from "../../components/Shared/User";
import { GoogleColor } from "../../utils/enum/color";
import { getColorByRole, getFullNameByRole } from "../../utils/enum/roles";
import { Portfolio } from "../../utils/interface";
import { AppStrings } from "../../utils/strings";

// Import apis & hooks
import initializePage from "../../logic/HomePage/initialize";
import useGesture from "../../hooks/useGesture";
import useKeyboard from "../../hooks/useKeyboard";
import useAppStore from "../../context/store";

/**
 * Local interfaces
 */
type CurrentPortfolioProps = {
  index: number;
  id: string;
  color: GoogleColor;
};

export default function HomePage() {
  /**
   * State, Props
   */
  // Set data for all portfolio
  const [portfoliosData, setPortfoliosData] = useState([] as Portfolio[]);
  // Set state for UIs attributes
  const [currentPortfolio, setCurrentPortfolio] = useState({
    index: 0,
    id: "",
    color: GoogleColor.black,
  } as CurrentPortfolioProps);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  // Set navigator
  const navigator = useNavigate();
  // Set location
  const location = useLocation();

  /**
   * Get Image Urls from data
   */
  function getImageUrls() {
    return portfoliosData.map((portfolio) => portfolio.imageUrl);
  }

  /**
   * Set state for portfolio attributes
   */
  function handleSetCurrentPortfolio(index: number, id: String, color: String) {
    if (typeof color === "string") {
      color = getColorByRole(color);
    }
    setCurrentPortfolio(
      (_) =>
        ({
          index: index,
          id: id,
          color: color ? color : GoogleColor.black,
        } as CurrentPortfolioProps)
    );
  }

  /**
   * Handle change index
   */
  function handleChangeIndex(index: number) {
    if (index < 0 || index >= portfoliosData.length) return;
    handleSetCurrentPortfolio(
      index,
      portfoliosData[index].userName,
      portfoliosData[index].roles[0]
    );
  }

  /**
   * Handle view portfolio
   */
  function handleViewPortfolio() {
    if (currentPortfolio.id !== "") {
      navigator(`/${currentPortfolio.id}`);
    }
  }

  /**
   * Gesture and Keyboard event listener
   */
  const gestureBinding = useGesture({
    onSwipeLeft: () => handleChangeIndex(currentPortfolio.index + 1),
    onSwipeRight: () => handleChangeIndex(currentPortfolio.index - 1),
    onSwipeUp: () => handleChangeIndex(currentPortfolio.index + 1),
    onSwipeDown: () => handleChangeIndex(currentPortfolio.index - 1),
    onLongPress: () => handleViewPortfolio(),
  });
  const keyboardBinding = useKeyboard({
    onLeftArrow: () => handleChangeIndex(currentPortfolio.index - 1),
    onRightArrow: () => handleChangeIndex(currentPortfolio.index + 1),
    onEnter: () => handleViewPortfolio(),
  });

  useEffect(() => {
    /**
     * Set document title
     */
    document.title = AppStrings.footerBrand;
    /**
     * Fetch all portfolio data from database
     */
    const role = new URLSearchParams(location.search).get("role");
    initializePage(role, user).then(({ portfolios, user }) => {
      handleSetCurrentPortfolio(
        0,
        portfolios[0].userName,
        portfolios[0].roles[0]
      );
      setPortfoliosData(portfolios);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    /**
     * Keyboard event listener
     */
    window.addEventListener("keydown", keyboardBinding.onKeyPress);

    /**
     * Cleanup
     */
    return () => {
      window.removeEventListener("keydown", keyboardBinding.onKeyPress);
    };
  }, [keyboardBinding.onKeyPress]);

  return portfoliosData.length !== 0 ? (
    <div className={style.container} {...gestureBinding}>
      {user && (
        <div className={style.userContainer}>
          <UserCircle user={user} />
        </div>
      )}
      <div
        className={style.bottom}
        style={{
          height: `${portfoliosData.length * 100}%`,
        }}
      >
        {portfoliosData.map((portfolio, index) => (
          <div
            key={index}
            className={style.nameContainer}
            style={{
              transform: `translateY(-${currentPortfolio.index * 100}%)`,
            }}
          >
            <div className={style.firstName}>{portfolio.firstName}</div>
            <div
              className={clsx(
                style.lastName,
                style[getColorByRole(portfolio.roles[0])]
              )}
            >
              {portfolio.lastName}
            </div>
            <div className={style.tag}>
              <span
                className={clsx(
                  style.tagText,
                  style[getColorByRole(portfolio.roles[0])]
                )}
              >
                @{portfolio.userName}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className={style.middle}
        style={{
          width: `${portfoliosData.length * 100}%`,
        }}
      >
        {getImageUrls().map((url, index) => (
          <div
            key={index}
            className={clsx(style.imageContainer)}
            style={{
              transform: `translateX(-${currentPortfolio.index * 100}%)`,
            }}
          >
            {url && <img src={url as string} alt="Profile" />}
          </div>
        ))}
      </div>
      <div
        className={style.top}
        style={{
          height: `${portfoliosData.length * 100}%`,
        }}
      >
        {portfoliosData.map((portfolio, index) => (
          <div
            key={index}
            className={style.rolesContainer}
            style={{
              transform: `translateY(-${currentPortfolio.index * 100}%)`,
            }}
          >
            <div className={style.roles}>
              {portfolio.roles.map((role, index) => (
                <Fragment key={index}>
                  <Badge color={getColorByRole(role)}>
                    {getFullNameByRole(role)}
                  </Badge>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={style.overlay}>
        <div className={style.headerLogo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={style.chevrons}>
          <div
            className={clsx(style.chevron, style.left, {
              [style.disabled]: currentPortfolio.index === 0,
            })}
            onClick={() => handleChangeIndex(currentPortfolio.index - 1)}
          >
            <FaChevronLeft />
          </div>
          <div
            className={clsx(style.chevron, style.right, {
              [style.disabled]:
                currentPortfolio.index === portfoliosData.length - 1,
            })}
            onClick={() => handleChangeIndex(currentPortfolio.index + 1)}
          >
            <FaChevronRight />
          </div>
        </div>
        <div className={style.button}>
          <button
            className={clsx(style.btn, style[currentPortfolio.color])}
            onClick={() => handleViewPortfolio()}
          >
            {AppStrings.language.homePage.viewPortfolio}
          </button>
        </div>
      </div>
      <Background color={currentPortfolio.color} />
      <MovingBubble color={currentPortfolio.color} />
    </div>
  ) : (
    <Loader />
  );
}
