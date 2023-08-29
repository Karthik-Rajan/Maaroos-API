import { DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import User from "./User";
import Vendor from "./Vendor";

const WalletRecharge = sequelize.define(
    "wallet_recharges",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        customer_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
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
