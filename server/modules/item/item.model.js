import sequelize from "../../config/sequelize.config.js";
import {DataTypes} from "sequelize";

export const itemModel = sequelize.define("Item",{
    id:{type:DataTypes.STRING , primaryKey:true , allowNull:false},
    name:{type:DataTypes.STRING,allowNull:false},
    category:{type:DataTypes.ENUM("Pizza","side","drink"),allowNull:false},
    description:{type:DataTypes.TEXT , allowNull:false},
    image_url:{type:DataTypes.STRING}
},
{
    freezeTableName:true,
    timestamps:false
})