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
const UserRoom_1 = require("../models/UserRoom");
const User_model_1 = __importDefault(require("../models/User.model"));
const errors_1 = require("../shared/errors");
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_model_1.default.findByPk(id);
        if (user === null) {
            throw new errors_1.NotFoundError(`User with id ${id} not found`);
        }
        return user;
    });
}
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_model_1.default.findOne({
            where: {
                username
            }
        });
        if (user === null) {
            throw new errors_1.NotFoundError(`User with username ${username} not found`);
        }
        return user;
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield User_model_1.default.create(user);
        return newUser;
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldUser = yield getUserById(id);
        if (oldUser === null) {
            throw new errors_1.NotFoundError(`User with id ${id} not found`);
        }
        const updatedUser = yield oldUser.update(user);
        return updatedUser;
    });
}
function isUserNameExisted(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_model_1.default.findOne({
            where: {
                username
            }
        });
        return user !== null;
    });
}
function getListRoomOfUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserById(id);
        const listRoom = yield user.$get('Rooms', {
            raw: true,
        });
        return listRoom;
    });
}
function createRoom(id, room) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserById(id);
        const newRoom = yield UserRoom_1.Room.create(room);
        yield user.$add('Rooms', newRoom);
        return newRoom.toJSON();
    });
}
function joinARoom(userId, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserById(userId);
        const room = yield UserRoom_1.Room.findByPk(roomId);
        if (room === null) {
            throw new errors_1.RoomNotFoundError(`Room with id ${roomId} not found`);
        }
        const userRoom = yield user.$get('Rooms', {
            where: {
                id: roomId
            }
        });
        if (userRoom.length > 0) {
            throw new errors_1.RoomNotFoundError(`User with id ${userId} has already joined room with id ${roomId}`);
        }
        yield user.$add('Rooms', room);
    });
}
exports.default = {
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    isUserNameExisted,
    getListRoomOfUser,
    createRoom,
    joinARoom
};
