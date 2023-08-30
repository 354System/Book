import { IsNotEmpty, IsString, MinLength,} from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

}