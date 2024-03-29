import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { UserService } from 'src/user/user.service';
// import { User } from 'src/users/users.service';
import { User } from './schemas/user.schema';
// import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import * as Mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Mongoose.Model<User>,
        private jwtService: JwtService

    ) { }


        async findAll(query: Query):Promise<User[]> {


        const keyword = query.keyword ? {
            name:{
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        const users = await this.userModel.find({...keyword});
        return users;
    }


    // async updateById (id: string,updateUserDto: UpdateUserDto): Promise<User> {
    //     return await this.userModel.findByIdAndUpdate(id, updateUserDto,{
    //         new: true,
    //         runValidator: true,
    //     });
    
    // }
    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Check if updateUserDto contains a new password
        if (updateUserDto.password) {
          // Hash the new password before saving it
          updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // You can adjust the salt rounds (10) as needed
        }
      
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
          new: true,
          runValidator: true,
        });
      }

    async updateRole (id: string,updateRoleDto: UpdateRoleDto): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateRoleDto, {new:true});
        if(!existingUser){
            throw new NotFoundException(`User ${id} tidak tersedia`);
        }
        return existingUser;
    }


    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;
        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            role:'Public',
        })
        
        const token = this.jwtService.sign({ id: user._id })
        
        return { token };
    }
    
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new UnauthorizedException('Invalid Email or Password')
        }
        
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        
        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid Email or Password')
        }
        const token = this.jwtService.sign({ id: user._id })
        const role = user.role
        const username = user.name
        const userEmail = user.email
        const data = {
            token: token,
            role: role,
            username: username,
            userEmail: userEmail
        }
        
        return data ;
    }
}
