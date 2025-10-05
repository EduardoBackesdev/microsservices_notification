import { IsString, IsEmail, MinLength, isString } from 'class-validator';

export class CreateUserRequest{

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(7)
    password: string



}