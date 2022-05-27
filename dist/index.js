"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const init_1 = __importDefault(require("./models/init"));
const server_1 = __importDefault(require("./server"));
init_1.default.sync().then(() => {
    console.log("Database is connected");
});
const port = process.env.PORT || 8080;
server_1.default.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
