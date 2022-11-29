import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";

const User = sequelize.define(
  "users",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    profile_img: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "ACTIVE",
      values: ["PENDING", "ACTIVE", "INACTIVE", "DECLINED"],
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default User;
