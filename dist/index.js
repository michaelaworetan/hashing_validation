"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //creating nodejs server 
// import bodyParser from "body-parser" // json data from the client side
const db_1 = __importDefault(require("./config/db")); //import sequelize instance
const user_1 = __importDefault(require("./models/user")); //sync models with sequelize 
const expense_1 = __importDefault(require("./models/expense"));
//import Routes
const user_2 = __importDefault(require("./routes/user"));
const expense_2 = __importDefault(require("./routes/expense"));
const app = (0, express_1.default)(); //creating express app
// app.use(bodyParser.json())  //pass json data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 3000;
app.use('/api/user', user_2.default);
app.use("/api/expense", expense_2.default);
// Defined association between user and expense models
user_1.default.hasMany(expense_1.default, { foreignKey: "userId", as: "expense" });
expense_1.default.belongsTo(user_1.default, { foreignKey: "userId", as: "user" });
db_1.default.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
