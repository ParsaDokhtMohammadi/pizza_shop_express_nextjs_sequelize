import sequelize from "../../config/sequelize.config.js";
import { DataTypes } from "sequelize";
import { orderStatusEnum } from "../../common/enums/enums.js";


export const orderModel = sequelize.define("Order", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    user_id: {
        type: DataTypes.STRING, allowNull: false, references: {
            model: "User",
            key: "id"
        }
    },
    status: { type: DataTypes.ENUM(...Object.values(orderStatusEnum)), defaultValue: orderStatusEnum.PENDING },
    address: { type: DataTypes.TEXT },
    phone_number:{type:DataTypes.STRING,allowNull:false},
    amount: { type: DataTypes.STRING, allowNull: false },
    order_type: { type: DataTypes.ENUM("pickUp", "delivery"), allowNull: false },
    discount_code: {
        type: DataTypes.STRING, references: {
            model: "Discount",
            key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }

}, {
    freezeTableName: true,
    createdAt: "ordered_at",
    updatedAt: false
})