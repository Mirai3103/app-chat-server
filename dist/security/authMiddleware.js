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
const constant_1 = require("../shared/constant");
const user_jwt_1 = require("./user.jwt");
const user_service_1 = __importDefault(require("../service/user.service"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.signedCookies[constant_1.cookieProps.keyAccess];
        if (!token) {
            return res.status(401).json({ message: "you must login first" });
        }
        const payload = (0, user_jwt_1.verify)(token);
        const user = yield user_service_1.default.getUserById(payload.id);
        if (!user) {
            return res.status(401).json({ message: "you must login first" });
        }
        else {
            res.locals.sessionUser = user;
            next();
        }
    }
    catch (err) {
        return res.status(401).json({ message: "you must login first" });
    }
});
exports.default = authMiddleware;
