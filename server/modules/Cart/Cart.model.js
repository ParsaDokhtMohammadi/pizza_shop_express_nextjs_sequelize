import sequelize from "../../config/sequelize.config";
import { DataTypes } from "sequelize";

export const cartModel = sequelize.define("Cart",{
    id:{type:DataTypes.STRING,primaryKey:true,allowNull:false},
    user_id:{type:DataTypes.STRING,allowNull:false,references:{
        model:"User",
        key:"id"
    }},
    item_id:{type:DataTypes.STRING,allowNull:false,references:{
        model:"Item",
        key:"id"
    }},
    quantity:{type:DataTypes.INTEGER,allowNull:false,defaultValue:1}
},{
    freezeTableName:true,
    timestamps:false
})