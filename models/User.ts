import { DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Noname",
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Noname",
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
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
    wallet_balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    }
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default User;
