import express from "express"  //creating nodejs server 
// import bodyParser from "body-parser" // json data from the client side
import sequelize from "./config/db"  //import sequelize instance
import User from "./models/user"   //sync models with sequelize 
import Expense from "./models/expense"

//import Routes
import userRoutes from "./routes/user"
import expenseRoutes from "./routes/expense"

const  app = express()  //creating express app

// app.use(bodyParser.json())  //pass json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000


app.use('/api/user', userRoutes);
app.use("/api/expense", expenseRoutes)

// Defined association between user and expense models
User.hasMany(Expense, { foreignKey: "userId", as: "expense"})
Expense.belongsTo(User, { foreignKey: "userId", as: "user"})


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})