import { Request, Response } from "express";
import User from "../models/user";
import { body, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import mailService from "../utils/mailService";
import  { signupTemp }  from "../templates/signup";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
       const users = await User.findAll();
       res.json(users);  // No need to return this, just send the response
    } catch (error) {
       res.status(500).json({ error });
    }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        await body("name").isString().notEmpty().run(req);
        await body("email").isEmail().notEmpty().run(req);
        await body("password").isLength({ min: 8 }).notEmpty().run(req);

        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).json({ message: validationErrors.array()[0].msg });
            return;  // Exit function after sending response
        } else {
         const { name, email, password } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create new user
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            // Attempt to send the email
            try {
                const emailError = await sendConfirmation(email, name, user.verificationToken);
                if (emailError) {
                    res.status(400).json({message: emailError});
                    return;
                }
            } catch (emailError) {
                res.status(500).json({ message: "Failed to send email", error: emailError });
                return;  // Exit function after sending response
            }

            // Create the user
            const newUser = await User.create({ name, email, password: hashedPassword });

            // Send success response
            res.status(201).json(newUser);  // No return needed, just send the response
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    //Get details users inputs from the client side
    const { email, password } = req.body

    //fing the user from the database
    const user = await User.findOne({ where: {email: email} })

    if (!user) {
        res.status(404).json({ message: "User not found"})
    } else {
        const isValidPassword = await bcrypt.compare(password, user.password)
        //if not valid password
        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid Password"})
        } else {
            res.status(200).json({message: "User logged in successfully"})
        }

    } 
}

export const sendConfirmation = async (email: string, name: string, token: string) => {
    try {
        //generate a confirmation template with the name of the user
        const confirmationTemplate = signupTemp(name, token)

        await mailService.transporter.sendMail({
            from: "AITI App",
            to: email,
            subject: confirmationTemplate.subject,
            html: confirmationTemplate.html
        })

        async(to: string, subject: string, text: string) => {
            const mailOptions = {
                from: '"AITI App" <mvillacs07@gmail.com>',
                to: email,
                subject: subject,
                text: text 
            }
            console.log("verification email sent")
            return null        
        }
    } catch (error: any) {
        console.error("Email sending failed", error)
        //checking the type of error code to check if the email invalid or non existent
        if (error.code === "EENVELOPE"){
            console.log("Non-existent email");
            return "Invalid or non-existent email address"
        } else {
            "Failed to send verification email"
        }
    }
}

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the token from the body
        const { token } = req.body

        //check if the token is valid
        //get the token from user it is attached to
        const user = await User.findOne({ where: {verificationToken: token}})
        //takes care of if user doesn't e4xist
        if (!user) {
            res.status(400).json({message: "Invalid oe expired token"})
        } else {
            //update isVerified 
            user.isVerified = true
            //save the updated client 
            await user.save()
            //after succesful
            res.status(200).json({message: "user has been successfully verified"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Internal Server error"})
    }
}