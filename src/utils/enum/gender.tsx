import {
  BsGenderMale,
  BsGenderFemale,
  BsGenderAmbiguous,
} from "react-icons/bs";

enum Gender {
  male = "MALE",
  female = "FEMALE",
}

export function getStringByGender(gender: String) {
  if (gender === Gender.male) {
    return "Male";
  } else if (gender === Gender.female) {
    return "Female";
  } else {
    return "Unknown";
  }
}

export function getIconByGender(gender: String) {
  if (gender === Gender.male) {
    return <BsGenderMale />;
  } else if (gender === Gender.female) {
    return <BsGenderFemale />;
  } else {
    return <BsGenderAmbiguous />;
  }
}
