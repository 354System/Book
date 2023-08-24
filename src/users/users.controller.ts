import { Controller, Get, Param, Query } from "@nestjs/common";
import { Query as ExpressQuery} from 'express-serve-static-core';
import { UsersService } from './users.service';
import { User } from "src/auth/schemas/user.schema";




@Controller('users')
export class UserController{
}
