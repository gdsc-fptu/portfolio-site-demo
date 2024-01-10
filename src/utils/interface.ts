export type Skill = {
  name: String;
  percent: Number;
  description?: String;
};

export type Project = {
  name: String;
  description: String;
  startDate: String;
  endDate?: String;
  roles?: String[];
  technologies?: String[];
  images?: String[];
  syncId?: String | null;
};

export type Portfolio = {
  id: String;
  userName: String;
  firstName: String;
  lastName: String;
  roles: String[];
  imageUrl: String;
  description: String;
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

export type ResponseObject = {
  message: String;
  data: Portfolio | Portfolio[] | null;
};

export type User = {
  id: String;
  userName: String;
  name: String;
  email: String;
  avatar: String;
  admin: Boolean;
  createDate: String;
};
