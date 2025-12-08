import sequelizeConfig from "../../config/sequelize.config.js";
import {DataTypes} from "sequelize";
import sequelize from "../../config/sequelize.config.js";

export const UserModel = sequelize.define("User",{
    id:{type:DataTypes.STRING,autoIncrement:false},
    username:{type:DataTypes.STRING,allowNull:false,unique:true},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    address:{type:DataTypes.TEXT},
    phone_number:{type:DataTypes.STRING,unique:true},
    role:{type:DataTypes.ENUM("user","admin"),defaultValue:"user",allowNull:false},
})