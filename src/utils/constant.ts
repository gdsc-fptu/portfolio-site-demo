import { Project, Skill } from "./interface";
import { getTodayDate } from "./utils";

export const BASE_URL = "https://6477j4-3000.csb.app"; // Portfolio API
export const BASE_URL_2 = "https://34v2kf-5000.csb.app"; // Remove Background API
export const BASE_URL_3 = "https://88456n-3000.csb.app"; // Authentication API
export const Apis = {
  getAll: `${BASE_URL}/api`,
  getOne: `${BASE_URL}/api/`,
  create: `${BASE_URL}/api/modify`,
  update: `${BASE_URL}/api/modify/`,
  delete: `${BASE_URL}/api/modify/`,
  removeBackground: `${BASE_URL_2}/api/rembg/`,
  readImage: `${BASE_URL}/api/media`,
  uploadImage: `${BASE_URL}/api/media/upload`,
  deleteImage: `${BASE_URL}/api/media/delete`,
  login: `${BASE_URL_3}/api/auth/google`,
  currentUser: `${BASE_URL_3}/api/auth/me`,
  verify: `${BASE_URL_3}/api/auth/verify`,
  logout: `${BASE_URL_3}/api/auth/logout`,
  checkUser: `${BASE_URL}/api/check/`,
  updateUserName: `${BASE_URL_3}/api/users/update`,
};

export const SKILL_INITIALIZE: Skill = {
  name: "",
  percent: 0,
  description: "",
};

export const PROJECT_INITIALIZE: Project = {
  name: "",
  description: "",
  startDate: getTodayDate(),
  endDate: getTodayDate(),
  roles: [],
  technologies: [],
  syncId: null,
};

export const FILE_SIZE_LIMIT = 100000; // 2MB
export const ACCEPTED_TYPES = ".png,.jpg,.jpeg";

export const PRESERVE_KEYWORDS = ["edit", "login", "create", "404"];
