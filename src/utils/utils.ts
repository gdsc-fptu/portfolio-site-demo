import Resizer from "react-image-file-resizer";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { GoogleColor, getHexByColor } from "./enum/color";
// @ts-ignore
import Cookies from "js-cookie";

export function incEltNbr(elt: HTMLElement, value: number, speed: number = 10) {
  function incNbrRec(i: number, endNbr: number, elt: HTMLElement) {
    if (i <= endNbr) {
      elt.innerHTML = i.toString();
      setTimeout(function () {
        //Delay a bit before calling the function again.
        incNbrRec(i + 1, endNbr, elt);
      }, speed);
    }
  }
  incNbrRec(0, value, elt);
}

export function copyToClipboard(text: String) {
  navigator.clipboard.writeText(text as string);
}

export function mobileAndTabletCheck() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export function getTodayDate() {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  // Format date and month
  const ddStr = dd < 10 ? `0${dd}` : dd;
  const mmStr = mm < 10 ? `0${mm}` : mm;

  return yyyy + "-" + mmStr + "-" + ddStr;
}

export function getHorizontalItemWidthResponsive() {
  let cardWidth;
  let currentWidth = window.innerWidth > 1200 ? 1200 : window.innerWidth;
  if (currentWidth < 600) {
    cardWidth = currentWidth * (0.8 / 1);
  } else if (currentWidth < 900) {
    cardWidth = currentWidth * (0.8 / 2);
  } else {
    cardWidth = currentWidth * (0.8 / 3);
  }
  return cardWidth;
}

export function resizeImage(file: File, quality: number = 0.7): Promise<File> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      "PNG",
      quality,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
}

export async function downloadImage(url: string): Promise<File> {
  const image = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "image/png",
    },
  });
  const imageBlog = await image.blob();
  const fileName = url.split("/").pop() || `${uuidv4()}.png`;
  const file = new File([imageBlog], fileName, { type: "image/png" });
  return file;
}

export function isASCII(str: String) {
  return /^[\x00-\x7F]*$/.test(str as string);
}

export function getMUIGlobalTheme(color?: GoogleColor) {
  if (!color) {
    color = GoogleColor.black;
  }
  return {
    palette: {
      primary: {
        main: `#${getHexByColor(color)}`,
      },
    },
    typography: {
      fontSize: 16,
      subtitle1: {
        fontSize: 16,
      },
      body1: {
        fontSize: 20,
      },
      button: {
        fontSize: 14,
      },
    },
  };
}

export function convertStringToNumber(value: String) {
  if (value === "") {
    return 0;
  }
  const result = parseInt(value as string);
  if (isNaN(result)) {
    return 0;
  }
  return result;
}

export function formatPercentInput(
  value: String | Number,
  max?: Number,
  min?: Number
) {
  if (typeof value === "string") {
    value = convertStringToNumber(value);
  }
  if (!max) max = 100;
  if (!min) min = 0;
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

/**
 * Local storage. Used to store form data.
 */

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export function setToLocalStorage(key: string, value: any) {
  const valueStr = JSON.stringify(value);
  localStorage.setItem(key, valueStr);
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

/**
 * Cookies. Used to store token.
 */

export function checkCookieIsEnabled() {
  return navigator.cookieEnabled;
}

export function setTokenCookie(value: String) {
  Cookies.set("token", value, { expires: 1, SameSite: "None", Secure: true });
}

export function getTokenCookie() {
  return Cookies.get("token");
}

export function removeTokenCookie() {
  Cookies.remove("token");
}

/**
 * Loggers. Used to log errors and info to console.
 */

export function errorLogger(error: any, origin: String) {
  console.error(`Error from ${origin}: ${error}`);
}

export function infoLogger(info: any, origin: String) {
  console.info(`Info from ${origin}: ${info}`);
}

/**
 * Errors. Used to handle errors.
 */
export function detectError(error: any) {
  // Check if error is null or undefined
  if (!error) {
    return;
  }
  errorLogger(error, "Detecting Error: ");
  // Change location to error page
  window.location.href = "/docs/error";
}
