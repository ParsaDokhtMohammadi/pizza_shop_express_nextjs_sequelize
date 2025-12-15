import { nanoid } from "nanoid";
import sequelize from "./config/sequelize.config.js";
import { cartModel } from "./modules/Cart/Cart.model.js";
import { discountModel } from "./modules/discount/Discount.model.js";
import { itemModel } from "./modules/item/Item.model.js";
import { orderModel } from "./modules/order/order.model.js";
import { OrderItem } from "./modules/orderItem/OrderItem.model.js";
import { paymentModel } from "./modules/payment/payment.model.js";
import { UserModel } from "./modules/user/user.model.js"
export async function seed() {
    try {
        console.log("🔄 Syncing database...");
        UserModel.hasMany(cartModel, { foreignKey: "user_id",onDelete:"CASCADE",onUpdate:"CASCADE" });
        cartModel.belongsTo(UserModel, { foreignKey: "user_id" });

        itemModel.hasMany(cartModel, { foreignKey: "item_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"});
        cartModel.belongsTo(itemModel, { foreignKey: "item_id" });

        UserModel.hasMany(orderModel, { foreignKey: "user_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
        orderModel.belongsTo(UserModel, { foreignKey: "user_id" })


        discountModel.hasMany(orderModel, { foreignKey: "discount_code" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
        orderModel.belongsTo(discountModel, { foreignKey: "discount_code" })

        orderModel.hasMany(paymentModel, { foreignKey: "order_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
        paymentModel.belongsTo(orderModel, { foreignKey: "order_id" })


        orderModel.hasMany(OrderItem, { foreignKey: "order_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"})
        OrderItem.belongsTo(orderModel, { foreignKey: "order_id" })

        itemModel.hasMany(OrderItem, { foreignKey: "item_id" ,onDelete:"CASCADE",onUpdate:"CASCADE"}),
        OrderItem.belongsTo(itemModel, { foreignKey: "item_id" })


        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        await cartModel.destroy({ where: {} })
        await UserModel.destroy({ where: {} })
        await itemModel.destroy({ where: {} })
        await discountModel.destroy({ where: {} })
        await orderModel.destroy({ where: {} })
        await paymentModel.destroy({ where: {} })
        await OrderItem.destroy({ where: {} })

        console.log("🌱 Seeding users...");
        await UserModel.bulkCreate([
            {
                id: "u1",
                full_name: "John Doe",
                email: "john@example.com",
                password: "$2b$10$YnXkw1yE2Ql7Yd/84Pig7e.0AS9zcVuRbu8sLMqAYrxRq.Zn/pRL2",
                address: "123 Main Street",
                phone_number: "5551234567",
                role: "user"
            },
            {
                id: "u2",
                full_name: "Admin User",
                email: "admin@example.com",
                password: "$2b$10$YnXkw1yE2Ql7Yd/84Pig7e.0AS9zcVuRbu8sLMqAYrxRq.Zn/pRL2",
                address: "Admin HQ",
                phone_number: "5559876543",
                role: "admin"
            }
        ]);

        console.log("🌱 Seeding items...");
        await itemModel.bulkCreate([
            {
                id: "i1",
                name: "Margherita Pizza",
                category: "Pizza",
                description: "Classic pizza with tomato sauce and mozzarella.",
                price: 300000,
                image_url: "/images/margherita.jpg"
            },
            {
                id: "i2",
                name: "Pepperoni Pizza",
                category: "Pizza",
                description: "Pepperoni, cheese, and tomato sauce.",
                price: 380000,
                image_url: "/images/pepperoni.jpg"
            },
            {
                id: "i3",
                name: "Garlic Bread",
                category: "side",
                description: "Toasted garlic bread with herbs.",
                price: 200000,
                image_url: "/images/garlicbread.jpg"
            },
            {
                id: "i4",
                name: "Coca Cola",
                category: "drink",
                description: "Cold refreshing cola drink.",
                price: 50000,
                image_url: "/images/coke.jpg"
            }
        ]);

        console.log("🌱 Seeding carts...");
        await cartModel.bulkCreate([
            {
                id: "c1",
                user_id: "u1",
                item_id: "i1",
                quantity: 2
            },
            {
                id: "c2",
                user_id: "u1",
                item_id: "i3",
                quantity: 1
            }
        ]);
        await discountModel.bulkCreate([
            {
                id:nanoid(6),
                name: "test",
                code:"testDiscount",
                limit:20,
                percentage:10,
            },
            {
                id:nanoid(6),
                name: "test2",
                code:"testDiscount2",
                limit:100,
                percentage:1,
                start_date:new Date("2024-01-01 00:00:00"),
                expiration_date:new Date("2024-01-02 00:00:00")
            },
            {
                id:nanoid(6),
                name: "yalda 1404",
                code:"yalda404",
                limit:10,
                percentage:30,
            },
        ])

        console.log("🎉 Seeding completed successfully!");
    } catch (err) {
        console.error("❌ Seed error:", err);
    }
}

seed();
