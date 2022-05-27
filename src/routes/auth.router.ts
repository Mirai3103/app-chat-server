import { RequestHandler, Router } from "express";
import authService from "../service/auth.service";
import { InvalidParameterError } from '../shared/errors';
import { cookieProps } from '../shared/constant';
import status from 'http-status-codes'
const router = Router();

const path = {
    checkLogin: "/",
    login: "/login",
    register: "/register",
    logout: "/logout",
}

router.post(path.login, async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        throw new InvalidParameterError("username and password are required");
    }
    const { user, token } = await authService.login({ username, password });

    res.cookie(cookieProps.keyAccess, token, cookieProps.options);
    res.status(200).json({ user });
}
);

router.post(path.register, (async (req, res) => {
    console.log(req.body);
    const { user } = req.body;
    if (!user) {
        throw new InvalidParameterError("user is required");
    }
    const newUser = await authService.register(user);
    res.status(200).json({ user: newUser });
}) as RequestHandler);

router.get(path.checkLogin, async (req, res) => {
    const token = req.signedCookies[cookieProps.keyAccess];
    console.log("hus");

    if (!token) {
        return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    const user = await authService.checkLogin(token);
    return res.status(200).json({ user });
});
router.get(path.logout, (async (req, res) => {
    const token = req.signedCookies[cookieProps.keyAccess];
    if (!token) {
        return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    res.clearCookie(cookieProps.keyAccess);
    res.status(200).json({ message: "Logout success" });
}) as RequestHandler);
export default router;