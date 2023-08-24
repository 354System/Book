import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose  from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UsersService {

}

 