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
const user_service_1 = __importDefault(require("./user.service"));
const errors_1 = require("../shared/errors");
const validate_1 = require("../shared/validate");
const user_jwt_1 = require("../security/user.jwt");
const bcrypt_1 = require("../security/bcrypt");
function login({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.getUserByUsername(username);
        if (user === null) {
            throw new errors_1.LoginUnsuccessfulError(`User with username ${username} not found`);
        }
        if (!(0, bcrypt_1.compare)(password, user.password)) {
            throw new errors_1.LoginUnsuccessfulError(`User with username ${username} and password ${password} not found`);
        }
        const token = (0, user_jwt_1.sign)({
            id: user.id,
            username: user.username
        });
        return {
            token,
            user: user.toJSON()
        };
    });
}
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validate_1.validateUserInput)(user);
        if (yield user_service_1.default.isUserNameExisted(user.username)) {
            throw new errors_1.UserIsAlreadyExistedError(`username: ${user.username} has been taken`);
        }
        const newUser = yield user_service_1.default.createUser(user);
        return newUser.toJSON();
    });
}
function checkLogin(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = (0, user_jwt_1.verify)(token);
        const user = yield user_service_1.default.getUserById(payload.id);
        if (user === null) {
            throw new errors_1.NotLoggedInError("User not logged in");
        }
        return user.toJSON();
    });
}
function getDataFromToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = (0, user_jwt_1.verify)(token);
        if (payload === null) {
            throw new errors_1.NotLoggedInError("User not logged in");
        }
        return payload;
    });
}
exports.default = {
    login,
    register,
    checkLogin,
    getDataFromToken
};
