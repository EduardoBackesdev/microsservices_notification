import { IsString, isString } from "class-validator"

export class SendEmailMQ {
    @IsString()
    email: string
    @IsString()
    message: string
}