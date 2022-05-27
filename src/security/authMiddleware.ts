import { Request, Response, NextFunction } from 'express';
import { cookieProps } from '../shared/constant';
import { verify } from './user.jwt';
import userService from '../service/user.service';
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.signedCookies[cookieProps.keyAccess];
        if (!token) {
            return res.status(401).json({ message: "you must login first" });
        }
        const payload = verify(token);
        const user = await userService.getUserById(payload.id);
        if (!user) {
            return res.status(401).json({ message: "you must login first" });
        } else {
            res.locals.sessionUser = user;
            next();
        }
    } catch (err) {
        return res.status(401).json({ message: "you must login first" });
    }
}
export default authMiddleware;