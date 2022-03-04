import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const { DB_DATA, DB_USER, DB_PASS, DB_HOST } = process.env;
const db = new Sequelize(DB_DATA, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: DB_HOST,
});

export default db;
