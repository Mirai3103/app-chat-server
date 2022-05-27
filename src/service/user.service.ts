import { Room, RoomOutput } from "../models/UserRoom";
import User, { UserInput } from "../models/User.model";
import { NotFoundError, RoomNotFoundError } from '../shared/errors';
async function getUserById(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (user === null) {
        throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
}

async function getUserByUsername(username: string): Promise<User> {
    const user = await User.findOne({
        where: {
            username
        }
    });
    if (user === null) {
        throw new NotFoundError(`User with username ${username} not found`);
    }
    return user;
}

async function createUser(user: UserInput): Promise<User> {
    const newUser = await User.create(user);
    return newUser;
}

async function updateUser(id: string, user: UserInput): Promise<User> {
    const oldUser = await getUserById(id);
    if (oldUser === null) {
        throw new NotFoundError(`User with id ${id} not found`);
    }
    const updatedUser = await oldUser.update(user);
    return updatedUser;
}

async function isUserNameExisted(username: string): Promise<boolean> {
    const user = await User.findOne({
        where: {
            username
        }
    });
    return user !== null;
}
async function getListRoomOfUser(id: string): Promise<RoomOutput[]> {
    const user = await getUserById(id);
    const listRoom = await user.$get('Rooms', {
        raw: true,
    });
    return listRoom;
}

async function createRoom(id: string, room: RoomOutput): Promise<RoomOutput> {
    const user = await getUserById(id);
    const newRoom = await Room.create(room);
    await user.$add('Rooms', newRoom);
    return newRoom.toJSON();
}
async function joinARoom(userId: string, roomId: string): Promise<void> {
    const user = await getUserById(userId);
    const room = await Room.findByPk(roomId);
    if (room === null) {
        throw new RoomNotFoundError(`Room with id ${roomId} not found`);
    }
    const userRoom = await user.$get('Rooms', {
        where: {
            id: roomId
        }
    });
    if (userRoom.length > 0) {
        throw new RoomNotFoundError(`User with id ${userId} has already joined room with id ${roomId}`);
    }

    await user.$add('Rooms', room);
}
export default {
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    isUserNameExisted,
    getListRoomOfUser,
    createRoom,
    joinARoom
} as const;