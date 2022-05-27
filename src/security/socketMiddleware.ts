
import { Socket } from "socket.io";
import { verify } from './chat.jwt';
export const chatAuth = (socket: Socket, next: Function) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }
    const decoded = verify(token);

    if (!decoded) {
        return next(new Error('Authentication error'));
    }
    (socket as any).socketData = decoded;
    next();
}
