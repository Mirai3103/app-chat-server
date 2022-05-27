import { Router } from "express";
import authMiddleware from "../security/authMiddleware";
import userService from "../service/user.service";
const router = Router();

const path = {
    getListRoom: '/rooms',
    createRoom: '/createRoom',
    joinRoom: '/joinRoom',
}
router.get(path.getListRoom, authMiddleware, async (req, res) => {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const rooms = await userService.getListRoomOfUser(user.id);
    return res.json({ rooms });
});

router.post(path.createRoom, authMiddleware, async (req, res) => {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const { room } = req.body;

    if (!room) {
        return res.status(400).json({ message: "room is required" });
    }
    const newRoom = await userService.createRoom(user.id, room);
    return res.json(newRoom);
});

router.post(path.joinRoom, authMiddleware, async (req, res) => {
    const user = res.locals.sessionUser;
    if (!user) {
        return res.status(401).json({ message: "you must login first" });
    }
    const { roomId } = req.body;
    await userService.joinARoom(user.id, roomId);
    return res.json({ message: "success" });
});
export default router;