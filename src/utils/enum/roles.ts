import { GoogleColor } from "./color";

export const RolesList = ["HR", "BUSI", "TECH", "MEDEV"];

export enum Roles {
  hr = "HR",
  busi = "BUSI",
  tech = "TECH",
  medev = "MEDEV",
  core = "CORE",
  lead = "LEAD",
}

export function getColorByRole(role: String) {
  if (role === Roles.hr) {
    return GoogleColor.red;
  } else if (role === Roles.busi) {
    return GoogleColor.green;
  } else if (role === Roles.tech) {
    return GoogleColor.blue;
  } else if (role === Roles.medev) {
    return GoogleColor.yellow;
  } else if (role === Roles.lead) {
    return GoogleColor.purple;
  } else {
    return GoogleColor.black;
  }
}

export function getFullNameByRole(role: String) {
  if (role === Roles.hr) {
    return "Human Resource";
  } else if (role === Roles.busi) {
    return "Business";
  } else if (role === Roles.tech) {
    return "Technology";
  } else if (role === Roles.medev) {
    return "Media & Event";
  } else if (role === Roles.core) {
    return "Coreteam";
  } else if (role === Roles.lead) {
    return "Community Leader";
  } else {
    return role;
  }
}
