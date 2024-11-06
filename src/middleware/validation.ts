import { NextFunction, Request, Response } from "express";

export const validateAddUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
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
};
