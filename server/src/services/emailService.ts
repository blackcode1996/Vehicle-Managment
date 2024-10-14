import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs'; 

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});


const readTemplate = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};


export const sendEmail = async (to: string, subject: string, templatePath: string, data: Record<string, any>) => {

    const template = await readTemplate(templatePath);

    let htmlContent = template;
    for (const [key, value] of Object.entries(data)) {
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    const mailOptions = {
        from: '"Caring Team" <your-email@example.com>',
        to,
        subject,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
}