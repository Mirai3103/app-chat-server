import express, { NextFunction, Response, Request } from "express";
import morgan from 'morgan';
import 'express-async-errors';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { corsOpitions } from './shared/constant';
import helmet from "helmet";
import { CustomError } from "./shared/errors";
import http from 'http';
import StatusCodes from 'http-status-codes'
import router from './routes/api';
import bodyParser from "body-parser";
import url from 'url';
import { verify } from './security/chat.jwt';
import chatService from "./service/chat.service";
import { Server } from 'socket.io';
import { chatAuth } from "./security/socketMiddleware";
const app = express();
if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'));
}
app.use(helmet());


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOpitions));
app.use(bodyParser.json());

// routes


// Error handling
app.use('/api', router);
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    console.error(err);
    console.log("huu");

    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        message: err.message,
    });
});


// websocket

interface IMessenger {
    message: string;
    userId: string;
    userName: string;
    roomId: number;
}

const server = http.createServer(app);
const io = new Server(server);
io.use(chatAuth);
io.on('connection', (socket) => {


    console.log('a user connected');
    socket.on('join', (roomId: number) => {
        console.log(`${socket.id} joined room ${roomId}`);
        socket.join("room-" + roomId);
    });
    socket.on('disconnect', () => {
        socket.rooms.clear();
        console.log('user disconnected');
    });
    socket.on('message', (data: IMessenger) => {
        chatService.addMessage(data.userId, data.roomId, data.message);
        io.to("room-" + data.roomId).emit('message', data);
    });
});
export default server;