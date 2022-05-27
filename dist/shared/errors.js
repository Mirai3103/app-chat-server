"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomNotFoundError = exports.NotLoggedInError = exports.InvalidJWTTokenError = exports.UserIsAlreadyExistedError = exports.InvalidParameterError = exports.LoginUnsuccessfulError = exports.NotFoundError = exports.CustomError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class CustomError extends Error {
    constructor(msg, httpStatus) {
        super(msg);
        this.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
        this.HttpStatus = httpStatus;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class LoginUnsuccessfulError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.UNAUTHORIZED);
    }
}
exports.LoginUnsuccessfulError = LoginUnsuccessfulError;
class InvalidParameterError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.InvalidParameterError = InvalidParameterError;
class UserIsAlreadyExistedError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.CONFLICT);
    }
}
exports.UserIsAlreadyExistedError = UserIsAlreadyExistedError;
class InvalidJWTTokenError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.UNAUTHORIZED);
    }
}
exports.InvalidJWTTokenError = InvalidJWTTokenError;
class NotLoggedInError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.UNAUTHORIZED);
    }
}
exports.NotLoggedInError = NotLoggedInError;
class RoomNotFoundError extends CustomError {
    constructor(msg) {
        super(msg, http_status_codes_1.default.NOT_FOUND);
    }
}
exports.RoomNotFoundError = RoomNotFoundError;
