import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString,} from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "../../auth/schemas/user.schema";


export class CreateBookDto {


    @IsString()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message:"Please input Category"})
    readonly category: Category

    @IsEmpty()
    readonly user: User
}