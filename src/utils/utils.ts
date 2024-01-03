import Resizer from "react-image-file-resizer";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

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

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
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

  return yyyy + "-" + mm + "-" + dd;
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
  const image = await fetch(url);
  const imageBlog = await image.blob();
  const fileName = url.split("/").pop() || `${uuidv4()}.png`;
  const file = new File([imageBlog], fileName, { type: "image/png" });
  return file;
}

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}
