"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../service/auth.service"));
const errors_1 = require("../shared/errors");
const constant_1 = require("../shared/constant");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router = (0, express_1.Router)();
const path = {
    checkLogin: "/",
    login: "/login",
    register: "/register",
    logout: "/logout",
};
router.post(path.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        throw new errors_1.InvalidParameterError("username and password are required");
    }
    const { user, token } = yield auth_service_1.default.login({ username, password });
    res.cookie(constant_1.cookieProps.keyAccess, token, constant_1.cookieProps.options);
    res.status(200).json({ user });
}));
router.post(path.register, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { user } = req.body;
    if (!user) {
        throw new errors_1.InvalidParameterError("user is required");
    }
    const newUser = yield auth_service_1.default.register(user);
    res.status(200).json({ user: newUser });
})));
router.get(path.checkLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies[constant_1.cookieProps.keyAccess];
    console.log("hus");
    if (!token) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    const user = yield auth_service_1.default.checkLogin(token);
    return res.status(200).json({ user });
}));
router.get(path.logout, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies[constant_1.cookieProps.keyAccess];
    if (!token) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    res.clearCookie(constant_1.cookieProps.keyAccess);
    res.status(200).json({ message: "Logout success" });
})));
exports.default = router;
