import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRoleDto } from './dto/update-role.dto';



@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService){}

    // @HttpCode(Httpstatus.OK)

    @Get('/user')
    async getAllBooks(@Query()  query: ExpressQuery,@Param('id') id: string): Promise<User[]> {
        return this.authService.findAll(query)
    }
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateUser(
        @Param('id')
        id: string,
        @Body()
        user: UpdateUserDto
    ): Promise<User> {
        return this.authService.updateById(id, user,);
    }

    @Put('/role/:id')
    //Untuk memvalidasi keamanan authorization
    @UseGuards(AuthGuard())
    async updateRole(@Res() Response, @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto){
        try{
            const existingUser = await this.authService.updateRole(id, updateRoleDto);
            return Response.status(HttpStatus.OK).json({
                message: 'Berhasil update role',
                existingUser
            });
        }catch(err){
            return Response.status(err.status).json(err.Response);
        }
    }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto ){
            return this.authService.signUp(signUpDto);
    }   
    @Post('/login')
    login(@Body() loginDto: LoginDto ){
            return this.authService.login(loginDto);
    }   
    
}

