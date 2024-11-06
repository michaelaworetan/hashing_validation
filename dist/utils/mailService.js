"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log("GMAIL_PASSWORD:", process.env.GMAIL_PASSWORD);
class mailService {
}
mailService.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: 'mvillacs07@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});
exports.default = mailService;
// creating transporter 
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: 'mvillacs07@gmail.com',
//         pass: process.env.GMAIL_PASSWORD
//     }
// })
// //creating send mail endpoint
// export const sendEmail = async(to: string, subject: string, text: string): Promise<void> => {
//     const mailOptions = {
//         from: '"AITI App" <mvillacs07@gmail.com>',
//         to: to,
//         subject: subject,
//         text: text  //plain text body ..html:   
//     }
//     //transporter should send mail based on the mailOptions
//     await transporter.sendMail(mailOptions)
// }
//we can make use of this service whenever a user signin to our database
