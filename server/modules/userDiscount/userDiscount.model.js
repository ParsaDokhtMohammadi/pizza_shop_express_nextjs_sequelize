import sequelize from "../../config/sequelize.config.js";
import { DataTypes } from "sequelize";

export const userDiscountModel = sequelize.define("userDiscount",{
    user_id:{type:DataTypes.STRING,primaryKey:true,references:{
        model:"User",
        key:"id"
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
},
    discount_id:{type:DataTypes.STRING,primaryKey:true,references:{
        model:"Discount",
        key:"id"
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
},
},{
    freezeTableName:true,
    timestamps:false
})