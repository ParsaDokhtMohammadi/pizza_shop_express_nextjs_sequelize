// common/test/setupTestDB.js
import sequelize from "../../config/sequelize.config.js";
import { UserModel } from "../../modules/user/user.model.js";
import { itemModel } from "../../modules/item/item.model.js";
import { cartModel } from "../../modules/Cart/Cart.model.js";
import { orderModel } from "../../modules/order/order.model.js";
import { discountModel } from "../../modules/discount/discount.model.js";

export async function setupTestDB() {
  try {

    UserModel.hasMany(cartModel, { foreignKey: "user_id" });
    cartModel.belongsTo(UserModel, { foreignKey: "user_id" });

    itemModel.hasMany(cartModel, { foreignKey: "item_id" });
    cartModel.belongsTo(itemModel, { foreignKey: "item_id" });

    UserModel.hasMany(orderModel, { foreignKey: "user_id" })
    orderModel.belongsTo(UserModel, { foreignKey: "user_id" })


    discountModel.hasMany(orderModel, { foreignKey: "discount_code" })
    orderModel.belongsTo(discountModel, { foreignKey: "discount_code" })

    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await cartModel.destroy({ where: {} })
    await UserModel.destroy({ where: {} })
    await itemModel.destroy({ where: {} })
    await discountModel.destroy({ where: {} })
    await orderModel.destroy({ where: {} })
    

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


    await itemModel.bulkCreate([
      { id: "i1", name: "Margherita Pizza", category: "Pizza", description: "Classic pizza with tomato sauce and mozzarella.", price: 300000, image_url: "/images/margherita.jpg" },
      { id: "i2", name: "Pepperoni Pizza", category: "Pizza", description: "Pepperoni, cheese, and tomato sauce.", price: 380000, image_url: "/images/pepperoni.jpg" },
      { id: "i3", name: "Garlic Bread", category: "side", description: "Toasted garlic bread with herbs.", price: 20000, image_url: "/images/garlicbread.jpg" },
      { id: "i4", name: "Coca Cola", category: "drink", description: "Cold refreshing cola drink.", price: 50000, image_url: "/images/coke.jpg" }
    ]);


    await cartModel.bulkCreate([
      { id: "c1", user_id: "u1", item_id: "i1", quantity: 2 },
      { id: "c2", user_id: "u1", item_id: "i3", quantity: 1 }
    ]);

    console.log("🎉 Test DB setup and seeded successfully!");
  } catch (err) {
    console.error("❌ Error setting up test DB:", err);
    throw err;
  }
}
