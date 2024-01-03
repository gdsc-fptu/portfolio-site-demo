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

export const ZodiacList = [
  "ARIES",
  "TAURUS",
  "GEMINI",
  "CANCER",
  "LEO",
  "VIRGO",
  "LIBRA",
  "SCORPIO",
  "SAGITTARIUS",
  "CAPRICORN",
  "AQUARIUS",
  "PISCES",
];

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

export function getZodiacByBirthday(birthday: String) {
  const month = Number(birthday.split("-")[1]);
  const day = Number(birthday.split("-")[2]);
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return Zodiac.Aries;
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return Zodiac.Taurus;
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return Zodiac.Gemini;
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return Zodiac.Cancer;
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return Zodiac.Leo;
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return Zodiac.Virgo;
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return Zodiac.Libra;
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    return Zodiac.Scorpio;
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    return Zodiac.Sagittarius;
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return Zodiac.Capricorn;
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return Zodiac.Aquarius;
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return Zodiac.Pisces;
  } else {
    return Zodiac.Aries;
  }
}
