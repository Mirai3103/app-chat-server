import e, { Router } from "express";
import chatService from "../service/chat.service";

const router = Router();

const path = {
    getTickets: "/tickets/:id",
    getAllMessages: "/messages/:roomId",
}

router.get(path.getTickets, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.sessionUser;
    const token = await chatService.getVerifyTickets(user.id, Number(id));
    res.status(200).json({ ticket: token });
}
);

router.get(path.getAllMessages, async (req, res) => {
    //get page from query
    const page = req.query.page;
    const { roomId } = req.params;
    if (!page) {
        const listMessage = await chatService.getAllMessage(Number(roomId));
        if (listMessage.length === 0) {
            return res.status(200).json({ messages: [] });
        }
        return res.status(200).json({ messages: listMessage });
    } else {
        const listMessage = await chatService.getAllMessagesWithPagination(Number(roomId), Number(page));
        return res.status(200).json({ messages: listMessage });
    }
}
);


export default router;