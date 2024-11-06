import { Request, Response } from "express";
import Expense from "../models/expense";
import User from "../models/user";

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
       const expenses = await Expense.findAll({ include: [{model: User, as: "User"}]})
       res.json(expenses)
    } catch (error) {
       res.status(500).json({error})
    }
}

export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, description, name } = req.body;
        // Ensuring the user exists
        const user = await User.findByPk(userId);
        if (!user) {
             res.status(404).json({ message: "User not found" });
        }

        const newExpense = await Expense.create({ userId, description, name });
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
    try {
        const expense = await Expense.findByPk(id)
        if (expense) {
            await expense.update(req.body)
            res.json(expense)
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
    try {
        const expense = await Expense.findByPk(id) //check if the expense exist
        if (expense) {
            await expense.destroy()
            res.json({message: "Expense deleted successfully"})
        } else {
            res.status(404).json({message: "Expense not found"})
        }
    } catch (error) {
        res.status(500).json({ error });
    }

}
