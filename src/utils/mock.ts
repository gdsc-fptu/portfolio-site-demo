// @ts-ignore
import vy from "../assets/images/vy.png";
import { User } from "./interface";

export const mockResponse: User = {
  id: "aJdoDDMa46xhn8QctmyR",
  userName: "lem",
  firstName: "Đinh Trần",
  lastName: "Yến Vy",
  roles: ["LEAD", "CORE", "HR", "BUSI"],
  imageUrl: vy,
  description:
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
      name: "Communication",
      percent: 80,
      description:
        "Communication skill is the most confident skill that I have. It help me to make a lot of friend and achieve many thing that I have never thought about.",
    },
    {
      name: "Group working",
      percent: 70,
    },
  ],
  projects: [
    {
      name: "SunSheld",
      description:
        "SunSheld is a mobile app for detecting violation, and send emergency message.",
      startDate: "2023-02-01",
      endDate: "2023-04-01",
      roles: ["BA", "UI/UX"],
      technologies: ["Flutter", "Firebase"],
    },
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

export const mockUsers: User[] = [
  {
    id: "Cox9FTA0HO4o3V8j5bSL",
    userName: "ming",
    firstName: "Đoàn",
    lastName: "Quang Minh",
    roles: ["TECH"],
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-d6116.appspot.com/o/Member%2Fm.png?alt=media&token=d61ca4ca-bac2-416a-853a-ad2ef39508e2",
    description: "Tao già rồi",
    gender: "MALE",
    birthday: "2003-04-07",
    zodiac: "",
    phone: "0905070942",
    email: "quangminh57dng@gmail.com",
    facebook: undefined,
    instagram: undefined,
    linkedin: undefined,
    github: undefined,
    quote: "",
    skills: [],
    projects: [],
  },
  {
    id: "aJdoDDMa46xhn8QctmyR",
    userName: "lem",
    firstName: "Đinh Trần",
    lastName: "Yến Vy",
    roles: ["LEAD", "HR", "BUSI"],
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-d6116.appspot.com/o/Member%2Fvy.png?alt=media&token=43e98540-7a32-43f0-a9e2-14e39b727970",
    description:
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
    github: undefined,
    quote:
      "The most important thing in communication is to hear what isn't being said - Peter Drucker",
    skills: [],
    projects: [],
  },
  {
    id: "xElPhI68Hgc7aP29RH3B",
    userName: "cutevaidai",
    firstName: "Sieu",
    lastName: "De Thuong",
    roles: [],
    imageUrl: "",
    description: "",
    gender: "",
    birthday: "",
    zodiac: "",
    phone: undefined,
    email: "",
    facebook: undefined,
    instagram: undefined,
    linkedin: undefined,
    github: undefined,
    quote: "",
    skills: [],
    projects: [],
  },
];
