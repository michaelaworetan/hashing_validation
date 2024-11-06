import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// console.log("GMAIL_PASSWORD:", process.env.GMAIL_PASSWORD);

export default class mailService{
    static readonly transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'mvillacs07@gmail.com',
            pass: process.env.GMAIL_PASSWORD
        }
    })
}

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
