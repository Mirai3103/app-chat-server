import { Model, DataType, Table, Column, BeforeCreate, BeforeUpdate, BelongsToMany } from "sequelize-typescript";
import { Optional } from 'sequelize'
import { hash } from '../security/bcrypt'
import { UserRoom, Room } from './UserRoom';
interface IUser {
    id: string;
    fullName: string;
    username: string;
    password: string;
    gender: string;
    role: string;
}

export type UserInput = Optional<IUser, 'id'>;
export type UserOutput = Required<IUser>;

@Table({
    timestamps: true,
    tableName: 'user'
})
export default class User extends Model<UserOutput, UserInput>{
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id!: string;
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    fullName!: string;
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    username!: string;
    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    password!: string;
    @Column({
        type: DataType.STRING(6),
        allowNull: false,
    })
    gender!: string;
    @Column({
        type: DataType.STRING(5),
        allowNull: false,
        defaultValue: "USER"
    })
    role!: string
    @BelongsToMany(() => Room, () => UserRoom)
    Rooms!: Room[]
    @BeforeCreate
    @BeforeUpdate
    static hashPassword(user: User) {
        user.password = hash(user.password);
        user.gender = user.gender.toUpperCase();
    }
}

