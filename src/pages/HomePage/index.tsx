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
import { User } from "../../utils/interface";
import { AppStrings } from "../../utils/strings";
import sortMember from "../../utils/sortMember";

// Import apis & hooks
import { getPosts } from "../../apis/read";
import useGesture from "../../hooks/useGesture";
import useKeyboard from "../../hooks/useKeyboard";
import useAppStore from "../../context/store";

/**
 * Local interfaces
 */
type StateProps = {
  index: number;
  id: string;
  color: GoogleColor;
};

export default function HomePage() {
  /**
   * State, Props
   */
  // Set data for all portfolio
  const [data, setData] = useState([] as User[]);
  // Set state for portfolio attributes
  const [state, setState] = useState({
    index: 0,
    id: "",
    color: GoogleColor.black,
  } as StateProps);
  const user = useAppStore((state) => state.user);
  // Set navigator
  const navigator = useNavigate();
  // Set location
  const location = useLocation();

  /**
   * Get Image Urls from data
   */
  function getImageUrls() {
    return data.map((user) => user.imageUrl);
  }

  /**
   * Set state for portfolio attributes
   */
  function handleSetState(index: number, id: String, color: String) {
    if (typeof color === "string") {
      color = getColorByRole(color);
    }
    setState(
      (_) =>
        ({
          index: index,
          id: id,
          color: color ? color : GoogleColor.black,
        } as StateProps)
    );
  }

  /**
   * Handle change index
   */
  function handleChangeIndex(index: number) {
    if (index < 0 || index >= data.length) return;
    handleSetState(index, data[index].userName, data[index].roles[0]);
  }

  /**
   * Handle view portfolio
   */
  function handleViewPortfolio() {
    navigator(`/${state.id}`);
  }

  /**
   * Gesture and Keyboard event listener
   */
  const gestureBinding = useGesture({
    onSwipeLeft: () => handleChangeIndex(state.index + 1),
    onSwipeRight: () => handleChangeIndex(state.index - 1),
  });
  const keyboardBinding = useKeyboard({
    onLeftArrow: () => handleChangeIndex(state.index - 1),
    onRightArrow: () => handleChangeIndex(state.index + 1),
    onEnter: () => handleViewPortfolio(),
  });

  useEffect(() => {
    /**
     * Fetch all portfolio data from database
     */
    const role = new URLSearchParams(location.search).get("role");
    getPosts(role).then((users) => {
      users = sortMember(users);
      handleSetState(0, users[0].userName, users[0].roles[0]);
      setData(users);
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

  return data.length !== 0 ? (
    <div className={style.container} {...gestureBinding}>
      {user && (
        <div className={style.userContainer}>
          <UserCircle user={user} />
        </div>
      )}
      <div
        className={style.bottom}
        style={{
          height: `${data.length * 100}%`,
        }}
      >
        {data.map((data, index) => (
          <div
            key={index}
            className={style.nameContainer}
            style={{
              transform: `translateY(-${state.index * 100}%)`,
            }}
          >
            <div className={style.firstName}>{data.firstName}</div>
            <div
              className={clsx(
                style.lastName,
                style[getColorByRole(data.roles[0])]
              )}
            >
              {data.lastName}
            </div>
            <div className={style.tag}>
              <span
                className={clsx(
                  style.tagText,
                  style[getColorByRole(data.roles[0])]
                )}
              >
                @{data.userName}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className={style.middle}
        style={{
          width: `${data.length * 100}%`,
        }}
      >
        {getImageUrls().map((url, index) => (
          <div
            key={index}
            className={clsx(style.imageContainer)}
            style={{
              transform: `translateX(-${state.index * 100}%)`,
            }}
          >
            {url && <img src={url as string} alt="Profile" />}
          </div>
        ))}
      </div>
      <div
        className={style.top}
        style={{
          height: `${data.length * 100}%`,
        }}
      >
        {data.map((data, index) => (
          <div
            key={index}
            className={style.rolesContainer}
            style={{
              transform: `translateY(-${state.index * 100}%)`,
            }}
          >
            <div className={style.roles}>
              {data.roles.map((role, index) => (
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
              [style.disabled]: state.index === 0,
            })}
            onClick={() => handleChangeIndex(state.index - 1)}
          >
            <FaChevronLeft />
          </div>
          <div
            className={clsx(style.chevron, style.right, {
              [style.disabled]: state.index === data.length - 1,
            })}
            onClick={() => handleChangeIndex(state.index + 1)}
          >
            <FaChevronRight />
          </div>
        </div>
        <div className={style.button}>
          <button
            className={clsx(style.btn, style[state.color])}
            onClick={() => handleViewPortfolio()}
          >
            {AppStrings.language.homePage.viewPortfolio}
          </button>
        </div>
      </div>
      <Background color={state.color} />
      <MovingBubble color={state.color} />
    </div>
  ) : (
    <Loader />
  );
}
