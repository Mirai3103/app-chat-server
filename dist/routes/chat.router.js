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
const chat_service_1 = __importDefault(require("../service/chat.service"));
const router = (0, express_1.Router)();
const path = {
    getTickets: "/tickets/:id",
    getAllMessages: "/messages/:roomId",
};
router.get(path.getTickets, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = res.locals.sessionUser;
    const token = yield chat_service_1.default.getVerifyTickets(user.id, Number(id));
    res.status(200).json({ ticket: token });
}));
router.get(path.getAllMessages, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get page from query
    const page = req.query.page;
    const { roomId } = req.params;
    if (!page) {
        const listMessage = yield chat_service_1.default.getAllMessage(Number(roomId));
        if (listMessage.length === 0) {
            return res.status(200).json({ messages: [] });
        }
        return res.status(200).json({ messages: listMessage });
    }
    else {
        const listMessage = yield chat_service_1.default.getAllMessagesWithPagination(Number(roomId), Number(page));
        return res.status(200).json({ messages: listMessage });
    }
}));
exports.default = router;
