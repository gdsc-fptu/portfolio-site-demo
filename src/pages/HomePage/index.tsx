// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../assets/brands/logo.png";
import { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import Loader from "../../components/Shared/Loader";
import Background from "../../components/Shared/Background";
import { GoogleColor } from "../../utils/enum/color";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import sortMember from "../../utils/sortMember";
import { getColorByRole, getFullNameByRole } from "../../utils/enum/roles";
import MovingBubble from "../../components/Shared/MovingBubble";
import Badge from "../../components/Shared/Badges";
import { getPosts } from "../../apis/read";
import { User } from "../../utils/interface";

export default function HomePage() {
  const [data, setData] = useState([] as User[]);
  const [state, setState] = useState({
    index: 0,
    id: "",
    color: GoogleColor.black,
  } as any);
  const navigator = useNavigate();
  const location = useLocation();
  const geturePosition = useRef({ xDown: 0, yDown: 0, xUp: 0, yUp: 0 });

  function getImageUrls() {
    return data.map((user) => user.imageUrl);
  }

  function handleChangeIndex(index: number) {
    if (index < 0 || index >= data.length) return;
    setState((_: any) => ({
      index: index,
      id: data[index].userName,
      color: data[index].roles[0]
        ? getColorByRole(data[index].roles[0])
        : GoogleColor.black,
    }));
  }

  function handleViewPortfolio() {
    navigator(`/${state.id}`);
  }

  function handleKeyDown(event: any) {
    if (event.key === "ArrowLeft") {
      handleChangeIndex(state.index - 1);
    } else if (event.key === "ArrowRight") {
      handleChangeIndex(state.index + 1);
    } else if (event.key === "Enter") {
      handleViewPortfolio();
    }
  }

  function handleGesture() {
    const { xDown, yDown, xUp, yUp } = geturePosition.current;
    if (!xDown || !yDown || !xUp || !yUp) return;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        handleChangeIndex(state.index + 1);
      } else {
        handleChangeIndex(state.index - 1);
      }
    }
    geturePosition.current = { xDown: 0, yDown: 0, xUp: 0, yUp: 0 };
  }

  function handleGestureDown(event: any) {
    geturePosition.current.xDown = event.touches[0].clientX;
    geturePosition.current.yDown = event.touches[0].clientY;
  }

  function handleGestureUp(event: any) {
    geturePosition.current.xUp = event.changedTouches[0].clientX;
    geturePosition.current.yUp = event.changedTouches[0].clientY;
    handleGesture();
  }

  useEffect(() => {
    const role = new URLSearchParams(location.search).get("role");
    getPosts(role as string).then((res) => {
      res = sortMember(res);
      setState((_: any) => ({
        index: 0,
        id: res[0].userName,
        color: res[0].roles[0]
          ? getColorByRole(res[0].roles[0])
          : GoogleColor.black,
      }));
      setData(res);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleGestureDown);
    window.addEventListener("touchend", handleGestureUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleGestureDown);
      window.removeEventListener("touchend", handleGestureUp);
    };
  }, [handleKeyDown]);

  return data.length !== 0 ? (
    <div className={style.container}>
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
            View Portfolio
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
