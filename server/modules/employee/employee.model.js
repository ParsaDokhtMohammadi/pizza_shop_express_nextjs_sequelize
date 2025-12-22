import sequelize from "../../config/sequelize.config.js"
import { DataTypes } from "sequelize"

export const employeeModel = sequelize.define("employee",{
    social_code:{type:DataTypes.STRING,primaryKey:true},
    full_name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    phone_number:{type:DataTypes.STRING,unique:true,allowNull:false},
    image_url:{type:DataTypes.STRING}
},{
    freezeTableName:true,
    createdAt:"created_at",
    updatedAt:false
})