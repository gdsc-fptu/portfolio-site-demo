export enum GoogleColor {
  black = "black",
  red = "red",
  green = "green",
  blue = "blue",
  yellow = "yellow",
}

export function getHexByColor(color: GoogleColor) {
  if (color === GoogleColor.red) {
    return "EA4335";
  } else if (color === GoogleColor.blue) {
    return "4285F4";
  } else if (color === GoogleColor.green) {
    return "34A853";
  } else if (color === GoogleColor.yellow) {
    return "FBBC05";
  } else {
    return "000000";
  }
}
