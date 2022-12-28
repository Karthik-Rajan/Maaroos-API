import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import User from "./User";
import Vendor from "./Vendor";

const Review = sequelize.define(
  "reviews",
  {
    message: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.ENUM,
      defaultValue: "ACTIVE",
      values: ["PENDING", "ACTIVE", "INACTIVE", "DECLINED"],
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: User, // 'Actors' would also work
        key: "id",
      },
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Vendor, // 'Actors' would also work
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

Review.belongsTo(User, { foreignKey: "user_id" });

export default Review;
