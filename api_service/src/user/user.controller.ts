import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from '../dto/http/createUserRequest';
import { CreateUserResponse } from '../dto/http/createUserResponse';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/createUser")
  async create(@Body() createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
    const r = await this.userService.create(createUserRequest);
    return r
  }
}
