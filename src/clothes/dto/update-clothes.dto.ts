import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../../clothes/schemas/clothes.schema";


export class UpdateClothesDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly price: boolean;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    
    @IsNotEmpty()
    @IsEnum(Category, {message:"Please input Category"})
    readonly category: Category
    
    @IsString()
    readonly image: string;

}