import {config} from "dotenv";
import {Sequelize} from "sequelize";
config()

const sequelize = new Sequelize({
    dialect:"mysql",
    host:process.env.DB_HOST,
    port:3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false
})
export default sequelize;