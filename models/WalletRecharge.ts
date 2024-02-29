import { DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import User from "./User";

const WalletRecharge = sequelize.define(
    "wallet_recharges",
    {
        customer_uuid: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: "uuid",
            },
            allowNull: false
        },
        customer_email: {
            type: DataTypes.STRING,
        },
        customer_mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medium_payment_id: {
            type: DataTypes.STRING,
        },
        medium_order_id: {
            type: DataTypes.STRING,
        },
        mode: {
            type: DataTypes.ENUM,
            defaultValue: "CREDIT",
            values: ["CREDIT", "DEBIT"],
        },
        status: {
            type: DataTypes.ENUM,
            defaultValue: "INITIATED",
            values: ["INITIATED", "ACTIVE", "INACTIVE", "DECLINED", "ONHOLD", "IN-PROGRESS"],
        },
        medium: {
            type: DataTypes.ENUM,
            defaultValue: "RAZOR",
            values: ["RAZOR"],
        }
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

export default WalletRecharge;
