import { Sequelize, DataTypes } from "sequelize";
import DBClient from "../utils/DbConnection";

const sequelize = DBClient();

const Vendor = sequelize.define(
  "vendors",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        "PENDING",
        "ACTIVE",
        "INACTIVE",
        "DECLINED",
        "IN-PROGRESS",
        "ONHOLD",
      ],
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default Vendor;
