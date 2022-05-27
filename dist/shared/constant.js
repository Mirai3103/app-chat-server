"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOpitions = exports.cookieProps = void 0;
const options = {
    httpOnly: true,
    signed: true,
    secure: (process.env.SECURE_COOKIE === 'true'),
    maxAge: 216000 * 60,
    path: '/',
    sameSite: 'none'
};
exports.cookieProps = Object.freeze({
    keyAccess: process.env.KEY_SECRET || "access",
    secret: process.env.COOKIE_SECRET,
    options
});
exports.corsOpitions = Object.freeze({
    origin: (process.env.NODE_ENV === 'production') ? 'https://chat-client-7mxyaol90-mirai3103.vercel.app' : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Content-Length', 'Accept-Encoding', 'Accept-Language', 'Host', 'Referer', 'User-Agent', 'Cookie'],
    exposedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Content-Length', 'Accept-Encoding', 'Accept-Language', 'Host', 'Referer', 'User-Agent', 'Cookie']
});
