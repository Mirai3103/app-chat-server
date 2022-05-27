"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const user_router_1 = __importDefault(require("./user.router"));
const chat_router_1 = __importDefault(require("./chat.router"));
const authMiddleware_1 = __importDefault(require("../security/authMiddleware"));
const baseRoute = (0, express_1.Router)();
baseRoute.use('/auth', auth_router_1.default);
baseRoute.use('/user', user_router_1.default);
baseRoute.use('/chat', authMiddleware_1.default, chat_router_1.default);
exports.default = baseRoute;
