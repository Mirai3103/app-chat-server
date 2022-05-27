import jwt from "jsonwebtoken";
import { InvalidJWTTokenError } from "../shared/errors";
const JWT_SECRET = process.env.JWT_SECRET || "secrettz";

interface ChatPayload {
    userId: string;
    roomId: number;
}

function sign(payload: ChatPayload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        algorithm: "HS256"
    });
}

function verify(token: string): ChatPayload {
    try {
        return jwt.verify(token, JWT_SECRET, {
            algorithms: ["HS256"]
        }) as ChatPayload;
    }
    catch (err) {
        throw new InvalidJWTTokenError("Invalid JWT token");
    }
}

export { sign, verify };