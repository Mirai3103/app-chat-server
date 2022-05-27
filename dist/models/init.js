"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_model_1 = __importDefault(require("./User.model"));
const Message_model_1 = __importDefault(require("./Message.model"));
const UserRoom_1 = require("./UserRoom");
console.log(process.env.DATABASE_NAME);
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    logging: false,
    models: [User_model_1.default, Message_model_1.default, UserRoom_1.Room, UserRoom_1.UserRoom],
    timezone: '+07:00',
});
exports.default = sequelize;
