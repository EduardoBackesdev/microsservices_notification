import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/dto/message.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ConsumerService {

    async sendEmail(m: MessageDto){
        const testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        })
        try {
            await transporter.sendMail({
                from: '"Suporte" <no-reply@meusite.com>',
                to: m.email,
                subject: 'Account Created!',
                html: `
                <p>${m.message}</p>
                `,
            })
        } catch (error) {
            throw new Error('Error with send email')
        }

    }


}
