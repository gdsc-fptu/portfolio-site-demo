enum Zodiac {
  Aries = "ARIES",
  Taurus = "TAURUS",
  Gemini = "GEMINI",
  Cancer = "CANCER",
  Leo = "LEO",
  Virgo = "VIRGO",
  Libra = "LIBRA",
  Scorpio = "SCORPIO",
  Sagittarius = "SAGITTARIUS",
  Capricorn = "CAPRICORN",
  Aquarius = "AQUARIUS",
  Pisces = "PISCES",
}

export function getZodiacIcon(zodiac: String) {
  switch (zodiac) {
    case Zodiac.Aries:
      return "♈";
    case Zodiac.Taurus:
      return "♉";
    case Zodiac.Gemini:
      return "♊";
    case Zodiac.Cancer:
      return "♋";
    case Zodiac.Leo:
      return "♌";
    case Zodiac.Virgo:
      return "♍";
    case Zodiac.Libra:
      return "♎";
    case Zodiac.Scorpio:
      return "♏";
    case Zodiac.Sagittarius:
      return "♐";
    case Zodiac.Capricorn:
      return "♑";
    case Zodiac.Aquarius:
      return "♒";
    case Zodiac.Pisces:
      return "♓";
    default:
      return "";
  }
}
