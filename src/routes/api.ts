import { Router } from "express";
import authRouter from './auth.router'
import userRouter from './user.router'
import chatRouter from './chat.router'
import authMiddleware from "../security/authMiddleware";
const baseRoute = Router();

baseRoute.use('/auth', authRouter);
baseRoute.use('/user', userRouter);
baseRoute.use('/chat', authMiddleware, chatRouter);

export default baseRoute;