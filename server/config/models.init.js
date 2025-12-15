import { cartModel } from "../modules/Cart/Cart.model.js";
import { discountModel } from "../modules/discount/Discount.model.js";
import { itemModel } from "../modules/item/Item.model.js";
import { orderModel } from "../modules/order/order.model.js";
import { OrderItem } from "../modules/orderItem/OrderItem.model.js";
import { paymentModel } from "../modules/payment/payment.model.js";
import { UserModel } from "../modules/user/user.model.js";
import sequelize from "./sequelize.config.js";

export async function modelsInit() {
    await sequelize.authenticate()

    UserModel.hasMany(cartModel, { foreignKey: "user_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
    cartModel.belongsTo(UserModel, { foreignKey: "user_id" })

    itemModel.hasMany(cartModel, { foreignKey: "item_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
    cartModel.belongsTo(itemModel, { foreignKey: "item_id" })

    UserModel.hasMany(orderModel, { foreignKey: "user_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
    orderModel.belongsTo(UserModel, { foreignKey: "user_id" })


    discountModel.hasMany(orderModel, { foreignKey: "discount_code" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
    orderModel.belongsTo(discountModel, { foreignKey: "discount_code" })

    orderModel.hasMany(paymentModel,{foreignKey:"order_id",onDelete:"CASCADE",onUpdate:"CASCADE"})
    paymentModel.belongsTo(orderModel,{foreignKey:"order_id"})

    orderModel.hasMany(OrderItem,{foreignKey:"order_id",onDelete:"CASCADE",onUpdate:"CASCADE"})
    OrderItem.belongsTo(orderModel,{foreignKey:"order_id"})

    itemModel.hasMany(OrderItem,{foreignKey:"item_id",onDelete:"CASCADE",onUpdate:"CASCADE"}),
    OrderItem.belongsTo(itemModel,{foreignKey:"item_id"})

    await sequelize.sync();

    console.log("connected to db")
}