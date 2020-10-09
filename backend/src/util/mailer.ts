import * as nodemailer from "nodemailer";
import * as config from '../configs/mail.json'
class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        let mailOptions = {
            from: "furtado3g@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, function (error : string, info:string) {
            if (error) {
                console.log(error)
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        })
    }


}

export default new Mail;