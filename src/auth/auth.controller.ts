import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { UpdateUserDto } from './dto/update-user.dto';



@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService){}

    // @HttpCode(Httpstatus.OK)

    @Get('/user')
    async getAllBooks(@Query()  query: ExpressQuery,@Param('id') id: string): Promise<User[]> {
        return this.authService.findAll(query)
    }
    @Put(':id')
    async updateUser(
        @Param('id')
        id: string,
        @Body()
        user: UpdateUserDto
    ): Promise<User> {
        return this.authService.updateById(id, user,);
    }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto ){
            return this.authService.signUp(signUpDto);
    }   
    @Get('/login')
    login(@Body() loginDto: LoginDto ){
            return this.authService.login(loginDto);
    }   
    
}

