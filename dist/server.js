"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const constant_1 = require("./shared/constant");
const helmet_1 = __importDefault(require("helmet"));
const errors_1 = require("./shared/errors");
const http_1 = __importDefault(require("http"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const api_1 = __importDefault(require("./routes/api"));
const body_parser_1 = __importDefault(require("body-parser"));
const chat_service_1 = __importDefault(require("./service/chat.service"));
const socket_io_1 = require("socket.io");
const socketMiddleware_1 = require("./security/socketMiddleware");
const app = (0, express_1.default)();
if (process.env.NODE_ENV != 'production') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, cors_1.default)(constant_1.corsOpitions));
app.use(body_parser_1.default.json());
// routes
// Error handling
app.use('/api', api_1.default);
app.use((err, _, res, __) => {
    console.error(err);
    console.log("huu");
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        message: err.message,
    });
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.use(socketMiddleware_1.chatAuth);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', (roomId) => {
        console.log(`${socket.id} joined room ${roomId}`);
        socket.join("room-" + roomId);
    });
    socket.on('disconnect', () => {
        socket.rooms.clear();
        console.log('user disconnected');
    });
    socket.on('message', (data) => {
        chat_service_1.default.addMessage(data.userId, data.roomId, data.message);
        io.to("room-" + data.roomId).emit('message', data);
    });
});
exports.default = server;
