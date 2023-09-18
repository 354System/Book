import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, } from "class-validator";
import { Category } from "../schemas/product.schema";
import { User } from "../../auth/schemas/user.schema";


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(Category, { message: "Please input Category" })
    readonly category: Category

    @IsString()
    readonly image: string;

    @IsEmpty()
    readonly user: User
}