"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../shared/errors");
const JWT_SECRET = process.env.JWT_SECRET || "secrettz";
function sign(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        algorithm: "HS256"
    });
}
exports.sign = sign;
function verify(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET, {
            algorithms: ["HS256"]
        });
    }
    catch (err) {
        throw new errors_1.InvalidJWTTokenError("Invalid JWT token");
    }
}
exports.verify = verify;
