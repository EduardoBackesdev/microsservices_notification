import { IsString, isString } from "class-validator"

export class SendEmailMQ {
    @IsString()
    event: string
    @IsString()
    email: string
    @IsString()
    message: string
}