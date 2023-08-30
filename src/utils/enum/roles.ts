import { GoogleColor } from "./color";

export enum Roles {
    hr = "HR",
    busi = "BUSI",
    tech = "TECH",
    medev = "MEDEV"
}


export function getColorByRole(role: String) {
    if (role === Roles.hr) {
        return GoogleColor.red
    } else if (role === Roles.busi) {
        return GoogleColor.green
    } else if (role === Roles.tech) {
        return GoogleColor.blue
    } else if (role === Roles.medev) {
        return GoogleColor.yellow
    } else {
        return GoogleColor.blue
    }
}

export function getFullNameByRole(role: String) {
    if (role === Roles.hr) {
        return "Human Resource"
    } else if (role === Roles.busi) {
        return "Business"
    } else if (role === Roles.tech) {
        return "Technology"
    } else if (role === Roles.medev) {
        return "Media & Event"
    } else {
        return role
    }
}