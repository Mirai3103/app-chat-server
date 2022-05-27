import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from 'sequelize'
import User from './User.model'
import { Room } from './UserRoom'
interface IMessage {
    id: number;
    message: string;
    roomId: number;
    userId: string;
}
export type MessageInput = Optional<IMessage, 'id'>;
export type MessageOutput = Required<IMessage>;

@Table({
    timestamps: true,
    tableName: 'message'
})
export default class Message extends Model<MessageOutput, MessageInput>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    message!: string;
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING(36),
        allowNull: false,
    })
    userId!: string;
    @BelongsTo(() => User)
    public user!: User;
    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roomId!: number;
    @BelongsTo(() => Room)
    public room!: Room;
}