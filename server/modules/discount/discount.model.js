import sequelize from "../../config/sequelize.config.js"
import { DataTypes } from "sequelize"

export const discountModel = sequelize.define("discount",{
        id:{type:DataTypes.STRING,primaryKey:true,allowNull:false},
        name:{type:DataTypes.STRING,allowNull:false},
        code:{type:DataTypes.STRING,allowNull:false},
        limit:{type:DataTypes.INTEGER,allowNull:false,defaultValue:20},
        start_date:{type:DataTypes.NOW,allowNull:false},
        expiration_date:{type:DataTypes.DATE,allowNull:false,defaultValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
},{
    freezeTableName:true,
    timestamps:false
})