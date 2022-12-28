import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import User from "./User";
import Vendor from "./Vendor";

const FoodSubscription = sequelize.define(
  "food_subscription",
  {
    user_uuid: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "uuid",
      },
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Vendor,
        key: "id",
      },
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

FoodSubscription.belongsTo(User, { foreignKey: "user_uuid" });
FoodSubscription.belongsTo(Vendor, { foreignKey: "vendor_id" });

export default FoodSubscription;
