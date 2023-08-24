import { IsNotEmpty, IsString,} from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}