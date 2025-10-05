import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRequest } from '../dto/http/createUserRequest';
import bcrypt from 'bcrypt'
import { CreateUserData } from '../dto/data/createUserData';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RabbitMQService } from 'src/rabbitMq/rabbitmq.service';
import { SendEmailMQ } from '../dto/data/sendEmailMQ';
import { CreateUserResponse } from '../dto/http/createUserResponse';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>,
    private readonly rabbit: RabbitMQService
  ){}


  // Create User
  async create(user: CreateUserRequest): Promise<CreateUserResponse> {
    const passHash = await bcrypt.hash(user.password, 10)
    const query = Object.assign(new CreateUserData(), {
      ...user,
      password: passHash
    })
    const r: SendEmailMQ = {
      email: user.email,
      message: "Congratulations, your account created with succesfull"
    }
    const rs:CreateUserResponse = {
      Message: "Create user with success"
    }
    try {
      const email = await this.user.findOne({where: {email: user.email}})
      if(!email){
        await this.user.save(query)
        await this.rabbit.publish(r)
        return rs
      }
      throw new BadRequestException('Fail to create your user!')
    } catch (error) {
        throw new BadRequestException('Fail to create your user!')
    }
  }
}
