
export const getRolePrefix = (role: string, route?: string): string => {
  let prefix = "";
  switch (role) {
    case "admin":
      prefix = "";
      break;
    case "systemAdmin":
      prefix = "";
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
