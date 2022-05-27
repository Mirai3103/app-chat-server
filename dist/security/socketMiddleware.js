"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatAuth = void 0;
const chat_jwt_1 = require("./chat.jwt");
const chatAuth = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }
    const decoded = (0, chat_jwt_1.verify)(token);
    if (!decoded) {
        return next(new Error('Authentication error'));
    }
    socket.socketData = decoded;
    next();
};
exports.chatAuth = chatAuth;
