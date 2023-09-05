import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from "react-icons/tb";

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

export function getIconByZodiac(zodiac: String) {
  switch (zodiac) {
    case Zodiac.Aries:
      return <TbZodiacAries />;
    case Zodiac.Taurus:
      return <TbZodiacTaurus />;
    case Zodiac.Gemini:
      return <TbZodiacGemini />;
    case Zodiac.Cancer:
      return <TbZodiacCancer />;
    case Zodiac.Leo:
      return <TbZodiacLeo />;
    case Zodiac.Virgo:
      return <TbZodiacVirgo />;
    case Zodiac.Libra:
      return <TbZodiacLibra />;
    case Zodiac.Scorpio:
      return <TbZodiacScorpio />;
    case Zodiac.Sagittarius:
      return <TbZodiacSagittarius />;
    case Zodiac.Capricorn:
      return <TbZodiacCapricorn />;
    case Zodiac.Aquarius:
      return <TbZodiacAquarius />;
    case Zodiac.Pisces:
      return <TbZodiacPisces />;
    default:
      return "";
  }
}

export function getStringByZodiac(zodiac: String) {
  switch (zodiac) {
    case Zodiac.Aries:
      return "Aries";
    case Zodiac.Taurus:
      return "Taurus";
    case Zodiac.Gemini:
      return "Gemini";
    case Zodiac.Cancer:
      return "Cancer";
    case Zodiac.Leo:
      return "Leo";
    case Zodiac.Virgo:
      return "Virgo";
    case Zodiac.Libra:
      return "Libra";
    case Zodiac.Scorpio:
      return "Scorpio";
    case Zodiac.Sagittarius:
      return "Sagittarius";
    case Zodiac.Capricorn:
      return "Capricorn";
    case Zodiac.Aquarius:
      return "Aquarius";
    case Zodiac.Pisces:
      return "Pisces";
    default:
      return "";
  }
}
