import { User } from "./interface";

const PRIORITIES_ROLE = ["LEAD", "CORE"];

export default function sortMember(members: User[]) {
  return members.sort((a, b) => {
    const aRole = a.roles.find((role) =>
      PRIORITIES_ROLE.includes(role as string)
    );
    const bRole = b.roles.find((role) =>
      PRIORITIES_ROLE.includes(role as string)
    );
    if (aRole && bRole) {
      return (
        PRIORITIES_ROLE.indexOf(aRole as string) -
        PRIORITIES_ROLE.indexOf(bRole as string)
      );
    }
    if (aRole) {
      return -1;
    }
    if (bRole) {
      return 1;
    }
    return 0;
  });
}
