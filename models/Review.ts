import { DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import User from "./User";
import Vendor from "./Vendor";

const Review = sequelize.define(
  "reviews",
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "ACTIVE",
      values: ["PENDING", "ACTIVE", "INACTIVE", "DECLINED"],
    },
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
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

Review.belongsTo(User, { foreignKey: "user_uuid" });
Review.belongsTo(Vendor, { foreignKey: "vendor_id", constraints: false });

export default Review;
