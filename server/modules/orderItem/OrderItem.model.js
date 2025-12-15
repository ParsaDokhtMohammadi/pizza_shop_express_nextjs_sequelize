import sequelize from "../../config/sequelize.config.js";
import { DataTypes } from "sequelize";

export const OrderItem = sequelize.define("OrderItem", {
    id: { type: DataTypes.STRING, primaryKey: true },
    order_id: {
        type: DataTypes.STRING, allowNull: false, references: {
            model: "Order",
            key: "id"
        }
    },
    item_id: {
        type: DataTypes.STRING, allowNull: false, references: {
            model: "Item",
            key: "id"
        }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
    freezeTableName: true,
    timestamps: false
})