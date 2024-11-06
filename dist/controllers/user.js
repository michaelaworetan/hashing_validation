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
exports.verifyUser = exports.sendConfirmation = exports.loginUser = exports.addUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailService_1 = __importDefault(require("../utils/mailService"));
const signup_1 = require("../templates/signup");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json(users); // No need to return this, just send the response
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getUsers = getUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate input
        yield (0, express_validator_1.body)("name").isString().notEmpty().run(req);
        yield (0, express_validator_1.body)("email").isEmail().notEmpty().run(req);
        yield (0, express_validator_1.body)("password").isLength({ min: 8 }).notEmpty().run(req);
        // Check for validation errors
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).json({ message: validationErrors.array()[0].msg });
            return; // Exit function after sending response
        }
        else {
            const { name, email, password } = req.body;
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            //create new user
            const user = new user_1.default({
                name,
                email,
                password: hashedPassword
            });
            // Attempt to send the email
            try {
                const emailError = yield (0, exports.sendConfirmation)(email, name, user.verificationToken);
                if (emailError) {
                    res.status(400).json({ message: emailError });
                    return;
                }
            }
            catch (emailError) {
                res.status(500).json({ message: "Failed to send email", error: emailError });
                return; // Exit function after sending response
            }
            // Create the user
            const newUser = yield user_1.default.create({ name, email, password: hashedPassword });
            // Send success response
            res.status(201).json(newUser); // No return needed, just send the response
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get details users inputs from the client side
    const { email, password } = req.body;
    //fing the user from the database
    const user = yield user_1.default.findOne({ where: { email: email } });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    else {
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        //if not valid password
        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid Password" });
        }
        else {
            res.status(200).json({ message: "User logged in successfully" });
        }
    }
});
exports.loginUser = loginUser;
const sendConfirmation = (email, name, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //generate a confirmation template with the name of the user
        const confirmationTemplate = (0, signup_1.signupTemp)(name, token);
        yield mailService_1.default.transporter.sendMail({
            from: "AITI App",
            to: email,
            subject: confirmationTemplate.subject,
            html: confirmationTemplate.html
        });
        (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
            const mailOptions = {
                from: '"AITI App" <mvillacs07@gmail.com>',
                to: email,
                subject: subject,
                text: text
            };
            console.log("verification email sent");
            return null;
        });
    }
    catch (error) {
        console.error("Email sending failed", error);
        //checking the type of error code to check if the email invalid or non existent
        if (error.code === "EENVELOPE") {
            console.log("Non-existent email");
            return "Invalid or non-existent email address";
        }
        else {
            "Failed to send verification email";
        }
    }
});
exports.sendConfirmation = sendConfirmation;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token from the body
        const { token } = req.body;
        //check if the token is valid
        //get the token from user it is attached to
        const user = yield user_1.default.findOne({ where: { verificationToken: token } });
        //takes care of if user doesn't e4xist
        if (!user) {
            res.status(400).json({ message: "Invalid oe expired token" });
        }
        else {
            //update isVerified 
            user.isVerified = true;
            //save the updated client 
            yield user.save();
            //after succesful
            res.status(200).json({ message: "user has been successfully verified" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});
exports.verifyUser = verifyUser;
