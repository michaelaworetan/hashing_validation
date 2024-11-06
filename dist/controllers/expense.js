"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.addExpense = exports.getExpenses = void 0;
const expense_1 = __importDefault(require("../models/expense"));
const user_1 = __importDefault(require("../models/user"));
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expense_1.default.findAll({ include: [{ model: user_1.default, as: "User" }] });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getExpenses = getExpenses;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, description, name } = req.body;
        // Ensuring the user exists
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const newExpense = yield expense_1.default.create({ userId, description, name });
        res.status(201).json(newExpense);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addExpense = addExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expense = yield expense_1.default.findByPk(id);
        if (expense) {
            yield expense.update(req.body);
            res.json(expense);
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expense = yield expense_1.default.findByPk(id); //check if the expense exist
        if (expense) {
            yield expense.destroy();
            res.json({ message: "Expense deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Expense not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteExpense = deleteExpense;
