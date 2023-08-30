import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
// import { Role } from "../guards/role.enum";




@Schema({
    timestamps: true 
})

export class User {

    @Prop()
    name: string;

    @Prop({unique:[true,'duplicate email entered']})
    @IsEmail()
    email: string;
    
    @Prop()
    password: string;
    static role: string;

    @Prop()
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);