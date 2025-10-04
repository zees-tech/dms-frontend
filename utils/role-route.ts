
export const getRolePrefix = (role: string, route?: string): string => {
  let prefix = "";
  switch (role) {
    case "admin":
      prefix = "adm";
      break;
    case "systemAdmin":
      prefix = "sysadm";
      break;
    case "user":
      prefix = "";
      break;
    default:
      prefix = "";
      break;
  }
  if (route) {
    return `${prefix}/${route}`;
  }
  return prefix;
};
