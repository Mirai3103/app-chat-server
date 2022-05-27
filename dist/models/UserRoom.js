"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoom = exports.Room = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_model_1 = __importDefault(require("./User.model"));
const Message_model_1 = __importDefault(require("./Message.model"));
let Room = class Room extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Message_model_1.default),
    __metadata("design:type", Array)
], Room.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_model_1.default, () => UserRoom),
    __metadata("design:type", Array)
], Room.prototype, "users", void 0);
Room = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'room'
    })
], Room);
exports.Room = Room;
let UserRoom = class UserRoom extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserRoom.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Room),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserRoom.prototype, "roomId", void 0);
UserRoom = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users_rooms'
    })
], UserRoom);
exports.UserRoom = UserRoom;
