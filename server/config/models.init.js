import { cartModel } from "../modules/Cart/Cart.model.js";
import { itemModel } from "../modules/item/item.model.js";
import { UserModel } from "../modules/user/user.model.js";
import sequelize from "./sequelize.config.js";

export async function modelsInit(){
    await sequelize.authenticate()
    await sequelize.sync({force:true});

    UserModel.hasMany(cartModel,{foreignKey:"user_id"})
    cartModel.belongsTo(UserModel,{foreignKey:"user_id"})

    itemModel.hasMany(cartModel,{foreignKey:"item_id"})
    cartModel.belongsTo(itemModel,{foreignKey:"item_id"})


    console.log("connected to db")
}