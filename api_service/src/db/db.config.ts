import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import {  Users } from "src/user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'db_nest',
  entities: [Users],
  synchronize: true,
  logging: true,
}