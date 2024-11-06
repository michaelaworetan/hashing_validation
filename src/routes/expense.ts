import { Router } from "express";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expense";

const router = Router()

router.get("/", getExpenses)

router.post("/addExpense", addExpense)

router.put("/updateExpense/:id", updateExpense)

router.delete("/deleteExpense/:id", deleteExpense )

export default router