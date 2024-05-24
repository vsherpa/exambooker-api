import {NextFunction, Request, Response} from "express";

export const checkPermissions = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.auth?.payload.permissions as string[];
    if (!permissions || !permissions.includes(requiredPermission)) {
      return res.status(403).send('Not authorized');
    }
    next();
  };
};