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
const User_model_1 = __importDefault(require("../models/User.model"));
const Message_model_1 = __importDefault(require("../models/Message.model"));
const chat_jwt_1 = require("../security/chat.jwt");
const user_service_1 = __importDefault(require("./user.service"));
const errors_1 = require("../shared/errors");
const addMessage = (userId, roomId, message) => {
    return Message_model_1.default.create({
        userId,
        roomId,
        message
    });
};
const getAllMessage = (roomId) => {
    return Message_model_1.default.findAll({
        where: {
            roomId
        },
        include: [{
                model: User_model_1.default,
                attributes: ['id', 'fullName']
            }],
        raw: true
    });
};
const getVerifyTickets = (userId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.getUserById(userId);
    const room = user.$get('Rooms', {
        where: {
            id: roomId
        }
    });
    if (room === null) {
        throw new errors_1.NotFoundError(`Room with id ${roomId} not found`);
    }
    const token = (0, chat_jwt_1.sign)({
        userId,
        roomId
    });
    return token;
});
const getAllMessagesWithPagination = (roomId, page) => __awaiter(void 0, void 0, void 0, function* () {
    const listMessage = yield Message_model_1.default.findAll({
        where: {
            roomId
        },
        include: [{
                model: User_model_1.default,
                attributes: ['id', 'fullName']
            }],
        raw: true,
        limit: 5,
        offset: (page - 1) * 5
    });
    return listMessage;
});
exports.default = {
    addMessage,
    getAllMessage,
    getVerifyTickets,
    getAllMessagesWithPagination
};
