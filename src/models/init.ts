import { Sequelize } from 'sequelize-typescript';
import User from './User.model';
import Message from './Message.model';
import { Room, UserRoom } from './UserRoom';
console.log(process.env.DATABASE_NAME)
const sequelize = new Sequelize({
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
    models: [User, Message, Room, UserRoom],
    timezone: '+07:00',
})

export default sequelize;