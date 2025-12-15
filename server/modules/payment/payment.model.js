import sequelize from "../../config/sequelize.config.js";
import { DataTypes } from "sequelize";

export const paymentModel = sequelize.define("Payment", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    order_id: {
        type: DataTypes.STRING, allowNull: false, references: {
            model: "Order",
            key: "id"
        }
    },
    amount: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue:"pending"},
    verified:{type:DataTypes.BOOLEAN , defaultValue:false},
    verified_at:{type:DataTypes.DATE},
    message:{type:DataTypes.TEXT,defaultValue:"خرید محصول"}
}, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: true
})