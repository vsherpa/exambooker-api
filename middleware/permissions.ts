import jwtAuthz from "express-jwt-authz";

export const checkPermissions = (permissions: string | string[]) => {
  return jwtAuthz(<string[]>[permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: true
  });
};