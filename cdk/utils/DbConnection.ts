import { Sequelize, Op } from "sequelize";

const sequelize = new Sequelize("maaroos", "admin", "630561Svg", {
  host: "maaroos.cgt0qxogizav.ap-south-1.rds.amazonaws.com",
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export { sequelize, Op };
