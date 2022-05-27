import userService from "./user.service";
import { UserInput, UserOutput } from "../models/User.model";
import { LoginUnsuccessfulError, UserIsAlreadyExistedError, NotLoggedInError } from '../shared/errors';
import { validateUserInput } from "../shared/validate";
import { sign, verify } from '../security/user.jwt';
import { compare } from '../security/bcrypt';
import { JwtPayload } from "jsonwebtoken";
interface LoginPayload {
    username: string;
    password: string;
}

interface LoginDataResponse {
    token: string;
    user: UserOutput;
}

async function login({ username, password }: LoginPayload): Promise<LoginDataResponse> {
    const user = await userService.getUserByUsername(username);
    if (user === null) {
        throw new LoginUnsuccessfulError(`User with username ${username} not found`);
    }
    if (!compare(password, user.password)) {
        throw new LoginUnsuccessfulError(`User with username ${username} and password ${password} not found`);
    }
    const token = sign({
        id: user.id,
        username: user.username
    });
    return {
        token,
        user: user.toJSON()
    };
}

async function register(user: UserInput): Promise<UserOutput> {
    validateUserInput(user);
    if (await userService.isUserNameExisted(user.username)) {
        throw new UserIsAlreadyExistedError(`username: ${user.username} has been taken`);
    }
    const newUser = await userService.createUser(user);
    return newUser.toJSON();
}
async function checkLogin(token: string): Promise<UserOutput> {
    const payload = verify(token);
    const user = await userService.getUserById(payload.id);
    if (user === null) {
        throw new NotLoggedInError("User not logged in");
    }
    return user.toJSON();
}
async function getDataFromToken(token: string): Promise<JwtPayload> {
    const payload = verify(token);
    if (payload === null) {
        throw new NotLoggedInError("User not logged in");
    }
    return payload;
}
export default {
    login,
    register,
    checkLogin,
    getDataFromToken
} as const;