import dotenv from 'dotenv';
dotenv.config();
import sequelize from "./models/init";
import server from "./server";

sequelize.sync().then(() => {
    console.log("Database is connected");
});
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});