import { Model, DataType, Table, Column, ForeignKey, HasMany, BelongsToMany } from "sequelize-typescript";
import { Optional } from 'sequelize'
import User from './User.model'



import Message from './Message.model'
interface IRoom {
    id: number;
    name: string;
}
export type RoomInput = Optional<IRoom, 'id'>;
export type RoomOutput = Required<IRoom>;
@Table({
    timestamps: true,
    tableName: 'room'
})
export class Room extends Model<RoomOutput, RoomInput>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name!: string;
    @HasMany(() => Message)
    messages!: Message[];
    @BelongsToMany(() => User, () => UserRoom)
    users!: User[];
}





@Table({
    tableName: 'users_rooms'
})
export class UserRoom extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;
    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roomId!: number;
}