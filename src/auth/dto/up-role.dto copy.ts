import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength,} from "class-validator";

export class UpRoleDto {

    @IsNotEmpty()
    @IsEmail({},{message:'please enter correct email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

   @IsNotEmpty()
    readonly role: string;

}