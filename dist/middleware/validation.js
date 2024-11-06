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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddUser = void 0;
const validateAddUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from req.body 
    const { name, email, password } = req.body;
    // Basic validation checks
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please provide all the required fields' });
    }
    // Email Validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
    }
    // Password Validation with regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: "Invalid password format from validation.ts" });
    }
    // // If everything is valid, call next() to proceed
    // next();
});
exports.validateAddUser = validateAddUser;
