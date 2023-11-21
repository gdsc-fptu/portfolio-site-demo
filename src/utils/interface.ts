export type Skill = {
  id: String;
  name: String;
  percent: Number;
  description?: String;
};

export type Project = {
  name: String;
  description: String;
  startDate: String;
  imageUrl?: String;
  endDate?: String;
  roles?: String[];
  technologies?: String[];
};

export type User = {
  userName: String;
  firstName: String;
  lastName: String;
  roles: String[];
  imageUrl: String;
  descriptions: String;
  gender: String;
  birthday?: String;
  zodiac?: String;
  email: String;
  phone?: String;
  facebook?: String;
  instagram?: String;
  tiktok?: String;
  linkedin?: String;
  github?: String;
  quote?: String;
  skills?: Skill[];
  projects?: Project[];
};
