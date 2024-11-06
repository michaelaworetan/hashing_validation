import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,        // Database name
    process.env.DB_USER as string,        // Database user
    process.env.DB_PASSWORD as string,    // Database password
    {
      host: process.env.DB_HOST as string,       // Database host
      dialect: process.env.DB_DIALECT as "postgres" // Database dialect
    }
);


export default sequelize;
