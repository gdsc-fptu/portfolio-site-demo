// @ts-ignore
import vy from "../assets/images/vy.png";
import { User } from "./interface";

export const mockResponse: User = {
  userName: "lem",
  firstName: "Đinh Trần",
  lastName: "Yến Vy",
  roles: ["CORE", "HR", "TECH"],
  imageUrl: vy,
  descriptions:
    "I am Vy, call me Vy. I play Vietnamese Pipa and love spiritual stone. I am a tarot reader.",
  gender: "FEMALE",
  birthday: "2004-05-17",
  zodiac: "TAURUS",
  phone: "0935470169",
  email: "vydtyds180323@fpt.edu.vn",
  facebook: "https://www.facebook.com/dinhtran.yenvy.1754/",
  instagram: "https://www.instagram.com/yv.neey/",
  linkedin:
    "https://www.linkedin.com/in/tr%E1%BA%A7n-y%E1%BA%BFn-vy-%C4%91inh-506165276/",
  quote:
    "The most important thing in communication is to hear what isn't being said - Peter Drucker",
  skills: [
    {
      id: "communication",
      name: "Communication",
      percent: 80,
      description:
        "Communication skill is the most confident skill that I have. It help me to make a lot of friend and achieve many thing that I have never thought about.",
    },
    {
      id: "groupworking",
      name: "Group working",
      percent: 70,
    },
  ],
  projects: [
    {
      name: "Green Vision",
      description:
        "Green Vision is a mobile app for Trash recycling recommendation.",
      startDate: "2023-07-27",
      endDate: "2023-07-28",
      roles: ["BA"],
      technologies: ["Flutter", "Flask", "Ultralytics"],
    },
  ],
};
