import User from "../models/User.model";
import { Room } from "../models/UserRoom";
import Message from "../models/Message.model";
import { sign } from '../security/chat.jwt';
import userService from "./user.service";
import { NotFoundError } from '../shared/errors'

const addMessage = (userId: string, roomId: number, message: string) => {
    return Message.create({
        userId,
        roomId,
        message
    });
}

const getAllMessage = (roomId: number) => {
    return Message.findAll({
        where: {
            roomId
        },
        include: [{
            model: User,
            attributes: ['id', 'fullName']
        }],
        raw: true
    });
}

const getVerifyTickets = async (userId: string, roomId: number) => {
    const user = await userService.getUserById(userId);
    const room = user.$get('Rooms', {
        where: {
            id: roomId
        }
    });
    if (room === null) {
        throw new NotFoundError(`Room with id ${roomId} not found`);
    }
    const token = sign({
        userId,
        roomId
    });
    return token;

}
const getAllMessagesWithPagination = async (roomId: number, page: number) => {
    const listMessage = await Message.findAll({
        where: {
            roomId
        },
        include: [{
            model: User,
            attributes: ['id', 'fullName']
        }],
        raw: true,
        limit: 5,
        offset: (page - 1) * 5
    });
    return listMessage;
}
export default {
    addMessage,
    getAllMessage,
    getVerifyTickets,
    getAllMessagesWithPagination
}