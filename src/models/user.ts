import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import crypto from "crypto"

interface UserAttributes{
    id: number
    name: string
    email: string
    password: string
    isVerified?: boolean  
    verificationToken?: string
}

//creating user attribute and userAttribute creation
interface UserCreationAttribute extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttribute> implements UserAttributes {
    public id!: number  //sure that property would exist
    public name!: string
    public email!: string
    public password!: string 
    public isVerified!: boolean 
    public verificationToken!: string        
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: crypto.randomBytes(32).toString("hex")
    }

}, {
    sequelize, 
    tableName: "users"
})

export default User