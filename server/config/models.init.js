import { cartModel } from "../modules/Cart/Cart.model.js";
import { discountModel } from "../modules/discount/discount.model.js";
import { itemModel } from "../modules/item/item.model.js";
import { orderModel } from "../modules/order/order.model.js";
import { paymentModel } from "../modules/payment/payment.model.js";
import { UserModel } from "../modules/user/user.model.js";
import sequelize from "./sequelize.config.js";

export async function modelsInit() {
    await sequelize.authenticate()

    UserModel.hasMany(cartModel, { foreignKey: "user_id" })
    cartModel.belongsTo(UserModel, { foreignKey: "user_id" })

    itemModel.hasMany(cartModel, { foreignKey: "item_id" })
    cartModel.belongsTo(itemModel, { foreignKey: "item_id" })

    UserModel.hasMany(orderModel, { foreignKey: "user_id" })
    orderModel.belongsTo(UserModel, { foreignKey: "user_id" })


    discountModel.hasMany(orderModel, { foreignKey: "discount_code" })
    orderModel.belongsTo(discountModel, { foreignKey: "discount_code" })

    orderModel.hasMany(paymentModel,{foreignKey:"order_id"})
    paymentModel.belongsTo(orderModel,{foreignKey:"order_id"})


    await sequelize.sync();

    console.log("connected to db")
}