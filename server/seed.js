import sequelize from "./config/sequelize.config.js";
import { cartModel } from "./modules/Cart/Cart.model.js";
import { itemModel } from "./modules/item/item.model.js";
import {UserModel} from "./modules/user/user.model.js"
export async function seed() {
    try {
        console.log("🔄 Syncing database...");
        await sequelize.sync({ force: true });

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
                image_url: "/images/margherita.jpg"
            },
            {
                id: "i2",
                name: "Pepperoni Pizza",
                category: "Pizza",
                description: "Pepperoni, cheese, and tomato sauce.",
                image_url: "/images/pepperoni.jpg"
            },
            {
                id: "i3",
                name: "Garlic Bread",
                category: "side",
                description: "Toasted garlic bread with herbs.",
                image_url: "/images/garlicbread.jpg"
            },
            {
                id: "i4",
                name: "Coca Cola",
                category: "drink",
                description: "Cold refreshing cola drink.",
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

        console.log("🎉 Seeding completed successfully!");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seed error:", err);
        process.exit(1);
    }
}

seed();
