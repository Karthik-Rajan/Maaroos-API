import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../utils/DbConnection";
import Review from "./Review";

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
      type: DataTypes.FLOAT(10, 6),
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT(10, 6),
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
    is_veg: {
      type: DataTypes.ENUM,
      values: ["YES", "NO"],
      defaultValue: "NO",
    },
    is_promoted: {
      type: DataTypes.ENUM,
      values: ["YES", "NO"],
      defaultValue: "NO",
    },
    logo_url: {
      type: DataTypes.STRING,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating_avg: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

Vendor.hasMany(Review, { foreignKey: "vendor_id" });
export default Vendor;