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
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../security/authMiddleware"));
const user_service_1 = __importDefault(require("../service/user.service"));
const router = (0, express_1.Router)();
const path = {
    getListRoom: '/rooms',
    createRoom: '/createRoom',
    joinRoom: '/joinRoom',
};
router.get(path.getListRoom, authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const rooms = yield user_service_1.default.getListRoomOfUser(user.id);
    return res.json({ rooms });
}));
router.post(path.createRoom, authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const { room } = req.body;
    if (!room) {
        return res.status(400).json({ message: "room is required" });
    }
    const newRoom = yield user_service_1.default.createRoom(user.id, room);
    return res.json(newRoom);
}));
router.post(path.joinRoom, authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const { roomId } = req.body;
    yield user_service_1.default.joinARoom(user.id, roomId);
    return res.json({ message: "success" });
}));
exports.default = router;
