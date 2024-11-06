import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ExpenseAttributes{
    id: number
    name: string
    description: string
    userId: number  //so each expense should be tied to a user
}

//creating user attribute and userAttribute creation
interface ExpenseCreationAttribute extends Optional<ExpenseAttributes, "id"> {}

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttribute> implements ExpenseAttributes {
    public id!: number
    public name!: string
    public description!: string
    public userId!: number  //so each expense should be tied to a user  
}

Expense.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
}, {
    sequelize, 
    tableName: "expenses"
})

export default Expense