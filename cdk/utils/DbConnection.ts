import { Sequelize } from "sequelize";

const DBClient = () => {
  const connection = {
    ssl: {
      rejectUnauthorized: false,
    },
    host: "maaroos.cgt0qxogizav.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "630561Svg",
    database: "maaroos",
  };

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

  return sequelize;
};

export default DBClient;
